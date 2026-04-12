// מתאם Upstash Redis ל-rate limiting — נטען דינמית כדי שהחבילה תישאר אופציונלית.
// אם @upstash/ratelimit או @upstash/redis לא מותקנים — מחזירים null ונופלים חזרה ל-in-memory.

import type { RateLimitOptions } from "@/lib/security";

/** אובייקט מגביל — מחזיר true אם יש לחסום. */
export interface UpstashLimiter {
  limit(key: string, opts: RateLimitOptions): Promise<boolean>;
}

// מטמון של מגבילים לפי חתימת חלון — כדי לא ליצור מופע חדש בכל בקשה.
// המפתח הוא `${max}:${windowMs}` והערך הוא אובייקט Ratelimit של Upstash.
const limiterCache = new Map<string, unknown>();

/**
 * יוצר מתאם Upstash לקצב בקשות.
 * טוען את החבילות דינמית — אם הן חסרות זורק שגיאה שהקורא יתפוס.
 */
export async function createUpstashLimiter(
  url: string,
  token: string
): Promise<UpstashLimiter> {
  // ייבוא דינמי — אם החבילות לא מותקנות, ה-catch למעלה יטפל בכך
  const [{ Ratelimit }, { Redis }] = await Promise.all([
    import("@upstash/ratelimit" as string) as Promise<{
      Ratelimit: new (args: {
        redis: unknown;
        limiter: unknown;
        analytics?: boolean;
        prefix?: string;
      }) => { limit: (id: string) => Promise<{ success: boolean }> };
      slidingWindow: (max: number, window: string) => unknown;
    }>,
    import("@upstash/redis" as string) as Promise<{
      Redis: new (args: { url: string; token: string }) => unknown;
    }>,
  ]);

  // מופע Redis אחד משותף לכל המגבילים
  const redis = new Redis({ url, token });

  return {
    async limit(key: string, opts: RateLimitOptions): Promise<boolean> {
      // יוצרים מגביל ייחודי לכל חתימה של (max, windowMs) כדי להתאים לקונבנציית Upstash
      const sig = `${opts.max}:${opts.windowMs}`;
      let rl = limiterCache.get(sig) as
        | { limit: (id: string) => Promise<{ success: boolean }> }
        | undefined;

      if (!rl) {
        // Upstash מצפה למחרוזת זמן כמו "60 s" — ממירים ממילישניות
        const windowStr = toUpstashDuration(opts.windowMs);
        rl = new Ratelimit({
          redis,
          limiter: (
            Ratelimit as unknown as {
              slidingWindow: (max: number, window: string) => unknown;
            }
          ).slidingWindow(opts.max, windowStr),
          analytics: false,
          prefix: "tams-rl",
        });
        limiterCache.set(sig, rl);
      }

      // מחזירים true כאשר יש לחסום — כלומר success === false
      const result = await rl.limit(key);
      return !result.success;
    },
  };
}

/**
 * ממיר אורך חלון במילישניות למחרוזת משך בתחביר של Upstash
 * (למשל "60 s", "10 m", "2 h"). בוחר את היחידה הגדולה ביותר שמחלקת בשלמות.
 */
function toUpstashDuration(ms: number): string {
  if (ms % (60 * 60 * 1000) === 0) return `${ms / (60 * 60 * 1000)} h`;
  if (ms % (60 * 1000) === 0) return `${ms / (60 * 1000)} m`;
  if (ms % 1000 === 0) return `${ms / 1000} s`;
  return `${ms} ms`;
}

// שירותי אבטחה משותפים ל-API routes: rate limiting + same-origin check.
// Rate limiter הוא pluggable — in-memory סינכרוני (ברירת מחדל) או Upstash Redis דרך rateLimitAsync.

import type { NextRequest } from "next/server";

// --- Rate limiting בזיכרון (סינכרוני, ברירת מחדל / fallback) ---

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// ניקוי תקופתי של רשומות שפג תוקפן
function cleanupExpired(now: number) {
  for (const [key, entry] of store) {
    if (now > entry.resetTime) store.delete(key);
  }
}

export interface RateLimitOptions {
  /** מקסימום בקשות בתוך החלון */
  max: number;
  /** גודל החלון במילישניות */
  windowMs: number;
}

/**
 * מימוש in-memory פרטי — משמש גם כברירת המחדל של rateLimit
 * וגם כ-fallback כש-Upstash לא זמין ב-rateLimitAsync.
 */
function memoryRateLimit(key: string, opts: RateLimitOptions): boolean {
  const now = Date.now();
  cleanupExpired(now);

  const entry = store.get(key);
  if (!entry || now > entry.resetTime) {
    store.set(key, { count: 1, resetTime: now + opts.windowMs });
    return false;
  }

  if (entry.count >= opts.max) return true;
  entry.count += 1;
  return false;
}

/**
 * API סינכרוני לשמירה על תאימות לאחור.
 * מחזיר true אם יש לחסום את הבקשה.
 * הערה: קוד חדש בפריסה מבוזרת (כמה instances) צריך להשתמש ב-rateLimitAsync
 * כדי לקבל ספירה משותפת דרך Upstash Redis.
 */
export function rateLimit(key: string, opts: RateLimitOptions): boolean {
  return memoryRateLimit(key, opts);
}

// --- API אסינכרוני עם תמיכה ב-Upstash ---
// שומרים קישור יחיד למתאם כדי לא לייבא/ליצור אותו מחדש בכל בקשה.

import type { UpstashLimiter } from "@/lib/rate-limit/upstash";

let upstashPromise: Promise<UpstashLimiter | null> | null = null;
let warnedOnce = false;

function getUpstashAdapter(): Promise<UpstashLimiter | null> {
  if (upstashPromise) return upstashPromise;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // ללא קונפיגורציה — משתמשים ב-in-memory בלבד
  if (!url || !token) {
    upstashPromise = Promise.resolve(null);
    return upstashPromise;
  }

  // ייבוא דינמי כדי ש-@upstash/ratelimit יישאר תלות אופציונלית
  upstashPromise = import("@/lib/rate-limit/upstash")
    .then(({ createUpstashLimiter }) => createUpstashLimiter(url, token))
    .catch((err) => {
      if (!warnedOnce) {
        warnedOnce = true;
        console.warn(
          "[rate-limit] Upstash adapter unavailable, falling back to in-memory:",
          err instanceof Error ? err.message : err
        );
      }
      return null;
    });

  return upstashPromise;
}

/**
 * גרסה אסינכרונית של rateLimit — משתמשת ב-Upstash Redis אם מוגדר,
 * אחרת נופלת חזרה ל-in-memory. השתמשו בגרסה זו בפריסה מבוזרת
 * (Vercel עם מספר instances, serverless וכו'). בפיתוח מקומי / instance יחיד
 * אפשר להמשיך ב-rateLimit הסינכרוני.
 */
export async function rateLimitAsync(
  key: string,
  opts: RateLimitOptions
): Promise<boolean> {
  const adapter = await getUpstashAdapter();

  if (adapter) {
    try {
      return await adapter.limit(key, opts);
    } catch (err) {
      // כשל זמני ב-Upstash — לא חוסמים משתמשים באופן גורף, נופלים ל-in-memory
      if (!warnedOnce) {
        warnedOnce = true;
        console.warn(
          "[rate-limit] Upstash limit() failed, using in-memory for this request:",
          err instanceof Error ? err.message : err
        );
      }
      return memoryRateLimit(key, opts);
    }
  }

  return memoryRateLimit(key, opts);
}

// --- בדיקת Origin / Referer (CSRF-lite) ---

/**
 * בודק שהבקשה הגיעה ממקור שאנחנו סומכים עליו.
 * משווה origin מול host של הבקשה, וכופה HTTPS בפרודקשן.
 * מחזיר true אם המקור חוקי.
 */
export function checkOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const host = req.headers.get("host");

  if (!host) return false;

  // מאפשרים רשימת מקורות ממקור נאמן דרך env (לצרכי staging/preview)
  const allowed = new Set<string>();
  allowed.add(`https://${host}`);
  if (process.env.NODE_ENV !== "production") {
    allowed.add(`http://${host}`);
  }
  const extra = process.env.ALLOWED_ORIGINS;
  if (extra) {
    for (const raw of extra.split(",")) {
      const v = raw.trim();
      if (v) allowed.add(v);
    }
  }

  // אם יש Origin — נעדיף אותו, הוא אמין יותר
  if (origin) return allowed.has(origin);

  // נפילה חזרה ל-Referer (לדפדפנים שלא שולחים Origin ב-POST מסוים)
  if (referer) {
    try {
      const url = new URL(referer);
      return allowed.has(url.origin);
    } catch {
      return false;
    }
  }

  // אין origin ואין referer — ב-production לא מאשרים; ב-dev מקילים
  return process.env.NODE_ENV !== "production";
}

/** הוצאת IP של לקוח מכותרות הפרוקסי */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

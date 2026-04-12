// חתימה ואימות של סשן משקיע — HMAC-SHA256, תואם edge runtime ו-Node 20+
// מיועד לשימוש בלבד בצד השרת / middleware — אף פעם לא ב-Client Components.

import type { User } from "./types";

// שם העוגייה של הסשן
export const SESSION_COOKIE_NAME = "tams_session";

// תוקף הסשן — 12 שעות (בשניות)
export const SESSION_TTL_SECONDS = 12 * 60 * 60;

// מפתח ברירת מחדל לדבאג בלבד — בפרודקשן חייבים AUTH_SECRET
const DEV_SECRET =
  "tams-dev-only-secret-do-not-use-in-prod-00000000000000000000000000";

// טוען את הסוד מה-env, עם fallback מפורש רק בדבאג
function getSecret(): string {
  const fromEnv = process.env.AUTH_SECRET;
  if (fromEnv && fromEnv.length >= 32) return fromEnv;
  if (process.env.NODE_ENV === "production") {
    // בפרודקשן — חובה להגדיר AUTH_SECRET חזק.
    // אם לא הוגדר נזרוק שגיאה כדי להימנע ממעבר שקט לסוד חלש.
    throw new Error(
      "AUTH_SECRET environment variable is required in production and must be at least 32 chars."
    );
  }
  // סביבת פיתוח — נרשום אזהרה פעם אחת בלבד
  if (!(globalThis as { __tamsAuthWarned?: boolean }).__tamsAuthWarned) {
    (globalThis as { __tamsAuthWarned?: boolean }).__tamsAuthWarned = true;
    console.warn(
      "[auth] AUTH_SECRET not set — using insecure dev fallback. Set AUTH_SECRET in .env.local for real sessions."
    );
  }
  return DEV_SECRET;
}

// --- קידוד Base64URL תואם edge runtime ---

function toBase64Url(bytes: Uint8Array): string {
  // ממיר bytes ל-base64 בטוח ל-URL (ללא תלות ב-Buffer)
  let bin = "";
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): Uint8Array {
  const pad = input.length % 4 === 0 ? 0 : 4 - (input.length % 4);
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// השוואה בזמן קבוע כדי למנוע timing attacks
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// --- HMAC-SHA256 באמצעות Web Crypto (תואם edge) ---

async function hmacSign(data: string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return new Uint8Array(sig);
}

// --- מבנה ה-payload של הסשן ---

export interface SessionPayload {
  sub: string; // User.id
  email: string;
  name: string;
  investorId: string;
  role: "investor" | "admin";
  iat: number; // issued-at (unix seconds)
  exp: number; // expiry (unix seconds)
}

// בנייה של payload מ-User
function toPayload(user: User): SessionPayload {
  const now = Math.floor(Date.now() / 1000);
  return {
    sub: user.id,
    email: user.email,
    name: user.name,
    investorId: user.investorId,
    role: user.role,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };
}

// --- API ציבורי ---

/** יוצר token חתום עבור משתמש נתון */
export async function createSessionToken(user: User): Promise<string> {
  const payload = toPayload(user);
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await hmacSign(payloadB64);
  return `${payloadB64}.${toBase64Url(sig)}`;
}

/**
 * מאמת token — מחזיר payload אם תקף, אחרת null.
 * בודק חתימה, מבנה, ותוקף.
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;

  try {
    // בדיקת חתימה בזמן קבוע
    const expected = await hmacSign(payloadB64);
    const actual = fromBase64Url(sigB64);
    if (!constantTimeEqual(expected, actual)) return null;

    // פענוח ה-payload
    const json = new TextDecoder().decode(fromBase64Url(payloadB64));
    const payload = JSON.parse(json) as SessionPayload;

    // בדיקת שדות חובה
    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }

    // בדיקת תוקף
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}

/** ממיר payload חזרה ל-User (לשימוש ב-/api/auth/me) */
export function payloadToUser(payload: SessionPayload): User {
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    investorId: payload.investorId,
    role: payload.role,
  };
}

// --- אפשרויות עוגייה סטנדרטיות ---

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};

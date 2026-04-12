// API route — התחברות משקיע, יוצר סשן חתום ב-HttpOnly cookie
import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { verifyCredentials } from "@/lib/auth/users";
import { checkOrigin, getClientIp, rateLimit } from "@/lib/security";

// ביטוי רגולרי לבדיקת אימייל — מיושר לתאימות ל-/api/contact
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// מגבלות אורך כדי למנוע התקפות flood על שדות גדולים
const MAX_EMAIL_LENGTH = 255;
const MAX_PASSWORD_LENGTH = 200;

export async function POST(req: NextRequest) {
  // --- שכבה 1: חסימת בקשות ממקור לא חוקי (CSRF-lite) ---
  if (!checkOrigin(req)) {
    return NextResponse.json(
      { error: "bad_origin", message: "Request origin not allowed." },
      { status: 403 }
    );
  }

  // --- שכבה 2: rate limiting לפי IP — 10 ניסיונות ל-15 דקות ---
  const ip = getClientIp(req);
  if (await rateLimit(`login:${ip}`, { max: 10, windowMs: 15 * 60 * 1000 })) {
    return NextResponse.json(
      { error: "rate_limited", message: "Too many login attempts. Try again later." },
      { status: 429 }
    );
  }

  // --- שכבה 3: ולידציה של קלט ---
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { email, password } = body as { email?: unknown; password?: unknown };

  if (typeof email !== "string" || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // שדה הסיסמה הוא כעת חובה — אין יותר מסלול "קבל כל אימייל" ללא סיסמה
  if (typeof password !== "string" || password.length === 0 || password.length > MAX_PASSWORD_LENGTH) {
    return NextResponse.json({ error: "invalid_password" }, { status: 400 });
  }

  // --- שכבה 4: אימות פרטי ההתחברות מול המאגר (PBKDF2) ---
  const user = await verifyCredentials(email, password);
  if (!user) {
    return NextResponse.json(
      { error: "invalid_credentials", message: "Invalid email or password." },
      { status: 401 }
    );
  }

  // --- שכבה 5: יצירת סשן חתום ושליחה כעוגייה HttpOnly ---
  const token = await createSessionToken(user);

  const res = NextResponse.json({ user }, { status: 200 });
  res.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions);
  return res;
}

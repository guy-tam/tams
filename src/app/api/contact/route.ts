// API route — שליחת פניות יצירת קשר למייל
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkOrigin } from "@/lib/security";
import { log } from "@/lib/logger";

// שם הראוט — נכנס לכל רשומת לוג לצורכי חיפוש וסינון
const ROUTE = "api/contact";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "xrptam2@gmail.com";

// --- מגבלות אורך שדות ---
const MAX_LENGTHS = {
  fullName: 100,
  email: 255,
  phone: 20,
  message: 5000,
  investorType: 100,
  investmentRange: 100,
} as const;

// ביטוי רגולרי לבדיקת תקינות אימייל
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// הסרת תגיות HTML מהקלט — מניעת הזרקת HTML
function stripHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

// --- הגבלת קצב שליחה (Rate Limiting) ---
// מקסימום 3 שליחות לשעה לכל כתובת IP
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // שעה אחת במילישניות

// מפה לאחסון ספירת בקשות לפי IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// ניקוי רשומות שפג תוקפן — רץ בכל בקשה
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// בדיקת הגבלת קצב — מחזיר true אם הבקשה חסומה
function isRateLimited(ip: string): boolean {
  cleanupExpiredEntries();
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    // רשומה חדשה או שפג תוקפה — מאפסים
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    // חריגה ממגבלת הבקשות
    return true;
  }

  // מעדכנים את הספירה
  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  // שליפת IP ו-requestId מוקדם — משמשים בכל רשומת לוג
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const requestId = req.headers.get("x-request-id") || undefined;
  // הקשר בסיסי שנמשך לכל קריאת לוג בראוט הזה
  const baseCtx = { route: ROUTE, ip, requestId };

  // לוג כניסה — מאפשר לעקוב אחרי כל בקשה שנכנסה, גם אם נחסמה מיד
  log.info("request received", baseCtx);

  // --- שכבה 0: בדיקת Origin / Referer — חסימת שליחות חוצה-מקור ---
  // מונע שימוש לרעה של הטופס על ידי אתרי phishing או bots שרצים מחוץ לדומיין.
  if (!checkOrigin(req)) {
    log.warn("bad_origin rejected", baseCtx);
    return NextResponse.json(
      { error: "bad_origin", message: "Request origin not allowed." },
      { status: 403 }
    );
  }

  // --- שכבה 1: הגבלת קצב לפי IP ---
  if (await isRateLimited(ip)) {
    log.warn("rate_limited", baseCtx);
    return NextResponse.json(
      { error: "rate_limited", message: "יותר מדי בקשות. נסה שוב מאוחר יותר. / Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "no_api_key" }, { status: 501 });
  }

  try {
    const {
      fullName,
      email,
      phone,
      investorType,
      investmentRange,
      message,
      company_url, // שדה מלכודת דבש — אמור להישאר ריק
    } = await req.json();

    // --- שכבה 2: בדיקת מלכודת דבש (Honeypot) ---
    // אם השדה הסמוי מלא — זה כנראה בוט. מחזירים הצלחה מזויפת בלי לשלוח מייל
    if (company_url) {
      log.warn("honeypot triggered — bot submission blocked", baseCtx);
      return NextResponse.json({ success: true });
    }

    // --- שכבה 3: ולידציה של שדות חובה ---
    if (!fullName || !email || !investorType || !investmentRange) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    // --- שכבה 4: בדיקת סוג — כל השדות חייבים להיות מחרוזות ---
    if (
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof investorType !== "string" ||
      typeof investmentRange !== "string" ||
      (phone !== undefined && phone !== null && typeof phone !== "string") ||
      (message !== undefined && message !== null && typeof message !== "string")
    ) {
      return NextResponse.json(
        { error: "invalid_types", message: "כל השדות חייבים להיות מחרוזות טקסט." },
        { status: 400 }
      );
    }

    // --- שכבה 5: בדיקת אורך מקסימלי ---
    const lengthChecks: { field: string; value: string | undefined | null; max: number }[] = [
      { field: "fullName", value: fullName, max: MAX_LENGTHS.fullName },
      { field: "email", value: email, max: MAX_LENGTHS.email },
      { field: "phone", value: phone, max: MAX_LENGTHS.phone },
      { field: "message", value: message, max: MAX_LENGTHS.message },
      { field: "investorType", value: investorType, max: MAX_LENGTHS.investorType },
      { field: "investmentRange", value: investmentRange, max: MAX_LENGTHS.investmentRange },
    ];

    for (const check of lengthChecks) {
      if (check.value && check.value.length > check.max) {
        return NextResponse.json(
          { error: "field_too_long", field: check.field, max: check.max, message: `השדה ${check.field} חורג מהאורך המרבי (${check.max} תווים).` },
          { status: 400 }
        );
      }
    }

    // --- שכבה 6: בדיקת תקינות אימייל ---
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "invalid_email", message: "כתובת אימייל לא תקינה." },
        { status: 400 }
      );
    }

    // --- שכבה 7: הסרת תגיות HTML מכל הקלטים ---
    const cleanFullName = stripHtmlTags(fullName);
    const cleanEmail = stripHtmlTags(email);
    const cleanPhone = phone ? stripHtmlTags(phone) : undefined;
    const cleanInvestorType = stripHtmlTags(investorType);
    const cleanInvestmentRange = stripHtmlTags(investmentRange);
    const cleanMessage = message ? stripHtmlTags(message) : undefined;

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "TAMS Access <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: cleanEmail,
      subject: `🔒 TAMS Access Request — ${cleanFullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #d4a843; padding-bottom: 10px;">
            New Access Request — TAMS
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 140px;">Full Name</td>
              <td style="padding: 8px 12px;">${escapeHtml(cleanFullName)}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Phone</td>
              <td style="padding: 8px 12px;">${cleanPhone ? escapeHtml(cleanPhone) : "—"}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Investor Type</td>
              <td style="padding: 8px 12px;">${escapeHtml(cleanInvestorType)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Investment Range</td>
              <td style="padding: 8px 12px;">${escapeHtml(cleanInvestmentRange)}</td>
            </tr>
            ${cleanMessage ? `
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px;">${escapeHtml(cleanMessage)}</td>
            </tr>` : ""}
          </table>

          <p style="color: #888; font-size: 12px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
            Submitted at ${new Date().toISOString()} via TAMS Access Form
          </p>
        </div>
      `,
    });

    if (error) {
      log.error("resend send failed", { ...baseCtx, err: error });
      return NextResponse.json({ error: "email_error" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    log.error("contact handler threw", { ...baseCtx, err: e });
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

// מניעת XSS בתוכן המייל
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

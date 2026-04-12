// API route — מדריך AI עם OpenAI GPT
import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/ai-guide/systemPrompt";
import { checkOrigin, getClientIp, rateLimit } from "@/lib/security";
import { log } from "@/lib/logger";

// שם הראוט — נכנס לכל רשומת לוג לצורכי חיפוש וסינון
const ROUTE = "api/guide";

// --- קבועי ולידציה ---
const MAX_MESSAGES = 50; // מקסימום הודעות בשיחה
const MAX_CONTENT_LENGTH = 2000; // אורך מקסימלי לתוכן הודעה בודדת
const MAX_ROUTE_LENGTH = 100; // אורך מקסימלי לנתיב
const MAX_BODY_SIZE = 50 * 1024; // 50KB — גודל מקסימלי לגוף הבקשה
const ALLOWED_ROLES = ["user", "assistant"] as const; // תפקידים מותרים
const ALLOWED_LANGS = ["he", "en", "ar", "ru", "es"] as const; // שפות מותרות

// --- Rate limit: 20 בקשות ל-IP בכל 10 דקות ---
// AI calls יקרים — חייבים להגביל כדי למנוע ניצול לרעה של OpenAI credits.
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  // שליפת IP ו-requestId מוקדם — משמשים בכל רשומת לוג
  const ip = getClientIp(req);
  const requestId = req.headers.get("x-request-id") || undefined;
  // הקשר בסיסי שנמשך לכל קריאת לוג בראוט הזה
  const baseCtx = { route: ROUTE, ip, requestId };

  // לוג כניסה — מאפשר לעקוב אחרי כל בקשה שנכנסה, גם אם נחסמה מיד
  log.info("request received", baseCtx);

  // --- שכבה 0: חסימת בקשות cross-origin ---
  // ה-API נועד רק ל-frontend שלנו — אסור שמישהו יקרא אליו ישירות.
  if (!checkOrigin(req)) {
    log.warn("bad_origin rejected", baseCtx);
    return NextResponse.json(
      { error: "bad_origin", message: "Request origin not allowed." },
      { status: 403 }
    );
  }

  // --- שכבה 0.5: rate limiting לפי IP — הגנה על OpenAI credits ---
  if (await rateLimit(`guide:${ip}`, { max: RATE_LIMIT_MAX, windowMs: RATE_LIMIT_WINDOW_MS })) {
    log.warn("rate_limited", baseCtx);
    return NextResponse.json(
      {
        error: "rate_limited",
        message: "יותר מדי בקשות. נסה שוב בעוד כמה דקות. / Too many requests. Try again in a few minutes.",
      },
      { status: 429 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "no_api_key" }, { status: 501 });
  }

  try {
    // --- בדיקת גודל גוף הבקשה ---
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "body_too_large", message: "גוף הבקשה חורג מהגודל המרבי (50KB)." },
        { status: 400 }
      );
    }

    // קריאת הגוף כטקסט לבדיקת גודל בפועל, ואז פרסור
    const rawBody = await req.text();
    if (rawBody.length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: "body_too_large", message: "גוף הבקשה חורג מהגודל המרבי (50KB)." },
        { status: 400 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "invalid_json", message: "גוף הבקשה אינו JSON תקין." },
        { status: 400 }
      );
    }

    const { messages, currentRoute, lang } = body;

    // --- ולידציה: messages חייב להיות מערך ---
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "invalid_messages", message: "השדה messages חייב להיות מערך." },
        { status: 400 }
      );
    }

    // --- ולידציה: מקסימום הודעות ---
    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: "too_many_messages", message: `מקסימום ${MAX_MESSAGES} הודעות בשיחה.` },
        { status: 400 }
      );
    }

    // --- ולידציה: כל הודעה חייבת לכלול role ו-content תקינים ---
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];

      if (!m || typeof m !== "object") {
        return NextResponse.json(
          { error: "invalid_message", index: i, message: "כל הודעה חייבת להיות אובייקט." },
          { status: 400 }
        );
      }

      // בדיקת תפקיד — חייב להיות user או assistant
      if (!(ALLOWED_ROLES as readonly string[]).includes(m.role)) {
        return NextResponse.json(
          { error: "invalid_role", index: i, message: `תפקיד לא חוקי. מותר רק: ${ALLOWED_ROLES.join(", ")}.` },
          { status: 400 }
        );
      }

      // בדיקת תוכן — חייב להיות מחרוזת באורך סביר
      if (typeof m.content !== "string") {
        return NextResponse.json(
          { error: "invalid_content", index: i, message: "תוכן ההודעה חייב להיות מחרוזת." },
          { status: 400 }
        );
      }

      if (m.content.length > MAX_CONTENT_LENGTH) {
        return NextResponse.json(
          { error: "content_too_long", index: i, message: `תוכן ההודעה חורג מהאורך המרבי (${MAX_CONTENT_LENGTH} תווים).` },
          { status: 400 }
        );
      }
    }

    // --- ולידציה: שפה ---
    const validatedLang = lang ?? "he";
    if (!(ALLOWED_LANGS as readonly string[]).includes(validatedLang as string)) {
      return NextResponse.json(
        { error: "invalid_lang", message: `שפה לא נתמכת. מותר רק: ${ALLOWED_LANGS.join(", ")}.` },
        { status: 400 }
      );
    }

    // --- ולידציה: נתיב נוכחי ---
    if (currentRoute !== undefined && currentRoute !== null) {
      if (typeof currentRoute !== "string" || currentRoute.length > MAX_ROUTE_LENGTH) {
        return NextResponse.json(
          { error: "invalid_route", message: `נתיב לא תקין או חורג מהאורך המרבי (${MAX_ROUTE_LENGTH} תווים).` },
          { status: 400 }
        );
      }
    }

    const systemPrompt = buildSystemPrompt(currentRoute as string, validatedLang as "he" | "en");

    const openaiMessages = [
      { role: "system" as const, content: systemPrompt },
      ...(messages as { role: string; content: string }[]).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        max_tokens: 800,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      log.error("openai upstream failed", { ...baseCtx, status: response.status, body: err });
      return NextResponse.json({ error: "openai_error" }, { status: 502 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (e) {
    log.error("guide handler threw", { ...baseCtx, err: e });
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

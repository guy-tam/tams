// Proxy (middleware) — רץ בקצה לפני כל בקשה למסלולים הנבחרים.
// ב-Next.js 16 הקובץ נקרא `proxy.ts` (הוחלף מ-middleware).
// אחריות:
//   1) חסימת user-agents של סורקים
//   2) CSRF בסיסי לבקשות POST ל-API
//   3) שער אימות למסלולי /dashboard/* (דורש עוגיית סשן תקפה)
//   4) הוספת X-Request-ID לכל תגובה
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/session";

// רשימת דפוסי סוכני משתמש של כלי סריקה פוגעניים
const BLOCKED_USER_AGENTS = [
  "sqlmap",
  "nikto",
  "nmap",
  "dirbuster",
  "gobuster",
  "masscan",
  "nessus",
  "openvas",
  "havij",
  "w3af",
  "acunetix",
  "burpsuite",
];

/**
 * מחולל מזהה בקשה ייחודי למעקב בלוגים (UUID v4).
 */
function generateRequestId(): string {
  // שימוש ב-crypto.randomUUID אם זמין, אחרת fallback ל-pattern ידני
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Proxy אבטחה — רץ לפני שהבקשה מגיעה ל-route handler.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? "";

  // --- 1) חסימת סוכני סריקה חשודים ---
  if (BLOCKED_USER_AGENTS.some((bot) => userAgent.includes(bot))) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }

  // --- 2) הגנת CSRF בסיסית על POST ל-API ---
  // מאמתים את כותרת Origin מול ה-host של הבקשה (כשיש Origin).
  if (request.method === "POST" && pathname.startsWith("/api")) {
    const origin = request.headers.get("origin");
    if (origin) {
      const requestHost = request.headers.get("host") ?? request.nextUrl.host;
      try {
        const originHost = new URL(origin).host;
        if (originHost !== requestHost) {
          return Response.json(
            { error: "bad_origin", message: "Origin does not match host" },
            { status: 403 }
          );
        }
      } catch {
        return Response.json(
          { error: "bad_origin", message: "Invalid Origin header" },
          { status: 403 }
        );
      }
    }
    // ללא Origin — משאירים ל-route handler לבדוק (defense in depth).
  }

  // --- 3) שער אימות למסלולי /dashboard ---
  // בודקים עוגיית סשן חתומה לפני שמגישים HTML של הדשבורד.
  // אם אין עוגייה / לא תקפה — מפנים לדף ההתחברות עם returnTo.
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const payload = await verifySessionToken(token);
    if (!payload) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // --- 4) מזהה בקשה לכל תגובה — עוזר במעקב שגיאות בלוגים ---
  const response = NextResponse.next();
  response.headers.set("X-Request-ID", generateRequestId());
  return response;
}

// Matcher — אילו נתיבים מעוררים את ה-proxy.
// כולל API, login, ו-dashboard על כל עומק.
export const config = {
  matcher: ["/api/:path*", "/login", "/dashboard/:path*"],
};

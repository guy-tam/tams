import type { NextConfig } from "next";

// כותרות אבטחה לכל הנתיבים באפליקציה
const securityHeaders = [
  // מניעת הטמעה ב-iframe (הגנה מפני clickjacking)
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // מניעת ניחוש סוג תוכן על ידי הדפדפן
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // הגנת XSS ישנה (לדפדפנים ישנים)
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // מדיניות שליחת Referrer - שליחת מקור מלא רק לאותו אתר
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // אילוץ HTTPS בלבד למשך שנתיים, כולל תת-דומיינים
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // הגבלת גישה ל-API של הדפדפן — חסימת מצלמה, מיקרופון ומיקום
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // מדיניות אבטחת תוכן — הגדרת מקורות מורשים לכל סוג משאב
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://www.google-analytics.com https://api.openai.com https://api.resend.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // הסתרת כותרת X-Powered-By כדי לא לחשוף את הטכנולוגיה
  poweredByHeader: false,

  // הוספת כותרות אבטחה לכל הבקשות
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

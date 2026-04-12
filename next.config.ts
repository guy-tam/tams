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
  // בידוד cross-origin — מחזק את ההגנה מפני side-channel (Spectre וכו')
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  // מונע שאיבה של משאבי הדומיין כ-resource מאתרים חיצוניים
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  // מדיניות אבטחת תוכן — הגדרת מקורות מורשים לכל סוג משאב.
  // Directives קריטיות שנוספו:
  //   object-src 'none'          → חסימת plugins (Flash) — מונע אקספלויטים ישנים
  //   base-uri 'self'            → מונע התקפת base-tag injection
  //   frame-ancestors 'self'     → שכבה 2 על X-Frame-Options (מודרני יותר)
  //   form-action 'self'         → טופסים יכולים לשלוח רק לדומיין שלנו
  //   upgrade-insecure-requests  → הופך HTTP אוטומטית ל-HTTPS
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
      "connect-src 'self' https://www.google-analytics.com https://api.openai.com https://api.resend.com",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
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

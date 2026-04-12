# ארכיטקטורה — TAMS

מסמך זה מתאר את הארכיטקטורה בפועל של הריפו, עם הפניות לקבצים
אמיתיים. כל מה שכתוב כאן ניתן לאימות בקוד; אם משהו מסומן כ"מתוכנן"
זה אומר שהקובץ עדיין לא נכתב נכון לתאריך 2026-04-10.

## סקירה כללית

TAMS הוא אתר concept של חברת השקעות בלוקצ'יין, שבנוי מעל Next.js 16
(App Router) ו-React 19. האתר משלב חלק ציבורי (שיווק ותוכן סטטי)
ודשבורד משקיע סגור מאחורי שכבת אימות.

```
+------------------+        +--------------------------+        +-----------------+
|      Browser     | <----> |   Next.js Edge / Node    | <----> |   External APIs |
|  (React 19 + TW) |   HTTP |  proxy.ts + app router   |  HTTPS |  OpenAI, Resend |
+------------------+        +--------------------------+        |  Google Analytics|
                                     |                          +-----------------+
                                     v
                             +-------------------+
                             |   /api/* routes   |
                             | auth, contact,    |
                             | guide, me, logout |
                             +-------------------+
```

כל בקשה ל-`/api/*`, `/login` או `/dashboard/*` עוברת קודם דרך
`src/proxy.ts` (שה-matcher שלו מוגדר ב-`src/proxy.ts:100-102`) ורק
אחר כך מגיעה ל-route handler.

## מפת תיקיות

מתוך `src/`:

- `app/` — נתיבי ה-App Router (דפים, layouts, error boundaries, API routes).
- `components/` — קומפוננטות React משותפות (layout, sections, charts, ui).
- `content/` — תוכן סטטי מובנה (לא קוד).
- `data/` — מאגרי מידע סטטיים: `assets.ts`, `roadmap.ts`, `dashboard-mock.ts`.
- `lib/` — לוגיקה שימושית: `auth/`, `i18n/`, `portfolio/`, `rate-limit/`,
  `ai-guide/`, `logger.ts`, `security.ts`, `seo.ts`, `utils.ts`.
- `proxy.ts` — ה-middleware של Next.js 16 (שהשם החדש שלו הוא `proxy`).

## ניתוב (Routing)

### דפים ציבוריים

כל דפי השיווק תחת `src/app/` נגישים ללא אימות:

| נתיב | קובץ |
|------|------|
| `/` | `src/app/page.tsx` |
| `/company` | `src/app/company/page.tsx` |
| `/architecture` | `src/app/architecture/page.tsx` |
| `/holdings` | `src/app/holdings/page.tsx` |
| `/defi` | `src/app/defi/page.tsx` |
| `/market-shift` | `src/app/market-shift/page.tsx` |
| `/strategy` | `src/app/strategy/page.tsx` |
| `/investor` | `src/app/investor/page.tsx` |
| `/faq`, `/legal`, `/methodology`, `/proof`, `/team`, `/access` | מתחת לתיקיות המתאימות ב-`src/app/` |
| `/login` | `src/app/login/page.tsx` |

### דפי דשבורד (מאחורי אימות)

כל מה שתחת `/dashboard/*` מוגן על ידי שער ה-proxy
(`src/proxy.ts:82-90`) וחייב עוגיית סשן תקפה:

- `/dashboard` → `src/app/dashboard/page.tsx`
- `/dashboard/portfolio`
- `/dashboard/performance`
- `/dashboard/defi`
- `/dashboard/activity`
- `/dashboard/settings`

ה-layout המשותף נמצא ב-`src/app/dashboard/layout.tsx` ומשתמש ב-
`components/layout/DashboardLayout`.

### נתיבי API

- `POST /api/auth/login` → `src/app/api/auth/login/route.ts`
- `POST /api/auth/logout` → `src/app/api/auth/logout/route.ts`
- `GET  /api/auth/me` → `src/app/api/auth/me/route.ts`
- `POST /api/contact` → `src/app/api/contact/route.ts`
- `POST /api/guide` → `src/app/api/guide/route.ts`

## זרימת אימות (Auth flow)

1. המשתמש מזין אימייל וסיסמה בדף `/login`.
2. קליינט שולח `POST /api/auth/login`
   (`src/app/api/auth/login/route.ts:20-101`). הראוט מבצע:
   - בדיקת Origin (`checkOrigin`, `src/lib/security.ts:118`).
   - Rate limit של 10 ניסיונות לכל 15 דקות לפי IP
     (`src/app/api/auth/login/route.ts:31`).
   - ולידציית סכמה (אימייל, אורך סיסמה).
   - אימות סיסמה מול hash ב-PBKDF2 (`src/lib/auth/passwords.ts`).
3. בהצלחה נוצר JWT-דמוי חתום ב-HMAC-SHA256
   (`src/lib/auth/session.ts:108-113`) ונשלח כ-`Set-Cookie`
   עם `HttpOnly`, `SameSite=Lax` ו-`Secure` בפרודקשן
   (`src/lib/auth/session.ts:169-175`).
4. בגלישה ל-`/dashboard/*` ה-proxy שולף את העוגייה, מאמת חתימה
   ותוקף דרך `verifySessionToken` (`src/lib/auth/session.ts:119-154`).
   אם העוגייה חסרה או פגה — redirect ל-`/login?from=...`
   (`src/proxy.ts:82-89`).
5. הקליינט יכול לבדוק סטטוס התחברות בכל רגע דרך
   `GET /api/auth/me` שמחזיר תמיד 200 עם `{ user: null | User }`
   (`src/app/api/auth/me/route.ts`).
6. התנתקות — `POST /api/auth/logout` מנקה את העוגייה.

## שכבת i18n

מערכת התרגום היא client-side והיא בנויה על React Context:

- נקודת הכניסה: `src/lib/i18n/index.ts` — מייצאת את
  `LanguageProvider`, `useLanguage`, וקבועים.
- המימוש: `src/lib/i18n/context.tsx`. ה-Provider שומר את הבחירה
  ב-`localStorage` תחת המפתח `tams-language`
  (`src/lib/i18n/context.tsx:22`).
- חמש שפות נתמכות (`src/lib/i18n/locales/`): `he`, `en`, `ar`,
  `ru`, `es`. כל קובץ locale מייצא סט מחרוזות תרגום.
- RTL: רשימת השפות מימין-לשמאל מוגדרת ב-`RTL_LANGUAGES` בתוך
  `src/lib/i18n/types.ts`, וה-Provider חושף `dir` ו-`isRTL` כדי
  שיהיה אפשר להחליף את הכיוון על תגית ה-`<html>` או על קומפוננטה
  עוטפת (`src/lib/i18n/context.tsx:47-49`).
- שימוש בקוד: `const { t, dir } = useLanguage();` ואז
  `t("nav.home")` — המפתח הוא נתיב נקודה.

## שכבת נתונים

### נתונים סטטיים

- `src/data/assets.ts` — מאגר מחקר 16 נכסים.
- `src/data/roadmap.ts` — אבני דרך.
- `src/data/dashboard-mock.ts` — נתוני mock לדשבורד (תיק, אחזקות,
  פעילות, היסטוריית ביצועים).

### Portfolio repository

קיים shim של repository תחת `src/lib/portfolio/`:

- `src/lib/portfolio/repository.ts` — פונקציות ציבוריות
  (`getPortfolioSummary`, `getHoldings` וכו') שמחזירות כרגע את
  ה-mocks מ-`src/data/dashboard-mock.ts`.
- `src/lib/portfolio/types.ts` — סוגים ציבוריים של שכבת ה-repo.

המטרה היא שקומפוננטות של דשבורד יקראו רק ל-repository ולא
ישלפו מ-`dashboard-mock` ישירות. מעבר מלא לשכבה הזו עדיין
בעבודה (tracked by Agent 4, בתהליך נכון ל-2026-04-10) —
כשמוסיפים מקור נתונים אמיתי (API/DB) מחליפים רק את הגופים של
הפונקציות ב-`repository.ts` והחתימות נשארות.

## Stack ה-frontend

- **Next.js 16** עם App Router. `proxy.ts` במקום `middleware.ts`.
- **React 19** + TypeScript strict.
- **Tailwind CSS v4** דרך `@tailwindcss/postcss`. קובץ הגלובלי:
  `src/app/globals.css`.
- **shadcn/ui** (variant `base-nova`) עבור primitives. קיים גם
  `@base-ui/react` לפריסות מורכבות.
- **Framer Motion** לאנימציות.
- **Recharts** לגרפים בדשבורד.
- **Lucide React** לאייקונים.

## גבולות שגיאה (Error boundaries)

- `src/app/error.tsx` — גבול שגיאה בסיסי של Next.js לעצים
  שמתחת ל-`app/`.
- `src/app/global-error.tsx` — גבול שגיאה שמחליף את כל ה-HTML
  (כולל `<html>`/`<body>`) במקרה של שגיאה חמורה שמתרחשת
  ב-root layout.
- `src/app/not-found.tsx` — דף 404 מותאם.

## כותרות תגובה ו-CSP

כל תגובה עוברת דרך שתי שכבות כותרות:

1. `next.config.ts:75-82` מוסיף גלובלית את `securityHeaders`
   הכוללים CSP, HSTS, COOP, CORP, X-Frame-Options, Referrer-Policy,
   Permissions-Policy, X-Content-Type-Options.
2. `src/proxy.ts:93-95` מוסיף `X-Request-ID` ייחודי לכל תגובה
   לצורכי trace בלוגים.
</content>
</invoke>
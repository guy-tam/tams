# אבטחה — TAMS

מסמך זה מתאר מודל האיומים, ההגנות הקיימות בפועל, והמגבלות
הידועות. כל פרט מצוטט מקובץ מציין שם קובץ וטווח שורות כדי
שיהיה אפשר לאמת.

## מודל איומים (one-pager)

אנחנו בונים אתר concept ציבורי עם דשבורד סגור. אנחנו מגינים
בעיקר מפני:

- **תוקפים אופורטוניסטיים** — סריקות אוטומטיות, ניסיונות
  exploit גנריים.
- **בוטים וסקרייפרים** — מנסים לשאוב תוכן, למלא טפסים, או
  לבזבז credits של OpenAI.
- **Credential stuffing** — ניסיונות התחברות מרובים עם
  סיסמאות מורחפות.
- **CSRF** — בקשות POST שמקורן מאתרים אחרים.
- **Clickjacking** — הטבעת האתר ב-`<iframe>` זדוני.
- **XSS** — הזרקת HTML דרך תוכן הטופס או פרמטרים בכתובות.
- **דליפת מידע** — חשיפת משתני סביבה, hash של סיסמה, ו-stack
  traces דרך תגובות API.

אנחנו **לא** מתיימרים להגן מפני תוקף מתוחכם עם קוד משלו,
שרשראות אספקה מזויפות, או עימותים פיזיים. אין כאן נתוני לקוח
אמיתיים, אין custody של נכסים — האתר הוא concept.

## שכבות הגנה והיכן הן יושבות

### 1. כותרות HTTP (CSP + COOP + CORP + HSTS)

מוגדרות ב-`next.config.ts:4-68` ומוחלות על כל הנתיבים דרך
`next.config.ts:75-82`. הרשימה:

- `Content-Security-Policy` עם `default-src 'self'`,
  `object-src 'none'`, `frame-ancestors 'self'`,
  `form-action 'self'`, `upgrade-insecure-requests`,
  ו-allowlist מצומצם ל-GA, OpenAI, Resend ו-Google Fonts.
- `Strict-Transport-Security` ל-63072000 שניות (שנתיים)
  עם `includeSubDomains; preload`.
- `Cross-Origin-Opener-Policy: same-origin` — מגן מפני
  Spectre ודומיו.
- `Cross-Origin-Resource-Policy: same-origin` — מונע שאיבת
  משאבים של הדומיין על ידי אתרים אחרים.
- `X-Frame-Options: SAMEORIGIN` (שכבה שנייה ל-CSP
  `frame-ancestors`).
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- `poweredByHeader: false` — מוסתר `X-Powered-By`
  (`next.config.ts:72`).

### 2. Edge proxy

`src/proxy.ts` רץ לפני כל `/api/*`, `/login`, `/dashboard/*`
(matcher ב-`src/proxy.ts:100-102`).

- **חסימת UA פוגעני** — רשימת סוכני scanning שחסומים
  (`src/proxy.ts:13-26`, בדיקה ב-`src/proxy.ts:51-53`).
  הרשימה כוללת sqlmap, nikto, nmap, dirbuster, gobuster,
  masscan, nessus, openvas, havij, w3af, acunetix, burpsuite.
- **CSRF-lite** — לכל `POST /api/*` עם Origin, ה-proxy דורש
  שה-Origin יתאים ל-host של הבקשה (`src/proxy.ts:57-77`).
  ללא Origin — מאפשר ומעביר ל-route handler, ששם מתבצעת
  בדיקה עמוקה יותר.
- **שער אימות** — בקשות ל-`/dashboard/*` נבדקות מול
  `verifySessionToken` (`src/proxy.ts:82-90`).
- **X-Request-ID** — מתווסף לכל תגובה
  (`src/proxy.ts:93-95`) ונכנס ללוגים עם כל הודעה.

### 3. Rate limiting

המימוש המרכזי ב-`src/lib/security.ts:86-109`.

- **ברירת מחדל in-memory** — `Map` ברמת המופע
  (`src/lib/security.ts:14-44`). **פר-instance בלבד** — לא
  משותף בין תהליכי Vercel.
- **מתאם אופציונלי**: `UPSTASH_REDIS_REST_URL` +
  `UPSTASH_REDIS_REST_TOKEN` מפעילים את מתאם Upstash
  (`src/lib/rate-limit/upstash.ts`, נטען דינמית ב-
  `src/lib/security.ts:52-79`). אם המתאם כושל בזמן בקשה, יש
  נפילה אוטומטית חזרה ל-in-memory (`src/lib/security.ts:92-105`).

תקציבי הקצב הנוכחיים:

| נתיב | מגבלה | חלון | מקור |
|------|-------|------|------|
| `POST /api/auth/login` | 10 ניסיונות | 15 דקות | `src/app/api/auth/login/route.ts:31` |
| `POST /api/guide` | 20 בקשות | 10 דקות | `src/app/api/guide/route.ts:20-21` |
| `POST /api/contact` | 3 שליחות | 60 דקות | `src/app/api/contact/route.ts:32-33` |

### 4. ולידציה בכניסה ל-API

`src/app/api/contact/route.ts` משתמש בשבע שכבות הגנה
ברצף, כל אחת מסומנת בהערות בקוד:

- **שכבה 0** — `checkOrigin` לפני כל דבר
  (`src/app/api/contact/route.ts:80-86`).
- **שכבה 1** — rate limit לפי IP
  (`src/app/api/contact/route.ts:89-95`).
- **שכבה 2** — honeypot: שדה נסתר `company_url` שאמור
  להישאר ריק; בוט שממלא אותו מקבל `{ success: true }` מזויף
  (`src/app/api/contact/route.ts:113-118`).
- **שכבה 3** — קיום שדות חובה
  (`src/app/api/contact/route.ts:121-123`).
- **שכבה 4** — בדיקת טיפוסים (strings בלבד)
  (`src/app/api/contact/route.ts:126-138`).
- **שכבה 5** — הגבלת אורך לפי `MAX_LENGTHS`
  (`src/app/api/contact/route.ts:13-20`, אכיפה ב-141-157).
- **שכבה 6** — regex לבדיקת אימייל
  (`src/app/api/contact/route.ts:160-165`).
- **שכבה 7** — הסרת תגיות HTML מכל המחרוזות ו-`escapeHtml`
  בתוך תבנית המייל (`src/app/api/contact/route.ts:168-173`,
  `236-243`).

`src/app/api/guide/route.ts` בונה סכמה דומה: origin, rate limit,
גודל body מוגבל (50KB), `messages` כמערך עם role מוגבל
ל-`user`/`assistant`, תוכן עד 2000 תווים, מקסימום 50 הודעות,
ו-allowlist של שפות. ראו `src/app/api/guide/route.ts:10-17` לרשימת
הקבועים.

### 5. סשנים חתומים

- חתימה: HMAC-SHA256 מעל payload מקודד base64url
  (`src/lib/auth/session.ts:66-77`, `108-113`).
- אימות: השוואה בזמן קבוע (`constantTimeEqual`,
  `src/lib/auth/session.ts:57-62`) ובדיקת תוקף
  (`src/lib/auth/session.ts:147-148`).
- עוגייה: `HttpOnly`, `Secure` בפרודקשן, `SameSite=Lax`,
  TTL של 12 שעות (`src/lib/auth/session.ts:169-175`).
- אימות סיסמה: PBKDF2 hash דרך `src/lib/auth/passwords.ts`,
  שנקרא מתוך `src/app/api/auth/login/route.ts:78`.

### 6. Honeypot בטופס יצירת קשר

שדה `company_url` בטופס הגישה (`src/app/api/contact/route.ts:110`)
— אמיתי בקוד, מוסתר בממשק. בקשה שמגיעה עם הערך כלשהו מסומנת
כבוט ומקבלת תגובה מזויפת של הצלחה.

## מדיניות סודות

כל הסודות נמצאים ב-`.env.example` (ללא ערכים אמיתיים) ונטענים
דרך `process.env`. עותק הפיתוח צריך להיות ב-`.env.local`
(מחוץ ל-git).

| שם | חובה בפרודקשן? | השפעה אם חסר |
|----|----------------|--------------|
| `AUTH_SECRET` | כן (≥32 תווים) | האפליקציה תזרוק בהפעלה: `src/lib/auth/session.ts:22-26` |
| `OPENAI_API_KEY` | לא | `/api/guide` יחזיר 501 `no_api_key` (`src/app/api/guide/route.ts:52-55`) |
| `RESEND_API_KEY` | לא | `/api/contact` יחזיר 501 `no_api_key` (`src/app/api/contact/route.ts:97-100`) |
| `CONTACT_EMAIL` | לא | ברירת מחדל: `xrptam2@gmail.com` (`src/app/api/contact/route.ts:10`) |
| `NEXT_PUBLIC_GA_ID` | לא | Google Analytics פשוט לא ייטען |
| `NEXT_PUBLIC_SITE_URL` | מומלץ | משפיע על sitemap, Open Graph |
| `ALLOWED_ORIGINS` | לא | Preview deployments עלולים להיחסם על ידי `checkOrigin` |
| `UPSTASH_REDIS_REST_URL` + `_TOKEN` | לא | rate limit יישאר in-memory (פר-instance בלבד) |
| `LOG_LEVEL` | לא | ברירת מחדל: `info` בפרודקשן, `debug` בפיתוח |

בפיתוח בלבד: כשאין `AUTH_SECRET` נעשה שימוש ב-`DEV_SECRET`
קבוע (`src/lib/auth/session.ts:13-15`) עם אזהרה חד-פעמית
ב-console. לעולם אל תפעילו את זה בפרודקשן — הקוד יזרוק שגיאה
במכוון (`src/lib/auth/session.ts:20-26`).

## Runbook — רוטציית סודות

### רוטציית `AUTH_SECRET`

**תוצאה**: כל הסשנים הקיימים מתבטלים (החתימות לא יתאימו). כל
המשתמשים יישלחו ל-`/login` בפעולה הבאה שלהם.

1. הפקת ערך חדש: `openssl rand -base64 48`.
2. ב-Vercel → Project → Settings → Environment Variables —
   עדכן `AUTH_SECRET` (Production + Preview לפי הצורך).
3. Redeploy (או Promote לגרסה הקיימת).
4. וידוא: `curl -i https://.../api/auth/me` אמור להחזיר
   `{ user: null }`. נסה להתחבר מחדש.

### רוטציית `RESEND_API_KEY`

**תוצאה**: מיילי contact לא יישלחו עד שהמפתח יתעדכן.

1. ב-Resend → API Keys → צור מפתח חדש, סמן את הישן ל-revoke
   **לאחר** האימות.
2. עדכן ב-Vercel, redeploy.
3. בדוק על ידי שליחת טופס contact אמיתי ואימות שהמייל הגיע.
4. מחק את המפתח הישן ב-Resend.

### רוטציית `OPENAI_API_KEY`

**תוצאה**: `/api/guide` יחזיר 501 עד שהמפתח יתעדכן.

1. ב-OpenAI → API Keys → צור מפתח חדש.
2. עדכן ב-Vercel, redeploy.
3. בדיקה: `curl -X POST .../api/guide -d '{"messages":[{"role":"user","content":"hello"}]}'`
   מהדומיין (עם Origin נכון).
4. מחק את המפתח הישן.

## מגבלות ידועות

כדאי להיות כנים לגביהן, כי הארכיטקטורה לא מסתירה אותן:

1. **מאגר משתמשים in-memory** — `src/lib/auth/users.ts` הוא
   מאגר דמו. אין DB אמיתי. החלפה למאגר אמיתי היא משימה מתוכננת
   (tracked by Agent 2).
2. **Rate limit פר-instance** — ברירת המחדל היא `Map` בזיכרון
   (`src/lib/security.ts:14`). על Vercel שרץ פונקציות מרובות
   זה אומר שמגבלה של 10 יכולה להפוך בפועל ל-10×N. הפתרון:
   הגדר Upstash דרך `UPSTASH_REDIS_REST_URL` ו-
   `UPSTASH_REDIS_REST_TOKEN`.
3. **CSP עדיין עם `'unsafe-inline'` ב-scripts** —
   (`next.config.ts:56`). Next.js מחייב את זה עבור ה-inline
   runtime שלו. הסרה דורשת מעבר ל-nonces, עבודה לא-טריוויאלית
   מעבר לאפליקציה כולה.
4. **`checkOrigin` fallback ב-dev** — ב-development,
   בקשות ללא Origin ו-ללא Referer עוברות
   (`src/lib/security.ts:153`). אין סיכון בפרודקשן, אבל
   חשוב לזכור שבבדיקות מקומיות ייתכן שאתם לא משחזרים את
   ההתנהגות האמיתית.
5. **Honeypot + rate limit בלבד** — אין captcha או proof-of-work.
   נגד בוט רציני עם headless browser יש פערים. היסטוריה:
   בחרנו לא להוסיף captcha כדי לא לפגוע בחוויה.
6. **אין audit log מתמשך** — הלוגים הם stdout בלבד
   (`src/lib/logger.ts`), שמרוכזים ב-Vercel Runtime Logs ומסתובבים
   לפי מדיניות Vercel. אין sink מתמשך.
</content>
</invoke>
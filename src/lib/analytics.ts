/**
 * עטיפת אנליטיקה ממוינת (typed) ל-Google Analytics 4.
 *
 * למה קיים הקובץ הזה:
 * 1. אירועים ממוינים — איחוד דיסקרימינטיבי מבטיח שטעויות הקלדה בשם אירוע
 *    או בפרמטרים שלו ייכשלו כבר בזמן קומפילציה (TS strict).
 * 2. No-op שקט — אם `window.gtag` לא קיים (שרת, חוסם פרסומות,
 *    GA לא נטען, או שהמשתנה `NEXT_PUBLIC_GA_ID` חסר) הפונקציות פשוט
 *    לא עושות כלום ולא זורקות שגיאה.
 * 3. בטוח לייבוא משרת ולקוח — אין ייבוא של React או APIs של הדפדפן,
 *    יש בדיקת `typeof window` בכל פונקציה.
 *
 * איך מוסיפים סוג אירוע חדש:
 *   מרחיבים את האיחוד `TamsEvent` עם וריאנט נוסף שמכיל `name` ייחודי
 *   ואובייקט `params` מתאים. זהו — הטיפוסים ידאגו לשאר.
 *
 * דוגמת שימוש (מתוך קומפוננטת לקוח):
 *   // track({ name: "cta_click", params: { location: "hero", label: "join" } });
 *   // pageview("/investors");
 */

// הרחבת גלובל עבור gtag כדי שנוכל לקרוא לו ללא any
declare global {
  // eslint-disable-next-line no-var
  var gtag: ((...args: unknown[]) => void) | undefined;
}

// קטלוג האירועים המותרים — איחוד דיסקרימינטיבי לפי השדה `name`
export type TamsEvent =
  | { name: "cta_click"; params: { location: string; label: string } }
  | {
      name: "form_submit";
      params: { form: "contact" | "access" | "login"; success: boolean };
    }
  | { name: "language_change"; params: { from: string; to: string } }
  | { name: "external_link"; params: { href: string; label?: string } }
  | { name: "ai_guide_open"; params: { route?: string } }
  | { name: "investor_tier_view"; params: { tier: string } };

// שמות האירועים האפשריים, נגזר אוטומטית מהאיחוד
export type TamsEventName = TamsEvent["name"];

// האם אנחנו בסביבת פיתוח — בפיתוח נרשום ללוג לצורכי דיבוג
const isDev = process.env.NODE_ENV !== "production";

// עוזר פנימי: בודק שאנחנו בלקוח ושה-gtag זמין
function getGtag(): ((...args: unknown[]) => void) | null {
  // הגנה מפני ריצה בשרת (SSR / RSC)
  if (typeof window === "undefined") return null;
  // הגנה מפני חוסמי פרסומות או GA שלא נטען (חסר NEXT_PUBLIC_GA_ID)
  const fn = (globalThis as { gtag?: (...args: unknown[]) => void }).gtag;
  return typeof fn === "function" ? fn : null;
}

/**
 * שולח אירוע ממוין ל-GA4. אם gtag לא זמין, הפונקציה לא עושה כלום.
 * הגנריות מבטיחה ש-TypeScript יחייב התאמה מדויקת בין `name` ל-`params`.
 */
export function track<T extends TamsEvent>(event: T): void {
  // בפיתוח: רישום ללוג כדי שמפתחים יראו שהאירוע נשלח
  if (isDev) {
    // לוג רק בפיתוח — בפרודקשן אנחנו סומכים על GA4 כקולט
    console.log("[analytics]", event.name, event.params);
  }

  const gtag = getGtag();
  if (!gtag) return;

  // קריאה סטנדרטית ל-GA4 event API
  gtag("event", event.name, event.params);
}

/**
 * שולח אירוע `page_view` ל-GA4 עבור נתיב נתון.
 * שימושי בעיקר לניווטים client-side שה-SPA לא מפעיל בהם רענון.
 */
export function pageview(path: string): void {
  // בפיתוח: רישום ללוג גם כאן
  if (isDev) {
    console.log("[analytics]", "page_view", { path });
  }

  const gtag = getGtag();
  if (!gtag) return;

  // GA4 מזהה אוטומטית `page_view` כאירוע מובנה
  gtag("event", "page_view", { page_path: path });
}

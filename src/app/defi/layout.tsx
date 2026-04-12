// מטא-דאטה לדף ה-DeFi — אסטרטגיית תשואה מבוזרת ומסגרת סיכונים
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "אסטרטגיית תשואה מבוזרת — DeFi",
  description:
    "ארנק ה-DeFi של TAMS פורס 25% מהון הפורטפוליו באסטרטגיות תשואה מוסדיות — הלוואות, סטייקינג נזיל והספקת נזילות — עם חשיפה מרבית מוגבלת וניהול סיכונים שיטתי.",
  path: "/defi",
});

export default function DefiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

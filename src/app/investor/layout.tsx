// מטא-דאטה לדף המשקיע — סקירה, מפת דרכים וגילויי סיכונים
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "חוויית המשקיע ומפת הדרכים",
  description:
    "סקירה למשקיע: הדגשי המסגרת, מפת דרכים רב-שנתית, גילויי סיכונים מקיפים ותיאור TAMS כמסגרת מושגית — לא כקרן פעילה או מוצר פיננסי.",
  path: "/investor",
});

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return children;
}

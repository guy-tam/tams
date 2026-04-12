// מטא-דאטה לדף הארכיטקטורה — מבנה ריבוי ארנקים והקצאת הון שיטתית
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "ארכיטקטורת ריבוי ארנקים",
  description:
    "ארכיטקטורת ההון של TAMS: הקצאה שיטתית בין ארבעה ארנקים מתמחים — אחזקות ארוכות טווח, מסחר אקטיבי, תשואת DeFi ותפעול — עם פרמטרי סיכון ויעדי ביצוע מוגדרים.",
  path: "/architecture",
});

export default function ArchitectureLayout({ children }: { children: React.ReactNode }) {
  return children;
}

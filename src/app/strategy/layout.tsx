// מטא-דאטה לדף האסטרטגיה — מסגרת עסקית, מיפוי שוק ומיצוב תחרותי
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "מסגרת עסקית אסטרטגית",
  description:
    "מיפוי שוק (TAM/SAM/SOM), הוכחת יכולת, הוכחת היתכנות ומיצוב תחרותי — הבסיס האסטרטגי של מסגרת ההשקעות של TAMS בתזמון המעבר המוסדי.",
  path: "/strategy",
});

export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

// מטא-דאטה לדף החברה — חזון, ייעוד, עקרונות יסוד ותהליך הפעולה של TAMS
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "מי אנחנו",
  description:
    "TAMS היא מסגרת מושגית לניהול נכסים דיגיטליים במשמעת מוסדית. חזון, ייעוד, עקרונות ליבה ותהליך העבודה שמאחורי ארכיטקטורת ריבוי הארנקים.",
  path: "/company",
});

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

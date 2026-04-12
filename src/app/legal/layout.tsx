// מטא-דאטה לדף המשפטי — תנאי שימוש, פרטיות, גילוי סיכונים ומידע רגולטורי
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "מידע משפטי וציות",
  description:
    "תנאי שימוש, מדיניות פרטיות, גילוי סיכונים, הצהרת אי-ייעוץ השקעות ומידע רגולטורי של TAMS — מסגרת מושגית להדגמת ניהול תשתית השקעות בבלוקצ'יין.",
  path: "/legal",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

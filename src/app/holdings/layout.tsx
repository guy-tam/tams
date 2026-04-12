// מטא-דאטה לדף האחזקות — מחקר על 16 נכסים דיגיטליים בשישה ורטיקלים
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "מחקר נכסים — 16 נכסים ב-6 ורטיקלים",
  description:
    "מחקר האחזקות ארוכות הטווח של TAMS: 16 נכסים דיגיטליים מגובי מחקר בשישה ורטיקלים — שכבה 1, תשלומים, תשתית, ארגוני, נכסי עולם אמיתי ובינה מלאכותית/חישוב.",
  path: "/holdings",
});

export default function HoldingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

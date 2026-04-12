// מטא-דאטה לדף הראיות — מאגר מוסדי של קשרים מאומתים לתשתית בלוקצ'יין
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "מאגר ראיות מוסדי — תזת תשתית מגובת ראיות",
  description:
    "קשרים מאומתים בין נכסי תשתית למוסדות פיננסיים, רשתות תשלומים, בנקים מרכזיים ומערכות ארגוניות. מטריצת תזות, סייר ראיות ומסגרת סיווג רמות ביטחון.",
  path: "/proof",
});

export default function ProofLayout({ children }: { children: React.ReactNode }) {
  return children;
}

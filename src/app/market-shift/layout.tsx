// מטא-דאטה לדף שינוי השוק — הזרזים שמאיצים את המעבר המוסדי
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "למה עכשיו: המעבר המוסדי",
  description:
    "התכנסות של אישור ETF, בהירות רגולטורית, אימוץ תאגידי, טוקניזציית RWA והבשלת DeFi הופכת את הבלוקצ'יין ממעמד נכסים ספקולטיבי לתשתית מוסדית.",
  path: "/market-shift",
});

export default function MarketShiftLayout({ children }: { children: React.ReactNode }) {
  return children;
}

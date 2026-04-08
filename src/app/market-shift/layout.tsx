import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TAMS | שינוי השוק",
  description: "ניתוח מגמות השוק המובילות את המעבר לתשתית בלוקצ'יין מוסדית — טוקניזציה, RWA, תשלומים ו-DeFi.",
};
export default function MarketShiftLayout({ children }: { children: React.ReactNode }) {
  return children;
}

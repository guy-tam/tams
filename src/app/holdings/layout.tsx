import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TAMS | אחזקות הפורטפוליו",
  description: "16 נכסי הליבה של TAMS — Ethereum, Solana, Chainlink, Avalanche ועוד. פרופילים מוסדיים וניתוח תזה.",
};
export default function HoldingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

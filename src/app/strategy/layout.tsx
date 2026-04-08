import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TAMS | אסטרטגיה",
  description: "האסטרטגיה המוסדית של TAMS — ניהול תיק, ניהול סיכונים, תרחישי צמיחה ותוכנית פעולה.",
};
export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

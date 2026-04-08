import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TAMS | פורטל משקיעים",
  description: "גישה למשקיעים מאומתים — דוחות, ביצועים, ניתוח תיק ומידע מוסדי בלעדי.",
};
export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return children;
}

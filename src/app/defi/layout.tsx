import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TAMS | אסטרטגיית DeFi",
  description: "אסטרטגיית DeFi מוסדית של TAMS — תשואה, נזילות, סטייקינג ואופטימיזציה של תיק מבוזר.",
};
export default function DefiLayout({ children }: { children: React.ReactNode }) {
  return children;
}

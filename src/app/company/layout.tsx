import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TAMS | על החברה",
  description: "TAMS — חברת תשתית השקעות בלוקצ'יין. חזון, מבנה ארגוני ואסטרטגיה מוסדית לניהול נכסים דיגיטליים.",
};
export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

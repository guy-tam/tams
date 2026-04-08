import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TAMS | ארכיטקטורת השקעה",
  description: "ארכיטקטורת תיק ההשקעות של TAMS — חלוקת נכסים, מבנה סיכון-תשואה ואסטרטגיית גידור.",
};
export default function ArchitectureLayout({ children }: { children: React.ReactNode }) {
  return children;
}

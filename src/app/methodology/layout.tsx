import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TAMS | מתודולוגיית מחקר והשקעה",
  description: "מסגרת המחקר, מתודולוגיית בחירת הנכסים ומודל סיווג הראיות של TAMS",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

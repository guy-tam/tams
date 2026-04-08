import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TAMS | מידע משפטי וציות",
  description: "תנאי שימוש, מדיניות פרטיות, גילוי סיכונים ומידע רגולטורי — TAMS",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

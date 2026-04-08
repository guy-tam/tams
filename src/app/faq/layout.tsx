import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TAMS | שאלות נפוצות",
  description:
    "שאלות נפוצות על TAMS — תשתית השקעות בלוקצ'יין, מתודולוגיה, פורטפוליו וגישה למשקיעים",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TAMS | ראיות מוסדיות",
  description: "259 ראיות מאומתות של אימוץ מוסדי על פני 16 נכסי בלוקצ'יין — מסד נתונים מוסדי שקוף ומבוסס מקורות ראשוניים.",
};
export default function ProofLayout({ children }: { children: React.ReactNode }) {
  return children;
}

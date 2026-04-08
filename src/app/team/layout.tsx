import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TAMS | הצוות והמבנה הארגוני",
  description:
    "המבנה הארגוני, ערכי הליבה והצוות המקצועי של TAMS — תשתית השקעות בלוקצ'יין ברמה מוסדית",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

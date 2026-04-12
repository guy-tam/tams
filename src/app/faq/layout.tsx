// מטא-דאטה לדף השאלות הנפוצות — תשובות על TAMS, המתודולוגיה והפורטפוליו
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "שאלות נפוצות",
  description:
    "תשובות לשאלות הנפוצות ביותר על TAMS: התזה המרכזית, בחירת נכסים, ניקוד ראיות, רמות ביטחון, סיכוני השקעה בנכסים דיגיטליים וגישה למשקיעים.",
  path: "/faq",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

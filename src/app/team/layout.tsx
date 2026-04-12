// מטא-דאטה לדף הצוות — מבנה ארגוני, עמודי ליבה וערכי TAMS
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "צוות ומבנה ארגוני",
  description:
    "המבנה הארגוני של TAMS: ארבעה עמודי ליבה — מחקר, מסחר, תשתית וציות — לצד ערכי קפדנות מוסדית, שקיפות, ניהול סיכונים ומועצה מייעצת מקצועית.",
  path: "/team",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

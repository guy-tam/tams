// מטא-דאטה לדף המתודולוגיה — מסגרת המחקר, בחירת נכסים וסיווג ראיות
import type { Metadata } from "next";
import buildPageMetadata from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "מתודולוגיית מחקר ובחירת נכסים",
  description:
    "מסגרת המחקר של TAMS: קריטריונים לבחירת נכסים — רלוונטיות תשתיתית, אימוץ מוסדי, בהירות רגולטורית ובשלות טכנולוגית — לצד מודל סיווג ראיות וניהול סיכונים.",
  path: "/methodology",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

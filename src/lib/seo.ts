// עוזר ליצירת Metadata אחיד לדפי האתר — מיזוג ברירות מחדל עם ערכים ספציפיים לדף
import type { Metadata } from "next";

// כתובת הבסיס של האתר (ללא סלאש סופי) — נטענת ממשתנה סביבה עם נפילה לדומיין הייצור
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tams-two.vercel.app"
).replace(/\/$/, "");

// פרמטרים לבניית Metadata לדף בודד
export type BuildPageMetadataInput = {
  // כותרת ליבה של הדף (ללא הסיומת "| TAMS" — נוספת אוטומטית)
  title: string;
  // תיאור קצר לדף (120-180 תווים מומלץ)
  description: string;
  // נתיב הדף החל מסלאש (למשל "/company")
  path: string;
  // נתיב תמונת OG אופציונלי (ברירת מחדל: ללא, ייפול ל-/opengraph-image)
  ogImage?: string;
  // מילות מפתח אופציונליות
  keywords?: string[];
};

// בונה אובייקט Metadata עבור דף ספציפי — כותרת, תיאור, קנוניקל, OpenGraph ו-Twitter
export default function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  keywords,
}: BuildPageMetadataInput): Metadata {
  // מוודא שה-path מתחיל בסלאש כדי לבנות URL תקין
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${SITE_URL}${normalizedPath}`;
  // הכותרת המלאה משלבת את כותרת הדף עם מותג האתר
  const fullTitle = `${title} | TAMS`;

  return {
    title: fullTitle,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      siteName: "TAMS",
      locale: "he_IL",
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

// יצוא בשם גם כן, לצורך נוחות ייבוא בלתי-ברירת-מחדל
export { buildPageMetadata };

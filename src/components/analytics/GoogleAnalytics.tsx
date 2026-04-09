// רכיב Google Analytics (GA4)
// טוען את סקריפט gtag.js ומנהל מעקב צפיות בדפים
// נטען רק כאשר משתנה הסביבה NEXT_PUBLIC_GA_ID מוגדר

"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  // אם אין מזהה מדידה — לא טוען כלום
  if (!GA_ID) return null;

  return (
    <>
      {/* טעינת סקריפט gtag.js מגוגל */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* אתחול gtag עם מזהה המדידה */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

// תבנית ראשית - מבנה האפליקציה עם ניווט צדדי, מצב כהה ותמיכה בריבוי שפות
import type { Metadata } from "next";
import { Geist, Geist_Mono, Heebo } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// מטא-דאטה של האפליקציה
export const metadata: Metadata = {
  title: "TAMS | Blockchain Investment Infrastructure",
  description: "TAMS — תשתית השקעות בלוקצ'יין ברמה מוסדית. 259 ראיות מאומתות על פני 16 נכסים. מחקר שמרני, סיווג מוסדי, שקיפות מלאה.",
  keywords: ["blockchain", "institutional investment", "tokenization", "RWA", "DeFi", "TAMS"],
  authors: [{ name: "TAMS" }],
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://tams.vercel.app",
    siteName: "TAMS",
    title: "TAMS | Blockchain Investment Infrastructure",
    description: "תשתית השקעות בלוקצ'יין ברמה מוסדית — מחקר מוסדי, 259 ראיות מאומתות, 16 נכסים",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TAMS — Blockchain Investment Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAMS | Blockchain Investment Infrastructure",
    description: "תשתית השקעות בלוקצ'יין ברמה מוסדית — מחקר מוסדי, 259 ראיות מאומתות",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${heebo.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground flex">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

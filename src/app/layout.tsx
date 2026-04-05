// תבנית ראשית - מבנה האפליקציה עם ניווט צדדי ומצב כהה
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// מטא-דאטה של האפליקציה
export const metadata: Metadata = {
  title: "TAMS | Blockchain Investment Infrastructure",
  description:
    "TAMS is a premium concept app showcasing blockchain-based investment infrastructure, DeFi strategy, and institutional-grade portfolio management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100 flex">
        {/* ניווט צדדי */}
        <Navigation />

        {/* תוכן ראשי - רווח שמאלי בדסקטופ עבור הסיידבר */}
        <div className="flex-1 lg:pl-64">{children}</div>
      </body>
    </html>
  );
}

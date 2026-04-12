"use client";

// מעטפת האפליקציה - AuthProvider + LanguageProvider + ניווט + תוכן עם RTL דינמי
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/lib/auth";
import { LanguageProvider } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import type { Language, TranslationStrings } from "@/lib/i18n";
import dynamic from "next/dynamic";
import Navigation from "./Navigation";
import Footer from "./Footer";
import TamsLogo from "./TamsLogo";
import { ToastProvider } from "@/components/ui/toast";

// טעינה עצלה של המדריך — לא מאט את הטעינה הראשונית
const InvestorGuide = dynamic(() => import("@/components/ai-guide/InvestorGuide"), {
  ssr: false,
});

// ייבוא תרגומים
import en from "@/lib/i18n/locales/en";
import he from "@/lib/i18n/locales/he";
import ar from "@/lib/i18n/locales/ar";
import ru from "@/lib/i18n/locales/ru";
import es from "@/lib/i18n/locales/es";

const translations: Record<Language, TranslationStrings> = { en, he, ar, ru, es };

// רכיב פנימי - מבנה התוכן עם RTL דינמי
// בנתיבי דשבורד לא מוצגת הניווט הציבורי - יש להם סרגל צד ייעודי
function ShellInner({ children }: { children: ReactNode }) {
  const { isRTL } = useLanguage();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname.startsWith("/login");

  // בדשבורד ובדף ההתחברות - תוכן מלא ללא ניווט ציבורי
  if (isDashboard || isLogin) {
    return <>{children}</>;
  }

  return (
    <>
      {/* נגישות: קישור דילוג לתוכן — מופיע בעת פוקוס מהמקלדת */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:rounded-lg focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:shadow-lg"
      >
        דלג לתוכן הראשי
      </a>
      <Navigation />
      <div className={`flex-1 ${isRTL ? "lg:pr-64" : "lg:pl-64"}`}>
        {/* לוגו עץ מוזהב — קבוע, לא נטען מחדש בין עמודים */}
        <div className="hidden lg:block">
          <TamsLogo />
        </div>
        {/* נגישות: מעטפת התוכן הראשי עם מזהה ליעד של skip link */}
        <div id="main" tabIndex={-1} className="outline-none">
          {children}
        </div>
        {/* פוטר גלובלי — מוצג רק בעמודים ציבוריים */}
        <Footer />
      </div>
      {/* מדריך AI למשקיעים — כפתור צף בכל העמודים הציבוריים */}
      <InvestorGuide />
    </>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider translations={translations}>
        <ToastProvider>
          <ShellInner>{children}</ShellInner>
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

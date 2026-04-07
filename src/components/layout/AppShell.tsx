"use client";

// מעטפת האפליקציה - AuthProvider + LanguageProvider + ניווט + תוכן עם RTL דינמי
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/lib/auth";
import { LanguageProvider } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import type { Language, TranslationStrings } from "@/lib/i18n";
import Navigation from "./Navigation";
import TamsLogo from "./TamsLogo";
import { ToastProvider } from "@/components/ui/toast";

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
      <Navigation />
      <div className={`flex-1 ${isRTL ? "lg:pr-64" : "lg:pl-64"}`}>
        {/* לוגו עץ מוזהב — קבוע, לא נטען מחדש בין עמודים */}
        <div className="hidden lg:block">
          <TamsLogo />
        </div>
        {children}
      </div>
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

"use client";

// מעטפת האפליקציה - LanguageProvider + ניווט + תוכן עם RTL דינמי
import { type ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n";
import type { Language, TranslationStrings } from "@/lib/i18n";
import Navigation from "./Navigation";

// ייבוא תרגומים
import en from "@/lib/i18n/locales/en";
import he from "@/lib/i18n/locales/he";
import ar from "@/lib/i18n/locales/ar";
import ru from "@/lib/i18n/locales/ru";
import es from "@/lib/i18n/locales/es";

const translations: Record<Language, TranslationStrings> = { en, he, ar, ru, es };

// רכיב פנימי - מבנה התוכן עם RTL דינמי
function ShellInner({ children }: { children: ReactNode }) {
  const { isRTL } = useLanguage();

  return (
    <>
      <Navigation />
      <div className={`flex-1 ${isRTL ? "lg:pr-64" : "lg:pl-64"}`}>
        {children}
      </div>
    </>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider translations={translations}>
      <ShellInner>{children}</ShellInner>
    </LanguageProvider>
  );
}

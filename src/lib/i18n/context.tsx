"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type {
  Language,
  TranslationStrings,
  Direction,
} from "./types";
import {
  DEFAULT_LANGUAGE,
  RTL_LANGUAGES,
} from "./types";

// מפתח לשמירת העדפת השפה באחסון המקומי
const STORAGE_KEY = "tams-language";

// --- סוגי הקונטקסט ---

interface LanguageContextValue {
  /** השפה הנוכחית */
  language: Language;
  /** פונקציה לשינוי השפה */
  setLanguage: (lang: Language) => void;
  /** פונקציה לקבלת תרגום לפי מפתח נקודה, לדוגמה: t("nav.home") */
  t: (key: string) => string;
  /** כיוון הטקסט - שמאל-לימין או ימין-לשמאל */
  dir: Direction;
  /** האם השפה הנוכחית היא ימין-לשמאל */
  isRTL: boolean;
}

// יצירת הקונטקסט עם ערך ברירת מחדל ריק
const LanguageContext = createContext<LanguageContextValue | null>(null);

// --- פונקציות עזר ---

/**
 * מחזירה את כיוון הטקסט עבור שפה נתונה
 */
function getDirection(lang: Language): Direction {
  return RTL_LANGUAGES.includes(lang) ? "rtl" : "ltr";
}

/**
 * גישה לערך מקונן באובייקט לפי נתיב נקודה
 * לדוגמה: getNestedValue(obj, "nav.home") => obj.nav.home
 */
function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") {
      // המפתח לא נמצא - מחזירים את הנתיב עצמו כפולבק
      return path;
    }
    current = (current as Record<string, unknown>)[key];
  }

  // אם הערך הסופי הוא מחרוזת, מחזירים אותו
  if (typeof current === "string") {
    return current;
  }

  // אם לא מחרוזת, מחזירים את הנתיב כפולבק
  return path;
}

/**
 * טוענת את השפה השמורה מהאחסון המקומי
 */
function loadSavedLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ["en", "he", "ar", "ru", "es"].includes(saved)) {
      return saved as Language;
    }
  } catch {
    // שגיאת גישה לאחסון המקומי - נשתמש בברירת מחדל
  }

  return DEFAULT_LANGUAGE;
}

/**
 * שומרת את העדפת השפה באחסון המקומי
 */
function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // שגיאת גישה לאחסון המקומי - מתעלמים
  }
}

// --- ספק הקונטקסט ---

interface LanguageProviderProps {
  children: ReactNode;
  /** תרגומים - מיפוי שפה לאובייקט תרגום */
  translations: Record<Language, TranslationStrings>;
  /** שפת ברירת מחדל (אופציונלי, ברירת מחדל: he) */
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  translations,
  defaultLanguage,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(
    defaultLanguage ?? DEFAULT_LANGUAGE
  );
  const [isHydrated, setIsHydrated] = useState(false);

  // טעינת השפה השמורה בעת הטעינה הראשונה (רק בצד הלקוח)
  useEffect(() => {
    const saved = loadSavedLanguage();
    setLanguageState(saved);
    setIsHydrated(true);
  }, []);

  // עדכון כיוון הטקסט ושפת המסמך בעת שינוי שפה
  useEffect(() => {
    if (!isHydrated) return;

    const dir = getDirection(language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, isHydrated]);

  // פונקציה לשינוי השפה עם שמירה באחסון המקומי
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  }, []);

  // פונקציית התרגום - מחפשת ערך באובייקט התרגום לפי נתיב נקודה
  const t = useCallback(
    (key: string): string => {
      const translationObj = translations[language];
      if (!translationObj) {
        return key;
      }
      return getNestedValue(translationObj, key);
    },
    [language, translations]
  );

  const dir = getDirection(language);
  const isRTL = RTL_LANGUAGES.includes(language);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t,
    dir,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// --- הוק לשימוש בקונטקסט ---

/**
 * הוק לגישה לפונקציות ונתוני השפה
 * חייב להיות בתוך LanguageProvider
 */
export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage חייב להיות בשימוש בתוך LanguageProvider. " +
        "עטפו את הקומפוננטה ב-LanguageProvider."
    );
  }

  return context;
}

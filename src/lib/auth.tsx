"use client";

// מערכת אימות - ספק קונטקסט והוק לניהול משתמשים
// מדמה מערכת אימות בסיסית לצרכי קונספט

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// --- טיפוסים ---

export interface User {
  /** מזהה ייחודי */
  id: string;
  /** שם מלא */
  name: string;
  /** דוא"ל */
  email: string;
  /** מזהה משקיע */
  investorId: string;
  /** תפקיד */
  role: "investor" | "admin";
}

interface AuthContextValue {
  /** המשתמש המחובר כרגע, או null */
  user: User | null;
  /** האם המשתמש מחובר */
  isAuthenticated: boolean;
  /** האם טוען */
  isLoading: boolean;
  /** פונקציית התחברות */
  login: (email: string, password: string) => Promise<boolean>;
  /** פונקציית התנתקות */
  logout: () => void;
}

// --- משתמש דמה ---

const MOCK_USER: User = {
  id: "usr_001",
  name: "דוד כהן",
  email: "david@tams-invest.com",
  investorId: "INV-2024-001",
  role: "investor",
};

// מפתח לאחסון מקומי
const AUTH_STORAGE_KEY = "tams-auth";

// --- קונטקסט ---

const AuthContext = createContext<AuthContextValue | null>(null);

// --- ספק ---

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // טעינת מצב אימות מהאחסון המקומי בעת הטעינה
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved === "true") {
        setUser(MOCK_USER);
      }
    } catch {
      // שגיאת גישה - מתעלמים
    }
    setIsLoading(false);
  }, []);

  // התחברות - מדמה בדיקת פרטים
  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    // סימולציה של השהיית רשת
    await new Promise((resolve) => setTimeout(resolve, 800));

    // בקונספט - כל התחברות מצליחה
    if (email) {
      setUser(MOCK_USER);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, "true");
      } catch {
        // שגיאת אחסון - מתעלמים
      }
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  }, []);

  // התנתקות
  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // שגיאת אחסון - מתעלמים
    }
    router.push("/");
  }, [router]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// --- הוק ---

/**
 * הוק לגישה למערכת האימות
 * חייב להיות בתוך AuthProvider
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth חייב להיות בשימוש בתוך AuthProvider. " +
        "עטפו את הקומפוננטה ב-AuthProvider."
    );
  }

  return context;
}

"use client";

// קונטקסט אימות - משתמש כעת ב-API צד שרת עם עוגיית סשן HttpOnly.
// הלקוח כבר לא ניגש ל-localStorage לצורך אימות — זהו מעבר ל-auth אמיתי.
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
// טיפוס User מיובא מקובץ נפרד כדי שיוכל להיטען גם ב-edge runtime (proxy).
import type { User } from "./types";

// --- טיפוסים ---

// רה-אקספורט של User — שומר על ה-API הציבורי של המודול התואם לאחור.
export type { User } from "./types";

/** ערכי קונטקסט האימות */
interface AuthContextValue {
  /** המשתמש המחובר, או null אם לא מחובר */
  user: User | null;
  /** האם המשתמש מאומת */
  isAuthenticated: boolean;
  /** פונקציית התחברות — קוראת ל-/api/auth/login */
  login: (email: string, password: string) => Promise<boolean>;
  /** פונקציית התנתקות — קוראת ל-/api/auth/logout */
  logout: () => Promise<void>;
  /** האם בתהליך טעינה */
  isLoading: boolean;
}

// יצירת הקונטקסט
const AuthContext = createContext<AuthContextValue | null>(null);

// --- ספק הקונטקסט ---

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // בעת אתחול — בודקים מול השרת אם יש סשן תקף
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        });
        if (res.ok) {
          const data = (await res.json()) as { user: User | null };
          if (!cancelled) setUser(data.user);
        }
      } catch {
        // חיבור נכשל — משאירים משתמש ריק
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // התחברות — שולחת לשרת ומקבלת עוגיית סשן חתומה
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = (await res.json()) as { user: User };
      setUser(data.user);
      return true;
    } catch {
      return false;
    }
  }, []);

  // התנתקות — מוחקת את העוגייה בצד השרת
  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } catch {
      // גם אם נכשל — ננקה בצד הלקוח
    }
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// --- הוק לשימוש בקונטקסט ---

/**
 * הוק לגישה למצב האימות ופונקציות ההתחברות/התנתקות
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

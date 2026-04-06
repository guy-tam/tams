"use client";

// ניהול אימות משתמשים - קונטקסט דמו לאפליקציית TAMS
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// --- טיפוסים ---

/** מבנה נתוני משתמש */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "investor" | "admin";
  investorId: string;
}

/** ערכי קונטקסט האימות */
interface AuthContextValue {
  /** המשתמש המחובר, או null אם לא מחובר */
  user: User | null;
  /** האם המשתמש מאומת */
  isAuthenticated: boolean;
  /** פונקציית התחברות */
  login: (email: string, password: string) => Promise<boolean>;
  /** פונקציית התנתקות */
  logout: () => void;
  /** האם בתהליך טעינה */
  isLoading: boolean;
}

// מפתח לשמירת מצב האימות באחסון המקומי
const STORAGE_KEY = "tams-auth";

// יצירת הקונטקסט
const AuthContext = createContext<AuthContextValue | null>(null);

// --- פונקציות עזר ---

/**
 * יוצרת משתמש דמו על בסיס כתובת אימייל
 * אם האימייל הוא demo@tams.io, נחזיר את המשתמש המוגדר מראש
 */
function createDemoUser(email: string): User {
  // משתמש דמו מוגדר מראש
  if (email.toLowerCase() === "demo@tams.io") {
    return {
      id: "usr-001",
      name: "David Cohen",
      email: "demo@tams.io",
      role: "investor" as const,
      investorId: "INV-001",
    };
  }

  // משתמש דינמי לפי האימייל
  const namePart = email.split("@")[0];
  const formattedName = namePart
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: `usr-${Date.now()}`,
    name: formattedName,
    email,
    role: "investor" as const,
    investorId: `INV-${Math.floor(Math.random() * 900) + 100}`,
  };
}

/**
 * טוענת משתמש שמור מהאחסון המקומי
 */
function loadSavedUser(): User | null {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as User;
      // בדיקה בסיסית שהנתונים תקינים
      if (parsed.id && parsed.email && parsed.name) {
        return parsed;
      }
    }
  } catch {
    // שגיאת קריאה מהאחסון - מתעלמים
  }

  return null;
}

/**
 * שומרת משתמש באחסון המקומי
 */
function saveUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // שגיאת כתיבה לאחסון - מתעלמים
  }
}

// --- ספק הקונטקסט ---

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // טעינת סשן שמור בעת אתחול
  useEffect(() => {
    const savedUser = loadSavedUser();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  // פונקציית התחברות - לדמו, מקבלת כל אימייל עם @
  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // בדיקה בסיסית - האם האימייל מכיל @
    if (!email.includes("@")) {
      return false;
    }

    // סימולציה של עיכוב רשת
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newUser = createDemoUser(email);
    setUser(newUser);
    saveUser(newUser);
    return true;
  }, []);

  // פונקציית התנתקות
  const logout = useCallback(() => {
    setUser(null);
    saveUser(null);
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

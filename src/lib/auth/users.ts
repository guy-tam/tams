// מאגר משתמשים בזיכרון — דמו בלבד, לא DB אמיתי
// מיועד לשימוש בצד השרת בלבד, מאוכלס בפעם הראשונה שמחפשים משתמש (lazy init).
//
// הערת פרודקשן: בסביבת ייצור יש להחליף את ה-Map הפנימי במאגר אמיתי
// (למשל Postgres דרך Neon, Planetscale, Supabase וכו') ולהעביר את
// פונקציות ה-CRUD לשימוש בחיבור מאגר — ה-API הציבורי יכול להישאר זהה.

import type { User } from "./types";
import { hashPassword, verifyPassword } from "./passwords";

/**
 * מבנה משתמש מאוחסן — כולל את ה-hash הפנימי.
 * לא מיוצא החוצה כדי שלא יזלוג passwordHash דרך שכבות אחרות.
 */
interface StoredUser extends User {
  passwordHash: string;
}

// --- מאגר פנימי ---

// המפתח תמיד lowercase כדי לשמור על חיפוש case-insensitive
const users = new Map<string, StoredUser>();

// נתוני משתמש הדמו היחיד
const DEMO_EMAIL = "demo@tams.io";
const DEMO_PLAINTEXT_PASSWORD = "demo1234";

// מבטיח שה-seed ירוץ פעם אחת בלבד, גם תחת ריצות מקביליות
let seedPromise: Promise<void> | null = null;

async function seedIfNeeded(): Promise<void> {
  if (users.size > 0) return;
  if (!seedPromise) {
    seedPromise = (async () => {
      // חישוב ה-hash פעם אחת בלבד עבור משתמש הדמו
      const passwordHash = await hashPassword(DEMO_PLAINTEXT_PASSWORD);
      const stored: StoredUser = {
        id: "usr-001",
        email: DEMO_EMAIL,
        name: "David Cohen",
        role: "investor",
        investorId: "INV-001",
        passwordHash,
      };
      users.set(DEMO_EMAIL.toLowerCase(), stored);
    })();
  }
  await seedPromise;
}

// --- עזרים ציבוריים ---

/**
 * מחזיר עותק "ציבורי" של המשתמש — בלי passwordHash — כך שבטוח
 * להחזיר אותו דרך תשובת API או לאחסן ב-payload של סשן.
 */
export function toPublicUser(stored: StoredUser): User {
  return {
    id: stored.id,
    name: stored.name,
    email: stored.email,
    role: stored.role,
    investorId: stored.investorId,
  };
}

/**
 * מחפש משתמש לפי אימייל (case-insensitive). מפעיל lazy init בפעם הראשונה.
 * מחזיר את ה-StoredUser המלא — על הקוראים לא להדליף את ה-passwordHash החוצה.
 */
export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  if (typeof email !== "string" || email.length === 0) return null;
  await seedIfNeeded();
  const normalized = email.trim().toLowerCase();
  return users.get(normalized) ?? null;
}

/**
 * מאמת זוג אימייל+סיסמה. מחזיר את ה-User הציבורי בהצלחה או null בכישלון.
 * לא חושף לעולם את ה-passwordHash ולא מספק מידע על הסיבה לכישלון
 * (כדי שלא יהיה הבדל זמן בין "משתמש לא קיים" ל-"סיסמה שגויה").
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<User | null> {
  if (typeof email !== "string" || typeof password !== "string") return null;
  if (email.length === 0 || password.length === 0) return null;

  const stored = await findUserByEmail(email);
  if (!stored) return null;

  const ok = await verifyPassword(password, stored.passwordHash);
  if (!ok) return null;

  return toPublicUser(stored);
}

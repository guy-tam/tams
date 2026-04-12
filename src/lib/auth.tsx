// רה-אקספורט של מערכת האימות — הקובץ הזה נשמר כגשר תאימות.
// הלוגיקה האמיתית נמצאת ב-./auth/context.tsx ומשתמשת ב-HttpOnly session cookies
// (ולא ב-localStorage). אין לייבא מ-@/lib/auth/context ישירות — תמיד דרך @/lib/auth.

export { AuthProvider, useAuth } from "./auth/context";
export type { User } from "./auth/context";

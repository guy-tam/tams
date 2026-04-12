// טיפוסי אימות משותפים — מופרדים מה-Context כדי שיוכלו להיטען גם ב-edge runtime
// בלי להביא איתם "use client" או דיפנדנסים של React.

/** מבנה נתוני משתמש משקיע */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "investor" | "admin";
  investorId: string;
}

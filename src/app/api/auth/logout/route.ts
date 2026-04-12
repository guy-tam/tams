// API route — התנתקות משקיע, מוחק את עוגיית הסשן
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/session";
import { checkOrigin } from "@/lib/security";

export async function POST(req: NextRequest) {
  // בדיקת מקור כדי למנוע log-out מבקשות צד שלישי
  if (!checkOrigin(req)) {
    return NextResponse.json(
      { error: "bad_origin" },
      { status: 403 }
    );
  }

  const res = NextResponse.json({ success: true });
  // מחיקת העוגייה — מגדירים maxAge=0 + path תואם
  res.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}

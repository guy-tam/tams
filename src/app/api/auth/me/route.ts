// API route — מחזיר את פרטי המשתמש הנוכחי על סמך עוגיית הסשן
import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  payloadToUser,
  verifySessionToken,
} from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const payload = await verifySessionToken(token);

  if (!payload) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user: payloadToUser(payload) }, { status: 200 });
}

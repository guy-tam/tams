// API route — שליחת פניות יצירת קשר למייל
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "xrptam2@gmail.com";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "no_api_key" }, { status: 501 });
  }

  try {
    const {
      fullName,
      email,
      phone,
      investorType,
      investmentRange,
      message,
    } = await req.json();

    // ולידציה בסיסית
    if (!fullName || !email || !investorType || !investmentRange) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "TAMS Access <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `🔒 TAMS Access Request — ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #d4a843; padding-bottom: 10px;">
            New Access Request — TAMS
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 140px;">Full Name</td>
              <td style="padding: 8px 12px;">${escapeHtml(fullName)}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
              <td style="padding: 8px 12px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Phone</td>
              <td style="padding: 8px 12px;">${phone ? escapeHtml(phone) : "—"}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Investor Type</td>
              <td style="padding: 8px 12px;">${escapeHtml(investorType)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #555;">Investment Range</td>
              <td style="padding: 8px 12px;">${escapeHtml(investmentRange)}</td>
            </tr>
            ${message ? `
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 12px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px;">${escapeHtml(message)}</td>
            </tr>` : ""}
          </table>

          <p style="color: #888; font-size: 12px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
            Submitted at ${new Date().toISOString()} via TAMS Access Form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "email_error" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

// מניעת XSS בתוכן המייל
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

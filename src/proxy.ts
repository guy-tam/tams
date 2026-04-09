import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// רשימת דפוסי סוכני משתמש חשודים (בוטים וכלי סריקה)
const BLOCKED_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'nmap',
  'dirbuster',
  'gobuster',
  'masscan',
  'nessus',
  'openvas',
  'havij',
  'w3af',
  'acunetix',
  'burpsuite',
]

/**
 * יוצר מזהה ייחודי (UUID v4) לצורך מעקב אחרי בקשות
 */
function generateRequestId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * פרוקסי אבטחה - רץ לפני כל בקשה לנתיבים מותאמים
 * כולל: הגנת CSRF, חסימת בוטים, ומזהה בקשה למעקב
 */
export function proxy(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() ?? ''

  // בדיקת סוכני משתמש חשודים - חסימה מיידית
  const isBlocked = BLOCKED_USER_AGENTS.some((bot) => userAgent.includes(bot))
  if (isBlocked) {
    return Response.json(
      { error: 'גישה נדחתה' },
      { status: 403 }
    )
  }

  // הגנת CSRF - רק על בקשות POST לנתיבי API
  if (
    request.method === 'POST' &&
    request.nextUrl.pathname.startsWith('/api')
  ) {
    const origin = request.headers.get('origin')

    // אם יש כותרת Origin, נוודא שהיא תואמת את המארח
    if (origin) {
      const requestHost = request.headers.get('host') ?? request.nextUrl.host
      let originHost: string

      try {
        originHost = new URL(origin).host
      } catch {
        // כתובת Origin לא תקינה - חסימה
        return Response.json(
          { error: 'בקשה לא חוקית - Origin לא תקין' },
          { status: 403 }
        )
      }

      if (originHost !== requestHost) {
        // Origin לא תואם את המארח - חשד ל-CSRF
        return Response.json(
          { error: 'בקשה נדחתה - Origin לא תואם' },
          { status: 403 }
        )
      }
    }
    // אם אין כותרת Origin - מאפשרים (תואמות לדפדפנים ישנים שלא שולחים Origin)
  }

  // הוספת מזהה בקשה ייחודי לכל תגובה למעקב
  const requestId = generateRequestId()
  const response = NextResponse.next()
  response.headers.set('X-Request-ID', requestId)

  return response
}

// הגדרת הנתיבים שעליהם רץ הפרוקסי
export const config = {
  matcher: ['/api/:path*', '/login'],
}

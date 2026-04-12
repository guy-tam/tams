"use client";

// Global error boundary — התפיסה העליונה ביותר ב-Next.js App Router.
// רץ רק אם ה-root layout עצמו נכשל, ולכן חייב לספק <html> ו-<body> משלו.
// שומר על מיתוג מינימלי בלי תלות ב-contexts או i18n (כי הם לא זמינים כאן).

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="he" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0a1628",
          color: "#e2e8f0",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, 'Heebo', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              marginBottom: 24,
              borderRadius: 16,
              border: "1px solid rgba(245, 158, 11, 0.25)",
              background: "rgba(245, 158, 11, 0.08)",
              fontSize: 26,
            }}
            aria-hidden
          >
            ⚠
          </div>

          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
            שגיאה חמורה במערכת
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "#94a3b8",
              marginBottom: 8,
            }}
          >
            אנחנו כבר עובדים על זה. ניתן לנסות לטעון מחדש את הדף.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: 11,
                fontFamily: "monospace",
                color: "#475569",
                marginBottom: 24,
              }}
            >
              error id: {error.digest}
            </p>
          )}

          <button
            onClick={reset}
            style={{
              appearance: "none",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              background: "rgba(59, 130, 246, 0.1)",
              color: "#93c5fd",
              padding: "10px 20px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            נסה שוב
          </button>
        </div>
      </body>
    </html>
  );
}

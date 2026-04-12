"use client";

// Route-level error boundary — מוצג כאשר קומפוננטה מסוימת נכשלת בעמוד.
// נשאר בתוך ה-layout הגלובלי (Navigation + Footer), מציג הודעת שחזור עם reset.
import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCw, ArrowLeft } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RouteError({ error, reset }: ErrorPageProps) {
  // לוגים לשרת/Sentry/וכו' — בינתיים רק console.error
  useEffect(() => {
    console.error("[route-error]", error);
  }, [error]);

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center px-4">
      <div className="relative z-10 w-full max-w-xl text-center">
        <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/[0.08]">
          <AlertTriangle className="size-7 text-amber-400" />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          אירעה שגיאה בטעינת העמוד
        </h1>
        <p className="mx-auto mb-2 max-w-md text-sm leading-relaxed text-zinc-400">
          מצטערים — משהו לא עבד כפי שציפינו. ניתן לנסות לטעון מחדש את העמוד,
          או לחזור לדף הראשי.
        </p>

        {/* מזהה שגיאה יציג רק אם קיים — עוזר ב-debugging בלוגים */}
        {error.digest && (
          <p className="mb-8 font-mono text-[11px] text-zinc-600">
            error id: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="group inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/[0.08] px-5 py-2.5 text-sm font-medium text-blue-300 transition-all hover:border-blue-400/40 hover:bg-blue-500/[0.14]"
          >
            <RotateCw className="size-4 transition-transform group-hover:-rotate-45" />
            נסה שוב
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.08] px-5 py-2.5 text-sm font-medium text-amber-400 transition-all hover:border-amber-500/40 hover:bg-amber-500/[0.14]"
          >
            <ArrowLeft className="size-4" />
            חזרה לראשי
          </Link>
        </div>
      </div>
    </main>
  );
}

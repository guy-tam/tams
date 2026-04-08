"use client";

// דף 404 — עמוד שגיאה מותאם אישית
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const { t, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
      style={{ background: "#0a1628" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* רקע עדין — גריד */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(79, 143, 247, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 143, 247, 0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* זוהר מרכזי */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center">
        {/* מספר 404 — טקסט גדול עם גרדיאנט */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4 text-[8rem] font-extrabold leading-none tracking-tighter sm:text-[10rem]"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </motion.h1>

        {/* כותרת וטקסט */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-3 text-xl font-semibold text-white sm:text-2xl"
        >
          {t("notFound.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-zinc-400"
        >
          {t("notFound.message")}
        </motion.p>

        {/* כפתור חזרה */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.08] px-6 py-3 text-sm font-medium text-amber-400 transition-all hover:border-amber-500/40 hover:bg-amber-500/[0.14]"
          >
            {t("notFound.backHome")}
            <Arrow className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

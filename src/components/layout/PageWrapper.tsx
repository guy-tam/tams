"use client";

// עטיפת עמוד — ריווח נדיב עם גריד מוזהב ונשימה
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  bgGrid?: boolean;
  className?: string;
}

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25 },
  },
};

export default function PageWrapper({
  children,
  title,
  subtitle,
  bgGrid = false,
  className = "",
}: PageWrapperProps) {
  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`relative min-h-screen w-full ${className}`}
    >
      {/* שכבה אמנותית — תמיד פעילה: דגן בד עתיק + וינייטה צ׳יארוסקורו */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 texture-grain opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 20%, transparent 0%, transparent 55%, rgba(0, 0, 0, 0.35) 100%)",
        }}
      />

      {/* גריד רקע מוזהב — אופציונלי */}
      {bgGrid && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(212, 168, 83, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 168, 83, 0.04) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-3xl z-0" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-900/[0.05] rounded-full blur-3xl z-0" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 xl:py-12">
        {(title || subtitle) && (
          <header className="mb-14 flex flex-col gap-5">
            {title && (
              <h1 className="heading-editorial text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] leading-[1.08] tracking-tight bg-gradient-to-br from-white via-amber-100/90 to-amber-200/70 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(212,168,83,0.08)]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg text-zinc-300/85 max-w-2xl leading-[1.75] font-light">
                {subtitle}
              </p>
            )}
            {/* עיטור פלרון מתחת לכותרת ותת-כותרת */}
            <div className="fleuron mt-2 max-w-sm">
              <span />
            </div>
          </header>
        )}

        {children}
      </div>
    </motion.main>
  );
}

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
      {/* גריד רקע מוזהב */}
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
          {/* זוהר זהב בפינות */}
          <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-3xl z-0" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-900/[0.04] rounded-full blur-3xl z-0" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 xl:py-12">
        {(title || subtitle) && (
          <header className="mb-12">
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl bg-gradient-to-r from-white via-amber-100/90 to-white bg-clip-text text-transparent">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-3 text-base text-zinc-400/90 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {children}
      </div>
    </motion.main>
  );
}

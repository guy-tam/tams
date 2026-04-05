"use client";

// עטיפת עמוד - אנימציית מעבר ומבנה אחיד
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: ReactNode;
  /** כותרת ראשית של העמוד */
  title?: string;
  /** תת-כותרת */
  subtitle?: string;
  /** הצגת תבנית גריד ברקע */
  bgGrid?: boolean;
  /** מחלקות נוספות */
  className?: string;
}

// אנימציית כניסה - דהייה + החלקה מלמטה
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
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
      {/* תבנית גריד ברקע - אופציונלי */}
      {bgGrid && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      )}

      {/* תוכן העמוד */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* כותרת ותת-כותרת */}
        {(title || subtitle) && (
          <header className="mb-10">
            {title && (
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-base text-zinc-400 max-w-2xl">
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

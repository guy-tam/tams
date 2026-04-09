"use client";

// עטיפת עמוד — ריווח נדיב ואווירה פרימיום
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3 },
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
      {/* גריד רקע עדין */}
      {bgGrid && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] bg-amber-500/[0.015] rounded-full blur-[180px] z-0" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-900/[0.02] rounded-full blur-[160px] z-0" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 xl:py-16">
        {(title || subtitle) && (
          <header className="mb-14">
            {title && (
              <h1 className="text-3xl font-semibold tracking-[-0.01em] text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-4 text-base text-zinc-500 max-w-2xl leading-[1.7]">
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

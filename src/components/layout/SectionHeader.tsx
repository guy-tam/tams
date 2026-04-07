"use client";

// כותרת מקטע - רכיב לשימוש חוזר עם אנימציית כניסה
import { motion } from "framer-motion";

interface SectionHeaderProps {
  /** כותרת ראשית */
  title: string;
  /** תת-כותרת */
  subtitle?: string;
  /** תג/תווית קטנה מעל הכותרת */
  badge?: string;
  /** מחלקות נוספות */
  className?: string;
}

// אנימציית כניסה מלמטה
const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function SectionHeader({
  title,
  subtitle,
  badge,
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`mb-8 ${className}`}
    >
      {/* תג עליון */}
      {badge && (
        <span className="mb-3 inline-block rounded-full bg-amber-500/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-amber-700 border border-amber-200">
          {badge}
        </span>
      )}

      {/* כותרת */}
      <h2 className="text-2xl font-bold tracking-normal text-white sm:text-3xl">
        {title}
      </h2>

      {/* קו גרדיאנט מתחת לכותרת */}
      <div className="mt-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-blue-500 to-amber-500" />

      {/* תת-כותרת */}
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

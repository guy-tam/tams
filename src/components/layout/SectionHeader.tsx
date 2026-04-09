"use client";

// כותרת מקטע — מאופקת ובוטחת
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
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
      className={`mb-12 ${className}`}
    >
      {/* תג עליון — עדין וקטן */}
      {badge && (
        <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400/60">
          {badge}
        </span>
      )}

      {/* כותרת — לבנה עם נגיעת חמימות */}
      <h2 className="text-2xl font-semibold tracking-[-0.01em] text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {/* קו גרדיאנט מתחת — עדין */}
      <div className="mt-5 h-px w-16 bg-gradient-to-r from-amber-400/40 to-transparent" />

      {/* תת-כותרת */}
      {subtitle && (
        <p className="mt-5 text-sm leading-[1.7] text-zinc-500 max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

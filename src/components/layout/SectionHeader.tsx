"use client";

// כותרת מקטע — מסגרת מנורה זהובה עם גופן מלכותי
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

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
      className={`mb-12 ${className}`}
    >
      {/* תג עליון — באדג׳ מוזהב עם מסגרת */}
      {badge && (
        <span className="mb-4 inline-block rounded-full bg-amber-500/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-400/90 border border-amber-400/20 shadow-[0_0_12px_-3px_rgba(212,168,83,0.15)] backdrop-blur-sm">
          {badge}
        </span>
      )}

      {/* כותרת — גרדיאנט זהוב-לבן מלכותי, ריווח עריכתי */}
      <h2 className="heading-editorial text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-br from-white via-amber-100/85 to-amber-200/70 bg-clip-text text-transparent">
        {title}
      </h2>

      {/* עיטור פלרון זהוב — חילוף לקו הישן, נותן נוכחות גלריה */}
      <div className="mt-5 flex items-center gap-3 max-w-[220px]">
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400/30" />
        <span className="block w-[6px] h-[6px] rounded-full bg-[radial-gradient(circle,#dbb85c_0%,#a8872e_75%,transparent_100%)] shadow-[0_0_10px_rgba(212,168,83,0.55)]" />
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-blue-400/25 to-blue-500/15" />
      </div>

      {/* תת-כותרת */}
      {subtitle && (
        <p className="mt-4 text-sm leading-[1.7] text-zinc-400/90 max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

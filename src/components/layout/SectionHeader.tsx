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
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: [0.19, 1, 0.22, 1] as const },
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
      {/* חותם מלכותי — royal seal badge */}
      {badge && (
        <span className="badge-seal mb-5">
          <span>{badge}</span>
        </span>
      )}

      {/* כותרת עם כתר — royal crown title */}
      <div className="relative inline-block">
        <span aria-hidden="true" className="absolute -top-6 left-0 text-[1.1rem] text-amber-400/70 crown-glow" style={{ filter: "drop-shadow(0 0 12px rgba(212,168,83,0.5))" }}>⚜</span>
        <h2 className="heading-editorial text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-br from-white via-amber-100/85 to-amber-200/70 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>

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

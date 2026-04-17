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
      className={`mb-14 flex flex-col items-start gap-5 ${className}`}
    >
      {/* חותם מלכותי — royal seal badge */}
      {badge && (
        <span className="badge-seal">
          <span>{badge}</span>
        </span>
      )}

      {/* כותרת ראשית — טיפוגרפיה נושאת הפאר לבדה */}
      <h2 className="heading-editorial text-[1.75rem] sm:text-[2.15rem] lg:text-[2.6rem] leading-[1.1] tracking-tight bg-gradient-to-br from-white via-amber-100/90 to-amber-200/70 bg-clip-text text-transparent">
        {title}
      </h2>

      {/* תת-כותרת — ממוקמת מתחת לכותרת בהיררכיה נקייה */}
      {subtitle && (
        <p className="text-[0.95rem] sm:text-base leading-[1.75] text-zinc-300/85 max-w-2xl font-light">
          {subtitle}
        </p>
      )}

      {/* עיטור פלרון זהוב — מעט מתחת, עדין, לא מתחרה */}
      <div className="mt-1 flex items-center gap-3 max-w-[180px] w-full">
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/45 to-amber-400/25" />
        <span className="block w-[5px] h-[5px] rounded-full bg-[radial-gradient(circle,#dbb85c_0%,#a8872e_75%,transparent_100%)] shadow-[0_0_10px_rgba(212,168,83,0.5)]" />
        <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-blue-400/22 to-blue-500/12" />
      </div>
    </motion.div>
  );
}

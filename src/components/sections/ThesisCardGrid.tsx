"use client";

// רשת כרטיסי תזה - תצוגת נקודות מפתח עם אנימציות
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface ThesisCard {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: string;
}

interface ThesisCardGridProps {
  cards: ThesisCard[];
}

// אנימציית כניסה מדורגת
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ThesisCardGrid({ cards }: ThesisCardGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        // צבע ברירת מחדל אם לא סופק
        const accentColor = card.accent || "#4f8ff7";

        return (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl border border-amber-200/40 bg-white backdrop-blur-md p-6 transition-all duration-300 hover:border-amber-400/40 hover:bg-amber-50/30 hover:shadow-[0_0_30px_-10px_rgba(212,168,83,0.08)]"
          >
            {/* גלאו עדין ברקע הכרטיס */}
            <div
              className="absolute -top-px -left-px -right-px h-px opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
              }}
            />

            {/* אייקון עם עיגול רקע */}
            <div
              className="mb-4 inline-flex items-center justify-center size-12 rounded-xl"
              style={{
                background: `${accentColor}18`,
                boxShadow: `0 0 24px ${accentColor}15`,
              }}
            >
              <Icon
                className="size-6"
                style={{ color: accentColor }}
              />
            </div>

            {/* כותרת הכרטיס */}
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {card.title}
            </h3>

            {/* תיאור */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

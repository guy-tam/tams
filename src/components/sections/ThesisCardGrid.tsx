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
    transition: { duration: 0.5, ease: "easeOut" },
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
        const accentColor = card.accent || "#3b82f6";

        return (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05]"
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
                background: `${accentColor}15`,
                boxShadow: `0 0 20px ${accentColor}10`,
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

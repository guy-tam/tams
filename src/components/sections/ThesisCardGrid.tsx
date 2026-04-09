"use client";

// רשת כרטיסי תזה — נקי ומאופק
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        const accentColor = card.accent || "#4f8ff7";

        return (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
          >
            {/* קו עליון עדין בהאבר */}
            <div
              className="absolute top-0 left-4 right-4 h-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}30, transparent)`,
              }}
            />

            {/* אייקון */}
            <div
              className="mb-5 inline-flex items-center justify-center size-11 rounded-xl transition-colors duration-500"
              style={{
                background: `${accentColor}0a`,
                border: `1px solid ${accentColor}15`,
              }}
            >
              <Icon
                className="size-5"
                style={{ color: accentColor, opacity: 0.8 }}
              />
            </div>

            {/* כותרת */}
            <h3 className="text-base font-semibold text-white/90 mb-2 tracking-tight">
              {card.title}
            </h3>

            {/* תיאור */}
            <p className="text-sm text-zinc-500 leading-[1.7]">
              {card.description}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

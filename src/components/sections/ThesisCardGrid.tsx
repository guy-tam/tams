"use client";

// רשת כרטיסי תזה — מוזהב וחי עם גופן מלכותי
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
        const accentColor = card.accent || "#4f8ff7";

        return (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="card-gilded surface-tier-2 group relative p-5 sm:p-7 transition-all duration-400 hover-lift"
          >
            {/* monogram watermark */}
            <span className="monogram-watermark" aria-hidden="true">T</span>
            {/* קו גרדיאנט עליון בהאבר */}
            <div
              className="absolute -top-px -left-px -right-px h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
              }}
            />
            {/* זוהר עדין בהאבר */}
            <div className="absolute inset-0 rounded-[14px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
              style={{
                boxShadow: `inset 0 1px 0 0 rgba(212,168,83,0.06), 0 0 32px -8px ${accentColor}12`,
              }}
            />

            {/* אמבלמה הרלדית — אייקון במסגרת זהב עם טבעת חיצונית וזנב זהוב */}
            <div className="icon-emblem mb-6">
              <Icon
                className="size-6 relative z-10"
                style={{ color: accentColor, filter: `drop-shadow(0 0 10px ${accentColor}88)` }}
              />
            </div>

            {/* כותרת */}
            <h3 className="text-lg font-bold text-foreground mb-2.5 tracking-tight">
              {card.title}
            </h3>

            {/* תיאור */}
            <p className="text-sm text-muted-foreground/90 leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

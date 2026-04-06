"use client";

// רשת סגמנטי שוק - תצוגת שווקים גלובליים שעוברים לבלוקצ׳יין
import { motion } from "framer-motion";
import { Globe, TrendingUp } from "lucide-react";

// רמות אימוץ בלוקצ׳יין וצבעים מתאימים
const adoptionLevels = {
  "גבוה מאוד": { color: "#10b981", bg: "#10b98120", percent: 90 },
  "גבוה": { color: "#06b6d4", bg: "#06b6d420", percent: 70 },
  "בינוני-גבוה": { color: "#8b5cf6", bg: "#8b5cf620", percent: 55 },
  "בינוני": { color: "#f59e0b", bg: "#f59e0b20", percent: 40 },
} as const;

type AdoptionLevel = keyof typeof adoptionLevels;

// נתוני סגמנטי שוק
const segments: {
  name: string;
  size: string;
  adoption: AdoptionLevel;
}[] = [
  { name: "תשלומים חוצי גבולות", size: "~1,000T$", adoption: "גבוה מאוד" },
  { name: "נכסים מנוהלים", size: "147T$", adoption: "בינוני-גבוה" },
  { name: "פנסיה", size: "~58.5T$", adoption: "בינוני" },
  { name: "ביטוח / InsurTech", size: "~7T$", adoption: "גבוה" },
  { name: 'נדל"ן דיגיטלי', size: "4.3T$", adoption: "גבוה מאוד" },
  { name: "הלוואות DeFi", size: "—", adoption: "גבוה מאוד" },
  { name: "BlackRock / Vanguard", size: "~20T$", adoption: "גבוה מאוד" },
  { name: "קרנות סל ETFs", size: "~2T$", adoption: "בינוני" },
];

// אנימציית כניסה מדורגת
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
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

export default function MarketSegmentsGrid() {
  return (
    <section className="w-full">
      {/* כותרת הסקשן */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5">
          <Globe className="size-4 text-blue-400" />
          <span className="text-sm text-muted-foreground">שווקים גלובליים</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-relaxed">
          שוק של{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ~1-2 קוואדריליון דולר
          </span>{" "}
          עובר בהדרגה לבלוקצ׳יין
        </h2>
      </motion.div>

      {/* רשת כרטיסים */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {segments.map((segment, index) => {
          const level = adoptionLevels[segment.adoption];

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05]"
            >
              {/* גלאו עליון בהובר */}
              <div
                className="absolute -top-px -left-px -right-px h-px opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: `linear-gradient(90deg, transparent, ${level.color}40, transparent)`,
                }}
              />

              {/* שם הסגמנט */}
              <h3 className="text-sm font-semibold text-foreground mb-3 leading-snug min-h-[2.5rem] flex items-center">
                {segment.name}
              </h3>

              {/* גודל שוק - מספר בולט */}
              <div
                className="text-2xl font-bold mb-4"
                style={{ color: level.color }}
              >
                {segment.size}
              </div>

              {/* תג רמת אימוץ */}
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium mb-3"
                style={{
                  background: level.bg,
                  color: level.color,
                }}
              >
                <TrendingUp className="size-3" />
                {segment.adoption}
              </div>

              {/* פס התקדמות מיני */}
              <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${level.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.05, ease: "easeOut" as const }}
                  className="h-full rounded-full"
                  style={{ background: level.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

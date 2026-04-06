"use client";

// מודל תפעולי - הדמיה חזותית של חלוקת המשאבים והתפעול
import { motion } from "framer-motion";
import { Shield, BarChart3, Coins, Landmark } from "lucide-react";
import { type LucideIcon } from "lucide-react";

// חטיבות תפעוליות
interface OperationalDivision {
  id: string;
  icon: LucideIcon;
  title: string;
  allocation: number;
  color: string;
  details: string[];
}

const divisions: OperationalDivision[] = [
  {
    id: "custody",
    icon: Shield,
    title: "Custody",
    allocation: 50,
    color: "#3b82f6",
    details: [
      "Ledger + Multi-Sig (2 מתוך 3)",
      "Fordefi: ארנק כללי עם חלוקה לסקטורים",
      "מפתח ייחודי לכל סקטור",
    ],
  },
  {
    id: "risk",
    icon: BarChart3,
    title: "ניהול סיכונים",
    allocation: 20,
    color: "#8b5cf6",
    details: ["בדיקה שבועית", "דיווח חודשי למשקיעים"],
  },
  {
    id: "staking",
    icon: Coins,
    title: "Staking / Lending",
    allocation: 20,
    color: "#06b6d4",
    details: ["Staking: עד 25% מהתיק", "Lending מוסדי: 10-15%"],
  },
  {
    id: "governance",
    icon: Landmark,
    title: "Governance",
    allocation: 10,
    color: "#10b981",
    details: [
      "Multi-Sig על כל פעולה",
      "ועדת השקעות פנימית",
      "דוחות רבעוניים NAV",
    ],
  },
];

// נקודות מפתח
const keyPoints = [
  "Multi-Sig: אף שותף לא יכול להעביר כסף לבד",
  "שליטה מלאה, פיזור סיכונים ושקיפות מלאה",
];

// אנימציות כניסה סדרתיות
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function OperatingModel() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="max-w-4xl mx-auto"
      dir="rtl"
    >
      {/* חטיבות תפעוליות */}
      <div className="space-y-4 mb-8">
        {divisions.map((div) => {
          const Icon = div.icon;
          return (
            <motion.div
              key={div.id}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md overflow-hidden"
            >
              {/* פס צבעוני עליון */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${div.color}60, ${div.color}10)`,
                }}
              />

              <div className="p-5">
                {/* כותרת עם אייקון ואחוז */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="size-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${div.color}15` }}
                  >
                    <Icon className="size-5" style={{ color: div.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-foreground">
                        {div.title}
                      </h4>
                      <span
                        className="text-lg font-bold"
                        style={{ color: div.color }}
                      >
                        {div.allocation}%
                      </span>
                    </div>

                    {/* פס התקדמות */}
                    <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${div.color}, ${div.color}80)`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${div.allocation}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.3,
                          ease: "easeOut" as const,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* פרטים */}
                <div className="space-y-1.5 mr-14">
                  {div.details.map((detail, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <div
                        className="size-1.5 rounded-full flex-shrink-0"
                        style={{ background: div.color }}
                      />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* נקודות מפתח */}
      <motion.div
        variants={cardVariants}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5"
      >
        <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-semibold mb-3">
          נקודות מפתח
        </div>
        <div className="space-y-2.5">
          {keyPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: 0.6 + i * 0.15,
                ease: "easeOut" as const,
              }}
              className="flex items-center gap-3 rounded-lg border border-tams-amber/10 bg-tams-amber/[0.03] px-4 py-3"
            >
              <Shield className="size-4 text-tams-amber flex-shrink-0" />
              <span className="text-sm text-foreground font-medium">
                {point}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

// ציר זמן מפת דרכים - תצוגת שלבי פיתוח עם אנימציות ותמיכה רב-לשונית
import { motion } from "framer-motion";
import { Check, Circle, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import { getLocalizedPhases } from "@/data/roadmap";
import { useMemo } from "react";

// תוויות סטטוס מתורגמות
const statusLabels: Record<Language, { completed: string; current: string; upcoming: string }> = {
  en: { completed: "Completed", current: "In Progress", upcoming: "Upcoming" },
  he: { completed: "הושלם", current: "בתהליך", upcoming: "בקרוב" },
  ar: { completed: "مكتمل", current: "قيد التنفيذ", upcoming: "قادم" },
  ru: { completed: "Завершено", current: "В процессе", upcoming: "Предстоит" },
  es: { completed: "Completado", current: "En progreso", upcoming: "Próximo" },
};

// צבעים ואייקונים לפי סטטוס
const statusConfig = {
  completed: {
    color: "#10b981",
    bgColor: "#10b98120",
    icon: Check,
  },
  current: {
    color: "#3b82f6",
    bgColor: "#3b82f620",
    icon: Circle,
  },
  upcoming: {
    color: "#6b7280",
    bgColor: "#6b728015",
    icon: Clock,
  },
};

export default function RoadmapTimeline() {
  const { language } = useLanguage();
  const localizedPhases = useMemo(() => getLocalizedPhases(language), [language]);
  const labels = statusLabels[language];

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* קו ציר הזמן */}
      <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-tams-green/40 via-tams-blue/40 to-white/10" />

      {/* שלבים */}
      <div className="space-y-8">
        {localizedPhases.map((phase, i) => {
          const config = statusConfig[phase.status];
          const StatusIcon = config.icon;
          const statusLabel = labels[phase.status];

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-6 sm:gap-8"
            >
              {/* נקודה על ציר הזמן */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className="size-12 sm:size-16 rounded-full flex items-center justify-center border-2"
                  style={{
                    background: config.bgColor,
                    borderColor: `${config.color}40`,
                  }}
                >
                  <StatusIcon
                    className="size-5 sm:size-6"
                    style={{ color: config.color }}
                  />
                </div>
              </div>

              {/* כרטיס שלב */}
              <div className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5 sm:p-6">
                {/* כותרת ורבעון */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {phase.title}
                    </h3>
                    <span
                      className="text-xs font-medium"
                      style={{ color: config.color }}
                    >
                      {phase.quarter} &middot; {statusLabel}
                    </span>
                  </div>
                </div>

                {/* תיאור */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {phase.description}
                </p>

                {/* אבני דרך */}
                <div className="space-y-2">
                  {phase.milestones.map((milestone, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      {milestone.completed ? (
                        <Check className="size-4 text-tams-green flex-shrink-0" />
                      ) : (
                        <Circle className="size-4 text-muted-foreground/40 flex-shrink-0" />
                      )}
                      <span
                        className={
                          milestone.completed
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        {milestone.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

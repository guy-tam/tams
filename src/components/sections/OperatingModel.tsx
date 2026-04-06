"use client";

// מודל תפעולי - הדמיה חזותית של חלוקת המשאבים והתפעול עם תמיכה רב-לשונית
import { motion } from "framer-motion";
import { Shield, BarChart3, Coins, Landmark } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// מבנה חטיבה תפעולית בסיסי (ללא טקסט)
interface DivisionBase {
  id: string;
  icon: LucideIcon;
  allocation: number;
  color: string;
}

const divisionsBase: DivisionBase[] = [
  { id: "custody", icon: Shield, allocation: 50, color: "#3b82f6" },
  { id: "risk", icon: BarChart3, allocation: 20, color: "#8b5cf6" },
  { id: "staking", icon: Coins, allocation: 20, color: "#06b6d4" },
  { id: "governance", icon: Landmark, allocation: 10, color: "#10b981" },
];

// מפת תרגומים לכל הטקסטים
const texts = {
  en: {
    divisions: [
      {
        title: "Custody",
        details: [
          "Ledger + Multi-Sig (2 of 3)",
          "Fordefi: General wallet with sector allocation",
          "Unique key for each sector",
        ],
      },
      {
        title: "Risk Management",
        details: ["Weekly review", "Monthly investor reporting"],
      },
      {
        title: "Staking / Lending",
        details: ["Staking: Up to 25% of portfolio", "Institutional Lending: 10-15%"],
      },
      {
        title: "Governance",
        details: [
          "Multi-Sig on every operation",
          "Internal investment committee",
          "Quarterly NAV reports",
        ],
      },
    ],
    keyPointsTitle: "Key Points",
    keyPoints: [
      "Multi-Sig: No partner can transfer funds alone",
      "Full control, risk diversification and complete transparency",
    ],
  },
  he: {
    divisions: [
      {
        title: "Custody",
        details: [
          "Ledger + Multi-Sig (2 מתוך 3)",
          "Fordefi: ארנק כללי עם חלוקה לסקטורים",
          "מפתח ייחודי לכל סקטור",
        ],
      },
      {
        title: "ניהול סיכונים",
        details: ["בדיקה שבועית", "דיווח חודשי למשקיעים"],
      },
      {
        title: "Staking / Lending",
        details: ["Staking: עד 25% מהתיק", "Lending מוסדי: 10-15%"],
      },
      {
        title: "Governance",
        details: [
          "Multi-Sig על כל פעולה",
          "ועדת השקעות פנימית",
          "דוחות רבעוניים NAV",
        ],
      },
    ],
    keyPointsTitle: "נקודות מפתח",
    keyPoints: [
      "Multi-Sig: אף שותף לא יכול להעביר כסף לבד",
      "שליטה מלאה, פיזור סיכונים ושקיפות מלאה",
    ],
  },
  ar: {
    divisions: [
      {
        title: "Custody",
        details: [
          "Ledger + Multi-Sig (2 من 3)",
          "Fordefi: محفظة عامة مع تخصيص قطاعي",
          "مفتاح فريد لكل قطاع",
        ],
      },
      {
        title: "إدارة المخاطر",
        details: ["مراجعة أسبوعية", "تقارير شهرية للمستثمرين"],
      },
      {
        title: "Staking / Lending",
        details: ["Staking: حتى 25% من المحفظة", "إقراض مؤسسي: 10-15%"],
      },
      {
        title: "Governance",
        details: [
          "Multi-Sig على كل عملية",
          "لجنة استثمار داخلية",
          "تقارير ربع سنوية NAV",
        ],
      },
    ],
    keyPointsTitle: "نقاط رئيسية",
    keyPoints: [
      "Multi-Sig: لا يمكن لأي شريك تحويل الأموال بمفرده",
      "سيطرة كاملة وتنويع المخاطر وشفافية تامة",
    ],
  },
  ru: {
    divisions: [
      {
        title: "Custody",
        details: [
          "Ledger + Multi-Sig (2 из 3)",
          "Fordefi: Общий кошелёк с распределением по секторам",
          "Уникальный ключ для каждого сектора",
        ],
      },
      {
        title: "Управление рисками",
        details: ["Еженедельная проверка", "Ежемесячная отчётность для инвесторов"],
      },
      {
        title: "Staking / Lending",
        details: ["Staking: до 25% портфеля", "Институциональное кредитование: 10-15%"],
      },
      {
        title: "Governance",
        details: [
          "Multi-Sig на каждую операцию",
          "Внутренний инвестиционный комитет",
          "Квартальные отчёты NAV",
        ],
      },
    ],
    keyPointsTitle: "Ключевые моменты",
    keyPoints: [
      "Multi-Sig: ни один партнёр не может переводить средства в одиночку",
      "Полный контроль, диверсификация рисков и полная прозрачность",
    ],
  },
  es: {
    divisions: [
      {
        title: "Custody",
        details: [
          "Ledger + Multi-Sig (2 de 3)",
          "Fordefi: Billetera general con asignación por sector",
          "Clave única para cada sector",
        ],
      },
      {
        title: "Gestión de riesgos",
        details: ["Revisión semanal", "Informes mensuales a inversores"],
      },
      {
        title: "Staking / Lending",
        details: ["Staking: hasta 25% del portafolio", "Lending institucional: 10-15%"],
      },
      {
        title: "Governance",
        details: [
          "Multi-Sig en cada operación",
          "Comité de inversión interno",
          "Informes trimestrales NAV",
        ],
      },
    ],
    keyPointsTitle: "Puntos clave",
    keyPoints: [
      "Multi-Sig: ningún socio puede transferir fondos solo",
      "Control total, diversificación de riesgos y transparencia completa",
    ],
  },
};

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
  const { language, isRTL } = useLanguage();
  const t = texts[language] || texts.en;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="max-w-4xl mx-auto"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* חטיבות תפעוליות */}
      <div className="space-y-4 mb-8">
        {divisionsBase.map((div, idx) => {
          const Icon = div.icon;
          const divText = t.divisions[idx];
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
                        {divText.title}
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
                <div className={`space-y-1.5 ${isRTL ? "mr-14" : "ml-14"}`}>
                  {divText.details.map((detail, j) => (
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
          {t.keyPointsTitle}
        </div>
        <div className="space-y-2.5">
          {t.keyPoints.map((point, i) => (
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

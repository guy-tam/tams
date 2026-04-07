"use client";

// רשת סגמנטי שוק - תצוגת שווקים גלובליים עם תמיכה רב-לשונית
import { motion } from "framer-motion";
import { Globe, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// מפת תרגומים לרמות אימוץ
const adoptionLabels = {
  en: {
    veryHigh: "Very High",
    high: "High",
    mediumHigh: "Medium-High",
    medium: "Medium",
  },
  he: {
    veryHigh: "גבוה מאוד",
    high: "גבוה",
    mediumHigh: "בינוני-גבוה",
    medium: "בינוני",
  },
  ar: {
    veryHigh: "مرتفع جداً",
    high: "مرتفع",
    mediumHigh: "متوسط-مرتفع",
    medium: "متوسط",
  },
  ru: {
    veryHigh: "Очень высокий",
    high: "Высокий",
    mediumHigh: "Средне-высокий",
    medium: "Средний",
  },
  es: {
    veryHigh: "Muy alto",
    high: "Alto",
    mediumHigh: "Medio-alto",
    medium: "Medio",
  },
};

// רמות אימוץ בלוקצ'יין וצבעים מתאימים
const adoptionLevels = {
  veryHigh: { color: "#10b981", bg: "#10b98120", percent: 90 },
  high: { color: "#06b6d4", bg: "#06b6d420", percent: 70 },
  mediumHigh: { color: "#8b5cf6", bg: "#8b5cf620", percent: 55 },
  medium: { color: "#f59e0b", bg: "#f59e0b20", percent: 40 },
} as const;

type AdoptionKey = keyof typeof adoptionLevels;

// נתוני סגמנטי שוק בסיסיים (ללא טקסט)
interface SegmentBase {
  size: string;
  adoption: AdoptionKey;
}

const segmentsBase: SegmentBase[] = [
  { size: "~1,000T$", adoption: "veryHigh" },
  { size: "147T$", adoption: "mediumHigh" },
  { size: "~58.5T$", adoption: "medium" },
  { size: "~7T$", adoption: "high" },
  { size: "4.3T$", adoption: "veryHigh" },
  { size: "—", adoption: "veryHigh" },
  { size: "~20T$", adoption: "veryHigh" },
  { size: "~2T$", adoption: "medium" },
];

// מפת תרגומים
const texts = {
  en: {
    badge: "Global Markets",
    titlePrefix: "A market of ",
    titleHighlight: "~1-2 quadrillion dollars",
    titleSuffix: " is gradually moving to blockchain",
    segments: [
      "Cross-Border Payments",
      "Managed Assets",
      "Pensions",
      "Insurance / InsurTech",
      "Digital Real Estate",
      "DeFi Loans",
      "BlackRock / Vanguard",
      "ETF Funds",
    ],
  },
  he: {
    badge: "שווקים גלובליים",
    titlePrefix: "שוק של ",
    titleHighlight: "~1-2 קוואדריליון דולר",
    titleSuffix: " עובר בהדרגה לבלוקצ׳יין",
    segments: [
      "תשלומים חוצי גבולות",
      "נכסים מנוהלים",
      "פנסיה",
      "ביטוח / InsurTech",
      'נדל"ן דיגיטלי',
      "הלוואות DeFi",
      "BlackRock / Vanguard",
      "קרנות סל ETFs",
    ],
  },
  ar: {
    badge: "الأسواق العالمية",
    titlePrefix: "سوق بقيمة ",
    titleHighlight: "~1-2 كوادريليون دولار",
    titleSuffix: " ينتقل تدريجياً إلى البلوكتشين",
    segments: [
      "المدفوعات العابرة للحدود",
      "الأصول المدارة",
      "المعاشات التقاعدية",
      "التأمين / InsurTech",
      "العقارات الرقمية",
      "قروض DeFi",
      "BlackRock / Vanguard",
      "صناديق ETFs",
    ],
  },
  ru: {
    badge: "Глобальные рынки",
    titlePrefix: "Рынок в ",
    titleHighlight: "~1-2 квадриллиона долларов",
    titleSuffix: " постепенно переходит на блокчейн",
    segments: [
      "Трансграничные платежи",
      "Управляемые активы",
      "Пенсии",
      "Страхование / InsurTech",
      "Цифровая недвижимость",
      "DeFi-кредиты",
      "BlackRock / Vanguard",
      "ETF-фонды",
    ],
  },
  es: {
    badge: "Mercados globales",
    titlePrefix: "Un mercado de ",
    titleHighlight: "~1-2 cuatrillones de dólares",
    titleSuffix: " se está moviendo gradualmente al blockchain",
    segments: [
      "Pagos transfronterizos",
      "Activos gestionados",
      "Pensiones",
      "Seguros / InsurTech",
      "Bienes raíces digitales",
      "Préstamos DeFi",
      "BlackRock / Vanguard",
      "Fondos ETF",
    ],
  },
};

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
  const { language } = useLanguage();
  const t = texts[language] || texts.en;
  const al = adoptionLabels[language] || adoptionLabels.en;

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
        <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-amber-500/15 bg-white/[0.04] px-4 py-1.5">
          <Globe className="size-4 text-blue-400" />
          <span className="text-sm text-muted-foreground">{t.badge}</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-relaxed">
          {t.titlePrefix}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t.titleHighlight}
          </span>
          {t.titleSuffix}
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
        {segmentsBase.map((segment, index) => {
          const level = adoptionLevels[segment.adoption];
          const adoptionLabel = al[segment.adoption];

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-5 transition-colors hover:border-amber-500/25 hover:bg-white/[0.06]"
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
                {t.segments[index]}
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
                {adoptionLabel}
              </div>

              {/* פס התקדמות מיני */}
              <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
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

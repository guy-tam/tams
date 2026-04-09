"use client";

// מערכת דרגות משקיעים — עיצוב מאופק של מועדון פרטי
import { motion } from "framer-motion";
import { Compass, Hammer, Building2, Eye, Check, Star, Crown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import SectionHeader from "@/components/layout/SectionHeader";

interface TierData {
  name: string;
  description: string;
  minInvestment: string;
  benefits: string[];
}

const tierTexts: Record<Language, Record<string, TierData>> = {
  en: {
    explorer: {
      name: "Explorer",
      description: "Entry into the TAMS ecosystem with foundational access to research and community.",
      minInvestment: "$10,000",
      benefits: ["Monthly market reports", "Community access", "Quarterly performance updates", "Basic portfolio dashboard"],
    },
    builder: {
      name: "Builder",
      description: "Enhanced access with deeper research insights and priority in new strategies.",
      minInvestment: "$50,000",
      benefits: ["Everything in Explorer", "Weekly research briefings", "Priority strategy access", "Direct analyst communication", "Advanced analytics dashboard"],
    },
    architect: {
      name: "Architect",
      description: "Premium tier with personalized portfolio insights and strategic advisory.",
      minInvestment: "$250,000",
      benefits: ["Everything in Builder", "Personalized portfolio review", "Strategic advisory sessions", "Early access to new divisions", "Co-investment opportunities", "Dedicated account manager"],
    },
    visionary: {
      name: "Visionary",
      description: "The highest tier — full partnership-level access with governance participation.",
      minInvestment: "$1,000,000",
      benefits: ["Everything in Architect", "Governance participation", "Custom strategy development", "Board observer rights", "Revenue sharing structure", "Private quarterly dinners", "Legacy wealth planning"],
    },
  },
  he: {
    explorer: {
      name: "חוקר",
      description: "כניסה לאקוסיסטם TAMS עם גישה בסיסית למחקר ולקהילה.",
      minInvestment: "$10,000",
      benefits: ["דוחות שוק חודשיים", "גישה לקהילה", "עדכוני ביצועים רבעוניים", "דשבורד פורטפוליו בסיסי"],
    },
    builder: {
      name: "בונה",
      description: "גישה מורחבת עם תובנות מחקר מעמיקות ועדיפות באסטרטגיות חדשות.",
      minInvestment: "$50,000",
      benefits: ["הכול מדרגת חוקר", "תדריכי מחקר שבועיים", "גישה עדיפה לאסטרטגיות", "תקשורת ישירה עם אנליסטים", "דשבורד אנליטיקס מתקדם"],
    },
    architect: {
      name: "אדריכל",
      description: "דרגת פרימיום עם תובנות פורטפוליו מותאמות אישית וייעוץ אסטרטגי.",
      minInvestment: "$250,000",
      benefits: ["הכול מדרגת בונה", "סקירת פורטפוליו מותאמת אישית", "פגישות ייעוץ אסטרטגי", "גישה מוקדמת לחטיבות חדשות", "הזדמנויות השקעה משותפת", "מנהל חשבון ייעודי"],
    },
    visionary: {
      name: "חזיונאי",
      description: "הדרגה הגבוהה ביותר — גישה ברמת שותפות מלאה עם השתתפות בממשל.",
      minInvestment: "$1,000,000",
      benefits: ["הכול מדרגת אדריכל", "השתתפות בממשל", "פיתוח אסטרטגיה מותאמת", "זכויות צפייה בדירקטוריון", "מבנה חלוקת רווחים", "ארוחות ערב רבעוניות פרטיות", "תכנון עושר דורי"],
    },
  },
  ar: {
    explorer: {
      name: "المستكشف",
      description: "الدخول إلى نظام TAMS البيئي مع وصول أساسي للأبحاث والمجتمع.",
      minInvestment: "$10,000",
      benefits: ["تقارير السوق الشهرية", "وصول المجتمع", "تحديثات الأداء الفصلية", "لوحة محفظة أساسية"],
    },
    builder: {
      name: "الباني",
      description: "وصول محسّن مع رؤى بحثية أعمق وأولوية في الاستراتيجيات الجديدة.",
      minInvestment: "$50,000",
      benefits: ["كل مزايا المستكشف", "إحاطات بحثية أسبوعية", "وصول ذو أولوية للاستراتيجيات", "تواصل مباشر مع المحللين", "لوحة تحليلات متقدمة"],
    },
    architect: {
      name: "المهندس",
      description: "مستوى متميز مع رؤى محفظة مخصصة واستشارات استراتيجية.",
      minInvestment: "$250,000",
      benefits: ["كل مزايا الباني", "مراجعة محفظة مخصصة", "جلسات استشارية استراتيجية", "وصول مبكر للأقسام الجديدة", "فرص استثمار مشترك", "مدير حساب مخصص"],
    },
    visionary: {
      name: "الرؤيوي",
      description: "أعلى مستوى — وصول على مستوى الشراكة الكاملة مع المشاركة في الحوكمة.",
      minInvestment: "$1,000,000",
      benefits: ["كل مزايا المهندس", "المشاركة في الحوكمة", "تطوير استراتيجية مخصصة", "حقوق مراقب مجلس الإدارة", "هيكل تقاسم الإيرادات", "عشاء خاص فصلي", "تخطيط الثروة العابر للأجيال"],
    },
  },
  ru: {
    explorer: {
      name: "Исследователь",
      description: "Вход в экосистему TAMS с базовым доступом к исследованиям и сообществу.",
      minInvestment: "$10 000",
      benefits: ["Ежемесячные рыночные отчёты", "Доступ к сообществу", "Квартальные обзоры результатов", "Базовая панель портфеля"],
    },
    builder: {
      name: "Строитель",
      description: "Расширенный доступ с углублёнными данными и приоритетом в новых стратегиях.",
      minInvestment: "$50 000",
      benefits: ["Всё из уровня Исследователь", "Еженедельные брифинги", "Приоритетный доступ к стратегиям", "Прямая связь с аналитиками", "Продвинутая панель аналитики"],
    },
    architect: {
      name: "Архитектор",
      description: "Премиум-уровень с персональными инсайтами и стратегическим консалтингом.",
      minInvestment: "$250 000",
      benefits: ["Всё из уровня Строитель", "Персональный обзор портфеля", "Стратегические консультации", "Ранний доступ к подразделениям", "Совместные инвестиции", "Персональный менеджер"],
    },
    visionary: {
      name: "Визионер",
      description: "Высший уровень — партнёрский доступ с участием в управлении.",
      minInvestment: "$1 000 000",
      benefits: ["Всё из уровня Архитектор", "Участие в управлении", "Персональная стратегия", "Наблюдатель в совете", "Распределение прибыли", "Частные квартальные ужины", "Наследственное планирование"],
    },
  },
  es: {
    explorer: {
      name: "Explorador",
      description: "Entrada al ecosistema TAMS con acceso fundamental a investigación y comunidad.",
      minInvestment: "$10,000",
      benefits: ["Informes mensuales de mercado", "Acceso a la comunidad", "Actualizaciones trimestrales", "Panel de portafolio básico"],
    },
    builder: {
      name: "Constructor",
      description: "Acceso mejorado con investigación profunda y prioridad en nuevas estrategias.",
      minInvestment: "$50,000",
      benefits: ["Todo lo del Explorador", "Briefings semanales", "Acceso prioritario a estrategias", "Comunicación directa con analistas", "Panel de análisis avanzado"],
    },
    architect: {
      name: "Arquitecto",
      description: "Nivel premium con perspectivas personalizadas y asesoría estratégica.",
      minInvestment: "$250,000",
      benefits: ["Todo lo del Constructor", "Revisión personalizada", "Sesiones de asesoría estratégica", "Acceso anticipado a divisiones", "Oportunidades de coinversión", "Gerente de cuenta dedicado"],
    },
    visionary: {
      name: "Visionario",
      description: "El nivel más alto — acceso completo con participación en gobernanza.",
      minInvestment: "$1,000,000",
      benefits: ["Todo lo del Arquitecto", "Participación en gobernanza", "Estrategia personalizada", "Observador en directorio", "Reparto de ingresos", "Cenas privadas trimestrales", "Planificación patrimonial"],
    },
  },
};

const tierMeta = [
  { key: "explorer", icon: Compass, color: "#6b9bd2", badge: null },
  { key: "builder", icon: Hammer, color: "#4f8ff7", badge: null },
  { key: "architect", icon: Building2, color: "#8ba4c4", badge: Star },
  { key: "visionary", icon: Eye, color: "#c9a84c", badge: Crown },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function InvestorTiers() {
  const { t, language } = useLanguage();
  const tiers = tierTexts[language] || tierTexts.en;

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* רקע עדין */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[160px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-blue-900/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          badge={t("investorTiers.badge")}
          title={t("investorTiers.title")}
          subtitle={t("investorTiers.subtitle")}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-14"
        >
          {tierMeta.map((meta, tierIndex) => {
            const Icon = meta.icon;
            const tier = tiers[meta.key];
            const BadgeIcon = meta.badge;
            const isVisionary = meta.key === "visionary";

            return (
              <motion.div
                key={meta.key}
                variants={cardVariants}
                custom={tierIndex}
                className={`group relative flex flex-col rounded-2xl backdrop-blur-lg overflow-hidden transition-all duration-400 shadow-lg shadow-black/5 ${
                  isVisionary
                    ? "card-ornate border border-amber-400/30 bg-white/[0.07] hover:border-amber-400/50 hover:bg-white/[0.09] shadow-[0_0_50px_-12px_rgba(212,168,83,0.18)] hover:shadow-[0_0_60px_-10px_rgba(212,168,83,0.25)] hover:scale-[1.02]"
                    : meta.key === "architect"
                    ? "border border-amber-400/20 bg-white/[0.05] hover:border-amber-400/35 hover:bg-white/[0.07] hover:shadow-[0_0_36px_-10px_rgba(212,168,83,0.1)]"
                    : "border border-amber-500/15 bg-white/[0.04] hover:border-amber-400/25 hover:bg-white/[0.06] hover:shadow-[0_0_24px_-8px_rgba(212,168,83,0.08)]"
                }`}
              >
                {/* כותרת הדרגה */}
                <div className="relative p-7 pb-5">
                  {/* קו עליון */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${meta.color}20, transparent)`,
                    }}
                  />

                  {/* באדג׳ פרימיום */}
                  {BadgeIcon && (
                    <div className="absolute top-3 end-3 transition-transform duration-300 group-hover:scale-110">
                      <BadgeIcon className="size-5 drop-shadow-[0_0_6px_rgba(212,168,83,0.4)]" style={{ color: meta.color }} />
                    </div>
                  )}

                  {/* אייקון עם זוהר */}
                  <div
                    className="mb-4 inline-flex items-center justify-center size-14 rounded-xl transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `${meta.color}15`,
                      boxShadow: `0 0 0 2px ${meta.color}25, 0 0 24px -4px ${meta.color}15`,
                    }}
                  >
                    <Icon className="size-7" style={{ color: meta.color }} />
                  </div>

                  {/* שם */}
                  <h3 className="text-lg font-bold text-foreground tracking-tight">{tier.name}</h3>

                  {/* סף כניסה */}
                  <div
                    className="text-2xl font-bold mt-1.5 tracking-tight"
                    style={{ color: meta.color, textShadow: `0 0 20px ${meta.color}30` }}
                  >
                    {tier.minInvestment}
                  </div>

                  {/* תיאור */}
                  <p className="text-sm text-zinc-500 mt-3 leading-[1.7] font-serif-he">
                    {tier.description}
                  </p>
                </div>

                {/* הטבות */}
                <div className="flex-1 px-7 pb-7 pt-1">
                  <div className="h-px w-full bg-white/[0.04] mb-5" />
                  <div className="space-y-3">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className="size-3.5 mt-0.5 flex-shrink-0 opacity-50"
                          style={{ color: meta.color }}
                        />
                        <span className="text-zinc-500 text-[13px] leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* כפתור — רק Visionary מקבל כפתור בולט */}
                <div className="px-7 pb-7">
                  <a
                    href="/investor"
                    className={`block w-full text-center text-sm font-medium py-2.5 rounded-lg transition-all duration-500 ${
                      isVisionary
                        ? "bg-amber-400/[0.08] text-amber-400/80 border border-amber-400/15 hover:bg-amber-400/[0.12] hover:border-amber-400/25"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {t("investorTiers.cta")}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

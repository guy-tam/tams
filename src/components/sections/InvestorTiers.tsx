"use client";

// מערכת דרגות משקיעים - מעגל השקעה היררכי
import { motion } from "framer-motion";
import { Compass, Hammer, Building2, Eye, Check, Star, Crown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";

interface TierData {
  name: string;
  description: string;
  minInvestment: string;
  benefits: string[];
}

// נתוני דרגות לפי שפה
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
  { key: "architect", icon: Building2, color: "#3b6fd4", badge: Star },
  { key: "visionary", icon: Eye, color: "#d4a853", badge: Crown },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function InvestorTiers() {
  const { t, language } = useLanguage();
  const tiers = tierTexts[language] || tierTexts.en;

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* רקע */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-900/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          badge={t("investorTiers.badge")}
          title={t("investorTiers.title")}
          subtitle={t("investorTiers.subtitle")}
        />

        {/* גריד דרגות */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12"
        >
          {tierMeta.map((meta) => {
            const Icon = meta.icon;
            const tier = tiers[meta.key];
            const BadgeIcon = meta.badge;

            return (
              <motion.div
                key={meta.key}
                variants={cardVariants}
                className={`group relative flex flex-col rounded-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/[0.04] ${
                  meta.key === "visionary"
                    ? "border border-amber-500/25 bg-white/[0.06] hover:border-amber-500/40 shadow-[0_0_40px_-12px_rgba(212,168,83,0.12)]"
                    : "border border-amber-500/15 bg-white/[0.04] hover:border-amber-500/25"
                }`}
              >
                {/* כותרת הדרגה */}
                <div
                  className="relative p-6 pb-4"
                  style={{
                    background: `linear-gradient(180deg, ${meta.color}08 0%, transparent 100%)`,
                  }}
                >
                  {/* גראדיינט עליון */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${meta.color}60, transparent)`,
                    }}
                  />

                  {/* באדג׳ פרימיום */}
                  {BadgeIcon && (
                    <div className="absolute top-3 end-3">
                      <BadgeIcon className="size-4" style={{ color: meta.color }} />
                    </div>
                  )}

                  {/* אייקון */}
                  <div
                    className="mb-4 inline-flex items-center justify-center size-14 rounded-xl"
                    style={{
                      background: `${meta.color}12`,
                      boxShadow: `0 0 0 2px ${meta.color}25`,
                    }}
                  >
                    <Icon className="size-7" style={{ color: meta.color }} />
                  </div>

                  {/* שם וסף כניסה */}
                  <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                  <div
                    className="text-2xl font-bold mt-1"
                    style={{ color: meta.color }}
                  >
                    {tier.minInvestment}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* הטבות */}
                <div className="flex-1 p-6 pt-2">
                  <div className="space-y-2.5">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className="size-4 mt-0.5 flex-shrink-0"
                          style={{ color: meta.color }}
                        />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* כפתור */}
                <div className="p-6 pt-0">
                  <Button
                    className="w-full text-sm font-medium"
                    style={{
                      background: `${meta.color}15`,
                      color: meta.color,
                      borderColor: `${meta.color}30`,
                    }}
                    variant="outline"
                  >
                    {t("investorTiers.cta")}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

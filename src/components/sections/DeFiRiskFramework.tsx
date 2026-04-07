"use client";

// מסגרת סיכוני DeFi - מערכת הערכת סיכונים חזותית עם תמיכה בריבוי שפות
import { motion } from "framer-motion";
import { Code2, Users, Droplets, Scale } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";

// רמות סיכון
type RiskLevel = "low" | "medium" | "high" | "critical";

// תרגומי רמות סיכון לפי שפה
const riskLevelLabels: Record<Language, Record<RiskLevel, string>> = {
  en: { low: "Low", medium: "Medium", high: "High", critical: "Critical" },
  he: { low: "נמוך", medium: "בינוני", high: "גבוה", critical: "קריטי" },
  ar: { low: "منخفض", medium: "متوسط", high: "مرتفع", critical: "حرج" },
  ru: { low: "Низкий", medium: "Средний", high: "Высокий", critical: "Критический" },
  es: { low: "Bajo", medium: "Medio", high: "Alto", critical: "Crítico" },
};

const riskLevelConfig: Record<
  RiskLevel,
  { color: string; bars: number }
> = {
  low: { color: "#10b981", bars: 1 },
  medium: { color: "#f59e0b", bars: 2 },
  high: { color: "#f97316", bars: 3 },
  critical: { color: "#ef4444", bars: 4 },
};

interface RiskCategory {
  id: string;
  icon: LucideIcon;
  title: string;
  level: RiskLevel;
  color: string;
  description: string;
  mitigations: string[];
}

// נתוני סיכונים מתורגמים לפי שפה
const riskCategoriesData: Record<Language, RiskCategory[]> = {
  en: [
    {
      id: "smart-contract",
      icon: Code2,
      title: "Smart Contract Risk",
      level: "high",
      color: "#8b5cf6",
      description:
        "Vulnerabilities in protocol code, including reentrancy attacks, oracle manipulation, and logic errors. Even audited contracts carry residual risk.",
      mitigations: [
        "Only use protocols with multiple audits",
        "Prefer battle-tested contracts with long track records",
        "Limit single-protocol exposure to 10% max",
        "Monitor for governance proposals and upgrades",
      ],
    },
    {
      id: "counterparty",
      icon: Users,
      title: "Counterparty Risk",
      level: "medium",
      color: "#3b82f6",
      description:
        "Risk that protocol teams, DAOs, or other market participants act in ways that negatively impact depositors. Includes rug pulls and governance attacks.",
      mitigations: [
        "Evaluate team track record and transparency",
        "Prefer protocols with decentralized governance",
        "Monitor on-chain treasury and team wallets",
        "Diversify across multiple protocols",
      ],
    },
    {
      id: "liquidity",
      icon: Droplets,
      title: "Liquidity Risk",
      level: "medium",
      color: "#3b82f6",
      description:
        "Risk of being unable to exit positions at expected prices. Includes impermanent loss in AMM pools, slippage in large trades, and lock-up period constraints.",
      mitigations: [
        "Maintain 15%+ in liquid stablecoins",
        "Avoid low-liquidity pools and tokens",
        "Stagger lock-up periods for staking positions",
        "Size positions relative to available liquidity",
      ],
    },
    {
      id: "regulatory",
      icon: Scale,
      title: "Regulatory Risk",
      level: "high",
      color: "#f59e0b",
      description:
        "Evolving global regulations could restrict DeFi access, require KYC/AML compliance, or reclassify DeFi tokens as securities. Jurisdictional risk across chains.",
      mitigations: [
        "Stay current with regulatory developments",
        "Prefer compliant and regulated protocols",
        "Maintain ability to quickly exit positions",
        "Document all DeFi activities for compliance",
      ],
    },
  ],
  he: [
    {
      id: "smart-contract",
      icon: Code2,
      title: "סיכון חוזים חכמים",
      level: "high",
      color: "#8b5cf6",
      description:
        "פגיעויות בקוד הפרוטוקול, כולל מתקפות reentrancy, מניפולציית אורקל ושגיאות לוגיקה. אפילו חוזים מבוקרים נושאים סיכון שיורי.",
      mitigations: [
        "שימוש אך ורק בפרוטוקולים עם ביקורות מרובות",
        "העדפת חוזים מוכחי קרב עם רקורד ארוך",
        "הגבלת חשיפה לפרוטוקול בודד ל-10% מקסימום",
        "ניטור הצעות ממשל ושדרוגים",
      ],
    },
    {
      id: "counterparty",
      icon: Users,
      title: "סיכון צד נגדי",
      level: "medium",
      color: "#3b82f6",
      description:
        "סיכון שצוותי פרוטוקולים, DAOs או משתתפי שוק אחרים יפעלו באופן שפוגע במפקידים. כולל rug pulls ומתקפות ממשל.",
      mitigations: [
        "הערכת רקורד הצוות ושקיפותו",
        "העדפת פרוטוקולים עם ממשל מבוזר",
        "ניטור קופות שרשרת וארנקי הצוות",
        "פיזור בין פרוטוקולים מרובים",
      ],
    },
    {
      id: "liquidity",
      icon: Droplets,
      title: "סיכון נזילות",
      level: "medium",
      color: "#3b82f6",
      description:
        "סיכון של חוסר יכולת לצאת מפוזיציות במחירים צפויים. כולל הפסד זמני (impermanent loss) בבריכות AMM, החלקה בעסקאות גדולות ומגבלות תקופות נעילה.",
      mitigations: [
        "שמירה על 15%+ במטבעות יציבים נזילים",
        "הימנעות מבריכות ואסימונים בנזילות נמוכה",
        "פיזור תקופות נעילה לפוזיציות סטייקינג",
        "גודל פוזיציות ביחס לנזילות הזמינה",
      ],
    },
    {
      id: "regulatory",
      icon: Scale,
      title: "סיכון רגולטורי",
      level: "high",
      color: "#f59e0b",
      description:
        "רגולציה גלובלית מתפתחת עלולה להגביל גישה ל-DeFi, לדרוש עמידה ב-KYC/AML, או לסווג מחדש אסימוני DeFi כניירות ערך. סיכון שיפוטי חוצה שרשראות.",
      mitigations: [
        "מעקב שוטף אחר התפתחויות רגולטוריות",
        "העדפת פרוטוקולים מותאמים ומפוקחים",
        "שמירה על יכולת יציאה מהירה מפוזיציות",
        "תיעוד כל פעילויות ה-DeFi לצרכי ציות",
      ],
    },
  ],
  ar: [
    {
      id: "smart-contract",
      icon: Code2,
      title: "مخاطر العقود الذكية",
      level: "high",
      color: "#8b5cf6",
      description:
        "ثغرات أمنية في كود البروتوكول، بما في ذلك هجمات إعادة الدخول، والتلاعب بالأوراكل، وأخطاء المنطق البرمجي. حتى العقود المدققة تحمل مخاطر متبقية.",
      mitigations: [
        "استخدام بروتوكولات خضعت لعمليات تدقيق متعددة فقط",
        "تفضيل العقود المجربة ذات السجل الطويل",
        "تحديد التعرض لبروتوكول واحد بحد أقصى 10%",
        "مراقبة مقترحات الحوكمة والترقيات",
      ],
    },
    {
      id: "counterparty",
      icon: Users,
      title: "مخاطر الطرف المقابل",
      level: "medium",
      color: "#3b82f6",
      description:
        "مخاطر تصرف فرق البروتوكولات أو المنظمات اللامركزية أو المشاركين الآخرين بطرق تضر بالمودعين. تشمل عمليات السحب المفاجئ وهجمات الحوكمة.",
      mitigations: [
        "تقييم سجل الفريق ومستوى الشفافية",
        "تفضيل البروتوكولات ذات الحوكمة اللامركزية",
        "مراقبة خزائن السلسلة ومحافظ الفريق",
        "التنويع عبر بروتوكولات متعددة",
      ],
    },
    {
      id: "liquidity",
      icon: Droplets,
      title: "مخاطر السيولة",
      level: "medium",
      color: "#3b82f6",
      description:
        "مخاطر عدم القدرة على الخروج من المراكز بالأسعار المتوقعة. تشمل الخسارة المؤقتة في مجمعات AMM، والانزلاق في الصفقات الكبيرة، وقيود فترات الإغلاق.",
      mitigations: [
        "الحفاظ على 15%+ في عملات مستقرة سائلة",
        "تجنب المجمعات والرموز منخفضة السيولة",
        "توزيع فترات الإغلاق لمراكز الرهن",
        "تحديد حجم المراكز بالنسبة للسيولة المتاحة",
      ],
    },
    {
      id: "regulatory",
      icon: Scale,
      title: "المخاطر التنظيمية",
      level: "high",
      color: "#f59e0b",
      description:
        "قد تقيد اللوائح العالمية المتطورة الوصول إلى DeFi، أو تتطلب الامتثال لمتطلبات KYC/AML، أو تعيد تصنيف رموز DeFi كأوراق مالية. مخاطر قضائية عبر السلاسل.",
      mitigations: [
        "متابعة التطورات التنظيمية باستمرار",
        "تفضيل البروتوكولات المتوافقة والمنظمة",
        "الحفاظ على القدرة على الخروج السريع من المراكز",
        "توثيق جميع أنشطة DeFi لأغراض الامتثال",
      ],
    },
  ],
  ru: [
    {
      id: "smart-contract",
      icon: Code2,
      title: "Риск смарт-контрактов",
      level: "high",
      color: "#8b5cf6",
      description:
        "Уязвимости в коде протокола, включая атаки повторного входа, манипуляции с оракулами и логические ошибки. Даже прошедшие аудит контракты несут остаточный риск.",
      mitigations: [
        "Использование только протоколов с многократным аудитом",
        "Предпочтение проверенных контрактов с длительной историей",
        "Ограничение экспозиции на один протокол до 10% максимум",
        "Мониторинг предложений по управлению и обновлений",
      ],
    },
    {
      id: "counterparty",
      icon: Users,
      title: "Контрагентский риск",
      level: "medium",
      color: "#3b82f6",
      description:
        "Риск того, что команды протоколов, DAO или другие участники рынка будут действовать способами, негативно влияющими на вкладчиков. Включает rug pull и атаки на управление.",
      mitigations: [
        "Оценка репутации команды и прозрачности",
        "Предпочтение протоколов с децентрализованным управлением",
        "Мониторинг ончейн-казначейств и кошельков команды",
        "Диверсификация между несколькими протоколами",
      ],
    },
    {
      id: "liquidity",
      icon: Droplets,
      title: "Риск ликвидности",
      level: "medium",
      color: "#3b82f6",
      description:
        "Риск невозможности закрыть позиции по ожидаемым ценам. Включает непостоянные потери в пулах AMM, проскальзывание в крупных сделках и ограничения периодов блокировки.",
      mitigations: [
        "Поддержание 15%+ в ликвидных стейблкоинах",
        "Избегание пулов и токенов с низкой ликвидностью",
        "Распределение периодов блокировки для стейкинг-позиций",
        "Определение размера позиций относительно доступной ликвидности",
      ],
    },
    {
      id: "regulatory",
      icon: Scale,
      title: "Регуляторный риск",
      level: "high",
      color: "#f59e0b",
      description:
        "Развивающееся глобальное регулирование может ограничить доступ к DeFi, потребовать соответствия KYC/AML или переклассифицировать токены DeFi как ценные бумаги. Юрисдикционный риск между цепочками.",
      mitigations: [
        "Отслеживание регуляторных изменений",
        "Предпочтение регулируемых и совместимых протоколов",
        "Поддержание возможности быстрого выхода из позиций",
        "Документирование всех DeFi-операций для соответствия требованиям",
      ],
    },
  ],
  es: [
    {
      id: "smart-contract",
      icon: Code2,
      title: "Riesgo de Contratos Inteligentes",
      level: "high",
      color: "#8b5cf6",
      description:
        "Vulnerabilidades en el código del protocolo, incluyendo ataques de reentrada, manipulación de oráculos y errores de lógica. Incluso los contratos auditados conllevan riesgo residual.",
      mitigations: [
        "Utilizar solo protocolos con múltiples auditorías",
        "Preferir contratos probados con largo historial",
        "Limitar la exposición a un solo protocolo al 10% máximo",
        "Monitorear propuestas de gobernanza y actualizaciones",
      ],
    },
    {
      id: "counterparty",
      icon: Users,
      title: "Riesgo de Contraparte",
      level: "medium",
      color: "#3b82f6",
      description:
        "Riesgo de que los equipos del protocolo, DAOs u otros participantes del mercado actúen de formas que impacten negativamente a los depositantes. Incluye rug pulls y ataques de gobernanza.",
      mitigations: [
        "Evaluar el historial y transparencia del equipo",
        "Preferir protocolos con gobernanza descentralizada",
        "Monitorear tesorerías on-chain y billeteras del equipo",
        "Diversificar entre múltiples protocolos",
      ],
    },
    {
      id: "liquidity",
      icon: Droplets,
      title: "Riesgo de Liquidez",
      level: "medium",
      color: "#3b82f6",
      description:
        "Riesgo de no poder cerrar posiciones a precios esperados. Incluye pérdida impermanente en pools de AMM, deslizamiento en operaciones grandes y restricciones de períodos de bloqueo.",
      mitigations: [
        "Mantener 15%+ en stablecoins líquidos",
        "Evitar pools y tokens de baja liquidez",
        "Escalonar períodos de bloqueo para posiciones de staking",
        "Dimensionar posiciones en relación con la liquidez disponible",
      ],
    },
    {
      id: "regulatory",
      icon: Scale,
      title: "Riesgo Regulatorio",
      level: "high",
      color: "#f59e0b",
      description:
        "La regulación global en evolución podría restringir el acceso a DeFi, exigir cumplimiento KYC/AML, o reclasificar tokens DeFi como valores. Riesgo jurisdiccional entre cadenas.",
      mitigations: [
        "Mantenerse al día con los desarrollos regulatorios",
        "Preferir protocolos conformes y regulados",
        "Mantener la capacidad de salir rápidamente de posiciones",
        "Documentar todas las actividades DeFi para cumplimiento",
      ],
    },
  ],
};

// תרגומי ממשק
const uiText = {
  en: { title: "DeFi Risk Assessment Framework", subtitle: "Systematic evaluation of risk categories applicable to TAMS DeFi wallet operations.", mitigations: "Mitigations" },
  he: { title: "מסגרת הערכת סיכוני DeFi", subtitle: "הערכה שיטתית של קטגוריות סיכון הרלוונטיות לפעילות ארנק ה-DeFi של TAMS.", mitigations: "אמצעי מיטיגציה" },
  ar: { title: "إطار تقييم مخاطر DeFi", subtitle: "تقييم منهجي لفئات المخاطر المطبقة على عمليات محفظة DeFi الخاصة بـ TAMS.", mitigations: "إجراءات التخفيف" },
  ru: { title: "Система оценки рисков DeFi", subtitle: "Систематическая оценка категорий рисков, применимых к операциям DeFi-кошелька TAMS.", mitigations: "Меры снижения рисков" },
  es: { title: "Marco de Evaluación de Riesgos DeFi", subtitle: "Evaluación sistemática de categorías de riesgo aplicables a las operaciones de la billetera DeFi de TAMS.", mitigations: "Mitigaciones" },
};

// קומפוננט אינדיקטור רמת סיכון
function RiskIndicator({ level, language }: { level: RiskLevel; language: Language }) {
  const config = riskLevelConfig[level];
  const label = riskLevelLabels[language]?.[level] || riskLevelLabels.en[level];
  return (
    <div className="flex items-center gap-2">
      {/* פסי רמת סיכון */}
      <div className="flex gap-0.5">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className="w-2 h-4 rounded-sm"
            style={{
              background:
                bar <= config.bars ? config.color : "rgba(255,255,255,0.06)",
            }}
          />
        ))}
      </div>
      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: config.color }}
      >
        {label}
      </span>
    </div>
  );
}

// אנימציות
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DeFiRiskFramework() {
  const { language } = useLanguage();
  const localizedRisks = riskCategoriesData[language] || riskCategoriesData.en;
  const ui = uiText[language] || uiText.en;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      {/* כותרת */}
      <motion.div variants={cardVariants} className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {ui.title}
        </h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          {ui.subtitle}
        </p>
      </motion.div>

      {/* רשת כרטיסי סיכון */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {localizedRisks.map((risk) => {
          const Icon = risk.icon;
          return (
            <motion.div
              key={risk.id}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-md overflow-hidden hover:border-amber-500/15 transition-colors"
            >
              {/* פס צבעוני עליון */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${risk.color}60, ${risk.color}10)`,
                }}
              />

              <div className="p-5">
                {/* כותרת ורמת סיכון */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${risk.color}15` }}
                    >
                      <Icon
                        className="size-5"
                        style={{ color: risk.color }}
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {risk.title}
                    </h4>
                  </div>
                  <RiskIndicator level={risk.level} language={language} />
                </div>

                {/* תיאור */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {risk.description}
                </p>

                {/* אמצעי הגנה */}
                <div className="space-y-1.5">
                  <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-semibold mb-2">
                    {ui.mitigations}
                  </div>
                  {risk.mitigations.map((mitigation, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <div
                        className="size-1 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: risk.color }}
                      />
                      {mitigation}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

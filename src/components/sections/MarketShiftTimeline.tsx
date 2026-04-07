"use client";

// ציר זמן שינויי שוק - אימוץ מוסדי של בלוקצ׳יין עם תמיכה ב-5 שפות
import { motion } from "framer-motion";
import { Building2, TrendingUp, Landmark, Globe, Coins, Shield } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface MarketEvent {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

// מפת תרגומים לכל 6 האירועים בכל 5 השפות
const texts = {
  en: {
    events: [
      {
        title: "MicroStrategy & Corporate Treasury",
        description:
          "MicroStrategy pioneers corporate Bitcoin treasury strategy, signaling institutional confidence in BTC as a reserve asset.",
      },
      {
        title: "El Salvador & National Adoption",
        description:
          "El Salvador adopts Bitcoin as legal tender. Major banks begin offering crypto custody services to wealth management clients.",
      },
      {
        title: "DeFi Institutional Infrastructure",
        description:
          "Institutional-grade DeFi protocols emerge. Aave Arc launches for permissioned participants. On-chain compliance tools mature.",
      },
      {
        title: "BlackRock & TradFi Entry",
        description:
          "BlackRock files for spot Bitcoin ETF, triggering a wave of institutional applications. Traditional finance legitimizes crypto.",
      },
      {
        title: "ETF Approvals & Capital Inflow",
        description:
          "Spot Bitcoin ETFs approved and attract billions in inflows. Ethereum ETFs follow. Institutional allocation to crypto becomes mainstream.",
      },
      {
        title: "Regulatory Clarity & Maturation",
        description:
          "Regulatory frameworks solidify globally. Tokenized assets and RWAs gain traction. Institutional crypto AUM reaches new milestones.",
      },
    ],
  },
  he: {
    events: [
      {
        title: "MicroStrategy וקרנות תאגידיות",
        description:
          "MicroStrategy חולשת דרך באסטרטגיית קופת ביטקוין תאגידית, ומאותתת על אמון מוסדי ב-BTC כנכס רזרבי.",
      },
      {
        title: "אל סלוודור ואימוץ לאומי",
        description:
          "אל סלוודור מאמצת את הביטקוין כהילך חוקי. בנקים מרכזיים מתחילים להציע שירותי משמורת קריפטו ללקוחות ניהול עושר.",
      },
      {
        title: "תשתית DeFi מוסדית",
        description:
          "פרוטוקולי DeFi ברמה מוסדית צצים. Aave Arc מושק למשתתפים מורשים. כלי ציות על הבלוקצ׳יין מתבגרים.",
      },
      {
        title: "BlackRock וכניסת הפיננסים המסורתיים",
        description:
          "BlackRock מגישה בקשה ל-ETF ביטקוין ספוט, ומעוררת גל של בקשות מוסדיות. הפיננסים המסורתיים מכירים בקריפטו.",
      },
      {
        title: "אישורי ETF וזרימת הון",
        description:
          "תעודות ETF ביטקוין ספוט מאושרות ומושכות מיליארדים בזרימות. תעודות ETF של את׳ריום עוקבות. הקצאה מוסדית לקריפטו הופכת למיינסטרים.",
      },
      {
        title: "בהירות רגולטורית והתבגרות",
        description:
          "מסגרות רגולטוריות מתגבשות גלובלית. נכסים מטוקנים ו-RWA צוברים תאוצה. נכסי קריפטו מוסדיים מגיעים לאבני דרך חדשות.",
      },
    ],
  },
  ar: {
    events: [
      {
        title: "MicroStrategy والخزينة المؤسسية",
        description:
          "تقود MicroStrategy استراتيجية خزينة بيتكوين المؤسسية، مما يشير إلى ثقة المؤسسات في BTC كأصل احتياطي.",
      },
      {
        title: "السلفادور والتبني الوطني",
        description:
          "تتبنى السلفادور البيتكوين كعملة قانونية. تبدأ البنوك الكبرى بتقديم خدمات حفظ العملات الرقمية لعملاء إدارة الثروات.",
      },
      {
        title: "البنية التحتية المؤسسية للتمويل اللامركزي",
        description:
          "تظهر بروتوكولات DeFi بمستوى مؤسسي. يُطلق Aave Arc للمشاركين المرخصين. تنضج أدوات الامتثال على السلسلة.",
      },
      {
        title: "BlackRock ودخول التمويل التقليدي",
        description:
          "تقدم BlackRock طلبًا لصندوق ETF بيتكوين فوري، مما يطلق موجة من الطلبات المؤسسية. التمويل التقليدي يعترف بالعملات الرقمية.",
      },
      {
        title: "موافقات ETF وتدفق رأس المال",
        description:
          "تُوافق صناديق ETF بيتكوين الفورية وتجذب مليارات في التدفقات. تتبعها صناديق ETF إيثيريوم. التخصيص المؤسسي للعملات الرقمية يصبح سائدًا.",
      },
      {
        title: "الوضوح التنظيمي والنضج",
        description:
          "تتعزز الأطر التنظيمية عالميًا. الأصول المرمزة وأصول العالم الحقيقي تكتسب زخمًا. تصل الأصول المؤسسية المُدارة في العملات الرقمية إلى معالم جديدة.",
      },
    ],
  },
  ru: {
    events: [
      {
        title: "MicroStrategy и корпоративная казна",
        description:
          "MicroStrategy становится пионером корпоративной стратегии казначейства в биткоине, сигнализируя об институциональном доверии к BTC как резервному активу.",
      },
      {
        title: "Сальвадор и национальное принятие",
        description:
          "Сальвадор принимает биткоин в качестве законного платёжного средства. Крупные банки начинают предлагать услуги криптохранения клиентам управления капиталом.",
      },
      {
        title: "Институциональная инфраструктура DeFi",
        description:
          "Появляются протоколы DeFi институционального уровня. Запускается Aave Arc для авторизованных участников. Инструменты ончейн-комплаенса совершенствуются.",
      },
      {
        title: "BlackRock и вход традиционных финансов",
        description:
          "BlackRock подаёт заявку на спотовый биткоин-ETF, вызывая волну институциональных заявок. Традиционные финансы легитимизируют криптовалюту.",
      },
      {
        title: "Одобрение ETF и приток капитала",
        description:
          "Спотовые биткоин-ETF одобрены и привлекают миллиарды в притоках. ETF на Ethereum следуют за ними. Институциональное распределение в криптовалюту становится мейнстримом.",
      },
      {
        title: "Регуляторная ясность и зрелость",
        description:
          "Нормативно-правовые базы укрепляются по всему миру. Токенизированные активы и RWA набирают обороты. Институциональные криптоактивы под управлением достигают новых рубежей.",
      },
    ],
  },
  es: {
    events: [
      {
        title: "MicroStrategy y tesorería corporativa",
        description:
          "MicroStrategy es pionera en la estrategia de tesorería corporativa en Bitcoin, señalando confianza institucional en BTC como activo de reserva.",
      },
      {
        title: "El Salvador y adopción nacional",
        description:
          "El Salvador adopta Bitcoin como moneda de curso legal. Los principales bancos comienzan a ofrecer servicios de custodia cripto a clientes de gestión patrimonial.",
      },
      {
        title: "Infraestructura DeFi institucional",
        description:
          "Surgen protocolos DeFi de grado institucional. Se lanza Aave Arc para participantes autorizados. Las herramientas de cumplimiento on-chain maduran.",
      },
      {
        title: "BlackRock y la entrada de las finanzas tradicionales",
        description:
          "BlackRock solicita un ETF de Bitcoin al contado, desencadenando una ola de solicitudes institucionales. Las finanzas tradicionales legitiman las criptomonedas.",
      },
      {
        title: "Aprobaciones de ETF y flujo de capital",
        description:
          "Se aprueban los ETF de Bitcoin al contado y atraen miles de millones en flujos. Los ETF de Ethereum les siguen. La asignación institucional a cripto se vuelve convencional.",
      },
      {
        title: "Claridad regulatoria y maduración",
        description:
          "Los marcos regulatorios se consolidan a nivel mundial. Los activos tokenizados y los RWA ganan tracción. Los activos cripto institucionales bajo gestión alcanzan nuevos hitos.",
      },
    ],
  },
} as const;

// נתוני בסיס (אייקונים וצבעים) ללא תלות בשפה
const eventMeta = [
  { year: "2020", icon: Building2, color: "#f59e0b" },
  { year: "2021", icon: Globe, color: "#3b82f6" },
  { year: "2022", icon: Coins, color: "#8b5cf6" },
  { year: "2023", icon: Landmark, color: "#3b82f6" },
  { year: "2024", icon: TrendingUp, color: "#10b981" },
  { year: "2025-26", icon: Shield, color: "#f43f5e" },
];

export default function MarketShiftTimeline() {
  const { language } = useLanguage();
  const loc = texts[language] || texts.en;

  // בניית רשימת אירועים עם מטא-דאטה ותרגום
  const events: MarketEvent[] = eventMeta.map((meta, i) => ({
    year: meta.year,
    title: loc.events[i].title,
    description: loc.events[i].description,
    icon: meta.icon,
    color: meta.color,
  }));

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* ציר אופקי על מסכים גדולים, אנכי על מובייל */}

      {/* תצוגה אנכית */}
      <div className="relative">
        {/* קו ציר */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-tams-amber/40 via-tams-blue/40 via-tams-purple/40 to-tams-green/40" />

        <div className="space-y-6">
          {events.map((event, i) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex gap-6 items-start"
              >
                {/* נקודה על הציר */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="size-12 rounded-full flex items-center justify-center border"
                    style={{
                      background: `${event.color}10`,
                      borderColor: `${event.color}30`,
                    }}
                  >
                    <Icon
                      className="size-5"
                      style={{ color: event.color }}
                    />
                  </div>
                </div>

                {/* כרטיס אירוע */}
                <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-md p-4 hover:border-amber-500/15 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-sm font-bold"
                      style={{ color: event.color }}
                    >
                      {event.year}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {event.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

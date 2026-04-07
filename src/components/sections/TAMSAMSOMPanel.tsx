"use client";

// פאנל TAM/SAM/SOM - הדמיה חזותית של גודל שוק
// תמיכה מלאה ב-5 שפות
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useLanguage } from "@/lib/i18n";

// מפת תרגומים לכל השפות
const texts = {
  en: {
    items: [
      {
        label: "Total Addressable Market",
        range: "$2-3T",
        assumptions:
          "Total global crypto market capitalization including all digital assets, DeFi TVL, and institutional crypto holdings.",
      },
      {
        label: "Serviceable Addressable Market",
        range: "$300-500B",
        assumptions:
          "Crypto investment vehicles, managed crypto funds, and DeFi yield strategies accessible to institutional-grade operations.",
      },
      {
        label: "Serviceable Obtainable Market",
        range: "$25-75M",
        assumptions:
          "Realistic initial market capture through direct investor relationships, targeting crypto-native HNW individuals and small institutional allocators.",
      },
    ] as const,
  },
  he: {
    items: [
      {
        label: "שוק כולל בר-מיענה",
        range: "$2-3T",
        assumptions:
          "שווי שוק הקריפטו הגלובלי הכולל, לרבות כלל הנכסים הדיגיטליים, נפח DeFi נעול (TVL) ואחזקות קריפטו מוסדיות.",
      },
      {
        label: "שוק בר-שירות",
        range: "$300-500B",
        assumptions:
          "מכשירי השקעה בקריפטו, קרנות קריפטו מנוהלות ואסטרטגיות תשואת DeFi הנגישות לפעילות ברמה מוסדית.",
      },
      {
        label: "שוק בר-השגה",
        range: "$25-75M",
        assumptions:
          "לכידת שוק ראשונית ריאלית באמצעות קשרי משקיעים ישירים, תוך מיקוד באנשים בעלי הון גבוה מעולם הקריפטו ומקצי הון מוסדיים קטנים.",
      },
    ] as const,
  },
  ar: {
    items: [
      {
        label: "إجمالي السوق القابل للعنونة",
        range: "$2-3T",
        assumptions:
          "إجمالي القيمة السوقية للعملات المشفرة عالميًا بما في ذلك جميع الأصول الرقمية، وقيمة DeFi المقفلة، وحيازات المؤسسات.",
      },
      {
        label: "السوق القابل للخدمة",
        range: "$300-500B",
        assumptions:
          "أدوات الاستثمار في العملات المشفرة، والصناديق المُدارة، واستراتيجيات عائد DeFi المتاحة للعمليات المؤسسية.",
      },
      {
        label: "السوق القابل للتحقيق",
        range: "$25-75M",
        assumptions:
          "استحواذ واقعي أولي على السوق من خلال علاقات مباشرة مع المستثمرين، مستهدفين أفرادًا ذوي ثروات عالية ومخصصين مؤسسيين صغار.",
      },
    ] as const,
  },
  ru: {
    items: [
      {
        label: "Общий адресуемый рынок",
        range: "$2-3T",
        assumptions:
          "Общая капитализация глобального крипторынка, включая все цифровые активы, TVL DeFi и институциональные криптоактивы.",
      },
      {
        label: "Доступный обслуживаемый рынок",
        range: "$300-500B",
        assumptions:
          "Криптоинвестиционные инструменты, управляемые криптофонды и стратегии доходности DeFi, доступные для институциональных операций.",
      },
      {
        label: "Достижимый обслуживаемый рынок",
        range: "$25-75M",
        assumptions:
          "Реалистичный первоначальный захват рынка через прямые отношения с инвесторами, ориентированный на состоятельных крипто-инвесторов и небольших институциональных распределителей.",
      },
    ] as const,
  },
  es: {
    items: [
      {
        label: "Mercado Total Direccionable",
        range: "$2-3T",
        assumptions:
          "Capitalización total del mercado cripto global incluyendo todos los activos digitales, TVL de DeFi y tenencias cripto institucionales.",
      },
      {
        label: "Mercado Direccionable Servible",
        range: "$300-500B",
        assumptions:
          "Vehículos de inversión cripto, fondos cripto gestionados y estrategias de rendimiento DeFi accesibles para operaciones de grado institucional.",
      },
      {
        label: "Mercado Obtenible Servible",
        range: "$25-75M",
        assumptions:
          "Captura inicial realista del mercado mediante relaciones directas con inversores, dirigida a individuos cripto-nativos de alto patrimonio y pequeños asignadores institucionales.",
      },
    ] as const,
  },
} as const;

// נתוני בסיס (ללא תלות בשפה)
const marketBase = [
  { name: "TAM", value: 2500, color: "#3b82f6" },
  { name: "SAM", value: 400, color: "#8b5cf6" },
  { name: "SOM", value: 50, color: "#d4a853" },
];

// טולטיפ מותאם
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: { name: string; value: number; color: string; range: string; label: string };
  }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-xl border border-amber-500/15 bg-card/95 backdrop-blur-md p-4 shadow-xl max-w-xs">
      <div className="text-sm font-semibold text-foreground mb-1">
        {data.name}: {data.range}
      </div>
      <div className="text-xs text-muted-foreground">{data.label}</div>
    </div>
  );
}

export default function TAMSAMSOMPanel() {
  const { language } = useLanguage();
  const loc = texts[language] || texts.en;

  // בניית נתוני השוק עם תרגומים
  const marketData = marketBase.map((item, i) => ({
    ...item,
    label: loc.items[i].label,
    range: loc.items[i].range,
    assumptions: loc.items[i].assumptions,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* גרף */}
        <div className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={marketData}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a1a1aa", fontSize: 14, fontWeight: 600 }}
                  width={50}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                  {marketData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      fillOpacity={0.7}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* כרטיסי מידע */}
        <div className="space-y-4">
          {marketData.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-4 hover:border-amber-500/25 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="size-3 rounded-full"
                  style={{ background: item.color }}
                />
                <span
                  className="text-base font-bold"
                  style={{ color: item.color }}
                >
                  {item.name}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {item.range}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mb-1">
                {item.label}
              </div>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                {item.assumptions}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

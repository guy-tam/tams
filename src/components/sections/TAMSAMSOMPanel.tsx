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
        range: "$16T by 2030",
        assumptions:
          "BCG projection for tokenized real-world assets ($16T) + global crypto market cap (~$3.5T Q1 2026). Standard Chartered: $30T by 2034.",
      },
      {
        label: "Serviceable Addressable Market",
        range: "$398B",
        assumptions:
          "Bitcoin ETF AUM ($135B, BlackRock IBIT $100B) + DeFi TVL ($192B) + tokenized RWA ($26.4B) + crypto hedge funds ($45B). Apr 2026 actuals.",
      },
      {
        label: "Serviceable Obtainable Market",
        range: "$25-75M",
        assumptions:
          "Realistic 24-month capture through accredited HNW networks. 80% of institutions plan to grow crypto allocations in 2026 — Coinbase Institutional Survey.",
      },
    ] as const,
  },
  he: {
    items: [
      {
        label: "שוק כולל בר-מיענה",
        range: "$16T עד 2030",
        assumptions:
          "תחזית BCG ל-RWA מטוקנים ($16T) + שווי שוק הקריפטו הגלובלי (~$3.5T ברבעון 1 2026). Standard Chartered: $30T עד 2034.",
      },
      {
        label: "שוק בר-שירות",
        range: "$398B",
        assumptions:
          "AUM של Bitcoin ETF ($135B, BlackRock IBIT $100B) + DeFi TVL ($192B) + RWA מטוקנים ($26.4B) + קרנות קריפטו ($45B). נתונים בפועל אפריל 2026.",
      },
      {
        label: "שוק בר-השגה",
        range: "$25-75M",
        assumptions:
          "לכידה ריאלית ב-24 חודש דרך רשתות HNW מוסמכים. 80% מהמוסדות מתכננים להגדיל הקצאות קריפטו ב-2026 — סקר Coinbase Institutional.",
      },
    ] as const,
  },
  ar: {
    items: [
      {
        label: "إجمالي السوق القابل للعنونة",
        range: "$16T بحلول 2030",
        assumptions:
          "توقع BCG للأصول الحقيقية المُرمَّزة (16 تريليون $) + إجمالي رأس مال سوق الكريبتو (~3.5 تريليون $ في الربع الأول 2026). Standard Chartered: 30 تريليون $ بحلول 2034.",
      },
      {
        label: "السوق القابل للخدمة",
        range: "$398B",
        assumptions:
          "AUM لـ Bitcoin ETF (135B$، BlackRock IBIT 100B$) + DeFi TVL (192B$) + RWA مُرمَّز (26.4B$) + صناديق الكريبتو (45B$). أرقام فعلية أبريل 2026.",
      },
      {
        label: "السوق القابل للتحقيق",
        range: "$25-75M",
        assumptions:
          "استحواذ واقعي خلال 24 شهرًا عبر شبكات HNW المعتمدة. 80% من المؤسسات تخطط لزيادة الانكشاف على الكريبتو في 2026 — استطلاع Coinbase Institutional.",
      },
    ] as const,
  },
  ru: {
    items: [
      {
        label: "Общий адресуемый рынок",
        range: "$16T к 2030",
        assumptions:
          "Прогноз BCG по токенизированным RWA ($16T) + общая капитализация крипторынка (~$3.5T Q1 2026). Standard Chartered: $30T к 2034.",
      },
      {
        label: "Доступный обслуживаемый рынок",
        range: "$398B",
        assumptions:
          "AUM Bitcoin ETF ($135B, BlackRock IBIT $100B) + DeFi TVL ($192B) + токенизированные RWA ($26.4B) + криптофонды ($45B). Фактические данные апреля 2026.",
      },
      {
        label: "Достижимый обслуживаемый рынок",
        range: "$25-75M",
        assumptions:
          "Реалистичный захват за 24 месяца через сети аккредитованных HNW. 80% институтов планируют увеличить криптоаллокации в 2026 — опрос Coinbase Institutional.",
      },
    ] as const,
  },
  es: {
    items: [
      {
        label: "Mercado Total Direccionable",
        range: "$16T para 2030",
        assumptions:
          "Proyección BCG para activos del mundo real tokenizados ($16T) + capitalización total del mercado cripto (~$3.5T Q1 2026). Standard Chartered: $30T para 2034.",
      },
      {
        label: "Mercado Direccionable Servible",
        range: "$398B",
        assumptions:
          "AUM de Bitcoin ETF ($135B, BlackRock IBIT $100B) + TVL de DeFi ($192B) + RWA tokenizados ($26.4B) + fondos de cripto ($45B). Datos reales abril 2026.",
      },
      {
        label: "Mercado Obtenible Servible",
        range: "$25-75M",
        assumptions:
          "Captura realista en 24 meses mediante redes acreditadas de HNW. 80% de las instituciones planean aumentar la exposición cripto en 2026 — Coinbase Institutional Survey.",
      },
    ] as const,
  },
} as const;

// נתוני בסיס — מבוסס נתוני אפריל 2026
// TAM = 16,000 ($16T BCG projection by 2030, log scale display)
// SAM = 398 ($135B BTC ETF + $192B DeFi TVL + $26.4B RWA + $45B crypto funds)
// SOM = 50 (realistic 24-month capture, mid-point of $25-75M range)
const marketBase = [
  { name: "TAM", value: 16000, color: "#5a8fd8" },
  { name: "SAM", value: 398, color: "#d4a853" },
  { name: "SOM", value: 50, color: "#b8902d" },
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

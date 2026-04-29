"use client";

// Market Snapshot Band — אריחי נתוני שוק חיים מאפריל 2026
// משדר אמינות נומרית: TAMS לא ממציאה מספרים, היא מצטטת מקורות
import { motion } from "framer-motion";
import Footnote from "@/components/ui/Footnote";
import { useLanguage } from "@/lib/i18n";

const SNAPSHOT_DATE = "Apr 2026";

const TEXTS = {
  en: {
    eyebrow: "Market Snapshot",
    title: "The institutional capital migration is happening now.",
    subtitle: "Live indicators of where institutional capital is flowing in the digital asset stack.",
    footer: "Updated Apr 2026 · Sources: BlackRock, Coinbase Institutional, Nomura, BCG, DL News, RWA.xyz · Hover ⓘ for citations.",
    tiles: [
      { label: "Bitcoin ETF AUM", value: "$135B", delta: "+$6.96B inflows" },
      { label: "Tokenized RWA Market", value: "$26.4B", delta: "×4 YoY · $16T proj. by 2030" },
      { label: "DeFi Total Value Locked", value: "$192B", delta: "67% institutions prefer DeFi over spot" },
      { label: "Institutional Allocators", value: "80%", delta: "plan to grow crypto exposure in 2026" },
    ],
  },
  he: {
    eyebrow: "תמונת שוק",
    title: "הגירת ההון המוסדי קורית עכשיו.",
    subtitle: "אינדיקטורים חיים של היכן זורם ההון המוסדי במחסן הנכסים הדיגיטליים.",
    footer: "עודכן אפריל 2026 · מקורות: BlackRock, Coinbase Institutional, Nomura, BCG, DL News, RWA.xyz · רחף ⓘ לציטוטים.",
    tiles: [
      { label: "AUM של Bitcoin ETF", value: "$135B", delta: "+$6.96B זרימות חיוביות" },
      { label: "שוק RWA מטוקן", value: "$26.4B", delta: "×4 שנתי · תחזית $16T עד 2030" },
      { label: "DeFi TVL", value: "$192B", delta: "67% מהמוסדות מעדיפים DeFi על Spot" },
      { label: "מקצי הון מוסדיים", value: "80%", delta: "מתכננים להגדיל חשיפה לקריפטו ב-2026" },
    ],
  },
  ar: {
    eyebrow: "لقطة السوق",
    title: "هجرة رأس المال المؤسسي تحدث الآن.",
    subtitle: "مؤشرات حية لأماكن تدفق رأس المال المؤسسي في حزمة الأصول الرقمية.",
    footer: "محدّث أبريل 2026 · المصادر: BlackRock, Coinbase Institutional, Nomura, BCG, DL News, RWA.xyz · مرّر ⓘ للاستشهادات.",
    tiles: [
      { label: "AUM لـ Bitcoin ETF", value: "$135B", delta: "+6.96 مليار $ تدفقات داخلة" },
      { label: "سوق RWA المُرمَّز", value: "$26.4B", delta: "×4 سنويًا · توقع $16T بحلول 2030" },
      { label: "DeFi TVL", value: "$192B", delta: "67% من المؤسسات تفضّل DeFi على Spot" },
      { label: "المخصِّصون المؤسسيون", value: "80%", delta: "يخططون لزيادة الانكشاف على الكريبتو في 2026" },
    ],
  },
  ru: {
    eyebrow: "Снимок рынка",
    title: "Миграция институционального капитала происходит сейчас.",
    subtitle: "Живые индикаторы потоков институционального капитала в стеке цифровых активов.",
    footer: "Обновлено апр 2026 · Источники: BlackRock, Coinbase Institutional, Nomura, BCG, DL News, RWA.xyz · Наведите ⓘ для ссылок.",
    tiles: [
      { label: "AUM Bitcoin ETF", value: "$135B", delta: "+$6.96B чистый приток" },
      { label: "Рынок токенизированных RWA", value: "$26.4B", delta: "×4 г/г · прогноз $16T к 2030" },
      { label: "DeFi TVL", value: "$192B", delta: "67% институтов выбирают DeFi вместо спота" },
      { label: "Институциональные распределители", value: "80%", delta: "планируют рост криптоаллокаций в 2026" },
    ],
  },
  es: {
    eyebrow: "Instantánea del mercado",
    title: "La migración de capital institucional está ocurriendo ahora.",
    subtitle: "Indicadores en vivo del flujo de capital institucional en la pila de activos digitales.",
    footer: "Actualizado abr 2026 · Fuentes: BlackRock, Coinbase Institutional, Nomura, BCG, DL News, RWA.xyz · Pasa ⓘ para citas.",
    tiles: [
      { label: "AUM de Bitcoin ETF", value: "$135B", delta: "+$6.96B entradas netas" },
      { label: "Mercado RWA tokenizado", value: "$26.4B", delta: "×4 anual · proyección $16T para 2030" },
      { label: "TVL de DeFi", value: "$192B", delta: "67% de instituciones prefieren DeFi sobre spot" },
      { label: "Asignadores institucionales", value: "80%", delta: "planean aumentar exposición cripto en 2026" },
    ],
  },
} as const;

const SOURCES = [
  { n: 1, source: "BlackRock IBIT alone $100B; Fidelity FBTC $33B", date: "Apr 15, 2026" },
  { n: 2, source: "BCG projection · BlackRock BUIDL $5.2B leads", date: "Q1 2026" },
  { n: 3, source: "Nomura Survey · DL News State of DeFi", date: "Apr 2026" },
  { n: 4, source: "Coinbase Institutional Survey · 59% target >5% AUM", date: "Apr 2026" },
];

export default function MarketSnapshotBand() {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3 mb-5">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400/55" />
          <span className="text-[10px] tracking-[0.42em] uppercase text-amber-300/85 font-semibold">
            {t.eyebrow} · {SNAPSHOT_DATE}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400/55" />
        </div>
        <h2 className="heading-editorial text-2xl sm:text-3xl md:text-4xl text-white mb-3 leading-tight">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400/85 max-w-2xl mx-auto leading-relaxed font-light">
          {t.subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.tiles.map((tile, i) => (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 * i }}
            className="surface-tier-2 p-5 sm:p-6 relative group hover:border-amber-500/30 transition-colors duration-500"
          >
            <div className="text-[10px] tracking-[0.28em] uppercase text-amber-300/65 font-semibold mb-3">
              {tile.label}
              <Footnote {...SOURCES[i]} />
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white tabular-nums leading-none mb-2.5 [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]">
              {tile.value}
            </div>
            <div className="text-[11px] leading-relaxed font-light text-emerald-400/85">
              {tile.delta}
            </div>
            <span className="monogram-watermark" aria-hidden="true">T</span>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] text-zinc-600 mt-6 text-center tracking-wide font-light">
        {t.footer}
      </p>
    </section>
  );
}

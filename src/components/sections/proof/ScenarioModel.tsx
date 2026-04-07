"use client";

// מודל תרחישים — כרטיסי תרחיש איכותניים ללא תחזיות מספריות מטעות
import { motion } from "framer-motion";
import { TrendingDown, Minus, TrendingUp, AlertTriangle } from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

interface ScenarioCardData {
  id: string;
  name: string;
  icon: typeof TrendingUp;
  iconColor: string;
  borderColor: string;
  bgColor: string;
  description: string;
  assumptions: string[];
  factors: {
    label: string;
    level: "low" | "moderate" | "high";
  }[];
  outlook: string;
}

const scenarios: ScenarioCardData[] = [
  {
    id: "conservative",
    name: "Conservative Adoption",
    icon: TrendingDown,
    iconColor: "text-zinc-400",
    borderColor: "border-zinc-500/20",
    bgColor: "bg-zinc-500/[0.03]",
    description:
      "Enterprise blockchain adoption proceeds slowly. Tokenization remains niche. Most institutional pilots do not convert to production. Crypto market remains primarily speculative.",
    assumptions: [
      "Tokenization growth below $2T by 2030",
      "CBDC adoption limited to few small nations",
      "Regulatory environment remains uncertain",
      "Institutional interest plateaus at current levels",
      "DeFi yields compress significantly",
    ],
    factors: [
      { label: "Adoption Growth", level: "low" },
      { label: "Treasury Appreciation", level: "low" },
      { label: "Yield Contribution", level: "low" },
      { label: "Trading Alpha", level: "moderate" },
      { label: "Downside Risk", level: "high" },
    ],
    outlook:
      "Under this scenario, portfolio value preservation depends primarily on active trading strategies and risk management. Infrastructure thesis remains intact long-term but takes significantly longer to materialize. Capital protection through position sizing and drawdown limits becomes critical.",
  },
  {
    id: "moderate",
    name: "Moderate Adoption",
    icon: Minus,
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    bgColor: "bg-cyan-500/[0.03]",
    description:
      "Institutional adoption continues at its current trajectory. Tokenization grows meaningfully. Several major payment networks and banks integrate blockchain rails. Regulatory frameworks emerge in key markets.",
    assumptions: [
      "Tokenization reaches $4-8T by 2030",
      "Multiple CBDCs launch in major economies",
      "Regulatory clarity in US and EU",
      "Enterprise pilots convert at 20-40% rate",
      "DeFi matures with institutional participation",
    ],
    factors: [
      { label: "Adoption Growth", level: "moderate" },
      { label: "Treasury Appreciation", level: "moderate" },
      { label: "Yield Contribution", level: "moderate" },
      { label: "Trading Alpha", level: "moderate" },
      { label: "Downside Risk", level: "moderate" },
    ],
    outlook:
      "Under this scenario, infrastructure assets appreciate as adoption validates their utility. DeFi yield provides meaningful operational revenue. The multi-engine model generates returns from both appreciation and active management. This represents the working thesis for portfolio construction.",
  },
  {
    id: "aggressive",
    name: "Accelerated Adoption",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-500/[0.03]",
    description:
      "Blockchain infrastructure becomes standard financial plumbing. Tokenization scales rapidly. Cross-border payments shift meaningfully to blockchain rails. Oracle networks become critical infrastructure.",
    assumptions: [
      "Tokenization exceeds $10T by 2030",
      "Major economies launch CBDCs at scale",
      "SWIFT integration with blockchain becomes standard",
      "Enterprise pilot conversion exceeds 50%",
      "DeFi TVL reaches $500B+ with institutional capital",
    ],
    factors: [
      { label: "Adoption Growth", level: "high" },
      { label: "Treasury Appreciation", level: "high" },
      { label: "Yield Contribution", level: "high" },
      { label: "Trading Alpha", level: "moderate" },
      { label: "Downside Risk", level: "low" },
    ],
    outlook:
      "Under this scenario, infrastructure assets positioned at the center of financial modernization experience significant repricing. The total addressable market for blockchain-native assets expands well beyond current crypto market cap. This represents the upside case — possible but not guaranteed.",
  },
];

function LevelIndicator({ level, delay = 0 }: { level: "low" | "moderate" | "high"; delay?: number }) {
  const colors = {
    low: "bg-zinc-500",
    moderate: "bg-cyan-400",
    high: "bg-emerald-400",
  };
  const filled = level === "low" ? 1 : level === "moderate" ? 2 : 3;

  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + i * 0.08, ease: "easeOut" }}
          className={`h-1.5 w-4 rounded-full origin-left transition-colors duration-500 ${i <= filled ? colors[level] : "bg-white/[0.06]"}`}
        />
      ))}
    </div>
  );
}

export default function ScenarioModel() {
  const { t } = useLanguage();

  // שמות תרחישים מתורגמים
  const scenarioNames: Record<string, string> = {
    conservative: t("proof.scenarios.conservative"),
    moderate: t("proof.scenarios.moderate"),
    aggressive: t("proof.scenarios.accelerated"),
  };

  // תוויות גורמים מתורגמות
  const factorLabels: Record<string, string> = {
    "Adoption Growth": t("proof.scenarios.factorAdoption"),
    "Treasury Appreciation": t("proof.scenarios.factorTreasury"),
    "Yield Contribution": t("proof.scenarios.factorYield"),
    "Trading Alpha": t("proof.scenarios.factorTrading"),
    "Downside Risk": t("proof.scenarios.factorDownside"),
  };

  return (
    <section className="py-16 max-w-6xl mx-auto">
      <SectionHeader
        badge={t("proof.scenarios.badge")}
        title={t("proof.scenarios.title")}
        subtitle={t("proof.scenarios.subtitle")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        {scenarios.map((scenario, i) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.015 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl ${scenario.borderColor} border ${scenario.bgColor} p-6 flex flex-col transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20`}
          >
            {/* כותרת */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`rounded-lg bg-white/[0.05] border border-white/[0.08] p-2`}>
                <scenario.icon className={`h-5 w-5 ${scenario.iconColor}`} />
              </div>
              <h3 className="text-sm font-semibold text-white">{scenarioNames[scenario.id] || scenario.name}</h3>
            </div>

            {/* תיאור */}
            <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">{scenario.description}</p>

            {/* הנחות — עם אנימציית כניסה מדורגת */}
            <div className="mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block mb-2">{t("proof.scenarios.keyAssumptions")}</span>
              <ul className="space-y-1.5">
                {scenario.assumptions.map((a, j) => (
                  <motion.li
                    key={a}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2 + j * 0.06, duration: 0.35, ease: "easeOut" }}
                    className="text-[10px] text-zinc-500 leading-relaxed flex items-start gap-1.5"
                  >
                    <span className="text-zinc-600 mt-1">·</span>
                    {a}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* גורמים */}
            <div className="mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block mb-2">{t("proof.scenarios.factorAssessment")}</span>
              <div className="space-y-2">
                {scenario.factors.map((f, k) => (
                  <div key={f.label} className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400">{factorLabels[f.label] || f.label}</span>
                    <LevelIndicator level={f.level} delay={i * 0.12 + 0.3 + k * 0.05} />
                  </div>
                ))}
              </div>
            </div>

            {/* תוצאה */}
            <div className="mt-auto pt-4 border-t border-white/[0.04]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block mb-2">{t("proof.scenarios.scenarioOutlook")}</span>
              <p className="text-[11px] text-zinc-300 leading-relaxed">{scenario.outlook}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* אזהרה */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-6 flex items-start gap-3 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-4"
      >
        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-zinc-400 leading-relaxed">
          {t("proof.scenarios.warning")}
        </p>
      </motion.div>
    </section>
  );
}

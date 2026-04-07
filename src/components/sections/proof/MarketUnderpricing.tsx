"use client";

// סקציית "למה השוק מתמחר מתחת" — ניתוח אסטרטגי של הפער בין אימוץ לתמחור
import { motion } from "framer-motion";
import { ArrowRight, Layers, Eye, EyeOff, TrendingUp, Puzzle, Zap } from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

const frameworks = [
  {
    icon: Eye,
    title: "Visible Market vs. Embedded Infrastructure",
    description:
      "Current crypto market capitalization reflects speculative and retail activity. Enterprise adoption of blockchain infrastructure — tokenization rails, settlement layers, oracle networks — operates largely below the surface of visible market activity.",
    insight: "If even a fraction of institutional infrastructure spending shifts to public blockchain rails, the addressable market for these assets expands significantly beyond current token valuations.",
  },
  {
    icon: Layers,
    title: "Speculation Layer vs. Utility Layer vs. Infrastructure Layer",
    description:
      "Most crypto market discussion focuses on the speculation layer. The utility layer (DeFi, payments, stablecoins) is growing but still early. The infrastructure layer (oracles, interoperability, settlement, tokenization) compounds value over time as adoption accumulates.",
    insight: "Infrastructure layers capture value from all applications built on top of them — similar to how cloud providers capture value from all SaaS companies running on their platforms.",
  },
  {
    icon: TrendingUp,
    title: "Tokenization TAM Expansion",
    description:
      "BCG estimates $16T in tokenized assets by 2030. McKinsey projects $5T by 2030. Even conservative estimates suggest tokenization alone could add trillions in on-chain economic activity — most of which does not exist in today's crypto market cap.",
    insight: "Tokenization growth creates structural demand for settlement chains, oracle networks, and interoperability protocols — directly benefiting assets in this portfolio.",
  },
  {
    icon: Puzzle,
    title: "Enterprise Adoption Time Lag",
    description:
      "Enterprise and institutional blockchain adoption operates on multi-year cycles. Pilots conducted in 2023-2024 may not reach production until 2025-2027. Token prices often fail to reflect this pipeline because markets discount what they cannot immediately measure.",
    insight: "The gap between enterprise pipeline activity and market pricing creates potential for asymmetric returns if adoption converts from pilot to production.",
  },
  {
    icon: EyeOff,
    title: "Settlement Modernization is Invisible",
    description:
      "Cross-border payments ($150T+/year), securities settlement ($2.5 quadrillion/year DTCC), and trade finance ($5.2T gap) are massive markets with significant inefficiencies. Blockchain-based modernization of these systems doesn't require retail adoption — it happens in the infrastructure layer.",
    insight: "Financial infrastructure transformation is the largest potential demand driver for blockchain — and it operates independently of retail crypto market sentiment.",
  },
  {
    icon: Zap,
    title: "Optionality and Asymmetric Exposure",
    description:
      "Portfolio assets positioned at the intersection of blockchain infrastructure and traditional finance carry embedded optionality. If adoption accelerates, these assets benefit disproportionately. If adoption stalls, positions are sized to manage downside.",
    insight: "Under a successful execution scenario, the relationship between current pricing and potential infrastructure value represents asymmetric upside — not a guarantee, but a structural positioning advantage.",
  },
];

export default function MarketUnderpricing() {
  const { t } = useLanguage();

  return (
    <section className="py-16 max-w-6xl mx-auto">
      <SectionHeader
        badge={t("proof.underpricing.badge")}
        title={t("proof.underpricing.title")}
        subtitle={t("proof.underpricing.subtitle")}
      />

      <div className="space-y-4 mt-8">
        {frameworks.map((fw, i) => (
          <motion.div
            key={fw.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.1] transition-colors duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/15 p-2.5 shrink-0">
                <fw.icon className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-2">{fw.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">{fw.description}</p>
                <div className="flex items-start gap-2 rounded-lg bg-white/[0.03] border border-white/[0.05] p-3">
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-zinc-300 leading-relaxed">{fw.insight}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* כותרת אזהרה */}
      <div className="mt-8 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-5 text-center">
        <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          <strong className="text-amber-400">{t("proof.underpricing.important")}:</strong> {t("proof.underpricing.importantText")}
        </p>
      </div>
    </section>
  );
}

"use client";

// דף DeFi - אסטרטגיית תשואה מבוזרת ומסגרת סיכונים
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import DeFiRiskFramework from "@/components/sections/DeFiRiskFramework";
import ThesisCardGrid from "@/components/sections/ThesisCardGrid";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Percent, Landmark, Droplets, Shield, ArrowRightLeft, Layers } from "lucide-react";

export default function DeFiPage() {
  const { t } = useLanguage();

  const strategies = [
    { icon: Percent, title: t("defi.strategyCards.lending.title"), description: t("defi.strategyCards.lending.description"), accent: "#3b82f6" },
    { icon: Landmark, title: t("defi.strategyCards.staking.title"), description: t("defi.strategyCards.staking.description"), accent: "#8b5cf6" },
    { icon: Droplets, title: t("defi.strategyCards.liquidity.title"), description: t("defi.strategyCards.liquidity.description"), accent: "#06b6d4" },
    { icon: ArrowRightLeft, title: t("defi.strategyCards.optimization.title"), description: t("defi.strategyCards.optimization.description"), accent: "#10b981" },
    { icon: Shield, title: t("defi.strategyCards.riskFirst.title"), description: t("defi.strategyCards.riskFirst.description"), accent: "#f59e0b" },
    { icon: Layers, title: t("defi.strategyCards.multiChain.title"), description: t("defi.strategyCards.multiChain.description"), accent: "#f43f5e" },
  ];

  const metrics = [
    { label: t("defi.metrics.targetApy"), value: "4-12%", color: "#10b981" },
    { label: t("defi.metrics.maxExposure"), value: "10%", color: "#f59e0b" },
    { label: t("defi.metrics.chains"), value: "3+", color: "#3b82f6" },
    { label: t("defi.metrics.allocation"), value: "25%", color: "#f59e0b" },
  ];

  return (
    <PageWrapper bgGrid>
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block rounded-full bg-amber-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-6">{t("defi.badge")}</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"><span className="gradient-text">{t("defi.title")}</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("defi.subtitle")}</p>
        </motion.div>
      </section>

      <section className="pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-xl border border-amber-200/40 bg-white backdrop-blur-md p-4 text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader badge={t("defi.strategies.badge")} title={t("defi.strategies.title")} subtitle={t("defi.strategies.subtitle")} />
        <ThesisCardGrid cards={strategies} />
      </section>

      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader badge={t("defi.risk.badge")} title={t("defi.risk.title")} subtitle={t("defi.risk.subtitle")} />
        <DeFiRiskFramework />
      </section>
    </PageWrapper>
  );
}

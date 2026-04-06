"use client";

// דף החזקות - מחקר נכסים ואקספלורר
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import AssetResearchExplorer from "@/components/sections/AssetResearchExplorer";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function HoldingsPage() {
  const { t } = useLanguage();

  const stats = [
    { label: t("holdings.stats.totalAssets"), value: "16", color: "#3b82f6" },
    { label: t("holdings.stats.verticals"), value: "6", color: "#8b5cf6" },
    { label: t("holdings.stats.layer1"), value: "6", color: "#06b6d4" },
    { label: t("holdings.stats.riskCategories"), value: "7", color: "#10b981" },
  ];

  return (
    <PageWrapper bgGrid>
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-blue-400 border border-blue-500/20 mb-6">
            {t("holdings.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">{t("holdings.title")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("holdings.subtitle")}</p>
        </motion.div>
      </section>

      <section className="pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-4 text-center">
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-8 max-w-7xl mx-auto">
        <SectionHeader badge={t("holdings.explorer.badge")} title={t("holdings.explorer.title")} subtitle={t("holdings.explorer.subtitle")} />
        <AssetResearchExplorer />
      </section>

      <section className="py-12 max-w-3xl mx-auto">
        <div className="rounded-xl border border-tams-amber/10 bg-tams-amber/[0.03] p-5">
          <p className="text-xs text-muted-foreground leading-relaxed text-center">{t("holdings.disclaimer")}</p>
        </div>
      </section>
    </PageWrapper>
  );
}

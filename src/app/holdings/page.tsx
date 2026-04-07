"use client";

// דף החזקות - מחקר נכסים ואקספלורר
import PageTableOfContents from "@/components/layout/PageTableOfContents";
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import AssetResearchExplorer from "@/components/sections/AssetResearchExplorer";
import { useLanguage } from "@/lib/i18n";
import TamsLogo from "@/components/layout/TamsLogo";
import { motion } from "framer-motion";

export default function HoldingsPage() {
  const { t } = useLanguage();

  const stats = [
    { label: t("holdings.stats.totalAssets"), value: "16", color: "#3b82f6" },
    { label: t("holdings.stats.verticals"), value: "6", color: "#8b5cf6" },
    { label: t("holdings.stats.layer1"), value: "6", color: "#f59e0b" },
    { label: t("holdings.stats.riskCategories"), value: "7", color: "#10b981" },
  ];

  const holdingsSections = [
    { id: "holdings-hero", label: "החזקות" },
    { id: "holdings-stats", label: "סטטיסטיקות" },
    { id: "holdings-explorer", label: "אקספלורר נכסים" },
  ];

  return (
    <PageWrapper bgGrid>
      <PageTableOfContents sections={holdingsSections} />

      <section id="holdings-hero" className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex justify-center mb-6">
            <TamsLogo size="md" showText={false} />
          </div>
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-6">
            {t("holdings.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">{t("holdings.title")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("holdings.subtitle")}</p>
        </motion.div>
      </section>

      <section id="holdings-stats" className="pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-4 text-center shadow-sm">
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="holdings-explorer" className="py-8 max-w-7xl mx-auto">
        <SectionHeader badge={t("holdings.explorer.badge")} title={t("holdings.explorer.title")} subtitle={t("holdings.explorer.subtitle")} />
        <AssetResearchExplorer />
      </section>

      <section className="py-12 max-w-3xl mx-auto">
        <div className="rounded-xl border border-amber-200 bg-amber-500/[0.06] p-5">
          <p className="text-xs text-muted-foreground leading-relaxed text-center">{t("holdings.disclaimer")}</p>
        </div>
      </section>
    </PageWrapper>
  );
}

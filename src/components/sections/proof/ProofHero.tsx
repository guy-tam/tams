"use client";

// סקציית הירו — מסר מרכזי על תזת ההשקעה המוסדית
import { motion } from "framer-motion";
import { Shield, TrendingUp, Layers, Zap, BarChart3, Repeat } from "lucide-react";
import { evidenceStats } from "@/data/adoption/evidence";
import { useLanguage } from "@/lib/i18n/context";

const engineIcons = [TrendingUp, Layers, Zap, Repeat, BarChart3, Shield];

export default function ProofHero() {
  const { t } = useLanguage();

  const engines = [
    { icon: engineIcons[0], label: t("proof.hero.engineTreasuryLabel"), desc: t("proof.hero.engineTreasuryDesc") },
    { icon: engineIcons[1], label: t("proof.hero.engineDefiLabel"), desc: t("proof.hero.engineDefiDesc") },
    { icon: engineIcons[2], label: t("proof.hero.engineTradingLabel"), desc: t("proof.hero.engineTradingDesc") },
    { icon: engineIcons[3], label: t("proof.hero.engineRotationLabel"), desc: t("proof.hero.engineRotationDesc") },
    { icon: engineIcons[4], label: t("proof.hero.engineRiskLabel"), desc: t("proof.hero.engineRiskDesc") },
    { icon: engineIcons[5], label: t("proof.hero.engineInfraLabel"), desc: t("proof.hero.engineInfraDesc") },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* רקע גרדיאנט עדין */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-amber-500/[0.02]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/[0.04] blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 border border-amber-200 mb-8 shadow-[0_0_20px_rgba(212,168,83,0.12)]">
            {t("proof.hero.badge")}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-normal leading-[1.2] mb-8">
            <span className="text-white">{t("proof.hero.title")}</span>
            <span className="gradient-text">{t("proof.hero.titleHighlight")}</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-6">
            {t("proof.hero.description")}
          </p>

          <p className="text-sm text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-12">
            {t("proof.hero.subdescription")}
          </p>
        </motion.div>

        {/* סטטיסטיקות ראיות */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-16 stats-shimmer-bg"
        >
          {[
            { value: evidenceStats.totalRecords, label: t("proof.hero.statsEvidenceRecords") },
            { value: evidenceStats.uniqueOrganizations, label: t("proof.hero.statsOrganizations") },
            { value: evidenceStats.uniqueCountries, label: t("proof.hero.statsCountries") },
            { value: evidenceStats.byConfidence.high, label: t("proof.hero.statsHighConfidence") },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl border border-amber-500/15 bg-blue-500/[0.04] backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <motion.div
                  className="text-2xl sm:text-3xl font-bold text-white mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* מנועי רווח */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-6">
            {t("proof.hero.enginesTitle")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {engines.map((engine, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.07 }}
                className="rounded-xl border border-amber-500/15 bg-white/[0.03] p-4 text-left hover:border-amber-500/25 hover:bg-white/[0.06] transition-all duration-300"
              >
                <engine.icon className="h-4 w-4 text-blue-400 mb-2" />
                <div className="text-sm font-medium text-white mb-1">{engine.label}</div>
                <div className="text-[11px] text-zinc-500 leading-relaxed">{engine.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

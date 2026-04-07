"use client";

// רשת כרטיסי תזה — כרטיס לכל נכס עם ציונים, קטגוריה ותמצית מוסדית
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertTriangle } from "lucide-react";
import { assetProfiles } from "@/data/adoption/assets";
import { evidenceRecords } from "@/data/adoption/evidence";
import { thesisCategoryLabels } from "@/data/adoption/types";
import type { AssetThesisProfile } from "@/data/adoption/types";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

// צבעים לציונים
function scoreColor(score: number): string {
  if (score >= 8) return "text-emerald-400";
  if (score >= 6) return "text-blue-400";
  if (score >= 4) return "text-amber-400";
  return "text-gray-400";
}

function scoreBarColor(score: number): string {
  if (score >= 8) return "bg-emerald-400";
  if (score >= 6) return "bg-blue-400";
  if (score >= 4) return "bg-amber-400";
  return "bg-gray-400";
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-gray-400 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-amber-50/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${scoreBarColor(value)}`}
        />
      </div>
      <span className={`text-[11px] font-mono font-semibold w-5 text-right ${scoreColor(value)}`}>{value}</span>
    </div>
  );
}

function AssetCard({ profile, onAssetClick, t }: { profile: AssetThesisProfile; onAssetClick?: (ticker: string) => void; t: (key: string) => string }) {
  const [expanded, setExpanded] = useState(false);
  const evidenceCount = evidenceRecords.filter((r) => r.asset === profile.ticker).length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-amber-200/40 bg-amber-50/20 backdrop-blur-sm overflow-hidden hover:border-amber-300/40 transition-colors duration-300"
    >
      <div className="p-5">
        {/* כותרת */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-white">{profile.ticker}</span>
              <span className="text-sm text-gray-500">{profile.name}</span>
            </div>
            <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/15 rounded-full px-2.5 py-0.5">
              {thesisCategoryLabels[profile.primaryCategory]}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAssetClick?.(profile.ticker);
            }}
            className="text-right group cursor-pointer"
            title={`View ${profile.ticker} evidence records`}
          >
            <div className="text-[10px] text-gray-400 uppercase tracking-wider group-hover:text-amber-400 transition-colors">{t("proof.assetGrid.evidence")}</div>
            <div className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{evidenceCount}</div>
            <div className="text-[9px] text-gray-400 group-hover:text-amber-500/60 transition-colors">{t("proof.assetGrid.view")} &darr;</div>
          </button>
        </div>

        {/* תמצית */}
        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">{profile.institutionalSummary}</p>

        {/* נושאי אימוץ */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {profile.adoptionThemes.map((theme) => (
            <span key={theme} className="text-[10px] text-gray-500 bg-white border border-amber-200/40 rounded-full px-2 py-0.5">
              {theme}
            </span>
          ))}
        </div>

        {/* ציונים */}
        <div className="space-y-2 mb-4">
          <ScoreBar label={t("proof.assetGrid.scoreFinance")} value={profile.scores.financeRelevance} />
          <ScoreBar label={t("proof.assetGrid.scoreAdoption")} value={profile.scores.adoptionMaturity} />
          <ScoreBar label={t("proof.assetGrid.scoreEcosystem")} value={profile.scores.ecosystemStrength} />
          <ScoreBar label={t("proof.assetGrid.scoreConfidence")} value={profile.scores.verificationConfidence} />
        </div>

        {/* כפתור פתיחה */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
          {expanded ? t("proof.assetGrid.hideDetails") : t("proof.assetGrid.riskCaveats")}
        </button>
      </div>

      {/* פרטים מורחבים */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-amber-100/30">
              <div className="flex items-start gap-2 mt-3">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-gray-400 leading-relaxed">{profile.riskNote}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AssetThesisGrid({ onAssetClick }: { onAssetClick?: (ticker: string) => void }) {
  const { t } = useLanguage();

  return (
    <section className="py-16 max-w-7xl mx-auto">
      <SectionHeader
        badge={t("proof.assetGrid.badge")}
        title={t("proof.assetGrid.title")}
        subtitle={t("proof.assetGrid.subtitle")}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {assetProfiles.map((profile) => (
          <AssetCard key={profile.ticker} profile={profile} onAssetClick={onAssetClick} t={t} />
        ))}
      </div>
    </section>
  );
}

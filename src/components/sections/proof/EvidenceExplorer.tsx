"use client";

// אקספלורר ראיות — טבלה חיפושית ומסננת עם 100+ רשומות
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, ChevronDown, ChevronUp, ExternalLink,
  Shield, AlertCircle, HelpCircle, Globe, Building2, Link2
} from "lucide-react";
import { evidenceRecords, evidenceStats } from "@/data/adoption/evidence";
import {
  evidenceStatusLabels,
  confidenceLevelLabels,
  organizationTypeLabels,
  relationshipTypeLabels,
} from "@/data/adoption/types";
import type { EvidenceRecord, ConfidenceLevel, EvidenceStatus, AssetTicker, Region } from "@/data/adoption/types";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

// ─── תגיות סטטוס ───
function StatusBadge({ status }: { status: EvidenceStatus }) {
  const colors: Record<EvidenceStatus, string> = {
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    pilot: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    historical: "bg-gray-400/15 text-zinc-400 border-zinc-500/20",
    announced: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    "ecosystem-support": "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    indirect: "bg-amber-500/[0.06]0/15 text-amber-400 border-amber-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border ${colors[status]}`}>
      {evidenceStatusLabels[status]}
    </span>
  );
}

function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const config: Record<ConfidenceLevel, { icon: typeof Shield; color: string }> = {
    high: { icon: Shield, color: "text-emerald-400" },
    medium: { icon: AlertCircle, color: "text-amber-400" },
    low: { icon: HelpCircle, color: "text-zinc-500" },
  };
  const { icon: Icon, color } = config[level];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {confidenceLevelLabels[level]}
    </span>
  );
}

// ─── שורת ראיה מורחבת ───
function EvidenceRow({ record, t }: { record: EvidenceRecord; t: (key: string) => string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      {/* שורה ראשית */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-start px-4 py-3 hover:bg-blue-500/[0.03] transition-colors flex items-center gap-3"
      >
        {/* טיקר */}
        <span className="text-xs font-bold text-white w-12 shrink-0">{record.asset}</span>

        {/* ארגון */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-white font-medium truncate">{record.organization}</span>
            <StatusBadge status={record.status} />
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-zinc-500">{organizationTypeLabels[record.organizationType]}</span>
            <span className="text-[10px] text-zinc-500">·</span>
            <span className="text-[10px] text-zinc-500">{record.country}</span>
          </div>
        </div>

        {/* סוג קשר */}
        <span className="hidden md:inline-block text-[10px] text-zinc-400 bg-white border border-amber-500/15 rounded-full px-2 py-0.5 shrink-0">
          {relationshipTypeLabels[record.relationshipType]}
        </span>

        {/* ביטחון */}
        <div className="hidden sm:block shrink-0">
          <ConfidenceBadge level={record.confidence} />
        </div>

        {/* חץ פתיחה */}
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-zinc-500 shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-zinc-500 shrink-0" />
        )}
      </button>

      {/* פרטים מורחבים */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 ms-12">
              <div className="rounded-lg border border-amber-500/15 bg-white/[0.03] p-4 space-y-3">
                {/* תיאור */}
                <p className="text-xs text-gray-600 leading-relaxed">{record.description}</p>

                {/* למה זה חשוב */}
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 block mb-1">{t("proof.evidence.whyItMatters")}</span>
                  <p className="text-xs text-zinc-400 leading-relaxed">{record.whyItMatters}</p>
                </div>

                {/* מטא-דאטה */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="h-3 w-3 text-zinc-500" />
                    <span className="text-[10px] text-zinc-500">{organizationTypeLabels[record.organizationType]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Link2 className="h-3 w-3 text-zinc-500" />
                    <span className="text-[10px] text-zinc-500">{relationshipTypeLabels[record.relationshipType]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-3 w-3 text-zinc-500" />
                    <span className="text-[10px] text-zinc-500">{record.region}</span>
                  </div>
                  <ConfidenceBadge level={record.confidence} />
                  {record.sourceDate && (
                    <span className="text-[10px] text-zinc-500">{record.sourceDate}</span>
                  )}
                </div>

                {/* מקור */}
                {record.sourceLabel && (
                  <div className="flex items-center gap-1.5">
                    {record.sourceUrl ? (
                      <a
                        href={record.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {record.sourceLabel}
                      </a>
                    ) : (
                      <span className="text-[10px] text-zinc-500 italic">{t("proof.evidence.source")}: {record.sourceLabel}</span>
                    )}
                  </div>
                )}

                {/* הערות */}
                {record.notes && (
                  <div className="rounded-md bg-amber-500/[0.06]0/[0.05] border border-amber-200 p-2.5">
                    <p className="text-[10px] text-amber-400/80 leading-relaxed">
                      <strong>{t("proof.evidence.caveat")}:</strong> {record.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── פילטרים ───
const allAssets: AssetTicker[] = ["ETH", "SOL", "AVAX", "ALGO", "SUI", "NEAR", "XRP", "XLM", "XDC", "HBAR", "LINK", "QNT", "ONDO", "CFG", "RNDR", "TAO"];
const allRegions: Region[] = ["North America", "Europe", "Asia Pacific", "Global", "Africa", "Latin America", "Middle East", "Oceania"];
const allConfidence: ConfidenceLevel[] = ["high", "medium", "low"];
const allStatuses: EvidenceStatus[] = ["active", "pilot", "historical", "announced", "ecosystem-support", "indirect"];

type SortField = "asset" | "confidence" | "organization" | "region";

export default function EvidenceExplorer({ initialAsset }: { initialAsset?: string | null }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [assetFilter, setAssetFilter] = useState<AssetTicker | "all">("all");
  const [regionFilter, setRegionFilter] = useState<Region | "all">("all");
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceLevel | "all">("all");
  const [statusFilter, setStatusFilter] = useState<EvidenceStatus | "all">("all");
  const [sortField, setSortField] = useState<SortField>("asset");
  const [showFilters, setShowFilters] = useState(false);

  // כאשר נבחר נכס מ-AssetThesisGrid, עדכן את הפילטר
  useEffect(() => {
    if (initialAsset) {
      setAssetFilter(initialAsset as AssetTicker);
      setShowFilters(true);
    }
  }, [initialAsset]);

  const filtered = useMemo(() => {
    let result = [...evidenceRecords];

    // חיפוש טקסט
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.organization.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.asset.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q)
      );
    }

    // סינון
    if (assetFilter !== "all") result = result.filter((r) => r.asset === assetFilter);
    if (regionFilter !== "all") result = result.filter((r) => r.region === regionFilter);
    if (confidenceFilter !== "all") result = result.filter((r) => r.confidence === confidenceFilter);
    if (statusFilter !== "all") result = result.filter((r) => r.status === statusFilter);

    // מיון
    const confOrder: Record<ConfidenceLevel, number> = { high: 3, medium: 2, low: 1 };
    result.sort((a, b) => {
      switch (sortField) {
        case "asset": return a.asset.localeCompare(b.asset);
        case "confidence": return confOrder[b.confidence] - confOrder[a.confidence];
        case "organization": return a.organization.localeCompare(b.organization);
        case "region": return a.region.localeCompare(b.region);
        default: return 0;
      }
    });

    return result;
  }, [search, assetFilter, regionFilter, confidenceFilter, statusFilter, sortField]);

  return (
    <section className="py-16 max-w-7xl mx-auto">
      <SectionHeader
        badge={t("proof.evidence.badge")}
        title={t("proof.evidence.title")}
        subtitle={`${evidenceStats.totalRecords} ${t("proof.evidence.subtitle")} ${evidenceStats.uniqueOrganizations} ${t("proof.hero.statsOrganizations")} & ${evidenceStats.uniqueCountries} ${t("proof.hero.statsCountries")}.`}
      />

      {/* סרגל חיפוש ופילטרים */}
      <div className="mt-8 mb-4 space-y-3">
        {/* חיפוש */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder={t("proof.evidence.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-amber-500/15 bg-white ps-10 pe-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/20 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors ${
              showFilters
                ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                : "border-amber-500/15 bg-white text-zinc-400 hover:text-white"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">{t("proof.evidence.filters")}</span>
          </button>
        </div>

        {/* פאנל פילטרים */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-4 rounded-xl border border-amber-500/15 bg-white/[0.03]">
                {/* נכס */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 block">{t("proof.evidence.filterAsset")}</label>
                  <select
                    value={assetFilter}
                    onChange={(e) => setAssetFilter(e.target.value as AssetTicker | "all")}
                    className="w-full rounded-md border border-amber-500/15 bg-white px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/30"
                  >
                    <option value="all">{t("proof.evidence.allAssets")}</option>
                    {allAssets.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                {/* אזור */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 block">{t("proof.evidence.filterRegion")}</label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value as Region | "all")}
                    className="w-full rounded-md border border-amber-500/15 bg-white px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/30"
                  >
                    <option value="all">{t("proof.evidence.allRegions")}</option>
                    {allRegions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* ביטחון */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 block">{t("proof.evidence.filterConfidence")}</label>
                  <select
                    value={confidenceFilter}
                    onChange={(e) => setConfidenceFilter(e.target.value as ConfidenceLevel | "all")}
                    className="w-full rounded-md border border-amber-500/15 bg-white px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/30"
                  >
                    <option value="all">{t("proof.evidence.allLevels")}</option>
                    {allConfidence.map((c) => (
                      <option key={c} value={c}>{confidenceLevelLabels[c]}</option>
                    ))}
                  </select>
                </div>

                {/* סטטוס */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 block">{t("proof.evidence.filterStatus")}</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as EvidenceStatus | "all")}
                    className="w-full rounded-md border border-amber-500/15 bg-white px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/30"
                  >
                    <option value="all">{t("proof.evidence.allStatuses")}</option>
                    {allStatuses.map((s) => (
                      <option key={s} value={s}>{evidenceStatusLabels[s]}</option>
                    ))}
                  </select>
                </div>

                {/* מיון */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 block">{t("proof.evidence.filterSort")}</label>
                  <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as SortField)}
                    className="w-full rounded-md border border-amber-500/15 bg-white px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500/30"
                  >
                    <option value="asset">{t("proof.evidence.sortAsset")}</option>
                    <option value="confidence">{t("proof.evidence.sortConfidence")}</option>
                    <option value="organization">{t("proof.evidence.sortOrganization")}</option>
                    <option value="region">{t("proof.evidence.sortRegion")}</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* תוצאות */}
      <div className="text-[11px] text-zinc-500 mb-3">
        {t("proof.evidence.showing")} {filtered.length} {t("proof.evidence.of")} {evidenceRecords.length} {t("proof.evidence.records")}
      </div>

      {/* טבלת ראיות */}
      <div className="rounded-xl border border-amber-500/15 bg-white/[0.03] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm text-zinc-500">{t("proof.evidence.noRecords")}</p>
          </div>
        ) : (
          filtered.map((record) => (
            <EvidenceRow key={record.id} record={record} t={t} />
          ))
        )}
      </div>
    </section>
  );
}

"use client";

// מפת כיסוי אימוץ — ויזואליזציה של פריסה גיאוגרפית וארגונית עם Treemap ותרשימי עוגה
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Globe, Building2, Layers, BarChart3, ShieldCheck, Activity } from "lucide-react";
import {
  Treemap,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { evidenceRecords } from "@/data/adoption/evidence";
import { organizationTypeLabels, evidenceStatusLabels, confidenceLevelLabels } from "@/data/adoption/types";
import type { Region, OrganizationType, AssetTicker, ConfidenceLevel, EvidenceStatus } from "@/data/adoption/types";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

// צבעי אזורים
const regionColors: Record<string, string> = {
  "North America": "from-blue-500/20 to-blue-600/10 border-blue-500/20",
  "Europe": "from-purple-500/20 to-purple-600/10 border-purple-500/20",
  "Asia Pacific": "from-blue-500/20 to-blue-600/10 border-blue-500/20",
  "Global": "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20",
  "Africa": "from-amber-500/20 to-amber-600/10 border-amber-200",
  "Latin America": "from-rose-500/20 to-rose-600/10 border-rose-500/20",
  "Middle East": "from-orange-500/20 to-orange-600/10 border-orange-500/20",
  "Oceania": "from-teal-500/20 to-teal-600/10 border-teal-500/20",
};

// צבעי ביטחון — מגולם כצבעים מוחלטים לתרשימי recharts
const CONFIDENCE_COLORS: Record<ConfidenceLevel, string> = {
  high: "#3b82f6",    // כחול
  medium: "#f59e0b",  // זהב
  low: "#71717a",     // אפור
};

// צבעי סטטוס
const STATUS_COLORS: Record<EvidenceStatus, string> = {
  active: "#34d399",
  pilot: "#4f8ff7",
  announced: "#a78bfa",
  "ecosystem-support": "#3b82f6",
  historical: "#71717a",
  indirect: "#a1a1aa",
};

// חישוב צבע ע״פ עוצמת ביטחון ממוצעת (0-1) — מכחול כהה לזהב בהיר
function getTreemapColor(avgConfidence: number): string {
  // avgConfidence: 0 (low) to 1 (high)
  // Low confidence -> muted gold, High confidence -> bright blue
  const r = Math.round(59 + (245 - 59) * (1 - avgConfidence));
  const g = Math.round(130 + (158 - 130) * (1 - avgConfidence));
  const b = Math.round(246 + (11 - 246) * (1 - avgConfidence));
  return `rgb(${r}, ${g}, ${b})`;
}

// תוכן מותאם אישית לריבועי Treemap
function TreemapContent(props: any) {
  const { x, y, width, height, name, count, fill } = props;
  if (width < 30 || height < 24) return null;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={4}
        fill={fill}
        stroke="rgba(0,0,0,0.4)"
        strokeWidth={1.5}
      />
      {width > 45 && height > 36 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 6}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fff"
            fontSize={width > 80 ? 14 : 11}
            fontWeight={700}
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 12}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(255,255,255,0.6)"
            fontSize={10}
          >
            {count}
          </text>
        </>
      )}
      {width > 30 && width <= 45 && height > 24 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff"
          fontSize={9}
          fontWeight={600}
        >
          {name}
        </text>
      )}
    </g>
  );
}

// טולטיפ מותאם לתרשימי עוגה
function CustomPieTooltip({ active, payload }: any) {
  if (!active || !payload?.[0]) return null;
  const { name, value, payload: entry } = payload[0];
  return (
    <div className="rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-xl text-xs">
      <div className="font-semibold text-white">{name}</div>
      <div className="text-gray-500 mt-0.5">{value} records ({entry.pct}%)</div>
    </div>
  );
}

export default function AdoptionCoverage() {
  const { t } = useLanguage();
  const analysis = useMemo(() => {
    // פריסה לפי אזור
    const byRegion = new Map<Region, number>();
    evidenceRecords.forEach((r) => {
      byRegion.set(r.region, (byRegion.get(r.region) || 0) + 1);
    });
    const regions = [...byRegion.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([region, count]) => ({ region, count }));

    // פריסה לפי סוג ארגון
    const byOrgType = new Map<OrganizationType, number>();
    evidenceRecords.forEach((r) => {
      byOrgType.set(r.organizationType, (byOrgType.get(r.organizationType) || 0) + 1);
    });
    const orgTypes = [...byOrgType.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count }));

    // ריכוז לפי נכס — כולל חישוב ביטחון ממוצע לצבע
    const assetData = new Map<AssetTicker, { count: number; totalConfidence: number }>();
    evidenceRecords.forEach((r) => {
      const prev = assetData.get(r.asset) || { count: 0, totalConfidence: 0 };
      const confValue = r.confidence === "high" ? 1 : r.confidence === "medium" ? 0.5 : 0.15;
      assetData.set(r.asset, {
        count: prev.count + 1,
        totalConfidence: prev.totalConfidence + confValue,
      });
    });
    const treemapData = [...assetData.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .map(([ticker, data]) => ({
        name: ticker,
        size: data.count,
        count: data.count,
        avgConfidence: data.totalConfidence / data.count,
        fill: getTreemapColor(data.totalConfidence / data.count),
      }));

    // התפלגות רמת ביטחון
    const byConfidence = new Map<ConfidenceLevel, number>();
    evidenceRecords.forEach((r) => {
      byConfidence.set(r.confidence, (byConfidence.get(r.confidence) || 0) + 1);
    });
    const total = evidenceRecords.length;
    const confidenceData = (["high", "medium", "low"] as ConfidenceLevel[])
      .map((level) => ({
        name: confidenceLevelLabels[level],
        value: byConfidence.get(level) || 0,
        pct: Math.round(((byConfidence.get(level) || 0) / total) * 100),
        color: CONFIDENCE_COLORS[level],
      }))
      .filter((d) => d.value > 0);

    // התפלגות סטטוס
    const byStatus = new Map<EvidenceStatus, number>();
    evidenceRecords.forEach((r) => {
      byStatus.set(r.status, (byStatus.get(r.status) || 0) + 1);
    });
    const statusData = (Object.keys(evidenceStatusLabels) as EvidenceStatus[])
      .map((status) => ({
        name: evidenceStatusLabels[status],
        value: byStatus.get(status) || 0,
        pct: Math.round(((byStatus.get(status) || 0) / total) * 100),
        color: STATUS_COLORS[status],
      }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);

    return { regions, orgTypes, treemapData, confidenceData, statusData, total };
  }, []);

  return (
    <section className="py-16 max-w-7xl mx-auto">
      <SectionHeader
        badge={t("proof.coverage.badge")}
        title={t("proof.coverage.title")}
        subtitle={t("proof.coverage.subtitle")}
      />

      {/* שורה עליונה: גיאוגרפיה + סוגי ארגון */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* כיסוי גיאוגרפי */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-gray-200 bg-gray-50/50 p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Globe className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">{t("proof.coverage.geoDistribution")}</h3>
          </div>
          <div className="space-y-2.5">
            {analysis.regions.map((item, i) => (
              <motion.div
                key={item.region}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-lg bg-gradient-to-r ${regionColors[item.region] || "from-zinc-500/20 to-zinc-600/10 border-zinc-500/20"} border p-3 flex items-center justify-between`}
              >
                <span className="text-sm text-white">{item.region}</span>
                <span className="text-sm font-bold text-white">{item.count}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* סוגי ארגונים */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-gray-200 bg-gray-50/50 p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">{t("proof.coverage.orgTypes")}</h3>
          </div>
          <div className="space-y-2">
            {analysis.orgTypes.map((item, i) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3"
              >
                <span className="text-[11px] text-gray-500 w-36 shrink-0 truncate">{organizationTypeLabels[item.type]}</span>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(item.count / analysis.orgTypes[0].count) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.04 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500/60 to-amber-500/60"
                  />
                </div>
                <span className="text-xs font-mono text-gray-500 w-6 text-right">{item.count}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* שורה שניה: Treemap ריכוז לפי נכס */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mt-6 rounded-xl border border-gray-200 bg-gray-50/50 p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">{t("proof.coverage.assetConcentration")}</h3>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: getTreemapColor(1) }} />
              High confidence
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: getTreemapColor(0.5) }} />
              Medium
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: getTreemapColor(0.15) }} />
              Low
            </span>
          </div>
        </div>
        <div style={{ minHeight: 320 }}>
          <ResponsiveContainer width="100%" height={320}>
            <Treemap
              data={analysis.treemapData}
              dataKey="size"
              stroke="none"
              content={<TreemapContent />}
              animationDuration={800}
            />
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* שורה שלישית: תרשימי עוגה — ביטחון + סטטוס */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* התפלגות רמת ביטחון */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-gray-200 bg-gray-50/50 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Confidence Distribution</h3>
          </div>
          <div className="flex items-center gap-4">
            <div style={{ minHeight: 180, minWidth: 180 }} className="flex-shrink-0">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={analysis.confidenceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={76}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {analysis.confidenceData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 flex-1">
              {analysis.confidenceData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: d.color }}
                  />
                  <span className="text-xs text-gray-600 flex-1">{d.name}</span>
                  <span className="text-xs font-mono text-gray-500">{d.pct}%</span>
                  <span className="text-[10px] text-gray-400">({d.value})</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <span className="text-[10px] text-gray-400">{analysis.total} {t("proof.coverage.records")}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* התפלגות סטטוס */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-gray-200 bg-gray-50/50 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-green-400" />
            <h3 className="text-sm font-semibold text-white">Status Distribution</h3>
          </div>
          <div className="flex items-center gap-4">
            <div style={{ minHeight: 180, minWidth: 180 }} className="flex-shrink-0">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={analysis.statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={76}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {analysis.statusData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 flex-1">
              {analysis.statusData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: d.color }}
                  />
                  <span className="text-xs text-gray-600 flex-1">{d.name}</span>
                  <span className="text-xs font-mono text-gray-500">{d.pct}%</span>
                  <span className="text-[10px] text-gray-400">({d.value})</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

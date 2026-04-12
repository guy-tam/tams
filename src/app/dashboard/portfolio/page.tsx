"use client";

// עמוד תיק השקעות מלא - טבלת אחזקות עם מיון ונכסים בטוחים
// עיצוב פרימיום: כחול כהה + זהב מוסדי
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Coins,
} from "lucide-react";
import { getHoldings, getSafeAssetsValue } from "@/lib/portfolio";
import type { Holding } from "@/lib/portfolio";

// פורמט מספרים בשקלים
function formatILS(value: number) {
  return value.toLocaleString("he-IL");
}

// אנימציות
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// סוג מיון
type SortKey = keyof Holding;

// צבע קטגוריה
const categoryColors: Record<string, string> = {
  "Layer 1": "#3b82f6",
  Payments: "#f59e0b",
  Enterprise: "#10b981",
  Infrastructure: "#8b5cf6",
  RWA: "#06b6d4",
  "AI & Compute": "#f43f5e",
  DeFi: "#B6509E",
};

export default function PortfolioPage() {
  const [sortKey, setSortKey] = useState<SortKey>("valueILS");
  const [sortAsc, setSortAsc] = useState(false);

  // שליפת האחזקות ושווי הנכסים הבטוחים דרך שכבת ה-repository
  const holdings = getHoldings();
  const safeAssetsValue = getSafeAssetsValue();

  // מיון אחזקות
  const sorted = [...holdings].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  // החלפת מיון
  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  // כותרת עמודה עם מיון - עיצוב פרימיום
  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    const isActive = sortKey === field;
    return (
      <button
        onClick={() => toggleSort(field)}
        className={`flex items-center gap-1 text-xs uppercase tracking-wider transition-colors ${
          isActive ? "text-amber-400 font-semibold" : "text-slate-500 hover:text-blue-300"
        }`}
      >
        {label}
        <ArrowUpDown className="size-3" />
      </button>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6">
      {/* כותרת */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          תיק השקעות
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          כל הפוזיציות והנכסים — קונספט בלבד
        </p>
      </motion.div>

      {/* נכסים בטוחים - כרטיס זהב פרימיום */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-[#1a1a0f] to-[#1a2030] backdrop-blur-md p-6 shadow-lg shadow-amber-900/10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-xl bg-amber-500/[0.06]0/12 flex items-center justify-center">
            <Shield className="size-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              נכסים בטוחים — זהב, כסף, נחושת
            </h3>
            <p className="text-xs text-slate-400">
              הקצאה לנכסים פיזיים כגידור סיכון
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <div>
            <div className="text-3xl font-bold gradient-text-gold">
              ₪{formatILS(safeAssetsValue)}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              32% מסך התיק
            </div>
          </div>
          <div className="flex gap-4">
            {[
              { name: "זהב", icon: Coins, pct: "60%" },
              { name: "כסף", icon: Coins, pct: "25%" },
              { name: "נחושת", icon: Coins, pct: "15%" },
            ].map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-1.5 text-xs text-slate-400"
              >
                <m.icon className="size-3.5 text-amber-400" />
                {m.name} — {m.pct}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* טבלת אחזקות — דסקטופ - עיצוב פרימיום */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:block rounded-2xl border border-blue-500/15 bg-gradient-to-br from-[#0c1829] to-[#111f36] backdrop-blur-md overflow-hidden shadow-lg shadow-blue-950/20"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-500/10 bg-[#0a1525]/50">
                <th className="px-4 py-3.5 text-right">
                  <SortHeader label="טיקר" field="ticker" />
                </th>
                <th className="px-4 py-3.5 text-right">
                  <SortHeader label="שם" field="name" />
                </th>
                <th className="px-4 py-3.5 text-right">
                  <SortHeader label="קטגוריה" field="category" />
                </th>
                <th className="px-4 py-3.5 text-right">
                  <SortHeader label="כמות" field="quantity" />
                </th>
                <th className="px-4 py-3.5 text-right">
                  <SortHeader label="מחיר ממוצע" field="avgBuyPrice" />
                </th>
                <th className="px-4 py-3.5 text-right">
                  <SortHeader label="מחיר נוכחי" field="currentPrice" />
                </th>
                <th className="px-4 py-3.5 text-right">
                  <SortHeader label="שווי (₪)" field="valueILS" />
                </th>
                <th className="px-4 py-3.5 text-right">
                  <SortHeader label="הקצאה %" field="allocation" />
                </th>
                <th className="px-4 py-3.5 text-right">
                  <SortHeader label="רווח/הפסד %" field="pnl" />
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((h, i) => (
                <motion.tr
                  key={h.ticker}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  className={`border-b border-blue-900/15 hover:bg-blue-500/[0.06] transition-colors ${
                    i % 2 === 0 ? "bg-transparent" : "bg-blue-950/20"
                  }`}
                >
                  <td className="px-4 py-3 font-mono font-bold text-white text-sm">
                    {h.ticker}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {h.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{
                        background: `${h.color || "#71717a"}15`,
                        color: h.color || "#71717a",
                      }}
                    >
                      {h.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200 font-mono">
                    {h.quantity.toLocaleString("he-IL")}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400 font-mono">
                    ${h.avgBuyPrice.toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200 font-mono">
                    ${h.currentPrice.toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm text-amber-300/90 font-bold font-mono">
                    ₪{formatILS(h.valueILS)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {h.allocation}%
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`flex items-center gap-1 text-sm font-medium ${
                        h.pnl >= 0 ? "text-emerald-400/90" : "text-rose-400/90"
                      }`}
                    >
                      {h.pnl >= 0 ? (
                        <ArrowUpRight className="size-3.5" />
                      ) : (
                        <ArrowDownRight className="size-3.5" />
                      )}
                      {h.pnl >= 0 ? "+" : ""}
                      {h.pnl}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* כרטיסים — מובייל - עיצוב פרימיום */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="md:hidden space-y-3"
      >
        {sorted.map((h) => (
          <motion.div
            key={h.ticker}
            variants={itemVariants}
            className="rounded-xl border border-blue-500/15 bg-gradient-to-br from-[#0c1829] to-[#111f36] backdrop-blur-md p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-white">
                  {h.ticker}
                </span>
                <span
                  className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                  style={{
                    background: `${h.color || "#71717a"}15`,
                    color: h.color || "#71717a",
                  }}
                >
                  {h.category}
                </span>
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  h.pnl >= 0 ? "text-emerald-400/90" : "text-rose-400/90"
                }`}
              >
                {h.pnl >= 0 ? "+" : ""}
                {h.pnl}%
              </span>
            </div>
            <div className="text-xs text-slate-400 mb-1">{h.name}</div>
            <div className="flex items-end justify-between">
              <div className="text-lg font-bold text-amber-300/90">
                ₪{formatILS(h.valueILS)}
              </div>
              <div className="text-xs text-slate-400">
                {h.allocation}% מהתיק
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

// עמוד תיק השקעות מלא - טבלת אחזקות עם מיון ונכסים בטוחים
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Coins,
} from "lucide-react";
import { holdings, safeAssetsValue } from "@/data/dashboard-mock";
import type { HoldingPosition } from "@/data/dashboard-mock";

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
type SortKey = keyof HoldingPosition;

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

  // כותרת עמודה עם מיון
  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    const isActive = sortKey === field;
    return (
      <button
        onClick={() => toggleSort(field)}
        className={`flex items-center gap-1 text-xs transition-colors ${
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
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
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          תיק השקעות
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          כל הפוזיציות והנכסים — קונספט בלבד
        </p>
      </motion.div>

      {/* נכסים בטוחים */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] backdrop-blur-md p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <Shield className="size-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              נכסים בטוחים — זהב, כסף, נחושת
            </h3>
            <p className="text-xs text-muted-foreground">
              הקצאה לנכסים פיזיים כגידור סיכון
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-6">
          <div>
            <div className="text-3xl font-bold gradient-text-gold">
              ₪{formatILS(safeAssetsValue)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
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
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <m.icon className="size-3.5 text-amber-400" />
                {m.name} — {m.pct}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* טבלת אחזקות — דסקטופ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:block rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-right">
                  <SortHeader label="טיקר" field="ticker" />
                </th>
                <th className="px-4 py-3 text-right">
                  <SortHeader label="שם" field="name" />
                </th>
                <th className="px-4 py-3 text-right">
                  <SortHeader label="קטגוריה" field="category" />
                </th>
                <th className="px-4 py-3 text-right">
                  <SortHeader label="כמות" field="quantity" />
                </th>
                <th className="px-4 py-3 text-right">
                  <SortHeader label="מחיר ממוצע" field="avgBuyPrice" />
                </th>
                <th className="px-4 py-3 text-right">
                  <SortHeader label="מחיר נוכחי" field="currentPrice" />
                </th>
                <th className="px-4 py-3 text-right">
                  <SortHeader label="שווי (₪)" field="valueILS" />
                </th>
                <th className="px-4 py-3 text-right">
                  <SortHeader label="הקצאה %" field="allocation" />
                </th>
                <th className="px-4 py-3 text-right">
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
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-bold text-foreground text-sm">
                    {h.ticker}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {h.name}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{
                        background: `${h.color || "#71717a"}20`,
                        color: h.color || "#71717a",
                      }}
                    >
                      {h.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-mono">
                    {h.quantity.toLocaleString("he-IL")}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                    ${h.avgBuyPrice.toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-mono">
                    ${h.currentPrice.toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-bold font-mono">
                    ₪{formatILS(h.valueILS)}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {h.allocation}%
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`flex items-center gap-1 text-sm font-medium ${
                        h.pnl >= 0 ? "text-emerald-400" : "text-red-400"
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

      {/* כרטיסים — מובייל */}
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
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-foreground">
                  {h.ticker}
                </span>
                <span
                  className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                  style={{
                    background: `${h.color || "#71717a"}20`,
                    color: h.color || "#71717a",
                  }}
                >
                  {h.category}
                </span>
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  h.pnl >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {h.pnl >= 0 ? "+" : ""}
                {h.pnl}%
              </span>
            </div>
            <div className="text-xs text-muted-foreground mb-1">{h.name}</div>
            <div className="flex items-end justify-between">
              <div className="text-lg font-bold text-foreground">
                ₪{formatILS(h.valueILS)}
              </div>
              <div className="text-xs text-muted-foreground">
                {h.allocation}% מהתיק
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

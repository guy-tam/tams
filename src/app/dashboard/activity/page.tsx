"use client";

// עמוד יומן פעילות - היסטוריית עסקאות עם סינון
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  ArrowRightLeft,
  Percent,
  Landmark,
  CircleDollarSign,
  Wallet,
  Filter,
  Layers,
  Gift,
} from "lucide-react";
import { recentActivity } from "@/data/dashboard-mock";
import type { ActivityItem } from "@/data/dashboard-mock";

// סוגי סינון
const filterOptions = [
  { key: "all", label: "הכל" },
  { key: "buy", label: "קניות" },
  { key: "sell", label: "מכירות" },
  { key: "stake", label: "סטייקינג" },
  { key: "deposit", label: "הפקדות" },
  { key: "yield", label: "תשואות" },
] as const;

type FilterKey = (typeof filterOptions)[number]["key"];

// אנימציות
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    x: 15,
    transition: { duration: 0.2 },
  },
};

// אייקון לפי סוג פעולה
function getActivityIcon(type: string) {
  switch (type) {
    case "buy":
      return <ShoppingCart className="size-4 text-emerald-400" />;
    case "sell":
      return <ArrowRightLeft className="size-4 text-red-400" />;
    case "stake":
      return <Layers className="size-4 text-cyan-400" />;
    case "unstake":
      return <Layers className="size-4 text-orange-400" />;
    case "yield":
      return <Gift className="size-4 text-purple-400" />;
    case "deposit":
      return <Landmark className="size-4 text-blue-400" />;
    case "withdrawal":
      return <CircleDollarSign className="size-4 text-amber-400" />;
    default:
      return <Wallet className="size-4 text-zinc-400" />;
  }
}

// רקע אייקון לפי סוג
function getActivityBg(type: string) {
  switch (type) {
    case "buy":
      return "bg-emerald-400/10";
    case "sell":
      return "bg-red-400/10";
    case "stake":
      return "bg-cyan-400/10";
    case "unstake":
      return "bg-orange-400/10";
    case "yield":
      return "bg-purple-400/10";
    case "deposit":
      return "bg-blue-400/10";
    case "withdrawal":
      return "bg-amber-400/10";
    default:
      return "bg-zinc-400/10";
  }
}

// תווית סוג פעולה
function getTypeLabel(type: string) {
  switch (type) {
    case "buy":
      return "קנייה";
    case "sell":
      return "מכירה";
    case "stake":
      return "סטייקינג";
    case "unstake":
      return "שחרור";
    case "yield":
      return "תשואה";
    case "deposit":
      return "הפקדה";
    case "withdrawal":
      return "משיכה";
    default:
      return type;
  }
}

// צבע תווית סוג
function getTypeLabelColor(type: string) {
  switch (type) {
    case "buy":
      return "bg-emerald-500/15 text-emerald-400";
    case "sell":
      return "bg-red-500/15 text-red-400";
    case "stake":
      return "bg-cyan-500/15 text-cyan-400";
    case "unstake":
      return "bg-orange-500/15 text-orange-400";
    case "yield":
      return "bg-purple-500/15 text-purple-400";
    case "deposit":
      return "bg-blue-500/15 text-blue-400";
    case "withdrawal":
      return "bg-amber-500/15 text-amber-400";
    default:
      return "bg-zinc-500/15 text-zinc-400";
  }
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<FilterKey>("all");

  // סינון פעילות
  const filtered =
    filter === "all"
      ? recentActivity
      : recentActivity.filter((a) => a.type === filter);

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6">
      {/* כותרת */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          יומן פעילות
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          היסטוריית עסקאות ופעולות — קונספט בלבד
        </p>
      </motion.div>

      {/* סרגל סינון */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-2 flex-wrap"
      >
        <Filter className="size-4 text-muted-foreground" />
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setFilter(opt.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === opt.key
                ? "bg-white/[0.1] text-foreground border border-white/[0.12]"
                : "bg-white/[0.03] text-muted-foreground border border-white/[0.06] hover:bg-white/[0.06] hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </motion.div>

      {/* רשימת פעילות */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md overflow-hidden"
        >
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              אין פעילות מסוג זה
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {filtered.map((a: ActivityItem) => (
                <motion.div
                  key={a.id}
                  variants={listItemVariants}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  {/* אייקון סוג */}
                  <div
                    className={`size-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getActivityBg(
                      a.type
                    )}`}
                  >
                    {getActivityIcon(a.type)}
                  </div>

                  {/* פרטי פעולה */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {a.asset}
                      </span>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-medium ${getTypeLabelColor(
                          a.type
                        )}`}
                      >
                        {getTypeLabel(a.type)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 truncate">
                      {a.amount}
                    </div>
                  </div>

                  {/* תאריך */}
                  <div className="text-left flex-shrink-0">
                    <div className="text-xs text-muted-foreground">
                      {a.date}
                    </div>
                  </div>

                  {/* סטטוס */}
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${
                      a.status === "completed"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}
                  >
                    {a.status === "completed" ? "הושלם" : "ממתין"}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

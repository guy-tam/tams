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
import { useLanguage } from "@/lib/i18n";
import { recentActivity } from "@/data/dashboard-mock";
import type { ActivityItem } from "@/data/dashboard-mock";

// מפת תרגומים - כל הטקסטים הנראים בכל 5 השפות
const texts = {
  en: {
    pageTitle: "Activity Log",
    pageSubtitle: "Transaction history & operations — concept only",
    filterAll: "All",
    filterBuys: "Buys",
    filterSells: "Sells",
    filterStaking: "Staking",
    filterDeposits: "Deposits",
    filterYields: "Yields",
    noActivity: "No activity of this type",
    statusCompleted: "Completed",
    statusPending: "Pending",
    typeBuy: "Buy",
    typeSell: "Sell",
    typeStake: "Staking",
    typeUnstake: "Unstake",
    typeYield: "Yield",
    typeDeposit: "Deposit",
    typeWithdrawal: "Withdrawal",
  },
  he: {
    pageTitle: "יומן פעילות",
    pageSubtitle: "היסטוריית עסקאות ופעולות — קונספט בלבד",
    filterAll: "הכל",
    filterBuys: "קניות",
    filterSells: "מכירות",
    filterStaking: "סטייקינג",
    filterDeposits: "הפקדות",
    filterYields: "תשואות",
    noActivity: "אין פעילות מסוג זה",
    statusCompleted: "הושלם",
    statusPending: "ממתין",
    typeBuy: "קנייה",
    typeSell: "מכירה",
    typeStake: "סטייקינג",
    typeUnstake: "שחרור",
    typeYield: "תשואה",
    typeDeposit: "הפקדה",
    typeWithdrawal: "משיכה",
  },
  ar: {
    pageTitle: "سجل النشاط",
    pageSubtitle: "سجل المعاملات والعمليات — مفهوم فقط",
    filterAll: "الكل",
    filterBuys: "شراء",
    filterSells: "بيع",
    filterStaking: "تخزين",
    filterDeposits: "إيداعات",
    filterYields: "عوائد",
    noActivity: "لا يوجد نشاط من هذا النوع",
    statusCompleted: "مكتمل",
    statusPending: "قيد الانتظار",
    typeBuy: "شراء",
    typeSell: "بيع",
    typeStake: "تخزين",
    typeUnstake: "إلغاء التخزين",
    typeYield: "عائد",
    typeDeposit: "إيداع",
    typeWithdrawal: "سحب",
  },
  ru: {
    pageTitle: "Журнал активности",
    pageSubtitle: "История транзакций и операций — только концепт",
    filterAll: "Все",
    filterBuys: "Покупки",
    filterSells: "Продажи",
    filterStaking: "Стейкинг",
    filterDeposits: "Депозиты",
    filterYields: "Доходы",
    noActivity: "Нет активности данного типа",
    statusCompleted: "Завершено",
    statusPending: "В ожидании",
    typeBuy: "Покупка",
    typeSell: "Продажа",
    typeStake: "Стейкинг",
    typeUnstake: "Разблокировка",
    typeYield: "Доход",
    typeDeposit: "Депозит",
    typeWithdrawal: "Вывод",
  },
  es: {
    pageTitle: "Registro de actividad",
    pageSubtitle: "Historial de transacciones y operaciones — solo concepto",
    filterAll: "Todos",
    filterBuys: "Compras",
    filterSells: "Ventas",
    filterStaking: "Staking",
    filterDeposits: "Depósitos",
    filterYields: "Rendimientos",
    noActivity: "No hay actividad de este tipo",
    statusCompleted: "Completado",
    statusPending: "Pendiente",
    typeBuy: "Compra",
    typeSell: "Venta",
    typeStake: "Staking",
    typeUnstake: "Desbloqueo",
    typeYield: "Rendimiento",
    typeDeposit: "Depósito",
    typeWithdrawal: "Retiro",
  },
} as const;

// מפתחות סינון
const filterKeys = ["all", "buy", "sell", "stake", "deposit", "yield"] as const;
type FilterKey = (typeof filterKeys)[number];

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
      return <Layers className="size-4 text-blue-400" />;
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
      return "bg-blue-400/10";
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

// צבע תווית סוג
function getTypeLabelColor(type: string) {
  switch (type) {
    case "buy":
      return "bg-emerald-500/15 text-emerald-400";
    case "sell":
      return "bg-red-500/15 text-red-400";
    case "stake":
      return "bg-blue-500/15 text-blue-400";
    case "unstake":
      return "bg-orange-500/15 text-orange-400";
    case "yield":
      return "bg-purple-500/15 text-purple-400";
    case "deposit":
      return "bg-blue-500/15 text-blue-400";
    case "withdrawal":
      return "bg-amber-500/[0.06]0/15 text-amber-400";
    default:
      return "bg-gray-400/15 text-zinc-400";
  }
}

export default function ActivityPage() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const { language } = useLanguage();
  const t = texts[language] || texts.en;

  // תוויות סינון בשפה הנוכחית
  const filterOptions: { key: FilterKey; label: string }[] = [
    { key: "all", label: t.filterAll },
    { key: "buy", label: t.filterBuys },
    { key: "sell", label: t.filterSells },
    { key: "stake", label: t.filterStaking },
    { key: "deposit", label: t.filterDeposits },
    { key: "yield", label: t.filterYields },
  ];

  // תווית סוג פעולה בשפה הנוכחית
  function getTypeLabel(type: string) {
    switch (type) {
      case "buy":
        return t.typeBuy;
      case "sell":
        return t.typeSell;
      case "stake":
        return t.typeStake;
      case "unstake":
        return t.typeUnstake;
      case "yield":
        return t.typeYield;
      case "deposit":
        return t.typeDeposit;
      case "withdrawal":
        return t.typeWithdrawal;
      default:
        return type;
    }
  }

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
          {t.pageTitle}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t.pageSubtitle}
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
                ? "bg-blue-500/[0.12] text-foreground border border-blue-500/20"
                : "bg-white/[0.04] text-muted-foreground border border-amber-500/15 hover:bg-blue-500/[0.06] hover:text-foreground"
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
          className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md overflow-hidden"
        >
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-sm">
              {t.noActivity}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((a: ActivityItem) => (
                <motion.div
                  key={a.id}
                  variants={listItemVariants}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-blue-500/[0.03] transition-colors"
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
                        : "bg-amber-500/[0.06]0/15 text-amber-400"
                    }`}
                  >
                    {a.status === "completed" ? t.statusCompleted : t.statusPending}
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

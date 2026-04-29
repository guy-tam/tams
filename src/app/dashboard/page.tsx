"use client";

// דשבורד ראשי - סקירת תיק השקעות בסגנון Bloomberg מודרני עם תמיכה ב-5 שפות
// עיצוב פרימיום: כחול כהה + זהב מוסדי
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Percent,
  Wallet,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  ArrowRightLeft,
  Landmark,
  CircleDollarSign,
} from "lucide-react";

import {
  getPortfolioSummary,
  getHoldings,
  getWalletBalances,
  getRecentActivity,
  getPerformanceHistory,
} from "@/lib/portfolio";
import type { WalletBalance } from "@/lib/portfolio";
import { useLanguage } from "@/lib/i18n";

// מפת תרגומים לכל הטקסטים בעמוד
const texts = {
  en: {
    pageTitle: "Portfolio Overview",
    pageSubtitle: "Live snapshot · Investor view",
    totalValue: "Total Portfolio Value",
    monthlyReturn: "Monthly Return",
    allTimeReturn: "All-Time Return",
    weeklyReturn: "Weekly Return",
    perfChartTitle: "Portfolio Performance — 12 Months",
    perfChartSubtitle: "Portfolio value over time (₪)",
    allocationTitle: "Allocation by Wallet",
    allocationSubtitle: "Portfolio distribution across wallets",
    topHoldings: "Top Holdings",
    colTicker: "Ticker",
    colName: "Name",
    colValue: "Value",
    colAllocation: "Allocation",
    colPnl: "P&L",
    recentActivity: "Recent Activity",
    statusCompleted: "Completed",
    statusPending: "Pending",
    activityBuy: "Buy",
    activitySell: "Sell",
    activityStake: "Stake",
    activityUnstake: "Unstake",
    activityYield: "Yield",
    activityDeposit: "Deposit",
    activityWithdrawal: "Withdrawal",
  },
  he: {
    pageTitle: "סקירת תיק השקעות",
    pageSubtitle: "תצוגת זמן-אמת · פרספקטיבת משקיע",
    totalValue: "שווי תיק כולל",
    monthlyReturn: "תשואה חודשית",
    allTimeReturn: "תשואה כוללת",
    weeklyReturn: "תשואה שבועית",
    perfChartTitle: "ביצועי תיק — 12 חודשים",
    perfChartSubtitle: "שווי תיק לאורך זמן (₪)",
    allocationTitle: "הקצאה לפי ארנק",
    allocationSubtitle: "חלוקת תיק בין ארנקים",
    topHoldings: "אחזקות מובילות",
    colTicker: "טיקר",
    colName: "שם",
    colValue: "שווי",
    colAllocation: "הקצאה",
    colPnl: "רווח/הפסד",
    recentActivity: "פעילות אחרונה",
    statusCompleted: "הושלם",
    statusPending: "ממתין",
    activityBuy: "קנייה",
    activitySell: "מכירה",
    activityStake: "נעילה",
    activityUnstake: "שחרור נעילה",
    activityYield: "תשואה",
    activityDeposit: "הפקדה",
    activityWithdrawal: "משיכה",
  },
  ar: {
    pageTitle: "نظرة عامة على المحفظة",
    pageSubtitle: "لقطة فورية · عرض المستثمر",
    totalValue: "القيمة الإجمالية للمحفظة",
    monthlyReturn: "العائد الشهري",
    allTimeReturn: "العائد الإجمالي",
    weeklyReturn: "العائد الأسبوعي",
    perfChartTitle: "أداء المحفظة — 12 شهراً",
    perfChartSubtitle: "قيمة المحفظة عبر الزمن (₪)",
    allocationTitle: "التوزيع حسب المحفظة",
    allocationSubtitle: "توزيع المحفظة بين المحافظ",
    topHoldings: "أكبر الحيازات",
    colTicker: "الرمز",
    colName: "الاسم",
    colValue: "القيمة",
    colAllocation: "التوزيع",
    colPnl: "الربح/الخسارة",
    recentActivity: "النشاط الأخير",
    statusCompleted: "مكتمل",
    statusPending: "قيد الانتظار",
    activityBuy: "شراء",
    activitySell: "بيع",
    activityStake: "تخزين",
    activityUnstake: "إلغاء التخزين",
    activityYield: "عائد",
    activityDeposit: "إيداع",
    activityWithdrawal: "سحب",
  },
  ru: {
    pageTitle: "Обзор портфеля",
    pageSubtitle: "Снимок в реальном времени · вид инвестора",
    totalValue: "Общая стоимость портфеля",
    monthlyReturn: "Месячная доходность",
    allTimeReturn: "Совокупная доходность",
    weeklyReturn: "Недельная доходность",
    perfChartTitle: "Динамика портфеля — 12 месяцев",
    perfChartSubtitle: "Стоимость портфеля за период (₪)",
    allocationTitle: "Распределение по кошелькам",
    allocationSubtitle: "Доли портфеля между кошельками",
    topHoldings: "Крупнейшие позиции",
    colTicker: "Тикер",
    colName: "Название",
    colValue: "Стоимость",
    colAllocation: "Доля",
    colPnl: "Прибыль/убыток",
    recentActivity: "Последняя активность",
    statusCompleted: "Выполнено",
    statusPending: "В ожидании",
    activityBuy: "Покупка",
    activitySell: "Продажа",
    activityStake: "Стейкинг",
    activityUnstake: "Снятие стейкинга",
    activityYield: "Доходность",
    activityDeposit: "Пополнение",
    activityWithdrawal: "Вывод",
  },
  es: {
    pageTitle: "Resumen del portafolio",
    pageSubtitle: "Vista en tiempo real · perspectiva del inversor",
    totalValue: "Valor total del portafolio",
    monthlyReturn: "Rendimiento mensual",
    allTimeReturn: "Rendimiento acumulado",
    weeklyReturn: "Rendimiento semanal",
    perfChartTitle: "Rendimiento del portafolio — 12 meses",
    perfChartSubtitle: "Valor del portafolio en el tiempo (₪)",
    allocationTitle: "Asignación por billetera",
    allocationSubtitle: "Distribución del portafolio entre billeteras",
    topHoldings: "Principales posiciones",
    colTicker: "Ticker",
    colName: "Nombre",
    colValue: "Valor",
    colAllocation: "Asignación",
    colPnl: "Ganancia/Pérdida",
    recentActivity: "Actividad reciente",
    statusCompleted: "Completado",
    statusPending: "Pendiente",
    activityBuy: "Compra",
    activitySell: "Venta",
    activityStake: "Staking",
    activityUnstake: "Retiro de staking",
    activityYield: "Rendimiento",
    activityDeposit: "Depósito",
    activityWithdrawal: "Retiro",
  },
} as const;

// אנימציות כניסה מדורגות
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// פורמט מספרים בשקלים
function formatILS(value: number) {
  return value.toLocaleString("he-IL");
}

// כרטיס סטטיסטיקה - עיצוב פרימיום כחול כהה + זהב
function StatCard({
  label,
  value,
  change,
  icon: Icon,
  color,
  isGold,
}: {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
  isGold?: boolean;
}) {
  const isPositive = change >= 0;
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] } }}
      className={`rounded-2xl backdrop-blur-xl p-5 relative overflow-hidden group transition-all duration-500 ${
        isGold
          ? "border border-amber-500/30 bg-gradient-to-br from-[#0f1d35]/80 to-[#1a2744]/85 shadow-lg shadow-amber-900/15 hover:border-amber-500/50 hover:shadow-[0_8px_32px_rgba(212,168,83,0.12)]"
          : "border border-blue-500/15 bg-gradient-to-br from-[#0c1829]/75 to-[#111f36]/80 hover:border-blue-400/25 hover:shadow-[0_8px_32px_rgba(59,130,246,0.08)]"
      }`}
    >
      {/* קו זהוב עליון — כמו מסגרת גלריה */}
      <div
        className="absolute top-0 left-2 right-2 h-px transition-opacity duration-500 group-hover:opacity-100"
        style={{
          opacity: isGold ? 0.6 : 0,
          background: isGold
            ? "linear-gradient(90deg, transparent, rgba(212,168,83,0.6), transparent)"
            : `linear-gradient(90deg, transparent, ${color}50, transparent)`,
        }}
      />
      <div className="flex items-start justify-between mb-3">
        <div
          className="inline-flex items-center justify-center size-10 rounded-xl"
          style={{ background: isGold ? "rgba(212,168,83,0.12)" : `${color}15` }}
        >
          <Icon className="size-5" style={{ color: isGold ? "#d4a853" : color }} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? "text-emerald-400/90" : "text-rose-400/90"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="size-3.5" />
          ) : (
            <ArrowDownRight className="size-3.5" />
          )}
          {isPositive ? "+" : ""}
          {change}%
        </div>
      </div>
      <div
        className="text-2xl font-bold mb-1"
        style={{ color: isGold ? "#d4a853" : color }}
      >
        {value}
      </div>
      <div className="text-xs text-slate-400">{label}</div>
    </motion.div>
  );
}

// טולטיפ לגרף ביצועים
function PerformanceTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-blue-500/20 bg-[#0c1829]/95 backdrop-blur-md px-3 py-2 shadow-xl shadow-blue-900/20">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="text-sm font-bold text-white">
        ₪{formatILS(payload[0].value)}
      </div>
    </div>
  );
}

// טולטיפ לגרף הקצאה
function AllocationTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: WalletBalance }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-blue-500/20 bg-[#0c1829]/95 backdrop-blur-md px-3 py-2 shadow-xl shadow-blue-900/20">
      <div className="flex items-center gap-2">
        <div
          className="size-2.5 rounded-full"
          style={{ background: data.color }}
        />
        <span className="text-sm font-medium text-white">{data.name}</span>
      </div>
      <div className="text-lg font-bold text-white mt-0.5">
        {data.allocation}%
      </div>
      <div className="text-xs text-slate-400">
        ₪{formatILS(data.valueILS)}
      </div>
    </div>
  );
}

// אייקון לפי סוג פעולה - צבעים מעודנים
function getActivityIcon(type: string) {
  switch (type) {
    case "buy":
      return <ShoppingCart className="size-4 text-emerald-400/90" />;
    case "sell":
      return <ArrowRightLeft className="size-4 text-rose-400/90" />;
    case "stake":
    case "unstake":
    case "yield":
      return <Percent className="size-4 text-blue-400" />;
    case "deposit":
      return <Landmark className="size-4 text-blue-300" />;
    case "withdrawal":
      return <CircleDollarSign className="size-4 text-amber-400/90" />;
    default:
      return <Wallet className="size-4 text-slate-400" />;
  }
}

// צבע לפי סוג פעולה - כחול במקום ציאן
function getActivityBg(type: string) {
  switch (type) {
    case "buy":
      return "bg-emerald-400/10";
    case "sell":
      return "bg-rose-400/10";
    case "stake":
    case "unstake":
    case "yield":
      return "bg-blue-400/10";
    case "deposit":
      return "bg-blue-300/10";
    case "withdrawal":
      return "bg-amber-400/10";
    default:
      return "bg-slate-400/10";
  }
}

// תרגום שם סוג הפעולה
function getActivityLabel(type: string, t: (typeof texts)["en"]) {
  switch (type) {
    case "buy": return t.activityBuy;
    case "sell": return t.activitySell;
    case "stake": return t.activityStake;
    case "unstake": return t.activityUnstake;
    case "yield": return t.activityYield;
    case "deposit": return t.activityDeposit;
    case "withdrawal": return t.activityWithdrawal;
    default: return type;
  }
}

export default function DashboardPage() {
  const { language } = useLanguage();
  const t = texts[language] || texts.en;

  // שליפת כל הנתונים דרך שכבת ה-repository
  const portfolioSummary = getPortfolioSummary();
  const holdings = getHoldings();
  const walletBalances = getWalletBalances();
  const recentActivity = getRecentActivity();
  const performanceHistory = getPerformanceHistory();

  const topHoldings = [...holdings]
    .sort((a, b) => b.valueILS - a.valueILS)
    .slice(0, 5);
  const latestActivity = recentActivity.slice(0, 5);

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6 relative">
      {/* כותרת + AUM banner — תצוגת קרן מוסדית */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="surface-tier-1 p-6 md:p-8 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.32em] uppercase text-amber-300/70 font-semibold mb-2">
              TAMS Capital · Net Asset Value
            </p>
            <h1 className="heading-editorial text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05] tabular-nums">
              ₪{formatILS(portfolioSummary.totalValue)}
            </h1>
            <p className="text-xs text-zinc-400/85 mt-2.5 font-light tracking-[0.04em]">
              {t.pageSubtitle} · {new Date().toLocaleDateString("he-IL", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          </div>
          {/* Period selector — placeholder אסתטי */}
          <div className="flex items-center gap-1.5 surface-tier-3 p-1 rounded-full self-start md:self-end">
            {["MTD", "QTD", "YTD", "ITD"].map((p, i) => (
              <button
                key={p}
                type="button"
                className={`text-[10px] tracking-[0.22em] uppercase px-3.5 py-1.5 rounded-full transition-colors ${
                  i === 2
                    ? "bg-amber-500/15 text-amber-200 border border-amber-400/30"
                    : "text-zinc-500 hover:text-amber-300/70"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <span className="monogram-watermark" aria-hidden="true">T</span>
      </motion.div>

      {/* שורה עליונה - 4 כרטיסי סטטיסטיקה */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label={t.totalValue}
          value={`₪${formatILS(portfolioSummary.totalValue)}`}
          change={portfolioSummary.dailyChange}
          icon={Wallet}
          color="#d4a853"
          isGold
        />
        <StatCard
          label={t.monthlyReturn}
          value={`+${portfolioSummary.monthlyChange}%`}
          change={portfolioSummary.monthlyChange}
          icon={TrendingUp}
          color="#5a8fd8"
        />
        <StatCard
          label={t.allTimeReturn}
          value={`+${portfolioSummary.allTimeReturn}%`}
          change={portfolioSummary.allTimeReturn}
          icon={BarChart3}
          color="#d4a853"
        />
        <StatCard
          label={t.weeklyReturn}
          value={`+${portfolioSummary.weeklyChange}%`}
          change={portfolioSummary.weeklyChange}
          icon={Percent}
          color="#5a8fd8"
        />
      </motion.div>

      {/* שורה אמצעית - גרפים */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* גרף ביצועים */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 surface-tier-2 p-6 hover:border-amber-500/35 transition-colors duration-500 relative"
        >
          <h3 className="text-base font-semibold text-white mb-1">
            {t.perfChartTitle}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {t.perfChartSubtitle}
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceHistory}>
                <defs>
                  <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4a853" stopOpacity={0.3} />
                    <stop offset="50%" stopColor="#d4a853" stopOpacity={0.08} />
                    <stop offset="100%" stopColor="#d4a853" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  width={50}
                />
                <Tooltip content={<PerformanceTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#d4a853"
                  strokeWidth={2}
                  fill="url(#perfGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* גרף הקצאה */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="surface-tier-2 p-6 hover:border-amber-500/35 transition-colors duration-500 relative"
        >
          <h3 className="text-base font-semibold text-white mb-1">
            {t.allocationTitle}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {t.allocationSubtitle}
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={walletBalances}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={3}
                  dataKey="valueILS"
                  stroke="none"
                >
                  {walletBalances.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      fillOpacity={0.85}
                    />
                  ))}
                </Pie>
                <Tooltip content={<AllocationTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* לגנדה */}
          <div className="space-y-2 mt-3">
            {walletBalances.map((w) => (
              <div key={w.name} className="flex items-center gap-2">
                <div
                  className="size-2.5 rounded-full flex-shrink-0"
                  style={{ background: w.color }}
                />
                <span className="text-xs text-slate-400 flex-1 truncate">
                  {w.name}
                </span>
                <span
                  className="text-xs font-bold"
                  style={{ color: w.color }}
                >
                  {w.allocation}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* שורה תחתונה - טבלה ופעילות */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* טבלת אחזקות מובילות */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="surface-tier-2 p-6 hover:border-amber-500/35 transition-colors duration-500 relative"
        >
          <h3 className="text-base font-semibold text-white mb-4">
            {t.topHoldings}
          </h3>
          <div className="space-y-3">
            {/* כותרות - עיצוב פרימיום */}
            <div className="grid grid-cols-5 text-xs text-slate-500 uppercase tracking-wider pb-2 border-b border-blue-500/10 font-medium">
              <span>{t.colTicker}</span>
              <span>{t.colName}</span>
              <span className="text-left">{t.colValue}</span>
              <span className="text-left">{t.colAllocation}</span>
              <span className="text-left">{t.colPnl}</span>
            </div>
            {topHoldings.map((h) => (
              <div
                key={h.ticker}
                className="grid grid-cols-5 items-center text-sm py-2 border-b border-blue-900/20 last:border-0 hover:bg-blue-500/5 transition-colors rounded-lg"
              >
                <span className="font-mono font-bold text-white">
                  {h.ticker}
                </span>
                <span className="text-slate-400 text-xs truncate">
                  {h.name}
                </span>
                <span className="text-slate-200 text-xs text-left">
                  ₪{formatILS(h.valueILS)}
                </span>
                <span className="text-slate-400 text-xs text-left">
                  {h.allocation}%
                </span>
                <span
                  className={`text-xs font-medium text-left ${
                    h.pnl >= 0 ? "text-emerald-400/90" : "text-rose-400/90"
                  }`}
                >
                  {h.pnl >= 0 ? "+" : ""}
                  {h.pnl}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* פעילות אחרונה */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="surface-tier-2 p-6 hover:border-amber-500/35 transition-colors duration-500 relative"
        >
          <h3 className="text-base font-semibold text-white mb-4">
            {t.recentActivity}
          </h3>
          <div className="space-y-3">
            {latestActivity.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 py-2 border-b border-blue-900/20 last:border-0 hover:bg-blue-500/5 transition-colors rounded-lg"
              >
                <div
                  className={`size-8 rounded-lg flex items-center justify-center ${getActivityBg(
                    a.type
                  )}`}
                >
                  {getActivityIcon(a.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">
                    {a.asset}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {a.amount}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-400">{a.date}</div>
                  <div className={`text-[10px] font-medium ${a.status === "completed" ? "text-emerald-400/90" : "text-amber-400/90"}`}>
                    {a.status === "completed" ? t.statusCompleted : t.statusPending}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

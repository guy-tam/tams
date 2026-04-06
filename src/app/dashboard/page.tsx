"use client";

// דשבורד ראשי - סקירת תיק השקעות בסגנון Bloomberg מודרני
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
  portfolioSummary,
  holdings,
  walletBalances,
  recentActivity,
  performanceHistory,
} from "@/data/dashboard-mock";

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

// כרטיס סטטיסטיקה
function StatCard({
  label,
  value,
  change,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}) {
  const isPositive = change >= 0;
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5 relative overflow-hidden group"
    >
      {/* גלאו עליון */}
      <div
        className="absolute -top-px -left-px -right-px h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        }}
      />
      <div className="flex items-start justify-between mb-3">
        <div
          className="inline-flex items-center justify-center size-10 rounded-xl"
          style={{ background: `${color}15` }}
        >
          <Icon className="size-5" style={{ color }} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            isPositive ? "text-emerald-400" : "text-red-400"
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
      <div className="text-2xl font-bold text-foreground mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
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
    <div className="rounded-lg border border-white/[0.08] bg-card/95 backdrop-blur-md px-3 py-2 shadow-xl">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-bold text-foreground">
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
  payload?: Array<{ payload: (typeof walletBalances)[0] }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/[0.08] bg-card/95 backdrop-blur-md px-3 py-2 shadow-xl">
      <div className="flex items-center gap-2">
        <div
          className="size-2.5 rounded-full"
          style={{ background: data.color }}
        />
        <span className="text-sm font-medium text-foreground">{data.name}</span>
      </div>
      <div className="text-lg font-bold text-foreground mt-0.5">
        {data.allocation}%
      </div>
      <div className="text-xs text-muted-foreground">
        ₪{formatILS(data.valueILS)}
      </div>
    </div>
  );
}

// אייקון לפי סוג פעולה
function getActivityIcon(type: string) {
  switch (type) {
    case "buy":
      return <ShoppingCart className="size-4 text-emerald-400" />;
    case "sell":
      return <ArrowRightLeft className="size-4 text-red-400" />;
    case "stake":
    case "unstake":
    case "yield":
      return <Percent className="size-4 text-cyan-400" />;
    case "deposit":
      return <Landmark className="size-4 text-blue-400" />;
    case "withdrawal":
      return <CircleDollarSign className="size-4 text-amber-400" />;
    default:
      return <Wallet className="size-4 text-zinc-400" />;
  }
}

// צבע לפי סוג פעולה
function getActivityBg(type: string) {
  switch (type) {
    case "buy":
      return "bg-emerald-400/10";
    case "sell":
      return "bg-red-400/10";
    case "stake":
    case "unstake":
    case "yield":
      return "bg-cyan-400/10";
    case "deposit":
      return "bg-blue-400/10";
    case "withdrawal":
      return "bg-amber-400/10";
    default:
      return "bg-zinc-400/10";
  }
}

export default function DashboardPage() {
  const topHoldings = [...holdings]
    .sort((a, b) => b.valueILS - a.valueILS)
    .slice(0, 5);
  const latestActivity = recentActivity.slice(0, 5);

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6">
      {/* כותרת */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          סקירת תיק השקעות
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          נתונים מעודכנים — קונספט בלבד
        </p>
      </motion.div>

      {/* שורה עליונה - 4 כרטיסי סטטיסטיקה */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="שווי תיק כולל"
          value={`₪${formatILS(portfolioSummary.totalValue)}`}
          change={portfolioSummary.dailyChange}
          icon={Wallet}
          color="#3b82f6"
        />
        <StatCard
          label="תשואה חודשית"
          value={`+${portfolioSummary.monthlyChange}%`}
          change={portfolioSummary.monthlyChange}
          icon={TrendingUp}
          color="#10b981"
        />
        <StatCard
          label="תשואה כוללת"
          value={`+${portfolioSummary.allTimeReturn}%`}
          change={portfolioSummary.allTimeReturn}
          icon={BarChart3}
          color="#8b5cf6"
        />
        <StatCard
          label="תשואה שבועית"
          value={`+${portfolioSummary.weeklyChange}%`}
          change={portfolioSummary.weeklyChange}
          icon={Percent}
          color="#06b6d4"
        />
      </motion.div>

      {/* שורה אמצעית - גרפים */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* גרף ביצועים */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6"
        >
          <h3 className="text-base font-semibold text-foreground mb-1">
            ביצועי תיק — 12 חודשים
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            שווי תיק לאורך זמן (₪)
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceHistory}>
                <defs>
                  <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                  width={50}
                />
                <Tooltip content={<PerformanceTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
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
          className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6"
        >
          <h3 className="text-base font-semibold text-foreground mb-1">
            הקצאה לפי ארנק
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            חלוקת תיק בין ארנקים
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
                      fillOpacity={0.8}
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
                <span className="text-xs text-muted-foreground flex-1 truncate">
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
          className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6"
        >
          <h3 className="text-base font-semibold text-foreground mb-4">
            אחזקות מובילות
          </h3>
          <div className="space-y-3">
            {/* כותרות */}
            <div className="grid grid-cols-5 text-xs text-muted-foreground pb-2 border-b border-white/[0.06]">
              <span>טיקר</span>
              <span>שם</span>
              <span className="text-left">שווי</span>
              <span className="text-left">הקצאה</span>
              <span className="text-left">רווח/הפסד</span>
            </div>
            {topHoldings.map((h) => (
              <div
                key={h.ticker}
                className="grid grid-cols-5 items-center text-sm py-2 border-b border-white/[0.03] last:border-0"
              >
                <span className="font-mono font-bold text-foreground">
                  {h.ticker}
                </span>
                <span className="text-muted-foreground text-xs truncate">
                  {h.name}
                </span>
                <span className="text-foreground text-xs text-left">
                  ₪{formatILS(h.valueILS)}
                </span>
                <span className="text-muted-foreground text-xs text-left">
                  {h.allocation}%
                </span>
                <span
                  className={`text-xs font-medium text-left ${
                    h.pnl >= 0 ? "text-emerald-400" : "text-red-400"
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
          className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6"
        >
          <h3 className="text-base font-semibold text-foreground mb-4">
            פעילות אחרונה
          </h3>
          <div className="space-y-3">
            {latestActivity.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 py-2 border-b border-white/[0.03] last:border-0"
              >
                <div
                  className={`size-8 rounded-lg flex items-center justify-center ${getActivityBg(
                    a.type
                  )}`}
                >
                  {getActivityIcon(a.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {a.asset}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {a.amount}
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">{a.date}</div>
                  <div className={`text-[10px] font-medium ${a.status === "completed" ? "text-emerald-400" : "text-amber-400"}`}>
                    {a.status === "completed" ? "הושלם" : "ממתין"}
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

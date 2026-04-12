"use client";

// עמוד ביצועים - גרפים וניתוח תשואות
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Calendar, Clock, BarChart3 } from "lucide-react";
import {
  getPortfolioSummary,
  getPerformanceHistory,
} from "@/lib/portfolio";

// פורמט שקלים
function formatILS(value: number) {
  return value.toLocaleString("he-IL");
}

// אנימציות
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
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

// טולטיפ מותאם לגרף
function ChartTooltip({
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
    <div className="rounded-lg border border-amber-500/15 bg-card/95 backdrop-blur-md px-4 py-3 shadow-xl">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-base font-bold text-foreground">
        ₪{formatILS(payload[0].value)}
      </div>
    </div>
  );
}

// נתוני ביצועי ארנקים
const walletPerformance = [
  { name: "Long-Term Holdings", contribution: 5.2, color: "#3b82f6" },
  { name: "Active Trading", contribution: 3.8, color: "#8b5cf6" },
  { name: "DeFi Yield", contribution: 2.4, color: "#d4a853" },
  { name: "Operations", contribution: 0.9, color: "#10b981" },
];

// כרטיס סטטיסטיקה
function PerfStatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-5 group relative overflow-hidden"
    >
      <div
        className="absolute -top-px -left-px -right-px h-px opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        }}
      />
      <div
        className="inline-flex items-center justify-center size-10 rounded-xl mb-3"
        style={{ background: `${color}15` }}
      >
        <Icon className="size-5" style={{ color }} />
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export default function PerformancePage() {
  // שליפת הנתונים דרך שכבת ה-repository
  const portfolioSummary = getPortfolioSummary();
  const performanceHistory = getPerformanceHistory();

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6">
      {/* כותרת */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          ביצועים
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          ניתוח תשואות ומגמות — קונספט בלבד
        </p>
      </motion.div>

      {/* גרף ביצועים ראשי */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6"
      >
        <h3 className="text-base font-semibold text-foreground mb-1">
          ביצועי תיק — 12 חודשים
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          שווי תיק לאורך זמן (₪)
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceHistory}>
              <defs>
                <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
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
                width={55}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#perfGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* כרטיסי סטטיסטיקה */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <PerfStatCard
          label="תשואה יומית"
          value={`+${portfolioSummary.dailyChange}%`}
          icon={Clock}
          color="#3b82f6"
        />
        <PerfStatCard
          label="תשואה שבועית"
          value={`+${portfolioSummary.weeklyChange}%`}
          icon={Calendar}
          color="#d4a853"
        />
        <PerfStatCard
          label="תשואה חודשית"
          value={`+${portfolioSummary.monthlyChange}%`}
          icon={TrendingUp}
          color="#10b981"
        />
        <PerfStatCard
          label="תשואה כוללת"
          value={`+${portfolioSummary.allTimeReturn}%`}
          icon={BarChart3}
          color="#d4a853"
        />
      </motion.div>

      {/* ביצועי ארנקים */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6"
      >
        <h3 className="text-base font-semibold text-foreground mb-1">
          תרומת ארנקים לביצועים
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          אחוז תרומה לתשואה הכוללת
        </p>
        <div className="space-y-5">
          {walletPerformance.map((w, i) => {
            const maxContribution = Math.max(
              ...walletPerformance.map((wp) => wp.contribution)
            );
            const widthPct = (w.contribution / maxContribution) * 100;
            return (
              <motion.div
                key={w.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-2.5 rounded-full"
                      style={{ background: w.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {w.name}
                    </span>
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: w.color }}
                  >
                    +{w.contribution}%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{
                      delay: 0.6 + i * 0.1,
                      duration: 0.8,
                      ease: "easeOut" as const,
                    }}
                    className="h-full rounded-full"
                    style={{ background: w.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

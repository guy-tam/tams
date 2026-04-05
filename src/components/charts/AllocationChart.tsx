"use client";

// גרף הקצאת פורטפוליו - דונאט עם חלוקה לפי ארנקים
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// נתוני הקצאה
const allocationData = [
  { name: "Long-Term Holdings", value: 40, color: "#3b82f6" },
  { name: "Active Trading", value: 25, color: "#8b5cf6" },
  { name: "DeFi Yield", value: 25, color: "#06b6d4" },
  { name: "Operations", value: 10, color: "#10b981" },
];

// טולטיפ מותאם
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: (typeof allocationData)[0] }>;
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
        <span className="text-sm font-medium text-foreground">
          {data.name}
        </span>
      </div>
      <div className="text-lg font-bold text-foreground mt-0.5">
        {data.value}%
      </div>
    </div>
  );
}

// רנדור לגנדה מותאמת
function CustomLegend({
  payload,
}: {
  payload?: Array<{ value: string; color: string }>;
}) {
  if (!payload) return null;
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="size-2.5 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-xs text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function AllocationChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6"
    >
      <h3 className="text-base font-semibold text-foreground mb-2 text-center">
        Conceptual Portfolio Allocation
      </h3>
      <p className="text-xs text-muted-foreground text-center mb-4">
        Target allocation across four wallet divisions
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="45%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {allocationData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  fillOpacity={0.8}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* תת-נתונים */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {allocationData.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2"
          >
            <div
              className="size-2 rounded-full flex-shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-xs text-muted-foreground truncate">
              {item.name}
            </span>
            <span
              className="text-xs font-bold ml-auto"
              style={{ color: item.color }}
            >
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

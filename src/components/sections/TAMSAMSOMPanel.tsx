"use client";

// פאנל TAM/SAM/SOM - הדמיה חזותית של גודל שוק
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// נתוני שוק
const marketData = [
  {
    name: "TAM",
    label: "Total Addressable Market",
    value: 2500,
    range: "$2-3T",
    color: "#3b82f6",
    assumptions:
      "Total global crypto market capitalization including all digital assets, DeFi TVL, and institutional crypto holdings.",
  },
  {
    name: "SAM",
    label: "Serviceable Addressable Market",
    value: 400,
    range: "$300-500B",
    color: "#8b5cf6",
    assumptions:
      "Crypto investment vehicles, managed crypto funds, and DeFi yield strategies accessible to institutional-grade operations.",
  },
  {
    name: "SOM",
    label: "Serviceable Obtainable Market",
    value: 50,
    range: "$25-75M",
    color: "#06b6d4",
    assumptions:
      "Realistic initial market capture through direct investor relationships, targeting crypto-native HNW individuals and small institutional allocators.",
  },
];

// טולטיפ מותאם
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: (typeof marketData)[0] }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/[0.08] bg-card/95 backdrop-blur-md p-4 shadow-xl max-w-xs">
      <div className="text-sm font-semibold text-foreground mb-1">
        {data.name}: {data.range}
      </div>
      <div className="text-xs text-muted-foreground">{data.label}</div>
    </div>
  );
}

export default function TAMSAMSOMPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* גרף */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={marketData}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <XAxis
                  type="number"
                  hide
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a1a1aa", fontSize: 14, fontWeight: 600 }}
                  width={50}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar
                  dataKey="value"
                  radius={[0, 8, 8, 0]}
                  barSize={40}
                >
                  {marketData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      fillOpacity={0.7}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* כרטיסי מידע */}
        <div className="space-y-4">
          {marketData.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="size-3 rounded-full"
                  style={{ background: item.color }}
                />
                <span
                  className="text-base font-bold"
                  style={{ color: item.color }}
                >
                  {item.name}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {item.range}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mb-1">
                {item.label}
              </div>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                {item.assumptions}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

// מפת ארכיטקטורת ארנקים - תצוגה היררכית של מבנה החברה
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Coins,
  Settings,
  Landmark,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

// סוגי צמתים בעץ
interface WalletNode {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  children?: { label: string; detail?: string }[];
}

// נתוני המבנה ההיררכי
const wallets: WalletNode[] = [
  {
    id: "longterm",
    label: "Long-Term Holdings",
    icon: Shield,
    color: "#3b82f6",
    children: [
      { label: "Bitcoin Core", detail: "BTC DCA Strategy" },
      { label: "Ethereum Stake", detail: "ETH Staking" },
      { label: "Blue-Chip Alts", detail: "SOL, LINK" },
    ],
  },
  {
    id: "trading",
    label: "Active Trading",
    icon: TrendingUp,
    color: "#8b5cf6",
    children: [
      { label: "Swing Positions", detail: "Multi-day trades" },
      { label: "Momentum Plays", detail: "Trend following" },
      { label: "Hedging", detail: "Risk management" },
    ],
  },
  {
    id: "defi",
    label: "DeFi Yield",
    icon: Coins,
    color: "#06b6d4",
    children: [
      { label: "Lending", detail: "Aave, Compound" },
      { label: "Liquidity Pools", detail: "Uniswap, Curve" },
      { label: "Staking", detail: "Native & Liquid" },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    color: "#10b981",
    children: [
      { label: "Gas Reserves", detail: "Multi-chain gas" },
      { label: "Fee Buffer", detail: "Trading fees" },
      { label: "Emergency Fund", detail: "Safety margin" },
    ],
  },
];

// אנימציות
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function WalletArchitectureMap() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* צומת מאסטר - ראש ההיררכיה */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mb-8"
      >
        <div className="relative inline-flex items-center gap-4 rounded-2xl border border-tams-amber/20 bg-gradient-to-r from-tams-amber/5 to-tams-amber/[0.02] backdrop-blur-md px-8 py-5">
          <div className="size-12 rounded-xl bg-gradient-to-br from-tams-amber to-amber-600 flex items-center justify-center shadow-lg shadow-tams-amber/20">
            <Landmark className="size-6 text-white" />
          </div>
          <div>
            <div className="text-base font-semibold text-foreground">
              TAMS Master Wallet
            </div>
            <div className="text-sm text-muted-foreground">
              Centralized Allocation Controller
            </div>
          </div>
        </div>
      </motion.div>

      {/* קווי חיבור מהמאסטר לארנקים */}
      <div className="relative mb-8">
        <svg
          viewBox="0 0 1000 60"
          className="w-full h-12"
          preserveAspectRatio="xMidYMid meet"
        >
          {wallets.map((wallet, i) => {
            const x = 125 + i * 250;
            return (
              <motion.line
                key={wallet.id}
                x1="500"
                y1="0"
                x2={x}
                y2="60"
                stroke={wallet.color}
                strokeWidth="1"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              />
            );
          })}
        </svg>
      </div>

      {/* רשת ארנקים עם תת-פריטים */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {wallets.map((wallet, i) => {
          const Icon = wallet.icon;
          return (
            <motion.div
              key={wallet.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md overflow-hidden"
            >
              {/* פס צבעוני עליון */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${wallet.color}80, ${wallet.color}20)`,
                }}
              />

              {/* כותרת הארנק */}
              <div className="p-5 pb-3">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="size-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${wallet.color}15` }}
                  >
                    <Icon
                      className="size-5"
                      style={{ color: wallet.color }}
                    />
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {wallet.label}
                  </div>
                </div>

                {/* תת-פריטים */}
                <div className="space-y-2.5">
                  {wallet.children?.map((child, j) => (
                    <motion.div
                      key={j}
                      custom={i * 3 + j + 4}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex items-center gap-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2"
                    >
                      <div
                        className="size-1.5 rounded-full flex-shrink-0"
                        style={{ background: wallet.color }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">
                          {child.label}
                        </div>
                        {child.detail && (
                          <div className="text-[10px] text-muted-foreground truncate">
                            {child.detail}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

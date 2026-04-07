"use client";

// דיאגרמת זרימת הון - הדמיה חזותית של כניסת כסף וחלוקה לארנקים
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Shield, Coins, Settings } from "lucide-react";

// נתוני חטיבות הארנקים
const divisions = [
  {
    id: "longterm",
    label: "Long-Term Holdings",
    allocation: "40%",
    icon: Shield,
    color: "#3b82f6",
    description: "BTC, ETH, SOL",
  },
  {
    id: "trading",
    label: "Active Trading",
    allocation: "25%",
    icon: TrendingUp,
    color: "#8b5cf6",
    description: "Swing & Momentum",
  },
  {
    id: "defi",
    label: "DeFi Yield",
    allocation: "25%",
    icon: Coins,
    color: "#3b82f6",
    description: "Lending, LP, Staking",
  },
  {
    id: "operations",
    label: "Operations",
    allocation: "10%",
    icon: Settings,
    color: "#10b981",
    description: "Gas, Fees, Buffer",
  },
];

// אנימציות כניסה סדרתיות
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function CapitalFlowDiagram() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative max-w-4xl mx-auto"
    >
      {/* שלב 1 - כניסת הון מהמשקיע */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <div className="relative inline-flex items-center gap-3 rounded-2xl border border-tams-amber/30 bg-tams-amber/5 backdrop-blur-md px-8 py-4">
          <Wallet className="size-6 text-tams-amber" />
          <div>
            <div className="text-sm text-tams-amber font-medium">
              Investor Capital
            </div>
            <div className="text-xs text-muted-foreground">
              Initial Deployment
            </div>
          </div>
        </div>
      </motion.div>

      {/* קו זרימה אנכי - מהמשקיע לחברה */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mb-6"
      >
        <div className="relative h-16 w-px">
          <motion.div
            className="absolute inset-0 w-px bg-gradient-to-b from-tams-amber/60 to-tams-blue/60"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />
          {/* טיפה זורמת */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 size-2 rounded-full bg-tams-amber"
            animate={{ y: [0, 56, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* שלב 2 - החברה (TAMS) */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <div className="relative inline-flex items-center gap-3 rounded-2xl border border-tams-blue/30 bg-tams-blue/5 backdrop-blur-md px-8 py-4">
          <div className="size-10 rounded-xl bg-gradient-to-br from-tams-blue to-tams-purple flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div>
            <div className="text-sm text-foreground font-semibold">
              TAMS Master Wallet
            </div>
            <div className="text-xs text-muted-foreground">
              Capital Allocation Engine
            </div>
          </div>
        </div>
      </motion.div>

      {/* קווי חלוקה - SVG */}
      <motion.div variants={itemVariants} className="relative mb-6">
        <svg
          viewBox="0 0 800 80"
          className="w-full h-20"
          preserveAspectRatio="xMidYMid meet"
        >
          {divisions.map((div, i) => {
            // חישוב מיקום X לכל חטיבה
            const x = 100 + i * 200;
            return (
              <motion.path
                key={div.id}
                d={`M 400 0 Q 400 40, ${x} 80`}
                fill="none"
                stroke={div.color}
                strokeWidth="1.5"
                strokeOpacity="0.4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* שלב 3 - 4 ארנקים */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {divisions.map((div) => {
          const Icon = div.icon;
          return (
            <motion.div
              key={div.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative rounded-2xl border border-amber-200/40 bg-white backdrop-blur-md p-5 text-center transition-colors hover:border-amber-400/40"
            >
              {/* פס צבעוני עליון */}
              <div
                className="absolute top-0 left-4 right-4 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${div.color}60, transparent)`,
                }}
              />

              {/* אייקון */}
              <div
                className="mx-auto mb-3 inline-flex items-center justify-center size-10 rounded-xl"
                style={{ background: `${div.color}15` }}
              >
                <Icon className="size-5" style={{ color: div.color }} />
              </div>

              {/* אחוז הקצאה */}
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: div.color }}
              >
                {div.allocation}
              </div>

              {/* שם */}
              <div className="text-sm font-medium text-foreground mb-1">
                {div.label}
              </div>

              {/* תיאור */}
              <div className="text-xs text-muted-foreground">
                {div.description}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

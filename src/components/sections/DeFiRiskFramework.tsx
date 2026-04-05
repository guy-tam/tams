"use client";

// מסגרת סיכוני DeFi - מערכת הערכת סיכונים חזותית
import { motion } from "framer-motion";
import { Code2, Users, Droplets, Scale } from "lucide-react";
import { type LucideIcon } from "lucide-react";

// רמות סיכון
type RiskLevel = "low" | "medium" | "high" | "critical";

const riskLevelConfig: Record<
  RiskLevel,
  { label: string; color: string; bars: number }
> = {
  low: { label: "Low", color: "#10b981", bars: 1 },
  medium: { label: "Medium", color: "#f59e0b", bars: 2 },
  high: { label: "High", color: "#f97316", bars: 3 },
  critical: { label: "Critical", color: "#ef4444", bars: 4 },
};

interface RiskCategory {
  id: string;
  icon: LucideIcon;
  title: string;
  level: RiskLevel;
  color: string;
  description: string;
  mitigations: string[];
}

// קטגוריות סיכון
const riskCategories: RiskCategory[] = [
  {
    id: "smart-contract",
    icon: Code2,
    title: "Smart Contract Risk",
    level: "high",
    color: "#8b5cf6",
    description:
      "Vulnerabilities in protocol code, including reentrancy attacks, oracle manipulation, and logic errors. Even audited contracts carry residual risk.",
    mitigations: [
      "Only use protocols with multiple audits",
      "Prefer battle-tested contracts with long track records",
      "Limit single-protocol exposure to 10% max",
      "Monitor for governance proposals and upgrades",
    ],
  },
  {
    id: "counterparty",
    icon: Users,
    title: "Counterparty Risk",
    level: "medium",
    color: "#3b82f6",
    description:
      "Risk that protocol teams, DAOs, or other market participants act in ways that negatively impact depositors. Includes rug pulls and governance attacks.",
    mitigations: [
      "Evaluate team track record and transparency",
      "Prefer protocols with decentralized governance",
      "Monitor on-chain treasury and team wallets",
      "Diversify across multiple protocols",
    ],
  },
  {
    id: "liquidity",
    icon: Droplets,
    title: "Liquidity Risk",
    level: "medium",
    color: "#06b6d4",
    description:
      "Risk of being unable to exit positions at expected prices. Includes impermanent loss in AMM pools, slippage in large trades, and lock-up period constraints.",
    mitigations: [
      "Maintain 15%+ in liquid stablecoins",
      "Avoid low-liquidity pools and tokens",
      "Stagger lock-up periods for staking positions",
      "Size positions relative to available liquidity",
    ],
  },
  {
    id: "regulatory",
    icon: Scale,
    title: "Regulatory Risk",
    level: "high",
    color: "#f59e0b",
    description:
      "Evolving global regulations could restrict DeFi access, require KYC/AML compliance, or reclassify DeFi tokens as securities. Jurisdictional risk across chains.",
    mitigations: [
      "Stay current with regulatory developments",
      "Prefer compliant and regulated protocols",
      "Maintain ability to quickly exit positions",
      "Document all DeFi activities for compliance",
    ],
  },
];

// קומפוננט אינדיקטור רמת סיכון
function RiskIndicator({ level }: { level: RiskLevel }) {
  const config = riskLevelConfig[level];
  return (
    <div className="flex items-center gap-2">
      {/* פסי רמת סיכון */}
      <div className="flex gap-0.5">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className="w-2 h-4 rounded-sm"
            style={{
              background:
                bar <= config.bars ? config.color : "rgba(255,255,255,0.06)",
            }}
          />
        ))}
      </div>
      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: config.color }}
      >
        {config.label}
      </span>
    </div>
  );
}

// אנימציות
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DeFiRiskFramework() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      {/* כותרת */}
      <motion.div variants={cardVariants} className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          DeFi Risk Assessment Framework
        </h3>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Systematic evaluation of risk categories applicable to TAMS DeFi
          wallet operations.
        </p>
      </motion.div>

      {/* רשת כרטיסי סיכון */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {riskCategories.map((risk) => {
          const Icon = risk.icon;
          return (
            <motion.div
              key={risk.id}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md overflow-hidden"
            >
              {/* פס צבעוני עליון */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, ${risk.color}60, ${risk.color}10)`,
                }}
              />

              <div className="p-5">
                {/* כותרת ורמת סיכון */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${risk.color}15` }}
                    >
                      <Icon
                        className="size-5"
                        style={{ color: risk.color }}
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {risk.title}
                    </h4>
                  </div>
                  <RiskIndicator level={risk.level} />
                </div>

                {/* תיאור */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {risk.description}
                </p>

                {/* אמצעי הגנה */}
                <div className="space-y-1.5">
                  <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-semibold mb-2">
                    Mitigations
                  </div>
                  {risk.mitigations.map((mitigation, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <div
                        className="size-1 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: risk.color }}
                      />
                      {mitigation}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

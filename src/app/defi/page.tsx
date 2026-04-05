"use client";

// דף DeFi - אסטרטגיית תשואה מבוזרת ומסגרת סיכונים
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import DeFiRiskFramework from "@/components/sections/DeFiRiskFramework";
import ThesisCardGrid from "@/components/sections/ThesisCardGrid";
import { motion } from "framer-motion";
import {
  Percent,
  Landmark,
  Droplets,
  Shield,
  ArrowRightLeft,
  Layers,
} from "lucide-react";

// אסטרטגיות DeFi
const strategies = [
  {
    icon: Percent,
    title: "Lending & Borrowing",
    description:
      "Supply assets to battle-tested lending protocols (Aave, Compound) for yield. Conservative LTV ratios and diversification across protocols to minimize smart contract risk.",
    accent: "#3b82f6",
  },
  {
    icon: Landmark,
    title: "Staking & Liquid Staking",
    description:
      "ETH staking through liquid staking derivatives (Lido, Rocket Pool) for base yield plus DeFi composability. Native staking on supported networks for validators.",
    accent: "#8b5cf6",
  },
  {
    icon: Droplets,
    title: "Liquidity Provision",
    description:
      "Concentrated liquidity positions on major pairs (ETH/USDC, BTC/ETH) on Uniswap v3 and Curve. Focus on high-volume, low-impermanent-loss pairs.",
    accent: "#06b6d4",
  },
  {
    icon: ArrowRightLeft,
    title: "Yield Optimization",
    description:
      "Automated yield strategies across chains, routing capital to the highest risk-adjusted opportunities. Regular rebalancing based on rate changes and protocol risk.",
    accent: "#10b981",
  },
  {
    icon: Shield,
    title: "Risk-First Approach",
    description:
      "Every DeFi position is evaluated against the TAMS risk framework. Maximum single-protocol exposure capped at 10%. Continuous monitoring of TVL, audit status, and governance.",
    accent: "#f59e0b",
  },
  {
    icon: Layers,
    title: "Multi-Chain Deployment",
    description:
      "DeFi strategies deployed across Ethereum, Arbitrum, and Solana to capture chain-specific opportunities and reduce single-chain concentration risk.",
    accent: "#f43f5e",
  },
];

// מטריקות DeFi
const metrics = [
  { label: "Target APY Range", value: "4-12%", color: "#10b981" },
  { label: "Max Protocol Exposure", value: "10%", color: "#f59e0b" },
  { label: "Chains Active", value: "3+", color: "#3b82f6" },
  { label: "Wallet Allocation", value: "25%", color: "#06b6d4" },
];

export default function DeFiPage() {
  return (
    <PageWrapper bgGrid>
      {/* כותרת */}
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-cyan-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-cyan-400 border border-cyan-500/20 mb-6">
            DeFi Division
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">
              Decentralized Yield Strategy
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The TAMS DeFi wallet deploys 25% of portfolio capital into
            institutional-grade yield strategies across lending, staking, and
            liquidity provision — with systematic risk management at every layer.
          </p>
        </motion.div>
      </section>

      {/* מטריקות */}
      <section className="pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-4 text-center"
            >
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: m.color }}
              >
                {m.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* אסטרטגיות */}
      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader
          badge="Strategies"
          title="DeFi Yield Strategies"
          subtitle="Diversified yield sources across multiple protocols and chains, each evaluated against the TAMS risk framework."
        />
        <ThesisCardGrid cards={strategies} />
      </section>

      {/* מסגרת סיכונים */}
      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader
          badge="Risk Management"
          title="DeFi Risk Framework"
          subtitle="Systematic evaluation and mitigation of risks specific to decentralized finance operations."
        />
        <DeFiRiskFramework />
      </section>
    </PageWrapper>
  );
}

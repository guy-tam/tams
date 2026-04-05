"use client";

// דף הבית - חזון החברה ומבוא
import HeroSection from "@/components/sections/HeroSection";
import ThesisCardGrid from "@/components/sections/ThesisCardGrid";
import FinalCTASection from "@/components/sections/FinalCTASection";
import SectionHeader from "@/components/layout/SectionHeader";
import {
  Shield,
  TrendingUp,
  Coins,
  Network,
  BarChart3,
  Lock,
} from "lucide-react";

const thesisCards = [
  {
    icon: Shield,
    title: "Long-Term Holdings",
    description:
      "Research-driven accumulation of high-conviction digital assets for long-term value creation. Focus on infrastructure-grade protocols with proven network effects.",
    accent: "#3b82f6",
  },
  {
    icon: TrendingUp,
    title: "Active Trading",
    description:
      "Disciplined swing and momentum strategies across liquid crypto markets. Systematic risk management with defined position sizing and stop-loss frameworks.",
    accent: "#8b5cf6",
  },
  {
    icon: Coins,
    title: "DeFi Yield",
    description:
      "Institutional-grade yield generation through lending, staking, and liquidity provision on battle-tested protocols. Emphasis on risk-adjusted returns.",
    accent: "#06b6d4",
  },
  {
    icon: Network,
    title: "Multi-Wallet Architecture",
    description:
      "Segregated wallet structure isolating risk across divisions. Each wallet operates with defined allocation, strategy, and risk parameters.",
    accent: "#10b981",
  },
  {
    icon: BarChart3,
    title: "Research-Driven",
    description:
      "Every holding backed by fundamental analysis. 16 assets across Layer 1, Payments, Infrastructure, Enterprise, RWA, and AI verticals.",
    accent: "#f59e0b",
  },
  {
    icon: Lock,
    title: "Institutional-Grade",
    description:
      "Security, compliance, and risk management frameworks modeled after institutional investment operations. Multi-sig, cold storage, and regular audits.",
    accent: "#f43f5e",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* הירו ראשי */}
      <HeroSection
        title="Blockchain Investment Infrastructure"
        subtitle="TAMS is a concept framework for institutional-grade digital asset management — combining research-driven long-term holdings, active trading, and DeFi yield strategies within a structured multi-wallet architecture."
        ctaText="Explore Architecture"
        ctaHref="/architecture"
      />

      {/* תזת השקעה */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          badge="Investment Framework"
          title="How TAMS Works"
          subtitle="A structured approach to digital asset management across four specialized divisions, each with defined allocation targets, risk parameters, and operational protocols."
        />
        <ThesisCardGrid cards={thesisCards} />
      </section>

      {/* CTA סופי */}
      <FinalCTASection />
    </div>
  );
}

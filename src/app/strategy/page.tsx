"use client";

// דף אסטרטגיה - POS / POC / TAM / SAM / SOM וניתוח עסקי
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import TAMSAMSOMPanel from "@/components/sections/TAMSAMSOMPanel";
import { motion } from "framer-motion";
import {
  Target,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

// הוכחת יכולת - Proof of Stake (Strategic)
const posItems = [
  {
    title: "Structured Multi-Wallet Architecture",
    description:
      "A defined four-wallet model with clear allocation targets, risk parameters, and operational protocols for each division.",
  },
  {
    title: "Research-Backed Asset Selection",
    description:
      "16 assets selected through fundamental analysis across six verticals — each with documented thesis, risk profile, and portfolio fit.",
  },
  {
    title: "Institutional Risk Framework",
    description:
      "Comprehensive risk assessment covering smart contract, counterparty, liquidity, regulatory, custody, market, and geopolitical risk categories.",
  },
  {
    title: "DeFi Yield Integration",
    description:
      "Defined strategies for yield generation through lending, staking, and liquidity provision with protocol-level risk management.",
  },
];

// Proof of Concept
const pocItems = [
  {
    title: "Concept Application Built",
    description:
      "This application itself serves as proof of concept — demonstrating the ability to articulate, structure, and present a sophisticated investment framework.",
  },
  {
    title: "TAM/SAM/SOM Analysis Complete",
    description:
      "Market sizing analysis identifies the total addressable market, serviceable segments, and realistic initial capture targets.",
  },
  {
    title: "Wallet Architecture Designed",
    description:
      "Complete hierarchical wallet structure with capital flow diagrams, allocation models, and risk isolation between divisions.",
  },
  {
    title: "Full Risk Disclosure Framework",
    description:
      "Seven risk categories documented with detailed descriptions, mitigation strategies, and disclosure language suitable for investor review.",
  },
];

// יתרונות תחרותיים
const advantages = [
  {
    icon: Target,
    title: "Thesis Clarity",
    description:
      "Clear, documented investment thesis for every position — not pattern-matching or momentum chasing, but fundamental conviction.",
    accent: "#3b82f6",
  },
  {
    icon: Zap,
    title: "Multi-Strategy",
    description:
      "Three complementary strategies (hold, trade, yield) in one framework. Diversification of approach, not just diversification of assets.",
    accent: "#8b5cf6",
  },
  {
    icon: Users,
    title: "Institutional Mindset",
    description:
      "Investor-grade documentation, risk management, and transparency. Designed to meet the expectations of sophisticated allocators.",
    accent: "#06b6d4",
  },
  {
    icon: TrendingUp,
    title: "Market Timing",
    description:
      "Built during the institutional adoption wave — post-ETF approval, during regulatory clarification, and ahead of the RWA tokenization boom.",
    accent: "#10b981",
  },
];

export default function StrategyPage() {
  return (
    <PageWrapper bgGrid>
      {/* כותרת */}
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-400 border border-amber-500/20 mb-6">
            Strategy & Business
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">
              Strategic Business Framework
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Market sizing, proof of stake, proof of concept, and competitive
            positioning — the strategic foundation for the TAMS investment
            framework.
          </p>
        </motion.div>
      </section>

      {/* TAM SAM SOM */}
      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader
          badge="Market Sizing"
          title="TAM / SAM / SOM Analysis"
          subtitle="Understanding the total market opportunity, the segments we can address, and realistic initial capture targets."
        />
        <TAMSAMSOMPanel />
      </section>

      {/* Proof of Stake (Strategic) */}
      <section className="py-16 max-w-4xl mx-auto">
        <SectionHeader
          badge="POS — Proof of Stake"
          title="What TAMS Has Built"
          subtitle="Tangible strategic assets and frameworks that demonstrate the viability and depth of the TAMS approach."
        />
        <div className="space-y-4">
          {posItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 items-start rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5"
            >
              <CheckCircle className="size-5 text-tams-green flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Proof of Concept */}
      <section className="py-12 max-w-4xl mx-auto">
        <SectionHeader
          badge="POC — Proof of Concept"
          title="Concept Validation"
          subtitle="Completed milestones that validate the TAMS framework concept and demonstrate execution capability."
        />
        <div className="space-y-4">
          {pocItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 items-start rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5"
            >
              <Lightbulb className="size-5 text-tams-amber flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* יתרונות תחרותיים */}
      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader
          badge="Competitive Edge"
          title="Strategic Advantages"
          subtitle="What differentiates the TAMS approach from generic crypto funds and speculative portfolios."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6"
              >
                <div
                  className="size-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${adv.accent}15` }}
                >
                  <Icon className="size-6" style={{ color: adv.accent }} />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-2">
                  {adv.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {adv.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
}

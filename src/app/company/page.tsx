"use client";

// דף החברה - חזון, מודל עסקי, וכיצד TAMS פועל
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import ThesisCardGrid from "@/components/sections/ThesisCardGrid";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Lightbulb,
  Shield,
  TrendingUp,
  Coins,
  Settings,
  Users,
  BookOpen,
  Scale,
} from "lucide-react";

// עקרונות יסוד
const principles = [
  {
    icon: BookOpen,
    title: "Research-First",
    description:
      "Every decision begins with fundamental analysis. No hype-driven speculation. Assets are evaluated on technology, team, market fit, and long-term thesis alignment.",
    accent: "#3b82f6",
  },
  {
    icon: Shield,
    title: "Risk Segregation",
    description:
      "Capital is divided across isolated wallets, each with its own strategy and risk tolerance. A failure in one division does not cascade to others.",
    accent: "#10b981",
  },
  {
    icon: Scale,
    title: "Institutional Discipline",
    description:
      "Modeled after professional fund management — defined allocation targets, rebalancing rules, compliance awareness, and documented investment processes.",
    accent: "#8b5cf6",
  },
  {
    icon: Users,
    title: "Transparency",
    description:
      "Clear communication of strategy, risk, and performance. Every conceptual element — from TAM analysis to risk disclosures — is presented with intellectual honesty.",
    accent: "#06b6d4",
  },
];

// כיצד החברה פועלת - שלבי התהליך
const processSteps = [
  {
    step: "01",
    title: "Research & Analysis",
    description:
      "Deep fundamental analysis of digital assets across multiple verticals: Layer 1, Payments, Infrastructure, Enterprise, RWA, and AI/Compute.",
    icon: Eye,
    color: "#3b82f6",
  },
  {
    step: "02",
    title: "Thesis Construction",
    description:
      "Build conviction-weighted positions based on long-term thesis alignment, risk assessment, and portfolio fit analysis for each asset.",
    icon: Lightbulb,
    color: "#8b5cf6",
  },
  {
    step: "03",
    title: "Capital Allocation",
    description:
      "Deploy capital across four specialized wallets — Long-Term Holdings (40%), Active Trading (25%), DeFi Yield (25%), Operations (10%).",
    icon: Target,
    color: "#06b6d4",
  },
  {
    step: "04",
    title: "Active Management",
    description:
      "Continuous monitoring, rebalancing, and strategy optimization. Risk frameworks applied at every level from individual positions to portfolio-wide exposure.",
    icon: Settings,
    color: "#10b981",
  },
];

// אנימציות
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function CompanyPage() {
  return (
    <PageWrapper bgGrid>
      {/* כותרת ראשית */}
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-cyan-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-cyan-400 border border-cyan-500/20 mb-6">
            About TAMS
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">
              Investment Infrastructure for the Digital Age
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TAMS is a concept framework for managing digital assets with
            institutional discipline. We combine research-driven conviction with
            structured risk management across a multi-wallet architecture.
          </p>
        </motion.div>
      </section>

      {/* חזון ומשימה */}
      <section className="py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-8"
          >
            <div className="size-12 rounded-xl bg-tams-blue/15 flex items-center justify-center mb-5">
              <Eye className="size-6 text-tams-blue" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Vision
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To demonstrate that blockchain-based investment can be managed with
              the same rigor, transparency, and discipline as traditional
              institutional asset management — while capturing the unique
              opportunities of an emerging asset class.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-8"
          >
            <div className="size-12 rounded-xl bg-tams-purple/15 flex items-center justify-center mb-5">
              <Target className="size-6 text-tams-purple" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Mission
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Build a structured, research-backed framework for digital asset
              management that balances long-term conviction holdings with active
              trading and DeFi yield strategies — all within a risk-aware,
              multi-wallet architecture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* עקרונות יסוד */}
      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader
          badge="Core Principles"
          title="What Drives TAMS"
          subtitle="The foundational principles that guide every aspect of the TAMS framework — from asset selection to risk management."
        />
        <ThesisCardGrid cards={principles} />
      </section>

      {/* כיצד פועל */}
      <section className="py-16 max-w-4xl mx-auto">
        <SectionHeader
          badge="Process"
          title="How It Works"
          subtitle="From research to execution — the structured process behind TAMS capital allocation."
        />

        <div className="space-y-6">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div
                  className="flex-shrink-0 size-14 rounded-2xl flex items-center justify-center border"
                  style={{
                    background: `${step.color}10`,
                    borderColor: `${step.color}25`,
                  }}
                >
                  <Icon className="size-6" style={{ color: step.color }} />
                </div>
                <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: step.color }}
                    >
                      Step {step.step}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* דיסקליימר */}
      <section className="py-12 max-w-3xl mx-auto">
        <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 text-center">
          <p className="text-xs text-muted-foreground/60 leading-relaxed">
            <span className="font-semibold text-muted-foreground/80">
              Note:
            </span>{" "}
            TAMS is a concept application designed to demonstrate blockchain
            investment infrastructure principles. It does not represent an
            operational fund, custody solution, or financial product. No real
            capital is deployed through this application.
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}

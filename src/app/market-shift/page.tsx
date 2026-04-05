"use client";

// דף שינוי שוק - למה עכשיו, אימוץ מוסדי, ומגמות שוק
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import MarketShiftTimeline from "@/components/sections/MarketShiftTimeline";
import ThesisCardGrid from "@/components/sections/ThesisCardGrid";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Shield,
  Globe,
  Landmark,
  ArrowUpRight,
  Layers,
} from "lucide-react";

// נקודות מפתח - למה עכשיו
const whyNowCards = [
  {
    icon: Landmark,
    title: "ETF Legitimization",
    description:
      "Spot Bitcoin and Ethereum ETFs have been approved, attracting billions in institutional inflows and legitimizing crypto as an asset class for mainstream allocators.",
    accent: "#3b82f6",
  },
  {
    icon: Shield,
    title: "Regulatory Clarity",
    description:
      "Global regulatory frameworks are solidifying. The EU's MiCA, evolving US guidance, and jurisdictional competition are creating clearer rules for institutional participation.",
    accent: "#10b981",
  },
  {
    icon: Globe,
    title: "Corporate Treasury Adoption",
    description:
      "From MicroStrategy to Tesla, corporate treasuries are allocating to digital assets. This trend is expanding to mid-market companies and sovereign wealth funds.",
    accent: "#8b5cf6",
  },
  {
    icon: ArrowUpRight,
    title: "RWA Tokenization Wave",
    description:
      "Real-world asset tokenization is projected to reach $16T by 2030. BlackRock, Franklin Templeton, and other TradFi giants are actively building on-chain products.",
    accent: "#06b6d4",
  },
  {
    icon: TrendingUp,
    title: "DeFi Maturation",
    description:
      "DeFi has survived multiple market cycles. Battle-tested protocols now manage billions with proven security. Institutional-grade DeFi infrastructure is emerging.",
    accent: "#f59e0b",
  },
  {
    icon: Layers,
    title: "Infrastructure Readiness",
    description:
      "Layer 2 scaling, cross-chain interoperability, account abstraction, and institutional custody solutions have reached maturity levels suitable for serious capital deployment.",
    accent: "#f43f5e",
  },
];

export default function MarketShiftPage() {
  return (
    <PageWrapper bgGrid>
      {/* כותרת */}
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-green-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-green-400 border border-green-500/20 mb-6">
            Market Shift
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">
              Why Now: The Institutional Shift
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The convergence of regulatory clarity, ETF approvals, institutional
            adoption, and infrastructure maturity creates a unique window for
            structured blockchain investment. The market is shifting from
            speculative to institutional.
          </p>
        </motion.div>
      </section>

      {/* למה עכשיו */}
      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader
          badge="Market Catalysts"
          title="Why This Moment Matters"
          subtitle="Six converging forces are transforming blockchain from a speculative asset class to institutional infrastructure."
        />
        <ThesisCardGrid cards={whyNowCards} />
      </section>

      {/* ציר זמן */}
      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader
          badge="Timeline"
          title="The Institutional Adoption Timeline"
          subtitle="Key milestones in the journey from early adopters to mainstream institutional participation in digital assets."
        />
        <MarketShiftTimeline />
      </section>

      {/* ציטוט / הדגשה */}
      <section className="py-16 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-tams-blue/[0.05] to-tams-purple/[0.05] backdrop-blur-md p-8 text-center"
        >
          <p className="text-lg text-foreground font-medium leading-relaxed mb-4">
            &ldquo;We are witnessing the convergence of traditional finance and
            blockchain infrastructure — not as competing systems, but as
            complementary layers of a new financial architecture.&rdquo;
          </p>
          <p className="text-sm text-muted-foreground">
            — The TAMS Investment Thesis
          </p>
        </motion.div>
      </section>
    </PageWrapper>
  );
}

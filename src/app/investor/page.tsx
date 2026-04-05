"use client";

// דף משקיע - מפת דרכים, גילוי סיכונים, וסיכום
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import RoadmapTimeline from "@/components/sections/RoadmapTimeline";
import RiskDisclosureAccordion from "@/components/sections/RiskDisclosureAccordion";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { motion } from "framer-motion";
import { Briefcase, Lock, BarChart3, Clock } from "lucide-react";

// מנהלי ריכוז
const highlights = [
  {
    icon: Briefcase,
    title: "Structured Approach",
    value: "4 Wallets",
    description: "Capital segregated across specialized divisions",
    color: "#3b82f6",
  },
  {
    icon: BarChart3,
    title: "Research Coverage",
    value: "16 Assets",
    description: "Deep analysis across 6 vertical categories",
    color: "#8b5cf6",
  },
  {
    icon: Lock,
    title: "Risk Categories",
    value: "7 Layers",
    description: "Comprehensive risk assessment framework",
    color: "#06b6d4",
  },
  {
    icon: Clock,
    title: "Horizon",
    value: "Multi-Year",
    description: "Long-term thesis with structured milestones",
    color: "#10b981",
  },
];

export default function InvestorPage() {
  return (
    <PageWrapper bgGrid>
      {/* כותרת */}
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-rose-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-rose-400 border border-rose-500/20 mb-6">
            Investor Overview
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">
              Investor Experience & Roadmap
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From project milestones to risk disclosures — everything an investor
            needs to understand the TAMS framework, its trajectory, and the risks
            involved.
          </p>
        </motion.div>
      </section>

      {/* מנהלי ריכוז */}
      <section className="pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5 text-center"
              >
                <div
                  className="size-10 rounded-xl mx-auto flex items-center justify-center mb-3"
                  style={{ background: `${h.color}15` }}
                >
                  <Icon className="size-5" style={{ color: h.color }} />
                </div>
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: h.color }}
                >
                  {h.value}
                </div>
                <div className="text-sm font-medium text-foreground mb-0.5">
                  {h.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {h.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* מפת דרכים */}
      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader
          badge="Roadmap"
          title="Project Roadmap & Milestones"
          subtitle="The phased development plan for the TAMS framework — from research and infrastructure to active management and scaling."
        />
        <RoadmapTimeline />
      </section>

      {/* גילוי סיכונים */}
      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader
          badge="Risk Disclosure"
          title="Risk Categories & Disclosures"
          subtitle="Comprehensive risk disclosure covering all major risk categories relevant to digital asset investment. Transparency is non-negotiable."
        />
        <RiskDisclosureAccordion />
      </section>

      {/* סיכום ו-CTA */}
      <section className="py-12 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-tams-blue/[0.05] to-tams-cyan/[0.05] backdrop-blur-md p-8 text-center"
        >
          <h3 className="text-xl font-bold text-foreground mb-3">
            A Framework, Not a Product
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            TAMS is a concept application designed to demonstrate how blockchain
            investment infrastructure could be structured with institutional
            discipline. It showcases strategy, research, architecture, and risk
            management — but is not an operational fund, financial product, or
            investment offering.
          </p>
          <p className="text-xs text-muted-foreground/60">
            No capital is deployed. No returns are guaranteed or implied. This is
            a conceptual exploration of blockchain investment management.
          </p>
        </motion.div>
      </section>

      {/* CTA סופי */}
      <FinalCTASection />
    </PageWrapper>
  );
}

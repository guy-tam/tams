"use client";

// דף משקיע - מפת דרכים, גילוי סיכונים, דרגות משקיעים וסיכום
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import RoadmapTimeline from "@/components/sections/RoadmapTimeline";
import RiskDisclosureAccordion from "@/components/sections/RiskDisclosureAccordion";
import InvestorTiers from "@/components/sections/InvestorTiers";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Briefcase, Lock, BarChart3, Clock } from "lucide-react";

const highlightIcons = [Briefcase, BarChart3, Lock, Clock];
const highlightColors = ["#4f8ff7", "#a78bfa", "#f59e0b", "#34d399"];
const highlightKeys = ["structured", "research", "risk", "horizon"] as const;

export default function InvestorPage() {
  const { t } = useLanguage();

  return (
    <PageWrapper bgGrid>
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block rounded-full bg-amber-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-6">{t("investor.badge")}</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"><span className="gradient-text">{t("investor.title")}</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("investor.subtitle")}</p>
        </motion.div>
      </section>

      <section className="pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlightKeys.map((key, i) => {
            const Icon = highlightIcons[i];
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-xl border border-gray-200 bg-white backdrop-blur-md p-5 text-center">
                <div className="size-10 rounded-xl mx-auto flex items-center justify-center mb-3" style={{ background: `${highlightColors[i]}15` }}>
                  <Icon className="size-5" style={{ color: highlightColors[i] }} />
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: highlightColors[i] }}>{t(`investor.highlights.${key}.value`)}</div>
                <div className="text-sm font-medium text-foreground mb-0.5">{t(`investor.highlights.${key}.title`)}</div>
                <div className="text-xs text-muted-foreground">{t(`investor.highlights.${key}.description`)}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader badge={t("investor.roadmap.badge")} title={t("investor.roadmap.title")} subtitle={t("investor.roadmap.subtitle")} />
        <RoadmapTimeline />
      </section>

      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader badge={t("investor.riskDisclosure.badge")} title={t("investor.riskDisclosure.title")} subtitle={t("investor.riskDisclosure.subtitle")} />
        <RiskDisclosureAccordion />
      </section>

      <InvestorTiers />

      <section className="py-12 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-500/[0.05] to-amber-500/[0.03] backdrop-blur-md p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">{t("investor.conclusion.title")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t("investor.conclusion.content")}</p>
          <p className="text-xs text-muted-foreground/60">{t("investor.conclusion.note")}</p>
        </motion.div>
      </section>

      <FinalCTASection />
    </PageWrapper>
  );
}

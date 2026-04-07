"use client";

// דף החברה - חזון, מודל עסקי, וכיצד TAMS פועל
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import ThesisCardGrid from "@/components/sections/ThesisCardGrid";
import PartnershipStructure from "@/components/sections/PartnershipStructure";
import OperatingModel from "@/components/sections/OperatingModel";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Settings,
  BookOpen,
  Shield,
  Scale,
  Users,
  Lightbulb,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const stepIcons = [Eye, Lightbulb, Target, Settings];
const stepColors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];

export default function CompanyPage() {
  const { t } = useLanguage();

  const principles = [
    { icon: BookOpen, title: t("company.principleCards.research.title"), description: t("company.principleCards.research.description"), accent: "#3b82f6" },
    { icon: Shield, title: t("company.principleCards.risk.title"), description: t("company.principleCards.risk.description"), accent: "#10b981" },
    { icon: Scale, title: t("company.principleCards.discipline.title"), description: t("company.principleCards.discipline.description"), accent: "#8b5cf6" },
    { icon: Users, title: t("company.principleCards.transparency.title"), description: t("company.principleCards.transparency.description"), accent: "#06b6d4" },
  ];

  const steps = [
    t("company.steps.0.title"),
    t("company.steps.1.title"),
    t("company.steps.2.title"),
    t("company.steps.3.title"),
  ];
  const stepDescs = [
    t("company.steps.0.description"),
    t("company.steps.1.description"),
    t("company.steps.2.description"),
    t("company.steps.3.description"),
  ];

  return (
    <PageWrapper bgGrid>
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-400 border border-amber-500/15 mb-6">
            {t("company.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">{t("company.title")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("company.subtitle")}
          </p>
        </motion.div>
      </section>

      <section className="py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md p-8">
            <div className="size-12 rounded-xl bg-tams-blue/15 flex items-center justify-center mb-5"><Eye className="size-6 text-tams-blue" /></div>
            <h3 className="text-xl font-semibold text-foreground mb-3">{t("company.vision.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("company.vision.content")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md p-8">
            <div className="size-12 rounded-xl bg-tams-purple/15 flex items-center justify-center mb-5"><Target className="size-6 text-tams-purple" /></div>
            <h3 className="text-xl font-semibold text-foreground mb-3">{t("company.mission.title")}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("company.mission.content")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader badge={t("company.principles.badge")} title={t("company.principles.title")} subtitle={t("company.principles.subtitle")} />
        <ThesisCardGrid cards={principles} />
      </section>

      <section className="py-16 max-w-4xl mx-auto">
        <SectionHeader badge={t("company.process.badge")} title={t("company.process.title")} subtitle={t("company.process.subtitle")} />
        <div className="space-y-6">
          {steps.map((title, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-6 items-start">
                <div className="flex-shrink-0 size-14 rounded-2xl flex items-center justify-center border" style={{ background: `${stepColors[i]}10`, borderColor: `${stepColors[i]}25` }}>
                  <Icon className="size-6" style={{ color: stepColors[i] }} />
                </div>
                <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: stepColors[i] }}>0{i + 1}</span>
                    <span className="text-sm font-semibold text-foreground">{title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stepDescs[i]}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* מבנה שותפות LP/GP */}
      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader
          badge="Partnership Structure"
          title="מבנה השותפות"
          subtitle="שותפות מוגבלת (Limited Partnership) — מבנה מוכח לניהול השקעות מוסדי עם הפרדה ברורה בין ניהול לבעלות."
        />
        <PartnershipStructure />
      </section>

      {/* מודל תפעול */}
      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader
          badge="Operating Model"
          title="מודל תפעול"
          subtitle="גוף עצמאי דיגיטלי, בטוח ושקוף, עם שליטה מלאה של הקרן ללא תלות בגוף חיצוני."
        />
        <OperatingModel />
      </section>

      <section className="py-12 max-w-3xl mx-auto">
        <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 text-center">
          <p className="text-xs text-muted-foreground/60 leading-relaxed">{t("company.note")}</p>
        </div>
      </section>
    </PageWrapper>
  );
}

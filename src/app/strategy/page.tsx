"use client";

// דף אסטרטגיה - POS / POC / TAM / SAM / SOM וניתוח עסקי
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import TAMSAMSOMPanel from "@/components/sections/TAMSAMSOMPanel";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Target, CheckCircle, Lightbulb, TrendingUp, Users, Zap } from "lucide-react";

export default function StrategyPage() {
  const { t } = useLanguage();

  const advantages = [
    { icon: Target, title: t("strategy.advantages.clarity.title"), description: t("strategy.advantages.clarity.description"), accent: "#3b82f6" },
    { icon: Zap, title: t("strategy.advantages.multiStrategy.title"), description: t("strategy.advantages.multiStrategy.description"), accent: "#8b5cf6" },
    { icon: Users, title: t("strategy.advantages.mindset.title"), description: t("strategy.advantages.mindset.description"), accent: "#f59e0b" },
    { icon: TrendingUp, title: t("strategy.advantages.timing.title"), description: t("strategy.advantages.timing.description"), accent: "#10b981" },
  ];

  return (
    <PageWrapper bgGrid>
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-6">{t("strategy.badge")}</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"><span className="gradient-text">{t("strategy.title")}</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("strategy.subtitle")}</p>
        </motion.div>
      </section>

      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader badge={t("strategy.tam.badge")} title={t("strategy.tam.title")} subtitle={t("strategy.tam.subtitle")} />
        <TAMSAMSOMPanel />
      </section>

      <section className="py-16 max-w-4xl mx-auto">
        <SectionHeader badge={t("strategy.pos.badge")} title={t("strategy.pos.title")} subtitle={t("strategy.pos.subtitle")} />
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex gap-4 items-start rounded-xl border border-amber-500/15 bg-white backdrop-blur-md p-5">
              <CheckCircle className="size-5 text-tams-green flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{t(`strategy.posItems.${i}.title`)}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(`strategy.posItems.${i}.description`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-12 max-w-4xl mx-auto">
        <SectionHeader badge={t("strategy.poc.badge")} title={t("strategy.poc.title")} subtitle={t("strategy.poc.subtitle")} />
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex gap-4 items-start rounded-xl border border-amber-500/15 bg-white backdrop-blur-md p-5">
              <Lightbulb className="size-5 text-tams-amber flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{t(`strategy.pocItems.${i}.title`)}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(`strategy.pocItems.${i}.description`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader badge={t("strategy.edge.badge")} title={t("strategy.edge.title")} subtitle={t("strategy.edge.subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-2xl border border-amber-500/15 bg-white backdrop-blur-md p-6">
                <div className="size-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${adv.accent}15` }}>
                  <Icon className="size-6" style={{ color: adv.accent }} />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-2">{adv.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
}

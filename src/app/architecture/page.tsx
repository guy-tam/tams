"use client";

// דף ארכיטקטורה - מבנה ארנקים, זרימת הון, והקצאת פורטפוליו
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import WalletArchitectureMap from "@/components/sections/WalletArchitectureMap";
import CapitalFlowDiagram from "@/components/sections/CapitalFlowDiagram";
import AllocationChart from "@/components/charts/AllocationChart";
import DetailedPortfolioTable from "@/components/sections/DetailedPortfolioTable";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";

const divisionColors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];
const divisionPcts = ["40%", "25%", "25%", "10%"];

export default function ArchitecturePage() {
  const { t } = useLanguage();

  return (
    <PageWrapper bgGrid>
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block rounded-full bg-amber-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-6">
            {t("architecture.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">{t("architecture.title")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("architecture.subtitle")}</p>
        </motion.div>
      </section>

      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader badge={t("architecture.wallet.badge")} title={t("architecture.wallet.title")} subtitle={t("architecture.wallet.subtitle")} />
        <WalletArchitectureMap />
      </section>

      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader badge={t("architecture.flow.badge")} title={t("architecture.flow.title")} subtitle={t("architecture.flow.subtitle")} />
        <CapitalFlowDiagram />
      </section>

      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader badge={t("architecture.allocation.badge")} title={t("architecture.allocation.title")} subtitle={t("architecture.allocation.subtitle")} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <AllocationChart />
          <div className="space-y-4">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-gray-200 bg-white backdrop-blur-md p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-3 rounded-full" style={{ background: divisionColors[i] }} />
                  <span className="text-sm font-semibold text-foreground">{t(`architecture.divisions.${i}.name`)}</span>
                  <span className="text-sm font-bold ml-auto" style={{ color: divisionColors[i] }}>{divisionPcts[i]}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(`architecture.divisions.${i}.description`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* הקצאת תיק מפורטת */}
      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader
          badge="Portfolio Breakdown"
          title="הקצאת תיק מפורטת"
          subtitle="מבנה תיק של 10 מיליון ש״ח — חלוקה בין נכסים בטוחים (32%) לנכסים דיגיטליים (68%) עם פירוט מלא לפי סקטורים."
        />
        <DetailedPortfolioTable />
      </section>
    </PageWrapper>
  );
}

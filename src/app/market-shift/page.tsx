"use client";

// דף שינוי שוק - למה עכשיו, אימוץ מוסדי, ומגמות שוק
import PageTableOfContents from "@/components/layout/PageTableOfContents";
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import MarketShiftTimeline from "@/components/sections/MarketShiftTimeline";
import ThesisCardGrid from "@/components/sections/ThesisCardGrid";
import MarketSegmentsGrid from "@/components/sections/MarketSegmentsGrid";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { TrendingUp, Shield, Globe, Landmark, ArrowUpRight, Layers } from "lucide-react";

export default function MarketShiftPage() {
  const { t } = useLanguage();

  const whyNowCards = [
    { icon: Landmark, title: t("marketShift.catalystCards.etf.title"), description: t("marketShift.catalystCards.etf.description"), accent: "#3b82f6" },
    { icon: Shield, title: t("marketShift.catalystCards.regulatory.title"), description: t("marketShift.catalystCards.regulatory.description"), accent: "#10b981" },
    { icon: Globe, title: t("marketShift.catalystCards.corporate.title"), description: t("marketShift.catalystCards.corporate.description"), accent: "#8b5cf6" },
    { icon: ArrowUpRight, title: t("marketShift.catalystCards.rwa.title"), description: t("marketShift.catalystCards.rwa.description"), accent: "#06b6d4" },
    { icon: TrendingUp, title: t("marketShift.catalystCards.defiMaturation.title"), description: t("marketShift.catalystCards.defiMaturation.description"), accent: "#f59e0b" },
    { icon: Layers, title: t("marketShift.catalystCards.infrastructure.title"), description: t("marketShift.catalystCards.infrastructure.description"), accent: "#f43f5e" },
  ];

  const marketSections = [
    { id: "market-hero", label: "שינוי שוק" },
    { id: "market-segments", label: "סגמנטי שוק" },
    { id: "market-catalysts", label: "קטליסטים" },
    { id: "market-timeline", label: "ציר זמן" },
    { id: "market-quote", label: "ציטוט" },
  ];

  return (
    <PageWrapper bgGrid>
      <PageTableOfContents sections={marketSections} />

      <section id="market-hero" className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-6">{t("marketShift.badge")}</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"><span className="gradient-text">{t("marketShift.title")}</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("marketShift.subtitle")}</p>
        </motion.div>
      </section>

      {/* סגמנטי שוק גלובליים */}
      <section id="market-segments" className="py-12 max-w-7xl mx-auto">
        <SectionHeader
          badge="Global Market"
          title="שוק של טריליוני דולרים עובר לבלוקצ׳יין"
          subtitle="תשלומים, נכסים מנוהלים, ביטוח, נדל״ן ועוד — כולם עוברים דיגיטציה והתאמה לתשתיות בלוקצ׳יין חדשות."
        />
        <MarketSegmentsGrid />
      </section>

      <section id="market-catalysts" className="py-12 max-w-7xl mx-auto">
        <SectionHeader badge={t("marketShift.catalysts.badge")} title={t("marketShift.catalysts.title")} subtitle={t("marketShift.catalysts.subtitle")} />
        <ThesisCardGrid cards={whyNowCards} />
      </section>

      <section id="market-timeline" className="py-16 max-w-7xl mx-auto">
        <SectionHeader badge={t("marketShift.timeline.badge")} title={t("marketShift.timeline.title")} subtitle={t("marketShift.timeline.subtitle")} />
        <MarketShiftTimeline />
      </section>

      <section id="market-quote" className="py-16 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl border border-amber-500/15 bg-gradient-to-br from-tams-blue/[0.05] to-tams-purple/[0.05] backdrop-blur-md p-8 text-center">
          <p className="text-lg text-foreground font-medium leading-relaxed mb-4">&ldquo;{t("marketShift.quote.text")}&rdquo;</p>
          <p className="text-sm text-muted-foreground">— {t("marketShift.quote.source")}</p>
        </motion.div>
      </section>
    </PageWrapper>
  );
}

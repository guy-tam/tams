"use client";

// דף הבית - חזון החברה, מבוא, ומערכת משקיעים
import PageTableOfContents from "@/components/layout/PageTableOfContents";
import HeroSection from "@/components/sections/HeroSection";
import TrustSignalsRow from "@/components/sections/TrustSignalsRow";
import MarketSnapshotBand from "@/components/sections/MarketSnapshotBand";
import ThesisCardGrid from "@/components/sections/ThesisCardGrid";
import VisionSection from "@/components/sections/VisionSection";
import InvestorTiers from "@/components/sections/InvestorTiers";
import FinalCTASection from "@/components/sections/FinalCTASection";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n";
import {
  Shield,
  TrendingUp,
  Coins,
  Network,
  BarChart3,
  Lock,
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();

  // פלטה מאוחדת — זהב מוסדי על כל הכרטיסים, היררכיה דרך הטיפוגרפיה ולא דרך הצבע
  const GOLD = "#d4a853";
  const GOLD_DEEP = "#b8902d";
  const BLUE_DEEP = "#5a8fd8";
  const thesisCards = [
    { icon: Shield, title: t("home.cards.longTerm.title"), description: t("home.cards.longTerm.description"), accent: GOLD },
    { icon: TrendingUp, title: t("home.cards.trading.title"), description: t("home.cards.trading.description"), accent: BLUE_DEEP },
    { icon: Coins, title: t("home.cards.defi.title"), description: t("home.cards.defi.description"), accent: GOLD_DEEP },
    { icon: Network, title: t("home.cards.multiWallet.title"), description: t("home.cards.multiWallet.description"), accent: GOLD },
    { icon: BarChart3, title: t("home.cards.research.title"), description: t("home.cards.research.description"), accent: BLUE_DEEP },
    { icon: Lock, title: t("home.cards.institutional.title"), description: t("home.cards.institutional.description"), accent: GOLD_DEEP },
  ];

  const homeSections = [
    { id: "hero", label: "ראשי" },
    { id: "market", label: "שוק" },
    { id: "thesis", label: "תזה" },
    { id: "vision", label: "חזון" },
    { id: "tiers", label: "דרגות" },
    { id: "cta", label: "סיכום" },
  ];

  return (
    <div className="min-h-screen">
      <PageTableOfContents sections={homeSections} />

      <div id="hero">
        <HeroSection
          title={t("home.hero.title")}
          subtitle={t("home.hero.subtitle")}
          ctaText={t("home.hero.cta1")}
          ctaHref="/architecture"
        />
      </div>

      {/* Trust signals — Auditor · Custody · Domicile · Compliance */}
      <TrustSignalsRow />

      {/* Market snapshot — נתוני אפריל 2026 עם footnotes */}
      <div id="market">
        <MarketSnapshotBand />
      </div>

      <section id="thesis" className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          badge={t("home.thesis.badge")}
          title={t("home.thesis.title")}
          subtitle={t("home.thesis.subtitle")}
        />
        <ThesisCardGrid cards={thesisCards} />
      </section>

      <div id="vision">
        <VisionSection />
      </div>

      <div id="tiers">
        <InvestorTiers />
      </div>

      <div id="cta">
        <FinalCTASection />
      </div>
    </div>
  );
}

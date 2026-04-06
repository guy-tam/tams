"use client";

// דף הבית - חזון החברה, מבוא, ומערכת משקיעים
import HeroSection from "@/components/sections/HeroSection";
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

  const thesisCards = [
    { icon: Shield, title: t("home.cards.longTerm.title"), description: t("home.cards.longTerm.description"), accent: "#4f8ff7" },
    { icon: TrendingUp, title: t("home.cards.trading.title"), description: t("home.cards.trading.description"), accent: "#a78bfa" },
    { icon: Coins, title: t("home.cards.defi.title"), description: t("home.cards.defi.description"), accent: "#22d3ee" },
    { icon: Network, title: t("home.cards.multiWallet.title"), description: t("home.cards.multiWallet.description"), accent: "#34d399" },
    { icon: BarChart3, title: t("home.cards.research.title"), description: t("home.cards.research.description"), accent: "#fbbf24" },
    { icon: Lock, title: t("home.cards.institutional.title"), description: t("home.cards.institutional.description"), accent: "#fb7185" },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        ctaText={t("home.hero.cta1")}
        ctaHref="/architecture"
      />

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          badge={t("home.thesis.badge")}
          title={t("home.thesis.title")}
          subtitle={t("home.thesis.subtitle")}
        />
        <ThesisCardGrid cards={thesisCards} />
      </section>

      <VisionSection />

      <InvestorTiers />

      <FinalCTASection />
    </div>
  );
}

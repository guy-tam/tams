"use client";

// דף הבית - חזון החברה ומבוא
import HeroSection from "@/components/sections/HeroSection";
import ThesisCardGrid from "@/components/sections/ThesisCardGrid";
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
    { icon: Shield, title: t("home.cards.longTerm.title"), description: t("home.cards.longTerm.description"), accent: "#3b82f6" },
    { icon: TrendingUp, title: t("home.cards.trading.title"), description: t("home.cards.trading.description"), accent: "#8b5cf6" },
    { icon: Coins, title: t("home.cards.defi.title"), description: t("home.cards.defi.description"), accent: "#06b6d4" },
    { icon: Network, title: t("home.cards.multiWallet.title"), description: t("home.cards.multiWallet.description"), accent: "#10b981" },
    { icon: BarChart3, title: t("home.cards.research.title"), description: t("home.cards.research.description"), accent: "#f59e0b" },
    { icon: Lock, title: t("home.cards.institutional.title"), description: t("home.cards.institutional.description"), accent: "#f43f5e" },
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

      <FinalCTASection />
    </div>
  );
}

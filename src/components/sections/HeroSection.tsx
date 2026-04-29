"use client";

// Hero מוסדי — היררכיה ברורה, אנימציה בוגרת, בלי פיירוטכניקה
import { motion } from "framer-motion";
import { ArrowDown, Compass, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText = "Explore Architecture",
  ctaHref = "#architecture",
}: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* scrim מקומי — מקרב את ה-UI לקדמת הבמה */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 52%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.18) 60%, transparent 85%)",
        }}
      />

      {/* תוכן מרכזי */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* eyebrow — חותמת מוסדית */}
          <div className="inline-flex items-center gap-3 mb-9">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400/60" />
            <span className="text-[10px] tracking-[0.42em] uppercase text-amber-300/90 font-semibold">
              {t("home.hero.badge")}
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>

          {/* כותרת — לבן בונה, ללא gradient */}
          <h1 className="heading-editorial text-[2rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[4.6rem] xl:text-[5.2rem] tracking-[0.005em] leading-[1.12] mb-8 text-white/97 [text-shadow:0_2px_28px_rgba(0,0,0,0.55)] max-w-4xl mx-auto">
            {title}
          </h1>

          {/* hairline זהב */}
          <div className="hairline-gold w-24 mx-auto mb-7 opacity-70" />

          {/* תת כותרת — קריאה, רחבת ידיים */}
          <p className="text-[15px] sm:text-base lg:text-lg text-zinc-200/90 max-w-2xl mx-auto mb-11 leading-[1.7] font-light [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
            {subtitle}
          </p>

          {/* trust ribbon — 4 מאזניים שקטים */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-12 text-[10px] tracking-[0.28em] uppercase text-amber-200/55 font-medium">
            <span>{t("home.hero.ribbon.wallet")}</span>
            <span className="text-amber-400/30">·</span>
            <span>{t("home.hero.ribbon.storage")}</span>
            <span className="text-amber-400/30">·</span>
            <span>{t("home.hero.ribbon.methodology")}</span>
            <span className="text-amber-400/30">·</span>
            <span>{t("home.hero.ribbon.accredited")}</span>
          </div>

          {/* CTA — נקי, מוסדי, בלי gradient רב-שכבתי */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a href={ctaHref}>
              <Button
                size="lg"
                className="bg-amber-500/95 hover:bg-amber-400 text-zinc-950 border-0 px-7 sm:px-9 h-12 sm:h-13 text-[13px] sm:text-sm gap-2 tracking-[0.12em] uppercase font-semibold transition-colors duration-300 shadow-[0_8px_24px_-8px_rgba(212,168,83,0.45)] w-full sm:w-auto"
              >
                <Compass className="size-4" />
                {ctaText}
              </Button>
            </a>
            <a href="#research">
              <Button
                variant="outline"
                size="lg"
                className="px-7 sm:px-9 h-12 sm:h-13 text-[13px] sm:text-sm gap-2 tracking-[0.12em] uppercase font-medium border-amber-400/25 bg-white/[0.03] backdrop-blur-md text-amber-200/90 hover:bg-white/[0.06] hover:border-amber-400/45 hover:text-amber-100 transition-colors duration-300 w-full sm:w-auto"
              >
                <FileText className="size-4" />
                {t("home.hero.cta2")}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* אינדיקטור גלילה — מאופק */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-amber-200/35">
          <span className="text-[9px] uppercase tracking-[0.36em] font-medium">{t("home.hero.scroll")}</span>
          <ArrowDown className="size-3.5" />
        </div>
      </motion.div>
    </section>
  );
}

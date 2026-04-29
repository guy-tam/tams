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
      {/* תוכן מרכזי */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* תג זהב — מאופק, בלי pulse */}
          <div className="inline-flex items-center gap-2.5 mb-9 px-4 py-2 rounded-full border border-amber-400/25 bg-amber-500/[0.04]">
            <span className="size-1.5 rounded-full bg-amber-400/80" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-amber-300/85 font-medium">
              {t("home.hero.badge")}
            </span>
          </div>

          {/* כותרת — לבן בונה, בלי gradient על הטקסט */}
          <h1 className="heading-editorial text-[2.4rem] sm:text-[3.6rem] md:text-[4.4rem] lg:text-[5.4rem] xl:text-[6rem] tracking-tight leading-[1.06] mb-7 text-white/96 [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            {title}
          </h1>

          {/* תת כותרת — קריאה, רחבת ידיים */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-300/85 max-w-2xl mx-auto mb-12 leading-[1.65] font-light">
            {subtitle}
          </p>

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

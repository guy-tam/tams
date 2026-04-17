"use client";

// סקשן ראשי — הירו חי ומלכותי עם כדורים צפים
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* רקע Hero — שכבת האטמוספירה הגלובלית עם הציורים חי כאן בלי תחרות
          רק קרן אור זהובה עדינה + וינייטה דרמטית מעל הציורים */}
      <div aria-hidden="true" className="absolute inset-0 godray pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 chiaroscuro pointer-events-none" />

      {/* תוכן מרכזי */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* תג עליון — מוזהב עם מסגרת */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
            className="badge-seal mb-8"
          >
            <span className="size-2 rounded-full bg-amber-400 animate-slow-pulse" />
            {t("home.hero.badge")}
          </motion.div>

          {/* כותרת ראשית — היררכיה נקייה: Badge → Title → Subtitle */}
          <motion.h1
            style={{ y: titleY }}
            className="heading-editorial text-[2.2rem] sm:text-[3.5rem] md:text-[4.2rem] lg:text-[5.2rem] xl:text-[6rem] tracking-tight leading-[1.08] mb-5 sm:mb-7"
          >
            <span className="gradient-text animate-text-glow">{title}</span>
          </motion.h1>

          {/* תת כותרת */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.8, duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            className="text-base sm:text-lg lg:text-2xl text-muted-foreground/90 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-2 sm:px-0"
          >
            {subtitle}
          </motion.p>

          {/* כפתורי CTA — חיים עם זוהר */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={ctaHref}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border-0 px-6 sm:px-8 h-12 sm:h-13 text-sm sm:text-base gap-2 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] w-full sm:w-auto"
              >
                <Compass className="size-4" />
                {ctaText}
              </Button>
            </a>
            <a href="#research">
              <Button
                variant="outline"
                size="lg"
                className="px-6 sm:px-8 h-12 sm:h-13 text-sm sm:text-base gap-2 border-amber-400/20 bg-white/[0.06] backdrop-blur-md hover:bg-white/[0.08] hover:border-amber-400/30 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-[0_0_24px_-6px_rgba(212,168,83,0.15)] hover:scale-[1.02] w-full sm:w-auto"
              >
                <FileText className="size-4" />
                {t("home.hero.cta2")}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* אינדיקטור גלילה */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col items-center gap-2 text-amber-200/40"
        >
          <span className="text-[10px] uppercase tracking-[0.32em]">{t("home.hero.scroll")}</span>
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

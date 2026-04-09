"use client";

// סקשן ראשי — הירו פרימיום עם ריסון ואלגנטיות
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, FileText } from "lucide-react";
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
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* רקע — זוהרות עדינות ביותר, כמעט בלתי מורגשות */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: bgOpacity }}>
        <div
          className="absolute top-[15%] left-[15%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #1e3a7a, transparent)" }}
        />
        <div
          className="absolute top-[10%] right-[20%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #c9a84c, transparent)" }}
        />
        <div
          className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #1a4a8a, transparent)" }}
        />
      </motion.div>

      {/* קו עדין אופקי מתחת */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* תוכן מרכזי */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* תג עליון — מינימלי ומאופק */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-xs tracking-[0.15em] uppercase text-zinc-400 mb-10"
          >
            <span className="size-1.5 rounded-full bg-amber-400/70 animate-slow-pulse" />
            {t("home.hero.badge")}
          </motion.div>

          {/* כותרת ראשית — גדולה, בוטחת, ריווח נדיב */}
          <motion.h1
            style={{ y: titleY }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-[-0.02em] leading-[1.08] mb-8"
          >
            <span className="gradient-text">{title}</span>
          </motion.h1>

          {/* תת כותרת — מרווחת ונקייה */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-14 leading-[1.7] font-light"
          >
            {subtitle}
          </motion.p>

          {/* כפתורי CTA — מאופקים ואלגנטיים */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={ctaHref}>
              <Button
                size="lg"
                className="bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.1] hover:border-white/[0.18] px-8 h-13 text-sm tracking-wide gap-2.5 transition-all duration-500 backdrop-blur-sm"
              >
                {ctaText}
                <ArrowRight className="size-4 opacity-60" />
              </Button>
            </a>
            <a href="#research">
              <Button
                variant="ghost"
                size="lg"
                className="px-8 h-13 text-sm tracking-wide gap-2.5 text-zinc-400 hover:text-white/80 hover:bg-transparent transition-all duration-500"
              >
                <FileText className="size-4 opacity-50" />
                {t("home.hero.cta2")}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* אינדיקטור גלילה — עדין ודיסקרטי */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-zinc-600"
        >
          <span className="text-[10px] uppercase tracking-[0.25em]">{t("home.hero.scroll")}</span>
          <ArrowDown className="size-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

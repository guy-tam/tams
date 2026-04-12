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

// כדורים צפים ברקע — נשימה ותנועה
function FloatingOrb({
  size,
  color,
  x,
  y,
  delay,
}: {
  size: number;
  color: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: x,
        top: y,
      }}
      animate={{
        y: [0, -25, 0, 25, 0],
        x: [0, 15, 0, -15, 0],
        scale: [1, 1.08, 1, 0.92, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
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
      {/* שכבה 1 — קרן אור קלאסית (godray) עליונה */}
      <div aria-hidden="true" className="absolute inset-0 godray pointer-events-none" />

      {/* שכבה 2 — כדורים צפים: חיים ונשימה ברוקיים */}
      <div className="absolute inset-0">
        <FloatingOrb
          size={650}
          color="radial-gradient(circle, #1e3a7a, transparent)"
          x="10%"
          y="20%"
          delay={0}
        />
        <FloatingOrb
          size={500}
          color="radial-gradient(circle, #c9a84c, transparent)"
          x="60%"
          y="10%"
          delay={2}
        />
        <FloatingOrb
          size={440}
          color="radial-gradient(circle, #3b6fd4, transparent)"
          x="70%"
          y="60%"
          delay={4}
        />
        <FloatingOrb
          size={380}
          color="radial-gradient(circle, #1a4a8a, transparent)"
          x="20%"
          y="70%"
          delay={6}
        />
      </div>

      {/* שכבה 3 — דגן פיגמנט ציורי מעל הכדורים */}
      <div aria-hidden="true" className="absolute inset-0 texture-grain opacity-50 pointer-events-none mix-blend-overlay" />

      {/* שכבה 4 — וינייטה צ׳יארוסקורו למיקוד דרמטי */}
      <div aria-hidden="true" className="absolute inset-0 chiaroscuro pointer-events-none" />

      {/* תוכן מרכזי */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* תג עליון — מוזהב עם מסגרת */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-white/[0.06] backdrop-blur-md px-5 py-2 text-sm text-muted-foreground mb-8 shadow-[0_0_20px_-5px_rgba(212,168,83,0.12)]"
          >
            <span className="size-2 rounded-full bg-amber-400 animate-slow-pulse" />
            {t("home.hero.badge")}
          </motion.div>

          {/* פלרון קלאסי — עיטור זהב עדין מעל הכותרת */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="fleuron max-w-sm mx-auto mb-8"
          >
            <span />
          </motion.div>

          {/* כותרת ראשית — גופן מלכותי עם גרדיאנט חם */}
          <motion.h1
            style={{ y: titleY }}
            className="heading-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.15] mb-6 sm:mb-8"
          >
            <span className="gradient-text animate-text-glow">{title}</span>
          </motion.h1>

          {/* תת כותרת */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg lg:text-2xl text-muted-foreground/90 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light px-2 sm:px-0"
          >
            {subtitle}
          </motion.p>

          {/* כפתורי CTA — חיים עם זוהר */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
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
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-xs uppercase tracking-widest">{t("home.hero.scroll")}</span>
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

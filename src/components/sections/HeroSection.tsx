"use client";

// סקשן ראשי - הירו עם אנימציות ועיצוב דרמטי
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

// כדורים צפים ברקע - אלמנט עיצובי
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
        y: [0, -30, 0, 30, 0],
        x: [0, 20, 0, -20, 0],
        scale: [1, 1.1, 1, 0.9, 1],
      }}
      transition={{
        duration: 12,
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
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* רקע עם כדורים צפים */}
      <div className="absolute inset-0">
        <FloatingOrb
          size={500}
          color="radial-gradient(circle, #1e3a7a, transparent)"
          x="10%"
          y="20%"
          delay={0}
        />
        <FloatingOrb
          size={400}
          color="radial-gradient(circle, #d4a853, transparent)"
          x="60%"
          y="10%"
          delay={2}
        />
        <FloatingOrb
          size={350}
          color="radial-gradient(circle, #3b6fd4, transparent)"
          x="70%"
          y="60%"
          delay={4}
        />
        <FloatingOrb
          size={300}
          color="radial-gradient(circle, #1a4a8a, transparent)"
          x="20%"
          y="70%"
          delay={6}
        />
      </div>

      {/* תוכן מרכזי */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* תג עליון */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground mb-8"
          >
            <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
            {t("home.hero.badge")}
          </motion.div>

          {/* כותרת ראשית */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            <span className="gradient-text">{title}</span>
          </h1>

          {/* תת כותרת */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* כפתורי CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={ctaHref}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border-0 px-6 h-11 text-base gap-2 transition-all"
              >
                <Compass className="size-4" />
                {ctaText}
              </Button>
            </a>
            <a href="#research">
              <Button
                variant="outline"
                size="lg"
                className="px-6 h-11 text-base gap-2 border-gray-200 bg-gray-50 backdrop-blur-sm hover:bg-gray-100 hover:border-amber-400/40 transition-all"
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

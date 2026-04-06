"use client";

// סקשן CTA סופי - קריאה לפעולה עם כרטיסים
import { motion } from "framer-motion";
import { BookOpen, LayoutGrid, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// אנימציית כניסה מדורגת
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FinalCTASection() {
  const { t } = useLanguage();

  const ctaCards = [
    {
      icon: BookOpen,
      title: t("home.ctaCards.thesis.title"),
      description: t("home.ctaCards.thesis.description"),
      href: "/company",
      color: "#3b82f6",
    },
    {
      icon: LayoutGrid,
      title: t("home.ctaCards.architecture.title"),
      description: t("home.ctaCards.architecture.description"),
      href: "/architecture",
      color: "#8b5cf6",
    },
    {
      icon: TrendingUp,
      title: t("home.ctaCards.opportunity.title"),
      description: t("home.ctaCards.opportunity.description"),
      href: "/market-shift",
      color: "#06b6d4",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tams-blue/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-tams-purple/[0.06] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">{t("home.cta.title")}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("home.cta.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {ctaCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                href={card.href}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05] block"
              >
                {/* גלאו עליון */}
                <div
                  className="absolute -top-px left-4 right-4 h-px opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.color}40, transparent)`,
                  }}
                />

                {/* אייקון */}
                <div
                  className="mb-4 inline-flex items-center justify-center size-12 rounded-xl"
                  style={{ background: `${card.color}15` }}
                >
                  <Icon
                    className="size-6"
                    style={{ color: card.color }}
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>

                {/* חץ */}
                <div
                  className="mt-4 text-sm font-medium flex items-center gap-1 transition-transform group-hover:translate-x-1"
                  style={{ color: card.color }}
                >
                  Learn more
                  <span>&rarr;</span>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* דיסקליימר */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 text-center"
        >
          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-3xl mx-auto">
            {t("home.cta.disclaimer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

// סקשן CTA סופי — מאופק ואלגנטי
import { motion } from "framer-motion";
import { BookOpen, LayoutGrid, TrendingUp, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
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
      color: "#4f8ff7",
    },
    {
      icon: LayoutGrid,
      title: t("home.ctaCards.architecture.title"),
      description: t("home.ctaCards.architecture.description"),
      href: "/architecture",
      color: "#8ba4c4",
    },
    {
      icon: TrendingUp,
      title: t("home.ctaCards.opportunity.title"),
      description: t("home.ctaCards.opportunity.description"),
      href: "/market-shift",
      color: "#c9a84c",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.01em] text-white mb-5">
            {t("home.cta.title")}
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto leading-[1.7]">
            {t("home.cta.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20"
        >
          {ctaCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                href={card.href}
                variants={cardVariants}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04] block"
              >
                {/* אייקון */}
                <div
                  className="mb-5 inline-flex items-center justify-center size-11 rounded-xl"
                  style={{
                    background: `${card.color}08`,
                    border: `1px solid ${card.color}15`,
                  }}
                >
                  <Icon className="size-5" style={{ color: card.color, opacity: 0.7 }} />
                </div>

                <h3 className="text-base font-semibold text-white/90 mb-2 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-[1.7]">
                  {card.description}
                </p>

                {/* חץ */}
                <div className="mt-5 flex items-center gap-1.5 text-sm text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500">
                  {t("common.learnMore")}
                  <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-[11px] text-zinc-700 leading-relaxed max-w-2xl mx-auto">
            {t("home.cta.disclaimer")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

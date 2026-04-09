"use client";

// קטע חזון — חי ומוזהב עם גופן מלכותי
import { motion } from "framer-motion";
import { Rocket, Users, Globe2, Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import SectionHeader from "@/components/layout/SectionHeader";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function VisionSection() {
  const { t } = useLanguage();

  const visionCards = [
    {
      icon: Rocket,
      title: t("homeVision.blockchainFuture.title"),
      description: t("homeVision.blockchainFuture.description"),
      accentColor: "#4f8ff7",
    },
    {
      icon: Users,
      title: t("homeVision.investorFirst.title"),
      description: t("homeVision.investorFirst.description"),
      accentColor: "#d4a853",
    },
    {
      icon: Globe2,
      title: t("homeVision.globalAccess.title"),
      description: t("homeVision.globalAccess.description"),
      accentColor: "#c9952e",
    },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* רקע — זוהרות */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/[0.06] rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          badge={t("homeVision.badge")}
          title={t("homeVision.title")}
          subtitle={t("homeVision.subtitle")}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {visionCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="group relative rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:border-amber-500/25 hover:bg-white/[0.06] hover:shadow-[0_0_30px_-10px_rgba(212,168,83,0.08)] card-glow"
              >
                {/* קו גראדיינט עליון */}
                <div
                  className="absolute -top-px left-6 right-6 h-px opacity-60"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.accentColor}50, transparent)`,
                  }}
                />

                {/* אייקון */}
                <div
                  className="mb-5 inline-flex items-center justify-center size-14 rounded-xl"
                  style={{ background: `${card.accentColor}12` }}
                >
                  <Icon className="size-7" style={{ color: card.accentColor }} />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ציטוט — עם מסגרת מנורה */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="relative rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-8 sm:p-10">
            <Quote className="size-8 text-amber-500/30 mx-auto mb-4" />
            <blockquote className="text-lg sm:text-xl font-medium text-foreground leading-relaxed gradient-text font-serif-he">
              {t("homeVision.quote")}
            </blockquote>
            <div className="mt-4 text-sm text-muted-foreground">
              — TAMS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

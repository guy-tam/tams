"use client";

// קטע חזון - מיקום המשקיעים בחזית עולם הבלוקצ׳יין
import { motion } from "framer-motion";
import { Rocket, Users, Globe2, Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import SectionHeader from "@/components/layout/SectionHeader";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function VisionSection() {
  const { t, isRTL } = useLanguage();

  const visionCards = [
    {
      icon: Rocket,
      title: t("homeVision.blockchainFuture.title"),
      description: t("homeVision.blockchainFuture.description"),
      gradient: "from-tams-blue to-tams-cyan",
      accentColor: "#4f8ff7",
    },
    {
      icon: Users,
      title: t("homeVision.investorFirst.title"),
      description: t("homeVision.investorFirst.description"),
      gradient: "from-tams-purple to-tams-blue",
      accentColor: "#a78bfa",
    },
    {
      icon: Globe2,
      title: t("homeVision.globalAccess.title"),
      description: t("homeVision.globalAccess.description"),
      gradient: "from-tams-cyan to-tams-green",
      accentColor: "#22d3ee",
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* אלמנטי רקע */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-tams-blue/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tams-purple/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          badge={t("homeVision.badge")}
          title={t("homeVision.title")}
          subtitle={t("homeVision.subtitle")}
        />

        {/* כרטיסי חזון */}
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
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-6 sm:p-8 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] card-glow"
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

        {/* ציטוט */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-8 sm:p-10">
            <Quote className="size-8 text-tams-blue/30 mx-auto mb-4" />
            <blockquote className="text-lg sm:text-xl font-medium text-foreground leading-relaxed gradient-text">
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

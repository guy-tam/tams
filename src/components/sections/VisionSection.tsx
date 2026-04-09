"use client";

// קטע חזון — מאופק ומכובד
import { motion } from "framer-motion";
import { Rocket, Users, Globe2, Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import SectionHeader from "@/components/layout/SectionHeader";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
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
      accentColor: "#8ba4c4",
    },
    {
      icon: Globe2,
      title: t("homeVision.globalAccess.title"),
      description: t("homeVision.globalAccess.description"),
      accentColor: "#c9a84c",
    },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* רקע עדין */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/[0.03] rounded-full blur-[160px]" />
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
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14"
        >
          {visionCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-8 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                {/* אייקון */}
                <div
                  className="mb-5 inline-flex items-center justify-center size-11 rounded-xl"
                  style={{
                    background: `${card.accentColor}08`,
                    border: `1px solid ${card.accentColor}15`,
                  }}
                >
                  <Icon className="size-5" style={{ color: card.accentColor, opacity: 0.7 }} />
                </div>

                <h3 className="text-base font-semibold text-white/90 mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-[1.7]">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ציטוט */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 max-w-2xl mx-auto text-center"
        >
          <div className="relative">
            <Quote className="size-6 text-white/[0.1] mx-auto mb-5" />
            <blockquote className="text-lg sm:text-xl font-light text-zinc-300 leading-[1.7] italic font-serif-he">
              {t("homeVision.quote")}
            </blockquote>
            <div className="mt-5 h-px w-12 mx-auto bg-white/[0.08]" />
            <div className="mt-4 text-xs text-zinc-600 tracking-[0.1em] uppercase">
              TAMS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

// דף הצוות והמבנה הארגוני
import PageWrapper from "@/components/layout/PageWrapper";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  Server,
  ShieldCheck,
  Eye,
  Scale,
  Lock,
  Users,
  Mail,
  Building2,
} from "lucide-react";

// אנימציית כניסה עם השהייה מדורגת
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

// אייקונים ועיצוב עבור עמודי הארגון
const pillarMeta = [
  { icon: BookOpen, key: "research" as const, color: "#3b82f6" },
  { icon: TrendingUp, key: "trading" as const, color: "#8b5cf6" },
  { icon: Server, key: "infrastructure" as const, color: "#06b6d4" },
  { icon: ShieldCheck, key: "compliance" as const, color: "#10b981" },
];

// אייקונים עבור ערכי ליבה
const valueMeta = [
  { icon: Scale, key: "rigor" as const },
  { icon: Eye, key: "transparency" as const },
  { icon: Lock, key: "riskManagement" as const },
  { icon: ShieldCheck, key: "complianceFirst" as const },
];

export default function TeamPage() {
  const { t } = useLanguage();

  return (
    <PageWrapper bgGrid>
      {/* גיבור — כותרת ראשית */}
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-6">
            {t("team.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">{t("team.title")}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("team.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* חזון ומשימה */}
      <section className="py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-8 shadow-sm"
          >
            <div className="size-12 rounded-xl bg-tams-blue/15 flex items-center justify-center mb-5">
              <Eye className="size-6 text-tams-blue" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {t("team.vision.title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("team.vision.content")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-8 shadow-sm"
          >
            <div className="size-12 rounded-xl bg-tams-purple/15 flex items-center justify-center mb-5">
              <Building2 className="size-6 text-tams-purple" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {t("team.mission.title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("team.mission.content")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* עמודי הארגון */}
      <section className="py-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-4">
            {t("team.pillars.badge")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            {t("team.pillars.title")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t("team.pillars.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillarMeta.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.key}
                variants={fadeIn}
                className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6 shadow-sm text-center"
              >
                <div
                  className="size-14 rounded-2xl flex items-center justify-center mx-auto mb-5 border"
                  style={{
                    background: `${pillar.color}10`,
                    borderColor: `${pillar.color}25`,
                  }}
                >
                  <Icon className="size-7" style={{ color: pillar.color }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`team.pillars.${pillar.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`team.pillars.${pillar.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* מועצה מייעצת */}
      <section className="py-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-4">
            {t("team.advisory.badge")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            {t("team.advisory.title")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t("team.advisory.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-8 text-center"
        >
          <div className="size-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <Users className="size-8 text-amber-400" />
          </div>
          <p className="text-base text-foreground font-medium mb-3">
            {t("team.advisory.restricted")}
          </p>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t("team.advisory.restrictedDetails")}
          </p>
        </motion.div>
      </section>

      {/* ערכי ליבה */}
      <section className="py-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-4">
            {t("team.values.badge")}
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            {t("team.values.title")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            {t("team.values.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {valueMeta.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.key}
                variants={fadeIn}
                className="flex gap-5 items-start rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6 shadow-sm"
              >
                <div className="flex-shrink-0 size-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Icon className="size-6 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-1.5">
                    {t(`team.values.${value.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`team.values.${value.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* יצירת קשר */}
      <section className="py-16 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-8 text-center"
        >
          <div className="size-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="size-7 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-3">
            {t("team.contact.title")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-6">
            {t("team.contact.subtitle")}
          </p>
          <a
            href="mailto:contact@tams.earth"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/25 px-6 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-500/20 transition-colors"
          >
            <Mail className="size-4" />
            contact@tams.earth
          </a>
        </motion.div>
      </section>

      {/* הערה משפטית */}
      <section className="py-12 max-w-3xl mx-auto">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 text-center">
          <p className="text-xs text-muted-foreground/60 leading-relaxed">
            {t("team.disclaimer")}
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}

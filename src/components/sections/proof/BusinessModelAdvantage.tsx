"use client";

// יתרון המודל העסקי — TAMS כחברה מרובת מנועי רווח
import { motion } from "framer-motion";
import {
  Vault, TrendingUp, Coins, Repeat, ShieldCheck, Puzzle,
  ArrowDown, ArrowRight
} from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

const engines = [
  {
    icon: Vault,
    title: "Treasury Holding",
    description: "צבירה אסטרטגית של נכסים דיגיטליים ברמת תשתית באמצעות ממוצע עלות דולרי והקצאה מבוססת תזה. חשיפה ארוכת טווח לעליית הערך הנובעת מאימוץ טכנולוגיית blockchain.",
    color: "from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400",
    iconColor: "text-blue-400",
  },
  {
    icon: Coins,
    title: "DeFi Yield Deployment",
    description: "הפקת תשואה מקורית ברמת הפרוטוקול באמצעות staking, הלוואות ואספקת נזילות. מייצר הכנסה תפעולית מהנכסים המוחזקים במקום להשאירם ללא תנועה.",
    color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-400",
    iconColor: "text-emerald-400",
  },
  {
    icon: TrendingUp,
    title: "Active Trading Strategies",
    description: "מסחר כמותי ודיסקרציוני לאורך מחזורי שוק. לכידת אלפא בטווח הקצר-בינוני בעוד תיק הליבה צומח באמצעות אימוץ תשתיות.",
    color: "from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400",
    iconColor: "text-purple-400",
  },
  {
    icon: Repeat,
    title: "Conviction Basket Rotation",
    description: "איזון מחדש דינמי בין קטגוריות נכסים על בסיס אותות מאקרו, אבני דרך באימוץ ושינויים במשטר הסיכון. ניהול אקטיבי של הרכב התיק.",
    color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/20 text-cyan-400",
    iconColor: "text-cyan-400",
  },
  {
    icon: ShieldCheck,
    title: "Risk-Managed Allocation",
    description: "קביעת גודל פוזיציות, מגבלות ירידה וניהול מתאמים להגנה על ההון בתנאי תנודתיות שוק. תשתית ניהול סיכונים ברמה מוסדית על פני כלל האסטרטגיות.",
    color: "from-amber-500/20 to-amber-600/10 border-amber-200 text-amber-400",
    iconColor: "text-amber-400",
  },
  {
    icon: Puzzle,
    title: "Infrastructure Participation",
    description: "חשיפה עתידית אופציונלית לשירותי טוקניזציה, הפעלת מאמתים ושירותי blockchain מוסדיים. שכבת אופציונליות מתפתחת למודל התפעולי.",
    color: "from-rose-500/20 to-rose-600/10 border-rose-500/20 text-rose-400",
    iconColor: "text-rose-400",
  },
];

export default function BusinessModelAdvantage() {
  const { t, isRTL } = useLanguage();

  // מנועי רווח עם כותרות מתורגמות
  const engineTitles = [
    t("proof.businessModel.engineTreasuryTitle"),
    t("proof.businessModel.engineDefiTitle"),
    t("proof.businessModel.engineTradingTitle"),
    t("proof.businessModel.engineRotationTitle"),
    t("proof.businessModel.engineRiskTitle"),
    t("proof.businessModel.engineInfraTitle"),
  ];

  return (
    <section className="py-16 max-w-6xl mx-auto">
      <SectionHeader
        badge={t("proof.businessModel.badge")}
        title={t("proof.businessModel.title")}
        subtitle={t("proof.businessModel.subtitle")}
      />

      {/* גריד מנועים */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {engines.map((engine, i) => (
          <motion.div
            key={engine.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`rounded-xl bg-gradient-to-br ${engine.color} border p-5 hover:scale-[1.01] transition-transform duration-300`}
          >
            <engine.icon className={`h-6 w-6 ${engine.iconColor} mb-3`} />
            <h3 className="text-sm font-semibold text-white mb-2">{engineTitles[i]}</h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed">{engine.description}</p>
          </motion.div>
        ))}
      </div>

      {/* דיאגרמת זרימה פשוטה */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 rounded-xl border border-blue-500/[0.1] bg-white/[0.03] p-6"
      >
        <h3 className="text-sm font-semibold text-white mb-6 text-center">{t("proof.businessModel.valueCaptureFlow")}</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center">
          {[
            { label: t("proof.businessModel.flowStep1Label"), sub: t("proof.businessModel.flowStep1Sub") },
            { label: t("proof.businessModel.flowStep2Label"), sub: t("proof.businessModel.flowStep2Sub") },
            { label: t("proof.businessModel.flowStep3Label"), sub: t("proof.businessModel.flowStep3Sub") },
            { label: t("proof.businessModel.flowStep4Label"), sub: t("proof.businessModel.flowStep4Sub") },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 md:gap-4">
              <div className="rounded-lg border border-blue-500/[0.1] bg-white/[0.04] px-4 py-3 min-w-[160px]">
                <div className="text-xs font-medium text-white">{step.label}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{step.sub}</div>
              </div>
              {i < 3 && <ArrowRight className={`h-4 w-4 text-amber-500/60 shrink-0 hidden md:block ${isRTL ? "rotate-180" : ""}`} />}
              {i < 3 && <ArrowDown className="h-4 w-4 text-amber-500/60 shrink-0 md:hidden" />}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

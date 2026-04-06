"use client";

// מבנה שותפות LP/GP - הדמיה חזותית של מבנה הקרן
import { motion } from "framer-motion";
import {
  Users,
  UserCog,
  Laptop,
  Shield,
  Coins,
  BarChart3,
  Zap,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

// ערוצי השקעה
interface InvestmentChannel {
  id: string;
  icon: LucideIcon;
  title: string;
  color: string;
  details: string;
}

const investmentChannels: InvestmentChannel[] = [
  {
    id: "digital",
    icon: Coins,
    title: "נכסים דיגיטליים",
    color: "#3b82f6",
    details: "Staking, DeFi, קריפטו",
  },
  {
    id: "metals",
    icon: Shield,
    title: "מתכות יקרות",
    color: "#f59e0b",
    details: "זהב, כסף, נחושת",
  },
  {
    id: "managed",
    icon: BarChart3,
    title: "מסחר מנוהל",
    color: "#8b5cf6",
    details: "אסטרטגיות לטווח ארוך",
  },
  {
    id: "leverage",
    icon: Zap,
    title: "מינוף אסטרטגי",
    color: "#10b981",
    details: "הגדלת ערך הקרן",
  },
];

// אחריות GP
const gpResponsibilities = [
  "ניהול כלל ההשקעות",
  "מינוי צוות מקצועי",
  "ניהול סיכונים ובניית אסטרטגיה",
  "הקמת וניהול פלטפורמה דיגיטלית",
  "גיוס משקיעים חדשים",
];

// תכונות הפלטפורמה
const platformFeatures = [
  "חלוקת תיקי השקעות לקטגוריות",
  "ניהול דשבורדים אישיים",
  "שקיפות בזמן אמת",
  "גיבוי ואזור אישי",
];

// יתרונות LP
const lpBenefits = [
  "השקעה עם הגבלת אחריות",
  "דשבורד אישי ושקיפות מלאה",
  "ארנק דיגיטלי מאובטח (Ledger Flex)",
];

// אנימציות כניסה סדרתיות
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

export default function PartnershipStructure() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative max-w-5xl mx-auto"
      dir="rtl"
    >
      {/* GP - שותף כללי */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg rounded-2xl border border-tams-amber/20 bg-gradient-to-r from-tams-amber/5 to-tams-amber/[0.02] backdrop-blur-md p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-tams-amber to-amber-600 flex items-center justify-center shadow-lg shadow-tams-amber/20">
              <UserCog className="size-6 text-white" />
            </div>
            <div>
              <div className="text-base font-semibold text-foreground">
                GP — שותף כללי
              </div>
              <div className="text-sm text-muted-foreground">
                General Partner — מנהל הקרן
              </div>
            </div>
          </div>
          {/* אחריות */}
          <div className="space-y-1.5">
            {gpResponsibilities.map((item, j) => (
              <div
                key={j}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <div className="size-1.5 rounded-full flex-shrink-0 bg-tams-amber" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* קו חיבור GP לפלטפורמה */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <svg
          viewBox="0 0 40 60"
          className="h-12 w-10"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.line
            x1="20"
            y1="0"
            x2="20"
            y2="60"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
        </svg>
      </motion.div>

      {/* פלטפורמה - Fordefi */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg rounded-2xl border border-tams-blue/20 bg-tams-blue/5 backdrop-blur-md p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-tams-blue to-blue-600 flex items-center justify-center shadow-lg shadow-tams-blue/20">
              <Laptop className="size-6 text-white" />
            </div>
            <div>
              <div className="text-base font-semibold text-foreground">
                Fordefi Platform
              </div>
              <div className="text-sm text-muted-foreground">
                פלטפורמת ניהול ההשקעות
              </div>
            </div>
          </div>
          {/* תכונות */}
          <div className="grid grid-cols-2 gap-2">
            {platformFeatures.map((item, j) => (
              <div
                key={j}
                className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-xs text-muted-foreground"
              >
                <div className="size-1.5 rounded-full flex-shrink-0 bg-tams-blue" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* קו חיבור פלטפורמה ל-LP */}
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <svg
          viewBox="0 0 40 60"
          className="h-12 w-10"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.line
            x1="20"
            y1="0"
            x2="20"
            y2="60"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          />
        </svg>
      </motion.div>

      {/* LP - שותפים מוגבלים */}
      <motion.div variants={itemVariants} className="flex justify-center mb-8">
        <div className="relative w-full max-w-lg rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-md p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="size-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Users className="size-6 text-white" />
            </div>
            <div>
              <div className="text-base font-semibold text-foreground">
                LPs — שותפים מוגבלים
              </div>
              <div className="text-sm text-muted-foreground">
                Limited Partners — המשקיעים
              </div>
            </div>
          </div>
          {/* יתרונות */}
          <div className="space-y-1.5">
            {lpBenefits.map((item, j) => (
              <div
                key={j}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <div className="size-1.5 rounded-full flex-shrink-0 bg-purple-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* קווי חלוקה לערוצי השקעה */}
      <motion.div variants={itemVariants} className="relative mb-6">
        <svg
          viewBox="0 0 1000 80"
          className="w-full h-20"
          preserveAspectRatio="xMidYMid meet"
        >
          {investmentChannels.map((ch, i) => {
            const x = 125 + i * 250;
            return (
              <motion.path
                key={ch.id}
                d={`M 500 0 Q 500 40, ${x} 80`}
                fill="none"
                stroke={ch.color}
                strokeWidth="1.5"
                strokeOpacity="0.4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.15 }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* ערוצי השקעה - 4 כרטיסים */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {investmentChannels.map((ch, i) => {
          const Icon = ch.icon;
          return (
            <motion.div
              key={ch.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-5 text-center transition-colors hover:border-white/[0.12]"
            >
              {/* פס צבעוני עליון */}
              <div
                className="absolute top-0 left-4 right-4 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${ch.color}60, transparent)`,
                }}
              />

              {/* אייקון */}
              <div
                className="mx-auto mb-3 inline-flex items-center justify-center size-10 rounded-xl"
                style={{ background: `${ch.color}15` }}
              >
                <Icon className="size-5" style={{ color: ch.color }} />
              </div>

              {/* שם */}
              <div className="text-sm font-semibold text-foreground mb-1">
                {ch.title}
              </div>

              {/* תיאור */}
              <div className="text-xs text-muted-foreground">{ch.details}</div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

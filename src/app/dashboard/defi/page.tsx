"use client";

// עמוד פוזיציות DeFi - סטייקינג, הלוואות ונזילות
import { motion } from "framer-motion";
import { Layers, TrendingUp, Coins, Lock, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { defiPositions } from "@/data/dashboard-mock";

// מפת תרגומים - כל הטקסטים הנראים בכל 5 השפות
const texts = {
  en: {
    pageTitle: "DeFi Positions",
    pageSubtitle: "Staking, lending & liquidity — concept only",
    positions: "Positions",
    totalActivePositions: "Total active positions",
    avgApy: "Average yield",
    active: "Active",
    activePositions: "Active positions",
    protocol: "Protocol",
    type: "Type",
    asset: "Asset",
    deposited: "Deposited",
    apy: "APY",
    earned: "Accrued profit",
    statusActive: "Active",
    statusLocked: "Locked",
    staking: "Staking",
    lending: "Lending",
    lp: "LP",
  },
  he: {
    pageTitle: "פוזיציות DeFi",
    pageSubtitle: "סטייקינג, הלוואות ונזילות — קונספט בלבד",
    positions: "פוזיציות",
    totalActivePositions: 'סה"כ פוזיציות פעילות',
    avgApy: "תשואה ממוצעת",
    active: "פעילות",
    activePositions: "פוזיציות פעילות",
    protocol: "פרוטוקול",
    type: "סוג",
    asset: "נכס",
    deposited: "מופקד",
    apy: "APY",
    earned: "רווח שנצבר",
    statusActive: "פעיל",
    statusLocked: "נעול",
    staking: "סטייקינג",
    lending: "הלוואות",
    lp: "LP",
  },
  ar: {
    pageTitle: "مراكز DeFi",
    pageSubtitle: "التخزين والإقراض والسيولة — مفهوم فقط",
    positions: "مراكز",
    totalActivePositions: "إجمالي المراكز النشطة",
    avgApy: "متوسط العائد",
    active: "نشطة",
    activePositions: "مراكز نشطة",
    protocol: "البروتوكول",
    type: "النوع",
    asset: "الأصل",
    deposited: "المودع",
    apy: "APY",
    earned: "الأرباح المتراكمة",
    statusActive: "نشط",
    statusLocked: "مقفل",
    staking: "تخزين",
    lending: "إقراض",
    lp: "LP",
  },
  ru: {
    pageTitle: "Позиции DeFi",
    pageSubtitle: "Стейкинг, кредитование и ликвидность — только концепт",
    positions: "Позиции",
    totalActivePositions: "Всего активных позиций",
    avgApy: "Средняя доходность",
    active: "Активные",
    activePositions: "Активные позиции",
    protocol: "Протокол",
    type: "Тип",
    asset: "Актив",
    deposited: "Внесено",
    apy: "APY",
    earned: "Накопленная прибыль",
    statusActive: "Активен",
    statusLocked: "Заблокирован",
    staking: "Стейкинг",
    lending: "Кредитование",
    lp: "LP",
  },
  es: {
    pageTitle: "Posiciones DeFi",
    pageSubtitle: "Staking, préstamos y liquidez — solo concepto",
    positions: "Posiciones",
    totalActivePositions: "Total de posiciones activas",
    avgApy: "Rendimiento promedio",
    active: "Activas",
    activePositions: "Posiciones activas",
    protocol: "Protocolo",
    type: "Tipo",
    asset: "Activo",
    deposited: "Depositado",
    apy: "APY",
    earned: "Ganancia acumulada",
    statusActive: "Activo",
    statusLocked: "Bloqueado",
    staking: "Staking",
    lending: "Préstamos",
    lp: "LP",
  },
} as const;

// אנימציות
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// חישוב ממוצע APY
const avgApy =
  defiPositions.reduce((s, p) => s + p.apy, 0) / defiPositions.length;

// אייקון סוג פוזיציה
function getTypeIcon(type: string) {
  switch (type) {
    case "staking":
      return <Layers className="size-4" />;
    case "lending":
      return <Coins className="size-4" />;
    case "lp":
      return <Zap className="size-4" />;
    default:
      return <Layers className="size-4" />;
  }
}

export default function DefiPage() {
  const { language } = useLanguage();
  const t = texts[language] || texts.en;

  // תווית סוג פוזיציה בשפה הנוכחית
  function getTypeLabel(type: string) {
    switch (type) {
      case "staking":
        return t.staking;
      case "lending":
        return t.lending;
      case "lp":
        return t.lp;
      default:
        return type;
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6">
      {/* כותרת */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {t.pageTitle}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t.pageSubtitle}
        </p>
      </motion.div>

      {/* כרטיסי סיכום */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md p-5 group relative overflow-hidden"
        >
          <div className="absolute -top-px -left-px -right-px h-px opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-l from-transparent via-blue-500/40 to-transparent" />
          <div className="size-10 rounded-xl bg-blue-500/15 flex items-center justify-center mb-3">
            <Layers className="size-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {defiPositions.length} {t.positions}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {t.totalActivePositions}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md p-5 group relative overflow-hidden"
        >
          <div className="absolute -top-px -left-px -right-px h-px opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-l from-transparent via-emerald-500/40 to-transparent" />
          <div className="size-10 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-3">
            <TrendingUp className="size-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            ~{avgApy.toFixed(1)}% APY
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {t.avgApy}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md p-5 group relative overflow-hidden"
        >
          <div className="absolute -top-px -left-px -right-px h-px opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-l from-transparent via-amber-500/40 to-transparent" />
          <div className="size-10 rounded-xl bg-amber-500/15 flex items-center justify-center mb-3">
            <Coins className="size-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">
            {defiPositions.filter((p) => p.status === "active").length} {t.active}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {t.activePositions}
          </div>
        </motion.div>
      </motion.div>

      {/* רשת פוזיציות */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {defiPositions.map((pos, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md p-5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05]"
          >
            {/* גלאו עליון */}
            <div
              className="absolute -top-px -left-px -right-px h-px opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${pos.color}40, transparent)`,
              }}
            />

            {/* כותרת - פרוטוקול וסוג */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="size-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${pos.color}15` }}
                >
                  <span style={{ color: pos.color }}>
                    {getTypeIcon(pos.type)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {pos.protocol}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {getTypeLabel(pos.type)}
                  </div>
                </div>
              </div>
              {/* סטטוס */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  pos.status === "active"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-amber-500/15 text-amber-400"
                }`}
              >
                {pos.status === "locked" && <Lock className="size-2.5" />}
                {pos.status === "active" ? t.statusActive : t.statusLocked}
              </span>
            </div>

            {/* נכס */}
            <div className="text-xs text-muted-foreground mb-3">
              {t.asset}:{" "}
              <span className="text-foreground font-medium">{pos.asset}</span>
            </div>

            {/* נתונים */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t.deposited}</span>
                <span className="text-foreground font-mono">
                  {pos.deposited}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t.apy}</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {pos.apy}%
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{t.earned}</span>
                <span className="text-foreground font-mono">{pos.earned}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

"use client";

// טבלת פורטפוליו מפורטת - הקצאת נכסים עם תמיכה רב-לשונית
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Shield, Coins, Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// סה"כ השקעה
const TOTAL = 10_000_000;

// צבעים לקטגוריות
const categoryColors = [
  "#3b82f6", // תשלומים ותעבורה
  "#8b5cf6", // חוזים חכמים
  "#3b82f6", // תשתיות חיבור
  "#10b981", // סקיילינג
  "#f59e0b", // דאטה ואחסון
  "#f43f5e", // DeFi
  "#ec4899", // פרטיות / זהות
] as const;

// מבנה נכס בודד
interface Asset {
  ticker: string;
  amount: number;
}

// מבנה קטגוריה בסיסי
interface CategoryBase {
  percent: number;
  amount: number;
  color: string;
  assets: Asset[];
}

// קטגוריות בסיסיות - ללא טקסט
const categoriesBase: CategoryBase[] = [
  {
    percent: 27,
    amount: 1_836_000,
    color: categoryColors[0],
    assets: [
      { ticker: "XRP", amount: 1_100_000 },
      { ticker: "XLM", amount: 368_000 },
      { ticker: "XDC", amount: 368_000 },
    ],
  },
  {
    percent: 36,
    amount: 2_448_000,
    color: categoryColors[1],
    assets: [
      { ticker: "SOL", amount: 400_000 },
      { ticker: "ADA", amount: 400_000 },
      { ticker: "AVAX", amount: 400_000 },
      { ticker: "HBAR", amount: 400_000 },
      { ticker: "ONDO", amount: 800_000 },
      { ticker: "HOLO", amount: 48_000 },
    ],
  },
  {
    percent: 14,
    amount: 952_000,
    color: categoryColors[2],
    assets: [
      { ticker: "LINK", amount: 350_000 },
      { ticker: "QNT", amount: 352_000 },
      { ticker: "FLR", amount: 250_000 },
    ],
  },
  {
    percent: 7,
    amount: 476_000,
    color: categoryColors[3],
    assets: [
      { ticker: "MATIC", amount: 238_000 },
      { ticker: "ARB", amount: 238_000 },
    ],
  },
  {
    percent: 7,
    amount: 476_000,
    color: categoryColors[4],
    assets: [
      { ticker: "FIL", amount: 238_000 },
      { ticker: "AR", amount: 238_000 },
    ],
  },
  {
    percent: 14,
    amount: 952_000,
    color: categoryColors[5],
    assets: [
      { ticker: "AAVE", amount: 550_000 },
      { ticker: "MKR", amount: 402_000 },
    ],
  },
  {
    percent: 5,
    amount: 340_000,
    color: categoryColors[6],
    assets: [
      { ticker: "WLD / Civic", amount: 240_000 },
      { ticker: "XMR", amount: 100_000 },
    ],
  },
];

// מפת תרגומים
const texts = {
  en: {
    badge: "Portfolio Allocation",
    total: "Total:",
    safeAssets: "Safe Assets",
    digitalAssets: "Digital Assets",
    safeAssetsSection: "Safe Assets — 32%",
    digitalAssetsSection: "Digital Assets — 68%",
    goldSilverCopper: "Gold / Silver / Copper",
    note: "In the digital world, assets continue to work and generate income — Staking, lending, issuance. This is a \"working asset\" and not a static asset.",
    categories: [
      "Payments & Transfer",
      "Smart Contracts / Institutions",
      "Connection Infrastructure & Data",
      "Scaling",
      "Data & Storage",
      "DeFi",
      "Privacy / Identity",
    ],
  },
  he: {
    badge: "הקצאת פורטפוליו",
    total: 'סה"כ:',
    safeAssets: "נכסים בטוחים",
    digitalAssets: "נכסים דיגיטליים",
    safeAssetsSection: "נכסים בטוחים — 32%",
    digitalAssetsSection: "נכסים דיגיטליים — 68%",
    goldSilverCopper: "זהב / כסף / נחושת",
    note: 'בעולם הדיגיטלי הנכסים ממשיכים לעבוד ולהניב הכנסה — Staking, הלוואות, הנפקה. זהו "נכס עובד" ולא נכס סטטי.',
    categories: [
      "תשלומים ותעבורה",
      "חוזים חכמים / מוסדות",
      "תשתיות חיבור ונתונים",
      "סקיילינג",
      "דאטה ואחסון",
      "DeFi",
      "פרטיות / זהות",
    ],
  },
  ar: {
    badge: "توزيع المحفظة",
    total: "الإجمالي:",
    safeAssets: "أصول آمنة",
    digitalAssets: "أصول رقمية",
    safeAssetsSection: "أصول آمنة — 32%",
    digitalAssetsSection: "أصول رقمية — 68%",
    goldSilverCopper: "ذهب / فضة / نحاس",
    note: "في العالم الرقمي تستمر الأصول بالعمل وتوليد الدخل — Staking، إقراض، إصدار. هذا \"أصل عامل\" وليس أصلاً ثابتاً.",
    categories: [
      "المدفوعات والتحويلات",
      "العقود الذكية / المؤسسات",
      "بنية تحتية للربط والبيانات",
      "التوسع",
      "البيانات والتخزين",
      "DeFi",
      "الخصوصية / الهوية",
    ],
  },
  ru: {
    badge: "Распределение портфеля",
    total: "Итого:",
    safeAssets: "Безопасные активы",
    digitalAssets: "Цифровые активы",
    safeAssetsSection: "Безопасные активы — 32%",
    digitalAssetsSection: "Цифровые активы — 68%",
    goldSilverCopper: "Золото / серебро / медь",
    note: "В цифровом мире активы продолжают работать и приносить доход — Staking, кредитование, эмиссия. Это «работающий актив», а не статичный.",
    categories: [
      "Платежи и переводы",
      "Смарт-контракты / Институты",
      "Инфраструктура связи и данных",
      "Масштабирование",
      "Данные и хранение",
      "DeFi",
      "Конфиденциальность / Идентификация",
    ],
  },
  es: {
    badge: "Asignación de portafolio",
    total: "Total:",
    safeAssets: "Activos seguros",
    digitalAssets: "Activos digitales",
    safeAssetsSection: "Activos seguros — 32%",
    digitalAssetsSection: "Activos digitales — 68%",
    goldSilverCopper: "Oro / Plata / Cobre",
    note: "En el mundo digital, los activos continúan trabajando y generando ingresos — Staking, préstamos, emisión. Este es un \"activo productivo\" y no un activo estático.",
    categories: [
      "Pagos y transferencias",
      "Contratos inteligentes / Instituciones",
      "Infraestructura de conexión y datos",
      "Escalabilidad",
      "Datos y almacenamiento",
      "DeFi",
      "Privacidad / Identidad",
    ],
  },
};

// פורמט מספרים
function formatILS(amount: number): string {
  return amount.toLocaleString("he-IL") + " ₪";
}

// אנימציית כניסה מדורגת
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

// רכיב קטגוריה מתרחבת
function CategoryRow({ category, name }: { category: CategoryBase; name: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={rowVariants} className="overflow-hidden">
      {/* שורת קטגוריה */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.06] hover:border-amber-500/15 transition-colors text-right relative overflow-hidden group"
      >
        {/* פס צבעוני בצד ימין */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1 rounded-r-xl"
          style={{ background: category.color }}
        />

        {/* פס אחוזים ברקע */}
        <div
          className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity"
          style={{
            background: `linear-gradient(to left, ${category.color}, transparent ${100 - category.percent}%)`,
          }}
        />

        {/* חץ פתיחה/סגירה */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="size-4 text-muted-foreground" />
        </motion.div>

        {/* שם הקטגוריה */}
        <div className="flex-1 flex items-center gap-3 mr-2">
          <div
            className="size-2.5 rounded-full shrink-0"
            style={{ background: category.color }}
          />
          <span className="text-sm font-semibold text-foreground">
            {name}
          </span>
        </div>

        {/* אחוז */}
        <span
          className="text-sm font-bold shrink-0"
          style={{ color: category.color }}
        >
          {category.percent}%
        </span>

        {/* סכום */}
        <span className="text-sm text-muted-foreground shrink-0 min-w-[120px] text-left">
          {formatILS(category.amount)}
        </span>
      </button>

      {/* נכסים פנימיים - מתרחב */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" as const }}
            className="overflow-hidden"
          >
            <div className="pr-10 pl-4 py-2 space-y-1">
              {category.assets.map((asset, i) => (
                <motion.div
                  key={asset.ticker}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="size-1.5 rounded-full"
                      style={{ background: category.color, opacity: 0.6 }}
                    />
                    <span
                      className="text-sm font-bold"
                      style={{ color: category.color }}
                    >
                      {asset.ticker}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatILS(asset.amount)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DetailedPortfolioTable() {
  const { language } = useLanguage();
  const t = texts[language] || texts.en;

  return (
    <section className="w-full max-w-3xl mx-auto">
      {/* כותרת */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-amber-500/15 bg-amber-500/10 px-4 py-1.5">
          <Coins className="size-4 text-amber-400" />
          <span className="text-sm text-muted-foreground">{t.badge}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {t.total}{" "}
          <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
            {formatILS(TOTAL)}
          </span>
        </h2>
      </motion.div>

      {/* פסי חלוקה ראשיים — נכסים בטוחים מול דיגיטליים */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* נכסים בטוחים */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-md p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="size-4 text-amber-400" />
              <span className="text-sm font-semibold text-foreground">
                {t.safeAssets}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-amber-400">32%</span>
              <span className="text-xs text-muted-foreground">
                {formatILS(3_200_000)}
              </span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "32%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"
            />
          </div>
        </div>

        {/* נכסים דיגיטליים */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-md p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Coins className="size-4 text-blue-400" />
              <span className="text-sm font-semibold text-foreground">
                {t.digitalAssets}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-blue-400">68%</span>
              <span className="text-xs text-muted-foreground">
                {formatILS(6_800_000)}
              </span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "68%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
      </motion.div>

      {/* סקשן נכסים בטוחים */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-2">
          <Shield className="size-4" />
          {t.safeAssetsSection} ({formatILS(3_200_000)})
        </h3>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-md p-4 relative overflow-hidden">
          {/* פס צבעוני */}
          <div className="absolute right-0 top-0 bottom-0 w-1 rounded-r-xl bg-amber-400" />
          <div className="flex items-center justify-between mr-3">
            <span className="text-sm font-semibold text-foreground">
              {t.goldSilverCopper}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatILS(3_200_000)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* סקשן נכסים דיגיטליים */}
      <div className="mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-base font-bold text-blue-400 mb-3 flex items-center gap-2"
        >
          <Coins className="size-4" />
          {t.digitalAssetsSection} ({formatILS(6_800_000)})
        </motion.h3>

        {/* רשימת קטגוריות מתרחבות */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="space-y-2"
        >
          {categoriesBase.map((category, index) => (
            <CategoryRow key={index} category={category} name={t.categories[index]} />
          ))}
        </motion.div>
      </div>

      {/* הערה תחתונה */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-md p-4 flex gap-3 items-start"
      >
        <Info className="size-5 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.note}
        </p>
      </motion.div>
    </section>
  );
}

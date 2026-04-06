"use client";

// מבנה שותפות LP/GP - הדמיה חזותית של מבנה הקרן עם תמיכה רב-לשונית
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
import { useLanguage } from "@/lib/i18n";

// מבנה ערוץ השקעה
interface InvestmentChannel {
  id: string;
  icon: LucideIcon;
  color: string;
}

// ערוצי השקעה - ללא טקסט קבוע
const investmentChannelsBase: InvestmentChannel[] = [
  { id: "digital", icon: Coins, color: "#3b82f6" },
  { id: "metals", icon: Shield, color: "#f59e0b" },
  { id: "managed", icon: BarChart3, color: "#8b5cf6" },
  { id: "leverage", icon: Zap, color: "#10b981" },
];

// מפת תרגומים לכל הטקסטים בקומפוננטה
const texts = {
  en: {
    gpTitle: "GP — General Partner",
    gpSubtitle: "General Partner — Fund Manager",
    gpResponsibilities: [
      "Management of all investments",
      "Appointment of professional team",
      "Risk management and strategy building",
      "Establishment and management of digital platform",
      "Recruitment of new investors",
    ],
    platformTitle: "Fordefi Platform",
    platformSubtitle: "Investment management platform",
    platformFeatures: [
      "Portfolio categorization",
      "Personal dashboard management",
      "Real-time transparency",
      "Backup and personal area",
    ],
    lpTitle: "LPs — Limited Partners",
    lpSubtitle: "Limited Partners — Investors",
    lpBenefits: [
      "Investment with limited liability",
      "Personal dashboard and full transparency",
      "Secured digital wallet (Ledger Flex)",
    ],
    channels: [
      { title: "Digital Assets", details: "Staking, DeFi, Crypto" },
      { title: "Precious Metals", details: "Gold, Silver, Copper" },
      { title: "Managed Trading", details: "Long-term strategies" },
      { title: "Strategic Leverage", details: "Fund value enhancement" },
    ],
  },
  he: {
    gpTitle: "GP — שותף כללי",
    gpSubtitle: "General Partner — מנהל הקרן",
    gpResponsibilities: [
      "ניהול כלל ההשקעות",
      "מינוי צוות מקצועי",
      "ניהול סיכונים ובניית אסטרטגיה",
      "הקמת וניהול פלטפורמה דיגיטלית",
      "גיוס משקיעים חדשים",
    ],
    platformTitle: "Fordefi Platform",
    platformSubtitle: "פלטפורמת ניהול ההשקעות",
    platformFeatures: [
      "חלוקת תיקי השקעות לקטגוריות",
      "ניהול דשבורדים אישיים",
      "שקיפות בזמן אמת",
      "גיבוי ואזור אישי",
    ],
    lpTitle: "LPs — שותפים מוגבלים",
    lpSubtitle: "Limited Partners — המשקיעים",
    lpBenefits: [
      "השקעה עם הגבלת אחריות",
      "דשבורד אישי ושקיפות מלאה",
      "ארנק דיגיטלי מאובטח (Ledger Flex)",
    ],
    channels: [
      { title: "נכסים דיגיטליים", details: "Staking, DeFi, קריפטו" },
      { title: "מתכות יקרות", details: "זהב, כסף, נחושת" },
      { title: "מסחר מנוהל", details: "אסטרטגיות לטווח ארוך" },
      { title: "מינוף אסטרטגי", details: "הגדלת ערך הקרן" },
    ],
  },
  ar: {
    gpTitle: "GP — الشريك العام",
    gpSubtitle: "General Partner — مدير الصندوق",
    gpResponsibilities: [
      "إدارة جميع الاستثمارات",
      "تعيين فريق مهني",
      "إدارة المخاطر وبناء الاستراتيجية",
      "إنشاء وإدارة المنصة الرقمية",
      "استقطاب مستثمرين جدد",
    ],
    platformTitle: "Fordefi Platform",
    platformSubtitle: "منصة إدارة الاستثمارات",
    platformFeatures: [
      "تصنيف المحافظ الاستثمارية",
      "إدارة لوحات تحكم شخصية",
      "شفافية في الوقت الفعلي",
      "نسخ احتياطي ومنطقة شخصية",
    ],
    lpTitle: "LPs — الشركاء المحدودون",
    lpSubtitle: "Limited Partners — المستثمرون",
    lpBenefits: [
      "استثمار بمسؤولية محدودة",
      "لوحة تحكم شخصية وشفافية كاملة",
      "محفظة رقمية مؤمّنة (Ledger Flex)",
    ],
    channels: [
      { title: "أصول رقمية", details: "Staking, DeFi, عملات مشفرة" },
      { title: "معادن ثمينة", details: "ذهب، فضة، نحاس" },
      { title: "تداول مُدار", details: "استراتيجيات طويلة الأمد" },
      { title: "رافعة استراتيجية", details: "تعزيز قيمة الصندوق" },
    ],
  },
  ru: {
    gpTitle: "GP — Генеральный партнёр",
    gpSubtitle: "General Partner — Управляющий фондом",
    gpResponsibilities: [
      "Управление всеми инвестициями",
      "Назначение профессиональной команды",
      "Управление рисками и построение стратегии",
      "Создание и управление цифровой платформой",
      "Привлечение новых инвесторов",
    ],
    platformTitle: "Fordefi Platform",
    platformSubtitle: "Платформа управления инвестициями",
    platformFeatures: [
      "Категоризация инвестиционных портфелей",
      "Управление персональными дашбордами",
      "Прозрачность в реальном времени",
      "Резервное копирование и личный кабинет",
    ],
    lpTitle: "LPs — Ограниченные партнёры",
    lpSubtitle: "Limited Partners — Инвесторы",
    lpBenefits: [
      "Инвестиции с ограниченной ответственностью",
      "Персональный дашборд и полная прозрачность",
      "Защищённый цифровой кошелёк (Ledger Flex)",
    ],
    channels: [
      { title: "Цифровые активы", details: "Staking, DeFi, Крипто" },
      { title: "Драгоценные металлы", details: "Золото, серебро, медь" },
      { title: "Управляемая торговля", details: "Долгосрочные стратегии" },
      { title: "Стратегический леверидж", details: "Увеличение стоимости фонда" },
    ],
  },
  es: {
    gpTitle: "GP — Socio General",
    gpSubtitle: "General Partner — Administrador del fondo",
    gpResponsibilities: [
      "Gestión de todas las inversiones",
      "Designación de equipo profesional",
      "Gestión de riesgos y construcción de estrategia",
      "Creación y gestión de plataforma digital",
      "Captación de nuevos inversores",
    ],
    platformTitle: "Fordefi Platform",
    platformSubtitle: "Plataforma de gestión de inversiones",
    platformFeatures: [
      "Categorización de portafolios de inversión",
      "Gestión de paneles personales",
      "Transparencia en tiempo real",
      "Respaldo y área personal",
    ],
    lpTitle: "LPs — Socios Limitados",
    lpSubtitle: "Limited Partners — Los inversores",
    lpBenefits: [
      "Inversión con responsabilidad limitada",
      "Panel personal y transparencia total",
      "Billetera digital segura (Ledger Flex)",
    ],
    channels: [
      { title: "Activos digitales", details: "Staking, DeFi, Cripto" },
      { title: "Metales preciosos", details: "Oro, plata, cobre" },
      { title: "Trading gestionado", details: "Estrategias a largo plazo" },
      { title: "Apalancamiento estratégico", details: "Aumento del valor del fondo" },
    ],
  },
};

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
  const { language, isRTL } = useLanguage();
  const t = texts[language] || texts.en;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative max-w-5xl mx-auto"
      dir={isRTL ? "rtl" : "ltr"}
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
                {t.gpTitle}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.gpSubtitle}
              </div>
            </div>
          </div>
          {/* אחריות */}
          <div className="space-y-1.5">
            {t.gpResponsibilities.map((item, j) => (
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
                {t.platformTitle}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.platformSubtitle}
              </div>
            </div>
          </div>
          {/* תכונות */}
          <div className="grid grid-cols-2 gap-2">
            {t.platformFeatures.map((item, j) => (
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
                {t.lpTitle}
              </div>
              <div className="text-sm text-muted-foreground">
                {t.lpSubtitle}
              </div>
            </div>
          </div>
          {/* יתרונות */}
          <div className="space-y-1.5">
            {t.lpBenefits.map((item, j) => (
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
          {investmentChannelsBase.map((ch, i) => {
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
        {investmentChannelsBase.map((ch, i) => {
          const Icon = ch.icon;
          const channelText = t.channels[i];
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
                {channelText.title}
              </div>

              {/* תיאור */}
              <div className="text-xs text-muted-foreground">{channelText.details}</div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

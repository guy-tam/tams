"use client";

// דף הגדרות - פרופיל, העדפות, אבטחה
import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Hash,
  Shield,
  Bell,
  BellOff,
  Globe,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLanguage, type Language } from "@/lib/i18n";

// אנימציות
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// רכיב טוגל
function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
        enabled ? "bg-emerald-500/30" : "bg-gray-100"
      }`}
    >
      <div
        className={`size-4 rounded-full transition-transform ${
          enabled
            ? "translate-x-5 bg-emerald-400"
            : "translate-x-0 bg-white/20"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const { language, setLanguage: setAppLanguage } = useLanguage();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [defiAlerts, setDefiAlerts] = useState(true);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl space-y-6">
      {/* כותרת */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          הגדרות
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          ניהול פרופיל, העדפות ואבטחה
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* פרופיל */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-gray-200 bg-white backdrop-blur-md p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="size-5 text-blue-400" />
            פרופיל
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: User,
                label: "שם מלא",
                value: user?.name || "Israel Blockchain Investor",
              },
              {
                icon: Mail,
                label: "אימייל",
                value: user?.email || "investor@tams-concept.io",
              },
              {
                icon: Hash,
                label: "מזהה משקיע",
                value: user?.investorId || "TAMS-2026-IL-0042",
              },
              {
                icon: Shield,
                label: "תפקיד",
                value: user?.role === "admin" ? "מנהל" : "משקיע",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className="size-3.5 text-blue-300/50" />
                  <span className="text-[10px] text-blue-300/50 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* העדפות */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-gray-200 bg-white backdrop-blur-md p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="size-5 text-amber-400" />
            העדפות
          </h2>
          <div className="space-y-4">
            {/* בחירת שפה */}
            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <div className="flex items-center gap-3">
                <Globe className="size-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-foreground">שפה</div>
                  <div className="text-xs text-muted-foreground">
                    בחירת שפת ממשק
                  </div>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setAppLanguage(e.target.value as Language)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/20"
              >
                <option value="he">עברית</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="ru">Русский</option>
                <option value="es">Espanol</option>
              </select>
            </div>

            {/* התראות */}
            {[
              {
                icon: Bell,
                label: "התראות אימייל",
                desc: "עדכונים שוטפים לתיבת הדואר",
                enabled: emailNotifications,
                onChange: setEmailNotifications,
              },
              {
                icon: BellOff,
                label: "התראות דחיפה",
                desc: "התראות בזמן אמת לנייד",
                enabled: pushNotifications,
                onChange: setPushNotifications,
              },
              {
                icon: Bell,
                label: "התראות מחיר",
                desc: "עדכון בשינויי מחיר משמעותיים",
                enabled: priceAlerts,
                onChange: setPriceAlerts,
              },
              {
                icon: Bell,
                label: "התראות DeFi",
                desc: "עדכוני תשואות ופוזיציות DeFi",
                enabled: defiAlerts,
                onChange: setDefiAlerts,
              },
            ].map((pref, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <pref.icon className="size-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {pref.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {pref.desc}
                    </div>
                  </div>
                </div>
                <Toggle enabled={pref.enabled} onChange={pref.onChange} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* אבטחה */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-gray-200 bg-white backdrop-blur-md p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lock className="size-5 text-amber-400" />
            אבטחה
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <div className="text-sm font-medium text-foreground mb-1">
                שינוי סיסמה
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                עדכון סיסמת הכניסה לחשבון
              </div>
              <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-blue-300/60 hover:text-blue-200 transition-colors">
                עדכון
              </button>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
              <div className="text-sm font-medium text-foreground mb-1">
                אימות דו-שלבי (2FA)
              </div>
              <div className="text-xs text-muted-foreground mb-3">
                שכבת אבטחה נוספת בכניסה
              </div>
              <button className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors">
                הפעל 2FA
              </button>
            </div>
          </div>
        </motion.div>

        {/* הערת קונספט */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-amber-200 bg-amber-50 backdrop-blur-md p-5"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-foreground mb-1">
                הערה חשובה
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                זוהי אפליקציית קונספט בלבד. כל הנתונים המוצגים הם לדוגמה
                ואינם מייצגים תיק השקעות אמיתי. אין לראות בתכנים אלו ייעוץ
                השקעות או המלצה פיננסית מכל סוג שהוא. TAMS היא הדגמת עיצוב
                ותשתית טכנולוגית לניהול השקעות בלוקצ&apos;יין.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

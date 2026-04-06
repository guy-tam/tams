"use client";

// ניווט ראשי - סרגל צד פרימיום עם אפקט זכוכית ותמיכה בריבוי שפות
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  Network,
  Wallet,
  Coins,
  TrendingUp,
  Target,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

// מפתחות ניווט עם אייקונים ונתיבים
const navItems = [
  { labelKey: "nav.home", href: "/", icon: Home },
  { labelKey: "nav.company", href: "/company", icon: Building2 },
  { labelKey: "nav.architecture", href: "/architecture", icon: Network },
  { labelKey: "nav.holdings", href: "/holdings", icon: Wallet },
  { labelKey: "nav.defi", href: "/defi", icon: Coins },
  { labelKey: "nav.marketShift", href: "/market-shift", icon: TrendingUp },
  { labelKey: "nav.strategy", href: "/strategy", icon: Target },
  { labelKey: "nav.investor", href: "/investor", icon: Users },
];

// אנימציה לפריטי הניווט
const linkVariants = {
  idle: { x: 0 },
  hover: { x: 4, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
};

// אנימציית כניסה לתפריט מובייל
const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const sidebarMobileVariants = {
  closed: { x: "-100%" },
  open: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
};

export default function Navigation() {
  // מצב פתוח/סגור של תפריט מובייל
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();

  // סגירת תפריט מובייל בעת שינוי נתיב
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // בדיקה האם הקישור פעיל
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // רכיב פנימי - רשימת הקישורים
  const NavLinks = () => (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link key={item.href} href={item.href}>
            <motion.div
              variants={linkVariants}
              initial="idle"
              whileHover="hover"
              className={`
                relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                transition-colors duration-200
                ${
                  active
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }
              `}
            >
              {/* רקע גרדיאנט לקישור פעיל */}
              {active && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/20"
                  transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4 shrink-0" />
              <span className="relative z-10">{t(item.labelKey)}</span>
              {/* פס אינדיקטור בצד */}
              {active && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute ${isRTL ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-blue-500`}
                  transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );

  // תוכן הסיידבר - לוגו וקישורים
  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* לוגו ומותג */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
          <span className="text-sm font-bold text-white tracking-tight">T</span>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">TAMS</h1>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">
            {t("common.conceptApp")}
          </p>
        </div>
      </div>

      {/* קו הפרדה */}
      <div className="mx-4 mb-4 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* קישורי ניווט */}
      <div className="flex-1 overflow-y-auto">
        <NavLinks />
      </div>

      {/* מחליף שפות */}
      <div className="mx-3 mb-2">
        <LanguageSwitcher />
      </div>

      {/* תחתית הסיידבר */}
      <div className="mx-4 mt-2 mb-2 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
      <div className="px-6 py-4">
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
          {t("common.conceptApp")} &middot; v0.1
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* כפתור המבורגר למובייל */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`fixed top-4 ${isRTL ? "right-4" : "left-4"} z-50 flex h-10 w-10 items-center justify-center rounded-lg
          bg-zinc-900/80 backdrop-blur-md border border-zinc-800/60 text-zinc-400
          hover:text-white transition-colors lg:hidden`}
        aria-label="פתיחת תפריט"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* סיידבר קבוע לדסקטופ */}
      <aside
        className={`hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-40
          bg-zinc-950/70 backdrop-blur-xl
          ${isRTL ? "border-l" : "border-r"} border-zinc-800/40`}
        style={{
          borderImage: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.15), rgba(59,130,246,0.15), transparent) 1",
        }}
      >
        <SidebarContent />
      </aside>

      {/* אוברליי ותפריט מובייל */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* רקע כהה */}
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* סיידבר מובייל */}
            <motion.aside
              key="mobile-sidebar"
              variants={sidebarMobileVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-50 w-64 flex flex-col
                bg-zinc-950/90 backdrop-blur-xl ${isRTL ? "border-l" : "border-r"} border-zinc-800/40 lg:hidden`}
            >
              {/* כפתור סגירה */}
              <button
                onClick={() => setMobileOpen(false)}
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} flex h-8 w-8 items-center justify-center
                  rounded-md text-zinc-500 hover:text-white transition-colors`}
                aria-label="סגירת תפריט"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

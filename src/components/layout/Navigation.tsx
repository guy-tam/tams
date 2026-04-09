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
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import TamsLogo from "./TamsLogo";

// מפתחות ניווט עם אייקונים ונתיבים
const navItems = [
  { labelKey: "nav.home", href: "/", icon: Home },
  { labelKey: "nav.company", href: "/company", icon: Building2 },
  { labelKey: "nav.architecture", href: "/architecture", icon: Network },
  { labelKey: "nav.holdings", href: "/holdings", icon: Wallet },
  { labelKey: "nav.defi", href: "/defi", icon: Coins },
  { labelKey: "nav.marketShift", href: "/market-shift", icon: TrendingUp },
  { labelKey: "nav.strategy", href: "/strategy", icon: Target },
  { labelKey: "nav.proof", href: "/proof", icon: ShieldCheck },
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
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                }
              `}
            >
              {/* רקע גרדיאנט לקישור פעיל */}
              {active && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg bg-white/[0.05] border border-white/[0.08]"
                  transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4 shrink-0" />
              <span className="relative z-10">{t(item.labelKey)}</span>
              {/* פס אינדיקטור בצד */}
              {active && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute ${isRTL ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full bg-amber-400/60`}
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
        <TamsLogo variant="sidebar" />
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">TAMS</h1>
          <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600">
            {t("common.conceptApp")}
          </p>
        </div>
      </div>

      {/* קו הפרדה מוזהב מתחת ללוגו */}
      <div className="mx-4 mb-4 h-px bg-white/[0.05]" />

      {/* קישורי ניווט */}
      <div className="flex-1 overflow-y-auto">
        <NavLinks />
      </div>

      {/* כפתור כניסה לפורטל משקיעים */}
      <div className="mx-3 mb-2">
        <Link href="/login">
          <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.07] hover:border-white/[0.12] hover:text-white transition-all duration-400">
            <LogIn className="size-4" />
            <span>Investor Portal</span>
          </div>
        </Link>
      </div>

      {/* כפתור גישה פרטית */}
      <div className="mx-3 mb-3">
        <Link href="/access">
          <div className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-amber-400 transition-colors">
            <span>{t("nav.investorPortal")}</span>
          </div>
        </Link>
      </div>

      {/* מחליף שפות */}
      <div className="mx-3 mb-2">
        <LanguageSwitcher />
      </div>

      {/* תחתית הסיידבר */}
      <div className="mx-4 mt-2 mb-2 h-px bg-white/[0.04]" />
      <div className="px-6 py-4">
        <p className="text-[10px] text-zinc-700 tracking-[0.1em]">
          v0.1
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
          bg-[#060b14]/95 backdrop-blur-2xl
          ${isRTL ? "border-l" : "border-r"} border-white/[0.04]`}
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
                bg-[#070e1a]/95 backdrop-blur-2xl ${isRTL ? "border-l" : "border-r"} border-zinc-800/40 lg:hidden`}
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

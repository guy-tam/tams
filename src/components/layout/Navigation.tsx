"use client";

// ניווט ראשי — סרגל צד מלכותי עם אקסנטים מוזהבים
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

const linkVariants = {
  idle: { x: 0 },
  hover: { x: 4, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const sidebarMobileVariants = {
  closed: { x: "-100%" },
  open: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
};

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
                    : "text-zinc-400 hover:text-amber-200/80 hover:bg-amber-500/[0.04]"
                }
              `}
            >
              {/* רקע גרדיאנט לקישור פעיל */}
              {active && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/[0.12] via-blue-500/[0.08] to-amber-400/[0.06] border border-amber-500/20 shadow-[0_0_12px_rgba(212,168,83,0.06)]"
                  transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4 shrink-0" />
              <span className="relative z-10">{t(item.labelKey)}</span>
              {/* פס אינדיקטור זהוב */}
              {active && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute ${isRTL ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-blue-400 shadow-[0_0_8px_rgba(212,168,83,0.4)]`}
                  transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* לוגו */}
      <div className="flex items-center gap-3 px-6 py-6">
        <TamsLogo variant="sidebar" />
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">TAMS</h1>
          <p className="text-[10px] uppercase tracking-widest text-amber-400/40">
            {t("common.conceptApp")}
          </p>
        </div>
      </div>

      {/* קו מנורה מוזהב */}
      <div className="mx-4 mb-4 h-px bg-gradient-to-r from-transparent via-amber-400/25 to-transparent shadow-[0_1px_6px_rgba(212,168,83,0.1)]" />

      {/* קישורי ניווט */}
      <div className="flex-1 overflow-y-auto">
        <NavLinks />
      </div>

      {/* כפתור כניסה — מוזהב */}
      <div className="mx-3 mb-2">
        <Link href="/login">
          <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-blue-500/10 border border-amber-500/25 text-amber-400 hover:from-amber-500/25 hover:via-amber-400/15 hover:to-blue-500/15 hover:text-amber-300 hover:border-amber-400/35 hover:shadow-[0_0_16px_rgba(212,168,83,0.12)] transition-all duration-300">
            <LogIn className="size-4" />
            <span>Investor Portal</span>
          </div>
        </Link>
      </div>

      {/* גישה פרטית */}
      <div className="mx-3 mb-3">
        <Link href="/access">
          <div className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-amber-400 transition-colors">
            <span>{t("nav.investorPortal")}</span>
          </div>
        </Link>
      </div>

      {/* שפות */}
      <div className="mx-3 mb-2">
        <LanguageSwitcher />
      </div>

      {/* תחתית — מנורה */}
      <div className="mx-4 mt-2 mb-2 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      <div className="px-6 py-4">
        <p className="text-[10px] text-amber-400/25 uppercase tracking-[0.2em] font-medium">
          Institutional Grade
        </p>
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">
          {t("common.conceptApp")} &middot; v0.1
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* המבורגר מובייל */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`fixed top-3 ${isRTL ? "right-3" : "left-3"} z-50 flex h-11 w-11 items-center justify-center rounded-lg
          bg-zinc-900/90 backdrop-blur-md border border-zinc-800/60 text-zinc-400
          hover:text-white transition-colors lg:hidden`}
        aria-label="פתיחת תפריט"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* סיידבר דסקטופ — גבול מנורה מוזהב */}
      <aside
        className={`hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-40
          bg-[#070e1a]/95 backdrop-blur-2xl
          ${isRTL ? "border-l" : "border-r"} border-zinc-800/40`}
        style={{
          borderImage: "linear-gradient(to bottom, transparent 5%, rgba(212, 168, 83, 0.3) 30%, rgba(212, 168, 83, 0.2) 50%, rgba(79, 143, 247, 0.25) 70%, transparent 95%) 1",
        }}
      >
        <SidebarContent />
      </aside>

      {/* מובייל */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              key="mobile-sidebar"
              variants={sidebarMobileVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-50 w-64 flex flex-col
                bg-[#070e1a]/95 backdrop-blur-2xl ${isRTL ? "border-l" : "border-r"} border-zinc-800/40 lg:hidden`}
            >
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

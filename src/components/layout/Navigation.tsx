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

  // נגישות: מקש Escape סוגר את תפריט המובייל
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const NavLinks = () => (
    // נגישות: תפריט ניווט ראשי עם תווית
    <nav aria-label="ניווט ראשי" className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 rounded-lg"
          >
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
          <h1 className="text-lg font-semibold tracking-[0.18em] text-white">TAMS</h1>
          <p className="text-[10px] uppercase tracking-[0.28em] text-amber-400/45 mt-0.5">
            Institutional
          </p>
        </div>
      </div>

      {/* קו זהב דק */}
      <div className="mx-5 mb-5 h-px bg-gradient-to-r from-transparent via-amber-500/22 to-transparent" />

      {/* קישורי ניווט */}
      <div className="flex-1 overflow-y-auto">
        <NavLinks />
      </div>

      {/* כפתור כניסה למשקיעים — איחוד יחיד, לא כפילות */}
      <div className="mx-3 mb-3">
        <Link
          href="/login"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 rounded-xl block"
        >
          <div className="flex items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-[12px] font-medium tracking-[0.18em] uppercase border border-amber-500/30 text-amber-300/90 bg-amber-500/[0.04] hover:bg-amber-500/[0.08] hover:text-amber-200 hover:border-amber-400/45 transition-colors duration-300">
            <LogIn className="size-3.5" />
            <span>{t("nav.investorPortal")}</span>
          </div>
        </Link>
      </div>

      {/* שפות */}
      <div className="mx-3 mb-3">
        <LanguageSwitcher />
      </div>

      {/* תחתית — מינימליסטי, בלי v0.1 */}
      <div className="mx-5 mt-2 mb-3 h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />
      <div className="px-6 pb-5 pt-1">
        <p className="text-[9px] text-amber-400/35 uppercase tracking-[0.32em] font-medium">
          Institutional&nbsp;Grade
        </p>
        <p className="text-[9px] text-zinc-600 tracking-[0.2em] mt-1.5">
          © {new Date().getFullYear()} TAMS
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* המבורגר מובייל */}
      {/* נגישות: כפתור המבורגר שולט בפאנל הניווט הנייד */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="פתיחת תפריט"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        className={`fixed top-3 ${isRTL ? "right-3" : "left-3"} z-50 flex h-11 w-11 items-center justify-center rounded-lg
          bg-zinc-900/90 backdrop-blur-md border border-zinc-800/60 text-zinc-400
          hover:text-white transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50`}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* סיידבר דסקטופ — קו זהב דק יחיד, בלי גימיקים */}
      <aside
        className={`hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-40
          backdrop-blur-2xl ${isRTL ? "border-l" : "border-r"} border-amber-500/[0.08]`}
        style={{
          background: "linear-gradient(180deg, rgba(7,12,22,0.94) 0%, rgba(5,10,20,0.96) 60%, rgba(4,8,18,0.97) 100%)",
          boxShadow: "0 0 60px -20px rgba(0,0,0,0.55)",
        }}
      >
        {/* קו זהב פנימי — דקיק ומאופק */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-12 ${isRTL ? "left-0" : "right-0"} w-px`}
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(212,168,83,0.28) 35%, rgba(212,168,83,0.18) 65%, transparent)",
          }}
        />
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
            {/* נגישות: פאנל הניווט הנייד משמש כ-dialog מודאלי */}
            <motion.aside
              key="mobile-sidebar"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="תפריט ניווט"
              variants={sidebarMobileVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-50 w-64 flex flex-col
                bg-[#070e1a]/95 backdrop-blur-2xl ${isRTL ? "border-l" : "border-r"} border-zinc-800/40 lg:hidden`}
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="סגירת תפריט"
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} flex h-8 w-8 items-center justify-center
                  rounded-md text-zinc-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50`}
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

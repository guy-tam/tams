"use client";

// תבנית דשבורד משקיע - סרגל צד ייעודי, בר עליון ומעטפת תוכן
// שונה מהסרגל הציבורי - מיועד למשקיעים מאומתים בלבד
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  LineChart,
  Coins,
  Activity,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import TamsLogo from "./TamsLogo";
import type { ReactNode } from "react";

// --- פריטי ניווט הדשבורד ---

const dashboardNavItems = [
  { labelKey: "dashboard.overview", href: "/dashboard", icon: LayoutDashboard },
  { labelKey: "dashboard.portfolio", href: "/dashboard/portfolio", icon: Briefcase },
  { labelKey: "dashboard.performance", href: "/dashboard/performance", icon: LineChart },
  { labelKey: "dashboard.defiPositions", href: "/dashboard/defi", icon: Coins },
  { labelKey: "dashboard.activity", href: "/dashboard/activity", icon: Activity },
  { labelKey: "dashboard.settings", href: "/dashboard/settings", icon: Settings },
];

// --- אנימציות ---

// אנימציה לפריטי ניווט
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

// RTL - אנימציית מובייל בכיוון הפוך
const sidebarMobileVariantsRTL = {
  closed: { x: "100%" },
  open: { x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
};

// --- רכיב ראשי ---

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <DashboardShell>{children}</DashboardShell>
    </ProtectedRoute>
  );
}

// מעטפת פנימית - רץ רק כשהמשתמש מאומת
function DashboardShell({ children }: { children: ReactNode }) {
  // מצב פתוח/סגור של תפריט מובייל
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  const { user, logout } = useAuth();

  // סגירת תפריט מובייל בעת שינוי נתיב
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // נגישות: מקש Escape סוגר את תפריט הדשבורד במובייל
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // בדיקה האם הקישור פעיל
  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  // ראשי תיבות של שם המשתמש לאווטאר
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
    : "??";

  // --- רכיבי פנים ---

  // סקציית מידע משתמש
  const UserSection = () => (
    <div className="px-5 py-5">
      <div className="flex items-center gap-3">
        {/* עיגול אווטאר */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-amber-500 text-sm font-bold text-white shadow-lg shadow-blue-500/20 ring-2 ring-amber-500/20">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
          <p className="text-[10px] text-zinc-500 font-mono">{user?.investorId}</p>
        </div>
        {/* פעמון התראות */}
        <button
          type="button"
          aria-label="התראות"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
        >
          <Bell className="h-4 w-4" />
          {/* נקודת אינדיקטור */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-[#0a1628] shadow-sm shadow-amber-400/30" />
        </button>
      </div>
    </div>
  );

  // רשימת קישורי ניווט
  const NavLinks = () => (
    // נגישות: ניווט הדשבורד עם תווית
    <nav aria-label="ניווט דשבורד" className="flex flex-col gap-1 px-3">
      {dashboardNavItems.map((item) => {
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
                    : "text-zinc-400 hover:text-blue-200"
                }
              `}
            >
              {/* רקע גרדיאנט לקישור פעיל */}
              {active && (
                <motion.div
                  layoutId="activeDashboardNav"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/15 to-amber-500/10 border border-blue-500/15"
                  transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4 shrink-0" />
              <span className="relative z-10">{t(item.labelKey)}</span>
              {/* פס אינדיקטור בצד */}
              {active && (
                <motion.div
                  layoutId="activeDashboardIndicator"
                  className={`absolute ${isRTL ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-gradient-to-b from-blue-400 to-amber-400`}
                  transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );

  // תוכן הסיידבר - לוגו, משתמש, קישורים
  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* לוגו ומותג - פורטל משקיע */}
      <div className="flex items-center gap-3 px-6 py-5">
        <TamsLogo variant="sidebar" />
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">TAMS</h1>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">
            {t("nav.investorPortal")}
          </p>
        </div>
      </div>

      {/* קו הפרדה */}
      <div className="mx-4 mb-2 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

      {/* מידע משתמש */}
      <UserSection />

      {/* קו הפרדה */}
      <div className="mx-4 mb-3 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

      {/* קישורי ניווט */}
      <div className="flex-1 overflow-y-auto">
        <NavLinks />
      </div>

      {/* חזרה לאתר הראשי + התנתקות */}
      <div className="mx-4 mt-2 mb-2 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
      <div className="px-3 py-3 space-y-1">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 rounded-lg block"
        >
          <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-blue-300 hover:bg-blue-400/10 transition-colors">
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            <span>{t("dashboard.backToSite")}</span>
          </div>
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
        >
          <LogOut className="h-4 w-4" />
          <span>{t("dashboard.logout")}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full">
      {/* כפתור המבורגר למובייל */}
      {/* נגישות: כפתור המבורגר שולט בפאנל הניווט של הדשבורד */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="פתיחת תפריט דשבורד"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        className={`fixed top-4 ${isRTL ? "right-4" : "left-4"} z-50 flex h-10 w-10 items-center justify-center rounded-lg
          bg-zinc-900/80 backdrop-blur-md border border-zinc-800/60 text-zinc-400
          hover:text-white transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50`}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* סיידבר קבוע לדסקטופ */}
      <aside
        className={`hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-40
          backdrop-blur-2xl
          ${isRTL ? "border-l" : "border-r"} border-zinc-800/40`}
        style={{
          background: "linear-gradient(180deg, rgba(10,22,40,0.92) 0%, rgba(8,16,32,0.95) 100%)",
          borderImage: "linear-gradient(to bottom, transparent, rgba(212, 168, 83, 0.22), rgba(79, 143, 247, 0.15), transparent) 1",
          boxShadow: "inset 0 1px 0 rgba(212,168,83,0.08), 0 0 60px -10px rgba(0,0,0,0.5)",
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
              key="dashboard-overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* סיידבר מובייל */}
            {/* נגישות: פאנל הניווט הנייד משמש כ-dialog מודאלי */}
            <motion.aside
              key="dashboard-mobile-sidebar"
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="תפריט דשבורד"
              variants={isRTL ? sidebarMobileVariantsRTL : sidebarMobileVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-50 w-64 flex flex-col
                bg-[#0a1628]/95 backdrop-blur-2xl ${isRTL ? "border-l" : "border-r"} border-zinc-800/40 lg:hidden`}
            >
              {/* כפתור סגירה */}
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="סגירת תפריט דשבורד"
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

      {/* בר עליון + תוכן ראשי */}
      <div className={`flex-1 ${isRTL ? "lg:pr-64" : "lg:pl-64"} flex flex-col`}>
        {/* בר עליון — פרימיום עם מרקם זהוב */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-amber-500/[0.12] bg-[#0a1628]/85 backdrop-blur-xl px-4 sm:px-6 shadow-[inset_0_1px_0_rgba(212,168,83,0.1),0_4px_20px_rgba(0,0,0,0.3)]">
          {/* לוגו בבר עליון - נראה רק במובייל */}
          <div className="flex items-center gap-2 lg:hidden">
            <TamsLogo variant="sidebar" />
            <span className="text-sm font-bold text-white">TAMS {t("nav.investorPortal")}</span>
          </div>

          {/* כותרת בדסקטופ */}
          <div className="hidden lg:block">
            <span className="text-sm font-medium text-zinc-400">TAMS {t("nav.investorPortal")}</span>
          </div>

          {/* פרטי משתמש בבר עליון */}
          <div className="flex items-center gap-3">
            {/* פעמון התראות */}
            <button
              type="button"
              aria-label="התראות"
              className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-[#0a1628] shadow-sm shadow-amber-400/30" />
            </button>

            {/* שם משתמש ואווטאר */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 hidden sm:inline">{user?.name}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-amber-500 text-xs font-bold text-white ring-2 ring-amber-500/20">
                {initials}
              </div>
            </div>

            {/* כפתור יציאה */}
            <button
              type="button"
              onClick={logout}
              aria-label="התנתקות"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
              title="התנתקות"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* תוכן הדשבורד — שקוף חלקית כדי שהציור החי יבצבץ */}
        <main className="flex-1 relative">
          {/* שכבת מרקם — מחברת את הדשבורד לעולם הציורי */}
          <div className="pointer-events-none absolute inset-0 texture-grain opacity-40" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

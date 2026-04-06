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
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import type { ReactNode } from "react";

// --- פריטי ניווט הדשבורד ---

const dashboardNavItems = [
  { label: "סקירה כללית", href: "/dashboard", icon: LayoutDashboard },
  { label: "תיק השקעות", href: "/dashboard/portfolio", icon: Briefcase },
  { label: "ביצועים", href: "/dashboard/performance", icon: LineChart },
  { label: "פוזיציות DeFi", href: "/dashboard/defi", icon: Coins },
  { label: "פעילות", href: "/dashboard/activity", icon: Activity },
  { label: "הגדרות", href: "/dashboard/settings", icon: Settings },
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
  const { isRTL } = useLanguage();
  const { user, logout } = useAuth();

  // סגירת תפריט מובייל בעת שינוי נתיב
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
          <p className="text-[10px] text-zinc-500 font-mono">{user?.investorId}</p>
        </div>
        {/* פעמון התראות */}
        <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
          <Bell className="h-4 w-4" />
          {/* נקודת אינדיקטור */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-zinc-950" />
        </button>
      </div>
    </div>
  );

  // רשימת קישורי ניווט
  const NavLinks = () => (
    <nav className="flex flex-col gap-1 px-3">
      {dashboardNavItems.map((item) => {
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
                  layoutId="activeDashboardNav"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/20"
                  transition={{ type: "spring" as const, stiffness: 350, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-4 w-4 shrink-0" />
              <span className="relative z-10">{item.label}</span>
              {/* פס אינדיקטור בצד */}
              {active && (
                <motion.div
                  layoutId="activeDashboardIndicator"
                  className={`absolute ${isRTL ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-purple-500`}
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
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/20">
          <span className="text-sm font-bold text-white tracking-tight">T</span>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">TAMS</h1>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500">
            Investor Portal
          </p>
        </div>
      </div>

      {/* קו הפרדה */}
      <div className="mx-4 mb-2 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* מידע משתמש */}
      <UserSection />

      {/* קו הפרדה */}
      <div className="mx-4 mb-3 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* קישורי ניווט */}
      <div className="flex-1 overflow-y-auto">
        <NavLinks />
      </div>

      {/* תחתית הסיידבר - כפתור יציאה */}
      <div className="mx-4 mt-2 mb-2 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
      <div className="px-3 py-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>התנתקות</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full">
      {/* כפתור המבורגר למובייל */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`fixed top-4 ${isRTL ? "right-4" : "left-4"} z-50 flex h-10 w-10 items-center justify-center rounded-lg
          bg-zinc-900/80 backdrop-blur-md border border-zinc-800/60 text-zinc-400
          hover:text-white transition-colors lg:hidden`}
        aria-label="פתיחת תפריט דשבורד"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* סיידבר קבוע לדסקטופ */}
      <aside
        className={`hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col fixed inset-y-0 ${isRTL ? "right-0" : "left-0"} z-40
          bg-zinc-950/70 backdrop-blur-xl
          ${isRTL ? "border-l" : "border-r"} border-zinc-800/40`}
        style={{
          borderImage: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.15), rgba(139,92,246,0.15), transparent) 1",
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
            <motion.aside
              key="dashboard-mobile-sidebar"
              variants={isRTL ? sidebarMobileVariantsRTL : sidebarMobileVariants}
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
                aria-label="סגירת תפריט דשבורד"
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
        {/* בר עליון */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-800/40 bg-zinc-950/80 backdrop-blur-md px-4 sm:px-6">
          {/* לוגו בבר עליון - נראה רק במובייל */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mr-8">
              <span className="text-xs font-bold text-white">T</span>
            </div>
            <span className="text-sm font-bold text-white">TAMS Investor Portal</span>
          </div>

          {/* כותרת בדסקטופ */}
          <div className="hidden lg:block">
            <span className="text-sm font-medium text-zinc-400">TAMS Investor Portal</span>
          </div>

          {/* פרטי משתמש בבר עליון */}
          <div className="flex items-center gap-3">
            {/* פעמון התראות */}
            <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-zinc-950" />
            </button>

            {/* שם משתמש ואווטאר */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 hidden sm:inline">{user?.name}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-xs font-bold text-white">
                {initials}
              </div>
            </div>

            {/* כפתור יציאה */}
            <button
              onClick={logout}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              title="התנתקות"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* תוכן הדשבורד */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

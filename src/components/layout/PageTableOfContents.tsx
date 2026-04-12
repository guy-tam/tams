"use client";

// פאנל ניווט — דסקטופ צדדי + כפתור מובייל עם תפריט נושאים
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { List, X } from "lucide-react";

interface TocSection {
  id: string;
  label: string;
}

interface PageTableOfContentsProps {
  sections: TocSection[];
}

export default function PageTableOfContents({ sections }: PageTableOfContentsProps) {
  const { isRTL } = useLanguage();
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setVisible(scrollTop > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  // נגישות: מקש Escape סוגר את תפריט הנושאים במובייל
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  }, []);

  const activeIndex = sections.findIndex(s => s.id === activeId);

  return (
    <>
      {/* ─── כפתור מובייל צף — תוכן עניינים ─── */}
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="תוכן עניינים"
            aria-expanded={mobileOpen}
            aria-controls="page-toc-panel"
            className={`fixed top-3 ${isRTL ? "left-16" : "right-3"} z-40 xl:hidden
              h-11 w-11 rounded-lg
              bg-zinc-900/90 backdrop-blur-md border border-zinc-800/60
              flex items-center justify-center
              text-zinc-400 hover:text-white transition-colors
              shadow-lg shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50`}
          >
            {mobileOpen ? <X className="size-4.5" /> : <List className="size-4.5" />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── תפריט נושאים מובייל ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* רקע כהה */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-35 bg-black/50 backdrop-blur-sm xl:hidden"
            />

            {/* פאנל נושאים */}
            {/* נגישות: פאנל תוכן העניינים משמש כ-dialog מודאלי */}
            <motion.div
              id="page-toc-panel"
              role="dialog"
              aria-modal="true"
              aria-label={isRTL ? "תוכן עניינים" : "Table of contents"}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`fixed top-16 ${isRTL ? "left-3" : "right-3"} z-40 xl:hidden
                w-56 rounded-xl
                bg-[#0b1a2e]/95 backdrop-blur-2xl
                border border-amber-400/15
                shadow-2xl shadow-black/40
                overflow-hidden`}
              dir={isRTL ? "rtl" : "ltr"}
            >
              {/* כותרת */}
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="text-[10px] uppercase tracking-[0.15em] text-amber-400/60 font-medium">
                  {isRTL ? "נושאים" : "Sections"}
                </p>
              </div>

              {/* רשימת נושאים */}
              <div className="py-2">
                {sections.map((section, i) => {
                  const isActive = activeId === section.id;
                  const isPast = activeIndex > i;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollTo(section.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                        isActive
                          ? "text-amber-400 bg-amber-400/[0.06]"
                          : isPast
                            ? "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                            : "text-zinc-500 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* אינדיקטור */}
                      <div className={`size-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-amber-400 shadow-sm shadow-amber-400/30"
                          : isPast
                            ? "bg-blue-400/50"
                            : "bg-white/15"
                      }`} />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* אחוז התקדמות */}
              <div className="px-4 py-2 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${scrollProgress * 100}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 tabular-nums">
                    {Math.round(scrollProgress * 100)}%
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── פאנל דסקטופ צדדי ─── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? -30 : 30 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className={`fixed ${isRTL ? "left-5" : "right-5"} top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-0`}
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute top-0 bottom-0 w-[2px] bg-white/[0.06] rounded-full" />

              <motion.div
                className="absolute top-0 w-[2px] rounded-full bg-gradient-to-b from-blue-500 to-amber-500"
                style={{ height: `${scrollProgress * 100}%` }}
                transition={{ duration: 0.1 }}
              />

              <div className="relative flex flex-col gap-0">
                {sections.map((section, i) => {
                  const isActive = activeId === section.id;
                  const isPast = activeIndex > i;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollTo(section.id)}
                      aria-label={section.label}
                      aria-current={isActive ? "location" : undefined}
                      className="group relative flex items-center gap-3 py-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 rounded"
                      title={section.label}
                    >
                      <div className={`relative z-10 flex items-center justify-center transition-all duration-300 ${
                        isActive ? "w-3 h-3" : "w-2 h-2"
                      }`}>
                        <div className={`rounded-full transition-all duration-500 ${
                          isActive
                            ? "w-3 h-3 bg-amber-400 shadow-lg shadow-amber-400/30"
                            : isPast
                              ? "w-2 h-2 bg-blue-400/60"
                              : "w-2 h-2 bg-white/20 group-hover:bg-white/40"
                        }`} />

                        {isActive && (
                          <motion.div
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute w-3 h-3 rounded-full bg-amber-400/30"
                          />
                        )}
                      </div>

                      <motion.span
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : (isRTL ? 8 : -8),
                        }}
                        className={`absolute ${isRTL ? "right-8" : "left-8"} whitespace-nowrap text-[11px] font-medium transition-colors duration-300 ${
                          isActive ? "text-amber-400" : "text-zinc-500"
                        } group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none`}
                        style={{
                          textShadow: isActive ? "0 0 20px rgba(212, 168, 83, 0.3)" : "none"
                        }}
                      >
                        {section.label}
                      </motion.span>
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-[9px] font-mono text-zinc-600 tabular-nums"
            >
              {Math.round(scrollProgress * 100)}%
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

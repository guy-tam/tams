"use client";

// פאנל ניווט צדדי פרימיום לעמוד הוכחות — ברמת מוסדות פיננסיים עילית
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const sectionDefs = [
  { id: "evidence-thesis", labelKey: "proof_toc.evidenceThesis" },
  { id: "asset-matrix", labelKey: "proof_toc.assetMatrix" },
  { id: "evidence-explorer", labelKey: "proof_toc.evidenceExplorer" },
  { id: "global-coverage", labelKey: "proof_toc.globalCoverage" },
  { id: "methodology", labelKey: "proof_toc.methodology" },
];

export default function ProofTableOfContents() {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { t, isRTL } = useLanguage();

  // מעקב אחר התקדמות גלילה כללית
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setVisible(scrollTop > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // מעקב אחר הסקציה הפעילה באמצעות IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const best = visibleEntries.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActiveId(best.target.id);
        }
      },
      {
        rootMargin: "-15% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const elements = sectionDefs
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const activeIndex = sectionDefs.findIndex((s) => s.id === activeId);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL ? -30 : 30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className={`fixed ${isRTL ? "left-5" : "right-5"} top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-0`}
        >
          {/* קו התקדמות אנכי */}
          <div className="relative flex flex-col items-center">
            {/* קו רקע אנכי */}
            <div className="absolute top-0 bottom-0 w-[2px] bg-white/[0.06] rounded-full" />

            {/* מילוי התקדמות */}
            <motion.div
              className="absolute top-0 w-[2px] rounded-full bg-gradient-to-b from-blue-500 to-amber-500"
              style={{ height: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.1 }}
            />

            {/* נקודות סקציה */}
            <div className="relative flex flex-col gap-0">
              {sectionDefs.map((section, i) => {
                const isActive = activeId === section.id;
                const isPast = activeIndex > i;

                return (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className="group relative flex items-center gap-3 py-3 cursor-pointer"
                    title={t(section.labelKey)}
                  >
                    {/* נקודת סקציה */}
                    <div
                      className={`relative z-10 flex items-center justify-center transition-all duration-300 ${
                        isActive ? "w-3 h-3" : "w-2 h-2"
                      }`}
                    >
                      <div
                        className={`rounded-full transition-all duration-500 ${
                          isActive
                            ? "w-3 h-3 bg-amber-400 shadow-lg shadow-amber-400/30"
                            : isPast
                              ? "w-2 h-2 bg-blue-400/60"
                              : "w-2 h-2 bg-white/20 group-hover:bg-white/40"
                        }`}
                      />

                      {/* טבעת פעימה פעילה */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute w-3 h-3 rounded-full bg-amber-400/30"
                        />
                      )}
                    </div>

                    {/* תווית — מופיעה בריחוף או כשפעילה */}
                    <motion.span
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : isRTL ? 8 : -8,
                      }}
                      className={`absolute ${isRTL ? "right-8" : "left-8"} whitespace-nowrap text-[11px] font-medium transition-colors duration-300 ${
                        isActive ? "text-amber-400" : "text-zinc-500"
                      } group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none`}
                      style={{
                        textShadow: isActive
                          ? "0 0 20px rgba(212, 168, 83, 0.3)"
                          : "none",
                      }}
                    >
                      {t(section.labelKey)}
                    </motion.span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* אחוז התקדמות תחתון */}
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
  );
}

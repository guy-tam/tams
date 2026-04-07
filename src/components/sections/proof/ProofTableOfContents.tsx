"use client";

// תפריט תוכן עניינים צף — ניווט מהיר בין סקציות עמוד ההוכחות
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "evidence-thesis", label: "Evidence Thesis" },
  { id: "asset-matrix", label: "Asset Matrix" },
  { id: "evidence-explorer", label: "Evidence Explorer" },
  { id: "global-coverage", label: "Global Coverage" },
  { id: "market-analysis", label: "Market Analysis" },
  { id: "business-model", label: "Business Model" },
  { id: "scenarios", label: "Scenarios" },
  { id: "methodology", label: "Methodology" },
];

export default function ProofTableOfContents() {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // הצגת ה-TOC רק אחרי גלילה מעבר להירו
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // מעקב אחר הסקציה הפעילה באמצעות IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        // מצא את הסקציה הכי גבוהה שעדיין נראית
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // בחר את הסקציה עם ה-ratio הגבוה ביותר
          const best = visibleEntries.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActiveId(best.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5],
      }
    );

    // צפה בכל הסקציות
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-1/2 -translate-y-1/2 right-6 z-50 hidden xl:flex flex-col gap-1 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md p-3 shadow-lg shadow-black/20"
        >
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`
                  relative text-left text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-lg
                  transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "text-cyan-400 bg-cyan-500/[0.08]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }
                `}
              >
                {/* פס מדגיש פעיל */}
                {isActive && (
                  <motion.div
                    layoutId="toc-indicator"
                    className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-cyan-400"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {section.label}
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

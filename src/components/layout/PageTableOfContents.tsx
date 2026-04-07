"use client";

// רכיב תוכן עניינים צף גנרי — ניווט מהיר בין סקציות בכל עמוד
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

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

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
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
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
          className={`fixed ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col gap-1 rounded-xl bg-white/[0.04] backdrop-blur-md border border-amber-500/10 p-2 max-w-[180px]`}
        >
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`relative text-start px-3 py-1.5 rounded-lg text-[11px] transition-all duration-200 ${
                  isActive
                    ? "text-amber-400 bg-amber-500/10"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="pageTocIndicator"
                    className={`absolute ${isRTL ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-full bg-gradient-to-b from-blue-400 to-amber-400`}
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

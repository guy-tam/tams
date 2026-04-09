"use client";

// עמוד שאלות נפוצות — אקורדיון לפי קטגוריות
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/* ────────────────────────────── טיפוסים ────────────────────────────── */

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

/* ────────────────────────────── אנימציות ────────────────────────────── */

const answerVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

// מספר השאלות בכל קטגוריה — לשימוש באיטרציה על מפתחות התרגום
const CATEGORY_ITEM_COUNTS: Record<string, number> = {
  about: 3,
  investment: 4,
  research: 3,
  access: 2,
};

/* ──────────────────── קומפוננטת פריט שאלה ──────────────────── */

function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="border-b border-zinc-800 last:border-b-0"
    >
      {/* כפתור שאלה */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-5 text-right transition-colors hover:text-amber-400"
      >
        <span className="text-base font-medium text-white sm:text-lg">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-amber-400"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      {/* תשובה מתרחבת */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            variants={answerVariants}
            initial="collapsed"
            animate="expanded"
            exit="exit"
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ──────────────────── קומפוננטת קטגוריה ──────────────────── */

function FaqCategoryBlock({ category }: { category: FaqCategory }) {
  return (
    <motion.section variants={fadeUp} className="mb-10">
      {/* כותרת קטגוריה */}
      <h2 className="mb-4 text-xl font-bold text-amber-400 sm:text-2xl">
        {category.title}
      </h2>

      {/* רשימת שאלות */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 sm:px-6"
      >
        {category.items.map((item, idx) => (
          <FaqAccordionItem key={idx} item={item} />
        ))}
      </motion.div>
    </motion.section>
  );
}

/* ──────────────────── עמוד ראשי ──────────────────── */

export default function FaqPage() {
  const { t, isRTL } = useLanguage();

  // בניית מערך הקטגוריות מהתרגומים באמצעות גישה אינדקסית
  const categoryKeys = ["about", "investment", "research", "access"] as const;

  const faqData: FaqCategory[] = categoryKeys.map((catKey) => {
    const count = CATEGORY_ITEM_COUNTS[catKey];
    const items: FaqItem[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        question: t(`faq.categories.${catKey}.items.${i}.question`),
        answer: t(`faq.categories.${catKey}.items.${i}.answer`),
      });
    }
    return {
      title: t(`faq.categories.${catKey}.title`),
      items,
    };
  });

  return (
    <PageWrapper
      title={t("faq.pageTitle")}
      subtitle={t("faq.pageSubtitle")}
    >
      <div dir={isRTL ? "rtl" : "ltr"} className="space-y-2">
        {faqData.map((category, idx) => (
          <FaqCategoryBlock key={idx} category={category} />
        ))}

        {/* הערת סיום */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pt-6 text-center text-sm text-zinc-500"
        >
          {t("faq.notFound")}{" "}
          <a href="/access" className="text-amber-400 underline hover:text-amber-300">
            {t("faq.notFoundLink")}
          </a>
        </motion.p>
      </div>
    </PageWrapper>
  );
}

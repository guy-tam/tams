"use client";

// סקציית "למה השוק מתמחר מתחת" — ניתוח אסטרטגי של הפער בין אימוץ לתמחור
import { motion } from "framer-motion";
import { ArrowRight, Layers, Eye, EyeOff, TrendingUp, Puzzle, Zap } from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

const frameworks = [
  {
    icon: Eye,
    title: "שוק גלוי מול תשתית מוטמעת",
    description:
      "שווי השוק הנוכחי של הקריפטו משקף בעיקר פעילות ספקולטיבית וקמעונאית. אימוץ מוסדי של תשתיות blockchain — מסילות tokenization, שכבות סליקה, רשתות oracle — מתרחש ברובו מתחת לפני השטח של הפעילות הנראית בשוק.",
    insight: "אם אפילו חלק קטן מהוצאות התשתית המוסדית יעבור למסילות blockchain ציבוריות, השוק הניתן לכתובת עבור נכסים אלו מתרחב באופן משמעותי מעבר לשווי הטוקנים הנוכחי.",
  },
  {
    icon: Layers,
    title: "שכבת ספקולציה מול שכבת תועלת מול שכבת תשתית",
    description:
      "רוב הדיון בשוק הקריפטו מתמקד בשכבת הספקולציה. שכבת התועלת (DeFi, תשלומים, stablecoins) צומחת אך עדיין בשלבים מוקדמים. שכבת התשתית (oracles, אינטראופרביליות, סליקה, tokenization) צוברת ערך לאורך זמן ככל שהאימוץ מצטבר.",
    insight: "שכבות תשתית לוכדות ערך מכל האפליקציות הבנויות מעליהן — בדומה לאופן שבו ספקי ענן לוכדים ערך מכל חברות ה-SaaS הפועלות על הפלטפורמות שלהם.",
  },
  {
    icon: TrendingUp,
    title: "הרחבת השוק הכולל הניתן לכתובת (TAM) של Tokenization",
    description:
      "BCG מעריך $16T בנכסים מטוקנים עד 2030. McKinsey מתכנן $5T עד 2030. אפילו הערכות שמרניות מצביעות על כך ש-tokenization לבדו יכול להוסיף טריליונים בפעילות כלכלית on-chain — שרובה אינה קיימת בשווי השוק הנוכחי של הקריפטו.",
    insight: "צמיחת ה-tokenization יוצרת ביקוש מבני לשרשראות סליקה, רשתות oracle ופרוטוקולי אינטראופרביליות — לטובת נכסים בתיק זה באופן ישיר.",
  },
  {
    icon: Puzzle,
    title: "פער זמן באימוץ מוסדי",
    description:
      "אימוץ blockchain מוסדי וארגוני פועל במחזורים רב-שנתיים. פיילוטים שבוצעו ב-2023-2024 עשויים להגיע לייצור רק ב-2025-2027. מחירי טוקנים לעיתים קרובות אינם משקפים צנרת זו מכיוון שהשוק מנכה את מה שאינו יכול למדוד באופן מיידי.",
    insight: "הפער בין פעילות הצנרת המוסדית לבין תמחור השוק יוצר פוטנציאל לתשואות אסימטריות אם האימוץ עובר מפיילוט לייצור.",
  },
  {
    icon: EyeOff,
    title: "מודרניזציה של סליקה — התהליך הבלתי נראה",
    description:
      "תשלומים חוצי גבולות ($150T+/שנה), סליקת ניירות ערך ($2.5 קוודריליון/שנה ב-DTCC), ומימון סחר (פער של $5.2T) הם שווקים עצומים עם חוסר יעילות משמעותי. מודרניזציה מבוססת blockchain של מערכות אלו אינה דורשת אימוץ קמעונאי — היא מתרחשת בשכבת התשתית.",
    insight: "טרנספורמציה של תשתיות פיננסיות היא מנוע הביקוש הפוטנציאלי הגדול ביותר עבור blockchain — והיא פועלת באופן בלתי תלוי בסנטימנט שוק הקריפטו הקמעונאי.",
  },
  {
    icon: Zap,
    title: "אופציונליות וחשיפה אסימטרית",
    description:
      "נכסי התיק הממוקמים בצומת שבין תשתיות blockchain לפיננסים מסורתיים נושאים אופציונליות מוטמעת. אם האימוץ מואץ, נכסים אלו נהנים באופן בלתי פרופורציונלי. אם האימוץ נעצר, הפוזיציות מותאמות לניהול סיכון צד שלילי.",
    insight: "בתרחיש של ביצוע מוצלח, היחס בין התמחור הנוכחי לערך התשתית הפוטנציאלי מייצג אפסייד אסימטרי — לא ערבות, אלא יתרון מיצוב מבני.",
  },
];

export default function MarketUnderpricing() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 max-w-6xl mx-auto">
      <SectionHeader
        badge={t("proof.underpricing.badge")}
        title={t("proof.underpricing.title")}
        subtitle={t("proof.underpricing.subtitle")}
      />

      <div className="space-y-4 mt-8">
        {frameworks.map((fw, i) => (
          <motion.div
            key={fw.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-white/[0.1] transition-colors duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/15 p-2.5 shrink-0">
                <fw.icon className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-2">{fw.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">{fw.description}</p>
                <div className="flex items-start gap-2 rounded-lg bg-white/[0.03] border border-white/[0.05] p-3">
                  <ArrowRight className={`h-3.5 w-3.5 text-amber-400 mt-0.5 shrink-0 ${isRTL ? "rotate-180" : ""}`} />
                  <p className="text-xs text-zinc-300 leading-relaxed">{fw.insight}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* כותרת אזהרה */}
      <div className="mt-8 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-5 text-center">
        <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          <strong className="text-amber-400">{t("proof.underpricing.important")}:</strong> {t("proof.underpricing.importantText")}
        </p>
      </div>
    </section>
  );
}

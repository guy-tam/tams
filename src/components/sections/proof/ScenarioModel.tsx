"use client";

// מודל תרחישים — כרטיסי תרחיש איכותניים ללא תחזיות מספריות מטעות
import { motion } from "framer-motion";
import { TrendingDown, Minus, TrendingUp, AlertTriangle } from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

interface ScenarioCardData {
  id: string;
  name: string;
  icon: typeof TrendingUp;
  iconColor: string;
  borderColor: string;
  bgColor: string;
  description: string;
  assumptions: string[];
  factors: {
    label: string;
    level: "low" | "moderate" | "high";
  }[];
  outlook: string;
}

const scenarios: ScenarioCardData[] = [
  {
    id: "conservative",
    name: "אימוץ שמרני",
    icon: TrendingDown,
    iconColor: "text-gray-500",
    borderColor: "border-zinc-500/20",
    bgColor: "bg-gray-400/[0.03]",
    description:
      "אימוץ בלוקצ׳יין מוסדי מתקדם באיטיות. טוקניזציה נותרת נישתית. רוב הפיילוטים המוסדיים אינם עוברים לייצור. שוק הקריפטו נשאר ספקולטיבי בעיקרו.",
    assumptions: [
      "צמיחת טוקניזציה מתחת ל-$2T עד 2030",
      "אימוץ CBDC מוגבל למספר מדינות קטנות",
      "סביבה רגולטורית נותרת בלתי ודאית",
      "עניין מוסדי מתייצב ברמות הנוכחיות",
      "תשואות DeFi מתכווצות באופן משמעותי",
    ],
    factors: [
      { label: "צמיחת אימוץ", level: "low" },
      { label: "עליית ערך אוצר", level: "low" },
      { label: "תרומת תשואה", level: "low" },
      { label: "אלפא מסחר", level: "moderate" },
      { label: "סיכון ירידה", level: "high" },
    ],
    outlook:
      "בתרחיש זה, שימור ערך התיק תלוי בעיקר באסטרטגיות מסחר אקטיביות וניהול סיכונים. תזת התשתית נותרת תקפה לטווח הארוך אך לוקחת זמן רב משמעותית להתממש. הגנה על ההון באמצעות גודל פוזיציות ומגבלות ירידה הופכת קריטית.",
  },
  {
    id: "moderate",
    name: "אימוץ מתון",
    icon: Minus,
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
    bgColor: "bg-blue-500/[0.03]",
    description:
      "אימוץ מוסדי ממשיך במסלול הנוכחי. טוקניזציה צומחת באופן משמעותי. מספר רשתות תשלום ובנקים מרכזיים משלבים תשתיות בלוקצ׳יין. מסגרות רגולטוריות מתגבשות בשווקים מרכזיים.",
    assumptions: [
      "טוקניזציה מגיעה ל-$4-8T עד 2030",
      "מספר מטבעות CBDC מושקים בכלכלות גדולות",
      "בהירות רגולטורית בארה״ב ובאיחוד האירופי",
      "פיילוטים מוסדיים עוברים לייצור בשיעור של 20-40%",
      "DeFi מבשיל עם השתתפות מוסדית",
    ],
    factors: [
      { label: "צמיחת אימוץ", level: "moderate" },
      { label: "עליית ערך אוצר", level: "moderate" },
      { label: "תרומת תשואה", level: "moderate" },
      { label: "אלפא מסחר", level: "moderate" },
      { label: "סיכון ירידה", level: "moderate" },
    ],
    outlook:
      "בתרחיש זה, נכסי תשתית עולים בערכם ככל שהאימוץ מאמת את התועלת שלהם. תשואות DeFi מספקות הכנסה תפעולית משמעותית. מודל רב-מנועי מייצר תשואות הן מעליית ערך והן מניהול אקטיבי. זוהי תזת העבודה לבניית התיק.",
  },
  {
    id: "aggressive",
    name: "אימוץ מואץ",
    icon: TrendingUp,
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    bgColor: "bg-emerald-500/[0.03]",
    description:
      "תשתית בלוקצ׳יין הופכת לתשתית פיננסית סטנדרטית. טוקניזציה מתרחבת במהירות. תשלומים חוצי גבולות עוברים באופן משמעותי לתשתיות בלוקצ׳יין. רשתות אורקל הופכות לתשתית קריטית.",
    assumptions: [
      "טוקניזציה חוצה את רף $10T עד 2030",
      "כלכלות מרכזיות משיקות CBDC בקנה מידה רחב",
      "שילוב SWIFT עם בלוקצ׳יין הופך לסטנדרט",
      "שיעור המרת פיילוטים מוסדיים עולה על 50%",
      "TVL של DeFi מגיע ל-$500B+ עם הון מוסדי",
    ],
    factors: [
      { label: "צמיחת אימוץ", level: "high" },
      { label: "עליית ערך אוצר", level: "high" },
      { label: "תרומת תשואה", level: "high" },
      { label: "אלפא מסחר", level: "moderate" },
      { label: "סיכון ירידה", level: "low" },
    ],
    outlook:
      "בתרחיש זה, נכסי תשתית הממוקמים במרכז המודרניזציה הפיננסית חווים תמחור מחדש משמעותי. השוק הניתן להשגה עבור נכסים מבוססי בלוקצ׳יין מתרחב הרבה מעבר לשווי שוק הקריפטו הנוכחי. זהו תרחיש הפוטנציאל — אפשרי אך אינו מובטח.",
  },
];

function LevelIndicator({ level, delay = 0 }: { level: "low" | "moderate" | "high"; delay?: number }) {
  const colors = {
    low: "bg-gray-400",
    moderate: "bg-blue-400",
    high: "bg-emerald-400",
  };
  const filled = level === "low" ? 1 : level === "moderate" ? 2 : 3;

  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + i * 0.08, ease: "easeOut" }}
          className={`h-1.5 w-4 rounded-full origin-left transition-colors duration-500 ${i <= filled ? colors[level] : "bg-amber-50/30"}`}
        />
      ))}
    </div>
  );
}

export default function ScenarioModel() {
  const { t } = useLanguage();

  // שמות תרחישים מתורגמים
  const scenarioNames: Record<string, string> = {
    conservative: t("proof.scenarios.conservative"),
    moderate: t("proof.scenarios.moderate"),
    aggressive: t("proof.scenarios.accelerated"),
  };

  // תוויות גורמים מתורגמות
  const factorLabels: Record<string, string> = {
    "צמיחת אימוץ": t("proof.scenarios.factorAdoption"),
    "עליית ערך אוצר": t("proof.scenarios.factorTreasury"),
    "תרומת תשואה": t("proof.scenarios.factorYield"),
    "אלפא מסחר": t("proof.scenarios.factorTrading"),
    "סיכון ירידה": t("proof.scenarios.factorDownside"),
  };

  return (
    <section className="py-16 max-w-6xl mx-auto">
      <SectionHeader
        badge={t("proof.scenarios.badge")}
        title={t("proof.scenarios.title")}
        subtitle={t("proof.scenarios.subtitle")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        {scenarios.map((scenario, i) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.015 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
            className={`rounded-xl ${scenario.borderColor} border ${scenario.bgColor} p-6 flex flex-col transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20`}
          >
            {/* כותרת */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`rounded-lg bg-amber-50/30 border border-amber-200/40 p-2`}>
                <scenario.icon className={`h-5 w-5 ${scenario.iconColor}`} />
              </div>
              <h3 className="text-sm font-semibold text-white">{scenarioNames[scenario.id] || scenario.name}</h3>
            </div>

            {/* תיאור */}
            <p className="text-[11px] text-gray-500 leading-relaxed mb-4">{scenario.description}</p>

            {/* הנחות — עם אנימציית כניסה מדורגת */}
            <div className="mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">{t("proof.scenarios.keyAssumptions")}</span>
              <ul className="space-y-1.5">
                {scenario.assumptions.map((a, j) => (
                  <motion.li
                    key={a}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2 + j * 0.06, duration: 0.35, ease: "easeOut" }}
                    className="text-[10px] text-gray-400 leading-relaxed flex items-start gap-1.5"
                  >
                    <span className="text-gray-400 mt-1">·</span>
                    {a}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* גורמים */}
            <div className="mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">{t("proof.scenarios.factorAssessment")}</span>
              <div className="space-y-2">
                {scenario.factors.map((f, k) => (
                  <div key={f.label} className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">{factorLabels[f.label] || f.label}</span>
                    <LevelIndicator level={f.level} delay={i * 0.12 + 0.3 + k * 0.05} />
                  </div>
                ))}
              </div>
            </div>

            {/* תוצאה */}
            <div className="mt-auto pt-4 border-t border-amber-100/30">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">{t("proof.scenarios.scenarioOutlook")}</span>
              <p className="text-[11px] text-gray-600 leading-relaxed">{scenario.outlook}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* אזהרה */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4"
      >
        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-gray-500 leading-relaxed">
          {t("proof.scenarios.warning")}
        </p>
      </motion.div>
    </section>
  );
}

"use client";

// דף מתודולוגיה — מסגרת המחקר, בחירת נכסים, סיווג ראיות, ניהול סיכונים ובניית תיק
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import { motion } from "framer-motion";
import {
  Search,
  ShieldCheck,
  BarChart3,
  PieChart,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Layers,
  Building2,
  Scale,
  Cpu,
  Network,
} from "lucide-react";

// ─── קריטריונים לבחירת נכסים ───
const selectionCriteria = [
  {
    icon: Building2,
    title: "רלוונטיות לתשתית פיננסית",
    description:
      "הנכס חייב לשרת תפקיד ישיר בתשתית הפיננסית העתידית — תשלומים, סליקה, הנפקות דיגיטליות או תיווך בין מערכות.",
    accent: "#f59e0b",
  },
  {
    icon: ShieldCheck,
    title: "אימוץ מוסדי",
    description:
      "נדרשת עדות מוחשית לאימוץ על ידי מוסדות פיננסיים, בנקים מרכזיים, או חברות Fortune 500 — לא רק שימוש קמעונאי.",
    accent: "#3b82f6",
  },
  {
    icon: Scale,
    title: "בהירות רגולטורית",
    description:
      "העדפה לנכסים שהרגולציה כבר הכירה בהם או שסיכון הסיווג כנייר ערך נמוך. רגולציה לא ברורה מורידה דירוג.",
    accent: "#8b5cf6",
  },
  {
    icon: Cpu,
    title: "בשלות טכנולוגית",
    description:
      "הפרוטוקול צריך להיות ב-mainnet פעיל, עם תשתית בדוקה, ביקורות אבטחה, וביצועים מוכחים תחת עומס.",
    accent: "#10b981",
  },
  {
    icon: Network,
    title: "עוצמת אקוסיסטם",
    description:
      "מפתחים פעילים, TVL גדל, שותפויות אסטרטגיות, וקהילה בריאה — אינדיקטורים להמשך צמיחה וחוסן.",
    accent: "#ef4444",
  },
];

// ─── מערכת סיווג ראיות ───
const evidenceTiers = [
  {
    tier: "Tier 1",
    label: "מקור ראשוני",
    color: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/[0.06]",
    examples: [
      "דוחות רשמיים של חברות ומוסדות",
      "הכרזות רגולטוריות ממשלתיות",
      "מאמרים אקדמיים peer-reviewed",
      "נתוני on-chain מאומתים",
    ],
  },
  {
    tier: "Tier 2",
    label: "מקור משני",
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/[0.06]",
    examples: [
      "ניתוחי חברות מחקר מוכרות",
      "כתבות בתקשורת פיננסית מובילה",
      "ראיונות עם בכירים בתעשייה",
      "דוחות של חברות ייעוץ Tier-1",
    ],
  },
  {
    tier: "Tier 3",
    label: "מוחרג",
    color: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/[0.06]",
    examples: [
      "פוסטים ברשתות חברתיות ללא אימות",
      "תחזיות מחיר ספקולטיביות",
      "מקורות אנונימיים",
      "תוכן שיווקי של פרויקטים",
    ],
  },
];

// ─── רמות ביטחון ───
const confidenceLevels = [
  {
    level: "גבוה",
    color: "text-green-400",
    dot: "bg-green-400",
    description:
      "ראיות מרובות מ-Tier 1 שתומכות זו בזו, אימות עצמאי, ונתוני on-chain מאשרים.",
  },
  {
    level: "בינוני",
    color: "text-amber-400",
    dot: "bg-amber-400",
    description:
      "שילוב של מקורות Tier 1 ו-Tier 2, עקביות בין מקורות, ללא סתירות מהותיות.",
  },
  {
    level: "נמוך",
    color: "text-red-400",
    dot: "bg-red-400",
    description:
      "ראיות מוגבלות, מבוססות בעיקר על Tier 2, או שקיימות סתירות בין מקורות שלא נפתרו.",
  },
];

// ─── ציוני סיכון ───
const riskScores = [
  {
    key: "financeRelevance",
    label: "רלוונטיות פיננסית",
    description: "מידת התאמת הנכס לתשתיות הפיננסיות המסורתיות וחיבורו למערכות תשלום, סליקה והנפקה.",
    icon: Building2,
    color: "#3b82f6",
  },
  {
    key: "adoptionMaturity",
    label: "בשלות אימוץ",
    description: "רמת האימוץ המוסדי בפועל — שותפויות חתומות, פיילוטים פעילים, ואינטגרציות בפרודקשן.",
    icon: BarChart3,
    color: "#10b981",
  },
  {
    key: "ecosystemStrength",
    label: "עוצמת אקוסיסטם",
    description: "בריאות הקהילה, פעילות מפתחים, TVL, ומגוון האפליקציות הבנויות על הפרוטוקול.",
    icon: Network,
    color: "#8b5cf6",
  },
  {
    key: "verificationConfidence",
    label: "ביטחון אימות",
    description: "רמת הביטחון במידע על סמך איכות המקורות, עקביות הראיות ויכולת האימות העצמאי.",
    icon: ShieldCheck,
    color: "#f59e0b",
  },
];

// ─── קטגוריות תזה ───
const thesisCategories = [
  { name: "פסי תשלום פיננסיים", tag: "financial-rails", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { name: "טוקניזציה של נכסים ריאליים", tag: "tokenization-rwa", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { name: "אינטרופרביליות", tag: "interoperability", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { name: "תשתית חישוב ופרטיות", tag: "compute-privacy", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { name: "DeFi מוסדי", tag: "institutional-defi", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  { name: "תשתית נתונים ואורקלים", tag: "data-oracles", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
];

export default function MethodologyPage() {
  return (
    <PageWrapper bgGrid>
      {/* ─── סקציית Hero ─── */}
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-6">
            מתודולוגיה
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">מתודולוגיית המחקר והשקעה</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TAMS מבוסס על מסגרת מחקר שיטתית ומבוקרת, המשלבת ניתוח יסודי עם
            סיווג ראיות רב-שכבתי. כל החלטת השקעה נשענת על נתונים מאומתים,
            מקורות מדורגים, וניקוד סיכון כמותי.
          </p>
        </motion.div>
      </section>

      {/* ─── 1. מסגרת בחירת נכסים ─── */}
      <section className="py-12 max-w-5xl mx-auto">
        <SectionHeader
          badge="בחירת נכסים"
          title="מסגרת בחירת הנכסים"
          subtitle="כל נכס בתיק ה-16 עובר חמישה מסננים לפני שנכלל. רק נכסים שעומדים בכל הקריטריונים מקבלים מקום."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {selectionCriteria.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6"
              >
                <div
                  className="size-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${item.accent}15` }}
                >
                  <Icon className="size-6" style={{ color: item.accent }} />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent my-8" />

      {/* ─── 2. מערכת סיווג ראיות ─── */}
      <section className="py-12 max-w-5xl mx-auto">
        <SectionHeader
          badge="סיווג ראיות"
          title="מערכת סיווג הראיות"
          subtitle="כל ראייה במערכת מסווגת לפי מקור, רמת ביטחון וסוג קשר. מערכת זו מבטיחה שהחלטות מבוססות על מידע מהימן בלבד."
        />

        {/* היררכיית מקורות */}
        <h3 className="text-lg font-semibold text-white mb-4">
          היררכיית מקורות
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {evidenceTiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-2xl border ${tier.border} ${tier.bg} backdrop-blur-md p-6`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm font-bold ${tier.color}`}>
                  {tier.tier}
                </span>
                <span className="text-xs text-muted-foreground">
                  — {tier.label}
                </span>
              </div>
              <ul className="space-y-2">
                {tier.examples.map((ex, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle
                      className={`size-4 flex-shrink-0 mt-0.5 ${tier.color}`}
                    />
                    {ex}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* רמות ביטחון */}
        <h3 className="text-lg font-semibold text-white mb-4">
          מודל רמות הביטחון
        </h3>
        <div className="space-y-3">
          {confidenceLevels.map((cl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 items-start rounded-xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-5"
            >
              <div
                className={`size-3 rounded-full flex-shrink-0 mt-1.5 ${cl.dot}`}
              />
              <div>
                <h4 className={`text-sm font-semibold mb-1 ${cl.color}`}>
                  ביטחון {cl.level}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cl.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent my-8" />

      {/* ─── 3. מסגרת ניתוח סיכונים ─── */}
      <section className="py-12 max-w-5xl mx-auto">
        <SectionHeader
          badge="ניתוח סיכונים"
          title="מסגרת הערכת סיכונים"
          subtitle="כל נכס בתיק מקבל ארבעה ציוני סיכון כמותיים. הציונים משוקללים ליצירת פרופיל סיכון-תשואה מאוזן."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {riskScores.map((score, i) => {
            const Icon = score.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6"
              >
                <div
                  className="size-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${score.color}15` }}
                >
                  <Icon className="size-6" style={{ color: score.color }} />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-1">
                  {score.label}
                </h4>
                <code className="text-[11px] text-amber-400/70 font-mono">
                  {score.key}
                </code>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {score.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 rounded-xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-5"
        >
          <div className="flex gap-3 items-start">
            <Layers className="size-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                שקלול מצטבר
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                הציון הסופי לכל נכס הוא ממוצע משוקלל של ארבעת הציונים. נכסים
                שהציון המצטבר שלהם יורד מתחת לסף מוגדר מסומנים לבחינה מחודשת
                ועלולים להיות מוחלפים בסבב הבא.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent my-8" />

      {/* ─── 4. בניית תיק ─── */}
      <section className="py-12 max-w-5xl mx-auto">
        <SectionHeader
          badge="בניית תיק"
          title="בניית תיק ופיזור"
          subtitle="התיק מפוזר על פני קטגוריות תזה מגוונות, כדי לצמצם חשיפה לכישלון של סקטור בודד."
        />

        <div className="flex flex-wrap gap-3 mb-8">
          {thesisCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${cat.color}`}
            >
              {cat.name}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6"
          >
            <PieChart className="size-6 text-amber-400 mb-3" />
            <h4 className="text-base font-semibold text-foreground mb-2">
              עקרונות הקצאה
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start">
                <CheckCircle className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
                לא יותר מ-20% מהתיק בקטגוריה אחת
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
                כל נכס מוגבל ל-15% מקסימום מהתיק
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
                מינימום 4 קטגוריות תזה שונות
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
                שכבות שוק שונות — L1, L2, middleware, אפליקציות
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6"
          >
            <Search className="size-6 text-blue-400 mb-3" />
            <h4 className="text-base font-semibold text-foreground mb-2">
              קריטריונים לשקלול
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start">
                <CheckCircle className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
                ציון סיכון מצטבר גבוה מהסף
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
                ראיות ברמת ביטחון גבוה לפחות בשני ממדים
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
                התאמה לתזת ההשקעה הכוללת של TAMS
              </li>
              <li className="flex gap-2 items-start">
                <CheckCircle className="size-4 text-green-400 flex-shrink-0 mt-0.5" />
                פרופיל נזילות מספיק למשקיעים מוסדיים
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <div className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent my-8" />

      {/* ─── 5. איזון מחדש וסקירה ─── */}
      <section className="py-12 max-w-5xl mx-auto">
        <SectionHeader
          badge="איזון מחדש"
          title="סקירה תקופתית ואיזון מחדש"
          subtitle="תהליך סקירה שיטתי שמבטיח שהתיק מעודכן ומשקף את המציאות העדכנית ביותר."
        />

        <div className="space-y-4">
          {[
            {
              icon: RefreshCw,
              title: "סקירה רבעונית מלאה",
              description:
                "כל נכס בתיק עובר הערכה מחדש רבעונית. ציוני הסיכון מחושבים מחדש על סמך ראיות עדכניות, והמשקלות מותאמים בהתאם.",
              accent: "text-blue-400",
            },
            {
              icon: BarChart3,
              title: "עדכוני ראיות שוטפים",
              description:
                "ראיות חדשות נקלטות באופן רציף ומסווגות לפי היררכיית המקורות. ראיה חדשה ברמת Tier 1 יכולה לגרום לעדכון ציון מיידי.",
              accent: "text-green-400",
            },
            {
              icon: AlertTriangle,
              title: "תהליך שדרוג/הורדת דירוג",
              description:
                "כשציון מצטבר יורד מתחת לסף — הנכס נכנס ל'רשימת מעקב'. אם הירידה נמשכת שני רבעונים רצופים, הוא מוחלף. שדרוג דורש עלייה מתמשכת בציונים עם ראיות תומכות.",
              accent: "text-amber-400",
            },
            {
              icon: Layers,
              title: "מנגנון החלפה",
              description:
                "נכס מוחלף נבחן בהשוואה לנכסים מועמדים מאותה קטגוריית תזה. ההחלפה דורשת ציון גבוה יותר ואישור של ועדת ההשקעות.",
              accent: "text-purple-400",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 items-start rounded-xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-5"
              >
                <Icon
                  className={`size-5 flex-shrink-0 mt-0.5 ${item.accent}`}
                />
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent my-8" />

      {/* ─── 6. מגבלות והסתייגויות ─── */}
      <section className="py-12 max-w-5xl mx-auto">
        <SectionHeader
          badge="מגבלות"
          title="מגבלות והסתייגויות"
          subtitle="שקיפות מלאה לגבי מגבלות המתודולוגיה והמידע המוצג."
        />

        <div className="rounded-2xl border border-amber-500/15 bg-white/[0.04] backdrop-blur-md p-6 space-y-4">
          {[
            "שוק הקריפטו הוא שוק צעיר וולטילי. ביצועי עבר אינם מעידים על ביצועים עתידיים.",
            "מודל סיווג הראיות מבוסס על שיפוט אנליטי ואינו חף מהטיות. המתודולוגיה מתעדכנת לשיפור מתמיד.",
            "ציוני הסיכון הם כמותיים אך מבוססים חלקית על הערכות איכותניות. הם אינדיקטיביים ולא דטרמיניסטיים.",
            "הניתוח מתייחס לתפקוד טכנולוגי ומוסדי ואינו לוקח בחשבון רגולציה עתידית בלתי צפויה.",
            "TAMS אינו מהווה ייעוץ השקעות. כל משקיע חייב לבצע בדיקת נאותות עצמאית בהתאם לפרופיל הסיכון שלו.",
            "הצהרות צופות פני עתיד מבוססות על הנחות סבירות אך כפופות לאי-וודאות מהותית.",
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex gap-3 items-start"
            >
              <AlertTriangle className="size-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-xs text-zinc-500 text-center max-w-2xl mx-auto leading-relaxed"
        >
          מסמך זה מוצג למטרות מידע בלבד. אין לראות בו הצעה, שידול או המלצה
          לרכישה או מכירה של נכסים דיגיטליים. השקעה בנכסים דיגיטליים כרוכה
          בסיכון משמעותי, כולל אובדן מלא של ההשקעה.
        </motion.p>
      </section>
    </PageWrapper>
  );
}

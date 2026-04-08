"use client";

// דף משפטי וציות — תנאי שימוש, פרטיות, סיכונים ורגולציה
import PageWrapper from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { useState } from "react";

/* ===== אייקון חץ לפתיחה/סגירה ===== */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`size-5 shrink-0 text-amber-400 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ===== רכיב אקורדיון בודד ===== */
function AccordionSection({
  title,
  children,
  defaultOpen = false,
  index,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  index: number;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-amber-500/15 rounded-xl bg-white/[0.03] backdrop-blur-md overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-lg font-bold text-white">{title}</span>
        <ChevronIcon open={open} />
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-sm leading-relaxed text-zinc-300 space-y-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ===== תוכן הסעיפים ===== */
export default function LegalPage() {
  return (
    <PageWrapper bgGrid>
      {/* ===== Hero ===== */}
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-amber-500/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-amber-700 border border-amber-200 mb-6">
            Legal &amp; Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">מידע משפטי וציות</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            עמוד זה מרכז את כלל המידע המשפטי, תנאי השימוש, מדיניות הפרטיות וגילוי הסיכונים הנוגעים לשימוש בפלטפורמת TAMS. אנא קראו בעיון את כל הסעיפים להלן.
          </p>
        </motion.div>
      </section>

      {/* ===== סעיפי אקורדיון ===== */}
      <section className="pb-24 max-w-4xl mx-auto space-y-4">

        {/* 1 — תנאי שימוש */}
        <AccordionSection title="תנאי שימוש" index={0}>
          <p>
            ברוכים הבאים לפלטפורמת TAMS (&quot;הפלטפורמה&quot;, &quot;השירות&quot;). השימוש בפלטפורמה מהווה הסכמה מלאה ובלתי מותנית לתנאים המפורטים להלן. אם אינכם מסכימים לתנאים אלו, אנא הימנעו מכל שימוש בפלטפורמה.
          </p>
          <p>
            <strong className="text-amber-400">זכאות שימוש:</strong> השירות מיועד למשתמשים מעל גיל 18 בלבד. בעצם הגישה לפלטפורמה, אתם מאשרים כי אתם בגירים על פי חוקי מדינת מגוריכם וכי אתם כשירים מבחינה משפטית להתקשר בהסכם זה.
          </p>
          <p>
            <strong className="text-amber-400">שימוש מותר:</strong> השימוש בפלטפורמה מותר למטרות חוקיות בלבד. חל איסור מוחלט על שימוש לרעה, ניסיון לפרוץ מערכות, הפצת תוכנות זדוניות, או כל פעולה העלולה לפגוע בפלטפורמה או במשתמשיה.
          </p>
          <p>
            <strong className="text-amber-400">שינויים בתנאים:</strong> TAMS שומרת לעצמה את הזכות לעדכן תנאים אלו מעת לעת. שינויים מהותיים יפורסמו בפלטפורמה. המשך השימוש לאחר פרסום השינויים מהווה הסכמה לתנאים המעודכנים.
          </p>
          <p>
            <strong className="text-amber-400">הגבלת אחריות:</strong> השירות ניתן &quot;כפי שהוא&quot; (AS IS) ללא כל מצג או התחייבות, מפורשים או משתמעים. TAMS אינה אחראית לכל נזק ישיר, עקיף, תוצאתי או מיוחד הנובע מהשימוש בפלטפורמה.
          </p>
        </AccordionSection>

        {/* 2 — מדיניות פרטיות */}
        <AccordionSection title="מדיניות פרטיות" index={1}>
          <p>
            TAMS מחויבת להגנה על פרטיות המשתמשים. מדיניות זו מתארת את סוגי המידע הנאספים, אופן השימוש בו ואופן אחסונו.
          </p>
          <p>
            <strong className="text-amber-400">מידע נאסף:</strong> אנו עשויים לאסוף מידע אישי כגון שם, כתובת דוא&quot;ל, כתובת ארנק דיגיטלי, כתובת IP ומידע טכני אודות המכשיר והדפדפן. בנוסף, נאסף מידע אנליטי אודות דפוסי שימוש בפלטפורמה.
          </p>
          <p>
            <strong className="text-amber-400">שימוש במידע:</strong> המידע משמש לצורך תפעול הפלטפורמה, שיפור חוויית המשתמש, עמידה בדרישות רגולטוריות (KYC/AML), ותקשורת עם המשתמשים בנוגע לעדכונים ושינויים מהותיים.
          </p>
          <p>
            <strong className="text-amber-400">אחסון ואבטחה:</strong> המידע מאוחסן בשרתים מאובטחים תוך שימוש בהצפנה מקצה לקצה ובפרוטוקולי אבטחה מתקדמים. תקופת שמירת המידע נקבעת בהתאם לדרישות החוק ולצרכי הפלטפורמה.
          </p>
          <p>
            <strong className="text-amber-400">העברת מידע לצדדים שלישיים:</strong> TAMS לא תמכור או תעביר מידע אישי לצדדים שלישיים, למעט כנדרש על פי חוק, לצורך עמידה בדרישות רגולטוריות, או לספקי שירות חיוניים הכפופים להסכמי סודיות.
          </p>
          <p>
            <strong className="text-amber-400">זכויות המשתמש:</strong> למשתמשים עומדת הזכות לבקש גישה למידע האישי שנאסף עליהם, לבקש תיקונו או מחיקתו, בכפוף להוראות הדין החל.
          </p>
        </AccordionSection>

        {/* 3 — גילוי סיכונים */}
        <AccordionSection title="גילוי סיכונים" index={2}>
          <p className="text-amber-300 font-semibold">
            אזהרה: השקעה בנכסים דיגיטליים, קריפטו ובלוקצ&#39;יין כרוכה בסיכונים משמעותיים, לרבות אובדן מלא של ההשקעה.
          </p>
          <p>
            <strong className="text-amber-400">תנודתיות שוק:</strong> שוק הנכסים הדיגיטליים מאופיין בתנודתיות קיצונית. ערך הנכסים עשוי לעלות או לרדת באופן חד ובלתי צפוי בטווחי זמן קצרים ביותר.
          </p>
          <p>
            <strong className="text-amber-400">סיכון רגולטורי:</strong> הרגולציה בתחום הנכסים הדיגיטליים נמצאת בשלבי התפתחות. שינויים רגולטוריים עשויים להשפיע באופן מהותי על ערך הנכסים, על היכולת לסחור בהם, ועל חוקיות הפעילות בתחומי שיפוט שונים.
          </p>
          <p>
            <strong className="text-amber-400">סיכון טכנולוגי:</strong> טכנולוגיית הבלוקצ&#39;יין והחוזים החכמים עשויה להכיל פגמים, באגים או פרצות אבטחה. אין ערובה לתפקוד רציף ותקין של המערכות.
          </p>
          <p>
            <strong className="text-amber-400">סיכון נזילות:</strong> ייתכנו מצבים בהם לא ניתן יהיה למכור או להמיר נכסים דיגיטליים בזמן סביר ובמחיר הוגן.
          </p>
          <p>
            <strong className="text-amber-400">סיכון אובדן גישה:</strong> אובדן מפתחות פרטיים, סיסמאות או גישה לארנק דיגיטלי עשוי לגרום לאובדן בלתי הפיך של נכסים.
          </p>
          <p>
            <strong className="text-amber-400">סיכון צד נגדי:</strong> אין כל ערובה ליציבותם הפיננסית של צדדים שלישיים המעורבים במערכת, לרבות בורסות, ספקי שירותים ושותפים עסקיים.
          </p>
        </AccordionSection>

        {/* 4 — הצהרת Forward-Looking */}
        <AccordionSection title="הצהרת Forward-Looking" index={3}>
          <p>
            מסמכים, מצגות וחומרים שונים של TAMS עשויים להכיל הצהרות צופות פני עתיד (Forward-Looking Statements) כהגדרתן בחוקי ניירות הערך הרלוונטיים.
          </p>
          <p>
            הצהרות אלו כוללות, בין היתר, תחזיות, הערכות, ציפיות ואומדנים בנוגע לביצועים עתידיים, אסטרטגיה עסקית, תנאי שוק, פיתוחים טכנולוגיים ותוצאות פיננסיות. הצהרות אלו ניתנות לזיהוי באמצעות ביטויים כגון &quot;צפוי&quot;, &quot;מתוכנן&quot;, &quot;מוערך&quot;, &quot;אנו מאמינים&quot;, &quot;ייתכן ש-&quot; וביטויים דומים.
          </p>
          <p className="text-amber-300 font-semibold">
            הצהרות צופות פני עתיד אינן מהוות ערובה לתוצאות בפועל. התוצאות בפועל עשויות להיות שונות באופן מהותי מאלו המשתמעות מהצהרות אלו, בשל גורמים רבים שאינם בשליטת TAMS.
          </p>
          <p>
            TAMS אינה מתחייבת לעדכן הצהרות צופות פני עתיד לאחר פרסומן, למעט כנדרש על פי דין.
          </p>
        </AccordionSection>

        {/* 5 — אי-הצעה להשקעה */}
        <AccordionSection title="אי-הצעה להשקעה" index={4}>
          <div className="rounded-lg border border-red-500/30 bg-red-500/[0.05] p-5 space-y-3">
            <p className="text-red-400 font-bold text-base">
              ⚠ הודעה חשובה: התוכן בפלטפורמה זו אינו מהווה ייעוץ השקעות, ייעוץ פיננסי, ייעוץ מס או ייעוץ משפטי.
            </p>
            <p>
              כל המידע המוצג בפלטפורמת TAMS, לרבות נתונים, ניתוחים, מצגות וחומרים נלווים, מסופק למטרות מידע כללי בלבד ואינו מהווה הצעה, שידול או המלצה לרכישה, מכירה או החזקה של נכסים דיגיטליים או ניירות ערך מכל סוג שהוא.
            </p>
            <p>
              אין להסתמך על המידע המוצג בפלטפורמה כבסיס להחלטות השקעה. כל החלטת השקעה צריכה להתבסס על ייעוץ מקצועי עצמאי מיועצים מורשים ומוסמכים, תוך התחשבות במצבכם הפיננסי, צרכיכם ויעדיכם הספציפיים.
            </p>
            <p>
              ביצועי עבר, תחזיות ומודלים אנליטיים אינם מהווים ערובה לתוצאות עתידיות.
            </p>
          </div>
        </AccordionSection>

        {/* 6 — ציות רגולטורי */}
        <AccordionSection title="ציות רגולטורי" index={5}>
          <p>
            TAMS פועלת בהתאם למסגרת רגולטורית מקיפה ומחויבת לעמידה בכל דרישות החוק החלות על פעילותה.
          </p>
          <p>
            <strong className="text-amber-400">מניעת הלבנת הון (AML):</strong> TAMS מיישמת מדיניות מקיפה למניעת הלבנת הון ומימון טרור, בהתאם לתקנים הבינלאומיים ולדרישות הרגולטוריות המקומיות.
          </p>
          <p>
            <strong className="text-amber-400">הכר את הלקוח (KYC):</strong> נהלי זיהוי ואימות לקוחות מופעלים כנדרש, כולל אימות זהות, בדיקת רקע ומעקב שוטף אחר פעילות חריגה.
          </p>
          <p>
            <strong className="text-amber-400">הגנת מידע:</strong> TAMS פועלת בהתאם לתקנות הגנת הפרטיות הרלוונטיות, לרבות GDPR ותקנות מקומיות, ומיישמת אמצעי אבטחה מתקדמים להגנה על מידע אישי.
          </p>
          <p>
            <strong className="text-amber-400">דיווח ושקיפות:</strong> TAMS מקפידה על דיווח שוטף לרשויות המוסמכות כנדרש בדין ומחויבת לשקיפות מלאה מול המשתמשים והרגולטורים.
          </p>
          <p>
            <strong className="text-amber-400">מגבלות גיאוגרפיות:</strong> השירותים עשויים שלא להיות זמינים בכל תחומי השיפוט. באחריות המשתמש לוודא כי השימוש בפלטפורמה מותר על פי חוקי מדינת מגוריו.
          </p>
        </AccordionSection>

        {/* 7 — זכויות קניין רוחני */}
        <AccordionSection title="זכויות קניין רוחני" index={6}>
          <p>
            כל הזכויות, הבעלות והאינטרסים בפלטפורמת TAMS ובתכניה, לרבות אך לא רק: קוד מקור, עיצוב, לוגו, סימני מסחר, טקסטים, גרפיקה, אלגוריתמים, מודלים אנליטיים וכל קניין רוחני אחר — שייכים ל-TAMS ומוגנים בחוקי זכויות יוצרים, סימני מסחר ופטנטים בינלאומיים.
          </p>
          <p>
            <strong className="text-amber-400">שימוש מורשה:</strong> ניתנת בזאת רישיון מוגבל, לא בלעדי ולא ניתן להעברה, לצפייה ולשימוש אישי בתכני הפלטפורמה. חל איסור מוחלט על העתקה, שכפול, הפצה, שינוי, יצירת יצירות נגזרות, או כל שימוש מסחרי בתכני הפלטפורמה ללא אישור מפורש בכתב מ-TAMS.
          </p>
          <p>
            <strong className="text-amber-400">הפרת זכויות:</strong> כל הפרה של זכויות הקניין הרוחני עלולה לגרור הליכים משפטיים ותביעות פיצויים בהתאם לדין החל.
          </p>
        </AccordionSection>

        {/* 8 — יצירת קשר משפטי */}
        <AccordionSection title="יצירת קשר משפטי" index={7}>
          <p>
            לכל שאלה, בירור או פנייה בנושא משפטי, ניתן ליצור קשר עם המחלקה המשפטית של TAMS באמצעים הבאים:
          </p>
          <div className="rounded-lg border border-amber-500/15 bg-white/[0.02] p-5 space-y-3">
            <p>
              <strong className="text-amber-400">דוא&quot;ל:</strong>{" "}
              <a href="mailto:legal@tams.io" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors">
                legal@tams.io
              </a>
            </p>
            <p>
              <strong className="text-amber-400">נושא הפנייה:</strong> אנא ציינו בפנייתכם את נושא הבירור (פרטיות, תנאי שימוש, קניין רוחני, רגולציה) לצורך טיפול יעיל ומהיר.
            </p>
            <p>
              <strong className="text-amber-400">זמן מענה:</strong> אנו מתחייבים לטפל בפניות משפטיות תוך 14 ימי עסקים מיום קבלת הפנייה.
            </p>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            עדכון אחרון: אפריל 2026
          </p>
        </AccordionSection>

      </section>
    </PageWrapper>
  );
}

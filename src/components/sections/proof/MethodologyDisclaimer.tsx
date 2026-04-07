"use client";

// מתודולוגיה והסתייגויות — חובה לכלול בעמוד ראיות מוסדי
import { motion } from "framer-motion";
import { BookOpen, Scale, AlertTriangle, Shield, FileText, Info } from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

const methodologyItems = [
  {
    icon: Shield,
    title: "Confidence Classification",
    content: [
      "רמת ביטחון גבוהה: הקשר אושר באמצעות הודעות רשמיות, דיווחי SEC, או השקות מוצר ישירות על ידי שני הצדדים. מספר מקורות בלתי תלויים מאשרים את הממצאים.",
      "רמת ביטחון בינונית: הקשר דווח על ידי מקורות אמינים אך ייתכן שחסר אישור רשמי משני הצדדים. ייתכן שהקשר בשלב פיילוט או שהפרטים מוגבלים.",
      "רמת ביטחון נמוכה: הקשר הוא עקיף, מוסק מפעילות באקוסיסטם, או מבוסס על דיווח ממקור יחיד. עשוי לכלול שותפויות היסטוריות שלא אושרו מחדש.",
    ],
  },
  {
    icon: Scale,
    title: "Relationship Type Distinctions",
    content: [
      "אינטגרציה ישירה: הארגון משתמש באופן פעיל ברשת ה-blockchain או בפרוטוקול בסביבת ייצור או קרובה לייצור.",
      "פיילוט / Sandbox: הארגון ביצע בדיקות רשמיות, הוכחת היתכנות, או ניסוי ב-Sandbox רגולטורי — טרם הגיע לסביבת ייצור.",
      "תמיכת תשתית: הארגון מספק שירותים טכניים (ענן, צמתים, כלי פיתוח) לרשת מבלי לבנות בהכרח מוצרים עליה.",
      "מועצת ממשל: הארגון משתתף בממשל הרשת — דבר המעיד על שיוך מוסדי אך לא בהכרח על שימוש פעיל במוצר.",
      "חברות באקוסיסטם: הארגון משתתף באקוסיסטם הרחב (קואליציות, קבוצות עבודה) ללא אינטגרציה ישירה של מוצר.",
      "ניסיון היסטורי: קשר עבר שאינו פעיל עוד או שניתנה לו עדיפות נמוכה. נכלל לשם שלמות ושקיפות.",
      "חשיפה השקעתית: הארגון מספק מוצרי השקעה (ETFs, קרנות נאמנות) המעניקים למשקיעים חשיפה לנכס — קשר מבני שוק.",
    ],
  },
  {
    icon: BookOpen,
    title: "What Counts as Evidence",
    content: [
      "הודעות לעיתונות רשמיות ופרסומים מטעם הארגון או הרשת",
      "דיווחי SEC, הגשות רגולטוריות ומסמכים ממשלתיים",
      "השקות מוצר בסביבת ייצור הניתנות לצפייה on-chain או דרך ממשקי API ציבוריים",
      "תוצאות פיילוט שפורסמו ודוחות הוכחת היתכנות",
      "חברות במועצת ממשל המפורסמת באופן פומבי באתרי הרשת",
      "דיווחי תעשייה אמינים מאמצעי תקשורת מוכרים",
    ],
  },
  {
    icon: Info,
    title: "What Does NOT Count as Direct Adoption",
    content: [
      "אזכורים בדוחות אנליסטים ללא אישור שימוש ישיר",
      "מצגות בכנסים או הצהרות \"בחינה\" ללא פעולה המשכית",
      "חפיפה באקוסיסטם (לדוגמה, שימוש של שני הצדדים ב-Ethereum אינו מעיד על שיתוף פעולה ביניהם)",
      "מעורבות ברשתות חברתיות או ציוצים של מנהלים ללא שותפות מהותית",
      "אינטראקציות ניסיוניות חד-פעמיות ללא מחויבות מתמשכת",
      "יחסי ספק בהם הארגון משתמש במוצר הבנוי על blockchain מבלי להיות מודע לתשתית ה-blockchain הבסיסית",
    ],
  },
];

export default function MethodologyDisclaimer() {
  const { t } = useLanguage();

  // כותרות מתודולוגיה מתורגמות
  const methodologyTitles: Record<string, string> = {
    "Confidence Classification": t("proof.methodology.confidenceTitle"),
    "Relationship Type Distinctions": t("proof.methodology.relationshipTitle"),
    "What Counts as Evidence": t("proof.methodology.evidenceTitle"),
    "What Does NOT Count as Direct Adoption": t("proof.methodology.notEvidenceTitle"),
  };

  return (
    <section className="py-16 max-w-5xl mx-auto">
      <SectionHeader
        badge={t("proof.methodology.badge")}
        title={t("proof.methodology.title")}
        subtitle={t("proof.methodology.subtitle")}
      />

      {/* מתודולוגיה */}
      <div className="space-y-4 mt-8">
        {methodologyItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <item.icon className="h-4 w-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">{methodologyTitles[item.title] || item.title}</h3>
            </div>
            <ul className="space-y-2">
              {item.content.map((line) => (
                <li key={line} className="text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2">
                  <span className="text-zinc-600 mt-1 shrink-0">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* הסתייגויות משפטיות */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 space-y-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">{t("proof.methodology.disclaimersTitle")}</h3>
        </div>

        <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-6 space-y-4">
          {[
            "עמוד זה מיועד למטרות מידע וחינוך בלבד. הוא אינו מהווה ייעוץ השקעות, הצעה למכירה, או שידול לרכישת ניירות ערך או נכסים דיגיטליים כלשהם.",
            "נכסים דיגיטליים הם תנודתיים, ספקולטיביים, ונושאים סיכון משמעותי להפסד — כולל הפסד מלא של הקרן. ביצועי עבר וראיות היסטוריות על קשרי אקוסיסטם אינם מבטיחים תשואות עתידיות.",
            "הראיות המוצגות מייצגות סיווג נכון לנקודת זמן מסוימת. קשרי אקוסיסטם עשויים להתפתח, להתרחב, להצטמצם, או להסתיים. שותפויות היסטוריות אינן משקפות בהכרח את המצב הנוכחי.",
            "לוחות זמנים לאימוץ blockchain ארגוני הם מטבעם בלתי צפויים. תוכניות פיילוט אינן מתרגמות בהכרח לפריסה בסביבת ייצור. עניין מוסדי אינו מבטיח שימוש בסביבת ייצור.",
            "רמות הביטחון משקפות את הערכת צוות המחקר הנוכחית ועשויות להיות שונות ממסקנות של אנליסטים אחרים. כל הסיווגים כפופים לעדכון עם הגעת מידע חדש.",
            "התרחישים המוצגים הם מסגרות איכותניות, לא תחזיות פיננסיות. אין לפרש אותם כתוצאות משוקללות הסתברות או תשואות צפויות.",
            "על המשקיעים לבצע בדיקת נאותות עצמאית ולהתייעץ עם יועצים פיננסיים, משפטיים ומיסויים מוסמכים לפני קבלת כל החלטת השקעה.",
          ].map((disclaimer) => (
            <p key={disclaimer} className="text-[11px] text-zinc-400 leading-relaxed">
              {disclaimer}
            </p>
          ))}
        </div>

        {/* חותמת מתודולוגיה */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <FileText className="h-3.5 w-3.5 text-zinc-600" />
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
            {t("proof.methodology.stamp")}
          </span>
        </div>
      </motion.div>
    </section>
  );
}

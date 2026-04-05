// נתוני מפת דרכים - שלבי פיתוח הפרויקט

export interface Milestone {
  label: string;
  completed: boolean;
}

export interface Phase {
  id: string;
  title: string;
  quarter: string;
  status: "completed" | "current" | "upcoming";
  description: string;
  milestones: Milestone[];
}

export const phases: Phase[] = [
  {
    id: "phase-1",
    title: "מחקר ותשתית",
    quarter: "Q1 2026",
    status: "completed",
    description:
      "הנחת היסודות - מחקר שוק מעמיק, בניית תזת השקעה, ותכנון ארכיטקטורת הארנקים.",
    milestones: [
      { label: "מחקר שוק ונכסים דיגיטליים", completed: true },
      { label: "גיבוש תזת השקעה", completed: true },
      { label: "תכנון ארכיטקטורת 4 ארנקים", completed: true },
      { label: "ניתוח TAM/SAM/SOM", completed: true },
    ],
  },
  {
    id: "phase-2",
    title: "פיתוח ובנייה",
    quarter: "Q2 2026",
    status: "current",
    description:
      "בניית הפלטפורמה הטכנית, פיתוח כלי ניהול ארנקים, והקמת תשתית DeFi.",
    milestones: [
      { label: "פיתוח ממשק ניהול פורטפוליו", completed: true },
      { label: "אינטגרציה עם פרוטוקולי DeFi", completed: true },
      { label: "מערכת ניטור וניהול סיכונים", completed: false },
      { label: "בדיקות אבטחה ו-audit", completed: false },
    ],
  },
  {
    id: "phase-3",
    title: "השקה מוגבלת",
    quarter: "Q3 2026",
    status: "upcoming",
    description:
      "השקה מוגבלת למשקיעים נבחרים, ניטור ביצועים, ואופטימיזציה של אסטרטגיות.",
    milestones: [
      { label: "גיוס סבב ראשון", completed: false },
      { label: "הפעלת ארנק מסחר", completed: false },
      { label: "הפעלת אסטרטגיות DeFi", completed: false },
      { label: "דוחות ביצועים חודשיים", completed: false },
    ],
  },
  {
    id: "phase-4",
    title: "צמיחה והרחבה",
    quarter: "Q4 2026",
    status: "upcoming",
    description:
      "הרחבת הפעילות, הוספת נכסים ואסטרטגיות חדשות, ומעבר לניהול מוסדי מלא.",
    milestones: [
      { label: "הרחבת אקוסיסטם הנכסים", completed: false },
      { label: "אסטרטגיות מסחר מתקדמות", completed: false },
      { label: "שיתופי פעולה מוסדיים", completed: false },
      { label: "דוח שנתי ראשון", completed: false },
    ],
  },
  {
    id: "phase-5",
    title: "בשלות וסקייל",
    quarter: "2027+",
    status: "upcoming",
    description:
      "מעבר למודל ניהול מוסדי מלא, גיוון אסטרטגיות, והרחבה לשווקים נוספים.",
    milestones: [
      { label: "ניהול נכסים מוסדי מלא", completed: false },
      { label: "הרחבה גלובלית", completed: false },
      { label: "מוצרים פיננסיים מתקדמים", completed: false },
      { label: "רישיון ניהול השקעות", completed: false },
    ],
  },
];

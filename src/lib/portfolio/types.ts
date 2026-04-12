// טיפוסי שכבת הגישה לנתוני התיק
// הערה: הטיפוסים נשאבים מתוך קובץ ה-mock הקיים כדי למנוע כפילות.
// כשנחבר מקור נתונים אמיתי, הטיפוסים האלה יישארו חוזה יציב לקומפוננטות.

import type {
  PortfolioSummary as MockPortfolioSummary,
  HoldingPosition,
  WalletBalance as MockWalletBalance,
  ActivityItem as MockActivityItem,
  PerformancePoint as MockPerformancePoint,
  DeFiPosition as MockDeFiPosition,
} from "@/data/dashboard-mock";

// סיכום התיק הכולל (שווי, תשואות)
export type PortfolioSummary = MockPortfolioSummary;

// שם ישן לתאימות לאחור — להשתמש ב-PortfolioSummary בקוד חדש
export type Portfolio = MockPortfolioSummary;

// פוזיציית אחזקה בודדת בתיק
export type Holding = HoldingPosition;

// יתרת ארנק בודד
export type WalletBalance = MockWalletBalance;

// פריט פעילות יחיד בלוג הפעילות
export type ActivityItem = MockActivityItem;

// נקודת מדידה היסטורית על ציר הזמן
export type PerformancePoint = MockPerformancePoint;

// פוזיציית DeFi (סטייקינג, הלוואות, נזילות)
export type DeFiPosition = MockDeFiPosition;

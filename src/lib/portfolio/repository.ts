// =============================================================================
// שכבת הגישה לנתוני התיק (Repository / Abstraction Seam)
// -----------------------------------------------------------------------------
// זהו ה-seam המרכזי להחלפת מקור נתונים: היום מחזיר נתוני mock קבועים,
// מחר יחליף אותם קריאות HTTP ל-API אמיתי או שאילתות ל-DB.
// קומפוננטות המסך לא מייבאות לעולם ישירות מ-@/data/dashboard-mock —
// כל צרכן עובר דרך הפונקציות המיוצאות כאן.
// חתימות הפונקציות הן חוזה יציב — המימוש מתחלף רק בתוך הקובץ הזה.
// הערה: הפונקציות מחזיקות חתימה סינכרונית כדי לא לשבור קומפוננטות client
// קיימות. כשנחבר API אמיתי, סביר שנעטוף את זה ב-hook מבוסס cache (React Query
// / SWR) ואז נעביר את הקומפוננטות ל-async בהדרגה.
// =============================================================================

import {
  portfolioSummary,
  holdings,
  walletBalances,
  recentActivity,
  performanceHistory,
  defiPositions,
  safeAssetsValue,
} from "@/data/dashboard-mock";
import type {
  PortfolioSummary,
  Holding,
  WalletBalance,
  ActivityItem,
  PerformancePoint,
  DeFiPosition,
} from "./types";

// מחזיר את סיכום התיק הכולל (שווי, תשואות יומית/שבועית/חודשית/כוללת)
export function getPortfolioSummary(): PortfolioSummary {
  return portfolioSummary;
}

// מחזיר את כל פוזיציות האחזקה בתיק
export function getHoldings(): Holding[] {
  return holdings;
}

// מחזיר את רשימת יתרות הארנקים
export function getWalletBalances(): WalletBalance[] {
  return walletBalances;
}

// מחזיר את יומן הפעילות האחרון (עסקאות, סטייקינג, הפקדות וכו')
// ניתן להגביל את מספר הרשומות המוחזרות באמצעות הפרמטר limit
export function getRecentActivity(limit?: number): ActivityItem[] {
  if (typeof limit === "number" && limit >= 0) {
    return recentActivity.slice(0, limit);
  }
  return recentActivity;
}

// מחזיר את היסטוריית הביצועים לגרפים (12 חודשים אחרונים)
export function getPerformanceHistory(): PerformancePoint[] {
  return performanceHistory;
}

// מחזיר את פוזיציות ה-DeFi הפעילות
export function getDeFiPositions(): DeFiPosition[] {
  return defiPositions;
}

// מחזיר את שווי הנכסים הבטוחים (זהב, כסף, נחושת) בשקלים
export function getSafeAssetsValue(): number {
  return safeAssetsValue;
}

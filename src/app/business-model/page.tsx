"use client";

// עמוד מודל עסקי — ארכיטקטורה דו-שכבתית
//   שכבת ליבה: 16 נכסי שכנוע (Gold · Silver · Copper · AltCoin 16) — מקור הערך הראשי
//   שכבת מנועים מקבילים: Staking · DeFi · Trading — תשואה תפעולית מעל הליבה
//   רכיב תחזוקה: Cash/gas/audit
import { motion } from "framer-motion";
import {
  Crown, Award, Cog, Layers,
  Coins, TrendingUp, Briefcase, Zap, Wrench,
  ArrowRight, Building2, Wallet,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/layout/SectionHeader";
import PageTableOfContents from "@/components/layout/PageTableOfContents";
import Footnote from "@/components/ui/Footnote";
import { useLanguage } from "@/lib/i18n";

const TIER_ICONS = [Crown, Award, Cog, Layers];
const ENGINE_ICONS = [Coins, Briefcase, TrendingUp, Wrench, Zap];

const TEXTS = {
  en: {
    sections: [
      { id: "intro", label: "Overview" },
      { id: "core", label: "Core Holdings" },
      { id: "engines", label: "Parallel Engines" },
      { id: "fees", label: "Fees" },
      { id: "nav", label: "NAV Example" },
      { id: "transparency", label: "Transparency" },
    ],
    eyebrow: "Economics & Business Model",
    heroTitle: "Two Layers of Return: Conviction Assets, Parallel Engines",
    heroLede:
      "The primary source of value is appreciation of 16 conviction assets held long-term. On top of those holdings, parallel engines — staking, DeFi yield, active trading — generate operating income without selling the core.",

    coreBadge: "Core Layer · Where Capital Sits",
    coreTitle: "16 Conviction Assets · Tiered by Confidence",
    coreSubtitle:
      "The portfolio is built around 16 hand-selected digital assets, organized into three confidence tiers. The core thesis is that this basket appreciates over a multi-year horizon as institutional adoption deepens. Allocation reflects conviction, not market-cap weighting.",
    tiers: [
      {
        name: "Gold Tier",
        weight: "~50%",
        count: "2 assets",
        examples: "BTC · ETH",
        thesis: "Store of value. The deepest institutional adoption, the most liquidity, the most regulatory clarity. The anchor of the portfolio.",
        accent: "#d4a853",
      },
      {
        name: "Silver Tier",
        weight: "~25%",
        count: "4 assets",
        examples: "SOL · AVAX · LINK · MATIC",
        thesis: "High-conviction infrastructure. Proven L1s and middleware with measurable enterprise traction and live revenue.",
        accent: "#c0c0c0",
      },
      {
        name: "Copper Tier",
        weight: "~15%",
        count: "10 assets",
        examples: "L2s · DePIN · RWA-native · AI-blockchain",
        thesis: "Higher beta, smaller positions. Emerging infrastructure where TAMS research has identified asymmetric upside with managed downside.",
        accent: "#b87333",
      },
      {
        name: "AltCoin 16 — Composition",
        weight: "100%",
        count: "16 names",
        examples: "Total basket across the three tiers above",
        thesis: "Sized by conviction, not by market cap. Each asset has a research file, a thesis, evidence of institutional relevance, and a downside case. Reviewed quarterly.",
        accent: "#5a8fd8",
      },
    ],
    coreFooter: "Asset selection is the primary value driver. Engines (next section) operate on top of these holdings, not instead of them.",

    enginesBadge: "Parallel Layer · Operating Yield",
    enginesTitle: "Engines That Run On Top of Holdings",
    enginesSubtitle:
      "Each engine extracts yield from the core portfolio without disturbing long-term positions. Engines are diversified by mechanism: protocol-native rewards, lending interest, market-neutral trading, and fund operations.",
    engines: [
      {
        name: "Staking & Validator Yield",
        scope: "Up to 25% of portfolio",
        yield: "5.5–8.0% APY + 0.5–1.5% MEV",
        bullets: [
          "ETH staked through Lido + EigenLayer (base + restaking premium)",
          "SOL staked through Jito (MEV-aware validators)",
          "Liquid staking tokens preserve composability",
          "Productive use of held assets — no need to sell to earn",
        ],
      },
      {
        name: "Institutional Lending",
        scope: "10–15% of portfolio",
        yield: "3–7% APY · stablecoin",
        bullets: [
          "Lending stablecoins to over-collateralized borrowers",
          "Aave V3, Maple Finance, Centrifuge — Tier-1 audited venues",
          "Maximum single-protocol exposure capped at 10%",
          "Continuous monitoring of TVL, audit status, governance",
        ],
      },
      {
        name: "DeFi Yield & LP",
        scope: "Up to 20% of portfolio",
        yield: "5–15% APY · stable LP",
        bullets: [
          "Stablecoin pairs on Curve / Uniswap V3 (IL-managed)",
          "RWA exposure via BUIDL, BENJI (4.3-4.6% on tokenized T-Bills)",
          "67% of institutions globally favor DeFi over spot — Nomura, Apr 2026",
          "Cap of 20% prevents protocol-concentration risk",
        ],
      },
      {
        name: "Active Trading",
        scope: "Up to 15% of portfolio",
        yield: "Target Sharpe 1.2+",
        bullets: [
          "Discretionary momentum, basis trades, funding-rate carry",
          "Cross-L1 rotation when conviction-weighted exposure shifts",
          "Drawdown circuit breakers at –4% / –7% portfolio levels",
          "Monthly attribution: alpha from trades vs. yield vs. directional",
        ],
      },
      {
        name: "Stablecoin Reserve & Operations",
        scope: "5–10% of portfolio · always-on",
        yield: "~4% APY on idle USDC",
        bullets: [
          "Permanent stablecoin reserve — collateral for every operation",
          "On-chain liquidity for rebalances, exits, and opportunistic entry",
          "Funds gas, custody, audit, legal — never selling core to pay operations",
          "Risk shock-absorber: never forced to liquidate during drawdowns",
        ],
      },
    ],
    yieldLabel: "Yield Range",
    scopeLabel: "Allocation",

    feesBadge: "Fee Architecture",
    feesTitle: "The Economic Contract Between GP and LP",
    feesSubtitle:
      "Industry-standard institutional structure. The 16-asset core return accrues to LPs pro-rata — TAMS earns from management + performance fees only.",
    gpEyebrow: "General Partner",
    gpTitle: "TAMS Capital · Fee Schedule",
    feeRows: [
      { label: "Management Fee", value: "1.75% p.a.", note: "Charged quarterly on average AUM" },
      { label: "Performance Fee", value: "17.5%", note: "Above 6.0% hurdle, with high-water mark" },
      { label: "Hurdle Rate", value: "6.0%", note: "ETH staking risk-free baseline" },
      { label: "High-Water Mark", value: "Yes", note: "No double-charging on recovery" },
      { label: "Minimum Investment", value: "$100,000", note: "Accredited investors only" },
      { label: "Lock-up", value: "12 months", note: "Quarterly redemptions, 30-day notice" },
    ],
    lpEyebrow: "Limited Partner",
    lpTitle: "What LPs Receive",
    lpItems: [
      { title: "Asset Appreciation (Core)", body: "100% of the 16-asset basket appreciation accrues to LPs pro-rata. This is the primary return source." },
      { title: "Engine Yield", body: "Net of fees, engine yield distributes to LPs alongside asset appreciation. Quarterly NAV statements." },
      { title: "On-Chain Verifiability", body: "All custody addresses disclosed under NDA. LPs verify holdings independently." },
      { title: "Annual Audit + Tax Pack", body: "K-1 / equivalent for relevant jurisdictions. PFIC analysis available." },
    ],
    lpFooter: "LPs are charged net — all custody, gas, audit and protocol fees are absorbed by the management fee, not netted against LP returns.",

    navBadge: "Worked Example",
    navTitle: "$50M Portfolio · Both Return Sources Combined",
    navSubtitle:
      "Illustrative. Demonstrates how asset appreciation (the primary driver) and engine yield (the operating layer) combine into total LP return.",
    navCols: { source: "Source", basis: "Basis", rate: "Rate / Movement", contribution: "Contribution" },
    navSection1: "Layer 1 · Asset Appreciation (Core)",
    navSection2: "Layer 2 · Engine Yield (Parallel)",
    navRows1: [
      { source: "Gold tier (BTC, ETH)", basis: "$25.0M (50%)", rate: "+18%", contribution: "$4,500K" },
      { source: "Silver tier", basis: "$12.5M (25%)", rate: "+24%", contribution: "$3,000K" },
      { source: "Copper tier", basis: "$7.5M (15%)", rate: "+35%", contribution: "$2,625K" },
    ],
    navRows2: [
      { source: "Staking + MEV", basis: "$12.5M staked", rate: "7.0% APY", contribution: "$875K" },
      { source: "DeFi lending + LP", basis: "$7.5M deployed", rate: "6.5% APY", contribution: "$488K" },
      { source: "Active trading", basis: "$5.0M trading book", rate: "12% on book", contribution: "$600K" },
      { source: "Cash buffer", basis: "$5.0M reserve", rate: "4% APY", contribution: "$200K" },
    ],
    navAppreciation: "Asset appreciation subtotal",
    navYield: "Engine yield subtotal",
    navGross: "Total gross return",
    navMgmt: "Less: Management fee (1.75%)",
    navPerf: "Less: Performance fee (17.5% above hurdle)",
    navNet: "Net to LPs",
    navFooter:
      "Asset appreciation rates are illustrative for a representative year. Actual returns depend on market conditions, regulatory developments, and execution. Engine yields sourced from Apr 2026 market data.",

    transparencyEyebrow: "Transparency by Default",
    transparencyTitle: "Every dollar earned is traceable to an asset, an engine, or a fee.",
    transparencyLede:
      "Accredited investors receive the full data room — fee schedule, NAV methodology, custody attestations, audit letters, on-chain proof, and the research file behind each of the 16 holdings.",
    requestAccess: "Request Access",
  },
  he: {
    sections: [
      { id: "intro", label: "סקירה" },
      { id: "core", label: "ליבת התיק" },
      { id: "engines", label: "מנועים מקבילים" },
      { id: "fees", label: "דמי-ניהול" },
      { id: "nav", label: "דוגמת NAV" },
      { id: "transparency", label: "שקיפות" },
    ],
    eyebrow: "כלכלה ומודל עסקי",
    heroTitle: "שתי שכבות של תשואה: נכסי שכנוע ומנועים מקבילים",
    heroLede:
      "מקור הערך הראשי הוא ייסוף של 16 נכסי שכנוע המוחזקים לטווח ארוך. מעל האחזקות, מנועים מקבילים — staking, תשואת DeFi, מסחר אקטיבי — מייצרים הכנסה תפעולית בלי למכור את הליבה.",

    coreBadge: "שכבת ליבה · היכן ההון יושב",
    coreTitle: "16 נכסי שכנוע · מסווגים לפי דרגת ביטחון",
    coreSubtitle:
      "התיק בנוי סביב 16 נכסים דיגיטליים נבחרים, מאורגנים בשלוש שכבות ביטחון. התזה המרכזית היא שהסל מייסף לאורך אופק רב-שנתי בעקבות העמקת האימוץ המוסדי. ההקצאה משקפת רמת שכנוע, לא משקל לפי שווי שוק.",
    tiers: [
      {
        name: "שכבת זהב",
        weight: "~50%",
        count: "2 נכסים",
        examples: "BTC · ETH",
        thesis: "שמירת ערך. האימוץ המוסדי העמוק ביותר, הנזילות הגבוהה ביותר, הוודאות הרגולטורית החזקה ביותר. עוגן התיק.",
        accent: "#d4a853",
      },
      {
        name: "שכבת כסף",
        weight: "~25%",
        count: "4 נכסים",
        examples: "SOL · AVAX · LINK · MATIC",
        thesis: "תשתית בשכנוע גבוה. רשתות L1 ו-middleware מוכחים עם נוכחות אנטרפרייז ברורה והכנסות חיות.",
        accent: "#c0c0c0",
      },
      {
        name: "שכבת נחושת",
        weight: "~15%",
        count: "10 נכסים",
        examples: "L2 · DePIN · RWA-native · AI-blockchain",
        thesis: "ביתא גבוהה יותר, פוזיציות קטנות יותר. תשתיות מתפתחות שמחקר TAMS זיהה בהן יחס סיכון-סיכוי אסימטרי עם downside מנוהל.",
        accent: "#b87333",
      },
      {
        name: "AltCoin 16 — הרכב",
        weight: "100%",
        count: "16 שמות",
        examples: "סך הסל בשלוש השכבות מעל",
        thesis: "Sizing לפי שכנוע, לא לפי שווי שוק. לכל נכס יש קובץ מחקר, תזה, ראיות לרלוונטיות מוסדית, ותרחיש שלילי. סקירה רבעונית.",
        accent: "#5a8fd8",
      },
    ],
    coreFooter: "בחירת הנכסים היא מנוע הערך העיקרי. המנועים (סקציה הבאה) פועלים מעל האחזקות, לא במקומן.",

    enginesBadge: "שכבה מקבילה · תשואה תפעולית",
    enginesTitle: "מנועים שרצים מעל האחזקות",
    enginesSubtitle:
      "כל מנוע מוציא תשואה מתיק הליבה בלי להפר פוזיציות לטווח ארוך. המנועים מגוונים לפי מנגנון: תגמולי פרוטוקול, ריבית הלוואה, מסחר market-neutral, ותפעול קרן.",
    engines: [
      {
        name: "Staking ותגמולי Validator",
        scope: "עד 25% מהתיק",
        yield: "5.5–8.0% APY + 0.5–1.5% MEV",
        bullets: [
          "ETH ב-staking דרך Lido + EigenLayer (בסיס + פרמיית restaking)",
          "SOL ב-staking דרך Jito (validators מוטי-MEV)",
          "Liquid staking tokens משמרים composability",
          "ניצול פרודוקטיבי של נכסים מוחזקים — אין צורך למכור כדי להרוויח",
        ],
      },
      {
        name: "הלוואות מוסדיות",
        scope: "10–15% מהתיק",
        yield: "3–7% APY · stablecoin",
        bullets: [
          "הלוואת stablecoins ללווים עם over-collateralization",
          "Aave V3, Maple Finance, Centrifuge — venues מבוקרים Tier-1",
          "תקרת חשיפה לפרוטוקול בודד 10%",
          "ניטור רציף של TVL, סטטוס ביקורת וממשל",
        ],
      },
      {
        name: "תשואת DeFi ו-LP",
        scope: "עד 20% מהתיק",
        yield: "5–15% APY · LP יציב",
        bullets: [
          "צמדי stablecoin ב-Curve / Uniswap V3 (ניהול IL)",
          "חשיפה ל-RWA דרך BUIDL, BENJI (4.3-4.6% על אג״ח מטוקן)",
          "67% מהמוסדות גלובלית מעדיפים DeFi על spot — Nomura, אפריל 2026",
          "תקרה של 20% מונעת ריכוז סיכון בפרוטוקול",
        ],
      },
      {
        name: "מסחר אקטיבי",
        scope: "עד 15% מהתיק",
        yield: "Sharpe יעד 1.2+",
        bullets: [
          "מומנטום דיסקרטיוני, basis trades, carry של funding rates",
          "סבב בין-L1 כשחשיפת השכנוע משתנה",
          "מנתקי מעגל בנפילה של –4% / –7% תיק",
          "שיוך חודשי: אלפא מסחר vs תשואה vs כיווני",
        ],
      },
      {
        name: "רזרבת Stablecoin ותפעול",
        scope: "5–10% מהתיק · קבוע",
        yield: "~4% APY על USDC לא-פעיל",
        bullets: [
          "רזרבת stablecoin תמידית — בטוחה לכל פעולה",
          "נזילות on-chain לאיזונים מחדש, יציאות, וכניסות הזדמנותיות",
          "מממן gas, custody, ביקורת, משפט — אף פעם לא מוכרים את הליבה כדי לממן תפעול",
          "אמצעי בלימת זעזועים: אף פעם לא נאלצים לפזר במהלך drawdown",
        ],
      },
    ],
    yieldLabel: "טווח תשואה",
    scopeLabel: "הקצאה",

    feesBadge: "מבנה דמי-ניהול",
    feesTitle: "החוזה הכלכלי בין GP ל-LP",
    feesSubtitle:
      "מבנה מוסדי תקני. תשואת הליבה של 16 הנכסים מצטברת ל-LP pro-rata — TAMS מרוויחה מדמי ניהול והצלחה בלבד.",
    gpEyebrow: "שותף כללי",
    gpTitle: "TAMS Capital · לוח דמי-ניהול",
    feeRows: [
      { label: "דמי ניהול", value: "1.75% שנתי", note: "נגבים רבעונית על AUM ממוצע" },
      { label: "דמי הצלחה", value: "17.5%", note: "מעל hurdle של 6.0%, עם high-water mark" },
      { label: "סף תשואה (Hurdle)", value: "6.0%", note: "תשואת staking ETH חסרת-סיכון" },
      { label: "High-Water Mark", value: "כן", note: "אין כפל-חיוב לאחר התאוששות" },
      { label: "השקעה מינימלית", value: "$100,000", note: "משקיעים מוסמכים בלבד" },
      { label: "נעילה (Lock-up)", value: "12 חודשים", note: "פדיונות רבעוניים, התראה 30 יום" },
    ],
    lpEyebrow: "שותף מוגבל",
    lpTitle: "מה ה-LP מקבל",
    lpItems: [
      { title: "ייסוף נכסים (ליבה)", body: "100% מייסוף סל 16 הנכסים מצטבר ל-LP pro-rata. זה מקור התשואה הראשי." },
      { title: "תשואת מנועים", body: "נטו לאחר עמלות, תשואת המנועים מחולקת ל-LP יחד עם ייסוף הנכסים. דוחות NAV רבעוניים." },
      { title: "אימות on-chain", body: "כתובות custody חשופות תחת NDA. ה-LP מאמת אחזקות באופן עצמאי." },
      { title: "ביקורת שנתית + ערכת מס", body: "K-1 או שווה-ערך לפי תחום שיפוט. ניתוח PFIC זמין." },
    ],
    lpFooter: "ה-LP מחויב נטו — כל עמלות ה-custody, gas, ביקורת ופרוטוקול נספגות בדמי הניהול ולא נקזזו מתשואת ה-LP.",

    navBadge: "דוגמה מעובדת",
    navTitle: "תיק $50M · שני מקורות התשואה משולבים",
    navSubtitle:
      "המחשה. מדגימה איך ייסוף הנכסים (המנוע הראשי) ותשואת המנועים (השכבה התפעולית) מתחברים לתשואה כוללת ל-LP.",
    navCols: { source: "מקור", basis: "בסיס", rate: "שיעור / תנועה", contribution: "תרומה" },
    navSection1: "שכבה 1 · ייסוף נכסים (ליבה)",
    navSection2: "שכבה 2 · תשואת מנועים (מקבילה)",
    navRows1: [
      { source: "שכבת זהב (BTC, ETH)", basis: "$25.0M (50%)", rate: "+18%", contribution: "$4,500K" },
      { source: "שכבת כסף", basis: "$12.5M (25%)", rate: "+24%", contribution: "$3,000K" },
      { source: "שכבת נחושת", basis: "$7.5M (15%)", rate: "+35%", contribution: "$2,625K" },
    ],
    navRows2: [
      { source: "Staking + MEV", basis: "$12.5M ב-staking", rate: "7.0% APY", contribution: "$875K" },
      { source: "DeFi הלוואות + LP", basis: "$7.5M פרוס", rate: "6.5% APY", contribution: "$488K" },
      { source: "מסחר אקטיבי", basis: "$5.0M ספר מסחר", rate: "12% על הספר", contribution: "$600K" },
      { source: "רזרבת מזומן", basis: "$5.0M רזרבה", rate: "4% APY", contribution: "$200K" },
    ],
    navAppreciation: "סיכום ייסוף נכסים",
    navYield: "סיכום תשואת מנועים",
    navGross: "תשואה ברוטו כוללת",
    navMgmt: "פחות: דמי ניהול (1.75%)",
    navPerf: "פחות: דמי הצלחה (17.5% מעל hurdle)",
    navNet: "נטו ל-LP",
    navFooter:
      "שיעורי ייסוף הנכסים הם להמחשה לשנה מייצגת. תשואות בפועל תלויות בתנאי שוק, התפתחויות רגולטוריות וביצוע. תשואות המנועים מבוססות על נתוני שוק אפריל 2026.",

    transparencyEyebrow: "שקיפות כברירת מחדל",
    transparencyTitle: "כל דולר שמרוויחים מתאתר לנכס, מנוע, או דמי-ניהול.",
    transparencyLede:
      "משקיעים מוסמכים מקבלים את חדר הנתונים המלא — לוח דמי ניהול, מתודולוגיית NAV, אישורי custody, מכתבי ביקורת, הוכחה on-chain, וקובץ המחקר מאחורי כל אחד מ-16 הנכסים.",
    requestAccess: "בקשת גישה",
  },
  ar: {
    sections: [
      { id: "intro", label: "نظرة عامة" },
      { id: "core", label: "الحيازات الأساسية" },
      { id: "engines", label: "محركات موازية" },
      { id: "fees", label: "الرسوم" },
      { id: "nav", label: "مثال NAV" },
      { id: "transparency", label: "الشفافية" },
    ],
    eyebrow: "الاقتصاد ونموذج العمل",
    heroTitle: "طبقتان من العائد: أصول الاقتناع، محركات موازية",
    heroLede:
      "المصدر الأساسي للقيمة هو ارتفاع 16 أصلًا من أصول الاقتناع المُحتفظ بها لأمد طويل. فوق هذه الحيازات، محركات موازية — staking، عائد DeFi، تداول نشط — تولّد دخلًا تشغيليًا دون بيع النواة.",

    coreBadge: "الطبقة الأساسية · حيث يستقر رأس المال",
    coreTitle: "16 أصل اقتناع · مرتّبة حسب الثقة",
    coreSubtitle:
      "تُبنى المحفظة حول 16 أصلًا رقميًا مختارًا يدويًا، مُنظَّمة في ثلاث طبقات ثقة. الفرضية الأساسية أن السلة تُقدِّر عبر أفق متعدد السنوات مع تعمّق التبني المؤسسي. التخصيص يعكس الاقتناع، لا الترجيح بالقيمة السوقية.",
    tiers: [
      { name: "طبقة الذهب", weight: "~50%", count: "أصلان", examples: "BTC · ETH", thesis: "مخزن للقيمة. أعمق تبنٍّ مؤسسي، أعلى سيولة، أوضح موقف تنظيمي. مرساة المحفظة.", accent: "#d4a853" },
      { name: "طبقة الفضة", weight: "~25%", count: "4 أصول", examples: "SOL · AVAX · LINK · MATIC", thesis: "بنية تحتية بثقة عالية. شبكات L1 و middleware مُثبَتة بحضور مؤسسي قابل للقياس وإيرادات حية.", accent: "#c0c0c0" },
      { name: "طبقة النحاس", weight: "~15%", count: "10 أصول", examples: "L2 · DePIN · RWA-native · AI-blockchain", thesis: "بيتا أعلى، مراكز أصغر. بنى تحتية ناشئة حدد فيها بحث TAMS فرصة غير متكافئة مع إدارة الجانب السلبي.", accent: "#b87333" },
      { name: "AltCoin 16 — التركيب", weight: "100%", count: "16 اسمًا", examples: "إجمالي السلة عبر الطبقات الثلاث أعلاه", thesis: "تحديد الحجم بالاقتناع لا بالقيمة السوقية. لكل أصل ملف بحث، فرضية، أدلة على الأهمية المؤسسية، وحالة سلبية. مراجعة ربعية.", accent: "#5a8fd8" },
    ],
    coreFooter: "اختيار الأصول هو المحرك الرئيسي للقيمة. المحركات (القسم التالي) تعمل فوق الحيازات لا بدلًا منها.",

    enginesBadge: "طبقة موازية · العائد التشغيلي",
    enginesTitle: "محركات تعمل فوق الحيازات",
    enginesSubtitle:
      "كل محرك يستخرج عائدًا من المحفظة الأساسية دون الإخلال بالمراكز طويلة الأمد. المحركات مُنوَّعة بالآلية: مكافآت بروتوكولية، فوائد إقراض، تداول محايد للسوق، وعمليات الصندوق.",
    engines: [
      { name: "Staking ومكافآت Validator", scope: "حتى 25% من المحفظة", yield: "5.5–8.0% APY + 0.5–1.5% MEV", bullets: ["ETH staked عبر Lido + EigenLayer (أساس + علاوة restaking)", "SOL staked عبر Jito (مدققون مدركون لـ MEV)", "Liquid staking tokens تحفظ القابلية للتركيب", "استخدام إنتاجي للأصول المُحتفظ بها — لا حاجة للبيع لتحقيق الكسب"] },
      { name: "إقراض مؤسسي", scope: "10–15% من المحفظة", yield: "3–7% APY · stablecoin", bullets: ["إقراض stablecoins للمقترضين بضمان زائد", "Aave V3, Maple Finance, Centrifuge — venues مدققة Tier-1", "سقف الانكشاف على بروتوكول واحد 10%", "مراقبة مستمرة لـ TVL، حالة التدقيق، الحوكمة"] },
      { name: "عائد DeFi و LP", scope: "حتى 20% من المحفظة", yield: "5–15% APY · LP مستقر", bullets: ["أزواج stablecoin على Curve / Uniswap V3 (إدارة IL)", "انكشاف على RWA عبر BUIDL, BENJI (4.3-4.6% على T-Bills مُرمَّزة)", "67% من المؤسسات تفضّل DeFi على spot — Nomura, أبريل 2026", "السقف 20% يمنع تركّز المخاطر على بروتوكول"] },
      { name: "تداول نشط", scope: "حتى 15% من المحفظة", yield: "هدف Sharpe 1.2+", bullets: ["زخم تقديري، صفقات basis، حمل أسعار التمويل", "دوران بين-L1 عند تغير الانكشاف الموزون بالاقتناع", "قواطع دائرة على هبوط –4% / –7% للمحفظة", "نسب شهرية: ألفا التداول مقابل العائد مقابل الاتجاهي"] },
      { name: "احتياطي Stablecoin والعمليات", scope: "5–10% من المحفظة · دائم", yield: "~4% APY على USDC الخامل", bullets: ["احتياطي stablecoin دائم — ضمان لكل عملية", "سيولة on-chain لإعادة الموازنة، الخروج، والدخول الانتهازي", "يموّل gas، custody، تدقيق، قانوني — لا نبيع النواة لتمويل العمليات أبدًا", "ماصّ صدمات للمخاطر: لا اضطرار للتصفية خلال drawdown"] },
    ],
    yieldLabel: "نطاق العائد",
    scopeLabel: "التخصيص",

    feesBadge: "هيكل الرسوم",
    feesTitle: "العقد الاقتصادي بين GP و LP",
    feesSubtitle: "هيكل مؤسسي بمعايير الصناعة. عائد النواة لـ 16 أصلًا يستحق للـ LP pro-rata — TAMS تكسب من رسوم الإدارة والأداء فقط.",
    gpEyebrow: "الشريك العام",
    gpTitle: "TAMS Capital · جدول الرسوم",
    feeRows: [
      { label: "رسوم الإدارة", value: "1.75% سنويًا", note: "تُحسب ربع سنويًا على متوسط AUM" },
      { label: "رسوم الأداء", value: "17.5%", note: "فوق عتبة 6.0%، مع high-water mark" },
      { label: "العتبة (Hurdle)", value: "6.0%", note: "الأساس الخالي من المخاطر لـ ETH staking" },
      { label: "High-Water Mark", value: "نعم", note: "لا تحصيل مزدوج عند الاستعادة" },
      { label: "الحد الأدنى للاستثمار", value: "$100,000", note: "للمستثمرين المعتمدين فقط" },
      { label: "فترة الإغلاق", value: "12 شهرًا", note: "استرداد ربع سنوي، إخطار 30 يومًا" },
    ],
    lpEyebrow: "الشريك المحدود",
    lpTitle: "ما يحصل عليه الـ LP",
    lpItems: [
      { title: "ارتفاع الأصول (النواة)", body: "100% من ارتفاع سلة الـ 16 أصلًا يستحق للـ LP pro-rata. هذا هو مصدر العائد الأساسي." },
      { title: "عائد المحركات", body: "صافٍ من الرسوم، يُوزَّع عائد المحركات على الـ LP إلى جانب ارتفاع الأصول. بيانات NAV ربع سنوية." },
      { title: "تحقق on-chain", body: "تُكشف عناوين الحفظ تحت NDA. الـ LP يتحقق من الحيازات بشكل مستقل." },
      { title: "تدقيق سنوي + حزمة ضرائب", body: "K-1 أو ما يعادله للولايات القضائية ذات الصلة. تحليل PFIC متاح." },
    ],
    lpFooter: "يُحاسب الـ LP بشكل صافٍ — جميع رسوم الحفظ والـ gas والتدقيق والبروتوكولات تُستوعب في رسوم الإدارة ولا تُخصم من عوائد الـ LP.",

    navBadge: "مثال محسوب",
    navTitle: "محفظة 50M$ · مصدرَا العائد مجتمعَين",
    navSubtitle: "توضيحي. يُظهر كيف يجتمع ارتفاع الأصول (المحرك الرئيسي) وعائد المحركات (الطبقة التشغيلية) في عائد إجمالي للـ LP.",
    navCols: { source: "المصدر", basis: "الأساس", rate: "السعر / الحركة", contribution: "المساهمة" },
    navSection1: "الطبقة 1 · ارتفاع الأصول (النواة)",
    navSection2: "الطبقة 2 · عائد المحركات (موازي)",
    navRows1: [
      { source: "طبقة الذهب (BTC, ETH)", basis: "$25.0M (50%)", rate: "+18%", contribution: "$4,500K" },
      { source: "طبقة الفضة", basis: "$12.5M (25%)", rate: "+24%", contribution: "$3,000K" },
      { source: "طبقة النحاس", basis: "$7.5M (15%)", rate: "+35%", contribution: "$2,625K" },
    ],
    navRows2: [
      { source: "Staking + MEV", basis: "$12.5M في staking", rate: "7.0% APY", contribution: "$875K" },
      { source: "إقراض DeFi + LP", basis: "$7.5M منشور", rate: "6.5% APY", contribution: "$488K" },
      { source: "تداول نشط", basis: "$5.0M سجل تداول", rate: "12% على السجل", contribution: "$600K" },
      { source: "احتياطي نقدي", basis: "$5.0M احتياطي", rate: "4% APY", contribution: "$200K" },
    ],
    navAppreciation: "إجمالي ارتفاع الأصول",
    navYield: "إجمالي عائد المحركات",
    navGross: "إجمالي العائد الإجمالي",
    navMgmt: "ناقص: رسوم الإدارة (1.75%)",
    navPerf: "ناقص: رسوم الأداء (17.5% فوق العتبة)",
    navNet: "الصافي للـ LP",
    navFooter: "أسعار ارتفاع الأصول توضيحية لسنة تمثيلية. العوائد الفعلية تعتمد على ظروف السوق والتطورات التنظيمية والتنفيذ. عوائد المحركات من بيانات السوق أبريل 2026.",

    transparencyEyebrow: "الشفافية كسلوك افتراضي",
    transparencyTitle: "كل دولار مُكتسب يمكن تتبعه إلى أصل، محرك، أو رسم.",
    transparencyLede: "يحصل المستثمرون المعتمدون على غرفة البيانات الكاملة — جدول الرسوم، منهجية NAV، تأكيدات الحفظ، خطابات التدقيق، الإثبات on-chain، وملف البحث وراء كل من الـ 16 حيازة.",
    requestAccess: "طلب الوصول",
  },
  ru: {
    sections: [
      { id: "intro", label: "Обзор" },
      { id: "core", label: "Ядро портфеля" },
      { id: "engines", label: "Параллельные двигатели" },
      { id: "fees", label: "Комиссии" },
      { id: "nav", label: "Пример NAV" },
      { id: "transparency", label: "Прозрачность" },
    ],
    eyebrow: "Экономика и бизнес-модель",
    heroTitle: "Два слоя дохода: активы убеждённости и параллельные двигатели",
    heroLede: "Основной источник стоимости — рост 16 активов убеждённости, удерживаемых долгосрочно. Поверх удержаний параллельные двигатели — staking, доходность DeFi, активная торговля — генерируют операционный доход без продажи ядра.",

    coreBadge: "Слой ядра · где находится капитал",
    coreTitle: "16 активов убеждённости · по уровням уверенности",
    coreSubtitle: "Портфель построен вокруг 16 отобранных вручную цифровых активов, организованных в три уровня уверенности. Базовая гипотеза: корзина дорожает на многолетнем горизонте по мере углубления институционального принятия. Распределение отражает убеждённость, а не вес по капитализации.",
    tiers: [
      { name: "Уровень золота", weight: "~50%", count: "2 актива", examples: "BTC · ETH", thesis: "Хранилище ценности. Самое глубокое институциональное принятие, наибольшая ликвидность, наибольшая регуляторная ясность. Якорь портфеля.", accent: "#d4a853" },
      { name: "Уровень серебра", weight: "~25%", count: "4 актива", examples: "SOL · AVAX · LINK · MATIC", thesis: "Инфраструктура высокой уверенности. Проверенные L1 и middleware с измеримой корпоративной тягой и живой выручкой.", accent: "#c0c0c0" },
      { name: "Уровень меди", weight: "~15%", count: "10 активов", examples: "L2 · DePIN · RWA-native · AI-blockchain", thesis: "Более высокая бета, меньшие позиции. Развивающаяся инфраструктура, где исследование TAMS выявило асимметричный апсайд с управляемым даунсайдом.", accent: "#b87333" },
      { name: "AltCoin 16 — состав", weight: "100%", count: "16 имён", examples: "Полная корзина по трём уровням выше", thesis: "Размер по убеждённости, а не по капитализации. У каждого актива есть исследовательский файл, тезис, доказательства институциональной значимости и негативный сценарий. Квартальный пересмотр.", accent: "#5a8fd8" },
    ],
    coreFooter: "Выбор активов — основной драйвер стоимости. Двигатели (следующий раздел) работают поверх удержаний, а не вместо них.",

    enginesBadge: "Параллельный слой · операционная доходность",
    enginesTitle: "Двигатели, работающие поверх удержаний",
    enginesSubtitle: "Каждый двигатель извлекает доходность из ядра портфеля, не нарушая долгосрочные позиции. Двигатели диверсифицированы по механизму: протокольные награды, проценты по кредитованию, рыночно-нейтральная торговля и операции фонда.",
    engines: [
      { name: "Staking и валидаторская доходность", scope: "До 25% портфеля", yield: "5.5–8.0% APY + 0.5–1.5% MEV", bullets: ["ETH в стейкинге через Lido + EigenLayer (база + премия restaking)", "SOL в стейкинге через Jito (валидаторы с поддержкой MEV)", "Liquid staking tokens сохраняют composability", "Продуктивное использование удерживаемых активов — не нужно продавать, чтобы зарабатывать"] },
      { name: "Институциональное кредитование", scope: "10–15% портфеля", yield: "3–7% APY · стейблкоины", bullets: ["Кредитование стейблкоинов заёмщикам с over-collateralization", "Aave V3, Maple Finance, Centrifuge — Tier-1 аудированные площадки", "Лимит экспозиции на один протокол — 10%", "Постоянный мониторинг TVL, аудита, governance"] },
      { name: "Доходность DeFi и LP", scope: "До 20% портфеля", yield: "5–15% APY · стабильные LP", bullets: ["Стейблкоин-пары на Curve / Uniswap V3 (управление IL)", "Экспозиция к RWA через BUIDL, BENJI (4.3-4.6% на токенизированных T-Bills)", "67% институтов глобально выбирают DeFi вместо спота — Nomura, апр 2026", "Лимит 20% устраняет концентрацию риска в одном протоколе"] },
      { name: "Активная торговля", scope: "До 15% портфеля", yield: "Цель Sharpe 1.2+", bullets: ["Дискреционный momentum, basis-сделки, carry funding rates", "Кросс-L1 ротация при изменении взвешенной по убеждённости экспозиции", "Цепные предохранители при просадке –4% / –7%", "Ежемесячная атрибуция: альфа торговли vs доходности vs направления"] },
      { name: "Резерв стейблкоинов и операции", scope: "5–10% портфеля · постоянно", yield: "~4% APY на простаивающем USDC", bullets: ["Постоянный резерв стейблкоинов — обеспечение для любой операции", "On-chain ликвидность для ребалансировок, выходов, оппортунистических входов", "Финансирует gas, custody, аудит, юридику — никогда не продаём ядро ради операций", "Амортизатор риска: не принуждены ликвидировать во время drawdown"] },
    ],
    yieldLabel: "Диапазон доходности",
    scopeLabel: "Распределение",

    feesBadge: "Структура комиссий",
    feesTitle: "Экономический контракт между GP и LP",
    feesSubtitle: "Институциональная структура отраслевого стандарта. Доход ядра из 16 активов начисляется LP pro-rata — TAMS зарабатывает только на комиссиях за управление и результат.",
    gpEyebrow: "Генеральный партнёр",
    gpTitle: "TAMS Capital · Шкала комиссий",
    feeRows: [
      { label: "Комиссия за управление", value: "1.75% годовых", note: "Взимается ежеквартально со среднего AUM" },
      { label: "Комиссия за результат", value: "17.5%", note: "Сверх hurdle 6.0% с high-water mark" },
      { label: "Hurdle", value: "6.0%", note: "Базовая ставка без риска ETH staking" },
      { label: "High-Water Mark", value: "Да", note: "Без двойного начисления при восстановлении" },
      { label: "Минимальные инвестиции", value: "$100,000", note: "Только аккредитованные инвесторы" },
      { label: "Lock-up", value: "12 месяцев", note: "Квартальные выкупы, уведомление 30 дней" },
    ],
    lpEyebrow: "Ограниченный партнёр",
    lpTitle: "Что получает LP",
    lpItems: [
      { title: "Рост активов (ядро)", body: "100% роста корзины из 16 активов начисляется LP pro-rata. Это основной источник дохода." },
      { title: "Доходность двигателей", body: "Нетто после комиссий, доходность двигателей распределяется LP вместе с ростом активов. Квартальные отчёты NAV." },
      { title: "On-chain верификация", body: "Адреса хранения раскрываются под NDA. LP проверяет активы независимо." },
      { title: "Годовой аудит + налоговый пакет", body: "K-1 или эквивалент по релевантным юрисдикциям. PFIC-анализ доступен." },
    ],
    lpFooter: "LP облагается нетто — все комиссии хранения, gas, аудита и протоколов поглощаются комиссией за управление, не вычитаются из доходности LP.",

    navBadge: "Рабочий пример",
    navTitle: "Портфель $50M · оба источника дохода вместе",
    navSubtitle: "Иллюстративно. Демонстрирует, как рост активов (основной драйвер) и доходность двигателей (операционный слой) объединяются в общий доход LP.",
    navCols: { source: "Источник", basis: "База", rate: "Ставка / движение", contribution: "Вклад" },
    navSection1: "Слой 1 · Рост активов (ядро)",
    navSection2: "Слой 2 · Доходность двигателей (параллельно)",
    navRows1: [
      { source: "Уровень золота (BTC, ETH)", basis: "$25.0M (50%)", rate: "+18%", contribution: "$4,500K" },
      { source: "Уровень серебра", basis: "$12.5M (25%)", rate: "+24%", contribution: "$3,000K" },
      { source: "Уровень меди", basis: "$7.5M (15%)", rate: "+35%", contribution: "$2,625K" },
    ],
    navRows2: [
      { source: "Staking + MEV", basis: "$12.5M в стейкинге", rate: "7.0% APY", contribution: "$875K" },
      { source: "DeFi кредитование + LP", basis: "$7.5M размещено", rate: "6.5% APY", contribution: "$488K" },
      { source: "Активная торговля", basis: "$5.0M торговая книга", rate: "12% на книгу", contribution: "$600K" },
      { source: "Резерв наличных", basis: "$5.0M резерв", rate: "4% APY", contribution: "$200K" },
    ],
    navAppreciation: "Подытог роста активов",
    navYield: "Подытог доходности двигателей",
    navGross: "Общий валовой доход",
    navMgmt: "Минус: комиссия за управление (1.75%)",
    navPerf: "Минус: комиссия за результат (17.5% сверх hurdle)",
    navNet: "Нетто LP",
    navFooter: "Ставки роста активов иллюстративны для репрезентативного года. Фактическая доходность зависит от рыночных условий, регуляторных изменений и исполнения. Доходность двигателей — данные рынка апреля 2026.",

    transparencyEyebrow: "Прозрачность по умолчанию",
    transparencyTitle: "Каждый заработанный доллар трассируется к активу, двигателю или комиссии.",
    transparencyLede: "Аккредитованные инвесторы получают полную data room — шкалу комиссий, методологию NAV, аттестации хранения, аудиторские письма, on-chain доказательства и исследовательский файл по каждому из 16 активов.",
    requestAccess: "Запросить доступ",
  },
  es: {
    sections: [
      { id: "intro", label: "Resumen" },
      { id: "core", label: "Núcleo de cartera" },
      { id: "engines", label: "Motores paralelos" },
      { id: "fees", label: "Tarifas" },
      { id: "nav", label: "Ejemplo de NAV" },
      { id: "transparency", label: "Transparencia" },
    ],
    eyebrow: "Economía y modelo de negocio",
    heroTitle: "Dos capas de retorno: activos de convicción, motores paralelos",
    heroLede: "La fuente principal de valor es la apreciación de 16 activos de convicción mantenidos a largo plazo. Sobre las posiciones, motores paralelos — staking, rendimiento DeFi, trading activo — generan ingresos operativos sin vender el núcleo.",

    coreBadge: "Capa central · Donde reside el capital",
    coreTitle: "16 activos de convicción · escalonados por confianza",
    coreSubtitle: "El portafolio se construye en torno a 16 activos digitales seleccionados a mano, organizados en tres capas de confianza. La tesis central es que la cesta se aprecia en un horizonte plurianual a medida que se profundiza la adopción institucional. La asignación refleja convicción, no ponderación por capitalización.",
    tiers: [
      { name: "Capa Oro", weight: "~50%", count: "2 activos", examples: "BTC · ETH", thesis: "Reserva de valor. La adopción institucional más profunda, mayor liquidez, mayor claridad regulatoria. El ancla del portafolio.", accent: "#d4a853" },
      { name: "Capa Plata", weight: "~25%", count: "4 activos", examples: "SOL · AVAX · LINK · MATIC", thesis: "Infraestructura de alta convicción. L1s y middleware probados con tracción empresarial medible y revenue en vivo.", accent: "#c0c0c0" },
      { name: "Capa Cobre", weight: "~15%", count: "10 activos", examples: "L2 · DePIN · RWA-native · AI-blockchain", thesis: "Beta más alta, posiciones más pequeñas. Infraestructura emergente donde la investigación TAMS identificó upside asimétrico con downside manejado.", accent: "#b87333" },
      { name: "AltCoin 16 — Composición", weight: "100%", count: "16 nombres", examples: "Cesta total de las tres capas anteriores", thesis: "Sizing por convicción, no por capitalización. Cada activo tiene archivo de investigación, tesis, evidencia de relevancia institucional y caso bajista. Revisión trimestral.", accent: "#5a8fd8" },
    ],
    coreFooter: "La selección de activos es el principal motor de valor. Los motores (siguiente sección) operan sobre las posiciones, no en lugar de ellas.",

    enginesBadge: "Capa paralela · Rendimiento operativo",
    enginesTitle: "Motores que operan sobre las posiciones",
    enginesSubtitle: "Cada motor extrae rendimiento del portafolio central sin alterar posiciones a largo plazo. Los motores se diversifican por mecanismo: recompensas de protocolo, intereses de préstamo, trading neutral al mercado y operaciones de fondo.",
    engines: [
      { name: "Staking y rendimiento de Validador", scope: "Hasta 25% del portafolio", yield: "5.5–8.0% APY + 0.5–1.5% MEV", bullets: ["ETH en staking vía Lido + EigenLayer (base + prima restaking)", "SOL en staking vía Jito (validadores con MEV)", "Liquid staking tokens preservan composabilidad", "Uso productivo de activos mantenidos — no es necesario vender para ganar"] },
      { name: "Lending institucional", scope: "10–15% del portafolio", yield: "3–7% APY · stablecoin", bullets: ["Préstamo de stablecoins a prestatarios sobre-colateralizados", "Aave V3, Maple Finance, Centrifuge — venues auditados Tier-1", "Exposición máxima por protocolo limitada al 10%", "Monitoreo continuo de TVL, estado de auditoría, governance"] },
      { name: "Rendimiento DeFi y LP", scope: "Hasta 20% del portafolio", yield: "5–15% APY · LP estable", bullets: ["Pares stablecoin en Curve / Uniswap V3 (gestión de IL)", "Exposición RWA vía BUIDL, BENJI (4.3-4.6% en T-Bills tokenizados)", "67% de instituciones globalmente prefieren DeFi sobre spot — Nomura, abr 2026", "Límite de 20% evita concentración en un protocolo"] },
      { name: "Trading activo", scope: "Hasta 15% del portafolio", yield: "Sharpe objetivo 1.2+", bullets: ["Momentum discrecional, operaciones basis, carry de funding rates", "Rotación cross-L1 cuando cambia la exposición ponderada por convicción", "Disyuntores de drawdown a –4% / –7% del portafolio", "Atribución mensual: alfa de trading vs rendimiento vs direccional"] },
      { name: "Reserva de Stablecoin y operaciones", scope: "5–10% del portafolio · permanente", yield: "~4% APY sobre USDC inactivo", bullets: ["Reserva permanente de stablecoin — colateral para cada operación", "Liquidez on-chain para rebalanceos, salidas y entradas oportunistas", "Financia gas, custodia, auditoría, legal — nunca vendemos el núcleo para financiar operaciones", "Amortiguador de riesgo: nunca forzados a liquidar durante drawdowns"] },
    ],
    yieldLabel: "Rango de rendimiento",
    scopeLabel: "Asignación",

    feesBadge: "Estructura de tarifas",
    feesTitle: "El contrato económico entre GP y LP",
    feesSubtitle: "Estructura institucional estándar de la industria. El retorno del núcleo de 16 activos se acumula a los LP pro-rata — TAMS gana solo de tarifas de gestión y desempeño.",
    gpEyebrow: "Socio General",
    gpTitle: "TAMS Capital · Cuadro de tarifas",
    feeRows: [
      { label: "Tarifa de gestión", value: "1.75% anual", note: "Cargada trimestralmente sobre AUM promedio" },
      { label: "Tarifa de desempeño", value: "17.5%", note: "Sobre hurdle 6.0%, con high-water mark" },
      { label: "Hurdle Rate", value: "6.0%", note: "Tasa libre de riesgo de ETH staking" },
      { label: "High-Water Mark", value: "Sí", note: "Sin doble cobro en recuperación" },
      { label: "Inversión mínima", value: "$100,000", note: "Solo inversores acreditados" },
      { label: "Lock-up", value: "12 meses", note: "Redenciones trimestrales, aviso de 30 días" },
    ],
    lpEyebrow: "Socio Limitado",
    lpTitle: "Lo que reciben los LP",
    lpItems: [
      { title: "Apreciación de activos (núcleo)", body: "100% de la apreciación de la cesta de 16 activos se acumula a los LP pro-rata. Esta es la fuente principal de retorno." },
      { title: "Rendimiento de motores", body: "Neto de tarifas, el rendimiento de los motores se distribuye a los LP junto con la apreciación de activos. Estados NAV trimestrales." },
      { title: "Verificabilidad on-chain", body: "Direcciones de custodia divulgadas bajo NDA. Los LP verifican posiciones independientemente." },
      { title: "Auditoría anual + paquete fiscal", body: "K-1 o equivalente para jurisdicciones relevantes. Análisis PFIC disponible." },
    ],
    lpFooter: "Los LP son cargados en neto — todas las tarifas de custodia, gas, auditoría y protocolo son absorbidas por la tarifa de gestión, no descontadas de los retornos LP.",

    navBadge: "Ejemplo trabajado",
    navTitle: "Portafolio $50M · ambas fuentes de retorno combinadas",
    navSubtitle: "Ilustrativo. Demuestra cómo la apreciación de activos (driver principal) y el rendimiento de motores (capa operativa) se combinan en el retorno total LP.",
    navCols: { source: "Fuente", basis: "Base", rate: "Tasa / Movimiento", contribution: "Contribución" },
    navSection1: "Capa 1 · Apreciación de activos (núcleo)",
    navSection2: "Capa 2 · Rendimiento de motores (paralelo)",
    navRows1: [
      { source: "Capa Oro (BTC, ETH)", basis: "$25.0M (50%)", rate: "+18%", contribution: "$4,500K" },
      { source: "Capa Plata", basis: "$12.5M (25%)", rate: "+24%", contribution: "$3,000K" },
      { source: "Capa Cobre", basis: "$7.5M (15%)", rate: "+35%", contribution: "$2,625K" },
    ],
    navRows2: [
      { source: "Staking + MEV", basis: "$12.5M en staking", rate: "7.0% APY", contribution: "$875K" },
      { source: "Lending DeFi + LP", basis: "$7.5M desplegado", rate: "6.5% APY", contribution: "$488K" },
      { source: "Trading activo", basis: "$5.0M libro de trading", rate: "12% sobre libro", contribution: "$600K" },
      { source: "Reserva de efectivo", basis: "$5.0M reserva", rate: "4% APY", contribution: "$200K" },
    ],
    navAppreciation: "Subtotal apreciación de activos",
    navYield: "Subtotal rendimiento de motores",
    navGross: "Retorno bruto total",
    navMgmt: "Menos: tarifa de gestión (1.75%)",
    navPerf: "Menos: tarifa de desempeño (17.5% sobre hurdle)",
    navNet: "Neto a LPs",
    navFooter: "Las tasas de apreciación de activos son ilustrativas para un año representativo. Los retornos reales dependen de condiciones de mercado, desarrollos regulatorios y ejecución. Rendimientos de motores basados en datos de mercado de abr 2026.",

    transparencyEyebrow: "Transparencia por defecto",
    transparencyTitle: "Cada dólar ganado es rastreable a un activo, un motor o una tarifa.",
    transparencyLede: "Los inversores acreditados reciben el data room completo — cuadro de tarifas, metodología NAV, atestaciones de custodia, cartas de auditoría, prueba on-chain, y el archivo de investigación detrás de cada uno de los 16 activos.",
    requestAccess: "Solicitar acceso",
  },
} as const;

export default function BusinessModelPage() {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;

  return (
    <div className="min-h-screen">
      <PageTableOfContents sections={[...t.sections]} />

      {/* Hero */}
      <section id="intro" className="relative min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/60" />
            <span className="text-[10px] tracking-[0.42em] uppercase text-amber-300/90 font-semibold">{t.eyebrow}</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1] }}
            className="heading-editorial text-[2rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4.2rem] tracking-tight leading-[1.12] mb-7 text-white/97 [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]"
          >
            {t.heroTitle}
          </motion.h1>
          <div className="hairline-gold w-24 mx-auto mb-7 opacity-70" />
          <p className="text-[15px] sm:text-base lg:text-lg text-zinc-200/90 max-w-2xl mx-auto leading-[1.7] font-light">
            {t.heroLede}
          </p>
        </div>
      </section>

      {/* CORE LAYER — 16 conviction assets */}
      <section id="core" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader badge={t.coreBadge} title={t.coreTitle} subtitle={t.coreSubtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          {t.tiers.map((tier, i) => {
            const Icon = TIER_ICONS[i];
            const isAggregate = i === 3;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${isAggregate ? "surface-tier-1 md:col-span-2" : "surface-tier-2"} p-6 sm:p-7 relative group transition-colors duration-500`}
                style={{ borderColor: `${tier.accent}45` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="size-12 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: `${tier.accent}15`, borderColor: `${tier.accent}40` }}
                  >
                    <Icon className="size-6" style={{ color: tier.accent }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                      <h3 className="text-lg font-semibold text-white leading-tight">{tier.name}</h3>
                      <span className="text-xs text-zinc-500 tabular-nums">{tier.count}</span>
                    </div>
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-2xl font-bold tabular-nums" style={{ color: tier.accent }}>{tier.weight}</span>
                      <span className="text-xs text-zinc-500 truncate">{tier.examples}</span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{tier.thesis}</p>
                  </div>
                </div>
                <span className="monogram-watermark" aria-hidden="true">T</span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-[13px] text-amber-300/75 mt-10 text-center max-w-2xl mx-auto leading-relaxed font-light">
          {t.coreFooter}
        </p>
      </section>

      {/* PARALLEL LAYER — engines on top */}
      <section id="engines" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader badge={t.enginesBadge} title={t.enginesTitle} subtitle={t.enginesSubtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {t.engines.map((engine, i) => {
            const Icon = ENGINE_ICONS[i];
            return (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="surface-tier-2 p-6 relative group hover:border-amber-500/35 transition-colors duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="size-11 rounded-xl bg-amber-500/[0.10] border border-amber-500/25 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-amber-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-white leading-snug">{engine.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 my-5">
                  <div className="surface-tier-3 px-3 py-2.5">
                    <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-1">{t.scopeLabel}</div>
                    <div className="text-[13px] font-bold text-blue-300 tabular-nums leading-snug">{engine.scope}</div>
                  </div>
                  <div className="surface-tier-3 px-3 py-2.5">
                    <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-1">{t.yieldLabel}</div>
                    <div className="text-[13px] font-bold text-amber-300 tabular-nums leading-snug">{engine.yield}</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-zinc-400 leading-relaxed">
                  {engine.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="size-1 rounded-full bg-amber-500/50 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <span className="monogram-watermark" aria-hidden="true">T</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Fee Architecture */}
      <section id="fees" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <SectionHeader badge={t.feesBadge} title={t.feesTitle} subtitle={t.feesSubtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="surface-tier-1 p-6 sm:p-8 relative"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                <Building2 className="size-5 text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.32em] uppercase text-amber-300/70 font-semibold">{t.gpEyebrow}</p>
                <h3 className="text-lg font-semibold text-white">{t.gpTitle}</h3>
              </div>
            </div>
            <div className="space-y-3">
              {t.feeRows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 py-3 border-b border-amber-500/[0.08] last:border-0">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white">{row.label}</div>
                    <div className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{row.note}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold text-amber-300 tabular-nums">{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <span className="monogram-watermark" aria-hidden="true">T</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="surface-tier-1 p-6 sm:p-8 relative"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-blue-500/10 border border-blue-400/25 flex items-center justify-center">
                <Wallet className="size-5 text-blue-300" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.32em] uppercase text-blue-300/70 font-semibold">{t.lpEyebrow}</p>
                <h3 className="text-lg font-semibold text-white">{t.lpTitle}</h3>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              {t.lpItems.map((item) => (
                <div key={item.title}>
                  <div className="text-zinc-300 font-medium mb-1">{item.title}</div>
                  <div className="text-zinc-500 text-xs leading-relaxed">{item.body}</div>
                </div>
              ))}
              <div className="hairline-gold my-4" />
              <div className="text-[11px] text-amber-300/70 leading-relaxed font-light">{t.lpFooter}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NAV Example — both layers */}
      <section id="nav" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <SectionHeader badge={t.navBadge} title={t.navTitle} subtitle={t.navSubtitle} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-tier-1 p-4 sm:p-8 mt-12 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-500/[0.18]">
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.source}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.basis}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold hidden sm:table-cell">{t.navCols.rate}</th>
                  <th className="text-right py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.contribution}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={4} className="pt-5 pb-2 px-3 text-[10px] tracking-[0.32em] uppercase text-amber-300/85 font-semibold">{t.navSection1}</td></tr>
                {t.navRows1.map((row) => (
                  <tr key={row.source} className="border-b border-amber-500/[0.06] hover:bg-amber-500/[0.03]">
                    <td className="py-3 px-3 text-white font-medium">{row.source}</td>
                    <td className="py-3 px-3 text-zinc-300 tabular-nums">{row.basis}</td>
                    <td className="py-3 px-3 text-zinc-400 tabular-nums hidden sm:table-cell">{row.rate}</td>
                    <td className="py-3 px-3 text-right text-amber-300 tabular-nums font-semibold">{row.contribution}</td>
                  </tr>
                ))}
                <tr className="border-y border-amber-500/15 bg-amber-500/[0.04]">
                  <td colSpan={3} className="py-3 px-3 text-amber-200 font-semibold">{t.navAppreciation}</td>
                  <td className="py-3 px-3 text-right text-amber-300 tabular-nums font-bold">$10,125K</td>
                </tr>

                <tr><td colSpan={4} className="pt-5 pb-2 px-3 text-[10px] tracking-[0.32em] uppercase text-blue-300/85 font-semibold">{t.navSection2}</td></tr>
                {t.navRows2.map((row) => (
                  <tr key={row.source} className="border-b border-amber-500/[0.06] hover:bg-amber-500/[0.03]">
                    <td className="py-3 px-3 text-white font-medium">{row.source}</td>
                    <td className="py-3 px-3 text-zinc-300 tabular-nums">{row.basis}</td>
                    <td className="py-3 px-3 text-zinc-400 tabular-nums hidden sm:table-cell">{row.rate}</td>
                    <td className="py-3 px-3 text-right text-blue-300 tabular-nums font-semibold">{row.contribution}</td>
                  </tr>
                ))}
                <tr className="border-y border-blue-400/15 bg-blue-500/[0.04]">
                  <td colSpan={3} className="py-3 px-3 text-blue-200 font-semibold">{t.navYield}</td>
                  <td className="py-3 px-3 text-right text-blue-300 tabular-nums font-bold">$2,163K</td>
                </tr>

                <tr className="border-t-2 border-amber-500/40">
                  <td colSpan={3} className="py-4 px-3 text-white font-bold">{t.navGross}</td>
                  <td className="py-4 px-3 text-right text-white tabular-nums font-bold">$12,288K</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2 px-3 text-zinc-500 text-xs">{t.navMgmt}</td>
                  <td className="py-2 px-3 text-right text-zinc-400 tabular-nums">−$875K</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2 px-3 text-zinc-500 text-xs">{t.navPerf}</td>
                  <td className="py-2 px-3 text-right text-zinc-400 tabular-nums">−$1,475K</td>
                </tr>
                <tr className="border-t-2 border-emerald-400/30">
                  <td colSpan={3} className="py-4 px-3 text-white font-bold">{t.navNet}</td>
                  <td className="py-4 px-3 text-right text-emerald-300 tabular-nums font-bold">$9,938K</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-zinc-500 mt-6 leading-relaxed font-light">
            {t.navFooter}{" "}
            ETH staking
            <Footnote n={1} source="Cobo · Crypto Staking Guide 2026" date="Apr 2026" url="https://www.cobo.com/post/crypto-staking-guide" />,
            DeFi lending
            <Footnote n={2} source="Aave V3 USDC supply rates" date="Apr 2026" url="https://app.aave.com/" />,
            tokenized RWA
            <Footnote n={3} source="BlackRock BUIDL · $5.2B AUM" date="Mar 2026" />,
            BENJI
            <Footnote n={4} source="Franklin Templeton BENJI · $680M AUM, 4.3-4.6% APY" date="Apr 2026" />.
          </p>
        </motion.div>
      </section>

      {/* Transparency CTA */}
      <section id="transparency" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="surface-tier-2 p-10 sm:p-14"
        >
          <div className="text-[10px] tracking-[0.42em] uppercase text-amber-300/85 font-semibold mb-5">
            {t.transparencyEyebrow}
          </div>
          <h3 className="heading-editorial text-2xl sm:text-3xl text-white mb-5 leading-tight">
            {t.transparencyTitle}
          </h3>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto mb-10">
            {t.transparencyLede}
          </p>
          <Link href="/access">
            <button className="inline-flex items-center gap-2.5 bg-amber-500/95 hover:bg-amber-400 text-zinc-950 px-7 py-3.5 rounded-lg text-[13px] tracking-[0.14em] uppercase font-semibold transition-colors duration-300 shadow-[0_8px_24px_-8px_rgba(212,168,83,0.45)]">
              {t.requestAccess}
              <ArrowRight className="size-4" />
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

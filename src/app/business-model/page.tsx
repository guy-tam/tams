"use client";

// עמוד מודל עסקי — חמישה תיקים נפרדים, ניהול קפדני
//   1. מתכות יקרות פיזיות (כספות בארץ — Malca-Amit/Brink's, LBMA Good Delivery)
//   2. AltCoin 16 — סל קריפטו מבוסס מחקר
//   3. ספר מסחר יומי — אקטיבי
//   4. ארנק DeFi — staking, lending, LP
//   5. ארנק תחזוקה — stablecoin, gas, audit, legal
import { motion } from "framer-motion";
import {
  Vault, Coins, TrendingUp, Layers, Wrench,
  ArrowRight, Building2, Wallet,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/layout/SectionHeader";
import PageTableOfContents from "@/components/layout/PageTableOfContents";
import Footnote from "@/components/ui/Footnote";
import { useLanguage } from "@/lib/i18n";

const PORTFOLIO_ICONS = [Vault, Coins, TrendingUp, Layers, Wrench];

const TEXTS = {
  en: {
    sections: [
      { id: "intro", label: "Overview" },
      { id: "portfolios", label: "Five Portfolios" },
      { id: "fees", label: "Fees" },
      { id: "nav", label: "NAV Example" },
      { id: "transparency", label: "Transparency" },
    ],
    eyebrow: "Economics & Business Model",
    heroTitle: "Five Portfolios. One Discipline.",
    heroLede:
      "TAMS operates five segregated portfolios — each with its own custody, mandate, risk profile and accounting trail. Capital is never commingled. The architecture combines hard physical wealth with research-driven crypto holdings, active alpha, on-chain yield, and an always-on operations buffer.",

    portfoliosBadge: "Architecture · Five Segregated Portfolios",
    portfoliosTitle: "How TAMS Allocates Capital",
    portfoliosSubtitle:
      "Each portfolio sits in a separate custody arrangement with a discrete mandate. The composition is engineered to balance hard-asset preservation, long-conviction crypto upside, active trading alpha, on-chain yield, and operational liquidity — without any one losing forcing a sale of any other.",
    portfolios: [
      {
        name: "Physical Precious Metals Vault",
        weight: "~15–20%",
        custody: "Malca-Amit · Brink's · Loomis — Tel Aviv vaults",
        purpose: "Hard-asset hedge. Truly uncorrelated to crypto. Inflation protection. Cannot be hacked, frozen, or de-platformed.",
        details: [
          "LBMA Good Delivery gold bars (400oz / 12.4kg, fineness 995+)",
          "LBMA Good Delivery silver bars (1,000oz / 28–34kg, fineness 999)",
          "Liquidity tranche in 1kg PAMP/Valcambi gold + 100oz silver",
          "Stored in fully-insured Israeli vaults (FTZ-eligible)",
          "Annual on-site audit; serial-number register reconciled monthly",
        ],
        accent: "#d4a853",
      },
      {
        name: "AltCoin 16 — Long-Conviction Basket",
        weight: "~50–55%",
        custody: "Multi-sig cold storage · Fireblocks-grade",
        purpose: "The thesis-driven crypto core. 16 hand-selected digital assets held for the multi-year institutional adoption cycle.",
        details: [
          "BTC + ETH as the deepest-liquidity anchors",
          "L1 infrastructure (SOL · AVAX · LINK · MATIC)",
          "Selective L2, DePIN, RWA-native, AI-blockchain positions",
          "Each name has a research file, thesis, and exit triggers",
          "Quarterly review · no ad-hoc additions",
        ],
        accent: "#5a8fd8",
      },
      {
        name: "Active Trading Book",
        weight: "~10–15%",
        custody: "Hot wallet · policy-bounded",
        purpose: "Discretionary alpha layer. Captures momentum, basis, and funding-rate carry without disturbing the long-conviction core.",
        details: [
          "Cross-L1 momentum and rotation strategies",
          "Basis trades and funding-rate carry on perpetuals",
          "Drawdown circuit breakers at –4% / –7% book level",
          "Monthly attribution: alpha sources fully disclosed to LPs",
          "Target Sharpe 1.2+; never exceeds policy cap",
        ],
        accent: "#a78bfa",
      },
      {
        name: "DeFi Operations Wallet",
        weight: "~10–15%",
        custody: "Permissioned smart-contract wallet · audited protocols only",
        purpose: "Yield generation across staking, institutional lending, and liquidity provision. Productive use of held capital.",
        details: [
          "ETH staking via Lido + EigenLayer (5.5–8% + MEV)",
          "USDC/USDT lending on Aave V3 (3–7% APY)",
          "Stablecoin LP on Curve / Uniswap V3 (5–15%)",
          "RWA exposure via BUIDL, BENJI (4.3–4.6% on tokenized T-Bills)",
          "Single-protocol exposure capped at 10% of this wallet",
        ],
        accent: "#22d3ee",
      },
      {
        name: "Maintenance & Operations Wallet",
        weight: "~5–8%",
        custody: "Stablecoin reserve · multi-sig",
        purpose: "Permanent operational liquidity. Funds gas, custody fees, audit, legal, KYC. Acts as a shock-absorber so the four other portfolios are never forced to sell during a drawdown.",
        details: [
          "USDC + USDT reserve, ~4% APY when idle",
          "Pays gas, on-chain custody, audit fees, legal retainers",
          "Emergency liquidity for opportunistic acquisitions",
          "Funds redemption-cycle requirements without disturbing core",
          "Replenished automatically from realized engine yield",
        ],
        accent: "#34d399",
      },
    ],
    portfoliosFooter:
      "Custody is segregated by design. A breach, hack, or counterparty failure in any one portfolio does not propagate to the others. This is the foundational architecture that allows TAMS to take measured risk in some places while remaining unconditionally safe in others.",

    feesBadge: "Fee Architecture",
    feesTitle: "The Economic Contract Between GP and LP",
    feesSubtitle:
      "Industry-standard institutional structure. Returns from all five portfolios accrue to LPs pro-rata — TAMS earns from management + performance fees only.",
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
      { title: "Returns From All Five Portfolios", body: "Net of fees, every dollar earned across the five portfolios distributes to LPs pro-rata. Quarterly NAV statements show contribution by portfolio." },
      { title: "Physical Vault Audit Letters", body: "Annual on-site precious-metals inspection by independent auditor. Serial-number register reconciled monthly." },
      { title: "On-Chain Verifiability", body: "All four crypto-native portfolios use disclosed addresses (under NDA). LPs verify holdings independently." },
      { title: "Annual Audit + Tax Pack", body: "K-1 / equivalent for relevant jurisdictions. PFIC analysis available." },
    ],
    lpFooter:
      "LPs are charged net — vault fees, gas, custody, audit, legal and protocol fees are absorbed by the management fee, not deducted from LP returns.",

    navBadge: "Worked Example",
    navTitle: "$50M AUM · One-Year Combined Return",
    navSubtitle:
      "Illustrative composition showing how each of the five portfolios contributes to total LP return. Numbers are representative — actual results depend on market conditions.",
    navCols: { portfolio: "Portfolio", basis: "Capital", rate: "Return / Yield", contribution: "Contribution" },
    navRows: [
      { portfolio: "Physical Metals Vault", basis: "$8.5M (17%)", rate: "+12% (gold + silver)", contribution: "$1,020K" },
      { portfolio: "AltCoin 16 Basket", basis: "$26.0M (52%)", rate: "+22% basket appreciation", contribution: "$5,720K" },
      { portfolio: "Active Trading Book", basis: "$6.0M (12%)", rate: "+18% on book", contribution: "$1,080K" },
      { portfolio: "DeFi Operations", basis: "$6.5M (13%)", rate: "7.5% blended APY", contribution: "$488K" },
      { portfolio: "Maintenance & Ops", basis: "$3.0M (6%)", rate: "4% APY · stablecoin", contribution: "$120K" },
    ],
    navGross: "Gross combined return",
    navMgmt: "Less: Management fee (1.75%)",
    navPerf: "Less: Performance fee (17.5% above hurdle)",
    navNet: "Net to LPs",
    navFooter:
      "Asset appreciation rates are illustrative for a representative year. Actual returns depend on market conditions, regulatory developments, and execution. Yield assumptions sourced from Apr 2026 market data.",

    transparencyEyebrow: "Transparency by Default",
    transparencyTitle: "Every dollar earned is traceable to a portfolio, an asset, or a fee.",
    transparencyLede:
      "Accredited investors receive the full data room — vault audit letters, fee schedule, NAV methodology, custody attestations, on-chain proof, and the research file behind each of the 16 crypto holdings.",
    requestAccess: "Request Access",
  },
  he: {
    sections: [
      { id: "intro", label: "סקירה" },
      { id: "portfolios", label: "חמישה תיקים" },
      { id: "fees", label: "דמי-ניהול" },
      { id: "nav", label: "דוגמת NAV" },
      { id: "transparency", label: "שקיפות" },
    ],
    eyebrow: "כלכלה ומודל עסקי",
    heroTitle: "חמישה תיקים. משמעת אחת.",
    heroLede:
      "TAMS מפעילה חמישה תיקים מופרדים — לכל אחד custody משלו, מנדט, פרופיל סיכון ומסלול חשבונאי. ההון אף פעם לא מעורבב. הארכיטקטורה משלבת עושר פיזי קשיח עם אחזקות קריפטו מבוססות מחקר, אלפא אקטיבית, תשואת on-chain, ובאפר תפעולי קבוע.",

    portfoliosBadge: "ארכיטקטורה · חמישה תיקים מופרדים",
    portfoliosTitle: "איך TAMS מחלקת את ההון",
    portfoliosSubtitle:
      "כל תיק יושב בהסדר custody נפרד עם מנדט מובהק. ההרכב מהונדס לאזן בין שמירת ערך נכסים קשיחים, ייסוף קריפטו ארוך-טווח, אלפא של מסחר אקטיבי, תשואת on-chain ונזילות תפעולית — בלי שהפסד באחד יכריח מכירה באחר.",
    portfolios: [
      {
        name: "כספת מתכות יקרות פיזיות",
        weight: "~15–20%",
        custody: "Malca-Amit · Brink's · Loomis — כספות תל אביב",
        purpose: "גידור נכסים קשיחים. באמת לא-מתואם לקריפטו. הגנה מאינפלציה. לא ניתן לפריצה, להקפאה או להסרה מפלטפורמה.",
        details: [
          "מטילי זהב LBMA Good Delivery (400oz / 12.4 ק״ג, fineness 995+)",
          "מטילי כסף LBMA Good Delivery (1,000oz / 28–34 ק״ג, fineness 999)",
          "תזרים נזילות במטילי זהב 1 ק״ג PAMP/Valcambi + כסף 100oz",
          "מאוחסנים בכספות ישראליות מבוטחות במלואן (זכאות FTZ)",
          "ביקורת on-site שנתית; רישום מספרי סדרה מתואם חודשית",
        ],
        accent: "#d4a853",
      },
      {
        name: "AltCoin 16 — סל שכנוע ארוך",
        weight: "~50–55%",
        custody: "אחסון קר Multi-sig · ברמת Fireblocks",
        purpose: "ליבת הקריפטו מבוססת התזה. 16 נכסים דיגיטליים נבחרים ידנית, מוחזקים למחזור האימוץ המוסדי הרב-שנתי.",
        details: [
          "BTC + ETH כעוגנים בעלי הנזילות העמוקה ביותר",
          "תשתית L1 (SOL · AVAX · LINK · MATIC)",
          "פוזיציות סלקטיביות ב-L2, DePIN, RWA-native, AI-blockchain",
          "לכל נכס יש קובץ מחקר, תזה, וטריגרים ליציאה",
          "סקירה רבעונית · אין הוספות אד-הוק",
        ],
        accent: "#5a8fd8",
      },
      {
        name: "ספר מסחר יומי",
        weight: "~10–15%",
        custody: "ארנק חם · מוגבל-מדיניות",
        purpose: "שכבת אלפא דיסקרטיוני. לוכדת מומנטום, basis, ו-carry של funding rates בלי להפר את ליבת השכנוע הארוך.",
        details: [
          "אסטרטגיות מומנטום וסבב בין-L1",
          "Basis trades ו-carry של funding על perpetuals",
          "מנתקי מעגל drawdown ב-–4% / –7% ברמת הספר",
          "שיוך חודשי: מקורות אלפא חשופים מלאים ל-LP",
          "Sharpe יעד 1.2+; אף פעם לא חורג מתקרת המדיניות",
        ],
        accent: "#a78bfa",
      },
      {
        name: "ארנק תפעול DeFi",
        weight: "~10–15%",
        custody: "ארנק חוזה חכם מורשה · רק פרוטוקולים מבוקרים",
        purpose: "ייצור תשואה על-פני staking, הלוואות מוסדיות וספקת נזילות. שימוש פרודוקטיבי בהון המוחזק.",
        details: [
          "ETH ב-staking דרך Lido + EigenLayer (5.5–8% + MEV)",
          "הלוואות USDC/USDT ב-Aave V3 (3–7% APY)",
          "צמדי stablecoin LP ב-Curve / Uniswap V3 (5–15%)",
          "חשיפת RWA דרך BUIDL, BENJI (4.3–4.6% על אג״ח מטוקן)",
          "תקרת חשיפה לפרוטוקול בודד 10% מהארנק הזה",
        ],
        accent: "#22d3ee",
      },
      {
        name: "ארנק תחזוקה ותפעול",
        weight: "~5–8%",
        custody: "רזרבת stablecoin · multi-sig",
        purpose: "נזילות תפעולית קבועה. מממנת gas, דמי custody, ביקורת, משפט, KYC. משמשת כבולם זעזועים כך שארבעת התיקים האחרים אף פעם לא נאלצים למכור במהלך drawdown.",
        details: [
          "רזרבת USDC + USDT, ~4% APY כשלא בשימוש",
          "משלמת gas, custody on-chain, דמי ביקורת, retainers משפטיים",
          "נזילות חירום לרכישות הזדמנותיות",
          "מממנת דרישות מחזור פדיון בלי להפר את הליבה",
          "מתחדשת אוטומטית מתשואת המנועים שמומשה",
        ],
        accent: "#34d399",
      },
    ],
    portfoliosFooter:
      "ה-custody מופרד מתוכנן. פריצה, hack או כשל של counterparty באחד התיקים לא מתפשט לאחרים. זוהי הארכיטקטורה היסודית שמאפשרת ל-TAMS לקחת סיכון מדוד באזורים מסוימים תוך נשיאה של בטיחות בלתי-מותנית באזורים אחרים.",

    feesBadge: "מבנה דמי-ניהול",
    feesTitle: "החוזה הכלכלי בין GP ל-LP",
    feesSubtitle:
      "מבנה מוסדי תקני. תשואות מכל חמשת התיקים מצטברות ל-LP pro-rata — TAMS מרוויחה מדמי ניהול והצלחה בלבד.",
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
      { title: "תשואות מכל חמשת התיקים", body: "נטו לאחר עמלות, כל דולר שמרוויחים על-פני חמשת התיקים מחולק ל-LP pro-rata. דוחות NAV רבעוניים מציגים תרומה לפי תיק." },
      { title: "מכתבי ביקורת כספת פיזית", body: "ביקורת on-site שנתית של מתכות יקרות על-ידי מבקר עצמאי. רישום מספרי סדרה מתואם חודשית." },
      { title: "אימות on-chain", body: "ארבעת התיקים הקריפטו-נטיביים משתמשים בכתובות חשופות (תחת NDA). ה-LP מאמת אחזקות באופן עצמאי." },
      { title: "ביקורת שנתית + ערכת מס", body: "K-1 או שווה-ערך לפי תחום שיפוט. ניתוח PFIC זמין." },
    ],
    lpFooter:
      "ה-LP מחויב נטו — דמי כספת, gas, custody, ביקורת, משפט ופרוטוקול נספגים בדמי הניהול ולא נקזזו מתשואת ה-LP.",

    navBadge: "דוגמה מעובדת",
    navTitle: "AUM של $50M · תשואה משולבת לשנה",
    navSubtitle:
      "הרכב המחשה שמראה איך כל אחד מחמשת התיקים תורם לתשואה הכוללת ל-LP. המספרים מייצגים — תוצאות בפועל תלויות בתנאי שוק.",
    navCols: { portfolio: "תיק", basis: "הון", rate: "תשואה / יילד", contribution: "תרומה" },
    navRows: [
      { portfolio: "כספת מתכות פיזיות", basis: "$8.5M (17%)", rate: "+12% (זהב + כסף)", contribution: "$1,020K" },
      { portfolio: "סל AltCoin 16", basis: "$26.0M (52%)", rate: "+22% ייסוף סל", contribution: "$5,720K" },
      { portfolio: "ספר מסחר יומי", basis: "$6.0M (12%)", rate: "+18% על הספר", contribution: "$1,080K" },
      { portfolio: "תפעול DeFi", basis: "$6.5M (13%)", rate: "7.5% APY משולב", contribution: "$488K" },
      { portfolio: "תחזוקה ותפעול", basis: "$3.0M (6%)", rate: "4% APY · stablecoin", contribution: "$120K" },
    ],
    navGross: "תשואה משולבת ברוטו",
    navMgmt: "פחות: דמי ניהול (1.75%)",
    navPerf: "פחות: דמי הצלחה (17.5% מעל hurdle)",
    navNet: "נטו ל-LP",
    navFooter:
      "שיעורי ייסוף הנכסים הם להמחשה לשנה מייצגת. תשואות בפועל תלויות בתנאי שוק, התפתחויות רגולטוריות וביצוע. הנחות התשואה ממקורות שוק אפריל 2026.",

    transparencyEyebrow: "שקיפות כברירת מחדל",
    transparencyTitle: "כל דולר שמרוויחים מתאתר לתיק, נכס או דמי-ניהול.",
    transparencyLede:
      "משקיעים מוסמכים מקבלים את חדר הנתונים המלא — מכתבי ביקורת כספת, לוח דמי ניהול, מתודולוגיית NAV, אישורי custody, הוכחה on-chain, וקובץ המחקר מאחורי כל אחד מ-16 הנכסים.",
    requestAccess: "בקשת גישה",
  },
  ar: {
    sections: [
      { id: "intro", label: "نظرة عامة" },
      { id: "portfolios", label: "خمس محافظ" },
      { id: "fees", label: "الرسوم" },
      { id: "nav", label: "مثال NAV" },
      { id: "transparency", label: "الشفافية" },
    ],
    eyebrow: "الاقتصاد ونموذج العمل",
    heroTitle: "خمس محافظ. انضباط واحد.",
    heroLede:
      "تشغّل TAMS خمس محافظ منفصلة — لكل منها حفظها، تفويضها، ملف مخاطرها، ومسارها المحاسبي. لا يُخلط رأس المال أبدًا. تجمع البنية بين الثروة المادية الصلبة وحيازات الكريبتو المبنية على البحث، ألفا نشط، عائد on-chain، واحتياطي تشغيلي دائم.",

    portfoliosBadge: "البنية · خمس محافظ منفصلة",
    portfoliosTitle: "كيف تخصّص TAMS رأس المال",
    portfoliosSubtitle:
      "كل محفظة في ترتيب حفظ منفصل بتفويض محدد. التركيب مهندس لتوازن الحفاظ على الأصول الصلبة، ارتفاع الكريبتو طويل الاقتناع، ألفا التداول النشط، عائد on-chain، والسيولة التشغيلية — دون أن تُجبر خسارة في إحداها على البيع في أخرى.",
    portfolios: [
      { name: "خزنة المعادن النفيسة المادية", weight: "~15–20%", custody: "Malca-Amit · Brink's · Loomis — خزائن تل أبيب", purpose: "تحوّط الأصول الصلبة. غير مرتبطة فعليًا بالكريبتو. حماية من التضخم. لا يمكن اختراقها أو تجميدها أو إزالتها من المنصات.", details: ["سبائك ذهب LBMA Good Delivery (400oz / 12.4 كغ، fineness 995+)", "سبائك فضة LBMA Good Delivery (1,000oz / 28–34 كغ، fineness 999)", "شريحة سيولة بسبائك ذهب 1 كغ PAMP/Valcambi + فضة 100oz", "تخزين في خزائن إسرائيلية مؤمَّنة بالكامل (مؤهلة FTZ)", "تدقيق سنوي في الموقع؛ سجل أرقام تسلسلية مطابق شهريًا"], accent: "#d4a853" },
      { name: "AltCoin 16 — سلة الاقتناع طويل الأمد", weight: "~50–55%", custody: "تخزين بارد Multi-sig · بمستوى Fireblocks", purpose: "نواة الكريبتو المبنية على الفرضية. 16 أصلًا رقميًا مختارًا يدويًا للاحتفاظ خلال دورة التبني المؤسسي متعددة السنوات.", details: ["BTC + ETH كمراسي بأعمق سيولة", "بنية L1 (SOL · AVAX · LINK · MATIC)", "مراكز انتقائية في L2, DePIN, RWA-native, AI-blockchain", "كل اسم لديه ملف بحث، فرضية، ومحفّزات خروج", "مراجعة ربعية · لا إضافات عشوائية"], accent: "#5a8fd8" },
      { name: "سجل التداول النشط", weight: "~10–15%", custody: "محفظة ساخنة · مقيدة بالسياسة", purpose: "طبقة ألفا تقديرية. تلتقط الزخم وعمليات basis وحمل أسعار التمويل دون الإخلال بنواة الاقتناع طويل الأمد.", details: ["استراتيجيات الزخم والدوران بين-L1", "صفقات basis وحمل التمويل على perpetuals", "قواطع دائرة drawdown عند –4% / –7% على مستوى السجل", "نسب شهرية: مصادر ألفا مكشوفة بالكامل لـ LP", "هدف Sharpe 1.2+؛ لا يتجاوز سقف السياسة أبدًا"], accent: "#a78bfa" },
      { name: "محفظة عمليات DeFi", weight: "~10–15%", custody: "محفظة عقد ذكي مرخصة · بروتوكولات مدققة فقط", purpose: "توليد العائد عبر staking والإقراض المؤسسي وتقديم السيولة. استخدام إنتاجي لرأس المال المُحتفظ به.", details: ["ETH staking عبر Lido + EigenLayer (5.5–8% + MEV)", "إقراض USDC/USDT على Aave V3 (3–7% APY)", "أزواج stablecoin LP على Curve / Uniswap V3 (5–15%)", "انكشاف RWA عبر BUIDL, BENJI (4.3–4.6% على T-Bills مُرمَّزة)", "سقف انكشاف على بروتوكول واحد 10% من هذه المحفظة"], accent: "#22d3ee" },
      { name: "محفظة الصيانة والعمليات", weight: "~5–8%", custody: "احتياطي stablecoin · multi-sig", purpose: "سيولة تشغيلية دائمة. تموّل gas، رسوم custody، تدقيق، قانوني، KYC. تعمل كماصّ صدمات حتى لا تُجبر المحافظ الأربع الأخرى على البيع خلال drawdown.", details: ["احتياطي USDC + USDT، ~4% APY عند الخمول", "تدفع gas، custody on-chain، رسوم تدقيق، احتياطيات قانونية", "سيولة طوارئ لاستحواذات انتهازية", "تموّل متطلبات دورة الاسترداد دون إخلال النواة", "تتجدد تلقائيًا من عائد المحركات المُحقَّق"], accent: "#34d399" },
    ],
    portfoliosFooter:
      "الحفظ منفصل بالتصميم. اختراق أو فشل counterparty في إحدى المحافظ لا ينتقل إلى الأخرى. هذه هي البنية الأساسية التي تتيح لـ TAMS أخذ مخاطر مدروسة في بعض الأماكن مع البقاء آمنًا بشكل غير مشروط في أماكن أخرى.",

    feesBadge: "هيكل الرسوم",
    feesTitle: "العقد الاقتصادي بين GP و LP",
    feesSubtitle: "هيكل مؤسسي بمعايير الصناعة. عوائد جميع المحافظ الخمس تستحق للـ LP pro-rata — TAMS تكسب من رسوم الإدارة والأداء فقط.",
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
      { title: "عوائد من جميع المحافظ الخمس", body: "صافٍ من الرسوم، كل دولار مُكتسب عبر المحافظ الخمس يُوزَّع على الـ LP pro-rata. بيانات NAV ربع سنوية تُظهر المساهمة بحسب المحفظة." },
      { title: "خطابات تدقيق الخزنة المادية", body: "تفتيش سنوي في الموقع للمعادن النفيسة بواسطة مدقق مستقل. سجل أرقام تسلسلية مطابق شهريًا." },
      { title: "تحقق on-chain", body: "المحافظ الكريبتو الأربع تستخدم عناوين مكشوفة (تحت NDA). الـ LP يتحقق من الحيازات بشكل مستقل." },
      { title: "تدقيق سنوي + حزمة ضرائب", body: "K-1 أو ما يعادله للولايات القضائية ذات الصلة. تحليل PFIC متاح." },
    ],
    lpFooter: "يُحاسب الـ LP بشكل صافٍ — رسوم الخزنة، gas، custody، التدقيق، القانوني والبروتوكول تُستوعب في رسوم الإدارة ولا تُخصم من عوائد الـ LP.",

    navBadge: "مثال محسوب",
    navTitle: "AUM 50M$ · العائد المُجمَّع لسنة",
    navSubtitle: "تركيب توضيحي يُظهر كيف يساهم كل من المحافظ الخمس في إجمالي عائد الـ LP. الأرقام تمثيلية — النتائج الفعلية تعتمد على ظروف السوق.",
    navCols: { portfolio: "المحفظة", basis: "رأس المال", rate: "العائد / yield", contribution: "المساهمة" },
    navRows: [
      { portfolio: "خزنة المعادن المادية", basis: "$8.5M (17%)", rate: "+12% (ذهب + فضة)", contribution: "$1,020K" },
      { portfolio: "سلة AltCoin 16", basis: "$26.0M (52%)", rate: "+22% ارتفاع السلة", contribution: "$5,720K" },
      { portfolio: "سجل التداول النشط", basis: "$6.0M (12%)", rate: "+18% على السجل", contribution: "$1,080K" },
      { portfolio: "عمليات DeFi", basis: "$6.5M (13%)", rate: "7.5% APY مدمج", contribution: "$488K" },
      { portfolio: "الصيانة والعمليات", basis: "$3.0M (6%)", rate: "4% APY · stablecoin", contribution: "$120K" },
    ],
    navGross: "العائد الإجمالي المُجمَّع",
    navMgmt: "ناقص: رسوم الإدارة (1.75%)",
    navPerf: "ناقص: رسوم الأداء (17.5% فوق العتبة)",
    navNet: "الصافي للـ LPs",
    navFooter: "أسعار ارتفاع الأصول توضيحية لسنة تمثيلية. العوائد الفعلية تعتمد على ظروف السوق، التطورات التنظيمية والتنفيذ. افتراضات العائد من بيانات السوق أبريل 2026.",

    transparencyEyebrow: "الشفافية كسلوك افتراضي",
    transparencyTitle: "كل دولار مُكتسب يمكن تتبعه إلى محفظة، أصل، أو رسم.",
    transparencyLede: "يحصل المستثمرون المعتمدون على غرفة البيانات الكاملة — خطابات تدقيق الخزنة، جدول الرسوم، منهجية NAV، تأكيدات الحفظ، الإثبات on-chain، وملف البحث وراء كل من الـ 16 حيازة كريبتو.",
    requestAccess: "طلب الوصول",
  },
  ru: {
    sections: [
      { id: "intro", label: "Обзор" },
      { id: "portfolios", label: "Пять портфелей" },
      { id: "fees", label: "Комиссии" },
      { id: "nav", label: "Пример NAV" },
      { id: "transparency", label: "Прозрачность" },
    ],
    eyebrow: "Экономика и бизнес-модель",
    heroTitle: "Пять портфелей. Одна дисциплина.",
    heroLede:
      "TAMS управляет пятью обособленными портфелями — у каждого свой custody, мандат, профиль риска и учётный след. Капитал никогда не смешивается. Архитектура объединяет твёрдое физическое богатство с исследовательскими крипто-позициями, активной альфой, on-chain доходностью и постоянным операционным резервом.",

    portfoliosBadge: "Архитектура · пять обособленных портфелей",
    portfoliosTitle: "Как TAMS распределяет капитал",
    portfoliosSubtitle:
      "Каждый портфель находится в отдельном custody с дискретным мандатом. Композиция спроектирована для баланса сохранения твёрдых активов, долгосрочного крипто-апсайда, альфы активной торговли, on-chain доходности и операционной ликвидности — без того, чтобы одна потеря заставляла продавать в другом.",
    portfolios: [
      { name: "Хранилище физических драгметаллов", weight: "~15–20%", custody: "Malca-Amit · Brink's · Loomis — хранилища Тель-Авива", purpose: "Хедж твёрдыми активами. Действительно некоррелированный с криптой. Защита от инфляции. Невозможно взломать, заморозить или удалить с платформы.", details: ["Слитки золота LBMA Good Delivery (400oz / 12.4 кг, fineness 995+)", "Слитки серебра LBMA Good Delivery (1,000oz / 28–34 кг, fineness 999)", "Транш ликвидности в слитках золота 1 кг PAMP/Valcambi + 100oz серебра", "Хранятся в полностью застрахованных израильских хранилищах (FTZ-eligible)", "Ежегодный аудит на месте; реестр серийных номеров сверяется ежемесячно"], accent: "#d4a853" },
      { name: "AltCoin 16 — корзина долгой убеждённости", weight: "~50–55%", custody: "Multi-sig холодное хранение · уровень Fireblocks", purpose: "Тезисное крипто-ядро. 16 отобранных вручную цифровых активов для удержания на многолетнем цикле институционального принятия.", details: ["BTC + ETH как самые ликвидные якоря", "Инфраструктура L1 (SOL · AVAX · LINK · MATIC)", "Селективные позиции в L2, DePIN, RWA-native, AI-blockchain", "У каждой позиции есть исследовательский файл, тезис и триггеры выхода", "Квартальный пересмотр · никаких ad-hoc добавлений"], accent: "#5a8fd8" },
      { name: "Активная торговая книга", weight: "~10–15%", custody: "Горячий кошелёк · ограниченный политикой", purpose: "Слой дискреционной альфы. Захватывает momentum, basis и carry funding rates без нарушения долгосрочного ядра.", details: ["Кросс-L1 momentum и ротационные стратегии", "Basis-сделки и carry funding на perpetuals", "Цепные предохранители drawdown при –4% / –7% по книге", "Ежемесячная атрибуция: источники альфы полностью раскрываются LP", "Цель Sharpe 1.2+; никогда не превышает лимит политики"], accent: "#a78bfa" },
      { name: "Кошелёк операций DeFi", weight: "~10–15%", custody: "Permissioned smart-contract wallet · только аудированные протоколы", purpose: "Генерация доходности через staking, институциональное кредитование и предоставление ликвидности. Продуктивное использование удерживаемого капитала.", details: ["Стейкинг ETH через Lido + EigenLayer (5.5–8% + MEV)", "Кредитование USDC/USDT на Aave V3 (3–7% APY)", "Стейблкоин-LP на Curve / Uniswap V3 (5–15%)", "Экспозиция RWA через BUIDL, BENJI (4.3–4.6% на токенизированных T-Bills)", "Лимит экспозиции на один протокол 10% от этого кошелька"], accent: "#22d3ee" },
      { name: "Кошелёк обслуживания и операций", weight: "~5–8%", custody: "Резерв стейблкоинов · multi-sig", purpose: "Постоянная операционная ликвидность. Финансирует gas, комиссии custody, аудит, юридику, KYC. Действует как амортизатор, чтобы остальные четыре портфеля никогда не были вынуждены продавать во время drawdown.", details: ["Резерв USDC + USDT, ~4% APY при простое", "Оплачивает gas, on-chain custody, аудит, юридические retainers", "Аварийная ликвидность для оппортунистических приобретений", "Финансирует требования цикла выкупов без нарушения ядра", "Автоматически пополняется из реализованной доходности двигателей"], accent: "#34d399" },
    ],
    portfoliosFooter:
      "Custody обособлен по дизайну. Взлом, hack или сбой counterparty в одном портфеле не распространяется на другие. Это фундаментальная архитектура, которая позволяет TAMS брать измеренный риск в одних местах, оставаясь безусловно безопасным в других.",

    feesBadge: "Структура комиссий",
    feesTitle: "Экономический контракт между GP и LP",
    feesSubtitle: "Институциональная структура отраслевого стандарта. Доходы со всех пяти портфелей начисляются LP pro-rata — TAMS зарабатывает только на комиссиях за управление и результат.",
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
      { title: "Доходы со всех пяти портфелей", body: "Нетто после комиссий, каждый заработанный доллар по пяти портфелям распределяется LP pro-rata. Квартальные отчёты NAV показывают вклад по портфелю." },
      { title: "Письма аудита физического хранилища", body: "Ежегодная on-site инспекция драгметаллов независимым аудитором. Реестр серийных номеров сверяется ежемесячно." },
      { title: "On-chain верификация", body: "Четыре крипто-нативных портфеля используют раскрытые адреса (под NDA). LP проверяет позиции независимо." },
      { title: "Годовой аудит + налоговый пакет", body: "K-1 или эквивалент по релевантным юрисдикциям. PFIC-анализ доступен." },
    ],
    lpFooter: "LP облагается нетто — комиссии хранилища, gas, custody, аудита, юридики и протоколов поглощаются комиссией за управление, не вычитаются из доходности LP.",

    navBadge: "Рабочий пример",
    navTitle: "AUM $50M · совокупный годовой доход",
    navSubtitle: "Иллюстративная композиция, показывающая вклад каждого из пяти портфелей в общий доход LP. Числа репрезентативны — фактические результаты зависят от рыночных условий.",
    navCols: { portfolio: "Портфель", basis: "Капитал", rate: "Доходность / yield", contribution: "Вклад" },
    navRows: [
      { portfolio: "Хранилище физ. металлов", basis: "$8.5M (17%)", rate: "+12% (золото + серебро)", contribution: "$1,020K" },
      { portfolio: "Корзина AltCoin 16", basis: "$26.0M (52%)", rate: "+22% рост корзины", contribution: "$5,720K" },
      { portfolio: "Активная торговая книга", basis: "$6.0M (12%)", rate: "+18% на книгу", contribution: "$1,080K" },
      { portfolio: "Операции DeFi", basis: "$6.5M (13%)", rate: "7.5% APY смешанная", contribution: "$488K" },
      { portfolio: "Обслуживание и операции", basis: "$3.0M (6%)", rate: "4% APY · стейблкоин", contribution: "$120K" },
    ],
    navGross: "Валовой совокупный доход",
    navMgmt: "Минус: комиссия за управление (1.75%)",
    navPerf: "Минус: комиссия за результат (17.5% сверх hurdle)",
    navNet: "Нетто LP",
    navFooter: "Ставки роста активов иллюстративны для репрезентативного года. Фактические доходности зависят от рыночных условий, регуляторных изменений и исполнения. Допущения по доходности — данные рынка апреля 2026.",

    transparencyEyebrow: "Прозрачность по умолчанию",
    transparencyTitle: "Каждый заработанный доллар трассируется к портфелю, активу или комиссии.",
    transparencyLede: "Аккредитованные инвесторы получают полную data room — письма аудита хранилища, шкалу комиссий, методологию NAV, аттестации custody, on-chain доказательства и исследовательский файл по каждому из 16 крипто-активов.",
    requestAccess: "Запросить доступ",
  },
  es: {
    sections: [
      { id: "intro", label: "Resumen" },
      { id: "portfolios", label: "Cinco portafolios" },
      { id: "fees", label: "Tarifas" },
      { id: "nav", label: "Ejemplo NAV" },
      { id: "transparency", label: "Transparencia" },
    ],
    eyebrow: "Economía y modelo de negocio",
    heroTitle: "Cinco portafolios. Una disciplina.",
    heroLede:
      "TAMS opera cinco portafolios segregados — cada uno con su propia custodia, mandato, perfil de riesgo y rastro contable. El capital nunca se mezcla. La arquitectura combina riqueza física tangible con posiciones cripto basadas en investigación, alfa activo, rendimiento on-chain y un buffer operativo permanente.",

    portfoliosBadge: "Arquitectura · cinco portafolios segregados",
    portfoliosTitle: "Cómo TAMS asigna el capital",
    portfoliosSubtitle:
      "Cada portafolio reside en un arreglo de custodia separado con un mandato discreto. La composición está diseñada para equilibrar la preservación de activos duros, el alza cripto de larga convicción, el alfa de trading activo, el rendimiento on-chain y la liquidez operativa — sin que una pérdida en uno fuerce una venta en otro.",
    portfolios: [
      { name: "Bóveda de metales preciosos físicos", weight: "~15–20%", custody: "Malca-Amit · Brink's · Loomis — bóvedas de Tel Aviv", purpose: "Cobertura de activos duros. Verdaderamente no correlacionado con cripto. Protección contra inflación. No puede ser hackeado, congelado o eliminado de plataforma.", details: ["Lingotes de oro LBMA Good Delivery (400oz / 12.4 kg, fineness 995+)", "Lingotes de plata LBMA Good Delivery (1,000oz / 28–34 kg, fineness 999)", "Tramo de liquidez en lingotes de oro 1 kg PAMP/Valcambi + plata 100oz", "Almacenados en bóvedas israelíes totalmente aseguradas (FTZ-eligible)", "Auditoría anual in situ; registro de números de serie reconciliado mensualmente"], accent: "#d4a853" },
      { name: "AltCoin 16 — cesta de larga convicción", weight: "~50–55%", custody: "Almacenamiento frío Multi-sig · nivel Fireblocks", purpose: "El núcleo cripto basado en tesis. 16 activos digitales seleccionados a mano para mantener durante el ciclo plurianual de adopción institucional.", details: ["BTC + ETH como anclas de mayor liquidez", "Infraestructura L1 (SOL · AVAX · LINK · MATIC)", "Posiciones selectivas en L2, DePIN, RWA-native, AI-blockchain", "Cada nombre tiene archivo de investigación, tesis y gatillos de salida", "Revisión trimestral · sin adiciones ad-hoc"], accent: "#5a8fd8" },
      { name: "Libro de trading activo", weight: "~10–15%", custody: "Cartera caliente · acotada por política", purpose: "Capa de alfa discrecional. Captura momentum, basis y carry de funding rates sin perturbar el núcleo de larga convicción.", details: ["Estrategias de momentum y rotación cross-L1", "Operaciones basis y carry de funding en perpetuals", "Disyuntores de drawdown a –4% / –7% nivel libro", "Atribución mensual: fuentes de alfa totalmente divulgadas a LPs", "Sharpe objetivo 1.2+; nunca excede el tope de política"], accent: "#a78bfa" },
      { name: "Cartera de operaciones DeFi", weight: "~10–15%", custody: "Cartera de contrato inteligente con permisos · solo protocolos auditados", purpose: "Generación de rendimiento a través de staking, lending institucional y provisión de liquidez. Uso productivo del capital mantenido.", details: ["Staking ETH vía Lido + EigenLayer (5.5–8% + MEV)", "Lending USDC/USDT en Aave V3 (3–7% APY)", "LP stablecoin en Curve / Uniswap V3 (5–15%)", "Exposición RWA vía BUIDL, BENJI (4.3–4.6% en T-Bills tokenizados)", "Exposición a un solo protocolo limitada al 10% de esta cartera"], accent: "#22d3ee" },
      { name: "Cartera de mantenimiento y operaciones", weight: "~5–8%", custody: "Reserva stablecoin · multi-sig", purpose: "Liquidez operativa permanente. Financia gas, tarifas de custodia, auditoría, legal, KYC. Actúa como amortiguador para que las otras cuatro carteras nunca sean forzadas a vender durante un drawdown.", details: ["Reserva USDC + USDT, ~4% APY cuando inactiva", "Paga gas, custodia on-chain, tarifas de auditoría, retainers legales", "Liquidez de emergencia para adquisiciones oportunistas", "Financia requisitos de ciclo de redención sin perturbar el núcleo", "Se reabastece automáticamente del rendimiento realizado de los motores"], accent: "#34d399" },
    ],
    portfoliosFooter:
      "La custodia está segregada por diseño. Una brecha, hack o falla de counterparty en una cartera no se propaga a las demás. Esta es la arquitectura fundacional que permite a TAMS tomar riesgo medido en algunos lugares mientras permanece incondicionalmente seguro en otros.",

    feesBadge: "Estructura de tarifas",
    feesTitle: "El contrato económico entre GP y LP",
    feesSubtitle: "Estructura institucional estándar de la industria. Los retornos de los cinco portafolios se acumulan a los LP pro-rata — TAMS gana solo de tarifas de gestión y desempeño.",
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
      { title: "Retornos de los cinco portafolios", body: "Neto de tarifas, cada dólar ganado a través de los cinco portafolios se distribuye a los LP pro-rata. Estados NAV trimestrales muestran contribución por portafolio." },
      { title: "Cartas de auditoría de bóveda física", body: "Inspección anual in situ de metales preciosos por auditor independiente. Registro de números de serie reconciliado mensualmente." },
      { title: "Verificabilidad on-chain", body: "Las cuatro carteras cripto-nativas usan direcciones divulgadas (bajo NDA). Los LP verifican posiciones independientemente." },
      { title: "Auditoría anual + paquete fiscal", body: "K-1 o equivalente para jurisdicciones relevantes. Análisis PFIC disponible." },
    ],
    lpFooter: "Los LP son cargados en neto — tarifas de bóveda, gas, custodia, auditoría, legal y protocolo son absorbidas por la tarifa de gestión, no descontadas de los retornos LP.",

    navBadge: "Ejemplo trabajado",
    navTitle: "AUM $50M · retorno anual combinado",
    navSubtitle: "Composición ilustrativa que muestra cómo cada uno de los cinco portafolios contribuye al retorno total LP. Los números son representativos — los resultados reales dependen de las condiciones del mercado.",
    navCols: { portfolio: "Portafolio", basis: "Capital", rate: "Retorno / yield", contribution: "Contribución" },
    navRows: [
      { portfolio: "Bóveda metales físicos", basis: "$8.5M (17%)", rate: "+12% (oro + plata)", contribution: "$1,020K" },
      { portfolio: "Cesta AltCoin 16", basis: "$26.0M (52%)", rate: "+22% apreciación cesta", contribution: "$5,720K" },
      { portfolio: "Libro de trading activo", basis: "$6.0M (12%)", rate: "+18% sobre libro", contribution: "$1,080K" },
      { portfolio: "Operaciones DeFi", basis: "$6.5M (13%)", rate: "7.5% APY mezclado", contribution: "$488K" },
      { portfolio: "Mantenimiento y operaciones", basis: "$3.0M (6%)", rate: "4% APY · stablecoin", contribution: "$120K" },
    ],
    navGross: "Retorno bruto combinado",
    navMgmt: "Menos: tarifa de gestión (1.75%)",
    navPerf: "Menos: tarifa de desempeño (17.5% sobre hurdle)",
    navNet: "Neto a LPs",
    navFooter: "Las tasas de apreciación son ilustrativas para un año representativo. Los retornos reales dependen de condiciones de mercado, desarrollos regulatorios y ejecución. Rendimientos basados en datos de mercado abr 2026.",

    transparencyEyebrow: "Transparencia por defecto",
    transparencyTitle: "Cada dólar ganado es rastreable a un portafolio, un activo o una tarifa.",
    transparencyLede: "Los inversores acreditados reciben el data room completo — cartas de auditoría de bóveda, cuadro de tarifas, metodología NAV, atestaciones de custodia, prueba on-chain, y el archivo de investigación detrás de cada uno de los 16 activos cripto.",
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

      {/* FIVE PORTFOLIOS */}
      <section id="portfolios" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader badge={t.portfoliosBadge} title={t.portfoliosTitle} subtitle={t.portfoliosSubtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-12">
          {t.portfolios.map((portfolio, i) => {
            const Icon = PORTFOLIO_ICONS[i];
            const isPhysical = i === 0;
            return (
              <motion.div
                key={portfolio.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${isPhysical ? "surface-tier-1 lg:col-span-2" : "surface-tier-2"} p-6 sm:p-7 relative group transition-colors duration-500`}
                style={{ borderColor: `${portfolio.accent}40` }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="size-12 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: `${portfolio.accent}15`, borderColor: `${portfolio.accent}40` }}
                  >
                    <Icon className="size-6" style={{ color: portfolio.accent }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 mb-1">
                      <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">{portfolio.name}</h3>
                      <span className="text-lg font-bold tabular-nums shrink-0" style={{ color: portfolio.accent }}>{portfolio.weight}</span>
                    </div>
                    <p className="text-[11px] tracking-[0.18em] uppercase text-zinc-500 font-semibold">
                      {portfolio.custody}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-4 font-light">{portfolio.purpose}</p>

                <ul className="space-y-1.5 text-xs text-zinc-400 leading-relaxed">
                  {portfolio.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="size-1 rounded-full mt-1.5 shrink-0" style={{ background: portfolio.accent }} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <span className="monogram-watermark" aria-hidden="true">T</span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-[13px] text-amber-300/75 mt-10 max-w-3xl mx-auto leading-relaxed font-light text-center">
          {t.portfoliosFooter}
        </p>
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

      {/* NAV Example — five portfolios */}
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
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.portfolio}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.basis}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold hidden sm:table-cell">{t.navCols.rate}</th>
                  <th className="text-right py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.contribution}</th>
                </tr>
              </thead>
              <tbody>
                {t.navRows.map((row) => (
                  <tr key={row.portfolio} className="border-b border-amber-500/[0.06] hover:bg-amber-500/[0.03]">
                    <td className="py-3 px-3 text-white font-medium">{row.portfolio}</td>
                    <td className="py-3 px-3 text-zinc-300 tabular-nums">{row.basis}</td>
                    <td className="py-3 px-3 text-zinc-400 tabular-nums hidden sm:table-cell">{row.rate}</td>
                    <td className="py-3 px-3 text-right text-amber-300 tabular-nums font-semibold">{row.contribution}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-amber-500/40">
                  <td colSpan={3} className="py-4 px-3 text-white font-bold">{t.navGross}</td>
                  <td className="py-4 px-3 text-right text-white tabular-nums font-bold">$8,428K</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2 px-3 text-zinc-500 text-xs">{t.navMgmt}</td>
                  <td className="py-2 px-3 text-right text-zinc-400 tabular-nums">−$875K</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2 px-3 text-zinc-500 text-xs">{t.navPerf}</td>
                  <td className="py-2 px-3 text-right text-zinc-400 tabular-nums">−$950K</td>
                </tr>
                <tr className="border-t-2 border-emerald-400/30">
                  <td colSpan={3} className="py-4 px-3 text-white font-bold">{t.navNet}</td>
                  <td className="py-4 px-3 text-right text-emerald-300 tabular-nums font-bold">$6,603K</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-zinc-500 mt-6 leading-relaxed font-light">
            {t.navFooter}{" "}
            Physical metals
            <Footnote n={1} source="LBMA Good Delivery standards · Malca-Amit Tel Aviv" date="2026" url="https://www.lbma.org.uk/good-delivery/about-good-delivery" />,
            ETH staking
            <Footnote n={2} source="Cobo · Crypto Staking Guide 2026" date="Apr 2026" url="https://www.cobo.com/post/crypto-staking-guide" />,
            DeFi lending
            <Footnote n={3} source="Aave V3 USDC supply rates" date="Apr 2026" url="https://app.aave.com/" />,
            tokenized RWA
            <Footnote n={4} source="BlackRock BUIDL · $5.2B AUM" date="Mar 2026" />.
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

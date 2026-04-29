"use client";

// עמוד מודל עסקי — איך TAMS מייצרת ערך ומחלקת אותו בין GP ו-LPs
// מתורגם ל-5 שפות
import { motion } from "framer-motion";
import {
  Coins, TrendingUp, Layers, Briefcase, Zap,
  ArrowRight, Building2, Wallet,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/layout/SectionHeader";
import PageTableOfContents from "@/components/layout/PageTableOfContents";
import Footnote from "@/components/ui/Footnote";
import { useLanguage } from "@/lib/i18n";

const ENGINE_ICONS = [Coins, Layers, TrendingUp, Briefcase, Zap];

const TEXTS = {
  en: {
    sections: [
      { id: "intro", label: "Overview" },
      { id: "fees", label: "Fee Architecture" },
      { id: "engines", label: "Five Engines" },
      { id: "nav", label: "NAV Example" },
      { id: "transparency", label: "Transparency" },
    ],
    eyebrow: "Economics & Business Model",
    heroTitle: "How TAMS Generates & Distributes Capital Returns",
    heroLede: "A transparent, multi-engine capital allocation model. Fees are explicit. Returns are attributed. Every percentage point has a source.",
    feesBadge: "Fee Architecture",
    feesTitle: "The Economic Contract Between GP and LP",
    feesSubtitle: "Industry-standard institutional structure with transparency-first reporting. No hidden fees, no soft-dollar arrangements, no preferred-redemption side letters.",
    gpEyebrow: "General Partner",
    gpTitle: "TAMS Capital · Fee Schedule",
    feeRows: [
      { label: "Management Fee", value: "1.75% p.a.", note: "Charged quarterly on average AUM" },
      { label: "Performance Fee", value: "17.5%", note: "Above 6.0% hurdle, with high-water mark" },
      { label: "Hurdle Rate", value: "6.0%", note: "Reflects ETH staking risk-free baseline" },
      { label: "High-Water Mark", value: "Yes", note: "No double-charging on recovery" },
      { label: "Minimum Investment", value: "$100,000", note: "Accredited investors only" },
      { label: "Lock-up", value: "12 months", note: "Quarterly redemptions, 30-day notice" },
    ],
    lpEyebrow: "Limited Partner",
    lpTitle: "What LPs Receive",
    lpItems: [
      { title: "Quarterly NAV Statements", body: "Audited by Tier-1 auditor. Includes return attribution by engine." },
      { title: "Monthly Performance Updates", body: "Treasury yield, DeFi yield, trading P&L, RWA accruals — separately reported." },
      { title: "On-Chain Verifiability", body: "All custody addresses are disclosed under NDA. LPs verify holdings independently." },
      { title: "Annual Audit + Tax Pack", body: "K-1 / equivalent for relevant jurisdictions. PFIC analysis available." },
    ],
    lpFooter: "LPs are charged net — all custody, gas, audit and protocol fees are absorbed by the management fee, not netted against LP returns.",
    enginesBadge: "Five Yield Engines",
    enginesTitle: "The Mechanics of Return Generation",
    enginesSubtitle: "Each engine is a discrete return source with explicit risk characteristics, allocation cap, and audit trail. Diversified by mechanism, not just by asset.",
    engines: [
      {
        name: "Treasury Yield",
        subtitle: "ETH + SOL staking with restaking layer",
        yieldRange: "5.5–8.0% + MEV",
        capAlloc: "Up to 40% of AUM",
        bullets: [
          "Lido + EigenLayer for ETH (base + restaking premium)",
          "Jito for SOL (MEV-aware validators)",
          "Liquid staking tokens preserve composability for downstream strategies",
          "Source: Cobo, Chorus One, DAIC Capital — Apr 2026",
        ],
      },
      {
        name: "DeFi Lending & LP",
        subtitle: "Audited blue-chip protocols only",
        yieldRange: "3–7% USDC · 5–15% LP",
        capAlloc: "Up to 20% of AUM",
        bullets: [
          "Aave V3 USDC/USDT lending (Tier-1, multi-audit)",
          "Curve / Uniswap V3 stablecoin pairs (IL-managed)",
          "67% of institutions globally now favor DeFi over spot — Nomura, Apr 2026",
          "Cap of 20% prevents protocol-concentration risk",
        ],
      },
      {
        name: "Active Trading",
        subtitle: "Discretionary momentum + carry",
        yieldRange: "Target Sharpe 1.2+",
        capAlloc: "Up to 15% of AUM",
        bullets: [
          "Cross-L1 momentum, basis trades, funding-rate carry",
          "Quant overlay with dynamic position sizing",
          "Monthly attribution: alpha from trades vs. yield vs. directional",
          "Drawdown circuit breakers at –4% / –7% portfolio levels",
        ],
      },
      {
        name: "Tokenized RWA",
        subtitle: "BUIDL, BENJI — institutional T-Bills on-chain",
        yieldRange: "4.3–4.6% APY",
        capAlloc: "Up to 25% of AUM",
        bullets: [
          "BlackRock BUIDL ($5.2B AUM, market leader)",
          "Franklin BENJI on Stellar/Polygon",
          "RWA market: $26.4B today → $16T projected by 2030 (BCG)",
          "24/7 settlement; no T+1; same risk profile as US Treasuries",
        ],
      },
      {
        name: "MEV & Validator Premium",
        subtitle: "Frontier yield layer",
        yieldRange: "+0.5–1.5% over base",
        capAlloc: "Embedded in Treasury",
        bullets: [
          "Routes staking through MEV-aware validators (Jito, Lido v3)",
          "Captures protocol-enshrined MEV auctions",
          "Only ~12% of crypto funds operate this layer today",
          "Source: Chorus One, Lune.fi — Apr 2026",
        ],
      },
    ],
    yieldRangeLabel: "Yield Range",
    capAllocLabel: "Allocation Cap",
    navBadge: "Worked Example",
    navTitle: "$50M Portfolio · One-Year Yield Composition",
    navSubtitle: "Illustrative model — not a forecast. Demonstrates how the multi-engine architecture compounds returns from independent sources.",
    navCols: { allocation: "Allocation", capital: "Capital", strategy: "Strategy", yield: "Yield", income: "Income" },
    navRows: [
      { allocation: "Treasury (40%)", capital: "$20.0M", strategy: "ETH + SOL staked", yield: "6.5%", income: "$1,300K" },
      { allocation: "DeFi (20%)", capital: "$10.0M", strategy: "Aave + Lido", yield: "5.5%", income: "$550K" },
      { allocation: "Trading (15%)", capital: "$7.5M", strategy: "Discretionary alpha", yield: "12.0%", income: "$900K" },
      { allocation: "RWA (15%)", capital: "$7.5M", strategy: "BUIDL + BENJI", yield: "4.5%", income: "$338K" },
      { allocation: "Cash (10%)", capital: "$5.0M", strategy: "Stablecoin reserve", yield: "4.0%", income: "$200K" },
    ],
    navGross: "Gross blended yield",
    navMgmt: "Less: Management fee (1.75%)",
    navPerf: "Less: Performance fee (17.5% above hurdle)",
    navNet: "Net to LPs (yield component only)",
    navFooter: "Excludes directional appreciation of underlying assets (BTC/ETH/SOL price action), which accrues separately to LPs in the same pro-rata structure. Yield assumptions sourced from Apr 2026 market data.",
    transparencyEyebrow: "Transparency by Default",
    transparencyTitle: "Every dollar earned is traceable to a source, an engine, and a date.",
    transparencyLede: "Accredited investors receive the full data room — fee schedule, NAV methodology, custody attestations, audit letters and on-chain proof.",
    requestAccess: "Request Access",
  },
  he: {
    sections: [
      { id: "intro", label: "סקירה" },
      { id: "fees", label: "מבנה דמי-ניהול" },
      { id: "engines", label: "חמישה מנועים" },
      { id: "nav", label: "דוגמת NAV" },
      { id: "transparency", label: "שקיפות" },
    ],
    eyebrow: "כלכלה ומודל עסקי",
    heroTitle: "כיצד TAMS מייצרת ומחלקת תשואות הון",
    heroLede: "מודל הקצאת הון רב-מנועי ושקוף. דמי הניהול מפורשים. התשואות משויכות. לכל אחוז יש מקור.",
    feesBadge: "מבנה דמי-ניהול",
    feesTitle: "החוזה הכלכלי בין GP ל-LP",
    feesSubtitle: "מבנה מוסדי תקני בתעשייה עם דיווח שקוף. ללא דמי ניהול נסתרים, ללא הסדרי soft-dollar, ללא מכתבי-צד עם תנאי פדיון מועדפים.",
    gpEyebrow: "שותף כללי",
    gpTitle: "TAMS Capital · לוח דמי-ניהול",
    feeRows: [
      { label: "דמי ניהול", value: "1.75% שנתי", note: "נגבים רבעונית על AUM ממוצע" },
      { label: "דמי הצלחה", value: "17.5%", note: "מעל hurdle של 6.0%, עם high-water mark" },
      { label: "סף תשואה (Hurdle)", value: "6.0%", note: "משקף תשואת staking ETH חסרת-סיכון" },
      { label: "High-Water Mark", value: "כן", note: "אין כפל-חיוב לאחר התאוששות" },
      { label: "השקעה מינימלית", value: "$100,000", note: "משקיעים מוסמכים בלבד" },
      { label: "נעילה (Lock-up)", value: "12 חודשים", note: "פדיונות רבעוניים, התראה 30 יום" },
    ],
    lpEyebrow: "שותף מוגבל",
    lpTitle: "מה ה-LP מקבל",
    lpItems: [
      { title: "דוחות NAV רבעוניים", body: "מבוקרים על ידי משרד ביקורת Tier-1. כוללים שיוך תשואה לפי מנוע." },
      { title: "עדכוני ביצוע חודשיים", body: "תשואת treasury, DeFi, P&L מסחר, צבירות RWA — מדווחים בנפרד." },
      { title: "אימות on-chain", body: "כתובות ה-custody חשופות תחת NDA. ה-LP מאמת אחזקות באופן עצמאי." },
      { title: "ביקורת שנתית + ערכת מס", body: "K-1 או שווה-ערך לפי תחום שיפוט. ניתוח PFIC זמין." },
    ],
    lpFooter: "ה-LP מחויב נטו — כל עמלות ה-custody, gas, ביקורת ופרוטוקול נספגות בדמי הניהול ולא נקזזו מתשואת ה-LP.",
    enginesBadge: "חמישה מנועי תשואה",
    enginesTitle: "המכניקה של ייצור התשואה",
    enginesSubtitle: "כל מנוע הוא מקור תשואה דיסקרטי עם מאפייני סיכון מפורשים, תקרת הקצאה ומסלול ביקורת. גיוון לפי מנגנון, לא רק לפי נכס.",
    engines: [
      {
        name: "תשואת Treasury",
        subtitle: "Staking של ETH + SOL עם שכבת restaking",
        yieldRange: "5.5–8.0% + MEV",
        capAlloc: "עד 40% מ-AUM",
        bullets: [
          "Lido + EigenLayer ל-ETH (בסיס + פרמיית restaking)",
          "Jito ל-SOL (validators מוטי-MEV)",
          "Liquid staking tokens משמרים composability לאסטרטגיות נגזרות",
          "מקור: Cobo, Chorus One, DAIC Capital — אפריל 2026",
        ],
      },
      {
        name: "DeFi · Lending ו-LP",
        subtitle: "פרוטוקולי blue-chip מבוקרים בלבד",
        yieldRange: "3–7% USDC · 5–15% LP",
        capAlloc: "עד 20% מ-AUM",
        bullets: [
          "Aave V3 — הלוואות USDC/USDT (Tier-1, רב-ביקורות)",
          "Curve / Uniswap V3 — צמדי stablecoin (ניהול IL)",
          "67% מהמוסדות גלובלית מעדיפים DeFi על-פני spot — Nomura, אפריל 2026",
          "תקרה של 20% מונעת ריכוז סיכון בפרוטוקול",
        ],
      },
      {
        name: "מסחר אקטיבי",
        subtitle: "מומנטום והעברת ריבית דיסקרטיוניים",
        yieldRange: "Sharpe יעד 1.2+",
        capAlloc: "עד 15% מ-AUM",
        bullets: [
          "מומנטום בין-L1, basis trades, carry של funding rates",
          "שכבת quant עם sizing דינמי",
          "שיוך חודשי: אלפא מסחר vs תשואה vs כיווני",
          "מנתקי מעגל בנפילה של –4% / –7% תיק",
        ],
      },
      {
        name: "RWA מטוקן",
        subtitle: "BUIDL, BENJI — אג״ח ממשלתי מוסדי on-chain",
        yieldRange: "4.3–4.6% APY",
        capAlloc: "עד 25% מ-AUM",
        bullets: [
          "BlackRock BUIDL ($5.2B AUM, מוביל שוק)",
          "Franklin BENJI על Stellar/Polygon",
          "שוק RWA: $26.4B היום → תחזית $16T עד 2030 (BCG)",
          "Settlement 24/7; ללא T+1; פרופיל סיכון זהה לאג״ח אמריקאי",
        ],
      },
      {
        name: "פרמיית MEV ו-Validator",
        subtitle: "שכבת תשואת חזית",
        yieldRange: "+0.5–1.5% מעל הבסיס",
        capAlloc: "מובלע ב-Treasury",
        bullets: [
          "ניתוב staking דרך validators מוטי-MEV (Jito, Lido v3)",
          "לכידת מכרזי MEV מובנים בפרוטוקול",
          "רק כ-12% מקרנות הקריפטו מפעילים את השכבה הזו היום",
          "מקור: Chorus One, Lune.fi — אפריל 2026",
        ],
      },
    ],
    yieldRangeLabel: "טווח תשואה",
    capAllocLabel: "תקרת הקצאה",
    navBadge: "דוגמה מעובדת",
    navTitle: "תיק $50M · הרכב תשואה שנתי",
    navSubtitle: "מודל המחשה — לא תחזית. מדגים איך הארכיטקטורה הרב-מנועית מצרפת תשואה ממקורות בלתי-תלויים.",
    navCols: { allocation: "הקצאה", capital: "הון", strategy: "אסטרטגיה", yield: "תשואה", income: "הכנסה" },
    navRows: [
      { allocation: "Treasury (40%)", capital: "$20.0M", strategy: "ETH + SOL staked", yield: "6.5%", income: "$1,300K" },
      { allocation: "DeFi (20%)", capital: "$10.0M", strategy: "Aave + Lido", yield: "5.5%", income: "$550K" },
      { allocation: "מסחר (15%)", capital: "$7.5M", strategy: "אלפא דיסקרטיוני", yield: "12.0%", income: "$900K" },
      { allocation: "RWA (15%)", capital: "$7.5M", strategy: "BUIDL + BENJI", yield: "4.5%", income: "$338K" },
      { allocation: "מזומן (10%)", capital: "$5.0M", strategy: "רזרבת stablecoin", yield: "4.0%", income: "$200K" },
    ],
    navGross: "תשואה ברוטו משולבת",
    navMgmt: "פחות: דמי ניהול (1.75%)",
    navPerf: "פחות: דמי הצלחה (17.5% מעל hurdle)",
    navNet: "נטו ל-LP (רכיב תשואה בלבד)",
    navFooter: "ללא ייסוף כיווני של הנכסים הבסיסיים (תנועת מחיר BTC/ETH/SOL), שמצטבר ל-LP בנפרד באותו מבנה pro-rata. הנחות התשואה ממקורות שוק אפריל 2026.",
    transparencyEyebrow: "שקיפות כברירת מחדל",
    transparencyTitle: "כל דולר שמרוויחים מתאתר למקור, מנוע ותאריך.",
    transparencyLede: "משקיעים מוסמכים מקבלים את חדר הנתונים המלא — לוח דמי ניהול, מתודולוגיית NAV, אישורי custody, מכתבי ביקורת והוכחה on-chain.",
    requestAccess: "בקשת גישה",
  },
  ar: {
    sections: [
      { id: "intro", label: "نظرة عامة" },
      { id: "fees", label: "هيكل الرسوم" },
      { id: "engines", label: "خمسة محركات" },
      { id: "nav", label: "مثال NAV" },
      { id: "transparency", label: "الشفافية" },
    ],
    eyebrow: "الاقتصاد ونموذج العمل",
    heroTitle: "كيف تولّد TAMS وتوزّع عوائد رأس المال",
    heroLede: "نموذج تخصيص رأس مال شفاف ومتعدد المحركات. الرسوم واضحة. العوائد منسوبة. كل نقطة مئوية لها مصدر.",
    feesBadge: "هيكل الرسوم",
    feesTitle: "العقد الاقتصادي بين GP و LP",
    feesSubtitle: "هيكل مؤسسي بمعايير الصناعة مع تقارير شفافة. لا رسوم خفية، لا ترتيبات soft-dollar، لا اتفاقيات جانبية للاسترداد المُفضَّل.",
    gpEyebrow: "الشريك العام",
    gpTitle: "TAMS Capital · جدول الرسوم",
    feeRows: [
      { label: "رسوم الإدارة", value: "1.75% سنويًا", note: "تُحسب ربع سنويًا على متوسط AUM" },
      { label: "رسوم الأداء", value: "17.5%", note: "فوق عتبة 6.0%، مع high-water mark" },
      { label: "العتبة (Hurdle)", value: "6.0%", note: "يعكس الأساس الخالي من المخاطر لـ ETH staking" },
      { label: "High-Water Mark", value: "نعم", note: "لا تحصيل مزدوج عند الاستعادة" },
      { label: "الحد الأدنى للاستثمار", value: "$100,000", note: "للمستثمرين المعتمدين فقط" },
      { label: "فترة الإغلاق", value: "12 شهرًا", note: "استرداد ربع سنوي، إخطار 30 يومًا" },
    ],
    lpEyebrow: "الشريك المحدود",
    lpTitle: "ما يحصل عليه الـ LP",
    lpItems: [
      { title: "بيانات NAV ربع سنوية", body: "مدققة من قبل مدقق Tier-1. تشمل توزيع العوائد حسب المحرك." },
      { title: "تحديثات أداء شهرية", body: "عائد Treasury، عائد DeFi، أرباح المتاجرة، استحقاقات RWA — تقارير منفصلة." },
      { title: "تحقق on-chain", body: "تُكشف عناوين الحفظ تحت NDA. الـ LP يتحقق من الحيازات بشكل مستقل." },
      { title: "تدقيق سنوي + حزمة ضرائب", body: "K-1 أو ما يعادله للولايات القضائية ذات الصلة. تحليل PFIC متاح." },
    ],
    lpFooter: "يُحاسب الـ LP بشكل صافٍ — جميع رسوم الحفظ والـ gas والتدقيق والبروتوكولات تُستوعب في رسوم الإدارة ولا تُخصم من عوائد الـ LP.",
    enginesBadge: "خمسة محركات للعائد",
    enginesTitle: "ميكانيكا توليد العائد",
    enginesSubtitle: "كل محرك هو مصدر عائد منفصل بخصائص مخاطر صريحة، سقف تخصيص، وأثر تدقيق. تنويع حسب الآلية، لا فقط حسب الأصل.",
    engines: [
      { name: "عائد Treasury", subtitle: "ETH + SOL staking مع طبقة restaking", yieldRange: "5.5–8.0% + MEV", capAlloc: "حتى 40% من AUM", bullets: ["Lido + EigenLayer لـ ETH (أساس + علاوة restaking)", "Jito لـ SOL (مدققون مدركون لـ MEV)", "Liquid staking tokens تحفظ القابلية للتركيب لاستراتيجيات لاحقة", "المصدر: Cobo, Chorus One, DAIC Capital — أبريل 2026"] },
      { name: "DeFi · إقراض و LP", subtitle: "بروتوكولات blue-chip مدققة فقط", yieldRange: "3–7% USDC · 5–15% LP", capAlloc: "حتى 20% من AUM", bullets: ["إقراض Aave V3 USDC/USDT (Tier-1، تدقيقات متعددة)", "أزواج stablecoin على Curve / Uniswap V3 (مع إدارة IL)", "67% من المؤسسات تفضّل DeFi على spot — Nomura، أبريل 2026", "السقف 20% يمنع تركّز المخاطر على بروتوكول واحد"] },
      { name: "تداول نشط", subtitle: "زخم وحمل تقديريان", yieldRange: "هدف Sharpe 1.2+", capAlloc: "حتى 15% من AUM", bullets: ["زخم بين-L1، صفقات basis، حمل أسعار التمويل", "طبقة كمية بحجم مراكز ديناميكي", "نسب شهرية: ألفا من التداول مقابل العائد مقابل الاتجاهي", "قواطع دائرة على هبوط –4% / –7% للمحفظة"] },
      { name: "RWA المُرمَّز", subtitle: "BUIDL, BENJI — أذونات الخزانة المؤسسية on-chain", yieldRange: "4.3–4.6% APY", capAlloc: "حتى 25% من AUM", bullets: ["BlackRock BUIDL (5.2B$ AUM، رائد السوق)", "Franklin BENJI على Stellar/Polygon", "سوق RWA: 26.4B$ اليوم → توقع 16T$ بحلول 2030 (BCG)", "تسوية 24/7؛ بدون T+1؛ نفس بروفايل المخاطر مثل سندات الخزانة الأمريكية"] },
      { name: "علاوة MEV و Validator", subtitle: "طبقة عائد الحدود", yieldRange: "+0.5–1.5% فوق الأساس", capAlloc: "مدمج في Treasury", bullets: ["توجيه staking عبر مدققين مدركين لـ MEV (Jito, Lido v3)", "التقاط مزادات MEV المضمَّنة في البروتوكول", "فقط ~12% من صناديق الكريبتو تشغّل هذه الطبقة اليوم", "المصدر: Chorus One, Lune.fi — أبريل 2026"] },
    ],
    yieldRangeLabel: "نطاق العائد",
    capAllocLabel: "سقف التخصيص",
    navBadge: "مثال محسوب",
    navTitle: "محفظة 50M$ · تركيب العائد لسنة",
    navSubtitle: "نموذج توضيحي — وليس توقعًا. يُظهر كيف تُجمع البنية متعددة المحركات عوائد من مصادر مستقلة.",
    navCols: { allocation: "التخصيص", capital: "رأس المال", strategy: "الاستراتيجية", yield: "العائد", income: "الدخل" },
    navRows: [
      { allocation: "Treasury (40%)", capital: "$20.0M", strategy: "ETH + SOL مُودَع", yield: "6.5%", income: "$1,300K" },
      { allocation: "DeFi (20%)", capital: "$10.0M", strategy: "Aave + Lido", yield: "5.5%", income: "$550K" },
      { allocation: "تداول (15%)", capital: "$7.5M", strategy: "ألفا تقديري", yield: "12.0%", income: "$900K" },
      { allocation: "RWA (15%)", capital: "$7.5M", strategy: "BUIDL + BENJI", yield: "4.5%", income: "$338K" },
      { allocation: "نقد (10%)", capital: "$5.0M", strategy: "احتياطي stablecoin", yield: "4.0%", income: "$200K" },
    ],
    navGross: "العائد الإجمالي المركّب",
    navMgmt: "ناقص: رسوم الإدارة (1.75%)",
    navPerf: "ناقص: رسوم الأداء (17.5% فوق العتبة)",
    navNet: "الصافي للـ LPs (مكوّن العائد فقط)",
    navFooter: "يُستثنى الارتفاع الاتجاهي للأصول الأساسية (تحرّك سعر BTC/ETH/SOL)، الذي يستحق للـ LP بشكل منفصل بنفس البنية pro-rata. افتراضات العائد من بيانات السوق أبريل 2026.",
    transparencyEyebrow: "الشفافية كسلوك افتراضي",
    transparencyTitle: "كل دولار مُكتسب يمكن تتبعه إلى مصدر، محرك، وتاريخ.",
    transparencyLede: "يحصل المستثمرون المعتمدون على غرفة البيانات الكاملة — جدول الرسوم، منهجية NAV، تأكيدات الحفظ، خطابات التدقيق، والإثبات on-chain.",
    requestAccess: "طلب الوصول",
  },
  ru: {
    sections: [
      { id: "intro", label: "Обзор" },
      { id: "fees", label: "Структура комиссий" },
      { id: "engines", label: "Пять двигателей" },
      { id: "nav", label: "Пример NAV" },
      { id: "transparency", label: "Прозрачность" },
    ],
    eyebrow: "Экономика и бизнес-модель",
    heroTitle: "Как TAMS генерирует и распределяет доход на капитал",
    heroLede: "Прозрачная модель распределения капитала с несколькими двигателями. Комиссии явные. Доходность атрибутирована. У каждого процента есть источник.",
    feesBadge: "Структура комиссий",
    feesTitle: "Экономический контракт между GP и LP",
    feesSubtitle: "Институциональная структура отраслевого стандарта с приоритетом прозрачной отчётности. Без скрытых комиссий, без soft-dollar, без побочных писем по выкупам.",
    gpEyebrow: "Генеральный партнёр",
    gpTitle: "TAMS Capital · Шкала комиссий",
    feeRows: [
      { label: "Комиссия за управление", value: "1.75% годовых", note: "Взимается ежеквартально со среднего AUM" },
      { label: "Комиссия за результат", value: "17.5%", note: "Сверх hurdle 6.0% с high-water mark" },
      { label: "Hurdle", value: "6.0%", note: "Отражает базовую ставку без риска ETH staking" },
      { label: "High-Water Mark", value: "Да", note: "Без двойного начисления при восстановлении" },
      { label: "Минимальные инвестиции", value: "$100,000", note: "Только аккредитованные инвесторы" },
      { label: "Lock-up", value: "12 месяцев", note: "Квартальные выкупы, уведомление 30 дней" },
    ],
    lpEyebrow: "Ограниченный партнёр",
    lpTitle: "Что получает LP",
    lpItems: [
      { title: "Квартальные отчёты NAV", body: "Аудитор Tier-1. Включает атрибуцию доходности по двигателям." },
      { title: "Ежемесячные обновления", body: "Доходность Treasury, DeFi, P&L торговли, начисления RWA — отдельно." },
      { title: "On-chain верификация", body: "Адреса хранения раскрываются под NDA. LP проверяет активы независимо." },
      { title: "Годовой аудит + налоговый пакет", body: "K-1 или эквивалент по релевантным юрисдикциям. PFIC-анализ доступен." },
    ],
    lpFooter: "LP облагается нетто — все комиссии хранения, gas, аудита и протоколов поглощаются комиссией за управление, не вычитаются из доходности LP.",
    enginesBadge: "Пять двигателей доходности",
    enginesTitle: "Механика генерации доходности",
    enginesSubtitle: "Каждый двигатель — отдельный источник дохода с явными характеристиками риска, лимитом аллокации и аудиторским следом. Диверсификация по механике, а не только по активу.",
    engines: [
      { name: "Доходность Treasury", subtitle: "Стейкинг ETH + SOL с уровнем restaking", yieldRange: "5.5–8.0% + MEV", capAlloc: "До 40% AUM", bullets: ["Lido + EigenLayer для ETH (база + премия restaking)", "Jito для SOL (валидаторы с поддержкой MEV)", "Liquid staking tokens сохраняют composability для последующих стратегий", "Источник: Cobo, Chorus One, DAIC Capital — апр 2026"] },
      { name: "DeFi · Lending и LP", subtitle: "Только проверенные blue-chip протоколы", yieldRange: "3–7% USDC · 5–15% LP", capAlloc: "До 20% AUM", bullets: ["Кредитование Aave V3 USDC/USDT (Tier-1, мульти-аудит)", "Стейблкоин-пары Curve / Uniswap V3 (с управлением IL)", "67% институтов глобально предпочитают DeFi споту — Nomura, апр 2026", "Лимит 20% устраняет концентрацию риска в одном протоколе"] },
      { name: "Активная торговля", subtitle: "Дискреционный momentum + carry", yieldRange: "Цель Sharpe 1.2+", capAlloc: "До 15% AUM", bullets: ["Кросс-L1 momentum, basis-сделки, carry funding rates", "Quant-наслоение с динамическим sizing", "Ежемесячная атрибуция: альфа торговли vs доходности vs направления", "Цепные предохранители при просадке –4% / –7%"] },
      { name: "Токенизированные RWA", subtitle: "BUIDL, BENJI — институциональные T-Bills on-chain", yieldRange: "4.3–4.6% APY", capAlloc: "До 25% AUM", bullets: ["BlackRock BUIDL ($5.2B AUM, лидер рынка)", "Franklin BENJI на Stellar/Polygon", "Рынок RWA: $26.4B сегодня → прогноз $16T к 2030 (BCG)", "Расчёты 24/7; без T+1; профиль риска как у US Treasuries"] },
      { name: "Премия MEV и валидаторов", subtitle: "Передовой слой доходности", yieldRange: "+0.5–1.5% над базой", capAlloc: "Встроено в Treasury", bullets: ["Маршрутизация стейкинга через MEV-валидаторов (Jito, Lido v3)", "Захват протокольных MEV-аукционов", "Только ~12% криптофондов работают с этим слоем сегодня", "Источник: Chorus One, Lune.fi — апр 2026"] },
    ],
    yieldRangeLabel: "Диапазон доходности",
    capAllocLabel: "Лимит аллокации",
    navBadge: "Рабочий пример",
    navTitle: "Портфель $50M · композиция годовой доходности",
    navSubtitle: "Иллюстративная модель — не прогноз. Демонстрирует, как мульти-двигательная архитектура аккумулирует доход из независимых источников.",
    navCols: { allocation: "Аллокация", capital: "Капитал", strategy: "Стратегия", yield: "Доходность", income: "Доход" },
    navRows: [
      { allocation: "Treasury (40%)", capital: "$20.0M", strategy: "ETH + SOL в стейкинге", yield: "6.5%", income: "$1,300K" },
      { allocation: "DeFi (20%)", capital: "$10.0M", strategy: "Aave + Lido", yield: "5.5%", income: "$550K" },
      { allocation: "Торговля (15%)", capital: "$7.5M", strategy: "Дискреционная альфа", yield: "12.0%", income: "$900K" },
      { allocation: "RWA (15%)", capital: "$7.5M", strategy: "BUIDL + BENJI", yield: "4.5%", income: "$338K" },
      { allocation: "Кеш (10%)", capital: "$5.0M", strategy: "Стейблкоин-резерв", yield: "4.0%", income: "$200K" },
    ],
    navGross: "Валовая смешанная доходность",
    navMgmt: "Минус: комиссия за управление (1.75%)",
    navPerf: "Минус: комиссия за результат (17.5% сверх hurdle)",
    navNet: "Нетто LP (только компонент доходности)",
    navFooter: "Не включает направленный рост базовых активов (движение цены BTC/ETH/SOL), который начисляется LP отдельно по той же pro-rata структуре. Допущения по доходности — данные рынка апреля 2026.",
    transparencyEyebrow: "Прозрачность по умолчанию",
    transparencyTitle: "Каждый заработанный доллар трассируется к источнику, двигателю и дате.",
    transparencyLede: "Аккредитованные инвесторы получают полную data room — шкалу комиссий, методологию NAV, аттестации хранения, аудиторские письма и on-chain доказательства.",
    requestAccess: "Запросить доступ",
  },
  es: {
    sections: [
      { id: "intro", label: "Resumen" },
      { id: "fees", label: "Estructura de tarifas" },
      { id: "engines", label: "Cinco motores" },
      { id: "nav", label: "Ejemplo de NAV" },
      { id: "transparency", label: "Transparencia" },
    ],
    eyebrow: "Economía y modelo de negocio",
    heroTitle: "Cómo TAMS genera y distribuye los retornos de capital",
    heroLede: "Modelo transparente de asignación de capital con múltiples motores. Las tarifas son explícitas. Los retornos están atribuidos. Cada punto porcentual tiene una fuente.",
    feesBadge: "Estructura de tarifas",
    feesTitle: "El contrato económico entre GP y LP",
    feesSubtitle: "Estructura institucional estándar de la industria con reportes transparentes. Sin tarifas ocultas, sin acuerdos soft-dollar, sin cartas paralelas de redención preferida.",
    gpEyebrow: "Socio General",
    gpTitle: "TAMS Capital · Cuadro de tarifas",
    feeRows: [
      { label: "Tarifa de gestión", value: "1.75% anual", note: "Cargada trimestralmente sobre AUM promedio" },
      { label: "Tarifa de desempeño", value: "17.5%", note: "Sobre hurdle 6.0%, con high-water mark" },
      { label: "Hurdle Rate", value: "6.0%", note: "Refleja la tasa libre de riesgo de ETH staking" },
      { label: "High-Water Mark", value: "Sí", note: "Sin doble cobro en recuperación" },
      { label: "Inversión mínima", value: "$100,000", note: "Solo inversores acreditados" },
      { label: "Lock-up", value: "12 meses", note: "Redenciones trimestrales, aviso de 30 días" },
    ],
    lpEyebrow: "Socio Limitado",
    lpTitle: "Lo que reciben los LP",
    lpItems: [
      { title: "Estados NAV trimestrales", body: "Auditados por firma Tier-1. Incluyen atribución de retorno por motor." },
      { title: "Actualizaciones mensuales", body: "Rendimiento Treasury, DeFi, P&L de trading, devengos RWA — reportados separadamente." },
      { title: "Verificabilidad on-chain", body: "Direcciones de custodia se divulgan bajo NDA. Los LP verifican las posiciones independientemente." },
      { title: "Auditoría anual + paquete fiscal", body: "K-1 o equivalente para jurisdicciones relevantes. Análisis PFIC disponible." },
    ],
    lpFooter: "Los LP son cargados en neto — todas las tarifas de custodia, gas, auditoría y protocolo son absorbidas por la tarifa de gestión, no descontadas de los retornos LP.",
    enginesBadge: "Cinco motores de rendimiento",
    enginesTitle: "La mecánica de generación de retorno",
    enginesSubtitle: "Cada motor es una fuente discreta de retorno con características de riesgo explícitas, límite de asignación y rastro de auditoría. Diversificado por mecanismo, no solo por activo.",
    engines: [
      { name: "Rendimiento Treasury", subtitle: "Staking ETH + SOL con capa restaking", yieldRange: "5.5–8.0% + MEV", capAlloc: "Hasta 40% del AUM", bullets: ["Lido + EigenLayer para ETH (base + prima restaking)", "Jito para SOL (validadores con MEV)", "Liquid staking tokens preservan composabilidad para estrategias derivadas", "Fuente: Cobo, Chorus One, DAIC Capital — abr 2026"] },
      { name: "DeFi · Lending y LP", subtitle: "Solo protocolos blue-chip auditados", yieldRange: "3–7% USDC · 5–15% LP", capAlloc: "Hasta 20% del AUM", bullets: ["Lending Aave V3 USDC/USDT (Tier-1, multi-auditoría)", "Pares stablecoin Curve / Uniswap V3 (gestión de IL)", "67% de instituciones globalmente prefieren DeFi sobre spot — Nomura, abr 2026", "Límite 20% evita concentración en un protocolo"] },
      { name: "Trading activo", subtitle: "Momentum y carry discrecionales", yieldRange: "Sharpe objetivo 1.2+", capAlloc: "Hasta 15% del AUM", bullets: ["Momentum cross-L1, operaciones basis, carry de funding rates", "Capa cuant con sizing dinámico", "Atribución mensual: alfa de trading vs rendimiento vs direccional", "Disyuntores de drawdown en –4% / –7%"] },
      { name: "RWA tokenizado", subtitle: "BUIDL, BENJI — T-Bills institucionales on-chain", yieldRange: "4.3–4.6% APY", capAlloc: "Hasta 25% del AUM", bullets: ["BlackRock BUIDL ($5.2B AUM, líder de mercado)", "Franklin BENJI en Stellar/Polygon", "Mercado RWA: $26.4B hoy → proyección $16T para 2030 (BCG)", "Liquidación 24/7; sin T+1; mismo perfil de riesgo que US Treasuries"] },
      { name: "Prima MEV y Validador", subtitle: "Capa de rendimiento de frontera", yieldRange: "+0.5–1.5% sobre la base", capAlloc: "Integrado en Treasury", bullets: ["Enrutamiento staking vía validadores con MEV (Jito, Lido v3)", "Captura de subastas MEV consagradas en protocolo", "Solo ~12% de los fondos cripto operan esta capa hoy", "Fuente: Chorus One, Lune.fi — abr 2026"] },
    ],
    yieldRangeLabel: "Rango de rendimiento",
    capAllocLabel: "Límite de asignación",
    navBadge: "Ejemplo trabajado",
    navTitle: "Portafolio $50M · composición anual de rendimiento",
    navSubtitle: "Modelo ilustrativo — no es un pronóstico. Demuestra cómo la arquitectura multi-motor compone retornos de fuentes independientes.",
    navCols: { allocation: "Asignación", capital: "Capital", strategy: "Estrategia", yield: "Rendimiento", income: "Ingreso" },
    navRows: [
      { allocation: "Treasury (40%)", capital: "$20.0M", strategy: "ETH + SOL en staking", yield: "6.5%", income: "$1,300K" },
      { allocation: "DeFi (20%)", capital: "$10.0M", strategy: "Aave + Lido", yield: "5.5%", income: "$550K" },
      { allocation: "Trading (15%)", capital: "$7.5M", strategy: "Alfa discrecional", yield: "12.0%", income: "$900K" },
      { allocation: "RWA (15%)", capital: "$7.5M", strategy: "BUIDL + BENJI", yield: "4.5%", income: "$338K" },
      { allocation: "Efectivo (10%)", capital: "$5.0M", strategy: "Reserva stablecoin", yield: "4.0%", income: "$200K" },
    ],
    navGross: "Rendimiento bruto combinado",
    navMgmt: "Menos: tarifa de gestión (1.75%)",
    navPerf: "Menos: tarifa de desempeño (17.5% sobre hurdle)",
    navNet: "Neto a LPs (solo componente rendimiento)",
    navFooter: "Excluye apreciación direccional de activos subyacentes (movimiento de precio BTC/ETH/SOL), que se acumula a los LP separadamente en la misma estructura pro-rata. Supuestos de rendimiento basados en datos de mercado de abr 2026.",
    transparencyEyebrow: "Transparencia por defecto",
    transparencyTitle: "Cada dólar ganado es rastreable a una fuente, un motor y una fecha.",
    transparencyLede: "Los inversores acreditados reciben el data room completo — cuadro de tarifas, metodología NAV, atestaciones de custodia, cartas de auditoría y prueba on-chain.",
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
            <span className="text-[10px] tracking-[0.42em] uppercase text-amber-300/90 font-semibold">
              {t.eyebrow}
            </span>
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

      {/* Fee Architecture */}
      <section id="fees" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <SectionHeader badge={t.feesBadge} title={t.feesTitle} subtitle={t.feesSubtitle} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {/* GP table */}
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

          {/* LP value */}
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
              <div className="text-[11px] text-amber-300/70 leading-relaxed font-light">
                {t.lpFooter}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Five Engines */}
      <section id="engines" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader badge={t.enginesBadge} title={t.enginesTitle} subtitle={t.enginesSubtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {t.engines.map((engine, i) => {
            const Icon = ENGINE_ICONS[i];
            return (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="surface-tier-2 p-6 relative group hover:border-amber-500/35 transition-colors duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="size-11 rounded-xl bg-amber-500/[0.10] border border-amber-500/25 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-amber-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-white leading-snug">{engine.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{engine.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 my-5">
                  <div className="surface-tier-3 px-3 py-2.5">
                    <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-1">{t.yieldRangeLabel}</div>
                    <div className="text-sm font-bold text-amber-300 tabular-nums">{engine.yieldRange}</div>
                  </div>
                  <div className="surface-tier-3 px-3 py-2.5">
                    <div className="text-[9px] uppercase tracking-[0.22em] text-zinc-500 font-semibold mb-1">{t.capAllocLabel}</div>
                    <div className="text-sm font-bold text-blue-300 tabular-nums">{engine.capAlloc}</div>
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

      {/* NAV Example */}
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
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.allocation}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.capital}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold hidden sm:table-cell">{t.navCols.strategy}</th>
                  <th className="text-right py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.yield}</th>
                  <th className="text-right py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.navCols.income}</th>
                </tr>
              </thead>
              <tbody>
                {t.navRows.map((row) => (
                  <tr key={row.allocation} className="border-b border-amber-500/[0.06] hover:bg-amber-500/[0.03] transition-colors">
                    <td className="py-3 px-3 text-white font-medium">{row.allocation}</td>
                    <td className="py-3 px-3 text-zinc-300 tabular-nums">{row.capital}</td>
                    <td className="py-3 px-3 text-zinc-500 hidden sm:table-cell">{row.strategy}</td>
                    <td className="py-3 px-3 text-right text-amber-300 tabular-nums font-medium">{row.yield}</td>
                    <td className="py-3 px-3 text-right text-white tabular-nums font-semibold">{row.income}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-amber-500/30">
                  <td colSpan={3} className="py-4 px-3 text-white font-semibold">{t.navGross}</td>
                  <td className="py-4 px-3 text-right text-amber-300 tabular-nums font-bold">6.58%</td>
                  <td className="py-4 px-3 text-right text-amber-300 tabular-nums font-bold">$3,288K</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2 px-3 text-zinc-500 text-xs">{t.navMgmt}</td>
                  <td className="py-2 px-3 text-right text-zinc-500 text-xs"></td>
                  <td className="py-2 px-3 text-right text-zinc-400 tabular-nums">−$875K</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2 px-3 text-zinc-500 text-xs">{t.navPerf}</td>
                  <td className="py-2 px-3 text-right text-zinc-500 text-xs"></td>
                  <td className="py-2 px-3 text-right text-zinc-400 tabular-nums">−$50K</td>
                </tr>
                <tr className="border-t-2 border-blue-400/30">
                  <td colSpan={3} className="py-4 px-3 text-white font-semibold">{t.navNet}</td>
                  <td className="py-4 px-3 text-right text-blue-300 tabular-nums font-bold">4.73%</td>
                  <td className="py-4 px-3 text-right text-blue-300 tabular-nums font-bold">$2,363K</td>
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
            <Footnote n={3} source="BlackRock BUIDL · $5.2B AUM, leader in tokenized T-Bills" date="Mar 2026" />,
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

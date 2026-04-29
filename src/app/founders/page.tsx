"use client";

// /founders — חברת השקעות (לא קרן)
// מסביר: 2 מאגרי הון נפרדים (תשתית ↔ השקעה) · עלויות אמיתיות · מבנה שותף ראשון · רווח/הפסד לפי equity
import { motion } from "framer-motion";
import {
  Building2, Coins, Users, Wrench, TrendingUp,
  AlertTriangle, CheckCircle2, Rocket, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/layout/SectionHeader";
import PageTableOfContents from "@/components/layout/PageTableOfContents";
import Footnote from "@/components/ui/Footnote";
import { useLanguage } from "@/lib/i18n";

const TEXTS = {
  en: {
    sections: [
      { id: "intro", label: "Overview" },
      { id: "structure", label: "Structure" },
      { id: "pools", label: "Two Capital Pools" },
      { id: "setup", label: "Setup Costs" },
      { id: "opex", label: "Operating Cost" },
      { id: "partner", label: "First Partner" },
      { id: "scenarios", label: "P&L Scenarios" },
      { id: "next", label: "Next" },
    ],
    eyebrow: "Founders Room · Internal",
    heroTitle: "TAMS is an Investment Company — Not a Fund",
    heroLede:
      "A clear-eyed look at how TAMS is built, what it costs to launch, where the first partner fits in, and what the founder actually earns. No fund-management theatre — just a company that owns assets, generates returns, and shares profits among its shareholders.",

    structureBadge: "Legal Structure",
    structureTitle: "Investment Company vs. Investment Fund",
    structureSubtitle:
      "We deliberately chose the simpler structure. An investment company is faster to launch, cheaper to run, and far more flexible than a regulated fund — at the cost of not being able to take public LPs.",
    compareCols: { aspect: "Aspect", fund: "Investment Fund (BVI/Cayman)", company: "Investment Company (TAMS)" },
    compareRows: [
      { aspect: "Setup cost", fund: "$80–150K", company: "$15–40K" },
      { aspect: "Setup time", fund: "3–6 months", company: "2–6 weeks" },
      { aspect: "Annual legal/audit", fund: "$60–100K", company: "$15–35K" },
      { aspect: "Investor structure", fund: "GP + Limited Partners", company: "Founder + Co-investors as shareholders" },
      { aspect: "Profit distribution", fund: "Mgmt fee + perf fee + LP returns", company: "Pro-rata to equity %" },
      { aspect: "Regulatory load", fund: "Heavy (KYC, audit, regulator filings)", company: "Standard corporate (lighter)" },
      { aspect: "Best for", fund: "Open to many outside LPs", company: "Founder + handful of co-investors" },
    ],
    structureFooter:
      "TAMS will start as an investment company. If we ever choose to scale to dozens of LPs we can spin off a regulated fund vehicle later. The current model is built for a small, aligned ownership group.",

    poolsBadge: "Two Capital Pools",
    poolsTitle: "Infrastructure Money ≠ Investment Money",
    poolsSubtitle:
      "These are two different bank accounts and two different purposes. Confusing them is the most common mistake. Money raised for one cannot fund the other.",
    pools: [
      {
        name: "Pool A · Infrastructure Capital",
        purpose: "Builds and runs the company itself.",
        sources: "Founder savings + first partner",
        usage: "Legal entity setup · Fordefi · vault deposit · website · salaries · audit · 12-month buffer",
        size: "$300–500K to launch + $40K/month thereafter",
        return: "Does not generate return on its own — it is consumed",
        accent: "#5a8fd8",
      },
      {
        name: "Pool B · Investment Capital",
        purpose: "The actual capital deployed across the 5 portfolios.",
        sources: "Founder + first partner + later co-investors",
        usage: "Physical metals vault · AltCoin 16 · trading book · DeFi wallet · stablecoin reserve",
        size: "Starts at $1–3M, grows over time",
        return: "Generates returns — capital appreciation + on-chain yield",
        accent: "#d4a853",
      },
    ],
    poolsRule:
      "Golden rule: Pool A money never enters Pool B. Pool B returns can replenish Pool A. This separation is what makes the company audit-clean and investor-credible.",

    setupBadge: "One-Time Setup Cost",
    setupTitle: "What It Takes to Launch",
    setupSubtitle: "Realistic numbers for opening day. Paid from founder seed capital before any external partner enters.",
    setupCols: { item: "Item", note: "Detail", cost: "Cost" },
    setupRows: [
      { item: "Israeli Ltd company formation", note: "Lawyer fees, registration, founder agreement", cost: "$5–10K" },
      { item: "Initial accounting + tax setup", note: "CPA setup, accounting platform onboarding", cost: "$2–5K" },
      { item: "Custody platform onboarding", note: "Fordefi setup, KYC, initial wallet structure", cost: "$3–5K" },
      { item: "Physical vault contract", note: "Malca-Amit account opening, deposit", cost: "$2–5K" },
      { item: "Initial cold storage hardware", note: "Multiple Ledger devices, secure backup", cost: "$1–3K" },
      { item: "Website + brand", note: "Domain, design, build (this site)", cost: "$5–15K" },
      { item: "Operating buffer · 12 months", note: "Cash reserve to fund OpEx without revenue", cost: "$300–500K" },
    ],
    setupTotalLabel: "Total to launch",
    setupTotal: "≈ $320–540K",

    opexBadge: "Annual Operating Cost · Lean Mode",
    opexTitle: "What TAMS Costs to Run",
    opexSubtitle: "Built for a founder + 2-3 collaborators. Real Israeli vendor pricing. No bloat.",
    opexCols: { item: "Line Item", note: "Detail", cost: "Annual" },
    opexRows: [
      { item: "Team", note: "Founder + 2-3 (modest salaries, equity-heavy)", cost: "$220–330K" },
      { item: "Fordefi · custody platform", note: "$8K/month institutional MPC custody", cost: "$96K" },
      { item: "Tech infrastructure", note: "Exchange APIs, data feeds, software, security tooling", cost: "$60K" },
      { item: "Physical vault", note: "Malca-Amit storage + insurance + on-site audit", cost: "$50K" },
      { item: "Legal · audit · compliance", note: "Annual audit, legal retainer, KYC platform", cost: "$80K" },
      { item: "Overhead", note: "Office, travel, marketing, conferences", cost: "$40K" },
    ],
    opexTotalLabel: "Total annual OpEx",
    opexTotal: "≈ $550–650K",
    opexFooter: "This is what comes OUT of Pool A every year. It is funded by Pool B returns once they exceed OpEx. Until then, the founder + first partner subsidize.",

    partnerBadge: "Bringing the First Partner",
    partnerTitle: "How a Co-Investor Joins TAMS",
    partnerSubtitle:
      "If you bring a first partner before launch, they typically contribute to BOTH pools. The split between infrastructure and investment determines their equity stake and their pro-rata profit share.",
    partnerExamples: [
      {
        name: "Example A · Co-founder partner",
        contributesInfra: "$200K",
        contributesInvest: "$300K",
        contributesTotal: "$500K",
        getsEquity: "30–40%",
        role: "Active partner, day-to-day involved, often co-founder title",
      },
      {
        name: "Example B · Silent co-investor",
        contributesInfra: "$100K",
        contributesInvest: "$400K",
        contributesTotal: "$500K",
        getsEquity: "15–25%",
        role: "Passive shareholder, no operational role",
      },
      {
        name: "Example C · Pure investment partner",
        contributesInfra: "$0",
        contributesInvest: "$500K",
        contributesTotal: "$500K",
        getsEquity: "8–15%",
        role: "Investor only — equity reflects only Pool B contribution",
      },
    ],
    partnerCols: { example: "Scenario", infra: "Pool A · Infrastructure", invest: "Pool B · Investment", total: "Total Capital", equity: "Equity %", role: "Role" },
    partnerFooter:
      "Equity stakes are starting points — adjusted by negotiation, lock-up duration, board seats, anti-dilution rights. The numbers above assume founder retains majority and the partner stays for at least 4 years (vesting cliff).",

    scenariosBadge: "Profit & Loss Scenarios",
    scenariosTitle: "What Founder + Partner Earn — By Year",
    scenariosSubtitle:
      "Worked example: founder owns 70%, partner owns 30%. Pool A = $400K. Pool B starts at $1M, grows over time. Returns assume a representative crypto market (some bull, some bear).",
    scenariosCols: { year: "Year", aum: "Pool B (AUM)", marketYr: "Market", revenue: "Returns", opex: "OpEx", profit: "Net Profit", founder: "Founder 70%", partner: "Partner 30%" },
    scenariosRows: [
      { year: "Year 1", aum: "$1M", marketYr: "Building", revenue: "$120K", opex: "$550K", profit: "−$430K", profitBad: true, founder: "−$301K", partner: "−$129K" },
      { year: "Year 2", aum: "$3M", marketYr: "+15%", revenue: "$450K", opex: "$600K", profit: "−$150K", profitBad: true, founder: "−$105K", partner: "−$45K" },
      { year: "Year 3", aum: "$8M", marketYr: "+22%", revenue: "$1,760K", opex: "$650K", profit: "+$1,110K", founder: "+$777K", founderGood: true, partner: "+$333K", partnerGood: true },
      { year: "Year 4", aum: "$20M", marketYr: "+50% bull", revenue: "$10,000K", opex: "$700K", profit: "+$9,300K", profitGood: true, founder: "+$6,510K", founderGreat: true, partner: "+$2,790K", partnerGreat: true },
      { year: "Year 5", aum: "$45M", marketYr: "+18%", revenue: "$8,100K", opex: "$750K", profit: "+$7,350K", profitGood: true, founder: "+$5,145K", founderGreat: true, partner: "+$2,205K", partnerGreat: true },
    ],
    scenariosFooter:
      "Cumulative 5-year profit: founder ≈ $12.0M, partner ≈ $5.2M. Initial investment from founder ≈ $200K, from partner = $500K. ROI: founder 60×, partner 10×. The asymmetry is real — most of the upside comes from year 3 onwards.",

    nextBadge: "Next",
    nextTitle: "Build the Founding Team",
    nextLede: "When you find the right first partner, the math above is the conversation. Honest numbers, fair equity, aligned incentives. The hard part is finding the person — the structure is solved.",
    nextCta: "Back to Public Site",
  },
  he: {
    sections: [
      { id: "intro", label: "סקירה" },
      { id: "structure", label: "מבנה" },
      { id: "pools", label: "שני מאגרי הון" },
      { id: "setup", label: "עלויות הקמה" },
      { id: "opex", label: "עלויות תפעול" },
      { id: "partner", label: "שותף ראשון" },
      { id: "scenarios", label: "תרחישי P&L" },
      { id: "next", label: "המשך" },
    ],
    eyebrow: "חדר המייסדים · פנימי",
    heroTitle: "TAMS היא חברת השקעות — לא קרן",
    heroLede:
      "מבט בהיר על איך TAMS נבנית, מה עולה להשיק אותה, איפה השותף הראשון נכנס, ומה המייסד באמת מרוויח. בלי תיאטרון של ניהול קרנות — רק חברה שמחזיקה נכסים, מייצרת תשואה ומחלקת רווחים בין בעלי המניות.",

    structureBadge: "מבנה משפטי",
    structureTitle: "חברת השקעות מול קרן השקעות",
    structureSubtitle:
      "בחרנו במכוון במבנה הפשוט. חברת השקעות מהירה יותר להשקה, זולה יותר לתפעול וגמישה הרבה יותר מקרן מפוקחת — במחיר שאי אפשר לקחת LP ציבוריים.",
    compareCols: { aspect: "היבט", fund: "קרן השקעות (BVI/Cayman)", company: "חברת השקעות (TAMS)" },
    compareRows: [
      { aspect: "עלות הקמה", fund: "$80–150K", company: "$15–40K" },
      { aspect: "זמן הקמה", fund: "3–6 חודשים", company: "2–6 שבועות" },
      { aspect: "Audit/משפטי שנתי", fund: "$60–100K", company: "$15–35K" },
      { aspect: "מבנה משקיעים", fund: "GP + שותפים מוגבלים", company: "מייסד + שותפי הון כבעלי מניות" },
      { aspect: "חלוקת רווחים", fund: "דמי ניהול + דמי הצלחה + תשואות LP", company: "Pro-rata לפי % equity" },
      { aspect: "עומס רגולטורי", fund: "כבד (KYC, audit, דיווחים לרגולטור)", company: "תאגידי סטנדרטי (קל יותר)" },
      { aspect: "מתאים ל-", fund: "פתוח לעשרות LP חיצוניים", company: "מייסד + קומץ co-investors" },
    ],
    structureFooter:
      "TAMS מתחילה כחברת השקעות. אם אי-פעם נבחר להתרחב לעשרות LP נוכל לפצל למבנה קרן מפוקחת מאוחר יותר. המודל הנוכחי בנוי לקבוצת בעלות קטנה ומיושרת.",

    poolsBadge: "שני מאגרי הון",
    poolsTitle: "כסף תשתית ≠ כסף השקעה",
    poolsSubtitle:
      "אלו שני חשבונות בנק שונים ושני יעדים שונים. בלבול ביניהם הוא הטעות הנפוצה ביותר. כסף שגויס לאחד לא יכול לממן את השני.",
    pools: [
      {
        name: "מאגר A · הון תשתית",
        purpose: "בונה ומפעיל את החברה עצמה.",
        sources: "חסכונות מייסד + שותף ראשון",
        usage: "הקמת ישות משפטית · Fordefi · פיקדון כספת · אתר · משכורות · audit · באפר ל-12 חודש",
        size: "$300–500K להשקה + $40K לחודש לאחר מכן",
        return: "לא מייצר תשואה בעצמו — נצרך",
        accent: "#5a8fd8",
      },
      {
        name: "מאגר B · הון השקעה",
        purpose: "ההון בפועל שמופרס על-פני 5 התיקים.",
        sources: "מייסד + שותף ראשון + co-investors מאוחר",
        usage: "כספת מתכות פיזית · AltCoin 16 · ספר מסחר · ארנק DeFi · רזרבת stablecoin",
        size: "מתחיל ב-$1–3M, גדל עם הזמן",
        return: "מייצר תשואה — ייסוף הון + תשואת on-chain",
        accent: "#d4a853",
      },
    ],
    poolsRule:
      "כלל זהב: כסף ממאגר A אף פעם לא נכנס למאגר B. תשואות ממאגר B יכולות לחדש את מאגר A. ההפרדה הזו היא מה שהופך את החברה לנקייה לביקורת ואמינה למשקיעים.",

    setupBadge: "עלות הקמה חד-פעמית",
    setupTitle: "מה צריך כדי להשיק",
    setupSubtitle: "מספרים ריאליים ליום הפתיחה. משולמים מהון seed של המייסד לפני שנכנס שותף חיצוני.",
    setupCols: { item: "סעיף", note: "פרט", cost: "עלות" },
    setupRows: [
      { item: "הקמת חברה ישראלית בע״מ", note: "שכר טרחה, רישום, הסכם מייסדים", cost: "$5–10K" },
      { item: "הקמת חשבונאות + מס", note: "הקמת רו״ח, onboarding לפלטפורמת חשבונאות", cost: "$2–5K" },
      { item: "הקמת custody", note: "הקמת Fordefi, KYC, מבנה ארנק ראשוני", cost: "$3–5K" },
      { item: "חוזה כספת פיזית", note: "פתיחת חשבון Malca-Amit, פיקדון", cost: "$2–5K" },
      { item: "Cold storage hardware", note: "מספר התקני Ledger, גיבוי מאובטח", cost: "$1–3K" },
      { item: "אתר + מותג", note: "דומיין, design, build (האתר הזה)", cost: "$5–15K" },
      { item: "באפר תפעולי · 12 חודש", note: "רזרבת מזומן לממן OpEx ללא הכנסה", cost: "$300–500K" },
    ],
    setupTotalLabel: "סה״כ להשקה",
    setupTotal: "≈ $320–540K",

    opexBadge: "עלות תפעול שנתית · Lean",
    opexTitle: "מה TAMS עולה לתפעל",
    opexSubtitle: "בנוי למייסד + 2-3 שותפים. תמחור ספקים ישראלי אמיתי. ללא נפיחות.",
    opexCols: { item: "סעיף", note: "פרט", cost: "שנתי" },
    opexRows: [
      { item: "צוות", note: "מייסד + 2-3 (משכורות צנועות, equity-heavy)", cost: "$220–330K" },
      { item: "Fordefi · custody", note: "$8K לחודש MPC custody מוסדי", cost: "$96K" },
      { item: "תשתית טכנית", note: "Exchange APIs, data feeds, software, אבטחה", cost: "$60K" },
      { item: "כספת פיזית", note: "אחסון Malca-Amit + ביטוח + audit on-site", cost: "$50K" },
      { item: "משפטי · audit · compliance", note: "audit שנתי, retainer משפטי, פלטפורמת KYC", cost: "$80K" },
      { item: "Overhead", note: "משרד, נסיעות, marketing, ועידות", cost: "$40K" },
    ],
    opexTotalLabel: "סה״כ OpEx שנתי",
    opexTotal: "≈ $550–650K",
    opexFooter: "זה מה שיוצא ממאגר A מדי שנה. ממומן ע״י תשואות ממאגר B ברגע שהן עולות על OpEx. עד אז, המייסד + השותף הראשון מסבסדים.",

    partnerBadge: "הכנסת שותף ראשון",
    partnerTitle: "איך co-investor מצטרף ל-TAMS",
    partnerSubtitle:
      "אם אתה מביא שותף ראשון לפני השקה, הוא בדרך-כלל תורם לשני המאגרים. החלוקה בין תשתית להשקעה קובעת את גובה ה-equity שלו ואת חלקו ברווחים pro-rata.",
    partnerExamples: [
      {
        name: "דוגמה A · שותף-מייסד",
        contributesInfra: "$200K",
        contributesInvest: "$300K",
        contributesTotal: "$500K",
        getsEquity: "30–40%",
        role: "שותף פעיל, מעורב ביום-יום, לרוב בעל תואר co-founder",
      },
      {
        name: "דוגמה B · co-investor שקט",
        contributesInfra: "$100K",
        contributesInvest: "$400K",
        contributesTotal: "$500K",
        getsEquity: "15–25%",
        role: "בעל מניות פסיבי, ללא תפקיד תפעולי",
      },
      {
        name: "דוגמה C · שותף השקעה בלבד",
        contributesInfra: "$0",
        contributesInvest: "$500K",
        contributesTotal: "$500K",
        getsEquity: "8–15%",
        role: "משקיע בלבד — equity משקף רק תרומה למאגר B",
      },
    ],
    partnerCols: { example: "תרחיש", infra: "מאגר A · תשתית", invest: "מאגר B · השקעה", total: "סה״כ הון", equity: "% Equity", role: "תפקיד" },
    partnerFooter:
      "% ה-equity הם נקודת התחלה — מותאמים במו״מ, משך נעילה, מושבי דירקטוריון, זכויות אנטי-דילול. המספרים לעיל מניחים שהמייסד שומר רוב והשותף נשאר לפחות 4 שנים (vesting cliff).",

    scenariosBadge: "תרחישי רווח והפסד",
    scenariosTitle: "מה מייסד + שותף מרוויחים — לפי שנה",
    scenariosSubtitle:
      "דוגמה מעובדת: למייסד 70%, לשותף 30%. מאגר A = $400K. מאגר B מתחיל ב-$1M, גדל עם הזמן. תשואות מניחות שוק קריפטו מייצג (קצת bull, קצת bear).",
    scenariosCols: { year: "שנה", aum: "מאגר B (AUM)", marketYr: "שוק", revenue: "תשואות", opex: "OpEx", profit: "רווח נטו", founder: "מייסד 70%", partner: "שותף 30%" },
    scenariosRows: [
      { year: "שנה 1", aum: "$1M", marketYr: "בנייה", revenue: "$120K", opex: "$550K", profit: "−$430K", profitBad: true, founder: "−$301K", partner: "−$129K" },
      { year: "שנה 2", aum: "$3M", marketYr: "+15%", revenue: "$450K", opex: "$600K", profit: "−$150K", profitBad: true, founder: "−$105K", partner: "−$45K" },
      { year: "שנה 3", aum: "$8M", marketYr: "+22%", revenue: "$1,760K", opex: "$650K", profit: "+$1,110K", founder: "+$777K", founderGood: true, partner: "+$333K", partnerGood: true },
      { year: "שנה 4", aum: "$20M", marketYr: "+50% bull", revenue: "$10,000K", opex: "$700K", profit: "+$9,300K", profitGood: true, founder: "+$6,510K", founderGreat: true, partner: "+$2,790K", partnerGreat: true },
      { year: "שנה 5", aum: "$45M", marketYr: "+18%", revenue: "$8,100K", opex: "$750K", profit: "+$7,350K", profitGood: true, founder: "+$5,145K", founderGreat: true, partner: "+$2,205K", partnerGreat: true },
    ],
    scenariosFooter:
      "רווח מצטבר 5 שנים: מייסד ≈ $12.0M, שותף ≈ $5.2M. השקעה ראשונית ממייסד ≈ $200K, מהשותף = $500K. ROI: מייסד 60×, שותף 10×. האסימטריה אמיתית — רוב ה-upside מגיע משנה 3 והלאה.",

    nextBadge: "המשך",
    nextTitle: "בנה את צוות המייסדים",
    nextLede: "כשתמצא את השותף הראשון הנכון, החישוב לעיל הוא השיחה. מספרים ישרים, equity הוגן, תמריצים מיושרים. החלק הקשה הוא למצוא את האדם — המבנה פתור.",
    nextCta: "חזרה לאתר הציבורי",
  },
  ar: {
    sections: [
      { id: "intro", label: "نظرة عامة" },
      { id: "structure", label: "الهيكل" },
      { id: "pools", label: "مجمعا رأس المال" },
      { id: "setup", label: "تكاليف الإعداد" },
      { id: "opex", label: "تكلفة التشغيل" },
      { id: "partner", label: "الشريك الأول" },
      { id: "scenarios", label: "سيناريوهات الربح والخسارة" },
      { id: "next", label: "التالي" },
    ],
    eyebrow: "غرفة المؤسسين · داخلي",
    heroTitle: "TAMS شركة استثمار — وليست صندوقًا",
    heroLede:
      "نظرة واضحة على كيفية بناء TAMS، وما تكلفة إطلاقها، وأين يندمج الشريك الأول، وما يكسبه المؤسس فعلًا. بدون مسرحية إدارة الصناديق — فقط شركة تمتلك أصولًا، تولّد عوائد، وتقاسم الأرباح بين مساهميها.",

    structureBadge: "الهيكل القانوني",
    structureTitle: "شركة استثمار مقابل صندوق استثمار",
    structureSubtitle:
      "اخترنا عمدًا الهيكل الأبسط. شركة الاستثمار أسرع في الإطلاق، أرخص في التشغيل، وأكثر مرونة بكثير من صندوق منظَّم — مقابل عدم القدرة على قبول LPs عامين.",
    compareCols: { aspect: "الجانب", fund: "صندوق استثمار (BVI/Cayman)", company: "شركة استثمار (TAMS)" },
    compareRows: [
      { aspect: "تكلفة الإعداد", fund: "$80–150K", company: "$15–40K" },
      { aspect: "وقت الإعداد", fund: "3–6 أشهر", company: "2–6 أسابيع" },
      { aspect: "تدقيق/قانوني سنوي", fund: "$60–100K", company: "$15–35K" },
      { aspect: "هيكل المستثمرين", fund: "GP + شركاء محدودون", company: "مؤسس + شركاء رأس مال كمساهمين" },
      { aspect: "توزيع الأرباح", fund: "رسوم إدارة + رسوم أداء + عوائد LP", company: "Pro-rata حسب نسبة equity" },
      { aspect: "العبء التنظيمي", fund: "ثقيل (KYC، تدقيق، تقارير منظمين)", company: "قانوني تجاري عادي (أخف)" },
      { aspect: "مناسب لـ-", fund: "مفتوح لعشرات LPs خارجيين", company: "مؤسس + قلة من co-investors" },
    ],
    structureFooter: "تبدأ TAMS كشركة استثمار. إذا اخترنا في أي وقت التوسع إلى عشرات LPs يمكننا فصل أداة صندوق منظمة لاحقًا. النموذج الحالي مبني لمجموعة ملكية صغيرة ومتوافقة.",

    poolsBadge: "مجمعا رأس المال",
    poolsTitle: "مال البنية التحتية ≠ مال الاستثمار",
    poolsSubtitle: "هذان حسابان بنكيان مختلفان وغرضان مختلفان. الخلط بينهما هو الخطأ الأكثر شيوعًا. مال جُمع لأحدهما لا يمكن أن يموّل الآخر.",
    pools: [
      { name: "المجمع A · رأس مال البنية التحتية", purpose: "يبني ويُشغّل الشركة نفسها.", sources: "مدخرات المؤسس + الشريك الأول", usage: "تأسيس كيان قانوني · Fordefi · وديعة الخزنة · موقع · رواتب · تدقيق · احتياطي 12 شهرًا", size: "$300–500K للإطلاق + $40K شهريًا بعد ذلك", return: "لا يولّد عائدًا بنفسه — يُستهلك", accent: "#5a8fd8" },
      { name: "المجمع B · رأس مال الاستثمار", purpose: "رأس المال الفعلي المنشور عبر المحافظ الخمس.", sources: "مؤسس + شريك أول + co-investors لاحقًا", usage: "خزنة المعادن المادية · AltCoin 16 · سجل التداول · محفظة DeFi · احتياطي stablecoin", size: "يبدأ بـ $1–3M، ينمو مع الوقت", return: "يولّد عوائد — ارتفاع رأس المال + عائد on-chain", accent: "#d4a853" },
    ],
    poolsRule: "القاعدة الذهبية: مال المجمع A لا يدخل أبدًا المجمع B. عوائد المجمع B يمكن أن تجدّد المجمع A. هذا الفصل هو ما يجعل الشركة نظيفة للتدقيق وموثوقة للمستثمرين.",

    setupBadge: "تكلفة الإعداد لمرة واحدة",
    setupTitle: "ما يلزم للإطلاق",
    setupSubtitle: "أرقام واقعية ليوم الافتتاح. تُدفع من رأس مال seed للمؤسس قبل دخول أي شريك خارجي.",
    setupCols: { item: "البند", note: "التفاصيل", cost: "التكلفة" },
    setupRows: [
      { item: "تأسيس شركة إسرائيلية محدودة", note: "أتعاب محامٍ، تسجيل، اتفاقية مؤسسين", cost: "$5–10K" },
      { item: "إعداد محاسبة + ضرائب", note: "إعداد محاسب قانوني، onboarding لمنصة محاسبة", cost: "$2–5K" },
      { item: "إعداد custody", note: "إعداد Fordefi، KYC، هيكل محفظة أولي", cost: "$3–5K" },
      { item: "عقد الخزنة المادية", note: "فتح حساب Malca-Amit، وديعة", cost: "$2–5K" },
      { item: "Cold storage hardware", note: "أجهزة Ledger متعددة، نسخ احتياطية آمنة", cost: "$1–3K" },
      { item: "موقع + علامة تجارية", note: "نطاق، تصميم، build (هذا الموقع)", cost: "$5–15K" },
      { item: "احتياطي تشغيلي · 12 شهرًا", note: "احتياطي نقدي لتمويل OpEx بدون إيرادات", cost: "$300–500K" },
    ],
    setupTotalLabel: "إجمالي للإطلاق",
    setupTotal: "≈ $320–540K",

    opexBadge: "تكلفة التشغيل السنوية · Lean",
    opexTitle: "ما تكلفة تشغيل TAMS",
    opexSubtitle: "مبني لمؤسس + 2-3 متعاونين. تسعير موردين إسرائيليين حقيقي. بدون تضخم.",
    opexCols: { item: "البند", note: "التفاصيل", cost: "سنوي" },
    opexRows: [
      { item: "الفريق", note: "مؤسس + 2-3 (رواتب متواضعة، equity-heavy)", cost: "$220–330K" },
      { item: "Fordefi · custody", note: "$8K شهريًا MPC custody مؤسسي", cost: "$96K" },
      { item: "البنية التحتية التقنية", note: "Exchange APIs، تدفقات بيانات، برامج، أدوات أمنية", cost: "$60K" },
      { item: "خزنة مادية", note: "تخزين Malca-Amit + تأمين + تدقيق on-site", cost: "$50K" },
      { item: "قانوني · تدقيق · امتثال", note: "تدقيق سنوي، retainer قانوني، منصة KYC", cost: "$80K" },
      { item: "Overhead", note: "مكتب، سفر، marketing، مؤتمرات", cost: "$40K" },
    ],
    opexTotalLabel: "إجمالي OpEx السنوي",
    opexTotal: "≈ $550–650K",
    opexFooter: "هذا ما يخرج من المجمع A سنويًا. يموّل من عوائد المجمع B بمجرد تجاوزها OpEx. حتى ذلك الحين، المؤسس + الشريك الأول يدعمان.",

    partnerBadge: "إدخال الشريك الأول",
    partnerTitle: "كيف ينضم co-investor إلى TAMS",
    partnerSubtitle: "إذا أحضرت شريكًا أولًا قبل الإطلاق، فهو عادةً يساهم في كلا المجمعين. التقسيم بين البنية التحتية والاستثمار يحدد حصته في equity وحصته في الأرباح pro-rata.",
    partnerExamples: [
      { name: "مثال A · شريك مؤسس", contributesInfra: "$200K", contributesInvest: "$300K", contributesTotal: "$500K", getsEquity: "30–40%", role: "شريك نشط، مشارك يوميًا، غالبًا بلقب co-founder" },
      { name: "مثال B · co-investor صامت", contributesInfra: "$100K", contributesInvest: "$400K", contributesTotal: "$500K", getsEquity: "15–25%", role: "مساهم سلبي، بدون دور تشغيلي" },
      { name: "مثال C · شريك استثمار فقط", contributesInfra: "$0", contributesInvest: "$500K", contributesTotal: "$500K", getsEquity: "8–15%", role: "مستثمر فقط — equity يعكس فقط مساهمة المجمع B" },
    ],
    partnerCols: { example: "السيناريو", infra: "مجمع A · بنية تحتية", invest: "مجمع B · استثمار", total: "إجمالي رأس المال", equity: "% Equity", role: "الدور" },
    partnerFooter: "نسب equity هي نقاط بداية — معدلة بالتفاوض، مدة الإغلاق، مقاعد مجلس الإدارة، حقوق مكافحة التخفيف. الأرقام أعلاه تفترض أن المؤسس يحتفظ بالأغلبية والشريك يبقى لمدة 4 سنوات على الأقل (vesting cliff).",

    scenariosBadge: "سيناريوهات الربح والخسارة",
    scenariosTitle: "ما يكسبه المؤسس + الشريك — حسب السنة",
    scenariosSubtitle: "مثال محسوب: المؤسس يمتلك 70%، الشريك يمتلك 30%. المجمع A = $400K. المجمع B يبدأ بـ $1M وينمو بمرور الوقت. العوائد تفترض سوق كريبتو تمثيلي (بعض bull، بعض bear).",
    scenariosCols: { year: "السنة", aum: "المجمع B (AUM)", marketYr: "السوق", revenue: "العوائد", opex: "OpEx", profit: "صافي الربح", founder: "المؤسس 70%", partner: "الشريك 30%" },
    scenariosRows: [
      { year: "السنة 1", aum: "$1M", marketYr: "بناء", revenue: "$120K", opex: "$550K", profit: "−$430K", profitBad: true, founder: "−$301K", partner: "−$129K" },
      { year: "السنة 2", aum: "$3M", marketYr: "+15%", revenue: "$450K", opex: "$600K", profit: "−$150K", profitBad: true, founder: "−$105K", partner: "−$45K" },
      { year: "السنة 3", aum: "$8M", marketYr: "+22%", revenue: "$1,760K", opex: "$650K", profit: "+$1,110K", founder: "+$777K", founderGood: true, partner: "+$333K", partnerGood: true },
      { year: "السنة 4", aum: "$20M", marketYr: "+50% bull", revenue: "$10,000K", opex: "$700K", profit: "+$9,300K", profitGood: true, founder: "+$6,510K", founderGreat: true, partner: "+$2,790K", partnerGreat: true },
      { year: "السنة 5", aum: "$45M", marketYr: "+18%", revenue: "$8,100K", opex: "$750K", profit: "+$7,350K", profitGood: true, founder: "+$5,145K", founderGreat: true, partner: "+$2,205K", partnerGreat: true },
    ],
    scenariosFooter: "إجمالي ربح 5 سنوات: المؤسس ≈ $12.0M، الشريك ≈ $5.2M. الاستثمار الأولي من المؤسس ≈ $200K، من الشريك = $500K. ROI: المؤسس 60×، الشريك 10×. عدم التماثل حقيقي — معظم الـ upside يأتي من السنة 3 فصاعدًا.",

    nextBadge: "التالي",
    nextTitle: "ابنِ فريق المؤسسين",
    nextLede: "عندما تجد الشريك الأول الصحيح، الحساب أعلاه هو المحادثة. أرقام صادقة، equity عادل، حوافز متوافقة. الجزء الصعب هو إيجاد الشخص — البنية محلولة.",
    nextCta: "العودة إلى الموقع العام",
  },
  ru: {
    sections: [
      { id: "intro", label: "Обзор" },
      { id: "structure", label: "Структура" },
      { id: "pools", label: "Два пула капитала" },
      { id: "setup", label: "Затраты на запуск" },
      { id: "opex", label: "Операционные расходы" },
      { id: "partner", label: "Первый партнёр" },
      { id: "scenarios", label: "Сценарии P&L" },
      { id: "next", label: "Далее" },
    ],
    eyebrow: "Комната основателей · внутреннее",
    heroTitle: "TAMS — инвестиционная компания, не фонд",
    heroLede:
      "Ясный взгляд на то, как строится TAMS, что стоит её запуск, где встраивается первый партнёр, и что основатель действительно зарабатывает. Без театра управления фондами — просто компания, которая владеет активами, генерирует доход и делит прибыль между акционерами.",

    structureBadge: "Юридическая структура",
    structureTitle: "Инвестиционная компания против инвестиционного фонда",
    structureSubtitle:
      "Мы намеренно выбрали более простую структуру. Инвестиционная компания быстрее запускается, дешевле в эксплуатации и гораздо более гибкая, чем регулируемый фонд — ценой невозможности принимать публичных LP.",
    compareCols: { aspect: "Аспект", fund: "Инвест. фонд (BVI/Cayman)", company: "Инвест. компания (TAMS)" },
    compareRows: [
      { aspect: "Стоимость запуска", fund: "$80–150K", company: "$15–40K" },
      { aspect: "Время запуска", fund: "3–6 месяцев", company: "2–6 недель" },
      { aspect: "Годовой аудит/юридика", fund: "$60–100K", company: "$15–35K" },
      { aspect: "Структура инвесторов", fund: "GP + ограниченные партнёры", company: "Основатель + соинвесторы как акционеры" },
      { aspect: "Распределение прибыли", fund: "Mgmt fee + perf fee + LP returns", company: "Pro-rata по % equity" },
      { aspect: "Регуляторная нагрузка", fund: "Тяжёлая (KYC, аудит, отчётность регулятору)", company: "Стандартная корпоративная (легче)" },
      { aspect: "Подходит для", fund: "Открыто для десятков внешних LP", company: "Основатель + горстка соинвесторов" },
    ],
    structureFooter: "TAMS стартует как инвестиционная компания. Если когда-либо решим масштабироваться до десятков LP, можем выделить регулируемое фондовое транспортное средство позже. Текущая модель построена для небольшой согласованной группы владельцев.",

    poolsBadge: "Два пула капитала",
    poolsTitle: "Деньги инфраструктуры ≠ деньги инвестиций",
    poolsSubtitle: "Это два разных банковских счёта и две разные цели. Их смешение — самая распространённая ошибка. Деньги, привлечённые для одного, не могут финансировать другой.",
    pools: [
      { name: "Пул A · Капитал инфраструктуры", purpose: "Строит и управляет самой компанией.", sources: "Сбережения основателя + первый партнёр", usage: "Создание юр. лица · Fordefi · депозит хранилища · сайт · зарплаты · аудит · буфер на 12 месяцев", size: "$300–500K на запуск + $40K/месяц после", return: "Не генерирует доход сам по себе — расходуется", accent: "#5a8fd8" },
      { name: "Пул B · Инвестиционный капитал", purpose: "Фактический капитал, размещённый по 5 портфелям.", sources: "Основатель + первый партнёр + поздние соинвесторы", usage: "Хранилище физ. металлов · AltCoin 16 · торговая книга · DeFi кошелёк · резерв стейблкоинов", size: "Стартует с $1–3M, растёт со временем", return: "Генерирует доход — рост капитала + on-chain доходность", accent: "#d4a853" },
    ],
    poolsRule: "Золотое правило: деньги пула A никогда не входят в пул B. Доходы пула B могут пополнять пул A. Это разделение делает компанию аудит-чистой и инвестор-доверенной.",

    setupBadge: "Единовременные затраты на запуск",
    setupTitle: "Что нужно для запуска",
    setupSubtitle: "Реалистичные цифры на день открытия. Оплачиваются из seed-капитала основателя до входа любого внешнего партнёра.",
    setupCols: { item: "Статья", note: "Деталь", cost: "Стоимость" },
    setupRows: [
      { item: "Регистрация израильского ООО", note: "Гонорары юриста, регистрация, соглашение основателей", cost: "$5–10K" },
      { item: "Бухгалтерия + налоговая настройка", note: "Настройка CPA, onboarding бухгалтерской платформы", cost: "$2–5K" },
      { item: "Настройка custody", note: "Настройка Fordefi, KYC, начальная структура кошелька", cost: "$3–5K" },
      { item: "Контракт физ. хранилища", note: "Открытие счёта Malca-Amit, депозит", cost: "$2–5K" },
      { item: "Cold storage hardware", note: "Несколько устройств Ledger, защищённое резервное копирование", cost: "$1–3K" },
      { item: "Сайт + бренд", note: "Домен, дизайн, build (этот сайт)", cost: "$5–15K" },
      { item: "Операционный буфер · 12 месяцев", note: "Резерв наличных для финансирования OpEx без выручки", cost: "$300–500K" },
    ],
    setupTotalLabel: "Итого на запуск",
    setupTotal: "≈ $320–540K",

    opexBadge: "Годовые операционные расходы · Lean",
    opexTitle: "Сколько стоит управлять TAMS",
    opexSubtitle: "Построено для основателя + 2-3 коллабораторов. Реальные цены израильских поставщиков. Без раздувания.",
    opexCols: { item: "Статья", note: "Деталь", cost: "Год" },
    opexRows: [
      { item: "Команда", note: "Основатель + 2-3 (скромные зарплаты, equity-heavy)", cost: "$220–330K" },
      { item: "Fordefi · custody", note: "$8K/месяц институциональный MPC custody", cost: "$96K" },
      { item: "Технич. инфраструктура", note: "Exchange APIs, потоки данных, ПО, средства безопасности", cost: "$60K" },
      { item: "Физ. хранилище", note: "Хранение Malca-Amit + страховка + on-site аудит", cost: "$50K" },
      { item: "Юридика · аудит · комплаенс", note: "Годовой аудит, юр. retainer, KYC платформа", cost: "$80K" },
      { item: "Overhead", note: "Офис, поездки, маркетинг, конференции", cost: "$40K" },
    ],
    opexTotalLabel: "Итого OpEx в год",
    opexTotal: "≈ $550–650K",
    opexFooter: "Это то, что выходит из пула A каждый год. Финансируется доходами пула B, как только они превышают OpEx. До этого основатель + первый партнёр субсидируют.",

    partnerBadge: "Привлечение первого партнёра",
    partnerTitle: "Как соинвестор присоединяется к TAMS",
    partnerSubtitle: "Если вы привлекаете первого партнёра до запуска, он обычно вносит вклад в ОБА пула. Разделение между инфраструктурой и инвестицией определяет его долю equity и долю прибыли pro-rata.",
    partnerExamples: [
      { name: "Пример A · Партнёр-соучредитель", contributesInfra: "$200K", contributesInvest: "$300K", contributesTotal: "$500K", getsEquity: "30–40%", role: "Активный партнёр, ежедневно вовлечён, часто с титулом co-founder" },
      { name: "Пример B · Тихий соинвестор", contributesInfra: "$100K", contributesInvest: "$400K", contributesTotal: "$500K", getsEquity: "15–25%", role: "Пассивный акционер, без операционной роли" },
      { name: "Пример C · Чистый инвест. партнёр", contributesInfra: "$0", contributesInvest: "$500K", contributesTotal: "$500K", getsEquity: "8–15%", role: "Только инвестор — equity отражает только вклад в пул B" },
    ],
    partnerCols: { example: "Сценарий", infra: "Пул A · Инфраструктура", invest: "Пул B · Инвестиции", total: "Всего капитала", equity: "% Equity", role: "Роль" },
    partnerFooter: "Доли equity — стартовые точки, корректируемые переговорами, длительностью lock-up, местами в правлении, правами антиразмыва. Числа выше предполагают, что основатель сохраняет большинство, а партнёр остаётся минимум 4 года (vesting cliff).",

    scenariosBadge: "Сценарии прибыли и убытка",
    scenariosTitle: "Что зарабатывают основатель + партнёр — по годам",
    scenariosSubtitle: "Рабочий пример: основатель владеет 70%, партнёр — 30%. Пул A = $400K. Пул B стартует с $1M и растёт со временем. Доходы предполагают репрезентативный крипторынок (немного bull, немного bear).",
    scenariosCols: { year: "Год", aum: "Пул B (AUM)", marketYr: "Рынок", revenue: "Доходы", opex: "OpEx", profit: "Чистая прибыль", founder: "Основатель 70%", partner: "Партнёр 30%" },
    scenariosRows: [
      { year: "Год 1", aum: "$1M", marketYr: "Строительство", revenue: "$120K", opex: "$550K", profit: "−$430K", profitBad: true, founder: "−$301K", partner: "−$129K" },
      { year: "Год 2", aum: "$3M", marketYr: "+15%", revenue: "$450K", opex: "$600K", profit: "−$150K", profitBad: true, founder: "−$105K", partner: "−$45K" },
      { year: "Год 3", aum: "$8M", marketYr: "+22%", revenue: "$1,760K", opex: "$650K", profit: "+$1,110K", founder: "+$777K", founderGood: true, partner: "+$333K", partnerGood: true },
      { year: "Год 4", aum: "$20M", marketYr: "+50% bull", revenue: "$10,000K", opex: "$700K", profit: "+$9,300K", profitGood: true, founder: "+$6,510K", founderGreat: true, partner: "+$2,790K", partnerGreat: true },
      { year: "Год 5", aum: "$45M", marketYr: "+18%", revenue: "$8,100K", opex: "$750K", profit: "+$7,350K", profitGood: true, founder: "+$5,145K", founderGreat: true, partner: "+$2,205K", partnerGreat: true },
    ],
    scenariosFooter: "Совокупная прибыль за 5 лет: основатель ≈ $12.0M, партнёр ≈ $5.2M. Начальные инвестиции основателя ≈ $200K, партнёра = $500K. ROI: основатель 60×, партнёр 10×. Асимметрия реальна — большая часть upside идёт с года 3 и далее.",

    nextBadge: "Далее",
    nextTitle: "Постройте команду основателей",
    nextLede: "Когда найдёте правильного первого партнёра, расчёт выше — это разговор. Честные цифры, справедливый equity, согласованные стимулы. Сложная часть — найти человека. Структура решена.",
    nextCta: "Назад на публичный сайт",
  },
  es: {
    sections: [
      { id: "intro", label: "Resumen" },
      { id: "structure", label: "Estructura" },
      { id: "pools", label: "Dos pools de capital" },
      { id: "setup", label: "Costos de configuración" },
      { id: "opex", label: "Costo operativo" },
      { id: "partner", label: "Primer socio" },
      { id: "scenarios", label: "Escenarios P&L" },
      { id: "next", label: "Siguiente" },
    ],
    eyebrow: "Sala de fundadores · interno",
    heroTitle: "TAMS es una empresa de inversión — no un fondo",
    heroLede:
      "Una mirada clara a cómo se construye TAMS, qué cuesta lanzarla, dónde encaja el primer socio, y qué gana realmente el fundador. Sin teatro de gestión de fondos — solo una empresa que posee activos, genera retornos y comparte ganancias entre sus accionistas.",

    structureBadge: "Estructura legal",
    structureTitle: "Empresa de inversión vs. fondo de inversión",
    structureSubtitle:
      "Elegimos deliberadamente la estructura más simple. Una empresa de inversión es más rápida de lanzar, más barata de operar y mucho más flexible que un fondo regulado — al costo de no poder aceptar LPs públicos.",
    compareCols: { aspect: "Aspecto", fund: "Fondo (BVI/Cayman)", company: "Empresa (TAMS)" },
    compareRows: [
      { aspect: "Costo de configuración", fund: "$80–150K", company: "$15–40K" },
      { aspect: "Tiempo de configuración", fund: "3–6 meses", company: "2–6 semanas" },
      { aspect: "Auditoría/legal anual", fund: "$60–100K", company: "$15–35K" },
      { aspect: "Estructura de inversores", fund: "GP + socios limitados", company: "Fundador + co-inversores como accionistas" },
      { aspect: "Distribución de ganancias", fund: "Mgmt fee + perf fee + LP returns", company: "Pro-rata según % equity" },
      { aspect: "Carga regulatoria", fund: "Pesada (KYC, auditoría, reportes regulador)", company: "Corporativa estándar (más liviana)" },
      { aspect: "Mejor para", fund: "Abierto a decenas de LPs externos", company: "Fundador + puñado de co-inversores" },
    ],
    structureFooter: "TAMS comienza como empresa de inversión. Si alguna vez elegimos escalar a docenas de LPs podemos separar un vehículo de fondo regulado más adelante. El modelo actual está construido para un grupo de propiedad pequeño y alineado.",

    poolsBadge: "Dos pools de capital",
    poolsTitle: "Dinero de infraestructura ≠ dinero de inversión",
    poolsSubtitle: "Estas son dos cuentas bancarias diferentes y dos propósitos diferentes. Confundirlas es el error más común. El dinero recaudado para uno no puede financiar el otro.",
    pools: [
      { name: "Pool A · Capital de infraestructura", purpose: "Construye y opera la empresa misma.", sources: "Ahorros del fundador + primer socio", usage: "Configuración entidad legal · Fordefi · depósito bóveda · sitio web · salarios · auditoría · buffer 12 meses", size: "$300–500K para lanzar + $40K/mes después", return: "No genera retorno por sí mismo — se consume", accent: "#5a8fd8" },
      { name: "Pool B · Capital de inversión", purpose: "El capital real desplegado en los 5 portafolios.", sources: "Fundador + primer socio + co-inversores posteriores", usage: "Bóveda metales físicos · AltCoin 16 · libro de trading · cartera DeFi · reserva stablecoin", size: "Comienza en $1–3M, crece con el tiempo", return: "Genera retornos — apreciación de capital + rendimiento on-chain", accent: "#d4a853" },
    ],
    poolsRule: "Regla de oro: el dinero del Pool A nunca entra al Pool B. Los retornos del Pool B pueden reabastecer el Pool A. Esta separación es lo que hace a la empresa limpia para auditoría y creíble para inversores.",

    setupBadge: "Costo de configuración único",
    setupTitle: "Lo que se necesita para lanzar",
    setupSubtitle: "Números realistas para el día de apertura. Pagados del capital seed del fundador antes de que entre cualquier socio externo.",
    setupCols: { item: "Concepto", note: "Detalle", cost: "Costo" },
    setupRows: [
      { item: "Formación empresa Ltd israelí", note: "Honorarios abogado, registro, acuerdo fundadores", cost: "$5–10K" },
      { item: "Configuración contable + fiscal", note: "Configuración CPA, onboarding plataforma contable", cost: "$2–5K" },
      { item: "Configuración custody", note: "Configuración Fordefi, KYC, estructura inicial cartera", cost: "$3–5K" },
      { item: "Contrato bóveda física", note: "Apertura cuenta Malca-Amit, depósito", cost: "$2–5K" },
      { item: "Hardware cold storage", note: "Múltiples dispositivos Ledger, respaldo seguro", cost: "$1–3K" },
      { item: "Sitio web + marca", note: "Dominio, diseño, build (este sitio)", cost: "$5–15K" },
      { item: "Buffer operativo · 12 meses", note: "Reserva efectivo para financiar OpEx sin ingresos", cost: "$300–500K" },
    ],
    setupTotalLabel: "Total para lanzar",
    setupTotal: "≈ $320–540K",

    opexBadge: "Costo operativo anual · Modo Lean",
    opexTitle: "Lo que cuesta operar TAMS",
    opexSubtitle: "Construido para fundador + 2-3 colaboradores. Precios reales de proveedores israelíes. Sin hinchazón.",
    opexCols: { item: "Concepto", note: "Detalle", cost: "Anual" },
    opexRows: [
      { item: "Equipo", note: "Fundador + 2-3 (salarios modestos, equity-heavy)", cost: "$220–330K" },
      { item: "Fordefi · custody", note: "$8K/mes MPC custody institucional", cost: "$96K" },
      { item: "Infraestructura técnica", note: "Exchange APIs, feeds datos, software, herramientas seguridad", cost: "$60K" },
      { item: "Bóveda física", note: "Almacenamiento Malca-Amit + seguro + auditoría on-site", cost: "$50K" },
      { item: "Legal · auditoría · cumplimiento", note: "Auditoría anual, retainer legal, plataforma KYC", cost: "$80K" },
      { item: "Overhead", note: "Oficina, viajes, marketing, conferencias", cost: "$40K" },
    ],
    opexTotalLabel: "OpEx anual total",
    opexTotal: "≈ $550–650K",
    opexFooter: "Esto es lo que sale del Pool A cada año. Se financia con retornos del Pool B una vez que excedan OpEx. Hasta entonces, el fundador + primer socio subsidian.",

    partnerBadge: "Trayendo el primer socio",
    partnerTitle: "Cómo se une un co-inversor a TAMS",
    partnerSubtitle: "Si traes un primer socio antes del lanzamiento, típicamente contribuye a AMBOS pools. La división entre infraestructura e inversión determina su participación equity y su parte de ganancias pro-rata.",
    partnerExamples: [
      { name: "Ejemplo A · Socio co-fundador", contributesInfra: "$200K", contributesInvest: "$300K", contributesTotal: "$500K", getsEquity: "30–40%", role: "Socio activo, involucrado día a día, a menudo con título co-founder" },
      { name: "Ejemplo B · Co-inversor silencioso", contributesInfra: "$100K", contributesInvest: "$400K", contributesTotal: "$500K", getsEquity: "15–25%", role: "Accionista pasivo, sin rol operativo" },
      { name: "Ejemplo C · Socio puramente inversor", contributesInfra: "$0", contributesInvest: "$500K", contributesTotal: "$500K", getsEquity: "8–15%", role: "Solo inversor — equity refleja solo contribución al Pool B" },
    ],
    partnerCols: { example: "Escenario", infra: "Pool A · Infraestructura", invest: "Pool B · Inversión", total: "Capital total", equity: "% Equity", role: "Rol" },
    partnerFooter: "Las participaciones equity son puntos de partida — ajustadas por negociación, duración del lock-up, asientos en directorio, derechos anti-dilución. Los números arriba asumen que el fundador retiene mayoría y el socio se queda al menos 4 años (vesting cliff).",

    scenariosBadge: "Escenarios de ganancia y pérdida",
    scenariosTitle: "Lo que ganan fundador + socio — por año",
    scenariosSubtitle: "Ejemplo trabajado: fundador posee 70%, socio posee 30%. Pool A = $400K. Pool B comienza en $1M, crece con el tiempo. Retornos asumen un mercado cripto representativo (algo bull, algo bear).",
    scenariosCols: { year: "Año", aum: "Pool B (AUM)", marketYr: "Mercado", revenue: "Retornos", opex: "OpEx", profit: "Ganancia neta", founder: "Fundador 70%", partner: "Socio 30%" },
    scenariosRows: [
      { year: "Año 1", aum: "$1M", marketYr: "Construyendo", revenue: "$120K", opex: "$550K", profit: "−$430K", profitBad: true, founder: "−$301K", partner: "−$129K" },
      { year: "Año 2", aum: "$3M", marketYr: "+15%", revenue: "$450K", opex: "$600K", profit: "−$150K", profitBad: true, founder: "−$105K", partner: "−$45K" },
      { year: "Año 3", aum: "$8M", marketYr: "+22%", revenue: "$1,760K", opex: "$650K", profit: "+$1,110K", founder: "+$777K", founderGood: true, partner: "+$333K", partnerGood: true },
      { year: "Año 4", aum: "$20M", marketYr: "+50% bull", revenue: "$10,000K", opex: "$700K", profit: "+$9,300K", profitGood: true, founder: "+$6,510K", founderGreat: true, partner: "+$2,790K", partnerGreat: true },
      { year: "Año 5", aum: "$45M", marketYr: "+18%", revenue: "$8,100K", opex: "$750K", profit: "+$7,350K", profitGood: true, founder: "+$5,145K", founderGreat: true, partner: "+$2,205K", partnerGreat: true },
    ],
    scenariosFooter: "Ganancia acumulada 5 años: fundador ≈ $12.0M, socio ≈ $5.2M. Inversión inicial del fundador ≈ $200K, del socio = $500K. ROI: fundador 60×, socio 10×. La asimetría es real — la mayoría del upside viene del año 3 en adelante.",

    nextBadge: "Siguiente",
    nextTitle: "Construye el equipo fundador",
    nextLede: "Cuando encuentres al primer socio correcto, el cálculo arriba es la conversación. Números honestos, equity justo, incentivos alineados. La parte difícil es encontrar a la persona — la estructura está resuelta.",
    nextCta: "Volver al sitio público",
  },
} as const;

const POOL_ICONS = [Wrench, Coins];

export default function FoundersPage() {
  const { language } = useLanguage();
  const t = TEXTS[language] || TEXTS.en;

  return (
    <div className="min-h-screen">
      <PageTableOfContents sections={[...t.sections]} />

      {/* Hero */}
      <section id="intro" className="relative min-h-[60vh] flex items-center justify-center px-6 py-20">
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
            className="heading-editorial text-[1.8rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] tracking-tight leading-[1.15] mb-7 text-white/97 [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]"
          >
            {t.heroTitle}
          </motion.h1>
          <div className="hairline-gold w-24 mx-auto mb-7 opacity-70" />
          <p className="text-[15px] sm:text-base lg:text-lg text-zinc-200/90 max-w-3xl mx-auto leading-[1.7] font-light">
            {t.heroLede}
          </p>
        </div>
      </section>

      {/* Structure comparison */}
      <section id="structure" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <SectionHeader badge={t.structureBadge} title={t.structureTitle} subtitle={t.structureSubtitle} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-tier-1 p-4 sm:p-6 mt-10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-500/[0.18]">
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.compareCols.aspect}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-zinc-400 font-semibold">{t.compareCols.fund}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300 font-semibold">{t.compareCols.company} ✓</th>
                </tr>
              </thead>
              <tbody>
                {t.compareRows.map((row) => (
                  <tr key={row.aspect} className="border-b border-amber-500/[0.06]">
                    <td className="py-3 px-3 text-white font-medium">{row.aspect}</td>
                    <td className="py-3 px-3 text-zinc-500">{row.fund}</td>
                    <td className="py-3 px-3 text-zinc-200 font-medium">{row.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        <p className="text-[12px] text-amber-300/75 max-w-3xl mx-auto leading-relaxed font-light text-center mt-6">{t.structureFooter}</p>
      </section>

      {/* Two capital pools */}
      <section id="pools" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader badge={t.poolsBadge} title={t.poolsTitle} subtitle={t.poolsSubtitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          {t.pools.map((pool, i) => {
            const Icon = POOL_ICONS[i];
            return (
              <motion.div
                key={pool.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="surface-tier-1 p-6 sm:p-7 relative"
                style={{ borderColor: `${pool.accent}45` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="size-12 rounded-xl flex items-center justify-center shrink-0 border" style={{ background: `${pool.accent}15`, borderColor: `${pool.accent}40` }}>
                    <Icon className="size-6" style={{ color: pool.accent }} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white leading-tight">{pool.name}</h3>
                    <p className="text-sm text-zinc-300 mt-1 font-light leading-relaxed">{pool.purpose}</p>
                  </div>
                </div>
                <dl className="space-y-3 text-xs sm:text-[13px]">
                  <div>
                    <dt className="text-[9px] tracking-[0.22em] uppercase text-zinc-500 font-semibold mb-1">Sources</dt>
                    <dd className="text-zinc-300">{pool.sources}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] tracking-[0.22em] uppercase text-zinc-500 font-semibold mb-1">Usage</dt>
                    <dd className="text-zinc-300 leading-relaxed">{pool.usage}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] tracking-[0.22em] uppercase text-zinc-500 font-semibold mb-1">Size</dt>
                    <dd className="font-bold tabular-nums" style={{ color: pool.accent }}>{pool.size}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] tracking-[0.22em] uppercase text-zinc-500 font-semibold mb-1">Return</dt>
                    <dd className="text-zinc-400">{pool.return}</dd>
                  </div>
                </dl>
                <span className="monogram-watermark" aria-hidden="true">T</span>
              </motion.div>
            );
          })}
        </div>
        <div className="surface-tier-1 mt-6 p-5 max-w-3xl mx-auto text-center">
          <div className="text-[10px] tracking-[0.32em] uppercase text-amber-300/70 font-semibold mb-2">⚖ Golden Rule</div>
          <p className="text-sm text-zinc-200 leading-relaxed">{t.poolsRule}</p>
        </div>
      </section>

      {/* Setup costs */}
      <section id="setup" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <SectionHeader badge={t.setupBadge} title={t.setupTitle} subtitle={t.setupSubtitle} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-tier-1 p-4 sm:p-6 mt-10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-500/[0.18]">
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.setupCols.item}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold hidden sm:table-cell">{t.setupCols.note}</th>
                  <th className="text-right py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.setupCols.cost}</th>
                </tr>
              </thead>
              <tbody>
                {t.setupRows.map((row) => (
                  <tr key={row.item} className="border-b border-amber-500/[0.06]">
                    <td className="py-3 px-3 text-white font-medium">{row.item}</td>
                    <td className="py-3 px-3 text-zinc-500 text-xs hidden sm:table-cell">{row.note}</td>
                    <td className="py-3 px-3 text-right text-amber-300 tabular-nums font-semibold">{row.cost}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-amber-500/30">
                  <td colSpan={2} className="py-4 px-3 text-white font-bold">{t.setupTotalLabel}</td>
                  <td className="py-4 px-3 text-right text-amber-300 tabular-nums font-bold text-base">{t.setupTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* OpEx */}
      <section id="opex" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <SectionHeader badge={t.opexBadge} title={t.opexTitle} subtitle={t.opexSubtitle} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-tier-1 p-4 sm:p-6 mt-10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-500/[0.18]">
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.opexCols.item}</th>
                  <th className="text-left py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold hidden sm:table-cell">{t.opexCols.note}</th>
                  <th className="text-right py-3 px-3 text-[10px] tracking-[0.22em] uppercase text-amber-300/70 font-semibold">{t.opexCols.cost}</th>
                </tr>
              </thead>
              <tbody>
                {t.opexRows.map((row) => (
                  <tr key={row.item} className="border-b border-amber-500/[0.06]">
                    <td className="py-3 px-3 text-white font-medium">{row.item}</td>
                    <td className="py-3 px-3 text-zinc-500 text-xs hidden sm:table-cell">{row.note}</td>
                    <td className="py-3 px-3 text-right text-amber-300 tabular-nums font-semibold">{row.cost}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-amber-500/30">
                  <td colSpan={2} className="py-4 px-3 text-white font-bold">{t.opexTotalLabel}</td>
                  <td className="py-4 px-3 text-right text-amber-300 tabular-nums font-bold text-base">{t.opexTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed font-light">
            {t.opexFooter}
            <Footnote n={1} source="Fordefi institutional MPC custody pricing" date="Apr 2026" url="https://www.fordefi.com" />
          </p>
        </motion.div>
      </section>

      {/* First partner */}
      <section id="partner" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader badge={t.partnerBadge} title={t.partnerTitle} subtitle={t.partnerSubtitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {t.partnerExamples.map((ex, i) => (
            <motion.div
              key={ex.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="surface-tier-2 p-6 relative"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="size-10 rounded-xl bg-amber-500/[0.10] border border-amber-500/25 flex items-center justify-center shrink-0">
                  <Users className="size-5 text-amber-400" />
                </div>
                <h4 className="text-base font-semibold text-white leading-snug">{ex.name}</h4>
              </div>
              <dl className="space-y-2.5 text-xs">
                <div className="flex justify-between gap-3 pb-1.5 border-b border-amber-500/[0.08]">
                  <dt className="text-zinc-500">{t.partnerCols.infra}</dt>
                  <dd className="text-blue-300 tabular-nums font-semibold">{ex.contributesInfra}</dd>
                </div>
                <div className="flex justify-between gap-3 pb-1.5 border-b border-amber-500/[0.08]">
                  <dt className="text-zinc-500">{t.partnerCols.invest}</dt>
                  <dd className="text-amber-300 tabular-nums font-semibold">{ex.contributesInvest}</dd>
                </div>
                <div className="flex justify-between gap-3 pb-1.5 border-b border-amber-500/[0.08]">
                  <dt className="text-zinc-500">{t.partnerCols.total}</dt>
                  <dd className="text-white tabular-nums font-bold">{ex.contributesTotal}</dd>
                </div>
                <div className="flex justify-between gap-3 pb-1.5 border-b border-amber-500/[0.08]">
                  <dt className="text-zinc-500">{t.partnerCols.equity}</dt>
                  <dd className="text-emerald-300 tabular-nums font-bold">{ex.getsEquity}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-zinc-500 mb-1">{t.partnerCols.role}</dt>
                  <dd className="text-zinc-300 leading-relaxed">{ex.role}</dd>
                </div>
              </dl>
              <span className="monogram-watermark" aria-hidden="true">T</span>
            </motion.div>
          ))}
        </div>
        <p className="text-[12px] text-amber-300/75 mt-8 max-w-3xl mx-auto leading-relaxed font-light text-center">{t.partnerFooter}</p>
      </section>

      {/* P&L scenarios */}
      <section id="scenarios" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader badge={t.scenariosBadge} title={t.scenariosTitle} subtitle={t.scenariosSubtitle} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="surface-tier-1 p-4 sm:p-6 mt-10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-amber-500/[0.18]">
                  <th className="text-left py-3 px-2 text-[9px] tracking-[0.18em] uppercase text-amber-300/70 font-semibold">{t.scenariosCols.year}</th>
                  <th className="text-left py-3 px-2 text-[9px] tracking-[0.18em] uppercase text-amber-300/70 font-semibold">{t.scenariosCols.aum}</th>
                  <th className="text-left py-3 px-2 text-[9px] tracking-[0.18em] uppercase text-amber-300/70 font-semibold hidden sm:table-cell">{t.scenariosCols.marketYr}</th>
                  <th className="text-right py-3 px-2 text-[9px] tracking-[0.18em] uppercase text-amber-300/70 font-semibold">{t.scenariosCols.revenue}</th>
                  <th className="text-right py-3 px-2 text-[9px] tracking-[0.18em] uppercase text-amber-300/70 font-semibold hidden sm:table-cell">{t.scenariosCols.opex}</th>
                  <th className="text-right py-3 px-2 text-[9px] tracking-[0.18em] uppercase text-amber-300/70 font-semibold">{t.scenariosCols.profit}</th>
                  <th className="text-right py-3 px-2 text-[9px] tracking-[0.18em] uppercase text-emerald-300/70 font-semibold">{t.scenariosCols.founder}</th>
                  <th className="text-right py-3 px-2 text-[9px] tracking-[0.18em] uppercase text-blue-300/70 font-semibold">{t.scenariosCols.partner}</th>
                </tr>
              </thead>
              <tbody>
                {t.scenariosRows.map((rowRaw) => {
                  const row = rowRaw as typeof rowRaw & {
                    profitBad?: boolean; profitGood?: boolean;
                    founderGood?: boolean; founderGreat?: boolean;
                    partnerGood?: boolean; partnerGreat?: boolean;
                  };
                  return (
                    <tr key={row.year} className="border-b border-amber-500/[0.06]">
                      <td className="py-3 px-2 text-white font-bold">{row.year}</td>
                      <td className="py-3 px-2 text-zinc-300 tabular-nums">{row.aum}</td>
                      <td className="py-3 px-2 text-zinc-400 tabular-nums hidden sm:table-cell">{row.marketYr}</td>
                      <td className="py-3 px-2 text-right text-zinc-300 tabular-nums">{row.revenue}</td>
                      <td className="py-3 px-2 text-right text-zinc-500 tabular-nums hidden sm:table-cell">{row.opex}</td>
                      <td className={`py-3 px-2 text-right tabular-nums font-semibold ${row.profitBad ? "text-rose-400/85" : row.profitGood ? "text-emerald-400" : "text-amber-300"}`}>{row.profit}</td>
                      <td className={`py-3 px-2 text-right tabular-nums font-semibold ${row.founderGreat ? "text-emerald-400" : row.founderGood ? "text-emerald-400/85" : "text-rose-400/70"}`}>{row.founder}</td>
                      <td className={`py-3 px-2 text-right tabular-nums font-semibold ${row.partnerGreat ? "text-blue-300" : row.partnerGood ? "text-blue-300/85" : "text-rose-400/70"}`}>{row.partner}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-amber-300/85 mt-4 leading-relaxed font-medium">{t.scenariosFooter}</p>
        </motion.div>
      </section>

      {/* Next CTA */}
      <section id="next" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="surface-tier-2 p-10 sm:p-14"
        >
          <div className="text-[10px] tracking-[0.42em] uppercase text-amber-300/85 font-semibold mb-5">{t.nextBadge}</div>
          <h3 className="heading-editorial text-2xl sm:text-3xl text-white mb-5 leading-tight">{t.nextTitle}</h3>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto mb-10">{t.nextLede}</p>
          <Link href="/">
            <button className="inline-flex items-center gap-2.5 bg-amber-500/95 hover:bg-amber-400 text-zinc-950 px-7 py-3.5 rounded-lg text-[13px] tracking-[0.14em] uppercase font-semibold transition-colors duration-300 shadow-[0_8px_24px_-8px_rgba(212,168,83,0.45)]">
              {t.nextCta}
              <ArrowRight className="size-4" />
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

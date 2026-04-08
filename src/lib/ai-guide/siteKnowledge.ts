// מערכת ידע מובנית — מפת האתר המלאה של TAMS למדריך המשקיעים
// נבנה מתוך כל העמודים, הסעיפים, הכרטיסים והתוכן באתר

export interface PageKnowledge {
  route: string;
  name: string;
  nameHe: string;
  purpose: string;
  purposeHe: string;
  investorTakeaway: string;
  investorTakeawayHe: string;
  sections: SectionKnowledge[];
  relatedPages: string[];
  suggestedNext: string[];
  category: PageCategory;
  keywords: string[];
}

export interface SectionKnowledge {
  id: string;
  title: string;
  titleHe: string;
  meaning: string;
  meaningHe: string;
  keyPoints: string[];
  keyPointsHe: string[];
}

export type PageCategory =
  | "overview"
  | "infrastructure"
  | "portfolio"
  | "strategy"
  | "evidence"
  | "investor"
  | "information"
  | "dashboard";

// === כל העמודים באתר ===

export const sitePages: PageKnowledge[] = [
  // ─── דף הבית ───
  {
    route: "/",
    name: "Home",
    nameHe: "דף הבית",
    purpose:
      "The main landing page introducing TAMS as an institutional-grade blockchain investment infrastructure. Presents the core thesis, vision, investor tiers, and key call-to-actions.",
    purposeHe:
      "דף הנחיתה הראשי שמציג את TAMS כתשתית השקעות בלוקצ'יין ברמה מוסדית. מציג את התזה המרכזית, החזון, דרגות המשקיעים וקריאות לפעולה.",
    investorTakeaway:
      "TAMS is a multi-strategy digital asset fund combining long-term holdings, active trading, and DeFi yield — built for institutional standards with 4 investor tiers from $10K to $1M+.",
    investorTakeawayHe:
      "TAMS היא קרן נכסים דיגיטליים רב-אסטרטגית המשלבת החזקות ארוכות טווח, מסחר אקטיבי ותשואות DeFi — בנויה לסטנדרטים מוסדיים עם 4 דרגות משקיעים מ-$10K עד $1M+.",
    sections: [
      {
        id: "hero",
        title: "Hero",
        titleHe: "כותרת ראשית",
        meaning: "The opening statement introducing TAMS's mission and value proposition.",
        meaningHe: "ההצהרה הפותחת שמציגה את המשימה וערך המוצע של TAMS.",
        keyPoints: [
          "Institutional-grade blockchain investment infrastructure",
          "259 verified evidence items across 16 assets",
          "Conservative research, institutional classification, full transparency",
        ],
        keyPointsHe: [
          "תשתית השקעות בלוקצ'יין ברמה מוסדית",
          "259 ראיות מאומתות על פני 16 נכסים",
          "מחקר שמרני, סיווג מוסדי, שקיפות מלאה",
        ],
      },
      {
        id: "thesis",
        title: "Thesis Cards",
        titleHe: "כרטיסי תזה",
        meaning: "Six core pillars of the TAMS investment strategy.",
        meaningHe: "ששת עמודי התווך של אסטרטגיית ההשקעה של TAMS.",
        keyPoints: [
          "Long-Term Holdings Strategy — treasury appreciation through quality assets",
          "Trading & Tactical Opportunities — active position management",
          "DeFi Yield Generation — protocol-based returns (4-12% target APY)",
          "Multi-Wallet Infrastructure — institutional fund structure with 4 wallet divisions",
          "Research-Driven Analysis — evidence-based asset selection",
          "Institutional-Grade Security — Ledger + multi-sig custody",
        ],
        keyPointsHe: [
          "אסטרטגיית החזקות ארוכות טווח — ייסוף הון דרך נכסים איכותיים",
          "מסחר והזדמנויות טקטיות — ניהול פוזיציות אקטיבי",
          "יצירת תשואות DeFi — תשואות מבוססות פרוטוקול (יעד 4-12% APY)",
          "תשתית ארנקים מרובים — מבנה קרן מוסדי עם 4 חלוקות ארנק",
          "ניתוח מבוסס מחקר — בחירת נכסים מבוססת ראיות",
          "אבטחה ברמה מוסדית — Ledger + משמורת multi-sig",
        ],
      },
      {
        id: "vision",
        title: "Vision",
        titleHe: "חזון",
        meaning: "The long-term vision of blockchain infrastructure, investor-first approach, and global access.",
        meaningHe: "החזון ארוך הטווח של תשתית בלוקצ'יין, גישה ממוקדת משקיע ופלטפורמה גלובלית.",
        keyPoints: [
          "Blockchain Infrastructure Future — betting on infrastructure, not speculation",
          "Investor-First Approach — transparency, communication, and institutional discipline",
          "Global Access Platform — enabling worldwide institutional access to digital assets",
        ],
        keyPointsHe: [
          "עתיד תשתית בלוקצ'יין — מהמור על תשתית, לא ספקולציה",
          "גישה ממוקדת משקיע — שקיפות, תקשורת ומשמעת מוסדית",
          "פלטפורמה לגישה גלובלית — מאפשרת גישה מוסדית עולמית לנכסים דיגיטליים",
        ],
      },
      {
        id: "tiers",
        title: "Investor Tiers",
        titleHe: "דרגות משקיעים",
        meaning: "Four-tier investor program with escalating access and benefits.",
        meaningHe: "תוכנית משקיעים בארבע דרגות עם גישה והטבות עולות.",
        keyPoints: [
          "Explorer: $10,000 — community access, monthly reports",
          "Builder: $50,000 — weekly briefings, priority access",
          "Architect: $250,000 — personalized reviews, strategic advisory",
          "Visionary: $1,000,000 — governance participation, board observer rights",
        ],
        keyPointsHe: [
          "Explorer: $10,000 — גישה לקהילה, דוחות חודשיים",
          "Builder: $50,000 — תדריכים שבועיים, גישה בעדיפות",
          "Architect: $250,000 — סקירות מותאמות אישית, ייעוץ אסטרטגי",
          "Visionary: $1,000,000 — השתתפות בממשל, זכויות צפייה בדירקטוריון",
        ],
      },
    ],
    relatedPages: ["/company", "/strategy", "/proof"],
    suggestedNext: ["/company", "/strategy", "/proof"],
    category: "overview",
    keywords: [
      "home", "main", "landing", "thesis", "vision", "tiers", "overview",
      "בית", "ראשי", "תזה", "חזון", "דרגות", "סקירה",
    ],
  },

  // ─── חברה ───
  {
    route: "/company",
    name: "Company",
    nameHe: "חברה",
    purpose:
      "Presents the company's vision, mission, core principles, operating process, partnership structure, and operating model.",
    purposeHe:
      "מציג את החזון, המשימה, העקרונות המרכזיים, תהליך הפעולה, מבנה השותפות ומודל התפעול של החברה.",
    investorTakeaway:
      "TAMS operates with institutional discipline — research-driven analysis, risk-first management, and a GP/LP partnership structure with Fordefi platform and Ledger Flex custody.",
    investorTakeawayHe:
      "TAMS פועלת עם משמעת מוסדית — ניתוח מבוסס מחקר, ניהול סיכונים ראשוני, ומבנה שותפות GP/LP עם פלטפורמת Fordefi ומשמורת Ledger Flex.",
    sections: [
      {
        id: "vision-mission",
        title: "Vision & Mission",
        titleHe: "חזון ומשימה",
        meaning: "The core identity and purpose of TAMS.",
        meaningHe: "הזהות המרכזית והייעוד של TAMS.",
        keyPoints: [
          "Vision: Build the leading institutional blockchain investment infrastructure",
          "Mission: Provide professional infrastructure for digital asset management",
          "Bridging crypto with capital markets standards",
        ],
        keyPointsHe: [
          "חזון: בניית תשתית ההשקעות המובילה בבלוקצ'יין למוסדיים",
          "משימה: מתן תשתית מקצועית לניהול נכסים דיגיטליים",
          "גישור בין קריפטו לסטנדרטים של שוק ההון",
        ],
      },
      {
        id: "principles",
        title: "Core Principles",
        titleHe: "עקרונות מרכזיים",
        meaning: "Four guiding principles that drive all investment decisions.",
        meaningHe: "ארבעה עקרונות מנחים שמובילים את כל החלטות ההשקעה.",
        keyPoints: [
          "Research-Driven Analysis",
          "Risk-First Management",
          "Institutional Discipline",
          "Transparency & Communication",
        ],
        keyPointsHe: [
          "ניתוח מבוסס מחקר",
          "ניהול סיכונים ראשוני",
          "משמעת מוסדית",
          "שקיפות ותקשורת",
        ],
      },
      {
        id: "process",
        title: "Operating Process",
        titleHe: "תהליך תפעולי",
        meaning: "Four-step process: Identify, Evaluate, Allocate, Execute.",
        meaningHe: "תהליך בן ארבעה שלבים: זיהוי, הערכה, הקצאה, ביצוע.",
        keyPoints: [
          "Identify — asset selection based on thesis",
          "Evaluate — opportunity assessment",
          "Allocate — portfolio positioning",
          "Execute — multi-strategy implementation",
        ],
        keyPointsHe: [
          "זיהוי — בחירת נכסים לפי תזה",
          "הערכה — הערכת הזדמנויות",
          "הקצאה — מיקום בתיק",
          "ביצוע — יישום רב-אסטרטגי",
        ],
      },
      {
        id: "partnership",
        title: "Partnership Structure",
        titleHe: "מבנה שותפות",
        meaning: "GP/LP fund structure with institutional custody partners.",
        meaningHe: "מבנה קרן GP/LP עם שותפי משמורת מוסדיים.",
        keyPoints: [
          "GP (General Partner) — fund manager",
          "LP (Limited Partners) — investors",
          "Fordefi Platform — institutional-grade management",
          "Ledger Flex — digital asset custody",
        ],
        keyPointsHe: [
          "GP (שותף כללי) — מנהל הקרן",
          "LP (שותפים מוגבלים) — משקיעים",
          "פלטפורמת Fordefi — ניהול ברמה מוסדית",
          "Ledger Flex — משמורת נכסים דיגיטליים",
        ],
      },
      {
        id: "operating-model",
        title: "Operating Model",
        titleHe: "מודל תפעול",
        meaning: "How the fund allocates its operational focus across 4 divisions.",
        meaningHe: "כיצד הקרן מקצה את המיקוד התפעולי שלה ב-4 חטיבות.",
        keyPoints: [
          "Custody 50% — Ledger + Multi-Sig",
          "Risk Management 20% — weekly monitoring",
          "Staking/Lending 20% — yield generation",
          "Governance 10% — multi-sig control & reporting",
        ],
        keyPointsHe: [
          "משמורת 50% — Ledger + Multi-Sig",
          "ניהול סיכונים 20% — ניטור שבועי",
          "סטייקינג/הלוואות 20% — יצירת תשואה",
          "ממשל 10% — בקרת multi-sig ודיווח",
        ],
      },
    ],
    relatedPages: ["/", "/team", "/strategy"],
    suggestedNext: ["/architecture", "/strategy"],
    category: "overview",
    keywords: [
      "company", "about", "vision", "mission", "principles", "partnership", "GP", "LP", "operating",
      "חברה", "אודות", "חזון", "משימה", "עקרונות", "שותפות",
    ],
  },

  // ─── ארכיטקטורה ───
  {
    route: "/architecture",
    name: "Architecture",
    nameHe: "ארכיטקטורה",
    purpose:
      "Shows the wallet infrastructure, capital flow design, and detailed portfolio allocation across asset categories.",
    purposeHe:
      "מציג את תשתית הארנקים, עיצוב זרימת ההון והקצאת תיק מפורטת על פני קטגוריות נכסים.",
    investorTakeaway:
      "The fund uses a 4-wallet architecture: Long-Term Holdings (40%), Active Trading (25%), DeFi Yield (25%), Operations (10%). Portfolio split: 32% precious metals, 68% digital assets across 7 categories.",
    investorTakeawayHe:
      "הקרן משתמשת בארכיטקטורת 4 ארנקים: החזקות ארוכות טווח (40%), מסחר אקטיבי (25%), תשואות DeFi (25%), תפעול (10%). חלוקת תיק: 32% מתכות יקרות, 68% נכסים דיגיטליים ב-7 קטגוריות.",
    sections: [
      {
        id: "wallet-hierarchy",
        title: "Wallet Architecture",
        titleHe: "ארכיטקטורת ארנקים",
        meaning: "Shows the master wallet and 4 sub-wallets that separate fund functions.",
        meaningHe: "מציג את ארנק המאסטר ו-4 תת-ארנקים שמפרידים בין פונקציות הקרן.",
        keyPoints: [
          "Master Wallet — TAMS allocation controller",
          "Long-Term Holdings — treasury strategy (40%)",
          "Active Trading — tactical positions (25%)",
          "DeFi Yield — protocol integration (25%)",
          "Operations — gas reserves, buffers (10%)",
        ],
        keyPointsHe: [
          "ארנק מאסטר — בקר הקצאות TAMS",
          "החזקות ארוכות טווח — אסטרטגיית אוצר (40%)",
          "מסחר אקטיבי — פוזיציות טקטיות (25%)",
          "תשואות DeFi — אינטגרציית פרוטוקולים (25%)",
          "תפעול — רזרבות gas, מאגרים (10%)",
        ],
      },
      {
        id: "capital-flow",
        title: "Capital Flow",
        titleHe: "זרימת הון",
        meaning: "Visualizes how capital moves between wallet divisions.",
        meaningHe: "ממחיש כיצד ההון זורם בין חטיבות הארנקים.",
        keyPoints: ["Fund allocation across 4 wallet divisions with dynamic rebalancing"],
        keyPointsHe: ["הקצאת קרן על פני 4 חטיבות ארנק עם איזון מחדש דינמי"],
      },
      {
        id: "portfolio-allocation",
        title: "Portfolio Allocation",
        titleHe: "הקצאת תיק",
        meaning: "Detailed breakdown of how assets are distributed by sector.",
        meaningHe: "פירוט מפורט של כיצד הנכסים מחולקים לפי סקטור.",
        keyPoints: [
          "Safe Assets: 32% — gold, silver, copper",
          "Payments & Routing: 27%",
          "Smart Contracts: 36%",
          "Data & Connectivity: 14%",
          "Scaling Solutions: 7%",
          "Storage & Data: 7%",
          "DeFi Protocols: 14%",
          "Privacy/Identity: 5%",
        ],
        keyPointsHe: [
          "נכסים בטוחים: 32% — זהב, כסף, נחושת",
          "תשלומים וניתוב: 27%",
          "חוזים חכמים: 36%",
          "נתונים וקישוריות: 14%",
          "פתרונות סקלביליות: 7%",
          "אחסון ונתונים: 7%",
          "פרוטוקולי DeFi: 14%",
          "פרטיות/זהות: 5%",
        ],
      },
    ],
    relatedPages: ["/holdings", "/defi", "/strategy"],
    suggestedNext: ["/holdings", "/defi"],
    category: "infrastructure",
    keywords: [
      "architecture", "wallet", "infrastructure", "allocation", "capital", "flow", "portfolio",
      "ארכיטקטורה", "ארנק", "תשתית", "הקצאה", "הון", "תיק",
    ],
  },

  // ─── החזקות ───
  {
    route: "/holdings",
    name: "Holdings",
    nameHe: "החזקות",
    purpose:
      "Displays all 16 research-backed assets in the portfolio with detailed analysis, thesis alignment, and institutional adoption evidence.",
    purposeHe:
      "מציג את כל 16 הנכסים מגובי המחקר בתיק עם ניתוח מפורט, התאמת תזה וראיות אימוץ מוסדי.",
    investorTakeaway:
      "The portfolio holds 16 carefully selected assets across 6 investment verticals, each backed by research and institutional evidence. Every asset has a clear thesis for why it belongs.",
    investorTakeawayHe:
      "התיק מחזיק 16 נכסים שנבחרו בקפידה ב-6 ורטיקלים השקעתיים, כל אחד מגובה מחקר וראיות מוסדיות. לכל נכס יש תזה ברורה למה הוא שייך.",
    sections: [
      {
        id: "asset-explorer",
        title: "Asset Research Explorer",
        titleHe: "סייר מחקר נכסים",
        meaning: "Interactive explorer to research each of the 16 assets individually.",
        meaningHe: "סייר אינטראקטיבי לחקור כל אחד מ-16 הנכסים בנפרד.",
        keyPoints: [
          "16 total assets across 6 verticals",
          "6 Layer-1 blockchains included",
          "7 risk categories tracked",
          "Each asset includes: thesis, risks, TAMS fit, market positioning",
          "Assets: ETH, SOL, AVAX, ALGO, SUI, ARB, OP, APT, AEVO, ENSO, MKR, AAVE, UNI, ONDO, USDT, BTC and more",
        ],
        keyPointsHe: [
          "16 נכסים בסך הכל ב-6 ורטיקלים",
          "6 בלוקצ'יינים Layer-1 כלולים",
          "7 קטגוריות סיכון נעקבות",
          "כל נכס כולל: תזה, סיכונים, התאמה ל-TAMS, מיקום שוקי",
          "נכסים: ETH, SOL, AVAX, ALGO, SUI, ARB, OP, APT, AEVO, ENSO, MKR, AAVE, UNI, ONDO, USDT, BTC ועוד",
        ],
      },
    ],
    relatedPages: ["/architecture", "/proof", "/defi"],
    suggestedNext: ["/proof", "/defi"],
    category: "portfolio",
    keywords: [
      "holdings", "assets", "portfolio", "research", "crypto", "tokens",
      "החזקות", "נכסים", "תיק", "מחקר", "קריפטו",
      "ETH", "SOL", "AVAX", "ALGO", "SUI", "ARB", "OP", "APT",
      "AEVO", "ENSO", "MKR", "AAVE", "UNI", "ONDO", "USDT", "BTC",
      "XRP", "XLM", "XDC", "ADA", "HBAR", "HOLO", "LINK", "QNT",
      "FLR", "MATIC", "FIL", "AR", "WLD",
      "ethereum", "bitcoin", "solana", "avalanche", "ripple",
    ],
  },

  // ─── DeFi ───
  {
    route: "/defi",
    name: "DeFi",
    nameHe: "DeFi",
    purpose:
      "Explains the DeFi yield strategy, supported protocols, risk framework, and how DeFi integrates into the overall fund structure.",
    purposeHe:
      "מסביר את אסטרטגיית תשואת DeFi, הפרוטוקולים הנתמכים, מסגרת הסיכון וכיצד DeFi משתלב במבנה הקרן הכולל.",
    investorTakeaway:
      "DeFi allocation targets 4-12% APY through lending, staking, and liquidity pools. Max 10% exposure per protocol, 25% of total portfolio, with institutional-grade risk controls.",
    investorTakeawayHe:
      "הקצאת DeFi מכוונת ל-4-12% APY דרך הלוואות, סטייקינג ומאגרי נזילות. חשיפה מקסימלית 10% לפרוטוקול, 25% מהתיק הכולל, עם בקרות סיכון ברמה מוסדית.",
    sections: [
      {
        id: "defi-strategies",
        title: "DeFi Strategies",
        titleHe: "אסטרטגיות DeFi",
        meaning: "The six DeFi strategies used to generate yield.",
        meaningHe: "שש אסטרטגיות DeFi שמשמשות ליצירת תשואה.",
        keyPoints: [
          "Lending — Aave, Compound protocols",
          "Staking — native and liquid staking",
          "Liquidity Pools — Uniswap, Curve",
          "Optimization — dynamic rebalancing",
          "Risk-First Approach — capital preservation priority",
          "Multi-Chain Diversification — spread across 3+ chains",
        ],
        keyPointsHe: [
          "הלוואות — פרוטוקולי Aave, Compound",
          "סטייקינג — סטייקינג מקורי ונזיל",
          "מאגרי נזילות — Uniswap, Curve",
          "אופטימיזציה — איזון מחדש דינמי",
          "גישת סיכון ראשונה — שימור הון בעדיפות",
          "פיזור רב-שרשרתי — פיזור על פני 3+ רשתות",
        ],
      },
      {
        id: "risk-framework",
        title: "Risk Framework",
        titleHe: "מסגרת סיכון",
        meaning: "How DeFi risks are managed and mitigated.",
        meaningHe: "כיצד סיכוני DeFi מנוהלים ומצומצמים.",
        keyPoints: [
          "Smart contract audits required",
          "Protocol maturity assessment",
          "Liquidation protection mechanisms",
          "Position sizing rules",
          "Target APY: 4-12%, Max Exposure: 10% per protocol",
        ],
        keyPointsHe: [
          "נדרשים ביקורות חוזים חכמים",
          "הערכת בשלות פרוטוקול",
          "מנגנוני הגנה מחיסול",
          "כללי גודל פוזיציה",
          "יעד APY: 4-12%, חשיפה מקסימלית: 10% לפרוטוקול",
        ],
      },
    ],
    relatedPages: ["/architecture", "/holdings", "/strategy"],
    suggestedNext: ["/strategy", "/market-shift"],
    category: "strategy",
    keywords: [
      "defi", "yield", "staking", "lending", "apy", "protocol", "liquidity",
      "תשואה", "סטייקינג", "הלוואות", "נזילות", "פרוטוקול",
    ],
  },

  // ─── מהפך שוק ───
  {
    route: "/market-shift",
    name: "Market Shift",
    nameHe: "מהפך שוק",
    purpose:
      "Explains why now is the right time for institutional blockchain investment. Shows global market segments, catalysts, and timeline of key developments.",
    purposeHe:
      "מסביר למה עכשיו הוא הזמן הנכון להשקעות מוסדיות בבלוקצ'יין. מציג מגזרי שוק גלובליים, קטליסטורים ולוח זמנים של התפתחויות מרכזיות.",
    investorTakeaway:
      "Massive addressable markets ($2-3T) are converging with institutional catalysts like ETF approvals, regulatory clarity, corporate treasury adoption, and RWA tokenization.",
    investorTakeawayHe:
      "שווקים ניתנים לגישה מאסיביים ($2-3T) מתכנסים עם קטליסטורים מוסדיים כמו אישורי ETF, בהירות רגולטורית, אימוץ תאגידי וטוקניזציה של RWA.",
    sections: [
      {
        id: "market-segments",
        title: "Global Market Segments",
        titleHe: "מגזרי שוק גלובליים",
        meaning: "The massive traditional markets being disrupted by blockchain technology.",
        meaningHe: "השווקים המסורתיים העצומים שמופרעים על ידי טכנולוגיית בלוקצ'יין.",
        keyPoints: [
          "Cross-border payments: $1,000T",
          "Managed assets: $147T",
          "Pension funds: $58.5T",
          "Insurance: $7T",
          "Tokenized Real Estate: $4.3T",
          "BlackRock/Vanguard: $20T",
          "ETFs: $2T",
        ],
        keyPointsHe: [
          "תשלומים בינלאומיים: $1,000T",
          "נכסים מנוהלים: $147T",
          "קרנות פנסיה: $58.5T",
          "ביטוח: $7T",
          "נדל\"ן מטוקנייז: $4.3T",
          "BlackRock/Vanguard: $20T",
          "ETFs: $2T",
        ],
      },
      {
        id: "catalysts",
        title: "Market Catalysts",
        titleHe: "קטליסטורים",
        meaning: "Key events and trends driving institutional adoption right now.",
        meaningHe: "אירועים ומגמות מרכזיים שמניעים אימוץ מוסדי כרגע.",
        keyPoints: [
          "ETF & Regulatory Approval",
          "Institutional Regulatory Clarity",
          "Corporate Treasury Adoption",
          "RWA Tokenization",
          "DeFi Maturation",
          "Infrastructure Layer Growth",
        ],
        keyPointsHe: [
          "אישורי ETF ורגולציה",
          "בהירות רגולטורית מוסדית",
          "אימוץ אוצר תאגידי",
          "טוקניזציה של RWA",
          "הבשלת DeFi",
          "צמיחת שכבת תשתית",
        ],
      },
    ],
    relatedPages: ["/strategy", "/proof"],
    suggestedNext: ["/strategy", "/proof"],
    category: "strategy",
    keywords: [
      "market", "shift", "why now", "timing", "catalysts", "ETF", "regulation", "adoption", "RWA", "tokenization",
      "שוק", "מהפך", "תזמון", "קטליסטור", "אימוץ", "טוקניזציה",
    ],
  },

  // ─── אסטרטגיה ───
  {
    route: "/strategy",
    name: "Strategy",
    nameHe: "אסטרטגיה",
    purpose:
      "The comprehensive strategy page: TAM/SAM/SOM analysis, market underpricing thesis, 6-engine business model, 3 scenario models, and competitive advantages.",
    purposeHe:
      "דף האסטרטגיה המקיף: ניתוח TAM/SAM/SOM, תזת תמחור חסר של השוק, מודל עסקי 6-מנועי, 3 תרחישי מודל ויתרונות תחרותיים.",
    investorTakeaway:
      "TAMS targets a $25-75M obtainable market within a $2-3T TAM. The business model runs 6 value engines simultaneously, with 3 scenario projections from conservative to accelerated.",
    investorTakeawayHe:
      "TAMS מכוונת לשוק בר-השגה של $25-75M בתוך TAM של $2-3T. המודל העסקי מפעיל 6 מנועי ערך בו-זמנית, עם 3 תחזיות תרחישים משמרנית עד מואצת.",
    sections: [
      {
        id: "tam-sam-som",
        title: "TAM / SAM / SOM",
        titleHe: "TAM / SAM / SOM",
        meaning: "Market sizing analysis: total, serviceable, and obtainable market.",
        meaningHe: "ניתוח גודל שוק: שוק כולל, שוק ניתן לשירות ושוק ניתן להשגה.",
        keyPoints: [
          "TAM: $2-3T — total addressable market",
          "SAM: $300-500B — serviceable addressable market",
          "SOM: $25-75M — serviceable obtainable market",
        ],
        keyPointsHe: [
          "TAM: $2-3T — שוק כולל ניתן לגישה",
          "SAM: $300-500B — שוק ניתן לשירות",
          "SOM: $25-75M — שוק ניתן להשגה",
        ],
      },
      {
        id: "market-underpricing",
        title: "Market Underpricing",
        titleHe: "תמחור חסר של השוק",
        meaning: "Six frameworks explaining why blockchain infrastructure is currently undervalued.",
        meaningHe: "שש מסגרות שמסבירות למה תשתית בלוקצ'יין מתומחרת כרגע בחסר.",
        keyPoints: [
          "Visible Market vs. Hidden Infrastructure",
          "Speculation vs. Utility vs. Infrastructure layers",
          "Tokenization TAM expansion ($16T potential)",
          "Adoption Timing Gap",
          "Settlement Modernization",
          "Asymmetric Optionality",
        ],
        keyPointsHe: [
          "שוק גלוי לעומת תשתית נסתרת",
          "ספקולציה לעומת שימוש לעומת שכבות תשתית",
          "הרחבת TAM טוקניזציה (פוטנציאל $16T)",
          "פער תזמון אימוץ",
          "מודרניזציית סליקה",
          "אופציונליות א-סימטרית",
        ],
      },
      {
        id: "business-model",
        title: "Business Model (6 Engines)",
        titleHe: "מודל עסקי (6 מנועים)",
        meaning: "The six simultaneous value creation engines of TAMS.",
        meaningHe: "ששת מנועי יצירת הערך המקבילים של TAMS.",
        keyPoints: [
          "Treasury Holding — long-term appreciation",
          "DeFi Yield Deployment — protocol-based returns",
          "Active Trading Strategies — tactical alpha",
          "Conviction Basket Rotation — dynamic rebalancing",
          "Risk-Managed Allocation — disciplined positioning",
          "Infrastructure Participation — ecosystem rewards",
        ],
        keyPointsHe: [
          "החזקת אוצר — ייסוף ארוך טווח",
          "פריסת תשואות DeFi — תשואות מבוססות פרוטוקול",
          "אסטרטגיות מסחר אקטיבי — אלפא טקטי",
          "רוטציית סל שכנוע — איזון מחדש דינמי",
          "הקצאה מנוהלת סיכון — מיקום ממושמע",
          "השתתפות בתשתית — תגמולי אקו-סיסטם",
        ],
      },
      {
        id: "scenarios",
        title: "Scenario Model",
        titleHe: "מודל תרחישים",
        meaning: "Three adoption scenario projections for portfolio performance.",
        meaningHe: "שלוש תחזיות תרחישי אימוץ לביצועי התיק.",
        keyPoints: [
          "Conservative Adoption — baseline growth",
          "Moderate Adoption — expected trajectory",
          "Accelerated Adoption — bull case with rapid institutional inflows",
        ],
        keyPointsHe: [
          "אימוץ שמרני — צמיחת בסיס",
          "אימוץ מתון — מסלול צפוי",
          "אימוץ מואץ — מקרה שורי עם כניסות מוסדיות מהירות",
        ],
      },
      {
        id: "competitive-edge",
        title: "Competitive Advantages",
        titleHe: "יתרונות תחרותיים",
        meaning: "What differentiates TAMS from other crypto investment approaches.",
        meaningHe: "מה מבדיל את TAMS מגישות השקעה אחרות בקריפטו.",
        keyPoints: [
          "Market Clarity — structured understanding of blockchain infrastructure",
          "Multi-Strategy Approach — 6 engines, not single-vector",
          "Investor Mindset — institutional discipline, not retail speculation",
          "Timing & Execution — positioned at institutional adoption inflection point",
        ],
        keyPointsHe: [
          "בהירות שוק — הבנה מובנית של תשתית בלוקצ'יין",
          "גישה רב-אסטרטגית — 6 מנועים, לא וקטור יחיד",
          "חשיבת משקיע — משמעת מוסדית, לא ספקולציה קמעונאית",
          "תזמון וביצוע — ממוקם בנקודת הטיה של אימוץ מוסדי",
        ],
      },
    ],
    relatedPages: ["/market-shift", "/proof", "/company"],
    suggestedNext: ["/proof", "/investor"],
    category: "strategy",
    keywords: [
      "strategy", "TAM", "SAM", "SOM", "business model", "scenario", "competitive", "underpricing",
      "אסטרטגיה", "מודל עסקי", "תרחיש", "תחרות", "תמחור חסר",
    ],
  },

  // ─── הוכחות ───
  {
    route: "/proof",
    name: "Proof",
    nameHe: "הוכחות",
    purpose:
      "The evidence page: 259 verified evidence records across 16 assets, asset thesis grid, adoption coverage, and methodology disclaimer. This is the data backbone of the TAMS thesis.",
    purposeHe:
      "דף הראיות: 259 רשומות ראיות מאומתות על פני 16 נכסים, רשת תזות נכסים, כיסוי אימוץ ומגבלות מתודולוגיה. זהו עמוד השדרה הנתוני של תזת TAMS.",
    investorTakeaway:
      "Every claim is backed by verified institutional evidence — 259 records, 125+ organizations, 50+ countries, categorized by confidence tier. This is not hype; it's structured proof.",
    investorTakeawayHe:
      "כל טענה מגובה בראיות מוסדיות מאומתות — 259 רשומות, 125+ ארגונים, 50+ מדינות, מסווגות לפי רמת ביטחון. זה לא הייפ; זו הוכחה מובנית.",
    sections: [
      {
        id: "proof-hero",
        title: "Evidence Overview",
        titleHe: "סקירת ראיות",
        meaning: "Key statistics about the evidence base and six value engines.",
        meaningHe: "סטטיסטיקות מרכזיות על בסיס הראיות וששת מנועי הערך.",
        keyPoints: [
          "259 total evidence records",
          "125+ unique organizations",
          "50+ countries covered",
          "High-confidence evidence percentage tracked",
          "Six value engines: Treasury, DeFi, Trading, Rotation, Risk, Participation",
        ],
        keyPointsHe: [
          "259 רשומות ראיות בסך הכל",
          "125+ ארגונים ייחודיים",
          "50+ מדינות מכוסות",
          "אחוז ראיות ברמת ביטחון גבוהה נעקב",
          "שישה מנועי ערך: אוצר, DeFi, מסחר, רוטציה, סיכון, השתתפות",
        ],
      },
      {
        id: "asset-thesis-grid",
        title: "Asset Thesis Grid",
        titleHe: "רשת תזות נכסים",
        meaning: "Scoring and thesis alignment for each of the 16 assets.",
        meaningHe: "ניקוד והתאמת תזה לכל אחד מ-16 הנכסים.",
        keyPoints: [
          "Each asset scored on thesis alignment",
          "Institutional adoption evidence per asset",
          "Interactive filtering by asset",
        ],
        keyPointsHe: [
          "כל נכס מדורג לפי התאמת תזה",
          "ראיות אימוץ מוסדי לכל נכס",
          "סינון אינטראקטיבי לפי נכס",
        ],
      },
      {
        id: "evidence-explorer",
        title: "Evidence Explorer",
        titleHe: "סייר ראיות",
        meaning: "Interactive tool to browse, filter, and search all 259 evidence records.",
        meaningHe: "כלי אינטראקטיבי לגלישה, סינון וחיפוש בכל 259 רשומות הראיות.",
        keyPoints: [
          "259 records with filtering",
          "Searchable by asset, organization, geography",
          "Confidence tier indicators (High/Medium/Low)",
          "Organization type classification",
        ],
        keyPointsHe: [
          "259 רשומות עם סינון",
          "ניתן לחיפוש לפי נכס, ארגון, גיאוגרפיה",
          "מדדי רמת ביטחון (גבוה/בינוני/נמוך)",
          "סיווג סוג ארגון",
        ],
      },
      {
        id: "adoption-coverage",
        title: "Adoption Coverage",
        titleHe: "כיסוי אימוץ",
        meaning: "Geographic and organizational distribution of evidence.",
        meaningHe: "פיזור גיאוגרפי וארגוני של הראיות.",
        keyPoints: [
          "Coverage across 6 continents",
          "Multiple organization types",
          "Global institutional adoption mapping",
        ],
        keyPointsHe: [
          "כיסוי על פני 6 יבשות",
          "סוגי ארגונים מרובים",
          "מיפוי אימוץ מוסדי גלובלי",
        ],
      },
    ],
    relatedPages: ["/strategy", "/holdings", "/methodology"],
    suggestedNext: ["/investor", "/methodology"],
    category: "evidence",
    keywords: [
      "proof", "evidence", "data", "verification", "adoption", "institutional", "records",
      "הוכחות", "ראיות", "נתונים", "אימות", "אימוץ", "מוסדי", "רשומות",
    ],
  },

  // ─── משקיעים ───
  {
    route: "/investor",
    name: "Investor",
    nameHe: "משקיעים",
    purpose:
      "The investor-focused page with highlights, development roadmap, risk disclosure, investor tiers, and conclusion with contact info.",
    purposeHe:
      "דף ממוקד משקיעים עם הדגשות, מפת דרכים לפיתוח, גילוי סיכונים, דרגות משקיעים וסיכום עם פרטי קשר.",
    investorTakeaway:
      "This is the action page for investors. It summarizes the opportunity, shows the development roadmap, discloses risks transparently, and presents the tier structure. Contact: contact@tams.earth.",
    investorTakeawayHe:
      "זהו דף הפעולה למשקיעים. הוא מסכם את ההזדמנות, מציג את מפת הדרכים לפיתוח, חושף סיכונים בשקיפות ומציג את מבנה הדרגות. קשר: contact@tams.earth.",
    sections: [
      {
        id: "highlights",
        title: "Key Highlights",
        titleHe: "הדגשות מרכזיות",
        meaning: "The four key points that make TAMS attractive to investors.",
        meaningHe: "ארבע נקודות מרכזיות שהופכות את TAMS לאטרקטיבית למשקיעים.",
        keyPoints: [
          "Structured approach",
          "Research-backed methodology",
          "Institutional-grade risk management",
          "Long-term wealth horizon",
        ],
        keyPointsHe: [
          "גישה מובנית",
          "מתודולוגיה מגובת מחקר",
          "ניהול סיכונים ברמה מוסדית",
          "אופק עושר ארוך טווח",
        ],
      },
      {
        id: "roadmap",
        title: "Development Roadmap",
        titleHe: "מפת דרכים",
        meaning: "Timeline of development milestones — completed, in progress, and upcoming.",
        meaningHe: "לוח זמנים של אבני דרך פיתוח — הושלמו, בתהליך ומתוכננים.",
        keyPoints: [
          "Multi-phase development with status tracking",
          "Milestones with completion indicators",
        ],
        keyPointsHe: [
          "פיתוח רב-שלבי עם מעקב סטטוס",
          "אבני דרך עם מדדי השלמה",
        ],
      },
      {
        id: "risk-disclosure",
        title: "Risk Disclosure",
        titleHe: "גילוי סיכונים",
        meaning: "Transparent disclosure of all investment risks.",
        meaningHe: "גילוי שקוף של כל סיכוני ההשקעה.",
        keyPoints: [
          "Multiple risk categories with detailed explanations",
          "Expandable risk sections for deep reading",
        ],
        keyPointsHe: [
          "קטגוריות סיכון מרובות עם הסברים מפורטים",
          "מקטעי סיכון מתרחבים לקריאה מעמיקה",
        ],
      },
    ],
    relatedPages: ["/", "/strategy", "/proof", "/access"],
    suggestedNext: ["/access", "/proof"],
    category: "investor",
    keywords: [
      "investor", "invest", "tiers", "roadmap", "risk", "contact",
      "משקיע", "השקעה", "דרגות", "מפת דרכים", "סיכון", "קשר",
    ],
  },

  // ─── צוות ───
  {
    route: "/team",
    name: "Team",
    nameHe: "צוות",
    purpose:
      "Shows the organizational structure, four pillars (Research, Trading, Infrastructure, Compliance), advisory board, and core values.",
    purposeHe:
      "מציג את מבנה הארגון, ארבע עמודי התווך (מחקר, מסחר, תשתית, ציות), מועצה מייעצת וערכי ליבה.",
    investorTakeaway:
      "TAMS is built on 4 organizational pillars: Research, Trading, Infrastructure, and Compliance — with an advisory board of blockchain, finance, and compliance experts.",
    investorTakeawayHe:
      "TAMS בנויה על 4 עמודי תווך ארגוניים: מחקר, מסחר, תשתית וציות — עם מועצה מייעצת של מומחי בלוקצ'יין, פיננסים וציות.",
    sections: [
      {
        id: "pillars",
        title: "Four Pillars",
        titleHe: "ארבעת עמודי התווך",
        meaning: "The four organizational divisions of TAMS.",
        meaningHe: "ארבע החטיבות הארגוניות של TAMS.",
        keyPoints: [
          "Research — macro, micro, on-chain analysis",
          "Trading — spot, derivatives, DeFi strategies",
          "Infrastructure — secure digital asset management",
          "Compliance & Regulation — KYC/AML, regulatory reporting",
        ],
        keyPointsHe: [
          "מחקר — ניתוח מאקרו, מיקרו, on-chain",
          "מסחר — ספוט, נגזרים, אסטרטגיות DeFi",
          "תשתית — ניהול נכסים דיגיטליים מאובטח",
          "ציות ורגולציה — KYC/AML, דיווח רגולטורי",
        ],
      },
      {
        id: "values",
        title: "Core Values",
        titleHe: "ערכי ליבה",
        meaning: "The foundational values that guide TAMS operations.",
        meaningHe: "הערכים הבסיסיים שמנחים את פעילות TAMS.",
        keyPoints: [
          "Institutional Rigor",
          "Transparency",
          "Risk Management",
          "Compliance First",
        ],
        keyPointsHe: [
          "קפדנות מוסדית",
          "שקיפות",
          "ניהול סיכונים",
          "ציות בראש סדר העדיפויות",
        ],
      },
    ],
    relatedPages: ["/company"],
    suggestedNext: ["/company", "/methodology"],
    category: "information",
    keywords: [
      "team", "structure", "advisory", "values", "organization",
      "צוות", "מבנה", "מועצה", "ערכים", "ארגון",
    ],
  },

  // ─── מתודולוגיה ───
  {
    route: "/methodology",
    name: "Methodology",
    nameHe: "מתודולוגיה",
    purpose:
      "Explains the research and investment methodology: asset selection criteria, evidence classification tiers, confidence levels, risk scoring, portfolio construction rules, and review process.",
    purposeHe:
      "מסביר את מתודולוגיית המחקר וההשקעה: קריטריונים לבחירת נכסים, שכבות סיווג ראיות, רמות ביטחון, ניקוד סיכון, כללי בניית תיק ותהליך סקירה.",
    investorTakeaway:
      "TAMS uses a 3-tier evidence hierarchy, 4-dimension risk scoring, strict portfolio construction rules (max 20% per category, 15% per asset), and quarterly reviews.",
    investorTakeawayHe:
      "TAMS משתמשת בהיררכיית ראיות 3-שכבתית, ניקוד סיכון 4-ממדי, כללי בניית תיק קפדניים (מקסימום 20% לקטגוריה, 15% לנכס), וסקירות רבעוניות.",
    sections: [
      {
        id: "selection-criteria",
        title: "Asset Selection Framework",
        titleHe: "מסגרת בחירת נכסים",
        meaning: "The five criteria used to select assets for the portfolio.",
        meaningHe: "חמשת הקריטריונים לבחירת נכסים לתיק.",
        keyPoints: [
          "Financial Infrastructure Relevance",
          "Institutional Adoption Evidence",
          "Regulatory Clarity",
          "Technology Maturity",
          "Ecosystem Strength",
        ],
        keyPointsHe: [
          "רלוונטיות לתשתית פיננסית",
          "ראיות אימוץ מוסדי",
          "בהירות רגולטורית",
          "בשלות טכנולוגית",
          "חוסן אקו-סיסטם",
        ],
      },
      {
        id: "evidence-tiers",
        title: "Evidence Classification",
        titleHe: "סיווג ראיות",
        meaning: "Three-tier system for classifying evidence sources.",
        meaningHe: "מערכת תלת-שכבתית לסיווג מקורות ראיות.",
        keyPoints: [
          "Tier 1 (Primary): official reports, government announcements, peer-reviewed papers, on-chain data",
          "Tier 2 (Secondary): research firm analysis, financial media, executive interviews",
          "Tier 3 (Excluded): unverified social media, speculative predictions, anonymous sources",
        ],
        keyPointsHe: [
          "שכבה 1 (ראשוני): דוחות רשמיים, הכרזות ממשלתיות, מאמרים אקדמיים, נתוני on-chain",
          "שכבה 2 (משני): ניתוחי חברות מחקר, מדיה פיננסית, ראיונות מנהלים",
          "שכבה 3 (לא נכלל): מדיה חברתית לא מאומתת, תחזיות ספקולטיביות, מקורות אנונימיים",
        ],
      },
      {
        id: "risk-scoring",
        title: "Risk Scoring",
        titleHe: "ניקוד סיכון",
        meaning: "Four-dimensional risk assessment for each asset.",
        meaningHe: "הערכת סיכון ארבע-ממדית לכל נכס.",
        keyPoints: [
          "Financial Relevance — connection to traditional finance",
          "Adoption Maturity — real partnerships, pilots in production",
          "Ecosystem Strength — developer activity, TVL, partnerships",
          "Verification Confidence — source quality & consistency",
        ],
        keyPointsHe: [
          "רלוונטיות פיננסית — חיבור לפיננסים מסורתיים",
          "בשלות אימוץ — שותפויות אמיתיות, פיילוטים בייצור",
          "חוסן אקו-סיסטם — פעילות מפתחים, TVL, שותפויות",
          "ביטחון אימות — איכות ועקביות מקורות",
        ],
      },
      {
        id: "portfolio-rules",
        title: "Portfolio Construction",
        titleHe: "בניית תיק",
        meaning: "Strict rules governing portfolio composition.",
        meaningHe: "כללים קפדניים השולטים בהרכב התיק.",
        keyPoints: [
          "No category exceeds 20% of portfolio",
          "Each asset capped at 15%",
          "Minimum 4 different thesis categories",
          "Multiple market layers represented",
          "Quarterly full asset reassessment",
        ],
        keyPointsHe: [
          "אף קטגוריה לא עולה על 20% מהתיק",
          "כל נכס מוגבל ל-15%",
          "מינימום 4 קטגוריות תזה שונות",
          "שכבות שוק מרובות מיוצגות",
          "הערכה מחדש רבעונית מלאה של נכסים",
        ],
      },
    ],
    relatedPages: ["/proof", "/holdings"],
    suggestedNext: ["/proof", "/holdings"],
    category: "information",
    keywords: [
      "methodology", "research", "framework", "criteria", "evidence", "tier", "risk", "scoring",
      "מתודולוגיה", "מחקר", "מסגרת", "קריטריון", "ראיות", "שכבה", "סיכון", "ניקוד",
    ],
  },

  // ─── שאלות נפוצות ───
  {
    route: "/faq",
    name: "FAQ",
    nameHe: "שאלות נפוצות",
    purpose:
      "Frequently asked questions organized by category: About TAMS, Investments & Portfolio, Research & Evidence, Access & Security.",
    purposeHe:
      "שאלות נפוצות מאורגנות לפי קטגוריה: אודות TAMS, השקעות ותיק, מחקר וראיות, גישה ואבטחה.",
    investorTakeaway:
      "Quick answers to common investor questions about what TAMS is, how assets are selected, how evidence works, and how to access the platform.",
    investorTakeawayHe:
      "תשובות מהירות לשאלות נפוצות של משקיעים על מה זה TAMS, איך נכסים נבחרים, איך הראיות עובדות ואיך לגשת לפלטפורמה.",
    sections: [
      {
        id: "about-tams",
        title: "About TAMS",
        titleHe: "אודות TAMS",
        meaning: "General questions about what TAMS is and what it does.",
        meaningHe: "שאלות כלליות על מה זה TAMS ומה הוא עושה.",
        keyPoints: [
          "What is TAMS?",
          "What is the core thesis?",
          "How many assets in the portfolio? — 16",
          "Is this investment advice? — No, research only",
        ],
        keyPointsHe: [
          "מה זה TAMS?",
          "מה התזה המרכזית?",
          "כמה נכסים בתיק? — 16",
          "האם זו ייעוץ השקעות? — לא, מחקר בלבד",
        ],
      },
    ],
    relatedPages: ["/", "/methodology"],
    suggestedNext: ["/", "/proof"],
    category: "information",
    keywords: [
      "faq", "questions", "help", "answers",
      "שאלות", "נפוצות", "עזרה", "תשובות",
    ],
  },

  // ─── משפטי ───
  {
    route: "/legal",
    name: "Legal",
    nameHe: "משפטי",
    purpose:
      "Legal disclosures: terms of use, privacy policy, risk disclosure, forward-looking statements, non-offer of investment, regulatory compliance.",
    purposeHe:
      "גילויים משפטיים: תנאי שימוש, מדיניות פרטיות, גילוי סיכונים, הצהרות צופות פני עתיד, אי-הצעת השקעה, ציות רגולטורי.",
    investorTakeaway:
      "Full legal transparency: TAMS is not investment advice, past performance doesn't guarantee future results, and all regulatory compliance frameworks (AML/KYC) are implemented.",
    investorTakeawayHe:
      "שקיפות משפטית מלאה: TAMS אינה ייעוץ השקעות, ביצועי עבר אינם מבטיחים תוצאות עתידיות, וכל מסגרות הציות הרגולטורי (AML/KYC) מיושמות.",
    sections: [
      {
        id: "risk-disclosure",
        title: "Risk Disclosure",
        titleHe: "גילוי סיכונים",
        meaning: "Comprehensive list of investment risks.",
        meaningHe: "רשימה מקיפה של סיכוני השקעה.",
        keyPoints: [
          "Market volatility, regulatory risk, technology risk",
          "Liquidity risk, access loss risk, counterparty risk",
          "Not investment advice, not an offer to buy/sell securities",
        ],
        keyPointsHe: [
          "תנודתיות שוק, סיכון רגולטורי, סיכון טכנולוגי",
          "סיכון נזילות, סיכון אובדן גישה, סיכון צד שכנגד",
          "לא ייעוץ השקעות, לא הצעה לקנות/למכור ניירות ערך",
        ],
      },
    ],
    relatedPages: ["/faq"],
    suggestedNext: ["/faq", "/investor"],
    category: "information",
    keywords: [
      "legal", "terms", "privacy", "risk", "disclaimer", "compliance",
      "משפטי", "תנאים", "פרטיות", "סיכון", "הגבלת אחריות", "ציות",
    ],
  },

  // ─── גישה פרטית ───
  {
    route: "/access",
    name: "Access",
    nameHe: "גישה פרטית",
    purpose:
      "Private capital access request form for qualified investors. Includes trust signals, investor type selection, and investment range.",
    purposeHe:
      "טופס בקשת גישה להון פרטי למשקיעים מוסמכים. כולל סימני אמון, בחירת סוג משקיע וטווח השקעה.",
    investorTakeaway:
      "Submit a confidential review request. Choose from 5 investor types and 5 investment ranges ($100K to $25M+). Team responds within 48 hours.",
    investorTakeawayHe:
      "הגש בקשה לסקירה חסויה. בחר מ-5 סוגי משקיעים ו-5 טווחי השקעה ($100K עד $25M+). הצוות מגיב תוך 48 שעות.",
    sections: [
      {
        id: "trust-signals",
        title: "Trust Signals",
        titleHe: "סימני אמון",
        meaning: "Four institutional trust indicators.",
        meaningHe: "ארבעה מדדי אמון מוסדיים.",
        keyPoints: [
          "Institutional Framework — multi-wallet architecture",
          "Evidence-Based Selection — 125+ institutional relationships",
          "Active Management — multi-engine model",
          "Confidential Process — dedicated relationship managers",
        ],
        keyPointsHe: [
          "מסגרת מוסדית — ארכיטקטורת ארנקים מרובים",
          "בחירה מבוססת ראיות — 125+ קשרים מוסדיים",
          "ניהול אקטיבי — מודל רב-מנועי",
          "תהליך חסוי — מנהלי קשרי לקוחות ייעודיים",
        ],
      },
    ],
    relatedPages: ["/investor", "/login"],
    suggestedNext: ["/investor", "/"],
    category: "investor",
    keywords: [
      "access", "apply", "request", "private", "confidential", "form",
      "גישה", "בקשה", "פרטי", "חסוי", "טופס",
    ],
  },

  // ─── דשבורד ───
  {
    route: "/dashboard",
    name: "Dashboard",
    nameHe: "דשבורד",
    purpose:
      "Protected investor dashboard showing portfolio overview, holdings, DeFi positions, performance history, and wallet balances.",
    purposeHe:
      "דשבורד משקיעים מוגן המציג סקירת תיק, החזקות, פוזיציות DeFi, היסטוריית ביצועים ויתרות ארנקים.",
    investorTakeaway:
      "After login, access a Bloomberg-style dashboard with real-time portfolio tracking, DeFi positions, performance analytics, and transaction activity.",
    investorTakeawayHe:
      "לאחר התחברות, גישה לדשבורד בסגנון Bloomberg עם מעקב תיק בזמן אמת, פוזיציות DeFi, ניתוח ביצועים ופעילות עסקאות.",
    sections: [
      {
        id: "portfolio-overview",
        title: "Portfolio Overview",
        titleHe: "סקירת תיק",
        meaning: "Summary statistics: total value, returns (daily/weekly/monthly/all-time).",
        meaningHe: "סטטיסטיקות סיכום: ערך כולל, תשואות (יומי/שבועי/חודשי/כל הזמן).",
        keyPoints: [
          "Total portfolio value displayed",
          "Daily, weekly, monthly, all-time returns",
          "4 summary stat cards",
        ],
        keyPointsHe: [
          "ערך תיק כולל מוצג",
          "תשואות יומיות, שבועיות, חודשיות, כל הזמן",
          "4 כרטיסי סטטיסטיקות סיכום",
        ],
      },
      {
        id: "dashboard-holdings",
        title: "Holdings View",
        titleHe: "תצוגת החזקות",
        meaning: "Detailed breakdown of all portfolio positions.",
        meaningHe: "פירוט מפורט של כל פוזיציות התיק.",
        keyPoints: [
          "16 assets with allocation percentages",
          "P&L tracking per asset",
          "4 wallet division breakdown",
        ],
        keyPointsHe: [
          "16 נכסים עם אחוזי הקצאה",
          "מעקב רווח/הפסד לכל נכס",
          "פירוט 4 חטיבות ארנק",
        ],
      },
    ],
    relatedPages: ["/login", "/holdings"],
    suggestedNext: ["/holdings", "/proof"],
    category: "dashboard",
    keywords: [
      "dashboard", "portfolio", "performance", "analytics", "activity",
      "דשבורד", "תיק", "ביצועים", "ניתוח", "פעילות",
    ],
  },
];

// === מפת נושאים ===

export interface TopicEntry {
  topic: string;
  topicHe: string;
  description: string;
  descriptionHe: string;
  relevantPages: string[];
  keywords: string[];
}

export const topicMap: TopicEntry[] = [
  {
    topic: "Company Overview",
    topicHe: "סקירת חברה",
    description: "What TAMS is, its vision, mission, and core principles.",
    descriptionHe: "מה זה TAMS, החזון, המשימה והעקרונות המרכזיים שלה.",
    relevantPages: ["/", "/company", "/team"],
    keywords: ["what is tams", "company", "about", "vision", "mission", "מה זה", "חברה", "אודות", "חזון", "משימה"],
  },
  {
    topic: "Portfolio & Holdings",
    topicHe: "תיק והחזקות",
    description: "What assets are in the portfolio, how they're allocated, and why they were chosen.",
    descriptionHe: "אילו נכסים בתיק, כיצד הם מוקצים ולמה הם נבחרו.",
    relevantPages: ["/holdings", "/architecture", "/dashboard"],
    keywords: ["portfolio", "holdings", "assets", "allocation", "crypto", "tokens", "תיק", "החזקות", "נכסים", "הקצאה"],
  },
  {
    topic: "Evidence & Proof",
    topicHe: "ראיות והוכחות",
    description: "The 259 evidence records, institutional adoption data, and verification methodology.",
    descriptionHe: "259 רשומות הראיות, נתוני אימוץ מוסדי ומתודולוגיית אימות.",
    relevantPages: ["/proof", "/methodology"],
    keywords: ["proof", "evidence", "data", "verification", "records", "adoption", "הוכחות", "ראיות", "נתונים", "אימות", "אימוץ"],
  },
  {
    topic: "Investment Strategy",
    topicHe: "אסטרטגיית השקעה",
    description: "The investment thesis, business model, market sizing (TAM/SAM/SOM), and competitive advantages.",
    descriptionHe: "תזת ההשקעה, המודל העסקי, גודל שוק (TAM/SAM/SOM) ויתרונות תחרותיים.",
    relevantPages: ["/strategy", "/market-shift"],
    keywords: ["strategy", "thesis", "business model", "TAM", "competitive", "אסטרטגיה", "תזה", "מודל עסקי", "תחרות"],
  },
  {
    topic: "DeFi & Yield",
    topicHe: "DeFi ותשואות",
    description: "DeFi strategies, yield generation, protocols used, and risk framework.",
    descriptionHe: "אסטרטגיות DeFi, יצירת תשואה, פרוטוקולים בשימוש ומסגרת סיכון.",
    relevantPages: ["/defi", "/architecture"],
    keywords: ["defi", "yield", "staking", "lending", "APY", "protocol", "תשואה", "סטייקינג", "הלוואות"],
  },
  {
    topic: "Market Opportunity",
    topicHe: "הזדמנות שוק",
    description: "Why now is the right time — market catalysts, institutional adoption trends, and timing.",
    descriptionHe: "למה עכשיו הוא הזמן הנכון — קטליסטורים, מגמות אימוץ מוסדי ותזמון.",
    relevantPages: ["/market-shift", "/strategy"],
    keywords: ["market", "timing", "why now", "catalysts", "opportunity", "ETF", "שוק", "תזמון", "למה עכשיו", "הזדמנות"],
  },
  {
    topic: "Infrastructure & Architecture",
    topicHe: "תשתית וארכיטקטורה",
    description: "Wallet structure, capital flow, multi-wallet design, and custody.",
    descriptionHe: "מבנה ארנקים, זרימת הון, עיצוב רב-ארנקים ומשמורת.",
    relevantPages: ["/architecture", "/company"],
    keywords: ["infrastructure", "wallet", "architecture", "custody", "Ledger", "Fordefi", "תשתית", "ארנק", "ארכיטקטורה", "משמורת"],
  },
  {
    topic: "Investing with TAMS",
    topicHe: "להשקיע עם TAMS",
    description: "How to invest, investor tiers, access process, and contact information.",
    descriptionHe: "איך להשקיע, דרגות משקיעים, תהליך גישה ופרטי קשר.",
    relevantPages: ["/investor", "/access", "/"],
    keywords: ["invest", "how", "access", "tiers", "apply", "contact", "להשקיע", "איך", "גישה", "דרגות", "בקשה", "קשר"],
  },
  {
    topic: "Research Methodology",
    topicHe: "מתודולוגיית מחקר",
    description: "How assets are researched, evidence classified, and risks scored.",
    descriptionHe: "איך נכסים נחקרים, ראיות מסווגות וסיכונים מנוקדים.",
    relevantPages: ["/methodology", "/proof"],
    keywords: ["methodology", "research", "criteria", "scoring", "classification", "מתודולוגיה", "מחקר", "קריטריון", "ניקוד", "סיווג"],
  },
  {
    topic: "Risk & Compliance",
    topicHe: "סיכון וציות",
    description: "Risk management approach, legal disclaimers, and regulatory compliance.",
    descriptionHe: "גישת ניהול סיכונים, הגבלות משפטיות וציות רגולטורי.",
    relevantPages: ["/legal", "/investor", "/methodology"],
    keywords: ["risk", "compliance", "legal", "disclaimer", "regulation", "AML", "KYC", "סיכון", "ציות", "משפטי", "רגולציה"],
  },
  {
    topic: "Dashboard & Analytics",
    topicHe: "דשבורד וניתוח",
    description: "The protected investor dashboard with portfolio tracking and analytics.",
    descriptionHe: "דשבורד המשקיעים המוגן עם מעקב תיק וניתוח.",
    relevantPages: ["/dashboard", "/login"],
    keywords: ["dashboard", "analytics", "performance", "tracking", "login", "דשבורד", "ניתוח", "ביצועים", "מעקב", "התחברות"],
  },
  {
    topic: "Navigation Help",
    topicHe: "עזרה בניווט",
    description: "How to navigate the site, what each page offers, and recommended viewing order.",
    descriptionHe: "איך לנווט באתר, מה כל עמוד מציע וסדר צפייה מומלץ.",
    relevantPages: ["/", "/company", "/strategy", "/proof", "/investor"],
    keywords: ["navigate", "where", "find", "page", "section", "start", "order", "ניווט", "איפה", "למצוא", "עמוד", "סעיף", "להתחיל", "סדר"],
  },
];

// === מילון מונחים ===

export interface GlossaryEntry {
  term: string;
  termHe: string;
  definition: string;
  definitionHe: string;
}

export const glossary: GlossaryEntry[] = [
  { term: "TAMS", termHe: "TAMS", definition: "Tokenized Asset Management System — an institutional-grade blockchain investment infrastructure.", definitionHe: "מערכת ניהול נכסים מטוקניים — תשתית השקעות בלוקצ'יין ברמה מוסדית." },
  { term: "TAM", termHe: "TAM", definition: "Total Addressable Market — the total market demand for a product. TAMS estimates $2-3T.", definitionHe: "שוק כולל ניתן לגישה — הביקוש הכולל בשוק למוצר. TAMS מעריכה $2-3T." },
  { term: "SAM", termHe: "SAM", definition: "Serviceable Addressable Market — the segment TAMS can reach. Estimated at $300-500B.", definitionHe: "שוק ניתן לשירות — הפלח ש-TAMS יכולה להגיע אליו. מוערך ב-$300-500B." },
  { term: "SOM", termHe: "SOM", definition: "Serviceable Obtainable Market — the realistic target. TAMS aims for $25-75M.", definitionHe: "שוק ניתן להשגה — היעד הריאלי. TAMS מכוונת ל-$25-75M." },
  { term: "DeFi", termHe: "DeFi", definition: "Decentralized Finance — financial services built on blockchain without traditional intermediaries.", definitionHe: "פיננסים מבוזרים — שירותים פיננסיים בנויים על בלוקצ'יין ללא מתווכים מסורתיים." },
  { term: "APY", termHe: "APY", definition: "Annual Percentage Yield — the annualized return on DeFi strategies. TAMS targets 4-12%.", definitionHe: "תשואה שנתית באחוזים — התשואה השנתית על אסטרטגיות DeFi. TAMS מכוונת ל-4-12%." },
  { term: "RWA", termHe: "RWA", definition: "Real-World Assets — traditional assets (real estate, bonds) represented on blockchain.", definitionHe: "נכסים מהעולם האמיתי — נכסים מסורתיים (נדל\"ן, אג\"ח) מיוצגים על בלוקצ'יין." },
  { term: "GP/LP", termHe: "GP/LP", definition: "General Partner / Limited Partners — the fund management and investor structure.", definitionHe: "שותף כללי / שותפים מוגבלים — מבנה ניהול הקרן והמשקיעים." },
  { term: "Multi-Sig", termHe: "Multi-Sig", definition: "Multi-Signature — a security mechanism requiring multiple approvals for transactions.", definitionHe: "ריבוי חתימות — מנגנון אבטחה הדורש אישורים מרובים לעסקאות." },
  { term: "Layer-1", termHe: "Layer-1", definition: "Base blockchain protocol (e.g., Ethereum, Solana, Avalanche).", definitionHe: "פרוטוקול בלוקצ'יין בסיסי (למשל, Ethereum, Solana, Avalanche)." },
  { term: "TVL", termHe: "TVL", definition: "Total Value Locked — the total capital deposited in DeFi protocols.", definitionHe: "ערך כולל נעול — ההון הכולל שמופקד בפרוטוקולי DeFi." },
  { term: "ETF", termHe: "ETF", definition: "Exchange-Traded Fund — a regulated investment product. Bitcoin and Ethereum ETFs are key market catalysts.", definitionHe: "קרן סל — מוצר השקעה מוסדר. ETFs של Bitcoin ו-Ethereum הם קטליסטורים שוקיים מרכזיים." },
  { term: "KYC/AML", termHe: "KYC/AML", definition: "Know Your Customer / Anti-Money Laundering — regulatory compliance requirements.", definitionHe: "הכר את הלקוח / מניעת הלבנת הון — דרישות ציות רגולטוריות." },
  { term: "Tokenization", termHe: "טוקניזציה", definition: "The process of converting real-world assets into blockchain-based tokens.", definitionHe: "תהליך המרת נכסים מהעולם האמיתי לטוקנים מבוססי בלוקצ'יין." },
];

// === מסלולי ניווט מומלצים ===

export interface NavigationFlow {
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  routes: string[];
  timeEstimate: string;
}

export const navigationFlows: NavigationFlow[] = [
  {
    name: "Quick Overview (5 minutes)",
    nameHe: "סקירה מהירה (5 דקות)",
    description: "Get the essential picture of what TAMS is and why it matters.",
    descriptionHe: "קבל את התמונה החיונית של מה זה TAMS ולמה זה חשוב.",
    routes: ["/", "/strategy", "/proof"],
    timeEstimate: "5 min",
  },
  {
    name: "Full Investor Journey",
    nameHe: "מסע משקיע מלא",
    description: "Complete walkthrough for a thorough understanding of the opportunity.",
    descriptionHe: "הדרכה מלאה להבנה מקיפה של ההזדמנות.",
    routes: ["/", "/company", "/market-shift", "/strategy", "/architecture", "/holdings", "/proof", "/investor"],
    timeEstimate: "20-30 min",
  },
  {
    name: "Due Diligence Path",
    nameHe: "מסלול בדיקת נאותות",
    description: "For investors who want to verify claims and understand the methodology.",
    descriptionHe: "למשקיעים שרוצים לאמת טענות ולהבין את המתודולוגיה.",
    routes: ["/methodology", "/proof", "/holdings", "/legal"],
    timeEstimate: "15 min",
  },
  {
    name: "Technical Deep Dive",
    nameHe: "צלילה טכנית",
    description: "For those interested in the infrastructure and DeFi mechanisms.",
    descriptionHe: "למתעניינים בתשתית ובמנגנוני DeFi.",
    routes: ["/architecture", "/defi", "/holdings"],
    timeEstimate: "10 min",
  },
];

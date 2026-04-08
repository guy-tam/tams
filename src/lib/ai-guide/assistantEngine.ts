// מנוע המדריך v2 — Q&A ישיר + התאמת ביטויים + intent מדויק
import {
  sitePages,
  topicMap,
  glossary,
  navigationFlows,
  type PageKnowledge,
  type TopicEntry,
} from "./siteKnowledge";

// === סוגי תשובות ===

export interface GuideResponse {
  answer: string;
  answerHe: string;
  relevantPages: { route: string; name: string; nameHe: string }[];
  suggestedFollowUp: string[];
  suggestedFollowUpHe: string[];
  category: "navigation" | "explanation" | "concept" | "orientation" | "glossary";
}

// === Q&A ישירים — התאמות מדויקות לשאלות נפוצות ===

interface DirectQA {
  patterns: string[];
  response: () => GuideResponse;
}

const directQAs: DirectQA[] = [
  // מה זה TAMS
  {
    patterns: ["what is tams", "מה זה tams", "מה זה טאמס"],
    response: () => ({
      answer: "**TAMS** (Tokenized Asset Management System) is an institutional-grade blockchain investment infrastructure.\n\nIt combines 3 strategies:\n• **Long-term holdings** — treasury appreciation through quality digital assets\n• **Active trading** — tactical position management\n• **DeFi yield** — protocol-based returns (4-12% target APY)\n\nThe portfolio holds **16 research-backed assets** across 7 categories, supported by **259 verified evidence records** from 125+ organizations worldwide.\n\nTAMS operates with a GP/LP fund structure, institutional custody (Ledger + Fordefi), and a 4-tier investor program from $10K to $1M+.",
      answerHe: "**TAMS** (Tokenized Asset Management System) היא תשתית השקעות בלוקצ'יין ברמה מוסדית.\n\nהיא משלבת 3 אסטרטגיות:\n• **החזקות ארוכות טווח** — ייסוף הון דרך נכסים דיגיטליים איכותיים\n• **מסחר אקטיבי** — ניהול פוזיציות טקטי\n• **תשואות DeFi** — תשואות מבוססות פרוטוקול (יעד 4-12% APY)\n\nהתיק מחזיק **16 נכסים מגובי מחקר** ב-7 קטגוריות, נתמך ב-**259 רשומות ראיות מאומתות** מ-125+ ארגונים ברחבי העולם.\n\nTAMS פועלת עם מבנה קרן GP/LP, משמורת מוסדית (Ledger + Fordefi), ותוכנית משקיעים בת 4 דרגות מ-$10K עד $1M+.",
      relevantPages: [
        { route: "/", name: "Home", nameHe: "דף הבית" },
        { route: "/company", name: "Company", nameHe: "חברה" },
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
      ],
      suggestedFollowUp: ["What is the investment strategy?", "Where should I start?", "How do I invest?"],
      suggestedFollowUpHe: ["מה אסטרטגיית ההשקעה?", "מאיפה כדאי להתחיל?", "איך משקיעים?"],
      category: "concept",
    }),
  },

  // אסטרטגיה
  {
    patterns: ["what is the strategy", "what is the investment strategy", "מה האסטרטגיה", "מה אסטרטגיית ההשקעה"],
    response: () => ({
      answer: "The **TAMS investment strategy** operates through a **6-engine business model**:\n\n• **Treasury Holding** — long-term appreciation of quality assets\n• **DeFi Yield** — protocol-based returns (4-12% APY)\n• **Active Trading** — tactical alpha generation\n• **Conviction Rotation** — dynamic portfolio rebalancing\n• **Risk-Managed Allocation** — disciplined positioning\n• **Infrastructure Participation** — ecosystem rewards\n\n**Market sizing:**\n• TAM: $2-3T\n• SAM: $300-500B\n• SOM: $25-75M\n\nThe strategy is backed by a **market underpricing thesis** — blockchain infrastructure is currently undervalued relative to its potential.\n\nSee the full details on the **Strategy** page.",
      answerHe: "**אסטרטגיית ההשקעה של TAMS** פועלת דרך **מודל עסקי 6-מנועי**:\n\n• **החזקת אוצר** — ייסוף ארוך טווח של נכסים איכותיים\n• **תשואות DeFi** — תשואות מבוססות פרוטוקול (4-12% APY)\n• **מסחר אקטיבי** — יצירת אלפא טקטי\n• **רוטציית שכנוע** — איזון מחדש דינמי של התיק\n• **הקצאה מנוהלת סיכון** — מיקום ממושמע\n• **השתתפות בתשתית** — תגמולי אקו-סיסטם\n\n**גודל שוק:**\n• TAM: $2-3T\n• SAM: $300-500B\n• SOM: $25-75M\n\nהאסטרטגיה מגובה ב**תזת תמחור חסר** — תשתית בלוקצ'יין מתומחרת כרגע בחסר ביחס לפוטנציאל שלה.\n\nראה את כל הפרטים בעמוד **אסטרטגיה**.",
      relevantPages: [
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
        { route: "/market-shift", name: "Market Shift", nameHe: "מהפך שוק" },
      ],
      suggestedFollowUp: ["What is the TAM?", "What are the scenarios?", "Where is the evidence?"],
      suggestedFollowUpHe: ["מה ה-TAM?", "מה התרחישים?", "איפה הראיות?"],
      category: "concept",
    }),
  },

  // מודל עסקי
  {
    patterns: ["business model", "what is the business model", "מודל עסקי", "מה המודל העסקי"],
    response: () => ({
      answer: "The TAMS **business model** generates returns through **6 parallel value engines**:\n\n1. **Treasury Holding** — long-term asset appreciation (40% of portfolio)\n2. **DeFi Yield Deployment** — lending, staking, LP (25% allocation, 4-12% APY target)\n3. **Active Trading** — tactical positions and alpha (25% allocation)\n4. **Conviction Basket Rotation** — dynamic rebalancing based on thesis changes\n5. **Risk-Managed Allocation** — disciplined position sizing with strict limits\n6. **Infrastructure Participation** — staking, governance, ecosystem rewards\n\nPortfolio: **32% precious metals** (gold, silver, copper) + **68% digital assets** across 7 categories.\n\nFull details on the **Strategy** page (/strategy).",
      answerHe: "**המודל העסקי** של TAMS מייצר תשואות דרך **6 מנועי ערך מקבילים**:\n\n1. **החזקת אוצר** — ייסוף נכסים ארוך טווח (40% מהתיק)\n2. **פריסת תשואות DeFi** — הלוואות, סטייקינג, LP (הקצאה 25%, יעד 4-12% APY)\n3. **מסחר אקטיבי** — פוזיציות טקטיות ואלפא (הקצאה 25%)\n4. **רוטציית סל שכנוע** — איזון מחדש דינמי לפי שינויי תזה\n5. **הקצאה מנוהלת סיכון** — גודל פוזיציה ממושמע עם מגבלות קפדניות\n6. **השתתפות בתשתית** — סטייקינג, ממשל, תגמולי אקו-סיסטם\n\nתיק: **32% מתכות יקרות** (זהב, כסף, נחושת) + **68% נכסים דיגיטליים** ב-7 קטגוריות.\n\nכל הפרטים בעמוד **אסטרטגיה** (/strategy).",
      relevantPages: [
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
        { route: "/architecture", name: "Architecture", nameHe: "ארכיטקטורה" },
      ],
      suggestedFollowUp: ["What are the competitive advantages?", "How does the wallet architecture work?", "What are the scenarios?"],
      suggestedFollowUpHe: ["מה היתרונות התחרותיים?", "איך עובדת ארכיטקטורת הארנקים?", "מה התרחישים?"],
      category: "concept",
    }),
  },

  // תזה / thesis
  {
    patterns: ["what is the thesis", "core thesis", "מה התזה", "תזה מרכזית"],
    response: () => ({
      answer: "The **TAMS core thesis** is that **blockchain infrastructure is massively undervalued** relative to the value it will capture as institutions adopt it.\n\n**Key arguments:**\n• The market prices speculation, not infrastructure utility\n• Tokenization will expand the TAM by $16T+\n• Institutional adoption is at an inflection point (ETFs, regulatory clarity, corporate treasury adoption)\n• Settlement modernization is an invisible but massive opportunity\n• The risk/reward is **asymmetrically favorable** — limited downside with transformative upside\n\nTAMS positions itself at the infrastructure layer, not the speculation layer. See **Market Shift** for timing and **Strategy** for the full framework.",
      answerHe: "**התזה המרכזית של TAMS** היא ש**תשתית בלוקצ'יין מתומחרת בחסר משמעותי** ביחס לערך שהיא תתפוס כשמוסדות יאמצו אותה.\n\n**טיעונים מרכזיים:**\n• השוק מתמחר ספקולציה, לא תועלת תשתית\n• טוקניזציה תרחיב את ה-TAM ב-$16T+\n• אימוץ מוסדי בנקודת הטיה (ETFs, בהירות רגולטורית, אימוץ אוצר תאגידי)\n• מודרניזציית סליקה היא הזדמנות בלתי נראית אך עצומה\n• הסיכון/תגמול **א-סימטרי לטובה** — חסרון מוגבל עם עלייה טרנספורמטיבית\n\nTAMS ממקמת עצמה בשכבת התשתית, לא בשכבת הספקולציה. ראה **מהפך שוק** לתזמון ו**אסטרטגיה** למסגרת המלאה.",
      relevantPages: [
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
        { route: "/market-shift", name: "Market Shift", nameHe: "מהפך שוק" },
        { route: "/proof", name: "Proof", nameHe: "הוכחות" },
      ],
      suggestedFollowUp: ["Why invest now?", "What evidence supports this?", "What are the market catalysts?"],
      suggestedFollowUpHe: ["למה להשקיע עכשיו?", "אילו ראיות תומכות?", "מה הקטליסטורים?"],
      category: "concept",
    }),
  },

  // ראיות / הוכחות
  {
    patterns: ["evidence", "proof", "show me the evidence", "הוכחות", "ראיות", "תראה לי את הראיות", "כמה רשומות ראיות"],
    response: () => ({
      answer: "The **Proof** page contains the full evidence base:\n\n• **259 verified evidence records** across 16 assets\n• **125+ unique organizations** cited\n• **50+ countries** covered\n• Evidence classified by **confidence tiers** (High / Medium / Low)\n\n**What you can do there:**\n• Browse the **Asset Thesis Grid** — scoring and thesis alignment per asset\n• Use the **Evidence Explorer** — filter by asset, organization, geography, confidence\n• See **Adoption Coverage** — global distribution of institutional evidence\n\n**Evidence hierarchy:**\n• Tier 1: Official reports, government announcements, peer-reviewed papers\n• Tier 2: Research firm analysis, financial media\n• Tier 3 (excluded): Unverified social media, speculation\n\nGo to **/proof** to explore.",
      answerHe: "עמוד **הוכחות** מכיל את כל בסיס הראיות:\n\n• **259 רשומות ראיות מאומתות** על פני 16 נכסים\n• **125+ ארגונים ייחודיים** מצוטטים\n• **50+ מדינות** מכוסות\n• ראיות מסווגות לפי **רמות ביטחון** (גבוה / בינוני / נמוך)\n\n**מה אפשר לעשות שם:**\n• לגלוש ב**רשת תזות הנכסים** — ניקוד והתאמת תזה לכל נכס\n• להשתמש ב**סייר הראיות** — סינון לפי נכס, ארגון, גיאוגרפיה, ביטחון\n• לראות **כיסוי אימוץ** — פיזור גלובלי של ראיות מוסדיות\n\n**היררכיית ראיות:**\n• שכבה 1: דוחות רשמיים, הכרזות ממשלתיות, מאמרים אקדמיים\n• שכבה 2: ניתוחי חברות מחקר, מדיה פיננסית\n• שכבה 3 (לא נכלל): מדיה חברתית לא מאומתת, ספקולציה\n\nעבור ל-**/proof** כדי לחקור.",
      relevantPages: [
        { route: "/proof", name: "Proof", nameHe: "הוכחות" },
        { route: "/methodology", name: "Methodology", nameHe: "מתודולוגיה" },
      ],
      suggestedFollowUp: ["How is evidence verified?", "What is the methodology?", "How many assets?"],
      suggestedFollowUpHe: ["איך הראיות מאומתות?", "מה המתודולוגיה?", "כמה נכסים?"],
      category: "concept",
    }),
  },

  // איך משקיעים
  {
    patterns: ["how do i invest", "how to invest", "איך משקיעים", "איך להשקיע", "how can i invest"],
    response: () => ({
      answer: "To invest with TAMS:\n\n**1. Review the opportunity:**\nStart with **Strategy** → **Proof** → **Investor** pages.\n\n**2. Choose your tier:**\n• **Explorer**: $10,000 — community access, monthly reports\n• **Builder**: $50,000 — weekly briefings, priority access\n• **Architect**: $250,000 — personalized reviews, strategic advisory\n• **Visionary**: $1,000,000 — governance participation, board observer rights\n\n**3. Request access:**\nGo to **/access** to submit a confidential review request. Choose your investor type and investment range.\n\n**4. Team response:**\nThe team responds within **48 hours** for a confidential discussion.\n\n**Contact:** contact@tams.earth",
      answerHe: "כדי להשקיע עם TAMS:\n\n**1. סקירת ההזדמנות:**\nהתחל עם עמודי **אסטרטגיה** → **הוכחות** → **משקיעים**.\n\n**2. בחר את הדרגה שלך:**\n• **Explorer**: $10,000 — גישה לקהילה, דוחות חודשיים\n• **Builder**: $50,000 — תדריכים שבועיים, גישה בעדיפות\n• **Architect**: $250,000 — סקירות מותאמות, ייעוץ אסטרטגי\n• **Visionary**: $1,000,000 — השתתפות בממשל, זכויות צפייה בדירקטוריון\n\n**3. בקש גישה:**\nעבור ל-**/access** כדי להגיש בקשה לסקירה חסויה. בחר את סוג המשקיע וטווח ההשקעה.\n\n**4. תגובת הצוות:**\nהצוות מגיב תוך **48 שעות** לדיון חסוי.\n\n**קשר:** contact@tams.earth",
      relevantPages: [
        { route: "/investor", name: "Investor", nameHe: "משקיעים" },
        { route: "/access", name: "Access", nameHe: "גישה פרטית" },
      ],
      suggestedFollowUp: ["What are the risks?", "What is the strategy?", "Show me the evidence"],
      suggestedFollowUpHe: ["מה הסיכונים?", "מה האסטרטגיה?", "תראה לי את הראיות"],
      category: "concept",
    }),
  },

  // דרגות משקיעים
  {
    patterns: ["investor tiers", "what are the tiers", "מה הדרגות", "דרגות משקיעים", "מה דרגות המשקיעים"],
    response: () => ({
      answer: "TAMS has **4 investor tiers** with escalating access:\n\n• **Explorer** ($10,000) — Community access, monthly reports\n• **Builder** ($50,000) — Weekly briefings, priority access to new features\n• **Architect** ($250,000) — Personalized portfolio reviews, strategic advisory\n• **Visionary** ($1,000,000) — Governance participation, board observer rights\n\nAll tiers include access to the investor dashboard with real-time portfolio tracking.\n\nSubmit a request at **/access** to begin.",
      answerHe: "ל-TAMS יש **4 דרגות משקיעים** עם גישה עולה:\n\n• **Explorer** ($10,000) — גישה לקהילה, דוחות חודשיים\n• **Builder** ($50,000) — תדריכים שבועיים, גישה בעדיפות לפיצ'רים חדשים\n• **Architect** ($250,000) — סקירות תיק מותאמות אישית, ייעוץ אסטרטגי\n• **Visionary** ($1,000,000) — השתתפות בממשל, זכויות צפייה בדירקטוריון\n\nכל הדרגות כוללות גישה לדשבורד משקיעים עם מעקב תיק בזמן אמת.\n\nהגש בקשה ב-**/access** כדי להתחיל.",
      relevantPages: [
        { route: "/investor", name: "Investor", nameHe: "משקיעים" },
        { route: "/access", name: "Access", nameHe: "גישה פרטית" },
      ],
      suggestedFollowUp: ["How do I invest?", "What are the risks?", "What is in the dashboard?"],
      suggestedFollowUpHe: ["איך משקיעים?", "מה הסיכונים?", "מה יש בדשבורד?"],
      category: "concept",
    }),
  },

  // סיכונים
  {
    patterns: ["what are the risks", "risk", "risks", "מה הסיכונים", "סיכונים"],
    response: () => ({
      answer: "TAMS transparently discloses **6 risk categories**:\n\n• **Market volatility** — extreme price swings in digital assets\n• **Regulatory risk** — changing regulations across jurisdictions\n• **Technology risk** — smart contract bugs, security vulnerabilities\n• **Liquidity risk** — inability to sell/convert at desired price\n• **Access loss risk** — lost keys mean lost assets\n• **Counterparty risk** — third-party solvency issues\n\n**Important:** TAMS is **not investment advice**. Past performance does not guarantee future results. All information is for research purposes only.\n\nFull risk disclosure on the **Investor** and **Legal** pages.",
      answerHe: "TAMS חושפת בשקיפות **6 קטגוריות סיכון**:\n\n• **תנודתיות שוק** — תנודות מחירים קיצוניות בנכסים דיגיטליים\n• **סיכון רגולטורי** — שינויי רגולציה בין תחומי שיפוט\n• **סיכון טכנולוגי** — באגים בחוזים חכמים, פגיעויות אבטחה\n• **סיכון נזילות** — חוסר יכולת למכור/להמיר במחיר רצוי\n• **סיכון אובדן גישה** — מפתחות שאבדו = נכסים שאבדו\n• **סיכון צד שכנגד** — בעיות כושר פירעון של צד שלישי\n\n**חשוב:** TAMS **אינה ייעוץ השקעות**. ביצועי עבר אינם מבטיחים תוצאות עתידיות. כל המידע למטרות מחקר בלבד.\n\nגילוי סיכונים מלא בעמודי **משקיעים** ו**משפטי**.",
      relevantPages: [
        { route: "/investor", name: "Investor", nameHe: "משקיעים" },
        { route: "/legal", name: "Legal", nameHe: "משפטי" },
      ],
      suggestedFollowUp: ["How is risk managed?", "What is the methodology?", "How do I invest?"],
      suggestedFollowUpHe: ["איך מנוהל סיכון?", "מה המתודולוגיה?", "איך משקיעים?"],
      category: "concept",
    }),
  },

  // למה עכשיו
  {
    patterns: ["why now", "why invest now", "למה עכשיו", "למה להשקיע עכשיו"],
    response: () => ({
      answer: "**Why now?** Six major catalysts are converging:\n\n1. **ETF Approvals** — Bitcoin & Ethereum ETFs opening institutional access\n2. **Regulatory Clarity** — clearer frameworks globally\n3. **Corporate Treasury Adoption** — companies adding crypto to balance sheets\n4. **RWA Tokenization** — $16T+ potential in tokenized real-world assets\n5. **DeFi Maturation** — institutional-grade protocols emerging\n6. **Infrastructure Growth** — blockchain infrastructure becoming enterprise-ready\n\n**Massive addressable markets:**\n• Cross-border payments: $1,000T\n• Managed assets: $147T\n• Pension funds: $58.5T\n\nFull analysis on the **Market Shift** page (/market-shift).",
      answerHe: "**למה עכשיו?** שישה קטליסטורים מרכזיים מתכנסים:\n\n1. **אישורי ETF** — ETFs של Bitcoin ו-Ethereum פותחים גישה מוסדית\n2. **בהירות רגולטורית** — מסגרות ברורות יותר גלובלית\n3. **אימוץ אוצר תאגידי** — חברות מוסיפות קריפטו למאזנים\n4. **טוקניזציית RWA** — פוטנציאל $16T+ בנכסים מטוקניים\n5. **הבשלת DeFi** — פרוטוקולים ברמה מוסדית צצים\n6. **צמיחת תשתית** — תשתית בלוקצ'יין הופכת מוכנה לארגונים\n\n**שווקים עצומים ניתנים לגישה:**\n• תשלומים בינלאומיים: $1,000T\n• נכסים מנוהלים: $147T\n• קרנות פנסיה: $58.5T\n\nניתוח מלא בעמוד **מהפך שוק** (/market-shift).",
      relevantPages: [
        { route: "/market-shift", name: "Market Shift", nameHe: "מהפך שוק" },
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
      ],
      suggestedFollowUp: ["What is the TAM?", "What is the strategy?", "Show me the evidence"],
      suggestedFollowUpHe: ["מה ה-TAM?", "מה האסטרטגיה?", "תראה לי את הראיות"],
      category: "concept",
    }),
  },

  // DeFi
  {
    patterns: ["what is defi", "defi strategy", "defi strategies", "אסטרטגיות defi", "מה זה defi", "מה ה-defi"],
    response: () => ({
      answer: "**TAMS DeFi strategy** targets **4-12% APY** through:\n\n• **Lending** — Aave, Compound protocols\n• **Staking** — native and liquid staking\n• **Liquidity Pools** — Uniswap, Curve\n• **Optimization** — dynamic rebalancing across chains\n\n**Risk controls:**\n• Max **10% exposure** per protocol\n• **25%** of total portfolio in DeFi\n• Smart contract audit requirements\n• Multi-chain diversification (3+ chains)\n• Liquidation protection mechanisms\n\nFull details on the **DeFi** page (/defi).",
      answerHe: "**אסטרטגיית DeFi של TAMS** מכוונת ל-**4-12% APY** דרך:\n\n• **הלוואות** — פרוטוקולי Aave, Compound\n• **סטייקינג** — סטייקינג מקורי ונזיל\n• **מאגרי נזילות** — Uniswap, Curve\n• **אופטימיזציה** — איזון מחדש דינמי בין רשתות\n\n**בקרות סיכון:**\n• חשיפה מקסימלית **10%** לפרוטוקול\n• **25%** מהתיק הכולל ב-DeFi\n• דרישות ביקורת חוזים חכמים\n• פיזור רב-שרשרתי (3+ רשתות)\n• מנגנוני הגנה מחיסול\n\nכל הפרטים בעמוד **DeFi** (/defi).",
      relevantPages: [
        { route: "/defi", name: "DeFi", nameHe: "DeFi" },
        { route: "/architecture", name: "Architecture", nameHe: "ארכיטקטורה" },
      ],
      suggestedFollowUp: ["What is the target APY?", "How are wallets structured?", "What assets are held?"],
      suggestedFollowUpHe: ["מה יעד ה-APY?", "מה מבנה הארנקים?", "אילו נכסים מוחזקים?"],
      category: "concept",
    }),
  },

  // כמה נכסים
  {
    patterns: ["how many assets", "כמה נכסים", "what assets", "אילו נכסים", "portfolio assets"],
    response: () => ({
      answer: "The TAMS portfolio holds **16 research-backed assets** across **7 categories**:\n\n• **Payments & Routing** (27%) — XRP, XLM, XDC\n• **Smart Contracts** (36%) — SOL, ADA, AVAX, HBAR, ONDO, HOLO\n• **Data & Connectivity** (14%) — LINK, QNT, FLR\n• **Scaling Solutions** (7%) — MATIC, ARB\n• **Storage & Data** (7%) — FIL, AR\n• **DeFi Protocols** (14%) — AAVE, MKR\n• **Precious Metals** (32%) — Gold, Silver, Copper\n\nEach asset is selected based on 5 criteria: financial relevance, institutional adoption, regulatory clarity, technology maturity, and ecosystem strength.\n\nExplore on the **Holdings** page (/holdings).",
      answerHe: "תיק TAMS מחזיק **16 נכסים מגובי מחקר** ב-**7 קטגוריות**:\n\n• **תשלומים וניתוב** (27%) — XRP, XLM, XDC\n• **חוזים חכמים** (36%) — SOL, ADA, AVAX, HBAR, ONDO, HOLO\n• **נתונים וקישוריות** (14%) — LINK, QNT, FLR\n• **פתרונות סקלביליות** (7%) — MATIC, ARB\n• **אחסון ונתונים** (7%) — FIL, AR\n• **פרוטוקולי DeFi** (14%) — AAVE, MKR\n• **מתכות יקרות** (32%) — זהב, כסף, נחושת\n\nכל נכס נבחר לפי 5 קריטריונים: רלוונטיות פיננסית, אימוץ מוסדי, בהירות רגולטורית, בשלות טכנולוגית וחוסן אקו-סיסטם.\n\nחקור בעמוד **החזקות** (/holdings).",
      relevantPages: [
        { route: "/holdings", name: "Holdings", nameHe: "החזקות" },
        { route: "/architecture", name: "Architecture", nameHe: "ארכיטקטורה" },
      ],
      suggestedFollowUp: ["How are assets selected?", "What is the allocation?", "What is the methodology?"],
      suggestedFollowUpHe: ["איך נבחרים נכסים?", "מה ההקצאה?", "מה המתודולוגיה?"],
      category: "concept",
    }),
  },

  // ארכיטקטורה / ארנקים
  {
    patterns: ["wallet structure", "wallets", "how are the wallets structured", "מבנה הארנקים", "מה מבנה הארנקים", "ארנקים"],
    response: () => ({
      answer: "TAMS uses a **4-wallet architecture**:\n\n• **Long-Term Holdings** (40%) — treasury strategy, quality asset appreciation\n• **Active Trading** (25%) — tactical positions and alpha generation\n• **DeFi Yield** (25%) — protocol integration for yield (4-12% APY)\n• **Operations** (10%) — gas reserves, buffers, operational needs\n\nAll managed under a **Master Wallet** (TAMS allocation controller) with:\n• **Ledger Flex** hardware custody\n• **Fordefi** institutional management platform\n• **Multi-sig** approval for all transactions\n\nSee the full diagram on the **Architecture** page (/architecture).",
      answerHe: "TAMS משתמשת ב**ארכיטקטורת 4 ארנקים**:\n\n• **החזקות ארוכות טווח** (40%) — אסטרטגיית אוצר, ייסוף נכסים איכותיים\n• **מסחר אקטיבי** (25%) — פוזיציות טקטיות ויצירת אלפא\n• **תשואות DeFi** (25%) — אינטגרציית פרוטוקולים לתשואה (4-12% APY)\n• **תפעול** (10%) — רזרבות gas, מאגרים, צרכים תפעוליים\n\nהכל מנוהל תחת **ארנק מאסטר** (בקר הקצאות TAMS) עם:\n• משמורת חומרתית **Ledger Flex**\n• פלטפורמת ניהול מוסדית **Fordefi**\n• אישור **Multi-sig** לכל עסקה\n\nראה את התרשים המלא בעמוד **ארכיטקטורה** (/architecture).",
      relevantPages: [
        { route: "/architecture", name: "Architecture", nameHe: "ארכיטקטורה" },
        { route: "/company", name: "Company", nameHe: "חברה" },
      ],
      suggestedFollowUp: ["What is the portfolio allocation?", "What about DeFi?", "What are the assets?"],
      suggestedFollowUpHe: ["מה הקצאת התיק?", "מה עם DeFi?", "מה הנכסים?"],
      category: "concept",
    }),
  },

  // TAM
  {
    patterns: ["what is the tam", "tam sam som", "market size", "מה ה-tam", "גודל שוק"],
    response: () => ({
      answer: "**TAMS market sizing:**\n\n• **TAM** (Total Addressable Market): **$2-3 Trillion** — the full blockchain infrastructure and digital asset management market\n• **SAM** (Serviceable Addressable Market): **$300-500 Billion** — the institutional segment TAMS can reach\n• **SOM** (Serviceable Obtainable Market): **$25-75 Million** — the realistic near-term target\n\nThe thesis argues blockchain infrastructure captures value from:\n• Cross-border payments ($1,000T market)\n• Managed assets ($147T)\n• Pension funds ($58.5T)\n• Tokenized real estate ($4.3T)\n\nDetails on the **Strategy** page (/strategy).",
      answerHe: "**גודל שוק TAMS:**\n\n• **TAM** (שוק כולל ניתן לגישה): **$2-3 טריליון** — שוק תשתית הבלוקצ'יין וניהול הנכסים הדיגיטליים המלא\n• **SAM** (שוק ניתן לשירות): **$300-500 מיליארד** — הפלח המוסדי ש-TAMS יכולה להגיע אליו\n• **SOM** (שוק ניתן להשגה): **$25-75 מיליון** — היעד הריאלי לטווח הקרוב\n\nהתזה טוענת שתשתית בלוקצ'יין לוכדת ערך מ:\n• תשלומים בינלאומיים (שוק $1,000T)\n• נכסים מנוהלים ($147T)\n• קרנות פנסיה ($58.5T)\n• נדל\"ן מטוקנייז ($4.3T)\n\nפרטים בעמוד **אסטרטגיה** (/strategy).",
      relevantPages: [
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
        { route: "/market-shift", name: "Market Shift", nameHe: "מהפך שוק" },
      ],
      suggestedFollowUp: ["What are the scenarios?", "Why invest now?", "What is the business model?"],
      suggestedFollowUpHe: ["מה התרחישים?", "למה להשקיע עכשיו?", "מה המודל העסקי?"],
      category: "concept",
    }),
  },

  // חזון
  {
    patterns: ["what is the vision", "vision", "מה החזון", "חזון"],
    response: () => ({
      answer: "**TAMS Vision:** Build the leading institutional blockchain investment infrastructure — bridging crypto with capital markets standards.\n\n**TAMS Mission:** Provide professional infrastructure for digital asset management — deep research, advanced trading, rigorous risk management, comprehensive compliance, and full transparency.\n\n**Four core principles:**\n1. Research-Driven Analysis\n2. Risk-First Management\n3. Institutional Discipline\n4. Transparency & Communication\n\nFull details on the **Company** page (/company).",
      answerHe: "**חזון TAMS:** בניית תשתית ההשקעות המובילה בבלוקצ'יין למוסדיים — גישור בין קריפטו לסטנדרטים של שוק ההון.\n\n**משימת TAMS:** מתן תשתית מקצועית לניהול נכסים דיגיטליים — מחקר עמוק, מסחר מתקדם, ניהול סיכונים קפדני, ציות מקיף ושקיפות מלאה.\n\n**ארבעה עקרונות מרכזיים:**\n1. ניתוח מבוסס מחקר\n2. ניהול סיכונים ראשוני\n3. משמעת מוסדית\n4. שקיפות ותקשורת\n\nכל הפרטים בעמוד **חברה** (/company).",
      relevantPages: [
        { route: "/company", name: "Company", nameHe: "חברה" },
        { route: "/team", name: "Team", nameHe: "צוות" },
      ],
      suggestedFollowUp: ["Who is on the team?", "What is the strategy?", "How is the fund structured?"],
      suggestedFollowUpHe: ["מי בצוות?", "מה האסטרטגיה?", "מה מבנה הקרן?"],
      category: "concept",
    }),
  },

  // מתודולוגיה
  {
    patterns: ["methodology", "how are assets selected", "research process", "מתודולוגיה", "איך נבחרים נכסים", "תהליך מחקר"],
    response: () => ({
      answer: "**TAMS Research Methodology:**\n\n**Asset Selection** (5 criteria):\n1. Financial Infrastructure Relevance\n2. Institutional Adoption Evidence\n3. Regulatory Clarity\n4. Technology Maturity\n5. Ecosystem Strength\n\n**Evidence Classification:**\n• Tier 1 (Primary): Official reports, government docs, peer-reviewed papers\n• Tier 2 (Secondary): Research firms, financial media\n• Tier 3 (Excluded): Social media, speculation\n\n**Portfolio Rules:**\n• Max 20% per category, 15% per asset\n• Min 4 thesis categories\n• Full quarterly reassessment\n\n**Risk Scoring** (4 dimensions): Financial Relevance, Adoption Maturity, Ecosystem Strength, Verification Confidence\n\nFull framework on the **Methodology** page (/methodology).",
      answerHe: "**מתודולוגיית המחקר של TAMS:**\n\n**בחירת נכסים** (5 קריטריונים):\n1. רלוונטיות לתשתית פיננסית\n2. ראיות אימוץ מוסדי\n3. בהירות רגולטורית\n4. בשלות טכנולוגית\n5. חוסן אקו-סיסטם\n\n**סיווג ראיות:**\n• שכבה 1 (ראשוני): דוחות רשמיים, מסמכי ממשלה, מאמרים אקדמיים\n• שכבה 2 (משני): חברות מחקר, מדיה פיננסית\n• שכבה 3 (לא נכלל): מדיה חברתית, ספקולציה\n\n**כללי תיק:**\n• מקסימום 20% לקטגוריה, 15% לנכס\n• מינימום 4 קטגוריות תזה\n• הערכה מחדש רבעונית מלאה\n\n**ניקוד סיכון** (4 ממדים): רלוונטיות פיננסית, בשלות אימוץ, חוסן אקו-סיסטם, ביטחון אימות\n\nהמסגרת המלאה בעמוד **מתודולוגיה** (/methodology).",
      relevantPages: [
        { route: "/methodology", name: "Methodology", nameHe: "מתודולוגיה" },
        { route: "/proof", name: "Proof", nameHe: "הוכחות" },
      ],
      suggestedFollowUp: ["How many evidence records?", "How many assets?", "What are the risks?"],
      suggestedFollowUpHe: ["כמה רשומות ראיות?", "כמה נכסים?", "מה הסיכונים?"],
      category: "concept",
    }),
  },

  // דשבורד
  {
    patterns: ["what is the dashboard", "dashboard", "דשבורד", "מה יש בדשבורד", "מה הדשבורד"],
    response: () => ({
      answer: "The **Investor Dashboard** (accessible after login) provides:\n\n• **Portfolio Overview** — total value, daily/weekly/monthly returns\n• **Holdings View** — 16 assets with allocation %, P&L per asset\n• **DeFi Positions** — active yield positions with APY tracking\n• **Performance Analytics** — 12-month history charts\n• **Transaction Activity** — transaction log with 10+ types\n• **Wallet Balances** — breakdown by 4 wallet divisions\n\nIt's a **Bloomberg-style** real-time tracking interface.\n\nAccess via **/login** or the Investor Portal button in the sidebar.",
      answerHe: "**דשבורד המשקיעים** (נגיש לאחר התחברות) מספק:\n\n• **סקירת תיק** — ערך כולל, תשואות יומיות/שבועיות/חודשיות\n• **תצוגת החזקות** — 16 נכסים עם אחוזי הקצאה, רווח/הפסד לנכס\n• **פוזיציות DeFi** — פוזיציות תשואה פעילות עם מעקב APY\n• **ניתוח ביצועים** — גרפים של היסטוריית 12 חודשים\n• **פעילות עסקאות** — יומן עסקאות עם 10+ סוגים\n• **יתרות ארנקים** — פירוט לפי 4 חטיבות ארנק\n\nזהו ממשק מעקב בזמן אמת **בסגנון Bloomberg**.\n\nגישה דרך **/login** או כפתור פורטל המשקיעים בסרגל הצד.",
      relevantPages: [
        { route: "/dashboard", name: "Dashboard", nameHe: "דשבורד" },
      ],
      suggestedFollowUp: ["How do I invest?", "What are the investor tiers?", "What assets are in the portfolio?"],
      suggestedFollowUpHe: ["איך משקיעים?", "מה דרגות המשקיעים?", "אילו נכסים בתיק?"],
      category: "concept",
    }),
  },

  // תרחישים
  {
    patterns: ["scenarios", "what are the scenarios", "תרחישים", "מה התרחישים"],
    response: () => ({
      answer: "TAMS models **3 adoption scenarios**:\n\n1. **Conservative Adoption** — baseline growth, slow institutional inflows\n2. **Moderate Adoption** — expected trajectory, steady institutional participation\n3. **Accelerated Adoption** — bull case, rapid institutional inflows driven by ETFs and regulatory clarity\n\nEach scenario projects portfolio performance based on different adoption rates, market conditions, and catalyst timing.\n\nThe full scenario model is on the **Strategy** page (/strategy).",
      answerHe: "TAMS מדגמנת **3 תרחישי אימוץ**:\n\n1. **אימוץ שמרני** — צמיחת בסיס, כניסות מוסדיות איטיות\n2. **אימוץ מתון** — מסלול צפוי, השתתפות מוסדית יציבה\n3. **אימוץ מואץ** — מקרה שורי, כניסות מוסדיות מהירות מונעות ETFs ובהירות רגולטורית\n\nכל תרחיש מקרין ביצועי תיק לפי שיעורי אימוץ שונים, תנאי שוק ותזמון קטליסטורים.\n\nמודל התרחישים המלא בעמוד **אסטרטגיה** (/strategy).",
      relevantPages: [
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
      ],
      suggestedFollowUp: ["What is the TAM?", "What are the competitive advantages?", "What is the business model?"],
      suggestedFollowUpHe: ["מה ה-TAM?", "מה היתרונות התחרותיים?", "מה המודל העסקי?"],
      category: "concept",
    }),
  },

  // יתרונות תחרותיים
  {
    patterns: ["competitive advantages", "what makes tams different", "יתרונות תחרותיים", "מה מבדיל את tams"],
    response: () => ({
      answer: "**TAMS competitive advantages:**\n\n1. **Market Clarity** — structured understanding of blockchain infrastructure vs. speculation\n2. **Multi-Strategy Approach** — 6 parallel value engines, not single-vector\n3. **Investor Mindset** — institutional discipline, not retail speculation\n4. **Timing & Execution** — positioned at the institutional adoption inflection point\n\nUnlike typical crypto funds, TAMS focuses on **infrastructure utility**, not hype. The 259 evidence records and 3-tier methodology demonstrate rigorous, research-backed selection.\n\nDetails on the **Strategy** page (/strategy).",
      answerHe: "**היתרונות התחרותיים של TAMS:**\n\n1. **בהירות שוק** — הבנה מובנית של תשתית בלוקצ'יין לעומת ספקולציה\n2. **גישה רב-אסטרטגית** — 6 מנועי ערך מקבילים, לא וקטור יחיד\n3. **חשיבת משקיע** — משמעת מוסדית, לא ספקולציה קמעונאית\n4. **תזמון וביצוע** — ממוקם בנקודת ההטיה של אימוץ מוסדי\n\nבניגוד לקרנות קריפטו טיפוסיות, TAMS מתמקדת ב**תועלת תשתית**, לא הייפ. 259 רשומות הראיות ומתודולוגיה 3-שכבתית מדגימות בחירה קפדנית מבוססת מחקר.\n\nפרטים בעמוד **אסטרטגיה** (/strategy).",
      relevantPages: [
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
        { route: "/proof", name: "Proof", nameHe: "הוכחות" },
      ],
      suggestedFollowUp: ["What is the business model?", "Show me the evidence", "How do I invest?"],
      suggestedFollowUpHe: ["מה המודל העסקי?", "תראה לי את הראיות", "איך משקיעים?"],
      category: "concept",
    }),
  },
];

// === חיפוש Q&A ישיר ===

function findDirectQA(query: string): GuideResponse | null {
  const q = query.toLowerCase().trim();
  for (const qa of directQAs) {
    for (const pattern of qa.patterns) {
      if (q === pattern || q.includes(pattern) || pattern.includes(q)) {
        return qa.response();
      }
    }
  }
  return null;
}

// === ניקוד רלוונטיות (משופר) ===

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "can", "shall", "to", "of", "in", "for",
  "on", "with", "at", "by", "from", "as", "into", "about", "it", "its",
  "this", "that", "these", "those", "my", "your", "his", "her", "our",
  "i", "me", "we", "you", "he", "she", "they", "them",
  "and", "or", "but", "if", "not", "no", "so", "up", "out",
  "של", "את", "על", "עם", "מה", "זה", "זו", "הם", "היא", "הוא",
  "אני", "לי", "שלי", "כל", "גם", "עוד", "אם", "לא", "כן", "טוב",
  "יש", "אין", "רק", "בין", "אל", "או",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[?!.,;:'"()\-–—\/]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function phraseMatch(query: string, phrases: string[]): number {
  const q = query.toLowerCase();
  let score = 0;
  for (const phrase of phrases) {
    if (q.includes(phrase.toLowerCase())) {
      // ביטוי מלא — ניקוד גבוה
      score += phrase.split(" ").length * 5;
    }
  }
  return score;
}

function matchScore(query: string, keywords: string[], phrases: string[] = []): number {
  let score = phraseMatch(query, phrases);

  const queryTokens = tokenize(query);
  for (const qt of queryTokens) {
    for (const kw of keywords) {
      const kwLower = kw.toLowerCase();
      if (kwLower === qt) {
        score += 3;
      } else if (kwLower.length > 3 && qt.length > 3) {
        // התאמה חלקית רק למילים ארוכות
        if (kwLower.includes(qt)) score += 1;
        else if (qt.includes(kwLower)) score += 1;
      }
    }
  }
  return score;
}

// === מציאת עמודים רלוונטיים ===

function findRelevantPages(query: string, currentRoute?: string): PageKnowledge[] {
  const scored = sitePages.map((page) => {
    // ביטויים שלמים — שם העמוד, שמות סעיפים
    const phrases = [
      page.name,
      page.nameHe,
      ...page.sections.map((s) => s.title),
      ...page.sections.map((s) => s.titleHe),
    ];
    // מילות מפתח בודדות
    const keywords = [...page.keywords];

    let score = matchScore(query, keywords, phrases);

    // בונוס אם שם העמוד מוזכר ישירות
    const q = query.toLowerCase();
    if (q.includes(page.name.toLowerCase()) || q.includes(page.nameHe)) {
      score += 10;
    }
    // בונוס קל לעמוד הנוכחי
    if (currentRoute && page.route === currentRoute) {
      score += 3;
    }
    return { page, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.page);
}

// === מציאת נושאים רלוונטיים ===

function findRelevantTopics(query: string): TopicEntry[] {
  const scored = topicMap.map((topic) => {
    const phrases = [topic.topic, topic.topicHe];
    const keywords = [...topic.keywords];
    return { topic, score: matchScore(query, keywords, phrases) };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((s) => s.topic);
}

// === זיהוי כוונה (משופר) ===

type Intent = "navigation" | "explanation" | "concept" | "orientation" | "glossary" | "general";

function detectIntent(query: string): Intent {
  const q = query.toLowerCase();

  // התמצאות — חייב לבוא ראשון
  const orientPhrases = [
    "where should i start", "new here", "first time", "guide me",
    "important pages", "5 minutes", "most important",
    "מאיפה להתחיל", "איפה להתחיל", "חדש כאן", "פעם ראשונה",
    "תדריך אותי", "הדרך אותי", "עמודים חשובים", "5 דקות",
  ];
  if (orientPhrases.some((p) => q.includes(p))) return "orientation";

  // הסבר עמוד — שאלות על "העמוד הזה"
  const explainPhrases = [
    "what is this page", "what am i seeing", "what does this page",
    "what is on this page", "explain this page", "what can i see here",
    "purpose of this", "what's on this page",
    "מה בעמוד הזה", "מה העמוד הזה", "מה אני רואה",
    "מה יש כאן", "תסביר את העמוד", "מה אני יכול לראות כאן",
    "מטרת העמוד",
  ];
  if (explainPhrases.some((p) => q.includes(p))) return "explanation";

  // ניווט — "איפה למצוא"
  const navPhrases = [
    "where can i find", "where is the", "where do i find", "take me to",
    "go to the", "navigate to", "show me the",
    "איפה אני מוצא", "איפה נמצא", "קח אותי ל", "איך מגיעים ל",
    "תראה לי את ה", "לגשת ל", "תפתח את",
  ];
  if (navPhrases.some((p) => q.includes(p))) return "navigation";

  // מונח מילון — "מה זה X" כשזה מונח קצר
  const glossaryMatch = glossary.find(
    (g) => q.includes(g.term.toLowerCase()) || q.includes(g.termHe.toLowerCase())
  );
  if (glossaryMatch) {
    const tokens = tokenize(query);
    const isShortDef = tokens.length <= 4 && (q.includes("what is") || q.includes("מה זה") || q.includes("define"));
    if (isShortDef) return "glossary";
  }

  // מושג — שאלות "מה" ו"איך" כלליות
  const conceptPhrases = [
    "what is the", "what are the", "how does", "how do", "why does",
    "difference between", "explain the",
    "מה זה", "מה ה", "איך עובד", "למה", "ההבדל בין", "תסביר את",
  ];
  if (conceptPhrases.some((p) => q.includes(p))) return "concept";

  return "general";
}

// === בניית תשובות (fallback — כשאין Q&A ישיר) ===

function buildPageAnswer(page: PageKnowledge, isNav: boolean): GuideResponse {
  const sectionsEn = page.sections.map((s) => `• **${s.title}** — ${s.meaning}`).join("\n");
  const sectionsHe = page.sections.map((s) => `• **${s.titleHe}** — ${s.meaningHe}`).join("\n");

  if (isNav) {
    return {
      answer: `You can find that on the **${page.name}** page at **${page.route}**.\n\n${page.purpose}\n\n**Sections:**\n${sectionsEn}`,
      answerHe: `תוכל למצוא את זה בעמוד **${page.nameHe}** בכתובת **${page.route}**.\n\n${page.purposeHe}\n\n**סעיפים:**\n${sectionsHe}`,
      relevantPages: [{ route: page.route, name: page.name, nameHe: page.nameHe }],
      suggestedFollowUp: [`What does the ${page.name} page show?`, "What should I view next?"],
      suggestedFollowUpHe: [`מה מציג עמוד ${page.nameHe}?`, "מה כדאי לצפות בהמשך?"],
      category: "navigation",
    };
  }

  return {
    answer: `**${page.name}** (${page.route})\n\n${page.purpose}\n\n**Investor Takeaway:** ${page.investorTakeaway}\n\n**Sections:**\n${sectionsEn}`,
    answerHe: `**${page.nameHe}** (${page.route})\n\n${page.purposeHe}\n\n**מסר למשקיע:** ${page.investorTakeawayHe}\n\n**סעיפים:**\n${sectionsHe}`,
    relevantPages: [
      { route: page.route, name: page.name, nameHe: page.nameHe },
      ...page.suggestedNext.slice(0, 2).map((r) => {
        const p = sitePages.find((sp) => sp.route === r);
        return { route: r, name: p?.name ?? r, nameHe: p?.nameHe ?? r };
      }),
    ],
    suggestedFollowUp: [
      ...(page.suggestedNext[0]
        ? [`What is the ${sitePages.find((p) => p.route === page.suggestedNext[0])?.name} page about?`]
        : []),
      "What is the investor takeaway?",
    ],
    suggestedFollowUpHe: [
      ...(page.suggestedNext[0]
        ? [`על מה עמוד ${sitePages.find((p) => p.route === page.suggestedNext[0])?.nameHe}?`]
        : []),
      "מה המסר למשקיע?",
    ],
    category: "explanation",
  };
}

function buildOrientationAnswer(): GuideResponse {
  const q = navigationFlows[0];
  const f = navigationFlows[1];
  const qr = q.routes.map((r) => sitePages.find((p) => p.route === r)?.name ?? r).join(" → ");
  const qrHe = q.routes.map((r) => sitePages.find((p) => p.route === r)?.nameHe ?? r).join(" → ");
  const fr = f.routes.map((r) => sitePages.find((p) => p.route === r)?.name ?? r).join(" → ");
  const frHe = f.routes.map((r) => sitePages.find((p) => p.route === r)?.nameHe ?? r).join(" → ");

  return {
    answer: `Welcome! Here are recommended paths:\n\n**${q.name}:**\n${qr}\n\n**${f.name}:**\n${fr}\n\nThe 3 most important pages for investors: **Strategy** (/strategy), **Proof** (/proof), **Investor** (/investor).\n\nStart with the homepage, then follow the path that fits your time.`,
    answerHe: `ברוכים הבאים! הנה מסלולים מומלצים:\n\n**${q.nameHe}:**\n${qrHe}\n\n**${f.nameHe}:**\n${frHe}\n\n3 העמודים החשובים ביותר למשקיעים: **אסטרטגיה** (/strategy), **הוכחות** (/proof), **משקיעים** (/investor).\n\nהתחל מדף הבית, ואז עקוב אחרי המסלול שמתאים לזמן שלך.`,
    relevantPages: [
      { route: "/", name: "Home", nameHe: "דף הבית" },
      { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
      { route: "/proof", name: "Proof", nameHe: "הוכחות" },
    ],
    suggestedFollowUp: ["What is TAMS?", "What is the strategy?", "Show me the evidence", "How do I invest?"],
    suggestedFollowUpHe: ["מה זה TAMS?", "מה האסטרטגיה?", "תראה לי את הראיות", "איך משקיעים?"],
    category: "orientation",
  };
}

function buildGlossaryAnswer(query: string): GuideResponse | null {
  const q = query.toLowerCase();
  const entry = glossary.find(
    (g) => q.includes(g.term.toLowerCase()) || q.includes(g.termHe.toLowerCase())
  );
  if (!entry) return null;

  return {
    answer: `**${entry.term}**: ${entry.definition}`,
    answerHe: `**${entry.termHe}**: ${entry.definitionHe}`,
    relevantPages: [],
    suggestedFollowUp: ["What is the strategy?", "How many assets?", "How do I invest?"],
    suggestedFollowUpHe: ["מה האסטרטגיה?", "כמה נכסים?", "איך משקיעים?"],
    category: "glossary",
  };
}

function buildFallback(): GuideResponse {
  return {
    answer: "I can help you understand the TAMS site — the strategy, portfolio, evidence base, and investor access. Try asking a specific question or use the suggested questions below.",
    answerHe: "אני יכול לעזור לך להבין את אתר TAMS — האסטרטגיה, התיק, בסיס הראיות וגישת המשקיעים. נסה לשאול שאלה ספציפית או השתמש בשאלות המוצעות.",
    relevantPages: [
      { route: "/", name: "Home", nameHe: "דף הבית" },
      { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
      { route: "/proof", name: "Proof", nameHe: "הוכחות" },
    ],
    suggestedFollowUp: ["What is TAMS?", "Where should I start?", "What is the strategy?", "How do I invest?"],
    suggestedFollowUpHe: ["מה זה TAMS?", "מאיפה להתחיל?", "מה האסטרטגיה?", "איך משקיעים?"],
    category: "orientation",
  };
}

// === API ראשי ===

export function askGuide(query: string, currentRoute?: string): GuideResponse {
  if (!query.trim()) return buildFallback();

  // 1. חיפוש Q&A ישיר — מדויק ביותר
  const directMatch = findDirectQA(query);
  if (directMatch) return directMatch;

  // 2. זיהוי כוונה + חיפוש
  const intent = detectIntent(query);

  if (intent === "orientation") return buildOrientationAnswer();
  if (intent === "glossary") {
    const g = buildGlossaryAnswer(query);
    if (g) return g;
  }

  const pages = findRelevantPages(query, currentRoute);

  if (intent === "explanation" && currentRoute) {
    const currentPage = sitePages.find((p) => p.route === currentRoute);
    if (currentPage) return buildPageAnswer(currentPage, false);
  }

  if (pages.length > 0) {
    return buildPageAnswer(pages[0], intent === "navigation");
  }

  // 3. חיפוש נושאי
  const topics = findRelevantTopics(query);
  if (topics.length > 0) {
    const topicPages = topics[0].relevantPages
      .map((r) => sitePages.find((p) => p.route === r))
      .filter(Boolean) as PageKnowledge[];
    if (topicPages.length > 0) {
      return buildPageAnswer(topicPages[0], false);
    }
  }

  return buildFallback();
}

// === שאלות מוצעות לפי עמוד ===

export function getSuggestedQuestions(currentRoute?: string): { en: string[]; he: string[] } {
  const defaults = {
    en: ["What is TAMS?", "Where should I start?", "What is the strategy?", "How do I invest?"],
    he: ["מה זה TAMS?", "מאיפה כדאי להתחיל?", "מה האסטרטגיה?", "איך משקיעים?"],
  };

  if (!currentRoute) return defaults;

  const map: Record<string, { en: string[]; he: string[] }> = {
    "/": {
      en: ["What is TAMS?", "Where should I start?", "What are the investor tiers?", "What is the thesis?"],
      he: ["מה זה TAMS?", "מאיפה להתחיל?", "מה דרגות המשקיעים?", "מה התזה?"],
    },
    "/company": {
      en: ["What is the vision?", "How is the fund structured?", "What are the core principles?"],
      he: ["מה החזון?", "מה מבנה הקרן?", "מה העקרונות המרכזיים?"],
    },
    "/architecture": {
      en: ["How are the wallets structured?", "What is the allocation?", "How does capital flow?"],
      he: ["מה מבנה הארנקים?", "מה ההקצאה?", "איך ההון זורם?"],
    },
    "/holdings": {
      en: ["How many assets?", "How are assets selected?", "What are the main holdings?"],
      he: ["כמה נכסים?", "איך נבחרים נכסים?", "מה ההחזקות העיקריות?"],
    },
    "/defi": {
      en: ["What DeFi strategies are used?", "What is the target APY?", "How is DeFi risk managed?"],
      he: ["אילו אסטרטגיות DeFi בשימוש?", "מה יעד ה-APY?", "איך מנוהל סיכון DeFi?"],
    },
    "/market-shift": {
      en: ["Why invest now?", "What are the market catalysts?", "How big is the market?"],
      he: ["למה להשקיע עכשיו?", "מה הקטליסטורים?", "כמה גדול השוק?"],
    },
    "/strategy": {
      en: ["What is the business model?", "What is the TAM?", "What are the scenarios?"],
      he: ["מה המודל העסקי?", "מה ה-TAM?", "מה התרחישים?"],
    },
    "/proof": {
      en: ["How many evidence records?", "What does the evidence show?", "How is evidence verified?"],
      he: ["כמה רשומות ראיות?", "מה מראות הראיות?", "איך ראיות מאומתות?"],
    },
    "/investor": {
      en: ["How do I invest?", "What are the tiers?", "What are the risks?"],
      he: ["איך משקיעים?", "מה הדרגות?", "מה הסיכונים?"],
    },
    "/methodology": {
      en: ["How are assets selected?", "What are the evidence tiers?", "How is risk scored?"],
      he: ["איך נבחרים נכסים?", "מה שכבות הראיות?", "איך מנקדים סיכון?"],
    },
    "/faq": {
      en: ["What is TAMS?", "Is this investment advice?", "How many assets?"],
      he: ["מה זה TAMS?", "האם זה ייעוץ השקעות?", "כמה נכסים?"],
    },
    "/team": {
      en: ["What is the organizational structure?", "What are the core values?"],
      he: ["מה המבנה הארגוני?", "מה ערכי הליבה?"],
    },
    "/legal": {
      en: ["What are the risks?", "Is this investment advice?"],
      he: ["מה הסיכונים?", "האם זה ייעוץ השקעות?"],
    },
  };

  return map[currentRoute] ?? defaults;
}

// === הסבר עמוד נוכחי ===

export function explainCurrentPage(route: string): GuideResponse {
  const page = sitePages.find((p) => p.route === route);
  if (page) return buildPageAnswer(page, false);
  return buildFallback();
}

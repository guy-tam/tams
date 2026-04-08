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

  // הקצאה / allocation
  {
    patterns: ["what is the allocation", "portfolio allocation", "מה ההקצאה", "הקצאת תיק", "חלוקת התיק"],
    response: () => ({
      answer: "**TAMS Portfolio Allocation:**\n\n**By wallet division:**\n• Long-Term Holdings: **40%** — quality asset appreciation\n• Active Trading: **25%** — tactical positions\n• DeFi Yield: **25%** — protocol returns (4-12% APY)\n• Operations: **10%** — gas, buffers\n\n**By asset type:**\n• Precious Metals: **32%** (gold, silver, copper)\n• Digital Assets: **68%** across 7 categories\n\n**Digital asset breakdown:**\n• Smart Contracts: 36% (SOL, ADA, AVAX, HBAR, ONDO, HOLO)\n• Payments & Routing: 27% (XRP, XLM, XDC)\n• Data & Connectivity: 14% (LINK, QNT, FLR)\n• DeFi Protocols: 14% (AAVE, MKR)\n• Scaling: 7% (MATIC, ARB)\n• Storage: 7% (FIL, AR)\n• Privacy/Identity: 5% (WLD)\n\nFull visualization on the **Architecture** page (/architecture).",
      answerHe: "**הקצאת תיק TAMS:**\n\n**לפי חטיבת ארנק:**\n• החזקות ארוכות טווח: **40%** — ייסוף נכסים איכותיים\n• מסחר אקטיבי: **25%** — פוזיציות טקטיות\n• תשואות DeFi: **25%** — תשואות פרוטוקול (4-12% APY)\n• תפעול: **10%** — gas, מאגרים\n\n**לפי סוג נכס:**\n• מתכות יקרות: **32%** (זהב, כסף, נחושת)\n• נכסים דיגיטליים: **68%** ב-7 קטגוריות\n\n**פירוט נכסים דיגיטליים:**\n• חוזים חכמים: 36% (SOL, ADA, AVAX, HBAR, ONDO, HOLO)\n• תשלומים וניתוב: 27% (XRP, XLM, XDC)\n• נתונים וקישוריות: 14% (LINK, QNT, FLR)\n• פרוטוקולי DeFi: 14% (AAVE, MKR)\n• סקלביליות: 7% (MATIC, ARB)\n• אחסון: 7% (FIL, AR)\n• פרטיות/זהות: 5% (WLD)\n\nהמחשה מלאה בעמוד **ארכיטקטורה** (/architecture).",
      relevantPages: [
        { route: "/architecture", name: "Architecture", nameHe: "ארכיטקטורה" },
        { route: "/holdings", name: "Holdings", nameHe: "החזקות" },
      ],
      suggestedFollowUp: ["How are wallets structured?", "How many assets?", "What is the DeFi strategy?"],
      suggestedFollowUpHe: ["מה מבנה הארנקים?", "כמה נכסים?", "מה אסטרטגיית DeFi?"],
      category: "concept",
    }),
  },

  // האם זה ייעוץ השקעות
  {
    patterns: ["is this investment advice", "investment advice", "האם זה ייעוץ השקעות", "ייעוץ השקעות", "not investment advice"],
    response: () => ({
      answer: "**No.** TAMS is **not investment advice**.\n\nAll content on this site is for **research and educational purposes only**. Key disclaimers:\n\n• Not an offer to buy or sell securities\n• No recommendation to purchase or hold assets\n• Past performance does not guarantee future results\n• You must obtain independent professional advice\n• Crypto markets are young and volatile\n• Risk scores are indicative, not deterministic\n\nFull legal disclosure on the **Legal** page (/legal).\nRisk details on the **Investor** page (/investor).",
      answerHe: "**לא.** TAMS **אינה ייעוץ השקעות**.\n\nכל התוכן באתר הוא למטרות **מחקר וחינוך בלבד**. גילויים מרכזיים:\n\n• לא הצעה לקנות או למכור ניירות ערך\n• אין המלצה לרכוש או להחזיק נכסים\n• ביצועי עבר אינם מבטיחים תוצאות עתידיות\n• יש לקבל ייעוץ מקצועי עצמאי\n• שוקי הקריפטו צעירים ותנודתיים\n• ניקוד סיכון הוא אינדיקטיבי, לא דטרמיניסטי\n\nגילוי משפטי מלא בעמוד **משפטי** (/legal).\nפרטי סיכון בעמוד **משקיעים** (/investor).",
      relevantPages: [
        { route: "/legal", name: "Legal", nameHe: "משפטי" },
        { route: "/investor", name: "Investor", nameHe: "משקיעים" },
      ],
      suggestedFollowUp: ["What are the risks?", "How do I invest?", "What is TAMS?"],
      suggestedFollowUpHe: ["מה הסיכונים?", "איך משקיעים?", "מה זה TAMS?"],
      category: "concept",
    }),
  },

  // מי בצוות / who is on the team
  {
    patterns: ["who is on the team", "team", "who manages", "מי בצוות", "מי מנהל", "צוות"],
    response: () => ({
      answer: "The TAMS **team structure** is organized around **4 pillars**:\n\n1. **Research** — macro, micro, and on-chain analysis\n2. **Trading** — spot, derivatives, DeFi strategies\n3. **Infrastructure** — secure digital asset management\n4. **Compliance & Regulation** — KYC/AML, regulatory reporting\n\nThere's also an **Advisory Board** of blockchain, finance, and compliance experts (full profiles available to KYC-verified investors).\n\n**Core values:** Institutional Rigor, Transparency, Risk Management, Compliance First.\n\n**Contact:** contact@tams.earth\n\nFull details on the **Team** page (/team).",
      answerHe: "**מבנה הצוות** של TAMS מאורגן סביב **4 עמודי תווך**:\n\n1. **מחקר** — ניתוח מאקרו, מיקרו ו-on-chain\n2. **מסחר** — ספוט, נגזרים, אסטרטגיות DeFi\n3. **תשתית** — ניהול נכסים דיגיטליים מאובטח\n4. **ציות ורגולציה** — KYC/AML, דיווח רגולטורי\n\nיש גם **מועצה מייעצת** של מומחי בלוקצ'יין, פיננסים וציות (פרופילים מלאים זמינים למשקיעים מאומתי KYC).\n\n**ערכי ליבה:** קפדנות מוסדית, שקיפות, ניהול סיכונים, ציות בראש סדר העדיפויות.\n\n**קשר:** contact@tams.earth\n\nכל הפרטים בעמוד **צוות** (/team).",
      relevantPages: [
        { route: "/team", name: "Team", nameHe: "צוות" },
        { route: "/company", name: "Company", nameHe: "חברה" },
      ],
      suggestedFollowUp: ["What is the vision?", "How is the fund structured?", "What are the principles?"],
      suggestedFollowUpHe: ["מה החזון?", "מה מבנה הקרן?", "מה העקרונות?"],
      category: "concept",
    }),
  },

  // מה ה-APY
  {
    patterns: ["what is the apy", "target apy", "apy", "מה ה-apy", "יעד apy", "כמה תשואה", "תשואה"],
    response: () => ({
      answer: "The TAMS DeFi strategy targets **4-12% APY** (Annual Percentage Yield).\n\nThis is generated through:\n• **Lending** on Aave, Compound\n• **Staking** (native + liquid)\n• **Liquidity Pools** on Uniswap, Curve\n\n**Risk controls:**\n• Max **10%** exposure per protocol\n• DeFi is **25%** of total portfolio\n• Smart contract audit requirements\n• Multi-chain diversification (3+ chains)\n\nThe APY target is conservative by crypto standards — prioritizing capital preservation over maximum yield.\n\nDetails on the **DeFi** page (/defi).",
      answerHe: "אסטרטגיית DeFi של TAMS מכוונת ל-**4-12% APY** (תשואה שנתית).\n\nזה מיוצר דרך:\n• **הלוואות** ב-Aave, Compound\n• **סטייקינג** (מקורי + נזיל)\n• **מאגרי נזילות** ב-Uniswap, Curve\n\n**בקרות סיכון:**\n• חשיפה מקסימלית **10%** לפרוטוקול\n• DeFi הוא **25%** מהתיק הכולל\n• דרישות ביקורת חוזים חכמים\n• פיזור רב-שרשרתי (3+ רשתות)\n\nיעד ה-APY שמרני לפי סטנדרטים של קריפטו — מעדיף שימור הון על פני תשואה מקסימלית.\n\nפרטים בעמוד **DeFi** (/defi).",
      relevantPages: [
        { route: "/defi", name: "DeFi", nameHe: "DeFi" },
      ],
      suggestedFollowUp: ["What protocols are used?", "How is risk managed?", "What is the wallet structure?"],
      suggestedFollowUpHe: ["אילו פרוטוקולים בשימוש?", "איך מנוהל סיכון?", "מה מבנה הארנקים?"],
      category: "concept",
    }),
  },

  // שאלות נפוצות / FAQ
  {
    patterns: ["faq", "frequently asked", "common questions", "שאלות נפוצות", "שאלות ותשובות"],
    response: () => ({
      answer: "The **FAQ** page (/faq) covers 4 categories:\n\n1. **About TAMS** — what it is, the thesis, asset count, risks\n2. **Investments & Portfolio** — selection methodology, confidence ratings\n3. **Research & Evidence** — 259 records, evidence hierarchy, update frequency\n4. **Access & Security** — portal access, security standards\n\nYou can also ask me directly! I know all the site content.",
      answerHe: "עמוד **שאלות נפוצות** (/faq) מכסה 4 קטגוריות:\n\n1. **אודות TAMS** — מה זה, התזה, כמות נכסים, סיכונים\n2. **השקעות ותיק** — מתודולוגיית בחירה, דירוגי ביטחון\n3. **מחקר וראיות** — 259 רשומות, היררכיית ראיות, תדירות עדכון\n4. **גישה ואבטחה** — גישה לפורטל, סטנדרטי אבטחה\n\nאפשר גם לשאול אותי ישירות! אני מכיר את כל תוכן האתר.",
      relevantPages: [
        { route: "/faq", name: "FAQ", nameHe: "שאלות נפוצות" },
      ],
      suggestedFollowUp: ["What is TAMS?", "How many assets?", "Is this investment advice?"],
      suggestedFollowUpHe: ["מה זה TAMS?", "כמה נכסים?", "האם זה ייעוץ השקעות?"],
      category: "navigation",
    }),
  },

  // מבנה הקרן / fund structure
  {
    patterns: ["fund structure", "how is the fund structured", "gp lp", "מבנה הקרן", "מה מבנה הקרן"],
    response: () => ({
      answer: "TAMS uses a **GP/LP fund structure**:\n\n• **GP (General Partner)** — fund manager, makes investment decisions\n• **LP (Limited Partners)** — investors, provide capital\n\n**Infrastructure partners:**\n• **Fordefi** — institutional-grade portfolio management platform\n• **Ledger Flex** — hardware custody for digital assets\n• **Multi-Sig** — multiple approvals required for all transactions\n\n**Operating model allocation:**\n• Custody: 50% (Ledger + Multi-Sig)\n• Risk Management: 20% (weekly monitoring)\n• Staking/Lending: 20% (yield generation)\n• Governance: 10% (control & reporting)\n\nFull details on the **Company** page (/company).",
      answerHe: "TAMS משתמשת ב**מבנה קרן GP/LP**:\n\n• **GP (שותף כללי)** — מנהל הקרן, מקבל החלטות השקעה\n• **LP (שותפים מוגבלים)** — משקיעים, מספקים הון\n\n**שותפי תשתית:**\n• **Fordefi** — פלטפורמת ניהול תיק ברמה מוסדית\n• **Ledger Flex** — משמורת חומרתית לנכסים דיגיטליים\n• **Multi-Sig** — אישורים מרובים נדרשים לכל עסקה\n\n**הקצאת מודל תפעול:**\n• משמורת: 50% (Ledger + Multi-Sig)\n• ניהול סיכונים: 20% (ניטור שבועי)\n• סטייקינג/הלוואות: 20% (יצירת תשואה)\n• ממשל: 10% (בקרה ודיווח)\n\nכל הפרטים בעמוד **חברה** (/company).",
      relevantPages: [
        { route: "/company", name: "Company", nameHe: "חברה" },
      ],
      suggestedFollowUp: ["What is the vision?", "Who manages the fund?", "What are the principles?"],
      suggestedFollowUpHe: ["מה החזון?", "מי מנהל את הקרן?", "מה העקרונות?"],
      category: "concept",
    }),
  },

  // עקרונות / principles
  {
    patterns: ["principles", "core principles", "what are the principles", "עקרונות", "מה העקרונות", "עקרונות מרכזיים"],
    response: () => ({
      answer: "TAMS operates by **4 core principles**:\n\n1. **Research-Driven Analysis** — every decision backed by data, not hype\n2. **Risk-First Management** — protect capital before seeking returns\n3. **Institutional Discipline** — matching traditional finance standards\n4. **Transparency & Communication** — regular reporting, real-time data access\n\nThese principles drive the 4-step process: **Identify → Evaluate → Allocate → Execute**.\n\nSee them in context on the **Company** page (/company).",
      answerHe: "TAMS פועלת לפי **4 עקרונות מרכזיים**:\n\n1. **ניתוח מבוסס מחקר** — כל החלטה מגובה בנתונים, לא בהייפ\n2. **ניהול סיכונים ראשוני** — הגנה על ההון לפני חיפוש תשואה\n3. **משמעת מוסדית** — התאמה לסטנדרטים של פיננסים מסורתיים\n4. **שקיפות ותקשורת** — דיווח קבוע, גישה לנתונים בזמן אמת\n\nעקרונות אלה מניעים את התהליך ב-4 שלבים: **זיהוי → הערכה → הקצאה → ביצוע**.\n\nראה אותם בהקשר בעמוד **חברה** (/company).",
      relevantPages: [
        { route: "/company", name: "Company", nameHe: "חברה" },
      ],
      suggestedFollowUp: ["What is the vision?", "How is the fund structured?", "What is the methodology?"],
      suggestedFollowUpHe: ["מה החזון?", "מה מבנה הקרן?", "מה המתודולוגיה?"],
      category: "concept",
    }),
  },

  // קטליסטורים
  {
    patterns: ["catalysts", "market catalysts", "what are the catalysts", "קטליסטורים", "מה הקטליסטורים"],
    response: () => ({
      answer: "**6 market catalysts** driving institutional blockchain adoption:\n\n1. **ETF Approvals** — Bitcoin & Ethereum ETFs opening regulated access\n2. **Regulatory Clarity** — clearer legal frameworks worldwide\n3. **Corporate Treasury Adoption** — companies adding crypto to balance sheets\n4. **RWA Tokenization** — $16T+ potential in tokenized real-world assets\n5. **DeFi Maturation** — institutional-grade protocols emerging\n6. **Infrastructure Growth** — blockchain becoming enterprise-ready\n\nThese catalysts are converging now, which is why TAMS sees an **asymmetric opportunity**.\n\nFull analysis on the **Market Shift** page (/market-shift).",
      answerHe: "**6 קטליסטורים** שמניעים אימוץ מוסדי של בלוקצ'יין:\n\n1. **אישורי ETF** — ETFs של Bitcoin ו-Ethereum פותחים גישה מוסדרת\n2. **בהירות רגולטורית** — מסגרות משפטיות ברורות יותר עולמית\n3. **אימוץ אוצר תאגידי** — חברות מוסיפות קריפטו למאזנים\n4. **טוקניזציית RWA** — פוטנציאל $16T+ בנכסים מטוקניים\n5. **הבשלת DeFi** — פרוטוקולים ברמה מוסדית צצים\n6. **צמיחת תשתית** — בלוקצ'יין הופך מוכן לארגונים\n\nקטליסטורים אלה מתכנסים עכשיו, ולכן TAMS רואה **הזדמנות א-סימטרית**.\n\nניתוח מלא בעמוד **מהפך שוק** (/market-shift).",
      relevantPages: [
        { route: "/market-shift", name: "Market Shift", nameHe: "מהפך שוק" },
      ],
      suggestedFollowUp: ["How big is the market?", "What is the thesis?", "What is the strategy?"],
      suggestedFollowUpHe: ["כמה גדול השוק?", "מה התזה?", "מה האסטרטגיה?"],
      category: "concept",
    }),
  },

  // כמה גדול השוק
  {
    patterns: ["how big is the market", "market size", "כמה גדול השוק", "גודל השוק"],
    response: () => ({
      answer: "**Massive markets** being disrupted by blockchain:\n\n• Cross-border payments: **$1,000T**\n• Managed assets: **$147T**\n• Pension funds: **$58.5T**\n• BlackRock/Vanguard: **$20T**\n• Insurance: **$7T**\n• Tokenized Real Estate: **$4.3T**\n• ETFs: **$2T**\n\n**TAMS market sizing:**\n• TAM: $2-3T\n• SAM: $300-500B\n• SOM: $25-75M\n\nThe thesis: blockchain infrastructure will capture a growing share of these traditional markets.\n\nFull data on the **Market Shift** page (/market-shift).",
      answerHe: "**שווקים עצומים** שמופרעים על ידי בלוקצ'יין:\n\n• תשלומים בינלאומיים: **$1,000T**\n• נכסים מנוהלים: **$147T**\n• קרנות פנסיה: **$58.5T**\n• BlackRock/Vanguard: **$20T**\n• ביטוח: **$7T**\n• נדל\"ן מטוקנייז: **$4.3T**\n• ETFs: **$2T**\n\n**גודל שוק TAMS:**\n• TAM: $2-3T\n• SAM: $300-500B\n• SOM: $25-75M\n\nהתזה: תשתית בלוקצ'יין תלכוד נתח הולך וגדל מהשווקים המסורתיים הללו.\n\nכל הנתונים בעמוד **מהפך שוק** (/market-shift).",
      relevantPages: [
        { route: "/market-shift", name: "Market Shift", nameHe: "מהפך שוק" },
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
      ],
      suggestedFollowUp: ["What are the catalysts?", "What is the TAM?", "Why invest now?"],
      suggestedFollowUpHe: ["מה הקטליסטורים?", "מה ה-TAM?", "למה להשקיע עכשיו?"],
      category: "concept",
    }),
  },

  // איך ליצור קשר
  {
    patterns: ["contact", "how to contact", "email", "קשר", "איך ליצור קשר", "מייל", "אימייל"],
    response: () => ({
      answer: "**Contact TAMS:**\n\n• Email: **contact@tams.earth**\n• Private access request: **/access** page\n• Team responds within **48 hours**\n\nFor qualified investors, submit a confidential review request at **/access** with your investor type and investment range.",
      answerHe: "**יצירת קשר עם TAMS:**\n\n• אימייל: **contact@tams.earth**\n• בקשת גישה פרטית: עמוד **/access**\n• הצוות מגיב תוך **48 שעות**\n\nלמשקיעים מוסמכים, הגישו בקשה לסקירה חסויה ב-**/access** עם סוג המשקיע וטווח ההשקעה.",
      relevantPages: [
        { route: "/access", name: "Access", nameHe: "גישה פרטית" },
        { route: "/investor", name: "Investor", nameHe: "משקיעים" },
      ],
      suggestedFollowUp: ["What are the investor tiers?", "How do I invest?", "What are the risks?"],
      suggestedFollowUpHe: ["מה דרגות המשקיעים?", "איך משקיעים?", "מה הסיכונים?"],
      category: "navigation",
    }),
  },

  // שאלות שיחתיות — תודה / thanks
  {
    patterns: ["thank", "thanks", "תודה", "תודה רבה", "מעולה", "great", "awesome", "perfect"],
    response: () => ({
      answer: "You're welcome! Feel free to ask anything else about the TAMS site. I'm here to help you understand the opportunity.\n\nSome areas you might want to explore:\n• The investment strategy and business model\n• The 259 evidence records backing the thesis\n• The portfolio architecture and asset selection\n• How to start the investment process",
      answerHe: "בשמחה! אל תהסס לשאול כל שאלה נוספת על אתר TAMS. אני כאן לעזור לך להבין את ההזדמנות.\n\nתחומים שאולי תרצה לחקור:\n• אסטרטגיית ההשקעה והמודל העסקי\n• 259 רשומות הראיות שתומכות בתזה\n• ארכיטקטורת התיק ובחירת הנכסים\n• איך להתחיל את תהליך ההשקעה",
      relevantPages: [],
      suggestedFollowUp: ["What is the strategy?", "Show me the evidence", "How do I invest?"],
      suggestedFollowUpHe: ["מה האסטרטגיה?", "תראה לי את הראיות", "איך משקיעים?"],
      category: "concept",
    }),
  },

  // שלום / hello
  {
    patterns: ["hello", "hi", "hey", "שלום", "היי", "הי", "בוקר טוב", "ערב טוב", "good morning"],
    response: () => ({
      answer: "Hello! I'm the TAMS Investor Guide. I can help you understand:\n\n• **What TAMS is** and its investment thesis\n• **The portfolio** — 16 assets across 7 categories\n• **The evidence** — 259 verified institutional records\n• **How to invest** — tiers, process, and access\n• **Any page or section** on this site\n\nWhat would you like to know?",
      answerHe: "שלום! אני מדריך המשקיעים של TAMS. אני יכול לעזור לך להבין:\n\n• **מה זה TAMS** ותזת ההשקעה שלה\n• **התיק** — 16 נכסים ב-7 קטגוריות\n• **הראיות** — 259 רשומות מוסדיות מאומתות\n• **איך להשקיע** — דרגות, תהליך וגישה\n• **כל עמוד או סעיף** באתר הזה\n\nמה תרצה לדעת?",
      relevantPages: [],
      suggestedFollowUp: ["What is TAMS?", "Where should I start?", "What is the strategy?", "How do I invest?"],
      suggestedFollowUpHe: ["מה זה TAMS?", "מאיפה להתחיל?", "מה האסטרטגיה?", "איך משקיעים?"],
      category: "orientation",
    }),
  },

  // ספר לי עוד / tell me more
  {
    patterns: ["tell me more", "explain more", "more details", "ספר לי עוד", "עוד פרטים", "תרחיב", "הסבר נוסף"],
    response: () => ({
      answer: "I'd be happy to go deeper! What topic interests you most?\n\n• **Strategy** — the 6-engine business model and market thesis\n• **Portfolio** — the 16 assets and how they're selected\n• **Evidence** — 259 verified records and the methodology\n• **DeFi** — yield strategies and risk management\n• **Market opportunity** — why now and what's driving adoption\n• **Investing** — tiers, process, and what to expect\n\nJust ask about any of these, or about a specific page!",
      answerHe: "אשמח להעמיק! איזה נושא מעניין אותך הכי הרבה?\n\n• **אסטרטגיה** — המודל העסקי 6-מנועי ותזת השוק\n• **תיק** — 16 הנכסים ואיך הם נבחרים\n• **ראיות** — 259 רשומות מאומתות והמתודולוגיה\n• **DeFi** — אסטרטגיות תשואה וניהול סיכון\n• **הזדמנות שוק** — למה עכשיו ומה מניע אימוץ\n• **השקעה** — דרגות, תהליך ומה לצפות\n\nפשוט שאל על כל אחד מאלה, או על עמוד ספציפי!",
      relevantPages: [
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
        { route: "/proof", name: "Proof", nameHe: "הוכחות" },
        { route: "/holdings", name: "Holdings", nameHe: "החזקות" },
      ],
      suggestedFollowUp: ["What is the business model?", "How are assets selected?", "Show me the evidence"],
      suggestedFollowUpHe: ["מה המודל העסקי?", "איך נבחרים נכסים?", "תראה לי את הראיות"],
      category: "orientation",
    }),
  },

  // מפת דרכים / roadmap
  {
    patterns: ["roadmap", "development roadmap", "milestones", "מפת דרכים", "אבני דרך", "שלבי פיתוח"],
    response: () => ({
      answer: "The TAMS **development roadmap** is on the **Investor** page (/investor).\n\nIt shows multi-phase development with:\n• **Completed milestones** — already achieved\n• **In Progress** — currently being built\n• **Upcoming** — planned next steps\n\nEach phase includes specific milestones with completion tracking.\n\nVisit the **Investor** page to see the full timeline.",
      answerHe: "**מפת הדרכים** של TAMS נמצאת בעמוד **משקיעים** (/investor).\n\nהיא מציגה פיתוח רב-שלבי עם:\n• **אבני דרך שהושלמו** — כבר הושגו\n• **בתהליך** — נבנה כרגע\n• **מתוכנן** — צעדים הבאים\n\nכל שלב כולל אבני דרך ספציפיות עם מעקב השלמה.\n\nבקר בעמוד **משקיעים** לראות את לוח הזמנים המלא.",
      relevantPages: [
        { route: "/investor", name: "Investor", nameHe: "משקיעים" },
      ],
      suggestedFollowUp: ["How do I invest?", "What are the tiers?", "What is the strategy?"],
      suggestedFollowUpHe: ["איך משקיעים?", "מה הדרגות?", "מה האסטרטגיה?"],
      category: "concept",
    }),
  },

  // אבטחה / security
  {
    patterns: ["security", "how secure", "custody", "אבטחה", "כמה מאובטח", "משמורת"],
    response: () => ({
      answer: "TAMS uses **institutional-grade security**:\n\n• **Ledger Flex** — hardware custody for digital assets\n• **Multi-Sig** — multiple signatures required for every transaction\n• **Fordefi** — institutional management platform\n• **4-wallet separation** — different wallets for different functions\n• **KYC/AML compliance** — full regulatory framework\n• **End-to-end encryption** — for all data\n\nThe custody division alone accounts for **50%** of the operating model focus.\n\nDetails on **Architecture** (/architecture) and **Company** (/company) pages.",
      answerHe: "TAMS משתמשת ב**אבטחה ברמה מוסדית**:\n\n• **Ledger Flex** — משמורת חומרתית לנכסים דיגיטליים\n• **Multi-Sig** — חתימות מרובות נדרשות לכל עסקה\n• **Fordefi** — פלטפורמת ניהול מוסדית\n• **הפרדת 4 ארנקים** — ארנקים שונים לפונקציות שונות\n• **ציות KYC/AML** — מסגרת רגולטורית מלאה\n• **הצפנה מקצה לקצה** — לכל הנתונים\n\nחטיבת המשמורת לבדה מהווה **50%** ממיקוד מודל התפעול.\n\nפרטים בעמודי **ארכיטקטורה** (/architecture) ו**חברה** (/company).",
      relevantPages: [
        { route: "/architecture", name: "Architecture", nameHe: "ארכיטקטורה" },
        { route: "/company", name: "Company", nameHe: "חברה" },
      ],
      suggestedFollowUp: ["How are wallets structured?", "What is the fund structure?", "What are the risks?"],
      suggestedFollowUpHe: ["מה מבנה הארנקים?", "מה מבנה הקרן?", "מה הסיכונים?"],
      category: "concept",
    }),
  },

  // סיכום / summary
  {
    patterns: ["summarize", "summary", "quick summary", "תסכם", "סיכום", "סיכום מהיר", "בקצרה"],
    response: () => ({
      answer: "**TAMS in a nutshell:**\n\nAn institutional blockchain investment infrastructure holding **16 assets** across 7 categories, managed through a **4-wallet architecture** with 3 strategies:\n\n1. **Long-term holdings** (40%) — quality asset appreciation\n2. **Active trading** (25%) — tactical alpha\n3. **DeFi yield** (25%) — 4-12% APY target\n\nBacked by **259 verified evidence records** from 125+ organizations. Targeting a **$25-75M** obtainable market within a $2-3T TAM.\n\n4 investor tiers: $10K → $1M+\nContact: contact@tams.earth\n\n**Key pages:** Strategy (/strategy), Proof (/proof), Investor (/investor)",
      answerHe: "**TAMS בקצרה:**\n\nתשתית השקעות מוסדית בבלוקצ'יין המחזיקה **16 נכסים** ב-7 קטגוריות, מנוהלת דרך **ארכיטקטורת 4 ארנקים** עם 3 אסטרטגיות:\n\n1. **החזקות ארוכות טווח** (40%) — ייסוף נכסים איכותיים\n2. **מסחר אקטיבי** (25%) — אלפא טקטי\n3. **תשואות DeFi** (25%) — יעד 4-12% APY\n\nמגובה ב-**259 רשומות ראיות מאומתות** מ-125+ ארגונים. מכוונת ל**$25-75M** שוק בר-השגה בתוך TAM של $2-3T.\n\n4 דרגות משקיעים: $10K → $1M+\nקשר: contact@tams.earth\n\n**עמודים מרכזיים:** אסטרטגיה (/strategy), הוכחות (/proof), משקיעים (/investor)",
      relevantPages: [
        { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
        { route: "/proof", name: "Proof", nameHe: "הוכחות" },
        { route: "/investor", name: "Investor", nameHe: "משקיעים" },
      ],
      suggestedFollowUp: ["Tell me more about the strategy", "Show me the evidence", "How do I invest?"],
      suggestedFollowUpHe: ["ספר לי עוד על האסטרטגיה", "תראה לי את הראיות", "איך משקיעים?"],
      category: "concept",
    }),
  },
];

// === שמות נכסים בתיק ===

const ASSET_TICKERS = new Set([
  "eth", "sol", "avax", "algo", "sui", "arb", "op", "apt",
  "aevo", "enso", "mkr", "aave", "uni", "ondo", "usdt", "btc",
  "xrp", "xlm", "xdc", "ada", "hbar", "holo", "link", "qnt",
  "flr", "matic", "fil", "ar", "wld",
  "ethereum", "bitcoin", "solana", "avalanche", "ripple", "cardano",
  "chainlink", "polygon", "filecoin", "arweave",
]);

const ASSET_CATEGORIES: Record<string, { en: string; he: string }> = {
  xrp: { en: "Payments & Routing (27%)", he: "תשלומים וניתוב (27%)" },
  xlm: { en: "Payments & Routing (27%)", he: "תשלומים וניתוב (27%)" },
  xdc: { en: "Payments & Routing (27%)", he: "תשלומים וניתוב (27%)" },
  ripple: { en: "Payments & Routing (27%)", he: "תשלומים וניתוב (27%)" },
  sol: { en: "Smart Contracts (36%)", he: "חוזים חכמים (36%)" },
  ada: { en: "Smart Contracts (36%)", he: "חוזים חכמים (36%)" },
  avax: { en: "Smart Contracts (36%)", he: "חוזים חכמים (36%)" },
  hbar: { en: "Smart Contracts (36%)", he: "חוזים חכמים (36%)" },
  ondo: { en: "Smart Contracts (36%)", he: "חוזים חכמים (36%)" },
  holo: { en: "Smart Contracts (36%)", he: "חוזים חכמים (36%)" },
  solana: { en: "Smart Contracts (36%)", he: "חוזים חכמים (36%)" },
  avalanche: { en: "Smart Contracts (36%)", he: "חוזים חכמים (36%)" },
  cardano: { en: "Smart Contracts (36%)", he: "חוזים חכמים (36%)" },
  link: { en: "Data & Connectivity (14%)", he: "נתונים וקישוריות (14%)" },
  qnt: { en: "Data & Connectivity (14%)", he: "נתונים וקישוריות (14%)" },
  flr: { en: "Data & Connectivity (14%)", he: "נתונים וקישוריות (14%)" },
  chainlink: { en: "Data & Connectivity (14%)", he: "נתונים וקישוריות (14%)" },
  matic: { en: "Scaling Solutions (7%)", he: "פתרונות סקלביליות (7%)" },
  arb: { en: "Scaling Solutions (7%)", he: "פתרונות סקלביליות (7%)" },
  polygon: { en: "Scaling Solutions (7%)", he: "פתרונות סקלביליות (7%)" },
  fil: { en: "Storage & Data (7%)", he: "אחסון ונתונים (7%)" },
  ar: { en: "Storage & Data (7%)", he: "אחסון ונתונים (7%)" },
  filecoin: { en: "Storage & Data (7%)", he: "אחסון ונתונים (7%)" },
  arweave: { en: "Storage & Data (7%)", he: "אחסון ונתונים (7%)" },
  aave: { en: "DeFi Protocols (14%)", he: "פרוטוקולי DeFi (14%)" },
  mkr: { en: "DeFi Protocols (14%)", he: "פרוטוקולי DeFi (14%)" },
  uni: { en: "DeFi Protocols (14%)", he: "פרוטוקולי DeFi (14%)" },
  eth: { en: "Core Infrastructure", he: "תשתית ליבה" },
  ethereum: { en: "Core Infrastructure", he: "תשתית ליבה" },
  btc: { en: "Digital Gold / Store of Value", he: "זהב דיגיטלי / מאגר ערך" },
  bitcoin: { en: "Digital Gold / Store of Value", he: "זהב דיגיטלי / מאגר ערך" },
  usdt: { en: "Stablecoin / Liquidity", he: "סטייבלקוין / נזילות" },
};

// בודק אם השאלה על נכס ספציפי
function findAssetInQuery(query: string): string | null {
  const tokens = query.toLowerCase().split(/\s+/);
  for (const token of tokens) {
    const clean = token.replace(/[?!.,;:'"()]/g, "");
    if (ASSET_TICKERS.has(clean)) return clean;
  }
  return null;
}

function buildAssetAnswer(asset: string): GuideResponse {
  const ticker = asset.toUpperCase();
  const category = ASSET_CATEGORIES[asset.toLowerCase()];
  const catEn = category?.en ?? "one of the portfolio categories";
  const catHe = category?.he ?? "אחת מקטגוריות התיק";

  return {
    answer: `**${ticker}** is part of the TAMS portfolio, classified under **${catEn}**.\n\nThe portfolio holds **16 research-backed assets** across 7 categories. Each asset is selected based on 5 criteria: financial relevance, institutional adoption, regulatory clarity, technology maturity, and ecosystem strength.\n\nTo see the full research on ${ticker} — including thesis alignment, risk scoring, and institutional adoption evidence — visit the **Holdings** page (/holdings) and explore the **Asset Research Explorer**.\n\nYou can also see the evidence supporting ${ticker} on the **Proof** page (/proof).`,
    answerHe: `**${ticker}** הוא חלק מתיק TAMS, מסווג תחת **${catHe}**.\n\nהתיק מחזיק **16 נכסים מגובי מחקר** ב-7 קטגוריות. כל נכס נבחר לפי 5 קריטריונים: רלוונטיות פיננסית, אימוץ מוסדי, בהירות רגולטורית, בשלות טכנולוגית וחוסן אקו-סיסטם.\n\nלסקירת המחקר המלאה על ${ticker} — כולל התאמת תזה, ניקוד סיכון וראיות אימוץ מוסדי — בקר בעמוד **החזקות** (/holdings) וחקור את **סייר מחקר הנכסים**.\n\nאפשר גם לראות את הראיות התומכות ב-${ticker} בעמוד **הוכחות** (/proof).`,
    relevantPages: [
      { route: "/holdings", name: "Holdings", nameHe: "החזקות" },
      { route: "/proof", name: "Proof", nameHe: "הוכחות" },
    ],
    suggestedFollowUp: ["How many assets in the portfolio?", "How are assets selected?", "What is the methodology?"],
    suggestedFollowUpHe: ["כמה נכסים בתיק?", "איך נבחרים נכסים?", "מה המתודולוגיה?"],
    category: "concept",
  };
}

// === "מה ההבדל בין" ===

const PAGE_COMPARISONS: Record<string, { en: string; he: string }> = {
  "proof|strategy": {
    en: "**Proof vs. Strategy** — Two different perspectives:\n\n**Strategy** (/strategy) is about the **plan** — the business model, market sizing (TAM/SAM/SOM), scenario projections, and competitive advantages. It answers: *What is TAMS going to do and why?*\n\n**Proof** (/proof) is about the **evidence** — 259 verified records, institutional adoption data, and confidence scoring. It answers: *What data supports the thesis?*\n\nIn short: Strategy = the plan. Proof = the data backing it.",
    he: "**הוכחות לעומת אסטרטגיה** — שתי נקודות מבט שונות:\n\n**אסטרטגיה** (/strategy) עוסקת ב**תוכנית** — המודל העסקי, גודל שוק (TAM/SAM/SOM), תחזיות תרחישים ויתרונות תחרותיים. היא עונה: *מה TAMS הולכת לעשות ולמה?*\n\n**הוכחות** (/proof) עוסקת ב**ראיות** — 259 רשומות מאומתות, נתוני אימוץ מוסדי וניקוד ביטחון. היא עונה: *אילו נתונים תומכים בתזה?*\n\nבקצרה: אסטרטגיה = התוכנית. הוכחות = הנתונים שתומכים בה.",
  },
  "holdings|architecture": {
    en: "**Holdings vs. Architecture** — What vs. How:\n\n**Holdings** (/holdings) shows **what** assets are in the portfolio — all 16 assets with research, thesis alignment, and scoring.\n\n**Architecture** (/architecture) shows **how** the portfolio is structured — the 4-wallet system, capital flow, and allocation percentages.\n\nHoldings = the assets. Architecture = the infrastructure.",
    he: "**החזקות לעומת ארכיטקטורה** — מה לעומת איך:\n\n**החזקות** (/holdings) מציגות **אילו** נכסים בתיק — כל 16 הנכסים עם מחקר, התאמת תזה וניקוד.\n\n**ארכיטקטורה** (/architecture) מציגה **איך** התיק בנוי — מערכת 4 הארנקים, זרימת הון ואחוזי הקצאה.\n\nהחזקות = הנכסים. ארכיטקטורה = התשתית.",
  },
  "company|team": {
    en: "**Company vs. Team:**\n\n**Company** (/company) covers the vision, mission, core principles, operating process, partnership structure (GP/LP), and operating model.\n\n**Team** (/team) focuses on the organizational structure — the 4 pillars (Research, Trading, Infrastructure, Compliance), advisory board, and core values.\n\nCompany = what we do. Team = who does it.",
    he: "**חברה לעומת צוות:**\n\n**חברה** (/company) מכסה את החזון, המשימה, העקרונות, תהליך הפעולה, מבנה השותפות (GP/LP) ומודל התפעול.\n\n**צוות** (/team) מתמקד במבנה הארגוני — 4 עמודי התווך (מחקר, מסחר, תשתית, ציות), מועצה מייעצת וערכי ליבה.\n\nחברה = מה אנחנו עושים. צוות = מי עושה את זה.",
  },
  "strategy|market-shift": {
    en: "**Strategy vs. Market Shift:**\n\n**Market Shift** (/market-shift) explains **why now** — the catalysts, market segments, timing, and institutional adoption trends.\n\n**Strategy** (/strategy) explains **what to do about it** — the business model, TAM/SAM/SOM, scenarios, and competitive advantages.\n\nMarket Shift = the opportunity. Strategy = the plan to capture it.",
    he: "**אסטרטגיה לעומת מהפך שוק:**\n\n**מהפך שוק** (/market-shift) מסביר **למה עכשיו** — קטליסטורים, מגזרי שוק, תזמון ומגמות אימוץ מוסדי.\n\n**אסטרטגיה** (/strategy) מסבירה **מה לעשות עם זה** — מודל עסקי, TAM/SAM/SOM, תרחישים ויתרונות תחרותיים.\n\nמהפך שוק = ההזדמנות. אסטרטגיה = התוכנית ללכוד אותה.",
  },
  "defi|architecture": {
    en: "**DeFi vs. Architecture:**\n\n**DeFi** (/defi) explains the **yield strategies** — lending, staking, liquidity pools, protocols used, and risk framework (4-12% APY target).\n\n**Architecture** (/architecture) shows the **overall structure** — all 4 wallet divisions including DeFi (25%), plus long-term holdings (40%), trading (25%), and operations (10%).\n\nDeFi = the yield engine details. Architecture = the full portfolio blueprint.",
    he: "**DeFi לעומת ארכיטקטורה:**\n\n**DeFi** (/defi) מסביר את **אסטרטגיות התשואה** — הלוואות, סטייקינג, מאגרי נזילות, פרוטוקולים בשימוש ומסגרת סיכון (יעד 4-12% APY).\n\n**ארכיטקטורה** (/architecture) מציגה את **המבנה הכולל** — כל 4 חטיבות הארנק כולל DeFi (25%), בתוספת החזקות ארוכות טווח (40%), מסחר (25%) ותפעול (10%).\n\nDeFi = פרטי מנוע התשואה. ארכיטקטורה = השרטוט המלא של התיק.",
  },
  "methodology|proof": {
    en: "**Methodology vs. Proof:**\n\n**Methodology** (/methodology) explains **how** research is done — asset selection criteria, evidence classification tiers, risk scoring, and portfolio construction rules.\n\n**Proof** (/proof) shows **what was found** — the 259 evidence records, adoption coverage, and asset thesis grid.\n\nMethodology = the research process. Proof = the research results.",
    he: "**מתודולוגיה לעומת הוכחות:**\n\n**מתודולוגיה** (/methodology) מסבירה **איך** המחקר נעשה — קריטריונים לבחירת נכסים, שכבות סיווג ראיות, ניקוד סיכון וכללי בניית תיק.\n\n**הוכחות** (/proof) מציגות **מה נמצא** — 259 רשומות ראיות, כיסוי אימוץ ורשת תזות נכסים.\n\nמתודולוגיה = תהליך המחקר. הוכחות = תוצאות המחקר.",
  },
};

function findComparisonAnswer(query: string): GuideResponse | null {
  const q = query.toLowerCase();
  // חיפוש מילות השוואה
  if (!q.includes("difference") && !q.includes("הבדל") && !q.includes("לעומת") && !q.includes(" vs ") && !q.includes("compared")) {
    return null;
  }

  for (const [key, comparison] of Object.entries(PAGE_COMPARISONS)) {
    const [a, b] = key.split("|");
    const pageA = sitePages.find((p) => p.route === `/${a}`);
    const pageB = sitePages.find((p) => p.route === `/${b}`);
    if (!pageA || !pageB) continue;

    const names = [a, b, pageA.name.toLowerCase(), pageA.nameHe, pageB.name.toLowerCase(), pageB.nameHe];
    const matchCount = names.filter((n) => q.includes(n)).length;
    if (matchCount >= 2) {
      return {
        answer: comparison.en,
        answerHe: comparison.he,
        relevantPages: [
          { route: pageA.route, name: pageA.name, nameHe: pageA.nameHe },
          { route: pageB.route, name: pageB.name, nameHe: pageB.nameHe },
        ],
        suggestedFollowUp: [`What is the ${pageA.name} page about?`, `What is the ${pageB.name} page about?`],
        suggestedFollowUpHe: [`על מה עמוד ${pageA.nameHe}?`, `על מה עמוד ${pageB.nameHe}?`],
        category: "concept",
      };
    }
  }
  return null;
}

// === חיפוש Q&A ישיר ===

function findDirectQA(query: string): GuideResponse | null {
  const q = query.toLowerCase().trim();

  // 1. בדיקה אם שאלה על נכס ספציפי
  const asset = findAssetInQuery(query);
  if (asset) return buildAssetAnswer(asset);

  // 2. בדיקה אם שאלת השוואה
  const comparison = findComparisonAnswer(query);
  if (comparison) return comparison;

  // 3. Q&A ישירים
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

function buildFallback(query?: string): GuideResponse {
  const qNote = query
    ? `\n\nI couldn't find a specific answer for "${query}" in the site content.`
    : "";
  const qNoteHe = query
    ? `\n\nלא מצאתי תשובה ספציפית ל-"${query}" בתוכן האתר.`
    : "";

  return {
    answer: `I'm a guide for the TAMS site and can answer questions about the investment strategy, portfolio, evidence base, DeFi approach, and investor access.${qNote}\n\nTry one of the suggested questions below, or ask about a specific page or topic.`,
    answerHe: `אני מדריך לאתר TAMS ויכול לענות על שאלות על אסטרטגיית ההשקעה, התיק, בסיס הראיות, גישת DeFi וגישת המשקיעים.${qNoteHe}\n\nנסה אחת מהשאלות המוצעות למטה, או שאל על עמוד או נושא ספציפי.`,
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

  return buildFallback(query);
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

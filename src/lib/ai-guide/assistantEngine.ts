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
      answerHe: "**TAMS** (Tokenized Asset Management System) היא תשתית השקעות מוסדית בתחום הבלוקצ'יין, שתוכננה לעמוד בסטנדרטים המחמירים ביותר של שוקי ההון.\n\nהפלטפורמה משלבת **3 אסטרטגיות מרכזיות**:\n• **החזקות ארוכות טווח** — צבירת הון באמצעות נכסים דיגיטליים איכותיים בעלי יסודות חזקים\n• **מסחר אקטיבי** — ניהול פוזיציות טקטי למיצוי הזדמנויות שוק\n• **תשואות DeFi** — הפקת תשואה מבוססת פרוטוקול (טווח יעד: 4-12% APY)\n\nהתיק כולל **16 נכסים נבחרים בקפידה מחקרית** ב-7 קטגוריות, מגובה ב-**259 רשומות ראיות מוסדיות מאומתות** מלמעלה מ-125 ארגונים מובילים ברחבי העולם.\n\nTAMS פועלת במסגרת מבנה קרן GP/LP, עם שירותי משמורת מוסדיים (Ledger + Fordefi), ותוכנית משקיעים מדורגת בת 4 רמות — החל מ-$10K ועד $1M+.",
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
      answerHe: "**אסטרטגיית ההשקעה של TAMS** מבוססת על **מודל עסקי בעל 6 מנועי צמיחה מקבילים**:\n\n• **החזקת נכסי ליבה** — צבירת ערך ארוכת טווח באמצעות נכסי תשתית איכותיים\n• **תשואות DeFi** — הפקת תשואה שיטתית מפרוטוקולים מובילים (4-12% APY)\n• **מסחר אקטיבי** — ייצור אלפא באמצעות מיצוב טקטי\n• **רוטציית סלי השקעה** — איזון מחדש דינמי המותאם לשינויי תזה\n• **הקצאת הון מבוקרת סיכון** — ניהול פוזיציות ממושמע בגבולות מוגדרים\n• **השתתפות בתשתיות** — מיצוי תגמולי סטייקינג וממשל\n\n**היקף שוק מיעד:**\n• TAM (שוק כולל): $2-3T\n• SAM (שוק ישים): $300-500B\n• SOM (שוק בר-השגה): $25-75M\n\nהאסטרטגיה נשענת על **תזת תמחור חסר מהותי** — תשתית הבלוקצ'יין מתומחרת כיום בחסר משמעותי ביחס לערך שתתפוס עם האימוץ המוסדי.\n\nלמסגרת המלאה, עיינו בעמוד **אסטרטגיה**.",
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
      answerHe: "**המודל העסקי** של TAMS מניב תשואות באמצעות **6 מנועי ערך הפועלים במקביל**:\n\n1. **החזקת נכסי ליבה** — צבירת ערך ארוכת טווח (40% מהתיק)\n2. **פריסת תשואות DeFi** — הלוואות, סטייקינג ומאגרי נזילות (הקצאה של 25%, יעד 4-12% APY)\n3. **מסחר אקטיבי** — פוזיציות טקטיות וייצור אלפא (הקצאה של 25%)\n4. **רוטציית סלי השקעה** — איזון מחדש דינמי בהתאם לעדכוני תזה\n5. **הקצאה מבוקרת סיכון** — ניהול גודל פוזיציות ממושמע עם מגבלות חשיפה קפדניות\n6. **השתתפות בתשתיות** — סטייקינג, ממשל ומיצוי תגמולי אקוסיסטם\n\n**הרכב התיק:** **32% מתכות יקרות** (זהב, כסף, נחושת) + **68% נכסים דיגיטליים** המפוזרים ב-7 קטגוריות מחקריות.\n\nלפירוט המלא, עיינו בעמוד **אסטרטגיה** (/strategy).",
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
      answerHe: "**התזה המרכזית של TAMS** מבוססת על הנחת יסוד אחת: **תשתית הבלוקצ'יין מתומחרת בחסר מהותי** ביחס לערך הכלכלי שהיא צפויה ללכוד עם התגברות האימוץ המוסדי.\n\n**הנדבכים המרכזיים של התזה:**\n• השוק מתמחר ספקולציה קמעונאית — ולא את התועלת האמיתית של תשתיות פיננסיות\n• טוקניזציה של נכסים ריאליים צפויה להרחיב את השוק הניתן לגישה ב-$16T+\n• האימוץ המוסדי נמצא בנקודת פיתול היסטורית (אישורי ETF, בהירות רגולטורית, שילוב בקופות תאגידיות)\n• מודרניזציית מערכות סליקה מהווה הזדמנות עצומה שטרם תומחרה\n• פרופיל הסיכון/תשואה הוא **א-סימטרי באופן מובהק** — חשיפת ירידה מוגבלת לצד פוטנציאל עלייה טרנספורמטיבי\n\nTAMS ממוקמת בשכבת התשתית הפיננסית, לא בשכבת הספקולציה. עיינו בעמוד **מהפך שוק** לניתוח התזמון ובעמוד **אסטרטגיה** למסגרת ההשקעה המלאה.",
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
      answerHe: "עמוד **ההוכחות** מרכז את מאגר הראיות המוסדי המלא של TAMS:\n\n• **259 רשומות ראיות מאומתות** המכסות 16 נכסי תיק\n• **למעלה מ-125 ארגונים מובילים** מצוטטים כמקורות\n• **כיסוי גיאוגרפי של 50+ מדינות** ברחבי העולם\n• סיווג שיטתי לפי **דרגות ביטחון מחקרי** (גבוה / בינוני / נמוך)\n\n**כלי ניתוח זמינים:**\n• **רשת תזות הנכסים** (Asset Thesis Grid) — ניקוד כמותי והתאמת תזה עבור כל נכס\n• **סייר הראיות** (Evidence Explorer) — סינון מתקדם לפי נכס, ארגון, גיאוגרפיה ורמת ביטחון\n• **מפת כיסוי אימוץ** (Adoption Coverage) — הדמיית הפיזור הגלובלי של ראיות מוסדיות\n\n**היררכיית מקורות (3 שכבות):**\n• שכבה 1 (ראשונית): דוחות רשמיים, הצהרות ממשלתיות, מאמרים אקדמיים שפיטים\n• שכבה 2 (משנית): ניתוחי בתי מחקר מובילים, עיתונות פיננסית מוכרת\n• שכבה 3 (נדחית): מדיה חברתית בלתי מאומתת, ספקולציות\n\nעברו ל-**/proof** לצפייה במאגר הראיות המלא.",
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
      answerHe: "תהליך ההשקעה ב-TAMS מובנה ב-4 שלבים:\n\n**1. סקירת ההזדמנות:**\nהתחילו במסלול: **אסטרטגיה** → **הוכחות** → **משקיעים** — לבניית תמונה מלאה.\n\n**2. בחירת מסלול השקעה:**\n• **Explorer** — $10,000: גישה לקהילת המשקיעים, דוחות חודשיים\n• **Builder** — $50,000: תדריכים שבועיים, גישה מועדפת לפיצ'רים חדשים\n• **Architect** — $250,000: סקירות תיק מותאמות אישית, ייעוץ אסטרטגי ישיר\n• **Visionary** — $1,000,000: השתתפות פעילה בממשל, זכויות צפייה בדירקטוריון\n\n**3. הגשת בקשת גישה:**\nעברו לעמוד **/access** להגשת בקשה חסויה לסקירה. ציינו את סוג המשקיע וטווח ההשקעה הצפוי.\n\n**4. תגובת צוות ההשקעות:**\nהצוות מגיב תוך **48 שעות** לפגישת היכרות חסויה.\n\n**ליצירת קשר ישיר:** contact@tams.earth",
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
      answerHe: "TAMS מציעה **4 מסלולי השקעה מדורגים** עם רמות גישה והטבות עולות:\n\n• **Explorer** ($10,000) — כניסה לקהילת המשקיעים, דוחות ביצועים חודשיים\n• **Builder** ($50,000) — תדריכי שוק שבועיים, גישה מועדפת לפיצ'רים חדשים\n• **Architect** ($250,000) — סקירות תיק מותאמות אישית, ייעוץ אסטרטגי ישיר\n• **Visionary** ($1,000,000) — השתתפות בוועדת ממשל, זכויות צפייה בדירקטוריון\n\nכלל המסלולים כוללים גישה מלאה לדשבורד המשקיעים עם מעקב תיק בזמן אמת וניתוח ביצועים.\n\nלהגשת בקשה חסויה, עברו לעמוד **/access**.",
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
      answerHe: "TAMS מחויבת לשקיפות מלאה ומפרטת **6 קטגוריות סיכון מרכזיות**:\n\n• **תנודתיות שוק** — חשיפה לתנודות מחירים חריפות בשוקי הנכסים הדיגיטליים\n• **סיכון רגולטורי** — שינויים בסביבה הרגולטורית במדינות ותחומי שיפוט שונים\n• **סיכון טכנולוגי** — פגיעויות בחוזים חכמים, כשלי אבטחת מידע\n• **סיכון נזילות** — מגבלות פוטנציאליות במימוש נכסים במחיר הוגן\n• **סיכון אובדן גישה** — אובדן מפתחות פרטיים משמעו אובדן בלתי הפיך של הנכסים\n• **סיכון צד נגדי** — חשיפה לכושר פירעון של צדדים שלישיים\n\n**הבהרה חשובה:** TAMS **אינה מהווה ייעוץ השקעות**. ביצועי עבר אינם מהווים ערובה לתוצאות עתידיות. כלל המידע מוגש למטרות מחקר וחינוך בלבד.\n\nגילוי סיכונים מקיף זמין בעמודי **משקיעים** ו**משפטי**.",
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
      answerHe: "**מדוע דווקא עכשיו?** שישה קטליסטורים מכריעים מתכנסים בו-זמנית — תופעה נדירה בשוקי ההון:\n\n1. **אישורי ETF** — קרנות סל של Bitcoin ו-Ethereum פותחות לראשונה ערוצי גישה מוסדרים\n2. **התבהרות רגולטורית** — מסגרות משפטיות ברורות מתגבשות בשווקים מובילים\n3. **אימוץ תאגידי** — חברות ציבוריות משלבות נכסים דיגיטליים במאזניהן\n4. **טוקניזציית נכסים ריאליים (RWA)** — פוטנציאל שוק של $16T+ בנכסים מטוקנזים\n5. **הבשלת פרוטוקולי DeFi** — צמיחת פלטפורמות העומדות בסטנדרטים מוסדיים\n6. **בגרות תשתית** — תשתית בלוקצ'יין מגיעה למוכנות ארגונית\n\n**היקף השווקים הניתנים לחדירה:**\n• תשלומים חוצי-גבולות: $1,000T\n• נכסים מנוהלים גלובלית: $147T\n• קרנות פנסיה: $58.5T\n\nלניתוח המלא, עיינו בעמוד **מהפך שוק** (/market-shift).",
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
      answerHe: "**אסטרטגיית ה-DeFi של TAMS** מכוונת לטווח תשואה של **4-12% APY** באמצעות:\n\n• **הלוואות מוסדיות** — פריסה בפרוטוקולי Aave ו-Compound\n• **סטייקינג** — סטייקינג מקורי ונזיל לצבירת תשואה שוטפת\n• **מאגרי נזילות** — מתן נזילות ב-Uniswap ו-Curve\n• **אופטימיזציה דינמית** — איזון מחדש אוטומטי בין רשתות לפי תשואה מותאמת-סיכון\n\n**מסגרת בקרות סיכון:**\n• תקרת חשיפה: **10%** מקסימום לפרוטוקול בודד\n• הקצאה כוללת: **25%** מהתיק המנוהל\n• תנאי סף: ביקורת חוזים חכמים נדרשת כתנאי כניסה\n• פיזור: פריסה רב-שרשרתית (3+ רשתות מינימום)\n• הגנה: מנגנוני מניעת חיסול אוטומטיים\n\nלפירוט המלא, עיינו בעמוד **DeFi** (/defi).",
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
      answerHe: "תיק TAMS מורכב מ-**16 נכסים שנבחרו במתודולוגיה מחקרית קפדנית**, המפוזרים ב-**7 קטגוריות השקעה**:\n\n• **תשלומים וניתוב** (27%) — XRP, XLM, XDC\n• **חוזים חכמים** (36%) — SOL, ADA, AVAX, HBAR, ONDO, HOLO\n• **נתונים וקישוריות** (14%) — LINK, QNT, FLR\n• **פתרונות סקלביליות** (7%) — MATIC, ARB\n• **אחסון מבוזר ונתונים** (7%) — FIL, AR\n• **פרוטוקולי DeFi** (14%) — AAVE, MKR\n• **מתכות יקרות** (32%) — זהב, כסף, נחושת\n\nכל נכס עובר תהליך סינון לפי 5 קריטריונים מובנים: רלוונטיות לתשתית פיננסית, עדויות לאימוץ מוסדי, בהירות רגולטורית, בשלות טכנולוגית וחוסן אקוסיסטם.\n\nלסקירת הנכסים המלאה, עיינו בעמוד **החזקות** (/holdings).",
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
      answerHe: "TAMS מפעילה **ארכיטקטורת 4 ארנקים מובנית** המאפשרת הפרדת תפקוד מלאה:\n\n• **החזקות ארוכות טווח** (40%) — נכסי ליבה לצבירת ערך לאורך זמן\n• **מסחר אקטיבי** (25%) — פוזיציות טקטיות וייצור אלפא\n• **תשואות DeFi** (25%) — פריסה בפרוטוקולים מובילים לתשואה שוטפת (4-12% APY)\n• **תפעול שוטף** (10%) — רזרבות Gas, חוצצים ותקציב תפעולי\n\nכלל הארנקים מנוהלים תחת **ארנק מאסטר** (בקר ההקצאות המרכזי) בתשתית אבטחה תלת-שכבתית:\n• **Ledger Flex** — משמורת חומרתית (Cold Storage) לנכסים דיגיטליים\n• **Fordefi** — פלטפורמת ניהול תיקים ברמה מוסדית\n• **Multi-Sig** — דרישת אישור מרובה חתימות לכל עסקה\n\nלצפייה בדיאגרמה המלאה, עיינו בעמוד **ארכיטקטורה** (/architecture).",
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
      answerHe: "**מיפוי השוק הניתן לגישה (Market Sizing):**\n\n• **TAM** (Total Addressable Market): **$2-3 טריליון** — היקף שוק תשתיות הבלוקצ'יין וניהול הנכסים הדיגיטליים הגלובלי\n• **SAM** (Serviceable Addressable Market): **$300-500 מיליארד** — הפלח המוסדי הרלוונטי לפעילות TAMS\n• **SOM** (Serviceable Obtainable Market): **$25-75 מיליון** — יעד ריאלי בר-השגה בטווח הקרוב\n\nהתזה גורסת כי תשתיות בלוקצ'יין תלכודנה נתח הולך וגדל מהשווקים המסורתיים:\n• תשלומים חוצי-גבולות (היקף שוק: $1,000T)\n• נכסים מנוהלים גלובלית ($147T)\n• קרנות פנסיה ופרישה ($58.5T)\n• נדל\"ן מטוקנז ($4.3T)\n\nלניתוח המלא, עיינו בעמוד **אסטרטגיה** (/strategy).",
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
      answerHe: "**חזון TAMS:** להקים את תשתית ההשקעות המוסדית המובילה בתחום הבלוקצ'יין — ליצור גשר מקצועי בין עולם הנכסים הדיגיטליים לסטנדרטים המחמירים של שוקי ההון המסורתיים.\n\n**המשימה:** לספק תשתית ניהול נכסים דיגיטליים ברמה מקצועית — המשלבת מחקר מעמיק, מסחר מתקדם, ניהול סיכונים קפדני, ציות רגולטורי מקיף ושקיפות מלאה כלפי המשקיעים.\n\n**ארבעת עקרונות היסוד:**\n1. ניתוח מונחה-מחקר — כל החלטה נשענת על נתונים ולא על הייפ\n2. גישת סיכון ראשית — שמירה על ההון קודמת לחיפוש תשואה\n3. משמעת מוסדית — עמידה בסטנדרטים של ניהול השקעות מסורתי\n4. שקיפות ותקשורת — דיווח שוטף וגישה לנתונים בזמן אמת\n\nלפירוט המלא, עיינו בעמוד **חברה** (/company).",
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
      answerHe: "**מתודולוגיית המחקר של TAMS — מסגרת שיטתית ומבוקרת:**\n\n**קריטריוני בחירת נכסים** (5 ציריי הערכה):\n1. רלוונטיות לתשתית פיננסית גלובלית\n2. עדויות מוכחות לאימוץ מוסדי\n3. בהירות וודאות רגולטורית\n4. בשלות ואמינות טכנולוגית\n5. עוצמת ומגוון האקוסיסטם\n\n**מודל סיווג ראיות (3 שכבות):**\n• שכבה 1 (מקורות ראשוניים): דוחות רשמיים, מסמכי ממשלה, מאמרים אקדמיים שפיטים\n• שכבה 2 (מקורות משניים): ניתוחי בתי מחקר, כלי תקשורת פיננסיים מוכרים\n• שכבה 3 (נדחית): מדיה חברתית בלתי מאומתת, ספקולציות\n\n**כללי בניית תיק:**\n• תקרת חשיפה: 20% לקטגוריה, 15% לנכס בודד\n• מינימום 4 קטגוריות תזה לפיזור\n• הערכה מחדש רבעונית מקיפה\n\n**מודל ניקוד סיכון** (4 ממדים): רלוונטיות פיננסית, בשלות אימוץ, חוסן אקוסיסטם, רמת ביטחון אימות\n\nלמסגרת המתודולוגית המלאה, עיינו בעמוד **מתודולוגיה** (/methodology).",
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
      answerHe: "**דשבורד המשקיעים** (נגיש לאחר הזדהות מאובטחת) מספק סקירה מקיפה ברמה מוסדית:\n\n• **סקירת תיק כוללת** — שווי נוכחי, תשואות יומיות/שבועיות/חודשיות\n• **תצוגת החזקות מפורטת** — 16 נכסים עם משקלות הקצאה ורווח/הפסד פר נכס\n• **מעקב פוזיציות DeFi** — פוזיציות תשואה פעילות עם ניטור APY שוטף\n• **ניתוח ביצועים היסטורי** — גרפי מגמה ל-12 חודשים אחרונים\n• **יומן עסקאות מלא** — תיעוד מפורט עם למעלה מ-10 סוגי פעולות\n• **יתרות ארנקים** — פירוט לפי 4 חטיבות הארנק המובנות\n\nמדובר בממשק מעקב בזמן אמת **ברמת Bloomberg Terminal** — מותאם למשקיעים מוסדיים.\n\nגישה דרך **/login** או באמצעות כפתור פורטל המשקיעים בתפריט הצדדי.",
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
      answerHe: "TAMS מפעילה **מודל תרחישים תלת-שכבתי** לניתוח רגישות:\n\n1. **תרחיש שמרני (Conservative)** — צמיחה אורגנית בסיסית, כניסות הון מוסדי הדרגתיות\n2. **תרחיש מרכזי (Moderate)** — מסלול הצפי הסביר, התגברות שיטתית בהשתתפות מוסדית\n3. **תרחיש מואץ (Accelerated)** — מקרה שורי מובהק, זרימת הון מוסדי מהירה בהנעת אישורי ETF ובהירות רגולטורית\n\nכל תרחיש כולל הקרנות ביצועי תיק המותאמות לשיעורי אימוץ משתנים, תנאי שוק שונים ותזמון קטליסטורים.\n\nלמודל התרחישים המלא, עיינו בעמוד **אסטרטגיה** (/strategy).",
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
      answerHe: "**היתרונות התחרותיים המבניים של TAMS:**\n\n1. **בהירות שוק** — הבנה מובנית של שכבת התשתית לעומת שכבת הספקולציה\n2. **מודל רב-אסטרטגי** — 6 מנועי ערך מקבילים במקום חשיפה חד-וקטורית\n3. **תפיסת משקיע מוסדי** — משמעת ניהולית מקצועית, לא גישה קמעונאית ספקולטיבית\n4. **מיצוב תזמון** — כניסה בנקודת ההטיה של האימוץ המוסדי הגלובלי\n\nבשונה מקרנות קריפטו קונבנציונליות, TAMS ממוקדת ב**ערך תשתיתי מוכח** ולא בהייפ שוק. **259 רשומות ראיות מאומתות** ומתודולוגיית מחקר בת 3 שכבות מעידות על תהליך בחירה קפדני ושיטתי.\n\nלפירוט המלא, עיינו בעמוד **אסטרטגיה** (/strategy).",
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
      answerHe: "**מבנה הקצאת תיק TAMS — סקירה מקיפה:**\n\n**הקצאה לפי חטיבת ארנק:**\n• החזקות ארוכות טווח: **40%** — צבירת ערך בנכסי תשתית איכותיים\n• מסחר אקטיבי: **25%** — פוזיציות טקטיות וייצור אלפא\n• תשואות DeFi: **25%** — הפקת תשואה מפרוטוקולים (4-12% APY)\n• תפעול שוטף: **10%** — רזרבות Gas וחוצצים תפעוליים\n\n**הקצאה לפי סוג נכס:**\n• מתכות יקרות: **32%** (זהב, כסף, נחושת)\n• נכסים דיגיטליים: **68%** — מפוזרים ב-7 קטגוריות מחקריות\n\n**פירוט הנכסים הדיגיטליים לפי קטגוריה:**\n• חוזים חכמים: 36% (SOL, ADA, AVAX, HBAR, ONDO, HOLO)\n• תשלומים וניתוב: 27% (XRP, XLM, XDC)\n• נתונים וקישוריות: 14% (LINK, QNT, FLR)\n• פרוטוקולי DeFi: 14% (AAVE, MKR)\n• פתרונות סקלביליות: 7% (MATIC, ARB)\n• אחסון מבוזר: 7% (FIL, AR)\n• פרטיות וזהות: 5% (WLD)\n\nלתרשים ההקצאה המלא, עיינו בעמוד **ארכיטקטורה** (/architecture).",
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

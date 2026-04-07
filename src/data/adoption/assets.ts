// פרופילי תזה מוסדית לכל נכס בפורטפוליו — סיכום רלוונטיות, ציונים, וסיכונים
import type { AssetThesisProfile } from "./types";

export const assetProfiles: AssetThesisProfile[] = [
  {
    ticker: "ETH",
    name: "Ethereum",
    thesisCategories: ["smart-contract-infrastructure", "tokenization-rwa", "custody-settlement"],
    primaryCategory: "smart-contract-infrastructure",
    institutionalSummary:
      "פלטפורמת החוזים החכמים הדומיננטית המשמשת כשכבת הסליקה עבור מרבית ה-DeFi המוסדי, הנכסים המטוקנים והתשתית הפיננסית on-chain. מארחת את BlackRock BUIDL, מספר תעודות ETF, ואת המערכת האקולוגית הרחבה ביותר של כלים ארגוניים.",
    adoptionThemes: [
      "מוצר השקעה ברמת ETF",
      "שכבת סליקה ראשית לטוקניזציה",
      "עמוד השדרה של DeFi מוסדי",
      "מערכת אקולוגית של כלים ארגוניים",
    ],
    riskNote:
      "עמלות Gas גבוהות בעומס; פיצול L2; חוסר ודאות רגולטורי בסיווג Staking.",
    scores: {
      financeRelevance: 10,
      adoptionMaturity: 9,
      ecosystemStrength: 10,
      verificationConfidence: 10,
    },
  },
  {
    ticker: "SOL",
    name: "Solana",
    thesisCategories: ["smart-contract-infrastructure", "financial-rails", "developer-ecosystem"],
    primaryCategory: "smart-contract-infrastructure",
    institutionalSummary:
      "Layer 1 בעל ביצועים גבוהים הצובר אחיזה מוסדית באמצעות אינטגרציות תשלום (Visa, PayPal PYUSD, Stripe), צמיחת DeFi וסופיות תת-שנייתית. ממוצב כרשת הראשית לפעילות on-chain בתדירות גבוהה.",
    adoptionThemes: [
      "אינטגרציות רשתות תשלום",
      "פסי סליקה של Stablecoins",
      "DeFi בתדירות גבוהה",
      "צמיחה מהירה של מערכת אקולוגית למפתחים",
    ],
    riskNote:
      "היסטוריה של השבתות רשת; חששות ריכוזיות של מאמתים; תחרות עזה ממערכת ה-L2 של Ethereum.",
    scores: {
      financeRelevance: 8,
      adoptionMaturity: 7,
      ecosystemStrength: 8,
      verificationConfidence: 8,
    },
  },
  {
    ticker: "AVAX",
    name: "Avalanche",
    thesisCategories: ["tokenization-rwa", "institutional-blockchain", "smart-contract-infrastructure"],
    primaryCategory: "institutional-blockchain",
    institutionalSummary:
      "ארכיטקטורת Subnet מודולרית המושכת פיילוטים מוסדיים לטוקניזציה מחברות פיננסיות מובילות. Citi, JPMorgan ו-WisdomTree ביצעו ניסויים על Subnets של Avalanche עבור נכסים מטוקנים וסליקה חוצת-שרשראות.",
    adoptionThemes: [
      "פריסות Subnet מוסדיות",
      "פלטפורמה לפיילוטים של טוקניזציה",
      "התאמה אישית ברמה ארגונית",
      "סופיות מהירה למקרי שימוש פיננסיים",
    ],
    riskNote:
      "אימוץ Subnets עדיין בחיתוליו; TVL נמוך ב-DeFi ביחס למתחרים; פיילוטים מוסדיים עשויים שלא להפוך לפריסות ייצור.",
    scores: {
      financeRelevance: 7,
      adoptionMaturity: 6,
      ecosystemStrength: 6,
      verificationConfidence: 7,
    },
  },
  {
    ticker: "ALGO",
    name: "Algorand",
    thesisCategories: ["institutional-blockchain", "financial-rails", "enterprise-integration"],
    primaryCategory: "institutional-blockchain",
    institutionalSummary:
      "בלוקצ'יין בעל בסיס אקדמי מחמיר עם מיקוד בממשלות, פיילוטים של CBDC ותשתית פיננסית מפוקחת. חתם על חוזים עם מספר גופים ממשלתיים ובנקים מרכזיים, בעיקר בשווקים מתעוררים.",
    adoptionThemes: [
      "פלטפורמת תשתית CBDC",
      "אימוץ בלוקצ'יין ממשלתי",
      "ארכיטקטורה מוכוונת ציות",
      "פעילות שלילית-פחמן",
    ],
    riskNote:
      "מערכת DeFi מוגבלת; היסטוריה של מכירות טוקנים על ידי הקרן; לוחות זמנים לאימוץ ממשלתי נוטים להתארך משמעותית.",
    scores: {
      financeRelevance: 6,
      adoptionMaturity: 5,
      ecosystemStrength: 4,
      verificationConfidence: 6,
    },
  },
  {
    ticker: "SUI",
    name: "Sui",
    thesisCategories: ["smart-contract-infrastructure", "developer-ecosystem"],
    primaryCategory: "developer-ecosystem",
    institutionalSummary:
      "Layer 1 מהדור הבא עם ארכיטקטורה מבוססת אובייקטים שמקורה בפרויקט Diem של Meta. מציע ביצוע מקבילי לתפוקה גבוהה. עדיין בשלב מוקדם במחזור האימוץ המוסדי אך צומח במהירות בפעילות מפתחים ומדדי DeFi.",
    adoptionThemes: [
      "מודל ביצוע מקבילי חדשני",
      "ערבויות בטיחות של שפת Move",
      "התרחבות מהירה של המערכת האקולוגית",
      "מיקוד בבלוקצ'יין לגיימינג וצרכנות",
    ],
    riskNote:
      "מערכת אקולוגית צעירה עם רקורד מוסדי מוגבל; שחרורי טוקנים משמעותיים של VC; לא הוכח במקרי שימוש פיננסיים מפוקחים.",
    scores: {
      financeRelevance: 4,
      adoptionMaturity: 4,
      ecosystemStrength: 6,
      verificationConfidence: 5,
    },
  },
  {
    ticker: "NEAR",
    name: "NEAR Protocol",
    thesisCategories: ["smart-contract-infrastructure", "developer-ecosystem", "interoperability"],
    primaryCategory: "developer-ecosystem",
    institutionalSummary:
      "Layer 1 מפוצל החולש על Chain Abstraction — הרעיון שמשתמשים פועלים בין בלוקצ'יינים מבלי לדעת על איזו שרשרת הם נמצאים. אינטגרציית AI וקליטה פשוטה ממצבים את NEAR למסלולי אימוץ מיינסטרים.",
    adoptionThemes: [
      "חזון Chain Abstraction",
      "שכבת אינטגרציית AI",
      "פישוט קליטת משתמשים",
      "יכולת פעולה הדדית חוצת-שרשראות",
    ],
    riskNote:
      "חזון ה-Chain Abstraction שאפתני אך לא הוכח בקנה מידה; מערכת מפתחים קטנה יותר מהמתחרים המובילים; תמחור תלוי-נרטיב.",
    scores: {
      financeRelevance: 4,
      adoptionMaturity: 5,
      ecosystemStrength: 6,
      verificationConfidence: 5,
    },
  },
  {
    ticker: "XRP",
    name: "XRP Ledger",
    thesisCategories: ["financial-rails", "custody-settlement", "enterprise-integration"],
    primaryCategory: "financial-rails",
    institutionalSummary:
      "נבנה במיוחד לתשלומים חוצי-גבולות עם סליקה תת-שנייתית. מוצר On-Demand Liquidity של Ripple משמש מוסדות פיננסיים להעברות בינלאומיות. בהירות רגולטורית לאחר SEC פתחה מסלולים מוסדיים בשוק האמריקאי.",
    adoptionThemes: [
      "פסי תשלום חוצי-גבולות",
      "מסדרונות בנקאות והעברות כספים",
      "בהירות רגולטורית לאחר SEC",
      "מוצר נזילות מוסדי",
    ],
    riskNote:
      "תחרות מ-Stablecoins ו-CBDCs; חששות ריכוזיות סביב אחזקות Ripple; אימוץ איטי יותר מהתחזיות המוקדמות.",
    scores: {
      financeRelevance: 8,
      adoptionMaturity: 7,
      ecosystemStrength: 5,
      verificationConfidence: 7,
    },
  },
  {
    ticker: "XLM",
    name: "Stellar",
    thesisCategories: ["financial-rails", "financial-rails", "enterprise-integration"],
    primaryCategory: "financial-rails",
    institutionalSummary:
      "רשת תשלומים פתוחה המתמקדת בהכלה פיננסית, העברות כספים והפצת Stablecoins. USDC של Circle פועל באופן מקורי על Stellar. מיקוד בשווקים מתפתחים ותשתית מוכנה לציות.",
    adoptionThemes: [
      "פסי הפצה של Stablecoins",
      "תשתית הכלה פיננסית",
      "מיקוד בשווקים מתפתחים",
      "רשת תשלומים מוכנה לציות",
    ],
    riskNote:
      "שותפויות היסטוריות עם MoneyGram ו-IBM World Wire הסתיימו; פעילות רשת צנועה ביחס לשאיפות; חוזים חכמים של Soroban עדיין בשלב מוקדם.",
    scores: {
      financeRelevance: 6,
      adoptionMaturity: 5,
      ecosystemStrength: 4,
      verificationConfidence: 5,
    },
  },
  {
    ticker: "XDC",
    name: "XDC Network",
    thesisCategories: ["enterprise-integration", "tokenization-rwa", "financial-rails"],
    primaryCategory: "enterprise-integration",
    institutionalSummary:
      "בלוקצ'יין ארגוני שתוכנן במיוחד למימון סחר — שוק בהיקף $5.2T שאינו מקבל מענה מספק. שותפויות עם פלטפורמות מימון סחר לטוקניזציה של חשבוניות, מימון שרשרת אספקה ומכתבי אשראי on-chain.",
    adoptionThemes: [
      "דיגיטציה של מימון סחר",
      "מימון שרשרת אספקה",
      "טוקניזציה של חשבוניות",
      "ציות ברמה ארגונית",
    ],
    riskNote:
      "מיקוד נישתי מגביל אימוץ רחב; מודעות ציבורית ונזילות נמוכות; לוחות זמנים לאימוץ בלוקצ'יין ארגוני בלתי צפויים.",
    scores: {
      financeRelevance: 6,
      adoptionMaturity: 4,
      ecosystemStrength: 3,
      verificationConfidence: 5,
    },
  },
  {
    ticker: "HBAR",
    name: "Hedera",
    thesisCategories: ["institutional-blockchain", "enterprise-integration", "custody-settlement"],
    primaryCategory: "institutional-blockchain",
    institutionalSummary:
      "מנוהל על ידי מועצה של עד 39 חברות Fortune 500 (Google, IBM, Boeing, Deutsche Telekom). קונסנזוס Hashgraph מספק סדר הוגן מתמטית ותפוקה גבוהה. מודל ממשל ייחודי המעניק לגיטימציה מוסדית.",
    adoptionThemes: [
      "מועצת ממשל של Fortune 500",
      "פתרונות שרשרת אספקה ארגוניים",
      "טכנולוגיית קונסנזוס Hashgraph",
      "קיימות ושוקי פחמן",
    ],
    riskNote:
      "ממשל מועצתי נתפס כריכוזיות; מערכת DeFi מוגבלת; עודף היצע טוקנים מהקרן; חברות במועצה אינה מבטיחה שימוש פעיל.",
    scores: {
      financeRelevance: 6,
      adoptionMaturity: 5,
      ecosystemStrength: 5,
      verificationConfidence: 6,
    },
  },
  {
    ticker: "LINK",
    name: "Chainlink",
    thesisCategories: ["oracle-data-infrastructure", "interoperability", "smart-contract-infrastructure"],
    primaryCategory: "oracle-data-infrastructure",
    institutionalSummary:
      "רשת ה-oracle הדומיננטית המאבטחת למעלה מ-$75B בערך DeFi. CCIP (Cross-Chain Interoperability Protocol) ממצב את Chainlink כשכבת המסרים בין בלוקצ'יינים. SWIFT, DTCC ו-ANZ Bank ביצעו פיילוטים של אינטגרציה.",
    adoptionThemes: [
      "תשתית DeFi קריטית",
      "פרוטוקול מסרים חוצה-שרשראות",
      "פיילוט אינטגרציה עם SWIFT",
      "פידים מוסדיים של נתונים",
    ],
    riskNote:
      "מודל הכנסות עדיין בהתפתחות; סבסוד SCALE עשוי להסוות ביקוש אמיתי; תחרות מ-Pyth ו-API3; CCIP מתחרה בגשרים מתמחים.",
    scores: {
      financeRelevance: 8,
      adoptionMaturity: 8,
      ecosystemStrength: 9,
      verificationConfidence: 9,
    },
  },
  {
    ticker: "QNT",
    name: "Quant",
    thesisCategories: ["interoperability", "enterprise-integration", "institutional-blockchain"],
    primaryCategory: "interoperability",
    institutionalSummary:
      "יכולת פעולה הדדית בין בלוקצ'יינים ברמה ארגונית באמצעות פרוטוקול Overledger. ממוקד במוסדות פיננסיים מפוקחים ותשתית בנקים מרכזיים. שותפויות עם ספקי תשלום אירופיים ומעורבות ביוזמות CBDC.",
    adoptionThemes: [
      "תקן יכולת פעולה הדדית ארגוני",
      "מעורבות בתשתית CBDC",
      "אינטגרציית תשלום אירופית",
      "מיקוד בסביבה מפוקחת",
    ],
    riskNote:
      "טכנולוגיה סגורת-קוד מגבילה שקיפות; צוות קטן; אימות הכנסות עדיין בתהליך; אינטגרציית DeFi נמוכה.",
    scores: {
      financeRelevance: 7,
      adoptionMaturity: 4,
      ecosystemStrength: 3,
      verificationConfidence: 5,
    },
  },
  {
    ticker: "ONDO",
    name: "Ondo Finance",
    thesisCategories: ["tokenization-rwa", "custody-settlement", "financial-rails"],
    primaryCategory: "tokenization-rwa",
    institutionalSummary:
      "פרוטוקול טוקניזציה מוביל המגשר בין אגרות חוב אמריקאיות ומוצרי תשואה מוסדיים לבין DeFi. USDY ו-OUSG מגובים בניירות ערך ממשלתיים אמיתיים. שותפות עם קרן BUIDL של BlackRock מעניקה אמינות מוסדית ללא תחרות.",
    adoptionThemes: [
      "מוצרי אגרות חוב אמריקאיות מטוקנים",
      "שותפות עם BlackRock BUIDL",
      "תשואה מוסדית on-chain",
      "הפצת RWA רב-שרשרתית",
    ],
    riskNote:
      "סיכון רגולטורי סביב ניירות ערך מטוקנים; תלות בסביבת ריבית; סיכוני חוזים חכמים וגשרים חוצי-שרשראות.",
    scores: {
      financeRelevance: 9,
      adoptionMaturity: 6,
      ecosystemStrength: 6,
      verificationConfidence: 8,
    },
  },
  {
    ticker: "CFG",
    name: "Centrifuge",
    thesisCategories: ["tokenization-rwa", "financial-rails"],
    primaryCategory: "tokenization-rwa",
    institutionalSummary:
      "פרוטוקול מבוזר המחבר את שוק האשראי הפרטי בהיקף $100T+ לנזילות DeFi. משולב עם MakerDAO ו-Aave כמקור תשואה מהעולם האמיתי באמצעות חשבוניות מטוקנות, נדל\"ן ואשראי מובנה.",
    adoptionThemes: [
      "טוקניזציה של אשראי פרטי",
      "אינטגרציית RWA עם MakerDAO",
      "מאגרים מוסדיים של Aave",
      "תשואה מהעולם האמיתי מקורית ל-DeFi",
    ],
    riskNote:
      "סיכון חדלות פירעון על נכסים מהעולם האמיתי; מסגרות משפטיות עדיין בהתפתחות; צוות קטן ו-TVL צנוע; נזילות טוקן CFG נמוכה.",
    scores: {
      financeRelevance: 7,
      adoptionMaturity: 5,
      ecosystemStrength: 4,
      verificationConfidence: 7,
    },
  },
  {
    ticker: "RNDR",
    name: "Render Network",
    thesisCategories: ["ai-compute", "developer-ecosystem"],
    primaryCategory: "ai-compute",
    institutionalSummary:
      "שוק מבוזר של כוח עיבוד GPU המחבר עומסי עבודה של AI/ML וביקוש לרינדור תלת-ממדי עם אספקת GPU מבוזרת. מעבר ל-Solana שיפר את התפוקה. ממוצב בצומת בין ביקוש לעיבוד AI לבין תשתית מבוזרת.",
    adoptionThemes: [
      "שוק GPU מבוזר",
      "תשתית עיבוד AI/ML",
      "רינדור מחשוב מרחבי",
      "אימוץ על ידי יוצרים ואולפנים",
    ],
    riskNote:
      "תחרות מספקי ענן ריכוזיים; אמינות אספקת GPU; כלכלת טוקנים עדיין מתבגרת; עיבוד AI עשוי לעבור לחומרה מתמחה.",
    scores: {
      financeRelevance: 3,
      adoptionMaturity: 5,
      ecosystemStrength: 5,
      verificationConfidence: 5,
    },
  },
  {
    ticker: "TAO",
    name: "Bittensor",
    thesisCategories: ["ai-compute"],
    primaryCategory: "ai-compute",
    institutionalSummary:
      "רשת AI מבוזרת היוצרת שוק פתוח לאינטליגנציה מכונה באמצעות התמחות Subnet. גישה ניסיונית לתמרוץ פיתוח מודלי AI מחוץ לשליטה תאגידית ריכוזית. פרופיל הסיכון/תשואה הגבוה ביותר בפורטפוליו.",
    adoptionThemes: [
      "שוק AI מבוזר",
      "מודל התמחות Subnet",
      "תזה נגדית לריכוזיות AI",
      "רשת אינטליגנציה פתוחה",
    ],
    riskNote:
      "שלב מוקדם ביותר; מדדי איכות לא מוכחים; סיכוני Sybil ומניפולציה; מחיר טוקן ספקולטיבי ביותר; עשוי שלא להתחרות באיכות AI ריכוזי.",
    scores: {
      financeRelevance: 2,
      adoptionMaturity: 2,
      ecosystemStrength: 3,
      verificationConfidence: 3,
    },
  },
];

// מיפוי מהיר לגישה לפי ticker
export const assetProfileMap = Object.fromEntries(
  assetProfiles.map((a) => [a.ticker, a])
) as Record<string, AssetThesisProfile>;

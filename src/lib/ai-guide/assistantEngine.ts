// מנוע המדריך — מזהה כוונת שאלה ומחזיר תשובה מהידע הפנימי
import {
  sitePages,
  topicMap,
  glossary,
  navigationFlows,
  type PageKnowledge,
  type TopicEntry,
  type GlossaryEntry,
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

// === ניקוד רלוונטיות ===

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[?!.,;:'"()\-–—]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

function matchScore(query: string, keywords: string[]): number {
  const queryTokens = tokenize(query);
  let score = 0;
  for (const qt of queryTokens) {
    for (const kw of keywords) {
      const kwLower = kw.toLowerCase();
      if (kwLower === qt) {
        score += 3;
      } else if (kwLower.includes(qt) || qt.includes(kwLower)) {
        score += 1.5;
      }
    }
  }
  return score;
}

// === מציאת עמודים רלוונטיים ===

function findRelevantPages(query: string, currentRoute?: string): PageKnowledge[] {
  const scored = sitePages.map((page) => {
    const allKeywords = [
      ...page.keywords,
      page.name,
      page.nameHe,
      page.route,
      ...page.sections.flatMap((s) => [s.title, s.titleHe, ...s.keyPoints, ...s.keyPointsHe]),
    ];
    let score = matchScore(query, allKeywords);
    // העדפה לעמוד הנוכחי
    if (currentRoute && page.route === currentRoute) {
      score += 2;
    }
    return { page, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((s) => s.page);
}

// === מציאת נושאים רלוונטיים ===

function findRelevantTopics(query: string): TopicEntry[] {
  const scored = topicMap.map((topic) => {
    const allKeywords = [
      ...topic.keywords,
      topic.topic,
      topic.topicHe,
    ];
    return { topic, score: matchScore(query, allKeywords) };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.topic);
}

// === מציאת מונח מילון ===

function findGlossaryMatch(query: string): GlossaryEntry | null {
  const queryLower = query.toLowerCase();
  return (
    glossary.find(
      (g) =>
        queryLower.includes(g.term.toLowerCase()) ||
        queryLower.includes(g.termHe)
    ) ?? null
  );
}

// === זיהוי כוונה ===

type Intent = "navigation" | "explanation" | "concept" | "orientation" | "glossary" | "general";

function detectIntent(query: string): Intent {
  const q = query.toLowerCase();

  // ניווט
  const navPatterns = [
    "where", "find", "navigate", "go to", "show me", "take me", "open",
    "איפה", "למצוא", "לנווט", "תראה", "תפתח", "לגשת", "קח אותי", "איך מגיעים",
  ];
  if (navPatterns.some((p) => q.includes(p))) return "navigation";

  // הסבר עמוד
  const explainPatterns = [
    "what is this page", "what am i seeing", "what does this", "what is showing",
    "purpose of", "what does the", "what can i see", "explain this",
    "מה העמוד הזה", "מה אני רואה", "מה זה מראה", "מטרת", "מה אני יכול לראות", "תסביר",
  ];
  if (explainPatterns.some((p) => q.includes(p))) return "explanation";

  // התמצאות
  const orientPatterns = [
    "new here", "where should i start", "first time", "guide me", "important pages",
    "5 minutes", "quick", "recommend", "start", "order",
    "חדש כאן", "איפה להתחיל", "פעם ראשונה", "תדריך", "עמודים חשובים",
    "5 דקות", "מהיר", "המלצה", "להתחיל", "סדר",
  ];
  if (orientPatterns.some((p) => q.includes(p))) return "orientation";

  // מונח מילון
  const glossaryMatch = findGlossaryMatch(query);
  if (glossaryMatch) {
    const qTokens = tokenize(query);
    const isDefinitionQuestion = ["what is", "what does", "define", "meaning", "מה זה", "הגדרה", "משמעות"].some(
      (p) => q.includes(p)
    );
    if (isDefinitionQuestion && qTokens.length <= 6) return "glossary";
  }

  // מושג
  const conceptPatterns = [
    "what is the", "how does", "why does", "difference between", "business model",
    "strategy", "thesis", "claim",
    "מה זה", "איך עובד", "למה", "ההבדל בין", "מודל עסקי", "אסטרטגיה", "תזה", "טענה",
  ];
  if (conceptPatterns.some((p) => q.includes(p))) return "concept";

  return "general";
}

// === בניית תשובה ===

function buildNavigationAnswer(query: string, pages: PageKnowledge[], _currentRoute?: string): GuideResponse {
  const mainPage = pages[0];
  if (!mainPage) return buildFallback();

  const otherPages = pages.slice(1, 3);
  const otherRefs = otherPages
    .map((p) => `${p.name} (${p.route})`)
    .join(", ");
  const otherRefsHe = otherPages
    .map((p) => `${p.nameHe} (${p.route})`)
    .join(", ");

  return {
    answer: `You can find that on the **${mainPage.name}** page at **${mainPage.route}**. ${mainPage.purpose}${otherRefs ? `\n\nRelated pages: ${otherRefs}` : ""}`,
    answerHe: `תוכל למצוא את זה בעמוד **${mainPage.nameHe}** בכתובת **${mainPage.route}**. ${mainPage.purposeHe}${otherRefsHe ? `\n\nעמודים קשורים: ${otherRefsHe}` : ""}`,
    relevantPages: pages.slice(0, 3).map((p) => ({ route: p.route, name: p.name, nameHe: p.nameHe })),
    suggestedFollowUp: [
      `What does the ${mainPage.name} page show?`,
      "What should I view next?",
      "How does this connect to the strategy?",
    ],
    suggestedFollowUpHe: [
      `מה מציג עמוד ה${mainPage.nameHe}?`,
      "מה כדאי לצפות בהמשך?",
      "איך זה מתחבר לאסטרטגיה?",
    ],
    category: "navigation",
  };
}

function buildExplanationAnswer(query: string, pages: PageKnowledge[], currentRoute?: string): GuideResponse {
  // נעדיף את העמוד הנוכחי אם קיים
  const targetPage = currentRoute
    ? pages.find((p) => p.route === currentRoute) ?? pages[0]
    : pages[0];

  if (!targetPage) return buildFallback();

  const sectionsText = targetPage.sections
    .map((s) => `**${s.title}** — ${s.meaning}`)
    .join("\n");
  const sectionsTextHe = targetPage.sections
    .map((s) => `**${s.titleHe}** — ${s.meaningHe}`)
    .join("\n");

  const keyPointsSample = targetPage.sections
    .slice(0, 2)
    .flatMap((s) => s.keyPoints.slice(0, 2))
    .join("; ");
  const keyPointsSampleHe = targetPage.sections
    .slice(0, 2)
    .flatMap((s) => s.keyPointsHe.slice(0, 2))
    .join("; ");

  return {
    answer: `**${targetPage.name}** (${targetPage.route})\n\n${targetPage.purpose}\n\n**Key Investor Takeaway:** ${targetPage.investorTakeaway}\n\n**Sections on this page:**\n${sectionsText}\n\n**Highlights:** ${keyPointsSample}`,
    answerHe: `**${targetPage.nameHe}** (${targetPage.route})\n\n${targetPage.purposeHe}\n\n**מסר מרכזי למשקיע:** ${targetPage.investorTakeawayHe}\n\n**סעיפים בעמוד זה:**\n${sectionsTextHe}\n\n**דגשים:** ${keyPointsSampleHe}`,
    relevantPages: [
      { route: targetPage.route, name: targetPage.name, nameHe: targetPage.nameHe },
      ...targetPage.suggestedNext.slice(0, 2).map((r) => {
        const p = sitePages.find((sp) => sp.route === r);
        return { route: r, name: p?.name ?? r, nameHe: p?.nameHe ?? r };
      }),
    ],
    suggestedFollowUp: [
      ...(targetPage.suggestedNext[0]
        ? [`What is the ${sitePages.find((p) => p.route === targetPage.suggestedNext[0])?.name ?? "next"} page about?`]
        : []),
      "What is the investor takeaway here?",
      "How does this connect to the overall strategy?",
    ],
    suggestedFollowUpHe: [
      ...(targetPage.suggestedNext[0]
        ? [`על מה עמוד ה${sitePages.find((p) => p.route === targetPage.suggestedNext[0])?.nameHe ?? "הבא"}?`]
        : []),
      "מה המסר המרכזי למשקיע כאן?",
      "איך זה מתחבר לאסטרטגיה הכללית?",
    ],
    category: "explanation",
  };
}

function buildConceptAnswer(query: string, pages: PageKnowledge[], topics: TopicEntry[]): GuideResponse {
  const mainTopic = topics[0];
  const mainPage = pages[0];

  if (!mainPage) return buildFallback();

  const topicDescription = mainTopic?.description ?? mainPage.purpose;
  const topicDescriptionHe = mainTopic?.descriptionHe ?? mainPage.purposeHe;

  // אסוף נקודות מפתח רלוונטיות
  const relevantSections = pages
    .slice(0, 2)
    .flatMap((p) => p.sections)
    .slice(0, 3);
  const keyPoints = relevantSections.flatMap((s) => s.keyPoints.slice(0, 2));
  const keyPointsHe = relevantSections.flatMap((s) => s.keyPointsHe.slice(0, 2));

  return {
    answer: `${topicDescription}\n\n**Key points from the site:**\n${keyPoints.map((kp) => `• ${kp}`).join("\n")}\n\n**Learn more:** ${pages.slice(0, 3).map((p) => `${p.name} (${p.route})`).join(", ")}`,
    answerHe: `${topicDescriptionHe}\n\n**נקודות מפתח מהאתר:**\n${keyPointsHe.map((kp) => `• ${kp}`).join("\n")}\n\n**למידע נוסף:** ${pages.slice(0, 3).map((p) => `${p.nameHe} (${p.route})`).join(", ")}`,
    relevantPages: pages.slice(0, 3).map((p) => ({ route: p.route, name: p.name, nameHe: p.nameHe })),
    suggestedFollowUp: [
      `What does the ${mainPage.name} page show in detail?`,
      "Where can I see the evidence for this?",
      "What is the investor takeaway?",
    ],
    suggestedFollowUpHe: [
      `מה מציג עמוד ה${mainPage.nameHe} בפירוט?`,
      "איפה אני יכול לראות את הראיות לזה?",
      "מה המסר למשקיע?",
    ],
    category: "concept",
  };
}

function buildOrientationAnswer(): GuideResponse {
  const quickFlow = navigationFlows[0]; // 5 min
  const fullFlow = navigationFlows[1]; // full journey

  const quickRoute = quickFlow.routes.map((r) => {
    const p = sitePages.find((sp) => sp.route === r);
    return `${p?.name ?? r} (${r})`;
  }).join(" → ");
  const quickRouteHe = quickFlow.routes.map((r) => {
    const p = sitePages.find((sp) => sp.route === r);
    return `${p?.nameHe ?? r} (${r})`;
  }).join(" → ");

  const fullRoute = fullFlow.routes.map((r) => {
    const p = sitePages.find((sp) => sp.route === r);
    return `${p?.name ?? r} (${r})`;
  }).join(" → ");
  const fullRouteHe = fullFlow.routes.map((r) => {
    const p = sitePages.find((sp) => sp.route === r);
    return `${p?.nameHe ?? r} (${r})`;
  }).join(" → ");

  return {
    answer: `Welcome! Here are recommended paths through the site:\n\n**${quickFlow.name}:**\n${quickRoute}\n\n**${fullFlow.name}:**\n${fullRoute}\n\nThe most important pages for investors are **Strategy**, **Proof**, and **Investor**. Start with the homepage to get oriented, then dive into what interests you most.`,
    answerHe: `ברוכים הבאים! הנה מסלולים מומלצים באתר:\n\n**${quickFlow.nameHe}:**\n${quickRouteHe}\n\n**${fullFlow.nameHe}:**\n${fullRouteHe}\n\nהעמודים החשובים ביותר למשקיעים הם **אסטרטגיה**, **הוכחות** ו**משקיעים**. התחל עם דף הבית כדי להתמצא, ואז צלול למה שמעניין אותך.`,
    relevantPages: [
      { route: "/", name: "Home", nameHe: "דף הבית" },
      { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
      { route: "/proof", name: "Proof", nameHe: "הוכחות" },
    ],
    suggestedFollowUp: [
      "What is TAMS?",
      "What is the investment strategy?",
      "Show me the evidence",
      "How do I invest?",
    ],
    suggestedFollowUpHe: [
      "מה זה TAMS?",
      "מה אסטרטגיית ההשקעה?",
      "תראה לי את הראיות",
      "איך משקיעים?",
    ],
    category: "orientation",
  };
}

function buildGlossaryAnswer(query: string): GuideResponse {
  const entry = findGlossaryMatch(query);
  if (!entry) return buildFallback();

  const relatedEntries = glossary
    .filter((g) => g.term !== entry.term)
    .slice(0, 3);

  return {
    answer: `**${entry.term}**: ${entry.definition}${relatedEntries.length > 0 ? `\n\n**Related terms:** ${relatedEntries.map((g) => g.term).join(", ")}` : ""}`,
    answerHe: `**${entry.termHe}**: ${entry.definitionHe}${relatedEntries.length > 0 ? `\n\n**מונחים קשורים:** ${relatedEntries.map((g) => g.termHe).join(", ")}` : ""}`,
    relevantPages: [],
    suggestedFollowUp: [
      "What is the investment strategy?",
      "Where can I see the portfolio?",
      "Explain the business model",
    ],
    suggestedFollowUpHe: [
      "מה אסטרטגיית ההשקעה?",
      "איפה אני יכול לראות את התיק?",
      "תסביר את המודל העסקי",
    ],
    category: "glossary",
  };
}

function buildFallback(): GuideResponse {
  return {
    answer:
      "I can help you understand the TAMS site — from the investment strategy and portfolio architecture to the evidence base and investor access. Try asking about a specific page, topic, or use the suggested questions below.",
    answerHe:
      "אני יכול לעזור לך להבין את אתר TAMS — מאסטרטגיית ההשקעה וארכיטקטורת התיק ועד בסיס הראיות וגישת המשקיעים. נסה לשאול על עמוד ספציפי, נושא, או השתמש בשאלות המוצעות למטה.",
    relevantPages: [
      { route: "/", name: "Home", nameHe: "דף הבית" },
      { route: "/strategy", name: "Strategy", nameHe: "אסטרטגיה" },
      { route: "/proof", name: "Proof", nameHe: "הוכחות" },
    ],
    suggestedFollowUp: [
      "What is TAMS?",
      "Where should I start?",
      "What is the investment strategy?",
      "Show me the evidence",
    ],
    suggestedFollowUpHe: [
      "מה זה TAMS?",
      "מאיפה להתחיל?",
      "מה אסטרטגיית ההשקעה?",
      "תראה לי את הראיות",
    ],
    category: "orientation",
  };
}

// === API ראשי ===

export function askGuide(query: string, currentRoute?: string): GuideResponse {
  if (!query.trim()) return buildFallback();

  const intent = detectIntent(query);
  const pages = findRelevantPages(query, currentRoute);
  const topics = findRelevantTopics(query);

  switch (intent) {
    case "navigation":
      return buildNavigationAnswer(query, pages, currentRoute);
    case "explanation":
      return buildExplanationAnswer(query, pages, currentRoute);
    case "concept":
      return buildConceptAnswer(query, pages, topics);
    case "orientation":
      return buildOrientationAnswer();
    case "glossary":
      return buildGlossaryAnswer(query);
    default:
      // כוונה כללית — נבחר לפי הקונטקסט
      if (pages.length > 0) {
        return buildConceptAnswer(query, pages, topics);
      }
      return buildFallback();
  }
}

// === שאלות מוצעות לפי עמוד ===

export function getSuggestedQuestions(currentRoute?: string): { en: string[]; he: string[] } {
  const defaults = {
    en: [
      "What is TAMS?",
      "Where should I start?",
      "What is the investment strategy?",
      "How do I invest?",
    ],
    he: [
      "מה זה TAMS?",
      "מאיפה כדאי להתחיל?",
      "מה אסטרטגיית ההשקעה?",
      "איך משקיעים?",
    ],
  };

  if (!currentRoute) return defaults;

  const page = sitePages.find((p) => p.route === currentRoute);
  if (!page) return defaults;

  const pageSpecific: Record<string, { en: string[]; he: string[] }> = {
    "/": {
      en: ["What is TAMS?", "Where should I start?", "What are the investor tiers?", "What is the thesis?"],
      he: ["מה זה TAMS?", "מאיפה להתחיל?", "מה דרגות המשקיעים?", "מה התזה?"],
    },
    "/company": {
      en: ["What is the vision?", "How is the fund structured?", "What are the core principles?", "Who manages the fund?"],
      he: ["מה החזון?", "מה מבנה הקרן?", "מה העקרונות המרכזיים?", "מי מנהל את הקרן?"],
    },
    "/architecture": {
      en: ["How are the wallets structured?", "What is the allocation?", "How does capital flow?", "What assets are held?"],
      he: ["מה מבנה הארנקים?", "מה ההקצאה?", "איך ההון זורם?", "אילו נכסים מוחזקים?"],
    },
    "/holdings": {
      en: ["How many assets are in the portfolio?", "How are assets selected?", "What are the main holdings?", "What is the research process?"],
      he: ["כמה נכסים בתיק?", "איך נבחרים נכסים?", "מה ההחזקות העיקריות?", "מה תהליך המחקר?"],
    },
    "/defi": {
      en: ["What DeFi strategies are used?", "What is the target APY?", "How is DeFi risk managed?", "What protocols are used?"],
      he: ["אילו אסטרטגיות DeFi בשימוש?", "מה יעד ה-APY?", "איך מנוהל סיכון DeFi?", "אילו פרוטוקולים בשימוש?"],
    },
    "/market-shift": {
      en: ["Why invest now?", "What are the market catalysts?", "How big is the market?", "What is driving adoption?"],
      he: ["למה להשקיע עכשיו?", "מה הקטליסטורים?", "כמה גדול השוק?", "מה מניע אימוץ?"],
    },
    "/strategy": {
      en: ["What is the business model?", "What is the TAM?", "What are the scenarios?", "What are the competitive advantages?"],
      he: ["מה המודל העסקי?", "מה ה-TAM?", "מה התרחישים?", "מה היתרונות התחרותיים?"],
    },
    "/proof": {
      en: ["How many evidence records?", "What does the evidence show?", "How is evidence verified?", "What is the adoption coverage?"],
      he: ["כמה רשומות ראיות?", "מה מראות הראיות?", "איך ראיות מאומתות?", "מה כיסוי האימוץ?"],
    },
    "/investor": {
      en: ["How do I invest?", "What are the tiers?", "What are the risks?", "Where is the roadmap?"],
      he: ["איך משקיעים?", "מה הדרגות?", "מה הסיכונים?", "איפה מפת הדרכים?"],
    },
    "/methodology": {
      en: ["How are assets selected?", "What are the evidence tiers?", "How is risk scored?", "What are the portfolio rules?"],
      he: ["איך נבחרים נכסים?", "מה שכבות הראיות?", "איך מנקדים סיכון?", "מה כללי התיק?"],
    },
    "/faq": {
      en: ["What is TAMS?", "Is this investment advice?", "How many assets?", "How do I access the portal?"],
      he: ["מה זה TAMS?", "האם זה ייעוץ השקעות?", "כמה נכסים?", "איך ניגשים לפורטל?"],
    },
    "/team": {
      en: ["Who is on the team?", "What is the organizational structure?", "What are the core values?", "Is there an advisory board?"],
      he: ["מי בצוות?", "מה המבנה הארגוני?", "מה ערכי הליבה?", "יש מועצה מייעצת?"],
    },
  };

  return pageSpecific[currentRoute] ?? defaults;
}

// === הסבר עמוד נוכחי (לפעולה מהירה) ===

export function explainCurrentPage(route: string): GuideResponse {
  return buildExplanationAnswer("what is this page showing", findRelevantPages(route), route);
}

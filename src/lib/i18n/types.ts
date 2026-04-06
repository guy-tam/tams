// סוגי נתונים עבור מערכת התרגומים

/** השפות הנתמכות באפליקציה */
export type Language = "en" | "he" | "ar" | "ru" | "es";

/** מבנה מחרוזות התרגום - אובייקט מקונן עמוק */
export type TranslationStrings = {
  nav: {
    home: string;
    company: string;
    architecture: string;
    holdings: string;
    defi: string;
    marketShift: string;
    strategy: string;
    investor: string;
    language: string;
  };
  common: {
    conceptApp: string;
    version: string;
    learnMore: string;
    close: string;
    search: string;
    noResults: string;
    disclaimer: string;
    readMore: string;
  };
  home: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      cta1: string;
      cta2: string;
      scroll: string;
    };
    thesis: {
      badge: string;
      title: string;
      subtitle: string;
    };
    cards: {
      longTerm: { title: string; description: string };
      trading: { title: string; description: string };
      defi: { title: string; description: string };
      multiWallet: { title: string; description: string };
      research: { title: string; description: string };
      institutional: { title: string; description: string };
    };
    cta: {
      title: string;
      subtitle: string;
      disclaimer: string;
    };
    ctaCards: {
      thesis: { title: string; description: string };
      architecture: { title: string; description: string };
      opportunity: { title: string; description: string };
    };
  };
  company: {
    badge: string;
    title: string;
    subtitle: string;
    vision: { title: string; content: string };
    mission: { title: string; content: string };
    principles: {
      badge: string;
      title: string;
      subtitle: string;
    };
    principleCards: {
      research: { title: string; description: string };
      risk: { title: string; description: string };
      discipline: { title: string; description: string };
      transparency: { title: string; description: string };
    };
    process: {
      badge: string;
      title: string;
      subtitle: string;
    };
    steps: Array<{ title: string; description: string }>;
    note: string;
  };
  architecture: {
    badge: string;
    title: string;
    subtitle: string;
    wallet: { badge: string; title: string; subtitle: string };
    flow: { badge: string; title: string; subtitle: string };
    allocation: { badge: string; title: string; subtitle: string };
    divisions: Array<{ name: string; description: string }>;
  };
  holdings: {
    badge: string;
    title: string;
    subtitle: string;
    stats: {
      totalAssets: string;
      verticals: string;
      layer1: string;
      riskCategories: string;
    };
    explorer: { badge: string; title: string; subtitle: string };
    disclaimer: string;
  };
  defi: {
    badge: string;
    title: string;
    subtitle: string;
    metrics: {
      targetApy: string;
      maxExposure: string;
      chains: string;
      allocation: string;
    };
    strategies: {
      badge: string;
      title: string;
      subtitle: string;
    };
    strategyCards: {
      lending: { title: string; description: string };
      staking: { title: string; description: string };
      liquidity: { title: string; description: string };
      optimization: { title: string; description: string };
      riskFirst: { title: string; description: string };
      multiChain: { title: string; description: string };
    };
    risk: { badge: string; title: string; subtitle: string };
  };
  marketShift: {
    badge: string;
    title: string;
    subtitle: string;
    catalysts: { badge: string; title: string; subtitle: string };
    catalystCards: {
      etf: { title: string; description: string };
      regulatory: { title: string; description: string };
      corporate: { title: string; description: string };
      rwa: { title: string; description: string };
      defiMaturation: { title: string; description: string };
      infrastructure: { title: string; description: string };
    };
    timeline: { badge: string; title: string; subtitle: string };
    quote: { text: string; source: string };
  };
  strategy: {
    badge: string;
    title: string;
    subtitle: string;
    tam: { badge: string; title: string; subtitle: string };
    pos: { badge: string; title: string; subtitle: string };
    posItems: Array<{ title: string; description: string }>;
    poc: { badge: string; title: string; subtitle: string };
    pocItems: Array<{ title: string; description: string }>;
    edge: { badge: string; title: string; subtitle: string };
    advantages: {
      clarity: { title: string; description: string };
      multiStrategy: { title: string; description: string };
      mindset: { title: string; description: string };
      timing: { title: string; description: string };
    };
  };
  investor: {
    badge: string;
    title: string;
    subtitle: string;
    highlights: {
      structured: { title: string; value: string; description: string };
      research: { title: string; value: string; description: string };
      risk: { title: string; value: string; description: string };
      horizon: { title: string; value: string; description: string };
    };
    roadmap: { badge: string; title: string; subtitle: string };
    riskDisclosure: { badge: string; title: string; subtitle: string };
    conclusion: { title: string; content: string; note: string };
  };
};

/** מיפוי שפות לתרגומים */
export type Translations = Record<Language, TranslationStrings>;

/** כיוון הטקסט */
export type Direction = "ltr" | "rtl";

/** שפות עם כיוון ימין-לשמאל */
export const RTL_LANGUAGES: Language[] = ["he", "ar"];

/** שפת ברירת מחדל */
export const DEFAULT_LANGUAGE: Language = "he";

/** שמות השפות לתצוגה */
export const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  he: "עברית",
  ar: "العربية",
  ru: "Русский",
  es: "Español",
};

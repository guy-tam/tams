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
    proof: string;
    language: string;
    investorPortal: string;
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
  // חזון - קטע חדש בדף הבית
  homeVision: {
    badge: string;
    title: string;
    subtitle: string;
    blockchainFuture: { title: string; description: string };
    investorFirst: { title: string; description: string };
    globalAccess: { title: string; description: string };
    quote: string;
  };
  // עמוד הוכחות ואימוץ מוסדי
  proof: {
    hero: {
      badge: string;
      title: string;
      titleHighlight: string;
      description: string;
      subdescription: string;
      statsEvidenceRecords: string;
      statsOrganizations: string;
      statsCountries: string;
      statsHighConfidence: string;
      enginesTitle: string;
      engineTreasuryLabel: string;
      engineTreasuryDesc: string;
      engineDefiLabel: string;
      engineDefiDesc: string;
      engineTradingLabel: string;
      engineTradingDesc: string;
      engineRotationLabel: string;
      engineRotationDesc: string;
      engineRiskLabel: string;
      engineRiskDesc: string;
      engineInfraLabel: string;
      engineInfraDesc: string;
    };
    assetGrid: {
      badge: string;
      title: string;
      subtitle: string;
      scoreFinance: string;
      scoreAdoption: string;
      scoreEcosystem: string;
      scoreConfidence: string;
      evidence: string;
      view: string;
      hideDetails: string;
      riskCaveats: string;
    };
    evidence: {
      badge: string;
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      filters: string;
      filterAsset: string;
      filterRegion: string;
      filterConfidence: string;
      filterStatus: string;
      filterSort: string;
      allAssets: string;
      allRegions: string;
      allLevels: string;
      allStatuses: string;
      sortAsset: string;
      sortConfidence: string;
      sortOrganization: string;
      sortRegion: string;
      showing: string;
      of: string;
      records: string;
      noRecords: string;
      whyItMatters: string;
      source: string;
      caveat: string;
    };
    coverage: {
      badge: string;
      title: string;
      subtitle: string;
      geoDistribution: string;
      orgTypes: string;
      assetConcentration: string;
      records: string;
    };
    underpricing: {
      badge: string;
      title: string;
      subtitle: string;
      important: string;
      importantText: string;
    };
    businessModel: {
      badge: string;
      title: string;
      subtitle: string;
      engineTreasuryTitle: string;
      engineDefiTitle: string;
      engineTradingTitle: string;
      engineRotationTitle: string;
      engineRiskTitle: string;
      engineInfraTitle: string;
      valueCaptureFlow: string;
      flowStep1Label: string;
      flowStep1Sub: string;
      flowStep2Label: string;
      flowStep2Sub: string;
      flowStep3Label: string;
      flowStep3Sub: string;
      flowStep4Label: string;
      flowStep4Sub: string;
    };
    scenarios: {
      badge: string;
      title: string;
      subtitle: string;
      conservative: string;
      moderate: string;
      accelerated: string;
      keyAssumptions: string;
      factorAssessment: string;
      scenarioOutlook: string;
      factorAdoption: string;
      factorTreasury: string;
      factorYield: string;
      factorTrading: string;
      factorDownside: string;
      warning: string;
    };
    methodology: {
      badge: string;
      title: string;
      subtitle: string;
      confidenceTitle: string;
      relationshipTitle: string;
      evidenceTitle: string;
      notEvidenceTitle: string;
      disclaimersTitle: string;
      stamp: string;
    };
  };
  // מפתחות התחברות
  login: {
    errorEmail: string;
    errorCredentials: string;
    errorGeneral: string;
  };
  // תפריט תוכן עניינים - עמוד הוכחות
  proof_toc: {
    evidenceThesis: string;
    assetMatrix: string;
    evidenceExplorer: string;
    globalCoverage: string;
    marketAnalysis: string;
    businessModel: string;
    scenarios: string;
    methodology: string;
  };
  // ניווט דשבורד
  dashboard: {
    overview: string;
    portfolio: string;
    performance: string;
    defiPositions: string;
    activity: string;
    settings: string;
    backToSite: string;
    logout: string;
  };
  // מערכת דרגות משקיעים
  investorTiers: {
    badge: string;
    title: string;
    subtitle: string;
    tiers: {
      explorer: { name: string; description: string; minInvestment: string; benefits: string[] };
      builder: { name: string; description: string; minInvestment: string; benefits: string[] };
      architect: { name: string; description: string; minInvestment: string; benefits: string[] };
      visionary: { name: string; description: string; minInvestment: string; benefits: string[] };
    };
    cta: string;
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

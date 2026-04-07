// טיפוסים עבור מערכת הראיות המוסדיות — מודל נתונים מובנה לסיווג קשרים מאומתים

// קטגוריות תזה — כל נכס מסווג לפי התפקיד המוסדי שלו
export type ThesisCategory =
  | "financial-rails"
  | "tokenization-rwa"
  | "interoperability"
  | "smart-contract-infrastructure"
  | "institutional-blockchain"
  | "oracle-data-infrastructure"
  | "ai-compute"
  | "custody-settlement"
  | "developer-ecosystem"
  | "enterprise-integration";

export const thesisCategoryLabels: Record<ThesisCategory, string> = {
  "financial-rails": "Financial Rails",
  "tokenization-rwa": "Tokenization / RWA",
  "interoperability": "Interoperability",
  "smart-contract-infrastructure": "Smart Contract Infrastructure",
  "institutional-blockchain": "Institutional Blockchain",
  "oracle-data-infrastructure": "Oracle / Data Infrastructure",
  "ai-compute": "AI Compute / Network",
  "custody-settlement": "Custody / Settlement",
  "developer-ecosystem": "Developer Ecosystem",
  "enterprise-integration": "Enterprise Integration",
};

// סוג הארגון שמעורב בקשר
export type OrganizationType =
  | "bank"
  | "payment-company"
  | "fintech"
  | "asset-manager"
  | "government"
  | "central-bank"
  | "credit-network"
  | "exchange"
  | "custody-provider"
  | "enterprise"
  | "blockchain-foundation"
  | "oracle-consumer"
  | "tokenization-issuer"
  | "infrastructure-provider"
  | "fund-institution"
  | "consulting-firm"
  | "technology-company"
  | "standards-body";

export const organizationTypeLabels: Record<OrganizationType, string> = {
  "bank": "Bank",
  "payment-company": "Payment Company",
  "fintech": "Fintech",
  "asset-manager": "Asset Manager",
  "government": "Government",
  "central-bank": "Central Bank",
  "credit-network": "Credit Network",
  "exchange": "Exchange",
  "custody-provider": "Custody Provider",
  "enterprise": "Enterprise",
  "blockchain-foundation": "Blockchain Foundation",
  "oracle-consumer": "Oracle Consumer",
  "tokenization-issuer": "Tokenization Issuer",
  "infrastructure-provider": "Infrastructure Provider",
  "fund-institution": "Fund / Institution",
  "consulting-firm": "Consulting Firm",
  "technology-company": "Technology Company",
  "standards-body": "Standards Body",
};

// סוג הקשר בין הנכס לארגון
export type RelationshipType =
  | "direct-integration"
  | "pilot-sandbox"
  | "infrastructure-support"
  | "custody-support"
  | "tokenization-usage"
  | "validator-participation"
  | "ecosystem-membership"
  | "payment-support"
  | "chain-availability"
  | "investment-exposure"
  | "enterprise-experimentation"
  | "public-endorsement"
  | "historical-trial"
  | "governance-council"
  | "protocol-integration"
  | "cbdc-exploration";

export const relationshipTypeLabels: Record<RelationshipType, string> = {
  "direct-integration": "Direct Integration",
  "pilot-sandbox": "Pilot / Sandbox",
  "infrastructure-support": "Infrastructure Support",
  "custody-support": "Custody Support",
  "tokenization-usage": "Tokenization Usage",
  "validator-participation": "Validator Participation",
  "ecosystem-membership": "Ecosystem Membership",
  "payment-support": "Payment Support",
  "chain-availability": "Chain Availability",
  "investment-exposure": "Investment Exposure",
  "enterprise-experimentation": "Enterprise Experimentation",
  "public-endorsement": "Public Endorsement",
  "historical-trial": "Historical Trial",
  "governance-council": "Governance Council",
  "protocol-integration": "Protocol Integration",
  "cbdc-exploration": "CBDC Exploration",
};

// סטטוס הקשר
export type EvidenceStatus =
  | "active"
  | "historical"
  | "pilot"
  | "announced"
  | "ecosystem-support"
  | "indirect";

export const evidenceStatusLabels: Record<EvidenceStatus, string> = {
  active: "Active",
  historical: "Historical",
  pilot: "Pilot",
  announced: "Announced",
  "ecosystem-support": "Ecosystem",
  indirect: "Indirect",
};

// רמת ביטחון בראיה
export type ConfidenceLevel = "high" | "medium" | "low";

export const confidenceLevelLabels: Record<ConfidenceLevel, string> = {
  high: "High Confidence",
  medium: "Medium Confidence",
  low: "Low Confidence",
};

// אזור גיאוגרפי
export type Region =
  | "North America"
  | "Europe"
  | "Asia Pacific"
  | "Middle East"
  | "Latin America"
  | "Africa"
  | "Global"
  | "Oceania";

// טיקרים של נכסי הפורטפוליו
export type AssetTicker =
  | "ETH"
  | "SOL"
  | "AVAX"
  | "ALGO"
  | "SUI"
  | "NEAR"
  | "XRP"
  | "XLM"
  | "XDC"
  | "HBAR"
  | "LINK"
  | "QNT"
  | "ONDO"
  | "CFG"
  | "RNDR"
  | "TAO";

// רשומת ראיה בודדת — הלב של מסד הנתונים
export interface EvidenceRecord {
  id: string;
  asset: AssetTicker;
  organization: string;
  organizationType: OrganizationType;
  country: string;
  region: Region;
  relationshipType: RelationshipType;
  status: EvidenceStatus;
  description: string;
  whyItMatters: string;
  confidence: ConfidenceLevel;
  sourceLabel: string;
  sourceUrl?: string;
  sourceDate?: string;
  notes?: string;
}

// פרופיל נכס עם ציוני מוסדיות
export interface AssetThesisProfile {
  ticker: AssetTicker;
  name: string;
  thesisCategories: ThesisCategory[];
  primaryCategory: ThesisCategory;
  institutionalSummary: string;
  adoptionThemes: string[];
  riskNote: string;
  scores: {
    financeRelevance: number;     // 0-10
    adoptionMaturity: number;     // 0-10
    ecosystemStrength: number;    // 0-10
    verificationConfidence: number; // 0-10
  };
}

// נתוני תרחיש
export interface ScenarioData {
  id: string;
  name: string;
  label: string;
  description: string;
  assumptions: string[];
  adoptionGrowth: "low" | "moderate" | "high";
  treasuryAppreciation: "conservative" | "moderate" | "aggressive";
  yieldContribution: "minimal" | "moderate" | "significant";
  tradingContribution: "minimal" | "moderate" | "significant";
  riskLevel: "low" | "moderate" | "high";
  outlook: string;
}

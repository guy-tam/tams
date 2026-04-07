// פרופילי תזה מוסדית לכל נכס בפורטפוליו — סיכום רלוונטיות, ציונים, וסיכונים
import type { AssetThesisProfile } from "./types";

export const assetProfiles: AssetThesisProfile[] = [
  {
    ticker: "ETH",
    name: "Ethereum",
    thesisCategories: ["smart-contract-infrastructure", "tokenization-rwa", "custody-settlement"],
    primaryCategory: "smart-contract-infrastructure",
    institutionalSummary:
      "Dominant smart contract platform serving as the settlement layer for the majority of institutional DeFi, tokenized assets, and on-chain financial infrastructure. Hosts BlackRock BUIDL, multiple ETFs, and the broadest enterprise tooling ecosystem.",
    adoptionThemes: [
      "ETF-grade investment product",
      "Primary tokenization settlement layer",
      "Institutional DeFi backbone",
      "Enterprise tooling ecosystem",
    ],
    riskNote:
      "High gas fees under congestion; L2 fragmentation; regulatory classification uncertainty around staking.",
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
      "High-performance Layer 1 gaining institutional traction through payment integrations (Visa, PayPal PYUSD, Stripe), DeFi growth, and sub-second finality. Positioned as the primary chain for high-frequency on-chain activity.",
    adoptionThemes: [
      "Payment network integrations",
      "Stablecoin settlement rails",
      "High-frequency DeFi",
      "Rapid developer ecosystem growth",
    ],
    riskNote:
      "Historical network outages; validator centralization concerns; heavy competition from Ethereum L2 ecosystem.",
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
      "Modular subnet architecture attracting institutional tokenization pilots from major financial firms. Citi, JPMorgan, and WisdomTree have conducted experiments on Avalanche subnets for tokenized assets and cross-chain settlement.",
    adoptionThemes: [
      "Institutional subnet deployments",
      "Tokenization pilot platform",
      "Enterprise-grade customization",
      "Fast finality for financial use cases",
    ],
    riskNote:
      "Subnet adoption still nascent; lower DeFi TVL vs. peers; institutional pilots may not convert to production deployments.",
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
      "Academically rigorous blockchain with focus on government, CBDC pilots, and regulated financial infrastructure. Secured contracts with multiple government and central bank entities, particularly in emerging markets.",
    adoptionThemes: [
      "CBDC infrastructure platform",
      "Government blockchain adoption",
      "Compliance-oriented architecture",
      "Carbon-negative operations",
    ],
    riskNote:
      "Limited DeFi ecosystem; foundation token sales history; government adoption timelines often extend significantly.",
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
      "Next-generation Layer 1 with object-centric architecture derived from Meta's Diem project. Offers parallel execution for high throughput. Still early in institutional adoption cycle but growing rapidly in developer activity and DeFi metrics.",
    adoptionThemes: [
      "Novel parallel execution model",
      "Move language safety guarantees",
      "Rapid ecosystem expansion",
      "Gaming and consumer blockchain focus",
    ],
    riskNote:
      "Young ecosystem with limited institutional track record; significant VC token unlocks; unproven in regulated financial use cases.",
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
      "Sharded Layer 1 pioneering chain abstraction — the concept that users interact across blockchains without knowing which chain they are on. AI integration and simplified onboarding position NEAR for mainstream adoption pathways.",
    adoptionThemes: [
      "Chain abstraction vision",
      "AI integration layer",
      "User onboarding simplification",
      "Cross-chain interoperability",
    ],
    riskNote:
      "Chain abstraction vision is ambitious but unproven at scale; smaller developer ecosystem than top competitors; narrative-dependent valuation.",
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
      "Purpose-built for cross-border payments with sub-second settlement. Ripple's On-Demand Liquidity product used by financial institutions for international transfers. Post-SEC regulatory clarity unlocked institutional pathways in the US market.",
    adoptionThemes: [
      "Cross-border payment rails",
      "Banking and remittance corridors",
      "Post-SEC regulatory clarity",
      "Institutional liquidity product",
    ],
    riskNote:
      "Competition from stablecoins and CBDCs; centralization concerns around Ripple's holdings; adoption slower than early projections.",
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
      "Open payment network targeting financial inclusion, remittances, and stablecoin distribution. Circle's USDC runs natively on Stellar. Focus on developing markets and compliance-ready infrastructure.",
    adoptionThemes: [
      "Stablecoin distribution rails",
      "Financial inclusion infrastructure",
      "Developing market focus",
      "Compliance-ready payment network",
    ],
    riskNote:
      "Historical MoneyGram and IBM World Wire partnerships ended; modest network activity relative to aspirations; Soroban smart contracts still early.",
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
      "Enterprise blockchain specifically designed for trade finance — a $5.2T underserved market. Partners with trade finance platforms for invoice tokenization, supply chain financing, and letters of credit on-chain.",
    adoptionThemes: [
      "Trade finance digitization",
      "Supply chain financing",
      "Invoice tokenization",
      "Enterprise-grade compliance",
    ],
    riskNote:
      "Niche focus limits broader adoption; low public awareness and liquidity; enterprise blockchain adoption timelines are unpredictable.",
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
      "Governed by a council of up to 39 Fortune 500 companies (Google, IBM, Boeing, Deutsche Telekom). Hashgraph consensus provides mathematically fair ordering and high throughput. Unique governance model provides institutional legitimacy.",
    adoptionThemes: [
      "Fortune 500 governance council",
      "Enterprise supply chain solutions",
      "Hashgraph consensus technology",
      "Sustainability and carbon markets",
    ],
    riskNote:
      "Council governance perceived as centralization; limited DeFi ecosystem; token supply overhang from foundation; council membership does not guarantee active usage.",
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
      "Dominant oracle network securing $75B+ in DeFi value. CCIP (Cross-Chain Interoperability Protocol) positions Chainlink as the messaging layer between blockchains. SWIFT, DTCC, and ANZ Bank have conducted integration pilots.",
    adoptionThemes: [
      "Critical DeFi infrastructure",
      "Cross-chain messaging protocol",
      "SWIFT integration pilot",
      "Institutional data feeds",
    ],
    riskNote:
      "Revenue model still evolving; SCALE subsidies may mask true demand; competition from Pyth and API3; CCIP competes with specialized bridges.",
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
      "Enterprise-grade blockchain interoperability through Overledger protocol. Focused on regulated financial institutions and central bank infrastructure. Partnerships with European payment providers and involvement in CBDC initiatives.",
    adoptionThemes: [
      "Enterprise interoperability standard",
      "CBDC infrastructure involvement",
      "European payment integration",
      "Regulated environment focus",
    ],
    riskNote:
      "Closed-source technology limits transparency; small team; revenue validation still in progress; low DeFi integration.",
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
      "Leading tokenization protocol bridging US Treasuries and institutional yield products to DeFi. USDY and OUSG backed by real government securities. Partnership with BlackRock's BUIDL fund provides unmatched institutional credibility.",
    adoptionThemes: [
      "Tokenized US Treasury products",
      "BlackRock BUIDL partnership",
      "Institutional yield on-chain",
      "Multi-chain RWA distribution",
    ],
    riskNote:
      "Regulatory risk around tokenized securities; dependency on interest rate environment; smart contract and bridge risks across chains.",
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
      "Decentralized protocol connecting the $100T+ private credit market to DeFi liquidity. Integrated with MakerDAO and Aave as a source of real-world yield through tokenized invoices, real estate, and structured credit.",
    adoptionThemes: [
      "Private credit tokenization",
      "MakerDAO RWA integration",
      "Aave institutional pools",
      "DeFi-native real-world yield",
    ],
    riskNote:
      "Default risk on underlying real-world assets; legal frameworks still developing; small team and modest TVL; CFG token liquidity is low.",
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
      "Decentralized GPU compute marketplace connecting AI/ML workloads and 3D rendering demand with distributed GPU supply. Migration to Solana improved throughput. Positioned at the intersection of AI compute demand and decentralized infrastructure.",
    adoptionThemes: [
      "Decentralized GPU marketplace",
      "AI/ML compute infrastructure",
      "Spatial computing rendering",
      "Creator and studio adoption",
    ],
    riskNote:
      "Competition from centralized cloud providers; GPU supply reliability; token economics still maturing; AI compute may shift to specialized hardware.",
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
      "Decentralized AI network creating an open marketplace for machine intelligence through subnet specialization. Experimental approach to incentivizing AI model development outside centralized corporate control. Highest risk/reward profile in portfolio.",
    adoptionThemes: [
      "Decentralized AI marketplace",
      "Subnet specialization model",
      "AI centralization counter-thesis",
      "Open intelligence network",
    ],
    riskNote:
      "Extremely early-stage; unproven quality benchmarks; sybil and gaming risks; token price highly speculative; may not compete with centralized AI quality.",
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

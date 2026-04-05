// נתוני נכסים למחקר - רשימת 16 נכסי קריפטו עם ניתוח מעמיק
// כל המידע הוא לצרכי מחקר וקונספט בלבד - אינו מהווה ייעוץ השקעות

export interface Asset {
  ticker: string;
  name: string;
  category: string;
  description: string;
  overview: string;
  thesis: string;
  risks: string;
  tamsFit: string;
  marketCap?: string;
  sector?: string;
}

export const categories = [
  "All",
  "Layer 1",
  "Payments",
  "Infrastructure",
  "Enterprise",
  "RWA",
  "AI & Compute",
] as const;

export type Category = (typeof categories)[number];

export const assets: Asset[] = [
  // --- Layer 1 ---
  {
    ticker: "ETH",
    name: "Ethereum",
    category: "Layer 1",
    description: "פלטפורמת חוזים חכמים מובילה - עמוד השדרה של DeFi ותשתית Web3",
    overview:
      "Ethereum is the dominant smart contract platform powering the majority of DeFi, NFT, and Layer 2 ecosystems. Following the Merge transition to Proof of Stake, the network became deflationary under high usage conditions. It hosts the largest developer community in crypto and serves as the settlement layer for most on-chain economic activity.",
    thesis:
      "Ethereum's thesis rests on its unmatched network effects and composability. The rollup-centric roadmap positions it as the settlement and data availability layer for a multi-chain future. Institutional adoption through ETH ETFs, staking yield, and the EIP-1559 burn mechanism create structural demand. Supporters believe ETH captures value from the entire smart contract economy.",
    risks:
      "Competition from alternative Layer 1s offering lower fees and higher throughput. Regulatory risk around staking classification. Execution risk on the scaling roadmap. Concentration of staking power in a few liquid staking protocols. MEV extraction creating centralization pressures.",
    tamsFit:
      "Core holding in the Long-Term Holdings wallet (20-30% allocation). Also utilized in the DeFi wallet through staking and lending. ETH serves as collateral, gas, and yield-bearing asset across multiple TAMS strategies. Dollar-cost averaging for accumulation.",
    marketCap: "$400B+",
    sector: "Smart Contracts",
  },
  {
    ticker: "SOL",
    name: "Solana",
    category: "Layer 1",
    description: "בלוקצ׳יין בעל ביצועים גבוהים עם עלויות נמוכות ומהירות גבוהה",
    overview:
      "Solana is a high-performance Layer 1 blockchain achieving thousands of transactions per second at minimal cost. It uses a unique Proof of History consensus combined with Proof of Stake. The ecosystem has grown significantly in DeFi, NFTs, and consumer applications, with a strong developer community and institutional backing.",
    thesis:
      "Solana's architecture enables real-time, low-cost transactions that rival centralized systems. The Firedancer validator client adds redundancy and performance. Growing DeFi TVL, payments integrations (Visa, Shopify), and institutional interest suggest expanding utility. Supporters see Solana as the leading chain for high-frequency on-chain activity.",
    risks:
      "Historical network outages raise reliability concerns. Relative centralization of validators. Heavy competition from Ethereum L2s and other alt-L1s. Token unlock schedules and selling pressure. Dependency on core development teams.",
    tamsFit:
      "Allocated across the Trading wallet and DeFi wallet (5-10%). Suitable for active DeFi strategies, yield farming, and as a trading base. Used for high-frequency on-chain operations where speed matters.",
    marketCap: "$80B+",
    sector: "Smart Contracts",
  },
  {
    ticker: "AVAX",
    name: "Avalanche",
    category: "Layer 1",
    description: "פלטפורמת Subnet מודולרית עם מיקוד מוסדי ו-RWA",
    overview:
      "Avalanche is a Layer 1 blockchain featuring a unique subnet architecture that allows custom blockchain deployment. It combines high throughput, fast finality (~1 second), and EVM compatibility. The platform has attracted institutional interest through tokenization initiatives and partnerships with major financial institutions.",
    thesis:
      "Avalanche's subnet model enables purpose-built blockchains for specific use cases — from gaming to institutional DeFi. Partnerships with financial institutions for tokenized assets position AVAX at the intersection of TradFi and DeFi. The consensus mechanism provides strong finality guarantees valued by institutional participants. Supporters believe subnets will capture enterprise and regulated use cases.",
    risks:
      "Subnet adoption still nascent relative to Ethereum L2s. Lower DeFi TVL than competitors. Competition from Cosmos and Polkadot in the multi-chain space. Token inflation from staking rewards. Need for continued institutional partnerships to validate subnet model.",
    tamsFit:
      "Long-Term Holdings wallet allocation (3-5%). Represents the TAMS thesis on institutional blockchain adoption and modular architecture. Monitored for subnet ecosystem growth and institutional integration milestones.",
    marketCap: "$15B+",
    sector: "Smart Contracts",
  },
  {
    ticker: "ALGO",
    name: "Algorand",
    category: "Layer 1",
    description: "בלוקצ׳יין עם מיקוד אקדמי, ממשלתי ופיננסי",
    overview:
      "Algorand is a Layer 1 blockchain founded by Turing Award winner Silvio Micali. It emphasizes formal verification, instant finality, and carbon-negative operations. The network has secured government contracts, CBDC pilots, and institutional partnerships, particularly in emerging markets and regulated environments.",
    thesis:
      "Algorand targets the intersection of academic rigor and real-world adoption. Government and central bank partnerships for CBDCs and national digital infrastructure provide unique demand drivers. The Pure Proof of Stake consensus offers strong decentralization guarantees. Supporters believe regulatory-friendly design will capture institutional and government use cases that other chains cannot.",
    risks:
      "Limited DeFi ecosystem compared to Ethereum and Solana. Foundation token sales have historically created selling pressure. Lower developer activity and community engagement. Risk that government blockchain adoption moves slower than expected. Competition from more established chains for institutional clients.",
    tamsFit:
      "Long-Term Holdings wallet allocation (2-3%). Represents exposure to government and CBDC adoption thesis. Position sized conservatively given ecosystem maturity. Monitored for government partnership announcements and CBDC developments.",
    marketCap: "$3B+",
    sector: "Smart Contracts",
  },
  {
    ticker: "SUI",
    name: "Sui",
    category: "Layer 1",
    description: "בלוקצ׳יין מבוסס Move עם ארכיטקטורת אובייקטים ייחודית",
    overview:
      "Sui is a next-generation Layer 1 built using the Move programming language, originally developed at Meta (Diem). Its object-centric data model enables parallel transaction execution, resulting in high throughput and low latency. The ecosystem is growing rapidly across DeFi, gaming, and social applications.",
    thesis:
      "Sui's architecture represents a fundamental rethinking of blockchain state management. The object-centric model enables horizontal scaling and parallel processing that traditional account-based chains cannot match. Move language provides better safety guarantees than Solidity. Backed by strong technical talent from Meta. Supporters believe Sui's technical advantages will attract the next wave of on-chain applications requiring high performance.",
    risks:
      "Relatively young ecosystem with unproven long-term reliability. VC-backed with significant token unlock schedules. Competition from Aptos (same Move language origin). Developer adoption still trailing established ecosystems. Potential centralization during early network phases.",
    tamsFit:
      "Trading wallet and Long-Term Holdings allocation (2-4%). Represents the TAMS thesis on next-generation blockchain architecture. Higher risk/reward profile — position sized accordingly. Monitored for ecosystem growth metrics and developer adoption.",
    marketCap: "$10B+",
    sector: "Smart Contracts",
  },
  {
    ticker: "NEAR",
    name: "NEAR Protocol",
    category: "Layer 1",
    description: "בלוקצ׳יין עם מיקוד על חוויית משתמש ו-chain abstraction",
    overview:
      "NEAR Protocol is a sharded Layer 1 blockchain focused on usability and developer experience. Its Nightshade sharding design enables horizontal scaling. NEAR pioneered the chain abstraction vision, allowing users to interact across multiple blockchains seamlessly. The ecosystem emphasizes AI integration and user-friendly onboarding.",
    thesis:
      "NEAR's chain abstraction thesis addresses the fundamental UX problem in crypto — users shouldn't need to know which chain they're on. The account aggregation layer and FastAuth simplify onboarding to near-Web2 levels. AI integration through NEAR AI adds a differentiated growth vector. Supporters believe the chain that solves UX will capture mainstream adoption.",
    risks:
      "Chain abstraction vision is ambitious but unproven at scale. Competition from other UX-focused solutions and account abstraction on Ethereum. Sharding implementation complexity. Developer ecosystem smaller than top competitors. Reliance on the chain abstraction narrative materializing.",
    tamsFit:
      "Long-Term Holdings wallet allocation (2-3%). Represents the TAMS thesis on mainstream blockchain adoption through UX innovation. Monitored for chain abstraction adoption metrics, user growth, and AI integration milestones.",
    marketCap: "$7B+",
    sector: "Smart Contracts",
  },

  // --- Payments ---
  {
    ticker: "XRP",
    name: "Ripple / XRP Ledger",
    category: "Payments",
    description: "רשת תשלומים חוצי-גבולות עם מיקוד מוסדי ובנקאי",
    overview:
      "XRP operates on the XRP Ledger (XRPL), designed for fast, low-cost cross-border payments. Ripple, the company behind XRP, partners with financial institutions globally for international money transfers. Following the SEC lawsuit resolution, XRP gained regulatory clarity in the US market, potentially opening institutional adoption pathways.",
    thesis:
      "The cross-border payments market exceeds $150T annually with significant inefficiencies. XRP's sub-second settlement and minimal fees offer compelling advantages over SWIFT. Regulatory clarity post-SEC case removes a major overhang. Institutional adoption through Ripple's ODL (On-Demand Liquidity) product could drive structural demand. Supporters believe XRP bridges TradFi and crypto for payments infrastructure.",
    risks:
      "Competition from stablecoins and CBDCs for cross-border payments. Ongoing regulatory uncertainty in some jurisdictions. Centralization concerns around Ripple's token holdings and influence. Network adoption has been slower than expected. Market perception still affected by the SEC lawsuit history.",
    tamsFit:
      "Long-Term Holdings wallet allocation (3-5%). Represents the TAMS thesis on institutional payments infrastructure transformation. Position provides exposure to TradFi adoption without DeFi-specific risks. Monitored for institutional partnership announcements and ODL volume.",
    marketCap: "$30B+",
    sector: "Cross-Border Payments",
  },
  {
    ticker: "XLM",
    name: "Stellar",
    category: "Payments",
    description: "רשת תשלומים פתוחה למיקרו-עסקאות ונכסים דיגיטליים",
    overview:
      "Stellar is an open-source payment network designed for financial inclusion and micro-transactions. It enables the issuance and transfer of digital representations of any currency. The Stellar Development Foundation partners with organizations for remittances, mobile money, and CBDC infrastructure in developing markets.",
    thesis:
      "Stellar targets the unbanked and underbanked populations — a market of 1.4 billion adults globally. Its focus on compliance, anchor network, and Soroban smart contracts expansion adds utility beyond basic transfers. USDC integration on Stellar provides stablecoin rails. Supporters believe Stellar will capture the financial inclusion narrative as emerging markets digitize.",
    risks:
      "Relatively low market visibility compared to competitors. Slow smart contract adoption on Soroban. Competition from XRP, stablecoins, and mobile money solutions. Token supply and SDF holdings create dilution risk. Network activity metrics still modest relative to aspirations.",
    tamsFit:
      "Long-Term Holdings wallet allocation (1-2%). Represents a smaller position in the payments and financial inclusion thesis. Lower correlation with DeFi-native assets provides portfolio diversification. Monitored for partnerships in developing markets and stablecoin volume growth.",
    marketCap: "$4B+",
    sector: "Payments & Inclusion",
  },

  // --- Enterprise ---
  {
    ticker: "XDC",
    name: "XDC Network",
    category: "Enterprise",
    description: "בלוקצ׳יין ארגוני ממוקד סחר בינלאומי ומימון שרשרת אספקה",
    overview:
      "XDC Network is an enterprise-grade, EVM-compatible blockchain focused on trade finance and tokenization. It uses Delegated Proof of Stake (XDPoS) consensus for fast, low-cost transactions. The network targets the $5.2 trillion trade finance gap, partnering with trade finance platforms and financial institutions for invoice factoring, letters of credit, and supply chain financing.",
    thesis:
      "Trade finance is one of the largest underserved markets in global finance, with a $5.2T gap primarily affecting SMEs. XDC's enterprise focus and compliance-ready infrastructure positions it to capture tokenized trade finance instruments. Partnerships with platforms like TradeFinex demonstrate real-world utility. Supporters believe blockchain-based trade finance will be one of the first institutional-scale use cases.",
    risks:
      "Enterprise blockchain adoption is slower than anticipated. Competition from private/permissioned chains and traditional fintech. Relatively low public awareness and liquidity. Dependency on trade finance partnerships materializing at scale. Small validator set raises centralization concerns.",
    tamsFit:
      "Long-Term Holdings wallet allocation (1-2%). Niche exposure to enterprise blockchain and trade finance digitization. Higher conviction required given lower liquidity. Monitored for trade finance volume, institutional partnerships, and TVL growth.",
    marketCap: "$1.5B+",
    sector: "Trade Finance",
  },
  {
    ticker: "HBAR",
    name: "Hedera",
    category: "Enterprise",
    description: "רשת ארגונית עם מועצת ממשל של תאגידים גלובליים",
    overview:
      "Hedera is a public distributed ledger governed by a council of up to 39 major global organizations including Google, IBM, Boeing, and Deutsche Telekom. It uses hashgraph consensus technology for high throughput, low fees, and fair ordering. The network targets enterprise use cases including supply chain, identity verification, and tokenized assets.",
    thesis:
      "Hedera's governance model — a council of Fortune 500 companies — provides unique legitimacy and enterprise trust. The hashgraph consensus offers mathematical fairness guarantees and high performance. Growing real-world usage in supply chain (Avery Dennison), sustainability (DOVU), and stablecoin rails. Supporters believe the council governance model will attract enterprise adoption that purely decentralized chains cannot.",
    risks:
      "Perceived centralization due to council governance model. Lower DeFi and developer ecosystem compared to EVM chains. Token economics and foundation holdings create supply overhang. Competition from Ethereum enterprise solutions and private chains. Network effects lag behind established platforms.",
    tamsFit:
      "Long-Term Holdings wallet allocation (2-3%). Represents the TAMS thesis on enterprise blockchain adoption through credible governance. Provides portfolio diversification away from DeFi-native assets. Monitored for council member activity, network usage metrics, and enterprise deployments.",
    marketCap: "$8B+",
    sector: "Enterprise DLT",
  },

  // --- Infrastructure ---
  {
    ticker: "LINK",
    name: "Chainlink",
    category: "Infrastructure",
    description: "רשת אורקל מבוזרת - חיבור בלוקצ׳יין לעולם האמיתי",
    overview:
      "Chainlink is the dominant decentralized oracle network, providing external data feeds to smart contracts across virtually all major blockchains. It has expanded into Cross-Chain Interoperability Protocol (CCIP), Proof of Reserves, and Functions — positioning itself as middleware infrastructure for the entire blockchain ecosystem.",
    thesis:
      "Chainlink operates as essential infrastructure for DeFi — securing over $75B in transaction value. CCIP positions Chainlink as the TCP/IP of blockchain interoperability. The SCALE program subsidizes oracle costs for early-stage chains, building ecosystem lock-in. Staking introduces tokenomics improvements. Supporters believe every smart contract that interacts with external data ultimately needs Chainlink.",
    risks:
      "Competition from newer oracle solutions (Pyth, API3). Revenue model still evolving — subsidies mask true demand. Token supply and team allocations create selling pressure. Dependency on continued DeFi growth. CCIP faces competition from specialized bridge protocols.",
    tamsFit:
      "Long-Term Holdings wallet allocation (3-5%). Core infrastructure bet that benefits from overall blockchain ecosystem growth without protocol-specific risk. Position represents conviction in the middleware layer thesis. Monitored for CCIP adoption, staking participation, and oracle market share.",
    marketCap: "$10B+",
    sector: "Oracles & Middleware",
  },
  {
    ticker: "QNT",
    name: "Quant",
    category: "Infrastructure",
    description: "פרוטוקול אינטראופרביליות ארגוני עם מיקוד בנקאי ומוסדי",
    overview:
      "Quant provides enterprise-grade blockchain interoperability through its Overledger protocol. It enables seamless connection between distributed ledger technologies and existing enterprise systems. The project focuses on regulated financial institutions, central banks, and enterprise clients with a strong emphasis on compliance and standards.",
    thesis:
      "As enterprises and financial institutions adopt different blockchain networks, interoperability becomes critical infrastructure. Quant's Overledger is chain-agnostic and designed for regulated environments. Partnerships with SIA (European payment infrastructure) and involvement in CBDC projects demonstrate institutional traction. Limited token supply (~14.6M) creates scarcity. Supporters believe Quant will be the enterprise interoperability standard.",
    risks:
      "Closed-source technology limits transparency and community audit. Small team relative to ambitions. Low DeFi ecosystem integration. Revenue generation and business model validation still in progress. Competition from larger interoperability projects with open-source models.",
    tamsFit:
      "Long-Term Holdings wallet allocation (2-3%). High-conviction infrastructure bet on enterprise interoperability. Position sized conservatively given lower liquidity. Represents exposure to the regulated institutional blockchain adoption thesis.",
    marketCap: "$1.5B+",
    sector: "Interoperability",
  },

  // --- RWA (Real World Assets) ---
  {
    ticker: "ONDO",
    name: "Ondo Finance",
    category: "RWA",
    description: "פרוטוקול טוקניזציה של נכסים פיננסיים מסורתיים",
    overview:
      "Ondo Finance bridges traditional finance and DeFi by tokenizing real-world financial products. Its flagship products include USDY (tokenized US Treasuries with yield) and OUSG (tokenized short-term US government bonds). Ondo has partnered with BlackRock's BUIDL fund and operates across multiple blockchains.",
    thesis:
      "Real-world asset tokenization is projected to reach $16T by 2030 (Boston Consulting Group). Ondo is positioned at the forefront with institutional-grade products backed by US Treasuries. The partnership with BlackRock provides unmatched credibility. As DeFi matures, demand for stable, yield-bearing tokenized assets will grow. Supporters believe Ondo captures the convergence of TradFi yield and DeFi composability.",
    risks:
      "Regulatory risk around tokenized securities classification. Competition from traditional asset managers entering the space. Dependency on BlackRock and custodial partnerships. Smart contract and bridge risks when operating cross-chain. Business model depends on sustained interest rate environment.",
    tamsFit:
      "Long-Term Holdings and DeFi wallet allocation (3-5%). Core position in the TAMS RWA thesis. USDY and OUSG products directly usable in DeFi strategies for stable yield. Represents the convergence of institutional finance and blockchain that TAMS is built around.",
    marketCap: "$4B+",
    sector: "Tokenization",
  },
  {
    ticker: "CFG",
    name: "Centrifuge",
    category: "RWA",
    description: "פרוטוקול מימון מבוזר לנכסי עולם אמיתי",
    overview:
      "Centrifuge is a decentralized protocol for financing real-world assets on-chain. It enables businesses to tokenize invoices, real estate, and other assets as collateral for DeFi lending. Centrifuge has been integrated with MakerDAO and Aave as a source of real-world yield, and operates its own Centrifuge Chain built on Substrate.",
    thesis:
      "Centrifuge connects the $100T+ private credit market to DeFi liquidity. Integration with major DeFi protocols (MakerDAO, Aave) validates the model. The protocol addresses a real market need — SMEs accessing capital through tokenized assets. As RWA adoption grows, Centrifuge's first-mover advantage in DeFi-native RWA rails becomes increasingly valuable. Supporters believe Centrifuge is the on-chain bridge for private credit.",
    risks:
      "RWA tokenization requires robust legal frameworks that are still developing. Default risk on underlying real-world assets. Small team and modest TVL relative to the opportunity size. Competition from larger tokenization platforms. Liquidity of CFG token is relatively low.",
    tamsFit:
      "Long-Term Holdings wallet allocation (1-2%). Smaller position representing the RWA financing thesis. Complements ONDO with exposure to private credit rather than public treasuries. Higher risk/reward given early-stage nature. Monitored for TVL growth, MakerDAO vault utilization, and new asset pool launches.",
    marketCap: "$500M+",
    sector: "Private Credit",
  },

  // --- AI & Compute ---
  {
    ticker: "RNDR",
    name: "Render Network",
    category: "AI & Compute",
    description: "רשת רינדור מבוזרת עם GPU ותשתית AI",
    overview:
      "Render Network is a decentralized GPU computing platform that connects creators needing rendering power with GPU owners willing to rent their idle capacity. Originally focused on 3D rendering for film and media, the network has expanded to support AI/ML workloads, creating a decentralized compute marketplace. The migration to Solana improved performance and reduced costs.",
    thesis:
      "GPU compute demand is exploding driven by AI, 3D rendering, and spatial computing. Centralized cloud providers are capacity-constrained and expensive. Render creates a decentralized marketplace for GPU compute that can scale with demand. Apple Vision Pro and spatial computing create new demand vectors. Supporters believe decentralized compute networks will capture significant share of the $1T+ cloud compute market.",
    risks:
      "Competition from centralized providers (AWS, Google Cloud) with established relationships. Technical challenges in decentralized compute coordination. Dependency on GPU supply from node operators. Revenue model and token economics still maturing. AI compute demand may be met by purpose-built chips rather than GPUs.",
    tamsFit:
      "Long-Term Holdings wallet allocation (2-3%). Represents the TAMS thesis on decentralized compute infrastructure. Provides portfolio exposure to AI/compute trend without direct AI token speculation. Monitored for network utilization, node growth, and enterprise partnerships.",
    marketCap: "$5B+",
    sector: "GPU Compute",
  },
  {
    ticker: "TAO",
    name: "Bittensor",
    category: "AI & Compute",
    description: "רשת AI מבוזרת עם מנגנון תמריצים למודלים חכמים",
    overview:
      "Bittensor is a decentralized AI network that creates an open marketplace for machine intelligence. It incentivizes AI model development and deployment through a unique subnet architecture where different subnets specialize in different AI tasks — from text generation to image recognition to financial prediction. The TAO token rewards contributions of useful intelligence.",
    thesis:
      "AI development is increasingly centralized among a few large companies. Bittensor creates an open, competitive marketplace for AI where anyone can contribute and be rewarded. The subnet model enables specialization and composability of AI services. As concerns about AI centralization grow, decentralized alternatives gain strategic importance. Supporters believe Bittensor represents the decentralized counter-narrative to centralized AI monopolies.",
    risks:
      "Extremely early-stage technology with unproven quality benchmarks. Competition from well-funded centralized AI companies. Sybil attack and gaming risks in the incentive mechanism. Token price highly speculative and volatile. Quality of decentralized AI outputs may not match centralized alternatives for critical applications.",
    tamsFit:
      "Trading wallet allocation (1-2%). Highest risk/reward position in the TAMS portfolio. Represents a small speculative allocation to the decentralized AI thesis. Not a core holding — treated as asymmetric upside exposure. Monitored for subnet quality, network growth, and AI benchmark comparisons.",
    marketCap: "$4B+",
    sector: "Decentralized AI",
  },
];

// נתוני דשבורד לדוגמה - סימולציה של תיק השקעות משקיע
// כל המידע הוא לצרכי קונספט בלבד - אינו מהווה ייעוץ השקעות

// --- טיפוסים ---

export interface PortfolioSummary {
  totalValue: number; // בש"ח
  totalValueUSD: number;
  dailyChange: number; // אחוז
  weeklyChange: number;
  monthlyChange: number;
  allTimeReturn: number;
}

export interface HoldingPosition {
  ticker: string;
  name: string;
  category: string;
  quantity: number;
  avgBuyPrice: number; // דולר
  currentPrice: number; // דולר
  valueILS: number;
  allocation: number; // אחוז מהתיק
  pnl: number; // אחוז רווח/הפסד
  color: string;
}

export interface WalletBalance {
  name: string;
  allocation: number;
  valueILS: number;
  color: string;
  status: "active" | "pending";
}

export interface ActivityItem {
  id: string;
  type: "buy" | "sell" | "stake" | "unstake" | "deposit" | "withdrawal" | "yield";
  asset: string;
  amount: string;
  date: string;
  status: "completed" | "pending";
}

export interface DeFiPosition {
  protocol: string;
  type: "staking" | "lending" | "lp";
  asset: string;
  deposited: string;
  apy: number;
  earned: string;
  status: "active" | "locked";
  color: string;
}

export interface PerformancePoint {
  date: string;
  value: number;
}

// --- סיכום תיק ההשקעות ---

export const portfolioSummary: PortfolioSummary = {
  totalValue: 10_812_000,
  totalValueUSD: 3_003_333,
  dailyChange: 1.2,
  weeklyChange: 3.4,
  monthlyChange: 8.7,
  allTimeReturn: 12.3,
};

// --- פוזיציות אחזקה - 16 נכסים ---

export const holdings: HoldingPosition[] = [
  {
    ticker: "XRP",
    name: "Ripple",
    category: "Payments",
    quantity: 185_000,
    avgBuyPrice: 0.52,
    currentPrice: 0.61,
    valueILS: 406_630,
    allocation: 3.8,
    pnl: 17.3,
    color: "#00AAE4",
  },
  {
    ticker: "XLM",
    name: "Stellar",
    category: "Payments",
    quantity: 420_000,
    avgBuyPrice: 0.11,
    currentPrice: 0.13,
    valueILS: 196_560,
    allocation: 1.8,
    pnl: 18.2,
    color: "#14B6E0",
  },
  {
    ticker: "XDC",
    name: "XDC Network",
    category: "Enterprise",
    quantity: 1_200_000,
    avgBuyPrice: 0.035,
    currentPrice: 0.042,
    valueILS: 181_440,
    allocation: 1.7,
    pnl: 20.0,
    color: "#2E3F6E",
  },
  {
    ticker: "SOL",
    name: "Solana",
    category: "Layer 1",
    quantity: 2_800,
    avgBuyPrice: 98.5,
    currentPrice: 142.8,
    valueILS: 1_440_240,
    allocation: 13.3,
    pnl: 45.0,
    color: "#9945FF",
  },
  {
    ticker: "AVAX",
    name: "Avalanche",
    category: "Layer 1",
    quantity: 8_500,
    avgBuyPrice: 28.4,
    currentPrice: 35.2,
    valueILS: 1_078_120,
    allocation: 10.0,
    pnl: 23.9,
    color: "#E84142",
  },
  {
    ticker: "HBAR",
    name: "Hedera",
    category: "Enterprise",
    quantity: 950_000,
    avgBuyPrice: 0.065,
    currentPrice: 0.078,
    valueILS: 266_760,
    allocation: 2.5,
    pnl: 20.0,
    color: "#3A3A3A",
  },
  {
    ticker: "ONDO",
    name: "Ondo Finance",
    category: "RWA",
    quantity: 45_000,
    avgBuyPrice: 0.85,
    currentPrice: 1.12,
    valueILS: 181_440,
    allocation: 1.7,
    pnl: 31.8,
    color: "#1A73E8",
  },
  {
    ticker: "LINK",
    name: "Chainlink",
    category: "Infrastructure",
    quantity: 22_000,
    avgBuyPrice: 12.5,
    currentPrice: 15.8,
    valueILS: 1_251_360,
    allocation: 11.6,
    pnl: 26.4,
    color: "#375BD2",
  },
  {
    ticker: "QNT",
    name: "Quant",
    category: "Infrastructure",
    quantity: 1_200,
    avgBuyPrice: 105.0,
    currentPrice: 118.5,
    valueILS: 511_920,
    allocation: 4.7,
    pnl: 12.9,
    color: "#2BBBAD",
  },
  {
    ticker: "FLR",
    name: "Flare",
    category: "Infrastructure",
    quantity: 2_500_000,
    avgBuyPrice: 0.015,
    currentPrice: 0.019,
    valueILS: 171_000,
    allocation: 1.6,
    pnl: 26.7,
    color: "#E42058",
  },
  {
    ticker: "MATIC",
    name: "Polygon",
    category: "Layer 1",
    quantity: 320_000,
    avgBuyPrice: 0.72,
    currentPrice: 0.88,
    valueILS: 1_013_760,
    allocation: 9.4,
    pnl: 22.2,
    color: "#8247E5",
  },
  {
    ticker: "ARB",
    name: "Arbitrum",
    category: "Layer 1",
    quantity: 280_000,
    avgBuyPrice: 1.05,
    currentPrice: 1.18,
    valueILS: 1_189_440,
    allocation: 11.0,
    pnl: 12.4,
    color: "#28A0F0",
  },
  {
    ticker: "FIL",
    name: "Filecoin",
    category: "AI & Compute",
    quantity: 18_000,
    avgBuyPrice: 4.8,
    currentPrice: 5.9,
    valueILS: 382_320,
    allocation: 3.5,
    pnl: 22.9,
    color: "#0090FF",
  },
  {
    ticker: "AR",
    name: "Arweave",
    category: "AI & Compute",
    quantity: 5_500,
    avgBuyPrice: 8.2,
    currentPrice: 10.5,
    valueILS: 207_900,
    allocation: 1.9,
    pnl: 28.0,
    color: "#222326",
  },
  {
    ticker: "AAVE",
    name: "Aave",
    category: "DeFi",
    quantity: 2_800,
    avgBuyPrice: 85.0,
    currentPrice: 92.5,
    valueILS: 932_400,
    allocation: 8.6,
    pnl: 8.8,
    color: "#B6509E",
  },
  {
    ticker: "MKR",
    name: "Maker",
    category: "DeFi",
    quantity: 120,
    avgBuyPrice: 1_450.0,
    currentPrice: 1_680.0,
    valueILS: 725_760,
    allocation: 6.7,
    pnl: 15.9,
    color: "#1AAB9B",
  },
];

// --- יתרות ארנקים ---

export const walletBalances: WalletBalance[] = [
  {
    name: "אחזקות לטווח ארוך",
    allocation: 40,
    valueILS: 4_324_800,
    color: "#06b6d4",
    status: "active",
  },
  {
    name: "מסחר אקטיבי",
    allocation: 25,
    valueILS: 2_703_000,
    color: "#8b5cf6",
    status: "active",
  },
  {
    name: "DeFi ותשואות",
    allocation: 25,
    valueILS: 2_703_000,
    color: "#10b981",
    status: "active",
  },
  {
    name: "תפעול ורזרבה",
    allocation: 10,
    valueILS: 1_081_200,
    color: "#f59e0b",
    status: "pending",
  },
];

// --- פעילות אחרונה ---

export const recentActivity: ActivityItem[] = [
  {
    id: "act_001",
    type: "buy",
    asset: "SOL",
    amount: "200 SOL ($28,560)",
    date: "2026-04-05",
    status: "completed",
  },
  {
    id: "act_002",
    type: "stake",
    asset: "ETH",
    amount: "15 ETH",
    date: "2026-04-04",
    status: "completed",
  },
  {
    id: "act_003",
    type: "yield",
    asset: "AAVE",
    amount: "+2.4 AAVE ($222)",
    date: "2026-04-04",
    status: "completed",
  },
  {
    id: "act_004",
    type: "sell",
    asset: "FLR",
    amount: "500,000 FLR ($9,500)",
    date: "2026-04-03",
    status: "completed",
  },
  {
    id: "act_005",
    type: "deposit",
    asset: "USDC",
    amount: "50,000 USDC",
    date: "2026-04-02",
    status: "completed",
  },
  {
    id: "act_006",
    type: "buy",
    asset: "LINK",
    amount: "1,500 LINK ($23,700)",
    date: "2026-04-01",
    status: "completed",
  },
  {
    id: "act_007",
    type: "buy",
    asset: "ONDO",
    amount: "10,000 ONDO ($11,200)",
    date: "2026-03-30",
    status: "completed",
  },
  {
    id: "act_008",
    type: "stake",
    asset: "MATIC",
    amount: "80,000 MATIC",
    date: "2026-03-28",
    status: "pending",
  },
  {
    id: "act_009",
    type: "withdrawal",
    asset: "USDT",
    amount: "25,000 USDT",
    date: "2026-03-27",
    status: "completed",
  },
  {
    id: "act_010",
    type: "buy",
    asset: "QNT",
    amount: "200 QNT ($23,700)",
    date: "2026-03-25",
    status: "completed",
  },
];

// --- פוזיציות DeFi ---

export const defiPositions: DeFiPosition[] = [
  {
    protocol: "Aave V3",
    type: "lending",
    asset: "USDC",
    deposited: "120,000 USDC",
    apy: 5.2,
    earned: "$3,120",
    status: "active",
    color: "#B6509E",
  },
  {
    protocol: "Lido",
    type: "staking",
    asset: "ETH (stETH)",
    deposited: "45 ETH",
    apy: 3.8,
    earned: "0.85 ETH",
    status: "active",
    color: "#00A3FF",
  },
  {
    protocol: "Uniswap V3",
    type: "lp",
    asset: "ETH/USDC",
    deposited: "$85,000",
    apy: 12.4,
    earned: "$5,270",
    status: "active",
    color: "#FF007A",
  },
  {
    protocol: "Compound",
    type: "lending",
    asset: "DAI",
    deposited: "60,000 DAI",
    apy: 4.1,
    earned: "$1,230",
    status: "active",
    color: "#00D395",
  },
  {
    protocol: "Rocket Pool",
    type: "staking",
    asset: "ETH (rETH)",
    deposited: "20 ETH",
    apy: 3.5,
    earned: "0.35 ETH",
    status: "locked",
    color: "#FF6E30",
  },
];

// --- היסטוריית ביצועים - 12 חודשים ---

export const performanceHistory: PerformancePoint[] = [
  { date: "2025-05", value: 9_500_000 },
  { date: "2025-06", value: 9_320_000 },
  { date: "2025-07", value: 9_680_000 },
  { date: "2025-08", value: 9_450_000 },
  { date: "2025-09", value: 9_870_000 },
  { date: "2025-10", value: 10_120_000 },
  { date: "2025-11", value: 9_780_000 },
  { date: "2025-12", value: 10_250_000 },
  { date: "2026-01", value: 10_480_000 },
  { date: "2026-02", value: 10_150_000 },
  { date: "2026-03", value: 10_590_000 },
  { date: "2026-04", value: 10_812_000 },
];

// --- שווי נכסים בטוחים (זהב, כסף, נחושת) ---

export const safeAssetsValue = 3_200_000; // בש"ח

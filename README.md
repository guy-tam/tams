# TAMS — Blockchain Investment Infrastructure

A premium concept application demonstrating how blockchain-based investment management could be structured with institutional discipline.

> **Important:** This is a concept/demonstration application. No real capital is deployed, no returns are guaranteed or implied, and this does not constitute financial advice or an investment offering.

## What Is TAMS?

TAMS is a conceptual framework for managing digital assets across a multi-wallet architecture with four specialized divisions:

- **Long-Term Holdings (40%)** — Research-driven accumulation of high-conviction digital assets
- **Active Trading (25%)** — Disciplined swing and momentum strategies
- **DeFi Yield (25%)** — Institutional-grade yield through lending, staking, and liquidity provision
- **Operations (10%)** — Gas reserves, fees, and operational liquidity

## Application Structure (8 Pages)

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Company vision, thesis overview, and framework introduction |
| Company | `/company` | How TAMS works, core principles, and operational process |
| Architecture | `/architecture` | Multi-wallet structure, capital flow, and allocation model |
| Holdings | `/holdings` | Research database — 16 assets across 6 verticals |
| DeFi | `/defi` | DeFi yield strategies and risk framework |
| Market Shift | `/market-shift` | Why now — institutional adoption timeline and catalysts |
| Strategy | `/strategy` | TAM/SAM/SOM analysis, POS, POC, and competitive positioning |
| Investor | `/investor` | Roadmap, risk disclosures, and investor overview |

## Asset Research Coverage

16 assets across 6 verticals:

- **Layer 1:** ETH, SOL, AVAX, ALGO, SUI, NEAR
- **Payments:** XRP, XLM
- **Infrastructure:** LINK, QNT
- **Enterprise:** XDC, HBAR
- **RWA (Real World Assets):** ONDO, CFG
- **AI & Compute:** RNDR, TAO

Asset research lives in `src/data/assets.ts`.

## Tech Stack

- **Framework:** Next.js 16 + React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (base-nova)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home
│   ├── company/           # Company info
│   ├── architecture/      # Wallet architecture
│   ├── holdings/          # Asset research explorer
│   ├── defi/              # DeFi strategies
│   ├── market-shift/      # Why now / market adoption
│   ├── strategy/          # POS/POC/TAM/SAM/SOM
│   └── investor/          # Roadmap & risk disclosures
├── components/
│   ├── layout/            # Navigation, PageWrapper, SectionHeader
│   ├── sections/          # Page section components
│   ├── charts/            # Data visualization (Recharts)
│   └── ui/                # shadcn base components
├── data/
│   ├── assets.ts          # Asset research database
│   └── roadmap.ts         # Project milestones
└── lib/
    └── utils.ts           # Utility functions
```

## Editing Content

- **Asset research:** Edit `src/data/assets.ts` — each asset has ticker, name, category, overview, thesis, risks, and TAMS fit
- **Roadmap/milestones:** Edit `src/data/roadmap.ts`
- **Page content:** Each page is self-contained in its route folder under `src/app/`

## What Is Conceptual vs Real

| Aspect | Status |
|--------|--------|
| Investment thesis & framework | Conceptual |
| Asset research profiles | Educational/informational |
| Wallet architecture | Conceptual design |
| Risk framework | Conceptual |
| DeFi strategies | Conceptual |
| TAM/SAM/SOM analysis | Estimated ranges |
| UI/Application | Real, functional code |
| Backend/Trading/Custody | Not implemented (concept only) |

No backend, no live data feeds, no wallet integrations, no custody infrastructure, and no financial transactions are part of this application.

## License

Concept application — not for production financial use.

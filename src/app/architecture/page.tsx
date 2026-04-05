"use client";

// דף ארכיטקטורה - מבנה ארנקים, זרימת הון, והקצאת פורטפוליו
import PageWrapper from "@/components/layout/PageWrapper";
import SectionHeader from "@/components/layout/SectionHeader";
import WalletArchitectureMap from "@/components/sections/WalletArchitectureMap";
import CapitalFlowDiagram from "@/components/sections/CapitalFlowDiagram";
import AllocationChart from "@/components/charts/AllocationChart";
import { motion } from "framer-motion";

export default function ArchitecturePage() {
  return (
    <PageWrapper bgGrid>
      {/* כותרת */}
      <section className="py-16 sm:py-24 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-purple-400 border border-purple-500/20 mb-6">
            Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            <span className="gradient-text">
              Multi-Wallet Strategy Architecture
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Capital is systematically allocated across four specialized wallets
            — each operating with distinct strategies, risk parameters, and
            performance objectives.
          </p>
        </motion.div>
      </section>

      {/* מפת ארכיטקטורה */}
      <section className="py-12 max-w-7xl mx-auto">
        <SectionHeader
          badge="Wallet Structure"
          title="Hierarchical Wallet Architecture"
          subtitle="The TAMS Master Wallet allocates capital to four specialized sub-wallets, each responsible for a distinct investment function."
        />
        <WalletArchitectureMap />
      </section>

      {/* זרימת הון */}
      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader
          badge="Capital Flow"
          title="How Capital Moves"
          subtitle="Investor capital enters the Master Wallet and is systematically deployed across the four divisions based on target allocation percentages."
        />
        <CapitalFlowDiagram />
      </section>

      {/* גרף הקצאה */}
      <section className="py-16 max-w-7xl mx-auto">
        <SectionHeader
          badge="Allocation"
          title="Portfolio Allocation Model"
          subtitle="Target allocation across divisions, designed to balance long-term growth, active returns, yield generation, and operational liquidity."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <AllocationChart />
          <div className="space-y-4">
            {[
              {
                name: "Long-Term Holdings",
                pct: "40%",
                color: "#3b82f6",
                desc: "Core conviction positions — BTC, ETH, and research-backed Layer 1, Infrastructure, and RWA assets held for multi-year horizons.",
              },
              {
                name: "Active Trading",
                pct: "25%",
                color: "#8b5cf6",
                desc: "Systematic swing and momentum strategies across liquid markets with defined risk parameters and position sizing rules.",
              },
              {
                name: "DeFi Yield",
                pct: "25%",
                color: "#06b6d4",
                desc: "Yield generation through lending, staking, and liquidity provision on battle-tested protocols like Aave, Lido, and Uniswap.",
              },
              {
                name: "Operations",
                pct: "10%",
                color: "#10b981",
                desc: "Gas reserves, trading fees, emergency buffer, and operational liquidity to ensure smooth execution across all divisions.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="size-3 rounded-full"
                    style={{ background: item.color }}
                  />
                  <span className="text-sm font-semibold text-foreground">
                    {item.name}
                  </span>
                  <span
                    className="text-sm font-bold ml-auto"
                    style={{ color: item.color }}
                  >
                    {item.pct}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

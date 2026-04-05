"use client";

// גילוי סיכונים - אקורדיון עם קטגוריות סיכון מפורטות
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, Scale, Globe, Cpu, Waves, DollarSign, Lock } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// קטגוריות סיכון
const riskCategories = [
  {
    id: "market",
    icon: Waves,
    title: "Market & Volatility Risk",
    color: "#f43f5e",
    content:
      "Cryptocurrency markets are inherently volatile. Asset values can fluctuate dramatically within short periods, potentially resulting in significant losses. Historical performance does not guarantee future results. Market conditions can change rapidly due to macroeconomic factors, regulatory changes, or shifts in investor sentiment. TAMS employs diversification and structured allocation to mitigate, but not eliminate, these risks.",
  },
  {
    id: "regulatory",
    icon: Scale,
    title: "Regulatory & Legal Risk",
    color: "#f59e0b",
    content:
      "The regulatory landscape for digital assets is evolving and uncertain across jurisdictions. Changes in laws, regulations, or enforcement actions could materially impact the value of holdings, restrict operations, or require fundamental changes to strategy. This includes potential classification changes, taxation modifications, and restrictions on DeFi activities.",
  },
  {
    id: "smart-contract",
    icon: Cpu,
    title: "Smart Contract & Technical Risk",
    color: "#8b5cf6",
    content:
      "DeFi protocols rely on smart contracts which may contain undiscovered vulnerabilities. Despite audits and security measures, the risk of exploits, bugs, or protocol failures remains. Oracle manipulation, flash loan attacks, and composability risks between protocols can lead to cascading failures. TAMS limits DeFi exposure and only uses battle-tested protocols.",
  },
  {
    id: "counterparty",
    icon: ShieldAlert,
    title: "Counterparty & Platform Risk",
    color: "#3b82f6",
    content:
      "Engagement with exchanges, custodians, and DeFi protocols introduces counterparty risk. Platform insolvency, security breaches, or operational failures could result in loss of funds. Self-custody introduces its own risks related to key management. TAMS implements multi-signature security and distributes assets across platforms.",
  },
  {
    id: "liquidity",
    icon: DollarSign,
    title: "Liquidity Risk",
    color: "#06b6d4",
    content:
      "Some digital assets and DeFi positions may have limited liquidity, particularly during market stress events. This could make it difficult to exit positions at desired prices. Lock-up periods in staking and DeFi protocols add additional illiquidity. TAMS maintains an operations wallet with liquid reserves to manage this risk.",
  },
  {
    id: "custody",
    icon: Lock,
    title: "Custody & Security Risk",
    color: "#10b981",
    content:
      "Digital asset custody requires rigorous security practices. Loss of private keys, compromised wallets, or phishing attacks can result in irreversible loss of funds. Hardware wallet failures, social engineering, and supply chain attacks are ongoing threats. TAMS employs institutional-grade security practices including multi-sig, cold storage, and regular security reviews.",
  },
  {
    id: "geopolitical",
    icon: Globe,
    title: "Geopolitical & Macro Risk",
    color: "#ec4899",
    content:
      "Global events, economic policy changes, interest rate movements, and geopolitical tensions can significantly impact digital asset markets. Correlation with traditional markets may increase during periods of systemic stress. Sanctions, trade restrictions, and cross-border regulatory actions present additional complexity.",
  },
];

export default function RiskDisclosureAccordion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      {/* כותרת אזהרה */}
      <div className="flex items-center gap-3 mb-6 p-4 rounded-xl border border-tams-rose/20 bg-tams-rose/5">
        <AlertTriangle className="size-5 text-tams-rose flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Important Disclosure:
          </span>{" "}
          Investing in digital assets carries significant risk. Please review all
          risk categories carefully before making investment decisions.
        </p>
      </div>

      {/* אקורדיון סיכונים */}
      <Accordion>
        {riskCategories.map((risk) => {
          const Icon = risk.icon;
          return (
            <AccordionItem key={risk.id} value={risk.id}>
              <AccordionTrigger className="py-4 px-1 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div
                    className="size-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${risk.color}15` }}
                  >
                    <Icon
                      className="size-4"
                      style={{ color: risk.color }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {risk.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-1 pb-4">
                <div className="pl-11">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {risk.content}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </motion.div>
  );
}

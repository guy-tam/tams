"use client";

// מתודולוגיה והסתייגויות — חובה לכלול בעמוד ראיות מוסדי
import { motion } from "framer-motion";
import { BookOpen, Scale, AlertTriangle, Shield, FileText, Info } from "lucide-react";
import SectionHeader from "@/components/layout/SectionHeader";
import { useLanguage } from "@/lib/i18n/context";

const methodologyItems = [
  {
    icon: Shield,
    title: "Confidence Classification",
    content: [
      "High Confidence: Relationship confirmed through official announcements, SEC filings, or direct product launches by both parties. Multiple independent sources corroborate.",
      "Medium Confidence: Relationship reported by credible sources but may lack official confirmation from both parties. May be in pilot stage or details are limited.",
      "Low Confidence: Relationship is indirect, inferred from ecosystem activity, or based on single-source reports. May involve historical partnerships that have not been reconfirmed.",
    ],
  },
  {
    icon: Scale,
    title: "Relationship Type Distinctions",
    content: [
      "Direct Integration: Organization actively uses the blockchain network or protocol in a production or near-production capacity.",
      "Pilot / Sandbox: Organization has conducted formal testing, proof of concept, or regulatory sandbox experimentation — not yet production.",
      "Infrastructure Support: Organization provides technical services (cloud, nodes, development tools) to the network without necessarily building products on it.",
      "Governance Council: Organization participates in network governance — this signals institutional association but not necessarily active product usage.",
      "Ecosystem Membership: Organization participates in the broader ecosystem (coalitions, working groups) without direct product integration.",
      "Historical Trial: A past relationship that is no longer active or has been deprioritized. Included for completeness and transparency.",
      "Investment Exposure: Organization provides investment products (ETFs, trusts) that give investors exposure to the asset — a market structure relationship.",
    ],
  },
  {
    icon: BookOpen,
    title: "What Counts as Evidence",
    content: [
      "Official press releases and announcements from the organization or network",
      "SEC filings, regulatory submissions, and government documents",
      "Production product launches observable on-chain or through public APIs",
      "Published pilot results and proof-of-concept reports",
      "Governance council membership publicly listed on network websites",
      "Credible industry reporting from recognized media outlets",
    ],
  },
  {
    icon: Info,
    title: "What Does NOT Count as Direct Adoption",
    content: [
      "Mentions in analyst reports without confirming direct usage",
      "Conference presentations or 'exploring' statements without follow-up action",
      "Ecosystem overlap (e.g., both parties using Ethereum does not mean they work together)",
      "Social media engagement or executive tweets without substantive partnership",
      "One-time experimental interactions without ongoing commitment",
      "Vendor relationships where the organization uses a product built on a chain without awareness of the underlying blockchain",
    ],
  },
];

export default function MethodologyDisclaimer() {
  const { t } = useLanguage();

  // כותרות מתודולוגיה מתורגמות
  const methodologyTitles: Record<string, string> = {
    "Confidence Classification": t("proof.methodology.confidenceTitle"),
    "Relationship Type Distinctions": t("proof.methodology.relationshipTitle"),
    "What Counts as Evidence": t("proof.methodology.evidenceTitle"),
    "What Does NOT Count as Direct Adoption": t("proof.methodology.notEvidenceTitle"),
  };

  return (
    <section className="py-16 max-w-5xl mx-auto">
      <SectionHeader
        badge={t("proof.methodology.badge")}
        title={t("proof.methodology.title")}
        subtitle={t("proof.methodology.subtitle")}
      />

      {/* מתודולוגיה */}
      <div className="space-y-4 mt-8">
        {methodologyItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <item.icon className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-white">{methodologyTitles[item.title] || item.title}</h3>
            </div>
            <ul className="space-y-2">
              {item.content.map((line) => (
                <li key={line} className="text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2">
                  <span className="text-zinc-600 mt-1 shrink-0">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* הסתייגויות משפטיות */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 space-y-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-white">{t("proof.methodology.disclaimersTitle")}</h3>
        </div>

        <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-6 space-y-4">
          {[
            "This page is for informational and educational purposes only. It does not constitute investment advice, an offer to sell, or a solicitation to buy any securities or digital assets.",
            "Digital assets are volatile, speculative, and carry significant risk of loss — including total loss of principal. Past performance and historical evidence of ecosystem relationships do not guarantee future returns.",
            "The evidence presented represents a point-in-time classification. Ecosystem relationships may evolve, expand, contract, or terminate. Historical partnerships may not reflect current status.",
            "Enterprise blockchain adoption timelines are inherently unpredictable. Pilot programs may not convert to production deployments. Institutional interest does not guarantee production usage.",
            "Confidence levels reflect the assessment team's current evaluation and may differ from other analysts' conclusions. All classifications are subject to revision as new information becomes available.",
            "The scenarios presented are qualitative frameworks, not financial projections. They should not be interpreted as probability-weighted outcomes or expected returns.",
            "Investors should conduct their own due diligence and consult qualified financial, legal, and tax advisors before making any investment decisions.",
          ].map((disclaimer) => (
            <p key={disclaimer} className="text-[11px] text-zinc-400 leading-relaxed">
              {disclaimer}
            </p>
          ))}
        </div>

        {/* חותמת מתודולוגיה */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <FileText className="h-3.5 w-3.5 text-zinc-600" />
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
            {t("proof.methodology.stamp")}
          </span>
        </div>
      </motion.div>
    </section>
  );
}

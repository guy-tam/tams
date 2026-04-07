"use client";

// עמוד ההוכחות המוסדיות — ראיות מבוססות לתזת ההשקעה
import { useState, useCallback } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import ProofHero from "@/components/sections/proof/ProofHero";
import AssetThesisGrid from "@/components/sections/proof/AssetThesisGrid";
import EvidenceExplorer from "@/components/sections/proof/EvidenceExplorer";
import AdoptionCoverage from "@/components/sections/proof/AdoptionCoverage";
import MethodologyDisclaimer from "@/components/sections/proof/MethodologyDisclaimer";
import ProofTableOfContents from "@/components/sections/proof/ProofTableOfContents";

export default function ProofPage() {
  // סטייט משותף — סינון נכס בין AssetThesisGrid ל-EvidenceExplorer
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const handleAssetClick = useCallback((ticker: string) => {
    setSelectedAsset(ticker);
    // גלילה לאקספלורר הראיות
    setTimeout(() => {
      document.getElementById("evidence-explorer")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, []);

  return (
    <PageWrapper bgGrid>
      {/* ניווט תוכן עניינים צף */}
      <ProofTableOfContents />

      <div id="evidence-thesis">
        <ProofHero />
      </div>

      <div className="max-w-7xl mx-auto px-0">
        <div id="asset-matrix">
          <AssetThesisGrid onAssetClick={handleAssetClick} />
        </div>

        {/* קו הפרדה */}
        <div className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent my-4" />

        <div id="evidence-explorer">
          <EvidenceExplorer initialAsset={selectedAsset} />
        </div>

        <div className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent my-4" />

        <div id="global-coverage">
          <AdoptionCoverage />
        </div>

        <div className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent my-4" />

        <div id="methodology">
          <MethodologyDisclaimer />
        </div>
      </div>
    </PageWrapper>
  );
}

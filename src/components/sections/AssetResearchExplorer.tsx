"use client";

// חוקר נכסים - ממשק חיפוש ומחקר נכסי קריפטו
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { assets, categories, type Asset } from "@/data/assets";

// צבעים לפי קטגוריה
const categoryColors: Record<string, string> = {
  "Layer 1": "#3b82f6",
  Payments: "#f59e0b",
  Infrastructure: "#10b981",
  Enterprise: "#8b5cf6",
  RWA: "#3b82f6",
  "AI & Compute": "#f43f5e",
};

// אנימציות רשימה
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// סקשן מידע בפאנל הפרטים
function InfoSection({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {content}
      </p>
    </div>
  );
}

export default function AssetResearchExplorer() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // סינון נכסים לפי חיפוש וקטגוריה
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        search === "" ||
        asset.name.toLowerCase().includes(search.toLowerCase()) ||
        asset.ticker.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || asset.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  // פתיחת פאנל פרטים
  const openDetail = (asset: Asset) => {
    setSelectedAsset(asset);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* שורת חיפוש וסינון */}
      <div className="space-y-4">
        {/* שדה חיפוש */}
        <div className="relative max-w-md">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search assets by name or ticker..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ps-10 h-10 bg-white border-amber-500/15 backdrop-blur-sm focus:border-blue-500/30"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* כפתורי סינון קטגוריה */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium transition-all border
                ${
                  activeCategory === cat
                    ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                    : "bg-white/[0.03] border-amber-500/15 text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* רשת כרטיסי נכסים */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + search}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredAssets.map((asset) => {
            const catColor = categoryColors[asset.category] || "#6b7280";
            return (
              <motion.button
                key={asset.ticker}
                variants={cardVariants}
                layout
                onClick={() => openDetail(asset)}
                className="text-left group relative rounded-2xl border border-amber-500/15 bg-white backdrop-blur-md p-5 transition-all hover:border-amber-500/25 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-ring"
              >
                {/* כותרת עם טיקר */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span
                      className="text-lg font-bold"
                      style={{ color: catColor }}
                    >
                      {asset.ticker}
                    </span>
                    <div className="text-sm text-foreground font-medium mt-0.5">
                      {asset.name}
                    </div>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground/0 group-hover:text-muted-foreground/60 transition-colors" />
                </div>

                {/* תג קטגוריה */}
                <Badge
                  variant="outline"
                  className="mb-3 text-[10px] border-amber-500/15"
                  style={{ color: catColor }}
                >
                  {asset.category}
                </Badge>

                {/* תיאור קצר */}
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {asset.description}
                </p>

                {/* שווי שוק */}
                {asset.marketCap && (
                  <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Market Cap
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {asset.marketCap}
                    </span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* הודעה כשאין תוצאות */}
      {filteredAssets.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No assets found matching your criteria.</p>
        </div>
      )}

      {/* פאנל פרטים - Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto bg-card border-amber-500/15"
        >
          {selectedAsset && (
            <>
              <SheetHeader className="pb-4 border-b border-amber-500/15">
                <div className="flex items-center gap-3">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      color:
                        categoryColors[selectedAsset.category] || "#6b7280",
                    }}
                  >
                    {selectedAsset.ticker}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-amber-500/15"
                  >
                    {selectedAsset.category}
                  </Badge>
                </div>
                <SheetTitle className="text-lg">
                  {selectedAsset.name}
                </SheetTitle>
                <SheetDescription>{selectedAsset.description}</SheetDescription>
                {selectedAsset.marketCap && (
                  <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                    <span>Market Cap: {selectedAsset.marketCap}</span>
                    {selectedAsset.sector && (
                      <span>Sector: {selectedAsset.sector}</span>
                    )}
                  </div>
                )}
              </SheetHeader>

              {/* טאבים של מידע */}
              <div className="pt-4">
                <Tabs defaultValue="overview">
                  <TabsList className="w-full">
                    <TabsTrigger value="overview" className="flex-1 text-xs">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="thesis" className="flex-1 text-xs">
                      Thesis
                    </TabsTrigger>
                    <TabsTrigger value="risks" className="flex-1 text-xs">
                      Risks
                    </TabsTrigger>
                    <TabsTrigger value="fit" className="flex-1 text-xs">
                      TAMS Fit
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4">
                    <TabsContent value="overview">
                      <InfoSection
                        title="Asset Overview"
                        content={selectedAsset.overview}
                      />
                    </TabsContent>

                    <TabsContent value="thesis">
                      <InfoSection
                        title="Investment Thesis"
                        content={selectedAsset.thesis}
                      />
                    </TabsContent>

                    <TabsContent value="risks">
                      <InfoSection
                        title="Key Risks"
                        content={selectedAsset.risks}
                      />
                    </TabsContent>

                    <TabsContent value="fit">
                      <InfoSection
                        title="TAMS Portfolio Fit"
                        content={selectedAsset.tamsFit}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* כפתור סגירה תחתון */}
              <div className="mt-8">
                <Button
                  variant="outline"
                  className="w-full border-amber-500/15"
                  onClick={() => setSheetOpen(false)}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

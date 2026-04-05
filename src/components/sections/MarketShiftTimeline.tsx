"use client";

// ציר זמן שינויי שוק - אימוץ מוסדי של בלוקצ׳יין
import { motion } from "framer-motion";
import { Building2, TrendingUp, Landmark, Globe, Coins, Shield } from "lucide-react";
import { type LucideIcon } from "lucide-react";

interface MarketEvent {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

// אירועי מפתח באימוץ מוסדי
const events: MarketEvent[] = [
  {
    year: "2020",
    title: "MicroStrategy & Corporate Treasury",
    description:
      "MicroStrategy pioneers corporate Bitcoin treasury strategy, signaling institutional confidence in BTC as a reserve asset.",
    icon: Building2,
    color: "#f59e0b",
  },
  {
    year: "2021",
    title: "El Salvador & National Adoption",
    description:
      "El Salvador adopts Bitcoin as legal tender. Major banks begin offering crypto custody services to wealth management clients.",
    icon: Globe,
    color: "#3b82f6",
  },
  {
    year: "2022",
    title: "DeFi Institutional Infrastructure",
    description:
      "Institutional-grade DeFi protocols emerge. Aave Arc launches for permissioned participants. On-chain compliance tools mature.",
    icon: Coins,
    color: "#8b5cf6",
  },
  {
    year: "2023",
    title: "BlackRock & TradFi Entry",
    description:
      "BlackRock files for spot Bitcoin ETF, triggering a wave of institutional applications. Traditional finance legitimizes crypto.",
    icon: Landmark,
    color: "#06b6d4",
  },
  {
    year: "2024",
    title: "ETF Approvals & Capital Inflow",
    description:
      "Spot Bitcoin ETFs approved and attract billions in inflows. Ethereum ETFs follow. Institutional allocation to crypto becomes mainstream.",
    icon: TrendingUp,
    color: "#10b981",
  },
  {
    year: "2025-26",
    title: "Regulatory Clarity & Maturation",
    description:
      "Regulatory frameworks solidify globally. Tokenized assets and RWAs gain traction. Institutional crypto AUM reaches new milestones.",
    icon: Shield,
    color: "#f43f5e",
  },
];

export default function MarketShiftTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* ציר אופקי על מסכים גדולים, אנכי על מובייל */}

      {/* תצוגה אנכית */}
      <div className="relative">
        {/* קו ציר */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-tams-amber/40 via-tams-blue/40 via-tams-purple/40 to-tams-green/40" />

        <div className="space-y-6">
          {events.map((event, i) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex gap-6 items-start"
              >
                {/* נקודה על הציר */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="size-12 rounded-full flex items-center justify-center border"
                    style={{
                      background: `${event.color}10`,
                      borderColor: `${event.color}30`,
                    }}
                  >
                    <Icon
                      className="size-5"
                      style={{ color: event.color }}
                    />
                  </div>
                </div>

                {/* כרטיס אירוע */}
                <div className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-md p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-sm font-bold"
                      style={{ color: event.color }}
                    >
                      {event.year}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {event.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

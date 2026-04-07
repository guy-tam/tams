"use client";

// לוגו TAMS — עץ מוזהב SVG ללא מסגרת, משתלב ברקע, ריחוף מתמשך
// ללא initial animation — לא קופץ בין עמודים
import { motion } from "framer-motion";

interface TamsLogoProps {
  variant?: "page" | "sidebar";
  className?: string;
}

// עץ מוזהב בסגנון הלוגו המקורי — SVG נקי ללא רקע
function GoldenTree({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="treeGold" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#e8c779" />
          <stop offset="50%" stopColor="#d4a853" />
          <stop offset="100%" stopColor="#b8923d" />
        </linearGradient>
        <filter id="treeGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="url(#treeGold)" filter="url(#treeGlow)" opacity="0.9">
        {/* גזע */}
        <rect x="47" y="45" width="6" height="22" rx="2" />
        {/* ענפים ראשיים */}
        <rect x="42" y="48" width="16" height="3" rx="1.5" transform="rotate(-25 50 50)" />
        <rect x="42" y="48" width="16" height="3" rx="1.5" transform="rotate(25 50 50)" />
        {/* עלים — שכבה 1 (תחתונה) */}
        <ellipse cx="32" cy="42" rx="5" ry="3" transform="rotate(-30 32 42)" />
        <ellipse cx="68" cy="42" rx="5" ry="3" transform="rotate(30 68 42)" />
        <ellipse cx="38" cy="38" rx="4.5" ry="2.8" transform="rotate(-15 38 38)" />
        <ellipse cx="62" cy="38" rx="4.5" ry="2.8" transform="rotate(15 62 38)" />
        {/* עלים — שכבה 2 (אמצעית) */}
        <ellipse cx="35" cy="32" rx="5" ry="3" transform="rotate(-40 35 32)" />
        <ellipse cx="65" cy="32" rx="5" ry="3" transform="rotate(40 65 32)" />
        <ellipse cx="42" cy="28" rx="4.5" ry="2.8" transform="rotate(-20 42 28)" />
        <ellipse cx="58" cy="28" rx="4.5" ry="2.8" transform="rotate(20 58 28)" />
        <ellipse cx="50" cy="30" rx="4" ry="2.5" />
        {/* עלים — שכבה 3 (עליונה) */}
        <ellipse cx="40" cy="22" rx="4.5" ry="2.5" transform="rotate(-35 40 22)" />
        <ellipse cx="60" cy="22" rx="4.5" ry="2.5" transform="rotate(35 60 22)" />
        <ellipse cx="46" cy="18" rx="4" ry="2.3" transform="rotate(-10 46 18)" />
        <ellipse cx="54" cy="18" rx="4" ry="2.3" transform="rotate(10 54 18)" />
        <ellipse cx="50" cy="15" rx="3.5" ry="2.2" />
        {/* עלים צדדיים */}
        <ellipse cx="28" cy="35" rx="4" ry="2.5" transform="rotate(-50 28 35)" />
        <ellipse cx="72" cy="35" rx="4" ry="2.5" transform="rotate(50 72 35)" />
        {/* שורשים */}
        <path d="M47 67 Q42 75 30 80" stroke="url(#treeGold)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M53 67 Q58 75 70 80" stroke="url(#treeGold)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M48 67 Q46 73 38 78" stroke="url(#treeGold)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M52 67 Q54 73 62 78" stroke="url(#treeGold)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M50 67 Q50 74 50 82" stroke="url(#treeGold)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function TamsLogo({ variant = "page", className = "" }: TamsLogoProps) {
  if (variant === "sidebar") {
    return (
      <div className={`relative shrink-0 ${className}`}>
        <GoldenTree size={36} />
      </div>
    );
  }

  // variant === "page" — לוגו קבוע בפינה, ריחוף מתמשך ללא קפיצה
  return (
    <div className={`fixed top-5 start-[calc(theme(spacing.64)+1.25rem)] z-20 flex items-center gap-2.5 pointer-events-none ${className}`}>
      {/* עץ מרחף — אנימציה מתמשכת בלבד, ללא initial */}
      <motion.div
        animate={{
          y: [0, -3, 0, 2, 0],
        }}
        transition={{
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <GoldenTree size={32} />
      </motion.div>

      {/* TAMS — זהב שקט */}
      <span
        className="text-[12px] font-semibold tracking-[0.15em] text-amber-400/50"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        TAMS
      </span>
    </div>
  );
}

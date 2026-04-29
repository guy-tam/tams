"use client";

// Footnote — מספר superscript זהוב, hover מציג מקור ותאריך
// שימוש: <Footnote n={1} source="BCG, 2024" />
import { useState } from "react";

interface FootnoteProps {
  n: number;
  source: string;
  url?: string;
  date?: string;
}

export default function Footnote({ n, source, url, date }: FootnoteProps) {
  const [open, setOpen] = useState(false);
  const tooltipText = `${source}${date ? ` · ${date}` : ""}`;

  return (
    <span className="relative inline-block align-baseline">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => url && window.open(url, "_blank", "noopener,noreferrer")}
        className="inline-flex items-center justify-center align-super text-[9px] tracking-tight font-semibold size-3.5 mx-0.5 rounded-full border border-amber-400/40 bg-amber-500/[0.08] text-amber-300/95 hover:bg-amber-500/[0.18] hover:border-amber-400/60 hover:text-amber-200 transition-colors cursor-help focus:outline-none focus:ring-2 focus:ring-amber-400/50"
        aria-label={`Source ${n}: ${tooltipText}`}
      >
        {n}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute z-50 bottom-full mb-1.5 left-1/2 -translate-x-1/2 surface-tier-1 px-3 py-2 text-[11px] text-zinc-300 whitespace-nowrap font-light shadow-xl pointer-events-none"
          style={{ minWidth: "max-content", maxWidth: "320px" }}
        >
          <span className="block whitespace-normal leading-relaxed">{tooltipText}</span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px size-2 rotate-45 bg-amber-500/30 border-r border-b border-amber-500/30" />
        </span>
      )}
    </span>
  );
}

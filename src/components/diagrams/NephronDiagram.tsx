import { useState } from "react";

const segments = [
  { id: "glomerulus", label: "Glomerulus", x: 100, y: 50, info: "Filtration: GFR 125 ml/min. Filters all molecules <70 kDa. Starling forces determine net filtration pressure (~15 mmHg)." },
  { id: "pct", label: "PCT", x: 220, y: 80, info: "Reabsorbs 65-70% Na⁺, H₂O, all glucose (SGLT2), amino acids, 85% HCO₃⁻. Na⁺/K⁺-ATPase driven. Isotonic reabsorption." },
  { id: "desc-loh", label: "Desc. LoH", x: 160, y: 160, info: "Permeable to water, impermeable to solutes. Water moves out by osmosis into hypertonic medullary interstitium." },
  { id: "asc-loh", label: "Asc. LoH", x: 240, y: 160, info: "Impermeable to water. Thick segment: NKCC2 (Na⁺/K⁺/2Cl⁻). Target of loop diuretics. Creates dilute tubular fluid." },
  { id: "dct", label: "DCT", x: 310, y: 80, info: "NCC (Na⁺/Cl⁻ cotransporter) — target of thiazide diuretics. Fine-tuning of Na⁺ and Ca²⁺ reabsorption." },
  { id: "cd", label: "Collecting Duct", x: 310, y: 180, info: "Principal cells: ENaC (aldosterone). Intercalated cells: H⁺ secretion. ADH → aquaporin-2 → water reabsorption." },
];

export const NephronDiagram = () => {
  const [active, setActive] = useState<string | null>(null);
  const activeSegment = segments.find(s => s.id === active);

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 420 260" className="w-full" role="img" aria-label="Nephron diagram">
        {/* Bowman's capsule */}
        <ellipse cx="100" cy="50" rx="35" ry="25" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx="100" cy="50" r="15" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" />

        {/* PCT */}
        <path d="M 135 50 Q 180 30 220 50 Q 260 70 240 100" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" />

        {/* Descending LoH */}
        <path d="M 240 100 Q 230 130 180 200 Q 170 220 200 230" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2.5" />

        {/* Ascending LoH */}
        <path d="M 200 230 Q 230 220 240 200 Q 260 150 280 100" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2.5" />

        {/* DCT */}
        <path d="M 280 100 Q 310 60 330 80 Q 350 100 320 120" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2.5" opacity="0.7" />

        {/* Collecting duct */}
        <path d="M 320 120 Q 330 150 320 200 Q 315 230 320 250" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="6 3" />

        {/* Labels as clickable regions */}
        {segments.map(seg => (
          <g key={seg.id} onClick={() => setActive(active === seg.id ? null : seg.id)} className="cursor-pointer">
            <rect
              x={seg.x - 30} y={seg.y - 10} width="60" height="20" rx="4"
              fill={active === seg.id ? "hsl(var(--primary)/0.2)" : "hsl(var(--secondary)/0.5)"}
              stroke={active === seg.id ? "hsl(var(--primary))" : "hsl(var(--border))"}
              strokeWidth="1.5"
            />
            <text x={seg.x} y={seg.y + 4} fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
              {seg.label}
            </text>
          </g>
        ))}

        {/* Urine output arrow */}
        <text x="320" y="255" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">→ Urine</text>
      </svg>

      {activeSegment && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 animate-fade-in">
          <p className="text-sm font-semibold text-foreground">{activeSegment.label}</p>
          <p className="text-sm text-muted-foreground mt-1">{activeSegment.info}</p>
        </div>
      )}
      {!activeSegment && (
        <p className="text-sm text-muted-foreground text-center">Click a nephron segment to learn about its function</p>
      )}
    </div>
  );
};

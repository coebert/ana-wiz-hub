import { useState } from "react";

type Feature = "anatomy" | "vasculature" | "function" | "clinical";

interface FeatureRow {
  id: Feature;
  label: string;
  cortical: string;
  juxta: string;
}

const features: FeatureRow[] = [
  {
    id: "anatomy",
    label: "Anatomy",
    cortical: "Glomerulus in OUTER cortex. Short loop of Henle that barely reaches the outer medulla — no thin ascending limb. ~85% of all nephrons.",
    juxta: "Glomerulus deep in cortex, just above the corticomedullary junction. Long loop of Henle that reaches the tip of the renal papilla (inner medulla). ~15% of nephrons.",
  },
  {
    id: "vasculature",
    label: "Post-glomerular vasculature",
    cortical: "Efferent arteriole → PERITUBULAR CAPILLARY network wrapping cortical tubules. Low hydrostatic, high oncotic pressure → favours bulk REABSORPTION.",
    juxta: "Efferent arteriole → VASA RECTA — long hairpin capillary loops running parallel to the loop of Henle. Acts as a countercurrent EXCHANGER (preserves the medullary gradient).",
  },
  {
    id: "function",
    label: "Primary function",
    cortical: "Bulk reabsorption of filtered Na⁺, water, glucose, amino acids, HCO₃⁻. Handles the majority of solute and volume reabsorption.",
    juxta: "Generation and maintenance of the corticomedullary osmotic gradient (300 → 1200 mOsm/kg). Essential for URINE CONCENTRATION via ADH.",
  },
  {
    id: "clinical",
    label: "Clinical relevance",
    cortical: "Site of action of most diuretics that work in the cortex (thiazides at DCT). Cortical perfusion preserved by autoregulation; loss of cortical mass = ↓ GFR.",
    juxta: "Outer medulla is the most O₂-vulnerable region of the kidney — explains susceptibility to ATN in shock and contrast nephropathy. Diabetes insipidus = failure of this concentrating mechanism.",
  },
];

const stats = [
  { label: "% of nephrons", cortical: "~85%", juxta: "~15%" },
  { label: "Loop length", cortical: "Short (~2 mm)", juxta: "Long (up to 12 mm — reaches papilla)" },
  { label: "Thin ascending limb", cortical: "Absent", juxta: "Present" },
  { label: "Post-glomerular vessel", cortical: "Peritubular capillaries", juxta: "Vasa recta (DVR + AVR)" },
  { label: "Max urine osmolality contribution", cortical: "Minimal", juxta: "Up to 1200 mOsm/kg" },
  { label: "Primary role", cortical: "Reabsorption", juxta: "Concentration" },
];

interface NephronProps {
  variant: "cortical" | "juxta";
  highlight: Feature | null;
}

const NephronSchematic = ({ variant, highlight }: NephronProps) => {
  const isJuxta = variant === "juxta";

  // Common cortex/medulla zones
  // viewBox 0 0 300 460
  // cortex: 0-150, outer med: 150-260, inner med: 260-440, papilla: 440-460
  const cortexBottom = 150;
  const outerMedBottom = 260;

  // Glomerulus position
  const glomX = isJuxta ? 80 : 80;
  const glomY = isJuxta ? 130 : 50; // juxta sits at corticomedullary junction; cortical sits in outer cortex

  // Loop bottom y
  const loopBottom = isJuxta ? 430 : 200;
  const loopTop = glomY + 20;

  // Vascular highlight
  const vascHighlight = highlight === "vasculature";
  const funcHighlight = highlight === "function";
  const anatHighlight = highlight === "anatomy";
  const clinHighlight = highlight === "clinical";

  return (
    <svg viewBox="0 0 300 470" className="w-full" role="img" aria-label={`${variant} nephron schematic`}>
      <defs>
        <linearGradient id={`cortex-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(35 55% 70%)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(35 55% 65%)" stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id={`outerMed-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(15 50% 55%)" stopOpacity="0.10" />
          <stop offset="100%" stopColor="hsl(15 50% 45%)" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id={`innerMed-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(15 50% 40%)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="hsl(15 55% 30%)" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* Zones */}
      <rect x="0" y="0" width="300" height={cortexBottom} fill={`url(#cortex-${variant})`} />
      <rect x="0" y={cortexBottom} width="300" height={outerMedBottom - cortexBottom} fill={`url(#outerMed-${variant})`} />
      <rect x="0" y={outerMedBottom} width="300" height={460 - outerMedBottom} fill={`url(#innerMed-${variant})`} />

      {/* Zone divider lines */}
      <line x1="0" y1={cortexBottom} x2="300" y2={cortexBottom} stroke="hsl(15 50% 40%)" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1={outerMedBottom} x2="300" y2={outerMedBottom} stroke="hsl(15 50% 35%)" strokeWidth="0.7" strokeDasharray="4 3" opacity="0.45" />

      {/* Zone labels */}
      <text x="6" y="14" fontSize="8" fill="hsl(35 55% 45%)" fontWeight="700" opacity="0.7">CORTEX</text>
      <text x="6" y={cortexBottom + 14} fontSize="8" fill="hsl(15 55% 40%)" fontWeight="700" opacity="0.7">OUTER MEDULLA</text>
      <text x="6" y={outerMedBottom + 14} fontSize="8" fill="hsl(15 60% 35%)" fontWeight="700" opacity="0.75">INNER MEDULLA</text>
      {isJuxta && <text x="6" y="455" fontSize="7" fill="hsl(15 60% 30%)" fontWeight="700" opacity="0.7">PAPILLA</text>}

      {/* === Interlobular artery (left) === */}
      <g opacity="0.6">
        <path d="M 30 10 L 32 cortexBottom".replace("cortexBottom", String(cortexBottom))} fill="none" stroke="hsl(0 60% 50%)" strokeWidth="1.6" />
        <path d={`M 30 10 L 32 ${cortexBottom - 5}`} fill="none" stroke="hsl(0 60% 50%)" strokeWidth="1.6" />
        <path d={`M 36 10 L 38 ${cortexBottom - 5}`} fill="none" stroke="hsl(0 60% 50%)" strokeWidth="1.6" />
      </g>

      {/* === Afferent arteriole === */}
      <g opacity="0.85">
        <path d={`M 38 ${glomY - 6} Q 55 ${glomY - 8} ${glomX - 18} ${glomY - 6}`} fill="none" stroke="hsl(0 60% 50%)" strokeWidth="1.4" />
        <path d={`M 38 ${glomY + 4} Q 55 ${glomY + 2} ${glomX - 18} ${glomY + 4}`} fill="none" stroke="hsl(0 60% 50%)" strokeWidth="1.4" />
      </g>

      {/* === Glomerulus + Bowman === */}
      <g opacity={anatHighlight ? 1 : 0.95}>
        <ellipse cx={glomX} cy={glomY} rx="20" ry="16" fill="none"
          stroke={anatHighlight ? "hsl(var(--primary))" : "hsl(var(--primary)/0.6)"}
          strokeWidth={anatHighlight ? 2.2 : 1.4} />
        {[
          `M ${glomX - 10} ${glomY - 6} Q ${glomX - 14} ${glomY} ${glomX - 8} ${glomY + 4}`,
          `M ${glomX - 4} ${glomY - 8} Q ${glomX - 8} ${glomY - 2} ${glomX - 2} ${glomY + 4}`,
          `M ${glomX + 4} ${glomY - 8} Q ${glomX} ${glomY - 2} ${glomX + 6} ${glomY + 4}`,
          `M ${glomX + 10} ${glomY - 6} Q ${glomX + 14} ${glomY} ${glomX + 8} ${glomY + 4}`,
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="hsl(0 60% 50%)" strokeWidth="1.6" opacity="0.6" />
        ))}
      </g>

      {/* === Efferent arteriole === */}
      <g opacity="0.85">
        {!isJuxta ? (
          <>
            {/* Cortical: efferent stays in cortex, branches into peritubular network */}
            <path d={`M ${glomX + 18} ${glomY - 4} Q ${glomX + 60} ${glomY - 10} ${glomX + 100} ${glomY + 10}`} fill="none" stroke="hsl(0 45% 45%)" strokeWidth="1.1" />
          </>
        ) : (
          <>
            {/* Juxta: efferent dives into medulla */}
            <path d={`M ${glomX + 18} ${glomY - 4} Q ${glomX + 35} ${glomY + 10} ${glomX + 60} ${cortexBottom - 5}`} fill="none" stroke="hsl(0 45% 45%)" strokeWidth="1.2" />
            <path d={`M ${glomX + 18} ${glomY + 4} Q ${glomX + 35} ${glomY + 18} ${glomX + 65} ${cortexBottom - 5}`} fill="none" stroke="hsl(0 45% 45%)" strokeWidth="1.2" />
          </>
        )}
      </g>

      {/* === PCT (cortex, convoluted) === */}
      {(() => {
        const pctStartX = glomX + 22;
        const pctStartY = glomY + 8;
        const pctPath = `M ${pctStartX} ${pctStartY} Q ${pctStartX + 15} ${pctStartY + 12} ${pctStartX + 30} ${pctStartY + 4} Q ${pctStartX + 50} ${pctStartY - 4} ${pctStartX + 65} ${pctStartY + 8} Q ${pctStartX + 78} ${pctStartY + 18} ${pctStartX + 70} ${pctStartY + 30}`;
        return (
          <g>
            <path d={pctPath} fill="none" stroke="hsl(150 50% 40%)" strokeWidth="2.4" strokeLinecap="round" />
            <path d={pctPath} fill="none" stroke="hsl(150 55% 50%)" strokeWidth="1.2" opacity="0.15" />
          </g>
        );
      })()}

      {/* === Loop of Henle === */}
      {(() => {
        const loopX1 = glomX + 92; // descending limb x
        const loopX2 = glomX + 105; // ascending limb x
        const loopTopY = glomY + 38;

        if (!isJuxta) {
          // Short loop — descends only into outer medulla
          return (
            <g>
              {/* Descending */}
              <path d={`M ${loopX1} ${loopTopY} L ${loopX1} ${loopBottom}`} fill="none" stroke="hsl(200 55% 48%)" strokeWidth="1.6" />
              {/* Hairpin */}
              <path d={`M ${loopX1} ${loopBottom} Q ${(loopX1 + loopX2) / 2} ${loopBottom + 10} ${loopX2} ${loopBottom}`} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" opacity="0.5" />
              {/* Thick ascending */}
              <path d={`M ${loopX2} ${loopBottom} L ${loopX2 + 4} ${loopTopY}`} fill="none" stroke="hsl(30 65% 45%)" strokeWidth="2.2" />
              <text x={loopX1 - 8} y={loopBottom + 24} fontSize="6.5" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic" opacity="0.7">short loop</text>
            </g>
          );
        }

        // Long juxtamedullary loop — descends to papilla
        return (
          <g>
            {/* Thin descending — full length */}
            <path d={`M ${loopX1} ${loopTopY} L ${loopX1 - 2} ${loopBottom}`} fill="none" stroke="hsl(200 55% 48%)" strokeWidth="1.4" />
            {/* Hairpin at papilla */}
            <path d={`M ${loopX1 - 2} ${loopBottom} Q ${(loopX1 + loopX2) / 2} ${loopBottom + 12} ${loopX2 + 2} ${loopBottom}`} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.3" opacity="0.5" />
            {/* Thin ascending — only in inner medulla */}
            <path d={`M ${loopX2 + 2} ${loopBottom} L ${loopX2 + 4} ${outerMedBottom}`} fill="none" stroke="hsl(30 55% 48%)" strokeWidth="1.4" />
            {/* Thick ascending — outer medulla → cortex */}
            <path d={`M ${loopX2 + 4} ${outerMedBottom} L ${loopX2 + 6} ${loopTopY}`} fill="none" stroke="hsl(30 65% 45%)" strokeWidth="2.2" />
            <text x={(loopX1 + loopX2) / 2} y={loopBottom + 26} fontSize="6.5" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic" opacity="0.7">long loop → papilla</text>
          </g>
        );
      })()}

      {/* === DCT + Collecting duct === */}
      {(() => {
        const dctStart = glomX + 105;
        const dctY = glomY + 38;
        return (
          <g>
            {/* DCT — short convoluted */}
            <path d={`M ${dctStart + 6} ${dctY} Q ${dctStart + 25} ${dctY - 10} ${dctStart + 40} ${dctY + 4} Q ${dctStart + 50} ${dctY + 14} ${dctStart + 60} ${dctY + 8}`}
              fill="none" stroke="hsl(45 60% 42%)" strokeWidth="2" />
            {/* Cortical collecting duct */}
            <path d={`M ${dctStart + 60} ${dctY + 8} L ${dctStart + 60} ${cortexBottom}`} fill="none" stroke="hsl(270 50% 48%)" strokeWidth="1.8" strokeDasharray="5 2" />
            {/* Medullary collecting duct down to papilla (shared destination shown for both) */}
            {isJuxta ? (
              <path d={`M ${dctStart + 60} ${cortexBottom} L ${dctStart + 58} ${loopBottom + 5}`} fill="none" stroke="hsl(270 45% 42%)" strokeWidth="1.8" strokeDasharray="5 2" />
            ) : (
              <path d={`M ${dctStart + 60} ${cortexBottom} L ${dctStart + 58} ${cortexBottom + 35}`} fill="none" stroke="hsl(270 45% 42%)" strokeWidth="1.6" strokeDasharray="5 2" opacity="0.45" />
            )}
            {/* Urine arrow */}
            {isJuxta && (
              <>
                <polygon points={`${dctStart + 53},${loopBottom + 15} ${dctStart + 63},${loopBottom + 15} ${dctStart + 58},${loopBottom + 27}`} fill="hsl(var(--muted-foreground))" opacity="0.6" />
                <text x={dctStart + 58} y={loopBottom + 38} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">urine</text>
              </>
            )}
          </g>
        );
      })()}

      {/* === Vasculature: peritubular capillaries (cortical) OR vasa recta (juxta) === */}
      {!isJuxta ? (
        // Peritubular capillary mesh — cortex only, around tubules
        <g opacity={vascHighlight ? 0.95 : 0.5}>
          {[
            `M ${glomX + 30} ${glomY + 22} Q ${glomX + 50} ${glomY + 28} ${glomX + 70} ${glomY + 22}`,
            `M ${glomX + 40} ${glomY + 36} Q ${glomX + 60} ${glomY + 42} ${glomX + 85} ${glomY + 36}`,
            `M ${glomX + 110} ${glomY + 22} Q ${glomX + 130} ${glomY + 28} ${glomX + 150} ${glomY + 22}`,
            `M ${glomX + 115} ${glomY + 42} Q ${glomX + 135} ${glomY + 48} ${glomX + 155} ${glomY + 42}`,
            `M ${glomX + 25} ${glomY + 55} Q ${glomX + 60} ${glomY + 60} ${glomX + 100} ${glomY + 55}`,
            `M ${glomX + 105} ${glomY + 60} Q ${glomX + 130} ${glomY + 66} ${glomX + 160} ${glomY + 60}`,
            `M ${glomX + 35} ${glomY + 75} Q ${glomX + 70} ${glomY + 80} ${glomX + 110} ${glomY + 75}`,
            `M ${glomX + 115} ${glomY + 80} Q ${glomX + 145} ${glomY + 84} ${glomX + 165} ${glomY + 80}`,
          ].map((d, i) => (
            <path key={i} d={d} fill="none" stroke="hsl(340 50% 55%)"
              strokeWidth={vascHighlight ? 1.4 : 0.9} strokeDasharray="2 2" strokeLinecap="round" />
          ))}
          {vascHighlight && (
            <text x={glomX + 95} y={glomY + 100} fontSize="7" fill="hsl(340 55% 50%)" textAnchor="middle" fontWeight="600">peritubular capillary network</text>
          )}
        </g>
      ) : (
        // Vasa recta — long parallel hairpin loops
        <g opacity={vascHighlight ? 1 : 0.65}>
          {/* Bundle 1 — descending vasa recta (left of LoH) */}
          <path d={`M ${glomX + 60} ${cortexBottom - 5} L ${glomX + 58} ${loopBottom - 5}`} fill="none" stroke="hsl(0 65% 50%)" strokeWidth={vascHighlight ? 1.4 : 1} />
          <path d={`M ${glomX + 65} ${cortexBottom - 5} L ${glomX + 63} ${loopBottom - 5}`} fill="none" stroke="hsl(0 65% 50%)" strokeWidth={vascHighlight ? 1.4 : 1} />
          {/* Hairpin */}
          <path d={`M ${glomX + 58} ${loopBottom - 5} Q ${glomX + 64} ${loopBottom + 6} ${glomX + 70} ${loopBottom - 5}`} fill="none" stroke="hsl(0 65% 50%)" strokeWidth={vascHighlight ? 1.4 : 1} />
          {/* Ascending vasa recta */}
          <path d={`M ${glomX + 70} ${loopBottom - 5} L ${glomX + 68} ${cortexBottom - 5}`} fill="none" stroke="hsl(220 55% 48%)" strokeWidth={vascHighlight ? 1.4 : 1} />
          <path d={`M ${glomX + 75} ${loopBottom - 5} L ${glomX + 73} ${cortexBottom - 5}`} fill="none" stroke="hsl(220 55% 48%)" strokeWidth={vascHighlight ? 1.4 : 1} />

          {/* Bundle 2 — right side of loop */}
          <path d={`M ${glomX + 118} ${cortexBottom - 5} L ${glomX + 116} ${loopBottom - 10}`} fill="none" stroke="hsl(0 65% 50%)" strokeWidth={vascHighlight ? 1.3 : 0.9} opacity="0.85" />
          <path d={`M ${glomX + 116} ${loopBottom - 10} Q ${glomX + 122} ${loopBottom + 2} ${glomX + 128} ${loopBottom - 10}`} fill="none" stroke="hsl(0 65% 50%)" strokeWidth={vascHighlight ? 1.3 : 0.9} opacity="0.85" />
          <path d={`M ${glomX + 128} ${loopBottom - 10} L ${glomX + 126} ${cortexBottom - 5}`} fill="none" stroke="hsl(220 55% 48%)" strokeWidth={vascHighlight ? 1.3 : 0.9} opacity="0.85" />

          {/* Direction arrows */}
          {[200, 300, 380].map((y, i) => (
            <g key={`arr-${i}`} opacity={vascHighlight ? 0.8 : 0.5}>
              <polygon points={`${glomX + 56},${y - 3} ${glomX + 56},${y + 3} ${glomX + 52},${y}`} fill="hsl(0 65% 50%)" />
              <polygon points={`${glomX + 76},${y + 3} ${glomX + 76},${y - 3} ${glomX + 80},${y}`} fill="hsl(220 55% 50%)" />
            </g>
          ))}

          {vascHighlight && (
            <>
              <text x={glomX + 40} y={loopBottom - 60} fontSize="6.5" fill="hsl(0 60% 50%)" fontWeight="600">DVR ↓</text>
              <text x={glomX + 80} y={loopBottom - 60} fontSize="6.5" fill="hsl(220 55% 50%)" fontWeight="600">AVR ↑</text>
              <text x={glomX + 65} y={loopBottom + 30} fontSize="6.5" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">vasa recta</text>
            </>
          )}
        </g>
      )}

      {/* === Osmolality gradient (right margin, juxta only — emphasises concentration role) === */}
      {isJuxta && (
        <g opacity={funcHighlight ? 0.9 : 0.45}>
          {[
            { y: 145, osm: "300" },
            { y: 220, osm: "600" },
            { y: 320, osm: "900" },
            { y: 430, osm: "1200" },
          ].map(m => (
            <text key={m.y} x="290" y={m.y} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="end" fontWeight="600">
              {m.osm}
            </text>
          ))}
          <text x="290" y="135" fontSize="5.5" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.7">mOsm/kg</text>
        </g>
      )}
      {!isJuxta && funcHighlight && (
        <text x="290" y="200" fontSize="7" fill="hsl(150 55% 50%)" textAnchor="end" fontWeight="600">~300 mOsm/kg</text>
      )}

      {/* Functional highlight overlay */}
      {funcHighlight && (
        <g>
          {!isJuxta ? (
            <text x="150" y="450" fontSize="9" fill="hsl(150 55% 50%)" textAnchor="middle" fontWeight="700">REABSORPTION</text>
          ) : (
            <text x="150" y="450" fontSize="9" fill="hsl(200 60% 55%)" textAnchor="middle" fontWeight="700">CONCENTRATION</text>
          )}
        </g>
      )}

      {/* Clinical highlight — outer medulla shading for ATN risk */}
      {clinHighlight && isJuxta && (
        <g>
          <rect x="0" y={cortexBottom} width="300" height={outerMedBottom - cortexBottom}
            fill="hsl(0 70% 50%)" opacity="0.12" />
          <text x="150" y={cortexBottom + 60} fontSize="7" fill="hsl(0 60% 45%)" textAnchor="middle" fontWeight="600" opacity="0.85">
            outer medulla — most O₂-vulnerable
          </text>
          <text x="150" y={cortexBottom + 72} fontSize="6" fill="hsl(0 55% 45%)" textAnchor="middle" opacity="0.75">
            (ATN, contrast nephropathy)
          </text>
        </g>
      )}
      {clinHighlight && !isJuxta && (
        <text x="150" y="450" fontSize="7" fill="hsl(45 60% 45%)" textAnchor="middle" fontWeight="600">
          DCT/CCD = thiazide & K-sparing diuretic targets
        </text>
      )}
    </svg>
  );
};

export const CorticalJuxtamedullaryDiagram = () => {
  const [highlight, setHighlight] = useState<Feature | null>(null);

  return (
    <div className="space-y-4">
      {/* Feature toggle pills */}
      <div className="flex flex-wrap gap-2">
        {features.map(f => (
          <button
            key={f.id}
            onClick={() => setHighlight(highlight === f.id ? null : f.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              highlight === f.id
                ? "bg-primary/15 border-primary/50 text-primary"
                : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Side-by-side schematics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-foreground">Cortical Nephron</h4>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">~85%</span>
          </div>
          <NephronSchematic variant="cortical" highlight={highlight} />
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-foreground">Juxtamedullary Nephron</h4>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">~15%</span>
          </div>
          <NephronSchematic variant="juxta" highlight={highlight} />
        </div>
      </div>

      {/* Active feature comparison */}
      {highlight ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
            <p className="text-[10px] uppercase tracking-wide text-emerald-500 font-semibold mb-1">Cortical · {features.find(f => f.id === highlight)?.label}</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{features.find(f => f.id === highlight)?.cortical}</p>
          </div>
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
            <p className="text-[10px] uppercase tracking-wide text-blue-500 font-semibold mb-1">Juxtamedullary · {features.find(f => f.id === highlight)?.label}</p>
            <p className="text-sm text-foreground/90 leading-relaxed">{features.find(f => f.id === highlight)?.juxta}</p>
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center">Select a feature above to highlight differences on the diagrams</p>
      )}

      {/* Quick-fact comparison table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-secondary/40">
            <tr>
              <th className="text-left p-2 font-medium text-muted-foreground">Feature</th>
              <th className="text-left p-2 font-medium text-emerald-500">Cortical</th>
              <th className="text-left p-2 font-medium text-blue-500">Juxtamedullary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {stats.map(s => (
              <tr key={s.label}>
                <td className="p-2 font-medium text-foreground">{s.label}</td>
                <td className="p-2 text-foreground/85">{s.cortical}</td>
                <td className="p-2 text-foreground/85">{s.juxta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CorticalJuxtamedullaryDiagram;

import { useState } from "react";

type SegmentId = "glomerulus" | "pct" | "desc-loh" | "thin-asc" | "thick-asc" | "dct" | "ccd" | "mcd" | "afferent" | "efferent" | "macula" | "vasa-recta";

interface Segment {
  id: SegmentId;
  label: string;
  category: "filtration" | "reabsorption" | "secretion" | "vascular";
  info: string;
  transport: string;
}

const segments: Segment[] = [
  { id: "afferent", label: "Afferent Arteriole", category: "vascular", info: "Delivers blood to glomerulus. Dilated by prostaglandins (blocked by NSAIDs → ↓GFR). Myogenic autoregulation maintains flow over MAP 80–180 mmHg.", transport: "PGE₂/PGI₂ → vasodilation" },
  { id: "efferent", label: "Efferent Arteriole", category: "vascular", info: "Exits glomerulus. Constricted by angiotensin II → maintains GFR when perfusion pressure drops. ACE inhibitors dilate efferent → ↓GFR (protective in diabetic nephropathy).", transport: "ANG II → vasoconstriction" },
  { id: "glomerulus", label: "Glomerulus", category: "filtration", info: "GFR ≈ 125 ml/min (180 L/day). Barrier: fenestrated endothelium + GBM + podocyte slits. Filters molecules <70 kDa. Net filtration pressure ≈ 15 mmHg = (Pgc 50 − Pbc 10) − (πgc 25 − πbc 0).", transport: "Ultrafiltration (size + charge selective)" },
  { id: "pct", label: "Proximal Convoluted Tubule", category: "reabsorption", info: "Reabsorbs 65–70% Na⁺/H₂O, ALL glucose (SGLT2, Tm 375 mg/min), amino acids, 85% HCO₃⁻ (via carbonic anhydrase + Na⁺/H⁺ exchanger). Isotonic reabsorption. Na⁺/K⁺-ATPase on basolateral membrane drives all transport.", transport: "SGLT2, NHE3, Na⁺/K⁺-ATPase" },
  { id: "desc-loh", label: "Descending Limb (thin)", category: "reabsorption", info: "Highly permeable to water via AQP1, impermeable to solutes. Water moves out by osmosis into hypertonic medullary interstitium (up to 1200 mOsm/kg at tip). Tubular fluid becomes progressively concentrated.", transport: "AQP1 (water only)" },
  { id: "thin-asc", label: "Thin Ascending Limb", category: "reabsorption", info: "Impermeable to water. Passive NaCl reabsorption down concentration gradient. Tubular fluid begins to dilute. Part of countercurrent multiplier system.", transport: "Passive NaCl diffusion" },
  { id: "thick-asc", label: "Thick Ascending Limb", category: "reabsorption", info: "NKCC2 cotransporter (Na⁺/K⁺/2Cl⁻) — TARGET OF LOOP DIURETICS (furosemide). Impermeable to water → diluting segment. Generates +8 mV lumen potential → paracellular Mg²⁺/Ca²⁺ reabsorption. Reabsorbs 25% filtered Na⁺.", transport: "NKCC2 (furosemide target)" },
  { id: "macula", label: "Macula Densa", category: "filtration", info: "Specialised cells at DCT-glomerulus junction. Senses tubular [NaCl] → tubuloglomerular feedback (TGF). Low NaCl → renin release from JG cells → RAAS activation. Part of juxtaglomerular apparatus.", transport: "NaCl sensor → TGF + renin" },
  { id: "dct", label: "Distal Convoluted Tubule", category: "reabsorption", info: "NCC (Na⁺/Cl⁻ cotransporter) — TARGET OF THIAZIDE DIURETICS. Reabsorbs 5% filtered Na⁺. Also active Ca²⁺ reabsorption (TRPV5) regulated by PTH. Impermeable to water.", transport: "NCC (thiazide target), TRPV5" },
  { id: "ccd", label: "Cortical Collecting Duct", category: "secretion", info: "Principal cells: ENaC (Na⁺ channel) — aldosterone-sensitive, TARGET OF AMILORIDE/spironolactone. ROMK (K⁺ secretion). Intercalated cells: Type A (H⁺-ATPase → acid secretion), Type B (HCO₃⁻ secretion). ADH → AQP2 insertion.", transport: "ENaC, ROMK, H⁺-ATPase, AQP2" },
  { id: "mcd", label: "Medullary Collecting Duct", category: "reabsorption", info: "Final concentration of urine. ADH-dependent water reabsorption (AQP2). Urea recycling via UT-A1/3 transporters (ADH-sensitive) → maintains medullary gradient. Final urine 50–1200 mOsm/kg.", transport: "AQP2, UT-A1/3 (urea)" },
  { id: "vasa-recta", label: "Vasa Recta", category: "vascular", info: "Peritubular capillaries of juxtamedullary nephrons. Countercurrent exchanger — maintains medullary osmotic gradient without washing it out. Sluggish flow preserves gradient.", transport: "Countercurrent exchange" },
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  filtration: { bg: "bg-blue-500/10", border: "border-blue-500/40", text: "text-blue-400" },
  reabsorption: { bg: "bg-emerald-500/10", border: "border-emerald-500/40", text: "text-emerald-400" },
  secretion: { bg: "bg-amber-500/10", border: "border-amber-500/40", text: "text-amber-400" },
  vascular: { bg: "bg-red-500/10", border: "border-red-500/40", text: "text-red-400" },
};

export const NephronDiagram = () => {
  const [active, setActive] = useState<SegmentId | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const activeSegment = segments.find(s => s.id === active);

  const categories = ["filtration", "reabsorption", "secretion", "vascular"];

  const isVisible = (seg: Segment) => !filter || seg.category === filter;
  const isActive = (id: SegmentId) => active === id;

  return (
    <div className="space-y-4">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(filter === cat ? null : cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize ${
              filter === cat
                ? `${categoryColors[cat].bg} ${categoryColors[cat].border} ${categoryColors[cat].text}`
                : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 500 520" className="w-full" role="img" aria-label="Nephron diagram with filtration and reabsorption annotations">
        {/* Cortex / Medulla zones */}
        <rect x="0" y="0" width="500" height="220" fill="hsl(var(--secondary)/0.15)" rx="8" />
        <rect x="0" y="220" width="500" height="300" fill="hsl(var(--secondary)/0.08)" rx="8" />
        <text x="12" y="20" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.6">CORTEX</text>
        <text x="12" y="238" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.4">OUTER MEDULLA</text>
        <text x="12" y="408" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.3">INNER MEDULLA</text>
        <line x1="0" y1="220" x2="500" y2="220" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="400" x2="500" y2="400" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Afferent arteriole */}
        <path d="M 40 95 Q 60 90 80 85 Q 100 78 115 75" fill="none"
          stroke={isActive("afferent") ? "hsl(0 70% 55%)" : "hsl(0 60% 50%)"}
          strokeWidth={isActive("afferent") ? 4 : 2.5}
          opacity={isVisible(segments[0]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "afferent" ? null : "afferent")} />
        <polygon points="40,92 40,98 30,95" fill="hsl(0 60% 50%)" opacity={isVisible(segments[0]) ? 0.8 : 0.15} />

        {/* Efferent arteriole */}
        <path d="M 165 75 Q 185 68 200 60 Q 215 52 225 55" fill="none"
          stroke={isActive("efferent") ? "hsl(0 50% 45%)" : "hsl(0 40% 40%)"}
          strokeWidth={isActive("efferent") ? 4 : 2.5}
          opacity={isVisible(segments[1]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "efferent" ? null : "efferent")} />

        {/* Bowman's capsule */}
        <ellipse cx="140" cy="85" rx="40" ry="30" fill="none"
          stroke={isActive("glomerulus") ? "hsl(var(--primary))" : "hsl(var(--primary)/0.5)"}
          strokeWidth={isActive("glomerulus") ? 2.5 : 1.5}
          opacity={isVisible(segments[2]) ? 1 : 0.15} />
        {/* Glomerular capillary tuft */}
        <circle cx="133" cy="80" r="8" fill="hsl(0 60% 50%/0.25)" stroke="hsl(0 60% 50%)" strokeWidth="1"
          opacity={isVisible(segments[2]) ? 1 : 0.15} />
        <circle cx="147" cy="80" r="8" fill="hsl(0 60% 50%/0.25)" stroke="hsl(0 60% 50%)" strokeWidth="1"
          opacity={isVisible(segments[2]) ? 1 : 0.15} />
        <circle cx="140" cy="92" r="7" fill="hsl(0 60% 50%/0.25)" stroke="hsl(0 60% 50%)" strokeWidth="1"
          opacity={isVisible(segments[2]) ? 1 : 0.15} />
        {/* Clickable overlay */}
        <ellipse cx="140" cy="85" rx="40" ry="30" fill="transparent"
          className="cursor-pointer" onClick={() => setActive(active === "glomerulus" ? null : "glomerulus")} />

        {/* PCT — convoluted path */}
        <path d="M 178 95 Q 200 100 220 90 Q 245 78 265 88 Q 285 100 300 85 Q 320 68 335 80 Q 350 95 340 115 Q 330 135 310 140"
          fill="none"
          stroke={isActive("pct") ? "hsl(150 60% 45%)" : "hsl(150 50% 40%)"}
          strokeWidth={isActive("pct") ? 5 : 3.5}
          strokeLinecap="round"
          opacity={isVisible(segments[3]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "pct" ? null : "pct")} />
        {/* PCT brush border ticks */}
        {[200, 225, 250, 275, 300, 325].map((x, i) => (
          <line key={`bb-${i}`} x1={x} y1={82 + (i % 2) * 8} x2={x} y2={78 + (i % 2) * 8}
            stroke="hsl(150 50% 40%)" strokeWidth="1" opacity={isVisible(segments[3]) ? 0.5 : 0.1} />
        ))}
        {/* Reabsorption arrows for PCT */}
        {[220, 270, 320].map((x, i) => (
          <g key={`pct-arr-${i}`} opacity={isVisible(segments[3]) ? 0.6 : 0.1}>
            <line x1={x} y1={68} x2={x} y2={55} stroke="hsl(150 50% 55%)" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
            <text x={x} y={50} fontSize="7" fill="hsl(150 50% 55%)" textAnchor="middle">{["Na⁺ H₂O", "Glucose", "HCO₃⁻"][i]}</text>
          </g>
        ))}

        {/* Descending LoH */}
        <path d="M 310 140 Q 305 160 298 200 Q 290 260 285 320 Q 280 380 278 430 Q 276 460 280 480"
          fill="none"
          stroke={isActive("desc-loh") ? "hsl(200 60% 55%)" : "hsl(200 50% 45%)"}
          strokeWidth={isActive("desc-loh") ? 4 : 2.5}
          opacity={isVisible(segments[4]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "desc-loh" ? null : "desc-loh")} />
        {/* Water arrows out */}
        {[200, 300, 400].map((y, i) => (
          <g key={`dloh-${i}`} opacity={isVisible(segments[4]) ? 0.5 : 0.1}>
            <line x1={275} y1={y} x2={260} y2={y} stroke="hsl(200 50% 55%)" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
            <text x={252} y={y + 3} fontSize="7" fill="hsl(200 50% 55%)" textAnchor="end">H₂O</text>
          </g>
        ))}

        {/* Hairpin turn */}
        <path d="M 280 480 Q 290 500 310 480" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2.5" opacity="0.5" />

        {/* Thin ascending limb */}
        <path d="M 310 480 Q 315 440 318 400 Q 320 370 322 340"
          fill="none"
          stroke={isActive("thin-asc") ? "hsl(30 60% 55%)" : "hsl(30 50% 45%)"}
          strokeWidth={isActive("thin-asc") ? 4 : 2.5}
          opacity={isVisible(segments[5]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "thin-asc" ? null : "thin-asc")} />

        {/* Thick ascending limb */}
        <path d="M 322 340 Q 325 300 330 260 Q 335 230 340 200 Q 345 170 350 140 Q 352 120 345 105"
          fill="none"
          stroke={isActive("thick-asc") ? "hsl(30 70% 55%)" : "hsl(30 60% 45%)"}
          strokeWidth={isActive("thick-asc") ? 5 : 3.5}
          strokeLinecap="round"
          opacity={isVisible(segments[6]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "thick-asc" ? null : "thick-asc")} />
        {/* NKCC2 annotation */}
        <g opacity={isVisible(segments[6]) ? 0.6 : 0.1}>
          <line x1={345} y1={250} x2={370} y2={250} stroke="hsl(30 60% 55%)" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
          <text x={375} y={248} fontSize="7" fill="hsl(30 60% 55%)">Na⁺/K⁺/2Cl⁻</text>
          <text x={375} y={258} fontSize="6" fill="hsl(30 50% 55%)" fontStyle="italic">(furosemide ✕)</text>
        </g>

        {/* Macula densa marker */}
        <circle cx="340" cy="108" r="5" fill={isActive("macula") ? "hsl(260 60% 55%/0.4)" : "hsl(260 50% 45%/0.2)"}
          stroke="hsl(260 50% 55%)" strokeWidth="1.5"
          opacity={isVisible(segments[7]) ? 1 : 0.15}
          className="cursor-pointer" onClick={() => setActive(active === "macula" ? null : "macula")} />
        <text x="340" y="98" fontSize="7" fill="hsl(260 50% 55%)" textAnchor="middle"
          opacity={isVisible(segments[7]) ? 0.8 : 0.15}>MD</text>

        {/* DCT */}
        <path d="M 345 105 Q 360 90 380 95 Q 400 102 410 115 Q 420 130 405 145 Q 390 155 380 148"
          fill="none"
          stroke={isActive("dct") ? "hsl(45 70% 50%)" : "hsl(45 60% 40%)"}
          strokeWidth={isActive("dct") ? 5 : 3.5}
          strokeLinecap="round"
          opacity={isVisible(segments[8]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "dct" ? null : "dct")} />
        <g opacity={isVisible(segments[8]) ? 0.6 : 0.1}>
          <line x1={410} y1={108} x2={435} y2={98} stroke="hsl(45 60% 50%)" strokeWidth="1.5" markerEnd="url(#arrowYellow)" />
          <text x={440} y={96} fontSize="7" fill="hsl(45 60% 50%)">Na⁺/Cl⁻</text>
          <text x={440} y={106} fontSize="6" fill="hsl(45 50% 50%)" fontStyle="italic">(thiazide ✕)</text>
        </g>

        {/* Cortical collecting duct */}
        <path d="M 380 148 Q 378 170 376 195 Q 375 210 374 225"
          fill="none"
          stroke={isActive("ccd") ? "hsl(270 60% 55%)" : "hsl(270 50% 45%)"}
          strokeWidth={isActive("ccd") ? 5 : 3.5}
          strokeDasharray="8 3"
          opacity={isVisible(segments[9]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "ccd" ? null : "ccd")} />
        <g opacity={isVisible(segments[9]) ? 0.6 : 0.1}>
          <line x1={390} y1={180} x2={420} y2={175} stroke="hsl(270 50% 55%)" strokeWidth="1.5" />
          <text x={425} y={172} fontSize="7" fill="hsl(270 50% 55%)">ENaC (aldosterone)</text>
          <text x={425} y={182} fontSize="7" fill="hsl(270 50% 55%)">AQP2 (ADH)</text>
        </g>

        {/* Medullary collecting duct */}
        <path d="M 374 225 Q 372 280 370 340 Q 368 400 366 450 Q 365 470 365 490"
          fill="none"
          stroke={isActive("mcd") ? "hsl(270 60% 55%)" : "hsl(270 40% 40%)"}
          strokeWidth={isActive("mcd") ? 5 : 3.5}
          strokeDasharray="8 3"
          opacity={isVisible(segments[10]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "mcd" ? null : "mcd")} />
        <g opacity={isVisible(segments[10]) ? 0.5 : 0.1}>
          <line x1={380} y1={440} x2={410} y2={435} stroke="hsl(270 40% 50%)" strokeWidth="1.5" />
          <text x={415} y={432} fontSize="7" fill="hsl(270 40% 50%)">Urea recycling</text>
          <text x={415} y={442} fontSize="7" fill="hsl(270 40% 50%)">H₂O (ADH)</text>
        </g>

        {/* Urine output */}
        <polygon points="365,495 360,505 370,505" fill="hsl(var(--muted-foreground))" opacity="0.6" />
        <text x="365" y="515" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">→ Urine</text>

        {/* Vasa recta (countercurrent exchanger) */}
        <path d="M 230 60 Q 225 120 220 200 Q 215 300 210 400 Q 208 450 215 480 Q 222 450 228 400 Q 235 300 240 200 Q 245 120 248 60"
          fill="none"
          stroke={isActive("vasa-recta") ? "hsl(0 50% 50%)" : "hsl(0 40% 40%)"}
          strokeWidth={isActive("vasa-recta") ? 3 : 1.5}
          strokeDasharray="5 3"
          opacity={isVisible(segments[11]) ? 0.6 : 0.1}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "vasa-recta" ? null : "vasa-recta")} />
        <text x="218" y="510" fontSize="7" fill="hsl(0 40% 50%)" textAnchor="middle"
          opacity={isVisible(segments[11]) ? 0.5 : 0.1}>Vasa recta</text>

        {/* Osmolality gradient markers */}
        {[
          { y: 190, osm: "300" },
          { y: 310, osm: "600" },
          { y: 430, osm: "900" },
          { y: 490, osm: "1200" },
        ].map(m => (
          <text key={m.y} x="488" y={m.y} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.4">
            {m.osm}
          </text>
        ))}
        <text x="488" y="170" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.3">mOsm/kg</text>

        {/* Arrow marker definitions */}
        <defs>
          <marker id="arrowGreen" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(150 50% 55%)" />
          </marker>
          <marker id="arrowBlue" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(200 50% 55%)" />
          </marker>
          <marker id="arrowOrange" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(30 60% 55%)" />
          </marker>
          <marker id="arrowYellow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(45 60% 50%)" />
          </marker>
        </defs>

        {/* Segment labels */}
        {[
          { id: "glomerulus" as SegmentId, x: 140, y: 50, label: "Glomerulus" },
          { id: "pct" as SegmentId, x: 270, y: 62, label: "PCT" },
          { id: "desc-loh" as SegmentId, x: 258, y: 330, label: "Desc. LoH" },
          { id: "thin-asc" as SegmentId, x: 340, y: 430, label: "Thin Asc." },
          { id: "thick-asc" as SegmentId, x: 360, y: 270, label: "Thick Asc." },
          { id: "dct" as SegmentId, x: 395, y: 78, label: "DCT" },
          { id: "ccd" as SegmentId, x: 395, y: 200, label: "CCD" },
          { id: "mcd" as SegmentId, x: 390, y: 370, label: "MCD" },
        ].map(lbl => {
          const seg = segments.find(s => s.id === lbl.id)!;
          return (
            <g key={lbl.id} onClick={() => setActive(active === lbl.id ? null : lbl.id)}
              className="cursor-pointer" opacity={isVisible(seg) ? 1 : 0.15}>
              <rect x={lbl.x - 24} y={lbl.y - 8} width="48" height="16" rx="4"
                fill={isActive(lbl.id) ? "hsl(var(--primary)/0.25)" : "hsl(var(--secondary)/0.6)"}
                stroke={isActive(lbl.id) ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth="1" />
              <text x={lbl.x} y={lbl.y + 3} fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
                {lbl.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Info panel */}
      {activeSegment ? (
        <div className={`rounded-lg border p-4 animate-fade-in ${categoryColors[activeSegment.category].bg} ${categoryColors[activeSegment.category].border}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">{activeSegment.label}</p>
            <span className={`text-xs font-medium capitalize ${categoryColors[activeSegment.category].text}`}>
              {activeSegment.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{activeSegment.info}</p>
          <p className="text-xs text-muted-foreground mt-2 font-medium">
            Key transporters: <span className="text-foreground/80">{activeSegment.transport}</span>
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center">Click any nephron segment to explore its function, transporters, and drug targets</p>
      )}
    </div>
  );
};

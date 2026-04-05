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
  { id: "afferent", label: "Afferent Arteriole", category: "vascular", info: "Delivers blood to glomerulus. Dilated by prostaglandins (PGE₂/PGI₂ — blocked by NSAIDs → ↓GFR). Myogenic autoregulation + tubuloglomerular feedback maintain constant GFR over MAP 80–180 mmHg. Constricted by sympathetic stimulation and angiotensin II (but less than efferent).", transport: "PGE₂/PGI₂ → vasodilation; sympathetic → constriction" },
  { id: "efferent", label: "Efferent Arteriole", category: "vascular", info: "Exits glomerulus. Preferentially constricted by angiotensin II → maintains GFR when perfusion pressure drops (↑filtration fraction). ACE inhibitors dilate efferent → ↓GFR and ↓filtration fraction (protective in diabetic nephropathy by ↓intraglomerular pressure). Gives rise to peritubular capillaries (cortical) or vasa recta (juxtamedullary).", transport: "ANG II → vasoconstriction (ACEi target)" },
  { id: "glomerulus", label: "Glomerulus", category: "filtration", info: "GFR ≈ 125 mL/min (180 L/day). Three-layer barrier: fenestrated endothelium (70–100 nm pores), glomerular basement membrane (type IV collagen + heparan sulphate — negative charge barrier), podocyte foot processes with slit diaphragms (nephrin protein — 25–60 nm). Filters molecules <70 kDa and negatively charged proteins are repelled. Net filtration pressure ≈ 15 mmHg = (P_GC 50 − P_BC 10) − (π_GC 25 − π_BC 0). Mesangial cells contract (ANG II) to ↓surface area and ↓GFR.", transport: "Ultrafiltration (size + charge selective)" },
  { id: "pct", label: "Proximal Convoluted Tubule", category: "reabsorption", info: "Reabsorbs 65–70% Na⁺/H₂O (isotonic), ALL glucose (SGLT2 apical + GLUT2 basolateral, Tm 375 mg/min → glycosuria above this), ALL amino acids, 85% HCO₃⁻ (carbonic anhydrase II/IV + NHE3 Na⁺/H⁺ exchanger → acetazolamide target), 65% K⁺, 50% urea (solvent drag). Brush border (microvilli) ↑surface area ×40. Abundant mitochondria power basolateral Na⁺/K⁺-ATPase which drives all secondary active transport. Also secretes: organic acids (PAH — basis of RPF measurement), drugs (penicillin, furosemide), creatinine.", transport: "SGLT2, NHE3, Na⁺/K⁺-ATPase, CA II/IV" },
  { id: "desc-loh", label: "Descending Limb (thin)", category: "reabsorption", info: "Highly permeable to water via AQP1 (constitutive — not ADH-dependent), impermeable to solutes. Water moves out by osmosis into hypertonic medullary interstitium (300→1200 mOsm/kg at papilla tip). Tubular fluid becomes progressively concentrated. Thin epithelium with few mitochondria (passive transport only). Part of countercurrent multiplier — descending limb concentrates fluid that ascending limb then dilutes.", transport: "AQP1 (water only — constitutive)" },
  { id: "thin-asc", label: "Thin Ascending Limb", category: "reabsorption", info: "Impermeable to water (no aquaporins). Passive NaCl reabsorption down concentration gradient (tubular fluid hypertonic from descending limb). Tubular fluid begins to dilute. Thin flat epithelium. Part of countercurrent multiplier — passive component adds to interstitial tonicity.", transport: "Passive NaCl diffusion" },
  { id: "thick-asc", label: "Thick Ascending Limb", category: "reabsorption", info: "NKCC2 cotransporter (Na⁺/K⁺/2Cl⁻) on apical membrane — PRIMARY TARGET OF LOOP DIURETICS (furosemide, bumetanide). Impermeable to water → 'diluting segment'. Reabsorbs 25% filtered Na⁺. K⁺ recycling via apical ROMK generates +8 mV lumen-positive transepithelial potential → drives paracellular reabsorption of Ca²⁺ and Mg²⁺ (loop diuretics → hypocalcaemia, hypomagnesaemia). Tall cuboidal epithelium, abundant mitochondria. Bartter syndrome = genetic NKCC2 dysfunction.", transport: "NKCC2 (furosemide target), ROMK" },
  { id: "macula", label: "Macula Densa", category: "filtration", info: "Specialised plaque of cells at TAL-DCT junction, adjacent to glomerulus. Part of juxtaglomerular apparatus (JGA) with JG cells (modified smooth muscle in afferent arteriole wall — contain renin granules) and extraglomerular mesangial cells. Senses tubular [NaCl] via apical NKCC2: ↓NaCl → adenosine ↓ → afferent dilation + renin release → ↑GFR (tubuloglomerular feedback). ↑NaCl → adenosine ↑ → afferent constriction → ↓GFR. This feedback loop stabilises SNGFR.", transport: "NaCl sensor → TGF + RAAS activation" },
  { id: "dct", label: "Distal Convoluted Tubule", category: "reabsorption", info: "NCC (Na⁺/Cl⁻ cotransporter) on apical membrane — TARGET OF THIAZIDE DIURETICS (bendroflumethiazide, hydrochlorothiazide). Reabsorbs 5% filtered Na⁺. Also: active transcellular Ca²⁺ reabsorption via apical TRPV5 channel → calbindin → basolateral NCX/PMCA, stimulated by PTH and calcitriol. Thiazides → ↑Ca²⁺ reabsorption (used in hypercalciuria/stones). Gitelman syndrome = genetic NCC dysfunction (metabolic alkalosis, hypokalaemia, hypomagnesaemia).", transport: "NCC (thiazide target), TRPV5 (Ca²⁺)" },
  { id: "ccd", label: "Cortical Collecting Duct", category: "secretion", info: "Two cell types: PRINCIPAL cells — apical ENaC (Na⁺ channel, aldosterone-sensitive → amiloride/triamterene/spironolactone targets) and ROMK (K⁺ secretion channel — aldosterone ↑expression). Aldosterone binds intracellular MR → ↑ENaC, ↑ROMK, ↑Na⁺/K⁺-ATPase. Liddle syndrome = gain-of-function ENaC. INTERCALATED cells: Type A (α) — apical H⁺-ATPase and H⁺/K⁺-ATPase → acid secretion, basolateral AE1 (Cl⁻/HCO₃⁻ exchanger); Type B (β) — apical pendrin (Cl⁻/HCO₃⁻) → alkali secretion. ADH → AQP2 insertion into apical membrane (V2 receptor → cAMP → exocytosis of AQP2 vesicles). Basolateral AQP3/4 always present.", transport: "ENaC, ROMK, H⁺-ATPase, AQP2 (ADH)" },
  { id: "mcd", label: "Medullary Collecting Duct", category: "reabsorption", info: "Final concentration of urine. ADH-dependent water reabsorption (AQP2 apical, AQP3/4 basolateral). Urea recycling via UT-A1 (apical, ADH-sensitive) and UT-A3 (basolateral) → urea moves into medullary interstitium → contributes ~50% of inner medullary osmolality → essential for concentrating ability. Without ADH: dilute urine (50 mOsm/kg). Maximum ADH: concentrated urine (1200 mOsm/kg). Also secretes H⁺ via intercalated cells. Diabetes insipidus: central (↓ADH) or nephrogenic (V2R/AQP2 mutations, lithium).", transport: "AQP2/3/4, UT-A1/3 (urea recycling)" },
  { id: "vasa-recta", label: "Vasa Recta", category: "vascular", info: "Specialised peritubular capillaries of juxtamedullary nephrons. Descending vasa recta (DVR): continuous endothelium with UT-B urea transporter and AQP1. Ascending vasa recta (AVR): fenestrated endothelium. Functions as countercurrent EXCHANGER (not multiplier): sluggish flow allows equilibration with interstitium without washing out medullary gradient. Descending limb loses water, gains solute; ascending limb gains water, loses solute. Net effect: O₂/nutrients delivered, gradient preserved. Medullary blood flow only 5-10% of total RBF.", transport: "Countercurrent exchange (AQP1, UT-B)" },
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

      <svg viewBox="0 0 500 540" className="w-full" role="img" aria-label="Nephron diagram">
        {/* Cortex / Medulla zone gradient backgrounds */}
        <defs>
          <linearGradient id="medGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(30, 50%, 50%)" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="cortexGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.12" />
          </linearGradient>
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

        <rect x="0" y="0" width="500" height="220" fill="url(#cortexGrad)" rx="8" />
        <rect x="0" y="220" width="500" height="320" fill="url(#medGrad)" rx="8" />
        <text x="12" y="20" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.6">CORTEX</text>
        <text x="12" y="238" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.4">OUTER MEDULLA</text>
        <text x="12" y="408" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.3">INNER MEDULLA</text>
        <line x1="0" y1="220" x2="500" y2="220" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="400" x2="500" y2="400" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Afferent arteriole — with smooth muscle cells */}
        <path d="M 40 95 Q 60 90 80 85 Q 100 78 115 75" fill="none"
          stroke={isActive("afferent") ? "hsl(0 70% 55%)" : "hsl(0 60% 50%)"}
          strokeWidth={isActive("afferent") ? 4.5 : 3}
          opacity={isVisible(segments[0]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "afferent" ? null : "afferent")} />
        {/* Smooth muscle cell bumps on afferent */}
        {[60, 75, 90].map((x, i) => (
          <circle key={`aff-sm-${i}`} cx={x} cy={92 - i * 3} r={2.5}
            fill="hsl(0 60% 50%)" fillOpacity={isActive("afferent") ? 0.4 : 0.2}
            stroke="hsl(0 60% 50%)" strokeWidth="0.5"
            opacity={isVisible(segments[0]) ? 1 : 0.15} />
        ))}
        <polygon points="40,92 40,98 30,95" fill="hsl(0 60% 50%)" opacity={isVisible(segments[0]) ? 0.8 : 0.15} />

        {/* JG cells (renin granules) on afferent near glomerulus */}
        {[105, 112].map((x, i) => (
          <g key={`jg-${i}`} opacity={isVisible(segments[0]) || isVisible(segments[7]) ? 0.7 : 0.1}>
            <circle cx={x} cy={76 - i} r={3.5} fill="hsl(260 50% 55%)" fillOpacity="0.25"
              stroke="hsl(260 50% 55%)" strokeWidth="0.8" />
            {/* Renin granules inside */}
            <circle cx={x - 1} cy={76 - i - 1} r={0.8} fill="hsl(260 50% 55%)" fillOpacity="0.6" />
            <circle cx={x + 1} cy={76 - i + 0.5} r={0.8} fill="hsl(260 50% 55%)" fillOpacity="0.6" />
          </g>
        ))}
        <text x="95" y="68" fontSize="5" fill="hsl(260 50% 55%)" opacity={isVisible(segments[0]) ? 0.6 : 0.1}>JG cells</text>

        {/* Efferent arteriole */}
        <path d="M 165 75 Q 185 68 200 60 Q 215 52 225 55" fill="none"
          stroke={isActive("efferent") ? "hsl(0 50% 45%)" : "hsl(0 40% 40%)"}
          strokeWidth={isActive("efferent") ? 4 : 2.5}
          opacity={isVisible(segments[1]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "efferent" ? null : "efferent")} />

        {/* Bowman's capsule — double-walled */}
        <ellipse cx="140" cy="85" rx="42" ry="32" fill="none"
          stroke={isActive("glomerulus") ? "hsl(var(--primary))" : "hsl(var(--primary)/0.5)"}
          strokeWidth={isActive("glomerulus") ? 2.5 : 1.5}
          opacity={isVisible(segments[2]) ? 1 : 0.15} />
        <ellipse cx="140" cy="85" rx="38" ry="28" fill="none"
          stroke={isActive("glomerulus") ? "hsl(var(--primary)/0.5)" : "hsl(var(--primary)/0.25)"}
          strokeWidth="0.8" strokeDasharray="2 2"
          opacity={isVisible(segments[2]) ? 0.6 : 0.1} />
        {/* Bowman's space label */}
        <text x="110" y="60" fontSize="5" fill="hsl(var(--primary))" opacity={isVisible(segments[2]) ? 0.5 : 0.1}>Bowman's space</text>

        {/* Glomerular capillary tuft — more loops */}
        {[
          { cx: 128, cy: 77, r: 8 },
          { cx: 145, cy: 75, r: 9 },
          { cx: 152, cy: 87, r: 7 },
          { cx: 135, cy: 92, r: 7 },
          { cx: 140, cy: 82, r: 6 },
        ].map((c, i) => (
          <circle key={`glom-${i}`} cx={c.cx} cy={c.cy} r={c.r}
            fill="hsl(0 60% 50%/0.2)" stroke="hsl(0 60% 50%)" strokeWidth="0.8"
            opacity={isVisible(segments[2]) ? 1 : 0.15} />
        ))}
        {/* Podocyte foot processes — small zigzag marks around glomerulus */}
        {isActive("glomerulus") && (
          <g opacity="0.5">
            {[65, 80, 95, 110, 125, 140, 155, 170, 185, 200].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const r1 = 30;
              const r2 = 34;
              const x1 = 140 + r1 * Math.cos(rad);
              const y1 = 85 + r1 * 0.76 * Math.sin(rad);
              const x2 = 140 + r2 * Math.cos(rad);
              const y2 = 85 + r2 * 0.76 * Math.sin(rad);
              return (
                <line key={`pod-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(var(--primary))" strokeWidth="1.2" />
              );
            })}
            <text x="175" y="110" fontSize="4.5" fill="hsl(var(--primary))">Podocyte foot processes</text>
          </g>
        )}
        {/* Clickable overlay */}
        <ellipse cx="140" cy="85" rx="42" ry="32" fill="transparent"
          className="cursor-pointer" onClick={() => setActive(active === "glomerulus" ? null : "glomerulus")} />

        {/* GFR annotation */}
        <text x="140" y="125" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="600"
          opacity={isVisible(segments[2]) ? 0.6 : 0.1}>GFR ≈ 125 mL/min</text>

        {/* PCT — convoluted path with brush border */}
        <path d="M 178 95 Q 200 100 220 90 Q 245 78 265 88 Q 285 100 300 85 Q 320 68 335 80 Q 350 95 340 115 Q 330 135 310 140"
          fill="none"
          stroke={isActive("pct") ? "hsl(150 60% 45%)" : "hsl(150 50% 40%)"}
          strokeWidth={isActive("pct") ? 5 : 3.5}
          strokeLinecap="round"
          opacity={isVisible(segments[3]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "pct" ? null : "pct")} />
        {/* Brush border ticks — more realistic microvilli */}
        {[195, 208, 222, 238, 252, 265, 278, 292, 305, 318, 332].map((x, i) => {
          const yBase = 78 + (Math.sin(i * 0.8) * 10);
          return (
            <g key={`bb-${i}`} opacity={isVisible(segments[3]) ? 0.45 : 0.08}>
              <line x1={x - 1.5} y1={yBase} x2={x - 1.5} y2={yBase - 4} stroke="hsl(150 50% 40%)" strokeWidth="0.7" />
              <line x1={x} y1={yBase} x2={x} y2={yBase - 5} stroke="hsl(150 50% 40%)" strokeWidth="0.7" />
              <line x1={x + 1.5} y1={yBase} x2={x + 1.5} y2={yBase - 4} stroke="hsl(150 50% 40%)" strokeWidth="0.7" />
            </g>
          );
        })}
        {/* Mitochondria symbols along PCT */}
        {isActive("pct") && [220, 270, 310].map((x, i) => (
          <g key={`mito-${i}`} opacity="0.5">
            <ellipse cx={x} cy={100 + (i % 2) * 6} rx={4} ry={2.5} fill="none"
              stroke="hsl(150 40% 55%)" strokeWidth="0.8" />
            <path d={`M${x - 2},${100 + (i % 2) * 6} Q${x},${98 + (i % 2) * 6} ${x + 2},${100 + (i % 2) * 6}`}
              fill="none" stroke="hsl(150 40% 55%)" strokeWidth="0.5" />
          </g>
        ))}
        {/* Reabsorption arrows for PCT */}
        {[220, 270, 320].map((x, i) => (
          <g key={`pct-arr-${i}`} opacity={isVisible(segments[3]) ? 0.6 : 0.1}>
            <line x1={x} y1={68} x2={x} y2={55} stroke="hsl(150 50% 55%)" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
            <text x={x} y={50} fontSize="7" fill="hsl(150 50% 55%)" textAnchor="middle">{["Na⁺ H₂O", "Glucose", "HCO₃⁻"][i]}</text>
          </g>
        ))}
        {/* Secretion arrows into PCT */}
        {isActive("pct") && (
          <g opacity="0.5">
            <line x1={250} y1={108} x2={250} y2={98} stroke="hsl(45 60% 55%)" strokeWidth="1.2" />
            <text x={250} y={115} fontSize="5.5" fill="hsl(45 60% 55%)" textAnchor="middle">PAH, drugs ↑</text>
          </g>
        )}

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
        {/* AQP1 label */}
        {isActive("desc-loh") && (
          <text x="265" y="250" fontSize="5.5" fill="hsl(200 50% 55%)" textAnchor="end" opacity="0.7">AQP1</text>
        )}

        {/* Hairpin turn */}
        <path d="M 280 480 Q 290 500 310 480" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2.5" opacity="0.5" />

        {/* Thin ascending limb */}
        <path d="M 310 480 Q 315 440 318 400 Q 320 370 322 340"
          fill="none"
          stroke={isActive("thin-asc") ? "hsl(30 60% 55%)" : "hsl(30 50% 45%)"}
          strokeWidth={isActive("thin-asc") ? 4 : 2.5}
          opacity={isVisible(segments[5]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "thin-asc" ? null : "thin-asc")} />

        {/* Thick ascending limb — thicker to show tall epithelium */}
        <path d="M 322 340 Q 325 300 330 260 Q 335 230 340 200 Q 345 170 350 140 Q 352 120 345 105"
          fill="none"
          stroke={isActive("thick-asc") ? "hsl(30 70% 55%)" : "hsl(30 60% 45%)"}
          strokeWidth={isActive("thick-asc") ? 6 : 4}
          strokeLinecap="round"
          opacity={isVisible(segments[6]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "thick-asc" ? null : "thick-asc")} />
        {/* NKCC2 annotation */}
        <g opacity={isVisible(segments[6]) ? 0.6 : 0.1}>
          <line x1={345} y1={250} x2={370} y2={250} stroke="hsl(30 60% 55%)" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
          <text x={375} y={248} fontSize="7" fill="hsl(30 60% 55%)">Na⁺/K⁺/2Cl⁻</text>
          <text x={375} y={258} fontSize="6" fill="hsl(30 50% 55%)" fontStyle="italic">(furosemide ✕)</text>
        </g>
        {/* Paracellular Ca²⁺/Mg²⁺ */}
        {isActive("thick-asc") && (
          <g opacity="0.5">
            <line x1={345} y1={280} x2={370} y2={280} stroke="hsl(30 60% 55%)" strokeWidth="1" />
            <text x={375} y={282} fontSize="5.5" fill="hsl(30 50% 55%)">Ca²⁺, Mg²⁺ (paracellular)</text>
            <text x={375} y={292} fontSize="5" fill="hsl(30 40% 50%)">+8 mV lumen potential</text>
          </g>
        )}

        {/* Macula densa marker — larger with detail */}
        <g className="cursor-pointer" onClick={() => setActive(active === "macula" ? null : "macula")}>
          <rect x="330" y="98" width="24" height="14" rx="4"
            fill={isActive("macula") ? "hsl(260 60% 55%/0.3)" : "hsl(260 50% 45%/0.15)"}
            stroke="hsl(260 50% 55%)" strokeWidth="1.5"
            opacity={isVisible(segments[7]) ? 1 : 0.15} />
          {/* Dense cell nuclei */}
          {[336, 342, 348].map((x, i) => (
            <circle key={`md-${i}`} cx={x} cy={105} r={2}
              fill="hsl(260 50% 55%)" fillOpacity={isActive("macula") ? 0.5 : 0.3}
              opacity={isVisible(segments[7]) ? 1 : 0.15} />
          ))}
        </g>
        <text x="340" y="94" fontSize="6.5" fill="hsl(260 50% 55%)" textAnchor="middle"
          opacity={isVisible(segments[7]) ? 0.8 : 0.15} fontWeight="600">MD</text>
        {/* Line connecting MD to glomerulus — TGF */}
        <path d="M 340 98 Q 300 60 170 85" fill="none"
          stroke="hsl(260 50% 55%)" strokeWidth="0.6" strokeDasharray="3 3"
          opacity={isActive("macula") ? 0.5 : 0.1} />
        {isActive("macula") && (
          <text x="250" y="72" fontSize="5" fill="hsl(260 50% 55%)" textAnchor="middle" opacity="0.6">TGF → glomerulus</text>
        )}

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
        {/* Ca²⁺ reabsorption in DCT */}
        {isActive("dct") && (
          <g opacity="0.5">
            <line x1={410} y1={128} x2={435} y2={122} stroke="hsl(45 60% 50%)" strokeWidth="1" />
            <text x={440} y={122} fontSize="5.5" fill="hsl(45 50% 50%)">Ca²⁺ (TRPV5, PTH↑)</text>
          </g>
        )}

        {/* Cortical collecting duct */}
        <path d="M 380 148 Q 378 170 376 195 Q 375 210 374 225"
          fill="none"
          stroke={isActive("ccd") ? "hsl(270 60% 55%)" : "hsl(270 50% 45%)"}
          strokeWidth={isActive("ccd") ? 5 : 3.5}
          strokeDasharray="8 3"
          opacity={isVisible(segments[9]) ? 1 : 0.15}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "ccd" ? null : "ccd")} />
        {/* Principal + intercalated cell icons */}
        {isActive("ccd") && (
          <g opacity="0.6">
            <rect x="385" y="160" width="70" height="50" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.8" />
            <text x="420" y="170" textAnchor="middle" fontSize="5" fill="hsl(var(--foreground))" fontWeight="600">Cell types:</text>
            <circle cx="395" cy="182" r="3" fill="hsl(270 50% 55%)" fillOpacity="0.4" stroke="hsl(270 50% 55%)" strokeWidth="0.8" />
            <text x="402" y="184" fontSize="5" fill="hsl(270 50% 55%)">Principal (ENaC, ROMK)</text>
            <circle cx="395" cy="196" r="3" fill="hsl(0 50% 55%)" fillOpacity="0.4" stroke="hsl(0 50% 55%)" strokeWidth="0.8" />
            <text x="402" y="198" fontSize="5" fill="hsl(0 50% 55%)">Intercalated (H⁺-ATPase)</text>
          </g>
        )}
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
        {/* Urea recycling arrow to interstitium */}
        {isActive("mcd") && (
          <g opacity="0.4">
            <path d="M 360 460 Q 340 470 320 460 Q 300 450 290 440" fill="none"
              stroke="hsl(30 50% 55%)" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="310" y="455" fontSize="5" fill="hsl(30 50% 55%)" textAnchor="middle">Urea → interstitium</text>
            <text x="310" y="463" fontSize="4.5" fill="hsl(30 40% 50%)" textAnchor="middle">(UT-A1, ADH-sensitive)</text>
          </g>
        )}

        {/* Urine output */}
        <polygon points="365,495 360,505 370,505" fill="hsl(var(--muted-foreground))" opacity="0.6" />
        <text x="365" y="520" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">→ Urine</text>
        <text x="365" y="532" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.5">50–1200 mOsm/kg</text>

        {/* Vasa recta (countercurrent exchanger) — double limb */}
        <path d="M 230 60 Q 225 120 220 200 Q 215 300 210 400 Q 208 450 215 480"
          fill="none"
          stroke={isActive("vasa-recta") ? "hsl(0 55% 55%)" : "hsl(0 45% 45%)"}
          strokeWidth={isActive("vasa-recta") ? 3 : 1.5}
          opacity={isVisible(segments[11]) ? 0.6 : 0.1}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "vasa-recta" ? null : "vasa-recta")} />
        <path d="M 215 480 Q 222 450 228 400 Q 235 300 240 200 Q 245 120 248 60"
          fill="none"
          stroke={isActive("vasa-recta") ? "hsl(220 45% 55%)" : "hsl(220 35% 45%)"}
          strokeWidth={isActive("vasa-recta") ? 3 : 1.5}
          opacity={isVisible(segments[11]) ? 0.6 : 0.1}
          className="cursor-pointer transition-all" onClick={() => setActive(active === "vasa-recta" ? null : "vasa-recta")} />
        {/* DVR/AVR labels */}
        {isActive("vasa-recta") && (
          <g opacity="0.5">
            <text x="205" y="300" fontSize="5" fill="hsl(0 45% 55%)" transform="rotate(-85, 205, 300)">DVR ↓</text>
            <text x="250" y="300" fontSize="5" fill="hsl(220 45% 55%)" transform="rotate(85, 250, 300)">AVR ↑</text>
          </g>
        )}
        <text x="218" y="515" fontSize="7" fill="hsl(0 40% 50%)" textAnchor="middle"
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

export default NephronDiagram;

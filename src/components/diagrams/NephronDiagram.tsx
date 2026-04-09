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

// Helper: generate a parallel offset path for hollow tube effect
const tubePaths = {
  pctOuter: "M 178 90 Q 200 95 220 85 Q 245 73 265 83 Q 285 95 300 80 Q 320 63 335 75 Q 350 90 340 110 Q 330 130 310 135",
  pctInner: "M 178 100 Q 200 105 220 95 Q 245 83 265 93 Q 285 105 300 90 Q 320 73 335 85 Q 350 100 340 120 Q 330 140 310 145",
  pctLumen: "M 178 95 Q 200 100 220 90 Q 245 78 265 88 Q 285 100 300 85 Q 320 68 335 80 Q 350 95 340 115 Q 330 135 310 140",
  descOuter: "M 305 140 Q 300 160 293 200 Q 285 260 280 320 Q 275 380 273 430 Q 271 460 275 485",
  descInner: "M 315 140 Q 310 160 303 200 Q 295 260 290 320 Q 285 380 283 430 Q 281 460 285 485",
  descLumen: "M 310 140 Q 305 160 298 200 Q 290 260 285 320 Q 280 380 278 430 Q 276 460 280 485",
  thinAscOuter: "M 305 485 Q 308 445 311 405 Q 313 375 315 345",
  thinAscInner: "M 315 485 Q 318 445 321 405 Q 323 375 325 345",
  thinAscLumen: "M 310 485 Q 313 445 316 405 Q 318 375 320 345",
  thickAscOuter: "M 314 345 Q 317 305 322 265 Q 327 235 332 205 Q 337 175 342 145 Q 344 125 337 108",
  thickAscInner: "M 326 345 Q 329 305 334 265 Q 339 235 344 205 Q 349 175 354 145 Q 356 125 349 108",
  thickAscLumen: "M 320 345 Q 323 305 328 265 Q 333 235 338 205 Q 343 175 348 145 Q 350 125 343 108",
  dctOuter: "M 337 108 Q 355 88 375 90 Q 398 95 410 110 Q 422 128 408 145 Q 393 158 378 148",
  dctInner: "M 349 108 Q 365 92 385 98 Q 405 108 415 122 Q 425 138 412 150 Q 398 160 388 152",
  dctLumen: "M 343 108 Q 360 90 380 94 Q 401 101 412 116 Q 423 133 410 148 Q 396 159 383 150",
  ccdOuter: "M 378 148 Q 375 170 373 195 Q 372 210 371 228",
  ccdInner: "M 388 152 Q 386 172 384 197 Q 383 212 382 228",
  ccdLumen: "M 383 150 Q 381 171 379 196 Q 378 211 377 228",
  mcdOuter: "M 371 228 Q 369 280 367 340 Q 365 400 363 450 Q 362 475 362 495",
  mcdInner: "M 382 228 Q 380 280 378 340 Q 376 400 374 450 Q 373 475 373 495",
  mcdLumen: "M 377 228 Q 375 280 373 340 Q 371 400 369 450 Q 368 475 368 495",
};

// Vasa recta paths — wrapping closely around the loop of Henle
const vasaRectaPaths = {
  dvrOuter: "M 225 58 Q 218 120 212 200 Q 206 300 200 400 Q 197 450 204 488",
  dvrInner: "M 232 58 Q 225 120 219 200 Q 213 300 207 400 Q 204 450 211 488",
  avrOuter: "M 211 488 Q 218 450 224 400 Q 231 300 237 200 Q 243 120 250 58",
  avrInner: "M 204 488 Q 211 450 217 400 Q 224 300 230 200 Q 236 120 243 58",
  // Additional capillary branches wrapping around the hairpin
  branchDvr1: "M 212 260 Q 240 270 260 280 Q 272 290 275 300",
  branchDvr2: "M 206 370 Q 230 380 255 390 Q 270 400 273 410",
  branchDvr3: "M 200 440 Q 230 450 260 460 Q 275 465 278 470",
  branchAvr1: "M 290 300 Q 310 295 325 290 Q 335 285 337 280",
  branchAvr2: "M 290 410 Q 310 405 325 395 Q 335 385 337 378",
  branchAvr3: "M 285 470 Q 310 465 325 455 Q 335 445 340 440",
};

export const NephronDiagram = () => {
  const [active, setActive] = useState<SegmentId | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const activeSegment = segments.find(s => s.id === active);

  const categories = ["filtration", "reabsorption", "secretion", "vascular"];

  const isVisible = (seg: Segment) => !filter || seg.category === filter;
  const isActive = (id: SegmentId) => active === id;

  const seg = (id: SegmentId) => segments.find(s => s.id === id)!;

  // Hollow tube renderer
  const HollowTube = ({ id, outerPath, innerPath, lumenPath, color, activeColor, wallWidth = 1.2, lumenColor, onClick }: {
    id: SegmentId; outerPath: string; innerPath: string; lumenPath?: string;
    color: string; activeColor: string; wallWidth?: number;
    lumenColor?: string; onClick: () => void;
  }) => {
    const s = seg(id);
    const vis = isVisible(s);
    const act = isActive(id);
    const strokeColor = act ? activeColor : color;
    return (
      <g opacity={vis ? 1 : 0.12} className="cursor-pointer transition-all" onClick={onClick}>
        {/* Lumen fill */}
        {lumenPath && (
          <path d={`${outerPath} L ${innerPath.split(' ').slice(-2).join(' ')} ${innerPath.split(' ').reverse().map((v, i, a) => {
            // We can't easily reverse a Q path, so use a filled area approach
            return v;
          }).join(' ')}`}
            fill="none" />
        )}
        {/* Outer wall */}
        <path d={outerPath} fill="none" stroke={strokeColor} strokeWidth={act ? wallWidth + 0.6 : wallWidth} strokeLinecap="round" />
        {/* Inner wall */}
        <path d={innerPath} fill="none" stroke={strokeColor} strokeWidth={act ? wallWidth + 0.6 : wallWidth} strokeLinecap="round" />
        {/* Lumen highlight — semi-transparent fill along center */}
        {lumenPath && (
          <path d={lumenPath} fill="none"
            stroke={lumenColor || strokeColor} strokeWidth={act ? 5 : 3}
            strokeLinecap="round" opacity={0.08} />
        )}
        {/* Invisible thick click target */}
        <path d={lumenPath || outerPath} fill="none" stroke="transparent" strokeWidth="16" className="cursor-pointer" onClick={onClick} />
      </g>
    );
  };

  const toggle = (id: SegmentId) => () => setActive(active === id ? null : id);

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

      <svg viewBox="0 0 520 560" className="w-full" role="img" aria-label="Nephron diagram with hollow tubules and vasa recta">
        <defs>
          <linearGradient id="medGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(30, 50%, 50%)" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="cortexGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="lumenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(45 80% 65%)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(45 60% 45%)" stopOpacity="0.05" />
          </linearGradient>
          {/* Arterial blood gradient for vasa recta */}
          <linearGradient id="dvrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 65% 55%)" />
            <stop offset="100%" stopColor="hsl(0 50% 40%)" />
          </linearGradient>
          <linearGradient id="avrGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="hsl(220 50% 40%)" />
            <stop offset="100%" stopColor="hsl(220 45% 55%)" />
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
          <marker id="arrowRed" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
            <path d="M0,0 L5,2 L0,4" fill="hsl(0 55% 50%)" />
          </marker>
          <marker id="arrowPurple" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
            <path d="M0,0 L5,2 L0,4" fill="hsl(220 45% 55%)" />
          </marker>
          {/* Epithelial cell pattern for brush border */}
          <pattern id="brushBorder" patternUnits="userSpaceOnUse" width="3" height="6" patternTransform="rotate(0)">
            <line x1="1.5" y1="6" x2="1.5" y2="2" stroke="hsl(150 50% 40%)" strokeWidth="0.5" opacity="0.4" />
          </pattern>
        </defs>

        {/* Background zones */}
        <rect x="0" y="0" width="520" height="220" fill="url(#cortexGrad)" rx="8" />
        <rect x="0" y="220" width="520" height="340" fill="url(#medGrad)" rx="8" />
        <text x="12" y="20" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.6">CORTEX</text>
        <text x="12" y="238" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.4">OUTER MEDULLA</text>
        <text x="12" y="415" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.3">INNER MEDULLA</text>
        <line x1="0" y1="220" x2="520" y2="220" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="400" x2="520" y2="400" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* ========== VASA RECTA — drawn first so tubules overlay ========== */}
        <g opacity={isVisible(seg("vasa-recta")) ? (isActive("vasa-recta") ? 1 : 0.55) : 0.08}
           className="cursor-pointer" onClick={toggle("vasa-recta")}>
          {/* DVR — descending (arterial, red) */}
          <path d={vasaRectaPaths.dvrOuter} fill="none" stroke="url(#dvrGrad)"
            strokeWidth={isActive("vasa-recta") ? 2.2 : 1.2} strokeLinecap="round" />
          <path d={vasaRectaPaths.dvrInner} fill="none" stroke="url(#dvrGrad)"
            strokeWidth={isActive("vasa-recta") ? 2.2 : 1.2} strokeLinecap="round" />
          {/* DVR lumen */}
          <path d="M 228 58 Q 221 120 215 200 Q 209 300 203 400 Q 200 450 207 488" fill="none"
            stroke="hsl(0 60% 55%)" strokeWidth="4" opacity="0.06" strokeLinecap="round" />

          {/* AVR — ascending (venous, blue) */}
          <path d={vasaRectaPaths.avrOuter} fill="none" stroke="url(#avrGrad)"
            strokeWidth={isActive("vasa-recta") ? 2.2 : 1.2} strokeLinecap="round" />
          <path d={vasaRectaPaths.avrInner} fill="none" stroke="url(#avrGrad)"
            strokeWidth={isActive("vasa-recta") ? 2.2 : 1.2} strokeLinecap="round" />
          {/* AVR lumen */}
          <path d="M 207 488 Q 214 450 220 400 Q 227 300 233 200 Q 239 120 246 58" fill="none"
            stroke="hsl(220 45% 55%)" strokeWidth="4" opacity="0.06" strokeLinecap="round" />

          {/* Peritubular capillary branches wrapping around LoH */}
          {[vasaRectaPaths.branchDvr1, vasaRectaPaths.branchDvr2, vasaRectaPaths.branchDvr3].map((p, i) => (
            <path key={`bdvr-${i}`} d={p} fill="none" stroke="hsl(0 50% 50%)"
              strokeWidth={isActive("vasa-recta") ? 1.4 : 0.7} strokeDasharray="3 2" opacity={isActive("vasa-recta") ? 0.6 : 0.3} />
          ))}
          {[vasaRectaPaths.branchAvr1, vasaRectaPaths.branchAvr2, vasaRectaPaths.branchAvr3].map((p, i) => (
            <path key={`bavr-${i}`} d={p} fill="none" stroke="hsl(220 40% 50%)"
              strokeWidth={isActive("vasa-recta") ? 1.4 : 0.7} strokeDasharray="3 2" opacity={isActive("vasa-recta") ? 0.6 : 0.3} />
          ))}

          {/* Fenestrations on AVR */}
          {isActive("vasa-recta") && [160, 250, 340, 420].map((y, i) => {
            const x = 237 - (y - 58) * 0.014;
            return (
              <g key={`fen-${i}`} opacity="0.5">
                <circle cx={x + 5} cy={y} r="1.2" fill="none" stroke="hsl(220 45% 55%)" strokeWidth="0.6" />
                <circle cx={x + 5} cy={y + 8} r="1.2" fill="none" stroke="hsl(220 45% 55%)" strokeWidth="0.6" />
              </g>
            );
          })}

          {/* Invisible click target */}
          <path d="M 228 58 Q 221 120 215 200 Q 209 300 203 400 Q 200 450 207 488 Q 214 450 220 400 Q 227 300 233 200 Q 239 120 246 58"
            fill="transparent" stroke="transparent" strokeWidth="20" />

          {/* Direction arrows */}
          {[150, 300, 420].map(y => (
            <g key={`dvr-arr-${y}`}>
              <polygon points={`${218 - (y-58)*0.011},${y-4} ${218 - (y-58)*0.011},${y+4} ${214 - (y-58)*0.011},${y}`}
                fill="hsl(0 55% 50%)" opacity={isActive("vasa-recta") ? 0.5 : 0.2} />
            </g>
          ))}
          {[150, 300, 420].map(y => (
            <g key={`avr-arr-${y}`}>
              <polygon points={`${237 - (y-58)*0.014 + 6},${y+4} ${237 - (y-58)*0.014 + 6},${y-4} ${241 - (y-58)*0.014 + 6},${y}`}
                fill="hsl(220 45% 55%)" opacity={isActive("vasa-recta") ? 0.5 : 0.2} />
            </g>
          ))}

          {/* Exchange arrows between DVR/AVR */}
          {isActive("vasa-recta") && [200, 330, 430].map((y, i) => (
            <g key={`exch-${i}`} opacity="0.4">
              <line x1={220} y1={y} x2={230} y2={y} stroke="hsl(200 50% 60%)" strokeWidth="0.8" />
              <text x={225} y={y - 4} fontSize="4" fill="hsl(200 50% 60%)" textAnchor="middle">
                {["H₂O→", "NaCl←", "urea←"][i]}
              </text>
            </g>
          ))}
        </g>
        <text x="218" y="535" fontSize="7.5" fill="hsl(0 40% 50%)" textAnchor="middle"
          opacity={isVisible(seg("vasa-recta")) ? 0.6 : 0.1} fontWeight="600">Vasa recta</text>
        {isActive("vasa-recta") && (
          <g opacity="0.5">
            <text x="200" y="548" fontSize="5.5" fill="hsl(0 45% 55%)">DVR ↓ (arterial)</text>
            <text x="200" y="556" fontSize="5.5" fill="hsl(220 45% 55%)">AVR ↑ (venous)</text>
          </g>
        )}

        {/* ========== AFFERENT ARTERIOLE ========== */}
        <g opacity={isVisible(seg("afferent")) ? 1 : 0.12} className="cursor-pointer" onClick={toggle("afferent")}>
          {/* Hollow vessel walls */}
          <path d="M 40 90 Q 60 85 80 80 Q 100 73 115 70" fill="none"
            stroke={isActive("afferent") ? "hsl(0 70% 55%)" : "hsl(0 60% 50%)"}
            strokeWidth={isActive("afferent") ? 1.8 : 1.2} />
          <path d="M 40 100 Q 60 95 80 90 Q 100 83 115 80" fill="none"
            stroke={isActive("afferent") ? "hsl(0 70% 55%)" : "hsl(0 60% 50%)"}
            strokeWidth={isActive("afferent") ? 1.8 : 1.2} />
          {/* Lumen fill */}
          <path d="M 40 95 Q 60 90 80 85 Q 100 78 115 75" fill="none"
            stroke="hsl(0 60% 50%)" strokeWidth="6" opacity="0.08" strokeLinecap="round" />
          {/* Smooth muscle bumps */}
          {[55, 70, 85, 100].map((x, i) => (
            <ellipse key={`aff-sm-${i}`} cx={x} cy={87 - i * 2.5} rx={3} ry={2}
              fill="hsl(0 50% 50%)" fillOpacity={isActive("afferent") ? 0.3 : 0.15}
              stroke="hsl(0 60% 50%)" strokeWidth="0.5" />
          ))}
          {/* Flow arrow */}
          <polygon points="42,92 42,98 32,95" fill="hsl(0 60% 50%)" opacity="0.7" />
          {/* Click target */}
          <path d="M 40 95 Q 60 90 80 85 Q 100 78 115 75" fill="none" stroke="transparent" strokeWidth="18" />
        </g>

        {/* JG cells */}
        {[105, 112].map((x, i) => (
          <g key={`jg-${i}`} opacity={isVisible(seg("afferent")) ? 0.7 : 0.1}>
            <circle cx={x} cy={76 - i} r={4} fill="hsl(260 50% 55%)" fillOpacity="0.2"
              stroke="hsl(260 50% 55%)" strokeWidth="0.8" />
            <circle cx={x - 1} cy={76 - i - 1} r={0.9} fill="hsl(260 50% 55%)" fillOpacity="0.6" />
            <circle cx={x + 1} cy={76 - i + 0.5} r={0.9} fill="hsl(260 50% 55%)" fillOpacity="0.6" />
          </g>
        ))}
        <text x="98" y="65" fontSize="5" fill="hsl(260 50% 55%)" opacity={isVisible(seg("afferent")) ? 0.6 : 0.1}>JG cells</text>

        {/* ========== EFFERENT ARTERIOLE ========== */}
        <g opacity={isVisible(seg("efferent")) ? 1 : 0.12} className="cursor-pointer" onClick={toggle("efferent")}>
          <path d="M 165 70 Q 185 63 200 55 Q 215 47 225 50" fill="none"
            stroke={isActive("efferent") ? "hsl(0 50% 48%)" : "hsl(0 40% 40%)"}
            strokeWidth={isActive("efferent") ? 1.6 : 1} />
          <path d="M 165 80 Q 185 73 200 65 Q 215 57 225 60" fill="none"
            stroke={isActive("efferent") ? "hsl(0 50% 48%)" : "hsl(0 40% 40%)"}
            strokeWidth={isActive("efferent") ? 1.6 : 1} />
          <path d="M 165 75 Q 185 68 200 60 Q 215 52 225 55" fill="none"
            stroke="hsl(0 40% 40%)" strokeWidth="5" opacity="0.06" strokeLinecap="round" />
          <path d="M 165 75 Q 185 68 200 60 Q 215 52 225 55" fill="none" stroke="transparent" strokeWidth="18" />
        </g>

        {/* ========== BOWMAN'S CAPSULE + GLOMERULUS ========== */}
        <g opacity={isVisible(seg("glomerulus")) ? 1 : 0.12} className="cursor-pointer" onClick={toggle("glomerulus")}>
          {/* Bowman's capsule — double wall */}
          <ellipse cx="140" cy="85" rx="44" ry="34" fill="none"
            stroke={isActive("glomerulus") ? "hsl(var(--primary))" : "hsl(var(--primary)/0.5)"}
            strokeWidth={isActive("glomerulus") ? 2.5 : 1.5} />
          <ellipse cx="140" cy="85" rx="40" ry="30" fill="none"
            stroke={isActive("glomerulus") ? "hsl(var(--primary)/0.6)" : "hsl(var(--primary)/0.25)"}
            strokeWidth="1" />
          {/* Bowman's space — faint fill between walls */}
          <ellipse cx="140" cy="85" rx="42" ry="32" fill="hsl(var(--primary))" fillOpacity="0.03" />
          <text x="112" y="58" fontSize="5" fill="hsl(var(--primary))" opacity={0.5}>Bowman's space</text>

          {/* Glomerular capillary tuft — more realistic loops */}
          {[
            "M 125 72 Q 120 80 128 85 Q 135 90 130 95",
            "M 135 70 Q 130 78 138 82 Q 145 87 140 93",
            "M 145 72 Q 140 80 148 84 Q 155 88 150 94",
            "M 155 75 Q 150 82 155 88 Q 160 92 155 96",
            "M 130 78 Q 138 75 145 78 Q 150 82 145 87",
          ].map((d, i) => (
            <path key={`glom-loop-${i}`} d={d} fill="none"
              stroke="hsl(0 60% 50%)" strokeWidth="2.5" strokeLinecap="round"
              opacity={isActive("glomerulus") ? 0.7 : 0.5} />
          ))}
          {/* Capillary lumens */}
          {[
            "M 125 72 Q 120 80 128 85 Q 135 90 130 95",
            "M 135 70 Q 130 78 138 82 Q 145 87 140 93",
            "M 145 72 Q 140 80 148 84 Q 155 88 150 94",
          ].map((d, i) => (
            <path key={`glom-lumen-${i}`} d={d} fill="none"
              stroke="hsl(0 55% 55%)" strokeWidth="1.2" strokeLinecap="round" opacity="0.15" />
          ))}
          {/* Mesangial cells */}
          {isActive("glomerulus") && [
            { cx: 137, cy: 83 }, { cx: 143, cy: 88 }, { cx: 133, cy: 90 },
          ].map((c, i) => (
            <g key={`mes-${i}`} opacity="0.4">
              <polygon points={`${c.cx-2},${c.cy} ${c.cx},${c.cy-2} ${c.cx+2},${c.cy} ${c.cx},${c.cy+2}`}
                fill="hsl(30 50% 55%)" />
            </g>
          ))}
          {/* Podocyte foot processes when active */}
          {isActive("glomerulus") && (
            <g opacity="0.4">
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 22.5 + 45) * Math.PI / 180;
                const r1 = 31;
                const r2 = 36;
                const x1 = 140 + r1 * Math.cos(angle);
                const y1 = 85 + r1 * 0.76 * Math.sin(angle);
                const x2 = 140 + r2 * Math.cos(angle);
                const y2 = 85 + r2 * 0.76 * Math.sin(angle);
                return <line key={`pod-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(var(--primary))" strokeWidth="0.8" />;
              })}
              <text x="178" y="112" fontSize="4.5" fill="hsl(var(--primary))">Podocyte foot processes</text>
            </g>
          )}
          {/* Click target */}
          <ellipse cx="140" cy="85" rx="44" ry="34" fill="transparent" />
        </g>
        <text x="140" y="128" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="600"
          opacity={isVisible(seg("glomerulus")) ? 0.6 : 0.1}>GFR ≈ 125 mL/min</text>

        {/* ========== PCT — HOLLOW TUBE WITH BRUSH BORDER ========== */}
        <HollowTube id="pct" outerPath={tubePaths.pctOuter} innerPath={tubePaths.pctInner}
          lumenPath={tubePaths.pctLumen}
          color="hsl(150 50% 40%)" activeColor="hsl(150 60% 45%)" wallWidth={1.3}
          lumenColor="hsl(150 50% 45%)" onClick={toggle("pct")} />
        {/* Brush border microvilli on outer wall */}
        {[190, 205, 220, 238, 255, 270, 285, 300, 315, 330].map((x, i) => {
          const yBase = 74 + Math.sin(i * 0.85) * 8;
          return (
            <g key={`bb-${i}`} opacity={isVisible(seg("pct")) ? (isActive("pct") ? 0.6 : 0.35) : 0.06}>
              {[-2, -0.7, 0.7, 2].map((dx, j) => (
                <line key={j} x1={x + dx} y1={yBase} x2={x + dx} y2={yBase - 4.5}
                  stroke="hsl(150 50% 40%)" strokeWidth="0.5" />
              ))}
            </g>
          );
        })}
        {/* Mitochondria along PCT when active */}
        {isActive("pct") && [215, 260, 305].map((x, i) => (
          <g key={`mito-pct-${i}`} opacity="0.4">
            <ellipse cx={x} cy={102 + (i % 2) * 5} rx={4.5} ry={2.2} fill="none"
              stroke="hsl(150 40% 55%)" strokeWidth="0.8" />
            <path d={`M${x - 2},${102 + (i % 2) * 5} Q${x},${100 + (i % 2) * 5} ${x + 2},${102 + (i % 2) * 5}`}
              fill="none" stroke="hsl(150 40% 55%)" strokeWidth="0.5" />
          </g>
        ))}
        {/* Reabsorption arrows */}
        {[220, 270, 320].map((x, i) => (
          <g key={`pct-arr-${i}`} opacity={isVisible(seg("pct")) ? 0.6 : 0.1}>
            <line x1={x} y1={65} x2={x} y2={50} stroke="hsl(150 50% 55%)" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
            <text x={x} y={46} fontSize="7" fill="hsl(150 50% 55%)" textAnchor="middle">{["Na⁺ H₂O", "Glucose", "HCO₃⁻"][i]}</text>
          </g>
        ))}
        {isActive("pct") && (
          <g opacity="0.45">
            <line x1={250} y1={112} x2={250} y2={102} stroke="hsl(45 60% 55%)" strokeWidth="1.2" />
            <text x={250} y={118} fontSize="5.5" fill="hsl(45 60% 55%)" textAnchor="middle">PAH, drugs ↑</text>
          </g>
        )}

        {/* ========== DESCENDING LIMB — THIN HOLLOW TUBE ========== */}
        <HollowTube id="desc-loh" outerPath={tubePaths.descOuter} innerPath={tubePaths.descInner}
          lumenPath={tubePaths.descLumen}
          color="hsl(200 50% 45%)" activeColor="hsl(200 60% 55%)" wallWidth={0.8}
          lumenColor="hsl(200 50% 50%)" onClick={toggle("desc-loh")} />
        {/* Water arrows out */}
        {[200, 300, 400, 450].map((y, i) => (
          <g key={`dloh-${i}`} opacity={isVisible(seg("desc-loh")) ? 0.5 : 0.1}>
            <line x1={270} y1={y} x2={255} y2={y} stroke="hsl(200 50% 55%)" strokeWidth="1.5" markerEnd="url(#arrowBlue)" />
            <text x={248} y={y + 3} fontSize="7" fill="hsl(200 50% 55%)" textAnchor="end">H₂O</text>
          </g>
        ))}
        {isActive("desc-loh") && (
          <text x="260" y="250" fontSize="5.5" fill="hsl(200 50% 55%)" textAnchor="end" opacity="0.7">AQP1</text>
        )}

        {/* ========== HAIRPIN TURN ========== */}
        <path d="M 275 485 Q 280 505 295 510 Q 310 505 315 485" fill="none"
          stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.4" />
        {/* Outer wall of hairpin */}
        <path d="M 271 485 Q 275 510 295 516 Q 315 510 319 485" fill="none"
          stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.25" />

        {/* ========== THIN ASCENDING LIMB — THIN HOLLOW TUBE ========== */}
        <HollowTube id="thin-asc" outerPath={tubePaths.thinAscOuter} innerPath={tubePaths.thinAscInner}
          lumenPath={tubePaths.thinAscLumen}
          color="hsl(30 50% 45%)" activeColor="hsl(30 60% 55%)" wallWidth={0.8}
          lumenColor="hsl(30 50% 50%)" onClick={toggle("thin-asc")} />

        {/* ========== THICK ASCENDING LIMB — THICKER HOLLOW TUBE ========== */}
        <HollowTube id="thick-asc" outerPath={tubePaths.thickAscOuter} innerPath={tubePaths.thickAscInner}
          lumenPath={tubePaths.thickAscLumen}
          color="hsl(30 60% 45%)" activeColor="hsl(30 70% 55%)" wallWidth={1.4}
          lumenColor="hsl(30 60% 50%)" onClick={toggle("thick-asc")} />
        {/* Tall epithelial cells shown as small rectangles along thick ascending when active */}
        {isActive("thick-asc") && [260, 290, 320].map((y, i) => {
          const x = 328 + (345 - y) * 0.025;
          return (
            <g key={`tal-cell-${i}`} opacity="0.35">
              <rect x={x - 2} y={y - 3} width="4" height="6" rx="1"
                fill="hsl(30 60% 50%)" fillOpacity="0.3" stroke="hsl(30 60% 50%)" strokeWidth="0.5" />
              <circle cx={x} cy={y} r="1" fill="hsl(30 50% 40%)" />
            </g>
          );
        })}
        {/* NKCC2 annotation */}
        <g opacity={isVisible(seg("thick-asc")) ? 0.6 : 0.1}>
          <line x1={350} y1={255} x2={380} y2={255} stroke="hsl(30 60% 55%)" strokeWidth="1.5" markerEnd="url(#arrowOrange)" />
          <text x={385} y={252} fontSize="7" fill="hsl(30 60% 55%)">Na⁺/K⁺/2Cl⁻</text>
          <text x={385} y={262} fontSize="6" fill="hsl(30 50% 55%)" fontStyle="italic">(furosemide ✕)</text>
        </g>
        {isActive("thick-asc") && (
          <g opacity="0.5">
            <line x1={350} y1={285} x2={380} y2={285} stroke="hsl(30 60% 55%)" strokeWidth="1" />
            <text x={385} y={283} fontSize="5.5" fill="hsl(30 50% 55%)">Ca²⁺, Mg²⁺ (paracellular)</text>
            <text x={385} y={293} fontSize="5" fill="hsl(30 40% 50%)">+8 mV lumen potential</text>
          </g>
        )}

        {/* ========== MACULA DENSA ========== */}
        <g className="cursor-pointer" onClick={toggle("macula")}
          opacity={isVisible(seg("macula")) ? 1 : 0.12}>
          <rect x="330" y="100" width="26" height="14" rx="4"
            fill={isActive("macula") ? "hsl(260 60% 55%/0.3)" : "hsl(260 50% 45%/0.15)"}
            stroke="hsl(260 50% 55%)" strokeWidth="1.5" />
          {[336, 343, 350].map((x, i) => (
            <circle key={`md-${i}`} cx={x} cy={107} r={2.2}
              fill="hsl(260 50% 55%)" fillOpacity={isActive("macula") ? 0.5 : 0.3} />
          ))}
        </g>
        <text x="343" y="96" fontSize="6.5" fill="hsl(260 50% 55%)" textAnchor="middle"
          opacity={isVisible(seg("macula")) ? 0.8 : 0.12} fontWeight="600">MD</text>
        <path d="M 340 100 Q 300 60 170 85" fill="none"
          stroke="hsl(260 50% 55%)" strokeWidth="0.6" strokeDasharray="3 3"
          opacity={isActive("macula") ? 0.5 : 0.08} />
        {isActive("macula") && (
          <text x="250" y="72" fontSize="5" fill="hsl(260 50% 55%)" textAnchor="middle" opacity="0.6">TGF → glomerulus</text>
        )}

        {/* ========== DCT — HOLLOW TUBE ========== */}
        <HollowTube id="dct" outerPath={tubePaths.dctOuter} innerPath={tubePaths.dctInner}
          lumenPath={tubePaths.dctLumen}
          color="hsl(45 60% 40%)" activeColor="hsl(45 70% 50%)" wallWidth={1.2}
          lumenColor="hsl(45 60% 45%)" onClick={toggle("dct")} />
        <g opacity={isVisible(seg("dct")) ? 0.6 : 0.1}>
          <line x1={418} y1={112} x2={445} y2={102} stroke="hsl(45 60% 50%)" strokeWidth="1.5" markerEnd="url(#arrowYellow)" />
          <text x={450} y={100} fontSize="7" fill="hsl(45 60% 50%)">Na⁺/Cl⁻</text>
          <text x={450} y={110} fontSize="6" fill="hsl(45 50% 50%)" fontStyle="italic">(thiazide ✕)</text>
        </g>
        {isActive("dct") && (
          <g opacity="0.5">
            <line x1={418} y1={132} x2={445} y2={126} stroke="hsl(45 60% 50%)" strokeWidth="1" />
            <text x={450} y={126} fontSize="5.5" fill="hsl(45 50% 50%)">Ca²⁺ (TRPV5, PTH↑)</text>
          </g>
        )}

        {/* ========== CCD — HOLLOW TUBE, DASHED WALLS ========== */}
        <g opacity={isVisible(seg("ccd")) ? 1 : 0.12} className="cursor-pointer" onClick={toggle("ccd")}>
          <path d={tubePaths.ccdOuter} fill="none"
            stroke={isActive("ccd") ? "hsl(270 60% 55%)" : "hsl(270 50% 45%)"}
            strokeWidth={isActive("ccd") ? 1.6 : 1} strokeDasharray="6 2" />
          <path d={tubePaths.ccdInner} fill="none"
            stroke={isActive("ccd") ? "hsl(270 60% 55%)" : "hsl(270 50% 45%)"}
            strokeWidth={isActive("ccd") ? 1.6 : 1} strokeDasharray="6 2" />
          <path d={tubePaths.ccdLumen} fill="none" stroke="hsl(270 50% 50%)" strokeWidth="4" opacity="0.06" />
          <path d={tubePaths.ccdLumen} fill="none" stroke="transparent" strokeWidth="16" />
        </g>
        {isActive("ccd") && (
          <g opacity="0.6">
            <rect x="395" y="160" width="75" height="55" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.8" />
            <text x="432" y="172" textAnchor="middle" fontSize="5.5" fill="hsl(var(--foreground))" fontWeight="600">Cell types:</text>
            <circle cx="403" cy="184" r="3" fill="hsl(270 50% 55%)" fillOpacity="0.4" stroke="hsl(270 50% 55%)" strokeWidth="0.8" />
            <text x="410" y="186" fontSize="5" fill="hsl(270 50% 55%)">Principal (ENaC, ROMK)</text>
            <circle cx="403" cy="200" r="3" fill="hsl(0 50% 55%)" fillOpacity="0.4" stroke="hsl(0 50% 55%)" strokeWidth="0.8" />
            <text x="410" y="202" fontSize="5" fill="hsl(0 50% 55%)">Intercalated (H⁺-ATPase)</text>
          </g>
        )}
        <g opacity={isVisible(seg("ccd")) ? 0.6 : 0.1}>
          <line x1={395} y1={185} x2={425} y2={180} stroke="hsl(270 50% 55%)" strokeWidth="1.5" />
          <text x={430} y={178} fontSize="7" fill="hsl(270 50% 55%)">ENaC (aldosterone)</text>
          <text x={430} y={188} fontSize="7" fill="hsl(270 50% 55%)">AQP2 (ADH)</text>
        </g>

        {/* ========== MCD — HOLLOW TUBE, DASHED WALLS ========== */}
        <g opacity={isVisible(seg("mcd")) ? 1 : 0.12} className="cursor-pointer" onClick={toggle("mcd")}>
          <path d={tubePaths.mcdOuter} fill="none"
            stroke={isActive("mcd") ? "hsl(270 60% 55%)" : "hsl(270 40% 40%)"}
            strokeWidth={isActive("mcd") ? 1.6 : 1} strokeDasharray="6 2" />
          <path d={tubePaths.mcdInner} fill="none"
            stroke={isActive("mcd") ? "hsl(270 60% 55%)" : "hsl(270 40% 40%)"}
            strokeWidth={isActive("mcd") ? 1.6 : 1} strokeDasharray="6 2" />
          <path d={tubePaths.mcdLumen} fill="none" stroke="hsl(270 40% 45%)" strokeWidth="4" opacity="0.06" />
          <path d={tubePaths.mcdLumen} fill="none" stroke="transparent" strokeWidth="16" />
        </g>
        <g opacity={isVisible(seg("mcd")) ? 0.5 : 0.1}>
          <line x1={385} y1={445} x2={420} y2={440} stroke="hsl(270 40% 50%)" strokeWidth="1.5" />
          <text x={425} y={438} fontSize="7" fill="hsl(270 40% 50%)">Urea recycling</text>
          <text x={425} y={448} fontSize="7" fill="hsl(270 40% 50%)">H₂O (ADH)</text>
        </g>
        {isActive("mcd") && (
          <g opacity="0.4">
            <path d="M 365 465 Q 345 475 325 465 Q 305 455 295 445" fill="none"
              stroke="hsl(30 50% 55%)" strokeWidth="1.2" strokeDasharray="3 2" />
            <text x="320" y="460" fontSize="5" fill="hsl(30 50% 55%)" textAnchor="middle">Urea → interstitium</text>
            <text x="320" y="468" fontSize="4.5" fill="hsl(30 40% 50%)" textAnchor="middle">(UT-A1, ADH-sensitive)</text>
          </g>
        )}

        {/* Urine output */}
        <polygon points="368,500 363,510 373,510" fill="hsl(var(--muted-foreground))" opacity="0.6" />
        <text x="368" y="525" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">→ Urine</text>
        <text x="368" y="537" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.5">50–1200 mOsm/kg</text>

        {/* ========== OSMOLALITY GRADIENT ========== */}
        {[
          { y: 195, osm: "300" },
          { y: 310, osm: "600" },
          { y: 430, osm: "900" },
          { y: 500, osm: "1200" },
        ].map(m => (
          <text key={m.y} x="508" y={m.y} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.4">
            {m.osm}
          </text>
        ))}
        <text x="508" y="175" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.3">mOsm/kg</text>

        {/* ========== SEGMENT LABELS ========== */}
        {[
          { id: "glomerulus" as SegmentId, x: 140, y: 47, label: "Glomerulus" },
          { id: "pct" as SegmentId, x: 268, y: 58, label: "PCT" },
          { id: "desc-loh" as SegmentId, x: 258, y: 335, label: "Desc. LoH" },
          { id: "thin-asc" as SegmentId, x: 345, y: 435, label: "Thin Asc." },
          { id: "thick-asc" as SegmentId, x: 370, y: 275, label: "Thick Asc." },
          { id: "dct" as SegmentId, x: 400, y: 78, label: "DCT" },
          { id: "ccd" as SegmentId, x: 405, y: 205, label: "CCD" },
          { id: "mcd" as SegmentId, x: 400, y: 375, label: "MCD" },
        ].map(lbl => {
          const s = seg(lbl.id);
          return (
            <g key={lbl.id} onClick={toggle(lbl.id)}
              className="cursor-pointer" opacity={isVisible(s) ? 1 : 0.12}>
              <rect x={lbl.x - 26} y={lbl.y - 9} width="52" height="17" rx="4"
                fill={isActive(lbl.id) ? "hsl(var(--primary)/0.25)" : "hsl(var(--secondary)/0.6)"}
                stroke={isActive(lbl.id) ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth="1" />
              <text x={lbl.x} y={lbl.y + 3} fontSize="7.5" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
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

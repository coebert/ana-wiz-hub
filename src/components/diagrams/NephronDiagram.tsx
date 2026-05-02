import { useState } from "react";

type SegmentId = "glomerulus" | "pct" | "desc-loh" | "thin-asc" | "thick-asc" | "dct" | "ccd" | "mcd" | "afferent" | "efferent" | "macula" | "vasa-recta" | "peritubular";

interface Segment {
  id: SegmentId;
  label: string;
  category: "filtration" | "reabsorption" | "secretion" | "vascular";
  zone: "cortex" | "outer-medulla" | "inner-medulla" | "spans";
  info: string;
  transport: string;
}

const segments: Segment[] = [
  { id: "afferent", label: "Afferent Arteriole", category: "vascular", zone: "cortex", info: "Delivers blood from interlobular artery to glomerulus. Dilated by prostaglandins (PGE₂/PGI₂ — blocked by NSAIDs → ↓GFR). Myogenic autoregulation + tubuloglomerular feedback maintain constant GFR over MAP 80–180 mmHg. Constricted by sympathetic stimulation and angiotensin II (but less than efferent).", transport: "PGE₂/PGI₂ → vasodilation; sympathetic → constriction" },
  { id: "efferent", label: "Efferent Arteriole", category: "vascular", zone: "cortex", info: "Exits glomerulus. Preferentially constricted by angiotensin II → maintains GFR when perfusion pressure drops (↑filtration fraction). ACE inhibitors dilate efferent → ↓GFR (renoprotective in diabetic nephropathy). In cortical nephrons gives rise to peritubular capillaries; in juxtamedullary nephrons gives rise to vasa recta that descend into the medulla.", transport: "ANG II → vasoconstriction (ACEi target)" },
  { id: "glomerulus", label: "Glomerulus", category: "filtration", zone: "cortex", info: "Lies in the renal cortex. GFR ≈ 125 mL/min (180 L/day). Three-layer barrier: fenestrated endothelium (70–100 nm pores), glomerular basement membrane (type IV collagen + heparan sulphate — negative charge barrier), podocyte foot processes with slit diaphragms (nephrin — 25–60 nm). Filters molecules <70 kDa; negatively charged proteins repelled. Net filtration pressure ≈ 15 mmHg = (P_GC 50 − P_BC 10) − (π_GC 25 − π_BC 0). Mesangial cells contract (ANG II) to ↓Kf.", transport: "Ultrafiltration (size + charge selective)" },
  { id: "pct", label: "Proximal Convoluted Tubule", category: "reabsorption", zone: "cortex", info: "Entirely cortical. Reabsorbs 65–70% Na⁺/H₂O (isotonic), ALL glucose (SGLT2 apical + GLUT2 basolateral, Tm 375 mg/min), ALL amino acids, 85% HCO₃⁻ (CA II/IV + NHE3 — acetazolamide target), 65% K⁺. Brush border ↑surface area ×40. Abundant mitochondria power basolateral Na⁺/K⁺-ATPase. Secretes organic acids (PAH — basis of RPF), drugs (penicillin, furosemide), creatinine. The straight portion (pars recta) descends into the outer medulla.", transport: "SGLT2, NHE3, Na⁺/K⁺-ATPase, CA II/IV" },
  { id: "desc-loh", label: "Descending Limb (thin)", category: "reabsorption", zone: "spans", info: "Descends from cortex through outer medulla into inner medulla. Highly permeable to water via AQP1 (constitutive — not ADH-dependent), impermeable to solutes. Water moves out by osmosis into hypertonic medullary interstitium (300→1200 mOsm/kg at papilla tip). Tubular fluid becomes progressively concentrated. Thin epithelium with few mitochondria.", transport: "AQP1 (water only — constitutive)" },
  { id: "thin-asc", label: "Thin Ascending Limb", category: "reabsorption", zone: "inner-medulla", info: "Inner medullary segment (only present in juxtamedullary nephrons with long loops). Impermeable to water (no aquaporins). Passive NaCl reabsorption down concentration gradient. Tubular fluid begins to dilute. Thin flat epithelium — passive component of countercurrent multiplier.", transport: "Passive NaCl diffusion" },
  { id: "thick-asc", label: "Thick Ascending Limb", category: "reabsorption", zone: "outer-medulla", info: "Outer medullary segment, ascends back to cortex. NKCC2 (Na⁺/K⁺/2Cl⁻) on apical membrane — PRIMARY TARGET OF LOOP DIURETICS. Impermeable to water → 'diluting segment'. Reabsorbs 25% filtered Na⁺. K⁺ recycling via apical ROMK generates +8 mV lumen-positive transepithelial potential → drives paracellular Ca²⁺ and Mg²⁺ reabsorption (loop diuretics → hypocalcaemia/hypomagnesaemia). Tall cuboidal epithelium, abundant mitochondria. Bartter syndrome = NKCC2 dysfunction.", transport: "NKCC2 (furosemide target), ROMK" },
  { id: "macula", label: "Macula Densa", category: "filtration", zone: "cortex", info: "Specialised plaque at the TAL-DCT junction where the ascending limb returns to its parent glomerulus — anatomical basis of the JGA. Senses tubular [NaCl] via apical NKCC2: ↓NaCl → adenosine ↓ → afferent dilation + renin release → ↑GFR (tubuloglomerular feedback). ↑NaCl → adenosine ↑ → afferent constriction → ↓GFR.", transport: "NaCl sensor → TGF + RAAS activation" },
  { id: "dct", label: "Distal Convoluted Tubule", category: "reabsorption", zone: "cortex", info: "Cortical. NCC (Na⁺/Cl⁻ cotransporter) on apical membrane — TARGET OF THIAZIDE DIURETICS. Reabsorbs 5% filtered Na⁺. Active transcellular Ca²⁺ reabsorption via apical TRPV5 → calbindin → basolateral NCX/PMCA, stimulated by PTH and calcitriol. Thiazides → ↑Ca²⁺ reabsorption (hypercalciuria/stones treatment). Gitelman syndrome = NCC dysfunction.", transport: "NCC (thiazide target), TRPV5 (Ca²⁺)" },
  { id: "ccd", label: "Cortical Collecting Duct", category: "secretion", zone: "cortex", info: "Cortical segment. PRINCIPAL cells — apical ENaC (aldosterone-sensitive → amiloride/spironolactone targets) + ROMK (K⁺ secretion). INTERCALATED cells: Type A (α) — apical H⁺-ATPase, basolateral AE1 (acid secretion); Type B (β) — apical pendrin (alkali secretion). ADH → V2R → cAMP → AQP2 insertion into apical membrane.", transport: "ENaC, ROMK, H⁺-ATPase, AQP2 (ADH)" },
  { id: "mcd", label: "Medullary Collecting Duct", category: "reabsorption", zone: "spans", info: "Descends through outer and inner medulla to papilla, draining into ducts of Bellini. Final concentration of urine. ADH-dependent water reabsorption (AQP2 apical, AQP3/4 basolateral). Urea recycling via UT-A1 (apical, ADH-sensitive) and UT-A3 (basolateral) → urea moves into medullary interstitium → ~50% of inner medullary osmolality. Without ADH: 50 mOsm/kg; max ADH: 1200 mOsm/kg.", transport: "AQP2/3/4, UT-A1/3 (urea recycling)" },
  { id: "vasa-recta", label: "Vasa Recta", category: "vascular", zone: "spans", info: "Hairpin capillary loops arising from efferent arterioles of juxtamedullary nephrons, running PARALLEL to the loop of Henle. Descending vasa recta (DVR): continuous endothelium with UT-B and AQP1. Ascending vasa recta (AVR): fenestrated endothelium. Functions as countercurrent EXCHANGER (not multiplier): sluggish flow allows equilibration with interstitium without washing out the medullary gradient. Medullary blood flow only 5–10% of total RBF — protective for gradient, but the outer medulla is vulnerable to ischaemic injury (ATN).", transport: "Countercurrent exchange (AQP1, UT-B)" },
  { id: "peritubular", label: "Peritubular Capillaries", category: "vascular", zone: "cortex", info: "Cortical capillary network arising from efferent arterioles of cortical (superficial) nephrons. Wrap around PCT, DCT and CCD in the cortex. Low hydrostatic pressure + high oncotic pressure (post-glomerular plasma is concentrated) favour reabsorption of fluid from cortical tubules into the bloodstream.", transport: "Bulk reabsorption (Starling forces favour uptake)" },
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  filtration: { bg: "bg-blue-500/10", border: "border-blue-500/40", text: "text-blue-400" },
  reabsorption: { bg: "bg-emerald-500/10", border: "border-emerald-500/40", text: "text-emerald-400" },
  secretion: { bg: "bg-amber-500/10", border: "border-amber-500/40", text: "text-amber-400" },
  vascular: { bg: "bg-red-500/10", border: "border-red-500/40", text: "text-red-400" },
};

// === Tubule paths (hollow double-walled) ===
// Cortex: y < 200. Outer medulla: y 200-380. Inner medulla: y 380-560. Papilla tip ~ y 560.
const tubePaths = {
  // PCT — convoluted, entirely in cortex (y 90-180)
  pctOuter: "M 178 100 Q 195 115 215 105 Q 240 92 258 108 Q 275 125 295 110 Q 315 92 330 110 Q 345 130 332 148 Q 318 162 302 158 Q 290 154 295 168",
  pctInner: "M 178 110 Q 195 125 215 115 Q 240 102 258 118 Q 275 135 295 120 Q 315 102 330 120 Q 345 140 332 158 Q 318 172 302 168 Q 290 164 295 178",
  pctLumen: "M 178 105 Q 195 120 215 110 Q 240 97 258 113 Q 275 130 295 115 Q 315 97 330 115 Q 345 135 332 153 Q 318 167 302 163 Q 290 159 295 173",

  // Pars recta of PCT + descending limb — straight, dives from cortex through outer medulla into inner medulla (y 180 → 555)
  descOuter: "M 295 178 L 293 200 L 290 280 L 287 380 L 284 470 L 282 540",
  descInner: "M 305 178 L 303 200 L 300 280 L 297 380 L 294 470 L 292 540",
  descLumen: "M 300 178 L 298 200 L 295 280 L 292 380 L 289 470 L 287 540",

  // Hairpin turn at papilla (y ~ 555)
  // Thin ascending limb — inner medulla only (y 555 → 380)
  thinAscOuter: "M 312 540 L 314 470 L 316 400 L 318 380",
  thinAscInner: "M 322 540 L 324 470 L 326 400 L 328 380",
  thinAscLumen: "M 317 540 L 319 470 L 321 400 L 323 380",

  // Thick ascending limb — outer medulla (y 380 → 200), then back to cortex
  thickAscOuter: "M 318 380 L 322 300 L 326 240 L 330 200 L 334 180 L 338 160",
  thickAscInner: "M 328 380 L 332 300 L 336 240 L 340 200 L 344 180 L 348 160",
  thickAscLumen: "M 323 380 L 327 300 L 331 240 L 335 200 L 339 180 L 343 160",

  // DCT — short, convoluted, returns near glomerulus (cortex)
  dctOuter: "M 338 160 Q 360 145 380 150 Q 400 158 408 140 Q 415 122 400 115 Q 388 112 385 128",
  dctInner: "M 348 160 Q 368 152 388 158 Q 405 165 415 148 Q 423 130 405 122 Q 393 119 392 132",
  dctLumen: "M 343 160 Q 364 148 384 154 Q 402 162 411 144 Q 419 126 402 118 Q 390 115 388 130",

  // CCD — cortex only (y 130 → 195)
  ccdOuter: "M 388 130 L 386 160 L 384 195",
  ccdInner: "M 398 130 L 396 160 L 394 195",
  ccdLumen: "M 393 130 L 391 160 L 389 195",

  // MCD — descends through outer and inner medulla to papilla (y 195 → 565)
  mcdOuter: "M 384 195 L 382 280 L 380 380 L 378 470 L 376 540 L 372 565",
  mcdInner: "M 394 195 L 392 280 L 390 380 L 388 470 L 386 540 L 382 565",
  mcdLumen: "M 389 195 L 387 280 L 385 380 L 383 470 L 381 540 L 377 565",
};

// Vasa recta — hairpin loops running PARALLEL to the loop of Henle (juxtamedullary)
// They enter the medulla just adjacent to the descending limb and descend deep, then ascend
const vasaRectaPaths = {
  // Descending vasa recta (arterial) — runs just lateral (left) of the descending LoH
  dvrOuter: "M 248 175 L 246 200 L 243 280 L 240 380 L 237 470 L 235 535",
  dvrInner: "M 256 175 L 254 200 L 251 280 L 248 380 L 245 470 L 243 535",
  // Hairpin at deep medulla (around y 545)
  dvrHairpin: "M 235 535 Q 240 558 252 562 Q 264 558 269 535",
  // Ascending vasa recta (venous) — runs just medial of descending, between DVR and tubule
  avrOuter: "M 269 535 L 267 470 L 265 380 L 263 280 L 261 200 L 259 175",
  avrInner: "M 261 535 L 259 470 L 257 380 L 255 280 L 253 200 L 251 175",

  // A second vasa recta bundle on the right side of the loop (paired with thick/thin ascending)
  dvr2Outer: "M 358 175 L 356 200 L 354 280 L 352 380 L 350 470 L 348 530",
  dvr2Inner: "M 366 175 L 364 200 L 362 280 L 360 380 L 358 470 L 356 530",
  dvr2Hairpin: "M 348 530 Q 353 552 365 555 Q 377 552 382 530",
  avr2Outer: "M 382 530 L 380 470 L 378 380 L 376 280 L 374 200 L 372 175",
  avr2Inner: "M 374 530 L 372 470 L 370 380 L 368 280 L 366 200 L 364 175",
};

// Peritubular capillary network paths (cortex only)
const peritubularPaths = [
  "M 205 130 Q 225 138 240 148 Q 258 158 275 152",
  "M 215 165 Q 235 172 255 168 Q 270 165 280 170",
  "M 360 130 Q 378 138 395 148 Q 410 155 425 150",
  "M 365 175 Q 380 178 395 175 Q 410 172 420 168",
  "M 195 145 Q 210 152 225 158",
  "M 410 165 Q 425 162 438 156",
];

export const NephronDiagram = () => {
  const [active, setActive] = useState<SegmentId | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [showZones, setShowZones] = useState(true);
  const activeSegment = segments.find(s => s.id === active);

  const categories = ["filtration", "reabsorption", "secretion", "vascular"];

  const isVisible = (seg: Segment) => !filter || seg.category === filter;
  const isActive = (id: SegmentId) => active === id;
  const seg = (id: SegmentId) => segments.find(s => s.id === id)!;

  const HollowTube = ({ id, outerPath, innerPath, lumenPath, color, activeColor, wallWidth = 1.2, lumenColor, dashed, onClick }: {
    id: SegmentId; outerPath: string; innerPath: string; lumenPath?: string;
    color: string; activeColor: string; wallWidth?: number;
    lumenColor?: string; dashed?: boolean; onClick: () => void;
  }) => {
    const s = seg(id);
    const vis = isVisible(s);
    const act = isActive(id);
    const strokeColor = act ? activeColor : color;
    return (
      <g opacity={vis ? 1 : 0.12} className="cursor-pointer transition-all" onClick={onClick}>
        <path d={outerPath} fill="none" stroke={strokeColor}
          strokeWidth={act ? wallWidth + 0.6 : wallWidth} strokeLinecap="round"
          strokeDasharray={dashed ? "5 2" : undefined} />
        <path d={innerPath} fill="none" stroke={strokeColor}
          strokeWidth={act ? wallWidth + 0.6 : wallWidth} strokeLinecap="round"
          strokeDasharray={dashed ? "5 2" : undefined} />
        {lumenPath && (
          <path d={lumenPath} fill="none"
            stroke={lumenColor || strokeColor} strokeWidth={act ? 5 : 3.5}
            strokeLinecap="round" opacity={0.1} />
        )}
        <path d={lumenPath || outerPath} fill="none" stroke="transparent" strokeWidth="14" onClick={onClick} />
      </g>
    );
  };

  const toggle = (id: SegmentId) => () => setActive(active === id ? null : id);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
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
        <button
          onClick={() => setShowZones(!showZones)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ml-auto ${
            showZones ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/50 border-border text-muted-foreground"
          }`}
        >
          {showZones ? "Hide" : "Show"} cortex/medulla zones
        </button>
      </div>

      <svg viewBox="0 0 540 620" className="w-full" role="img" aria-label="Juxtamedullary nephron with vasa recta and corticomedullary zones">
        <defs>
          <linearGradient id="cortexGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(35 55% 70%)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(35 55% 65%)" stopOpacity="0.10" />
          </linearGradient>
          <linearGradient id="outerMedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(15 50% 55%)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(15 50% 45%)" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient id="innerMedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(15 50% 40%)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="hsl(15 55% 30%)" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="dvrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 70% 55%)" />
            <stop offset="100%" stopColor="hsl(0 60% 42%)" />
          </linearGradient>
          <linearGradient id="avrGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="hsl(220 55% 38%)" />
            <stop offset="100%" stopColor="hsl(220 50% 55%)" />
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

        {/* ====== CORTEX / OUTER MEDULLA / INNER MEDULLA ZONES ====== */}
        {showZones && (
          <>
            <rect x="0" y="0" width="540" height="200" fill="url(#cortexGrad)" />
            <rect x="0" y="200" width="540" height="180" fill="url(#outerMedGrad)" />
            <rect x="0" y="380" width="540" height="240" fill="url(#innerMedGrad)" />

            {/* Corticomedullary junction — solid line */}
            <line x1="0" y1="200" x2="540" y2="200" stroke="hsl(15 50% 40%)" strokeWidth="1" opacity="0.5" />
            <text x="540" y="197" fontSize="6.5" fill="hsl(15 50% 40%)" textAnchor="end" opacity="0.6" fontStyle="italic">corticomedullary junction</text>

            {/* Outer / inner medulla boundary — dashed */}
            <line x1="0" y1="380" x2="540" y2="380" stroke="hsl(15 50% 35%)" strokeWidth="0.7" strokeDasharray="4 3" opacity="0.45" />

            {/* Zone labels (left margin) */}
            <text x="10" y="22" fontSize="11" fill="hsl(35 55% 45%)" fontWeight="700" opacity="0.75">CORTEX</text>
            <text x="10" y="36" fontSize="6.5" fill="hsl(35 55% 45%)" opacity="0.55" fontStyle="italic">renal corpuscle, PCT, DCT, CCD</text>

            <text x="10" y="220" fontSize="11" fill="hsl(15 55% 40%)" fontWeight="700" opacity="0.75">OUTER MEDULLA</text>
            <text x="10" y="234" fontSize="6.5" fill="hsl(15 55% 40%)" opacity="0.55" fontStyle="italic">thick ascending limb, MCD</text>

            <text x="10" y="400" fontSize="11" fill="hsl(15 60% 35%)" fontWeight="700" opacity="0.8">INNER MEDULLA</text>
            <text x="10" y="414" fontSize="6.5" fill="hsl(15 60% 35%)" opacity="0.6" fontStyle="italic">thin descending + ascending limbs, MCD</text>

            <text x="10" y="585" fontSize="9" fill="hsl(15 60% 30%)" fontWeight="700" opacity="0.7">PAPILLA</text>
          </>
        )}

        {/* Faint capsule outline at top */}
        <path d="M 0 4 Q 270 -4 540 4" fill="none" stroke="hsl(var(--border))" strokeWidth="0.8" opacity="0.4" />

        {/* ============= INTERLOBULAR ARTERY (left) ============= */}
        <g opacity="0.55">
          <path d="M 30 30 L 32 100 L 35 175" fill="none" stroke="hsl(0 60% 50%)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 36 30 L 38 100 L 41 175" fill="none" stroke="hsl(0 60% 50%)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 33 30 L 35 100 L 38 175" fill="none" stroke="hsl(0 65% 55%)" strokeWidth="3.5" opacity="0.18" strokeLinecap="round" />
          <text x="14" y="100" fontSize="6.5" fill="hsl(0 50% 50%)" opacity="0.7" fontWeight="600" transform="rotate(-90 14 100)">interlobular a.</text>
        </g>

        {/* ============= INTERLOBULAR VEIN (far right) ============= */}
        <g opacity="0.55">
          <path d="M 510 30 L 508 200 L 506 380 L 504 560" fill="none" stroke="hsl(220 55% 45%)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 516 30 L 514 200 L 512 380 L 510 560" fill="none" stroke="hsl(220 55% 45%)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 513 30 L 511 200 L 509 380 L 507 560" fill="none" stroke="hsl(220 50% 50%)" strokeWidth="3" opacity="0.15" strokeLinecap="round" />
          <text x="525" y="100" fontSize="6.5" fill="hsl(220 50% 50%)" opacity="0.7" fontWeight="600" transform="rotate(90 525 100)">venous return</text>
        </g>

        {/* ============= VASA RECTA — drawn before tubules ============= */}
        <g opacity={isVisible(seg("vasa-recta")) ? (isActive("vasa-recta") ? 1 : 0.7) : 0.08}
           className="cursor-pointer" onClick={toggle("vasa-recta")}>
          {/* Bundle 1 (left of LoH) */}
          <path d={vasaRectaPaths.dvrOuter} fill="none" stroke="url(#dvrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.8 : 1.1} strokeLinecap="round" />
          <path d={vasaRectaPaths.dvrInner} fill="none" stroke="url(#dvrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.8 : 1.1} strokeLinecap="round" />
          <path d="M 252 175 L 250 280 L 247 400 L 244 500 L 242 532" fill="none"
            stroke="hsl(0 65% 55%)" strokeWidth="3" opacity="0.10" strokeLinecap="round" />
          {/* Hairpin */}
          <path d={vasaRectaPaths.dvrHairpin} fill="none" stroke="url(#dvrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.8 : 1.1} strokeLinecap="round" />
          <path d={vasaRectaPaths.avrOuter} fill="none" stroke="url(#avrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.8 : 1.1} strokeLinecap="round" />
          <path d={vasaRectaPaths.avrInner} fill="none" stroke="url(#avrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.8 : 1.1} strokeLinecap="round" />
          <path d="M 265 535 L 263 400 L 260 280 L 258 200 L 256 175" fill="none"
            stroke="hsl(220 55% 50%)" strokeWidth="3" opacity="0.10" strokeLinecap="round" />

          {/* Bundle 2 (right of LoH, paired with thick ascending) */}
          <path d={vasaRectaPaths.dvr2Outer} fill="none" stroke="url(#dvrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.6 : 0.95} strokeLinecap="round" opacity="0.8" />
          <path d={vasaRectaPaths.dvr2Inner} fill="none" stroke="url(#dvrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.6 : 0.95} strokeLinecap="round" opacity="0.8" />
          <path d={vasaRectaPaths.dvr2Hairpin} fill="none" stroke="url(#dvrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.6 : 0.95} strokeLinecap="round" opacity="0.8" />
          <path d={vasaRectaPaths.avr2Outer} fill="none" stroke="url(#avrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.6 : 0.95} strokeLinecap="round" opacity="0.8" />
          <path d={vasaRectaPaths.avr2Inner} fill="none" stroke="url(#avrGrad)"
            strokeWidth={isActive("vasa-recta") ? 1.6 : 0.95} strokeLinecap="round" opacity="0.8" />

          {/* Direction arrows on DVR */}
          {[260, 360, 460].map(y => (
            <polygon key={`dvr-arr-${y}`} points={`${247 - (y - 175) * 0.025},${y - 4} ${247 - (y - 175) * 0.025},${y + 4} ${243 - (y - 175) * 0.025},${y}`}
              fill="hsl(0 65% 50%)" opacity={isActive("vasa-recta") ? 0.7 : 0.4} />
          ))}
          {/* Direction arrows on AVR (upward) */}
          {[260, 360, 460].map(y => (
            <polygon key={`avr-arr-${y}`} points={`${265 - (y - 175) * 0.022 + 4},${y + 4} ${265 - (y - 175) * 0.022 + 4},${y - 4} ${269 - (y - 175) * 0.022 + 4},${y}`}
              fill="hsl(220 55% 50%)" opacity={isActive("vasa-recta") ? 0.7 : 0.4} />
          ))}

          {/* Exchange annotations between paired DVR/AVR when active */}
          {isActive("vasa-recta") && [
            { y: 280, label: "H₂O →" },
            { y: 400, label: "← NaCl" },
            { y: 500, label: "← urea" },
          ].map((m, i) => (
            <g key={`exch-${i}`} opacity="0.7">
              <line x1={258} y1={m.y} x2={264} y2={m.y} stroke="hsl(200 55% 55%)" strokeWidth="0.8" />
              <text x={261} y={m.y - 4} fontSize="4.5" fill="hsl(200 60% 55%)" textAnchor="middle">{m.label}</text>
            </g>
          ))}

          {/* Big invisible click target across both bundles */}
          <rect x="230" y="170" width="160" height="395" fill="transparent" />
        </g>

        {/* Vasa recta legend */}
        {isActive("vasa-recta") && (
          <g opacity="0.85">
            <rect x="380" y="565" width="150" height="42" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.6" />
            <line x1="386" y1="574" x2="396" y2="574" stroke="hsl(0 65% 50%)" strokeWidth="2" />
            <text x="400" y="576" fontSize="6" fill="hsl(0 60% 50%)">DVR ↓ (arterial, continuous)</text>
            <line x1="386" y1="586" x2="396" y2="586" stroke="hsl(220 55% 50%)" strokeWidth="2" />
            <text x="400" y="588" fontSize="6" fill="hsl(220 55% 50%)">AVR ↑ (venous, fenestrated)</text>
            <text x="386" y="600" fontSize="5" fill="hsl(var(--muted-foreground))" fontStyle="italic">Countercurrent exchanger preserves gradient</text>
          </g>
        )}

        {/* ============= PERITUBULAR CAPILLARY NETWORK (cortex only) ============= */}
        <g opacity={isVisible(seg("peritubular")) ? (isActive("peritubular") ? 0.9 : 0.45) : 0.08}
           className="cursor-pointer" onClick={toggle("peritubular")}>
          {peritubularPaths.map((d, i) => (
            <path key={`ptc-${i}`} d={d} fill="none" stroke="hsl(340 45% 55%)"
              strokeWidth={isActive("peritubular") ? 1.4 : 0.9} strokeLinecap="round"
              strokeDasharray="2 2" />
          ))}
          {/* Click target */}
          <rect x="190" y="120" width="260" height="65" fill="transparent" />
        </g>

        {/* ============= AFFERENT ARTERIOLE ============= */}
        <g opacity={isVisible(seg("afferent")) ? 1 : 0.12} className="cursor-pointer" onClick={toggle("afferent")}>
          <path d="M 41 100 Q 65 102 90 105 Q 110 108 122 110" fill="none"
            stroke={isActive("afferent") ? "hsl(0 70% 55%)" : "hsl(0 60% 50%)"}
            strokeWidth={isActive("afferent") ? 2 : 1.4} />
          <path d="M 41 112 Q 65 114 90 117 Q 110 120 122 122" fill="none"
            stroke={isActive("afferent") ? "hsl(0 70% 55%)" : "hsl(0 60% 50%)"}
            strokeWidth={isActive("afferent") ? 2 : 1.4} />
          <path d="M 41 106 Q 65 108 90 111 Q 110 114 122 116" fill="none"
            stroke="hsl(0 65% 55%)" strokeWidth="6" opacity="0.10" strokeLinecap="round" />
          {[60, 78, 96, 114].map((x, i) => (
            <ellipse key={`aff-sm-${i}`} cx={x} cy={107 + i * 0.5} rx={3} ry={2}
              fill="hsl(0 55% 55%)" fillOpacity={isActive("afferent") ? 0.35 : 0.18}
              stroke="hsl(0 60% 50%)" strokeWidth="0.5" />
          ))}
          <polygon points="44,103 44,109 36,106" fill="hsl(0 60% 50%)" opacity="0.7" />
          <path d="M 41 106 Q 65 108 90 111 Q 110 114 122 116" fill="none" stroke="transparent" strokeWidth="16" />
        </g>
        <text x="78" y="92" fontSize="6.5" fill="hsl(0 50% 50%)" opacity={isVisible(seg("afferent")) ? 0.7 : 0.1} fontStyle="italic">afferent arteriole</text>

        {/* JG cells */}
        {[115, 122].map((x, i) => (
          <g key={`jg-${i}`} opacity={isVisible(seg("afferent")) ? 0.7 : 0.1}>
            <circle cx={x} cy={111 - i * 0.5} r={3.5} fill="hsl(260 50% 55%)" fillOpacity="0.22"
              stroke="hsl(260 50% 55%)" strokeWidth="0.7" />
          </g>
        ))}

        {/* ============= EFFERENT ARTERIOLE — dives down to become vasa recta ============= */}
        <g opacity={isVisible(seg("efferent")) ? 1 : 0.12} className="cursor-pointer" onClick={toggle("efferent")}>
          {/* exits glomerulus from top right, curves down to feed vasa recta */}
          <path d="M 195 90 Q 215 90 230 105 Q 245 125 248 150 Q 250 165 250 175" fill="none"
            stroke={isActive("efferent") ? "hsl(0 50% 50%)" : "hsl(0 40% 42%)"}
            strokeWidth={isActive("efferent") ? 1.7 : 1.1} />
          <path d="M 195 100 Q 218 100 235 113 Q 250 132 254 152 Q 256 165 256 175" fill="none"
            stroke={isActive("efferent") ? "hsl(0 50% 50%)" : "hsl(0 40% 42%)"}
            strokeWidth={isActive("efferent") ? 1.7 : 1.1} />
          <path d="M 195 95 Q 217 95 233 109 Q 248 128 251 151 Q 253 165 253 175" fill="none"
            stroke="hsl(0 45% 45%)" strokeWidth="5" opacity="0.08" strokeLinecap="round" />
          <path d="M 195 95 Q 217 95 233 109 Q 248 128 251 151 Q 253 165 253 175" fill="none" stroke="transparent" strokeWidth="14" />
          <text x="200" y="135" fontSize="5.5" fill="hsl(0 45% 45%)" opacity={isVisible(seg("efferent")) ? 0.65 : 0.1} fontStyle="italic">efferent → vasa recta</text>
        </g>

        {/* ============= BOWMAN'S CAPSULE + GLOMERULUS ============= */}
        <g opacity={isVisible(seg("glomerulus")) ? 1 : 0.12} className="cursor-pointer" onClick={toggle("glomerulus")}>
          {/* Bowman's capsule — double wall (cup-shaped) */}
          <ellipse cx="160" cy="100" rx="42" ry="34" fill="none"
            stroke={isActive("glomerulus") ? "hsl(var(--primary))" : "hsl(var(--primary)/0.55)"}
            strokeWidth={isActive("glomerulus") ? 2.4 : 1.5} />
          <ellipse cx="160" cy="100" rx="38" ry="30" fill="none"
            stroke={isActive("glomerulus") ? "hsl(var(--primary)/0.65)" : "hsl(var(--primary)/0.3)"}
            strokeWidth="1" />
          <ellipse cx="160" cy="100" rx="40" ry="32" fill="hsl(var(--primary))" fillOpacity="0.04" />
          <text x="118" y="76" fontSize="5.5" fill="hsl(var(--primary))" opacity={0.55}>Bowman's capsule</text>

          {/* Glomerular capillary tuft — realistic loops */}
          {[
            "M 142 88 Q 135 96 144 102 Q 152 108 146 115",
            "M 154 86 Q 147 95 156 100 Q 165 106 158 113",
            "M 166 86 Q 159 95 168 99 Q 178 105 170 112",
            "M 178 90 Q 170 98 176 105 Q 184 110 178 116",
            "M 148 100 Q 158 96 168 99 Q 175 103 168 109",
          ].map((d, i) => (
            <path key={`glom-loop-${i}`} d={d} fill="none"
              stroke="hsl(0 60% 50%)" strokeWidth="2.4" strokeLinecap="round"
              opacity={isActive("glomerulus") ? 0.75 : 0.55} />
          ))}
          {/* Mesangial cells when active */}
          {isActive("glomerulus") && [
            { cx: 156, cy: 100 }, { cx: 165, cy: 105 }, { cx: 152, cy: 108 },
          ].map((c, i) => (
            <polygon key={`mes-${i}`} points={`${c.cx-2},${c.cy} ${c.cx},${c.cy-2.5} ${c.cx+2},${c.cy} ${c.cx},${c.cy+2.5}`}
              fill="hsl(30 50% 55%)" opacity="0.5" />
          ))}
          {isActive("glomerulus") && (
            <g opacity="0.4">
              {Array.from({ length: 14 }).map((_, i) => {
                const angle = (i * 25.7 + 50) * Math.PI / 180;
                const r1 = 31, r2 = 36;
                const x1 = 160 + r1 * Math.cos(angle);
                const y1 = 100 + r1 * 0.78 * Math.sin(angle);
                const x2 = 160 + r2 * Math.cos(angle);
                const y2 = 100 + r2 * 0.78 * Math.sin(angle);
                return <line key={`pod-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(var(--primary))" strokeWidth="0.8" />;
              })}
              <text x="200" y="130" fontSize="4.5" fill="hsl(var(--primary))">Podocyte foot processes</text>
            </g>
          )}
          <ellipse cx="160" cy="100" rx="42" ry="34" fill="transparent" />
        </g>
        <text x="160" y="148" fontSize="6.5" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="600"
          opacity={isVisible(seg("glomerulus")) ? 0.7 : 0.1}>renal corpuscle · GFR ≈ 125 mL/min</text>

        {/* ============= PCT (cortex) ============= */}
        <HollowTube id="pct" outerPath={tubePaths.pctOuter} innerPath={tubePaths.pctInner}
          lumenPath={tubePaths.pctLumen}
          color="hsl(150 50% 40%)" activeColor="hsl(150 60% 48%)" wallWidth={1.4}
          lumenColor="hsl(150 55% 50%)" onClick={toggle("pct")} />
        {/* Brush border microvilli */}
        {[195, 215, 240, 258, 278, 298, 320].map((x, i) => {
          const yBase = 92 + Math.sin(i * 0.8) * 6;
          return (
            <g key={`bb-${i}`} opacity={isVisible(seg("pct")) ? (isActive("pct") ? 0.6 : 0.32) : 0.06}>
              {[-1.5, -0.5, 0.5, 1.5].map((dx, j) => (
                <line key={j} x1={x + dx} y1={yBase} x2={x + dx} y2={yBase - 4}
                  stroke="hsl(150 50% 40%)" strokeWidth="0.45" />
              ))}
            </g>
          );
        })}
        {/* Reabsorption arrows up (into peritubular cap) */}
        {[225, 270, 315].map((x, i) => (
          <g key={`pct-arr-${i}`} opacity={isVisible(seg("pct")) ? 0.55 : 0.1}>
            <line x1={x} y1={75} x2={x} y2={62} stroke="hsl(150 50% 55%)" strokeWidth="1.3" markerEnd="url(#arrowGreen)" />
            <text x={x} y={58} fontSize="6.5" fill="hsl(150 50% 55%)" textAnchor="middle">{["Na⁺ H₂O", "Glucose", "HCO₃⁻"][i]}</text>
          </g>
        ))}

        {/* ============= DESCENDING LIMB (cortex → outer med → inner med) ============= */}
        <HollowTube id="desc-loh" outerPath={tubePaths.descOuter} innerPath={tubePaths.descInner}
          lumenPath={tubePaths.descLumen}
          color="hsl(200 55% 48%)" activeColor="hsl(200 65% 55%)" wallWidth={0.9}
          lumenColor="hsl(200 55% 52%)" onClick={toggle("desc-loh")} />
        {/* Water arrows — out of descending limb into medullary interstitium */}
        {[260, 350, 440, 510].map((y, i) => (
          <g key={`dloh-${i}`} opacity={isVisible(seg("desc-loh")) ? 0.55 : 0.1}>
            <line x1={283} y1={y} x2={272} y2={y} stroke="hsl(200 55% 55%)" strokeWidth="1.2" markerEnd="url(#arrowBlue)" />
            <text x={268} y={y + 2.5} fontSize="6" fill="hsl(200 55% 55%)" textAnchor="end">H₂O</text>
          </g>
        ))}

        {/* ============= HAIRPIN (deep inner medulla) ============= */}
        <path d="M 285 540 Q 295 568 305 568 Q 315 568 322 540" fill="none"
          stroke="hsl(var(--muted-foreground))" strokeWidth="1.4" opacity="0.45" />
        <path d="M 282 540 Q 295 575 305 575 Q 320 575 326 540" fill="none"
          stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.25" />

        {/* ============= THIN ASCENDING (inner medulla) ============= */}
        <HollowTube id="thin-asc" outerPath={tubePaths.thinAscOuter} innerPath={tubePaths.thinAscInner}
          lumenPath={tubePaths.thinAscLumen}
          color="hsl(30 55% 48%)" activeColor="hsl(30 65% 55%)" wallWidth={0.9}
          lumenColor="hsl(30 55% 52%)" onClick={toggle("thin-asc")} />

        {/* ============= THICK ASCENDING (outer medulla → cortex) ============= */}
        <HollowTube id="thick-asc" outerPath={tubePaths.thickAscOuter} innerPath={tubePaths.thickAscInner}
          lumenPath={tubePaths.thickAscLumen}
          color="hsl(30 65% 45%)" activeColor="hsl(30 75% 55%)" wallWidth={1.5}
          lumenColor="hsl(30 65% 50%)" onClick={toggle("thick-asc")} />
        {/* TAL cells when active */}
        {isActive("thick-asc") && [240, 280, 320].map((y, i) => {
          const x = 326 + (380 - y) * 0.045;
          return (
            <rect key={`tal-cell-${i}`} x={x - 2} y={y - 3} width="4" height="6" rx="0.8"
              fill="hsl(30 65% 50%)" fillOpacity="0.35" stroke="hsl(30 65% 50%)" strokeWidth="0.5" opacity="0.6" />
          );
        })}
        <g opacity={isVisible(seg("thick-asc")) ? 0.6 : 0.1}>
          <line x1={350} y1={290} x2={395} y2={290} stroke="hsl(30 60% 55%)" strokeWidth="1.2" markerEnd="url(#arrowOrange)" />
          <text x={400} y={288} fontSize="7" fill="hsl(30 60% 55%)">Na⁺/K⁺/2Cl⁻</text>
          <text x={400} y={297} fontSize="6" fill="hsl(30 50% 55%)" fontStyle="italic">(furosemide ✕)</text>
        </g>

        {/* ============= MACULA DENSA ============= */}
        <g className="cursor-pointer" onClick={toggle("macula")} opacity={isVisible(seg("macula")) ? 1 : 0.12}>
          <rect x="328" y="148" width="22" height="12" rx="3"
            fill={isActive("macula") ? "hsl(260 60% 55%/0.32)" : "hsl(260 50% 50%/0.16)"}
            stroke="hsl(260 50% 55%)" strokeWidth="1.3" />
          {[333, 339, 345].map((x, i) => (
            <circle key={`md-${i}`} cx={x} cy={154} r={1.8}
              fill="hsl(260 55% 55%)" fillOpacity={isActive("macula") ? 0.55 : 0.32} />
          ))}
        </g>
        <text x="339" y="144" fontSize="6.5" fill="hsl(260 55% 55%)" textAnchor="middle"
          opacity={isVisible(seg("macula")) ? 0.85 : 0.12} fontWeight="600">MD</text>
        <path d="M 332 148 Q 250 130 195 105" fill="none"
          stroke="hsl(260 55% 55%)" strokeWidth="0.6" strokeDasharray="3 3"
          opacity={isActive("macula") ? 0.55 : 0.1} />
        {isActive("macula") && (
          <text x="270" y="120" fontSize="5" fill="hsl(260 55% 55%)" textAnchor="middle" opacity="0.7">TGF → afferent arteriole</text>
        )}

        {/* ============= DCT (cortex) ============= */}
        <HollowTube id="dct" outerPath={tubePaths.dctOuter} innerPath={tubePaths.dctInner}
          lumenPath={tubePaths.dctLumen}
          color="hsl(45 60% 42%)" activeColor="hsl(45 70% 52%)" wallWidth={1.3}
          lumenColor="hsl(45 60% 48%)" onClick={toggle("dct")} />
        <g opacity={isVisible(seg("dct")) ? 0.6 : 0.1}>
          <line x1={420} y1={148} x2={448} y2={140} stroke="hsl(45 60% 50%)" strokeWidth="1.4" markerEnd="url(#arrowYellow)" />
          <text x={452} y={138} fontSize="7" fill="hsl(45 60% 50%)">Na⁺/Cl⁻</text>
          <text x={452} y={148} fontSize="6" fill="hsl(45 50% 50%)" fontStyle="italic">(thiazide ✕)</text>
        </g>

        {/* ============= CCD (cortex) ============= */}
        <HollowTube id="ccd" outerPath={tubePaths.ccdOuter} innerPath={tubePaths.ccdInner}
          lumenPath={tubePaths.ccdLumen}
          color="hsl(270 50% 48%)" activeColor="hsl(270 60% 58%)" wallWidth={1.1}
          lumenColor="hsl(270 50% 52%)" dashed
          onClick={toggle("ccd")} />
        <g opacity={isVisible(seg("ccd")) ? 0.6 : 0.1}>
          <line x1={400} y1={170} x2={440} y2={168} stroke="hsl(270 50% 55%)" strokeWidth="1.2" />
          <text x={444} y={167} fontSize="6.5" fill="hsl(270 50% 55%)">ENaC (aldo)</text>
          <text x={444} y={177} fontSize="6.5" fill="hsl(270 50% 55%)">AQP2 (ADH)</text>
        </g>

        {/* ============= MCD (outer + inner medulla → papilla) ============= */}
        <HollowTube id="mcd" outerPath={tubePaths.mcdOuter} innerPath={tubePaths.mcdInner}
          lumenPath={tubePaths.mcdLumen}
          color="hsl(270 45% 42%)" activeColor="hsl(270 55% 55%)" wallWidth={1.1}
          lumenColor="hsl(270 45% 48%)" dashed
          onClick={toggle("mcd")} />
        {isActive("mcd") && (
          <g opacity="0.5">
            <path d="M 380 470 Q 360 475 340 470" fill="none"
              stroke="hsl(30 50% 55%)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="360" y="465" fontSize="5" fill="hsl(30 50% 55%)" textAnchor="middle">Urea → interstitium (UT-A1)</text>
          </g>
        )}

        {/* Urine output at papilla */}
        <polygon points="377,575 372,587 382,587" fill="hsl(var(--muted-foreground))" opacity="0.65" />
        <text x="377" y="600" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">→ Urine</text>
        <text x="377" y="612" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.55">50–1200 mOsm/kg</text>

        {/* ============= OSMOLALITY GRADIENT (right margin) ============= */}
        {[
          { y: 195, osm: "300", label: "isotonic" },
          { y: 290, osm: "600" },
          { y: 400, osm: "900" },
          { y: 540, osm: "1200", label: "papilla" },
        ].map(m => (
          <g key={m.y}>
            <text x="490" y={m.y} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.55" fontWeight="600">
              {m.osm}
            </text>
            {m.label && (
              <text x="490" y={m.y + 8} fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.4" fontStyle="italic">
                {m.label}
              </text>
            )}
          </g>
        ))}
        <text x="490" y="178" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.45">mOsm/kg</text>

        {/* ============= SEGMENT LABELS ============= */}
        {[
          { id: "glomerulus" as SegmentId, x: 160, y: 162, label: "Glomerulus" },
          { id: "pct" as SegmentId, x: 250, y: 60, label: "PCT" },
          { id: "dct" as SegmentId, x: 410, y: 100, label: "DCT" },
          { id: "ccd" as SegmentId, x: 442, y: 200, label: "CCD" },
          { id: "thick-asc" as SegmentId, x: 358, y: 250, label: "Thick Asc." },
          { id: "desc-loh" as SegmentId, x: 285, y: 310, label: "Desc. LoH" },
          { id: "mcd" as SegmentId, x: 420, y: 420, label: "MCD" },
          { id: "thin-asc" as SegmentId, x: 350, y: 470, label: "Thin Asc." },
        ].map(lbl => {
          const s = seg(lbl.id);
          return (
            <g key={lbl.id} onClick={toggle(lbl.id)}
              className="cursor-pointer" opacity={isVisible(s) ? 1 : 0.12}>
              <rect x={lbl.x - 27} y={lbl.y - 9} width="54" height="16" rx="4"
                fill={isActive(lbl.id) ? "hsl(var(--primary)/0.25)" : "hsl(var(--secondary)/0.7)"}
                stroke={isActive(lbl.id) ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth="1" />
              <text x={lbl.x} y={lbl.y + 2.5} fontSize="7.5" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">
                {lbl.label}
              </text>
            </g>
          );
        })}

        {/* ===== ANIMATED FILTRATE FLOW =====
            Yellow particles travel sequentially through PCT → desc → thin asc → thick asc → DCT → CCD → MCD,
            visualising the direction of tubular flow. Hidden when a non-tubular segment is filtered. */}
        {(!filter || filter === "reabsorption" || filter === "secretion") && (
          <g opacity="0.85">
            {/* Each particle group covers one segment with staggered begin times */}
            {[
              { path: tubePaths.pctLumen,       dur: "3.2s", begin: "0s" },
              { path: tubePaths.descLumen,      dur: "2.8s", begin: "0.4s" },
              { path: tubePaths.thinAscLumen,   dur: "1.6s", begin: "0.7s" },
              { path: tubePaths.thickAscLumen, dur: "2.4s", begin: "1.0s" },
              { path: tubePaths.dctLumen,       dur: "1.8s", begin: "1.4s" },
              { path: tubePaths.ccdLumen,       dur: "1.2s", begin: "1.7s" },
              { path: tubePaths.mcdLumen,       dur: "3.0s", begin: "2.0s" },
            ].map((seg, idx) => (
              [0, 1, 2].map(i => (
                <circle key={`flt-${idx}-${i}`} r="2.4"
                  fill="hsl(45 90% 55%)" stroke="hsl(35 80% 40%)" strokeWidth="0.4">
                  <animateMotion dur={seg.dur} begin={`${seg.begin} -${i * (parseFloat(seg.dur) / 3)}s`}
                    repeatCount="indefinite" path={seg.path} />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1"
                    dur={seg.dur} begin={`${seg.begin} -${i * (parseFloat(seg.dur) / 3)}s`}
                    repeatCount="indefinite" />
                </circle>
              ))
            ))}
          </g>
        )}

        {/* "Juxtamedullary nephron" caption */}
        <text x="270" y="618" fontSize="6.5" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.5" fontStyle="italic">
          Juxtamedullary nephron — long loop of Henle reaches papilla, paired with vasa recta
        </text>
      </svg>

      {/* Info panel */}
      {activeSegment ? (
        <div className={`rounded-lg border p-4 animate-fade-in ${categoryColors[activeSegment.category].bg} ${categoryColors[activeSegment.category].border}`}>
          <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
            <p className="text-sm font-semibold text-foreground">{activeSegment.label}</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-background/60 text-muted-foreground border border-border">
                {activeSegment.zone === "spans" ? "cortex → medulla" : activeSegment.zone.replace("-", " ")}
              </span>
              <span className={`text-xs font-medium capitalize ${categoryColors[activeSegment.category].text}`}>
                {activeSegment.category}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{activeSegment.info}</p>
          <p className="text-xs text-muted-foreground mt-2 font-medium">
            Key transporters: <span className="text-foreground/80">{activeSegment.transport}</span>
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center">Click any nephron segment, the vasa recta, or peritubular capillaries to explore — toggle the cortex/medulla zones with the button above</p>
      )}
    </div>
  );
};

export default NephronDiagram;

import React from "react";

/**
 * Vascular access devices — anatomically illustrated.
 *
 * Each device is drawn IN SITU on its true insertion site rather than as
 * an abstract horizontal bar:
 *   • Peripheral cannula (20 G) — dorsum of the hand
 *   • Large-bore cannula (14 G) — antecubital fossa
 *   • Midline — basilic vein, mid-upper arm
 *   • PICC — basilic → axillary → SVC (full arm + chest)
 *   • Triple-lumen CVC — right IJV → SVC (neck + chest)
 *   • Vascath — right IJV, large-bore, two staggered lumens
 *   • Swan-Ganz introducer — right IJV with side-port + valve
 *
 * Style follows the project anatomy diagram conventions: skin gradient,
 * radial depth shading, vessel walls with lumen highlight, faint dermal
 * stippling, drop-shadow on devices, HSL tokens only.
 */

// ──────────────────────────────────────────────────────────────────────
// Shared illustrative primitives
// ──────────────────────────────────────────────────────────────────────

const Defs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    {/* Skin — warm tan, soft radial shading */}
    <radialGradient id={`${id}-skin`} cx="50%" cy="35%" r="75%">
      <stop offset="0%" stopColor="hsl(28 55% 88%)" />
      <stop offset="60%" stopColor="hsl(24 45% 78%)" />
      <stop offset="100%" stopColor="hsl(20 38% 66%)" />
    </radialGradient>
    {/* Vein — deep blue-purple with lumen highlight */}
    <linearGradient id={`${id}-vein`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(220 55% 40%)" />
      <stop offset="50%" stopColor="hsl(225 60% 28%)" />
      <stop offset="100%" stopColor="hsl(220 55% 40%)" />
    </linearGradient>
    <linearGradient id={`${id}-veinLumen`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(220 70% 55%)" />
      <stop offset="100%" stopColor="hsl(225 65% 38%)" />
    </linearGradient>
    {/* Catheter — translucent silicone */}
    <linearGradient id={`${id}-cath`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(45 30% 96%)" />
      <stop offset="50%" stopColor="hsl(40 22% 84%)" />
      <stop offset="100%" stopColor="hsl(35 20% 72%)" />
    </linearGradient>
    {/* Soft drop shadow on devices */}
    <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
      <feOffset dx="0.6" dy="1.2" result="off" />
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.35" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    {/* Dermal stipple */}
    <pattern id={`${id}-stipple`} width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.35" fill="hsl(20 30% 50%)" opacity="0.18" />
      <circle cx="4.2" cy="3.8" r="0.3" fill="hsl(20 30% 50%)" opacity="0.14" />
    </pattern>
  </defs>
);

/** Reusable hub block — IV cannula style with butterfly wings + injection port */
const CannulaHub: React.FC<{
  x: number;
  y: number;
  width?: number;
  color: string;
  id: string;
  withPort?: boolean;
}> = ({ x, y, width = 22, color, id, withPort = true }) => (
  <g filter={`url(#${id}-shadow)`}>
    {/* wings */}
    <path
      d={`M${x},${y} q-4,-5 -10,-3 q6,3 10,3 z`}
      fill={color}
      opacity={0.85}
    />
    <path
      d={`M${x},${y + 6} q-4,5 -10,3 q6,-3 10,-3 z`}
      fill={color}
      opacity={0.85}
    />
    {/* hub body */}
    <rect x={x} y={y - 2} width={width} height={10} rx={2} fill={color} />
    <rect x={x} y={y - 2} width={width} height={3} rx={1.5} fill="hsl(0 0% 100% / 0.25)" />
    {/* injection port */}
    {withPort && (
      <>
        <rect x={x + width - 4} y={y - 9} width={5} height={8} rx={1.5} fill={color} opacity={0.9} />
        <circle cx={x + width - 1.5} cy={y - 9} r={2.2} fill="hsl(330 55% 60%)" stroke="hsl(0 0% 0% / 0.3)" strokeWidth={0.4} />
      </>
    )}
    {/* luer tip */}
    <path d={`M${x + width},${y - 1} l4,2 l-4,2 z`} fill={color} />
  </g>
);

/** Multi-lumen CVC hub with three coloured pigtails */
const CVCHub: React.FC<{ x: number; y: number; id: string; lumens: { color: string; label: string }[] }> = ({ x, y, id, lumens }) => (
  <g filter={`url(#${id}-shadow)`}>
    {/* Bifurcation manifold */}
    <path d={`M${x},${y} l8,-2 l0,4 z`} fill="hsl(45 25% 88%)" stroke="hsl(0 0% 20% / 0.4)" strokeWidth={0.4} />
    <rect x={x + 8} y={y - 6} width={6} height={12} rx={1.5} fill="hsl(45 25% 88%)" stroke="hsl(0 0% 20% / 0.4)" strokeWidth={0.4} />
    {/* Pigtails */}
    {lumens.map((l, i) => {
      const yOff = (i - (lumens.length - 1) / 2) * 7;
      return (
        <g key={i}>
          <path
            d={`M${x + 14},${y} C ${x + 22},${y} ${x + 26},${y + yOff * 1.3} ${x + 38},${y + yOff * 1.5}`}
            stroke={l.color}
            strokeWidth={2.6}
            fill="none"
            strokeLinecap="round"
          />
          {/* clamp */}
          <rect x={x + 28} y={y + yOff * 1.4 - 1.5} width={4} height={3} rx={0.5} fill="hsl(0 0% 25%)" />
          {/* luer */}
          <circle cx={x + 39} cy={y + yOff * 1.5} r={1.6} fill={l.color} stroke="hsl(0 0% 100% / 0.4)" strokeWidth={0.4} />
          <text x={x + 43} y={y + yOff * 1.5 + 2.5} fontSize={7} fill="hsl(var(--muted-foreground))">{l.label}</text>
        </g>
      );
    })}
  </g>
);

/**
 * Animated catheter / device shaft.
 *
 * Draws the device along its insertion path using a normalised
 * `pathLength={1}` so we can animate `stroke-dashoffset` from 1 → 0
 * (advancement), dwell at the target, then run 0 → 1 (withdrawal /
 * loop reset). A small tip marker travels along the same path via
 * `animateMotion` + `mpath`, so the catheter visibly threads from the
 * skin entry to its target vessel position.
 *
 * Respects `prefers-reduced-motion` purely via CSS — the SMIL block is
 * wrapped in a group whose animations pause when the OS-level pref is
 * set. (SMIL itself ignores the pref, so we gate visibility of motion
 * by simply leaving the fully-advanced state visible.)
 */
const AnimatedAdvance: React.FC<{
  d: string;
  stroke: string;
  strokeWidth: number;
  pathId: string;
  shadowId: string;
  dur?: string;
  begin?: string;
  tipColor?: string;
  tipR?: number;
  /** Render an underlying static (already-advanced) ghost so reduced-motion users still see the final position. */
  showStaticGhost?: boolean;
}> = ({
  d,
  stroke,
  strokeWidth,
  pathId,
  shadowId,
  dur = "4.5s",
  begin = "0s",
  tipColor,
  tipR = 2.5,
  showStaticGhost = true,
}) => (
  <g>
    {/* Static ghost = final advanced position, dimmed; visible if SMIL is disabled (e.g. reduced-motion / SSR snapshot). */}
    {showStaticGhost && (
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        opacity={0.18}
      />
    )}
    {/* Animated, draw-on shaft */}
    <path
      id={pathId}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1}
      filter={`url(#${shadowId}-shadow)`}
    >
      <animate
        attributeName="stroke-dashoffset"
        values="1;0;0;1"
        keyTimes="0;0.45;0.88;1"
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        calcMode="linear"
      />
    </path>
    {/* Subtle inner shadow line (matches existing style) */}
    <path
      d={d}
      stroke="hsl(0 0% 20% / 0.3)"
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1}
      opacity={0.3}
    >
      <animate
        attributeName="stroke-dashoffset"
        values="1;0;0;1"
        keyTimes="0;0.45;0.88;1"
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        calcMode="linear"
      />
    </path>
    {/* Travelling tip marker */}
    {tipColor && (
      <circle r={tipR} fill={tipColor}>
        <animate
          attributeName="opacity"
          values="0;1;1;1;0"
          keyTimes="0;0.02;0.45;0.88;1"
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
        />
        <animateMotion
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
          keyTimes="0;0.45;0.88;1"
          keyPoints="0;1;1;0"
          calcMode="linear"
        >
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    )}
  </g>
);

// ──────────────────────────────────────────────────────────────────────
// Individual scene components
// ──────────────────────────────────────────────────────────────────────

interface SceneProps {
  title: string;
  meta: string;
  tip: string;
}

/* Helper: scene frame */
const SceneFrame: React.FC<React.PropsWithChildren<SceneProps & { id: string; viewBox: string; ariaLabel: string }>> = ({
  title, meta, tip, id, viewBox, ariaLabel, children,
}) => (
  <div className="rounded-lg border border-border bg-background overflow-hidden flex flex-col">
    <div className="px-3 py-2 border-b border-border bg-muted/20">
      <p className="text-[11px] font-bold text-foreground leading-tight">{title}</p>
      <p className="text-[9.5px] text-muted-foreground mt-0.5 leading-snug">{meta}</p>
    </div>
    <div className="px-2 pt-1 flex-1">
      <svg viewBox={viewBox} className="w-full h-auto" role="img" aria-label={ariaLabel}>
        <Defs id={id} />
        {children}
      </svg>
    </div>
    <p className="px-3 pb-2 pt-1 text-[9px] italic text-muted-foreground leading-snug">{tip}</p>
  </div>
);

/* 1. Peripheral 20G in dorsum of hand */
const SceneHandCannula: React.FC = () => {
  const id = "vd-hand";
  return (
    <SceneFrame
      id={id}
      title="Peripheral cannula — 20 G"
      meta="20 G · 1.0 mm OD · ~60 mL/min · pink"
      tip="Dorsum of hand — induction, maintenance fluids, non-vesicant drugs."
      viewBox="0 0 240 130"
      ariaLabel="20 gauge peripheral cannula sited in a dorsal hand vein"
    >
      {/* Hand silhouette (dorsum view) */}
      <path
        d="M30,95 C 25,75 30,55 45,42 C 60,30 80,28 100,30 L 120,28 C 140,28 160,32 175,42 C 200,58 215,80 215,100 L 215,118 L 30,118 Z"
        fill={`url(#${id}-skin)`}
        stroke="hsl(20 35% 50%)"
        strokeWidth={0.6}
      />
      {/* Knuckles hint */}
      {[60, 90, 120, 150].map((x) => (
        <ellipse key={x} cx={x} cy={42} rx={9} ry={5} fill="hsl(20 35% 60%)" opacity={0.25} />
      ))}
      {/* Dermal stipple */}
      <path
        d="M30,95 C 25,75 30,55 45,42 C 60,30 80,28 100,30 L 120,28 C 140,28 160,32 175,42 C 200,58 215,80 215,100 L 215,118 L 30,118 Z"
        fill={`url(#${id}-stipple)`}
      />
      {/* Dorsal venous network */}
      <path d="M50,95 C 70,80 90,70 115,60 C 140,52 165,50 195,55"
        stroke={`url(#${id}-vein)`} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.7}/>
      <path d="M50,95 C 70,80 90,70 115,60 C 140,52 165,50 195,55"
        stroke={`url(#${id}-veinLumen)`} strokeWidth={2.2} fill="none" strokeLinecap="round" opacity={0.9}/>
      {/* tributary */}
      <path d="M115,60 C 110,75 105,90 100,108" stroke={`url(#${id}-vein)`} strokeWidth={3.5} fill="none" opacity={0.6}/>
      <path d="M115,60 C 110,75 105,90 100,108" stroke={`url(#${id}-veinLumen)`} strokeWidth={1.4} fill="none" opacity={0.85}/>

      {/* Cannula — entering from right, advancing into vein */}
      <AnimatedAdvance
        d="M155,56 L125,59"
        stroke="hsl(45 25% 92%)"
        strokeWidth={3}
        pathId={`${id}-shaft`}
        shadowId={id}
        dur="3.6s"
        tipColor="hsl(0 70% 50%)"
        tipR={2}
      />
      <CannulaHub x={155} y={52} color="hsl(330 70% 55%)" id={id} />
      {/* Insertion site */}
      <circle cx={155} cy={56} r={2.2} fill="hsl(0 60% 35%)" opacity={0.7}/>

      {/* Labels */}
      <text x={120} y={50} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>dorsal vein</text>
      <text x={195} y={45} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>hub</text>
    </SceneFrame>
  );
};

/* 2. 14G in ACF */
const SceneACF14G: React.FC = () => {
  const id = "vd-acf";
  return (
    <SceneFrame
      id={id}
      title="Large-bore cannula — 14 G"
      meta="14 G · 2.1 mm OD · ~270 mL/min · orange"
      tip="Antecubital fossa — resuscitation, blood, contrast injection."
      viewBox="0 0 240 130"
      ariaLabel="14 gauge cannula sited in the median cubital vein at the antecubital fossa"
    >
      {/* Forearm + upper arm flexed at elbow */}
      <path
        d="M10,40 C 30,30 70,28 100,38 C 115,42 125,50 130,62 C 138,80 165,90 200,92 L 230,92 L 230,118 L 10,118 Z"
        fill={`url(#${id}-skin)`}
        stroke="hsl(20 35% 50%)"
        strokeWidth={0.6}
      />
      {/* Antecubital crease */}
      <path d="M115,55 C 125,62 130,72 128,82" stroke="hsl(20 40% 45%)" strokeWidth={0.6} fill="none" opacity={0.5}/>
      {/* Stipple */}
      <path
        d="M10,40 C 30,30 70,28 100,38 C 115,42 125,50 130,62 C 138,80 165,90 200,92 L 230,92 L 230,118 L 10,118 Z"
        fill={`url(#${id}-stipple)`}
      />
      {/* Median cubital vein — Y shape */}
      <path d="M30,55 C 60,58 90,62 115,68 C 140,75 175,80 220,80"
        stroke={`url(#${id}-vein)`} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.75}/>
      <path d="M30,55 C 60,58 90,62 115,68 C 140,75 175,80 220,80"
        stroke={`url(#${id}-veinLumen)`} strokeWidth={3.5} fill="none" strokeLinecap="round" opacity={0.9}/>
      {/* basilic branch */}
      <path d="M115,68 C 130,82 150,95 180,105" stroke={`url(#${id}-vein)`} strokeWidth={5} fill="none" opacity={0.6}/>
      <path d="M115,68 C 130,82 150,95 180,105" stroke={`url(#${id}-veinLumen)`} strokeWidth={2} fill="none" opacity={0.85}/>

      {/* 14G cannula — wide bore, advancing into median cubital v. */}
      <AnimatedAdvance
        d="M170,75 L130,70"
        stroke="hsl(45 25% 92%)"
        strokeWidth={4.5}
        pathId={`${id}-shaft`}
        shadowId={id}
        dur="3.6s"
        tipColor="hsl(0 70% 50%)"
        tipR={2.4}
      />
      <CannulaHub x={170} y={70} color="hsl(28 85% 55%)" width={26} id={id} />
      <circle cx={170} cy={73} r={2.5} fill="hsl(0 60% 35%)" opacity={0.7}/>

      <text x={50} y={48} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>median cubital v.</text>
      <text x={140} y={102} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>basilic v.</text>
    </SceneFrame>
  );
};

/* 3. Midline in basilic */
const SceneMidline: React.FC = () => {
  const id = "vd-mid";
  return (
    <SceneFrame
      id={id}
      title="Midline catheter"
      meta="3–5 Fr · 8–20 cm · tip: axillary vein"
      tip="Mid-upper arm. NOT central — no vesicants. ≤4 weeks IV therapy."
      viewBox="0 0 320 110"
      ariaLabel="Midline catheter inserted into basilic vein with tip in the axillary vein"
    >
      {/* Upper arm — horizontal */}
      <path
        d="M5,30 L 305,30 C 312,30 315,35 315,45 L 315,75 C 315,85 312,90 305,90 L 5,90 Z"
        fill={`url(#${id}-skin)`}
        stroke="hsl(20 35% 50%)"
        strokeWidth={0.6}
      />
      <path
        d="M5,30 L 305,30 C 312,30 315,35 315,45 L 315,75 C 315,85 312,90 305,90 L 5,90 Z"
        fill={`url(#${id}-stipple)`}
      />
      {/* Basilic vein running medial */}
      <path d="M20,60 L 310,60" stroke={`url(#${id}-vein)`} strokeWidth={9} strokeLinecap="round" opacity={0.75}/>
      <path d="M20,60 L 310,60" stroke={`url(#${id}-veinLumen)`} strokeWidth={5} strokeLinecap="round" opacity={0.95}/>
      {/* Vein wall edges */}
      <line x1={20} y1={55.5} x2={310} y2={55.5} stroke="hsl(220 50% 25%)" strokeWidth={0.4} opacity={0.6}/>
      <line x1={20} y1={64.5} x2={310} y2={64.5} stroke="hsl(220 50% 25%)" strokeWidth={0.4} opacity={0.6}/>

      {/* Catheter advancing from entry (right) to axilla (left) */}
      <AnimatedAdvance
        d="M245,60 L50,60"
        stroke={`url(#${id}-cath)`}
        strokeWidth={3.5}
        pathId={`${id}-shaft`}
        shadowId={id}
        dur="5s"
        tipColor="hsl(45 25% 80%)"
        tipR={2}
      />

      {/* Hub at insertion */}
      <CannulaHub x={245} y={56} color="hsl(210 35% 45%)" width={24} id={id} />
      <circle cx={245} cy={60} r={2.2} fill="hsl(0 60% 35%)" opacity={0.7}/>

      {/* Tick markings on catheter */}
      {[80, 110, 140, 170, 200, 230].map((x) => (
        <line key={x} x1={x} y1={57} x2={x} y2={63} stroke="hsl(0 0% 30%)" strokeWidth={0.4} />
      ))}

      <text x={30} y={22} fontSize={8.5} fill="hsl(var(--foreground))" fontWeight={600}>tip — axillary v.</text>
      <text x={230} y={22} fontSize={8.5} fill="hsl(var(--foreground))" fontWeight={600}>basilic v. entry</text>
      <text x={155} y={104} fontSize={8} fill="hsl(var(--muted-foreground))" textAnchor="middle">upper arm</text>
    </SceneFrame>
  );
};

/* 4. PICC — full arm to chest */
const ScenePICC: React.FC = () => {
  const id = "vd-picc";
  return (
    <SceneFrame
      id={id}
      title="PICC line"
      meta="4–6 Fr · 1–3 lumens · tip: SVC / cavoatrial junction"
      tip="Basilic → axillary → subclavian → SVC. Weeks–months of therapy."
      viewBox="0 0 460 180"
      ariaLabel="PICC line traced from basilic vein in the upper arm to the cavoatrial junction"
    >
      {/* Arm (right side of frame) */}
      <path
        d="M455,55 L 230,55 C 215,55 200,65 195,80 L 190,95 C 188,108 195,118 210,120 L 455,120 Z"
        fill={`url(#${id}-skin)`}
        stroke="hsl(20 35% 50%)"
        strokeWidth={0.6}
      />
      {/* Chest/torso (left) */}
      <path
        d="M5,40 L 200,40 C 215,40 225,55 225,75 L 225,160 L 5,160 Z"
        fill={`url(#${id}-skin)`}
        stroke="hsl(20 35% 50%)"
        strokeWidth={0.6}
      />
      {/* Stipple overlay */}
      <path d="M5,40 L 200,40 C 215,40 225,55 225,75 L 225,160 L 5,160 Z" fill={`url(#${id}-stipple)`}/>
      <path d="M455,55 L 230,55 C 215,55 200,65 195,80 L 190,95 C 188,108 195,118 210,120 L 455,120 Z" fill={`url(#${id}-stipple)`}/>

      {/* Clavicle hint */}
      <path d="M40,60 Q 110,52 180,60" stroke="hsl(45 30% 80%)" strokeWidth={3} fill="none" opacity={0.5}/>

      {/* Heart silhouette */}
      <path d="M70,110 C 60,95 80,82 95,92 C 110,82 130,95 120,110 C 115,128 95,142 95,142 C 95,142 75,128 70,110 Z"
        fill="hsl(0 45% 55%)" opacity={0.35}/>
      <text x={95} y={120} fontSize={7} fill="hsl(0 0% 100%)" textAnchor="middle" fontWeight={700} opacity={0.85}>RA</text>

      {/* Venous route: basilic → axillary → subclavian → SVC → RA */}
      <path
        d="M440,90 L 280,90 C 250,90 230,82 215,72 C 200,62 180,62 160,68 C 140,74 125,82 115,95 C 108,105 100,115 95,128"
        stroke={`url(#${id}-vein)`} strokeWidth={9} fill="none" strokeLinecap="round" opacity={0.7}
      />
      <path
        d="M440,90 L 280,90 C 250,90 230,82 215,72 C 200,62 180,62 160,68 C 140,74 125,82 115,95 C 108,105 100,115 95,128"
        stroke={`url(#${id}-veinLumen)`} strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.85}
      />

      {/* PICC catheter inside vein */}
      <path
        d="M400,90 L 280,90 C 252,90 232,82 217,72 C 202,62 180,62 160,68 C 140,74 126,82 116,94 C 109,103 102,114 96,126"
        stroke={`url(#${id}-cath)`} strokeWidth={3} fill="none" strokeLinecap="round" filter={`url(#${id}-shadow)`}
      />
      <path
        d="M400,90 L 280,90 C 252,90 232,82 217,72 C 202,62 180,62 160,68 C 140,74 126,82 116,94 C 109,103 102,114 96,126"
        stroke="hsl(0 0% 20% / 0.3)" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.25}
      />
      {/* Tip marker at SVC/CAJ */}
      <circle cx={96} cy={126} r={2.5} fill="hsl(0 70% 50%)" />
      <text x={88} y={148} fontSize={7.5} fill="hsl(var(--foreground))" fontWeight={600}>SVC / CAJ</text>

      {/* Hub with two pigtails (dual-lumen PICC) */}
      <CVCHub x={400} y={90} id={id} lumens={[
        { color: "hsl(280 60% 50%)", label: "prox" },
        { color: "hsl(195 60% 45%)", label: "dist" },
      ]}/>

      {/* StatLock anchor pad */}
      <rect x={395} y={84} width={14} height={12} rx={2} fill="hsl(45 35% 90%)" stroke="hsl(0 0% 30%)" strokeWidth={0.4} opacity={0.85}/>

      {/* Labels */}
      <text x={420} y={75} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>basilic v.</text>
      <text x={250} y={80} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>axillary</text>
      <text x={170} y={56} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>subclavian</text>
      <text x={130} y={170} fontSize={7.5} fill="hsl(var(--muted-foreground))" textAnchor="middle">~50 cm catheter inside vein</text>
    </SceneFrame>
  );
};

/* 5. Triple-lumen CVC via right IJV */
const SceneCVC: React.FC = () => {
  const id = "vd-cvc";
  return (
    <SceneFrame
      id={id}
      title="Triple-lumen CVC"
      meta="7 Fr · 16 / 18 / 18 G lumens · ≤14 days"
      tip="Right IJV → SVC. Vasopressors, CVP, parenteral nutrition."
      viewBox="0 0 320 220"
      ariaLabel="Triple-lumen central venous catheter inserted in the right internal jugular vein"
    >
      {/* Neck + upper chest */}
      <path
        d="M5,20 L 130,20 C 140,20 145,30 148,45 L 152,75 C 155,90 165,100 180,105 L 315,105 L 315,215 L 5,215 Z"
        fill={`url(#${id}-skin)`}
        stroke="hsl(20 35% 50%)"
        strokeWidth={0.6}
      />
      <path d="M5,20 L 130,20 C 140,20 145,30 148,45 L 152,75 C 155,90 165,100 180,105 L 315,105 L 315,215 L 5,215 Z" fill={`url(#${id}-stipple)`}/>

      {/* SCM muscle hint */}
      <path d="M120,25 Q 135,55 158,90" stroke="hsl(20 35% 55%)" strokeWidth={6} fill="none" opacity={0.3}/>
      {/* Clavicle */}
      <path d="M130,108 Q 200,98 285,108" stroke="hsl(45 30% 80%)" strokeWidth={5} fill="none" opacity={0.6}/>
      <text x={205} y={102} fontSize={7.5} fill="hsl(var(--muted-foreground))" textAnchor="middle">clavicle</text>

      {/* IJV */}
      <path d="M118,25 C 125,55 135,85 148,115 L 160,150 L 175,180" stroke={`url(#${id}-vein)`} strokeWidth={11} fill="none" strokeLinecap="round" opacity={0.7}/>
      <path d="M118,25 C 125,55 135,85 148,115 L 160,150 L 175,180" stroke={`url(#${id}-veinLumen)`} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.9}/>

      {/* Carotid (sibling artery) */}
      <path d="M95,25 C 100,55 108,85 118,115" stroke="hsl(0 60% 50%)" strokeWidth={5} fill="none" opacity={0.5}/>
      <text x={80} y={45} fontSize={7} fill="hsl(0 60% 45%)" fontWeight={600}>CCA</text>

      {/* Heart silhouette */}
      <path d="M155,170 C 145,160 165,148 180,158 C 195,148 215,160 205,170 C 200,188 180,200 180,200 C 180,200 160,188 155,170 Z"
        fill="hsl(0 45% 55%)" opacity={0.3}/>

      {/* CVC catheter — entering right neck, descending into SVC */}
      <path d="M148,55 C 150,75 152,95 154,115 L 162,148 L 174,178"
        stroke={`url(#${id}-cath)`} strokeWidth={3.5} fill="none" strokeLinecap="round" filter={`url(#${id}-shadow)`}/>
      <path d="M148,55 C 150,75 152,95 154,115 L 162,148 L 174,178"
        stroke="hsl(0 0% 20% / 0.3)" strokeWidth={3.5} fill="none" strokeLinecap="round" opacity={0.3}/>
      {/* Tip */}
      <circle cx={174} cy={178} r={2.5} fill="hsl(0 70% 45%)"/>
      <text x={180} y={196} fontSize={7.5} fill="hsl(var(--foreground))" fontWeight={600}>tip — lower SVC</text>

      {/* Suture wings */}
      <rect x={142} y={50} width={12} height={8} rx={1.5} fill="hsl(45 35% 88%)" stroke="hsl(0 0% 25%)" strokeWidth={0.4}/>

      {/* Triple manifold + pigtails — emerging laterally */}
      <CVCHub x={148} y={48} id={id} lumens={[
        { color: "hsl(0 70% 50%)", label: "dist 16G" },
        { color: "hsl(195 70% 45%)", label: "med 18G" },
        { color: "hsl(280 55% 50%)", label: "prox 18G" },
      ]}/>

      {/* IJV label */}
      <text x={130} y={95} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>R IJV</text>
    </SceneFrame>
  );
};

/* 6. Vascath in IJV */
const SceneVascath: React.FC = () => {
  const id = "vd-vas";
  return (
    <SceneFrame
      id={id}
      title="Vascath / haemodialysis"
      meta="12–14 Fr · paired wide-bore lumens · ≥200 mL/min"
      tip="Right IJV preferred. RRT, plasma exchange. Wide bore = high flow."
      viewBox="0 0 320 220"
      ariaLabel="Large-bore vascath catheter in right internal jugular vein with two staggered lumens"
    >
      <path
        d="M5,20 L 130,20 C 140,20 145,30 148,45 L 152,75 C 155,90 165,100 180,105 L 315,105 L 315,215 L 5,215 Z"
        fill={`url(#${id}-skin)`}
        stroke="hsl(20 35% 50%)"
        strokeWidth={0.6}
      />
      <path d="M5,20 L 130,20 C 140,20 145,30 148,45 L 152,75 C 155,90 165,100 180,105 L 315,105 L 315,215 L 5,215 Z" fill={`url(#${id}-stipple)`}/>

      <path d="M130,108 Q 200,98 285,108" stroke="hsl(45 30% 80%)" strokeWidth={5} fill="none" opacity={0.6}/>

      {/* IJV — wider to accommodate large catheter */}
      <path d="M118,25 C 125,55 135,85 148,115 L 160,150 L 175,180" stroke={`url(#${id}-vein)`} strokeWidth={13} fill="none" strokeLinecap="round" opacity={0.7}/>
      <path d="M118,25 C 125,55 135,85 148,115 L 160,150 L 175,180" stroke={`url(#${id}-veinLumen)`} strokeWidth={7.5} fill="none" strokeLinecap="round" opacity={0.9}/>

      {/* Heart */}
      <path d="M155,170 C 145,160 165,148 180,158 C 195,148 215,160 205,170 C 200,188 180,200 180,200 C 180,200 160,188 155,170 Z"
        fill="hsl(0 45% 55%)" opacity={0.3}/>

      {/* Vascath shaft — much wider */}
      <path d="M148,55 C 150,75 152,95 154,115 L 162,150 L 175,180"
        stroke={`url(#${id}-cath)`} strokeWidth={6} fill="none" strokeLinecap="round" filter={`url(#${id}-shadow)`}/>
      <path d="M148,55 C 150,75 152,95 154,115 L 162,150 L 175,180"
        stroke="hsl(0 0% 20% / 0.3)" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.3}/>
      {/* Septum line down catheter showing two lumens */}
      <path d="M148,55 C 150,75 152,95 154,115 L 162,150 L 175,180"
        stroke="hsl(0 0% 30%)" strokeWidth={0.6} fill="none" opacity={0.6}/>

      {/* Staggered tips */}
      <circle cx={175} cy={180} r={3} fill="hsl(0 70% 50%)"/>
      <circle cx={170} cy={170} r={2.6} fill="hsl(195 70% 45%)"/>
      <text x={185} y={196} fontSize={7.5} fill="hsl(var(--foreground))" fontWeight={600}>staggered tips</text>

      {/* Two large pigtails — red arterial, blue venous */}
      <CVCHub x={148} y={48} id={id} lumens={[
        { color: "hsl(0 75% 48%)", label: "A" },
        { color: "hsl(210 70% 48%)", label: "V" },
      ]}/>

      {/* Suture wings - bigger */}
      <rect x={140} y={50} width={16} height={9} rx={1.5} fill="hsl(45 35% 88%)" stroke="hsl(0 0% 25%)" strokeWidth={0.4}/>

      <text x={130} y={95} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>R IJV</text>
    </SceneFrame>
  );
};

/* 7. Swan-Ganz introducer in IJV */
const SceneIntroducer: React.FC = () => {
  const id = "vd-int";
  return (
    <SceneFrame
      id={id}
      title="Swan-Ganz introducer sheath"
      meta="8.5–9 Fr · sideport + haemostatic valve"
      tip="Conduit for PA catheter, transvenous pacing wire, rapid volume."
      viewBox="0 0 320 220"
      ariaLabel="Swan-Ganz introducer sheath in right internal jugular vein with side-port and haemostatic valve"
    >
      <path
        d="M5,20 L 130,20 C 140,20 145,30 148,45 L 152,75 C 155,90 165,100 180,105 L 315,105 L 315,215 L 5,215 Z"
        fill={`url(#${id}-skin)`}
        stroke="hsl(20 35% 50%)"
        strokeWidth={0.6}
      />
      <path d="M5,20 L 130,20 C 140,20 145,30 148,45 L 152,75 C 155,90 165,100 180,105 L 315,105 L 315,215 L 5,215 Z" fill={`url(#${id}-stipple)`}/>

      <path d="M130,108 Q 200,98 285,108" stroke="hsl(45 30% 80%)" strokeWidth={5} fill="none" opacity={0.6}/>

      {/* IJV */}
      <path d="M118,25 C 125,55 135,85 148,115 L 160,150 L 175,180" stroke={`url(#${id}-vein)`} strokeWidth={12} fill="none" strokeLinecap="round" opacity={0.7}/>
      <path d="M118,25 C 125,55 135,85 148,115 L 160,150 L 175,180" stroke={`url(#${id}-veinLumen)`} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.9}/>

      {/* Heart */}
      <path d="M155,170 C 145,160 165,148 180,158 C 195,148 215,160 205,170 C 200,188 180,200 180,200 C 180,200 160,188 155,170 Z"
        fill="hsl(0 45% 55%)" opacity={0.3}/>

      {/* Sheath shaft (short, very wide) */}
      <path d="M148,60 C 150,85 154,115 158,145"
        stroke={`url(#${id}-cath)`} strokeWidth={6.5} fill="none" strokeLinecap="round" filter={`url(#${id}-shadow)`}/>
      <path d="M148,60 C 150,85 154,115 158,145"
        stroke="hsl(0 0% 20% / 0.3)" strokeWidth={6.5} fill="none" strokeLinecap="round" opacity={0.3}/>

      {/* PA catheter (yellow) emerging from sheath into RA/RV */}
      <path d="M158,145 C 162,160 175,170 188,178 C 200,184 210,186 215,180"
        stroke="hsl(50 90% 50%)" strokeWidth={2.6} fill="none" strokeLinecap="round" filter={`url(#${id}-shadow)`}/>
      {/* PAC balloon */}
      <circle cx={215} cy={180} r={4} fill="hsl(50 90% 75%)" stroke="hsl(40 60% 40%)" strokeWidth={0.5}/>

      {/* Haemostatic valve (large hub) + sideport */}
      <g filter={`url(#${id}-shadow)`}>
        {/* main valve body */}
        <rect x={138} y={38} width={20} height={22} rx={3} fill="hsl(40 75% 50%)" stroke="hsl(0 0% 20% / 0.4)" strokeWidth={0.5}/>
        <rect x={138} y={38} width={20} height={6} rx={2} fill="hsl(0 0% 100% / 0.25)"/>
        {/* diaphragm */}
        <circle cx={148} cy={42} r={3.5} fill="hsl(0 0% 25%)"/>
        {/* sideport tube */}
        <path d="M158,52 C 175,52 185,42 195,30" stroke="hsl(40 75% 50%)" strokeWidth={3.5} fill="none" strokeLinecap="round"/>
        {/* 3-way tap */}
        <circle cx={195} cy={30} r={4} fill="hsl(40 75% 50%)" stroke="hsl(0 0% 20% / 0.4)" strokeWidth={0.5}/>
        <line x1={195} y1={26} x2={195} y2={34} stroke="hsl(0 0% 20%)" strokeWidth={0.6}/>
        <line x1={191} y1={30} x2={199} y2={30} stroke="hsl(0 0% 20%)" strokeWidth={0.6}/>
      </g>

      <text x={205} y={28} fontSize={7.5} fill="hsl(var(--foreground))" fontWeight={600}>side-port</text>
      <text x={163} y={48} fontSize={7.5} fill="hsl(var(--foreground))" fontWeight={600}>valve</text>
      <text x={220} y={195} fontSize={7.5} fill="hsl(var(--foreground))" fontWeight={600}>PA catheter</text>
      <text x={130} y={95} fontSize={8} fill="hsl(var(--foreground))" fontWeight={600}>R IJV</text>
    </SceneFrame>
  );
};

// ──────────────────────────────────────────────────────────────────────
// Main export — grid of anatomical scenes
// ──────────────────────────────────────────────────────────────────────

export const VascularAccessDevicesDiagram: React.FC = () => {
  return (
    <figure className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <figcaption className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Vascular access devices — shown in their anatomical context
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Each device is illustrated <em>in situ</em> on its true insertion
          site — peripheral cannulae in hand and antecubital fossa veins,
          central devices in the right internal jugular descending to the
          SVC. Shaft thickness reflects relative French sizes; lumen count
          and hub colour follow ISO conventions.
        </p>
      </figcaption>

      <div className="p-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SceneHandCannula />
        <SceneACF14G />
        <SceneMidline />
        <ScenePICC />
        <SceneCVC />
        <SceneVascath />
        <SceneIntroducer />
      </div>
    </figure>
  );
};

// ──────────────────────────────────────────────────────────────────────
// Cross-section diagram — compares lumen geometry & flow.
// ──────────────────────────────────────────────────────────────────────

interface CrossSection {
  name: string;
  outerFr: number; // outer French (1 Fr = 0.33 mm)
  layout: "single" | "double" | "triple" | "quad-triplane";
  flow: string;
  use: string;
  hue: number;
}

const CROSS_SECTIONS: CrossSection[] = [
  {
    name: "20 G peripheral",
    outerFr: 3,
    layout: "single",
    flow: "60 mL/min",
    use: "Maintenance / induction",
    hue: 200,
  },
  {
    name: "14 G / RIC / trauma line",
    outerFr: 9,
    layout: "single",
    flow: ">500 mL/min (pressure-bag)",
    use: "Resus, massive transfusion",
    hue: 0,
  },
  {
    name: "Triple-lumen CVC (7 Fr)",
    outerFr: 7,
    layout: "triple",
    flow: "Distal 16 G ≈ 25 mL/min",
    use: "Vasopressors, CVP, TPN",
    hue: 350,
  },
  {
    name: "Vascath (12 Fr)",
    outerFr: 12,
    layout: "double",
    flow: "200–400 mL/min per lumen",
    use: "Haemodialysis, plasma exchange",
    hue: 150,
  },
  {
    name: "Swan introducer (8.5 Fr)",
    outerFr: 8.5,
    layout: "single",
    flow: "Single very wide bore (~10 Fr lumen)",
    use: "Conduit for PAC, rapid volume",
    hue: 40,
  },
];

export const VascularAccessCrossSectionDiagram: React.FC = () => {
  const W = 720;
  const cellW = W / CROSS_SECTIONS.length;
  const H = 240;
  const cy = 95;
  // Largest device sets the visual scale.
  const maxFr = Math.max(...CROSS_SECTIONS.map((c) => c.outerFr));
  const maxR = 36;

  return (
    <figure className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <figcaption className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Lumen geometry — why a CVC is not a resus line
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          End-on cross-sections drawn to scale (1 Fr = 0.33 mm OD). Maximum
          flow follows Hagen–Poiseuille — proportional to r⁴ and inversely
          proportional to length. A short, wide single lumen (14 G, RIC,
          introducer) outflows a long, narrow multi-lumen CVC by an order
          of magnitude.
        </p>
      </figcaption>
      <div className="p-3 overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto min-w-[640px]"
          role="img"
          aria-label="Cross-sectional comparison of vascular access device lumens"
        >
          {CROSS_SECTIONS.map((c, i) => {
            const cx = i * cellW + cellW / 2;
            const r = (c.outerFr / maxFr) * maxR;
            const wallColor = `hsl(${c.hue} 30% 55%)`;
            const lumenFill = `hsl(${c.hue} 60% 92%)`;
            return (
              <g key={c.name}>
                {/* Outer wall */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={wallColor}
                  stroke="hsl(var(--foreground))"
                  strokeOpacity={0.4}
                  strokeWidth={0.8}
                />
                {/* Lumens */}
                {c.layout === "single" && (
                  <circle cx={cx} cy={cy} r={r * 0.78} fill={lumenFill} />
                )}
                {c.layout === "double" && (
                  <>
                    <path
                      d={`M ${cx} ${cy - r * 0.85} A ${r * 0.85} ${r * 0.85} 0 0 1 ${cx} ${
                        cy + r * 0.85
                      } Z`}
                      fill={lumenFill}
                    />
                    <path
                      d={`M ${cx} ${cy - r * 0.85} A ${r * 0.85} ${r * 0.85} 0 0 0 ${cx} ${
                        cy + r * 0.85
                      } Z`}
                      fill={`hsl(${c.hue} 40% 80%)`}
                    />
                    <line
                      x1={cx}
                      y1={cy - r * 0.85}
                      x2={cx}
                      y2={cy + r * 0.85}
                      stroke={wallColor}
                      strokeWidth={1.2}
                    />
                  </>
                )}
                {c.layout === "triple" && (
                  <>
                    {[0, 120, 240].map((deg, idx) => {
                      const rad = (deg * Math.PI) / 180;
                      const lx = cx + Math.cos(rad) * r * 0.4;
                      const ly = cy + Math.sin(rad) * r * 0.4;
                      const sizes = [0.36, 0.28, 0.28];
                      return (
                        <circle
                          key={deg}
                          cx={lx}
                          cy={ly}
                          r={r * sizes[idx]}
                          fill={lumenFill}
                          stroke={wallColor}
                          strokeWidth={0.6}
                        />
                      );
                    })}
                  </>
                )}

                {/* Label */}
                <text
                  x={cx}
                  y={cy + r + 16}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill="hsl(var(--foreground))"
                >
                  {c.name}
                </text>
                <text
                  x={cx}
                  y={cy + r + 30}
                  textAnchor="middle"
                  fontSize={9}
                  fill="hsl(var(--muted-foreground))"
                >
                  {c.flow}
                </text>
                <text
                  x={cx}
                  y={cy + r + 44}
                  textAnchor="middle"
                  fontSize={9}
                  fill="hsl(var(--muted-foreground))"
                  fontStyle="italic"
                >
                  {c.use}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
};

export default VascularAccessDevicesDiagram;

/**
 * Reusable anatomical primitives used by the patient-positioning diagrams.
 *
 * The earlier diagrams represented the patient with circles + rectangles +
 * straight lines. These primitives render anatomically credible silhouettes
 * (skull with mandible + ear + hairline, deltoid → biceps → forearm with a
 * defined elbow, thigh → knee → calf → foot, gowned torso) using SVG paths
 * and shared gradients/filters so every diagram has a consistent look.
 *
 * All primitives accept an `(x, y)` anchor and optional `flip`/`scale` so a
 * caller can position them inside any viewBox without re-writing geometry.
 *
 * Colour philosophy:
 *   • Skin tones use HSL hues that read as "warm tan" on both light and
 *     dark themes — never pure white, never neon.
 *   • The hospital gown uses the existing `hsl(210 60% 70%)` body blue so
 *     the new components match the legacy palette.
 *   • A subtle radial highlight + drop-shadow give limbs depth without
 *     looking "plastic".
 */

import { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Shared <defs> — call <AnatomyDefs/> ONCE per parent <svg>.         */
/* ------------------------------------------------------------------ */

export const AnatomyDefs = ({ idPrefix = "anat" }: { idPrefix?: string }) => (
  <defs>
    {/*
     * Lighting model (shared across all primitives):
     *   • Key light from upper-left (≈ 35% / 25%) — diffuse warm.
     *   • Fill light bottom-right — cool, low intensity.
     *   • Soft contact-occlusion under each limb via dropshadow filter.
     * Gradients are intentionally low-saturation so themes stay calm.
     */}

    {/* SKIN — warm tan, three-stop radial with rim shadow.
        Highlight at upper-left, mid-tone wrap, deep terminator at lower-right. */}
    <radialGradient id={`${idPrefix}-skin`} cx="32%" cy="26%" r="85%">
      <stop offset="0%" stopColor="hsl(34 78% 90%)" />
      <stop offset="35%" stopColor="hsl(33 68% 82%)" />
      <stop offset="72%" stopColor="hsl(30 55% 72%)" />
      <stop offset="100%" stopColor="hsl(24 42% 56%)" />
    </radialGradient>

    {/* SKIN sheen overlay — narrow specular band, painted over limbs at low alpha. */}
    <linearGradient id={`${idPrefix}-skin-sheen`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="hsl(40 100% 98%)" stopOpacity="0.55" />
      <stop offset="22%" stopColor="hsl(40 100% 98%)" stopOpacity="0.18" />
      <stop offset="55%" stopColor="hsl(40 100% 98%)" stopOpacity="0" />
      <stop offset="100%" stopColor="hsl(20 40% 30%)" stopOpacity="0.18" />
    </linearGradient>

    {/* Hair gradient — slightly more contrast for depth */}
    <linearGradient id={`${idPrefix}-hair`} x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0%" stopColor="hsl(28 38% 32%)" />
      <stop offset="55%" stopColor="hsl(26 34% 24%)" />
      <stop offset="100%" stopColor="hsl(22 30% 16%)" />
    </linearGradient>

    {/* GOWN — soft blue, four-stop with subtle shadow on the underside */}
    <linearGradient id={`${idPrefix}-gown`} x1="0.25" y1="0" x2="0.75" y2="1">
      <stop offset="0%" stopColor="hsl(210 65% 84%)" />
      <stop offset="40%" stopColor="hsl(210 60% 75%)" />
      <stop offset="78%" stopColor="hsl(212 52% 62%)" />
      <stop offset="100%" stopColor="hsl(214 48% 50%)" />
    </linearGradient>

    {/* GOWN sheen — narrow off-axis highlight to imply pressed cotton */}
    <linearGradient id={`${idPrefix}-gown-sheen`} x1="0" y1="0" x2="1" y2="1.2">
      <stop offset="0%" stopColor="hsl(210 100% 98%)" stopOpacity="0.45" />
      <stop offset="30%" stopColor="hsl(210 100% 98%)" stopOpacity="0.12" />
      <stop offset="70%" stopColor="hsl(214 60% 30%)" stopOpacity="0" />
      <stop offset="100%" stopColor="hsl(216 60% 25%)" stopOpacity="0.22" />
    </linearGradient>

    {/* DRAPE — paper-warm neutral, top-lit */}
    <linearGradient id={`${idPrefix}-drape`} x1="0.3" y1="0" x2="0.7" y2="1">
      <stop offset="0%" stopColor="hsl(210 28% 95%)" />
      <stop offset="55%" stopColor="hsl(210 22% 86%)" />
      <stop offset="100%" stopColor="hsl(212 20% 72%)" />
    </linearGradient>

    {/* DRAPE fold-shadow — applied as an overlay along seam lines */}
    <linearGradient id={`${idPrefix}-drape-fold`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(212 25% 30%)" stopOpacity="0" />
      <stop offset="50%" stopColor="hsl(212 25% 30%)" stopOpacity="0.18" />
      <stop offset="100%" stopColor="hsl(212 25% 30%)" stopOpacity="0" />
    </linearGradient>

    {/* Ambient-occlusion gradient — a soft dark vignette painted under joints */}
    <radialGradient id={`${idPrefix}-ao`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="hsl(220 30% 12%)" stopOpacity="0.35" />
      <stop offset="60%" stopColor="hsl(220 30% 12%)" stopOpacity="0.12" />
      <stop offset="100%" stopColor="hsl(220 30% 12%)" stopOpacity="0" />
    </radialGradient>

    {/* Soft drop shadow — replaces the old single-blur version with a
        two-pass shadow (tight contact + wider ambient) for depth. */}
    <filter id={`${idPrefix}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
      {/* Tight contact shadow */}
      <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" result="contact" />
      <feOffset in="contact" dx="0" dy="0.6" result="contactOff" />
      <feComponentTransfer in="contactOff" result="contactA">
        <feFuncA type="linear" slope="0.45" />
      </feComponentTransfer>
      {/* Wider ambient shadow */}
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="ambient" />
      <feOffset in="ambient" dx="0.6" dy="2.4" result="ambientOff" />
      <feComponentTransfer in="ambientOff" result="ambientA">
        <feFuncA type="linear" slope="0.22" />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="ambientA" />
        <feMergeNode in="contactA" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    {/* Inner-shadow filter — used by gown/drape to imply concavity at neck/folds */}
    <filter id={`${idPrefix}-inner`} x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="blur" />
      <feOffset in="blur" dx="0" dy="1.2" result="off" />
      <feComposite in="off" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="inner" />
      <feColorMatrix in="inner" type="matrix"
        values="0 0 0 0 0.08
                0 0 0 0 0.10
                0 0 0 0 0.18
                0 0 0 0.45 0" result="innerC" />
      <feComposite in="innerC" in2="SourceGraphic" operator="in" result="innerMasked" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="innerMasked" />
      </feMerge>
    </filter>
  </defs>
);

/** Reusable soft contact-shadow blob — drop under a limb/torso for grounding. */
export const ContactShadow = ({
  cx,
  cy,
  rx,
  ry,
  idPrefix = "anat",
  opacity = 0.35,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  idPrefix?: string;
  opacity?: number;
}) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${idPrefix}-ao)`} opacity={opacity} />
);

const SKIN = (p: string) => `url(#${p}-skin)`;
const HAIR = (p: string) => `url(#${p}-hair)`;
const GOWN = (p: string) => `url(#${p}-gown)`;
const STROKE_SKIN = "hsl(28 50% 38%)";
const STROKE_GOWN = "hsl(210 55% 32%)";

/* ------------------------------------------------------------------ */
/*  HEAD — front view (used supine, prone, Trendelenburg, beach chair) */
/* ------------------------------------------------------------------ */

interface HeadProps {
  /** Centre of the cranium */
  cx: number;
  cy: number;
  /** Radius of the cranium */
  r?: number;
  /** Rotation in degrees about (cx, cy). */
  rotate?: number;
  idPrefix?: string;
  /** Show closed-eye line (default true). */
  closedEyes?: boolean;
  /** Hair colour key — default brown. */
  bald?: boolean;
}

/**
 * Front-of-head silhouette: cranium + receding hairline + closed eyes +
 * gentle nasal ridge. Reads well at 18–24 px radius.
 */
export const HeadFront = ({
  cx,
  cy,
  r = 20,
  rotate = 0,
  idPrefix = "anat",
  closedEyes = true,
  bald = false,
}: HeadProps) => {
  const transform = rotate ? `rotate(${rotate} ${cx} ${cy})` : undefined;
  return (
    <g transform={transform} filter={`url(#${idPrefix}-shadow)`}>
      {/* Cranium */}
      <circle cx={cx} cy={cy} r={r} fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={1.2} />
      {/* Hair cap (top half) */}
      {!bald && (
        <path
          d={`M ${cx - r * 0.95},${cy - r * 0.15}
              Q ${cx - r * 0.9},${cy - r * 1.05} ${cx},${cy - r * 1.02}
              Q ${cx + r * 0.9},${cy - r * 1.05} ${cx + r * 0.95},${cy - r * 0.15}
              Q ${cx + r * 0.55},${cy - r * 0.45} ${cx},${cy - r * 0.35}
              Q ${cx - r * 0.55},${cy - r * 0.45} ${cx - r * 0.95},${cy - r * 0.15} Z`}
          fill={HAIR(idPrefix)}
        />
      )}
      {/* Ears (just visible at the temples) */}
      <ellipse cx={cx - r * 0.95} cy={cy + r * 0.05} rx={r * 0.12} ry={r * 0.22}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.8} />
      <ellipse cx={cx + r * 0.95} cy={cy + r * 0.05} rx={r * 0.12} ry={r * 0.22}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.8} />
      {/* Nose ridge */}
      <path
        d={`M ${cx},${cy - r * 0.15} Q ${cx + r * 0.08},${cy + r * 0.05} ${cx},${cy + r * 0.18}`}
        fill="none" stroke={STROKE_SKIN} strokeWidth={0.7} opacity={0.5}
      />
      {/* Closed eyes */}
      {closedEyes && (
        <>
          <path d={`M ${cx - r * 0.45},${cy - r * 0.05} Q ${cx - r * 0.3},${cy} ${cx - r * 0.15},${cy - r * 0.05}`}
            fill="none" stroke={STROKE_SKIN} strokeWidth={0.9} />
          <path d={`M ${cx + r * 0.15},${cy - r * 0.05} Q ${cx + r * 0.3},${cy} ${cx + r * 0.45},${cy - r * 0.05}`}
            fill="none" stroke={STROKE_SKIN} strokeWidth={0.9} />
        </>
      )}
      {/* Mouth (relaxed, slightly parted) */}
      <line x1={cx - r * 0.18} y1={cy + r * 0.45} x2={cx + r * 0.18} y2={cy + r * 0.45}
        stroke={STROKE_SKIN} strokeWidth={0.8} opacity={0.55} />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/*  HEAD — profile view (used lateral, park-bench, sitting)            */
/* ------------------------------------------------------------------ */

interface HeadProfileProps extends HeadProps {
  /** "left" = patient faces left (head on left side of table). */
  facing?: "left" | "right";
  /** Optional chin-flexed angle on the neck (deg). */
  chinFlex?: number;
}

export const HeadProfile = ({
  cx,
  cy,
  r = 20,
  rotate = 0,
  idPrefix = "anat",
  facing = "left",
  closedEyes = true,
  bald = false,
}: HeadProfileProps) => {
  const flip = facing === "right" ? -1 : 1;
  const transform = `${rotate ? `rotate(${rotate} ${cx} ${cy})` : ""}${
    flip === -1 ? ` translate(${cx * 2} 0) scale(-1 1)` : ""
  }`.trim() || undefined;
  return (
    <g transform={transform} filter={`url(#${idPrefix}-shadow)`}>
      {/* Cranium + face profile */}
      <path
        d={`M ${cx + r * 0.55},${cy - r * 0.85}
            Q ${cx - r * 0.55},${cy - r * 1.05} ${cx - r * 0.95},${cy - r * 0.2}
            Q ${cx - r * 1.05},${cy + r * 0.45} ${cx - r * 0.6},${cy + r * 0.85}
            Q ${cx - r * 0.2},${cy + r * 1.0} ${cx + r * 0.05},${cy + r * 0.95}
            L ${cx + r * 0.15},${cy + r * 0.6}
            Q ${cx + r * 0.55},${cy + r * 0.5} ${cx + r * 0.65},${cy + r * 0.2}
            L ${cx + r * 0.55},${cy - r * 0.05}
            L ${cx + r * 0.7},${cy - r * 0.1}
            L ${cx + r * 0.6},${cy - r * 0.4}
            L ${cx + r * 0.7},${cy - r * 0.55}
            Z`}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={1.2} strokeLinejoin="round"
      />
      {/* Hair cap */}
      {!bald && (
        <path
          d={`M ${cx - r * 0.9},${cy - r * 0.15}
              Q ${cx - r * 0.55},${cy - r * 1.05} ${cx + r * 0.55},${cy - r * 0.85}
              L ${cx + r * 0.45},${cy - r * 0.55}
              Q ${cx - r * 0.2},${cy - r * 0.55} ${cx - r * 0.55},${cy - r * 0.25}
              Z`}
          fill={HAIR(idPrefix)}
        />
      )}
      {/* Ear (clearly visible in profile) */}
      <path
        d={`M ${cx - r * 0.15},${cy - r * 0.05}
            Q ${cx - r * 0.4},${cy - r * 0.15} ${cx - r * 0.4},${cy + r * 0.2}
            Q ${cx - r * 0.4},${cy + r * 0.45} ${cx - r * 0.15},${cy + r * 0.4}
            Q ${cx - r * 0.22},${cy + r * 0.18} ${cx - r * 0.15},${cy - r * 0.05} Z`}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9}
      />
      {/* Closed eye */}
      {closedEyes && (
        <path
          d={`M ${cx + r * 0.18},${cy - r * 0.1} Q ${cx + r * 0.32},${cy - r * 0.02} ${cx + r * 0.45},${cy - r * 0.08}`}
          fill="none" stroke={STROKE_SKIN} strokeWidth={0.9}
        />
      )}
      {/* Nostril hint */}
      <circle cx={cx + r * 0.62} cy={cy + r * 0.18} r={0.7} fill={STROKE_SKIN} opacity={0.7} />
      {/* Lips */}
      <path
        d={`M ${cx + r * 0.32},${cy + r * 0.55} Q ${cx + r * 0.45},${cy + r * 0.62} ${cx + r * 0.55},${cy + r * 0.5}`}
        fill="none" stroke={STROKE_SKIN} strokeWidth={0.8} opacity={0.6}
      />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/*  ARM — shoulder → biceps → elbow → forearm → hand                   */
/* ------------------------------------------------------------------ */

interface ArmProps {
  /** Shoulder anchor */
  sx: number;
  sy: number;
  /** Elbow */
  ex: number;
  ey: number;
  /** Wrist */
  wx: number;
  wy: number;
  /** Optional hand length (default 12) */
  handLen?: number;
  /** Upper-arm width and forearm width */
  upperW?: number;
  foreW?: number;
  idPrefix?: string;
  /** Render the gown sleeve over the upper arm. */
  gownSleeve?: boolean;
}

/**
 * Articulated arm with tapered upper-arm + forearm, a proper elbow joint,
 * a hand silhouette with a thumb, and an optional gown sleeve with cuff
 * + crease folds. The elbow is offset slightly toward the joint axis to
 * give the limb a credible bend rather than a kinked stick.
 */
export const Arm = ({
  sx, sy, ex, ey, wx, wy,
  handLen = 12, upperW = 13, foreW = 11,
  idPrefix = "anat", gownSleeve = false,
}: ArmProps) => {
  // Build a tapered "rounded rectangle" along an arbitrary axis.
  const taperedLimb = (
    x1: number, y1: number, x2: number, y2: number,
    w1: number, w2: number,
  ) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len; // unit normal
    const ny = dx / len;
    const a1x = x1 + nx * w1 / 2, a1y = y1 + ny * w1 / 2;
    const a2x = x1 - nx * w1 / 2, a2y = y1 - ny * w1 / 2;
    const b1x = x2 + nx * w2 / 2, b1y = y2 + ny * w2 / 2;
    const b2x = x2 - nx * w2 / 2, b2y = y2 - ny * w2 / 2;
    // Round both ends with a small arc tangent to the limb axis.
    const cap1 = `A ${w1 / 2} ${w1 / 2} 0 0 1 ${a2x} ${a2y}`;
    const cap2 = `A ${w2 / 2} ${w2 / 2} 0 0 1 ${b1x} ${b1y}`;
    return `M ${a1x},${a1y} L ${b1x},${b1y} ${cap2} L ${a2x},${a2y} ${cap1} Z`;
  };

  // Forearm vector + hand placement
  const fdx = wx - ex, fdy = wy - ey;
  const flen = Math.hypot(fdx, fdy) || 1;
  const fux = fdx / flen, fuy = fdy / flen;
  const fnx = -fuy, fny = fux; // normal to forearm
  // Hand (palm) centre and tip
  const palmX = wx + fux * handLen * 0.45;
  const palmY = wy + fuy * handLen * 0.45;
  const tipX = wx + fux * handLen;
  const tipY = wy + fuy * handLen;
  // Thumb anchor (radial side, ~45° off the palm)
  const thumbBaseX = palmX + fnx * foreW * 0.4;
  const thumbBaseY = palmY + fny * foreW * 0.4;
  const thumbTipX = thumbBaseX + (fux + fnx) * 0.5 * handLen * 0.55;
  const thumbTipY = thumbBaseY + (fuy + fny) * 0.5 * handLen * 0.55;
  const armRot = (Math.atan2(fuy, fux) * 180) / Math.PI;

  const upperFill = gownSleeve ? GOWN(idPrefix) : SKIN(idPrefix);
  const upperStroke = gownSleeve ? STROKE_GOWN : STROKE_SKIN;

  return (
    <g filter={`url(#${idPrefix}-shadow)`}>
      {/* Upper arm — tapered (deltoid → biceps narrows toward elbow) */}
      <path
        d={taperedLimb(sx, sy, ex, ey, upperW * 1.05, upperW * 0.78)}
        fill={upperFill} stroke={upperStroke} strokeWidth={1} strokeLinejoin="round"
      />
      {/* Sheen overlay on upper arm */}
      <path
        d={taperedLimb(sx, sy, ex, ey, upperW * 1.05, upperW * 0.78)}
        fill={`url(#${idPrefix}-${gownSleeve ? "gown-sheen" : "skin-sheen"})`}
        pointerEvents="none"
      />
      {gownSleeve && (
        <>
          {/* Sleeve cuff just above the elbow */}
          <line
            x1={ex - (sx - ex) * 0.18 - fnx * upperW * 0.45}
            y1={ey - (sy - ey) * 0.18 - fny * upperW * 0.45}
            x2={ex - (sx - ex) * 0.18 + fnx * upperW * 0.45}
            y2={ey - (sy - ey) * 0.18 + fny * upperW * 0.45}
            stroke={STROKE_GOWN} strokeWidth={0.9} opacity={0.55}
          />
          {/* Two short shoulder folds */}
          <path
            d={`M ${sx + (ex - sx) * 0.15},${sy + (ey - sy) * 0.15}
                L ${sx + (ex - sx) * 0.45},${sy + (ey - sy) * 0.45}`}
            stroke={STROKE_GOWN} strokeWidth={0.5} opacity={0.4} fill="none"
          />
        </>
      )}
      {/* Elbow joint — slightly oval to read as a real joint */}
      <ellipse
        cx={ex} cy={ey}
        rx={upperW * 0.46} ry={upperW * 0.4}
        transform={`rotate(${armRot} ${ex} ${ey})`}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9}
      />
      {/* Forearm — tapers from elbow toward the wrist */}
      <path
        d={taperedLimb(ex, ey, wx, wy, foreW * 1.02, foreW * 0.78)}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9} strokeLinejoin="round"
      />
      {/* Faint flexor crease along the inside of the forearm */}
      <path
        d={`M ${ex - fnx * foreW * 0.18},${ey - fny * foreW * 0.18}
            L ${wx - fnx * foreW * 0.18},${wy - fny * foreW * 0.18}`}
        stroke={STROKE_SKIN} strokeWidth={0.4} opacity={0.35} fill="none"
      />
      {/* Wrist */}
      <ellipse
        cx={wx} cy={wy}
        rx={foreW * 0.42} ry={foreW * 0.3}
        transform={`rotate(${armRot} ${wx} ${wy})`}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.7}
      />
      {/* Hand — palm + thumb */}
      <g transform={`rotate(${armRot} ${palmX} ${palmY})`}>
        <ellipse
          cx={palmX} cy={palmY}
          rx={handLen * 0.6} ry={foreW * 0.5}
          fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.8}
        />
        {/* Knuckle hint */}
        <path
          d={`M ${palmX + handLen * 0.2},${palmY - foreW * 0.32}
              Q ${palmX + handLen * 0.45},${palmY - foreW * 0.15}
                ${palmX + handLen * 0.55},${palmY + foreW * 0.05}`}
          stroke={STROKE_SKIN} strokeWidth={0.5} opacity={0.4} fill="none"
        />
      </g>
      {/* Finger tip taper */}
      <ellipse
        cx={(palmX + tipX) / 2}
        cy={(palmY + tipY) / 2}
        rx={handLen * 0.32}
        ry={foreW * 0.36}
        transform={`rotate(${armRot} ${(palmX + tipX) / 2} ${(palmY + tipY) / 2})`}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.6}
      />
      {/* Thumb */}
      <path
        d={`M ${thumbBaseX},${thumbBaseY}
            Q ${(thumbBaseX + thumbTipX) / 2 + fnx * 1.5},${(thumbBaseY + thumbTipY) / 2 + fny * 1.5}
              ${thumbTipX},${thumbTipY}`}
        stroke={SKIN(idPrefix)} strokeWidth={foreW * 0.42} strokeLinecap="round" fill="none"
      />
      <path
        d={`M ${thumbBaseX},${thumbBaseY}
            Q ${(thumbBaseX + thumbTipX) / 2 + fnx * 1.5},${(thumbBaseY + thumbTipY) / 2 + fny * 1.5}
              ${thumbTipX},${thumbTipY}`}
        stroke={STROKE_SKIN} strokeWidth={0.5} opacity={0.5} fill="none"
      />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/*  LEG — hip → thigh → knee → calf → foot                             */
/* ------------------------------------------------------------------ */

interface LegProps {
  hx: number; hy: number; // hip
  kx: number; ky: number; // knee
  ax: number; ay: number; // ankle
  thighW?: number;
  calfW?: number;
  footLen?: number;
  /** Direction the foot points from the ankle (deg from +x axis). */
  footAngle?: number;
  idPrefix?: string;
  /** Cover the thigh with a gown / drape colour. */
  draped?: boolean;
}

export const Leg = ({
  hx, hy, kx, ky, ax, ay,
  thighW = 22, calfW = 17, footLen = 18, footAngle,
  idPrefix = "anat", draped = false,
}: LegProps) => {
  const fillColor = draped ? `url(#${idPrefix}-drape)` : SKIN(idPrefix);
  const strokeColor = draped ? "hsl(210 20% 50%)" : STROKE_SKIN;

  // Tapered limb path helper (also used by Arm).
  const taperedLimb = (
    x1: number, y1: number, x2: number, y2: number,
    w1: number, w2: number,
  ) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const a1x = x1 + nx * w1 / 2, a1y = y1 + ny * w1 / 2;
    const a2x = x1 - nx * w1 / 2, a2y = y1 - ny * w1 / 2;
    const b1x = x2 + nx * w2 / 2, b1y = y2 + ny * w2 / 2;
    const b2x = x2 - nx * w2 / 2, b2y = y2 - ny * w2 / 2;
    const cap1 = `A ${w1 / 2} ${w1 / 2} 0 0 1 ${a2x} ${a2y}`;
    const cap2 = `A ${w2 / 2} ${w2 / 2} 0 0 1 ${b1x} ${b1y}`;
    return `M ${a1x},${a1y} L ${b1x},${b1y} ${cap2} L ${a2x},${a2y} ${cap1} Z`;
  };

  // Thigh & calf vectors
  const tdx = kx - hx, tdy = ky - hy;
  const tlen = Math.hypot(tdx, tdy) || 1;
  const tnx = -tdy / tlen, tny = tdx / tlen;
  const cdx = ax - kx, cdy = ay - ky;
  const clen = Math.hypot(cdx, cdy) || 1;
  const cux = cdx / clen, cuy = cdy / clen;
  const calfAngleDeg = (Math.atan2(cdy, cdx) * 180) / Math.PI;
  const footRot = footAngle ?? calfAngleDeg + 90;

  return (
    <g filter={`url(#${idPrefix}-shadow)`}>
      {/* Thigh — tapers from hip (wide) to knee (narrower) */}
      <path
        d={taperedLimb(hx, hy, kx, ky, thighW * 1.05, thighW * 0.78)}
        fill={fillColor} stroke={strokeColor} strokeWidth={1} strokeLinejoin="round"
      />
      {draped && (
        <>
          {/* Drape folds along the thigh */}
          <path
            d={`M ${hx + tnx * thighW * 0.25},${hy + tny * thighW * 0.25}
                Q ${(hx + kx) / 2 + tnx * thighW * 0.18},${(hy + ky) / 2 + tny * thighW * 0.18}
                  ${kx + tnx * thighW * 0.05},${ky + tny * thighW * 0.05}`}
            stroke={strokeColor} strokeWidth={0.6} opacity={0.45} fill="none"
          />
          <path
            d={`M ${hx - tnx * thighW * 0.2},${hy - tny * thighW * 0.2}
                Q ${(hx + kx) / 2 - tnx * thighW * 0.28},${(hy + ky) / 2 - tny * thighW * 0.28}
                  ${kx - tnx * thighW * 0.1},${ky - tny * thighW * 0.1}`}
            stroke={strokeColor} strokeWidth={0.6} opacity={0.45} fill="none"
          />
          {/* Drape hem just above the knee */}
          <path
            d={`M ${kx + tnx * thighW * 0.5},${ky + tny * thighW * 0.5}
                Q ${kx},${ky + 1}
                  ${kx - tnx * thighW * 0.5},${ky - tny * thighW * 0.5}`}
            stroke={strokeColor} strokeWidth={0.9} opacity={0.55} fill="none"
          />
        </>
      )}
      {/* Knee — patella (skin even when thigh is draped) */}
      <ellipse
        cx={kx} cy={ky}
        rx={thighW * 0.42} ry={thighW * 0.36}
        transform={`rotate(${calfAngleDeg} ${kx} ${ky})`}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9}
      />
      {/* Patellar dimple */}
      <ellipse
        cx={kx + cux * thighW * 0.05}
        cy={ky + cuy * thighW * 0.05}
        rx={thighW * 0.18} ry={thighW * 0.12}
        transform={`rotate(${calfAngleDeg} ${kx} ${ky})`}
        fill="none" stroke={STROKE_SKIN} strokeWidth={0.5} opacity={0.35}
      />
      {/* Calf — bulges proximally, tapers to ankle */}
      <path
        d={taperedLimb(kx, ky, ax, ay, calfW * 1.05, calfW * 0.7)}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9} strokeLinejoin="round"
      />
      {/* Tibial ridge hint (front of calf) */}
      <path
        d={`M ${kx + cux * calfW * 0.4},${ky + cuy * calfW * 0.4}
            L ${ax - cux * calfW * 0.3},${ay - cuy * calfW * 0.3}`}
        stroke={STROKE_SKIN} strokeWidth={0.4} opacity={0.3} fill="none"
      />
      {/* Ankle (malleolus) */}
      <ellipse
        cx={ax} cy={ay}
        rx={calfW * 0.36} ry={calfW * 0.28}
        transform={`rotate(${calfAngleDeg} ${ax} ${ay})`}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.8}
      />
      {/* Foot — heel pad → arch → ball → toes */}
      <g transform={`rotate(${footRot} ${ax} ${ay})`}>
        <path
          d={`M ${ax - footLen * 0.18},${ay - calfW * 0.05}
              Q ${ax - footLen * 0.22},${ay + calfW * 0.45}
                ${ax + footLen * 0.05},${ay + calfW * 0.5}
              L ${ax + footLen * 0.55},${ay + calfW * 0.5}
              Q ${ax + footLen * 1.02},${ay + calfW * 0.42}
                ${ax + footLen * 1.02},${ay + calfW * 0.05}
              Q ${ax + footLen * 0.98},${ay - calfW * 0.18}
                ${ax + footLen * 0.55},${ay - calfW * 0.32}
              Q ${ax + footLen * 0.2},${ay - calfW * 0.42}
                ${ax - footLen * 0.05},${ay - calfW * 0.32}
              Z`}
          fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9} strokeLinejoin="round"
        />
        {/* Arch crease (medial longitudinal arch) */}
        <path
          d={`M ${ax + footLen * 0.05},${ay + calfW * 0.5}
              Q ${ax + footLen * 0.4},${ay + calfW * 0.32}
                ${ax + footLen * 0.85},${ay + calfW * 0.4}`}
          stroke={STROKE_SKIN} strokeWidth={0.5} opacity={0.4} fill="none"
        />
        {/* Toe separators */}
        <line x1={ax + footLen * 0.85} y1={ay - calfW * 0.18} x2={ax + footLen * 0.95} y2={ay + calfW * 0.05}
          stroke={STROKE_SKIN} strokeWidth={0.4} opacity={0.4} />
        <line x1={ax + footLen * 0.78} y1={ay - calfW * 0.25} x2={ax + footLen * 0.86} y2={ay - calfW * 0.05}
          stroke={STROKE_SKIN} strokeWidth={0.35} opacity={0.35} />
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/*  SUPINE TORSO — anatomical taper from shoulders → chest → waist     */
/* ------------------------------------------------------------------ */

interface TorsoSupineProps {
  /** Top-left of bounding box (at the shoulder line) */
  x: number;
  y: number;
  /** Length head→hip and shoulder width */
  length?: number;
  shoulderW?: number;
  waistW?: number;
  hipW?: number;
  idPrefix?: string;
  /** Render hospital-gown stripes/seam. */
  showGown?: boolean;
}

/**
 * Supine torso, head to the LEFT (caller flips/rotates as needed).
 * Renders a tapered silhouette with delts, chest and a slight waist nip.
 */
export const TorsoSupine = ({
  x, y,
  length = 220,
  shoulderW = 52,
  waistW = 38,
  hipW = 46,
  idPrefix = "anat",
  showGown = true,
}: TorsoSupineProps) => {
  const cy = y + shoulderW / 2; // body centreline
  // X anchors along body (head→hip)
  const xShoulder = x + 8;
  const xChest = x + length * 0.25;
  const xWaist = x + length * 0.6;
  const xHip = x + length;
  return (
    <g filter={`url(#${idPrefix}-shadow)`}>
      {/* Neck */}
      <rect x={x - 6} y={cy - 14} width={20} height={28} rx={4}
        fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9} />
      {/* Body silhouette + sheen overlay (computed once) */}
      {(() => {
        const d = `M ${xShoulder},${cy - shoulderW / 2}
            Q ${xChest},${cy - shoulderW / 2 - 4} ${xChest + 8},${cy - shoulderW / 2 + 2}
            L ${xWaist},${cy - waistW / 2}
            Q ${xWaist + 30},${cy - waistW / 2 - 1} ${xHip},${cy - hipW / 2}
            L ${xHip + 6},${cy - hipW / 2 + 4}
            L ${xHip + 6},${cy + hipW / 2 - 4}
            L ${xHip},${cy + hipW / 2}
            Q ${xWaist + 30},${cy + waistW / 2 + 1} ${xWaist},${cy + waistW / 2}
            L ${xChest + 8},${cy + shoulderW / 2 - 2}
            Q ${xChest},${cy + shoulderW / 2 + 4} ${xShoulder},${cy + shoulderW / 2}
            Z`;
        return (
          <>
            <path d={d}
              fill={showGown ? GOWN(idPrefix) : SKIN(idPrefix)}
              stroke={showGown ? STROKE_GOWN : STROKE_SKIN}
              strokeWidth={1.2}
            />
            <path d={d}
              fill={`url(#${idPrefix}-${showGown ? "gown-sheen" : "skin-sheen"})`}
              pointerEvents="none"
            />
            {/* Soft occlusion at the waist tuck */}
            <ellipse
              cx={xWaist + 4} cy={cy + waistW / 2 - 1}
              rx={length * 0.22} ry={4}
              fill={`url(#${idPrefix}-ao)`} opacity={0.55} pointerEvents="none"
            />
          </>
        );
      })()}
      {showGown && (
        <>
          {/* Centre seam */}
          <line x1={xShoulder + 4} y1={cy} x2={xHip} y2={cy}
            stroke={STROKE_GOWN} strokeWidth={0.6} opacity={0.5} strokeDasharray="2 2" />
          {/* Sternum hint */}
          <line x1={xChest + 8} y1={cy - shoulderW * 0.18} x2={xChest + 30} y2={cy - shoulderW * 0.1}
            stroke={STROKE_GOWN} strokeWidth={0.5} opacity={0.4} />
          <line x1={xChest + 8} y1={cy + shoulderW * 0.18} x2={xChest + 30} y2={cy + shoulderW * 0.1}
            stroke={STROKE_GOWN} strokeWidth={0.5} opacity={0.4} />
        </>
      )}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/*  LATERAL TORSO — side-on profile                                    */
/* ------------------------------------------------------------------ */

interface TorsoLateralProps {
  /** Centre of the torso */
  cx: number;
  cy: number;
  length?: number;
  height?: number;
  idPrefix?: string;
  /** Direction the patient faces ("left" = head on viewer-left). */
  facing?: "left" | "right";
  showGown?: boolean;
}

/**
 * Side-on torso silhouette for lateral / park-bench. Has a discernible
 * chest, soft abdomen, and small lordotic curve along the back.
 */
export const TorsoLateral = ({
  cx, cy, length = 240, height = 60, idPrefix = "anat",
  facing = "left", showGown = true,
}: TorsoLateralProps) => {
  const flip = facing === "right" ? -1 : 1;
  const x0 = cx - length / 2;
  const x1 = cx + length / 2;
  const top = cy - height / 2;
  const bot = cy + height / 2;
  // head end (neck) on left, hip on right
  const path = `
    M ${x0 + 4},${top + height * 0.35}
    Q ${x0 + 18},${top - 2} ${x0 + length * 0.18},${top + 2}
    Q ${cx - length * 0.05},${top - 4} ${cx + length * 0.2},${top + 4}
    Q ${x1 - 14},${top + 8} ${x1 - 2},${top + height * 0.45}
    Q ${x1 - 2},${bot - 4} ${x1 - 14},${bot - 2}
    Q ${cx + length * 0.15},${bot + 6} ${cx - length * 0.05},${bot + 4}
    Q ${x0 + length * 0.18},${bot} ${x0 + 18},${bot + 2}
    Q ${x0 + 4},${bot - height * 0.35} ${x0 + 4},${top + height * 0.35} Z
  `;
  const transform = flip === -1 ? `translate(${cx * 2} 0) scale(-1 1)` : undefined;
  return (
    <g transform={transform} filter={`url(#${idPrefix}-shadow)`}>
      <path d={path}
        fill={showGown ? GOWN(idPrefix) : SKIN(idPrefix)}
        stroke={showGown ? STROKE_GOWN : STROKE_SKIN}
        strokeWidth={1.2} strokeLinejoin="round" />
      {/* Sheen overlay */}
      <path d={path}
        fill={`url(#${idPrefix}-${showGown ? "gown-sheen" : "skin-sheen"})`}
        pointerEvents="none"
      />
      {/* Underside contact-occlusion along the back */}
      <path
        d={`M ${x0 + 18},${bot - 2} Q ${cx},${bot + 8} ${x1 - 14},${bot - 2}`}
        fill="none" stroke="hsl(220 30% 12%)" strokeWidth={3.5}
        opacity={0.18} strokeLinecap="round" pointerEvents="none"
      />
      {/* Spine reference (back) */}
      <path
        d={`M ${x0 + 18},${top + 4} Q ${cx},${top - 2} ${x1 - 14},${top + 8}`}
        fill="none" stroke={STROKE_GOWN} strokeWidth={0.6} opacity={0.45} strokeDasharray="2 2"
      />
      {/* Chest swell */}
      <path
        d={`M ${x0 + length * 0.22},${cy + 2} Q ${x0 + length * 0.32},${cy - height * 0.18} ${x0 + length * 0.4},${cy - 4}`}
        fill="none" stroke={STROKE_GOWN} strokeWidth={0.6} opacity={0.4}
      />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/*  PRONE TORSO — slightly thinner, no breast contour                  */
/* ------------------------------------------------------------------ */

export const TorsoProne = ({
  x, y, length = 250, shoulderW = 50, hipW = 44, idPrefix = "anat", showGown = true,
}: {
  x: number; y: number; length?: number; shoulderW?: number; hipW?: number;
  idPrefix?: string; showGown?: boolean;
}) => {
  const cy = y + shoulderW / 2;
  return (
    <g filter={`url(#${idPrefix}-shadow)`}>
      {(() => {
        const d = `M ${x + 6},${cy - shoulderW / 2}
            Q ${x + length * 0.45},${cy - shoulderW / 2 - 2} ${x + length},${cy - hipW / 2}
            L ${x + length + 4},${cy - hipW / 2 + 2}
            L ${x + length + 4},${cy + hipW / 2 - 2}
            L ${x + length},${cy + hipW / 2}
            Q ${x + length * 0.45},${cy + shoulderW / 2 + 2} ${x + 6},${cy + shoulderW / 2}
            Z`;
        return (
          <>
            <path d={d}
              fill={showGown ? GOWN(idPrefix) : SKIN(idPrefix)}
              stroke={showGown ? STROKE_GOWN : STROKE_SKIN}
              strokeWidth={1.2}
            />
            <path d={d}
              fill={`url(#${idPrefix}-${showGown ? "gown-sheen" : "skin-sheen"})`}
              pointerEvents="none"
            />
          </>
        );
      })()}
      {/* Spine line (visible on prone gown back) */}
      <line x1={x + 12} y1={cy} x2={x + length - 4} y2={cy}
        stroke={STROKE_GOWN} strokeWidth={0.7} opacity={0.45} strokeDasharray="3 2" />
      {/* Scapulae hints */}
      <ellipse cx={x + length * 0.18} cy={cy - shoulderW * 0.22} rx={10} ry={6}
        fill="none" stroke={STROKE_GOWN} strokeWidth={0.5} opacity={0.35} />
      <ellipse cx={x + length * 0.18} cy={cy + shoulderW * 0.22} rx={10} ry={6}
        fill="none" stroke={STROKE_GOWN} strokeWidth={0.5} opacity={0.35} />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/*  MAYFIELD 3-PIN HEAD FIXATION                                       */
/* ------------------------------------------------------------------ */

interface MayfieldProps {
  cx: number; cy: number; r: number;
  /** Rotation in deg about centre. */
  rotate?: number;
  color?: string;
}

export const MayfieldPins = ({
  cx, cy, r, rotate = 0, color = "hsl(280 60% 40%)",
}: MayfieldProps) => (
  <g transform={`rotate(${rotate} ${cx} ${cy})`}>
    {/* C-frame arc (suggestive only) */}
    <path
      d={`M ${cx - r * 1.15},${cy + r * 0.1}
          Q ${cx},${cy - r * 1.45} ${cx + r * 1.15},${cy + r * 0.1}`}
      fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" opacity={0.85}
    />
    {/* Three pins */}
    {[
      { x1: cx - r * 0.7, y1: cy - r * 0.7, x2: cx - r * 1.0, y2: cy - r * 1.0 },
      { x1: cx + r * 0.7, y1: cy - r * 0.7, x2: cx + r * 1.0, y2: cy - r * 1.0 },
      { x1: cx, y1: cy - r * 0.95, x2: cx, y2: cy - r * 1.35 },
    ].map((p, i) => (
      <g key={i}>
        <line {...p} stroke={color} strokeWidth={3.2} strokeLinecap="round" />
        <circle cx={p.x1} cy={p.y1} r={2} fill={color} />
      </g>
    ))}
  </g>
);

/* ------------------------------------------------------------------ */
/*  Convenience — operating-table top with column                      */
/* ------------------------------------------------------------------ */

export const OperatingTable = ({
  x, y, w, h = 8, rx = 3,
  topColor = "hsl(210 25% 35%)",
  columnColor = "hsl(210 20% 45%)",
  baseColor = "hsl(210 15% 55%)",
}: {
  x: number; y: number; w: number; h?: number; rx?: number;
  topColor?: string; columnColor?: string; baseColor?: string;
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={rx} fill={topColor} />
    <rect x={x + w / 2 - 9} y={y + h} width={18} height={28} fill={columnColor} />
    <rect x={x + w / 2 - 32} y={y + h + 28} width={64} height={7} rx={2} fill={baseColor} />
  </g>
);

/* ------------------------------------------------------------------ */
/*  Wrapper — caller can pass children that go inside <g>              */
/* ------------------------------------------------------------------ */

export const AnatomyLayer = ({ children }: { children: ReactNode }) => (
  <g>{children}</g>
);

/* ================================================================== */
/*  COMPOSITE PATIENT PRIMITIVES                                       */
/*                                                                     */
/*  These wrap the per-body-part primitives above into named whole-    */
/*  patient compositions, one per posture. Every position diagram      */
/*  consumes one of these — so a single edit here propagates the       */
/*  realism upgrade (better hands, malleoli, drape folds, gown seam,   */
/*  etc.) to ALL diagrams uniformly.                                   */
/* ================================================================== */

/**
 * Shared "realism dial" applied uniformly across every patient.
 *
 * idPrefix    — namespace for the shared <defs> in the parent SVG.
 *               Each parent SVG renders its own <AnatomyDefs idPrefix=...>
 *               and passes the same prefix here.
 * showGown    — render a hospital gown (true) vs bare skin silhouette.
 * draped      — render a surgical drape colour over the legs.
 * gownSleeve  — render gown sleeves over the upper arm.
 * detail      — overall surface-detail level. "minimal" hides creases /
 *               extra folds for compact diagrams; "rich" enables every
 *               available shading layer.
 */
export interface RealismProps {
  idPrefix?: string;
  showGown?: boolean;
  draped?: boolean;
  gownSleeve?: boolean;
  detail?: "minimal" | "standard" | "rich";
}

const DEFAULT_REALISM: Required<RealismProps> = {
  idPrefix: "anat",
  showGown: true,
  draped: false,
  gownSleeve: true,
  detail: "standard",
};

const useRealism = (r: RealismProps = {}): Required<RealismProps> => ({
  ...DEFAULT_REALISM,
  ...r,
});

/* ------------------------------------------------------------------ */
/*  SUPINE PATIENT — face-up on the table                              */
/*                                                                     */
/*  Anchor (x, y) = top-left of the torso bounding box at the          */
/*  shoulder line. Length scales the whole patient horizontally;       */
/*  legSpread controls how far apart the two legs sit vertically.      */
/* ------------------------------------------------------------------ */

export interface SupinePatientProps extends RealismProps {
  x: number;
  y: number;
  length?: number;
  shoulderW?: number;
  waistW?: number;
  hipW?: number;
  /** Vertical separation between the two legs (default 20). */
  legSpread?: number;
  /** Show the second (far-side) arm as a faint silhouette behind the body. */
  showFarArm?: boolean;
  /** Show the head — set false when patient is a "torso only" inset. */
  showHead?: boolean;
  /** Render arms folded across the abdomen instead of at the side. */
  armsFolded?: boolean;
  /** Render the legs (set false when the caller draws bespoke legs, e.g. lithotomy stirrups). */
  showLegs?: boolean;
}

export const SupinePatient = ({
  x, y, length = 250,
  shoulderW = 50, waistW = 42, hipW = 48,
  legSpread = 20,
  showFarArm = true,
  showHead = true,
  armsFolded = false,
  showLegs = true,
  ...realism
}: SupinePatientProps) => {
  const r = useRealism(realism);
  const cy = y + shoulderW / 2;
  const headCx = x - 12;
  const hipX = x + length;
  return (
    <>
      <TorsoSupine x={x} y={y} length={length}
        shoulderW={shoulderW} waistW={waistW} hipW={hipW}
        idPrefix={r.idPrefix} showGown={r.showGown} />
      {showHead && (
        <HeadFront cx={headCx} cy={cy} r={shoulderW * 0.42} idPrefix={r.idPrefix} />
      )}
      {/* Near arm — at side or folded */}
      {armsFolded ? (
        <Arm
          sx={x + 50} sy={cy + shoulderW * 0.32}
          ex={x + length * 0.4} ey={cy + shoulderW * 0.5}
          wx={x + length * 0.6} wy={cy + shoulderW * 0.1}
          idPrefix={r.idPrefix} upperW={13} foreW={11} gownSleeve={r.gownSleeve}
        />
      ) : (
        <Arm
          sx={x + 50} sy={cy + shoulderW * 0.32}
          ex={x + length * 0.45} ey={cy + shoulderW * 0.18}
          wx={x + length * 0.7} wy={cy + shoulderW * 0.05}
          idPrefix={r.idPrefix} upperW={14} foreW={12} gownSleeve={r.gownSleeve}
        />
      )}
      {/* Far arm (faint, behind body) */}
      {showFarArm && (
        <g opacity={0.55}>
          <Arm
            sx={x + 50} sy={cy - shoulderW * 0.32}
            ex={armsFolded ? x + length * 0.4 : x + length * 0.45}
            ey={armsFolded ? cy - shoulderW * 0.5 : cy - shoulderW * 0.18}
            wx={armsFolded ? x + length * 0.6 : x + length * 0.7}
            wy={armsFolded ? cy - shoulderW * 0.1 : cy - shoulderW * 0.05}
            idPrefix={r.idPrefix} upperW={13} foreW={11} gownSleeve={r.gownSleeve}
          />
        </g>
      )}
      {/* Two legs symmetric about the body centreline */}
      {showLegs && (
        <>
          <Leg hx={hipX + 2} hy={cy - legSpread / 2}
            kx={hipX + 50} ky={cy - legSpread / 2 + 2}
            ax={hipX + 108} ay={cy - legSpread / 2 + 4}
            thighW={20} calfW={16} footLen={18}
            idPrefix={r.idPrefix} draped={r.draped} />
          <Leg hx={hipX + 2} hy={cy + legSpread / 2}
            kx={hipX + 50} ky={cy + legSpread / 2 + 2}
            ax={hipX + 108} ay={cy + legSpread / 2 + 4}
            thighW={20} calfW={16} footLen={18}
            idPrefix={r.idPrefix} draped={r.draped} />
        </>
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  LATERAL PATIENT — side-on with axillary roll, dependent leg flexed */
/* ------------------------------------------------------------------ */

export interface LateralPatientProps extends RealismProps {
  /** Centre of torso */
  cx: number;
  cy: number;
  length?: number;
  height?: number;
  facing?: "left" | "right";
  /** Show axillary roll on chest wall, caudal to the axilla. */
  showAxillaryRoll?: boolean;
  /** Show pillow between the knees (lateral surgery). */
  showKneePillow?: boolean;
  /** Up-arm rest pad colour (drawn beneath the up-arm). */
  showArmRest?: boolean;
  /** Hide the up arm (used by park-bench where arm goes in a sling instead). */
  hideUpArm?: boolean;
  showHead?: boolean;
}

export const LateralPatient = ({
  cx, cy, length = 220, height = 60,
  facing = "left",
  showAxillaryRoll = true,
  showKneePillow = true,
  showArmRest = true,
  hideUpArm = false,
  showHead = true,
  ...realism
}: LateralPatientProps) => {
  const r = useRealism(realism);
  const headCx = cx - length / 2 - 25;
  const headCy = cy - height * 0.32;
  const shoulderX = cx - length / 2 + 38;
  const hipX = cx + length / 2 - 18;
  return (
    <>
      <TorsoLateral cx={cx} cy={cy} length={length} height={height}
        facing={facing} idPrefix={r.idPrefix} showGown={r.showGown} />
      {showHead && (
        <HeadProfile cx={headCx} cy={headCy} r={height * 0.34}
          facing={facing} idPrefix={r.idPrefix} />
      )}
      {showAxillaryRoll && (
        <ellipse cx={shoulderX + 14} cy={cy + height * 0.13}
          rx={14} ry={8}
          fill="hsl(150 55% 40%)" opacity={0.85} />
      )}
      {/* Up arm — supported on padded arm-rest, abducted forwards */}
      {!hideUpArm && (
        <>
          {showArmRest && (
            <rect x={shoulderX + 65} y={cy - height * 0.85}
              width={32} height={10} rx={3} fill="hsl(210 25% 35%)" />
          )}
          <Arm
            sx={shoulderX + 12} sy={cy - height * 0.32}
            ex={shoulderX + 50} ey={cy - height * 0.65}
            wx={shoulderX + 88} wy={cy - height * 0.85}
            idPrefix={r.idPrefix} upperW={13} foreW={11} gownSleeve={r.gownSleeve}
          />
        </>
      )}
      {/* Dependent arm — slightly forward */}
      <Arm
        sx={shoulderX} sy={cy + height * 0.1}
        ex={shoulderX + 38} ey={cy + height * 0.32}
        wx={shoulderX + 76} wy={cy + height * 0.36}
        idPrefix={r.idPrefix} upperW={12} foreW={10} gownSleeve={r.gownSleeve}
      />
      {/* Pillow between knees */}
      {showKneePillow && (
        <ellipse cx={hipX + 50} cy={cy} rx={22} ry={7}
          fill="hsl(45 50% 82%)" stroke="hsl(45 40% 55%)" strokeWidth={0.8} />
      )}
      {/* Up leg — straight on pillow */}
      <Leg hx={hipX} hy={cy - height * 0.16}
        kx={hipX + 50} ky={cy - height * 0.2}
        ax={hipX + 108} ay={cy - height * 0.16}
        thighW={20} calfW={16} footLen={18}
        idPrefix={r.idPrefix} draped={r.draped} />
      {/* Dependent leg — flexed at hip and knee */}
      <Leg hx={hipX} hy={cy + height * 0.2}
        kx={hipX + 45} ky={cy + height * 0.36}
        ax={hipX + 90} ay={cy + height * 0.62}
        thighW={20} calfW={16} footLen={18}
        idPrefix={r.idPrefix} draped={r.draped} />
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  PRONE PATIENT — face-down on chest + pelvis supports               */
/* ------------------------------------------------------------------ */

export interface PronePatientProps extends RealismProps {
  x: number;
  y: number;
  length?: number;
  shoulderW?: number;
  hipW?: number;
  /** Render purple chest + pelvis bolster supports under the body. */
  showSupports?: boolean;
  /** Render a horseshoe / Mayfield cradle around the head. */
  showHorseshoe?: boolean;
  /** "superman" = arms abducted forward; "tucked" = arms by the side. */
  arms?: "superman" | "tucked";
  showHead?: boolean;
}

export const PronePatient = ({
  x, y, length = 250,
  shoulderW = 48, hipW = 44,
  showSupports = true,
  showHorseshoe = true,
  arms = "superman",
  showHead = true,
  ...realism
}: PronePatientProps) => {
  const r = useRealism(realism);
  const cy = y + shoulderW / 2;
  const headCx = x - 20;
  return (
    <>
      {showSupports && (
        <>
          {/* Chest support */}
          <rect x={x + length * 0.12} y={cy - shoulderW * 0.4 - 6}
            width={50} height={20} rx={4}
            fill="hsl(280 50% 45%)" opacity={0.85} />
          {/* Pelvis support */}
          <rect x={x + length * 0.76} y={cy - hipW * 0.4 - 6}
            width={50} height={20} rx={4}
            fill="hsl(280 50% 45%)" opacity={0.85} />
        </>
      )}
      <TorsoProne x={x} y={y} length={length}
        shoulderW={shoulderW} hipW={hipW}
        idPrefix={r.idPrefix} showGown={r.showGown} />
      {showHead && (
        <HeadFront cx={headCx} cy={cy} r={shoulderW * 0.38}
          closedEyes={false} idPrefix={r.idPrefix} />
      )}
      {showHorseshoe && (
        <path
          d={`M ${headCx - 25} ${cy + 10}
              Q ${headCx} ${cy + 22} ${headCx + 25} ${cy + 10}
              L ${headCx + 25} ${cy}
              L ${headCx - 25} ${cy} Z`}
          fill="hsl(280 50% 45%)" opacity={0.85}
          stroke="hsl(280 60% 30%)" strokeWidth={0.8}
        />
      )}
      {/* Arms */}
      {arms === "superman" ? (
        <>
          <Arm
            sx={x + 30} sy={cy - shoulderW * 0.42}
            ex={x + 70} ey={cy - shoulderW * 0.85}
            wx={x + 95} wy={cy - shoulderW * 1.08}
            idPrefix={r.idPrefix} upperW={12} foreW={10} gownSleeve={r.gownSleeve}
          />
          <Arm
            sx={x + 30} sy={cy + shoulderW * 0.42}
            ex={x + 70} ey={cy + shoulderW * 0.85}
            wx={x + 95} wy={cy + shoulderW * 1.08}
            idPrefix={r.idPrefix} upperW={12} foreW={10} gownSleeve={r.gownSleeve}
          />
        </>
      ) : (
        <>
          <Arm
            sx={x + 30} sy={cy - shoulderW * 0.42}
            ex={x + length * 0.4} ey={cy - shoulderW * 0.5}
            wx={x + length * 0.7} wy={cy - shoulderW * 0.55}
            idPrefix={r.idPrefix} upperW={12} foreW={10} gownSleeve={r.gownSleeve}
          />
          <Arm
            sx={x + 30} sy={cy + shoulderW * 0.42}
            ex={x + length * 0.4} ey={cy + shoulderW * 0.5}
            wx={x + length * 0.7} wy={cy + shoulderW * 0.55}
            idPrefix={r.idPrefix} upperW={12} foreW={10} gownSleeve={r.gownSleeve}
          />
        </>
      )}
      {/* Legs */}
      <Leg hx={x + length} hy={cy - hipW * 0.32}
        kx={x + length + 50} ky={cy - hipW * 0.28}
        ax={x + length + 108} ay={cy - hipW * 0.24}
        thighW={20} calfW={16} footLen={18}
        idPrefix={r.idPrefix} draped={r.draped} />
      <Leg hx={x + length} hy={cy + hipW * 0.32}
        kx={x + length + 50} ky={cy + hipW * 0.28}
        ax={x + length + 108} ay={cy + hipW * 0.24}
        thighW={20} calfW={16} footLen={18}
        idPrefix={r.idPrefix} draped={r.draped} />
    </>
  );
};

/* ------------------------------------------------------------------ */
/*  SITTING PATIENT — semi-Fowler / beach-chair                        */
/*                                                                     */
/*  Renders the patient along a backrest tilted by `tiltDeg` about     */
/*  the seat anchor (sx, sy). The torso lies on the backrest with the  */
/*  legs extending forward. Use for sitting (Fowler), beach-chair and  */
/*  modified Fowler positions.                                         */
/* ------------------------------------------------------------------ */

export interface SittingPatientProps extends RealismProps {
  /** Seat anchor (where backrest pivots) */
  sx: number;
  sy: number;
  /** Backrest tilt from horizontal in degrees (60 = full Fowler, 35 = beach chair). */
  tiltDeg?: number;
  /** Torso length along backrest. */
  torsoLength?: number;
  /** Torso "thickness". */
  torsoHeight?: number;
  /** Show Mayfield 3-pin head fixation (full sitting only). */
  showMayfield?: boolean;
  /** Show legs extending forward off the seat. */
  showLegs?: boolean;
  /** Show the (operative) arm abducted upward — for beach-chair shoulder cases. */
  showOperativeArm?: boolean;
}

export const SittingPatient = ({
  sx, sy,
  tiltDeg = 60,
  torsoLength = 110,
  torsoHeight = 42,
  showMayfield = false,
  showLegs = true,
  showOperativeArm = false,
  ...realism
}: SittingPatientProps) => {
  const r = useRealism(realism);
  // Torso centre placed up the backrest from the seat anchor
  const torsoCx = sx - torsoLength * 0.5 + 50;
  const torsoCy = sy - 30;
  return (
    <>
      <g transform={`rotate(${-tiltDeg} ${sx} ${sy})`}>
        <TorsoLateral
          cx={torsoCx} cy={torsoCy}
          length={torsoLength} height={torsoHeight}
          facing="left" idPrefix={r.idPrefix} showGown={r.showGown}
        />
        <HeadProfile
          cx={torsoCx - torsoLength * 0.55}
          cy={torsoCy + torsoHeight * 0.05}
          r={torsoHeight * 0.42}
          facing="left" idPrefix={r.idPrefix}
        />
        {showMayfield && (
          <MayfieldPins
            cx={torsoCx - torsoLength * 0.55}
            cy={torsoCy + torsoHeight * 0.05}
            r={torsoHeight * 0.42}
          />
        )}
      </g>
      {showLegs && (
        <Leg
          hx={sx + 40} hy={sy - 12}
          kx={sx + 100} ky={sy - 40}
          ax={sx + 165} ay={sy - 12}
          thighW={22} calfW={18} footLen={18}
          idPrefix={r.idPrefix} draped={r.draped}
        />
      )}
      {showOperativeArm && (
        <Arm
          sx={sx - 35} sy={sy - 75}
          ex={sx - 5} ey={sy - 105}
          wx={sx + 25} wy={sy - 130}
          idPrefix={r.idPrefix} upperW={13} foreW={11} gownSleeve={r.gownSleeve}
        />
      )}
    </>
  );
};


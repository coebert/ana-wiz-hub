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
    {/* Skin gradient — warm tan with subtle highlight */}
    <radialGradient id={`${idPrefix}-skin`} cx="35%" cy="30%" r="80%">
      <stop offset="0%" stopColor="hsl(34 75% 86%)" />
      <stop offset="60%" stopColor="hsl(32 60% 76%)" />
      <stop offset="100%" stopColor="hsl(28 45% 62%)" />
    </radialGradient>

    {/* Hair gradient */}
    <linearGradient id={`${idPrefix}-hair`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(28 35% 28%)" />
      <stop offset="100%" stopColor="hsl(24 30% 20%)" />
    </linearGradient>

    {/* Hospital gown — soft blue with cooler shadow */}
    <linearGradient id={`${idPrefix}-gown`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(210 60% 78%)" />
      <stop offset="100%" stopColor="hsl(210 55% 64%)" />
    </linearGradient>

    {/* Drape / sheet — pale neutral */}
    <linearGradient id={`${idPrefix}-drape`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="hsl(210 25% 92%)" />
      <stop offset="100%" stopColor="hsl(210 20% 80%)" />
    </linearGradient>

    {/* Soft shadow under the body */}
    <filter id={`${idPrefix}-shadow`} x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="0.6" />
      <feOffset dx="0" dy="0.7" result="o" />
      <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
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
 * Articulated arm rendered as a thick rounded segment with a small "elbow"
 * disc and a tapered hand at the end.
 */
export const Arm = ({
  sx, sy, ex, ey, wx, wy,
  handLen = 12, upperW = 13, foreW = 11,
  idPrefix = "anat", gownSleeve = false,
}: ArmProps) => {
  // hand vector
  const dx = wx - ex;
  const dy = wy - ey;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const hx = wx + ux * handLen;
  const hy = wy + uy * handLen;
  return (
    <g filter={`url(#${idPrefix}-shadow)`}>
      {/* Upper arm (sleeve or skin) */}
      <line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke={gownSleeve ? GOWN(idPrefix) : SKIN(idPrefix)}
        strokeWidth={upperW} strokeLinecap="round"
      />
      <line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke={gownSleeve ? STROKE_GOWN : STROKE_SKIN}
        strokeWidth={0.9} strokeLinecap="round" fill="none" opacity={0.6}
      />
      {/* Elbow joint */}
      <circle cx={ex} cy={ey} r={upperW * 0.42} fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9} />
      {/* Forearm */}
      <line x1={ex} y1={ey} x2={wx} y2={wy} stroke={SKIN(idPrefix)} strokeWidth={foreW} strokeLinecap="round" />
      <line x1={ex} y1={ey} x2={wx} y2={wy} stroke={STROKE_SKIN} strokeWidth={0.7} opacity={0.5} />
      {/* Hand */}
      <ellipse
        cx={(wx + hx) / 2}
        cy={(wy + hy) / 2}
        rx={handLen * 0.55}
        ry={foreW * 0.55}
        fill={SKIN(idPrefix)}
        stroke={STROKE_SKIN}
        strokeWidth={0.8}
        transform={`rotate(${(Math.atan2(uy, ux) * 180) / Math.PI} ${(wx + hx) / 2} ${(wy + hy) / 2})`}
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
  // default foot direction: continue calf vector but bend toward toes
  const calfDx = ax - kx;
  const calfDy = ay - ky;
  const calfAngle = Math.atan2(calfDy, calfDx) * 180 / Math.PI;
  const footRot = footAngle ?? calfAngle + 90; // foot perpendicular to calf
  return (
    <g filter={`url(#${idPrefix}-shadow)`}>
      {/* Thigh */}
      <line x1={hx} y1={hy} x2={kx} y2={ky}
        stroke={fillColor} strokeWidth={thighW} strokeLinecap="round" />
      <line x1={hx} y1={hy} x2={kx} y2={ky}
        stroke={strokeColor} strokeWidth={0.8} opacity={0.5} />
      {/* Knee */}
      <circle cx={kx} cy={ky} r={thighW * 0.4} fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9} />
      {/* Calf */}
      <line x1={kx} y1={ky} x2={ax} y2={ay} stroke={SKIN(idPrefix)} strokeWidth={calfW} strokeLinecap="round" />
      <line x1={kx} y1={ky} x2={ax} y2={ay} stroke={STROKE_SKIN} strokeWidth={0.7} opacity={0.5} />
      {/* Ankle */}
      <circle cx={ax} cy={ay} r={calfW * 0.32} fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.7} />
      {/* Foot */}
      <g transform={`rotate(${footRot} ${ax} ${ay})`}>
        <path
          d={`M ${ax - footLen * 0.1},${ay - calfW * 0.3}
              Q ${ax + footLen * 0.5},${ay - calfW * 0.45} ${ax + footLen * 0.95},${ay - calfW * 0.05}
              Q ${ax + footLen * 0.95},${ay + calfW * 0.3} ${ax + footLen * 0.4},${ay + calfW * 0.4}
              L ${ax - footLen * 0.1},${ay + calfW * 0.35} Z`}
          fill={SKIN(idPrefix)} stroke={STROKE_SKIN} strokeWidth={0.9} strokeLinejoin="round"
        />
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
      {/* Body silhouette */}
      <path
        d={`M ${xShoulder},${cy - shoulderW / 2}
            Q ${xChest},${cy - shoulderW / 2 - 4} ${xChest + 8},${cy - shoulderW / 2 + 2}
            L ${xWaist},${cy - waistW / 2}
            Q ${xWaist + 30},${cy - waistW / 2 - 1} ${xHip},${cy - hipW / 2}
            L ${xHip + 6},${cy - hipW / 2 + 4}
            L ${xHip + 6},${cy + hipW / 2 - 4}
            L ${xHip},${cy + hipW / 2}
            Q ${xWaist + 30},${cy + waistW / 2 + 1} ${xWaist},${cy + waistW / 2}
            L ${xChest + 8},${cy + shoulderW / 2 - 2}
            Q ${xChest},${cy + shoulderW / 2 + 4} ${xShoulder},${cy + shoulderW / 2}
            Z`}
        fill={showGown ? GOWN(idPrefix) : SKIN(idPrefix)}
        stroke={showGown ? STROKE_GOWN : STROKE_SKIN}
        strokeWidth={1.2}
      />
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
      <path
        d={`M ${x + 6},${cy - shoulderW / 2}
            Q ${x + length * 0.45},${cy - shoulderW / 2 - 2} ${x + length},${cy - hipW / 2}
            L ${x + length + 4},${cy - hipW / 2 + 2}
            L ${x + length + 4},${cy + hipW / 2 - 2}
            L ${x + length},${cy + hipW / 2}
            Q ${x + length * 0.45},${cy + shoulderW / 2 + 2} ${x + 6},${cy + shoulderW / 2}
            Z`}
        fill={showGown ? GOWN(idPrefix) : SKIN(idPrefix)}
        stroke={showGown ? STROKE_GOWN : STROKE_SKIN}
        strokeWidth={1.2}
      />
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

/**
 * Derives numeric pharmacokinetic values (half-life, volume of distribution,
 * clearance) from the free-text kinetics data in src/data/pk so they can be
 * plotted as an elimination curve and half-life timeline.
 */
import type { DrugPharmacokinetics } from "@/data/pk/types";

export interface NumericRange {
  low: number;
  high: number;
  /** Representative (geometric-ish mid) value. */
  mid: number;
}

export interface PkTimelineModel {
  /** Elimination half-life in hours. */
  halfLifeHours: NumericRange;
  /** Volume of distribution in L/kg, when quoted that way. */
  vdLPerKg?: NumericRange;
  /** Clearance in mL/kg/min, when quoted that way. */
  clearanceMlPerKgMin?: NumericRange;
}

const range = (low: number, high?: number): NumericRange => {
  const hi = high ?? low;
  return { low, high: hi, mid: (low + hi) / 2 };
};

const NUM = String.raw`(\d+(?:\.\d+)?)`;
const DASH = String.raw`\s*(?:[–—-]|\s+to\s+)\s*`;

function matchRange(text: string, unitPattern: string, from = 0): NumericRange | undefined {
  const re = new RegExp(`${NUM}(?:${DASH}${NUM})?\\s*(?:${unitPattern})`, "i");
  const m = re.exec(text.slice(from));
  if (!m) return undefined;
  const low = Number(m[1]);
  const high = m[2] === undefined ? undefined : Number(m[2]);
  if (!Number.isFinite(low) || low <= 0) return undefined;
  return range(low, high);
}

/** Half-life text may quote minutes or hours, and several phases. */
export function parseHalfLifeHours(text: string): NumericRange | undefined {
  const lower = text.toLowerCase();
  // Prefer the elimination/terminal phase when the text describes several phases.
  const anchors = ["elimination half-life", "terminal", "half-life", "half life"];
  for (const anchor of anchors) {
    const idx = lower.indexOf(anchor);
    if (idx === -1) continue;
    const window = text.slice(idx, idx + 160);
    const hours = matchRange(window, String.raw`h\b|hours?\b`);
    if (hours) return hours;
    const mins = matchRange(window, String.raw`min\b|minutes?\b`);
    if (mins) return range(mins.low / 60, mins.high / 60);
  }
  const hours = matchRange(text, String.raw`h\b|hours?\b`);
  if (hours) return hours;
  const mins = matchRange(text, String.raw`min\b|minutes?\b`);
  return mins ? range(mins.low / 60, mins.high / 60) : undefined;
}

export function buildPkTimeline(pk: DrugPharmacokinetics | undefined): PkTimelineModel | undefined {
  if (!pk) return undefined;
  const halfLifeHours = parseHalfLifeHours(pk.halfLife);
  if (!halfLifeHours) return undefined;
  return {
    halfLifeHours,
    vdLPerKg: matchRange(pk.volumeOfDistribution, String.raw`L\/kg`),
    clearanceMlPerKgMin: matchRange(pk.clearance, String.raw`mL\/kg\/min`),
  };
}

/** Fraction of drug remaining after `hours` for a given half-life. */
export const fractionRemaining = (hours: number, halfLifeHours: number) =>
  Math.pow(0.5, hours / halfLifeHours);

export function formatDuration(hours: number): string {
  if (hours < 1 / 60) return `${Math.round(hours * 3600)} s`;
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours < 10) return `${hours.toFixed(1).replace(/\.0$/, "")} h`;
  if (hours < 48) return `${Math.round(hours)} h`;
  return `${(hours / 24).toFixed(1).replace(/\.0$/, "")} days`;
}

/** Half-life milestones with residual drug fraction. */
export const HALF_LIFE_MILESTONES = [1, 2, 3, 4, 5].map((n) => ({
  halfLives: n,
  remaining: Math.pow(0.5, n),
}));

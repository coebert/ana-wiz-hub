/**
 * Shared clamp-and-scale utilities for diagram y-axes.
 *
 * Diagrams that plot a value-driven curve into an SVG with a fixed pixel-space
 * plot area should derive both their tick labels AND every bezier/line control
 * point from the same scale, so curves can never exceed the plot bounds.
 *
 * Usage:
 *   const scale = createLinearScale({
 *     domain: [0, yMax],          // data units (e.g. % N₂)
 *     range: [190, 20],           // svg pixel coords (bottom, top)
 *   });
 *   scale(30) // -> svg y for value 30, clamped to the plot rect
 */

export interface LinearScale {
  /** Map a data value to a pixel coordinate, clamped to the plot range. */
  (value: number): number;
  /** Map a data value to a pixel coordinate WITHOUT clamping (rare). */
  raw: (value: number) => number;
  /** Min/max in data units (after any auto-fit). */
  domain: readonly [number, number];
  /** Min/max in pixel units (rangeStart, rangeEnd). */
  range: readonly [number, number];
}

export interface CreateLinearScaleOptions {
  /** [min, max] in data units. */
  domain: readonly [number, number];
  /** [pixelAtMin, pixelAtMax]. For an inverted SVG y-axis pass [bottom, top]. */
  range: readonly [number, number];
  /**
   * If true (default), values outside the domain are clamped to it.
   * Disable only when a caller explicitly needs overflow (e.g. annotations
   * drawn outside the plot rect on purpose).
   */
  clamp?: boolean;
}

export function createLinearScale(opts: CreateLinearScaleOptions): LinearScale {
  const { domain, range, clamp = true } = opts;
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0 || 1;

  const raw = (value: number) => r0 + ((value - d0) / span) * (r1 - r0);
  const scale = ((value: number) => {
    const v = clamp ? clampValue(value, d0, d1) : value;
    return raw(v);
  }) as LinearScale;

  scale.raw = raw;
  scale.domain = domain;
  scale.range = range;
  return scale;
}

/** Clamp a numeric value into [min, max]. Order-tolerant. */
export function clampValue(value: number, min: number, max: number): number {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  if (value < lo) return lo;
  if (value > hi) return hi;
  return value;
}

/** Round a number UP to the nearest multiple of `step`. */
export function niceCeil(value: number, step: number): number {
  return Math.ceil(value / step) * step;
}

/**
 * Compute a "nice" axis ceiling for a given peak data value.
 * Rounds up to the next multiple of `step` after applying `headroom` (e.g. 1.05
 * for 5% padding) and never returns less than `floor`.
 */
export function niceAxisMax(
  peak: number,
  { step = 10, headroom = 1.05, floor = 0 }: { step?: number; headroom?: number; floor?: number } = {},
): number {
  return Math.max(floor, niceCeil(peak * headroom, step));
}

/**
 * Generate evenly-spaced tick values from 0 (or `min`) up to `max` inclusive.
 * Useful for axis labels that must stay in sync with a LinearScale's domain.
 */
export function makeTicks(max: number, step: number, min = 0): number[] {
  const ticks: number[] = [];
  for (let v = min; v <= max + 1e-9; v += step) ticks.push(Number(v.toFixed(6)));
  return ticks;
}

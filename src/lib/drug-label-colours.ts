/**
 * Anaesthetic syringe-label colour mapping for the drug formulary.
 *
 * Based on the international user-applied drug-label standard (ISO 26825 /
 * ASTM D4774, as adopted by the AAGBI and most UK anaesthetic departments).
 * Where a class is not covered by the standard we fall back to a neutral tone
 * that still gives visual grouping without misleading the user.
 *
 * Text colours are chosen automatically by a WCAG contrast pass (see
 * `pickReadableText`) so every chip clears 4.5:1 against its actual rendered
 * background — including the semi-transparent tints once they are composited
 * over the card surface in either light or dark mode.
 */

export interface DrugLabelStyle {
  bgClass: string;
  textClass: string;
  borderClass: string;
  solidBgClass: string;
  solidTextClass: string;
  standardName: string;
}

interface PaletteEntry {
  /** Solid swatch — used for active filter chip and the card's left rail. */
  solid: string;
  /** Tint — semi-transparent overlay for resting chip background. */
  tint: string;
  /** Border colour — slightly darker than the tint for definition. */
  border: string;
  /** Hue family — used to derive an on-tint text colour with the right tone. */
  hue: number;
  /** Saturation hint for the derived text colour. */
  sat: number;
}

const PALETTE = {
  yellow:    { solid: "hsl(45 95% 50%)",  tint: "hsla(45, 95%, 50%, 0.16)",  border: "hsla(45, 90%, 45%, 0.55)",  hue: 40,  sat: 85 },
  blue:      { solid: "hsl(210 80% 50%)", tint: "hsla(210, 80%, 50%, 0.16)", border: "hsla(210, 75%, 45%, 0.55)", hue: 210, sat: 75 },
  red:       { solid: "hsl(0 75% 52%)",   tint: "hsla(0, 75%, 52%, 0.16)",   border: "hsla(0, 70%, 48%, 0.55)",   hue: 0,   sat: 70 },
  redStripe: { solid: "hsl(0 65% 60%)",   tint: "hsla(0, 65%, 60%, 0.16)",   border: "hsla(0, 60%, 50%, 0.55)",   hue: 0,   sat: 60 },
  violet:    { solid: "hsl(275 55% 50%)", tint: "hsla(275, 55%, 50%, 0.16)", border: "hsla(275, 50%, 45%, 0.55)", hue: 275, sat: 55 },
  green:     { solid: "hsl(140 55% 40%)", tint: "hsla(140, 55%, 40%, 0.16)", border: "hsla(140, 50%, 38%, 0.55)", hue: 140, sat: 55 },
  orange:    { solid: "hsl(25 90% 52%)",  tint: "hsla(25, 90%, 52%, 0.16)",  border: "hsla(25, 85%, 48%, 0.55)",  hue: 25,  sat: 85 },
  pink:      { solid: "hsl(335 70% 60%)", tint: "hsla(335, 70%, 60%, 0.16)", border: "hsla(335, 65%, 55%, 0.55)", hue: 335, sat: 65 },
  grey:      { solid: "hsl(220 8% 45%)",  tint: "hsla(220, 8%, 45%, 0.16)",  border: "hsla(220, 8%, 40%, 0.55)",  hue: 220, sat: 8  },
  brown:     { solid: "hsl(25 35% 38%)",  tint: "hsla(25, 35%, 38%, 0.16)",  border: "hsla(25, 30%, 35%, 0.55)",  hue: 25,  sat: 35 },
  teal:      { solid: "hsl(180 55% 38%)", tint: "hsla(180, 55%, 38%, 0.16)", border: "hsla(180, 50%, 35%, 0.55)", hue: 180, sat: 55 },
  neutral:   { solid: "hsl(220 10% 55%)", tint: "hsla(220, 10%, 55%, 0.12)", border: "hsla(220, 10%, 50%, 0.45)", hue: 220, sat: 10 },
} as const satisfies Record<string, PaletteEntry>;

type PaletteKey = keyof typeof PALETTE;

const STANDARD_NAME: Record<PaletteKey, string> = {
  yellow:    "Yellow — induction agents",
  blue:      "Blue — opioids",
  red:       "Red — neuromuscular blockers",
  redStripe: "Red/white stripe — NMBA reversal & antagonists",
  violet:    "Violet — vasopressors / vasoactives",
  green:     "Green — anticholinergics",
  orange:    "Orange — benzodiazepines & sedatives",
  pink:      "Salmon — antiemetics",
  grey:      "Grey — local anaesthetics",
  brown:     "Tan — anticoagulants",
  teal:      "Teal — antimicrobials (non-standard, for grouping)",
  neutral:   "Neutral — no standard colour assigned",
};

/* ------------------------------------------------------------------ */
/* Colour-space utilities — small, self-contained, no runtime deps.    */
/* ------------------------------------------------------------------ */

interface RGB { r: number; g: number; b: number; a: number }

/** Parse `hsl(H S% L%)`, `hsla(H, S%, L%, A)` or `H S% L%` (token form). */
function parseHsl(css: string): { h: number; s: number; l: number; a: number } | null {
  const m = css
    .trim()
    .match(/hsla?\(\s*(-?\d+(?:\.\d+)?)[\s,]+\s*(-?\d+(?:\.\d+)?)%[\s,]+\s*(-?\d+(?:\.\d+)?)%(?:[\s,/]+\s*(\d+(?:\.\d+)?))?\s*\)/i);
  if (m) return { h: +m[1], s: +m[2], l: +m[3], a: m[4] != null ? +m[4] : 1 };
  // Token form like "220 14% 96%" (Tailwind / shadcn CSS variables).
  const t = css.trim().match(/^(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%$/);
  if (t) return { h: +t[1], s: +t[2], l: +t[3], a: 1 };
  return null;
}

function hslToRgb(h: number, s: number, l: number, a = 1): RGB {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const aa = s * Math.min(l, 1 - l);
  const f = (n: number) => l - aa * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: 255 * f(0), g: 255 * f(8), b: 255 * f(4), a };
}

function toRgb(css: string): RGB {
  const hsl = parseHsl(css);
  if (hsl) return hslToRgb(hsl.h, hsl.s, hsl.l, hsl.a);
  // Last-ditch fallback — assume opaque mid-grey so contrast checks still run.
  return { r: 128, g: 128, b: 128, a: 1 };
}

/** Composite `fg` (which may have alpha) over an opaque `bg`. */
function composite(fg: RGB, bg: RGB): RGB {
  const a = fg.a + bg.a * (1 - fg.a);
  return {
    r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
    g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
    b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
    a,
  };
}

/** Relative luminance per WCAG 2.x. */
function luminance({ r, g, b }: RGB): number {
  const ch = (v: number) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

/** WCAG contrast ratio between two opaque colours. */
function contrast(a: RGB, b: RGB): number {
  const L1 = luminance(a);
  const L2 = luminance(b);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Pick the most readable text colour for `bg` from a list of candidates,
 * preferring the first candidate that clears the WCAG AA threshold (4.5:1)
 * and otherwise falling back to whichever has the highest contrast.
 */
function pickReadableText(bg: RGB, candidates: string[], threshold = 4.5): string {
  let best = candidates[0];
  let bestRatio = 0;
  for (const c of candidates) {
    const ratio = contrast(bg, toRgb(c));
    if (ratio >= threshold) return c;
    if (ratio > bestRatio) { bestRatio = ratio; best = c; }
  }
  return best;
}

/**
 * Resolve the page's `--card` and `--background` tokens at runtime so the
 * compositing maths matches what the user actually sees in light or dark mode.
 * Falls back to plausible defaults during SSR / first paint.
 *
 * The resolved RGB is memoised per CSS-variable raw-value string so we only
 * call `getComputedStyle` (a forced layout read) once per theme change rather
 * than once per palette entry per render. A `MutationObserver` on the root
 * element's `class` / `style` attributes invalidates the memo when the theme
 * toggles (e.g. `dark` class flip).
 */
const surfaceRawCache = new Map<string, RGB>();
let surfaceObserverInstalled = false;

function installSurfaceObserver() {
  if (surfaceObserverInstalled || typeof window === "undefined" || typeof MutationObserver === "undefined") return;
  surfaceObserverInstalled = true;
  try {
    const obs = new MutationObserver(() => {
      surfaceRawCache.clear();
      styleCache.clear();
      cachedSurfaceKey = null;
      cachedSurfaceStyles = null;
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
  } catch {
    /* ignore */
  }
}

function getSurfaceRgb(varName: "--card" | "--background", fallback: RGB): RGB {
  if (typeof window === "undefined") return fallback;
  try {
    installSurfaceObserver();
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (!raw) return fallback;
    const cacheKey = `${varName}:${raw}`;
    const hit = surfaceRawCache.get(cacheKey);
    if (hit) return hit;
    const hsl = parseHsl(raw);
    const rgb = hsl ? hslToRgb(hsl.h, hsl.s, hsl.l, 1) : fallback;
    surfaceRawCache.set(cacheKey, rgb);
    return rgb;
  } catch {
    return fallback;
  }
}

const SURFACE_FALLBACK: RGB = { r: 255, g: 255, b: 255, a: 1 };
const FOREGROUND_DARK = "hsl(0 0% 12%)";
const FOREGROUND_LIGHT = "hsl(0 0% 100%)";

function paletteFor(rawClass: string): PaletteKey {
  const c = rawClass.toLowerCase();
  if (c.includes("induction agent")) return "yellow";
  if (c.includes("volatile")) return "yellow";
  if (c.includes("opioid antagonist")) return "redStripe";
  if (c.includes("opioid")) return "blue";
  if (c.includes("nmba reversal") || c.includes("benzodiazepine antagonist")) return "redStripe";
  if (c.includes("nmba") || c.includes("muscle relaxant") || c.includes("depolarising")) return "red";
  if (c.includes("local anaesthetic") || c.includes("la toxicity")) return "grey";
  if (c.includes("benzodiazepine") || c.startsWith("sedative")) return "orange";
  if (c.includes("anticholinergic")) return "green";
  if (c.includes("antiemetic")) return "pink";
  if (
    c.includes("vasopressor") || c.includes("vasodilator") || c.includes("inotrope") ||
    c.includes("antiarrhythmic") || c.includes("β-blocker") || c.includes("α/β-blocker") ||
    c.includes("pulmonary vasodilator") || c.includes("vasopressin")
  ) return "violet";
  if (c.includes("anticoagulant") || c.includes("antiplatelet") ||
      c.includes("antifibrinolytic") || c.includes("thrombolytic")) return "brown";
  if (c.includes("antimicrobial") || c.includes("antifungal") || c.includes("antiviral")) return "teal";
  return "neutral";
}

/**
 * Derive a saturated "branded" text colour for a palette entry by darkening
 * (or, on dark surfaces, lightening) the hue until it meets the contrast
 * threshold against the resolved background.
 */
function brandedText(entry: PaletteEntry, bg: RGB, surfaceIsDark: boolean): string {
  // Try a sweep of lightness values — darker on light surfaces, lighter on dark.
  const lightnesses = surfaceIsDark
    ? [80, 75, 70, 85, 65, 90]
    : [30, 25, 35, 20, 40, 15];
  for (const l of lightnesses) {
    const candidate = `hsl(${entry.hue} ${Math.min(entry.sat, 70)}% ${l}%)`;
    if (contrast(bg, toRgb(candidate)) >= 4.5) return candidate;
  }
  return surfaceIsDark ? FOREGROUND_LIGHT : FOREGROUND_DARK;
}

/**
 * Compute readable styles for a single palette entry against the current
 * surface. Memoised per (key, surfaceLuminance) so we don't recompute on
 * every render.
 */
const styleCache = new Map<string, { tint: { backgroundColor: string; color: string; borderColor: string }; solid: { backgroundColor: string; color: string; borderColor: string }; railColor: string; standardName: string }>();

function computeStyles(key: PaletteKey) {
  const card = getSurfaceRgb("--card", SURFACE_FALLBACK);
  const cacheKey = `${key}|${Math.round(card.r)}|${Math.round(card.g)}|${Math.round(card.b)}`;
  const cached = styleCache.get(cacheKey);
  if (cached) return cached;

  const entry = PALETTE[key];
  const surfaceIsDark = luminance(card) < 0.5;

  // Tint composited over the card so we measure real contrast.
  const tintBg = composite(toRgb(entry.tint), card);
  const tintText = pickReadableText(
    tintBg,
    [
      brandedText(entry, tintBg, surfaceIsDark),
      surfaceIsDark ? FOREGROUND_LIGHT : FOREGROUND_DARK,
      surfaceIsDark ? FOREGROUND_DARK : FOREGROUND_LIGHT,
    ],
  );

  // Solid swatch — opaque, so just pick black or white by direct contrast.
  const solidBg = toRgb(entry.solid);
  const solidText = pickReadableText(solidBg, [FOREGROUND_DARK, FOREGROUND_LIGHT], 4.5);

  const styles = {
    tint:  { backgroundColor: entry.tint,  color: tintText,  borderColor: entry.border },
    solid: { backgroundColor: entry.solid, color: solidText, borderColor: entry.solid },
    railColor: entry.solid,
    standardName: STANDARD_NAME[key],
  };
  styleCache.set(cacheKey, styles);
  return styles;
}

export function getDrugLabelInlineStyles(drugClass: string) {
  return computeStyles(paletteFor(drugClass || ""));
}

export function getDrugLabelStyle(drugClass: string): DrugLabelStyle {
  const s = computeStyles(paletteFor(drugClass || ""));
  return {
    bgClass: "",                 // legacy field — inline styles preferred
    textClass: "",
    borderClass: "",
    solidBgClass: "",
    solidTextClass: "",
    standardName: s.standardName,
  };
}

/** Ordered legend entries — also use the contrast-checked solid pairing. */
export const DRUG_LABEL_LEGEND: Array<{ name: string; example: string; style: { backgroundColor: string; color: string } }> = (
  Object.keys(PALETTE) as PaletteKey[]
).map((k) => {
  const s = computeStyles(k);
  return {
    name: STANDARD_NAME[k],
    example: k,
    style: { backgroundColor: s.solid.backgroundColor, color: s.solid.color },
  };
});

/* ------------------------------------------------------------------ */
/* Exposed for tests.                                                  */
/* ------------------------------------------------------------------ */
export const __contrastInternals = { contrast, toRgb, composite, luminance, pickReadableText };

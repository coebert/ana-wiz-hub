/**
 * Anaesthetic syringe-label colour mapping for the drug formulary.
 *
 * Based on the international user-applied drug-label standard (ISO 26825 /
 * ASTM D4774, as adopted by the AAGBI and most UK anaesthetic departments).
 * Where a class is not covered by the standard we fall back to a neutral tone
 * that still gives visual grouping without misleading the user.
 *
 * Returned classes are Tailwind utility strings using arbitrary HSL values so
 * they render identically in light and dark mode and never depend on tokens
 * that might be repurposed elsewhere in the design system.
 */

export interface DrugLabelStyle {
  /** Background tint for the class chip / left border. */
  bgClass: string;
  /** Text colour for the class label. */
  textClass: string;
  /** Border colour for the class chip / left border. */
  borderClass: string;
  /** Solid swatch (used for the active filter chip and the card's left rail). */
  solidBgClass: string;
  /** Text colour to pair with the solid swatch (white or near-black). */
  solidTextClass: string;
  /** Plain-language description of the standard label colour. */
  standardName: string;
}

// Canonical palette (HSL). Values chosen to read as the standard colours in
// both light and dark mode and to keep AA contrast for the chip text.
const PALETTE = {
  yellow:    { solid: "hsl(45 95% 50%)",  tint: "hsl(45 95% 50% / 0.12)",  border: "hsl(45 90% 45% / 0.55)",  text: "hsl(40 85% 32%)",  onSolid: "hsl(0 0% 12%)" },
  blue:      { solid: "hsl(210 80% 50%)", tint: "hsl(210 80% 50% / 0.12)", border: "hsl(210 75% 45% / 0.55)", text: "hsl(210 75% 40%)", onSolid: "hsl(0 0% 100%)" },
  red:       { solid: "hsl(0 75% 52%)",   tint: "hsl(0 75% 52% / 0.12)",   border: "hsl(0 70% 48% / 0.55)",   text: "hsl(0 70% 42%)",   onSolid: "hsl(0 0% 100%)" },
  redStripe: { solid: "hsl(0 65% 60%)",   tint: "hsl(0 65% 60% / 0.12)",   border: "hsl(0 60% 50% / 0.55)",   text: "hsl(0 60% 42%)",   onSolid: "hsl(0 0% 100%)" },
  violet:    { solid: "hsl(275 55% 50%)", tint: "hsl(275 55% 50% / 0.12)", border: "hsl(275 50% 45% / 0.55)", text: "hsl(275 50% 42%)", onSolid: "hsl(0 0% 100%)" },
  green:     { solid: "hsl(140 55% 40%)", tint: "hsl(140 55% 40% / 0.12)", border: "hsl(140 50% 38% / 0.55)", text: "hsl(140 55% 30%)", onSolid: "hsl(0 0% 100%)" },
  orange:    { solid: "hsl(25 90% 52%)",  tint: "hsl(25 90% 52% / 0.12)",  border: "hsl(25 85% 48% / 0.55)",  text: "hsl(25 85% 38%)",  onSolid: "hsl(0 0% 12%)" },
  pink:      { solid: "hsl(335 70% 60%)", tint: "hsl(335 70% 60% / 0.12)", border: "hsl(335 65% 55% / 0.55)", text: "hsl(335 65% 45%)", onSolid: "hsl(0 0% 100%)" },
  grey:      { solid: "hsl(220 8% 45%)",  tint: "hsl(220 8% 45% / 0.12)",  border: "hsl(220 8% 40% / 0.55)",  text: "hsl(220 8% 35%)",  onSolid: "hsl(0 0% 100%)" },
  brown:     { solid: "hsl(25 35% 38%)",  tint: "hsl(25 35% 38% / 0.12)",  border: "hsl(25 30% 35% / 0.55)",  text: "hsl(25 35% 30%)",  onSolid: "hsl(0 0% 100%)" },
  teal:      { solid: "hsl(180 55% 38%)", tint: "hsl(180 55% 38% / 0.12)", border: "hsl(180 50% 35% / 0.55)", text: "hsl(180 55% 30%)", onSolid: "hsl(0 0% 100%)" },
  neutral:   { solid: "hsl(220 10% 55%)", tint: "hsl(220 10% 55% / 0.10)", border: "hsl(220 10% 50% / 0.45)", text: "hsl(220 10% 40%)", onSolid: "hsl(0 0% 100%)" },
} as const;

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

/**
 * Map a drug_class string (free text from the database) to its label colour.
 * Order of checks matters: most specific category first.
 */
function paletteFor(rawClass: string): PaletteKey {
  const c = rawClass.toLowerCase();

  // Induction & volatile anaesthetics → yellow
  if (c.includes("induction agent")) return "yellow";
  if (c.includes("volatile")) return "yellow";

  // Opioids → blue (antagonists handled with the reversal rule below)
  if (c.includes("opioid antagonist")) return "redStripe";
  if (c.includes("opioid")) return "blue";

  // NMBAs → red; reversal → red/white stripe
  if (c.includes("nmba reversal") || c.includes("benzodiazepine antagonist")) return "redStripe";
  if (c.includes("nmba") || c.includes("muscle relaxant") || c.includes("depolarising")) return "red";

  // Local anaesthetics → grey (LA toxicity rescue stays grey for context)
  if (c.includes("local anaesthetic") || c.includes("la toxicity")) return "grey";

  // Benzodiazepines & sedatives → orange
  if (c.includes("benzodiazepine") || c.startsWith("sedative")) return "orange";

  // Anticholinergics → green
  if (c.includes("anticholinergic")) return "green";

  // Antiemetics → salmon/pink
  if (c.includes("antiemetic")) return "pink";

  // Vasopressors, inotropes, vasodilators, β-blockers, antiarrhythmics → violet (vasoactives)
  if (
    c.includes("vasopressor") ||
    c.includes("vasodilator") ||
    c.includes("inotrope") ||
    c.includes("antiarrhythmic") ||
    c.includes("β-blocker") ||
    c.includes("α/β-blocker") ||
    c.includes("pulmonary vasodilator") ||
    c.includes("vasopressin")
  ) return "violet";

  // Anticoagulants / antiplatelets / antifibrinolytics / thrombolytics → tan
  if (
    c.includes("anticoagulant") ||
    c.includes("antiplatelet") ||
    c.includes("antifibrinolytic") ||
    c.includes("thrombolytic")
  ) return "brown";

  // Antimicrobials / antifungals / antivirals → teal (non-standard, useful grouping)
  if (c.includes("antimicrobial") || c.includes("antifungal") || c.includes("antiviral")) return "teal";

  // Everything else (fluids, electrolytes, steroids, diuretics, endocrine, etc.) → neutral
  return "neutral";
}

export function getDrugLabelStyle(drugClass: string): DrugLabelStyle {
  const key = paletteFor(drugClass || "");
  const p = PALETTE[key];
  return {
    bgClass: `bg-[${p.tint}]`,
    textClass: `text-[${p.text}]`,
    borderClass: `border-[${p.border}]`,
    solidBgClass: `bg-[${p.solid}]`,
    solidTextClass: `text-[${p.onSolid}]`,
    standardName: STANDARD_NAME[key],
  };
}

/**
 * Inline-style helpers — used where Tailwind arbitrary values would be purged
 * (e.g. dynamic chip backgrounds in lists with many distinct classes).
 */
export function getDrugLabelInlineStyles(drugClass: string) {
  const key = paletteFor(drugClass || "");
  const p = PALETTE[key];
  return {
    tint: { backgroundColor: p.tint, color: p.text, borderColor: p.border },
    solid: { backgroundColor: p.solid, color: p.onSolid, borderColor: p.solid },
    railColor: p.solid,
    standardName: STANDARD_NAME[key],
  };
}

/** Ordered legend entries for the formulary key. */
export const DRUG_LABEL_LEGEND: Array<{ name: string; example: string; style: { backgroundColor: string; color: string } }> = (
  Object.keys(PALETTE) as PaletteKey[]
).map((k) => ({
  name: STANDARD_NAME[k],
  example: k,
  style: { backgroundColor: PALETTE[k].solid, color: PALETTE[k].onSolid },
}));

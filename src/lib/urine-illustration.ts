// Segments along the nephron, x positions, and baseline osmolality behaviour.
// Unvalidated continuous teaching profiles; 0..1 denotes relative antidiuretic effect, not hormone concentration.
// ADH affects: medullary collecting duct water permeability (and to a lesser extent CCD),
// and (via urea recycling) the inner medullary interstitial gradient.

interface Segment {
  id: string;
  label: string;
  x: number; // 0-1
  baselineOsm: number; // tubular fluid osmolality at minimum ADH
  // function of adh -> osmolality
  osm: (adh: number) => number;
  note: (adh: number) => string;
  zone: "cortex" | "outer-med" | "inner-med";
}

export const segments: Segment[] = [
  {
    id: "bowman",
    label: "Bowman's space",
    x: 0.02,
    baselineOsm: 300,
    osm: () => 300,
    note: () => "Glomerular filtrate is iso-osmotic with plasma (~300 mOsm/kg) regardless of ADH.",
    zone: "cortex",
  },
  {
    id: "pct-end",
    label: "End PCT",
    x: 0.18,
    baselineOsm: 300,
    osm: () => 300,
    note: () => "PCT reabsorbs ~65% of filtered Na⁺ and water iso-osmotically — fluid leaves PCT still at ~300 mOsm/kg.",
    zone: "cortex",
  },
  {
    id: "tdl",
    label: "Tip of loop",
    x: 0.4,
    baselineOsm: 1200,
    osm: (adh) => 800 + adh * 400,
    note: () => "Illustrative loop-tip fluid follows the selected medullary maximum; this simplified profile is not a measurement.",
    zone: "inner-med",
  },
  {
    id: "tal-end",
    label: "End TAL",
    x: 0.6,
    baselineOsm: 100,
    osm: () => 100,
    note: () => "Thick ascending limb is the 'diluting segment' — actively reabsorbs Na⁺/K⁺/2Cl⁻ via NKCC2 but is impermeable to water. Fluid leaves hypotonic at ~100 mOsm/kg regardless of ADH.",
    zone: "outer-med",
  },
  {
    id: "dct-end",
    label: "End DCT",
    x: 0.72,
    baselineOsm: 100,
    osm: (adh) => 100 + adh * 50, // mild concentration possible
    note: (adh) => adh > 0.3 ? "DCT is largely water-impermeable; small ADH effect possible at the late DCT/connecting tubule." : "Fluid remains hypotonic — ~100 mOsm/kg.",
    zone: "cortex",
  },
  {
    id: "ccd",
    label: "End CCD",
    x: 0.84,
    baselineOsm: 100,
    // cortical collecting duct equilibrates with cortical interstitium (~300) when ADH high
    osm: (adh) => 100 + adh * 200,
    note: (adh) =>
      adh < 0.15
        ? "No ADH → CCD water-impermeable → fluid still ~100 mOsm/kg."
        : adh > 0.7
        ? "High ADH → AQP2 inserted → fluid equilibrates with cortical interstitium (~300 mOsm/kg)."
        : "Partial AQP2 insertion → intermediate osmolality.",
    zone: "cortex",
  },
  {
    id: "mcd-mid",
    label: "Mid MCD",
    x: 0.92,
    baselineOsm: 90,
    osm: (adh) => 80 + adh * ((800 + adh * 400) - 80),
    note: () => "Medullary collecting duct passes through the corticomedullary gradient — water reabsorption depends on acute apical AQP2 insertion; water exits basolaterally through AQP3/4.",
    zone: "outer-med",
  },
  {
    id: "final",
    label: "Final urine",
    x: 0.99,
    baselineOsm: 50,
    osm: (adh) => 50 + adh * ((800 + adh * 400) - 50),
    note: (adh) => {
      const u = 50 + adh * ((800 + adh * 400) - 50);
      if (u < 300) return "Illustrative urine below assumed plasma osmolality: positive conventional free-water clearance relative to plasma, not a diagnosis.";
      return "Illustrative antidiuresis. Urine volume = excreted osmoles / urine osmolality; no fixed obligatory daily volume or diagnosis follows.";
    },
    zone: "inner-med",
  },
];

// Get an interpolated osmolality at any x along the nephron for the line trace
export const interpolateOsm = (x: number, adh: number) => {
  if (x <= segments[0].x) return segments[0].osm(adh);
  for (let i = 0; i < segments.length - 1; i++) {
    const a = segments[i];
    const b = segments[i + 1];
    if (x >= a.x && x <= b.x) {
      const t = (x - a.x) / (b.x - a.x);
      const aOsm = a.osm(adh);
      const bOsm = b.osm(adh);
      // Smooth with cosine for natural curve
      const tSmooth = (1 - Math.cos(t * Math.PI)) / 2;
      return aOsm + (bOsm - aOsm) * tSmooth;
    }
  }
  return segments[segments.length - 1].osm(adh);
};


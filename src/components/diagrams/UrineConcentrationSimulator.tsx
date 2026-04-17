import { useMemo, useState } from "react";

// Segments along the nephron, x positions, and baseline osmolality behaviour.
// We model osmolality (mOsm/kg) as a function of nephron segment and ADH level (0..1).
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

const segments: Segment[] = [
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
    osm: () => 1200,
    note: () => "Thin descending limb is permeable to water but not solute — fluid equilibrates with the medullary interstitium, peaking at ~1200 mOsm/kg at the papilla.",
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
    osm: (adh) => {
      // medullary interstitium also depends a bit on ADH (urea recycling enhances gradient)
      const interstitialMax = 800 + adh * 400; // 800 → 1200
      return adh < 0.05 ? 80 : Math.min(interstitialMax * (0.4 + adh * 0.6), interstitialMax);
    },
    note: () => "Medullary collecting duct passes through the corticomedullary gradient — water reabsorption depends on AQP2 + AQP3 insertion.",
    zone: "outer-med",
  },
  {
    id: "final",
    label: "Final urine",
    x: 0.99,
    baselineOsm: 50,
    osm: (adh) => {
      // Range 50 (no ADH, max diuresis) → 1200 (max ADH, antidiuresis)
      // Smoothly interpolate via a sigmoid-like curve
      if (adh <= 0.02) return 50;
      if (adh >= 0.98) return 1200;
      const k = 6;
      const s = 1 / (1 + Math.exp(-k * (adh - 0.5)));
      return Math.round(50 + s * (1200 - 50));
    },
    note: (adh) => {
      const u = segments[segments.length - 1].osm(adh);
      if (u < 100) return "Maximally dilute urine — diabetes insipidus / water diuresis. Volume up to 18 L/day.";
      if (u < 300) return "Hypotonic urine — water excretion exceeds solute excretion (free water clearance positive).";
      if (u < 600) return "Iso- to mildly hypertonic urine — typical euvolaemic state.";
      if (u < 900) return "Concentrated urine — appropriate ADH response to hypovolaemia or hyperosmolality.";
      return "Maximally concentrated — minimum obligatory urine volume ~500 ml/day.";
    },
    zone: "inner-med",
  },
];

// Get an interpolated osmolality at any x along the nephron for the line trace
const interpolateOsm = (x: number, adh: number) => {
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
  return 300;
};

const adhPresets = [
  { label: "DI (no ADH)", value: 0, hint: "Diabetes insipidus" },
  { label: "Water load", value: 0.15, hint: "Suppressed ADH" },
  { label: "Euvolaemic", value: 0.5, hint: "Normal" },
  { label: "Dehydration", value: 0.85, hint: "High ADH" },
  { label: "SIADH / max", value: 1, hint: "Maximal ADH" },
];

export const UrineConcentrationSimulator = () => {
  const [adh, setAdh] = useState(0.5);

  const finalOsm = Math.round(segments[segments.length - 1].osm(adh));
  const interstitialMax = Math.round(800 + adh * 400);

  // Build trace path
  const W = 620;
  const H = 240;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 50;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const yForOsm = (osm: number) => padT + plotH - ((osm - 0) / 1300) * plotH;
  const xForT = (t: number) => padL + t * plotW;

  const tracePath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const osm = interpolateOsm(t, adh);
      pts.push(`${i === 0 ? "M" : "L"} ${xForT(t).toFixed(2)} ${yForOsm(osm).toFixed(2)}`);
    }
    return pts.join(" ");
  }, [adh]);

  // Interstitial gradient shading on the right axis
  const gradientStops = useMemo(() => {
    return [
      { y: yForOsm(300), osm: 300 },
      { y: yForOsm(600), osm: 600 },
      { y: yForOsm(interstitialMax), osm: interstitialMax },
    ];
  }, [interstitialMax]);

  const finalSegment = segments[segments.length - 1];

  return (
    <div className="space-y-4">
      {/* ADH slider + presets */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label htmlFor="adh-slider" className="text-sm font-semibold text-foreground">
              ADH (vasopressin) level
            </label>
            <p className="text-[11px] text-muted-foreground">Drives AQP2 insertion in the collecting duct</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{Math.round(adh * 100)}%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">of maximum</p>
          </div>
        </div>
        <input
          id="adh-slider"
          type="range"
          min={0}
          max={100}
          value={Math.round(adh * 100)}
          onChange={(e) => setAdh(Number(e.target.value) / 100)}
          className="w-full accent-primary cursor-pointer"
          aria-label="ADH level"
        />
        <div className="flex flex-wrap gap-1.5">
          {adhPresets.map((p) => (
            <button
              key={p.label}
              onClick={() => setAdh(p.value)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                Math.abs(adh - p.value) < 0.04
                  ? "bg-primary/15 border-primary/50 text-primary"
                  : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
              }`}
              title={p.hint}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Plot */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-card p-3 overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label="Tubular fluid osmolality">
            {/* Y axis grid + labels */}
            {[0, 300, 600, 900, 1200].map((osm) => (
              <g key={osm}>
                <line x1={padL} y1={yForOsm(osm)} x2={W - padR} y2={yForOsm(osm)} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.6" />
                <text x={padL - 6} y={yForOsm(osm) + 3} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">{osm}</text>
              </g>
            ))}
            <text x="10" y={padT + plotH / 2} fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle"
              transform={`rotate(-90, 10, ${padT + plotH / 2})`}>mOsm/kg</text>

            {/* Plasma reference (300) */}
            <line x1={padL} y1={yForOsm(300)} x2={W - padR} y2={yForOsm(300)} stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
            <text x={W - padR - 4} y={yForOsm(300) - 4} fontSize="8" fill="hsl(var(--primary))" textAnchor="end" fontWeight="600">plasma 300</text>

            {/* Interstitial max line */}
            <line x1={padL} y1={yForOsm(interstitialMax)} x2={W - padR} y2={yForOsm(interstitialMax)}
              stroke="hsl(15 55% 45%)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.55" />
            <text x={W - padR - 4} y={yForOsm(interstitialMax) - 3} fontSize="8" fill="hsl(15 55% 45%)" textAnchor="end" fontWeight="600">
              medullary peak {interstitialMax}
            </text>

            {/* Trace */}
            <path d={tracePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.2" />

            {/* Segment markers */}
            {segments.map((s) => {
              const osm = s.osm(adh);
              return (
                <g key={s.id}>
                  <line x1={xForT(s.x)} y1={padT} x2={xForT(s.x)} y2={padT + plotH} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
                  <circle cx={xForT(s.x)} cy={yForOsm(osm)} r="3.5" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1.2" />
                </g>
              );
            })}

            {/* X axis segment labels */}
            {segments.map((s, i) => (
              <text
                key={`xl-${s.id}`}
                x={xForT(s.x)}
                y={padT + plotH + 14}
                fontSize="7.5"
                fill="hsl(var(--muted-foreground))"
                textAnchor="middle"
                transform={`rotate(-25, ${xForT(s.x)}, ${padT + plotH + 14})`}
                fontWeight={i === segments.length - 1 ? 700 : 500}
              >
                {s.label}
              </text>
            ))}

            {/* Final urine readout */}
            <g transform={`translate(${xForT(0.99) + 6}, ${yForOsm(finalSegment.osm(adh))})`}>
              <rect x="0" y="-12" width="58" height="20" rx="3" fill="hsl(var(--primary))" />
              <text x="29" y="2" fontSize="10" fill="hsl(var(--primary-foreground))" textAnchor="middle" fontWeight="700">
                {finalOsm}
              </text>
            </g>
          </svg>
        </div>

        {/* Readouts */}
        <div className="lg:col-span-2 space-y-3">
          {/* Final urine */}
          <div className={`rounded-lg border p-3 ${
            finalOsm < 100 ? "border-blue-500/40 bg-blue-500/10" :
            finalOsm < 300 ? "border-cyan-500/40 bg-cyan-500/10" :
            finalOsm < 600 ? "border-emerald-500/40 bg-emerald-500/10" :
            finalOsm < 900 ? "border-amber-500/40 bg-amber-500/10" :
            "border-red-500/40 bg-red-500/10"
          }`}>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Final urine osmolality</p>
            <p className="text-3xl font-bold text-foreground">{finalOsm} <span className="text-sm font-medium text-muted-foreground">mOsm/kg</span></p>
            <p className="text-xs text-foreground/85 leading-relaxed mt-1">{finalSegment.note(adh)}</p>
          </div>

          {/* Key segment osmolalities */}
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-2">Tubular fluid at key sites</p>
            <div className="space-y-1.5">
              {[
                segments[1], // end PCT
                segments[2], // tip of loop
                segments[3], // end TAL
                segments[5], // end CCD
                segments[7], // final
              ].map((s) => (
                <div key={s.id} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-semibold text-foreground tabular-nums">{Math.round(s.osm(adh))} mOsm/kg</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mechanism note */}
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">Mechanism</p>
            <p className="text-[11px] text-foreground/85 leading-relaxed">
              ADH binds V2 receptors on principal cell basolateral membrane → Gs/cAMP/PKA → AQP2 vesicles fuse with apical membrane. Water flows down the corticomedullary gradient (created by the loop of Henle countercurrent multiplier and maintained by vasa recta countercurrent exchange). Urea recycling via UT-A1/A3 transporters amplifies the inner medullary gradient at high ADH.
            </p>
          </div>
        </div>
      </div>

      {/* Clinical scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold text-foreground mb-1">Diabetes insipidus</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Central (no ADH) or nephrogenic (V2/AQP2 resistance) — urine osmolality stuck low (&lt;300 mOsm/kg) despite high plasma osmolality. Polyuria (&gt;3 L/day), hypernatraemia. Slide ADH to 0%.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold text-foreground mb-1">SIADH</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Inappropriately high ADH → concentrated urine (&gt;100 mOsm/kg) with hyponatraemia and low plasma osmolality. Common post-op, with SSRIs, small-cell lung Ca, head injury. Slide ADH to 100%.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold text-foreground mb-1">Loop diuretics</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Furosemide blocks NKCC2 in the TAL → abolishes the medullary gradient → kidney can no longer concentrate or fully dilute urine, regardless of ADH. Therapeutic in fluid overload and hyponatraemia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrineConcentrationSimulator;

import { useState } from "react";

type Scenario = "normal" | "shock" | "contrast" | "nsaid";

interface ScenarioData {
  id: Scenario;
  label: string;
  cortexFlow: number; // % of RBF
  outerMedFlow: number;
  innerMedFlow: number;
  cortexO2: number; // PO2 mmHg
  outerMedO2: number;
  innerMedO2: number;
  gfr: number; // % of normal
  description: string;
  atnRisk: "low" | "moderate" | "high" | "very-high";
}

const scenarios: Record<Scenario, ScenarioData> = {
  normal: {
    id: "normal",
    label: "Normal",
    cortexFlow: 90,
    outerMedFlow: 7,
    innerMedFlow: 3,
    cortexO2: 50,
    outerMedO2: 15,
    innerMedO2: 8,
    gfr: 100,
    description: "Cortex receives ~90% of RBF; medulla only 5–10%. Low medullary flow is essential to preserve the corticomedullary osmotic gradient (countercurrent exchange in vasa recta would otherwise wash it out). The trade-off: the outer medulla operates on the edge of hypoxia at baseline.",
    atnRisk: "low",
  },
  shock: {
    id: "shock",
    label: "Shock / Hypotension",
    cortexFlow: 60,
    outerMedFlow: 4,
    innerMedFlow: 2,
    cortexO2: 35,
    outerMedO2: 6,
    innerMedO2: 4,
    gfr: 30,
    description: "Sympathetic + RAAS activation redistributes flow away from the cortex. Efferent arteriolar constriction (angiotensin II) preserves GFR initially, but absolute medullary flow falls. The thick ascending limb in the outer medulla — already O₂-starved due to high active NKCC2 reabsorption — tips into ischaemia → ATN.",
    atnRisk: "very-high",
  },
  contrast: {
    id: "contrast",
    label: "IV Contrast",
    cortexFlow: 80,
    outerMedFlow: 3,
    innerMedFlow: 2,
    cortexO2: 45,
    outerMedO2: 5,
    innerMedO2: 4,
    gfr: 70,
    description: "Iodinated contrast causes biphasic vasoconstriction (endothelin, adenosine) and direct tubular toxicity. Outer medullary blood flow drops disproportionately while contrast-induced osmotic diuresis ↑ NKCC2 activity → ↑ O₂ demand at the worst possible moment. Classic outer medullary ATN.",
    atnRisk: "high",
  },
  nsaid: {
    id: "nsaid",
    label: "NSAID + ACEi",
    cortexFlow: 70,
    outerMedFlow: 5,
    innerMedFlow: 3,
    cortexO2: 40,
    outerMedO2: 10,
    innerMedO2: 6,
    gfr: 50,
    description: "NSAIDs block prostaglandin-mediated afferent vasodilation; ACEi/ARBs block angiotensin-mediated efferent constriction. The kidney loses both autoregulatory levers — GFR collapses when perfusion falls. High-risk in dehydration, sepsis, or with diuretics ('triple whammy').",
    atnRisk: "high",
  },
};

const riskStyles = {
  low: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  moderate: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  "very-high": "bg-red-500/10 text-red-500 border-red-500/30",
};

const riskLabel = {
  low: "Low ATN risk",
  moderate: "Moderate ATN risk",
  high: "High ATN risk",
  "very-high": "Very high ATN risk",
};

export const RenalBloodFlowDiagram = () => {
  const [scenario, setScenario] = useState<Scenario>("normal");
  const data = scenarios[scenario];

  // Total RBF normally ≈ 1100 ml/min (≈20% CO)
  const totalRBF = scenario === "shock" ? 660 : scenario === "contrast" ? 880 : scenario === "nsaid" ? 770 : 1100;

  return (
        <div className="space-y-4">
      {/* Scenario selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.values(scenarios) as ScenarioData[]).map((s) => (
          <button
            key={s.id}
            onClick={() => setScenario(s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              scenario === s.id
                ? "bg-primary/15 border-primary/50 text-primary"
                : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Kidney cross-section diagram */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-card p-4">
          <svg viewBox="0 0 360 380" className="w-full" role="img" aria-label="Renal blood flow distribution">
            <defs>
              <radialGradient id="cortex-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(0 65% 60%)" stopOpacity={data.cortexFlow / 100} />
                <stop offset="100%" stopColor="hsl(0 65% 50%)" stopOpacity={(data.cortexFlow / 100) * 0.7} />
              </radialGradient>
              <radialGradient id="outerMed-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(15 60% 50%)" stopOpacity={Math.max(0.15, data.outerMedFlow / 10)} />
                <stop offset="100%" stopColor="hsl(15 60% 40%)" stopOpacity={Math.max(0.2, data.outerMedFlow / 10)} />
              </radialGradient>
              <radialGradient id="innerMed-fill" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(15 55% 35%)" stopOpacity={Math.max(0.2, data.innerMedFlow / 5)} />
                <stop offset="100%" stopColor="hsl(15 60% 25%)" stopOpacity={Math.max(0.3, data.innerMedFlow / 5)} />
              </radialGradient>
            </defs>

            {/* Kidney outline (bean shape) */}
            <path
              d="M 80 60 Q 60 60 50 110 Q 40 190 60 280 Q 80 340 160 340 Q 240 340 280 320 Q 320 290 320 200 Q 320 110 280 70 Q 240 50 180 60 Q 140 65 120 80 Q 100 60 80 60 Z"
              fill="hsl(var(--card))"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
            />

            {/* Cortex zone */}
            <path
              d="M 80 60 Q 60 60 50 110 Q 40 190 60 280 Q 80 340 160 340 Q 240 340 280 320 Q 320 290 320 200 Q 320 110 280 70 Q 240 50 180 60 Q 140 65 120 80 Q 100 60 80 60 Z"
              fill="url(#cortex-fill)"
            />

            {/* Outer medulla — pyramids */}
            {[
              { cx: 130, cy: 200 },
              { cx: 200, cy: 180 },
              { cx: 250, cy: 220 },
              { cx: 170, cy: 270 },
              { cx: 230, cy: 290 },
            ].map((p, i) => (
              <g key={i}>
                {/* Outer medulla band */}
                <ellipse cx={p.cx} cy={p.cy} rx="32" ry="40" fill="url(#outerMed-fill)" />
                {/* Inner medulla core */}
                <ellipse cx={p.cx} cy={p.cy + 5} rx="18" ry="26" fill="url(#innerMed-fill)" />
              </g>
            ))}

            {/* Renal artery + branching */}
            <g>
              <path d="M 340 200 L 300 200" stroke="hsl(0 70% 50%)" strokeWidth="3" strokeLinecap="round" />
              <text x="345" y="195" fontSize="9" fill="hsl(0 65% 50%)" fontWeight="700">Renal a.</text>
              <text x="345" y="207" fontSize="7" fill="hsl(var(--muted-foreground))">{totalRBF} ml/min</text>

              {/* Interlobar arteries */}
              {[
                { x2: 250, y2: 150 },
                { x2: 220, y2: 200 },
                { x2: 250, y2: 260 },
                { x2: 200, y2: 290 },
              ].map((b, i) => (
                <path
                  key={i}
                  d={`M 300 200 Q 275 ${(200 + b.y2) / 2} ${b.x2} ${b.y2}`}
                  stroke="hsl(0 65% 55%)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.75"
                />
              ))}
            </g>

            {/* Flow percentage labels */}
            <g>
              {/* Cortex label */}
              <rect x="60" y="95" width="64" height="32" rx="4" fill="hsl(var(--background))" stroke="hsl(0 65% 50%)" strokeWidth="1" opacity="0.95" />
              <text x="92" y="108" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">CORTEX</text>
              <text x="92" y="122" fontSize="13" fill="hsl(0 65% 50%)" textAnchor="middle" fontWeight="800">{data.cortexFlow}%</text>

              {/* Outer medulla label */}
              <rect x="260" y="100" width="78" height="42" rx="4" fill="hsl(var(--background))" stroke="hsl(15 60% 45%)" strokeWidth="1" opacity="0.95" />
              <text x="299" y="113" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">OUTER MED.</text>
              <text x="299" y="127" fontSize="13" fill="hsl(15 60% 45%)" textAnchor="middle" fontWeight="800">{data.outerMedFlow}%</text>
              <text x="299" y="138" fontSize="7" fill="hsl(0 60% 50%)" textAnchor="middle" fontWeight="600">PO₂ {data.outerMedO2} mmHg</text>

              {/* Inner medulla label */}
              <rect x="240" y="320" width="78" height="32" rx="4" fill="hsl(var(--background))" stroke="hsl(15 60% 35%)" strokeWidth="1" opacity="0.95" />
              <text x="279" y="333" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">INNER MED.</text>
              <text x="279" y="347" fontSize="13" fill="hsl(15 60% 35%)" textAnchor="middle" fontWeight="800">{data.innerMedFlow}%</text>
            </g>

            {/* ATN hot-zone overlay (outer medulla TAL) */}
            {data.outerMedO2 < 12 && (
              <g className="animate-pulse">
                {[
                  { cx: 130, cy: 200 },
                  { cx: 200, cy: 180 },
                  { cx: 250, cy: 220 },
                  { cx: 170, cy: 270 },
                  { cx: 230, cy: 290 },
                ].map((p, i) => (
                  <ellipse
                    key={`hot-${i}`}
                    cx={p.cx}
                    cy={p.cy - 18}
                    rx="22"
                    ry="8"
                    fill="hsl(0 80% 55%)"
                    opacity="0.35"
                  />
                ))}
                <text x="180" y="55" fontSize="9" fill="hsl(0 70% 50%)" textAnchor="middle" fontWeight="700">
                  ⚠ Outer medulla ischaemia (TAL)
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-2 space-y-3">
          {/* Risk badge */}
          <div className={`rounded-lg border px-3 py-2 ${riskStyles[data.atnRisk]}`}>
            <p className="text-[10px] uppercase tracking-wide opacity-80">Outcome</p>
            <p className="text-sm font-bold">{riskLabel[data.atnRisk]}</p>
            <p className="text-xs opacity-90 mt-0.5">GFR ≈ {data.gfr}% of normal</p>
          </div>

          {/* Flow / O2 bars */}
          <div className="rounded-lg border border-border bg-card p-3 space-y-2">
            <p className="text-xs font-semibold text-foreground">Regional perfusion & PO₂</p>
            {[
              { label: "Cortex", flow: data.cortexFlow, o2: data.cortexO2, color: "hsl(0 65% 55%)" },
              { label: "Outer medulla", flow: data.outerMedFlow, o2: data.outerMedO2, color: "hsl(15 60% 50%)" },
              { label: "Inner medulla", flow: data.innerMedFlow, o2: data.innerMedO2, color: "hsl(15 55% 35%)" },
            ].map((row) => (
              <div key={row.label} className="space-y-0.5">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{row.label}</span>
                  <span>{row.flow}% RBF · {row.o2} mmHg</span>
                </div>
                <div className="h-1.5 bg-secondary/60 rounded-full overflow-hidden">
                  <div className="h-full transition-all duration-500" style={{ width: `${row.flow}%`, backgroundColor: row.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">{data.label}</p>
            <p className="text-xs text-foreground/90 leading-relaxed">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Concept cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold text-foreground mb-1">Why so little medullary flow?</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            High medullary flow would wash out the corticomedullary osmotic gradient via the vasa recta. Low, slow flow is essential for countercurrent exchange to preserve the gradient → urine concentration.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold text-foreground mb-1">Why is the outer medulla vulnerable?</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The thick ascending limb (TAL) sits in the outer medulla and consumes huge amounts of O₂ to power NKCC2. Combined with low baseline flow (PO₂ ≈ 10–20 mmHg), it operates at the edge of hypoxia.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold text-foreground mb-1">Clinical translation</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sepsis, hypovolaemia, contrast, NSAIDs, ACEi/ARBs all target this fragile balance — explaining why ATN almost always begins in the outer medullary TAL.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RenalBloodFlowDiagram;

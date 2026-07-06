import { AnimatedMechanism, AnimatedMechanismStep } from "@/components/diagrams/shared/AnimatedMechanism";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Thyroid storm — pathophysiology + emergency treatment animation.
 * Five steps following the classical "block synthesis → block release →
 * block conversion → block adrenergics → support" framework, with
 * Burch-Wartofsky scoring threshold flagged.
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Trigger",
    detail: (
      <>
        Decompensation of underlying hyperthyroidism (Graves', toxic multinodular
        goitre, toxic adenoma) by an acute insult: <strong>infection</strong>,
        surgery (especially thyroidectomy on inadequate prep), trauma, DKA,
        iodinated contrast, parturition, withdrawal of antithyroid drug, MI.
      </>
    ),
    callout: <>Burch-Wartofsky Point Scale ≥ 45 → highly suggestive of storm; 25–44 = impending. Look for fever, tachy &gt; 140, AF, HF, agitation.</>,
  },
  {
    label: "T₃/T₄ surge",
    detail: (
      <>
        Massive release of <strong>T₄</strong> (and to a lesser extent T₃) from
        the thyroid → peripheral 5'-deiodinase converts T₄ → active{" "}
        <strong>T₃</strong>. Free hormone fractions rise dramatically.
      </>
    ),
  },
  {
    label: "Hyperadrenergia",
    detail: (
      <>
        T₃ upregulates β-adrenergic receptors → exaggerated catecholamine
        sensitivity → <strong>sinus tachycardia / AF, hypertension, tremor,
        sweating, agitation</strong>. Hyperthermia &gt; 40 °C from
        uncoupled oxidative phosphorylation.
      </>
    ),
  },
  {
    label: "End-organ failure",
    detail: (
      <>
        High-output cardiac failure, atrial fibrillation with rapid response,
        delirium → coma, hepatic dysfunction (jaundice = poor prognosis), GI
        upset, dehydration. Mortality <strong>10–30 %</strong> even with
        treatment.
      </>
    ),
  },
  {
    label: "Treatment cascade",
    detail: (
      <>
        Five-pronged attack — give in this order:
        <ol className="mt-2 space-y-1 list-decimal list-inside">
          <li><strong>β-blockade</strong>: propranolol 60–80 mg PO q4h (or esmolol IV) — also blocks T₄→T₃.</li>
          <li><strong>Block synthesis</strong>: <strong>propylthiouracil (PTU) 500–1000 mg load then 250 mg q4h</strong> (preferred — also blocks peripheral conversion). Carbimazole alternative.</li>
          <li><strong>Block release</strong>: <strong>Lugol's iodine / potassium iodide ≥ 1 h after PTU</strong> (Wolff-Chaikoff effect; iodine before thionamide → fuels storm).</li>
          <li><strong>Hydrocortisone 100 mg IV q8h</strong> — blocks T₄→T₃, treats co-existing adrenal insufficiency.</li>
          <li><strong>Supportive</strong>: active cooling (paracetamol — NOT aspirin: displaces T₄ from TBG), fluids, treat trigger.</li>
        </ol>
      </>
    ),
    callout: <>Bile-acid sequestrants (cholestyramine) interrupt enterohepatic recirculation of thyroid hormone. Plasmapheresis if refractory.</>,
  },
];

const ThyroidStormScene = ({ active }: { active: number }) => {
  const rows = [
    { label: "Trigger", sub: "infection · surgery · DKA · contrast", token: "muted-foreground" },
    { label: "T₃/T₄ surge", sub: "↑ free hormone, T₄ → T₃ peripherally", token: "clinical" },
    { label: "β-receptor amplification", sub: "tachy · AF · HTN · tremor · sweating", token: "pharmacology" },
    { label: "Hyperthermia + organ failure", sub: "T > 40°C · HF · delirium · jaundice", token: "destructive" },
    { label: "Treatment cascade", sub: "βB → PTU → iodine → steroids → cool", token: "physiology" },
  ];

  // BWPS gauge — climbs through cascade, drops on treatment
  const bwps = [10, 30, 50, 75, 30][active] ?? 0;
  const temp = [37.0, 37.6, 39.2, 41.1, 38.5][active] ?? 37;
  const hr = [90, 110, 145, 175, 105][active] ?? 80;

  return (
    <div className="w-full">
      <svg viewBox="0 0 380 290" className="w-full h-auto" role="img"
        aria-label="Thyroid storm pathophysiology and emergency treatment cascade">
        <defs>
          <linearGradient id="ts-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.4)" />
          </linearGradient>
          <marker id="ts-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>
        <rect width="380" height="290" fill="url(#ts-bg)" rx="6" />

        {rows.map((r, i) => {
          const isActive = i === active;
          const isDone = i < active;
          const y = 12 + i * 50;
          return (
            <g key={r.label} transform={`translate(12, ${y})`} opacity={isActive || isDone ? 1 : 0.35} className="transition-opacity duration-500">
              <rect width="220" height="40" rx="6"
                fill={isActive ? `hsl(var(--${r.token}) / 0.18)` : "hsl(var(--card))"}
                stroke={isActive ? `hsl(var(--${r.token}))` : "hsl(var(--border))"}
                strokeWidth={isActive ? 2 : 1} />
              <circle cx="16" cy="20" r="10" fill={isActive || isDone ? `hsl(var(--${r.token}))` : "hsl(var(--muted))"} />
              <text x="16" y="24" textAnchor="middle" className="text-[10px] font-bold"
                fill={isActive || isDone ? "hsl(var(--background))" : "hsl(var(--muted-foreground))"}>{i + 1}</text>
              <text x="32" y="17" className="text-[11px] font-semibold" fill="hsl(var(--foreground))">{r.label}</text>
              <text x="32" y="30" className="text-[9px]" fill="hsl(var(--muted-foreground))">{r.sub}</text>
            </g>
          );
        })}
        {rows.slice(0, -1).map((_, i) => {
          const lit = active > i;
          const y = 52 + i * 50;
          return (
                <line key={i} x1="122" x2="122" y1={y} y2={y + 12}
              stroke={lit ? "hsl(var(--foreground))" : "hsl(var(--border))"}
              strokeWidth={lit ? 2 : 1}
              markerEnd="url(#ts-arrow)" className="transition-colors duration-500" />
  );
        })}

        {/* BWPS gauge + vitals */}
        <g transform="translate(250, 12)">
          <text x="0" y="10" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">Burch-Wartofsky</text>
          <rect x="0" y="14" width="118" height="14" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.75" />
          <rect x="0" y="14" width={(118 * Math.min(bwps, 100)) / 100} height="14" rx="2"
            fill={bwps >= 45 ? "hsl(var(--destructive))" : bwps >= 25 ? "hsl(var(--clinical))" : "hsl(var(--accent))"}
            className="transition-all duration-700 ease-out" />
          <text x="0" y="40" className="text-[9px] font-mono tabular-nums" fill="hsl(var(--foreground))">
            BWPS {bwps} {bwps >= 45 ? "· STORM" : bwps >= 25 ? "· impending" : ""}
          </text>

          <text x="0" y="62" className="text-[9px]" fill="hsl(var(--muted-foreground))">Temperature</text>
          <text x="0" y="76" className="text-base font-mono font-bold tabular-nums"
            fill={temp >= 40 ? "hsl(var(--destructive))" : "hsl(var(--foreground))"}>{temp.toFixed(1)} °C</text>

          <text x="0" y="98" className="text-[9px]" fill="hsl(var(--muted-foreground))">Heart rate</text>
          <text x="0" y="112" className="text-base font-mono font-bold tabular-nums"
            fill={hr >= 140 ? "hsl(var(--destructive))" : "hsl(var(--foreground))"}>{hr} bpm</text>

          {/* Treatment chips appear on step 4 */}
          {active >= 4 && (
            <g transform="translate(0, 130)" className="animate-fade-in">
              {["β-block", "PTU", "iodine", "steroid", "cool"].map((d, i) => (
                <g key={d} transform={`translate(0, ${i * 18})`}>
                  <rect width="118" height="14" rx="2" fill="hsl(var(--physiology) / 0.15)" stroke="hsl(var(--physiology))" />
                  <text x="6" y="10" className="text-[8px] font-semibold" fill="hsl(var(--foreground))">
                    {i + 1}. {d}
                  </text>
                </g>
              ))}
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

const ThyroidStormAnimation = () => (
    <DiagramFigure
      id="thyroid-storm-animation"
      title="Thyroid storm"
      description="Auto-generated wrapper for the Thyroid storm animated physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <AnimatedMechanism
      title="Thyroid storm — pathophysiology + treatment cascade"
      subtitle="Burch-Wartofsky scoring and the five-step block (synthesis → release → conversion → β-effect → support)"
      steps={STEPS}
      stepMs={3600}
      accentClass="border-destructive/40"
      renderScene={(active) => <ThyroidStormScene active={active} />}
    />
    </DiagramFigure>
  );

export default ThyroidStormAnimation;

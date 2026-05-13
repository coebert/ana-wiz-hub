import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";

/**
 * Addisonian / adrenal crisis — pathophysiology + emergency management.
 * Five-step cascade: trigger → cortisol/aldosterone deficit → metabolic
 * derangement → shock → emergency steroid + fluid resuscitation.
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Trigger",
    detail: (
      <>
        Acute decompensation of <strong>primary</strong> (Addison's, autoimmune,
        TB, bilateral adrenal haemorrhage — Waterhouse-Friderichsen) or{" "}
        <strong>secondary</strong> (HPA suppression by chronic exogenous
        steroids, pituitary disease) adrenal insufficiency.
      </>
    ),
    callout: <>Stressors: infection, surgery, trauma, sudden steroid withdrawal, etomidate (single dose suppresses 11β-hydroxylase ~24 h).</>,
  },
  {
    label: "Cortisol ↓↓",
    detail: (
      <>
        Loss of <strong>cortisol</strong> → loss of permissive effect on
        catecholamines, ↓ gluconeogenesis (<strong>hypoglycaemia</strong>),
        ↑ ADH (<strong>hyponatraemia</strong>), unchecked inflammation. In
        primary failure, <strong>aldosterone</strong> is also lost →
        <strong> hyperkalaemia</strong> + sodium wasting.
      </>
    ),
    callout: <>Classic biochemistry: ↓ Na⁺, ↑ K⁺, ↓ glucose, mild metabolic acidosis, ↑ urea (volume depletion).</>,
  },
  {
    label: "Refractory shock",
    detail: (
      <>
        <strong>Distributive + hypovolaemic shock</strong>: vasopressor
        unresponsiveness ("catecholamine resistance"), abdominal pain mimicking
        surgical abdomen, fever, vomiting, confusion → coma. Suspect in any
        <em> shocked patient not responding to fluid + noradrenaline</em>.
      </>
    ),
  },
  {
    label: "Bedside diagnosis",
    detail: (
      <>
        Clinical suspicion is enough to treat — <strong>do not delay
        steroid for tests</strong>. Take a paired <strong>random cortisol
        + ACTH</strong> sample before the first dose if practical.
        Short Synacthen test once stable (not in the acute phase).
      </>
    ),
    callout: <>Random cortisol &lt; 100 nmol/L during severe stress is diagnostic; &gt; 500 effectively rules out crisis.</>,
  },
  {
    label: "Treatment",
    detail: (
      <>
        <strong>Hydrocortisone 100 mg IV stat</strong>, then 200 mg/24 h
        (50 mg q6h or infusion) — high dose has full mineralocorticoid effect,
        so fludrocortisone not required acutely. <strong>1 L 0.9% NaCl over
        1 h</strong>, glucose if hypoglycaemic, treat trigger
        (broad-spectrum antibiotics if septic). Mineralocorticoid (fludrocortisone)
        added once on oral hydrocortisone &lt; 50 mg/day.
      </>
    ),
    callout: <>Surgical / sick-day rules: triple oral dose; if NBM/vomiting → IV hydrocortisone 100 mg + 200 mg/24 h until eating.</>,
  },
];

const AdrenalCrisisScene = ({ active }: { active: number }) => {
  const rows = [
    { label: "Trigger", sub: "infection · surgery · steroid stop · etomidate", token: "muted-foreground" },
    { label: "Cortisol ± aldosterone deficit", sub: "↓ permissive effect on catechols", token: "clinical" },
    { label: "Refractory shock", sub: "fluid + noradrenaline unresponsive", token: "destructive" },
    { label: "Diagnose at bedside", sub: "treat first, sample later", token: "physiology" },
    { label: "Hydrocortisone 100 mg + fluids", sub: "full mineralocorticoid effect at high dose", token: "physiology" },
  ];

  // Vitals & biochemistry that change through the cascade
  const map = active >= 4 ? "62 → 78" : active >= 2 ? "58" : active >= 1 ? "78" : "92";
  const na = active >= 1 ? "126" : "138";
  const k = active >= 1 ? "6.2" : "4.0";
  const glu = active >= 1 ? "2.8" : "5.5";
  const cort = active >= 3 ? "< 50" : active >= 1 ? "low" : "normal";

  return (
    <div className="w-full">
      <svg viewBox="0 0 380 290" className="w-full h-auto" role="img"
        aria-label="Adrenal crisis pathophysiology and emergency management cascade">
        <defs>
          <linearGradient id="ac-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.4)" />
          </linearGradient>
          <marker id="ac-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>
        <rect width="380" height="290" fill="url(#ac-bg)" rx="6" />

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
              markerEnd="url(#ac-arrow)" className="transition-colors duration-500" />
  );
        })}

        {/* Right panel — vitals + biochem */}
        <g transform="translate(250, 12)">
          <text x="0" y="10" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">Bedside picture</text>
          {[
            { label: "MAP (mmHg)", val: map, token: active >= 4 ? "accent" : active >= 2 ? "destructive" : "foreground", lit: active >= 1 },
            { label: "Na⁺ (mmol/L)", val: na, token: active >= 1 ? "destructive" : "foreground", lit: active >= 1 },
            { label: "K⁺ (mmol/L)", val: k, token: active >= 1 ? "destructive" : "foreground", lit: active >= 1 },
            { label: "Glucose (mmol/L)", val: glu, token: active >= 1 ? "destructive" : "foreground", lit: active >= 1 },
            { label: "Cortisol", val: cort, token: active >= 3 ? "destructive" : "foreground", lit: active >= 3 },
          ].map((it, i) => (
            <g key={it.label} transform={`translate(0, ${22 + i * 30})`} opacity={it.lit ? 1 : 0.35} className="transition-opacity duration-500">
              <rect width="118" height="24" rx="3"
                fill={it.lit ? `hsl(var(--${it.token}) / 0.12)` : "hsl(var(--muted))"}
                stroke={it.lit ? `hsl(var(--${it.token}))` : "hsl(var(--border))"} />
              <text x="6" y="10" className="text-[8px]" fill="hsl(var(--muted-foreground))">{it.label}</text>
              <text x="6" y="20" className="text-[10px] font-mono font-bold tabular-nums" fill={`hsl(var(--${it.token}))`}>
                {it.val}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

const AdrenalCrisisAnimation = () => (
      <AnimatedMechanism
    title="Adrenal (Addisonian) crisis — pathophysiology + management"
    subtitle="Refractory shock with low Na⁺, high K⁺ and low glucose — treat with hydrocortisone before tests"
    steps={STEPS}
    stepMs={3400}
    accentClass="border-destructive/40"
    renderScene={(active) => <AdrenalCrisisScene active={active} />}
  />
  );

export default AdrenalCrisisAnimation;

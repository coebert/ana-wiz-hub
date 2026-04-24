import { useState } from "react";
import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";

/**
 * Refeeding syndrome — pathophysiology animation.
 *
 * Walks the learner from prolonged starvation through the insulin surge,
 * intracellular electrolyte shift, thiamine depletion, and the resulting
 * cardiac / neurological / respiratory sequelae. Designed for the
 * ICU Nutrition topic.
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Starvation",
    detail: (
      <>
        After ~5 days of negligible intake the body switches from glycolysis to{" "}
        <strong>lipolysis &amp; ketogenesis</strong>. Insulin falls, glucagon
        rises. Total-body K⁺, PO₄³⁻ and Mg²⁺ are <em>depleted</em> (lost in
        urine, shifted out of cells) but serum levels often look{" "}
        <em>normal</em> because the intracellular pool is collapsing in
        parallel. Thiamine (B₁) stores last only 2–3 weeks.
      </>
    ),
    callout: (
      <>
        Pre-feed serum K⁺ / PO₄ / Mg²⁺ <strong>under-estimate</strong> the
        deficit — replace empirically before feeding starts.
      </>
    ),
  },
  {
    label: "Carb load",
    detail: (
      <>
        Carbohydrate (enteral, parenteral or IV dextrose) hits a
        carbohydrate-naïve metabolism. Glucose floods the portal circulation,
        β-cells respond with a <strong>large insulin surge</strong> — the
        single trigger of the entire syndrome.
      </>
    ),
    callout: (
      <>
        Even 5% dextrose maintenance fluid can precipitate refeeding in
        extreme-risk patients (BMI &lt; 14, &gt; 15 d nil intake).
      </>
    ),
  },
  {
    label: "Insulin surge",
    detail: (
      <>
        Insulin drives <strong>K⁺, PO₄³⁻ and Mg²⁺ into cells</strong> alongside
        glucose to fuel renewed glycolysis and ATP synthesis. Phosphate is
        consumed making 2,3-DPG and ATP; magnesium is a co-factor for Na⁺/K⁺
        ATPase. Sodium and water are retained → <strong>fluid overload</strong>.
      </>
    ),
    callout: (
      <>
        Hallmark biochemistry: <strong>↓PO₄³⁻ (&lt; 0.5 mmol/L)</strong>, ↓K⁺,
        ↓Mg²⁺, often with hyperglycaemia.
      </>
    ),
  },
  {
    label: "Thiamine depletion",
    detail: (
      <>
        Thiamine (vitamin B₁) is the cofactor for{" "}
        <strong>pyruvate dehydrogenase</strong> and transketolase. Sudden
        carbohydrate metabolism consumes the last reserves → pyruvate cannot
        enter the TCA cycle → <strong>lactic acidosis</strong> and{" "}
        <strong>Wernicke's encephalopathy</strong> (ophthalmoplegia, ataxia,
        confusion).
      </>
    ),
    callout: (
      <>
        Give <strong>IV thiamine 200–300 mg before</strong> the first
        carbohydrate, then daily for 3–10 days. Cheap, safe, mandatory.
      </>
    ),
  },
  {
    label: "Clinical sequelae",
    detail: (
      <>
        End-organ effects of the electrolyte shift:
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>
            <strong>Cardiac</strong>: arrhythmia, QT prolongation, cardiac
            failure, sudden death (↓PO₄ ↓K⁺ ↓Mg²⁺ + fluid overload).
          </li>
          <li>
            <strong>Respiratory</strong>: diaphragmatic weakness, failure to
            wean (ATP-depleted muscle).
          </li>
          <li>
            <strong>Neuro</strong>: Wernicke's, seizures, paraesthesia,
            rhabdomyolysis.
          </li>
          <li>
            <strong>Haem</strong>: haemolysis, leucocyte dysfunction (↓2,3-DPG,
            ↓ATP in RBCs).
          </li>
        </ul>
      </>
    ),
    callout: (
      <>
        Prevention: start <strong>10 kcal/kg/day</strong> (5 if extreme),
        replace electrolytes <em>during</em> feeding, daily U&amp;E + PO₄ + Mg
        for the first week, cardiac monitoring days 3–7.
      </>
    ),
  },
];

/**
 * Visual scene — five-row cascade. The active row brightens; arrows between
 * rows light up as the cascade progresses. A small "serum vs intracellular"
 * compartment bar on the right shows the electrolyte shift.
 */
const RefeedingScene = ({ active }: { active: number }) => {
  const rows = [
    { label: "Starvation", sub: "Catabolism · ↓insulin · depleted K⁺/PO₄/Mg²⁺", token: "muted-foreground" },
    { label: "Carbohydrate load", sub: "Feed / dextrose introduced", token: "clinical" },
    { label: "Insulin surge", sub: "K⁺ · PO₄³⁻ · Mg²⁺ → intracellular", token: "pharmacology" },
    { label: "Thiamine consumed", sub: "PDH cofactor exhausted → lactate", token: "physiology" },
    { label: "Sequelae", sub: "Arrhythmia · Wernicke · resp failure", token: "destructive" },
  ];

  const [showThiamineTip, setShowThiamineTip] = useState(false);

  // Compartment shift — extracellular bar shrinks, intracellular bar grows
  // once the insulin step is reached.
  const shifted = active >= 2;
  const extraPct = shifted ? 35 : 80;
  const intraPct = shifted ? 95 : 60;

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 380 280"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Refeeding syndrome cascade — five-step pathophysiology"
      >
        <defs>
          <linearGradient id="rfs-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.4)" />
          </linearGradient>
          <marker
            id="rfs-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>

        <rect width="380" height="280" fill="url(#rfs-bg)" rx="6" />

        {/* Cascade rows — left column */}
        {rows.map((r, i) => {
          const isActive = i === active;
          const isDone = i < active;
          const y = 12 + i * 50;
          return (
            <g
              key={r.label}
              transform={`translate(12, ${y})`}
              opacity={isActive || isDone ? 1 : 0.35}
              className="transition-opacity duration-500"
            >
              <rect
                width="220"
                height="40"
                rx="6"
                fill={
                  isActive
                    ? `hsl(var(--${r.token}) / 0.18)`
                    : "hsl(var(--card))"
                }
                stroke={
                  isActive
                    ? `hsl(var(--${r.token}))`
                    : "hsl(var(--border))"
                }
                strokeWidth={isActive ? 2 : 1}
              />
              <circle
                cx="16"
                cy="20"
                r="10"
                fill={
                  isActive || isDone
                    ? `hsl(var(--${r.token}))`
                    : "hsl(var(--muted))"
                }
              />
              <text
                x="16"
                y="24"
                textAnchor="middle"
                className="text-[10px] font-bold"
                fill={
                  isActive || isDone
                    ? "hsl(var(--background))"
                    : "hsl(var(--muted-foreground))"
                }
              >
                {i + 1}
              </text>
              <text
                x="32"
                y="17"
                className="text-[11px] font-semibold"
                fill="hsl(var(--foreground))"
              >
                {r.label}
              </text>
              <text
                x="32"
                y="30"
                className="text-[9px]"
                fill="hsl(var(--muted-foreground))"
              >
                {r.sub}
              </text>
            </g>
          );
        })}

        {/* Connecting arrows between rows */}
        {rows.slice(0, -1).map((_, i) => {
          const lit = active > i;
          const y = 52 + i * 50;
          return (
            <line
              key={`arrow-${i}`}
              x1="122"
              x2="122"
              y1={y}
              y2={y + 12}
              stroke={lit ? "hsl(var(--foreground))" : "hsl(var(--border))"}
              strokeWidth={lit ? 2 : 1}
              markerEnd="url(#rfs-arrow)"
              className="transition-colors duration-500"
            />
          );
        })}

        {/* Right-hand compartment panel — extracellular vs intracellular */}
        <g transform="translate(250, 12)">
          <text
            x="0"
            y="10"
            className="text-[10px] font-semibold"
            fill="hsl(var(--foreground))"
          >
            K⁺ · PO₄³⁻ · Mg²⁺
          </text>

          {/* Extracellular (serum) */}
          <text x="0" y="30" className="text-[9px]" fill="hsl(var(--muted-foreground))">
            Serum
          </text>
          <rect x="0" y="34" width="110" height="14" rx="2" fill="hsl(var(--muted))" />
          <rect
            x="0"
            y="34"
            width={(110 * extraPct) / 100}
            height="14"
            rx="2"
            fill="hsl(var(--clinical))"
            className="transition-all duration-700 ease-out"
          />
          <text
            x={(110 * extraPct) / 100 + 4}
            y="44"
            className="text-[8px] font-mono tabular-nums"
            fill="hsl(var(--foreground))"
            style={{ transition: "all 0.7s" }}
          >
            {shifted ? "↓↓" : "≈"}
          </text>

          {/* Intracellular */}
          <text x="0" y="68" className="text-[9px]" fill="hsl(var(--muted-foreground))">
            Intracellular
          </text>
          <rect x="0" y="72" width="110" height="14" rx="2" fill="hsl(var(--muted))" />
          <rect
            x="0"
            y="72"
            width={(110 * intraPct) / 100}
            height="14"
            rx="2"
            fill="hsl(var(--pharmacology))"
            className="transition-all duration-700 ease-out"
          />
          <text
            x={(110 * intraPct) / 100 + 4}
            y="82"
            className="text-[8px] font-mono tabular-nums"
            fill="hsl(var(--foreground))"
          >
            {shifted ? "↑↑" : "↓"}
          </text>

          {/* Insulin tag */}
          <g transform="translate(0, 102)" opacity={active >= 1 ? 1 : 0.2} className="transition-opacity duration-500">
            <rect width="110" height="22" rx="3" fill="hsl(var(--clinical) / 0.18)" stroke="hsl(var(--clinical))" />
            <text x="55" y="15" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
              insulin {active >= 2 ? "↑↑↑" : active >= 1 ? "↑" : "—"}
            </text>
          </g>

          {/* Thiamine tag */}
          <g transform="translate(0, 132)" opacity={active >= 3 ? 1 : 0.25} className="transition-opacity duration-500">
            <rect width="110" height="22" rx="3" fill="hsl(var(--physiology) / 0.18)" stroke="hsl(var(--physiology))" />
            <text x="55" y="15" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
              thiamine {active >= 3 ? "✗ depleted" : "low reserve"}
            </text>
          </g>

          {/* Clinical alert */}
          {active >= 4 && (
            <g transform="translate(0, 162)" className="animate-fade-in">
              <rect width="110" height="36" rx="3" fill="hsl(var(--destructive) / 0.18)" stroke="hsl(var(--destructive))" />
              <text x="55" y="15" textAnchor="middle" className="text-[9px] font-bold" fill="hsl(var(--destructive))">
                ⚠ arrhythmia
              </text>
              <text x="55" y="28" textAnchor="middle" className="text-[8px]" fill="hsl(var(--foreground))">
                weakness · Wernicke
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

const RefeedingSyndromeAnimation = () => {
  return (
    <AnimatedMechanism
      title="Refeeding syndrome — pathophysiology"
      subtitle="From starvation to insulin-driven electrolyte shift, thiamine depletion and end-organ injury"
      steps={STEPS}
      stepMs={3200}
      accentClass="border-destructive/40"
      renderScene={(active) => <RefeedingScene active={active} />}
    />
  );
};

export default RefeedingSyndromeAnimation;

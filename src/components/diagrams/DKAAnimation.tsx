import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Diabetic ketoacidosis — pathophysiology animation.
 *
 * Six-step cascade: insulin deficiency → counter-regulatory surge →
 * lipolysis & ketogenesis → high-anion-gap acidosis → osmotic diuresis &
 * dehydration → potassium paradox → resolution with treatment.
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Insulin deficit",
    detail: (
      <>
        Absolute (T1DM) or relative (T2DM, sepsis, MI, missed dose, SGLT2-i)
        insulin deficiency. Cells starve despite hyperglycaemia.
      </>
    ),
    callout: <>Triggers: infection (30–40%), missed insulin (25%), new T1DM, MI/CVA, drugs (steroids, SGLT2-i → euglycaemic DKA).</>,
  },
  {
    label: "Counter-reg surge",
    detail: (
      <>
        Glucagon, cortisol, catecholamines and growth hormone rise →{" "}
        <strong>gluconeogenesis</strong> + <strong>glycogenolysis</strong> →
        worsening hyperglycaemia (typically &gt; 14 mmol/L).
      </>
    ),
  },
  {
    label: "Ketogenesis",
    detail: (
      <>
        Lipolysis releases free fatty acids → hepatic β-oxidation produces{" "}
        <strong>acetoacetate</strong> and <strong>β-hydroxybutyrate</strong> →
        ketonaemia (≥ 3 mmol/L) and ketonuria.
      </>
    ),
    callout: <>JBDS-IP diagnostic triad: glucose &gt; 11 mmol/L (or known DM) + ketones ≥ 3 mmol/L (or 2+ on dipstick) + pH &lt; 7.30 / HCO₃⁻ &lt; 15.</>,
  },
  {
    label: "HAGMA",
    detail: (
      <>
        Ketoacids dissociate → high-anion-gap metabolic acidosis. Compensatory
        Kussmaul respiration (deep, sighing). Acetone gives a fruity breath.
      </>
    ),
  },
  {
    label: "Osmotic diuresis",
    detail: (
      <>
        Glycosuria once renal threshold (~10 mmol/L) exceeded → osmotic
        diuresis → severe dehydration (5–10 L deficit), prerenal AKI,
        hypoperfusion that worsens lactic acidosis.
      </>
    ),
    callout: <>Total body deficit ≈ 100 ml/kg water, 7 mmol/kg Na⁺, 5 mmol/kg K⁺, 3–7 mmol/kg PO₄.</>,
  },
  {
    label: "K⁺ paradox & Rx",
    detail: (
      <>
        Serum K⁺ often <em>normal or high</em> on presentation (acidosis +
        insulin deficit shift K⁺ extracellularly) <strong>despite</strong>{" "}
        massive total-body depletion. Insulin + correction of acidosis drives
        K⁺ back into cells → rapid hypokalaemia.
        <br />
        <br />
        <strong>JBDS-IP treatment:</strong> 0.9% NaCl 1 L over 1 h, then add{" "}
        <strong>fixed-rate insulin 0.1 U/kg/h</strong>. Add KCl when K⁺ &lt; 5.5
        (40 mmol/L if K⁺ 3.5–5.5). Continue patient's long-acting insulin.
        Switch to 10% dextrose when glucose &lt; 14.
      </>
    ),
    callout: <>Resolution criteria: ketones &lt; 0.6, venous pH &gt; 7.30, HCO₃⁻ &gt; 18. Avoid bicarbonate (cerebral oedema, paradoxical CSF acidosis).</>,
  },
];

const DKAScene = ({ active }: { active: number }) => {
  const rows = [
    { label: "Insulin ↓↓", sub: "absolute or relative deficiency", token: "muted-foreground" },
    { label: "Counter-reg ↑", sub: "glucagon, cortisol, catechol, GH", token: "clinical" },
    { label: "Ketogenesis", sub: "FFA → acetoacetate, β-OH-butyrate", token: "pharmacology" },
    { label: "HAGMA", sub: "pH ↓, HCO₃⁻ ↓, Kussmaul breathing", token: "physiology" },
    { label: "Osmotic diuresis", sub: "5–10 L deficit, AKI, lactate ↑", token: "clinical" },
    { label: "K⁺ paradox", sub: "high serum, depleted body — fix on insulin", token: "destructive" },
  ];

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 380 320"
        className="w-full h-auto"
        role="img"
        aria-label="DKA pathophysiology cascade — six-step mechanism"
      >
        <defs>
          <linearGradient id="dka-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.4)" />
          </linearGradient>
          <marker id="dka-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>
        <rect width="380" height="320" fill="url(#dka-bg)" rx="6" />

        {rows.map((r, i) => {
          const isActive = i === active;
          const isDone = i < active;
          const y = 12 + i * 48;
          return (
            <g key={r.label} transform={`translate(12, ${y})`} opacity={isActive || isDone ? 1 : 0.35} className="transition-opacity duration-500">
              <rect width="220" height="38" rx="6"
                fill={isActive ? `hsl(var(--${r.token}) / 0.18)` : "hsl(var(--card))"}
                stroke={isActive ? `hsl(var(--${r.token}))` : "hsl(var(--border))"}
                strokeWidth={isActive ? 2 : 1} />
              <circle cx="16" cy="19" r="10" fill={isActive || isDone ? `hsl(var(--${r.token}))` : "hsl(var(--muted))"} />
              <text x="16" y="23" textAnchor="middle" className="text-[10px] font-bold"
                fill={isActive || isDone ? "hsl(var(--background))" : "hsl(var(--muted-foreground))"}>{i + 1}</text>
              <text x="32" y="16" className="text-[11px] font-semibold" fill="hsl(var(--foreground))">{r.label}</text>
              <text x="32" y="29" className="text-[9px]" fill="hsl(var(--muted-foreground))">{r.sub}</text>
            </g>
          );
        })}
        {rows.slice(0, -1).map((_, i) => {
          const lit = active > i;
          const y = 50 + i * 48;
          return (
                <line key={i} x1="122" x2="122" y1={y} y2={y + 10}
              stroke={lit ? "hsl(var(--foreground))" : "hsl(var(--border))"}
              strokeWidth={lit ? 2 : 1}
              markerEnd="url(#dka-arrow)" className="transition-colors duration-500" />
  );
        })}

        {/* Right panel — biochemistry snapshot */}
        <g transform="translate(250, 12)">
          <text x="0" y="10" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">DKA biochemistry</text>
          {[
            { label: "Glucose", val: active >= 1 ? "22 mmol/L" : "12", lit: active >= 1, token: "clinical" },
            { label: "Ketones", val: active >= 2 ? "5.2 mmol/L" : "0.4", lit: active >= 2, token: "pharmacology" },
            { label: "pH", val: active >= 3 ? "7.12" : "7.38", lit: active >= 3, token: "physiology" },
            { label: "HCO₃⁻", val: active >= 3 ? "8 mmol/L" : "24", lit: active >= 3, token: "physiology" },
            { label: "K⁺ (serum)", val: active >= 5 ? "5.8 → 3.4" : active >= 4 ? "5.8" : "4.1", lit: active >= 4, token: "destructive" },
            { label: "Anion gap", val: active >= 3 ? "26" : "10", lit: active >= 3, token: "physiology" },
          ].map((it, i) => (
            <g key={it.label} transform={`translate(0, ${22 + i * 30})`} opacity={it.lit ? 1 : 0.35} className="transition-opacity duration-500">
              <rect width="118" height="24" rx="3"
                fill={it.lit ? `hsl(var(--${it.token}) / 0.15)` : "hsl(var(--muted))"}
                stroke={it.lit ? `hsl(var(--${it.token}))` : "hsl(var(--border))"} />
              <text x="6" y="10" className="text-[8px]" fill="hsl(var(--muted-foreground))">{it.label}</text>
              <text x="6" y="20" className="text-[10px] font-mono font-bold tabular-nums" fill="hsl(var(--foreground))">{it.val}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

const DKAAnimation = () => (
    <DiagramFigure
      id="dka-animation"
      title="DKA"
      description="Auto-generated wrapper for the DKA animated physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <AnimatedMechanism
      title="Diabetic ketoacidosis — pathophysiology"
      subtitle="From insulin deficiency to ketogenesis, HAGMA, dehydration and the potassium paradox (JBDS-IP 2023)"
      steps={STEPS}
      stepMs={3200}
      accentClass="border-clinical/40"
      renderScene={(active) => <DKAScene active={active} />}
    />
    </DiagramFigure>
  );

export default DKAAnimation;

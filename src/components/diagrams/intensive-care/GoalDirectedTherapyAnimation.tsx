import { AnimatedMechanism, AnimatedMechanismStep } from "@/components/diagrams/shared/AnimatedMechanism";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Postoperative goal-directed haemodynamic therapy — staged optimisation
 * loop synthesised from OPTIMISE 2014, INPRESS 2017 and the CPOC 2020
 * high-risk pathway. Each step reassesses the same four bedside targets
 * (MAP, SV, lactate, UO) and decides the next intervention.
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Baseline",
    detail: (
      <>
        Establish individualised targets at handover: <strong>MAP within 10–20 % of pre-op baseline</strong>{" "}
        (INPRESS), Hb &gt; 70 g/L (TRICC), lactate trend, urine output ≥ 0.5 mL/kg/h, ScvO₂ ≥ 70 %.
        Insert arterial line + cardiac-output monitor before fluids are given.
      </>
    ),
    callout: <>Document the MAP target on the bed-end chart so every nurse and doctor optimises to the same number.</>,
  },
  {
    label: "Fluid challenge",
    detail: (
      <>
        <strong>250 mL balanced crystalloid bolus over 5–10 min</strong>. A rise in stroke volume of ≥ 10 % defines a
        responder — repeat the challenge. Non-responders stop here: further fluid causes oedema, AKI and ileus
        (RELIEF 2018 warned against dogmatic restriction <em>and</em> over-filling).
      </>
    ),
    callout: <>Static measures (CVP, BP) are unreliable predictors — use SV/PPV/PVI from the cardiac-output monitor.</>,
  },
  {
    label: "Vasopressor",
    detail: (
      <>
        Start <strong>noradrenaline early</strong> rather than chasing fluid: low-dose 0.02–0.1 µg/kg/min restores
        venous return, perfusion pressure and SV without volume overload. Titrate to the individualised MAP target.
      </>
    ),
    callout: <>INPRESS 2017: individualised MAP reduced 7-day organ dysfunction (OR 0.73) vs blanket MAP ≥ 65.</>,
  },
  {
    label: "Inotrope / SV optimise",
    detail: (
      <>
        If SV remains low despite adequate preload + MAP, consider <strong>dobutamine or low-dose adrenaline</strong>{" "}
        — particularly with known LV dysfunction or persistent lactataemia. Echo at the bedside to exclude
        tamponade, RV failure, hypovolaemia.
      </>
    ),
    callout: <>OPTIMISE meta-analysis: SV-guided therapy ↓ complications RR 0.77; embedded in ERAS pathways.</>,
  },
  {
    label: "Reassess",
    detail: (
      <>
        Loop hourly: <strong>lactate clearance, UO, ScvO₂, capillary refill, mottling</strong>. If targets met for
        4 h consider weaning vasopressor; if not met escalate, repeat echo, search for occult bleeding,
        anastomotic leak or sepsis.
      </>
    ),
    callout: <>Persistent lactate &gt; 2 mmol/L at 6 h is an independent mortality signal — return-to-theatre threshold.</>,
  },
];

const Scene = ({ active }: { active: number }) => {
  // Bedside numbers evolve through the optimisation loop.
  const map  = active === 0 ? 58 : active === 1 ? 62 : active === 2 ? 78 : active === 3 ? 82 : 84;
  const sv   = active === 0 ? 42 : active === 1 ? 55 : active === 2 ? 60 : active === 3 ? 72 : 74;
  const lac  = active === 0 ? 4.2 : active === 1 ? 3.8 : active === 2 ? 3.0 : active === 3 ? 2.2 : 1.5;
  const uo   = active === 0 ? 0.2 : active === 1 ? 0.3 : active === 2 ? 0.5 : active === 3 ? 0.7 : 0.9;

  const onTarget = (label: string) => {
    if (label === "MAP")     return map  >= 75;
    if (label === "SV")      return sv   >= 65;
    if (label === "Lactate") return lac  <= 2.0;
    if (label === "UO")      return uo   >= 0.5;
    return false;
  };

  const rows = [
    { label: "Baseline assessment",       sub: "MAP target · SV · lactate · UO",        token: "muted-foreground" },
    { label: "250 mL fluid challenge",     sub: "responder = ΔSV ≥ 10 %",                token: "physiology" },
    { label: "Early noradrenaline",        sub: "MAP within 10 % of pre-op",              token: "clinical" },
    { label: "Inotrope / SV optimise",     sub: "if SV low despite MAP",                  token: "clinical" },
    { label: "Reassess loop (hourly)",     sub: "lactate clearance, UO, ScvO₂",           token: "physiology" },
  ];

  const vitals: Array<{ label: string; val: string; unit: string }> = [
    { label: "MAP",     val: map.toFixed(0),  unit: "mmHg"     },
    { label: "SV",      val: sv.toFixed(0),   unit: "mL"       },
    { label: "Lactate", val: lac.toFixed(1),  unit: "mmol/L"   },
    { label: "UO",      val: uo.toFixed(1),   unit: "mL/kg/h"  },
  ];

  return (
    <div className="w-full">
      <svg viewBox="0 0 380 290" className="w-full h-auto" role="img"
        aria-label="Goal-directed haemodynamic therapy optimisation loop">
        <defs>
          <linearGradient id="gdt-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.4)" />
          </linearGradient>
          <marker id="gdt-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--foreground))" />
          </marker>
        </defs>
        <rect width="380" height="290" fill="url(#gdt-bg)" rx="6" />

        {rows.map((r, i) => {
          const isActive = i === active;
          const isDone = i < active;
          const y = 12 + i * 50;
          return (
            <g key={r.label} transform={`translate(12, ${y})`}
               opacity={isActive || isDone ? 1 : 0.35}
               className="transition-opacity duration-500">
              <rect width="220" height="40" rx="6"
                fill={isActive ? `hsl(var(--${r.token}) / 0.18)` : "hsl(var(--card))"}
                stroke={isActive ? `hsl(var(--${r.token}))` : "hsl(var(--border))"}
                strokeWidth={isActive ? 2 : 1} />
              <circle cx="16" cy="20" r="10"
                fill={isActive || isDone ? `hsl(var(--${r.token}))` : "hsl(var(--muted))"} />
              <text x="16" y="24" textAnchor="middle" className="text-[10px] font-bold"
                fill={isActive || isDone ? "hsl(var(--background))" : "hsl(var(--muted-foreground))"}>{i + 1}</text>
              <text x="32" y="17" className="text-[11px] font-semibold" fill="hsl(var(--foreground))">{r.label}</text>
              <text x="32" y="30" className="text-[9px]" fill="hsl(var(--muted-foreground))">{r.sub}</text>
            </g>
          );
        })}

        {/* Loop arrow from last back to step 2 to suggest reassessment cycle */}
        {active === 4 && (
          <path d="M232 232 C 270 232, 270 70, 232 70"
            fill="none" stroke="hsl(var(--physiology))" strokeWidth="1.5" strokeDasharray="3 3"
            markerEnd="url(#gdt-arrow)" className="animate-fade-in" />
        )}

        {rows.slice(0, -1).map((_, i) => {
          const lit = active > i;
          const y = 52 + i * 50;
          return (
            <line key={i} x1="122" x2="122" y1={y} y2={y + 12}
              stroke={lit ? "hsl(var(--foreground))" : "hsl(var(--border))"}
              strokeWidth={lit ? 2 : 1}
              markerEnd="url(#gdt-arrow)" className="transition-colors duration-500" />
          );
        })}

        {/* Bedside vitals panel */}
        <g transform="translate(250, 12)">
          <text x="0" y="10" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">Example initial values</text>
          {vitals.map((v, i) => {
            const ok = onTarget(v.label);
            const token = ok ? "physiology" : "destructive";
            return (
                  <g key={v.label} transform={`translate(0, ${22 + i * 38})`}>
                <rect width="118" height="32" rx="3"
                  fill={`hsl(var(--${token}) / 0.12)`}
                  stroke={`hsl(var(--${token}))`} />
                <text x="6" y="11" className="text-[8px]" fill="hsl(var(--muted-foreground))">{v.label}</text>
                <text x="6" y="24" className="text-[12px] font-mono font-bold tabular-nums"
                  fill={`hsl(var(--${token}))`}>
                  {v.val}<tspan className="text-[8px] font-normal" dx="2">{v.unit}</tspan>
                </text>
                <text x="112" y="24" textAnchor="end" className="text-[9px] font-semibold"
                  fill={`hsl(var(--${token}))`}>{ok ? "✓" : "↻"}</text>
              </g>
  );
          })}
        </g>
      </svg>
    </div>
  );
};

const GoalDirectedTherapyAnimation = () => (
    <DiagramFigure
      id="goal-directed-therapy-animation"
      title="Goal directed therapy"
      description="Auto-generated wrapper for the Goal directed therapy animated physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <AnimatedMechanism
      title="Goal-directed haemodynamic therapy — postoperative optimisation loop"
      subtitle="SV-guided fluid → early noradrenaline → inotrope if needed → reassess (OPTIMISE 2014, INPRESS 2017)"
      steps={STEPS}
      stepMs={3600}
      accentClass="border-physiology/40"
      renderScene={(active) => <Scene active={active} />}
    />
    </DiagramFigure>
  );

export default GoalDirectedTherapyAnimation;

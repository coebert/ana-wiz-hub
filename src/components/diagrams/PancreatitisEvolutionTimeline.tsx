import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated timeline showing how the pancreas (and the peripancreatic spaces)
 * evolve over the 6-week course of severe acute pancreatitis — from early
 * interstitial oedema → necrosis → acute necrotic collection (ANC) →
 * walled-off necrosis (WON), with the Atlanta 2012 nomenclature applied at
 * each time-point.
 *
 * Same axial schematic as `SeverePancreatitisCTDiagram` but stripped to the
 * pancreatic bed so the morphological change between days is unambiguous.
 *
 * Five steps:
 *   1.  0–24 h     interstitial oedematous pancreatitis
 *   2.  48–72 h    parenchymal necrosis (CECT defines)
 *   3.  < 4 wk     acute peripancreatic fluid collection / acute necrotic collection
 *   4.  4 wk +     walled-off necrosis / pseudocyst (encapsulated)
 *   5.  Late       infected WON → step-up drainage
 */

interface SceneProps {
  active: number;
}

const PancreasScene = ({ active }: SceneProps) => {
  // Booleans for what to show at each time-point — keep declarative.
  const showOedema = active >= 0;
  const showNecrosisCore = active >= 1;
  const showCollection = active >= 2;
  const showWall = active >= 3;
  const showGas = active >= 4;

  // Highlight ring around the structure that "belongs" to the active step.
  const highlight = (step: number) =>
    active === step
      ? { stroke: "hsl(45 90% 65%)", strokeWidth: 0.9, filter: "url(#pet-glow)" }
      : { stroke: "hsl(220 8% 18%)", strokeWidth: 0.4, filter: undefined };

  return (
    <DiagramFigure
      id="pancreatitis-evolution-timeline"
      title="Pancreatitis evolution timeline"
      description="Auto-generated wrapper for the Pancreatitis evolution timeline anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="space-y-3">
        <svg
          viewBox="0 0 100 60"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`Schematic axial section through the pancreatic bed at time-point ${active + 1} of 5.`}
          className="w-full h-auto block rounded-lg border border-border bg-[hsl(220_18%_8%)]"
        >
          <defs>
            <radialGradient id="pet-bg" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="hsl(220 14% 14%)" />
              <stop offset="100%" stopColor="hsl(220 18% 6%)" />
            </radialGradient>
            <pattern id="pet-stranding" width="3" height="3" patternUnits="userSpaceOnUse">
              <rect width="3" height="3" fill="hsl(220 14% 26%)" />
              <path d="M0 0 L3 3 M0 3 L3 0" stroke="hsl(220 8% 14%)" strokeWidth="0.5" />
            </pattern>
            <filter id="pet-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Pulse for active oedema */}
            <style>{`
              @keyframes petPulse { 0%,100% { opacity: 0.55 } 50% { opacity: 0.85 } }
              @keyframes petBubble { 0%,100% { opacity: 0.7 } 50% { opacity: 1 } }
              .pet-pulse { animation: petPulse 2.4s ease-in-out infinite; }
              .pet-bubble { animation: petBubble 1.6s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) {
                .pet-pulse, .pet-bubble { animation: none; }
              }
            `}</style>
          </defs>
  
          <rect x="0" y="0" width="100" height="60" fill="url(#pet-bg)" />
  
          {/* Vertebra (orientation marker) */}
          <ellipse cx="50" cy="48" rx="6" ry="4" fill="hsl(40 18% 78%)" stroke="hsl(220 8% 14%)" strokeWidth="0.5" />
          <ellipse cx="50" cy="49" rx="2" ry="1.5" fill="hsl(220 14% 22%)" />
  
          {/* Aorta + IVC */}
          <circle cx="55" cy="42" r="2.4" fill="hsl(0 70% 48%)" stroke="hsl(0 60% 25%)" strokeWidth="0.5" />
          <ellipse cx="46" cy="42" rx="2.6" ry="2" fill="hsl(220 70% 45%)" stroke="hsl(220 60% 22%)" strokeWidth="0.5" />
  
          {/* Stomach (anterior) */}
          <ellipse cx="42" cy="14" rx="14" ry="4" fill="hsl(220 18% 22%)" stroke="hsl(220 12% 10%)" strokeWidth="0.5" />
  
          {/* Peripancreatic fat stranding — fades in from step 1 onwards, brightest at step 1 */}
          {showOedema && (
            <path
              d="M22 28 Q40 18 56 22 Q74 24 82 18 Q86 32 76 38 Q56 42 36 40 Q24 38 22 32 Z"
              fill="url(#pet-stranding)"
              opacity={active === 0 ? 0.7 : 0.45}
              className={active === 0 ? "pet-pulse" : undefined}
            />
          )}
  
          {/* Acute peripancreatic / necrotic collection — appears step 2+, encapsulates step 3+ */}
          {showCollection && (
            <g>
              <path
                d="M14 30 Q24 24 34 30 Q42 36 38 44 Q26 48 16 44 Q10 38 14 30 Z"
                fill="hsl(210 55% 38%)"
                stroke={showWall ? "hsl(45 80% 60%)" : "hsl(210 50% 22%)"}
                strokeWidth={showWall ? 1.2 : 0.4}
                strokeDasharray={showWall ? undefined : "0.8 0.8"}
              />
              {showWall && (
                <text
                  x="24"
                  y="36"
                  fontSize="2.6"
                  textAnchor="middle"
                  fill="hsl(45 90% 75%)"
                  stroke="hsl(220 18% 8%)"
                  strokeWidth="0.75"
                  paintOrder="stroke"
                  fontWeight="600"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {active >= 4 ? "Infected WON" : "WON"}
                </text>
              )}
            </g>
          )}
  
          {/* Pancreas — body + tail */}
          <g {...highlight(0)}>
            <path
              d="M28 30 Q40 22 54 26 Q66 30 74 26 Q72 36 56 34 Q40 36 28 34 Z"
              fill="hsl(20 30% 38%)"
            />
          </g>
  
          {/* Necrotic non-enhancing core — appears step 1+ */}
          {showNecrosisCore && (
            <g {...highlight(1)}>
              <path
                d="M40 28 Q52 25 62 28 Q60 33 50 33 Q42 33 40 30 Z"
                fill="hsl(220 18% 18%)"
              />
              {/* Liquefying centre — softens from step 2 */}
              {active >= 2 && (
                <path
                  d="M44 29 Q52 27 60 29 Q58 32 50 32 Q44 32 44 29 Z"
                  fill="hsl(210 50% 32%)"
                  opacity="0.85"
                />
              )}
            </g>
          )}
  
          {/* Gas bubbles (infected necrosis) — final step only */}
          {showGas && (
            <g {...highlight(4)} className="pet-bubble">
              <circle cx="50" cy="30" r="1.1" fill="hsl(220 10% 4%)" stroke="hsl(45 90% 65%)" strokeWidth="0.5" />
              <circle cx="53" cy="31" r="0.8" fill="hsl(220 10% 4%)" stroke="hsl(45 90% 65%)" strokeWidth="0.5" />
              <circle cx="47" cy="31.5" r="0.6" fill="hsl(220 10% 4%)" stroke="hsl(45 90% 65%)" strokeWidth="0.5" />
              <circle cx="22" cy="36" r="0.9" fill="hsl(220 10% 4%)" stroke="hsl(45 90% 65%)" strokeWidth="0.5" />
              <circle cx="26" cy="40" r="0.7" fill="hsl(220 10% 4%)" stroke="hsl(45 90% 65%)" strokeWidth="0.5" />
            </g>
          )}
  
          {/* Step 4 — percutaneous drain (step-up) */}
          {active >= 4 && (
            <g>
              <line
                x1="2"
                y1="50"
                x2="20"
                y2="40"
                stroke="hsl(45 90% 70%)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle cx="20" cy="40" r="0.9" fill="hsl(45 90% 70%)" />
              <text
                x="3"
                y="56"
                fontSize="2.2"
                fill="hsl(45 90% 70%)"
                fontWeight="600"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Percutaneous drain
              </text>
            </g>
          )}
  
          {/* Compass + time stamp */}
          <text x="50" y="3" fontSize="2" textAnchor="middle" fill="hsl(var(--muted-foreground))" style={{ fontFamily: "JetBrains Mono, monospace" }}>A</text>
          <text x="50" y="59" fontSize="2" textAnchor="middle" fill="hsl(var(--muted-foreground))" style={{ fontFamily: "JetBrains Mono, monospace" }}>P</text>
  
          {/* Time-point banner */}
          <rect x="68" y="2" width="30" height="6" rx="1" fill="hsl(220 18% 12%)" stroke="hsl(220 8% 22%)" strokeWidth="0.5" />
          <text
            x="83"
            y="6.4"
            fontSize="3"
            textAnchor="middle"
            fill="hsl(45 90% 70%)"
            fontWeight="700"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {["0–24 h", "48–72 h", "Day 4–14", "≥ 4 weeks", "Late / infected"][active]}
          </text>
        </svg>
  
        {/* Sub-legend — current Atlanta term */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          {[
            { i: 0, term: "Interstitial oedematous pancreatitis", color: "hsl(var(--clinical))" },
            { i: 1, term: "Necrotising pancreatitis", color: "hsl(var(--icu))" },
            { i: 2, term: "Acute necrotic collection (ANC)", color: "hsl(var(--icu))" },
            { i: 3, term: "Walled-off necrosis (WON)", color: "hsl(var(--icu))" },
            { i: 4, term: "Infected WON", color: "hsl(var(--destructive))" },
          ].map((t) => (
            <span
              key={t.i}
              className={`px-2 py-0.5 rounded-full border ${
                active === t.i
                  ? "border-foreground/40 bg-foreground/10 text-foreground font-semibold"
                  : "border-border bg-background text-muted-foreground"
              }`}
              style={active === t.i ? { borderLeft: `3px solid ${t.color}` } : undefined}
            >
              {t.term}
            </span>
          ))}
        </div>
      </div>
    </DiagramFigure>
  );
};

const steps: AnimatedMechanismStep[] = [
  {
    label: "0–24 h · Oedema",
    durationMs: 3200,
    detail: (
      <>
        <strong>Interstitial oedematous pancreatitis</strong> — the gland is diffusely enlarged with hazy
        peripancreatic fat stranding from inflammatory oedema. Parenchyma still enhances homogeneously on CECT;
        no necrosis is yet visible. Accounts for <strong>~80% of all cases</strong>; mortality &lt; 1%. CT in the
        first 72 h systematically <em>under-calls</em> necrosis — clinical severity (Glasgow, CRP at 48 h) drives
        management at this stage.
      </>
    ),
    callout: (
      <>
        <strong>Atlanta 2012:</strong> diagnosis = 2 of 3 — typical pain · lipase &gt; 3× ULN · imaging consistent
        with AP. Imaging is not required to make the diagnosis.
      </>
    ),
  },
  {
    label: "48–72 h · Necrosis",
    durationMs: 3200,
    detail: (
      <>
        <strong>Parenchymal necrosis</strong> declares itself as a non-enhancing area within the pancreas on CECT
        (best seen at <strong>72–96 h</strong>). Microcirculatory failure, capillary thrombosis and direct enzymatic
        injury are responsible. Quantified for the CT Severity Index as &lt; 30%, 30–50% or &gt; 50% of the gland.
        20–30% of patients with severe AP develop necrosis.
      </>
    ),
    callout: (
      <>
        <strong>Avoid contrast</strong> if AKI / unstable haemodynamics — non-contrast CT or MRI/MRCP are
        alternatives. Do not delay resuscitation to chase imaging.
      </>
    ),
  },
  {
    label: "Day 4–14 · ANC / APFC",
    durationMs: 3600,
    detail: (
      <>
        Liquefying necrotic tissue and inflammatory exudate accumulate in the peripancreatic spaces — the lesser
        sac, anterior pararenal space and paracolic gutters. With necrosis present this is an{" "}
        <strong>acute necrotic collection (ANC)</strong>; without parenchymal necrosis it is an{" "}
        <strong>acute peripancreatic fluid collection (APFC)</strong>. Both are <em>unencapsulated</em> at this
        stage and must not be drained electively (high failure / fistula rate).
      </>
    ),
    callout: (
      <>
        <strong>Hands-off</strong> in the first 4 weeks unless: infected (gas / positive culture / sepsis), or
        gastric outlet / biliary obstruction. Even infected collections are best stabilised with antibiotics until
        a wall forms — every week of delay improves drainage success.
      </>
    ),
  },
  {
    label: "≥ 4 wk · WON / Pseudocyst",
    durationMs: 3800,
    detail: (
      <>
        After ~4 weeks the collection develops a thick, vascularised, fibrous{" "}
        <strong>pseudocapsule</strong>. With necrotic debris inside it is now <strong>walled-off necrosis (WON)</strong>;
        if homogeneous fluid only, a <strong>pseudocyst</strong>. Encapsulation makes percutaneous, endoscopic
        transgastric or surgical drainage feasible and safe.
      </>
    ),
    callout: (
      <>
        <strong>Atlanta nomenclature:</strong> APFC → pseudocyst (no necrosis). ANC → WON (with necrosis). The
        4-week wall is the inflection point.
      </>
    ),
  },
  {
    label: "Late · Infected WON",
    durationMs: 4200,
    detail: (
      <>
        Suspect infection if persistent SIRS, deteriorating organ function, or new gas bubbles within the
        collection on CT. Confirmed by image-guided FNA only if uncertain — empirical step-up management is now
        first-line. The <strong>PANTER trial</strong> (van Santvoort, NEJM 2010) established the{" "}
        <strong>step-up approach</strong>: percutaneous (or endoscopic transgastric) drainage first, escalating to
        minimally invasive necrosectomy only if the patient does not improve — halving the rate of major
        complications versus open necrosectomy.
      </>
    ),
    callout: (
      <>
        <strong>Step-up:</strong> antibiotics → image-guided drain → minimally invasive necrosectomy → open
        surgery (last resort). Transfer early to an HPB centre with interventional radiology + advanced endoscopy.
      </>
    ),
  },
];

export const PancreatitisEvolutionTimeline = () => (
  <AnimatedMechanism
    title="Evolution of Pancreatic Necrosis & Fluid Collections"
    subtitle="Atlanta 2012 morphological timeline — interstitial oedema → necrosis → acute necrotic collection → walled-off necrosis."
    steps={steps}
    renderScene={(active) => <PancreasScene active={active} />}
    accentClass="border-icu/40"
  />
);

export default PancreatitisEvolutionTimeline;

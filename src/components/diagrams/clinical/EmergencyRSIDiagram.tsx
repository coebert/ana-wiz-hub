import { AnimatedMechanism, AnimatedMechanismStep } from "@/components/diagrams/shared/AnimatedMechanism";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Rapid Sequence Induction in the haemodynamically unstable, full-stomach
 * emergency patient. Walks through DAS-aligned conduct with ketamine + roc
 * dosing and physiological annotations.
 *
 * Scene = stylised supine patient with airway, monitor (HR/SpO2/MAP) that
 * mutates per step, and a vertical drug column.
 */

const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Resuscitate first",
    detail: (
      <>
        Restore preload BEFORE induction — sympathetic tone is the only thing keeping the BP up. Aim
        MAP ≥65 mmHg, HR &lt; SBP (shock index &lt; 1), lactate trending down. Two large-bore IVCs
        (14–16G) or IO; activate major haemorrhage protocol if catastrophic bleeding.
      </>
    ),
    callout: <><strong>Trap:</strong> A "stable" pre-induction BP can collapse the moment sympathetic drive is removed.</>,
    sources: [{ label: "BJA Educ 2017 EmLap" }, { label: "NELA Year 9 Report" }],
  },
  {
    label: "Pre-O₂ + ramp",
    detail: (
      <>
        3 minutes tidal-volume 100% O₂ via well-sealed mask (or 8 vital-capacity breaths if uncooperative).
        Ramped (HELP) position if obese or full-term parturient. Apnoeic oxygenation: nasal cannula at
        15 L/min HFNO or THRIVE 30–70 L/min — extends safe apnoea time by 60–90 s.
      </>
    ),
    callout: <><strong>Goal EtO₂ &gt; 0.85</strong> on the capnograph trace before induction.</>,
    sources: [{ label: "DAS 2015 RSI" }],
  },
  {
    label: "Cricoid + induction",
    detail: (
      <>
        Cricoid force <strong>10 N awake → 30 N asleep</strong> applied as the patient loses
        consciousness. Ketamine <strong>1–2 mg/kg IV</strong> (preserves sympathetic drive) — drop to
        0.5–1 mg/kg in profound shock. Avoid propofol/thiopental in haemodynamic collapse.
      </>
    ),
    callout: <><strong>Alternatives:</strong> etomidate 0.3 mg/kg (cardiostable but adrenal suppression in sepsis).</>,
    sources: [{ label: "DAS 2015 RSI" }, { label: "BJA Educ 2017 EmLap" }],
  },
  {
    label: "Paralyse",
    detail: (
      <>
        <strong>Rocuronium 1.2 mg/kg</strong> (3× ED95) — onset 45–60 s, comparable to suxamethonium.
        Reversible with sugammadex 16 mg/kg if can't intubate / can't oxygenate. Suxamethonium
        1.5 mg/kg remains an option if normokalaemic and no contraindications (burns &gt;24 h, denervation,
        crush, MH).
      </>
    ),
    callout: <><strong>Have sugammadex 16 mg/kg drawn up</strong> for any rocuronium RSI.</>,
    sources: [{ label: "DAS 2015 RSI" }],
  },
  {
    label: "Intubate + confirm",
    detail: (
      <>
        Direct or video laryngoscopy (VL preferred per DAS 2015). Confirm tube position by{" "}
        <strong>sustained EtCO₂ &gt; 6 capnograph trace</strong>, bilateral chest rise, equal air entry.
        Release cricoid only after cuff inflation and confirmed placement.
      </>
    ),
    callout: <><strong>No trace = wrong place.</strong> Bilateral breath sounds alone are insufficient.</>,
    sources: [{ label: "DAS 2015 RSI" }],
  },
  {
    label: "Post-intubation",
    detail: (
      <>
        Anticipate hypotension — vasopressor of choice (metaraminol 0.5–1 mg boluses, phenylephrine
        50–100 μg, or noradrenaline infusion ready). NG tube to decompress stomach. Lung-protective
        ventilation (Vt 6–8 mL/kg IBW, PEEP 5, plateau &lt; 30 cmH₂O). Arterial line ASAP if not
        already sited.
      </>
    ),
    callout: <><strong>NELA standard:</strong> arterial line and (if high-risk) cardiac output monitor before knife-to-skin.</>,
    sources: [{ label: "NELA Year 9 Report" }, { label: "BJA Educ 2017 EmLap" }],
  },
];

interface VitalsBlock {
  hr: number;
  sbp: number;
  spo2: number;
  etco2: number | null;
}

const VITALS: VitalsBlock[] = [
  { hr: 128, sbp: 84, spo2: 92, etco2: null },
  { hr: 122, sbp: 92, spo2: 99, etco2: null },
  { hr: 118, sbp: 88, spo2: 99, etco2: null },
  { hr: 110, sbp: 96, spo2: 99, etco2: null },
  { hr: 104, sbp: 102, spo2: 99, etco2: 5.1 },
  { hr: 96, sbp: 88, spo2: 99, etco2: 4.6 },
];

export const EmergencyRSIDiagram = () => {
  return (
    <DiagramFigure id="emergency-rsi" title="Emergency rapid sequence induction: ketamine and rocuronium sequence" description="Step-by-step DAS-aligned rapid sequence induction in the haemodynamically unstable, full-stomach emergency patient.">
    <AnimatedMechanism
      title="Emergency RSI — full stomach, shocked patient"
      subtitle="DAS-aligned conduct with ketamine + rocuronium. Watch the vitals shift as sympathetic drive is removed."
      steps={STEPS}
      accentClass="border-destructive/40"
      stepMs={2800}
      renderScene={(active) => {
        const v = VITALS[active];
        const hasTube = active >= 4;
        const hasCricoid = active >= 2 && active <= 4;
        return (
          <svg
            viewBox="0 0 480 280"
            role="img"
            aria-label="Emergency RSI scene with patient, monitor and drug timeline"
            className="w-full"
          >
            <defs>
              <radialGradient id="ersi-bg" cx="40%" cy="40%" r="80%">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.45" />
                <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ersi-bed" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--card))" />
                <stop offset="100%" stopColor="hsl(var(--muted))" />
              </linearGradient>
            </defs>
            <rect width="480" height="280" fill="url(#ersi-bg)" />

            {/* Bed */}
            <rect x="40" y="170" width="280" height="36" rx="6" fill="url(#ersi-bed)" stroke="hsl(var(--border))" />

            {/* Patient (supine, ramped) */}
            <g>
              {/* Body */}
              <ellipse cx="180" cy="160" rx="110" ry="18" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
              {/* Head */}
              <circle cx="80" cy="150" r="22" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
              {/* Tilted neck for ramped position */}
              <line x1="80" y1="172" x2="100" y2="160" stroke="hsl(var(--border))" strokeWidth={2} />
            </g>

            {/* Mask / Tube */}
            {!hasTube && (
              <g>
                <ellipse cx="62" cy="148" rx="14" ry="10" fill="hsl(var(--accent))" fillOpacity={0.6} stroke="hsl(var(--accent))" />
                <line x1="48" y1="148" x2="20" y2="140" stroke="hsl(var(--accent))" strokeWidth={2} strokeLinecap="round" />
                <text x="22" y="132" fontSize="9" fill="hsl(var(--muted-foreground))">100% O₂</text>
              </g>
            )}
            {hasTube && (
              <g>
                <line x1="58" y1="148" x2="14" y2="120" stroke="hsl(var(--clinical))" strokeWidth={3} strokeLinecap="round" />
                <circle cx="58" cy="148" r="4" fill="hsl(var(--clinical))" />
                <text x="14" y="112" fontSize="9" fill="hsl(var(--clinical))" fontWeight={600}>ETT • EtCO₂ ✓</text>
              </g>
            )}

            {/* Cricoid pressure indicator */}
            {hasCricoid && (
              <g>
                <circle cx="100" cy="148" r="8" fill="none" stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="3 2">
                  <animate attributeName="r" values="6;10;6" dur="1.4s" repeatCount="indefinite" />
                </circle>
                <text x="106" y="138" fontSize="8.5" fill="hsl(var(--destructive))" fontWeight={600}>Cricoid 30 N</text>
              </g>
            )}

            {/* Monitor */}
            <g>
              <rect x="340" y="40" width="125" height="120" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth={1.5} />
              <text x="350" y="58" fontSize="9" fill="hsl(var(--muted-foreground))">MONITOR</text>
              <line x1="345" y1="62" x2="460" y2="62" stroke="hsl(var(--border))" />

              <text x="350" y="80" fontSize="10" fill="hsl(var(--muted-foreground))">HR</text>
              <text x="455" y="80" fontSize="14" fontWeight={700} textAnchor="end" fill="hsl(var(--destructive))">{v.hr}</text>

              <text x="350" y="100" fontSize="10" fill="hsl(var(--muted-foreground))">SBP</text>
              <text x="455" y="100" fontSize="14" fontWeight={700} textAnchor="end" fill="hsl(var(--clinical))">{v.sbp}</text>

              <text x="350" y="120" fontSize="10" fill="hsl(var(--muted-foreground))">SpO₂</text>
              <text x="455" y="120" fontSize="14" fontWeight={700} textAnchor="end" fill={v.spo2 >= 95 ? "hsl(var(--icu))" : "hsl(var(--destructive))"}>{v.spo2}%</text>

              <text x="350" y="140" fontSize="10" fill="hsl(var(--muted-foreground))">EtCO₂</text>
              <text x="455" y="140" fontSize="14" fontWeight={700} textAnchor="end" fill="hsl(var(--accent))">
                {v.etco2 !== null ? `${v.etco2.toFixed(1)} kPa` : "—"}
              </text>
            </g>

            {/* Drug column */}
            <g transform="translate(40, 220)">
              {[
                { label: "Ketamine 1–2 mg/kg", on: active >= 2 },
                { label: "Rocuronium 1.2 mg/kg", on: active >= 3 },
                { label: "Sugammadex 16 mg/kg ready", on: active >= 3 },
                { label: "Vasopressor drawn", on: active >= 5 },
              ].map((d, i) => (
                <g key={d.label} transform={`translate(${i * 105}, 0)`}>
                  <rect
                    width={100}
                    height={28}
                    rx={4}
                    fill={d.on ? "hsl(var(--clinical))" : "hsl(var(--muted))"}
                    fillOpacity={d.on ? 0.9 : 0.5}
                    stroke="hsl(var(--border))"
                    style={{ transition: "fill-opacity 400ms ease, fill 400ms ease" }}
                  />
                  <text
                    x={50}
                    y={17}
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight={d.on ? 700 : 500}
                    fill={d.on ? "hsl(var(--background))" : "hsl(var(--muted-foreground))"}
                  >
                    {d.label}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        );
      }}
    />
    </DiagramFigure>
  );
};

export default EmergencyRSIDiagram;

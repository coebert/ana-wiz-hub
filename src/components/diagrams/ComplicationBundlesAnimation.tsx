import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";

/**
 * Postoperative complication-prevention bundles. Cycles through the four
 * outcome-defining bundles applied from day 1 of critical care: AKI (KDIGO),
 * Delirium (ABCDEF), VTE prophylaxis, and Infection / Sepsis source-control
 * + stewardship. Each step lights up the relevant organ and lists the
 * bundle elements + supporting evidence.
 */
type BundleKey = "AKI" | "Delirium" | "VTE" | "Infection";

interface Bundle {
  key: BundleKey;
  label: string;
  token: string; // semantic colour token
  elements: string[];
  evidence: string;
}

const BUNDLES: Bundle[] = [
  {
    key: "AKI",
    label: "AKI — KDIGO bundle",
    token: "clinical",
    elements: [
      "Avoid nephrotoxins (NSAIDs, aminoglycosides, contrast)",
      "Optimise volume + MAP to baseline (INPRESS)",
      "4-hourly creatinine + UO; treat hyperkalaemia",
      "Discontinue ACEi/ARB peri-op until stable",
    ],
    evidence: "PrevAKI 2017 — bundle ↓ moderate-severe AKI 71 → 55 %",
  },
  {
    key: "Delirium",
    label: "Delirium — ABCDEF bundle",
    token: "physiology",
    elements: [
      "A — Assess pain (CPOT/NRS); B — Both SAT + SBT daily",
      "C — Choice: light sedation, propofol/dex over benzodiazepines",
      "D — Delirium screen 12-hourly (CAM-ICU)",
      "E — Early mobility; F — Family engagement, sleep, glasses, hearing aids",
    ],
    evidence: "ICU Liberation collaborative 2019 — ↓ delirium, ventilator days, mortality",
  },
  {
    key: "VTE",
    label: "VTE — mechanical + chemical",
    token: "icu",
    elements: [
      "Risk-assess on admission and daily (Caprini / Padua)",
      "Intermittent pneumatic compression from theatre return",
      "LMWH from 6 h post-op unless bleeding / neuraxial-line risk",
      "Restart promptly after epidural removal per AAGBI 2013",
    ],
    evidence: "NICE NG89 — IPC + LMWH ↓ symptomatic DVT/PE ~50 %",
  },
  {
    key: "Infection",
    label: "Infection / Sepsis — source + stewardship",
    token: "destructive",
    elements: [
      "Sepsis-6 within 1 h of recognition (Surviving Sepsis 2021)",
      "Source-control review at 24 h — CT + return to theatre for collection / leak",
      "Daily line review; remove catheters/CVCs ASAP (CDC bundle)",
      "Antimicrobial stewardship — de-escalate by 48–72 h on cultures",
    ],
    evidence: "Surviving Sepsis 2021; CDC CLABSI bundle ↓ rates ~40 %",
  },
];

const STEPS: AnimatedMechanismStep[] = BUNDLES.map((b) => ({
  label: b.key,
  detail: (
    <>
      <p className="font-semibold text-foreground mb-1">{b.label}</p>
      <ul className="list-disc list-inside space-y-0.5">
        {b.elements.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </>
  ),
  callout: <>{b.evidence}</>,
}));

/* Body / organ silhouette overlay — lights up the organ relevant to the active bundle. */
const Scene = ({ active }: { active: number }) => {
  const bundle = BUNDLES[active];

  // organ regions (cx, cy, r/w/h) on the simple body silhouette
  const lit = (key: BundleKey) => bundle.key === key;

  return (
    <div className="w-full">
      <svg viewBox="0 0 380 290" className="w-full h-auto" role="img"
        aria-label="Postoperative complication prevention bundles — AKI, delirium, VTE, infection">
        <defs>
          <radialGradient id="cb-bg" cx="50%" cy="40%" r="70%">
            <stop offset="0%"   stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.45)" />
          </radialGradient>
          <linearGradient id="cb-body" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--muted) / 0.6)" />
          </linearGradient>
        </defs>
        <rect width="380" height="290" fill="url(#cb-bg)" rx="6" />

        {/* Body silhouette (head + torso + legs) */}
        <g transform="translate(150, 18)">
          {/* Head */}
          <ellipse cx="40" cy="22" rx="18" ry="20"
            fill={lit("Delirium") ? "hsl(var(--physiology) / 0.35)" : "url(#cb-body)"}
            stroke={lit("Delirium") ? "hsl(var(--physiology))" : "hsl(var(--border))"}
            strokeWidth={lit("Delirium") ? 2 : 1}
            className="transition-all duration-500" />
          {lit("Delirium") && (
            <circle cx="40" cy="22" r="22" fill="none" stroke="hsl(var(--physiology))"
              strokeWidth="1" opacity="0.6">
              <animate attributeName="r" values="20;26;20" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Torso */}
          <path d="M 14 44 Q 40 38 66 44 L 66 130 Q 40 138 14 130 Z"
            fill="url(#cb-body)" stroke="hsl(var(--border))" />

          {/* Lungs / chest area — infection focus */}
          <ellipse cx="40" cy="80" rx="24" ry="18"
            fill={lit("Infection") ? "hsl(var(--destructive) / 0.30)" : "transparent"}
            stroke={lit("Infection") ? "hsl(var(--destructive))" : "transparent"}
            strokeWidth={lit("Infection") ? 1.5 : 0}
            className="transition-all duration-500" />
          {lit("Infection") && (
            <g>
              {[0, 0.6, 1.2].map((d, i) => (
                <circle key={i} cx="40" cy="80" r="5" fill="hsl(var(--destructive))" opacity="0.8">
                  <animate attributeName="r" values="3;14;3" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          )}

          {/* Kidneys (two) — AKI focus */}
          <ellipse cx="24" cy="112" rx="6" ry="9"
            fill={lit("AKI") ? "hsl(var(--clinical) / 0.45)" : "hsl(var(--muted-foreground) / 0.25)"}
            stroke={lit("AKI") ? "hsl(var(--clinical))" : "hsl(var(--border))"}
            strokeWidth={lit("AKI") ? 1.5 : 0.8}
            className="transition-all duration-500" />
          <ellipse cx="56" cy="112" rx="6" ry="9"
            fill={lit("AKI") ? "hsl(var(--clinical) / 0.45)" : "hsl(var(--muted-foreground) / 0.25)"}
            stroke={lit("AKI") ? "hsl(var(--clinical))" : "hsl(var(--border))"}
            strokeWidth={lit("AKI") ? 1.5 : 0.8}
            className="transition-all duration-500" />
          {lit("AKI") && (
            <g>
              {[24, 56].map((cx) => (
                <circle key={cx} cx={cx} cy={112} r="11" fill="none"
                  stroke="hsl(var(--clinical))" strokeWidth="1" opacity="0.6">
                  <animate attributeName="r" values="9;15;9" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          )}

          {/* Legs — VTE focus */}
          <path d="M 22 138 L 24 220 L 32 220 L 38 138 Z"
            fill={lit("VTE") ? "hsl(var(--icu) / 0.35)" : "url(#cb-body)"}
            stroke={lit("VTE") ? "hsl(var(--icu))" : "hsl(var(--border))"}
            strokeWidth={lit("VTE") ? 1.5 : 1}
            className="transition-all duration-500" />
          <path d="M 42 138 L 48 220 L 56 220 L 58 138 Z"
            fill={lit("VTE") ? "hsl(var(--icu) / 0.35)" : "url(#cb-body)"}
            stroke={lit("VTE") ? "hsl(var(--icu))" : "hsl(var(--border))"}
            strokeWidth={lit("VTE") ? 1.5 : 1}
            className="transition-all duration-500" />
          {lit("VTE") && (
            <g>
              {/* Pulsing 'clot risk' markers travelling up the calf */}
              {[0, 0.8].map((d, i) => (
                <circle key={i} cx="28" cy="200" r="2.5" fill="hsl(var(--icu))">
                  <animate attributeName="cy" values="210;150;210" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                </circle>
              ))}
              {[0.4, 1.2].map((d, i) => (
                <circle key={i} cx="50" cy="200" r="2.5" fill="hsl(var(--icu))">
                  <animate attributeName="cy" values="210;150;210" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          )}
        </g>

        {/* Side legend / bundle pills */}
        <g transform="translate(12, 18)">
          <text x="0" y="10" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">
            Day-1 prevention bundles
          </text>
          {BUNDLES.map((b, i) => {
            const isActive = i === active;
            return (
                  <g key={b.key} transform={`translate(0, ${22 + i * 44})`}
                 opacity={isActive ? 1 : 0.5}
                 className="transition-opacity duration-500">
                <rect width="124" height="38" rx="6"
                  fill={isActive ? `hsl(var(--${b.token}) / 0.18)` : "hsl(var(--card))"}
                  stroke={isActive ? `hsl(var(--${b.token}))` : "hsl(var(--border))"}
                  strokeWidth={isActive ? 2 : 1} />
                <circle cx="14" cy="19" r="6" fill={`hsl(var(--${b.token}))`} />
                <text x="26" y="16" className="text-[10px] font-semibold" fill="hsl(var(--foreground))">{b.key}</text>
                <text x="26" y="29" className="text-[8px]" fill="hsl(var(--muted-foreground))">
                  {b.key === "AKI" && "KDIGO bundle"}
                  {b.key === "Delirium" && "ABCDEF bundle"}
                  {b.key === "VTE" && "IPC + LMWH"}
                  {b.key === "Infection" && "Sepsis-6 + stewardship"}
                </text>
              </g>
  );
          })}
        </g>

        {/* Right caption — current bundle organ name */}
        <g transform="translate(252, 220)">
          <rect width="118" height="56" rx="6"
            fill={`hsl(var(--${bundle.token}) / 0.12)`}
            stroke={`hsl(var(--${bundle.token}))`} />
          <text x="8" y="14" className="text-[8px] uppercase tracking-wider" fill="hsl(var(--muted-foreground))">
            Active bundle
          </text>
          <text x="8" y="30" className="text-[12px] font-bold" fill={`hsl(var(--${bundle.token}))`}>
            {bundle.key}
          </text>
          <text x="8" y="46" className="text-[8px]" fill="hsl(var(--muted-foreground))">
            Apply on ICU day 1
          </text>
        </g>
      </svg>
    </div>
  );
};

const ComplicationBundlesAnimation = () => (
      <AnimatedMechanism
    title="Complication-prevention bundles — AKI · Delirium · VTE · Infection"
    subtitle="Apply all four from day 1 of postoperative critical care — KDIGO, ABCDEF, NICE NG89, Surviving Sepsis"
    steps={STEPS}
    stepMs={4200}
    accentClass="border-clinical/40"
    renderScene={(active) => <Scene active={active} />}
  />
  );

export default ComplicationBundlesAnimation;

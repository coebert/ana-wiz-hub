import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Orthotopic Liver Transplant — three-phase haemodynamic & metabolic timeline.
 * Click a phase to see the dominant physiological challenge and management.
 */

type PhaseKey = "dissection" | "anhepatic" | "reperfusion";

interface Phase {
  key: PhaseKey;
  title: string;
  duration: string;
  color: string;
  challenges: string[];
  management: string[];
  trap: string;
}

const phases: Phase[] = [
  {
    key: "dissection",
    title: "Phase 1 — Dissection (Pre-anhepatic)",
    duration: "≈ 1–3 h",
    color: "hsl(var(--clinical))",
    challenges: [
      "Adhesions and portal hypertension → significant blood loss",
      "Massive ascites drainage → sudden ↓ preload",
      "Coagulopathy from synthetic failure (low factors, low platelets, hyperfibrinolysis)",
      "Citrate toxicity from rapid transfusion → ionised hypocalcaemia",
    ],
    management: [
      "Large-bore IV access + rapid infuser; arterial line + CVC ± PAC/TOE",
      "TEG/ROTEM-guided product transfusion; calcium for every 4 units RBC",
      "Vasopressors (noradrenaline) for low SVR of cirrhosis",
      "Maintain euvolaemia — avoid splanchnic congestion",
    ],
    trap: "Over-transfusion in this phase worsens venous bleeding when the IVC is later clamped.",
  },
  {
    key: "anhepatic",
    title: "Phase 2 — Anhepatic",
    duration: "≈ 45–90 min",
    color: "hsl(var(--accent))",
    challenges: [
      "IVC + portal vein cross-clamp → ↓↓ preload, CO can fall 50%",
      "No hepatic metabolism: lactate, citrate, drugs accumulate",
      "Progressive metabolic acidosis and hypocalcaemia",
      "Hypothermia from cold graft + open abdomen",
    ],
    management: [
      "Decision: full cross-clamp vs piggy-back vs venovenous bypass",
      "Vasopressor + judicious volume; avoid fluid overload before reperfusion",
      "Active warming (forced air + fluid warmer) — target ≥ 36 °C",
      "Bicarbonate + calcium chloride boluses; insulin if hyperglycaemia",
    ],
    trap: "Loading volume to 'fix' hypotension here is dangerous — you will cause RV overload at unclamping.",
  },
  {
    key: "reperfusion",
    title: "Phase 3 — Reperfusion (Neo-hepatic)",
    duration: "First 5 min critical",
    color: "hsl(var(--destructive))",
    challenges: [
      "Post-reperfusion syndrome: ↓ MAP > 30% lasting > 1 min within 5 min of unclamping",
      "Hyperkalaemia + acidosis + hypothermia bolus from preservation fluid",
      "Hyperfibrinolysis from graft tPA release — diffuse oozing",
      "Air or thrombus emboli; right heart strain",
    ],
    management: [
      "Pre-treat: calcium 1 g IV, sodium bicarbonate 50 mmol, vasopressor bolus ready",
      "Insulin 10 U + 50 mL 50% dextrose for K⁺ > 6 mmol/L; repeat calcium for ECG changes",
      "Adrenaline 10–20 mcg boluses ± infusion if myocardial depression persists",
      "Tranexamic acid 1 g if EXTEM ML > 15% on ROTEM",
    ],
    trap: "Treating the BP first and ignoring K⁺ → ventricular arrhythmia or arrest. Always membrane-stabilise with calcium first.",
  },
];

export const LiverTransplantPhasesDiagram = () => {
  const [selected, setSelected] = useState<PhaseKey>("reperfusion");
  const current = phases.find((p) => p.key === selected)!;

  // Schematic timeline: BP/CO trace across phases
  // viewBox 600 x 220
  const tracePath =
    "M 30 110 " +
    "L 200 105 " + // dissection: stable but variable
    "L 220 145 " + // start anhepatic, drop
    "L 360 150 " + // anhepatic plateau low
    "L 380 95  " + // brief volume restitution
    "L 400 175 " + // reperfusion crash
    "L 440 160 " +
    "L 500 130 " +
    "L 570 115"; // recovery

  return (
    <DiagramFigure
      id="liver-transplant-phases-diagram"
      title="Liver transplant phases"
      description="Auto-generated wrapper for the Liver transplant phases anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 space-y-4">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">Liver Transplantation — 3-Phase Timeline</h3>
            <p className="text-xs text-muted-foreground">
              Schematic mean arterial pressure across the operation. Tap a phase to see its dominant physiology.
            </p>
          </div>
  
          <svg
            viewBox="0 0 600 220"
            className="w-full h-auto max-w-3xl mx-auto"
            role="img"
            aria-label="Three phases of liver transplant with schematic blood pressure trace"
          >
            <defs>
              <linearGradient id="lt-bg-1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--clinical) / 0.18)" />
                <stop offset="100%" stopColor="hsl(var(--clinical) / 0.04)" />
              </linearGradient>
              <linearGradient id="lt-bg-2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent) / 0.18)" />
                <stop offset="100%" stopColor="hsl(var(--accent) / 0.04)" />
              </linearGradient>
              <linearGradient id="lt-bg-3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--destructive) / 0.22)" />
                <stop offset="100%" stopColor="hsl(var(--destructive) / 0.05)" />
              </linearGradient>
            </defs>
  
            {/* Phase backgrounds (clickable) */}
            <g onClick={() => setSelected("dissection")} style={{ cursor: "pointer" }}>
              <rect x="20" y="20" width="200" height="160" rx="6" fill="url(#lt-bg-1)" stroke={selected === "dissection" ? "hsl(var(--clinical))" : "transparent"} strokeWidth="2" />
              <text x="120" y="38" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Dissection</text>
              <text x="120" y="52" textAnchor="middle" className="fill-muted-foreground" fontSize="9">≈ 1–3 h</text>
            </g>
            <g onClick={() => setSelected("anhepatic")} style={{ cursor: "pointer" }}>
              <rect x="220" y="20" width="180" height="160" rx="6" fill="url(#lt-bg-2)" stroke={selected === "anhepatic" ? "hsl(var(--accent))" : "transparent"} strokeWidth="2" />
              <text x="310" y="38" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Anhepatic</text>
              <text x="310" y="52" textAnchor="middle" className="fill-muted-foreground" fontSize="9">IVC clamped · 45–90 min</text>
            </g>
            <g onClick={() => setSelected("reperfusion")} style={{ cursor: "pointer" }}>
              <rect x="400" y="20" width="180" height="160" rx="6" fill="url(#lt-bg-3)" stroke={selected === "reperfusion" ? "hsl(var(--destructive))" : "transparent"} strokeWidth="2" />
              <text x="490" y="38" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Reperfusion</text>
              <text x="490" y="52" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Unclamp · post-reperfusion syndrome</text>
            </g>
  
            {/* Y-axis label (BP) */}
            <text x="14" y="105" textAnchor="middle" className="fill-muted-foreground" fontSize="9" transform="rotate(-90 14 105)">MAP</text>
            <line x1="20" y1="180" x2="580" y2="180" stroke="hsl(var(--border))" strokeWidth="0.75" />
  
            {/* Reference normal MAP line */}
            <line x1="20" y1="105" x2="580" y2="105" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.5" />
            <text x="585" y="108" className="fill-muted-foreground" fontSize="8">baseline</text>
  
            {/* BP trace */}
            <path d={tracePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  
            {/* Phase boundary markers */}
            <line x1="220" y1="20" x2="220" y2="180" stroke="hsl(var(--border))" strokeWidth="0.75" strokeDasharray="2 3" />
            <line x1="400" y1="20" x2="400" y2="180" stroke="hsl(var(--border))" strokeWidth="0.75" strokeDasharray="2 3" />
  
            {/* Annotation: post-reperfusion crash */}
            <circle cx="400" cy="175" r="4" fill="hsl(var(--destructive))" />
            <text x="408" y="200" className="fill-destructive" fontSize="9" fontWeight="600">↓ MAP &gt;30% = PRS</text>
          </svg>
  
          {/* Detail panel */}
          <div
            className="mt-4 p-3 rounded-lg border border-border bg-background/80"
            style={{ borderLeftWidth: 4, borderLeftColor: current.color }}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="font-semibold text-foreground text-sm">{current.title}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{ background: `${current.color}26`, color: current.color }}
              >
                {current.duration}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Challenges</p>
                <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                  {current.challenges.map((c) => (<li key={c}>{c}</li>))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Management</p>
                <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                  {current.management.map((m) => (<li key={m}>{m}</li>))}
                </ul>
              </div>
            </div>
            <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
              <p className="text-[10px] uppercase tracking-wide text-destructive font-semibold">Common trap</p>
              <p className="text-xs text-foreground">{current.trap}</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default LiverTransplantPhasesDiagram;

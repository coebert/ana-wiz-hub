import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type PatternKey = "normal" | "ischaemia" | "mitochondrial" | "neuroglycopenia" | "excitotoxicity";

type PatternData = {
  label: string;
  shortLabel: string;
  glucose: number; // mmol/L tissue
  lactate: number; // mmol/L
  pyruvate: number; // µmol/L
  lpr: number; // ratio
  glutamate: number; // µmol/L
  glycerol: number; // µmol/L
  brainTint: string;
  catheterAlarm: boolean;
  description: string;
  action: string;
};

const PATTERNS: Record<PatternKey, PatternData> = {
  normal: {
    label: "Healthy brain",
    shortLabel: "Normal",
    glucose: 2.0,
    lactate: 2.5,
    pyruvate: 110,
    lpr: 22,
    glutamate: 6,
    glycerol: 60,
    brainTint: "hsl(var(--muted))",
    catheterAlarm: false,
    description:
      "Normal aerobic metabolism — substrate delivery matches demand. LPR low, pyruvate normal, no excitotoxic glutamate release, intact membranes.",
    action: "Routine monitoring. Maintain CPP 60–70 mmHg, glucose 6–10 mmol/L.",
  },
  ischaemia: {
    label: "Type 1 — Ischaemia",
    shortLabel: "Ischaemia",
    glucose: 0.5,
    lactate: 7.5,
    pyruvate: 35, // ↓ pyruvate is the key
    lpr: 55,
    glutamate: 28,
    glycerol: 180,
    brainTint: "hsl(15 80% 55%)",
    catheterAlarm: true,
    description:
      "↑ LPR with LOW pyruvate and LOW tissue glucose — substrate not reaching the cell. Hypotension, ↑ ICP, vasospasm or hypoxia. Glutamate and glycerol rising = evolving injury.",
    action:
      "Optimise CPP (often >70 mmHg in this patient), exclude vasospasm (TCD/CT angio), increase oxygen delivery, escalate ICP control.",
  },
  mitochondrial: {
    label: "Type 2 — Mitochondrial dysfunction",
    shortLabel: "Mitochondrial",
    glucose: 1.8,
    lactate: 6.5,
    pyruvate: 145, // NORMAL/HIGH pyruvate — the discriminator
    lpr: 38,
    glutamate: 12,
    glycerol: 110,
    brainTint: "hsl(280 50% 55%)",
    catheterAlarm: true,
    description:
      "↑ LPR but pyruvate is NORMAL/HIGH and tissue glucose is preserved. Substrate is arriving but the mitochondria can't use it. Common after TBI — will NOT respond to further CPP escalation.",
    action:
      "Do NOT escalate CPP further (no benefit, ↑ ARDS risk). Treat fever, optimise PaO₂/PaCO₂. Currently no proven mitochondrial therapy — guides prognosis.",
  },
  neuroglycopenia: {
    label: "Neuroglycopenia",
    shortLabel: "Neuroglycopenia",
    glucose: 0.4,
    lactate: 5.0,
    pyruvate: 90,
    lpr: 32,
    glutamate: 14,
    glycerol: 95,
    brainTint: "hsl(45 85% 55%)",
    catheterAlarm: true,
    description:
      "Brain glucose <0.8 mmol/L — substrate starvation despite adequate flow. Triggered by tight systemic glucose control (NICE-SUGAR-style 4.5–6 mmol/L). LPR rises secondarily.",
    action:
      "Liberalise systemic glucose target to 6–10 mmol/L. CMD has reshaped post-TBI glycaemic management away from tight control.",
  },
  excitotoxicity: {
    label: "Excitotoxicity / membrane breakdown",
    shortLabel: "Excitotoxic",
    glucose: 1.5,
    lactate: 5.5,
    pyruvate: 100,
    lpr: 30,
    glutamate: 45, // very high
    glycerol: 240, // very high
    brainTint: "hsl(340 70% 55%)",
    catheterAlarm: true,
    description:
      "Glutamate and glycerol very high — neuronal injury and phospholipid membrane breakdown. May precede CT changes by hours. Especially relevant peri-contusion and during DCI in SAH.",
    action:
      "Look for cause (evolving contusion, DCI, seizures — consider EEG). Optimise CPP, treat seizures, consider escalation of neuroprotection.",
  },
};

const ORDER: PatternKey[] = ["normal", "ischaemia", "mitochondrial", "neuroglycopenia", "excitotoxicity"];

// Bar config: value, normal range max for scale, alarm threshold
type BarConfig = {
  key: keyof Pick<PatternData, "glucose" | "lactate" | "pyruvate" | "lpr" | "glutamate" | "glycerol">;
  label: string;
  unit: string;
  max: number;
  normalLow?: number;
  normalHigh: number;
  alarmHigh?: number;
  alarmLow?: number;
};

const BARS: BarConfig[] = [
  { key: "glucose", label: "Glucose", unit: "mmol/L", max: 3, normalLow: 1.7, normalHigh: 2.5, alarmLow: 0.8 },
  { key: "lactate", label: "Lactate", unit: "mmol/L", max: 10, normalHigh: 4, alarmHigh: 4 },
  { key: "pyruvate", label: "Pyruvate", unit: "µmol/L", max: 200, normalLow: 70, normalHigh: 150 },
  { key: "lpr", label: "LPR", unit: "ratio", max: 60, normalHigh: 25, alarmHigh: 25 },
  { key: "glutamate", label: "Glutamate", unit: "µmol/L", max: 50, normalHigh: 10, alarmHigh: 10 },
  { key: "glycerol", label: "Glycerol", unit: "µmol/L", max: 250, normalHigh: 100, alarmHigh: 100 },
];

const CerebralMicrodialysisDiagram = () => {
  const [pattern, setPattern] = useState<PatternKey>("normal");
  const data = PATTERNS[pattern];

  const isAbnormal = (b: BarConfig, v: number) => {
    if (b.alarmHigh !== undefined && v > b.alarmHigh) return true;
    if (b.alarmLow !== undefined && v < b.alarmLow) return true;
    return false;
  };

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-semibold text-foreground mb-1 text-center">
        Cerebral Microdialysis — Interactive Pattern Recognition
      </p>
      <p className="text-xs text-muted-foreground text-center mb-3">
        Coronal brain with cranial bolt, coaxial catheter and live neurochemistry panel. Toggle patterns to compare.
      </p>

      {/* Pattern selector */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-4">
        {ORDER.map((k) => (
          <button
            key={k}
            onClick={() => setPattern(k)}
            className={`text-[11px] px-2.5 py-1 rounded border transition ${
              pattern === k
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-muted/50 text-foreground"
            }`}
          >
            {PATTERNS[k].shortLabel}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-4 items-start">
        {/* === Left: Coronal brain + catheter === */}
        <div>
          <svg viewBox="0 0 360 380" className="w-full h-auto max-w-[400px] mx-auto" role="img" aria-label="Coronal brain with microdialysis catheter">
            {/* Skull outline (coronal) */}
            <path
              d="M 60 110 Q 60 50, 180 40 Q 300 50, 300 110 L 300 230 Q 300 280, 270 290 L 250 295 L 250 305 L 110 305 L 110 295 L 90 290 Q 60 280, 60 230 Z"
              fill="hsl(var(--muted))"
              opacity="0.55"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
            />
            {/* Inner skull / dura line */}
            <path
              d="M 75 115 Q 75 60, 180 52 Q 285 60, 285 115 L 285 225 Q 285 268, 260 278 L 240 282 L 120 282 L 100 278 Q 75 268, 75 225 Z"
              fill="hsl(var(--background))"
              stroke="hsl(var(--border))"
              strokeWidth="0.75"
            />

            {/* Brain (cortex) - tinted by pattern */}
            <path
              d="M 85 125 Q 85 70, 180 62 Q 275 70, 275 125 L 275 220 Q 275 260, 255 270 L 235 275 L 125 275 L 105 270 Q 85 260, 85 220 Z"
              fill={data.brainTint}
              opacity={pattern === "normal" ? 0.4 : 0.55}
              stroke="hsl(var(--anatomy))"
              strokeWidth="1"
              style={{ transition: "fill 0.4s, opacity 0.4s" }}
            />

            {/* Longitudinal fissure */}
            <line x1="180" y1="62" x2="180" y2="275" stroke="hsl(var(--anatomy))" strokeWidth="1.5" opacity="0.6" />

            {/* Sulci (decorative gyral pattern) */}
            <g stroke="hsl(var(--anatomy))" strokeWidth="0.5" fill="none" opacity="0.45">
              <path d="M 95 140 Q 110 135, 130 145" />
              <path d="M 100 175 Q 130 170, 155 180" />
              <path d="M 95 210 Q 125 205, 150 215" />
              <path d="M 100 245 Q 130 240, 155 250" />
              <path d="M 265 140 Q 250 135, 230 145" />
              <path d="M 260 175 Q 230 170, 205 180" />
              <path d="M 265 210 Q 235 205, 210 215" />
              <path d="M 260 245 Q 230 240, 205 250" />
            </g>

            {/* Lateral ventricles */}
            <ellipse cx="155" cy="170" rx="14" ry="22" fill="hsl(var(--background))" stroke="hsl(var(--anatomy))" strokeWidth="0.75" opacity="0.85" />
            <ellipse cx="205" cy="170" rx="14" ry="22" fill="hsl(var(--background))" stroke="hsl(var(--anatomy))" strokeWidth="0.75" opacity="0.85" />

            {/* Cranial bolt — penetrating skull on right frontal (clinical convention: right frontal for diffuse TBI) */}
            <g>
              {/* Bolt body (above skull) */}
              <rect x="225" y="15" width="22" height="40" rx="3" fill="hsl(var(--foreground))" />
              {/* Bolt threads */}
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1="225" y1={20 + i * 8} x2="247" y2={24 + i * 8} stroke="hsl(var(--background))" strokeWidth="0.5" opacity="0.7" />
              ))}
              {/* Bolt flange (sits on skull) */}
              <rect x="218" y="55" width="36" height="6" rx="2" fill="hsl(var(--foreground))" stroke="hsl(var(--border))" strokeWidth="0.75" />
              {/* Bolt port labels */}
              <text x="236" y="12" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="700">
                Triple-lumen bolt
              </text>
              <text x="260" y="35" fontSize="7" fill="hsl(var(--muted-foreground))">ICP</text>
              <text x="260" y="44" fontSize="7" fill="hsl(var(--muted-foreground))">PbtO₂</text>
              <text x="260" y="53" fontSize="7" fill="hsl(var(--muted-foreground))">CMD</text>

              {/* Coaxial catheter — descending into white matter */}
              <line x1="236" y1="61" x2="236" y2="195" stroke="hsl(var(--anatomy))" strokeWidth="2" />
              <line x1="236" y1="61" x2="236" y2="195" stroke="hsl(var(--background))" strokeWidth="0.75" />

              {/* Membrane segment at tip (10 mm) */}
              <g>
                <rect x="232" y="195" width="8" height="35" fill="hsl(var(--primary))" opacity="0.6" stroke="hsl(var(--primary))" strokeWidth="1" />
                {/* Membrane perforations */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line key={i} x1="232" y1={199 + i * 5.5} x2="240" y2={199 + i * 5.5} stroke="hsl(var(--primary))" strokeWidth="0.5" />
                ))}
              </g>

              {/* Diffusion arrows across membrane (pulse on alarm) */}
              <g opacity={data.catheterAlarm ? 1 : 0.5}>
                <path d="M 220 210 L 230 210" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#arrow-in)" />
                <path d="M 220 220 L 230 220" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#arrow-in)" />
                <path d="M 252 215 L 242 215" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#arrow-out)" />
                {data.catheterAlarm && (
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
                )}
              </g>

              {/* Catheter tip label */}
              <line x1="240" y1="212" x2="335" y2="195" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
              <text x="335" y="192" fontSize="8" fill="hsl(var(--foreground))" fontWeight="700">
                Semipermeable
              </text>
              <text x="335" y="201" fontSize="8" fill="hsl(var(--muted-foreground))">
                membrane (20 kDa)
              </text>
              <text x="335" y="210" fontSize="8" fill="hsl(var(--muted-foreground))">
                10 mm length
              </text>
            </g>

            {/* Perfusate flow indicator (down inner lumen, up outer) */}
            <text x="50" y="80" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">Perfusate</text>
            <text x="50" y="89" fontSize="7" fill="hsl(var(--muted-foreground))">0.3 µL/min</text>
            <path d="M 75 95 Q 150 90, 220 75" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" strokeDasharray="3 2" />

            {/* Microvial collection */}
            <text x="50" y="320" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600">Microvial</text>
            <text x="50" y="329" fontSize="7" fill="hsl(var(--muted-foreground))">hourly → ISCUS</text>
            <path d="M 75 335 Q 150 340, 220 320" stroke="hsl(var(--anatomy))" strokeWidth="1" fill="none" strokeDasharray="3 2" />

            {/* Right frontal label */}
            <text x="180" y="358" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontStyle="italic">
              Coronal section — right frontal placement (diffuse TBI)
            </text>

            {/* Arrow markers */}
            <defs>
              <marker id="arrow-in" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="hsl(var(--destructive))" />
              </marker>
              <marker id="arrow-out" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 Z" fill="hsl(var(--primary))" />
              </marker>
            </defs>

            {/* Alarm beacon */}
            {data.catheterAlarm && (
              <g>
                <circle cx="310" cy="22" r="6" fill="hsl(var(--destructive))">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
                </circle>
                <text x="320" y="25" fontSize="8" fill="hsl(var(--destructive))" fontWeight="700">
                  ALARM
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* === Right: Live monitor panel === */}
        <div>
          <div className="rounded-lg border border-border bg-background/50 p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">ISCUS bedside monitor</p>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  data.catheterAlarm ? "bg-destructive text-destructive-foreground" : "bg-primary/20 text-primary"
                }`}
              >
                {data.catheterAlarm ? "● METABOLIC CRISIS" : "● STABLE"}
              </span>
            </div>

            <div className="space-y-2">
              {BARS.map((b) => {
                const val = data[b.key];
                const pct = Math.min(100, (val / b.max) * 100);
                const normalPct = (b.normalHigh / b.max) * 100;
                const abnormal = isAbnormal(b, val);
                return (
    <DiagramFigure
      id="cerebral-microdialysis-diagram"
      title="Cerebral microdialysis"
      description="Auto-generated wrapper for the Cerebral microdialysis anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                        <div key={b.key}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-[11px] font-semibold text-foreground">{b.label}</span>
                        <span className={`text-[11px] font-mono font-bold ${abnormal ? "text-destructive" : "text-foreground"}`}>
                          {val.toFixed(b.key === "glucose" || b.key === "lactate" ? 1 : 0)} <span className="text-muted-foreground font-normal">{b.unit}</span>
                        </span>
                      </div>
                      <div className="relative h-3 bg-muted/40 rounded overflow-hidden">
                        {/* Normal range band */}
                        <div
                          className="absolute top-0 h-full bg-primary/15 border-r border-primary/40"
                          style={{
                            left: `${b.normalLow ? (b.normalLow / b.max) * 100 : 0}%`,
                            width: `${normalPct - (b.normalLow ? (b.normalLow / b.max) * 100 : 0)}%`,
                          }}
                        />
                        {/* Value bar */}
                        <div
                          className={`absolute top-0 h-full transition-all duration-500 ${abnormal ? "bg-destructive" : "bg-primary"}`}
                          style={{ width: `${pct}%`, opacity: 0.85 }}
                        />
                      </div>
                    </div>
    </DiagramFigure>
  );
              })}
            </div>
          </div>

          {/* Pattern explanation */}
          <div className="mt-3 p-3 rounded-lg border-2 border-primary/30 bg-primary/5">
            <p className="text-sm font-bold text-foreground mb-1">{data.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">{data.description}</p>
            <div className="pt-2 border-t border-border/60">
              <p className="text-[11px] font-semibold text-foreground mb-0.5">Action:</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{data.action}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discriminator hint */}
      <div className="mt-3 p-2.5 rounded bg-secondary/40 border border-border">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Key discriminator:</strong> when LPR is high, look at <strong>pyruvate</strong>. <span className="text-destructive font-semibold">Low pyruvate = ischaemia</span> (substrate not arriving — escalate CPP). <span className="text-primary font-semibold">Normal/high pyruvate = mitochondrial dysfunction</span> (substrate arriving but cells can't use it — do NOT escalate CPP). Compare the <em>Ischaemia</em> and <em>Mitochondrial</em> patterns above.
        </p>
      </div>
    </div>
  );
};

export default CerebralMicrodialysisDiagram;

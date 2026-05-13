import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

type TimePoint = "pre72" | "72h" | "modalities" | "decision";

interface ModalityInfo {
  name: string;
  shortName: string;
  timing: string;
  poorPrognosticSign: string;
  detail: string;
  color: string;
  icon: string;
  startH: number;
  endH: number;
  peakH?: number; // optimal assessment time
}

const modalities: ModalityInfo[] = [
  {
    name: "Clinical Examination",
    shortName: "Clinical",
    timing: "≥72 h post-ROSC",
    poorPrognosticSign: "Bilateral absent pupillary & corneal reflexes",
    detail: "Pupillary light reflex and corneal reflex assessed at ≥72 h (or after rewarming). Quantitative pupillometry (NPi <2) more reliable than standard assessment. Myoclonus status within 72 h is a poor sign but NOT status epilepticus alone. GCS Motor 1–2 at 72 h is the entry criterion for formal prognostication.",
    color: "hsl(0, 75%, 55%)",
    icon: "👁️",
    startH: 72, endH: 120, peakH: 72,
  },
  {
    name: "Electroencephalography (EEG)",
    shortName: "EEG",
    timing: "≥24 h, reassess ≥72 h",
    poorPrognosticSign: "Highly malignant pattern: suppression or burst-suppression",
    detail: "Highly malignant = suppression (<10 μV), burst-suppression (with or without discharges). Malignant = discontinuous/low-voltage + discharges. Unreactive EEG backgrounds are also concerning. Continuous EEG monitoring preferred. Confounders: residual sedation, hypothermia, metabolic derangement. EEG reactivity testing should be standardised.",
    color: "hsl(270, 65%, 55%)",
    icon: "📊",
    startH: 24, endH: 120, peakH: 72,
  },
  {
    name: "Somatosensory Evoked Potentials (SSEP)",
    shortName: "SSEP",
    timing: "≥24 h post-ROSC",
    poorPrognosticSign: "Bilateral absent N20 cortical responses",
    detail: "Median nerve SSEPs — bilateral absence of N20 is one of the most robust predictors (FPR <1% in most studies). Should be performed by experienced neurophysiologist. Not affected by sedation at clinical doses. Peripheral N13/N14 must be present to confirm technical adequacy. Can be performed during TTM.",
    color: "hsl(210, 75%, 55%)",
    icon: "⚡",
    startH: 24, endH: 120, peakH: 48,
  },
  {
    name: "Neuroimaging",
    shortName: "Imaging",
    timing: "24–72 h (CT); 2–5 days (MRI)",
    poorPrognosticSign: "Diffuse cerebral oedema (CT) / Extensive DWI restriction (MRI)",
    detail: "CT: loss of grey-white matter differentiation (GWR <1.10–1.22 depending on region). MRI DWI: extensive cortical/deep grey diffusion restriction at 2–5 days. MRI more sensitive than CT. Whole-brain apparent diffusion coefficient (ADC) values aid quantification. CT is practical early; MRI is the gold standard for prognostication when feasible.",
    color: "hsl(160, 65%, 45%)",
    icon: "🧠",
    startH: 24, endH: 120, peakH: 72,
  },
  {
    name: "Biomarkers",
    shortName: "NSE",
    timing: "24–72 h post-ROSC",
    poorPrognosticSign: "NSE >60 μg/L at 48–72 h",
    detail: "Neuron-specific enolase (NSE): >60 μg/L at 48–72 h strongly associated with poor outcome (ERC/ESICM 2021). Must check for haemolysis (falsely elevated). S100B is less well validated. Serial NSE measurements (rising trend) more informative than single values. No single biomarker threshold is 100% specific — always combine with other modalities.",
    color: "hsl(35, 85%, 50%)",
    icon: "🧪",
    startH: 24, endH: 72, peakH: 48,
  },
];

const timelineSteps = [
  {
    id: "pre72" as TimePoint,
    label: "0–72 h",
    title: "Stabilisation & Targeted Temperature Management",
    content: "ROSC achieved → ICU admission → TTM (32–36°C for ≥24 h, then controlled rewarming ≤0.5°C/h). Avoid hyperthermia. Minimise/stop sedation for assessment. Treat seizures. Maintain normoxia, normocapnia, normoglycaemia. Do NOT make prognostic decisions during this phase. Allow ≥72 h from ROSC (or ≥72 h from completion of rewarming if TTM used) before formal prognostication.",
    highlight: "Do NOT prognosticate during this period",
    color: "hsl(210, 75%, 55%)",
  },
  {
    id: "72h" as TimePoint,
    label: "≥72 h",
    title: "Clinical Assessment — Entry Criterion",
    content: "At ≥72 h post-ROSC (or after rewarming): GCS Motor score 1–2 (no motor response or extension only) → proceed to multimodal prognostication. If GCS-M ≥3, patient may be recovering — continue observation and serial assessment. Ensure no residual sedation confounders (check drug levels if needed). Quantitative pupillometry (NPi) if available.",
    highlight: "GCS Motor 1–2 → triggers formal prognostication",
    color: "hsl(45, 85%, 50%)",
  },
  {
    id: "modalities" as TimePoint,
    label: "Multimodal",
    title: "Apply ≥2 Independent Modalities",
    content: "Use at least 2 concordant modalities from different categories to predict poor outcome. No single test is sufficient alone. Each modality must independently suggest poor prognosis. The more concordant results, the more confident the prediction. Consider confounders for each test (sedation, hypothermia, metabolic state, organ failure).",
    highlight: "≥2 concordant poor prognostic signs required",
    color: "hsl(0, 75%, 55%)",
  },
  {
    id: "decision" as TimePoint,
    label: "Decision",
    title: "Outcome Determination",
    content: "If ≥2 modalities concordantly predict poor outcome → likely poor neurological outcome (CPC 3–5). Discuss with family, multidisciplinary team. If results are discordant or uncertain → continue observation, repeat testing, wait. Avoid self-fulfilling prophecy — never withdraw life-sustaining treatment based on a single early predictor.",
    highlight: "Concordant → poor outcome likely | Discordant → wait & reassess",
    color: "hsl(160, 55%, 45%)",
  },
];

const PostCardiacArrestProgDiagram = () => {
  const [activeStep, setActiveStep] = useState<TimePoint>("pre72");
  const [activeModality, setActiveModality] = useState<number | null>(null);
  const currentStep = timelineSteps.find((s) => s.id === activeStep)!;

  return (
    <DiagramFigure
      id="post-cardiac-arrest-prog-diagram"
      title="Post cardiac arrest prog"
      description="Auto-generated wrapper for the Post cardiac arrest prog anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6 mb-8">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">
          ERC/ESICM 2021 — Post-Cardiac Arrest Prognostication Algorithm
        </h3>
        <p className="text-xs text-muted-foreground mb-5">
          Click each timeline stage, then explore the individual modalities used in multimodal assessment
        </p>
  
        {/* Timeline */}
        <div className="relative mb-6">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />
          <div className="relative flex justify-between">
            {timelineSteps.map((step, i) => {
              const isActive = activeStep === step.id;
              const isPast = timelineSteps.findIndex((s) => s.id === activeStep) >= i;
              return (
                <button
                  key={step.id}
                  onClick={() => { setActiveStep(step.id); setActiveModality(null); }}
                  className="flex flex-col items-center z-10 group"
                  style={{ width: "24%" }}
                >
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? "text-white shadow-lg scale-110"
                        : isPast
                          ? "text-white opacity-70"
                          : "bg-background text-muted-foreground border-border"
                    }`}
                    style={isPast ? { backgroundColor: step.color, borderColor: step.color } : undefined}
                  >
                    {i + 1}
                  </div>
                  <span className={`text-[10px] sm:text-xs mt-1.5 font-medium text-center leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
  
        {/* Active step detail */}
        <div className="rounded-lg border border-border bg-background p-4 mb-5 transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: currentStep.color }} />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-foreground mb-1">{currentStep.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{currentStep.content}</p>
              <div
                className="inline-block px-2 py-1 rounded text-[10px] font-bold border"
                style={{
                  backgroundColor: withAlpha(currentStep.color, 0.12),
                  borderColor: withAlpha(currentStep.color, 0.35),
                  color: currentStep.color,
                }}
              >
                {currentStep.highlight}
              </div>
            </div>
          </div>
        </div>
  
        {/* Modalities grid — always visible but highlighted when on "modalities" step */}
        <div className={`transition-opacity duration-300 ${activeStep === "modalities" ? "opacity-100" : "opacity-70"}`}>
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Five Prognostic Modalities</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
            {modalities.map((m, i) => {
              const isActive = activeModality === i;
              return (
                <button
                  key={m.name}
                  onClick={() => setActiveModality(isActive ? null : i)}
                  className={`text-left p-3 rounded-lg border transition-all duration-200 ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-secondary/20 hover:bg-secondary/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{m.icon}</span>
                    <span className="text-xs font-semibold text-foreground leading-tight">{m.name}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{m.timing}</p>
                </button>
              );
            })}
          </div>
  
          {/* Visual timeline SVG — when each modality becomes valid */}
          <div className="rounded-lg border border-border bg-background p-4 mb-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Modality Validity Windows (0–120 h post-ROSC)</p>
            <svg viewBox="0 0 600 195" className="w-full h-auto">
              {/* Time axis */}
              <line x1="80" y1="175" x2="580" y2="175" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.4" />
              {/* Hour markers */}
              {[0, 24, 48, 72, 96, 120].map((h) => {
                const x = 80 + (h / 120) * 500;
                return (
                  <g key={h}>
                    <line x1={x} y1="170" x2={x} y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" />
                    <text x={x} y="192" textAnchor="middle" className="fill-muted-foreground text-[9px]">{h}h</text>
                  </g>
                );
              })}
              {/* 72h decision line */}
              <line x1={80 + (72 / 120) * 500} y1="5" x2={80 + (72 / 120) * 500} y2="170" stroke="hsl(0, 75%, 55%)" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
              <text x={80 + (72 / 120) * 500} y="14" textAnchor="middle" className="text-[8px] font-bold" fill="hsl(0, 75%, 55%)">≥72 h: formal prognostication</text>
  
              {/* TTM bar */}
              {(() => {
                const y = 28;
                const x1 = 80;
                const x2 = 80 + (48 / 120) * 500;
                return (
                  <g>
                    <rect x={x1} y={y} width={x2 - x1} height="14" rx="3" fill="hsl(210, 75%, 55%)" opacity="0.15" stroke="hsl(210, 75%, 55%)" strokeWidth="0.5" />
                    <text x={x1 + 4} y={y + 10} className="text-[7px] font-semibold" fill="hsl(210, 75%, 55%)">TTM (32–36°C) + Rewarming</text>
                    <text x={5} y={y + 10} className="text-[8px] font-medium fill-muted-foreground">TTM</text>
                  </g>
                );
              })()}
  
              {/* Modality bars */}
              {modalities.map((m, i) => {
                const y = 50 + i * 28;
                const barX1 = 80 + (m.startH / 120) * 500;
                const barX2 = 80 + (m.endH / 120) * 500;
                const peakX = m.peakH ? 80 + (m.peakH / 120) * 500 : undefined;
                const isHighlighted = activeModality === i;
                return (
                  <g key={m.name} onClick={() => setActiveModality(activeModality === i ? null : i)} style={{ cursor: "pointer" }}>
                    {/* Label */}
                    <text x={5} y={y + 12} className={`text-[8px] font-medium ${isHighlighted ? "fill-foreground" : "fill-muted-foreground"}`}>
                      {m.icon} {m.shortName}
                    </text>
                    {/* Invalid zone (hatched/dimmed) */}
                    <rect x={80} y={y + 2} width={barX1 - 80} height="16" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.05" stroke="hsl(var(--border))" strokeWidth="0.75" />
                    {/* Valid window bar */}
                    <rect
                      x={barX1} y={y + 2} width={barX2 - barX1} height="16" rx="3"
                      fill={m.color} opacity={isHighlighted ? 0.45 : 0.25}
                      stroke={m.color} strokeWidth={isHighlighted ? "1.5" : "0.5"}
                    />
                    {/* Peak/optimal marker */}
                    {peakX && (
                      <g>
                        <circle cx={peakX} cy={y + 10} r="4" fill={m.color} opacity={isHighlighted ? 0.9 : 0.6} />
                        <circle cx={peakX} cy={y + 10} r="2" fill="hsl(var(--background))" opacity="0.8" />
                      </g>
                    )}
                    {/* Timing label on bar — dark text for contrast against translucent fill */}
                    <text x={barX1 + 5} y={y + 13} className="text-[7px] font-semibold fill-foreground">
                      {m.timing}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-2.5 rounded-sm bg-muted-foreground/20 border border-muted-foreground/30" />
                <span className="text-[9px] text-muted-foreground">Valid window</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/50 border border-muted-foreground/60 relative">
                  <div className="absolute inset-[3px] rounded-full bg-white/80" />
                </div>
                <span className="text-[9px] text-muted-foreground">Optimal timing</span>
              </div>
              <span className="text-[9px] text-muted-foreground italic">Click a bar for details</span>
            </div>
          </div>
  
          {activeModality !== null && (() => {
            const m = modalities[activeModality];
            return (
                  <div
                className="rounded-lg border p-4 mb-4 animate-fade-in bg-card"
                style={{ borderColor: withAlpha(m.color, 0.45) }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-xl">{m.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{m.name}</h4>
                    <p className="text-[10px] font-semibold text-muted-foreground">{m.timing}</p>
                  </div>
                </div>
                <div
                  className="rounded px-2 py-1.5 mb-2 border-l-2 bg-background"
                  style={{ borderLeftColor: m.color }}
                >
                  <p className="text-xs font-semibold" style={{ color: m.color }}>Poor prognostic sign</p>
                  <p className="text-xs text-foreground font-medium leading-snug">{m.poorPrognosticSign}</p>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed">{m.detail}</p>
              </div>
    );
          })()}
        </div>
  
        {/* Decision rule summary */}
        <div className="rounded-lg bg-secondary/30 border border-border p-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Self-fulfilling prophecy warning: </span>
            If treatment is withdrawn based on an early poor prediction, the patient dies — apparently confirming the prediction. 
            The 2021 guidelines mandate multimodal assessment at ≥72 h with ≥2 concordant modalities to minimise this risk. 
            <span className="font-semibold"> When in doubt — wait and reassess.</span>
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PostCardiacArrestProgDiagram;

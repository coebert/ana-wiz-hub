import { useState } from "react";

type Phase = "normal" | "mild" | "severe" | "arrest";

interface PhaseData {
  label: string;
  description: string;
  lungVolume: number; // percentage fill
  autoPeep: string;
  venousReturn: string;
  cardiacOutput: string;
  bp: string;
  flowReturnsToZero: boolean;
  flowTruncation: number; // 0-1, how much of exp flow is completed
  alveolarPressure: string;
  clinicalSigns: string[];
  management: string[];
  color: string;
}

const phases: Record<Phase, PhaseData> = {
  normal: {
    label: "Normal Breathing",
    description: "Complete expiration occurs before the next inspiration. No gas trapping.",
    lungVolume: 35,
    autoPeep: "0 cmH₂O",
    venousReturn: "Normal",
    cardiacOutput: "Normal",
    bp: "Normal",
    flowReturnsToZero: true,
    flowTruncation: 1,
    alveolarPressure: "0 cmH₂O (atmospheric)",
    clinicalSigns: ["Normal breath sounds", "No hyperexpansion", "Stable haemodynamics"],
    management: [],
    color: "hsl(var(--primary))",
  },
  mild: {
    label: "Mild Gas Trapping",
    description: "Expiratory flow does not reach zero — mild auto-PEEP develops. Lung volume increases above FRC.",
    lungVolume: 55,
    autoPeep: "5–8 cmH₂O",
    venousReturn: "Mildly reduced",
    cardiacOutput: "Mildly reduced",
    bp: "Maintained",
    flowReturnsToZero: false,
    flowTruncation: 0.6,
    alveolarPressure: "5–8 cmH₂O",
    clinicalSigns: ["Wheeze on auscultation", "Increased work of breathing", "Mild pulsus paradoxus"],
    management: ["Optimise bronchodilators", "Reduce respiratory rate", "Increase I:E ratio"],
    color: "hsl(45, 93%, 47%)",
  },
  severe: {
    label: "Severe Hyperinflation",
    description: "Significant gas trapping → high auto-PEEP → haemodynamic compromise from impaired venous return.",
    lungVolume: 80,
    autoPeep: "15–25 cmH₂O",
    venousReturn: "Significantly impaired",
    cardiacOutput: "Reduced (↓↓)",
    bp: "Hypotension",
    flowReturnsToZero: false,
    flowTruncation: 0.3,
    alveolarPressure: "15–25 cmH₂O",
    clinicalSigns: ["Silent chest", "Severe pulsus paradoxus (>25 mmHg)", "Tachycardia", "Hypotension", "Rising plateau pressure (>30 cmH₂O)"],
    management: ["Disconnect ventilator — allow prolonged expiration", "RR 8–10, I:E 1:4–1:5", "Permissive hypercapnia", "Exclude pneumothorax"],
    color: "hsl(25, 95%, 53%)",
  },
  arrest: {
    label: "PEA Arrest",
    description: "Extreme hyperinflation acts as sustained Valsalva → complete obstruction of venous return → PEA cardiac arrest.",
    lungVolume: 95,
    autoPeep: ">25 cmH₂O",
    venousReturn: "Obstructed",
    cardiacOutput: "Near-zero",
    bp: "Unrecordable",
    flowReturnsToZero: false,
    flowTruncation: 0.1,
    alveolarPressure: ">25 cmH₂O",
    clinicalSigns: ["PEA / asystole", "No cardiac output despite CPR", "Bilateral hyperresonance"],
    management: ["Disconnect ETT — manually compress chest for 60s", "Bilateral thoracostomies (exclude tension pneumothorax)", "IV adrenaline", "Slow hand ventilation once decompressed (6–8 bpm)"],
    color: "hsl(0, 84%, 60%)",
  },
};

const phaseOrder: Phase[] = ["normal", "mild", "severe", "arrest"];

const DynamicHyperinflationDiagram = () => {
  const [selected, setSelected] = useState<Phase>("normal");
  const data = phases[selected];

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 mb-8">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Dynamic Hyperinflation & Auto-PEEP</h3>
      <p className="text-xs text-muted-foreground mb-4">Select a phase to explore the mechanism of gas trapping and its cardiovascular consequences</p>

      {/* Phase selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {phaseOrder.map((phase) => {
          const p = phases[phase];
          const isActive = selected === phase;
          return (
            <button
              key={phase}
              onClick={() => setSelected(phase)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "border-primary bg-primary/10 text-foreground shadow-sm"
                  : "border-border bg-secondary/20 text-muted-foreground hover:bg-secondary/40"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Left: Lung & Flow Visualisation */}
        <div className="space-y-4">
          {/* Lung volume visualisation */}
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Lung Volume</p>
            <div className="relative mx-auto w-40 h-48">
              {/* Lung outline */}
              <svg viewBox="0 0 160 192" className="w-full h-full">
                {/* Trachea */}
                <rect x="72" y="0" width="16" height="30" rx="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.5" />
                {/* Left lung outline */}
                <path
                  d="M70 30 Q30 50 25 100 Q20 155 55 175 Q70 182 75 170 L75 30 Z"
                  fill="none"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
                {/* Right lung outline */}
                <path
                  d="M90 30 Q130 50 135 100 Q140 155 105 175 Q90 182 85 170 L85 30 Z"
                  fill="none"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
                {/* Left lung fill */}
                <path
                  d="M70 30 Q30 50 25 100 Q20 155 55 175 Q70 182 75 170 L75 30 Z"
                  fill={data.color}
                  opacity={0.15 + (data.lungVolume / 100) * 0.45}
                  className="transition-all duration-700 ease-in-out"
                />
                {/* Right lung fill */}
                <path
                  d="M90 30 Q130 50 135 100 Q140 155 105 175 Q90 182 85 170 L85 30 Z"
                  fill={data.color}
                  opacity={0.15 + (data.lungVolume / 100) * 0.45}
                  className="transition-all duration-700 ease-in-out"
                />
                {/* Heart */}
                <ellipse
                  cx="80"
                  cy="120"
                  rx={14 - (data.lungVolume / 100) * 6}
                  ry={16 - (data.lungVolume / 100) * 7}
                  fill="hsl(0, 70%, 55%)"
                  opacity={0.7 - (data.lungVolume / 100) * 0.3}
                  className="transition-all duration-700 ease-in-out"
                />
                {/* Volume label */}
                <text x="80" y="100" textAnchor="middle" className="fill-foreground text-[10px] font-bold">
                  {data.lungVolume}% TLC
                </text>
              </svg>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-1">{data.description}</p>
          </div>

          {/* Expiratory flow waveform */}
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Expiratory Flow Waveform</p>
            <svg viewBox="0 0 280 100" className="w-full h-auto">
              {/* Axes */}
              <line x1="30" y1="50" x2="270" y2="50" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
              <line x1="30" y1="10" x2="30" y2="90" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
              {/* Zero flow line label */}
              <text x="5" y="53" className="fill-muted-foreground text-[7px]">0</text>
              <text x="2" y="20" className="fill-muted-foreground text-[7px]">Insp</text>
              <text x="2" y="85" className="fill-muted-foreground text-[7px]">Exp</text>
              <text x="250" y="46" className="fill-muted-foreground text-[7px]">Time</text>

              {/* Breath 1 */}
              {renderBreath(40, data.flowTruncation, data.color, data.flowReturnsToZero)}
              {/* Breath 2 */}
              {renderBreath(140, data.flowTruncation, data.color, data.flowReturnsToZero)}

              {/* Auto-PEEP indicator */}
              {!data.flowReturnsToZero && (
                <>
                  <line x1="130" y1={50 + 30 * (1 - data.flowTruncation)} x2="140" y2={50 + 30 * (1 - data.flowTruncation)} stroke={data.color} strokeWidth="1" strokeDasharray="2,2" />
                  <text x="133" y={46 + 30 * (1 - data.flowTruncation)} className="text-[6px] font-bold" fill={data.color}>
                    Auto-PEEP
                  </text>
                </>
              )}
            </svg>
            <p className="text-center text-xs mt-1" style={{ color: data.color }}>
              {data.flowReturnsToZero ? "✓ Flow returns to zero — no gas trapping" : "✗ Flow truncated — gas trapping present"}
            </p>
          </div>
        </div>

        {/* Right: Parameters & Effects */}
        <div className="space-y-3">
          {/* Haemodynamic cascade */}
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Cardiovascular Cascade</p>
            <div className="space-y-2">
              {[
                { label: "Auto-PEEP", value: data.autoPeep },
                { label: "Alveolar Pressure", value: data.alveolarPressure },
                { label: "Venous Return", value: data.venousReturn },
                { label: "Cardiac Output", value: data.cardiacOutput },
                { label: "Blood Pressure", value: data.bp },
              ].map((param, i) => (
                <div key={param.label} className="flex items-center gap-2">
                  {i > 0 && (
                    <svg width="12" height="12" viewBox="0 0 12 12" className="shrink-0 -my-1">
                      <path d="M6 0 L6 12 M2 8 L6 12 L10 8" fill="none" stroke={data.color} strokeWidth="1.5" />
                    </svg>
                  )}
                  <div className="flex-1 flex items-center justify-between bg-secondary/30 rounded px-2 py-1.5">
                    <span className="text-xs font-medium text-foreground">{param.label}</span>
                    <span className="text-xs font-bold" style={{ color: data.color }}>{param.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical signs */}
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Clinical Signs</p>
            <ul className="space-y-1">
              {data.clinicalSigns.map((sign) => (
                <li key={sign} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.color }} />
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          {/* Management */}
          {data.management.length > 0 && (
            <div className="rounded-lg border p-4" style={{ borderColor: data.color + "40", backgroundColor: data.color + "08" }}>
              <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Management</p>
              <ol className="space-y-1">
                {data.management.map((step, i) => (
                  <li key={step} className="text-xs text-muted-foreground flex items-start gap-1.5">
                    <span className="shrink-0 font-bold text-foreground">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Mechanism summary */}
      <div className="rounded-lg bg-secondary/30 border border-border p-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Key mechanism: </span>
          Narrowed airways increase expiratory time constants → insufficient expiration time → progressive gas trapping → rising alveolar pressure (auto-PEEP) → 
          compresses pulmonary vasculature and heart → impaired venous return → reduced cardiac output → cardiovascular collapse. 
          <span className="font-semibold"> Immediate action in arrest: disconnect ventilator, compress chest, bilateral thoracostomies.</span>
        </p>
      </div>
    </div>
  );
};

function renderBreath(startX: number, truncation: number, color: string, returnsToZero: boolean) {
  const inspPeakY = 25;
  const expPeakY = 80;
  const baseY = 50;
  const breathWidth = 80;

  // Inspiration phase (above baseline)
  const inspEnd = startX + breathWidth * 0.3;
  // Expiration phase
  const expEnd = startX + breathWidth;
  const actualExpEndY = returnsToZero ? baseY : baseY + (expPeakY - baseY) * (1 - truncation);

  const path = `
    M ${startX} ${baseY}
    Q ${startX + 5} ${inspPeakY} ${inspEnd} ${inspPeakY}
    L ${inspEnd} ${baseY}
    L ${inspEnd} ${expPeakY}
    Q ${inspEnd + (expEnd - inspEnd) * 0.5} ${expPeakY - (expPeakY - actualExpEndY) * 0.3} ${expEnd} ${actualExpEndY}
  `;

  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth="2"
      className="transition-all duration-500"
    />
  );
}

export default DynamicHyperinflationDiagram;

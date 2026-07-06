import { useState, useEffect, useRef } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Phase = "normal" | "mild" | "severe" | "arrest";

interface PhaseData {
  label: string;
  description: string;
  lungVolume: number;
  autoPeep: string;
  venousReturn: string;
  cardiacOutput: string;
  bp: string;
  flowReturnsToZero: boolean;
  flowTruncation: number;
  alveolarPressure: string;
  clinicalSigns: string[];
  management: string[];
  color: string;
  heartRate: number; // beats per animation cycle
  heartScale: number; // 0-1, how much the heart can expand (preload)
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
    heartRate: 1.2,
    heartScale: 1,
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
    heartRate: 1.6,
    heartScale: 0.75,
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
    heartRate: 2.2,
    heartScale: 0.45,
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
    heartRate: 0.3,
    heartScale: 0.15,
  },
};

const phaseOrder: Phase[] = ["normal", "mild", "severe", "arrest"];

const DynamicHyperinflationDiagram = () => {
  const [selected, setSelected] = useState<Phase>("normal");
  const data = phases[selected];
  const [animT, setAnimT] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    lastRef.current = performance.now();
    const tick = (now: number) => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setAnimT((prev) => (prev + dt) % 100);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Breathing cycle: 3 second period
  const breathCycle = (animT % 3) / 3; // 0-1
  // Inspiration 0-0.3, Expiration 0.3-1
  const inspFrac = breathCycle < 0.3 ? breathCycle / 0.3 : 0;
  const expFrac = breathCycle >= 0.3 ? (breathCycle - 0.3) / 0.7 : 0;
  const isInsp = breathCycle < 0.3;

  // Lung expansion during breathing (sinusoidal)
  const baseVol = data.lungVolume;
  const breathAmplitude = Math.max(5, 20 - (data.lungVolume / 100) * 15);
  const breathOffset = isInsp
    ? Math.sin(inspFrac * Math.PI * 0.5) * breathAmplitude
    : Math.sin((1 - expFrac * data.flowTruncation) * Math.PI * 0.5) * breathAmplitude;
  const currentVol = baseVol + breathOffset;

  // Lung scale factor for SVG
  const lungScale = 0.7 + (currentVol / 100) * 0.35;

  // Heart beat animation
  const heartBeat = Math.sin(animT * data.heartRate * Math.PI * 2);
  const heartPump = Math.max(0, heartBeat) * 0.15 * data.heartScale;

  // Heart compression from lungs
  const heartRx = (14 - (currentVol / 100) * 8) * (1 + heartPump);
  const heartRy = (18 - (currentVol / 100) * 10) * (1 + heartPump * 0.7);
  const heartOpacity = 0.85 - (currentVol / 100) * 0.4;

  // Venous return arrows opacity (less with more hyperinflation)
  const venousArrowOpacity = data.heartScale * 0.7;

  // Flow waveform animated cursor position
  const flowCursorX = 40 + breathCycle * 190;

  return (
    <DiagramFigure
      id="dynamic-hyperinflation-diagram"
      title="Dynamic hyperinflation"
      description="Auto-generated wrapper for the Dynamic hyperinflation anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 mb-8">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Dynamic Hyperinflation & Auto-PEEP</h3>
        <p className="text-xs text-muted-foreground mb-4">Select a phase to see progressive hyperexpansion and cardiovascular compromise</p>
  
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
          {/* Left: Animated Lung & Heart */}
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Animated Lung & Heart</p>
              <div className="relative mx-auto" style={{ width: 220, height: 260 }}>
                <svg viewBox="0 0 220 260" className="w-full h-full">
                  {/* Trachea */}
                  <rect x="102" y="5" width="16" height="35" rx="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.5" />
  
                  {/* Left lung */}
                  <g transform={`translate(110, 140) scale(${-lungScale}, ${lungScale})`} style={{ transformOrigin: '0 0' }}>
                    <path
                      d="M8 -100 Q55 -80 60 -10 Q65 55 30 75 Q15 82 10 70 L10 -100 Z"
                      fill={data.color}
                      opacity={0.12 + (currentVol / 100) * 0.35}
                    />
                    <path
                      d="M8 -100 Q55 -80 60 -10 Q65 55 30 75 Q15 82 10 70 L10 -100 Z"
                      fill="none"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  </g>
  
                  {/* Right lung */}
                  <g transform={`translate(110, 140) scale(${lungScale}, ${lungScale})`} style={{ transformOrigin: '0 0' }}>
                    <path
                      d="M8 -100 Q55 -80 60 -10 Q65 55 30 75 Q15 82 10 70 L10 -100 Z"
                      fill={data.color}
                      opacity={0.12 + (currentVol / 100) * 0.35}
                    />
                    <path
                      d="M8 -100 Q55 -80 60 -10 Q65 55 30 75 Q15 82 10 70 L10 -100 Z"
                      fill="none"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  </g>
  
                  {/* Heart - anatomical shape */}
                  <g transform={`translate(110, 148)`}>
                    {/* Venous return arrows (SVC/IVC) */}
                    <line x1="0" y1={-35} x2="0" y2={-heartRy - 4} stroke="hsl(210, 80%, 55%)" strokeWidth="1.5" opacity={venousArrowOpacity} markerEnd="url(#arrowBlue)" />
                    <line x1="0" y1={35} x2="0" y2={heartRy + 4} stroke="hsl(210, 80%, 55%)" strokeWidth="1.5" opacity={venousArrowOpacity} markerEnd="url(#arrowBlueUp)" />
                    {venousArrowOpacity < 0.4 && (
                      <text x="22" y={-28} className="text-[7px] font-bold" fill="hsl(0, 84%, 60%)">↓ Venous return</text>
                    )}
  
                    {/* Heart shape using a proper heart path */}
                    <path
                      d={`M 0 ${heartRy * 0.9}
                          C ${-heartRx * 0.8} ${heartRy * 0.5}, ${-heartRx * 1.1} ${-heartRy * 0.3}, 0 ${-heartRy * 0.7}
                          C ${heartRx * 1.1} ${-heartRy * 0.3}, ${heartRx * 0.8} ${heartRy * 0.5}, 0 ${heartRy * 0.9} Z`}
                      fill="hsl(0, 65%, 48%)"
                      opacity={heartOpacity}
                      stroke="hsl(0, 50%, 35%)"
                      strokeWidth="1"
                    />
                    {/* Heart chambers indication */}
                    <line x1="0" y1={-heartRy * 0.3} x2="0" y2={heartRy * 0.7} stroke="hsl(0, 50%, 35%)" strokeWidth="0.5" opacity={heartOpacity * 0.5} />
  
                    {/* CO output arrow (aorta) */}
                    <line x1={heartRx * 0.3} y1={-heartRy * 0.6} x2={heartRx * 0.3 + 15} y2={-heartRy * 0.6 - 12} stroke="hsl(0, 70%, 55%)" strokeWidth={1.5 * data.heartScale + 0.5} opacity={0.3 + data.heartScale * 0.5} markerEnd="url(#arrowRed)" />
                  </g>
  
                  {/* Compression arrows when severe */}
                  {selected !== "normal" && (
                    <>
                      <path d={`M ${60} 148 L ${110 - heartRx - 6} 148`} stroke={data.color} strokeWidth="1" opacity="0.5" markerEnd="url(#arrowCompress)" strokeDasharray="3,2" />
                      <path d={`M ${160} 148 L ${110 + heartRx + 6} 148`} stroke={data.color} strokeWidth="1" opacity="0.5" markerEnd="url(#arrowCompress)" strokeDasharray="3,2" />
                    </>
                  )}
  
                  {/* Labels */}
                  <text x="110" y="230" textAnchor="middle" className="fill-foreground text-[9px] font-bold">
                    {Math.round(currentVol)}% TLC
                  </text>
                  <text x="110" y="242" textAnchor="middle" className="fill-muted-foreground text-[7px]">
                    {isInsp ? "← Inspiration" : "→ Expiration"}
                  </text>
  
                  {/* Arrow markers */}
                  <defs>
                    <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6" fill="hsl(210, 80%, 55%)" />
                    </marker>
                    <marker id="arrowBlueUp" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6" fill="hsl(210, 80%, 55%)" />
                    </marker>
                    <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6" fill="hsl(0, 70%, 55%)" />
                    </marker>
                    <marker id="arrowCompress" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6" fill={data.color} />
                    </marker>
                  </defs>
                </svg>
              </div>
              <p className="text-center text-xs text-muted-foreground mt-1">{data.description}</p>
            </div>
  
            {/* Expiratory flow waveform with animated cursor */}
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Expiratory Flow Waveform</p>
              <svg viewBox="0 0 280 100" className="w-full h-auto">
                {/* Axes */}
                <line x1="30" y1="50" x2="270" y2="50" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
                <line x1="30" y1="10" x2="30" y2="90" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
                <text x="5" y="53" className="fill-muted-foreground text-[7px]">0</text>
                <text x="2" y="20" className="fill-muted-foreground text-[7px]">Insp</text>
                <text x="2" y="85" className="fill-muted-foreground text-[7px]">Exp</text>
                <text x="250" y="46" className="fill-muted-foreground text-[7px]">Time</text>
  
                {/* Breath 1 */}
                {renderBreath(40, data.flowTruncation, data.color, data.flowReturnsToZero)}
                {/* Breath 2 */}
                {renderBreath(140, data.flowTruncation, data.color, data.flowReturnsToZero)}
  
                {/* Animated cursor line */}
                <line x1={flowCursorX} y1="8" x2={flowCursorX} y2="92" stroke={data.color} strokeWidth="1" opacity="0.4" strokeDasharray="2,2" />
  
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
  
            {/* Heart status indicator */}
            <div className="rounded-lg border border-border bg-background p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Heart Status</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: withAlpha(data.color, 0.08), borderColor: withAlpha(data.color, 0.25), borderWidth: 1 }}>
                  <span className="text-lg" role="img" aria-label="heart">
                    {selected === "arrest" ? "💔" : "❤️"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-foreground">Preload:</span>
                    <div className="flex-1 h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${data.heartScale * 100}%`,
                          backgroundColor: data.heartScale > 0.5 ? "hsl(0, 65%, 48%)" : data.color,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: data.color }}>{Math.round(data.heartScale * 100)}%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {selected === "normal" && "Normal venous return → adequate preload → good stroke volume"}
                    {selected === "mild" && "Mildly reduced venous return → reduced preload → compensatory tachycardia"}
                    {selected === "severe" && "Severely impaired venous return → critically low preload → hypotension"}
                    {selected === "arrest" && "Venous return obstructed → no preload → no cardiac output → PEA"}
                  </p>
                </div>
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
              <div className="rounded-lg border p-4" style={{ borderColor: withAlpha(data.color, 0.25), backgroundColor: withAlpha(data.color, 0.03) }}>
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
    </DiagramFigure>
  );
};

function renderBreath(startX: number, truncation: number, color: string, returnsToZero: boolean) {
  const inspPeakY = 25;
  const expPeakY = 80;
  const baseY = 50;
  const breathWidth = 80;

  const inspEnd = startX + breathWidth * 0.3;
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
    />
  );
}

export default DynamicHyperinflationDiagram;

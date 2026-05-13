import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

const TranspulmonaryPressureDiagram = () => {
  const [peep, setPeep] = useState(10);
  const [pip, setPip] = useState(25);
  const [pesEndExp, setPesEndExp] = useState(12);
  const [pesEndInsp, setPesEndInsp] = useState(18);
  const [scenario, setScenario] = useState<"normal" | "obese" | "ards">("ards");

  // Presets
  const presets = {
    normal: { peep: 5, pip: 18, pesEndExp: 5, pesEndInsp: 8 },
    obese: { peep: 12, pip: 30, pesEndExp: 18, pesEndInsp: 24 },
    ards: { peep: 14, pip: 28, pesEndExp: 12, pesEndInsp: 20 },
  };

  const applyPreset = (s: typeof scenario) => {
    setScenario(s);
    const p = presets[s];
    setPeep(p.peep); setPip(p.pip); setPesEndExp(p.pesEndExp); setPesEndInsp(p.pesEndInsp);
  };

  // Calculations
  const pplEndExp = pesEndExp; // Pes ≈ Ppl
  const pplEndInsp = pesEndInsp;
  const ptpEndExp = peep - pplEndExp; // transpulmonary at end-expiration
  const ptpEndInsp = pip - pplEndInsp; // transpulmonary at end-inspiration
  const drivingP = pip - peep;
  const transpulmonaryDriving = ptpEndInsp - ptpEndExp;
  const lungStress = ptpEndInsp;
  const cwElastance = (pesEndInsp - pesEndExp) / 0.5; // assume VT ~500ml = 0.5L
  const rsElastance = (pip - peep) / 0.5;
  const lungElastance = rsElastance - cwElastance;
  const elRatio = rsElastance > 0 ? lungElastance / rsElastance : 0;

  // PEEP guidance
  const optimalPeep = pesEndExp + 2; // target PtpEndExp ~ +2
  const peepStatus = ptpEndExp < 0 ? "collapse" : ptpEndExp > 5 ? "overdistension" : "optimal";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Transpulmonary Pressure & Oesophageal Manometry</h3>

      {/* Scenario presets */}
      <div className="flex gap-2">
        {([
          { key: "normal" as const, label: "Normal" },
          { key: "ards" as const, label: "ARDS" },
          { key: "obese" as const, label: "Obese/ARDS" },
        ]).map(s => (
          <button key={s.key} onClick={() => applyPreset(s.key)}
            className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all border ${
              scenario === s.key ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Pressure diagram SVG */}
      <svg viewBox="0 0 400 220" className="w-full">
        {/* Chest wall + lung schematic */}
        {/* Chest wall outer */}
        <path d="M60,30 C60,30 200,15 340,30 L350,180 C350,180 200,195 50,180Z"
          fill="hsl(var(--muted))" opacity={0.1} stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="200" y="28" textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">Chest Wall</text>

        {/* Lung */}
        <ellipse cx="200" cy="110" rx="100" ry="60"
          fill="hsl(210, 70%, 55%)" opacity={0.08} stroke="hsl(210, 70%, 55%)" strokeWidth="1.5" />
        <text x="200" y="100" textAnchor="middle" className="text-[10px] fill-foreground font-medium">Lung</text>

        {/* Pleural space label */}
        <text x="85" y="75" className="text-[8px] fill-muted-foreground">Pleural</text>
        <text x="85" y="85" className="text-[8px] fill-muted-foreground">Space</text>

        {/* Pressure arrows */}
        {/* Airway pressure (Paw) */}
        <line x1="200" y1="50" x2="200" y2="75" stroke="hsl(0, 70%, 55%)" strokeWidth="2" markerEnd="url(#arrDown)" />
        <text x="200" y="45" textAnchor="middle" className="text-[9px] fill-destructive font-semibold">Paw</text>

        {/* Pleural pressure pushing in */}
        <line x1="110" y1="110" x2="135" y2="110" stroke="hsl(35, 80%, 50%)" strokeWidth="2" markerEnd="url(#arrRight)" />
        <text x="90" y="108" textAnchor="middle" className="text-[8px] fill-foreground font-medium">Ppl</text>

        <line x1="290" y1="110" x2="265" y2="110" stroke="hsl(35, 80%, 50%)" strokeWidth="2" markerEnd="url(#arrLeft)" />

        {/* Transpulmonary = Paw - Ppl */}
        <line x1="200" y1="135" x2="200" y2="155" stroke="hsl(142, 60%, 45%)" strokeWidth="2" markerEnd="url(#arrDownG)" />
        <text x="200" y="168" textAnchor="middle" className="text-[10px] font-semibold" fill="hsl(142, 60%, 45%)">
          PTP = Paw − Ppl
        </text>

        {/* Oesophageal balloon */}
        <ellipse cx="330" cy="120" rx="8" ry="20" fill="hsl(35, 80%, 50%)" opacity={0.3} stroke="hsl(35, 80%, 50%)" strokeWidth="1" />
        <line x1="330" y1="100" x2="330" y2="50" stroke="hsl(35, 80%, 50%)" strokeWidth="1.5" />
        <circle cx="330" cy="48" r="4" fill="hsl(35, 80%, 50%)" opacity={0.5} />
        <text x="355" y="90" className="text-[7px] fill-muted-foreground">Oes.</text>
        <text x="355" y="100" className="text-[7px] fill-muted-foreground">balloon</text>
        <text x="355" y="115" className="text-[7px] fill-foreground font-medium">Pes ≈ Ppl</text>

        {/* Pressure values at end-exp */}
        <rect x="10" y="185" width="180" height="30" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="100" y="196" textAnchor="middle" className="text-[8px] fill-muted-foreground">End-Expiration</text>
        <text x="100" y="210" textAnchor="middle" className="text-[9px] fill-foreground font-mono font-semibold">
          PTP = {peep} − {pesEndExp} = {ptpEndExp} cmH₂O
        </text>

        <rect x="210" y="185" width="180" height="30" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="300" y="196" textAnchor="middle" className="text-[8px] fill-muted-foreground">End-Inspiration</text>
        <text x="300" y="210" textAnchor="middle" className="text-[9px] fill-foreground font-mono font-semibold">
          PTP = {pip} − {pesEndInsp} = {ptpEndInsp} cmH₂O
        </text>

        <defs>
          <marker id="arrDown" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L3,6 L6,0" fill="hsl(0, 70%, 55%)" />
          </marker>
          <marker id="arrDownG" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,0 L3,6 L6,0" fill="hsl(142, 60%, 45%)" />
          </marker>
          <marker id="arrRight" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="hsl(35, 80%, 50%)" />
          </marker>
          <marker id="arrLeft" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
            <path d="M6,0 L0,3 L6,6" fill="hsl(35, 80%, 50%)" />
          </marker>
        </defs>
      </svg>

      {/* PEEP optimisation status */}
      <div className={`rounded-lg p-3 border ${
        peepStatus === "collapse" ? "bg-destructive/5 border-destructive/30" :
        peepStatus === "overdistension" ? "bg-yellow-500/5 border-yellow-500/30" :
        "bg-green-500/5 border-green-500/30"
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${
            peepStatus === "collapse" ? "bg-destructive" : peepStatus === "overdistension" ? "bg-yellow-500" : "bg-green-500"
          }`} />
          <span className={`text-sm font-semibold ${
            peepStatus === "collapse" ? "text-destructive" : peepStatus === "overdistension" ? "text-yellow-600" : "text-green-600"
          }`}>
            {peepStatus === "collapse" ? "PTP end-exp < 0 → Atelectasis risk" :
             peepStatus === "overdistension" ? "PTP end-exp > 5 → Overdistension risk" :
             "PTP end-exp 0–5 → Optimal PEEP range"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Suggested PEEP ≈ {optimalPeep} cmH₂O (targeting PTP end-exp ~ +2 cmH₂O)
        </p>
      </div>

      {/* Sliders */}
      <div className="bg-secondary/30 rounded-xl p-3 border border-border space-y-2">
        <p className="text-xs font-semibold text-foreground">Adjust Pressures</p>
        <Slider label="PEEP (set)" value={peep} min={0} max={24} unit="cmH₂O" onChange={setPeep} />
        <Slider label="Plateau / PIP" value={pip} min={10} max={40} unit="cmH₂O" onChange={setPip} />
        <Slider label="Pes end-exp" value={pesEndExp} min={0} max={25} unit="cmH₂O" onChange={setPesEndExp} />
        <Slider label="Pes end-insp" value={pesEndInsp} min={5} max={35} unit="cmH₂O" onChange={setPesEndInsp} />
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "PTP end-exp", value: ptpEndExp, unit: "cmH₂O", warn: ptpEndExp < 0 },
          { label: "PTP end-insp", value: ptpEndInsp, unit: "cmH₂O", warn: ptpEndInsp > 25 },
          { label: "Driving Pressure", value: drivingP, unit: "cmH₂O", warn: drivingP > 15 },
          { label: "Transpulm. Driving", value: transpulmonaryDriving, unit: "cmH₂O", warn: transpulmonaryDriving > 12 },
          { label: "EL/ERS Ratio", value: elRatio, unit: "", warn: false, fmt: true },
          { label: "Lung Stress", value: lungStress, unit: "cmH₂O", warn: lungStress > 25 },
        ].map((m, i) => (
          <div key={i} className="text-center bg-card rounded-lg p-2 border border-border">
            <p className="text-[10px] text-muted-foreground">{m.label}</p>
            <p className={`text-base font-mono font-bold ${m.warn ? "text-destructive" : "text-foreground"}`}>
              {m.fmt ? (m.value as number).toFixed(2) : (m.value as number).toFixed(1)}
            </p>
            {m.unit && <p className="text-[9px] text-muted-foreground">{m.unit}</p>}
          </div>
        ))}
      </div>

      {/* Elastance partitioning bar */}
      <div className="bg-card rounded-xl border border-border p-3">
        <p className="text-xs font-semibold text-foreground mb-2">Elastance Partitioning</p>
        <div className="flex rounded-full overflow-hidden h-5">
          <div className="flex items-center justify-center text-[8px] font-medium text-white"
            style={{ width: `${Math.max(elRatio * 100, 5)}%`, backgroundColor: "hsl(210, 70%, 55%)" }}>
            Lung {(elRatio * 100).toFixed(0)}%
          </div>
          <div className="flex items-center justify-center text-[8px] font-medium text-white"
            style={{ width: `${Math.max((1 - elRatio) * 100, 5)}%`, backgroundColor: "hsl(35, 80%, 50%)" }}>
            CW {((1 - elRatio) * 100).toFixed(0)}%
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          {elRatio > 0.7 ? "Lung-dominant pathology — standard PEEP tables may apply" :
           elRatio < 0.5 ? "High chest wall contribution — airway pressure overestimates lung stress. Higher PEEP often needed." :
           "Mixed contribution — oesophageal manometry valuable for PEEP titration"}
        </p>
      </div>

      {/* Clinical notes */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Clinical Application</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>PTP = Paw − Ppl. Oesophageal pressure (Pes) estimates Ppl</li>
          <li>Target PTP end-exp 0–2 cmH₂O to prevent both collapse and overdistension</li>
          <li>Target PTP end-insp &lt;20–25 cmH₂O to prevent VILI (lung stress)</li>
          <li>Driving pressure &lt;15 cmH₂O associated with improved ARDS survival</li>
          <li>EPVent-2 trial: Pes-guided PEEP did not improve outcomes vs high-PEEP strategy overall</li>
          <li>Greatest utility in obesity, abdominal HTN, and pleural effusions where Ppl is elevated</li>
          <li>EL/ERS ratio helps partition: if chest wall elastance high, airway pressure overstates lung stress</li>
        </ul>
      </div>
    </div>
  );
};

function Slider({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <DiagramFigure
      id="transpulmonary-pressure-diagram"
      title="Transpulmonary pressure"
      description="Auto-generated wrapper for the Transpulmonary pressure anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div>
        <div className="flex justify-between text-xs mb-0.5">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-mono font-semibold text-foreground">{value} {unit}</span>
        </div>
        <input type="range" min={min} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
      </div>
    </DiagramFigure>
  );
}

export { TranspulmonaryPressureDiagram };

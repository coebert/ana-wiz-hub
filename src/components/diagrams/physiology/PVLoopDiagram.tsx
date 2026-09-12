import { useState, useMemo } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface PVPoint { v: number; p: number }

const PHASES = [
  { name: "Filling", color: "hsl(260 50% 55%)", description: "Mitral valve open. Blood flows from LA → LV. Volume increases from ESV to EDV at low pressure. Slope of EDPVR determines ventricular compliance." },
  { name: "Isovolumetric Contraction", color: "hsl(340 60% 50%)", description: "All valves closed. LV pressure rises rapidly at constant volume (EDV). Begins at mitral valve closure (S1). Ends when LV pressure exceeds aortic diastolic pressure." },
  { name: "Ejection", color: "hsl(0 70% 50%)", description: "Aortic valve opens. Stroke volume ejected as LV shortens. Pressure peaks then falls. Volume decreases from EDV to ESV. Area under = stroke work." },
  { name: "Isovolumetric Relaxation", color: "hsl(170 50% 40%)", description: "All valves closed. LV pressure falls rapidly at constant volume (ESV). Begins at aortic valve closure (S2, dicrotic notch). Ends when LV pressure < LA pressure → mitral opens." },
];

function generateLoop(edv: number, esv: number, peakSys: number, aorticDiastolic: number): PVPoint[] {
  const pts: PVPoint[] = [];
  const n = 60;

  // Phase 1: Filling (ESV → EDV, low pressure, exponential EDPVR)
  for (let i = 0; i <= n; i++) {
    const frac = i / n;
    const v = esv + (edv - esv) * frac;
    // Exponential end-diastolic pressure-volume relationship
    const p = 2 + 10 * Math.pow(frac, 2.5);
    pts.push({ v, p });
  }

  // Phase 2: Isovolumetric contraction (constant EDV, pressure rises)
  const edPressure = 2 + 10;
  for (let i = 1; i <= n; i++) {
    const frac = i / n;
    const p = edPressure + (aorticDiastolic - edPressure) * Math.pow(frac, 0.8);
    pts.push({ v: edv, p });
  }

  // Phase 3: Ejection (EDV → ESV, pressure rises then falls)
  for (let i = 1; i <= n; i++) {
    const frac = i / n;
    const v = edv - (edv - esv) * frac;
    // Pressure: rises to peak then falls, following ESPVR slope down
    const pRise = Math.sin(frac * Math.PI) * (peakSys - aorticDiastolic) * 0.4;
    const pBase = aorticDiastolic + (peakSys - aorticDiastolic) * (1 - frac * 0.6);
    const p = pBase + pRise * (1 - frac);
    pts.push({ v, p });
  }

  // Phase 4: Isovolumetric relaxation (constant ESV, pressure drops)
  const esPressure = pts[pts.length - 1].p;
  for (let i = 1; i <= n; i++) {
    const frac = i / n;
    const p = esPressure * (1 - Math.pow(frac, 0.7));
    pts.push({ v: esv, p });
  }

  return pts;
}

function generateESPVR(contractility: number): PVPoint[] {
  // End-systolic pressure-volume relationship (linear, slope = Ees)
  const ees = 2.5 * contractility; // Ees slope
  return [{ v: 0, p: 0 }, { v: 160, p: 160 * ees }];
}

function generateEDPVR(): PVPoint[] {
  const pts: PVPoint[] = [];
  for (let v = 0; v <= 180; v += 5) {
    const p = 2 + 0.0003 * Math.pow(v, 2.2);
    pts.push({ v, p });
  }
  return pts;
}

const PVLoopDiagram = () => {
  const [preload, setPreload] = useState(50);    // 0-100 → EDV 90-160
  const [afterload, setAfterload] = useState(50); // 0-100 → aortic diastolic 60-110
  const [contractility, setContractility] = useState(50); // 0-100 → Ees multiplier
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [showReference, setShowReference] = useState(true);

  const edv = 90 + (preload / 100) * 70;         // 90-160 ml
  const aorticDiastolic = 60 + (afterload / 100) * 50; // 60-110 mmHg
  const contractMult = 0.6 + (contractility / 100) * 0.8; // 0.6-1.4
  const peakSys = aorticDiastolic + 40 * contractMult;
  const esv = Math.max(20, edv - (edv * 0.35 + 20) * contractMult);
  const sv = Math.round(edv - esv);
  const ef = Math.round((sv / edv) * 100);

  const loop = useMemo(() => generateLoop(edv, esv, peakSys, aorticDiastolic), [edv, esv, peakSys, aorticDiastolic]);
  const refLoop = useMemo(() => generateLoop(120, 50, 120, 80), []);
  const espvr = useMemo(() => generateESPVR(contractMult), [contractMult]);
  const edpvr = useMemo(() => generateEDPVR(), []);

  // SVG coordinate mapping
  const svgW = 420, svgH = 340;
  const padL = 50, padB = 35, padR = 15, padT = 15;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const vMin = 0, vMax = 180, pMin = 0, pMax = 160;

  const toX = (v: number) => padL + ((v - vMin) / (vMax - vMin)) * plotW;
  const toY = (p: number) => padT + plotH - ((p - pMin) / (pMax - pMin)) * plotH;

  const toPath = (pts: PVPoint[]) =>
    pts.map((pt, i) => `${i === 0 ? "M" : "L"} ${toX(pt.v).toFixed(1)} ${toY(pt.p).toFixed(1)}`).join(" ");

  // Split loop into phase segments for coloring
  const n = 60;
  const phaseRanges = [
    { start: 0, end: n + 1 },           // filling
    { start: n, end: 2 * n + 1 },       // iso contraction
    { start: 2 * n, end: 3 * n + 1 },   // ejection
    { start: 3 * n, end: 4 * n + 1 },   // iso relaxation
  ];

  return (
    <DiagramFigure
      id="pv-loop-diagram"
      title="PV loop"
      description="Interactive left-ventricular pressure-volume loop showing valve events, stroke volume, stroke work, ESPVR and the effects of preload, afterload and contractility."
    >
              <div className="space-y-4">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
          {/* Grid */}
          {[0, 40, 80, 120, 160].map(p => (
            <g key={`pg-${p}`}>
              <line x1={padL} y1={toY(p)} x2={svgW - padR} y2={toY(p)} stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x={padL - 6} y={toY(p) + 3} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">{p}</text>
            </g>
          ))}
          {[0, 40, 80, 120, 160].map(v => (
            <g key={`vg-${v}`}>
              <line x1={toX(v)} y1={padT} x2={toX(v)} y2={svgH - padB} stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x={toX(v)} y={svgH - padB + 12} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">{v}</text>
            </g>
          ))}
          <text x={10} y={padT + plotH / 2} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600"
            transform={`rotate(-90, 10, ${padT + plotH / 2})`}>LV Pressure (mmHg)</text>
          <text x={padL + plotW / 2} y={svgH - 3} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600">LV Volume (ml)</text>
  
          {/* ESPVR line */}
          <line x1={toX(espvr[0].v)} y1={toY(espvr[0].p)} x2={toX(espvr[1].v)} y2={toY(espvr[1].p)}
            stroke="hsl(0 65% 50%)" strokeWidth="1" strokeDasharray="6 3" opacity="0.4" />
          <text x={toX(100)} y={toY(100 * 2.5 * contractMult) - 6} fontSize="7" fill="hsl(0 65% 50%)" opacity="0.6">ESPVR</text>
  
          {/* EDPVR curve */}
          <path d={toPath(edpvr)} fill="none" stroke="hsl(210 60% 50%)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
          <text x={toX(155)} y={toY(edpvr[edpvr.length - 3]?.p ?? 20) + 4} fontSize="7" fill="hsl(210 60% 50%)" opacity="0.6">EDPVR</text>
  
          {/* Reference loop */}
          {showReference && (
            <path d={toPath(refLoop) + " Z"} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
          )}
  
          {/* Main PV loop — each phase colored */}
          {phaseRanges.map((range, i) => {
            const phasePts = loop.slice(range.start, range.end);
            return (
              <path key={i} d={toPath(phasePts)} fill="none"
                stroke={PHASES[i].color}
                strokeWidth={activePhase === i ? 4 : 2.5}
                opacity={activePhase === null || activePhase === i ? 1 : 0.3}
                className="cursor-pointer transition-all"
                onClick={() => setActivePhase(activePhase === i ? null : i)} />
            );
          })}
  
          {/* Direction arrows on loop */}
          {phaseRanges.map((range, i) => {
            const mid = Math.floor((range.start + range.end) / 2);
            const p1 = loop[mid - 1], p2 = loop[mid + 1];
            if (!p1 || !p2) return null;
            const angle = Math.atan2(toY(p2.p) - toY(p1.p), toX(p2.v) - toX(p1.v)) * (180 / Math.PI);
            return (
                  <polygon key={`arr-${i}`}
                points="-4,-3 4,0 -4,3"
                fill={PHASES[i].color}
                opacity={activePhase === null || activePhase === i ? 0.8 : 0.2}
                transform={`translate(${toX(loop[mid].v)}, ${toY(loop[mid].p)}) rotate(${angle})`} />
    );
          })}
  
          {/* Corner labels */}
          <circle cx={toX(edv)} cy={toY(loop[0].p)} r="3" fill="hsl(260 50% 55%)" />
          <text x={toX(edv) + 5} y={toY(loop[0].p) + 3} fontSize="7" fill="hsl(var(--foreground))" fontWeight="600">EDV</text>
          <circle cx={toX(esv)} cy={toY(loop[3 * n]?.p ?? 0)} r="3" fill="hsl(170 50% 40%)" />
          <text x={toX(esv) - 5} y={toY(loop[3 * n]?.p ?? 0) + 3} fontSize="7" fill="hsl(var(--foreground))" fontWeight="600" textAnchor="end">ESV</text>
  
          {/* Stroke volume bracket */}
          <line x1={toX(esv)} y1={svgH - padB - 3} x2={toX(edv)} y2={svgH - padB - 3} stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
          <text x={toX((esv + edv) / 2)} y={svgH - padB - 7} fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" opacity="0.6">SV = {sv} ml</text>
        </svg>
  
        {/* Hemodynamic values */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "EDV", value: `${Math.round(edv)} ml`, color: "text-blue-500" },
            { label: "ESV", value: `${Math.round(esv)} ml`, color: "text-emerald-500" },
            { label: "EF", value: `${ef}%`, color: ef < 40 ? "text-red-500" : "text-foreground" },
          ].map(item => (
            <div key={item.label} className="rounded-lg border border-border p-2">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
  
        {/* Phase info */}
        {activePhase !== null && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PHASES[activePhase].color }} />
              <p className="text-sm font-semibold text-foreground">{PHASES[activePhase].name}</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{PHASES[activePhase].description}</p>
          </div>
        )}
        {activePhase === null && (
          <p className="text-xs text-muted-foreground text-center">Click a phase on the loop to learn about it</p>
        )}
  
        {/* Sliders */}
        <div className="space-y-3 pt-2">
          {[
            { label: "Preload (EDV)", value: preload, set: setPreload, color: "accent-blue-500", hint: "↑ Preload shifts loop right (Frank-Starling)" },
            { label: "Afterload", value: afterload, set: setAfterload, color: "accent-red-500", hint: "↑ Afterload raises peak pressure, ↓ SV" },
            { label: "Contractility", value: contractility, set: setContractility, color: "accent-emerald-500", hint: "↑ Contractility steepens ESPVR, ↑ EF" },
          ].map(s => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-foreground">{s.label}</label>
                <span className="text-xs text-muted-foreground">{s.value}%</span>
              </div>
              <input type="range" min={0} max={100} value={s.value}
                onChange={e => s.set(Number(e.target.value))}
                className={`w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer ${s.color}`} />
              <p className="text-[10px] text-muted-foreground mt-0.5">{s.hint}</p>
            </div>
          ))}
        </div>
  
        {/* Toggle */}
        <div className="flex justify-center gap-2">
          <button onClick={() => setShowReference(!showReference)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
              showReference ? "bg-primary/10 border-primary/40 text-primary" : "border-border text-muted-foreground"
            }`}>
            {showReference ? "Reference ✓" : "Reference"}
          </button>
          <button onClick={() => { setPreload(50); setAfterload(50); setContractility(50); }}
            className="px-3 py-1 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-secondary transition-all">
            Reset
          </button>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PVLoopDiagram;

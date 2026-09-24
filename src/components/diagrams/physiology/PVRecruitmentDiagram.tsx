import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Severity = "normal" | "mild" | "severe";

interface LungProfile {
  label: string;
  lip: number; // lower inflection point (cmH₂O)
  uip: number; // upper inflection point
  maxVol: number; // ml at TLC
  hysteresis: number; // shift factor
  color: string;
  description: string;
}

const profiles: Record<Severity, LungProfile> = {
  normal: { label: "Normal", lip: 2, uip: 35, maxVol: 800, hysteresis: 0.12, color: "hsl(142, 60%, 45%)", description: "Normal sigmoid PV curve. Minimal hysteresis. LIP barely discernible — compliance relatively linear over tidal range." },
  mild: { label: "Mild ARDS", lip: 8, uip: 28, maxVol: 600, hysteresis: 0.22, color: "hsl(35, 80%, 50%)", description: "Right-shifted curve with clear LIP. Reduced baby lung volume. Moderate hysteresis — significant recruitment potential between inflation and deflation limbs." },
  severe: { label: "Severe ARDS", lip: 14, uip: 24, maxVol: 400, hysteresis: 0.35, color: "hsl(0, 70%, 55%)", description: "Markedly right-shifted, flattened curve. High LIP, low UIP — narrow safe window. Large hysteresis reflects extensive recruitable lung and derecruitment on deflation." },
};

// Sigmoid PV curve generator
function pvCurve(p: number, lip: number, uip: number, maxVol: number, deflation: boolean, hysteresis: number): number {
  const shift = deflation ? -lip * hysteresis * 3 : 0;
  const adjP = p - shift;
  const mid = (lip + uip) / 2;
  const k = 0.25;
  const val = maxVol / (1 + Math.exp(-k * (adjP - mid)));
  return Math.max(val, 0);
}

const PVRecruitmentDiagram = () => {
  const [severity, setSeverity] = useState<Severity>("mild");
  const [peepSelected, setPeepSelected] = useState<number | null>(null);
  const [showHysteresis, setShowHysteresis] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);

  const prof = profiles[severity];

  // Chart dimensions
  const W = 390, H = 260, PL = 50, PR = 15, PT = 15, PB = 30;
  const plotW = W - PL - PR;
  const plotH = H - PT - PB;
  const pMax = 45;
  const vMax = 900;

  const toX = (p: number) => PL + (p / pMax) * plotW;
  const toY = (v: number) => PT + plotH - (v / vMax) * plotH;

  // Generate curves
  const inflationPts: { x: number; y: number; p: number; v: number }[] = [];
  const deflationPts: { x: number; y: number; p: number; v: number }[] = [];
  for (let p = 0; p <= pMax; p += 0.5) {
    const vi = pvCurve(p, prof.lip, prof.uip, prof.maxVol, false, prof.hysteresis);
    const vd = pvCurve(p, prof.lip, prof.uip, prof.maxVol, true, prof.hysteresis);
    inflationPts.push({ x: toX(p), y: toY(vi), p, v: vi });
    deflationPts.push({ x: toX(p), y: toY(vd), p, v: vd });
  }

  const inflationPath = inflationPts.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(" ");
  const deflationPath = deflationPts.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(" ");

  // Hysteresis fill
  const hysteresisPath = inflationPath + " " + deflationPts.slice().reverse().map((pt, _i) => `L ${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(" ") + " Z";

  // Optimal PEEP zone
  const optPeepLow = prof.lip + 2;
  const optPeepHigh = prof.lip + 6;

  // PEEP line volume
  const peepP = peepSelected ?? optPeepLow;
  const volAtPeep = pvCurve(peepP, prof.lip, prof.uip, prof.maxVol, false, prof.hysteresis);

  return (
    <DiagramFigure
      id="pv-recruitment-diagram"
      title="PV recruitment"
      description="PV recruitment: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
              <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">PV Recruitment Curve & Hysteresis</h3>
  
        {/* Severity selector */}
        <div className="flex gap-2">
          {(Object.keys(profiles) as Severity[]).map(s => (
            <button key={s} onClick={() => { setSeverity(s); setPeepSelected(null); }}
              className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all border ${
                severity === s ? "border-border shadow-sm text-foreground" : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
              style={severity === s ? { backgroundColor: withAlpha(profiles[s].color, 0.09) } : {}}>
              {profiles[s].label}
            </button>
          ))}
        </div>
  
        {/* Toggles */}
        <div className="flex gap-2">
          <button onClick={() => setShowHysteresis(!showHysteresis)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              showHysteresis ? "bg-accent text-accent-foreground border-border" : "border-transparent bg-secondary/50 text-muted-foreground"
            }`}>
            Hysteresis
          </button>
          <button onClick={() => setShowAnnotations(!showAnnotations)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              showAnnotations ? "bg-accent text-accent-foreground border-border" : "border-transparent bg-secondary/50 text-muted-foreground"
            }`}>
            Annotations
          </button>
        </div>
  
        {/* PV Curve SVG */}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* Background */}
          <rect x={PL} y={PT} width={plotW} height={plotH} fill="hsl(var(--muted))" opacity={0.06} />
  
          {/* Optimal PEEP zone */}
          {showAnnotations && (
            <rect x={toX(optPeepLow)} y={PT} width={toX(optPeepHigh) - toX(optPeepLow)} height={plotH}
              fill="hsl(142, 60%, 45%)" opacity={0.08} />
          )}
  
          {/* Overdistension zone */}
          {showAnnotations && (
            <rect x={toX(prof.uip)} y={PT} width={toX(pMax) - toX(prof.uip)} height={plotH}
              fill="hsl(0, 70%, 55%)" opacity={0.06} />
          )}
  
          {/* Grid lines */}
          {[0, 10, 20, 30, 40].map(p => (
            <g key={p}>
              <line x1={toX(p)} y1={PT} x2={toX(p)} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x={toX(p)} y={PT + plotH + 13} textAnchor="middle" className="text-[7px] fill-muted-foreground">{p}</text>
            </g>
          ))}
          {[0, 200, 400, 600, 800].map(v => (
            <g key={v}>
              <line x1={PL} y1={toY(v)} x2={PL + plotW} y2={toY(v)} stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x={PL - 4} y={toY(v) + 3} textAnchor="end" className="text-[7px] fill-muted-foreground">{v}</text>
            </g>
          ))}
  
          {/* Axes */}
          <line x1={PL} y1={PT + plotH} x2={PL + plotW} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1.5" />
          <line x1={PL} y1={PT} x2={PL} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1.5" />
          <text x={W / 2} y={H - 2} textAnchor="middle" className="text-[9px] fill-muted-foreground">Pressure (cmH₂O)</text>
          <text x="8" y={PT + plotH / 2} textAnchor="middle" className="text-[9px] fill-muted-foreground" transform={`rotate(-90,8,${PT + plotH / 2})`}>Volume (ml)</text>
  
          {/* Hysteresis fill */}
          {showHysteresis && (
            <path d={hysteresisPath} fill={prof.color} opacity={0.1} />
          )}
  
          {/* Inflation curve */}
          <path d={inflationPath} fill="none" stroke={prof.color} strokeWidth="2" />
  
          {/* Deflation curve */}
          {showHysteresis && (
            <path d={deflationPath} fill="none" stroke={prof.color} strokeWidth="2" strokeDasharray="6,3" opacity={0.7} />
          )}
  
          {/* LIP marker */}
          {showAnnotations && (
            <g>
              <circle cx={toX(prof.lip)} cy={toY(pvCurve(prof.lip, prof.lip, prof.uip, prof.maxVol, false, prof.hysteresis))}
                r="5" fill="hsl(35, 80%, 50%)" stroke="hsl(var(--background))" strokeWidth="1.5" />
              <text x={toX(prof.lip) + 8} y={toY(pvCurve(prof.lip, prof.lip, prof.uip, prof.maxVol, false, prof.hysteresis)) - 5}
                className="text-[8px] fill-foreground font-semibold">LIP ({prof.lip})</text>
            </g>
          )}
  
          {/* UIP marker */}
          {showAnnotations && (
            <g>
              <circle cx={toX(prof.uip)} cy={toY(pvCurve(prof.uip, prof.lip, prof.uip, prof.maxVol, false, prof.hysteresis))}
                r="5" fill="hsl(0, 70%, 55%)" stroke="hsl(var(--background))" strokeWidth="1.5" />
              <text x={toX(prof.uip) - 8} y={toY(pvCurve(prof.uip, prof.lip, prof.uip, prof.maxVol, false, prof.hysteresis)) - 5}
                textAnchor="end" className="text-[8px] fill-foreground font-semibold">UIP ({prof.uip})</text>
            </g>
          )}
  
          {/* PEEP selection line */}
          {peepSelected !== null && (
            <g>
              <line x1={toX(peepSelected)} y1={PT} x2={toX(peepSelected)} y2={PT + plotH}
                stroke="hsl(210, 70%, 55%)" strokeWidth="1.5" strokeDasharray="4,3" />
              <circle cx={toX(peepSelected)} cy={toY(volAtPeep)} r="5" fill="hsl(210, 70%, 55%)" stroke="hsl(var(--background))" strokeWidth="1.5" />
              <text x={toX(peepSelected) + 3} y={toY(volAtPeep) + 15} className="text-[8px] fill-foreground font-mono font-semibold">
                PEEP {peepSelected}
              </text>
            </g>
          )}
  
          {/* Zone labels */}
          {showAnnotations && (
            <>
              <text x={toX((optPeepLow + optPeepHigh) / 2)} y={PT + 12} textAnchor="middle" className="text-[7px] font-medium" fill="hsl(142, 60%, 45%)">Optimal PEEP</text>
              <text x={toX(prof.uip + (pMax - prof.uip) / 2)} y={PT + 12} textAnchor="middle" className="text-[7px] font-medium" fill="hsl(0, 70%, 55%)">Overdistension</text>
            </>
          )}
  
          {/* Legend */}
          <line x1={PL + 10} y1={PT + plotH - 20} x2={PL + 30} y2={PT + plotH - 20} stroke={prof.color} strokeWidth="2" />
          <text x={PL + 34} y={PT + plotH - 17} className="text-[7px] fill-muted-foreground">Inflation</text>
          {showHysteresis && (
            <>
              <line x1={PL + 10} y1={PT + plotH - 10} x2={PL + 30} y2={PT + plotH - 10} stroke={prof.color} strokeWidth="2" strokeDasharray="4,2" opacity={0.7} />
              <text x={PL + 34} y={PT + plotH - 7} className="text-[7px] fill-muted-foreground">Deflation</text>
            </>
          )}
        </svg>
  
        {/* PEEP selector */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Select PEEP</span>
            <span className="font-mono font-semibold text-foreground">{peepSelected ?? "—"} cmH₂O</span>
          </div>
          <input type="range" min={0} max={30} value={peepSelected ?? optPeepLow}
            onChange={e => setPeepSelected(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
            <span>0</span>
            <span className="text-green-500 font-medium">Optimal: {optPeepLow}–{optPeepHigh}</span>
            <span>30</span>
          </div>
        </div>
  
        {/* PEEP assessment */}
        {peepSelected !== null && (() => {
          const status = peepSelected < prof.lip ? "below" : peepSelected > prof.uip ? "above" : peepSelected <= optPeepHigh ? "optimal" : "high";
          return (
                <div className={`rounded-lg p-3 border ${
              status === "below" ? "bg-destructive/5 border-destructive/30" :
              status === "above" ? "bg-destructive/5 border-destructive/30" :
              status === "high" ? "bg-yellow-500/5 border-yellow-500/30" :
              "bg-green-500/5 border-green-500/30"
            }`}>
              <p className={`text-xs font-semibold ${
                status === "optimal" ? "text-green-600" : status === "high" ? "text-yellow-600" : "text-destructive"
              }`}>
                {status === "below" && `PEEP ${peepSelected} < LIP (${prof.lip}): Below inflection — cyclic recruitment/derecruitment → atelectrauma`}
                {status === "optimal" && `PEEP ${peepSelected}: Above LIP, within optimal zone — alveoli recruited, minimal overdistension`}
                {status === "high" && `PEEP ${peepSelected}: Above optimal zone — approaching UIP, monitor for overdistension`}
                {status === "above" && `PEEP ${peepSelected} > UIP (${prof.uip}): Overdistension — flat part of curve, minimal recruitment, ↑ dead space`}
              </p>
            </div>
    );
        })()}
  
        {/* Severity description */}
        <div className="bg-secondary/30 rounded-lg p-3 border border-border" style={{ borderLeftColor: prof.color, borderLeftWidth: 3 }}>
          <p className="text-sm font-semibold text-foreground">{prof.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{prof.description}</p>
          <div className="flex gap-4 mt-2 text-xs">
            <span className="text-muted-foreground">LIP: <span className="font-mono font-semibold text-foreground">{prof.lip}</span></span>
            <span className="text-muted-foreground">UIP: <span className="font-mono font-semibold text-foreground">{prof.uip}</span></span>
            <span className="text-muted-foreground">Max Vol: <span className="font-mono font-semibold text-foreground">{prof.maxVol} ml</span></span>
          </div>
        </div>
  
        {/* Clinical notes */}
        <div className="bg-secondary/30 rounded-lg p-3 border border-border">
          <p className="text-xs font-medium text-foreground">Clinical Application</p>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
            <li><strong>LIP</strong>: pressure at which recruitment begins — set PEEP 2–3 cmH₂O above</li>
            <li><strong>UIP</strong>: pressure above which overdistension occurs — keep plateau below</li>
            <li><strong>Hysteresis</strong>: deflation limb lies above inflation — recruited lung stays open at lower pressures</li>
            <li>Recruitment manoeuvre: inflate to 40 cmH₂O then set PEEP on deflation limb</li>
            <li>Modern approach: driving pressure-guided or decremental PEEP titration preferred over static PV curve</li>
            <li>In ARDS, baby lung concept means safe tidal range (LIP→UIP) narrows with severity</li>
          </ul>
        </div>
      </div>
    </DiagramFigure>
  );
};

export { PVRecruitmentDiagram };

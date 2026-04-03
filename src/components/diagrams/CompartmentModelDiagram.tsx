import { useState, useEffect } from "react";

export const CompartmentModelDiagram = () => {
  const [animFrame, setAnimFrame] = useState(0);
  const [modelType, setModelType] = useState<1 | 2 | 3>(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimFrame((f) => f + 1);
    }, 33);
    return () => clearInterval(interval);
  }, []);

  const t = animFrame / 30; // seconds elapsed

  // Concentration decay curves
  const oneComp = Math.exp(-0.3 * t) * 100;
  const twoCompAlpha = 60 * Math.exp(-0.8 * t);
  const twoCompBeta = 40 * Math.exp(-0.1 * t);
  const twoComp = twoCompAlpha + twoCompBeta;

  const width = 500;
  const height = 300;
  const pad = { top: 30, right: 30, bottom: 50, left: 60 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const maxT = 20;

  const generateDecayCurve = (fn: (t: number) => number): string => {
    const points: string[] = [];
    const steps = Math.min(Math.floor(animFrame / 2), 200);
    for (let i = 0; i <= steps; i++) {
      const time = (i / 200) * maxT;
      const conc = Math.max(fn(time), 0);
      const x = pad.left + (time / maxT) * plotW;
      const y = pad.top + plotH - (conc / 100) * plotH;
      points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
    }
    return points.join(" ");
  };

  const oneCompPath = generateDecayCurve((t) => Math.exp(-0.3 * t) * 100);
  const twoCompPath = generateDecayCurve((t) => 60 * Math.exp(-0.8 * t) + 40 * Math.exp(-0.1 * t));

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Compartment boxes */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="flex flex-col items-center gap-1">
          <div className="w-20 h-16 rounded-lg border-2 border-pharmacology bg-pharmacology-light flex items-center justify-center">
            <span className="text-xs font-semibold text-pharmacology">V₁</span>
          </div>
          <span className="text-xs text-muted-foreground">Central</span>
        </div>
        {modelType >= 2 && (
          <>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">k₁₂ →</span>
              <div className="w-8 h-0.5 bg-pharmacology" />
              <span className="text-xs text-muted-foreground mt-1">← k₂₁</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-20 h-16 rounded-lg border-2 border-pharmacology/50 bg-pharmacology-light/50 flex items-center justify-center">
                <span className="text-xs font-semibold text-pharmacology/70">V₂</span>
              </div>
              <span className="text-xs text-muted-foreground">Peripheral</span>
            </div>
          </>
        )}
        <div className="flex flex-col items-center ml-2">
          <span className="text-xs text-muted-foreground">↓ k₁₀</span>
          <span className="text-xs text-muted-foreground">Elimination</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Grid */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = pad.top + plotH - (v / 100) * plotH;
          return (
            <g key={v}>
              <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="hsl(210 20% 90%)" />
              <text x={pad.left - 8} y={y + 4} textAnchor="end" fontSize="10" className="fill-muted-foreground">{v}</text>
            </g>
          );
        })}
        <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="2" />
        <line x1={pad.left} y1={pad.top + plotH} x2={width - pad.right} y2={pad.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="2" />

        <text x={width / 2} y={height - 5} textAnchor="middle" fontSize="12" className="fill-foreground font-medium">Time</text>
        <text x={14} y={height / 2} textAnchor="middle" transform={`rotate(-90, 14, ${height / 2})`} fontSize="12" className="fill-foreground font-medium">
          Plasma [C]
        </text>

        {/* Curves */}
        {modelType === 1 && (
          <path d={oneCompPath} fill="none" stroke="hsl(170 50% 40%)" strokeWidth="3" strokeLinecap="round" />
        )}
        {modelType >= 2 && (
          <path d={twoCompPath} fill="none" stroke="hsl(170 50% 40%)" strokeWidth="3" strokeLinecap="round" />
        )}
      </svg>

      <div className="flex gap-2 justify-center mt-4">
        <button
          onClick={() => { setModelType(1); setAnimFrame(0); }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            modelType === 1 ? "bg-pharmacology/10 border-pharmacology text-pharmacology" : "border-border text-muted-foreground"
          }`}
        >1-Compartment</button>
        <button
          onClick={() => { setModelType(2); setAnimFrame(0); }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            modelType === 2 ? "bg-pharmacology/10 border-pharmacology text-pharmacology" : "border-border text-muted-foreground"
          }`}
        >2-Compartment</button>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";

interface CurveProps {
  showShifts?: boolean;
}

// Sigmoid function approximating ODC: Hill equation
const hillEquation = (pO2: number, p50: number = 26.7, n: number = 2.7): number => {
  return (Math.pow(pO2, n) / (Math.pow(p50, n) + Math.pow(pO2, n))) * 100;
};

export const OxygenDissociationCurve = ({ showShifts = false }: CurveProps) => {
  const [progress, setProgress] = useState(0);
  const [activeShift, setActiveShift] = useState<"none" | "left" | "right">("none");

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame += 1;
      setProgress(Math.min(frame / 60, 1));
      if (frame >= 60) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const width = 500;
  const height = 350;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const generatePath = (p50: number, animProgress: number): string => {
    const points: string[] = [];
    const maxPoints = Math.floor(100 * animProgress);
    for (let i = 0; i <= maxPoints; i++) {
      const pO2 = (i / 100) * 100;
      const sO2 = hillEquation(pO2, p50);
      const x = padding.left + (pO2 / 100) * plotW;
      const y = padding.top + plotH - (sO2 / 100) * plotH;
      points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
    }
    return points.join(" ");
  };

  const normalPath = generatePath(26.7, progress);
  const leftPath = generatePath(20, progress);
  const rightPath = generatePath(35, progress);

  const gridLines = [0, 25, 50, 75, 100];

  return (
    <div className="w-full max-w-lg mx-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        {/* Grid */}
        {gridLines.map((v) => {
          const y = padding.top + plotH - (v / 100) * plotH;
          return (
            <g key={`h-${v}`}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="hsl(210 20% 90%)" strokeWidth="1" />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" className="text-xs fill-muted-foreground" fontSize="11">{v}</text>
            </g>
          );
        })}
        {gridLines.map((v) => {
          const x = padding.left + (v / 100) * plotW;
          return (
            <g key={`v-${v}`}>
              <line x1={x} y1={padding.top} x2={x} y2={padding.top + plotH} stroke="hsl(210 20% 90%)" strokeWidth="1" />
              <text x={x} y={height - 10} textAnchor="middle" className="text-xs fill-muted-foreground" fontSize="11">{v}</text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="2" />
        <line x1={padding.left} y1={padding.top + plotH} x2={width - padding.right} y2={padding.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="2" />

        {/* Axis labels */}
        <text x={width / 2} y={height - 2} textAnchor="middle" className="fill-foreground font-medium" fontSize="12">PaO₂ (mmHg)</text>
        <text x={16} y={height / 2} textAnchor="middle" transform={`rotate(-90, 16, ${height / 2})`} className="fill-foreground font-medium" fontSize="12">SaO₂ (%)</text>

        {/* Shifted curves */}
        {showShifts && (
          <>
            <path
              d={leftPath}
              fill="none"
              stroke="hsl(210 70% 55%)"
              strokeWidth="2"
              strokeDasharray="6 3"
              opacity={activeShift === "left" ? 1 : 0.3}
              className="transition-opacity duration-300"
            />
            <path
              d={rightPath}
              fill="none"
              stroke="hsl(0 70% 55%)"
              strokeWidth="2"
              strokeDasharray="6 3"
              opacity={activeShift === "right" ? 1 : 0.3}
              className="transition-opacity duration-300"
            />
          </>
        )}

        {/* Normal curve */}
        <path
          d={normalPath}
          fill="none"
          stroke="hsl(170 50% 40%)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* P50 marker */}
        {progress >= 0.5 && (
          <g opacity={Math.min((progress - 0.5) * 4, 1)}>
            <line
              x1={padding.left + (26.7 / 100) * plotW}
              y1={padding.top + plotH - (50 / 100) * plotH}
              x2={padding.left + (26.7 / 100) * plotW}
              y2={padding.top + plotH}
              stroke="hsl(170 50% 40%)"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <line
              x1={padding.left}
              y1={padding.top + plotH - (50 / 100) * plotH}
              x2={padding.left + (26.7 / 100) * plotW}
              y2={padding.top + plotH - (50 / 100) * plotH}
              stroke="hsl(170 50% 40%)"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <circle
              cx={padding.left + (26.7 / 100) * plotW}
              cy={padding.top + plotH - (50 / 100) * plotH}
              r="4"
              fill="hsl(170 50% 40%)"
            />
            <text
              x={padding.left + (26.7 / 100) * plotW + 8}
              y={padding.top + plotH - (50 / 100) * plotH - 8}
              className="fill-foreground font-medium"
              fontSize="11"
            >P₅₀ = 26.7 mmHg</text>
          </g>
        )}
      </svg>

      {showShifts && (
        <div className="flex gap-2 justify-center mt-4">
          <button
            onClick={() => setActiveShift(activeShift === "left" ? "none" : "left")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              activeShift === "left"
                ? "bg-primary/10 border-primary text-primary"
                : "border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            ← Left Shift
          </button>
          <button
            onClick={() => setActiveShift(activeShift === "right" ? "none" : "right")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              activeShift === "right"
                ? "bg-destructive/10 border-destructive text-destructive"
                : "border-border text-muted-foreground hover:border-destructive/50"
            }`}
          >
            Right Shift →
          </button>
        </div>
      )}
    </div>
  );
};

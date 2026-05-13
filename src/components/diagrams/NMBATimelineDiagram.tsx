import { useState, useEffect, useRef } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

const agents = [
  { name: "Suxamethonium", type: "depol", onset: 0.5, duration: 8, color: "hsl(0, 70%, 55%)", intubation: 1 },
  { name: "Rocuronium 0.6", type: "ndmr", onset: 1.25, duration: 35, color: "hsl(220, 70%, 55%)", intubation: 1.5 },
  { name: "Rocuronium 1.2", type: "ndmr", onset: 0.75, duration: 50, color: "hsl(220, 55%, 45%)", intubation: 1 },
  { name: "Vecuronium", type: "ndmr", onset: 2.5, duration: 30, color: "hsl(260, 60%, 55%)", intubation: 3 },
  { name: "Atracurium", type: "ndmr", onset: 2.5, duration: 30, color: "hsl(160, 60%, 40%)", intubation: 3 },
  { name: "Cisatracurium", type: "ndmr", onset: 4, duration: 40, color: "hsl(180, 55%, 40%)", intubation: 5 },
  { name: "Pancuronium", type: "ndmr", onset: 4, duration: 75, color: "hsl(30, 70%, 50%)", intubation: 4.5 },
  { name: "Mivacurium", type: "ndmr", onset: 2.5, duration: 15, color: "hsl(300, 50%, 50%)", intubation: 3 },
];

const TOTAL_MIN = 90;
const CHART_X = 140;
const CHART_W = 540;
const ROW_H = 36;
const TOP_PAD = 50;

const NMBATimelineDiagram = () => {
  const [playing, setPlaying] = useState(false);
  const [cursorMin, setCursorMin] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    startRef.current = performance.now() - (cursorMin / TOTAL_MIN) * 15000;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const t = (elapsed / 15000) * TOTAL_MIN;
      if (t >= TOTAL_MIN) {
        setCursorMin(TOTAL_MIN);
        setPlaying(false);
        return;
      }
      setCursorMin(t);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const minToX = (m: number) => CHART_X + (m / TOTAL_MIN) * CHART_W;
  const svgH = TOP_PAD + agents.length * ROW_H + 40;

  const ticks = [0, 5, 10, 15, 20, 30, 45, 60, 75, 90];

  return (
    <DiagramFigure
      id="nmba-timeline-diagram"
      title="NMBA timeline"
      description="Auto-generated wrapper for the NMBA timeline anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => { if (cursorMin >= TOTAL_MIN) setCursorMin(0); setPlaying(!playing); }}
            className="px-4 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {playing ? "Pause" : cursorMin >= TOTAL_MIN ? "Replay" : "Play"}
          </button>
          <button
            onClick={() => { setPlaying(false); setCursorMin(0); }}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            Reset
          </button>
          <span className="text-sm text-muted-foreground ml-2">
            {cursorMin.toFixed(1)} min
          </span>
        </div>
  
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 700 ${svgH}`} className="w-full" style={{ minWidth: 600 }}>
            {/* Axis */}
            <line x1={CHART_X} y1={TOP_PAD - 10} x2={CHART_X} y2={svgH - 20} stroke="hsl(var(--border))" strokeWidth={1} />
            <line x1={CHART_X} y1={svgH - 20} x2={CHART_X + CHART_W} y2={svgH - 20} stroke="hsl(var(--border))" strokeWidth={1} />
            <text x={CHART_X + CHART_W / 2} y={svgH - 2} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground))">
              Time (minutes)
            </text>
  
            {/* Tick marks */}
            {ticks.map(t => (
              <g key={t}>
                <line x1={minToX(t)} y1={svgH - 20} x2={minToX(t)} y2={svgH - 15} stroke="hsl(var(--muted-foreground))" strokeWidth={1} />
                <text x={minToX(t)} y={svgH - 6} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">{t}</text>
                <line x1={minToX(t)} y1={TOP_PAD - 10} x2={minToX(t)} y2={svgH - 20} stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray="3,3" opacity={0.4} />
              </g>
            ))}
  
            {/* Agent rows */}
            {agents.map((a, i) => {
              const y = TOP_PAD + i * ROW_H;
              const barStart = minToX(a.onset);
              const barEnd = minToX(a.onset + a.duration);
              const intubX = minToX(a.intubation);
              const isActive = cursorMin >= a.onset && cursorMin <= a.onset + a.duration;
  
              return (
                    <g key={a.name}>
                  {/* Row bg */}
                  {i % 2 === 0 && (
                    <rect x={CHART_X} y={y - 2} width={CHART_W} height={ROW_H} fill="hsl(var(--muted))" opacity={0.15} rx={2} stroke="hsl(var(--border))" strokeWidth="0.75" />
                  )}
  
                  {/* Label */}
                  <text x={CHART_X - 6} y={y + ROW_H / 2 + 1} textAnchor="end" fontSize={10} fill={isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"} fontWeight={isActive ? 600 : 400}>
                    {a.name}
                  </text>
  
                  {/* Onset ramp */}
                  <polygon
                    points={`${minToX(0)},${y + ROW_H - 8} ${barStart},${y + 6} ${barStart},${y + ROW_H - 8}`}
                    fill={a.color}
                    opacity={0.25}
                  />
  
                  {/* Duration bar */}
                  <rect x={barStart} y={y + 6} width={barEnd - barStart} height={ROW_H - 14} rx={3} fill={a.color} opacity={0.6} />
  
                  {/* Intubation marker */}
                  <line x1={intubX} y1={y + 4} x2={intubX} y2={y + ROW_H - 6} stroke={a.color} strokeWidth={2} />
                  <circle cx={intubX} cy={y + 4} r={2.5} fill={a.color} />
  
                  {/* Type badge */}
                  <rect x={barStart + 3} y={y + 8} width={a.type === "depol" ? 30 : 28} height={12} rx={2} fill="hsl(var(--background))" opacity={0.7} />
                  <text x={barStart + 5} y={y + 17} fontSize={7} fill={a.color} fontWeight={600}>
                    {a.type === "depol" ? "DEPOL" : "NDMR"}
                  </text>
                </g>
    );
            })}
  
            {/* Animated cursor */}
            {cursorMin > 0 && (
              <g>
                <line
                  x1={minToX(cursorMin)}
                  y1={TOP_PAD - 10}
                  x2={minToX(cursorMin)}
                  y2={svgH - 20}
                  stroke="hsl(var(--destructive))"
                  strokeWidth={1.5}
                  strokeDasharray="4,2"
                />
                <rect x={minToX(cursorMin) - 16} y={TOP_PAD - 24} width={32} height={14} rx={3} fill="hsl(var(--destructive))" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x={minToX(cursorMin)} y={TOP_PAD - 14} textAnchor="middle" fontSize={8} fill="hsl(var(--background))" fontWeight={600}>
                  {cursorMin.toFixed(0)}m
                </text>
              </g>
            )}
  
            {/* Legend */}
            <g transform={`translate(${CHART_X}, ${TOP_PAD - 40})`}>
              <line x1={0} y1={8} x2={0} y2={18} stroke="hsl(var(--muted-foreground))" strokeWidth={2} />
              <circle cx={0} cy={8} r={2.5} fill="hsl(var(--muted-foreground))" />
              <text x={6} y={16} fontSize={9} fill="hsl(var(--muted-foreground))">Intubation conditions</text>
  
              <rect x={130} y={7} width={20} height={10} rx={2} fill="hsl(var(--muted-foreground))" opacity={0.5} stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x={155} y={16} fontSize={9} fill="hsl(var(--muted-foreground))">Clinical duration</text>
  
              <polygon points="290,17 300,7 300,17" fill="hsl(var(--muted-foreground))" opacity={0.25} />
              <text x={305} y={16} fontSize={9} fill="hsl(var(--muted-foreground))">Onset ramp</text>
            </g>
          </svg>
        </div>
      </div>
    </DiagramFigure>
  );
};

export { NMBATimelineDiagram };

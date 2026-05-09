import { useState, useEffect } from "react";

interface LAAgent {
  name: string;
  pKa: number;
  color: string;
  onset: string;
  duration: string;
  proteinBinding: string;
}

const agents: LAAgent[] = [
  { name: "Lidocaine", pKa: 7.9, color: "hsl(210 70% 50%)", onset: "Fast", duration: "Medium", proteinBinding: "65%" },
  { name: "Bupivacaine", pKa: 8.1, color: "hsl(340 60% 50%)", onset: "Slow", duration: "Long", proteinBinding: "95%" },
  { name: "Ropivacaine", pKa: 8.1, color: "hsl(170 50% 40%)", onset: "Moderate", duration: "Long", proteinBinding: "94%" },
  { name: "Prilocaine", pKa: 7.7, color: "hsl(30 70% 50%)", onset: "Fast", duration: "Medium", proteinBinding: "55%" },
];

export const PKaDiagram = () => {
  const [pH, setPH] = useState(7.4);
  const [selectedAgent, setSelectedAgent] = useState(0);
  const [_animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setAnimFrame((f) => f + 1), 50);
    return () => clearInterval(interval);
  }, []);

  const agent = agents[selectedAgent];

  // Henderson-Hasselbalch: ratio of ionised (BH+) to unionised (B)
  // For a weak base: pKa = pH + log([BH+]/[B])
  // [BH+]/[B] = 10^(pKa - pH)
  const ratio = Math.pow(10, agent.pKa - pH);
  const percentIonised = (ratio / (1 + ratio)) * 100;
  const percentUnionised = 100 - percentIonised;

  const w = 500;
  const h = 300;
  const padL = 60;
  const padR = 20;
  const padT = 30;
  const padB = 50;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  // Generate ionisation curve for selected agent
  const generateCurve = (getY: (ph: number) => number): string => {
    const pts: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const ph = 6.0 + (i / 200) * 3.0; // pH 6 to 9
      const val = getY(ph);
      const x = padL + ((ph - 6) / 3) * plotW;
      const y = padT + plotH - (val / 100) * plotH;
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const unionisedPath = generateCurve((ph) => {
    const r = Math.pow(10, agent.pKa - ph);
    return (1 / (1 + r)) * 100;
  });

  const ionisedPath = generateCurve((ph) => {
    const r = Math.pow(10, agent.pKa - ph);
    return (r / (1 + r)) * 100;
  });

  const currentX = padL + ((pH - 6) / 3) * plotW;

  // Animated molecule visualization
  const totalMols = 20;
  const ionisedCount = Math.round((percentIonised / 100) * totalMols);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Agent selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {agents.map((a, i) => (
          <button
            key={a.name}
            onClick={() => setSelectedAgent(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              selectedAgent === i
                ? "border-current opacity-100"
                : "border-border text-muted-foreground opacity-50"
            }`}
            style={selectedAgent === i ? { color: a.color, borderColor: a.color } : {}}
          >
            {a.name}
          </button>
        ))}
      </div>

      {/* pH Slider */}
      <div className="flex items-center gap-4 mb-6 px-4">
        <span className="text-sm font-medium text-foreground w-20">pH: {pH.toFixed(1)}</span>
        <input
          type="range"
          min="6.0"
          max="9.0"
          step="0.1"
          value={pH}
          onChange={(e) => setPH(parseFloat(e.target.value))}
          className="flex-1 accent-primary"
        />
        <div className="text-xs text-muted-foreground w-24 text-right">
          pKa: {agent.pKa}
        </div>
      </div>

      {/* Ionisation chart */}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* Grid */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = padT + plotH - (v / 100) * plotH;
          return (
            <g key={v}>
              <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="hsl(210 20% 92%)" strokeWidth="0.5" />
              <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">{v}%</text>
            </g>
          );
        })}
        {[6, 6.5, 7, 7.5, 8, 8.5, 9].map((v) => {
          const x = padL + ((v - 6) / 3) * plotW;
          return (
            <g key={v}>
              <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="hsl(210 20% 92%)" strokeWidth="0.5" />
              <text x={x} y={h - 12} textAnchor="middle" fontSize="9" className="fill-muted-foreground">{v}</text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
        <line x1={padL} y1={padT + plotH} x2={w - padR} y2={padT + plotH} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
        <text x={w / 2} y={h - 0} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">pH</text>
        <text x={10} y={padT + plotH / 2} textAnchor="middle" fontSize="10" className="fill-foreground font-medium" transform={`rotate(-90, 10, ${padT + plotH / 2})`}>Percentage</text>

        {/* pKa line */}
        <line
          x1={padL + ((agent.pKa - 6) / 3) * plotW}
          y1={padT}
          x2={padL + ((agent.pKa - 6) / 3) * plotW}
          y2={padT + plotH}
          stroke="hsl(215 25% 50%)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <text x={padL + ((agent.pKa - 6) / 3) * plotW} y={padT - 6} textAnchor="middle" fontSize="9" className="fill-muted-foreground">
          pKa {agent.pKa}
        </text>

        {/* Curves */}
        <path d={unionisedPath} fill="none" stroke="hsl(170 50% 40%)" strokeWidth="2.5" />
        <path d={ionisedPath} fill="none" stroke="hsl(340 60% 50%)" strokeWidth="2.5" />

        {/* Current pH cursor */}
        <line x1={currentX} y1={padT} x2={currentX} y2={padT + plotH} stroke="hsl(210 70% 45%)" strokeWidth="1.5" opacity="0.6" />
        <circle cx={currentX} cy={padT + plotH - (percentUnionised / 100) * plotH} r="5" fill="hsl(170 50% 40%)" stroke="hsl(0 0% 100%)" strokeWidth="2" />
        <circle cx={currentX} cy={padT + plotH - (percentIonised / 100) * plotH} r="5" fill="hsl(340 60% 50%)" stroke="hsl(0 0% 100%)" strokeWidth="2" />

        {/* Legend */}
        <circle cx={padL + 20} cy={padT + 12} r={4} fill="hsl(170 50% 40%)" />
        <text x={padL + 28} y={padT + 16} fontSize="10" className="fill-foreground">Unionised (B) — crosses membrane</text>
        <circle cx={padL + 20} cy={padT + 28} r={4} fill="hsl(340 60% 50%)" />
        <text x={padL + 28} y={padT + 32} fontSize="10" className="fill-foreground">Ionised (BH⁺) — active at receptor</text>
      </svg>

      {/* Molecule visualization */}
      <div className="mt-4 p-4 rounded-lg bg-secondary/30 border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">{agent.name} at pH {pH.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">pKa = {agent.pKa}</span>
        </div>
        <div className="flex gap-1 flex-wrap mb-2">
          {Array.from({ length: totalMols }).map((_, i) => {
            const isIonised = i < ionisedCount;
            return (
              <div
                key={i}
                className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold transition-colors duration-300"
                style={{
                  backgroundColor: isIonised ? "hsl(340 60% 90%)" : "hsl(170 50% 88%)",
                  color: isIonised ? "hsl(340 60% 40%)" : "hsl(170 50% 30%)",
                  border: `1.5px solid ${isIonised ? "hsl(340 60% 50%)" : "hsl(170 50% 40%)"}`,
                }}
              >
                {isIonised ? "+" : "B"}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Ionised (BH⁺): {percentIonised.toFixed(1)}%</span>
          <span>Unionised (B): {percentUnionised.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

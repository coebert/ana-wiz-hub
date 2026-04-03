import { useState, useEffect } from "react";

interface Agent {
  name: string;
  mac: number;
  bgpc: number;
  color: string;
}

const agents: Agent[] = [
  { name: "Desflurane", mac: 6.0, bgpc: 0.42, color: "hsl(210 70% 50%)" },
  { name: "Sevoflurane", mac: 2.0, bgpc: 0.65, color: "hsl(170 50% 40%)" },
  { name: "Isoflurane", mac: 1.15, bgpc: 1.46, color: "hsl(340 60% 50%)" },
  { name: "Halothane", mac: 0.75, bgpc: 2.54, color: "hsl(30 70% 50%)" },
  { name: "N₂O", mac: 105, bgpc: 0.47, color: "hsl(260 50% 55%)" },
];

type ViewMode = "mac-bar" | "uptake";

export const MACDiagram = () => {
  const [mode, setMode] = useState<ViewMode>("mac-bar");
  const [animFrame, setAnimFrame] = useState(0);
  const [selectedAgents, setSelectedAgents] = useState<string[]>(["Sevoflurane", "Desflurane", "Isoflurane"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimFrame((f) => f + 1);
    }, 33);
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min(animFrame / 40, 1); // animate in over ~1.3s
  const w = 500;
  const h = 320;
  const pad = { top: 40, right: 30, bottom: 50, left: 100 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const toggleAgent = (name: string) => {
    setSelectedAgents((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const visibleAgents = agents.filter((a) => selectedAgents.includes(a.name) && a.name !== "N₂O");

  // Uptake curve: FA/FI = 1 - e^(-t/λ) where λ relates to bgpc
  const uptakeCurve = (bgpc: number, timeMin: number): number => {
    const lambda = bgpc * 2.5; // simplified time constant
    return 1 - Math.exp(-timeMin / lambda);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex gap-2 justify-center mb-4">
        <button
          onClick={() => { setMode("mac-bar"); setAnimFrame(0); }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            mode === "mac-bar" ? "bg-primary/10 border-primary text-primary" : "border-border text-muted-foreground"
          }`}
        >MAC Values</button>
        <button
          onClick={() => { setMode("uptake"); setAnimFrame(0); }}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            mode === "uptake" ? "bg-primary/10 border-primary text-primary" : "border-border text-muted-foreground"
          }`}
        >FA/FI Uptake</button>
      </div>

      {/* Agent toggles */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {agents.filter((a) => a.name !== "N₂O").map((agent) => (
          <button
            key={agent.name}
            onClick={() => toggleAgent(agent.name)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
              selectedAgents.includes(agent.name)
                ? "border-current opacity-100"
                : "border-border text-muted-foreground opacity-40"
            }`}
            style={selectedAgents.includes(agent.name) ? { color: agent.color, borderColor: agent.color } : {}}
          >
            {agent.name}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {mode === "mac-bar" && (
          <g>
            {/* Y axis */}
            <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
            {/* X axis */}
            <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />

            {/* X grid + labels */}
            {[0, 2, 4, 6, 8].map((v) => {
              const x = pad.left + (v / 8) * plotW;
              return (
                <g key={v}>
                  <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="hsl(210 20% 92%)" strokeWidth="0.5" />
                  <text x={x} y={pad.top + plotH + 18} textAnchor="middle" fontSize="10" className="fill-muted-foreground">{v}%</text>
                </g>
              );
            })}
            <text x={pad.left + plotW / 2} y={h - 5} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">MAC (% atm)</text>

            {/* Bars */}
            {visibleAgents.map((agent, i) => {
              const barH = 28;
              const gap = 12;
              const y = pad.top + 20 + i * (barH + gap);
              const barW = (agent.mac / 8) * plotW * progress;
              return (
                <g key={agent.name}>
                  <text x={pad.left - 8} y={y + barH / 2 + 4} textAnchor="end" fontSize="11" className="fill-foreground font-medium">
                    {agent.name}
                  </text>
                  <rect x={pad.left} y={y} width={barW} height={barH} fill={agent.color} rx="4" opacity="0.85" />
                  {progress >= 0.8 && (
                    <text x={pad.left + barW + 6} y={y + barH / 2 + 4} fontSize="11" className="fill-foreground font-semibold">
                      {agent.mac}%
                    </text>
                  )}
                </g>
              );
            })}

            {/* 1 MAC reference line */}
            <line
              x1={pad.left + (1 / 8) * plotW}
              y1={pad.top}
              x2={pad.left + (1 / 8) * plotW}
              y2={pad.top + plotH}
              stroke="hsl(215 25% 30%)"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.5"
            />
            <text
              x={pad.left + (1 / 8) * plotW}
              y={pad.top - 6}
              textAnchor="middle"
              fontSize="9"
              className="fill-muted-foreground"
            >1 MAC</text>
          </g>
        )}

        {mode === "uptake" && (
          <g>
            {/* Axes */}
            <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
            <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />

            {/* Y grid */}
            {[0, 0.25, 0.5, 0.75, 1.0].map((v) => {
              const y = pad.top + plotH - v * plotH;
              return (
                <g key={v}>
                  <line x1={pad.left} y1={y} x2={pad.left + plotW} y2={y} stroke="hsl(210 20% 92%)" strokeWidth="0.5" />
                  <text x={pad.left - 8} y={y + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">{(v * 100).toFixed(0)}%</text>
                </g>
              );
            })}

            {/* X labels */}
            {[0, 5, 10, 15, 20].map((v) => {
              const x = pad.left + (v / 20) * plotW;
              return <text key={v} x={x} y={pad.top + plotH + 18} textAnchor="middle" fontSize="10" className="fill-muted-foreground">{v}</text>;
            })}

            <text x={pad.left + plotW / 2} y={h - 5} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">Time (min)</text>
            <text x={12} y={pad.top + plotH / 2} textAnchor="middle" fontSize="11" className="fill-foreground font-medium" transform={`rotate(-90, 12, ${pad.top + plotH / 2})`}>FA/FI</text>

            {/* Curves */}
            {visibleAgents.map((agent) => {
              const pts: string[] = [];
              const maxPts = Math.floor(200 * progress);
              for (let i = 0; i <= maxPts; i++) {
                const t = (i / 200) * 20; // 0-20 min
                const fafi = uptakeCurve(agent.bgpc, t);
                const x = pad.left + (t / 20) * plotW;
                const y = pad.top + plotH - fafi * plotH;
                pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
              }
              return (
                <g key={agent.name}>
                  <path d={pts.join(" ")} fill="none" stroke={agent.color} strokeWidth="2.5" strokeLinecap="round" />
                  {progress >= 0.9 && (
                    <text
                      x={pad.left + plotW + 4}
                      y={pad.top + plotH - uptakeCurve(agent.bgpc, 20) * plotH + 4}
                      fontSize="9"
                      className="font-medium"
                      style={{ fill: agent.color }}
                    >
                      {agent.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Explanation annotation */}
            {progress >= 0.9 && (
              <text x={pad.left + plotW / 2} y={pad.top + 14} textAnchor="middle" fontSize="9" className="fill-muted-foreground">
                Low blood:gas solubility → faster rise in FA/FI
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

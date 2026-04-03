import { useState } from "react";
import { Button } from "@/components/ui/button";

type CurveType = "lung" | "chestwall" | "total";

export const ComplianceDiagram = () => {
  const [selected, setSelected] = useState<CurveType[]>(["lung", "chestwall", "total"]);

  const toggle = (t: CurveType) => {
    setSelected(prev => prev.includes(t) ? prev.filter(c => c !== t) : [...prev, t]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button variant={selected.includes("lung") ? "default" : "outline"} size="sm" onClick={() => toggle("lung")}>
          Lung
        </Button>
        <Button variant={selected.includes("chestwall") ? "default" : "outline"} size="sm" onClick={() => toggle("chestwall")}>
          Chest Wall
        </Button>
        <Button variant={selected.includes("total") ? "default" : "outline"} size="sm" onClick={() => toggle("total")}>
          Total System
        </Button>
      </div>

      <svg viewBox="0 0 400 300" className="w-full" role="img" aria-label="Compliance pressure-volume curves">
        {/* Axes */}
        <line x1="80" y1="260" x2="370" y2="260" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="80" y1="20" x2="80" y2="260" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Labels */}
        <text x="225" y="290" fill="hsl(var(--foreground))" fontSize="11" textAnchor="middle">Pressure (cmH₂O)</text>
        <text x="25" y="140" fill="hsl(var(--foreground))" fontSize="11" textAnchor="middle" transform="rotate(-90,25,140)">Volume (L)</text>

        {/* X ticks */}
        {[-20, -10, 0, 10, 20, 30].map(p => {
          const x = 80 + ((p + 20) / 50) * 290;
          return (
            <g key={p}>
              <line x1={x} y1="260" x2={x} y2="265" stroke="hsl(var(--foreground))" strokeWidth="1" />
              <text x={x} y="277" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="middle">{p}</text>
            </g>
          );
        })}

        {/* Zero pressure line */}
        <line x1={80 + (20/50)*290} y1="20" x2={80 + (20/50)*290} y2="260" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />

        {/* FRC level */}
        <line x1="80" y1="155" x2="370" y2="155" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="3 3" />
        <text x="75" y="158" fill="hsl(var(--muted-foreground))" fontSize="9" textAnchor="end">FRC</text>

        {/* Lung curve - sigmoid, needs positive pressure to inflate */}
        {selected.includes("lung") && (
          <path
            d="M 196 250 Q 210 240 220 220 Q 240 180 250 155 Q 270 110 300 70 Q 320 50 340 40"
            fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5"
          />
        )}

        {/* Chest wall curve - opposite sigmoid */}
        {selected.includes("chestwall") && (
          <path
            d="M 120 250 Q 140 230 160 200 Q 180 170 196 155 Q 220 130 250 100 Q 280 75 320 55"
            fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5"
          />
        )}

        {/* Total respiratory system - steeper sigmoid through zero at FRC */}
        {selected.includes("total") && (
          <path
            d="M 160 250 Q 180 230 195 200 Q 210 170 196 155 Q 230 130 270 90 Q 310 60 350 45"
            fill="none" stroke="hsl(var(--destructive))" strokeWidth="2.5" strokeDasharray="8 4"
          />
        )}

        {/* Legend */}
        {selected.includes("lung") && (
          <>
            <line x1="100" y1="30" x2="120" y2="30" stroke="hsl(var(--primary))" strokeWidth="2.5" />
            <text x="125" y="34" fill="hsl(var(--foreground))" fontSize="10">Lung</text>
          </>
        )}
        {selected.includes("chestwall") && (
          <>
            <line x1="170" y1="30" x2="190" y2="30" stroke="hsl(var(--accent))" strokeWidth="2.5" />
            <text x="195" y="34" fill="hsl(var(--foreground))" fontSize="10">Chest Wall</text>
          </>
        )}
        {selected.includes("total") && (
          <>
            <line x1="270" y1="30" x2="290" y2="30" stroke="hsl(var(--destructive))" strokeWidth="2.5" strokeDasharray="8 4" />
            <text x="295" y="34" fill="hsl(var(--foreground))" fontSize="10">Total</text>
          </>
        )}
      </svg>
      <p className="text-xs text-muted-foreground text-center">
        At FRC, elastic recoil of the lung (inward) equals the spring-out force of the chest wall. Transmural pressure = 0 for the total system.
      </p>
    </div>
  );
};

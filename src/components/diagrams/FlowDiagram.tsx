import { useState } from "react";
import { Button } from "@/components/ui/button";

type FlowType = "laminar" | "turbulent";

export const FlowDiagram = () => {
  const [flowType, setFlowType] = useState<FlowType>("laminar");

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={flowType === "laminar" ? "default" : "outline"}
          size="sm"
          onClick={() => setFlowType("laminar")}
        >
          Laminar Flow
        </Button>
        <Button
          variant={flowType === "turbulent" ? "default" : "outline"}
          size="sm"
          onClick={() => setFlowType("turbulent")}
        >
          Turbulent Flow
        </Button>
      </div>

      <svg viewBox="0 0 500 220" className="w-full" role="img" aria-label={`${flowType} flow diagram`}>
        {/* Tube walls */}
        <rect x="50" y="40" width="400" height="140" rx="8" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />

        {flowType === "laminar" ? (
          <>
            {/* Parabolic velocity profile - smooth parallel lines */}
            {[-50, -35, -20, -5, 5, 20, 35, 50].map((offset, i) => {
              const speed = 1 - Math.abs(offset) / 70;
              const length = speed * 120;
              return (
                <g key={i}>
                  <line
                    x1={200 - length / 2}
                    y1={110 + offset}
                    x2={200 + length / 2}
                    y2={110 + offset}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    opacity={0.6 + speed * 0.4}
                  >
                    <animate
                      attributeName="x1"
                      values={`${200 - length / 2};${220 - length / 2};${200 - length / 2}`}
                      dur={`${2 / speed}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="x2"
                      values={`${200 + length / 2};${220 + length / 2};${200 + length / 2}`}
                      dur={`${2 / speed}s`}
                      repeatCount="indefinite"
                    />
                  </line>
                  {/* Arrowhead */}
                  <polygon
                    points={`${200 + length / 2},${110 + offset} ${200 + length / 2 - 8},${110 + offset - 4} ${200 + length / 2 - 8},${110 + offset + 4}`}
                    fill="hsl(var(--primary))"
                    opacity={0.6 + speed * 0.4}
                  >
                    <animate
                      attributeName="points"
                      values={`${200 + length / 2},${110 + offset} ${200 + length / 2 - 8},${110 + offset - 4} ${200 + length / 2 - 8},${110 + offset + 4};${220 + length / 2},${110 + offset} ${220 + length / 2 - 8},${110 + offset - 4} ${220 + length / 2 - 8},${110 + offset + 4};${200 + length / 2},${110 + offset} ${200 + length / 2 - 8},${110 + offset - 4} ${200 + length / 2 - 8},${110 + offset + 4}`}
                      dur={`${2 / speed}s`}
                      repeatCount="indefinite"
                    />
                  </polygon>
                </g>
              );
            })}
            {/* Parabolic envelope */}
            <path
              d="M 150 60 Q 320 110 150 160"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text x="370" y="110" fill="hsl(var(--foreground))" fontSize="11" textAnchor="middle" fontWeight="bold">
              Parabolic
            </text>
            <text x="370" y="125" fill="hsl(var(--foreground))" fontSize="11" textAnchor="middle">
              Profile
            </text>
          </>
        ) : (
          <>
            {/* Turbulent - chaotic arrows */}
            {Array.from({ length: 20 }, (_, i) => {
              const x = 80 + Math.random() * 340;
              const y = 55 + Math.random() * 110;
              const angle = (Math.random() - 0.5) * 60;
              return (
                    <g key={i} transform={`translate(${x},${y}) rotate(${angle})`}>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="hsl(var(--destructive))" strokeWidth="1.5" opacity="0.7">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
                  </line>
                  <polygon points="12,0 6,-3 6,3" fill="hsl(var(--destructive))" opacity="0.7">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${1 + Math.random() * 2}s`} repeatCount="indefinite" />
                  </polygon>
                </g>
  );
            })}
            <text x="370" y="110" fill="hsl(var(--foreground))" fontSize="11" textAnchor="middle" fontWeight="bold">
              Flat
            </text>
            <text x="370" y="125" fill="hsl(var(--foreground))" fontSize="11" textAnchor="middle">
              Profile
            </text>
          </>
        )}
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className={`rounded-lg p-4 border ${flowType === "laminar" ? "border-primary/40 bg-primary/5" : "border-border bg-secondary/20"}`}>
          <p className="font-semibold text-foreground mb-1">Laminar Flow</p>
          <p className="text-muted-foreground">Q = πΔPr⁴ / 8ηl</p>
          <p className="text-muted-foreground mt-1">Depends on <strong>viscosity</strong></p>
          <p className="text-muted-foreground">Parabolic velocity profile</p>
          <p className="text-muted-foreground">Re &lt; 2000</p>
        </div>
        <div className={`rounded-lg p-4 border ${flowType === "turbulent" ? "border-destructive/40 bg-destructive/5" : "border-border bg-secondary/20"}`}>
          <p className="font-semibold text-foreground mb-1">Turbulent Flow</p>
          <p className="text-muted-foreground">Q ∝ √(ΔP)</p>
          <p className="text-muted-foreground mt-1">Depends on <strong>density</strong></p>
          <p className="text-muted-foreground">Flat velocity profile</p>
          <p className="text-muted-foreground">Re &gt; 4000</p>
        </div>
      </div>
    </div>
  );
};

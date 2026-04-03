import { useState, useEffect } from "react";

type GasLaw = "boyles" | "charles" | "daltons";

export const GasLawsDiagram = () => {
  const [activeLaw, setActiveLaw] = useState<GasLaw>("boyles");
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimFrame((f) => (f + 1) % 120);
    }, 33);
    return () => clearInterval(interval);
  }, []);

  const t = animFrame / 120; // 0 to 1 cycle
  const oscillate = Math.sin(t * Math.PI * 2) * 0.5 + 0.5; // 0 to 1

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex gap-2 justify-center mb-6">
        {(["boyles", "charles", "daltons"] as GasLaw[]).map((law) => (
          <button
            key={law}
            onClick={() => setActiveLaw(law)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              activeLaw === law
                ? "bg-physics/10 border-physics text-physics"
                : "border-border text-muted-foreground hover:border-physics/50"
            }`}
          >
            {law === "boyles" ? "Boyle's" : law === "charles" ? "Charles'" : "Dalton's"}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 400 280" className="w-full">
        {activeLaw === "boyles" && (
          <g>
            {/* Container - width changes */}
            <rect
              x={50}
              y={40}
              width={120 + oscillate * 100}
              height={180}
              rx="8"
              fill="hsl(210 60% 95%)"
              stroke="hsl(210 70% 35%)"
              strokeWidth="2"
            />
            {/* Piston */}
            <rect
              x={50 + 120 + oscillate * 100 - 10}
              y={40}
              width={20}
              height={180}
              rx="4"
              fill="hsl(210 70% 35%)"
              opacity="0.8"
            />
            {/* Particles */}
            {Array.from({ length: 8 }).map((_, i) => {
              const containerW = 120 + oscillate * 100 - 30;
              const px = 60 + ((i * 37 + animFrame * 2) % containerW);
              const py = 60 + ((i * 53 + animFrame * 3) % 140);
              return (
                <circle
                  key={i}
                  cx={px}
                  cy={py}
                  r={4}
                  fill="hsl(170 50% 40%)"
                  opacity="0.7"
                />
              );
            })}
            {/* Labels */}
            <text x={200} y={250} textAnchor="middle" className="fill-foreground font-medium" fontSize="13">
              P₁V₁ = P₂V₂ (at constant T)
            </text>
            <text x={110 + oscillate * 50} y={30} textAnchor="middle" className="fill-muted-foreground" fontSize="11">
              V = {(1 + oscillate).toFixed(1)} L
            </text>
          </g>
        )}

        {activeLaw === "charles" && (
          <g>
            {/* Container - height changes with temperature */}
            <rect
              x={130}
              y={220 - (100 + oscillate * 80)}
              width={120}
              height={100 + oscillate * 80}
              rx="8"
              fill={`hsl(${30 - oscillate * 30} ${50 + oscillate * 30}% ${90 - oscillate * 30}%)`}
              stroke="hsl(340 60% 45%)"
              strokeWidth="2"
            />
            {/* Temperature indicator */}
            <rect x={280} y={80} width={12} height={120} rx="6" fill="hsl(210 20% 90%)" stroke="hsl(210 20% 80%)" />
            <rect
              x={282}
              y={200 - oscillate * 116}
              width={8}
              height={oscillate * 116}
              rx="4"
              fill={`hsl(${30 - oscillate * 30} ${50 + oscillate * 30}% 50%)`}
            />
            <circle cx={286} cy={210} r={10} fill="hsl(0 70% 50%)" />
            <text x={200} y={250} textAnchor="middle" className="fill-foreground font-medium" fontSize="13">
              V₁/T₁ = V₂/T₂ (at constant P)
            </text>
            <text x={286} y={70} textAnchor="middle" className="fill-muted-foreground" fontSize="11">
              {(273 + oscillate * 100).toFixed(0)} K
            </text>
          </g>
        )}

        {activeLaw === "daltons" && (
          <g>
            {/* Container */}
            <rect x={80} y={40} width={220} height={170} rx="12" fill="hsl(210 60% 95%)" stroke="hsl(210 70% 35%)" strokeWidth="2" />
            {/* Different gas particles */}
            {Array.from({ length: 5 }).map((_, i) => {
              const px = 100 + ((i * 41 + animFrame * 1.5) % 180);
              const py = 60 + ((i * 67 + animFrame * 2) % 130);
              return <circle key={`o-${i}`} cx={px} cy={py} r={5} fill="hsl(210 70% 50%)" opacity="0.8" />;
            })}
            {Array.from({ length: 4 }).map((_, i) => {
              const px = 100 + ((i * 53 + animFrame * 2.2 + 20) % 180);
              const py = 60 + ((i * 43 + animFrame * 1.8 + 30) % 130);
              return <circle key={`n-${i}`} cx={px} cy={py} r={5} fill="hsl(170 50% 40%)" opacity="0.8" />;
            })}
            {Array.from({ length: 2 }).map((_, i) => {
              const px = 100 + ((i * 71 + animFrame * 1.2 + 50) % 180);
              const py = 60 + ((i * 89 + animFrame * 2.5 + 60) % 130);
              return <circle key={`c-${i}`} cx={px} cy={py} r={5} fill="hsl(340 60% 50%)" opacity="0.8" />;
            })}
            {/* Legend */}
            <circle cx={100} cy={240} r={5} fill="hsl(210 70% 50%)" />
            <text x={112} y={244} className="fill-muted-foreground" fontSize="10">O₂</text>
            <circle cx={160} cy={240} r={5} fill="hsl(170 50% 40%)" />
            <text x={172} y={244} className="fill-muted-foreground" fontSize="10">N₂</text>
            <circle cx={210} cy={240} r={5} fill="hsl(340 60% 50%)" />
            <text x={222} y={244} className="fill-muted-foreground" fontSize="10">CO₂</text>
            <text x={190} y={268} textAnchor="middle" className="fill-foreground font-medium" fontSize="13">
              Pₜₒₜₐₗ = P₁ + P₂ + P₃ + ...
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

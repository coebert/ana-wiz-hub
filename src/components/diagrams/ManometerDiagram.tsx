import { useState } from "react";
import { Button } from "@/components/ui/button";

type ManometerType = "u-tube" | "bourdon";

const ManometerDiagram = () => {
  const [active, setActive] = useState<ManometerType>("u-tube");

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          size="sm"
          variant={active === "u-tube" ? "default" : "outline"}
          onClick={() => setActive("u-tube")}
        >
          U-tube manometer
        </Button>
        <Button
          size="sm"
          variant={active === "bourdon" ? "default" : "outline"}
          onClick={() => setActive("bourdon")}
        >
          Bourdon gauge
        </Button>
      </div>

      {active === "u-tube" && (
        <div>
          <svg
            viewBox="0 0 400 320"
            className="w-full h-auto max-h-[420px]"
            role="img"
            aria-label="U-tube manometer showing pressure difference between two limbs"
          >
            {/* Glass U-tube outline */}
            <path
              d="M 90 30 L 90 230 Q 90 270 130 270 L 270 270 Q 310 270 310 230 L 310 30"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="3"
            />
            {/* Inner walls (to show tube thickness) */}
            <path
              d="M 110 30 L 110 230 Q 110 250 130 250 L 270 250 Q 290 250 290 230 L 290 30"
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Mercury column - left limb lower (higher pressure pushes it down) */}
            <path
              d="M 90 180 L 110 180 L 110 230 Q 110 250 130 250 L 270 250 Q 290 250 290 230 L 290 120 L 310 120 L 310 230 Q 310 270 270 270 L 130 270 Q 90 270 90 230 Z"
              fill="hsl(var(--physics) / 0.5)"
              stroke="hsl(var(--physics))"
              strokeWidth="1.5"
            />

            {/* Mercury surface highlights */}
            <line x1="90" y1="180" x2="110" y2="180" stroke="hsl(var(--physics))" strokeWidth="2" />
            <line x1="290" y1="120" x2="310" y2="120" stroke="hsl(var(--physics))" strokeWidth="2" />

            {/* Pressure arrows */}
            <g>
              <line x1="100" y1="10" x2="100" y2="40" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#arrowDown)" />
              <text x="100" y="22" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600" transform="translate(28 0)">P₁ (high)</text>
            </g>
            <g>
              <line x1="300" y1="40" x2="300" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrowUp)" />
              <text x="300" y="22" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600" transform="translate(34 0)">P₂ (atm)</text>
            </g>

            {/* Height difference indicator */}
            <line x1="345" y1="120" x2="345" y2="180" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerStart="url(#arrowUp2)" markerEnd="url(#arrowDown2)" />
            <line x1="310" y1="120" x2="350" y2="120" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="90" y1="180" x2="350" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 2" />
            <text x="358" y="154" className="fill-foreground" fontSize="12" fontWeight="700">h</text>
            <text x="358" y="168" className="fill-muted-foreground" fontSize="10">ΔP = ρgh</text>

            {/* Liquid label */}
            <text x="200" y="265" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Mercury / water</text>

            <defs>
              <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 5 9 L 10 0 Z" fill="hsl(var(--destructive))" />
              </marker>
              <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 10 L 5 1 L 10 10 Z" fill="hsl(var(--muted-foreground))" />
              </marker>
              <marker id="arrowDown2" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 5 9 L 10 0 Z" fill="hsl(var(--foreground))" />
              </marker>
              <marker id="arrowUp2" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 10 L 5 1 L 10 10 Z" fill="hsl(var(--foreground))" />
              </marker>
            </defs>
          </svg>

          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Principle:</strong> The unknown pressure P₁ pushes the liquid column down
              one limb and up the other. The vertical height difference <strong>h</strong> between the two surfaces equals
              the pressure difference: <strong>ΔP = ρ g h</strong>.
            </p>
            <p>
              <strong className="text-foreground">Liquid choice:</strong> Mercury (ρ = 13 600 kg/m³) for high pressures
              (BP, 1 mmHg = 1 mm column). Water (ρ = 1000 kg/m³) for low pressures (CVP, airway — 1 cmH₂O = 0.74 mmHg).
            </p>
            <p>
              <strong className="text-foreground">Limitations:</strong> bulky, slow response (high inertia of the liquid),
              cannot follow rapid waveforms, mercury toxicity. A sealed (Torricellian) limb gives absolute pressure
              against vacuum — the basis of the original mercury barometer.
            </p>
          </div>
        </div>
      )}

      {active === "bourdon" && (
        <div>
          <svg
            viewBox="0 0 400 320"
            className="w-full h-auto max-h-[420px]"
            role="img"
            aria-label="Bourdon gauge showing curved tube uncoiling under pressure to drive a pointer"
          >
            {/* Dial face */}
            <circle cx="220" cy="150" r="120" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="3" />
            <circle cx="220" cy="150" r="115" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />

            {/* Dial scale ticks */}
            {Array.from({ length: 11 }).map((_, i) => {
              const angle = -210 + i * 24; // -210° to +30°
              const rad = (angle * Math.PI) / 180;
              const x1 = 220 + Math.cos(rad) * 100;
              const y1 = 150 + Math.sin(rad) * 100;
              const x2 = 220 + Math.cos(rad) * 110;
              const y2 = 150 + Math.sin(rad) * 110;
              const xt = 220 + Math.cos(rad) * 88;
              const yt = 150 + Math.sin(rad) * 88;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                  <text x={xt} y={yt + 3} textAnchor="middle" className="fill-foreground" fontSize="9">
                    {i * 20}
                  </text>
                </g>
              );
            })}

            {/* Pointer (currently reading ~120) */}
            <line
              x1="220"
              y1="150"
              x2={220 + Math.cos((-66 * Math.PI) / 180) * 90}
              y2={150 + Math.sin((-66 * Math.PI) / 180) * 90}
              stroke="hsl(var(--destructive))"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="220" cy="150" r="6" fill="hsl(var(--foreground))" />

            {/* Dial label */}
            <text x="220" y="240" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">
              bar
            </text>

            {/* Bourdon C-tube (curved hollow tube) inside dial */}
            <path
              d="M 220 150 Q 280 100 280 150 Q 280 200 220 200"
              fill="none"
              stroke="hsl(var(--physics))"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 220 150 Q 280 100 280 150 Q 280 200 220 200"
              fill="none"
              stroke="hsl(var(--physics) / 0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="3 3"
            />
            <text x="295" y="155" className="fill-foreground" fontSize="10" fontWeight="600">
              Bourdon
            </text>
            <text x="295" y="167" className="fill-muted-foreground" fontSize="9">
              C-tube
            </text>

            {/* Linkage from tube tip to pointer pivot */}
            <line x1="220" y1="200" x2="220" y2="156" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Inlet stem */}
            <rect x="210" y="270" width="20" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <line x1="220" y1="270" x2="220" y2="200" stroke="hsl(var(--physics))" strokeWidth="3" strokeLinecap="round" />

            {/* Pressure inlet arrow */}
            <line x1="220" y1="315" x2="220" y2="285" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#arrowUpRed)" />
            <text x="245" y="305" className="fill-foreground" fontSize="11" fontWeight="600">
              Gas in (P)
            </text>

            {/* Movement annotation */}
            <path
              d="M 290 90 Q 310 100 305 120"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
              markerEnd="url(#arrowCurve)"
            />
            <text x="320" y="95" className="fill-foreground" fontSize="9">
              tube
            </text>
            <text x="320" y="106" className="fill-foreground" fontSize="9">
              uncoils
            </text>

            <defs>
              <marker id="arrowUpRed" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 10 L 5 1 L 10 10 Z" fill="hsl(var(--destructive))" />
              </marker>
              <marker id="arrowCurve" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 8 5 L 0 10 Z" fill="hsl(var(--foreground))" />
              </marker>
            </defs>
          </svg>

          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Principle:</strong> A flattened, curved (C-shaped, helical or spiral)
              hollow metal tube is sealed at one end and connected to the pressure source at the other. Internal pressure
              tends to <strong>straighten</strong> the elliptical cross-section into a circle, which causes the tube to
              <strong> uncoil</strong>. Tip movement is amplified by a quadrant-and-pinion gear linkage to drive a pointer.
            </p>
            <p>
              <strong className="text-foreground">Clinical use:</strong> the standard mechanical gauge on medical gas
              cylinders, anaesthetic-machine pipeline gauges and regulators. Robust, no power required, reads gauge
              pressure (above atmospheric).
            </p>
            <p>
              <strong className="text-foreground">Range &amp; safety:</strong> ranges from a few kPa to &gt;200 bar
              (cylinder gauges typically 0–300 bar). Gauges are colour-coded to the gas and must be oil-free for O₂ and
              N₂O (risk of combustion). Calibrated against a dead-weight tester.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManometerDiagram;

import { useState } from "react";

type Gas = "n2o" | "o2";

export const CriticalTemperatureDiagram = () => {
  const [gas, setGas] = useState<Gas>("n2o");
  // fill: 1 = full, 0 = empty
  const [fill, setFill] = useState(1);

  // N2O: critical temp 36.5°C → at room temp (20°C) it exists as liquid + vapour in equilibrium.
  // Cylinder pressure stays at saturated vapour pressure (~52 bar at 20°C) until all liquid gone.
  // O2: critical temp -118°C → at room temp it is purely a gas. Pressure falls linearly with contents.
  const isN2O = gas === "n2o";

  // Pressure model
  let pressureBar: number;
  let liquidFraction: number; // proportion of cylinder occupied by liquid
  if (isN2O) {
    // Liquid present while fill > ~0.05 (small vapour headspace)
    if (fill > 0.05) {
      pressureBar = 52; // saturated vapour pressure at 20°C
      liquidFraction = (fill - 0.05) * 0.95; // most of the cylinder is liquid
    } else {
      // All liquid evaporated — pressure now falls linearly with remaining vapour
      pressureBar = 52 * (fill / 0.05);
      liquidFraction = 0;
    }
  } else {
    // O2: linear relationship between pressure and contents
    pressureBar = 137 * fill; // full ~137 bar
    liquidFraction = 0;
  }

  const maxPressure = isN2O ? 60 : 150;
  // Gauge needle angle: -120° (empty, left) → +120° (full, right)
  const needleAngle = -120 + (pressureBar / maxPressure) * 240;
  const needleRad = (needleAngle * Math.PI) / 180;

  // Cylinder geometry
  const cylX = 60;
  const cylY = 50;
  const cylW = 70;
  const cylH = 200;
  const liquidH = liquidFraction * cylH;
  const liquidY = cylY + cylH - liquidH;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex gap-2 justify-center mb-4">
        {(["n2o", "o2"] as Gas[]).map((g) => (
          <button
            key={g}
            onClick={() => {
              setGas(g);
              setFill(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              gas === g
                ? "bg-physics/10 border-physics text-physics"
                : "border-border text-muted-foreground hover:border-physics/50"
            }`}
          >
            {g === "n2o" ? "N₂O cylinder" : "O₂ cylinder"}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 400 290" className="w-full">
        {/* Cylinder body */}
        <rect
          x={cylX}
          y={cylY}
          width={cylW}
          height={cylH}
          rx="10"
          fill="hsl(210 20% 95%)"
          stroke="hsl(210 30% 35%)"
          strokeWidth="2"
        />
        {/* Cylinder neck/valve */}
        <rect x={cylX + cylW / 2 - 8} y={cylY - 18} width={16} height={18} fill="hsl(210 30% 35%)" />
        <rect x={cylX + cylW / 2 - 14} y={cylY - 26} width={28} height={10} rx="2" fill="hsl(210 30% 25%)" />

        {/* Liquid (N2O only, while present) */}
        {isN2O && liquidFraction > 0 && (
          <rect
            x={cylX + 2}
            y={liquidY}
            width={cylW - 4}
            height={liquidH}
            fill="hsl(200 70% 65%)"
            opacity="0.7"
          />
        )}

        {/* Vapour particles */}
        {Array.from({ length: 12 }).map((_, i) => {
          const vapourTop = cylY + 4;
          const vapourBottom = isN2O && liquidFraction > 0 ? liquidY - 2 : cylY + cylH - 4;
          const vapourH = vapourBottom - vapourTop;
          if (vapourH < 8) return null;
          // For O2, particle density scales with fill
          const visible = isN2O ? true : i < Math.ceil(fill * 12);
          if (!visible) return null;
          const px = cylX + 6 + ((i * 17) % (cylW - 12));
          const py = vapourTop + ((i * 23) % vapourH);
          return <circle key={i} cx={px} cy={py} r={2.5} fill="hsl(210 60% 40%)" opacity="0.75" />;
        })}

        {/* Cylinder label */}
        <text
          x={cylX + cylW / 2}
          y={cylY + cylH / 2}
          textAnchor="middle"
          className="fill-foreground font-bold"
          fontSize="14"
          transform={`rotate(-90 ${cylX + cylW / 2} ${cylY + cylH / 2})`}
        >
          {isN2O ? "N₂O" : "O₂"}
        </text>

        {/* Pressure gauge */}
        <g>
          <circle cx={280} cy={130} r={55} fill="hsl(210 20% 97%)" stroke="hsl(210 30% 35%)" strokeWidth="2" />
          {/* Tick marks */}
          {Array.from({ length: 9 }).map((_, i) => {
            const a = (-120 + i * 30) * (Math.PI / 180);
            const x1 = 280 + Math.cos(a) * 45;
            const y1 = 130 + Math.sin(a) * 45;
            const x2 = 280 + Math.cos(a) * 50;
            const y2 = 130 + Math.sin(a) * 50;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(210 30% 40%)" strokeWidth="1.5" />;
          })}
          {/* Needle */}
          <line
            x1={280}
            y1={130}
            x2={280 + Math.cos(needleRad) * 38}
            y2={130 + Math.sin(needleRad) * 38}
            stroke="hsl(0 70% 50%)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={280} cy={130} r={4} fill="hsl(210 30% 25%)" />
          <text x={280} y={195} textAnchor="middle" className="fill-foreground font-medium" fontSize="13">
            {pressureBar.toFixed(0)} bar
          </text>
          <text x={280} y={75} textAnchor="middle" className="fill-muted-foreground" fontSize="10">
            0 – {maxPressure} bar
          </text>
        </g>

        {/* Slider hint label */}
        <text x={200} y={275} textAnchor="middle" className="fill-muted-foreground" fontSize="11">
          Drag the slider below to empty the cylinder
        </text>
      </svg>

      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Cylinder contents: {(fill * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={fill * 100}
            onChange={(e) => setFill(Number(e.target.value) / 100)}
            className="w-full accent-physics"
          />
        </div>
        <div className="text-xs text-muted-foreground bg-secondary/30 border border-border rounded-lg p-3">
          {isN2O ? (
            <>
              <strong className="text-foreground">N₂O</strong> — critical temperature{" "}
              <strong>36.5 °C</strong>. At room temperature (20 °C) it is below its critical temperature, so it exists
              as <em>liquid in equilibrium with vapour</em>. The gauge reads the saturated vapour pressure (~52 bar)
              and stays constant while liquid remains. Only once all the liquid has evaporated does the pressure begin
              to fall — so cylinder pressure is <strong>not</strong> a reliable indicator of contents (use weight
              instead).
            </>
          ) : (
            <>
              <strong className="text-foreground">O₂</strong> — critical temperature{" "}
              <strong>−118 °C</strong>. At room temperature it is far above its critical temperature, so it exists
              purely as a gas (it cannot be liquefied by pressure alone). Cylinder pressure falls linearly with
              contents, so the gauge <strong>is</strong> a direct indicator of how much oxygen remains.
            </>
          )}
        </div>
      </div>
    </div>
  );
};

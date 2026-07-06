import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";

interface ZoneData {
  zone: number;
  label: string;
  relationship: string;
  flow: string;
  vq: string;
  color: string;
  description: string;
  pa: number;
  pA: number;
  pv: number;
}

const zones: ZoneData[] = [
  {
    zone: 1, label: "Zone 1 (Apex)", relationship: "PA > Pa > Pv",
    flow: "Minimal or absent", vq: "High (→ ∞)", color: "hsl(210, 70%, 55%)",
    description: "Alveolar pressure exceeds arterial pressure, compressing capillaries. Normally minimal in health — becomes significant with positive pressure ventilation, hypovolaemia, or haemorrhage. Acts as alveolar dead space.",
    pa: 20, pA: 25, pv: 10,
  },
  {
    zone: 2, label: "Zone 2 (Mid-lung)", relationship: "Pa > PA > Pv",
    flow: "Intermittent / pulsatile", vq: "≈ 1 (ideal)", color: "hsl(142, 60%, 45%)",
    description: "Arterial pressure exceeds alveolar, but alveolar exceeds venous. Flow is determined by the arterio-alveolar pressure difference (Starling resistor / waterfall effect). Flow increases down the zone as Pa rises with hydrostatic pressure.",
    pa: 30, pA: 25, pv: 15,
  },
  {
    zone: 3, label: "Zone 3 (Base)", relationship: "Pa > Pv > PA",
    flow: "Continuous / maximal", vq: "Low (→ 0)", color: "hsl(0, 70%, 55%)",
    description: "Both arterial and venous pressures exceed alveolar pressure. Capillaries are fully distended. Flow depends on the arterio-venous pressure difference. Highest perfusion but relatively less ventilation → lower V/Q ratio.",
    pa: 40, pA: 25, pv: 30,
  },
];

const WestZonesDiagram = () => {
  const [selectedZone, setSelectedZone] = useState<number>(1);
  const [peep, setPeep] = useState(0);
  const [coState, setCoState] = useState<"normal" | "low" | "high">("normal");

  // Adjust pressures based on PEEP and CO
  const coMod = coState === "low" ? -8 : coState === "high" ? 6 : 0;
  const adjustedZones = zones.map(z => ({
    ...z,
    pA: z.pA + peep,
    pa: z.pa + coMod,
    pv: z.pv + coMod,
  }));

  const active = adjustedZones[selectedZone];

  // Determine effective zone behavior
  const getEffectiveZone = (z: typeof adjustedZones[0]) => {
    if (z.pA >= z.pa) return 1;
    if (z.pa > z.pA && z.pA >= z.pv) return 2;
    return 3;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">West's Lung Zones</h3>

      {/* Zone selector */}
      <div className="flex gap-2">
        {zones.map((z, i) => (
          <button
            key={i}
            onClick={() => setSelectedZone(i)}
            className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all border ${
              selectedZone === i
                ? "border-border shadow-sm text-foreground"
                : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
            style={selectedZone === i ? { backgroundColor: withAlpha(z.color, 0.09) } : {}}
          >
            Zone {z.zone}
          </button>
        ))}
      </div>

      {/* Lung SVG */}
      <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto">
        {/* Lung outline */}
        <path d="M200,30 C120,30 60,100 55,200 C50,280 100,300 150,300 L250,300 C300,300 350,280 345,200 C340,100 280,30 200,30Z"
          fill="hsl(var(--muted))" opacity={0.2} stroke="hsl(var(--border))" strokeWidth="1.5" />

        {/* Zone divisions */}
        {adjustedZones.map((z, i) => {
          const y1 = 30 + i * 90;
          const y2 = 30 + (i + 1) * 90;
          const effectiveZone = getEffectiveZone(z);
          const zoneColor = zones[effectiveZone - 1].color;
          const isActive = selectedZone === i;

          // Approximate lung width at this height
          const midY = (y1 + y2) / 2;
          const t = (midY - 30) / 270;
          const halfW = 40 + t * 110;
          const cx = 200;

          return (
            <g key={i} onClick={() => setSelectedZone(i)} className="cursor-pointer">
              <rect x={cx - halfW} y={y1} width={halfW * 2} height={90}
                fill={zoneColor} opacity={isActive ? 0.25 : 0.08}
                rx="4" />
              {/* Zone label */}
              <text x={cx} y={y1 + 20} textAnchor="middle"
                className={`text-[11px] font-semibold ${isActive ? "fill-foreground" : "fill-muted-foreground"}`}>
                {z.label}
              </text>
              {/* Effective zone indicator */}
              {effectiveZone !== z.zone && (
                <text x={cx} y={y1 + 34} textAnchor="middle" className="text-[9px] fill-destructive font-medium">
                  → Behaving as Zone {effectiveZone}
                </text>
              )}
              {/* Pressure relationship */}
              <text x={cx} y={y1 + (effectiveZone !== z.zone ? 48 : 38)} textAnchor="middle"
                className="text-[10px] fill-muted-foreground font-mono">
                {z.pA >= z.pa ? `PA(${z.pA}) > Pa(${z.pa}) > Pv(${z.pv})`
                  : z.pA >= z.pv ? `Pa(${z.pa}) > PA(${z.pA}) > Pv(${z.pv})`
                  : `Pa(${z.pa}) > Pv(${z.pv}) > PA(${z.pA})`}
              </text>

              {/* Capillary representation with animated flow */}
              {(() => {
                const capY = y1 + 65;
                const eff = getEffectiveZone(z);
                const capOpacity = eff === 1 ? 0.2 : eff === 2 ? 0.5 : 0.8;
                const capH = eff === 1 ? 4 : eff === 2 ? 8 : 12;
                const capX = cx - 10;
                const capW = 80;
                // Animation: zone 1 = none, zone 2 = pulsatile (1.2s), zone 3 = continuous (0.9s)
                const animDur = eff === 1 ? 0 : eff === 2 ? 1.2 : 0.9;
                // Pulsatile = flow only during ~40% of cycle (systolic burst)
                const keyTimes = eff === 2 ? "0;0.4;0.5;1" : undefined;
                const xValues = eff === 2
                  ? `${capX - 10};${capX + capW};${capX + capW};${capX - 10}`
                  : `${capX - 10};${capX + capW}`;
                return (
                  <>
                    {/* Alveolus */}
                    <circle cx={cx - 40} cy={capY} r={14} fill="none" stroke={zoneColor} strokeWidth="1" opacity={0.5} />
                    <text x={cx - 40} y={capY + 3} textAnchor="middle" className="text-[7px] fill-muted-foreground">Alv</text>
                    {/* Capillary lumen */}
                    <rect x={capX} y={capY - capH / 2} width={capW} height={capH} rx={capH / 2}
                      fill="hsl(0, 70%, 55%)" opacity={capOpacity * 0.35} />
                    {/* Animated RBC pulses (only zones 2 and 3) */}
                    {eff > 1 && [0, 0.33, 0.66].map((delay, idx) => (
                      <circle key={idx} cy={capY} r={capH / 2 - 1}
                        fill="hsl(0, 75%, 45%)" opacity={capOpacity}>
                        <animate attributeName="cx"
                          values={xValues}
                          {...(keyTimes ? { keyTimes } : {})}
                          dur={`${animDur}s`}
                          begin={`${-delay * animDur}s`}
                          repeatCount="indefinite" />
                      </circle>
                    ))}
                    {/* Flow arrow */}
                    {eff > 1 && (
                      <polygon
                        points={`${cx + 75},${capY} ${cx + 65},${capY - 5} ${cx + 65},${capY + 5}`}
                        fill="hsl(0, 70%, 55%)" opacity={capOpacity}
                      />
                    )}
                    <text x={cx + 40} y={capY + capH / 2 + 10} textAnchor="middle" className="text-[7px] fill-muted-foreground">
                      {eff === 1 ? "No flow" : eff === 2 ? "Pulsatile flow" : "Continuous flow"}
                    </text>
                  </>
                );
              })()}

              {/* Divider */}
              {i < 2 && <line x1={cx - halfW + 10} y1={y2} x2={cx + halfW - 10} y2={y2}
                stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4,3" />}
            </g>
          );
        })}

        {/* Gravity arrow */}
        <line x1="370" y1="50" x2="370" y2="290" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#gravArrow)" />
        <text x="375" y="170" className="text-[9px] fill-muted-foreground" transform="rotate(90,375,170)">Gravity</text>
        <defs>
          <marker id="gravArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="hsl(var(--muted-foreground))" />
          </marker>
        </defs>
      </svg>

      {/* Interactive modifiers */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">PEEP (increases P<sub>A</sub>)</span>
            <span className="font-mono font-semibold text-foreground">{peep} cmH₂O</span>
          </div>
          <input type="range" min={0} max={20} value={peep}
            onChange={e => setPeep(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Cardiac Output</span>
            <span className="font-mono font-semibold text-foreground capitalize">{coState}</span>
          </div>
          <div className="flex gap-2">
            {(["low", "normal", "high"] as const).map(s => (
              <button key={s} onClick={() => setCoState(s)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  coState === s ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}>
                {s === "low" ? "↓ Low" : s === "high" ? "↑ High" : "Normal"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border" style={{ borderLeftColor: active.color, borderLeftWidth: 3 }}>
        <p className="text-sm font-semibold text-foreground">{active.label}</p>
        <p className="text-xs text-muted-foreground mt-1">{active.description}</p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="text-center bg-card rounded-lg p-2 border border-border">
            <p className="text-[10px] text-muted-foreground">Pa</p>
            <p className="text-sm font-mono font-bold text-foreground">{active.pa}</p>
          </div>
          <div className="text-center bg-card rounded-lg p-2 border border-border">
            <p className="text-[10px] text-muted-foreground">P<sub>A</sub></p>
            <p className="text-sm font-mono font-bold text-foreground">{active.pA}</p>
          </div>
          <div className="text-center bg-card rounded-lg p-2 border border-border">
            <p className="text-[10px] text-muted-foreground">Pv</p>
            <p className="text-sm font-mono font-bold text-foreground">{active.pv}</p>
          </div>
        </div>
      </div>

      {/* Clinical pearls */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Clinical Relevance</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>Zone 1 is normally minimal — expands with high PEEP, hypovolaemia, or upright position</li>
          <li>Zone 2 acts as a Starling resistor — flow independent of venous pressure</li>
          <li>Zone 3 dominates at the base — highest perfusion, prone to pulmonary oedema</li>
          <li>Supine position: anterior = Zone 1, posterior = Zone 3</li>
          <li>PA catheter tip should be in Zone 3 for accurate PCWP readings</li>
          <li>HPV redirects blood away from poorly ventilated regions to optimise V/Q matching</li>
        </ul>
      </div>
    </div>
  );
};

export { WestZonesDiagram };

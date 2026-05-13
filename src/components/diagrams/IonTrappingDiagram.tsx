import { useEffect, useState, useMemo } from "react";

type Scenario = {
  id: string;
  label: string;
  leftName: string;
  rightName: string;
  leftPH: number;
  rightPH: number;
  pKa: number;
  drugType: "base" | "acid";
  drugName: string;
  teaching: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "foetal",
    label: "Foetal acidosis (LA / opioid)",
    leftName: "Mother (plasma)",
    rightName: "Foetus (acidotic)",
    leftPH: 7.4,
    rightPH: 7.1,
    pKa: 8.1,
    drugType: "base",
    drugName: "Lidocaine (weak base)",
    teaching:
      "Unionised drug crosses placenta freely. In the acidotic foetus, more is protonated (ionised) and trapped — accumulating to higher total concentration than the mother. Worse with prolonged labour, distress, or bupivacaine overdose.",
  },
  {
    id: "salicylate",
    label: "Aspirin OD — urinary alkalinisation",
    leftName: "Plasma (pH 7.4)",
    rightName: "Alkaline urine (pH 8)",
    leftPH: 7.4,
    rightPH: 8.0,
    pKa: 3.5,
    drugType: "acid",
    drugName: "Salicylate (weak acid)",
    teaching:
      "Bicarbonate raises urinary pH → salicylate becomes more ionised in the tubule → trapped → enhanced renal elimination. Same principle for phenobarbital toxicity.",
  },
  {
    id: "amphetamine",
    label: "Amphetamine OD — urinary acidification (historical)",
    leftName: "Plasma (pH 7.4)",
    rightName: "Acidic urine (pH 5.5)",
    leftPH: 7.4,
    rightPH: 5.5,
    pKa: 9.9,
    drugType: "base",
    drugName: "Amphetamine (weak base)",
    teaching:
      "Acidic urine traps the protonated form → enhanced excretion. Not used clinically now (risk of myoglobinuric AKI), but illustrates the principle in reverse for basic drugs.",
  },
  {
    id: "gastric",
    label: "Aspirin absorption in stomach",
    leftName: "Stomach (pH 2)",
    rightName: "Plasma (pH 7.4)",
    leftPH: 2.0,
    rightPH: 7.4,
    pKa: 3.5,
    drugType: "acid",
    drugName: "Aspirin (weak acid)",
    teaching:
      "In the acidic stomach, aspirin is mostly unionised and crosses the mucosa easily. Once in plasma (pH 7.4) it ionises and is trapped — driving absorption.",
  },
];

// Henderson–Hasselbalch: fraction unionised
const fracUnionised = (pH: number, pKa: number, drugType: "base" | "acid") => {
  // Base: % unionised = 100 / (1 + 10^(pKa - pH))
  // Acid: % unionised = 100 / (1 + 10^(pH - pKa))
  const exp = drugType === "base" ? pKa - pH : pH - pKa;
  return 1 / (1 + Math.pow(10, exp));
};

const IonTrappingDiagram = () => {
  const [scenarioId, setScenarioId] = useState<string>("foetal");
  const [running, setRunning] = useState(true);
  const [tick, setTick] = useState(0);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;

  // Compute equilibrium distribution (relative).
  // At equilibrium, the unionised concentration is equal across the membrane.
  // Total on each side = unionised / fractionUnionised on that side.
  const { leftTotal, rightTotal, leftFracU, rightFracU } = useMemo(() => {
    const lFu = fracUnionised(scenario.leftPH, scenario.pKa, scenario.drugType);
    const rFu = fracUnionised(scenario.rightPH, scenario.pKa, scenario.drugType);
    // Set unionised conc = 1 on both sides (free diffusion)
    const lTotal = 1 / lFu;
    const rTotal = 1 / rFu;
    return { leftTotal: lTotal, rightTotal: rTotal, leftFracU: lFu, rightFracU: rFu };
  }, [scenario]);

  const ratio = rightTotal / leftTotal; // foetal:maternal etc.
  const trappedSide: "left" | "right" = rightTotal > leftTotal ? "right" : "left";

  // Allocate molecules proportional to total conc
  const TOTAL_MOLECULES = 60;
  const leftCount = Math.round((leftTotal / (leftTotal + rightTotal)) * TOTAL_MOLECULES);
  const rightCount = TOTAL_MOLECULES - leftCount;

  // Animation tick
  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(i);
  }, [running]);

  // Generate seeded molecule positions per compartment (jitter on each tick to imply movement)
  const seeded = (n: number, side: "left" | "right", t: number) => {
    return Array.from({ length: n }).map((_, i) => {
      const seed = i * 9301 + side.charCodeAt(0) * 49297 + t * 233;
      const r1 = ((Math.sin(seed) * 10000) % 1 + 1) % 1;
      const r2 = ((Math.cos(seed * 1.3) * 10000) % 1 + 1) % 1;
      const xMin = side === "left" ? 25 : 285;
      const xMax = side === "left" ? 215 : 475;
      const x = xMin + r1 * (xMax - xMin);
      const y = 75 + r2 * 200;
      // Determine ionised based on fraction on that side
      const fu = side === "left" ? leftFracU : rightFracU;
      const r3 = ((Math.sin(seed * 2.7) * 10000) % 1 + 1) % 1;
      const ionised = r3 > fu;
      return { x, y, ionised, key: `${side}-${i}` };
    });
  };

  const leftMolecules = seeded(leftCount, "left", tick);
  const rightMolecules = seeded(rightCount, "right", tick);

  // Crossing molecules (unionised only) — animate from left↔right
  const crossingCount = 4;
  const crossing = Array.from({ length: crossingCount }).map((_, i) => {
    const dir = (tick + i) % 2 === 0 ? "ltr" : "rtl";
    const delay = i * 0.4;
    const y = 110 + ((i * 47) % 130);
    return { dir, delay, y, key: `cross-${i}-${tick}` };
  });

  const pHColor = (pH: number) => {
    // Acidic = warm orange/red, alkaline = cool blue
    if (pH < 6.5) return "hsl(15 80% 55%)";
    if (pH < 7.2) return "hsl(30 75% 55%)";
    if (pH < 7.5) return "hsl(150 50% 50%)";
    return "hsl(210 70% 55%)";
  };

  return (
            <div className="my-6 rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-semibold text-foreground mb-1 text-center">
        Ion Trapping — Two-Compartment Animation
      </p>
      <p className="text-xs text-muted-foreground text-center mb-3">
        Only unionised drug crosses the membrane. On the acidic side, weak bases protonate and become trapped.
      </p>

      {/* Scenario picker */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-3">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScenarioId(s.id)}
            className={`text-[11px] px-2.5 py-1 rounded border transition ${
              scenarioId === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:bg-muted/50 text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => setRunning((r) => !r)}
          className="text-[11px] px-2.5 py-1 rounded border border-border hover:bg-muted/50 transition text-foreground ml-2"
        >
          {running ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* SVG diagram */}
      <div className="overflow-x-auto">
        <svg viewBox="0 0 500 320" className="w-full h-auto max-w-[600px] mx-auto" role="img" aria-label="Ion trapping animation">
          {/* Left compartment background */}
          <rect
            x="20"
            y="50"
            width="200"
            height="240"
            rx="8"
            fill={pHColor(scenario.leftPH)}
            opacity="0.12"
            stroke={pHColor(scenario.leftPH)}
            strokeWidth="1.5"
          />
          {/* Right compartment */}
          <rect
            x="280"
            y="50"
            width="200"
            height="240"
            rx="8"
            fill={pHColor(scenario.rightPH)}
            opacity="0.12"
            stroke={pHColor(scenario.rightPH)}
            strokeWidth="1.5"
          />

          {/* Membrane */}
          <rect x="220" y="50" width="60" height="240" fill="hsl(var(--muted))" opacity="0.6" />
          <line x1="220" y1="50" x2="220" y2="290" stroke="hsl(var(--foreground))" strokeWidth="0.75" strokeDasharray="3 2" />
          <line x1="280" y1="50" x2="280" y2="290" stroke="hsl(var(--foreground))" strokeWidth="0.75" strokeDasharray="3 2" />
          <text x="250" y="45" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600">
            MEMBRANE
          </text>
          <text x="250" y="305" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
            (lipid bilayer)
          </text>

          {/* Compartment labels */}
          <text x="120" y="35" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">
            {scenario.leftName}
          </text>
          <text x="380" y="35" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">
            {scenario.rightName}
          </text>

          {/* pH badges */}
          <rect x="80" y="55" width="80" height="20" rx="10" fill={pHColor(scenario.leftPH)} opacity="0.85" />
          <text x="120" y="69" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--background))">
            pH {scenario.leftPH.toFixed(1)}
          </text>
          <rect x="340" y="55" width="80" height="20" rx="10" fill={pHColor(scenario.rightPH)} opacity="0.85" />
          <text x="380" y="69" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--background))">
            pH {scenario.rightPH.toFixed(1)}
          </text>

          {/* Molecules — left */}
          {leftMolecules.map((m) => (
            <g key={m.key} style={{ transition: "all 1.4s ease-in-out" }}>
              <circle
                cx={m.x}
                cy={m.y}
                r={m.ionised ? 5 : 4}
                fill={m.ionised ? "hsl(15 85% 55%)" : "hsl(210 70% 55%)"}
                opacity="0.85"
                stroke="hsl(var(--background))"
                strokeWidth="0.5"
              />
              {m.ionised && (
                <text x={m.x} y={m.y + 2} textAnchor="middle" fontSize="6" fill="hsl(var(--background))" fontWeight="700" pointerEvents="none">
                  {scenario.drugType === "base" ? "+" : "−"}
                </text>
              )}
            </g>
          ))}
          {/* Molecules — right */}
          {rightMolecules.map((m) => (
            <g key={m.key} style={{ transition: "all 1.4s ease-in-out" }}>
              <circle
                cx={m.x}
                cy={m.y}
                r={m.ionised ? 5 : 4}
                fill={m.ionised ? "hsl(15 85% 55%)" : "hsl(210 70% 55%)"}
                opacity="0.85"
                stroke="hsl(var(--background))"
                strokeWidth="0.5"
              />
              {m.ionised && (
                <text x={m.x} y={m.y + 2} textAnchor="middle" fontSize="6" fill="hsl(var(--background))" fontWeight="700" pointerEvents="none">
                  {scenario.drugType === "base" ? "+" : "−"}
                </text>
              )}
            </g>
          ))}

          {/* Crossing molecules (unionised — animated) */}
          {running && crossing.map((c) => (
            <circle
              key={c.key}
              r="4"
              fill="hsl(210 70% 55%)"
              opacity="0.9"
              stroke="hsl(var(--background))"
              strokeWidth="0.5"
            >
              <animate
                attributeName="cx"
                from={c.dir === "ltr" ? 215 : 285}
                to={c.dir === "ltr" ? 285 : 215}
                dur="2s"
                begin={`${c.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={`${c.y};${c.y - 6};${c.y + 4};${c.y}`}
                dur="2s"
                begin={`${c.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;0.95;0.95;0"
                dur="2s"
                begin={`${c.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Trapped-side glow indicator */}
          <rect
            x={trappedSide === "left" ? 20 : 280}
            y="50"
            width="200"
            height="240"
            rx="8"
            fill="none"
            stroke="hsl(var(--destructive))"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.7"
          >
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </rect>

          {/* Concentration bars at bottom */}
          <text x="250" y="320" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600">
            Equilibrium ratio (R:L) = {ratio >= 1 ? ratio.toFixed(2) : (1 / ratio).toFixed(2)}× {ratio >= 1 ? "trapped right" : "trapped left"}
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-2 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: "hsl(210 70% 55%)" }} />
          <span>Unionised (lipid-soluble, crosses membrane)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: "hsl(15 85% 55%)" }} />
          <span>Ionised ({scenario.drugType === "base" ? "BH⁺" : "A⁻"} — trapped)</span>
        </div>
      </div>

      {/* Scenario info card */}
      <div className="mt-3 p-3 rounded-lg border-2 border-primary/30 bg-primary/5">
        <p className="text-sm font-semibold text-foreground mb-1">
          {scenario.drugName} <span className="text-xs text-muted-foreground">(pKa {scenario.pKa})</span>
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">{scenario.teaching}</p>
        <div className="grid grid-cols-3 gap-2 mt-2 text-[11px]">
          <div className="p-2 rounded bg-card border border-border">
            <p className="text-muted-foreground">{scenario.leftName.split(" ")[0]} unionised</p>
            <p className="font-bold text-foreground">{(leftFracU * 100).toFixed(1)}%</p>
          </div>
          <div className="p-2 rounded bg-card border border-border">
            <p className="text-muted-foreground">{scenario.rightName.split(" ")[0]} unionised</p>
            <p className="font-bold text-foreground">{(rightFracU * 100).toFixed(1)}%</p>
          </div>
          <div className="p-2 rounded bg-destructive/10 border border-destructive/30">
            <p className="text-muted-foreground">Trapping ratio</p>
            <p className="font-bold text-destructive">
              {(ratio >= 1 ? ratio : 1 / ratio).toFixed(2)}×
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IonTrappingDiagram;

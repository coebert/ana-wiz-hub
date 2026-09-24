import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface GraphData {
  id: string;
  title: string;
  equation: string;
  description: string;
  examples: { name: string; detail: string }[];
  color: string;
  points: { x: number; y: number }[];
}

const W = 320;
const H = 220;
const PAD = 32;
const plotW = W - PAD * 2;
const plotH = H - PAD * 2;

const graphs: GraphData[] = [
  {
    id: "linear",
    title: "Linear",
    equation: "y = kx",
    description: "A straight line through the origin. Output is directly proportional to input.",
    color: "#3B82F6",
    examples: [
      { name: "Ohm's Law (V = IR)", detail: "Voltage increases linearly with current at constant resistance" },
      { name: "Laminar flow (Hagen-Poiseuille)", detail: "Flow ∝ pressure gradient in a rigid tube at constant resistance" },
      { name: "Beer-Lambert Law", detail: "Absorbance is proportional to concentration (at low concentrations)" },
    ],
    points: Array.from({ length: 50 }, (_, i) => {
      const x = i / 49;
      return { x, y: x };
    }),
  },
  {
    id: "quadratic",
    title: "Quadratic / Parabolic",
    equation: "y = x²",
    description: "Curve accelerates upward. Small changes at high values of x produce large changes in y.",
    color: "#8B5CF6",
    examples: [
      { name: "Kinetic energy (½mv²)", detail: "Energy increases with the square of velocity — doubling speed quadruples energy" },
      { name: "Power dissipation (P = I²R)", detail: "Electrical power rises with the square of current" },
      { name: "Turbulent flow", detail: "Pressure drop ∝ flow² in turbulent conditions (Reynolds number >4000)" },
    ],
    points: Array.from({ length: 50 }, (_, i) => {
      const x = i / 49;
      return { x, y: x * x };
    }),
  },
  {
    id: "sqrt",
    title: "Square Root",
    equation: "y = √x",
    description: "Rapid initial rise that progressively flattens. The inverse of a quadratic.",
    color: "#10B981",
    examples: [
      { name: "Graham's Law of Diffusion", detail: "Rate of diffusion ∝ 1/√(molecular weight) — lighter gases diffuse faster" },
      { name: "Rotameter reading", detail: "At high flows, the annular orifice behaves as an orifice and flow ∝ √(pressure drop)" },
      { name: "Fick's Law (simplified)", detail: "Diffusion rate rises with concentration gradient but plateaus as membrane saturates" },
    ],
    points: Array.from({ length: 50 }, (_, i) => {
      const x = i / 49;
      return { x, y: Math.sqrt(x) };
    }),
  },
  {
    id: "exp-decay",
    title: "Exponential Decay",
    equation: "y = e⁻ᵏˣ",
    description: "Starts high and falls towards zero. The rate of decline is proportional to the current value — a constant fraction is lost per unit time.",
    color: "#EF4444",
    examples: [
      { name: "Drug elimination (first-order)", detail: "Plasma concentration falls exponentially — 50% removed each half-life" },
      { name: "Nitrogen washout", detail: "Alveolar N₂ falls exponentially during preoxygenation with 100% O₂" },
      { name: "Radioactive decay", detail: "Activity falls by a constant fraction per half-life" },
      { name: "Capacitor discharge", detail: "Voltage across a capacitor decays exponentially through a resistor (τ = RC)" },
    ],
    points: Array.from({ length: 50 }, (_, i) => {
      const x = i / 49;
      return { x, y: Math.exp(-3 * x) };
    }),
  },
  {
    id: "neg-exp-rise",
    title: "Negative Exponential Rise",
    equation: "y = 1 − e⁻ᵏˣ",
    description: "Rises rapidly at first then asymptotically approaches a maximum. The 'wash-in' curve — the complement of exponential decay.",
    color: "#F59E0B",
    examples: [
      { name: "Preoxygenation (FₑO₂ rise)", detail: "End-tidal O₂ rises towards 1.0 following a wash-in curve" },
      { name: "Volatile agent wash-in (FA/FI)", detail: "Alveolar concentration rises exponentially towards the inspired concentration" },
      { name: "Capacitor charging", detail: "Voltage rises as V(t) = V₀(1 − e⁻ᵗ/ᴿᶜ) — 63% charged after one time constant" },
      { name: "Tissue drug uptake", detail: "Tissue concentration rises towards plasma in a wash-in fashion" },
    ],
    points: Array.from({ length: 50 }, (_, i) => {
      const x = i / 49;
      return { x, y: 1 - Math.exp(-3.5 * x) };
    }),
  },
  {
    id: "hyperbolic",
    title: "Rectangular Hyperbola",
    equation: "y = 1/x",
    description: "As x increases, y decreases — and vice versa. The product xy remains constant.",
    color: "#EC4899",
    examples: [
      { name: "Boyle's Law (PV = constant)", detail: "At constant temperature, halving volume doubles pressure" },
      { name: "Clearance and half-life", detail: "t½ = 0.693 × Vd / CL — at constant Vd, doubling clearance halves the half-life" },
      { name: "Laplace's Law (simplified)", detail: "Wall tension = Pr — for a given pressure, larger radius means greater wall tension (inverse for small radii)" },
    ],
    points: Array.from({ length: 50 }, (_, i) => {
      const x = 0.15 + (i / 49) * 0.85;
      return { x, y: Math.min(1, 0.15 / x) };
    }),
  },
  {
    id: "sigmoid",
    title: "Sigmoid (S-shaped)",
    equation: "y = 1/(1 + e⁻ˣ)",
    description: "Flat at low values, steep in the middle, flat again at high values. Characterises cooperative or threshold phenomena.",
    color: "#06B6D4",
    examples: [
      { name: "Oxygen-Haemoglobin Dissociation Curve", detail: "Cooperative O₂ binding creates the sigmoid shape — steep between 3.5–8 kPa" },
      { name: "Dose-response curve", detail: "Log dose vs response is sigmoid — EC₅₀ at the midpoint of the steep portion" },
      { name: "Hill equation", detail: "Fractional occupancy = [A]ⁿ / (EC₅₀ⁿ + [A]ⁿ) — Hill coefficient n determines steepness" },
    ],
    points: Array.from({ length: 50 }, (_, i) => {
      const x = -6 + (i / 49) * 12;
      const normX = i / 49;
      return { normX, x, y: 1 / (1 + Math.exp(-x)) };
    }).map((p) => ({ x: p.normX, y: p.y })),
  },
  {
    id: "log",
    title: "Logarithmic",
    equation: "y = ln(x)",
    description: "Rises steeply at first then progressively flattens. Compresses large ranges into manageable scales.",
    color: "#84CC16",
    examples: [
      { name: "pH scale", detail: "pH = −log₁₀[H⁺] — a logarithmic compression of hydrogen ion concentration" },
      { name: "Decibel scale", detail: "dB = 10 log₁₀(I/I₀) — logarithmic compression of sound intensity" },
      { name: "Henderson-Hasselbalch", detail: "pH = pKa + log([A⁻]/[HA]) — the ratio is expressed logarithmically" },
    ],
    points: Array.from({ length: 50 }, (_, i) => {
      const x = 0.05 + (i / 49) * 0.95;
      const rawY = Math.log(x * 5 + 0.5);
      return { x, y: rawY };
    }).map((p, _, arr) => {
      const minY = Math.min(...arr.map((a) => a.y));
      const maxY = Math.max(...arr.map((a) => a.y));
      return { x: p.x, y: (p.y - minY) / (maxY - minY) };
    }),
  },
  {
    id: "biexp",
    title: "Bi-exponential Decay",
    equation: "y = Ae⁻ᵅˣ + Be⁻ᵝˣ",
    description: "Two superimposed exponential decays — a fast initial phase (distribution) followed by a slower terminal phase (elimination).",
    color: "#F97316",
    examples: [
      { name: "Two-compartment drug model", detail: "After IV bolus: rapid distribution phase (α) then slower elimination phase (β)" },
      { name: "Propofol pharmacokinetics", detail: "Rapid redistribution from vessel-rich tissues, then slow elimination from fat" },
      { name: "Context-sensitive half-time", detail: "Duration of infusion affects the relative contribution of each exponential phase" },
    ],
    points: Array.from({ length: 50 }, (_, i) => {
      const x = i / 49;
      return { x, y: 0.6 * Math.exp(-8 * x) + 0.4 * Math.exp(-1.5 * x) };
    }),
  },
];

const toSVG = (points: { x: number; y: number }[]) => {
  return points
    .map((p) => {
      const sx = PAD + p.x * plotW;
      const sy = PAD + (1 - p.y) * plotH;
      return `${sx},${sy}`;
    })
    .join(" ");
};

type Mode = "single" | "compare";

const GraphChip = ({
  g,
  active,
  onClick,
  compareColor,
}: {
  g: GraphData;
  active: boolean;
  onClick: () => void;
  compareColor?: string;
}) => (
  <button
    onClick={onClick}
    className={`p-2.5 rounded-lg border text-left transition-all w-full ${
      active
        ? "ring-1 ring-primary/40"
        : "border-border bg-card hover:border-primary/40"
    }`}
    style={active ? { borderColor: compareColor || g.color, backgroundColor: `${compareColor || g.color}15` } : undefined}
  >
    <div className="flex items-center gap-2 mb-0.5">
      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: compareColor || g.color }} />
      <p className="font-semibold text-foreground text-xs leading-tight">{g.title}</p>
    </div>
    <p className="text-[10px] text-muted-foreground font-mono">{g.equation}</p>
  </button>
);

const SharedAxes = ({ curves }: { curves: GraphData[] }) => (
  <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[320px] mx-auto bg-background rounded-lg border border-border">
    {/* Grid */}
    {[0.25, 0.5, 0.75].map((f) => (
      <g key={f}>
        <line x1={PAD} y1={PAD + (1 - f) * plotH} x2={PAD + plotW} y2={PAD + (1 - f) * plotH}
          stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray="3,3" />
        <line x1={PAD + f * plotW} y1={PAD} x2={PAD + f * plotW} y2={PAD + plotH}
          stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray="3,3" />
      </g>
    ))}
    {/* Axes */}
    <line x1={PAD} y1={PAD} x2={PAD} y2={PAD + plotH} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
    <line x1={PAD} y1={PAD + plotH} x2={PAD + plotW} y2={PAD + plotH} stroke="hsl(var(--foreground))" strokeWidth={1.5} />
    <text x={PAD + plotW / 2} y={H - 4} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif">x</text>
    <text x={8} y={PAD + plotH / 2} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground))" fontFamily="Inter, sans-serif" transform={`rotate(-90 8 ${PAD + plotH / 2})`}>y</text>
    <polygon points={`${PAD - 4},${PAD + 4} ${PAD},${PAD - 4} ${PAD + 4},${PAD + 4}`} fill="hsl(var(--foreground))" />
    <polygon points={`${PAD + plotW - 4},${PAD + plotH - 4} ${PAD + plotW + 4},${PAD + plotH} ${PAD + plotW - 4},${PAD + plotH + 4}`} fill="hsl(var(--foreground))" />
    {/* Curves */}
    {curves.map((g) => (
      <polyline key={g.id} points={toSVG(g.points)} fill="none" stroke={g.color}
        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    ))}
    {/* Equation labels */}
    {curves.map((g, i) => (
      <text key={g.id} x={PAD + plotW - 4} y={PAD + 14 + i * 16} textAnchor="end"
        fontSize={11} fontFamily="monospace" fill={g.color} fontWeight="bold">
        {g.equation}
      </text>
    ))}
  </svg>
);

const MathConceptsDiagram = () => {
  const [mode, setMode] = useState<Mode>("single");
  const [selectedId, setSelectedId] = useState<string>("linear");
  const [compareIds, setCompareIds] = useState<[string, string]>(["linear", "quadratic"]);

  const selected = graphs.find((g) => g.id === selectedId) || graphs[0];
  const compareGraphs = compareIds.map((id) => graphs.find((g) => g.id === id)!).filter(Boolean);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev[0] === id) return prev; // keep at least first
      if (prev[1] === id) return [prev[0], prev[0]]; // deselect second → duplicate (handled below)
      // Replace the second selection
      return [prev[0], id];
    });
  };

  const setFirstCompare = (id: string) => {
    setCompareIds((prev) => (prev[1] === id ? [id, prev[0]] : [id, prev[1]]));
  };

  return (
    <DiagramFigure
      id="math-concepts-diagram"
      title="Math concepts"
      description="Math concepts: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="space-y-5">
        {/* Mode toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("single")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "single"
                ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            Single View
          </button>
          <button
            onClick={() => setMode("compare")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === "compare"
                ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            Compare Two
          </button>
        </div>
  
        {mode === "single" ? (
          <>
            {/* Grid of selectable graph types */}
            <div className="grid grid-cols-3 gap-2">
              {graphs.map((g) => (
                <GraphChip key={g.id} g={g} active={g.id === selectedId} onClick={() => setSelectedId(g.id)} />
              ))}
            </div>
  
            {/* Selected graph detail */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <SharedAxes curves={[selected]} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground mb-1">{selected.title}</h3>
                  <p className="text-xs font-mono text-primary mb-2">{selected.equation}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
                </div>
              </div>
  
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Clinical & Physiological Examples</h4>
                <div className="space-y-2">
                  {selected.examples.map((ex, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-secondary/30 border border-border">
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: selected.color }} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{ex.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{ex.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Compare mode */}
            <p className="text-sm text-muted-foreground">Select two graph types to overlay on the same axes.</p>
  
            <div className="grid grid-cols-2 gap-4">
              {/* Graph A selector */}
              <div>
                <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: compareGraphs[0]?.color }} />
                  Graph A
                </p>
                <div className="grid grid-cols-1 gap-1.5 max-h-[280px] overflow-y-auto pr-1">
                  {graphs.map((g) => (
                    <GraphChip key={g.id} g={g} active={compareIds[0] === g.id}
                      onClick={() => setFirstCompare(g.id)} compareColor={compareIds[0] === g.id ? g.color : undefined} />
                  ))}
                </div>
              </div>
              {/* Graph B selector */}
              <div>
                <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: compareGraphs[1]?.color }} />
                  Graph B
                </p>
                <div className="grid grid-cols-1 gap-1.5 max-h-[280px] overflow-y-auto pr-1">
                  {graphs.map((g) => (
                    <GraphChip key={g.id} g={g} active={compareIds[1] === g.id}
                      onClick={() => toggleCompare(g.id)} compareColor={compareIds[1] === g.id ? g.color : undefined} />
                  ))}
                </div>
              </div>
            </div>
  
            {/* Overlay chart */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="mx-auto">
                <SharedAxes curves={compareGraphs} />
              </div>
  
              {/* Side-by-side details */}
              <div className="grid sm:grid-cols-2 gap-4">
                {compareGraphs.map((g) => (
                  <div key={g.id} className="p-4 rounded-lg border border-border" style={{ borderColor: `${g.color}40` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: g.color }} />
                      <h4 className="font-bold text-foreground text-sm">{g.title}</h4>
                    </div>
                    <p className="text-xs font-mono mb-2" style={{ color: g.color }}>{g.equation}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{g.description}</p>
                    <div className="space-y-1.5">
                      {g.examples.slice(0, 2).map((ex, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: g.color }} />
                          <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">{ex.name}</span> — {ex.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Comparison insight */}
              {compareIds[0] !== compareIds[1] && (
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-xs font-semibold text-primary mb-1">Comparison Insight</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {getComparisonInsight(compareIds[0], compareIds[1])}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DiagramFigure>
  );
};

function getComparisonInsight(a: string, b: string): string {
  const pair = [a, b].sort().join("+");
  const insights: Record<string, string> = {
    "exp-decay+neg-exp-rise": "These are complementary curves — exponential decay and negative exponential rise are mirror images. If y₁ = e⁻ᵏˣ then y₂ = 1 − e⁻ᵏˣ. At any point x, y₁ + y₂ = 1. Drug washout follows decay while wash-in follows the rising curve.",
    "linear+quadratic": "At low values of x the curves are similar, but the quadratic diverges rapidly at higher values. This is why doubling flow rate in turbulent conditions causes a fourfold increase in pressure drop, while laminar flow increases linearly.",
    "linear+sqrt": "The square root curve rises faster initially but flattens, while the linear continues at the same rate. They intersect at x = 1. This difference explains why rotameter behaviour changes between low flows (viscosity-dependent, linear) and high flows (density-dependent, √).",
    "quadratic+sqrt": "These are inverse functions — y = x² and y = √x are reflections about y = x. The quadratic accelerates while the square root decelerates. Together they illustrate how energy (∝v²) and diffusion rate (∝1/√MW) respond to their variables.",
    "exp-decay+biexp": "Bi-exponential decay starts steeper (distribution phase) then converges with mono-exponential decay. On a semi-log plot, mono-exponential gives one straight line while bi-exponential gives two. This is the basis of two-compartment pharmacokinetic modelling.",
    "hyperbolic+sigmoid": "The hyperbola has no inflection point and approaches zero asymptotically, while the sigmoid has a steep central transition. Myoglobin (Hill n=1) follows a hyperbola; haemoglobin (Hill n=2.7) follows a sigmoid — cooperativity creates the S-shape.",
    "log+sigmoid": "Both curves flatten at high x, but the logarithmic rises from zero while the sigmoid transitions between two plateaus. Plotting dose-response on a log scale converts the sigmoid into a more linear central portion, making EC₅₀ comparison easier.",
  };
  return insights[pair] || `Compare how ${graphs.find(g => g.id === a)?.title} (${graphs.find(g => g.id === a)?.equation}) and ${graphs.find(g => g.id === b)?.title} (${graphs.find(g => g.id === b)?.equation}) differ in shape. Notice where they intersect, which rises faster initially, and which dominates at higher values of x.`;
}

export default MathConceptsDiagram;

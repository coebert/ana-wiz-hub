import { useEffect, useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated diagrams illustrating two N₂O-related phenomena:
 *  1. Second Gas Effect (induction): rapid uptake of large-volume N₂O concentrates
 *     the companion volatile in a shrinking alveolar gas pool → faster FA/FI rise.
 *  2. Diffusion Hypoxia (emergence): rapid offloading of N₂O floods the alveoli,
 *     diluting alveolar O₂ → transient hypoxia unless 100% O₂ is given.
 *
 * Pure CSS/SVG animations — driven by an internal step counter so each phase is
 * clearly visualised. Styled with semantic HSL tokens.
 */

const ALVEOLUS_CX = 110;
const ALVEOLUS_CY = 110;
const ALVEOLUS_R = 78;

type Mode = "second-gas" | "diffusion-hypoxia";

interface MoleculeProps {
  cx: number;
  cy: number;
  fill: string;
  label?: string;
  delay: number;
  /** "in" = enters alveolus from above; "out" = leaves alveolus into capillary */
  direction: "in" | "out" | "static";
}

const Molecule = ({ cx, cy, fill, label, delay, direction }: MoleculeProps) => {
  const animClass =
    direction === "in"
      ? "anim-into-alveolus"
      : direction === "out"
      ? "anim-out-to-blood"
      : "";
  return (
    <g style={{ animationDelay: `${delay}ms` }} className={animClass}>
      <circle cx={cx} cy={cy} r={6} fill={fill} stroke="hsl(var(--background))" strokeWidth={0.75} />
      {label && (
        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          className="text-[6px] font-bold fill-background pointer-events-none select-none"
        >
          {label}
        </text>
      )}
    </g>
  );
};

const SecondGasEffectDiagram = () => {
  const [mode, setMode] = useState<Mode>("second-gas");
  const [step, setStep] = useState(0);

  // 0 = start, 1 = mid, 2 = end. Cycle every ~3.5s.
  useEffect(() => {
    setStep(0);
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 1800);
    return () => clearInterval(id);
  }, [mode]);

  const isSecondGas = mode === "second-gas";

  // Molecule counts shift with step
  const n2oInAlveolus = isSecondGas ? [12, 7, 3][step] : [3, 7, 11][step];
  const volatileInAlveolus = isSecondGas ? [3, 4, 5][step] : 4;
  const o2InAlveolus = isSecondGas ? 4 : [10, 6, 3][step];
  const n2oInBlood = isSecondGas ? [0, 5, 9][step] : [10, 6, 2][step];

  // Generate molecule positions inside alveolus (cluster pattern)
  const positions = (count: number, seed: number) => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = ((i * 137.5 + seed * 40) * Math.PI) / 180;
      const r = 22 + ((i * 9 + seed * 3) % 35);
      pts.push({
        x: ALVEOLUS_CX + r * Math.cos(angle),
        y: ALVEOLUS_CY + r * Math.sin(angle),
      });
    }
    return pts;
  };

  const n2oPositions = positions(n2oInAlveolus, 1);
  const volatilePositions = positions(volatileInAlveolus, 2);
  const o2Positions = positions(o2InAlveolus, 3);

  // Capillary blood molecules
  const bloodPositions = (count: number) => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: 30 + ((i * 17) % 230),
        y: 215 + ((i * 7) % 18),
      });
    }
    return pts;
  };
  const n2oBloodPositions = bloodPositions(n2oInBlood);

  const stepLabels = isSecondGas
    ? [
        "1. A high inspired fraction of N₂O (≈70%) is delivered with a small fraction of volatile (the 'second gas').",
        "2. N₂O is taken up rapidly by pulmonary blood (≈1 L·min⁻¹ early on); the lost alveolar volume is replenished by augmented tracheal inflow of the same fresh-gas mixture.",
        "3. Two mechanisms act together — a concentrating effect (volatile concentrated in a smaller residual gas volume) plus the extra inspired volatile drawn in — so FA/FI of the second gas rises faster than it would alone.",
      ]
    : [
        "1. N₂O is switched off at emergence while blood remains saturated with N₂O from the case.",
        "2. N₂O moves down its partial-pressure gradient from blood into the alveolus in large volumes (the reverse of uptake).",
        "3. This wave of N₂O dilutes alveolar O₂ and CO₂, lowering PAO₂ and depressing ventilation — a transient fall in SpO₂ may occur in the first 5–10 min unless 100% O₂ is given.",
      ];

  return (
    <DiagramFigure
      id="second-gas-effect-diagram"
      title="Second gas effect"
      description="Auto-generated wrapper for the Second gas effect anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 space-y-4">
        <style>{`
          @keyframes pulse-shrink {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.92); }
          }
          @keyframes pulse-expand {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes drift-down {
            0% { transform: translateY(-10px); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes drift-out {
            0% { transform: translate(0,0); opacity: 1; }
            100% { transform: translate(0, 100px); opacity: 0.2; }
          }
          @keyframes bg-pulse {
            0%, 100% { fill-opacity: 0.18; }
            50% { fill-opacity: 0.32; }
          }
          .alveolus-shrink { animation: pulse-shrink 3.6s ease-in-out infinite; transform-origin: ${ALVEOLUS_CX}px ${ALVEOLUS_CY}px; }
          .alveolus-flood  { animation: pulse-expand 3.6s ease-in-out infinite; transform-origin: ${ALVEOLUS_CX}px ${ALVEOLUS_CY}px; }
          .anim-into-alveolus { animation: drift-down 1.8s ease-out both; }
          .anim-out-to-blood  { animation: drift-out 1.8s ease-in both; }
          .bg-shade { animation: bg-pulse 3.6s ease-in-out infinite; }
        `}</style>
  
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          {/* Mode selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => setMode("second-gas")}
              aria-pressed={mode === "second-gas"}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                mode === "second-gas"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Second Gas Effect (induction)
            </button>
            <button
              type="button"
              onClick={() => setMode("diffusion-hypoxia")}
              aria-pressed={mode === "diffusion-hypoxia"}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                mode === "diffusion-hypoxia"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              Diffusion Hypoxia (emergence)
            </button>
          </div>
  
          <h3 className="text-base font-semibold text-foreground">
            {isSecondGas ? "Second Gas Effect — alveolar concentration of volatile" : "Diffusion Hypoxia — N₂O washout dilutes alveolar O₂"}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {isSecondGas
              ? "Rapid uptake of nitrous oxide concentrates a co-administered volatile and augments tracheal inflow, accelerating the rise of FA/FI of the 'second gas'."
              : "At emergence, large volumes of N₂O leave the blood and dilute alveolar O₂ and CO₂ — give 100% O₂ for the first 5–10 min."}
          </p>
  
          <svg
            viewBox="0 0 280 260"
            className="w-full max-w-xl mx-auto"
            role="img"
            aria-label={isSecondGas ? "Animated diagram of the second gas effect" : "Animated diagram of diffusion hypoxia"}
          >
            <defs>
              <radialGradient id="sge-alveolusGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="hsl(var(--pharmacology, var(--primary)))" stopOpacity="0.18" />
                <stop offset="100%" stopColor="hsl(var(--pharmacology, var(--primary)))" stopOpacity="0.02" />
              </radialGradient>
              <linearGradient id="sge-bloodGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0 60% 55%)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="hsl(0 60% 35%)" stopOpacity="0.45" />
              </linearGradient>
            </defs>
  
            {/* Trachea / inflow arrow (induction) or outflow arrow (emergence) */}
            <g>
              <line
                x1={ALVEOLUS_CX}
                y1={5}
                x2={ALVEOLUS_CX}
                y2={ALVEOLUS_CY - ALVEOLUS_R - 4}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                strokeDasharray="3 3"
                opacity={0.55}
              />
              <text x={ALVEOLUS_CX + 6} y={16} className="text-[8px] fill-muted-foreground">
                {isSecondGas ? "Inspired (N₂O 70% + volatile)" : "Expired"}
              </text>
              <polygon
                points={
                  isSecondGas
                    ? `${ALVEOLUS_CX - 4},${ALVEOLUS_CY - ALVEOLUS_R - 8} ${ALVEOLUS_CX + 4},${ALVEOLUS_CY - ALVEOLUS_R - 8} ${ALVEOLUS_CX},${ALVEOLUS_CY - ALVEOLUS_R - 2}`
                    : `${ALVEOLUS_CX - 4},${ALVEOLUS_CY - ALVEOLUS_R - 2} ${ALVEOLUS_CX + 4},${ALVEOLUS_CY - ALVEOLUS_R - 2} ${ALVEOLUS_CX},${ALVEOLUS_CY - ALVEOLUS_R - 8}`
                }
                fill="hsl(var(--muted-foreground))"
                opacity={0.7}
              />
            </g>
  
            {/* Alveolus */}
            <g className={isSecondGas ? "alveolus-shrink" : "alveolus-flood"}>
              <circle
                cx={ALVEOLUS_CX}
                cy={ALVEOLUS_CY}
                r={ALVEOLUS_R}
                fill="url(#sge-alveolusGrad)"
                stroke="hsl(var(--border))"
                strokeWidth={1.5}
              />
              <circle
                className="bg-shade"
                cx={ALVEOLUS_CX}
                cy={ALVEOLUS_CY}
                r={ALVEOLUS_R - 2}
                fill="hsl(var(--pharmacology, var(--primary)))"
                fillOpacity={0.18}
              />
              <text x={ALVEOLUS_CX} y={ALVEOLUS_CY - ALVEOLUS_R - 14} textAnchor="middle" className="text-[9px] font-semibold fill-foreground">
                ALVEOLUS
              </text>
  
              {/* Molecules inside alveolus */}
              {n2oPositions.map((p, i) => (
                <Molecule
                  key={`n-${step}-${i}`}
                  cx={p.x}
                  cy={p.y}
                  fill="hsl(220 70% 55%)"
                  label="N"
                  delay={i * 40}
                  direction={isSecondGas ? "in" : "in"}
                />
              ))}
              {volatilePositions.map((p, i) => (
                <Molecule
                  key={`v-${step}-${i}`}
                  cx={p.x}
                  cy={p.y}
                  fill="hsl(280 65% 55%)"
                  label="V"
                  delay={400 + i * 60}
                  direction="static"
                />
              ))}
              {o2Positions.map((p, i) => (
                <Molecule
                  key={`o-${step}-${i}`}
                  cx={p.x}
                  cy={p.y}
                  fill="hsl(155 60% 45%)"
                  label="O"
                  delay={i * 50}
                  direction="static"
                />
              ))}
            </g>
  
            {/* Alveolar-capillary membrane */}
            <line
              x1={20}
              y1={ALVEOLUS_CY + ALVEOLUS_R + 8}
              x2={260}
              y2={ALVEOLUS_CY + ALVEOLUS_R + 8}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              strokeDasharray="2 3"
            />
            <text x={264} y={ALVEOLUS_CY + ALVEOLUS_R + 11} className="text-[6px] fill-muted-foreground">
              membrane
            </text>
  
            {/* Capillary */}
            <rect
              x={15}
              y={ALVEOLUS_CY + ALVEOLUS_R + 12}
              width={250}
              height={26}
              rx={13}
              fill="url(#sge-bloodGrad)"
              stroke="hsl(0 50% 45%)"
              strokeWidth={1}
            />
            <text x={20} y={ALVEOLUS_CY + ALVEOLUS_R + 24} className="text-[7px] font-semibold fill-foreground">
              PULMONARY CAPILLARY
            </text>
  
            {/* Blood molecules */}
            {n2oBloodPositions.map((p, i) => (
              <circle
                key={`bn-${step}-${i}`}
                cx={p.x}
                cy={p.y}
                r={3.5}
                fill="hsl(220 70% 55%)"
                stroke="hsl(var(--background))"
                strokeWidth={0.5}
              />
            ))}
  
            {/* Direction arrow across membrane */}
            <g>
              {isSecondGas ? (
                <>
                  <line
                    x1={ALVEOLUS_CX}
                    y1={ALVEOLUS_CY + ALVEOLUS_R - 4}
                    x2={ALVEOLUS_CX}
                    y2={ALVEOLUS_CY + ALVEOLUS_R + 22}
                    stroke="hsl(220 70% 55%)"
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`${ALVEOLUS_CX - 4},${ALVEOLUS_CY + ALVEOLUS_R + 18} ${ALVEOLUS_CX + 4},${ALVEOLUS_CY + ALVEOLUS_R + 18} ${ALVEOLUS_CX},${ALVEOLUS_CY + ALVEOLUS_R + 26}`}
                    fill="hsl(220 70% 55%)"
                  />
                  <text x={ALVEOLUS_CX + 8} y={ALVEOLUS_CY + ALVEOLUS_R + 18} className="text-[7px] fill-foreground font-medium">
                    N₂O uptake
                  </text>
                </>
              ) : (
                <>
                  <line
                    x1={ALVEOLUS_CX}
                    y1={ALVEOLUS_CY + ALVEOLUS_R + 22}
                    x2={ALVEOLUS_CX}
                    y2={ALVEOLUS_CY + ALVEOLUS_R - 4}
                    stroke="hsl(220 70% 55%)"
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`${ALVEOLUS_CX - 4},${ALVEOLUS_CY + ALVEOLUS_R + 2} ${ALVEOLUS_CX + 4},${ALVEOLUS_CY + ALVEOLUS_R + 2} ${ALVEOLUS_CX},${ALVEOLUS_CY + ALVEOLUS_R - 6}`}
                    fill="hsl(220 70% 55%)"
                  />
                  <text x={ALVEOLUS_CX + 8} y={ALVEOLUS_CY + ALVEOLUS_R + 4} className="text-[7px] fill-foreground font-medium">
                    N₂O washout
                  </text>
                </>
              )}
            </g>
          </svg>
  
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-3 justify-center text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "hsl(220 70% 55%)" }} /> N₂O
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "hsl(280 65% 55%)" }} /> Volatile (e.g. sevoflurane)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full" style={{ background: "hsl(155 60% 45%)" }} /> O₂
            </span>
          </div>
  
          {/* Step caption */}
          <div className="mt-3 p-3 rounded-lg border border-border bg-background/80 min-h-[58px]">
            <p className="text-xs text-foreground leading-relaxed">
              <span className="font-semibold text-primary">Step {step + 1}.</span>{" "}
              {stepLabels[step]}
            </p>
          </div>
  
          {/* Clinical takeaway */}
          <div className="mt-3 p-3 rounded-lg border-l-4 border-primary bg-primary/5">
            <p className="text-xs text-foreground">
              <span className="font-semibold">Clinical:</span>{" "}
              {isSecondGas
                ? "Using ≈70% N₂O speeds the rise of FA/FI of the co-administered volatile (concentrating effect + augmented inflow) — clinically modest with modern low-solubility agents (sevoflurane, desflurane) but more pronounced with higher-BGPC agents."
                : "After stopping N₂O, deliver 100% O₂ for the first 5–10 minutes of emergence to offset diffusion hypoxia, particularly in the elderly or patients with limited respiratory reserve."}
            </p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default SecondGasEffectDiagram;

import { useState, useEffect, useCallback } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

interface StepData {
  title: string;
  description: string;
  // Osmolality values at each level: [cortex, outerMedulla, innerMedulla, papilla]
  descending: number[];
  ascending: number[];
  interstitium: number[];
  collectingDuct?: number[];
  highlight: "desc" | "asc" | "both" | "interstitium" | "cd" | "all";
}

const steps: StepData[] = [
  {
    title: "Step 1 — Starting Point",
    description: "Filtrate enters the loop of Henle from the PCT at ~300 mOsm/kg. Initially, the interstitium, descending limb, and ascending limb are all isotonic (300 mOsm/kg). No gradient exists yet.",
    descending: [300, 300, 300, 300],
    ascending: [300, 300, 300, 300],
    interstitium: [300, 300, 300, 300],
    highlight: "all",
  },
  {
    title: "Step 2 — Active Pumping (TAL)",
    description: "The thick ascending limb actively pumps NaCl into the interstitium via NKCC2 (target of furosemide). This creates a 200 mOsm/kg gradient at each horizontal level. The ascending limb becomes dilute (200) while the interstitium rises (400). The ascending limb is water-impermeable — no water follows.",
    descending: [300, 300, 300, 300],
    ascending: [200, 200, 200, 200],
    interstitium: [300, 400, 400, 400],
    highlight: "asc",
  },
  {
    title: "Step 3 — Water Equilibration (Descending Limb)",
    description: "The descending limb is freely permeable to water (AQP1) but impermeable to solutes. Water moves out by osmosis into the hypertonic interstitium, concentrating the descending limb fluid to match the interstitium. Equilibrium is re-established across the descending limb wall.",
    descending: [300, 400, 400, 400],
    ascending: [200, 200, 200, 200],
    interstitium: [300, 400, 400, 400],
    highlight: "desc",
  },
  {
    title: "Step 4 — Flow Shift & Repeat Pumping",
    description: "Tubular fluid flows forward: concentrated fluid from the descending limb enters the ascending limb at the hairpin turn. The ascending limb again pumps out NaCl, maintaining the 200 mOsm/kg single-effect gradient. With each cycle, the interstitial osmolality at deeper levels increases incrementally.",
    descending: [300, 350, 400, 500],
    ascending: [200, 200, 250, 300],
    interstitium: [300, 400, 500, 500],
    highlight: "both",
  },
  {
    title: "Step 5 — Gradient Multiplication",
    description: "After many cycles, the single effect (200 mOsm/kg difference at each level) is 'multiplied' along the length of the loop. The interstitial gradient now ranges from 300 mOsm/kg in the cortex to ~900 mOsm/kg at the papilla tip. The descending limb equilibrates with the interstitium at each level.",
    descending: [300, 500, 700, 900],
    ascending: [100, 300, 500, 700],
    interstitium: [300, 500, 700, 900],
    highlight: "interstitium",
  },
  {
    title: "Step 6 — Steady-State Gradient",
    description: "At steady state, the corticomedullary gradient reaches 300→1200 mOsm/kg. Urea recycling from the medullary collecting duct (UT-A1, ADH-sensitive) contributes ~50% of inner medullary osmolality. The vasa recta act as countercurrent exchangers, preserving the gradient without washing it out.",
    descending: [300, 600, 900, 1200],
    ascending: [100, 400, 700, 1000],
    interstitium: [300, 600, 900, 1200],
    collectingDuct: [300, 600, 900, 1200],
    highlight: "all",
  },
  {
    title: "Step 7 — Collecting Duct (ADH Present)",
    description: "With ADH, the collecting duct becomes permeable to water (AQP2 insertion). As it passes through the hypertonic medulla, water is reabsorbed into the interstitium, concentrating the urine to a maximum of 1200 mOsm/kg. Without ADH, the collecting duct remains impermeable → dilute urine (50 mOsm/kg).",
    descending: [300, 600, 900, 1200],
    ascending: [100, 400, 700, 1000],
    interstitium: [300, 600, 900, 1200],
    collectingDuct: [100, 400, 800, 1200],
    highlight: "cd",
  },
];

const LEVELS = ["Cortex", "Outer Medulla", "Inner Medulla", "Papilla"];

// Animated bar that transitions smoothly
const _AnimatedBar = ({ value, maxValue, color, delay = 0 }: {
  value: number; maxValue: number; color: string; delay?: number;
}) => {
  const [displayWidth, setDisplayWidth] = useState(0);
  const targetWidth = (value / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setDisplayWidth(targetWidth), delay);
    return () => clearTimeout(timer);
  }, [targetWidth, delay]);

  return (
    <div className="relative h-5 rounded-sm overflow-hidden bg-secondary/40">
      <div
        className="absolute inset-y-0 left-0 rounded-sm transition-all duration-700 ease-out"
        style={{ width: `${displayWidth}%`, backgroundColor: color, opacity: 0.6 }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground/90">
        {value}
      </span>
    </div>
  );
};

// Animated water/solute particles
const AnimatedParticles = ({ fromX, fromY, toX, toY, color, count, active, label }: {
  fromX: number; fromY: number; toX: number; toY: number;
  color: string; count: number; active: boolean; label: string;
}) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setTick(t => t + 1), 50);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const phase = ((tick * 2 + i * (360 / count)) % 360) / 360;
        const x = fromX + (toX - fromX) * phase;
        const y = fromY + (toY - fromY) * phase;
        const opacity = phase < 0.1 ? phase * 10 : phase > 0.85 ? (1 - phase) * 6.67 : 0.8;
        return (
          <circle key={i} cx={x} cy={y} r={2.5} fill={color} opacity={opacity} />
        );
      })}
      <text x={(fromX + toX) / 2} y={(fromY + toY) / 2 - 6} fontSize="5" fill={color}
        textAnchor="middle" opacity="0.7" fontWeight="600">{label}</text>
    </>
  );
};

export const CountercurrentMultiplierDiagram = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const step = steps[currentStep];

  const advance = useCallback(() => {
    setCurrentStep(s => {
      if (s >= steps.length - 1) { setIsPlaying(false); return s; }
      return s + 1;
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(advance, 3500);
    return () => clearInterval(timer);
  }, [isPlaying, advance]);

  const descColor = "hsl(200 55% 55%)";
  const ascColor = "hsl(30 60% 50%)";
  const intColor = "hsl(150 50% 45%)";
  const cdColor = "hsl(270 50% 55%)";

  return (
    <DiagramFigure
      id="countercurrent-multiplier-diagram"
      title="Countercurrent multiplier"
      description="Auto-generated wrapper for the Countercurrent multiplier anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4">
        {/* Step navigation */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => { setIsPlaying(!isPlaying); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all bg-primary/15 border-primary/40 text-primary hover:bg-primary/25"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
          <button
            onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-secondary"
          >
            ↺ Reset
          </button>
          <div className="flex gap-1 ml-auto">
            {steps.map((_, i) => (
              <button key={i} onClick={() => { setCurrentStep(i); setIsPlaying(false); }}
                className={`w-7 h-7 rounded-full text-xs font-bold border transition-all ${
                  i === currentStep
                    ? "bg-primary/20 border-primary text-primary"
                    : i < currentStep
                      ? "bg-secondary border-border text-foreground/60"
                      : "bg-secondary/30 border-border text-muted-foreground"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
  
        {/* Main diagram */}
        <div className="bg-card rounded-lg border border-border p-4">
          <svg viewBox="0 0 520 380" className="w-full" role="img" aria-label="Countercurrent multiplier animation">
            <defs>
              <linearGradient id="ccmBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.15" />
                <stop offset="100%" stopColor="hsl(30 40% 40%)" stopOpacity="0.08" />
              </linearGradient>
              {/* Medullary osmotic gradient — intensifies toward the papilla as the gradient builds */}
              <linearGradient id="ccmGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(150 60% 55%)" stopOpacity="0.04" />
                <stop offset="100%" stopColor="hsl(15 75% 50%)" stopOpacity={0.05 + (currentStep / (steps.length - 1)) * 0.22} />
              </linearGradient>
            </defs>
  
            {/* Background zones */}
            <rect x="0" y="0" width="520" height="380" fill="url(#ccmBg)" rx="6" />
            {/* Medullary tonicity overlay (cortex → papilla) */}
            <rect x="0" y="0" width="520" height="380" fill="url(#ccmGradient)" rx="6" />
            {[0, 1, 2, 3].map(i => (
              <g key={`zone-${i}`}>
                <line x1="0" y1={i * 90} x2="520" y2={i * 90}
                  stroke="hsl(var(--border))" strokeWidth={i === 0 ? 0 : 0.5} strokeDasharray="4 4" opacity="0.5" />
                <text x="8" y={i * 90 + 18} fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.5">
                  {LEVELS[i]}
                </text>
              </g>
            ))}
  
            {/* Column headers */}
            <text x="130" y="14" fontSize="8" fill={descColor} textAnchor="middle" fontWeight="700">Descending</text>
            <text x="130" y="24" fontSize="6" fill={descColor} textAnchor="middle" opacity="0.7">AQP1 · H₂O permeable</text>
            <text x="260" y="14" fontSize="8" fill={intColor} textAnchor="middle" fontWeight="700">Interstitium</text>
            <text x="260" y="24" fontSize="6" fill={intColor} textAnchor="middle" opacity="0.7">NaCl + urea pool</text>
            <text x="390" y="14" fontSize="8" fill={ascColor} textAnchor="middle" fontWeight="700">Thick Ascending</text>
            <text x="390" y="24" fontSize="6" fill={ascColor} textAnchor="middle" opacity="0.7">NKCC2 · H₂O impermeable</text>
            {step.collectingDuct && (
              <>
                <text x="478" y="14" fontSize="8" fill={cdColor} textAnchor="middle" fontWeight="700">CD</text>
                <text x="478" y="24" fontSize="6" fill={cdColor} textAnchor="middle" opacity="0.7">AQP2 · ADH</text>
              </>
            )}
  
            {/* Tubes */}
            {[0, 1, 2, 3].map(i => {
              const y = 40 + i * 85;
              const descActive = step.highlight === "desc" || step.highlight === "both" || step.highlight === "all";
              const ascActive = step.highlight === "asc" || step.highlight === "both" || step.highlight === "all";
              const intActive = step.highlight === "interstitium" || step.highlight === "all";
              const cdActive = step.highlight === "cd" || step.highlight === "all";
  
              return (
                    <g key={`row-${i}`}>
                  {/* Descending limb bar */}
                  <rect x="90" y={y} width="80" height="28" rx="3"
                    fill={descColor} fillOpacity={descActive ? 0.15 : 0.06}
                    stroke={descColor} strokeWidth={descActive ? 1.2 : 0.5} />
                  <rect x="92" y={y + 4} width={Math.min(76, (step.descending[i] / 1200) * 76)} height="20" rx="2"
                    fill={descColor} fillOpacity="0.35"
                    className="transition-all duration-700" />
                  <text x="130" y={y + 18} fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">
                    {step.descending[i]}
                  </text>
  
                  {/* Interstitium bar */}
                  <rect x="220" y={y} width="80" height="28" rx="3"
                    fill={intColor} fillOpacity={intActive ? 0.15 : 0.06}
                    stroke={intColor} strokeWidth={intActive ? 1.2 : 0.5} />
                  <rect x="222" y={y + 4} width={Math.min(76, (step.interstitium[i] / 1200) * 76)} height="20" rx="2"
                    fill={intColor} fillOpacity="0.35"
                    className="transition-all duration-700" />
                  <text x="260" y={y + 18} fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">
                    {step.interstitium[i]}
                  </text>
  
                  {/* Ascending limb bar */}
                  <rect x="350" y={y} width="80" height="28" rx="3"
                    fill={ascColor} fillOpacity={ascActive ? 0.15 : 0.06}
                    stroke={ascColor} strokeWidth={ascActive ? 1.2 : 0.5} />
                  <rect x="352" y={y + 4} width={Math.min(76, (step.ascending[i] / 1200) * 76)} height="20" rx="2"
                    fill={ascColor} fillOpacity="0.35"
                    className="transition-all duration-700" />
                  <text x="390" y={y + 18} fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">
                    {step.ascending[i]}
                  </text>
  
                  {/* Collecting duct bar */}
                  {step.collectingDuct && (
                    <>
                      <rect x="450" y={y} width="55" height="28" rx="3"
                        fill={cdColor} fillOpacity={cdActive ? 0.15 : 0.06}
                        stroke={cdColor} strokeWidth={cdActive ? 1.2 : 0.5} />
                      <rect x="452" y={y + 4} width={Math.min(51, (step.collectingDuct[i] / 1200) * 51)} height="20" rx="2"
                        fill={cdColor} fillOpacity="0.35"
                        className="transition-all duration-700" />
                      <text x="477" y={y + 18} fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">
                        {step.collectingDuct[i]}
                      </text>
                    </>
                  )}
  
                  {/* Animated flow arrows */}
                  {/* Ascending → Interstitium (NaCl pumping) */}
                  {(step.highlight === "asc" || step.highlight === "both") && (
                    <AnimatedParticles fromX={350} fromY={y + 14} toX={300} toY={y + 14}
                      color={ascColor} count={3} active={true} label="NaCl→" />
                  )}
  
                  {/* Descending → Interstitium (H₂O out) */}
                  {(step.highlight === "desc" || step.highlight === "both") && step.interstitium[i] > step.descending[i] - 50 && (
                    <AnimatedParticles fromX={170} fromY={y + 14} toX={220} toY={y + 14}
                      color={descColor} count={2} active={true} label="H₂O→" />
                  )}
  
                  {/* CD → Interstitium (H₂O out with ADH) */}
                  {step.highlight === "cd" && step.collectingDuct && (
                    <AnimatedParticles fromX={450} fromY={y + 14} toX={300} toY={y + 14}
                      color={cdColor} count={2} active={true} label="H₂O→" />
                  )}
                </g>
    );
            })}
  
            {/* Flow direction arrows along tubes */}
            <g opacity="0.4">
              {/* Descending: down */}
              <line x1="85" y1="50" x2="85" y2="350" stroke={descColor} strokeWidth="1.5" />
              <polygon points="85,355 82,345 88,345" fill={descColor} />
              <text x="82" y="365" fontSize="5" fill={descColor} textAnchor="middle">↓ flow</text>
  
              {/* Hairpin */}
              <path d="M 85 355 Q 85 375 130 375 Q 440 375 440 355" fill="none"
                stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 2" />
              <text x="260" y="373" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">hairpin turn</text>
  
              {/* Ascending: up */}
              <line x1="440" y1="355" x2="440" y2="50" stroke={ascColor} strokeWidth="1.5" />
              <polygon points="440,45 437,55 443,55" fill={ascColor} />
              <text x="443" y="42" fontSize="5" fill={ascColor} textAnchor="middle">↑ flow</text>
            </g>
  
            {/* Urea recycling annotation — appears once gradient is established (steps 6 & 7) */}
            {step.collectingDuct && (
              <g>
                <path
                  d="M 460 305 C 430 290, 360 285, 320 297"
                  fill="none"
                  stroke="hsl(280 60% 55%)"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  markerEnd="url(#ureaArrow)"
                  opacity="0.85"
                />
                <defs>
                  <marker id="ureaArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="hsl(280 60% 55%)" />
                  </marker>
                </defs>
                <text x="380" y="282" fontSize="7" fill="hsl(280 60% 55%)" fontWeight="700" textAnchor="middle">
                  Urea recycling (UT-A1)
                </text>
                <text x="380" y="291" fontSize="5.5" fill="hsl(280 60% 55%)" opacity="0.75" textAnchor="middle">
                  ADH ↑ permeability → ~50% inner-medullary osmolality
                </text>
              </g>
            )}
  
            {/* Osmolality scale */}
            <text x="515" y="38" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.4">mOsm/kg</text>
          </svg>
        </div>
  
        {/* Step info — fixed min-height so auto-advancing through steps doesn't
            reflow the navigation buttons below it (visible "screen jump"). */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 min-h-[160px] sm:min-h-[140px]" key={currentStep}>
          <h4 className="text-sm font-bold text-foreground mb-1">{step.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
  
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => { setCurrentStep(Math.max(0, currentStep - 1)); setIsPlaying(false); }}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={() => { setCurrentStep(Math.min(steps.length - 1, currentStep + 1)); setIsPlaying(false); }}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 rounded-lg text-xs font-medium border border-primary/40 text-primary hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
  
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: descColor, opacity: 0.5 }} />
            Descending limb (AQP1 — water permeable)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: ascColor, opacity: 0.5 }} />
            Ascending limb (NKCC2 — water impermeable)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: intColor, opacity: 0.5 }} />
            Medullary interstitium
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: cdColor, opacity: 0.5 }} />
            Collecting duct
          </span>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default CountercurrentMultiplierDiagram;

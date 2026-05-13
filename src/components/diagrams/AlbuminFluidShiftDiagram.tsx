import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Fluid = "crystalloid" | "albumin5" | "albumin20";
type Capillary = "healthy" | "septic";

interface Scenario {
  /** Fraction of infused volume retained intravascularly at steady state */
  retained: number;
  /** Fractional change in plasma colloid osmotic pressure (Δπ / baseline) */
  oncoticDelta: number;
  /** Color for the infusion stream */
  color: string;
  label: string;
  description: string;
}

const baselineOncotic = 25; // mmHg, plasma colloid osmotic pressure

const scenarios: Record<Capillary, Record<Fluid, Scenario>> = {
  healthy: {
    crystalloid: {
      retained: 0.25,
      oncoticDelta: -0.15,
      color: "hsl(var(--muted-foreground))",
      label: "Crystalloid (Hartmann's / 0.9% saline)",
      description:
        "Distributes across the whole extracellular space (intravascular ~¼, interstitial ~¾). Dilutes plasma proteins, so plasma oncotic pressure FALLS (~21 mmHg) — favouring further fluid loss to the interstitium.",
    },
    albumin5: {
      retained: 0.8,
      oncoticDelta: 0.0,
      color: "hsl(var(--primary))",
      label: "4–5% Albumin (iso-oncotic)",
      description:
        "Iso-oncotic with plasma — expands plasma volume by ~80% of the infused volume with NO change in plasma oncotic pressure. Pure intravascular volume expansion without dilution.",
    },
    albumin20: {
      retained: 2.5,
      oncoticDelta: 0.6,
      color: "hsl(var(--destructive))",
      label: "20% Albumin (hyper-oncotic)",
      description:
        "Hyper-oncotic — RAISES plasma oncotic pressure (~40 mmHg) and pulls interstitial fluid INTO the vessel. Plasma volume expands by 2–4× the infused volume. Risk of pulmonary oedema if not fluid-deplete.",
    },
  },
  septic: {
    crystalloid: {
      retained: 0.1,
      oncoticDelta: -0.25,
      color: "hsl(var(--muted-foreground))",
      label: "Crystalloid in sepsis",
      description:
        "Glycocalyx is shed and the capillary becomes leaky — albumin and water escape together. Only ~10% of infused crystalloid is retained intravascularly; the rest accumulates as interstitial / tissue oedema.",
    },
    albumin5: {
      retained: 0.4,
      oncoticDelta: -0.1,
      color: "hsl(var(--primary))",
      label: "4–5% Albumin in sepsis",
      description:
        "Capillary leak allows albumin to escape too — intravascular retention falls from ~80% (healthy) to ~40%. Some plasma-volume benefit persists, but the oncotic effect is blunted. Rationale for adding albumin only AFTER large crystalloid load (SSC 2021).",
    },
    albumin20: {
      retained: 1.2,
      oncoticDelta: 0.25,
      color: "hsl(var(--destructive))",
      label: "20% Albumin in sepsis (ALBIOS strategy)",
      description:
        "Hyper-oncotic effect partially preserved — still raises plasma oncotic pressure and recruits interstitial fluid. ALBIOS targeted serum albumin ≥30 g/L. Beware: leaked albumin in the interstitium can WORSEN tissue oedema once leak resolves.",
    },
  },
};

const AlbuminFluidShiftDiagram = () => {
  const [fluid, setFluid] = useState<Fluid>("albumin5");
  const [capillary, setCapillary] = useState<Capillary>("healthy");
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0); // 0 → 1 over the infusion cycle
  const rafRef = useRef<number>();
  const lastRef = useRef<number>(performance.now());

  const scenario = scenarios[capillary][fluid];

  useEffect(() => {
    const tick = (now: number) => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      if (playing) {
        setT((prev) => {
          const next = prev + dt / 4; // 4 s per cycle
          return next > 1 ? 0 : next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const reset = () => {
    setT(0);
    lastRef.current = performance.now();
  };

  // Visual derived values
  const oncoticPressure = baselineOncotic * (1 + scenario.oncoticDelta * Math.min(1, t * 1.2));
  const vesselWidth = 60 + scenario.retained * 40 * Math.min(1, t * 1.2); // visual radius increase
  const interstitialFill =
    capillary === "septic"
      ? 0.35 + (1 - scenario.retained) * 0.25 * Math.min(1, t * 1.2)
      : 0.15 + (1 - scenario.retained) * 0.15 * Math.min(1, t * 1.2);

  // Particle positions: drip from top, into vessel, then leak laterally if septic / crystalloid
  const particles = useMemo(() => {
    const arr: { id: number; offset: number }[] = [];
    for (let i = 0; i < 8; i++) arr.push({ id: i, offset: i / 8 });
    return arr;
  }, []);

  return (
    <DiagramFigure
      id="albumin-fluid-shift-diagram"
      title="Albumin fluid shift"
      description="Auto-generated wrapper for the Albumin fluid shift anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-lg border border-border bg-card p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-1">Albumin vs. Crystalloid — fluid shift & oncotic pressure</h3>
          <p className="text-xs text-muted-foreground">
            Animated comparison of how 1 L of crystalloid, 4–5% albumin and 20% albumin redistribute across the vascular and
            interstitial compartments, with and without the capillary leak of sepsis.
          </p>
        </div>
  
        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Fluid</span>
            <div className="flex gap-1 flex-wrap">
              {(["crystalloid", "albumin5", "albumin20"] as Fluid[]).map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={fluid === f ? "default" : "outline"}
                  onClick={() => {
                    setFluid(f);
                    reset();
                  }}
                >
                  {f === "crystalloid" ? "Crystalloid" : f === "albumin5" ? "4–5% Albumin" : "20% Albumin"}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Capillary</span>
            <div className="flex gap-1">
              {(["healthy", "septic"] as Capillary[]).map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={capillary === c ? "default" : "outline"}
                  onClick={() => {
                    setCapillary(c);
                    reset();
                  }}
                >
                  {c === "healthy" ? "Healthy" : "Septic (leaky)"}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 ml-auto">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Animation</span>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => setPlaying((p) => !p)}>
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </Button>
              <Button size="sm" variant="outline" onClick={reset}>
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
  
        {/* SVG diagram */}
        <div className="rounded-md border border-border bg-background p-2">
          <svg viewBox="0 0 400 240" className="w-full h-auto" role="img" aria-label="Albumin fluid shift diagram">
            {/* Interstitial space background */}
            <rect
              x="20"
              y="40"
              width="360"
              height="180"
              rx="8"
              fill="hsl(var(--muted))"
              opacity={interstitialFill} stroke="hsl(var(--border))" strokeWidth="0.75" />
            <text x="30" y="58" className="fill-muted-foreground" fontSize="10">
              Interstitial space
            </text>
  
            {/* IV bag and drip */}
            <rect x="180" y="6" width="40" height="22" rx="3" fill={scenario.color} opacity="0.85" />
            <line x1="200" y1="28" x2="200" y2="52" stroke="hsl(var(--border))" strokeWidth="1.5" />
            {particles.map((p) => {
              const phase = (t + p.offset) % 1;
              // Particles travel down line into vessel, then if leaky, jitter outward
              const y = 30 + phase * 80;
              const inVessel = y > 100;
              const leakOut =
                inVessel && (fluid === "crystalloid" || capillary === "septic") && phase > 0.55;
              const lateral = leakOut ? (phase - 0.55) * 200 * (p.id % 2 === 0 ? 1 : -1) : 0;
              return (
                    <circle
                  key={p.id}
                  cx={200 + lateral}
                  cy={Math.min(y, 130 + (leakOut ? (phase - 0.55) * 60 : 0))}
                  r={fluid === "albumin20" ? 3.2 : fluid === "albumin5" ? 2.6 : 2}
                  fill={scenario.color}
                  opacity={leakOut ? 0.5 : 0.9}
                />
    );
            })}
  
            {/* Capillary vessel */}
            <ellipse
              cx="200"
              cy="135"
              rx={vesselWidth}
              ry="22"
              fill="hsl(var(--primary) / 0.18)"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeDasharray={capillary === "septic" ? "4 3" : "0"}
            />
            <text x="200" y="139" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">
              Plasma
            </text>
  
            {/* Glycocalyx representation — thinner / dashed if septic */}
            <ellipse
              cx="200"
              cy="135"
              rx={vesselWidth + 4}
              ry="26"
              fill="none"
              stroke="hsl(var(--accent-foreground) / 0.5)"
              strokeWidth={capillary === "septic" ? "0.5" : "1.5"}
              strokeDasharray={capillary === "septic" ? "1 4" : "2 2"}
            />
  
            {/* Pressure gauges */}
            <g transform="translate(30, 170)">
              <text x="0" y="0" className="fill-muted-foreground" fontSize="9">
                Plasma π (mmHg)
              </text>
              <rect x="0" y="6" width="80" height="8" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <rect
                x="0"
                y="6"
                width={Math.max(0, Math.min(80, (oncoticPressure / 40) * 80))}
                height="8"
                rx="2"
                fill={oncoticPressure > baselineOncotic ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
              />
              <text x="0" y="26" className="fill-foreground" fontSize="10" fontWeight="600">
                {oncoticPressure.toFixed(1)} mmHg
              </text>
              <text x="0" y="38" className="fill-muted-foreground" fontSize="8">
                baseline 25
              </text>
            </g>
  
            <g transform="translate(290, 170)">
              <text x="0" y="0" className="fill-muted-foreground" fontSize="9">
                Plasma volume Δ
              </text>
              <rect x="0" y="6" width="80" height="8" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <rect
                x="0"
                y="6"
                width={Math.max(0, Math.min(80, scenario.retained * 32 * Math.min(1, t * 1.2)))}
                height="8"
                rx="2"
                fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x="0" y="26" className="fill-foreground" fontSize="10" fontWeight="600">
                {(scenario.retained * 100).toFixed(0)}% retained
              </text>
              <text x="0" y="38" className="fill-muted-foreground" fontSize="8">
                of infused volume
              </text>
            </g>
          </svg>
        </div>
  
        {/* Legend / explanation */}
        <div className="rounded-md border border-border bg-muted/40 p-3 text-sm">
          <p className="font-semibold text-foreground mb-1">{scenario.label}</p>
          <p className="text-muted-foreground">{scenario.description}</p>
        </div>
  
        <p className="text-[11px] text-muted-foreground italic">
          Schematic — retention fractions are illustrative steady-state estimates synthesised from SAFE, ALBIOS and Starling /
          revised glycocalyx physiology; clinical response varies with patient and timing.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default AlbuminFluidShiftDiagram;

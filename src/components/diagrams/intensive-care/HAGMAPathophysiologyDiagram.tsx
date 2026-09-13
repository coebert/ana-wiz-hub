import { useState, useEffect, useRef } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { Play, Pause, RotateCcw } from "lucide-react";

/**
 * HAGMA pathophysiology animation
 *
 * Visualises the gamblegram (stacked-bar electroneutrality model) as a strong
 * acid HA is titrated into plasma:
 *   1. Baseline — Na⁺ balances Cl⁻ + HCO₃⁻ + unmeasured anions (UA). AG ≈ 12.
 *   2. Add HA  — H⁺ is buffered by HCO₃⁻ (consumed); the conjugate base A⁻
 *      joins the unmeasured-anion pool.
 *   3. Result  — HCO₃⁻ falls, Cl⁻ is unchanged, UA rises, AG widens.
 * Contrast highlight: in NAGMA the same HCO₃⁻ fall is matched by a Cl⁻ rise.
 */

type Step = 0 | 1 | 2 | 3;

const STEPS: { id: Step; title: string; body: string }[] = [
  {
    id: 0,
    title: "Baseline — electroneutrality",
    body: "Plasma is electrically neutral. Na⁺ (140) ≈ Cl⁻ (104) + HCO₃⁻ (24) + unmeasured anions (≈12, mostly albumin/phosphate). Anion gap = Na⁺ − (Cl⁻ + HCO₃⁻) ≈ 12 mEq/L.",
  },
  {
    id: 1,
    title: "A strong acid HA is added",
    body: "Examples: lactic acid, β-hydroxybutyrate, formate, glycolate. HA fully dissociates into H⁺ + A⁻ in plasma.",
  },
  {
    id: 2,
    title: "HCO₃⁻ buffers the H⁺",
    body: "H⁺ + HCO₃⁻ → H₂CO₃ → H₂O + CO₂ (exhaled). Bicarbonate is consumed 1:1 with the acid load. Critically, Cl⁻ is not involved.",
  },
  {
    id: 3,
    title: "HAGMA established",
    body: "HCO₃⁻ has fallen; the new anion A⁻ has joined the unmeasured pool. Cl⁻ unchanged → anion gap widens. Compare with NAGMA (toggle below) where HCO₃⁻ loss is matched 1:1 by a Cl⁻ rise — gap stays normal.",
  },
];

interface IonBarProps {
  x: number;
  width: number;
  segments: { label: string; value: number; color: string; pulse?: boolean }[];
  title: string;
  scale: number;
  baseY: number;
}

const IonBar = ({ x, width, segments, title, scale, baseY }: IonBarProps) => {
  let cursorY = baseY;
  return (
    <g>
      <text x={x + width / 2} y={baseY + 18} textAnchor="middle" className="fill-foreground" style={{ fontSize: 12, fontWeight: 600 }}>
        {title}
      </text>
      {segments.map((seg, i) => {
        const h = seg.value * scale;
        cursorY -= h;
        const y = cursorY;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={width}
              height={h}
              fill={seg.color}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              style={{
                transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {seg.pulse && (
                <animate
                  attributeName="opacity"
                  values="1;0.55;1"
                  dur="1.4s"
                  repeatCount="indefinite"
                />
              )}
            </rect>
            {h > 14 && (
              <text
                x={x + width / 2}
                y={y + h / 2 + 4}
                textAnchor="middle"
                className="fill-foreground pointer-events-none"
                style={{ fontSize: 10, fontWeight: 600 }}
              >
                {seg.label} {seg.value}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

const HAGMAPathophysiologyDiagram = () => {
  const [step, setStep] = useState<Step>(0);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<"hagma" | "nagma">("hagma");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setTimeout(() => {
      setStep((s) => {
        if (s >= 3) {
          setPlaying(false);
          return 3;
        }
        return (s + 1) as Step;
      });
    }, 2200);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [playing, step]);

  const reset = () => {
    setPlaying(false);
    setStep(0);
  };

  // Compute values per step
  const hcoBase = 24;
  const clBase = 104;
  const uaBase = 12;
  const acidLoad = step >= 2 ? 12 : 0;
  const hco = hcoBase - acidLoad;
  const cl = mode === "nagma" && step >= 2 ? clBase + acidLoad : clBase;
  const ua = mode === "hagma" && step >= 2 ? uaBase + acidLoad : uaBase;
  const na = 140;
  const ag = na - (cl + hco);

  const scale = 1.6;
  const baseY = 320;

  const cations = [
    { label: "Na⁺", value: na, color: "hsl(var(--icu) / 0.75)" },
  ];

  const anions = [
    { label: "HCO₃⁻", value: hco, color: "hsl(145 55% 50% / 0.85)", pulse: step === 2 },
    { label: "Cl⁻", value: cl, color: "hsl(210 65% 60% / 0.8)", pulse: mode === "nagma" && step === 2 },
    { label: mode === "hagma" ? "UA + A⁻" : "UA", value: ua, color: "hsl(0 65% 55% / 0.8)", pulse: mode === "hagma" && step >= 2 },
  ];

  const current = STEPS[step];

  return (
    <DiagramFigure
      id="hagma-pathophysiology"
      title="HAGMA pathophysiology: HCO₃⁻ falls, Cl⁻ unchanged, unmeasured anion gap widens"
      description="Animated gamblegram showing addition of a strong acid HA: H⁺ consumes HCO₃⁻ while A⁻ joins the unmeasured-anion pool. Toggle to NAGMA to contrast hyperchloraemic acidosis."
    >
      <div className="border border-border rounded-lg p-4 mb-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-border hover:bg-secondary transition-colors"
            >
              {playing ? <Pause className="h-3 w-3"  aria-hidden="true" focusable={false}/> : <Play className="h-3 w-3"  aria-hidden="true" focusable={false}/>}
              {playing ? "Pause" : step >= 3 ? "Replay" : "Play"}
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-border hover:bg-secondary transition-colors"
            >
              <RotateCcw className="h-3 w-3"  aria-hidden="true" focusable={false}/> Reset
            </button>
          </div>
          <div className="inline-flex rounded border border-border overflow-hidden text-xs">
            <button
              onClick={() => { setMode("hagma"); reset(); }}
              className={`px-3 py-1.5 transition-colors ${mode === "hagma" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              HAGMA
            </button>
            <button
              onClick={() => { setMode("nagma"); reset(); }}
              className={`px-3 py-1.5 transition-colors ${mode === "nagma" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
            >
              NAGMA (contrast)
            </button>
          </div>
        </div>

        {/* Step pips */}
        <div className="flex gap-1.5 mb-3">
          {STEPS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setPlaying(false); setStep(s.id); }}
              className={`flex-1 h-1.5 rounded-full transition-colors ${step >= s.id ? "bg-primary" : "bg-secondary"}`}
              aria-label={`Go to step ${s.id + 1}`}
            />
          ))}
        </div>

        <svg viewBox="0 0 480 360" className="w-full h-auto" role="img" aria-labelledby="hagma-pathophysiology-title hagma-pathophysiology-desc">
          <title id="hagma-pathophysiology-title">Gamblegram of strong-acid addition</title>
          <desc id="hagma-pathophysiology-desc">Stacked bars of plasma cations and anions evolve across four steps.</desc>

          {/* Baseline line */}
          <line x1={20} y1={baseY} x2={460} y2={baseY} stroke="hsl(var(--border))" strokeWidth={1} />
          <text x={20} y={baseY + 16} className="fill-muted-foreground" style={{ fontSize: 10 }}>mEq/L</text>

          {/* Cations bar */}
          <IonBar x={70} width={120} segments={cations} title="Cations" scale={scale} baseY={baseY} />

          {/* Anions bar */}
          <IonBar x={290} width={120} segments={anions} title="Anions" scale={scale} baseY={baseY} />

          {/* AG bracket */}
          {step >= 3 && (
            <g style={{ transition: "opacity 500ms", opacity: 1 }}>
              <line
                x1={415}
                y1={baseY - hco * scale}
                x2={425}
                y2={baseY - hco * scale}
                stroke="hsl(var(--primary))"
                strokeWidth={1.5}
              />
              <line
                x1={415}
                y1={baseY - (hco + cl) * scale}
                x2={425}
                y2={baseY - (hco + cl) * scale}
                stroke="hsl(var(--primary))"
                strokeWidth={1.5}
              />
              <line
                x1={425}
                y1={baseY - hco * scale}
                x2={425}
                y2={baseY - (hco + cl) * scale}
                stroke="hsl(var(--primary))"
                strokeWidth={1.5}
                strokeDasharray="2 2"
              />
              <text x={430} y={baseY - (hco + cl / 2) * scale + 4} className="fill-primary" style={{ fontSize: 10, fontWeight: 600 }}>
                AG = {ag}
              </text>
            </g>
          )}

          {/* Floating HA molecule animation during step 1-2 */}
          {step === 1 && (
            <g>
              <circle cx={240} cy={120} r={18} fill="hsl(0 70% 55% / 0.85)">
                <animate attributeName="cy" values="80;130;80" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <text x={240} y={124} textAnchor="middle" className="fill-background" style={{ fontSize: 11, fontWeight: 700 }}>HA</text>
              <text x={240} y={170} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>strong acid load</text>
            </g>
          )}
          {step === 2 && (
            <g>
              <text x={240} y={100} textAnchor="middle" className="fill-foreground" style={{ fontSize: 11, fontWeight: 600 }}>
                H⁺ + HCO₃⁻ → H₂O + CO₂↑
              </text>
              <path d="M 240 110 L 240 200" stroke="hsl(var(--primary))" strokeWidth={1.5} markerEnd="url(#arrow-hagma)" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" values="0;-14" dur="1s" repeatCount="indefinite" />
              </path>
            </g>
          )}
          <defs>
            <marker id="arrow-hagma" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--primary))" />
            </marker>
          </defs>
        </svg>

        {/* Step caption */}
        <div className="mt-3 p-3 rounded-md border border-primary/30 bg-primary/5 animate-fade-in" key={`${step}-${mode}`}>
          <p className="text-sm font-semibold text-foreground">{step + 1}/4 — {current.title}</p>
          <p className="text-sm text-muted-foreground mt-1">{current.body}</p>
          {step >= 3 && (
            <p className="text-xs mt-2 text-foreground">
              <strong>Result:</strong> HCO₃⁻ {hco} · Cl⁻ {cl} · AG <strong>{ag}</strong>
              {" "}({mode === "hagma" ? "raised — HAGMA" : "normal — NAGMA"})
            </p>
          )}
        </div>
      </div>
    </DiagramFigure>
  );
};

export default HAGMAPathophysiologyDiagram;

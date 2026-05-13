import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, BookOpen, ExternalLink } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated Stewart–Hamilton thermodilution diagram.
 *
 * Shows a 10 mL bolus of iced saline injected at the RA port of a pulmonary
 * artery catheter, mixing through the right heart, and producing a
 * temperature dip at the PA thermistor. The area under the resulting
 * temperature–time curve is inversely proportional to cardiac output:
 *
 *   CO = (V_i × (T_b − T_i) × K) / ∫ ΔT · dt
 *
 * The user can switch between a "high CO" (small AUC, fast washout) and
 * "low CO" (large AUC, slow washout) scenario to see the inverse
 * relationship between AUC and CO directly. Animation is paused/scrubbed
 * via the controls below the SVG.
 */

type Scenario = "high" | "low";

interface ScenarioConfig {
  /** Display label */
  label: string;
  /** Cardiac output in L/min (used to scale curve & display value) */
  co: number;
  /** Peak ΔT (°C) of the dilution curve */
  peak: number;
  /** Time-to-peak (in animation units, 0–1) */
  tPeak: number;
  /** Curve "width" — controls how slowly it decays (larger = slower) */
  width: number;
}

const SCENARIOS: Record<Scenario, ScenarioConfig> = {
  high: {
    label: "High CO (8 L/min — sepsis)",
    co: 8,
    peak: 0.55,
    tPeak: 0.3,
    width: 0.11,
  },
  low: {
    label: "Low CO (3 L/min — cardiogenic)",
    co: 3,
    peak: 1.4,
    tPeak: 0.42,
    width: 0.22,
  },
};

interface Source {
  label: string;
  citation: string;
  url: string;
}

const SOURCES: Source[] = [
  {
    label: "Stewart 1897",
    citation:
      "Stewart GN. Researches on the circulation time and on the influences which affect it. J Physiol. 1897;22(3):159–83. (Original indicator-dilution principle.)",
    url: "https://doi.org/10.1113/jphysiol.1897.sp000684",
  },
  {
    label: "Hamilton 1932",
    citation:
      "Hamilton WF, Moore JW, Kinsman JM, Spurling RG. Studies on the circulation. IV. Further analysis of the injection method. Am J Physiol. 1932;99:534–51.",
    url: "https://doi.org/10.1152/ajplegacy.1932.99.3.534",
  },
  {
    label: "Swan & Ganz 1970",
    citation:
      "Swan HJC, Ganz W, Forrester J et al. Catheterization of the heart in man with use of a flow-directed balloon-tipped catheter. N Engl J Med. 1970;283:447–51.",
    url: "https://doi.org/10.1056/NEJM197008272830902",
  },
  {
    label: "PAC-Man 2005",
    citation:
      "Harvey S et al. Assessment of the clinical effectiveness of pulmonary artery catheters in management of patients in intensive care (PAC-Man). Lancet. 2005;366:472–7.",
    url: "https://doi.org/10.1016/S0140-6736(05)67061-4",
  },
  {
    label: "BJA Educ 2016",
    citation:
      "Argueta EE, Paniagua D. Thermodilution cardiac output: a concept over 250 years in the making. Cardiol Rev. 2019;27(3):138–144. (See also: Pulmonary artery catheter — BJA Education 2016;16:382–8.)",
    url: "https://doi.org/10.1097/CRD.0000000000000223",
  },
];

/** Build a smooth temperature-dip curve as an array of {x,y} samples. */
const buildCurve = (cfg: ScenarioConfig, samples = 120) => {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < samples; i++) {
    const x = i / (samples - 1); // 0..1 normalised time
    // Asymmetric log-normal-ish dip: rises quickly, decays slowly
    const dx = x - cfg.tPeak;
    const denom = dx >= 0 ? cfg.width : cfg.width * 0.6;
    const y = cfg.peak * Math.exp(-(dx * dx) / (2 * denom * denom));
    pts.push({ x, y });
  }
  return pts;
};

const VIEW_W = 720;
const VIEW_H = 360;

// Plot region (right side) — temperature-time curve
const PLOT_X = 360;
const PLOT_Y = 50;
const PLOT_W = 320;
const PLOT_H = 200;

export const ThermodilutionDiagram = () => {
  const [scenario, setScenario] = useState<Scenario>("high");
  const [t, setT] = useState(0); // 0..1 animation progress
  const [playing, setPlaying] = useState(true);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  const cfg = SCENARIOS[scenario];
  const curve = useMemo(() => buildCurve(cfg), [cfg]);

  // Animation loop — 6 second cycle
  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
      return;
    }
    const tick = (now: number) => {
      if (lastRef.current == null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setT((prev) => {
        const next = prev + dt / 6; // 6s per full cycle
        return next > 1 ? 0 : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  // ----- Geometry helpers -----
  const xToPx = (x: number) => PLOT_X + x * PLOT_W;
  const yToPx = (y: number) => PLOT_Y + PLOT_H - (y / 1.6) * PLOT_H; // 1.6 °C max

  // Curve path string, only drawn up to current t (animated reveal)
  const visibleCurve = curve.filter((p) => p.x <= t);
  const curvePath = visibleCurve
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xToPx(p.x).toFixed(1)} ${yToPx(p.y).toFixed(1)}`)
    .join(" ");

  // Filled AUC under the visible portion of the curve
  const aucPath =
    visibleCurve.length > 1
      ? `${curvePath} L ${xToPx(visibleCurve[visibleCurve.length - 1].x).toFixed(1)} ${yToPx(0)} L ${xToPx(visibleCurve[0].x).toFixed(1)} ${yToPx(0)} Z`
      : "";

  // Position of the "saline bolus" travelling through the catheter on the left
  // The catheter on the diagram goes: RA injection port (top) → RV → PA tip
  // We draw the bolus as a moving cyan dot along that path.
  const boluxPath = [
    { x: 80, y: 70 }, // RA injection port (proximal)
    { x: 80, y: 130 }, // down catheter
    { x: 130, y: 175 }, // through tricuspid into RV
    { x: 200, y: 195 }, // RV apex
    { x: 250, y: 150 }, // up RV outflow
    { x: 290, y: 95 }, // pulmonary valve
    { x: 320, y: 70 }, // PA thermistor (distal tip)
  ];

  // bolus reaches thermistor at t = tPeak
  const boluxProgress = Math.min(1, t / cfg.tPeak);
  const segIndex = Math.min(
    boluxPath.length - 2,
    Math.floor(boluxProgress * (boluxPath.length - 1)),
  );
  const segFrac =
    boluxProgress * (boluxPath.length - 1) - segIndex;
  const bolusPos = {
    x:
      boluxPath[segIndex].x +
      (boluxPath[segIndex + 1].x - boluxPath[segIndex].x) * segFrac,
    y:
      boluxPath[segIndex].y +
      (boluxPath[segIndex + 1].y - boluxPath[segIndex].y) * segFrac,
  };
  // Bolus visible only after injection (t > 0.02) and before fully washed out
  const showBolus = t > 0.02 && t < cfg.tPeak + 0.15;

  // Current temperature reading at the thermistor
  const currentY = curve.find((p) => p.x >= t)?.y ?? 0;

  return (
    <div className="rounded-xl border border-border bg-card p-4 my-4">
      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
        <div>
          <h4 className="font-semibold text-foreground text-sm">
            Stewart–Hamilton Thermodilution
          </h4>
          <p className="text-xs text-muted-foreground">
            Iced saline at the RA port → temperature dip at the PA thermistor.
            CO is inversely proportional to the area under the curve.
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {(Object.keys(SCENARIOS) as Scenario[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setScenario(key);
                setT(0);
              }}
              className={`text-[11px] px-2 py-1 rounded-md font-medium transition-colors ${
                scenario === key
                  ? "bg-icu text-icu-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {SCENARIOS[key].label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-background/60 rounded-lg border border-border overflow-hidden">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-auto"
          aria-label="Animated thermodilution curve"
        >
          {/* ---- Heart silhouette (schematic) ---- */}
          <g
            stroke="hsl(var(--border))"
            strokeWidth="1.5"
            fill="hsl(var(--muted) / 0.3)"
          >
            {/* RA */}
            <ellipse cx="120" cy="140" rx="42" ry="32" />
            <text x="120" y="144" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
              RA
            </text>
            {/* RV */}
            <ellipse cx="200" cy="200" rx="55" ry="42" />
            <text x="200" y="205" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
              RV
            </text>
            {/* PA */}
            <path
              d="M 245 165 Q 280 120 320 70 L 340 60 L 320 80 Q 290 130 260 175 Z"
              fill="hsl(var(--muted) / 0.3)"
            />
            <text x="320" y="55" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
              PA
            </text>
          </g>

          {/* ---- PA catheter path ---- */}
          <path
            d={`M ${boluxPath
              .map((p) => `${p.x} ${p.y}`)
              .join(" L ")}`}
            stroke="hsl(var(--icu))"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
            strokeDasharray="3 2"
          />

          {/* RA injection port label */}
          <circle cx="80" cy="70" r="5" fill="hsl(var(--icu))" />
          <text x="74" y="60" textAnchor="end" fontSize="10" fill="hsl(var(--foreground))">
            RA port
          </text>
          <text x="74" y="72" textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">
            10 mL @ 0 °C
          </text>

          {/* PA thermistor */}
          <circle
            cx="320"
            cy="70"
            r="6"
            fill={
              showBolus && t > cfg.tPeak * 0.7
                ? "hsl(var(--destructive))"
                : "hsl(var(--icu))"
            }
            stroke="hsl(var(--background))"
            strokeWidth="1.5"
          />
          <text x="328" y="60" fontSize="10" fill="hsl(var(--foreground))">
            Thermistor
          </text>
          <text x="328" y="72" fontSize="9" fill="hsl(var(--muted-foreground))">
            ΔT live
          </text>

          {/* Travelling bolus */}
          {showBolus && (
            <>
              <circle
                cx={bolusPos.x}
                cy={bolusPos.y}
                r="7"
                fill="hsl(200 90% 55%)"
                opacity="0.85"
              >
                <animate
                  attributeName="r"
                  values="7;9;7"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={bolusPos.x}
                cy={bolusPos.y}
                r="12"
                fill="hsl(200 90% 55%)"
                opacity="0.2"
              />
            </>
          )}

          {/* ---- Plot region: temperature vs time ---- */}
          {/* Plot frame */}
          <rect
            x={PLOT_X}
            y={PLOT_Y}
            width={PLOT_W}
            height={PLOT_H}
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
          {/* Baseline (T_blood) */}
          <line
            x1={PLOT_X}
            x2={PLOT_X + PLOT_W}
            y1={yToPx(0)}
            y2={yToPx(0)}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x={PLOT_X - 6}
            y={yToPx(0) + 3}
            textAnchor="end"
            fontSize="9"
            fill="hsl(var(--muted-foreground))"
          >
            T_blood
          </text>

          {/* Y-axis label */}
          <text
            x={PLOT_X - 6}
            y={PLOT_Y + 12}
            textAnchor="end"
            fontSize="10"
            fill="hsl(var(--foreground))"
            fontWeight="600"
          >
            ΔT (°C)
          </text>
          {/* X-axis label */}
          <text
            x={PLOT_X + PLOT_W / 2}
            y={PLOT_Y + PLOT_H + 22}
            textAnchor="middle"
            fontSize="10"
            fill="hsl(var(--foreground))"
            fontWeight="600"
          >
            Time (s)
          </text>

          {/* AUC fill */}
          {aucPath && (
            <path
              d={aucPath}
              fill="hsl(var(--icu) / 0.25)"
              stroke="none"
            />
          )}

          {/* Curve trace */}
          {curvePath && (
            <path
              d={curvePath}
              fill="none"
              stroke="hsl(var(--icu))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Live thermistor reading marker */}
          {t > 0 && t < 1 && (
            <circle
              cx={xToPx(t)}
              cy={yToPx(currentY)}
              r="4"
              fill="hsl(var(--destructive))"
              stroke="hsl(var(--background))"
              strokeWidth="1.5"
            />
          )}

          {/* CO equation overlay */}
          <g transform={`translate(${PLOT_X + 8}, ${PLOT_Y + 8})`}>
            <rect
              width="180"
              height="50"
              rx="4"
              fill="hsl(var(--background) / 0.92)"
              stroke="hsl(var(--border))"
            />
            <text x="8" y="16" fontSize="10" fill="hsl(var(--muted-foreground))">
              CO ∝ 1 / AUC
            </text>
            <text
              x="8"
              y="32"
              fontSize="13"
              fontWeight="700"
              fill="hsl(var(--icu))"
            >
              CO ≈ {cfg.co.toFixed(1)} L/min
            </text>
            <text x="8" y="44" fontSize="9" fill="hsl(var(--muted-foreground))">
              {scenario === "high" ? "small AUC → fast washout" : "large AUC → slow washout"}
            </text>
          </g>
        </svg>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md bg-icu text-icu-foreground font-medium hover:opacity-90"
        >
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => {
            setT(0);
            setPlaying(true);
          }}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md bg-muted text-foreground font-medium hover:bg-muted/70"
        >
          <RotateCcw className="h-3 w-3" />
          Restart
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={t}
          onChange={(e) => {
            setPlaying(false);
            setT(parseFloat(e.target.value));
          }}
          className="flex-1 accent-icu"
          aria-label="Scrub time"
        />
      </div>

      {/* Step explanations */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px]">
        {[
          { label: "1. Inject", body: "10 mL iced saline at the RA port at end-expiration." },
          { label: "2. Mix", body: "Bolus traverses RV — the thermal indicator equilibrates with blood." },
          { label: "3. Detect", body: "PA thermistor records the temperature dip versus baseline." },
          {
            label: "4. Compute",
            body:
              "CO = (Vᵢ × (T_b − Tᵢ) × K) / ∫ΔT·dt — small AUC = high CO; large AUC = low CO.",
          },
        ].map((s, i) => {
          const stepActive =
            (i === 0 && t < 0.15) ||
            (i === 1 && t >= 0.15 && t < cfg.tPeak * 0.9) ||
            (i === 2 && t >= cfg.tPeak * 0.9 && t < 0.85) ||
            (i === 3 && t >= 0.85);
          return (
    <DiagramFigure
      id="thermodilution-diagram"
      title="Thermodilution"
      description="Auto-generated wrapper for the Thermodilution anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div
                key={s.label}
                className="rounded-md border p-2 transition-colors"
                style={{
                  borderColor: stepActive
                    ? "hsl(var(--icu))"
                    : "hsl(var(--border))",
                  backgroundColor: stepActive
                    ? "hsl(var(--icu) / 0.08)"
                    : "transparent",
                }}
              >
                <p
                  className="font-bold mb-0.5"
                  style={{
                    color: stepActive ? "hsl(var(--icu))" : "hsl(var(--foreground))",
                  }}
                >
                  {s.label}
                </p>
                <p className="text-muted-foreground leading-snug">{s.body}</p>
              </div>
    </DiagramFigure>
  );
        })}
      </div>

      {/* Sources of error */}
      <div className="mt-3 rounded-md border border-border bg-muted/30 p-3">
        <p className="text-[11px] font-bold text-foreground mb-1">
          Sources of error
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Tricuspid regurgitation (recirculation distorts the curve), intracardiac shunts (loss of
          indicator), warm or wrong-volume injectate, respiratory variation (always inject at end-expiration
          and average ≥ 3 measurements), thermistor drift, and rapid changes in patient temperature
          (CRRT, ECMO, warming blanket).
        </p>
      </div>

      {/* Bibliography */}
      <div className="mt-3 rounded-lg border border-border bg-background/60 p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
            Sources
          </p>
        </div>
        <ol className="space-y-1.5 list-none">
          {SOURCES.map((s, i) => (
            <li
              key={s.url}
              className="text-[11px] text-muted-foreground leading-relaxed flex gap-1.5"
            >
              <span className="font-bold shrink-0 text-icu">[{i + 1}]</span>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline group/cite"
              >
                <span className="font-semibold text-foreground">{s.label}</span>
                {" — "}
                <span className="group-hover/cite:text-foreground">{s.citation}</span>
                <ExternalLink className="inline h-2.5 w-2.5 ml-0.5 align-baseline text-icu" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ThermodilutionDiagram;

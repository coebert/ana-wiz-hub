import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

type Poison = "methanol" | "ethylene-glycol";

interface Curve {
  /** value at hour h (0..36) */
  at: (h: number) => number;
}

/**
 * Toxicokinetic model (illustrative, exam-grade):
 *  Parent alcohol absorbed quickly → high osmolar gap (OG) early.
 *  Alcohol dehydrogenase (ADH) metabolises parent → toxic acid metabolites
 *  (formic acid for methanol; glycolic / oxalic acid for ethylene glycol).
 *  As parent falls, OG falls; as acid metabolites accumulate, AG rises.
 *  Curves are pedagogical, not pharmacokinetically exact.
 */
const MODELS: Record<Poison, { parent: Curve; metabolite: Curve; label: string; metaboliteName: string }> = {
  methanol: {
    label: "Methanol",
    metaboliteName: "Formate",
    // OG peaks ~50 mOsm at 1–2 h then decays (t½ ~14 h untreated)
    parent: { at: (h) => 50 * Math.exp(-h / 14) + 8 },
    // AG slow rise — formate accumulates after 6–12 h, plateaus ~36–40
    metabolite: { at: (h) => 10 + 28 / (1 + Math.exp(-(h - 12) / 4)) },
  },
  "ethylene-glycol": {
    label: "Ethylene glycol",
    metaboliteName: "Glycolate",
    // OG peaks faster, decays quicker (t½ ~3 h with intact ADH)
    parent: { at: (h) => 45 * Math.exp(-h / 6) + 8 },
    // AG rises earlier (4–8 h) from glycolic acid
    metabolite: { at: (h) => 10 + 30 / (1 + Math.exp(-(h - 8) / 3)) },
  },
};

const W = 640;
const H = 320;
const PAD = { l: 50, r: 16, t: 24, b: 40 };
const PLOT_W = W - PAD.l - PAD.r;
const PLOT_H = H - PAD.t - PAD.b;
const T_MAX = 36; // hours
const Y_MAX = 60;

const xScale = (h: number) => PAD.l + (h / T_MAX) * PLOT_W;
const yScale = (v: number) => PAD.t + PLOT_H - (v / Y_MAX) * PLOT_H;

const buildPath = (curve: Curve, upToHour: number) => {
  const pts: string[] = [];
  for (let h = 0; h <= upToHour + 0.001; h += 0.5) {
    pts.push(`${xScale(h).toFixed(1)},${yScale(curve.at(h)).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
};

const ToxicAlcoholTimelineDiagram = () => {
  const [poison, setPoison] = useState<Poison>("methanol");
  const [hour, setHour] = useState(0);
  const [playing, setPlaying] = useState(true);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const step = (t: number) => {
      if (lastRef.current == null) lastRef.current = t;
      const dt = (t - lastRef.current) / 1000;
      lastRef.current = t;
      setHour((h) => {
        // 36 in-game hours over ~9 s
        const next = h + dt * 4;
        if (next >= T_MAX) {
          setPlaying(false);
          return T_MAX;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [playing]);

  const reset = () => {
    setHour(0);
    setPlaying(true);
  };

  const model = MODELS[poison];
  const og = model.parent.at(hour);
  const ag = model.metabolite.at(hour);

  const phase =
    hour < 2
      ? "Absorption — parent alcohol high, OG ↑, AG still normal."
      : hour < 8
      ? "Latent phase — ADH converting parent to acid metabolite. OG starts falling, AG starting to rise."
      : hour < 18
      ? "Toxic phase — HAGMA established, metabolite-driven end-organ injury (retina / renal tubules)."
      : "Late phase — parent largely cleared (OG may normalise); severe HAGMA persists from acid metabolite.";

  // Gridlines
  const yTicks = [0, 10, 20, 30, 40, 50, 60];
  const xTicks = [0, 6, 12, 18, 24, 30, 36];

  return (
    <div className="my-4 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="font-semibold text-foreground">Toxic alcohol timeline — OG vs AG</h4>
          <p className="text-xs text-muted-foreground">
            Animated, illustrative kinetics. Watch the <span className="text-primary font-medium">osmolar gap</span> fall as the
            <span className="text-destructive font-medium"> anion gap</span> rises.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-border overflow-hidden text-xs">
            {(Object.keys(MODELS) as Poison[]).map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPoison(p);
                  reset();
                }}
                className={`px-3 py-1.5 ${
                  poison === p ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-secondary"
                }`}
              >
                {MODELS[p].label}
              </button>
            ))}
          </div>
          <Button size="sm" variant="outline" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="h-3.5 w-3.5"  aria-hidden="true" focusable={false}/> : <Play className="h-3.5 w-3.5"  aria-hidden="true" focusable={false}/>}
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5"  aria-hidden="true" focusable={false}/>
          </Button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Toxic alcohol OG and AG over time">
          {/* gridlines */}
          {yTicks.map((v) => (
            <g key={`y${v}`}>
              <line
                x1={PAD.l}
                x2={W - PAD.r}
                y1={yScale(v)}
                y2={yScale(v)}
                stroke="hsl(var(--border))"
                strokeDasharray="2 3"
              />
              <text x={PAD.l - 8} y={yScale(v) + 4} textAnchor="end" fontSize="10" fill="hsl(var(--muted-foreground))">
                {v}
              </text>
            </g>
          ))}
          {xTicks.map((h) => (
            <g key={`x${h}`}>
              <line
                x1={xScale(h)}
                x2={xScale(h)}
                y1={PAD.t}
                y2={H - PAD.b}
                stroke="hsl(var(--border))"
                strokeDasharray="2 3"
              />
              <text x={xScale(h)} y={H - PAD.b + 14} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
                {h}h
              </text>
            </g>
          ))}

          {/* axes labels */}
          <text
            x={12}
            y={PAD.t + PLOT_H / 2}
            transform={`rotate(-90 12 ${PAD.t + PLOT_H / 2})`}
            textAnchor="middle"
            fontSize="11"
            fill="hsl(var(--foreground))"
          >
            mOsm/kg or mEq/L
          </text>
          <text x={PAD.l + PLOT_W / 2} y={H - 4} textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))">
            Time since ingestion (hours)
          </text>

          {/* normal-range bands */}
          <rect x={PAD.l} y={yScale(10)} width={PLOT_W} height={yScale(0) - yScale(10)} fill="hsl(var(--muted))" opacity="0.25" />
          <text x={W - PAD.r - 4} y={yScale(5) + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">
            normal OG &lt; 10
          </text>

          {/* OG curve (parent alcohol) */}
          <path
            d={buildPath(model.parent, hour)}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* AG curve (metabolite) */}
          <path
            d={buildPath(model.metabolite, hour)}
            fill="none"
            stroke="hsl(var(--destructive))"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* moving dots */}
          <circle cx={xScale(hour)} cy={yScale(og)} r="5" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="2" />
          <circle
            cx={xScale(hour)}
            cy={yScale(ag)}
            r="5"
            fill="hsl(var(--destructive))"
            stroke="hsl(var(--background))"
            strokeWidth="2"
          />

          {/* time cursor */}
          <line
            x1={xScale(hour)}
            x2={xScale(hour)}
            y1={PAD.t}
            y2={H - PAD.b}
            stroke="hsl(var(--foreground))"
            strokeOpacity="0.25"
            strokeDasharray="3 3"
          />

          {/* legend */}
          <g transform={`translate(${PAD.l + 8}, ${PAD.t + 6})`}>
            <rect x={0} y={0} width={210} height={36} rx={4} fill="hsl(var(--background))" opacity="0.85" />
            <circle cx={12} cy={12} r="4" fill="hsl(var(--primary))" />
            <text x={22} y={15} fontSize="10" fill="hsl(var(--foreground))">
              Osmolar gap (parent alcohol)
            </text>
            <circle cx={12} cy={28} r="4" fill="hsl(var(--destructive))" />
            <text x={22} y={31} fontSize="10" fill="hsl(var(--foreground))">
              Anion gap ({model.metaboliteName})
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="rounded-md border border-border bg-secondary/30 p-2">
          <div className="text-muted-foreground">t = {hour.toFixed(1)} h</div>
          <div className="text-foreground font-medium">Phase clock</div>
        </div>
        <div className="rounded-md border border-primary/30 bg-primary/5 p-2">
          <div className="text-muted-foreground">Osmolar gap</div>
          <div className="text-primary font-semibold">{og.toFixed(0)} mOsm/kg</div>
        </div>
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <div className="text-muted-foreground">Anion gap</div>
          <div className="text-destructive font-semibold">{ag.toFixed(0)} mEq/L</div>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground">Clinical pearl: </strong>
        {phase} An <em>early</em> presentation may show a high OG with a near-normal AG (mostly parent alcohol);
        a <em>late</em> presentation may show a normalised OG with a marked HAGMA (metabolite-dominant). Fomepizole blocks
        ADH and freezes the OG curve while extending the window before the AG rises — buying time for dialysis to remove
        both parent and metabolite.
      </p>
    </div>
  );
};

export default ToxicAlcoholTimelineDiagram;

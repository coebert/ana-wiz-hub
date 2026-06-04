import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated burn resuscitation + zone-progression diagram.
 *
 * Two synchronised panels driven by a single virtual clock T (0–48 h):
 *
 *  LEFT  — Cross-section of skin showing Jackson's three zones (coagulation /
 *          stasis / hyperaemia). Adequate resuscitation keeps the stasis zone
 *          recoverable; under-resuscitation, hypothermia or vasopressor abuse
 *          converts stasis → coagulation (deeper, larger burn over 48 h).
 *
 *  RIGHT — Parkland resuscitation timeline: cumulative crystalloid delivered
 *          versus target (4 mL × kg × %TBSA, half in first 8 h), urine-output
 *          response, and the 12–24 h colloid switch.
 *
 * A strategy toggle (Optimal / Under-resuscitated / Over-resuscitated)
 * changes both panels so learners can see depth conversion AND fluid creep.
 */

const CYCLE_MS = 14000;
const T_MAX_HR = 48;

type Strategy = "optimal" | "under" | "over";

const STRATEGY_LABEL: Record<Strategy, string> = {
  optimal: "Optimal Parkland + titration",
  under: "Under-resuscitated",
  over: "Over-resuscitated (fluid creep)",
};

// Demo patient: 80 kg, 40 % TBSA → Parkland target = 12,800 mL / 24 h
const WEIGHT = 80;
const TBSA = 40;
const TARGET_24H = 4 * WEIGHT * TBSA; // 12,800 mL

// Cumulative volume at time t (hours) for each strategy
function volumeAt(t: number, s: Strategy) {
  const half = TARGET_24H / 2;
  // Optimal: half in 8 h, half in 16 h, then maintenance ~ 100 mL/h
  const optimal = (t: number) => {
    if (t <= 8) return (half * t) / 8;
    if (t <= 24) return half + (half * (t - 8)) / 16;
    return TARGET_24H + 100 * (t - 24);
  };
  const v = optimal(t);
  if (s === "optimal") return v;
  if (s === "under") return v * 0.55;
  return v * 1.7; // over-resuscitation / creep
}

// Stasis-zone fate over 48 h: 0 = healthy, 1 = converted to coagulation
function stasisConversion(t: number, s: Strategy) {
  // Conversion accelerates 6–48 h after burn; modulated by strategy
  const base = Math.min(1, Math.max(0, (t - 4) / 36));
  if (s === "optimal") return base * 0.2;       // mostly salvaged
  if (s === "under") return base * 0.85;        // most converts
  return base * 0.55;                            // oedema / ACS-driven conversion
}

function urineOutput(t: number, s: Strategy) {
  // Target 0.5 mL/kg/h = 40 mL/h (adult). Show as multiple of target.
  if (s === "optimal") return 0.9 + 0.2 * Math.sin(t);     // ~0.7–1.1
  if (s === "under") return Math.max(0.1, 0.6 - t / 80);   // falls
  return 1.6 + 0.3 * Math.sin(t / 2);                       // supranormal
}

export const BurnResuscitationDiagram = () => {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [strategy, setStrategy] = useState<Strategy>("optimal");

  useEffect(() => {
    if (!playing) return;
    const start = performance.now() - t * CYCLE_MS;
    let raf = 0;
    const tick = (now: number) => {
      const p = ((now - start) % CYCLE_MS) / CYCLE_MS;
      setT(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const hr = t * T_MAX_HR; // 0 – 48
  const conv = stasisConversion(hr, strategy); // 0..1
  const vol = volumeAt(hr, strategy);
  const target = volumeAt(hr, "optimal");
  const uo = urineOutput(hr, strategy);

  // Plot dimensions for the right-hand graph
  const PW = 360;
  const PH = 160;
  const MAX_VOL = 25000;
  const x = (h: number) => 30 + (h / T_MAX_HR) * (PW - 40);
  const y = (v: number) => PH - 20 - (Math.min(v, MAX_VOL) / MAX_VOL) * (PH - 40);

  // Pre-compute polylines
  const points = (s: Strategy) => {
    const pts: string[] = [];
    for (let i = 0; i <= 48; i += 1) pts.push(`${x(i)},${y(volumeAt(i, s))}`);
    return pts.join(" ");
  };

  return (
    <DiagramFigure id="burn-resuscitation" title="Burn fluid resuscitation timeline" description="Animated burn-shock resuscitation showing Parkland crystalloid delivery in the first 24 h, urine-output target, reassessment points, and the 12–24 h colloid switch (modified protocols).">
    <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
      <figcaption className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Burn resuscitation &amp; depth progression (40 % TBSA, 80 kg)
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Toggle the resuscitation strategy and watch the zone of stasis evolve over 48 h alongside the
            cumulative Parkland volume and urine output.
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setT(0)} aria-label="Restart">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </figcaption>

      {/* Strategy chips */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {(Object.keys(STRATEGY_LABEL) as Strategy[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStrategy(s)}
            className={cn(
              "rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
              strategy === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-muted"
            )}
          >
            {STRATEGY_LABEL[s]}
          </button>
        ))}
      </div>

      {/* Time bar */}
      <div className="mb-3">
        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
          <span>0 h (burn)</span>
          <span>8 h</span>
          <span>24 h</span>
          <span>48 h</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded bg-muted">
          <div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${t * 100}%` }} />
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          T = <span className="font-semibold text-foreground">{hr.toFixed(1)} h</span> post-burn
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* ===== LEFT: Skin cross-section with Jackson's zones ===== */}
        <div className="rounded-lg border border-border bg-background p-3">
          <p className="text-xs font-semibold text-foreground mb-2">Jackson&apos;s zones — depth over time</p>
          <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label="Burn cross-section">
            {/* Skin layers labels */}
            <text x="6" y="30" fontSize="9" fill="hsl(var(--muted-foreground))">Epidermis</text>
            <text x="6" y="80" fontSize="9" fill="hsl(var(--muted-foreground))">Dermis</text>
            <text x="6" y="160" fontSize="9" fill="hsl(var(--muted-foreground))">Sub-cutis</text>

            {/* Skin background */}
            <rect x="60" y="20" width="290" height="20" fill="hsl(35 25% 75%)" />
            <rect x="60" y="40" width="290" height="80" fill="hsl(20 30% 70%)" />
            <rect x="60" y="120" width="290" height="60" fill="hsl(40 20% 85%)" />

            {/* Zone of hyperaemia (outermost lateral) — fixed */}
            <ellipse cx="205" cy="60" rx="135" ry="42"
              fill="hsl(0 75% 60% / 0.18)" stroke="hsl(0 75% 60%)" strokeWidth="0.75" strokeDasharray="2 2" />
            {/* Zone of stasis — shrinks (recovers) or deepens (converts) */}
            {(() => {
              const baseR = 95;
              const baseRy = 30;
              // When conversion high, stasis ring shrinks because it's been swallowed by coagulation
              const shrink = 1 - 0.55 * conv;
              return (
                <ellipse cx="205" cy="60"
                  rx={baseR * shrink}
                  ry={baseRy * shrink}
                  fill="hsl(38 92% 55% / 0.32)"
                  stroke="hsl(38 92% 50%)"
                  strokeWidth="1"
                  style={{ transition: "rx 200ms, ry 200ms" }}
                />
              );
            })()}
            {/* Zone of coagulation — grows with conversion */}
            {(() => {
              const baseR = 55;
              const baseRy = 18;
              const grow = 1 + 0.9 * conv;
              const yc = 60 + 18 * conv; // also deepens into dermis
              const ryc = baseRy * grow + 12 * conv;
              return (
                <ellipse cx="205" cy={yc}
                  rx={baseR * grow}
                  ry={ryc}
                  fill="hsl(var(--foreground) / 0.85)"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="1"
                  style={{ transition: "rx 200ms, ry 200ms, cy 200ms" }}
                />
              );
            })()}

            {/* Labels */}
            <text x="205" y="63" fontSize="9" fontWeight="700" textAnchor="middle" fill="hsl(var(--background))">Coagulation</text>
            <text x="305" y="48" fontSize="9" fill="hsl(38 92% 35%)">Stasis</text>
            <text x="345" y="22" fontSize="9" textAnchor="end" fill="hsl(0 75% 45%)">Hyperaemia</text>

            {/* Depth scale */}
            <line x1="60" y1="180" x2="350" y2="180" stroke="hsl(var(--border))" />
            <text x="60" y="194" fontSize="9" fill="hsl(var(--muted-foreground))">Superficial</text>
            <text x="350" y="194" fontSize="9" textAnchor="end" fill="hsl(var(--muted-foreground))">Full thickness</text>
          </svg>

          <p className="mt-2 text-[11px] text-muted-foreground leading-snug">
            Stasis-zone conversion at {hr.toFixed(0)} h:&nbsp;
            <span className="font-semibold text-foreground">{Math.round(conv * 100)} %</span>
            {strategy === "optimal" && " — most stasis tissue salvaged."}
            {strategy === "under" && " — hypoperfusion, hypothermia and acidosis convert stasis → coagulation."}
            {strategy === "over" && " — interstitial oedema and compartment pressures impair stasis perfusion."}
          </p>
        </div>

        {/* ===== RIGHT: Parkland cumulative volume graph ===== */}
        <div className="rounded-lg border border-border bg-background p-3">
          <p className="text-xs font-semibold text-foreground mb-2">
            Cumulative crystalloid (target {TARGET_24H.toLocaleString()} mL / 24 h)
          </p>
          <svg viewBox={`0 0 ${PW} ${PH}`} className="w-full h-auto" role="img" aria-label="Resuscitation graph">
            {/* Axes */}
            <line x1="30" y1={PH - 20} x2={PW - 10} y2={PH - 20} stroke="hsl(var(--border))" />
            <line x1="30" y1="10" x2="30" y2={PH - 20} stroke="hsl(var(--border))" />

            {/* Y ticks */}
            {[0, 5000, 10000, 15000, 20000, 25000].map((v) => (
              <g key={v}>
                <line x1="28" x2="32" y1={y(v)} y2={y(v)} stroke="hsl(var(--border))" />
                <text x="26" y={y(v) + 3} fontSize="8" textAnchor="end" fill="hsl(var(--muted-foreground))">{v / 1000}L</text>
              </g>
            ))}
            {/* X ticks */}
            {[0, 8, 16, 24, 32, 40, 48].map((h) => (
              <g key={h}>
                <line x1={x(h)} x2={x(h)} y1={PH - 22} y2={PH - 18} stroke="hsl(var(--border))" />
                <text x={x(h)} y={PH - 6} fontSize="8" textAnchor="middle" fill="hsl(var(--muted-foreground))">{h}h</text>
              </g>
            ))}

            {/* 8h and 24h vertical guides */}
            <line x1={x(8)} x2={x(8)} y1="10" y2={PH - 20} stroke="hsl(var(--primary))" strokeDasharray="2 2" opacity="0.5" />
            <line x1={x(24)} x2={x(24)} y1="10" y2={PH - 20} stroke="hsl(var(--primary))" strokeDasharray="2 2" opacity="0.5" />
            <text x={x(8) + 3} y="18" fontSize="8" fill="hsl(var(--primary))">½ in 8 h</text>
            <text x={x(24) + 3} y="18" fontSize="8" fill="hsl(var(--primary))">colloid switch</text>

            {/* Target curve (faint) */}
            <polyline points={points("optimal")} fill="none"
              stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

            {/* Actual strategy curve */}
            <polyline points={points(strategy)} fill="none"
              stroke={strategy === "optimal" ? "hsl(142 65% 40%)" : strategy === "under" ? "hsl(38 92% 50%)" : "hsl(var(--destructive))"}
              strokeWidth="2" />

            {/* Moving marker */}
            <circle cx={x(hr)} cy={y(vol)} r="4"
              fill={strategy === "optimal" ? "hsl(142 65% 40%)" : strategy === "under" ? "hsl(38 92% 50%)" : "hsl(var(--destructive))"}
              stroke="hsl(var(--background))" strokeWidth="1.5" />
          </svg>

          {/* Live readouts */}
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded border border-border bg-card p-2">
              <p className="text-muted-foreground">Cumulative volume</p>
              <p className="font-semibold text-foreground">{Math.round(vol).toLocaleString()} mL</p>
              <p className="text-[10px] text-muted-foreground">target {Math.round(target).toLocaleString()} mL</p>
            </div>
            <div className="rounded border border-border bg-card p-2">
              <p className="text-muted-foreground">Urine output</p>
              <p className={cn(
                "font-semibold",
                uo < 0.5 ? "text-destructive" : uo > 1.3 ? "text-orange-500" : "text-foreground"
              )}>
                {(uo * 0.5).toFixed(2)} mL/kg/h
              </p>
              <p className="text-[10px] text-muted-foreground">target 0.5 mL/kg/h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase-specific take-home */}
      <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
        {strategy === "optimal" && (
          <p>
            <span className="font-semibold text-foreground">Optimal strategy:</span> Parkland half in 8 h, half in 16 h,
            urine output 0.5 mL/kg/h, switch to albumin from 12–24 h. Stasis is salvaged; final burn depth approximates
            the initial coagulation zone.
          </p>
        )}
        {strategy === "under" && (
          <p>
            <span className="font-semibold text-foreground">Under-resuscitation:</span> oliguria, lactic acidosis and
            vasoconstriction convert the stasis zone to coagulation — the burn deepens over 24–48 h. AKI, gut translocation
            and circulatory collapse follow.
          </p>
        )}
        {strategy === "over" && (
          <p>
            <span className="font-semibold text-foreground">Fluid creep:</span> exceeding ~ 250 mL/kg in 24 h drives
            interstitial oedema, abdominal compartment syndrome, ARDS and ocular / extremity compartment syndromes.
            The stasis zone fails because of <em>local</em> compartment pressure, not hypoperfusion.
          </p>
        )}
      </div>
    </figure>
    </DiagramFigure>
  );
};

export default BurnResuscitationDiagram;

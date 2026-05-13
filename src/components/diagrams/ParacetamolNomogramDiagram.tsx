import { useMemo, useState } from "react";
import { Pill, Clock, AlertTriangle } from "lucide-react";

/**
 * Interactive UK paracetamol treatment-line nomogram (Rumack–Matthew, 100 mg/L
 * line as adopted by MHRA/RCEM since 2012). Plots a user-entered timed
 * paracetamol level against the 100 mg/L treatment line and tells the user
 * whether NAC is indicated.
 *
 * Pharmacokinetics used:
 *  - 4 h  → treatment line at 100 mg/L (≈ 660 µmol/L)
 *  - First-order elimination, t½ ≈ 4 h
 *  - Line therefore halves every 4 h: y(t) = 100 · 2^((4 − t)/4)
 *
 * Levels drawn before 4 h are unreliable (absorption ongoing) — we warn.
 * Late presentations (>15 h or staggered/unknown time) → treat empirically.
 */

const T_MIN = 4;
const T_MAX = 24;

const lineConcentration = (hours: number) => 100 * Math.pow(2, (4 - hours) / 4);

const ParacetamolNomogramDiagram = () => {
  const [hours, setHours] = useState(8);
  const [level, setLevel] = useState(120); // mg/L

  // Build the treatment line points (semilog y axis 5–250 mg/L).
  const yMin = 5;
  const yMax = 250;
  const xToPx = (t: number) => 60 + ((t - T_MIN) / (T_MAX - T_MIN)) * 460;
  const yToPx = (c: number) =>
    260 - ((Math.log(c) - Math.log(yMin)) / (Math.log(yMax) - Math.log(yMin))) * 220;

  const linePath = useMemo(() => {
    const pts: string[] = [];
    for (let t = T_MIN; t <= T_MAX; t += 0.5) {
      pts.push(`${pts.length === 0 ? "M" : "L"}${xToPx(t).toFixed(1)},${yToPx(lineConcentration(t)).toFixed(1)}`);
    }
    return pts.join(" ");
  }, []);

  const treatmentLineAtT = lineConcentration(hours);
  const aboveLine = level >= treatmentLineAtT;
  const tooEarly = hours < 4;
  const tooLate = hours > 15;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Pill className="h-4 w-4 text-icu" />
        <h3 className="text-sm font-semibold text-foreground">
          Paracetamol Treatment Nomogram (UK 100 mg/L line)
        </h3>
      </div>

      <div className="grid md:grid-cols-[1fr_220px] gap-4">
        {/* Plot */}
        <div className="rounded-lg border border-border bg-background p-2">
          <svg viewBox="0 0 560 290" className="w-full h-auto" role="img" aria-label="Paracetamol nomogram">
            {/* Axes */}
            <line x1="60" y1="20" x2="60" y2="260" stroke="hsl(var(--border))" />
            <line x1="60" y1="260" x2="540" y2="260" stroke="hsl(var(--border))" />

            {/* Y grid (semilog: 5,10,25,50,100,250) */}
            {[5, 10, 25, 50, 100, 200].map((c) => {
              const y = yToPx(c);
              return (
                <g key={c}>
                  <line x1="60" y1={y} x2="540" y2={y} stroke="hsl(var(--border))" strokeOpacity="0.3" />
                  <text x="55" y={y + 3} textAnchor="end" className="fill-muted-foreground" fontSize="9">
                    {c}
                  </text>
                </g>
              );
            })}

            {/* X grid */}
            {[4, 8, 12, 16, 20, 24].map((t) => {
              const x = xToPx(t);
              return (
                    <g key={t}>
                  <line x1={x} y1="20" x2={x} y2="260" stroke="hsl(var(--border))" strokeOpacity="0.3" />
                  <text x={x} y="275" textAnchor="middle" className="fill-muted-foreground" fontSize="9">
                    {t}h
                  </text>
                </g>
  );
            })}

            {/* Above-line shaded TREAT region */}
            <path
              d={`${linePath} L${xToPx(T_MAX)},20 L${xToPx(T_MIN)},20 Z`}
              fill="hsl(var(--destructive))"
              fillOpacity="0.08"
            />

            {/* Treatment line */}
            <path d={linePath} fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" />
            <text x={xToPx(4) + 4} y={yToPx(100) - 6} className="fill-destructive" fontSize="10" fontWeight="600">
              Treat above this line
            </text>

            {/* Patient point */}
            {!tooEarly && hours <= T_MAX && level > 0 && (
              <g>
                <circle
                  cx={xToPx(Math.min(hours, T_MAX))}
                  cy={yToPx(Math.min(Math.max(level, yMin), yMax))}
                  r="6"
                  fill={aboveLine ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                />
                <text
                  x={xToPx(Math.min(hours, T_MAX)) + 10}
                  y={yToPx(Math.min(Math.max(level, yMin), yMax)) - 8}
                  className="fill-foreground"
                  fontSize="10"
                  fontWeight="600"
                >
                  {level} mg/L @ {hours} h
                </text>
              </g>
            )}

            {/* Axis titles */}
            <text x="300" y="290" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">
              Time since ingestion (hours)
            </text>
            <text
              x="14"
              y="140"
              textAnchor="middle"
              className="fill-foreground"
              fontSize="10"
              fontWeight="600"
              transform="rotate(-90 14 140)"
            >
              Plasma paracetamol (mg/L)
            </text>
          </svg>
        </div>

        {/* Controls + verdict */}
        <div className="space-y-3">
          <label className="block text-xs">
            <span className="flex items-center gap-1 text-muted-foreground mb-1">
              <Clock className="h-3 w-3" /> Hours since ingestion
            </span>
            <input
              type="range"
              min={1}
              max={24}
              step={0.5}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-icu"
            />
            <span className="text-foreground font-medium">{hours} h</span>
          </label>

          <label className="block text-xs">
            <span className="text-muted-foreground mb-1 block">
              Paracetamol level (mg/L)
            </span>
            <input
              type="range"
              min={5}
              max={250}
              step={1}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="w-full accent-icu"
            />
            <span className="text-foreground font-medium">{level} mg/L</span>
          </label>

          <div
            className={`rounded-lg p-3 text-xs leading-snug border ${
              tooEarly
                ? "border-amber-500/40 bg-amber-500/10 text-foreground"
                : tooLate
                ? "border-amber-500/40 bg-amber-500/10 text-foreground"
                : aboveLine
                ? "border-destructive/40 bg-destructive/10 text-foreground"
                : "border-primary/30 bg-primary/5 text-foreground"
            }`}
            role="status"
          >
            <div className="flex items-center gap-1 font-semibold mb-1">
              <AlertTriangle className="h-3 w-3" />
              {tooEarly
                ? "Too early to interpret"
                : tooLate
                ? "Late presentation"
                : aboveLine
                ? "Above treatment line — start NAC"
                : "Below treatment line — NAC not required"}
            </div>
            <p className="text-muted-foreground">
              {tooEarly
                ? "Levels before 4 h are unreliable due to ongoing absorption. Wait for the 4 h sample."
                : tooLate
                ? "Beyond 15 h the nomogram loses accuracy — give NAC empirically if any concern (staggered ingestion, unknown timing, INR rise, ALT rise)."
                : aboveLine
                ? `At ${hours} h the treatment line sits at ${treatmentLineAtT.toFixed(0)} mg/L. Patient level ${level} mg/L exceeds this → start IV NAC (SNAP 12-h regimen).`
                : `At ${hours} h the treatment line sits at ${treatmentLineAtT.toFixed(0)} mg/L. Patient level ${level} mg/L is below — NAC not required unless staggered/unknown timing or LFT/INR derangement.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParacetamolNomogramDiagram;

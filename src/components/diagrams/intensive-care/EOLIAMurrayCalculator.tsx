import { useEffect, useMemo, useRef, useState } from "react";
import { murrayScore, staticDrivingPressure } from "@/lib/murray-arithmetic";
import { InlineRef } from "@/components/references/InlineRef";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";

// Murray arithmetic and historical trial context, never eligibility assessment.
const EOLIAMurrayCalculator = () => {
  const [pf, setPf] = useState(75);          // mmHg


  const [pplat, setPplat] = useState(34);    // cmH2O
  const [compliance, setCompliance] = useState(22); // mL/cmH2O
  const [quadrants, setQuadrants] = useState(3);    // 1–4
  const [peep, setPeep] = useState(14);      // cmH2O


  const score = useMemo(() => murrayScore(pf, peep, compliance, quadrants), [pf, peep, compliance, quadrants]);
  const result = { murray: score?.score ?? 0, breakdown: [
    { label: "PaO₂/FiO₂", value: `${pf} mmHg`, points: score?.points[0] },
    { label: "PEEP", value: `${peep} cmH₂O`, points: score?.points[1] },
    { label: "Compliance", value: `${compliance} mL/cmH₂O`, points: score?.points[2] },
    { label: "CXR quadrants", value: `${quadrants} / 4`, points: score?.points[3] },
  ] };

  // Trend history — captures each settled adjustment (debounced)
  const dp = staticDrivingPressure(pplat, peep);
  const [history, setHistory] = useState<TrendPoint[]>([
    { t: 0, dp: 34 - 14, pplat: 34, compliance: 22 },
  ]);
  const debRef = useRef<number | null>(null);
  useEffect(() => {
    if (debRef.current) window.clearTimeout(debRef.current);
    if (dp === null) return;
    debRef.current = window.setTimeout(() => {
      setHistory((h) => {
        const last = h[h.length - 1];
        if (last && last.pplat === pplat && last.compliance === compliance && last.dp === dp) return h;
        const next = [...h, { t: h.length, dp, pplat, compliance }];
        return next.length > 20 ? next.slice(next.length - 20) : next;
      });
    }, 350);
    return () => {
      if (debRef.current) window.clearTimeout(debRef.current);
    };
  }, [pplat, peep, compliance, dp]);

  const resetHistory = () =>
    setHistory(dp === null ? [] : [{ t: 0, dp, pplat, compliance }]);

  return (
    <DiagramFigure
      id="eolia-murray-calculator"
      title="Murray lung injury arithmetic and EOLIA trial context"
      description="Murray severity arithmetic, historical EOLIA entry definitions and static pressure illustration; not ARDS diagnosis or patient ECMO candidacy."
    >
          <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">Murray lung injury calculator</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Four supplied components calculate lung injury severity, not an ARDS diagnosis. Neither a single gas value nor Murray score determines EOLIA inclusion or ECMO candidacy.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Slider label="PaO₂ / FiO₂" value={pf} min={30} max={300} step={5} unit="mmHg" onChange={setPf} />
          <Slider label="Plateau pressure" value={pplat} min={15} max={45} step={1} unit="cmH₂O" onChange={setPplat} />
          <Slider label="Static compliance" value={compliance} min={5} max={80} step={1} unit="mL/cmH₂O" onChange={setCompliance} />
          <Slider label="Total PEEP (static assessment)" value={peep} min={5} max={24} step={1} unit="cmH₂O" onChange={setPeep} />
          <div className="md:col-span-2">
            <Slider label="CXR quadrants with consolidation" value={quadrants} min={0} max={4} step={1} unit="/ 4" onChange={setQuadrants} />
          </div>
        </div>
  
        <p className="text-xs text-muted-foreground mb-3">Static driving pressure = plateau pressure − total PEEP during passive assessment. Total PEEP includes intrinsic PEEP; set PEEP alone may underestimate it. These input adjustments are not patient time-series data.</p>
        {dp === null && <p role="status" className="text-sm text-destructive">Inconsistent pressures: plateau pressure must not be below total PEEP. Driving pressure and new history points are withheld.</p>}
        {!score && <p role="status">Complete valid Murray inputs are required.</p>}
        {/* Murray score breakdown */}
        <div className="rounded-lg bg-secondary/40 border border-border p-3 mb-3">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Murray Lung Injury Score</p>
            <p className="text-2xl font-bold" >
              {score ? result.murray.toFixed(2) : "—"}
              <span className="text-xs text-muted-foreground font-normal ml-1">/ 4.0</span>
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-1">Component</th>
                  <th className="text-right py-1">Value</th>
                  <th className="text-right py-1">Points</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                {result.breakdown.map((b) => (
                  <tr key={b.label} className="border-b border-border/50">
                    <td className="py-1">{b.label}</td>
                    <td className="py-1 text-right font-mono">{b.value}</td>
                    <td className="py-1 text-right font-mono font-semibold">{b.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Total ÷ 4 components = score. <strong>0</strong> no injury · <strong>0.1–2.5</strong> mild–moderate · <strong>&gt; 2.5</strong> severe lung injury, not a standalone ARDS diagnosis.<InlineRef topicId="ards" refLabel="Murray 1988 lung injury" />
          </p>
        </div>
  
        <section className="border-t border-border py-3 mb-3">
          <h4 className="text-sm font-semibold text-foreground">EOLIA (2018) — historical trial-entry context</h4>
          <p className="text-xs text-muted-foreground">Static teaching only: the panel does not determine patient candidacy or establish that any duration criterion is met.</p>
          <ul className="list-disc pl-5 text-xs space-y-2 mt-2">
            <li>PaO₂/FiO₂ &lt;50 mmHg for &gt;3 h, OR &lt;80 mmHg for &gt;6 h.</li>
            <li>OR pH &lt;7.25 with PaCO₂ ≥60 mmHg for &gt;6 h, respiratory rate increased to 35/min, with ventilator settings adjusted to maintain plateau pressure ≤32 cmH₂O.</li>
            <li>Despite trial-defined optimisation: FiO₂ ≥0.80, tidal volume 6 mL/kg predicted body weight and PEEP ≥10 cmH₂O. Prone positioning and neuromuscular blockade were encouraged before randomisation, not a mandatory waiting period for a centre discussion.</li>
            <li>Other inclusion/exclusion criteria applied, including exclusion for mechanical ventilation ≥7 days. Murray score was not a fourth EOLIA criterion.<InlineRef topicId="ards" refLabel="EOLIA 2018" /></li>
          </ul>
        </section>
        {/* Trend mini-chart */}
        <TrendChart history={history} onReset={resetHistory} />
  
        <div className="border-l-2 border-primary pl-3 py-2">
          <p className="text-sm font-semibold text-foreground">Early ECMO-centre discussion</p>
          <p className="text-xs text-muted-foreground">Discuss potential severe respiratory-failure candidates early while appropriate conventional management is being optimised. Trial observation durations do not instruct a delay in an advisory call or transfer planning. The centre determines candidacy, urgency and retrieval; this tool issues no eligible/not-indicated verdict. ELSO 2021 guidance is distinct from EOLIA trial methods.<InlineRef topicId="ards" refLabel="ELSO 2021 adult VV ECMO" /></p>
        </div>
      </div>
    </DiagramFigure>
  );
};

/* ───── Slider ───── */
function Slider({ label, value, min, max, step, unit, onChange, decimals = 0 }: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; onChange: (v: number) => void; decimals?: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">
          {value.toFixed(decimals)} {unit}
        </span>
      </div>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
      />
    </div>
  );
}

/* ───── Trend chart ───── */
interface TrendPoint { t: number; dp: number; pplat: number; compliance: number; }

function TrendChart({ history, onReset }: { history: TrendPoint[]; onReset: () => void }) {
  const W = 360, H = 150, PL = 36, PR = 36, PT = 18, PB = 22;
  const plotW = W - PL - PR;
  const plotH = H - PT - PB;
  const n = Math.max(history.length, 2);

  const yLMax = 45, yLMin = 0;
  const yRMax = 80, yRMin = 0;
  const xScale = (i: number) => PL + (i / (n - 1)) * plotW;
  const yL = (v: number) => PT + plotH - ((v - yLMin) / (yLMax - yLMin)) * plotH;
  const yR = (v: number) => PT + plotH - ((v - yRMin) / (yRMax - yRMin)) * plotH;

  const linePath = (key: keyof TrendPoint, scale: (v: number) => number) =>
    history
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(i).toFixed(1)},${scale(p[key] as number).toFixed(1)}`)
      .join(" ");

  const last = history[history.length - 1];
  const dpColor = "hsl(var(--primary))";
  if (!last) return <div><p className="text-xs">No valid pressure history points.</p><Button onClick={onReset} variant="outline" size="sm">Reset trend</Button></div>;

  return (
    <div className="rounded-lg border border-border bg-background/40 p-3 mb-3">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <p className="text-sm font-semibold text-foreground">Trajectory — ΔP, Pplat &amp; Compliance</p>
        <Button variant="outline" size="sm"
          onClick={onReset}
          className="text-[10px] px-2 py-1 rounded border border-border bg-secondary hover:bg-secondary/80 text-foreground"
        >
          Reset trend
        </Button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Trend of driving pressure, plateau pressure and compliance">
        {[0, 15, 30, 45].map((p) => (
          <g key={p}>
            <line x1={PL} x2={W - PR} y1={yL(p)} y2={yL(p)} stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray={p === 0 ? "0" : "3 3"} opacity={0.7} />
            <text x={PL - 4} y={yL(p) + 3} textAnchor="end" fontSize={8} fill="hsl(var(--muted-foreground))">{p}</text>
          </g>
        ))}
        {[0, 40, 80].map((v) => (
          <text key={v} x={W - PR + 4} y={yR(v) + 3} fontSize={8} fill="hsl(var(--muted-foreground))">{v}</text>
        ))}

        <line x1={PL} y1={PT} x2={PL} y2={PT + plotH} stroke="hsl(var(--foreground))" strokeWidth={1} />
        <line x1={W - PR} y1={PT} x2={W - PR} y2={PT + plotH} stroke="hsl(var(--foreground))" strokeWidth={1} opacity={0.6} />
        <line x1={PL} y1={PT + plotH} x2={W - PR} y2={PT + plotH} stroke="hsl(var(--foreground))" strokeWidth={1} />
        <text x={10} y={PT + plotH / 2} textAnchor="middle" fontSize={9} fill="hsl(var(--foreground))" transform={`rotate(-90, 10, ${PT + plotH / 2})`}>cmH₂O</text>
        <text x={W - 8} y={PT + plotH / 2} textAnchor="middle" fontSize={9} fill="hsl(var(--foreground))" transform={`rotate(90, ${W - 8}, ${PT + plotH / 2})`}>mL/cmH₂O</text>
        <text x={PL + plotW / 2} y={H - 4} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">adjustments →</text>

        <path d={linePath("pplat", yL)} fill="none" stroke="hsl(var(--accent))" strokeWidth={1.5} strokeDasharray="4 2" />
        <path d={linePath("dp", yL)} fill="none" stroke={dpColor} strokeWidth={2} />
        <path d={linePath("compliance", yR)} fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} />

        {history.length > 0 && (
          <>
            <circle cx={xScale(n - 1)} cy={yL(last.dp)} r={3.5} fill={dpColor} stroke="hsl(var(--card))" strokeWidth={1} />
            <circle cx={xScale(n - 1)} cy={yL(last.pplat)} r={3} fill="hsl(var(--accent))" stroke="hsl(var(--card))" strokeWidth={1} />
            <circle cx={xScale(n - 1)} cy={yR(last.compliance)} r={3} fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth={1} />
          </>
        )}
      </svg>

      <div className="grid grid-cols-3 gap-2 text-[11px] mt-1">
        <LegendDot color={dpColor} label={`ΔP ${last.dp}`} />
        <LegendDot color="hsl(var(--accent))" dashed label={`Pplat ${last.pplat}`} />
        <LegendDot color="hsl(var(--primary))" label={`C ${last.compliance}`} />
      </div>
      <p className="text-[10px] text-muted-foreground mt-1 leading-snug">
        Higher static driving pressure was associated with worse outcomes in Amato 2015; no universally safe cutoff is established. Input-adjustment history shows the last 20 valid pairs, not duration of trial criteria.<InlineRef topicId="ards" refLabel="Amato 2015 driving pressure" />
      </p>
    </div>
  );
}

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
            <div className="flex items-center gap-1.5">
      <svg width={20} height={6} aria-hidden="true" focusable="false">
        <line x1={0} x2={20} y1={3} y2={3} stroke={color} strokeWidth={2} strokeDasharray={dashed ? "3 2" : "0"} />
      </svg>
      <span className="text-muted-foreground font-mono">{label}</span>
    </div>
  );
}

export default EOLIAMurrayCalculator;

import { useMemo, useState } from "react";

/**
 * Lactate clearance + CRT-guided resuscitation sub-tool.
 * Inputs: baseline / 2h / 6h lactate, baseline & current CRT.
 * Outputs: % clearance per Nguyen 2004 / Jansen 2010, ANDROMEDA-SHOCK-style
 * trajectory plot, and fluid responsiveness / escalation suggestion.
 */

const LactateCRTTool = () => {
  const [l0, setL0] = useState(5.2);   // baseline lactate (mmol/L)
  const [l2, setL2] = useState(3.8);
  const [l6, setL6] = useState(2.6);
  const [crt0, setCrt0] = useState(5); // baseline CRT (s)
  const [crtNow, setCrtNow] = useState(3);
  const [map, setMap] = useState(68);
  const [onVaso, setOnVaso] = useState(true);

  const result = useMemo(
    () => evaluate({ l0, l2, l6, crt0, crtNow, map, onVaso }),
    [l0, l2, l6, crt0, crtNow, map, onVaso]
  );

  return (
    <div className="rounded-xl border border-border bg-card p-4 my-6">
      <h3 className="text-lg font-semibold text-foreground">Lactate Clearance &amp; CRT-Guided Resuscitation</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Combines lactate clearance (Nguyen 2004) with peripheral perfusion targeting (ANDROMEDA-SHOCK, Hernández 2019). Goal: ≥ 10% clearance per 2 h <em>or</em> CRT normalisation (≤ 3 s).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
        <Slider label="Baseline lactate (T0)" value={l0} min={1.0} max={15} step={0.1} unit="mmol/L" onChange={setL0} decimals={1} />
        <Slider label="Lactate at 2 h" value={l2} min={0.5} max={15} step={0.1} unit="mmol/L" onChange={setL2} decimals={1} />
        <Slider label="Lactate at 6 h" value={l6} min={0.5} max={15} step={0.1} unit="mmol/L" onChange={setL6} decimals={1} />
        <Slider label="Baseline CRT" value={crt0} min={1} max={10} step={0.5} unit="s" onChange={setCrt0} decimals={1} />
        <Slider label="Current CRT" value={crtNow} min={1} max={10} step={0.5} unit="s" onChange={setCrtNow} decimals={1} />
        <Slider label="Current MAP" value={map} min={40} max={110} step={1} unit="mmHg" onChange={setMap} />
      </div>

      <label className="flex items-center gap-2 text-xs text-muted-foreground mb-4 cursor-pointer">
        <input type="checkbox" checked={onVaso} onChange={(e) => setOnVaso(e.target.checked)} className="accent-primary" />
        On noradrenaline (or other vasopressor)
      </label>

      {/* Numeric outputs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <Stat label="2-h clearance" value={`${result.clear2.toFixed(0)}%`} color={clearanceColor(result.clear2)} />
        <Stat label="6-h clearance" value={`${result.clear6.toFixed(0)}%`} color={clearanceColor(result.clear6)} />
        <Stat label="ΔCRT" value={`${(result.crt0 - result.crtNow).toFixed(1)} s`} color={crtChangeColor(result.crt0 - result.crtNow)} />
        <Stat
          label="CRT normalised"
          value={result.crtNow <= 3 ? "Yes" : "No"}
          color={result.crtNow <= 3 ? "hsl(var(--icu))" : "hsl(var(--destructive))"}
        />
      </div>

      {/* Trajectory chart */}
      <TrajectoryChart l0={l0} l2={l2} l6={l6} />

      {/* Recommendation */}
      <div
        className="rounded-lg p-3 border-l-4 mt-3 mb-3"
        style={{ borderLeftColor: result.recColor, backgroundColor: `${result.recColor}1A` }}
      >
        <p className="text-sm font-bold" style={{ color: result.recColor }}>{result.recTitle}</p>
        <p className="text-xs text-foreground mt-1 leading-relaxed">{result.recDetail}</p>
      </div>

      {/* Educational box */}
      <div className="rounded-lg border border-border p-3">
        <p className="text-sm font-semibold text-foreground mb-1">Key trial evidence</p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>Nguyen 2004</strong>: lactate clearance ≥ 10% over 6 h associated with halved mortality in severe sepsis.</li>
          <li><strong>Jones 2010 (LACTATES)</strong>: lactate clearance non-inferior to ScvO₂-guided resuscitation in EGDT.</li>
          <li><strong>ANDROMEDA-SHOCK 2019</strong>: CRT-targeted resuscitation showed lower 28-day mortality (34.9% vs 43.4%, p = 0.06) and less organ dysfunction vs lactate-targeted — Bayesian re-analysis ~96% probability of benefit.</li>
          <li><strong>Hyperlactataemia ≠ tissue hypoxia alone</strong> — also driven by stress catecholamines, hepatic dysfunction, β₂-agonists, metformin. Trend matters more than absolute value.</li>
        </ul>
      </div>

      <p className="text-[10px] text-muted-foreground mt-3 italic">
        Refs: Nguyen HB et al. Crit Care Med 2004;32:1637. Jansen TC et al. Am J Respir Crit Care Med 2010;182:752. Hernández G et al. ANDROMEDA-SHOCK. JAMA 2019;321:654.
      </p>
    </div>
  );
};

/* ───── Trajectory chart ───── */
function TrajectoryChart({ l0, l2, l6 }: { l0: number; l2: number; l6: number }) {
  const W = 360, H = 160, PL = 38, PR = 18, PT = 18, PB = 28;
  const plotW = W - PL - PR;
  const plotH = H - PT - PB;
  const yMax = Math.max(8, Math.ceil(Math.max(l0, l2, l6) + 1));
  const yMin = 0;
  const tMax = 6;

  const xScale = (t: number) => PL + (t / tMax) * plotW;
  const yScale = (v: number) => PT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  const points = [
    { t: 0, v: l0 },
    { t: 2, v: l2 },
    { t: 6, v: l6 },
  ];
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.t).toFixed(1)},${yScale(p.v).toFixed(1)}`).join(" ");

  // Target trajectory: 10% per hour decay from baseline (illustrative reference)
  const targetPath = (() => {
    const segs: string[] = [];
    for (let t = 0; t <= 6; t += 0.5) {
      const v = l0 * Math.pow(0.9, t);
      segs.push(`${t === 0 ? "M" : "L"} ${xScale(t).toFixed(1)},${yScale(v).toFixed(1)}`);
    }
    return segs.join(" ");
  })();

  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <p className="text-sm font-semibold text-foreground mb-1">Lactate trajectory</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Lactate trajectory at 0, 2 and 6 hours">
        {/* Grid */}
        {[0, 2, 4, 6, 8].filter(v => v <= yMax).map((p) => (
          <g key={p}>
            <line x1={PL} x2={W - PR} y1={yScale(p)} y2={yScale(p)} stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray={p === 0 ? "0" : "3 3"} opacity={0.7} />
            <text x={PL - 4} y={yScale(p) + 3} textAnchor="end" fontSize={8} fill="hsl(var(--muted-foreground))">{p}</text>
          </g>
        ))}

        {/* 2 mmol/L threshold */}
        <line x1={PL} x2={W - PR} y1={yScale(2)} y2={yScale(2)} stroke="hsl(var(--icu))" strokeWidth={0.8} strokeDasharray="4 3" opacity={0.6} />
        <text x={W - PR - 2} y={yScale(2) - 2} textAnchor="end" fontSize={8} fill="hsl(var(--icu))">2 mmol/L target</text>

        {/* Axes */}
        <line x1={PL} y1={PT} x2={PL} y2={PT + plotH} stroke="hsl(var(--foreground))" strokeWidth={1} />
        <line x1={PL} y1={PT + plotH} x2={W - PR} y2={PT + plotH} stroke="hsl(var(--foreground))" strokeWidth={1} />
        <text x={10} y={PT + plotH / 2} textAnchor="middle" fontSize={9} fill="hsl(var(--foreground))" transform={`rotate(-90, 10, ${PT + plotH / 2})`}>mmol/L</text>

        {/* X ticks */}
        {[0, 2, 6].map((t) => (
          <g key={t}>
            <line x1={xScale(t)} x2={xScale(t)} y1={PT + plotH} y2={PT + plotH + 3} stroke="hsl(var(--foreground))" strokeWidth={1} />
            <text x={xScale(t)} y={H - 12} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">{t}h</text>
          </g>
        ))}
        <text x={PL + plotW / 2} y={H - 2} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">Time</text>

        {/* Reference target trajectory */}
        <path d={targetPath} fill="none" stroke="hsl(var(--accent))" strokeWidth={1.2} strokeDasharray="3 3" opacity={0.7} />

        {/* Actual trajectory */}
        <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.4} strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={xScale(p.t)} cy={yScale(p.v)} r={4} fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth={1.2} />
            <text x={xScale(p.t) + 6} y={yScale(p.v) - 4} fontSize={9} fontWeight="bold" fill="hsl(var(--foreground))">
              {p.v.toFixed(1)}
            </text>
          </g>
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-2 text-[11px] mt-1">
        <Legend color="hsl(var(--primary))" label="Patient" />
        <Legend color="hsl(var(--accent))" dashed label="10%/h target decay" />
      </div>
    </div>
  );
}

/* ───── Helpers ───── */
function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-2 text-center">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-base font-bold font-mono" style={{ color }}>{value}</p>
    </div>
  );
}

function Slider({ label, value, min, max, step, unit, onChange, decimals = 0 }: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; onChange: (v: number) => void; decimals?: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{value.toFixed(decimals)} {unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
      />
    </div>
  );
}

function Legend({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width={20} height={6}>
        <line x1={0} x2={20} y1={3} y2={3} stroke={color} strokeWidth={2} strokeDasharray={dashed ? "3 2" : "0"} />
      </svg>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function clearanceColor(c: number) {
  if (c >= 20) return "hsl(var(--icu))";
  if (c >= 10) return "hsl(45 90% 50%)";
  if (c >= 0)  return "hsl(25 90% 55%)";
  return "hsl(var(--destructive))";
}
function crtChangeColor(d: number) {
  if (d >= 2) return "hsl(var(--icu))";
  if (d >= 0.5) return "hsl(45 90% 50%)";
  if (d >= 0) return "hsl(25 90% 55%)";
  return "hsl(var(--destructive))";
}

/* ───── Logic ───── */
interface Inputs {
  l0: number; l2: number; l6: number;
  crt0: number; crtNow: number; map: number; onVaso: boolean;
}

function evaluate(i: Inputs) {
  const clear2 = ((i.l0 - i.l2) / i.l0) * 100;
  const clear6 = ((i.l0 - i.l6) / i.l0) * 100;
  const crtNorm = i.crtNow <= 3;
  const _crtImproving = (i.crt0 - i.crtNow) >= 1;
  const goodLactate = clear2 >= 10 || clear6 >= 20 || i.l6 <= 2;
  const persistentShock = i.map < 65 && i.onVaso;
  const risingLactate = i.l2 > i.l0 || i.l6 > i.l2;

  let recTitle = "", recDetail = "", recColor = "";

  if (risingLactate) {
    recTitle = "Lactate rising — escalate now";
    recDetail =
      "Failure to clear (or rising) lactate signals ongoing tissue hypoperfusion or unmet metabolic demand. Reassess source control, exclude bleeding/ischaemia, increase vasopressor (target MAP ≥ 65), consider inotrope (dobutamine 2.5–10 µg/kg/min) if poor cardiac output, and reassess fluid responsiveness with PLR or stroke volume variation. Avoid blind further fluid boluses.";
    recColor = "hsl(var(--destructive))";
  } else if (!goodLactate && !crtNorm) {
    recTitle = "Inadequate clearance and abnormal CRT — continue active resuscitation";
    recDetail =
      "Test fluid responsiveness (passive leg raise → ΔSV > 10–15%). If responsive, give 250–500 mL balanced crystalloid bolus and reassess. If unresponsive, prioritise vasopressor + inotrope strategy. Recheck lactate and CRT in 1–2 h. Beware fluid overload — CLOVERS / CLASSIC support a restrictive strategy after the initial bolus.";
    recColor = "hsl(25 90% 55%)";
  } else if (goodLactate && crtNorm) {
    recTitle = "Resuscitation goals met — switch to maintenance &amp; de-escalate";
    recDetail =
      "Lactate clearing and peripheral perfusion restored (CRT ≤ 3 s). Move to conservative fluid strategy, wean vasopressor as MAP tolerates, and continue source control. Daily fluid balance review; consider de-resuscitation if positive cumulative balance > 3–5 L.";
    recColor = "hsl(var(--icu))";
  } else if (crtNorm && !goodLactate) {
    recTitle = "CRT normalised but lactate sluggish — ANDROMEDA-SHOCK favours stopping";
    recDetail =
      "Peripheral perfusion is the more responsive endpoint in ANDROMEDA-SHOCK. Persistent hyperlactataemia despite normal CRT often reflects non-hypoxic causes (catecholamines, hepatic dysfunction). Avoid further fluid loading; trend lactate but do not chase the number.";
    recColor = "hsl(45 90% 50%)";
  } else {
    recTitle = "Lactate improving but CRT abnormal — keep resuscitating";
    recDetail =
      "Continue assessing fluid responsiveness and ensure MAP ≥ 65. Recheck CRT every 30 min during active resuscitation. Improving lactate is reassuring but persistent peripheral hypoperfusion predicts worse outcome.";
    recColor = "hsl(25 90% 55%)";
  }

  if (persistentShock) {
    recDetail += " Persistent vasoplegia despite noradrenaline — consider vasopressin 0.03 U/min (VANISH/VASST), assess for adrenal insufficiency (give hydrocortisone 200 mg/day if catecholamine-refractory per APROCCHSS).";
  }

  return {
    clear2, clear6,
    crt0: i.crt0, crtNow: i.crtNow,
    recTitle, recDetail, recColor,
  };
}

export default LactateCRTTool;

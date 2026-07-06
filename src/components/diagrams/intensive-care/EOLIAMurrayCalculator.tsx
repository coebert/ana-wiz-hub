import { useEffect, useMemo, useRef, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Interactive EOLIA / Murray Lung Injury Score calculator for ARDS.
 * Inputs: PaO2/FiO2, pH, PaCO2, plateau pressure, static compliance, CXR quadrants, PEEP.
 * Outputs: Murray score (0–4) + EOLIA-style ECMO referral recommendation.
 */

const EOLIAMurrayCalculator = () => {
  const [pf, setPf] = useState(75);          // mmHg
  const [ph, setPh] = useState(7.22);
  const [paco2, setPaco2] = useState(65);    // mmHg
  const [pplat, setPplat] = useState(34);    // cmH2O
  const [compliance, setCompliance] = useState(22); // mL/cmH2O
  const [quadrants, setQuadrants] = useState(3);    // 1–4
  const [peep, setPeep] = useState(14);      // cmH2O
  const [optimised, setOptimised] = useState(true);

  const result = useMemo(
    () => evaluate({ pf, ph, paco2, pplat, compliance, quadrants, peep, optimised }),
    [pf, ph, paco2, pplat, compliance, quadrants, peep, optimised]
  );

  // Trend history — captures each settled adjustment (debounced)
  const dp = pplat - peep;
  const [history, setHistory] = useState<TrendPoint[]>([
    { t: 0, dp: 34 - 14, pplat: 34, compliance: 22 },
  ]);
  const debRef = useRef<number | null>(null);
  useEffect(() => {
    if (debRef.current) window.clearTimeout(debRef.current);
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
    setHistory([{ t: 0, dp, pplat, compliance }]);

  return (
    <DiagramFigure
      id="eolia-murray-calculator"
      title="EOLIA murray"
      description="Auto-generated wrapper for the EOLIA murray interactive calculator. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">EOLIA / Murray ECMO Eligibility Calculator</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Combines the Murray Lung Injury Score (0–4) with EOLIA trial referral criteria. Indicative only — final decision sits with the regional ECMO centre.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <Slider label="PaO₂ / FiO₂" value={pf} min={30} max={300} step={5} unit="mmHg" onChange={setPf} />
          <Slider label="pH" value={ph} min={6.9} max={7.5} step={0.01} unit="" onChange={setPh} decimals={2} />
          <Slider label="PaCO₂" value={paco2} min={30} max={120} step={1} unit="mmHg" onChange={setPaco2} />
          <Slider label="Plateau pressure" value={pplat} min={15} max={45} step={1} unit="cmH₂O" onChange={setPplat} />
          <Slider label="Static compliance" value={compliance} min={5} max={80} step={1} unit="mL/cmH₂O" onChange={setCompliance} />
          <Slider label="PEEP" value={peep} min={5} max={24} step={1} unit="cmH₂O" onChange={setPeep} />
          <div className="md:col-span-2">
            <Slider label="CXR quadrants with consolidation" value={quadrants} min={0} max={4} step={1} unit="/ 4" onChange={setQuadrants} />
          </div>
        </div>
  
        <label className="flex items-center gap-2 text-xs text-muted-foreground mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={optimised}
            onChange={(e) => setOptimised(e.target.checked)}
            className="accent-primary"
          />
          Conventional therapy optimised (lung-protective ventilation, prone ≥ 16 h, NMB if needed) for ≥ 6 h
        </label>
  
        {/* Murray score breakdown */}
        <div className="rounded-lg bg-secondary/40 border border-border p-3 mb-3">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Murray Lung Injury Score</p>
            <p className="text-2xl font-bold" style={{ color: result.murrayColor }}>
              {result.murray.toFixed(2)}
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
            Total ÷ 4 components = score. <strong>0</strong> no injury · <strong>0.1–2.5</strong> mild–moderate · <strong>&gt; 2.5</strong> severe (ARDS).
          </p>
        </div>
  
        {/* EOLIA criteria */}
        <div className="rounded-lg border border-border p-3 mb-3">
          <p className="text-sm font-semibold text-foreground mb-2">EOLIA (2018) referral criteria</p>
          <ul className="text-xs space-y-1">
            {result.eoliaChecks.map((c) => (
              <li key={c.label} className="flex items-start gap-2">
                <span className={c.met ? "text-icu" : "text-muted-foreground"}>
                  {c.met ? "✓" : "○"}
                </span>
                <span className={c.met ? "text-foreground" : "text-muted-foreground"}>
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Trend mini-chart */}
        <TrendChart history={history} onReset={resetHistory} />
  
        {/* Recommendation */}
        <div
          className="rounded-lg p-3 border-l-4"
          style={{
            borderLeftColor: result.recColor,
            backgroundColor: `${result.recColor}1A`,
          }}
        >
          <p className="text-sm font-bold" style={{ color: result.recColor }}>
            {result.recTitle}
          </p>
          <p className="text-xs text-foreground mt-1 leading-relaxed">{result.recDetail}</p>
        </div>
  
        <p className="text-[10px] text-muted-foreground mt-3 italic">
          Refs: Murray DR et al. Am Rev Respir Dis 1988;138:720. Combes A et al. EOLIA. NEJM 2018;378:1965. ELSO guidelines 2021.
        </p>
      </div>
    </DiagramFigure>
  );
};

/* ───── Calculator logic ───── */
interface Inputs {
  pf: number; ph: number; paco2: number; pplat: number;
  compliance: number; quadrants: number; peep: number; optimised: boolean;
}

function murrayPF(pf: number) {
  if (pf >= 300) return 0;
  if (pf >= 225) return 1;
  if (pf >= 175) return 2;
  if (pf >= 100) return 3;
  return 4;
}
function murrayPEEP(peep: number) {
  if (peep <= 5) return 0;
  if (peep <= 8) return 1;
  if (peep <= 11) return 2;
  if (peep <= 14) return 3;
  return 4;
}
function murrayCompliance(c: number) {
  if (c >= 80) return 0;
  if (c >= 60) return 1;
  if (c >= 40) return 2;
  if (c >= 20) return 3;
  return 4;
}
function murrayQuadrants(q: number) {
  return Math.max(0, Math.min(4, Math.round(q)));
}

function evaluate(i: Inputs) {
  const pPf = murrayPF(i.pf);
  const pPeep = murrayPEEP(i.peep);
  const pComp = murrayCompliance(i.compliance);
  const pQ = murrayQuadrants(i.quadrants);
  const murray = (pPf + pPeep + pComp + pQ) / 4;

  const breakdown = [
    { label: "PaO₂/FiO₂", value: `${i.pf} mmHg`, points: pPf },
    { label: "PEEP", value: `${i.peep} cmH₂O`, points: pPeep },
    { label: "Compliance", value: `${i.compliance} mL/cmH₂O`, points: pComp },
    { label: "CXR quadrants", value: `${pQ} / 4`, points: pQ },
  ];

  // EOLIA criteria (any one of the three primary triggers)
  const eoliaChecks = [
    { label: "PaO₂/FiO₂ < 50 mmHg for > 3 h", met: i.pf < 50 },
    { label: "PaO₂/FiO₂ < 80 mmHg for > 6 h", met: i.pf < 80 },
    { label: "Uncompensated hypercapnia: pH < 7.25 with PaCO₂ ≥ 60 mmHg for > 6 h (despite RR ≤ 35, Pplat ≤ 32)", met: i.ph < 7.25 && i.paco2 >= 60 },
    { label: "Murray score ≥ 3", met: murray >= 3 },
    { label: "Plateau pressure ≤ 32 cmH₂O (safety)", met: i.pplat <= 32 },
    { label: "Conventional therapy optimised", met: i.optimised },
  ];

  const eoliaTriggerMet =
    i.pf < 50 ||
    i.pf < 80 ||
    (i.ph < 7.25 && i.paco2 >= 60) ||
    murray >= 3;

  // Colour bands
  const murrayColor =
    murray >= 3 ? "hsl(var(--destructive))" :
    murray > 2.5 ? "hsl(25 90% 55%)" :
    murray >= 1 ? "hsl(45 90% 50%)" :
    "hsl(var(--icu))";

  let recTitle = "";
  let recDetail = "";
  let recColor = "";

  if (eoliaTriggerMet && i.optimised) {
    recTitle = "Refer to ECMO centre now";
    recDetail =
      "EOLIA referral threshold met with optimised conventional therapy. Contact regional VV-ECMO service early — transfer is safer before profound deterioration. Continue lung-protective ventilation, prone positioning and NMB during discussion.";
    recColor = "hsl(var(--destructive))";
  } else if (eoliaTriggerMet && !i.optimised) {
    recTitle = "Optimise first, then refer";
    recDetail =
      "EOLIA physiological criteria reached but conventional therapy not yet fully optimised. Apply VT 6 mL/kg IBW with Pplat ≤ 30, prone ≥ 16 h/day, NMB for 24–48 h, recruitment if appropriate. Re-assess in 4–6 h and refer if no improvement.";
    recColor = "hsl(25 90% 55%)";
  } else if (murray > 2.5) {
    recTitle = "Severe ARDS — discuss early with ECMO centre";
    recDetail =
      "Murray score consistent with severe ARDS but EOLIA trigger not met. Early advisory call to the ECMO centre is reasonable to plan trajectory. Ensure full lung-protective bundle, prone if P/F < 150.";
    recColor = "hsl(45 90% 50%)";
  } else {
    recTitle = "ECMO not currently indicated";
    recDetail =
      "Continue lung-protective ventilation, conservative fluid balance and treat the underlying cause. Reassess if oxygenation, ventilation or compliance deteriorate.";
    recColor = "hsl(var(--icu))";
  }

  return { murray, breakdown, eoliaChecks, recTitle, recDetail, recColor, murrayColor };
}

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
  const dpColor =
    last.dp <= 14 ? "hsl(var(--icu))" :
    last.dp <= 18 ? "hsl(45 90% 50%)" :
    "hsl(var(--destructive))";

  return (
    <div className="rounded-lg border border-border bg-background/40 p-3 mb-3">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <p className="text-sm font-semibold text-foreground">Trajectory — ΔP, Pplat &amp; Compliance</p>
        <button
          onClick={onReset}
          className="text-[10px] px-2 py-1 rounded border border-border bg-secondary hover:bg-secondary/80 text-foreground"
        >
          Reset trend
        </button>
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

        <rect x={PL} y={yL(14)} width={plotW} height={yL(0) - yL(14)} fill="hsl(var(--icu))" opacity={0.06} />
        <line x1={PL} x2={W - PR} y1={yL(14)} y2={yL(14)} stroke="hsl(var(--destructive))" strokeWidth={0.75} strokeDasharray="4 3" opacity={0.6} />
        <text x={W - PR - 2} y={yL(14) - 2} textAnchor="end" fontSize={8} fill="hsl(var(--destructive))">ΔP 14</text>

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
        Shaded band = ΔP ≤ 14 cmH₂O safety zone (Amato 2015). Trend captures each settled adjustment (last 20 shown).
      </p>
    </div>
  );
}

function LegendDot({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
            <div className="flex items-center gap-1.5">
      <svg width={20} height={6}>
        <line x1={0} x2={20} y1={3} y2={3} stroke={color} strokeWidth={2} strokeDasharray={dashed ? "3 2" : "0"} />
      </svg>
      <span className="text-muted-foreground font-mono">{label}</span>
    </div>
  );
}

export default EOLIAMurrayCalculator;

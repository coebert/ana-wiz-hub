import { useMemo, useState } from "react";

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

  return (
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

export default EOLIAMurrayCalculator;

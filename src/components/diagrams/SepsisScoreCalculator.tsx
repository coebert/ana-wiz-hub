import { useMemo, useState } from "react";

/**
 * Interactive SOFA + qSOFA + NEWS2 calculator for sepsis screening &
 * severity stratification, with side-by-side scores and a
 * sensitivity / specificity comparison for in-hospital mortality.
 */

const SepsisScoreCalculator = () => {
  // Vitals
  const [sbp, setSbp] = useState(92);          // mmHg
  const [map, setMap] = useState(62);          // mmHg
  const [rr, setRr] = useState(24);            // /min
  const [hr, setHr] = useState(108);           // /min
  const [spo2, setSpo2] = useState(94);        // %
  const [temp, setTemp] = useState(38.4);      // °C
  const [onO2, setOnO2] = useState(true);

  // Mental state
  const [gcs, setGcs] = useState(14);
  const [confusion, setConfusion] = useState(true); // for qSOFA / NEWS2 ACVPU

  // Labs / organ support
  const [pf, setPf] = useState(280);           // mmHg PaO2/FiO2
  const [platelets, setPlatelets] = useState(120); // x10^9/L
  const [bilirubin, setBilirubin] = useState(28);  // µmol/L
  const [creatinine, setCreatinine] = useState(140); // µmol/L
  const [vasopressor, setVasopressor] = useState<"none" | "lowDopa" | "lowNor" | "highNor">("lowNor");

  const result = useMemo(
    () => evaluate({ sbp, map, rr, hr, spo2, temp, onO2, gcs, confusion, pf, platelets, bilirubin, creatinine, vasopressor }),
    [sbp, map, rr, hr, spo2, temp, onO2, gcs, confusion, pf, platelets, bilirubin, creatinine, vasopressor]
  );

  return (
    <div className="rounded-xl border border-border bg-card p-4 my-6">
      <h3 className="text-lg font-semibold text-foreground">Sepsis Scoring — SOFA · qSOFA · NEWS2</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Enter the worst values in the last 24 h. Outputs each score side-by-side with mortality risk and a head-to-head sensitivity/specificity comparison.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
        <Slider label="Systolic BP" value={sbp} min={50} max={200} step={1} unit="mmHg" onChange={setSbp} />
        <Slider label="Mean arterial pressure" value={map} min={30} max={120} step={1} unit="mmHg" onChange={setMap} />
        <Slider label="Respiratory rate" value={rr} min={6} max={40} step={1} unit="/min" onChange={setRr} />
        <Slider label="Heart rate" value={hr} min={30} max={180} step={1} unit="/min" onChange={setHr} />
        <Slider label="SpO₂" value={spo2} min={70} max={100} step={1} unit="%" onChange={setSpo2} />
        <Slider label="Temperature" value={temp} min={33} max={41} step={0.1} unit="°C" onChange={setTemp} decimals={1} />
        <Slider label="GCS" value={gcs} min={3} max={15} step={1} unit="" onChange={setGcs} />
        <Slider label="PaO₂/FiO₂" value={pf} min={50} max={500} step={10} unit="mmHg" onChange={setPf} />
        <Slider label="Platelets" value={platelets} min={5} max={400} step={5} unit="×10⁹/L" onChange={setPlatelets} />
        <Slider label="Bilirubin" value={bilirubin} min={5} max={400} step={1} unit="µmol/L" onChange={setBilirubin} />
        <Slider label="Creatinine" value={creatinine} min={40} max={500} step={5} unit="µmol/L" onChange={setCreatinine} />
        <div>
          <p className="text-xs text-muted-foreground mb-1">Vasopressors</p>
          <select
            value={vasopressor}
            onChange={(e) => setVasopressor(e.target.value as typeof vasopressor)}
            className="w-full px-2 py-1 text-xs rounded-md border border-border bg-background text-foreground"
          >
            <option value="none">None</option>
            <option value="lowDopa">Dopamine ≤ 5 / dobutamine</option>
            <option value="lowNor">Noradrenaline ≤ 0.1 µg/kg/min</option>
            <option value="highNor">Noradrenaline &gt; 0.1 µg/kg/min</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4 text-xs">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={onO2} onChange={(e) => setOnO2(e.target.checked)} className="accent-primary" />
          <span className="text-muted-foreground">On supplemental O₂ (NEWS2)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={confusion} onChange={(e) => setConfusion(e.target.checked)} className="accent-primary" />
          <span className="text-muted-foreground">New confusion / altered mentation</span>
        </label>
      </div>

      {/* Side-by-side score cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <ScoreCard
          name="qSOFA"
          score={result.qsofa.total}
          maxScore={3}
          color={result.qsofa.color}
          band={result.qsofa.band}
          breakdown={result.qsofa.breakdown}
        />
        <ScoreCard
          name="NEWS2"
          score={result.news2.total}
          maxScore={20}
          color={result.news2.color}
          band={result.news2.band}
          breakdown={result.news2.breakdown}
        />
        <ScoreCard
          name="SOFA"
          score={result.sofa.total}
          maxScore={24}
          color={result.sofa.color}
          band={result.sofa.band}
          breakdown={result.sofa.breakdown}
        />
      </div>

      {/* Recommendation */}
      <div
        className="rounded-lg p-3 border-l-4 mb-4"
        style={{ borderLeftColor: result.recColor, backgroundColor: `${result.recColor}1A` }}
      >
        <p className="text-sm font-bold" style={{ color: result.recColor }}>{result.recTitle}</p>
        <p className="text-xs text-foreground mt-1 leading-relaxed">{result.recDetail}</p>
      </div>

      {/* Sensitivity / specificity comparison */}
      <div className="rounded-lg border border-border p-3">
        <p className="text-sm font-semibold text-foreground mb-2">Performance for in-hospital mortality</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-1">Score</th>
                <th className="text-left py-1">Threshold</th>
                <th className="text-right py-1">Sens.</th>
                <th className="text-right py-1">Spec.</th>
                <th className="text-right py-1">AUROC</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              {PERFORMANCE.map((p) => (
                <tr key={p.name} className="border-b border-border/50">
                  <td className="py-1 font-medium">{p.name}</td>
                  <td className="py-1 text-muted-foreground">{p.threshold}</td>
                  <td className="py-1 text-right font-mono">{p.sens}</td>
                  <td className="py-1 text-right font-mono">{p.spec}</td>
                  <td className="py-1 text-right font-mono font-semibold">{p.auroc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
          <strong>SOFA</strong> (ICU patients) outperforms qSOFA and NEWS2 for mortality discrimination but requires labs. <strong>NEWS2</strong> has the best sensitivity for ward deterioration. <strong>qSOFA</strong> is highly specific but insensitive — a negative qSOFA does not exclude sepsis. Surviving Sepsis 2021 advises against qSOFA as a single screening tool; use SIRS, NEWS2 or MEWS instead.
        </p>
      </div>

      <p className="text-[10px] text-muted-foreground mt-3 italic">
        Refs: Singer M et al. Sepsis-3. JAMA 2016;315:801. Seymour CW et al. JAMA 2016;315:762. RCP NEWS2 2017 (updated 2020). Surviving Sepsis Campaign 2021.
      </p>
    </div>
  );
};

/* ───── Score card ───── */
function ScoreCard({ name, score, maxScore, color, band, breakdown }: {
  name: string; score: number; maxScore: number; color: string; band: string;
  breakdown: { label: string; points: number }[];
}) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-sm font-bold text-foreground">{name}</p>
        <p className="text-2xl font-bold" style={{ color }}>
          {score}<span className="text-xs text-muted-foreground font-normal ml-1">/ {maxScore}</span>
        </p>
      </div>
      <p className="text-[11px] font-medium mb-2" style={{ color }}>{band}</p>
      <ul className="text-[11px] space-y-0.5">
        {breakdown.map((b) => (
          <li key={b.label} className="flex justify-between">
            <span className="text-muted-foreground">{b.label}</span>
            <span className="font-mono text-foreground">{b.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───── Slider ───── */
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

/* ───── Performance reference (published meta-analyses) ───── */
const PERFORMANCE = [
  { name: "qSOFA", threshold: "≥ 2", sens: "0.51", spec: "0.79", auroc: "0.65" },
  { name: "NEWS2", threshold: "≥ 5", sens: "0.78", spec: "0.66", auroc: "0.77" },
  { name: "SOFA",  threshold: "≥ 2 (Δ from baseline)", sens: "0.88", spec: "0.64", auroc: "0.79" },
];

/* ───── Calculator logic ───── */
interface Inputs {
  sbp: number; map: number; rr: number; hr: number; spo2: number; temp: number;
  onO2: boolean; gcs: number; confusion: boolean;
  pf: number; platelets: number; bilirubin: number; creatinine: number;
  vasopressor: "none" | "lowDopa" | "lowNor" | "highNor";
}

function bandColor(low: boolean, mid: boolean, high: boolean) {
  if (high) return "hsl(var(--destructive))";
  if (mid) return "hsl(25 90% 55%)";
  if (low) return "hsl(45 90% 50%)";
  return "hsl(var(--icu))";
}

function calcQSOFA(i: Inputs) {
  const breakdown = [
    { label: "RR ≥ 22", points: i.rr >= 22 ? 1 : 0 },
    { label: "SBP ≤ 100", points: i.sbp <= 100 ? 1 : 0 },
    { label: "Altered mentation (GCS < 15)", points: i.gcs < 15 || i.confusion ? 1 : 0 },
  ];
  const total = breakdown.reduce((s, b) => s + b.points, 0);
  const band =
    total >= 2 ? "High risk — 3–14× mortality" :
    total === 1 ? "Borderline — reassess" :
    "Low risk";
  return { total, breakdown, band, color: bandColor(total === 1, false, total >= 2) };
}

function newsRR(rr: number) { if (rr <= 8) return 3; if (rr <= 11) return 1; if (rr <= 20) return 0; if (rr <= 24) return 2; return 3; }
function newsSpO2(s: number) { if (s <= 91) return 3; if (s <= 93) return 2; if (s <= 95) return 1; return 0; }
function newsTemp(t: number) { if (t <= 35) return 3; if (t <= 36) return 1; if (t <= 38) return 0; if (t <= 39) return 1; return 2; }
function newsSBP(b: number) { if (b <= 90) return 3; if (b <= 100) return 2; if (b <= 110) return 1; if (b <= 219) return 0; return 3; }
function newsHR(h: number) { if (h <= 40) return 3; if (h <= 50) return 1; if (h <= 90) return 0; if (h <= 110) return 1; if (h <= 130) return 2; return 3; }

function calcNEWS2(i: Inputs) {
  const breakdown = [
    { label: "RR", points: newsRR(i.rr) },
    { label: "SpO₂", points: newsSpO2(i.spo2) },
    { label: "Supplemental O₂", points: i.onO2 ? 2 : 0 },
    { label: "Temperature", points: newsTemp(i.temp) },
    { label: "SBP", points: newsSBP(i.sbp) },
    { label: "HR", points: newsHR(i.hr) },
    { label: "Consciousness (ACVPU)", points: i.confusion || i.gcs < 15 ? 3 : 0 },
  ];
  const total = breakdown.reduce((s, b) => s + b.points, 0);
  const band =
    total >= 7 ? "High — emergency assessment, critical care review" :
    total >= 5 ? "Medium — urgent review within 1 h" :
    total >= 1 ? "Low — minimum 4–6 hourly" :
    "No clinical concern";
  return { total, breakdown, band, color: bandColor(total >= 1 && total < 5, total >= 5 && total < 7, total >= 7) };
}

function sofaResp(pf: number, ventilated: boolean) {
  if (pf < 100 && ventilated) return 4;
  if (pf < 200 && ventilated) return 3;
  if (pf < 300) return 2;
  if (pf < 400) return 1;
  return 0;
}
function sofaCoag(p: number) { if (p < 20) return 4; if (p < 50) return 3; if (p < 100) return 2; if (p < 150) return 1; return 0; }
function sofaLiver(b: number) { if (b > 204) return 4; if (b > 102) return 3; if (b > 32) return 2; if (b > 20) return 1; return 0; }
function sofaCv(map: number, vp: Inputs["vasopressor"]) {
  if (vp === "highNor") return 4;
  if (vp === "lowNor") return 3;
  if (vp === "lowDopa") return 2;
  if (map < 70) return 1;
  return 0;
}
function sofaCns(g: number) { if (g < 6) return 4; if (g < 10) return 3; if (g < 13) return 2; if (g < 15) return 1; return 0; }
function sofaRenal(c: number) { if (c > 440) return 4; if (c > 300) return 3; if (c > 170) return 2; if (c > 110) return 1; return 0; }

function calcSOFA(i: Inputs) {
  const ventilated = i.pf < 300; // proxy
  const breakdown = [
    { label: "Respiratory (P/F)", points: sofaResp(i.pf, ventilated) },
    { label: "Coagulation (platelets)", points: sofaCoag(i.platelets) },
    { label: "Liver (bilirubin)", points: sofaLiver(i.bilirubin) },
    { label: "Cardiovascular (MAP/vasopressor)", points: sofaCv(i.map, i.vasopressor) },
    { label: "CNS (GCS)", points: sofaCns(i.gcs) },
    { label: "Renal (creatinine)", points: sofaRenal(i.creatinine) },
  ];
  const total = breakdown.reduce((s, b) => s + b.points, 0);
  const band =
    total >= 11 ? "Mortality > 80%" :
    total >= 8 ? "Mortality 40–50%" :
    total >= 6 ? "Mortality 20%" :
    total >= 2 ? "Sepsis (Δ ≥ 2 from baseline)" :
    "No organ dysfunction";
  return { total, breakdown, band, color: bandColor(total >= 2 && total < 6, total >= 6 && total < 11, total >= 11) };
}

function evaluate(i: Inputs) {
  const qsofa = calcQSOFA(i);
  const news2 = calcNEWS2(i);
  const sofa = calcSOFA(i);

  let recTitle = "", recDetail = "", recColor = "";

  if (sofa.total >= 2 && (qsofa.total >= 2 || news2.total >= 5)) {
    recTitle = "Sepsis (Sepsis-3) — start sepsis bundle now";
    recDetail =
      "SOFA Δ ≥ 2 with positive screen. Apply Surviving Sepsis Hour-1 bundle: blood cultures, broad-spectrum antibiotics, lactate, balanced crystalloid 30 mL/kg if hypotensive or lactate ≥ 4, noradrenaline if MAP < 65 after fluids. Source control as soon as feasible.";
    recColor = "hsl(var(--destructive))";
  } else if (news2.total >= 5 || qsofa.total >= 2) {
    recTitle = "High suspicion of sepsis — escalate and investigate";
    recDetail =
      "Positive screen but organ dysfunction not yet established. Senior review within 1 h, full septic screen, lactate, blood cultures and empirical antibiotics within 1 h if sepsis remains likely (NICE NG51).";
    recColor = "hsl(25 90% 55%)";
  } else if (news2.total >= 1) {
    recTitle = "Low–moderate concern — reassess";
    recDetail =
      "Continue close observations (NEWS2 4–6 hourly). Look for evolving infection markers; do not exclude sepsis on a single negative qSOFA — its sensitivity is only ~50%.";
    recColor = "hsl(45 90% 50%)";
  } else {
    recTitle = "No current evidence of sepsis";
    recDetail =
      "Routine observations. Re-screen if clinical picture changes or new infection source emerges.";
    recColor = "hsl(var(--icu))";
  }

  return { qsofa, news2, sofa, recTitle, recDetail, recColor };
}

export default SepsisScoreCalculator;

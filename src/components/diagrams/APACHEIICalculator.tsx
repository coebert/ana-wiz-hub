import { useMemo, useState } from "react";

/**
 * APACHE II calculator (Knaus 1985).
 * APS (12 acute physiology variables, worst in first 24 h) + age + chronic health.
 * Outputs raw score, predicted hospital mortality % using Knaus logistic regression
 * for non-operative admissions, and a side-by-side comparison vs SOFA at 24 h.
 */

type ChronicHealth = "none" | "elective" | "emergencyOrMedical";
type AdmissionType = "nonOp" | "postOpElective" | "postOpEmergency";

const APACHEIICalculator = () => {
  // 12 APS variables — worst value in first 24 h
  const [temp, setTemp] = useState(38.5);    // °C (rectal)
  const [map, setMap] = useState(70);        // mmHg
  const [hr, setHr] = useState(110);         // /min
  const [rr, setRr] = useState(24);          // /min
  const [aaO2, setAaO2] = useState(180);     // mmHg (used if FiO2 ≥ 0.5)
  const [pao2, setPao2] = useState(70);      // mmHg (used if FiO2 < 0.5)
  const [fio2, setFio2] = useState(0.4);
  const [phArt, setPhArt] = useState(7.32);
  const [na, setNa] = useState(138);         // mmol/L
  const [k, setK] = useState(4.2);           // mmol/L
  const [creat, setCreat] = useState(180);   // µmol/L
  const [aki, setAki] = useState(true);      // doubles renal points
  const [hct, setHct] = useState(34);        // %
  const [wcc, setWcc] = useState(16);        // x10^9/L
  const [gcs, setGcs] = useState(12);        // 3–15

  const [age, setAge] = useState(68);
  const [chronic, setChronic] = useState<ChronicHealth>("emergencyOrMedical");
  const [admission, setAdmission] = useState<AdmissionType>("nonOp");

  // Comparison: SOFA at 24 h
  const [sofa, setSofa] = useState(8);

  // Clinical Frailty Scale (Rockwood) — Muscedere 2017 frailty overlay
  const [cfs, setCfs] = useState(5);

  const result = useMemo(
    () => evaluate({ temp, map, hr, rr, aaO2, pao2, fio2, phArt, na, k, creat, aki, hct, wcc, gcs, age, chronic, admission, cfs }),
    [temp, map, hr, rr, aaO2, pao2, fio2, phArt, na, k, creat, aki, hct, wcc, gcs, age, chronic, admission, cfs]
  );

  return (
    <div className="rounded-xl border border-border bg-card p-4 my-6">
      <h3 className="text-lg font-semibold text-foreground">APACHE II Calculator</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Worst values in the first 24 h of ICU admission. Outputs raw score, predicted in-hospital mortality (Knaus 1985 logistic model) and a comparison against SOFA at 24 h.
      </p>

      <p className="text-xs font-semibold text-foreground mb-2">Acute physiology (APS)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
        <Slider label="Temperature (rectal)" value={temp} min={30} max={42} step={0.1} unit="°C" onChange={setTemp} decimals={1} />
        <Slider label="MAP" value={map} min={30} max={180} step={1} unit="mmHg" onChange={setMap} />
        <Slider label="HR" value={hr} min={30} max={200} step={1} unit="/min" onChange={setHr} />
        <Slider label="RR" value={rr} min={5} max={60} step={1} unit="/min" onChange={setRr} />
        <Slider label="FiO₂" value={fio2} min={0.21} max={1.0} step={0.05} unit="" onChange={setFio2} decimals={2} />
        {fio2 >= 0.5 ? (
          <Slider label="A-a gradient" value={aaO2} min={0} max={600} step={5} unit="mmHg" onChange={setAaO2} />
        ) : (
          <Slider label="PaO₂" value={pao2} min={30} max={200} step={1} unit="mmHg" onChange={setPao2} />
        )}
        <Slider label="Arterial pH" value={phArt} min={6.9} max={7.7} step={0.01} unit="" onChange={setPhArt} decimals={2} />
        <Slider label="Sodium" value={na} min={110} max={180} step={1} unit="mmol/L" onChange={setNa} />
        <Slider label="Potassium" value={k} min={1.5} max={8.0} step={0.1} unit="mmol/L" onChange={setK} decimals={1} />
        <Slider label="Creatinine" value={creat} min={40} max={600} step={5} unit="µmol/L" onChange={setCreat} />
        <Slider label="Haematocrit" value={hct} min={15} max={60} step={0.5} unit="%" onChange={setHct} decimals={1} />
        <Slider label="WCC" value={wcc} min={0.5} max={50} step={0.5} unit="×10⁹/L" onChange={setWcc} decimals={1} />
        <Slider label="GCS" value={gcs} min={3} max={15} step={1} unit="" onChange={setGcs} />
        <label className="flex items-center gap-2 text-xs cursor-pointer mt-1">
          <input type="checkbox" checked={aki} onChange={(e) => setAki(e.target.checked)} className="accent-primary" />
          <span className="text-muted-foreground">Acute kidney injury (doubles creatinine points)</span>
        </label>
      </div>

      <p className="text-xs font-semibold text-foreground mb-2">Age &amp; chronic health</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <Slider label="Age" value={age} min={16} max={95} step={1} unit="yr" onChange={setAge} />
        <div>
          <p className="text-xs text-muted-foreground mb-1">Severe organ insufficiency / immunocompromise</p>
          <select
            value={chronic}
            onChange={(e) => setChronic(e.target.value as ChronicHealth)}
            className="w-full px-2 py-1 text-xs rounded-md border border-border bg-background text-foreground"
          >
            <option value="none">None</option>
            <option value="elective">Yes — elective post-op (+2)</option>
            <option value="emergencyOrMedical">Yes — non-op or emergency post-op (+5)</option>
          </select>
          <p className="text-[10px] text-muted-foreground mt-1">e.g. cirrhosis, NYHA IV, severe COPD, dialysis-dependent CKD, immunosuppression.</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Admission category (for predicted mortality)</p>
          <select
            value={admission}
            onChange={(e) => setAdmission(e.target.value as AdmissionType)}
            className="w-full px-2 py-1 text-xs rounded-md border border-border bg-background text-foreground"
          >
            <option value="nonOp">Non-operative</option>
            <option value="postOpElective">Post-op elective</option>
            <option value="postOpEmergency">Post-op emergency</option>
          </select>
        </div>
      </div>

      <p className="text-xs font-semibold text-foreground mb-2">Clinical Frailty Scale (Rockwood) — Muscedere 2017 overlay</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 items-start">
        <div className="md:col-span-2">
          <Slider label={`CFS — ${cfsLabel(cfs)}`} value={cfs} min={1} max={9} step={1} unit="" onChange={setCfs} />
          <p className="text-[10px] text-muted-foreground mt-1 leading-snug">
            1 Very fit · 2 Well · 3 Managing well · 4 Vulnerable · 5 Mildly frail · 6 Moderately frail · 7 Severely frail · 8 Very severely frail · 9 Terminally ill. Frail = CFS ≥ 5.
          </p>
        </div>
        <div className="rounded-md border border-border bg-secondary/40 p-2">
          <p className="text-[10px] text-muted-foreground">Frailty OR (vs CFS &lt; 5)</p>
          <p className="text-lg font-bold font-mono text-foreground">×{result.frailtyOR.toFixed(2)}</p>
          <p className="text-[10px] text-muted-foreground">Hospital mortality, Muscedere 2017 (n=421, ≥80 y ICU cohort)</p>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="rounded-lg bg-secondary/40 border border-border p-3 mb-3">
        <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
          <p className="text-sm font-semibold text-foreground">APACHE II breakdown</p>
          <p className="text-2xl font-bold" style={{ color: result.color }}>
            {result.total}
            <span className="text-xs text-muted-foreground font-normal ml-1">/ 71</span>
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
              <tr className="border-t border-border font-semibold">
                <td className="py-1">APS subtotal</td>
                <td></td>
                <td className="py-1 text-right font-mono">{result.aps}</td>
              </tr>
              <tr>
                <td className="py-1">Age points</td>
                <td className="py-1 text-right font-mono">{age} yr</td>
                <td className="py-1 text-right font-mono">{result.agePts}</td>
              </tr>
              <tr>
                <td className="py-1">Chronic health</td>
                <td></td>
                <td className="py-1 text-right font-mono">{result.chronicPts}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="rounded-lg border border-border bg-background/40 p-3">
          <p className="text-xs font-semibold text-foreground">APACHE II — predicted mortality</p>
          <p className="text-3xl font-bold mt-1" style={{ color: result.color }}>
            {result.mortalityPct.toFixed(1)}<span className="text-base">%</span>
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
            Knaus model · {admission === "nonOp" ? "non-op" : admission === "postOpElective" ? "post-op elective" : "post-op emergency"}
          </p>
        </div>
        <div className="rounded-lg border-2 p-3" style={{ borderColor: result.adjColor, backgroundColor: `${result.adjColor}14` }}>
          <p className="text-xs font-semibold text-foreground">Frailty-adjusted mortality</p>
          <p className="text-3xl font-bold mt-1" style={{ color: result.adjColor }}>
            {result.adjMortalityPct.toFixed(1)}<span className="text-base">%</span>
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
            CFS {cfs} · OR ×{result.frailtyOR.toFixed(2)} on baseline odds (Muscedere 2017)
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background/40 p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground">SOFA at 24 h</p>
            <input
              type="number"
              min={0}
              max={24}
              value={sofa}
              onChange={(e) => setSofa(Math.max(0, Math.min(24, Number(e.target.value))))}
              className="w-14 px-1.5 py-0.5 text-xs text-right rounded border border-border bg-background text-foreground font-mono"
            />
          </div>
          <p className="text-3xl font-bold mt-1" style={{ color: sofaColor(sofa) }}>
            {sofaMortality(sofa).toFixed(0)}<span className="text-base">%</span>
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
            Ferreira 2001 · max SOFA in 24 h
          </p>
        </div>
      </div>

      {/* Severity band */}
      <div
        className="rounded-lg p-3 border-l-4 mb-3"
        style={{ borderLeftColor: result.color, backgroundColor: `${result.color}1A` }}
      >
        <p className="text-sm font-bold" style={{ color: result.color }}>{result.bandTitle}</p>
        <p className="text-xs text-foreground mt-1 leading-relaxed">{result.bandDetail}</p>
        {cfs >= 5 && (
          <p className="text-xs text-foreground mt-2 leading-relaxed border-t border-border/50 pt-2">
            <strong>Frailty modifier (CFS {cfs} — {cfsLabel(cfs)}):</strong> {result.frailtyMessage}
          </p>
        )}
      </div>

      {/* APACHE vs SOFA explainer */}
      <div className="rounded-lg border border-border p-3">
        <p className="text-sm font-semibold text-foreground mb-1">APACHE II vs SOFA vs frailty — when to use which</p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>APACHE II</strong> — worst values in first 24 h; AUROC ~0.85 for hospital mortality. Cannot track trajectory.</li>
          <li><strong>SOFA</strong> — daily organ-dysfunction score; Δ-SOFA ≥ 2 defines sepsis. AUROC ~0.79 at 24 h.</li>
          <li><strong>CFS (Muscedere 2017)</strong> — pre-morbid frailty independently predicts hospital mortality (adjusted OR 1.81 for CFS ≥5) and 1-year mortality (OR 1.71) in ≥80 y ICU patients. Frail patients have ~2× LOS and higher disability at discharge. Adds discrimination beyond APACHE II in the elderly.</li>
          <li>SAPS II / APACHE IV outperform APACHE II in modern cohorts but are more complex.</li>
          <li>All scores are calibrated to populations — use as a communication and audit tool, not a single-patient verdict.</li>
        </ul>
      </div>

      <p className="text-[10px] text-muted-foreground mt-3 italic">
        Refs: Knaus WA et al. Crit Care Med 1985;13:818. Ferreira FL et al. JAMA 2001;286:1754. Vincent JL et al. Intensive Care Med 1996;22:707. Muscedere J et al. Intensive Care Med 2017;43:1105 (CFS &amp; outcomes in critically ill elderly).
      </p>
    </div>
  );
};

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

/* ───── APS scoring (Knaus 1985 ranges) ───── */
const tempPts = (t: number) =>
  t >= 41 ? 4 : t >= 39 ? 3 : t >= 38.5 ? 1 : t >= 36 ? 0 : t >= 34 ? 1 : t >= 32 ? 2 : t >= 30 ? 3 : 4;
const mapPts = (m: number) =>
  m >= 160 ? 4 : m >= 130 ? 3 : m >= 110 ? 2 : m >= 70 ? 0 : m >= 50 ? 2 : 4;
const hrPts = (h: number) =>
  h >= 180 ? 4 : h >= 140 ? 3 : h >= 110 ? 2 : h >= 70 ? 0 : h >= 55 ? 2 : h >= 40 ? 3 : 4;
const rrPts = (r: number) =>
  r >= 50 ? 4 : r >= 35 ? 3 : r >= 25 ? 1 : r >= 12 ? 0 : r >= 10 ? 1 : r >= 6 ? 2 : 4;
const oxyPts = (fio2: number, aa: number, pao2: number) => {
  if (fio2 >= 0.5) return aa >= 500 ? 4 : aa >= 350 ? 3 : aa >= 200 ? 2 : 0;
  return pao2 > 70 ? 0 : pao2 >= 61 ? 1 : pao2 >= 55 ? 3 : 4;
};
const phPts = (p: number) =>
  p >= 7.7 ? 4 : p >= 7.6 ? 3 : p >= 7.5 ? 1 : p >= 7.33 ? 0 : p >= 7.25 ? 2 : p >= 7.15 ? 3 : 4;
const naPts = (n: number) =>
  n >= 180 ? 4 : n >= 160 ? 3 : n >= 155 ? 2 : n >= 150 ? 1 : n >= 130 ? 0 : n >= 120 ? 2 : n >= 111 ? 3 : 4;
const kPts = (v: number) =>
  v >= 7 ? 4 : v >= 6 ? 3 : v >= 5.5 ? 1 : v >= 3.5 ? 0 : v >= 3 ? 1 : v >= 2.5 ? 2 : 4;
const creatPtsBase = (c: number) =>
  c >= 305 ? 4 : c >= 170 ? 3 : c >= 130 ? 2 : c >= 53 ? 0 : 2; // µmol/L (×10 from mg/dL approx ÷ 88.4)
const hctPts = (h: number) =>
  h >= 60 ? 4 : h >= 50 ? 2 : h >= 46 ? 1 : h >= 30 ? 0 : h >= 20 ? 2 : 4;
const wccPts = (w: number) =>
  w >= 40 ? 4 : w >= 20 ? 2 : w >= 15 ? 1 : w >= 3 ? 0 : w >= 1 ? 2 : 4;
const agePts = (a: number) =>
  a >= 75 ? 6 : a >= 65 ? 5 : a >= 55 ? 3 : a >= 45 ? 2 : 0;
const chronicPts = (c: ChronicHealth) =>
  c === "emergencyOrMedical" ? 5 : c === "elective" ? 2 : 0;

interface Inputs {
  temp: number; map: number; hr: number; rr: number; aaO2: number; pao2: number; fio2: number;
  phArt: number; na: number; k: number; creat: number; aki: boolean; hct: number; wcc: number; gcs: number;
  age: number; chronic: ChronicHealth; admission: AdmissionType;
}

function evaluate(i: Inputs) {
  const creatBase = creatPtsBase(i.creat);
  const creatPts = i.aki ? creatBase * 2 : creatBase;
  const gcsPts = 15 - i.gcs;

  const breakdown = [
    { label: "Temperature", value: `${i.temp.toFixed(1)} °C`, points: tempPts(i.temp) },
    { label: "MAP", value: `${i.map} mmHg`, points: mapPts(i.map) },
    { label: "HR", value: `${i.hr} /min`, points: hrPts(i.hr) },
    { label: "RR", value: `${i.rr} /min`, points: rrPts(i.rr) },
    { label: i.fio2 >= 0.5 ? "A-a gradient" : "PaO₂", value: i.fio2 >= 0.5 ? `${i.aaO2} mmHg` : `${i.pao2} mmHg`, points: oxyPts(i.fio2, i.aaO2, i.pao2) },
    { label: "Arterial pH", value: i.phArt.toFixed(2), points: phPts(i.phArt) },
    { label: "Sodium", value: `${i.na} mmol/L`, points: naPts(i.na) },
    { label: "Potassium", value: `${i.k.toFixed(1)} mmol/L`, points: kPts(i.k) },
    { label: `Creatinine${i.aki ? " (×2 AKI)" : ""}`, value: `${i.creat} µmol/L`, points: creatPts },
    { label: "Haematocrit", value: `${i.hct.toFixed(1)} %`, points: hctPts(i.hct) },
    { label: "WCC", value: `${i.wcc.toFixed(1)} ×10⁹/L`, points: wccPts(i.wcc) },
    { label: "GCS (15 − GCS)", value: `${i.gcs}`, points: gcsPts },
  ];
  const aps = breakdown.reduce((s, b) => s + b.points, 0);
  const ageP = agePts(i.age);
  const chronicP = chronicPts(i.chronic);
  const total = aps + ageP + chronicP;

  // Predicted hospital mortality — Knaus 1985 logistic regression
  // logit = -3.517 + 0.146 * APACHE II + diagnostic category coefficient + (post-op emergency adj)
  // Simplified — using non-op baseline; post-op elective subtracts ~0.6 from logit;
  // post-op emergency uses the +0.613 adjustment in addition to non-op coefficient.
  let logit = -3.517 + 0.146 * total;
  if (i.admission === "postOpElective") logit -= 0.6;
  if (i.admission === "postOpEmergency") logit += 0.613;
  const mortalityPct = (1 / (1 + Math.exp(-logit))) * 100;

  const color =
    total >= 35 ? "hsl(var(--destructive))" :
    total >= 25 ? "hsl(15 90% 55%)" :
    total >= 15 ? "hsl(45 90% 50%)" :
    "hsl(var(--icu))";

  let bandTitle = "", bandDetail = "";
  if (total >= 35) {
    bandTitle = "Very high severity (≥ 35) — mortality > 80%";
    bandDetail = "Discuss treatment escalation limits with patient/family. Consider ceiling of care. Combine with clinical trajectory (Δ-SOFA), comorbidity and patient wishes — score alone never determines an individual outcome.";
  } else if (total >= 25) {
    bandTitle = "High severity (25–34) — mortality 40–55%";
    bandDetail = "Aggressive organ support justified. Daily multidisciplinary review of trajectory and goals of care. Re-score with daily SOFA to track response.";
  } else if (total >= 15) {
    bandTitle = "Moderate severity (15–24) — mortality 12–25%";
    bandDetail = "Standard ICU care with full organ support as needed. Anticipate ~5–7 day length of stay if no complications.";
  } else {
    bandTitle = "Low severity (< 15) — mortality < 10%";
    bandDetail = "Consider whether ICU admission is required vs HDU/ward step-down once stable. Score may reflect short physiological perturbation only.";
  }

  return { breakdown, aps, agePts: ageP, chronicPts: chronicP, total, mortalityPct, color, bandTitle, bandDetail };
}

/* ───── SOFA mortality reference (Ferreira 2001) ───── */
function sofaMortality(s: number) {
  if (s <= 6) return 10;
  if (s <= 9) return 22;
  if (s <= 12) return 40;
  if (s <= 14) return 58;
  return 80;
}
function sofaColor(s: number) {
  if (s >= 13) return "hsl(var(--destructive))";
  if (s >= 10) return "hsl(15 90% 55%)";
  if (s >= 7) return "hsl(45 90% 50%)";
  return "hsl(var(--icu))";
}

export default APACHEIICalculator;

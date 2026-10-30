import { useMemo, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { NumField, parseNum } from "../_shared/NumField";
import { apacheII, valid, type ChronicHealth } from "@/lib/calculators/t2-scores";

/**
 * APACHE II educational score breakdown (Knaus 1985). Raw score /71 only — no mortality
 * prediction, frailty multiplier or treatment/admission advice. Creatinine uses the
 * Féry-Lemonnier 1995 SI convention. CFS and raw SOFA are shown separately and descriptively.
 */

/** Fictional illustrative example values. */
export const APACHE_EXAMPLE = {
  temp: "38.5", map: "70", hr: "110", rr: "24", fio2: "0.40", aaO2: "", pao2: "70", ph: "7.32",
  na: "138", k: "4.2", creat: "180", hct: "34", wcc: "16", gcs: "12", age: "68",
};
type FieldKey = keyof typeof APACHE_EXAMPLE;

const CFS_LABELS = ["", "Very fit", "Well", "Managing well", "Living with very mild frailty", "Living with mild frailty",
  "Living with moderate frailty", "Living with severe frailty", "Living with very severe frailty", "Terminally ill"];
export function cfsLabel(c: number) {
  return CFS_LABELS[Math.max(1, Math.min(9, Math.round(c)))] ?? "";
}

const FIELDS: Array<{ k: FieldKey; label: string; unit: string; comp: string; hint?: string }> = [
  { k: "temp", label: "Temperature (rectal)", unit: "°C", comp: "temp" },
  { k: "map", label: "Mean arterial pressure", unit: "mmHg", comp: "map" },
  { k: "hr", label: "Heart rate", unit: "/min", comp: "hr" },
  { k: "rr", label: "Respiratory rate", unit: "/min", comp: "rr" },
  { k: "fio2", label: "FiO₂", unit: "fraction 0.21–1.0", comp: "oxy", hint: "Enter as a fraction (0.50, not 50%)." },
  { k: "ph", label: "Arterial pH", unit: "", comp: "ph", hint: "Arterial pH required; no bicarbonate substitute is used." },
  { k: "na", label: "Sodium", unit: "mmol/L", comp: "na" },
  { k: "k", label: "Potassium", unit: "mmol/L", comp: "k" },
  { k: "creat", label: "Creatinine", unit: "µmol/L", comp: "creat" },
  { k: "hct", label: "Haematocrit", unit: "%", comp: "hct" },
  { k: "wcc", label: "White cell count", unit: "×10⁹/L", comp: "wcc" },
  { k: "gcs", label: "GCS", unit: "3–15", comp: "gcs" },
];

const APACHEIICalculator = () => {
  const [v, setV] = useState<Record<FieldKey, string>>(APACHE_EXAMPLE);
  const [arf, setArf] = useState(false);
  const [chronic, setChronic] = useState<ChronicHealth | "">("emergencyOrMedical");
  const [sofa, setSofa] = useState("");
  const [cfs, setCfs] = useState<string>("");
  const set = (k: FieldKey) => (s: string) => setV((p) => ({ ...p, [k]: s }));

  const result = useMemo(
    () =>
      apacheII({
        temp: parseNum(v.temp), map: parseNum(v.map), hr: parseNum(v.hr), rr: parseNum(v.rr),
        fio2: parseNum(v.fio2), aaO2: parseNum(v.aaO2), pao2: parseNum(v.pao2), ph: parseNum(v.ph),
        na: parseNum(v.na), k: parseNum(v.k), creat: parseNum(v.creat), acuteRenalFailure: arf,
        hct: parseNum(v.hct), wcc: parseNum(v.wcc), gcs: parseNum(v.gcs), age: parseNum(v.age),
        chronic: chronic || null,
      }),
    [v, arf, chronic]
  );
  const pts = (comp: string) => result.breakdown.find((b) => b.key === comp)?.points ?? null;
  const fio2 = valid(parseNum(v.fio2), 0.21, 1);
  const highFio2 = fio2 !== null && fio2 >= 0.5;
  const sofaVal = valid(parseNum(sofa), 0, 24, true);

  return (
    <DiagramFigure
      id="apacheii-calculator"
      title="APACHEII"
      description="APACHE II educational score breakdown: enter worst first-24-hour ICU values to see the raw score out of 71 with acute physiology, age and chronic-health points. It does not predict an individual's mortality or decide admission or treatment limits."
    >
      <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">APACHE II score breakdown</h3>
        <p className="text-xs text-muted-foreground mb-2">
          APACHE II describes illness severity using the worst values in the first 24 h of ICU admission. This tool shows the raw score (/71) and its components only. Scores and frailty may inform a broader assessment; they do not decide an individual's prognosis, ICU admission or treatment limits.
        </p>
        <p className="text-[11px] text-muted-foreground mb-4 rounded border border-border bg-secondary/40 px-2 py-1">
          <strong>Example values (fictional)</strong> are pre-filled for illustration. Blank or invalid fields are left unscored, and the total is shown as incomplete — missing data are never assumed normal.
        </p>

        <p className="text-xs font-semibold text-foreground mb-2">Acute physiology (APS) — worst first-24-h value</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 mb-3">
          {FIELDS.map((f) => (
            <NumField key={f.k} label={f.label} unit={f.unit} value={v[f.k]} onChange={set(f.k)} hint={f.hint}
              invalid={v[f.k].trim() !== "" && f.comp !== "oxy" && pts(f.comp) === null} />
          ))}
          {highFio2 ? (
            <NumField label="A–a gradient (FiO₂ ≥ 0.50)" unit="mmHg" value={v.aaO2} onChange={set("aaO2")}
              invalid={v.aaO2.trim() !== "" && pts("oxy") === null} />
          ) : (
            <NumField label="PaO₂ (FiO₂ < 0.50)" unit="mmHg" value={v.pao2} onChange={set("pao2")}
              invalid={v.pao2.trim() !== "" && pts("oxy") === null} />
          )}
        </div>
        <label className="flex items-start gap-2 text-xs cursor-pointer mb-4">
          <input type="checkbox" checked={arf} onChange={(e) => setArf(e.target.checked)} className="accent-primary mt-0.5" />
          <span className="text-muted-foreground">
            Acute renal failure identified (as defined by the scoring method) — doubles creatinine points. Not derived automatically from a raised creatinine.
          </span>
        </label>

        <p className="text-xs font-semibold text-foreground mb-2">Age &amp; chronic health</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <NumField label="Age" unit="years" value={v.age} onChange={set("age")}
            invalid={v.age.trim() !== "" && result.agePts === null} />
          <div>
            <label className="text-xs text-muted-foreground mb-1 block" htmlFor="apache-chronic">Severe organ insufficiency / immunocompromise</label>
            <select id="apache-chronic" value={chronic} onChange={(e) => setChronic(e.target.value as ChronicHealth | "")}
              className="w-full px-2 py-1 text-xs rounded-md border border-border bg-background text-foreground">
              <option value="">Not recorded</option>
              <option value="none">None</option>
              <option value="elective">Yes — elective postoperative (+2)</option>
              <option value="emergencyOrMedical">Yes — non-operative or emergency postoperative (+5)</option>
            </select>
          </div>
        </div>

        <div className="rounded-lg bg-secondary/40 border border-border p-3 mb-3">
          <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
            <p className="text-sm font-semibold text-foreground">APACHE II raw score</p>
            <p className="text-2xl font-bold text-foreground" data-testid="apache-total">
              {result.total === null ? `Incomplete (≥${result.partial})` : result.total}
              <span className="text-xs text-muted-foreground font-normal ml-1">/ 71</span>
            </p>
          </div>
          {result.missing.length > 0 && (
            <p className="text-[11px] text-muted-foreground mb-2">Unscored: {result.missing.join(", ")}.</p>
          )}
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground border-b border-border">
                <th className="text-left py-1">Component</th>
                <th className="text-right py-1">Points</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              {result.breakdown.map((b) => (
                <tr key={b.key} className="border-b border-border/50">
                  <td className="py-1">{b.label}</td>
                  <td className="py-1 text-right font-mono font-semibold">{b.points ?? "—"}</td>
                </tr>
              ))}
              <tr className="border-t border-border font-semibold">
                <td className="py-1">APS subtotal</td>
                <td className="py-1 text-right font-mono">{result.aps ?? "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <label className="text-xs font-semibold text-foreground block mb-1" htmlFor="apache-cfs">Clinical Frailty Scale (descriptive, not in the score)</label>
            <select id="apache-cfs" value={cfs} onChange={(e) => setCfs(e.target.value)}
              className="w-full px-2 py-1 text-xs rounded-md border border-border bg-background text-foreground">
              <option value="">Not assessed</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((c) => <option key={c} value={c}>{c} — {cfsLabel(c)}</option>)}
            </select>
            <p className="text-[11px] text-muted-foreground mt-2 leading-snug">
              CFS describes premorbid function (usually ~2 weeks before the acute illness) and needs collateral history. Stable disability is not the same as frailty, and the CFS is not validated for every group (e.g. younger people or stable single-impairment disability). It is not combined with APACHE II here.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-background/40 p-3">
            <NumField label="Optional raw SOFA for comparison" unit="0–24" value={sofa} onChange={setSofa}
              invalid={sofa.trim() !== "" && sofaVal === null} />
            <p className="text-[11px] text-muted-foreground mt-2 leading-snug">
              {sofaVal === null ? "No SOFA entered." : `SOFA ${sofaVal} / 24 (raw organ-dysfunction score).`} SOFA tracks organ dysfunction over time. In Sepsis-3, infection plus an acute increase of ≥2 points from baseline is the operational criterion — not an absolute score ≥2 alone.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border p-3">
          <p className="text-sm font-semibold text-foreground mb-1">Purpose and limitations</p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>APACHE II</strong> — a population severity-of-illness classification built from first-24-h physiology, age and chronic health; used for case-mix description, audit and research. Calibration drifts across eras and case mix, and it does not track trajectory.</li>
            <li><strong>SOFA</strong> — a repeated organ-dysfunction description; changes over time are more informative than a single value.</li>
            <li><strong>Frailty (Muscedere 2017)</strong> — meta-analysis of 10 observational studies (3,030 adult ICU patients): frailty was associated with higher hospital mortality (pooled RR 1.71) and long-term mortality (RR 1.53). These are associations, not a CFS-specific odds multiplier or a recalibration of APACHE II for an individual.</li>
            <li><strong>Creatinine (SI)</strong> — this tool uses the gap-free SI convention of Féry-Lemonnier 1995 (Table 2): &lt;53 → 2; 53–&lt;133 → 0; 133–&lt;177 → 2; 177–&lt;309 → 3; ≥309 µmol/L → 4. Other mg/dL conversions round differently.</li>
          </ul>
        </div>

        <p className="text-[10px] text-muted-foreground mt-3 italic">
          Refs: Knaus WA et al. APACHE II. Crit Care Med 1985;13:818–29. Féry-Lemonnier E et al. Intensive Care Med 1995;21:356–60. Vincent JL et al. Intensive Care Med 1996;22:707–10. Singer M et al. JAMA 2016;315:801–10. Muscedere J et al. Intensive Care Med 2017;43:1105–22.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default APACHEIICalculator;

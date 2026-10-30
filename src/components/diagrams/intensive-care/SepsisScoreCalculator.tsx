import { useMemo, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { NumField, parseNum } from "../_shared/NumField";
import {
  news2, qsofa, sofa, NEWS2_RESPONSE_TEXT,
  type Acvpu, type Agent, type Duration, type ScoreResult, type Tri,
} from "@/lib/calculators/t2-scores";

/**
 * Educational SOFA · qSOFA · NEWS2 (SpO₂ Scale 1 only) score breakdowns.
 * No sepsis diagnosis, mortality band or treatment order is generated from any score.
 */

const AGENTS: Array<{ a: Agent; label: string }> = [
  { a: "dopamine", label: "Dopamine" },
  { a: "dobutamine", label: "Dobutamine (any dose)" },
  { a: "adrenaline", label: "Adrenaline" },
  { a: "noradrenaline", label: "Noradrenaline" },
];

const sel = "w-full px-2 py-1 text-xs rounded-md border border-border bg-background text-foreground";

const SepsisScoreCalculator = () => {
  // Contemporaneous observations (NEWS2 / qSOFA) — fictional example
  const [obs, setObs] = useState({ rr: "24", spo2: "94", temp: "38.4", sbp: "92", hr: "108", qgcs: "14" });
  const [onO2, setOnO2] = useState<"" | "yes" | "no">("yes");
  const [acvpu, setAcvpu] = useState<Acvpu | "">("C");
  const [scale2, setScale2] = useState(false);
  // SOFA assessment period (worst values) — fictional example
  const [lab, setLab] = useState({ pf: "280", platelets: "120", bilirubin: "28", gcs: "14", map: "62", creatinine: "140", urine: "900" });
  const [support, setSupport] = useState<Tri>("unknown");
  const [agents, setAgents] = useState<Record<Agent, { given: boolean; dose: string }>>({
    dopamine: { given: false, dose: "" }, dobutamine: { given: false, dose: "" },
    adrenaline: { given: false, dose: "" }, noradrenaline: { given: true, dose: "0.08" },
  });
  const [duration, setDuration] = useState<Duration>("atLeast1h");

  const n = useMemo(() => news2({
    rr: parseNum(obs.rr), spo2: parseNum(obs.spo2), temp: parseNum(obs.temp), sbp: parseNum(obs.sbp), hr: parseNum(obs.hr),
    onO2: onO2 === "" ? null : onO2 === "yes", acvpu: acvpu || null, scale2Prescribed: scale2,
  }), [obs, onO2, acvpu, scale2]);
  const q = useMemo(() => qsofa({ rr: parseNum(obs.rr), sbp: parseNum(obs.sbp), currentGcs: parseNum(obs.qgcs) }), [obs]);
  const s = useMemo(() => sofa({
    pf: parseNum(lab.pf), respSupport: support, platelets: parseNum(lab.platelets), bilirubin: parseNum(lab.bilirubin),
    gcs: parseNum(lab.gcs), map: parseNum(lab.map), creatinine: parseNum(lab.creatinine), urine24h: parseNum(lab.urine),
    vasoDuration: duration,
    agents: Object.fromEntries(AGENTS.map(({ a }) => [a, { given: agents[a].given, doseUgKgMin: parseNum(agents[a].dose) }])),
  }), [lab, support, agents, duration]);

  const setO = (k: keyof typeof obs) => (v: string) => setObs((p) => ({ ...p, [k]: v }));
  const setL = (k: keyof typeof lab) => (v: string) => setLab((p) => ({ ...p, [k]: v }));

  return (
    <DiagramFigure
      id="sepsis-score-calculator"
      title="Sepsis score"
      description="Educational SOFA, qSOFA and NEWS2 (SpO2 Scale 1 only) score breakdowns with the NEWS2 response thresholds. Scores do not diagnose or exclude sepsis and do not generate treatment orders."
    >
      <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">SOFA · qSOFA · NEWS2 — SpO₂ Scale 1 only</h3>
        <p className="text-xs text-muted-foreground mb-2">
          The scores use different timing. NEWS2 and qSOFA use one current set of observations. SOFA uses the worst value in each organ system over the assessment period, such as 24 h. Blank or invalid fields are left unscored and the total is shown as incomplete.
        </p>
        <p className="text-[11px] text-muted-foreground mb-4 rounded border border-border bg-secondary/40 px-2 py-1">
          <strong>Example values (fictional)</strong> are pre-filled. Clinical concern or shock needs urgent assessment whatever the calculated score.
        </p>

        <p className="text-xs font-semibold text-foreground mb-2">1 · Current observations (NEWS2, qSOFA)</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 mb-2">
          <NumField label="Respiration rate" unit="/min" value={obs.rr} onChange={setO("rr")} />
          <NumField label="SpO₂" unit="%" value={obs.spo2} onChange={setO("spo2")} />
          <NumField label="Systolic BP" unit="mmHg" value={obs.sbp} onChange={setO("sbp")} />
          <NumField label="Pulse" unit="/min" value={obs.hr} onChange={setO("hr")} />
          <NumField label="Temperature" unit="°C" value={obs.temp} onChange={setO("temp")} />
          <div>
            <label htmlFor="news-o2" className="text-xs text-muted-foreground block mb-0.5">Air or oxygen</label>
            <select id="news-o2" value={onO2} onChange={(e) => setOnO2(e.target.value as typeof onO2)} className={sel}>
              <option value="">Not recorded</option><option value="no">Air</option><option value="yes">Supplemental oxygen</option>
            </select>
          </div>
          <NumField label="Current GCS for qSOFA (Sepsis-3: any GCS <15)" unit="3–15, now" value={obs.qgcs} onChange={setO("qgcs")}
            hint="Separate from SOFA worst-period GCS and from NEWS2 ACVPU." />
          <div>
            <label htmlFor="news-acvpu" className="text-xs text-muted-foreground block mb-0.5">Consciousness (ACVPU)</label>
            <select id="news-acvpu" value={acvpu} onChange={(e) => setAcvpu(e.target.value as Acvpu | "")} className={sel}>
              <option value="">Not recorded</option>
              <option value="A">Alert</option><option value="C">New confusion</option><option value="V">Responds to voice</option>
              <option value="P">Responds to pain</option><option value="U">Unresponsive</option>
            </select>
          </div>
        </div>
        <label className="flex items-start gap-2 text-xs cursor-pointer mb-4">
          <input type="checkbox" checked={scale2} onChange={(e) => setScale2(e.target.checked)} className="accent-primary mt-0.5" />
          <span className="text-muted-foreground">A clinician has prescribed SpO₂ Scale 2 (confirmed hypercapnic respiratory failure). This tool does not implement Scale 2.</span>
        </label>

        <p className="text-xs font-semibold text-foreground mb-2">2 · SOFA — worst value in the assessment period</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 mb-2">
          <NumField label="PaO₂/FiO₂" unit="mmHg (FiO₂ as fraction)" value={lab.pf} onChange={setL("pf")} />
          <div>
            <label htmlFor="sofa-support" className="text-xs text-muted-foreground block mb-0.5">Respiratory support</label>
            <select id="sofa-support" value={support} onChange={(e) => setSupport(e.target.value as Tri)} className={sel}>
              <option value="unknown">Not recorded</option><option value="no">No respiratory support</option><option value="yes">Respiratory support (ventilation)</option>
            </select>
          </div>
          <NumField label="Platelets" unit="×10⁹/L" value={lab.platelets} onChange={setL("platelets")} />
          <NumField label="Bilirubin" unit="µmol/L (integer)" value={lab.bilirubin} onChange={setL("bilirubin")} />
          <NumField label="Worst-period GCS (SOFA)" unit="3–15" value={lab.gcs} onChange={setL("gcs")} />
          <NumField label="MAP" unit="mmHg" value={lab.map} onChange={setL("map")} />
          <NumField label="Creatinine" unit="µmol/L (integer)" value={lab.creatinine} onChange={setL("creatinine")} />
          <NumField label="Measured 24 h urine output" unit="mL/24 h" value={lab.urine} onChange={setL("urine")}
            invalid={lab.urine.trim() !== "" && !(Number.isFinite(Number(lab.urine)) && Number(lab.urine) >= 0)}
            hint="Needed for a completed renal score unless creatinine already scores 4." />
        </div>
        <div className="rounded-md border border-border p-2 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Vasoactive agents (doses in µg/kg/min; SOFA counts agents given for at least 1 h)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {AGENTS.map(({ a, label }) => (
              <div key={a} className="flex items-end gap-2">
                <label className="flex items-center gap-1 text-xs min-w-[9rem]">
                  <input type="checkbox" checked={agents[a].given} className="accent-primary"
                    onChange={(e) => setAgents((p) => ({ ...p, [a]: { ...p[a], given: e.target.checked } }))} />
                  {label}
                </label>
                {agents[a].given && (
                  <div className="flex-1">
                    <NumField label={`${label.split(" ")[0]} dose`} unit="µg/kg/min" value={agents[a].dose}
                      onChange={(d) => setAgents((p) => ({ ...p, [a]: { ...p[a], dose: d } }))} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <label htmlFor="sofa-dur" className="text-xs text-muted-foreground block mt-2 mb-0.5">Duration of vasoactive administration</label>
          <select id="sofa-dur" value={duration} onChange={(e) => setDuration(e.target.value as Duration)} className={sel}>
            <option value="unknown">Not recorded</option><option value="atLeast1h">At least 1 h</option><option value="lessThan1h">Less than 1 h</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <ScoreCard name="NEWS2 (Scale 1)" testId="news2" r={n} max={20}
            band={n.notApplicable ? "Not applicable — Scale 2 prescribed; this tool cannot calculate NEWS2 for this patient." : n.response ? NEWS2_RESPONSE_TEXT[n.response] : "Incomplete — no response category."} />
          <ScoreCard name="qSOFA" testId="qsofa" r={q} max={3}
            band="Not a diagnostic test. A low score does not rule out sepsis; SSC 2026 advises against qSOFA alone for screening." />
          <ScoreCard name="SOFA" testId="sofa" r={s} max={24}
            band="Organ-dysfunction score. Sepsis-3 uses an acute change of ≥2 from baseline in suspected infection, not the absolute value." />
        </div>

        <div className="rounded-lg border border-border p-3 mb-3 text-xs text-muted-foreground space-y-1">
          <p className="text-sm font-semibold text-foreground">Sepsis-3 (Singer 2016) — explanation, not a calculated diagnosis</p>
          <p>Sepsis is life-threatening organ dysfunction caused by a dysregulated host response to infection. In practice, organ dysfunction means an acute rise in SOFA of ≥2 points linked to suspected or documented infection. Baseline SOFA is assumed to be 0 only when pre-existing dysfunction is not known. A positive qSOFA or NEWS2 is not required, and a low score does not exclude sepsis.</p>
          <p><strong>Purposes:</strong> NEWS2 is a track-and-trigger system for detecting and responding to deterioration in adults (RCP 2017). qSOFA is a bedside prompt for higher risk outside the ICU (Seymour 2016). SOFA describes organ dysfunction (Vincent 1996).</p>
        </div>

        <div className="rounded-lg border border-border p-3 text-xs text-muted-foreground space-y-2">
          <p className="text-sm font-semibold text-foreground">Educational guidance summaries — not orders generated by these scores</p>
          <p><strong>NICE NG253</strong> (suspected sepsis, age 16+, not pregnant or recently pregnant; children see <a className="underline" href="https://www.nice.org.uk/guidance/ng254" target="_blank" rel="noreferrer">NG254</a>, pregnancy <a className="underline" href="https://www.nice.org.uk/guidance/ng255" target="_blank" rel="noreferrer">NG255</a>):
            give antibiotics within 1 h to people at high risk. For selected moderate- or low-risk people, a clinician may investigate first and defer the decision for up to 3 h or 6 h, with review; once the decision is made, give the antibiotic immediately. These are not blanket waiting periods. When fluids are indicated, give a 250 mL isotonic crystalloid bolus, ideally over 10–15 min, and reassess after each bolus. Further 250 mL boluses may be given up to 1,000 mL total; seek senior advice if improvement is insufficient.{" "}
            <a className="underline" href="https://www.nice.org.uk/guidance/ng253/chapter/Managing-suspected-sepsis" target="_blank" rel="noreferrer">NICE NG253</a></p>
          <p><strong>Surviving Sepsis Campaign 2026</strong> (separate guideline): immediate antibiotics, ideally within 1 h, for shock or probable/definite sepsis. For possible sepsis without shock, assess rapidly and give antibiotics within 3 h if concern persists. It suggests ≥30 mL/kg crystalloid within the first 3 h for sepsis-induced hypoperfusion or septic shock, individualised with repeated reassessment. It recommends NEWS/NEWS2/MEWS/SIRS over qSOFA alone for screening.{" "}
            <a className="underline" href="https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026" target="_blank" rel="noreferrer">SSC 2026</a></p>
        </div>

        <p className="text-[10px] text-muted-foreground mt-3 italic">
          Refs: Singer M et al. JAMA 2016;315:801–10 (Table 1 SOFA, SI units). Vincent JL et al. Intensive Care Med 1996;22:707–10. Seymour CW et al. JAMA 2016;315:762–74. RCP NEWS2 Charts 1 and 4 (2017). NICE NG253. SSC 2026.
        </p>
      </div>
    </DiagramFigure>
  );
};

function ScoreCard({ name, r, max, band, testId }: { name: string; r: ScoreResult; max: number; band: string; testId: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3" data-testid={`card-${testId}`}>
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-sm font-bold text-foreground">{name}</p>
        <p className="text-2xl font-bold text-foreground" data-testid={`total-${testId}`}>
          {r.breakdown.length === 0 ? "N/A" : r.total === null ? `Incomplete (≥${r.partial})` : r.total}
          <span className="text-xs text-muted-foreground font-normal ml-1">/ {max}</span>
        </p>
      </div>
      <p className="text-[11px] text-foreground mb-2" data-testid={`band-${testId}`}>{band}</p>
      <ul className="text-[11px] space-y-0.5">
        {r.breakdown.map((b) => (
          <li key={b.key} className="flex justify-between gap-2">
            <span className="text-muted-foreground">{b.label}{b.note ? ` (${b.note})` : ""}</span>
            <span className="font-mono text-foreground">{b.points ?? "—"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SepsisScoreCalculator;

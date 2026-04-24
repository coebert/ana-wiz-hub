import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Stethoscope, FlaskConical, AlertTriangle, Info } from "lucide-react";
import LabGlossaryPopover from "@/components/LabGlossaryPopover";
import type { LabKey } from "@/lib/lab-glossary";

/**
 * Interactive symptom-to-diagnosis flowchart for endocrine emergencies.
 * Users tick presenting features; a weighted scoring engine ranks the six
 * canonical endocrine crises and surfaces the focused investigation panel
 * for the leading diagnosis. Pure UI — all logic is local state.
 */

type DxKey = "dka" | "hhs" | "storm" | "myxoedema" | "adrenal" | "phaeo" | "apoplexy";

interface Diagnosis {
  key: DxKey;
  name: string;
  oneLiner: string;
  investigations: { test: string; why: string }[];
  immediate: string;
  tokenClass: string; // semantic token suffix (destructive, accent, etc.)
}

const DIAGNOSES: Record<DxKey, Diagnosis> = {
  dka: {
    key: "dka",
    name: "Diabetic ketoacidosis (DKA)",
    oneLiner: "Insulin deficit → ketogenesis + high-anion-gap acidosis.",
    investigations: [
      { test: "Capillary + venous glucose, blood ketones (β-hydroxybutyrate)", why: "Confirms the diagnostic triad: glucose > 11, ketones ≥ 3. β-OHB tracks insulin sufficiency at cell level — best marker of resolution." },
      { test: "Venous blood gas: pH, HCO₃⁻, anion gap, lactate", why: "Quantifies severity (pH < 7.10 = HDU/ICU) and confirms HAGMA. HCO₃⁻ rise ≥ 3 mmol/L/h tracks adequate insulin." },
      { test: "U&Es with K⁺ (and PO₄, Mg) — repeat hourly initially", why: "Insulin drives K⁺ intracellularly; total-body deficit is masked at presentation. Withhold insulin if K⁺ < 3.5." },
      { test: "Urinalysis (ketones), ECG (K⁺ changes), septic screen / CXR", why: "ECG detects hyper/hypokalaemic changes before bloods return. Sepsis is the commonest precipitant." },
      { test: "HbA1c, amylase if abdo pain, β-hCG in women of childbearing age", why: "HbA1c distinguishes new T1DM from poor control. Amylase often raised in DKA without pancreatitis. Pregnancy alters fluid/insulin targets." },
    ],
    immediate: "0.9% NaCl 1 L over 1 h → fixed-rate insulin 0.1 U/kg/h once running; replace K⁺ when 3.5–5.5.",
    tokenClass: "destructive",
  },
  hhs: {
    key: "hhs",
    name: "Hyperosmolar hyperglycaemic state (HHS)",
    oneLiner: "Profound hyperglycaemia + hyperosmolality, minimal ketones, days of dehydration.",
    investigations: [
      { test: "Glucose, ketones (< 3), VBG (pH > 7.30, HCO₃⁻ > 15)", why: "Distinguishes HHS from DKA — minimal ketonaemia and absent acidosis are diagnostic; insulin's residual action prevents ketogenesis." },
      { test: "Calculated osmolality: 2[Na⁺] + glucose + urea (target > 320)", why: "Osmolality > 320 mOsm/kg defines HHS; correlates with coma > 340. Drives the slow-fluid strategy (Δ ≤ 5 mOsm/kg/h)." },
      { test: "U&Es, corrected Na⁺, magnesium, phosphate", why: "Apparent low Na⁺ is dilutional — correct +2.4 per 5.5 mmol/L glucose above 5.5. True Na⁺ guides safe rate of fluid replacement." },
      { test: "ECG, troponin, CXR — look for MI / sepsis as precipitant", why: "Silent MI and sepsis trigger most HHS. Identifying precipitant changes prognosis more than the metabolic correction itself." },
      { test: "VTE risk assessment — high thrombotic risk, prophylactic LMWH", why: "Hyperviscosity + dehydration + immobility produce VTE rates 5× DKA — prophylaxis is mandatory unless contraindicated." },
    ],
    immediate: "Fluids FIRST (0.9% NaCl ~ 1 L/h titrated). Insulin only after fluids running, low rate 0.05 U/kg/h.",
    tokenClass: "destructive",
  },
  storm: {
    key: "storm",
    name: "Thyroid storm",
    oneLiner: "Decompensated hyperthyroidism — fever, tachycardia, agitation, GI/CNS dysfunction.",
    investigations: [
      { test: "TSH (suppressed) + free T4 / T3 (raised)", why: "Confirms biochemical hyperthyroidism, but storm is a CLINICAL diagnosis — hormone level correlates poorly with severity." },
      { test: "Burch-Wartofsky Point Scale — ≥ 45 highly suggestive", why: "Operational diagnostic tool: scores temperature, CNS, GI/hepatic, CV and precipitant — separates storm from severe thyrotoxicosis." },
      { test: "FBC, LFTs (cholestasis common), U&Es, glucose, calcium", why: "Cholestatic LFTs are typical and influence drug choice (PTU > carbimazole if jaundiced). Hypercalcaemia from bone resorption." },
      { test: "ECG (AF in 25%), troponin, echo if HF", why: "High-output cardiac failure and AF with rapid response are major killers — guide rate control and anticoagulation." },
      { test: "Septic screen + cortisol (cover relative adrenal insufficiency)", why: "Sepsis is the commonest precipitant. Accelerated cortisol clearance produces relative adrenal insufficiency — cover with hydrocortisone." },
    ],
    immediate: "β-blocker (propranolol/esmolol) → PTU → Lugol's iodine ≥ 1 h later → hydrocortisone → cooling.",
    tokenClass: "physiology",
  },
  myxoedema: {
    key: "myxoedema",
    name: "Myxoedema coma",
    oneLiner: "Severe hypothyroid decompensation with hypothermia + hypoventilation + obtundation.",
    investigations: [
      { test: "TSH (raised, primary) or low-normal (secondary), free T4 (low)", why: "Distinguishes primary (thyroid failure, ↑↑ TSH) from secondary (pituitary, inappropriately normal/low TSH) — alters need for hydrocortisone first." },
      { test: "VBG/ABG — type II respiratory failure, hyponatraemia", why: "Central hypoventilation produces CO₂ retention; impaired free-water excretion drives hyponatraemia in ~50%." },
      { test: "Cortisol + ACTH (cover before T4 if pituitary cause)", why: "Co-existing adrenal insufficiency is common — giving T4 first precipitates Addisonian crisis. Steroid cover is mandatory." },
      { test: "ECG (bradycardia, low voltage, prolonged QT), CK (rhabdomyolysis)", why: "Long QT predisposes to torsades during rewarming; CK rise reflects myopathy and prognosticates." },
      { test: "Glucose, blood cultures, CXR — sepsis is the usual trigger", why: "Infection (especially pneumonia/UTI) precipitates 35% of cases; hypothermia masks the usual fever response." },
    ],
    immediate: "IV T3 10–20 mcg bolus then 10 mcg q4h (or T4) + IV hydrocortisone 100 mg q8h + passive rewarming + ventilation.",
    tokenClass: "clinical",
  },
  adrenal: {
    key: "adrenal",
    name: "Adrenal (Addisonian) crisis",
    oneLiner: "Refractory shock + low Na⁺ / high K⁺ / low glucose; classic in chronic steroid users.",
    investigations: [
      { test: "Paired random cortisol + ACTH BEFORE first steroid dose (if practical — never delay treatment)", why: "Cortisol < 100 nmol/L during shock is diagnostic; ACTH localises primary (high) vs secondary (low). Single best diagnostic test." },
      { test: "U&Es: ↓ Na⁺, ↑ K⁺, ↑ urea; glucose (often low); VBG (mild metabolic acidosis)", why: "Classic biochemical fingerprint reflects aldosterone deficit (Na⁺/K⁺) + cortisol deficit (glucose). Confirms suspicion at the bedside." },
      { test: "Septic screen — infection is the commonest trigger", why: "Most adrenal crises are precipitated by intercurrent infection in known Addison's; missing it perpetuates the crisis." },
      { test: "Short Synacthen test once stable (not in acute phase)", why: "Definitive test for primary adrenal insufficiency; pointless acutely (high endogenous ACTH already + dexamethasone doesn't interfere with assay)." },
      { test: "Adrenal antibodies / imaging once stable to find primary cause", why: "21-OH antibodies confirm autoimmune Addison's (~80%); CT identifies haemorrhage/TB/metastases for the seronegative." },
    ],
    immediate: "Hydrocortisone 100 mg IV stat → 200 mg/24 h + 0.9% NaCl 1 L/h + glucose if hypoglycaemic.",
    tokenClass: "destructive",
  },
  phaeo: {
    key: "phaeo",
    name: "Phaeochromocytoma crisis",
    oneLiner: "Catecholamine surge → severe paroxysmal hypertension, arrhythmia, MI, takotsubo.",
    investigations: [
      { test: "Plasma metanephrines (preferred) or 24-h urinary metanephrines/catecholamines", why: "Metanephrines are continuously secreted (vs episodic catecholamines) — highest sensitivity (~99%). Avoids missed diagnosis between paroxysms." },
      { test: "ECG, troponin, echo (takotsubo / catecholamine cardiomyopathy)", why: "Catecholamine surge causes myocardial stunning, takotsubo, MI without coronary disease — guides peri-operative cardiac risk." },
      { test: "CT/MRI adrenals once biochemically confirmed; MIBG if metastatic", why: "Image AFTER biochemistry — incidentalomas are common. MIBG localises extra-adrenal/metastatic disease for surgical/radio-isotope planning." },
      { test: "Glucose (often raised), calcium (MEN2 association)", why: "α-mediated insulin suppression causes hyperglycaemia. Hypercalcaemia raises suspicion for MEN2 (medullary thyroid Ca + hyperparathyroidism)." },
      { test: "Genetic testing — RET, VHL, NF1, SDHx", why: "Up to 40% are hereditary; positive result mandates surveillance for synchronous tumours and family screening." },
    ],
    immediate: "α-blockade FIRST (phentolamine bolus, IV magnesium 2–4 g) THEN β-blocker. Never β-blocker alone.",
    tokenClass: "destructive",
  },
  apoplexy: {
    key: "apoplexy",
    name: "Pituitary apoplexy",
    oneLiner: "Sudden headache + visual loss + ophthalmoplegia + hypopituitarism.",
    investigations: [
      "Urgent pituitary MRI (CT if MRI unavailable — shows haemorrhage/infarct)",
      "Full pituitary screen: cortisol, ACTH, TSH/T4, prolactin, LH/FSH, GH/IGF-1",
      "U&Es, glucose, osmolality (diabetes insipidus risk)",
      "Formal visual field assessment + acuity + cranial nerve exam (III, IV, VI)",
      "Coag screen pre-op; group & save for neurosurgery",
    ],
    immediate: "Hydrocortisone 100 mg IV stat (BEFORE thyroxine), urgent neurosurgical referral, fluid balance for DI.",
    tokenClass: "clinical",
  },
};

// Static class maps so Tailwind keeps these classes during purge.
const BAR_CLASS: Record<string, string> = {
  destructive: "bg-destructive",
  physiology: "bg-physiology",
  clinical: "bg-clinical",
  accent: "bg-accent",
};
const PANEL_CLASS: Record<string, string> = {
  destructive: "border-destructive/40 bg-destructive/5",
  physiology: "border-physiology/40 bg-physiology/5",
  clinical: "border-clinical/40 bg-clinical/5",
  accent: "border-accent/40 bg-accent/5",
};

interface Symptom {
  id: string;
  label: string;
  detail?: string;
  category: "vitals" | "biochem" | "history" | "exam";
  // Weighted contribution to each diagnosis (positive = supports, negative = argues against)
  weights: Partial<Record<DxKey, number>>;
}

const SYMPTOMS: Symptom[] = [
  // Vitals
  { id: "fever", label: "Fever > 38.5 °C", category: "vitals", weights: { storm: 4, adrenal: 1 } },
  { id: "hypothermia", label: "Hypothermia < 35 °C", category: "vitals", weights: { myxoedema: 5 } },
  { id: "severe_htn", label: "Severe paroxysmal hypertension", category: "vitals", weights: { phaeo: 5 } },
  { id: "shock", label: "Refractory shock (vasopressor-resistant)", category: "vitals", weights: { adrenal: 5, dka: 1, hhs: 1 } },
  { id: "tachy_af", label: "Tachycardia / new AF", category: "vitals", weights: { storm: 3, phaeo: 2, dka: 1 } },
  { id: "bradycardia", label: "Bradycardia", category: "vitals", weights: { myxoedema: 3 } },
  { id: "kussmaul", label: "Kussmaul (deep) breathing", category: "vitals", weights: { dka: 4 } },
  { id: "hypoventilation", label: "Hypoventilation / type II RF", category: "vitals", weights: { myxoedema: 3 } },

  // Biochemistry
  { id: "hyperglycaemia_mod", label: "Glucose 11–30 mmol/L", category: "biochem", weights: { dka: 3, hhs: 1 } },
  { id: "hyperglycaemia_severe", label: "Glucose > 30 mmol/L", category: "biochem", weights: { hhs: 5, dka: 2 } },
  { id: "ketones_high", label: "Blood ketones ≥ 3 mmol/L", category: "biochem", weights: { dka: 5, hhs: -2 } },
  { id: "acidosis", label: "Metabolic acidosis (pH < 7.30)", category: "biochem", weights: { dka: 4, adrenal: 1 } },
  { id: "hyperosm", label: "Osmolality > 320 mOsm/kg", category: "biochem", weights: { hhs: 5 } },
  { id: "hyponatraemia", label: "Na⁺ < 130 mmol/L", category: "biochem", weights: { adrenal: 3, myxoedema: 2 } },
  { id: "hyperkalaemia", label: "K⁺ > 5.5 mmol/L", category: "biochem", weights: { adrenal: 4 } },
  { id: "hypoglycaemia", label: "Glucose < 4 mmol/L", category: "biochem", weights: { adrenal: 3, myxoedema: 1 } },
  { id: "tsh_supp", label: "TSH suppressed, ↑ free T4", category: "biochem", weights: { storm: 5 } },
  { id: "tsh_high", label: "TSH raised, ↓ free T4", category: "biochem", weights: { myxoedema: 5 } },

  // History
  { id: "t1dm", label: "Known type 1 diabetes / missed insulin", category: "history", weights: { dka: 4 } },
  { id: "t2dm_elderly", label: "Elderly / care home + T2DM", category: "history", weights: { hhs: 3 } },
  { id: "sglt2", label: "On SGLT2 inhibitor", category: "history", weights: { dka: 3 } },
  { id: "graves", label: "Known hyperthyroidism / recent thyroid surgery", category: "history", weights: { storm: 4 } },
  { id: "hypothyroid", label: "Known hypothyroid / missed levothyroxine", category: "history", weights: { myxoedema: 4 } },
  { id: "chronic_steroid", label: "Long-term steroid (> 5 mg pred for > 3/52)", category: "history", weights: { adrenal: 5 } },
  { id: "etomidate", label: "Recent etomidate / ketoconazole", category: "history", weights: { adrenal: 2 } },
  { id: "iodine_contrast", label: "Recent iodinated contrast / amiodarone", category: "history", weights: { storm: 2 } },
  { id: "anticoag_pituitary", label: "Anticoagulated / known pituitary adenoma", category: "history", weights: { apoplexy: 4 } },

  // Exam / specific signs
  { id: "thunderclap_headache", label: "Sudden 'thunderclap' headache", category: "exam", weights: { apoplexy: 5 } },
  { id: "visual_loss", label: "Acute visual field loss / ophthalmoplegia", category: "exam", weights: { apoplexy: 5 } },
  { id: "pigmentation", label: "Hyperpigmentation / vitiligo", category: "exam", weights: { adrenal: 3 } },
  { id: "goitre_lid_lag", label: "Goitre / lid lag / proptosis", category: "exam", weights: { storm: 3 } },
  { id: "myxoedema_face", label: "Periorbital oedema / macroglossia / dry skin", category: "exam", weights: { myxoedema: 3 } },
  { id: "headache_sweating", label: "Episodic headache + sweating + palpitations", category: "exam", weights: { phaeo: 4 } },
  { id: "abdo_pain", label: "Abdominal pain + vomiting", category: "exam", weights: { dka: 2, adrenal: 2 } },
  { id: "altered_gcs", label: "Altered consciousness / agitation", category: "exam", weights: { storm: 2, hhs: 2, myxoedema: 2, apoplexy: 1 } },
];

const CATEGORIES: { id: Symptom["category"]; label: string }[] = [
  { id: "vitals", label: "Vitals & breathing" },
  { id: "biochem", label: "Biochemistry" },
  { id: "history", label: "History / drugs" },
  { id: "exam", label: "Exam findings" },
];

const EndocrineSymptomTriage = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const reset = () => setSelected(new Set());

  const scores = useMemo(() => {
    const totals: Record<DxKey, number> = {
      dka: 0, hhs: 0, storm: 0, myxoedema: 0, adrenal: 0, phaeo: 0, apoplexy: 0,
    };
    for (const id of selected) {
      const s = SYMPTOMS.find((x) => x.id === id);
      if (!s) continue;
      for (const [dx, w] of Object.entries(s.weights) as [DxKey, number][]) {
        totals[dx] += w;
      }
    }
    return totals;
  }, [selected]);

  const ranked = useMemo(() => {
    return (Object.keys(DIAGNOSES) as DxKey[])
      .map((k) => ({ dx: DIAGNOSES[k], score: scores[k] }))
      .sort((a, b) => b.score - a.score);
  }, [scores]);

  const top = ranked[0];
  const maxScore = top?.score ?? 0;
  const hasInput = selected.size > 0 && maxScore > 0;

  return (
    <Card className="p-5 my-6 border-icu/40">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-icu" />
            Symptom-to-diagnosis triage
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Tick presenting features — the engine ranks the most likely endocrine emergency
            and surfaces the focused investigation panel. <strong>Educational tool only</strong> —
            does not replace clinical judgement.
          </p>
        </div>
        {selected.size > 0 && (
          <Button variant="outline" size="sm" onClick={reset} className="shrink-0">
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* LEFT: symptom picker */}
        <div className="space-y-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SYMPTOMS.filter((s) => s.category === cat.id).map((s) => {
                  const on = selected.has(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggle(s.id)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-md border transition-colors ${
                        on
                          ? "bg-icu/15 border-icu text-foreground font-medium"
                          : "bg-card border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      aria-pressed={on}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: ranked diagnoses + investigations */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Differential ranking
            </p>
            {!hasInput ? (
              <div className="p-4 rounded-lg border border-dashed border-border text-sm text-muted-foreground text-center">
                Select features on the left to see the ranked differential.
              </div>
            ) : (
              <ul className="space-y-1.5">
                {ranked.map(({ dx, score }, i) => {
                  const pct = maxScore > 0 ? Math.max(0, (score / maxScore) * 100) : 0;
                  const isTop = i === 0 && score > 0;
                  return (
                    <li key={dx.key}>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs ${isTop ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                          {i + 1}. {dx.name}
                        </span>
                        <Badge variant={isTop ? "default" : "outline"} className="text-[10px] tabular-nums">
                          {score > 0 ? `+${score}` : score}
                        </Badge>
                      </div>
                      <div className="h-1.5 mt-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isTop ? BAR_CLASS[dx.tokenClass] ?? "bg-primary" : "bg-muted-foreground/40"
                          }`}
                          style={{ width: `${score > 0 ? pct : 0}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {hasInput && top.score > 0 && (
            <div className={`p-4 rounded-lg border-2 ${PANEL_CLASS[top.dx.tokenClass] ?? "border-primary/40 bg-primary/5"}`}>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Most likely
              </p>
              <p className="text-base font-serif font-bold text-foreground mt-0.5">{top.dx.name}</p>
              <p className="text-xs text-muted-foreground mt-1 italic">{top.dx.oneLiner}</p>

              <div className="mt-3 p-2.5 rounded-md bg-card border border-border">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-destructive flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Immediate action
                </p>
                <p className="text-xs text-foreground mt-1">{top.dx.immediate}</p>
              </div>

              <div className="mt-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1 mb-1.5">
                  <FlaskConical className="h-3 w-3" /> Required investigations
                </p>
                <ul className="space-y-1">
                  {top.dx.investigations.map((inv, i) => (
                    <li key={i} className="text-xs text-foreground flex gap-1.5">
                      <span className="text-muted-foreground shrink-0">{i + 1}.</span>
                      <span>{inv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EndocrineSymptomTriage;

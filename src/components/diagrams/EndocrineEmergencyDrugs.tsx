import { useState } from "react";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Clickable medication quick-reference for endocrine emergency drugs.
 * Grouped by emergency, each card shows dose, onset, mechanism,
 * contraindications/cautions and a "pearl" exam-friendly note.
 */

type DrugClass = "insulin" | "steroid" | "thionamide" | "iodine" | "beta" | "alpha" | "support";

interface Drug {
  id: string;
  name: string;
  brand?: string;
  cls: DrugClass;
  use: string; // which emergency / indication
  dose: string;
  onset: string;
  duration?: string;
  mechanism: string;
  contraindications: string;
  pearl: string;
}

const DRUGS: Drug[] = [
  // ===== Insulin =====
  {
    id: "actrapid-friii",
    name: "Insulin (soluble — Actrapid)",
    brand: "FRIII for DKA / HHS",
    cls: "insulin",
    use: "DKA & HHS",
    dose:
      "DKA: 0.1 U/kg/h IV fixed-rate (FRIII).\nHHS: 0.05 U/kg/h IV — only after fluids running and if ketones >1 or glucose plateau.",
    onset: "IV: <15 min. Effects on ketones over hours.",
    duration: "Half-life ~5 min IV; effect ends rapidly when infusion stopped.",
    mechanism:
      "Suppresses lipolysis and ketogenesis, activates Na⁺/K⁺-ATPase (drives K⁺, Mg²⁺, PO₄³⁻ intracellularly), promotes peripheral glucose uptake.",
    contraindications:
      "K⁺ <3.5 mmol/L → halt infusion until replaced (DKA potassium paradox). Avoid bolus dosing in DKA/HHS — fixed-rate only. Caution in HHS: rapid glucose fall → cerebral oedema, central pontine myelinolysis.",
    pearl:
      "Continue the patient's long-acting (basal) insulin throughout DKA treatment. Add 10% dextrose alongside saline once glucose <14 mmol/L so the FRIII can keep clearing ketones safely.",
  },

  // ===== Steroids =====
  {
    id: "hydrocortisone",
    name: "Hydrocortisone",
    brand: "Solu-Cortef",
    cls: "steroid",
    use: "Adrenal crisis · thyroid storm · myxoedema · pituitary apoplexy",
    dose:
      "Adrenal crisis: 100 mg IV stat, then 200 mg/24 h (50 mg q6h or infusion).\nThyroid storm: 100 mg IV q8h.\nSurgical cover (major): 100 mg IV at induction + 200 mg/24 h × 24–72 h.",
    onset: "30–60 min IV (genomic effects). Peak anti-inflammatory at 4–6 h.",
    duration: "Biological t½ 8–12 h.",
    mechanism:
      "Glucocorticoid + mineralocorticoid (1:1 GC:MC ratio). At high dose has full mineralocorticoid effect — fludrocortisone NOT needed acutely. Blocks T4→T3 conversion in thyroid storm.",
    contraindications:
      "No absolute contraindication in life-threatening adrenal crisis. Caution: systemic fungal infection, live vaccines. Long-term use → HPA suppression, hyperglycaemia, infection, osteoporosis.",
    pearl:
      "In suspected adrenal crisis — give BEFORE confirmatory tests. Take paired random cortisol + ACTH if practical, but never delay treatment. In pituitary apoplexy give cortisol BEFORE thyroxine to avoid precipitating crisis.",
  },
  {
    id: "dexamethasone",
    name: "Dexamethasone",
    cls: "steroid",
    use: "Thyroid storm (alternative steroid)",
    dose: "2 mg IV q6h.",
    onset: "1–2 h (genomic).",
    duration: "Biological t½ 36–54 h.",
    mechanism:
      "Pure glucocorticoid (no mineralocorticoid effect). Blocks peripheral T4→T3 conversion.",
    contraindications:
      "NOT suitable for adrenal crisis (no mineralocorticoid effect, will not correct hyponatraemia / hyperkalaemia adequately).",
    pearl:
      "Useful if you need to do a Synacthen test soon (does not interfere with cortisol assay) — but for storm itself, hydrocortisone is preferred because it covers any concurrent adrenal insufficiency.",
  },
  {
    id: "fludrocortisone",
    name: "Fludrocortisone",
    cls: "steroid",
    use: "Long-term Addison's (NOT for acute crisis)",
    dose: "50–200 mcg PO once daily; titrate to BP, K⁺, renin.",
    onset: "Hours (oral).",
    mechanism:
      "Pure mineralocorticoid — Na⁺ retention, K⁺ excretion, water retention.",
    contraindications:
      "Heart failure, severe hypertension, hypokalaemia. Not needed in acute crisis (high-dose hydrocortisone covers MC effect).",
    pearl:
      "Add only when oral hydrocortisone <50 mg/day — below this dose the MC effect of hydrocortisone is insufficient. Not needed at all in secondary adrenal insufficiency (aldosterone is intact — driven by renin-angiotensin not ACTH).",
  },

  // ===== Thionamides =====
  {
    id: "ptu",
    name: "Propylthiouracil (PTU)",
    cls: "thionamide",
    use: "Thyroid storm — preferred thionamide",
    dose:
      "500–1000 mg PO/NG load, then 250 mg q4h (= 1500 mg/day). Wean to 100–200 mg q8h once euthyroid.",
    onset:
      "Blocks NEW hormone synthesis within hours; biochemical effect over days. Blocks peripheral T4→T3 within hours.",
    mechanism:
      "Inhibits thyroid peroxidase (blocks iodination of tyrosine = blocks new T3/T4 synthesis). Uniquely also blocks peripheral 5'-deiodinase (T4→T3) — the reason it's preferred in storm.",
    contraindications:
      "Pregnancy 2nd/3rd trimester (use carbimazole — PTU has hepatotoxicity risk). Severe hepatic impairment. Previous agranulocytosis. Allergy.",
    pearl:
      "Black-box hepatotoxicity warning (rare but can be fulminant). Patients must report sore throat / fever IMMEDIATELY — agranulocytosis (~0.3%). Always check FBC + LFTs before and during treatment.",
  },
  {
    id: "carbimazole",
    name: "Carbimazole / Methimazole",
    cls: "thionamide",
    use: "Thyroid storm (PTU alternative); maintenance hyperthyroidism",
    dose:
      "Storm: 60–80 mg/day in divided doses (PO/NG). Maintenance: 5–20 mg/day.",
    onset: "Hours to block synthesis; days for clinical effect.",
    mechanism:
      "Pro-drug → methimazole, inhibits thyroid peroxidase. Does NOT block peripheral T4→T3 conversion (key difference from PTU).",
    contraindications:
      "1st trimester pregnancy (teratogenic — aplasia cutis, choanal atresia → use PTU instead). Agranulocytosis history. Severe hepatic impairment.",
    pearl:
      "Preferred over PTU for routine hyperthyroidism (less hepatotoxic, better long-term safety). In storm, PTU edges ahead because of T4→T3 block. Same agranulocytosis warning — patients need a sore-throat safety card.",
  },

  // ===== Iodine =====
  {
    id: "lugol",
    name: "Lugol's iodine / SSKI",
    cls: "iodine",
    use: "Thyroid storm — block hormone RELEASE",
    dose:
      "Lugol's iodine 5–10 drops PO q6h (≈ 6.3 mg iodine/drop). OR potassium iodide (SSKI) 5 drops q6h. OR sodium iodide 0.5–1 g IV q12h.",
    onset:
      "Rapid (hours) — blocks hormone RELEASE within 24 h via Wolff-Chaikoff effect.",
    mechanism:
      "High plasma iodide acutely inhibits thyroid hormone release and (transiently) organification (Wolff-Chaikoff). Effect escapes after ~10 days.",
    contraindications:
      "Active hyperthyroidism WITHOUT prior thionamide (Jod-Basedow phenomenon — fuels storm). Iodine allergy. Pregnancy (relative — short course OK).",
    pearl:
      "Critical timing rule: give ≥1 hour AFTER PTU / carbimazole — never before. Iodine before thionamide gives the gland substrate for new hormone synthesis and worsens storm.",
  },

  // ===== Beta-blockers =====
  {
    id: "propranolol",
    name: "Propranolol",
    cls: "beta",
    use: "Thyroid storm — first-line β-blockade",
    dose:
      "Storm: 60–80 mg PO q4h (or 1 mg slow IV titrated, max 10 mg).\nPhaeo crisis: ONLY after α-blockade established.",
    onset: "PO 1–2 h; IV minutes.",
    duration: "PO 4–6 h; IV 30 min.",
    mechanism:
      "Non-selective β-blocker; at high dose ALSO blocks peripheral T4→T3 conversion (clinically useful in storm — esmolol does not have this effect to the same degree).",
    contraindications:
      "Decompensated heart failure (caution — high-output failure in storm may need esmolol with rapid titrability). Severe asthma / COPD. 2nd/3rd-degree heart block. Phaeochromocytoma WITHOUT α-blockade (unopposed α stimulation → hypertensive crisis, pulmonary oedema).",
    pearl:
      "In thyroid storm, β-blockade is the FIRST drug given — controls tachycardia, AF, tremor, anxiety, AND blocks T4→T3. Do not delay other steps while titrating.",
  },
  {
    id: "esmolol",
    name: "Esmolol",
    cls: "beta",
    use: "Thyroid storm with HF / phaeo crisis (after α-block)",
    dose: "Load 250–500 mcg/kg over 1 min, then infusion 50–300 mcg/kg/min.",
    onset: "<2 min IV.",
    duration: "Half-life 9 min; off in ~20 min when stopped.",
    mechanism: "Selective β1-blocker, ester-hydrolysed by RBC esterases.",
    contraindications:
      "Same as propranolol but the rapid offset makes it preferred when haemodynamically borderline. Do NOT give as monotherapy in phaeochromocytoma crisis.",
    pearl:
      "Excellent if patient has heart failure and you need β-blockade you can switch off quickly. Less effective at blocking peripheral T4→T3 conversion than propranolol.",
  },
  {
    id: "labetalol",
    name: "Labetalol",
    cls: "beta",
    use: "Hypertensive emergencies (NOT thyroid storm first-line)",
    dose:
      "5–20 mg IV bolus q10 min; or infusion 0.5–2 mg/min.",
    onset: "5 min IV.",
    mechanism:
      "Combined α1 + non-selective β blocker. PO α:β ratio ~ 1:7; IV ~ 1:3.",
    contraindications:
      "Phaeochromocytoma crisis — ratio insufficient (use phentolamine or magnesium first). Asthma, heart block, decompensated HF.",
    pearl:
      "Tempting choice in phaeo because it 'covers both'. It doesn't — the α effect is too weak. Use phentolamine, phenoxybenzamine or IV magnesium for true crisis.",
  },

  // ===== Alpha & misc =====
  {
    id: "phentolamine",
    name: "Phentolamine",
    cls: "alpha",
    use: "Phaeochromocytoma crisis · extravasation",
    dose: "1–5 mg IV bolus q5 min, titrated to BP.",
    onset: "1–2 min IV.",
    duration: "10–15 min.",
    mechanism: "Non-selective α-blocker (α1 + α2). Short-acting, titratable.",
    contraindications:
      "MI, severe coronary disease (rebound tachycardia), hypotension. Use with caution in pregnancy.",
    pearl:
      "Workhorse for acute phaeo crisis. Pair with β-blocker (esmolol) ONLY after α-blockade is established.",
  },
  {
    id: "phenoxybenzamine",
    name: "Phenoxybenzamine",
    cls: "alpha",
    use: "Phaeochromocytoma — pre-operative α-blockade",
    dose: "10 mg PO q12h, titrate up to 1 mg/kg/day over 1–2 weeks.",
    onset: "Hours; long-lasting (irreversible).",
    duration: "Days (covalent α-receptor blockade).",
    mechanism:
      "Irreversible non-selective α-blocker (covalent bond). Long duration is good for elective prep, problematic for crisis titration.",
    contraindications:
      "Acute crisis (phentolamine preferred — titratable). CV instability. Allergy.",
    pearl:
      "Standard for elective phaeo prep — start 10–14 days pre-op, titrate to postural drop, then add β-blocker. Never start β-blocker first.",
  },
  {
    id: "magnesium",
    name: "Magnesium sulfate",
    cls: "alpha",
    use: "Phaeo crisis · torsades · severe pre-eclampsia",
    dose:
      "Phaeo / pre-eclampsia: 4 g IV over 15 min, then 1–2 g/h.\nTorsades: 2 g IV over 10 min.",
    onset: "Minutes.",
    mechanism:
      "Inhibits catecholamine release from adrenal medulla and nerve terminals; vasodilation; antiarrhythmic.",
    contraindications:
      "Myasthenia gravis (precipitates crisis — neuromuscular blockade). Heart block. Severe renal impairment (accumulation).",
    pearl:
      "Useful when α-blocker not immediately available, or as adjunct. Monitor reflexes (loss = toxicity), respiratory rate, ECG. Antidote = calcium gluconate 10% 10 mL IV.",
  },

  // ===== Support =====
  {
    id: "kcl",
    name: "Potassium chloride (KCl)",
    cls: "support",
    use: "DKA / HHS — replace as insulin drives K⁺ intracellularly",
    dose:
      "K⁺ 3.5–5.5: 40 mmol KCl/L of replacement fluid.\nK⁺ <3.5: 20 mmol/h via central line + halt insulin until K⁺ ≥3.5.\nK⁺ >5.5: no KCl this bag.",
    onset: "Distribution into cells over hours (insulin-driven).",
    contraindications:
      "Anuric AKI (caution; titrate). Concentrated KCl (>40 mmol/L) → central line only — NEVER peripheral push (cardiac arrest).",
    mechanism:
      "Replaces total-body deficit unmasked by insulin therapy.",
    pearl:
      "The DKA potassium paradox: serum K⁺ at presentation is often normal/high despite a 5 mmol/kg total-body deficit. Falls fast on insulin — anticipate, don't react.",
  },
  {
    id: "saline-09",
    name: "0.9% sodium chloride",
    cls: "support",
    use: "DKA · HHS · adrenal crisis · myxoedema",
    dose:
      "DKA: 1 L over 1 h, then titrated.\nHHS: 1 L/h × 2–3, total 100–220 mL/kg over 24–48 h.\nAdrenal crisis: 1 L over 1 h, then 2–4 L/24 h.",
    onset: "Immediate intravascular expansion.",
    mechanism: "Isotonic crystalloid — restores intravascular volume and Na⁺.",
    contraindications:
      "Severe HF / pulmonary oedema (titrate carefully). Risk of hyperchloraemic acidosis with large volumes — Hartmann's reasonable alternative once initial resus done in DKA.",
    pearl:
      "In HHS: aim glucose fall ≤5 mmol/L/h AND Na⁺ change ≤10 mmol/L/24 h to avoid cerebral oedema and central pontine myelinolysis. Switch to 0.45% saline if corrected Na⁺ rising despite adequate fluid.",
  },
  {
    id: "dextrose-10",
    name: "10% dextrose",
    cls: "support",
    use: "DKA (once glucose <14) · adrenal crisis (hypoglycaemia)",
    dose:
      "DKA: 125 mL/h alongside 0.9% saline once glucose <14.\nHypoglycaemia: 100 mL bolus then infusion.",
    onset: "Immediate.",
    mechanism: "Provides glucose so insulin infusion can continue clearing ketones.",
    contraindications:
      "Untreated hyperglycaemia. Caution if hyponatraemia — free water shift.",
    pearl:
      "Don't stop the FRIII when glucose normalises in DKA — ketosis (the actual disease) is still being cleared. Add dextrose, keep insulin running.",
  },
  {
    id: "atropine-anti",
    name: "Atropine",
    cls: "support",
    use: "Cholinergic crisis · adrenal crisis bradycardia",
    dose: "0.5–1 mg IV; repeat to a max of 3 mg.",
    onset: "<1 min IV.",
    mechanism: "Competitive muscarinic antagonist.",
    contraindications:
      "Narrow-angle glaucoma (relative). Tachyarrhythmias. Severe ulcerative colitis.",
    pearl:
      "In CHOLINERGIC crisis (anticholinesterase overdose) atropine reverses muscarinic effects (SLUDGE) but NOT nicotinic weakness — patient may still need ventilation.",
  },
  {
    id: "cholestyramine",
    name: "Cholestyramine",
    cls: "support",
    use: "Refractory thyroid storm (rescue)",
    dose: "4 g PO q6h.",
    onset: "Days.",
    mechanism:
      "Bile-acid sequestrant — interrupts enterohepatic recirculation of thyroid hormone, increasing faecal loss.",
    contraindications:
      "Complete biliary obstruction. Phenylketonuria (some preparations).",
    pearl:
      "Adjunct for thyroid storm not responding to standard therapy. Separate other oral drugs by ≥4 h (impairs absorption).",
  },
  {
    id: "t3-iv",
    name: "Liothyronine (T3) IV",
    cls: "support",
    use: "Myxoedema coma",
    dose:
      "Load 10–20 mcg IV slow, then 10 mcg q4h (or T4 200–400 mcg IV load + 50–100 mcg/day).",
    onset: "Hours (T3 faster than T4).",
    mechanism: "Direct active thyroid hormone replacement.",
    contraindications:
      "Untreated adrenal insufficiency — give hydrocortisone FIRST (T3 accelerates cortisol metabolism → precipitates adrenal crisis). Cardiac ischaemia (caution).",
    pearl:
      "Always give IV hydrocortisone 100 mg q8h alongside thyroid hormone in myxoedema coma — the two often coexist, and missing it is fatal.",
  },
];

// ===== UI =====

const CLASS_META: Record<DrugClass, { label: string; tone: string; chip: string }> = {
  insulin: {
    label: "Insulin",
    tone: "border-clinical/40 bg-clinical/5 hover:bg-clinical/10",
    chip: "bg-clinical/15 text-clinical",
  },
  steroid: {
    label: "Steroid",
    tone: "border-icu/40 bg-icu/5 hover:bg-icu/10",
    chip: "bg-icu/15 text-icu",
  },
  thionamide: {
    label: "Thionamide",
    tone: "border-pharmacology/40 bg-pharmacology/5 hover:bg-pharmacology/10",
    chip: "bg-pharmacology/15 text-pharmacology",
  },
  iodine: {
    label: "Iodine",
    tone: "border-physiology/40 bg-physiology/5 hover:bg-physiology/10",
    chip: "bg-physiology/15 text-physiology",
  },
  beta: {
    label: "β-blocker",
    tone: "border-perioperative/40 bg-perioperative/5 hover:bg-perioperative/10",
    chip: "bg-perioperative/15 text-perioperative",
  },
  alpha: {
    label: "α-blocker / Mg",
    tone: "border-destructive/40 bg-destructive/5 hover:bg-destructive/10",
    chip: "bg-destructive/15 text-destructive",
  },
  support: {
    label: "Support",
    tone: "border-border bg-card hover:bg-muted/40",
    chip: "bg-secondary text-secondary-foreground",
  },
};

const CLASS_ORDER: DrugClass[] = [
  "insulin",
  "steroid",
  "thionamide",
  "iodine",
  "beta",
  "alpha",
  "support",
];

const EndocrineEmergencyDrugs = () => {
  const [filter, setFilter] = useState<DrugClass | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = filter === "all" ? DRUGS : DRUGS.filter((d) => d.cls === filter);

  return (
    <DiagramFigure
      id="endocrine-emergency-drugs"
      title="Endocrine emergency drugs"
      description="Auto-generated wrapper for the Endocrine emergency drugs anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-3">
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <div className="mb-3">
            <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground">
              Medication quick reference — endocrine emergencies
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tap a drug for dose, onset, mechanism, contraindications and an exam pearl.
              Filter by class to compare alternatives side by side.
            </p>
          </div>
  
          {/* Class filter chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <button
              type="button"
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              className={cn(
                "rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-colors",
                filter === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50",
              )}
            >
              All ({DRUGS.length})
            </button>
            {CLASS_ORDER.map((c) => {
              const count = DRUGS.filter((d) => d.cls === c).length;
              const meta = CLASS_META[c];
              const active = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-colors",
                    active
                      ? cn("border-primary", meta.chip, "ring-1 ring-primary/40")
                      : cn("border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"),
                  )}
                >
                  {meta.label} ({count})
                </button>
              );
            })}
          </div>
  
          {/* Drug grid */}
          <div className="grid sm:grid-cols-2 gap-2">
            {visible.map((d) => {
              const meta = CLASS_META[d.cls];
              const isOpen = openId === d.id;
              return (
                    <div
                  key={d.id}
                  className={cn(
                    "rounded-lg border-2 transition-all",
                    meta.tone,
                    isOpen && "ring-2 ring-primary/40 shadow-md sm:col-span-2",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : d.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-3 py-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-tight truncate">
                          {d.name}
                        </p>
                        {d.brand && (
                          <p className="text-[10px] text-muted-foreground italic truncate">
                            {d.brand}
                          </p>
                        )}
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider",
                          meta.chip,
                        )}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-snug">
                      <span className="font-semibold text-foreground">Use: </span>
                      {d.use}
                    </p>
                    {!isOpen && (
                      <p className="text-[9px] text-primary mt-1 font-semibold">
                        Tap for dose, onset, contraindications →
                      </p>
                    )}
                  </button>
  
                  {isOpen && (
                    <div className="px-3 pb-3 space-y-2 border-t border-border/60 pt-2 mt-1 animate-fade-in">
                      <div className="rounded border-l-2 border-pharmacology/70 bg-pharmacology/10 px-2 py-1.5">
                        <p className="text-[9px] uppercase tracking-wider font-semibold text-pharmacology mb-0.5">
                          Dose
                        </p>
                        <pre className="text-[11px] font-mono font-bold text-foreground whitespace-pre-wrap leading-snug">
                          {d.dose}
                        </pre>
                      </div>
  
                      <div className="grid sm:grid-cols-2 gap-2">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground">
                            Onset
                          </p>
                          <p className="text-[11px] text-foreground leading-snug">{d.onset}</p>
                        </div>
                        {d.duration && (
                          <div>
                            <p className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground">
                              Duration
                            </p>
                            <p className="text-[11px] text-foreground leading-snug">
                              {d.duration}
                            </p>
                          </div>
                        )}
                      </div>
  
                      <div>
                        <p className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground">
                          Mechanism
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          {d.mechanism}
                        </p>
                      </div>
  
                      <div className="rounded border-l-2 border-destructive/60 bg-destructive/5 px-2 py-1.5">
                        <p className="text-[9px] uppercase tracking-wider font-semibold text-destructive mb-0.5">
                          Contraindications &amp; cautions
                        </p>
                        <p className="text-[11px] text-foreground leading-snug">
                          {d.contraindications}
                        </p>
                      </div>
  
                      <div className="rounded border-l-2 border-primary/60 bg-primary/5 px-2 py-1.5">
                        <p className="text-[9px] uppercase tracking-wider font-semibold text-primary mb-0.5">
                          Exam pearl
                        </p>
                        <p className="text-[11px] text-foreground leading-snug">{d.pearl}</p>
                      </div>
                    </div>
                  )}
                </div>
    );
            })}
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default EndocrineEmergencyDrugs;

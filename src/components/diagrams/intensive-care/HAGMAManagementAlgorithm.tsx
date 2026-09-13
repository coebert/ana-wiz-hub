import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { Pill, Droplets, AlertTriangle, Activity, Stethoscope } from "lucide-react";

/**
 * HAGMA Management Algorithm
 *
 * Cause-stratified, stepwise management with explicit antidote and
 * dialysis triggers, organised into four columns:
 *   1. Recognise & confirm
 *   2. Resuscitate & supportive
 *   3. Specific therapy / antidote (with start threshold)
 *   4. Escalate to RRT / HD (with explicit triggers)
 *
 * Sources: SSC 2021 (sepsis/lactate), JBDS DKA 2023, EXTRIP 2015
 * (toxic alcohols, salicylate, metformin), KDIGO AKI 2012,
 * BICAR-ICU 2018 (bicarbonate).
 */

type CauseKey = "dka" | "lactic-a" | "lactic-b" | "renal" | "methanol" | "eg" | "salicylate";

interface Step {
  text: string;
  trigger?: string;
}

interface Cause {
  key: CauseKey;
  label: string;
  oneLiner: string;
  recognise: Step[];
  resuscitate: Step[];
  specific: Step[];
  escalate: Step[];
  pearls: string[];
}

const CAUSES: Cause[] = [
  {
    key: "dka",
    label: "DKA",
    oneLiner: "β-hydroxybutyrate / acetoacetate accumulation in insulin deficiency",
    recognise: [
      { text: "Glucose > 11 mmol/L, ketones (β-OHB) ≥ 3.0 mmol/L or urine 2+, HCO₃⁻ < 15 / pH < 7.30 (JBDS 2023)" },
      { text: "Look for precipitant: infection, MI, missed insulin, new T1DM, drugs (SGLT2 → euglycaemic DKA)" },
    ],
    resuscitate: [
      { text: "0.9% saline 1 L over 1 h (slower if young/euvolaemic) → balanced crystalloid thereafter to reduce hyperchloraemic NAGMA" },
      { text: "K⁺ replacement BEFORE insulin if K⁺ < 3.5 mmol/L — insulin will crash potassium" },
      { text: "VTE prophylaxis, NG tube if vomiting, hourly capillary ketones + glucose" },
    ],
    specific: [
      { text: "Fixed-rate IV insulin infusion 0.1 units/kg/h", trigger: "from diagnosis" },
      { text: "Add 10% glucose when CBG < 14 mmol/L — continue insulin to clear ketones (ketone fall target ≥ 0.5 mmol/L/h or HCO₃⁻ rise ≥ 3 mmol/L/h)" },
      { text: "Switch to SC long-acting + meal-time insulin only once ketones < 0.6 AND HCO₃⁻ > 18 AND eating" },
    ],
    escalate: [
      { text: "HDU/ICU if pH < 7.0, GCS depressed, K⁺ < 3.5 despite replacement, O₂ requirement, pregnant, age < 18 or > 70 with comorbidity" },
      { text: "RRT rarely needed — reserve for AKI not responding to volume + insulin", trigger: "KDIGO stage 3 AKI + persistent acidosis" },
      { text: "Bicarbonate NOT routine — consider 50 mmol 8.4% NaHCO₃ only if pH < 6.9 with cardiovascular compromise" },
    ],
    pearls: [
      "Euglycaemic DKA on SGLT2 inhibitors: ketones high with glucose < 11 — do not be reassured by normal CBG; start insulin + glucose infusion concurrently.",
      "Delta ratio ~ 1 in pure DKA; > 1 suggests vomiting (added metabolic alkalosis); < 1 suggests added saline-induced NAGMA.",
    ],
  },
  {
    key: "lactic-a",
    label: "Lactic — Type A",
    oneLiner: "Hypoperfusion / hypoxia: shock, sepsis, regional ischaemia, severe hypoxaemia",
    recognise: [
      { text: "Lactate > 2 (significant), > 4 mmol/L (severe; triggers Sepsis-6/SSC bundle)" },
      { text: "Identify the perfusion defect: source of sepsis, cardiogenic / haemorrhagic shock, mesenteric ischaemia, compartment syndrome, seizures" },
      { text: "ScvO₂, cap refill, mottling score, urine output — trend with serial lactate every 1–2 h" },
    ],
    resuscitate: [
      { text: "Balanced crystalloid 30 mL/kg in the first 3 h for sepsis-induced hypoperfusion (SSC 2021); reassess responsiveness with dynamic measures (PPV/SVV, passive leg raise)" },
      { text: "Vasopressor (noradrenaline first line, MAP ≥ 65) early — do not delay for fluid responsiveness if MAP < 65 after initial bolus" },
      { text: "Inotrope (dobutamine / adrenaline) if cardiogenic component; blood products + tranexamic acid if haemorrhagic" },
    ],
    specific: [
      { text: "TREAT THE CAUSE — source control: surgery for ischaemic bowel/necrotising fasciitis, drainage of collections, PCI for STEMI, antibiotics within 1 h for septic shock", trigger: "as fast as physiologically possible" },
      { text: "Adequate oxygenation (SpO₂ ≥ 92%, PaO₂ ≥ 8 kPa); avoid hyperoxia" },
    ],
    escalate: [
      { text: "Refractory shock + AKI (KDIGO 2–3) with acidaemia pH < 7.20 → consider RRT", trigger: "BICAR-ICU 2018 signal for benefit in AKI subgroup" },
      { text: "VA-ECMO for refractory cardiogenic shock with reversible cause" },
      { text: "Bicarbonate: not routine; reasonable as bridge if pH < 7.10 with vasopressor unresponsiveness, especially with AKI" },
    ],
    pearls: [
      "Persistently rising lactate despite resuscitation is a marker of either ongoing source or evolving multi-organ failure — re-image, re-examine.",
      "Lactate clearance > 10% per hour is a good prognostic sign in septic shock.",
    ],
  },
  {
    key: "lactic-b",
    label: "Lactic — Type B",
    oneLiner: "Non-hypoxic: drugs/toxins (metformin, linezolid, propofol, NRTIs), liver failure, malignancy, thiamine deficiency",
    recognise: [
      { text: "Lactate raised WITHOUT tissue hypoperfusion (ScvO₂ normal/high, no mottling, MAP adequate)" },
      { text: "Drug history (metformin + AKI, linezolid > 72 h, propofol > 4 mg/kg/h > 48 h = PRIS), liver function, alcohol use" },
      { text: "Consider thiamine deficiency (alcohol, malnutrition, post-bariatric, refeeding) — give empirically as low risk/high benefit" },
    ],
    resuscitate: [
      { text: "Stop the offending drug immediately (metformin, linezolid, propofol)" },
      { text: "Supportive: fluids for volume status, vasopressor only if hypotensive — over-resuscitation worsens fluid-overload acidosis" },
      { text: "Thiamine 200–300 mg IV (Pabrinex 2 pairs) even on suspicion" },
    ],
    specific: [
      { text: "Metformin-associated lactic acidosis (MALA): hold metformin, treat any AKI, supportive" },
      { text: "Propofol infusion syndrome (PRIS): switch sedation (midazolam ± dexmedetomidine ± alfentanil), correct hypertriglyceridaemia / rhabdomyolysis" },
      { text: "Liver failure: N-acetylcysteine if paracetamol; consider King's criteria for transplant referral" },
    ],
    escalate: [
      { text: "Haemodialysis for MALA with lactate > 20 mmol/L OR pH < 7.0 OR AKI OR shock", trigger: "EXTRIP 2015 — high removal: metformin small MW, low protein binding" },
      { text: "HD for severe linezolid- or NRTI-associated lactic acidosis with multi-organ failure" },
      { text: "ECMO for PRIS with cardiovascular collapse refractory to maximal support" },
    ],
    pearls: [
      "MALA classically presents with lactate hugely out of proportion to clinical illness; do not be reassured by 'mild' sepsis numbers.",
      "D-lactic acidosis (short-bowel) — standard L-lactate assay is normal; encephalopathy + HAGMA after a high-carb meal is the clue.",
    ],
  },
  {
    key: "renal",
    label: "Uraemic acidosis",
    oneLiner: "Retained sulphate, phosphate, urate, hippurate ± impaired NH₄⁺ excretion",
    recognise: [
      { text: "eGFR < 20 or AKI stage 3; AG usually 16–24 (rarely > 26 unless concurrent lactate/ketones)" },
      { text: "Distinguish HAGMA of CKD from NAGMA (RTA / early CKD) using the delta ratio" },
    ],
    resuscitate: [
      { text: "Volume status assessment — many are euvolaemic / fluid-overloaded, not depleted" },
      { text: "Treat hyperkalaemia (Ca gluconate, insulin-dextrose, salbutamol) — frequently coexists" },
    ],
    specific: [
      { text: "Oral sodium bicarbonate 500–1500 mg TDS in stable CKD to keep HCO₃⁻ > 22 (slows CKD progression — BiCARB 2020 mixed evidence but generally supported)", trigger: "HCO₃⁻ < 22 in stable CKD" },
      { text: "Treat reversible causes: obstruction, drugs (NSAIDs, ACEi in AKI), sepsis, contrast" },
    ],
    escalate: [
      { text: "Emergency RRT (KDIGO indications): refractory hyperkalaemia, pulmonary oedema, uraemic encephalopathy/pericarditis, severe acidaemia pH < 7.15, oligo-anuria with progressive acidosis", trigger: "any single KDIGO criterion" },
      { text: "Don't delay RRT in AKI 3 + acidaemia + AG > 20 — STARRT-AKI showed no benefit to accelerated start, but classical KDIGO indications remain absolute" },
    ],
    pearls: [
      "Uraemic AG rarely exceeds 25 — if higher, hunt for a second cause (lactate, ketones, toxin).",
      "In chronic dialysis patients, target pre-dialysis HCO₃⁻ ≥ 22; over-correction worsens vascular calcification.",
    ],
  },
  {
    key: "methanol",
    label: "Methanol",
    oneLiner: "Methanol → formate (alcohol-dehydrogenase, then aldehyde-DH) → optic nerve & putamen injury",
    recognise: [
      { text: "↑ osmolar gap early; ↑ AG late as formate accumulates; visual disturbance ('snowfield'), hyperaemic disc; CT putaminal necrosis" },
      { text: "Co-ingested ethanol can blunt presentation (competes for ADH) — delayed toxicity once ethanol cleared" },
    ],
    resuscitate: [
      { text: "Airway/breathing support if obtunded; large-bore IV access, urgent bloods (level, ABG, U&E, osm, AG, lactate, lipase)" },
      { text: "Folinic acid 1 mg/kg IV (max 50 mg) every 4 h — accelerates formate metabolism" },
    ],
    specific: [
      { text: "Fomepizole 15 mg/kg IV loading dose, then 10 mg/kg q12h × 4 doses, then 15 mg/kg q12h", trigger: "methanol ≥ 20 mg/dL (200 mg/L) OR strong history OR pH < 7.30 OR AG > 20 with ↑ osmolar gap" },
      { text: "Ethanol infusion (target 100–150 mg/dL) only if fomepizole unavailable — labour-intensive, less effective" },
      { text: "Sodium bicarbonate 1–2 mmol/kg for pH < 7.20 — also alkalinises urine to ↑ formate excretion" },
    ],
    escalate: [
      { text: "Haemodialysis — high clearance of methanol AND formate", trigger: "methanol > 50 mg/dL, pH < 7.15, vision impairment, coma/seizures, AKI, or shock (EXTRIP 2015)" },
      { text: "Fomepizole dosing during HD: every 4 h instead of 12 h" },
      { text: "Continue until methanol < 20 mg/dL AND acidosis resolved AND patient asymptomatic" },
    ],
    pearls: [
      "Visual loss can be irreversible — empirical fomepizole on strong history beats waiting for a level.",
      "Co-ingestion of ethanol may falsely reassure — methanol toxicity emerges hours later.",
    ],
  },
  {
    key: "eg",
    label: "Ethylene glycol",
    oneLiner: "EG → glycoaldehyde → glycolate (acidosis) → glyoxylate → oxalate (AKI, hypocalcaemia)",
    recognise: [
      { text: "↑ osmolar gap + ↑ AG; urine oxalate crystals; hypocalcaemia; AKI; Wood's-lamp fluorescence (antifreeze fluorescein)" },
      { text: "Three clinical phases: 0–12 h neurological (inebriated), 12–24 h cardiopulmonary, 24–72 h renal" },
    ],
    resuscitate: [
      { text: "IV fluids to maintain urine output > 1–2 mL/kg/h while EG present (limits oxalate deposition)" },
      { text: "Pyridoxine 50 mg IV q6h + thiamine 100 mg IV q6h — divert glyoxylate to non-toxic metabolites" },
      { text: "Correct symptomatic hypocalcaemia (cautious — repletion may worsen oxalate deposition while EG still present)" },
    ],
    specific: [
      { text: "Fomepizole 15 mg/kg IV load, then 10 mg/kg q12h × 4, then 15 mg/kg q12h", trigger: "EG ≥ 20 mg/dL (200 mg/L) OR strong history OR pH < 7.30 OR AG > 20 with ↑ osmolar gap OR oxaluria" },
      { text: "Ethanol infusion only if fomepizole unavailable" },
    ],
    escalate: [
      { text: "Haemodialysis — high clearance of EG and glycolate", trigger: "EG > 50 mg/dL, pH < 7.30, end-organ injury (AKI, oxaluria, coma)" },
      { text: "Fomepizole monotherapy reasonable if level low, normal pH, no AKI, no end-organ damage — avoids HD" },
      { text: "Continue until EG < 20 mg/dL AND acidosis resolved" },
    ],
    pearls: [
      "Calcium oxalate crystals (envelope or needle shaped) on urine microscopy are diagnostic.",
      "EG has higher MW than methanol → osmolar gap rise per mg/dL is smaller — never anchor on the gap alone.",
    ],
  },
  {
    key: "salicylate",
    label: "Salicylate",
    oneLiner: "Mixed picture: respiratory alkalosis (medullary stimulation) + HAGMA (uncoupled OXPHOS, lactate, ketones)",
    recognise: [
      { text: "Tinnitus, tachypnoea, vomiting, fever, sweating, agitation; later coma + cerebral oedema" },
      { text: "ABG classically pH normal or alkalaemic early; high AG with respiratory alkalosis is highly specific" },
      { text: "Hypokalaemia, hypoglycaemia (especially neuroglycopaenia despite normal serum glucose)" },
    ],
    resuscitate: [
      { text: "Activated charcoal within 1–2 h of ingestion (multiple doses for enteric-coated)" },
      { text: "IV crystalloid for dehydration (vomiting, sweating, tachypnoea-related insensible losses)" },
      { text: "Glucose 5–10% infusion — protect CNS even if serum glucose normal" },
      { text: "AVOID intubation if possible; if essential, match the patient's pre-intubation minute ventilation precisely to prevent sudden ↑ PaCO₂ driving salicylate into the CNS" },
    ],
    specific: [
      { text: "Urinary alkalinisation: 1.5 L 1.26% NaHCO₃ over 2 h, then titrate to urinary pH 7.5–8.5", trigger: "salicylate ≥ 300 mg/L with symptoms, OR any level with significant clinical features" },
      { text: "Aggressive K⁺ replacement (target serum K⁺ > 4.0) — alkalinisation will FAIL if hypokalaemic (H⁺/K⁺ exchanger keeps reabsorbing H⁺)" },
      { text: "Stop bicarbonate if serum pH > 7.55" },
    ],
    escalate: [
      { text: "Haemodialysis — fast clearance (small MW, low protein binding at toxic levels saturates albumin)", trigger: "EXTRIP 2015: salicylate > 700 mg/L (acute) or > 500 mg/L (chronic), altered mental status, pulmonary/cerebral oedema, AKI, pH < 7.20 despite optimal therapy" },
      { text: "Lower thresholds for HD in elderly / chronic ingestion — toxicity at lower levels because of altered binding and CNS penetration" },
    ],
    pearls: [
      "A salicylate-poisoned patient who suddenly becomes drowsy is decompensating — urgent HD, not intubation.",
      "Mixed respiratory alkalosis + HAGMA with normal pH is classic; an acidaemic salicylate patient is in deep trouble.",
    ],
  },
];

const HAGMAManagementAlgorithm = () => {
  const [active, setActive] = useState<CauseKey>("dka");
  const cause = CAUSES.find((c) => c.key === active)!;

  const columns: { title: string; icon: typeof Pill; steps: Step[]; tint: string }[] = [
    { title: "1. Recognise & confirm", icon: Stethoscope, steps: cause.recognise, tint: "border-l-icu" },
    { title: "2. Resuscitate & support", icon: Droplets, steps: cause.resuscitate, tint: "border-l-physiology" },
    { title: "3. Specific therapy / antidote", icon: Pill, steps: cause.specific, tint: "border-l-pharmacology" },
    { title: "4. Escalate (RRT / HD)", icon: AlertTriangle, steps: cause.escalate, tint: "border-l-destructive" },
  ];

  return (
    <DiagramFigure
      id="hagma-management-algorithm"
      title="HAGMA management algorithm by cause"
      description="Cause-stratified, four-step algorithm for HAGMA. Select a cause to see recognition, resuscitation, specific therapy / antidote with start thresholds, and explicit escalation triggers for renal replacement therapy."
    >
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-base font-serif font-bold text-foreground">HAGMA management algorithm</h3>
          <p className="text-xs text-muted-foreground">Stratify by cause → step through 4 columns → note explicit antidote / HD triggers</p>
        </div>

        {/* Cause selector */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {CAUSES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`text-xs px-2.5 py-1.5 rounded border transition-colors ${
                active === c.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-secondary text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground italic mb-4 animate-fade-in" key={cause.key}>
          {cause.oneLiner}
        </p>

        {/* 4-column algorithm */}
        <div className="grid md:grid-cols-2 gap-3 mb-4 animate-fade-in" key={`grid-${cause.key}`}>
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <div key={col.title} className={`p-3 rounded-md border border-border bg-secondary/30 border-l-4 ${col.tint}`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon className="h-4 w-4 text-foreground" aria-hidden="true" focusable={false} />
                  <p className="text-xs font-bold text-foreground">{col.title}</p>
                </div>
                <ol className="space-y-2">
                  {col.steps.map((s, i) => (
                    <li key={i} className="text-xs text-foreground leading-snug">
                      <div className="flex gap-1.5">
                        <span className="text-muted-foreground shrink-0">{i + 1}.</span>
                        <span>{s.text}</span>
                      </div>
                      {s.trigger && (
                        <div className="mt-1 ml-4 inline-block text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                          Trigger: {s.trigger}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        {/* Pearls */}
        <div className="p-3 rounded-md border border-primary/30 bg-primary/5 animate-fade-in" key={`pearls-${cause.key}`}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Activity className="h-4 w-4 text-primary"  aria-hidden="true" focusable={false}/>
            <p className="text-sm font-semibold text-foreground">Exam / clinical pearls</p>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-foreground">
            {cause.pearls.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>

        <p className="mt-3 text-[10px] text-muted-foreground italic">
          Thresholds drawn from SSC 2021, JBDS DKA 2023, EXTRIP 2015, KDIGO AKI 2012, BICAR-ICU 2018. Confirm against local toxicology / NPIS-TOXBASE.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default HAGMAManagementAlgorithm;

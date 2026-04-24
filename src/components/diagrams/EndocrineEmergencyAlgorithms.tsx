import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Step-by-step emergency treatment algorithms for the four headline endocrine
 * emergencies. Each algorithm is a vertical flow of action nodes (rectangles),
 * decision diamonds, and dose-callout chips, with a tabbed switcher.
 *
 * Sources: JBDS-IP DKA 2023, JBDS-IP HHS 2022, ATA 2016 thyrotoxicosis
 * guidelines / Burch-Wartofsky scale, Endocrine Society 2016 (Bornstein) for
 * adrenal insufficiency.
 */

type NodeKind = "start" | "action" | "decision" | "drug" | "monitor" | "end";

interface AlgoNode {
  id: string;
  kind: NodeKind;
  title: string;
  detail?: ReactNode;
  /** Optional dose chip rendered next to the node. */
  dose?: string;
  /** For decision nodes: yes/no branch labels (rendered on the connector). */
  yesLabel?: string;
  noLabel?: string;
}

interface AlgoDef {
  key: string;
  label: string;
  shortLabel: string;
  accent: string; // tailwind text-color class
  ribbon: string; // tailwind bg class for the header ribbon
  source: string;
  nodes: AlgoNode[];
}

const ALGOS: AlgoDef[] = [
  // ===== DKA =====
  {
    key: "dka",
    label: "Diabetic Ketoacidosis (DKA)",
    shortLabel: "DKA",
    accent: "text-clinical",
    ribbon: "bg-clinical/10 border-clinical/30",
    source: "JBDS-IP 2023",
    nodes: [
      {
        id: "dka-1",
        kind: "start",
        title: "Suspect DKA",
        detail: "Hyperglycaemia + ketones + acidosis. Check capillary glucose, ketones, VBG, U&E, FBC, CRP, ECG, septic screen.",
      },
      {
        id: "dka-2",
        kind: "decision",
        title: "Diagnostic triad met?",
        detail: "Glucose >11 mmol/L (or known DM) AND ketones ≥3 mmol/L (or 2+ on dipstick) AND venous pH <7.30 / HCO₃⁻ <15.",
        yesLabel: "Yes — DKA",
        noLabel: "No — reconsider HHS / sepsis",
      },
      {
        id: "dka-3",
        kind: "drug",
        title: "Hour 0 — Fluid resuscitation",
        detail: "0.9% NaCl 1 L over 1 h (faster if SBP <90 → 500 mL bolus over 15 min, repeat once if needed; senior input if still shocked).",
        dose: "0.9% NaCl 1 L / 1 h",
      },
      {
        id: "dka-4",
        kind: "drug",
        title: "Start fixed-rate insulin (FRIII)",
        detail: "Start as soon as fluid running. Continue patient's long-acting (basal) insulin throughout.",
        dose: "Actrapid 0.1 U/kg/h IV",
      },
      {
        id: "dka-5",
        kind: "decision",
        title: "Check K⁺ on admission",
        detail: "DKA potassium paradox: serum K⁺ often normal/high despite massive total-body deficit. Insulin will drive K⁺ intracellularly fast.",
        yesLabel: "K⁺ 3.5–5.5",
        noLabel: "K⁺ <3.5 or >5.5",
      },
      {
        id: "dka-6a",
        kind: "drug",
        title: "Add KCl to next bag",
        detail: "Standard replacement once K⁺ in safe range.",
        dose: "40 mmol KCl / L",
      },
      {
        id: "dka-6b",
        kind: "action",
        title: "K⁺ outliers — special action",
        detail: "K⁺ <3.5 → halt insulin, give KCl 20 mmol/h via central line, recheck in 1 h. K⁺ >5.5 → no KCl this bag, continue insulin, recheck hourly.",
      },
      {
        id: "dka-7",
        kind: "monitor",
        title: "Hourly: glucose · ketones · K⁺",
        detail: "Targets: ketones falling ≥0.5 mmol/L/h OR HCO₃⁻ rising ≥3 mmol/L/h OR glucose falling ≥3 mmol/L/h. If not met → ↑ FRIII by 1 U/h.",
      },
      {
        id: "dka-8",
        kind: "decision",
        title: "Glucose <14 mmol/L?",
        yesLabel: "Yes",
        noLabel: "No — continue saline",
      },
      {
        id: "dka-9",
        kind: "drug",
        title: "Add 10% dextrose alongside saline",
        detail: "Run both fluids. Keeps insulin running until ketones clear without causing hypoglycaemia.",
        dose: "10% dextrose 125 mL/h",
      },
      {
        id: "dka-10",
        kind: "decision",
        title: "Resolution criteria met?",
        detail: "Ketones <0.6 mmol/L AND venous pH >7.30 AND HCO₃⁻ >18 mmol/L.",
        yesLabel: "Yes",
        noLabel: "No — continue FRIII",
      },
      {
        id: "dka-11",
        kind: "end",
        title: "Switch to subcutaneous insulin",
        detail: "Convert to usual SC regimen with overlap (give SC 30–60 min BEFORE stopping IV). If newly diagnosed → diabetes team for education.",
      },
    ],
  },

  // ===== HHS =====
  {
    key: "hhs",
    label: "Hyperosmolar Hyperglycaemic State (HHS)",
    shortLabel: "HHS",
    accent: "text-pharmacology",
    ribbon: "bg-pharmacology/10 border-pharmacology/30",
    source: "JBDS-IP 2022",
    nodes: [
      {
        id: "hhs-1",
        kind: "start",
        title: "Suspect HHS",
        detail: "Elderly, often undiagnosed T2DM, days of polyuria/dehydration, obtundation. Bloods + osmolality + ECG + septic screen + CT head if obtunded.",
      },
      {
        id: "hhs-2",
        kind: "decision",
        title: "HHS diagnostic criteria?",
        detail: "Glucose >30 mmol/L AND osmolality >320 mOsm/kg AND minimal ketones (<3) AND pH >7.30 / HCO₃⁻ >15.",
        yesLabel: "Yes — HHS",
        noLabel: "No — consider DKA",
      },
      {
        id: "hhs-3",
        kind: "drug",
        title: "Hour 0 — Fluid FIRST (no insulin yet)",
        detail: "0.9% NaCl 1 L over 1 h. Aim 3–6 L positive balance by 12 h, total fluid deficit 100–220 mL/kg replaced over 24–48 h. Fluid alone often drops glucose substantially.",
        dose: "0.9% NaCl 1 L / 1 h",
      },
      {
        id: "hhs-4",
        kind: "monitor",
        title: "Recheck osmolality + Na⁺ at 1 h",
        detail: "Calc osmolality = 2[Na⁺] + glucose + urea. Aim glucose fall ≤5 mmol/L/h AND Na⁺ change ≤10 mmol/L/24 h to avoid cerebral oedema and central pontine myelinolysis.",
      },
      {
        id: "hhs-5",
        kind: "decision",
        title: "Glucose still falling on fluids alone?",
        yesLabel: "Yes — continue fluids only",
        noLabel: "No — ketones rising or glucose plateau",
      },
      {
        id: "hhs-6",
        kind: "drug",
        title: "Now add LOW-rate insulin",
        detail: "Lower than DKA. Only if significant ketonaemia (>1 mmol/L) or glucose not falling on fluids. Do NOT bolus.",
        dose: "FRIII 0.05 U/kg/h IV",
      },
      {
        id: "hhs-7",
        kind: "drug",
        title: "Switch to 0.45% NaCl if Na⁺ rising",
        detail: "If corrected Na⁺ rising despite adequate fluid → switch to 0.45% saline. Beware free water shifts → cerebral oedema.",
      },
      {
        id: "hhs-8",
        kind: "drug",
        title: "VTE prophylaxis — mandatory",
        detail: "HHS has a strikingly high VTE risk (hyperosmolar blood, immobility, sepsis). Give prophylactic LMWH unless absolutely contraindicated. Consider therapeutic anticoagulation in severe cases.",
        dose: "Enoxaparin 40 mg SC od",
      },
      {
        id: "hhs-9",
        kind: "action",
        title: "Treat the precipitant",
        detail: "Sepsis (45% — culture + broad-spectrum), MI/CVA (10–15%), drugs (steroids, thiazides, atypical antipsychotics), new-onset T2DM. Foot exam — high risk of ulceration.",
      },
      {
        id: "hhs-10",
        kind: "decision",
        title: "Resolution criteria met?",
        detail: "Osmolality <300 AND glucose <15 AND clinically improved AND patient eating/drinking.",
        yesLabel: "Yes",
        noLabel: "No — continue protocol",
      },
      {
        id: "hhs-11",
        kind: "end",
        title: "Convert to SC insulin / oral agents",
        detail: "Most HHS patients can be managed long-term on oral agents ± basal insulin. Diabetes team review essential before discharge.",
      },
    ],
  },

  // ===== Thyroid Storm =====
  {
    key: "storm",
    label: "Thyroid Storm",
    shortLabel: "Thyroid storm",
    accent: "text-destructive",
    ribbon: "bg-destructive/10 border-destructive/30",
    source: "ATA 2016 / Burch-Wartofsky",
    nodes: [
      {
        id: "ts-1",
        kind: "start",
        title: "Suspect thyroid storm",
        detail: "Decompensated hyperthyroidism + trigger (sepsis, surgery, DKA, contrast, drug withdrawal). Send TSH/T4/T3, FBC, U&E, LFT, glucose, cortisol, septic screen, ECG.",
      },
      {
        id: "ts-2",
        kind: "decision",
        title: "Burch-Wartofsky Point Scale (BWPS)",
        detail: "Score: temperature (5–30) + CNS effect (0–30) + GI/hepatic (0–20) + tachycardia (5–25) + AF (0–10) + heart failure (0–15) + precipitant (0–10).",
        yesLabel: "BWPS ≥45 — storm",
        noLabel: "25–44 = impending · <25 unlikely",
      },
      {
        id: "ts-3",
        kind: "drug",
        title: "Step 1 — β-blockade",
        detail: "Reduces adrenergic effect AND blocks peripheral T4→T3 conversion. Esmolol infusion if haemodynamically unstable / heart failure (titratable). Use cautiously / avoid in decompensated heart failure.",
        dose: "Propranolol 60–80 mg PO q4h\n· OR esmolol 250–500 mcg/kg load + 50–100 mcg/kg/min",
      },
      {
        id: "ts-4",
        kind: "drug",
        title: "Step 2 — Block synthesis (thionamide)",
        detail: "PTU preferred in storm — also blocks peripheral T4→T3 conversion. Carbimazole alternative if PTU unavailable.",
        dose: "PTU 500–1000 mg PO/NG load,\nthen 250 mg q4h\n(or carbimazole 60–80 mg/day)",
      },
      {
        id: "ts-5",
        kind: "decision",
        title: "≥1 hour after thionamide?",
        detail: "CRITICAL: iodine before thionamide fuels storm (Jod-Basedow). Wait at least 1 h after PTU before giving iodine.",
        yesLabel: "Yes — give iodine",
        noLabel: "No — wait",
      },
      {
        id: "ts-6",
        kind: "drug",
        title: "Step 3 — Block release (iodine)",
        detail: "Wolff-Chaikoff effect: high iodine inhibits release of preformed thyroid hormone.",
        dose: "Lugol's iodine 5 drops PO q6h\n· OR potassium iodide (SSKI) 5 drops q6h\n· OR sodium iodide 0.5–1 g IV q12h",
      },
      {
        id: "ts-7",
        kind: "drug",
        title: "Step 4 — Block conversion (steroid)",
        detail: "Blocks peripheral T4→T3 AND treats relative adrenal insufficiency that frequently coexists.",
        dose: "Hydrocortisone 100 mg IV q8h\n· OR dexamethasone 2 mg IV q6h",
      },
      {
        id: "ts-8",
        kind: "drug",
        title: "Step 5 — Supportive",
        detail: "Active cooling (ice packs, cooling blankets); paracetamol for pyrexia — AVOID aspirin (displaces T4 from TBG → worsens storm). IV fluids (often dehydrated). Treat the precipitant (antibiotics if septic). HDU/ICU.",
        dose: "Paracetamol 1 g IV q6h\n(NOT aspirin)",
      },
      {
        id: "ts-9",
        kind: "decision",
        title: "Refractory after 24–48 h?",
        yesLabel: "Yes — escalate",
        noLabel: "No — continue, taper after 3–7 d",
      },
      {
        id: "ts-10",
        kind: "action",
        title: "Rescue options",
        detail: "Cholestyramine 4 g PO q6h (interrupts enterohepatic circulation of thyroid hormone) · therapeutic plasma exchange · emergency thyroidectomy after biochemical stabilisation.",
      },
      {
        id: "ts-11",
        kind: "end",
        title: "Definitive therapy once stable",
        detail: "Radioactive iodine or thyroidectomy after weeks of biochemical control. Lifelong endocrinology follow-up. Mortality 10–30 % even with optimal treatment.",
      },
    ],
  },

  // ===== Adrenal Crisis =====
  {
    key: "adrenal",
    label: "Adrenal (Addisonian) Crisis",
    shortLabel: "Adrenal crisis",
    accent: "text-icu",
    ribbon: "bg-icu/10 border-icu/30",
    source: "Endocrine Society 2016 (Bornstein)",
    nodes: [
      {
        id: "ac-1",
        kind: "start",
        title: "Suspect adrenal crisis",
        detail: "Refractory shock + classic biochemistry (Na⁺ ↓, K⁺ ↑, glucose ↓) in: known Addison's, chronic steroid use (>5 mg pred for >3 wk), pituitary disease, post-etomidate, bilateral adrenal haemorrhage (Waterhouse-Friderichsen).",
      },
      {
        id: "ac-2",
        kind: "decision",
        title: "Take paired cortisol + ACTH IF possible",
        detail: "Random cortisol <100 nmol/L during severe stress is diagnostic; >500 effectively rules out crisis. Short Synacthen test only when stable — NOT in acute phase.",
        yesLabel: "Sample taken — give steroid NOW",
        noLabel: "Cannot delay — give steroid first",
      },
      {
        id: "ac-3",
        kind: "drug",
        title: "Hydrocortisone — IMMEDIATELY",
        detail: "Do not wait for tests. High-dose hydrocortisone has full mineralocorticoid effect, so fludrocortisone is NOT required acutely.",
        dose: "Hydrocortisone 100 mg IV stat,\nthen 200 mg / 24 h\n(50 mg q6h or infusion)",
      },
      {
        id: "ac-4",
        kind: "drug",
        title: "Aggressive fluid resuscitation",
        detail: "Salt + water deficit; raises BP and corrects hyponatraemia. Recheck Na⁺ frequently — avoid rise >10 mmol/L/24 h (osmotic demyelination).",
        dose: "0.9% NaCl 1 L / 1 h,\nthen 2–4 L / 24 h",
      },
      {
        id: "ac-5",
        kind: "decision",
        title: "Hypoglycaemia (glucose <4)?",
        yesLabel: "Yes",
        noLabel: "No",
      },
      {
        id: "ac-6",
        kind: "drug",
        title: "Glucose replacement",
        detail: "Bolus then infusion until eating. Children: 5 mL/kg of 10%.",
        dose: "100 mL of 10% dextrose IV bolus,\nthen 10% dextrose infusion",
      },
      {
        id: "ac-7",
        kind: "decision",
        title: "Hyperkalaemia (K⁺ >6.0)?",
        yesLabel: "Yes",
        noLabel: "No",
      },
      {
        id: "ac-8",
        kind: "action",
        title: "Treat hyperkalaemia",
        detail: "Standard hyperK protocol: 12-lead ECG; calcium gluconate 10% 10 mL IV if ECG changes; insulin/dextrose only if K⁺ remains >6.5 (steroid + fluid usually correct K⁺ within hours).",
      },
      {
        id: "ac-9",
        kind: "action",
        title: "Identify and treat precipitant",
        detail: "Sepsis (commonest — broad-spectrum antibiotics + cultures), MI, surgery, sudden steroid withdrawal, vomiting/diarrhoea preventing oral steroid absorption, drugs (etomidate, ketoconazole, rifampicin, phenytoin).",
      },
      {
        id: "ac-10",
        kind: "monitor",
        title: "Monitor response (4–6 h)",
        detail: "Expect MAP, glucose and consciousness to improve within 4–6 h of hydrocortisone. If not improving → reconsider diagnosis (sepsis? phaeo? cardiogenic shock?).",
      },
      {
        id: "ac-11",
        kind: "end",
        title: "Step-down therapy",
        detail: "Convert to oral hydrocortisone (20 mg morning + 10 mg lunch + 10 mg evening) once stable + eating. Add fludrocortisone 100 mcg/day when oral hydrocortisone <50 mg/day. Issue steroid emergency card + IM hydrocortisone for sick days. Endocrine follow-up.",
      },
    ],
  },
];

// ============================================================
// Node renderers
// ============================================================

const nodeStyles: Record<NodeKind, { wrapper: string; chip: string; label: string }> = {
  start: {
    wrapper: "border-primary/50 bg-primary/10",
    chip: "bg-primary text-primary-foreground",
    label: "Start",
  },
  action: {
    wrapper: "border-border bg-card",
    chip: "bg-secondary text-secondary-foreground",
    label: "Action",
  },
  decision: {
    wrapper: "border-clinical/40 bg-clinical/5",
    chip: "bg-clinical/15 text-clinical",
    label: "Decision",
  },
  drug: {
    wrapper: "border-pharmacology/50 bg-pharmacology/5",
    chip: "bg-pharmacology/15 text-pharmacology",
    label: "Drug",
  },
  monitor: {
    wrapper: "border-physiology/40 bg-physiology/5",
    chip: "bg-physiology/15 text-physiology",
    label: "Monitor",
  },
  end: {
    wrapper: "border-icu/50 bg-icu/10",
    chip: "bg-icu/20 text-icu",
    label: "Endpoint",
  },
};

const AlgoNodeCard = ({ node, index }: { node: AlgoNode; index: number }) => {
  const s = nodeStyles[node.kind];
  const isDecision = node.kind === "decision";

  return (
    <div className="relative w-full">
      {/* Step number bubble */}
      <div className="absolute -left-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm ring-2 ring-background">
        {index + 1}
      </div>
      <div
        className={cn(
          "rounded-lg border-2 px-3 py-2.5 shadow-sm transition-shadow hover:shadow-md",
          s.wrapper,
          isDecision && "rounded-2xl",
        )}
      >
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-[11px] font-semibold text-foreground leading-tight">
            {node.title}
          </p>
          <span
            className={cn(
              "shrink-0 rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider",
              s.chip,
            )}
          >
            {s.label}
          </span>
        </div>
        {node.detail && (
          <p className="text-[10px] text-muted-foreground leading-snug">
            {node.detail}
          </p>
        )}
        {node.dose && (
          <div className="mt-1.5 rounded border-l-2 border-pharmacology/70 bg-pharmacology/10 px-2 py-1">
            <p className="text-[9px] uppercase tracking-wider font-semibold text-pharmacology">
              Dose
            </p>
            <pre className="text-[10px] font-mono font-bold text-foreground whitespace-pre-wrap leading-snug">
              {node.dose}
            </pre>
          </div>
        )}
        {isDecision && (node.yesLabel || node.noLabel) && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {node.yesLabel && (
              <span className="rounded-full border border-icu/40 bg-icu/10 px-2 py-0.5 text-[9px] font-semibold text-icu">
                ✓ {node.yesLabel}
              </span>
            )}
            {node.noLabel && (
              <span className="rounded-full border border-destructive/40 bg-destructive/10 px-2 py-0.5 text-[9px] font-semibold text-destructive">
                ✗ {node.noLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Connector = () => (
  <div className="flex justify-center py-1" aria-hidden="true">
    <div className="flex flex-col items-center">
      <div className="h-3 w-px bg-border" />
      <div className="h-0 w-0 border-l-4 border-r-4 border-t-[6px] border-l-transparent border-r-transparent border-t-border" />
    </div>
  </div>
);

// ============================================================
// Main component
// ============================================================

const EndocrineEmergencyAlgorithms = () => {
  const [active, setActive] = useState<string>("dka");
  const algo = ALGOS.find((a) => a.key === active)!;

  return (
    <div className="my-6 space-y-3">
      <div className="rounded-xl border border-border bg-muted/20 p-4">
        <div className="mb-3">
          <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground">
            Step-by-step emergency algorithms
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Action · Decision · Drug · Monitor nodes with dosing callouts. Tap a tab to switch emergency.
          </p>
        </div>

        {/* Tabs */}
        <div role="tablist" className="flex flex-wrap gap-1.5 mb-4">
          {ALGOS.map((a) => {
            const isActive = a.key === active;
            return (
              <button
                key={a.key}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActive(a.key)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors",
                  isActive
                    ? cn("border-primary bg-primary text-primary-foreground shadow-sm")
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {a.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Algo header ribbon */}
        <div className={cn("rounded-md border-l-4 px-3 py-2 mb-3", algo.ribbon)}>
          <p className={cn("text-sm font-serif font-semibold", algo.accent)}>
            {algo.label}
          </p>
          <p className="text-[10px] text-muted-foreground italic">
            Source: {algo.source}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 mb-3 text-[9px]">
          {(["start", "action", "decision", "drug", "monitor", "end"] as NodeKind[]).map((k) => (
            <span
              key={k}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-semibold uppercase tracking-wider",
                nodeStyles[k].wrapper,
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", nodeStyles[k].chip)} />
              {nodeStyles[k].label}
            </span>
          ))}
        </div>

        {/* Vertical flow */}
        <ol className="space-y-0 list-none pl-2">
          {algo.nodes.map((node, i) => (
            <li key={node.id}>
              <AlgoNodeCard node={node} index={i} />
              {i < algo.nodes.length - 1 && <Connector />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default EndocrineEmergencyAlgorithms;

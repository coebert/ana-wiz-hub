import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, AlertTriangle, CheckCircle2, Activity, BookOpen, ExternalLink } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Inhalation-injury management flowchart for burns ICU.
 *
 * Five sequential decision nodes the user can step through. Each
 * checklist item carries one or more reference keys; the right-hand
 * side panel lists every cited source with a clickable link, and the
 * checklist items render numeric superscripts that scroll-link to it.
 */

type StepId = 0 | 1 | 2 | 3 | 4;
type Tone = "danger" | "warn" | "ok";

interface Detail {
  text: string;
  refs: string[]; // keys into REFERENCES
}

interface Branch {
  label: string;
  tone: Tone;
  detail: Detail[];
}

const REFERENCES: Record<string, { label: string; url: string }> = {
  bja2017: {
    label: "BJA Education 2017 — Burns: classification, pathophysiology and intensive care",
    url: "https://doi.org/10.1093/bjaed/mkx010",
  },
  bja2019: {
    label: "BJA Education 2019 — Inhalation injury and CO/CN poisoning",
    url: "https://doi.org/10.1016/j.bjae.2019.02.001",
  },
  abls: {
    label: "ABA Advanced Burn Life Support Provider Manual (2018)",
    url: "https://ameriburn.org/education/abls-program/",
  },
  isbi: {
    label: "ISBI Practice Guidelines for Burn Care (2016 / 2018)",
    url: "https://doi.org/10.1016/j.burns.2016.05.013",
  },
  bba: {
    label: "British Burn Association — National Burn Care Referral Pathway 2012 (rev 2020)",
    url: "https://www.britishburnassociation.org/national-burn-care-referral-guidance/",
  },
  endorf: {
    label: "Endorf & Gamelli — Inhalation injury, pulmonary perturbations and fluid resuscitation. JBCR 2007",
    url: "https://doi.org/10.1097/BCR.0B013E318031D049",
  },
  hbo: {
    label: "Weaver — NEJM 2002. Hyperbaric oxygen for acute carbon-monoxide poisoning",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa013121",
  },
  cyanokit: {
    label: "Borron et al. — Hydroxocobalamin for severe acute cyanide poisoning. Ann Emerg Med 2007",
    url: "https://doi.org/10.1016/j.annemergmed.2006.09.013",
  },
  ardsnet: {
    label: "ARDSNet — Low tidal volume ventilation. NEJM 2000",
    url: "https://www.nejm.org/doi/full/10.1056/NEJM200005043421801",
  },
  proseva: {
    label: "PROSEVA — Prone positioning in severe ARDS. NEJM 2013",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1214103",
  },
  eolia: {
    label: "EOLIA — ECMO for severe ARDS. NEJM 2018",
    url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1800385",
  },
  sux: {
    label: "Martyn & Richtsfeld — Succinylcholine-induced hyperkalaemia in burns. Anesthesiology 2006",
    url: "https://doi.org/10.1097/00000542-200601000-00026",
  },
  hep: {
    label: "Miller et al. — Nebulised heparin/NAC in inhalation injury. JBCR 2009",
    url: "https://doi.org/10.1097/BCR.0b013e3181923b21",
  },
  gpics: {
    label: "FICM/ICS GPICS 3e — Guidelines for the Provision of Intensive Care Services",
    url: "https://www.ficm.ac.uk/standardssafetyguidelinesstandards/guidelines-for-the-provision-of-intensive-care-services",
  },
};

const STEPS: { id: StepId; title: string; question: string; yes: Branch; no: Branch }[] = [
  {
    id: 0,
    title: "1. Recognise inhalation injury",
    question: "Any of: enclosed-space fire · facial / oropharyngeal burns · soot in nares or sputum · hoarse voice / stridor · ↓ GCS · COHb > 10 %?",
    yes: {
      label: "Inhalation injury suspected",
      tone: "danger",
      detail: [
        { text: "Apply 100 % O₂ via non-rebreather (treats CO).", refs: ["bja2019", "abls"] },
        { text: "Send ABG with co-oximetry: COHb, MetHb, lactate.", refs: ["bja2019"] },
        { text: "Continuous SpO₂, ETCO₂, cardiac monitoring.", refs: ["abls", "gpics"] },
        { text: "Notify burns centre and prepare for difficult airway.", refs: ["bba"] },
      ],
    },
    no: {
      label: "Low-risk — observe",
      tone: "ok",
      detail: [
        { text: "Reassess hourly for 6–12 h: voice, stridor, sputum, SpO₂.", refs: ["abls"] },
        { text: "Repeat ABG/COHb if any new symptom.", refs: ["bja2019"] },
        { text: "Document baseline airway exam.", refs: ["bja2017"] },
      ],
    },
  },
  {
    id: 1,
    title: "2. Airway decision — early intubation?",
    question: "Stridor / hoarse voice · deep facial burns · soot in pharynx · ↓ GCS · planned long transfer · TBSA > 30 %?",
    yes: {
      label: "Intubate NOW",
      tone: "danger",
      detail: [
        { text: "Senior anaesthetist + difficult-airway trolley + surgeon for front-of-neck.", refs: ["bja2017", "abls"] },
        { text: "Awake fibre-optic if cooperative; otherwise modified RSI with ketamine 1–2 mg/kg + rocuronium 1.2 mg/kg.", refs: ["bja2017"] },
        { text: "Use a large-bore (≥ 8.0 mm internal diameter) UNCUT tube — oedema can swallow a cut tube.", refs: ["abls", "isbi"] },
        { text: "Secure with umbilical tape, NOT adhesive (face oedema makes tape fail).", refs: ["abls"] },
        { text: "Avoid suxamethonium after 24 h post-burn (lethal hyperkalaemia from extra-junctional ACh receptors).", refs: ["sux", "bja2017"] },
      ],
    },
    no: {
      label: "Defer — but reassess every 1 h",
      tone: "warn",
      detail: [
        { text: "Sit up 30°, humidified O₂, nebulised adrenaline / saline.", refs: ["bja2019"] },
        { text: "Keep nil by mouth and consent for intubation.", refs: ["abls"] },
        { text: "Have intubation kit at bedside; threshold lowers rapidly.", refs: ["bja2017"] },
      ],
    },
  },
  {
    id: 2,
    title: "3. Toxin co-management",
    question: "Enclosed-space fire AND any of: persistent acidosis · lactate > 10 · ↓ GCS · COHb > 10 %?",
    yes: {
      label: "Treat CO + suspect cyanide",
      tone: "danger",
      detail: [
        { text: "100 % O₂ until COHb < 5 % (½-life: air 4 h · 100 % O₂ 80 min · HBO 25 min).", refs: ["bja2019", "hbo"] },
        { text: "Hyperbaric O₂ if: COHb > 25 %, LOC, neurology, pregnancy, persistent symptoms after 4–6 h.", refs: ["hbo"] },
        { text: "Hydroxocobalamin 5 g IV over 15 min for suspected cyanide (urine turns red — expected).", refs: ["cyanokit"] },
        { text: "Avoid sodium nitrite if CO co-exposure (worsens O₂ delivery via metHb).", refs: ["bja2019"] },
        { text: "Repeat ABG / lactate every 30 min during resuscitation.", refs: ["abls"] },
      ],
    },
    no: {
      label: "Continue 100 % O₂ taper",
      tone: "ok",
      detail: [
        { text: "Wean FiO₂ to maintain SpO₂ ≥ 94 %.", refs: ["bja2019"] },
        { text: "Re-check COHb on serial ABG.", refs: ["bja2019"] },
      ],
    },
  },
  {
    id: 3,
    title: "4. Bronchoscopy — grade and toilet",
    question: "Intubated and / or any signs of lower-airway involvement?",
    yes: {
      label: "Fibre-optic bronchoscopy within 6 h",
      tone: "warn",
      detail: [
        { text: "Grade 0–4 (Endorf / ABA score): erythema → severe sloughing & casts. Severity correlates with ventilator days and mortality.", refs: ["endorf"] },
        { text: "Therapeutic lavage and removal of mucosal slough / soot / casts.", refs: ["isbi", "endorf"] },
        { text: "Repeat at 24–48 h or for rising airway pressures, atelectasis, hypoxaemia.", refs: ["isbi"] },
        { text: "Consider nebulised heparin 5,000 U + N-acetylcysteine 3 mL of 20 % q4h to reduce cast formation.", refs: ["hep"] },
      ],
    },
    no: {
      label: "No immediate scope",
      tone: "ok",
      detail: [
        { text: "Re-evaluate if extubation fails, secretions worsen, or new infiltrate appears.", refs: ["isbi"] },
      ],
    },
  },
  {
    id: 4,
    title: "5. Ventilator strategy & escalation",
    question: "PaO₂/FiO₂ trajectory and compliance — what next?",
    yes: {
      label: "Lung-protective + targeted escalation",
      tone: "warn",
      detail: [
        { text: "Tidal volume 6 mL/kg PBW, plateau < 30 cmH₂O, driving pressure < 15 cmH₂O.", refs: ["ardsnet"] },
        { text: "PEEP titrated to oxygenation and chest-wall compliance (high in anterior chest eschar — escharotomy may be needed).", refs: ["bja2017", "isbi"] },
        { text: "Permissive hypercapnia accepted; humidify aggressively to clear casts.", refs: ["ardsnet", "bja2019"] },
        { text: "Bronchodilators (salbutamol / ipratropium) and nebulised heparin / NAC.", refs: ["hep"] },
        { text: "Escalate: prone positioning ⟶ NMB ⟶ HFOV / APRV ⟶ inhaled NO ⟶ VV-ECMO if Murray ≥ 3 or P/F < 80.", refs: ["proseva", "eolia"] },
        { text: "Address chest-wall compliance: chest escharotomy if peak pressures rise with circumferential burn.", refs: ["abls", "isbi"] },
      ],
    },
    no: {
      label: "Wean and extubate",
      tone: "ok",
      detail: [
        { text: "Daily SBT once oxygenation, secretions and oedema improve.", refs: ["gpics"] },
        { text: "Cuff-leak test before extubation — high false-negative in burns.", refs: ["bja2017"] },
        { text: "Consider tracheostomy if intubation expected > 10–14 days, or for prolonged dressing changes.", refs: ["gpics"] },
      ],
    },
  },
];

const TONE: Record<Tone, string> = {
  danger: "border-destructive/40 bg-destructive/5",
  warn: "border-orange-500/40 bg-orange-500/5",
  ok: "border-emerald-600/40 bg-emerald-600/5",
};

const TONE_TEXT: Record<Tone, string> = {
  danger: "text-destructive",
  warn: "text-orange-600 dark:text-orange-400",
  ok: "text-emerald-700 dark:text-emerald-400",
};

export const InhalationInjuryFlowchart = () => {
  const [step, setStep] = useState<StepId>(0);
  const [branch, setBranch] = useState<"yes" | "no">("yes");

  const s = STEPS[step];
  const active = branch === "yes" ? s.yes : s.no;

  // Build an ordered list of references cited in the currently visible branch
  const cited = useMemo(() => {
    const seen = new Set<string>();
    const ordered: string[] = [];
    active.detail.forEach((d) => d.refs.forEach((r) => {
      if (!seen.has(r)) { seen.add(r); ordered.push(r); }
    }));
    return ordered;
  }, [active]);

  const refIndex = (key: string) => cited.indexOf(key) + 1;

  return (
    <DiagramFigure
      id="inhalation-injury-flowchart"
      title="Inhalation injury"
      description="Auto-generated wrapper for the Inhalation injury clinical decision flowchart. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
        <figcaption className="mb-3">
          <h3 className="text-base font-semibold text-foreground">
            Airway &amp; inhalation-injury management flowchart
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Step through the five decision nodes. Each checklist item is annotated with clickable references shown in the
            side panel.
          </p>
        </figcaption>
  
        {/* Step rail */}
        <div className="mb-3 flex flex-wrap gap-1">
          {STEPS.map((stp) => (
            <button
              key={stp.id}
              type="button"
              onClick={() => { setStep(stp.id); setBranch("yes"); }}
              className={cn(
                "flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                step === stp.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : step > stp.id
                  ? "border-border bg-muted/60 text-muted-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-muted"
              )}
            >
              {step > stp.id && <CheckCircle2 className="h-3 w-3" />}
              <span>{stp.title}</span>
            </button>
          ))}
        </div>
  
        <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
          {/* Active node */}
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.title}</p>
              <p className="mt-1 text-sm text-foreground leading-relaxed">{s.question}</p>
            </div>
  
            {/* Yes / No branch toggle */}
            <div className="mb-3 grid grid-cols-2 gap-2">
              {(["yes", "no"] as const).map((b) => {
                const node = b === "yes" ? s.yes : s.no;
                const selected = branch === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBranch(b)}
                    className={cn(
                      "rounded-lg border p-3 text-left transition-all",
                      selected ? TONE[node.tone] + " ring-2 ring-primary/30" : "border-border bg-card hover:bg-muted/40"
                    )}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {b === "yes" ? "YES branch" : "NO branch"}
                    </p>
                    <p className={cn("mt-1 text-sm font-semibold", selected ? TONE_TEXT[node.tone] : "text-foreground")}>
                      {b === "yes" ? <AlertTriangle className="inline h-3.5 w-3.5 mr-1" /> : <Activity className="inline h-3.5 w-3.5 mr-1" />}
                      {node.label}
                    </p>
                  </button>
                );
              })}
            </div>
  
            {/* Checklist for active branch with inline citation superscripts */}
            <div className={cn("rounded-md border p-3", TONE[active.tone])}>
              <ul className="space-y-1.5 text-xs text-foreground">
                {active.detail.map((d, i) => (
                  <li key={i} className="flex gap-2">
                    <span className={cn("mt-0.5 inline-block h-1.5 w-1.5 rounded-full shrink-0", TONE_TEXT[active.tone].replace("text-", "bg-"))} />
                    <span className="leading-relaxed">
                      {d.text}
                      {d.refs.map((r) => (
                        <a
                          key={r}
                          href={`#inhal-ref-${r}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(`inhal-ref-${r}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                          }}
                          className="ml-0.5 align-super text-[9px] font-bold text-primary hover:underline"
                          aria-label={`Reference ${refIndex(r)}: ${REFERENCES[r].label}`}
                        >
                          [{refIndex(r)}]
                        </a>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Navigation */}
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => { setStep((step - 1) as StepId); setBranch("yes"); }}
                className={cn(
                  "rounded-md border border-border px-2.5 py-1 text-[11px] font-medium",
                  step === 0 ? "opacity-30" : "hover:bg-muted"
                )}
              >
                ← Previous
              </button>
              <p className="text-[10px] text-muted-foreground">Node {step + 1} of {STEPS.length}</p>
              <button
                type="button"
                disabled={step === STEPS.length - 1}
                onClick={() => { setStep((step + 1) as StepId); setBranch("yes"); }}
                className={cn(
                  "flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-[11px] font-medium",
                  step === STEPS.length - 1 ? "opacity-30" : "hover:bg-muted"
                )}
              >
                Next <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
  
          {/* References side panel */}
          <aside className="rounded-lg border border-border bg-muted/20 p-3" aria-label="Inhalation injury references">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-foreground">
              <BookOpen className="h-3.5 w-3.5 text-primary" /> References
            </p>
            {cited.length === 0 ? (
              <p className="text-[11px] text-muted-foreground">No references on this branch.</p>
            ) : (
              <ol className="space-y-2 text-[11px] leading-snug">
                {cited.map((key, i) => {
                  const r = REFERENCES[key];
                  return (
                        <li key={key} id={`inhal-ref-${key}`} className="flex gap-1.5 scroll-mt-24">
                      <span className="font-bold text-primary shrink-0">[{i + 1}]</span>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground hover:underline inline-flex items-baseline gap-1"
                      >
                        <span>{r.label}</span>
                        <ExternalLink className="h-2.5 w-2.5 shrink-0 opacity-60" />
                      </a>
                    </li>
    );
                })}
              </ol>
            )}
          </aside>
        </div>
  
        {/* Bronchoscopy grading footnote */}
        <div className="mt-3 grid gap-2 text-[11px] md:grid-cols-2">
          <div className="rounded-md border border-border bg-muted/30 p-2.5">
            <p className="font-semibold text-foreground mb-1">Endorf / ABA bronchoscopic grade</p>
            <ul className="space-y-0.5 text-muted-foreground">
              <li><span className="font-mono text-foreground">0</span> — no injury</li>
              <li><span className="font-mono text-foreground">1</span> — mild: erythema, mild oedema, minimal soot</li>
              <li><span className="font-mono text-foreground">2</span> — moderate: erythema, oedema, secretions, no sloughing</li>
              <li><span className="font-mono text-foreground">3</span> — severe: severe oedema, sloughing, bronchorrhoea, casts</li>
              <li><span className="font-mono text-foreground">4</span> — massive sloughing, obstruction, mucosal necrosis</li>
            </ul>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-2.5">
            <p className="font-semibold text-foreground mb-1">Ventilator escalation thresholds</p>
            <ul className="space-y-0.5 text-muted-foreground">
              <li>Plateau &gt; 30 / driving pressure &gt; 15 → reduce Vt, treat chest-wall (escharotomy), prone</li>
              <li>P/F &lt; 150 despite optimisation → prone + NMB</li>
              <li>P/F &lt; 100 with refractory hypoxaemia → iNO trial / consider ECMO referral</li>
              <li>Murray score ≥ 3 or P/F &lt; 80 → VV-ECMO retrieval discussion</li>
            </ul>
          </div>
        </div>
      </figure>
    </DiagramFigure>
  );
};

export default InhalationInjuryFlowchart;

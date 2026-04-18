import { SectionLayout } from "@/components/SectionLayout";
import { StickyTOC } from "@/components/StickyTOC";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { RRTCircuitDiagram } from "@/components/diagrams/RRTCircuitDiagram";
import RRTModalitiesDiagram from "@/components/diagrams/RRTModalitiesDiagram";
import { KDIGOAKIClassifier } from "@/components/diagrams/KDIGOAKIClassifier";
import { MehranScoreCalculator } from "@/components/diagrams/MehranScoreCalculator";
import { akiRrtQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const tocItems = [
  { id: "toc-kdigo", label: "KDIGO Staging" },
  { id: "toc-ci-aki", label: "CI-AKI" },
  { id: "toc-drug-dosing", label: "Drug Dosing" },
  { id: "toc-indications", label: "RRT Indications" },
  { id: "toc-modalities", label: "Modalities" },
  { id: "toc-circuit", label: "Circuit" },
  { id: "toc-anticoagulation", label: "Anticoagulation" },
  { id: "toc-trials", label: "Key Trials" },
];

const AkiRrtTopic = () => {
  return (
    <SectionLayout title="Acute Kidney Injury & RRT" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <StickyTOC items={tocItems} />
      <div className="prose prose-slate max-w-none">
        <section id="toc-kdigo" className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground">KDIGO Definition & Staging</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The <strong>KDIGO 2012</strong> consensus harmonised earlier RIFLE and AKIN definitions. AKI is diagnosed by
            <strong> any</strong> of: a rise in serum creatinine ≥26.5 µmol/L within 48 h, a rise to ≥1.5× baseline known
            or presumed to have occurred within the prior 7 days, or urine output &lt;0.5 ml/kg/hr for ≥6 h. Severity is
            graded 1–3 by the <em>worst</em> of the creatinine or urine-output criteria.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border bg-card mb-6">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground">Stage</th>
                  <th className="text-left p-3 font-semibold text-foreground">Serum creatinine</th>
                  <th className="text-left p-3 font-semibold text-foreground">Urine output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">1</td>
                  <td className="p-3 align-top text-foreground/80">↑ ≥26.5 µmol/L within 48 h, <em>or</em> 1.5–1.9× baseline</td>
                  <td className="p-3 align-top text-foreground/80">&lt;0.5 ml/kg/hr for 6–12 h</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">2</td>
                  <td className="p-3 align-top text-foreground/80">2.0–2.9× baseline</td>
                  <td className="p-3 align-top text-foreground/80">&lt;0.5 ml/kg/hr for ≥12 h</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">3</td>
                  <td className="p-3 align-top text-foreground/80">≥3.0× baseline, <em>or</em> Cr ≥354 µmol/L, <em>or</em> initiation of RRT, <em>or</em> (in &lt;18 y) eGFR &lt;35 ml/min/1.73 m²</td>
                  <td className="p-3 align-top text-foreground/80">&lt;0.3 ml/kg/hr for ≥24 h, <em>or</em> anuria for ≥12 h</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive KDIGO Stage Classifier</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Enter baseline and current creatinine, urine output and duration of oliguria. The classifier returns the
              KDIGO stage with criterion-level explanation, mortality estimate and management priorities.
            </p>
            <KDIGOAKIClassifier />
          </div>
        </section>

        <section id="toc-ci-aki" className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground">Contrast-Induced Acute Kidney Injury (CI-AKI)</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            CI-AKI (also termed contrast-associated AKI, CA-AKI) is defined as a rise in serum creatinine ≥26.5 µmol/L
            or ≥1.5× baseline within 48–72 h of intravascular iodinated contrast, in the absence of an alternative cause.
            Pathogenesis is multifactorial: direct tubular toxicity (osmotic and oxidative injury to PCT cells),
            medullary ischaemia (contrast-induced renal vasoconstriction reduces outer-medullary blood flow), and
            tubular obstruction by Tamm–Horsfall protein casts. Most cases are self-limiting, peaking at day 3–5 and
            resolving within 7–10 days, but ~1% require RRT and CI-AKI is independently associated with increased
            short- and long-term mortality.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            <strong>Risk factors</strong> are conventionally divided into <em>patient-related</em> (CKD — especially
            eGFR &lt;30, diabetic nephropathy, age &gt;75, anaemia, heart failure, hypovolaemia, hypotension, IABP,
            nephrotoxic drugs) and <em>procedure-related</em> (contrast volume, intra-arterial &gt; intravenous route,
            high osmolality, repeated exposures within 72 h). The interaction of pre-existing CKD with diabetes is
            particularly potent (CI-AKI in &gt;25%).
          </p>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-3">Mehran Score</h3>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The Mehran score (Mehran et al., <em>JACC</em> 2004) was derived from 8,357 PCI patients and remains the
            most widely used CI-AKI risk prediction tool. It stratifies patients into four risk bands using eight
            weighted clinical variables.
          </p>
          <div className="bg-card rounded-xl border border-border p-6 mb-6">
            <h4 className="text-base font-serif font-bold text-foreground mb-1">Interactive Mehran Score Calculator</h4>
            <p className="text-sm text-muted-foreground mb-5">
              Tick the relevant risk factors and enter contrast volume and eGFR. Returns total score, risk band, and
              estimated CI-AKI / dialysis incidence with management actions.
            </p>
            <MehranScoreCalculator />
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-3">KDIGO 2012 Recommendations for Prevention</h3>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90">
            <li>
              <strong>Risk-stratify all patients</strong> before elective contrast-enhanced procedures using eGFR
              (CKD-EPI) and clinical risk score (e.g. Mehran). Avoid contrast where a non-contrast alternative
              (ultrasound, non-contrast MRI, V/Q scan) gives comparable diagnostic information.
            </li>
            <li>
              <strong>Iso-osmolar (290 mOsm/kg, e.g. iodixanol)</strong> or <strong>low-osmolar non-ionic</strong>
              contrast (~600–900 mOsm/kg, e.g. iohexol, iopamidol) is preferred over high-osmolar ionic contrast
              (≥1500 mOsm/kg). KDIGO suggests iso-osmolar agents in patients at increased risk; head-to-head trials
              (CARE, ICON, RECOVER) show inconsistent superiority of iodixanol over modern low-osmolar agents — the
              key principle is to <em>avoid high-osmolar</em> contrast and <strong>minimise total volume</strong>.
            </li>
            <li>
              <strong>IV volume expansion with isotonic crystalloid</strong> (KDIGO grade 1A) is the cornerstone of
              prevention. Standard regimen: 0.9% saline 1 ml/kg/hr for 6–12 h pre-procedure and 6–12 h post (total
              ~1–1.5 L). Sodium bicarbonate (1.26%/1.4%) is no longer recommended over saline (PRESERVE 2018: no
              difference). Oral hydration alone is insufficient in high-risk patients.
            </li>
            <li>
              <strong>Withhold nephrotoxins</strong>: NSAIDs, aminoglycosides, amphotericin, calcineurin inhibitors.
              Hold ACEi/ARB and diuretics on the day if euvolaemic and at risk. Stop metformin and SGLT2 inhibitors
              48 h pre-procedure if eGFR &lt;30 (lactic acidosis / euglycaemic DKA risk if AKI develops).
            </li>
            <li>
              <strong>Minimise contrast dose</strong>: aim for contrast volume (mL) &lt; 3 × eGFR. Avoid repeat
              exposure within 48–72 h if possible (cumulative risk).
            </li>
            <li>
              <strong>N-acetylcysteine and prophylactic RRT are NOT recommended</strong>. PRESERVE (2018, n = 5177)
              showed no benefit of NAC over placebo. Prophylactic haemofiltration/dialysis does not improve outcomes
              and exposes patients to procedural risks.
            </li>
            <li>
              <strong>Monitor</strong> serum creatinine at 48–72 h post-contrast in at-risk patients (eGFR &lt;60,
              diabetes, ≥1 Mehran factor). Outpatient follow-up creatinine if eGFR &lt;45.
            </li>
          </ul>

          <div className="rounded-lg bg-muted/40 border border-border p-4 mt-5 text-sm text-foreground/85">
            <p className="font-semibold text-foreground mb-1">Anaesthetic/perioperative pearls</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Maintain MAP ≥65 mmHg throughout — hypotension is the most modifiable peri-procedural risk factor.</li>
              <li>Avoid hyperchloraemic fluids (large-volume 0.9% saline can cause hyperchloraemic acidosis); balanced crystalloid is reasonable but saline retains the strongest evidence base for CI-AKI prophylaxis.</li>
              <li>Gadolinium-based MRI contrast does <em>not</em> cause CI-AKI but, at eGFR &lt;30, group I gadolinium agents risk nephrogenic systemic fibrosis (NSF) — use group II macrocyclic agents (gadobutrol, gadoteridol) at the lowest dose.</li>
              <li>Document risk-benefit discussion when contrast is given in eGFR &lt;30 or established AKI.</li>
            </ul>
          </div>
        </section>

        <section id="toc-drug-dosing" className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground">Perioperative Drug Dosing in Renal Impairment</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Renal impairment alters drug pharmacokinetics in three ways: (1) reduced renal excretion of parent drug or
            active metabolites, (2) altered protein binding (uraemia displaces acidic drugs from albumin), and
            (3) altered volume of distribution (oedema, acidosis). Threshold for dose adjustment is generally
            <strong> eGFR &lt;50–60 ml/min/1.73 m²</strong>; many drugs require avoidance below 30. Use ideal or
            adjusted body weight for hydrophilic drugs. The table below summarises the agents most often encountered
            perioperatively.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border bg-card mb-6">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground">Drug class / agent</th>
                  <th className="text-left p-3 font-semibold text-foreground">Renal handling</th>
                  <th className="text-left p-3 font-semibold text-foreground">Dose adjustment / preferred choice</th>
                  <th className="text-left p-3 font-semibold text-foreground">Key caveats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="bg-muted/20">
                  <td colSpan={4} className="p-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Opioids</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Morphine</td>
                  <td className="p-3 align-top text-foreground/80">Active metabolites M3G (neuroexcitatory) and M6G (analgesic, sedating) accumulate</td>
                  <td className="p-3 align-top text-foreground/80"><strong>Avoid</strong> if eGFR &lt;30. Reduce dose 50–75% if eGFR 30–50.</td>
                  <td className="p-3 align-top text-foreground/80">Prolonged sedation, respiratory depression, myoclonus. Same applies to diamorphine, codeine (→ morphine).</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Oxycodone</td>
                  <td className="p-3 align-top text-foreground/80">Hepatic metabolism; ~10% renal excretion of active drug</td>
                  <td className="p-3 align-top text-foreground/80">Reduce dose 50% if eGFR &lt;30. Cautious titration.</td>
                  <td className="p-3 align-top text-foreground/80">Better tolerated than morphine but still accumulates.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Fentanyl / alfentanil</td>
                  <td className="p-3 align-top text-foreground/80">Hepatic metabolism, inactive metabolites</td>
                  <td className="p-3 align-top text-foreground/80"><strong>Preferred</strong> intraoperative opioids. No dose change for single doses.</td>
                  <td className="p-3 align-top text-foreground/80">Context-sensitive half-time prolonged with infusions; titrate to effect.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Remifentanil</td>
                  <td className="p-3 align-top text-foreground/80">Plasma esterase metabolism — independent of renal/hepatic function</td>
                  <td className="p-3 align-top text-foreground/80"><strong>Drug of choice</strong> for infusions in renal failure.</td>
                  <td className="p-3 align-top text-foreground/80">Plan post-op analgesia (rapid offset).</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Pethidine</td>
                  <td className="p-3 align-top text-foreground/80">Norpethidine (pro-convulsant) accumulates</td>
                  <td className="p-3 align-top text-foreground/80"><strong>Avoid completely</strong></td>
                  <td className="p-3 align-top text-foreground/80">Risk of seizures.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Tramadol</td>
                  <td className="p-3 align-top text-foreground/80">Active metabolite (O-desmethyltramadol) renally excreted</td>
                  <td className="p-3 align-top text-foreground/80">Max 50–100 mg 12-hourly if eGFR &lt;30; avoid &lt;15.</td>
                  <td className="p-3 align-top text-foreground/80">Lowers seizure threshold; serotonergic.</td>
                </tr>

                <tr className="bg-muted/20">
                  <td colSpan={4} className="p-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Neuromuscular blockers & reversal</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Atracurium / cisatracurium</td>
                  <td className="p-3 align-top text-foreground/80">Hofmann elimination (organ-independent) + ester hydrolysis</td>
                  <td className="p-3 align-top text-foreground/80"><strong>Drug of choice</strong> in renal failure. No dose change.</td>
                  <td className="p-3 align-top text-foreground/80">Laudanosine accumulates with prolonged infusions (theoretical CNS effects, rarely clinical).</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Rocuronium / vecuronium</td>
                  <td className="p-3 align-top text-foreground/80">~30% renal excretion (rocuronium); active 3-OH metabolite of vecuronium accumulates</td>
                  <td className="p-3 align-top text-foreground/80">Acceptable single dose. Avoid infusions; use TOF monitoring; expect prolonged action.</td>
                  <td className="p-3 align-top text-foreground/80">Reverse with sugammadex (renally excreted but rocuronium-sugammadex complex still effective; safe in dialysis per recent data).</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Suxamethonium</td>
                  <td className="p-3 align-top text-foreground/80">Plasma cholinesterase; renal handling not relevant</td>
                  <td className="p-3 align-top text-foreground/80">Standard dose. <strong>Avoid if K⁺ &gt;5.5</strong> or pre-existing hyperkalaemia.</td>
                  <td className="p-3 align-top text-foreground/80">Transient ↑K⁺ ~0.5 mmol/L — may precipitate arrhythmia in CKD/dialysis-dependent.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Neostigmine</td>
                  <td className="p-3 align-top text-foreground/80">~50% renal excretion — half-life prolonged</td>
                  <td className="p-3 align-top text-foreground/80">Standard dose; duration matches relaxant prolongation.</td>
                  <td className="p-3 align-top text-foreground/80">Recurarisation unlikely as neostigmine outlasts the relaxant.</td>
                </tr>

                <tr className="bg-muted/20">
                  <td colSpan={4} className="p-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Antibiotics</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Aminoglycosides (gentamicin, amikacin)</td>
                  <td className="p-3 align-top text-foreground/80">Almost entirely renal; nephrotoxic + ototoxic</td>
                  <td className="p-3 align-top text-foreground/80">Extended interval (24–48 h). Use Hartford nomogram or trough levels &lt;1 mg/L. Avoid if alternatives exist.</td>
                  <td className="p-3 align-top text-foreground/80">Cumulative toxicity — limit course to ≤72 h where possible.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Vancomycin</td>
                  <td className="p-3 align-top text-foreground/80">~90% renal; nephrotoxic at high troughs</td>
                  <td className="p-3 align-top text-foreground/80">Loading dose 25–30 mg/kg, then dose by levels. Target trough 15–20 mg/L (or AUC₂₄ 400–600).</td>
                  <td className="p-3 align-top text-foreground/80">Synergistic toxicity with aminoglycosides, piperacillin-tazobactam.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">β-lactams (penicillins, cephalosporins, carbapenems)</td>
                  <td className="p-3 align-top text-foreground/80">Predominantly renal</td>
                  <td className="p-3 align-top text-foreground/80">Reduce dose or extend interval per BNF when eGFR &lt;30. Time-dependent killing — favour extended infusions.</td>
                  <td className="p-3 align-top text-foreground/80">Neurotoxicity (seizures) with cefepime, imipenem in CKD if not adjusted.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Co-amoxiclav, piperacillin-tazobactam</td>
                  <td className="p-3 align-top text-foreground/80">Renal</td>
                  <td className="p-3 align-top text-foreground/80">Extend interval to 8–12 h if eGFR &lt;30.</td>
                  <td className="p-3 align-top text-foreground/80">Pip-taz + vancomycin associated with ↑AKI (controversial).</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Metronidazole, clindamycin, linezolid, ciprofloxacin</td>
                  <td className="p-3 align-top text-foreground/80">Hepatic / mixed</td>
                  <td className="p-3 align-top text-foreground/80">Standard dose (cipro: reduce if eGFR &lt;30).</td>
                  <td className="p-3 align-top text-foreground/80">Generally safe choices.</td>
                </tr>

                <tr className="bg-muted/20">
                  <td colSpan={4} className="p-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Anticoagulants — LMWH & DOACs</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Enoxaparin</td>
                  <td className="p-3 align-top text-foreground/80">Renal clearance — anti-Xa accumulates</td>
                  <td className="p-3 align-top text-foreground/80">Prophylaxis: 20 mg OD if eGFR &lt;30. Treatment: 1 mg/kg OD (not BD); monitor anti-Xa (target 0.5–1.0).</td>
                  <td className="p-3 align-top text-foreground/80">Bleeding risk ↑↑ in dialysis — switch to UFH.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Dalteparin / tinzaparin</td>
                  <td className="p-3 align-top text-foreground/80">Less renal accumulation than enoxaparin</td>
                  <td className="p-3 align-top text-foreground/80">Tinzaparin licensed down to eGFR 20; monitor anti-Xa &lt;30.</td>
                  <td className="p-3 align-top text-foreground/80">Preferred LMWH in moderate CKD.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Unfractionated heparin</td>
                  <td className="p-3 align-top text-foreground/80">Reticulo-endothelial clearance — non-renal</td>
                  <td className="p-3 align-top text-foreground/80"><strong>Preferred</strong> if eGFR &lt;30 or dialysis. Monitor APTT.</td>
                  <td className="p-3 align-top text-foreground/80">Reversible with protamine.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Dabigatran</td>
                  <td className="p-3 align-top text-foreground/80">~80% renal</td>
                  <td className="p-3 align-top text-foreground/80">Avoid if CrCl &lt;30. Reverse with idarucizumab.</td>
                  <td className="p-3 align-top text-foreground/80">Most renally-dependent DOAC.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Rivaroxaban / apixaban / edoxaban</td>
                  <td className="p-3 align-top text-foreground/80">Apixaban ~25%, rivaroxaban ~35%, edoxaban ~50% renal</td>
                  <td className="p-3 align-top text-foreground/80">Apixaban is preferred DOAC in CKD. Dose reduce per SmPC if CrCl 15–30. Avoid all if &lt;15.</td>
                  <td className="p-3 align-top text-foreground/80">Reverse Xa inhibitors with andexanet alfa or 4-factor PCC.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Warfarin</td>
                  <td className="p-3 align-top text-foreground/80">Hepatic</td>
                  <td className="p-3 align-top text-foreground/80">No dose change but ↑sensitivity in CKD; check INR more frequently.</td>
                  <td className="p-3 align-top text-foreground/80">Often preferred over DOACs at very low GFR / dialysis (limited DOAC data).</td>
                </tr>

                <tr className="bg-muted/20">
                  <td colSpan={4} className="p-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Contrast & other perioperative agents</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Iodinated IV contrast</td>
                  <td className="p-3 align-top text-foreground/80">Renal excretion; risk of CI-AKI</td>
                  <td className="p-3 align-top text-foreground/80">Iso- or low-osmolar at lowest possible volume (mL &lt; 3 × eGFR). IV crystalloid pre/post if eGFR &lt;45.</td>
                  <td className="p-3 align-top text-foreground/80">See dedicated CI-AKI section above.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Gadolinium MRI contrast</td>
                  <td className="p-3 align-top text-foreground/80">Renal</td>
                  <td className="p-3 align-top text-foreground/80">Use group II macrocyclic agents (gadobutrol, gadoteridol) at lowest dose; avoid group I if eGFR &lt;30.</td>
                  <td className="p-3 align-top text-foreground/80">Risk of nephrogenic systemic fibrosis (NSF).</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">NSAIDs (diclofenac, ibuprofen, ketorolac)</td>
                  <td className="p-3 align-top text-foreground/80">Block afferent prostaglandin vasodilation → ↓RBF, ↓GFR</td>
                  <td className="p-3 align-top text-foreground/80"><strong>Avoid</strong> in eGFR &lt;60 perioperatively, hypovolaemia, sepsis, on ACEi/ARB + diuretic ("triple whammy").</td>
                  <td className="p-3 align-top text-foreground/80">Significant cause of preventable AKI.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Metformin</td>
                  <td className="p-3 align-top text-foreground/80">Renal — risk of lactic acidosis if AKI</td>
                  <td className="p-3 align-top text-foreground/80">Hold 48 h pre-procedure if eGFR &lt;30 or contrast planned. Restart 48 h post if creatinine stable.</td>
                  <td className="p-3 align-top text-foreground/80">MALA carries high mortality.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">SGLT2 inhibitors (empagliflozin, dapagliflozin)</td>
                  <td className="p-3 align-top text-foreground/80">Modest renal clearance; risk of euglycaemic DKA perioperatively</td>
                  <td className="p-3 align-top text-foreground/80"><strong>Stop ≥3 days pre-op</strong> for major surgery (MHRA/ABCD guidance).</td>
                  <td className="p-3 align-top text-foreground/80">Restart when eating/drinking and eGFR stable.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">ACEi / ARB</td>
                  <td className="p-3 align-top text-foreground/80">Block efferent vasoconstriction → ↓GFR if hypovolaemic</td>
                  <td className="p-3 align-top text-foreground/80">Hold on day of major surgery if hypotension/AKI risk; continue for HF on cardiology advice.</td>
                  <td className="p-3 align-top text-foreground/80">Hyperkalaemia risk; restart when euvolaemic.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Local anaesthetics, propofol, volatiles, ketamine</td>
                  <td className="p-3 align-top text-foreground/80">Hepatic metabolism, inactive metabolites</td>
                  <td className="p-3 align-top text-foreground/80">No dose adjustment required.</td>
                  <td className="p-3 align-top text-foreground/80">Sevoflurane &gt; 2 MAC for prolonged low-flow → Compound A (theoretical, not clinical).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-muted/40 border border-border p-4 text-sm text-foreground/85">
            <p className="font-semibold text-foreground mb-1">Bottom-line perioperative choices in significant CKD (eGFR &lt;30)</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Induction/maintenance:</strong> propofol + fentanyl/alfentanil + cisatracurium (or rocuronium with sugammadex reversal) + sevoflurane.</li>
              <li><strong>Infusion analgesia:</strong> remifentanil. <strong>Post-op:</strong> oxycodone (reduced dose) or fentanyl PCA; avoid morphine.</li>
              <li><strong>Anticoagulation:</strong> UFH preferred over LMWH; warfarin or apixaban if oral needed.</li>
              <li><strong>Avoid:</strong> NSAIDs, morphine, pethidine, gentamicin (where alternative exists), high-osmolar contrast, group I gadolinium agents.</li>
            </ul>
          </div>
        </section>

        <section id="toc-indications" className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground">Indications for RRT in ICU</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            No single absolute trigger — consider the clinical context. Common indications (mnemonic: <strong>AEIOU</strong>):
            refractory <strong>A</strong>cidosis (pH &lt;7.15), <strong>E</strong>lectrolyte disturbance (K⁺ &gt;6.5 or
            rapidly rising), <strong>I</strong>ntoxications (lithium, salicylate, methanol, ethylene glycol, metformin),
            refractory fluid <strong>O</strong>verload, and <strong>U</strong>raemic complications (encephalopathy,
            pericarditis, bleeding).
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { letter: "A", cause: "Acidosis (severe metabolic, pH <7.1)" },
              { letter: "E", cause: "Electrolytes (refractory hyperkalaemia >6.5)" },
              { letter: "I", cause: "Intoxication (dialysable toxins — methanol, ethylene glycol, lithium, salicylates)" },
              { letter: "O", cause: "Overload (fluid overload refractory to diuretics)" },
              { letter: "U", cause: "Uraemia (symptomatic — encephalopathy, pericarditis, bleeding)" },
            ].map((item) => (
              <div key={item.letter} className="flex items-center gap-2 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm">{item.letter}</span>
                <span className="text-sm text-muted-foreground">{item.cause}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="toc-modalities" className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground">RRT Modalities Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Compare the major continuous and intermittent renal replacement modalities side-by-side.
          </p>
          <RRTModalitiesDiagram />
        </section>

        <section id="toc-circuit" className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground">RRT Circuit Comparison</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Compare CRRT and IHD circuits with animated blood and dialysate flow.
          </p>
          <div className="rounded-xl border border-border bg-card p-4">
            <RRTCircuitDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Anticoagulation for CRRT</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Regional Citrate (preferred)</p>
              <p className="text-sm text-muted-foreground mt-1">Citrate chelates calcium in the circuit → anticoagulation. Calcium infused post-filter to restore systemic levels. Avoids systemic bleeding risk. Monitor ionised Ca²⁺ and citrate:Ca²⁺ ratio.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Systemic Heparin</p>
              <p className="text-sm text-muted-foreground mt-1">Unfractionated heparin pre-filter. Target APTT 1.5-2× normal. Higher bleeding risk. Contraindicated in HIT — use argatroban instead.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Epoprostenol (Flolan)</p>
              <p className="text-sm text-muted-foreground mt-1">Prostacyclin (PGI₂) infused pre-filter — inhibits platelet aggregation and provides regional circuit anticoagulation. Short half-life (~6 min) so effect largely confined to the circuit. Useful when citrate is contraindicated (severe liver failure, citrate accumulation) or in HIT. Main side-effect is systemic hypotension at higher doses. Typical dose 2-5 ng/kg/min. Can be combined with low-dose heparin for synergistic effect.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Key Trials</h2>
          <div className="space-y-3">
            {[
              { trial: "KDIGO Guidelines", result: "Effluent dose 20-25 ml/kg/hr for CRRT (higher doses no benefit — ATN & RENAL trials)" },
              { trial: "STARRT-AKI (2020)", result: "Accelerated vs standard timing of RRT initiation — no difference in 90-day mortality. Supports waiting for conventional indications." },
              { trial: "AKIKI (2016)", result: "Early vs delayed RRT — no mortality benefit from early initiation. Delayed strategy avoided RRT in 49% of patients." },
            ].map((t) => (
              <div key={t.trial} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{t.trial}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.result}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <KeyLearningPoints points={[
        "KDIGO stages AKI by creatinine rise (1.5×, 2×, 3× baseline) and urine output (<0.5 ml/kg/hr).",
        "CI-AKI: prevent with iso/low-osmolar contrast, IV isotonic crystalloid (1 ml/kg/hr pre/post), withhold nephrotoxins. NAC and prophylactic RRT not recommended.",
        "Mehran score stratifies CI-AKI risk using 8 weighted factors; high score patients need maximal prophylaxis.",
        "Renal-friendly perioperative drugs: fentanyl/alfentanil/remifentanil, cisatracurium, UFH, apixaban. Avoid morphine, pethidine, NSAIDs, gentamicin where possible.",
        "CRRT preferred in haemodynamically unstable ICU patients; IHD for stable / urgent K⁺.",
        "AEIOU: Acidosis, Electrolytes, Intoxication, Overload, Uraemia — indications for RRT.",
        "Regional citrate anticoagulation is preferred for CRRT — avoids systemic bleeding.",
        "STARRT-AKI / AKIKI: no benefit from early RRT initiation — wait for conventional indications.",
      ]} />

      <QuizSection questions={akiRrtQuestions} />
      <ReferencesList topicId="aki-rrt" />

      <SeeAlso topicId="aki-rrt" />
        <TopicCompletionToggle topicId="aki-rrt" topicTitle="Acute Kidney Injury & RRT" />
    </SectionLayout>
  );
};

export default AkiRrtTopic;

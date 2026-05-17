import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { proceduralSedationQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { CrossReferenceCallout } from "@/components/CrossReferenceCallout";
import { SedationDeliveryProfilesDiagram } from "@/components/diagrams/SedationDeliveryProfilesDiagram";
import { SedationRescueLadder } from "@/components/SedationRescueLadder";
import { SedationDecisionGate } from "@/components/SedationDecisionGate";
import { SedationDischargeChecklist } from "@/components/SedationDischargeChecklist";
import { SedationCaseScenarios } from "@/components/SedationCaseScenarios";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Define sedation and distinguish minimal, moderate, deep sedation and general anaesthesia (ASA continuum)",
  "Select patients suitable for procedural sedation using fasting status, ASA, airway and comorbidity assessment",
  "Choose appropriate drugs and combinations (propofol, midazolam, ketamine, remifentanil, dexmedetomidine, fentanyl) for the procedure and patient",
  "Compare bolus, intermittent, infusion and TCI sedation techniques and their pharmacokinetic rationale",
  "Apply minimum monitoring, environment and recovery standards (AAGBI/RCoA Safe Sedation Practice 2021)",
  "Recognise and manage sedation-related complications: respiratory depression, airway obstruction, over-sedation, paradoxical reactions",
];

const workedExamples: WorkedExample[] = [
  {
    title: "TCI sedation for awake fibreoptic intubation",
    scenario:
      "A 58-year-old man (BMI 34, fixed flexion deformity of the cervical spine) is listed for elective awake fibreoptic intubation. Plan a sedation technique that preserves spontaneous ventilation and airway reflexes.",
    working:
      "Awake fibreoptic intubation requires conscious sedation — the patient must remain rousable, cooperative and maintain airway protective reflexes. Remifentanil TCI (Minto model, effect-site target 1–3 ng/mL) is the technique of choice: rapid onset and offset, context-insensitive half-time independent of duration, antitussive at low doses. Adjunct: small dexmedetomidine load (0.5–1 µg/kg over 10 min) provides anxiolysis and an arousable plane without respiratory depression. Avoid propofol boluses — risk of apnoea and loss of airway in a patient predicted to be difficult to ventilate.",
    answer:
      "Remifentanil TCI (Minto, Ce 1–2 ng/mL, titrate up to 3) ± dexmedetomidine 0.5 µg/kg load then 0.4 µg/kg/h. Topicalise the airway thoroughly (10% lidocaine spray, 4% nebulised, superior laryngeal nerve blocks if needed). Continuous SpO₂, ETCO₂ via nasal cannula, NIBP, ECG, and a trained assistant. Difficult-airway trolley and front-of-neck access ready. Aim for a calm, cooperative, spontaneously breathing patient (Ramsay 2–3, MOAA/S 4–5).",
   cites: ["ASA 2019"],
  },
  {
    title: "Sedation for colonoscopy in an elderly frail patient",
    scenario:
      "A 78-year-old woman (weight 52 kg, eGFR 38, frailty score 5, on apixaban) is booked for diagnostic colonoscopy. Endoscopist requests deep sedation. Discuss your plan.",
    working:
      "Frail elderly patients are exquisitely sensitive to sedatives — reduced cardiac output prolongs arm-brain time, reduced lean mass alters volume of distribution, reduced hepatic/renal clearance prolongs duration. Deep sedation in this group carries airway, aspiration and cardiovascular risk. Discuss with the endoscopist: moderate sedation is usually adequate. Use small incremental boluses, allow time for peak effect (~90 s after IV propofol), avoid synergistic combinations at full dose. Midazolam 0.5 mg + fentanyl 25 µg as a starting point, titrated. Propofol if available with appropriately trained sedationist — 10–20 mg increments, never exceeding the lowest effective dose. Avoid the propofol + midazolam + opioid 'triple cocktail' which is highly synergistic.",
    answer:
      "Reframe to moderate sedation. Pre-oxygenate; left lateral position; supplemental O₂ 2 L/min via cannula with ETCO₂; full monitoring; IV access. Midazolam 0.5–1 mg + fentanyl 25 µg titrated, with low-dose propofol top-ups (10 mg) if needed. Reversal drugs (flumazenil, naloxone) immediately available. Extended recovery period and clear discharge criteria (modified Aldrete or PADSS) before going home with a responsible adult. Apixaban: omit morning dose per BSG guidance for low-risk endoscopy.",
   cites: ["BJA Educ 2021"],
  },
];

const ProceduralSedationTopic = () => {
  return (
    <TopicTemplate
      title="Procedural Sedation"
      subtitle="Sedation continuum, drug techniques, patient selection and safe practice standards"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="procedural-sedation"
      topicTitle="Procedural Sedation"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={proceduralSedationQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["DAS Awake Tracheal Intubation 2020", "BSG Endoscopy Sedation 2023"],
      }}
      keyPoints={[
        { text: "ASA continuum: minimal (anxiolysis) → moderate (conscious) → deep → general anaesthesia. The depth achieved — not the drug used — defines the level", cites: ["AAGBI/RCoA 2021"] },
        { text: "Sedation depth is a continuum; practitioners must be able to rescue from one level deeper than intended (i.e. deep sedationist must be GA-competent)", cites: ["AoMRC 2013"] },
        { text: "Conscious (moderate) sedation: purposeful response to verbal/light tactile stimulus; airway and ventilation maintained; CV function unaffected", cites: ["ASA 2019"] },
        { text: "Minimum monitoring (AAGBI 2021): SpO₂, ETCO₂ (always for moderate/deep), NIBP, ECG, level-of-consciousness scoring (MOAA/S, Ramsay or OAA/S)", cites: ["BJA Educ 2021"] },
        { text: "TCI sedation (propofol Marsh/Schnider, remifentanil Minto) gives stable plasma/effect-site concentrations and rapid titration vs intermittent boluses", cites: ["DAS ATI 2020"] },
        { text: "Synergy: propofol + midazolam + opioid causes profound respiratory depression — use the lowest effective single agent or carefully titrated pairs", cites: ["BSG 2023"] },
        { text: "Ketamine sedation preserves airway tone, ventilation and CV stability — first-line in paediatrics, trauma, low-resource and prehospital settings", cites: ["AAGBI/RCoA 2021"] },
        { text: "Dexmedetomidine produces 'arousable' sedation without respiratory depression — useful for AFOI, MRI, paediatric procedures and ICU bridging", cites: ["AoMRC 2013"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="definitions" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Definitions & the Sedation Continuum</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong>Sedation</strong> is a drug-induced depression of consciousness, ranging from minimal anxiolysis to general anaesthesia.
              The Academy of Medical Royal Colleges and ASA describe a <strong>continuum</strong>: depth depends on the dose, drug combination and individual patient response, not the drug name.
              Practitioners must be trained and equipped to <em>rescue</em> a patient who unintentionally drifts one level deeper than intended.
            </p>
            <div className="space-y-3">
              {[
                {
                  level: "Minimal sedation (anxiolysis)",
                  detail: "Normal response to verbal stimulus. Cognitive function and coordination may be impaired; airway, ventilation and CV function unaffected. Example: oral midazolam premed, 50% N₂O for dental.",
                },
                {
                  level: "Moderate sedation ('conscious sedation')",
                  detail: "Purposeful response to verbal or light tactile stimulus. Patent airway maintained; spontaneous ventilation adequate; CV function usually maintained. Example: midazolam + fentanyl for endoscopy.",
                },
                {
                  level: "Deep sedation",
                  detail: "Purposeful response only to repeated/painful stimulus. Airway intervention may be required; spontaneous ventilation may be inadequate; CV function usually maintained. Example: propofol TCI for cardioversion.",
                },
                {
                  level: "General anaesthesia",
                  detail: "Not rousable, even by painful stimulus. Airway intervention often required; ventilation frequently inadequate; CV function may be impaired.",
                },
              ].map((s) => (
                <div key={s.level} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{s.level}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              <strong>Loss of verbal contact = general anaesthesia</strong>, regardless of intent. A patient receiving propofol who becomes
              unrousable is anaesthetised, even if the procedure was booked as "sedation".
            </p>
          </ExamSection>

          <ExamSection id="patient-selection" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Patient Selection & Pre-Sedation Assessment</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The same standard of preassessment as for general anaesthesia applies. Document an explicit decision that sedation (vs GA vs LA alone) is appropriate.
            </p>
            <SedationDecisionGate />
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>ASA grade</strong>: most procedural sedation is for ASA I–III. ASA IV → consider anaesthetist-delivered sedation or GA in theatre</li>
              <li><strong>Airway</strong>: Mallampati, mouth opening, neck movement, dentition, BMI, beard. Predicted difficult airway → caution with deep sedation off-site</li>
              <li><strong>OSA / obesity</strong>: STOP-BANG ≥5 increases risk of apnoea, desaturation. Consider extended monitoring; avoid heavy synergistic combinations</li>
              <li><strong>Fasting</strong>: standard 6/2 rules apply for elective deep sedation. ASA permits unfasted moderate sedation if benefit outweighs risk (e.g. emergency reduction)</li>
              <li><strong>Comorbidity</strong>: severe COPD, heart failure, cirrhosis, renal failure all alter pharmacokinetics — reduce doses and titrate slowly</li>
              <li><strong>Age</strong>: elderly require ~50% dose reduction; arm-brain time prolonged so wait for peak effect before re-dosing</li>
              <li><strong>Allergy, previous sedation experience, current medication</strong> (especially opioids, benzodiazepines, gabapentinoids — tolerance vs synergy)</li>
              <li><strong>Consent</strong>: explicit discussion of awareness, recall, respiratory depression, and the possibility of conversion to GA</li>
            </ul>

            <div className="mt-5 rounded-lg border border-border bg-secondary/30 p-4">
              <h3 className="font-serif font-bold text-foreground text-base mb-3">
                Pre-procedure & monitoring checklist
              </h3>
              <p className="text-xs text-muted-foreground mb-3 italic">
                Aligned to AAGBI/RCoA Safe Sedation Practice for Healthcare Procedures (2021), AoMRC Safe Sedation Practice (2013) and ASA standards. Tick before starting; document in the record.
              </p>

              {[
                {
                  heading: "1. Patient — selection & preparation",
                  items: [
                    "ASA grade documented; ASA IV/V → escalate to anaesthetist or GA",
                    "Focused airway assessment: Mallampati, mouth opening, neck movement, dentition, BMI, beard",
                    "OSA screen (STOP-BANG) and obesity considered; plan extended monitoring if high risk",
                    "Fasting status confirmed (6 h solids / 2 h clear fluids for elective deep sedation) or risk–benefit documented",
                    "Relevant comorbidities reviewed: cardiac, respiratory, hepatic, renal, neurological",
                    "Allergies, current medications (opioids, benzodiazepines, gabapentinoids, anticoagulants) documented",
                    "Written informed consent including awareness, recall, respiratory depression, conversion to GA",
                    "Responsible adult escort and home supervision arranged for day-case discharge",
                  ],
                },
                {
                  heading: "2. Team & environment",
                  items: [
                    "Sedationist trained and competent for the intended depth; not also performing the procedure (for moderate/deep sedation)",
                    "Trained assistant present whose sole role is patient monitoring",
                    "Immediate access to airway-trained help and a clear escalation pathway",
                    "Tipping trolley, suction (Yankauer, working), and reliable patient positioning",
                    "Resuscitation trolley and defibrillator immediately available; difficult-airway equipment accessible",
                  ],
                },
                {
                  heading: "3. Drugs & equipment ready",
                  items: [
                    "Reliable IV access (≥20 G) secured and patent",
                    "Oxygen source with nasal cannula / facemask and a self-inflating bag-valve-mask",
                    "Sedative and analgesic drugs drawn up, labelled and dose-checked",
                    "Reversal agents drawn up and immediately available: flumazenil (200 µg), naloxone (400 µg)",
                    "Emergency drugs available: ephedrine, phenylephrine, atropine, adrenaline, IV fluids",
                  ],
                },
                {
                  heading: "4. Minimum monitoring (continuous, from before first dose until recovery)",
                  items: [
                    "Pulse oximetry (SpO₂) — continuous, audible tone",
                    "Capnography (ETCO₂) — mandatory for moderate and deep sedation",
                    "Non-invasive blood pressure — at least every 5 min",
                    "Continuous ECG (3- or 5-lead) for moderate/deep sedation, all cardiac/elderly patients",
                    "Level of consciousness scored regularly (MOAA/S, Ramsay or OAA/S)",
                    "Supplemental oxygen titrated to SpO₂; FiO₂ documented",
                    "Temperature for procedures >30 min or in vulnerable patients",
                  ],
                },
                {
                  heading: "5. Recovery & discharge",
                  items: [
                    "Continued monitoring in a designated recovery area until discharge criteria met",
                    "Objective discharge score documented (modified Aldrete or PADSS)",
                    "Verbal and written post-sedation instructions given to patient and escort",
                    "No driving, operating machinery, signing legal documents or alcohol for 24 h",
                    "24-hour contact number provided; clear safety-net advice for complications",
                  ],
                },
              ].map((group) => (
                <div key={group.heading} className="mb-4 last:mb-0">
                  <p className="font-semibold text-foreground text-sm mb-2">{group.heading}</p>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex-shrink-0 inline-block w-4 h-4 rounded border border-primary/40 bg-background"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="techniques" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Techniques: Bolus, Infusion and TCI</h2>
            <SedationDeliveryProfilesDiagram />
            <div className="space-y-3">
              <div id="technique-bolus" className="p-3 rounded-lg border border-border scroll-mt-24">
                <p className="font-semibold text-foreground text-sm">Single bolus / intermittent boluses</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Simplest technique. Drug given as small incremental IV doses; redose when effect wanes. Plasma concentration follows a peak-and-trough sawtooth.
                  <strong> Risks</strong>: peaks cause over-sedation/apnoea; troughs cause patient movement. Best for short procedures (minutes) or as adjunct to LA.
                  Example: midazolam 0.5–1 mg + fentanyl 25–50 µg titrated for endoscopy.
                </p>
              </div>
              <div id="technique-infusion" className="p-3 rounded-lg border border-border scroll-mt-24">
                <p className="font-semibold text-foreground text-sm">Manual infusion</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Fixed-rate infusion (mg/kg/h or µg/kg/min). Smoother than boluses but slow to reach steady state (~5 time constants ≈ 4–5× elimination half-life).
                  Useful for longer procedures where TCI unavailable. Example: propofol 1–3 mg/kg/h + remifentanil 0.05–0.1 µg/kg/min.
                </p>
              </div>
              <div id="technique-tci" className="p-3 rounded-lg border border-border scroll-mt-24">
                <p className="font-semibold text-foreground text-sm">Target-controlled infusion (TCI)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Pump uses a built-in PK model to deliver a variable rate that maintains a chosen <strong>plasma (Cp)</strong> or <strong>effect-site (Ce)</strong> concentration.
                  Allows rapid, predictable titration regardless of duration. Common models:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-0.5">
                  <li><strong>Propofol — Marsh</strong> (weight only) or <strong>Schnider</strong> (age, weight, height, sex, LBM). Sedation Ce typically 0.8–1.5 µg/mL; loss of verbal contact ~2.5–3 µg/mL</li>
                  <li><strong>Propofol — Eleveld</strong> (general-purpose, validated across age/weight extremes; preferred for elderly, obese, paediatric)</li>
                  <li><strong>Remifentanil — Minto</strong> (age, weight, height, sex). Sedation/anxiolysis Ce 1–3 ng/mL; spontaneous breathing usually preserved &lt;3 ng/mL</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-1">
                  Effect-site targeting overshoots Cp briefly to drive Ce up, giving faster onset. Decrement times (time for Ce to fall by a chosen %) drive offset and recovery.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Patient-controlled sedation (PCS)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Patient triggers small boluses (e.g. propofol 0.5 mg/kg, lockout 1 min) within preset limits. High satisfaction in dental, endoscopy and labour analgesia. Inherent safety: an over-sedated patient cannot press the button.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Inhalational</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Nitrous oxide 50%</strong> (Entonox) — analgesia &amp; light sedation for labour, dressings, dental. Self-administered; avoids IV.
                  <strong> Sevoflurane</strong> (low FiSevo) — paediatric procedural sedation in some centres.
                </p>
              </div>
            </div>
            <CrossReferenceCallout
              variant="inline"
              reason="TCI models (Marsh, Schnider, Eleveld, Minto), context-sensitive half-times and the simulator that underpin TCI sedation are explored in detail in the TIVA topic."
              links={[{ topicId: "tiva" }]}
            />
          </ExamSection>

          <ExamSection id="drugs" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Drugs &amp; Combinations</h2>

            <div className="mb-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-xs md:text-sm">
                <caption className="sr-only">Comparison of sedation drugs: typical sedation dose, route, onset, peak effect, duration and common combinations</caption>
                <thead className="bg-secondary/40 text-foreground">
                  <tr className="text-left">
                    <th scope="col" className="p-2 font-semibold">Drug</th>
                    <th scope="col" className="p-2 font-semibold">Routes</th>
                    <th scope="col" className="p-2 font-semibold">Sedation dose</th>
                    <th scope="col" className="p-2 font-semibold">Onset (IV)</th>
                    <th scope="col" className="p-2 font-semibold">Peak effect (IV)</th>
                    <th scope="col" className="p-2 font-semibold">Duration (single dose)</th>
                    <th scope="col" className="p-2 font-semibold">Reversal</th>
                    <th scope="col" className="p-2 font-semibold">Common combinations</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { drug: "Propofol", routes: "IV bolus, infusion, TCI (Marsh/Schnider)", dose: "10–20 mg boluses; infusion 1–3 mg/kg/h; TCI Ce 0.8–1.5 µg/mL", onset: "30 s", peak: "90–120 s (t½keo ~2.6 min)", duration: "5–10 min", reversal: "None", combos: "+ remifentanil (TCI); + ketamine ('ketofol' 1:1)" },
                    { drug: "Midazolam", routes: "IV, IM, intranasal, buccal, PO", dose: "0.5–2 mg IV titrated (max ~0.07 mg/kg)", onset: "2–3 min", peak: "5–7 min", duration: "30–60 min", reversal: "Flumazenil 100–200 µg", combos: "+ fentanyl (endoscopy); + ketamine (blunts emergence)" },
                    { drug: "Ketamine", routes: "IV, IM, intranasal, PO", dose: "0.25–0.5 mg/kg IV; 2–4 mg/kg IM", onset: "30–60 s IV; 3–5 min IM", peak: "1 min IV; 5–20 min IM", duration: "10–15 min IV; 15–30 min IM", reversal: "None", combos: "+ propofol ('ketofol'); + midazolam (paeds, ED)" },
                    { drug: "Fentanyl", routes: "IV, intranasal, transmucosal", dose: "25–50 µg IV titrated", onset: "3–5 min", peak: "3–5 min", duration: "30–60 min", reversal: "Naloxone 40 µg increments", combos: "+ midazolam (endoscopy, dental)" },
                    { drug: "Remifentanil", routes: "IV infusion, TCI (Minto)", dose: "TCI Ce 1–3 ng/mL; infusion 0.05–0.1 µg/kg/min", onset: "1–2 min", peak: "1–2 min (t½keo ~1.2 min)", duration: "3–5 min (CSHT-independent)", reversal: "Naloxone (rarely needed)", combos: "+ propofol TCI; + dexmedetomidine (AFOI)" },
                    { drug: "Dexmedetomidine", routes: "IV infusion (± intranasal off-label)", dose: "Load 1 µg/kg over 10 min, then 0.2–1.4 µg/kg/h", onset: "10–20 min (load)", peak: "~15–30 min after load", duration: "60–120 min after stopping", reversal: "None (atipamezole not licensed)", combos: "+ remifentanil (AFOI, MRI, awake craniotomy)" },
                  ].map((r) => (
                    <tr key={r.drug} className="border-t border-border align-top">
                      <th scope="row" className="p-2 font-semibold text-foreground whitespace-nowrap">{r.drug}</th>
                      <td className="p-2">{r.routes}</td>
                      <td className="p-2">{r.dose}</td>
                      <td className="p-2 whitespace-nowrap">{r.onset}</td>
                      <td className="p-2 whitespace-nowrap">{r.peak}</td>
                      <td className="p-2 whitespace-nowrap">{r.duration}</td>
                      <td className="p-2">{r.reversal}</td>
                      <td className="p-2">{r.combos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mb-4 italic">
              Onset, peak effect and duration assume IV sedation doses in healthy adults; reduce and slow titration in the elderly, frail, hypovolaemic or hepatic/renal impairment. Peak effect = time for effect-site concentration to equilibrate with plasma after a bolus — wait this long before re-dosing to avoid stacking.
            </p>

            <div className="space-y-3">
              {[
                {
                  drug: "Propofol",
                  detail: "Rapid onset (~30 s), short context-sensitive half-time, intrinsic antiemetic. Sedation infusion 1–3 mg/kg/h or TCI Ce 0.8–1.5 µg/mL. Causes dose-dependent respiratory depression, hypotension, pain on injection. No analgesia. Reduce dose 30–50% in elderly; avoid in egg/soya allergy (modern preparations debated).",
                },
                {
                  drug: "Midazolam",
                  detail: "Anxiolysis, amnesia (anterograde), anticonvulsant. Onset 2–3 min IV — wait between doses! Dose 0.5–2 mg titrated. Synergistic respiratory depression with opioids/propofol. Reversible with flumazenil 100–200 µg (caution: shorter t½ than midazolam → re-sedation). Active metabolite α-OH-midazolam accumulates in renal failure.",
                },
                {
                  drug: "Ketamine",
                  detail: "NMDA antagonist; 'dissociative' sedation with preserved airway reflexes, spontaneous ventilation and CV stability (sympathomimetic). Sedation 0.25–0.5 mg/kg IV or 2–4 mg/kg IM. Side effects: emergence phenomena (co-administer midazolam), hypersalivation (consider glycopyrrolate), tachycardia, ↑ICP/IOP. First-line in paediatrics, trauma, prehospital and burns dressings.",
                },
                {
                  drug: "Fentanyl",
                  detail: "Synthetic opioid; rapid onset (3–5 min), duration ~30 min for sedation doses (25–50 µg). Provides analgesia + mild sedation. Synergistic respiratory depression with propofol/benzodiazepines. Reversible with naloxone (40 µg increments).",
                },
                {
                  drug: "Remifentanil",
                  detail: "Ultra-short-acting opioid metabolised by plasma esterases. Context-insensitive half-time ~3 min regardless of infusion duration — ideal for TCI sedation (Minto Ce 1–3 ng/mL). Profound respiratory depression and bradycardia possible; chest wall rigidity with rapid bolus. Antitussive — useful for AFOI.",
                },
                {
                  drug: "Dexmedetomidine",
                  detail: "Highly selective α₂-agonist. Produces 'cooperative' sedation (patient rousable to verbal command), analgesia, anxiolysis without significant respiratory depression. Load 1 µg/kg over 10 min, infusion 0.2–1.4 µg/kg/h. Side effects: bradycardia, biphasic BP (initial ↑ from peripheral α₂B then ↓ from central α₂A), dry mouth. Slow onset limits suitability for short procedures.",
                },
              ].map((d) => (
                <div key={d.drug} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{d.drug}</p>
                  <p className="text-sm text-muted-foreground mt-1">{d.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Common combinations</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-0.5">
                <li><strong>Midazolam + fentanyl</strong> — classic endoscopy combination. Easy to titrate; reversible. Synergy mandates small doses.</li>
                <li><strong>Propofol + remifentanil (TCI)</strong> — gold standard for cardioversion, ERCP, AFOI, interventional radiology. Predictable, rapidly titratable.</li>
                <li><strong>Propofol + ketamine ('ketofol', 1:1 by mg)</strong> — opposing CV/respiratory effects offset; useful in haemodynamically unstable patients (e.g. hip relocation in ED).</li>
                <li><strong>Dexmedetomidine + low-dose remifentanil</strong> — AFOI, MRI in poorly-cooperative adults, awake craniotomy.</li>
                <li><strong>Avoid</strong>: propofol + midazolam + opioid 'triple cocktail' at full doses — markedly synergistic respiratory depression and CV collapse.</li>
              </ul>
            </div>
            <CrossReferenceCallout
              variant="inline"
              reason="Pharmacokinetics, pharmacodynamics and side-effect profiles of propofol, ketamine, midazolam and etomidate are covered in depth in the IV Anaesthetics topic."
              links={[{ topicId: "iv-anaesthetics" }]}
            />
          </ExamSection>

          <ExamSection id="example-procedures" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Example Procedures Requiring Sedation</h2>
            <SedationCaseScenarios />
            <h3 className="font-serif font-bold text-foreground text-base mt-6 mb-2">
              Quick reference — other common procedures
            </h3>
            <div className="space-y-3">
              {[
                { proc: "Gastrointestinal endoscopy (OGD, colonoscopy, ERCP)", detail: "Moderate sedation: midazolam + fentanyl or propofol bolus/TCI. ERCP often deep sedation/GA — prone, prolonged, CO₂ insufflation, retained secretions." },
                { proc: "Cardioversion (DC for AF/flutter)", detail: "Brief deep sedation: propofol 1 mg/kg bolus or TCI Ce 2–3 µg/mL. Pre-oxygenate, anticipate brief apnoea. Anaesthetist required." },
                { proc: "Awake fibreoptic intubation (AFOI)", detail: "Conscious sedation preserving cooperation and airway reflexes. Remifentanil TCI ± dexmedetomidine. See DAS 2020 ATI guidelines." },
                { proc: "Interventional radiology / cardiology", detail: "TIPSS, EVAR, complex angiography, structural heart procedures. Often remote site — full anaesthetic standards required (AAGBI 2023)." },
                { proc: "MRI / CT in adults &amp; children", detail: "Long procedures requiring stillness. Dexmedetomidine ± propofol TCI in adults; sevoflurane or propofol GA often needed in children." },
                { proc: "Dental procedures", detail: "Inhalational N₂O/O₂ for adults &amp; children, midazolam for needle-phobic adults; PCS propofol increasingly used." },
                { proc: "Bone/joint reduction in ED (Colles, shoulder, hip)", detail: "Brief deep sedation: propofol ± fentanyl, or ketofol for haemodynamic instability/multi-trauma. Strict fasting often impossible — accept risk." },
                { proc: "Burns dressings", detail: "Ketamine sedation — preserves ventilation, provides analgesia. Often repeated procedures: consider PTSD risk, multimodal analgesia." },
                { proc: "Bronchoscopy / EBUS", detail: "Topical airway anaesthesia + remifentanil TCI ± propofol. Antitussive properties of remifentanil invaluable." },
                { proc: "Regional anaesthesia adjunct", detail: "Light sedation to improve patient comfort during block performance and surgery — midazolam 1 mg + fentanyl 25 µg, or low-dose propofol TCI." },
              ].map((p) => (
                <div key={p.proc} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{p.proc}</p>
                  <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="safe-practice" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Safe Sedation Practice (AAGBI/RCoA 2021)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Sedation outside theatres carries higher complication rates than GA in theatre — primarily from inadequate monitoring, lack of trained assistance and inability to rescue the airway.
              The AoMRC (2013) and joint AAGBI/RCoA standards mandate the same standard of care wherever sedation is delivered.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Personnel</strong>: a trained sedationist whose sole responsibility is the patient (cannot also perform the procedure for moderate/deep sedation), plus a trained assistant</li>
              <li><strong>Training</strong>: practitioners must be competent to rescue a patient who reaches one level deeper than intended → deep sedationist must be GA-competent (anaesthetist or appropriately trained)</li>
              <li><strong>Environment</strong>: oxygen, suction, IV access, full resuscitation equipment, defibrillator, reversal agents (flumazenil, naloxone) immediately available</li>
              <li><strong>Monitoring</strong>: SpO₂, ETCO₂ (mandatory for moderate/deep), NIBP, ECG, level of consciousness assessed and documented at intervals</li>
              <li><strong>Pre-procedure</strong>: WHO checklist, allergies, consent for sedation explicitly recorded, fasting status</li>
              <li><strong>Recovery</strong>: same standards as post-GA — recovery area with trained staff, monitoring continued until discharge criteria met (modified Aldrete or PADSS)</li>
              <li><strong>Discharge</strong>: stable observations, full orientation, oral fluids tolerated, pain controlled, responsible adult escort, written instructions</li>
            </ul>
          </ExamSection>

          <ExamSection id="discharge" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Discharge Criteria</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Discharge after sedation is a clinical decision, not a clock-based one. Apply a structured score (modified Aldrete to leave first-stage recovery, PADSS to leave the day-unit), check observation timing, and screen for red-flag symptoms before allowing the patient home with their escort.
            </p>
            <SedationDischargeChecklist />
          </ExamSection>

          <ExamSection id="complications" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Complications &amp; Rescue</h2>
            <SedationRescueLadder />
            <h3 className="font-serif font-bold text-foreground text-base mt-6 mb-2">
              Other complications to recognise
            </h3>
            <div className="space-y-3">
              {[
                { c: "Respiratory depression / apnoea", d: "Most common serious event. Stop sedative, jaw thrust, supplemental O₂, assist ventilation with bag-mask. Reverse benzodiazepines (flumazenil 100–200 µg) and opioids (naloxone 40 µg increments) — beware re-sedation." },
                { c: "Airway obstruction", d: "Often positional in deep sedation (especially obese, OSA). Chin lift, jaw thrust, airway adjunct (oropharyngeal/nasopharyngeal), reposition. Convert to GA with LMA/ETT if persistent." },
                { c: "Aspiration", d: "Risk in unfasted patients, GORD, pregnancy, bowel obstruction. Suction, lateral position, escalate to GA with ETT if airway protection needed. Consider ICU/respiratory support." },
                { c: "Hypotension", d: "Propofol effect (vasodilation + reduced sympathetic tone). Reduce infusion, fluid bolus, vasopressor (metaraminol/phenylephrine). Worse in elderly, hypovolaemia, β-blockade." },
                { c: "Bradycardia", d: "Vagal reflex (endoscopy, eye surgery), opioid effect, dexmedetomidine. Stop stimulus, atropine 300–600 µg if symptomatic." },
                { c: "Over-sedation / loss of verbal contact", d: "By definition this is general anaesthesia. Manage as GA: airway, ventilation, monitor depth, plan recovery." },
                { c: "Paradoxical reaction (benzodiazepines)", d: "Disinhibition, agitation — more common in elderly, children, alcohol misuse. Reverse with flumazenil; consider alternative agent." },
                { c: "Awareness / recall", d: "Document explicitly during consent — moderate sedation is NOT amnesia. Add midazolam if amnesia desired and clinically appropriate." },
                { c: "Allergy / anaphylaxis", d: "Manage per AAGBI guidelines. Common triggers: chlorhexidine, latex, antibiotics, NMBs (less likely in sedation)." },
              ].map((x) => (
                <div key={x.c} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.c}</p>
                  <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>
            <CrossReferenceCallout
              variant="panel"
              reason="For continuous sedation of intubated critically ill patients (RASS-targeted infusions, PRIS, CAM-ICU, ABCDEF bundle), see the dedicated ICU Sedation & Delirium topic — the principles, drugs and risk profile differ substantially from short-procedure sedation."
              links={[{ topicId: "icu-sedation-delirium" }]}
            />
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Sedation is a continuum — be trained and equipped to manage one level deeper than intended.",
              "Use a structured pre-assessment (ASA, airway, fasting, comorbidities) and continuous monitoring including capnography.",
              "Drug combinations (opioid + benzodiazepine) cause synergistic respiratory depression — reduce each dose.",
              "Have reversal agents (naloxone, flumazenil) immediately available — but never relied upon as a substitute for titration.",
              "Discharge only after return to baseline conscious level, stable observations, oral intake tolerated and responsible adult escort.",
            ]}
          />
        </>
      }
    />
  );
};

export default ProceduralSedationTopic;

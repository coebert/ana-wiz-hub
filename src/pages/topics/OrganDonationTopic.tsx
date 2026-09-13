import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { organDonationQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { DiagramSection } from "@/components/topic/DiagramSection";
import { BrainstemDeathCascadeDiagram } from "@/components/diagrams/intensive-care/BrainstemDeathCascadeDiagram";
import { OrganDonationPathwayDiagram } from "@/components/diagrams/intensive-care/OrganDonationPathwayDiagram";
import { InlineRef } from "@/components/references/InlineRef";

const organDonationFaqs: Array<[string, string]> = [
  ["What are the UK criteria for brainstem death testing?", "Coma of known irreversible cause, exclusion of confounders (drugs, hypothermia <34 °C, metabolic/endocrine disturbance), absent brainstem reflexes (pupillary, corneal, oculocephalic, oculovestibular, gag, cough) and apnoea test with PaCO₂ rise >0.5 kPa above 6.0 kPa with pH <7.40 (AoMRC 2008)."],
  ["What physiological derangements occur after brainstem death?", "Catecholamine storm followed by vasodilation, diabetes insipidus (DDAVP/vasopressin), hypothermia, coagulopathy and pituitary failure; manage with the 'rule of 100s' — SBP >100, urine output ~100 mL/h, PaO₂ >100, Hb >100 g/L."],
  ["How does DCD differ from DBD for donation?", "DCD (Maastricht III) occurs after planned withdrawal with death by circulatory criteria and a 5-minute 'no-touch' period; warm ischaemic time limits organ viability (typically <30 min for liver, <2 h for kidney) and outcomes are slightly inferior for some grafts but improve donor numbers."],
];

const objectives = [
  "Distinguish DBD and DCD pathways and the legal time of death for each.",
  "Perform UK brainstem death testing — prerequisites, six reflexes, and the apnoea test (PaCO₂ >6.65 kPa with rise >0.5 kPa).",
  "Identify confounders that may render BSD testing unreliable and select appropriate ancillary investigations.",
  "Optimise the brainstem-dead donor across cardiovascular, respiratory, endocrine, and metabolic domains.",
  "Discuss the ethical framework for normothermic regional perfusion (NRP) — permanence vs irreversibility, dead donor rule, cerebral exclusion.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Apnoea test — getting the numbers right",
    scenario: (
      <>
        You are about to perform the apnoea component of brainstem death testing. Baseline ABG on
        SIMV: PaO₂ 32 kPa, PaCO₂ 4.8 kPa. How do you proceed and what targets confirm an absent
        respiratory drive?
      </>
    ),
    working: (
      <>
        Pre-oxygenate with FiO₂ 1.0 for ≥10 min and adjust ventilation to bring baseline PaCO₂ to
        ~5.0 kPa (40 mmHg). Disconnect from the ventilator and deliver 6 L/min O₂ via a tracheal
        catheter to prevent hypoxaemia. Observe for chest/abdominal movement for 5 min (longer if
        target PaCO₂ not yet reached). The test is positive (i.e. confirms apnoea) when PaCO₂
        rises to <strong>&gt;6.65 kPa (50 mmHg)</strong> AND has risen by <strong>&gt;0.5 kPa</strong>{" "}
        from baseline with no respiratory effort.
      </>
    ),
    answer: (
      <>
        Reconnect to the ventilator immediately after the test. The legal time of death is recorded
        as the completion of the <strong>first</strong> set of tests (not the second). Spinal
        reflexes can persist after BSD and do not invalidate the diagnosis.
      </>
    ),
    cites: ["BJA Educ 2016", "AoMRC 2008"],
  },
  {
    title: "DCD III — withdrawal-to-retrieval timing",
    scenario: (
      <>
        A patient with catastrophic brain injury but who does not fulfil BSD criteria is to undergo
        WLST as Maastricht III DCD donation. SBP drops to 45 mmHg at 12 min after extubation;
        cardiac arrest at 28 min. What are the time markers and the implications?
      </>
    ),
    working: (
      <>
        <strong>Functional warm ischaemia time (fWIT)</strong> begins when SBP &lt; 50 mmHg. After
        cardiac arrest there is a mandatory <strong>5-minute hands-off observation</strong>;
        legal time of death = <strong>start of the 5-minute observation period</strong> (the moment
        the clinician begins observing the absent circulation, not the end of the standoff). Cold
        perfusion should start within ~10 min of
        death; the standdown threshold (after which donation does not proceed) is typically 2–3 h
        from withdrawal — beyond this WIT is too prolonged for viable retrieval.
      </>
    ),
    answer: (
      <>
        fWIT starts at 12 min, death confirmed 33 min after extubation, target cold perfusion by
        ~43 min. Total fWIT for liver should be &lt;20 min, kidneys &lt;30 min — so this is borderline
        for liver. Discuss with retrieval team; abdominal NRP can salvage borderline organs by
        restoring oxygenated perfusion in situ.
      </>
    ),
    cites: ["NICE CG135"],
  },
];

const OrganDonationTopic = () => {
  return (
    <TopicTemplate
      title="Organ Donation"
      subtitle="FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "DCD now accounts for ~60% of deceased organ donations in the UK — Category III (controlled) is most common", cites: ["AoMRC 2008"] },
        { text: "Maastricht classification: 5 categories — only Category III (awaiting cardiac arrest after WLST) is routinely used in UK", cites: ["BJA Educ 2016"] },
        { text: "5-minute mandatory standoff after circulatory arrest before death can be confirmed", cites: ["NICE CG135"] },
        { text: "Functional warm ischaemia time starts when SBP < 50 mmHg — target < 30 min for kidneys, < 20 min for liver", cites: ["AoMRC 2008"] },
        { text: "Abdominal NRP: femoral cannulation + ECMO circuit with arch vessel exclusion — no cerebral reperfusion", cites: ["BJA Educ 2016"] },
        { text: "TA-NRP enables DCD heart transplantation — outcomes approaching DBD levels at 1 year", cites: ["NICE CG135"] },
        { text: "NRP reduces DCD liver discard and ischaemic cholangiopathy; reduces kidney DGF from ~50% to ~20%", cites: ["AoMRC 2008"] },
        { text: "Ethical framework: permanence vs irreversibility, dead donor rule, cerebral exclusion as safeguard", cites: ["BJA Educ 2016"] },
        { text: "AoMRC (2021) endorses NRP as ethically acceptable provided arch vessels are excluded before perfusion", cites: ["NICE CG135"] },
        { text: "Legal time of death: BSD = completion of first set of tests; DCD = the time the 5-minute observation period starts (not its end) — NRP does not reverse death", cites: ["AoMRC 2008", "AoMRC DNC Code of Practice (PDF)"] },
      ]}
      topicId="organ-donation"
      topicTitle="Organ Donation"
      quizQuestions={organDonationQuestions}
      sectionSources={{
        objectives: ["AoMRC 2008", "NICE CG135", "BJA Educ 2016"],
        workedExamples: ["AoMRC 2008", "BJA Educ 2016", "NICE CG135"],
        keyPoints: ["AoMRC 2008", "NICE CG135", "BJA Educ 2016"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 5.5", "EDIC 7.1"] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection id="types" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Types of Organ Donation" defaultOpen>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">DBD</p>
                <p className="text-sm text-muted-foreground mt-1">Brainstem death confirmed by 2 sets of tests. Time of death = completion of first set. Better graft outcomes (less warm ischaemia). ~40% of UK deceased donors.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">DCD</p>
                <p className="text-sm text-muted-foreground mt-1">WLST → circulatory arrest → 5-min standoff → death confirmed → retrieval. Now ~60% of UK donations. Maastricht Cat III most common.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="legal" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Legal & Ethical Framework (UK)">
            <div className="space-y-2">
              {[
                { point: "Deemed Consent (2020)", detail: "England, Scotland, Wales: opt-out unless excluded or opted out." },
                { point: "SN-OD", detail: "Specialist Nurse for Organ Donation must be involved in all potential donation conversations. Collaborative requesting improves consent." },
                { point: "Excluded groups", detail: "Children <18, never-capacitous adults, temporary residents (<12 months), opted-out individuals." },
                { point: "Coroner / Procurator Fiscal", detail: "Must be consulted in reportable deaths. Can refuse but cannot consent." },
              ].map((p) => (
                <div key={p.point} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{p.point}</p>
                  <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Coroner (England &amp; Wales) / Procurator Fiscal (Scotland)</h3>
            <p className="text-sm text-muted-foreground">
              Approval is required in any reportable death — unnatural death, death in custody, or an industrial accident. The coroner/procurator fiscal may object and prevent donation where retrieval would compromise forensic evidence, but they cannot themselves consent to donation on behalf of the deceased or their family. The SN-OD normally liaises directly with the coroner's office to obtain approval; outright objections are rare <InlineRef topicId="organ-donation" refLabel="ACCM End-of-Life 2008" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="bsd-testing" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Brainstem Death Testing">
            <p className="text-muted-foreground leading-relaxed mb-3">
              UK definition (AoMRC 2008): irreversible loss of capacity for consciousness combined with irreversible loss of capacity to breathe. Two sets of tests by two senior doctors (one a consultant), both registered &gt;5 years, neither part of the transplant team.
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Prerequisites</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li><strong>Known aetiology</strong> sufficient to explain the picture (massive ICH, severe TBI, hypoxic injury post-arrest).</li>
              <li><strong>Exclude reversible causes</strong>: core temp ≥34°C; no residual sedation/paralysis; no severe metabolic/endocrine derangement; no unresuscitated shock.</li>
              <li><strong>Apnoea pre-condition</strong>: ventilated for inadequate spontaneous respiration.</li>
            </ol>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Six brainstem reflexes (bilateral)</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li><strong>Pupillary</strong> (CN II, III) — fixed, unreactive.</li>
              <li><strong>Corneal</strong> (CN V, VII) — no blink. Avoid corneal damage.</li>
              <li><strong>Vestibulo-ocular</strong> (CN III, VI, VIII) — clear EAC, 50 mL ice-cold water each ear, observe 1 min — no eye movement.</li>
              <li><strong>Motor in CN distribution</strong> (CN V, VII) — central painful stimulus → no facial response. Spinal reflexes may persist (do NOT preclude BSD).</li>
              <li><strong>Gag</strong> (CN IX, X) — no response to spatula/suction.</li>
              <li><strong>Cough</strong> (CN X) — no response to deep tracheal suction.</li>
            </ol>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Apnoea test</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Pre-oxygenate with 100% O₂ ≥10 min, set baseline PaCO₂ ~5.0 kPa, disconnect with tracheal O₂ insufflation 6 L/min, observe 5 min for any respiratory effort. Confirm <strong>PaCO₂ &gt;6.65 kPa AND rise &gt;0.5 kPa</strong> from baseline. Reconnect immediately.
            </p>
            <div className="p-3 rounded-lg bg-secondary/50 border border-primary/20">
              <p className="text-sm font-semibold text-foreground mb-1">Time of death</p>
              <p className="text-sm text-muted-foreground">Legal time of death = completion of the <strong>first</strong> set of tests. There is no mandatory interval before the second set.<InlineRef topicId="organ-donation" refLabel="AoMRC 2008" /><InlineRef topicId="organ-donation" refLabel="AoMRC DNC Code of Practice (PDF)" /></p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="bsd-redflags" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Red Flags & Ancillary Tests">
            <p className="text-muted-foreground text-sm mb-3">Confounders that may render testing unreliable: residual sedation (esp. thiopentone, opioids in renal/hepatic failure), residual paralysis, hypothermia (&lt;34°C), severe metabolic derangement, high cervical injury, GBS / locked-in, cranial nerve injury, pre-existing pupil abnormalities, isolated posterior fossa pathology, neonates &lt;2 months.</p>
            <p className="text-muted-foreground text-sm mb-3">
              <strong>When are ancillary tests indicated?</strong> Only when the clinical determination cannot be completed or is unreliable — an unexaminable cranial nerve or limb (severe facial/ocular trauma, high cervical cord injury), an apnoea test that cannot be safely performed or must be abandoned (refractory hypoxaemia, haemodynamic instability, ECMO, pre-existing CO₂ retention), or a confounder that cannot be reversed or excluded within a reasonable time. Ancillary tests do not replace clinical testing and are never used to overrule it; they establish the <strong>absence of intracranial blood flow</strong> <InlineRef topicId="organ-donation" refLabel="CJA Death Determination 2023" />.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground mb-3">
              <li><strong>CT angiography</strong> — the pragmatic first-line test in most UK and European centres. Principle: intracranial pressure exceeding arterial pressure abolishes cerebral perfusion, so intracranial vessels fail to opacify. A <strong>4-point scoring system</strong> is applied 60 s after contrast: absent opacification of the cortical segments of both middle cerebral arteries (M4) and both internal cerebral veins scores 4/4 and confirms circulatory arrest, with the superficial temporal arteries used as an internal control for adequate contrast delivery. False positives (apparent flow) occur with decompressive craniectomy or an open fontanelle, where ICP cannot rise sufficiently.</li>
              <li><strong>Four-vessel catheter angiography</strong> — the historical international gold standard, demonstrating no filling at the level of the carotid bifurcation and circle of Willis. Now largely superseded because it is invasive, requires transfer to the angiography suite and a large contrast load, and offers no diagnostic advantage over CTA.</li>
              <li><strong>Radionuclide perfusion imaging / SPECT</strong> — technetium-99m HMPAO scintigraphy showing the "empty skull" sign (absent cerebral uptake with preserved scalp activity). Unaffected by sedative drugs and metabolic derangement, and can be performed portably, which makes it useful where drug confounding cannot be excluded; availability out of hours is the limitation.</li>
              <li><strong>EEG and somatosensory evoked potentials</strong> — tests of <em>function</em>, not flow, and therefore limited: EEG is suppressed by sedatives, hypothermia and metabolic derangement (exactly the confounders prompting the test), records only cortical activity and not the brainstem, and is vulnerable to ICU electrical artefact. SSEPs share the drug-independence advantage but are operator-dependent and unreliable after cervical cord injury. Neither is recommended as a stand-alone confirmatory test in the UK.</li>
              <li><strong>Transcranial Doppler</strong> — may show systolic spikes with reverberating or absent diastolic flow, but is operator-dependent with a 5–10% failure to obtain an acoustic window, so is best used as supportive rather than confirmatory evidence.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <DiagramSection
            id="bsd-cascade"
            title="Brainstem Death Cascade & Donor Optimisation"
            intro="After coning the donor passes through three predictable physiological phases. Recognising the current phase guides the right intervention — short-acting vasodilators during the storm, vasopressin-led support during vasoplegia, and DDAVP plus methylprednisolone once endocrine collapse develops."
          >
            <BrainstemDeathCascadeDiagram />
          </DiagramSection>

          <ExamSection id="donor-mgmt" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Physiological Management of the Donor">
            <div className="space-y-2">
              {[
                { system: "Cardiovascular", goal: "MAP >60 mmHg. Vasopressin 0.5–4 U/h (treats DI + hypotension). Noradrenaline if needed. Avoid high-dose inotropes." },
                { system: "Respiratory", goal: "VT 6–8 ml/kg, PEEP 5–10. Target PaO₂/FiO₂ >300 for lung retrieval. Recruitment, bronchoscopy." },
                { system: "Endocrine", goal: "DI in ~65% — DDAVP 1–2 µg IV. Methylprednisolone 15 mg/kg. T3/T4 controversial but commonly used." },
                { system: "Temperature", goal: "Active warming to 35–37°C." },
                { system: "Metabolic", goal: "Na⁺ <155 mmol/L. Glucose 4–10. Correct electrolytes." },
              ].map((s) => (
                <div key={s.system} className="flex gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm whitespace-nowrap">{s.system}</span>
                  <span className="text-sm text-muted-foreground">{s.goal}</span>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Hormonal Replacement Therapy</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Loss of pituitary function after brainstem death drives cardiovascular instability, diabetes insipidus and hyperglycaemia; a hormonal "cocktail" is used to attenuate this and improve donor organ yield/quality <InlineRef topicId="organ-donation" refLabel="BJA Donor Management 2012" />.
            </p>
            <div className="space-y-2">
              {[
                { agent: "Methylprednisolone", detail: "15 mg/kg single IV dose — attenuates the systemic inflammatory response and improves lung function/oxygenation, increasing lungs suitable for retrieval." },
                { agent: "Vasopressin", detail: "Infusion 0.5–2.4 units/h — dual role treating vasoplegia and diabetes insipidus; spares catecholamines and reduces noradrenaline requirement." },
                { agent: "Thyroid hormone (T3/T4)", detail: "Controversial evidence but commonly used with cardiovascular instability, e.g. thyroxine (T4) 20 mcg bolus then 10 mcg/h infusion." },
                { agent: "Insulin", detail: "Infusion targeting glucose ~6–10 mmol/L — counters steroid- and stress-induced hyperglycaemia and improves pancreas/whole-organ viability." },
              ].map((h) => (
                <div key={h.agent} className="flex gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm whitespace-nowrap">{h.agent}</span>
                  <span className="text-sm text-muted-foreground">{h.detail}</span>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="donor-drug-rationale" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Why the Donation Team Requests Specific Drugs">
            <p className="text-muted-foreground leading-relaxed mb-3">
              When the specialist nurse for organ donation (SN-OD) and the retrieval team ask you to change the
              prescription, every request has a physiological or organ-specific reason. Understanding these makes the
              conversation collaborative rather than confusing, and it is a favourite viva probe. Two governing
              principles apply. First, once death has been confirmed by neurological criteria the goal of therapy
              changes from <em>brain protection</em> to <em>organ protection</em>, so drugs are chosen for their effect on
              grafts rather than on the patient's neurology. Second, in the DCD pathway the patient is still alive, so
              nothing may be given for the benefit of the recipient unless it is lawful, authorised and does not harm
              or hasten the death of the donor <InlineRef topicId="organ-donation" refLabel="NICE CG135" />.
            </p>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-2">Switching noradrenaline to vasopressin — the classic request</h3>
            <div className="space-y-2">
              {[
                { point: "The physiology has changed", detail: "After coning, the catecholamine storm is followed by loss of medullary vasomotor tone and pituitary failure. The resulting shock is vasoplegic and endocrine, not a failure of adrenergic drive — the donor is already maximally catecholamine-exposed and adrenoceptors are downregulated and desensitised." },
                { point: "Vasopressin exploits a different receptor", detail: "V1 receptor agonism restores vascular tone independently of α₁ adrenoceptors, so it works where escalating noradrenaline does not, and it restores the low endogenous vasopressin level caused by posterior pituitary infarction. Typical infusion 0.5–2.4 (up to 4) units/h." },
                { point: "It is catecholamine-sparing", detail: "High-dose noradrenaline causes myocardial injury (calcium overload, contraction-band necrosis, β-receptor downregulation), splanchnic and renal vasoconstriction, and pulmonary venoconstriction with extravascular lung water. Retrieval teams grade hearts partly by the vasopressor dose the donor needed; getting noradrenaline down improves the chance a heart, liver and kidneys are accepted." },
                { point: "One drug treats two problems", detail: "Around two-thirds of DBD donors develop cranial diabetes insipidus. Vasopressin also provides V2 antidiuretic activity, so it simultaneously controls polyuria, protects intravascular volume and limits the rise in serum sodium that damages liver grafts (target Na⁺ < 155 mmol/L)." },
                { point: "What it is not", detail: "It is not a rescue for hypovolaemia — restore preload first (CVP 4–12 mmHg, MAP 60–80 mmHg). Watch for excessive vasoconstriction with reduced cardiac output and splanchnic ischaemia, so titrate to the lowest effective rate and use echocardiography or cardiac-output monitoring if the heart is being considered." },
              ].map((p) => (
                <div key={p.point} className="p-3 rounded border border-border">
                  <p className="font-semibold text-foreground text-sm">{p.point}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <InlineRef topicId="organ-donation" refLabel="BJA Donor Management 2012" />
            </p>

            <h3 className="text-base font-semibold text-foreground mt-5 mb-2">The rest of the request list — and the reason behind each</h3>
            <div className="space-y-2">
              {[
                { agent: "DDAVP (desmopressin) 1–2 µg IV", detail: "Selective V2 agonist for diabetes insipidus when polyuria persists despite vasopressin, or when vasopressin is not needed haemodynamically. Chosen over more vasopressin when you want antidiuresis without additional vasoconstriction — protects circulating volume, sodium and kidney grafts." },
                { agent: "Methylprednisolone 15 mg/kg IV (single dose)", detail: "Brainstem death releases a systemic inflammatory cascade that injures grafts before retrieval, and cortisol production falls. Steroid attenuates this inflammation, reduces extravascular lung water and improves oxygenation, so it measurably increases the number of lungs suitable for transplant. Given early, once donation is a possibility and authorisation is in place." },
                { agent: "Thyroid hormone (T4 20 µg bolus then 10 µg/h, or T3)", detail: "Pituitary failure lowers circulating thyroid hormone, and low T3 states are associated with impaired myocardial energetics. Used mainly for cardiovascular instability that persists despite volume, vasopressin and modest noradrenaline. The evidence is genuinely contested, so present it as a rescue component of the hormonal bundle rather than routine." },
                { agent: "Insulin infusion (glucose 4–10 mmol/L)", detail: "Steroids, catecholamines, dextrose-containing fluids and loss of insulin sensitivity all drive hyperglycaemia, which causes osmotic diuresis, worsens the sodium load and is associated with poorer pancreas and kidney graft function. Insulin also has direct anti-inflammatory and anabolic effects on grafts." },
                { agent: "Short-acting vasodilators (GTN, esmolol, sodium nitroprusside) during the storm", detail: "Requested before or during the hypertensive catecholamine surge to protect the heart and lungs from afterload injury and neurogenic pulmonary oedema. Short-acting agents are chosen deliberately so that the profound vasodilatation that follows can be managed without a lingering drug effect." },
                { agent: "Lung-directed therapy — recruitment, bronchoscopy, diuresis, nebulised salbutamol", detail: "Aimed at achieving PaO₂/FiO₂ > 300 with lung-protective settings. Salbutamol enhances alveolar fluid clearance, bronchoscopy clears secretions and confirms graft suitability, and careful diuresis reduces extravascular lung water; over-diuresis is avoided because it compromises kidneys." },
                { agent: "Broad-spectrum antibiotics", detail: "Requested to treat known or suspected donor infection and to reduce the risk of transmitting infection to an immunosuppressed recipient. Cultures taken before starting them guide recipient prophylaxis, so the microbiology results matter as much as the treatment itself." },
                { agent: "Heparin (typically 25,000–30,000 units) and vasodilator at retrieval", detail: "Prevents microvascular thrombosis so that cold preservation fluid perfuses the whole graft. In DBD it is given by the retrieval team just before aortic cross-clamp. In DCD its timing is a legal and ethical matter: any pre-mortem administration is a 'pre-mortem intervention' that requires specific authorisation and must not harm the patient, so in UK practice it is not routine and is agreed case-by-case with the SN-OD and the treating team, not prescribed unilaterally." },
                { agent: "Antihypertensives, prostacyclin or thrombolytics in specific protocols", detail: "Some pathways use prostacyclin or alteplase in the perfusate to improve microcirculatory flush, particularly for livers and lungs. These are retrieval-team drugs given after death is confirmed and are outside the ICU prescription." },
                { agent: "Analgesia and sedation in the DCD pathway", detail: "Prescribed solely for symptom control at withdrawal of life-sustaining treatment, titrated to distress in the usual way. They are never escalated to shorten life or to shorten the functional warm ischaemic time — that boundary is what keeps the DCD pathway lawful and must be stated explicitly in the viva." },
                { agent: "Drugs that are stopped", detail: "Neuroprotective measures (osmotherapy targeted at ICP, tight temperature control for the brain), enteral feed and drugs with no organ benefit are discontinued after confirmation of death. Continued neuromuscular blockade may still be requested to prevent spinal reflexes during retrieval, which reassures staff and prevents movement that could be misinterpreted." },
              ].map((a) => (
                <div key={a.agent} className="flex flex-col sm:flex-row gap-1 sm:gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm sm:whitespace-nowrap sm:w-56 sm:shrink-0">{a.agent}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{a.detail}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              Exam framing: if asked "why change to vasopressin?", answer in three layers — the shock is vasoplegic and
              endocrine rather than adrenergic; vasopressin treats vasoplegia and diabetes insipidus through V1 and V2
              receptors at once; and reducing catecholamine load protects the heart, liver and kidneys and improves the
              chance each organ is accepted <InlineRef topicId="organ-donation" refLabel="BJA Donor Management 2012" />.
              Then add the governance point: after DBD confirmation these drugs are organ-directed and lawful with
              authorisation, whereas before death in DCD only measures that benefit the patient — or an authorised,
              non-harmful pre-mortem intervention — are permissible <InlineRef topicId="organ-donation" refLabel="NICE CG135" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="donation-algorithm" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Step-by-Step Donation Algorithm — Pre- and Post-Mortem" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every deceased donation follows the same skeleton: recognition that further treatment is futile →
              SN-OD referral → family approach → a branch point at <strong>how death is confirmed</strong> (neurological
              criteria = DBD, circulatory criteria after WLST = DCD) → organ-directed optimisation with timed drug
              changes → retrieval → standing down the donation drugs afterwards. The drug swaps are not random — each
              one happens at a defined point in the sequence, and the viva rewards stating the timing, not just the drug
              <InlineRef topicId="organ-donation" refLabel="NICE CG135" />.
            </p>

            <h3 className="text-base font-semibold text-foreground mb-2">Phase 1 — Pre-mortem: common to both pathways</h3>
            <div className="space-y-2 mb-4">
              {[
                { step: "1. Recognise futility & refer", detail: "Catastrophic brain injury with treatment no longer in the patient's best interests. Mandatory referral of every potential donor to the SN-OD — referral is not consent, it is a trigger for a co-ordinated pathway." },
                { step: "2. Continue physiological care unchanged", detail: "No drug is started or stopped yet for the recipient's benefit. Maintain neuroprotective care for DBD candidates (CPP, normocapnia, temperature) and comfort care where relevant." },
                { step: "3. Family approach & authorisation", detail: "SN-OD-led approach, checking the NHS Organ Donor Register. Under deemed consent in England/Wales/Scotland the family conversation still happens; no retrieval proceeds against sustained family objection." },
                { step: "4. SN-OD co-ordinates the offer sequence", detail: "Blood tests (virology, tissue typing, crossmatch), donor characterisation and organ offers begin now, in parallel with the testing or withdrawal plan below." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col sm:flex-row gap-1 sm:gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm sm:whitespace-nowrap sm:w-64 sm:shrink-0">{s.step}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{s.detail}</span>
                </div>
              ))}
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">Phase 2a — DBD branch (brainstem death confirmed)</h3>
            <div className="space-y-2 mb-4">
              {[
                { step: "1. Brainstem death testing", detail: "Two sets of tests by two doctors; legal time of death = completion of the first set. From this moment the therapeutic goal switches from brain protection to organ protection." },
                { step: "2. First drug swap — catecholamine storm control", detail: "If the hypertensive surge is ongoing: short-acting agents only (GTN, esmolol, sodium nitroprusside) so the vasoplegia that follows is not compounded by a lingering drug." },
                { step: "3. Start the hormonal bundle — immediately after BSD", detail: "Methylprednisolone 15 mg/kg IV single dose; insulin infusion to glucose 4–10 mmol/L; T4 20 µg bolus then 10 µg/h is added for persisting cardiovascular instability rather than routinely." },
                { step: "4. The noradrenaline → vasopressin swap", detail: "As the storm resolves into vasoplegic, endocrine shock: start vasopressin 0.5–2.4 (up to 4) U/h and titrate noradrenaline down. Rationale — V1 agonism bypasses downregulated adrenoceptors, the V2 effect treats the diabetes insipidus (~65% of donors), and catecholamine-sparing protects the heart, liver and kidneys. Done within hours of confirmation, aiming for the lowest catecholamine dose before the heart is assessed." },
                { step: "5. Add DDAVP if polyuria persists", detail: "Desmopressin 1–2 µg IV when urine output remains high despite vasopressin, or when antidiuresis is wanted without further vasoconstriction. Corrects Na⁺ toward <155 mmol/L to protect liver grafts." },
                { step: "6. Multi-organ optimisation until theatre", detail: "Targets: MAP 60–80, CVP 4–12, VT 6–8 mL/kg with PEEP 5–10, PaO₂/FiO₂ >300, Hb >80–100 g/L, temperature 35–37 °C, urine output ~100 mL/h. Broad-spectrum antibiotics for donor infection; bronchoscopy and lung recruitment as requested." },
                { step: "7. In theatre, after death (post-mortem)", detail: "Retrieval team gives heparin (typically 25,000–30,000 units) immediately before aortic cross-clamp, then cold perfusion. Continued neuromuscular blockade prevents spinal reflexes. Organ-directed ICU drugs are stopped once cross-clamp occurs — the graft is now managed ex situ." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col sm:flex-row gap-1 sm:gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm sm:whitespace-nowrap sm:w-64 sm:shrink-0">{s.step}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{s.detail}</span>
                </div>
              ))}
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">Phase 2b — DCD branch (withdrawal of life-sustaining treatment)</h3>
            <div className="space-y-2 mb-4">
              {[
                { step: "1. Decision that BSD criteria are not met", detail: "Catastrophic injury with treatment futile, but the brainstem is not dead — so death must be confirmed by circulatory criteria. The patient is alive until then; comfort, not organ protection, governs the prescription." },
                { step: "2. Pre-mortem drug rule", detail: "Only drugs that benefit the patient (analgesia, sedation, secretions control) are given, titrated to distress and never to shorten life. Pre-mortem heparin is an authorised 'pre-mortem intervention' only where specifically agreed case-by-case with the SN-OD and treating team — it is not routine UK practice and is never prescribed unilaterally." },
                { step: "3. Withdrawal (extubation) — clock starts", detail: "WLST, usually in theatre or ICU. Functional warm ischaemic time begins when SBP falls below 50 mmHg. No organ-directed drug is given during this window." },
                { step: "4. Cardiac arrest → 5-minute hands-off observation", detail: "Legal time of death = the START of the 5-minute observation period (the moment observation of absent circulation begins). Nothing is touched, no drug is given, during the standoff; after 5 minutes of absent circulation, death is confirmed." },
                { step: "5. Post-mortem — retrieval sequence", detail: "Only now may organ-directed drugs be given: heparin and vasodilators in the perfusate, cannulation for cold perfusion within ~10 minutes, or abdominal/thoraco-abdominal NRP with arch-vessel exclusion to prevent cerebral reperfusion. Stand-down if death has not occurred within the agreed window (typically 2–3 h from withdrawal) — warm ischaemia too long for viable retrieval." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col sm:flex-row gap-1 sm:gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm sm:whitespace-nowrap sm:w-64 sm:shrink-0">{s.step}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{s.detail}</span>
                </div>
              ))}
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">Phase 3 — Post-mortem: after retrieval (both pathways)</h3>
            <div className="space-y-2 mb-3">
              {[
                { step: "1. Stop all organ-directed therapy", detail: "Vasopressin, noradrenaline, insulin, thyroid hormone, DDAVP and ventilation are discontinued once cross-clamp/retrieval is complete — their purpose ended with organ removal." },
                { step: "2. Dignified end-of-life care", detail: "The body is cared for with the same dignity as any death; the coroner/procurator fiscal is informed where required, and the family is supported by the SN-OD with follow-up." },
                { step: "3. Document the timing chain", detail: "Record the legal time of death (first BSD test set, or start of the 5-minute DCD observation), time of each drug swap, cross-clamp time and warm/cold ischaemic times — these feed the national audit and graft outcome reporting." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col sm:flex-row gap-1 sm:gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm sm:whitespace-nowrap sm:w-64 sm:shrink-0">{s.step}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{s.detail}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              Exam framing: recite the skeleton first (referral → approach → branch at mode of death → optimisation →
              retrieval → stand-down), then place each drug on the timeline — storm control during BSD testing,
              hormonal bundle immediately after confirmation, noradrenaline→vasopressin as vasoplegia emerges, DDAVP for
              persisting DI, heparin only in the perfusate/cross-clamp window in DBD and only post-mortem in DCD
              <InlineRef topicId="organ-donation" refLabel="BJA Donor Management 2012" />{" "}
              <InlineRef topicId="organ-donation" refLabel="NICE CG135" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="dcd" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="DCD — Pathway & Maastricht Classification">
            <p className="text-muted-foreground leading-relaxed mb-3">
              DCD ~60% of UK deceased donations. Functional WIT begins when SBP &lt;50 mmHg. Mandatory 5-min hands-off period after asystole; the <strong>legal time of death is the start of the 5-minute observation period</strong> — i.e. the time the clinician begins observing the absent circulation, not the end of the standoff. Retrieval may only begin once the full 5 minutes have elapsed and death has been confirmed <InlineRef topicId="organ-donation" refLabel="AoMRC DNC Code of Practice (PDF)" />.
            </p>
            <div className="space-y-2 mb-4">
              {[
                { c: "I — Dead on arrival", d: "Uncontrolled. Rare in UK." },
                { c: "II — Failed resuscitation", d: "Uncontrolled. Used in some EU centres; not UK." },
                { c: "III — Awaiting cardiac arrest after WLST", d: "Controlled. ~95% of UK DCD." },
                { c: "IV — Arrest after BSD", d: "Uncommon — switch from DBD to DCD pathway." },
                { c: "V — Unexpected hospital arrest", d: "Not in UK classification." },
              ].map((m) => (
                <div key={m.c} className="p-3 rounded border border-border">
                  <p className="font-bold text-primary text-sm">{m.c}</p>
                  <p className="text-sm text-muted-foreground">{m.d}</p>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                { l: "fWIT start", v: "SBP < 50 mmHg" },
                { l: "fWIT end", v: "Cold perfusion starts" },
                { l: "Target", v: "<30 min kidney, <20 min liver" },
              ].map((w) => (
                <div key={w.l} className="p-3 rounded-lg bg-secondary/30 border border-border text-center">
                  <p className="text-xs text-muted-foreground">{w.l}</p>
                  <p className="font-semibold text-foreground text-sm mt-1">{w.v}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="withdrawal-practice" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Withdrawal of Life-Sustaining Treatment — the Practical Process" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Withdrawing organ support is the same act of end-of-life care in both pathways — what differs is <em>where
              it happens, who is present, and what the clock means afterwards</em>. In DBD the patient is already
              legally dead, so there is no "withdrawal" in the DCD sense: ventilatory and haemodynamic support are
              continued (not withdrawn) until aortic cross-clamp in theatre. In DCD the patient is alive, and
              withdrawal is the event that starts the donation timeline <InlineRef topicId="organ-donation" refLabel="NICE CG135" />.
            </p>

            <h3 className="text-base font-semibold text-foreground mb-2">DBD — no withdrawal; support is maintained to retrieval</h3>
            <div className="space-y-2 mb-4">
              {[
                { step: "Confirm death", detail: "Two sets of brainstem death tests; legal death is completion of the first set. From that moment the ventilator, vasopressors and monitoring are not 'treatment' — they are organ preservation." },
                { step: "Optimise for hours to days", detail: "Hormonal bundle, noradrenaline→vasopressin swap, DDAVP, lung recruitment and cardiac output monitoring run until the retrieval teams are assembled. There is no warm ischaemic time pressure — grafts remain perfused until cross-clamp, which is why DBD yields the most organs per donor (typically 3–4, including heart and lungs)." },
                { step: "Theatre", detail: "Transfer ventilated and monitored as for any ICU transfer. Heparin 25,000–30,000 units immediately before aortic cross-clamp, then cold flush. Support is disconnected only after cross-clamp." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col sm:flex-row gap-1 sm:gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm sm:whitespace-nowrap sm:w-64 sm:shrink-0">{s.step}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{s.detail}</span>
                </div>
              ))}
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">DCD — withdrawal as the start of the donation clock</h3>
            <div className="space-y-2 mb-4">
              {[
                { step: "Plan & position", detail: "Agree the location (theatre anaesthetic room adjacent to the operating theatre is standard; ICU only where geography forces it), who withdraws (the treating ICU team — never the retrieval team), the symptom-control prescription, and the stand-down time with the SN-OD before starting." },
                { step: "Comfort measures first", detail: "Analgesia and sedation are titrated to distress exactly as for any dying patient; they are never escalated to hasten death. Family remain present for as long as they wish — the practical choreography (family step out just before transfer, or remain in the anaesthetic room) is agreed in advance." },
                { step: "Withdrawal (extubation)", detail: "Tracheal extubation and discontinuation of vasoactive support; the withdrawal-to-arrest interval is documented minute-by-minute by the SN-OD. Most deaths occur within 1–2 hours of withdrawal." },
                { step: "5-minute hands-off observation", detail: "After asystole (loss of arterial pulsatility), nothing is touched for 5 minutes. Legal time of death = the START of this observation period. Autoresuscitation after 5 minutes of observed absent circulation has not been reported in controlled DCD." },
                { step: "Death confirmed → rapid transfer", detail: "The retrieval team (who have stayed out of the room until now) take over. Cold perfusion or NRP cannulation should begin within ~10 minutes of confirmed death. If death has not occurred within the agreed stand-down window (commonly 2–3 hours, organ-specific), the donor is returned to the ward/ICU for continuing end-of-life care and donation does not proceed." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col sm:flex-row gap-1 sm:gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm sm:whitespace-nowrap sm:w-64 sm:shrink-0">{s.step}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{s.detail}</span>
                </div>
              ))}
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">Timings after withdrawal that decide which organs can be used</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Warm ischaemia is the enemy in DCD. Two intervals matter: the <strong>functional warm ischaemic time
              (fWIT)</strong> — from sustained SBP &lt;50 mmHg (or SpO₂ &lt;70%) to the start of cold perfusion — and the
              <strong>withdrawal-to-death interval</strong>, which predicts how much hypoxic-hypotensive injury the graft
              has already suffered. Typical UK acceptance limits <InlineRef topicId="organ-donation" refLabel="BJA Donor Management 2012" />:
            </p>
            <div className="space-y-2 mb-4">
              {[
                { organ: "Liver", timing: "Most ischaemia-sensitive abdominal organ: fWIT <20–30 min (aNRP extends this); withdrawal-to-arrest ideally <30 min. Longer agonal phases predict ischaemic cholangiopathy and primary non-function." },
                { organ: "Pancreas", timing: "Similar tolerance to liver: fWIT <30 min; prolonged hypotension or hypoxia before arrest is a common reason to decline." },
                { organ: "Kidney", timing: "Most tolerant: fWIT up to ~60–120 min (commonly cited practical limit <30–60 min to first cold flush). This is why kidneys are retrieved even when the liver has been stood down — delayed graft function is frequent but usually recovers." },
                { organ: "Lung", timing: "Tolerant of ~60 min warm ischaemia because alveolar oxygen persists after circulatory arrest; retrieval teams reinflate the lungs before cold perfusion. Usable after standoff intervals that preclude liver." },
                { organ: "Heart", timing: "Only possible with TA-NRP or direct procurement/ex-situ perfusion; total warm ischaemia must be minutes, not hours — heart teams attend the withdrawal and assess the agonal phase in real time." },
                { organ: "Stand-down rule", timing: "If arrest has not occurred within the agreed window (typically 2–3 h from withdrawal; some programmes 1–2 h for liver/pancreas), donation is abandoned and end-of-life care continues — prolonging the wait to chase organs is never acceptable." },
              ].map((o) => (
                <div key={o.organ} className="flex flex-col sm:flex-row gap-1 sm:gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm sm:whitespace-nowrap sm:w-40 sm:shrink-0">{o.organ}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{o.timing}</span>
                </div>
              ))}
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">Reintubation after death in DCD — when and why</h3>
            <div className="space-y-2 mb-4">
              {[
                { point: "It happens only after death is confirmed", detail: "Reintubation in DCD is a post-mortem, organ-directed procedure performed by the retrieval team after the 5-minute standoff — never before, and never by the treating team while the patient is alive." },
                { point: "Lung recruitment for retrieval assessment", detail: "The lungs are reinflated and ventilated after death so that oxygenation can be re-assessed (a post-mortem PaO₂/FiO₂ ratio), atelectasis reversed, and bronchoscopy performed if needed. This determines whether the lungs are transplantable and measurably increases lung yield from DCD donors." },
                { point: "During TA-NRP", detail: "When thoraco-abdominal NRP is running, the lungs are re-recruited and gently ventilated as part of in-situ heart and lung assessment — the same physiology as ex-vivo lung perfusion, but in the donor. Arch vessels remain occluded throughout; ventilation does not alter the legal status of the donor." },
                { point: "Governance", detail: "Post-mortem reintubation is covered by the donation authorisation and documented in the retrieval record; it is one of the clearest illustrations that 'post-mortem interventions' have a different ethical footing from anything done before death." },
              ].map((p) => (
                <div key={p.point} className="p-3 rounded border border-border">
                  <p className="font-semibold text-foreground text-sm">{p.point}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.detail}</p>
                </div>
              ))}
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">Regional reperfusion (NRP) — how it has changed DCD practice</h3>
            <div className="space-y-2 mb-3">
              {[
                { change: "Restores warm perfusion in situ", detail: "After death is confirmed, femoral cannulae (or open aortic/venous cannulation) connect to an ECMO-type circuit; arch vessels are clamped or balloon-occluded first so no cerebral reperfusion is possible. Abdominal NRP perfuses liver/kidneys/pancreas; TA-NRP adds the thorax and makes DCD heart retrieval possible." },
                { change: "Rescued organs that used to be declined", detail: "Livers with fWIT at the upper end of acceptability — previously discarded — are now retrieved and function, because warm oxygenated reperfusion allows real-time viability assessment (lactate clearance, bile production, perfusion flows) rather than a guess from the clock. DCD liver utilisation and 1-year graft survival have risen accordingly, and ischaemic cholangiopathy rates have fallen toward DBD levels." },
                { change: "Kidney outcomes improved", detail: "Delayed graft function after DCD kidney transplant falls from roughly half to roughly a fifth of recipients with aNRP, shortening hospital stay and dialysis dependence." },
                { change: "Enabled DCD hearts", detail: "TA-NRP with direct procurement perfusion has created an entirely new DCD heart programme in the UK, with early outcomes comparable to DBD hearts — the single biggest expansion of the heart donor pool in decades." },
                { change: "Changed the choreography of withdrawal", detail: "Retrieval teams now cannulate and prepare the circuit before or immediately after withdrawal (per local protocol and authorisation), heart teams attend the agonal phase, and withdrawal is almost always sited in or beside theatre. The 5-minute standoff and cerebral exclusion before circuit start are the non-negotiable safeguards that keep the practice lawful and publicly trusted." },
              ].map((c) => (
                <div key={c.change} className="p-3 rounded border border-border">
                  <p className="font-semibold text-foreground text-sm">{c.change}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-2">
              Exam framing: structure the answer as pre-withdrawal (location, roles, comfort prescription, stand-down
              time) → withdrawal (minute-by-minute SN-OD record, comfort only) → the 5-minute standoff (legal death at
              its start) → organ-specific warm-ischaemia limits → post-mortem procedures (reintubation for lung
              recruitment, cannulation, NRP) → stand-down if the window is missed. State explicitly that nothing
              organ-directed happens before death in DCD, whereas in DBD all support continues to cross-clamp
              <InlineRef topicId="organ-donation" refLabel="NICE CG135" />{" "}
              <InlineRef topicId="organ-donation" refLabel="AoMRC DNC Code of Practice (PDF)" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="nrp" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Normothermic Regional Perfusion (NRP)">
            <p className="text-muted-foreground leading-relaxed mb-4">
              NRP restores warm oxygenated blood flow to donor organs <em>in situ</em> after DCD death is confirmed. <strong>Abdominal NRP (aNRP)</strong>: femoral cannulation, arch vessels clamped/balloon-occluded to prevent cerebral reperfusion. <strong>TA-NRP</strong>: also perfuses thoracic organs — enables DCD heart transplantation. Critical step is <strong>arch vessel exclusion before initiating NRP</strong>.
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Ethical framework</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
              <li><strong>Permanence vs irreversibility</strong> — UK uses "irreversible" cessation; the 5-min standoff demonstrates permanence. NRP is justified by cerebral exclusion preventing consciousness restoration.</li>
              <li><strong>Dead donor rule</strong> — death is confirmed before NRP starts; perfusion does not reverse death.</li>
              <li><strong>AoMRC (2021)</strong> endorses NRP provided: death properly confirmed, arch vessels excluded, no cerebral reperfusion possible, family informed and consents.</li>
              <li><strong>Legal time of death is unchanged</strong> by subsequent restoration of regional circulation (UK legal opinion via NHSBT).</li>
            </ul>
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Cerebral Exclusion Is the Safeguard</p>
              <p className="text-sm text-muted-foreground mt-1">The ethical legitimacy of NRP rests entirely on confirming arch vessel occlusion <em>before</em> the circuit starts.</p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <SynthesisBlock
            title="Organ Donation — Pathway at a Glance"
            subtitle="The two donation pathways, the triggers for SN-OD referral, and the donor optimisation bundle."
            variant="summary"
          >
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li><strong>DBD</strong>: BSD confirmed by 2 doctors / 2 sets of tests; physiological support continued until retrieval.</li>
              <li><strong>DCD</strong>: WLST planned and BSD will not occur — Maastricht III; controlled withdrawal with rapid retrieval after 5-min standoff.</li>
              <li><strong>Refer SN-OD early</strong>: any catastrophic brain injury where BSD or WLST is being considered. Referral does not commit to donation.</li>
              <li>
                <strong>Donor optimisation (DBD)</strong> — concrete UK targets{" "}
                <InlineRef topicId="organ-donation" refLabel="BJA Donor Management 2012" />:
                <ul className="mt-1 ml-5 space-y-1 list-disc list-inside">
                  <li><strong>Cardiovascular</strong>: MAP 60–80 mmHg, CVP 4–12 mmHg (aim normovolaemia); vasopressin 0.5–2.4 units/h first-line, noradrenaline added if needed; avoid high-dose catecholamines (myocardial injury and graft dysfunction).</li>
                  <li><strong>Respiratory</strong>: VT 6–8 mL/kg predicted body weight, PEEP 5–10 cmH₂O, recruitment manoeuvres and bronchial toilet; target PaO₂/FiO₂ &gt;300 (PaO₂ &gt;13.3 kPa on FiO₂ &lt;0.5) for lung retrieval.</li>
                  <li><strong>Endocrine (hormonal replacement bundle)</strong>: methylprednisolone 15 mg/kg IV single dose, vasopressin infusion (vasoplegia + diabetes insipidus, with DDAVP 1–2 µg IV if polyuric), insulin infusion targeting glucose 4–10 mmol/L; T3/T4 (e.g. T4 20 µg bolus then 10 µg/h) remains controversial but is commonly added for refractory cardiovascular instability.</li>
                  <li><strong>Fluid &amp; electrolytes</strong>: urine output &gt;1 mL/kg/h, serum Na⁺ &lt;155 mmol/L to protect liver grafts, correct K⁺/Mg²⁺/PO₄³⁻.</li>
                  <li><strong>Temperature</strong>: active warming to normothermia 36.5–37.5 °C.</li>
                </ul>
              </li>
              <li><strong>Family approach</strong>: collaborative between intensivist and SN-OD, separate from prognosis discussion.</li>
            </ul>
          </SynthesisBlock>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "DBD: brain-stem death testing — two doctors, two sets ≥6 h apart, prerequisites met.",
              "DCD: planned withdrawal in identified candidates — controlled (Maastricht III) is the commonest UK pathway.",
              "Donor optimisation: cardiovascular stability (noradrenaline + vasopressin), lung-protective ventilation, T4/methylprednisolone, glycaemic control.",
              "SNOD referral early — even before brain-stem death testing or withdrawal decisions.",
              "Family approach: ideally separate from withdrawal discussion; respect documented organ-donor decisions.",
            ]}
          />
        </>
          <TopicFaqs faqs={organDonationFaqs} />
        </>
      }
    />
  );
};

export default OrganDonationTopic;

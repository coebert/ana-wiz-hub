import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { prognosticationIcuQuestions } from "@/data/quizzes";
import PostCardiacArrestProgDiagram from "@/components/diagrams/intensive-care/PostCardiacArrestProgDiagram";
import APACHEIICalculator from "@/components/diagrams/intensive-care/APACHEIICalculator";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const prognosticationEthicsIcuFaqs: Array<[string, string]> = [
  ["What ethical framework underpins withdrawal of life-sustaining treatment?", "Four principles (Beauchamp & Childress): autonomy, beneficence, non-maleficence, justice — applied through best-interests assessment under the Mental Capacity Act 2005, involving family, IMCA if no representative, and shared decision-making."],
  ["What is the distinction between withholding and withdrawing treatment?", "Ethically and legally equivalent in UK law — both are decisions not to provide treatment that is not in the patient's best interests; withdrawal is not euthanasia, as intent is to relieve suffering, not to cause death (GMC 2010, Aintree v James 2013)."],
  ["How are prognostic scores used responsibly at end of life?", "APACHE IV, SOFA and clinical frailty scales inform but never determine individual decisions; integrate with disease trajectory, response to treatment and patient values — never withdraw on score alone."],
];

const objectives = [
  "Apply multimodal post-cardiac arrest prognostication (ERC/ESICM 2021) at ≥72 h with at least two concordant indicators.",
  "Use validated scoring systems (APACHE II/IV, SOFA, ICNARC, SAPS 3) appropriately for population-level outcome prediction.",
  "Construct treatment escalation plans, including ReSPECT, time-limited trials, DNACPR, and comfort care.",
  "Apply the Mental Capacity Act 2005, ADRT, LPA, and best-interests framework to decision-making in ICU.",
  "Recognise Post-Intensive Care Syndrome (PICS) — physical, cognitive, and psychological — and the role of the ABCDEF bundle in prevention.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Post-arrest prognostication at 72 h",
    scenario: (
      <>
        A 58-year-old has a witnessed VF arrest, ROSC at 18 min. TTM at 36°C for 24 h, then
        rewarmed. At 72 h after rewarming: GCS M2, bilateral absent pupillary and corneal reflexes,
        NSE rising (78 → 95 µg/L), MRI shows diffuse cortical diffusion restriction. SSEPs not yet
        performed. EEG shows burst-suppression. How would you approach prognostication?
      </>
    ),
    working: (
      <>
        ERC/ESICM 2021 mandates a <strong>multimodal</strong> assessment at <strong>≥72 h after
        ROSC</strong> (or ≥72 h after rewarming). At least <strong>two concordant</strong> poor
        prognostic indicators are required to predict poor outcome. Confounders (sedation,
        hypothermia, paralysis, organ dysfunction) must be excluded. A single test (NSE alone) is
        insufficient — and self-fulfilling prophecy is a major concern.
      </>
    ),
    answer: (
      <>
        Multiple concordant indicators present: bilateral absent pupillary <em>and</em> corneal
        reflexes, NSE &gt;60 µg/L and rising, MRI diffuse anoxic injury, malignant EEG. After
        confirming sedation washout, this constitutes adequate evidence of poor neurological
        prognosis. SSEP would add further confirmation. Discuss in MDT, then with family in a
        structured meeting using clear language; do not act on a single early test.
      </>
    ),
    cites: ["GMC 2022"],
  },
  {
    title: "Best-interests decision under the MCA",
    scenario: (
      <>
        An 82-year-old with severe dementia, frailty (CFS 7), and metastatic cancer is admitted
        with septic shock requiring vasopressors and intubation. The family insists "you must do
        everything." Under UK law, who makes the decision and how do you proceed?
      </>
    ),
    working: (
      <>
        The patient lacks capacity. There is no ADRT or registered Health &amp; Welfare LPA. Under
        the <strong>Mental Capacity Act 2005</strong>, the treating clinicians must decide in the
        patient's <strong>best interests</strong> — considering past wishes, beliefs, values, and
        any factors the patient would consider. The family is consulted but does not have legal
        authority to demand treatment.
      </>
    ),
    answer: (
      <>
        Hold a structured family meeting with senior clinician, bedside nurse, and (if available) a
        palliative care or ethics representative. Explore the patient's prior expressed wishes and
        values. Explain that continued escalation is unlikely to achieve a quality of life she would
        have valued, and may prolong dying. Offer a <strong>time-limited trial</strong> (e.g.
        24–48 h) with explicit success/failure criteria, or transition to comfort care with
        anticipatory prescribing. Document the decision, rationale, and discussion in detail. If
        agreement cannot be reached, consider second opinion, mediation, ethics consultation, and
        ultimately the Court of Protection.
      </>
    ),
    cites: ["ERC/ESICM 2021"],
  },
];

const PrognosticationEthicsIcuTopic = () => {
  return (
    <TopicTemplate
      title="Prognostication, Ethics &amp; Outcomes"
      subtitle="FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "Prognostic scores predict population outcomes — never use a single score to determine treatment for an individual patient", cites: ["BJA Educ PICS 2018"] },
        { text: "Post-cardiac arrest prognostication: multimodal at ≥72 h — at least 2 concordant poor prognostic signs required (ERC/ESICM 2021)", cites: ["NICE CG83"] },
        { text: "Withholding and withdrawing treatment are ethically and legally equivalent (GMC/BMA guidance)", cites: ["Mental Capacity Act 2005"] },
        { text: "DNACPR does NOT mean withdrawal of all active treatment — it only applies to CPR", cites: ["GMC 2022"] },
        { text: "The Mental Capacity Act presumes capacity; best-interests decisions must consider the patient's values, wishes, and beliefs", cites: ["ERC/ESICM 2021"] },
        { text: "Doctrine of double effect permits medications for comfort even if they may hasten death — this is NOT euthanasia", cites: ["BJA Educ PICS 2018"] },
        { text: "PICS affects up to 50–80% of ICU survivors: physical (ICU-AW), cognitive (delirium-related), and psychological (PTSD, depression)", cites: ["NICE CG83"] },
        { text: "ICU-acquired weakness: CIP is axonal neuropathy, CIM is primary myopathy — often coexist. Sepsis is the strongest risk factor", cites: ["Mental Capacity Act 2005"] },
        { text: "ABCDEF bundle reduces delirium, ICU-AW, and improves long-term outcomes — early mobilisation is a key component", cites: ["GMC 2022"] },
        { text: "Self-fulfilling prophecy: withdrawing treatment based on early prediction confirms the prediction — use blinded multimodal assessment", cites: ["ERC/ESICM 2021"] },
      ]}
      topicId="prognostication-ethics-icu"
      topicTitle="Prognostication, Ethics & Outcomes"
      quizQuestions={prognosticationIcuQuestions}
      sectionSources={{
        objectives: ["ERC/ESICM 2021", "GMC 2022", "Mental Capacity Act 2005"],
        workedExamples: ["ERC/ESICM 2021", "Mental Capacity Act 2005", "GMC 2022"],
        keyPoints: ["GMC 2022", "NICE CG83", "BJA Educ PICS 2018", "Mental Capacity Act 2005", "ERC/ESICM 2021"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 5.4", "EDIC 7.2"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection id="diagrams" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Interactive Tools" defaultOpen>
            <PostCardiacArrestProgDiagram />
            <APACHEIICalculator />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="scoring" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Prognostic Scoring Systems">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Score</th>
                    <th className="text-left py-2 text-foreground font-semibold">Variables &amp; Timing</th>
                    <th className="text-left py-2 text-foreground font-semibold">Use &amp; Limitations</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">APACHE II</td><td>12 physiological + age + chronic health, worst values first 24 h</td><td>Population mortality. Widely validated. Not for individual decisions.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">APACHE IV</td><td>142 diagnoses, admission source, vent status, first 24 h</td><td>Better calibration. Proprietary software, US-centric.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ICNARC</td><td>UK-specific, physiology + diagnosis + source, first 24 h</td><td>UK gold standard. SMR via Case Mix Programme.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">SOFA</td><td>6 organ systems 0–4, daily</td><td>Tracks dysfunction. Δ-SOFA predicts mortality. Sepsis-3 (≥2-point rise).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">SAPS 3</td><td>Pre-ICU + admission physiology, first hour</td><td>International. Hospital mortality.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">GCS</td><td>E/V/M, serial</td><td>Motor at 72 h post-arrest part of multimodal prognostication.</td></tr>
                </tbody>
              </table>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Post-Cardiac Arrest (ERC/ESICM 2021; updated by ILCOR 2022 / TTM2)</h3>
            <p className="text-sm text-muted-foreground mb-2">Temperature control now targets <strong>active fever prevention (core ≤37.7 °C)</strong> for ≥72 h post-ROSC<InlineRef topicId="prognostication-ethics-icu" refLabel="TTM2 2021" /><InlineRef topicId="prognostication-ethics-icu" refLabel="ILCOR CoSTR 2022" /> — routine cooling to 32–34 °C is no longer mandated. Multimodal prognostication at ≥72 h after ROSC (or rewarming if hypothermia used). At least 2 concordant indicators: bilateral absent pupil + corneal reflexes; bilateral absent N20 SSEP; highly malignant EEG (suppression, burst-suppression); NSE &gt;60 µg/L; diffuse anoxic injury on MRI; absent brainstem reflexes.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Population vs Individual</p>
                <p className="text-xs text-muted-foreground mt-1">Scores predict group mortality. A 30% predicted mortality means ~70% survive — never use a single score to justify withdrawal.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Self-Fulfilling Prophecy</p>
                <p className="text-xs text-muted-foreground mt-1">Withdrawing on early prediction confirms it. Major ethical concern in post-arrest prognostication; blinded protocols mitigate bias.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="escalation" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Treatment Escalation Plans">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Level</th>
                    <th className="text-left py-2 text-foreground font-semibold">Description</th>
                    <th className="text-left py-2 text-foreground font-semibold">Examples</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Full escalation</td><td>All treatments incl. CPR, intubation, organ support</td><td>Young patient, reversible</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ward ceiling</td><td>Full ward care, no ICU</td><td>Advanced comorbidity</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Treatment trial</td><td>Time-limited ICU with review points</td><td>Uncertain prognosis, 48–72 h</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">DNACPR</td><td>No CPR; does NOT limit other treatments</td><td>Common misconception</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Comfort care</td><td>Symptom control, dignity</td><td>End-of-life pathway</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground"><strong>ReSPECT</strong> — UK national approach: personalised recommendations, portable across care settings, advisory not legally binding. Time-limited trials are increasingly used when prognosis is uncertain.</p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="ethics" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Medical Ethics & UK Law">
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { p: "Autonomy", d: "Right of competent patient to decide, including refusal. ICU patients often lack capacity → ADRT, LPA, best interests." },
                { p: "Beneficence", d: "Act in patient's interest. Define benefit in terms meaningful to the patient — not just survival." },
                { p: "Non-maleficence", d: "Prolonging dying causes harm. Continuously reassess benefit vs burden." },
                { p: "Justice", d: "Fair allocation. Triage transparent, consistent, clinical." },
              ].map((x) => (
                <div key={x.p} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.p}</p>
                  <p className="text-xs text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Instrument</th>
                    <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Mental Capacity Act 2005</td><td>5 principles: presume capacity, support, allow unwise decisions, best interests, least restrictive. Decision- and time-specific.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ADRT</td><td>Legally binding if valid &amp; applicable. Written, signed, witnessed for life-sustaining treatment refusal. Cannot demand treatment.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">LPA (Health &amp; Welfare)</td><td>Registered with Office of the Public Guardian. Used only when patient lacks capacity. Attorney must act in best interests.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Best Interests</td><td>When no ADRT/LPA: clinicians decide considering past wishes, values, family input. IMCA if no one to consult.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Court of Protection</td><td>Disagreement resolution. Charlie Gard, Alfie Evans precedents — clinicians' best-interests view upheld.</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="withdrawal" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Withdrawal & End-of-Life Care">
            <p className="text-muted-foreground leading-relaxed mb-3">
              ~70–80% of UK ICU deaths follow a decision to withdraw or withhold life-sustaining treatment. Withdrawal and withholding are ethically &amp; legally equivalent (GMC/BMA).
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>Doctrine of double effect</strong>: medications for comfort permitted even if they may hasten death — distinct from euthanasia.</li>
              <li><strong>Process</strong>: senior-led, MDT, family consulted but do not decide. Anticipatory prescribing: morphine, midazolam, glycopyrronium, levomepromazine.</li>
              <li><strong>Symptom management</strong>: titrate opioids to comfort, not RR. Syringe driver for continuous infusion.</li>
              <li><strong>Organ donation pathway is separate</strong> from withdrawal. SN-OD involved early.</li>
            </ul>
            <div className="mt-4 p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-2">Anticipatory prescribing at the end of life (NICE NG31)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="py-2 pr-3 font-semibold">Drug</th>
                      <th className="py-2 pr-3 font-semibold">Indication</th>
                      <th className="py-2 pr-3 font-semibold">Starting dose (SC syringe driver / 24 h)</th>
                      <th className="py-2 font-semibold">Titration endpoint</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 pr-3 font-medium text-foreground">Morphine sulfate</td><td className="py-2 pr-3">Pain, breathlessness</td><td className="py-2 pr-3">10–20 mg/24 h SC (PRN 2.5–5 mg SC hourly)</td><td className="py-2">Comfort and reduced work of breathing — not respiratory rate</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-3 font-medium text-foreground">Midazolam</td><td className="py-2 pr-3">Agitation, anxiety, seizures</td><td className="py-2 pr-3">10–20 mg/24 h SC (PRN 2.5–5 mg SC hourly)</td><td className="py-2">Settled, unagitated patient (equivalent of RASS −2 to −4)</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-3 font-medium text-foreground">Glycopyrronium</td><td className="py-2 pr-3">Respiratory secretions ("death rattle")</td><td className="py-2 pr-3">0.6–1.2 mg/24 h SC (PRN 200 microgram SC)</td><td className="py-2">Audible secretions reduced; also reposition and stop non-essential fluids</td></tr>
                    <tr><td className="py-2 pr-3 font-medium text-foreground">Levomepromazine</td><td className="py-2 pr-3">Nausea, refractory agitation/delirium</td><td className="py-2 pr-3">12.5–25 mg/24 h SC (PRN 6.25–12.5 mg SC)</td><td className="py-2">Nausea controlled or agitation settled; watch for hypotension</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Doses shown are for an opioid- and benzodiazepine-naïve adult with normal renal function; reduce in renal impairment (consider alfentanil or oxycodone if eGFR &lt;30) and in frailty. Patients already on ICU infusions need <strong>conversion, not restarting from scratch</strong>: calculate the 24 h IV dose, convert to the subcutaneous equivalent (IV morphine to SC morphine is approximately 1:1; IV midazolam to SC midazolam approximately 1:1; fentanyl/alfentanil converted using local equianalgesic tables), and set the syringe driver at that rate with additional PRN doses of one sixth of the 24 h dose. Review at least every 24 h, or sooner if two or more PRN doses are needed. <InlineRef topicId="prognostication-ethics-icu" refLabel="NICE NG31" /> <InlineRef topicId="prognostication-ethics-icu" refLabel="GMC 2022" />
              </p>
            </div>
            <CollapsibleSubsection title="Organ Donation after Death (DBD vs DCD)">
              <p className="text-sm text-muted-foreground mb-2">
                The decision to withdraw life-sustaining treatment must always be made <strong>independently of, and prior to</strong>, any
                consideration of organ donation — donation never influences the withdrawal decision itself
                <InlineRef topicId="prognostication-ethics-icu" refLabel="GMC 2022" />.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">DBD — donation after brainstem death</p>
                  <p className="text-xs text-muted-foreground mt-1">Retrieval proceeds after death is confirmed by neurological (brainstem) criteria while the heart is still beating. The donor remains ventilated and perfused until retrieval, so warm ischaemic time is minimal and more organs — including the heart — are usable.</p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">DCD — donation after circulatory death</p>
                  <p className="text-xs text-muted-foreground mt-1">Withdrawal of life-sustaining treatment precedes death, which is confirmed by circulatory criteria. A mandatory <strong>5-minute</strong> continuous observation of asystole/absent cardiac output is required before death is declared, followed by rapid retrieval. The resulting functional warm ischaemic time limits which organs remain viable (kidneys/liver more tolerant than heart/lungs).</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Maastricht categories</strong>: <strong>Controlled DCD (category III/IV)</strong> — death is anticipated after planned withdrawal of treatment (category III) or occurs after brainstem death testing has begun (IV); this is the predominant form of DCD in the UK. <strong>Uncontrolled DCD (category I/II)</strong> — unexpected cardiac arrest, either out of hospital and found dead (I) or with unsuccessful resuscitation (II); rare in UK practice.
              </p>
              <p className="text-sm text-muted-foreground">
                The <strong>specialist nurse for organ donation (SN-OD)</strong> should be referred to early whenever WLST or brainstem death is being considered. The SN-OD checks the Organ Donor Register, approaches the family jointly with the clinical team, coordinates retrieval logistics, and manages consent/authorisation under the UK "opt-out" (deemed consent) system — family involvement remains central even though consent is presumed
                <InlineRef topicId="prognostication-ethics-icu" refLabel="NHSBT Deceased Donation" />. Referral itself does not commit the family or clinical team to donation proceeding.
              </p>
            </CollapsibleSubsection>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="brainstem-death" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Diagnosing Death by Neurological Criteria (Brainstem Death)">
              <p className="text-sm text-muted-foreground mb-2">
                Death by neurological criteria (brainstem death, BSD) is the <strong>irreversible cessation of brainstem function</strong>, which is legally recognised as death throughout the UK
                <InlineRef topicId="prognostication-ethics-icu" refLabel="AoMRC DNC 2008" />.
              </p>
              <h3 className="text-base font-semibold text-foreground mb-1">Preconditions</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-2">
                <li>Fixed structural brain damage of known cause, consistent with irreversible loss of brainstem function.</li>
                <li>Patient is apnoeic and dependent on mechanical ventilation.</li>
                <li>Reversible causes of coma must be excluded: residual sedative/hypnotic drug effect and neuromuscular blockade, core temperature ≥34 °C, no significant metabolic, endocrine or acid–base derangement, and an adequate mean arterial pressure.</li>
              </ul>
              <h3 className="text-base font-semibold text-foreground mb-1">Clinical tests of brainstem reflexes</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-2">
                <li>Absent pupillary response to light.</li>
                <li>Absent corneal reflex.</li>
                <li>Absent oculovestibular reflex (caloric testing).</li>
                <li>Absent gag and cough reflex.</li>
                <li>No motor response within the cranial nerve territory to supraorbital pressure.</li>
              </ul>
              <h3 className="text-base font-semibold text-foreground mb-1">Apnoea test</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Pre-oxygenate, then disconnect from the ventilator with a starting PaCO₂ &gt;6.0 kPa and pH &lt;7.40. Observe for 5 minutes: the test is positive (confirms absent respiratory drive) if PaCO₂ rises by ≥0.5 kPa with no respiratory effort observed.
              </p>
              <h3 className="text-base font-semibold text-foreground mb-1">Procedural requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-2">
                <li>Two registered medical practitioners, each with &gt;5 years' post-registration experience, one of whom must be a consultant.</li>
                <li>Neither practitioner may be a member of the transplant team.</li>
                <li>Two complete sets of testing are performed (may be done together or sequentially); the legal time of death is recorded as the time of the <em>first</em> set that confirms death.</li>
                <li>Full documentation of preconditions, exclusions and both sets of tests is required.</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Diagnosing death by neurological criteria is a <strong>discrete legal and clinical act of confirming death</strong> — it is distinct from a decision to withdraw life-sustaining treatment (a best-interests decision made in a dying but living patient) and distinct from neurological <strong>prognostication</strong> after cardiac arrest (predicting future outcome in a patient who does not meet these strict diagnostic criteria).
              </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="pics" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Long-Term Outcomes & PICS">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Domain</th>
                    <th className="text-left py-2 text-foreground font-semibold">Manifestations</th>
                    <th className="text-left py-2 text-foreground font-semibold">Risk &amp; Prevalence</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Physical</td><td>ICU-AW (CIP/CIM), reduced exercise, fatigue, dysphagia, tracheal stenosis</td><td>25–50% of patients ventilated &gt;7 days. Risk: sepsis, MOF, steroids, NMB.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cognitive</td><td>Memory, executive function, processing speed</td><td>30–80% at hospital discharge. Delirium duration is strongest predictor.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Psychological</td><td>PTSD (10–50%), anxiety (30–40%), depression (25–30%)</td><td>Risk: delirium, benzodiazepines, frightening memories. PICS-F affects family.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground"><strong>ABCDEF bundle</strong>: Assess pain, Both SAT/SBT, Choice of analgesia/sedation, Delirium, Early mobility, Family. Reduces delirium, ICU-AW, ventilator days. NICE CG83 recommends structured rehabilitation assessment at ICU and ward discharge plus 2–3 months. ICU follow-up clinics with patient diaries reduce PTSD.</p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="triage" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="ICU Admission, Triage & Outreach">
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Priority</th>
                    <th className="text-left py-2 text-foreground font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">P1</td><td>Critically ill, unstable, high likelihood of recovery with ICU.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">P2</td><td>Need monitoring; may have comorbidities.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">P3</td><td>Reduced recovery probability — consider time-limited trial.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">P4</td><td>Generally not appropriate — too well or too sick.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mb-2"><strong>Frailty</strong> (CFS ≥5) predicts outcome better than age alone. Consultant-led decisions; treating teams can request, not demand. <strong>NEWS2 ≥5</strong> = urgent response. <strong>Critical Care Outreach (CCOT)</strong> reduces avoidable arrests and supports step-down. <strong>ICNARC CMP</strong> benchmarks UK units.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Level</th>
                    <th className="text-left py-2 text-foreground font-semibold">Care</th>
                    <th className="text-left py-2 text-foreground font-semibold">Nursing</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">L0</td><td>Ward</td><td>Standard</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">L1</td><td>At-risk / step-down</td><td>Enhanced</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">L2 (HDU)</td><td>Single organ support (not adv. resp)</td><td>1:2</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">L3 (ICU)</td><td>Adv. resp or ≥2 organ support</td><td>1:1</td></tr>
                </tbody>
              </table>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Ethical Principles Underpinning Triage</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { p: "Distributive justice", d: "Scarce ICU beds must be allocated fairly across the population, not merely to whoever asks first or shouts loudest." },
                { p: "Utility", d: "Aim to maximise overall benefit (lives saved, life-years, or quality-adjusted outcomes) from a finite resource." },
                { p: "Equity", d: "Access should not be influenced by factors irrelevant to clinical benefit — age alone, disability, or social status." },
                { p: "Respect for autonomy", d: "Patients (or their best-interests representatives) should be involved in decisions wherever possible, even when the overriding constraint is capacity." },
              ].map((x) => (
                <div key={x.p} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.p}</p>
                  <p className="text-xs text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              These principles sit alongside beneficence and non-maleficence <InlineRef topicId="prognostication-ethics-icu" refLabel="GMC 2022" /> and are the ethical justification for structured triage systems rather than ad hoc bed allocation.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Adjunctive Prioritisation Tools</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>SOFA</strong> and the <strong>Clinical Frailty Scale (CFS)</strong> are useful adjuncts that add objectivity to triage discussions — SOFA quantifies current organ dysfunction and trajectory, while CFS ≥5 identifies patients less likely to benefit from invasive organ support and more likely to suffer harm from it. Neither should be used in isolation: both are population-derived, can be inaccurate in individual patients (e.g. CFS is invalid in younger patients with a single disabling condition), and must be interpreted alongside the presenting illness, reversibility, comorbidity, and the patient's own wishes.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">The Triage Process</h3>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground mb-2">
              <li><strong>Senior decision-maker</strong>: triage decisions are made or countersigned by a consultant intensivist wherever possible — never delegated solely to trainees out of hours.</li>
              <li><strong>Transparency</strong>: criteria and reasoning should be explicit and, where possible, shared with the patient/family and referring team, not implicit or hidden.</li>
              <li><strong>Consistency</strong>: the same criteria should be applied to all patients regardless of who is asking or which speciality is referring, to avoid unwarranted variation.</li>
              <li><strong>Documentation</strong>: the decision, its rationale, and the information considered (including scores used only as adjuncts) must be recorded contemporaneously in the notes.</li>
              <li><strong>Second opinion</strong>: a mechanism for review by a second senior clinician should be available, particularly when a referring team disagrees with a decision to decline admission.</li>
            </ul>
            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Dynamic Re-Evaluation & Time-Limited Trials</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Triage is not a one-off gate at the ICU door: patients admitted under uncertainty should be managed with a <strong>time-limited trial</strong> of organ support (typically 24–72 h) with explicit, pre-agreed <strong>review points</strong> and success/failure criteria, so that the plan is revisited as new information (response to treatment, family discussion, further test results) emerges, rather than defaulting to indefinite escalation.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Pandemic / Surge Ethics</h3>
            <p className="text-sm text-muted-foreground mb-2">
              During pandemic surge, when demand for critical care may exceed supply, the ethical emphasis shifts from maximising benefit to the <em>individual</em> patient towards <strong>public-health utility</strong> — allocating resource to achieve the greatest overall benefit across the population, potentially including formal severity/frailty-based scoring to support triage committees rather than individual bedside clinicians. This is the approach set out in UK COVID-19 pandemic ethical guidance developed jointly by the BMA, FICM and Royal College of Physicians/RCUK bodies, which stresses that any such framework must remain transparent, consistent, subject to independent review, and must never discriminate on protected characteristics alone (e.g. age, disability) — CFS and SOFA can support but not replace individualised clinical judgement even under surge conditions.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Establishing a Ceiling of Care</h3>
            <p className="text-sm text-muted-foreground">
              Wherever possible, a <strong>ceiling of care</strong> should be established and documented before, or at the point of, ICU admission — clarifying which interventions (e.g. invasive ventilation, renal replacement therapy, CPR) are and are not appropriate given the patient's condition, comorbidities, and wishes. This should be discussed with the patient if they have capacity, or via best-interests discussion under the <InlineRef topicId="prognostication-ethics-icu" refLabel="Mental Capacity Act 2005" /> if not, and recorded on a treatment escalation plan/ReSPECT form so that decisions are not made reactively during deterioration.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <SynthesisBlock
            title="ICU Decision-Making Framework"
            subtitle="A pragmatic synthesis of when to escalate, when to limit, and how to communicate."
            variant="summary"
          >
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li><strong>Trial of treatment</strong>: time-limited (48–72 h) with explicit goals; formal re-review.</li>
              <li><strong>Best-interests (MCA 2005)</strong>: clinicians decide considering past wishes, values, family input.</li>
              <li><strong>Prognostic scores</strong>: validated for populations only — never sole basis for individual decisions.</li>
              <li><strong>Withdrawal vs withholding</strong>: ethically &amp; legally equivalent (UK case law).</li>
              <li><strong>Organ donation</strong>: refer SN-OD early when WLST/BSD considered — referral does not commit.</li>
              <li><strong>Conflict resolution</strong>: 2nd opinion → ethics → mediation → court.</li>
              <li><strong>Communication</strong>: separate prognosis and donation conversations; clear language.</li>
            </ul>
          </SynthesisBlock>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "APACHE II, SOFA and SAPS scores describe populations — never individual prognosis in isolation.",
              "Treatment escalation plans (TEPs) / ReSPECT documents should be reviewed on every ICU admission.",
              "Four principles: autonomy, beneficence, non-maleficence, justice — apply to escalation, withdrawal, resource allocation.",
              "Withdrawal of life-sustaining treatment is ethically and legally equivalent to withholding; second opinion + family/MDT consensus.",
              "PICS (post-intensive-care syndrome): physical, cognitive and psychological sequelae — affects up to 50% of survivors; offer follow-up.",
            ]}
          />
        </>
          <TopicFaqs faqs={prognosticationEthicsIcuFaqs} />
        </>
      }
    />
  );
};

export default PrognosticationEthicsIcuTopic;

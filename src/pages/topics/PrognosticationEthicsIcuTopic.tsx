import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { prognosticationIcuQuestions } from "@/data/quizzes";
import PostCardiacArrestProgDiagram from "@/components/diagrams/PostCardiacArrestProgDiagram";
import APACHEIICalculator from "@/components/diagrams/APACHEIICalculator";
import type { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
            <h3 className="text-lg font-semibold text-foreground mb-2">Post-Cardiac Arrest (ERC/ESICM 2021)</h3>
            <p className="text-sm text-muted-foreground mb-2">Multimodal at ≥72 h after ROSC (or rewarming if TTM). At least 2 concordant indicators: bilateral absent pupil + corneal reflexes; bilateral absent N20 SSEP; highly malignant EEG (suppression, burst-suppression); NSE &gt;60 µg/L; diffuse anoxic injury on MRI; absent brainstem reflexes.</p>
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
      }
    />
  );
};

export default PrognosticationEthicsIcuTopic;

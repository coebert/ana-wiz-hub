import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { QuizQuestion } from "@/components/QuizSection";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { InlineRef } from "@/components/InlineRef";

const endOfLifeCommunicationFaqs: Array<[string, string]> = [
  ["What is the SPIKES framework for breaking bad news?", "Setting up, Perception ('what do you understand?'), Invitation (how much do they want to know), Knowledge (information in chunks, warning shot), Empathy (acknowledge emotion), Strategy and Summary."],
  ["How should family meetings be structured in ICU?", "Pre-meeting team huddle, named clinician leader, quiet private space, introductions, summary of clinical picture, exploration of patient values, shared decision-making, agreed plan and documentation; offer follow-up."],
  ["What is the role of advance care planning in ICU?", "Advance decisions to refuse treatment (ADRT, valid and applicable under MCA 2005) and lasting power of attorney bind treatment decisions; ReSPECT forms guide but do not bind; always seek patient or representative input before withdrawal."],
];

const objectives = [
  "Describe the legal and ethical framework for end-of-life decision-making in UK ICU practice (MCA 2005, GMC, FICM/ICS).",
  "Apply structured communication tools (SPIKES, VALUE, NURSE) to break bad news and conduct family meetings.",
  "Plan and deliver compassionate withdrawal of life-sustaining treatment, including symptom control and family support.",
  "Recognise and manage conflict in end-of-life care using time-limited trials, second opinions, ethics referral and Court of Protection.",
  "Outline post-death duties: verification, coroner referral, bereavement, debrief and learning.",
];

const quiz: QuizQuestion[] = [
  {
    question:
      "During a family meeting on day 7 of ICU admission, the family of a patient with refractory septic shock asks 'are you giving up on her?' as you discuss withdrawal of life-sustaining treatment. Which response best reflects high-quality end-of-life communication?",
    options: [
      "'No — we are simply changing the goal of treatment from cure to comfort, because the treatments we have are no longer able to reverse her illness.'",
      "'Yes, unfortunately we have nothing more to offer.'",
      "'It is your decision, so let me know what you would like us to do.'",
      "'We will continue everything until she has a cardiac arrest.'",
    ],
    correctIndex: 0,
    explanation:
      "Best practice (GMC 'Treatment and care towards the end of life', FICM/ICS 'Care at the End of Life') is to reframe withdrawal as a change in goals of care — from disease-modifying treatment to comfort. Avoid the phrase 'withdrawal of care' (care is never withdrawn) and avoid placing the entire decision burden on the family; the decision is medical, made in the patient's best interests, with the family's view of the patient's wishes informing it.",
  },
  {
    question:
      "Which of the following is NOT a recognised component of the SPIKES protocol for breaking bad news?",
    options: [
      "Setting up the interview",
      "Assessing the patient/family's Perception",
      "Obtaining the patient/family's Invitation",
      "Prescribing sedation before disclosure",
    ],
    correctIndex: 3,
    explanation:
      "SPIKES = Setting, Perception, Invitation, Knowledge, Emotions/Empathy, Strategy/Summary. Pre-emptive sedation is not part of the protocol and may impair the family's ability to engage. Empathic responses (NURSE statements: Name, Understand, Respect, Support, Explore) are recommended.",
  },
];

const EndOfLifeCommunicationTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Family conference about withdrawal of life-sustaining treatment",
    scenario: "An 82-year-old with anoxic brain injury after cardiac arrest meets criteria for poor prognosis at 72 h. Plan a family meeting for shared decision-making about WLST.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Prepare: review prognostic markers (motor response ≤2, bilateral absent SSEP N20, EEG burst-suppression, NSE), consensus among ICU team and neurology, private room</li>
          <li>Use SPIKES: Setting, Perception, Invitation, Knowledge, Empathy, Strategy/Summary</li>
          <li>Frame decisions around the patient's previously expressed values and any advance care planning documents</li>
          <li>Offer time, second opinions, and chaplaincy; document Mental Capacity Act 2005 best-interests rationale and Court of Protection escalation if dispute persists</li>
          <li>Plan transition: palliative extubation pathway, family presence, anticipatory medication (opioid + benzodiazepine + antimuscarinic), bereavement support</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Premature prognostication &lt;72 h post-TTM (sedation, hypothermia confound exam)</li>
          <li>Asking the family to 'decide' rather than guiding a best-interests decision</li>
          <li>Withdrawing without symptom-management plan — distress to family and staff</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Structured SPIKES-based meeting after multimodal prognostication ≥72 h, best-interests framework under MCA 2005, with a clear palliative extubation and bereavement plan.",
    cites: ["FICM/ICS 2019", "GMC EoL", "NEJM 2007"],
  },
];

const EndOfLifeCommunicationTopic = () => {
  return (
    <TopicTemplate
      title="End-of-Life Care & Communication"
      subtitle="FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      keyPoints={[
        { text: "Decisions to limit treatment are medical, made in best interests; the family informs the team about the patient's wishes.", cites: ["Oncologist 2000"] },
        { text: "Avoid the phrase 'withdrawal of care' — it is a change in the goals of care to comfort.", cites: ["NEJM 2007"] },
        { text: "SPIKES structures bad news; VALUE structures family meetings (NEJM 2007 RCT — reduced bereavement PTSD).", cites: ["GMC EoL"] },
        { text: "A valid Advance Decision to Refuse Treatment (ADRT) is legally binding under the Mental Capacity Act 2005.", cites: ["FICM/ICS 2019"] },
        { text: "Doctrine of double effect: drugs given to relieve symptoms are lawful even if they may shorten life — NMBAs must NOT be used to mask distress.", cites: ["BJA Educ 2017"] },
        { text: "Two-consultant agreement and clear documentation are required (GMC).", cites: ["MCA 2005"] },
        { text: "Time-limited trials and clinical ethics referral resolve most conflict; the Court of Protection is a last resort.", cites: ["Oncologist 2000"] },
        { text: "Approximately 20% of UK ICU admissions die — most after withdrawal; competence in this is core, not optional.", cites: ["NEJM 2007"] },
        { text: "Offer organ donation referral (SNOD contact) before withdrawal in every potentially eligible patient.", cites: ["GMC EoL"] },
        { text: "Hot debrief within 24 h reduces moral distress and supports team wellbeing.", cites: ["FICM/ICS 2019"] },
      ]}
      topicId="end-of-life-communication"
      topicTitle="End-of-Life Care & Communication"
      workedExamples={EndOfLifeCommunicationTopicWorkedExamples}
      quizQuestions={quiz}
      sectionSources={{
        objectives: ["FICM/ICS 2019", "GMC EoL", "MCA 2005", "NEJM 2007"],
        keyPoints: ["FICM/ICS 2019", "GMC EoL", "NEJM 2007", "BJA Educ 2017", "Oncologist 2000", "MCA 2005"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 5.5", "EDIC 12"] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection
            id="context"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.5"]}
            className="scroll-mt-24"
          >
            <p className="text-muted-foreground leading-relaxed">
              Approximately one in five UK ICU admissions ends in death, and most of those deaths follow a decision to withdraw or withhold life-sustaining treatment. End-of-life care is therefore a core competency, not an exception. This topic covers the legal, ethical and communication framework expected of an intensivist, drawing on FICM/ICS <em>Care at the End of Life</em> (2019), GMC <em>Treatment and care towards the end of life</em>, and the EDIC syllabus (Domain 12).
            </p>
          </ExamSection>

          <ExamSection
            id="framework"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.5", "EDIC 12"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Decision-Making Framework</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Decisions to limit life-sustaining treatment are <strong>medical decisions</strong>, made in the patient's best interests when the patient lacks capacity. The family's role is to inform the team about what the patient would have wanted — not to make or veto the decision.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Step</th>
                    <th className="text-left py-2 text-foreground font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">1. Recognise dying</td><td>Trajectory of organ failure despite optimal therapy; failed escalation; multi-organ failure with poor reserve.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">2. Assess capacity</td><td>Mental Capacity Act 2005 — decision-specific. If lacking, proceed via best-interests process.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">3. Check for advance decisions</td><td>ADRT, LPA for health & welfare, ReSPECT form, DNACPR. Valid and applicable advance decisions are legally binding.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">4. Multidisciplinary review</td><td>Two consultants document agreement (GMC). Nursing, allied health, primary team, palliative care input.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">5. Family meeting</td><td>SPIKES structure. Confirm patient's known wishes. Explain change in goals of care.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">6. Implement & document</td><td>Stop disease-modifying treatments; intensify symptom control; offer organ donation referral; debrief team.</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection
            id="communication"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.5", "EDIC 12"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Communication Tools</h2>
            <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">SPIKES — Breaking Bad News</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li><strong>S</strong>etting — quiet room, tissues, mute pagers, all key family present, senior clinician + bedside nurse.</li>
              <li><strong>P</strong>erception — "Tell me what you understand about her condition so far."</li>
              <li><strong>I</strong>nvitation — "Would it help if I went through the medical picture in detail?"</li>
              <li><strong>K</strong>nowledge — warning shot ("I'm afraid I have difficult news"), then plain language, no jargon, short chunks.</li>
              <li><strong>E</strong>motions / Empathy — silence, NURSE statements (Name, Understand, Respect, Support, Explore).</li>
              <li><strong>S</strong>trategy / Summary — agreed plan, written summary, follow-up meeting.</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">VALUE — Family Meetings (Lautrette et al, NEJM 2007)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>V</strong>alue family statements · <strong>A</strong>cknowledge emotions · <strong>L</strong>isten · <strong>U</strong>nderstand the patient as a person · <strong>E</strong>licit questions. The original RCT showed reduced PTSD, anxiety and depression at 90 days in bereaved families.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Avoid Common Phrases</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>❌ "Withdrawing care" → ✅ "Changing the goals of care to comfort"</li>
              <li>❌ "There is nothing more we can do" → ✅ "We are now focused on her comfort and dignity"</li>
              <li>❌ "Do you want us to do everything?" → ✅ "Knowing her, what would she want us to focus on?"</li>
              <li>❌ "She failed treatment" → ✅ "The treatment did not work the way we hoped"</li>
            </ul>
          </ExamSection>

          <ExamSection
            id="withdrawal"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.5"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Withdrawal of Life-Sustaining Treatment</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="font-semibold text-foreground text-sm mb-1">Before withdrawal</p>
                <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground">
                  <li>Stop neuromuscular blockers — must wear off before extubation</li>
                  <li>Stop unnecessary monitoring, blood tests, imaging</li>
                  <li>Prescribe anticipatory medications (opioid, benzodiazepine, anti-secretory, anti-emetic)</li>
                  <li>Offer presence to family; explain what they will see</li>
                  <li>Consider organ donation referral (SNOD)</li>
                  <li>Move to side room if possible</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="font-semibold text-foreground text-sm mb-1">During withdrawal</p>
                <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground">
                  <li>Wean vasopressors and ventilation in parallel — pace to comfort, not protocol</li>
                  <li>Treat distress proactively (morphine 2.5–10 mg IV, midazolam 2.5–5 mg IV titrated)</li>
                  <li>Doctrine of double effect: comfort dose is lawful even if it shortens life</li>
                  <li>Do NOT use neuromuscular blockers to mask distress</li>
                  <li>Stay at bedside; offer family time alone</li>
                  <li>Confirm death; offer bereavement information; debrief team</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <ExamSection
            id="conflict"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.5", "EDIC 12"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Managing Conflict</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Conflict in ICU end-of-life care is common (incidence ~30%). It usually arises from prognostic uncertainty, poor communication, mistrust, or value differences — not from genuine ethical disagreement.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li><strong>Acknowledge & explore</strong> — "Help me understand your concerns."</li>
              <li><strong>Time-limited trial</strong> of treatment with explicit endpoints (e.g. 48–72 h escalation; if no improvement, transition to comfort).</li>
              <li><strong>Second opinion</strong> from another consultant intensivist.</li>
              <li><strong>Clinical ethics committee</strong> referral for unresolved disagreement.</li>
              <li><strong>Court of Protection</strong> as last resort (e.g. Charlie Gard, Alfie Evans, Re Y).</li>
              <li><strong>Cultural/religious chaplaincy</strong> — invite early, not as a last resort.</li>
            </ul>
          </ExamSection>

          <ExamSection
            id="symptoms"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.5"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Symptom Control at End of Life
              <InlineRef topicId="end-of-life-communication" refLabel="FICM/ICS 2019" />
              <InlineRef topicId="end-of-life-communication" refLabel="GMC EoL" />
              <InlineRef topicId="end-of-life-communication" refLabel="BJA Educ 2017" />
            </h2>
            <p className="text-xs text-muted-foreground mb-3 italic">
              Symptom thresholds and drug doses adapted from FICM/ICS <em>Care at the End of Life</em> (2019), GMC end-of-life guidance, and BJA Education 2017 review on withdrawal of life-sustaining therapy.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Symptom</th>
                    <th className="text-left py-2 text-foreground font-semibold">First-line</th>
                    <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Pain / dyspnoea</td><td>Morphine 2.5–10 mg IV PRN; infusion 10–30 mg/24 h SC</td><td>Halve dose in renal failure; use oxycodone or fentanyl if eGFR &lt; 30.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Agitation / distress</td><td>Midazolam 2.5–5 mg IV; 10–60 mg/24 h SC</td><td>Levomepromazine if delirium-related agitation.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Respiratory secretions</td><td>Glycopyrronium 200–400 µg SC; hyoscine butylbromide</td><td>Reposition; reduce IV fluids; warn family secretions are usually not distressing to the patient.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Nausea</td><td>Haloperidol 0.5–1.5 mg SC; cyclizine 50 mg SC</td><td>Avoid metoclopramide if bowel obstruction.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Refractory distress</td><td>Palliative sedation — midazolam infusion titrated to comfort</td><td>Distinct from euthanasia: intent is symptom relief, not death (doctrine of double effect).</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection
            id="after-death"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.5"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">After Death</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li><strong>Verify death</strong> (no pulse + no respiration + fixed pupils + no response for 5 min); document clearly.</li>
              <li><strong>Coroner referral</strong> — unexpected, traumatic, peri-operative within 30 days, suspected industrial disease, custody.</li>
              <li><strong>Medical Examiner</strong> review for all in-hospital deaths (England & Wales since 2024).</li>
              <li><strong>Bereavement</strong> — written information, follow-up letter or call at 4–8 weeks; consider bereavement clinic.</li>
              <li><strong>Team debrief</strong> — hot debrief within 24 h, cold debrief at 1–2 weeks; recognise moral distress and burnout risk.</li>
              <li><strong>Mortality & morbidity review</strong> — learning, not blame.</li>
            </ul>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Use SPIKES or similar framework for breaking bad news: Setting, Perception, Invitation, Knowledge, Empathy, Strategy.",
              "Distinguish withholding vs withdrawing — ethically equivalent; communicate as continuation of care, not 'giving up'.",
              "Symptom control: opioid + benzodiazepine + anticholinergic (e.g. glycopyrronium for secretions); titrate to comfort, not life-shortening.",
              "Cultural and spiritual factors: ask, do not assume; chaplaincy and family liaison are part of the team.",
              "Document discussions, plan and parties present; offer follow-up bereavement contact and team debrief.",
            ]}
          />
        </>
          <TopicFaqs faqs={endOfLifeCommunicationFaqs} />
        </>
      }
    />
  );
};

export default EndOfLifeCommunicationTopic;

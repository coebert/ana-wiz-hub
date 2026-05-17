import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { QuizQuestion } from "@/components/QuizSection";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Define the four ANTS categories (situation awareness, decision making, task management, team working) and their elements.",
  "Recognise common cognitive biases and fixation errors that contribute to ICU adverse events.",
  "Apply Crisis Resource Management principles in simulated and real ICU emergencies.",
  "Use structured tools (SBAR, SPIKES, STOP-5, PACE/CUSS, WHO checklist) to support safe communication and handover.",
  "Explain just culture, duty of candour and the NHS PSIRF approach to incident response.",
];

const quiz: QuizQuestion[] = [
  {
    question:
      "During a difficult intubation, the consultant continues with direct laryngoscopy despite three failed attempts and falling saturations. The trainee believes a videolaryngoscope or front-of-neck access is now indicated but says nothing. Which non-technical skill failure is most prominently demonstrated?",
    options: [
      "Loss of situation awareness by the consultant alone",
      "Failure of graded assertiveness / speaking up by the trainee",
      "Inadequate manual dexterity",
      "Lack of equipment availability",
    ],
    correctIndex: 1,
    explanation:
      "All four ANTS categories are relevant, but the immediate failure is the trainee not escalating concern. The PACE/CUSS graded assertiveness model (Probe → Alert → Challenge → Emergency, or Concern → Uncomfortable → Safety issue → Stop) is taught precisely for this scenario. Fixation error ('plan continuation bias') by the consultant is a parallel situation-awareness failure.",
  },
  {
    question:
      "Which of the following best describes a 'just culture' as applied to a serious incident in ICU?",
    options: [
      "Punishing the individual responsible to deter recurrence",
      "Treating all errors as system failures and never holding individuals accountable",
      "Distinguishing human error and at-risk behaviour (managed by support and system change) from reckless behaviour (managed by accountability)",
      "Conducting all reviews in private without the staff involved",
    ],
    correctIndex: 2,
    explanation:
      "A just culture (Reason; Marx) distinguishes inadvertent error and at-risk behaviour — addressed by system redesign, coaching and support — from reckless behaviour (conscious disregard of substantial risk), which warrants accountability. It is neither a 'no-blame' culture nor a punitive one. NHS England's Patient Safety Incident Response Framework (PSIRF, 2022) embeds this approach.",
  },
];

const NonTechnicalSkillsTopic = () => {
  return (
    <TopicTemplate
      title="Non-Technical Skills & Human Factors"
      subtitle="FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      keyPoints={[
        { text: "ANTS taxonomy: Situation awareness · Decision making · Task management · Team working — memorise for SOEs.", cites: ["BMJ 2000"] },
        { text: "Up to 70% of critical care adverse events are non-technical; competence is examinable and assessable.", cites: ["RCoA ANTS"] },
        { text: "Fixation error and plan continuation bias are the most cited cognitive failures in airway disasters (Bromiley case).", cites: ["BJA Educ 2003"] },
        { text: "PACE / CUSS provides graded assertiveness language to flatten authority gradients.", cites: ["BJA Educ 2018"] },
        { text: "Closed-loop communication and named role allocation are CRM cornerstones in any crisis.", cites: ["CHFG"] },
        { text: "Cognitive aids reduce error in low-frequency / high-stakes events — use them, don't rely on memory.", cites: ["Marx 2001"] },
        { text: "A just culture distinguishes error and at-risk behaviour (system response) from reckless behaviour (accountability).", cites: ["PSIRF 2022"] },
        { text: "Hot debriefs within 24 h support team wellbeing and learning; cold debriefs drive system change.", cites: ["BMJ 2000"] },
        { text: "The Swiss Cheese Model frames adverse events as system holes aligning — fix the system, not just the person.", cites: ["RCoA ANTS"] },
        { text: "Statutory duty of candour applies in England since 2014 — be open promptly when harm occurs.", cites: ["BJA Educ 2003"] },
      ]}
      topicId="non-technical-skills"
      topicTitle="Non-Technical Skills & Human Factors"
      quizQuestions={quiz}
      sectionSources={{
        objectives: ["BJA Educ 2003", "RCoA ANTS", "BJA Educ 2018"],
        keyPoints: ["BMJ 2000", "PSIRF 2022", "Marx 2001", "CHFG"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 5.4", "EDIC 11"] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
          <ExamSection
            id="context"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.4"]}
            className="scroll-mt-24"
          >
            <p className="text-muted-foreground leading-relaxed">
              Up to 70% of adverse events in critical care relate to non-technical rather than technical failures. The Royal College of Anaesthetists' <strong>ANTS</strong> framework, the <strong>SHEEP</strong> model of human factors, and Crisis Resource Management (CRM) principles are core to FFICM, EDIC and CCT-level practice. This topic frames the four ANTS categories, the cognitive traps that lead to error, and the team and organisational tools used to mitigate them.
            </p>
          </ExamSection>

          <ExamSection
            id="ants"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.4", "EDIC 11"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ANTS — Anaesthetists' Non-Technical Skills</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Developed at the University of Aberdeen for the Royal College of Anaesthetists; the four categories below are the canonical taxonomy used in FFICM/EDIC SOEs and workplace-based assessment.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Category</th>
                    <th className="text-left py-2 text-foreground font-semibold">Elements</th>
                    <th className="text-left py-2 text-foreground font-semibold">ICU example</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Situation awareness</td>
                    <td>Gathering information · recognising & understanding · anticipating</td>
                    <td>Spotting a rising lactate trend before haemodynamic collapse; mental model of where the patient is on their illness trajectory.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Decision making</td>
                    <td>Identifying options · balancing risks & selecting · re-evaluating</td>
                    <td>Choosing between further volume, vasopressor escalation, or RRT; setting time-limited trial endpoints.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Task management</td>
                    <td>Planning & preparing · prioritising · resource ID & utilisation · standards</td>
                    <td>WHO checklist before bedside tracheostomy; pre-briefing for prone positioning; cognitive aids for crisis algorithms.</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-foreground">Team working</td>
                    <td>Coordinating · exchanging information · using authority & assertiveness · supporting others</td>
                    <td>Closed-loop communication during peri-arrest; nominating roles in MET call; calling for help early.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection
            id="cognitive"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.4"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cognitive Errors & Bias</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
              <li><strong>Fixation error / plan continuation bias</strong> — sticking with an action plan when the situation has changed (the laryngoscopy example).</li>
              <li><strong>Confirmation bias</strong> — interpreting new data as confirming the working diagnosis.</li>
              <li><strong>Anchoring</strong> — over-weighting the first piece of information (the handover diagnosis).</li>
              <li><strong>Premature closure</strong> — accepting a diagnosis before fully verifying it.</li>
              <li><strong>Availability heuristic</strong> — recent or memorable cases bias the differential.</li>
              <li><strong>Authority gradient</strong> — junior team members fail to challenge the senior.</li>
              <li><strong>Cognitive overload</strong> — task saturation in a crisis impairs decision-making (Yerkes-Dodson curve).</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Mitigation: structured re-evaluation ("STEP back" — Stop, Think, Elaborate, Plan), cognitive aids (e.g. Vortex, ALS algorithm, OAA difficult airway), explicit verbalisation of the working diagnosis, deliberately seeking disconfirming evidence.
            </p>
          </ExamSection>

          <ExamSection
            id="crm"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.4", "EDIC 11"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Crisis Resource Management — Key Principles</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="font-semibold text-foreground text-sm mb-1">Team behaviours</p>
                <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground">
                  <li>Call for help early</li>
                  <li>Establish clear leadership; leader hands-off when possible</li>
                  <li>Nominate role allocation aloud (airway / circulation / drugs / scribe / runner)</li>
                  <li>Closed-loop communication ("adrenaline 1 mg IV given — confirmed")</li>
                  <li>Use names not pronouns; use SBAR for handover</li>
                  <li>Graded assertiveness: PACE (Probe → Alert → Challenge → Emergency)</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="font-semibold text-foreground text-sm mb-1">Cognitive behaviours</p>
                <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground">
                  <li>Use cognitive aids (don't rely on memory under stress)</li>
                  <li>Anticipate and plan ahead ("if this fails we will…")</li>
                  <li>Distribute workload — leader not task-saturated</li>
                  <li>Re-evaluate frequently ("10-second-for-10-minutes")</li>
                  <li>Mobilise all available resources (people, equipment, expertise)</li>
                  <li>Know your environment — equipment locations, switchboard codes</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <ExamSection
            id="sheep"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.4"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Human Factors — SHEEP Model</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              A useful framework (Chrimes / Bromiley) for analysing why competent clinicians make errors:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li><strong>S</strong>ystems — protocols, equipment design, IT, staffing levels</li>
              <li><strong>H</strong>uman interaction — communication, hierarchy, team dynamics</li>
              <li><strong>E</strong>nvironment — noise, lighting, interruptions, ergonomics</li>
              <li><strong>E</strong>quipment — usability, alarm fatigue, default settings</li>
              <li><strong>P</strong>ersonal — fatigue, stress, hunger, illness, cognitive bias (the "IM SAFE" check: Illness, Medication, Stress, Alcohol, Fatigue, Eating)</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Reason's <em>Swiss Cheese Model</em>: incidents occur when latent system holes line up with active human error. Effective interventions usually target the system layers, not the individual.
            </p>
          </ExamSection>

          <ExamSection
            id="briefing"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.4", "EDIC 11"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Briefing, Debriefing & Handover</h2>
            <div className="space-y-2">
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="font-semibold text-foreground text-sm">Pre-procedure brief</p>
                <p className="text-xs text-muted-foreground">WHO checklist (ICU adaptation), patient ID, planned procedure, anticipated difficulties, role allocation, equipment check, escalation plan.</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="font-semibold text-foreground text-sm">Hot debrief (within 24 h)</p>
                <p className="text-xs text-muted-foreground">Brief, structured (e.g. STOP-5: Summary, Things that went well, Opportunities to improve, Points to action, Responsibilities). Reduces moral distress; supports learning.</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="font-semibold text-foreground text-sm">Cold debrief / case review (1–2 weeks)</p>
                <p className="text-xs text-muted-foreground">Multidisciplinary, structured (e.g. PEARLS, Diamond, Plus-Delta), psychologically safe, action-oriented.</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="font-semibold text-foreground text-sm">Handover tools</p>
                <p className="text-xs text-muted-foreground">SBAR (Situation, Background, Assessment, Recommendation); ISBAR (adds Identification); ICU board rounds with daily goals (FAST-HUG-BID, ABCDEF bundle).</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection
            id="safety"
            exams={[Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 5.4"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Patient Safety & Incident Response</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li><strong>Just culture</strong> (Reason; Marx) — distinguish human error / at-risk / reckless behaviour. Neither blame-free nor punitive.</li>
              <li><strong>PSIRF</strong> (NHS England Patient Safety Incident Response Framework, 2022) — replaces SI framework; emphasises learning, proportionate response, family/staff involvement.</li>
              <li><strong>Duty of candour</strong> — statutory (England, since 2014); be open and honest when something goes wrong.</li>
              <li><strong>Datix / equivalent</strong> — incident reporting; NRLS, learn from incidents.</li>
              <li><strong>Speaking up</strong> — Freedom to Speak Up Guardians; PACE/CUSS scripts.</li>
              <li><strong>Second victim</strong> — clinicians involved in adverse events need active support; structured peer support programmes (e.g. RISE).</li>
            </ul>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "ANTS framework: situation awareness, decision making, task management, team working.",
              "Closed-loop communication: state the task, name the person, get verbal acknowledgement on completion.",
              "Cognitive aids (DAS, MH, anaphylaxis flowcharts) reduce omissions in crises — use them, do not rely on memory.",
              "Debrief after critical incidents — hot debrief immediately, cold debrief days later; focus on system, not individuals.",
              "Just culture: separate human error, at-risk behaviour and reckless conduct; reporting systems must feel safe.",
            ]}
          />
        </>
      }
    />
  );
};

export default NonTechnicalSkillsTopic;

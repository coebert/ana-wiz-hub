import type { CaseBankCase } from "./types";

const handoverStandard = {
  label: "FICM and ICS, GPICS V3, admission, discharge and handover standards",
  href: "https://www.ficm.ac.uk/gpics",
};

export const professionalPracticeCases: CaseBankCase[] = [
  {
    id: "icu-teaching-supervised-handover",
    title: "Teaching and supervising an ICU handover",
    category: "Professional practice",
    difficulty: "Intermediate",
    summary: "Agree a learning goal, observe the handover, intervene for safety and give feedback the learner can use next time.",
    topicIds: ["non-technical-skills", "critical-care-overview"],
    patient: "A patient recovering from respiratory failure is transferring to the ward. An ICU trainee asks to lead their first handover to the receiving team.",
    presentation: "You are the supervising clinician. The patient is ready for transfer and the ward nurse and doctor are present. The trainee has observed previous transfers but has never led one here.",
    stages: [
      {
        title: "Agree what to practise",
        prompt: "What will you agree with the trainee before the receiving team arrives?",
        answer: [
          "Ask what the trainee has done before and select an observable goal together. For example, ask them to communicate the follow-up plan and confirm who will act on pending results.",
          "Review the actual plan together. Explain that you will stay for the handover, how either of you can ask for help, and when you will take over. Match supervision to this learner, patient and task.",
        ],
      },
      {
        title: "Respond to an omission",
        prompt: "The trainee starts to leave without handing over a pending result that needs action. What do you do now?",
        answer: [
          "Pause the handover. Give the trainee a prompt if it is safe to do so, or supply the missing information yourself. Confirm with the receiving clinician who will review the result, when it is expected and how they will respond.",
          "Check that the written plan reflects what the teams agreed. The patient and receiving team need a complete handover before you move to the teaching conversation.",
        ],
      },
      {
        title: "Give feedback and follow up",
        prompt: "What would make the feedback specific enough to change the next handover?",
        answer: [
          "Ask the trainee what went well and what they would change. Describe the observed omission and its consequence. Recognise one effective action, such as involving the ward nurse.",
          "Agree one behaviour for next time: ask the receiver to confirm the owner and timing of each outstanding task. Arrange another observed handover and record the agreed learning point without identifiable patient details.",
        ],
      },
    ],
    detailedAnswer: [
      { title: "Supervised practice", content: "The supervisor stays responsible for safe oversight in this example. One observation provides formative evidence. Decisions about future supervision require the wider clinical context, evidence of performance and the training programme’s assessment process." },
    ],
    takeHome: "Agree a goal, watch the real task, address omissions while care is being handed over, then revisit one specific behaviour at the next observation.",
    sourceLinks: [
      { label: "RCoA curriculum, supervision and feedback", href: "https://www.rcoa.ac.uk/documents/2021-curriculum-cct-anaesthetics/supervision-feedback" },
      { label: "RCoA, supervised learning events", href: "https://www.rcoa.ac.uk/documents/2021-curriculum-assessment-guidance/supervised-learning-events-sles" },
      handoverStandard,
    ],
  },
  {
    id: "icu-quality-improvement-handover",
    title: "Leading a quality-improvement project on ICU discharge handover",
    category: "Professional practice",
    difficulty: "Intermediate",
    summary: "Define a safety problem with ward staff, test a change on a small scale and interpret outcomes, process measures and unintended effects.",
    topicIds: ["icu-discharge-planning", "non-technical-skills"],
    patient: "After an ICU discharge, a pending result has no named reviewer. The ward doctor identifies the omission and contacts ICU.",
    presentation: "The teams confirm a reviewer and follow-up plan for this patient. In a fictional baseline sample of 20 consecutive transfers with outstanding results, 12 handovers named who would review them.",
    stages: [
      {
        title: "Set an aim with the team",
        prompt: "How would you turn the near miss into a measurable improvement project?",
        answer: [
          "Follow the local incident-learning process for the near miss. Bring ward and ICU nurses and doctors together to map where responsibility is lost. Ask staff and patients what useful handover information looks like.",
          "Define the denominator as ICU discharges with a pending result. For this exercise, the team chooses a local aim of increasing named reviewers from 60% to 90% over eight weeks. Agree how to count cases and missing documentation before starting.",
        ],
      },
      {
        title: "Run a first test",
        prompt: "What is a manageable first test, and how will you know whether it helped?",
        answer: [
          "In a Plan–Do–Study–Act cycle, predict what adding a named-reviewer prompt will change. Test it on one shift with the receiving team and record what actually happened.",
          "Track the proportion with a named reviewer as the process measure. Check the proportion of results reviewed by the agreed time as an outcome, and monitor time spent on handover as a balancing measure. Define how each will be collected.",
        ],
      },
      {
        title: "Interpret and adapt",
        prompt: "Four of the first five handovers name a reviewer, but two results are reviewed late. Should the unit roll the change out?",
        answer: [
          "The small sample and persistent delays warrant further testing. Ask whether the named reviewer received the handover and could access the result. Check whether workload shifted to a different team.",
          "Adapt the test with the ward, repeat it across different shifts and plot weekly measures over time. Agree who owns ongoing measurement and how staff can flag problems before expanding a change that works consistently.",
        ],
      },
    ],
    detailedAnswer: [
      { title: "What the sources establish", content: "GPICS calls for a standardised handover on discharge from ICU. The target percentage, time window, test design and sample data in this case were chosen for teaching. In practice the local team agrees its aim and measurements with the people affected." },
    ],
    takeHome: "Make the current patient safe, then test whether the revised handover reliably results in timely follow-up without an unacceptable burden.",
    sourceLinks: [
      handoverStandard,
      { label: "FICM, quality improvement project guidance", href: "https://www.ficm.ac.uk/standardssafetyguidelinesclinicalquality/quality-improvement" },
      { label: "RCoA, Raising the Standards quality improvement compendium", href: "https://www.rcoa.ac.uk/safety-standards-quality/quality-improvement/raising-standards-rcoa-quality-improvement-compendium" },
      { label: "NHS handbook of quality and service improvement tools, section 5.2", href: "https://www.england.nhs.uk/wp-content/uploads/sites/44/2017/11/the_handbook_of_quality_and_service_improvement_tools_2010-2.pdf" },
    ],
  },
];

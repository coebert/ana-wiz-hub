import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { DkaDiagnosisTeaching, DkaFluidsTeaching, DkaInsulinPotassiumTeaching, DkaResolutionTeaching, DkaSpecialTeaching } from "@/components/topic/DkaTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "Which combination meets the JBDS 2023 biochemical criteria for DKA?", options: ["Glucose >11 mmol/L alone", "Ketonaemia >3.0 mmol/L with glucose >11.0 mmol/L or known diabetes, plus bicarbonate <15.0 mmol/L and/or venous pH <7.3", "Any hyperglycaemia with a positive urine dipstick", "Lactate >4 mmol/L with hyperglycaemia"], correctIndex: 1, explanation: "JBDS 2023 requires ketonaemia, hyperglycaemia or known diabetes, and acidosis. Glucose alone never diagnoses DKA." },
  { question: "Why are blood ketones preferred over urine ketones when monitoring DKA treatment?", options: ["Urine tests cannot detect any ketone body", "Blood beta-hydroxybutyrate tracks the current state; urine acetoacetate lags and can appear to worsen as treatment converts beta-hydroxybutyrate to acetoacetate", "Blood tests are cheaper", "Urine ketones rise only after resolution"], correctIndex: 1, explanation: "The French expert panel (Jung 2019) recommends capillary blood ketones for diagnosis; the same logic applies to monitoring the trend." },
  { question: "Admission potassium is 3.1 mmol/L in confirmed DKA. What does the 2024 international consensus advise?", options: ["Start fixed-rate insulin immediately at 0.1 units/kg/h", "Give bicarbonate to raise the potassium", "Begin potassium replacement at 10 mmol/h and delay insulin until potassium exceeds 3.5 mmol/L", "Restrict fluids until potassium normalises"], correctIndex: 2, explanation: "Insulin drives potassium intracellularly; giving it to a hypokalaemic patient risks life-threatening arrhythmia and respiratory-muscle weakness." },
  { question: "Glucose falls to 12 mmol/L but ketones remain 2.5 mmol/L. What should happen?", options: ["Stop the insulin infusion", "Add dextrose-containing fluid and reduce the insulin rate rather than stopping it", "Switch to subcutaneous insulin immediately", "Double the insulin rate"], correctIndex: 1, explanation: "Insulin treats the ketosis. The 2024 consensus: add 5-10% dextrose and reduce the infusion to 0.05 units/kg/h once glucose is below 13.9 mmol/L." },
  { question: "By JBDS 2023, when has DKA resolved?", options: ["When glucose is below 11 mmol/L", "When bicarbonate exceeds 18 mmol/L", "When ketones are <0.6 mmol/L AND venous pH >7.3 — bicarbonate should not be used as the marker", "When the patient feels better"], correctIndex: 2, explanation: "JBDS explicitly warns against using bicarbonate at this stage. The 2024 consensus accepts bicarbonate ≥18 mmol/L as an alternative — a wording difference worth knowing." },
];

export default function DkaTopic() {
  return <TopicTemplate title="Diabetic Ketoacidosis (DKA)" subtitle="Primary / Final / FFICM / EDIC — Endocrine Emergencies" backPath="/intensive-care/icu-endocrine-emergencies" backLabel="Endocrine Emergencies" accentColor="text-icu" topicId="dka" topicTitle="Diabetic Ketoacidosis (DKA)"
    objectives={["Apply the JBDS 2023 biochemical criteria and measure blood rather than urine ketones", "Sequence fluid resuscitation and weigh the balanced-crystalloid evidence", "Run fixed-rate insulin safely with potassium-guided replacement", "Apply the JBDS resolution criteria and manage the transition off intravenous insulin", "Recognise euglycaemic DKA and the perioperative SGLT2 inhibitor risk"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["JBDS DKA 2023", "DKA potassium safety 2024", "JBDS DKA resolution 2023"], keyPoints: ["JBDS DKA 2023", "SMART/SALT-ED DKA 2020", "DKA glucose support 2024", "DKA euglycaemia consensus 2024"] }}
    keyPoints={[
      { text: "Diagnosis needs ketonaemia >3.0 mmol/L, glucose >11.0 mmol/L or known diabetes, and acidosis — never glucose alone", cites: ["JBDS DKA 2023"] },
      { text: "Balanced crystalloids shortened time to DKA resolution versus saline in the SMART/SALT-ED subgroup analysis", cites: ["SMART/SALT-ED DKA 2020"] },
      { text: "If potassium is below 3.5 mmol/L, replace potassium first and delay insulin", cites: ["DKA potassium safety 2024"] },
      { text: "Resolution is ketones <0.6 mmol/L AND venous pH >7.3; do not use bicarbonate as the marker", cites: ["JBDS DKA resolution 2023"] },
      { text: "About 10% of DKA is euglycaemic — SGLT2 inhibitors are a leading trigger", cites: ["DKA euglycaemia consensus 2024"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">These lessons adopt the JBDS 2023 adult DKA guideline as the UK framework, with the 2024 international consensus report quoted where the two differ, and the SMART/SALT-ED subgroup analysis for the fluid-choice evidence. Quotations are the sources' own wording; surrounding explanation is teaching synthesis, not patient-specific prescription. Return to <Link to="/intensive-care/icu-endocrine-emergencies" className="text-primary underline">Endocrine Emergencies</Link> for HHS, thyroid storm and adrenal crisis.</p>
      <ExamSection id="dka-diagnosis" exams={exams}><CollapsibleSubsection title="Diagnosis and severity assessment" defaultOpen><DkaDiagnosisTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="dka-fluids" exams={exams}><CollapsibleSubsection title="Fluid resuscitation and the balanced-crystalloid evidence"><DkaFluidsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="dka-insulin-potassium" exams={exams}><CollapsibleSubsection title="Fixed-rate insulin and potassium safety"><DkaInsulinPotassiumTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="dka-resolution" exams={exams}><CollapsibleSubsection title="Resolution criteria and transition off intravenous insulin"><DkaResolutionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="dka-special" exams={exams}><CollapsibleSubsection title="Euglycaemic DKA, SGLT2 inhibitors and escalation"><DkaSpecialTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}

import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { AlkalosisMechanismsTeaching, AlkalosisAssessmentTeaching, AlkalosisCausesTeaching, AlkalosisTreatmentTeaching, AlkalosisSafetyTeaching } from "@/components/topic/MetabolicAlkalosisTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  { question: "Can metabolic alkalosis coexist with a normal measured pH?", options: ["No, alkalosis always means pH above 7.45", "Yes, another primary disorder can offset its effect", "Only when bicarbonate is low", "Only after dialysis"], correctIndex: 1, explanation: "Alkalosis describes a process; alkalaemia describes the final pH. Opposing primary disturbances can leave a normal pH." },
  { question: "After vomiting stops, which factors can maintain alkalosis?", options: ["Chloride and potassium depletion with volume-related renal retention", "Normal renal bicarbonate excretion alone", "A low bicarbonate level", "An isolated normal pH"], correctIndex: 0, explanation: "Generation and maintenance differ. Chloride/potassium deficits and volume contraction can prevent renal correction after gastric losses stop." },
  { question: "Urine chloride is high during active loop-diuretic treatment. What is the best interpretation?", options: ["Mineralocorticoid excess is proven", "The patient must be volume expanded", "Interpret renal chloride loss alongside drug timing, blood pressure and volume status", "Give saline regardless of fluid balance"], correctIndex: 2, explanation: "A urine chloride result is contextual. Active diuretics can cause renal chloride loss; the result alone does not establish an endocrine diagnosis or fluid order." },
  { question: "What may occur after ventilation lowers PaCO₂ in chronic hypercapnia?", options: ["Instant reversal of renal adaptation", "Post-hypercapnic metabolic alkalosis", "Guaranteed metabolic acidosis", "No change in pH"], correctIndex: 1, explanation: "Renal adaptation can persist after PaCO₂ falls; the review describes reversal over 3–5 days, subject to concurrent deficits and illness." },
  { question: "What does the BJA review say about acetazolamide and ventilation duration in the cited trial?", options: ["It guaranteed faster weaning", "A lower bicarbonate proves survival benefit", "It did not show a shorter duration of mechanical ventilation", "It replaces all electrolyte correction"], correctIndex: 2, explanation: "Biochemical improvement is distinct from a proven patient-important outcome such as shorter ventilation." },
];

export default function MetabolicAlkalosisTopic() {
  return <TopicTemplate title="Metabolic Alkalosis" subtitle="Primary / Final / FFICM / EDIC — Acid-Base Disorders" backPath="/intensive-care/acid-base" backLabel="Acid-Base Disorders" accentColor="text-icu" topicId="metabolic-alkalosis" topicTitle="Metabolic Alkalosis"
    objectives={["Distinguish metabolic alkalosis from alkalaemia and identify mixed disorders", "Explain generation, renal maintenance, chloride depletion and potassium deficiency", "Interpret urine chloride alongside volume status, blood pressure and diuretic timing", "Recognise post-hypercapnic alkalosis and tailor treatment to the underlying mechanism", "Separate biochemical correction from proven outcome benefits and recognise escalation needs"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["BJA 2023 definition", "BJA 2023 maintenance", "Core 2022 urine chloride", "BJA 2023 treatment"] }}
    keyPoints={[
      { text: "Metabolic alkalosis can coexist with a normal or low pH when another primary disturbance is present", cites: ["BJA 2023 mixed disorders"] },
      { text: "Volume, chloride and potassium deficits can maintain alkalosis after the generating event has ended", cites: ["BJA 2023 maintenance", "Core 2022 potassium"] },
      { text: "Volume-contracted chloride-responsive alkalosis often responds to 0.9% saline; potassium chloride addresses concomitant hypokalaemia", cites: ["BJA 2023 chloride", "BJA 2023 potassium"] },
      { text: "Acetazolamide's biochemical effect must not be presented as a proven reduction in ventilation duration", cites: ["BJA 2023 acetazolamide"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">Metabolic alkalosis commonly forms part of a mixed ICU acid–base disturbance. These lessons use Park and Sidebotham's BJA Education review (2023), with verified short quotations in the source popovers, and the AJKD Core Curriculum review (2022) for renal diagnostic detail. Practical assessment sequences are teaching synthesis, not patient-specific prescriptions. Return to <Link to="/intensive-care/acid-base" className="text-primary underline">Acid-Base Disorders</Link> for the wider interpretation framework.</p>
      <ExamSection id="alkalosis-mechanisms" exams={exams}><CollapsibleSubsection title="Definition, generation and renal maintenance" defaultOpen><AlkalosisMechanismsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="alkalosis-assessment" exams={exams}><CollapsibleSubsection title="Assessment, urine chloride and mixed disorders"><AlkalosisAssessmentTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="alkalosis-causes" exams={exams}><CollapsibleSubsection title="Common causes and post-hypercapnic alkalosis"><AlkalosisCausesTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="alkalosis-treatment" exams={exams}><CollapsibleSubsection title="Treatment matched to mechanism and evidence"><AlkalosisTreatmentTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="alkalosis-safety" exams={exams}><CollapsibleSubsection title="Clinical harms, reassessment and escalation"><AlkalosisSafetyTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { HomeostasisTeaching, FeedbackLoopsTeaching, OrganSystemsTeaching } from "@/components/topic/PhysiologyOverviewTeaching";

const exams = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM];
const quiz = [
  { question: "What is a set point?", options: ["The exact value a variable must hold", "The physiological value around which the normal range fluctuates", "The maximum value a variable can reach", "The value measured by a sensor"], correctIndex: 1, explanation: "OpenStax: a set point is the physiological value around which the normal range fluctuates; the body defends a range, not one number." },
  { question: "In a negative feedback loop, what does the effector do?", options: ["Monitors the physiological value", "Compares the value with the normal range", "Causes a change that returns the value to the normal range", "Amplifies the original deviation"], correctIndex: 2, explanation: "The sensor monitors, the control centre compares, and the effector acts to reverse the deviation." },
  { question: "Which of these is a normal positive feedback loop?", options: ["The baroreflex", "Control of blood glucose by insulin", "Oxytocin release during labour", "Thermoregulation by sweating"], correctIndex: 2, explanation: "Positive feedback intensifies change and is normal only with a definite end point — childbirth and the response to blood loss are the textbook examples." },
  { question: "Why is positive feedback dangerous when it has no end point?", options: ["It uses too much energy", "It becomes a vicious cycle of decompensation", "It switches off the control centre", "It only works in children"], correctIndex: 1, explanation: "Without a built-in stop, each change triggers more of the same change — for example falling cardiac output reducing coronary perfusion and weakening the heart further." },
  { question: "How does OpenStax define an organ system?", options: ["A single organ with one function", "A group of organs that work together to perform major functions or meet physiological needs", "Any tissue that secretes hormones", "The organs within one body cavity"], correctIndex: 1, explanation: "An organ system is a group of organs working together; assignment can be imprecise because organs such as the pancreas serve more than one system." },
];

export default function PhysiologyOverviewTopic() {
  return <TopicTemplate title="Physiology Overview: Homeostasis, Feedback & Organ Systems" subtitle="Primary / Final / FFICM — Basic Sciences" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology" topicId="physiology-overview" topicTitle="Physiology Overview: Homeostasis, Feedback & Organ Systems"
    objectives={["Define homeostasis, set point and normal range", "Describe the sensor, control centre and effector of a negative feedback loop", "Contrast negative and positive feedback with physiological examples", "Explain why positive feedback without an end point becomes a vicious cycle", "Name the organ systems and trace one variable across several systems"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["OpenStax set point", "OpenStax negative feedback", "OpenStax positive feedback", "OpenStax organ system"] }}
    keyPoints={[
      { text: "Homeostasis means continuously monitoring internal conditions and defending a normal range around a set point", cites: ["OpenStax monitoring", "OpenStax set point"] },
      { text: "Negative feedback reverses a deviation from the set point and runs throughout the body at all times", cites: ["OpenStax negative feedback"] },
      { text: "A feedback loop needs a sensor, a control centre and an effector", cites: ["OpenStax sensor", "OpenStax effector"] },
      { text: "Positive feedback intensifies change and is normal only when there is a definite end point", cites: ["OpenStax positive feedback", "OpenStax positive endpoint"] },
      { text: "An organ system is a group of organs working together; homeostasis is a property of the whole body", cites: ["OpenStax organ system"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">This page is the frame for the whole physiology section: what homeostasis is, how feedback loops defend it, and how the organ systems divide the work. Quotations are word for word from the openly licensed OpenStax Anatomy and Physiology 2e textbook (CC BY 4.0); the clinical examples are teaching reasoning, not quoted guidelines.</p>
      <ExamSection id="homeostasis" exams={exams}><CollapsibleSubsection title="Homeostasis and set points" defaultOpen><HomeostasisTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="feedback-loops" exams={exams}><CollapsibleSubsection title="Feedback loops: negative and positive"><FeedbackLoopsTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="organ-systems" exams={exams}><CollapsibleSubsection title="Organ systems working together"><OrganSystemsTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}

import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { ThyroidStormRecognitionTeaching, ThyroidStormHormoneTeaching, ThyroidStormSupportTeaching, ThyroidStormPeriopTeaching } from "@/components/topic/ThyroidStormTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  {"question": "Which feature makes thyroid storm a clinical rather than a laboratory diagnosis?", "options": ["Free T4 is always above 100 pmol/L", "Hormone levels overlap with uncomplicated thyrotoxicosis, so organ dysfunction defines storm", "TSH is normal in storm", "Storm can only be diagnosed after a Synacthen test"], "correctIndex": 1, "explanation": "Storm is defined by decompensation (fever, cardiac, gut-liver and CNS dysfunction), supported by the Burch–Wartofsky score, not by a hormone threshold."},
  {"question": "A Burch–Wartofsky score of 50 suggests:", "options": ["Storm is unlikely", "Impending storm", "Thyroid storm is highly likely", "Myxoedema coma"], "correctIndex": 2, "explanation": "As reproduced in JTA/JES 2016: ≥45 highly suggestive, 25–44 impending, <25 unlikely."},
  {"question": "Why does the ATA advise giving the antithyroid drug at least 1 hour before iodide?", "options": ["Iodide inactivates thionamides", "To prevent the gland using iodide to make more hormone (organification)", "Iodide causes hypotension", "To allow beta-blockers to work first"], "correctIndex": 1, "explanation": "JTA/JES gives them together; the ATA sequence protects against iodide being used as substrate."},
  {"question": "Which antipyretic does JTA/JES recommend in thyroid storm?", "options": ["Aspirin", "Ibuprofen", "Paracetamol (acetaminophen) with mechanical cooling", "None — fever should not be treated"], "correctIndex": 2, "explanation": "Aspirin and some anti-inflammatory drugs may raise free thyroid hormone by displacing it from binding proteins."},
  {"question": "When does JTA/JES suggest considering therapeutic plasmapheresis?", "options": ["As first-line treatment", "If there is no clinical improvement within 24–48 hours of appropriate standard treatment", "Only in pregnancy", "Never"], "correctIndex": 1, "explanation": "It is a weak recommendation based on low-quality evidence, reserved for failure of standard multimodal therapy."},
];

export default function ThyroidStormTopic() {
  return <TopicTemplate title="Thyroid Storm" subtitle="Final / FFICM / EDIC \u2014 Endocrine Emergencies" backPath="/intensive-care/icu-endocrine-emergencies" backLabel="Endocrine Emergencies" accentColor="text-icu" topicId="thyroid-storm" topicTitle="Thyroid Storm"
    objectives={["Recognise thyroid storm clinically and use the Burch–Wartofsky score appropriately", "Sequence antithyroid drugs and iodide, and explain the ATA vs JTA/JES timing difference", "Use beta-blockade, corticosteroids and cooling safely", "Know when to consider plasmapheresis", "Prevent and manage perioperative storm"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["JTA storm multimodal 2016", "JTA storm ATA iodide timing 2016"], keyPoints: ["JTA storm mortality 2016", "JTA storm multimodal 2016", "JTA storm ATA iodide timing 2016", "JTA storm beta-blockade 2016", "JTA storm corticosteroids 2016"] }}
    keyPoints={[
      { text: "Thyroid storm still carries about 11% mortality in the Japanese national survey", cites: ["JTA storm mortality 2016"] },
      { text: "Treat with a multimodal approach: antithyroid drug, iodide, corticosteroid, beta-blocker and antipyretic", cites: ["JTA storm multimodal 2016"] },
      { text: "The ATA advises iodide at least 1 hour after the antithyroid drug; JTA/JES advises giving them together", cites: ["JTA storm ATA iodide timing 2016"] },
      { text: "JTA/JES prefers beta-1-selective drugs such as landiolol, esmolol or bisoprolol for tachycardia", cites: ["JTA storm beta-blockade 2016"] },
      { text: "Hydrocortisone about 300 mg a day is given regardless of the cause", cites: ["JTA storm corticosteroids 2016"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">These lessons adopt the 2016 JTA/JES thyroid storm guideline, with the 2016 ATA guideline quoted where the two differ. Quotations are the sources' own wording; surrounding explanation is teaching synthesis, not patient-specific prescription. Return to <Link to="/intensive-care/icu-endocrine-emergencies" className="text-primary underline">Endocrine Emergencies</Link> for the other endocrine emergencies.</p>
      <ExamSection id="storm-recognition" exams={exams}><CollapsibleSubsection title="Recognition, scoring and triggers" defaultOpen><ThyroidStormRecognitionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="storm-hormone" exams={exams}><CollapsibleSubsection title="Blocking synthesis and release: thionamides and iodide"><ThyroidStormHormoneTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="storm-support" exams={exams}><CollapsibleSubsection title="Beta-blockade, steroids, cooling and plasmapheresis"><ThyroidStormSupportTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="storm-periop" exams={exams}><CollapsibleSubsection title="Perioperative prevention and management"><ThyroidStormPeriopTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}

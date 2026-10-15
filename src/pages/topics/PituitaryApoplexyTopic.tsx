import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { Exam } from "@/data/curriculum";
import { ApoplexyRecognitionTeaching, ApoplexySteroidTeaching, ApoplexySurgeryTeaching } from "@/components/topic/PituitaryApoplexyTeaching";

const exams = [Exam.FINAL, Exam.FFICM, Exam.EDIC];
const quiz = [
  {"question": "What is the investigation of choice for suspected pituitary apoplexy?", "options": ["Lumbar puncture", "MRI", "Skull X-ray", "Visual evoked potentials"], "correctIndex": 1, "explanation": "CT is used if MRI is contraindicated or unavailable."},
  {"question": "Which is NOT a listed indication for empirical steroids in pituitary apoplexy?", "options": ["Haemodynamic instability", "Altered consciousness", "Severe visual field defects", "Isolated mild headache with normal vision and observations"], "correctIndex": 3, "explanation": "The indications are haemodynamic instability, altered consciousness, reduced visual acuity and severe visual field defects."},
  {"question": "Which intravenous hydrocortisone regimen does the Society for Endocrinology give for apoplexy?", "options": ["100 mg once only", "100–200 mg IV bolus then 2–4 mg per hour infusion", "300 mg then 100 mg 8-hourly", "50 mg orally twice daily"], "correctIndex": 1, "explanation": "An IM alternative is 100 mg then 50–100 mg every 6 hours."},
  {"question": "Which visual sign is most typical of chiasmal compression?", "options": ["Central scotoma in one eye", "Bitemporal hemianopia", "Homonymous hemianopia", "Papilloedema alone"], "correctIndex": 1, "explanation": "The optic chiasm sits above the pituitary; crossing nasal fibres serving both temporal fields are compressed."},
  {"question": "What does the 2011 UK guideline say about surgery for most patients?", "options": ["Surgery is always required within 24 hours", "Surgery is never indicated", "Apart from worsening neurology, it is unclear whether surgical or conservative management gives the best outcome", "Conservative management has been proven superior"], "correctIndex": 2, "explanation": "Evidence is observational; early surgery is favoured for severe or deteriorating visual or neurological signs."},
];

export default function PituitaryApoplexyTopic() {
  return <TopicTemplate title="Pituitary Apoplexy" subtitle="Final / FFICM / EDIC \u2014 Endocrine Emergencies" backPath="/intensive-care/icu-endocrine-emergencies" backLabel="Endocrine Emergencies" accentColor="text-icu" topicId="pituitary-apoplexy" topicTitle="Pituitary Apoplexy"
    objectives={["Recognise pituitary apoplexy and distinguish it from subarachnoid haemorrhage and meningitis", "Give empirical steroids when indicated, at the guidance dose", "Understand the evidence on early surgery versus conservative management", "Plan follow-up and perioperative care"]}
    sectionExamMapping={{ objectives: { exams }, keyPoints: { exams } }}
    sectionSources={{ objectives: ["SfE apoplexy suspicion 2016", "SfE apoplexy emergency 2016"], keyPoints: ["SfE apoplexy suspicion 2016", "SfE apoplexy imaging 2016", "SfE apoplexy emergency 2016", "SfE apoplexy dose 2016", "UK pituitary apoplexy 2011"] }}
    keyPoints={[
      { text: "Suspect apoplexy in acute severe headache with neuro-ophthalmic signs, a known pituitary tumour, or once SAH and meningitis are excluded", cites: ["SfE apoplexy suspicion 2016"] },
      { text: "MRI is the investigation of choice; discuss urgently with the regional neurosurgical/endocrine team", cites: ["SfE apoplexy imaging 2016"] },
      { text: "Empirical steroids for haemodynamic instability, altered consciousness, reduced acuity or severe field defects", cites: ["SfE apoplexy emergency 2016"] },
      { text: "Hydrocortisone 100–200 mg IV then 2–4 mg/h, or 100 mg IM then 50–100 mg IM 6-hourly", cites: ["SfE apoplexy dose 2016"] },
      { text: "For most patients it is unclear whether surgery or conservative management is better", cites: ["UK pituitary apoplexy 2011"] },
    ]}
    quizQuestions={quiz}
    coreConcepts={<div className="space-y-8">
      <p className="text-muted-foreground leading-relaxed">These lessons adopt the Society for Endocrinology 2016 emergency guidance and the 2011 UK pituitary apoplexy guideline. Quotations are the sources' own wording; surrounding explanation is teaching synthesis, not patient-specific prescription. Return to <Link to="/intensive-care/icu-endocrine-emergencies" className="text-primary underline">Endocrine Emergencies</Link> for the other endocrine emergencies.</p>
      <ExamSection id="apoplexy-recognition" exams={exams}><CollapsibleSubsection title="Recognition and imaging" defaultOpen><ApoplexyRecognitionTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="apoplexy-steroids" exams={exams}><CollapsibleSubsection title="Emergency steroids, sodium and fluids"><ApoplexySteroidTeaching /></CollapsibleSubsection></ExamSection>
      <ExamSection id="apoplexy-surgery" exams={exams}><CollapsibleSubsection title="Surgery, conservative management and follow-up"><ApoplexySurgeryTeaching /></CollapsibleSubsection></ExamSection>
    </div>}
  />;
}

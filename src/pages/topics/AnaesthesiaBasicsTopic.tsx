import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { ExamSection } from "@/components/exam/ExamSection";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { QuizSection } from "@/components/quiz/QuizSection";
import { Exam } from "@/data/curriculum";
import { EegMonitoringTeaching, AwarenessRiskTeaching, TivaBasicsTeaching, AnaestheticAgentsTeaching, DrugInteractionsTeaching, MonitoringAlternativesTeaching } from "@/components/topic/AnaesthesiaBasicsTeaching";

const quiz = [
  { question: "In NAP5, the incidence of accidental awareness with neuromuscular block was about:", options: ["1 in 670", "1 in 8,200", "1 in 19,600", "1 in 135,900"], correctIndex: 1, explanation: "About 1 in 8,200 with neuromuscular block versus about 1 in 135,900 without. 1 in 670 was the figure for Caesarean section." },
  { question: "Which was NOT a risk factor for awareness in NAP5?", options: ["Obesity", "Junior trainee", "Use or omission of nitrous oxide", "Out-of-hours operating"], correctIndex: 2, explanation: "NAP5 found ASA grade, race and use or omission of nitrous oxide were not risk factors." },
  { question: "BAG-RECALL compared a BIS protocol with:", options: ["Routine care", "An end-tidal anaesthetic concentration protocol with alarms", "Raw EEG monitoring", "TIVA"], correctIndex: 1, explanation: "It compared BIS with an end-tidal protocol (alarm below 0.7 or above 1.3 MAC); BIS was not superior." },
  { question: "NICE recommends an EEG-based depth-of-anaesthesia monitor as an option in:", options: ["Only cardiac surgery", "All patients receiving TIVA", "Only children", "No patients"], correctIndex: 1, explanation: "NICE recommends them in all patients receiving TIVA and in patients at higher risk of adverse outcomes." },
  { question: "Ketamine's characteristic EEG signature is:", options: ["Burst suppression", "Slow-delta and alpha oscillations", "High-frequency beta oscillation", "Isoelectric EEG"], correctIndex: 2, explanation: "Purdon 2015: ketamine produces a high-frequency beta oscillation, so processed indices can read misleadingly high." },
  { question: "In ENIGMA-II, adding nitrous oxide in patients with coronary disease:", options: ["Increased cardiovascular death", "Did not change death or cardiovascular complications but increased severe PONV", "Increased wound infection", "Reduced PONV"], correctIndex: 1, explanation: "Primary outcome 8% in both groups; severe nausea and vomiting 15% v 11%." },
  { question: "Remifentanil given alone in Bouillon 2004:", options: ["Reliably ablated response to laryngoscopy", "Had no appreciable effect on response to laryngoscopy", "Lowered BIS more than propofol", "Antagonised propofol"], correctIndex: 1, explanation: "Alone it was ineffective, but modest concentrations dramatically reduced the propofol needed: synergy." },
  { question: "In Sanders 2017, the isolated forearm response rate after intubation was:", options: ["0.01%", "4.6%", "37%", "50%"], correctIndex: 1, explanation: "12 of 260 (4.6%), with no explicit recall afterwards." },
];

const AnaesthesiaBasicsTopic = () => (
  <TopicTemplate
    title="Anaesthesia Basics: EEG, Awareness & TIVA"
    subtitle="FRCA Primary & Final — Clinical"
    backPath="/clinical"
    backLabel="Clinical"
    accentColor="text-clinical"
    topicId="anaesthesia-basics"
    topicTitle="Anaesthesia Basics: EEG, Awareness & TIVA"
    objectives={[
      "Explain what a processed EEG index measures and why one number cannot fit every drug",
      "Quote the NAP5 incidence and risk factors for accidental awareness",
      "Interpret the B-Aware, B-Unaware and BAG-RECALL trials",
      "Explain why TIVA changes awareness risk and monitoring",
      "Describe age-related MAC, nitrous oxide safety (ENIGMA-II) and the PONV effect of propofol",
      "Explain propofol–opioid synergy and gabapentinoid–opioid respiratory depression",
      "Compare end-tidal gas monitoring and the isolated forearm technique with processed EEG",
    ]}
    keyPoints={[
      { text: "NAP5: awareness about 1 in 8,200 with neuromuscular block versus 1 in 135,900 without; two-thirds at induction or emergence", cites: ["NAP5 2014"] },
      { text: "BIS beat routine care in B-Aware but was not superior to a structured end-tidal gas protocol in B-Unaware or BAG-RECALL", cites: ["B-Aware 2004", "BAG-RECALL 2011"] },
      { text: "NICE: EEG depth monitors are an option in higher-risk patients and in all patients receiving TIVA", cites: ["NICE HTG292 (DG6)"] },
    ]}
    sectionExamMapping={{ objectives: { exams: [Exam.PRIMARY, Exam.FINAL] }, keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] } }}
    coreConcepts={
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed">
          Three linked basics: how depth-of-anaesthesia monitoring works, how often accidental awareness happens and why, and what changes when anaesthesia is maintained intravenously. For the full technical detail see <Link to="/physics/depth-of-anaesthesia" className="text-primary underline-offset-4 hover:underline">Depth of Anaesthesia Monitoring</Link> and <Link to="/clinical/tiva" className="text-primary underline-offset-4 hover:underline">TIVA</Link>.
        </p>
        <ExamSection id="eeg-monitoring" exams={[Exam.PRIMARY, Exam.FINAL]}>
          <CollapsibleSubsection title="EEG and depth-of-anaesthesia monitoring"><EegMonitoringTeaching /></CollapsibleSubsection>
        </ExamSection>
        <ExamSection id="awareness-risk" exams={[Exam.PRIMARY, Exam.FINAL]}>
          <CollapsibleSubsection title="Accidental awareness: incidence, risk and the BIS trials"><AwarenessRiskTeaching /></CollapsibleSubsection>
        </ExamSection>
        <ExamSection id="tiva-basics" exams={[Exam.PRIMARY, Exam.FINAL]}>
          <CollapsibleSubsection title="TIVA basics"><TivaBasicsTeaching /></CollapsibleSubsection>
        </ExamSection>
        <ExamSection id="anaesthetic-agents" exams={[Exam.PRIMARY, Exam.FINAL]}>
          <CollapsibleSubsection title="Anaesthetic agents: MAC, nitrous oxide and PONV"><AnaestheticAgentsTeaching /></CollapsibleSubsection>
        </ExamSection>
        <ExamSection id="drug-interactions" exams={[Exam.PRIMARY, Exam.FINAL]}>
          <CollapsibleSubsection title="Drug interactions"><DrugInteractionsTeaching /></CollapsibleSubsection>
        </ExamSection>
        <ExamSection id="monitoring-alternatives" exams={[Exam.PRIMARY, Exam.FINAL]}>
          <CollapsibleSubsection title="Alternatives to processed EEG monitoring"><MonitoringAlternativesTeaching /></CollapsibleSubsection>
        </ExamSection>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Quiz</h3>
          <QuizSection questions={quiz} />
        </div>
      </div>
    }
  />
);

export default AnaesthesiaBasicsTopic;

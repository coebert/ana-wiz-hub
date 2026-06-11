import { TopicTemplate } from "@/components/TopicTemplate";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { ExamMappingBadges } from "@/components/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { respiratoryDiseaseQuestions } from "@/data/quizzes";
import RespiratoryDrugSafetyDiagram from "@/components/diagrams/RespiratoryDrugSafetyDiagram";
import AsthmaBronchospasmDiagram from "@/components/diagrams/AsthmaBronchospasmDiagram";
import CopdPathophysDiagram from "@/components/diagrams/CopdPathophysDiagram";
import OsaCycleDiagram from "@/components/diagrams/OsaCycleDiagram";
import PulmonaryFibrosisDiagram from "@/components/diagrams/PulmonaryFibrosisDiagram";
import UrtiAirwayDiagram from "@/components/diagrams/UrtiAirwayDiagram";
import { Exam } from "@/data/curriculum";
import { TopicTableOfContents } from "@/components/TopicTableOfContents";

const objectives = [
  "Optimise asthma and COPD preoperatively and select bronchodilator-friendly anaesthetic agents.",
  "Identify and manage obstructive sleep apnoea perioperatively (STOP-BANG, CPAP, opioid-sparing).",
  "Adjust ventilation strategy for restrictive lung disease and recognise risk of barotrauma.",
  "Decide whether to proceed, postpone, or modify technique in patients with recent URTI/LRTI.",
  "Recognise and treat acute intraoperative bronchospasm.",
];

const keyPoints = [
  { text: "Asthma: avoid histamine-releasing drugs (atracurium, morphine, thiopentone); desflurane and dry gases may trigger bronchospasm — use sevoflurane which has bronchodilator properties", cites: ["BJA Educ Asthma 2017", "BTS/SIGN 2019"] },
  { text: "COPD patients are at high risk of postoperative pulmonary complications — optimise with bronchodilators, smoking cessation (≥8 weeks), chest physiotherapy, and regional anaesthesia where possible", cites: ["NICE NG115", "Lumb Ch.27"] },
  { text: "Obstructive sleep apnoea (OSA) increases sensitivity to opioids and sedatives; use CPAP postoperatively and monitor with continuous pulse oximetry for 72 hours", cites: ["STOP-BANG", "Lumb Ch.27"] },
  { text: "Restrictive lung disease (pulmonary fibrosis, scoliosis) causes reduced FVC and TLC with preserved FEV₁/FVC ratio; high PEEP requirements and increased risk of pneumothorax with positive pressure ventilation", cites: ["Lumb Ch.27"] },
  { text: "Patients with a recent upper respiratory tract infection (URTI) have airway hyperreactivity for 6–8 weeks — postpone elective surgery if possible, particularly in children", cites: ["Lumb Ch.27", "BJA Educ Asthma 2017"] },

];

const RespiratoryDiseaseTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Anaesthesia for severe COPD undergoing thoracic surgery",
    scenario: "A 68-year-old with FEV1 35% predicted and pCO₂ 6.8 kPa needs a right upper lobectomy. Plan pre-op assessment and intra-op ventilation strategy.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Pre-op: PFTs (FEV1, DLCO), V/Q split function, exercise testing (6MWT or CPET; VO₂ peak &lt;15 mL/kg/min = high risk), optimise bronchodilators, treat infection, smoking cessation</li>
          <li>Calculate predicted post-op FEV1 (ppoFEV1) and ppoDLCO; &lt;40% predicts increased respiratory failure risk</li>
          <li>Intra-op: thoracic epidural or paravertebral for analgesia, double-lumen tube with bronchoscopic position check, lung-protective OLV (Vt 4–6 mL/kg ideal body weight, PEEP 5, plateau &lt;25 cmH₂O, permissive hypercapnia)</li>
          <li>Manage hypoxia on OLV stepwise: FiO₂, recruit dependent lung, CPAP to non-dependent, intermittent re-inflation, surgical pause if persistent</li>
          <li>Post-op: HDU, regional analgesia, early mobilisation, chest physiotherapy, NIV if hypercapnic respiratory failure develops</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Excessive tidal volumes on OLV → acute lung injury (ARDS 4–8% post-pneumonectomy)</li>
          <li>Volume overload — restrictive fluid strategy (1–2 mL/kg/h crystalloid)</li>
          <li>Failing to plan analgesia for chest drain pain (intercostal block + opioids)</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Comprehensive risk assessment with ppoFEV1, multidisciplinary fitness review, lung-protective OLV (Vt 4–6 mL/kg IBW, PEEP, permissive hypercapnia), regional analgesia and HDU recovery.",
    cites: ["BJA Educ Asthma 2017", "BTS/SIGN 2019", "NICE NG115"],
  },
];

const tocItems = [
  { id: "section-asthma", label: "Asthma", group: "Core" },
  { id: "section-chronic-obstructive-pulmonary-disease", label: "COPD", group: "Core" },
  { id: "section-obstructive-sleep-apnoea", label: "Obstructive Sleep Apnoea", group: "Sleep" },
  { id: "section-restrictive-lung-disease", label: "Restrictive Lung Disease", group: "Restrictive" },
  { id: "section-respiratory-infections", label: "Respiratory Infections", group: "Infections" },
];

const RespiratoryDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Respiratory Co-Existing Disease"
      subtitle="Asthma, COPD, OSA, restrictive lung disease, pulmonary fibrosis, and respiratory infections"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="respiratory-disease"
      topicTitle="Respiratory Co-Existing Disease"
      workedExamples={RespiratoryDiseaseTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={respiratoryDiseaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BTS/SIGN 2019", "NICE NG115", "Lumb Ch.27"],
        keyPoints: ["BJA Educ Asthma 2017", "BTS/SIGN 2019", "NICE NG115", "STOP-BANG", "Lumb Ch.27"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <p className="text-muted-foreground leading-relaxed">
           Respiratory co-existing disease is a leading driver of postoperative pulmonary complications — atelectasis, pneumonia, prolonged ventilation, and unplanned ICU admission. This topic covers the high-yield conditions: asthma and COPD, obstructive sleep apnoea, restrictive lung disease, pulmonary fibrosis, and the perioperative implications of recent respiratory infection.
         </p>
         <TopicTableOfContents items={tocItems} />

         {/* Asthma */}
         <section id="section-asthma" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Asthma</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Preoperative Assessment</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Severity classification: frequency of symptoms, hospitalisations, ICU admissions, ever ventilated</li>
                <li>Current medications: inhaled corticosteroids, LABAs, oral steroids, biologics (omalizumab)</li>
                <li>Steroid supplementation if &gt;10 mg prednisolone/day for &gt;3 months (risk of adrenal suppression)</li>
                <li>PEF or spirometry: FEV₁ &lt;80% predicted suggests suboptimal control — consider postponement and optimisation</li>
                <li>Continue all asthma medications including on morning of surgery; nebulised salbutamol preoperatively</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Anaesthetic Management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Regional anaesthesia preferred where feasible — avoids airway instrumentation</li>
                <li>If GA required: deep plane of anaesthesia before intubation; LMA preferred over ETT (less airway stimulation)</li>
                <li>Induction: propofol (mild bronchodilation); avoid thiopentone (histamine release)</li>
                <li>Sevoflurane: bronchodilator — preferred volatile agent; desflurane can cause bronchospasm (pungent, airway irritant)</li>
                <li>Avoid: atracurium/mivacurium (histamine release) — use rocuronium or vecuronium</li>
                <li>Avoid morphine (histamine release) — use fentanyl or remifentanil</li>
                <li>Neostigmine may cause bronchospasm — consider sugammadex for reversal</li>
                <li>Acute intraoperative bronchospasm: deepen anaesthesia, salbutamol MDI/nebuliser, IV salbutamol (250 µg), IV magnesium (2 g), IV hydrocortisone (200 mg)</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <AsthmaBronchospasmDiagram />
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <RespiratoryDrugSafetyDiagram />
            </div>
          </div>
        </section>

         {/* COPD */}
         <section id="section-chronic-obstructive-pulmonary-disease" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Chronic Obstructive Pulmonary Disease</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Pathophysiology & Assessment</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Obstructive defect: reduced FEV₁/FVC ratio (&lt;0.7); air trapping, hyperinflation, gas exchange impairment</li>
                <li>Cor pulmonale: RV failure secondary to chronic hypoxic pulmonary vasoconstriction</li>
                <li>GOLD staging (I–IV) based on post-bronchodilator FEV₁ % predicted</li>
                <li>Risk factors for postop complications: FEV₁ &lt;1 L, current smoker, upper abdominal/thoracic surgery, TLCO &lt;40%</li>
                <li>Smoking cessation: ≥8 weeks ideally (carboxyhaemoglobin normalises in 48 h; mucociliary function improves in 6 weeks)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Anaesthetic Management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Regional anaesthesia preferred where possible (avoids intubation, positive pressure ventilation, and respiratory depression)</li>
                <li>Avoid high thoracic neuraxial block (intercostal muscle paralysis reduces FVC in patients reliant on accessory muscles)</li>
                <li>Ventilation: longer expiratory time (I:E 1:3–1:4), low tidal volumes, avoid auto-PEEP (risk of dynamic hyperinflation)</li>
                <li>Monitor for intrinsic PEEP: observe expiratory flow on capnograph — flow should reach zero before next breath</li>
                <li>Supplemental O₂: target SpO₂ 88–92% in CO₂ retainers — avoid excessive oxygen</li>
                <li>Extubation: awake, upright, with bronchodilator nebuliser; consider NIV postoperatively in high-risk patients</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <CopdPathophysDiagram />
            </div>
          </div>
        </section>

         {/* OSA */}
         <section id="section-obstructive-sleep-apnoea" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Obstructive Sleep Apnoea</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Prevalence: 2–4% adults; 70% of morbidly obese patients; frequently undiagnosed</li>
                <li>STOP-BANG questionnaire: score ≥5 = high risk (Snoring, Tired, Observed apnoea, Pressure (HTN), BMI &gt;35, Age &gt;50, Neck &gt;40 cm, Gender male)</li>
                <li>Associated with: systemic and pulmonary hypertension, difficult airway, cardiac arrhythmias, and increased opioid sensitivity</li>
                <li>Perioperative management: bring own CPAP device; avoid or minimise opioids; use multimodal analgesia (paracetamol, NSAIDs, regional blocks)</li>
                <li>Postoperative monitoring: continuous SpO₂ for ≥72 hours; nurse semi-upright; CPAP for all sleep periods</li>
                <li>Avoid day surgery for patients with severe OSA undergoing procedures requiring opioid analgesia</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <OsaCycleDiagram />
            </div>
          </div>
        </section>

         {/* Restrictive Lung Disease */}
         <section id="section-restrictive-lung-disease" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Restrictive Lung Disease</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Pulmonary Fibrosis</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Reduced compliance: reduced FVC and TLC with preserved or increased FEV₁/FVC ratio</li>
                <li>Impaired gas exchange: reduced TLCO, chronic hypoxaemia, may have pulmonary hypertension</li>
                <li>Ventilation: small tidal volumes (4–6 mL/kg), higher respiratory rates, moderate PEEP</li>
                <li>Risk of barotrauma and pneumothorax with positive pressure ventilation</li>
                <li>Many patients on immunosuppressive therapy (methotrexate, cyclophosphamide) — infection risk</li>
                <li>Pirfenidone and nintedanib may affect wound healing — discuss with respiratory physician</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Neuromuscular & Chest Wall Disease</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Myasthenia gravis, muscular dystrophies, severe kyphoscoliosis → restrictive physiology</li>
                <li>Scoliosis: Cobb angle &gt;65° associated with significant restrictive defect and cor pulmonale</li>
                <li>May require postoperative ventilatory support; plan ICU admission for major surgery</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <PulmonaryFibrosisDiagram />
            </div>
          </div>
        </section>

         {/* Respiratory Infections */}
         <section id="section-respiratory-infections" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Respiratory Infections</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Active LRTI: postpone elective surgery; increased risk of bronchospasm, hypoxaemia, and atelectasis</li>
                <li>Recent URTI: airway hyperreactivity persists 6–8 weeks; in children, 2–4× increased risk of laryngospasm and bronchospasm</li>
                <li>Decision to proceed depends on: severity, procedure urgency, patient age (children &lt;1 year at highest risk), and type of airway management planned</li>
                <li>If proceeding with URTI: avoid intubation where possible (LMA preferred), use humidified gases, IV induction (avoid desflurane)</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <UrtiAirwayDiagram />
            </div>
          </div>
        </section>
        <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              'Asthma: continue inhalers; nebulised salbutamol pre-induction if recent exacerbation; avoid desflurane (airway irritant) — sevoflurane is bronchodilatory.',
              'COPD: optimise with inhalers/steroids; minimise ventilation pressures; allow permissive hypercapnia and longer expiratory time to avoid auto-PEEP.',
              'OSA: STOP-BANG ≥5 → high risk. CPAP perioperatively, opioid-sparing analgesia, extended PACU monitoring; avoid benzodiazepines and long-acting opioids.',
              'Smoking cessation: ≥8 weeks ideally; even 24 h reduces COHb and improves O₂ delivery.',
              'Pulmonary fibrosis / restrictive disease: use lung-protective ventilation (VT 6 mL/kg IBW, plateau <30 cmH₂O); avoid high FiO₂ where possible (free-radical injury).',
              'Recent URTI in children: defer elective surgery 2–4 weeks — increased perioperative respiratory adverse events (COLDS score).',
            ]}
          />
        </ExamSection>
      }
    />
  );
};

export default RespiratoryDiseaseTopic;

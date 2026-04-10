import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { ReferencesList } from "@/components/ReferencesList";
import { respiratoryDiseaseQuestions } from "@/data/quizzes";

const keyPoints = [
  "Asthma: avoid histamine-releasing drugs (atracurium, morphine, thiopentone); desflurane and dry gases may trigger bronchospasm — use sevoflurane which has bronchodilator properties",
  "COPD patients are at high risk of postoperative pulmonary complications — optimise with bronchodilators, smoking cessation (≥8 weeks), chest physiotherapy, and regional anaesthesia where possible",
  "Obstructive sleep apnoea (OSA) increases sensitivity to opioids and sedatives; use CPAP postoperatively and monitor with continuous pulse oximetry for 72 hours",
  "Restrictive lung disease (pulmonary fibrosis, scoliosis) causes reduced FVC and TLC with preserved FEV₁/FVC ratio; high PEEP requirements and increased risk of pneumothorax with positive pressure ventilation",
  "Patients with a recent upper respiratory tract infection (URTI) have airway hyperreactivity for 6–8 weeks — postpone elective surgery if possible, particularly in children",
];

const RespiratoryDiseaseTopic = () => {
  return (
    <SectionLayout
      title="Respiratory Co-Existing Disease"
      subtitle="Asthma, COPD, OSA, restrictive lung disease, pulmonary fibrosis, and respiratory infections"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
    >
      <div className="space-y-8">
        <KeyLearningPoints points={keyPoints} />

        {/* Asthma */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Asthma</h2>
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
          </div>
        </section>

        {/* COPD */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Chronic Obstructive Pulmonary Disease</h2>
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
          </div>
        </section>

        {/* OSA */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Obstructive Sleep Apnoea</h2>
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
          </div>
        </section>

        {/* Restrictive Lung Disease */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Restrictive Lung Disease</h2>
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
          </div>
        </section>

        {/* Respiratory Infections */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Respiratory Infections</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Active LRTI: postpone elective surgery; increased risk of bronchospasm, hypoxaemia, and atelectasis</li>
                <li>Recent URTI: airway hyperreactivity persists 6–8 weeks; in children, 2–4× increased risk of laryngospasm and bronchospasm</li>
                <li>Decision to proceed depends on: severity, procedure urgency, patient age (children &lt;1 year at highest risk), and type of airway management planned</li>
                <li>If proceeding with URTI: avoid intubation where possible (LMA preferred), use humidified gases, IV induction (avoid desflurane)</li>
              </ul>
            </div>
          </div>
        </section>

        <QuizSection questions={respiratoryDiseaseQuestions} />
        <ReferencesList topicId="respiratory-disease" />
        <TopicCompletionToggle topicId="respiratory-disease" topicTitle="Respiratory Co-Existing Disease" />
      </div>
    </SectionLayout>
  );
};

export default RespiratoryDiseaseTopic;

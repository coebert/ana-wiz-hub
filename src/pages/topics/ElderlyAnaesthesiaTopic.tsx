import { TopicTemplate } from "@/components/TopicTemplate";
import { elderlyAnaesthesiaQuestions } from "@/data/quizzes";
import FrailtyAssessmentDiagram from "@/components/diagrams/FrailtyAssessmentDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const keyPoints = [
  { text: "Physiological reserve is reduced in the elderly — decreased cardiac output, reduced FRC and closing capacity, impaired renal/hepatic drug clearance, and reduced CNS sensitivity thresholds", cites: ["NICE NG111"] },
  { text: "MAC decreases approximately 6% per decade after age 40 — elderly patients require significantly lower doses of volatile and IV anaesthetic agents", cites: ["Lancet Delirium 2014"] },
  { text: "Postoperative delirium affects 15–50% of elderly surgical patients and is independently associated with increased mortality, prolonged hospital stay, and long-term cognitive decline", cites: ["Lancet Frailty 2013"] },
  { text: "Frailty (assessed by Clinical Frailty Scale or phenotype model) is a stronger predictor of postoperative outcome than age or ASA grade alone", cites: ["AAGBI Elderly 2014"] },
  { text: "Regional anaesthesia may reduce postoperative pulmonary complications and delirium in hip fracture patients — fascia iliaca block should be performed on admission (NICE NG111)", cites: ["NICE NG111"] },
];

const ElderlyAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthesia for the Elderly Patient"
      subtitle="Age-related physiological changes, frailty assessment, pharmacological considerations, and postoperative cognitive dysfunction"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="elderly-anaesthesia"
      topicTitle="Anaesthesia for the Elderly Patient"
      quizQuestions={elderlyAnaesthesiaQuestions}
      objectives={[
        "Describe age-related physiological changes affecting anaesthetic management",
        "Assess frailty using validated tools and integrate it into perioperative risk stratification",
        "Adjust anaesthetic and analgesic dosing for altered pharmacokinetics in the elderly",
        "Recognise and manage postoperative delirium and cognitive dysfunction",
        "Apply NICE NG111 standards to anaesthesia for hip fracture surgery",
      ]}
      keyPoints={keyPoints}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      coreConcepts={
        <div className="space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            Elderly patients now form the majority of the surgical workload in many UK hospitals. Reduced physiological reserve, altered pharmacokinetics, frailty, and a high background prevalence of comorbidity all combine to elevate perioperative risk. This topic outlines the age-related changes that matter at induction, maintenance, and emergence, and the practical strategies — including frailty assessment and delirium prevention — that improve outcomes.
          </p>
          <FrailtyAssessmentDiagram />

          {/* Physiological Changes */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Age-Related Physiological Changes</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Cardiovascular</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Reduced cardiac output (↓1% per year after age 30); ↓ maximal heart rate (220 − age)</li>
                <li>Increased arterial stiffness → isolated systolic hypertension, increased afterload, LV hypertrophy</li>
                <li>Impaired baroreceptor reflex → exaggerated hypotension with induction agents, neuraxial blockade, and positional changes</li>
                <li>Reduced β-receptor sensitivity → attenuated response to catecholamines</li>
                <li>Diastolic dysfunction common — dependent on atrial contraction; AF poorly tolerated</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Respiratory</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Reduced FRC and increased closing capacity → closing capacity exceeds FRC in supine position by age ~65 (airway closure during tidal breathing)</li>
                <li>Reduced chest wall compliance (calcified costal cartilage), reduced lung elastic recoil</li>
                <li>Blunted hypoxic and hypercapnic ventilatory drive</li>
                <li>Increased V/Q mismatch → lower baseline PaO₂ (expected PaO₂ ≈ 13.3 − [age/30] kPa)</li>
                <li>Reduced cough reflex and mucociliary clearance → increased aspiration and pneumonia risk</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Renal & Hepatic</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>GFR declines ~1 ml/min/year after age 40 — serum creatinine may be normal despite significant renal impairment (reduced muscle mass)</li>
                <li>Reduced hepatic blood flow and Phase I metabolism (oxidation, reduction) — Phase II (conjugation) relatively preserved</li>
                <li>Reduced plasma albumin → increased free fraction of protein-bound drugs</li>
                <li>Increased body fat, decreased total body water → altered volume of distribution</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Central Nervous System</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Reduced neuronal density and neurotransmitter levels</li>
                <li>MAC decreases ~6% per decade after age 40 (MAC at 80 ≈ 0.7 × MAC at 40)</li>
                <li>Increased sensitivity to benzodiazepines, opioids, and propofol</li>
                <li>Reduced spinal cord CSF volume → higher block level for a given neuraxial dose</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Frailty */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Frailty Assessment</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Frailty</strong> is a state of increased vulnerability to stressors, with reduced physiological reserve. It is distinct from disability and comorbidity, though they overlap.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Assessment Tools</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Clinical Frailty Scale (CFS)</strong> — 9-point scale from "very fit" to "terminally ill"; CFS ≥5 = frail; widely used, quick, validated</li>
                <li><strong className="text-foreground">Fried Phenotype Model</strong> — 5 criteria: unintentional weight loss, exhaustion, low physical activity, slow walking speed, weak grip strength; ≥3 = frail</li>
                <li><strong className="text-foreground">Edmonton Frail Scale</strong> — 11 domains including cognition, mood, functional independence, continence</li>
                <li>Frailty is a better predictor of 30-day mortality, length of stay, and discharge destination than age or ASA alone</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Prehabilitation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Exercise training, nutritional optimisation, smoking/alcohol cessation, psychological preparation</li>
                <li>Comprehensive Geriatric Assessment (CGA) for patients ≥65 undergoing major surgery</li>
                <li>Medication review: polypharmacy is common — stop anticholinergics, rationalise antihypertensives, manage anticoagulants</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pharmacology */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pharmacological Considerations</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Dose Adjustments</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Propofol</strong> — reduce induction dose by 30–50%; slower arm-brain circulation time increases onset time; titrate carefully</li>
                <li><strong className="text-foreground">Opioids</strong> — reduce dose by 30–50%; increased sensitivity and reduced clearance; consider remifentanil (organ-independent metabolism)</li>
                <li><strong className="text-foreground">Muscle relaxants</strong> — atracurium/cisatracurium preferred (Hofmann degradation, organ-independent); rocuronium clearance reduced in elderly</li>
                <li><strong className="text-foreground">Volatile agents</strong> — reduced MAC; titrate to effect; consider BIS/processed EEG monitoring to avoid excessive depth</li>
                <li><strong className="text-foreground">Neuraxial</strong> — reduced dose required (reduced CSF volume, increased neural sensitivity); expect higher, longer-lasting block</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Postoperative Delirium */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Cognitive Dysfunction & Delirium</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Postoperative Delirium (POD)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Acute fluctuating confusional state; onset within hours to days postoperatively; 15–50% of elderly surgical patients</li>
                <li><strong className="text-foreground">Risk factors</strong>: age &gt;65, pre-existing cognitive impairment, sensory impairment, polypharmacy, anticholinergics, alcohol, pain, sepsis, metabolic derangement</li>
                <li>Three subtypes: <strong className="text-foreground">hyperactive</strong> (agitation), <strong className="text-foreground">hypoactive</strong> (withdrawal — most common, often missed), <strong className="text-foreground">mixed</strong></li>
                <li>Screening: 4AT (rapid, validated, no training required), CAM (Confusion Assessment Method)</li>
                <li>Prevention: non-pharmacological multicomponent interventions (orientation, sleep hygiene, early mobilisation, glasses/hearing aids, hydration) — reduce delirium by 30–40%</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Postoperative Cognitive Dysfunction (POCD)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Subtle decline in cognitive function lasting weeks to months after surgery — distinct from delirium</li>
                <li>Difficult to diagnose: requires neurocognitive testing pre- and postoperatively</li>
                <li>No proven causative link with specific anaesthetic agents or general vs regional anaesthesia</li>
                <li>BIS-guided anaesthesia to avoid excessive anaesthetic depth may reduce incidence (STS-2 trial)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Hip Fracture */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hip Fracture — The Index Condition</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hip fracture in the elderly is the paradigm for geriatric anaesthesia. Annual incidence ~70,000 in the UK with 30-day mortality ~7%.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Key Standards (NICE NG111 / AAGBI)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Surgery within 36 hours of admission (ideally within 24 hours)</li>
                <li><strong className="text-foreground">Fascia iliaca block</strong> on admission — reduces opioid requirements and delirium incidence</li>
                <li>Spinal anaesthesia is recommended by NICE — associated with reduced 30-day mortality (REGAIN trial considerations noted)</li>
                <li>Avoid hypotension: MAP &gt;65 mmHg or within 20% of baseline; careful fluid management</li>
                <li>Cement implantation syndrome: hypotension, hypoxia, cardiac arrest during cementation — monitor closely, ensure adequate preload</li>
                <li>Early mobilisation, orthogeriatric review, delirium prevention protocols</li>
              </ul>
            </div>
          </div>
        </section>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Reduced MAC, reduced clearance, reduced cardiovascular reserve — start low, go slow, titrate to effect.",
              "Frailty (Rockwood CFS ≥5) predicts postoperative complications independently of age.",
              "Postoperative delirium: prevention is key — orientation, sleep, hydration, pain control, avoid benzodiazepines and anticholinergics.",
              "Hip-fracture pathway: surgery within 36 h, fascia-iliaca block on admission, multidisciplinary ortho-geriatric care.",
              "Polypharmacy: review and stop high-risk drugs (anticoagulants, ACE inhibitors, oral hypoglycaemics) preoperatively per local guideline.",
            ]}
          />
        </div>
      }
    />
  );
};

export default ElderlyAnaesthesiaTopic;

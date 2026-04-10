import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { orthopaedicAnaesthesiaQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const OrthopaedicAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Orthopaedic Anaesthesia" subtitle="FRCA Final — Clinical" backPath="/clinical" backLabel="Clinical" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hip Fracture (#NOF)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Epidemiology</strong>: ~80,000/year in UK. 30-day mortality ~7%. NICE CG124 + NHFD standards</li>
            <li><strong>Timing</strong>: surgery within 36h unless medically unfit. Delay increases mortality, pressure sores, VTE</li>
            <li><strong>Anaesthetic</strong>: spinal anaesthesia recommended (NICE) — ↓ mortality, ↓ DVT vs GA. Avoid hypotension (MAP &gt;65 or ≥75% baseline). Low-dose spinal (e.g., 1.5-2ml 0.5% heavy bupivacaine)</li>
            <li><strong>Analgesia</strong>: fascia iliaca block (pre/intraoperative), paracetamol, avoid NSAIDs in elderly/renal impairment. Opioid-sparing approach</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tourniquet</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Pressure</strong>: upper limb 50-100 mmHg above SBP; lower limb 100-150 mmHg above SBP</li>
            <li><strong>Time</strong>: safe limit ~2h. Deflation after 1.5h recommended. Rest 15min between inflations</li>
            <li><strong>Inflation effects</strong>: ↑ SVR, ↑ MAP, ↑ CVP. Tourniquet pain (C-fibres, poorly blocked by LA)</li>
            <li><strong>Deflation effects</strong>: ↓ MAP, ↑ CO₂ (washout), ↓ pH, ↑ K⁺, ↑ lactate, ↓ core temperature. Risk of PE from mobilised clot. Reactive hyperaemia</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bone Cement Implantation Syndrome (BCIS)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li>Occurs during cemented arthroplasty (hip/knee). Incidence 1-28% (varying severity)</li>
            <li><strong>Mechanism</strong>: fat/marrow embolism → right heart strain + inflammatory mediator release → hypoxia, hypotension, ↓ consciousness</li>
            <li><strong>Risk factors</strong>: pathological fracture, pre-existing cardiopulmonary disease, poor femoral preparation</li>
            <li><strong>Prevention</strong>: high FiO₂, adequate hydration, communication with surgeon (warn before cementing), invasive monitoring if high-risk</li>
            <li><strong>Grading</strong>: Grade 1 (SpO₂ ↓, ↓ BP mild), Grade 2 (SpO₂ &lt;94%, ↓ BP requiring vasopressors), Grade 3 (cardiovascular collapse)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fat Embolism Syndrome</h2>
          <p className="text-muted-foreground leading-relaxed">Occurs 24-72h after long bone fractures. Classic triad: respiratory distress (earliest), neurological changes, petechial rash (pathognomonic, ~50%). Diagnosis clinical (Gurd's criteria). Treatment supportive: O₂, ventilation, haemodynamic support. Prevention: early fracture stabilisation.</p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "#NOF: surgery within 36h. Spinal anaesthesia recommended (NICE). Fascia iliaca block for analgesia",
        "Tourniquet: upper limb 50-100 mmHg above SBP. Safe limit ~2h. Deflation → ↓ pH, ↑ K⁺, ↑ CO₂, ↑ lactate",
        "BCIS: fat/marrow embolism during cement insertion → hypoxia, hypotension, ↓ consciousness. Warn before cementing",
        "Fat embolism syndrome: 24-72h post-fracture. Triad: respiratory distress, neurological changes, petechial rash",
        "Early mobilisation, VTE prophylaxis, and avoidance of hypotension are key perioperative priorities",
      ]} />
      <QuizSection questions={orthopaedicAnaesthesiaQuestions} />
      <ReferencesList topicId="orthopaedic-anaesthesia" />
      <SeeAlso topicId="orthopaedic-anaesthesia" />
        <TopicCompletionToggle topicId="orthopaedic-anaesthesia" topicTitle="Orthopaedic Anaesthesia" />
    </SectionLayout>
  );
};

export default OrthopaedicAnaesthesiaTopic;

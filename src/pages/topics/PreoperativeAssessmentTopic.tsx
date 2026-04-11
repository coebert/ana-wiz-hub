import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { preoperativeAssessmentQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import CPETNinePanelDiagram from "@/components/diagrams/CPETNinePanelDiagram";
import { SeeAlso } from "@/components/SeeAlso";

const PreoperativeAssessmentTopic = () => {
  return (
    <SectionLayout title="Preoperative Assessment" subtitle="FRCA / FFICM — Perioperative Medicine" backPath="/perioperative" backLabel="Perioperative Medicine" accentColor="text-perioperative">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Risk Assessment</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Perioperative risk stratification guides shared decision-making, optimisation strategies, and level of postoperative care.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { tool: "ASA Physical Status", detail: "ASA I (healthy) to VI (brain-dead donor). Subjective but universally used. ASA III+ associated with increased complications." },
              { tool: "Revised Cardiac Risk Index (RCRI)", detail: "6 independent predictors: high-risk surgery, IHD, CCF, CVA/TIA, insulin-dependent DM, creatinine >177 µmol/L. ≥3 factors = >11% cardiac risk." },
              { tool: "NSQIP / SORT", detail: "SORT (Surgical Outcome Risk Tool) — validated UK model. Uses ASA, urgency, severity, speciality, cancer, age. Predicts 30-day mortality." },
              { tool: "Functional Capacity", detail: "METs assessment. >4 METs (climb 2 flights of stairs) = adequate. <4 METs = further cardiac investigation (CPET, echo, stress testing)." },
            ].map((t) => (
              <div key={t.tool} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{t.tool}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiopulmonary Exercise Testing (CPET)</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Key Parameters</p>
              <p className="text-sm text-muted-foreground mt-1">VO₂ peak: overall cardiorespiratory fitness. Anaerobic threshold (AT): sustainable exercise level. VE/VCO₂ slope: ventilatory efficiency (cardiac failure if {'>'} 34).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Risk Thresholds</p>
              <p className="text-sm text-muted-foreground mt-1">AT {'<'} 11 ml/kg/min = high risk. VO₂ peak {'<'} 15 ml/kg/min = high risk. Used for major abdominal, thoracic, and vascular surgery decision-making. Guides HDU/ICU bed planning.</p>
            </div>
          </div>
          <div className="mt-4">
            <CPETNinePanelDiagram />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Medication Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Drug</th>
                  <th className="text-left py-2 text-foreground font-semibold">Preoperative Advice</th>
                  <th className="text-left py-2 text-foreground font-semibold">Rationale</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ACE-I / ARBs</td><td>Omit on day of surgery</td><td>Risk of refractory hypotension under anaesthesia</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Beta-blockers</td><td>Continue</td><td>Withdrawal → rebound tachycardia, ischaemia. POISE trial: perioperative initiation harmful.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Anticoagulants</td><td>Bridge or hold per guideline</td><td>DOACs: stop 24–48h pre-op (renal function dependent). Warfarin: stop 5 days, bridge with LMWH if high thromboembolic risk.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Metformin</td><td>Omit on day of surgery</td><td>Risk of lactic acidosis with renal impairment/contrast. Resume when eating and drinking.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Insulin</td><td>Reduce long-acting by 20–30%</td><td>Variable-rate insulin infusion (VRII) if fasting {'>'} 1 missed meal. Target glucose 6–10.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Airway Assessment</h2>
          <div className="grid sm:grid-cols-3 gap-2">
            {[
              { test: "Mallampati", detail: "Class I–IV. Predicts view at laryngoscopy. Class III/IV associated with difficult intubation." },
              { test: "Thyromental distance", detail: "<6 cm suggests difficult laryngoscopy. Measures mandibular space." },
              { test: "Mouth opening", detail: "<3 cm (2 finger breadths) = limited. Interincisor gap." },
              { test: "Neck mobility", detail: "Extension <35° problematic. C-spine pathology, ankylosing spondylitis, RA." },
              { test: "Wilson score", detail: "Weight, head/neck movement, jaw movement, receding mandible, buck teeth." },
              { test: "History", detail: "Previous difficult intubation is the strongest predictor. Always check anaesthetic records." },
            ].map((t) => (
              <div key={t.test} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{t.test}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">GLP-1 Receptor Agonists & Anaesthesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            GLP-1 receptor agonists (semaglutide, liraglutide, tirzepatide) are increasingly prevalent due to widespread use for type 2 diabetes and obesity. They significantly delay gastric emptying, raising aspiration risk even in fasted patients.
          </p>

          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-3 mb-4">
            <p className="font-semibold text-foreground text-sm">ASA 2023 Consensus Guidance</p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Weekly formulations</strong> (semaglutide): hold for 7 days before elective surgery</li>
              <li><strong>Daily formulations</strong> (liraglutide): hold on day of surgery</li>
              <li>If GLP-1 RA not held, or GI symptoms present → treat as <strong>full stomach</strong></li>
              <li>Consider point-of-care gastric ultrasound to assess residual gastric volume</li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Mechanism of Delayed Emptying</p>
              <p className="text-sm text-muted-foreground">GLP-1 activates vagal afferents and brainstem circuits, reducing antral motility and pyloric relaxation. Gastric emptying half-time may increase 2–3 fold. Effect persists beyond pharmacological half-life.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Gastric Ultrasound (POCUS)</p>
              <p className="text-sm text-muted-foreground">Right lateral decubitus, curvilinear probe at epigastrium. Antral CSA &gt;340 mm² (or calculated volume &gt;1.5 ml/kg) suggests significant residual volume. Perlas grading: Grade 0 (empty), 1 (liquid), 2 (solid).</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">If Full Stomach Suspected</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Rapid sequence induction (RSI)</li>
                <li>Consider awake fibreoptic intubation if airway concerns</li>
                <li>Postpone elective case if safe to do so</li>
                <li>Prokinetics (metoclopramide) may have limited efficacy</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Other Perioperative Considerations</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Increased PONV risk (consider multimodal prophylaxis)</li>
                <li>Hypoglycaemia risk if combined with insulin/SUs — monitor closely</li>
                <li>Tirzepatide: dual GIP/GLP-1 agonist — same precautions apply</li>
                <li>Restart when tolerating oral intake postoperatively</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "CPET: AT <11 ml/kg/min or VO₂ peak <15 ml/kg/min = high perioperative risk",
        "Omit ACE-I/ARBs on day of surgery; continue beta-blockers (POISE: don't initiate perioperatively)",
        "Functional capacity >4 METs (climb 2 flights) suggests adequate cardiac reserve",
        "Previous difficult intubation is the strongest predictor of future difficulty — always check records",
        "GLP-1 RA: hold weekly semaglutide 7 days pre-op; if not held, treat as full stomach (ASA 2023)",
        "Gastric ultrasound: antral CSA >340 mm² suggests significant residual volume — consider RSI",
      ]} />

      <QuizSection questions={preoperativeAssessmentQuestions} />
      <ReferencesList topicId="preoperative-assessment" />

      <SeeAlso topicId="preoperative-assessment" />
        <TopicCompletionToggle topicId="preoperative-assessment" topicTitle="Preoperative Assessment" />
    </SectionLayout>
  );
};

export default PreoperativeAssessmentTopic;

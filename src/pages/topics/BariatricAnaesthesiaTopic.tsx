import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { bariatricAnaesthesiaQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const BariatricAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Bariatric Anaesthesia" subtitle="FRCA Final — Clinical" backPath="/clinical" backLabel="Clinical" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Obesity: Definitions & Epidemiology</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>BMI classification</strong>: overweight 25–29.9, obese I 30–34.9, obese II 35–39.9, obese III (morbid) ≥40, super-obese ≥50 kg/m²</li>
            <li><strong>Metabolic syndrome</strong>: central obesity + ≥2 of: ↑ TG, ↓ HDL, ↑ BP, ↑ fasting glucose. Increases perioperative cardiovascular risk</li>
            <li><strong>Fat distribution</strong>: central (android) adiposity carries greater risk than peripheral (gynoid). Waist circumference &gt;102 cm (M) or &gt;88 cm (F) = high risk</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physiological Changes</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Respiratory</strong>: ↓ FRC (up to 50%), ↓ ERV, ↓ compliance, ↑ airway resistance, ↑ O₂ consumption, ↑ CO₂ production. FRC may fall below closing capacity → atelectasis and shunt even during tidal breathing</li>
            <li><strong>Cardiovascular</strong>: ↑ blood volume, ↑ CO, ↑ LV work, concentric then eccentric hypertrophy. Pulmonary hypertension in severe obesity. Diastolic dysfunction common</li>
            <li><strong>GI</strong>: ↑ gastric volume, ↓ pH, ↑ intra-abdominal pressure, ↑ incidence of hiatus hernia and GORD → aspiration risk</li>
            <li><strong>Airway</strong>: ↑ neck circumference, ↑ Mallampati score, ↓ mouth opening, ↑ risk of difficult mask ventilation and intubation. OSA prevalence 40–90%</li>
            <li><strong>Pharmacokinetic</strong>: ↑ Vd for lipophilic drugs, ↑ lean body mass, altered hepatic/renal clearance. Use ideal/adjusted body weight for dosing (see below)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Drug Dosing in Obesity</h2>
          <div className="bg-card border border-border rounded-lg p-4">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Ideal body weight (IBW)</strong>: M = 50 + 2.3 × (height in inches − 60); F = 45.5 + 2.3 × (height in inches − 60)</li>
              <li><strong>Lean body weight (LBW)</strong>: use for propofol (induction & maintenance), remifentanil, rocuronium, vecuronium</li>
              <li><strong>Adjusted body weight (ABW)</strong>: IBW + 0.4 × (TBW − IBW). Use for sugammadex, aminoglycosides</li>
              <li><strong>Total body weight (TBW)</strong>: use for succinylcholine (↑ plasma cholinesterase)</li>
              <li><strong>Volatile agents</strong>: ↓ MAC with obesity (dose to effect). Desflurane/sevoflurane preferred (lower solubility → faster recovery)</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preoperative Assessment</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Airway</strong>: STOP-BANG screening for OSA (≥5 = high risk). CPAP compliance? Difficult airway plan essential</li>
            <li><strong>Cardiorespiratory</strong>: ECG (LVH, RV strain), echocardiography if suspected heart failure or pulmonary hypertension, ABG if BMI &gt;50 or suspected OHS</li>
            <li><strong>Obesity hypoventilation syndrome (OHS)</strong>: BMI ≥30 + daytime hypercapnia (PaCO₂ &gt;6 kPa) in absence of other cause. Prevalence 10–20% of obese patients with OSA. Associated with ↑ perioperative mortality</li>
            <li><strong>Functional capacity</strong>: often limited — Duke Activity Status Index may be more useful than exercise tolerance history</li>
            <li><strong>VTE risk</strong>: high — consider enhanced thromboprophylaxis (weight-adjusted LMWH)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intraoperative Management</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Positioning</strong>: ramped/head-up position (ear to sternal notch alignment). ↑ FRC, improves laryngoscopic view, delays desaturation during apnoea</li>
            <li><strong>Preoxygenation</strong>: 25° head-up, CPAP/BiPAP preoxygenation, high-flow nasal O₂ (apnoeic oxygenation). Target EtO₂ &gt;90%</li>
            <li><strong>Intubation</strong>: videolaryngoscopy as first-line. Have Plan B/C/D ready (DAS guidelines)</li>
            <li><strong>Ventilation</strong>: pressure-controlled or volume-guaranteed. PEEP 8–15 cmH₂O, recruitment manoeuvres, tidal volume 6–8 ml/kg IBW, FiO₂ 0.4–0.8</li>
            <li><strong>Pneumoperitoneum</strong>: ↑ IAP further compromises FRC. ↑ peak airway pressures, ↓ venous return, ↑ SVR. Steep Trendelenburg worsens respiratory mechanics</li>
            <li><strong>Monitoring</strong>: invasive BP if standard cuff unreliable (cone-shaped arm). Use appropriate cuff size (bladder width ≥40% arm circumference)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bariatric Surgery Specifics</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Procedures</strong>: Roux-en-Y gastric bypass (RYGB), sleeve gastrectomy, adjustable gastric band. Laparoscopic approach standard</li>
            <li><strong>Enhanced recovery</strong>: multimodal analgesia (avoid opioids where possible), early mobilisation, VTE prophylaxis, anti-emetics</li>
            <li><strong>Anastomotic leak</strong>: most serious early complication. Tachycardia may be only sign. CT with oral contrast for diagnosis</li>
            <li><strong>Rhabdomyolysis</strong>: prolonged surgery in morbidly obese. Monitor CK, ensure adequate hydration</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Care</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Recovery position</strong>: 30–45° head-up. Continuous SpO₂ monitoring. Resume CPAP immediately if OSA</li>
            <li><strong>Analgesia</strong>: multimodal — paracetamol, NSAIDs (if renal function permits), TAP/rectus sheath blocks, ketamine infusion, opioid-sparing. PCA if needed (dose to LBW)</li>
            <li><strong>HDU/ICU</strong>: consider if BMI &gt;50, severe OSA/OHS, significant comorbidities, or intraoperative complications</li>
            <li><strong>VTE prophylaxis</strong>: extended duration (up to 28 days post-discharge for high-risk). Mechanical + pharmacological</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "FRC falls dramatically in obesity — may fall below closing capacity causing shunt even during tidal breathing",
        "Ramped position + head-up tilt + apnoeic oxygenation are essential for safe airway management",
        "Drug dosing: LBW for propofol/remifentanil/NMBAs, TBW for succinylcholine, ABW for sugammadex",
        "STOP-BANG ≥5 = high-risk OSA. Screen for OHS (daytime hypercapnia) if BMI ≥30 + OSA",
        "Postoperative: head-up positioning, resume CPAP, continuous SpO₂, multimodal opioid-sparing analgesia",
      ]} />
      <QuizSection questions={bariatricAnaesthesiaQuestions} />
      <ReferencesList topicId="bariatric-anaesthesia" />
      <TopicCompletionToggle topicId="bariatric-anaesthesia" topicTitle="Bariatric Anaesthesia" />
    </SectionLayout>
  );
};

export default BariatricAnaesthesiaTopic;

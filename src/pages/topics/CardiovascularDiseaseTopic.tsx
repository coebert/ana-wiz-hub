import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { ReferencesList } from "@/components/ReferencesList";
import { cardiovascularDiseaseQuestions } from "@/data/quizzes";
import { SeeAlso } from "@/components/SeeAlso";
import ValvularHaemodynamicsDiagram from "@/components/diagrams/ValvularHaemodynamicsDiagram";

const keyPoints = [
  "Ischaemic heart disease is the leading cause of perioperative cardiac morbidity — maintain coronary perfusion pressure (CPP = DBP − LVEDP), avoid tachycardia, and continue β-blockers and statins perioperatively",
  "Severe aortic stenosis (valve area <1 cm², mean gradient >40 mmHg) carries the highest risk of perioperative cardiac death — maintain sinus rhythm, avoid hypotension, and ensure adequate preload",
  "Heart failure patients with EF <30% require careful fluid management, avoidance of myocardial depressants, and consideration of cardiac output monitoring for major surgery",
  "Patients with permanent pacemakers/ICDs require device interrogation preoperatively; ICDs should have anti-tachycardia therapy deactivated with external defibrillation available",
  "Pulmonary hypertension (mPAP ≥25 mmHg) carries perioperative mortality of 1–7%; avoid hypoxia, hypercarbia, acidosis, and excessive PEEP which increase PVR",
];

const CardiovascularDiseaseTopic = () => {
  return (
    <SectionLayout
      title="Cardiovascular Co-Existing Disease"
      subtitle="Ischaemic heart disease, valvular disease, heart failure, arrhythmias, pulmonary hypertension, and congenital heart disease in adults"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
    >
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed">
          Cardiovascular disease is the leading driver of perioperative morbidity and mortality. This topic covers the conditions most likely to influence anaesthetic planning — ischaemic heart disease, valvular pathology, heart failure, arrhythmias and devices, pulmonary hypertension, and adult congenital heart disease — with a focus on risk stratification, optimisation, and intra-operative goals.
        </p>
        <KeyLearningPoints points={keyPoints} />

        {/* Ischaemic Heart Disease */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ischaemic Heart Disease</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Preoperative Assessment</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Functional capacity assessment (METs): patients unable to achieve 4 METs (climb one flight of stairs) are at increased risk</li>
                <li>Revised Cardiac Risk Index (Lee index): IHD, heart failure, CVA/TIA, insulin-dependent DM, creatinine &gt;177 µmol/L, high-risk surgery</li>
                <li>Recent MI: ideally delay elective surgery ≥6 weeks (bare metal stent) or ≥12 months (drug-eluting stent)</li>
                <li>Continue aspirin for most surgery; discuss DAPT with cardiologist and surgeon</li>
                <li>Continue β-blockers and statins — do NOT start high-dose β-blockers de novo (POISE trial)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Anaesthetic Goals</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Maintain coronary perfusion pressure: CPP = DBP − LVEDP</li>
                <li>Avoid tachycardia (HR &lt;80 bpm ideal) — increases myocardial oxygen demand and reduces diastolic filling time</li>
                <li>Maintain normothermia — hypothermia causes catecholamine release, tachycardia, and increased SVR</li>
                <li>Invasive BP monitoring for major surgery; consider cardiac output monitoring</li>
                <li>Postoperative troponin surveillance for high-risk patients (VISION study — myocardial injury after non-cardiac surgery, MINS)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Valvular Heart Disease */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Valvular Heart Disease</h2>
          <ValvularHaemodynamicsDiagram />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Aortic Stenosis</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Highest perioperative risk of all valvular lesions — fixed cardiac output, concentric LV hypertrophy</li>
                <li>Severe AS: valve area &lt;1 cm², mean gradient &gt;40 mmHg, Vmax &gt;4 m/s</li>
                <li>Goals: maintain sinus rhythm, normal rate (60–80), adequate preload, and SVR</li>
                <li>Avoid: tachycardia, hypotension, loss of sinus rhythm, myocardial depression</li>
                <li>Neuraxial anaesthesia: cautious low-dose spinal or CSE may be considered; epidural preferred (slower onset)</li>
                <li>Emergency surgery: proceed with invasive monitoring, vasopressin/phenylephrine to maintain SVR</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Mitral Regurgitation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Regurgitant fraction worsened by: increased SVR, slow heart rate, increased preload</li>
                <li>Goals: slightly faster rate (80–100), reduced afterload, adequate preload, maintain contractility</li>
                <li>Regional anaesthesia with sympathetic block may actually be beneficial (reduced afterload)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Aortic Regurgitation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Goals: slightly faster rate (80–100), reduced SVR, maintain contractility</li>
                <li>Avoid: bradycardia (prolongs diastole → more regurgitation), increased afterload</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Mitral Stenosis</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Fixed low cardiac output; dependent on preload and diastolic filling time</li>
                <li>Goals: slow rate (60–80), maintain sinus rhythm, adequate preload, maintain SVR</li>
                <li>Avoid: tachycardia, fluid overload (risk of pulmonary oedema), AF, increased PVR</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Heart Failure */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Heart Failure</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Classification & Assessment</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>HFrEF (EF &lt;40%), HFmrEF (40–49%), HFpEF (EF ≥50%) — different pathophysiology and drug responses</li>
                <li>NYHA functional class correlates with perioperative risk</li>
                <li>BNP/NT-proBNP: independent predictors of perioperative cardiac events (NT-proBNP &gt;300 pg/mL = high risk)</li>
                <li>Preoperative echocardiography to assess EF, diastolic function, valve disease, and RV function</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Anaesthetic Management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Continue ACE inhibitors/ARBs on day of surgery controversial — risk of refractory hypotension; often omitted morning of surgery</li>
                <li>Continue β-blockers, diuretics, and digoxin</li>
                <li>Avoid myocardial depressants: use etomidate/ketamine for induction; sevoflurane better than desflurane for maintenance</li>
                <li>Careful IV fluid titration — goal-directed fluid therapy preferred</li>
                <li>Consider arterial line, CVP, and cardiac output monitoring for major surgery</li>
                <li>Postoperative HDU/ICU admission for NYHA III/IV or EF &lt;30%</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Arrhythmias & Pacemakers */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Arrhythmias, Pacemakers & ICDs</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Atrial Fibrillation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Most common perioperative arrhythmia; present in 5–10% of surgical patients &gt;65</li>
                <li>Rate control (β-blocker/diltiazem) preferred over rhythm control perioperatively</li>
                <li>Anticoagulation management: bridge with LMWH if CHA₂DS₂-VASc ≥2 and high thrombotic risk</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Pacemakers & ICDs</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Preoperative device check: type, indication, dependency, battery life, last check date</li>
                <li>Pacemaker-dependent patients: consider reprogramming to asynchronous mode (DOO/VOO) if diathermy needed</li>
                <li>ICDs: disable anti-tachycardia therapy; apply external defibrillation pads</li>
                <li>Bipolar diathermy preferred; if monopolar used, place return electrode away from device</li>
                <li>Magnet application: converts pacemaker to asynchronous mode; disables ICD shock therapy (device-specific)</li>
                <li>Postoperative device re-interrogation mandatory</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pulmonary Hypertension */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pulmonary Hypertension</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Defined as mPAP ≥20 mmHg (updated 2022 ESC/ERS guidelines); perioperative mortality 1–7%</li>
                <li>RV failure is the primary cause of death — the RV cannot acutely adapt to increased afterload</li>
                <li>Factors increasing PVR (avoid): hypoxia, hypercarbia, acidosis, hypothermia, excessive PEEP, pain, light anaesthesia</li>
                <li>Factors reducing PVR (use): supplemental O₂, mild hyperventilation, inhaled NO (20 ppm), inhaled prostacyclin</li>
                <li>Continue pulmonary vasodilator therapy (sildenafil, bosentan, epoprostenol) perioperatively</li>
                <li>Regional anaesthesia may avoid the haemodynamic effects of positive pressure ventilation</li>
                <li>If GA needed: avoid N₂O, use opioid-based technique, consider milrinone/dobutamine for RV support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Congenital Heart Disease in Adults */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Adult Congenital Heart Disease</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Increasingly common as paediatric surgical survival improves; complex anatomy and physiology</li>
                <li>Eisenmenger syndrome: irreversible pulmonary hypertension with reversed (R→L) shunt; extremely high perioperative mortality</li>
                <li>Right-to-left shunts: avoid air embolism (meticulous de-airing of IV lines), reduced effect of inhalational induction, faster IV induction</li>
                <li>Left-to-right shunts: increased pulmonary blood flow, may develop pulmonary hypertension</li>
                <li>Antibiotic prophylaxis for endocarditis: no longer routinely recommended (NICE 2008) but consider in high-risk lesions</li>
                <li>Specialist centre involvement recommended for moderate/complex ACHD</li>
              </ul>
            </div>
          </div>
        </section>

        <QuizSection questions={cardiovascularDiseaseQuestions} />
        <ReferencesList topicId="cardiovascular-disease" />
        <SeeAlso topicId="cardiovascular-disease" />
        <TopicCompletionToggle topicId="cardiovascular-disease" topicTitle="Cardiovascular Co-Existing Disease" />
      </div>
    </SectionLayout>
  );
};

export default CardiovascularDiseaseTopic;

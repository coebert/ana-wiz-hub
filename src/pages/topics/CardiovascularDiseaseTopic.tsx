import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { cardiovascularDiseaseQuestions } from "@/data/quizzes";
import ValvularHaemodynamicsDiagram from "@/components/diagrams/perioperative/ValvularHaemodynamicsDiagram";
import { Exam } from "@/data/curriculum";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";

const objectives = [
  "Stratify perioperative cardiac risk (METs, RCRI, ESC/ESA pathway) and decide on further investigation.",
  "Set haemodynamic goals for ischaemic heart disease and major valvular lesions, especially severe AS.",
  "Manage heart failure, perioperative β-blockade, statins and antiplatelet/anticoagulant therapy.",
  "Plan safe management of patients with permanent pacemakers and ICDs.",
  "Anaesthetise patients with pulmonary hypertension and adult congenital heart disease while protecting RV function.",
];

const keyPoints = [
  { text: "Ischaemic heart disease is the leading cause of perioperative cardiac morbidity — maintain coronary perfusion pressure (CPP = DBP − LVEDP), avoid tachycardia, and continue β-blockers and statins perioperatively", cites: ["ESC/ESA 2022", "AHA/ACC 2014"] },
  { text: "Severe aortic stenosis (valve area <1 cm², mean gradient >40 mmHg) carries the highest risk of perioperative cardiac death — maintain sinus rhythm, avoid hypotension, and ensure adequate preload", cites: ["BJA Educ Valvular 2015", "ESC/ESA 2022"] },
  { text: "Heart failure patients with EF <30% require careful fluid management, avoidance of myocardial depressants, and consideration of cardiac output monitoring for major surgery", cites: ["ESC/ESA 2022", "AHA/ACC 2014"] },
  { text: "Patients with permanent pacemakers/ICDs require device interrogation preoperatively; ICDs should have anti-tachycardia therapy deactivated with external defibrillation available", cites: ["BJA Educ 2017", "AHA/ACC 2014"] },
  { text: "Pulmonary hypertension (mPAP ≥20 mmHg) carries perioperative mortality of 1–7%; avoid hypoxia, hypercarbia, acidosis, and excessive PEEP which increase PVR", cites: ["ESC/ESA 2022"] },
  { text: "For elective surgery, proceed if pre-assessment BP is <180/110 mmHg; only defer for primary-care optimisation above this threshold (AAGBI/BHS 2016). Withhold ACE-I/ARB on the morning of surgery and target MAP ≥80 mmHg in chronic hypertensives (POISE-3 2023; ACC/AHA 2024)", cites: ["AAGBI HTN 2016", "POISE-3 2023", "ACC/AHA 2024 Periop", "NICE NG136"] },

];

const CardiovascularDiseaseTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Perioperative β-blocker decision",
    scenario: "A 68-year-old for elective AAA repair is not on a β-blocker. He has stable angina, LVEF 55%, no heart failure. Should you start one preoperatively?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Risk-stratify: vascular surgery is high-risk; he has known IHD (RCRI ≥2)</li>
          <li>Recall POISE-1: peri-operative metoprolol started on the day of surgery reduced MI but increased stroke and total mortality (NNH for death 167)</li>
          <li>Current ESC/AHA: do NOT initiate β-blockers within 24 h of non-cardiac surgery; continue chronic β-blockers; consider starting ≥7 days in advance with titration if indicated</li>
          <li>Optimise alternative cardiac protection: statin, aspirin per surgeon, treat anaemia, plan invasive arterial monitoring and goal-directed haemodynamic care</li>
          <li>Document discussion and shared decision-making</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Initiating high-dose β-blockade on the morning of surgery (POISE) — hypotension and stroke</li>
          <li>Stopping chronic β-blockers perioperatively — rebound tachycardia and ischaemia</li>
          <li>Confusing RCRI with the Revised Cardiac Risk Index — verify the calculator</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Do not start a β-blocker acutely; refer to cardiology for elective ≥7-day titration if indicated. Continue statins, ensure haemoglobin optimisation, and use goal-directed intra-operative haemodynamic monitoring.",
    cites: ["BJA Educ 2017", "ESC/ESA 2022", "NICE CG181"],
  },
];

const tocItems = [
  { id: "section-risk-stratification", label: "Perioperative Cardiac Risk Stratification", group: "Core" },
  { id: "section-ischaemic-heart-disease", label: "Ischaemic Heart Disease", group: "Core" },
  { id: "section-valvular-heart-disease", label: "Valvular Heart Disease", group: "Core" },
  { id: "section-hypertension", label: "Hypertension", group: "Core" },
  { id: "section-heart-failure", label: "Heart Failure & Cardiomyopathy", group: "Management" },
  { id: "section-arrhythmias-pacemakers-and-icds", label: "Arrhythmias, Pacemakers & ICDs", group: "Devices" },
  { id: "section-pulmonary-hypertension", label: "Pulmonary Hypertension", group: "Specialist" },
  { id: "section-adult-congenital-heart-disease", label: "Adult Congenital Heart Disease", group: "Specialist" },
  { id: "section-postoperative-care", label: "Postoperative Cardiac Care", group: "Management" },
];

const cardiovascularDiseaseFaqs: Array<[string, string]> = [
  ["What are the haemodynamic goals for severe aortic stenosis?", "Maintain sinus rhythm, a normal or slightly low heart rate (60–80), adequate preload and high systemic vascular resistance — use phenylephrine or vasopressin first-line for hypotension, and avoid agents that drop SVR or cause tachycardia."],
  ["How should a pacemaker-dependent patient be managed when monopolar diathermy is required?", "Reprogramme to an asynchronous mode (DOO/VOO) or apply a clinical magnet, position the diathermy return plate so the current path does not cross the device, use short bipolar bursts where possible, and check the device postoperatively."],
  ["What are the anaesthetic principles in pulmonary hypertension?", "Avoid hypoxia, hypercarbia, acidosis, hypothermia and high airway pressures — all increase pulmonary vascular resistance. Maintain RV preload and coronary perfusion pressure, use noradrenaline or vasopressin for systemic hypotension, and have inhaled pulmonary vasodilators (NO, iloprost) available."],
  ["At what blood pressure should an elective case be cancelled for hypertension?", "Per the AAGBI/BHS 2016 joint guideline, proceed if pre-assessment BP is <180 mmHg systolic AND <110 mmHg diastolic. Above this, refer back to primary care for optimisation rather than treating acutely on the day — there is no evidence that short-term in-hospital lowering reduces perioperative cardiac risk and rapid drops may cause harm."],
  ["How should ACE inhibitors and ARBs be managed on the day of surgery?", "Both ESC/ESA 2022 and the 2024 ACC/AHA perioperative guideline recommend withholding ACE-I/ARB on the morning of surgery when they are prescribed for hypertension, to reduce intra-operative hypotension. POISE-3 (2023) supports this 'hypotension-avoidance' approach with a MAP target ≥80 mmHg. Restart within 48 h once the patient is euvolaemic with stable renal function."],
  ["How do you manage true hypertensive emergency before urgent surgery?", "Use an arterial line and titrate IV antihypertensives (labetalol or esmolol for dissection/phaeochromocytoma surge, GTN for ACS/pulmonary oedema, magnesium + labetalol for eclampsia) to lower MAP by no more than 20–25% in the first hour, then to around 160/100 mmHg over 2–6 h. Treat reversible precipitants (pain, hypoxia, hypercarbia, raised ICP) first. Truly time-critical surgery should not be delayed for chronic hypertension alone."],
];

const CardiovascularDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Cardiovascular Co-Existing Disease"
      subtitle="Ischaemic heart disease, valvular disease, heart failure, arrhythmias, pulmonary hypertension, and congenital heart disease in adults"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="cardiovascular-disease"
      topicTitle="Cardiovascular Co-Existing Disease"
      workedExamples={CardiovascularDiseaseTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={cardiovascularDiseaseQuestions}
       sectionExamMapping={{
         objectives: { exams: [Exam.FINAL, Exam.FFICM] },
         keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
       }}
       sectionSources={{
         objectives: ["ESC/ESA 2022", "AHA/ACC 2014"],
         keyPoints: ["BJA Educ 2017", "ESC/ESA 2022", "BJA Educ Valvular 2015", "AHA/ACC 2014", "NICE CG181", "AAGBI HTN 2016", "POISE-3 2023", "ACC/AHA 2024 Periop", "NICE NG136"],
       }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <p className="text-muted-foreground leading-relaxed">
           Cardiovascular disease is the leading driver of perioperative morbidity and mortality. This topic covers the conditions most likely to influence anaesthetic planning — ischaemic heart disease, valvular pathology, heart failure, arrhythmias and devices, pulmonary hypertension, and adult congenital heart disease — with a focus on risk stratification, optimisation, and intra-operative goals.
         </p>
         <TopicTableOfContents items={tocItems} />

         {/* Perioperative Risk Stratification */}
         <section id="section-risk-stratification" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Perioperative Cardiac Risk Stratification</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Risk Prediction Tools</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Revised Cardiac Risk Index (RCRI, Lee 1999)</strong> — one point each for: high-risk surgery (intraperitoneal/intrathoracic/suprainguinal vascular), history of IHD, history of heart failure, history of cerebrovascular disease, insulin-dependent diabetes, creatinine &gt;177 µmol/L (2.0 mg/dL). Risk of major cardiac complication: 0 points ≈0.4%, 1 point ≈1%, 2 points ≈2.4%, ≥3 points ≈5.4%</li>
                <li><strong>ACS-NSQIP Surgical Risk Calculator / MICA model</strong> — incorporates ASA grade, functional status, procedure type and comorbidities to give a continuous predicted risk of MI or cardiac arrest; performs better than RCRI at the extremes of risk and is endorsed by ACC/AHA 2014 and 2024 as the preferred first step</li>
                <li>ESC/ESA 2022 stepwise pathway: (1) urgency of surgery, (2) active cardiac conditions (unstable angina, decompensated HF, severe arrhythmia, severe valve disease), (3) surgery-specific risk (low &lt;1%, intermediate 1–5%, high &gt;5% 30-day cardiovascular death/MI), (4) functional capacity, (5) further testing only if it will change management</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Functional Capacity & CPET</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Functional capacity expressed in metabolic equivalents (METs): 1 MET = resting O₂ consumption (3.5 mL/kg/min). Climbing a flight of stairs or walking briskly on the flat ≈4 METs; the inability to achieve 4 METs on self-report (Duke Activity Status Index) is associated with increased perioperative and long-term cardiac risk (METS trial 2018 confirmed self-reported METs poorly predict complications, favouring objective testing)</li>
                <li>Cardiopulmonary exercise testing (CPET) gives objective, reproducible values: anaerobic threshold (AT) &lt;11 mL/kg/min identifies increased perioperative risk, and AT &lt;11 mL/kg/min combined with myocardial ischaemia on ECG during CPET carries the highest risk</li>
                <li>Peak VO₂ &lt;15 mL/kg/min (or &lt;15–20 mL/kg/min depending on surgery/procedure) is also used as a threshold for high risk before major surgery (e.g. lung resection, major intra-abdominal or intrathoracic surgery)</li>
                <li>Ventilatory equivalent for CO₂ (VE/VCO₂ slope) &gt;34–36 is an additional adverse prognostic marker, particularly relevant in heart failure and pulmonary hypertension</li>
                <li>CPET use is limited by peripheral vascular disease, musculoskeletal limitation and poor patient effort — use pharmacological or imaging stress tests as an alternative when CPET is not feasible</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Biomarkers: BNP/NT-proBNP and Troponin</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Preoperative BNP &gt;92 pg/mL or NT-proBNP &gt;300 pg/mL (age &lt;70) / &gt;450 pg/mL (age ≥70, or per local assay) independently predicts postoperative myocardial injury and death, and is recommended by ESC/ESA 2022 and Canadian Cardiovascular Society guidance in patients ≥65 y or 45–64 y with cardiovascular disease undergoing intermediate/high-risk non-cardiac surgery</li>
                <li>An elevated biomarker should trigger postoperative troponin surveillance rather than automatic cancellation or further non-invasive testing (which rarely changes management)</li>
                <li><strong>Myocardial Injury after Non-Cardiac Surgery (MINS)</strong> — defined by the VISION study as a troponin rise attributable to ischaemia (with or without symptoms) within 30 days of surgery; independently predicts 30-day mortality. Diagnostic troponin T threshold for MINS ≥65 ng/L (or any rise/fall pattern with peak ≥20 ng/L plus ischaemic features) depending on assay generation</li>
                <li>Recommended surveillance: measure troponin pre-operatively and at 6–12 h and on day 1–2 post-op in patients with RCRI ≥1, age &gt;65, or significant cardiovascular disease undergoing intermediate/high-risk non-cardiac surgery (ESC/ESA 2022; ACC/AHA 2024)</li>
                <li>Management of MINS/perioperative MI: cardiology review, dual antiplatelet/anticoagulation balanced against bleeding risk, echocardiography, and secondary prevention (statin, ACE-I, β-blocker) as tolerated — most perioperative MIs are Type 2 (supply–demand mismatch) rather than plaque rupture</li>
              </ul>
            </div>
          </div>
        </section>

         {/* Ischaemic Heart Disease */}
         <section id="section-ischaemic-heart-disease" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ischaemic Heart Disease</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
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
         <section id="section-valvular-heart-disease" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Valvular Heart Disease</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
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

         {/* Hypertension */}
         <section id="section-hypertension" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hypertension</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Definitions & Staging (NICE NG136, 2023)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Stage 1: clinic BP 140/90–159/99 mmHg with ABPM/HBPM ≥135/85</li>
                <li>Stage 2: clinic BP 160/100–179/119 mmHg with ABPM/HBPM ≥150/95</li>
                <li>Stage 3 / severe: clinic systolic ≥180 mmHg <em>or</em> diastolic ≥120 mmHg</li>
                <li>Treatment thresholds and targets (clinic): &lt;140/90 mmHg under 80 y; &lt;150/90 mmHg ≥80 y</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Elective Surgery — Thresholds (AAGBI/BHS 2016)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Accept primary-care BP &lt;160/100 mmHg documented within the last 12 months without further measurement</li>
                <li>If no recent reading, measure in pre-assessment using a standardised technique (seated, rested, validated device)</li>
                <li>Proceed with elective surgery if pre-assessment BP &lt;180 systolic <strong>and</strong> &lt;110 mmHg diastolic</li>
                <li>Defer and refer back to primary care only if BP ≥180/110 mmHg — no evidence that short-term in-hospital treatment reduces perioperative cardiac risk, and rapid lowering may cause harm</li>
                <li>End-organ damage (LVH, retinopathy, renal impairment), not the absolute BP alone, drives true perioperative risk — investigate where suspected</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Chronic Antihypertensive Management on the Day</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Continue β-blockers, calcium-channel blockers and centrally acting agents (clonidine, methyldopa) — abrupt withdrawal causes rebound hypertension/ischaemia</li>
                <li>ACE inhibitors / ARBs: ESC/ESA 2022 and ACC/AHA 2024 both recommend <strong>withholding on the morning of surgery</strong> in patients taking them for hypertension to reduce intra-operative hypotension; POISE-3 (2023) supports a hypotension-avoidance strategy (omit ACE-I/ARB, target MAP ≥80 mmHg) over continued therapy</li>
                <li>Restart ACE-I/ARB within 48 h post-op once euvolaemic and renal function stable</li>
                <li>Diuretics: typically omit on the morning of major surgery to avoid hypovolaemia and electrolyte disturbance</li>
                <li>SGLT2 inhibitors: withhold for ≥3 days (4 days for ertugliflozin) pre-op (MHRA 2024; ACC/AHA 2024) to reduce euglycaemic DKA risk</li>
                <li>Continue statins and aspirin per surgical/bleeding risk</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Intra-operative Goals</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Target MAP within 20% of the patient's pre-operative baseline; avoid MAP &lt;65 mmHg (and &lt;80 mmHg in those with chronic hypertension) — sustained intra-operative hypotension is strongly associated with myocardial injury, AKI and stroke (POISE-3, 2023)</li>
                <li>Anticipate exaggerated swings: pronounced hypotension on induction (volume depletion + vasodilator anaesthetics) and surges on laryngoscopy, extubation and emergence</li>
                <li>Attenuate the pressor response (opioid bolus, lidocaine, β-blocker, deepen anaesthesia); have vasopressors (phenylephrine, noradrenaline) and short-acting vasodilators (labetalol, GTN, esmolol) immediately available</li>
                <li>Consider invasive arterial monitoring for stage 3 hypertension, end-organ damage, or major surgery</li>
                <li>Multimodal analgesia and good postoperative pain control prevent sympathetic-driven hypertensive surges</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Urgent / Emergency Surgery</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Time-critical surgery should <strong>not</strong> be delayed to treat chronic hypertension — the risk of acute lowering (cerebral, coronary and renal hypoperfusion in chronically auto-regulated patients) outweighs benefit</li>
                <li>True hypertensive emergency (BP ≥180/120 mmHg <em>with</em> evolving end-organ damage — encephalopathy, ACS, pulmonary oedema, aortic dissection, eclampsia) requires controlled IV reduction <em>before</em> non-life-saving surgery: lower MAP by no more than 20–25% in the first hour, then to ~160/100 mmHg over the next 2–6 h (NICE NG136; ACC/AHA 2024)</li>
                <li>Drug choice tailored to the syndrome: labetalol or esmolol for dissection and phaeochromocytoma surge; GTN for pulmonary oedema and ACS; magnesium and labetalol for eclampsia; avoid sublingual nifedipine (uncontrolled drops)</li>
                <li>Use an arterial line and titrate infusions; correct precipitants (pain, hypoxia, hypercarbia, full bladder, raised ICP) before escalating drugs</li>
                <li>Restart oral therapy as early as enteral access allows; document a plan for outpatient BP optimisation post-discharge</li>
              </ul>
            </div>
          </div>
        </section>

         {/* Heart Failure */}
         <section id="section-heart-failure" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Heart Failure</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
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
         <section id="section-arrhythmias-pacemakers-and-icds" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Arrhythmias, Pacemakers & ICDs</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
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
         <section id="section-pulmonary-hypertension" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pulmonary Hypertension</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
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
         <section id="section-adult-congenital-heart-disease" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Adult Congenital Heart Disease</h2>
          <ExamMappingBadges exams={[Exam.FINAL]} curriculumCodes={["PO_BK_05"]} />
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
        <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              'Severe AS (valve area <1 cm², gradient >40 mmHg): maintain sinus rhythm, normal HR (60–80), preload and SVR — use phenylephrine/vasopressin first-line.',
              'CPP = DBP − LVEDP — in IHD avoid tachycardia and diastolic hypotension; continue β-blockers and statins.',
              'Pulmonary hypertension: avoid hypoxia, hypercarbia, acidosis, hypothermia and high PEEP — all increase PVR and precipitate RV failure.',
              'Pacemaker-dependent patient + monopolar diathermy: reprogramme to asynchronous (DOO/VOO) or apply magnet; for ICDs disable tachy-therapy and have external pads on.',
              'AF: rate control (β-blocker / diltiazem) usually preferred perioperatively; weigh CHA₂DS₂-VASc vs HAS-BLED for bridging.',
              'Eisenmenger / right-to-left shunt: meticulous IV de-airing, maintain SVR, avoid PVR rises — extremely high perioperative mortality.',
              'Elective surgery + chronic hypertension: proceed if pre-assessment BP <180/110 mmHg (AAGBI/BHS 2016); do not lower acutely on the day — refer back to primary care above threshold.',
              'Chronic hypertensives: target intra-operative MAP within 20% of baseline and ≥80 mmHg (POISE-3 2023); omit ACE-I/ARB on the morning of surgery to limit induction hypotension.',
              'Hypertensive emergency before urgent surgery: lower MAP by ≤20–25% in the first hour with titratable IV agents (labetalol/esmolol/GTN); avoid sublingual nifedipine.',
            ]}
          />
          <TopicFaqs faqs={cardiovascularDiseaseFaqs} />
        </ExamSection>
      }
    />
  );
};

export default CardiovascularDiseaseTopic;

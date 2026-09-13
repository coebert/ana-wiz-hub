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
import { InlineRef } from "@/components/references/InlineRef";

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
  { id: "section-cardiomyopathies", label: "Cardiomyopathies", group: "Management" },
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
                <li>Functional capacity assessment (METs): patients unable to achieve 4 METs (climb one flight of stairs) are at increased risk (see Risk Stratification section for CPET thresholds)</li>
                <li>Revised Cardiac Risk Index (Lee index): IHD, heart failure, CVA/TIA, insulin-dependent DM, creatinine &gt;177 µmol/L, high-risk surgery</li>
                <li>Recent MI without revascularisation: ideally delay elective surgery ≥60 days (ACC/AHA 2024); if urgent, involve cardiology and plan invasive monitoring</li>
                <li>Continue aspirin for most surgery; discuss DAPT with cardiologist and surgeon</li>
                <li>Continue β-blockers and statins — do NOT start high-dose β-blockers de novo (POISE trial)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Timing of Surgery After Coronary Stenting</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Bare-metal stent (BMS):</strong> delay elective non-cardiac surgery for at least <strong>1 month</strong> (minimum) to allow endothelialisation and completion of at least a short course of dual antiplatelet therapy (DAPT)</li>
                <li><strong>Drug-eluting stent (DES) — newer-generation:</strong> delay elective surgery for at least <strong>6 months</strong> after implantation where possible; surgery between 1–6 months may proceed if delay carries greater risk than continuing at least aspirin monotherapy, after multidisciplinary discussion (cardiology, surgeon, anaesthetist)</li>
                <li>Balloon angioplasty without stent: delay elective surgery ≥2 weeks (14 days) if possible</li>
                <li>Time-critical/cancer surgery within the DAPT window: continue aspirin, stop the P2Y12 inhibitor (clopidogrel 5 days, ticagrelor 3–5 days, prasugrel 7 days pre-op) after cardiology input, and restart as soon as safely possible post-op — never stop both agents simultaneously in the early post-stent period (acute stent thrombosis risk)</li>
                <li>DAPT management framework: continue aspirin perioperatively in almost all cases (bleeding risk from stopping is usually outweighed by thrombotic risk); interrupt the P2Y12 inhibitor only, for the shortest safe period, with a defined restart plan</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Perioperative β-blockade, Statins and Antiplatelets — The Evidence</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>POISE trial (2008):</strong> extended-release metoprolol started 2–4 h pre-op reduced non-fatal MI (RR 0.73) but significantly increased stroke (RR 2.17) and all-cause mortality (RR 1.33), largely due to hypotension and bradycardia from a high, rapidly-titrated dose — this established that β-blockers should never be initiated on the day of surgery</li>
                <li>Current guidance (ESC/ESA 2022, ACC/AHA 2024): continue chronic β-blocker therapy perioperatively without interruption; if starting for a new indication, begin ≥7 days (ideally 2–4 weeks) before surgery with careful dose titration, not on the day</li>
                <li>Statins: continue perioperatively in all patients already on therapy (rebound endothelial dysfunction and myocardial injury with abrupt withdrawal); consider starting a statin pre-operatively in high-risk vascular surgery patients even if statin-naïve (pleiotropic plaque-stabilising effect, evidence strongest in vascular surgery cohorts)</li>
                <li>Aspirin: POISE-2 (2014) showed no benefit and increased major bleeding when aspirin was continued/started purely for perioperative cardiac protection in patients without recent coronary stents — so aspirin is not routinely continued "for the heart" in stent-naïve patients, but should be continued in those with a coronary stent per the DAPT principles above</li>
                <li>ACE-I/ARB: see Hypertension section — omit on the morning of surgery in patients taking them purely for hypertension; continue in decompensating heart failure per specialist advice</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Anaesthetic Goals</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Maintain coronary perfusion pressure: CPP = DBP − LVEDP</li>
                <li>Avoid tachycardia (HR &lt;80 bpm ideal) — increases myocardial oxygen demand and reduces diastolic filling time</li>
                <li>Maintain normothermia — hypothermia causes catecholamine release, tachycardia, and increased SVR</li>
                <li>Invasive BP monitoring for major surgery; consider cardiac output monitoring</li>
                <li>Postoperative troponin surveillance for high-risk patients (VISION study — myocardial injury after non-cardiac surgery, MINS) — see Risk Stratification section for thresholds and surveillance schedule</li>
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
            <div className="bg-card border border-border rounded-lg p-4 overflow-x-auto">
              <h3 className="font-semibold text-foreground mb-2">Haemodynamic Goals — Summary Table (Preload / Afterload / Rate / Rhythm / Contractility)</h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border text-foreground">
                    <th className="text-left py-1 pr-2">Lesion</th>
                    <th className="text-left py-1 pr-2">Preload</th>
                    <th className="text-left py-1 pr-2">Afterload (SVR)</th>
                    <th className="text-left py-1 pr-2">Heart rate</th>
                    <th className="text-left py-1 pr-2">Rhythm</th>
                    <th className="text-left py-1 pr-2">Contractility</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50"><td className="py-1 pr-2">Aortic stenosis</td><td className="py-1 pr-2">Full/high</td><td className="py-1 pr-2">Maintain/high</td><td className="py-1 pr-2">60–80 (avoid tachy/brady)</td><td className="py-1 pr-2">Sinus essential</td><td className="py-1 pr-2">Maintain</td></tr>
                  <tr className="border-b border-border/50"><td className="py-1 pr-2">Aortic regurgitation</td><td className="py-1 pr-2">Full</td><td className="py-1 pr-2">Reduce (vasodilate)</td><td className="py-1 pr-2">80–100 (avoid brady)</td><td className="py-1 pr-2">Sinus preferred</td><td className="py-1 pr-2">Maintain</td></tr>
                  <tr className="border-b border-border/50"><td className="py-1 pr-2">Mitral stenosis</td><td className="py-1 pr-2">Full but avoid overload</td><td className="py-1 pr-2">Maintain</td><td className="py-1 pr-2">60–80 (avoid tachy)</td><td className="py-1 pr-2">Sinus essential; treat AF promptly</td><td className="py-1 pr-2">Maintain</td></tr>
                  <tr className="border-b border-border/50"><td className="py-1 pr-2">Mitral regurgitation</td><td className="py-1 pr-2">Full</td><td className="py-1 pr-2">Reduce (vasodilate)</td><td className="py-1 pr-2">80–100</td><td className="py-1 pr-2">Sinus preferred</td><td className="py-1 pr-2">Maintain</td></tr>
                  <tr><td className="py-1 pr-2">HOCM</td><td className="py-1 pr-2">Full (avoid hypovolaemia)</td><td className="py-1 pr-2">Maintain/high (avoid drops)</td><td className="py-1 pr-2">Slow-normal (avoid tachy)</td><td className="py-1 pr-2">Sinus essential</td><td className="py-1 pr-2">Reduce/avoid inotropes</td></tr>
                </tbody>
              </table>
              <p className="text-xs mt-2">Fixed-obstruction lesions (AS, MS, HOCM) and dynamic-obstruction HOCM all share a requirement for adequate preload and avoidance of vasodilatation/tachycardia; regurgitant lesions (AR, MR) benefit from afterload reduction and a slightly faster heart rate to shorten diastole/reduce regurgitant time.</p>
            </div>
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
                <li>Chronic elevation of left atrial pressure is transmitted backwards, producing post-capillary (Group 2) pulmonary hypertension over time <InlineRef topicId="cardiovascular-disease" refLabel="BJA Educ Valvular 2015" /></li>
                <li>Long-standing pulmonary hypertension causes RV pressure overload, hypertrophy and eventual RV failure — RV function, not the mitral valve itself, often determines perioperative outcome in advanced disease</li>
                <li>Anaesthetic goals therefore extend to preserving RV contractility and avoiding any rise in pulmonary vascular resistance (hypoxia, hypercarbia, acidosis, hypothermia, excessive PEEP)</li>
                <li>A fall in systemic pressure risks dynamic RV ischaemia (reduced RV coronary perfusion pressure in the presence of a pressure-loaded RV) — maintain SVR and avoid abrupt hypotension</li>
                <li>Consider a pulmonary artery catheter in severe MS with significant pulmonary hypertension undergoing major surgery, to guide RV-directed fluid and inotrope/vasopressor therapy</li>
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
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">NYHA Functional Classification</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Class I:</strong> no limitation of physical activity; ordinary activity does not cause symptoms</li>
                <li><strong>Class II:</strong> slight limitation; comfortable at rest, ordinary activity causes dyspnoea/fatigue/palpitations</li>
                <li><strong>Class III:</strong> marked limitation; comfortable at rest, less-than-ordinary activity causes symptoms</li>
                <li><strong>Class IV:</strong> symptomatic at rest; any physical activity increases discomfort — highest perioperative risk, approximates RCRI "heart failure" criterion regardless of EF</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Left Ventricular Assist Devices (LVAD)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Continuous-flow (non-pulsatile) devices are now standard — patients may have a weak or absent palpable pulse and unreliable pulse oximetry/NIBP; use Doppler-derived MAP or an arterial line for accurate pressure monitoring</li>
                <li>LVAD output is preload-dependent and afterload-sensitive: avoid hypovolaemia and avoid excessive systemic vasodilation or vasoconstriction — maintain euvolaemia and treat hypertension (which impairs LVAD flow) promptly</li>
                <li>Right ventricular failure is the major perioperative threat — avoid factors that raise PVR (hypoxia, hypercarbia, acidosis) and maintain RV preload/contractility</li>
                <li>Patients are anticoagulated (warfarin ± antiplatelet); balance thrombotic (pump thrombosis, stroke) versus bleeding risk with specialist LVAD/cardiology team involvement for any surgery</li>
                <li>Avoid strong magnets/electromagnetic interference near controller; involve the LVAD coordinator/physiologist for perioperative management and have device-specific emergency algorithms available</li>
                <li>Non-cardiac surgery in LVAD patients should occur at, or in direct liaison with, a specialist LVAD centre wherever possible</li>
              </ul>
            </div>
          </div>
        </section>

         {/* Cardiomyopathies */}
         <section id="section-cardiomyopathies" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiomyopathies</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Dilated Cardiomyopathy — "Forward, Fast and Relaxed"</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Goals: maintain forward flow, keep heart rate at the higher end of normal (80–100 bpm) to preserve cardiac output in a poorly contractile, dilated ventricle, reduce afterload to improve ejection fraction, and maintain preload carefully (both hypovolaemia and fluid overload are poorly tolerated) <InlineRef topicId="cardiovascular-disease" refLabel="ESC/ESA 2022" /></li>
                <li>Avoid: myocardial depressant agents (high-dose volatile, large boluses of propofol) and large increases in afterload (pain, light anaesthesia, vasopressor overuse), both of which precipitate acute decompensation</li>
                <li>Consider inotropic support and regional/neuraxial techniques that reduce SVR (with careful, incremental titration) to unload the failing ventricle</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Hypertrophic Obstructive Cardiomyopathy (HOCM) — "Slow, Full and Tight"</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Dynamic left ventricular outflow tract (LVOT) obstruction worsened by anything that reduces LV cavity size or increases contractility/outflow velocity</li>
                <li>Goals: slow the heart rate to maximise diastolic filling time, keep intravascular volume full, and maintain (or increase) afterload/SVR to reduce the LVOT gradient</li>
                <li>Avoid: tachycardia (shortens diastolic filling and worsens obstruction), hypovolaemia, and vasodilatation — the "SAM" (systolic anterior motion) triad of hypovolaemia, tachycardia, and increased contractility/reduced afterload should be actively avoided</li>
                <li>Avoid single-shot spinal anaesthesia (abrupt sympathectomy and vasodilatation are poorly tolerated); an epidural, titrated slowly and incrementally, is preferred if neuraxial technique is required</li>
                <li>Phenylephrine is the first-line vasopressor for hypotension — a pure α-agonist raises SVR without increasing contractility or heart rate; avoid inotropes/exogenous catecholamines (adrenaline, dobutamine), which worsen the gradient</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Restrictive Cardiomyopathy</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Physiology closely resembles constrictive pericarditis — stiff, non-compliant ventricles with impaired diastolic filling but preserved systolic function</li>
                <li>Goals: maintain preload, maintain sinus rhythm (the atrial contribution to ventricular filling is vital in a non-compliant ventricle — loss of atrial kick or AF is poorly tolerated), maintain SVR, and keep heart rate low-normal to allow adequate diastolic filling time</li>
                <li>Avoid tachycardia and hypovolaemia — both critically reduce filling and cardiac output in a preload-dependent, non-compliant ventricle</li>
                <li>Prone to both systemic and pulmonary venous congestion — fluid overload is poorly tolerated and readily precipitates pulmonary oedema and hepatic/systemic congestion, so fluid administration should be cautious and closely monitored <InlineRef topicId="cardiovascular-disease" refLabel="ACC/AHA 2024 Periop" /></li>
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
                <li>Most common perioperative arrhythmia; present in 5–10% of surgical patients &gt;65, and new-onset in up to 10% after major non-cardiac surgery</li>
                <li>Perioperative rate control target: resting HR &lt;110 bpm (lenient control acceptable if asymptomatic and haemodynamically stable); β-blocker (IV metoprolol/esmolol) or diltiazem/verapamil first-line — avoid calcium-channel blockers in significant LV impairment</li>
                <li>Rate control is generally preferred perioperatively; a rhythm-control strategy is instead indicated for haemodynamic instability, new-onset AF in a younger patient (lower burden of structural disease, greater chance of successful cardioversion), symptomatic intolerance of AF (e.g. severe palpitations, angina), or clear patient preference <InlineRef topicId="cardiovascular-disease" refLabel="ESC/ESA 2022" /></li>
                <li>New-onset perioperative AF: actively search for and correct a precipitant/trigger before or alongside rate control — sepsis, pain, hypovolaemia, electrolyte disturbance (especially K⁺/Mg²⁺), myocardial ischaemia, hypoxia, and pulmonary embolism should all be considered and excluded/treated</li>
                <li>Urgent synchronised DC cardioversion is indicated for AF causing haemodynamic compromise (hypotension, pulmonary oedema, ongoing ischaemia, or reduced consciousness) — deliver a synchronised shock under general anaesthesia/deep sedation, using escalating energies if the initial shock fails, with anticoagulation considerations (thromboembolic risk if AF onset is uncertain or &gt;48 h, though this should not delay cardioversion in a haemodynamically compromised patient)</li>
                <li>Pharmacological cardioversion (e.g. IV amiodarone) is an option where DC cardioversion is not immediately available or appropriate, but onset of action is slower and effectiveness is reduced with longer-standing AF or structural heart disease — amiodarone is also useful for rate control and rhythm stabilisation in the critically unwell perioperative patient</li>
                <li>Anticoagulation management: bridge with LMWH only if CHA₂DS₂-VASc ≥2 and high thrombotic risk (e.g. mechanical valve, recent stroke); balance against HAS-BLED bleeding risk and surgical bleeding risk category — most patients on a DOAC for AF alone do not need heparin bridging</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Cardiac Implantable Electronic Devices (CIEDs) — Preoperative Checks</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Identify device type (pacemaker vs ICD vs CRT), manufacturer, indication, underlying rhythm, and whether the patient is pacemaker-dependent</li>
                <li>Obtain the most recent interrogation report (should be within the last 12 months for a pacemaker, 6 months for an ICD, per HRS/BHRS guidance) — check battery status/elective replacement indicator and lead integrity</li>
                <li>Classify surgical electromagnetic interference (EMI) risk: high risk includes surgery above the umbilicus, monopolar diathermy near the device/leads, and procedures using electrocautery, RF ablation, lithotripsy or MRI</li>
                <li>Liaise with cardiac physiology/pacing team before high-risk procedures for a documented perioperative plan</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Intraoperative Management: Reprogramming, Magnets and Diathermy</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Pacemaker-dependent patient + high-EMI-risk surgery:</strong> formally reprogramme to an asynchronous fixed-rate mode (DOO/VOO) or activate rate-responsive-off before surgery — EMI can be misinterpreted as intrinsic activity and cause inappropriate inhibition (asystole in a dependent patient)</li>
                <li><strong>Magnet response — pacemakers:</strong> placing a clinical magnet over most pacemakers converts them to an asynchronous mode (typically DOO/VOO) for as long as the magnet remains in place, protecting against oversensing-induced inhibition — but the response is device-specific and not guaranteed, so formal reprogramming is preferred whenever the device is dependent and the surgery is high-risk</li>
                <li><strong>Magnet response — ICDs:</strong> a magnet over an ICD suspends anti-tachycardia therapy (detection and shock delivery) but does <em>not</em> change any underlying pacing mode — removing the magnet restores tachytherapy; always have external defibrillator pads placed and a manual defibrillator immediately available before disabling an ICD</li>
                <li><strong>Diathermy precautions:</strong> use bipolar diathermy wherever possible; if monopolar diathermy is required, use short bursts at the lowest effective power, and position the return (indifferent) electrode so the current path does not cross the device or leads (i.e. does not pass through the thorax) — never diathermy within 15 cm of the generator</li>
                <li><strong>Reprogramming indications:</strong> pacemaker-dependency with anticipated high-EMI surgery, biventricular/CRT devices (loss of resynchronisation with asynchronous pacing can precipitate heart failure), rate-responsive sensors that may misfire with vibration/electrocautery, and any planned use of MRI, external defibrillation, or radiofrequency ablation near the device</li>
                <li>Postoperative: re-interrogate and, if reprogrammed, restore original settings before discharge; document that device function was checked</li>
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
              <h3 className="font-semibold text-foreground mb-2">General Principles</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Increasingly common as paediatric surgical survival improves; complex anatomy and physiology — over 90% of children with congenital heart disease now survive to adulthood</li>
                <li>Left-to-right shunts (ASD, VSD, PDA): increased pulmonary blood flow; over years may cause pulmonary vascular remodelling and progression to pulmonary hypertension</li>
                <li>Antibiotic prophylaxis for endocarditis: not routinely recommended (NICE CG64/2008, reaffirmed) but individualised discussion in the highest-risk lesions (prosthetic valve/material, previous endocarditis, unrepaired cyanotic disease) is reasonable per specialist advice</li>
                <li>Specialist centre involvement mandatory for moderate/complex ACHD (per Bethesda/ESC classification) — anaesthesia at a non-specialist centre should be limited to minor, low-risk procedures</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Eisenmenger Syndrome and Right-to-Left Shunts</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Eisenmenger syndrome: a long-standing large left-to-right shunt causes progressive, irreversible pulmonary vascular disease until pulmonary vascular resistance exceeds systemic — the shunt reverses (right-to-left) causing cyanosis; associated with the highest perioperative mortality of any ACHD lesion (historically quoted as high as 20–40% for non-cardiac surgery, hence "do not operate unless essential")</li>
                <li>Any fall in SVR or rise in PVR increases right-to-left shunting and worsens cyanosis — avoid vasodilating anaesthetic agents/regional sympathectomy without vasopressor support, and treat any factor that raises PVR (hypoxia, hypercarbia, acidosis, hypothermia, pain, high airway pressure)</li>
                <li>Maintain SVR with vasopressors (phenylephrine/noradrenaline) to limit right-to-left shunt; maintain adequate preload and avoid excessive positive pressure ventilation</li>
                <li>Meticulous air-bubble precautions on <em>all</em> IV lines are mandatory in any right-to-left or bidirectional shunt — even small volumes of air can cross to the systemic circulation (paradoxical embolism) causing stroke or coronary embolism; use in-line air filters where available</li>
                <li>Reduced pulmonary blood flow slows uptake of inhalational agents (right-to-left shunt bypasses the lungs) but speeds the effect of IV induction agents (bypass of first-pass pulmonary uptake) — expect a faster-than-usual IV induction and a slower inhalational induction</li>
                <li>These patients should be managed at, or after direct discussion with, a specialist pulmonary hypertension/ACHD centre; avoid elective surgery wherever possible and plan level 2/3 postoperative care</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Postoperative Cardiac Care */}
        <section id="section-postoperative-care" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Cardiac Care</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Planning Level of Postoperative Care</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Level 1 (enhanced ward care): stable cardiac disease, low-risk surgery, RCRI 0–1, no active symptoms</li>
                <li>Level 2 (HDU — single organ support, e.g. invasive monitoring/vasopressors): RCRI ≥2, NYHA III, moderate-to-severe valve disease undergoing intermediate/high-risk surgery, need for arterial line/cardiac output monitoring or closely titrated vasoactive therapy</li>
                <li>Level 3 (ICU): NYHA IV, decompensated heart failure, severe symptomatic AS/pulmonary hypertension, Eisenmenger physiology, LVAD patients undergoing major surgery, or anticipated need for multi-organ/ventilatory support</li>
                <li>Level of care should be agreed at multidisciplinary preoperative review (anaesthetist, surgeon, cardiologist) and documented in the anaesthetic plan, with a named escalation pathway</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Perioperative Myocardial Infarction — Recognition and Management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Most perioperative MIs are silent (masked by analgesia/sedation) — active troponin surveillance (see Risk Stratification) is essential as clinical symptoms alone will miss the majority</li>
                <li>Distinguish <strong>Type 1 MI</strong> (plaque rupture/thrombosis — ACS pathway applies) from the more common <strong>Type 2 MI</strong> (supply–demand mismatch from tachycardia, hypotension, anaemia, hypoxia without plaque rupture) — management differs</li>
                <li>Immediate steps: 12-lead ECG, repeat troponin, correct precipitants (treat hypotension, tachyarrhythmia, anaemia — transfuse to maintain haemoglobin ≥70–80 g/L or higher with active ischaemia, hypoxia, sepsis)</li>
                <li>Urgent cardiology review for all confirmed perioperative MI/MINS; echocardiography to assess new wall motion abnormality and LV function</li>
                <li>Antithrombotic therapy (aspirin, P2Y12 inhibitor, anticoagulation) and consideration of urgent revascularisation (PCI) must be balanced against surgical bleeding risk in the immediate postoperative period — individualised, multidisciplinary decision</li>
                <li>Secondary prevention once bleeding risk allows: aspirin, statin, β-blocker, ACE-I as tolerated; address modifiable risk factors before discharge</li>
                <li>Escalate to level 2/3 care for haemodynamic instability, arrhythmia, or evolving ECG changes; involve critical care outreach early</li>
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

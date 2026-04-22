import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { preoperativeAssessmentQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import CPETNinePanelDiagram from "@/components/diagrams/CPETNinePanelDiagram";
import { SeeAlso } from "@/components/SeeAlso";
import { DiagramSection } from "@/components/DiagramSection";
import { CheckCircle2, AlertTriangle, XCircle, FlaskConical, Heart } from "lucide-react";

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
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Insulin</td><td>Reduce long-acting by 20–30%</td><td>Variable-rate insulin infusion (VRII) if fasting {'>'} 1 missed meal. Target glucose 6–10.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">GLP-1 RA</td><td>Weekly (semaglutide): hold 7 days. Daily (liraglutide): hold day of surgery</td><td>Delayed gastric emptying → aspiration risk. If not held, treat as full stomach (RSI). ASA 2023 guidance.</td></tr>
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

      <DiagramSection
        title="Preoperative Blood Pressure Management"
        intro={
          <p>
            The 2016 joint <strong>AAGBI / British Hypertension Society</strong> guideline reframed BP management around <em>risk stratification</em> rather than rigid thresholds. The principle: <strong>elective surgery should not be cancelled in primary care–referred patients with documented BP &lt; 180/110 mmHg</strong>. Cancelling a list slot rarely improves outcomes and delays definitive surgery.
          </p>
        }
      >
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div className="p-4 rounded-lg border-2 border-emerald-500/40 bg-emerald-500/5">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <p className="font-semibold text-foreground text-sm">PROCEED</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">Clinic BP &lt; 160/100</p>
            <p className="text-sm text-muted-foreground mt-2 leading-snug">
              No additional preoperative action required. Continue usual antihypertensives (omit ACE-I / ARB on day of surgery).
            </p>
          </div>
          <div className="p-4 rounded-lg border-2 border-amber-500/40 bg-amber-500/5">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mb-2" />
            <p className="font-semibold text-foreground text-sm">PROCEED WITH CAUTION</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">160–179 / 100–109</p>
            <p className="text-sm text-muted-foreground mt-2 leading-snug">
              Surgery should still proceed. Refer to GP <em>after</em> surgery for sustained management. Avoid acute lowering perioperatively (cerebral autoregulation reset).
            </p>
          </div>
          <div className="p-4 rounded-lg border-2 border-destructive/40 bg-destructive/5">
            <XCircle className="h-5 w-5 text-destructive mb-2" />
            <p className="font-semibold text-foreground text-sm">CONSIDER POSTPONING</p>
            <p className="text-xs font-mono text-muted-foreground mt-1">≥ 180 / ≥ 110 (clinic, repeated)</p>
            <p className="text-sm text-muted-foreground mt-2 leading-snug">
              Defer non-urgent surgery if no recent primary-care BP record. Rule out end-organ damage (LVH, AKI, retinopathy) and secondary causes. Initiate or up-titrate antihypertensive in primary care.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Heart className="h-4 w-4 text-perioperative" /> Practical principles
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm">Use the primary-care BP, not the clinic BP</p>
              <p className="text-sm text-muted-foreground mt-1">'White-coat' effect inflates pre-op clinic readings by 10–30 mmHg. AAGBI: if average primary-care BP within previous 12 months is &lt; 160/100, proceed even if pre-op clinic BP is higher.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm">Avoid acute pre-op pharmacological lowering</p>
              <p className="text-sm text-muted-foreground mt-1">Sublingual nifedipine, clonidine loads, or new beta-blocker doses cause unpredictable hypotension on induction. POISE-1 (Lancet 2008): perioperative metoprolol initiation reduced MI but increased stroke and 30-day mortality.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm">Continue established antihypertensives — with caveats</p>
              <p className="text-sm text-muted-foreground mt-1">β-blockers, CCBs, α-blockers, diuretics: continue. ACE-I / ARB: omit morning of surgery (NEJM/POISE-3 sub-study: continuation associated with intra-op hypotension and MINS). Restart within 48h post-op.</p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm">Intra-op MAP target follows patient baseline</p>
              <p className="text-sm text-muted-foreground mt-1">POISE-3 (NEJM 2023) and Sessler 2019: maintain MAP &gt; 80 mmHg in chronically hypertensive patients. SBP fall &gt; 20% from baseline, or any MAP &lt; 65 mmHg, increases risk of MINS, AKI, stroke.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg border-l-4 border-perioperative bg-perioperative/5">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Evidence:</span> Hartle et al, <em>Anaesthesia</em> 2016 — joint AAGBI/BHS guideline. Howell et al meta-analysis (2004, n &gt; 30,000): no clinically significant association between admission BP &lt; 180/110 and adverse perioperative cardiac events. POISE-3 (Marcucci, NEJM 2023): hypotension-avoidance strategy did not reduce vascular events but cancellation of routine ACE-I significantly reduced clinically important hypotension.
            </p>
          </div>
        </div>
      </DiagramSection>

      <DiagramSection
        title="Preoperative Investigations — NICE NG45 Evidence-Based Approach"
        intro={
          <p>
            Routine 'screening' bloods and ECGs in fit patients have <strong>no evidence of benefit</strong> and generate false-positive findings, anxiety, and surgical delays. <strong>NICE NG45 (2016)</strong> stratifies investigations by <strong>ASA grade × surgical severity</strong>. The grid below is the operative summary; further investigations are <em>indication-driven</em>, not routine.
          </p>
        }
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Surgical severity (NICE NG45)</p>
            <div className="grid sm:grid-cols-3 gap-2 text-xs">
              {[
                { grade: "Minor", egs: "Excision skin lesion, drainage of abscess" },
                { grade: "Intermediate", egs: "Inguinal hernia, varicose veins, knee arthroscopy, tonsillectomy" },
                { grade: "Major / Complex", egs: "Total abdominal hysterectomy, TURP, lumbar discectomy, thyroidectomy, joint replacement, colonic resection, radical neck dissection, thoracic, cardiac, vascular" },
              ].map((s) => (
                <div key={s.grade} className="p-2 rounded border border-border bg-card">
                  <p className="font-semibold text-foreground">{s.grade}</p>
                  <p className="text-muted-foreground mt-1 leading-snug">{s.egs}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-border bg-muted/30">
                  <th className="text-left p-2 text-foreground font-semibold">Investigation</th>
                  <th className="text-left p-2 text-foreground font-semibold">ASA 1</th>
                  <th className="text-left p-2 text-foreground font-semibold">ASA 2</th>
                  <th className="text-left p-2 text-foreground font-semibold">ASA 3 / 4</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { test: "FBC", a1: "Major only", a2: "Major only", a3: "Intermediate + Major" },
                  { test: "U&E / creatinine", a1: "Not routine", a2: "Major (+ AKI risk)", a3: "Intermediate + Major (always if on ACE-I/ARB/diuretic)" },
                  { test: "HbA1c", a1: "Only if known/suspected DM", a2: "Known DM — within 3 months", a3: "Known DM — within 3 months; defer if > 69 mmol/mol & elective" },
                  { test: "Coagulation", a1: "Not routine", a2: "Not routine", a3: "Only if anticoagulated, liver disease, or coagulopathy suspected" },
                  { test: "Group & Save / Crossmatch", a1: "Per local schedule (MSBOS)", a2: "Per MSBOS", a3: "Per MSBOS — bleeding risk surgery" },
                  { test: "ECG (12-lead)", a1: "Not routine", a2: "Major or any cardiovascular disease", a3: "Always for intermediate or major" },
                  { test: "Echocardiogram (TTE)", a1: "Not indicated", a2: "Only if new murmur, unexplained dyspnoea, signs of HF", a3: "Suspected new/worsening valvular disease, HF symptoms, or unexplained functional decline" },
                  { test: "Chest X-ray", a1: "Not routine", a2: "Not routine", a3: "Only if active cardiorespiratory symptoms / new findings" },
                  { test: "Lung function / ABG", a1: "Not indicated", a2: "Not routine", a3: "Severe COPD before thoracic / upper-abdominal surgery" },
                  { test: "Sickle cell test", a1: "If ancestry from at-risk region & status unknown", a2: "Same", a3: "Same" },
                  { test: "Pregnancy test", a1: "All women of childbearing potential — on day of surgery, with consent", a2: "Same", a3: "Same" },
                ].map((r) => (
                  <tr key={r.test} className="border-b border-border align-top">
                    <td className="p-2 font-medium text-foreground whitespace-nowrap">{r.test}</td>
                    <td className="p-2 leading-snug">{r.a1}</td>
                    <td className="p-2 leading-snug">{r.a2}</td>
                    <td className="p-2 leading-snug">{r.a3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Heart className="h-4 w-4 text-perioperative" /> When to request a TTE (echo)
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-4">
                <li><strong>New undiagnosed murmur</strong> with cardiac symptoms (dyspnoea, syncope, chest pain)</li>
                <li><strong>Suspected aortic stenosis</strong> — slow-rising pulse, ejection-systolic murmur radiating to carotids</li>
                <li><strong>Symptoms of heart failure</strong> (NYHA II+) without recent imaging</li>
                <li><strong>Reduced functional capacity</strong> (&lt; 4 METs) before intermediate / high-risk surgery and unable to perform CPET</li>
                <li><strong>Pulmonary hypertension</strong> suspected (loud P2, RV heave, peripheral oedema)</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2 italic">
                Avoid routine TTE in asymptomatic patients with stable, longstanding murmurs — does not change management. (ACC/AHA 2014, NICE NG45.)
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-perioperative" /> Functional-capacity–driven escalation
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-4">
                <li><strong>METREPAIR (Wijeysundera, Lancet 2018)</strong>: subjective METs assessment is poor at predicting cardiac events; <strong>DASI &lt; 34</strong> and <strong>NT-proBNP &gt; 300 ng/L</strong> outperform clinician judgement.</li>
                <li>Add <strong>NT-proBNP / BNP</strong> for ASA III+ undergoing intermediate/major surgery — incorporated in CCS 2017 cardiac risk pathway.</li>
                <li><strong>CPET</strong>: AT &lt; 11 mL/kg/min or VE/VCO₂ &gt; 34 → high risk; consider HDU/ICU and shared decision-making.</li>
                <li><strong>Stress imaging (CMR / DSE / MPI)</strong>: only if result will change management — i.e. revascularisation candidate before non-cardiac surgery.</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-lg border-l-4 border-perioperative bg-perioperative/5">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Key evidence base:</span> NICE NG45 (2016, updated 2020) — <em>Routine preoperative tests for elective surgery</em>; ESC/ESA 2022 non-cardiac surgery guideline; CCS 2017 cardiac risk assessment; METREPAIR (Lancet 2018); POISE-3 (NEJM 2023). Routine 'panel' bloods in fit patients have number-needed-to-test &gt; 1,000 to alter management — and a high false-positive rate that delays surgery.
            </p>
          </div>
        </div>
      </DiagramSection>

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

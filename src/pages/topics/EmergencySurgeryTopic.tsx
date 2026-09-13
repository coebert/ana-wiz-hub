import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { emergencySurgeryQuestions } from "@/data/quizzes";
import { NCEPODClassificationDiagram } from "@/components/diagrams/clinical/NCEPODClassificationDiagram";
import { EmergencyRSIDiagram } from "@/components/diagrams/clinical/EmergencyRSIDiagram";
import { EmergencyLaparotomyBundleDiagram } from "@/components/diagrams/clinical/EmergencyLaparotomyBundleDiagram";
import { EmergencySurgeryGlossaryDrawer } from "@/components/clinical/EmergencySurgeryGlossaryDrawer";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const emergencySurgeryFaqs: Array<[string, string]> = [
  [
    "What is NELA and how does it influence emergency laparotomy care?",
    "The National Emergency Laparotomy Audit (NELA) is a mandatory UK audit that records risk-adjusted mortality and process measures for every emergency laparotomy. It drives the NELA care bundle: documented P-POSSUM risk, consultant surgeon and anaesthetist for high-risk cases, theatre within target time, goal-directed fluid therapy, and post-op critical care for predicted mortality ≥5 %."
  ],
  [
    "How is a rapid sequence induction modified in the haemodynamically unstable patient?",
    "Reduce induction dose (e.g. ketamine 1–2 mg/kg or etomidate 0.2 mg/kg + reduced propofol), pre-load with vasopressor (metaraminol/noradrenaline bolus), have fluid and blood drawn up, use rocuronium 1.2 mg/kg for fast onset with sugammadex available, and maintain cricoid pressure unless it impedes view. Anticipate cardiovascular collapse on induction."
  ],
  [
    "What are the indications for damage-control laparotomy?",
    "The 'lethal triad' — pH <7.2, temperature <34 °C, INR >1.5 — or massive transfusion >10 units. Aim is haemorrhage and contamination control only, with abdomen left open (laparostomy), planned return to theatre 24–48 h after physiological correction in critical care. Avoid prolonged primary surgery in the unstable patient."
  ]
];

const objectives = [
  "Apply the NCEPOD classification to prioritise emergency surgery and resuscitation.",
  "Perform a safe RSI in the haemodynamically unstable, full-stomach emergency patient.",
  "Use risk stratification tools (P-POSSUM, NELA, SORT) to plan level of care and senior involvement.",
  "Resuscitate before/during induction in haemorrhagic shock and select appropriate induction agents.",
  "Apply NELA care-bundle standards to emergency laparotomy.",
];

const keyPoints = [
  { text: "All emergency patients are 'full stomach' — RSI is the default unless awake intubation indicated", cites: ["P-POSSUM"] },
  { text: "Emergency laparotomy mortality 10-15%; NELA standards mandate consultant presence for high-risk cases", cites: ["DAS 2015 RSI"] },
  { text: "Ruptured ectopic: do NOT delay surgery — haemorrhage control IS the resuscitation", cites: ["BJA Educ EmLap 2017"] },
  { text: "Ketamine is the induction agent of choice in haemodynamically unstable emergency patients", cites: ["RCoA Emergency Laparotomy"] },
  { text: "Resuscitate before/during induction: correct hypovolaemia, anticipate cardiovascular collapse", cites: ["NCEPOD Knowing the Risk"] },
  { text: "Risk stratification (P-POSSUM, NELA calculator) guides level of care and senior involvement", cites: ["NELA Year 9 Report"] },
];

const EmergencySurgeryTopicWorkedExamples: WorkedExample[] = [
  {
    title: "NELA-aligned care of perforated diverticulitis",
    scenario: "A 76-year-old with perforated diverticulitis and septic shock requires emergency laparotomy. Outline the NELA bundle from decision to operate to post-op disposition.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Surgeon-anaesthetist-radiologist huddle within 2 h of CT diagnosis; calculate P-POSSUM and NELA risk score</li>
          <li>Pre-op: blood cultures + antibiotics within 1 h, IV crystalloid 30 mL/kg if hypoperfused, lactate trend, prepare blood products, mark patient</li>
          <li>Consultant anaesthetist and surgeon present for risk ≥5%; theatre target within 6 h</li>
          <li>Intra-op: invasive monitoring, cardiac output monitoring for fluid responsiveness, lung-protective ventilation, normothermia, vasopressor as needed</li>
          <li>Postoperative: critical care admission for risk ≥10% or organ support; structured handover; daily multidisciplinary review</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Delaying surgery for 'optimisation' in septic shock — source control is the priority</li>
          <li>Restrictive fluid strategy in hypovolaemic patient before sepsis is controlled</li>
          <li>Failing to document NELA risk and consultant presence (audit requirement)</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Apply the NELA bundle: rapid source control, sepsis-6 within 1 h, consultant-delivered care, ITU disposition. Documented risk score and time-to-theatre.",
    cites: ["NELA Year 9 Report", "NCEPOD Knowing the Risk", "RCoA Emergency Laparotomy"],
  },
];

const EmergencySurgeryTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthesia for Emergency Surgery"
      subtitle="FRCA Final / FFICM — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="emergency-surgery"
      topicTitle="Anaesthesia for Emergency Surgery"
      workedExamples={EmergencySurgeryTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={emergencySurgeryQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["NCEPOD 2011", "NELA Year 9 2023", "RCoA GPAS Ch.5"],
        keyPoints: ["NELA Year 9 2023", "BJA Educ 2017", "DAS 2015", "P-POSSUM", "DAS 2015 RSI", "BJA Educ EmLap 2017", "RCoA Emergency Laparotomy", "NCEPOD Knowing the Risk", "NELA Year 9 Report"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
        <section className="space-y-6 mb-10">
          <div className="flex justify-end">
            <EmergencySurgeryGlossaryDrawer />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Emergency surgery accounts for a significant proportion of anaesthetic workload and carries substantially higher morbidity and mortality than elective procedures. The NCEPOD classification (immediate, urgent, expedited, elective) guides timing. Key challenges include incomplete assessment, full stomach, physiological derangement, and limited time for optimisation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">NCEPOD Classification</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Immediate (1)", value: "Life-saving, resuscitation simultaneous with surgery — e.g. ruptured AAA, ruptured ectopic" },
                { label: "Urgent (2)", value: "Within hours of decision — e.g. perforated viscus, compound fracture, intestinal obstruction" },
                { label: "Expedited (3)", value: "Early surgery but not immediately life-threatening — e.g. acute appendicitis, open fracture debridement" },
                { label: "Elective (4)", value: "Planned procedure at a time to suit both patient and hospital" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <NCEPODClassificationDiagram />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preoperative Considerations</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Aspiration risk</strong>: all emergency patients are assumed to have a full stomach — RSI or awake intubation</li>
              <li><strong>Resuscitation</strong>: correct hypovolaemia, electrolyte abnormalities, and acidosis before or during induction</li>
              <li><strong>Coagulation</strong>: check coagulation status; reverse anticoagulation if actively bleeding</li>
              <li><strong>Consent</strong>: may be limited; document capacity assessment; treat without consent if life-threatening and patient lacks capacity</li>
              <li><strong>Fasting status</strong>: often irrelevant as RSI is indicated regardless; do not delay life-saving surgery for fasting</li>
              <li><strong>Team briefing</strong>: WHO checklist adapted for emergency; clear communication of plan A/B/C</li>
            </ul>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Management of Anticoagulation</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Patients on anticoagulants presenting for emergency surgery require rapid assessment of drug, timing of last dose, renal function, and bleeding severity. <InlineRef topicId="emergency-surgery" refLabel="ACC Bleeding 2020" /> <InlineRef topicId="emergency-surgery" refLabel="Anaesthesia 2013 (Emergency organisation)" />
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                    <th className="text-left py-2 text-foreground font-semibold">Mechanism / handling</th>
                    <th className="text-left py-2 text-foreground font-semibold">Relevant test</th>
                    <th className="text-left py-2 text-foreground font-semibold">Reversal</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Warfarin</td><td>Vitamin K antagonist; half-life 20–60 h; hepatic metabolism</td><td>INR</td><td>4-factor PCC 25–50 units/kg (per INR and weight) + IV vitamin K 5–10 mg</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Apixaban</td><td>Direct factor Xa inhibitor; half-life ~12 h; ~25% renal</td><td>Anti-Xa activity (drug-calibrated)</td><td>Andexanet alfa where available, or PCC 50 units/kg</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Rivaroxaban</td><td>Direct factor Xa inhibitor; half-life 7–11 h; ~33% renal</td><td>Anti-Xa activity</td><td>Andexanet alfa where available, or PCC 50 units/kg</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Edoxaban</td><td>Direct factor Xa inhibitor; half-life ~10–14 h; ~35% renal</td><td>Anti-Xa activity</td><td>Andexanet alfa where available, or PCC 50 units/kg</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Dabigatran</td><td>Direct thrombin (IIa) inhibitor; half-life 12–17 h; ~80% renal — accumulates in AKI</td><td>Dilute thrombin time / anti-IIa activity (TT/APTT screen)</td><td>Idarucizumab 5 g IV (two 2.5 g doses); dialysable</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">LMWH</td><td>Indirect factor Xa (± IIa) inhibition via antithrombin; renally cleared, accumulates in AKI</td><td>Anti-Xa activity</td><td>Protamine partially effective for enoxaparin (~60% neutralisation)</td></tr>
                </tbody>
              </table>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mt-3">
              <li><strong>Antiplatelet-associated bleeding</strong>: platelet transfusion (1 adult dose) if life-threatening haemorrhage or intracranial surgery, regardless of platelet count.</li>
              <li><strong>Adjuncts</strong>: tranexamic acid (1 g IV, repeat/infusion as per protocol), fibrinogen replacement (cryoprecipitate or fibrinogen concentrate) if fibrinogen &lt;1.5 g/L, guided by viscoelastic testing (TEG/ROTEM) rather than fixed-ratio empirical products where available.</li>
              <li><strong>Neuraxial techniques</strong>: respect standard time-based cessation/reintroduction intervals for each agent before and after block/catheter removal — do not proceed with neuraxial anaesthesia solely on the basis of a normalised INR/anti-Xa if timing criteria are not met.</li>
            </ul>
          </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">RSI &amp; Cricoid Pressure — The Evidence</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Classical RSI (pre-oxygenation, predetermined dose of induction agent + suxamethonium 1.5 mg/kg, no bag-mask ventilation, cricoid pressure 10 N awake → 30 N asleep) was described by Sellick in 1961 from cadaveric and small case-series data. More than six decades later almost every component has been challenged by higher-quality evidence, and contemporary "modified" RSI is now standard UK/European practice.
            </p>

            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Aspiration — the risk being mitigated</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li>Aspiration incidence under GA is ~1:2,000–10,000 elective and ~1:600–800 emergency anaesthesia (NAP4, 2011); mortality from clinically significant aspiration is ~5%.</li>
              <li>NAP4 found <strong>aspiration was the single commonest cause of anaesthesia-related death</strong>, but in most cases either RSI was omitted when indicated or basics (pre-oxygenation, suction, head-up tilt) were poorly applied — not failure of cricoid pressure itself.</li>
            </ul>

            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Evidence for individual RSI components</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Component</th>
                    <th className="text-left py-2 text-foreground font-semibold">Evidence</th>
                    <th className="text-left py-2 text-foreground font-semibold">Current practice</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Pre-oxygenation</td><td>3 min tidal-volume or 8 vital-capacity breaths achieves ETO₂ &gt;90%; head-up 20–25° + HFNO/THRIVE prolongs apnoea time, especially in obese/obstetric patients (Patel &amp; Nouraei, <em>Anaesthesia</em> 2015).</td><td>Mandatory; aim ETO₂ ≥85–90%; routine apnoeic oxygenation in high-risk patients.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Suxamethonium 1.5 mg/kg</td><td>Faster onset and superior intubating conditions vs rocuronium 0.6 mg/kg, but rocuronium 1.0–1.2 mg/kg is non-inferior (Cochrane 2015 — Tran et al.) and reversible by sugammadex 16 mg/kg.</td><td>Either acceptable; rocuronium-sugammadex preferred when sux contraindicated (hyperkalaemia, burns &gt;24 h, denervation, MH risk).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">"No ventilation" rule</td><td>Gentle facemask ventilation at peak pressure &lt;15–20 cmH₂O does not distend the stomach and reduces desaturation, particularly in critically ill ICU patients (<strong>PreVent</strong>, Casey <em>NEJM</em> 2019).</td><td>Permitted in obese, ICU, paediatric and obstetric RSI (controlled gentle ventilation).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Opioid co-induction</td><td>Sole-agent induction worsens haemodynamics; alfentanil/fentanyl/remifentanil obtund the pressor response and improve intubating conditions without measurable aspiration risk.</td><td>Routine inclusion of a short-acting opioid (alfentanil 10–20 µg/kg or fentanyl 1–3 µg/kg).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Choice of induction agent</td><td>Etomidate causes adrenal suppression and increases mortality in septic shock (KETASED, Jabre <em>Lancet</em> 2009; <strong>EvK</strong>, Matchett <em>Intensive Care Med</em> 2022 — higher 7-day mortality vs ketamine in critically ill).</td><td>Ketamine 1–2 mg/kg first-line in shock; reduced-dose propofol/thiopentone if cardiovascularly stable.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Videolaryngoscopy</td><td><strong>DEVICE</strong> trial (Prekker <em>NEJM</em> 2023, n=1417 critically ill): VL improved first-pass success 85% vs 71% DL with no increase in adverse events.</td><td>VL recommended as first-choice device for emergency intubation (DAS 2018; UK ICS).</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">Cricoid pressure — the evidence</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Cricoid pressure (Sellick's manoeuvre) compresses the post-cricoid hypopharynx against the C6 vertebral body, theoretically occluding the upper oesophagus and preventing regurgitation of gastric contents. Despite &gt;60 years of practice, no RCT has ever shown a reduction in clinically apparent aspiration.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li><strong>IRIS trial</strong> (Birenbaum, <em>JAMA Surgery</em> 2019, n≈3,500) — multicentre RCT of cricoid vs sham during RSI. Aspiration 0.6% vs 0.5% (non-inferiority not formally met but no significant difference); cricoid prolonged intubation time and worsened laryngoscopic view in ~10%. The largest RCT to date — <strong>does not support routine use</strong>.</li>
              <li>MRI/imaging studies (Smith 2003; Zeidan 2014) show the oesophagus lies lateral to the cricoid in &gt;50% of adults, so compression often distorts rather than occludes it.</li>
              <li>Cricoid pressure can worsen the laryngoscopic view, displace the larynx, impede face-mask ventilation, and obstruct insertion of supraglottic airways — a particular concern in CICO.</li>
              <li>Force is poorly calibrated in practice — most assistants apply &lt;20 N or &gt;40 N unless specifically trained on a weighing scale.</li>
            </ul>

            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Current UK/European guidance</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li><strong>DAS 2015</strong> (unanticipated difficult intubation) &amp; <strong>DAS 2018</strong> (critically ill adult): cricoid pressure remains recommended for RSI but should be <strong>reduced or removed</strong> if it impairs laryngoscopy, mask ventilation, or SGA placement.</li>
              <li><strong>OAA/DAS obstetric guideline 2015</strong>: cricoid pressure retained given high aspiration risk and short pre-oxygenation reserve.</li>
              <li>Scandinavian SSAI 2010 and several French/German societies have <strong>downgraded or abandoned</strong> routine cricoid following IRIS.</li>
              <li>NAP4 explicitly stated cricoid pressure should not be considered a substitute for good RSI technique.</li>
            </ul>

            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Practical synthesis for the FRCA/FFICM viva</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Perform a <strong>modified RSI</strong>: ramped/head-up position, pre-oxygenation to ETO₂ &gt;85% ± apnoeic O₂, opioid co-induction, ketamine if shocked, rocuronium 1.2 mg/kg or sux 1.5 mg/kg, videolaryngoscope first-line.</li>
              <li>Apply cricoid 10 N awake → 30 N asleep, but be <strong>prepared to release</strong> immediately if view is poor, mask ventilation difficult, or an SGA is required as rescue.</li>
              <li>Use gentle (peak &lt;15 cmH₂O) facemask ventilation between induction and intubation in patients at high risk of desaturation (obese, septic, ICU, paediatric).</li>
              <li>Document the rationale for any deviation from classical RSI — defensible because it reflects current best evidence (NAP4, DAS, IRIS, DEVICE, EvK).</li>
            </ul>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <EmergencyRSIDiagram />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Total Intravenous Anaesthesia for Emergency Surgery</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              TIVA is well established electively but historically under-used for emergency RSI. Rationale includes reduced PONV, avoidance of volatile agents in malignant hyperthermia susceptibility, elimination of theatre volatile pollution during rapid turnover, and smoother haemodynamics with careful titration in the shocked patient. <InlineRef topicId="emergency-surgery" refLabel="Anaesthesia 2026 (TIVA emergency)" />
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">TIVA-based RSI technique</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li>Target-controlled infusion using the Marsh (blood-target) or Schnider (effect-site, age/lean-body-mass adjusted) propofol models; effect-site targeting reduces the delay to loss of consciousness relevant to RSI timing.</li>
              <li>Co-induction with a short-acting opioid (remifentanil TCI/effect-site) smooths the pressor response and reduces propofol dose requirement.</li>
              <li>Reduced target concentrations in shock — hypovolaemia and low cardiac output increase effect-site drug delivery for a given plasma target, risking cardiovascular collapse if targets are not reduced.</li>
              <li>Use a pre-checked dedicated IV line with anti-reflux and anti-siphon valves, and keep the cannula and connection visible throughout to detect extravasation or disconnection promptly.</li>
            </ul>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Safety considerations from national reports</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li>Risk of accidental awareness is higher with TIVA than volatile anaesthesia, particularly when combined with neuromuscular blockade masking clinical signs (NAP5).</li>
              <li>Pump programming errors, line disconnection, and drug/diluent dilution errors are recurring themes in incident reports.</li>
              <li>Processed EEG (e.g. BIS/entropy) monitoring is recommended whenever TIVA is combined with neuromuscular blockade.</li>
              <li>Local protocols, checklists and structured training reduce error rates and are advocated for departments extending TIVA to emergency practice.</li>
            </ul>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Patient selection</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Favourable</strong>: severe PONV history, malignant hyperthermia susceptibility, shared airway/airway surgery where volatile scavenging is difficult.</li>
              <li><strong>Challenging</strong>: profound haemorrhagic shock (unpredictable pharmacokinetics, awareness risk if targets under-delivered) and difficult venous access (risk of undetected extravasation/line failure).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Emergency Laparotomy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Emergency laparotomy carries 10–15% overall mortality (NELA data), rising to &gt;25% in high-risk patients. The National Emergency Laparotomy Audit (NELA) has driven quality improvement through standardised care bundles.
            </p>
            <div className="bg-secondary/20 border border-border rounded-lg p-4 space-y-2">
              <p className="font-semibold text-foreground text-sm">NELA Care Bundle Standards</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Risk assessment documented (P-POSSUM or NELA risk calculator)</li>
                <li>CT performed and reported within 90 minutes of request if required (NELA 2021 standard)</li>
                <li>Antibiotics within 1 h for known or suspected sepsis (local / national guidelines)</li>
                <li>Consultant surgeon and anaesthetist present for high-risk cases (predicted mortality &gt;5%)</li>
                <li>Arrival in theatre within timescale appropriate to urgency</li>
                <li>Goal-directed fluid therapy (cardiac output monitoring if high risk)</li>
                <li>Postoperative critical care admission for high-risk patients</li>
              </ul>
            </div>
            <div className="mt-3 space-y-2">
              <p className="text-sm text-muted-foreground"><strong>Anaesthetic management:</strong></p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>RSI — ketamine preferred if haemodynamically unstable; propofol with caution if stable</li>
                <li>Arterial line and large-bore IV access pre-induction; consider CVC</li>
                <li>Vasopressors drawn up and ready (metaraminol, phenylephrine, or noradrenaline infusion)</li>
                <li>Anticipate large fluid shifts and blood loss — have blood products available</li>
                <li>Epidural for postoperative analgesia (if coagulation normal and patient stable); alternatively rectus sheath block or TAP blocks</li>
                <li>Temperature management — active warming throughout</li>
              </ul>
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <EmergencyLaparotomyBundleDiagram />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Damage-Control Laparotomy — Anaesthetic Management</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Damage-control laparotomy is indicated when the "lethal triad" (acidosis, hypothermia, coagulopathy) or ongoing massive transfusion make definitive repair unsafe; surgery is truncated to haemorrhage and contamination control only, with planned relook after physiological correction. <InlineRef topicId="emergency-surgery" refLabel="Anaesthesia 2013 (Emergency conduct)" />
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Physiological goals</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li>Permissive hypotension (SBP 80–90 mmHg) until surgical haemorrhage control — avoid in traumatic brain injury, where adequate cerebral perfusion pressure takes priority.</li>
              <li>Minimise crystalloid; favour early 1:1:1 blood component (or whole-blood) resuscitation to limit dilutional coagulopathy.</li>
              <li>Tranexamic acid within 3 h of injury/onset of bleeding.</li>
              <li>Calcium replacement (ionised calcium falls rapidly with citrated blood products), active warming, and correction of acidosis.</li>
            </ul>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Haemostatic resuscitation</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Resuscitation is targeted at restoring haemostasis rather than simply volume, guided by viscoelastic testing (TEG/ROTEM) to direct component and fibrinogen replacement rather than fixed empirical ratios alone once results are available.
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Induction and maintenance</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li>Ketamine or markedly reduced-dose induction agents to avoid vasodilation and cardiovascular collapse.</li>
              <li>Consider TIVA with careful target reduction; high-dose opioid to blunt surgical stimulus while minimising further myocardial depression.</li>
              <li>Awareness risk is increased by deliberately reduced anaesthetic dosing in shock — document rationale and consider processed EEG monitoring.</li>
            </ul>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Monitoring</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li>Invasive arterial and central venous access; serial arterial blood gas, lactate and ionised calcium.</li>
              <li>Continuous temperature monitoring with active warming; thromboelastography to guide component therapy.</li>
              <li>Cell salvage and rapid infuser devices for high-volume blood loss.</li>
            </ul>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Transfer and relook</h3>
            <p className="text-muted-foreground leading-relaxed">
              Safe transfer to critical care for ongoing resuscitation and correction of the lethal triad (temperature, coagulopathy, acidosis) before a planned return to theatre for definitive repair at 24–48 h.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Emergency Appendicectomy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Appendicitis is the most common surgical emergency. Typically affects young, otherwise healthy patients, but elderly patients may present late with perforation and sepsis.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Timing</strong>: NCEPOD expedited (within 6–18 hours); urgent if peritonitis</li>
              <li><strong>Approach</strong>: usually laparoscopic — consider specific pneumoperitoneum effects (↑ IAP, ↓ venous return, ↑ PaCO₂)</li>
              <li><strong>Induction</strong>: RSI (full stomach); standard IV induction if stable</li>
              <li><strong>Analgesia</strong>: simple multimodal — paracetamol, NSAID (if no contraindication), local infiltration, ± opioid</li>
              <li><strong>Antibiotics</strong>: IV co-amoxiclav or cefuroxime + metronidazole at induction</li>
              <li><strong>PONV</strong>: high risk — ondansetron + dexamethasone; consider cyclizine</li>
              <li><strong>Day-case potential</strong>: uncomplicated laparoscopic appendicectomy in selected patients</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ruptured Ectopic Pregnancy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A life-threatening obstetric emergency. Patients may present with catastrophic haemoperitoneum and haemodynamic collapse. The priority is rapid surgical haemorrhage control.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Classification", value: "NCEPOD immediate — life-saving surgery" },
                { label: "Key concern", value: "Massive haemorrhage; may need ≥4 units PRBC rapidly" },
                { label: "Induction", value: "RSI — ketamine 1-2 mg/kg preferred (haemodynamic stability)" },
                { label: "Access", value: "Two large-bore (14-16G) IVCs; consider intraosseous if peripheral access difficult" },
                { label: "Blood products", value: "Group O Rh-negative immediately; crossmatch ASAP; activate MTP if needed" },
                { label: "Monitoring", value: "Arterial line ASAP (may be placed post-induction); urinary catheter" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground"><strong>Key principles:</strong></p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Do NOT delay surgery for investigations or optimisation — haemorrhage control is the resuscitation</li>
                <li>Prepare for cardiovascular collapse at induction (loss of sympathetic drive)</li>
                <li>Surgeon scrubbed and ready before induction — knife-to-skin within seconds</li>
                <li>Cell salvage may be available but should not delay surgery</li>
                <li>Anti-D immunoglobulin if Rh-negative</li>
                <li>Emotional support — this is a pregnancy loss; debrief team and patient</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intestinal Obstruction</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Patients with bowel obstruction present unique anaesthetic challenges including massive fluid shifts, electrolyte derangement, high aspiration risk, and abdominal compartment syndrome.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Fluid resuscitation</strong>: may need 3–6L crystalloid preoperatively; guided by urine output and lactate</li>
              <li><strong>NG decompression</strong>: reduces gastric volume but does NOT eliminate aspiration risk — still RSI</li>
              <li><strong>Electrolytes</strong>: correct hypokalaemia (from vomiting) and hyponatraemia before induction if possible</li>
              <li><strong>Third-space losses</strong>: ongoing intraoperative losses may be substantial</li>
              <li><strong>Strangulation</strong>: if suspected bowel ischaemia — urgent surgery; anticipate sepsis and metabolic acidosis</li>
              <li><strong>Postoperative</strong>: HDU/ICU admission; ongoing NG drainage; DVT prophylaxis; enhanced recovery principles where applicable</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Risk Scoring in Emergency Surgery</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "P-POSSUM", value: "Physiological and Operative Severity Score — predicts morbidity and mortality" },
                { label: "NELA Risk Calculator", value: "Uses age, ASA, urgency, malignancy, operative severity — validated for emergency laparotomy" },
                { label: "Surgical Apgar Score", value: "Intraoperative score: EBL, lowest MAP, lowest HR — predicts major complications" },
                { label: "SORT", value: "Surgical Outcome Risk Tool — preoperative 30-day mortality prediction" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Damage Control Resuscitation</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Damage control resuscitation (DCR) is the strategy of accepting an abbreviated operation and physiologically minimalist resuscitation in order to interrupt the
              self-reinforcing cycle of <strong className="text-foreground">hypothermia, acidosis and coagulopathy</strong> — the lethal triad — before it becomes irretrievable.
              It originated in military trauma but is now applied to any exsanguinating emergency laparotomy, ruptured aneurysm or obstetric catastrophe
              <InlineRef topicId="emergency-surgery" refLabel="Holcomb DCR 2007" />.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Permissive hypotension", value: "Accept a systolic pressure of about 80–90 mmHg (or a palpable radial pulse) until surgical control is achieved — this limits clot disruption and dilution. Does not apply to traumatic brain injury, where cerebral perfusion pressure takes priority." },
                { label: "Haemostatic resuscitation", value: "Blood and blood components as the primary resuscitation fluid in roughly 1:1 red cells to plasma with early platelets, or whole blood where available; crystalloid is restricted to a bridging role." },
                { label: "Early antifibrinolysis", value: "Tranexamic acid 1 g given as soon as possible and within 3 hours of injury; the benefit is concentrated in the loading dose." },
                { label: "Targeted correction", value: "Viscoelastic testing (ROTEM/TEG) to direct fibrinogen, plasma and platelets; ionised calcium above 1.0 mmol/L; active warming to keep core temperature above 36 °C; correct acidosis by restoring perfusion rather than with bicarbonate." },
                { label: "Damage control surgery", value: "Stop bleeding and contamination only — pack, shunt, staple, leave the abdomen open with a temporary closure — then transfer to ICU for rewarming and correction, with planned relook at 24–48 hours." },
                { label: "Physiological triggers to abbreviate", value: "pH below 7.2, base deficit worse than −8, temperature below 34 °C, INR above 1.5, or transfusion beyond about 10 units — recognise these before the patient arrests on the table." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mt-3 text-sm">
              The anaesthetic contribution is to run the resuscitation in parallel with surgery: two people at the head end, a rapid infuser and fluid warmer, arterial and
              central access sited without delaying haemostasis, a ketamine-based cardiostable induction, minimal anaesthetic depth with a vasopressor infusion running, and
              repeated blood gases with calcium and viscoelastic testing every 30 minutes. Anticipate abdominal compartment syndrome, ongoing coagulopathy and the need for
              prolonged ICU support after transfer.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fractured Neck of Femur</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A high-volume, high-mortality emergency of frail patients: 30-day mortality is around 6–7% and one-year mortality approaches 25–30%. Outcome is driven by
              prompt surgery, analgesia and medical optimisation rather than by anaesthetic technique <InlineRef topicId="emergency-surgery" refLabel="NICE NG111" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Timing:</strong> operate on the day of, or the day after, admission. Only correct reversible conditions that would independently require treatment — anaemia, hypovolaemia, uncontrolled diabetes, arrhythmia with haemodynamic compromise, sepsis, electrolyte derangement. Do not delay for an echocardiogram unless it will change management.</li>
              <li><strong>Analgesia:</strong> paracetamol regularly plus a fascia iliaca or femoral nerve block; minimise opioids and avoid NSAIDs in this population. Blocks reduce delirium and opioid requirement.</li>
              <li><strong>Anaesthetic technique:</strong> spinal or general anaesthesia produce equivalent mortality and delirium rates. If spinal is chosen, use a low intrathecal dose without intrathecal opioid and avoid sedation. Whichever technique is used, maintain blood pressure within 20% of baseline.</li>
              <li><strong>Specific hazards:</strong> bone cement implantation syndrome during cemented arthroplasty (hypoxia, hypotension, arrhythmia, arrest — warn the surgeon, increase FiO₂, ensure normovolaemia at cementing), hypothermia, and occult blood loss of a litre or more into the thigh.</li>
              <li><strong>Perioperative care:</strong> orthogeriatric review, delirium prevention bundle, early mobilisation, nutrition, bone protection and falls assessment. Document a treatment escalation plan preoperatively given the frailty of this cohort.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fasciotomy for Acute Compartment Syndrome</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Acute compartment syndrome is a surgical emergency in which pressure within a closed fascial compartment exceeds perfusion pressure, causing ischaemia and
              irreversible muscle and nerve necrosis within hours. Decompression is time-critical <InlineRef topicId="emergency-surgery" refLabel="BOA Fasciotomy 2020" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Diagnosis:</strong> clinical — pain out of proportion to injury, pain on passive stretch, a tense swollen compartment, and escalating analgesic requirement. Paraesthesia is late; pulselessness and pallor are very late and their presence does not exclude the diagnosis. Compartment pressure measurement helps in the obtunded or blocked patient (a differential pressure — diastolic minus compartment pressure — below 30 mmHg is the usual threshold).</li>
              <li><strong>Anaesthetic caution:</strong> regional blockade and patient-controlled analgesia can mask the cardinal warning sign of escalating pain. Where compartment syndrome is a real risk (tibial fracture, crush, revascularised limb, prolonged lithotomy), discuss the analgesic plan with the surgical team, document it, and hand over the need for hourly limb observations rather than simply withholding effective analgesia.</li>
              <li><strong>Preoperative:</strong> remove casts and dressings, keep the limb at heart level (not elevated), correct hypotension because perfusion pressure is what matters, and treat hypoxaemia. Do not delay for imaging.</li>
              <li><strong>Intraoperative:</strong> general anaesthesia is usual; expect significant blood loss from open compartments and a reperfusion insult on decompression — hyperkalaemia, metabolic acidosis, myoglobinaemia and a fall in blood pressure. Have calcium, insulin/dextrose and a vasopressor immediately available, ventilate to normocapnia and monitor the ECG closely.</li>
              <li><strong>Postoperative:</strong> aggressive crystalloid to maintain urine output and limit myoglobinuric AKI, monitor creatine kinase, potassium and renal function, provide multimodal analgesia for what are extremely painful wounds, and plan repeat theatre visits for debridement and delayed closure or grafting. Involve critical care early in crush injury or multi-compartment involvement.</li>
            </ul>
          </div>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "NCEPOD: 1 Immediate, 2 Urgent, 3 Expedited, 4 Elective — define and document time-to-theatre standards.",
              "NELA: emergency laparotomy bundle — consultant surgeon + anaesthetist, risk assessment, antibiotics <1 h, lactate, postoperative HDU.",
              "RSI for full stomach: pre-oxygenate, cricoid pressure (release if difficulty), short-acting induction + rapid-onset NMB.",
              "P-POSSUM/NELA risk score communicates risk to patient, family and team — informs level of postoperative care.",
              "Sepsis bundle (Sepsis Six) within 1 h: O₂, cultures, antibiotics, IV fluids, lactate, urine output.",
            ]}
          />
        </section>
      </ExamSection>
          <TopicFaqs faqs={emergencySurgeryFaqs} />
        </>
      }
    />
  );
};

export default EmergencySurgeryTopic;

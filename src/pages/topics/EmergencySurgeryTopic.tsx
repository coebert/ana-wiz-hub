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
import { EmergencyPrioritisationTeaching, EmergencyAirwayEvidenceTeaching, EmergencyAppendicitisTeaching, EmergencyObstructionTeaching, EmergencyHipFractureTeaching, EmergencyXaReversalTeaching, EmergencyDabigatranReversalTeaching, EmergencyEctopicTeaching, EmergencyReboaTeaching, EmergencyTivaTeaching, EmergencyCompartmentPressureTeaching } from "@/components/topic/EmergencySurgeryTeaching";

const emergencySurgeryFaqs: Array<[string, string]> = [
  [
    "What is NELA and how does it influence emergency laparotomy care?",
    "The National Emergency Laparotomy Audit (NELA) is a mandatory UK audit that records risk-adjusted mortality and process measures for every emergency laparotomy. It supports documented emergency-laparotomy risk assessment, consultant surgeon and anaesthetist for high-risk cases, theatre within target time, goal-directed fluid therapy, and post-op critical care for predicted mortality ≥5 %."
  ],
  [
    "How is a rapid sequence induction modified in the haemodynamically unstable patient?",
    "Choose and titrate a reduced induction dose appropriate to physiology; ketamine or etomidate may be considered, neither guarantees stability, pre-load with vasopressor (metaraminol/noradrenaline bolus), have fluid and blood drawn up, use rocuronium 1.2 mg/kg for fast onset with sugammadex available, and maintain cricoid pressure unless it impedes view. Anticipate cardiovascular collapse on induction."
  ],
  [
    "What are the indications for damage-control laparotomy?",
    "Ongoing bleeding, physiological exhaustion, coagulopathy, hypothermia or an injury pattern making definitive repair unsafe; no single laboratory threshold or transfusion count mandates it. Aim is haemorrhage and contamination control only, with abdomen left open (laparostomy), planned return to theatre 24–48 h after physiological correction in critical care. Avoid prolonged primary surgery in the unstable patient."
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
  { text: "Assess aspiration and difficult-airway risk; bowel obstruction, active vomiting and physiological compromise require an explicit airway strategy", cites: ["DAS 2015 RSI"] },
  { text: "Emergency laparotomy carries substantial risk; use current NELA risk assessment rather than a population average for individual decisions; NELA standards mandate consultant surgeon and anaesthetist presence for high-risk cases", cites: ["NELA Year 9 Report"] },
  { text: "Ruptured ectopic: do NOT delay surgery — haemorrhage control IS the resuscitation", cites: ["BJA Educ EmLap 2017"] },
  { text: "Ketamine is an induction option in shock, not a guarantee of haemodynamic stability; dose and support depend on physiology", cites: ["KETASED 2009"] },
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
          <li>Prompt surgeon-anaesthetist-radiologist discussion; document emergency-laparotomy risk and agree the urgency</li>
          <li>Pre-op: blood cultures + antibiotics within 1 h, individual crystalloid resuscitation with reassessment if hypoperfused, lactate trend, prepare blood products, mark patient</li>
          <li>Consultant anaesthetist and surgeon present for risk ≥5%; theatre timing appropriate to physiological deterioration and source-control urgency</li>
          <li>Intra-op: invasive monitoring, cardiac output monitoring for fluid responsiveness, lung-protective ventilation, normothermia, vasopressor as needed</li>
          <li>Postoperative: critical care admission for predicted mortality ≥5% or organ support; structured handover; daily multidisciplinary review</li>
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
        objectives: ["NCEPOD classification", "NELA Year 9 Report", "RCoA Emergency Laparotomy"],
        keyPoints: ["DAS 2015 RSI", "KETASED 2009", "BJA Educ EmLap 2017", "RCoA Emergency Laparotomy", "NCEPOD Knowing the Risk", "NELA Year 9 Report"],
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
            <EmergencyPrioritisationTeaching />
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Immediate (1)", value: "Life-saving, resuscitation simultaneous with surgery — e.g. ruptured AAA, ruptured ectopic" },
                { label: "Urgent (2)", value: "Within hours of decision — e.g. perforated viscus, compound fracture, intestinal obstruction" },
                { label: "Expedited (3)", value: "Normally within days; early treatment needed without immediate threat to life, limb or organ survival" },
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
              <li><strong>Aspiration risk</strong>: assess vomiting, obstruction, gastric emptying, fasting and airway difficulty; plan RSI or awake intubation when indicated</li>
              <li><strong>Resuscitation</strong>: correct hypovolaemia, electrolyte abnormalities, and acidosis before or during induction</li>
              <li><strong>Coagulation</strong>: check coagulation status; reverse anticoagulation if actively bleeding</li>
              <li><strong>Consent</strong>: may be limited; document capacity assessment; treat without consent if life-threatening and patient lacks capacity</li>
              <li><strong>Fasting status</strong>: record and interpret alongside the clinical condition; do not delay life-saving surgery solely to complete fasting</li>
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
            <div className="mt-4"><EmergencyXaReversalTeaching /></div>
            <div className="mt-4"><EmergencyDabigatranReversalTeaching /></div>
          </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">RSI &amp; Cricoid Pressure — The Evidence</h2>
            <EmergencyAirwayEvidenceTeaching />
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
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Pre-oxygenation</td><td>3 min tidal-volume or 8 vital-capacity breaths achieves ETO₂ &gt;90%; head-up 20–25° + HFNO/THRIVE prolongs apnoea time, especially in obese/obstetric patients (Patel &amp; Nouraei, <em>Anaesthesia</em> 2015). In RSI its key proven benefit is <strong>fewer desaturations</strong>: in a randomised trial, 0% of THRIVE patients vs 12.5% with facemask fell below 93%, with no difference in intubation or apnoea time <InlineRef topicId="emergency-surgery" refLabel="Lodenius 2018 (THRIVE RSI)" />.</td><td>Mandatory; aim ETO₂ ≥85–90%; routine apnoeic oxygenation in high-risk patients.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Suxamethonium 1.5 mg/kg</td><td>Faster onset and superior intubating conditions vs rocuronium 0.6 mg/kg, but rocuronium 1.0–1.2 mg/kg is non-inferior (Cochrane 2015 — Tran et al.) and reversible by sugammadex 16 mg/kg.</td><td>Either acceptable; rocuronium-sugammadex preferred when sux contraindicated (hyperkalaemia, burns &gt;24 h, denervation, MH risk).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">"No ventilation" rule</td><td>Bag-mask ventilation reduced severe hypoxaemia in critically ill adults; low aspiration event counts do not prove safety in every full-stomach patient, particularly in critically ill ICU patients (<strong>PreVent</strong>, Casey <em>NEJM</em> 2019).</td><td>Permitted in obese, ICU, paediatric and obstetric RSI (controlled gentle ventilation).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Opioid co-induction</td><td>Sole-agent induction worsens haemodynamics; alfentanil/fentanyl/remifentanil obtund the pressor response and improve intubating conditions without measurable aspiration risk.</td><td>Routine inclusion of a short-acting opioid (alfentanil 10–20 µg/kg or fentanyl 1–3 µg/kg).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Choice of induction agent</td><td>Etomidate suppresses adrenal steroid synthesis, but KETASED did not establish a mortality advantage for ketamine. Select the agent and dose for the patient rather than inferring guaranteed stability from drug choice. <InlineRef topicId="emergency-surgery" refLabel="KETASED 2009" /></td><td>Individual reduced-dose induction with haemodynamic support prepared; ketamine is one option, not universally first-line.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Videolaryngoscopy</td><td><strong>DEVICE</strong> trial (Prekker <em>NEJM</em> 2023, n=1417 critically ill): VL improved first-pass success 85% vs 71% DL with no increase in adverse events.</td><td>VL recommended as first-choice device for emergency intubation (DAS 2018; UK ICS).</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">Cricoid pressure — the evidence</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Cricoid pressure (Sellick's manoeuvre) compresses the post-cricoid hypopharynx against the C6 vertebral body, theoretically occluding the upper oesophagus and preventing regurgitation of gastric contents. Despite &gt;60 years of practice, no RCT has ever shown a reduction in clinically apparent aspiration.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li><strong>IRIS trial</strong> (Birenbaum, <em>JAMA Surgery</em> 2019, n≈3,500) — multicentre RCT of cricoid vs sham during RSI. Aspiration 0.6% vs 0.5% (non-inferiority not formally met but no significant difference); cricoid prolonged intubation time and worsened laryngoscopic view in ~10%. An inconclusive non-inferiority result; <strong>not proof that sham and cricoid are equivalent</strong>.</li>
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
              <li>Perform a <strong>modified RSI</strong>: ramped/head-up position, pre-oxygenation to ETO₂ &gt;85% ± apnoeic O₂, individual co-induction and reduced doses if shocked, rocuronium 1.2 mg/kg or sux 1.5 mg/kg, videolaryngoscope first-line.</li>
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
              TIVA is well established electively, but its use in emergencies — especially rapid sequence induction — remains limited. <InlineRef topicId="emergency-surgery" refLabel="Anaesthesia 2026 (TIVA emergency)" /> The national guideline expects every anaesthetist to deliver it competently and safely, because volatile anaesthesia is sometimes not possible or is contraindicated. <InlineRef topicId="emergency-surgery" refLabel="AoA/SIVA TIVA 2019" />
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">TIVA-based RSI technique</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li>Propofol is usually given by target-controlled infusion; effect-site targeting is the mode generally used to time loss of consciousness for induction. Know which model your pump uses before an emergency.</li>
              <li>Pharmacological reasoning: in shock, a smaller central volume and lower cardiac output mean a given target produces a larger effect, so start with reduced targets and titrate.</li>
              <li>Give the infusion through a dedicated, pre-checked line with an anti-reflux valve, and keep the cannula and connections visible so disconnection or extravasation is noticed. <InlineRef topicId="emergency-surgery" refLabel="AoA/SIVA TIVA 2019" /></li>
            </ul>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Safety considerations from national reports</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li>NAP5 identified TIVA, particularly combined with neuromuscular blockade, as a risk factor for accidental awareness; failures were often drug-delivery problems. <InlineRef topicId="emergency-surgery" refLabel="NAP5 2014" /></li>
              <li>The joint guideline recommends processed EEG monitoring when TIVA is used with neuromuscular blockade. <InlineRef topicId="emergency-surgery" refLabel="AoA/SIVA TIVA 2019" /></li>
              <li>Departments extending TIVA to emergency lists should provide local protocols and training, as the guideline sets standards for all anaesthetists rather than TIVA enthusiasts only. <InlineRef topicId="emergency-surgery" refLabel="AoA/SIVA TIVA 2019" /></li>
            </ul>
            <div className="my-4"><EmergencyTivaTeaching /></div>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Patient selection</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Favourable</strong>: severe PONV history, malignant hyperthermia susceptibility, shared airway/airway surgery where volatile scavenging is difficult.</li>
              <li><strong>Challenging</strong>: profound haemorrhagic shock (unpredictable pharmacokinetics, awareness risk if targets under-delivered) and difficult venous access (risk of undetected extravasation/line failure).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Emergency Laparotomy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Emergency laparotomy carries substantial 30-day mortality, particularly in older, frail and high predicted-risk patients <InlineRef topicId="emergency-surgery" refLabel="NELA Year 9 Report" />. The National Emergency Laparotomy Audit (NELA) has driven quality improvement through standardised care bundles.
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
              <p className="text-sm text-muted-foreground mt-3"><strong>In more detail</strong> <InlineRef topicId="emergency-surgery" refLabel="Anaesthesia 2013 (Emergency conduct)" />:</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li><strong>Monitoring</strong>: use cardiac output monitoring (e.g. oesophageal Doppler or pulse-contour devices) in high-risk patients, as recommended in NELA standards, to guide goal-directed fluid and vasopressor therapy.</li>
                <li><strong>Haemodynamic goals</strong>: MAP ≥ 65 mmHg (higher in chronic hypertension), falling lactate, urine output ≥ 0.5 mL/kg/h, and a stroke volume that no longer rises with fluid.</li>
                <li><strong>Fluids</strong>: balanced crystalloid is first choice; give boluses (e.g. 200–250 mL) only while the patient is fluid-responsive. Both under-resuscitation (organ hypoperfusion) and overload (gut oedema, anastomotic and lung complications) cause harm.</li>
                <li><strong>Vasopressors and inotropes</strong>: noradrenaline first-line for septic or vasodilatory shock; add an inotrope such as dobutamine if monitoring shows low cardiac output despite adequate filling.</li>
                <li><strong>Ventilation</strong>: lung-protective settings — tidal volume 6–8 mL/kg predicted body weight, PEEP, and plateau pressure &lt; 30 cmH₂O.</li>
                <li><strong>Analgesia</strong>: epidurals give excellent analgesia but are often unsuitable in sepsis, coagulopathy or haemodynamic instability; fascial plane blocks (TAP, rectus sheath, quadratus lumborum) or wound catheters are safer alternatives and can be placed at the end of surgery.</li>
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
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Postoperative management and complications</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Most deaths after emergency surgery happen after theatre, so planning critical care and spotting complications early are part of the anaesthetic job <InlineRef topicId="emergency-surgery" refLabel="Anaesthesia 2013 (Emergency organisation)" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li><strong>Immediate care</strong>: structured handover to recovery or ICU (e.g. SBAR), continued invasive monitoring, and a clear plan for ventilation, vasopressors, fluids, analgesia and when to escalate. NELA standards advise critical care for patients with a predicted mortality ≥ 5%.</li>
              <li><strong>Cardiovascular</strong>: persistent shock — distributive (ongoing sepsis), hypovolaemic (bleeding) or cardiogenic; new atrial fibrillation; myocardial injury (consider troponin surveillance in high-risk patients).</li>
              <li><strong>Respiratory</strong>: atelectasis, pneumonia (including ventilator-associated), ARDS and difficult weaning; minimise with lung-protective ventilation, analgesia, early mobilisation and physiotherapy.</li>
              <li><strong>Renal</strong>: acute kidney injury from hypoperfusion, sepsis, nephrotoxins and intra-abdominal hypertension — optimise perfusion, stop nephrotoxic drugs, monitor urine output and creatinine.</li>
              <li><strong>Gastrointestinal</strong>: ileus, anastomotic leak (new sepsis around days 3–7), and intra-abdominal hypertension or abdominal compartment syndrome (measure bladder pressure).</li>
              <li><strong>Haematological</strong>: ongoing coagulopathy after massive transfusion; start venous thromboembolism prophylaxis once bleeding risk allows, using mechanical methods until then.</li>
            </ul>
            <h3 className="text-lg font-serif font-bold text-foreground mt-4 mb-2">Transfer and relook</h3>
            <p className="text-muted-foreground leading-relaxed">
              Safe transfer to critical care for ongoing resuscitation and correction of the lethal triad (temperature, coagulopathy, acidosis) before a planned return to theatre for definitive repair at 24–48 h.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Emergency Appendicectomy</h2>
            <EmergencyAppendicitisTeaching />
            <p className="text-muted-foreground leading-relaxed mb-3">
              Appendicitis is the most common surgical emergency. Typically affects young, otherwise healthy patients, but elderly patients may present late with perforation and sepsis.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Timing</strong>: WSES 2020: do not delay surgery beyond 24 h after admission in uncomplicated appendicitis needing surgery; deterioration/peritonitis increases urgency</li>
              <li><strong>Approach</strong>: usually laparoscopic — consider specific pneumoperitoneum effects (↑ IAP, ↓ venous return, ↑ PaCO₂)</li>
              <li><strong>Induction</strong>: RSI (full stomach); standard IV induction if stable</li>
              <li><strong>Analgesia</strong>: simple multimodal — paracetamol, NSAID (if no contraindication), local infiltration, ± opioid</li>
              <li><strong>Antibiotics</strong>: single preoperative broad-spectrum dose under local policy; no routine postoperative antibiotics for uncomplicated appendicitis</li>
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
                { label: "Induction", value: "RSI with a reduced, cardiovascularly stable induction dose; agent choice matters less than dose and preparation for collapse" },
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
                <li>Anti-D: follow NICE NG126 (2026) by gestation — not offered up to 11+6 weeks; offered to RhD-negative patients at 12+0 to 12+6 weeks having surgery (see lesson below)</li>
                <li>Emotional support — this is a pregnancy loss; debrief team and patient</li>
              </ul>
            </div>
            <div className="mt-4"><EmergencyEctopicTeaching /></div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intestinal Obstruction</h2>
            <EmergencyObstructionTeaching />
            <p className="text-muted-foreground leading-relaxed mb-3">
              Patients with bowel obstruction present unique anaesthetic challenges including massive fluid shifts, electrolyte derangement, high aspiration risk, and abdominal compartment syndrome.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Fluid resuscitation</strong>: individual fluid/electrolyte replacement guided by perfusion, renal function, losses and response, not a fixed litre target</li>
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
            <div className="my-4"><EmergencyReboaTeaching /></div>
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
            <EmergencyHipFractureTeaching />
            <p className="text-muted-foreground leading-relaxed mb-3">
              A high-volume, high-mortality emergency of frail patients: 30-day mortality is around 6–7% and one-year mortality approaches 25–30%. Outcome is driven by
              prompt surgery, analgesia and medical optimisation rather than by anaesthetic technique <InlineRef topicId="emergency-surgery" refLabel="NICE CG124" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Timing:</strong> operate on the day of, or the day after, admission. Only correct reversible conditions that would independently require treatment — anaemia, hypovolaemia, uncontrolled diabetes, arrhythmia with haemodynamic compromise, sepsis, electrolyte derangement. Do not delay for an echocardiogram unless it will change management.</li>
              <li><strong>Analgesia:</strong> paracetamol regularly plus a fascia iliaca or femoral nerve block; minimise opioids and avoid NSAIDs in this population. Blocks reduce delirium and opioid requirement.</li>
              <li><strong>Anaesthetic technique:</strong> offer spinal or general anaesthesia after discussing risks and benefits; individualise anaesthetic dosing, sedation and haemodynamic management.</li>
              <li><strong>Specific hazards:</strong> bone cement implantation syndrome during cemented arthroplasty (hypoxia, hypotension, arrhythmia, arrest — warn the surgeon, increase FiO₂, ensure normovolaemia at cementing), hypothermia, and occult blood loss of a litre or more into the thigh.</li>
              <li><strong>Perioperative care:</strong> orthogeriatric review, delirium prevention bundle, early mobilisation, nutrition, bone protection and falls assessment. Document a treatment escalation plan preoperatively given the frailty of this cohort.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fasciotomy for Acute Compartment Syndrome</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Acute compartment syndrome causes local tissue ischaemia from raised pressure within a myo-fascial compartment. Early diagnosis and treatment are vital, and immediate surgical decompression should follow diagnosis (NCEPOD category 1). <InlineRef topicId="emergency-surgery" refLabel="BOAST Compartment Syndrome 2025" />
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Diagnosis:</strong> the key clinical findings are pain out of proportion to the injury and pain on passive movement of the compartment's muscles. At-risk patients should be assessed hourly, with the dose and rate of analgesics, especially opioids, recorded. <InlineRef topicId="emergency-surgery" refLabel="BOAST Compartment Syndrome 2025" /></li>
              <li><strong>Pressure measurement:</strong> where signs are inconclusive or assessment is incomplete (for example impaired consciousness or a regional block), consider measuring pressure in every suspected compartment with a simultaneous blood pressure. A diastolic-minus-compartment difference below 30 mmHg indicates increased risk, and a consultant orthopaedic surgeon decides on decompression; urgent decompression should be considered when absolute pressure exceeds 40 mmHg. <InlineRef topicId="emergency-surgery" refLabel="BOAST Compartment Syndrome 2025" /></li>
              <li><strong>Regional anaesthesia:</strong> in limb trauma it should follow joint decision-making between patient, anaesthetist and surgeon with documented consent, and an agreed policy on who monitors for compartment syndrome afterwards — invasive monitoring or review by staff trained in both regional anaesthesia and compartment assessment. <InlineRef topicId="emergency-surgery" refLabel="BOAST Compartment Syndrome 2025" /></li>
              <li><strong>Before theatre:</strong> with symptoms or signs, release circumferential dressings to expose the skin, elevate the limb and re-evaluate within 30 minutes. <InlineRef topicId="emergency-surgery" refLabel="BOAST Compartment Syndrome 2025" /></li>
              <li><strong>Surgery:</strong> open decompression of all involved compartments with debridement of dead muscle; two-incision, four-compartment decompression for the lower leg. Discuss with plastic surgery within 24 hours and re-explore within 72 hours. Late presentations need a two-consultant decision, and non-operative management with renal protection is an option. <InlineRef topicId="emergency-surgery" refLabel="BOAST Compartment Syndrome 2025" /></li>
              <li><strong>Anaesthetic reasoning:</strong> decompressing ischaemic muscle can release potassium, acid and myoglobin, so anticipate hypotension, hyperkalaemia and kidney injury, check potassium, creatine kinase and renal function, and plan analgesia for very painful wounds and repeat theatre visits.</li>
            </ul>
            <div className="my-4"><EmergencyCompartmentPressureTeaching /></div>
          </div>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "NCEPOD: 1 Immediate, 2 Urgent, 3 Expedited, 4 Elective — define and document time-to-theatre standards.",
              "NELA: emergency laparotomy bundle — consultant surgeon + anaesthetist, risk assessment, antibiotics <1 h, lactate, postoperative HDU.",
              "RSI for full stomach: pre-oxygenate, cricoid pressure (release if difficulty), short-acting induction + rapid-onset NMB.",
              "P-POSSUM/NELA risk score communicates risk to patient, family and team — informs level of postoperative care.",
              "Septic shock: immediate resuscitation and prompt antibiotics, with source control as soon as medically and logistically practical.",
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

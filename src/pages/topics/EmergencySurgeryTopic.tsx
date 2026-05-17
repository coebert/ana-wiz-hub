import { TopicTemplate } from "@/components/TopicTemplate";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { emergencySurgeryQuestions } from "@/data/quizzes";
import { NCEPODClassificationDiagram } from "@/components/diagrams/NCEPODClassificationDiagram";
import { EmergencyRSIDiagram } from "@/components/diagrams/EmergencyRSIDiagram";
import { EmergencyLaparotomyBundleDiagram } from "@/components/diagrams/EmergencyLaparotomyBundleDiagram";
import { EmergencySurgeryGlossaryDrawer } from "@/components/EmergencySurgeryGlossaryDrawer";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
      diagrams={
        <div className="space-y-6">
          <NCEPODClassificationDiagram />
          <EmergencyRSIDiagram />
          <EmergencyLaparotomyBundleDiagram />
        </div>
      }
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        diagrams: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["NCEPOD 2011", "NELA Year 9 2023", "RCoA GPAS Ch.5"],
        diagrams: ["DAS 2015", "NELA Year 9 2023", "BJA Educ 2017"],
        keyPoints: ["NELA Year 9 2023", "BJA Educ 2017", "DAS 2015"],
      }}
      coreConcepts={
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
                <li>CT within 2 hours of decision if required</li>
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
      }
    />
  );
};

export default EmergencySurgeryTopic;

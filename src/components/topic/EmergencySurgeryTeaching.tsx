import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const R = ({ label }: { label: string }) => <InlineRef topicId="emergency-surgery" refLabel={label} />;

export function EmergencyPrioritisationTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
    <h3 className="text-lg font-semibold text-foreground">Urgency is a clinical decision, not just a diagnosis</h3>
    <p>NCEPOD immediate intervention is life-, limb- or organ-saving, normally within minutes, with simultaneous resuscitation. Urgent intervention is normally within hours for acute or deteriorating potentially life-threatening conditions. Expedited intervention is normally within days when early treatment is needed but there is no immediate threat; elective intervention is planned. The same disease can move between categories as perfusion, bleeding, infection or organ compromise changes. Record the decision time, category and agreed theatre priority rather than assigning a rigid category solely from a procedure name.<R label="NCEPOD classification" /></p>
    <p>In septic shock from perforation or ischaemic bowel, antibiotics and circulatory support cannot replace source control. SSC recommends intervention as soon as medically and logistically practical after identifying an amenable source. Its discussion of benefit within 6–12 hours is based on limited studies, not a licence to wait until that deadline. Establish the least invasive effective intervention with the surgeon and radiologist, and resuscitate in parallel rather than repeatedly postponing treatment for normal laboratory values.<R label="SSC source control 2021" /></p>
    <p><strong className="text-foreground">The pre-induction briefing should expose the competing risks.</strong> Discuss aspiration, difficult airway, shock, blood availability, antibiotic administration, anticipated operation and the postoperative destination. Decompression and resuscitation can reduce risk without eliminating it. A patient who cannot survive a long optimisation period needs a coordinated operation/resuscitation plan; a stable patient may benefit from correcting a reversible problem before anaesthesia. Document what has been addressed, what remains and why proceeding is justified.<R label="NCEPOD Knowing the Risk" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: must lactate normalise before source control in septic shock?</summary><p className="mt-2">No. Ongoing infection may prevent normalisation. Resuscitate and arrange effective source control together, with senior surgical, anaesthetic and critical-care agreement. A suggested observational time window is not a reason to delay an immediately necessary intervention.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["NCEPOD classification", "SSC source control 2021", "NCEPOD Knowing the Risk"]} />
  </div>;
}

export function EmergencyAirwayEvidenceTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
    <h3 className="text-lg font-semibold text-foreground">Emergency intubation: distinguish oxygenation, first-pass success and survival</h3>
    <p>Induction removes sympathetic compensation and spontaneous breathing; positive-pressure ventilation can reduce venous return. Plan induction dose, haemodynamic support, oxygenation and rescue together. Ketamine is an option, not a guarantee of cardiovascular stability in catecholamine-depleted shock. KETASED compared ketamine with etomidate: its primary maximum SOFA outcome did not differ significantly, and it did not establish a mortality advantage. Etomidate's adrenal suppression should not be converted into a claim that this trial proved increased septic-shock mortality.<R label="KETASED 2009" /></p>
    <p><strong className="text-foreground">PreVent addressed hypoxaemia during ICU intubation.</strong> Among 401 critically ill adults, severe hypoxaemia occurred in 10.9% with bag-mask ventilation between induction and laryngoscopy versus 22.8% without it. This supports a considered oxygenation strategy in patients with poor reserve. Low aspiration event counts do not prove that ventilation is risk-free in bowel obstruction or active vomiting; assess aspiration risk, technique, airway pressure and the ability to ventilate.<R label="PreVent 2019" /></p>
    <p><strong className="text-foreground">DEVICE addressed the first intubation attempt.</strong> In 1,417 critically ill adults, first-attempt success was 85.1% with video versus 70.8% with direct laryngoscopy. Severe complications were similar, 21.4% versus 20.9%. A better view and first-pass success do not remove the need for circulatory preparation or prove a survival benefit. Use a device the operator understands, with a suitable stylet/bougie, suction and a rehearsed failed-airway plan.<R label="DEVICE 2023" /></p>
    <p><strong className="text-foreground">IRIS did not settle cricoid-pressure efficacy.</strong> Aspiration occurred in 0.6% with cricoid and 0.5% with sham, but the trial failed to demonstrate non-inferiority of sham. Similar percentages are not proof of equivalence and do not establish that cricoid is either effective or unnecessary. Follow the applicable airway guidance; release pressure promptly if it impairs laryngoscopy, ventilation or supraglottic rescue. Cricoid pressure is not a replacement for suction, preoxygenation and a plan to maintain oxygenation.<R label="IRIS 2019" /><R label="DAS 2015 RSI" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did DEVICE show that video laryngoscopy prevents severe peri-intubation complications?</summary><p className="mt-2">No. It improved first-attempt success, while severe complication rates were similar. Prepare for cardiovascular collapse and hypoxaemia even when videolaryngoscopy is chosen.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["KETASED 2009", "PreVent 2019", "DEVICE 2023", "IRIS 2019", "DAS 2015 RSI"]} />
  </div>;
}

export function EmergencyAppendicitisTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
    <h3 className="text-lg font-semibold text-foreground">Appendicitis: separate uncomplicated disease from source-control failure</h3>
    <p>WSES 2020 recommends against delaying appendicectomy beyond 24 hours after admission when acute appendicitis requires surgery. A short in-hospital delay in stable uncomplicated disease can be reasonable; this is not a requirement for immediate overnight surgery in every patient. Peritonitis, sepsis or deterioration changes the urgency. Abscess or phlegmon may require a different surgical/interventional strategy: do not extrapolate the uncomplicated timing rule to uncontrolled infection.<R label="WSES appendicitis 2020" /></p>
    <p>Before anaesthesia, reassess hydration, vomiting, pain, pregnancy possibility and evidence of perforation. Aspiration strategy depends on the clinical risk rather than fasting time alone. During laparoscopy, consider the haemodynamic and ventilatory effects of pneumoperitoneum in a depleted patient. Agree analgesia and antiemetic treatment while accounting for renal function, infection and the planned postoperative pathway.<R label="Anaesthesia 2013 (Emergency conduct)" /></p>
    <p>WSES recommends a single preoperative broad-spectrum antibiotic dose, within 0–60 minutes before incision, and no postoperative antibiotics for uncomplicated appendicitis. Complicated disease, especially incomplete source control, needs a treatment course tailored to findings and the local antimicrobial pathway. Record whether disease was complicated and whether source control was adequate; do not automatically continue antibiotics merely because surgery was an emergency.<R label="WSES appendicitis 2020" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does an uncomplicated appendicectomy require postoperative antibiotics?</summary><p className="mt-2">Not routinely under WSES guidance. Give the recommended preoperative prophylaxis and distinguish uncomplicated disease from perforation, abscess or incomplete source control when planning postoperative treatment.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["WSES appendicitis 2020", "Anaesthesia 2013 (Emergency conduct)"]} />
  </div>;
}

export function EmergencyObstructionTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
    <h3 className="text-lg font-semibold text-foreground">Adhesive obstruction: when observation is unsafe</h3>
    <p>The Bologna guidance concerns <strong className="text-foreground">adhesive small bowel obstruction</strong>, not all causes of bowel obstruction. In the absence of peritonitis, strangulation or bowel ischaemia, nonoperative management is usually appropriate: fasting, gastric decompression, fluid/electrolyte replacement and repeated review. Those three findings are contraindications to a conservative trial. CT evidence of a closed loop, ischaemia or free fluid can support urgent surgery; a normal initial lactate does not replace clinical assessment.<R label="WSES ASBO 2018" /></p>
    <p>A trial lasting up to 72 hours is considered reasonable in selected stable patients, but that is not a mandatory waiting period. New pain, tenderness, instability or evidence of compromise requires earlier reassessment and intervention. Water-soluble contrast failing to reach the colon on follow-up imaging at 24 hours predicts failure of nonoperative management; interpret it with the surgical team and the patient's condition rather than as an isolated automatic anaesthetic trigger.<R label="WSES ASBO 2018" /></p>
    <p>Vomiting and sequestration cause volume depletion and electrolyte loss. Assess perfusion, renal function, acid–base status and nasogastric losses; replace according to response rather than prescribing a fixed number of litres. Nasogastric decompression reduces gastric volume but does not guarantee an empty stomach. Plan aspiration protection, suction and haemodynamic support before induction. Ischaemic or perforated bowel adds sepsis and source-control urgency to the hypovolaemia.<R label="WSES ASBO 2018" /><R label="SSC source control 2021" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: is a 72-hour trial appropriate with peritonitis?</summary><p className="mt-2">No. Peritonitis, strangulation and bowel ischaemia are contraindications to nonoperative treatment in adhesive obstruction. The 72-hour allowance applies only to selected stable patients without those features and with repeated review.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["WSES ASBO 2018", "SSC source control 2021"]} />
  </div>;
}

export function EmergencyHipFractureTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
    <h3 className="text-lg font-semibold text-foreground">Hip fracture: a coordinated recovery pathway</h3>
    <p>NICE CG124 recommends surgery on the day of, or the day after, admission. Identify and treat correctable comorbidities immediately so that anaemia, anticoagulation, volume depletion, electrolyte imbalance, uncontrolled diabetes or heart failure, correctable arrhythmia/ischaemia and chest disease do not cause avoidable delay. The objective is timely surgery with treatment of meaningful problems, not exhaustive elective-style investigation or acceptance of unstable disease.<R label="NICE CG124" /></p>
    <p>Assess pain immediately, including in people with cognitive impairment. Give regular paracetamol unless contraindicated, additional opioids when needed, and consider a nerve block if pain remains inadequate or to limit opioids. A block is not a substitute for early surgery. NICE does not recommend NSAIDs in this pathway. Reassess analgesia during nursing care, positioning and transfer, not only at rest.<R label="NICE CG124" /></p>
    <p>Offer spinal or general anaesthesia after discussing risks and benefits, considering patient preference, anticoagulation, cardiorespiratory condition and feasibility. A technique label alone does not establish the best outcome for a particular patient. Plan haemodynamic management, delirium prevention, nutrition, orthogeriatric input and mobilisation from the outset. The postoperative handover should state new organ-support needs, analgesia, fluid balance, complications and escalation decisions so that a successful operation becomes a recoverable admission.<R label="NICE CG124" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does NICE require spinal anaesthesia for every hip fracture?</summary><p className="mt-2">No. It recommends offering a choice of spinal or general anaesthesia after discussing risks and benefits. Timely surgery, adequate analgesia and coordinated perioperative care remain central whichever technique is used.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["NICE CG124"]} />
  </div>;
}
export function EmergencyXaReversalTeaching() {
  const A = () => <InlineRef topicId="emergency-surgery" refLabel="ANNEXA-I 2024" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Reversing Factor Xa Inhibitors: What ANNEXA-I Showed</h3>
    <p>ANNEXA-I randomised 530 patients with acute intracerebral haemorrhage on apixaban, rivaroxaban or edoxaban (mostly for atrial fibrillation) to andexanet or usual care. In the usual-care group, 85.5% received prothrombin complex concentrate (PCC).<A /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Bleeding control:</strong> haemostatic efficacy was 67.0% with andexanet vs 53.1% with usual care (adjusted difference 13.4 percentage points). Anti-Xa activity fell by a median 94.5% vs 26.9%.<A /></li>
      <li><strong className="text-foreground">Harm:</strong> thrombotic events were 10.3% vs 5.6%, and ischaemic stroke 6.5% vs 1.5%.<A /></li>
      <li><strong className="text-foreground">Patient outcomes:</strong> modified Rankin scores and 30-day mortality did not differ appreciably.<A /></li>
      <li><strong className="text-foreground">Applying it:</strong> the trial studied brain haemorrhage, not surgical bleeding or reversal before an operation. A better laboratory and scan result came with more clots and no shown improvement in function or survival. Follow local haematology policy for the choice between andexanet and PCC.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: why is "andexanet improves haemostasis" an incomplete answer?</summary><p className="mt-2">Thrombotic events nearly doubled (10.3% vs 5.6%), ischaemic stroke was higher, and there was no appreciable difference in disability or 30-day death.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["ANNEXA-I 2024"]} />
  </div>;
}

export function EmergencyDabigatranReversalTeaching() {
  const R = () => <InlineRef topicId="emergency-surgery" refLabel="REVERSE-AD 2017" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Reversing Dabigatran Before Urgent Surgery: REVERSE-AD</h3>
    <p>REVERSE-AD gave idarucizumab 5 g to 503 patients on dabigatran: 301 with serious bleeding (group A) and 202 needing an urgent procedure (group B). It was a single-arm study with no control group.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Reversal:</strong> the median maximum reversal was 100%, measured by diluted thrombin time or ecarin clotting time.<R /></li>
      <li><strong className="text-foreground">Urgent surgery:</strong> the median time to starting the procedure was 1.6 h, and haemostasis during the procedure was judged normal in 93.4%.<R /></li>
      <li><strong className="text-foreground">Outcomes at 90 days:</strong> thrombotic events 6.3% (A) and 7.4% (B); mortality 18.8% and 18.9%.<R /></li>
      <li><strong className="text-foreground">Interpretation:</strong> the drug reliably reverses the laboratory effect. Without a comparison group, the study cannot show that it improves survival. The high death rate reflects how sick these patients were.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: why can't REVERSE-AD prove idarucizumab saves lives?</summary><p className="mt-2">Every patient received the drug, so there was no comparison group. It shows reversal and procedural haemostasis, not a mortality benefit.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["REVERSE-AD 2017"]} />
  </div>;
}

export function EmergencyReboaTeaching() {
  const R = () => <InlineRef topicId="emergency-surgery" refLabel="UK-REBOA 2023" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Balloon Occlusion of the Aorta in Damage Control: UK-REBOA</h3>
    <p>REBOA inflates a balloon in the aorta to reduce bleeding below it while the patient is taken to surgery. UK-REBOA randomised 90 trauma patients with exsanguinating haemorrhage in emergency departments to REBOA plus standard care or standard care alone.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Primary result:</strong> 90-day mortality was 54% with REBOA vs 42% with standard care (OR 1.58, 95% credible interval 0.72–3.52). The probability that REBOA increased the odds of death was 86.9%.<R /></li>
      <li><strong className="text-foreground">Timing of deaths:</strong> the excess was larger at earlier time points, and more deaths were due to bleeding (32% vs 17% of deaths), mostly within 24 h.<R /></li>
      <li><strong className="text-foreground">Practice point:</strong> in this setting REBOA did not help and probably harmed. Damage control still means rapid surgical or radiological bleeding control alongside blood-product resuscitation.</li>
      <li><strong className="text-foreground">Limits:</strong> the trial was small and its Bayesian results are probabilities, not definitive proof. It does not test REBOA before hospital or in other systems.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what was the posterior probability that REBOA increased the odds of death?</summary><p className="mt-2">86.9%. Mortality was 54% vs 42% at 90 days.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["UK-REBOA 2023"]} />
  </div>;
}

export function EmergencyEctopicTeaching() {
  const N = () => <InlineRef topicId="emergency-surgery" refLabel="NICE NG126 2026" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Ectopic Pregnancy Surgery: What NICE NG126 Recommends</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Approach:</strong> operate laparoscopically whenever possible, taking into account the patient's condition and the complexity of surgery. A shocked patient may still need a laparotomy.<N /></li>
      <li><strong className="text-foreground">Procedure:</strong> offer salpingectomy unless there are other risk factors for infertility. Consider salpingotomy if, for example, the other tube is damaged; up to 1 in 5 then need further treatment.<N /></li>
      <li><strong className="text-foreground">Anti-D (updated June 2026):</strong> do not offer anti-D for ectopic pregnancy up to and including 11+6 weeks. Offer at least 250 IU to RhD-negative patients at 12+0 to 12+6 weeks having medical or surgical management. Use the ultrasound gestation if dates differ.<N /></li>
      <li><strong className="text-foreground">After salpingectomy:</strong> advise a urine pregnancy test after 3 weeks.<N /></li>
      <li><strong className="text-foreground">Anaesthetic point:</strong> NICE sets surgical, not anaesthetic, policy. For the unstable patient, the priorities remain early senior help, major-haemorrhage activation and preparing for collapse at induction.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: an RhD-negative patient has surgery for an ectopic at 8 weeks. Is anti-D offered?</summary><p className="mt-2">No. Under the 2026 update, anti-D is not offered up to and including 11+6 weeks.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["NICE NG126 2026"]} />
  </div>;
}

export function EmergencyTivaTeaching() {
  const G = () => <InlineRef topicId="emergency-surgery" refLabel="AoA/SIVA TIVA 2019" />;
  const E = () => <InlineRef topicId="emergency-surgery" refLabel="Anaesthesia 2026 (TIVA emergency)" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Why Every Emergency Anaesthetist Needs TIVA Skills</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Guideline position:</strong> the joint Association of Anaesthetists/SIVA guideline notes that volatile maintenance remains commonest in the UK and Ireland, but an inhalational technique is sometimes not possible or is contraindicated. It therefore states that all anaesthetists should be able to deliver TIVA competently and safely.<G /></li>
      <li><strong className="text-foreground">Scope:</strong> the guideline covers safe practice when TIVA is used, including mixed infusion and volatile techniques. It deliberately does not judge whether TIVA is better than volatile anaesthesia when both are possible.<G /></li>
      <li><strong className="text-foreground">Emergency gap:</strong> a 2026 narrative review notes TIVA is well established electively but its use remains limited in emergencies, particularly for rapid sequence induction.<E /></li>
      <li><strong className="text-foreground">Practice point:</strong> the emergency list is where an inhalational technique may suddenly be unavailable or contraindicated, so TIVA competence is a safety skill, not a preference. A narrative review is not trial evidence that TIVA improves emergency outcomes.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does the 2019 TIVA guideline say TIVA is better than volatile anaesthesia?</summary><p className="mt-2">No. It sets safe-practice standards and says all anaesthetists should be competent in TIVA, but explicitly does not review TIVA versus volatile where both are possible.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["AoA/SIVA TIVA 2019", "Anaesthesia 2026 (TIVA emergency)"]} />
  </div>;
}

export function EmergencyCompartmentPressureTeaching() {
  const M = () => <InlineRef topicId="emergency-surgery" refLabel="McQueen 1996" />;
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">The Differential Pressure Threshold: McQueen and Court-Brown</h3>
    <p>This prospective Edinburgh study continuously monitored anterior compartment pressure for 24 hours in 116 patients with tibial shaft fractures. Three (2.6%) developed acute compartment syndrome.<M /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Absolute pressure overcalls:</strong> in the first 12 hours, 53 patients had absolute pressures over 30 mmHg. A 30 mmHg threshold would have meant fasciotomy for 50 patients (43%); a 40 mmHg threshold would have considered 27 (23%) for an unnecessary fasciotomy.<M /></li>
      <li><strong className="text-foreground">Differential pressure:</strong> only the three patients whose differential pressure (diastolic minus compartment pressure) fell below 30 mmHg had fasciotomy. No case was missed and none of the 116 had sequelae at six months or later.<M /></li>
      <li><strong className="text-foreground">Anaesthetic relevance:</strong> differential pressure depends on diastolic pressure, so hypotension under anaesthesia lowers it. Read pressures alongside the current blood pressure, and agree monitoring with the surgeons when the patient is obtunded or blocked.</li>
      <li><strong className="text-foreground">Limits:</strong> a single-centre study of tibial fractures with only three cases; it cannot define the threshold precisely for other limbs or injuries.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: diastolic 60 mmHg, compartment pressure 35 mmHg. Does this meet the McQueen threshold?</summary><p className="mt-2">Yes. The differential pressure is 25 mmHg, below 30 mmHg.</p></details>
    <LessonSources topicId="emergency-surgery" labels={["McQueen 1996"]} />
  </div>;
}

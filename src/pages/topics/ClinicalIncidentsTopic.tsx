import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { clinicalIncidentsQuestions } from "@/data/quizzes";
import MHPathophysiologyDiagram from "@/components/diagrams/clinical/MHPathophysiologyDiagram";
import AnaphylaxisPathophysiologyDiagram from "@/components/diagrams/clinical/AnaphylaxisPathophysiologyDiagram";
import { AnaphylaxisCascadeDiagram } from "@/components/diagrams/clinical/AnaphylaxisCascadeDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { Link } from "react-router-dom";
import { InlineRef } from "@/components/references/InlineRef";

const clinicalIncidentsFaqs: Array<[string, string]> = [
  [
    "What is the immediate management of a never event in theatre?",
    "Stop the procedure, ensure patient safety, escalate to consultant and theatre lead, preserve evidence (devices, packaging, monitor traces), follow local critical-incident pathway, complete a Duty of Candour conversation with the patient/family, and submit a Datix/StEIS report. A structured debrief and root-cause analysis follow within 72 hours."
  ],
  [
    "How is a hot debrief structured after a critical incident?",
    "Use the STOP5 model: Summarise the case, Things that went well, Opportunities to improve, Points to action, then Set a date for follow-up. Run within 30 minutes of the event, include the whole theatre team, focus on systems not individuals, and document outcomes in a learning log."
  ],
  [
    "When must Duty of Candour be triggered?",
    "When a notifiable safety incident causes moderate harm, severe harm, prolonged psychological harm, or death. The clinician must inform the patient (or NOK) as soon as reasonably practicable, provide a verbal and written apology, explain what happened, what will be done, and offer support. Failure is a regulatory breach (CQC Regulation 20)."
  ]
];

const objectives = [
  "Recognise and manage perioperative anaphylaxis using the AAGBI/RCoA algorithm (adrenaline first)",
  "Identify the early features of malignant hyperthermia and initiate dantrolene-based treatment",
  "Apply the AAGBI LAST protocol including Intralipid 20% rescue therapy",
  "Counsel a patient and arrange follow-up after suspected accidental awareness (NAP5 framework)",
  "Investigate suspected anaphylaxis correctly (timed mast-cell tryptase + allergy clinic referral)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Suspected anaphylaxis at induction",
    scenario:
      "Five minutes after rocuronium for an elective laparotomy, SpO₂ falls to 88%, peak airway pressure rises to 38 cmH₂O, BP 65/30 mmHg, HR 140 with a generalised flush. What do you do, and what samples must you send?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step management</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Recognise.</strong> NMBA + bronchospasm + shock + flush = grade 3 anaphylaxis.</li>
          <li><strong>Stop trigger, call for help, note the time.</strong> Discontinue all suspect agents (NMBA, antibiotic, chlorhexidine).</li>
          <li><strong>Adrenaline.</strong> IM 0.5 mg (0.5 mL of 1:1,000) into anterolateral thigh, OR IV <strong>50 µg boluses</strong> (5 mL of 1:100,000) titrated. Repeat every 1–2 min.</li>
          <li><strong>Airway and oxygen.</strong> 100% O₂; deepen anaesthesia; treat bronchospasm with salbutamol/MgSO₄ if refractory.</li>
          <li><strong>Fluid bolus.</strong> 20 mL/kg crystalloid (1–2 L); start vasopressor infusion if persistent hypotension.</li>
          <li><strong>Second-line.</strong> Chlorphenamine 10 mg IV, hydrocortisone 200 mg IV (no proven mortality benefit but reduces biphasic reactions).</li>
          <li><strong>Tryptase samples.</strong> ASAP after resuscitation, at <strong>1–2 h</strong>, and a baseline at <strong>≥ 24 h</strong>. Yellow-top serum, label with exact times.</li>
          <li><strong>Refer.</strong> Specialist allergy clinic within 6 weeks (NAP6); document on anaesthetic chart and warning bracelet.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Reaching for chlorphenamine/hydrocortisone before adrenaline — adrenaline saves lives, the others don't.</li>
            <li>Using IV adrenaline 1:1,000 (1 mg/mL) — dilute to 1:100,000 first.</li>
            <li>Forgetting the baseline tryptase at 24 h — without it the acute level is uninterpretable.</li>
            <li>Missing chlorhexidine as a culprit (catheter coatings, skin prep).</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "IM adrenaline 0.5 mg (or IV 50 µg titrated) is the immediate priority, followed by oxygen, fluids, and second-line agents. Send tryptase at presentation, 1–2 h, and ≥ 24 h, refer to allergy clinic, and document the suspected trigger on the patient's records.",
   cites: ["AAGBI 2009"],
  },
  {
    title: "Rising EtCO₂ in a young patient on volatile",
    scenario:
      "A previously well 22-year-old undergoing elective ACL repair under sevoflurane shows EtCO₂ climbing from 4.8 → 7.2 kPa over 15 min despite increased minute ventilation, HR 130, masseter tone after suxamethonium. Temperature is 36.9 °C. What is the diagnosis and how do you treat?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step approach</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Recognise the pattern.</strong> Unexplained rising EtCO₂ + tachycardia + masseter spasm post-sux on a volatile = MH until proven otherwise. Hyperthermia is a LATE sign.</li>
          <li><strong>Call for help and the MH trolley.</strong> Declare 'malignant hyperthermia' to the team.</li>
          <li><strong>Stop triggers.</strong> Discontinue volatile, change circuit to vapour-free anaesthetic machine (or activated-charcoal filters), ventilate with 100% O₂ at high flows. Convert to TIVA.</li>
          <li><strong>Dantrolene.</strong> <strong>2.5 mg/kg IV bolus</strong>. For a 70 kg patient = 175 mg = ~9 vials of 20 mg dantrolene. Repeat every 5–10 min up to 10 mg/kg until EtCO₂ and HR settle.</li>
          <li><strong>Active cooling.</strong> Cold IV fluids, surface ice packs to groin/axillae, gastric/bladder lavage if temp &gt; 39 °C. Stop cooling at 38.5 °C.</li>
          <li><strong>Treat hyperkalaemia.</strong> Calcium chloride 10% 10 mL, insulin/dextrose, salbutamol; haemofilter if refractory.</li>
          <li><strong>Investigations.</strong> ABG, K⁺, CK (peak at 12–24 h), urine for myoglobin, coagulation (DIC).</li>
          <li><strong>Disposition.</strong> ICU minimum 24 h; refer to MH Unit (Leeds in UK) for IVCT muscle biopsy; counsel family (autosomal dominant).</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Quick dantrolene maths</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Each vial = 20 mg in 60 mL water. For 70 kg × 2.5 mg/kg = 175 mg → reconstitute 9 vials. Maximum 10 mg/kg = 700 mg = 35 vials. Stock check matters.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Waiting for hyperthermia before treating — it's the last sign.</li>
            <li>Continuing volatile during preparation — change circuits IMMEDIATELY.</li>
            <li>Underdosing dantrolene because reconstitution is slow — assign one person to mix while another resuscitates.</li>
            <li>Missing rebound 6–12 h later — MH can recrudesce; ICU monitoring is mandatory.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Treat as MH: stop volatile, hyperventilate with 100% O₂, give dantrolene 2.5 mg/kg IV repeated to effect (max 10 mg/kg), cool actively, and treat hyperkalaemia. ICU admission for ≥ 24 h with referral for IVCT and family counselling.",
   cites: ["NAP Reports"],
  },
];

const tocItems = [
  { id: "section-anaphylaxis", label: "Anaphylaxis", group: "Incidents" },
  { id: "section-mh", label: "Malignant Hyperthermia", group: "Incidents" },
  { id: "section-last", label: "LAST", group: "Incidents" },
  { id: "section-awareness", label: "Accidental Awareness", group: "Incidents" },
  { id: "section-death-on-table", label: "Death on the Table", group: "Incidents" },
  { id: "section-cico", label: "Cannot Intubate, Cannot Oxygenate", group: "Incidents" },
];

const ClinicalIncidentsTopic = () => {
  return (
    <TopicTemplate
      title="Critical Incidents"
      subtitle="Anaphylaxis, malignant hyperthermia, LAST, and accidental awareness"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="clinical-incidents"
      topicTitle="Critical Incidents"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={clinicalIncidentsQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Final — Clinical Anaesthesia", "FFICM 2.5"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "AAGBI 2009",
          "NAP Reports",
          "NAP Reports",
        ],
        workedExamples: [
          "AAGBI 2009",
          "AAGBI 2011",
          "AAGBI 2011",
        
          "NAP Reports",
        ],
        keyPoints: [
          "AAGBI 2011",
          "BJA Educ 2011",
        
          "NAP Reports",
          "AAGBI 2009",
        ],
      }}
      keyPoints={[
        { text: "Anaphylaxis: IM adrenaline 0.5 mg (or IV 50 µg titrated) is FIRST-line — antihistamine and steroid are adjuncts only", cites: ["NAP Reports"] },
        { text: "Tryptase: take at presentation, 1–2 h, and a baseline at ≥ 24 h — labelled with exact times", cites: ["AAGBI 2009"] },
        { text: "MH: rising EtCO₂ + tachycardia is the earliest sign. Dantrolene 2.5 mg/kg IV, repeat to 10 mg/kg", cites: ["AAGBI 2011"] },
        { text: "LAST: Intralipid 20% bolus 1.5 mL/kg, infusion 15 mL/kg/h. AVOID propofol, lidocaine, and amiodarone in arrest", cites: ["BJA Educ 2011"] },
        { text: "Awareness: NAP5 incidence ~1:19,000. BIS 40-60 reduces risk in TIVA; document, acknowledge, and refer for psychological follow-up", cites: ["NAP Reports"] },
        { text: <>NMBAs cause ~38% of perioperative anaphylaxis (NAP6), followed by antibiotics (26%) and chlorhexidine (9%) <InlineRef topicId="clinical-incidents" refLabel="NAP6 2018 (Triggers)" /></>, cites: ["AAGBI 2009"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />
          <ExamSection id="section-anaphylaxis" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
            <CollapsibleSubsection title="Anaphylaxis" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Perioperative anaphylaxis occurs in ~1:10,000 anaesthetics (NAP6). <Link to="/pharmacology/muscle-relaxants" className="text-pharmacology underline">NMBAs</Link> are the commonest cause (~60%), followed by antibiotics (especially teicoplanin), chlorhexidine, and patent blue dye.
            </p>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <p className="font-semibold text-foreground text-sm">AAGBI/RCoA Management Algorithm</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Remove trigger, call for help, note the time</li>
                <li><strong>Adrenaline IM</strong> 0.5 mg (0.5 mL of 1:1000) — repeat every 1–2 min. IV: 50 µg boluses if trained</li>
                <li>High-flow O₂, secure airway, IV access</li>
                <li>Fluid bolus: 20 mL/kg crystalloid</li>
                <li>Chlorphenamine 10 mg IV, hydrocortisone 200 mg IV</li>
                <li>Take mast cell tryptase at presentation, 1–2 h, and a baseline at ≥ 24 h</li>
                <li>Refer to allergy clinic; document on records and warning bracelet</li>
              </ol>
            </div>
            <AnaphylaxisPathophysiologyDiagram />
            <div className="mt-4">
              <AnaphylaxisCascadeDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-mh" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Malignant Hyperthermia (MH)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Autosomal dominant ryanodine receptor (RYR1) mutation. Triggered by volatile agents and <Link to="/pharmacology/muscle-relaxants" className="text-pharmacology underline">suxamethonium</Link>. Incidence ~1:5,000–15,000. Mortality now &lt; 5% with dantrolene.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Early Signs</p>
                <p className="text-sm text-muted-foreground">↑ EtCO₂ (earliest), tachycardia, masseter spasm, metabolic acidosis</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Late Signs</p>
                <p className="text-sm text-muted-foreground">Hyperthermia (&gt; 2 °C/h rise), rhabdomyolysis, hyperkalaemia, DIC</p>
              </div>
            </div>
            <div className="mt-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <p className="font-semibold text-foreground text-sm">Treatment: Dantrolene 2.5 mg/kg IV</p>
              <p className="text-sm text-muted-foreground mt-1">Repeat every 5–10 min up to 10 mg/kg. Discontinue triggers, hyperventilate with 100% O₂, active cooling, treat hyperkalaemia.</p>
            </div>
            <MHPathophysiologyDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-last" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Local Anaesthetic Systemic Toxicity (LAST)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              CNS toxicity precedes cardiac toxicity (except with bupivacaine which can cause simultaneous cardiac arrest). Maximum doses: lidocaine 3 mg/kg (7 with adrenaline), bupivacaine 2 mg/kg.
            </p>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-2">AAGBI LAST Protocol</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Stop injection, call for help</li>
                <li>ABCDE, secure airway, 100% O₂</li>
                <li>Seizures → benzodiazepine (avoid propofol in cardiac arrest)</li>
                <li>If cardiac arrest → CPR, AVOID lidocaine/amiodarone/vasopressin</li>
                <li><strong>Intralipid 20%</strong>: 1.5 mL/kg bolus, then 15 mL/kg/h infusion (max 12 mL/kg total)</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-awareness" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Accidental Awareness Under Anaesthesia">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The <strong>5th National Audit Project (NAP5, 2014)</strong> found an incidence of accidental awareness of roughly <strong>1:19,000</strong> general anaesthetics overall, with the highest rates during rapid sequence induction, obstetric GA, cardiac surgery, and TIVA without processed EEG monitoring. Around <strong>50% of reports involved significant distress</strong>, most characteristically the sensation of paralysis combined with helplessness — patients could hear, sometimes feel pain or surgical manipulation, but could not move or signal. A substantial minority go on to develop longer-term psychological harm: of those who reported distress, approximately <strong>41% described features consistent with PTSD</strong>, sometimes persisting for years <InlineRef topicId="clinical-incidents" refLabel="NAP5 2014" />.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Prevention</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>End-tidal anaesthetic agent monitoring with low-agent alarms for all volatile-based anaesthesia.</li>
                  <li>Processed EEG (e.g. BIS 40–60) strongly advised whenever TIVA is combined with neuromuscular blockade, where there is no volatile agent to monitor.</li>
                  <li>Routine vaporiser level and anaesthetic delivery-system checks before and during the case (empty vaporiser, disconnected TIVA line, and IV extravasation are recurrent NAP5 themes).</li>
                  <li>Extra vigilance at handover/transfer and during the high-risk periods of RSI and emergence, when neuromuscular blockade may outlast hypnosis.</li>
                  <li>Use of a nerve stimulator to confirm adequate neuromuscular blockade and guide safe reversal.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Post-event management (NAP5 framework)</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Immediate acknowledgement and sympathy — believe the patient, do not dismiss the report.</li>
                  <li>Early senior anaesthetist review with a detailed explanation of what is known and a genuine apology (Duty of Candour).</li>
                  <li>Referral to clinical psychology for assessment and support.</li>
                  <li>Careful, structured documentation of the history and any contributory factors identified.</li>
                  <li>Local incident reporting (Datix) to drive learning and system change.</li>
                  <li>Planned follow-up appointment(s) to review recovery and screen for PTSD.</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-massive-haemorrhage" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Massive Haemorrhage">
            <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">
              <p>
                Massive haemorrhage is conventionally defined as loss of one circulating blood volume within 24 hours, 50% of blood volume within 3 hours, or bleeding at
                more than 150 mL/min. In practice these definitions are retrospective, so activation should be triggered clinically — ongoing uncontrolled bleeding with
                shock, or an anticipated need for large-volume transfusion <InlineRef topicId="clinical-incidents" refLabel="AAGBI Massive Haemorrhage 2010" />.
              </p>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Recognition and immediate actions</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>Call for help, declare "major haemorrhage" and activate the hospital protocol via switchboard — this mobilises the laboratory, porters and a consultant haematologist as a single call.</li>
                  <li>Apply direct pressure, tourniquet or packing; make the definitive plan for haemostasis (surgery, endoscopy, interventional radiology) immediately — resuscitation buys time, it does not stop bleeding.</li>
                  <li>Establish large-bore access (two 14–16 G peripheral cannulae or a rapid-infusion catheter), send a full set of bloods including group and save/crossmatch, FBC, coagulation screen, fibrinogen, U&amp;E, calcium and a blood gas with lactate.</li>
                  <li>Use group O emergency blood (O RhD-negative for women of childbearing potential) until group-specific units are available; switch as soon as possible to conserve O-negative stock.</li>
                  <li>Warm everything: fluid warmer, forced-air blanket, raise theatre temperature. Hypothermia below 35 °C independently worsens coagulopathy and platelet function.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Transfusion strategy</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>Empirical fixed-ratio packs (approximately 1:1 red cells to FFP) while bleeding is uncontrolled and no laboratory results are available, then switch to goal-directed therapy guided by viscoelastic testing or laboratory values as soon as they are obtainable <InlineRef topicId="clinical-incidents" refLabel="NICE NG24 2015" />.</li>
                  <li>Targets: haemoglobin 70–90 g/L during active bleeding, platelets above 50 × 10⁹/L (above 100 × 10⁹/L with brain or eye injury or diffuse bleeding), fibrinogen above 1.5–2 g/L (FIBTEM/FIBTEM A5 below 10 mm), PT/APTT ratio below 1.5 and ionised calcium above 1.0 mmol/L.</li>
                  <li>Fibrinogen falls first in dilutional and consumptive coagulopathy — replace early with fibrinogen concentrate or cryoprecipitate rather than relying on FFP alone.</li>
                  <li>Give tranexamic acid early in traumatic and obstetric haemorrhage; the time-critical benefit lies with the first 1 g given within 3 hours.</li>
                  <li>Avoid large-volume crystalloid — it dilutes clotting factors, worsens acidosis and increases bleeding. Restrict clear fluid to a bridging role only.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Complications to anticipate</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>Hypocalcaemia from citrate chelation — check ionised calcium every 30 minutes and replace with calcium chloride or gluconate.</li>
                  <li>Hyperkalaemia and acidosis from stored blood, compounded by hypoperfusion; correct acidosis by restoring perfusion rather than with bicarbonate.</li>
                  <li>Hypothermia, dilutional and consumptive coagulopathy — the self-reinforcing lethal triad.</li>
                  <li>TACO and TRALI, transfusion-associated hyperkalaemic cardiac arrest (particularly in children and with rapid central infusion of older units), and air embolism from pressurised infusion devices.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Afterwards</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>Stand down the protocol explicitly, return unused units, and document indication, products given, timings and laboratory trends.</li>
                  <li>Thromboprophylaxis review once haemostasis is secure — these patients rapidly become prothrombotic.</li>
                  <li>Report transfusion reactions and near misses (SHOT/Datix), debrief the team, and audit activation against protocol criteria.</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-death-on-table" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Death on the Table">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Intra-operative cardiac arrest occurs in ~5–7 per 10,000 anaesthetics; mortality of intra-operative arrest remains ~30–70% (NAP7, 2023). Most are anticipated in high-risk emergency surgery, but a minority are sudden and unexpected. Management has three parallel strands — <strong>resuscitation</strong>, <strong>communication / governance</strong>, and <strong>aftercare of staff and family</strong>.
              </p>

              <h3 className="text-base font-semibold text-foreground mt-2">1. Immediate clinical management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Call for help early</strong> — declare "cardiac arrest" out loud; activate theatre arrest call; second anaesthetist + ODP/anaesthetic assistant to the head; runner for drugs/blood.</li>
                <li><strong>ALS algorithm adapted to theatre</strong>: turn off volatile/TIVA, FiO₂ 1.0, confirm ETT position with ETCO₂ (a sudden ETCO₂ drop is often the first sign), high-quality CPR — surgeons stop and step back from the field; consider open chest cardiac massage in cardiothoracic / abdominal surgery already opened.</li>
                <li><strong>Reversible causes (4 Hs &amp; 4 Ts) with anaesthesia-specific add-ons</strong>: anaphylaxis (give IM/IV adrenaline early), LAST (Intralipid 20% 1.5 mL/kg bolus then 15 mL/kg/h), MH (stop trigger, dantrolene), high spinal, gas embolism, haemorrhage, vagal reflex (e.g. peritoneal traction), tension pneumothorax (especially after CVC, brachial plexus, intercostal block), tamponade.</li>
                <li><strong>Surgical control of haemorrhage</strong> takes priority alongside resuscitation — activate major haemorrhage protocol, give TXA, use cell salvage, accept permissive hypotension until source controlled.</li>
                <li><strong>Decision to stop</strong>: by consensus of the senior anaesthetist and senior surgeon, after exclusion of reversible causes and an adequate ALS effort. Document time of death, rhythm, and last interventions.</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mt-3">2. Immediately after death is declared</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Preserve the scene</strong>: leave all lines, tubes, drains, drug ampoules and infusion syringes in situ — do not discard. Photograph the drug tray. The Coroner / Medical Examiner may require this.</li>
                <li><strong>Document contemporaneously</strong>: anaesthetic chart, drugs given (with batch numbers), times, vital signs trend, interventions, who attended and when, decision-making.</li>
                <li><strong>Bloods at the time of arrest</strong> if anaphylaxis is possible — mast-cell tryptase at 0, 1–2 h and 24 h.</li>
                <li><strong>Stop the next case</strong> on that list. The remaining theatre list should usually be cancelled or transferred to another team.</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mt-3">3. Communication</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Family</strong>: a senior surgeon and senior anaesthetist together, in a private quiet room, as soon as possible. Use the patient's name; be honest about what happened and what is not yet known. Offer to view the body. Provide written follow-up contact. Apply the statutory <strong>Duty of Candour</strong> (CQC Regulation 20).</li>
                <li><strong>Theatre team</strong>: brief "hot debrief" once safe — what happened, immediate welfare, who is following up. Avoid blame. Identify staff who should not drive home alone or continue clinical work that day.</li>
                <li><strong>Hospital chain</strong>: inform clinical director, on-call manager, bed manager, mortuary, bereavement office, GP, and (if relevant) transplant coordinator.</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mt-3">4. Statutory &amp; governance reporting</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Coroner / Procurator Fiscal</strong>: any death within 24 h of an anaesthetic, any unexpected death, death from a procedure, or death where the cause is uncertain — referral is mandatory. The body becomes the property of the Coroner and a post-mortem is likely.</li>
                <li><strong>Datix / local incident reporting</strong> within 24 h. Serious Incident (SI) declaration via the trust governance team; trigger a Patient Safety Incident Investigation (PSII) under the NHS PSIRF.</li>
                <li><strong>Medical Examiner</strong> scrutiny of the death certificate.</li>
                <li><strong>External reporting where applicable</strong>: MHRA Yellow Card (suspected drug reaction), NRLS / LFPSE, MHRA medical device incident, NAP7 contribution, Specialist society registries (e.g. UK MH Investigation Unit, NIAA Anaphylaxis pathway).</li>
                <li><strong>Mortality &amp; Morbidity meeting</strong> in the department; anonymised case discussion within 4–6 weeks.</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mt-3">5. Non-technical skills during the arrest</h3>
              <p className="text-sm">
                Outcomes from critical incidents are shaped as much by <strong>non-technical skills</strong> as by technical resuscitation knowledge <InlineRef topicId="clinical-incidents" refLabel="BJA 2006 (Non-technical skills)" />.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Leadership and explicit role allocation</strong>: one clinician declares themselves CPR leader and stands back from hands-on tasks to direct; nominate a <strong>scribe</strong> to log times/drugs/rhythm and a <strong>runner</strong> for equipment and blood products. Ambiguous or absent leadership is a recurring theme in incident reports.</li>
                <li><strong>Situational awareness</strong>: the leader should continuously scan the surgical field (ongoing blood loss, surgical manipulation), physiological trends on the monitor (not just the current number), and the state of the team (fatigue, task fixation, rising stress).</li>
                <li><strong>Closed-loop communication</strong>: instructions are directed at a named individual, acknowledged back, and confirmed once complete (e.g. "give 1 mg adrenaline" → "giving 1 mg adrenaline now" → "1 mg adrenaline given"). This reduces omitted or duplicated interventions.</li>
                <li><strong>Structured hot debrief</strong> immediately after the event, using a simple framework such as <strong>STOP5</strong> (Summarise, Things that went well, Opportunities to improve, Points to action, Set a follow-up date) or a <strong>diamond debrief</strong> (facts → feelings → future actions, widening from the individual to the team). Keep it brief, blame-free, and focused on systems.</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mt-3">6. Staff welfare &amp; second-victim support</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Recognise the <strong>"second victim" phenomenon</strong> in detail — the involved clinician(s) themselves become a casualty of the event, with acute stress reactions, sleep disturbance, intrusive recollection, guilt, loss of confidence, and risk of subsequent defensive practice or burnout. This can affect anaesthetists, ODPs, scrub staff, and surgeons alike, and may be underestimated by colleagues.</li>
                <li>Offer <strong>structured peer support</strong>, including formal <strong>TRiM (Trauma Risk Management)</strong> assessment where available, an AAGBI/Royal College mentor scheme, and occupational health referral. Avoid mandatory single-session psychological debriefing ("psychological first aid" delivered as a one-off) — evidence suggests this does not reduce, and may worsen, PTSD risk; support should instead be proactive, staged, and opt-in.</li>
                <li><strong>Proactive departmental support</strong>: the department (not just the individual) should check in with all staff involved within 24–48 h, again at 1–2 weeks, and around key dates (inquest, anniversary). Do not allow the involved anaesthetist to be the sole clinician for the next case; consider time off from clinical duties.</li>
                <li>Provide ongoing follow-up and signposting — inquest preparation, Coroner's hearing support, GMC/legal advice via the medical defence organisation, and access to formal counselling or psychology services if symptoms persist beyond a few weeks.</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mt-3">Key references</h3>
              <p className="text-sm">
                NAP7 (RCoA, 2023) — Peri-operative Cardiac Arrest; AAGBI Quick Reference Handbook (QRH 3-1 cardiac arrest, 3-2 anaphylaxis, 3-10 LAST); CQC Duty of Candour (Reg 20, 2014); Coroners and Justice Act 2009; NHS Patient Safety Incident Response Framework (2022); RCoA Wellbeing Resource Pack.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamSection id="section-cico" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
            <CollapsibleSubsection title="Cannot Intubate, Cannot Oxygenate (CICO)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              CICO is defined as failed tracheal intubation <strong>plus</strong> failure to oxygenate — e.g. SpO₂ &lt; 90% on FiO₂ 1.0 despite optimised face-mask ventilation and at least one attempt with a supraglottic airway device. It is a "can't breathe" surgical airway emergency and demands immediate front-of-neck access (FONA) rather than repeated intubation attempts <InlineRef topicId="clinical-incidents" refLabel="DAS 2015 (CICO)" />.
            </p>
            <div className="rounded-xl border border-border bg-card p-5 space-y-2 mb-3">
              <p className="font-semibold text-foreground text-sm">The DAS 2015 four-plan algorithm — how you arrive at CICO</p>
              <p className="text-xs text-muted-foreground">CICO is the end-point of a structured, time-limited escalation. The value of the algorithm is that each plan has a declared failure point, so the team stops repeating a failing manoeuvre and moves on <InlineRef topicId="clinical-incidents" refLabel="DAS 2015 (CICO)" />.</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong>Plan A — facemask ventilation and tracheal intubation.</strong> Optimise first-pass conditions: pre-oxygenation to end-tidal O₂ ≥ 0.85 (nasal high-flow or apnoeic oxygenation), ramped/sniffing position, adequate neuromuscular blockade, best laryngoscope (videolaryngoscopy early), external laryngeal manipulation and a bougie. A <strong>maximum of three attempts, plus one further attempt only by a more experienced colleague (3 + 1)</strong>. Each attempt must change something. Then <strong>declare "failed intubation" out loud</strong> and call for help.</li>
                <li><strong>Plan B — maintain oxygenation via a supraglottic airway.</strong> Insert a second-generation SGA, <strong>maximum three attempts</strong>, changing size or device between attempts. The goal is oxygenation, not intubation. If successful, <strong>stop and think</strong>: wake the patient, proceed with the SGA, intubate through the SGA with a flexible scope, or perform a tracheostomy — a considered decision, not reflex continuation.</li>
                <li><strong>Plan C — final attempt at facemask ventilation.</strong> Two-person technique, oral and nasal airways, full muscle relaxation (give suxamethonium or rocuronium if any doubt — laryngospasm and inadequate relaxation are reversible causes). If this restores oxygenation, wake the patient. If it fails, <strong>declare "CICO"</strong>.</li>
                <li><strong>Plan D — emergency front-of-neck access (eFONA).</strong> The scalpel–bougie–tube cricothyroidotomy below is the UK standard technique; needle techniques have a high failure rate and are not recommended as the primary adult approach.</li>
              </ul>
              <p className="text-xs text-muted-foreground">Throughout: give 100% oxygen, keep attempt counts out loud, use a cognitive aid, and appoint someone to prepare the FONA set once Plan B is entered — preparation in parallel is what shortens the time to a surgical airway.</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <p className="font-semibold text-foreground text-sm">Sequence of actions</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong>Declare "CICO" out loud</strong> and call for help — second anaesthetist and ENT/surgical colleague to attend immediately.</li>
                <li><strong>Position</strong> the neck extended (unless contraindicated) to optimise access to the cricothyroid membrane.</li>
                <li>Make one <strong>final attempt</strong> at oxygenation (optimised SGA or facemask with two-person technique, airway adjuncts) only while FONA equipment is being opened and prepared in parallel — do not delay FONA waiting for this to succeed.</li>
                <li><strong>Scalpel–bougie–tube technique</strong>: palpate or use the laryngeal handshake to identify the cricothyroid membrane; make a transverse stab incision through skin and membrane; rotate the scalpel blade 90° caudally to open the tract; pass a bougie through the incision, angled caudally, into the trachea; railroad a size 6.0 cuffed tracheal tube over the bougie; inflate the cuff; ventilate; confirm placement with capnography and bilateral chest movement.</li>
                <li>If the cricothyroid membrane is <strong>impalpable</strong> (e.g. obesity, distorted anatomy), make a vertical skin incision first, then use blunt finger dissection down to the trachea before proceeding with the scalpel–bougie–tube technique.</li>
              </ol>
            </div>
            <div className="mt-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <p className="font-semibold text-foreground text-sm">After a successful FONA</p>
              <p className="text-sm text-muted-foreground mt-1">Secure the tube carefully, arrange ICU admission and ENT review for formal airway assessment and possible surgical tracheostomy, formulate a definitive airway plan for extubation, document the event and technique in detail, explain to the patient, and issue a written airway alert (and register with a national difficult-airway database where available).</p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Anaphylaxis (NAP6): NMBAs (38%), antibiotics (26%) and chlorhexidine (9%) top the list — adrenaline IM 0.5 mg first line.",
              <>Tryptase sampling: ASAP after resuscitation, at 1–2 h, and a baseline at ≥ 24 h — an uninterpretable acute value without the 24 h baseline is a common exam trap <InlineRef topicId="clinical-incidents" refLabel="RCUK Anaphylaxis 2021" /></>,
              "Malignant hyperthermia: stop trigger, hyperventilate 100% O₂ high flows, dantrolene 2.5 mg/kg repeated to 10 mg/kg, cool, treat hyperkalaemia.",
              <>LAST: stop injection, ABC, manage seizures, 20% Intralipid 1.5 mL/kg bolus then 15 mL/kg/h infusion (max cumulative 12 mL/kg) <InlineRef topicId="clinical-incidents" refLabel="AAGBI LAST 2010" /></>,
              "Accidental awareness (NAP5): risk highest with TIVA + NMB; use processed EEG; debrief and refer for psychological support.",
              "Cannot intubate, cannot oxygenate: declare CICO, call for help, scalpel-bougie-tube cricothyroidotomy without delay.",
            ]}
          />
          <TopicFaqs faqs={clinicalIncidentsFaqs} />

        </>
      }
    />
  );
};

export default ClinicalIncidentsTopic;

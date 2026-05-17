import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { clinicalIncidentsQuestions } from "@/data/quizzes";
import MHPathophysiologyDiagram from "@/components/diagrams/MHPathophysiologyDiagram";
import AnaphylaxisPathophysiologyDiagram from "@/components/diagrams/AnaphylaxisPathophysiologyDiagram";
import { AnaphylaxisCascadeDiagram } from "@/components/diagrams/AnaphylaxisCascadeDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
        { text: "NMBAs cause ~60% of perioperative anaphylaxis (NAP6). Chlorhexidine and antibiotics are next commonest", cites: ["AAGBI 2009"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="anaphylaxis" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
            <CollapsibleSubsection title="Anaphylaxis" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Perioperative anaphylaxis occurs in ~1:10,000 anaesthetics (NAP6). NMBAs are the commonest cause (~60%), followed by antibiotics (especially teicoplanin), chlorhexidine, and patent blue dye.
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

          <ExamSection id="mh" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Malignant Hyperthermia (MH)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Autosomal dominant ryanodine receptor (RYR1) mutation. Triggered by volatile agents and suxamethonium. Incidence ~1:5,000–15,000. Mortality now &lt; 5% with dantrolene.
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

          <ExamSection id="last" exams={[Exam.FINAL, Exam.FFICM]}>
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

          <ExamSection id="awareness" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Accidental Awareness Under Anaesthesia">
            <p className="text-muted-foreground leading-relaxed">
              NAP5 (2014): incidence ~1:19,000. Risk factors: TIVA without BIS, RSI, cardiac surgery, CS under GA, junior anaesthetist, failure to check equipment. Prevention: processed EEG monitoring (BIS 40–60), end-tidal agent monitoring for volatiles, avoid paralysis unless necessary. Management: immediate acknowledgement, psychological support, formal follow-up.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="death-on-table" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Death on the Table">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Intra-operative cardiac arrest occurs in ~5–7 per 10,000 anaesthetics; mortality of intra-operative arrest remains ~30–70% (NAP7, 2023). Most are anticipated in high-risk emergency surgery, but a minority are sudden and unexpected. Management has three parallel strands — <strong>resuscitation</strong>, <strong>communication / governance</strong>, and <strong>aftercare of staff and family</strong>.
              </p>

              <h3 className="text-base font-semibold text-foreground mt-2">1. Immediate clinical management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Call for help early</strong> — declare "cardiac arrest" out loud; activate theatre arrest call; second anaesthetist + ODP/anaesthetic assistant to the head; runner for drugs/blood.</li>
                <li><strong>ALS algorithm adapted to theatre</strong>: turn off volatile/TIVA, FiO₂ 1.0, confirm ETT position with ETCO₂ (a sudden ETCO₂ drop is often the first sign), high-quality CPR — surgeons stop and step back from the field; consider open chest cardiac massage in cardiothoracic / abdominal surgery already opened.</li>
                <li><strong>Reversible causes (4 Hs &amp; 4 Ts) with anaesthesia-specific add-ons</strong>: anaphylaxis (give IM/IV adrenaline early), LAST (Intralipid 20% 1.5 mL/kg bolus + 0.25 mL/kg/min), MH (stop trigger, dantrolene), high spinal, gas embolism, haemorrhage, vagal reflex (e.g. peritoneal traction), tension pneumothorax (especially after CVC, brachial plexus, intercostal block), tamponade.</li>
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

              <h3 className="text-base font-semibold text-foreground mt-3">5. Staff welfare &amp; second-victim support</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Recognise the <strong>"second victim"</strong> phenomenon — anaesthetists, ODPs, scrub teams and surgeons commonly suffer acute stress, sleep disturbance, intrusive recollection and loss of confidence.</li>
                <li>Offer <strong>structured peer support</strong> (e.g. AAGBI/Royal College mentor, TRiM, occupational health). Avoid mandatory single-session psychological debriefing — evidence suggests it does not reduce PTSD.</li>
                <li>Consider time off from clinical duties; do not allow the involved anaesthetist to be the sole clinician for the next case.</li>
                <li>Provide ongoing follow-up — anniversary of the event, inquest preparation, Coroner's hearing support, GMC/legal advice via the medical defence organisation.</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground mt-3">Key references</h3>
              <p className="text-sm">
                NAP7 (RCoA, 2023) — Peri-operative Cardiac Arrest; AAGBI Quick Reference Handbook (QRH 3-1 cardiac arrest, 3-2 anaphylaxis, 3-10 LAST); CQC Duty of Candour (Reg 20, 2014); Coroners and Justice Act 2009; NHS Patient Safety Incident Response Framework (2022); RCoA Wellbeing Resource Pack.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Anaphylaxis (NAP6): NMBDs, antibiotics and chlorhexidine top the list — adrenaline IM 0.5 mg first line; mast-cell tryptase at 1, 4 and 24 h.",
              "Malignant hyperthermia: stop trigger, hyperventilate 100% O₂ high flows, dantrolene 2.5 mg/kg repeated to 10 mg/kg, cool, treat hyperkalaemia.",
              "LAST: stop injection, ABC, manage seizures, 20% Intralipid 1.5 mL/kg bolus + 0.25 mL/kg/min infusion (AAGBI).",
              "Accidental awareness (NAP5): risk highest with TIVA + NMB; use processed EEG; debrief and refer for psychological support.",
              "Cannot intubate, cannot oxygenate: declare CICO, call for help, scalpel-bougie-tube cricothyroidotomy without delay.",
            ]}
          />
        </>
      }
    />
  );
};

export default ClinicalIncidentsTopic;

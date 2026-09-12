import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { interventionalRadiologyQuestions } from "@/data/quizzes";
import ContrastReactionDiagram from "@/components/diagrams/clinical/ContrastReactionDiagram";
import tipssIllustration from "@/assets/ir/tipss-procedure.jpg";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const interventionalRadiologyFaqs: Array<[string, string]> = [
  [
    "What are the AAGBI recommendations for anaesthesia in remote locations?",
    "Same standards as theatre: trained anaesthetic assistant, full monitoring including capnography, anaesthetic machine checked, reliable suction and oxygen, emergency drugs and difficult-airway equipment immediately available, two-way communication with the main theatre suite, and a clear plan for transfer if deterioration occurs."
  ],
  [
    "How is contrast-induced nephropathy prevented in IR patients?",
    "Identify at-risk patients (eGFR <60, diabetes, dehydration, NSAIDs, ACEi). Use the lowest volume of iso- or low-osmolar contrast, pre- and post-procedure IV 0.9 % saline 1 mL/kg/h for 6–12 h, withhold metformin for 48 h if eGFR <30, avoid nephrotoxins, and recheck creatinine at 48–72 h. N-acetylcysteine evidence is weak — no longer routinely recommended."
  ],
  [
    "What are the anaesthetic considerations for endovascular thrombectomy in acute stroke?",
    "Speed is critical — door-to-puncture <90 min. Conscious sedation is preferred over general anaesthesia where feasible (faster, better functional outcomes in some trials), but GA is needed for agitation or airway risk. Maintain SBP 140–180 mmHg pre-recanalisation and avoid hypotension; tight glycaemic control 6–10 mmol/L; normocapnia; immediate post-procedure neuro-imaging."
  ]
];

const objectives = [
  "Apply AAGBI standards for anaesthesia in remote locations to the IR suite",
  "Recognise and manage iodinated contrast reactions and CI-AKI",
  "Apply ALARA principles for radiation protection",
  "Plan anaesthesia for TIPSS, embolisation for haemorrhage and EVAR",
  "Deliver safe sedation with mandatory capnography for IR procedures",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Suspected contrast anaphylaxis during CT angiography",
    scenario:
      "Three minutes after IV iodinated contrast, an awake patient develops widespread urticaria, wheeze and BP 70/40. How do you manage this?",
    working:
      "Recognise as severe (anaphylactoid) contrast reaction. Stop the contrast. Call for help, ABCDE.\nGive 100% O₂ via face mask, lay flat with legs raised.\nIM adrenaline 0.5 mg (500 μg) into anterolateral thigh, repeat every 5 min as needed; or IV 50 μg titrated boluses if monitored.\nIV fluid bolus 500–1000 ml crystalloid; nebulised salbutamol for wheeze.\nSecondary: chlorphenamine 10 mg IV, hydrocortisone 200 mg IV; mast cell tryptase samples (immediate, 1–2 h, 24 h).\nTransfer to a monitored area — biphasic reactions occur in up to 20%.",
    answer:
      "Treat as anaphylaxis: stop contrast, ABCDE with 100% O₂, IM adrenaline 0.5 mg, IV fluid bolus, nebulised salbutamol, then chlorphenamine + hydrocortisone, tryptase samples, and post-event monitoring for biphasic reaction.",
    cites: ["AAGBI Remote Sites 2023"],
  },
  {
    title: "Preventing CI-AKI before TIPSS",
    scenario:
      "A 65-year-old man with cirrhosis (eGFR 38) is listed for TIPSS. How do you reduce his risk of contrast-induced AKI?",
    working:
      "Identify high risk: eGFR <60, diabetes, hypovolaemia, large contrast load. Stop nephrotoxins (NSAIDs, ACEi/ARB if appropriate, metformin).\nIV 0.9% NaCl 1 ml/kg/h for 12 h pre and 12 h post procedure (or sodium bicarbonate 1.4% as alternative).\nUse iso-osmolar or low-osmolar non-ionic contrast at the smallest effective volume; avoid repeat contrast within 48 h.\nN-acetylcysteine is no longer routinely recommended.\nMonitor creatinine at 48–72 h.",
    answer:
      "IV crystalloid hydration 1 ml/kg/h for 12 h pre and post, withhold nephrotoxins, use the lowest effective volume of low-osmolar contrast, and recheck creatinine at 48–72 h. NAC is not routinely indicated.",
    cites: ["ACR Sedation 2017"],
  },
];

const InterventionalRadiologyTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthesia for Interventional Radiology"
      subtitle="Remote location anaesthesia, contrast reactions, radiation safety, and procedure-specific considerations"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="interventional-radiology"
      topicTitle="Anaesthesia for Interventional Radiology"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={interventionalRadiologyQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "AAGBI Remote Sites 2023",
          "ESUR 2011",
          "ACR Sedation 2017",
        ],
        keyPoints: [
          "AAGBI Remote Sites 2023",
          "ESUR 2011",
          "ACR Sedation 2017",
        ],
        workedExamples: ["AAGBI Remote Sites 2023", "ACR Sedation 2017"],
      }}
      keyPoints={[
        { text: "IR suites are remote locations — apply AAGBI standards: full equipment, monitoring, capnography and trained assistance", cites: ["ESUR 2011"] },
        { text: "Iodinated contrast can cause anaphylactoid reactions, CI-AKI and thyroid storm — pre-hydrate high-risk patients", cites: ["AAGBI Remote Sites 2023"] },
        { text: "Radiation: ALARA — distance (inverse-square law), shielding (lead, thyroid, glasses), time, dosimetry", cites: ["ACR Sedation 2017"] },
        { text: "TIPSS, embolisation for haemorrhage and EVAR carry significant haemodynamic risk and often need GA + invasive monitoring", cites: ["ESUR 2011"] },
        { text: "Capnography is mandatory for moderate/deep sedation (NAP5 / AAGBI)", cites: ["AAGBI Remote Sites 2023"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="remote-location" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Remote Location Anaesthesia" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              IR suites present unique challenges: unfamiliar environment, limited access to the patient (often within a C-arm), restricted space, and reduced staffing. The <strong className="text-foreground">AAGBI guidelines for anaesthesia outside the operating theatre</strong> mandate the same standards of monitoring, equipment, and assistance.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Essential Preparations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Self-inflating bag, oxygen supply, suction, and full airway equipment including difficult-airway trolley</li>
                <li>Standard monitoring: ECG, SpO₂, NIBP, capnography (mandatory for sedation), temperature</li>
                <li>Invasive monitoring (arterial line, CVC) for major procedures — TIPSS, embolisation, stent-grafting</li>
                <li>Dedicated anaesthetic assistant; agreed plan for emergency transfer to theatre/ICU</li>
                <li>MRI-conditional equipment if required (some hybrid suites)</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="mri-anaesthesia" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Anaesthesia in the MRI Suite">
            <p className="text-muted-foreground leading-relaxed mb-3">
              MRI anaesthesia carries hazards distinct from other IR settings, governed by <InlineRef topicId="interventional-radiology" refLabel="Assoc Anaesth MRI 2021" />. The scanner room is divided into <strong className="text-foreground">four zones</strong> with progressively restricted access, from Zone 1 (public) through Zone 4 (the scanner room itself), and only appropriately screened and trained staff should enter Zone 3/4.
            </p>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Static Field Hazards</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Projectile effect</strong> — ferromagnetic objects (oxygen cylinders, laryngoscopes, drug trolleys) can be violently attracted into the bore</li>
                <li>Torque and heating of ferromagnetic implants (aneurysm clips, some prostheses)</li>
                <li>Device malfunction in pacemakers, ICDs and neurostimulators — reprogramming, inappropriate pacing/shock, or inhibition</li>
                <li>Any implanted device must be checked as MR-conditional and scanned within its approved conditions before entry</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">RF and Gradient Hazards</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Radiofrequency energy causes tissue and lead heating — risk of skin and internal burns, particularly from looped cables, ECG leads or monitoring wires forming conductive loops</li>
                <li>Gradient coil switching produces loud acoustic noise — ear protection is mandatory for patient and staff</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Equipment Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>MR-conditional anaesthetic machine, monitors and syringe pumps sited within the approved field strength</li>
                <li>Long breathing circuits and extended infusion/monitoring lines running from Zone 3 equipment through a waveguide</li>
                <li>Non-ferrous laryngoscopes and aluminium/non-ferromagnetic gas cylinders only</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Monitoring Challenges</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>ECG shows spike and T-wave artefact from gradient switching and the magnetohydrodynamic effect on flowing blood</li>
                <li>Pulse oximetry is prone to interference and burn risk — use fibre-optic probes routed without loops</li>
                <li>Capnography has a lag due to long sampling lines</li>
                <li>Limited patient access and direct visualisation once inside the bore</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Emergency Planning</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>A rehearsed cardiac arrest protocol with immediate removal of the patient from Zone 4 to a designated resuscitation area outside the field</li>
                <li>No ferromagnetic resuscitation equipment is taken into the scanner room</li>
                <li><strong className="text-foreground">Quench</strong> (rapid loss of superconductivity, releasing helium gas) risks room asphyxia, cryogenic burns and a rapid pressure rise — know the location of the emergency quench button and door release</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="contrast" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Contrast Media Reactions">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <ContrastReactionDiagram />
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Iodinated Contrast Reactions</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Mild</strong> — urticaria, pruritus, nausea (no treatment or antihistamine)</li>
                <li><strong className="text-foreground">Moderate</strong> — bronchospasm, facial oedema, significant hypotension (adrenaline, IV fluids, bronchodilators)</li>
                <li><strong className="text-foreground">Severe</strong> — anaphylaxis, cardiovascular collapse, laryngeal oedema (full ABCDE, IM/IV adrenaline)</li>
                <li>Most reactions are <strong className="text-foreground">anaphylactoid</strong> (non-IgE-mediated) — direct histamine release and complement activation</li>
                <li>Risk factors: previous contrast reaction (5× risk), asthma, atopy, renal impairment</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Contrast-Induced AKI (CI-AKI)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Rise in creatinine ≥25% or ≥44 μmol/L within 72 h of contrast</li>
                <li>Risk factors: pre-existing CKD (eGFR &lt;30), diabetes, dehydration, nephrotoxic drugs, large contrast volume</li>
                <li>Prevention: IV hydration (NaCl 0.9% 1 ml/kg/h for 12 h pre and post), iso-/low-osmolar contrast, minimise volume</li>
                <li>N-acetylcysteine is no longer routinely recommended</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="radiation" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Radiation Safety">
            <p className="text-muted-foreground leading-relaxed mb-3">
              All staff in the IR suite are exposed to ionising radiation. The <strong className="text-foreground">ALARA principle</strong> (As Low As Reasonably Achievable) guides practice, underpinned in the UK by <InlineRef topicId="interventional-radiology" refLabel="IR(ME)R 2017" /> which sets out duties for employers, referrers and practitioners in medical exposures.
            </p>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Stochastic vs Deterministic Effects</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Stochastic effects</strong> — no threshold dose; probability (not severity) rises with dose — malignancy, heritable genetic effects</li>
                <li><strong className="text-foreground">Deterministic effects</strong> — require a threshold dose to be exceeded, then severity increases with dose — erythema and skin burns, epilation, cataract, tissue necrosis</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Sources of Exposure</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Primary beam</strong> — direct exposure from the X-ray tube, highest intensity</li>
                <li><strong className="text-foreground">Scatter</strong> — the dominant source of staff exposure, arising from the patient; greatest on the X-ray tube side of the table (versus the image-intensifier side)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Staff Dose Reduction</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Distance</strong> — inverse square law: doubling distance reduces exposure by 75%; stand on the image-intensifier side, step back during acquisitions, use remote contrast injectors</li>
                <li><strong className="text-foreground">Shielding</strong> — ceiling-suspended lead screens, table-mounted lead skirts, lead aprons (0.35–0.5 mm lead-equivalent), thyroid shield, lead glasses</li>
                <li><strong className="text-foreground">Monitoring</strong> — personal dosimeter badges; annual dose limit 20 mSv/year for classified workers; pregnancy must be declared promptly with a reduced fetal dose limit applied</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Patient Dose Reduction</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Pulsed rather than continuous fluoroscopy; low-dose modes and last-image-hold</li>
                <li>Tight collimation of the beam; avoid unnecessary magnification (magnification markedly increases dose)</li>
                <li>Keep the image intensifier as close to the patient as possible; minimise total screening time</li>
                <li>Record dose-area product (DAP) and compare against diagnostic reference levels (DRLs)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Units</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Absorbed dose</strong> — gray (Gy), energy deposited per unit mass</li>
                <li><strong className="text-foreground">Equivalent and effective dose</strong> — sievert (Sv), weighted for radiation type and tissue sensitivity</li>
                <li><strong className="text-foreground">Dose-area product</strong> — gray·centimetres² (Gy·cm²), reflecting both dose and exposed area</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="procedure-specific" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Procedure-Specific Considerations">
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">TIPSS</h3>
              <figure className="my-3">
                <img
                  src={tipssIllustration}
                  alt="Anatomical illustration of a TIPSS procedure: catheter via right internal jugular vein → SVC → right atrium → IVC → right hepatic vein, with a covered metallic stent traversing the cirrhotic liver to the right portal vein, diverting portal blood into the systemic circulation. Splenomegaly and oesophageal varices shown as features of portal hypertension."
                  width={1536}
                  height={1024}
                  loading="lazy"
                  className="w-full h-auto rounded-lg border border-border"
                />
                <figcaption className="text-xs text-muted-foreground mt-2 text-center">
                  TIPSS — a covered stent is placed transjugularly between a hepatic vein and the portal vein, decompressing the portal system and bypassing the cirrhotic liver.
                </figcaption>
              </figure>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Patients often have decompensated cirrhosis — coagulopathy, thrombocytopaenia, ascites, encephalopathy</li>
                <li>Usually GA or deep sedation with invasive monitoring</li>
                <li>Risk of hepatic capsule perforation, haemoperitoneum, arrhythmias (guidewire through hepatic vein/IVC/RA)</li>
                <li>Post-procedure: worsening hepatic encephalopathy (portal blood now bypasses the liver)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Embolisation for Haemorrhage</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Emergency setting — patient may be unstable; resuscitation simultaneous with procedure</li>
                <li>Common indications: pelvic fracture bleeding, postpartum haemorrhage, GI bleeding, trauma</li>
                <li>GA often required; arterial line, large-bore IV access, crossmatched blood</li>
                <li>Post-embolisation syndrome: pain, fever, nausea — common and self-limiting</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">EVAR (Endovascular Aortic Repair)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Elective EVAR: may be performed under local/regional anaesthesia with sedation</li>
                <li>Emergency ruptured AAA: GA with invasive monitoring, cell salvage, massive transfusion protocol</li>
                <li>Permissive hypotension (systolic 70–80 mmHg) until aortic balloon/stent deployed</li>
                <li>Complications: endoleak, renal artery occlusion, limb ischaemia, contrast nephropathy</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Interventional Neuroradiology</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Anaesthesia for endovascular neurointervention requires close cooperation with the neuroradiologist, per <InlineRef topicId="interventional-radiology" refLabel="Anesthesiol Clin 2012 (INR)" />.
              </p>
              <h4 className="font-medium text-foreground mt-3 mb-1 text-sm">Aneurysm Coiling</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>GA versus conscious sedation — GA gives absolute immobility for precise coil deployment, but limits neurological monitoring</li>
                <li>Tight blood pressure control throughout; heparinisation with activated clotting time (ACT) monitoring once access is achieved</li>
                <li>Adenosine-induced transient flow arrest, or controlled hypotension, may be used to aid deployment in wide-necked or complex aneurysms</li>
                <li>Intraprocedural rupture: reverse heparin with protamine, control ICP, mannitol/hypertonic saline, prepare for EVD, deepen anaesthesia and support rapid coil deployment to seal the rupture; plan for urgent CT and ICU admission</li>
                <li>Post-procedure vasospasm managed with nimodipine, maintaining euvolaemia, with intra-arterial vasodilators considered for refractory cases</li>
              </ul>
              <h4 className="font-medium text-foreground mt-3 mb-1 text-sm">AVM Embolisation</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Usually performed under GA for immobility during glue or Onyx embolisation</li>
                <li>Risk of normal perfusion pressure breakthrough — sudden redistribution of flow into previously hypoperfused adjacent brain causing oedema and haemorrhage</li>
                <li>Large AVMs are often treated in staged procedures; controlled blood pressure and a smooth, controlled emergence minimise haemorrhage risk</li>
                <li>Provocative testing and awake mapping may be needed where eloquent cortex is at risk, requiring a sedation technique compatible with neurological testing</li>
              </ul>
              <h4 className="font-medium text-foreground mt-3 mb-1 text-sm">Carotid Artery Stenting</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Typically local anaesthesia/sedation with invasive arterial monitoring, allowing continuous neurological assessment</li>
                <li>Carotid sinus stimulation during balloon angioplasty/stent deployment causes bradycardia and hypotension — have atropine or glycopyrronium prepared</li>
                <li>Risk of distal embolisation and stroke — mitigated with cerebral protection devices</li>
                <li>Watch for post-procedure hyperperfusion syndrome — strict blood pressure targets and close postoperative neurological observation are required</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sedation" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Sedation for IR Procedures">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Many IR procedures performed under LA with <strong className="text-foreground">conscious sedation</strong> (midazolam ± fentanyl)</li>
                <li><strong className="text-foreground">Capnography is mandatory</strong> for moderate and deep sedation (NAP5, AAGBI)</li>
                <li>Target-controlled infusion of propofol ± remifentanil for deep sedation/GA</li>
                <li>Patient may need to lie flat for prolonged periods — comfort, analgesia and bladder management</li>
                <li>Breath-hold for angiography — coordinate with radiologist; consider apnoeic oxygenation under GA</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Remote-site anaesthesia: same standards of monitoring, equipment, drug availability and trained help as theatre.",
              "Iodinated contrast reactions: pretreat high-risk (previous reaction, asthma); treat anaphylaxis with adrenaline 0.5 mg IM.",
              "Contrast-induced nephropathy: hydrate, minimise contrast volume, hold ACEi/ARB/NSAIDs/metformin around the procedure.",
              "Radiation safety (ALARA): distance, lead aprons + thyroid shield, dosimeter, leave room during DSA runs where possible.",
              "EVAR / TIPSS / embolisation: long supine cases — pressure care, temperature management, plan post-procedure HDU bed.",
            ]}
          />
          <TopicFaqs faqs={interventionalRadiologyFaqs} />

        </>
      }
    />
  );
};

export default InterventionalRadiologyTopic;

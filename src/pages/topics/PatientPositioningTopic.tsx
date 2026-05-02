import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { patientPositioningQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import {
  SupinePositionDiagram,
  TrendelenburgPositionDiagram,
  LithotomyPositionDiagram,
  LateralPositionDiagram,
  PronePositionDiagram,
  ProneFaceProtectionDiagram,
  ProneFrameComparisonDiagram,
  MayfieldPinSitingDiagram,
  ParkBenchPositionDiagram,
  ParkBenchDetailedDiagram,
  SittingPositionDiagram,
  SittingPositionDetailedDiagram,
  BeachChairPositionDiagram,
} from "@/components/diagrams/PatientPositioningDiagrams";
import {
  SittingHydrostaticAnimation,
  VAEDetectionLadderAnimation,
  ParkBenchArmTractionAnimation,
  ProneIVCFreeAbdomenAnimation,
  PeronealNerveLithotomyAnimation,
} from "@/components/diagrams/PatientPositioningMechanisms";

const objectives = [
  "Describe the principal surgical positions (supine, Trendelenburg, lithotomy, lateral, prone, park bench, sitting, beach chair) and their physiological consequences",
  "List the operating tables and frames available for prone surgery (Wilson, Jackson, Montreal/Relton-Hall, standard table with bolsters) and choose the appropriate frame for the procedure",
  "Outline neurosurgical positioning (park bench and sitting) including head fixation, monitoring requirements and the management of venous air embolism",
  "Identify the pressure points and peripheral-nerve injuries associated with each position and the strategies used to prevent them",
  "Match common surgical procedures to the appropriate operating position",
  "Manage cardiovascular, respiratory, ophthalmic and airway complications related to patient positioning",
];

const PatientPositioningTopic = () => {
  return (
    <TopicTemplate
      title="Patient Positioning in Anaesthesia"
      subtitle="Surgical positions, dedicated operating tables, neurosurgical positioning and prevention of position-related complications"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="patient-positioning"
      topicTitle="Patient Positioning in Anaesthesia"
      objectives={objectives}
      quizQuestions={patientPositioningQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      keyPoints={[
        "Anaesthetist owns positioning shared with the surgical team — document position, padding, eye care and pulses checked AFTER every move.",
        "Ulnar neuropathy at the elbow is the commonest peripheral nerve injury after general anaesthesia (~28% of all anaesthesia-related nerve claims). Supinate the forearm and pad the medial epicondyle.",
        "Brachial plexus injury — abduct arms <90°, externally rotate, avoid shoulder braces on the AC joint in steep Trendelenburg.",
        "Common peroneal nerve at the fibular head is the commonest stirrup-related injury (lithotomy / lateral) → foot drop.",
        "Well-leg compartment syndrome risk rises sharply after 4 h in stirrups — consider lowering legs every 2 h on long Lloyd-Davies cases.",
        "Prone position must keep the abdomen FREE — abdominal compression ↑ IAP → ↓ venous return, ↑ epidural venous engorgement and ↑ surgical bleeding.",
        "Post-operative visual loss (POVL) is associated with prone spine surgery (>6 h, large blood loss) and steep Trendelenburg robotic surgery — keep head neutral or above heart, avoid direct globe pressure, maintain MAP.",
        "Sitting and beach-chair positions: ZERO the arterial transducer at the EXTERNAL AUDITORY MEATUS (Circle of Willis) — MAP measured at the heart overestimates cerebral pressure by 12–20 mmHg.",
        "Sitting position has a 25–45% incidence of venous air embolism — screen for PFO pre-op, use precordial Doppler/TOE, EtCO₂/EtN₂, multi-orifice CVC at SVC-RA junction.",
        "ETT migrates ~2 cm caudally on prone repositioning — re-confirm position and bilateral air entry after every turn; use a reinforced (armoured) tube.",
      ]}
      coreConcepts={
        <>
          <ExamSection id="principles" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Principles of Safe Positioning</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Patient positioning is a shared responsibility between the surgical and anaesthetic teams, but the
              anaesthetist owns the protection of pressure points, eyes, peripheral nerves, the airway and
              haemodynamics during and after every move. The four governing principles are:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li><strong>Maintain physiological neutrality</strong> — joints in mid-range, spine aligned, no extreme flexion/extension/rotation, no traction on nerves.</li>
              <li><strong>Distribute pressure</strong> — gel pads, foam, fluidised positioners; no skin-on-metal, no IV lines or ECG electrodes under the patient, heels floated.</li>
              <li><strong>Protect the eyes and airway</strong> — lubricate and tape eyes (or use ProneView for prone), confirm ETT position and bilateral air entry after every move, plan for facial / airway oedema in prolonged head-down or prone cases.</li>
              <li><strong>Anticipate and monitor the haemodynamic shift</strong> — preload swings on tilt, V/Q mismatch on lateral, cerebral hypoperfusion sitting/beach-chair, IVC compression prone.</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed mt-3 text-sm">
              Document position, padding, monitoring re-check and pulses in the anaesthetic record after every position change.
              The AAGBI / Association of Anaesthetists guideline <em>Peri-operative care of the patient (positioning) 2018</em>
              and the ASA Practice Advisory on Perioperative Visual Loss are the standard references.
            </p>
          </ExamSection>

          <ExamSection id="supine" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Supine Position</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The default surgical position. Despite being the “simplest”, it generates the largest absolute number of
              ulnar and brachial plexus injuries by sheer volume. Variants include arms abducted on arm-boards
              (&lt; 90°), arms tucked at the sides, and the “cross-over” / “crucifix” for cardiac surgery.
            </p>
            <SupinePositionDiagram />
          </ExamSection>

          <ExamSection id="trendelenburg" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Trendelenburg & Reverse Trendelenburg</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Whole-table head-down (Trendelenburg) is used for pelvic access (laparoscopic / robotic prostatectomy,
              colorectal, gynaecology). Robotic prostatectomy may use 25–40° tilt for several hours — the major
              concerns are raised IOP/ICP, post-operative visual loss, facial / laryngeal oedema and patient slipping.
              Reverse Trendelenburg (head-up) is used for upper-abdominal and laparoscopic gastric / bariatric work.
            </p>
            <TrendelenburgPositionDiagram />
          </ExamSection>

          <ExamSection id="lithotomy" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Lithotomy & Lloyd-Davies</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Hips and knees flexed in stirrups (Allen / Yellofin boots are the modern standard; older candy-cane
              stirrups concentrate pressure on the lateral knee). Lloyd-Davies is a less-flexed variant for combined
              abdominal and perineal access (anterior resection, abdomino-perineal excision). Both legs MUST be raised
              and lowered simultaneously to avoid pelvic torsion and lumbar strain.
            </p>
            <LithotomyPositionDiagram />
            <PeronealNerveLithotomyAnimation />
          </ExamSection>

          <ExamSection id="lateral" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Lateral Decubitus</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Patient on their side, dependent leg flexed, upper leg straight on a pillow, axillary roll under the
              chest <em>caudal</em> to the axilla (not <em>in</em> the axilla). The “kidney rest” + table break
              opens the costo-iliac space for renal surgery. Anaesthetised + paralysed + open chest creates
              significant V/Q mismatch (ventilation to non-dependent compliant lung; perfusion to dependent lung).
            </p>
            <LateralPositionDiagram />
          </ExamSection>

          <ExamSection id="prone" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Prone Position & Operating Tables / Frames</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The prone patient must have a free abdomen (to keep IVC pressure and epidural venous bleeding low),
              chest and pelvis supported, neutral cervical spine, eyes free of pressure and the ETT re-checked.
              Several dedicated frames exist; the choice trades off lordosis, abdominal decompression, fluoroscopy
              access and turning logistics.
            </p>
            <PronePositionDiagram />
            <ProneFaceProtectionDiagram />
            <ProneFrameComparisonDiagram />
            <ProneIVCFreeAbdomenAnimation />
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              <strong>Turning to prone</strong> is a high-risk moment: a minimum of five trained staff, anaesthetist at
              the head controlling the airway, all monitoring disconnected from the patient side and reconnected once
              prone, eye care reapplied, ETT taped securely (consider switching to an armoured tube before turning),
              and bilateral air entry / EtCO₂ / SpO₂ confirmed before the surgeon scrubs.
            </p>
          </ExamSection>

          <ExamSection id="neuro-positioning" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Positioning for Neuroanaesthesia</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Neurosurgical positioning is dictated by the lesion: <strong>supratentorial</strong> tumours are usually
              done supine with a head turn; <strong>posterior fossa, cerebellopontine angle, vestibular schwannoma,
              microvascular decompression and foramen magnum</strong> work uses park-bench, sitting or prone.
              Cervical-spine surgery uses supine (anterior cervical discectomy) or prone (posterior approach).
              All of these typically use 3-pin Mayfield head fixation — anticipate the hypertensive response (treat
              with remifentanil bolus, lidocaine or LA infiltration).
            </p>

            <h3 className="text-lg font-bold text-foreground mt-4 mb-2">Park-bench position</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              A modified lateral with the patient at the edge of the table and the dependent arm allowed to hang in a
              padded sling — this <em>avoids</em> axillary compression. The head is pinned and rotated towards the
              floor for posterior-fossa / CPA access. Less VAE risk than full sitting and easier to set up; more
              limited surgical exposure than sitting.
            </p>
            <ParkBenchPositionDiagram />
            <ParkBenchDetailedDiagram />
            <ParkBenchArmTractionAnimation />

            <h3 className="text-lg font-bold text-foreground mt-4 mb-2">Sitting position</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Trunk semi-upright (~60°), head flexed and pinned, knees flexed and elevated to heart level. Gives
              excellent surgical exposure of the posterior fossa and a bloodless field but carries the highest VAE
              risk of any neurosurgical position (25–45 %). <strong>Pre-op screen for PFO with bubble echo</strong> —
              a positive PFO is a relative contraindication because of paradoxical air embolism.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
              <li>Mandatory monitoring: precordial Doppler ± TOE, EtCO₂, EtN₂, invasive arterial line zeroed at the external auditory meatus, multi-orifice CVC at the SVC-RA junction.</li>
              <li>Avoid N₂O (expands intracranial air; converts micro-emboli into clinically significant VAE).</li>
              <li>VAE management: alert surgeon to flood field with saline + apply bone wax, jugular venous compression, aspirate from CVC, FiO₂ 1.0, position patient left lateral / head-down if able, supportive haemodynamics.</li>
            </ul>
            <SittingPositionDiagram />
            <SittingPositionDetailedDiagram />
            <SittingHydrostaticAnimation />
            <VAEDetectionLadderAnimation />

            <h3 className="text-lg font-bold text-foreground mt-4 mb-2">Beach-chair position (shoulder surgery)</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              A modified Fowler's at ~30–45° used for shoulder arthroscopy and open shoulder surgery. VAE risk is
              lower than full sitting but cerebral perfusion is the headline concern: the anaesthetist's transducer
              must be zeroed at the tragus, not at the heart, and intra-operative hypotension must be treated promptly.
            </p>
            <BeachChairPositionDiagram />
          </ExamSection>

          <ExamSection id="complications" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Position-Related Complications — Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">System</th>
                    <th className="text-left py-2 text-foreground font-semibold">Complication</th>
                    <th className="text-left py-2 text-foreground font-semibold">Worst-offender position</th>
                    <th className="text-left py-2 text-foreground font-semibold">Mitigation</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Nerve</td><td>Ulnar neuropathy</td><td>Supine (arms tucked, pronated)</td><td>Supinate forearm, pad medial epicondyle</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Nerve</td><td>Brachial plexopathy</td><td>Steep Trendelenburg + shoulder braces; lateral</td><td>Abduct &lt; 90°, axillary roll caudal to axilla, brace on lateral clavicle only</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Nerve</td><td>Common peroneal (foot drop)</td><td>Lithotomy, lateral</td><td>Pad fibular head, boot-style stirrups</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Eye</td><td>POVL (ION / CRAO)</td><td>Prone spine (&gt; 6 h), steep Trendelenburg robotic</td><td>Head neutral / above heart, no globe pressure, MAP &gt; 70, document eye check 15-min</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CVS</td><td>Cerebral hypoperfusion / stroke</td><td>Sitting, beach-chair</td><td>Zero arterial line at tragus, treat hypotension</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CVS</td><td>Venous air embolism</td><td>Sitting (25–45 %), park-bench, posterior craniotomy</td><td>Doppler / TOE, EtN₂, CVC at SVC-RA, avoid N₂O</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Resp</td><td>↓ FRC, atelectasis, ↑ shunt</td><td>Trendelenburg, prone, lateral (anaesthetised)</td><td>PEEP, recruitment, lung-protective ventilation</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Airway</td><td>ETT migration / endobronchial</td><td>Prone, sitting, beach chair</td><td>Re-check after every move, armoured tube, tape securely</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Airway</td><td>Macroglossia / supraglottic oedema</td><td>Prolonged sitting, steep Trendelenburg</td><td>Limit duration, cuff-leak test, plan delayed extubation</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Vascular</td><td>Well-leg compartment syndrome</td><td>Lithotomy / Lloyd-Davies &gt; 4 h</td><td>Lower legs every 2 h, avoid hypotension</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Skin</td><td>Pressure ulcer</td><td>Any prolonged position</td><td>Pressure-redistributing surface, float heels, reposition padding</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="procedures-by-position" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Common Procedures by Position</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { p: "Supine", s: "General / vascular / breast / urology (open), upper-limb orthopaedics, cardiac (with arms out), most ENT, ophthalmic, dental, trauma laparotomy" },
                { p: "Trendelenburg", s: "Robotic / laparoscopic prostatectomy, gynaecology, lower colorectal; central-line insertion (auto-transfusion + dilated central veins)" },
                { p: "Reverse Trendelenburg", s: "Laparoscopic upper GI, bariatric (sleeve / bypass), laparoscopic cholecystectomy, head & neck surgery (drains the surgical field)" },
                { p: "Lithotomy", s: "Cystoscopy, TURP / TURBT, vaginal hysterectomy, anorectal surgery, EUA" },
                { p: "Lloyd-Davies", s: "Anterior resection, abdomino-perineal excision (combined abdominal + perineal access)" },
                { p: "Lateral decubitus", s: "Thoracotomy, oesophagectomy, nephrectomy, hip arthroplasty, retroperitoneal procedures" },
                { p: "Prone (Wilson frame)", s: "Lumbar microdiscectomy, single-level decompression" },
                { p: "Prone (Jackson table)", s: "Multi-level posterior spinal fusion, scoliosis instrumentation" },
                { p: "Prone (Montreal / Relton-Hall)", s: "Paediatric and adolescent posterior spinal surgery" },
                { p: "Prone (bolsters)", s: "Posterior fossa craniotomy, PCNL, pilonidal / posterior fistula surgery, ICU prone ventilation in ARDS" },
                { p: "Park-bench", s: "Posterior-fossa tumours, vestibular schwannoma / CPA, microvascular decompression, foramen magnum decompression" },
                { p: "Sitting", s: "Posterior-fossa tumours (excellent exposure, dry field), cervical spine (posterior or anterior)" },
                { p: "Beach-chair", s: "Shoulder arthroscopy, rotator-cuff repair, open shoulder reconstruction" },
              ].map((row) => (
                <div key={row.p} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{row.p}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{row.s}</p>
                </div>
              ))}
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default PatientPositioningTopic;

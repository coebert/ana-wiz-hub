import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { ExamSection } from "@/components/exam/ExamSection";
import { DiagramSection } from "@/components/topic/DiagramSection";
import {
  VascularAccessDevicesDiagram,
  VascularAccessCrossSectionDiagram,
} from "@/components/diagrams/perioperative/VascularAccessDevicesDiagram";
import { VascularAccessTypesDiagram } from "@/components/diagrams/perioperative/VascularAccessTypesDiagram";
import { DwellTimeInfographic } from "@/components/diagrams/perioperative/DwellTimeInfographic";
import { vascularAccessDevicesQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { InlineRef } from "@/components/references/InlineRef";

const VascularAccessDevicesTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Choosing vascular access for prolonged chemotherapy",
    scenario: "A 55-year-old needs 6 months of cyclical chemotherapy with intermittent blood sampling. Compare PICC, tunnelled cuffed Hickman, and a totally implantable port — which is best?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Map the requirement: intermittent (not continuous), 6 months, vesicant drug, home discharge</li>
          <li>PICC: easy bedside insertion, high thrombosis rate (5–10%), unsuitable for swimming/showering long-term</li>
          <li>Tunnelled cuffed Hickman: external lumens, requires regular flushing and dressing; better for continuous infusion (TPN, induction chemo)</li>
          <li>Totally implantable port: subcutaneous reservoir accessed by Huber needle, low infection rate (&lt;0.2 per 1000 catheter-days), allows normal activity — best for intermittent long-term therapy</li>
          <li>Insert under ultrasound guidance, confirm tip at cavo-atrial junction by fluoroscopy or ECG (P-wave maximal then biphasic)</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Avoid subclavian approach with low platelets (non-compressible)</li>
          <li>PICC in lymphoedema-risk arm or planned AV fistula side</li>
          <li>Pinch-off syndrome with subclavian ports between clavicle and first rib</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Implantable port (e.g., Port-a-Cath) — lowest infection risk and best quality of life for cyclical 6-month therapy.",
    cites: ["NICE TA49", "BJA Educ 2016", "KDIGO 2012"],
  },
];

const tocItems = [
  { id: "section-device-overview", label: "Device Overview", group: "Core" },
  { id: "section-classification", label: "Classification", group: "Core" },
  { id: "section-peripheral-cannulae", label: "Peripheral Cannulae", group: "Devices" },
  { id: "section-midline-catheters", label: "Midline Catheters", group: "Devices" },
  { id: "section-picc-lines", label: "PICC Lines", group: "Devices" },
  { id: "section-multi-lumen-cvc", label: "Multi-lumen CVC", group: "Devices" },
  { id: "section-vascath-haemodialysis", label: "Vascath & Haemodialysis", group: "Devices" },
  { id: "section-trauma-lines", label: "Trauma Lines", group: "Devices" },
  { id: "section-swan-ganz-long-term", label: "Swan-Ganz & Long-term Devices", group: "Specialist" },
  { id: "section-cvc-tip-confirmation", label: "CVC Tip Confirmation", group: "Specialist" },
  { id: "section-arterial-lines", label: "Arterial Lines", group: "Specialist" },
  { id: "section-intraosseous-access", label: "Intraosseous Access", group: "Specialist" },
  { id: "section-coagulopathy-anticoagulation", label: "Coagulopathy & Anticoagulation", group: "Specialist" },
  { id: "section-dwell-times-scenarios", label: "Dwell Times & Clinical Scenarios", group: "Evidence" },
];

const vascularAccessFaqs: Array<[string, string]> = [
  ["How is the maximum safe infusion rate for a peripheral cannula determined?", "By Hagen–Poiseuille — flow is proportional to the fourth power of internal radius and inversely proportional to length. A short, wide-bore (16G or 14G) cannula delivers far greater flow than a longer central catheter of equivalent gauge."],
  ["When is a midline preferred over a PICC?", "For peripherally compatible therapies of 1–4 weeks duration (e.g. antibiotics, fluids, non-irritant chemotherapy). Vesicants, parenteral nutrition or hyperosmolar/extreme-pH drugs require a central-tip device such as a PICC or CVC."],
  ["What are the key complications of internal jugular CVC insertion?", "Carotid puncture, pneumothorax (lower than subclavian but not zero), arrhythmias from wire or catheter contact, air embolism, catheter-related bloodstream infection, and late venous stenosis or thrombosis. Ultrasound guidance is mandatory (NICE TA49)."],
];

const VascularAccessDevicesTopic = () => {
  return (
    <TopicTemplate
      title="Vascular Access Devices"
      subtitle="FRCA Primary / Final / FFICM — peripheral cannulae, midlines, PICCs, CVCs, vascaths, trauma lines and Swan-Ganz introducer sheaths"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-perioperative"
      topicId="vascular-access-devices"
      topicTitle="Vascular Access Devices"
      workedExamples={VascularAccessDevicesTopicWorkedExamples}
      quizQuestions={vascularAccessDevicesQuestions}
      objectives={[
        "Classify vascular access devices by tip position (peripheral, midline, central) and explain why this dictates which drugs may be infused safely.",
        "Apply Hagen–Poiseuille flow physics to compare achievable infusion rates of cannulae, CVCs, vascaths and rapid-infusion (trauma) lines.",
        "Recognise the indications for, and complications of, peripheral cannulae, midlines, PICCs, multi-lumen CVCs, haemodialysis catheters, RIC/MAC trauma lines and Swan-Ganz introducer sheaths.",
        "Describe ultrasound-guided central venous access using ANTT and the Seldinger technique, with strategies to avoid arterial puncture, pneumothorax and CRBSI.",
        "Justify a device choice from a typical clinical scenario (e.g. resus, long-term antibiotics, RRT, cardiac surgery).",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "NICE TA49",
          "BJA Educ 2016",
          "KDIGO 2012",
          "epic4 2023",
          "Rickard 2012",
          "3SITES 2015",
          "Cochrane PIVC 2019",
        ],
        keyPoints: [
          "NICE TA49",
          "BJA Educ 2016",
          "KDIGO 2012",
          "epic4 2023",
          "Rickard 2012",
          "3SITES 2015",
          "Cochrane PIVC 2019",
        ],
      }}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />
          <ExamSection id="section-device-overview" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <DiagramSection title="Devices to scale — length and tip position" intro={<p>Catheters compared on a single length axis. Tip position (forearm vein → axillary vein → SVC) determines whether the device is peripheral, midline or central, and therefore which drugs and what flow rates are safe.</p>}>
              <VascularAccessDevicesDiagram />
            </DiagramSection>
            <DiagramSection title="Lumen geometry & flow" intro={<p>End-on cross-sections drawn to scale. Flow ∝ r⁴ / length (Hagen–Poiseuille).</p>}>
              <VascularAccessCrossSectionDiagram />
            </DiagramSection>
            <DiagramSection title="Device archetypes — labelled anatomy & dwell times" intro={<p>Labelled schematics covering peripheral cannula, PICC, non-tunnelled CVC, tunnelled line and implanted port.</p>}>
              <VascularAccessTypesDiagram />
            </DiagramSection>
            <DiagramSection title="Dwell-time approach — clinically indicated vs scheduled" intro={<p>Recommended dwell-time strategy across peripheral, arterial, central, PICC and dialysis access.</p>}>
              <DwellTimeInfographic />
            </DiagramSection>
          </ExamSection>
          <ExamSection id="section-classification" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              How to classify vascular access
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Devices are grouped by where the tip sits, not by where the
              skin entry is. Tip position drives the safe range of drug
              osmolarity, pH and vesicant potential.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Class</th>
                    <th className="text-left py-2 text-foreground font-semibold">Tip lies in</th>
                    <th className="text-left py-2 text-foreground font-semibold">Devices</th>
                    <th className="text-left py-2 text-foreground font-semibold">Safe to infuse</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Peripheral</td>
                    <td>Forearm / hand / ACF vein</td>
                    <td>20 G–14 G cannula</td>
                    <td>Isotonic, non-vesicant, &lt; 600 mOsm/L; short courses (≤ 96 h)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Midline</td>
                    <td>Axillary vein (NOT central)</td>
                    <td>8–20 cm 3–5 Fr midline catheter</td>
                    <td>Same constraints as peripheral; suits 1–4 weeks of antibiotics</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Central (CVAD)</td>
                    <td>SVC / cavo-atrial junction</td>
                    <td>PICC, CVC, vascath, tunnelled Hickman/Permcath, port</td>
                    <td>Vesicants, vasopressors, TPN, hyperosmolar drugs; long-term therapy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="section-peripheral-cannulae" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Peripheral cannulae
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Short, wide, parallel-walled plastic catheter over a
              steel introducer (Seldinger NOT used). ISO gauge colour-codes
              the hub (orange 14 G → grey 16 G → green 18 G → pink 20 G →
              blue 22 G → yellow 24 G). Maximum gravity flow is for water at
              20 °C — viscous fluid (blood, colloid) flows roughly half as
              fast.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Indications</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Induction of anaesthesia, drug administration</li>
                  <li>Maintenance fluids and short-course antibiotics</li>
                  <li>14 G / 16 G — large-volume resuscitation, blood</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Complications</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Phlebitis (Visual Infusion Phlebitis score ≥ 2 → resite)</li>
                  <li>Extravasation — particularly catastrophic for vasopressors</li>
                  <li>Air embolus, sharps injury, infection (CRBSI rare)</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="section-midline-catheters" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Midline catheters
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Inserted by ultrasound-guided Seldinger or modified-Seldinger
              (accelerated Seldinger technique) into a deep upper-arm vein
              (basilic, brachial, cephalic), advanced 8–20 cm so the tip
              sits in the axillary vein. NOT a central line — there is no
              SVC tip. Designed for 1–4 weeks of non-vesicant therapy
              when peripheral access fails.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Caveats:</strong> still
              counts as a peripheral device — do not run vasopressors,
              chemotherapy or TPN; mechanical phlebitis common in the first
              48 h; thrombosis risk higher than peripheral cannulae.
            </p>
          </ExamSection>

          <ExamSection id="section-picc-lines" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              PICC lines
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Peripherally Inserted Central Catheter — long (40–55 cm)
              4–6 Fr silicone or polyurethane catheter inserted under
              ultrasound into the basilic / brachial vein and advanced so
              the tip sits at the cavo-atrial junction (confirmed on chest
              X-ray, ECG-tip location or fluoroscopy). 1–3 lumens; safe for
              weeks to months.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Strengths</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Avoids neck/chest puncture (no pneumothorax risk)</li>
                  <li>Bedside insertion — outpatient antibiotic / chemo</li>
                  <li>Easily removed; lower CRBSI than non-tunnelled CVC</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Weaknesses</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Higher upper-limb DVT rate than tunnelled CVCs</li>
                  <li>Narrow lumens — slow flow, easily occluded</li>
                  <li>Tip migration with arm movement — recheck after insertion</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="section-multi-lumen-cvc" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Multi-lumen central venous catheter (CVC)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Non-tunnelled 7 Fr triple-lumen catheter inserted under
              ultrasound by Seldinger technique into the right internal
              jugular (preferred), subclavian or femoral vein. 16 cm
              standard length (RIJ). Provides reliable access for
              vasopressors, parenteral nutrition, CVP measurement and
              repeated blood sampling.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Lumen role</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Distal (16 G, brown) — CVP transduction, vasopressors, blood draw</li>
                  <li>Medial (18 G, blue) — TPN or single drug</li>
                  <li>Proximal (18 G, white) — boluses, sampling — opens 2–3 cm proximal so opens later if catheter migrates</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Insertion bundles</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Hand hygiene, max barrier precautions, 2% chlorhexidine in 70% alcohol</li>
                  <li>Real-time ultrasound (NICE TA49)</li>
                  <li>Avoid femoral if avoidable; remove as soon as not needed; aseptic dressing change</li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Complications</strong> —
              early: arterial puncture, pneumothorax (subclavian),
              haemothorax, air embolus, arrhythmia, malposition, guidewire
              loss; late: CRBSI, thrombosis, catheter fracture, fibrin
              sheath. Confirm tip position on CXR (above the carina,
              parallel to the SVC) before non-emergency use.
            </p>
          </ExamSection>

          <ExamSection id="section-vascath-haemodialysis" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Vascath / haemodialysis catheter
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Wide-bore (12–14 Fr) twin-lumen central catheter designed
              to support extracorporeal blood-flow rates of 200–400 mL/min
              for renal replacement therapy, plasma exchange or
              ECCO₂R. The two lumens are staggered (5–10 mm apart at the
              tip) to minimise recirculation between the "arterial" outflow
              and "venous" return ports.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sites in order of preference for acute RRT: right internal
              jugular &gt; femoral &gt; left internal jugular &gt;
              subclavian (KDIGO 2012 — subclavian last because of the high
              rate of central venous stenosis that would compromise future
              AV-fistula formation). Locked between sessions with
              heparin or 4% citrate; never used for routine drug or fluid
              administration.
            </p>
          </ExamSection>

          <ExamSection id="section-trauma-lines" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Trauma lines — RIC and MAC
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Designed for one job: deliver warmed blood and crystalloid as
              fast as physically possible.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">RIC — Rapid Infusion Catheter</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Short (6.4 cm) 8.5 Fr single-lumen catheter exchanged over
                  a wire onto an existing 18 G/20 G peripheral cannula.
                  Achievable flow with a pressure bag &gt; 500 mL/min — comparable
                  to a 14 G but in a vein already cannulated.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">MAC — Multi-lumen Access Catheter (introducer)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  9 Fr central introducer with a side-port plus a
                  12 G distal lumen. Typical use: massive transfusion in
                  trauma / obstetric haemorrhage / liver transplant. Side-port
                  for rapid volume; central lumen for vasopressor or PAC
                  passage.
                </p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="section-swan-ganz-long-term" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Swan-Ganz introducer sheath
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              An 8.5–9 Fr percutaneous sheath placed in the right internal
              jugular or subclavian vein, with a haemostatic valve to allow
              passage of a 7.5 Fr pulmonary artery catheter (PAC) or
              transvenous pacing wire while a side-arm permits
              simultaneous fluid administration. Often misnamed "Swan
              sheath" but the sheath is the introducer, not the PAC.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Uses:</strong> cardiac
              surgery (PAC monitoring, pacing wire conduit), unstable ICU
              patients needing continuous CO measurement, suspected
              VAE during sitting neurosurgery (aspiration of air). The
              wide single lumen also doubles as a useful resuscitation
              line — comparable flow rates to a RIC with the security of
              central venous position. Specific complications include
              valve leak, pulmonary artery rupture (if a PAC is wedged
              forcefully or for too long), arrhythmias on insertion and
              knotting of the PAC inside the right ventricle.
            </p>
          </ExamSection>

          <ExamSection id="section-swan-ganz-long-term" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Long-term (tunnelled & implanted) vascular access devices
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When central access is needed for months to years (chemotherapy,
              long-term parenteral nutrition, chronic haemodialysis, cystic
              fibrosis antibiotics), tunnelled or fully implanted devices
              dramatically reduce CRBSI rates compared with non-tunnelled CVCs
              by separating the skin entry site from the venotomy with a
              subcutaneous tunnel and a Dacron cuff that fibroses to anchor
              the line and form a mechanical bacterial barrier.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Hickman / Broviac line</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Tunnelled cuffed silicone catheter (Broviac = paediatric,
                  smaller calibre). Open-ended lumen with an external clamp;
                  requires regular heparinised saline locks and meticulous
                  dressing care. 1–3 lumens. Used for chemotherapy, long-term
                  TPN and stem-cell transplantation. Tip at the cavo-atrial
                  junction, skin exit on the anterior chest wall.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Groshong line</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Tunnelled silicone catheter with a closed, rounded tip and
                  a three-way slit valve just proximal to it. The valve opens
                  outwards on infusion, inwards on aspiration, and stays
                  closed at rest — eliminating the need for heparin locks
                  and reducing air-embolus and reflux-thrombosis risk. Saline
                  flush only. Otherwise managed like a Hickman.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Portacath (totally implanted port)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Silicone catheter attached to a titanium / plastic reservoir
                  with a self-sealing silicone septum, implanted in a
                  subcutaneous infraclavicular pocket. Accessed transcutaneously
                  with a non-coring (Huber) needle. Lowest CRBSI of any CVAD
                  (≈ 0.1 per 1000 catheter-days), best cosmesis, no external
                  components, can be left in situ for years and flushed only
                  4–6 weekly when not in use. Best choice for intermittent
                  long-term chemotherapy.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Tunnelled haemodialysis catheter (Permcath)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Cuffed twin-lumen 13–14.5 Fr silicone catheter (e.g.
                  Permcath, Tesio) tunnelled to the anterior chest wall with
                  the tip in the right atrium. Bridge to AV-fistula maturation
                  or definitive access where a fistula is impossible. Lower
                  infection and dysfunction rates than non-tunnelled
                  vascaths beyond ~1–3 weeks of use.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Anaesthetic relevance:</strong>{" "}
              ports and tunnelled lines may be accessed intra-operatively if
              strict aseptic technique (Huber needle, chlorhexidine, sterile
              field) is observed and the device has been flushed and
              aspirates blood freely; document use in the notes so the
              oncology / nutrition team can re-lock it post-op.
            </p>
          </ExamSection>

          <ExamSection id="section-cvc-tip-confirmation" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              CVC tip confirmation
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A malpositioned tip risks arrhythmia, vessel perforation,
              cardiac tamponade and infusate extravasation into the
              pleural or mediastinal space, so tip position should be
              confirmed before non-emergency use of any new central line
              (<InlineRef topicId="vascular-access-devices" refLabel="BJA Educ 2016" />).
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Chest X-ray (CXR)</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Standard of practice — tip should lie above the carina, parallel to the SVC wall</li>
                  <li>Limitations: ionising radiation, delay before the line can be used, needs patient transport/portable film, poor at excluding malposition into the azygos or contralateral brachiocephalic vein</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Intra-atrial ECG (P-wave) guidance</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>A saline-filled guidewire/catheter acts as an intracardiac electrode; the P wave grows progressively taller and peaks (biphasic) at the cavo-atrial junction</li>
                  <li>Real-time, no radiation, cheap, allows immediate use of the line</li>
                  <li>Unreliable in atrial fibrillation or other rhythms without an organised P wave, and in paced rhythms</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Fluoroscopy</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Gold standard — direct real-time visualisation of the guidewire and catheter tip against bony/cardiac landmarks</li>
                  <li>Needs radiation exposure, specialist kit and an interventional radiology/cath-lab setting — impractical for routine bedside insertion</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Echocardiography (TTE/TOE)</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Direct visualisation of the guidewire "flick" or catheter tip in the right atrium via a bicaval or subcostal view</li>
                  <li>Useful in complex anatomy, difficult positioning and to confirm a femoral wire has reached the IVC rather than a lumbar or renal vein</li>
                  <li>No radiation; requires an operator skilled in echocardiography</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="section-arterial-lines" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Arterial lines
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A short, wide-bore catheter (typically 20 G radial) placed by
              Seldinger technique into an artery and connected to a
              pressure transducer via non-compliant tubing.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Indications</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Real-time beat-to-beat blood pressure in haemodynamic instability or major surgery</li>
                  <li>Frequent arterial blood gas / lactate sampling</li>
                  <li>Pulse-contour cardiac output monitoring (e.g. LiDCO/PiCCO)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Site selection</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li><strong className="text-foreground">Radial</strong> — first-line; superficial, collateral flow via the ulnar artery (confirm with Allen's test/Doppler), lowest complication rate</li>
                  <li><strong className="text-foreground">Brachial</strong> — no collateral supply, so distal ischaemia if occluded carries a higher risk; end artery at the elbow near the median nerve</li>
                  <li><strong className="text-foreground">Femoral</strong> — larger waveform with more distal-pulse overshoot/resonance; easier to palpate and cannulate in shocked patients but higher infection and retroperitoneal haematoma risk</li>
                  <li><strong className="text-foreground">Dorsalis pedis</strong> — useful alternative when upper-limb sites are unavailable; smallest, most distal waveform with greatest amplification/overshoot</li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong className="text-foreground">Complications:</strong>{" "}
              thrombosis and distal ischaemia, haematoma, pseudoaneurysm,
              arteriovenous fistula, nerve injury (median nerve at the
              brachial/wrist, femoral nerve), local and bloodstream
              infection, and accidental intra-arterial drug injection
              (causes severe pain and distal ischaemia/gangrene — manage by
              leaving the cannula in situ, injecting saline/vasodilator or
              local anaesthetic through it, systemic anticoagulation and
              urgent vascular/anaesthetic review; do NOT remove the cannula
              immediately) (<InlineRef topicId="vascular-access-devices" refLabel="BJA Educ 2016" />).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Waveform physics:</strong>{" "}
              an under-damped (resonant) system overestimates systolic and
              underestimates diastolic pressure with an "overshoot" spike,
              typically from long/compliant tubing or air bubbles causing
              a system with too little damping relative to its natural
              frequency; an over-damped system (kinked catheter, clot,
              air bubble, loose connection) flattens the waveform and
              underestimates systolic pressure. The square-wave (fast)
              flush test opens the flush device briefly to generate a
              square pressure wave — an optimally damped system settles
              back to the arterial trace after 1–2 oscillations; more
              oscillations indicate under-damping, none indicate
              over-damping.
            </p>
          </ExamSection>

          <ExamSection id="section-intraosseous-access" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Intraosseous access
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A needle inserted into the medullary cavity of a bone,
              exploiting the non-collapsible venous sinusoids that drain
              into the central venous circulation — a reliable bridge when
              intravenous access is impossible or too slow
              (<InlineRef topicId="vascular-access-devices" refLabel="AoA Vascular Access 2025" />).
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Indications</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Cardiac arrest</li>
                  <li>Major trauma with haemodynamic compromise</li>
                  <li>Status epilepticus</li>
                  <li>Failed peripheral IV access, or IV access likely to take &gt; 90 seconds in an emergency</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Sites</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Proximal tibia (anteromedial, 2 cm below tibial tuberosity) — first-line, easily palpable</li>
                  <li>Distal tibia (proximal to medial malleolus)</li>
                  <li>Proximal humerus (greater tubercle) — higher flow, useful in arrest</li>
                  <li>Sternum (manubrium) — dedicated device (e.g. FAST1), avoids interruption of chest compressions on the limbs</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Contraindications</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Fracture or previous surgery in the target bone</li>
                  <li>Overlying infection or burns at the site</li>
                  <li>Previous IO attempt in the same bone (within 48 h) — extravasation into the fracture/puncture site</li>
                  <li>Bone disease, e.g. osteogenesis imperfecta, or severe osteoporosis</li>
                  <li>Prosthesis or hardware at/near the intended site</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Technique</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Powered drill devices (e.g. EZ-IO) or spring-loaded/impact devices (e.g. B.I.G.) — needle length selected by site and patient habitus</li>
                  <li>Confirm placement by aspirating marrow (not always possible) and by flushing 10 mL saline in adults, watching for free flow without swelling</li>
                  <li>In conscious patients, instil intraosseous lidocaine before flushing/infusing to reduce the significant pain of infusion</li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong className="text-foreground">Complications:</strong>{" "}
              extravasation (most common — check regularly for swelling),
              compartment syndrome, osteomyelitis, fracture, and fat/marrow
              embolism.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Flow:</strong> gravity
              alone gives slow flow through the medullary sinusoids, so a
              pressure bag or manual syringe/three-way tap push is required
              to achieve clinically useful rates (~50–100 mL/min under
              pressure). Any resuscitation drug, crystalloid/colloid fluid,
              or blood product can be given via the IO route, with an onset
              of action equivalent to intravenous administration
              (<InlineRef topicId="vascular-access-devices" refLabel="AoA Vascular Access 2025" />).
            </p>
          </ExamSection>

          <ExamSection id="section-coagulopathy-anticoagulation" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Vascular access in coagulopathy and anticoagulation
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Risk is a balance between bleeding from the puncture site and
              the delay/harm of withholding necessary access
              (<InlineRef topicId="vascular-access-devices" refLabel="AoA Vascular Access 2025" />).
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Pre-procedural risk assessment</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Site compressibility: internal jugular and femoral veins are compressible if bleeding occurs; subclavian is non-compressible and carries the highest risk of an uncontrollable/occult haemorrhage or haemothorax</li>
                  <li>Operator experience — a more experienced operator with real-time ultrasound reduces the number of passes and thus bleeding risk</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Pragmatic thresholds</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Platelets &gt; 50 × 10⁹/L</li>
                  <li>INR &lt; 1.5</li>
                  <li>Avoid routine/reflex correction of mild derangement with FFP or platelets — correction itself carries risk and delays access; treat the patient, not the number</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Anticoagulant/antiplatelet management</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Warfarin: hold and allow INR to fall towards &lt; 1.5, or reverse if urgent</li>
                  <li>DOACs: omit for ≥ 24–48 h before an elective procedure, longer if renal impairment (drug accumulates) — timing depends on the specific agent and creatinine clearance</li>
                  <li>Unfractionated heparin infusion: stop and allow APTT to normalise, or time insertion around dosing; therapeutic LMWH: omit one dose pre-procedure (typically 12–24 h)</li>
                  <li>Aspirin can usually be continued; clopidogrel (and other P2Y12 inhibitors) carry a higher bleeding risk and should prompt a case-by-case risk discussion, favouring compressible sites</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">High-risk strategies</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                  <li>Real-time ultrasound guidance for every pass</li>
                  <li>Smallest calibre catheter and fewest lumens needed for the clinical purpose</li>
                  <li>Most experienced operator performs (or directly supervises) the procedure</li>
                  <li>Avoid the subclavian route; prefer internal jugular or femoral (compressible)</li>
                  <li>Consider a micropuncture (21 G) needle/kit to minimise venotomy size before upsizing</li>
                  <li>Extended post-procedure observation for expanding haematoma, stridor/airway compromise (especially internal jugular) and delayed bleeding</li>
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Removal:</strong> apply
              firm, prolonged direct pressure over compressible sites after
              line removal (longer than in a non-coagulopathic patient),
              and time removal to coincide with the trough of anticoagulant
              effect where a procedure/planned removal can be scheduled.
            </p>
          </ExamSection>

          <ExamSection id="section-dwell-times-scenarios" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Evidence on safe dwell times by device & site
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Historical practice was to resite peripheral cannulae every
              72–96 h. The landmark Rickard <em>et al.</em> (Lancet 2012,
              n = 3283) RCT and the subsequent Cochrane review (Webster 2019)
              showed no difference in phlebitis or CRBSI between routine
              replacement and clinically-indicated removal — current{" "}
              <strong className="text-foreground">epic3 / RCN / INS guidance</strong>{" "}
              is therefore to leave peripheral cannulae <em>in situ</em> until
              clinically indicated, inspecting at least every shift (VIP score).
              For all central devices the evidence supports removing the line
              <em> only </em> when no longer needed; routine elective change
              does not reduce CRBSI and exposes the patient to mechanical
              complications.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Device</th>
                    <th className="text-left py-2 text-foreground font-semibold">Typical site</th>
                    <th className="text-left py-2 text-foreground font-semibold">Recommended dwell</th>
                    <th className="text-left py-2 text-foreground font-semibold">Evidence base</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Peripheral cannula</td>
                    <td>Forearm / hand</td>
                    <td>Clinically indicated (no fixed maximum)</td>
                    <td>Rickard 2012 (Lancet); Cochrane 2019; epic3 2014; RCN 2016</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Arterial line</td>
                    <td>Radial &gt; femoral &gt; brachial</td>
                    <td>~7 days; remove when not needed (no scheduled change)</td>
                    <td>CDC 2011; O'Horo 2014 meta-analysis (CRBSI ≈ 1.7/1000 d)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Midline</td>
                    <td>Basilic / brachial → axillary v.</td>
                    <td>1–4 weeks (manufacturer ≤ 29 days)</td>
                    <td>INS 2021; Adams 2016 (low CRBSI ≈ 0.2/1000 d)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Non-tunnelled CVC</td>
                    <td>RIJ &gt; subclavian &gt; femoral</td>
                    <td>Clinically indicated; ideally ≤ 7–14 days</td>
                    <td>3SITES (Parienti NEJM 2015): subclavian lowest CRBSI &amp; thrombosis, highest pneumothorax; femoral highest infection</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">PICC</td>
                    <td>Basilic / brachial → SVC</td>
                    <td>Weeks–months; clinically indicated</td>
                    <td>MAGIC criteria 2015; Chopra 2013 (PICC DVT &gt; CVC)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Non-tunnelled vascath</td>
                    <td>RIJ &gt; femoral &gt; LIJ &gt; subclavian</td>
                    <td>Days–weeks; tunnel if &gt; 1–3 weeks</td>
                    <td>KDIGO 2012; Parienti Cathedia 2008 (femoral non-inferior in BMI &lt; 28)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Tunnelled CVC (Hickman / Broviac / Groshong)</td>
                    <td>RIJ → tunnel to chest wall</td>
                    <td>Months–years; remove for infection / dysfunction</td>
                    <td>IDSA 2009; epic3 2014; CDC 2011</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Implanted port (Portacath)</td>
                    <td>Subclavian → infraclavicular pocket</td>
                    <td>Years; lowest CRBSI of any CVAD</td>
                    <td>Maki 2006 meta-analysis (≈ 0.1/1000 d vs 2.7 for non-tunnelled CVC)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Tunnelled vascath (Permcath / Tesio)</td>
                    <td>RIJ → chest wall, tip in RA</td>
                    <td>Months; bridge or definitive HD access</td>
                    <td>KDOQI 2019; KDIGO 2012</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              Site effects: femoral CVCs carry the highest CRBSI and DVT
              risk and should be avoided where possible (3SITES); subclavian
              has the lowest infection and thrombosis but the highest
              mechanical (pneumothorax) risk; the right internal jugular
              remains the default compromise. For arterial lines the femoral
              site has comparable CRBSI to radial in modern data but higher
              local-haematoma risk.
            </p>
          </ExamSection>

          <ExamSection id="section-dwell-times-scenarios" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Choosing a device — clinical scenarios
            </h2>
            <div className="space-y-2">
              {[
                {
                  scenario: "Day-case knee arthroscopy",
                  device: "20 G peripheral cannula",
                  why: "Short anaesthetic, isotonic drugs only.",
                },
                {
                  scenario: "Major trauma in resus",
                  device: "Two 14 G antecubital cannulae ± RIC/MAC introducer",
                  why: "Maximal gravity / pressurised flow for blood. Central access only when peripheral fails.",
                },
                {
                  scenario: "ICU patient on noradrenaline + TPN",
                  device: "Triple-lumen CVC, RIJ approach",
                  why: "Vesicant infusions need central tip; multiple incompatible drugs.",
                },
                {
                  scenario: "AKI requiring CVVHDF",
                  device: "12 Fr right IJ vascath",
                  why: "Short, wide twin lumen supports 200–300 mL/min blood flow without recirculation.",
                },
                {
                  scenario: "Chemotherapy for 6 months",
                  device: "PICC or tunnelled Hickman / port",
                  why: "Vesicant, prolonged course; outpatient-friendly.",
                },
                {
                  scenario: "Coronary artery bypass with poor LV",
                  device: "Swan introducer sheath ± PA catheter",
                  why: "Conduit for PAC, rapid volume access, pacing wire if needed.",
                },
              ].map((s) => (
                <div
                  key={s.scenario}
                  className="p-3 rounded-lg bg-secondary/30 border border-border"
                >
                  <p className="font-semibold text-foreground text-sm">
                    {s.scenario} — <span className="text-perioperative">{s.device}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{s.why}</p>
                </div>
              ))}
            </div>
          </ExamSection>
          <TopicFaqs faqs={vascularAccessFaqs} />
        </>
      }
      keyPoints={[
        { text: "Classification follows tip position: peripheral (vein) → midline (axillary v.) → central (SVC). Vesicants and vasopressors require central tips.", cites: ["BJA Educ 2016"] },
        { text: "Hagen–Poiseuille: flow ∝ r⁴ / length. Short wide single-lumen devices (14 G, RIC, MAC, Swan introducer) outflow long narrow multi-lumen CVCs by an order of magnitude.", cites: ["BJA Educ 2016"] },
        { text: "Midline ≠ central — tip in axillary vein, no SVC. Suitable for ≤ 4 weeks of non-vesicant infusions only.", cites: ["BJA Educ 2016", "epic4 2023"] },
        { text: "PICCs offer long-term central access with no neck/chest puncture risk but have higher upper-limb DVT rates than tunnelled CVCs.", cites: ["BJA Educ 2016", "epic4 2023"] },
        { text: "Triple-lumen CVC: distal (16 G) for vasopressors and CVP, medial for TPN, proximal opens later — useful safety margin if catheter migrates.", cites: ["BJA Educ 2016"] },
        { text: "Vascath 12–14 Fr supports 200–400 mL/min for RRT/PLEX. KDIGO 2012 site preference: right IJ > femoral > left IJ > subclavian (subclavian risks central stenosis).", cites: ["KDIGO 2012"] },
        { text: "RIC converts a peripheral cannula to a wide-bore line; MAC introducer combines a side-port for rapid volume with a central lumen for vasopressors / PAC.", cites: ["BJA Educ 2016"] },
        { text: "Swan-Ganz sheath = introducer, not the PAC. Wide bore doubles as a high-flow resus line; specific complication is PA rupture if a PAC is wedged for too long.", cites: ["BJA Educ 2016"] },
        { text: "All CVC insertions use the NICE TA49 ultrasound-guidance bundle, maximum barrier precautions and 2% chlorhexidine; CXR confirmation of tip position before elective use.", cites: ["NICE TA49", "epic4 2023"] },
        { text: "Long-term access: Hickman (open-ended, heparin lock), Groshong (slit valve, saline only), Portacath (fully implanted, lowest CRBSI ≈ 0.1/1000 catheter-days), Permcath (tunnelled HD).", cites: ["epic4 2023", "BJA Educ 2016"] },
        { text: "Dwell times: peripheral cannulae are now removed when clinically indicated (Rickard 2012, Cochrane 2019, epic3) — routine 72–96 h replacement no longer recommended.", cites: ["Rickard 2012", "Cochrane PIVC 2019", "epic4 2023"] },
        { text: "Site evidence (3SITES, NEJM 2015): subclavian lowest CRBSI & DVT but highest pneumothorax; femoral highest infection & DVT; right IJ is the default compromise. Avoid femoral when possible.", cites: ["3SITES 2015", "epic4 2023"] },
      
      ]}
    />
  );
};

export default VascularAccessDevicesTopic;

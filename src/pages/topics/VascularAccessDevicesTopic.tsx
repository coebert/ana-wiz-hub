import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { DiagramSection } from "@/components/DiagramSection";
import {
  VascularAccessDevicesDiagram,
  VascularAccessCrossSectionDiagram,
} from "@/components/diagrams/VascularAccessDevicesDiagram";
import { vascularAccessDevicesQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

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
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      diagrams={
        <>
          <DiagramSection
            title="Devices to scale — length and tip position"
            intro={
              <p>
                Catheters compared on a single length axis. Tip position
                (forearm vein → axillary vein → SVC) is the single most
                important property: it determines whether the device is
                peripheral, midline or central, and therefore which drugs
                and what flow rates are safe.
              </p>
            }
          >
            <VascularAccessDevicesDiagram />
          </DiagramSection>

          <DiagramSection
            title="Lumen geometry & flow"
            intro={
              <p>
                End-on cross-sections drawn to scale. Flow ∝ r⁴ / length
                (Hagen–Poiseuille) — a short, wide single-lumen RIC or
                introducer sheath delivers an order of magnitude more than
                the narrow distal lumen of a long triple-lumen CVC.
              </p>
            }
          >
            <VascularAccessCrossSectionDiagram />
          </DiagramSection>
        </>
      }
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
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

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
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

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
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

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
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

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
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

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
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

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
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

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
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

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
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
        </>
      }
      keyPoints={[
        "Classification follows tip position: peripheral (vein) → midline (axillary v.) → central (SVC). Vesicants and vasopressors require central tips.",
        "Hagen–Poiseuille: flow ∝ r⁴ / length. Short wide single-lumen devices (14 G, RIC, MAC, Swan introducer) outflow long narrow multi-lumen CVCs by an order of magnitude.",
        "Midline ≠ central — tip in axillary vein, no SVC. Suitable for ≤ 4 weeks of non-vesicant infusions only.",
        "PICCs offer long-term central access with no neck/chest puncture risk but have higher upper-limb DVT rates than tunnelled CVCs.",
        "Triple-lumen CVC: distal (16 G) for vasopressors and CVP, medial for TPN, proximal opens later — useful safety margin if catheter migrates.",
        "Vascath 12–14 Fr supports 200–400 mL/min for RRT/PLEX. KDIGO 2012 site preference: right IJ > femoral > left IJ > subclavian (subclavian risks central stenosis).",
        "RIC converts a peripheral cannula to a wide-bore line; MAC introducer combines a side-port for rapid volume with a central lumen for vasopressors / PAC.",
        "Swan-Ganz sheath = introducer, not the PAC. Wide bore doubles as a high-flow resus line; specific complication is PA rupture if a PAC is wedged for too long.",
        "All CVC insertions use the NICE TA49 ultrasound-guidance bundle, maximum barrier precautions and 2% chlorhexidine; CXR confirmation of tip position before elective use.",
      ]}
    />
  );
};

export default VascularAccessDevicesTopic;

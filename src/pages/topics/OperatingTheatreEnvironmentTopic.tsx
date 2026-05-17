import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { operatingTheatreEnvironmentQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import TheatreZoningDiagram from "@/components/diagrams/TheatreZoningDiagram";
import CssdWasteFlowSubMap from "@/components/diagrams/CssdWasteFlowSubMap";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Describe the zoning of a UK operating theatre complex and the rationale for the protective → clean → sterile gradient",
  "Explain the principles of theatre ventilation (plenum / turbulent vs. ultra-clean laminar flow), including air-change rates, HEPA filtration and the positive-pressure cascade",
  "State the recommended environmental targets for theatre temperature, humidity and noise, and relate them to perioperative normothermia and infection control",
  "Describe waste-anaesthetic-gas scavenging systems and the COSHH workplace exposure limits for N₂O and the volatile agents",
  "Outline the electrical safety requirements of the operating theatre (isolated power, line isolation monitor, equipment classification CF/BF/B)",
  "Apply the WHO Surgical Safety Checklist (Sign In / Time Out / Sign Out) and describe team workflow, briefing/debriefing and human-factors principles in the theatre environment",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Choosing a theatre for a primary total hip replacement",
    scenario:
      "A 68-year-old is listed for elective primary total hip arthroplasty. The hospital has both conventionally ventilated and ultra-clean laminar-flow theatres available. Which should be chosen, and why?",
    working:
      "Prosthetic-implant arthroplasty is one of the few surgical categories with historical RCT evidence (Lidwell 1982) showing reduced deep infection with ultra-clean unidirectional (laminar) air ~0.3 m/s delivering ~300 air changes/h over the operative field, achieving <10 CFU/m³.\nUK HTM 03-01 still endorses ultra-clean ventilation for prosthetic orthopaedic implant work, although recent observational data (e.g. Bischoff 2017 Lancet ID meta-analysis) have questioned the benefit for non-arthroplasty clean surgery.\nLaminar flow is most effective when staff movement is minimised, the canopy is not breached by tall theatre lights and personnel exhaust suits are worn correctly.",
    answer:
      "Use the ultra-clean laminar-flow theatre. Brief the team to keep door openings and movement to a minimum (each door opening transiently destroys laminar flow and raises CFU counts), ensure the operative field sits within the canopy footprint, position lights to avoid disrupting downward flow, and combine with antibiotic prophylaxis, normothermia and skin antisepsis as the bundle that actually reduces SSI.",
    cites: ["HTM 03-01", "Lidwell 1982"],
  },
  {
    title: "An anaesthetic machine alarm for high O₂ during a long sevoflurane case",
    scenario:
      "Three hours into a long laparotomy you notice the theatre smells faintly of sevoflurane and the scrub nurse complains of a headache. Scavenging is connected. What are the possible causes and how would you investigate?",
    working:
      "Ambient volatile concentration should remain below the COSHH 8-h TWA limits (sevoflurane ~60 ppm, isoflurane 50 ppm, N₂O 100 ppm). Possible causes:\n1. Active scavenging failure — disconnection at the AGSS receiver, blocked transfer tubing, or the theatre suction pump tripped.\n2. Leak around an uncuffed tracheal tube or poorly sealing supraglottic airway → expired gas escapes around the device into room air.\n3. Filling station leak (Quik-Fil), spillage, or a damaged vaporiser O-ring.\n4. Theatre ventilation set to low flow / fault — air-change rate has fallen below 20 ACH.\nManagement: confirm patient is safe (FiO₂, EtCO₂, end-tidal agent, airway seal), check the AGSS receiver float/indicator and tubing, switch to cuffed airway if leaking, increase fresh gas to flush via scavenged limb, and request estates/medical-physics check of theatre ventilation. Document as a clinical incident and notify the WAGD/COSHH lead.",
    answer:
      "Most likely a scavenging system fault or airway leak. Check AGSS first (it is the commonest cause of acute exposure complaints), then airway seal, then theatre ventilation. Long-term mitigation: minimal-flow anaesthesia, cuffed airways, regular scavenging servicing, and ensuring theatre ACH ≥20.",
    cites: ["COSHH WAG 2020", "HTM 03-01"],
  },
];

const OperatingTheatreEnvironmentTopic = () => {
  return (
    <TopicTemplate
      title="The Operating Theatre & Theatre Complex"
      subtitle="Layout, zoning, ventilation, environment and electrical safety of the modern operating theatre"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="operating-theatre-environment"
      topicTitle="The Operating Theatre & Theatre Complex"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={operatingTheatreEnvironmentQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Clinical Anaesthesia", "RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["HTM 03-01", "AAGBI Theatre Safety 2008", "WHO Checklist 2009"],
      }}
      keyPoints={[
        { text: "Theatre complex is zoned protective → clean → aseptic/sterile, with a positive-pressure cascade (theatre +25 Pa → corridor 0 Pa) to drive airflow OUTWARDS", cites: ["HTM 03-01"] },
        { text: "Conventionally (plenum) ventilated theatres: ≥20 air changes/h via HEPA filters (>99.97% at 0.3 µm); ultra-clean laminar-flow canopies deliver ~300 ACH at ~0.3 m/s over the field", cites: ["HTM 03-01"] },
        { text: "Ultra-clean laminar flow is endorsed for prosthetic implant orthopaedic surgery (Lidwell evidence); benefit in other clean surgery is now contested", cites: ["Lidwell 1982"] },
        { text: "Environmental targets: temperature 18–25 °C (raise to 23–26 °C for paediatric/burns/long open cavity), relative humidity 40–60%, noise <40 dB(A) baseline", cites: ["HTM 03-01"] },
        { text: "Active scavenging (AGSS) keeps theatre WAG concentrations below COSHH 8-h TWA limits: N₂O 100 ppm, isoflurane 50 ppm, sevoflurane 60 ppm (informal). Minimal-flow anaesthesia is the strongest single mitigation", cites: ["COSHH WAG 2020"] },
        { text: "Electrical supply uses an isolated (IT) power system with a line isolation monitor — a single fault to earth alarms but does not produce shock current; equipment classified CF (cardiac-floating) for direct cardiac contact", cites: ["IEC 60601-1"] },
        { text: "WHO Surgical Safety Checklist (Sign In before induction → Time Out before incision → Sign Out before leaving theatre) reduces morbidity and mortality and embeds team briefing and human-factors practice", cites: ["WHO Checklist 2009"] },
        { text: "Isolation theatres for highly infectious cases reverse the cascade (negative pressure with airlock lobby) — must be requested explicitly and confirmed with estates", cites: ["HTM 03-01"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="layout-zoning" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Theatre Complex Layout & Zoning" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A modern UK operating-theatre complex is designed around a graded reduction in microbial bioburden as you move
              towards the operative field. HTM 03-01 describes four notional zones, each with progressively stricter dress code,
              traffic restrictions and ventilation requirements:
            </p>
            <div className="space-y-2 text-sm">
              {[
                { z: "Outer / protective zone", d: "Reception, offices, changing rooms, staff rest areas. Street clothes permitted; no patient contact." },
                { z: "Clean zone", d: "Anaesthetic room, recovery/PACU, theatre corridors, holding bay. Theatre scrubs and clean overshoes; patients enter on their bed/trolley." },
                { z: "Aseptic / sterile zone", d: "Operating room, scrub-up area, sterile preparation room. Full theatre attire, head covering, masks during scrubbed activity. Movement strictly limited." },
                { z: "Disposal / dirty zone", d: "Sluice, waste hold. One-way traffic OUT of the theatre; never re-enters the sterile zone." },
              ].map((z) => (
                <div key={z.z} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground">{z.z}</p>
                  <p className="text-muted-foreground mt-1">{z.d}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Recovery is intentionally placed in the <strong>clean</strong> zone, not the sterile zone, so that patients can leave the
              complex without re-crossing the sterile area. Patient flow is one-directional: induction → theatre → recovery → discharge.
            </p>

            <div className="mt-4 animate-fade-in">
              <TheatreZoningDiagram />
            </div>

            <div className="mt-4 animate-fade-in">
              <CssdWasteFlowSubMap />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="ventilation" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Ventilation: Plenum vs. Ultra-Clean Laminar Flow">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Ventilation is the single most important environmental control. HTM 03-01 (Specialised ventilation for healthcare premises) is
              the governing UK document.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-2 border-b border-border font-semibold">Feature</th>
                    <th className="text-left p-2 border-b border-border font-semibold">Conventional (plenum / turbulent)</th>
                    <th className="text-left p-2 border-b border-border font-semibold">Ultra-clean (laminar / unidirectional)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Air-change rate</td>
                    <td className="p-2">≥ 20 ACH (room as a whole)</td>
                    <td className="p-2">~300 ACH over the operative field</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Airflow pattern</td>
                    <td className="p-2">Mixing / dilution; HEPA-filtered air enters at ceiling, exhausts at low-level grilles</td>
                    <td className="p-2">Unidirectional vertical or horizontal flow ~0.3 m/s through a defined canopy</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Filtration</td>
                    <td className="p-2">HEPA (≥99.97% at 0.3 µm)</td>
                    <td className="p-2">HEPA + canopy seals; sometimes terminal HEPA at diffuser</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Pressure</td>
                    <td className="p-2">+25 Pa relative to corridor</td>
                    <td className="p-2">+25 Pa with stepped cascade through prep rooms</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Bioburden achieved</td>
                    <td className="p-2">~50–150 CFU/m³</td>
                    <td className="p-2">&lt; 10 CFU/m³ (empty); &lt; 20 CFU/m³ (busy)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-2 font-medium text-foreground">Indications</td>
                    <td className="p-2">Most general, gynae, ENT, urology, day surgery</td>
                    <td className="p-2">Prosthetic-implant orthopaedic surgery (hip/knee arthroplasty); some neuro and vascular implant work</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-3">
              <strong>Pressure cascade:</strong> theatre (+25 Pa) → anaesthetic room / scrub (+5 to +10 Pa) → corridor (0 Pa). Air flows OUT of the
              cleanest space. <strong>Isolation theatres</strong> (for open TB, MERS/COVID, or highly contagious cases) reverse this with negative
              pressure and an airlock lobby — the theatre must be requested explicitly and confirmed with estates because most theatres cannot
              be re-balanced quickly.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              <strong>Caveat on laminar flow:</strong> Lidwell's landmark 1982 RCT showed reduced deep prosthetic joint infection in arthroplasty.
              Subsequent registry and meta-analytic data (Bischoff 2017) suggest the benefit may be modest or absent outside arthroplasty, and that
              door openings and personnel movement readily destroy the unidirectional flow. The team behaviour matters as much as the engineering.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="environment" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Temperature, Humidity & Noise">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Temperature 18–25 °C</strong> (typically 20–22 °C). Raise to <strong>23–26 °C</strong> for neonates/infants, burns, prolonged or open-cavity surgery to limit radiative and convective patient heat loss. NICE CG65 mandates perioperative core temperature ≥36.0 °C.</li>
              <li><strong>Relative humidity 40–60%.</strong> Too low → static electricity, dry mucosae and increased airborne particle dispersion; too high → bacterial proliferation, condensation and impaired wound healing.</li>
              <li><strong>Noise &lt; 40 dB(A) at baseline,</strong> rising to ~50 dB(A) during surgery; alarms and conversation are the main contributors. Noise impairs communication, increases error and disturbs the patient at induction and emergence.</li>
              <li><strong>Lighting:</strong> ambient ~1 000 lux; surgical field 40 000–160 000 lux from shadowless coaxial pendant lamps with colour temperature ~4 500 K (close to daylight) for accurate tissue colour rendering.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="scavenging" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Waste-Anaesthetic-Gas Scavenging (AGSS)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Chronic occupational exposure to anaesthetic gases has been associated (largely historical, observational data) with
              headache, fatigue, and theoretical reproductive risk. UK COSHH 8-hour time-weighted-average workplace exposure limits (EH40):
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-3">
              <li>Nitrous oxide — <strong>100 ppm</strong></li>
              <li>Isoflurane — <strong>50 ppm</strong></li>
              <li>Sevoflurane — informal target <strong>60 ppm</strong> (no formal UK limit; adopted from NIOSH)</li>
              <li>Desflurane — no formal UK limit; commonly quoted target ≤ 20 ppm</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-3">
              An <strong>active scavenging system</strong> has four parts: (1) collecting assembly (APL valve and ventilator spill), (2) transfer
              tubing (30 mm), (3) receiving system with reservoir and pressure-relief valves (positive and negative) to protect the patient
              circuit from extremes of pressure, and (4) the disposal route — a low-resistance pipe to a powered extract terminating outside
              the building, well away from air intakes. The most important practical mitigations are <strong>minimal-flow anaesthesia</strong>,
              cuffed airways, regular AGSS servicing, and theatre ventilation ≥ 20 ACH.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="electrical-safety" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Electrical Safety in the Theatre">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Operating theatres are wired with an <strong>isolated (IT) power system</strong>: the mains supply is separated from earth via an
              isolating transformer. A single fault to earth therefore does NOT complete a shock circuit — instead it triggers a
              <strong> line isolation monitor</strong> (audible/visual alarm) so the fault can be investigated electively. Without isolation,
              a patient with intracardiac wires or pacing leads is at risk of <strong>microshock</strong> (currents as low as 100 µA causing VF).
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Equipment is classified by IEC 60601 according to leakage-current protection at the patient interface:
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Class B</strong> — body protection only (no patient connection, e.g. theatre lights)</li>
              <li><strong>Class BF</strong> — body-floating; isolated patient-applied part (e.g. ECG, NIBP)</li>
              <li><strong>Class CF</strong> — cardiac-floating; very low leakage (&lt; 10 µA), suitable for direct cardiac connection (e.g. invasive arterial line, transvenous pacing)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Diathermy is the largest single source of theatre electrical injury: monopolar requires a large-area patient plate
              (return electrode) to disperse current density; bipolar avoids the plate but limits power. Diathermy can interfere with
              pacemakers and ICDs — site the plate to keep current paths away from the device, and consider bipolar or ultrasonic alternatives.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="team-checklists" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Team Workflow, Briefing & the WHO Checklist">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The theatre team typically comprises an anaesthetist (± assistant / ODP), surgeon(s), scrub practitioner, circulating nurse and
              a recovery practitioner. The day usually starts with a <strong>team brief</strong> (whole list, anticipated issues, equipment,
              staffing, order changes) and ends with a <strong>debrief</strong> (what went well, learning, incidents).
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The <strong>WHO Surgical Safety Checklist</strong> (Haynes 2009) is mandated for every operation in the NHS:
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Sign In — before induction of anaesthesia</p>
                <p className="text-muted-foreground mt-1">Patient identity, site marked, consent confirmed, allergies, anticipated airway/aspiration risk, blood-loss risk, monitoring attached.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Time Out — after induction, before skin incision</p>
                <p className="text-muted-foreground mt-1">Whole-team introduction by name and role; patient/site/procedure confirmed; antibiotic prophylaxis given within 60 min; imaging displayed; anticipated critical events (surgical, anaesthetic, nursing) shared.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground">Sign Out — before patient leaves theatre</p>
                <p className="text-muted-foreground mt-1">Procedure recorded, instrument/swab/sharp counts correct, specimens labelled, equipment problems noted, key recovery and post-op concerns handed over.</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Effective use depends on flat hierarchy and psychological safety; the checklist is not a tick-box. Human-factors training (ANTS
              framework — Task management, Team working, Situation awareness, Decision making) underpins safe theatre culture and is examined
              in both Final FRCA and FFICM.
            </p>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Laminar-flow theatres deliver 300+ air changes/hour with HEPA-filtered, unidirectional flow — primarily for orthopaedic implants and immunocompromised patients.",
              "Standard theatres: 20–25 air changes/hour, temperature 18–22 °C, humidity 50–60% to balance comfort, electrostatic risk and infection.",
              "Scavenging removes waste anaesthetic gases — passive systems rely on patient effort; active systems use vacuum but need a reservoir to prevent suction injury.",
              "Theatre zoning (protective, clean, aseptic, disposal) controls personnel flow and reduces wound contamination.",
              "WHO Surgical Safety Checklist (sign-in, time-out, sign-out) is mandatory and reduces mortality and complications.",
            ]}
          />
        </>
      }
    />
  );
};

export default OperatingTheatreEnvironmentTopic;

import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { CardiacOutputMonitorDiagram } from "@/components/diagrams/CardiacOutputMonitorDiagram";
import PiCCODiagram from "@/components/diagrams/PiCCODiagram";
import PACDiagram from "@/components/diagrams/PACDiagram";
import EchoDiagram from "@/components/diagrams/EchoDiagram";
import TOEViewsDiagram from "@/components/diagrams/TOEViewsDiagram";
import MModeDiagram from "@/components/diagrams/MModeDiagram";
import MModePathologyDiagram from "@/components/diagrams/MModePathologyDiagram";
import OesophagealDopplerDiagram from "@/components/diagrams/OesophagealDopplerDiagram";
import { cardiacOutputMonitoringQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const CardiacOutputMonitoringTopic = () => {
  return (
    <SectionLayout title="Cardiac Output Monitoring" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Cardiac output monitoring guides haemodynamic management in critically ill patients. Understanding the principles, advantages, and limitations of each technology is essential for rational clinical use.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Equipment Comparison</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Compare the four main cardiac output monitoring technologies — their principles, waveforms, and clinical applications.
          </p>
          <div className="rounded-xl border border-border bg-card p-4">
            <CardiacOutputMonitorDiagram />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fick Principle</h2>
          <p className="text-muted-foreground leading-relaxed">
            CO = VO₂ / (CaO₂ - CvO₂). The gold standard but impractical clinically as it requires steady-state oxygen consumption measurement. All other methods are validated against this or thermodilution.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thermodilution Methods</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Both PAC and PiCCO use thermodilution but differ in their approach:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Right-heart thermodilution (PAC)</p>
              <p className="text-sm text-muted-foreground mt-1">Cold saline injected via RA port, temperature change measured at PA tip. Modified Stewart-Hamilton equation. Can measure PAOP (wedge) — estimates LA pressure.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Transpulmonary thermodilution (PiCCO)</p>
              <p className="text-sm text-muted-foreground mt-1">Cold saline via CVC, thermistor at femoral artery. Longer transit time allows calculation of GEDI (preload) and EVLWI (lung water). Continuous CO via pulse contour analysis between calibrations.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Non-Invasive & Minimally Invasive</h2>
          <div className="space-y-3">
            {[
              { device: "Oesophageal Doppler", desc: "Doppler probe in oesophagus measures descending aortic blood velocity. FTc (corrected flow time) guides fluid therapy — FTc <330 ms suggests hypovolaemia. Quick to insert, real-time." },
              { device: "LiDCO (Lithium dilution)", desc: "Lithium chloride injection + arterial sensor. Calibrates pulse power analysis for continuous CO. Contraindicated with non-depolarising NMBAs and first-trimester pregnancy." },
              { device: "FloTrac/Vigileo", desc: "Uncalibrated pulse contour analysis from a standard arterial line. Less accurate in vasoplegia or rapid haemodynamic changes. Convenience: no calibration needed." },
              { device: "NICOM (Bioreactance)", desc: "Completely non-invasive — electrode stickers on thorax. Analyses phase shifts in electrical signals. Trending ability but limited absolute accuracy in shocked patients." },
            ].map((d) => (
              <div key={d.device} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{d.device}</p>
                <p className="text-sm text-muted-foreground mt-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Acronyms & Abbreviations</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A glossary of abbreviations used throughout this topic and its diagrams. Grouped by theme for quick reference.
          </p>

          <div className="space-y-4">
            {[
              {
                group: "Devices & techniques",
                items: [
                  ["PAC", "Pulmonary Artery Catheter (Swan-Ganz catheter)"],
                  ["PiCCO", "Pulse Contour Cardiac Output (transpulmonary thermodilution + pulse contour analysis)"],
                  ["TPTD", "Transpulmonary Thermodilution — cold indicator injected centrally, detected at a peripheral (femoral) artery thermistor"],
                  ["LiDCO", "Lithium Dilution Cardiac Output (lithium chloride indicator + arterial sensor, calibrates pulse power analysis)"],
                  ["PulseCO", "Pulse Power Analysis — the continuous CO algorithm used by LiDCO between calibrations"],
                  ["FloTrac/Vigileo", "Uncalibrated arterial pulse contour CO monitor (Edwards)"],
                  ["NICOM", "Non-Invasive Cardiac Output Monitor — bioreactance (phase-shift) analysis via thoracic electrodes"],
                  ["ODM", "Oesophageal Doppler Monitor"],
                  ["TTE / TOE", "Transthoracic / Transoesophageal Echocardiography (TEE in US usage)"],
                  ["FOCUS / FATE", "Focused critical-care echo protocols (Focused Cardiac Ultrasound / Focus-Assessed Transthoracic Echo)"],
                  ["BSE", "British Society of Echocardiography (accreditation body)"],
                  ["CVC", "Central Venous Catheter"],
                ],
              },
              {
                group: "Flow, pressure & resistance",
                items: [
                  ["CO", "Cardiac Output (L/min)"],
                  ["CI", "Cardiac Index — CO indexed to body surface area (L/min/m²)"],
                  ["SV", "Stroke Volume (mL)"],
                  ["SVI", "Stroke Volume Index (mL/m²)"],
                  ["HR", "Heart Rate"],
                  ["BSA", "Body Surface Area"],
                  ["PBW", "Predicted Body Weight (used for EVLWI indexing)"],
                  ["MAP", "Mean Arterial Pressure"],
                  ["CVP", "Central Venous Pressure"],
                  ["PA", "Pulmonary Artery"],
                  ["RA / RV / LA / LV", "Right Atrium / Right Ventricle / Left Atrium / Left Ventricle"],
                  ["PAOP / PCWP", "Pulmonary Artery Occlusion Pressure / Pulmonary Capillary Wedge Pressure (estimate of LA pressure)"],
                  ["LVEDP", "Left Ventricular End-Diastolic Pressure"],
                  ["SVR / SVRI", "Systemic Vascular Resistance / Resistance Index"],
                  ["PVR", "Pulmonary Vascular Resistance"],
                ],
              },
              {
                group: "PiCCO-derived volumes & thermodilution maths",
                items: [
                  ["MTt", "Mean Transit Time of the thermal indicator from injection to detection"],
                  ["DSt", "Down-Slope Time — exponential decay time of the thermodilution curve (reflects largest mixing chamber, the lungs)"],
                  ["ITTV", "Intrathoracic Thermal Volume = CO × MTt (total volume the indicator passes through between CVC and femoral artery)"],
                  ["PTV", "Pulmonary Thermal Volume = CO × DSt (volume of the lungs as the largest mixing chamber)"],
                  ["GEDV", "Global End-Diastolic Volume = ITTV − PTV (combined end-diastolic volume of all four cardiac chambers)"],
                  ["GEDI", "Global End-Diastolic Volume Index = GEDV / BSA — volumetric preload marker"],
                  ["ITBV", "Intrathoracic Blood Volume ≈ 1.25 × GEDV (empirical relationship)"],
                  ["PBV", "Pulmonary Blood Volume = ITBV − GEDV"],
                  ["EVLW", "Extravascular Lung Water = ITTV − ITBV (water in lung interstitium and alveoli)"],
                  ["EVLWI", "EVLW indexed to predicted body weight (mL/kg)"],
                  ["PVPI", "Pulmonary Vascular Permeability Index = EVLW / PBV (distinguishes hydrostatic vs permeability oedema)"],
                  ["GEF", "Global Ejection Fraction = 4 × SV / GEDV (biventricular contractility surrogate)"],
                  ["CFI", "Cardiac Function Index = CO / GEDV (contractility surrogate, similar to GEF)"],
                  ["dP/dt", "Rate of pressure rise — contractility index from arterial waveform"],
                ],
              },
              {
                group: "Dynamic & oxygenation indices",
                items: [
                  ["SVV", "Stroke Volume Variation across the respiratory cycle (%) — fluid responsiveness marker"],
                  ["PPV", "Pulse Pressure Variation across the respiratory cycle (%) — fluid responsiveness marker"],
                  ["FTc", "Corrected Flow Time (oesophageal Doppler) — systolic flow time corrected to HR 60; <330 ms suggests hypovolaemia"],
                  ["PV", "Peak Velocity (oesophageal Doppler) — surrogate for contractility"],
                  ["VTI / LVOT VTI", "Velocity-Time Integral / Velocity-Time Integral across the LV Outflow Tract (used for echo SV calculation)"],
                  ["LVOT", "Left Ventricular Outflow Tract"],
                  ["LVEF / EF", "Left Ventricular Ejection Fraction"],
                  ["SvO₂", "Mixed Venous Oxygen Saturation (sampled from PA — true mixed venous)"],
                  ["ScvO₂", "Central Venous Oxygen Saturation (sampled from CVC tip — surrogate for SvO₂)"],
                  ["CaO₂ / CvO₂", "Arterial / Venous Oxygen Content (used in the Fick equation)"],
                  ["VO₂", "Oxygen Consumption (mL/min)"],
                  ["DO₂", "Oxygen Delivery = CO × CaO₂"],
                ],
              },
              {
                group: "Clinical, ventilation & trial terms",
                items: [
                  ["GDT", "Goal-Directed (fluid) Therapy"],
                  ["NMBA", "Neuromuscular Blocking Agent"],
                  ["MV", "Mechanical Ventilation (or, in physiology, Minute Ventilation — context-dependent)"],
                  ["VT", "Tidal Volume"],
                  ["IABP", "Intra-Aortic Balloon Pump"],
                  ["ARDS", "Acute Respiratory Distress Syndrome"],
                  ["IVC / SVC", "Inferior / Superior Vena Cava"],
                  ["AF", "Atrial Fibrillation"],
                  ["HTN", "Hypertension"],
                  ["PAC-Man", "UK multicentre RCT (2005) showing no mortality benefit from routine PAC use in ICU"],
                ],
              },
            ].map((section) => (
              <div key={section.group} className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="px-4 py-2 bg-muted/50 border-b border-border">
                  <p className="font-semibold text-foreground text-sm">{section.group}</p>
                </div>
                <dl className="divide-y divide-border">
                  {section.items.map(([abbr, expansion]) => (
                    <div key={abbr} className="grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr] gap-3 px-4 py-2.5">
                      <dt className="font-mono text-xs sm:text-sm font-semibold text-foreground">{abbr}</dt>
                      <dd className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{expansion}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OesophagealDopplerDiagram />
      <PiCCODiagram />
      <PACDiagram />
      <EchoDiagram />
      <MModeDiagram />
      <MModePathologyDiagram />
      <TOEViewsDiagram />

      <KeyLearningPoints points={[
        "PAC is the gold standard but PAC-Man trial showed no mortality benefit from routine use",
        "Oesophageal Doppler FTc <330 ms suggests hypovolaemia — used for GDT",
        "Uncalibrated systems (FloTrac) are convenient but less accurate in vasoplegia",
        "Echocardiography identifies the cause of shock — not just the haemodynamic profile",
      ]} />

      <QuizSection questions={cardiacOutputMonitoringQuestions} />
      <ReferencesList topicId="cardiac-output-monitoring" />

      <SeeAlso topicId="cardiac-output-monitoring" />
        <TopicCompletionToggle topicId="cardiac-output-monitoring" topicTitle="Cardiac Output Monitoring" />
    </SectionLayout>
  );
};

export default CardiacOutputMonitoringTopic;

import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { CardiacOutputMonitorDiagram } from "@/components/diagrams/CardiacOutputMonitorDiagram";
import PiCCODiagram from "@/components/diagrams/PiCCODiagram";
import PACDiagram from "@/components/diagrams/PACDiagram";
import EchoDiagram from "@/components/diagrams/EchoDiagram";
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
      </section>

      <OesophagealDopplerDiagram />
      <PiCCODiagram />
      <PACDiagram />
      <EchoDiagram />

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

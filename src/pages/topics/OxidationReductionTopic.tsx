import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { RedoxElectrochemistryDiagram } from "@/components/diagrams/RedoxElectrochemistryDiagram";
import { redoxQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Define oxidation and reduction in terms of electron transfer (OIL RIG) and identify oxidising/reducing agents",
  "Explain methaemoglobinaemia: causative drugs, presentation, and treatment with methylene blue",
  "Describe the operating principle of the Clark, Severinghaus and galvanic-fuel-cell electrodes",
  "Outline the chemistry of free radicals, ischaemia–reperfusion injury, and antioxidant defence",
  "Apply N-acetylcysteine pharmacology to paracetamol toxicity (NAPQI / glutathione)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Methaemoglobinaemia after topical anaesthesia",
    scenario:
      "A patient is given prilocaine spray for awake fibreoptic intubation. SpO₂ falls to 85% and is unresponsive to oxygen; the blood is chocolate-brown. Co-oximetry shows MetHb 25%.",
    working:
      "Prilocaine (and benzocaine, dapsone, GTN) oxidises Fe²⁺ in haem to Fe³⁺ → methaemoglobin, which cannot bind O₂.\nPulse oximetry reads SpO₂ ≈ 85% as MetHb absorbs at both 660 nm and 940 nm — the reading is unreliable above ~30% MetHb.\nMethylene blue 1–2 mg/kg IV reduces Fe³⁺ → Fe²⁺ via NADPH-methaemoglobin reductase (avoid in G6PD deficiency: risk of haemolysis).",
    answer:
      "Stop the offending drug, give 100% O₂, and treat with methylene blue 1–2 mg/kg IV. Co-oximetry (≥4 wavelengths) is required to quantify MetHb — a standard pulse oximeter cannot. Avoid methylene blue in G6PD deficiency; use ascorbic acid or exchange transfusion instead.",
    cites: ["Cross & Plunkett Ch.3"],
  },
  {
    title: "Why a Clark electrode underestimates PaO₂ if calibrated wrongly",
    scenario:
      "A blood-gas analyser reports PaO₂ 8 kPa on a sample taken from an arterial line. The ABG was drawn 15 minutes ago and left at room temperature in a plastic syringe. What's wrong?",
    working:
      "The Clark electrode is amperometric: O₂ is reduced at a platinum cathode under a polarising voltage (~0.6 V) and the resulting current is proportional to PO₂.\nIn a plastic syringe at room temperature, leucocytes continue to consume O₂ (~7%/h). Plastic also allows slow O₂ diffusion — both lower the measured PaO₂.",
    answer:
      "The PaO₂ has fallen because of ongoing leucocyte O₂ consumption and diffusion through the plastic syringe wall. ABGs should be analysed within 10 minutes; samples for delayed analysis must be stored on ice in a glass syringe.",
    cites: ["BJA Educ 2010"],
  },
];

const OxidationReductionTopic = () => {
  return (
    <TopicTemplate
      title="Oxidation, Reduction & Electrochemistry"
      subtitle="Redox reactions, clinical electrodes, and free radical biology"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
      topicId="oxidation-reduction"
      topicTitle="Oxidation, Reduction & Electrochemistry"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={redoxQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["RCoA Primary — Physics & Clinical Measurement"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["Wright 1999 (MetHb)", "BJA Educ 2010", "Cross & Plunkett Ch.3"],
        keyPoints: ["Halliwell & Gutteridge", "Wright 1999 (MetHb)", "Cross & Plunkett Ch.3", "BJA Educ 2010"],
      }}
      keyPoints={[
        { text: "OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons). Always occur together", cites: ["Halliwell & Gutteridge"] },
        { text: "Methaemoglobin: Fe²⁺ oxidised to Fe³⁺ → cannot carry O₂. Caused by prilocaine, dapsone, GTN. Treat with methylene blue (avoid in G6PD)", cites: ["Wright 1999 (MetHb)"] },
        { text: "Clark electrode (PO₂): amperometric — O₂ reduced at a platinum cathode; current ∝ PO₂", cites: ["Cross & Plunkett Ch.3"] },
        { text: "Severinghaus electrode (PCO₂): CO₂ diffuses through Teflon into NaHCO₃ → pH change measured", cites: ["BJA Educ 2010"] },
        { text: "Galvanic fuel cell: self-generating O₂ sensor (no external voltage); lead anode consumed over time", cites: ["Halliwell & Gutteridge"] },
        { text: "Free radicals have unpaired electrons — superoxide, hydroxyl radical, peroxynitrite", cites: ["Wright 1999 (MetHb)"] },
        { text: "Ischaemia–reperfusion generates ROS via xanthine oxidase — major cause of post-ROSC organ damage", cites: ["Cross & Plunkett Ch.3"] },
        { text: "N-acetylcysteine replenishes glutathione — treats paracetamol toxicity by neutralising NAPQI", cites: ["BJA Educ 2010"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Redox Chemistry in Medicine" defaultOpen>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Oxidation–reduction (redox) reactions involve the <strong>transfer of electrons</strong> between species. They are
                fundamental to energy metabolism (electron transport chain), drug metabolism (cytochrome P450), clinical measurement
                (Clark and Severinghaus electrodes), and pathology (free radical injury).
              </p>
              <p>
                Remember <strong>OIL RIG</strong> — Oxidation Is Loss (of electrons), Reduction Is Gain. The species that loses
                electrons is <strong>oxidised</strong> and acts as the <strong>reducing agent</strong>; the species that gains
                electrons is <strong>reduced</strong> and acts as the <strong>oxidising agent</strong>.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Interactive Diagram">
            <RedoxElectrochemistryDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="methaemoglobin" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Methaemoglobinaemia">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Methaemoglobin is haemoglobin in which iron has been <strong>oxidised from Fe²⁺ to Fe³⁺</strong>. MetHb cannot bind
                oxygen and shifts the dissociation curve of remaining HbO₂ to the left, worsening tissue hypoxia. Common precipitants:
                <strong> prilocaine, benzocaine, dapsone, GTN, sulphonamides, and inhaled nitric oxide</strong>.
              </p>
              <p>
                Clinical clues: cyanosis unresponsive to O₂, chocolate-brown blood, SpO₂ that 'sticks' near 85% regardless of FiO₂.
                Confirm with co-oximetry. Treat with <strong>methylene blue 1–2 mg/kg IV</strong> (acts via NADPH–methaemoglobin
                reductase). Methylene blue is itself an oxidiser at high doses and is contraindicated in G6PD deficiency — use ascorbic
                acid or exchange transfusion instead.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="electrodes" exams={[Exam.PRIMARY]} curriculumCodes={["RCoA Primary — Clinical Measurement"]}>
            <CollapsibleSubsection title="Clinical Electrodes">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Clark electrode (PO₂)</strong>: amperometric. A polarising voltage (~0.6 V) is applied between a platinum
                cathode and a silver/silver-chloride anode in KCl electrolyte. O₂ diffuses through a polypropylene membrane and is
                reduced at the cathode; the resulting current is proportional to PO₂.
              </p>
              <p>
                <strong>Severinghaus electrode (PCO₂)</strong>: CO₂ diffuses across a Teflon membrane into a thin film of sodium
                bicarbonate solution, forming carbonic acid and lowering the pH. The pH change is measured by a glass electrode and
                converted to PCO₂.
              </p>
              <p>
                <strong>Galvanic (fuel) cell</strong>: self-generating O₂ analyser used in anaesthetic machines. A lead anode is
                gradually consumed (oxidised); no external voltage is required. Slow response (~20 s) but no calibration drift.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="free-radicals" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Free Radicals & Ischaemia–Reperfusion">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Free radicals contain an unpaired electron and are highly reactive. Reactive oxygen species (ROS) include
                <strong> superoxide (O₂⁻·), hydroxyl radical (OH·) and peroxynitrite (ONOO⁻)</strong>. Endogenous antioxidants —
                superoxide dismutase, catalase, glutathione, and dietary vitamins C and E — keep ROS in check.
              </p>
              <p>
                <strong>Ischaemia–reperfusion injury</strong> generates a burst of ROS via the conversion of xanthine dehydrogenase to
                xanthine oxidase during ischaemia, producing superoxide on reperfusion. This is a major contributor to post-ROSC
                organ damage, hepatic transplant failure and stunned myocardium. <strong>N-acetylcysteine</strong> replenishes
                glutathione and is used to detoxify NAPQI in paracetamol overdose.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
        </>
      }
    />
  );
};

export default OxidationReductionTopic;

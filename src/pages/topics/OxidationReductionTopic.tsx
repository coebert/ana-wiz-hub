import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const oxidationReductionFaqs: Array<[string, string]> = [
  ["Why is methaemoglobin clinically dangerous?", "In methaemoglobin the haem iron is oxidised from Fe²⁺ to Fe³⁺ and cannot bind oxygen, while remaining haems bind O₂ more tightly (left-shifted curve) — so tissue delivery falls. Levels >15% cause cyanosis unresponsive to oxygen; >50% cause coma; >70% are fatal. Treat with IV methylene blue 1–2 mg/kg, which regenerates Fe²⁺ via NADPH-methaemoglobin reductase."],
  ["How does a fuel cell oxygen analyser work?", "A galvanic (fuel) cell consumes O₂ at a lead anode (Pb → Pb²⁺ + 2e⁻), generating a current proportional to O₂ partial pressure at the gold cathode (O₂ + 2H₂O + 4e⁻ → 4OH⁻). It is self-powered, accurate to ±3%, and lasts ~12 months because the anode is consumed."],
  ["Which inhaled anaesthetics are degraded by CO₂ absorbents?", "Sevoflurane reacts with strong bases (KOH, NaOH) in soda-lime to form Compound A, a vinyl ether with renal toxicity in rats. Desflurane, isoflurane and enflurane react with dry CO₂ absorbent to generate carbon monoxide. Both risks are mitigated by using KOH/NaOH-free absorbents (e.g. Amsorb Plus) and avoiding desiccated absorbent."],
];
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { InlineRef } from "@/components/references/InlineRef";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { RedoxElectrochemistryDiagram } from "@/components/diagrams/chemistry/RedoxElectrochemistryDiagram";
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


          <ExamSection id="electrode-potentials" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Standard Electrode Potentials">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The <strong>standard electrode potential (E⁰)</strong> of a half-reaction is measured relative to the
                <strong> standard hydrogen electrode</strong> (2H⁺ + 2e⁻ ⇌ H₂, defined as E⁰ = 0.0 V) under standard conditions
                (298 K, 1 atm, 1 M concentration). A <strong>positive E⁰</strong> indicates a strong oxidising agent (high
                affinity for electrons); a <strong>negative E⁰</strong> indicates a strong reducing agent (tends to donate
                electrons). <InlineRef topicId="oxidation-reduction" refLabel="Cross & Plunkett Ch.3" />
              </p>
              <p>
                Selected half-reactions, arranged as an electrochemical series (most oxidising at top):
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>O₂ + 4H⁺ + 4e⁻ → 2H₂O: E⁰ = <strong>+1.23 V</strong> (standard conditions); falls to ≈ <strong>+0.82 V at pH 7</strong> because the Nernst equation is H⁺-dependent</li>
                <li>Cytochrome c (Fe³⁺/Fe²⁺): E⁰ ≈ <strong>+0.25 V</strong></li>
                <li>NAD⁺/NADH: E⁰ = <strong>−0.32 V</strong> (strong reducing couple)</li>
              </ul>
              <p>
                In the mitochondrial electron transport chain, electrons flow from couples with the most negative E⁰ (NADH) to
                the most positive (O₂), releasing free energy at each step (ΔG = −nFΔE⁰) that is used to pump protons and drive
                ATP synthase. The larger the potential difference between donor and acceptor, the greater the energy released.
              </p>
              <p>
                The <strong>Nernst equation</strong>, E = E⁰ − (RT/nF)lnQ, describes how the actual electrode potential varies
                with the concentration (activity) of reactants and products (Q) around the standard value, where R is the gas
                constant, T absolute temperature, n the number of electrons transferred, and F the Faraday constant. This
                concentration-dependence is the working principle of ion-selective electrodes (pH glass electrode, Na⁺/K⁺
                electrodes) and explains why electrode readings shift predictably with analyte concentration rather than being
                fixed. <InlineRef topicId="oxidation-reduction" refLabel="BJA Educ 2010" />
              </p>
            </div>
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
                <strong>Galvanic (fuel) cell</strong>: a self-contained battery-like O₂ analyser used for the constant-threshold
                O₂ alarm on the anaesthetic machine backbar. It generates a current proportional to pO₂ without needing any
                external polarising voltage — the chemical reaction itself is the power source. A <strong>lead anode</strong>
                and <strong>gold cathode</strong> sit in a <strong>potassium hydroxide (KOH)</strong> electrolyte: at the anode,
                Pb + 2OH⁻ → PbO + H₂O + 2e⁻; at the cathode, O₂ + 2H₂O + 4e⁻ → 4OH⁻. Because the lead anode is progressively
                consumed, cell lifespan is finite — typically <strong>1–2 years</strong>, and cells are rated in
                <strong> ampere-hours (or "oxygen-hours")</strong> of remaining life. Response is relatively slow
                (~<strong>20 s</strong>), but there is no calibration drift over the short term, making it well suited to
                constant-threshold alarm duty rather than breath-by-breath analysis.
              </p>
              <p>
                By contrast, the <strong>polarographic (Clark) electrode</strong> requires an externally applied polarising
                voltage (~<strong>600 mV</strong>) to drive O₂ reduction at its platinum cathode. It responds faster but is
                prone to calibration drift and membrane fouling, requiring more frequent recalibration than the galvanic cell.
                <InlineRef topicId="oxidation-reduction" refLabel="Cross & Plunkett Ch.3" />
              </p>

              <p>
                <strong>Ion-selective electrodes (ISE)</strong>: an ion-specific membrane — glass for H⁺/Na⁺, valinomycin for
                K⁺, or an ion-exchange resin for Ca²⁺ and Cl⁻ — develops a potential difference across it that is described by
                the <strong>Nernst equation</strong>, measured against a reference electrode under zero-current
                (<strong>potentiometric</strong>) conditions. ISEs measure ion <strong>activity</strong>, not concentration, so
                results are affected by protein and lipid content in the sample; measuring <strong>directly</strong> with an
                ISE on a blood gas analyser avoids the <strong>pseudohyponatraemia</strong> seen with indirect, diluted
                flame-photometric methods in samples with high protein or lipid content.
                <InlineRef topicId="oxidation-reduction" refLabel="BJA Educ 2010" />
              </p>
              <p>
                <strong>Glucose sensor</strong>: amperometric. Glucose oxidase oxidises glucose to gluconolactone, generating
                <strong> hydrogen peroxide</strong>; the H₂O₂ is then oxidised at a polarised platinum anode
                (~<strong>+0.6 V</strong>), producing a current proportional to glucose concentration — a
                <strong> Clark-type cell</strong> arrangement. Readings can be affected by interfering substances such as
                <strong> paracetamol, ascorbate and icodextrin</strong>. <InlineRef topicId="oxidation-reduction" refLabel="BJA Educ 2010" />
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
                <strong>Oxygen toxicity</strong>: hyperoxia drives excess mitochondrial and enzymatic production of
                <strong> superoxide (O₂⁻·)</strong>, which is dismutated to <strong>hydrogen peroxide</strong> and then, via
                iron-catalysed Fenton and Haber-Weiss chemistry, to the highly reactive <strong>hydroxyl radical (OH·)</strong>.
                When generation overwhelms endogenous defences — superoxide dismutase, catalase and glutathione peroxidase —
                the result is <strong>lipid peroxidation</strong> of cell membranes and <strong>DNA damage</strong>.
                <InlineRef topicId="oxidation-reduction" refLabel="Halliwell & Gutteridge" />
              </p>
              <p>
                <strong>Clinical manifestations</strong> are pulmonary and CNS. Pulmonary: tracheobronchitis with substernal
                chest pain and cough after roughly <strong>12–24 hours</strong> at FiO₂ 1.0, reduced vital capacity, and
                <strong> absorption atelectasis</strong>; prolonged exposure progresses to diffuse alveolar damage with an
                ARDS-like picture. CNS: the <strong>Paul Bert effect</strong> — seizures, tunnel vision, nausea and twitching —
                occurs when PiO₂ exceeds roughly <strong>2 atmospheres</strong>, relevant to hyperbaric oxygen therapy. In
                neonates, hyperoxia is implicated in <strong>retinopathy of prematurity</strong> and
                <strong> bronchopulmonary dysplasia</strong>.
              </p>
              <p>
                Toxicity is <strong>dose- and time-dependent</strong>: it relates to the product of PiO₂ and duration of
                exposure, not FiO₂ alone — so FiO₂ 1.0 at altitude, at sea level, or under hyperbaric conditions carries very
                different risk. Prevention: use the <strong>lowest FiO₂</strong> that achieves a target SpO₂ of
                <strong> 92–96%</strong> (or <strong>88–92%</strong> in chronic hypercapnic respiratory failure), use
                <strong> PEEP, recruitment and prone positioning</strong> to reduce the FiO₂ required, avoid hyperoxia after
                cardiac arrest and in traumatic brain injury, and be alert to drugs that increase susceptibility to oxygen
                free-radical injury such as <strong>paraquat</strong> and <strong>bleomycin</strong>.
                <InlineRef topicId="oxidation-reduction" refLabel="BJA Educ Oxygen Toxicity 2016" />
              </p>
              <p>
                <strong>Paracetamol toxicity</strong>: normally, paracetamol is metabolised mainly by conjugation — approximately
                <strong> 60% glucuronidation</strong> and <strong>35% sulphation</strong> — with only around <strong>5%</strong>
                oxidised by cytochrome P450 (CYP2E1, 1A2, 3A4) to the reactive metabolite <strong>NAPQI</strong>. In overdose,
                the conjugation pathways saturate, so a much larger fraction is shunted through CYP2E1 to NAPQI.
                <InlineRef topicId="oxidation-reduction" refLabel="BJA Educ Paracetamol 2021" />
              </p>
              <p>
                NAPQI is a reactive electrophile normally detoxified by conjugation with <strong>glutathione</strong>. Once
                hepatic glutathione stores fall below roughly <strong>30% of normal</strong>, NAPQI instead binds cysteine
                residues on cellular proteins, forming <strong>NAPQI-protein adducts</strong>. This drives oxidative stress,
                <strong> mitochondrial permeability transition</strong> and ATP failure, culminating in
                <strong> centrilobular (zone 3) hepatocellular necrosis</strong>. Risk is increased by chronic alcohol use,
                enzyme induction, malnutrition/low baseline glutathione, and staggered overdose.
              </p>
              <p>
                <strong>N-acetylcysteine (NAC)</strong> acts as a cysteine/glutathione precursor, replenishing hepatic
                glutathione and allowing direct conjugation of NAPQI; it also improves microcirculatory oxygen delivery. It is
                most effective when given within <strong>8 hours</strong> of ingestion. UK practice uses a single
                <strong> 100 mg/L treatment line at 4 hours</strong> on the <strong>Rumack–Matthew nomogram</strong> to decide
                on treatment, with the <strong>SNAP 12-hour NAC regimen</strong>. Patients meeting <strong>King's College
                criteria</strong> (e.g. pH &lt;7.3, or the combination of INR &gt;6.5, creatinine &gt;300 µmol/L and grade
                III/IV encephalopathy) should be referred for liver transplant assessment.
                <InlineRef topicId="oxidation-reduction" refLabel="Rumack-Matthew Nomogram" />
              </p>
              <p>
                <strong>Ischaemia–reperfusion injury</strong> generates a burst of ROS via the conversion of xanthine dehydrogenase to
                xanthine oxidase during ischaemia, producing superoxide on reperfusion. This is a major contributor to post-ROSC
                organ damage, hepatic transplant failure and stunned myocardium. <strong>N-acetylcysteine</strong> replenishes
                glutathione and is used to detoxify NAPQI in paracetamol overdose.
              </p>
              <p>
                <strong>Propofol infusion syndrome (PRIS)</strong> illustrates redox-linked cellular energy failure rather than
                pure free-radical injury: propofol impairs the mitochondrial respiratory chain at <strong>Complex I and Complex
                IV</strong> and inhibits <strong>carnitine palmitoyltransferase I</strong>, blocking entry of long-chain fatty
                acids into mitochondria and preventing β-oxidation. The resulting failure of ATP generation produces
                rhabdomyolysis, bradyarrhythmia progressing to cardiac failure, severe lactic acidosis, and hepatomegaly.
                Accumulation of ROS from a dysfunctional electron transport chain contributes to the picture, but the primary
                pathology is cellular energy failure rather than oxidative injury per se. Risk rises with infusions
                <strong> &gt;4 mg/kg/h continued beyond 48 hours</strong>. <InlineRef topicId="oxidation-reduction" refLabel="BJA PRIS 2019" />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <TopicFaqs faqs={oxidationReductionFaqs} />
        </>
      }
    />
  );
};

export default OxidationReductionTopic;

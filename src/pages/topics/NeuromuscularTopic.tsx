import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { WorkedExample } from "@/components/WorkedExamples";
import { NMJDiagram } from "@/components/diagrams/NMJDiagram";
import NeuromuscularMonitoringDiagram from "@/components/diagrams/NeuromuscularMonitoringDiagram";
import { neuromuscularQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Describe the sequence of events at the neuromuscular junction from action potential arrival to ACh hydrolysis.",
  "Identify the subunit composition of adult, fetal/extrajunctional, and pre-junctional nicotinic receptors.",
  "Explain the safety margin of NM transmission and its relevance to TOF monitoring.",
  "Predict altered sensitivity to neuromuscular blocking agents in myasthenia, Lambert–Eaton, burns, and ICU immobility.",
  "Recognise pharmacological and pathological causes of NM transmission failure in the perioperative period.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Suxamethonium hyperkalaemia in a burns patient",
    scenario: (
      <>
        A 35-year-old man is admitted to the burns unit 5 days after a 40% TBSA flame injury. He requires
        emergency theatre for debridement. The trainee asks about RSI agents — would suxamethonium be safe?
      </>
    ),
    working: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Major burns (and denervation, prolonged immobility, sepsis, stroke) trigger up-regulation of
            <strong> extrajunctional fetal-type nAChRs (α₂βδγ)</strong> across the entire muscle membrane —
            not just the end-plate.
          </li>
          <li>
            The γ subunit prolongs channel open time and lowers conductance — but the receptors are
            massively more numerous, so depolarisation by suxamethonium opens vast numbers of channels
            simultaneously.
          </li>
          <li>
            Each open channel allows K⁺ efflux → potassium release can be 2–5× the normal 0.5 mmol/L rise,
            triggering hyperkalaemic cardiac arrest.
          </li>
          <li>Risk window: from ~24–48 h post-injury until full healing/rehabilitation (months).</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Avoid suxamethonium beyond 24 h post-burn. Use rocuronium 1.2 mg/kg with sugammadex available, or a
        modified RSI with high-dose rocuronium for rapid intubation. Same caution applies to denervation
        injury, prolonged ICU stay (&gt;1 week), and Guillain–Barré.
      </>
    ),
    cites: ["Power & Kam Ch.15"],
  },
  {
    title: "Interpreting train-of-four fade",
    scenario: (
      <>
        At end of surgery the TOF count is 4 with TOFR 0.4. What proportion of receptors is still occupied,
        and what is the appropriate reversal strategy with rocuronium-induced block?
      </>
    ),
    working: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>
            The NMJ has ~70% safety margin — clinical weakness only emerges when receptor occupancy exceeds
            ~75%. TOFR 0.4 corresponds to ~70–80% receptor occupancy.
          </li>
          <li>
            Fade reflects pre-junctional α₃β₂ block — non-depolarisers block positive feedback that
            normally mobilises ACh during repetitive stimulation.
          </li>
          <li>
            Neostigmine works only when TOFR ≥ 0.4 (≥2 twitches reliably present). Sugammadex encapsulates
            steroidal NMBAs and reverses any depth: 2 mg/kg if TOFR ≥ 0.2, 4 mg/kg for deep block, 16 mg/kg
            for immediate rescue after rocuronium 1.2 mg/kg.
          </li>
        </ul>
      </>
    ),
    answer: (
      <>
        Sugammadex 2 mg/kg is the cleanest option — predictable, complete reversal within ~2 min. Aim for
        TOFR &gt; 0.9 before extubation; residual block (TOFR 0.7–0.9) increases postoperative pulmonary
        complications, hypoxaemia, and aspiration risk.
      </>
    ),
    cites: ["Assoc Anaesth 2023 (NMB)", "BJA Educ 2018 (NMJ)"],
  },
];

const NeuromuscularTopic = () => {
  return (
    <TopicTemplate
      title="Neuromuscular Transmission"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="neuromuscular"
      topicTitle="Neuromuscular Transmission"
      quizQuestions={neuromuscularQuiz}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["NA_BK_03"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["NA_BK_03", "OA_BK_03"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2018 (NMJ)", "Power & Kam Ch.15"],
        workedExamples: ["BJA Educ 2018 (NMJ)", "Assoc Anaesth 2023 (NMB)", "Power & Kam Ch.15"],
        keyPoints: ["BJA Educ 2018 (NMJ)", "Ganong Ch.5", "Power & Kam Ch.15"],
      }}
      keyPoints={[
        { text: "Adult nAChR subunit composition is α₂βδε; fetal/extrajunctional receptors contain γ instead of ε.", cites: ["Ganong Ch.5"] },
        { text: "Two ACh molecules must bind (one per α subunit) to open the nAChR channel.", cites: ["Power & Kam Ch.15"] },
        { text: "AChE rapidly hydrolyses ACh to choline + acetate; choline is recycled via active reuptake.", cites: ["BJA Educ 2018 (NMJ)"] },
        { text: "The safety margin means ~75% receptor occupancy before fade appears, ~80% before single twitch depression, >90% for complete block.", cites: ["Ganong Ch.5"] },
        { text: "Pre-junctional nAChRs (predominantly α₃β₂) mediate positive feedback — their block by non-depolarising agents explains train-of-four fade.", cites: ["BJA Educ 2018 (NMJ)"] },
        { text: "Extrajunctional receptor upregulation (burns, denervation, ICU immobility) causes suxamethonium-induced hyperkalaemia.", cites: ["BJA Educ 2018 (NMJ)"] },
        { text: "Sugammadex dosing: 2 mg/kg if TOFR ≥0.2, 4 mg/kg for deep block, 16 mg/kg for immediate rescue after rocuronium 1.2 mg/kg (Assoc Anaesth 2023; BNF).", cites: ["Assoc Anaesth 2023 (NMB)"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["NA_BK_03"]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              Neuromuscular transmission is the process by which a motor nerve impulse is converted into
              muscle contraction at the neuromuscular junction (NMJ). Understanding this process is
              essential for anaesthetists, as it underpins the pharmacology of neuromuscular blocking
              agents, their reversal, and neuromuscular monitoring.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sequence" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["NA_BK_03"]}>
            <CollapsibleSubsection title="Sequence of Events">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <NMJDiagram />
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">1. Action Potential Arrival</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  A motor nerve action potential propagates along the myelinated axon to the nerve terminal.
                  The terminal is unmyelinated and contains ~300,000 vesicles, each containing approximately
                  5,000–10,000 molecules of acetylcholine (ACh).
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">2. Calcium Influx</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Depolarisation of the nerve terminal opens voltage-gated calcium channels (P/Q-type). Ca²⁺
                  influx is essential for vesicle fusion — blocking these channels (e.g., Lambert–Eaton
                  syndrome, aminoglycosides) impairs neuromuscular transmission.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">3. Vesicle Fusion & ACh Release</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Ca²⁺ triggers the SNARE protein complex (synaptobrevin, SNAP-25, syntaxin) to fuse vesicles
                  with the pre-synaptic membrane (exocytosis). Approximately 200–300 vesicles release their
                  ACh content into the synaptic cleft — far more than needed (safety margin of ~70%).
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">4. ACh Binds Nicotinic Receptors</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  ACh crosses the 50 nm synaptic cleft and binds to nicotinic acetylcholine receptors (nAChR)
                  on the post-synaptic motor end plate. The adult nAChR has the subunit composition{" "}
                  <strong>α₂βδε</strong>. Two ACh molecules must bind (one to each α subunit) to open the
                  channel.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">5. End-Plate Potential</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Channel opening allows Na⁺ influx (and K⁺ efflux), producing a localised depolarisation —
                  the end-plate potential (EPP). If the EPP exceeds threshold (~−55 mV), it triggers a
                  propagating muscle action potential via adjacent voltage-gated Na⁺ channels, leading to
                  excitation–contraction coupling.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">6. ACh Hydrolysis</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Acetylcholinesterase (AChE), concentrated in the synaptic cleft, rapidly hydrolyses ACh to
                  choline and acetate. Choline is actively reuptaken into the nerve terminal for resynthesis
                  of ACh by choline acetyltransferase (ChAT). This rapid termination ensures each nerve
                  impulse produces a single, discrete muscle twitch.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="receptors" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["NA_BK_03"]}>
            <CollapsibleSubsection title="Receptor Subtypes at the NMJ">
            <p className="text-foreground/90 leading-relaxed">There are multiple receptor types at the NMJ:</p>
            <ul className="mt-3 space-y-2 text-foreground/80">
              <li>
                <strong>Post-junctional nAChR (α₂βδε)</strong> — the primary target for neuromuscular blocking
                agents. Non-depolarising agents compete with ACh at the α subunits.
              </li>
              <li>
                <strong>Pre-junctional nAChR (predominantly α₃β₂)</strong> — facilitate positive feedback, mobilising more
                ACh vesicles during sustained activity (explains fade with non-depolarising block). Other nicotinic and
                muscarinic subtypes also contribute to modulating ACh release.
              </li>
              <li>
                <strong>Fetal/extrajunctional nAChR (α₂βδγ)</strong> — contain the γ subunit instead of ε.
                They have a longer channel open time and lower conductance. Upregulated in denervation,
                burns, and immobilisation — causing hyperkalaemia with suxamethonium.
              </li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="safety-margin" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["NA_BK_03"]}>
            <CollapsibleSubsection title="The Safety Margin">
            <p className="text-foreground/90 leading-relaxed">
              The NMJ has a large safety margin: approximately 70–80% of receptors must be blocked before
              clinical weakness becomes apparent, and {'>'}90% must be blocked for complete paralysis. This
              is exploited in neuromuscular monitoring — train-of-four fade appears when ~75% of receptors
              are occupied, and single twitch depression requires ~80% blockade.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <NeuromuscularMonitoringDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="clinical" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["OA_BK_03"]}>
            <CollapsibleSubsection title="Clinical Relevance">
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-sm font-medium text-foreground">Conditions Affecting NM Transmission</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• <strong>Myasthenia Gravis</strong> — autoantibodies against post-junctional nAChR; increased sensitivity to non-depolarising agents</li>
                <li>• <strong>Lambert–Eaton Syndrome</strong> — antibodies against pre-synaptic Ca²⁺ channels; post-tetanic potentiation occurs</li>
                <li>• <strong>Burns/Denervation</strong> — upregulation of extrajunctional receptors; risk of hyperkalaemia with suxamethonium</li>
                <li>• <strong>Aminoglycosides</strong> — reduce pre-synaptic Ca²⁺ entry and potentiate neuromuscular block</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Suxamethonium hyperkalaemia</strong>: avoid in burns &gt;24 h, denervation, prolonged immobility, muscular dystrophy — extrajunctional receptor upregulation.</>,
              <><strong>Myasthenia gravis</strong>: sensitive to non-depolarisers, resistant to sux — titrate to TOF.</>,
              <><strong>Always reverse to TOF ratio ≥0.9</strong>: residual block at 0.7–0.9 is invisible clinically but doubles postoperative pulmonary complications.</>,
              <><strong>Sugammadex</strong> chelates rocuronium/vecuronium in any depth of block — does not work for benzylisoquinoliniums; rebleed risk after 24 h with hormonal contraception.</>,
              <><strong>Pseudocholinesterase deficiency</strong>: prolonged sux block — sedate and ventilate until block reverses; check dibucaine number postoperatively.</>,
            ]}
          />
        </>
      }
    />
  );
};

export default NeuromuscularTopic;

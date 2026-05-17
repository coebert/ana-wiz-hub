import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { DiagramSection } from "@/components/DiagramSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { pharmacodynamicsQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { DoseResponseCurveDiagram } from "@/components/diagrams/DoseResponseCurveDiagram";
import { AgonismSpectrumDiagram } from "@/components/diagrams/AgonismSpectrumDiagram";
import { ReceptorTimescaleDiagram } from "@/components/diagrams/ReceptorTimescaleDiagram";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Distinguish potency (EC₅₀) from efficacy (Emax) and read sigmoid log dose-response curves",
  "Classify drugs as full / partial / inverse agonists, and competitive / non-competitive antagonists",
  "Predict the effect of a partial agonist on a full agonist response (e.g. buprenorphine vs morphine)",
  "Match receptor types to time-course (ion channel ms, GPCR seconds, kinase min-h, nuclear h-d)",
  "Explain tachyphylaxis, tolerance, synergism, and clinically important enzyme induction/inhibition",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Buprenorphine in a patient on chronic morphine",
    scenario:
      "A patient on regular morphine 60 mg PO for chronic pain is started on sublingual buprenorphine 8 mg for substitution therapy. Within hours she develops withdrawal symptoms. Why?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Classify each drug.</strong> Morphine = full μ-agonist (intrinsic activity ≈ 1). Buprenorphine = high-affinity <strong>partial</strong> μ-agonist (intrinsic activity ≈ 0.4) and κ-antagonist.</li>
          <li><strong>Compare receptor affinity.</strong> Buprenorphine Ki ≈ 0.2 nM vs morphine Ki ≈ 1.8 nM → buprenorphine binds ~10× more tightly.</li>
          <li><strong>Predict the result.</strong> When given to a μ-saturated patient, buprenorphine <strong>displaces</strong> morphine but only delivers a partial signal → net opioid effect falls → precipitated withdrawal.</li>
          <li><strong>Quantify the timing.</strong> Withdrawal onset is rapid (minutes-hours) because buprenorphine reaches peak occupancy within 1–2 h sublingually.</li>
          <li><strong>Apply the safe induction rule.</strong> Wait until COWS ≥ 12 (objective withdrawal) OR use the Bernese 'micro-induction' (0.2 mg buprenorphine repeated while continuing the full agonist).</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Key pharmacology to recall</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Buprenorphine has a <strong>ceiling effect on respiratory depression</strong> but not on analgesia.</li>
          <li>Reversal needs HIGH-dose naloxone infusion (e.g. 4 mg/h) due to high receptor affinity.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Treating buprenorphine like a weak opioid — its high affinity blocks subsequent full agonists in theatre.</li>
            <li>Standard naloxone bolus (400 µg) failing to reverse buprenorphine and being misread as 'not opioid'.</li>
            <li>Stopping the buprenorphine perioperatively without a plan — withdrawal + uncontrolled pain ensues.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Buprenorphine displaced morphine from the μ-receptor; its lower intrinsic activity provided a smaller signal → precipitated withdrawal. Always wait for objective withdrawal (COWS ≥ 12) before initiating buprenorphine in opioid-dependent patients (the 'micro-induction' or Bernese protocol minimises this risk).",
    cites: ["Rang & Dale Ch.2"],
  },
  {
    title: "Reading a parallel right-shift on a dose-response curve",
    scenario:
      "An exam graph shows a noradrenaline log dose-response curve (control), and a second curve shifted to the right with an unchanged Emax. Which class of antagonist explains this, and which doesn't?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step interpretation</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Read the axes.</strong> X-axis is log[agonist]; Y-axis is response (% Emax).</li>
          <li><strong>Identify the change.</strong> Curve shifted right (↑ EC₅₀) but Emax unchanged → the agonist can still achieve maximum response, just needs more.</li>
          <li><strong>Match to mechanism.</strong> Parallel rightward shift with preserved Emax = <strong>competitive (surmountable) antagonism</strong>.</li>
          <li><strong>Contrast with non-competitive.</strong> Irreversible/allosteric antagonists give a depressed curve (↓ Emax), not a parallel shift.</li>
          <li><strong>Apply Schild analysis.</strong> Dose ratio (DR) = EC₅₀(antagonist)/EC₅₀(control). pA₂ is the −log of antagonist concentration that produces DR = 2 — a measure of antagonist potency.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Worked numbers</p>
        <ul className="list-disc list-inside space-y-1">
          <li>If control EC₅₀ = 10⁻⁸ M and antagonist EC₅₀ = 10⁻⁶ M → DR = 100 → log(DR−1) = ~2 → strong competitive blockade.</li>
        </ul>
        <p className="font-semibold text-foreground mt-2">Examples to memorise</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Competitive at α₁:</strong> phentolamine. <strong>Irreversible at α₁:</strong> phenoxybenzamine (the phaeochromocytoma curve).</li>
          <li><strong>Competitive at nAChR:</strong> non-depolarising NMBs (atracurium). <strong>Channel block:</strong> ketamine at NMDA.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Confusing 'partial agonist' with 'competitive antagonist' — partial agonists give a curve with REDUCED Emax even alone.</li>
            <li>Reading 'shift' from a linear (not log) plot — the dose-response only looks parallel on a log scale.</li>
            <li>Calling a curve flattened by toxicity 'non-competitive antagonism' — confounder, not pharmacology.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "A competitive (surmountable) antagonist such as phentolamine. A non-competitive antagonist (e.g. phenoxybenzamine) would lower Emax. Recognising shift vs depression is a high-yield FRCA Primary visual question.",
    cites: ["BJA Educ 2016"],
  },
];

const PharmacodynamicsTopic = () => {
  return (
    <TopicTemplate
      title="Pharmacodynamics & Drug Receptors"
      subtitle="Dose-response, agonism, antagonism, and receptor signal transduction"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="pharmacodynamics"
      topicTitle="Pharmacodynamics & Drug Receptors"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={pharmacodynamicsQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["RCoA Primary — Pharmacology"] },
        
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Peck & Hill Ch.2",
          "Rang & Dale Ch.2",
          "Peck & Hill Ch.2",
        ],
        diagrams: [
          "Peck & Hill Ch.2",
          "Rang & Dale Ch.2",
        ],
        workedExamples: [
          "BJA Educ 2016",
          "BJA Educ 2016",
          "Rang & Dale Ch.2",
        ],
        keyPoints: [
          "Rang & Dale Ch.2",
          "Rang & Dale Ch.2",
          "Peck & Hill Ch.2",
        
          "BJA Educ 2016",
        ],
      }}
      keyPoints={[
        { text: "Potency = EC₅₀ (position on x-axis); Efficacy = Emax (maximal response achievable)", cites: ["Peck & Hill Ch.2"] },
        { text: "Competitive antagonist: shifts curve RIGHT, Emax preserved. Non-competitive: ↓ Emax, insurmountable", cites: ["Rang & Dale Ch.2"] },
        { text: "Partial agonist can antagonise a full agonist when both are present (e.g., buprenorphine vs morphine)", cites: ["BJA Educ 2016"] },
        { text: "4 receptor types: ion channel (ms), GPCR (seconds), kinase-linked (min-hours), nuclear (hours-days)", cites: ["Peck & Hill Ch.2"] },
        { text: "Gαs → ↑cAMP (β₁), Gαi → ↓cAMP (M₂, μ-opioid), Gαq → IP₃/DAG (α₁, M₁)", cites: ["Rang & Dale Ch.2"] },
        { text: "Tachyphylaxis: receptor desensitisation, internalisation, or mediator depletion (ephedrine)", cites: ["BJA Educ 2016"] },
        { text: "Therapeutic index = TD₅₀/ED₅₀. Narrow TI: digoxin, warfarin, lithium, phenytoin, theophylline", cites: ["Peck & Hill Ch.2"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="dose-response" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Dose-Response Relationships" defaultOpen>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Dose-response curve</strong>: hyperbolic. Log(dose)-response: sigmoid. Emax is the maximal response; EC₅₀ is the concentration producing 50% Emax</li>
              <li><strong>Potency</strong>: position of curve on x-axis (EC₅₀). More potent = lower EC₅₀. Example: fentanyl is more potent than morphine</li>
              <li><strong>Efficacy</strong>: maximal effect achievable (Emax). Full agonist has high efficacy; partial agonist has lower Emax regardless of dose</li>
              <li><strong>Therapeutic index</strong>: TD₅₀/ED₅₀ (or LD₅₀/ED₅₀). Narrow TI drugs: digoxin, warfarin, lithium, phenytoin, theophylline</li>
            </ul>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <DoseResponseCurveDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="agonists-antagonists" exams={[Exam.PRIMARY]} curriculumCodes={["RCoA Primary — Pharmacology"]}>
            <CollapsibleSubsection title="Agonists & Antagonists">
            <div className="space-y-3">
              {[
                { type: "Full agonist", desc: "Binds receptor, produces maximal response. Intrinsic activity = 1. Examples: morphine (μ), adrenaline (α₁, β₁, β₂)." },
                { type: "Partial agonist", desc: "Binds receptor, submaximal response even at full occupancy. Intrinsic activity 0-1. Can antagonise a full agonist when both present. Examples: buprenorphine (μ), pindolol (β)." },
                { type: "Competitive antagonist", desc: "Binds same site as agonist reversibly. Shifts dose-response curve RIGHT (↑ EC₅₀) but Emax preserved (surmountable). Examples: atracurium (nAChR), naloxone (μ)." },
                { type: "Non-competitive antagonist", desc: "Binds different site or irreversibly. ↓ Emax (insurmountable). Curve depressed, not shifted. Examples: phenoxybenzamine (α₁, irreversible), ketamine (NMDA, channel block)." },
                { type: "Inverse agonist", desc: "Binds receptor, produces opposite effect to agonist. Reduces constitutive activity below baseline. Example: some benzodiazepine site ligands." },
              ].map(item => (
                <div key={item.type} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.type}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <AgonismSpectrumDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="receptors" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Receptor Types & Signal Transduction">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Type</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Speed</th>
                  <th className="text-left py-2 text-foreground font-semibold">Examples</th>
                </tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ligand-gated ion channel</td><td>Direct ion flow</td><td>Milliseconds</td><td>nAChR (Na⁺), GABA_A (Cl⁻), 5-HT₃, NMDA (Ca²⁺)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">G-protein coupled (GPCR)</td><td>Gαs/Gαi/Gαq → second messengers</td><td>Seconds</td><td>β₁ (Gαs→cAMP↑), M₂ (Gαi→cAMP↓), α₁ (Gαq→IP₃/DAG)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Kinase-linked</td><td>Tyrosine kinase phosphorylation</td><td>Minutes–hours</td><td>Insulin receptor, growth factor receptors</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Nuclear/intracellular</td><td>Gene transcription</td><td>Hours–days</td><td>Steroid receptors, thyroid hormone, vitamin D</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <ReceptorTimescaleDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="interactions-tolerance" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Drug Interactions & Tolerance">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Synergism</strong>: combined effect &gt; sum of individual effects (e.g., propofol + remifentanil). Shown by isobolograms</li>
              <li><strong>Tachyphylaxis</strong>: rapid tolerance after repeated doses. Mechanisms: receptor desensitisation (phosphorylation), receptor internalisation, depletion of mediator (e.g., ephedrine)</li>
              <li><strong>Enzyme induction</strong>: ↑ CYP450 activity (rifampicin, phenytoin, carbamazepine) → ↓ drug effect. Takes days-weeks</li>
              <li><strong>Enzyme inhibition</strong>: ↓ CYP450 activity (erythromycin, ciprofloxacin, grapefruit) → ↑ drug effect. Rapid onset</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "Potency (ED50) and efficacy (Emax) are independent — a more potent drug is not necessarily more effective.",
              "Competitive antagonists shift the dose-response curve right with no change in Emax; non-competitive antagonists reduce Emax.",
              "Partial agonists can act as antagonists in the presence of a full agonist (e.g. buprenorphine vs morphine).",
              "Tachyphylaxis = rapid loss of effect (e.g. ephedrine); tolerance is slower receptor down-regulation.",
              "Hysteresis describes a lag between plasma concentration and effect — relevant for fentanyl, NMBDs, and ketamine.",
            ]}
          />
        </>
      }
      diagrams={
        <>
          <DiagramSection
            title="Log dose–response curves"
            intro={
              <p>
                Compare a control agonist against a partial agonist and the two
                classic antagonist patterns. Toggle each overlay to see how the
                EC₅₀ marker shifts and how Emax responds.
              </p>
            }
          >
            <DoseResponseCurveDiagram />
          </DiagramSection>

          <DiagramSection
            title="The agonism spectrum"
            intro={
              <p>
                Intrinsic activity (α) places every receptor ligand on a single
                spectrum from full agonist (α = 1) through partial agonist and
                antagonist (α = 0) to inverse agonist (α &lt; 0).
              </p>
            }
          >
            <AgonismSpectrumDiagram />
          </DiagramSection>

          <DiagramSection
            title="Receptor types &amp; signal-transduction timescales"
            intro={
              <p>
                A single log-time axis (1 ms → 24 h) makes the order-of-magnitude
                differences between ion channels, GPCRs, kinase-linked, and
                nuclear receptors immediately visible.
              </p>
            }
          >
            <ReceptorTimescaleDiagram />
          </DiagramSection>
        </>
      }
    />
  );
};

export default PharmacodynamicsTopic;

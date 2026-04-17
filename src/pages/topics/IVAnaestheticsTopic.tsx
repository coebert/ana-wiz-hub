import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { ivAnaestheticsQuiz } from "@/data/quizzes";
import IVAnaestheticStructures from "@/components/diagrams/IVAnaestheticStructures";
import { PropofolTCISimulatorDiagram } from "@/components/diagrams/PropofolTCISimulatorDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const IVAnaestheticsTopic = () => {
  return (
    <SectionLayout
      title="Intravenous Anaesthetic Agents"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Intravenous anaesthetic agents are used for induction and maintenance of general anaesthesia, as well as sedation.
            Understanding their mechanisms, pharmacokinetics, and clinical profiles is a core FRCA topic. The primary agents
            in current practice are propofol, thiopentone, ketamine, and etomidate.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Propofol</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>2,6-diisopropylphenol</strong> in a lipid emulsion (soybean oil, egg lecithin, glycerol). Induction dose
            1.5–2.5 mg/kg. Onset 30–40 s (one arm-brain circulation time). Duration ~5–10 min (redistribution). pKa 11 —
            almost entirely un-ionised at physiological pH.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mechanism</strong>: enhances GABA_A receptor activity. <strong>CVS</strong>: dose-dependent hypotension
            (vasodilation + myocardial depression), reduced baroreflex sensitivity. <strong>RS</strong>: apnoea, respiratory
            depression. <strong>CNS</strong>: anticonvulsant, antiemetic, reduces CMRO₂ and ICP. <strong>Other</strong>: pain
            on injection (attenuated by lidocaine), supports bacterial growth — discard after 6 hours.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">TIVA & TCI</p>
            <p className="text-sm text-muted-foreground mt-1">
              Target-controlled infusion (TCI) uses pharmacokinetic models (Marsh — weight-based; Schnider — age, weight, height,
              LBM) to achieve and maintain a target plasma or effect-site concentration. Propofol is ideal for TIVA due to its
              short context-sensitive half-time at moderate infusion durations.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Interactive 3-Compartment TCI Simulator</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Adjust bolus, infusion rate, and patient covariates to see how the Marsh and Schnider models predict plasma (Cp)
              and effect-site (Ce) concentration over time. Note the hysteresis between Cp and Ce — the rationale for effect-site
              targeting.
            </p>
            <div className="bg-card rounded-xl border border-border p-4">
              <PropofolTCISimulatorDiagram />
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Thiopentone</h2>
          <p className="text-foreground/90 leading-relaxed">
            Thiobarbiturate. Induction dose 3–5 mg/kg. Highly lipid-soluble, rapid onset. Prepared as 2.5% solution (pH 10.5
            — highly alkaline, tissue necrosis if extravasation). Precipitates if mixed with acidic drugs (e.g., suxamethonium,
            atracurium, opioids).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mechanism</strong>: GABA_A agonist (opens chloride channel directly at high doses, potentiates at low doses).
            <strong> CVS</strong>: tachycardia (baroreceptor reflex to vasodilation), myocardial depression. <strong>CNS</strong>:
            powerful anticonvulsant, cerebral protectant (reduces CMRO₂). <strong>Other</strong>: porphyria is an absolute
            contraindication. Histamine release. No analgesic properties.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Ketamine</h2>
          <p className="text-foreground/90 leading-relaxed">
            Phencyclidine derivative. <strong>NMDA receptor antagonist</strong>. Dose: 1–2 mg/kg IV, 5–10 mg/kg IM. The
            S(+)-enantiomer is 2× more potent. Produces "dissociative anaesthesia" — catalepsy, analgesia, amnesia with eyes
            open and maintained airway reflexes (relatively).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>CVS</strong>: indirect sympathomimetic (↑HR, ↑BP, ↑SVR) — useful in haemodynamically compromised patients
            and tamponade. Direct myocardial depressant in catecholamine-depleted states. <strong>RS</strong>: bronchodilator,
            preserves respiratory drive (relatively), increased secretions. <strong>CNS</strong>: raises ICP and IOP. Emergence
            phenomena (hallucinations, vivid dreams) — reduced with benzodiazepines.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Unique Properties</p>
            <p className="text-sm text-muted-foreground mt-1">
              Ketamine is the only IV induction agent that provides significant analgesia. It can be given IM (useful for
              uncooperative patients/children). It has anti-inflammatory properties and is increasingly used in sub-anaesthetic
              doses for chronic pain and treatment-resistant depression.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Etomidate</h2>
          <p className="text-foreground/90 leading-relaxed">
            Imidazole derivative. Dose 0.3 mg/kg IV. <strong>Most haemodynamically stable</strong> induction agent — minimal
            effect on HR, BP, or cardiac output. Ideal for patients with limited cardiovascular reserve.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mechanism</strong>: GABA_A receptor (selective for β₂/β₃ subunit). <strong>Problems</strong>: adrenocortical
            suppression (inhibits 11β-hydroxylase — even a single dose suppresses cortisol for up to 24 hours). Pain on injection.
            Myoclonus (not seizure activity). High incidence of PONV. Not recommended for infusion due to adrenal suppression.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Comparative Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-foreground">Agent</th>
                  <th className="text-left p-2 text-foreground">Dose (mg/kg)</th>
                  <th className="text-left p-2 text-foreground">Mechanism</th>
                  <th className="text-left p-2 text-foreground">Key Feature</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-foreground font-medium">Propofol</td>
                  <td className="p-2 text-muted-foreground">1.5–2.5</td>
                  <td className="p-2 text-muted-foreground">GABA_A</td>
                  <td className="p-2 text-muted-foreground">Antiemetic, TCI-compatible</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-foreground font-medium">Thiopentone</td>
                  <td className="p-2 text-muted-foreground">3–5</td>
                  <td className="p-2 text-muted-foreground">GABA_A</td>
                  <td className="p-2 text-muted-foreground">Anticonvulsant, avoid in porphyria</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-foreground font-medium">Ketamine</td>
                  <td className="p-2 text-muted-foreground">1–2 IV</td>
                  <td className="p-2 text-muted-foreground">NMDA antagonist</td>
                  <td className="p-2 text-muted-foreground">Analgesic, sympathomimetic, IM route</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-foreground font-medium">Etomidate</td>
                  <td className="p-2 text-muted-foreground">0.3</td>
                  <td className="p-2 text-muted-foreground">GABA_A (β₂/β₃)</td>
                  <td className="p-2 text-muted-foreground">CV stability, adrenal suppression</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <KeyLearningPoints points={[
        "Propofol: GABA_A agonist. Causes hypotension (vasodilation + myocardial depression). Antiemetic. Pain on injection. Lipid emulsion supports bacterial growth.",
        "Thiopentone: alkaline pH 10.5 — tissue necrosis risk. Absolute contraindication in porphyria. Potent anticonvulsant.",
        "Ketamine: NMDA antagonist. Only IV agent with significant analgesia. Indirect sympathomimetic. Emergence phenomena. Bronchodilator.",
        "Etomidate: most haemodynamically stable agent. Inhibits 11β-hydroxylase (adrenal suppression for ~24h even after single dose).",
        "All IV agents (except ketamine) cause dose-dependent respiratory depression and apnoea.",
        "TCI models: Marsh (weight-based) and Schnider (age, weight, height, LBM) for propofol delivery."
      ]} />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Molecular Structures</h2>
          <IVAnaestheticStructures />
        </div>

        <QuizSection questions={ivAnaestheticsQuiz} />
      <ReferencesList topicId="iv-anaesthetics" />

      <SeeAlso topicId="iv-anaesthetics" />
        <TopicCompletionToggle topicId="iv-anaesthetics" topicTitle="Intravenous Anaesthetic Agents" />
    </SectionLayout>
  );
};

export default IVAnaestheticsTopic;

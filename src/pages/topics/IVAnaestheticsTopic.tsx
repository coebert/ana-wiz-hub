import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { ivAnaestheticsQuiz } from "@/data/quizzes";
import IVAnaestheticStructures from "@/components/diagrams/IVAnaestheticStructures";
import { PropofolTCISimulatorDiagram } from "@/components/diagrams/PropofolTCISimulatorDiagram";
import { PRISDiagram } from "@/components/diagrams/PRISDiagram";
import { SchniderEleveldDiagram } from "@/components/diagrams/SchniderEleveldDiagram";
import { KetaminePharmacologyDiagram } from "@/components/diagrams/KetaminePharmacologyDiagram";
import { DexmedetomidineDiagram } from "@/components/diagrams/DexmedetomidineDiagram";
import { EtomidatePharmacologyDiagram } from "@/components/diagrams/EtomidatePharmacologyDiagram";
import { MidazolamPharmacologyDiagram } from "@/components/diagrams/MidazolamPharmacologyDiagram";
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

          <div className="mt-8">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Propofol Infusion Syndrome (PRIS)</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              A rare but often fatal complication of prolonged, high-dose propofol infusion. Propofol inhibits the mitochondrial
              electron transport chain and fatty-acid β-oxidation, producing metabolic acidosis, rhabdomyolysis, and
              cardiovascular collapse. Classic thresholds are <strong>&gt; 4 mg/kg/h for &gt; 48 h</strong>, but it can occur with
              shorter exposures in susceptible patients.
            </p>
            <PRISDiagram />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Schnider vs Eleveld — General-Purpose TCI</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              The Eleveld model (2018) is a single propofol model derived from a pooled dataset of more than 1,000 subjects
              ranging from neonates to the very elderly and BMI 12–52. It uses allometric scaling, a maturation function, and
              fat-free mass — replacing the need to choose between Schnider, Marsh and paediatric models. Compare the two side
              by side at population extremes.
            </p>
            <SchniderEleveldDiagram />
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

          <div className="mt-6">
            <KetaminePharmacologyDiagram />
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
          <div className="mt-6">
            <EtomidatePharmacologyDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Midazolam</h2>
          <p className="text-foreground/90 leading-relaxed">
            Water-soluble imidazobenzodiazepine. The diazepine ring is <strong>open and ionised at pH 3.5</strong> (vial),
            making it injectable without solvent; at physiological pH the ring closes and the molecule becomes highly
            lipid-soluble, accounting for its rapid CNS penetration. Doses: sedation 0.05–0.1 mg/kg IV, induction
            0.2–0.3 mg/kg, premed 0.5 mg/kg PO (paeds).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mechanism</strong>: positive allosteric modulator at the <strong>α/γ interface of GABA-A</strong>
            receptors — increases <em>frequency</em> of chloride channel opening (barbiturates increase duration). Selectivity
            for α₁-containing receptors mediates sedation, anterograde amnesia and anticonvulsant action; α₂/α₃ mediate
            anxiolysis and muscle relaxation. <strong>CVS</strong>: mild ↓ SVR, well-preserved cardiac output. <strong>RS</strong>:
            dose-dependent respiratory depression, synergistic with opioids.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>PK</strong>: t½ 1.5–2.5 h, Vd 1.0–1.5 L/kg, 96% protein-bound. Hepatic CYP3A4 → α-hydroxy-midazolam
            (10% potency) → UGT-glucuronidation to <strong>α-hydroxy-midazolam-glucuronide</strong>, which is <em>active</em>,
            water-soluble, and <strong>renally excreted</strong>. In AKI/CKD the glucuronide accumulates → prolonged sedation
            for days after stopping an infusion. <strong>Reversal</strong>: flumazenil 200 µg + 100 µg/min titrated; t½
            shorter than midazolam → resedation likely.
          </p>
          <div className="mt-6">
            <MidazolamPharmacologyDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Dexmedetomidine</h2>
          <p className="text-foreground/90 leading-relaxed">
            Highly selective <strong>α₂-adrenergic agonist</strong> (α₂ : α₁ ≈ 1620 : 1) — the dextro-isomer of medetomidine.
            Acts at pre-synaptic α₂A autoreceptors in the <strong>locus coeruleus</strong>, reducing noradrenaline release and
            disinhibiting the ventrolateral preoptic nucleus (VLPO). The result is a <strong>NREM-stage-2-like sedation</strong> —
            patients are easily roused, follow commands, and have minimal respiratory depression.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Dosing (Dexdor)</strong>: maintenance infusion 0.2–1.4 µg/kg/h titrated to RASS. Optional loading dose
            1 µg/kg over 10 min produces a transient hypertensive peak (peripheral α₂B vasoconstriction) followed by hypotension
            and bradycardia (central α₂A) — the characteristic <strong>biphasic BP response</strong>. Slow infusion without a
            bolus avoids the initial hypertension.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Other uses</strong>: awake fibre-optic intubation, regional block adjunct, paediatric premedication
            (intranasal), opioid/alcohol withdrawal. <strong>SPICE-III (2019)</strong> showed non-inferior 90-day mortality vs
            standard sedation, with more ventilator-free days and less delirium. Cautions: bradycardia, hypotension, hepatic
            dysfunction (reduce dose), and rebound hypertension on prolonged-use cessation.
          </p>
          <div className="mt-6">
            <DexmedetomidineDiagram />
          </div>
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

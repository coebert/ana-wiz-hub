import { SectionLayout } from "@/components/SectionLayout";
import { CompartmentModelDiagram } from "@/components/diagrams/CompartmentModelDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";

const PharmacokineticsTopic = () => {
  return (
    <SectionLayout
      title="Pharmacokinetic Principles"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Pharmacokinetics describes what the body does to a drug — its absorption, distribution, metabolism, and
            elimination (ADME). Understanding these principles allows the anaesthetist to predict drug onset, duration,
            and accumulation with repeated dosing.
          </p>
          <p className="text-sm text-muted-foreground italic mt-2">
            Reference: Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care, 5th edition. Cambridge University Press, 2021.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Compartment Models</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Compartment models are mathematical abstractions that describe drug distribution. The body is divided into
            compartments based on the rate of drug equilibration. The central compartment (V₁) represents the
            well-perfused tissues (blood, heart, brain, kidneys). Peripheral compartments represent less well-perfused
            tissues (muscle, fat).
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <CompartmentModelDiagram />
          </div>
          <p className="text-foreground/90 leading-relaxed mt-4">
            In the <strong>one-compartment model</strong>, the drug distributes instantaneously and uniformly, with
            plasma concentration declining mono-exponentially. The <strong>two-compartment model</strong> shows a
            bi-exponential decline: a rapid distribution phase (α) as drug moves to peripheral tissues, followed by a
            slower elimination phase (β).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Volume of Distribution (Vd)</h2>
          <p className="text-foreground/90 leading-relaxed">
            Vd is a theoretical volume that would be required to contain the total amount of drug at the same concentration
            as in plasma: <strong>Vd = Dose / C₀</strong>. A large Vd (e.g., amiodarone ~70 L/kg) indicates extensive
            tissue distribution. A small Vd (e.g., warfarin ~0.1 L/kg) suggests the drug remains largely in plasma.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              Drugs with a large Vd are poorly removed by haemodialysis (e.g., digoxin, Vd = 500 L). Context-sensitive
              half-time increases with infusion duration for drugs that accumulate in peripheral compartments.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Clearance</h2>
          <p className="text-foreground/90 leading-relaxed">
            Clearance (Cl) is the volume of plasma from which drug is completely removed per unit time (mL/min or L/h).
            Total clearance is the sum of clearances by all eliminating organs:
            <strong> Cl<sub>total</sub> = Cl<sub>renal</sub> + Cl<sub>hepatic</sub> + Cl<sub>other</sub></strong>.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Hepatic clearance depends on hepatic blood flow, protein binding, and intrinsic hepatic enzyme activity. Drugs
            with high extraction ratios (e.g., propofol, lidocaine) are flow-dependent — their clearance changes with
            hepatic blood flow. Low extraction ratio drugs (e.g., diazepam) are capacity-dependent.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Half-Life and Steady State</h2>
          <p className="text-foreground/90 leading-relaxed">
            The elimination half-life (t½) is the time for plasma concentration to fall by 50%:
            <strong> t½ = 0.693 × Vd / Cl</strong>. It depends on both distribution and elimination. Steady state during
            continuous infusion is reached after approximately 4-5 half-lives, where the rate of administration equals the
            rate of elimination.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Context-Sensitive Half-Time</h2>
          <p className="text-foreground/90 leading-relaxed">
            Unlike terminal half-life, the context-sensitive half-time (CSHT) describes the time for plasma concentration
            to fall by 50% after stopping an infusion of a given duration. It accounts for redistribution from peripheral
            compartments. Remifentanil has a short, constant CSHT (~3-4 min) regardless of infusion duration, while
            fentanyl's CSHT increases markedly with prolonged infusions.
          </p>
        </section>
      </div>

      <KeyLearningPoints points={[
        "Pharmacokinetics is ADME: Absorption, Distribution, Metabolism, and Elimination.",
        "Compartment models describe drug distribution kinetically. The two-compartment model shows bi-exponential decline (α distribution, β elimination).",
        "Volume of distribution (Vd) is a theoretical concept; a large Vd indicates extensive tissue distribution.",
        "Clearance is the volume of plasma completely cleared of drug per unit time. High extraction ratio drugs are flow-dependent.",
        "Half-life (t½ = 0.693 × Vd / Cl) determines time to steady state (~4-5 half-lives).",
        "Context-sensitive half-time is more clinically relevant for infusions than terminal half-life. Remifentanil has a uniquely short and constant CSHT."
      ]} />
      <TopicCompletionToggle topicId="pharmacokinetics" topicTitle="Pharmacokinetic Principles" />
    </SectionLayout>
  );
};

export default PharmacokineticsTopic;

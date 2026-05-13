import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "./MechanismCascadeDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

const PECK: CascadeSource = {
  label: "Peck & Hill Ch.2",
  citation:
    "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care, 5th ed. Cambridge University Press; 2020 — ADME, compartment models.",
  url: "https://www.cambridge.org/9781108710961",
};

const BJA17: CascadeSource = {
  label: "BJA Educ 2017",
  citation:
    "Sahinovic MM, Struys MMRF, Absalom AR. Clinical pharmacokinetics and pharmacodynamics of propofol. Clin Pharmacokinet. 2018;57(12):1539-1558 (referenced in BJA Educ 2017 PK update).",
  url: "https://doi.org/10.1007/s40262-018-0672-3",
};

const STANSKI: CascadeSource = {
  label: "Stanski & Shafer",
  citation:
    "Hughes MA, Glass PSA, Jacobs JR. Context-sensitive half-time in multicompartment pharmacokinetic models for intravenous anesthetic drugs. Anesthesiology. 1992;76(3):334-341.",
  url: "https://doi.org/10.1097/00000542-199203000-00003",
};

const steps: CascadeStep[] = [
  {
    node: "Absorption",
    detail: "Bioavailability F",
    title: "Drug enters the systemic circulation",
    body:
      "Routes (IV, oral, IM, neuraxial, transdermal) determine the rate constant ka and bioavailability F. Oral drugs face first-pass hepatic and gut-wall metabolism (e.g. F(morphine) ≈ 0.3, F(propranolol) ≈ 0.25). IV bypasses absorption — F = 1.",
    sources: [PECK, BJA17],
  },
  {
    node: "Distribution",
    detail: "V₁ → V₂ → V₃",
    title: "Movement into tissue compartments",
    body:
      "After IV bolus the drug fills the central compartment (V₁ ≈ blood + vessel-rich group: brain, heart, kidneys, liver). Equilibration with peripheral compartments (V₂ muscle, V₃ fat) follows by rate constants k₁₂ and k₁₃. Lipid-soluble drugs have very large Vd (amiodarone ≈ 70 L·kg⁻¹).",
    sources: [PECK],
  },
  {
    node: "Metabolism",
    detail: "Phase I + II",
    title: "Biotransformation, mainly hepatic",
    body:
      "Phase I (CYP450 oxidation/reduction/hydrolysis) introduces a polar group; phase II (glucuronidation, sulphation, glutathione) conjugates it. High extraction-ratio drugs (propofol, fentanyl, lidocaine) show flow-limited clearance — affected by cardiac output. Low-extraction drugs (warfarin, diazepam) show capacity-limited clearance — affected by enzyme induction/inhibition and protein binding.",
    sources: [PECK, BJA17],
  },
  {
    node: "Elimination",
    detail: "CL = ke × Vd",
    title: "Removal from the body",
    body:
      "Most drugs follow first-order kinetics: a constant fraction is cleared per unit time, half-life t½ = 0.693·Vd/CL. Zero-order drugs (ethanol, phenytoin, salicylate at high dose) clear a constant amount — small dose changes cause big swings. Renal excretion (filtration ± secretion ± reabsorption) handles polar metabolites; pH manipulation alters reabsorption (urinary alkalinisation traps salicylate).",
    sources: [PECK],
  },
  {
    node: "Context-sensitive half-time",
    detail: "TIVA offset",
    title: "How long until plasma falls 50 % after stopping an infusion",
    body:
      "After short infusions, t½(CSHT) ≈ elimination t½. As infusion duration grows, peripheral compartments fill and the offset depends on tissue back-diffusion. Remifentanil stays ~3 min regardless of duration (organ-independent esterase clearance). Fentanyl CSHT escalates after ~4 h. Propofol plateaus at ~25 min after 8 h. This drives infusion-design and recovery prediction.",
    sources: [STANSKI, BJA17],
  },
];

export const ADMECascadeDiagram = () => (
    <DiagramFigure
      id="adme-cascade-diagram"
      title="ADME cascade"
      description="Auto-generated wrapper for the ADME cascade anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <MechanismCascadeDiagram
      title="ADME — Pharmacokinetic cascade"
      subtitle="Absorption → Distribution → Metabolism → Elimination, ending in context-sensitive half-time."
      accent="pharmacology"
      steps={steps}
    />
    </DiagramFigure>
  );

export default ADMECascadeDiagram;

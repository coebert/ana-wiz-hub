import { MechanismCascadeDiagram, CascadeStep } from "./MechanismCascadeDiagram";

const steps: CascadeStep[] = [
  {
    node: "PAMPs / DAMPs",
    detail: "LPS, peptidoglycan, HMGB1",
    title: "Pathogen & damage signals",
    body:
      "Pathogen-Associated Molecular Patterns (LPS, lipoteichoic acid, fungal β-glucan) and Damage-Associated Molecular Patterns (HMGB1, mitochondrial DNA, ATP) released from injured tissue bind pattern-recognition receptors — TLR4, NOD-like and RIG-I-like receptors on macrophages, neutrophils and endothelium.",
  },
  {
    node: "PRR activation",
    detail: "TLR4 → NF-κB",
    title: "Pattern-recognition receptor signalling",
    body:
      "Receptor engagement triggers NF-κB and MAPK pathways → transcription of pro-inflammatory genes. The inflammasome (NLRP3) assembles, caspase-1 cleaves pro-IL-1β and pro-IL-18 into active cytokines and drives pyroptosis.",
  },
  {
    node: "Cytokine storm",
    detail: "TNF-α, IL-1, IL-6",
    title: "Hyperinflammatory burst",
    body:
      "Massive release of TNF-α, IL-1β, IL-6, IL-8 and HMGB1 amplifies the response systemically. Compensatory anti-inflammatory cytokines (IL-10, TGF-β) follow — the simultaneous SIRS + CARS state explains both early shock and later immunoparalysis.",
  },
  {
    node: "Endothelial injury",
    detail: "Glycocalyx shedding",
    title: "Endothelial activation & glycocalyx loss",
    body:
      "Cytokines and reactive oxygen species shed the endothelial glycocalyx (syndecan-1, heparan sulphate spike in plasma). Tight-junction proteins disassemble — capillary leak → interstitial oedema, hypovolaemia and microvascular shunting despite normal cardiac output.",
  },
  {
    node: "Coagulopathy",
    detail: "Tissue factor + ↓protein C",
    title: "Thrombo-inflammation",
    body:
      "Endothelial tissue factor expression activates the extrinsic pathway. Anticoagulant pathways (protein C, antithrombin, TFPI) are suppressed and fibrinolysis impaired (↑PAI-1) → microthrombi block capillaries. Platelets and neutrophils form NETs amplifying injury.",
  },
  {
    node: "Microcirculatory failure",
    detail: "DO₂/VO₂ mismatch",
    title: "Tissue hypoxia despite macroflow",
    body:
      "Heterogeneous capillary perfusion (some capillaries shut, others over-perfused) — sublingual microscopy shows reduced functional capillary density. Mitochondrial dysfunction (cytopathic hypoxia) means cells cannot extract O₂ even when delivered. Lactate rises.",
  },
  {
    node: "MODS",
    detail: "SOFA ≥ 2 in ≥ 2 organs",
    title: "Multi-organ dysfunction syndrome",
    body:
      "Sequential failure: lungs (ARDS), kidneys (AKI), liver (cholestasis), brain (sepsis-associated encephalopathy), myocardium (septic cardiomyopathy), bone marrow (cytopenias). Each additional failed organ doubles mortality. SOFA score quantifies severity and tracks recovery.",
  },
];

export const SepsisHostResponseDiagram = () => (
  <MechanismCascadeDiagram
    title="Sepsis — Host Response Cascade"
    subtitle="From pathogen recognition to multi-organ dysfunction, step-by-step."
    accent="icu"
    steps={steps}
  />
);

export default SepsisHostResponseDiagram;

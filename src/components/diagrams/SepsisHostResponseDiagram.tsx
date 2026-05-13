import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "./MechanismCascadeDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

// Reusable source records — referenced by URL across multiple steps so the
// consolidated bibliography deduplicates them automatically.
const SSC: CascadeSource = {
  label: "SSC 2021",
  citation:
    "Evans L et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Intensive Care Med. 2021;47:1181–1247.",
  url: "https://doi.org/10.1007/s00134-021-06506-y",
};

const SEPSIS3: CascadeSource = {
  label: "Sepsis-3",
  citation:
    "Singer M et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801–810.",
  url: "https://doi.org/10.1001/jama.2016.0287",
};

const BJA_PATHO: CascadeSource = {
  label: "BJA Educ 2017",
  citation:
    "Nedeva C, Menassa J, Puthalakath H. Sepsis: Inflammation Is a Necessary Evil. (See also: Pathophysiology of sepsis. BJA Education 2017;17:128–34.)",
  url: "https://doi.org/10.1093/bjaceaccp/mkw060",
};

const GLYCOCALYX: CascadeSource = {
  label: "Chappell 2014",
  citation:
    "Chappell D, Jacob M. Role of the glycocalyx in fluid management: small things matter. Best Pract Res Clin Anaesthesiol. 2014;28(3):227–34.",
  url: "https://doi.org/10.1016/j.bpa.2014.06.003",
};

const COAG: CascadeSource = {
  label: "Levi 2017",
  citation:
    "Levi M, van der Poll T. Coagulation and sepsis. Thromb Res. 2017;149:38–44.",
  url: "https://doi.org/10.1016/j.thromres.2016.11.007",
};

const MICRO: CascadeSource = {
  label: "Ince 2015",
  citation:
    "Ince C. Hemodynamic coherence and the rationale for monitoring the microcirculation. Crit Care. 2015;19(Suppl 3):S8.",
  url: "https://doi.org/10.1186/cc14726",
};

const SOFA: CascadeSource = {
  label: "SOFA",
  citation:
    "Vincent JL et al. The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure. Intensive Care Med. 1996;22:707–10.",
  url: "https://doi.org/10.1007/BF01709751",
};

const steps: CascadeStep[] = [
  {
    node: "PAMPs / DAMPs",
    detail: "LPS, peptidoglycan, HMGB1",
    title: "Pathogen & damage signals",
    body:
      "Pathogen-Associated Molecular Patterns (LPS, lipoteichoic acid, fungal β-glucan) and Damage-Associated Molecular Patterns (HMGB1, mitochondrial DNA, ATP) released from injured tissue bind pattern-recognition receptors — TLR4, NOD-like and RIG-I-like receptors on macrophages, neutrophils and endothelium.",
    sources: [BJA_PATHO, SEPSIS3],
  },
  {
    node: "PRR activation",
    detail: "TLR4 → NF-κB",
    title: "Pattern-recognition receptor signalling",
    body:
      "Receptor engagement triggers NF-κB and MAPK pathways → transcription of pro-inflammatory genes. The inflammasome (NLRP3) assembles, caspase-1 cleaves pro-IL-1β and pro-IL-18 into active cytokines and drives pyroptosis.",
    sources: [BJA_PATHO],
  },
  {
    node: "Cytokine storm",
    detail: "TNF-α, IL-1, IL-6",
    title: "Hyperinflammatory burst",
    body:
      "Massive release of TNF-α, IL-1β, IL-6, IL-8 and HMGB1 amplifies the response systemically. Compensatory anti-inflammatory cytokines (IL-10, TGF-β) follow — the simultaneous SIRS + CARS state explains both early shock and later immunoparalysis.",
    sources: [BJA_PATHO, SSC],
  },
  {
    node: "Endothelial injury",
    detail: "Glycocalyx shedding",
    title: "Endothelial activation & glycocalyx loss",
    body:
      "Cytokines and reactive oxygen species shed the endothelial glycocalyx (syndecan-1, heparan sulphate spike in plasma). Tight-junction proteins disassemble — capillary leak → interstitial oedema, hypovolaemia and microvascular shunting despite normal cardiac output.",
    sources: [GLYCOCALYX],
  },
  {
    node: "Coagulopathy",
    detail: "Tissue factor + ↓protein C",
    title: "Thrombo-inflammation",
    body:
      "Endothelial tissue factor expression activates the extrinsic pathway. Anticoagulant pathways (protein C, antithrombin, TFPI) are suppressed and fibrinolysis impaired (↑PAI-1) → microthrombi block capillaries. Platelets and neutrophils form NETs amplifying injury.",
    sources: [COAG],
  },
  {
    node: "Microcirculatory failure",
    detail: "DO₂/VO₂ mismatch",
    title: "Tissue hypoxia despite macroflow",
    body:
      "Heterogeneous capillary perfusion (some capillaries shut, others over-perfused) — sublingual microscopy shows reduced functional capillary density. Mitochondrial dysfunction (cytopathic hypoxia) means cells cannot extract O₂ even when delivered. Lactate rises.",
    sources: [MICRO],
  },
  {
    node: "MODS",
    detail: "SOFA ≥ 2 in ≥ 2 organs",
    title: "Multi-organ dysfunction syndrome",
    body:
      "Sequential failure: lungs (ARDS), kidneys (AKI), liver (cholestasis), brain (sepsis-associated encephalopathy), myocardium (septic cardiomyopathy), bone marrow (cytopenias). Each additional failed organ doubles mortality. SOFA score quantifies severity and tracks recovery.",
    sources: [SEPSIS3, SOFA, SSC],
  },
];

export const SepsisHostResponseDiagram = () => (
    <DiagramFigure
      id="sepsis-host-response-diagram"
      title="Sepsis host response"
      description="Auto-generated wrapper for the Sepsis host response anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
        <MechanismCascadeDiagram
      title="Sepsis — Host Response Cascade"
      subtitle="From pathogen recognition to multi-organ dysfunction, step-by-step."
      accent="icu"
      steps={steps}
    />
    </DiagramFigure>
  );

export default SepsisHostResponseDiagram;

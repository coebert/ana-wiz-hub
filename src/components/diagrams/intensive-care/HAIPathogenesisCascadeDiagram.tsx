import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "@/components/diagrams/shared/MechanismCascadeDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

// ---------- Sources ----------
const EPIC3: CascadeSource = {
  label: "epic4 2023",
  citation:
    "Loveday HP, Wilson JA, Pratt RJ et al. epic4: updated national evidence-based guidelines for preventing healthcare-associated infections in NHS hospitals in England. J Hosp Infect. 2023;141:Suppl.",
  url: "https://www.journalofhospitalinfection.com/article/S0195-6701(23)00277-3/fulltext",
};

const IDSA_VAP: CascadeSource = {
  label: "NICE NG191",
  citation:
    "NICE. Hospital-acquired pneumonia (non-ventilator-associated) in adults: diagnosis and management. NICE guideline NG191. London: NICE; 2022.",
  url: "https://www.nice.org.uk/guidance/ng191",
};

const COSTERTON_BIOFILM: CascadeSource = {
  label: "Costerton 1999",
  citation:
    "Costerton JW, Stewart PS, Greenberg EP. Bacterial biofilms: a common cause of persistent infections. Science. 1999;284(5418):1318–22.",
  url: "https://doi.org/10.1126/science.284.5418.1318",
};

const SSC_2021: CascadeSource = {
  label: "SSC 2021",
  citation:
    "Evans L et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Intensive Care Med. 2021;47:1181–1247.",
  url: "https://doi.org/10.1007/s00134-021-06506-y",
};

const GPICS: CascadeSource = {
  label: "GPICS 3e",
  citation:
    "Faculty of Intensive Care Medicine / Intensive Care Society. Guidelines for the Provision of Intensive Care Services, 3rd edition. 2022.",
  url: "https://www.ficm.ac.uk/standardssafetyguidelinesstandards/guidelines-for-the-provision-of-intensive-care-services",
};

const HOTCHKISS_IMMUNO: CascadeSource = {
  label: "Hotchkiss 2013",
  citation:
    "Hotchkiss RS, Monneret G, Payen D. Sepsis-induced immunosuppression: from cellular dysfunctions to immunotherapy. Nat Rev Immunol. 2013;13(12):862–74.",
  url: "https://doi.org/10.1038/nri3552",
};

// ---------- Cascade steps ----------
const steps: CascadeStep[] = [
  {
    node: "Host risk",
    detail: "Invasive devices, immunoparalysis",
    title: "The susceptible critically-ill host",
    body:
      "ICU patients accumulate risk: invasive devices (ETT, CVC, urinary catheter), broken mucocutaneous barriers, sedation suppressing cough, gut hypoperfusion, hyperglycaemia, and a sepsis-induced compensatory anti-inflammatory response (CARS) that paralyses neutrophil and T-cell function. Each device-day is an independent risk factor for healthcare-associated infection (HAI).",
    sources: [GPICS, HOTCHKISS_IMMUNO],
  },
  {
    node: "Colonisation",
    detail: "Skin → device hub",
    title: "Pathogen colonisation of the device",
    body:
      "Within hours, skin commensals (CoNS, S. aureus) and hospital flora (gram-negatives, Candida) colonise device hubs and external surfaces. CVCs are colonised by extraluminal migration in the first week and intraluminal contamination thereafter. Urinary catheters develop bacteriuria at ~5% per day. Endotracheal tubes pool subglottic secretions above the cuff.",
    sources: [EPIC3, COSTERTON_BIOFILM],
  },
  {
    node: "Biofilm",
    detail: "Polysaccharide matrix, quorum sensing",
    title: "Biofilm formation on the device surface",
    body:
      "Sessile bacteria secrete extracellular polymeric substance (EPS) creating a mature biofilm within 48–72 h. Quorum-sensing molecules coordinate gene expression. The biofilm is up to 1,000× more resistant to antibiotics than planktonic cells, evades phagocytes, and continuously sheds emboli into the bloodstream or distal airway. Source control (device removal) is therefore mandatory — antibiotics alone will not clear it.",
    sources: [COSTERTON_BIOFILM, EPIC3],
  },
  {
    node: "Invasion",
    detail: "Microaspiration, translocation",
    title: "Breach into the sterile compartment",
    body:
      "Mechanism depends on device: microaspiration of contaminated secretions past the ETT cuff seeds the lower airway (VAP); biofilm emboli from a CVC enter the bloodstream (CLABSI); ascending colonisation of a urinary catheter reaches the upper tract (CAUTI); gut bacterial translocation through a hypoperfused, atrophic mucosa adds an endogenous source — especially with PPIs, broad-spectrum antibiotics and lack of enteral feeding.",
    sources: [IDSA_VAP, EPIC3, GPICS],
  },
  {
    node: "Local infection",
    detail: "Pneumonia, line sepsis, UTI",
    title: "Established healthcare-associated infection",
    body:
      "Clinical infection develops: VAP (new infiltrate + fever/leucocytosis/purulent secretions after >48 h ventilation), CLABSI (positive peripheral + line cultures with concordant organism and no other source), CAUTI, or wound/intra-abdominal infection. Common pathogens are Pseudomonas, Klebsiella, Acinetobacter, MRSA, Enterococcus and Candida — often multi-drug-resistant in the ICU ecosystem.",
    sources: [IDSA_VAP, GPICS],
  },
  {
    node: "Bacteraemia",
    detail: "Endothelial activation",
    title: "Systemic spread and septic response",
    body:
      "Pathogen-associated molecular patterns (LPS, lipoteichoic acid, β-glucan) activate TLRs on monocytes and endothelium. The cytokine cascade (TNF-α, IL-1β, IL-6), complement and coagulation are triggered simultaneously. Endothelial glycocalyx is shed, microvascular thrombosis develops, and the host transitions from local infection to septic shock with organ dysfunction (Sepsis-3, SOFA ≥ 2).",
    sources: [SSC_2021, HOTCHKISS_IMMUNO],
  },
  {
    node: "MODS",
    detail: "Hour-1 bundle + source control",
    title: "Organ failure — and the response",
    body:
      "Lactate, hypotension, AKI, ARDS and DIC define multi-organ dysfunction. The therapeutic loop closes only when source control accompanies antimicrobials: remove the offending CVC, change the ETT, exchange the urinary catheter, drain the abscess. Sepsis-3 mortality remains ~30%; each hour of delayed appropriate antibiotic raises it ~7%. Prevention bundles (chlorhexidine, sub-glottic suction, head-up 30°, daily sedation hold, line-care checklist) drive HAI rates down by 50–70%.",
    sources: [SSC_2021, EPIC3, GPICS],
  },
];

export const HAIPathogenesisCascadeDiagram = () => (
  <DiagramFigure
    id="hai-pathogenesis-cascade-diagram"
    title="ICU infection pathogenesis"
    description="Step-by-step animated cascade from device colonisation and biofilm through invasion, local infection, bacteraemia and MODS — anchoring source control and prevention bundles."
  >
    <MechanismCascadeDiagram
      title="ICU Healthcare-Associated Infection — Pathogenesis Cascade"
      subtitle="From susceptible host to MODS: why source control and bundles matter."
      accent="icu"
      steps={steps}
    />
  </DiagramFigure>
);

export default HAIPathogenesisCascadeDiagram;

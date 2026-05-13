import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "./MechanismCascadeDiagram";

const BJA_AP: CascadeSource = {
  label: "BJA Educ 2018",
  citation:
    "Bezmarević M et al. Anaesthetic and intensive care management of acute pancreatitis. BJA Education. 2018;18(8):241–48.",
  url: "https://doi.org/10.1016/j.bjae.2018.05.001",
};

const ATLANTA: CascadeSource = {
  label: "Atlanta 2012",
  citation:
    "Banks PA, Bollen TL, Dervenis C et al. Classification of acute pancreatitis — 2012: revision of the Atlanta classification and definitions by international consensus. Gut. 2013;62:102–11.",
  url: "https://doi.org/10.1136/gutjnl-2012-302779",
};

const BSG: CascadeSource = {
  label: "BSG 2024",
  citation:
    "British Society of Gastroenterology UK guidelines for the management of acute pancreatitis. Gut. 2024.",
  url: "https://www.bsg.org.uk/clinical-resource/uk-guidelines-for-the-management-of-acute-pancreatitis/",
};

const TRYPSIN: CascadeSource = {
  label: "Saluja 2007",
  citation:
    "Saluja AK, Lerch MM, Phillips PA, Dudeja V. Why does pancreatic overstimulation cause pancreatitis? Annu Rev Physiol. 2007;69:249–69.",
  url: "https://doi.org/10.1146/annurev.physiol.69.031905.161253",
};

const SIRS_AP: CascadeSource = {
  label: "Mofidi 2006",
  citation:
    "Mofidi R, Duff MD, Wigmore SJ et al. Association between early systemic inflammatory response, severity of multiorgan dysfunction and death in acute pancreatitis. Br J Surg. 2006;93:738–44.",
  url: "https://doi.org/10.1002/bjs.5290",
};

const STEP_UP: CascadeSource = {
  label: "PANTER",
  citation:
    "van Santvoort HC et al. (Dutch Pancreatitis Study Group). A step-up approach or open necrosectomy for necrotising pancreatitis. N Engl J Med. 2010;362:1491–1502.",
  url: "https://doi.org/10.1056/NEJMoa0908821",
};

const steps: CascadeStep[] = [
  {
    node: "Trigger",
    detail: "Gallstone, alcohol, ERCP",
    title: "Initial insult",
    body:
      "Gallstone obstruction at the ampulla, ethanol (direct toxicity + sphincter spasm), hypertriglyceridaemia, post-ERCP, drugs (azathioprine, valproate) or trauma. The shared final pathway is intra-acinar activation of digestive enzymes that should only be activated in the duodenum.",
    sources: [BJA_AP, BSG],
  },
  {
    node: "Trypsinogen activation",
    detail: "Inside acinar cell",
    title: "Premature enzyme activation",
    body:
      "Co-localisation of zymogen granules with lysosomal hydrolases (cathepsin B) triggers conversion of trypsinogen → active trypsin within the acinar cell. Trypsin then activates the entire pancreatic enzyme cascade (chymotrypsin, elastase, phospholipase A₂).",
    sources: [TRYPSIN],
  },
  {
    node: "Acinar autodigestion",
    detail: "Lipase + elastase",
    title: "Pancreatic self-digestion",
    body:
      "Active enzymes digest the cell membranes that contain them. Phospholipase A₂ destroys surfactant and cell membranes; elastase digests vessel walls causing haemorrhage; lipase saponifies peripancreatic fat (fat necrosis with calcium soap formation — hypocalcaemia).",
    sources: [TRYPSIN, BJA_AP],
  },
  {
    node: "Local inflammation",
    detail: "Cytokine release",
    title: "Acute interstitial oedema",
    body:
      "Damaged acinar cells release IL-1, IL-6, IL-8, TNF-α and platelet-activating factor. Neutrophils infiltrate, capillary leak produces interstitial oedema. Most cases stop here — mild interstitial oedematous pancreatitis (80% of cases, mortality < 1%).",
    sources: [ATLANTA],
  },
  {
    node: "SIRS",
    detail: "Distant organ effects",
    title: "Systemic inflammatory response",
    body:
      "Cytokines spill into systemic circulation → SIRS within 48 h. Capillary leak causes massive third-space fluid loss (sequestration into retroperitoneum and gut wall). Early ARDS, AKI and circulatory shock define severe acute pancreatitis. Atlanta classification: persistent organ failure > 48 h = severe.",
    sources: [SIRS_AP, ATLANTA],
  },
  {
    node: "Pancreatic necrosis",
    detail: "Walled-off (4+ wks)",
    title: "Necrotising pancreatitis",
    body:
      "In ~ 20% of cases, microcirculatory failure causes parenchymal necrosis (CT shows non-enhancing pancreas). Necrosis evolves over 4 weeks into walled-off necrosis. Sterile necrosis is managed conservatively; infected necrosis (gas on CT, positive FNA) needs step-up drainage / endoscopic necrosectomy.",
    sources: [STEP_UP, ATLANTA],
  },
  {
    node: "Multi-organ failure",
    detail: "ARDS, AKI, shock",
    title: "Severe pancreatitis",
    body:
      "Persistent organ failure (modified Marshall ≥ 2 in any system) with infected necrosis carries 30–40% mortality. Two mortality peaks: early (week 1, SIRS-driven) and late (weeks 2–6, infected necrosis). Glasgow / APACHE-II within 48 h, BISAP at 24 h, and CRP > 150 stratify risk.",
    sources: [ATLANTA, BJA_AP, BSG],
  },
];

export const PancreatitisAutodigestionDiagram = () => (
      <MechanismCascadeDiagram
    title="Acute Pancreatitis — Autodigestion Cascade"
    subtitle="From trypsinogen activation to multi-organ failure."
    accent="icu"
    steps={steps}
  />
  );

export default PancreatitisAutodigestionDiagram;

import { MechanismCascadeDiagram, CascadeStep } from "./MechanismCascadeDiagram";

const steps: CascadeStep[] = [
  {
    node: "Trigger",
    detail: "Gallstone, alcohol, ERCP",
    title: "Initial insult",
    body:
      "Gallstone obstruction at the ampulla, ethanol (direct toxicity + sphincter spasm), hypertriglyceridaemia, post-ERCP, drugs (azathioprine, valproate) or trauma. The shared final pathway is intra-acinar activation of digestive enzymes that should only be activated in the duodenum.",
  },
  {
    node: "Trypsinogen activation",
    detail: "Inside acinar cell",
    title: "Premature enzyme activation",
    body:
      "Co-localisation of zymogen granules with lysosomal hydrolases (cathepsin B) triggers conversion of trypsinogen → active trypsin within the acinar cell. Trypsin then activates the entire pancreatic enzyme cascade (chymotrypsin, elastase, phospholipase A₂).",
  },
  {
    node: "Acinar autodigestion",
    detail: "Lipase + elastase",
    title: "Pancreatic self-digestion",
    body:
      "Active enzymes digest the cell membranes that contain them. Phospholipase A₂ destroys surfactant and cell membranes; elastase digests vessel walls causing haemorrhage; lipase saponifies peripancreatic fat (fat necrosis with calcium soap formation — hypocalcaemia).",
  },
  {
    node: "Local inflammation",
    detail: "Cytokine release",
    title: "Acute interstitial oedema",
    body:
      "Damaged acinar cells release IL-1, IL-6, IL-8, TNF-α and platelet-activating factor. Neutrophils infiltrate, capillary leak produces interstitial oedema. Most cases stop here — mild interstitial oedematous pancreatitis (80% of cases, mortality < 1%).",
  },
  {
    node: "SIRS",
    detail: "Distant organ effects",
    title: "Systemic inflammatory response",
    body:
      "Cytokines spill into systemic circulation → SIRS within 48 h. Capillary leak causes massive third-space fluid loss (sequestration into retroperitoneum and gut wall). Early ARDS, AKI and circulatory shock define severe acute pancreatitis. Atlanta classification: persistent organ failure > 48 h = severe.",
  },
  {
    node: "Pancreatic necrosis",
    detail: "Walled-off (4+ wks)",
    title: "Necrotising pancreatitis",
    body:
      "In ~ 20% of cases, microcirculatory failure causes parenchymal necrosis (CT shows non-enhancing pancreas). Necrosis evolves over 4 weeks into walled-off necrosis. Sterile necrosis is managed conservatively; infected necrosis (gas on CT, positive FNA) needs step-up drainage / endoscopic necrosectomy.",
  },
  {
    node: "Multi-organ failure",
    detail: "ARDS, AKI, shock",
    title: "Severe pancreatitis",
    body:
      "Persistent organ failure (modified Marshall ≥ 2 in any system) with infected necrosis carries 30–40% mortality. Two mortality peaks: early (week 1, SIRS-driven) and late (weeks 2–6, infected necrosis). Glasgow / APACHE-II within 48 h, BISAP at 24 h, and CRP > 150 stratify risk.",
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

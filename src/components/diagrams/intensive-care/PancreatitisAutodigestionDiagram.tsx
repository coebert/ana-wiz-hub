import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "@/components/diagrams/shared/MechanismCascadeDiagram";
import { DiagramFigure } from "../_shared/DiagramFigure";

const BJA_AP: CascadeSource = {
  label: "Cosen-Binker 2007",
  citation: "Cosen-Binker LI, Gaisano HY. Recent insights into the cellular mechanisms of acute pancreatitis. Can J Gastroenterol. 2007;21(1):19–24.",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2656626/",
};

const ATLANTA: CascadeSource = {
  label: "Atlanta 2012",
  citation:
    "Banks PA, Bollen TL, Dervenis C et al. Classification of acute pancreatitis — 2012: revision of the Atlanta classification and definitions by international consensus. Gut. 2013;62:102–11.",
  url: "https://doi.org/10.1136/gutjnl-2012-302779",
};

const BSG: CascadeSource = {
  label: "WSES 2019",
  citation: "Leppäniemi A et al. 2019 WSES guidelines for the management of severe acute pancreatitis. World J Emerg Surg. 2019;14:27.",
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6567462/",
};

const NECROSIS: CascadeSource = {
  label: "AGA necrosis 2020",
  citation: "Baron TH, DiMaio CJ, Wang AY, Morgan KA. Management of Pancreatic Necrosis. Gastroenterology. 2020;158:67–75.",
  url: "https://doi.org/10.1053/j.gastro.2019.07.064",
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
      "Gallstone obstruction at the ampulla, ethanol (direct toxicity + sphincter spasm), hypertriglyceridaemia, post-ERCP, drugs (azathioprine, valproate) or trauma. Premature enzyme activation is one initiating mechanism; inflammatory, oxidative and microcirculatory injury also contribute.",
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
    sources: [ATLANTA, BJA_AP],
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
      "In ~ 20% of cases, microcirculatory failure causes parenchymal necrosis (CT shows non-enhancing pancreas). Collections may encapsulate after about 4 weeks; timing alone does not prove a wall. Treat proven or strongly suspected infected necrosis without awaiting FNA; gas can also reflect fistula/intervention. Urgent source-control assessment: deterioration may need drainage within 2 weeks, whereas debridement is optimally delayed about 4 weeks when feasible.",
    sources: [STEP_UP, ATLANTA, NECROSIS],
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
    <DiagramFigure
      id="pancreatitis-autodigestion-diagram"
      title="Pancreatitis autodigestion"
      description="Pancreatitis autodigestion: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
            <MechanismCascadeDiagram
      title="Acute Pancreatitis — Autodigestion Cascade"
      subtitle="From trypsinogen activation to multi-organ failure."
      accent="icu"
      steps={steps}
    />
    </DiagramFigure>
  );

export default PancreatitisAutodigestionDiagram;

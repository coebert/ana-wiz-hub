import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "./MechanismCascadeDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

const BERLIN: CascadeSource = {
  label: "ARDS Definition 2012",
  citation:
    "ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin definition. JAMA. 2012;307(23):2526-2533.",
  url: "https://doi.org/10.1001/jama.2012.5669",
};

const BJAE20: CascadeSource = {
  label: "BJA Educ 2020",
  citation:
    "Mart MF, Ware LB. Acute respiratory distress syndrome. BJA Education. 2020;20(3):83-89.",
  url: "https://doi.org/10.1016/j.bjae.2019.12.001",
};

const MATTHAY: CascadeSource = {
  label: "Matthay 2019",
  citation:
    "Matthay MA, Zemans RL, Zimmerman GA, et al. Acute respiratory distress syndrome. Nat Rev Dis Primers. 2019;5(1):18.",
  url: "https://doi.org/10.1038/s41572-019-0069-0",
};

const ARDSNET: CascadeSource = {
  label: "ARDSNet 2000",
  citation:
    "The Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes for acute lung injury and ARDS. N Engl J Med. 2000;342:1301-1308.",
  url: "https://doi.org/10.1056/NEJM200005043421801",
};

const steps: CascadeStep[] = [
  {
    node: "Insult",
    detail: "Direct or indirect",
    title: "Triggering injury to the alveolar-capillary unit",
    body:
      "Direct (pulmonary): pneumonia (commonest), gastric aspiration, inhalation injury, near-drowning, pulmonary contusion. Indirect (extra-pulmonary): sepsis, major trauma, pancreatitis, massive transfusion (TRALI), burns, cardiopulmonary bypass. The final common pathway is diffuse alveolar damage (DAD).",
    sources: [BJAE20, MATTHAY],
  },
  {
    node: "Exudative phase",
    detail: "0–7 days",
    title: "Alveolar–capillary barrier breakdown",
    body:
      "Activated neutrophils and alveolar macrophages release proteases, reactive oxygen species and cytokines (TNF-α, IL-1β, IL-6, IL-8). Type I pneumocytes and capillary endothelium are injured; tight junctions disrupt; the glycocalyx sheds. Protein-rich oedema fluid floods the alveolus, hyaline membranes form, and surfactant (produced by type II pneumocytes) is inactivated and diluted.",
    sources: [MATTHAY, BJAE20],
  },
  {
    node: "↓ Surfactant",
    detail: "Alveolar collapse",
    title: "Loss of surface tension regulation and compliance",
    body:
      "Surfactant dysfunction raises alveolar surface tension, causing widespread atelectasis especially in dependent lung. Functional residual capacity falls. The 'baby lung' concept (Gattinoni): only a small aerated fraction remains, so normal tidal volumes delivered to it produce regional overdistension (volutrauma) and high driving pressure.",
    sources: [BJAE20, MATTHAY],
  },
  {
    node: "Shunt & ↑V/Q mismatch",
    detail: "Refractory hypoxaemia",
    title: "Gas exchange failure",
    body:
      "Flooded and collapsed alveoli are perfused but not ventilated — true intrapulmonary shunt. Hypoxaemia is refractory to supplemental oxygen (PaO₂/FiO₂ falls). Dead space rises as microthrombi and pulmonary vasoconstriction obstruct capillaries, producing hypercapnia despite minute ventilation. Hypoxic pulmonary vasoconstriction and thrombosis raise pulmonary vascular resistance — acute cor pulmonale in up to 25%.",
    sources: [BERLIN, BJAE20],
  },
  {
    node: "VILI amplification",
    detail: "Volutrauma, atelectrauma, biotrauma",
    title: "Mechanical ventilation perpetuates the injury",
    body:
      "Cyclic opening/closing of unstable alveoli (atelectrauma), overdistension of aerated 'baby lung' units (volutrauma), and barotrauma drive further cytokine release (biotrauma) and systemic spillover — multi-organ dysfunction. This is why low tidal volume (6 mL/kg IBW), plateau ≤30, driving pressure ≤15 cmH₂O and adequate PEEP reduce mortality (ARDSNet).",
    sources: [ARDSNET, MATTHAY],
  },
  {
    node: "Proliferative phase",
    detail: "7–21 days",
    title: "Repair or progression",
    body:
      "Type II pneumocytes proliferate and differentiate into type I cells; alveolar oedema is cleared by epithelial Na⁺/K⁺-ATPase. Most patients begin to resolve here. In a subset, dysregulated repair leads to persistent inflammation and the fibroproliferative phase.",
    sources: [MATTHAY, BJAE20],
  },
  {
    node: "Fibrotic phase",
    detail: ">3 weeks",
    title: "Fibrosis and long-term sequelae",
    body:
      "Fibroblast proliferation and collagen deposition replace normal architecture, producing reduced compliance, persistent dead space and pulmonary hypertension. Survivors may have prolonged ventilator dependence, exercise limitation, neuromuscular weakness (ICU-acquired weakness) and cognitive impairment (post-intensive care syndrome). Avoiding VILI and minimising sedation/immobility limit progression.",
    sources: [BJAE20, MATTHAY],
  },
];

export const ARDSPathophysiologyCascadeDiagram = () => (
  <DiagramFigure
    id="ards-pathophysiology-cascade-diagram"
    title="ARDS pathophysiology cascade"
    description="Stepwise pathophysiology of ARDS — from triggering insult and diffuse alveolar damage, through surfactant loss, shunt physiology and ventilator-induced lung injury, to proliferative repair or fibrotic progression."
  >
    <MechanismCascadeDiagram
      title="ARDS — diffuse alveolar damage cascade"
      subtitle="From insult to fibrosis: the cellular events behind hypoxaemia and why lung-protective ventilation matters."
      accent="icu"
      steps={steps}
    />
  </DiagramFigure>
);

export default ARDSPathophysiologyCascadeDiagram;

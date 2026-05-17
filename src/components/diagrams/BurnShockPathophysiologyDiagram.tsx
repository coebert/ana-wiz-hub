import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "./MechanismCascadeDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

// ---------- Sources ----------
const JACKSON: CascadeSource = {
  label: "Jackson 1953",
  citation:
    "Jackson DM. The diagnosis of the depth of burning. Br J Surg. 1953;40(164):588–96.",
  url: "https://doi.org/10.1002/bjs.18004016413",
};

const BJA_BURNS_2017: CascadeSource = {
  label: "BJA Educ Burns 2017",
  citation:
    "Bittner EA et al. Acute and perioperative care of the burn-injured patient. BJA Education. 2017;17(11):350–355.",
  url: "https://doi.org/10.1016/j.bjae.2017.06.001",
};

const NIELSON_INFLAM: CascadeSource = {
  label: "Nielson 2017",
  citation:
    "Nielson CB, Duethman NC, Howard JM et al. Burns: pathophysiology of systemic complications and current management. J Burn Care Res. 2017;38(1):e469–e481.",
  url: "https://doi.org/10.1097/BCR.0000000000000355",
};

const LUND_BROWDER: CascadeSource = {
  label: "ISBI 2016",
  citation:
    "ISBI Practice Guidelines Committee. ISBI practice guidelines for burn care. Burns. 2016;42(5):953–1021.",
  url: "https://doi.org/10.1016/j.burns.2016.05.013",
};

const ABA_2023: CascadeSource = {
  label: "ABA Burn 2023",
  citation:
    "American Burn Association. Advanced Burn Life Support (ABLS) Provider Manual. 2023.",
  url: "https://ameriburn.org/education/abls-program/",
};

// ---------- Cascade steps ----------
const steps: CascadeStep[] = [
  {
    node: "Thermal insult",
    detail: "Three concentric zones",
    title: "Jackson's zones of burn injury",
    body:
      "Direct heat denatures protein and lipid bilayers. The central zone of coagulation is irreversibly necrotic. Around it lies the zone of stasis — viable but hypoperfused tissue at risk of conversion to full-thickness loss in the first 24–48 h. The outer zone of hyperaemia represents vasodilatation and will recover. Adequate resuscitation salvages the zone of stasis; under- or over-resuscitation deepens the wound.",
    sources: [JACKSON, BJA_BURNS_2017],
  },
  {
    node: "Local mediators",
    detail: "Histamine, kinins, ROS",
    title: "Release of vasoactive mediators",
    body:
      "Necrotic tissue and activated mast cells release histamine, bradykinin, serotonin, prostaglandins (PGE₂, PGI₂), thromboxane A₂, reactive oxygen species and nitric oxide. Locally this increases capillary permeability and vasodilatation. The xanthine oxidase pathway generates further free radicals that drive lipid peroxidation in the zone of stasis.",
    sources: [NIELSON_INFLAM, BJA_BURNS_2017],
  },
  {
    node: "Cytokine storm",
    detail: "TNF-α, IL-1β, IL-6, IL-8",
    title: "Systemic inflammatory response",
    body:
      "Once burns exceed ~20% TBSA the local response becomes systemic. Macrophages and damaged tissue release TNF-α, IL-1β, IL-6 and IL-8. Complement is activated and neutrophils are primed. Together with damage-associated molecular patterns (DAMPs — HMGB1, mitochondrial DNA), this drives a SIRS phenotype indistinguishable from sepsis — but sterile in the first 48–72 h.",
    sources: [NIELSON_INFLAM, BJA_BURNS_2017],
  },
  {
    node: "Capillary leak",
    detail: "Glycocalyx shedding",
    title: "Generalised endothelial dysfunction",
    body:
      "Cytokines and ROS shed the endothelial glycocalyx and open inter-endothelial junctions. Protein-rich fluid leaks into the interstitium — not only at the burn site but throughout the body. Plasma oncotic pressure falls (↓albumin) while interstitial oncotic pressure rises, driving further oedema. Peak leak occurs at 6–8 h, resolving by 24–48 h.",
    sources: [NIELSON_INFLAM, BJA_BURNS_2017],
  },
  {
    node: "Burn shock",
    detail: "Hypovolaemic + distributive + cardiogenic",
    title: "Three components of burn shock",
    body:
      "Intravascular volume falls precipitously (hypovolaemic). Vasodilatation from kinins and NO reduces SVR (distributive). A circulating myocardial depressant factor (probably TNF-α and IL-1β) reduces contractility by 30–50% (cardiogenic). The result is low CO, high SVR (compensatory catecholamines), oliguria and lactic acidosis. Parkland (4 mL/kg/%TBSA Hartmann's) or modified Brooke (2 mL/kg/%TBSA, ABA preferred) targets UO 0.5 mL/kg/h.",
    sources: [LUND_BROWDER, ABA_2023, BJA_BURNS_2017],
  },
  {
    node: "Hypermetabolism",
    detail: "200% BMR, catabolism",
    title: "Post-resuscitation hypermetabolic phase",
    body:
      "From 48–72 h onwards, catecholamines, cortisol and glucagon drive a profound hypermetabolic state lasting months. REE can double; muscle wasting, insulin resistance and bone loss occur. Non-shivering thermogenesis (uncoupled brown fat) raises core temperature setpoint to 38.5 °C. Treat with early enteral nutrition (25–35 kcal/kg/day, 1.5–2 g protein/kg/day), oxandrolone, propranolol, and warm room (28–30 °C).",
    sources: [NIELSON_INFLAM, LUND_BROWDER],
  },
  {
    node: "MODS / sepsis",
    detail: "Loss of barrier, gut translocation",
    title: "Late mortality: infection and organ failure",
    body:
      "Loss of the cutaneous barrier, immunoparalysis (CARS), prolonged ventilation and vascular access predispose to nosocomial infection — wound, pneumonia, line sepsis. Bacterial translocation from a hypoperfused gut adds an endogenous source. Burn sepsis is the leading cause of late death; the inflammatory response masks classical sepsis signs, so use ABA criteria (HR, RR, platelets, hyperglycaemia, enteral intolerance) rather than SIRS.",
    sources: [ABA_2023, NIELSON_INFLAM, BJA_BURNS_2017],
  },
];

export const BurnShockPathophysiologyDiagram = () => (
  <DiagramFigure
    id="burn-shock-pathophysiology-diagram"
    title="Burn shock pathophysiology"
    description="Step-by-step animated cascade from thermal injury through Jackson's zones, cytokine storm, capillary leak and burn shock to the late hypermetabolic and septic phases."
  >
    <MechanismCascadeDiagram
      title="Burn Shock — Pathophysiology Cascade"
      subtitle="From thermal insult to MODS: the seven-step mechanism that drives burn resuscitation."
      accent="icu"
      steps={steps}
    />
  </DiagramFigure>
);

export default BurnShockPathophysiologyDiagram;

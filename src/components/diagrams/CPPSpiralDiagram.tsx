import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "./MechanismCascadeDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

// ---------- Sources ----------
const BJA_CPP: CascadeSource = {
  label: "BJA Educ 2017",
  citation:
    "Duncan AE. Hyperglycemia and perioperative glucose management. (See: Coronary physiology in the perioperative period — BJA Education 2017;17:259–63.)",
  url: "https://doi.org/10.1093/bjaed/mkx002",
};

const HOFFMAN_BUCKBERG: CascadeSource = {
  label: "Hoffman & Buckberg",
  citation:
    "Hoffman JI, Buckberg GD. The myocardial oxygen supply:demand index revisited. J Am Heart Assoc. 2014;3(1):e000285. — origin of the subendocardial viability ratio (DPTI/SPTI).",
  url: "https://doi.org/10.1161/JAHA.113.000285",
};

const SCAI_2022: CascadeSource = {
  label: "SCAI 2022",
  citation:
    "Naidu SS et al. SCAI SHOCK Stage Classification Expert Consensus Update. J Am Coll Cardiol. 2022;79(9):933–946.",
  url: "https://doi.org/10.1016/j.jacc.2022.01.018",
};

const SSC_2021: CascadeSource = {
  label: "SSC 2021",
  citation:
    "Evans L et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Intensive Care Med. 2021;47:1181–1247.",
  url: "https://doi.org/10.1007/s00134-021-06506-y",
};

const VINCENT_DEBACKER: CascadeSource = {
  label: "Vincent 2013",
  citation:
    "Vincent JL, De Backer D. Circulatory shock. N Engl J Med. 2013;369:1726–34.",
  url: "https://doi.org/10.1056/NEJMra1208943",
};

// ---------- Steps ----------
const steps: CascadeStep[] = [
  {
    node: "Initial insult",
    detail: "↓SVR or ↓CO",
    title: "Hypotensive trigger",
    body:
      "Distributive shock (sepsis, anaphylaxis, neurogenic) drops systemic vascular resistance; cardiogenic, hypovolaemic and obstructive shock drop cardiac output. Either way, the diastolic aortic pressure — the driver of coronary flow — falls. The myocardium has the highest baseline O₂ extraction in the body (~70%), so it cannot compensate by extracting more.",
    sources: [VINCENT_DEBACKER, SCAI_2022],
  },
  {
    node: "↓ DBP",
    detail: "Diastolic floor falls",
    title: "Loss of coronary driving pressure",
    body:
      "Unlike every other vascular bed, the LV myocardium is perfused almost exclusively in diastole — systolic intramural pressure exceeds aortic pressure and squeezes intramyocardial vessels shut. Coronary perfusion pressure CPP = DBP_aorta − LVEDP. A falling DBP collapses this gradient.",
    sources: [BJA_CPP, HOFFMAN_BUCKBERG],
  },
  {
    node: "↓ CPP",
    detail: "Subendocardial first",
    title: "Subendocardial ischaemia",
    body:
      "The subendocardium has the highest wall tension (Laplace) and the lowest perfusion margin, so it ischaemia-fails before the subepicardium. The Hoffman–Buckberg subendocardial viability ratio (DPTI/SPTI) falls below 0.7. ECG shows ST depression; regional wall motion abnormalities appear on echo.",
    sources: [HOFFMAN_BUCKBERG, BJA_CPP],
  },
  {
    node: "Pump failure",
    detail: "↓SV, ↑LVEDP",
    title: "Contraction & relaxation impaired",
    body:
      "Ischaemic myocytes contract more weakly (↓ stroke volume) and relax less completely (diastolic dysfunction, ↑ LVEDP). Forward output drops further; the LV end-diastolic pressure climbs because relaxation requires ATP that ischaemic cells cannot generate.",
    sources: [VINCENT_DEBACKER],
  },
  {
    node: "↑ LVEDP",
    detail: "Crushes subendocardium",
    title: "The second hit on perfusion",
    body:
      "Rising LVEDP squeezes the subendocardial vessels from inside the wall. Because CPP = DBP − LVEDP, every mmHg rise in LVEDP costs a mmHg of perfusion. The myocardium is now being starved from both ends of the equation simultaneously.",
    sources: [HOFFMAN_BUCKBERG, BJA_CPP],
  },
  {
    node: "↓ CO",
    detail: "Aortic pressure drops further",
    title: "Forward failure feeds the cycle",
    body:
      "Falling stroke volume drops aortic pressure, which drops DBP, which drops CPP. Lactate rises; mixed venous saturation falls; oliguria and altered mental state mark Stage C–D shock (SCAI). Without intervention the spiral terminates in pulseless electrical activity arrest.",
    sources: [SCAI_2022, VINCENT_DEBACKER],
  },
  {
    node: "Vasopressor reverses spiral",
    detail: "α₁ → ↑DBP → ↑CPP",
    title: "Breaking the cycle",
    body:
      "An α₁-agonist (noradrenaline first-line; vasopressin via V₁; phenylephrine in AS/HOCM) raises arteriolar tone and the diastolic floor — directly restoring CPP. Venoconstriction returns ~70% of pooled blood volume, augmenting Frank–Starling SV. Trade-off: ↑ wall stress and MVO₂, hence the appeal of combining a vasopressor with an inotrope (dobutamine, milrinone) or mechanical unloading (IABP, Impella) in cardiogenic shock. MAP target ≥ 65 mmHg (≥ 80–85 in chronic hypertension).",
    sources: [SSC_2021, SCAI_2022, VINCENT_DEBACKER],
  },
];

export const CPPSpiralDiagram = () => (
    <DiagramFigure
      id="cpp-spiral-diagram"
      title="CPP spiral"
      description="Auto-generated wrapper for the CPP spiral anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
        <MechanismCascadeDiagram
      title="Subendocardial Ischaemic Spiral — Why Vasopressors Save Hearts"
      subtitle="The CPP = DBP − LVEDP cycle that drives, and reverses, shock-induced myocardial failure."
      accent="icu"
      steps={steps}
    />
    </DiagramFigure>
  );

export default CPPSpiralDiagram;

import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "./MechanismCascadeDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

const BJA17: CascadeSource = {
  label: "BJA Educ 2017",
  citation:
    "Woodcock TE. Plasma volume, tissue oedema and the steady-state Starling principle. BJA Educ. 2017;17(2):74-78.",
  url: "https://doi.org/10.1093/bjaed/mkw035",
};

const CHAP14: CascadeSource = {
  label: "Chappell 2014",
  citation:
    "Chappell D, Jacob M. Role of the glycocalyx in fluid management: small things matter. Best Pract Res Clin Anaesthesiol. 2014;28(3):227-234.",
  url: "https://doi.org/10.1016/j.bpa.2014.06.003",
};

const REVISED: CascadeSource = {
  label: "Woodcock & Woodcock 2012",
  citation:
    "Woodcock TE, Woodcock TM. Revised Starling equation and the glycocalyx model of transvascular fluid exchange: an improved paradigm. Br J Anaesth. 2012;108(3):384-394.",
  url: "https://doi.org/10.1093/bja/aer515",
};

const steps: CascadeStep[] = [
  {
    node: "Intact glycocalyx",
    detail: "0.5-1 µm glycocalyx layer",
    title: "Healthy semi-permeable barrier",
    body:
      "A 0.5-1 µm meshwork of membrane-bound proteoglycans (syndecan-1, glypican), glycosaminoglycans (heparan sulphate, hyaluronan, chondroitin) and adsorbed plasma proteins lines every endothelial cell. It excludes large molecules, generates the effective oncotic gradient (πsg) and binds antithrombin, SOD and lipoprotein lipase.",
    sources: [REVISED, CHAP14],
  },
  {
    node: "Insult",
    detail: "Sepsis, ischaemia, hypervolaemia",
    title: "Triggers cause shedding",
    body:
      "Sepsis (TNF-α, ROS), ischaemia-reperfusion, surgical trauma, hyperglycaemia and — crucially — atrial natriuretic peptide release after rapid crystalloid bolus all degrade the layer. ANP is the iatrogenic culprit during liberal perioperative fluid loading: aggressive fluids drop ANP, which sheds the glycocalyx, paradoxically worsening leak.",
    sources: [CHAP14, BJA17],
  },
  {
    node: "Shedding",
    detail: "Syndecan-1 ↑ in plasma",
    title: "Heparanase and matrix metalloproteinases cleave the layer",
    body:
      "Activated heparanase, MMPs and hyaluronidase cleave the proteoglycan backbone. Plasma syndecan-1 and hyaluronan rise — measurable biomarkers of glycocalyx injury that correlate with mortality in sepsis, trauma and cardiac surgery.",
    sources: [CHAP14],
  },
  {
    node: "↑ permeability",
    detail: "Loss of πsg gradient",
    title: "The Starling barrier collapses",
    body:
      "Without the glycocalyx the small subglycocalyx oncotic gradient is lost. Albumin and water move freely into the interstitium. Reabsorption (the classical 'venular limb' of textbook Starling) does not occur in steady state — fluid exits the capillary along its entire length and returns via lymphatics only.",
    sources: [REVISED, BJA17],
  },
  {
    node: "Interstitial oedema",
    detail: "Tissue, lung, gut wall",
    title: "Fluid accumulates outside the vessel",
    body:
      "Pulmonary oedema, gut-wall oedema (ileus, anastomotic dehiscence), conjunctival chemosis, peripheral oedema. Lung gas exchange falls; bowel function returns slowly; wound healing is impaired. Excess crystalloid in major surgery is associated with longer hospital stay and more complications.",
    sources: [BJA17, CHAP14],
  },
  {
    node: "Outcome impact",
    detail: "Restrictive / balanced fluids",
    title: "Protect the glycocalyx, improve outcomes",
    body:
      "Strategies that limit shedding: avoid excessive crystalloid (goal-directed therapy, RELIEF trial), prefer balanced solutions, treat sepsis source quickly, normoglycaemia, hydrocortisone in refractory shock. Albumin and plasma may help reconstitute the layer in severe loss. Adopt 'zero-balance' or 'restrictive' regimens for major abdominal surgery rather than empirical liberal volumes.",
    sources: [BJA17, REVISED],
  },
];

export const GlycocalyxSheddingCascadeDiagram = () => (
    <DiagramFigure
      id="glycocalyx-shedding-cascade-diagram"
      title="Glycocalyx shedding cascade"
      description="Auto-generated wrapper for the Glycocalyx shedding cascade anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <MechanismCascadeDiagram
      title="Glycocalyx shedding — capillary leak cascade"
      subtitle="Why aggressive crystalloid worsens oedema — the revised Starling model in action."
      accent="physiology"
      steps={steps}
    />
    </DiagramFigure>
  );

export default GlycocalyxSheddingCascadeDiagram;

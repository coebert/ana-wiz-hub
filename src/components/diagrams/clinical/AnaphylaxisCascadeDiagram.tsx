import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "@/components/diagrams/shared/MechanismCascadeDiagram";
import { DiagramFigure } from "../_shared/DiagramFigure";

const NAP6: CascadeSource = {
  label: "NAP Reports",
  citation:
    "Cook TM et al. NAP6 — Anaesthesia, surgery and life-threatening allergic reactions: epidemiology and clinical features. Br J Anaesth. 2018;121(1):159-171.",
  url: "https://doi.org/10.1016/j.bja.2018.04.014",
};

const AAGBI09: CascadeSource = {
  label: "AAGBI 2009",
  citation:
    "Harper NJN et al. Suspected anaphylactic reactions associated with anaesthesia. Anaesthesia. 2009;64(2):199-211 (updated by NAP6 2018).",
  url: "https://doi.org/10.1111/j.1365-2044.2008.05733.x",
};

const RCUK21: CascadeSource = {
  label: "Resuscitation Council UK 2021",
  citation:
    "Resuscitation Council UK. Emergency treatment of anaphylaxis: Guidelines for healthcare providers, 2021.",
  url: "https://www.resus.org.uk/library/additional-guidance/guidance-anaphylaxis",
};

const steps: CascadeStep[] = [
  {
    node: "Trigger exposure",
    detail: "NMBA / antibiotic / chlorhex",
    title: "Antigen contacts a sensitised host",
    body:
      "NAP6: neuromuscular blockers (38 %, suxamethonium and rocuronium dominate), antibiotics (esp. teicoplanin, co-amoxiclav, 26 %) and chlorhexidine (9 %) account for most perioperative anaphylaxis. Latex now uncommon. Cross-reactivity between NMBAs is mediated by quaternary ammonium epitopes.",
    sources: [NAP6],
  },
  {
    node: "IgE × mast cell",
    detail: "FcεRI cross-link",
    title: "Antigen cross-links pre-formed IgE on mast cells",
    body:
      "Two adjacent IgE molecules on the high-affinity FcεRI receptor are bridged by antigen. This triggers tyrosine-kinase signalling, calcium influx and rapid degranulation. Non-IgE mechanisms (direct mast-cell activation by vancomycin, opioids, contrast) produce a clinically identical picture — old terms 'anaphylactoid' are no longer used.",
    sources: [AAGBI09, NAP6],
  },
  {
    node: "Mediator release",
    detail: "Histamine, tryptase, LTs",
    title: "Pre-formed and newly synthesised mediators flood",
    body:
      "Pre-formed: histamine, tryptase, heparin, chymase. Newly synthesised: leukotrienes C4/D4/E4, prostaglandin D2, platelet-activating factor (PAF — strongly correlates with severity), TNF-α. Tryptase peaks at 1-2 h — measure at 1, 4 and 24 h to confirm mast-cell activation versus baseline.",
    sources: [NAP6, AAGBI09],
  },
  {
    node: "Multi-system effect",
    detail: "CV + Resp + Skin",
    title: "Vasodilation, capillary leak, bronchospasm, urticaria",
    body:
      "Cardiovascular (most common in anaesthesia, 88 %): profound vasodilation, ↑ capillary permeability with up to 35 % plasma loss in 10 min, refractory hypotension, tachycardia (or bradycardia via Bezold-Jarisch). Respiratory: bronchospasm, laryngeal/airway oedema, ↑ peak pressures. Skin (often masked by drapes): flushing, urticaria, angio-oedema. GI cramping/diarrhoea.",
    sources: [NAP6],
  },
  {
    node: "Adrenaline reverses",
    detail: "α1 + β1 + β2",
    title: "First-line drug acts on every limb of the cascade",
    body:
      "α1 vasoconstriction reverses hypotension and capillary leak; β1 inotropy/chronotropy supports CO; β2 bronchodilatation and inhibition of further mast-cell mediator release. IM 500 µg (adult) into anterolateral thigh repeated every 5 min, OR titrated IV boluses 50 µg with arterial line in the anaesthetised patient. Add IV fluids 20 ml/kg, stop trigger, secure airway, then second-line steroids/antihistamines and infusion if refractory.",
    sources: [RCUK21, AAGBI09],
  },
  {
    node: "Refractory / biphasic",
    detail: "Glucagon, vasopressin, ECMO",
    title: "When adrenaline fails or symptoms recur",
    body:
      "β-blocked patients: glucagon 1-2 mg IV. True refractory: vasopressin, methylene blue (NO scavenger), high-dose adrenaline infusion, VA-ECMO. Biphasic reactions in ~5 % within 1-72 h — observe a minimum 6-12 h. Refer all to allergy clinic for skin testing 4-6 weeks later (NAP6) and brief patient with MedicAlert and adrenaline auto-injector.",
    sources: [NAP6, RCUK21],
  },
];

export const AnaphylaxisCascadeDiagram = () => (
    <DiagramFigure
      id="anaphylaxis-cascade-diagram"
      title="Anaphylaxis cascade"
      description="Anaphylaxis cascade: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
            <MechanismCascadeDiagram
      title="Perioperative anaphylaxis — mechanism cascade"
      subtitle="From trigger to adrenaline rescue, with NAP6 epidemiology and refractory escalation."
      accent="clinical"
      steps={steps}
    />
    </DiagramFigure>
  );

export default AnaphylaxisCascadeDiagram;

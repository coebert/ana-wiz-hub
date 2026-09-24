import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "@/components/diagrams/shared/MechanismCascadeDiagram";
import { DiagramFigure } from "../_shared/DiagramFigure";

const ERC_2021: CascadeSource = {
  label: "ERC/ESICM 2021",
  citation:
    "Nolan JP, Sandroni C, Böttiger BW et al. European Resuscitation Council and European Society of Intensive Care Medicine guidelines 2021: Post-resuscitation care. Resuscitation. 2021;161:220–69.",
  url: "https://doi.org/10.1016/j.resuscitation.2021.02.012",
};

const TTM2: CascadeSource = {
  label: "TTM2 2021",
  citation:
    "Dankiewicz J, Cronberg T, Lilja G et al. Hypothermia versus normothermia after out-of-hospital cardiac arrest. N Engl J Med. 2021;384:2283–94.",
  url: "https://doi.org/10.1056/NEJMoa2100591",
};

const BJA_PCAS: CascadeSource = {
  label: "BJA Educ 2018",
  citation:
    "Sandroni C, D'Arrigo S, Nolan JP. Prognostication after cardiac arrest. BJA Education. 2018;18(11):353–59.",
  url: "https://doi.org/10.1016/j.bjae.2018.08.001",
};

const PCAS_NEUMAR: CascadeSource = {
  label: "Neumar 2008",
  citation:
    "Neumar RW, Nolan JP, Adrie C et al. Post-cardiac arrest syndrome: epidemiology, pathophysiology, treatment, and prognostication. Circulation. 2008;118:2452–83.",
  url: "https://doi.org/10.1161/CIRCULATIONAHA.108.190652",
};

const STUNNING: CascadeSource = {
  label: "Laurent 2002",
  citation:
    "Laurent I, Monchi M, Chiche JD et al. Reversible myocardial dysfunction in survivors of out-of-hospital cardiac arrest. J Am Coll Cardiol. 2002;40:2110–16.",
  url: "https://doi.org/10.1016/S0735-1097(02)02594-9",
};

const FOUR_HT: CascadeSource = {
  label: "RCUK 2021",
  citation:
    "Resuscitation Council UK. Adult Advanced Life Support Guidelines 2021 — reversible causes (4 H's and 4 T's).",
  url: "https://www.resus.org.uk/library/2021-resuscitation-guidelines/adult-advanced-life-support-guidelines",
};

const steps: CascadeStep[] = [
  {
    node: "Brain injury",
    title: "Post-anoxic brain injury",
    body:
      "Ischaemia-reperfusion of cerebral tissue triggers excitotoxicity (glutamate release), calcium influx, free-radical generation and delayed neuronal death over 24–72 h. Cerebral autoregulation is impaired, so MAP and PaCO₂ swings translate directly to CBF. This is the leading cause of death in OOHCA survivors. Targets: SpO₂ 94–98%, PaCO₂ 4.5–6.0 kPa, MAP ≥ 65 mmHg, normoglycaemia, TTM 32–36 °C × 24 h, seizure prophylaxis & EEG monitoring.",
    sources: [ERC_2021, TTM2, BJA_PCAS],
  },
  {
    node: "Myocardial dysfunction",
    title: "Stunned myocardium",
    body:
      "Global myocardial stunning lasts 24–48 h post-ROSC: ↓ ejection fraction, low cardiac output state despite open coronaries. Differs from cardiogenic shock — fully reversible if supported through the early phase. Manage with low-dose inotropes (dobutamine, milrinone), preload optimisation, and treat the precipitant. Echocardiography within 6 h guides therapy. Mechanical support (IABP, Impella, VA-ECMO) for refractory cases.",
    sources: [STUNNING, ERC_2021],
  },
  {
    node: "Ischaemia–reperfusion",
    title: "Systemic ischaemia–reperfusion injury",
    body:
      "Whole-body 'sepsis-like' syndrome — endothelial activation, cytokine release (IL-6, TNF-α), complement activation, coagulopathy, capillary leak and adrenal suppression. Causes vasoplegia and intravascular volume loss. Manifests as fever, hypotension, raised lactate and inflammatory markers in the first 24 h. Fluid resuscitation, vasopressors (noradrenaline first line) and source control of infection if present.",
    sources: [PCAS_NEUMAR, ERC_2021],
  },
  {
    node: "Persistent precipitant",
    title: "Underlying cause",
    body:
      "The original insult continues to drive instability until treated: ACS (consider urgent coronary angiography in shockable rhythms or STEMI), PE (thrombolysis), tamponade, tension pneumothorax, hypovolaemia, hypoxia, hyper/hypokalaemia, hypothermia, toxins. The 4 H's and 4 T's must be systematically excluded. CT 'sudden death' protocol when cause unclear.",
    sources: [FOUR_HT, ERC_2021],
  },
];

export const PostCardiacArrestSyndromeDiagram = () => (
    <DiagramFigure
      id="post-cardiac-arrest-syndrome-diagram"
      title="Post cardiac arrest syndrome"
      description="Post cardiac arrest syndrome: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
            <MechanismCascadeDiagram
      title="Post-Cardiac-Arrest Syndrome — The Four Pillars"
      subtitle="Each pillar drives mortality and needs targeted post-ROSC therapy."
      accent="icu"
      steps={steps}
      layout="radial"
      centerLabel="Post-Cardiac-Arrest Syndrome"
    />
    </DiagramFigure>
  );

export default PostCardiacArrestSyndromeDiagram;

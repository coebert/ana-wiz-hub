import { MechanismCascadeDiagram, CascadeStep } from "./MechanismCascadeDiagram";

const steps: CascadeStep[] = [
  {
    node: "Brain injury",
    title: "Post-anoxic brain injury",
    body:
      "Ischaemia-reperfusion of cerebral tissue triggers excitotoxicity (glutamate release), calcium influx, free-radical generation and delayed neuronal death over 24–72 h. Cerebral autoregulation is impaired, so MAP and PaCO₂ swings translate directly to CBF. This is the leading cause of death in OOHCA survivors. Targets: SpO₂ 94–98%, PaCO₂ 4.5–6.0 kPa, MAP ≥ 65 mmHg, normoglycaemia, TTM 32–36 °C × 24 h, seizure prophylaxis & EEG monitoring.",
  },
  {
    node: "Myocardial dysfunction",
    title: "Stunned myocardium",
    body:
      "Global myocardial stunning lasts 24–48 h post-ROSC: ↓ ejection fraction, low cardiac output state despite open coronaries. Differs from cardiogenic shock — fully reversible if supported through the early phase. Manage with low-dose inotropes (dobutamine, milrinone), preload optimisation, and treat the precipitant. Echocardiography within 6 h guides therapy. Mechanical support (IABP, Impella, VA-ECMO) for refractory cases.",
  },
  {
    node: "Ischaemia–reperfusion",
    title: "Systemic ischaemia–reperfusion injury",
    body:
      "Whole-body 'sepsis-like' syndrome — endothelial activation, cytokine release (IL-6, TNF-α), complement activation, coagulopathy, capillary leak and adrenal suppression. Causes vasoplegia and intravascular volume loss. Manifests as fever, hypotension, raised lactate and inflammatory markers in the first 24 h. Fluid resuscitation, vasopressors (noradrenaline first line) and source control of infection if present.",
  },
  {
    node: "Persistent precipitant",
    title: "Underlying cause",
    body:
      "The original insult continues to drive instability until treated: ACS (consider urgent coronary angiography in shockable rhythms or STEMI), PE (thrombolysis), tamponade, tension pneumothorax, hypovolaemia, hypoxia, hyper/hypokalaemia, hypothermia, toxins. The 4 H's and 4 T's must be systematically excluded. CT 'sudden death' protocol when cause unclear.",
  },
];

export const PostCardiacArrestSyndromeDiagram = () => (
  <MechanismCascadeDiagram
    title="Post-Cardiac-Arrest Syndrome — The Four Pillars"
    subtitle="Each pillar drives mortality and needs targeted post-ROSC therapy."
    accent="icu"
    steps={steps}
    layout="radial"
    centerLabel="Post-Cardiac-Arrest Syndrome"
  />
);

export default PostCardiacArrestSyndromeDiagram;

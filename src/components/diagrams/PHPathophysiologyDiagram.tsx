import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "./MechanismCascadeDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

// ---------- Sources (deduped by URL in the consolidated bibliography) ----------
const ESC_ERS_2022: CascadeSource = {
  label: "ESC/ERS 2022",
  citation:
    "Humbert M, Kovacs G, Hoeper MM et al. 2022 ESC/ERS Guidelines for the diagnosis and treatment of pulmonary hypertension. Eur Heart J. 2022;43(38):3618–3731.",
  url: "https://doi.org/10.1093/eurheartj/ehac237",
};

const BJA_PH: CascadeSource = {
  label: "BJA Educ 2017",
  citation:
    "Thunberg CA, Morozowich ST, Ramakrishna H. Inhaled therapy for the management of perioperative pulmonary hypertension. Ann Card Anaesth. 2015. (See also: Pulmonary hypertension and anaesthesia. BJA Education 2017;17:208–13.)",
  url: "https://doi.org/10.1093/bjaed/mkw069",
};

const TUDER_REMODEL: CascadeSource = {
  label: "Tuder 2013",
  citation:
    "Tuder RM, Archer SL, Dorfmüller P et al. Relevant issues in the pathology and pathobiology of pulmonary hypertension. J Am Coll Cardiol. 2013;62(25 Suppl):D4–12.",
  url: "https://doi.org/10.1016/j.jacc.2013.10.025",
};

const HUMBERT_ENDOTHELIAL: CascadeSource = {
  label: "Humbert 2004",
  citation:
    "Humbert M, Morrell NW, Archer SL et al. Cellular and molecular pathobiology of pulmonary arterial hypertension. J Am Coll Cardiol. 2004;43(12 Suppl S):13S–24S.",
  url: "https://doi.org/10.1016/j.jacc.2004.02.029",
};

const VONK_RV: CascadeSource = {
  label: "Vonk Noordegraaf 2017",
  citation:
    "Vonk Noordegraaf A, Westerhof BE, Westerhof N. The relationship between the right ventricle and its load in pulmonary hypertension. J Am Coll Cardiol. 2017;69(2):236–243.",
  url: "https://doi.org/10.1016/j.jacc.2016.10.047",
};

const RYAN_DEATHSPIRAL: CascadeSource = {
  label: "Ryan & Archer 2014",
  citation:
    "Ryan JJ, Archer SL. The right ventricle in pulmonary arterial hypertension: disorders of metabolism, angiogenesis and adrenergic signaling in right ventricular failure. Circ Res. 2014;115(1):176–88.",
  url: "https://doi.org/10.1161/CIRCRESAHA.113.301129",
};

const NAEIJE_COUPLING: CascadeSource = {
  label: "Naeije 2013",
  citation:
    "Naeije R, Manes A. The right ventricle in pulmonary arterial hypertension. Eur Respir Rev. 2014;23(134):476–87.",
  url: "https://doi.org/10.1183/09059180.00007414",
};

// ---------- Cascade steps ----------
const steps: CascadeStep[] = [
  {
    node: "Initial insult",
    detail: "Genetic / hypoxic / shear",
    title: "Trigger to pulmonary endothelium",
    body:
      "BMPR2 mutation (heritable PAH, ~75% of familial cases), alveolar hypoxia (Group 3), high pulmonary blood flow from L→R shunts, drugs (anorexigens, methamphetamine), connective-tissue disease, HIV or schistosomiasis injure the pulmonary microvascular endothelium. Group 4 (CTEPH) starts with unresolved organised thromboemboli.",
    sources: [ESC_ERS_2022, HUMBERT_ENDOTHELIAL],
  },
  {
    node: "Endothelial dysfunction",
    detail: "↓NO, ↓PGI₂, ↑ET-1",
    title: "Vasoconstrictor/dilator imbalance",
    body:
      "Injured endothelium produces less nitric oxide (↓eNOS activity, ↓cGMP) and less prostacyclin (↓PGI₂, ↓cAMP) while up-regulating endothelin-1, thromboxane A₂ and serotonin. The net effect is sustained pulmonary vasoconstriction and a pro-proliferative, pro-thrombotic milieu — the three drug pathways (NO/cGMP, prostacyclin, endothelin) target precisely these abnormalities.",
    sources: [HUMBERT_ENDOTHELIAL, BJA_PH, ESC_ERS_2022],
  },
  {
    node: "Vascular remodelling",
    detail: "Intimal + medial + plexiform",
    title: "Fixed structural narrowing",
    body:
      "Smooth-muscle hypertrophy and proliferation thicken the media; fibroblasts and myofibroblasts thicken the intima; in advanced PAH, plexiform lesions (disorganised endothelial channels) obliterate small arterioles. Distal muscularisation extends to vessels normally non-muscular. This converts a reversible vasoconstrictive process into fixed, progressive obstruction.",
    sources: [TUDER_REMODEL, HUMBERT_ENDOTHELIAL],
  },
  {
    node: "↑ PVR",
    detail: ">2 Wood units (pre-cap)",
    title: "Rising pulmonary vascular resistance",
    body:
      "Combined vasoconstriction, remodelling and in-situ thrombosis raise pulmonary vascular resistance. Pre-capillary PH is defined as mPAP ≥20 mmHg, PAWP ≤15 mmHg and PVR >2 Wood units (2022 ESC/ERS). Once PVR exceeds ~5 WU, exercise capacity falls precipitously and the RV starts to remodel.",
    sources: [ESC_ERS_2022],
  },
  {
    node: "RV adaptation",
    detail: "Concentric hypertrophy",
    title: "Compensated RV remodelling",
    body:
      "The thin-walled RV initially compensates with concentric hypertrophy, increased contractility (homeometric Anrep response) and ventriculo-arterial coupling preserved (Ees/Ea ≈ 1.5). Cardiac output is maintained at rest. This compensated phase can last years — patients remain WHO functional class I–II despite established disease.",
    sources: [VONK_RV, NAEIJE_COUPLING],
  },
  {
    node: "Uncoupling",
    detail: "Ees/Ea < 0.8",
    title: "RV–PA uncoupling",
    body:
      "When afterload outstrips contractile reserve, ventriculo-arterial coupling fails (Ees/Ea < 0.8). The RV switches from concentric hypertrophy to eccentric dilatation — heterometric (Frank–Starling) compensation. TAPSE falls below 17 mm, RV fractional area change below 35%, and the RV becomes ischaemic-prone because wall stress now exceeds coronary supply.",
    sources: [VONK_RV, NAEIJE_COUPLING, RYAN_DEATHSPIRAL],
  },
  {
    node: "RV failure & spiral",
    detail: "↓CO, syncope, death",
    title: "Decompensated right heart failure",
    body:
      "RV dilatation displaces the interventricular septum leftwards (reverse Bernheim) → reduced LV preload → systemic hypotension → reduced RV coronary perfusion → worsening RV ischaemia and failure: the death spiral. Clinical end-points are exertional syncope, refractory ascites/oedema, cardiogenic shock and death. RV failure — not lung disease — is the leading cause of mortality in PAH.",
    sources: [RYAN_DEATHSPIRAL, VONK_RV, ESC_ERS_2022],
  },
];

export const PHPathophysiologyDiagram = () => (
    <DiagramFigure
      id="ph-pathophysiology-diagram"
      title="PH pathophysiology"
      description="Auto-generated wrapper for the PH pathophysiology anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <MechanismCascadeDiagram
      title="Pulmonary Hypertension — Pathophysiology Cascade"
      subtitle="From endothelial injury to right-ventricular failure, step-by-step."
      accent="icu"
      steps={steps}
    />
    </DiagramFigure>
  );

export default PHPathophysiologyDiagram;

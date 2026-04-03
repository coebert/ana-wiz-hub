import { QuizQuestion } from "@/components/QuizSection";

export const gasLawsQuiz: QuizQuestion[] = [
  {
    question: "A closed gas cylinder at sea level contains 10 litres of oxygen. If taken to an altitude where atmospheric pressure is halved, what happens to the volume of gas inside the cylinder?",
    options: [
      "The volume doubles to 20 litres",
      "The volume remains at 10 litres because the cylinder is rigid",
      "The volume halves to 5 litres",
      "The volume increases by 10% due to temperature change",
    ],
    correctIndex: 1,
    explanation: "Boyle's law (P₁V₁ = P₂V₂) applies to compressible containers. A rigid gas cylinder cannot change volume, so the gas pressure inside simply remains higher than the surrounding atmospheric pressure. The volume remains unchanged. Boyle's law would apply if the gas were in a compliant container such as a balloon or body cavity.",
  },
  {
    question: "Which gas law best explains why a pneumothorax may worsen during air transport?",
    options: [
      "Charles' law",
      "Dalton's law of partial pressures",
      "Boyle's law",
      "Henry's law",
    ],
    correctIndex: 2,
    explanation: "Boyle's law states that at constant temperature, the volume of a gas is inversely proportional to its pressure. As altitude increases and cabin pressure decreases, trapped gas in a pneumothorax expands, potentially converting a simple pneumothorax to a tension pneumothorax.",
  },
  {
    question: "A spirometry reading is taken at room temperature (20°C). Using Charles' law, by approximately what percentage does the gas volume increase when corrected to body temperature (37°C)?",
    options: [
      "17%",
      "6%",
      "10%",
      "37%",
    ],
    correctIndex: 1,
    explanation: "Charles' law: V₁/T₁ = V₂/T₂. Using absolute temperatures: V₂ = V₁ × (310/293) = V₁ × 1.058, approximately a 6% increase. Temperature must always be converted to Kelvin (add 273).",
  },
  {
    question: "Using the alveolar gas equation, which of the following is the approximate PaO₂ in a patient breathing room air at sea level (PaCO₂ = 5.3 kPa, R = 0.8)?",
    options: [
      "20 kPa",
      "13.6 kPa",
      "10 kPa",
      "8 kPa",
    ],
    correctIndex: 1,
    explanation: "PAO₂ = FiO₂ × (Patm − PH₂O) − PaCO₂/R = 0.21 × (101.3 − 6.3) − 5.3/0.8 = 0.21 × 95 − 6.6 = 19.95 − 6.6 ≈ 13.4 kPa. Dalton's law underpins the calculation of partial pressures in the alveolar gas equation.",
  },
  {
    question: "Henry's law is most directly relevant to which of the following clinical scenarios?",
    options: [
      "Calculation of gas cylinder contents",
      "Function of a Venturi mask",
      "Uptake of volatile anaesthetic agents into blood",
      "Measurement of airway resistance",
    ],
    correctIndex: 2,
    explanation: "Henry's law states that the amount of gas dissolved in a liquid is proportional to the partial pressure of that gas above the liquid. This directly governs how volatile agents dissolve in blood from the alveoli, as well as O₂ and CO₂ transport in plasma.",
  },
];

export const oxygenHaemoglobinQuiz: QuizQuestion[] = [
  {
    question: "The P₅₀ of adult haemoglobin is approximately:",
    options: [
      "3.5 kPa (26.7 mmHg)",
      "5.3 kPa (40 mmHg)",
      "8.0 kPa (60 mmHg)",
      "13.3 kPa (100 mmHg)",
    ],
    correctIndex: 0,
    explanation: "The P₅₀ is the PaO₂ at which haemoglobin is 50% saturated. For normal adult haemoglobin (HbA), this is approximately 3.5 kPa (26.7 mmHg). Changes in P₅₀ indicate shifts in the ODC — an increased P₅₀ represents a right shift.",
  },
  {
    question: "A patient presents with metabolic acidosis, fever, and raised 2,3-DPG. What effect does this combination have on the oxygen-haemoglobin dissociation curve?",
    options: [
      "Left shift — increased oxygen affinity",
      "Right shift — decreased oxygen affinity",
      "No change — the effects cancel out",
      "The curve becomes linear",
    ],
    correctIndex: 1,
    explanation: "All three factors (acidosis, fever, raised 2,3-DPG) independently shift the curve to the right, decreasing haemoglobin's affinity for oxygen and facilitating O₂ release to tissues. This is beneficial in states of increased metabolic demand.",
  },
  {
    question: "The Bohr effect describes:",
    options: [
      "The effect of temperature on haemoglobin oxygen affinity",
      "The rightward shift of the ODC caused by increased CO₂ and H⁺ concentration",
      "The leftward shift of the ODC caused by fetal haemoglobin",
      "The effect of 2,3-DPG on the ODC",
    ],
    correctIndex: 1,
    explanation: "The Bohr effect specifically describes the rightward shift of the ODC caused by increased CO₂ and decreased pH (increased H⁺). In metabolically active tissues, local CO₂ production and acidosis promote O₂ unloading from haemoglobin.",
  },
  {
    question: "Why is pulse oximetry (SpO₂) considered a late indicator of hypoxaemia?",
    options: [
      "Because pulse oximeters have a 30-second averaging delay",
      "Because the flat upper portion of the ODC means PaO₂ can fall significantly before SpO₂ changes",
      "Because SpO₂ only measures dissolved oxygen",
      "Because pulse oximeters cannot detect carboxyhaemoglobin",
    ],
    correctIndex: 1,
    explanation: "The flat upper portion of the ODC means that PaO₂ can fall from 13 kPa to approximately 8 kPa (100 to 60 mmHg) with only a small change in SaO₂ (from ~98% to ~90%). Once PaO₂ falls below 8 kPa, the steep portion causes rapid desaturation. This is why pre-oxygenation provides a crucial safety margin.",
  },
  {
    question: "Carbon monoxide poisoning causes the ODC to:",
    options: [
      "Shift right and become hyperbolic",
      "Shift left and reduce oxygen delivery to tissues",
      "Shift right and increase oxygen delivery to tissues",
      "Remain unchanged but reduce total oxygen-carrying capacity only",
    ],
    correctIndex: 1,
    explanation: "Carbon monoxide binds haemoglobin with ~240 times the affinity of oxygen, reducing oxygen-carrying capacity. It also shifts the ODC to the left, increasing the affinity of remaining haem groups for O₂ and impairing O₂ release to tissues. This dual mechanism makes CO poisoning more dangerous than simple anaemia with equivalent Hb reduction.",
  },
];

export const cardiacCycleQuiz: QuizQuestion[] = [
  {
    question: "During which phase of the cardiac cycle are all four cardiac valves closed?",
    options: [
      "Atrial systole and rapid ejection",
      "Isovolumetric contraction and isovolumetric relaxation",
      "Rapid filling and reduced filling",
      "Rapid ejection and reduced ejection",
    ],
    correctIndex: 1,
    explanation: "During isovolumetric contraction, the mitral valve has closed (S1) but aortic valve has not yet opened. During isovolumetric relaxation, the aortic valve has closed (S2) but the mitral valve has not yet opened. In both phases, all four valves are closed and pressure changes without volume change.",
  },
  {
    question: "The first heart sound (S1) is produced by:",
    options: [
      "Closure of the aortic and pulmonary valves",
      "Opening of the mitral valve",
      "Closure of the mitral and tricuspid valves",
      "Rapid ventricular filling",
    ],
    correctIndex: 2,
    explanation: "S1 is produced by closure of the atrioventricular (mitral and tricuspid) valves at the onset of ventricular systole. S2 is produced by closure of the semilunar (aortic and pulmonary) valves at the end of systole.",
  },
  {
    question: "Giant 'v' waves on the CVP trace are most characteristic of:",
    options: [
      "Complete heart block",
      "Tricuspid regurgitation",
      "Tricuspid stenosis",
      "Atrial fibrillation",
    ],
    correctIndex: 1,
    explanation: "Giant v waves occur when blood regurgitates through an incompetent tricuspid valve during ventricular systole, producing a large positive wave during the period when the atrium would normally be passively filling. Giant 'a' waves (cannon waves) are seen in complete heart block when the atrium contracts against a closed tricuspid valve.",
  },
  {
    question: "At a heart rate of 150 bpm, which phase of the cardiac cycle is most compromised?",
    options: [
      "Isovolumetric contraction",
      "Rapid ejection",
      "Diastasis (reduced filling)",
      "Isovolumetric relaxation",
    ],
    correctIndex: 2,
    explanation: "Diastasis (reduced filling/slow filling phase) is the first phase to be shortened with tachycardia. At very high heart rates, rapid filling is also compromised. Since most ventricular filling occurs during diastole, tachycardia can significantly reduce stroke volume, especially in patients with diastolic dysfunction or mitral stenosis.",
  },
  {
    question: "The dicrotic notch on the arterial pressure waveform corresponds to:",
    options: [
      "Opening of the aortic valve",
      "Closure of the aortic valve",
      "Mitral valve opening",
      "Peak left ventricular pressure",
    ],
    correctIndex: 1,
    explanation: "The dicrotic notch (incisura) represents a brief pressure increase in the aorta caused by elastic recoil of the aortic wall against the newly closed aortic valve. It marks the end of systole and the beginning of diastole, coinciding with S2.",
  },
];

export const pharmacokineticsQuiz: QuizQuestion[] = [
  {
    question: "A drug has a volume of distribution (Vd) of 500 litres. This most likely indicates that the drug:",
    options: [
      "Remains primarily in the plasma compartment",
      "Is extensively distributed into tissues",
      "Is highly protein-bound in plasma",
      "Has a short elimination half-life",
    ],
    correctIndex: 1,
    explanation: "A Vd of 500 L far exceeds total body water (~42 L in a 70 kg adult), indicating extensive tissue distribution and/or binding. Examples include digoxin (Vd ~500 L) and amiodarone (Vd ~70 L/kg). Such drugs are poorly removed by haemodialysis because most of the drug is in tissues, not plasma.",
  },
  {
    question: "Propofol has a high hepatic extraction ratio. Its clearance is therefore most dependent on:",
    options: [
      "Plasma protein binding",
      "Hepatic enzyme activity (intrinsic clearance)",
      "Hepatic blood flow",
      "Renal function",
    ],
    correctIndex: 2,
    explanation: "Drugs with a high hepatic extraction ratio (>0.7) are 'flow-dependent' — their clearance is primarily determined by hepatic blood flow rather than enzyme capacity or protein binding. Propofol (extraction ratio ~0.9) clearance will decrease with reduced hepatic blood flow (e.g., in heart failure or during positive pressure ventilation).",
  },
  {
    question: "Steady state during a continuous intravenous infusion is reached after approximately:",
    options: [
      "1 half-life",
      "2 half-lives",
      "4-5 half-lives",
      "10 half-lives",
    ],
    correctIndex: 2,
    explanation: "Steady state is reached after approximately 4-5 half-lives, at which point the rate of drug administration equals the rate of elimination. After 1 half-life, 50% of steady state is reached; after 2 half-lives, 75%; after 3, 87.5%; after 4, 93.75%; and after 5, 96.9%.",
  },
  {
    question: "The context-sensitive half-time of remifentanil after a prolonged infusion is approximately:",
    options: [
      "3-4 minutes",
      "20 minutes",
      "60 minutes",
      "It increases linearly with infusion duration",
    ],
    correctIndex: 0,
    explanation: "Remifentanil has a uniquely short and constant context-sensitive half-time of approximately 3-4 minutes regardless of infusion duration. This is because it is metabolised by non-specific tissue and plasma esterases (not hepatic metabolism), so there is no accumulation in peripheral compartments.",
  },
  {
    question: "In a two-compartment model, the initial rapid decline in plasma concentration after an IV bolus represents:",
    options: [
      "Renal elimination",
      "Hepatic metabolism",
      "Distribution from the central to peripheral compartment (α phase)",
      "Drug binding to plasma proteins",
    ],
    correctIndex: 2,
    explanation: "The initial rapid decline (α phase) in a two-compartment model represents distribution of drug from the well-perfused central compartment (blood, brain, heart) to the less well-perfused peripheral compartment (muscle, fat). The subsequent slower decline (β phase) represents elimination from the body.",
  },
];

export const volatileAgentsQuiz: QuizQuestion[] = [
  {
    question: "MAC is defined as the minimum alveolar concentration that prevents movement in response to surgical stimulus in what percentage of subjects?",
    options: [
      "25%",
      "50%",
      "75%",
      "95%",
    ],
    correctIndex: 1,
    explanation: "MAC is the ED₅₀ for immobility — the alveolar concentration at 1 atmosphere that prevents movement in 50% of subjects in response to a standard surgical stimulus (skin incision). To prevent movement in 95% of patients, approximately 1.3 MAC is required.",
  },
  {
    question: "Which volatile agent has the lowest blood:gas partition coefficient and therefore the fastest onset?",
    options: [
      "Sevoflurane (0.65)",
      "Isoflurane (1.46)",
      "Desflurane (0.42)",
      "Halothane (2.54)",
    ],
    correctIndex: 2,
    explanation: "Desflurane has the lowest blood:gas partition coefficient (0.42) of the potent volatile agents, meaning less agent dissolves in blood and the alveolar (and brain) partial pressure rises most rapidly. However, its pungency makes it unsuitable for inhalational induction.",
  },
  {
    question: "A 75-year-old patient requires general anaesthesia with sevoflurane. Compared to a 30-year-old, the MAC will be approximately:",
    options: [
      "The same — age does not affect MAC",
      "20-30% lower",
      "20-30% higher",
      "50% lower",
    ],
    correctIndex: 1,
    explanation: "MAC decreases by approximately 6% per decade after age 40. From age 30 to 75 (approximately 4.5 decades of decrease), MAC is reduced by roughly 27%. This means elderly patients require lower concentrations of volatile agents, and failure to adjust may lead to excessive depth of anaesthesia and cardiovascular depression.",
  },
  {
    question: "The Meyer-Overton hypothesis relates anaesthetic potency to:",
    options: [
      "Blood:gas partition coefficient",
      "Molecular weight",
      "Oil:gas partition coefficient (lipid solubility)",
      "Vapour pressure",
    ],
    correctIndex: 2,
    explanation: "The Meyer-Overton hypothesis states that anaesthetic potency correlates with lipid solubility, measured by the oil:gas partition coefficient. The product of MAC × oil:gas partition coefficient is approximately constant across agents (~1.82-2.23 atm). More lipid-soluble agents are more potent (lower MAC).",
  },
  {
    question: "Which of the following factors does NOT affect MAC?",
    options: [
      "Patient age",
      "Body temperature",
      "Duration of anaesthesia",
      "Concurrent opioid administration",
    ],
    correctIndex: 2,
    explanation: "Duration of anaesthesia does not affect MAC. Factors that DO affect MAC include: age (decreases after 40), temperature (hypothermia decreases MAC), concurrent drugs (opioids, benzodiazepines decrease MAC), pregnancy (decreases MAC by ~30%), and chronic alcohol use (increases MAC).",
  },
];

export const neuromuscularQuiz: QuizQuestion[] = [
  {
    question: "The adult nicotinic acetylcholine receptor at the neuromuscular junction has the subunit composition:",
    options: [
      "α₂βδγ",
      "α₂βδε",
      "α₂β₂δ",
      "αβγδε",
    ],
    correctIndex: 1,
    explanation: "The mature adult nAChR has the subunit composition α₂βδε. The fetal/extrajunctional receptor contains a γ subunit instead of ε (α₂βδγ), which has longer open time and lower conductance. This distinction is clinically important — upregulation of fetal-type receptors in denervation or burns causes suxamethonium hyperkalaemia.",
  },
  {
    question: "How many molecules of acetylcholine must bind to open a single nicotinic receptor channel?",
    options: [
      "One",
      "Two",
      "Three",
      "Four",
    ],
    correctIndex: 1,
    explanation: "Two ACh molecules must bind simultaneously, one to each α subunit, to open the channel. This cooperative binding creates a steep dose-response relationship and explains why non-depolarising agents (which compete at the α subunits) are effective — blocking even one site prevents channel opening.",
  },
  {
    question: "Train-of-four fade during non-depolarising neuromuscular block is explained by blockade of:",
    options: [
      "Post-junctional nAChR only",
      "Pre-junctional nAChR (α₃β₂)",
      "Muscarinic receptors at the NMJ",
      "Voltage-gated calcium channels",
    ],
    correctIndex: 1,
    explanation: "Fade during train-of-four stimulation is caused by blockade of pre-junctional nicotinic receptors (α₃β₂), which normally provide positive feedback to mobilise ACh vesicles during sustained nerve stimulation. Without this positive feedback, each successive stimulus releases less ACh, producing the characteristic decrement.",
  },
  {
    question: "Approximately what percentage of post-junctional receptors must be blocked before single twitch depression becomes apparent?",
    options: [
      "50%",
      "60%",
      "75-80%",
      "95%",
    ],
    correctIndex: 2,
    explanation: "The NMJ has a large safety margin. Approximately 75% of receptors must be occupied before train-of-four fade appears, and 75-80% before single twitch depression is detectable. Complete clinical paralysis requires >90% receptor occupancy. This safety margin explains why partial curarisation may go undetected clinically.",
  },
  {
    question: "A patient with extensive burns 3 weeks ago is at risk of hyperkalaemia with suxamethonium because of:",
    options: [
      "Increased plasma cholinesterase activity",
      "Upregulation of extrajunctional (fetal-type) nAChRs",
      "Decreased number of post-junctional receptors",
      "Increased acetylcholinesterase activity",
    ],
    correctIndex: 1,
    explanation: "Burns, denervation, prolonged immobilisation, and critical illness cause proliferation of extrajunctional (fetal-type, α₂βδγ) receptors across the entire muscle membrane. These receptors have a longer channel open time. When depolarised by suxamethonium, the massive number of channels opening simultaneously causes life-threatening potassium efflux. The risk begins around 24-48 hours post-injury and may persist for months.",
  },
];

export const localAnaestheticsQuiz: QuizQuestion[] = [
  {
    question: "Which physicochemical property of a local anaesthetic most determines its speed of onset?",
    options: [
      "Lipid solubility",
      "Protein binding",
      "pKa",
      "Molecular weight",
    ],
    correctIndex: 2,
    explanation: "pKa determines the proportion of unionised (membrane-permeable) drug at physiological pH. An agent with a lower pKa has more unionised drug at pH 7.4, so it crosses nerve membranes faster and has a quicker onset. Lidocaine (pKa 7.9) has faster onset than bupivacaine (pKa 8.1) because more is unionised at pH 7.4.",
  },
  {
    question: "A local anaesthetic injection is ineffective in an area of cellulitis. The most likely explanation is:",
    options: [
      "Increased blood flow washing away the LA",
      "Reduced tissue pH increasing the ionised fraction",
      "Bacterial enzymes degrading the LA",
      "Swollen tissue compressing nerve fibres",
    ],
    correctIndex: 1,
    explanation: "Infected tissue is acidic (pH ~6.5). Since LAs are weak bases, lower pH shifts the Henderson-Hasselbalch equilibrium toward the ionised form (BH⁺). Less unionised drug is available to cross the nerve membrane, so the block is ineffective. This is sometimes called 'ion trapping'.",
  },
  {
    question: "Which local anaesthetic is most associated with cardiotoxicity and why?",
    options: [
      "Lidocaine — due to rapid onset",
      "Prilocaine — due to methaemoglobinaemia",
      "Bupivacaine — due to slow dissociation from cardiac Na⁺ channels",
      "Ropivacaine — due to high protein binding",
    ],
    correctIndex: 2,
    explanation: "Bupivacaine has the highest cardiotoxicity of commonly used LAs. It binds to cardiac Na⁺ channels with high affinity and dissociates very slowly ('fast-in, slow-out'), especially during diastole. This prolonged binding causes refractory arrhythmias and cardiovascular collapse that is resistant to conventional resuscitation. Ropivacaine (the S-enantiomer) was developed as a less cardiotoxic alternative.",
  },
  {
    question: "The initial treatment for suspected local anaesthetic systemic toxicity (LAST) with cardiovascular compromise is:",
    options: [
      "Adrenaline 1 mg IV",
      "Intralipid 20% — 1.5 mL/kg bolus",
      "Sodium bicarbonate 50 mmol IV",
      "Amiodarone 300 mg IV",
    ],
    correctIndex: 1,
    explanation: "Intralipid 20% (lipid emulsion) is the specific treatment for LAST. The initial bolus is 1.5 mL/kg IV over 1 minute, followed by an infusion of 15 mL/kg/h. The lipid acts as a 'lipid sink', sequestering lipid-soluble LA from cardiac tissue. Standard ALS drugs (adrenaline in small doses) should be used alongside, but lipid rescue is the key intervention.",
  },
  {
    question: "An amide local anaesthetic can be identified from an ester by:",
    options: [
      "Amides always have a longer duration of action",
      "Amides contain two 'i's in their generic name",
      "Amides are always more potent",
      "Amides have a lower pKa",
    ],
    correctIndex: 1,
    explanation: "A useful mnemonic: amide LAs contain two 'i's in their generic name (lidocaine, prilocaine, bupivacaine, ropivacaine, levobupivacaine), while esters have only one 'i' or none (cocaine, procaine, tetracaine). Amides are metabolised by hepatic CYP450 enzymes, while esters are hydrolysed by plasma cholinesterases.",
  },
];

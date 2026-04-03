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

export const pressureMeasurementQuiz: QuizQuestion[] = [
  { question: "The Wheatstone bridge in an arterial pressure transducer measures changes in:", options: ["Capacitance", "Resistance", "Inductance", "Piezoelectricity"], correctIndex: 1, explanation: "A strain gauge transducer uses a Wheatstone bridge circuit. Diaphragm deflection changes the resistance of strain gauge elements, producing a voltage change proportional to the applied pressure." },
  { question: "A 13 cm error in transducer levelling will produce an error of approximately:", options: ["5 mmHg", "10 mmHg", "15 mmHg", "20 mmHg"], correctIndex: 1, explanation: "13.6 cm of water ≈ 10 mmHg. A transducer placed 13 cm below the phlebostatic axis will over-read by ~10 mmHg; 13 cm above will under-read by ~10 mmHg." },
  { question: "An over-damped arterial line trace will:", options: ["Overestimate systolic pressure", "Underestimate systolic and overestimate diastolic pressure", "Not affect any pressure reading", "Overestimate both systolic and diastolic pressure"], correctIndex: 1, explanation: "Over-damping (air bubbles, clot, kink) produces a sluggish waveform that underestimates systolic and overestimates diastolic. MAP is least affected by damping artefact." },
  { question: "The optimal damping coefficient for an arterial line system is:", options: ["0.2", "0.42", "0.64", "1.0"], correctIndex: 2, explanation: "A damping coefficient (ζ) of 0.64 provides optimal balance — rapid response without excessive overshoot. ζ < 0.4 is under-damped; ζ > 1.0 is over-damped (no oscillation)." },
  { question: "In oscillometric NIBP measurement, the maximum oscillation amplitude corresponds to:", options: ["Systolic pressure", "Diastolic pressure", "Mean arterial pressure", "Pulse pressure"], correctIndex: 2, explanation: "The oscillometric method identifies MAP as the cuff pressure at which oscillation amplitude is maximal. Systolic and diastolic pressures are derived algorithmically, making MAP the most accurate oscillometric measurement." },
];

export const flowMeasurementQuiz: QuizQuestion[] = [
  { question: "According to the Hagen-Poiseuille equation, halving the radius of a tube reduces laminar flow by a factor of:", options: ["2", "4", "8", "16"], correctIndex: 3, explanation: "Flow is proportional to r⁴. Halving the radius: (1/2)⁴ = 1/16. Flow is reduced 16-fold. This explains why even small reductions in airway calibre dramatically increase resistance." },
  { question: "Heliox improves flow in upper airway obstruction because helium has:", options: ["Low viscosity", "Low density", "High thermal conductivity", "Low molecular weight only"], correctIndex: 1, explanation: "Upper airway obstruction produces turbulent flow, which depends on gas density (not viscosity). Helium's density is ~1/7 that of nitrogen, so heliox (79% He/21% O₂) reduces turbulent resistance significantly." },
  { question: "A rotameter is calibrated for a specific gas because at different flow rates, flow depends on:", options: ["Viscosity only", "Density only", "Viscosity at low flows and density at high flows", "Temperature only"], correctIndex: 2, explanation: "At low flows the annular gap is narrow (tube-like, laminar flow dependent on viscosity). At high flows the gap is wide (orifice-like, turbulent flow dependent on density). Both properties are gas-specific." },
  { question: "The Reynolds number predicts transition to turbulent flow when it exceeds:", options: ["500", "1000", "2000", "4000"], correctIndex: 3, explanation: "Re < 2000 = laminar; 2000-4000 = transitional; > 4000 = turbulent. Re = ρvd/η. High velocity, large diameter, high density, and low viscosity favour turbulence." },
  { question: "A Venturi mask delivers a fixed FiO₂ because:", options: ["It uses a reservoir bag", "Air entrainment produces total flow exceeding peak inspiratory flow", "It has a one-way valve", "Oxygen flow is regulated by a demand valve"], correctIndex: 1, explanation: "The Venturi effect entrains room air at a fixed ratio. The total flow (~40 L/min for 28%) exceeds peak inspiratory flow rate, ensuring the patient breathes only the delivered mixture regardless of breathing pattern." },
];

export const vaporizersQuiz: QuizQuestion[] = [
  { question: "Desflurane cannot be used in a conventional plenum vaporizer because:", options: ["Its MAC is too high", "Its SVP is too low", "Its boiling point is close to room temperature (22.8°C)", "It is too viscous"], correctIndex: 2, explanation: "Desflurane's boiling point (22.8°C) is near room temperature, giving an SVP of ~88.5 kPa at 20°C. A conventional vaporizer cannot control such high vapour output. The TEC 6 heats desflurane to 39°C at 2 atm and injects measured vapour." },
  { question: "Temperature compensation in a plenum vaporizer is achieved by:", options: ["Electrical heating element", "Bimetallic strip adjusting the splitting ratio", "Increasing fresh gas flow", "Adding more liquid agent"], correctIndex: 1, explanation: "A bimetallic strip (or aneroid bellows) responds to temperature changes by adjusting the splitting valve. As cooling from latent heat reduces SVP, more gas is diverted through the vaporizing chamber to maintain constant output." },
  { question: "At altitude, a vaporizer set to 2% sevoflurane delivers:", options: ["A lower partial pressure — reduce MAC target", "The same partial pressure — no adjustment needed", "A higher partial pressure — reduce dial setting", "An unpredictable concentration"], correctIndex: 1, explanation: "SVP is independent of atmospheric pressure. The partial pressure of agent leaving the vaporizer remains the same. The percentage concentration increases, but since clinical effect depends on partial pressure, no adjustment is needed." },
  { question: "The splitting ratio for a vaporizer delivering 3% sevoflurane (SVP 21.3 kPa at 20°C, Patm 101.3 kPa) is approximately:", options: ["3:1", "6:1", "10:1", "20:1"], correctIndex: 1, explanation: "Chamber concentration = SVP/Patm × 100 = 21%. To deliver 3%: ratio = (21-3)/3 = 6:1 (bypass:chamber). So for every 7 parts of gas, 1 goes through the chamber and 6 bypass it." },
  { question: "A draw-over vaporizer differs from a plenum vaporizer in that it:", options: ["Has higher output accuracy", "Operates at sub-atmospheric pressure with low resistance", "Requires compressed gas supply", "Cannot be used for sevoflurane"], correctIndex: 1, explanation: "Draw-over vaporizers have low internal resistance allowing the patient to draw gas through by negative pressure (spontaneous ventilation). They are portable, do not require compressed gas, but are less accurate than plenum vaporizers." },
];

export const electricalSafetyQuiz: QuizQuestion[] = [
  { question: "The microshock threshold for ventricular fibrillation via an intracardiac catheter is approximately:", options: ["1 mA", "150 µA", "10 mA", "50 mA"], correctIndex: 1, explanation: "As little as 150 µA (0.15 mA) applied directly to the myocardium can cause VF. This is ~1000× less than the macroshock VF threshold of 100 mA via intact skin." },
  { question: "Type CF equipment is required for intracardiac use because it has a maximum leakage current of:", options: ["100 µA", "50 µA", "10 µA", "1 µA"], correctIndex: 2, explanation: "Type CF (Cardiac Floating) equipment has the most stringent leakage requirement: <10 µA in normal conditions, <50 µA in single fault condition. The floating circuit isolates the patient connection from earth." },
  { question: "Surgical diathermy uses high-frequency alternating current (0.4-3 MHz) because at these frequencies:", options: ["Tissue heating is more efficient", "Neuromuscular stimulation does not occur", "The return plate is not needed", "Current flows only on the surface"], correctIndex: 1, explanation: "At frequencies above ~100 kHz, the rapidly alternating current does not allow sufficient ion movement to depolarise cell membranes, so neuromuscular stimulation does not occur. The thermal effect (tissue heating) is preserved." },
  { question: "The 'let-go' threshold for 50 Hz AC current is approximately:", options: ["1 mA", "5 mA", "15 mA", "50 mA"], correctIndex: 2, explanation: "At ~15 mA, tetanic contraction of flexor muscles prevents the victim from releasing the conductor. Below this, voluntary release is possible. The perception threshold is ~1 mA and pain begins at ~5 mA." },
  { question: "Class II electrical equipment provides protection by:", options: ["Connection to earth via green/yellow wire", "Double insulation without earth connection", "Operating at less than 24V", "Using an isolation transformer"], correctIndex: 1, explanation: "Class II equipment is double insulated — a fault in the primary insulation is protected by secondary insulation. No earth wire is needed (symbol: □ within □). Class I uses earthing; Class III uses safety extra-low voltage." },
];

export const pulseOximetryQuiz: QuizQuestion[] = [
  { question: "A pulse oximeter reads SpO₂ 85% in a patient with significant methaemoglobinaemia. The true SaO₂ is likely:", options: ["85%", "Higher than 85%", "Lower than 85%", "Either higher or lower depending on MetHb level"], correctIndex: 3, explanation: "MetHb absorbs equally at 660 and 940 nm, driving the R ratio toward 1.0 (which corresponds to ~85% on the calibration curve). If true SaO₂ is >85%, the oximeter under-reads; if <85%, it over-reads. SpO₂ converges toward 85% regardless." },
  { question: "The isobestic point (805 nm) is the wavelength at which:", options: ["Maximum absorption occurs", "OxyHb and deoxyHb have equal extinction coefficients", "Pulse oximeters are calibrated", "CO₂ absorption peaks"], correctIndex: 1, explanation: "At the isobestic point (~805 nm), oxyhaemoglobin and deoxyhaemoglobin have identical extinction coefficients. This wavelength is used in co-oximeters as a reference point and for total haemoglobin estimation." },
  { question: "Infrared capnography cannot measure which of the following gases?", options: ["Carbon dioxide", "Nitrous oxide", "Oxygen", "Volatile anaesthetic agents"], correctIndex: 2, explanation: "Oxygen (O₂) is a homonuclear diatomic molecule with no changing dipole moment during vibration, so it does not absorb infrared radiation. O₂ is measured by paramagnetic analysis or fuel cell (galvanic), not by IR absorption." },
  { question: "A sudden loss of the capnograph trace to zero most likely indicates:", options: ["Bronchospasm", "Oesophageal intubation or circuit disconnection", "Pulmonary embolism", "Hyperventilation"], correctIndex: 1, explanation: "Sudden EtCO₂ = 0 indicates no CO₂ is reaching the sensor: oesophageal intubation, circuit disconnection, or total airway obstruction. Cardiac arrest produces an exponential decline, not sudden loss. Bronchospasm produces a shark-fin waveform." },
  { question: "Carboxyhaemoglobin causes a pulse oximeter to:", options: ["Read accurately", "Significantly under-read SpO₂", "Over-read SpO₂ toward normal values", "Display an error message"], correctIndex: 2, explanation: "COHb absorbs similarly to oxyHb at 660 nm, so a two-wavelength oximeter interprets it as oxygenated haemoglobin. SpO₂ reads falsely high — approximately SpO₂ ≈ SaO₂ + %COHb. A CO-oximeter (using 4+ wavelengths) is needed for accurate measurement." },
];

export const lungMechanicsQuiz: QuizQuestion[] = [
  { question: "Total respiratory system compliance is approximately:", options: ["200 ml/cmH₂O", "100 ml/cmH₂O", "50 ml/cmH₂O", "400 ml/cmH₂O"], correctIndex: 1, explanation: "Lung compliance ≈ 200 ml/cmH₂O and chest wall compliance ≈ 200 ml/cmH₂O. In series: 1/Ctotal = 1/200 + 1/200 = 1/100. Total ≈ 100 ml/cmH₂O." },
  { question: "Pulmonary surfactant is produced by:", options: ["Type I pneumocytes", "Type II pneumocytes", "Clara cells", "Alveolar macrophages"], correctIndex: 1, explanation: "Type II pneumocytes (which comprise only ~5% of alveolar surface area but ~60% of alveolar cells) produce surfactant from ~24 weeks gestation. The major component is dipalmitoylphosphatidylcholine (DPPC)." },
  { question: "According to Laplace's law (P = 2T/r), without surfactant small alveoli would:", options: ["Over-expand", "Empty into larger alveoli", "Remain stable", "Fill with fluid"], correctIndex: 1, explanation: "Without surfactant, smaller alveoli have higher collapsing pressure (P = 2T/r — same T but smaller r). They would empty into larger alveoli. Surfactant reduces T more in smaller alveoli, equalising pressures." },
  { question: "The major site of airway resistance is:", options: ["Trachea", "Medium-sized bronchi (generations 4-8)", "Terminal bronchioles", "Alveolar ducts"], correctIndex: 1, explanation: "Although individual small airways are narrow, their enormous number in parallel gives a very large total cross-sectional area and low total resistance. Medium bronchi (generations 4-8) contribute most to total airway resistance." },
  { question: "The time constant (τ) of a lung unit is:", options: ["Compliance / Resistance", "Resistance × Compliance", "Resistance / Compliance", "1 / (Resistance × Compliance)"], correctIndex: 1, explanation: "τ = R × C (seconds). After 1τ, 63% equilibration; 3τ = 95%; 5τ = 99%. A high time constant (high R or high C) means slow filling/emptying, predisposing to gas trapping and auto-PEEP." },
];

export const renalPhysiologyQuiz: QuizQuestion[] = [
  { question: "Normal GFR is approximately:", options: ["60 ml/min", "90 ml/min", "125 ml/min", "180 ml/min"], correctIndex: 2, explanation: "Normal GFR ≈ 125 ml/min (180 L/day). Only ~1% of filtered volume is excreted as urine (~1.5 L/day). GFR < 60 ml/min sustained for >3 months defines CKD stage 3." },
  { question: "Loop diuretics act on which transporter?", options: ["Na⁺/K⁺-ATPase", "SGLT2", "Na⁺/K⁺/2Cl⁻ (NKCC2)", "ENaC"], correctIndex: 2, explanation: "Loop diuretics (furosemide, bumetanide) inhibit the NKCC2 transporter on the luminal membrane of the thick ascending limb of the loop of Henle, preventing NaCl reabsorption and disrupting the medullary concentration gradient." },
  { question: "Renal autoregulation maintains GFR over a MAP range of:", options: ["60-120 mmHg", "80-180 mmHg", "100-200 mmHg", "50-100 mmHg"], correctIndex: 1, explanation: "Autoregulation (myogenic response + tubuloglomerular feedback) maintains relatively constant GFR and renal blood flow over MAP 80-180 mmHg. Below MAP 80, GFR falls approximately linearly with pressure." },
  { question: "The most important adaptive mechanism for renal acid excretion in chronic acidosis is:", options: ["HCO₃⁻ reabsorption", "Titratable acid (H₂PO₄⁻)", "NH₄⁺ production and excretion", "H⁺-ATPase activity"], correctIndex: 2, explanation: "While HCO₃⁻ reabsorption handles the largest quantity of acid daily, NH₄⁺ production (from glutamine in PCT cells) is the most adaptable — it can increase 10-fold in chronic metabolic acidosis, providing the main route for increased acid excretion." },
  { question: "ADH increases water reabsorption in the collecting duct by:", options: ["Opening ENaC channels", "Inserting aquaporin-2 channels via V2 receptors", "Increasing Na⁺/K⁺-ATPase activity", "Stimulating aldosterone release"], correctIndex: 1, explanation: "ADH binds V2 receptors on the basolateral membrane of collecting duct principal cells → cAMP → insertion of aquaporin-2 (AQP2) water channels into the apical membrane → increased water permeability and reabsorption." },
];

export const autonomicNervousQuiz: QuizQuestion[] = [
  { question: "The postganglionic neurotransmitter of the sympathetic nervous system is:", options: ["Acetylcholine", "Noradrenaline", "Dopamine", "Adrenaline"], correctIndex: 1, explanation: "Sympathetic postganglionic neurones release noradrenaline (except sweat glands which use ACh, and the adrenal medulla which releases adrenaline and noradrenaline directly into the blood). All preganglionic neurones (sympathetic and parasympathetic) use ACh." },
  { question: "α₂-adrenoceptor agonists (e.g., clonidine, dexmedetomidine) produce sedation and analgesia by acting on:", options: ["Postsynaptic receptors in vascular smooth muscle", "Presynaptic receptors in the locus coeruleus and spinal cord", "β₁ receptors in the heart", "Muscarinic receptors in the brainstem"], correctIndex: 1, explanation: "α₂ agonists act on presynaptic autoreceptors in the locus coeruleus (sedation without respiratory depression) and spinal cord dorsal horn (analgesia). They reduce noradrenaline release via negative feedback, producing sympatholysis, sedation, and analgesia." },
  { question: "The oculocardiac reflex is mediated by:", options: ["CN V afferent, CN X efferent", "CN II afferent, CN VII efferent", "CN IX afferent, CN X efferent", "CN V afferent, CN VII efferent"], correctIndex: 0, explanation: "Pressure on the globe → afferent via CN V₁ (ophthalmic division of trigeminal) → brainstem → efferent via CN X (vagus) → bradycardia. Treatment: release pressure, atropine or glycopyrrolate if persistent." },
  { question: "The rate-limiting enzyme in noradrenaline synthesis is:", options: ["DOPA decarboxylase", "Dopamine β-hydroxylase", "Tyrosine hydroxylase", "COMT"], correctIndex: 2, explanation: "Tyrosine hydroxylase converts tyrosine to DOPA and is the rate-limiting step. The full pathway: Tyrosine → DOPA (tyrosine hydroxylase) → Dopamine (DOPA decarboxylase) → Noradrenaline (dopamine β-hydroxylase) → Adrenaline (PNMT, adrenal medulla only)." },
  { question: "The baroreceptor reflex resets in chronic hypertension, meaning:", options: ["It becomes more sensitive", "It operates around a higher set-point pressure", "It is abolished completely", "It only responds to falls in pressure"], correctIndex: 1, explanation: "In chronic hypertension, baroreceptors reset to operate around the new, higher baseline pressure. This means they defend the elevated BP as 'normal' and resist acute reductions. The reflex is not abolished but shifted to a higher operating range." },
];

export const ivAnaestheticsQuiz: QuizQuestion[] = [
  { question: "Which IV anaesthetic agent is absolutely contraindicated in porphyria?", options: ["Propofol", "Ketamine", "Thiopentone", "Etomidate"], correctIndex: 2, explanation: "Thiopentone (and all barbiturates) is absolutely contraindicated in porphyria because it induces ALA synthase, the rate-limiting enzyme in haem synthesis, potentially precipitating an acute porphyric crisis with abdominal pain, neuropathy, and psychiatric disturbance." },
  { question: "Etomidate causes adrenocortical suppression by inhibiting:", options: ["17α-hydroxylase", "21-hydroxylase", "11β-hydroxylase", "Aromatase"], correctIndex: 2, explanation: "Etomidate inhibits 11β-hydroxylase (and to a lesser extent 17α-hydroxylase), blocking cortisol and aldosterone synthesis. Even a single induction dose suppresses the adrenal axis for approximately 24 hours. This makes it unsuitable for infusion." },
  { question: "Ketamine differs from other IV induction agents because it:", options: ["Causes respiratory depression", "Is a GABA_A agonist", "Produces cardiovascular stimulation and analgesia", "Has no effect on intracranial pressure"], correctIndex: 2, explanation: "Ketamine is an NMDA antagonist (not GABA_A). It is the only IV induction agent providing significant analgesia. Its indirect sympathomimetic effect increases HR, BP, and SVR — useful in hypovolaemia and tamponade. It raises ICP and IOP." },
  { question: "Propofol's antiemetic property is a clinical advantage because:", options: ["It directly antagonises 5-HT₃ receptors", "It reduces PONV at sub-hypnotic plasma concentrations", "It is structurally similar to ondansetron", "It increases gastric emptying"], correctIndex: 1, explanation: "Propofol has antiemetic properties at sub-hypnotic concentrations (~1 µg/ml). The exact mechanism is unclear but may involve dopamine receptor antagonism in the CTZ. This makes TIVA with propofol associated with lower PONV rates than volatile-based anaesthesia." },
  { question: "The Marsh and Schnider models for propofol TCI differ in that:", options: ["Marsh targets effect-site only", "Schnider incorporates age, height, and lean body mass", "Marsh is only for children", "Schnider uses a one-compartment model"], correctIndex: 1, explanation: "The Marsh model uses total body weight only. The Schnider model incorporates age, weight, height, and lean body mass (LBM), adjusting pharmacokinetics for patient demographics. Schnider is generally preferred in the elderly and obese." },
];

export const opioidsQuiz: QuizQuestion[] = [
  { question: "The µ (mu) opioid receptor is coupled to:", options: ["Gs protein (↑cAMP)", "Gi/Go protein (↓cAMP, opens K⁺ channels)", "Gq protein (↑IP₃/DAG)", "Ion channel directly"], correctIndex: 1, explanation: "All three classical opioid receptors (µ, κ, δ) are coupled to inhibitory G-proteins (Gi/Go). Activation → ↓cAMP, opens K⁺ channels (hyperpolarisation), closes voltage-gated Ca²⁺ channels → reduced neurotransmitter release." },
  { question: "Morphine's active metabolite that accumulates in renal failure is:", options: ["M3G", "M6G", "Normorphine", "Codeine"], correctIndex: 1, explanation: "Morphine-6-glucuronide (M6G) is pharmacologically active with potent analgesic and respiratory depressant effects. It is renally excreted and accumulates in renal impairment, causing prolonged sedation and respiratory depression." },
  { question: "Remifentanil has a constant context-sensitive half-time because:", options: ["It has a very small volume of distribution", "It is metabolised by non-specific tissue esterases", "It is not protein-bound", "It undergoes rapid renal excretion"], correctIndex: 1, explanation: "Remifentanil contains an ester linkage that is rapidly hydrolysed by non-specific tissue and blood esterases (not plasma cholinesterase). This organ-independent metabolism prevents accumulation regardless of infusion duration, giving a constant CSHT of ~3-4 minutes." },
  { question: "Alfentanil has a faster onset than fentanyl despite lower lipid solubility because:", options: ["It has a higher dose", "Its low pKa (6.5) means 90% is un-ionised at pH 7.4", "It is given by a different route", "It has greater µ receptor affinity"], correctIndex: 1, explanation: "Alfentanil's pKa of 6.5 means ~90% is un-ionised at physiological pH 7.4 (compared to ~9% for fentanyl, pKa 8.4). Only un-ionised drug crosses the BBB, so despite lower lipid solubility, more alfentanil is available for brain penetration." },
  { question: "Codeine is a prodrug that requires conversion to morphine by:", options: ["CYP3A4", "CYP2D6", "CYP2C19", "Plasma esterases"], correctIndex: 1, explanation: "CYP2D6 O-demethylates codeine to morphine (~10% of dose). ~10% of Caucasians are poor metabolisers (no analgesia from codeine). Ultra-rapid metabolisers produce excess morphine — risk of toxicity, especially dangerous in breastfeeding mothers." },
];

export const muscleRelaxantsQuiz: QuizQuestion[] = [
  { question: "Suxamethonium is metabolised by:", options: ["Hepatic CYP450", "Acetylcholinesterase", "Plasma cholinesterase (butyrylcholinesterase)", "Hofmann elimination"], correctIndex: 2, explanation: "Suxamethonium is rapidly hydrolysed by plasma cholinesterase (pseudocholinesterase/butyrylcholinesterase). Patients with atypical plasma cholinesterase (dibucaine number <30) may have prolonged block lasting hours instead of minutes." },
  { question: "The dose of sugammadex for immediate reversal of rocuronium ('can't intubate, can't oxygenate') is:", options: ["2 mg/kg", "4 mg/kg", "8 mg/kg", "16 mg/kg"], correctIndex: 3, explanation: "Sugammadex 16 mg/kg IV provides immediate reversal of rocuronium, even at full intubating doses. 2 mg/kg for moderate block (TOF ≥2), 4 mg/kg for deep block (PTC ≥1). The 16 mg/kg dose enables rocuronium as a suxamethonium alternative for RSI." },
  { question: "Cisatracurium is preferred in renal and hepatic failure because it undergoes:", options: ["Renal excretion unchanged", "Hepatic glucuronidation", "Hofmann degradation (organ-independent)", "Plasma cholinesterase hydrolysis"], correctIndex: 2, explanation: "Cisatracurium undergoes Hofmann elimination — a spontaneous non-enzymatic degradation dependent only on pH and temperature, independent of organ function. This makes it ideal for patients with renal and/or hepatic impairment." },
  { question: "Neostigmine must be co-administered with glycopyrrolate or atropine because:", options: ["To speed up reversal", "To prevent nicotinic side effects", "To block unwanted muscarinic effects (bradycardia, secretions)", "To enhance neuromuscular blockade"], correctIndex: 2, explanation: "Neostigmine is a non-selective anticholinesterase — it increases ACh at both nicotinic (desired NMJ reversal) and muscarinic receptors (unwanted bradycardia, salivation, bronchospasm, increased gut motility). An antimuscarinic blocks the latter." },
  { question: "A TOF ratio of 0.85 indicates:", options: ["Complete recovery", "Clinically significant residual blockade", "Deep neuromuscular block", "Phase II block"], correctIndex: 1, explanation: "A TOF ratio <0.9 indicates clinically significant residual neuromuscular blockade associated with impaired pharyngeal function, increased aspiration risk, and upper airway obstruction. Modern standards require TOF ratio ≥0.9 before extubation." },
];

export const airwayManagementQuestions: QuizQuestion[] = [
  { question: "According to DAS 2015, what is the maximum number of intubation attempts before moving to Plan B?", options: ["2", "3+1", "4", "5"], correctIndex: 1, explanation: "DAS recommends a maximum of 3+1 intubation attempts (3 by the primary operator, 1 by a more experienced colleague) before declaring failure and moving to Plan B (SAD)." },
  { question: "Which is the DAS-recommended technique for emergency front-of-neck access?", options: ["Needle cricothyroidotomy", "Percutaneous tracheostomy", "Scalpel-bougie-tube cricothyroidotomy", "Retrograde intubation"], correctIndex: 2, explanation: "DAS 2015 recommends the scalpel-bougie-tube technique through the cricothyroid membrane as the emergency surgical airway in CICO situations." },
  { question: "What distinguishes a 2nd-generation SAD from a 1st-generation device?", options: ["Reusable design", "Integrated gastric drain channel", "Inflatable cuff", "Fibreoptic compatibility"], correctIndex: 1, explanation: "2nd-generation SADs (i-gel, ProSeal) have an integrated gastric drain port and higher oropharyngeal seal pressures, reducing aspiration risk." },
  { question: "NAP4 recommended that videolaryngoscopy should be:", options: ["Used only after failed direct laryngoscopy", "Available in all anaesthetic locations", "The default for all intubations", "Reserved for ENT cases only"], correctIndex: 1, explanation: "NAP4 recommended that videolaryngoscopy should be immediately available in all locations where tracheal intubation is performed." },
  { question: "The tube size recommended for scalpel cricothyroidotomy is:", options: ["4.0 mm cuffed", "6.0 mm cuffed", "8.0 mm cuffed", "Uncuffed tracheostomy tube"], correctIndex: 1, explanation: "A 6.0 mm cuffed ETT railroaded over a bougie is the DAS-recommended tube for emergency cricothyroidotomy." },
];

export const sepsisQuestions: QuizQuestion[] = [
  { question: "According to Sepsis-3, sepsis is defined as:", options: ["SIRS + suspected infection", "Infection + organ dysfunction (SOFA ≥2)", "Bacteraemia + hypotension", "qSOFA ≥2 + positive blood cultures"], correctIndex: 1, explanation: "Sepsis-3 (2016) defines sepsis as life-threatening organ dysfunction caused by a dysregulated host response to infection, operationalised as a SOFA score increase of ≥2 points." },
  { question: "The first-line vasopressor in septic shock is:", options: ["Adrenaline", "Vasopressin", "Noradrenaline", "Dobutamine"], correctIndex: 2, explanation: "Noradrenaline is the first-line vasopressor in septic shock (SSC guidelines). It has potent α₁ effects to increase SVR with some β₁ activity." },
  { question: "Each hour delay in antibiotic administration in sepsis increases mortality by approximately:", options: ["1%", "4%", "7%", "15%"], correctIndex: 2, explanation: "Studies show approximately 7% increase in mortality for each hour delay in appropriate antibiotic administration in septic shock." },
  { question: "The SSC Hour-1 bundle fluid resuscitation target is:", options: ["10 ml/kg crystalloid", "20 ml/kg crystalloid", "30 ml/kg crystalloid", "500 ml colloid"], correctIndex: 2, explanation: "The SSC recommends 30 ml/kg crystalloid for hypotension or lactate ≥4 mmol/L, initiated within 1 hour." },
  { question: "Hydrocortisone in septic shock is indicated when:", options: ["All patients with sepsis", "Haemodynamic instability persists despite fluids and vasopressors", "Lactate >2 mmol/L", "Temperature >39°C"], correctIndex: 1, explanation: "IV hydrocortisone 200 mg/day is recommended when haemodynamic instability persists despite adequate fluid resuscitation and vasopressor therapy." },
];

export const mechanicalVentilationQuestions: QuizQuestion[] = [
  { question: "In lung-protective ventilation for ARDS, the target tidal volume is:", options: ["4 ml/kg actual body weight", "6 ml/kg ideal body weight", "8 ml/kg ideal body weight", "10 ml/kg actual body weight"], correctIndex: 1, explanation: "ARDSNet protocol: tidal volume 6 ml/kg ideal (predicted) body weight, with plateau pressure ≤30 cmH₂O." },
  { question: "Which ventilator waveform parameter is the strongest predictor of mortality in ARDS?", options: ["Peak inspiratory pressure", "Mean airway pressure", "Driving pressure (Pplat - PEEP)", "PEEP level"], correctIndex: 2, explanation: "Driving pressure (Pplat - PEEP) is the strongest ventilator variable associated with survival in ARDS. Target ≤15 cmH₂O." },
  { question: "The rapid shallow breathing index (RSBI) threshold predicting successful extubation is:", options: ["<50", "<80", "<105", "<150"], correctIndex: 2, explanation: "RSBI (f/VT) <105 breaths/min/L predicts successful extubation with good sensitivity. It is measured during a spontaneous breathing trial." },
  { question: "In pressure control ventilation, what is guaranteed?", options: ["Tidal volume", "Minute ventilation", "Inspiratory pressure", "Flow rate"], correctIndex: 2, explanation: "PCV delivers a set inspiratory pressure with decelerating flow. Tidal volume varies with lung compliance and resistance." },
  { question: "Pressure support ventilation requires:", options: ["Deep sedation", "Intact respiratory drive", "Neuromuscular blockade", "Mandatory rate setting"], correctIndex: 1, explanation: "PSV is a patient-triggered mode — each breath is initiated by the patient. It requires intact respiratory drive and is commonly used for weaning." },
];

export const traumaEmergencyQuestions: QuizQuestion[] = [
  { question: "The CRASH-2 trial showed that tranexamic acid in trauma should be given within:", options: ["1 hour", "3 hours", "6 hours", "12 hours"], correctIndex: 1, explanation: "CRASH-2 demonstrated mortality benefit when TXA 1g IV was given within 3 hours of injury. Benefit was greatest when given within 1 hour. TXA given after 3 hours may increase mortality." },
  { question: "In damage control resuscitation, the target blood product ratio (PRBC:FFP:Platelets) is:", options: ["3:1:1", "2:1:1", "1:1:1", "1:2:1"], correctIndex: 2, explanation: "Haemostatic resuscitation uses a 1:1:1 ratio of packed red cells, fresh frozen plasma, and platelets to prevent and treat the coagulopathy of trauma." },
  { question: "Permissive hypotension targets a systolic BP of:", options: ["60-70 mmHg", "80-90 mmHg", "100-110 mmHg", "120 mmHg"], correctIndex: 1, explanation: "Permissive hypotension (SBP 80-90 mmHg) reduces bleeding until surgical haemorrhage control is achieved. Exception: TBI patients require higher targets (SBP >100)." },
  { question: "The preferred induction agent for RSI in a haemodynamically unstable patient is:", options: ["Propofol", "Thiopentone", "Ketamine", "Midazolam"], correctIndex: 2, explanation: "Ketamine (1-2 mg/kg) maintains sympathetic tone and is the induction agent of choice in haemodynamically unstable trauma patients." },
  { question: "Which complication of massive transfusion is caused by citrate in stored blood?", options: ["Hyperkalaemia", "Hypocalcaemia", "Hypothermia", "TRALI"], correctIndex: 1, explanation: "Citrate in stored blood chelates calcium, causing hypocalcaemia. This can impair coagulation and cardiac contractility. Monitor ionised calcium and replace with calcium chloride/gluconate." },
];

export const circulatoryFailureQuestions: QuizQuestion[] = [
  { question: "The passive leg raise test predicts fluid responsiveness if cardiac output increases by:", options: ["≥5%", "≥10%", "≥15%", "≥20%"], correctIndex: 1, explanation: "A ≥10% increase in cardiac output during PLR (autotransfusion of ~300ml from legs) predicts fluid responsiveness. It works in spontaneous breathing and arrhythmias." },
  { question: "Pulse pressure variation >13% predicts fluid responsiveness. This requires:", options: ["Spontaneous breathing", "Sinus rhythm + controlled ventilation + VT ≥8 ml/kg", "Prone positioning", "High-dose vasopressors"], correctIndex: 1, explanation: "PPV requires sinus rhythm, controlled mechanical ventilation, and adequate tidal volume (≥8 ml/kg) for reliable prediction." },
  { question: "In cardiogenic shock, the first-line inotrope is:", options: ["Noradrenaline", "Dobutamine", "Milrinone", "Adrenaline"], correctIndex: 1, explanation: "Dobutamine (β₁ > β₂ agonist) is the first-line inotrope in cardiogenic shock, increasing contractility and cardiac output." },
  { question: "Which type of shock is characterised by high CVP, low CO, and high SVR?", options: ["Distributive", "Hypovolaemic", "Cardiogenic", "Neurogenic"], correctIndex: 2, explanation: "Cardiogenic shock: pump failure causes ↑CVP (backup), ↓CO, and compensatory ↑SVR." },
  { question: "CVP is considered a poor predictor of fluid responsiveness because:", options: ["It cannot be measured accurately", "It does not reflect preload on the Frank-Starling curve", "It is affected by PEEP only", "It requires a PA catheter"], correctIndex: 1, explanation: "CVP reflects right atrial pressure, not position on the Frank-Starling curve. A given CVP cannot predict whether additional fluid will increase stroke volume." },
];

export const clinicalIncidentsQuestions: QuizQuestion[] = [
  { question: "The first-line treatment for perioperative anaphylaxis is:", options: ["IV chlorphenamine", "IV hydrocortisone", "IM adrenaline 0.5 mg", "IV fluid bolus"], correctIndex: 2, explanation: "IM adrenaline 0.5 mg (0.5 ml of 1:1000) is first-line for anaphylaxis. It provides α₁ vasoconstriction and β₂ bronchodilation. Repeat every 5 minutes if needed." },
  { question: "The earliest clinical sign of malignant hyperthermia is:", options: ["Hyperthermia", "Rising end-tidal CO₂", "Rhabdomyolysis", "DIC"], correctIndex: 1, explanation: "Rising EtCO₂ is typically the earliest sign of MH, reflecting the hypermetabolic state. Hyperthermia is a relatively late sign." },
  { question: "The dose of dantrolene for malignant hyperthermia is:", options: ["1 mg/kg", "2.5 mg/kg", "5 mg/kg", "10 mg/kg"], correctIndex: 1, explanation: "Dantrolene 2.5 mg/kg IV, repeated every 5-10 minutes up to 10 mg/kg total. It acts on the ryanodine receptor to reduce intracellular calcium release." },
  { question: "The initial Intralipid 20% bolus dose for LA toxicity is:", options: ["0.5 ml/kg", "1.0 ml/kg", "1.5 ml/kg", "3.0 ml/kg"], correctIndex: 2, explanation: "Intralipid 20% bolus 1.5 ml/kg over 1 minute, followed by infusion at 15 ml/kg/hr. The lipid sink theory: lipid emulsion sequesters lipophilic LA from tissues." },
  { question: "The commonest cause of perioperative anaphylaxis is:", options: ["Latex", "Antibiotics", "Neuromuscular blocking agents", "Chlorhexidine"], correctIndex: 2, explanation: "NMBAs account for approximately 60% of perioperative anaphylaxis cases (NAP6). Suxamethonium and rocuronium are the most frequently implicated agents." },
];

export const ardsQuestions: QuizQuestion[] = [
  { question: "The Berlin definition classifies severe ARDS as PaO₂/FiO₂:", options: ["<300 mmHg", "<200 mmHg", "<100 mmHg", "<50 mmHg"], correctIndex: 2, explanation: "Berlin definition: mild 200-300, moderate 100-200, severe <100 mmHg, all with PEEP ≥5 cmH₂O." },
  { question: "The PROSEVA trial demonstrated mortality benefit from prone positioning when applied for:", options: ["≥4 hours/day", "≥8 hours/day", "≥12 hours/day", "≥16 hours/day"], correctIndex: 3, explanation: "PROSEVA (2013): prone positioning ≥16 hours/day in moderate-severe ARDS (P/F <150) reduced 28-day mortality from 32.8% to 16.0%." },
  { question: "VV-ECMO should be considered in ARDS when PaO₂/FiO₂ is:", options: ["<200 despite optimisation", "<150 despite optimisation", "<100 despite optimisation", "<80 despite optimisation"], correctIndex: 3, explanation: "EOLIA trial criteria for VV-ECMO referral include PaO₂/FiO₂ <80 despite optimal ventilation, or pH <7.25 with PaCO₂ ≥60." },
  { question: "The FACTT trial demonstrated that conservative fluid strategy in ARDS:", options: ["Increased mortality", "Improved oxygenation and ventilator-free days", "Had no effect", "Increased renal failure"], correctIndex: 1, explanation: "FACTT showed conservative fluid strategy improved oxygenation, increased ventilator-free days, and reduced ICU length of stay without increasing organ failure." },
  { question: "A key criterion in the Berlin definition of ARDS is:", options: ["Positive blood cultures", "PEEP ≥5 cmH₂O", "Fever >38.5°C", "White cell count >12"], correctIndex: 1, explanation: "Berlin criteria: acute onset (≤7 days), bilateral opacities on imaging, respiratory failure not fully explained by cardiac failure, and PEEP ≥5 cmH₂O." },
];

export const acidBaseQuestions: QuizQuestion[] = [
  { question: "Winter's formula for expected PaCO₂ in metabolic acidosis is:", options: ["PaCO₂ = HCO₃⁻ + 15", "PaCO₂ = 1.5 × [HCO₃⁻] + 8 ± 2", "PaCO₂ = 2 × [HCO₃⁻]", "PaCO₂ = [HCO₃⁻] × 0.7 + 21"], correctIndex: 1, explanation: "Winter's formula: expected PaCO₂ = 1.5 × [HCO₃⁻] + 8 ± 2. If actual PaCO₂ differs, a mixed disorder is present." },
  { question: "Normal saline (0.9% NaCl) causes acidosis by:", options: ["Increasing PaCO₂", "Reducing strong ion difference (hyperchloraemia)", "Increasing lactate", "Diluting albumin"], correctIndex: 1, explanation: "0.9% NaCl has [Cl⁻] of 154 mmol/L (supra-physiological). Excess chloride reduces the strong ion difference (SID), causing hyperchloraemic metabolic acidosis." },
  { question: "In the Stewart approach, which are the independent variables determining pH?", options: ["pH, HCO₃⁻, and BE", "SID, PaCO₂, and Atot", "Na⁺, K⁺, and Cl⁻", "Lactate, albumin, and phosphate"], correctIndex: 1, explanation: "Stewart identified 3 independent variables: strong ion difference (SID), PaCO₂, and total weak acids (Atot — mainly albumin and phosphate)." },
  { question: "Each 10 g/L decrease in albumin affects base excess by approximately:", options: ["+1 mEq/L", "+2.5 mEq/L", "-2.5 mEq/L", "No effect"], correctIndex: 1, explanation: "Hypoalbuminaemia causes a metabolic alkalosis in the Stewart framework. Each 10 g/L decrease in albumin increases base excess by ~2.5 mEq/L." },
  { question: "Type B lactic acidosis can be caused by:", options: ["Haemorrhagic shock", "Cardiac arrest", "Metformin toxicity", "Severe anaemia"], correctIndex: 2, explanation: "Type B (non-hypoxic) lactic acidosis: metformin, liver failure, malignancy, thiamine deficiency, propofol infusion syndrome. Type A = tissue hypoperfusion." },
];

export const cardiacOutputMonitoringQuestions: QuizQuestion[] = [
  { question: "The PA catheter measures cardiac output using which principle?", options: ["Fick principle", "Thermodilution (Stewart-Hamilton)", "Pulse contour analysis", "Doppler velocity"], correctIndex: 1, explanation: "The PAC uses thermodilution — cold saline injected via RA port, temperature change measured at PA tip. CO is inversely proportional to the area under the temperature-time curve (Stewart-Hamilton equation)." },
  { question: "PiCCO uniquely measures which parameter not available from a PAC?", options: ["Mixed venous O₂", "Pulmonary artery wedge pressure", "Extravascular lung water (EVLWI)", "Right ventricular ejection fraction"], correctIndex: 2, explanation: "Transpulmonary thermodilution allows calculation of EVLWI (extravascular lung water index), useful for guiding fluid therapy in ARDS. PAC cannot measure this." },
  { question: "An oesophageal Doppler FTc of <330 ms suggests:", options: ["Fluid overload", "Hypovolaemia", "High SVR", "Aortic stenosis"], correctIndex: 1, explanation: "Corrected flow time (FTc) <330 ms indicates short systolic ejection time, suggesting inadequate preload (hypovolaemia). This is used in goal-directed fluid therapy." },
  { question: "The PAC-Man trial concluded that:", options: ["PAC use reduces mortality", "PAC use increases mortality", "PAC use had no effect on mortality", "PAC is contraindicated in sepsis"], correctIndex: 2, explanation: "PAC-Man (2005) found no clear evidence of benefit or harm from PAC use in ICU. It did not improve hospital mortality compared to standard care." },
  { question: "Echocardiography calculates CO using:", options: ["Thermodilution", "LVOT VTI × LVOT area × HR", "Impedance cardiography", "Arterial pulse contour"], correctIndex: 1, explanation: "CO = LVOT VTI × LVOT cross-sectional area × heart rate. VTI (velocity-time integral) is measured using pulsed-wave Doppler at the LVOT." },
];

export const akiRrtQuestions: QuizQuestion[] = [
  { question: "KDIGO Stage 2 AKI is defined as serum creatinine:", options: ["1.5-1.9× baseline", "2.0-2.9× baseline", "≥3.0× baseline", "≥353.6 µmol/L"], correctIndex: 1, explanation: "KDIGO Stage 2: creatinine 2.0-2.9× baseline. Stage 1: 1.5-1.9× or ↑≥26.5 in 48h. Stage 3: ≥3× or ≥353.6 or RRT initiated." },
  { question: "The preferred anticoagulation method for CRRT is:", options: ["Systemic heparin", "LMWH", "Regional citrate", "Argatroban"], correctIndex: 2, explanation: "Regional citrate anticoagulation is preferred — it chelates calcium locally in the circuit without systemic anticoagulation, reducing bleeding risk. KDIGO recommends citrate for CRRT in patients without contraindications." },
  { question: "The STARRT-AKI trial showed that early vs standard RRT initiation:", options: ["Reduced mortality", "No difference in 90-day mortality", "Increased mortality", "Reduced ICU length of stay"], correctIndex: 1, explanation: "STARRT-AKI (2020): accelerated strategy showed no mortality benefit. The standard strategy avoided RRT entirely in many patients, supporting a watchful approach." },
  { question: "The recommended effluent dose for CRRT (KDIGO) is:", options: ["15 ml/kg/hr", "20-25 ml/kg/hr", "35-40 ml/kg/hr", "50 ml/kg/hr"], correctIndex: 1, explanation: "KDIGO recommends 20-25 ml/kg/hr. The ATN and RENAL trials showed no benefit from higher doses (35-40 ml/kg/hr)." },
  { question: "CRRT is preferred over IHD in critically ill patients primarily because:", options: ["Better small-molecule clearance", "Greater haemodynamic stability", "Lower cost", "No anticoagulation needed"], correctIndex: 1, explanation: "CRRT removes fluid and solutes gradually over 24 hours, causing less haemodynamic instability than IHD's rapid removal over 3-4 hours. This is crucial in vasopressor-dependent patients." },
];

export const regionalAnaesthesiaQuestions: QuizQuestion[] = [
  { question: "Interscalene block causes phrenic nerve palsy in approximately:", options: ["10% of cases", "30% of cases", "50% of cases", "100% of cases"], correctIndex: 3, explanation: "Interscalene block causes ipsilateral phrenic nerve palsy in virtually 100% of cases due to proximity of C3-5 roots. Contraindicated in contralateral phrenic palsy or severe respiratory disease." },
  { question: "The gold standard treatment for post-dural puncture headache is:", options: ["Bed rest", "IV caffeine", "Epidural blood patch", "Sumatriptan"], correctIndex: 2, explanation: "Epidural blood patch (15-20 ml autologous blood) is the definitive treatment with >90% success rate. Conservative measures (fluids, caffeine, simple analgesics) tried first." },
  { question: "The most important safety concern with epidural insertion in anticoagulated patients is:", options: ["Failed block", "Dural puncture", "Epidural haematoma", "Local anaesthetic toxicity"], correctIndex: 2, explanation: "Epidural haematoma can cause permanent paraplegia if not decompressed within 12 hours. AAGBI/ESRA guidelines specify timing intervals for neuraxial techniques relative to anticoagulants." },
  { question: "Which peripheral nerve block is motor-sparing and preferred for knee surgery analgesia?", options: ["Femoral nerve block", "Adductor canal block", "Sciatic nerve block", "Obturator nerve block"], correctIndex: 1, explanation: "Adductor canal block targets the saphenous nerve (sensory) with minimal quadriceps weakness, unlike femoral nerve block which causes significant motor block and falls risk." },
  { question: "Heavy (hyperbaric) bupivacaine contains glucose at a concentration of:", options: ["2%", "5%", "8%", "10%"], correctIndex: 2, explanation: "Heavy bupivacaine 0.5% is mixed with 8% glucose, making it hyperbaric relative to CSF. This allows predictable spread influenced by patient positioning and gravity." },
  { question: "What is the key sonoanatomical landmark for an interscalene block?", options: ["Subclavian artery and first rib", "Nerve roots between anterior and middle scalene ('traffic light sign')", "Axillary artery with surrounding nerves", "Shamrock sign at the transverse process"], correctIndex: 1, explanation: "The interscalene block targets C5-C7 roots which appear as hypoechoic round structures ('traffic light sign') in the groove between the anterior and middle scalene muscles at the C6 level." },
  { question: "In a supraclavicular block, the 'corner pocket' refers to the junction between:", options: ["Clavicle and subclavian vein", "First rib and subclavian artery", "Middle scalene and anterior scalene", "Pleura and first rib"], correctIndex: 1, explanation: "The 'corner pocket' is the angle between the first rib (hyperechoic with acoustic shadow) and the subclavian artery. The brachial plexus divisions cluster here as a 'bunch of grapes'. Targeting this area provides reliable, dense anaesthesia of the upper limb." },
  { question: "During an axillary block, which nerve must be blocked separately as it leaves the sheath early?", options: ["Radial nerve", "Ulnar nerve", "Musculocutaneous nerve", "Median nerve"], correctIndex: 2, explanation: "The musculocutaneous nerve departs the brachial plexus sheath proximally and enters the coracobrachialis muscle. It appears as a hyperechoic oval within the muscle and must be blocked separately for complete arm anaesthesia (lateral cutaneous nerve of forearm territory)." },
  { question: "The 'VAN' mnemonic for the femoral nerve block describes structures from medial to lateral as:", options: ["Vein, Artery, Nerve", "Vastus, Adductor, Nerve", "Vein, Adductor, Nerve", "Vastus, Artery, Nerve"], correctIndex: 0, explanation: "VAN = Vein–Artery–Nerve from medial to lateral. The femoral nerve lies lateral to the femoral artery, deep to the fascia iliaca. Two fascial layers must be traversed: fascia lata and fascia iliaca." },
  { question: "What is the key advantage of adductor canal block over femoral nerve block?", options: ["Provides visceral analgesia", "Blocks posterior knee innervation", "Preserves quadriceps strength (motor-sparing)", "Requires smaller LA volume"], correctIndex: 2, explanation: "The adductor canal block targets the saphenous nerve (purely sensory) within the canal beneath the sartorius, preserving quadriceps function and reducing fall risk — a major concern with femoral nerve blocks in knee arthroplasty patients." },
  { question: "For a popliteal sciatic block, why is it important to scan proximal to the bifurcation?", options: ["Better vessel visualisation", "Pre-bifurcation block ensures both tibial and common peroneal coverage", "Easier needle insertion", "Reduced risk of haematoma"], correctIndex: 1, explanation: "The sciatic nerve bifurcates into tibial and common peroneal nerves typically 5–8 cm above the popliteal crease. Blocking proximal to this point ensures both divisions are anaesthetised with a single injection, providing complete foot and ankle anaesthesia." },
  { question: "In a TAP block, the correct injection plane is between:", options: ["External oblique and internal oblique", "Internal oblique and transversus abdominis", "Transversus abdominis and peritoneum", "Rectus abdominis and posterior sheath"], correctIndex: 1, explanation: "The transversus abdominis plane (TAP) lies between the internal oblique and transversus abdominis muscles. The T6-L1 intercostal nerves run within this fascial plane. Two 'pops' are felt — through the external oblique and then internal oblique aponeuroses." },
  { question: "The 'shamrock sign' used in quadratus lumborum blocks consists of:", options: ["Three scalene muscles around the brachial plexus", "Transverse process (stem) with QL, psoas, and erector spinae (leaves)", "Three fascial layers of the abdominal wall", "Sartorius, vastus medialis, and adductor longus"], correctIndex: 1, explanation: "The shamrock sign is the key landmark: the lumbar transverse process forms the stem, with three 'leaves' — quadratus lumborum (posterior), psoas major (anterior), and erector spinae (posterolateral). The QL3 (transmuscular) approach between QL and psoas provides the most paravertebral-like spread." },
  { question: "Which QL block approach provides the most paravertebral-like spread?", options: ["QL1 (lateral)", "QL2 (posterior)", "QL3 (transmuscular/anterior)", "All approaches are equivalent"], correctIndex: 2, explanation: "QL3 (transmuscular) deposits LA between the QL and psoas muscles, anterior to the QL. This allows spread into the thoracic paravertebral space via the thoracolumbar fascia, providing both somatic and visceral analgesia — the most paravertebral-like coverage." },
  { question: "In a rectus sheath block, what is the main risk below the arcuate line?", options: ["Inferior epigastric artery injury", "Peritoneal puncture (absent posterior sheath)", "Nerve root damage", "Rectus muscle haematoma"], correctIndex: 1, explanation: "Below the arcuate line (below the umbilicus), the posterior rectus sheath is absent — only transversalis fascia and peritoneum remain. This makes peritoneal puncture and bowel injury a significant risk. Extra care with needle depth and real-time ultrasound guidance is essential." },
  { question: "The erector spinae plane block deposits LA:", options: ["Between external and internal oblique", "Between erector spinae and transverse process", "Within the paravertebral space directly", "Between psoas and quadratus lumborum"], correctIndex: 1, explanation: "The ESP block injects LA deep to the erector spinae muscle, superficial to the transverse process. LA then spreads cranio-caudally and penetrates anteriorly through the costotransverse ligament into the paravertebral space, though the reliability of paravertebral spread remains debated." },
];

export const obstetricAnaesthesiaQuestions: QuizQuestion[] = [
  { question: "The commonest cause of postpartum haemorrhage is:", options: ["Retained placenta", "Uterine atony", "Genital tract trauma", "Coagulopathy"], correctIndex: 1, explanation: "Uterine atony accounts for ~70% of PPH. The '4 Ts': Tone (atony), Tissue (retained), Trauma (lacerations), Thrombin (coagulopathy)." },
  { question: "MgSO₄ for eclampsia prophylaxis acts primarily by:", options: ["Reducing blood pressure", "NMDA receptor antagonism and vasodilation", "Direct myometrial relaxation", "Sedation"], correctIndex: 1, explanation: "MgSO₄ is an NMDA antagonist and vasodilator. It reduces cerebral vasospasm and neuronal excitability. Dose: 4g loading, 1g/hr maintenance. Monitor reflexes, respiratory rate, urine output." },
  { question: "Phenylephrine is preferred over ephedrine for spinal hypotension in CS because:", options: ["Faster onset", "Less fetal acidosis", "Longer duration", "No tachycardia"], correctIndex: 1, explanation: "Phenylephrine causes less fetal acidosis than ephedrine. Ephedrine crosses the placenta and causes direct fetal β-stimulation, increasing fetal metabolism and lactate." },
  { question: "Functional residual capacity in pregnancy is reduced by approximately:", options: ["5%", "10%", "20%", "40%"], correctIndex: 2, explanation: "FRC decreases by ~20% due to the gravid uterus elevating the diaphragm. Combined with 20% increased O₂ consumption, this causes rapid desaturation during apnoea." },
  { question: "PIEB (programmed intermittent epidural bolus) compared to continuous infusion provides:", options: ["Higher motor block", "More breakthrough pain", "Better spread and higher satisfaction", "Greater LA consumption"], correctIndex: 2, explanation: "PIEB delivers intermittent boluses that spread more evenly in the epidural space, providing better analgesia with less motor block and higher maternal satisfaction." },
];

export const paediatricAnaesthesiaQuestions: QuizQuestion[] = [
  { question: "The correct uncuffed ETT size formula for a child is:", options: ["Age/4 + 3", "Age/4 + 4", "Age/4 + 3.5", "Age/2 + 4"], correctIndex: 1, explanation: "Uncuffed ETT: age/4 + 4. Cuffed ETT: age/4 + 3.5. For neonates, use 3.0 (preterm) or 3.5 (term)." },
  { question: "Neonatal cardiac output is primarily determined by:", options: ["Stroke volume", "Heart rate", "Afterload", "Contractility"], correctIndex: 1, explanation: "Neonatal myocardium has fewer contractile elements, is less compliant, and operates near maximum on the Frank-Starling curve. Cardiac output is therefore rate-dependent — bradycardia is a haemodynamic emergency." },
  { question: "The metabolic derangement in pyloric stenosis is:", options: ["Hyperchloraemic metabolic acidosis", "Hypochloraemic hypokalaemic metabolic alkalosis", "Respiratory acidosis", "Lactic acidosis"], correctIndex: 1, explanation: "Loss of gastric HCl causes hypochloraemic, hypokalaemic metabolic alkalosis with paradoxical aciduria. Correct electrolytes and dehydration before surgery — it is a medical emergency." },
  { question: "Suxamethonium dose in children compared to adults is:", options: ["Lower (0.5 mg/kg)", "Same (1 mg/kg)", "Higher (2 mg/kg)", "Contraindicated"], correctIndex: 2, explanation: "Children require 2 mg/kg IV (double the adult dose) due to larger volume of distribution. IM route: 4 mg/kg for emergency use (e.g., laryngospasm without IV access)." },
  { question: "The maximum allowable blood loss calculation requires knowledge of:", options: ["Weight only", "EBV and starting/minimum Hct", "Age and weight", "Platelet count"], correctIndex: 1, explanation: "MABL = EBV × (Hct_start − Hct_min) / Hct_start. Neonatal EBV = 80 ml/kg, infant = 80 ml/kg, child = 70 ml/kg." },
];

export const neuroanaesthesiaQuestions: QuizQuestion[] = [
  { question: "The most potent regulator of cerebral blood flow is:", options: ["PaO₂", "PaCO₂", "MAP", "Temperature"], correctIndex: 1, explanation: "PaCO₂ is the most potent regulator — each 1 kPa change alters CBF by approximately 30%. Hypocapnia causes vasoconstriction, hypercapnia causes vasodilation." },
  { question: "Which anaesthetic agent should be avoided in neurosurgery?", options: ["Propofol", "Remifentanil", "Nitrous oxide", "Sevoflurane <1 MAC"], correctIndex: 2, explanation: "N₂O increases CBF, CMRO₂, and ICP. It also expands air-filled spaces (pneumocephalus) and inhibits methionine synthase. Avoid in all neurosurgery." },
  { question: "The RESCUEicp trial showed that decompressive craniectomy:", options: ["Reduces mortality and improves functional outcomes", "Reduces mortality but increases severe disability", "Has no effect on mortality", "Increases mortality"], correctIndex: 1, explanation: "RESCUEicp (2016): decompressive craniectomy reduced mortality from 48.9% to 26.9% but increased vegetative state and severe disability. Favourable outcome rates were similar." },
  { question: "The most sensitive monitor for venous air embolism is:", options: ["Capnography", "Precordial Doppler", "Pulmonary artery catheter", "TOE"], correctIndex: 1, explanation: "Precordial Doppler is the most sensitive non-invasive monitor for VAE, detecting as little as 0.25 ml/kg of air. TOE is more sensitive but invasive." },
  { question: "Cerebral autoregulation maintains constant CBF between MAP of:", options: ["40–100 mmHg", "50–120 mmHg", "60–150 mmHg", "80–180 mmHg"], correctIndex: 2, explanation: "Cerebral autoregulation operates between MAP 60-150 mmHg. Below 60: CBF falls passively (ischaemia). Above 150: breakthrough hyperperfusion (oedema, haemorrhage). Shifted rightward in chronic hypertension." },
];

export const cardiothoracicQuestions: QuizQuestion[] = [
  { question: "The target ACT for cardiopulmonary bypass is:", options: [">300 seconds", ">400 seconds", ">480 seconds", ">600 seconds"], correctIndex: 2, explanation: "ACT >480 seconds (some centres use >400s) is required before CPB cannulation. Heparin 300-400 units/kg. Reversed with protamine 1 mg per 100 units heparin." },
  { question: "The preferred double-lumen tube for one-lung ventilation is:", options: ["Right-sided", "Left-sided", "Either side equally", "Depends on surgery side"], correctIndex: 1, explanation: "Left-sided DLT is preferred because right upper lobe bronchus takeoff is variable and close to the carina, making right-sided DLT positioning unreliable." },
  { question: "Hypoxic pulmonary vasoconstriction during OLV is inhibited by:", options: ["PEEP to dependent lung", "Volatile agents >1 MAC", "100% oxygen", "Thoracic epidural"], correctIndex: 1, explanation: "Volatile agents >1 MAC inhibit HPV. Other inhibitors: vasodilators, hypothermia, very high/low PVR. Propofol-based TIVA preserves HPV better than high-dose volatiles." },
  { question: "The ATACAS trial demonstrated that tranexamic acid in cardiac surgery:", options: ["Increases thrombotic risk", "Reduces bleeding without increasing thrombosis", "Has no effect", "Increases seizure risk only"], correctIndex: 1, explanation: "ATACAS (2017): TXA reduced bleeding and transfusion requirements in CABG without increasing thrombotic events (MI, stroke, PE, DVT, renal failure) at 30 days." },
  { question: "Protamine reactions can include all EXCEPT:", options: ["Hypotension", "Bronchospasm", "Pulmonary hypertension", "Hypercoagulability"], correctIndex: 3, explanation: "Protamine can cause: Type I (histamine — hypotension), Type II (anaphylactoid — bronchospasm, hypotension), Type III (catastrophic pulmonary vasoconstriction — pulmonary hypertension, RV failure). Risk factors: fish allergy, previous protamine, vasectomy." },
];

export const painMedicineQuestions: QuizQuestion[] = [
  { question: "The first-line pharmacological treatment for neuropathic pain (NICE CG173) includes:", options: ["Tramadol", "Amitriptyline, duloxetine, pregabalin, or gabapentin", "Codeine", "Topical NSAIDs"], correctIndex: 1, explanation: "NICE CG173 recommends amitriptyline, duloxetine, gabapentin, or pregabalin as first-line monotherapy. Choice based on comorbidities and side effect profile." },
  { question: "Ketamine provides analgesia primarily through:", options: ["Opioid receptor agonism", "NMDA receptor antagonism", "COX inhibition", "Sodium channel blockade"], correctIndex: 1, explanation: "Ketamine is a non-competitive NMDA receptor antagonist. It prevents central sensitisation and wind-up, making it particularly useful in opioid-tolerant patients and chronic pain." },
  { question: "Budapest criteria for CRPS require signs in at least how many categories at examination?", options: ["1", "2", "3", "4"], correctIndex: 1, explanation: "Budapest criteria: symptoms in ≥3 of 4 categories AND signs in ≥2 of 4 categories (sensory, vasomotor, sudomotor/oedema, motor/trophic) + continuing disproportionate pain." },
  { question: "Aδ fibres transmit:", options: ["Slow, burning pain", "Fast, sharp, well-localised pain", "Proprioception", "Autonomic signals"], correctIndex: 1, explanation: "Aδ fibres are thinly myelinated, transmitting fast, sharp, well-localised pain. C fibres are unmyelinated, transmitting slow, burning, poorly localised pain." },
  { question: "The ceiling dose of paracetamol in adults is:", options: ["3 g/day", "4 g/day", "5 g/day", "6 g/day"], correctIndex: 1, explanation: "Maximum 4 g/day (1 g QDS) in adults >50 kg. Reduce to 3 g/day if <50 kg, hepatic impairment, chronic alcohol use, or malnourished." },
];

export const neurointensiveCareQuestions: QuizQuestion[] = [
  { question: "The BTF-recommended ICP threshold for TBI management is:", options: ["<15 mmHg", "<20 mmHg", "<22 mmHg", "<25 mmHg"], correctIndex: 2, explanation: "Brain Trauma Foundation 4th edition (2016) recommends treating ICP >22 mmHg. Previous threshold was 20 mmHg." },
  { question: "The Eurotherm trial showed that therapeutic hypothermia in TBI:", options: ["Improved outcomes", "Was harmful", "Had no effect", "Only helped children"], correctIndex: 1, explanation: "Eurotherm3235 (2015): therapeutic hypothermia (32-35°C) as a primary intervention for ICP control in TBI was harmful — increased mortality and worse functional outcomes." },
  { question: "SAH vasospasm peaks at:", options: ["Day 1-2", "Day 3-5", "Day 7", "Day 14"], correctIndex: 2, explanation: "Vasospasm occurs days 3-14, peaking around day 7. Nimodipine 60 mg 4-hourly for 21 days is the only proven pharmacological intervention (reduces poor outcome, not angiographic vasospasm)." },
  { question: "The apnoea test for brainstem death requires PaCO₂ to rise above:", options: ["5.0 kPa", "6.0 kPa", "6.65 kPa", "8.0 kPa"], correctIndex: 2, explanation: "PaCO₂ must rise above 6.65 kPa (50 mmHg) with no respiratory effort observed. Pre-oxygenate, then disconnect ventilator with O₂ insufflation via catheter in trachea." },
  { question: "First-line treatment for status epilepticus is:", options: ["IV phenytoin", "IV lorazepam", "IV levetiracetam", "IV thiopentone"], correctIndex: 1, explanation: "IV lorazepam 0.1 mg/kg (max 4 mg) is first-line, repeated once if needed. Buccal midazolam or rectal diazepam if no IV access." },
];

export const icuSedationDeliriumQuestions: QuizQuestion[] = [
  { question: "Propofol infusion syndrome (PRIS) risk increases above:", options: ["2 mg/kg/hr for >24h", "4 mg/kg/hr for >48h", "5 mg/kg/hr for >24h", "Any dose for >72h"], correctIndex: 1, explanation: "PRIS risk: propofol >4 mg/kg/hr (some say >5) for >48 hours. Features: metabolic acidosis, rhabdomyolysis, hyperkalaemia, lipaemia, cardiac failure, renal failure." },
  { question: "The ABCDEF bundle 'B' stands for:", options: ["Blood pressure management", "Both SATs and SBTs", "Benzodiazepine avoidance", "Baseline assessment"], correctIndex: 1, explanation: "B = Both spontaneous awakening trials (SATs) and spontaneous breathing trials (SBTs). Coordinating daily SAT+SBT reduces ventilator days and mortality." },
  { question: "The SPICE III trial comparing dexmedetomidine to usual care showed:", options: ["Reduced mortality", "No mortality difference", "Increased mortality", "Reduced delirium by 50%"], correctIndex: 1, explanation: "SPICE III (2019): early dexmedetomidine vs usual care in ventilated ICU patients — no significant difference in 90-day mortality. Shorter time to extubation in dexmedetomidine group." },
  { question: "CAM-ICU requires which two features to be present for delirium diagnosis?", options: ["Features 1 and 2", "Features 2 and 3", "Features 1 and 4", "Features 3 and 4"], correctIndex: 0, explanation: "CAM-ICU: Feature 1 (acute onset/fluctuation) AND Feature 2 (inattention) must both be present, PLUS either Feature 3 (altered consciousness) OR Feature 4 (disorganised thinking)." },
  { question: "Haloperidol for ICU delirium treatment has been shown to:", options: ["Reduce delirium duration", "Reduce mortality", "Have no proven benefit (MIND-USA, AID-ICU)", "Worsen outcomes"], correctIndex: 2, explanation: "MIND-USA (2018) and AID-ICU (2022): haloperidol did not reduce delirium duration, ventilator-free days, or mortality compared to placebo." },
];

export const acuteLiverFailureQuestions: QuizQuestion[] = [
  { question: "The commonest cause of acute liver failure in the UK is:", options: ["Viral hepatitis", "Paracetamol overdose", "Autoimmune hepatitis", "Drug reaction"], correctIndex: 1, explanation: "Paracetamol overdose is the commonest cause of ALF in the UK and has the best prognosis. Toxicity is via the metabolite NAPQI when glutathione stores are depleted." },
  { question: "In paracetamol-induced ALF, the strongest single predictor for transplant need (King's criteria) is:", options: ["INR >6.5", "Creatinine >300", "pH <7.3 after resuscitation", "Grade IV encephalopathy"], correctIndex: 2, explanation: "pH <7.3 after resuscitation is the strongest single predictor in paracetamol ALF (King's College criteria). Reflects severe metabolic derangement and poor hepatic function." },
  { question: "Why should INR NOT be routinely corrected in ALF?", options: ["It's too expensive", "It is a prognostic marker", "FFP is contraindicated", "Vitamin K always works"], correctIndex: 1, explanation: "INR is a critical prognostic marker in ALF (part of King's criteria). Correcting it removes prognostic value. Only correct if actively bleeding or pre-invasive procedure." },
  { question: "The preferred RRT modality in acute liver failure is:", options: ["IHD", "CRRT", "Peritoneal dialysis", "SLED"], correctIndex: 1, explanation: "CRRT is preferred in ALF — gradual fluid/solute removal avoids ICP spikes (which occur with the rapid osmotic shifts of IHD). Also better haemodynamic stability." },
  { question: "Wilson's disease presenting as ALF characteristically shows:", options: ["Very high ALP", "Haemolysis + disproportionately low ALP", "Markedly elevated ferritin", "Positive hepatitis serology"], correctIndex: 1, explanation: "Wilson's ALF: Coombs-negative haemolytic anaemia + disproportionately low ALP + low ALP:bilirubin ratio. Copper accumulation causes oxidative hepatocyte damage." },
];

export const antimicrobialsIcuQuestions: QuizQuestion[] = [
  { question: "β-lactam antibiotics exhibit which PK/PD killing pattern?", options: ["Concentration-dependent", "Time-dependent (fT>MIC)", "AUC/MIC dependent", "Post-antibiotic effect dependent"], correctIndex: 1, explanation: "β-lactams (penicillins, cephalosporins, carbapenems) are time-dependent — efficacy correlates with the time the free drug concentration exceeds the MIC (fT>MIC). Prolonged/continuous infusions improve this." },
  { question: "The MERINO trial showed that for ESBL E. coli bacteraemia:", options: ["Pip-taz was equivalent to meropenem", "Pip-taz was inferior to meropenem", "Pip-taz was superior", "Both were ineffective"], correctIndex: 1, explanation: "MERINO (2018): piperacillin-tazobactam was inferior to meropenem for definitive treatment of ESBL E. coli or Klebsiella bacteraemia (30-day mortality 12.3% vs 3.7%)." },
  { question: "Vancomycin dosing in ICU should be guided by:", options: ["Trough levels only", "Peak levels", "AUC/MIC ratio (target 400-600)", "Fixed dosing"], correctIndex: 2, explanation: "Current guidelines recommend AUC/MIC-guided dosing (target 400-600) rather than trough-only monitoring. This optimises efficacy while reducing nephrotoxicity." },
  { question: "Procalcitonin-guided antibiotic de-escalation in ICU:", options: ["Increases mortality", "Safely reduces antibiotic duration", "Has no effect on antibiotic use", "Is only useful in CAP"], correctIndex: 1, explanation: "Multiple RCTs show PCT-guided de-escalation safely reduces antibiotic exposure and duration in ICU without increasing mortality. PCT <0.5 or >80% decline supports stopping." },
  { question: "Aminoglycosides exhibit which killing pattern?", options: ["Time-dependent", "Concentration-dependent (Cmax/MIC)", "AUC-dependent", "All of the above"], correctIndex: 1, explanation: "Aminoglycosides are concentration-dependent — higher peak concentrations (Cmax/MIC) improve bacterial killing. Give as once-daily high doses with extended intervals." },
];

export const transfusionCoagulationQuestions: QuizQuestion[] = [
  { question: "The TRICC trial demonstrated that a restrictive transfusion trigger of Hb 70 g/L:", options: ["Increased mortality", "Was as safe as Hb 100 trigger in most ICU patients", "Only applied to surgical patients", "Required more blood products overall"], correctIndex: 1, explanation: "TRICC (1999): restrictive strategy (Hb 70 trigger) was at least as safe as liberal (Hb 100) in most critically ill patients, with a trend towards lower in-hospital mortality." },
  { question: "TRALI is differentiated from TACO by:", options: ["Timing of onset", "BNP levels and response to diuretics", "Type of blood product", "Patient age"], correctIndex: 1, explanation: "TRALI: normal/low BNP, non-cardiogenic pulmonary oedema, does NOT respond to diuretics. TACO: elevated BNP, raised JVP, responds to diuretics. Both cause bilateral infiltrates and hypoxia." },
  { question: "ROTEM FIBTEM A5 <12mm indicates need for:", options: ["FFP", "Platelets", "Cryoprecipitate/fibrinogen concentrate", "Tranexamic acid"], correctIndex: 2, explanation: "FIBTEM isolates the fibrinogen contribution to clot strength. A5 <12mm (or MCF <10mm) indicates hypofibrinogenaemia — give cryoprecipitate (2 pools) or fibrinogen concentrate." },
  { question: "The storage lesion in packed red cells includes:", options: ["Increased 2,3-DPG", "Decreased potassium", "Decreased 2,3-DPG and increased potassium", "Improved deformability"], correctIndex: 2, explanation: "Storage lesion: ↓2,3-DPG (left-shifts ODC, reduced O₂ delivery), ↑K⁺ (cell lysis), ↓pH, reduced RBC deformability, accumulation of cytokines and microparticles." },
  { question: "The PROPPR trial compared 1:1:1 to 1:1:2 ratios and found:", options: ["1:1:1 reduced mortality", "1:1:1 achieved haemostasis faster with no mortality difference", "1:1:2 was superior", "No difference in any outcome"], correctIndex: 1, explanation: "PROPPR (2015): 1:1:1 (PRBC:FFP:Plt) achieved haemostasis more frequently and faster than 1:1:2. No significant difference in 24-hour or 30-day mortality." },
];

export const organDonationQuestions: QuizQuestion[] = [
  { question: "The 5-minute observation period after circulatory arrest in DCD refers to:", options: ["Time before family can visit", "Hands-off period before death is confirmed", "Cooling time before retrieval", "Time for final blood tests"], correctIndex: 1, explanation: "After circulatory arrest in DCD, there is a mandatory 5-minute hands-off observation period to confirm irreversible cessation of circulation before death is confirmed and retrieval begins." },
  { question: "Diabetes insipidus occurs in brainstem-dead donors due to:", options: ["Renal failure", "Posterior pituitary failure", "Anterior pituitary failure", "Adrenal insufficiency"], correctIndex: 1, explanation: "Brainstem death causes posterior pituitary failure → loss of ADH secretion → diabetes insipidus (polyuria, hypernatraemia, low urine osmolality). Treat with DDAVP 1-2 µg IV." },
  { question: "Deemed consent for organ donation in England means:", options: ["Doctors decide", "Family must opt in", "Adults are presumed to have consented unless they opted out", "Consent is always required from next of kin"], correctIndex: 2, explanation: "Since 2020, England (and Scotland/Wales) operates an opt-out system. Adults are deemed to have consented unless they opted out, appointed a representative, or are in an excluded group." },
  { question: "The most common type of deceased organ donation in the UK is now:", options: ["DBD", "DCD", "Living donation", "Domino donation"], correctIndex: 1, explanation: "DCD (donation after circulatory death) now accounts for the majority of deceased organ donations in the UK. Maastricht category III (controlled — after planned treatment withdrawal) is most common." },
  { question: "Methylprednisolone is given to brainstem-dead donors because:", options: ["It treats infection", "It reduces the inflammatory response and improves organ quality", "It prevents rejection", "It is legally required"], correctIndex: 1, explanation: "Methylprednisolone 15 mg/kg reduces the inflammatory response associated with brainstem death, potentially improving organ quality. Part of the hormonal resuscitation bundle." },
];

export const icuNutritionQuestions: QuizQuestion[] = [
  { question: "NICE-SUGAR trial showed that target blood glucose in ICU should be:", options: ["4.5-6.0 mmol/L", "6-10 mmol/L", "8-12 mmol/L", "10-14 mmol/L"], correctIndex: 1, explanation: "NICE-SUGAR (2009): intensive glucose control (4.5-6) increased 90-day mortality compared to conventional (6-10). Increased hypoglycaemia was the main harm." },
  { question: "Enteral nutrition should be commenced within what timeframe in ICU?", options: ["12 hours", "24 hours", "48 hours", "72 hours"], correctIndex: 2, explanation: "ESPEN/ASPEN guidelines: start early enteral nutrition within 48 hours of ICU admission in patients who cannot maintain volitional intake. Maintains gut integrity and reduces bacterial translocation." },
  { question: "Refeeding syndrome is characterised by which electrolyte disturbance?", options: ["Hyperkalaemia", "Hypophosphataemia", "Hypernatraemia", "Hypercalcaemia"], correctIndex: 1, explanation: "Refeeding syndrome: insulin surge drives phosphate, potassium, and magnesium intracellularly. Hypophosphataemia is the hallmark — can cause cardiac arrhythmias, respiratory failure, rhabdomyolysis." },
  { question: "The EPaNIC trial showed that parenteral nutrition should be started:", options: ["Day 1", "Day 3", "Day 8 (late)", "Never"], correctIndex: 2, explanation: "EPaNIC (2011): late PN initiation (day 8) reduced infections, ICU stay, and healthcare costs compared to early PN (day 3). Do not rush to PN if EN is feasible." },
  { question: "The recommended protein target in critically ill patients is:", options: ["0.5-0.8 g/kg/day", "0.8-1.0 g/kg/day", "1.2-2.0 g/kg/day", "2.5-3.0 g/kg/day"], correctIndex: 2, explanation: "ESPEN recommends 1.2-2.0 g/kg/day protein in ICU. Protein is the most important macronutrient — inadequate protein is associated with increased mortality and muscle wasting." },
];

export const preoperativeAssessmentQuestions: QuizQuestion[] = [
  { question: "An anaerobic threshold <11 ml/kg/min on CPET indicates:", options: ["Low risk", "Moderate risk", "High perioperative risk", "Normal fitness"], correctIndex: 2, explanation: "AT <11 ml/kg/min is associated with high perioperative risk for major surgery. Combined with VO₂ peak <15 ml/kg/min, it guides decisions about surgery, optimisation, and level of postoperative care." },
  { question: "ACE inhibitors should be managed preoperatively by:", options: ["Continuing as normal", "Doubling the dose", "Omitting on day of surgery", "Stopping 1 week before"], correctIndex: 2, explanation: "ACE-I and ARBs should be omitted on the day of surgery due to risk of refractory hypotension under anaesthesia. Resume postoperatively when euvolaemic." },
  { question: "The POISE trial showed that perioperative beta-blocker initiation:", options: ["Reduced MI and mortality", "Reduced MI but increased stroke and mortality", "Had no effect", "Only helped diabetics"], correctIndex: 1, explanation: "POISE (2008): starting metoprolol perioperatively reduced MI but increased stroke, death, and hypotension. Continue existing beta-blockers but do NOT initiate them perioperatively." },
  { question: "Functional capacity of >4 METs is equivalent to:", options: ["Walking on flat ground", "Climbing 2 flights of stairs", "Running a marathon", "Sitting in a chair"], correctIndex: 1, explanation: ">4 METs (climbing 2 flights of stairs, heavy housework, walking uphill) suggests adequate cardiac reserve for most surgery. <4 METs warrants further cardiac investigation." },
  { question: "The strongest predictor of difficult intubation is:", options: ["Mallampati class IV", "Thyromental distance <6cm", "Previous difficult intubation", "BMI >40"], correctIndex: 2, explanation: "Previous difficult intubation documented in anaesthetic records is the strongest predictor. Always check previous anaesthetic charts. No single bedside test has high sensitivity/specificity alone." },
];

export const perioperativeFluidsQuestions: QuizQuestion[] = [
  { question: "The SMART trial showed that balanced crystalloids compared to 0.9% NaCl:", options: ["Increased mortality", "Reduced MAKE30 (death, new RRT, persistent renal dysfunction)", "Had no effect", "Were more expensive with no benefit"], correctIndex: 1, explanation: "SMART (2018): balanced crystalloids reduced the composite of death, new RRT, or persistent renal dysfunction (MAKE30) compared to 0.9% NaCl in critically ill adults." },
  { question: "What percentage of crystalloid remains in the intravascular space?", options: ["10%", "25%", "50%", "75%"], correctIndex: 1, explanation: "Only ~25% of isotonic crystalloid remains intravascular — the rest distributes to the interstitial space. Colloids have better initial volume expansion but controversial long-term benefits." },
  { question: "In goal-directed fluid therapy, a fluid challenge is considered positive if SV increases by:", options: ["≥5%", "≥10%", "≥15%", "≥20%"], correctIndex: 1, explanation: "A ≥10% increase in stroke volume after a 250ml fluid challenge indicates fluid responsiveness. If <10%, the patient is on the flat part of the Frank-Starling curve — stop fluids." },
  { question: "The revised Starling principle differs from the classical model by:", options: ["Ignoring oncotic pressure", "Recognising no venous reabsorption in most tissues", "Eliminating hydrostatic pressure", "Removing lymphatic drainage"], correctIndex: 1, explanation: "The revised Starling model recognises that there is no significant venous reabsorption in most tissues. Filtered fluid returns via lymphatic drainage. The glycocalyx determines filtration, not capillary wall alone." },
  { question: "The RELIEF trial showed that overly restrictive fluid therapy in major abdominal surgery:", options: ["Reduced complications", "Increased AKI", "Improved recovery", "Had no effect"], correctIndex: 1, explanation: "RELIEF (2018): restrictive fluid regimen increased AKI compared to moderately liberal approach in major abdominal surgery. Zero-balance/restrictive approach is not always best." },
];

export const enhancedRecoveryQuestions: QuizQuestion[] = [
  { question: "Preoperative carbohydrate loading in ERAS involves:", options: ["High-protein meal morning of surgery", "Maltodextrin drink 2 hours before anaesthesia", "IV dextrose infusion", "Glucose tablets 4 hours pre-op"], correctIndex: 1, explanation: "Carbohydrate loading with maltodextrin drink (800ml evening before, 400ml 2h pre-op) reduces insulin resistance, hunger, anxiety, and improves well-being without aspiration risk." },
  { question: "The Apfel score for PONV risk includes all EXCEPT:", options: ["Female sex", "Non-smoker", "History of PONV", "Age >60"], correctIndex: 3, explanation: "Apfel simplified score: (1) female, (2) non-smoker, (3) history of PONV/motion sickness, (4) postoperative opioids. Each factor adds ~20% risk: 0 factors = 10%, 4 = 80%." },
  { question: "ERAS protocols typically reduce length of stay by approximately:", options: ["10%", "20%", "30%", "50%"], correctIndex: 2, explanation: "Meta-analyses show ERAS reduces length of stay by ~30% and complications by ~40% across surgical specialties including colorectal, orthopaedic, and gynaecological surgery." },
  { question: "Prehabilitation exercise programmes are ideally started:", options: ["1 week pre-op", "2-3 weeks pre-op", "4-6 weeks pre-op", "3 months pre-op"], correctIndex: 2, explanation: "4-6 weeks of structured, supervised exercise improves cardiorespiratory fitness (AT, VO₂ peak) and reduces postoperative complications. Includes aerobic, resistance, and inspiratory muscle training." },
  { question: "Each antiemetic from a different pharmacological class reduces PONV risk by:", options: ["10%", "25%", "50%", "75%"], correctIndex: 1, explanation: "Each antiemetic from a different class reduces PONV risk by approximately 25% (relative risk reduction). Multimodal prophylaxis with 2-3 agents from different classes is recommended for high-risk patients." },
];

// === ANATOMY QUIZZES ===

export const airwayAnatomyQuestions: QuizQuestion[] = [
  { question: "Which nerve provides sensory innervation to the larynx ABOVE the vocal cords?", options: ["External branch of SLN", "Internal branch of SLN", "Recurrent laryngeal nerve", "Glossopharyngeal nerve"], correctIndex: 1, explanation: "The internal branch of the superior laryngeal nerve (SLN) pierces the thyrohyoid membrane to provide sensory innervation above the vocal cords. The external branch is motor to cricothyroid." },
  { question: "A patient develops hoarseness after thyroidectomy. Which nerve is most likely injured?", options: ["Superior laryngeal nerve", "Recurrent laryngeal nerve", "Glossopharyngeal nerve", "Hypoglossal nerve"], correctIndex: 1, explanation: "The recurrent laryngeal nerve (RLN) provides motor supply to all intrinsic laryngeal muscles except cricothyroid. Unilateral RLN palsy causes cord to lie in paramedian position → hoarseness." },
  { question: "The right main bronchus differs from the left in that it is:", options: ["Longer and more horizontal", "Shorter, wider, and more vertical", "Narrower and longer", "Of equal calibre but more anterior"], correctIndex: 1, explanation: "The right main bronchus is shorter (2.5 cm vs 5 cm), wider, and more vertical (25° vs 45°). Foreign bodies and endobronchial tubes preferentially enter the right side." },
  { question: "Which structure lies immediately anterior to the cricothyroid membrane?", options: ["Thyroid isthmus", "Sternohyoid muscles", "Nothing — it is subcutaneous in the midline", "Internal jugular vein"], correctIndex: 2, explanation: "The cricothyroid membrane is relatively superficial and avascular in the midline. Only skin, subcutaneous tissue, and superficial fascia lie anterior to it, making it ideal for emergency surgical airway." },
  { question: "The left recurrent laryngeal nerve loops under which structure?", options: ["Left subclavian artery", "Aortic arch", "Left common carotid", "Pulmonary trunk"], correctIndex: 1, explanation: "The left RLN loops under the aortic arch (around the ligamentum arteriosum) and ascends in the tracheo-oesophageal groove. The right RLN loops under the right subclavian artery." },
];

export const cardiacAnatomyQuestions: QuizQuestion[] = [
  { question: "The SA node is supplied by a branch of which artery in the majority of people?", options: ["LAD", "Left circumflex", "Right coronary artery", "Left main stem"], correctIndex: 2, explanation: "The SA nodal artery arises from the RCA in ~60% and from the LCx in ~40% of people. The SA node is located at the junction of the SVC and right atrium." },
  { question: "Coronary dominance is defined by which artery gives the:", options: ["First diagonal branch", "Obtuse marginal branches", "Posterior descending artery (PDA)", "Acute marginal branches"], correctIndex: 2, explanation: "Dominance is defined by which artery supplies the PDA. Right dominant (RCA → PDA) occurs in ~85%. Left dominant (LCx → PDA) in ~15%. The PDA supplies the inferior septum and inferior LV." },
  { question: "The triangle of Koch contains which structure?", options: ["SA node", "AV node", "Bundle of His", "Left bundle branch"], correctIndex: 1, explanation: "The AV node lies within the triangle of Koch, bounded by the tendon of Todaro, the coronary sinus ostium, and the tricuspid valve annulus. It is supplied by the AV nodal artery (from RCA in 80%)." },
  { question: "The transverse sinus of the pericardium lies between:", options: ["RA and LA", "Aorta/PA anteriorly and SVC/pulmonary veins posteriorly", "RV and LV", "Pericardium and diaphragm"], correctIndex: 1, explanation: "The transverse sinus is a passage between the arterial (aorta, PA) and venous (SVC, pulmonary veins) pedicles. A finger or clamp can be passed through it to cross-clamp the aorta during cardiac surgery." },
  { question: "Which coronary artery supplies the anterior interventricular septum?", options: ["RCA", "Left circumflex", "LAD (septal perforators)", "Posterior descending artery"], correctIndex: 2, explanation: "The LAD gives septal perforating branches that supply the anterior two-thirds of the interventricular septum. The PDA supplies the posterior third." },
];

export const spinalAnatomyQuestions: QuizQuestion[] = [
  { question: "At what vertebral level does the spinal cord typically terminate in adults?", options: ["T12", "L1/2", "L3/4", "S1"], correctIndex: 1, explanation: "The conus medullaris ends at L1/2 in adults (higher in neonates — L3). Below this level, only the cauda equina (nerve roots) is present, making L3/4 and below safe for spinal anaesthesia." },
  { question: "The artery of Adamkiewicz is the major radicular artery typically arising from:", options: ["Cervical region (C5-C7)", "Upper thoracic (T1-T4)", "Lower thoracic/upper lumbar (T9-T12)", "Sacral region"], correctIndex: 2, explanation: "The artery of Adamkiewicz is a major radiculomedullary artery supplying the anterior spinal artery. It typically arises from the left side between T9-T12. Damage causes anterior spinal artery syndrome (motor loss, pain/temperature loss, preserved proprioception)." },
  { question: "Which structure provides the characteristic 'loss of resistance' when performing an epidural?", options: ["Supraspinous ligament", "Interspinous ligament", "Ligamentum flavum", "Dura mater"], correctIndex: 2, explanation: "The ligamentum flavum is a dense elastic structure connecting adjacent laminae. It provides the characteristic resistance and subsequent 'give' that signals entry into the epidural space." },
  { question: "Batson's plexus becomes engorged in pregnancy because:", options: ["Progesterone causes venodilation", "Aortocaval compression diverts blood through valveless vertebral veins", "Increased cardiac output", "Oestrogen increases venous compliance"], correctIndex: 1, explanation: "The gravid uterus compresses the IVC, diverting blood through the valveless internal vertebral venous plexus (Batson's plexus). This reduces epidural space volume, explaining why pregnant patients need lower doses of local anaesthetic." },
  { question: "Tuffier's line (intercristal line) identifies which vertebral landmark?", options: ["L2 spinous process", "L3/4 interspace", "L4 spinous process or L3/4 interspace", "L5/S1 interspace"], correctIndex: 2, explanation: "Tuffier's line connects the iliac crests and typically crosses the L4 spinous process or L3/4 interspace. It is used as a surface landmark for lumbar neuraxial techniques, though imaging studies show it can be inaccurate." },
];

export const brachialPlexusQuestions: QuizQuestion[] = [
  { question: "The brachial plexus is formed by the ventral rami of:", options: ["C3-C7", "C4-T1", "C5-T1", "C5-T2"], correctIndex: 2, explanation: "The brachial plexus is formed by the ventral rami of C5-T1. It may receive contributions from C4 (prefixed) or T2 (postfixed)." },
  { question: "Which block approach has a 100% incidence of ipsilateral phrenic nerve palsy?", options: ["Axillary", "Infraclavicular", "Supraclavicular", "Interscalene"], correctIndex: 3, explanation: "The interscalene approach blocks at the root/trunk level where the phrenic nerve (C3,4,5) runs on the anterior surface of anterior scalene. Virtually all patients develop ipsilateral hemidiaphragm paralysis — avoid bilaterally and with caution in respiratory disease." },
  { question: "The musculocutaneous nerve arises from which cord?", options: ["Lateral cord", "Medial cord", "Posterior cord", "Superior trunk"], correctIndex: 0, explanation: "The musculocutaneous nerve (C5,6,7) arises from the lateral cord, pierces coracobrachialis, and becomes the lateral cutaneous nerve of the forearm. It must be blocked separately in axillary approaches as it leaves early." },
  { question: "At the supraclavicular level, the plexus elements are described on ultrasound as:", options: ["'Traffic lights' — three round structures", "'Grapes on a stalk' — clustered above the subclavian artery", "'String of pearls' — linear arrangement", "'Honeycomb' — within the scalene muscles"], correctIndex: 1, explanation: "At the supraclavicular level, the trunks and divisions appear as a cluster of hypoechoic nodules ('grapes on a stalk') above and lateral to the subclavian artery, making this a compact target for complete arm blockade." },
  { question: "The posterior cord gives rise to which two major terminal nerves?", options: ["Median and ulnar", "Musculocutaneous and median", "Axillary and radial", "Ulnar and radial"], correctIndex: 2, explanation: "The posterior cord (C5-T1) gives rise to the axillary nerve (C5,6 — deltoid, regimental badge area) and the radial nerve (C5-T1 — extensors of arm and forearm)." },
];

export const thoracicAnatomyQuestions: QuizQuestion[] = [
  { question: "The intercostal neurovascular bundle runs:", options: ["Above the rib, between external and internal intercostals", "Below the rib, between internal and innermost intercostals", "In the middle of the intercostal space", "Above the rib, superficial to external intercostal"], correctIndex: 1, explanation: "The VAN (vein, artery, nerve from top to bottom) runs in the costal groove at the inferior border of the rib, between the internal and innermost intercostal muscles. Chest drains should be inserted above the rib below to avoid injury." },
  { question: "The phrenic nerve is derived from:", options: ["C2,3,4", "C3,4,5", "C4,5,6", "C5,6,7"], correctIndex: 1, explanation: "The phrenic nerve (C3,4,5 — 'C3,4,5 keeps the diaphragm alive') is the sole motor supply to the diaphragm. It also provides sensory innervation to central diaphragm and pericardium (referred shoulder tip pain)." },
  { question: "The right upper lobe bronchus is 'eparterial' because it:", options: ["Arises above the right pulmonary artery", "Has no arterial supply", "Is supplied by bronchial arteries only", "Arises below the carina"], correctIndex: 0, explanation: "The right upper lobe bronchus arises above the right pulmonary artery (eparterial). This is why a right-sided DLT is difficult to position correctly — the bronchial cuff can obstruct the RUL orifice. Left DLTs are preferred." },
  { question: "The thoracic duct drains into the venous system at the junction of:", options: ["Right subclavian and right IJV", "Left subclavian and left IJV", "SVC and right atrium", "Azygos vein and SVC"], correctIndex: 1, explanation: "The thoracic duct drains into the venous system at the junction of the left subclavian vein and left IJV. This is why left-sided central venous catheterisation carries a risk of thoracic duct injury (chylothorax)." },
  { question: "The aortic hiatus in the diaphragm is at vertebral level:", options: ["T8", "T10", "T12", "L1"], correctIndex: 2, explanation: "The three main diaphragmatic openings: T8 (IVC, right phrenic nerve), T10 (oesophagus, vagal trunks), T12 (aorta, thoracic duct, azygos vein). Mnemonic: 'I 8 Ten Eggs At 12' (IVC-8, T(o)en-oesophagus-10, Aorta-12)." },
];

export const abdominalAnatomyQuestions: QuizQuestion[] = [
  { question: "The TAP block targets the plane between:", options: ["External oblique and internal oblique", "Internal oblique and transversus abdominis", "Transversus abdominis and transversalis fascia", "Rectus abdominis and posterior rectus sheath"], correctIndex: 1, explanation: "The transversus abdominis plane (TAP) lies between the internal oblique and transversus abdominis muscles. The intercostal nerves (T6-L1) run in this plane, providing somatic analgesia to the anterior abdominal wall." },
  { question: "The ilioinguinal nerve arises from which spinal root?", options: ["T12", "L1", "L2", "L3"], correctIndex: 1, explanation: "The ilioinguinal nerve (L1) runs between the internal oblique and transversus abdominis, then pierces the internal oblique to enter the inguinal canal. It provides sensation to the inguinal region and medial thigh. Block is used for hernia repair analgesia." },
  { question: "The liver receives what percentage of cardiac output?", options: ["10%", "25%", "40%", "50%"], correctIndex: 1, explanation: "The liver receives approximately 25% of cardiac output — 75% via the portal vein (nutrient-rich, partially deoxygenated) and 25% via the hepatic artery (oxygenated). Volatile anaesthetic agents and positive pressure ventilation can reduce hepatic blood flow." },
  { question: "Parasympathetic supply to the pelvic organs comes from:", options: ["Vagus nerve", "Greater splanchnic nerves", "Pelvic splanchnic nerves (S2-S4)", "Lumbar splanchnic nerves"], correctIndex: 2, explanation: "The pelvic splanchnic nerves ('nervi erigentes') arise from S2-S4 and provide parasympathetic supply to the pelvic viscera, including bladder detrusor and erectile tissue. Damage during pelvic surgery causes bladder and sexual dysfunction." },
  { question: "The sciatic nerve exits the pelvis through which foramen?", options: ["Lesser sciatic foramen", "Obturator foramen", "Greater sciatic foramen below piriformis", "Sacral hiatus"], correctIndex: 2, explanation: "The sciatic nerve (L4-S3) — the largest nerve in the body — exits the pelvis through the greater sciatic foramen below the piriformis muscle. It can be blocked at the gluteal, subgluteal, or popliteal level." },
];

export const headNeckAnatomyQuestions: QuizQuestion[] = [
  { question: "Which cranial nerve provides the afferent limb of the gag reflex?", options: ["Trigeminal (V)", "Facial (VII)", "Glossopharyngeal (IX)", "Vagus (X)"], correctIndex: 2, explanation: "The glossopharyngeal nerve (IX) provides sensory innervation to the oropharynx and posterior third of the tongue — the afferent limb of the gag reflex. The efferent limb is the vagus (X) via the pharyngeal plexus." },
  { question: "The right internal jugular vein is preferred for central venous access because:", options: ["It is larger than the left", "It provides a straighter path to the SVC and avoids the thoracic duct", "The carotid artery is further away on the right", "The right pleural dome is lower"], correctIndex: 1, explanation: "The right IJV provides a more direct, straighter route to the SVC. The left side carries additional risks: the thoracic duct drains at the left subclavian-IJV junction, and the left brachiocephalic vein crosses the midline at an angle." },
  { question: "Which nerve is most vulnerable in the posterior triangle of the neck?", options: ["Vagus", "Phrenic", "Accessory (XI)", "Glossopharyngeal"], correctIndex: 2, explanation: "The spinal accessory nerve (XI) runs superficially across the posterior triangle of the neck from SCM to trapezius. It is vulnerable to injury during lymph node biopsy or other posterior triangle procedures, causing shoulder drop and weakness of shoulder abduction." },
  { question: "Deep cervical plexus block risks which complication?", options: ["Thoracic duct injury", "Brachial plexus block", "Phrenic nerve paralysis", "Facial nerve palsy"], correctIndex: 2, explanation: "The phrenic nerve (C3,4,5) arises from the cervical plexus. Deep cervical plexus block carries a significant risk of ipsilateral phrenic nerve paralysis. Bilateral deep blocks are contraindicated. Superficial blocks are safer but may be less effective." },
  { question: "During awake fibreoptic intubation, which nerve block anaesthetises the base of tongue and vallecula?", options: ["Superior laryngeal nerve block", "Glossopharyngeal nerve block", "Infraorbital nerve block", "Mental nerve block"], correctIndex: 1, explanation: "The glossopharyngeal nerve provides sensory innervation to the posterior third of the tongue, tonsillar fossa, and oropharynx. Blocking it (usually with local anaesthetic applied to the palatoglossal fold) helps suppress the gag reflex during awake intubation." },
];

export const neuroanatomyQuestions: QuizQuestion[] = [
  { question: "The most common site for intracranial aneurysm is:", options: ["MCA bifurcation", "Basilar tip", "Anterior communicating artery", "Posterior communicating artery"], correctIndex: 2, explanation: "The anterior communicating artery is the most common site for intracranial aneurysms (~30%). The AComA connects the two anterior cerebral arteries. Rupture causes subarachnoid haemorrhage, often with blood in the interhemispheric fissure." },
  { question: "The Monro-Kellie doctrine states that:", options: ["CSF production equals absorption", "The skull is a fixed-volume container — an increase in one component requires a decrease in another", "Cerebral blood flow is proportional to cerebral metabolic rate", "ICP is measured in the lateral ventricle"], correctIndex: 1, explanation: "The Monro-Kellie doctrine states that the cranial compartment is a fixed volume containing brain (~80%), blood (~10%), and CSF (~10%). Any increase in one component must be compensated by a decrease in another, or ICP will rise." },
  { question: "Which artery territory is most commonly affected in ischaemic stroke?", options: ["Anterior cerebral artery", "Middle cerebral artery", "Posterior cerebral artery", "Basilar artery"], correctIndex: 1, explanation: "The MCA is most commonly affected in ischaemic stroke. It supplies the lateral surface of the hemisphere including the primary motor and sensory cortices. Occlusion causes contralateral hemiplegia, hemisensory loss, and (if dominant hemisphere) aphasia." },
  { question: "CSF is produced at a rate of approximately:", options: ["100 ml/day", "250 ml/day", "500 ml/day", "1000 ml/day"], correctIndex: 2, explanation: "CSF is produced by the choroid plexus at approximately 500 ml/day (0.35 ml/min). Total CSF volume is ~150 ml, meaning it is turned over approximately 3-4 times per day. It is absorbed by arachnoid granulations into the superior sagittal sinus." },
  { question: "Extradural haematoma is classically caused by rupture of:", options: ["Bridging veins", "Anterior cerebral artery", "Middle meningeal artery", "Posterior communicating artery"], correctIndex: 2, explanation: "The middle meningeal artery enters the skull through the foramen spinosum and runs in a groove on the inner table of the temporal bone. Temporal bone fracture can rupture this artery, causing a rapidly expanding extradural (epidural) haematoma — a neurosurgical emergency." },
];

export const temperatureMeasurementQuiz: QuizQuestion[] = [
  { question: "A thermocouple generates an EMF by which physical principle?", options: ["Peltier effect", "Seebeck effect", "Piezoelectric effect", "Hall effect"], correctIndex: 1, explanation: "The Seebeck effect describes the generation of an EMF at the junction of two dissimilar metals proportional to the temperature difference. The Peltier effect is the reverse — passing current through a junction causes heating or cooling." },
  { question: "A Type T thermocouple uses which pair of metals?", options: ["Chromel and alumel", "Copper and constantan", "Platinum and rhodium", "Iron and constantan"], correctIndex: 1, explanation: "Type T (copper-constantan) is the most common thermocouple in clinical use, producing approximately 40 μV per °C. Type K (chromel-alumel) is used industrially. Type J uses iron-constantan." },
  { question: "Which temperature measurement device does NOT require an external power source?", options: ["Thermistor", "Platinum resistance thermometer", "Thermocouple", "Infrared tympanic thermometer"], correctIndex: 2, explanation: "The thermocouple is self-generating — the Seebeck effect produces an EMF without any external battery or power supply. Thermistors and RTDs require current from an external source (Wheatstone bridge). IR thermometers need a battery." },
  { question: "A thermistor has which type of temperature coefficient?", options: ["Positive temperature coefficient — resistance increases with temperature", "Negative temperature coefficient — resistance decreases with temperature", "Zero temperature coefficient — resistance is constant", "Variable — depends on the semiconductor used"], correctIndex: 1, explanation: "Clinical thermistors are NTC (negative temperature coefficient) semiconductors — resistance falls exponentially as temperature rises. This gives very high sensitivity but non-linear response. Metals (platinum RTD) have PTC." },
  { question: "Which circuit is used to measure the resistance change in both thermistors and platinum resistance thermometers?", options: ["Potential divider", "Wheatstone bridge", "Wien bridge oscillator", "Colpitts oscillator"], correctIndex: 1, explanation: "The Wheatstone bridge is used to accurately measure small resistance changes. The thermistor or RTD forms one arm of the bridge. When temperature changes alter its resistance, the bridge becomes unbalanced and the resulting voltage is proportional to the temperature change." },
  { question: "The platinum resistance thermometer (Pt100) has a resistance of 100Ω at which temperature?", options: ["25°C (room temperature)", "37°C (body temperature)", "0°C", "100°C"], correctIndex: 2, explanation: "The Pt100 designation means 100Ω at 0°C. At 100°C, the resistance rises to approximately 138.5Ω (using α = 0.00385 Ω/Ω/°C). This linear relationship Rₜ = R₀(1 + αΔT) is its principal advantage." },
  { question: "Infrared tympanic thermometry is based on which physical law?", options: ["Beer-Lambert law", "Wien's displacement law only", "Stefan-Boltzmann law", "Planck's radiation law only"], correctIndex: 2, explanation: "The Stefan-Boltzmann law states P = εσAT⁴ — radiated power is proportional to the fourth power of absolute temperature. The thermopile sensor in the IR thermometer detects this radiation. Wien's law describes peak wavelength, not total power." },
  { question: "Why is the tympanic membrane a good site for core temperature measurement?", options: ["It is the warmest part of the body", "It shares blood supply (internal carotid) with the hypothalamus", "It is easily accessible and has no sources of error", "It has the highest thermal conductivity of any tissue"], correctIndex: 1, explanation: "The tympanic membrane receives blood supply from branches of the internal carotid artery — the same vessel supplying the hypothalamus (the thermoregulatory centre). This makes TM temperature an excellent surrogate for core temperature." },
  { question: "Which is the MOST accurate but SLOWEST responding electronic temperature measurement device?", options: ["Thermocouple", "Thermistor", "Platinum resistance thermometer (RTD)", "Infrared tympanic thermometer"], correctIndex: 2, explanation: "The platinum RTD is the most accurate and stable electronic thermometer (laboratory standard) but has the slowest response time due to the thermal mass of the platinum element. Thermocouples have the fastest response (milliseconds)." },
  { question: "Which of the following causes a falsely LOW reading on an infrared tympanic thermometer?", options: ["Otitis media", "Cerumen (ear wax) in the ear canal", "Fever above 39°C", "Using the device immediately after calibration"], correctIndex: 1, explanation: "Cerumen absorbs infrared radiation before it reaches the thermopile sensor, causing falsely low readings. Otitis media may cause falsely high readings due to local inflammation. Proper probe positioning and a clean ear canal are essential for accuracy." },
];

export const humidityGasSamplingQuiz: QuizQuestion[] = [
  { question: "What is the absolute humidity of fully saturated gas at the carina (37°C)?", options: ["20 mg/L", "30 mg/L", "44 mg/L", "60 mg/L"], correctIndex: 2, explanation: "At 37°C, the SVP of water is 6.3 kPa. Fully saturated gas at this temperature contains 44 mg/L of water vapour (100% relative humidity). This is the target for humidification of intubated patients." },
  { question: "An HME filter typically delivers which level of absolute humidity?", options: ["10–15 mg/L", "25–30 mg/L", "44 mg/L", "55 mg/L"], correctIndex: 1, explanation: "Heat and moisture exchange (HME) filters passively trap heat and moisture from exhaled gas, typically returning 25–30 mg/L on inspiration. This is less than the physiological 44 mg/L but adequate for most short-duration anaesthetics. They add 30–90 mL of mechanical dead space." },
  { question: "The Fleisch pneumotachograph ensures laminar flow using:", options: ["A fine wire mesh screen", "A Venturi constriction", "Parallel capillary tubes", "A spinning vane turbine"], correctIndex: 2, explanation: "The Fleisch pneumotachograph uses a bundle of parallel capillary tubes to ensure flow remains laminar. The pressure drop across these tubes is then proportional to flow (Hagen-Poiseuille). The Lilly type uses a fine wire mesh screen instead." },
  { question: "Why must a pneumotachograph be heated to body temperature?", options: ["To expand the capillary tubes for higher flows", "To prevent condensation on the resistance element", "To linearise the pressure-flow relationship", "To match ATPS to BTPS conditions"], correctIndex: 1, explanation: "Condensation of water vapour from warm expired gas onto the cooler resistance element (capillaries or mesh) increases resistance and causes falsely high flow readings. Heating to 37°C prevents this condensation and maintains measurement accuracy." },
  { question: "The mass spectrometer separates gas ions primarily by:", options: ["Molecular weight only", "Charge only", "Mass-to-charge ratio (m/z)", "Boiling point"], correctIndex: 2, explanation: "In a magnetic sector mass spectrometer, ions are deflected according to r = mv/qB. The radius of curvature depends on the mass-to-charge ratio (m/z). Heavier ions travel in wider arcs and strike detectors at different positions." },
  { question: "N₂O and CO₂ pose a problem for mass spectrometry because:", options: ["They have identical fragmentation patterns", "They both have m/z = 44", "Neither can be ionised by electron bombardment", "They form stable dimers in the vacuum chamber"], correctIndex: 1, explanation: "Both N₂O (molecular weight 44) and CO₂ (molecular weight 44) produce parent ions at m/z = 44. The mass spectrometer distinguishes them by analysing their different fragmentation (daughter) ion patterns — e.g., CO₂ produces m/z = 12 (C⁺) while N₂O produces m/z = 30 (NO⁺)." },
  { question: "Which gas analysis technique can detect nitrogen (N₂)?", options: ["Infrared absorption spectroscopy", "Paramagnetic oxygen analyser", "Raman scattering", "Fuel cell analyser"], correctIndex: 2, explanation: "Infrared absorption requires a changing dipole moment during molecular vibration — homonuclear diatomic molecules like N₂ and O₂ do not have this, so they are invisible to IR. Raman scattering detects changes in molecular polarisability and can identify N₂, O₂, and all other respiratory gases." },
  { question: "In Raman scattering, the Stokes shift refers to scattered light with:", options: ["Higher frequency than incident light", "Same frequency as incident light (elastic)", "Lower frequency than incident light", "No frequency change but different amplitude"], correctIndex: 2, explanation: "In Stokes Raman scattering, the scattered photon transfers energy to the molecule (exciting vibrational modes), resulting in a lower frequency (longer wavelength) than the incident light. The frequency shift (Δν) is characteristic of each molecular bond." },
  { question: "What proportion of photons undergo Raman scattering?", options: ["~1 in 10 (10%)", "~1 in 1,000 (0.1%)", "~1 in 10⁷ (0.00001%)", "~1 in 10² (1%)"], correctIndex: 2, explanation: "Raman scattering is extremely weak — approximately 1 in 10⁷ (10 million) photons scatter inelastically. This is why Raman analysers require powerful lasers (argon ion) and very sensitive photodetectors, making the equipment expensive." },
  { question: "Which is the ONLY gas analyser capable of identifying all respiratory and anaesthetic gases simultaneously?", options: ["Infrared analyser", "Paramagnetic analyser", "Mass spectrometer", "Galvanic fuel cell"], correctIndex: 2, explanation: "The mass spectrometer is the only analyser that can identify and quantify all gases simultaneously — O₂, CO₂, N₂, N₂O, and all volatile agents. IR analysers cannot detect O₂ or N₂. Paramagnetic analysers only measure O₂. Raman can also detect all gases but is not widely available clinically." },
];

export const laserFibreopticsQuiz: QuizQuestion[] = [
  { question: "LASER light differs from ordinary light because it is:", options: ["Polychromatic, incoherent, and divergent", "Monochromatic, coherent, and collimated", "Monochromatic, incoherent, and collimated", "Polychromatic, coherent, and convergent"], correctIndex: 1, explanation: "Laser light has three defining properties: monochromatic (single wavelength), coherent (all waves in phase), and collimated (parallel beam with minimal divergence). These properties arise from stimulated emission within an optical cavity." },
  { question: "Population inversion in a laser means:", options: ["More atoms are in the ground state than the excited state", "Equal numbers of atoms in ground and excited states", "More atoms are in the metastable excited state than the ground state", "All atoms are in the highest possible energy level"], correctIndex: 2, explanation: "Population inversion — having more atoms in the excited (metastable) state than the ground state — is essential for laser action. Without it, absorption dominates over stimulated emission and no amplification occurs. It is achieved by external pumping (optical, electrical, or chemical)." },
  { question: "Which laser wavelength is most commonly used in airway surgery?", options: ["Nd:YAG (1,064 nm)", "KTP (532 nm)", "CO₂ (10,600 nm)", "Argon (488 nm)"], correctIndex: 2, explanation: "The CO₂ laser (10,600 nm, far infrared) is most commonly used for airway surgery. Its wavelength is strongly absorbed by water in tissue, allowing precise cutting and vaporisation with minimal deep tissue penetration. However, it cannot be transmitted through standard fibreoptics." },
  { question: "During airway laser surgery, the FiO₂ should be reduced to:", options: ["≤21% (room air only)", "≤30%", "≤50%", "100% is safe with laser-safe tubes"], correctIndex: 1, explanation: "FiO₂ should be reduced to ≤30% during airway laser surgery to minimise fire risk. N₂O must be avoided as it supports combustion. The balance gas should be air or helium (helium also improves laminar flow through narrowed airways). Even with laser-safe tubes, high FiO₂ is dangerous." },
  { question: "Total internal reflection occurs when light travels:", options: ["From low to high refractive index at any angle", "From high to low refractive index at an angle greater than the critical angle", "From high to low refractive index at an angle less than the critical angle", "Between two media of equal refractive index"], correctIndex: 1, explanation: "TIR occurs when light travels from a higher refractive index medium (core, n₁) to a lower refractive index medium (cladding, n₂) at an angle of incidence greater than the critical angle θc, where sin θc = n₂/n₁. Below this angle, some light is refracted out." },
  { question: "The critical angle for total internal reflection is given by:", options: ["sin θc = n₁/n₂", "sin θc = n₂/n₁", "cos θc = n₂/n₁", "tan θc = n₁ × n₂"], correctIndex: 1, explanation: "From Snell's law at the critical angle: n₁ sin θc = n₂ sin 90° → sin θc = n₂/n₁. Since n₁ > n₂ (core has higher RI than cladding), this gives a real angle less than 90°. Light striking at angles greater than θc is totally reflected." },
  { question: "A coherent fibre bundle in a bronchoscope is used for:", options: ["Illumination of the airway", "Image transmission", "Suction of secretions", "Oxygen insufflation"], correctIndex: 1, explanation: "Coherent fibre bundles maintain the spatial arrangement of individual fibres from one end to the other, preserving pixel-by-pixel image information. Incoherent bundles (random arrangement) are used for light transmission/illumination only, as spatial information is lost." },
  { question: "The numerical aperture (NA) of an optical fibre determines:", options: ["The maximum length of the fibre", "The wavelength of light transmitted", "The cone angle of light the fibre can accept", "The minimum bend radius"], correctIndex: 2, explanation: "NA = √(n₁² − n₂²) defines the half-angle of the cone of light that can enter the fibre and undergo total internal reflection. A larger NA accepts light from a wider angle (collects more light) but provides lower image resolution." },
  { question: "The ETT cuff should be filled with saline during laser surgery because:", options: ["Saline conducts heat away from the laser beam", "Saline is non-flammable and acts as a heat sink if the cuff is perforated by the laser", "Saline increases cuff pressure for a better seal", "Saline prevents N₂O diffusion into the cuff"], correctIndex: 1, explanation: "Filling the cuff with saline (± methylene blue dye) serves two purposes: (1) saline is non-flammable and acts as a heat sink, absorbing laser energy; (2) if the cuff is perforated, saline extinguishes any fire and methylene blue staining alerts the surgeon to cuff breach." },
  { question: "Which type of laser can be transmitted through a fibreoptic cable?", options: ["CO₂ laser", "Nd:YAG laser", "Excimer laser", "All lasers can be transmitted through fibreoptics"], correctIndex: 1, explanation: "Nd:YAG (1,064 nm) can be transmitted through flexible quartz fibreoptics, making it suitable for endoscopic use. CO₂ laser (10,600 nm far infrared) is absorbed by glass/quartz and requires articulated mirror arms or special hollow waveguides for delivery." },
];

export const ultrasoundPhysicsQuiz: QuizQuestion[] = [
  { question: "The piezoelectric effect in an ultrasound transducer describes:", options: ["Conversion of light to sound energy", "Conversion of electrical to mechanical energy and vice versa", "Conversion of heat to electrical energy", "Conversion of magnetic to sound energy"], correctIndex: 1, explanation: "Piezoelectric crystals (PZT) exhibit both the reverse effect (electrical → mechanical/ultrasound for transmission) and the direct effect (mechanical/echoes → electrical for reception). This dual property makes a single crystal function as both transmitter and receiver." },
  { question: "The assumed speed of sound in soft tissue for ultrasound calculations is:", options: ["330 m/s", "1,000 m/s", "1,540 m/s", "3,000 m/s"], correctIndex: 2, explanation: "Ultrasound machines assume a speed of 1,540 m/s in soft tissue for all depth calculations (distance = speed × time / 2). If the actual speed differs significantly (e.g., in fat ~1,450 m/s), calculated distances will be inaccurate." },
  { question: "Increasing ultrasound frequency will:", options: ["Improve resolution and increase penetration", "Improve resolution but decrease penetration", "Decrease resolution but increase penetration", "Have no effect on resolution or penetration"], correctIndex: 1, explanation: "Higher frequency produces shorter wavelengths → better axial resolution (SPL/2 decreases). However, higher frequency waves are attenuated more rapidly (~0.5 dB/cm/MHz in soft tissue), reducing penetration depth. This is the fundamental resolution-penetration trade-off." },
  { question: "Axial resolution in ultrasound is determined by:", options: ["Beam width at the focal zone", "Spatial pulse length divided by 2", "Transducer element height", "Pulse repetition frequency"], correctIndex: 1, explanation: "Axial resolution = SPL/2 = (number of cycles × wavelength)/2. It is the minimum distance between two structures along the beam axis that can be resolved as separate. Improved by higher frequency (shorter λ) and better damping (fewer cycles per pulse)." },
  { question: "For a regional anaesthesia nerve block, the most appropriate probe is:", options: ["Curvilinear 2-5 MHz", "Phased array 1-3 MHz", "Linear 6-15 MHz", "Endocavity 5-9 MHz"], correctIndex: 2, explanation: "A high-frequency linear probe (6-15 MHz) provides the best resolution for superficial structures like peripheral nerves, which typically lie within 1-4 cm of the skin surface. The linear footprint also provides a rectangular field of view ideal for in-plane needle visualisation." },
  { question: "In the Doppler equation Δf = 2f₀v cos θ / c, what happens at θ = 90°?", options: ["Maximum Doppler shift", "Doppler shift equals transmitted frequency", "No Doppler shift detected (Δf = 0)", "Aliasing always occurs"], correctIndex: 2, explanation: "At θ = 90°, cos 90° = 0, so Δf = 0 — no Doppler frequency shift is detected. This is why the ultrasound beam must be angled relative to blood flow direction. An angle <60° is recommended for accurate velocity measurements." },
  { question: "Aliasing in pulsed wave Doppler occurs when the Doppler shift exceeds:", options: ["The transmitted frequency", "The speed of sound", "The Nyquist limit (PRF/2)", "The transducer bandwidth"], correctIndex: 2, explanation: "Aliasing occurs when the Doppler frequency shift exceeds the Nyquist limit, which equals half the pulse repetition frequency (PRF/2). The signal wraps around and appears as flow in the opposite direction. Solutions: increase PRF, decrease depth, lower frequency, shift baseline, or switch to CW Doppler." },
  { question: "A-lines on lung ultrasound indicate:", options: ["Pleural effusion", "Interstitial oedema", "Normal aerated lung", "Pneumothorax"], correctIndex: 2, explanation: "A-lines are horizontal, equidistant reverberation artefacts generated by ultrasound bouncing between the transducer and the air-filled pleural interface. They indicate normal aerated lung. However, A-lines plus absent lung sliding raises suspicion of pneumothorax." },
  { question: "B-lines on lung ultrasound indicate:", options: ["Normal aerated lung", "Interstitial oedema or fluid", "Consolidation with air bronchograms", "Subcutaneous emphysema"], correctIndex: 1, explanation: "B-lines are vertical hyperechoic artefacts arising from the pleural line, extending to the screen edge without fading, and moving with lung sliding. They arise from fluid-thickened interlobular septa. ≥3 B-lines per rib space is pathological, indicating pulmonary oedema, ARDS, or interstitial disease." },
  { question: "The matching layer on an ultrasound transducer has a thickness of:", options: ["λ (one wavelength)", "λ/4 (quarter wavelength)", "λ/2 (half wavelength)", "2λ (two wavelengths)"], correctIndex: 1, explanation: "The matching layer is λ/4 thick with an acoustic impedance intermediate between the crystal and tissue. This quarter-wavelength design minimises reflection at the transducer-tissue interface (analogous to anti-reflection coatings on optical lenses), maximising energy transfer into tissue." },
];

export const mriPhysicsQuiz: QuizQuestion[] = [
  { question: "The Larmor frequency of hydrogen protons at 1.5 Tesla is approximately:", options: ["21 MHz", "42 MHz", "64 MHz", "128 MHz"], correctIndex: 2, explanation: "The Larmor equation ω₀ = γ × B₀ gives 42.58 MHz/T × 1.5T ≈ 63.87 MHz (~64 MHz). At 3T it doubles to ~128 MHz. The Larmor frequency is the resonant frequency at which RF energy must be applied to excite protons." },
  { question: "T1 relaxation describes:", options: ["Decay of transverse magnetisation due to spin-spin interactions", "Recovery of longitudinal magnetisation as energy is released to the lattice", "Loss of signal due to magnetic field inhomogeneity", "The time for the RF pulse to reach the protons"], correctIndex: 1, explanation: "T1 (spin-lattice/longitudinal) relaxation is the recovery of magnetisation along B₀. Protons release energy to the surrounding molecular lattice and return to their equilibrium alignment. T1 is defined as the time for 63% recovery of longitudinal magnetisation." },
  { question: "On a T1-weighted MRI image:", options: ["Water appears bright and fat appears dark", "Both fat and water appear bright", "Fat appears bright and water appears dark", "Both fat and water appear dark"], correctIndex: 2, explanation: "On T1-weighted images (short TR, short TE), fat is bright (short T1 → rapid recovery → strong signal) and water is dark (long T1 → incomplete recovery → weak signal). The mnemonic 'WW2' reminds us Water is White on T2 (not T1)." },
  { question: "The most dangerous hazard of the MRI environment is:", options: ["Radiofrequency burns to the patient", "Noise-induced hearing loss", "The missile/projectile effect from ferromagnetic objects", "Gadolinium contrast reactions"], correctIndex: 2, explanation: "The missile/projectile effect is the most dangerous MRI hazard. Ferromagnetic objects (O₂ cylinders, scissors, laryngoscope handles) can be accelerated toward the bore at lethal velocity by the strong static magnetic field. Several fatalities have been reported from projectile O₂ cylinders." },
  { question: "Which MRI equipment label means 'safe only under specified conditions'?", options: ["MR Safe", "MR Conditional", "MR Unsafe", "MR Compatible"], correctIndex: 1, explanation: "MR Conditional (yellow/triangle label) means the device is safe only under specific conditions of field strength, gradient strength, and SAR limits. MR Safe (green) poses no hazard in any MR environment. MR Unsafe (red) must never enter the MR environment. 'MR Compatible' is an outdated term no longer used." },
  { question: "Gadolinium contrast agents enhance signal on which type of MRI sequence?", options: ["T2-weighted (makes water brighter)", "T1-weighted (shortens T1 → brighter signal)", "Diffusion-weighted imaging", "T2*-weighted (susceptibility)"], correctIndex: 1, explanation: "Gadolinium is a paramagnetic contrast agent that shortens T1 relaxation time of nearby water molecules, causing them to appear bright on T1-weighted images. It is used to demonstrate vascular structures, blood-brain barrier breakdown, and enhancing lesions (tumours, inflammation)." },
  { question: "A 'quench' in MRI refers to:", options: ["Emergency shutdown of the RF transmitter", "Rapid boil-off of liquid helium from the superconducting magnet", "Deliberate reduction of magnetic field strength", "Power failure affecting the gradient coils"], correctIndex: 1, explanation: "A quench is the rapid boil-off of liquid helium that cools the superconducting coils. If the coils lose superconductivity, massive energy is released as heat, vapourising the helium. The expanding gas (600× volume expansion) can displace oxygen causing asphyxiation and can blow out doors/windows." },
  { question: "The magnetohydrodynamic effect in MRI causes:", options: ["Peripheral nerve stimulation from gradient switching", "Artefactual ST segment changes on ECG", "Image distortion from metallic implants", "Acoustic noise from vibrating gradient coils"], correctIndex: 1, explanation: "Blood flowing through the strong B₀ field induces a voltage across the vessel (Faraday's law — moving conductor in magnetic field). This produces artefactual ST elevation on the ECG, particularly noticeable at 3T, which can mimic ischaemia. It is not a true cardiac event." },
  { question: "T2* relaxation differs from T2 because it includes:", options: ["Only spin-lattice interactions", "Additional dephasing from B₀ field inhomogeneities", "RF pulse timing effects", "Gradient echo contributions only"], correctIndex: 1, explanation: "T2* includes both true T2 (spin-spin dephasing) AND additional dephasing from local B₀ field inhomogeneities (e.g., near metal, air-tissue interfaces). T2* is always shorter than T2. Spin echo sequences refocus the field inhomogeneity component to measure true T2." },
  { question: "Which of the following is safe to take into the MRI scanner room?", options: ["Standard stainless steel laryngoscope", "Aluminium oxygen cylinder", "Standard infusion pump", "Ferromagnetic scissors"], correctIndex: 1, explanation: "Aluminium is non-ferromagnetic and will not be attracted by the magnetic field, making aluminium cylinders MR Conditional (must still check specific labelling). Standard stainless steel laryngoscopes, infusion pumps, and scissors are ferromagnetic and must NEVER enter the scanner room — they become lethal projectiles." },
];

export const breathingCircuitsQuiz: QuizQuestion[] = [
  { question: "Which Mapleson circuit is most efficient for spontaneous ventilation?", options: ["Mapleson B", "Mapleson D (Bain)", "Mapleson A (Magill)", "Mapleson F (Jackson-Rees)"], correctIndex: 2, explanation: "Mapleson A (Magill) is most efficient for spontaneous ventilation. During expiration, alveolar gas (high CO₂) is vented first through the APL valve near the patient, while dead space gas (low CO₂) fills the tubing. FGF need only equal minute ventilation (~70 mL/kg/min)." },
  { question: "The Bain circuit is a modification of which Mapleson classification?", options: ["Mapleson A", "Mapleson C", "Mapleson D", "Mapleson F"], correctIndex: 2, explanation: "The Bain circuit is a coaxial modification of the Mapleson D. Fresh gas flows through a narrow inner tube to the patient end, while expired gas returns through the outer corrugated tube. It is the most efficient Mapleson circuit for controlled (IPPV) ventilation." },
  { question: "Ayre's T-piece (Mapleson E) is ideal for neonates because:", options: ["It has the largest reservoir bag", "It has no valves, giving minimal resistance to breathing", "It requires the lowest fresh gas flow", "It has a built-in CO₂ absorber"], correctIndex: 1, explanation: "The Mapleson E (Ayre's T-piece) has no valves, no reservoir bag, and minimal dead space — providing the lowest possible resistance to breathing. This is critical for neonates and infants who cannot overcome valve resistance. FGF must be 2–3× minute ventilation to prevent rebreathing." },
  { question: "How many essential components does a circle breathing system have?", options: ["4", "5", "7", "9"], correctIndex: 2, explanation: "The circle system has 7 essential components: (1) FGF inlet, (2) inspiratory unidirectional valve, (3) expiratory unidirectional valve, (4) Y-piece, (5) APL valve, (6) reservoir bag, and (7) CO₂ absorber. Unidirectional valves ensure one-way flow to prevent rebreathing." },
  { question: "The main advantage of low-flow anaesthesia with a circle system is:", options: ["Faster induction of anaesthesia", "Conservation of volatile agents, heat, and humidity", "Elimination of the need for monitoring", "Avoidance of CO₂ absorption"], correctIndex: 1, explanation: "Low-flow anaesthesia (FGF 0.5–1 L/min) conserves expensive volatile agents, preserves heat and humidity from the exothermic soda lime reaction, and reduces environmental pollution. It requires careful monitoring of inspired O₂ concentration and agent levels." },
  { question: "The main chemical components of soda lime are:", options: ["NaOH 80% + Ca(OH)₂ 4%", "Ca(OH)₂ 80% + NaOH 4%", "CaCO₃ 80% + NaHCO₃ 4%", "Na₂CO₃ 80% + KOH 4%"], correctIndex: 1, explanation: "Soda lime contains calcium hydroxide Ca(OH)₂ (~80%) as the main absorbent, with sodium hydroxide NaOH (~4%) as a catalyst/activator, KOH (~1%), water (~14%), and silica as a hardener. The NaOH is regenerated in the reaction cycle; Ca(OH)₂ is consumed." },
  { question: "Compound A is produced when which volatile agent reacts with desiccated soda lime?", options: ["Desflurane", "Isoflurane", "Sevoflurane", "Halothane"], correctIndex: 2, explanation: "Compound A (fluoromethyl-2,2-difluoro-1-[trifluoromethyl]vinyl ether) is a nephrotoxic degradation product of sevoflurane reacting with soda lime, particularly when desiccated. This is why FGF ≥2 L/min is sometimes recommended with sevoflurane, though clinical nephrotoxicity in humans is not established." },
  { question: "The scavenging system collecting connector is:", options: ["15mm diameter (same as ETT connector)", "22mm diameter (same as breathing circuit)", "30mm diameter (different from breathing circuit)", "Any standard connector can be used"], correctIndex: 2, explanation: "The scavenging collecting connector is deliberately 30mm diameter — different from the 22mm and 15mm breathing circuit connectors. This prevents accidental misconnection of the scavenging system to the breathing circuit, which could cause barotrauma or asphyxiation." },
  { question: "Safety valves in the scavenging receiving system limit pressure to:", options: ["±5 cmH₂O", "±0.5 cmH₂O", "±10 cmH₂O", "±20 cmH₂O"], correctIndex: 1, explanation: "Safety valves in the receiving system limit both positive and negative pressure to ±0.5 cmH₂O. A positive pressure valve prevents barotrauma if the scavenging outflow is blocked. A negative pressure valve prevents the active suction system from applying negative pressure to the patient circuit." },
  { question: "Carbon monoxide production from soda lime is most associated with:", options: ["Sevoflurane + fresh soda lime", "Desflurane + desiccated soda lime", "Isoflurane + fresh soda lime", "N₂O + any soda lime"], correctIndex: 1, explanation: "CO production is greatest with desflurane reacting with desiccated soda lime (especially containing KOH, as in baralyme). Desiccation occurs when FGF is left running overnight without a patient. Prevention: turn off FGF when not in use; use Ca(OH)₂-only absorbents (Amsorb®) which produce no CO." },
];

export const anaestheticMachineQuiz: QuizQuestion[] = [
  { question: "At what pressure does the medical gas pipeline supply deliver oxygen to the anaesthetic machine?", options: ["137 bar", "400 kPa (4 bar)", "1000 kPa (10 bar)", "44 bar"], correctIndex: 1, explanation: "Medical gas pipelines deliver gases at 400 kPa (4 bar, ~60 psi). This is a standardised pressure that is safe for downstream equipment. Cylinder pressure (137 bar for O₂) must be reduced by a pressure regulator before entering the machine's internal pipework." },
  { question: "A size E nitrous oxide cylinder reads 44 bar on the pressure gauge. How much N₂O remains?", options: ["The cylinder is full", "The cylinder is approximately half full", "Cannot be determined from pressure alone", "The cylinder is nearly empty"], correctIndex: 2, explanation: "N₂O is stored as a liquid in equilibrium with its vapour. The pressure remains constant at 44 bar (SVP at 20°C) until all liquid has evaporated. Only then does pressure fall. Therefore, the gauge cannot indicate remaining contents while liquid is present — the cylinder must be weighed." },
  { question: "The Pin Index System for an oxygen cylinder uses which pin positions?", options: ["2-5", "3-5", "1-5", "2-6"], correctIndex: 0, explanation: "The Pin Index System uses specific pin positions on the cylinder yoke to prevent wrong cylinder attachment. O₂ uses positions 2-5, N₂O uses 3-5, and Air uses 1-5. This is a critical safety feature to prevent hypoxic gas delivery." },
  { question: "In a rotameter at low flow rates, flow is predominantly dependent on:", options: ["Gas density", "Gas molecular weight", "Gas viscosity", "Barometric pressure"], correctIndex: 2, explanation: "At low flows the annular gap between the bobbin and tube wall is narrow, producing laminar flow. According to Hagen-Poiseuille's equation, laminar flow depends on viscosity. At high flows, the wider gap produces turbulent flow which depends on density. This is why rotameters are calibrated for specific gases." },
  { question: "Why must the O₂ flowmeter be positioned downstream (nearest the common gas outlet)?", options: ["To ensure accurate O₂ measurement", "To prevent hypoxic mixture delivery if an upstream tube cracks", "To comply with colour coding standards", "To reduce the work of breathing"], correctIndex: 1, explanation: "If an upstream flowmeter tube cracks, gas leaks out before reaching the common gas outlet. If the O₂ flowmeter were upstream and cracked, O₂ would leak while N₂O continued to flow, delivering a hypoxic mixture. Positioning O₂ downstream ensures any crack upstream causes loss of N₂O rather than O₂." },
  { question: "The O₂ failure alarm (Ritchie whistle) is powered by:", options: ["Electrical mains supply", "Battery backup", "The pressure of the O₂ supply itself", "A separate compressed air cylinder"], correctIndex: 2, explanation: "The Ritchie whistle is powered by the residual gas pressure in the O₂ supply as it falls. This ensures it can sound even during complete power failure. It activates when O₂ supply pressure drops below ~200 kPa and must produce an audible alarm for at least 7 seconds." },
  { question: "The O₂ flush valve delivers oxygen at:", options: ["5-10 L/min", "15-20 L/min", "35-75 L/min", "100-150 L/min"], correctIndex: 2, explanation: "The O₂ flush delivers 35-75 L/min of pure oxygen at pipeline pressure directly to the common gas outlet, bypassing flowmeters and vaporizers. Risks include barotrauma (if APL valve closed), awareness (dilution of volatile agent), and contamination with O₂ if flush is stuck open." },
  { question: "The filling ratio for an N₂O cylinder in the UK is:", options: ["0.50", "0.67", "0.75", "0.90"], correctIndex: 2, explanation: "The filling ratio (weight of liquid ÷ weight of water that would fill the cylinder) is 0.75 in the UK and 0.67 in tropical climates. The lower tropical ratio accounts for greater thermal expansion at higher ambient temperatures, preventing dangerous hydraulic pressure build-up." },
  { question: "A two-stage pressure regulator is preferred over a single-stage because it:", options: ["Is cheaper to manufacture", "Minimises the seat effect (rising outlet pressure as input falls)", "Can handle higher input pressures", "Requires less maintenance"], correctIndex: 1, explanation: "The 'seat effect' is the slight rise in outlet pressure that occurs in single-stage regulators as the inlet pressure falls — the spring force becomes relatively greater. Two-stage regulators minimise this by performing the reduction in two steps, providing more stable output pressure." },
  { question: "Which of the following is NOT part of the AAGBI 2012 pre-use machine check?", options: ["Test the O₂ failure alarm", "Calibrate the O₂ analyser", "Perform an arterial blood gas", "Check breathing system for leaks"], correctIndex: 2, explanation: "The AAGBI 2012 checklist includes checking gas supplies, testing the O₂ failure alarm, calibrating the O₂ analyser, checking flowmeters, vaporizers, breathing system integrity, ventilator function, suction, and scavenging. Performing an ABG is a clinical investigation, not part of the machine check." },
];

export const defibrillationPacingQuiz: QuizQuestion[] = [
  { question: "What is the recommended initial energy for biphasic defibrillation of ventricular fibrillation?", options: ["50 J", "120–150 J", "200 J", "360 J"], correctIndex: 1, explanation: "Biphasic defibrillators typically use 120–150 J for the first shock in VF (manufacturer-specific). This is significantly lower than the 360 J required for monophasic devices, yet achieves equal or superior first-shock success rates with less myocardial damage." },
  { question: "What is the typical transthoracic impedance in an adult?", options: ["20–30 Ω", "70–80 Ω", "150–200 Ω", "300–400 Ω"], correctIndex: 1, explanation: "Typical adult TTI is 70–80 Ω, with a range of 15–150 Ω. Only about 4% of the delivered current actually traverses the myocardium. Biphasic defibrillators compensate for impedance variation by adjusting waveform duration and voltage." },
  { question: "Which of the following INCREASES transthoracic impedance?", options: ["Self-adhesive gel pads", "Defibrillation during expiration", "Hyperinflated lungs (COPD)", "Repeated successive shocks"], correctIndex: 2, explanation: "Hyperinflated lungs increase the distance and air (poor conductor) between the pads and heart, raising TTI. Gel pads improve contact, expiration reduces chest volume, and successive shocks reduce impedance — all decrease TTI." },
  { question: "In the NBG pacemaker code, what does the third position represent?", options: ["Chamber paced", "Chamber sensed", "Response to sensing", "Rate modulation"], correctIndex: 2, explanation: "The NBG code positions are: I = chamber paced, II = chamber sensed, III = response to sensing (I = inhibited, T = triggered, D = dual, O = none), IV = rate modulation, V = multisite pacing." },
  { question: "A patient with a VVI pacemaker develops dizziness and hypotension during pacing. The most likely cause is:", options: ["Lead fracture", "Battery depletion", "Pacemaker syndrome", "Electromagnetic interference"], correctIndex: 2, explanation: "Pacemaker syndrome occurs with VVI pacing due to loss of AV synchrony. The atria contract against closed AV valves, causing cannon A waves, reduced cardiac output, and symptoms of dizziness, fatigue, and hypotension. Treatment is upgrade to a dual-chamber (DDD) system." },
  { question: "Placing a magnet over a pacemaker generator typically causes:", options: ["The device to switch off", "Conversion to asynchronous (fixed-rate) pacing", "An increase in pacing rate to 100 bpm", "Activation of anti-tachycardia therapy"], correctIndex: 1, explanation: "Magnet application converts most pacemakers to an asynchronous mode (VOO or DOO), pacing at a fixed rate without sensing. This eliminates the risk of EMI-induced inhibition. The magnet rate varies by manufacturer and also indicates battery status (rate decreases as battery depletes)." },
  { question: "The most significant source of electromagnetic interference in the operating theatre is:", options: ["Nerve stimulators", "Pulse oximetry", "Surgical diathermy", "ECG monitoring"], correctIndex: 2, explanation: "Surgical diathermy (electrocautery) is the most common and significant source of EMI in theatre. Monopolar diathermy poses the greatest risk as current flows through the body. It can cause inappropriate inhibition of pacing or tracking of the diathermy signal as cardiac activity." },
  { question: "For a pacemaker-dependent patient requiring monopolar diathermy, the recommended approach includes:", options: ["No special precautions needed", "Apply magnet, bipolar preferred, short bursts, return pad away from generator", "Explant the pacemaker before surgery", "Switch to MRI mode"], correctIndex: 1, explanation: "Key precautions: have magnet available (converts to asynchronous mode to prevent inhibition), prefer bipolar diathermy, use monopolar in short bursts (<5s), place return pad as far from generator as possible, and maintain continuous ECG and pulse oximetry monitoring." },
  { question: "When defibrillating a patient with a permanent pacemaker, pads should be placed:", options: ["Directly over the generator", "At least 15 cm from the generator", "Only in the anteroposterior position", "On the left arm and right leg"], correctIndex: 1, explanation: "Defibrillation pads should be placed at least 15 cm (some guidelines say 12 cm) from the pulse generator to minimise energy conducted along the leads to the electrode-myocardium interface, which can cause myocardial damage and changes in pacing threshold." },
  { question: "A key advantage of biphasic over monophasic defibrillation is:", options: ["Simpler circuit design", "Impedance compensation adjusting waveform to patient", "Ability to cardiovert atrial fibrillation", "Higher peak current delivery"], correctIndex: 1, explanation: "Biphasic devices measure transthoracic impedance and automatically adjust waveform duration and voltage to deliver consistent current regardless of patient impedance. This impedance compensation ensures effective defibrillation across a wider range of patients — a feature absent in monophasic devices." },
];

export const clinicalMeasurementQuiz: QuizQuestion[] = [
  { question: "The arterial pressure transducer uses which type of sensor?", options: ["Piezoelectric crystal", "Wheatstone bridge strain gauge", "Capacitive membrane", "Thermocouple"], correctIndex: 1, explanation: "Arterial transducers use a strain gauge arranged in a Wheatstone bridge configuration. Pressure deflects a diaphragm, changing resistance in the strain gauge elements, producing a voltage proportional to pressure. This is distinct from piezoelectric crystals (used in ultrasound) and thermocouples (temperature)." },
  { question: "If the arterial transducer is positioned 15 cm below the level of the heart, the displayed pressure will be:", options: ["Approximately 11 mmHg too high", "Approximately 11 mmHg too low", "Unaffected", "Approximately 15 mmHg too high"], correctIndex: 0, explanation: "A 15 cm column of saline exerts approximately 11 mmHg hydrostatic pressure (1 mmHg ≈ 1.36 cmH₂O). If the transducer is below the heart, this hydrostatic pressure is added to the true arterial pressure, giving a falsely high reading. Each cm of displacement ≈ 0.74 mmHg error." },
  { question: "The optimal damping coefficient for an arterial transducer system is:", options: ["0", "0.34", "0.64", "1.0"], correctIndex: 2, explanation: "A damping coefficient of 0.64 provides optimal frequency response — a flat amplitude ratio up to the natural frequency with minimal overshoot. D = 0 is undamped (infinite oscillation), D = 1 is critically damped (no overshoot but sluggish), and D > 1 is overdamped." },
  { question: "After a fast flush test, you observe more than 3 oscillations before the waveform settles. This indicates:", options: ["Optimal damping", "Overdamping", "Underdamping", "Critical damping"], correctIndex: 2, explanation: "More than 2 oscillations after a fast flush indicates underdamping (excessive resonance). This causes overestimation of systolic pressure and underestimation of diastolic pressure. Causes include long/compliant tubing, extra stopcocks, and low blood viscosity. MAP remains relatively accurate." },
  { question: "Giant 'a' waves on the CVP trace are seen in:", options: ["Atrial fibrillation", "Tricuspid regurgitation", "Tricuspid stenosis", "Constrictive pericarditis"], correctIndex: 2, explanation: "Giant a waves occur when the atrium contracts against increased resistance — seen in tricuspid stenosis, pulmonary hypertension, and pulmonary stenosis. In AF, a waves are absent (no coordinated atrial contraction). Giant v waves (not a waves) indicate tricuspid regurgitation. Constrictive pericarditis shows prominent x and y descents." },
  { question: "The 'y' descent of the CVP waveform represents:", options: ["Atrial contraction", "Tricuspid valve closure", "Atrial relaxation during ventricular systole", "Rapid atrial emptying after tricuspid valve opening"], correctIndex: 3, explanation: "The y descent occurs after the v wave when the tricuspid valve opens and blood flows rapidly from the atrium into the ventricle. It is steep and prominent in constrictive pericarditis (Friedreich's sign) and absent in cardiac tamponade (impaired ventricular filling)." },
  { question: "In PAC thermodilution, a large area under the thermodilution curve indicates:", options: ["High cardiac output", "Low cardiac output", "Normal cardiac output", "Tricuspid regurgitation"], correctIndex: 1, explanation: "The Stewart-Hamilton equation shows CO is inversely proportional to the area under the thermodilution curve. With low CO, cold injectate lingers longer in the blood, producing a larger, prolonged temperature change curve. High CO washes the indicator through quickly, producing a small area." },
  { question: "The Fick equation for cardiac output is:", options: ["CO = MAP / SVR", "CO = VO₂ / (CaO₂ − CvO₂)", "CO = SV × HR", "CO = LVOT area × VTI × HR"], correctIndex: 1, explanation: "The Fick principle states CO = VO₂ / (CaO₂ − CvO₂), where VO₂ is oxygen consumption, CaO₂ is arterial oxygen content, and CvO₂ is mixed venous oxygen content. While the theoretical gold standard, it is impractical clinically as it requires direct measurement of O₂ consumption and true mixed venous blood from the PA." },
  { question: "Systolic arterial pressure measured at the dorsalis pedis is typically:", options: ["Lower than aortic systolic pressure", "Equal to aortic systolic pressure", "Higher than aortic systolic pressure", "Unpredictable compared to aortic pressure"], correctIndex: 2, explanation: "Systolic amplification occurs as the arterial waveform moves peripherally — SBP increases and DBP decreases due to wave reflection from arterial branch points and decreasing arterial compliance. However, MAP is preserved throughout the arterial tree, making it the most reliable parameter." },
  { question: "Which cardiac output monitor provides EVLW (extravascular lung water) measurement?", options: ["PAC thermodilution", "Oesophageal Doppler", "PiCCO (transpulmonary thermodilution)", "FloTrac/Vigileo"], correctIndex: 2, explanation: "PiCCO uses transpulmonary thermodilution to derive volumetric parameters including GEDV (global end-diastolic volume), EVLW (extravascular lung water), and PVPI (pulmonary vascular permeability index), in addition to CO. These parameters are not available from PAC thermodilution, Doppler, or uncalibrated pulse contour devices." },
];

export const siUnitsThermodynamicsQuiz: QuizQuestion[] = [
  { question: "Which of the following is NOT an SI base unit?", options: ["Kelvin", "Newton", "Mole", "Candela"], correctIndex: 1, explanation: "The Newton is a derived unit (N = kg·m·s⁻²). The 7 SI base units are: metre, kilogram, second, ampere, kelvin, mole, and candela. All other units (Pascal, Joule, Watt, Newton, Hertz, etc.) are derived from these base units." },
  { question: "1 atmosphere is equivalent to:", options: ["100 kPa", "101.3 kPa", "760 kPa", "1013 kPa"], correctIndex: 1, explanation: "1 atmosphere = 101.3 kPa = 760 mmHg = 1013 cmH₂O = 14.7 psi = 1.013 bar. This is a frequently tested conversion in the Primary FRCA. Note that 100 kPa is 1 bar, which is close to but not exactly 1 atmosphere." },
  { question: "All individual gas laws are derived from which master equation?", options: ["Fick's law of diffusion", "The Nernst equation", "PV = nRT (ideal gas equation)", "Hagen-Poiseuille equation"], correctIndex: 2, explanation: "PV = nRT is the ideal gas equation from which Boyle's (constant T,n), Charles' (constant P,n), Gay-Lussac's (constant V,n), and Avogadro's (constant T,P) laws are all derived by holding specific variables constant." },
  { question: "N₂O in a cylinder deviates from ideal gas behaviour because:", options: ["It has too low a molecular weight", "It is stored near its critical temperature as a liquid-vapour mixture", "It has no intermolecular forces", "Its molecules have zero volume"], correctIndex: 1, explanation: "N₂O has a critical temperature of 36.5°C (close to room temperature), so it exists as a liquid-vapour mixture in cylinders. Real gas behaviour is seen near the critical point where intermolecular forces become significant. The van der Waals equation accounts for these deviations from ideal behaviour." },
  { question: "The specific heat capacity of water is approximately:", options: ["1.0 kJ/kg/K", "2.1 kJ/kg/K", "4.18 kJ/kg/K", "10 kJ/kg/K"], correctIndex: 2, explanation: "Water has a specific heat capacity of 4.18 kJ/kg/K — the highest of any common liquid. This high value gives the human body (60% water) excellent thermal stability and makes water an effective medium for warming/cooling devices (e.g., forced air warmers, fluid warmers)." },
  { question: "During a phase change from liquid to gas, the temperature:", options: ["Increases linearly", "Decreases", "Remains constant while latent heat is absorbed", "Fluctuates unpredictably"], correctIndex: 2, explanation: "During a phase change, all added energy goes into breaking intermolecular bonds (latent heat) rather than increasing kinetic energy. Temperature remains constant until the phase change is complete. The latent heat of vaporisation of water is 2260 kJ/kg — much larger than the latent heat of fusion (334 kJ/kg)." },
  { question: "Evaporative heat loss in theatre is significant because:", options: ["Air has a low specific heat capacity", "The latent heat of vaporisation of water is very large (2260 kJ/kg)", "Radiation cannot occur in a theatre environment", "Convection is the only mechanism of heat loss"], correctIndex: 1, explanation: "The latent heat of vaporisation of water (2260 kJ/kg) means evaporation of even small volumes of water from exposed surgical surfaces removes large amounts of heat energy. This makes evaporation a dominant mechanism of intraoperative heat loss, especially during prolonged open abdominal/thoracic surgery." },
  { question: "The first law of thermodynamics (ΔU = Q − W) explains why:", options: ["Temperature can never decrease", "Gas expanding through a pressure regulator cools (adiabatic process)", "Heat always flows from cold to hot", "Absolute zero is unattainable"], correctIndex: 1, explanation: "In an adiabatic process (Q = 0, no heat exchange), the first law becomes ΔU = −W. When gas expands and does work (W > 0), internal energy decreases (ΔU < 0), causing cooling. This Joule-Thomson effect explains cooling in pressure regulators and is the principle behind cryotherapy." },
  { question: "The second law of thermodynamics states that:", options: ["Energy cannot be created or destroyed", "Heat spontaneously flows from hot to cold and entropy increases", "Absolute zero is unattainable", "Thermal equilibrium is transitive"], correctIndex: 1, explanation: "The second law states that heat flows spontaneously from hot to cold (never the reverse without external work), and the entropy of an isolated system always increases. This explains perioperative heat loss: patients (37°C) lose heat to the cold theatre environment (20°C) via radiation, convection, evaporation, and conduction." },
  { question: "The dominant mechanism of heat loss in a patient in a cold operating theatre is:", options: ["Conduction (5%)", "Convection (30%)", "Radiation (40%)", "Evaporation (25%)"], correctIndex: 2, explanation: "Radiation is the dominant mechanism of heat loss in theatre, accounting for approximately 40% of total loss. It occurs via infrared electromagnetic waves from exposed skin to cooler surroundings. Convection (30%) involves air currents, evaporation (25%) from surgical surfaces and respiration, and conduction (5%) from contact with cold surfaces." },
];

export const abgAnalyserQuestions: QuizQuestion[] = [
  { question: "The Clark electrode measures PO₂ by:", options: ["Measuring voltage generated by O₂ reduction", "Measuring current produced by O₂ reduction at a polarised platinum cathode", "Measuring pH change caused by dissolved oxygen", "Measuring infrared absorption of O₂"], correctIndex: 1, explanation: "The Clark electrode is amperometric — it measures the current produced when O₂ is reduced at a platinum cathode held at −0.6V (polarizing voltage). The current is directly proportional to the PO₂. This contrasts with potentiometric electrodes (pH, PCO₂) which measure voltage." },
  { question: "The Severinghaus CO₂ electrode is essentially:", options: ["A Clark electrode with a different membrane", "A modified pH electrode separated from blood by a CO₂-permeable Teflon membrane", "A fuel cell that generates voltage proportional to PCO₂", "An infrared sensor measuring CO₂ absorption"], correctIndex: 1, explanation: "The Severinghaus electrode is a modified pH electrode. CO₂ diffuses across a Teflon membrane (permeable to CO₂ but not H⁺) into a thin film of NaHCO₃ solution. CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. The resulting pH change is proportional to log PCO₂." },
  { question: "The Nernst equation predicts that at 37°C, the pH electrode generates approximately:", options: ["30 mV per pH unit", "61.5 mV per pH unit", "100 mV per pH unit", "120 mV per pH unit"], correctIndex: 1, explanation: "The Nernst equation E = E₀ + (RT/nF) × ln[H⁺] predicts 61.5 mV per pH unit at 37°C (310K). This is the theoretical 'Nernst slope'. During calibration, the measured slope should be 95-105% of this theoretical value." },
  { question: "Which ABG parameter has the slowest electrode response time?", options: ["pH", "PO₂", "PCO₂", "All have equal response times"], correctIndex: 2, explanation: "The Severinghaus PCO₂ electrode has the slowest response time (~60-120 seconds) because CO₂ must diffuse across the Teflon membrane and then react with the NaHCO₃ solution before pH change is detected. pH responds in ~5s, PO₂ (Clark) in ~20-30s." },
  { question: "The galvanic fuel cell used for FiO₂ monitoring differs from the Clark electrode in that it:", options: ["Uses a platinum cathode instead of gold", "Requires an external polarizing voltage of −0.6V", "Is self-generating and requires no external power supply", "Measures dissolved O₂ in blood rather than gas"], correctIndex: 2, explanation: "The galvanic fuel cell is self-generating — the lead anode oxidation and gold cathode O₂ reduction create an EMF proportional to PO₂ without any external power. The lead anode is consumed over time, giving the cell a finite lifespan (~6-12 months). It measures O₂ in gas, not blood." },
  { question: "Which of the following is a source of error specific to the Clark electrode?", options: ["Protein coating of the pH-sensitive glass", "Consumption of O₂ by the electrode itself", "CO₂ interference with the measurement", "Nitrous oxide cross-sensitivity"], correctIndex: 1, explanation: "The Clark electrode consumes O₂ during measurement (O₂ + 2H₂O + 4e⁻ → 4OH⁻). The polypropylene membrane limits the rate of O₂ diffusion to the cathode, ensuring current is proportional to PO₂. However, this O₂ consumption means stagnant samples may give falsely low readings." },
  { question: "The α-stat approach to ABG interpretation in hypothermia involves:", options: ["Correcting results to the patient's actual body temperature", "Reporting results at 37°C regardless of patient temperature", "Adding CO₂ to maintain pH 7.4 at the patient's temperature", "Using a different calibration buffer for hypothermic samples"], correctIndex: 1, explanation: "α-stat reports ABG values measured at 37°C without correction. This preserves the ionisation state of imidazole (α) groups on histidine residues, maintaining intracellular electroneutrality. It is preferred for most adult cardiac surgery. pH-stat corrects to actual temperature and may improve CBF in deep hypothermia (paediatric cardiac surgery)." },
  { question: "Air bubbles in an ABG sample will cause:", options: ["↑PO₂ and ↑PCO₂", "↓PO₂ and ↑PCO₂", "↑PO₂ and ↓PCO₂", "No significant change"], correctIndex: 2, explanation: "Air has a PO₂ of ~150 mmHg (higher than venous blood) and PCO₂ of ~0.3 mmHg (much lower than blood ~40 mmHg). Equilibration with air bubbles raises PO₂ and lowers PCO₂. This is one of the most common pre-analytical errors." },
  { question: "In a galvanic fuel cell, the anode material is:", options: ["Platinum", "Gold", "Silver/silver chloride", "Lead"], correctIndex: 3, explanation: "The galvanic fuel cell uses a lead (Pb) anode which is oxidised: 2Pb + 4OH⁻ → 2Pb(OH)₂ + 4e⁻. The lead is consumed during use, which is why the cell has a finite lifespan of approximately 6-12 months and must be replaced periodically." },
  { question: "The ABG analyser directly measures which of the following?", options: ["pH, PO₂, HCO₃⁻", "pH, PCO₂, base excess", "pH, PO₂, PCO₂", "PO₂, PCO₂, SaO₂"], correctIndex: 2, explanation: "The three directly measured parameters are pH (glass electrode), PO₂ (Clark electrode), and PCO₂ (Severinghaus electrode). HCO₃⁻ and base excess are calculated from pH and PCO₂ using the Henderson-Hasselbalch equation. SaO₂ is either calculated or measured by co-oximetry." },
];

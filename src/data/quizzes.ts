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

export interface Topic {
  id: string;
  title: string;
  description: string;
  section: "physics" | "physiology" | "pharmacology";
  examLevel: "primary" | "final" | "both";
  available: boolean;
}

export const physicsTopics: Topic[] = [
  { id: "gas-laws", title: "Gas Laws", description: "Boyle's, Charles', Dalton's, Henry's laws and their clinical applications", section: "physics", examLevel: "primary", available: true },
  { id: "pressure-measurement", title: "Pressure Measurement", description: "Transducers, manometers, and invasive monitoring principles", section: "physics", examLevel: "primary", available: true },
  { id: "flow-measurement", title: "Flow & Flowmeters", description: "Laminar vs turbulent flow, Hagen-Poiseuille equation, rotameters", section: "physics", examLevel: "primary", available: true },
  { id: "vaporizers", title: "Vaporizers", description: "Physics of vaporization, SVP, plenum and draw-over vaporizers", section: "physics", examLevel: "primary", available: true },
  { id: "electrical-safety", title: "Electrical Safety", description: "Microshock, macroshock, diathermy, defibrillation", section: "physics", examLevel: "primary", available: true },
  { id: "pulse-oximetry", title: "Pulse Oximetry & Capnography", description: "Beer-Lambert law, absorption spectroscopy, infrared analysis", section: "physics", examLevel: "primary", available: true },
];

export const physiologyTopics: Topic[] = [
  { id: "oxygen-haemoglobin", title: "Oxygen-Haemoglobin Dissociation", description: "The ODC, Bohr effect, factors shifting the curve, oxygen delivery", section: "physiology", examLevel: "primary", available: true },
  { id: "cardiac-cycle", title: "The Cardiac Cycle", description: "Pressure-volume loops, Wiggers diagram, cardiac output", section: "physiology", examLevel: "primary", available: true },
  { id: "lung-mechanics", title: "Lung Mechanics", description: "Compliance, resistance, surfactant, work of breathing", section: "physiology", examLevel: "primary", available: true },
  { id: "renal-physiology", title: "Renal Physiology", description: "GFR, tubular function, acid-base balance, electrolyte handling", section: "physiology", examLevel: "primary", available: true },
  { id: "neuromuscular", title: "Neuromuscular Transmission", description: "Motor endplate, acetylcholine, muscle contraction, monitoring", section: "physiology", examLevel: "primary", available: true },
  { id: "autonomic-nervous", title: "Autonomic Nervous System", description: "Sympathetic and parasympathetic pathways, receptors, reflexes", section: "physiology", examLevel: "primary", available: true },
];

export const pharmacologyTopics: Topic[] = [
  { id: "pharmacokinetics", title: "Pharmacokinetic Principles", description: "Compartment models, volume of distribution, clearance, half-life", section: "pharmacology", examLevel: "primary", available: true },
  { id: "iv-anaesthetics", title: "Intravenous Anaesthetic Agents", description: "Propofol, thiopentone, ketamine, etomidate — mechanisms and pharmacology", section: "pharmacology", examLevel: "primary", available: true },
  { id: "volatile-agents", title: "Volatile Anaesthetic Agents", description: "MAC, Meyer-Overton, blood-gas partition coefficient, uptake and distribution", section: "pharmacology", examLevel: "primary", available: true },
  { id: "opioids", title: "Opioid Pharmacology", description: "Receptor subtypes, clinical pharmacology of morphine, fentanyl, remifentanil", section: "pharmacology", examLevel: "primary", available: true },
  { id: "muscle-relaxants", title: "Neuromuscular Blocking Agents", description: "Depolarising vs non-depolarising, reversal agents, sugammadex", section: "pharmacology", examLevel: "primary", available: true },
  { id: "local-anaesthetics", title: "Local Anaesthetic Agents", description: "Mechanism, pKa, protein binding, toxicity, lipid rescue", section: "pharmacology", examLevel: "primary", available: true },
];

/**
 * Data-driven topic route table.
 *
 * Replaces ~250 lines of hand-rolled `lazy(() => import(...))` + `<Route>` pairs
 * in App.tsx. Each entry is `[urlPath, moduleName]` where `moduleName` matches
 * the file basename under `src/pages/topics/`. Loaders are resolved lazily via
 * `import.meta.glob` — Vite still code-splits each topic into its own chunk.
 *
 * Adding a topic is now:
 *   1. Drop `<Name>Topic.tsx` under src/pages/topics/
 *   2. Add one entry below
 *
 * Redirects live in a separate table so the intent is obvious at a glance.
 */
import { lazy, type LazyExoticComponent, type ComponentType } from "react";

// Vite glob — one lazy loader per topic module, code-split as before.
const modules = import.meta.glob("../pages/topics/*.tsx");

function loader(moduleName: string): LazyExoticComponent<ComponentType> {
  const key = `../pages/topics/${moduleName}.tsx`;
  const importer = modules[key];
  if (!importer) {
    throw new Error(
      `[topicRoutes] no module for "${moduleName}" — expected src/pages/topics/${moduleName}.tsx`,
    );
  }
  return lazy(importer as () => Promise<{ default: ComponentType }>);
}

/** URL path → topic component filename (without .tsx). */
export const TOPIC_ROUTES: ReadonlyArray<readonly [string, string]> = [
  // Physics
  ["/physics/gas-laws", "GasLawsTopic"],
  ["/physics/pressure-measurement", "PressureMeasurementTopic"],
  ["/physics/flow-measurement", "FlowMeasurementTopic"],
  ["/physics/electrical-safety", "ElectricalSafetyTopic"],
  ["/physics/pulse-oximetry", "PulseOximetryTopic"],
  ["/physics/abg-analyser", "ABGAnalyserTopic"],
  ["/physics/temperature-measurement", "TemperatureMeasurementTopic"],
  ["/physics/humidity-gas-sampling", "HumidityGasSamplingTopic"],
  ["/physics/lasers-fibreoptics", "LaserFibreopticsTopic"],
  ["/physics/ultrasound-physics", "UltrasoundPhysicsTopic"],
  ["/physics/mri-physics", "MRIPhysicsTopic"],
  ["/physics/xray-radiation-safety", "XRayRadiationSafetyTopic"],
  ["/physics/defibrillation-pacing", "DefibrillationPacingTopic"],
  ["/physics/clinical-measurement", "ClinicalMeasurementTopic"],
  ["/physics/si-units-thermodynamics", "SIUnitsThermodynamicsTopic"],
  ["/physics/optics-light", "OpticsLightTopic"],
  ["/physics/electricity-magnetism", "ElectricityMagnetismTopic"],
  ["/physics/statistics-ebm", "StatisticsEBMTopic"],
  ["/physics/math-concepts", "MathConceptsTopic"],
  ["/physics/depth-of-anaesthesia", "DepthOfAnaesthesiaMonitoringTopic"],
  ["/physics/equipment-monitoring", "EquipmentMonitoringTopic"],
  ["/physics/vaporisers", "VaporisersTopic"],
  ["/physics/breathing-circuits", "BreathingCircuitsTopic"],
  ["/physics/ventilator-modes", "VentilatorModesTopic"],
  ["/physics/capnography", "CapnographyTopic"],
  ["/physics/capnography/waveforms", "CapnographyWaveformsTopic"],
  ["/physics/venturi-mask", "VenturiMaskTopic"],

  // Physiology
  ["/physiology/oxygen-haemoglobin", "OxygenHaemoglobinTopic"],
  ["/physiology/cardiac-cycle", "CardiacCycleTopic"],
  ["/physiology/lung-mechanics", "LungMechanicsTopic"],
  ["/physiology/renal-physiology", "RenalPhysiologyTopic"],
  ["/physiology/neuromuscular", "NeuromuscularTopic"],
  ["/physiology/autonomic-nervous", "AutonomicNervousTopic"],
  ["/physiology/maternal-physiology", "MaternalPhysiologyTopic"],
  ["/physiology/foetal-circulation", "FoetalCirculationTopic"],
  ["/physiology/hepatic-physiology", "HepaticPhysiologyTopic"],
  ["/physiology/starling-forces", "StarlingForcesTopic"],
  ["/physiology/gi-physiology", "GastrointestinalPhysiologyTopic"],
  ["/physiology/cardiac-electrophysiology", "CardiacElectrophysiologyTopic"],
  ["/physiology/ventilation-perfusion", "VentilationPerfusionTopic"],
  ["/physiology/endocrine-physiology", "EndocrinePhysiologyTopic"],
  ["/physiology/haematology-immunity", "HaematologyImmunityTopic"],

  // Pharmacology
  ["/pharmacology/pharmacokinetics", "PharmacokineticsTopic"],
  ["/pharmacology/iv-anaesthetics", "IVAnaestheticsTopic"],
  ["/pharmacology/volatile-agents", "VolatileAgentsTopic"],
  ["/pharmacology/opioids", "OpioidsTopic"],
  ["/pharmacology/muscle-relaxants", "MuscleRelaxantsTopic"],
  ["/pharmacology/rocuronium", "RocuroniumTopic"],
  ["/pharmacology/suxamethonium-vs-rocuronium", "SuxVsRocComparisonTopic"],
  ["/pharmacology/local-anaesthetics", "LocalAnaestheticsTopic"],
  ["/pharmacology/vasoactive-agents", "VasoactiveAgentsTopic"],
  ["/pharmacology/antimicrobials-pharm", "AntimicrobialsPharmTopic"],
  ["/pharmacology/antiarrhythmics", "AntiarrhythmicsTopic"],
  ["/pharmacology/anticoagulants", "AnticoagulantsTopic"],
  ["/pharmacology/pharmacodynamics", "PharmacodynamicsTopic"],
  ["/pharmacology/nsaids-paracetamol", "NSAIDsParacetamolTopic"],
  ["/pharmacology/antiemetics", "AntiemeticsTopic"],
  ["/pharmacology/corticosteroids", "CorticosteroidsTopic"],

  // Clinical
  ["/clinical/airway-management", "AirwayManagementTopic"],
  ["/clinical/regional-anaesthesia", "RegionalAnaesthesiaTopic"],
  ["/clinical/obstetric-anaesthesia", "ObstetricAnaesthesiaTopic"],
  ["/clinical/paediatric-anaesthesia", "PaediatricAnaesthesiaTopic"],
  ["/clinical/neuroanaesthesia", "NeuroanaesthesiaTopic"],
  ["/clinical/cardiothoracic", "CardiothoracicTopic"],
  ["/clinical/trauma-emergency", "TraumaEmergencyTopic"],
  ["/clinical/clinical-incidents", "ClinicalIncidentsTopic"],
  ["/clinical/resource-poor-anaesthesia", "ResourcePoorAnaesthesiaTopic"],
  ["/clinical/mass-casualty-military", "MassCasualtyMilitaryTopic"],
  ["/clinical/pain-medicine", "PainMedicineTopic"],
  ["/clinical/tiva", "TIVATopic"],
  ["/clinical/orthopaedic-anaesthesia", "OrthopaedicAnaesthesiaTopic"],
  ["/clinical/ophthalmic-anaesthesia", "OphthalmicAnaesthesiaTopic"],
  ["/clinical/day-surgery", "DaySurgeryTopic"],
  ["/clinical/operating-theatre-environment", "OperatingTheatreEnvironmentTopic"],
  ["/clinical/procedural-sedation", "ProceduralSedationTopic"],
  ["/clinical/transfer-medicine", "TransferMedicineTopic"],
  ["/clinical/patient-positioning", "PatientPositioningTopic"],
  ["/clinical/bariatric-anaesthesia", "BariatricAnaesthesiaTopic"],
  ["/clinical/vascular-anaesthesia", "VascularAnaesthesiaTopic"],
  ["/clinical/ent-anaesthesia", "ENTAnaesthesiaTopic"],
  ["/clinical/burns-plastics", "BurnsPlasticsTopic"],
  ["/clinical/emergency-surgery", "EmergencySurgeryTopic"],
  ["/clinical/urological-anaesthesia", "UrologicalAnaesthesiaTopic"],
  ["/clinical/gynaecological-anaesthesia", "GynaecologicalAnaesthesiaTopic"],
  ["/clinical/hepatobiliary-transplant", "HepatobiliaryTransplantTopic"],
  ["/clinical/plastic-surgery", "PlasticSurgeryTopic"],
  ["/clinical/interventional-radiology", "InterventionalRadiologyTopic"],
  ["/clinical/elderly-anaesthesia", "ElderlyAnaesthesiaTopic"],

  // Perioperative
  ["/perioperative/cardiovascular-disease", "CardiovascularDiseaseTopic"],
  ["/perioperative/respiratory-disease", "RespiratoryDiseaseTopic"],
  ["/perioperative/endocrine-disease", "EndocrineDiseaseTopic"],
  ["/perioperative/neurological-disease", "NeurologicalDiseaseTopic"],
  ["/perioperative/haematological-disease", "HaematologicalDiseaseTopic"],
  ["/perioperative/hepatic-disease", "HepaticDiseaseTopic"],
  ["/perioperative/preoperative-assessment", "PreoperativeAssessmentTopic"],
  ["/perioperative/enhanced-recovery", "EnhancedRecoveryTopic"],
  ["/perioperative/perioperative-fluids", "PerioperativeFluidsTopic"],
  ["/perioperative/vascular-access-devices", "VascularAccessDevicesTopic"],
  ["/perioperative/renal-disease", "RenalDiseaseTopic"],
  ["/perioperative/musculoskeletal-disease", "MusculoskeletalDiseaseTopic"],
  ["/perioperative/gastrointestinal-disease", "GastrointestinalDiseaseTopic"],
  ["/perioperative/psychiatric-substance-disease", "PsychiatricSubstanceDiseaseTopic"],
  ["/perioperative/immunosuppression-hiv", "ImmunosuppressionHivTopic"],
  ["/perioperative/genetic-syndromes", "GeneticSyndromesTopic"],

  // Intensive Care
  ["/intensive-care/sepsis", "SepsisTopic"],
  ["/intensive-care/mechanical-ventilation", "MechanicalVentilationTopic"],
  ["/intensive-care/circulatory-failure", "CirculatoryFailureTopic"],
  ["/intensive-care/aki-rrt", "AkiRrtTopic"],
  ["/intensive-care/acute-liver-failure", "AcuteLiverFailureTopic"],
  ["/intensive-care/acute-pancreatitis", "AcutePancreatitisTopic"],
  ["/intensive-care/abdominal-compartment-syndrome", "AbdominalCompartmentSyndromeTopic"],
  ["/intensive-care/neurointensive-care", "NeurointensiveCareTopic"],
  ["/intensive-care/cardiac-output-monitoring", "CardiacOutputMonitoringTopic"],
  ["/intensive-care/acid-base", "AcidBaseTopic"],
  ["/intensive-care/ards", "ARDSTopic"],
  ["/intensive-care/icu-nutrition", "IcuNutritionTopic"],
  ["/intensive-care/postop-high-risk-icu", "PostopHighRiskIcuTopic"],
  ["/intensive-care/icu-endocrine-emergencies", "IcuEndocrineEmergenciesTopic"],
  ["/intensive-care/transfusion-coagulation", "TransfusionCoagulationTopic"],
  ["/intensive-care/icu-sedation-delirium", "IcuSedationDeliriumTopic"],
  ["/intensive-care/organ-donation", "OrganDonationTopic"],
  ["/intensive-care/antimicrobials-icu", "AntimicrobialsIcuTopic"],
  ["/intensive-care/paediatric-icu", "PaediatricIcuTopic"],
  ["/intensive-care/burns-icu", "BurnsIcuTopic"],
  ["/intensive-care/haematology-icu", "HaematologyIcuTopic"],
  ["/intensive-care/immunology-intensivists", "ImmunologyIntensivistsTopic"],
  ["/intensive-care/ecmo", "EcmoTopic"],
  ["/intensive-care/toxicology", "ToxicologyTopic"],
  ["/intensive-care/infectious-disease-icu", "InfectiousDiseaseIcuTopic"],
  ["/intensive-care/bronchospastic-failure", "BronchospasticFailureTopic"],
  ["/intensive-care/prognostication-ethics-icu", "PrognosticationEthicsIcuTopic"],
  ["/intensive-care/pulmonary-hypertension", "PulmonaryHypertensionTopic"],
  ["/intensive-care/arrhythmias-ecg-icu", "ArrhythmiasEcgIcuTopic"],
  ["/intensive-care/cardiac-arrest-post-resus", "CardiacArrestPostResusTopic"],
  ["/intensive-care/neuroprognostication", "NeuroprognosticationTopic"],
  ["/intensive-care/end-of-life-communication", "EndOfLifeCommunicationTopic"],
  ["/intensive-care/non-technical-skills", "NonTechnicalSkillsTopic"],

  // Anatomy
  ["/anatomy/cardiac-anatomy", "CardiacAnatomyTopic"],
  ["/anatomy/spinal-anatomy", "SpinalAnatomyTopic"],
  ["/anatomy/brachial-plexus", "BrachialPlexusTopic"],
  ["/anatomy/upper-limb-anatomy", "UpperLimbAnatomyTopic"],
  ["/anatomy/thoracic-anatomy", "ThoracicAnatomyTopic"],
  ["/anatomy/abdominal-anatomy", "AbdominalAnatomyTopic"],
  ["/anatomy/head-neck-anatomy", "HeadNeckAnatomyTopic"],
  ["/anatomy/neuroanatomy", "NeuroanatomyTopic"],
  ["/anatomy/lower-limb-anatomy", "LowerLimbAnatomyTopic"],

  // Chemistry
  ["/chemistry/atomic-structure-bonding", "AtomicStructureBondingTopic"],
  ["/chemistry/acids-bases-buffers", "AcidsBasesBuffersTopic"],
  ["/chemistry/organic-chemistry", "OrganicChemistryTopic"],
  ["/chemistry/solutions-concentration", "SolutionsConcentrationTopic"],
  ["/chemistry/oxidation-reduction", "OxidationReductionTopic"],
] as const;

/** URL path → redirect target (kept separate so intent is explicit). */
export const TOPIC_REDIRECTS: ReadonlyArray<readonly [string, string]> = [
  ["/clinical/depth-of-anaesthesia", "/physics/depth-of-anaesthesia"],
  ["/anatomy/airway-anatomy", "/anatomy/head-neck-anatomy"],
];

/** Materialised route entries: `{ path, Component }` for direct `<Route>` rendering. */
export const topicRouteEntries = TOPIC_ROUTES.map(([path, moduleName]) => ({
  path,
  Component: loader(moduleName),
}));

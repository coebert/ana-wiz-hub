import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { ExamFilterProvider } from "@/contexts/ExamFilterContext";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { VisitTrackerWrapper } from "@/components/VisitTrackerWrapper";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load section pages
const PhysicsSection = lazy(() => import("./pages/PhysicsSection"));
const PhysiologySection = lazy(() => import("./pages/PhysiologySection"));
const PharmacologySection = lazy(() => import("./pages/PharmacologySection"));
const ClinicalSection = lazy(() => import("./pages/ClinicalSection"));
const IntensiveCareSection = lazy(() => import("./pages/IntensiveCareSection"));
const PerioperativeSection = lazy(() => import("./pages/PerioperativeSection"));
const AnatomySection = lazy(() => import("./pages/AnatomySection"));

// Lazy load topic pages
const GasLawsTopic = lazy(() => import("./pages/topics/GasLawsTopic"));
const PressureMeasurementTopic = lazy(() => import("./pages/topics/PressureMeasurementTopic"));
const FlowMeasurementTopic = lazy(() => import("./pages/topics/FlowMeasurementTopic"));
const VaporizersTopic = lazy(() => import("./pages/topics/VaporizersTopic"));
const ElectricalSafetyTopic = lazy(() => import("./pages/topics/ElectricalSafetyTopic"));
const PulseOximetryTopic = lazy(() => import("./pages/topics/PulseOximetryTopic"));
const ABGAnalyserTopic = lazy(() => import("./pages/topics/ABGAnalyserTopic"));
const TemperatureMeasurementTopic = lazy(() => import("./pages/topics/TemperatureMeasurementTopic"));
const HumidityGasSamplingTopic = lazy(() => import("./pages/topics/HumidityGasSamplingTopic"));
const LaserFibreopticsTopic = lazy(() => import("./pages/topics/LaserFibreopticsTopic"));
const UltrasoundPhysicsTopic = lazy(() => import("./pages/topics/UltrasoundPhysicsTopic"));
const MRIPhysicsTopic = lazy(() => import("./pages/topics/MRIPhysicsTopic"));
const BreathingCircuitsTopic = lazy(() => import("./pages/topics/BreathingCircuitsTopic"));
const AnaestheticMachineTopic = lazy(() => import("./pages/topics/AnaestheticMachineTopic"));
const DefibrillationPacingTopic = lazy(() => import("./pages/topics/DefibrillationPacingTopic"));
const ClinicalMeasurementTopic = lazy(() => import("./pages/topics/ClinicalMeasurementTopic"));
const SIUnitsThermodynamicsTopic = lazy(() => import("./pages/topics/SIUnitsThermodynamicsTopic"));
const OpticsLightTopic = lazy(() => import("./pages/topics/OpticsLightTopic"));
const ElectricityMagnetismTopic = lazy(() => import("./pages/topics/ElectricityMagnetismTopic"));
const StatisticsEBMTopic = lazy(() => import("./pages/topics/StatisticsEBMTopic"));
const VentilatorsTopic = lazy(() => import("./pages/topics/VentilatorsTopic"));
const MathConceptsTopic = lazy(() => import("./pages/topics/MathConceptsTopic"));
const DepthOfAnaesthesiaMonitoringTopic = lazy(() => import("./pages/topics/DepthOfAnaesthesiaMonitoringTopic"));
const OxygenHaemoglobinTopic = lazy(() => import("./pages/topics/OxygenHaemoglobinTopic"));
const CardiacCycleTopic = lazy(() => import("./pages/topics/CardiacCycleTopic"));
const LungMechanicsTopic = lazy(() => import("./pages/topics/LungMechanicsTopic"));
const RenalPhysiologyTopic = lazy(() => import("./pages/topics/RenalPhysiologyTopic"));
const NeuromuscularTopic = lazy(() => import("./pages/topics/NeuromuscularTopic"));
const AutonomicNervousTopic = lazy(() => import("./pages/topics/AutonomicNervousTopic"));
const MaternalPhysiologyTopic = lazy(() => import("./pages/topics/MaternalPhysiologyTopic"));
const FoetalCirculationTopic = lazy(() => import("./pages/topics/FoetalCirculationTopic"));
const HepaticPhysiologyTopic = lazy(() => import("./pages/topics/HepaticPhysiologyTopic"));
const StarlingForcesTopic = lazy(() => import("./pages/topics/StarlingForcesTopic"));
const GastrointestinalPhysiologyTopic = lazy(() => import("./pages/topics/GastrointestinalPhysiologyTopic"));
const CardiacElectrophysiologyTopic = lazy(() => import("./pages/topics/CardiacElectrophysiologyTopic"));
const VentilationPerfusionTopic = lazy(() => import("./pages/topics/VentilationPerfusionTopic"));
const EndocrinePhysiologyTopic = lazy(() => import("./pages/topics/EndocrinePhysiologyTopic"));
const HaematologyImmunityTopic = lazy(() => import("./pages/topics/HaematologyImmunityTopic"));
const PharmacokineticsTopic = lazy(() => import("./pages/topics/PharmacokineticsTopic"));
const IVAnaestheticsTopic = lazy(() => import("./pages/topics/IVAnaestheticsTopic"));
const VolatileAgentsTopic = lazy(() => import("./pages/topics/VolatileAgentsTopic"));
const OpioidsTopic = lazy(() => import("./pages/topics/OpioidsTopic"));
const MuscleRelaxantsTopic = lazy(() => import("./pages/topics/MuscleRelaxantsTopic"));
const LocalAnaestheticsTopic = lazy(() => import("./pages/topics/LocalAnaestheticsTopic"));
const VasoactiveAgentsTopic = lazy(() => import("./pages/topics/VasoactiveAgentsTopic"));
const AntimicrobialsPharmTopic = lazy(() => import("./pages/topics/AntimicrobialsPharmTopic"));
const AntiarrhythmicsTopic = lazy(() => import("./pages/topics/AntiarrhythmicsTopic"));
const AnticoagulantsTopic = lazy(() => import("./pages/topics/AnticoagulantsTopic"));
const PharmacodynamicsTopic = lazy(() => import("./pages/topics/PharmacodynamicsTopic"));
const NSAIDsParacetamolTopic = lazy(() => import("./pages/topics/NSAIDsParacetamolTopic"));
const AntiemeticsTopic = lazy(() => import("./pages/topics/AntiemeticsTopic"));
const CorticosteroidsTopic = lazy(() => import("./pages/topics/CorticosteroidsTopic"));
const AirwayManagementTopic = lazy(() => import("./pages/topics/AirwayManagementTopic"));
const RegionalAnaesthesiaTopic = lazy(() => import("./pages/topics/RegionalAnaesthesiaTopic"));
const ObstetricAnaesthesiaTopic = lazy(() => import("./pages/topics/ObstetricAnaesthesiaTopic"));
const PaediatricAnaesthesiaTopic = lazy(() => import("./pages/topics/PaediatricAnaesthesiaTopic"));
const NeuroanaesthesiaTopic = lazy(() => import("./pages/topics/NeuroanaesthesiaTopic"));
const CardiothoracicTopic = lazy(() => import("./pages/topics/CardiothoracicTopic"));
const TraumaEmergencyTopic = lazy(() => import("./pages/topics/TraumaEmergencyTopic"));
const ClinicalIncidentsTopic = lazy(() => import("./pages/topics/ClinicalIncidentsTopic"));
const PainMedicineTopic = lazy(() => import("./pages/topics/PainMedicineTopic"));
const TIVATopic = lazy(() => import("./pages/topics/TIVATopic"));
const OrthopaedicAnaesthesiaTopic = lazy(() => import("./pages/topics/OrthopaedicAnaesthesiaTopic"));
const OphthalmicAnaesthesiaTopic = lazy(() => import("./pages/topics/OphthalmicAnaesthesiaTopic"));
const DaySurgeryTopic = lazy(() => import("./pages/topics/DaySurgeryTopic"));
const TransferMedicineTopic = lazy(() => import("./pages/topics/TransferMedicineTopic"));
const BariatricAnaesthesiaTopic = lazy(() => import("./pages/topics/BariatricAnaesthesiaTopic"));
const VascularAnaesthesiaTopic = lazy(() => import("./pages/topics/VascularAnaesthesiaTopic"));
const ENTAnaesthesiaTopic = lazy(() => import("./pages/topics/ENTAnaesthesiaTopic"));
const BurnsPlasticsTopic = lazy(() => import("./pages/topics/BurnsPlasticsTopic"));
const SepsisTopic = lazy(() => import("./pages/topics/SepsisTopic"));
const MechanicalVentilationTopic = lazy(() => import("./pages/topics/MechanicalVentilationTopic"));
const CirculatoryFailureTopic = lazy(() => import("./pages/topics/CirculatoryFailureTopic"));
const AkiRrtTopic = lazy(() => import("./pages/topics/AkiRrtTopic"));
const AcuteLiverFailureTopic = lazy(() => import("./pages/topics/AcuteLiverFailureTopic"));
const NeurointensiveCareTopic = lazy(() => import("./pages/topics/NeurointensiveCareTopic"));
const CardiacOutputMonitoringTopic = lazy(() => import("./pages/topics/CardiacOutputMonitoringTopic"));
const AcidBaseTopic = lazy(() => import("./pages/topics/AcidBaseTopic"));
const ARDSTopic = lazy(() => import("./pages/topics/ARDSTopic"));
const IcuNutritionTopic = lazy(() => import("./pages/topics/IcuNutritionTopic"));
const TransfusionCoagulationTopic = lazy(() => import("./pages/topics/TransfusionCoagulationTopic"));
const IcuSedationDeliriumTopic = lazy(() => import("./pages/topics/IcuSedationDeliriumTopic"));
const OrganDonationTopic = lazy(() => import("./pages/topics/OrganDonationTopic"));
const AntimicrobialsIcuTopic = lazy(() => import("./pages/topics/AntimicrobialsIcuTopic"));
const PaediatricIcuTopic = lazy(() => import("./pages/topics/PaediatricIcuTopic"));
const HaematologyIcuTopic = lazy(() => import("./pages/topics/HaematologyIcuTopic"));
const ECMOTopic = lazy(() => import("./pages/topics/ECMOTopic"));
const ToxicologyTopic = lazy(() => import("./pages/topics/ToxicologyTopic"));
const PreoperativeAssessmentTopic = lazy(() => import("./pages/topics/PreoperativeAssessmentTopic"));
const EnhancedRecoveryTopic = lazy(() => import("./pages/topics/EnhancedRecoveryTopic"));
const PerioperativeFluidsTopic = lazy(() => import("./pages/topics/PerioperativeFluidsTopic"));
const AirwayAnatomyTopic = lazy(() => import("./pages/topics/AirwayAnatomyTopic"));
const CardiacAnatomyTopic = lazy(() => import("./pages/topics/CardiacAnatomyTopic"));
const SpinalAnatomyTopic = lazy(() => import("./pages/topics/SpinalAnatomyTopic"));
const BrachialPlexusTopic = lazy(() => import("./pages/topics/BrachialPlexusTopic"));
const ThoracicAnatomyTopic = lazy(() => import("./pages/topics/ThoracicAnatomyTopic"));
const AbdominalAnatomyTopic = lazy(() => import("./pages/topics/AbdominalAnatomyTopic"));
const HeadNeckAnatomyTopic = lazy(() => import("./pages/topics/HeadNeckAnatomyTopic"));
const NeuroanatomyTopic = lazy(() => import("./pages/topics/NeuroanatomyTopic"));
const LowerLimbAnatomyTopic = lazy(() => import("./pages/topics/LowerLimbAnatomyTopic"));
const EquipmentMonitoringTopic = lazy(() => import("./pages/topics/EquipmentMonitoringTopic"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProgressProvider>
    <ExamFilterProvider>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <VisitTrackerWrapper>
        <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/physics" element={<PhysicsSection />} />
          <Route path="/physiology" element={<PhysiologySection />} />
          <Route path="/pharmacology" element={<PharmacologySection />} />
          <Route path="/clinical" element={<ClinicalSection />} />
          <Route path="/intensive-care" element={<IntensiveCareSection />} />
          <Route path="/perioperative" element={<PerioperativeSection />} />
          <Route path="/anatomy" element={<AnatomySection />} />
          {/* Physics */}
          <Route path="/physics/gas-laws" element={<GasLawsTopic />} />
          <Route path="/physics/pressure-measurement" element={<PressureMeasurementTopic />} />
          <Route path="/physics/flow-measurement" element={<FlowMeasurementTopic />} />
          <Route path="/physics/vaporizers" element={<VaporizersTopic />} />
          <Route path="/physics/electrical-safety" element={<ElectricalSafetyTopic />} />
          <Route path="/physics/pulse-oximetry" element={<PulseOximetryTopic />} />
          <Route path="/physics/abg-analyser" element={<ABGAnalyserTopic />} />
          <Route path="/physics/temperature-measurement" element={<TemperatureMeasurementTopic />} />
          <Route path="/physics/humidity-gas-sampling" element={<HumidityGasSamplingTopic />} />
          <Route path="/physics/lasers-fibreoptics" element={<LaserFibreopticsTopic />} />
          <Route path="/physics/ultrasound-physics" element={<UltrasoundPhysicsTopic />} />
          <Route path="/physics/mri-physics" element={<MRIPhysicsTopic />} />
          <Route path="/physics/breathing-circuits" element={<BreathingCircuitsTopic />} />
          <Route path="/physics/anaesthetic-machine" element={<AnaestheticMachineTopic />} />
          <Route path="/physics/defibrillation-pacing" element={<DefibrillationPacingTopic />} />
          <Route path="/physics/clinical-measurement" element={<ClinicalMeasurementTopic />} />
          <Route path="/physics/si-units-thermodynamics" element={<SIUnitsThermodynamicsTopic />} />
          <Route path="/physics/optics-light" element={<OpticsLightTopic />} />
          <Route path="/physics/electricity-magnetism" element={<ElectricityMagnetismTopic />} />
          <Route path="/physics/statistics-ebm" element={<StatisticsEBMTopic />} />
          <Route path="/physics/ventilators" element={<VentilatorsTopic />} />
          <Route path="/physics/math-concepts" element={<MathConceptsTopic />} />
          <Route path="/physics/depth-of-anaesthesia" element={<DepthOfAnaesthesiaMonitoringTopic />} />
          <Route path="/physics/equipment-monitoring" element={<EquipmentMonitoringTopic />} />
          {/* Physiology */}
          <Route path="/physiology/oxygen-haemoglobin" element={<OxygenHaemoglobinTopic />} />
          <Route path="/physiology/cardiac-cycle" element={<CardiacCycleTopic />} />
          <Route path="/physiology/lung-mechanics" element={<LungMechanicsTopic />} />
          <Route path="/physiology/renal-physiology" element={<RenalPhysiologyTopic />} />
          <Route path="/physiology/neuromuscular" element={<NeuromuscularTopic />} />
          <Route path="/physiology/autonomic-nervous" element={<AutonomicNervousTopic />} />
          <Route path="/physiology/maternal-physiology" element={<MaternalPhysiologyTopic />} />
          <Route path="/physiology/foetal-circulation" element={<FoetalCirculationTopic />} />
          <Route path="/physiology/hepatic-physiology" element={<HepaticPhysiologyTopic />} />
          <Route path="/physiology/starling-forces" element={<StarlingForcesTopic />} />
          <Route path="/physiology/gi-physiology" element={<GastrointestinalPhysiologyTopic />} />
          <Route path="/physiology/cardiac-electrophysiology" element={<CardiacElectrophysiologyTopic />} />
          <Route path="/physiology/ventilation-perfusion" element={<VentilationPerfusionTopic />} />
          <Route path="/physiology/endocrine-physiology" element={<EndocrinePhysiologyTopic />} />
          <Route path="/physiology/haematology-immunity" element={<HaematologyImmunityTopic />} />
          {/* Pharmacology */}
          <Route path="/pharmacology/pharmacokinetics" element={<PharmacokineticsTopic />} />
          <Route path="/pharmacology/iv-anaesthetics" element={<IVAnaestheticsTopic />} />
          <Route path="/pharmacology/volatile-agents" element={<VolatileAgentsTopic />} />
          <Route path="/pharmacology/opioids" element={<OpioidsTopic />} />
          <Route path="/pharmacology/muscle-relaxants" element={<MuscleRelaxantsTopic />} />
          <Route path="/pharmacology/local-anaesthetics" element={<LocalAnaestheticsTopic />} />
          <Route path="/pharmacology/vasoactive-agents" element={<VasoactiveAgentsTopic />} />
          <Route path="/pharmacology/antimicrobials-pharm" element={<AntimicrobialsPharmTopic />} />
          <Route path="/pharmacology/antiarrhythmics" element={<AntiarrhythmicsTopic />} />
          <Route path="/pharmacology/anticoagulants" element={<AnticoagulantsTopic />} />
          <Route path="/pharmacology/pharmacodynamics" element={<PharmacodynamicsTopic />} />
          <Route path="/pharmacology/nsaids-paracetamol" element={<NSAIDsParacetamolTopic />} />
          <Route path="/pharmacology/antiemetics" element={<AntiemeticsTopic />} />
          <Route path="/pharmacology/corticosteroids" element={<CorticosteroidsTopic />} />
          {/* Clinical Anaesthesia */}
          <Route path="/clinical/airway-management" element={<AirwayManagementTopic />} />
          <Route path="/clinical/regional-anaesthesia" element={<RegionalAnaesthesiaTopic />} />
          <Route path="/clinical/obstetric-anaesthesia" element={<ObstetricAnaesthesiaTopic />} />
          <Route path="/clinical/paediatric-anaesthesia" element={<PaediatricAnaesthesiaTopic />} />
          <Route path="/clinical/neuroanaesthesia" element={<NeuroanaesthesiaTopic />} />
          <Route path="/clinical/cardiothoracic" element={<CardiothoracicTopic />} />
          <Route path="/clinical/trauma-emergency" element={<TraumaEmergencyTopic />} />
          <Route path="/clinical/clinical-incidents" element={<ClinicalIncidentsTopic />} />
          <Route path="/clinical/pain-medicine" element={<PainMedicineTopic />} />
          <Route path="/clinical/tiva" element={<TIVATopic />} />
          <Route path="/clinical/orthopaedic-anaesthesia" element={<OrthopaedicAnaesthesiaTopic />} />
          <Route path="/clinical/ophthalmic-anaesthesia" element={<OphthalmicAnaesthesiaTopic />} />
          <Route path="/clinical/day-surgery" element={<DaySurgeryTopic />} />
          <Route path="/clinical/transfer-medicine" element={<TransferMedicineTopic />} />
          <Route path="/clinical/bariatric-anaesthesia" element={<BariatricAnaesthesiaTopic />} />
          <Route path="/clinical/vascular-anaesthesia" element={<VascularAnaesthesiaTopic />} />
          <Route path="/clinical/ent-anaesthesia" element={<ENTAnaesthesiaTopic />} />
          <Route path="/clinical/burns-plastics" element={<BurnsPlasticsTopic />} />
          {/* Intensive Care */}
          <Route path="/intensive-care/sepsis" element={<SepsisTopic />} />
          <Route path="/intensive-care/mechanical-ventilation" element={<MechanicalVentilationTopic />} />
          <Route path="/intensive-care/circulatory-failure" element={<CirculatoryFailureTopic />} />
          <Route path="/intensive-care/aki-rrt" element={<AkiRrtTopic />} />
          <Route path="/intensive-care/acute-liver-failure" element={<AcuteLiverFailureTopic />} />
          <Route path="/intensive-care/neurointensive-care" element={<NeurointensiveCareTopic />} />
          <Route path="/intensive-care/cardiac-output-monitoring" element={<CardiacOutputMonitoringTopic />} />
          <Route path="/intensive-care/acid-base" element={<AcidBaseTopic />} />
          <Route path="/intensive-care/ards" element={<ARDSTopic />} />
          <Route path="/intensive-care/icu-nutrition" element={<IcuNutritionTopic />} />
          <Route path="/intensive-care/transfusion-coagulation" element={<TransfusionCoagulationTopic />} />
          <Route path="/intensive-care/icu-sedation-delirium" element={<IcuSedationDeliriumTopic />} />
          <Route path="/intensive-care/organ-donation" element={<OrganDonationTopic />} />
          <Route path="/intensive-care/antimicrobials-icu" element={<AntimicrobialsIcuTopic />} />
          <Route path="/intensive-care/paediatric-icu" element={<PaediatricIcuTopic />} />
          <Route path="/intensive-care/haematology-icu" element={<HaematologyIcuTopic />} />
          <Route path="/intensive-care/ecmo" element={<ECMOTopic />} />
          <Route path="/intensive-care/toxicology" element={<ToxicologyTopic />} />
          {/* Perioperative */}
          <Route path="/perioperative/preoperative-assessment" element={<PreoperativeAssessmentTopic />} />
          <Route path="/perioperative/enhanced-recovery" element={<EnhancedRecoveryTopic />} />
          <Route path="/perioperative/perioperative-fluids" element={<PerioperativeFluidsTopic />} />
          {/* Anatomy */}
          <Route path="/anatomy/airway-anatomy" element={<AirwayAnatomyTopic />} />
          <Route path="/anatomy/cardiac-anatomy" element={<CardiacAnatomyTopic />} />
          <Route path="/anatomy/spinal-anatomy" element={<SpinalAnatomyTopic />} />
          <Route path="/anatomy/brachial-plexus" element={<BrachialPlexusTopic />} />
          <Route path="/anatomy/thoracic-anatomy" element={<ThoracicAnatomyTopic />} />
          <Route path="/anatomy/abdominal-anatomy" element={<AbdominalAnatomyTopic />} />
          <Route path="/anatomy/head-neck-anatomy" element={<HeadNeckAnatomyTopic />} />
          <Route path="/anatomy/neuroanatomy" element={<NeuroanatomyTopic />} />
          <Route path="/anatomy/lower-limb-anatomy" element={<LowerLimbAnatomyTopic />} />
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        </VisitTrackerWrapper>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
    </ExamFilterProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;

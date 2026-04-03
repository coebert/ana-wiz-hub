import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { ExamFilterProvider } from "@/contexts/ExamFilterContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PhysicsSection from "./pages/PhysicsSection";
import PhysiologySection from "./pages/PhysiologySection";
import PharmacologySection from "./pages/PharmacologySection";
import ClinicalSection from "./pages/ClinicalSection";
import IntensiveCareSection from "./pages/IntensiveCareSection";
import PerioperativeSection from "./pages/PerioperativeSection";
import AnatomySection from "./pages/AnatomySection";
import GasLawsTopic from "./pages/topics/GasLawsTopic";
import PressureMeasurementTopic from "./pages/topics/PressureMeasurementTopic";
import FlowMeasurementTopic from "./pages/topics/FlowMeasurementTopic";
import VaporizersTopic from "./pages/topics/VaporizersTopic";
import ElectricalSafetyTopic from "./pages/topics/ElectricalSafetyTopic";
import PulseOximetryTopic from "./pages/topics/PulseOximetryTopic";
import ABGAnalyserTopic from "./pages/topics/ABGAnalyserTopic";
import TemperatureMeasurementTopic from "./pages/topics/TemperatureMeasurementTopic";
import HumidityGasSamplingTopic from "./pages/topics/HumidityGasSamplingTopic";
import LaserFibreopticsTopic from "./pages/topics/LaserFibreopticsTopic";
import OxygenHaemoglobinTopic from "./pages/topics/OxygenHaemoglobinTopic";
import CardiacCycleTopic from "./pages/topics/CardiacCycleTopic";
import LungMechanicsTopic from "./pages/topics/LungMechanicsTopic";
import RenalPhysiologyTopic from "./pages/topics/RenalPhysiologyTopic";
import NeuromuscularTopic from "./pages/topics/NeuromuscularTopic";
import AutonomicNervousTopic from "./pages/topics/AutonomicNervousTopic";
import PharmacokineticsTopic from "./pages/topics/PharmacokineticsTopic";
import IVAnaestheticsTopic from "./pages/topics/IVAnaestheticsTopic";
import VolatileAgentsTopic from "./pages/topics/VolatileAgentsTopic";
import OpioidsTopic from "./pages/topics/OpioidsTopic";
import MuscleRelaxantsTopic from "./pages/topics/MuscleRelaxantsTopic";
import LocalAnaestheticsTopic from "./pages/topics/LocalAnaestheticsTopic";
import AirwayManagementTopic from "./pages/topics/AirwayManagementTopic";
import RegionalAnaesthesiaTopic from "./pages/topics/RegionalAnaesthesiaTopic";
import ObstetricAnaesthesiaTopic from "./pages/topics/ObstetricAnaesthesiaTopic";
import PaediatricAnaesthesiaTopic from "./pages/topics/PaediatricAnaesthesiaTopic";
import NeuroanaesthesiaTopic from "./pages/topics/NeuroanaesthesiaTopic";
import CardiothoracicTopic from "./pages/topics/CardiothoracicTopic";
import TraumaEmergencyTopic from "./pages/topics/TraumaEmergencyTopic";
import ClinicalIncidentsTopic from "./pages/topics/ClinicalIncidentsTopic";
import PainMedicineTopic from "./pages/topics/PainMedicineTopic";
import SepsisTopic from "./pages/topics/SepsisTopic";
import MechanicalVentilationTopic from "./pages/topics/MechanicalVentilationTopic";
import CirculatoryFailureTopic from "./pages/topics/CirculatoryFailureTopic";
import AkiRrtTopic from "./pages/topics/AkiRrtTopic";
import AcuteLiverFailureTopic from "./pages/topics/AcuteLiverFailureTopic";
import NeurointensiveCareTopic from "./pages/topics/NeurointensiveCareTopic";
import CardiacOutputMonitoringTopic from "./pages/topics/CardiacOutputMonitoringTopic";
import AcidBaseTopic from "./pages/topics/AcidBaseTopic";
import ARDSTopic from "./pages/topics/ARDSTopic";
import IcuNutritionTopic from "./pages/topics/IcuNutritionTopic";
import TransfusionCoagulationTopic from "./pages/topics/TransfusionCoagulationTopic";
import IcuSedationDeliriumTopic from "./pages/topics/IcuSedationDeliriumTopic";
import OrganDonationTopic from "./pages/topics/OrganDonationTopic";
import AntimicrobialsIcuTopic from "./pages/topics/AntimicrobialsIcuTopic";
import PreoperativeAssessmentTopic from "./pages/topics/PreoperativeAssessmentTopic";
import EnhancedRecoveryTopic from "./pages/topics/EnhancedRecoveryTopic";
import PerioperativeFluidsTopic from "./pages/topics/PerioperativeFluidsTopic";
import AirwayAnatomyTopic from "./pages/topics/AirwayAnatomyTopic";
import CardiacAnatomyTopic from "./pages/topics/CardiacAnatomyTopic";
import SpinalAnatomyTopic from "./pages/topics/SpinalAnatomyTopic";
import BrachialPlexusTopic from "./pages/topics/BrachialPlexusTopic";
import ThoracicAnatomyTopic from "./pages/topics/ThoracicAnatomyTopic";
import AbdominalAnatomyTopic from "./pages/topics/AbdominalAnatomyTopic";
import HeadNeckAnatomyTopic from "./pages/topics/HeadNeckAnatomyTopic";
import NeuroanatomyTopic from "./pages/topics/NeuroanatomyTopic";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProgressProvider>
    <ExamFilterProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
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
          {/* Physiology */}
          <Route path="/physiology/oxygen-haemoglobin" element={<OxygenHaemoglobinTopic />} />
          <Route path="/physiology/cardiac-cycle" element={<CardiacCycleTopic />} />
          <Route path="/physiology/lung-mechanics" element={<LungMechanicsTopic />} />
          <Route path="/physiology/renal-physiology" element={<RenalPhysiologyTopic />} />
          <Route path="/physiology/neuromuscular" element={<NeuromuscularTopic />} />
          <Route path="/physiology/autonomic-nervous" element={<AutonomicNervousTopic />} />
          {/* Pharmacology */}
          <Route path="/pharmacology/pharmacokinetics" element={<PharmacokineticsTopic />} />
          <Route path="/pharmacology/iv-anaesthetics" element={<IVAnaestheticsTopic />} />
          <Route path="/pharmacology/volatile-agents" element={<VolatileAgentsTopic />} />
          <Route path="/pharmacology/opioids" element={<OpioidsTopic />} />
          <Route path="/pharmacology/muscle-relaxants" element={<MuscleRelaxantsTopic />} />
          <Route path="/pharmacology/local-anaesthetics" element={<LocalAnaestheticsTopic />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ExamFilterProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;

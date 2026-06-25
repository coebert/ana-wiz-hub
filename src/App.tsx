import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { ExamFilterProvider } from "@/contexts/ExamFilterContext";
import { MotionPreferenceProvider } from "@/contexts/MotionPreferenceContext";
import { UnitPreferenceProvider } from "@/contexts/UnitPreferenceContext";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { UpdateBanner } from "@/components/UpdateBanner";
import { CascadePerfBadge } from "@/components/diagrams/_dev/CascadePerfBadge";
import { VisitTrackerWrapper } from "@/components/VisitTrackerWrapper";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ContentAudit from "./pages/ContentAudit";
const AuditDashboard = lazy(() => import("./pages/AuditDashboard"));
const AuditReport = lazy(() => import("./pages/AuditReport"));
// Standalone ESICM validator + formulary tab are now unified into Content Audit
// at /admin/audit. The legacy route below redirects there for back-compat.
const TopicMap = lazy(() => import("./pages/TopicMap"));
const ProgressTracker = lazy(() => import("./pages/ProgressTracker"));
const PodcastsLibrary = lazy(() => import("./pages/PodcastsLibrary"));
const GlossaryAudit = lazy(() => import("./pages/GlossaryAudit"));
const VivaHub = lazy(() => import("./pages/VivaHub"));
const VivaQuestionLibrary = lazy(() => import("./pages/VivaQuestionLibrary"));
const CoverageBarsResponsiveTest = lazy(() => import("./pages/CoverageBarsResponsiveTest"));
const DrugsLibrary = lazy(() => import("./pages/DrugsLibrary"));
const DrugDetail = lazy(() => import("./pages/DrugDetail"));
const SeoIndexing = lazy(() => import("./pages/SeoIndexing"));
const A11yAudit = lazy(() => import("./pages/A11yAudit"));
const Curriculum = lazy(() => import("./pages/Curriculum"));
const DiagramSnapshot = lazy(() => import("./pages/DiagramSnapshot"));
const Errata = lazy(() => import("./pages/Errata"));
const Trust = lazy(() => import("./pages/Trust"));
const Login = lazy(() => import("./pages/Login"));
const Review = lazy(() => import("./pages/Review"));
const VoiceViva = lazy(() => import("./pages/VoiceViva"));
const ToolsHub = lazy(() => import("./pages/ToolsHub"));
const MACForAgeTool = lazy(() => import("./pages/tools/MACForAgeTool"));
const PaedDoseTool = lazy(() => import("./pages/tools/PaedDoseTool"));
const MaintenanceFluidTool = lazy(() => import("./pages/tools/MaintenanceFluidTool"));
const MaxLADoseTool = lazy(() => import("./pages/tools/MaxLADoseTool"));
const ABGInterpreterTool = lazy(() => import("./pages/tools/ABGInterpreterTool"));
const AskAi = lazy(() => import("./pages/AskAi"));

// Long-form SEO notes
const NotesIndex = lazy(() => import("./pages/notes/NotesIndex"));
const FRCAPrimaryHub = lazy(() => import("./pages/FRCAPrimaryHub"));
const FRCAFinalHub = lazy(() => import("./pages/FRCAFinalHub"));
const FFICMHub = lazy(() => import("./pages/FFICMHub"));
const SugammadexReversesRocuroniumNote = lazy(() => import("./pages/notes/SugammadexReversesRocuroniumNote"));
const ContextSensitiveHalfTimeNote = lazy(() => import("./pages/notes/ContextSensitiveHalfTimeNote"));
const P50FetalHaemoglobinNote = lazy(() => import("./pages/notes/P50FetalHaemoglobinNote"));
const MacForAgeNote = lazy(() => import("./pages/notes/MacForAgeNote"));
const ApfelScoreNote = lazy(() => import("./pages/notes/ApfelScoreNote"));
const MaplesonBreathingSystemsNote = lazy(() => import("./pages/notes/MaplesonBreathingSystemsNote"));
const DasDifficultAirwayNote = lazy(() => import("./pages/notes/DasDifficultAirwayNote"));
const LocalAnaestheticToxicityNote = lazy(() => import("./pages/notes/LocalAnaestheticToxicityNote"));
const TofRatioExtubationNote = lazy(() => import("./pages/notes/TofRatioExtubationNote"));
const SevoVsDesfluraneNote = lazy(() => import("./pages/notes/SevoVsDesfluraneNote"));
const BainCircuitNote = lazy(() => import("./pages/notes/BainCircuitNote"));
const RotemTegInterpretationNote = lazy(() => import("./pages/notes/RotemTegInterpretationNote"));
const RapidSequenceInductionNote = lazy(() => import("./pages/notes/RapidSequenceInductionNote"));


// Lazy load section pages
const PhysicsSection = lazy(() => import("./pages/PhysicsSection"));
const PhysiologySection = lazy(() => import("./pages/PhysiologySection"));
const PharmacologySection = lazy(() => import("./pages/PharmacologySection"));
const ClinicalSection = lazy(() => import("./pages/ClinicalSection"));
const IntensiveCareSection = lazy(() => import("./pages/IntensiveCareSection"));
const PerioperativeSection = lazy(() => import("./pages/PerioperativeSection"));
const AnatomySection = lazy(() => import("./pages/AnatomySection"));
const ChemistrySection = lazy(() => import("./pages/ChemistrySection"));

// Lazy load topic pages
const GasLawsTopic = lazy(() => import("./pages/topics/GasLawsTopic"));
const PressureMeasurementTopic = lazy(() => import("./pages/topics/PressureMeasurementTopic"));
const FlowMeasurementTopic = lazy(() => import("./pages/topics/FlowMeasurementTopic"));

const ElectricalSafetyTopic = lazy(() => import("./pages/topics/ElectricalSafetyTopic"));
const PulseOximetryTopic = lazy(() => import("./pages/topics/PulseOximetryTopic"));
const ABGAnalyserTopic = lazy(() => import("./pages/topics/ABGAnalyserTopic"));
const TemperatureMeasurementTopic = lazy(() => import("./pages/topics/TemperatureMeasurementTopic"));
const HumidityGasSamplingTopic = lazy(() => import("./pages/topics/HumidityGasSamplingTopic"));
const LaserFibreopticsTopic = lazy(() => import("./pages/topics/LaserFibreopticsTopic"));
const UltrasoundPhysicsTopic = lazy(() => import("./pages/topics/UltrasoundPhysicsTopic"));
const MRIPhysicsTopic = lazy(() => import("./pages/topics/MRIPhysicsTopic"));
const XRayRadiationSafetyTopic = lazy(() => import("./pages/topics/XRayRadiationSafetyTopic"));
const DefibrillationPacingTopic = lazy(() => import("./pages/topics/DefibrillationPacingTopic"));
const ClinicalMeasurementTopic = lazy(() => import("./pages/topics/ClinicalMeasurementTopic"));
const SIUnitsThermodynamicsTopic = lazy(() => import("./pages/topics/SIUnitsThermodynamicsTopic"));
const OpticsLightTopic = lazy(() => import("./pages/topics/OpticsLightTopic"));
const ElectricityMagnetismTopic = lazy(() => import("./pages/topics/ElectricityMagnetismTopic"));
const StatisticsEBMTopic = lazy(() => import("./pages/topics/StatisticsEBMTopic"));

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
const RocuroniumTopic = lazy(() => import("./pages/topics/RocuroniumTopic"));
const SuxVsRocComparisonTopic = lazy(() => import("./pages/topics/SuxVsRocComparisonTopic"));
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
const ResourcePoorAnaesthesiaTopic = lazy(() => import("./pages/topics/ResourcePoorAnaesthesiaTopic"));
const MassCasualtyMilitaryTopic = lazy(() => import("./pages/topics/MassCasualtyMilitaryTopic"));
const PainMedicineTopic = lazy(() => import("./pages/topics/PainMedicineTopic"));
const TIVATopic = lazy(() => import("./pages/topics/TIVATopic"));
const OrthopaedicAnaesthesiaTopic = lazy(() => import("./pages/topics/OrthopaedicAnaesthesiaTopic"));
const OphthalmicAnaesthesiaTopic = lazy(() => import("./pages/topics/OphthalmicAnaesthesiaTopic"));
const DaySurgeryTopic = lazy(() => import("./pages/topics/DaySurgeryTopic"));
const OperatingTheatreEnvironmentTopic = lazy(() => import("./pages/topics/OperatingTheatreEnvironmentTopic"));
const ProceduralSedationTopic = lazy(() => import("./pages/topics/ProceduralSedationTopic"));
const TransferMedicineTopic = lazy(() => import("./pages/topics/TransferMedicineTopic"));
const BariatricAnaesthesiaTopic = lazy(() => import("./pages/topics/BariatricAnaesthesiaTopic"));
const VascularAnaesthesiaTopic = lazy(() => import("./pages/topics/VascularAnaesthesiaTopic"));
const ENTAnaesthesiaTopic = lazy(() => import("./pages/topics/ENTAnaesthesiaTopic"));
const BurnsPlasticsTopic = lazy(() => import("./pages/topics/BurnsPlasticsTopic"));
const EmergencySurgeryTopic = lazy(() => import("./pages/topics/EmergencySurgeryTopic"));
const PatientPositioningTopic = lazy(() => import("./pages/topics/PatientPositioningTopic"));
const UrologicalAnaesthesiaTopic = lazy(() => import("./pages/topics/UrologicalAnaesthesiaTopic"));
const GynaecologicalAnaesthesiaTopic = lazy(() => import("./pages/topics/GynaecologicalAnaesthesiaTopic"));
const HepatobiliaryTransplantTopic = lazy(() => import("./pages/topics/HepatobiliaryTransplantTopic"));
const PlasticSurgeryTopic = lazy(() => import("./pages/topics/PlasticSurgeryTopic"));
const InterventionalRadiologyTopic = lazy(() => import("./pages/topics/InterventionalRadiologyTopic"));
const ElderlyAnaesthesiaTopic = lazy(() => import("./pages/topics/ElderlyAnaesthesiaTopic"));
const CardiovascularDiseaseTopic = lazy(() => import("./pages/topics/CardiovascularDiseaseTopic"));
const RespiratoryDiseaseTopic = lazy(() => import("./pages/topics/RespiratoryDiseaseTopic"));
const EndocrineDiseaseTopic = lazy(() => import("./pages/topics/EndocrineDiseaseTopic"));
const NeurologicalDiseaseTopic = lazy(() => import("./pages/topics/NeurologicalDiseaseTopic"));
const HaematologicalDiseaseTopic = lazy(() => import("./pages/topics/HaematologicalDiseaseTopic"));
const HepaticDiseaseTopic = lazy(() => import("./pages/topics/HepaticDiseaseTopic"));
const SepsisTopic = lazy(() => import("./pages/topics/SepsisTopic"));
const MechanicalVentilationTopic = lazy(() => import("./pages/topics/MechanicalVentilationTopic"));
const VentilatorModesTopic = lazy(() => import("./pages/topics/VentilatorModesTopic"));
const CapnographyTopic = lazy(() => import("./pages/topics/CapnographyTopic"));
const CapnographyWaveformsTopic = lazy(() => import("./pages/topics/CapnographyWaveformsTopic"));
const VenturiMaskTopic = lazy(() => import("./pages/topics/VenturiMaskTopic"));
const CirculatoryFailureTopic = lazy(() => import("./pages/topics/CirculatoryFailureTopic"));
const AkiRrtTopic = lazy(() => import("./pages/topics/AkiRrtTopic"));
const AcuteLiverFailureTopic = lazy(() => import("./pages/topics/AcuteLiverFailureTopic"));
const AcutePancreatitisTopic = lazy(() => import("./pages/topics/AcutePancreatitisTopic"));
const AbdominalCompartmentSyndromeTopic = lazy(() => import("./pages/topics/AbdominalCompartmentSyndromeTopic"));
const NeurointensiveCareTopic = lazy(() => import("./pages/topics/NeurointensiveCareTopic"));
const NeuroprognosticationTopic = lazy(() => import("./pages/topics/NeuroprognosticationTopic"));
const EcmoTopic = lazy(() => import("./pages/topics/EcmoTopic"));
const CardiacOutputMonitoringTopic = lazy(() => import("./pages/topics/CardiacOutputMonitoringTopic"));
const AcidBaseTopic = lazy(() => import("./pages/topics/AcidBaseTopic"));
const ARDSTopic = lazy(() => import("./pages/topics/ARDSTopic"));
const IcuNutritionTopic = lazy(() => import("./pages/topics/IcuNutritionTopic"));
const PostopHighRiskIcuTopic = lazy(() => import("./pages/topics/PostopHighRiskIcuTopic"));
const IcuEndocrineEmergenciesTopic = lazy(() => import("./pages/topics/IcuEndocrineEmergenciesTopic"));
const TransfusionCoagulationTopic = lazy(() => import("./pages/topics/TransfusionCoagulationTopic"));
const IcuSedationDeliriumTopic = lazy(() => import("./pages/topics/IcuSedationDeliriumTopic"));
const OrganDonationTopic = lazy(() => import("./pages/topics/OrganDonationTopic"));
const AntimicrobialsIcuTopic = lazy(() => import("./pages/topics/AntimicrobialsIcuTopic"));
const PaediatricIcuTopic = lazy(() => import("./pages/topics/PaediatricIcuTopic"));
const BurnsIcuTopic = lazy(() => import("./pages/topics/BurnsIcuTopic"));
const HaematologyIcuTopic = lazy(() => import("./pages/topics/HaematologyIcuTopic"));

const ToxicologyTopic = lazy(() => import("./pages/topics/ToxicologyTopic"));
const InfectiousDiseaseIcuTopic = lazy(() => import("./pages/topics/InfectiousDiseaseIcuTopic"));
const BronchospasticFailureTopic = lazy(() => import("./pages/topics/BronchospasticFailureTopic"));
const PrognosticationEthicsIcuTopic = lazy(() => import("./pages/topics/PrognosticationEthicsIcuTopic"));
const PulmonaryHypertensionTopic = lazy(() => import("./pages/topics/PulmonaryHypertensionTopic"));
const ArrhythmiasEcgIcuTopic = lazy(() => import("./pages/topics/ArrhythmiasEcgIcuTopic"));
const CardiacArrestPostResusTopic = lazy(() => import("./pages/topics/CardiacArrestPostResusTopic"));
const EndOfLifeCommunicationTopic = lazy(() => import("./pages/topics/EndOfLifeCommunicationTopic"));
const NonTechnicalSkillsTopic = lazy(() => import("./pages/topics/NonTechnicalSkillsTopic"));
const PreoperativeAssessmentTopic = lazy(() => import("./pages/topics/PreoperativeAssessmentTopic"));
const EnhancedRecoveryTopic = lazy(() => import("./pages/topics/EnhancedRecoveryTopic"));
const PerioperativeFluidsTopic = lazy(() => import("./pages/topics/PerioperativeFluidsTopic"));
const VascularAccessDevicesTopic = lazy(() => import("./pages/topics/VascularAccessDevicesTopic"));
const GeneticSyndromesTopic = lazy(() => import("./pages/topics/GeneticSyndromesTopic"));

const CardiacAnatomyTopic = lazy(() => import("./pages/topics/CardiacAnatomyTopic"));
const SpinalAnatomyTopic = lazy(() => import("./pages/topics/SpinalAnatomyTopic"));
const BrachialPlexusTopic = lazy(() => import("./pages/topics/BrachialPlexusTopic"));
const UpperLimbAnatomyTopic = lazy(() => import("./pages/topics/UpperLimbAnatomyTopic"));
const ThoracicAnatomyTopic = lazy(() => import("./pages/topics/ThoracicAnatomyTopic"));
const AbdominalAnatomyTopic = lazy(() => import("./pages/topics/AbdominalAnatomyTopic"));
const HeadNeckAnatomyTopic = lazy(() => import("./pages/topics/HeadNeckAnatomyTopic"));
const NeuroanatomyTopic = lazy(() => import("./pages/topics/NeuroanatomyTopic"));
const LowerLimbAnatomyTopic = lazy(() => import("./pages/topics/LowerLimbAnatomyTopic"));
const EquipmentMonitoringTopic = lazy(() => import("./pages/topics/EquipmentMonitoringTopic"));
const VaporisersTopic = lazy(() => import("./pages/topics/VaporisersTopic"));
const BreathingCircuitsTopic = lazy(() => import("./pages/topics/BreathingCircuitsTopic"));
const AtomicStructureBondingTopic = lazy(() => import("./pages/topics/AtomicStructureBondingTopic"));
const AcidsBasesBuffersTopic = lazy(() => import("./pages/topics/AcidsBasesBuffersTopic"));
const OrganicChemistryTopic = lazy(() => import("./pages/topics/OrganicChemistryTopic"));
const SolutionsConcentrationTopic = lazy(() => import("./pages/topics/SolutionsConcentrationTopic"));
const OxidationReductionTopic = lazy(() => import("./pages/topics/OxidationReductionTopic"));
import { RequireAdmin } from "@/components/RequireAdmin";

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
    <MotionPreferenceProvider>
    <UnitPreferenceProvider>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <BrowserRouter>
        <Header />
        <UpdateBanner />
        <CascadePerfBadge />
        <VisitTrackerWrapper>
        <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ask" element={<AskAi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/review" element={<Review />} />
          <Route path="/revise" element={<Index />} />
          <Route path="/map" element={<TopicMap />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/errata" element={<Errata />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/podcasts" element={<PodcastsLibrary />} />
          <Route path="/glossary-audit" element={<GlossaryAudit />} />
          <Route path="/viva" element={<VivaHub />} />
          <Route path="/viva/library" element={<VivaQuestionLibrary />} />
          <Route path="/viva/voice" element={<VoiceViva />} />
          <Route path="/dev/coverage-bars" element={<CoverageBarsResponsiveTest />} />
          <Route path="/dev/seo-indexing" element={<RequireAdmin><SeoIndexing /></RequireAdmin>} />
          <Route path="/dev/a11y-audit" element={<A11yAudit />} />
          <Route path="/dev/diagram-snapshot" element={<DiagramSnapshot />} />
          <Route path="/dev/diagram-snapshot/:name" element={<DiagramSnapshot />} />
          <Route path="/drugs" element={<DrugsLibrary />} />
          <Route path="/drugs/:slug" element={<DrugDetail />} />
          <Route path="/tools" element={<ToolsHub />} />
          <Route path="/tools/mac-for-age" element={<MACForAgeTool />} />
          <Route path="/tools/paediatric-emergency-doses" element={<PaedDoseTool />} />
          <Route path="/tools/maintenance-fluid" element={<MaintenanceFluidTool />} />
          <Route path="/tools/max-local-anaesthetic-dose" element={<MaxLADoseTool />} />
          <Route path="/tools/abg-interpreter" element={<ABGInterpreterTool />} />
          {/* Exam hub pages — high-intent landing pages for FRCA / FFICM searches */}
          <Route path="/frca-primary" element={<FRCAPrimaryHub />} />
          <Route path="/frca-final" element={<FRCAFinalHub />} />
          <Route path="/fficm" element={<FFICMHub />} />
          {/* Long-form SEO notes */}
          <Route path="/notes" element={<NotesIndex />} />
          <Route path="/notes/how-sugammadex-reverses-rocuronium" element={<SugammadexReversesRocuroniumNote />} />
          <Route path="/notes/context-sensitive-half-time-propofol-vs-remifentanil" element={<ContextSensitiveHalfTimeNote />} />
          <Route path="/notes/p50-fetal-haemoglobin" element={<P50FetalHaemoglobinNote />} />
          <Route path="/notes/mac-for-age-formula" element={<MacForAgeNote />} />
          <Route path="/notes/apfel-score-ponv-risk" element={<ApfelScoreNote />} />
          <Route path="/notes/mapleson-breathing-systems-explained" element={<MaplesonBreathingSystemsNote />} />
          <Route path="/notes/das-difficult-airway-algorithm" element={<DasDifficultAirwayNote />} />
          <Route path="/notes/local-anaesthetic-systemic-toxicity-management" element={<LocalAnaestheticToxicityNote />} />
          <Route path="/notes/tof-ratio-before-extubation" element={<TofRatioExtubationNote />} />
          <Route path="/notes/sevoflurane-vs-desflurane-recovery" element={<SevoVsDesfluraneNote />} />
          <Route path="/notes/bain-circuit-fresh-gas-flow" element={<BainCircuitNote />} />
          <Route path="/notes/rotem-teg-interpretation" element={<RotemTegInterpretationNote />} />
          <Route path="/notes/rapid-sequence-induction-drug-doses" element={<RapidSequenceInductionNote />} />

          <Route path="/physics" element={<PhysicsSection />} />
          <Route path="/physiology" element={<PhysiologySection />} />
          <Route path="/pharmacology" element={<PharmacologySection />} />
          <Route path="/clinical" element={<ClinicalSection />} />
          <Route path="/intensive-care" element={<IntensiveCareSection />} />
          <Route path="/perioperative" element={<PerioperativeSection />} />
          <Route path="/anatomy" element={<AnatomySection />} />
          <Route path="/chemistry" element={<ChemistrySection />} />
          {/* Physics */}
          <Route path="/physics/gas-laws" element={<GasLawsTopic />} />
          <Route path="/physics/pressure-measurement" element={<PressureMeasurementTopic />} />
          <Route path="/physics/flow-measurement" element={<FlowMeasurementTopic />} />
          
          <Route path="/physics/electrical-safety" element={<ElectricalSafetyTopic />} />
          <Route path="/physics/pulse-oximetry" element={<PulseOximetryTopic />} />
          <Route path="/physics/abg-analyser" element={<ABGAnalyserTopic />} />
          <Route path="/physics/temperature-measurement" element={<TemperatureMeasurementTopic />} />
          <Route path="/physics/humidity-gas-sampling" element={<HumidityGasSamplingTopic />} />
          <Route path="/physics/lasers-fibreoptics" element={<LaserFibreopticsTopic />} />
          <Route path="/physics/ultrasound-physics" element={<UltrasoundPhysicsTopic />} />
          <Route path="/physics/mri-physics" element={<MRIPhysicsTopic />} />
          <Route path="/physics/xray-radiation-safety" element={<XRayRadiationSafetyTopic />} />
          <Route path="/physics/defibrillation-pacing" element={<DefibrillationPacingTopic />} />
          <Route path="/physics/clinical-measurement" element={<ClinicalMeasurementTopic />} />
          <Route path="/physics/si-units-thermodynamics" element={<SIUnitsThermodynamicsTopic />} />
          <Route path="/physics/optics-light" element={<OpticsLightTopic />} />
          <Route path="/physics/electricity-magnetism" element={<ElectricityMagnetismTopic />} />
          <Route path="/physics/statistics-ebm" element={<StatisticsEBMTopic />} />
          
          <Route path="/physics/math-concepts" element={<MathConceptsTopic />} />
          <Route path="/physics/depth-of-anaesthesia" element={<DepthOfAnaesthesiaMonitoringTopic />} />
          {/* Cross-section alias — depth-of-anaesthesia is also commonly looked for under /clinical */}
          <Route path="/clinical/depth-of-anaesthesia" element={<Navigate to="/physics/depth-of-anaesthesia" replace />} />
          <Route path="/physics/equipment-monitoring" element={<EquipmentMonitoringTopic />} />
          <Route path="/physics/vaporisers" element={<VaporisersTopic />} />
          <Route path="/physics/breathing-circuits" element={<BreathingCircuitsTopic />} />
          <Route path="/physics/ventilator-modes" element={<VentilatorModesTopic />} />
          <Route path="/physics/capnography" element={<CapnographyTopic />} />
          <Route path="/physics/capnography/waveforms" element={<CapnographyWaveformsTopic />} />
          <Route path="/physics/venturi-mask" element={<VenturiMaskTopic />} />
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
          <Route path="/pharmacology/rocuronium" element={<RocuroniumTopic />} />
          <Route path="/pharmacology/suxamethonium-vs-rocuronium" element={<SuxVsRocComparisonTopic />} />
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
          <Route path="/clinical/resource-poor-anaesthesia" element={<ResourcePoorAnaesthesiaTopic />} />
          <Route path="/clinical/mass-casualty-military" element={<MassCasualtyMilitaryTopic />} />
          <Route path="/clinical/pain-medicine" element={<PainMedicineTopic />} />
          <Route path="/clinical/tiva" element={<TIVATopic />} />
          <Route path="/clinical/orthopaedic-anaesthesia" element={<OrthopaedicAnaesthesiaTopic />} />
          <Route path="/clinical/ophthalmic-anaesthesia" element={<OphthalmicAnaesthesiaTopic />} />
          <Route path="/clinical/day-surgery" element={<DaySurgeryTopic />} />
          <Route path="/clinical/operating-theatre-environment" element={<OperatingTheatreEnvironmentTopic />} />
          <Route path="/clinical/procedural-sedation" element={<ProceduralSedationTopic />} />
          <Route path="/clinical/transfer-medicine" element={<TransferMedicineTopic />} />
          <Route path="/clinical/patient-positioning" element={<PatientPositioningTopic />} />
          <Route path="/clinical/bariatric-anaesthesia" element={<BariatricAnaesthesiaTopic />} />
          <Route path="/clinical/vascular-anaesthesia" element={<VascularAnaesthesiaTopic />} />
          <Route path="/clinical/ent-anaesthesia" element={<ENTAnaesthesiaTopic />} />
          <Route path="/clinical/burns-plastics" element={<BurnsPlasticsTopic />} />
          <Route path="/clinical/emergency-surgery" element={<EmergencySurgeryTopic />} />
          <Route path="/clinical/urological-anaesthesia" element={<UrologicalAnaesthesiaTopic />} />
          <Route path="/clinical/gynaecological-anaesthesia" element={<GynaecologicalAnaesthesiaTopic />} />
          <Route path="/clinical/hepatobiliary-transplant" element={<HepatobiliaryTransplantTopic />} />
          <Route path="/clinical/plastic-surgery" element={<PlasticSurgeryTopic />} />
          <Route path="/clinical/interventional-radiology" element={<InterventionalRadiologyTopic />} />
          <Route path="/clinical/elderly-anaesthesia" element={<ElderlyAnaesthesiaTopic />} />
          <Route path="/perioperative/cardiovascular-disease" element={<CardiovascularDiseaseTopic />} />
          <Route path="/perioperative/respiratory-disease" element={<RespiratoryDiseaseTopic />} />
          <Route path="/perioperative/endocrine-disease" element={<EndocrineDiseaseTopic />} />
          <Route path="/perioperative/neurological-disease" element={<NeurologicalDiseaseTopic />} />
          <Route path="/perioperative/haematological-disease" element={<HaematologicalDiseaseTopic />} />
          <Route path="/perioperative/hepatic-disease" element={<HepaticDiseaseTopic />} />
          {/* Intensive Care */}
          <Route path="/intensive-care/sepsis" element={<SepsisTopic />} />
          <Route path="/intensive-care/mechanical-ventilation" element={<MechanicalVentilationTopic />} />
          <Route path="/intensive-care/circulatory-failure" element={<CirculatoryFailureTopic />} />
          <Route path="/intensive-care/aki-rrt" element={<AkiRrtTopic />} />
          <Route path="/intensive-care/acute-liver-failure" element={<AcuteLiverFailureTopic />} />
          <Route path="/intensive-care/acute-pancreatitis" element={<AcutePancreatitisTopic />} />
          <Route path="/intensive-care/abdominal-compartment-syndrome" element={<AbdominalCompartmentSyndromeTopic />} />
          <Route path="/intensive-care/neurointensive-care" element={<NeurointensiveCareTopic />} />
          <Route path="/intensive-care/cardiac-output-monitoring" element={<CardiacOutputMonitoringTopic />} />
          <Route path="/intensive-care/acid-base" element={<AcidBaseTopic />} />
          <Route path="/intensive-care/ards" element={<ARDSTopic />} />
          <Route path="/intensive-care/icu-nutrition" element={<IcuNutritionTopic />} />
          <Route path="/intensive-care/postop-high-risk-icu" element={<PostopHighRiskIcuTopic />} />
          <Route path="/intensive-care/icu-endocrine-emergencies" element={<IcuEndocrineEmergenciesTopic />} />
          <Route path="/intensive-care/transfusion-coagulation" element={<TransfusionCoagulationTopic />} />
          <Route path="/intensive-care/icu-sedation-delirium" element={<IcuSedationDeliriumTopic />} />
          <Route path="/intensive-care/organ-donation" element={<OrganDonationTopic />} />
          <Route path="/intensive-care/antimicrobials-icu" element={<AntimicrobialsIcuTopic />} />
          <Route path="/intensive-care/paediatric-icu" element={<PaediatricIcuTopic />} />
          <Route path="/intensive-care/burns-icu" element={<BurnsIcuTopic />} />
          <Route path="/intensive-care/haematology-icu" element={<HaematologyIcuTopic />} />
          <Route path="/intensive-care/ecmo" element={<EcmoTopic />} />
          <Route path="/intensive-care/toxicology" element={<ToxicologyTopic />} />
          <Route path="/intensive-care/infectious-disease-icu" element={<InfectiousDiseaseIcuTopic />} />
          <Route path="/intensive-care/bronchospastic-failure" element={<BronchospasticFailureTopic />} />
          <Route path="/intensive-care/prognostication-ethics-icu" element={<PrognosticationEthicsIcuTopic />} />
          <Route path="/intensive-care/pulmonary-hypertension" element={<PulmonaryHypertensionTopic />} />
          <Route path="/intensive-care/arrhythmias-ecg-icu" element={<ArrhythmiasEcgIcuTopic />} />
          <Route path="/intensive-care/cardiac-arrest-post-resus" element={<CardiacArrestPostResusTopic />} />
          <Route path="/intensive-care/neuroprognostication" element={<NeuroprognosticationTopic />} />
          {/* ECMO standalone — replaces previous redirect to /circulatory-failure */}
          <Route path="/intensive-care/end-of-life-communication" element={<EndOfLifeCommunicationTopic />} />
          <Route path="/intensive-care/non-technical-skills" element={<NonTechnicalSkillsTopic />} />
          {/* Perioperative */}
          <Route path="/perioperative/preoperative-assessment" element={<PreoperativeAssessmentTopic />} />
          <Route path="/perioperative/enhanced-recovery" element={<EnhancedRecoveryTopic />} />
          <Route path="/perioperative/perioperative-fluids" element={<PerioperativeFluidsTopic />} />
          <Route path="/perioperative/vascular-access-devices" element={<VascularAccessDevicesTopic />} />
          <Route path="/perioperative/genetic-syndromes" element={<GeneticSyndromesTopic />} />
          {/* Anatomy */}
          <Route path="/anatomy/airway-anatomy" element={<Navigate to="/anatomy/head-neck-anatomy" replace />} />
          <Route path="/anatomy/cardiac-anatomy" element={<CardiacAnatomyTopic />} />
          <Route path="/anatomy/spinal-anatomy" element={<SpinalAnatomyTopic />} />
          <Route path="/anatomy/brachial-plexus" element={<BrachialPlexusTopic />} />
          <Route path="/anatomy/upper-limb-anatomy" element={<UpperLimbAnatomyTopic />} />
          <Route path="/anatomy/thoracic-anatomy" element={<ThoracicAnatomyTopic />} />
          <Route path="/anatomy/abdominal-anatomy" element={<AbdominalAnatomyTopic />} />
          <Route path="/anatomy/head-neck-anatomy" element={<HeadNeckAnatomyTopic />} />
          <Route path="/anatomy/neuroanatomy" element={<NeuroanatomyTopic />} />
          <Route path="/anatomy/lower-limb-anatomy" element={<LowerLimbAnatomyTopic />} />
          {/* Chemistry Foundations */}
          <Route path="/chemistry/atomic-structure-bonding" element={<AtomicStructureBondingTopic />} />
          <Route path="/chemistry/acids-bases-buffers" element={<AcidsBasesBuffersTopic />} />
          <Route path="/chemistry/organic-chemistry" element={<OrganicChemistryTopic />} />
          <Route path="/chemistry/solutions-concentration" element={<SolutionsConcentrationTopic />} />
          <Route path="/chemistry/oxidation-reduction" element={<OxidationReductionTopic />} />
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
          <Route path="/admin/audit" element={<RequireAdmin><ContentAudit /></RequireAdmin>} />
          <Route path="/admin/audit-dashboard" element={<RequireAdmin><AuditDashboard /></RequireAdmin>} />
          <Route path="/admin/audit-report" element={<RequireAdmin><AuditReport /></RequireAdmin>} />
          <Route path="/admin/esicm-validator" element={<Navigate to="/admin/audit" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        </VisitTrackerWrapper>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
    </UnitPreferenceProvider>
    </MotionPreferenceProvider>
    </ExamFilterProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;

import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProviders } from "@/app/AppProviders";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { UpdateBanner } from "@/components/layout/UpdateBanner";
import { CascadePerfBadge } from "@/components/diagrams/_dev/CascadePerfBadge";
import { PodcastJobsIndicator } from "@/components/topic/PodcastJobsIndicator";

import { VisitTrackerWrapper } from "@/components/layout/VisitTrackerWrapper";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ContentAudit = lazy(() => import("./pages/ContentAudit"));
const AuditDashboard = lazy(() => import("./pages/AuditDashboard"));
const AuditReport = lazy(() => import("./pages/AuditReport"));
// Standalone ESICM validator + formulary tab are now unified into Content Audit
// at /admin/audit. The legacy route below redirects there for back-compat.
const TopicMap = lazy(() => import("./pages/TopicMap"));
const ProgressTracker = lazy(() => import("./pages/ProgressTracker"));
const StudyStats = lazy(() => import("./pages/StudyStats"));
const StudyPlan = lazy(() => import("./pages/StudyPlan"));
const PodcastsLibrary = lazy(() => import("./pages/PodcastsLibrary"));
const PodcastPlaylist = lazy(() => import("./pages/PodcastPlaylist"));
const PodcastsByRegion = lazy(() => import("./pages/PodcastsByRegion"));
const GlossaryAudit = lazy(() => import("./pages/GlossaryAudit"));
const VivaHub = lazy(() => import("./pages/VivaHub"));
const VivaQuestionLibrary = lazy(() => import("./pages/VivaQuestionLibrary"));
const CoverageBarsResponsiveTest = lazy(() => import("./pages/CoverageBarsResponsiveTest"));
const DrugsLibrary = lazy(() => import("./pages/DrugsLibrary"));
const DrugDetail = lazy(() => import("./pages/DrugDetail"));
const DrugReferenceLibrary = lazy(() => import("./pages/reference/DrugReferenceLibrary"));
const DrugReferenceEntry = lazy(() => import("./pages/reference/DrugReferenceEntry"));
const DrugReferenceHome = lazy(() => import("./pages/reference/DrugReferenceHome"));
const DrugReferenceMonitoring = lazy(() => import("./pages/reference/DrugReferenceMonitoring"));
const DrugReferenceInfusions = lazy(() => import("./pages/reference/DrugReferenceInfusions"));
const DrugReferenceCalculator = lazy(() => import("./pages/reference/DrugReferenceCalculator"));
const DrugReferenceAbout = lazy(() => import("./pages/reference/DrugReferenceAbout"));
const DrugReferenceTopics = lazy(() => import("./pages/reference/DrugReferenceTopics"));
const DrugReferenceTopic = lazy(() => import("./pages/reference/DrugReferenceTopic"));
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
const InfusionPumpTool = lazy(() => import("./pages/tools/InfusionPumpTool"));
const SedationCalculatorTool = lazy(() => import("./pages/tools/SedationCalculatorTool"));
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
const RoboticSurgeryAnaesthesiaNote = lazy(() => import("./pages/notes/RoboticSurgeryAnaesthesiaNote"));
const CardiacOutputFormulaNote = lazy(() => import("./pages/notes/CardiacOutputFormulaNote"));
const WiggersDiagramNote = lazy(() => import("./pages/notes/WiggersDiagramNote"));
const HeartSoundsEcgNote = lazy(() => import("./pages/notes/HeartSoundsEcgNote"));
const PaediatricMaintenanceFluidsNote = lazy(() => import("./pages/notes/PaediatricMaintenanceFluidsNote"));


// Lazy load section pages
const PhysicsSection = lazy(() => import("./pages/PhysicsSection"));
const PhysiologySection = lazy(() => import("./pages/PhysiologySection"));
const PharmacologySection = lazy(() => import("./pages/PharmacologySection"));
const ClinicalSection = lazy(() => import("./pages/ClinicalSection"));
const IntensiveCareSection = lazy(() => import("./pages/IntensiveCareSection"));
const PerioperativeSection = lazy(() => import("./pages/PerioperativeSection"));
const CoExistingDiseaseOverview = lazy(() => import("./pages/CoExistingDiseaseOverview"));
const ComplexNeedsCaseStudy = lazy(() => import("./pages/ComplexNeedsCaseStudy"));
const PerioperativeTimeline = lazy(() => import("./pages/PerioperativeTimeline"));
const PerioperativeCaseBank = lazy(() => import("./pages/PerioperativeCaseBank"));
const PhysicsCaseBank = lazy(() => import("./pages/PhysicsCaseBank"));
const PhysiologyCaseBank = lazy(() => import("./pages/PhysiologyCaseBank"));
const PharmacologyCaseBank = lazy(() => import("./pages/PharmacologyCaseBank"));
const IntensiveCareCaseBank = lazy(() => import("./pages/IntensiveCareCaseBank"));
const IcuDrugDoses = lazy(() => import("./pages/IcuDrugDoses"));
const IcuInfusions = lazy(() => import("./pages/IcuInfusions"));
const IcuManagementFlows = lazy(() => import("./pages/IcuManagementFlows"));
const PaediatricIcuFlows = lazy(() => import("./pages/PaediatricIcuFlows"));
const PaediatricWithdrawalFlows = lazy(() => import("./pages/PaediatricWithdrawalFlows"));
const AdultWithdrawalFlows = lazy(() => import("./pages/AdultWithdrawalFlows"));
const IcuDrugCalculator = lazy(() => import("./pages/IcuDrugCalculator"));
const IcuNursingProtocols = lazy(() => import("./pages/IcuNursingProtocols"));
const IcuDrugMechanisms = lazy(() => import("./pages/IcuDrugMechanisms"));
const IcuDrugSafety = lazy(() => import("./pages/IcuDrugSafety"));
const IcuInteractionChecker = lazy(() => import("./pages/IcuInteractionChecker"));
const IcuInteractionMatrix = lazy(() => import("./pages/IcuInteractionMatrix"));
const IcuDrugComparison = lazy(() => import("./pages/IcuDrugComparison"));
const IcuDrugCards = lazy(() => import("./pages/IcuDrugCards"));
const IcuPharmacology = lazy(() => import("./pages/IcuPharmacology"));
const PaediatricPharmacokinetics = lazy(() => import("./pages/PaediatricPharmacokinetics"));

const AnaesthesiaDrugDoses = lazy(() => import("./pages/AnaesthesiaDrugDoses"));
const AnaesthesiaDrugCalculator = lazy(() => import("./pages/AnaesthesiaDrugCalculator"));

const AnatomySection = lazy(() => import("./pages/AnatomySection"));
const ChemistrySection = lazy(() => import("./pages/ChemistrySection"));

// Topic routes are data-driven — see src/routes/topicRoutes.ts
import { topicRouteEntries, TOPIC_REDIRECTS } from "@/routes/topicRoutes";
import { RequireAdmin } from "@/components/layout/RequireAdmin";
const SpoofedDomains = lazy(() => import("./pages/admin/SpoofedDomains"));
const AdminWebVitals = lazy(() => import("./pages/admin/WebVitals"));
const AdminContentEditor = lazy(() => import("./pages/admin/ContentEditor"));
const AdminPodcastRerecord = lazy(() => import("./pages/admin/PodcastRerecord"));
const AdminDonations = lazy(() => import("./pages/admin/Donations"));


const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const App = () => (
  <AppProviders>
      <Toaster />
      <Sonner />

      
      <BrowserRouter>
        <Header />
        <UpdateBanner />
        <CascadePerfBadge />
        <PodcastJobsIndicator />

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
          <Route path="/study-stats" element={<StudyStats />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/errata" element={<Errata />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/podcasts" element={<PodcastsLibrary />} />
          <Route path="/podcasts/playlist" element={<PodcastPlaylist />} />
          <Route path="/podcasts/regions" element={<PodcastsByRegion />} />
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
          <Route path="/reference" element={<DrugReferenceHome />} />
          <Route path="/reference/drugs" element={<DrugReferenceLibrary />} />
          <Route path="/reference/topics" element={<DrugReferenceTopics />} />
          <Route path="/reference/topics/:slug" element={<DrugReferenceTopic />} />
          <Route path="/reference/drugs/:slug" element={<DrugReferenceEntry />} />
          <Route path="/reference/monitoring" element={<DrugReferenceMonitoring />} />
          <Route path="/reference/infusions" element={<DrugReferenceInfusions />} />
          <Route path="/reference/calculator" element={<DrugReferenceCalculator />} />
          <Route path="/reference/about" element={<DrugReferenceAbout />} />
          <Route path="/drugs/:slug" element={<DrugDetail />} />
          <Route path="/tools" element={<ToolsHub />} />
          <Route path="/tools/mac-for-age" element={<MACForAgeTool />} />
          <Route path="/tools/paediatric-emergency-doses" element={<PaedDoseTool />} />
          <Route path="/tools/maintenance-fluid" element={<MaintenanceFluidTool />} />
          <Route path="/tools/max-local-anaesthetic-dose" element={<MaxLADoseTool />} />
          <Route path="/tools/abg-interpreter" element={<ABGInterpreterTool />} />
          <Route path="/tools/infusion-pump" element={<InfusionPumpTool />} />
          <Route path="/tools/sedation" element={<SedationCalculatorTool />} />
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
          <Route path="/notes/anaesthesia-for-robotic-surgery-guide" element={<RoboticSurgeryAnaesthesiaNote />} />
          <Route path="/notes/cardiac-output-formula" element={<CardiacOutputFormulaNote />} />
          <Route path="/notes/wiggers-diagram-explained" element={<WiggersDiagramNote />} />
          <Route path="/notes/heart-sounds-ecg-cardiac-cycle" element={<HeartSoundsEcgNote />} />
          <Route path="/notes/paediatric-maintenance-fluids-4-2-1-rule" element={<PaediatricMaintenanceFluidsNote />} />

          <Route path="/physics" element={<PhysicsSection />} />
          <Route path="/physics/case-bank" element={<PhysicsCaseBank />} />
          <Route path="/physiology" element={<PhysiologySection />} />
          <Route path="/physiology/case-bank" element={<PhysiologyCaseBank />} />
          <Route path="/pharmacology" element={<PharmacologySection />} />
          <Route path="/pharmacology/case-bank" element={<PharmacologyCaseBank />} />
          <Route path="/clinical" element={<ClinicalSection />} />
          <Route path="/intensive-care" element={<IntensiveCareSection />} />
          <Route path="/intensive-care/case-bank" element={<IntensiveCareCaseBank />} />
          <Route path="/intensive-care/drug-doses" element={<IcuDrugDoses />} />
          <Route path="/intensive-care/infusions" element={<IcuInfusions />} />
          <Route path="/intensive-care/management-flows" element={<IcuManagementFlows />} />
          <Route path="/intensive-care/paediatric-flows" element={<PaediatricIcuFlows />} />
          <Route path="/intensive-care/paediatric-withdrawal" element={<PaediatricWithdrawalFlows />} />
          <Route path="/intensive-care/adult-withdrawal" element={<AdultWithdrawalFlows />} />
          <Route path="/intensive-care/calculator" element={<IcuDrugCalculator />} />
          <Route path="/intensive-care/nursing-protocols" element={<IcuNursingProtocols />} />
          <Route path="/intensive-care/drug-mechanisms" element={<IcuDrugMechanisms />} />
          <Route path="/intensive-care/drug-safety" element={<IcuDrugSafety />} />
          <Route path="/intensive-care/interaction-checker" element={<IcuInteractionChecker />} />
          <Route path="/intensive-care/interaction-matrix" element={<IcuInteractionMatrix />} />
          <Route path="/intensive-care/drug-comparison" element={<IcuDrugComparison />} />
          <Route path="/intensive-care/drug-cards" element={<IcuDrugCards />} />
          <Route path="/intensive-care/pharmacology" element={<IcuPharmacology />} />
          <Route path="/intensive-care/paediatric-pharmacokinetics" element={<PaediatricPharmacokinetics />} />

          <Route path="/perioperative" element={<PerioperativeSection />} />
          <Route path="/perioperative/case-bank" element={<PerioperativeCaseBank />} />
          <Route path="/perioperative/co-existing-disease" element={<CoExistingDiseaseOverview />} />
          <Route path="/perioperative/complex-needs-case-study" element={<ComplexNeedsCaseStudy />} />
          <Route path="/perioperative/timeline" element={<PerioperativeTimeline />} />
          <Route path="/perioperative/drug-doses" element={<AnaesthesiaDrugDoses />} />
          <Route path="/perioperative/calculator" element={<AnaesthesiaDrugCalculator />} />

          <Route path="/anatomy" element={<AnatomySection />} />
          <Route path="/chemistry" element={<ChemistrySection />} />
          {/* Topic pages — data-driven, see src/routes/topicRoutes.ts */}
          {topicRouteEntries.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {TOPIC_REDIRECTS.map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
          <Route path="/admin/audit" element={<RequireAdmin><ContentAudit /></RequireAdmin>} />
          <Route path="/admin/audit-dashboard" element={<RequireAdmin><AuditDashboard /></RequireAdmin>} />
          <Route path="/admin/audit-report" element={<RequireAdmin><AuditReport /></RequireAdmin>} />
          <Route path="/admin/spoofed-domains" element={<RequireAdmin><SpoofedDomains /></RequireAdmin>} />
          <Route path="/admin/web-vitals" element={<RequireAdmin><AdminWebVitals /></RequireAdmin>} />
          <Route path="/admin/content-editor" element={<RequireAdmin><AdminContentEditor /></RequireAdmin>} />
          <Route path="/admin/podcast-rerecord" element={<RequireAdmin><AdminPodcastRerecord /></RequireAdmin>} />
          <Route path="/admin/donations" element={<RequireAdmin><AdminDonations /></RequireAdmin>} />

          <Route path="/admin/esicm-validator" element={<Navigate to="/admin/audit" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        </VisitTrackerWrapper>
      </BrowserRouter>
  </AppProviders>
);

export default App;

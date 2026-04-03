import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PhysicsSection from "./pages/PhysicsSection.tsx";
import PhysiologySection from "./pages/PhysiologySection.tsx";
import PharmacologySection from "./pages/PharmacologySection.tsx";
import GasLawsTopic from "./pages/topics/GasLawsTopic.tsx";
import PressureMeasurementTopic from "./pages/topics/PressureMeasurementTopic.tsx";
import FlowMeasurementTopic from "./pages/topics/FlowMeasurementTopic.tsx";
import VaporizersTopic from "./pages/topics/VaporizersTopic.tsx";
import ElectricalSafetyTopic from "./pages/topics/ElectricalSafetyTopic.tsx";
import PulseOximetryTopic from "./pages/topics/PulseOximetryTopic.tsx";
import OxygenHaemoglobinTopic from "./pages/topics/OxygenHaemoglobinTopic.tsx";
import CardiacCycleTopic from "./pages/topics/CardiacCycleTopic.tsx";
import LungMechanicsTopic from "./pages/topics/LungMechanicsTopic.tsx";
import RenalPhysiologyTopic from "./pages/topics/RenalPhysiologyTopic.tsx";
import NeuromuscularTopic from "./pages/topics/NeuromuscularTopic.tsx";
import AutonomicNervousTopic from "./pages/topics/AutonomicNervousTopic.tsx";
import PharmacokineticsTopic from "./pages/topics/PharmacokineticsTopic.tsx";
import IVAnaestheticsTopic from "./pages/topics/IVAnaestheticsTopic.tsx";
import VolatileAgentsTopic from "./pages/topics/VolatileAgentsTopic.tsx";
import OpioidsTopic from "./pages/topics/OpioidsTopic.tsx";
import MuscleRelaxantsTopic from "./pages/topics/MuscleRelaxantsTopic.tsx";
import LocalAnaestheticsTopic from "./pages/topics/LocalAnaestheticsTopic.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProgressProvider>
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
          <Route path="/physics/gas-laws" element={<GasLawsTopic />} />
          <Route path="/physiology/oxygen-haemoglobin" element={<OxygenHaemoglobinTopic />} />
          <Route path="/physiology/cardiac-cycle" element={<CardiacCycleTopic />} />
          <Route path="/pharmacology/pharmacokinetics" element={<PharmacokineticsTopic />} />
          <Route path="/pharmacology/volatile-agents" element={<VolatileAgentsTopic />} />
          <Route path="/physiology/neuromuscular" element={<NeuromuscularTopic />} />
          <Route path="/pharmacology/local-anaesthetics" element={<LocalAnaestheticsTopic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;

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
import OxygenHaemoglobinTopic from "./pages/topics/OxygenHaemoglobinTopic.tsx";
import PharmacokineticsTopic from "./pages/topics/PharmacokineticsTopic.tsx";
import CardiacCycleTopic from "./pages/topics/CardiacCycleTopic.tsx";
import VolatileAgentsTopic from "./pages/topics/VolatileAgentsTopic.tsx";

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ProgressProvider>
  </QueryClientProvider>
);

export default App;

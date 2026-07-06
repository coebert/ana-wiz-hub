/**
 * <AppProviders> — single composition of every global context.
 *
 * Replaces the pyramid of nested <QueryClientProvider><ProgressProvider>…
 * in App.tsx. New global providers get added here in one place instead of
 * threading through App.tsx and every test wrapper.
 *
 * Order matters: outer providers can be consumed by inner ones. Current
 * order mirrors the previous App.tsx nesting exactly — do not reorder
 * without checking each provider's consumers.
 */
import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { SubsectionProgressProvider } from "@/contexts/SubsectionProgressContext";
import { AuthProvider } from "@/hooks/useAuth";
import { TooltipProvider } from "@/components/ui/tooltip";

// Motion, Unit and ExamFilter preferences moved off React context into
// zustand stores (see src/contexts/*Context.tsx). Their hooks work without
// a provider, so no wrapper is needed here.

// Single QueryClient for the app lifetime — safe to construct at module scope
// because App.tsx only ever renders one <AppProviders>.
const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProgressProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ProgressProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

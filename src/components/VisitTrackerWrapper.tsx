import { useVisitTracker } from "@/hooks/useVisitTracker";

export const VisitTrackerWrapper = ({ children }: { children: React.ReactNode }) => {
  useVisitTracker();
  return <>{children}</>;
};

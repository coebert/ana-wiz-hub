import { useVisitTracker } from "@/hooks/useVisitTracker";
import { VisitorSurvey } from "./VisitorSurvey";

export const VisitTrackerWrapper = ({ children }: { children: React.ReactNode }) => {
  useVisitTracker();
  return <>{children}<VisitorSurvey /></>;
};

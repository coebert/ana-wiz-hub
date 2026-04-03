import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { ExamTag } from "@/data/curriculum";

interface ExamFilterContextType {
  activeExam: ExamTag | null;
  setActiveExam: (exam: ExamTag | null) => void;
  matchesFilter: (tags: ExamTag[]) => boolean;
}

const ExamFilterContext = createContext<ExamFilterContextType | null>(null);

export const ExamFilterProvider = ({ children }: { children: ReactNode }) => {
  const [activeExam, setActiveExam] = useState<ExamTag | null>(null);

  const matchesFilter = useCallback(
    (tags: ExamTag[]) => {
      if (!activeExam) return true;
      return tags.includes(activeExam);
    },
    [activeExam]
  );

  return (
    <ExamFilterContext.Provider value={{ activeExam, setActiveExam, matchesFilter }}>
      {children}
    </ExamFilterContext.Provider>
  );
};

export const useExamFilter = () => {
  const ctx = useContext(ExamFilterContext);
  if (!ctx) throw new Error("useExamFilter must be used within ExamFilterProvider");
  return ctx;
};

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { physicsTopics, physiologyTopics, pharmacologyTopics, Topic } from "@/data/curriculum";

interface ProgressContextType {
  completedTopics: Set<string>;
  toggleTopic: (topicId: string) => void;
  isCompleted: (topicId: string) => boolean;
  getSectionProgress: (section: "physics" | "physiology" | "pharmacology") => { completed: number; total: number };
  getOverallProgress: () => { completed: number; total: number };
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "anaesthesia-core-progress";

const allTopics: Topic[] = [...physicsTopics, ...physiologyTopics, ...pharmacologyTopics];

const topicsBySection = {
  physics: physicsTopics.filter((t) => t.available),
  physiology: physiologyTopics.filter((t) => t.available),
  pharmacology: pharmacologyTopics.filter((t) => t.available),
};

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedTopics]));
  }, [completedTopics]);

  const toggleTopic = useCallback((topicId: string) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  }, []);

  const isCompleted = useCallback((topicId: string) => completedTopics.has(topicId), [completedTopics]);

  const getSectionProgress = useCallback(
    (section: "physics" | "physiology" | "pharmacology") => {
      const available = topicsBySection[section];
      const completed = available.filter((t) => completedTopics.has(t.id)).length;
      return { completed, total: available.length };
    },
    [completedTopics]
  );

  const getOverallProgress = useCallback(() => {
    const available = allTopics.filter((t) => t.available);
    const completed = available.filter((t) => completedTopics.has(t.id)).length;
    return { completed, total: available.length };
  }, [completedTopics]);

  return (
    <ProgressContext.Provider value={{ completedTopics, toggleTopic, isCompleted, getSectionProgress, getOverallProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
};

import { create } from "zustand";
import type { ExamTag } from "@/data/curriculum";

/**
 * Global exam filter (Primary / Final / FFICM / EDIC). Not persisted — the
 * filter resets on reload by design so users don't get surprised by hidden
 * topics from a previous session.
 *
 * Zustand store; the `useExamFilter` hook shape is preserved so consumers
 * didn't need to change when we moved off React context (see review §5).
 */

interface ExamFilterState {
  activeExam: ExamTag | null;
  setActiveExam: (exam: ExamTag | null) => void;
}

const useExamFilterStore = create<ExamFilterState>((set) => ({
  activeExam: null,
  setActiveExam: (activeExam) => set({ activeExam }),
}));

interface ExamFilterHook {
  activeExam: ExamTag | null;
  setActiveExam: (exam: ExamTag | null) => void;
  matchesFilter: (tags: ExamTag[]) => boolean;
}

export const useExamFilter = (): ExamFilterHook => {
  const activeExam = useExamFilterStore((s) => s.activeExam);
  const setActiveExam = useExamFilterStore((s) => s.setActiveExam);
  const matchesFilter = (tags: ExamTag[]) =>
    activeExam === null ? true : tags.includes(activeExam);
  return { activeExam, setActiveExam, matchesFilter };
};

/** No-op provider kept for backward compatibility. */
export const ExamFilterProvider = ({ children }: { children: React.ReactNode }) =>
  children as React.ReactElement;

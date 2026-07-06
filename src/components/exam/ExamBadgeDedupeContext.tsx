/**
 * Suppresses repeated `<ExamMappingBadges>` renders within a single topic.
 *
 * The topic template renders one `<ExamSection>` per subsection, and each of
 * those renders its own "MAPS TO FRCA PRIMARY PH_BK_01" ribbon. On a long
 * topic with 10+ subsections that all map to the same exams + codes, the
 * ribbon becomes visual noise.
 *
 * Solution: a per-topic dedupe scope. The first occurrence of any
 * exam-signature renders normally; subsequent identical signatures render
 * `null`. Different signatures still render.
 *
 * Wire-up:
 *   1. Wrap the topic body in `<ExamBadgeDedupeProvider>` (done in
 *      `TopicTemplate`).
 *   2. `<ExamMappingBadges>` calls `useShouldRenderExamBadge(signature)`
 *      during render — the set mutates synchronously so children rendered
 *      later in the same pass see the updated state.
 *
 * Correctness under React's double-render (strict mode / concurrent):
 *   - The set is recreated with `useMemo(() => new Set(), [])` in the
 *     provider — but that gives one Set for the whole mount, not per render.
 *     We instead reset it at the start of every render by clearing the ref,
 *     which is safe because the tree renders in order and strict-mode's
 *     second render also resets first before re-adding.
 */
import { createContext, useContext, useRef, type ReactNode } from "react";

interface DedupeScope {
  seen: Set<string>;
  reset: () => void;
}

const ExamBadgeDedupeContext = createContext<DedupeScope | null>(null);

interface Props {
  children: ReactNode;
}

export const ExamBadgeDedupeProvider = ({ children }: Props) => {
  const scopeRef = useRef<DedupeScope | null>(null);
  if (!scopeRef.current) {
    const set = new Set<string>();
    scopeRef.current = { seen: set, reset: () => set.clear() };
  }
  // Reset on every render so a re-render doesn't inherit the previous pass'
  // signatures (children re-add themselves in tree order).
  scopeRef.current.reset();
  return (
    <ExamBadgeDedupeContext.Provider value={scopeRef.current}>
      {children}
    </ExamBadgeDedupeContext.Provider>
  );
};

/**
 * Returns true the first time a given signature is seen within the current
 * dedupe scope, false on subsequent identical signatures. Outside a provider
 * always returns true (no dedupe).
 */
export function useShouldRenderExamBadge(signature: string): boolean {
  const scope = useContext(ExamBadgeDedupeContext);
  if (!scope) return true;
  if (scope.seen.has(signature)) return false;
  scope.seen.add(signature);
  return true;
}

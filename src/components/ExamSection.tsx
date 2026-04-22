import { ReactNode } from "react";
import { EyeOff } from "lucide-react";
import { ExamTag } from "@/data/curriculum";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ExamMappingBadges } from "@/components/ExamMappingBadges";

interface ExamSectionProps {
  /** Which exams this subsection maps to. */
  exams: ExamTag[];
  /** Optional curriculum reference codes shown alongside the exam badges. */
  curriculumCodes?: string[];
  /** Optional override label for the badge row (defaults to "Maps to"). */
  badgeLabel?: string;
  /** Section content. */
  children: ReactNode;
  /** Optional className passed to the wrapping element. */
  className?: string;
}

/**
 * Filterable subsection wrapper. Pair with the global `<ExamFilterContext>` and
 * the topic-level `<TopicExamFilterBar>` so learners can hide every section
 * that isn't mapped to the exam they're revising for (FRCA Primary / Final /
 * FFICM / EDIC).
 *
 * - Renders `<ExamMappingBadges>` at the top of the subsection.
 * - When a filter is active and the exams list does NOT include it, the
 *   children are replaced by a compact "hidden by filter" stub so learners
 *   can see what's been collapsed and immediately clear the filter if needed.
 *
 * Usage:
 *   <ExamSection exams={["final", "fficm"]} curriculumCodes={["CC1.4"]}>
 *     <h2>...</h2>
 *     ...content...
 *   </ExamSection>
 */
export const ExamSection = ({
  exams,
  curriculumCodes,
  badgeLabel,
  children,
  className,
}: ExamSectionProps) => {
  const { activeExam } = useExamFilter();
  const matches = !activeExam || exams.includes(activeExam);

  return (
    <div className={className}>
      <ExamMappingBadges exams={exams} curriculumCodes={curriculumCodes} label={badgeLabel} />
      {matches ? (
        children
      ) : (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3 flex items-center gap-2 text-xs text-muted-foreground">
          <EyeOff className="h-3.5 w-3.5 shrink-0" />
          <span>
            Section hidden by exam filter — not mapped to{" "}
            <strong className="text-foreground">{activeExam?.toUpperCase()}</strong>.
          </span>
        </div>
      )}
    </div>
  );
};

export default ExamSection;

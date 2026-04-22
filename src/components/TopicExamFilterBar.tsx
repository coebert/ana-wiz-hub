import { Filter, X } from "lucide-react";
import { ExamTag } from "@/data/curriculum";
import { useExamFilter } from "@/contexts/ExamFilterContext";

const EXAMS: { value: ExamTag; label: string; tone: string }[] = [
  { value: "primary", label: "FRCA Primary", tone: "data-[active=true]:bg-physiology data-[active=true]:text-white border-physiology/40 text-physiology" },
  { value: "final", label: "FRCA Final", tone: "data-[active=true]:bg-pharmacology data-[active=true]:text-white border-pharmacology/40 text-pharmacology" },
  { value: "fficm", label: "FFICM", tone: "data-[active=true]:bg-icu data-[active=true]:text-white border-icu/40 text-icu" },
  { value: "edic", label: "EDIC", tone: "data-[active=true]:bg-clinical data-[active=true]:text-white border-clinical/40 text-clinical" },
];

/**
 * Topic-page exam filter. Mirrors the header chips but lives next to the
 * content so learners can show only sections mapped to the exam they are
 * revising for. Drives `<ExamSection>` visibility via `ExamFilterContext`.
 *
 * Designed to sit at the very top of every TopicTemplate page (above the
 * Learning Objectives block).
 */
export const TopicExamFilterBar = () => {
  const { activeExam, setActiveExam } = useExamFilter();

  return (
    <div className="rounded-lg border border-border bg-card/60 px-3 py-2 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 mr-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        <Filter className="h-3.5 w-3.5" />
        <span>Show only</span>
      </div>
      {EXAMS.map(({ value, label, tone }) => {
        const active = activeExam === value;
        return (
          <button
            key={value}
            type="button"
            data-active={active}
            onClick={() => setActiveExam(active ? null : value)}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide transition-colors hover:bg-muted/60 ${tone}`}
            aria-pressed={active}
          >
            {label}
          </button>
        );
      })}
      {activeExam && (
        <button
          type="button"
          onClick={() => setActiveExam(null)}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60"
          aria-label="Clear exam filter"
        >
          <X className="h-3 w-3" /> Clear
        </button>
      )}
      <span className="ml-auto text-[11px] text-muted-foreground">
        {activeExam
          ? "Sections not mapped to this exam are collapsed below."
          : "Showing all sections across all exams."}
      </span>
    </div>
  );
};

export default TopicExamFilterBar;

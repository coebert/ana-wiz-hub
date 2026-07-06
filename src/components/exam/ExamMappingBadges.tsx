import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";
import { ExamTag } from "@/data/curriculum";
import { useShouldRenderExamBadge } from "@/components/exam/ExamBadgeDedupeContext";


const EXAM_LABELS: Record<ExamTag, string> = {
  primary: "FRCA Primary",
  final: "FRCA Final",
  fficm: "FFICM",
  edic: "EDIC",
};

const EXAM_CLASSES: Record<ExamTag, string> = {
  // Use semantic tokens; vary by exam for quick visual scanning
  primary: "bg-physiology/15 text-physiology border-physiology/30 hover:bg-physiology/25",
  final: "bg-pharmacology/15 text-pharmacology border-pharmacology/30 hover:bg-pharmacology/25",
  fficm: "bg-icu/15 text-icu border-icu/30 hover:bg-icu/25",
  edic: "bg-clinical/15 text-clinical border-clinical/30 hover:bg-clinical/25",
};

interface ExamMappingBadgesProps {
  /** Which exams this subsection maps to. Order is preserved. */
  exams: ExamTag[];
  /** Optional curriculum reference codes (e.g. "CC1.10", "11A04"). */
  curriculumCodes?: string[];
  /** Optional short label, defaults to "Maps to". */
  label?: string;
  className?: string;
}

/**
 * Compact per-section curriculum mapping. Use at the TOP of each subsection
 * inside `coreConcepts` (or under any block) to show which FRCA / FFICM /
 * EDIC exams the section is relevant to, plus optional curriculum codes.
 */
export const ExamMappingBadges = ({
  exams,
  curriculumCodes,
  label = "Maps to",
  className = "",
}: ExamMappingBadgesProps) => {
  if (exams.length === 0 && (!curriculumCodes || curriculumCodes.length === 0)) {
    return null;
  }

  // De-duplicate while preserving order
  const seen = new Set<ExamTag>();
  const uniqueExams = exams.filter((e) => (seen.has(e) ? false : (seen.add(e), true)));

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 mb-3 ${className}`}
      aria-label={`${label}: ${uniqueExams.map((e) => EXAM_LABELS[e]).join(", ")}`}
    >
      <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mr-1">
        <GraduationCap className="h-3.5 w-3.5" aria-hidden />
        <span>{label}</span>
      </div>
      {uniqueExams.map((exam) => (
        <Badge
          key={exam}
          variant="outline"
          className={`text-[10px] font-semibold uppercase tracking-wide ${EXAM_CLASSES[exam]}`}
        >
          {EXAM_LABELS[exam]}
        </Badge>
      ))}
      {curriculumCodes?.map((code) => (
        <Badge
          key={`code-${code}`}
          variant="outline"
          className="text-[10px] font-mono font-semibold border-border/70 text-muted-foreground bg-background"
          title="Curriculum reference"
        >
          {code}
        </Badge>
      ))}
    </div>
  );
};

export default ExamMappingBadges;

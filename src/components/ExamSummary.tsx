import { useMemo } from "react";
import { GraduationCap, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Exam, ExamTag } from "@/data/curriculum";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { cn } from "@/lib/utils";

const EXAM_LABELS: Record<ExamTag, string> = {
  primary: "FRCA Primary",
  final: "FRCA Final",
  fficm: "FFICM",
  edic: "EDIC",
};

const EXAM_DESCRIPTIONS: Record<ExamTag, string> = {
  primary: "Basic sciences — physics, physiology, pharmacology underpinning practice.",
  final: "Advanced clinical anaesthesia, applied physiology and case-based decision making.",
  fficm: "Intensive care medicine — critical care delivery, organ support and ethics.",
  edic: "European Diploma in Intensive Care — pan-European critical care syllabus.",
};

const EXAM_TONE: Record<ExamTag, string> = {
  primary: "border-physiology/40 bg-physiology/5",
  final: "border-pharmacology/40 bg-pharmacology/5",
  fficm: "border-icu/40 bg-icu/5",
  edic: "border-clinical/40 bg-clinical/5",
};

const EXAM_BADGE: Record<ExamTag, string> = {
  primary: "bg-physiology/15 text-physiology border-physiology/30",
  final: "bg-pharmacology/15 text-pharmacology border-pharmacology/30",
  fficm: "bg-icu/15 text-icu border-icu/30",
  edic: "bg-clinical/15 text-clinical border-clinical/30",
};

type SectionKey = "objectives" | "diagrams" | "workedExamples" | "keyPoints";

const SECTION_LABELS: Record<SectionKey, string> = {
  objectives: "Learning Objectives",
  diagrams: "Diagrams & Visualisations",
  workedExamples: "Worked Examples",
  keyPoints: "Key Learning Points",
};

const SECTION_ANCHORS: Record<SectionKey, string> = {
  objectives: "objectives",
  diagrams: "diagrams",
  workedExamples: "worked-examples",
  keyPoints: "key-points",
};

type SectionExamMap = { exams: ExamTag[]; curriculumCodes?: string[] };

export interface ExamSummaryMapping {
  objectives?: SectionExamMap;
  diagrams?: SectionExamMap;
  workedExamples?: SectionExamMap;
  keyPoints?: SectionExamMap;
}

interface ExamSummaryProps {
  /** Topic title for context. */
  title: string;
  /** Per-section exam mapping passed to TopicTemplate. */
  sectionExamMapping?: ExamSummaryMapping;
  /** Topic-level key learning points to surface tailored takeaways. */
  keyPoints: string[];
}

/**
 * End-of-topic exam-specific summary. Consolidates the per-section
 * `sectionExamMapping` into a single "what does this topic cover for each
 * exam?" view, with anchor links back into the page. When an exam filter is
 * active, the matching exam's panel is highlighted and the others collapsed
 * into chips.
 */
export const ExamSummary = ({
  title,
  sectionExamMapping,
  keyPoints,
}: ExamSummaryProps) => {
  const { activeExam, setActiveExam } = useExamFilter();

  // Build exam → sections that map to it.
  const examToSections = useMemo(() => {
    const map = new Map<ExamTag, SectionKey[]>();
    if (!sectionExamMapping) return map;
    (Object.keys(sectionExamMapping) as SectionKey[]).forEach((sectionKey) => {
      const entry = sectionExamMapping[sectionKey];
      if (!entry) return;
      entry.exams.forEach((exam) => {
        const list = map.get(exam) ?? [];
        if (!list.includes(sectionKey)) list.push(sectionKey);
        map.set(exam, list);
      });
    });
    return map;
  }, [sectionExamMapping]);

  const examsCovered = useMemo(
    () => Array.from(examToSections.keys()),
    [examToSections],
  );

  // Nothing to show if the topic has no exam mapping at all.
  if (examsCovered.length === 0) return null;

  // Order: Primary → Final → FFICM → EDIC for consistency.
  const order: ExamTag[] = [Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC];
  const sortedExams = order.filter((e) => examsCovered.includes(e));

  // When an exam filter is active and present in the topic, lead with it.
  const leadExam =
    activeExam && examsCovered.includes(activeExam) ? activeExam : sortedExams[0];

  return (
    <section
      id="exam-summary"
      aria-labelledby="exam-summary-heading"
      className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
    >
      <header className="px-5 py-4 border-b border-border bg-muted/30">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden />
              Exam-tailored summary
            </div>
            <h2
              id="exam-summary-heading"
              className="text-xl font-serif font-bold text-foreground mt-1"
            >
              What "{title}" covers for each exam
            </h2>
          </div>
          {/* Exam selector chips — drives the global filter so the rest of the
              page also re-tunes. */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveExam(null)}
              className={cn(
                "text-[11px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-full border transition-colors",
                activeExam === null
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:bg-muted",
              )}
              aria-pressed={activeExam === null}
            >
              All
            </button>
            {sortedExams.map((exam) => {
              const isActive = activeExam === exam;
              return (
                <button
                  key={exam}
                  type="button"
                  onClick={() => setActiveExam(isActive ? null : exam)}
                  aria-pressed={isActive}
                  className={cn(
                    "text-[11px] uppercase tracking-wide font-semibold px-2.5 py-1 rounded-full border transition-colors",
                    isActive
                      ? EXAM_BADGE[exam]
                      : "bg-background text-muted-foreground border-border hover:bg-muted",
                  )}
                >
                  {EXAM_LABELS[exam]}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="p-5 space-y-5">
        {/* Lead panel — the active or first exam in detail */}
        {leadExam && (
          <ExamPanel
            exam={leadExam}
            sections={examToSections.get(leadExam) ?? []}
            sectionExamMapping={sectionExamMapping}
            keyPoints={keyPoints}
            isLead
          />
        )}

        {/* Other exams condensed */}
        {sortedExams.filter((e) => e !== leadExam).length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Also relevant for
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {sortedExams
                .filter((e) => e !== leadExam)
                .map((exam) => (
                  <ExamPanel
                    key={exam}
                    exam={exam}
                    sections={examToSections.get(exam) ?? []}
                    sectionExamMapping={sectionExamMapping}
                    keyPoints={keyPoints}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

interface ExamPanelProps {
  exam: ExamTag;
  sections: SectionKey[];
  sectionExamMapping?: ExamSummaryMapping;
  keyPoints: string[];
  isLead?: boolean;
}

const ExamPanel = ({
  exam,
  sections,
  sectionExamMapping,
  keyPoints,
  isLead,
}: ExamPanelProps) => {
  // Curriculum codes aggregated across the sections that map to this exam.
  const codes = useMemo(() => {
    if (!sectionExamMapping) return [];
    const set = new Set<string>();
    sections.forEach((s) => {
      sectionExamMapping[s]?.curriculumCodes?.forEach((c) => set.add(c));
    });
    return Array.from(set);
  }, [sections, sectionExamMapping]);

  // For the lead panel, surface the topic's key points as the headline takeaways
  // — the keyPoints block is the canonical "must remember" list. We only show
  // them in detail for the lead panel to avoid duplication.
  const showTakeaways = isLead && keyPoints.length > 0;

  return (
    <div
      className={cn(
        "rounded-lg border-l-4 border border-border p-4",
        EXAM_TONE[exam],
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div>
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] font-semibold uppercase tracking-wide",
              EXAM_BADGE[exam],
            )}
          >
            {EXAM_LABELS[exam]}
          </Badge>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            {EXAM_DESCRIPTIONS[exam]}
          </p>
        </div>
        {codes.length > 0 && (
          <div className="flex flex-wrap gap-1 max-w-[55%] justify-end">
            {codes.map((code) => (
              <Badge
                key={code}
                variant="outline"
                className="text-[10px] font-mono font-semibold border-border/70 text-muted-foreground bg-background"
                title="Curriculum reference"
              >
                {code}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Sections that count for this exam, with jump-back links */}
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
          Sections in scope
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {sections.map((s) => (
            <li key={s}>
              <a
                href={`#${SECTION_ANCHORS[s]}`}
                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
              >
                {SECTION_LABELS[s]}
                <ArrowUpRight className="h-3 w-3 text-muted-foreground" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {showTakeaways && (
        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
            Headline takeaways
          </p>
          <ul className="space-y-1.5">
            {keyPoints.slice(0, 5).map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground leading-relaxed">
                <CheckCircle2
                  className="h-4 w-4 mt-0.5 shrink-0 text-foreground/60"
                  aria-hidden
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {keyPoints.length > 5 && (
            <a
              href={`#${SECTION_ANCHORS.keyPoints}`}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
            >
              See all {keyPoints.length} key learning points
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamSummary;

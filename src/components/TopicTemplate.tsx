import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SectionLayout } from "@/components/SectionLayout";
import { LearningObjectives } from "@/components/LearningObjectives";
import { KeyLearningPoints, KeyPoint } from "@/components/KeyLearningPoints";
import { WorkedExamples, WorkedExample } from "@/components/WorkedExamples";
import { QuizSection } from "@/components/QuizSection";
import { ReferencesList } from "@/components/ReferencesList";
import { SectionReferences } from "@/components/SectionReferences";
import { SeeAlso } from "@/components/SeeAlso";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { ReportInaccuracyDialog } from "@/components/ReportInaccuracyDialog";
import { ExamMappingBadges } from "@/components/ExamMappingBadges";
import { TopicExamFilterBar } from "@/components/TopicExamFilterBar";
import { LazyDiagrams } from "@/components/LazyDiagrams";
import { ExamSummary } from "@/components/ExamSummary";
import { TopicPodcastPlayer } from "@/components/TopicPodcastPlayer";
import VivaLauncher from "@/components/VivaLauncher";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ExamTag } from "@/data/curriculum";
import { topicReferences } from "@/data/references";

type SectionExamMap = { exams: ExamTag[]; curriculumCodes?: string[] };

/**
 * Returns true if the block is visible under the current exam filter.
 * Blocks without a `sectionExamMapping` entry are always shown (we can't
 * judge their relevance), so the filter only ever HIDES explicitly mapped
 * blocks that don't match.
 */
const blockMatches = (mapping: SectionExamMap | undefined, active: ExamTag | null) =>
  !active || !mapping || mapping.exams.includes(active);

interface TopicTemplateProps {
  // SectionLayout props
  title: string;
  subtitle: string;
  backPath?: string;
  backLabel?: string;
  accentColor?: string;
  disableAutoTOC?: boolean;

  // Required structural blocks
  /** 3–6 short, action-led objectives shown at the top of every topic. */
  objectives: string[];
  /** "Core Concepts" — the main teaching content, organised into sections. */
  coreConcepts: ReactNode;
  /**
   * "Key Learning Points" — final summary bullets. Each entry can be a
   * plain string OR `{ text, cites }` for inline numeric citations.
   */
  keyPoints: KeyPoint[];

  // Optional structural blocks
  /** "Diagrams & Visualisations" — interactive diagrams/animations. */
  diagrams?: ReactNode;
  /** "Worked Examples" — clinical vignettes and/or calculations. Omit when not relevant. */
  workedExamples?: WorkedExample[];

  /**
   * Per-section reference mapping. Each key pins a list of reference labels
   * (must exist in `topicReferences[topicId]`) to a section so learners can
   * see exactly which BJA Education / guideline / textbook sources support
   * that block. All keys are optional.
   */
  sectionSources?: {
    objectives?: string[];
    diagrams?: string[];
    workedExamples?: string[];
    keyPoints?: string[];
  };

  /**
   * Per-section curriculum exam mapping. Renders a small `ExamMappingBadges`
   * row at the TOP of each block so learners see at a glance whether the
   * subsection is FRCA Primary / Final / FFICM / EDIC relevant. All keys
   * optional. Inside `coreConcepts`, drop `<ExamMappingBadges />` directly
   * at the top of each `<section>`.
   */
  sectionExamMapping?: {
    objectives?: SectionExamMap;
    diagrams?: SectionExamMap;
    workedExamples?: SectionExamMap;
    keyPoints?: SectionExamMap;
  };

  // Footer wiring (kept in current order)
  topicId: string;
  topicTitle?: string;
  /** Quiz questions in the format expected by QuizSection. */
  quizQuestions?: unknown[];
}

/**
 * Standardised topic page template. All audited topics should use this so
 * the curriculum reads consistently:
 *   1. Learning Objectives
 *   2. Core Concepts (free-form sections)
 *   3. Diagrams & Visualisations (optional)
 *   4. Worked Examples (optional)
 *   5. Summary / Key Learning Points
 *   6. Quiz → References → See Also → Completion
 */
export const TopicTemplate = ({
  title,
  subtitle,
  backPath,
  backLabel,
  accentColor,
  disableAutoTOC,
  objectives,
  coreConcepts,
  keyPoints,
  diagrams,
  workedExamples,
  sectionSources,
  sectionExamMapping,
  topicId,
  topicTitle,
  quizQuestions,
}: TopicTemplateProps) => {
  const { activeExam } = useExamFilter();

  // Auto-derive section sources from inline `cites` arrays so authors don't
  // have to maintain a parallel `sectionSources` map. Explicit props always
  // win; auto-derivation only fills the gap when a key is omitted. Order
  // follows the master `topicReferences` list so the per-section panel
  // numbers match the bottom References list.
  const masterOrder = topicReferences[topicId] ?? [];
  const sortByMaster = (labels: string[]) => {
    const set = new Set(labels);
    const ordered = masterOrder.filter((r) => set.has(r.label)).map((r) => r.label);
    // Append any labels not present in the master list (will be ignored
    // downstream by SectionReferences with a dev-only warning).
    const extras = labels.filter((l) => !ordered.includes(l));
    return [...ordered, ...extras];
  };
  const uniq = (arr: string[]) => Array.from(new Set(arr));
  const autoKeyPointCites = sortByMaster(
    uniq(keyPoints.flatMap((p) => (typeof p === "string" ? [] : p.cites ?? []))),
  );
  const autoWorkedExampleCites = sortByMaster(
    uniq((workedExamples ?? []).flatMap((ex) => ex.cites ?? [])),
  );

  const resolvedSources = {
    objectives: sectionSources?.objectives,
    diagrams: sectionSources?.diagrams,
    workedExamples:
      sectionSources?.workedExamples ??
      (autoWorkedExampleCites.length > 0 ? autoWorkedExampleCites : undefined),
    keyPoints:
      sectionSources?.keyPoints ??
      (autoKeyPointCites.length > 0 ? autoKeyPointCites : undefined),
  };

  const showObjectives = blockMatches(sectionExamMapping?.objectives, activeExam);
  const showDiagrams = blockMatches(sectionExamMapping?.diagrams, activeExam);
  const showWorkedExamples = blockMatches(sectionExamMapping?.workedExamples, activeExam);
  const showKeyPoints = blockMatches(sectionExamMapping?.keyPoints, activeExam);

  const location = useLocation();
  const learningResourceJsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: title,
    description: subtitle,
    url: `https://anaesthesiacore.app${location.pathname}`,
    inLanguage: "en-GB",
    educationalLevel: "Postgraduate",
    learningResourceType: "Topic",
    teaches: title,
    isPartOf: { "@type": "WebSite", name: "AnaesthesiaCore", url: "https://anaesthesiacore.app/" },
    author: { "@type": "Person", name: "Dr Rob Coe" },
    publisher: { "@type": "Organization", name: "AnaesthesiaCore", url: "https://anaesthesiacore.app/" },
  };

  // Build a richer meta description so individual topic pages clear the
  // 50-char SEO floor (subtitles like "FRCA Primary — Physics" alone are
  // ~30 chars). We pull the first 1–2 learning objectives, fall back to
  // key points, and prefix with the curriculum tag from `subtitle`.
  const objectiveBlurb = objectives.slice(0, 2).join(". ").replace(/\.\.$/, ".");
  const keyPointBlurb = keyPoints
    .slice(0, 2)
    .map((p) => (typeof p === "string" ? p : p.text))
    .join(". ")
    .replace(/\.\.$/, ".");
  const blurb = objectiveBlurb || keyPointBlurb;
  const metaDescription = blurb
    ? `${title} (${subtitle}). ${blurb}`.replace(/\s+/g, " ").trim()
    : undefined;

  return (
    <SectionLayout
      title={title}
      subtitle={subtitle}
      backPath={backPath}
      backLabel={backLabel}
      accentColor={accentColor}
      disableAutoTOC={disableAutoTOC}
      metaDescription={metaDescription}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(learningResourceJsonLd)}</script>
      </Helmet>
      <div className="space-y-8 sm:space-y-10">
        <TopicExamFilterBar />
        <TopicPodcastPlayer topicId={topicId} topicTitle={topicTitle ?? title} />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3 sm:px-4 py-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
              Viva voce practice
            </p>
            <p className="text-sm text-foreground leading-tight break-words">
              Spoken question · live transcription · constructive AI feedback.
            </p>
          </div>
          <VivaLauncher
            topicId={topicId}
            topicTitle={topicTitle ?? title}
            topicDescription={subtitle}
          />
        </div>
        {showObjectives && (
          <div id="objectives" className="scroll-mt-24">
            {sectionExamMapping?.objectives && (
              <ExamMappingBadges
                exams={sectionExamMapping.objectives.exams}
                curriculumCodes={sectionExamMapping.objectives.curriculumCodes}
              />
            )}
            <LearningObjectives objectives={objectives} />
            {resolvedSources.objectives && resolvedSources.objectives.length > 0 && (
              <SectionReferences
                topicId={topicId}
                refLabels={resolvedSources.objectives}
                heading="Sources for these objectives"
                dense
                targetId="objectives"
                targetLabel="Jump to objectives"
              />
            )}
          </div>
        )}

        <section className="space-y-8">{coreConcepts}</section>

        {diagrams && showDiagrams && (
          <section id="diagrams" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              Diagrams &amp; Visualisations
            </h2>
            {sectionExamMapping?.diagrams && (
              <ExamMappingBadges
                exams={sectionExamMapping.diagrams.exams}
                curriculumCodes={sectionExamMapping.diagrams.curriculumCodes}
              />
            )}
            <LazyDiagrams>
              <div className="space-y-6">{diagrams}</div>
            </LazyDiagrams>
            {resolvedSources.diagrams && resolvedSources.diagrams.length > 0 && (
              <SectionReferences
                topicId={topicId}
                refLabels={resolvedSources.diagrams}
                heading="Sources for these diagrams"
                targetId="diagrams"
                targetLabel="Jump to diagrams"
              />
            )}
          </section>
        )}

        {workedExamples && workedExamples.length > 0 && showWorkedExamples && (
          <div id="worked-examples" className="scroll-mt-24">
            {sectionExamMapping?.workedExamples && (
              <ExamMappingBadges
                exams={sectionExamMapping.workedExamples.exams}
                curriculumCodes={sectionExamMapping.workedExamples.curriculumCodes}
              />
            )}
            <WorkedExamples examples={workedExamples} topicId={topicId} />
            {resolvedSources.workedExamples && resolvedSources.workedExamples.length > 0 && (
              <SectionReferences
                topicId={topicId}
                refLabels={resolvedSources.workedExamples}
                heading="Sources for these examples"
                dense
                targetId="worked-examples"
                targetLabel="Jump to examples"
              />
            )}
          </div>
        )}

        {showKeyPoints && (
          <div id="key-points" className="scroll-mt-24">
            {sectionExamMapping?.keyPoints && (
              <ExamMappingBadges
                exams={sectionExamMapping.keyPoints.exams}
                curriculumCodes={sectionExamMapping.keyPoints.curriculumCodes}
              />
            )}
            <KeyLearningPoints points={keyPoints} topicId={topicId} />
            {resolvedSources.keyPoints && resolvedSources.keyPoints.length > 0 && (
              <SectionReferences
                topicId={topicId}
                refLabels={resolvedSources.keyPoints}
                heading="Sources for these key points"
                dense
                targetId="key-points"
                targetLabel="Jump to key points"
              />
            )}
          </div>
        )}

        {quizQuestions && quizQuestions.length > 0 && (
          // QuizSection's prop is loosely typed across the codebase; cast here.
          <QuizSection questions={quizQuestions as never} />
        )}
        <ExamSummary
          title={title}
          sectionExamMapping={sectionExamMapping}
          keyPoints={keyPoints.map((p) =>
            typeof p === "string"
              ? p
              : typeof p.text === "string"
                ? p.text
                : "",
          )}
        />
        <ReferencesList topicId={topicId} />
        <SeeAlso topicId={topicId} />
        <TopicCompletionToggle topicId={topicId} topicTitle={topicTitle ?? title} />
        <div className="flex justify-end pt-2 -mt-2">
          <ReportInaccuracyDialog topicId={topicId} topicTitle={topicTitle ?? title} />
        </div>
      </div>
    </SectionLayout>
  );
};

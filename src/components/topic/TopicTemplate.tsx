import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { LearningObjectives } from "@/components/topic/LearningObjectives";
import { KeyLearningPoints, KeyPoint } from "@/components/topic/KeyLearningPoints";
import { WorkedExamples, WorkedExample } from "@/components/topic/WorkedExamples";
import { QuizSection } from "@/components/quiz/QuizSection";
import { ReferencesList } from "@/components/references/ReferencesList";
import { SectionReferences } from "@/components/topic/SectionReferences";
import { SeeAlso } from "@/components/topic/SeeAlso";
import { RelatedCases } from "@/components/topic/RelatedCases";
import { TopicDiscussion } from "@/components/topic/TopicDiscussion";
import { TopicCompletionToggle } from "@/components/topic/TopicCompletionToggle";
import { ReportInaccuracyDialog } from "@/components/feedback/ReportInaccuracyDialog";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamBadgeDedupeProvider } from "@/components/exam/ExamBadgeDedupeContext";
import {
  TopicOverrideBlocks,
  TopicOverrideKeyPoints,
  TopicOverrideReferences,
} from "@/components/topic/TopicOverrides";
import { useLiveContentOverrides } from "@/hooks/useContentOverrides";


import { LazyDiagrams } from "@/components/topic/LazyDiagrams";
import { ExamSummary } from "@/components/exam/ExamSummary";
import { TopicPodcastPlayer } from "@/components/topic/TopicPodcastPlayer";
import VivaLauncher from "@/components/viva/VivaLauncher";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { useRecordRecentTopic } from "@/hooks/useRecentTopics";
import { useTrackStudyTime } from "@/hooks/useStudyTime";
import { ExamTag } from "@/data/curriculum";
import { topicReferences } from "@/data/references";
import { allTopics, sectionMeta } from "@/data/curriculum";
import { topicSeo } from "@/data/topicSeo";

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
  useRecordRecentTopic(topicId);
  useTrackStudyTime(topicId);
  // Admin-published edits layered on top of the built-in page content.
  const liveEdits = useLiveContentOverrides(topicId);


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
  const computedDescription = blurb
    ? `${title} (${subtitle}). ${blurb}`.replace(/\s+/g, " ").trim()
    : undefined;

  // Per-topic SEO overrides (keyword-tuned title/description + MedicalWebPage
  // JSON-LD with `alternateName` aliases). Falls back gracefully when no
  // entry exists for this topic.
  const seo = topicSeo[topicId];
  const metaDescription = seo?.description ?? computedDescription;
  const canonicalUrl = `https://anaesthesiacore.app${location.pathname}`;
  const medicalWebPageJsonLd = seo
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: seo.title ?? title,
        url: canonicalUrl,
        about: {
          "@type": "MedicalEntity",
          name: title,
          alternateName: seo.aliases,
        },
        audience: { "@type": "MedicalAudience", audienceType: "Anaesthetist" },
        inLanguage: "en-GB",
        ...(seo.keywords ? { keywords: seo.keywords.join(", ") } : {}),
        isPartOf: { "@type": "WebSite", name: "AnaesthesiaCore", url: "https://anaesthesiacore.app/" },
      }
    : null;

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
        {(() => {
          const fallbackTitle = `${topicTitle ?? title} | AnaesthesiaCore`;
          const effectiveTitle = seo?.title ?? fallbackTitle;
          return (
            <>
              <title>{effectiveTitle}</title>
              <meta property="og:title" content={effectiveTitle} />
              <meta property="og:description" content={metaDescription} />
              <meta property="og:url" content={canonicalUrl} />
              <meta name="twitter:title" content={effectiveTitle} />
              <meta name="twitter:description" content={metaDescription} />
            </>

          );
        })()}
        <script type="application/ld+json">{JSON.stringify(learningResourceJsonLd)}</script>
        {medicalWebPageJsonLd && (
          <script type="application/ld+json">{JSON.stringify(medicalWebPageJsonLd)}</script>
        )}
        {(() => {
          const topicMeta = allTopics.find((t) => t.id === topicId);
          const section = topicMeta ? sectionMeta[topicMeta.section] : null;
          const breadcrumbItems: Array<{ name: string; item: string }> = [
            { name: "Home", item: "https://anaesthesiacore.app/" },
          ];
          if (section) {
            breadcrumbItems.push({
              name: section.label,
              item: `https://anaesthesiacore.app${section.path}`,
            });
          }
          breadcrumbItems.push({ name: title, item: canonicalUrl });
          const breadcrumbJsonLd = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((b, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: b.name,
              item: b.item,
            })),
          };
          return (
            <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
          );
        })()}
      </Helmet>
      <ExamBadgeDedupeProvider>
      <div className="space-y-8 sm:space-y-10">

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

        <TopicOverrideBlocks blocks={liveEdits.blocks} />


        {diagrams && showDiagrams && (
          <section id="diagrams" className="scroll-mt-24">
            <h2 className="h2 mb-4">
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
            <TopicOverrideKeyPoints points={liveEdits.keyPoints} />

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

        {quizQuestions && quizQuestions.length > 0 && (() => {
          const topicMeta = allTopics.find((t) => t.id === topicId);
          const srs = topicMeta
            ? {
                topicId,
                topicTitle: topicTitle ?? title,
                topicSection: topicMeta.section,
                examTags: topicMeta.examTags as string[],
              }
            : undefined;
          // QuizSection's prop is loosely typed across the codebase; cast here.
          return <QuizSection questions={quizQuestions as never} srs={srs} />;
        })()}
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
        <TopicOverrideReferences refs={liveEdits.references} />

        <RelatedCases topicId={topicId} />
        <SeeAlso topicId={topicId} />
        <TopicCompletionToggle topicId={topicId} topicTitle={topicTitle ?? title} />
        <TopicDiscussion topicId={topicId} topicTitle={topicTitle ?? title} />
        <div className="flex justify-end pt-2 -mt-2">
          <ReportInaccuracyDialog topicId={topicId} topicTitle={topicTitle ?? title} />
        </div>
      </div>
      </ExamBadgeDedupeProvider>
    </SectionLayout>

  );
};

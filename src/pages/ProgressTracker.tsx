import { useMemo, useState } from "react";
import { PageSection } from "@/components/layout/PageSection";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Atom,
  Heart,
  FlaskConical,
  Bone,
  Stethoscope,
  Activity,
  ClipboardList,
  Beaker,
  CheckCircle2,
  Circle,
  Trophy,
  GraduationCap,
} from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { ProgressRing } from "@/components/shared/ProgressRing";
import {
  Section,
  ExamTag,
  Exam,
  topicsBySection,
} from "@/data/curriculum";

type ExamFilter = "all" | ExamTag;

const examFilters: { label: string; value: ExamFilter; description: string }[] = [
  { label: "All", value: "all", description: "Every available topic across all curricula" },
  { label: "Primary FRCA", value: Exam.PRIMARY, description: "Topics tagged for the FRCA Primary syllabus" },
  { label: "Final FRCA", value: Exam.FINAL, description: "Topics tagged for the FRCA Final syllabus" },
  { label: "FFICM", value: Exam.FFICM, description: "Topics tagged for the FFICM syllabus" },
  { label: "EDIC", value: Exam.EDIC, description: "Topics tagged for the European Diploma in Intensive Care" },
];

const sectionMeta: {
  key: Section;
  title: string;
  path: string;
  icon: typeof Atom;
  iconColor: string;
  cardClass: string;
}[] = [
  { key: "physics", title: "Physics", path: "/physics", icon: Atom, iconColor: "text-physics", cardClass: "section-card-physics" },
  { key: "physiology", title: "Physiology", path: "/physiology", icon: Heart, iconColor: "text-physiology", cardClass: "section-card-physiology" },
  { key: "pharmacology", title: "Pharmacology", path: "/pharmacology", icon: FlaskConical, iconColor: "text-pharmacology", cardClass: "section-card-pharmacology" },
  { key: "anatomy", title: "Anatomy", path: "/anatomy", icon: Bone, iconColor: "text-anatomy", cardClass: "section-card-anatomy" },
  { key: "clinical", title: "Clinical Anaesthesia", path: "/clinical", icon: Stethoscope, iconColor: "text-clinical", cardClass: "section-card-clinical" },
  { key: "intensive-care", title: "Intensive Care", path: "/intensive-care", icon: Activity, iconColor: "text-icu", cardClass: "section-card-intensive-care" },
  { key: "perioperative", title: "Perioperative Medicine", path: "/perioperative", icon: ClipboardList, iconColor: "text-perioperative", cardClass: "section-card-perioperative" },
  { key: "chemistry", title: "Chemistry Foundations", path: "/chemistry", icon: Beaker, iconColor: "text-chemistry", cardClass: "section-card-chemistry" },
];

const pct = (c: number, t: number) => (t > 0 ? Math.round((c / t) * 100) : 0);

const ProgressTracker = () => {
  const { isCompleted, getOverallProgress, getExamProgress, getSectionProgress, getExamSectionProgress } =
    useProgress();
  const [activeFilter, setActiveFilter] = useState<ExamFilter>("all");

  // Header summary cards always show all curricula side-by-side, regardless of filter.
  const summary = useMemo(
    () => ({
      all: getOverallProgress(),
      primary: getExamProgress(Exam.PRIMARY),
      final: getExamProgress(Exam.FINAL),
      fficm: getExamProgress(Exam.FFICM),
      edic: getExamProgress(Exam.EDIC),
    }),
    [getOverallProgress, getExamProgress]
  );

  const summaryTiles: { key: ExamFilter; label: string; data: { completed: number; total: number } }[] = [
    { key: "all", label: "Overall", data: summary.all },
    { key: Exam.PRIMARY, label: "Primary", data: summary.primary },
    { key: Exam.FINAL, label: "Final", data: summary.final },
    { key: Exam.FFICM, label: "FFICM", data: summary.fficm },
    { key: Exam.EDIC, label: "EDIC", data: summary.edic },
  ];

  const visibleSections = useMemo(() => {
    return sectionMeta
      .map((s) => {
        const progress =
          activeFilter === "all"
            ? getSectionProgress(s.key)
            : getExamSectionProgress(activeFilter, s.key);
        const topics = (topicsBySection[s.key] || []).filter(
          (t) => t.available && (activeFilter === "all" || t.examTags.includes(activeFilter))
        );
        return { ...s, progress, topics };
      })
      .filter((s) => s.topics.length > 0);
  }, [activeFilter, getSectionProgress, getExamSectionProgress]);

  const activeSummary =
    activeFilter === "all" ? summary.all : summary[activeFilter];
  const activeLabel = examFilters.find((f) => f.value === activeFilter)?.label ?? "Overall";
  const activeDescription = examFilters.find((f) => f.value === activeFilter)?.description ?? "";

  return (
    <PageSection spacing="default" width="xwide">
      <Helmet>
        <title>Your Topic Progress – AnaesthesiaCore</title>
        <meta name="description" content="Track your FRCA Primary, Final and FFICM revision progress topic-by-topic. Completion saves locally across every section of AnaesthesiaCore." />
        <link rel="canonical" href="https://anaesthesiacore.app/progress" />
        <meta property="og:title" content="Your Topic Progress – AnaesthesiaCore" />
        <meta property="og:description" content="Track FRCA Primary, Final and FFICM revision progress topic-by-topic across anaesthesia and intensive care." />
        <meta property="og:url" content="https://anaesthesiacore.app/progress" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Your Topic Progress – AnaesthesiaCore" />
        <meta name="twitter:description" content="Track FRCA & FFICM revision progress topic-by-topic." />
      </Helmet>
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <GraduationCap className="h-4 w-4" />
          <span>Progress dashboard</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
          Your topic progress
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Track completion across the FRCA Primary, Final, and FFICM curricula. Mark topics complete from any topic page — your progress saves locally.
        </p>
      </div>

      {/* Per-exam summary tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {summaryTiles.map((tile) => {
          const isActive = activeFilter === tile.key;
          const percent = pct(tile.data.completed, tile.data.total);
          return (
            <button
              key={tile.key}
              onClick={() => setActiveFilter(tile.key)}
              className={`text-left rounded-xl border p-4 transition-all ${
                isActive
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {tile.label}
                </span>
                {percent === 100 && tile.data.total > 0 && (
                  <Trophy className="h-3.5 w-3.5 text-accent" aria-label="Completed" />
                )}
              </div>
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-2xl font-bold text-foreground">{percent}%</span>
                <span className="text-xs text-muted-foreground">
                  {tile.data.completed}/{tile.data.total}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active filter context */}
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-xl font-serif font-bold text-foreground">
            {activeLabel} breakdown
          </h2>
          <p className="text-sm text-muted-foreground">{activeDescription}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{activeSummary.completed}</span> of{" "}
          <span className="font-semibold text-foreground">{activeSummary.total}</span> topics complete
        </div>
      </div>

      {/* Per-section breakdown */}
      <div className="space-y-4">
        {visibleSections.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
            No topics tagged for this exam yet.
          </div>
        )}
        {visibleSections.map((s) => {
          const percent = pct(s.progress.completed, s.progress.total);
          return (
            <details
              key={s.key}
              className={`${s.cardClass} group rounded-xl border border-border bg-card overflow-hidden`}
            >
              <summary className="flex items-center gap-4 p-4 cursor-pointer list-none hover:bg-muted/30 transition-colors">
                <s.icon className={`h-7 w-7 shrink-0 ${s.iconColor}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <h3 className="font-serif font-bold text-foreground truncate">{s.title}</h3>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {s.progress.completed}/{s.progress.total} · {percent}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percent === 100 ? "bg-accent" : "bg-primary"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
                <ProgressRing
                  completed={s.progress.completed}
                  total={s.progress.total}
                  size={40}
                  strokeWidth={3}
                />
              </summary>

              {/* Topic list */}
              <ul className="divide-y divide-border border-t border-border">
                {s.topics.map((t) => {
                  const done = isCompleted(t.id);
                  return (
                    <li key={t.id}>
                      <Link
                        to={`${s.path}/${t.id}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/40 transition-colors"
                      >
                        {done ? (
                          <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                        )}
                        <span
                          className={`text-sm flex-1 min-w-0 truncate ${
                            done ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {t.title}
                        </span>
                        <div className="flex gap-1 shrink-0">
                          {t.examTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] uppercase font-medium text-muted-foreground/70 px-1"
                            >
                              {tag === "fficm" ? "FFICM" : tag === "edic" ? "EDIC" : tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </details>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="mt-8 text-xs text-muted-foreground text-center">
        Progress is stored on this device only. Clearing browser data will reset it.
      </p>
    </PageSection>
  );
};

export default ProgressTracker;

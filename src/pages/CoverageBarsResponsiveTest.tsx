import { useState } from "react";
import { ChevronDown, ChevronRight, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Dev/QA-only page. Renders the Viva Question Library's section and topic
 * headers inside fixed-width "device frames" (320 / 375 / 414 px) in both
 * expanded and collapsed states, so clipping of the inline coverage bars is
 * obvious at a glance regardless of the actual browser viewport.
 *
 * Not linked from the main nav — open `/dev/coverage-bars` directly.
 */

const WIDTHS = [320, 375, 414] as const;

// Mirrors the production CoverageBars component. Kept inline (not imported
// from VivaQuestionLibrary) so this preview is self-contained and won't pull
// in the library's data layer / Supabase calls.
const CoverageBars = ({
  questionsPracticed,
  questionsTotal,
  topicsTouched,
  topicsTotal,
  compact = false,
}: {
  questionsPracticed: number;
  questionsTotal: number;
  topicsTouched?: number;
  topicsTotal?: number;
  compact?: boolean;
}) => {
  const qPct = questionsTotal > 0 ? Math.round((questionsPracticed / questionsTotal) * 100) : 0;
  const tPct =
    topicsTotal && topicsTotal > 0 ? Math.round(((topicsTouched ?? 0) / topicsTotal) * 100) : null;

  return (
    <div
      className={`space-y-1 ${compact ? "w-20 sm:w-24" : "w-32 sm:w-40"} shrink-0`}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1.5 cursor-help">
            <Progress value={qPct} className="h-1.5 flex-1 min-w-0" />
            <span className="text-[10px] tabular-nums text-muted-foreground whitespace-nowrap">
              {questionsPracticed}/{questionsTotal} Q
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {questionsPracticed} of {questionsTotal} questions practiced ({qPct}%)
        </TooltipContent>
      </Tooltip>
      {tPct !== null && (
        <div className="flex items-center gap-1.5">
          <Progress value={tPct} className="h-1.5 flex-1 min-w-0 [&>div]:bg-accent" />
          <span className="text-[10px] tabular-nums text-muted-foreground whitespace-nowrap">
            {topicsTouched}/{topicsTotal} T
          </span>
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({
  open,
  label,
  topicCount,
  total,
  practiced,
  topicsTouched,
}: {
  open: boolean;
  label: string;
  topicCount: number;
  total: number;
  practiced: number;
  topicsTouched: number;
}) => (
  <div className="rounded-lg border border-border bg-card overflow-hidden">
    <button
      type="button"
      className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-muted/40 text-left"
    >
      <div className="flex items-center gap-2 min-w-0">
        {open ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
        <h2 className="text-base sm:text-lg font-serif font-bold text-foreground truncate">
          {label}
        </h2>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <CoverageBars
          questionsPracticed={practiced}
          questionsTotal={total}
          topicsTouched={topicsTouched}
          topicsTotal={topicCount}
        />
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {topicCount} topics · {total} questions
        </span>
      </div>
    </button>
  </div>
);

const TopicHeader = ({
  open,
  title,
  itemCount,
  practiced,
}: {
  open: boolean;
  title: string;
  itemCount: number;
  practiced: number;
}) => (
  <div className="rounded-md border border-border/60 bg-background/40 overflow-hidden">
    <div className="flex items-stretch w-full">
      <button
        type="button"
        className="flex-1 flex items-center justify-between gap-3 px-3 py-2 hover:bg-muted/30 text-left min-w-0"
      >
        <div className="flex items-center gap-2 min-w-0">
          {open ? (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          )}
          <span className="text-sm font-semibold text-foreground truncate">{title}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <CoverageBars questionsPracticed={practiced} questionsTotal={itemCount} compact />
          <span className="text-[11px] text-muted-foreground">{itemCount}</span>
        </div>
      </button>
      {practiced > 0 && (
        <button
          type="button"
          className="px-2 my-1 mr-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 flex items-center"
          aria-label="Reset topic"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  </div>
);

// Three sample fixtures ranging from short to deliberately overflowing labels —
// the long ones are the real risk for clipping bars or pushing them off-screen.
const SECTION_FIXTURES = [
  { label: "Physiology", topicCount: 12, total: 48, practiced: 17, topicsTouched: 5 },
  {
    label: "Perioperative Medicine",
    topicCount: 24,
    total: 96,
    practiced: 96,
    topicsTouched: 24,
  },
  {
    label: "Intensive Care & Critical Illness Long Title",
    topicCount: 8,
    total: 32,
    practiced: 0,
    topicsTouched: 0,
  },
];

const TOPIC_FIXTURES = [
  { title: "Oxygen cascade", itemCount: 4, practiced: 2 },
  { title: "Anaesthesia for open and endovascular aortic surgery", itemCount: 7, practiced: 7 },
  {
    title: "Total intravenous anaesthesia (TIVA) — TCI and EEG-guided depth monitoring approaches",
    itemCount: 5,
    practiced: 1,
  },
];

const Frame = ({
  width,
  open,
  variant,
}: {
  width: number;
  open: boolean;
  variant: "section" | "topic";
}) => (
  <div className="space-y-2">
    <div className="text-xs font-medium text-muted-foreground tabular-nums">
      {width}px · {open ? "expanded" : "collapsed"}
    </div>
    <div
      className="border-2 border-dashed border-border rounded-lg overflow-hidden bg-background"
      style={{ width: `${width}px` }}
    >
      <div className="space-y-2 p-2">
        {variant === "section"
          ? SECTION_FIXTURES.map((f, i) => <SectionHeader key={i} open={open} {...f} />)
          : TOPIC_FIXTURES.map((f, i) => <TopicHeader key={i} open={open} {...f} />)}
      </div>
    </div>
  </div>
);

const CoverageBarsResponsiveTest = () => {
  const [variant, setVariant] = useState<"section" | "topic">("section");

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Coverage bars · responsive QA
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Each frame below is rendered at a fixed pixel width (320 / 375 / 414) — common
            small-screen breakpoints. Inspect that the inline progress bars and their counts
            stay fully visible, and that long titles truncate rather than push the bars off
            the right edge.
          </p>
        </header>

        <div className="flex flex-wrap gap-2">
          {(["section", "topic"] as const).map((v) => {
            const active = variant === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                }`}
              >
                {v === "section" ? "Section headers" : "Topic headers"}
              </button>
            );
          })}
        </div>

        {(["expanded", "collapsed"] as const).map((state) => (
          <section key={state} className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {state}
            </h2>
            <div className="flex flex-wrap gap-6 items-start">
              {WIDTHS.map((w) => (
                <Frame key={w} width={w} open={state === "expanded"} variant={variant} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default CoverageBarsResponsiveTest;

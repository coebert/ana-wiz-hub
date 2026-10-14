import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import { PageSection } from "@/components/layout/PageSection";
import {
  sectionMeta,
  topicsBySection,
  type Section,
} from "@/data/curriculum";
import {
  expansionFor,
  SECTION_EXPANSION,
  TOPIC_EXPANSION,
  STATUS_LABEL,
  type ExpansionStatus,
} from "@/data/expansionStatus";

/**
 * Curriculum expansion index: every topic with its expansion status, so the
 * remaining work is visible at a glance. Internal tracking page — noindex.
 */

const SECTION_ORDER: Section[] = [
  "physics",
  "physiology",
  "pharmacology",
  "anatomy",
  "clinical",
  "intensive-care",
  "perioperative",
  "chemistry",
];

const SECTION_ACCENT: Record<Section, string> = {
  physics: "text-physics",
  physiology: "text-physiology",
  pharmacology: "text-pharmacology",
  anatomy: "text-anatomy",
  clinical: "text-clinical",
  "intensive-care": "text-icu",
  perioperative: "text-perioperative",
  chemistry: "text-chemistry",
};

const STATUS_STYLE: Record<
  ExpansionStatus,
  { chip: string; icon: typeof CheckCircle2 }
> = {
  expanded: {
    chip: "border-accent/40 bg-accent/10 text-accent",
    icon: CheckCircle2,
  },
  "in-progress": {
    chip: "border-primary/40 bg-primary/10 text-primary",
    icon: Loader2,
  },
  pending: {
    chip: "border-border bg-surface text-muted-foreground",
    icon: CircleDashed,
  },
};

const FILTERS: { value: ExpansionStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "expanded", label: "Expanded" },
  { value: "in-progress", label: "Section in progress" },
  { value: "pending", label: "Pending review" },
];

const StatusBadge = ({ status }: { status: ExpansionStatus }) => {
  const { chip, icon: Icon } = STATUS_STYLE[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none ${chip}`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {STATUS_LABEL[status]}
    </span>
  );
};

const CurriculumExpansion = () => {
  const [filter, setFilter] = useState<ExpansionStatus | "all">("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const sections = useMemo(
    () =>
      SECTION_ORDER.map((section) => {
        const topics = topicsBySection[section]
          .map((t) => ({ topic: t, entry: expansionFor(section, t.id) }))
          .filter(
            ({ topic, entry }) =>
              (filter === "all" || entry.status === filter) &&
              (q === "" ||
                topic.title.toLowerCase().includes(q) ||
                entry.note.toLowerCase().includes(q)),
          );
        return { section, topics };
      }).filter(({ topics }) => topics.length > 0),
    [filter, q],
  );

  const counts = useMemo(() => {
    const totals: Record<ExpansionStatus, number> = {
      expanded: 0,
      "in-progress": 0,
      pending: 0,
    };
    for (const section of SECTION_ORDER) {
      for (const t of topicsBySection[section]) {
        totals[expansionFor(section, t.id).status] += 1;
      }
    }
    return totals;
  }, []);

  const total =
    counts.expanded + counts["in-progress"] + counts.pending;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <Helmet>
        <title>Curriculum Expansion Status | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Expansion status of every AnaesthesiaCore topic: which topics have checked, source-led teaching and which are still to review."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <PageSection spacing="default" width="full" innerClassName="max-w-5xl mx-auto">
        <header className="mb-8 md:mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Curriculum Expansion Status
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Every topic and where it stands on the depth review. "Expanded"
            means a checked, source-led teaching batch has been added —
            mechanisms, clinical interpretation, evidence limits and learning
            checks. It does not certify every claim in the topic.{" "}
            <Link
              to="/curriculum"
              className="text-primary underline underline-offset-2"
            >
              View the curriculum map
            </Link>
            .
          </p>
        </header>

        {/* Overall progress */}
        <div className="rounded-xl border border-border bg-card p-4 md:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">
              {counts.expanded} of {total} topics expanded
            </p>
            <p className="text-xs text-muted-foreground">
              {counts["in-progress"]} in a section being reviewed ·{" "}
              {counts.pending} pending review
            </p>
          </div>
          <div
            className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-muted"
            role="img"
            aria-label={`${counts.expanded} of ${total} topics expanded`}
          >
            <div
              className="bg-accent"
              style={{ width: `${(counts.expanded / total) * 100}%` }}
            />
            <div
              className="bg-primary/40"
              style={{ width: `${(counts["in-progress"] / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  filter === f.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter topics or notes…"
            aria-label="Filter topics"
            className="w-full sm:w-64 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Sections */}
        <div className="mt-8 flex flex-col gap-8">
          {sections.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              No topics match this filter.
            </p>
          )}
          {sections.map(({ section, topics }) => (
            <section key={section} aria-label={sectionMeta[section].label}>
              <div className="flex items-baseline justify-between gap-3 border-b border-border pb-2">
                <h2
                  className={`font-display text-xl font-semibold ${SECTION_ACCENT[section]}`}
                >
                  {sectionMeta[section].label}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {topics.length} topic{topics.length === 1 ? "" : "s"} shown
                </p>
              </div>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                <StatusBadge status={SECTION_EXPANSION[section].status} />{" "}
                {SECTION_EXPANSION[section].note}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {topics.map(({ topic, entry }) => (
                  <li
                    key={topic.id}
                    className="rounded-lg border border-border bg-card p-3 md:p-4"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <Link
                        to={`${sectionMeta[section].path}/${topic.id}`}
                        className="text-sm md:text-base font-medium text-foreground hover:text-primary hover:underline"
                      >
                        {topic.title}
                      </Link>
                      <StatusBadge status={entry.status} />
                    </div>
                    <p className="mt-1.5 text-xs md:text-sm text-muted-foreground">
                      {TOPIC_EXPANSION[topic.id]
                        ? entry.note
                        : "No topic-specific batch yet — status follows the section."}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Status is recorded in the project's expansion log and updated after
          each checked batch. Nothing here is published as complete while any
          section remains pending.
        </p>
      </PageSection>
    </main>
  );
};

export default CurriculumExpansion;

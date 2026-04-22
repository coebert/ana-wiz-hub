import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Network, ArrowRight, Sparkles } from "lucide-react";
import {
  allTopics,
  topicsBySection,
  sectionMeta,
  Section,
  Topic,
} from "@/data/curriculum";
import { seeAlsoMap } from "@/data/seeAlso";
import { useExamFilter } from "@/contexts/ExamFilterContext";

// Section accent classes — keep in sync with the design tokens used by Header.
const SECTION_ACCENT: Record<Section, string> = {
  physics: "text-physics border-physics/40 bg-physics/5",
  physiology: "text-physiology border-physiology/40 bg-physiology/5",
  pharmacology: "text-pharmacology border-pharmacology/40 bg-pharmacology/5",
  anatomy: "text-foreground border-border bg-muted/40",
  clinical: "text-clinical border-clinical/40 bg-clinical/5",
  "intensive-care": "text-icu border-icu/40 bg-icu/5",
  perioperative: "text-perioperative border-perioperative/40 bg-perioperative/5",
  chemistry: "text-foreground border-border bg-muted/40",
};

const SECTION_DOT: Record<Section, string> = {
  physics: "bg-physics",
  physiology: "bg-physiology",
  pharmacology: "bg-pharmacology",
  anatomy: "bg-foreground/60",
  clinical: "bg-clinical",
  "intensive-care": "bg-icu",
  perioperative: "bg-perioperative",
  chemistry: "bg-foreground/60",
};

// Build a reverse adjacency map once so we can show "X is referenced by …".
const reverseSeeAlso: Record<string, string[]> = (() => {
  const out: Record<string, string[]> = {};
  for (const [src, targets] of Object.entries(seeAlsoMap)) {
    for (const t of targets) {
      (out[t] ??= []).push(src);
    }
  }
  return out;
})();

const topicById = new Map<string, Topic>(allTopics.map((t) => [t.id, t]));

const topicHref = (t: Topic) => `/${t.section}/${t.id}`;

const TopicMap = () => {
  const [params, setParams] = useSearchParams();
  const { activeExam, matchesFilter } = useExamFilter();
  const [search, setSearch] = useState("");

  // Default focus = pancreatitis (per the curriculum context the user is in).
  const focusId = params.get("focus") ?? "acute-pancreatitis";
  const focus = topicById.get(focusId) ?? null;

  const setFocus = (id: string) => {
    const next = new URLSearchParams(params);
    next.set("focus", id);
    setParams(next, { replace: true });
  };

  // Outgoing + incoming related topics for the focused node.
  const related = useMemo(() => {
    if (!focus) return [] as Topic[];
    const ids = new Set<string>([
      ...(seeAlsoMap[focus.id] ?? []),
      ...(reverseSeeAlso[focus.id] ?? []),
    ]);
    return [...ids]
      .map((id) => topicById.get(id))
      .filter((t): t is Topic => Boolean(t))
      .filter((t) => matchesFilter(t.examTags));
  }, [focus, matchesFilter]);

  // Filtered topic universe per section (exam + search).
  const filteredBySection = useMemo(() => {
    const q = search.trim().toLowerCase();
    const out: Record<Section, Topic[]> = {} as Record<Section, Topic[]>;
    (Object.keys(topicsBySection) as Section[]).forEach((s) => {
      out[s] = topicsBySection[s]
        .filter((t) => t.available)
        .filter((t) => matchesFilter(t.examTags))
        .filter((t) =>
          q === ""
            ? true
            : t.title.toLowerCase().includes(q) ||
              t.description.toLowerCase().includes(q),
        );
    });
    return out;
  }, [search, matchesFilter]);

  // Section ordering — focus the user's mentioned domains first.
  const sectionOrder: Section[] = [
    "intensive-care",
    "clinical",
    "perioperative",
    "physiology",
    "pharmacology",
    "physics",
    "anatomy",
    "chemistry",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3"
          >
            <ArrowLeft className="h-3 w-3" />
            Home
          </Link>
          <h1 className="flex items-center gap-2 text-3xl font-serif font-bold text-foreground">
            <Network className="h-7 w-7 text-primary" />
            Curriculum Topic Map
          </h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Browse the FRCA Final, FFICM and EDIC curriculum as a connected
            network. Pick a focus topic to surface its related pages —
            pancreatitis, necrosis, fluids and respiratory complications all
            live one click apart.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics by title or description…"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div className="text-[11px] text-muted-foreground self-center">
            {activeExam ? (
              <>
                Filtering by{" "}
                <span className="font-semibold uppercase">{activeExam}</span> —
                change in the header.
              </>
            ) : (
              <>Tip: use the exam chips in the header to narrow by syllabus.</>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Focus panel */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-primary font-semibold mb-2">
                <Sparkles className="h-3 w-3" />
                Focus topic
              </div>
              {focus ? (
                <>
                  <Link
                    to={topicHref(focus)}
                    className="block text-base font-serif font-semibold text-foreground hover:underline"
                  >
                    {focus.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {focus.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${SECTION_ACCENT[focus.section]}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${SECTION_DOT[focus.section]}`}
                      />
                      {sectionMeta[focus.section].label}
                    </span>
                    {focus.examTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-muted text-[10px] font-medium text-muted-foreground uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={topicHref(focus)}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Open topic <ArrowRight className="h-3 w-3" />
                  </Link>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Pick a topic from the map to see its connections.
                </p>
              )}
            </div>

            {/* Related topics from seeAlso (both directions) */}
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
                Related topics ({related.length})
              </p>
              {related.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No related topics under the current exam filter.
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {related.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => setFocus(t.id)}
                        className="group w-full text-left flex items-start gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
                      >
                        <span
                          className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${SECTION_DOT[t.section]}`}
                          aria-hidden
                        />
                        <span className="flex-1">
                          <span className="block text-xs font-medium text-foreground group-hover:text-primary">
                            {t.title}
                          </span>
                          <span className="block text-[10px] text-muted-foreground">
                            {sectionMeta[t.section].label}
                          </span>
                        </span>
                        <Link
                          to={topicHref(t)}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] text-primary opacity-0 group-hover:opacity-100 self-center"
                          aria-label={`Open ${t.title}`}
                        >
                          Open
                        </Link>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>

          {/* Map grid */}
          <div className="space-y-6">
            {sectionOrder.map((section) => {
              const topics = filteredBySection[section];
              if (!topics || topics.length === 0) return null;
              const meta = sectionMeta[section];
              const relatedIds = new Set(related.map((r) => r.id));
              return (
                <section key={section}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <span className={`h-2 w-2 rounded-full ${SECTION_DOT[section]}`} />
                      {meta.label}
                      <span className="text-[10px] text-muted-foreground font-normal">
                        ({topics.length})
                      </span>
                    </h2>
                    <Link
                      to={meta.path}
                      className="text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      Section overview →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {topics.map((t) => {
                      const isFocus = t.id === focusId;
                      const isRelated = relatedIds.has(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFocus(t.id)}
                          title={t.description}
                          className={`group relative text-left p-2.5 rounded-lg border text-xs transition-all ${
                            isFocus
                              ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                              : isRelated
                              ? `${SECTION_ACCENT[section]} ring-1 ring-primary/30`
                              : "border-border bg-card hover:border-primary/40 hover:bg-muted"
                          }`}
                        >
                          <span className="block font-medium text-foreground leading-snug line-clamp-2">
                            {t.title}
                          </span>
                          <span className="mt-1.5 flex items-center justify-between gap-1">
                            <span className="text-[10px] text-muted-foreground line-clamp-1">
                              {t.examTags.join(" · ")}
                            </span>
                            <Link
                              to={topicHref(t)}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] font-medium text-primary opacity-0 group-hover:opacity-100"
                              aria-label={`Open ${t.title}`}
                            >
                              Open →
                            </Link>
                          </span>
                          {isFocus && (
                            <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-primary text-primary-foreground uppercase">
                              Focus
                            </span>
                          )}
                          {isRelated && !isFocus && (
                            <span className="absolute -top-1.5 -right-1.5 h-2 w-2 rounded-full bg-primary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {sectionOrder.every((s) => filteredBySection[s].length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-12">
                No topics match this search and exam filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicMap;

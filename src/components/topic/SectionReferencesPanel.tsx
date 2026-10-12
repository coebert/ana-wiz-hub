import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { Section, Topic } from "@/data/curriculum";
import { topicReferences } from "@/data/references";
import { TopicReferencesButton } from "@/components/topic/TopicReferencesButton";

interface Props {
  section: Section;
  topics: Topic[];
}

/**
 * Collapsible "Key references for this section" panel, built from the
 * curated reference lists authored with each topic.
 */
export const SectionReferencesPanel = ({ section, topics }: Props) => {
  const [open, setOpen] = useState(false);
  const isLoading = false;

  const counts = new Map<string, number>();
  for (const t of topics) {
    const n = topicReferences[t.id]?.length ?? 0;
    if (n > 0) counts.set(t.id, n);
  }

  const withRefs = topics.filter((t) => (counts.get(t.id) ?? 0) > 0);
  const totalRefs = withRefs.reduce((n, t) => n + (counts.get(t.id) ?? 0), 0);

  return (
    <section className="mt-10 rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-muted/40 rounded-xl transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <BookOpen className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Key references for this section
            </h2>
            <p className="text-xs text-muted-foreground">
              {isLoading
                ? "Loading…"
                : withRefs.length === 0
                ? "No cached references yet — open a topic to generate its reading list."
                : `${totalRefs} references across ${withRefs.length} topic${
                    withRefs.length === 1 ? "" : "s"
                  }`}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-border px-4 py-3">
          {withRefs.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">
              Open any topic in this section and tap{" "}
              <span className="font-medium text-foreground">References</span> to
              generate a BJA Education–style reading list. It will then appear
              here for the whole section.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {withRefs.map((t) => (
                <li
                  key={t.id}
                  className="py-2 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {t.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {counts.get(t.id)} reference
                      {counts.get(t.id) === 1 ? "" : "s"}
                    </p>
                  </div>
                  <TopicReferencesButton
                    topicId={t.id}
                    topicTitle={t.title}
                    section={section}
                    variant="compact"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};


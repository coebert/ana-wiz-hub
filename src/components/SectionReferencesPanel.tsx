import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Section, Topic } from "@/data/curriculum";
import { TopicReferencesButton } from "@/components/TopicReferencesButton";

interface Props {
  section: Section;
  topics: Topic[];
}

interface RefRow {
  topic_id: string;
  status: string;
  refs: unknown;
}

/**
 * Collapsible "Key references for this section" panel.
 * Lists every topic in the section that has cached references with
 * a quick way to open each topic's drawer.
 */
export const SectionReferencesPanel = ({ section, topics }: Props) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["section-references", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topic_references")
        .select("topic_id, status, refs")
        .eq("section", section);
      if (error) throw error;
      return (data ?? []) as RefRow[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    if (row.status === "ready" && Array.isArray(row.refs)) {
      counts.set(row.topic_id, row.refs.length);
    }
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


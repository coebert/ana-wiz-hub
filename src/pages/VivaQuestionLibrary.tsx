import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight, Loader2, Search, Volume2, Square, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { allTopics, sectionMeta, Section } from "@/data/curriculum";


const SECTION_ORDER: (Section | "_other")[] = [
  "physics",
  "physiology",
  "pharmacology",
  "anatomy",
  "clinical",
  "intensive-care",
  "perioperative",
  "chemistry",
  "_other",
];

type ExamFilter = "all" | "primary" | "final" | "fficm";

interface ModelAnswerRow {
  id: string;
  exam: string;
  question: string;
  topic_title: string;
  model_answer: string;
  high_yield_points: string[];
  pitfalls: string[];
  created_at: string;
}

const examLabels: Record<string, string> = {
  primary: "Primary",
  final: "Final",
  fficm: "FFICM",
};

const VivaQuestionLibrary = () => {
  const [rows, setRows] = useState<ModelAnswerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [examFilter, setExamFilter] = useState<ExamFilter>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [collapsedTopics, setCollapsedTopics] = useState<Set<string>>(new Set());
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const playbackRef = useRef<{ cancelled: boolean; audio: HTMLAudioElement | null }>({
    cancelled: false,
    audio: null,
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("viva_model_answers")
        .select("id, exam, question, topic_title, model_answer, high_yield_points, pitfalls, created_at")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) {
        toast.error("Could not load question library");
      } else {
        setRows(
          (data ?? []).map((r) => ({
            ...r,
            high_yield_points: Array.isArray(r.high_yield_points) ? (r.high_yield_points as string[]) : [],
            pitfalls: Array.isArray(r.pitfalls) ? (r.pitfalls as string[]) : [],
          })),
        );
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (examFilter !== "all" && r.exam !== examFilter) return false;
      if (!q) return true;
      return (
        r.question.toLowerCase().includes(q) ||
        r.topic_title.toLowerCase().includes(q) ||
        r.model_answer.toLowerCase().includes(q)
      );
    });
  }, [rows, query, examFilter]);

  // Build a topic_title -> section lookup from the curriculum.
  const topicSectionMap = useMemo(() => {
    const m = new Map<string, Section>();
    for (const t of allTopics) m.set(t.title.toLowerCase(), t.section);
    return m;
  }, []);

  // Group filtered questions: section -> topic_title -> rows[]
  const grouped = useMemo(() => {
    const bySection = new Map<Section | "_other", Map<string, ModelAnswerRow[]>>();
    for (const r of filtered) {
      const sec = topicSectionMap.get(r.topic_title.toLowerCase()) ?? "_other";
      if (!bySection.has(sec)) bySection.set(sec, new Map());
      const topicMap = bySection.get(sec)!;
      if (!topicMap.has(r.topic_title)) topicMap.set(r.topic_title, []);
      topicMap.get(r.topic_title)!.push(r);
    }
    return SECTION_ORDER
      .filter((k) => bySection.has(k))
      .map((k) => {
        const topicMap = bySection.get(k)!;
        const topics = Array.from(topicMap.entries())
          .map(([title, items]) => ({ title, items }))
          .sort((a, b) => a.title.localeCompare(b.title));
        const total = topics.reduce((sum, t) => sum + t.items.length, 0);
        return { key: k, topics, total };
      });
  }, [filtered, topicSectionMap]);

  const isSearching = query.trim().length > 0;

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const toggleSection = (key: string) =>
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const toggleTopic = (key: string) =>
    setCollapsedTopics((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const speak = async (row: ModelAnswerRow) => {
    if (speakingId) return;
    setSpeakingId(row.id);
    try {
      const { data, error } = await supabase.functions.invoke("viva", {
        body: { mode: "tts", text: row.model_answer, voice: "alloy" },
      });
      if (error) throw error;
      const audioB64 = (data as { audio?: string })?.audio;
      if (!audioB64) throw new Error("No audio returned");
      const audio = new Audio(`data:audio/mpeg;base64,${audioB64}`);
      audio.onended = () => setSpeakingId(null);
      audio.onerror = () => setSpeakingId(null);
      await audio.play();
    } catch (e) {
      console.error(e);
      toast.error("Could not play audio");
      setSpeakingId(null);
    }
  };

  const examCounts = useMemo(() => {
    const c = { all: rows.length, primary: 0, final: 0, fficm: 0 } as Record<ExamFilter, number>;
    rows.forEach((r) => {
      if (r.exam in c) (c as Record<string, number>)[r.exam]++;
    });
    return c;
  }, [rows]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          to="/viva"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to viva hub
        </Link>

        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-serif font-bold text-foreground">Viva question library</h1>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            Every viva question that has been asked, with its cached AI-generated model answer,
            high-yield points and common pitfalls. Search across exams to revise efficiently.
          </p>
        </header>

        <section className="mb-4 flex flex-wrap gap-2">
          {(["all", "primary", "final", "fficm"] as ExamFilter[]).map((e) => {
            const isActive = examFilter === e;
            return (
              <button
                key={e}
                type="button"
                onClick={() => setExamFilter(e)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                }`}
              >
                {e === "all" ? "All" : examLabels[e]} ({examCounts[e] ?? 0})
              </button>
            );
          })}
        </section>

        <section className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, topics or model answer text…"
            className="pl-9"
          />
        </section>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-12 justify-center">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading library…
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-12">
            {rows.length === 0
              ? "No model answers cached yet. Generate one in a viva session and it will appear here."
              : "No questions match your search."}
          </p>
        ) : (
          <div className="space-y-3">
            {grouped.map(({ key, topics, total }) => {
              const sectionLabel = key === "_other" ? "Other" : sectionMeta[key as Section].label;
              const sectionKey = String(key);
              // When searching, force-open everything so matches are visible.
              const sectionOpen = isSearching ? true : !collapsedSections.has(sectionKey);
              return (
                <section
                  key={sectionKey}
                  className="rounded-lg border border-border bg-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => !isSearching && toggleSection(sectionKey)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-muted/40 transition-colors text-left"
                    aria-expanded={sectionOpen}
                    disabled={isSearching}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {sectionOpen ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                      )}
                      <h2 className="text-base sm:text-lg font-serif font-bold text-foreground truncate">
                        {sectionLabel}
                      </h2>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {topics.length} {topics.length === 1 ? "topic" : "topics"} · {total}{" "}
                      {total === 1 ? "question" : "questions"}
                    </span>
                  </button>

                  {sectionOpen && (
                    <div className="border-t border-border px-2 sm:px-3 py-2 space-y-2">
                      {topics.map(({ title, items }) => {
                        const topicKey = `${sectionKey}::${title}`;
                        const topicOpen = isSearching ? true : !collapsedTopics.has(topicKey);
                        return (
                          <div
                            key={topicKey}
                            className="rounded-md border border-border/60 bg-background/40 overflow-hidden"
                          >
                            <button
                              type="button"
                              onClick={() => !isSearching && toggleTopic(topicKey)}
                              className="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-muted/30 transition-colors text-left"
                              aria-expanded={topicOpen}
                              disabled={isSearching}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {topicOpen ? (
                                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                ) : (
                                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                )}
                                <span className="text-sm font-semibold text-foreground truncate">
                                  {title}
                                </span>
                              </div>
                              <span className="text-[11px] text-muted-foreground shrink-0">
                                {items.length}
                              </span>
                            </button>

                            {topicOpen && (
                              <ul className="space-y-2 px-2 pb-2">
                                {items.map((r) => {
                                  const isOpen = expanded.has(r.id);
                                  return (
                                    <li
                                      key={r.id}
                                      className="rounded-md border border-border bg-card overflow-hidden"
                                    >
                                      <button
                                        type="button"
                                        onClick={() => toggle(r.id)}
                                        className="w-full text-left p-3 hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                        aria-expanded={isOpen}
                                      >
                                        <div className="flex items-start gap-3">
                                          <div className="mt-0.5 text-muted-foreground flex-shrink-0">
                                            {isOpen ? (
                                              <ChevronDown className="h-4 w-4" />
                                            ) : (
                                              <ChevronRight className="h-4 w-4" />
                                            )}
                                          </div>
                                          <div className="min-w-0 flex-1">
                                            <p className="font-serif font-semibold text-foreground leading-snug">
                                              {r.question}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                              <Badge variant="outline" className="text-[10px]">
                                                {examLabels[r.exam] ?? r.exam}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>
                                      </button>

                                      {isOpen && (
                                        <div className="border-t border-border p-4 space-y-4 bg-background/40">
                                          <div>
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                                                Model answer
                                              </p>
                                              <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => speak(r)}
                                                disabled={speakingId === r.id}
                                                className="h-7 px-2 text-xs"
                                              >
                                                {speakingId === r.id ? (
                                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                ) : (
                                                  <Volume2 className="h-3.5 w-3.5" />
                                                )}
                                                <span className="ml-1.5">Listen</span>
                                              </Button>
                                            </div>
                                            <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                              {r.model_answer}
                                            </p>
                                          </div>

                                          {r.high_yield_points.length > 0 && (
                                            <div>
                                              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                                                High-yield points
                                              </p>
                                              <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/90">
                                                {r.high_yield_points.map((p, i) => (
                                                  <li key={i}>{p}</li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}

                                          {r.pitfalls.length > 0 && (
                                            <div>
                                              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                                                Common pitfalls
                                              </p>
                                              <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/90">
                                                {r.pitfalls.map((p, i) => (
                                                  <li key={i}>{p}</li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VivaQuestionLibrary;

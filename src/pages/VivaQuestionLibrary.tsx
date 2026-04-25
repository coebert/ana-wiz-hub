import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown, ChevronRight, Loader2, Search, Square, Headphones, Play, SkipForward, ListFilter, X, CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { allTopics, sectionMeta, Section } from "@/data/curriculum";
import { useVivaProgress } from "@/hooks/useVivaProgress";


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
type Difficulty = "basic" | "intermediate" | "exam-ready";
type DifficultyFilter = "all" | Difficulty;

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

const difficultyLabels: Record<Difficulty, string> = {
  basic: "Basic",
  intermediate: "Intermediate",
  "exam-ready": "Exam-ready",
};

const difficultyClasses: Record<Difficulty, string> = {
  basic: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  intermediate: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "exam-ready": "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

/**
 * Heuristically classify a stored viva row by inspecting the question stem
 * and answer length. We don't store difficulty on the row (it's an ad-hoc
 * tag chosen at session time), so this gives a stable retroactive bucket
 * the user can filter by.
 *
 * Signals (in order of weight):
 *  - "Define / List / What is" + short answer → basic
 *  - Multi-clause stem (semicolons / "and") OR "compare/contrast/critically"
 *    OR very long structured answer → exam-ready
 *  - Everything else → intermediate
 */
const classifyDifficulty = (row: { question: string; model_answer: string }): Difficulty => {
  const q = row.question.toLowerCase();
  const answerLen = row.model_answer.length;
  const examReadyCues = /(compare|contrast|critically|justify|outline your approach|critique|weigh|trade-?offs|controversies|evidence base|implications|risk[- ]benefit|differential diagnosis|complex|complications? of|management plan)/;
  const basicCues = /^(\s*)(define|what is|name|list|state|give the (definition|formula))\b/;

  if (examReadyCues.test(q) || answerLen > 1800) return "exam-ready";
  if (basicCues.test(q) && answerLen < 700) return "basic";
  // Long stem with several clauses tends to be exam-ready in nature.
  const clauses = (row.question.match(/[;,]| and /g) ?? []).length;
  if (clauses >= 3 && answerLen > 900) return "exam-ready";
  return "intermediate";
};

/**
 * Two thin stacked progress bars: questions practiced and topics touched.
 * Used for both per-section and per-topic coverage. Pure presentational.
 */
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
    <div className={`space-y-1 ${compact ? "" : "min-w-[140px]"}`}>
      <div className="flex items-center gap-2">
        <Progress value={qPct} className="h-1.5 flex-1" />
        <span className="text-[10px] tabular-nums text-muted-foreground whitespace-nowrap">
          {questionsPracticed}/{questionsTotal} Q
        </span>
      </div>
      {tPct !== null && (
        <div className="flex items-center gap-2">
          <Progress value={tPct} className="h-1.5 flex-1 [&>div]:bg-accent" />
          <span className="text-[10px] tabular-nums text-muted-foreground whitespace-nowrap">
            {topicsTouched}/{topicsTotal} T
          </span>
        </div>
      )}
    </div>
  );
};

const VivaQuestionLibrary = () => {
  const [rows, setRows] = useState<ModelAnswerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [examFilter, setExamFilter] = useState<ExamFilter>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [collapsedTopics, setCollapsedTopics] = useState<Set<string>>(new Set());
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [streamTopics, setStreamTopics] = useState<Set<string>>(new Set());
  const [topicPickerOpen, setTopicPickerOpen] = useState(false);
  const { practiced, mark, toggle: toggleProgress, reset: resetProgress, isPracticed } = useVivaProgress();
  const playbackRef = useRef<{ cancelled: boolean; audio: HTMLAudioElement | null }>({
    cancelled: false,
    audio: null,
  });
  const streamRef = useRef<{ cancelled: boolean }>({ cancelled: false });

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

  // Pre-classify each row once so filter, badges and stream queue all agree.
  const rowDifficulty = useMemo(() => {
    const m = new Map<string, Difficulty>();
    rows.forEach((r) => m.set(r.id, classifyDifficulty(r)));
    return m;
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (examFilter !== "all" && r.exam !== examFilter) return false;
      if (difficultyFilter !== "all" && rowDifficulty.get(r.id) !== difficultyFilter) return false;
      if (!q) return true;
      return (
        r.question.toLowerCase().includes(q) ||
        r.topic_title.toLowerCase().includes(q) ||
        r.model_answer.toLowerCase().includes(q)
      );
    });
  }, [rows, query, examFilter, difficultyFilter, rowDifficulty]);

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

  /**
   * Coverage stats over **all** rows (not just `filtered`) so users see absolute
   * progress regardless of search/exam/difficulty filters. Computed per section
   * and per topic; counts both questions and topics-touched.
   */
  const coverage = useMemo(() => {
    type TopicStat = { total: number; practiced: number };
    type SectionStat = {
      questionsTotal: number;
      questionsPracticed: number;
      topicsTotal: number;
      topicsTouched: number;
      topics: Map<string, TopicStat>;
    };
    const bySection = new Map<Section | "_other", SectionStat>();
    for (const r of rows) {
      const sec = topicSectionMap.get(r.topic_title.toLowerCase()) ?? "_other";
      if (!bySection.has(sec)) {
        bySection.set(sec, {
          questionsTotal: 0,
          questionsPracticed: 0,
          topicsTotal: 0,
          topicsTouched: 0,
          topics: new Map(),
        });
      }
      const s = bySection.get(sec)!;
      if (!s.topics.has(r.topic_title)) s.topics.set(r.topic_title, { total: 0, practiced: 0 });
      const t = s.topics.get(r.topic_title)!;
      t.total++;
      s.questionsTotal++;
      if (practiced.has(r.id)) {
        t.practiced++;
        s.questionsPracticed++;
      }
    }
    let overallQ = 0;
    let overallQDone = 0;
    let overallT = 0;
    let overallTDone = 0;
    for (const s of bySection.values()) {
      s.topicsTotal = s.topics.size;
      s.topicsTouched = Array.from(s.topics.values()).filter((t) => t.practiced > 0).length;
      overallQ += s.questionsTotal;
      overallQDone += s.questionsPracticed;
      overallT += s.topicsTotal;
      overallTDone += s.topicsTouched;
    }
    return {
      bySection,
      overall: {
        questionsTotal: overallQ,
        questionsPracticed: overallQDone,
        topicsTotal: overallT,
        topicsTouched: overallTDone,
      },
    };
  }, [rows, topicSectionMap, practiced]);

  const isSearching = query.trim().length > 0;

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Auto-mark as practiced when the user opens a question (manual override
        // available via the tick button below).
        mark(id);
      }
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

  const EXAMINER_VOICE = "onyx"; // deeper — examiner
  const CANDIDATE_VOICE = "nova"; // brighter — candidate

  const stopPlayback = () => {
    playbackRef.current.cancelled = true;
    const a = playbackRef.current.audio;
    if (a) {
      try {
        a.pause();
        a.src = "";
      } catch {
        /* ignore */
      }
    }
    playbackRef.current.audio = null;
    setSpeakingId(null);
  };

  const synthesise = async (text: string, voice: string): Promise<string> => {
    const { data, error } = await supabase.functions.invoke("tts-demo", {
      body: { text, voice },
    });
    if (error) throw error;
    const b64 = (data as { audioBase64?: string })?.audioBase64;
    if (!b64) throw new Error("No audio returned");
    return `data:audio/mpeg;base64,${b64}`;
  };

  const playSegment = (src: string): Promise<void> =>
    new Promise((resolve, reject) => {
      if (playbackRef.current.cancelled) return resolve();
      const audio = new Audio(src);
      playbackRef.current.audio = audio;
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error("Audio playback failed"));
      audio.play().catch(reject);
    });

  /** Play examiner question + candidate model answer as a two-voice dialogue. */
  const playDialogue = async (row: ModelAnswerRow, opts?: { silent?: boolean }) => {
    if (!opts?.silent) {
      if (speakingId) {
        // If clicked on the currently-playing row, stop it.
        stopPlayback();
        if (speakingId === row.id) return;
      }
      playbackRef.current = { cancelled: false, audio: null };
    }
    setSpeakingId(row.id);
    // Listening to the dialogue counts as practice (auto-mark; user can untick).
    mark(row.id);
    try {
      // Generate both segments in parallel for faster start.
      const [examinerSrc, candidateSrc] = await Promise.all([
        synthesise(`Examiner: ${row.question}`, EXAMINER_VOICE),
        synthesise(`Candidate: ${row.model_answer}`, CANDIDATE_VOICE),
      ]);
      if (playbackRef.current.cancelled) return;
      await playSegment(examinerSrc);
      if (playbackRef.current.cancelled) return;
      // Brief gap between speakers for natural pacing.
      await new Promise((r) => setTimeout(r, 350));
      if (playbackRef.current.cancelled) return;
      await playSegment(candidateSrc);
    } catch (e) {
      console.error(e);
      if (!playbackRef.current.cancelled) toast.error("Could not play dialogue");
    } finally {
      playbackRef.current.audio = null;
      setSpeakingId((current) => (current === row.id ? null : current));
    }
  };

  /** Build the queue of rows to stream based on exam + difficulty + selected topics. */
  const streamQueue = useMemo(() => {
    let queue = rows.filter((r) => examFilter === "all" || r.exam === examFilter);
    if (difficultyFilter !== "all") {
      queue = queue.filter((r) => rowDifficulty.get(r.id) === difficultyFilter);
    }
    if (streamTopics.size > 0) {
      queue = queue.filter((r) => streamTopics.has(r.topic_title));
    }
    // Stable order: by topic then created_at ascending (oldest first feels like a session).
    return [...queue].sort((a, b) => {
      const t = a.topic_title.localeCompare(b.topic_title);
      return t !== 0 ? t : a.created_at.localeCompare(b.created_at);
    });
  }, [rows, examFilter, difficultyFilter, rowDifficulty, streamTopics]);

  /** All distinct topic titles available given the current exam filter. */
  const availableTopics = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => {
      if (examFilter === "all" || r.exam === examFilter) set.add(r.topic_title);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [rows, examFilter]);

  const stopStream = () => {
    streamRef.current.cancelled = true;
    setStreamActive(false);
    stopPlayback();
  };

  const playStream = async (startIndex = 0) => {
    if (streamQueue.length === 0) {
      toast.message("No questions match the current filters");
      return;
    }
    streamRef.current = { cancelled: false };
    playbackRef.current = { cancelled: false, audio: null };
    setStreamActive(true);
    for (let i = startIndex; i < streamQueue.length; i++) {
      if (streamRef.current.cancelled) break;
      // Reset per-row playback cancellation flag (but keep stream flag).
      playbackRef.current = { cancelled: false, audio: null };
      await playDialogue(streamQueue[i], { silent: true });
      if (streamRef.current.cancelled) break;
      // Pause between questions.
      await new Promise((r) => setTimeout(r, 600));
    }
    if (!streamRef.current.cancelled) {
      setStreamActive(false);
      toast.success("Reached the end of the stream");
    }
  };

  const skipStream = () => {
    // Cancel just the current row; the stream loop will move on.
    playbackRef.current.cancelled = true;
    const a = playbackRef.current.audio;
    if (a) {
      try { a.pause(); a.src = ""; } catch { /* ignore */ }
    }
    playbackRef.current.audio = null;
  };

  const toggleStreamTopic = (title: string) =>
    setStreamTopics((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });

  // Stop any audio when the page unmounts.
  useEffect(() => () => { stopStream(); }, []);

  const examCounts = useMemo(() => {
    const c = { all: rows.length, primary: 0, final: 0, fficm: 0 } as Record<ExamFilter, number>;
    rows.forEach((r) => {
      if (r.exam in c) (c as Record<string, number>)[r.exam]++;
    });
    return c;
  }, [rows]);

  // Difficulty counts respect the active exam filter so numbers stay meaningful.
  const difficultyCounts = useMemo(() => {
    const c: Record<DifficultyFilter, number> = {
      all: 0,
      basic: 0,
      intermediate: 0,
      "exam-ready": 0,
    };
    rows.forEach((r) => {
      if (examFilter !== "all" && r.exam !== examFilter) return;
      c.all++;
      const d = rowDifficulty.get(r.id);
      if (d) c[d]++;
    });
    return c;
  }, [rows, examFilter, rowDifficulty]);

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

        {coverage.overall.questionsTotal > 0 && (
          <section className="mb-4 rounded-lg border border-border bg-card p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground">Practice progress</h2>
                <p className="text-xs text-muted-foreground">
                  Questions auto-mark when you open or listen — tap the tick to override. Stored on this device.
                </p>
              </div>
              {coverage.overall.questionsPracticed > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Reset all viva practice progress on this device?")) {
                      resetProgress();
                      toast.success("Progress reset");
                    }
                  }}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              )}
            </div>
            <CoverageBars
              questionsPracticed={coverage.overall.questionsPracticed}
              questionsTotal={coverage.overall.questionsTotal}
              topicsTouched={coverage.overall.topicsTouched}
              topicsTotal={coverage.overall.topicsTotal}
              compact
            />
            <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              Q = questions practiced · T = topics touched
            </p>
          </section>
        )}

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

        <section className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mr-1">
            Difficulty
          </span>
          {(["all", "basic", "intermediate", "exam-ready"] as DifficultyFilter[]).map((d) => {
            const isActive = difficultyFilter === d;
            const count = difficultyCounts[d] ?? 0;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDifficultyFilter(d)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                }`}
              >
                {d === "all" ? "All" : difficultyLabels[d]} ({count})
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

        <section className="mb-6 rounded-lg border border-border bg-card p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <Headphones className="h-4 w-4 text-primary shrink-0" />
              <h2 className="text-sm font-semibold text-foreground">Continuous viva stream</h2>
            </div>
            <div className="flex items-center gap-2">
              {streamActive ? (
                <>
                  <Button type="button" size="sm" variant="outline" onClick={skipStream} className="h-8">
                    <SkipForward className="h-3.5 w-3.5 mr-1.5" /> Skip
                  </Button>
                  <Button type="button" size="sm" variant="destructive" onClick={stopStream} className="h-8">
                    <Square className="h-3.5 w-3.5 mr-1.5" /> Stop
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => playStream(0)}
                  disabled={streamQueue.length === 0}
                  className="h-8"
                >
                  <Play className="h-3.5 w-3.5 mr-1.5" />
                  Play {streamQueue.length} {streamQueue.length === 1 ? "question" : "questions"}
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Listen to questions and model answers back-to-back. The next question starts automatically
            when the previous answer ends. Filter by exam (above) and/or specific topics below.
          </p>

          <div className="flex items-center justify-between gap-2 mb-2">
            <button
              type="button"
              onClick={() => setTopicPickerOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary"
            >
              <ListFilter className="h-3.5 w-3.5" />
              Topics ({streamTopics.size === 0 ? "all" : `${streamTopics.size} selected`})
              {topicPickerOpen ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" />
              )}
            </button>
            {streamTopics.size > 0 && (
              <button
                type="button"
                onClick={() => setStreamTopics(new Set())}
                className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>

          {topicPickerOpen && (
            <div className="max-h-56 overflow-y-auto rounded-md border border-border/60 bg-background/40 p-2 flex flex-wrap gap-1.5">
              {availableTopics.length === 0 ? (
                <p className="text-xs text-muted-foreground p-2">
                  No topics available for the selected exam.
                </p>
              ) : (
                availableTopics.map((title) => {
                  const active = streamTopics.has(title);
                  return (
                    <button
                      key={title}
                      type="button"
                      onClick={() => toggleStreamTopic(title)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {title}
                    </button>
                  );
                })
              )}
            </div>
          )}

          {streamActive && speakingId && (() => {
            const idx = streamQueue.findIndex((r) => r.id === speakingId);
            const cur = idx >= 0 ? streamQueue[idx] : null;
            return cur ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Now playing <span className="font-medium text-foreground">{idx + 1} / {streamQueue.length}</span> ·{" "}
                <span className="font-medium text-foreground">{cur.topic_title}</span> — {cur.question}
              </p>
            ) : null;
          })()}
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
                    <div className="flex items-center gap-3 shrink-0">
                      {(() => {
                        const stat = coverage.bySection.get(key);
                        return stat ? (
                          <CoverageBars
                            questionsPracticed={stat.questionsPracticed}
                            questionsTotal={stat.questionsTotal}
                            topicsTouched={stat.topicsTouched}
                            topicsTotal={stat.topicsTotal}
                          />
                        ) : null;
                      })()}
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        {topics.length} {topics.length === 1 ? "topic" : "topics"} · {total}{" "}
                        {total === 1 ? "question" : "questions"}
                      </span>
                    </div>
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
                              <div className="flex items-center gap-2 shrink-0">
                                {(() => {
                                  const tStat = coverage.bySection.get(key)?.topics.get(title);
                                  return tStat ? (
                                    <CoverageBars
                                      questionsPracticed={tStat.practiced}
                                      questionsTotal={tStat.total}
                                      compact
                                    />
                                  ) : null;
                                })()}
                                <span className="text-[11px] text-muted-foreground">
                                  {items.length}
                                </span>
                              </div>
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
                                              {(() => {
                                                const d = rowDifficulty.get(r.id);
                                                return d ? (
                                                  <Badge
                                                    variant="outline"
                                                    className={`text-[10px] ${difficultyClasses[d]}`}
                                                  >
                                                    {difficultyLabels[d]}
                                                  </Badge>
                                                ) : null;
                                              })()}
                                            </div>
                                          </div>
                                        </div>
                                      </button>

                                      {isOpen && (
                                        <div className="border-t border-border p-4 space-y-4 bg-background/40">
                                          <div>
                                            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                                              <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                                                Model answer
                                              </p>
                                              <Button
                                                type="button"
                                                size="sm"
                                                variant={speakingId === r.id ? "secondary" : "ghost"}
                                                onClick={() => playDialogue(r)}
                                                className="h-7 px-2 text-xs"
                                                aria-label={
                                                  speakingId === r.id
                                                    ? "Stop dialogue playback"
                                                    : "Listen to examiner and candidate as a two-voice dialogue"
                                                }
                                              >
                                                {speakingId === r.id ? (
                                                  <>
                                                    <Square className="h-3.5 w-3.5" />
                                                    <span className="ml-1.5">Stop</span>
                                                  </>
                                                ) : (
                                                  <>
                                                    <Headphones className="h-3.5 w-3.5" />
                                                    <span className="ml-1.5">Listen as dialogue</span>
                                                  </>
                                                )}
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

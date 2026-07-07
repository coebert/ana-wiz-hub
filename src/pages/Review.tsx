import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Brain, CheckCircle2, XCircle, ChevronRight, ExternalLink, SlidersHorizontal, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { applyGrade, GRADE_LABELS, GRADES, type Grade } from "@/lib/srs";
import { toast } from "@/hooks/use-toast";
import { allTopics, topicsBySection, sectionMeta, type Section } from "@/data/curriculum";

interface ReviewRow {
  id: string;
  card_id: string;
  topic_id: string;
  topic_title: string;
  topic_section: string;
  topic_path: string;
  exam_tags: string[];
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  ease: number;
  interval_days: number;
  repetitions: number;
  lapses: number;
  due_at: string;
}

export default function Review() {
  const { user, loading: authLoading } = useAuth();
  const { activeExam } = useExamFilter();
  const navigate = useNavigate();
  const [rows, setRows] = useState<ReviewRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [stats, setStats] = useState({ total: 0, due: 0, scheduled: 0 });

  // Local review queue filters
  const [selectedSection, setSelectedSection] = useState<Section | "all">("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");

  // Available topics for the selected section
  const availableTopics = useMemo(() => {
    if (selectedSection === "all") return allTopics;
    return topicsBySection[selectedSection] ?? [];
  }, [selectedSection]);

  // Filter the loaded due queue by exam, section and topic.
  const queue = useMemo(() => {
    if (!rows) return [];
    let filtered = rows;
    if (activeExam) {
      filtered = filtered.filter((r) => r.exam_tags.includes(activeExam));
    }
    if (selectedSection !== "all") {
      filtered = filtered.filter((r) => r.topic_section === selectedSection);
    }
    if (selectedTopic !== "all") {
      filtered = filtered.filter((r) => r.topic_id === selectedTopic);
    }
    return filtered;
  }, [rows, activeExam, selectedSection, selectedTopic]);

  const current = queue[0];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { state: { from: "/review" } });
    }
  }, [user, authLoading, navigate]);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const nowIso = new Date().toISOString();
    const [dueRes, totalRes, schedRes] = await Promise.all([
      supabase
        .from("srs_reviews")
        .select("*")
        .eq("user_id", user.id)
        .lte("due_at", nowIso)
        .order("due_at", { ascending: true })
        .limit(200),
      supabase.from("srs_reviews").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      supabase
        .from("srs_reviews")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gt("due_at", nowIso),
    ]);
    if (dueRes.error) {
      toast({ title: "Couldn't load queue", description: dueRes.error.message, variant: "destructive" });
    }
    setRows((dueRes.data ?? []) as ReviewRow[]);
    setStats({
      total: totalRes.count ?? 0,
      due: dueRes.data?.length ?? 0,
      scheduled: schedRes.count ?? 0,
    });
    setSelected(null);
    setRevealed(false);
    setLoading(false);
  };

  useEffect(() => {
    if (user) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleGrade = async (grade: Grade) => {
    if (!current || !user || grading) return;
    setGrading(true);
    try {
      const next = applyGrade(
        { ease: current.ease, interval_days: current.interval_days, repetitions: current.repetitions, lapses: current.lapses },
        grade,
      );
      const { error } = await supabase
        .from("srs_reviews")
        .update({
          ease: next.ease,
          interval_days: next.interval_days,
          repetitions: next.repetitions,
          lapses: next.lapses,
          due_at: next.due_at,
          last_grade: grade,
          last_reviewed_at: new Date().toISOString(),
        })
        .eq("id", current.id)
        .eq("user_id", user.id);
      if (error) throw error;
      // Advance locally: drop this card from queue (it's no longer due).
      setRows((prev) => (prev ?? []).filter((r) => r.id !== current.id));
      setStats((s) => ({ ...s, due: Math.max(0, s.due - 1), scheduled: s.scheduled + 1 }));
      setSelected(null);
      setRevealed(false);
    } catch (e) {
      toast({ title: "Couldn't save grade", description: (e as Error).message, variant: "destructive" });
    } finally {
      setGrading(false);
    }
  };

  if (authLoading || (loading && !rows)) {
    return (
      <div className="min-h-screen bg-background">
        <PageSection as="main" spacing="tight" width="default">
          <p className="text-sm text-muted-foreground">Loading review queue…</p>
        </PageSection>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Spaced repetition review queue | AnaesthesiaCore</title>
        <meta name="description" content="Personalised SM-2 spaced-repetition queue covering FRCA Primary, Final and FFICM quiz questions." />
        <link rel="canonical" href="https://anaesthesiacore.app/review" />
        <meta name="robots" content="noindex,follow" />
      </Helmet>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Brain className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">Spaced repetition</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground mt-1">Your review queue</h1>
            <p className="text-sm text-muted-foreground mt-1">
              SM-2 scheduling across every quiz question you've graded.
              {activeExam && (
                <> Filtered to <span className="font-medium text-foreground">{activeExam.toUpperCase()}</span> via the exam chip.</>
              )}
            </p>
          </div>
        </div>

        {/* Curriculum & topic filters */}
        <div className="rounded-xl border border-border bg-card p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Focus your study</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 min-w-0">
              <label htmlFor="section-filter" className="block text-xs font-medium text-muted-foreground mb-1.5">Curriculum section</label>
              <select
                id="section-filter"
                value={selectedSection}
                onChange={(e) => {
                  const val = e.target.value as Section | "all";
                  setSelectedSection(val);
                  setSelectedTopic("all");
                }}
                className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="all">All sections</option>
                {(Object.keys(sectionMeta) as Section[]).map((s) => (
                  <option key={s} value={s}>{sectionMeta[s].label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="topic-filter" className="block text-xs font-medium text-muted-foreground mb-1.5">Topic</label>
              <select
                id="topic-filter"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={selectedSection === "all"}
                className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="all">All topics{selectedSection !== "all" ? ` in ${sectionMeta[selectedSection].label}` : ""}</option>
                {availableTopics.map((t) => (
                  <option key={t.id} value={t.id}>{t.title}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => { setSelectedSection("all"); setSelectedTopic("all"); }}
                disabled={selectedSection === "all" && selectedTopic === "all"}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
          </div>
          {(selectedSection !== "all" || selectedTopic !== "all") && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {selectedSection !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                  {sectionMeta[selectedSection].label}
                </span>
              )}
              {selectedTopic !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {allTopics.find((t) => t.id === selectedTopic)?.title ?? selectedTopic}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <Stat label="Due now" value={queue.length} accent="text-primary" />
          <Stat label="Scheduled" value={stats.scheduled} />
          <Stat label="Total cards" value={stats.total} />
        </div>

        {!current ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-accent mx-auto mb-3" />
            <h2 className="text-lg font-serif font-bold text-foreground mb-2">
              {stats.total === 0 ? "No cards yet" : "All caught up"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {stats.total === 0
                ? "Open any topic, take the quiz, and grade your recall to start building a personalised review schedule."
                : (() => {
                    const filters: string[] = [];
                    if (activeExam) filters.push(activeExam.toUpperCase());
                    if (selectedSection !== "all") filters.push(sectionMeta[selectedSection].label);
                    if (selectedTopic !== "all") filters.push(allTopics.find((t) => t.id === selectedTopic)?.title ?? "this topic");
                    if (filters.length > 0) {
                      return `No cards due for ${filters.join(" + ")}. Clear filters to see other due cards.`;
                    }
                    return "Come back when more cards are due — or take a fresh quiz to add new ones.";
                  })()}
            </p>
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
            >
              Browse curriculum
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <article className="rounded-xl border-2 border-primary/20 bg-card p-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <Link to={current.topic_path} className="inline-flex items-center gap-1 hover:text-foreground">
                {current.topic_title}
                <ExternalLink className="h-3 w-3" />
              </Link>
              <span>Ease {current.ease.toFixed(2)} · rep {current.repetitions}</span>
            </div>
            <p className="text-foreground font-medium leading-relaxed mb-5">{current.question}</p>

            <div className="space-y-2.5">
              {current.options.map((opt, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let stateClass = "border-border hover:border-primary/40 hover:bg-muted/50";
                if (revealed) {
                  if (idx === current.correct_index) stateClass = "border-accent bg-accent/10";
                  else if (idx === selected) stateClass = "border-destructive bg-destructive/5";
                  else stateClass = "border-border opacity-50";
                } else if (idx === selected) stateClass = "border-primary bg-primary/5";
                return (
                  <button
                    key={idx}
                    onClick={() => !revealed && setSelected(idx)}
                    disabled={revealed}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-start gap-3 ${stateClass}`}
                  >
                    <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border bg-muted text-muted-foreground border-border">
                      {revealed && idx === current.correct_index ? <CheckCircle2 className="h-4 w-4" /> : revealed && idx === selected ? <XCircle className="h-4 w-4" /> : letter}
                    </span>
                    <span className="text-sm text-foreground leading-relaxed pt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>

            {revealed ? (
              <>
                <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-1">Explanation</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{current.explanation}</p>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      onClick={() => handleGrade(g)}
                      disabled={grading}
                      className={`px-3 py-2 rounded-md border text-xs font-semibold transition-colors disabled:opacity-50 ${GRADE_LABELS[g].tone}`}
                      title={GRADE_LABELS[g].hint}
                    >
                      {GRADE_LABELS[g].label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setRevealed(true)}
                  disabled={selected === null}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    selected !== null ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  Reveal answer
                </button>
              </div>
            )}
          </article>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-3 text-center">
      <div className={`text-2xl font-bold ${accent ?? "text-foreground"}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

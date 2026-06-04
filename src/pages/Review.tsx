import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Brain, CheckCircle2, XCircle, ChevronRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { applyGrade, GRADE_LABELS, GRADES, type Grade } from "@/lib/srs";
import { toast } from "@/hooks/use-toast";

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

  // Filter the loaded due queue by the current exam chip.
  const queue = useMemo(() => {
    if (!rows) return [];
    if (!activeExam) return rows;
    return rows.filter((r) => r.exam_tags.includes(activeExam));
  }, [rows, activeExam]);

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
        <main className="container mx-auto px-4 py-8">
          <p className="text-sm text-muted-foreground">Loading review queue…</p>
        </main>
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
                : activeExam
                  ? `No cards due for the ${activeExam.toUpperCase()} filter. Clear the exam chip to see other due cards.`
                  : "Come back when more cards are due — or take a fresh quiz to add new ones."}
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

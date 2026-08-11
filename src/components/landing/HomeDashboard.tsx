import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Sparkles, ChevronRight, LayoutDashboard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { allTopics, Exam, type ExamTag } from "@/data/curriculum";

/**
 * Personalised home dashboard shown to signed-in users on the landing page.
 * - Exam-scoped progress rings for FRCA Primary, Final, and FFICM
 * - Study streak (consecutive days with any topic completion or visit)
 * - Next 3 recommended incomplete topics in the user's active exam scope
 *
 * Anonymous users see a compact "Sign in to sync" prompt instead so the
 * feature is discoverable without cluttering the landing page.
 */

const EXAM_CARDS: { exam: ExamTag; label: string; color: string }[] = [
  { exam: Exam.PRIMARY, label: "FRCA Primary", color: "bg-physics" },
  { exam: Exam.FINAL, label: "FRCA Final", color: "bg-clinical" },
  { exam: Exam.FFICM, label: "FFICM", color: "bg-icu" },
];

const dayKey = (d: Date | string | number) => {
  const dt = typeof d === "object" ? d : new Date(d);
  return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
};

const useStudyStreak = (userId: string | undefined) => {
  const [streak, setStreak] = useState<number | null>(null);
  useEffect(() => {
    if (!userId) {
      setStreak(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const [prog, recent] = await Promise.all([
        supabase
          .from("user_topic_progress")
          .select("completed_at")
          .eq("user_id", userId)
          .order("completed_at", { ascending: false })
          .limit(180),
        supabase
          .from("user_recent_topics")
          .select("visited_at")
          .eq("user_id", userId)
          .order("visited_at", { ascending: false })
          .limit(180),
      ]);
      if (cancelled) return;

      const days = new Set<string>();
      for (const r of prog.data ?? []) {
        if (r.completed_at) days.add(dayKey(r.completed_at as unknown as string));
      }
      for (const r of recent.data ?? []) {
        if (r.visited_at) days.add(dayKey(r.visited_at as unknown as string));
      }

      // Walk back from today. Grace: allow starting from today OR yesterday
      // so a streak isn't broken by the current day not yet having activity.
      let count = 0;
      const cursor = new Date();
      cursor.setHours(0, 0, 0, 0);
      if (!days.has(dayKey(cursor))) {
        cursor.setDate(cursor.getDate() - 1);
      }
      while (days.has(dayKey(cursor))) {
        count += 1;
        cursor.setDate(cursor.getDate() - 1);
      }
      setStreak(count);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);
  return streak;
};

const ExamProgressCard = ({
  label,
  color,
  completed,
  total,
}: {
  label: string;
  color: string;
  completed: number;
  total: number;
}) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground tabular-nums">
          {completed}/{total}
        </p>
      </div>
      <div
        className="h-2 rounded-full bg-muted overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} progress`}
      >
        <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-muted-foreground">{pct}% complete</p>
    </div>
  );
};

export const HomeDashboard = () => {
  const { user, loading } = useAuth();
  const { completedTopics, getExamProgress } = useProgress();
  const { activeExam } = useExamFilter();
  const streak = useStudyStreak(user?.id);

  const scopeExam: ExamTag = activeExam ?? Exam.PRIMARY;
  const scopeLabel =
    EXAM_CARDS.find((c) => c.exam === scopeExam)?.label ?? "FRCA Primary";

  const recommendations = useMemo(() => {
    return allTopics
      .filter(
        (t) =>
          t.available &&
          t.examTags.includes(scopeExam) &&
          !completedTopics.has(t.id)
      )
      .slice(0, 3);
  }, [completedTopics, scopeExam]);

  if (loading) return null;

  if (!user) {
    return (
      <section className="rounded-2xl border border-dashed border-border bg-muted/30 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">
            Sync your progress across devices
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sign in to save what you&rsquo;ve completed, track streaks, and get exam-scoped next steps.
          </p>
        </div>
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 self-start sm:self-auto"
        >
          <Sparkles className="h-4 w-4" aria-hidden /> Sign in
        </Link>
      </section>
    );
  }

  return (
    <section aria-label="Your progress" className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-serif font-semibold text-foreground">
          Welcome back
        </h2>
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium"
          title="Consecutive days with a completion or visit"
        >
          <Flame className="h-3.5 w-3.5" aria-hidden />
          <span>{streak ?? "…"} day streak</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {EXAM_CARDS.map((card) => {
          const { completed, total } = getExamProgress(card.exam);
          return (
            <ExamProgressCard
              key={card.exam}
              label={card.label}
              color={card.color}
              completed={completed}
              total={total}
            />
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="px-4 py-3 border-b border-border flex items-baseline justify-between gap-3">
          <p className="text-sm font-medium text-foreground">
            Next up for {scopeLabel}
          </p>
          <Link
            to="/curriculum"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            See all
          </Link>
        </div>
        {recommendations.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted-foreground text-center">
            You&rsquo;ve completed every available {scopeLabel} topic. 🎉
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recommendations.map((t) => (
              <li key={t.id}>
                <Link
                  to={`/${t.section}/${t.id}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm text-foreground truncate mr-3">
                    {t.title}
                  </span>
                  <ChevronRight
                    className="h-4 w-4 text-muted-foreground shrink-0"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

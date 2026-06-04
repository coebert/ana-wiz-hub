import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, ChevronRight, Brain } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { applyGrade, GRADE_LABELS, GRADES, type Grade } from "@/lib/srs";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSrsMeta {
  /** Topic id (route segment), e.g. "end-of-life-communication". */
  topicId: string;
  /** Human-readable topic title for the review queue. */
  topicTitle: string;
  /** Section folder, e.g. "intensive-care" — used to build the back-link. */
  topicSection: string;
  /** Exam tags for filtering the review queue. */
  examTags: string[];
}

interface QuizSectionProps {
  questions: QuizQuestion[];
  /** Optional SRS metadata. When provided AND the user is logged in,
   *  the quiz exposes grading buttons that schedule each card for review. */
  srs?: QuizSrsMeta;
}

export const QuizSection = ({ questions, srs }: QuizSectionProps) => {
  const { user } = useAuth();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [_answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);
  const [graded, setGraded] = useState(false);
  const [grading, setGrading] = useState(false);

  const q = questions[currentQ];
  const srsEnabled = Boolean(srs && user);

  const handleSelect = (idx: number) => {
    if (revealed) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setRevealed(true);
    setAnswered((a) => a + 1);
    if (selected === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setRevealed(false);
      setGraded(false);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setAnswered(0);
    setFinished(false);
    setGraded(false);
  };

  const handleGrade = async (grade: Grade) => {
    if (!srs || !user || grading) return;
    setGrading(true);
    try {
      const cardId = `${srs.topicId}::${currentQ}`;
      // Fetch existing scheduler state (if any) so SM-2 builds on history.
      const { data: existing } = await supabase
        .from("srs_reviews")
        .select("ease, interval_days, repetitions, lapses")
        .eq("user_id", user.id)
        .eq("card_id", cardId)
        .maybeSingle();
      const prev = existing ?? { ease: 2.5, interval_days: 0, repetitions: 0, lapses: 0 };
      const next = applyGrade(prev, grade);
      const { error } = await supabase
        .from("srs_reviews")
        .upsert(
          {
            user_id: user.id,
            card_id: cardId,
            topic_id: srs.topicId,
            topic_title: srs.topicTitle,
            topic_section: srs.topicSection,
            topic_path: `/${srs.topicSection}/${srs.topicId}`,
            exam_tags: srs.examTags,
            question: q.question,
            options: q.options,
            correct_index: q.correctIndex,
            explanation: q.explanation,
            ease: next.ease,
            interval_days: next.interval_days,
            repetitions: next.repetitions,
            lapses: next.lapses,
            due_at: next.due_at,
            last_grade: grade,
            last_reviewed_at: new Date().toISOString(),
          },
          { onConflict: "user_id,card_id" },
        );
      if (error) throw error;
      setGraded(true);
      const dueLabel =
        next.interval_days <= 0
          ? "in ~10 min"
          : next.interval_days === 1
            ? "tomorrow"
            : `in ${next.interval_days} days`;
      toast({ title: `Scheduled ${dueLabel}`, description: GRADE_LABELS[grade].label });
    } catch (e) {
      toast({ title: "Couldn't save review", description: (e as Error).message, variant: "destructive" });
    } finally {
      setGrading(false);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mt-12 rounded-xl border-2 border-primary/20 bg-card p-6">
        <h3 className="text-xl font-serif font-bold text-foreground mb-2">Quiz Complete</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl font-bold text-primary">{pct}%</div>
          <div>
            <p className="text-foreground font-medium">{score}/{questions.length} correct</p>
            <p className="text-sm text-muted-foreground">
              {pct >= 80 ? "Excellent — strong exam readiness!" : pct >= 60 ? "Good effort — review the explanations for missed questions." : "Consider revisiting this topic before re-attempting."}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="h-4 w-4" />
            Retry Quiz
          </button>
          {srsEnabled && (
            <Link
              to="/review"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-muted transition-colors"
            >
              <Brain className="h-4 w-4" />
              Open review queue
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-xl border-2 border-primary/20 bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-serif font-bold text-foreground">Self-Assessment</h3>
        <span className="text-sm text-muted-foreground">
          Question {currentQ + 1} of {questions.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentQ ? "bg-primary" : i === currentQ ? "bg-primary/50" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <p className="text-foreground font-medium leading-relaxed mb-5">{q.question}</p>

      {/* Options */}
      <div className="space-y-2.5">
        {q.options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          let stateClass = "border-border hover:border-primary/40 hover:bg-muted/50";

          if (revealed) {
            if (idx === q.correctIndex) {
              stateClass = "border-accent bg-accent/10";
            } else if (idx === selected) {
              stateClass = "border-destructive bg-destructive/5";
            } else {
              stateClass = "border-border opacity-50";
            }
          } else if (idx === selected) {
            stateClass = "border-primary bg-primary/5";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-start gap-3 ${stateClass}`}
            >
              <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border ${
                revealed && idx === q.correctIndex
                  ? "bg-accent text-accent-foreground border-accent"
                  : revealed && idx === selected
                  ? "bg-destructive text-destructive-foreground border-destructive"
                  : idx === selected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground border-border"
              }`}>
                {revealed && idx === q.correctIndex ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : revealed && idx === selected && idx !== q.correctIndex ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  letter
                )}
              </span>
              <span className="text-sm text-foreground leading-relaxed pt-0.5">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-sm font-semibold text-foreground mb-1">Explanation</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
        </div>
      )}

      {/* Spaced-repetition grading */}
      {revealed && srs && (
        <div className="mt-4 p-4 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Schedule for review</p>
            {graded && <span className="text-xs text-muted-foreground">— scheduled</span>}
          </div>
          {srsEnabled ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g}
                  onClick={() => handleGrade(g)}
                  disabled={grading || graded}
                  className={`px-3 py-2 rounded-md border text-xs font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${GRADE_LABELS[g].tone}`}
                  title={GRADE_LABELS[g].hint}
                >
                  {GRADE_LABELS[g].label}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              <Link to="/login" className="underline hover:text-foreground">Sign in</Link> to track these cards in your personal spaced-repetition queue.
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex justify-end">
        {!revealed ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              selected !== null
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {currentQ + 1 >= questions.length ? "See Results" : "Next Question"}
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

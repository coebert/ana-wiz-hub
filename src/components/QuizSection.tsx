import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, ChevronRight } from "lucide-react";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizSectionProps {
  questions: QuizQuestion[];
}

export const QuizSection = ({ questions }: QuizSectionProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [_answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

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
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setAnswered(0);
    setFinished(false);
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
        <button
          onClick={handleRestart}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <RotateCcw className="h-4 w-4" />
          Retry Quiz
        </button>
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

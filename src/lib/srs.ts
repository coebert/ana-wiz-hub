/**
 * SM-2 spaced repetition algorithm (SuperMemo 2).
 * Grade scale: 0 = Again, 3 = Hard, 4 = Good, 5 = Easy.
 *
 * Returns the next scheduler state given the previous one and the grade.
 * Implementation follows the classic SM-2 specification with one tweak:
 * grade < 3 resets the schedule (lapse) so the card returns to the queue
 * immediately rather than disappearing for days.
 */
export type Grade = 0 | 3 | 4 | 5;

export interface SrsState {
  ease: number;
  interval_days: number;
  repetitions: number;
  lapses: number;
  due_at: string; // ISO timestamp
}

export const SRS_INITIAL: Omit<SrsState, "due_at"> & { due_at: string } = {
  ease: 2.5,
  interval_days: 0,
  repetitions: 0,
  lapses: 0,
  due_at: new Date().toISOString(),
};

const MIN_EASE = 1.3;

export function applyGrade(prev: Pick<SrsState, "ease" | "interval_days" | "repetitions" | "lapses">, grade: Grade): SrsState {
  let { ease, interval_days, repetitions, lapses } = prev;

  if (grade < 3) {
    // Lapse — reset repetitions, shorten interval, decrement ease.
    repetitions = 0;
    interval_days = 0; // re-show within the same session
    lapses += 1;
    ease = Math.max(MIN_EASE, ease - 0.2);
  } else {
    repetitions += 1;
    if (repetitions === 1) interval_days = 1;
    else if (repetitions === 2) interval_days = 6;
    else interval_days = Math.round(interval_days * ease);

    // Update ease using SM-2 formula
    ease = Math.max(
      MIN_EASE,
      ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
    );
  }

  const due = new Date();
  if (interval_days <= 0) {
    // ~10 minutes for lapses so it cycles back in the same session
    due.setMinutes(due.getMinutes() + 10);
  } else {
    due.setDate(due.getDate() + interval_days);
  }

  return {
    ease: Math.round(ease * 1000) / 1000,
    interval_days,
    repetitions,
    lapses,
    due_at: due.toISOString(),
  };
}

export const GRADE_LABELS: Record<Grade, { label: string; hint: string; tone: string }> = {
  0: { label: "Again", hint: "Got it wrong / blanked", tone: "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20" },
  3: { label: "Hard", hint: "Recalled with effort", tone: "bg-perioperative/10 text-perioperative border-perioperative/30 hover:bg-perioperative/20" },
  4: { label: "Good", hint: "Recalled correctly", tone: "bg-accent/10 text-accent-foreground border-accent/40 hover:bg-accent/20" },
  5: { label: "Easy", hint: "Trivial recall", tone: "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20" },
};

export const GRADES: Grade[] = [0, 3, 4, 5];

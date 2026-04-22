import { ReactNode } from "react";
import { FlaskConical } from "lucide-react";

export interface WorkedExample {
  /** Short scenario or calculation title */
  title: string;
  /** The clinical vignette or numerical setup */
  scenario: ReactNode;
  /** Step-by-step working / reasoning */
  working: ReactNode;
  /** Final answer or take-home message */
  answer: ReactNode;
}

interface WorkedExamplesProps {
  examples: WorkedExample[];
  /** Optional override heading */
  heading?: string;
}

/**
 * Standard "Worked Examples" block — clinical vignettes and/or numerical
 * worked calculations. Sits between Diagrams and the Summary on every topic
 * where it adds value (omit on topics where it doesn't fit).
 */
export const WorkedExamples = ({ examples, heading = "Worked Examples" }: WorkedExamplesProps) => {
  if (!examples.length) return null;
  return (
    <section>
      <h2 className="flex items-center gap-2 text-2xl font-serif font-bold text-foreground mb-4">
        <FlaskConical className="h-6 w-6 text-accent" />
        {heading}
      </h2>
      <div className="space-y-4">
        {examples.map((ex, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Example {i + 1}
            </p>
            <h3 className="text-base font-semibold text-foreground mb-3">{ex.title}</h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Scenario
                </p>
                <div className="text-foreground leading-relaxed">{ex.scenario}</div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Working
                </p>
                <div className="text-muted-foreground leading-relaxed">{ex.working}</div>
              </div>
              <div className="rounded-lg bg-accent/10 border border-accent/30 p-3">
                <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">
                  Answer / Take-home
                </p>
                <div className="text-foreground leading-relaxed">{ex.answer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

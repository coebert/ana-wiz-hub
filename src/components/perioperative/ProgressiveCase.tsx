import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronRight, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CaseCategory = "Steroid cover" | "Phaeochromocytoma" | "Antifibrinolytics";

export interface CaseStage {
  title: string;
  prompt: string;
  answer: string[];
}

export interface PerioperativeCase {
  id: string;
  title: string;
  category: CaseCategory;
  difficulty: "Foundation" | "Intermediate" | "Advanced";
  patient: string;
  presentation: string;
  stages: CaseStage[];
  takeHome: string;
  sourceLinks: Array<{ label: string; href: string }>;
}

interface ProgressiveCaseProps {
  caseData: PerioperativeCase;
}

export const ProgressiveCase = ({ caseData }: ProgressiveCaseProps) => {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(0);

  const toggleOpen = () => {
    setOpen((current) => !current);
  };

  return (
    <article className="border border-border bg-card rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary">{caseData.category}</Badge>
          <Badge variant="outline">{caseData.difficulty}</Badge>
        </div>
        <h2 className="text-xl font-serif font-bold text-foreground">{caseData.title}</h2>
        <p className="mt-2 text-sm font-medium text-foreground">{caseData.patient}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{caseData.presentation}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full sm:w-auto"
          onClick={toggleOpen}
          aria-expanded={open}
          aria-controls={`${caseData.id}-stages`}
        >
          {open ? <ChevronDown aria-hidden /> : <ChevronRight aria-hidden />}
          {open ? "Close case" : "Start case"}
        </Button>
      </div>

      {open && (
        <div id={`${caseData.id}-stages`} className="border-t border-border bg-surface p-4 sm:p-5 space-y-4">
          {caseData.stages.map((stage, index) => {
            const isRevealed = index < revealed;
            const isAvailable = index <= revealed;
            return (
              <section
                key={stage.title}
                className={cn(
                  "border-l-2 pl-4",
                  isRevealed ? "border-accent" : "border-border",
                  !isAvailable && "opacity-55",
                )}
              >
                <div className="flex items-start gap-2">
                  {isRevealed ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent mt-0.5" aria-hidden />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" aria-hidden />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">Stage {index + 1}</p>
                    <h3 className="font-semibold text-foreground">{stage.title}</h3>
                    {isAvailable && <p className="mt-2 text-sm leading-relaxed text-foreground">{stage.prompt}</p>}
                    {isAvailable && !isRevealed && (
                      <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={() => setRevealed(index + 1)}>
                        Reveal model answer
                      </Button>
                    )}
                    {isRevealed && (
                      <div className="mt-3 rounded-md border border-accent/30 bg-accent/10 p-3">
                        <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-foreground">
                          {stage.answer.map((point) => <li key={point}>{point}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}

          {revealed === caseData.stages.length && (
            <aside className="rounded-md border border-primary/25 bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase text-primary">Take-home</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">{caseData.takeHome}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                Sources:{" "}
                {caseData.sourceLinks.map((source, index) => (
                  <span key={source.href}>
                    {index > 0 && " · "}
                    <a className="underline underline-offset-4 hover:text-foreground" href={source.href} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </span>
                ))}
              </p>
            </aside>
          )}
        </div>
      )}
    </article>
  );
};
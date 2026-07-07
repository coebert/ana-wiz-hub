import { ReactNode } from "react";
import { ProgressRing } from "@/components/shared/ProgressRing";

export type SectionHeaderKey =
  | "physics"
  | "physiology"
  | "pharmacology"
  | "anatomy"
  | "clinical"
  | "intensive-care"
  | "perioperative"
  | "chemistry";

const RULE_VAR: Record<SectionHeaderKey, string> = {
  physics: "--physics",
  physiology: "--physiology",
  pharmacology: "--pharmacology",
  anatomy: "--anatomy",
  clinical: "--clinical",
  "intensive-care": "--icu",
  perioperative: "--perioperative",
  chemistry: "--chemistry",
};

const DOT: Record<SectionHeaderKey, string> = {
  physics: "bg-physics",
  physiology: "bg-physiology",
  pharmacology: "bg-pharmacology",
  anatomy: "bg-anatomy",
  clinical: "bg-clinical",
  "intensive-care": "bg-icu",
  perioperative: "bg-perioperative",
  chemistry: "bg-chemistry",
};

interface SectionHeaderProps {
  section: SectionHeaderKey;
  /** Body copy of the introduction card. */
  intro: ReactNode;
  completed: number;
  total: number;
  /** Small eyebrow label above the intro (e.g. "Physics · FRCA · FFICM"). */
  eyebrow?: string;
}

/**
 * Unified section header used at the top of every discipline page. Merges
 * the previous two separate boxes (progress card + intro paragraph) into
 * one anchor-target card marked with the section's category rule on the
 * left, a progress ring + thin CTA-amber bar on the right, and a
 * semantic `id="introduction"` so the sticky sub-nav can scroll to it.
 */
export const SectionHeader = ({ section, intro, completed, total, eyebrow }: SectionHeaderProps) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <section
      id="introduction"
      aria-labelledby="section-intro-title"
      className="scroll-mt-28 mb-6 md:mb-8 rounded-xl border border-border bg-card shadow-elev-1 p-5 md:p-6"
      style={{
        borderLeftWidth: "3px",
        borderLeftColor: `hsl(var(${RULE_VAR[section]}))`,
      }}
    >
      <h2 id="section-intro-title" className="sr-only">
        Introduction
      </h2>
      <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          {eyebrow && (
            <p className="eyebrow text-muted-foreground mb-2 flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${DOT[section]}`} aria-hidden />
              {eyebrow}
            </p>
          )}
          <div className="text-sm sm:text-[15px] text-foreground/85 leading-relaxed">
            {intro}
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0">
          <ProgressRing completed={completed} total={Math.max(1, total)} size={48} strokeWidth={3} />
          <div className="sm:text-right">
            <p className="mono text-sm font-semibold text-foreground leading-none">
              {completed}
              <span className="text-muted-foreground font-normal"> / {total}</span>
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">topics complete</p>
          </div>
        </div>
      </div>
      <div className="mt-4 h-1 rounded-full bg-muted overflow-hidden" aria-hidden>
        <div
          className="h-full bg-cta rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
};

import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LAB_GLOSSARY, type LabKey, type SourceLink } from "@/lib/lab-glossary";

interface LabGlossaryPopoverProps {
  /** Which canonical lab to look up in the central glossary. */
  labKey: LabKey;
  /** The trigger element (a number, a chip, an SVG label etc.). */
  children: ReactNode;
  /** Optional copy overrides — useful when a specific clinical context
   *  needs different wording (e.g. K⁺ in refeeding vs DKA). The sources
   *  are appended (not replaced) unless you also pass *Sources. */
  overrides?: {
    trend?: string;
    why?: string;
    clinical?: string;
    action?: string;
    trendSources?: SourceLink[];
    actionSources?: SourceLink[];
  };
  /** Popover side / align passthroughs for layout flexibility. */
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

/**
 * Reusable lab-value glossary popover with sourced trend + action chips.
 *
 * Wraps any clickable element (typically a number, chip, or SVG-bound
 * trigger) and renders the canonical glossary entry from `LAB_GLOSSARY`.
 * Each external chip carries the verbatim supporting quote in its title
 * attribute so the user can hover for instant context, or click to open
 * the underlying BJA Education / NICE / ASPEN / Endocrine Society source.
 */
const LabGlossaryPopover = ({
  labKey,
  children,
  overrides,
  side = "top",
  align = "center",
}: LabGlossaryPopoverProps) => {
  const base = LAB_GLOSSARY[labKey];
  const trend = overrides?.trend ?? base.trend;
  const why = overrides?.why ?? base.why;
  const clinical = overrides?.clinical ?? base.clinical;
  const action = overrides?.action ?? base.action;
  const trendSources = overrides?.trendSources ?? base.trendSources;
  const actionSources = overrides?.actionSources ?? base.actionSources;

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side={side} align={align} className="w-72 text-xs p-3">
        <p className="font-serif font-semibold text-foreground text-sm leading-tight">{base.full}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Reference range {base.lo}–{base.hi} {base.unit}
        </p>
        <dl className="mt-2 space-y-1.5">
          <div>
            <dt className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
              Typical trend
            </dt>
            <dd className="text-foreground leading-snug">{trend}</dd>
            {trendSources.length > 0 && (
              <dd className="mt-1 flex flex-wrap gap-1">
                {trendSources.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.quote}
                    className="inline-flex items-center gap-0.5 rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </dd>
            )}
          </div>

          <div>
            <dt className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
              Why it changes
            </dt>
            <dd className="text-muted-foreground leading-snug">{why}</dd>
          </div>

          <div>
            <dt className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
              Clinical effects
            </dt>
            <dd className="text-muted-foreground leading-snug">{clinical}</dd>
          </div>

          <div className="rounded border-l-2 border-primary/60 bg-primary/5 px-2 py-1">
            <dt className="text-[10px] uppercase tracking-wider font-semibold text-primary">Action</dt>
            <dd className="text-foreground leading-snug">{action}</dd>
            {actionSources.length > 0 && (
              <dd className="mt-1 flex flex-wrap gap-1">
                {actionSources.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.quote}
                    className="inline-flex items-center gap-0.5 rounded border border-primary/30 bg-card px-1.5 py-0.5 text-[9px] font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </dd>
            )}
          </div>
        </dl>
      </PopoverContent>
    </Popover>
  );
};

export default LabGlossaryPopover;

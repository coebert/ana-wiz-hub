import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SynthesisBlockProps {
  /** Section heading shown at the top of the block. Defaults to "Synthesis". */
  title?: string;
  /** Optional one-line subheading explaining what's being synthesised. */
  subtitle?: string;
  /** Body content — typically a comparison table, summary list, or both. */
  children: ReactNode;
  /** Visual style. `table` for comparative data, `summary` for high-level takeaways. */
  variant?: "table" | "summary";
  className?: string;
}

/**
 * Standardised end-of-topic synthesis section.
 * Sits directly before <KeyLearningPoints /> on long topics, providing either a
 * comparative table (for topics that contrast multiple agents/modalities) or a
 * summary callout box (for single-disease topics) so the reader leaves with a
 * consolidated view before the bullet-point recap.
 */
export const SynthesisBlock = ({
  title = "Synthesis",
  subtitle,
  children,
  variant = "table",
  className,
}: SynthesisBlockProps) => {
  return (
    <section
      className={cn(
        "mb-10 rounded-xl border border-primary/20 bg-primary/5 p-5 md:p-6",
        className
      )}
      aria-label={title}
    >
      <header className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </header>

      <div
        className={cn(
          variant === "table" && "overflow-x-auto",
          variant === "summary" && "space-y-3 text-sm text-foreground/90 leading-relaxed"
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default SynthesisBlock;

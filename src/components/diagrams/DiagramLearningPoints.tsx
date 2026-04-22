import { GraduationCap, ArrowDownToLine } from "lucide-react";

interface DiagramLearningPointsProps {
  /** FRCA-style learning points relevant to the active diagram tab. */
  points: string[];
  /** DOM id of the matching <ExamSection> on the parent topic page. */
  anchorId: string;
  /** Human label for the curriculum subsection (e.g. "Refraction & TIR"). */
  anchorLabel: string;
  /** Optional override for the heading. Defaults to "FRCA learning points". */
  title?: string;
}

/**
 * Compact FRCA learning-points card displayed beneath each interactive
 * diagram tab. Includes a one-click jump to the matching curriculum
 * subsection via in-page anchor scrolling.
 */
export const DiagramLearningPoints = ({
  points,
  anchorId,
  anchorLabel,
  title = "FRCA learning points",
}: DiagramLearningPointsProps) => {
  const handleJump = () => {
    const el = document.getElementById(anchorId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // Brief highlight pulse for orientation
    el.classList.add("ring-2", "ring-primary", "ring-offset-2", "rounded-md");
    window.setTimeout(() => {
      el.classList.remove("ring-2", "ring-primary", "ring-offset-2", "rounded-md");
    }, 1600);
  };

  return (
    <aside
      role="note"
      aria-label={`${title} for ${anchorLabel}`}
      className="mt-3 rounded-lg border border-border bg-background/60 p-3 space-y-2"
      style={{ borderLeftWidth: 4, borderLeftColor: "hsl(var(--accent))" }}
    >
      <div className="flex items-center gap-2">
        <GraduationCap className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        <p className="text-[11px] font-bold uppercase tracking-wide text-accent">{title}</p>
      </div>
      <ul className="text-xs text-muted-foreground leading-relaxed space-y-1 list-disc pl-4">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={handleJump}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1 py-0.5"
        aria-label={`Jump to ${anchorLabel} curriculum section`}
      >
        <ArrowDownToLine className="h-3.5 w-3.5" aria-hidden="true" />
        Jump to “{anchorLabel}” in the curriculum
      </button>
    </aside>
  );
};

export default DiagramLearningPoints;

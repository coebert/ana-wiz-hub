import { GraduationCap } from "lucide-react";

interface FRCARelevanceCalloutProps {
  /** Plain-language one-liner of the high-yield anaesthetic message. */
  bottomLine: string;
  /** Short bullet implications a candidate should be able to verbalise. */
  implications: string[];
  /** Short, exam-typical phrases / triggers — rendered as chips. */
  buzzwords: string[];
  /** Optional viva-style stem prompt. */
  vivaStem?: string;
}

/**
 * Compact "FRCA relevance" callout to sit under each neuro disease diagram.
 * Highlights the high-yield anaesthetic implications and exam buzzwords.
 */
export const FRCARelevanceCallout = ({
  bottomLine,
  implications,
  buzzwords,
  vivaStem,
}: FRCARelevanceCalloutProps) => {
  return (
    <aside
      className="my-4 rounded-xl border border-clinical/30 bg-clinical/5 p-4"
      aria-label="FRCA relevance"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-clinical/15 text-clinical">
          <GraduationCap className="h-4 w-4" aria-hidden />
        </span>
        <h4 className="text-sm font-semibold text-foreground">FRCA relevance</h4>
        <span className="ml-auto text-[10px] uppercase tracking-wide text-clinical/80 font-semibold">
          High-yield
        </span>
      </div>

      <p className="text-sm text-foreground/90 leading-relaxed mb-3">
        <span className="font-semibold">Bottom line: </span>
        {bottomLine}
      </p>

      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-3">
        {implications.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <div className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
        Exam buzzwords
      </div>
      <div className="flex flex-wrap gap-1.5">
        {buzzwords.map((b, i) => (
          <span
            key={i}
            className="text-[11px] px-2 py-0.5 rounded-full border border-clinical/30 bg-card text-foreground/90"
          >
            {b}
          </span>
        ))}
      </div>

      {vivaStem && (
        <div className="mt-3 text-xs italic text-muted-foreground border-l-2 border-clinical/40 pl-3">
          <span className="not-italic font-semibold text-foreground/80">Viva stem: </span>
          {vivaStem}
        </div>
      )}
    </aside>
  );
};

export default FRCARelevanceCallout;

import { ExternalLink } from "lucide-react";

export interface Reference {
  id: string;
  /** Numeric ordering — also displayed in the superscript. */
  n: number;
  authors: string;
  title: string;
  source: string;
  year: string | number;
  url?: string;
}

interface CiteProps {
  refs: Pick<Reference, "id" | "n">[];
}

/**
 * Inline superscript citation. Usage:
 *   <Cite refs={[{ id: "iaea-tube", n: 1 }]} />
 * Renders e.g. ¹ as a link to #ref-iaea-tube.
 */
export const Cite = ({ refs }: CiteProps) => (
  <sup className="text-[10px] ml-0.5">
    {refs.map((r, i) => (
      <span key={r.id}>
        {i > 0 && ","}
        <a
          href={`#ref-${r.id}`}
          className="text-primary hover:underline tabular-nums"
          aria-label={`Reference ${r.n}`}
        >
          {r.n}
        </a>
      </span>
    ))}
  </sup>
);

interface ReferencesListProps {
  references: Reference[];
  title?: string;
}

/**
 * Renders a numbered references list with anchor ids of the form `ref-<id>`,
 * matching the targets created by <Cite />.
 */
export const ReferencesList = ({ references, title = "References" }: ReferencesListProps) => (
  <div className="not-prose">
    <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
    <ol className="space-y-2 text-xs text-muted-foreground list-none pl-0">
      {references
        .slice()
        .sort((a, b) => a.n - b.n)
        .map((r) => (
          <li
            key={r.id}
            id={`ref-${r.id}`}
            className="flex gap-2 scroll-mt-24 leading-snug"
          >
            <span className="tabular-nums font-medium text-foreground shrink-0 w-6">
              {r.n}.
            </span>
            <span className="min-w-0">
              <span className="text-foreground">{r.authors}</span>
              {". "}
              <em>{r.title}</em>
              {". "}
              <span>{r.source}</span>
              {", "}
              <span className="tabular-nums">{r.year}</span>
              {r.url && (
                <>
                  {". "}
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-primary hover:underline break-all"
                  >
                    {r.url.replace(/^https?:\/\//, "")}
                    <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
                  </a>
                </>
              )}
            </span>
          </li>
        ))}
    </ol>
  </div>
);

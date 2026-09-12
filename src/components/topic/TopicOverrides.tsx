import { CheckCircle2, FileEdit, PlusCircle, AlertTriangle, ExternalLink } from "lucide-react";
import type { ContentOverride } from "@/hooks/useContentOverrides";

/** Renders plain-text bodies with blank-line paragraphs and "- " bullets. */
const RichText = ({ text }: { text: string }) => {
  const blocks = text.split(/\n{2,}/).filter((b) => b.trim().length > 0);
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const isList = lines.length > 0 && lines.every((l) => /^[-•*]\s+/.test(l));
        if (isList) {
          return (
            <ul key={i} className="space-y-1.5">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-2 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{l.replace(/^[-•*]\s+/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-sm leading-relaxed text-foreground">
            {block}
          </p>
        );
      })}
    </div>
  );
};

const kindMeta = {
  note: { label: "Editor's note", Icon: FileEdit },
  correction: { label: "Correction", Icon: AlertTriangle },
  subsection: { label: "Added subsection", Icon: PlusCircle },
} as const;

/** Blocks (notes, corrections, added subsections) published from the admin editor. */
export const TopicOverrideBlocks = ({
  blocks,
  anchor,
}: {
  blocks: ContentOverride[];
  /** Optional: only render blocks pinned to this section name. */
  anchor?: string;
}) => {
  const visible = anchor ? blocks.filter((b) => b.anchor === anchor) : blocks;
  if (visible.length === 0) return null;


  return (
    <div className="space-y-4">
      {visible.map((b) => {
        const meta = kindMeta[(b.kind as keyof typeof kindMeta) ?? "note"] ?? kindMeta.note;
        const { Icon } = meta;
        return (
          <section
            key={b.id}
            className="rounded-lg border border-border bg-muted/30 p-4 sm:p-5 space-y-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {meta.label}
              </p>
              {b.anchor && (
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  · {b.anchor}
                </p>
              )}
            </div>

            {b.heading && <h3 className="h3">{b.heading}</h3>}
            {b.kind === "correction" && b.original_text && (
              <blockquote className="border-l-2 border-destructive/60 pl-3 text-sm italic text-muted-foreground">
                {b.original_text}
              </blockquote>
            )}
            <RichText text={b.body} />
            <p className="text-[11px] text-muted-foreground">
              Updated {new Date(b.updated_at).toLocaleDateString("en-GB")}
            </p>
          </section>
        );
      })}
    </div>
  );
};

/** Extra key learning points published from the admin editor. */
export const TopicOverrideKeyPoints = ({ points }: { points: ContentOverride[] }) => {
  if (points.length === 0) return null;
  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Additional key points
      </p>
      <ul className="space-y-2">
        {points.map((p) => (
          <li key={p.id} className="flex gap-2 text-sm leading-relaxed text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>{p.body}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/** Extra references published from the admin editor. */
export const TopicOverrideReferences = ({ refs }: { refs: ContentOverride[] }) => {
  if (refs.length === 0) return null;
  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 space-y-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Additional references
      </p>
      <ol className="space-y-3">
        {refs.map((r) => (
          <li key={r.id} className="text-sm leading-relaxed text-foreground">
            {r.ref_label && <span className="font-semibold">{r.ref_label}. </span>}
            <span>{r.body}</span>
            {r.ref_url && (
              <a
                href={r.ref_url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 inline-flex items-center gap-1 text-primary underline underline-offset-2"
              >
                Source <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            )}
            {r.ref_pmid && (
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${r.ref_pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-primary underline underline-offset-2"
              >
                PMID {r.ref_pmid}
              </a>
            )}
            {r.ref_excerpt && (
              <blockquote className="mt-1 border-l-2 border-border pl-3 text-xs italic text-muted-foreground">
                “{r.ref_excerpt}”
              </blockquote>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

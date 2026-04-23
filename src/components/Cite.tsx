import { topicReferences } from "@/data/references";

interface CiteProps {
  /** Topic ID — used to look up the master reference list. */
  topicId: string;
  /**
   * One or more reference labels (must exist in `topicReferences[topicId]`).
   * Numbers are auto-assigned based on the master list's order so they
   * match the bottom <ReferencesList> exactly.
   */
  labels: string[];
}

const slugify = (label: string) =>
  label
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const SUPER_DIGITS: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
};

const toSuperscript = (n: number) =>
  String(n)
    .split("")
    .map((d) => SUPER_DIGITS[d] ?? d)
    .join("");

/**
 * Inline numeric citation, e.g. <Cite topicId="tiva" labels={["NAP5"]} /> →
 * a clickable superscript ⁴ that scrolls to `#ref-nap5` in the auto-rendered
 * <ReferencesList> at the bottom of the page.
 *
 * Numbering is derived from the position of each label in
 * `topicReferences[topicId]`, so the superscripts always match the ordered
 * list visible at the bottom of the topic — no manual numbering required.
 *
 * Unknown labels are silently skipped (with a dev-only console.warn) so a
 * typo never crashes the page.
 */
export const Cite = ({ topicId, labels }: CiteProps) => {
  const refs = topicReferences[topicId] ?? [];
  if (refs.length === 0 || labels.length === 0) return null;

  const numbered = labels
    .map((label) => {
      const idx = refs.findIndex((r) => r.label === label);
      if (idx === -1) {
        if (import.meta.env.DEV) {
          console.warn(
            `[Cite] Unknown reference label "${label}" for topic "${topicId}". ` +
              `Add it to topicReferences["${topicId}"] in src/data/references.ts.`,
          );
        }
        return null;
      }
      return { label, n: idx + 1, slug: slugify(label) };
    })
    .filter((x): x is { label: string; n: number; slug: string } => x !== null);

  if (numbered.length === 0) return null;

  return (
    <sup className="ml-0.5 inline-flex gap-0.5 text-[0.7em] leading-none">
      {numbered.map(({ label, n, slug }, i) => (
        <a
          key={`${slug}-${i}`}
          href={`#ref-${slug}`}
          aria-label={`Reference ${n}: ${label}`}
          title={label}
          className="text-primary hover:text-primary/80 hover:underline cursor-pointer no-underline"
        >
          {toSuperscript(n)}
          {i < numbered.length - 1 && <span aria-hidden="true">,</span>}
        </a>
      ))}
    </sup>
  );
};

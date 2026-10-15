import type { ReactNode } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { topicReferences } from "@/data/references";

/** Shared building blocks for the standalone endocrine emergency pages. Quotes resolve verified excerpt records so wording cannot drift. */
export const lessonWrap = "space-y-4 text-sm text-muted-foreground leading-relaxed";
export const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
export const Check = ({ question, children }: { question: string; children: ReactNode }) => (
  <details className="border-l-2 border-primary pl-4">
    <summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary>
    <p className="mt-2">{children}</p>
  </details>
);
export const Reasoning = () => <strong className="text-foreground">Teaching synthesis: </strong>;
export function makeQuote(topicId: string) {
  return function Quote({ label }: { label: string }) {
    const ref = topicReferences[topicId]?.find((item) => item.label === label);
    if (!ref?.excerpt) return null;
    return (
      <blockquote className="border-l-2 border-primary pl-4 text-foreground">
        <p>&ldquo;{ref.excerpt}&rdquo;<InlineRef topicId={topicId} refLabel={label} /></p>
      </blockquote>
    );
  };
}

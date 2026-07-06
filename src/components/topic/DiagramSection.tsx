import { ReactNode } from "react";

interface DiagramSectionProps {
  /** Required heading rendered as <h2> — also used as the auto-TOC label. */
  title: string;
  /** Optional intro paragraph shown above the diagram. */
  intro?: ReactNode;
  /** The diagram component(s) to render. */
  children: ReactNode;
  /** Optional anchor id; otherwise the auto-TOC will generate one from the title. */
  id?: string;
  className?: string;
}

/**
 * Wrapper that guarantees every diagram is preceded by a contextual <h2>.
 *
 * Topics should prefer this over rendering a *Diagram component directly,
 * so the page outline (and the auto-generated StickyTOC) always reflects the
 * diagram's purpose. Enforced statically by the
 * `lovable-local/diagram-needs-heading` ESLint rule.
 */
export const DiagramSection = ({
  title,
  intro,
  children,
  id,
  className,
}: DiagramSectionProps) => {
  return (
    <section id={id} className={`scroll-mt-24 ${className ?? ""}`}>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-3">{title}</h2>
      {intro && (
        <div className="text-muted-foreground leading-relaxed mb-3">{intro}</div>
      )}
      {children}
    </section>
  );
};

export default DiagramSection;

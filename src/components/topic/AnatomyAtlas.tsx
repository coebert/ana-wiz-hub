import type { ReactNode } from "react";
import { InlineRef } from "@/components/references/InlineRef";

/* Shared SVG styling — semantic tokens only */
export const ink = "hsl(var(--foreground))";
export const muted = "hsl(var(--muted-foreground))";
export const fillA = "hsl(var(--muted))";
export const accent = "hsl(var(--primary))";
export const danger = "hsl(var(--destructive))";
export const vessel = "hsl(var(--destructive) / 0.75)";
export const nerve = "hsl(var(--accent-foreground))";

export const Label = ({ x, y, tx, ty, children, anchor = "start" }: { x: number; y: number; tx: number; ty: number; children: string; anchor?: "start" | "end" | "middle" }) => (
  <g>
    <line x1={x} y1={y} x2={tx} y2={ty} stroke={muted} strokeWidth={0.8} />
    <circle cx={x} cy={y} r={2} fill={ink} />
    <text x={tx + (anchor === "start" ? 3 : anchor === "end" ? -3 : 0)} y={ty + 3} fontSize={10} fill={ink} textAnchor={anchor}>{children}</text>
  </g>
);

export const Svg = ({ title, children }: { title: string; children: ReactNode }) => (
  <svg viewBox="-110 0 620 300" role="img" aria-label={title} className="w-full h-auto bg-background">
    <title>{title}</title>
    {children}
  </svg>
);

export type AtlasPlate = { Diagram: () => JSX.Element; title: string; landmarks: { text: string; ref: string }[]; relevance: string };

export const AnatomyAtlas = ({ id, heading, topicId, plates }: { id: string; heading: string; topicId: string; plates: AtlasPlate[] }) => (
  <section id={id} className="scroll-mt-24 mb-10">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-2">{heading}</h2>
    <p className="text-sm text-muted-foreground mb-4">
      Labelled schematic diagrams — positions are simplified and not to scale. Each landmark is linked to its source.
    </p>
    <div className="grid gap-6 md:grid-cols-2">
      {plates.map(({ Diagram, title, landmarks, relevance }) => (
        <figure key={title} className="rounded-lg border border-border bg-card overflow-hidden">
          <Diagram />
          <figcaption className="p-4 space-y-2">
            <p className="font-semibold text-foreground">{title}</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {landmarks.map((l) => (
                <li key={l.text}>{l.text} <InlineRef topicId={topicId} refLabel={l.ref} /></li>
              ))}
            </ul>
            <p className="text-sm text-foreground"><strong>Anaesthetic relevance:</strong> {relevance}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

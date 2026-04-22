import { Calculator } from "lucide-react";
import { ReactNode } from "react";

interface WorkedExampleCalloutProps {
  title: string;
  scenario: ReactNode;
  numbers: ReactNode;
  takeaway: ReactNode;
}

/**
 * Compact "worked example" callout used beneath interactive physics diagrams.
 * Provides a clinical scenario, the numerical reasoning, and a take-home line.
 * Accent-coloured 4px left border keeps it visually grouped with its diagram.
 */
export const WorkedExampleCallout = ({ title, scenario, numbers, takeaway }: WorkedExampleCalloutProps) => (
  <aside
    role="note"
    aria-label={`Worked example: ${title}`}
    className="mt-3 rounded-lg border border-border bg-background/60 p-3 space-y-2"
    style={{ borderLeftWidth: 4, borderLeftColor: "hsl(var(--primary))" }}
  >
    <div className="flex items-center gap-2">
      <Calculator className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
      <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Worked example</p>
      <p className="text-xs font-semibold text-foreground">{title}</p>
    </div>
    <p className="text-xs text-muted-foreground leading-relaxed">
      <span className="font-medium text-foreground">Scenario:</span> {scenario}
    </p>
    <p className="text-xs text-muted-foreground leading-relaxed">
      <span className="font-medium text-foreground">Working:</span> {numbers}
    </p>
    <p className="text-xs text-foreground/90 leading-relaxed">
      <span className="font-medium text-primary">Take-home:</span> {takeaway}
    </p>
  </aside>
);

export default WorkedExampleCallout;

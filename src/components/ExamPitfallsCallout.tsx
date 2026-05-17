import { AlertTriangle } from "lucide-react";
import { ReactNode } from "react";

interface ExamPitfallsCalloutProps {
  title?: string;
  pitfalls: ReactNode[];
}

/**
 * Standardised closing callout for topic pages.
 * Highlights high-yield exam pitfalls and clinical pearls.
 * Themed against the physiology accent by default via accent token.
 */
export const ExamPitfallsCallout = ({
  title = "Exam pitfalls & clinical pearls",
  pitfalls,
}: ExamPitfallsCalloutProps) => (
  <div className="rounded-xl border border-physiology/30 bg-physiology/5 p-4 md:p-5">
    <div className="flex items-center gap-2 mb-3">
      <AlertTriangle className="w-4 h-4 text-physiology" />
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
    </div>
    <ul className="space-y-2 text-sm text-foreground/85 list-disc list-inside leading-relaxed">
      {pitfalls.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

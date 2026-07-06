import { AlertTriangle } from "lucide-react";
import { ReactNode } from "react";

type Accent = "physics" | "physiology" | "pharmacology" | "clinical" | "icu" | "perioperative";

interface ExamPitfallsCalloutProps {
  title?: string;
  pitfalls: ReactNode[];
  accent?: Accent;
}

const ACCENT_CLASSES: Record<Accent, { border: string; bg: string; text: string }> = {
  physics:        { border: "border-physics/30",        bg: "bg-physics/5",        text: "text-physics" },
  physiology:     { border: "border-physiology/30",     bg: "bg-physiology/5",     text: "text-physiology" },
  pharmacology:   { border: "border-pharmacology/30",   bg: "bg-pharmacology/5",   text: "text-pharmacology" },
  clinical:       { border: "border-clinical/30",       bg: "bg-clinical/5",       text: "text-clinical" },
  icu:            { border: "border-icu/30",            bg: "bg-icu/5",            text: "text-icu" },
  perioperative:  { border: "border-perioperative/30",  bg: "bg-perioperative/5",  text: "text-perioperative" },
};

/**
 * Standardised closing callout for topic pages.
 * Highlights high-yield exam pitfalls and clinical pearls.
 * Accent defaults to the physiology token but can be themed per section.
 */
export const ExamPitfallsCallout = ({
  title = "Exam pitfalls & clinical pearls",
  pitfalls,
  accent = "physiology",
}: ExamPitfallsCalloutProps) => {
  const c = ACCENT_CLASSES[accent];
  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-4 md:p-5`}>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className={`w-4 h-4 ${c.text}`} />
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-2 text-sm text-foreground/85 list-disc list-inside leading-relaxed">
        {pitfalls.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "../_shared/DiagramFigure";

export interface BrainRegion {
  name: string;
  note: string;
  primaryFRCA: string[];
  finalFRCA: string[];
}

type Filter = "both" | "primary" | "final";

interface Props {
  regions: BrainRegion[];
}

/**
 * Shared labelled-regions list with a Primary/Final/Both filter toggle.
 * Used by all brain anatomy diagrams (lateral, medial, coronal, axial).
 */
export const BrainRegionsList = ({ regions }: Props) => {
  const [filter, setFilter] = useState<Filter>("both");

  const showPrimary = filter === "both" || filter === "primary";
  const showFinal = filter === "both" || filter === "final";

  return (
    <DiagramFigure
      id="brain-regions-list"
      title="Brain regions list"
      description="Shared labelled-regions list with a Primary/Final/Both filter toggle. Used by all brain anatomy diagrams (lateral, medial, coronal, axial)."
    >
                  <div className="px-4 sm:px-6 py-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">
            Labelled regions — clinical relevance &amp; FRCA learning objectives
          </p>
          <div
            role="group"
            aria-label="Filter learning objectives by exam"
            className="inline-flex rounded-md border border-border bg-muted/40 p-0.5"
          >
            <Button
              type="button"
              size="sm"
              variant={filter === "both" ? "default" : "ghost"}
              className="h-7 px-3 text-xs"
              onClick={() => setFilter("both")}
              aria-pressed={filter === "both"}
            >
              Both
            </Button>
            <Button
              type="button"
              size="sm"
              variant={filter === "primary" ? "default" : "ghost"}
              className="h-7 px-3 text-xs"
              onClick={() => setFilter("primary")}
              aria-pressed={filter === "primary"}
            >
              Primary FRCA
            </Button>
            <Button
              type="button"
              size="sm"
              variant={filter === "final" ? "default" : "ghost"}
              className="h-7 px-3 text-xs"
              onClick={() => setFilter("final")}
              aria-pressed={filter === "final"}
            >
              Final FRCA
            </Button>
          </div>
        </div>
  
        <ul className="space-y-2">
          {regions.map((r) => (
            <li key={r.name} className="p-3 rounded-lg border border-border space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.note}</p>
              </div>
              <div
                className={
                  showPrimary && showFinal
                    ? "grid sm:grid-cols-2 gap-2"
                    : "grid grid-cols-1 gap-2"
                }
              >
                {showPrimary && (
                  <div className="rounded-md bg-physiology/10 border border-physiology/30 p-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-physiology mb-1">
                      Primary FRCA
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      {r.primaryFRCA.map((o) => (
                        <li key={o} className="text-xs text-foreground/80 leading-snug">{o}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {showFinal && (
                  <div className="rounded-md bg-clinical/10 border border-clinical/30 p-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-clinical mb-1">
                      Final FRCA
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      {r.finalFRCA.map((o) => (
                        <li key={o} className="text-xs text-foreground/80 leading-snug">{o}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DiagramFigure>
  );
};

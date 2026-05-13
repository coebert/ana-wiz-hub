import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BrainLateralPlate } from "./BrainAnatomyDiagram";
import { BrainMedialPlate } from "./BrainMedialDiagram";
import { BrainCoronalPlate } from "./BrainCoronalDiagram";
import { BrainAxialPlate } from "./BrainAxialDiagram";
import { DiagramFigure } from "./_shared/DiagramFigure";

type View = "lateral" | "medial" | "coronal" | "axial";

const VIEWS: { id: View; label: string; sub: string }[] = [
  { id: "lateral", label: "Lateral", sub: "Surface lobes" },
  { id: "medial", label: "Medial", sub: "Midsagittal" },
  { id: "coronal", label: "Coronal", sub: "Frontal section" },
  { id: "axial", label: "Axial", sub: "Transverse section" },
];

/**
 * Unified panel that hosts all four brain plates (lateral, medial, coronal,
 * axial) inside a single scrollable card. Switching views swaps the plate,
 * its overlay labels and the labelled-regions list below.
 */
const BrainPlatesViewer = () => {
  const [view, setView] = useState<View>("lateral");

  return (
    <DiagramFigure
      id="brain-plates-viewer"
      title="Brain plates viewer"
      description="Auto-generated wrapper for the Brain plates viewer anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-border bg-muted/20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">
                Brain anatomy plates
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Switch between the four standard anatomical views in one panel.
              </p>
            </div>
            <div
              role="tablist"
              aria-label="Brain anatomical view"
              className="inline-flex flex-wrap rounded-md border border-border bg-background p-0.5 gap-0.5"
            >
              {VIEWS.map((v) => (
                <Button
                  key={v.id}
                  role="tab"
                  aria-selected={view === v.id}
                  size="sm"
                  variant={view === v.id ? "default" : "ghost"}
                  className="h-8 px-3 text-xs flex flex-col items-start leading-tight"
                  onClick={() => setView(v.id)}
                >
                  <span className="font-semibold">{v.label}</span>
                  <span className="text-[9px] opacity-70 -mt-0.5">{v.sub}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
  
        <div role="tabpanel" aria-label={`${view} view`}>
          {view === "lateral" && <BrainLateralPlate />}
          {view === "medial" && <BrainMedialPlate />}
          {view === "coronal" && <BrainCoronalPlate />}
          {view === "axial" && <BrainAxialPlate />}
        </div>
      </div>
    </DiagramFigure>
  );
};

export default BrainPlatesViewer;

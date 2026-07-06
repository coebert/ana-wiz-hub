import { useState, ReactNode } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Zoom = 1 | 1.5 | 2 | 3;
const STEPS: Zoom[] = [1, 1.5, 2, 3];

interface EcgStripFrameProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

/**
 * Wraps an ECG rhythm-strip SVG with a zoom toggle so the trace stays
 * legible on small screens. At zoom > 1 the strip overflows horizontally
 * and the container becomes scrollable.
 */
export const EcgStripFrame = ({ children, label = "rhythm strip", className }: EcgStripFrameProps) => {
  const [zoom, setZoom] = useState<Zoom>(1);

  const idx = STEPS.indexOf(zoom);
  const canIn = idx < STEPS.length - 1;
  const canOut = idx > 0;

  return (
    <DiagramFigure
      id="ecg-strip-frame"
      title="ECG strip frame"
      description="Auto-generated wrapper for the ECG strip frame anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className={cn("relative group", className)}>
        <div
          className="w-full overflow-x-auto rounded-md"
          role="region"
          aria-label={`${label} (zoom ${zoom}x)`}
        >
          <div
            style={{ width: `${zoom * 100}%`, minWidth: zoom === 1 ? undefined : `${zoom * 100}%` }}
            className="origin-left"
          >
            {children}
          </div>
        </div>
  
        <div className="absolute top-1 right-1 flex items-center gap-0.5 bg-background/90 backdrop-blur border border-border rounded-md shadow-sm p-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => canOut && setZoom(STEPS[idx - 1])}
            disabled={!canOut}
            aria-label={`Zoom out ${label}`}
            className="p-1 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="text-[10px] font-semibold tabular-nums text-muted-foreground px-1 min-w-[28px] text-center">
            {zoom}×
          </span>
          <button
            type="button"
            onClick={() => canIn && setZoom(STEPS[idx + 1])}
            disabled={!canIn}
            aria-label={`Zoom in ${label}`}
            className="p-1 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default EcgStripFrame;

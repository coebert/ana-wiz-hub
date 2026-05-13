import { ReactNode, useCallback, useEffect, useRef, useState, PointerEvent } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

interface ZoomableSVGProps {
  children: ReactNode;
  /** Optional accessible label describing the inner diagram. */
  label?: string;
  /** Minimum scale factor. */
  minScale?: number;
  /** Maximum scale factor. */
  maxScale?: number;
  className?: string;
}

/**
 * Wraps an SVG (or any child) and adds:
 *   • Mouse wheel / trackpad scroll → zoom (Ctrl/⌘ + wheel also works)
 *   • Two-finger pinch on touch devices → zoom
 *   • Click-and-drag or one-finger drag → pan
 *   • On-screen +/–/reset controls (keyboard-accessible)
 *
 * The wrapped SVG keeps its own viewBox; we transform via CSS so quality stays
 * vector-crisp. Pan/zoom state is local — diagrams don't need to know about it.
 */
export const ZoomableSVG = ({
  children,
  label = "Zoomable diagram. Use scroll or pinch to zoom, drag to pan.",
  minScale = 1,
  maxScale = 6,
  className = "",
}: ZoomableSVGProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  // Pointer / pinch state
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{ dist: number; scale: number; cx: number; cy: number; tx: number; ty: number } | null>(null);
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  const clampScale = (s: number) => Math.min(maxScale, Math.max(minScale, s));

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const zoomAt = useCallback(
    (factor: number, originX?: number, originY?: number) => {
      setScale((prev) => {
        const next = clampScale(prev * factor);
        if (next === prev) return prev;
        // Keep the focal point stable when zooming about it
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect && originX !== undefined && originY !== undefined) {
          const ox = originX - rect.left - rect.width / 2;
          const oy = originY - rect.top - rect.height / 2;
          setTx((t) => ox - ((ox - t) * next) / prev);
          setTy((t) => oy - ((oy - t) * next) / prev);
        }
        return next;
      });
    },
    [maxScale, minScale],
  );

  // Wheel zoom — listen non-passively so we can preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: globalThis.WheelEvent) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0015);
      zoomAt(factor, e.clientX, e.clientY);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [zoomAt]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      pinchStart.current = {
        dist,
        scale,
        cx: (a.x + b.x) / 2,
        cy: (a.y + b.y) / 2,
        tx,
        ty,
      };
      panStart.current = null;
    } else if (pointers.current.size === 1 && scale > 1) {
      panStart.current = { x: e.clientX, y: e.clientY, tx, ty };
    }
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const ratio = dist / pinchStart.current.dist;
      const next = clampScale(pinchStart.current.scale * ratio);
      setScale(next);
      // Pan so pinch midpoint stays anchored
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const ox = pinchStart.current.cx - rect.left - rect.width / 2;
        const oy = pinchStart.current.cy - rect.top - rect.height / 2;
        const k = next / pinchStart.current.scale;
        setTx(ox - (ox - pinchStart.current.tx) * k);
        setTy(oy - (oy - pinchStart.current.ty) * k);
      }
    } else if (pointers.current.size === 1 && panStart.current) {
      setTx(panStart.current.tx + (e.clientX - panStart.current.x));
      setTy(panStart.current.ty + (e.clientY - panStart.current.y));
    }
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) panStart.current = null;
  };

  const isZoomed = scale !== 1 || tx !== 0 || ty !== 0;

  return (
    <DiagramFigure
      id="zoomable-svg"
      title="Zoomable SVG"
      description="Auto-generated wrapper for the Zoomable SVG anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className={`relative group ${className}`}>
        <div
          ref={containerRef}
          role="application"
          aria-label={label}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="overflow-hidden rounded-md select-none touch-none"
          style={{ cursor: scale > 1 ? (panStart.current ? "grabbing" : "grab") : "default" }}
        >
          <div
            style={{
              transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: pointers.current.size > 0 ? "none" : "transform 120ms ease-out",
              willChange: "transform",
            }}
          >
            {children}
          </div>
        </div>
  
        {/* Controls */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-70 hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => zoomAt(1.4)}
            aria-label="Zoom in"
            className="h-7 w-7 rounded-md bg-background/90 border border-border shadow-sm flex items-center justify-center hover:bg-accent text-foreground"
          >
            <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => zoomAt(1 / 1.4)}
            aria-label="Zoom out"
            className="h-7 w-7 rounded-md bg-background/90 border border-border shadow-sm flex items-center justify-center hover:bg-accent text-foreground"
          >
            <ZoomOut className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Reset zoom and pan"
            disabled={!isZoomed}
            className="h-7 w-7 rounded-md bg-background/90 border border-border shadow-sm flex items-center justify-center hover:bg-accent text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
  
        {/* Hint — first time only */}
        {!isZoomed && (
          <p className="absolute bottom-1 left-2 text-[10px] text-muted-foreground/70 pointer-events-none select-none">
            Scroll / pinch to zoom · drag to pan
          </p>
        )}
      </div>
    </DiagramFigure>
  );
};

export default ZoomableSVG;

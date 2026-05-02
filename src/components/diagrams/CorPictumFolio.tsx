import {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { ExamTag } from "@/data/curriculum";

/**
 * Cor Pictum folio — unified, in-app anatomical plate viewer in the
 * "painted heart" idiom: cream linen stock, hairline plate-mark, italic Latin
 * labels, oxidized-red Roman folio numerals.
 *
 * Capabilities:
 *  • Zoom (wheel / pinch / +/−) and pan (drag) anchored to the painted plate.
 *  • Optional polygon hotspots that two-way-link with the labels list:
 *    hover/focus a label → its polygon glows on the plate, and vice versa.
 *  • Optional per-label exam tags (primary/final/fficm/edic) that respect the
 *    global ExamFilterContext, mirroring BrainRegionsList behaviour.
 *
 * All new fields are optional, so existing folios that supply only
 * { latin, english, note } continue to render unchanged.
 */

export interface CorPictumLabel {
  /** Italic Latin label as it appears on the plate */
  latin: string;
  /** Plain-English translation / clinical name */
  english: string;
  /** Short anatomical / clinical note */
  note: string;
  /** Optional FRCA / FFICM exam tags — filtered by the global ExamFilterContext */
  examTags?: ExamTag[];
  /** Optional FRCA learning-point line surfaced beneath the note */
  learningPoint?: string;
  /**
   * Optional polygon overlay in normalised plate coordinates (0..1, top-left
   * origin). When supplied, hovering/focusing the label highlights this
   * polygon, and hovering the polygon highlights this label.
   */
  polygon?: Array<[number, number]>;
}

/**
 * A single FRCA curriculum learning-point this plate is mapped to.
 * Rendered as a clickable chip beneath the plate; honours the global
 * exam-filter chips in the header.
 */
export interface CorPictumCurriculumLink {
  /** RCoA curriculum code, e.g. "CR_BK_01" */
  code: string;
  /** Which FRCA exam(s) this learning point belongs to */
  exams: ExamTag[];
  /** Short human title for the learning point (shown in the chip + tooltip) */
  title: string;
  /**
   * Optional in-page anchor id to scroll to when the chip is clicked
   * (e.g. "coronary-supply"). If omitted the chip is informational only.
   */
  anchor?: string;
}

export interface CorPictumPlate {
  /** Stable id for tab state (e.g. "fauces", "trachea") */
  id: string;
  /** Short tab label (English) */
  tabLabel: string;
  /** Plate title in modest small caps (e.g. "Vestibulum Laryngis") */
  title: string;
  /** One-line English subtitle, set even smaller beneath the title */
  subtitle: string;
  /** Roman folio numeral (I, II, III, IV …) */
  folio: string;
  /** Imported painted plate image */
  image: string;
  /** Alt text for the image */
  alt: string;
  /** Italic Latin caption that sits beneath the plate-mark */
  caption: string;
  /** Italic Latin labels with English translations and notes */
  labels: CorPictumLabel[];
  /**
   * Optional FRCA / FFICM curriculum learning-points this plate maps to.
   * Rendered as clickable chips that scroll to the matching topic anchor.
   */
  curriculumLinks?: CorPictumCurriculumLink[];
}

interface CorPictumFolioProps {
  /** Folio title shown in the muted top strip (e.g. "Atlas Anatomicus — Vias Aerias Superiores") */
  atlasTitle: string;
  /** Short English line beneath the atlas title */
  atlasSubtitle: string;
  plates: CorPictumPlate[];
  /** Optional className passthrough for the outer card */
  className?: string;
  /**
   * Enable the in-app polygon-accuracy review mode (off by default). When true
   * a developer/editor toolbar is shown that allows visualising every hotspot
   * with an index number, dragging vertices to fine-tune coordinates,
   * adding/removing points, and exporting the resulting `[[x,y],…]` array
   * for paste-back into `anatomyFolios.ts`.
   */
  enableReviewMode?: boolean;
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;

const polygonToPoints = (polygon: Array<[number, number]>) =>
  polygon.map(([x, y]) => `${x * 100},${y * 100}`).join(" ");

const CorPictumFolio = ({ atlasTitle, atlasSubtitle, plates, className, enableReviewMode = false }: CorPictumFolioProps) => {
  const [activeId, setActiveId] = useState(plates[0]?.id);
  const active = plates.find((p) => p.id === activeId) ?? plates[0];
  const reactId = useId();

  // Two-way label ↔ polygon highlight (index into active.labels)
  const [activeLabelIdx, setActiveLabelIdx] = useState<number | null>(null);

  // Floating hover/click panel for polygon → label info
  const [pinnedLabelIdx, setPinnedLabelIdx] = useState<number | null>(null);
  const [hoverPanel, setHoverPanel] = useState<{ idx: number; x: number; y: number } | null>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);

  // ── Polygon review mode (developer/editor) ─────────────────────────────
  // URL `?review=polygons` also enables this without a code change.
  const urlReview = typeof window !== "undefined" && window.location.search.includes("review=polygons");
  const reviewAllowed = enableReviewMode || urlReview;
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  // Per-plate working copy of polygons (overrides label.polygon when set)
  const [editedPolys, setEditedPolys] = useState<Record<string, Array<Array<[number, number]> | undefined>>>({});
  const [selectedEditIdx, setSelectedEditIdx] = useState<number | null>(null);
  const [tool, setTool] = useState<"select" | "add">("select");
  const [showAllOutlines, setShowAllOutlines] = useState(true);
  const [copyFlash, setCopyFlash] = useState(false);
  const dragVertexRef = useRef<{ labelIdx: number; vertIdx: number } | null>(null);
  const overlaySvgRef = useRef<SVGSVGElement>(null);

  // Horizontal scroll-snap rail for plate tabs (used when many plates)
  const tabRailRef = useRef<HTMLDivElement>(null);

  // Zoom/pan state — local to the painted plate area
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{ dist: number; scale: number; cx: number; cy: number; tx: number; ty: number } | null>(
    null,
  );
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  // Reset zoom/pan and any active label when the user switches plates
  useEffect(() => {
    reset();
    setActiveLabelIdx(null);
    setPinnedLabelIdx(null);
    setHoverPanel(null);
    // Keep the active tab visible inside the scroll-snap rail
    const rail = tabRailRef.current;
    if (rail) {
      const activeTab = rail.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      activeTab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeId, reset]);

  const zoomAt = useCallback((factor: number, originX?: number, originY?: number) => {
    setScale((prev) => {
      const next = clampScale(prev * factor);
      if (next === prev) return prev;
      const rect = stageRef.current?.getBoundingClientRect();
      if (rect && originX !== undefined && originY !== undefined) {
        const ox = originX - rect.left - rect.width / 2;
        const oy = originY - rect.top - rect.height / 2;
        setTx((t) => ox - ((ox - t) * next) / prev);
        setTy((t) => oy - ((oy - t) * next) / prev);
      }
      return next;
    });
  }, []);

  // Wheel zoom (non-passive so we can preventDefault inside the plate)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (reviewMode) return; // let page scroll while reviewing polygons
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0015);
      zoomAt(factor, e.clientX, e.clientY);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [zoomAt, reviewMode]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
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

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const ratio = dist / pinchStart.current.dist;
      const next = clampScale(pinchStart.current.scale * ratio);
      setScale(next);
      const rect = stageRef.current?.getBoundingClientRect();
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

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) panStart.current = null;
  };

  // Exam-filter integration — if labels carry examTags, filter; else show all.
  const { matchesFilter } = useExamFilter();
  const visibleLabels = useMemo(() => {
    if (!active) return [];
    return active.labels
      .map((label, idx) => ({ label, idx }))
      .filter(({ label }) =>
        label.examTags && label.examTags.length > 0 ? matchesFilter(label.examTags) : true,
      );
  }, [active, matchesFilter]);

  const visibleCurriculumLinks = useMemo(() => {
    if (!active?.curriculumLinks) return [];
    return active.curriculumLinks.filter((link) =>
      link.exams && link.exams.length > 0 ? matchesFilter(link.exams) : true,
    );
  }, [active, matchesFilter]);

  if (!active) return null;

  const hasAnyPolygons = active.labels.some((l) => l.polygon && l.polygon.length >= 3);
  const hasAnyExamTags = active.labels.some((l) => l.examTags && l.examTags.length > 0);
  const isZoomed = scale !== 1 || tx !== 0 || ty !== 0;

  // ── Review-mode helpers ───────────────────────────────────────────────
  // Resolve the current (possibly edited) polygon for a label index.
  const polyFor = (labelIdx: number): Array<[number, number]> | undefined => {
    const overrides = editedPolys[active.id];
    const overridden = overrides?.[labelIdx];
    if (overridden) return overridden;
    return active.labels[labelIdx]?.polygon;
  };

  const setPolyFor = (labelIdx: number, next: Array<[number, number]> | undefined) => {
    setEditedPolys((prev) => {
      const plate = [...(prev[active.id] ?? active.labels.map((l) => l.polygon ? [...l.polygon] as Array<[number, number]> : undefined))];
      plate[labelIdx] = next;
      return { ...prev, [active.id]: plate };
    });
  };

  // Convert an SVG client point → normalised 0..1 plate coords
  const eventToNormalised = (e: ReactPointerEvent<SVGElement> | ReactMouseEvent<SVGElement>): [number, number] | null => {
    const svg = overlaySvgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    return [Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y))];
  };

  const beginVertexDrag = (labelIdx: number, vertIdx: number) => (e: ReactPointerEvent<SVGCircleElement>) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragVertexRef.current = { labelIdx, vertIdx };
  };
  const moveVertexDrag = (e: ReactPointerEvent<SVGSVGElement>) => {
    const drag = dragVertexRef.current;
    if (!drag) return;
    const pt = eventToNormalised(e);
    if (!pt) return;
    const current = polyFor(drag.labelIdx);
    if (!current) return;
    const next = current.map((p, i) => (i === drag.vertIdx ? pt : p)) as Array<[number, number]>;
    setPolyFor(drag.labelIdx, next);
  };
  const endVertexDrag = () => {
    dragVertexRef.current = null;
  };

  const handleOverlayClick = (e: ReactMouseEvent<SVGSVGElement>) => {
    if (!reviewMode || tool !== "add" || selectedEditIdx === null) return;
    const pt = eventToNormalised(e);
    if (!pt) return;
    const current = polyFor(selectedEditIdx) ?? [];
    setPolyFor(selectedEditIdx, [...current, pt] as Array<[number, number]>);
  };

  const removeVertex = (labelIdx: number, vertIdx: number) => (e: ReactMouseEvent<SVGCircleElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const current = polyFor(labelIdx);
    if (!current || current.length <= 3) return; // keep ≥3
    setPolyFor(labelIdx, current.filter((_, i) => i !== vertIdx) as Array<[number, number]>);
  };

  // Deterministic colour per label index
  const reviewColor = (idx: number) => {
    const hue = (idx * 53) % 360;
    return `hsl(${hue} 75% 45%)`;
  };

  const buildExportJson = () => {
    const lines: string[] = [];
    lines.push(`// ${active.id} — ${active.tabLabel}`);
    active.labels.forEach((label, i) => {
      const poly = polyFor(i);
      if (!poly || poly.length < 3) return;
      const pts = poly
        .map(([x, y]) => `[${x.toFixed(3)}, ${y.toFixed(3)}]`)
        .join(", ");
      lines.push(`  // ${label.english}`);
      lines.push(`  polygon: [${pts}],`);
    });
    return lines.join("\n");
  };

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(buildExportJson());
      setCopyFlash(true);
      window.setTimeout(() => setCopyFlash(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className={cn("rounded-2xl border border-border bg-card overflow-hidden", className)}>
      {/* Atlas header strip */}
      <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-border bg-muted/20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
              {atlasTitle}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 italic">{atlasSubtitle}</p>
          </div>
          {plates.length > 1 ? (
            <div className="relative flex items-center gap-1 max-w-full sm:max-w-[34rem]">
              <button
                type="button"
                aria-label="Scroll plates left"
                onClick={() => tabRailRef.current?.scrollBy({ left: -160, behavior: "smooth" })}
                className="hidden sm:flex h-7 w-7 flex-none items-center justify-center rounded-md border border-border bg-background hover:bg-accent text-foreground/70"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <div
                ref={tabRailRef}
                role="tablist"
                aria-label={atlasTitle}
                className="flex flex-1 overflow-x-auto snap-x snap-mandatory rounded-md border border-border bg-background p-0.5 gap-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {plates.map((p) => (
                  <Button
                    key={p.id}
                    role="tab"
                    aria-selected={activeId === p.id}
                    size="sm"
                    variant={activeId === p.id ? "default" : "ghost"}
                    className="h-8 px-3 text-xs flex flex-col items-start leading-tight flex-none snap-start"
                    onClick={() => setActiveId(p.id)}
                  >
                    <span className="font-semibold whitespace-nowrap">{p.tabLabel}</span>
                    <span className="text-[9px] opacity-70 -mt-0.5 italic whitespace-nowrap">Plate {p.folio}</span>
                  </Button>
                ))}
              </div>
              <button
                type="button"
                aria-label="Scroll plates right"
                onClick={() => tabRailRef.current?.scrollBy({ left: 160, behavior: "smooth" })}
                className="hidden sm:flex h-7 w-7 flex-none items-center justify-center rounded-md border border-border bg-background hover:bg-accent text-foreground/70"
              >
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Painted plate on cream stock */}
      <div
        role="tabpanel"
        aria-label={`${active.title} plate`}
        className="relative bg-[hsl(38_38%_94%)] dark:bg-[hsl(38_18%_14%)]"
      >
        {/* Plate numeral, top-right (Netter-style small caps roman) */}
        <span
          aria-hidden
          className="absolute top-3 right-4 sm:top-4 sm:right-6 font-serif text-foreground/55 text-[11px] sm:text-xs tracking-[0.25em] select-none z-10"
        >
          PLATE&nbsp;{active.folio}
        </span>

        {/* Plate title, top-left */}
        <div className="absolute top-3 left-4 sm:top-4 sm:left-6 max-w-[70%] z-10">
          <p className="font-serif text-[12px] sm:text-[13px] tracking-[0.04em] text-foreground">
            {active.title}
          </p>
          <p className="font-serif text-[10.5px] sm:text-[11px] text-muted-foreground/90 mt-0.5 tracking-[0.01em]">
            {active.subtitle}
          </p>
        </div>

        {/* Review-mode toolbar */}
        {reviewAllowed ? (
          <div className="px-4 sm:px-6 pt-3 -mb-2 flex flex-wrap items-center gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => { setReviewMode((v) => !v); setSelectedEditIdx(null); }}
              className={cn(
                "px-2.5 py-1 rounded-md border font-semibold tracking-wide uppercase",
                reviewMode
                  ? "bg-[hsl(8_70%_50%)] text-white border-[hsl(8_55%_38%)]"
                  : "bg-background text-foreground border-border hover:bg-accent",
              )}
              title="Toggle polygon-accuracy review mode"
            >
              {reviewMode ? "● Reviewing polygons" : "Review polygons"}
            </button>
            {reviewMode ? (
              <>
                <span className="text-muted-foreground">Tool:</span>
                <div className="inline-flex rounded-md border border-border overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setTool("select")}
                    className={cn("px-2 py-1", tool === "select" ? "bg-accent text-accent-foreground" : "bg-background hover:bg-muted")}
                  >Select / drag</button>
                  <button
                    type="button"
                    onClick={() => setTool("add")}
                    className={cn("px-2 py-1 border-l border-border", tool === "add" ? "bg-accent text-accent-foreground" : "bg-background hover:bg-muted")}
                    disabled={selectedEditIdx === null}
                    title={selectedEditIdx === null ? "Select a label first" : "Click on plate to append vertex"}
                  >+ Add vertex</button>
                </div>
                <label className="inline-flex items-center gap-1 ml-1">
                  <input
                    type="checkbox"
                    checked={showAllOutlines}
                    onChange={(e) => setShowAllOutlines(e.target.checked)}
                    className="accent-[hsl(8_70%_50%)]"
                  />
                  Show all outlines
                </label>
                <span className="text-muted-foreground ml-auto">
                  {selectedEditIdx !== null
                    ? <>Editing: <strong className="text-foreground">{selectedEditIdx + 1}. {active.labels[selectedEditIdx]?.english}</strong></>
                    : <>Click a polygon, badge, or label below to select.</>}
                </span>
                <button
                  type="button"
                  onClick={copyExport}
                  className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-accent font-semibold"
                  title="Copy this plate's polygons as JSON for paste-back into anatomyFolios.ts"
                >
                  {copyFlash ? "✓ Copied!" : "Copy JSON"}
                </button>
                {selectedEditIdx !== null ? (
                  <button
                    type="button"
                    onClick={() => setPolyFor(selectedEditIdx, active.labels[selectedEditIdx]?.polygon ? [...active.labels[selectedEditIdx].polygon!] as Array<[number, number]> : undefined)}
                    className="px-2 py-1 rounded-md border border-border bg-background hover:bg-accent"
                    title="Reset selected polygon to its original coordinates"
                  >Reset</button>
                ) : null}
              </>
            ) : (
              <span className="text-muted-foreground">Visualise & nudge hotspot polygons, then copy the corrected JSON back into <code className="font-mono text-[10.5px]">anatomyFolios.ts</code>.</span>
            )}
          </div>
        ) : null}

        {/* Hairline plate-mark with zoom/pan stage */}
        <div className="px-4 sm:px-8 pt-14 sm:pt-16 pb-6">
          <div ref={stageWrapRef} className="relative border border-foreground/15 dark:border-foreground/25 p-2 sm:p-3 bg-[hsl(38_42%_96%)] dark:bg-[hsl(38_14%_18%)]">
            <div
              ref={stageRef}
              role="application"
              aria-label="Zoomable painted plate. Use scroll or pinch to zoom, drag to pan."
              onPointerDown={reviewMode ? undefined : onPointerDown}
              onPointerMove={reviewMode ? undefined : onPointerMove}
              onPointerUp={reviewMode ? undefined : onPointerUp}
              onPointerCancel={reviewMode ? undefined : onPointerUp}
              className="relative overflow-hidden touch-none select-none"
              style={{ cursor: reviewMode ? "default" : scale > 1 ? (panStart.current ? "grabbing" : "grab") : "default" }}
            >
              <div
                style={{
                  transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                  transformOrigin: "center center",
                  transition: pointers.current.size > 0 ? "none" : "transform 120ms ease-out",
                  willChange: "transform",
                }}
                className="relative"
              >
                <img
                  src={active.image}
                  alt={active.alt}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-auto block"
                />

                {/* Polygon hotspot overlay (display) */}
                {hasAnyPolygons && !reviewMode ? (
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    {active.labels.map((label, idx) => {
                      if (!label.polygon || label.polygon.length < 3) return null;
                      const isActive = activeLabelIdx === idx || pinnedLabelIdx === idx;
                      const updatePanelPos = (clientX: number, clientY: number, i: number) => {
                        const wrap = stageWrapRef.current;
                        if (!wrap) return;
                        const rect = wrap.getBoundingClientRect();
                        setHoverPanel({ idx: i, x: clientX - rect.left, y: clientY - rect.top });
                      };
                      return (
                        <polygon
                          key={`${label.latin}-${idx}`}
                          points={polygonToPoints(label.polygon)}
                          className={cn(
                            "transition-[fill,stroke,stroke-width,opacity] duration-150 cursor-pointer",
                            isActive
                              ? "fill-[hsl(8_70%_50%)]/25 stroke-[hsl(8_55%_38%)]"
                              : activeLabelIdx === null && pinnedLabelIdx === null
                                ? "fill-transparent stroke-transparent hover:fill-[hsl(8_70%_50%)]/12 hover:stroke-[hsl(8_55%_38%)]/60"
                                : "fill-transparent stroke-transparent",
                          )}
                          style={{
                            strokeWidth: isActive ? 0.5 : 0.35,
                            vectorEffect: "non-scaling-stroke",
                            pointerEvents: "auto",
                          }}
                          onPointerEnter={(e) => {
                            setActiveLabelIdx(idx);
                            if (pinnedLabelIdx === null) updatePanelPos(e.clientX, e.clientY, idx);
                          }}
                          onPointerMove={(e) => {
                            if (pinnedLabelIdx === null) updatePanelPos(e.clientX, e.clientY, idx);
                          }}
                          onPointerLeave={() => {
                            setActiveLabelIdx((prev) => (prev === idx ? null : prev));
                            if (pinnedLabelIdx === null) setHoverPanel(null);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPinnedLabelIdx((prev) => (prev === idx ? null : idx));
                            updatePanelPos(e.clientX, e.clientY, idx);
                          }}
                        >
                          <title>{label.english}</title>
                        </polygon>
                      );
                    })}
                  </svg>
                ) : null}

                {/* Polygon REVIEW overlay (editor) */}
                {reviewMode ? (
                  <svg
                    ref={overlaySvgRef}
                    viewBox="0 0 1 1"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                    style={{ cursor: tool === "add" && selectedEditIdx !== null ? "crosshair" : "default" }}
                    onPointerMove={moveVertexDrag}
                    onPointerUp={endVertexDrag}
                    onPointerCancel={endVertexDrag}
                    onClick={handleOverlayClick}
                  >
                    {active.labels.map((label, idx) => {
                      const poly = polyFor(idx);
                      if (!poly || poly.length < 3) return null;
                      const isSelected = selectedEditIdx === idx;
                      const visible = isSelected || showAllOutlines;
                      if (!visible) return null;
                      const colour = reviewColor(idx);
                      const pts = poly.map(([x, y]) => `${x},${y}`).join(" ");
                      const cx = poly.reduce((s, p) => s + p[0], 0) / poly.length;
                      const cy = poly.reduce((s, p) => s + p[1], 0) / poly.length;
                      return (
                        <g key={`${label.latin}-${idx}`}>
                          <polygon
                            points={pts}
                            fill={colour}
                            fillOpacity={isSelected ? 0.22 : 0.05}
                            stroke={colour}
                            strokeOpacity={isSelected ? 1 : 0.7}
                            strokeWidth={isSelected ? 0.005 : 0.0025}
                            style={{ vectorEffect: "non-scaling-stroke", cursor: "pointer" }}
                            onClick={(ev) => {
                              ev.stopPropagation();
                              setSelectedEditIdx(idx);
                              setActiveLabelIdx(idx);
                            }}
                          >
                            <title>{`${idx + 1}. ${label.english}`}</title>
                          </polygon>
                          {/* index badge at centroid */}
                          <g transform={`translate(${cx} ${cy})`}>
                            <circle r={0.018} fill="hsl(0 0% 100%)" stroke={colour} strokeWidth={0.003}
                              style={{ vectorEffect: "non-scaling-stroke" }} />
                            <text textAnchor="middle" dominantBaseline="central"
                              fontSize="0.022" fontWeight={700} fill={colour}>
                              {idx + 1}
                            </text>
                          </g>
                          {/* draggable vertices when selected */}
                          {isSelected
                            ? poly.map(([x, y], vi) => (
                                <circle
                                  key={vi}
                                  cx={x}
                                  cy={y}
                                  r={0.012}
                                  fill="hsl(0 0% 100%)"
                                  stroke={colour}
                                  strokeWidth={0.004}
                                  style={{ vectorEffect: "non-scaling-stroke", cursor: "grab", touchAction: "none" }}
                                  onPointerDown={beginVertexDrag(idx, vi)}
                                  onDoubleClick={removeVertex(idx, vi)}
                                  onContextMenu={removeVertex(idx, vi)}
                                >
                                  <title>{`vertex ${vi + 1} — drag to move, double-click or right-click to delete`}</title>
                                </circle>
                              ))
                            : null}
                        </g>
                      );
                    })}
                  </svg>
                ) : null}
              </div>
            </div>

            {/* Zoom controls */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-1 opacity-80 hover:opacity-100 focus-within:opacity-100 transition-opacity">
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

            {!isZoomed ? (
              <p className="absolute bottom-2 left-3 text-[10px] text-muted-foreground/70 pointer-events-none select-none">
                Scroll / pinch to zoom · drag to pan
                {hasAnyPolygons ? " · hover labels to highlight" : ""}
              </p>
            ) : null}
          </div>

          {/* English caption strip beneath the plate-mark */}
          <p className="mt-3 text-center font-serif text-xs sm:text-sm text-muted-foreground">
            {active.caption}
          </p>

          {/* FRCA curriculum mapping chips — filtered by the exam header */}
          {visibleCurriculumLinks.length > 0 ? (
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Mapped to FRCA curriculum
              </p>
              <div className="relative w-full max-w-2xl">
                <div
                  className="flex overflow-x-auto snap-x gap-1.5 px-1 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  {visibleCurriculumLinks.map((link) => {
                    const examLabel = link.exams
                      .map((e) =>
                        e === "primary" ? "Primary" : e === "final" ? "Final" : e === "fficm" ? "FFICM" : "EDIC",
                      )
                      .join(" · ");
                    const Tag = link.anchor ? "a" : "span";
                    const onClick = link.anchor
                      ? (ev: ReactMouseEvent) => {
                          const node = document.getElementById(link.anchor!);
                          if (node) {
                            ev.preventDefault();
                            node.scrollIntoView({ behavior: "smooth", block: "start" });
                            node.classList.add("ring-2", "ring-primary/60", "rounded-md");
                            window.setTimeout(
                              () => node.classList.remove("ring-2", "ring-primary/60", "rounded-md"),
                              1600,
                            );
                          }
                        }
                      : undefined;
                    return (
                      <Tag
                        key={`${link.code}-${link.title}`}
                        href={link.anchor ? `#${link.anchor}` : undefined}
                        onClick={onClick}
                        title={`${link.code} — ${link.title} (${examLabel})`}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10.5px] font-medium flex-none snap-start",
                          "border-border bg-background/80 text-foreground/85",
                          link.anchor
                            ? "hover:bg-accent hover:text-accent-foreground hover:border-primary/40 cursor-pointer transition-colors"
                            : "cursor-default",
                        )}
                      >
                        <span className="font-mono text-[9.5px] text-[hsl(8_55%_38%)] dark:text-[hsl(8_60%_60%)] whitespace-nowrap">
                          {link.code}
                        </span>
                        <span className="opacity-70">·</span>
                        <span className="whitespace-nowrap">{link.title}</span>
                        <span className="text-[9px] uppercase tracking-wider opacity-60 whitespace-nowrap">{examLabel}</span>
                      </Tag>
                    );
                  })}
                </div>
                {/* edge fades */}
                <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[hsl(38_38%_94%)] dark:from-[hsl(38_18%_14%)] to-transparent" />
                <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[hsl(38_38%_94%)] dark:from-[hsl(38_18%_14%)] to-transparent" />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Labelled regions list */}
      <div className="border-t border-border bg-card px-4 sm:px-6 py-4">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
            Index nominum — labelled structures
          </p>
          {hasAnyExamTags ? (
            <p className="text-[10px] text-muted-foreground italic">
              Filtered by the exam chips in the header
            </p>
          ) : null}
        </div>

        {visibleLabels.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            No structures match the current exam filter.
          </p>
        ) : (
          <div
            className="relative max-h-[26rem] overflow-y-auto pr-1 -mr-1 [scrollbar-width:thin]"
            aria-label="Scroll to browse all labelled structures"
          >
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {visibleLabels.map(({ label, idx }) => {
              const isActive = activeLabelIdx === idx;
              const interactive = !!(label.polygon && label.polygon.length >= 3);
              return (
                <li
                  key={`${label.latin}-${idx}`}
                  id={`${reactId}-label-${idx}`}
                  className={cn(
                    "flex gap-3 rounded-md p-1.5 -m-1.5 transition-colors",
                    (interactive || reviewMode) && "cursor-pointer",
                    isActive && "bg-[hsl(8_55%_38%)]/8 dark:bg-[hsl(8_60%_60%)]/10",
                    reviewMode && selectedEditIdx === idx && "ring-2 ring-[hsl(8_70%_50%)]/70",
                  )}
                  onPointerEnter={() => interactive && setActiveLabelIdx(idx)}
                  onPointerLeave={() =>
                    interactive && setActiveLabelIdx((prev) => (prev === idx ? null : prev))
                  }
                  onFocus={() => interactive && setActiveLabelIdx(idx)}
                  onBlur={() => interactive && setActiveLabelIdx((prev) => (prev === idx ? null : prev))}
                  onClick={() => { if (reviewMode) setSelectedEditIdx(idx); }}
                  tabIndex={interactive || reviewMode ? 0 : -1}
                >
                  {reviewMode ? (
                    <span
                      aria-hidden
                      className="mt-[0.4rem] flex-none w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                      style={{ background: reviewColor(idx) }}
                    >
                      {idx + 1}
                    </span>
                  ) : null}
                  <span
                    aria-hidden
                    className={cn(
                      "mt-[0.55rem] flex-none flex items-center transition-all",
                      isActive ? "w-7" : "w-5",
                    )}
                  >
                    <span
                      className={cn(
                        "h-px flex-1 transition-colors",
                        isActive
                          ? "bg-foreground/70 dark:bg-foreground/80"
                          : "bg-foreground/35 dark:bg-foreground/40",
                      )}
                    />
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full transition-colors",
                        isActive
                          ? "bg-foreground/80 dark:bg-foreground/90"
                          : "bg-foreground/45 dark:bg-foreground/50",
                      )}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-[13px] sm:text-[13.5px] leading-snug tracking-[0.005em] text-foreground">
                      {label.english}
                    </p>
                    <p className="font-serif italic text-[11.5px] text-muted-foreground/90 leading-snug mt-0.5">{label.note}</p>
                    {label.learningPoint ? (
                      <p className="text-xs text-foreground/85 leading-relaxed mt-1 border-l-2 border-[hsl(8_55%_38%)]/60 pl-2">
                        <span className="font-semibold uppercase tracking-wide text-[10px] text-[hsl(8_55%_38%)] dark:text-[hsl(8_60%_60%)] mr-1">
                          FRCA
                        </span>
                        {label.learningPoint}
                      </p>
                    ) : null}
                    {label.examTags && label.examTags.length > 0 ? (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {label.examTags.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] uppercase tracking-wide rounded-sm border border-border bg-muted/40 px-1.5 py-0.5 text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CorPictumFolio;

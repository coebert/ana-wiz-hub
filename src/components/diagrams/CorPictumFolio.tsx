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
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;

const polygonToPoints = (polygon: Array<[number, number]>) =>
  polygon.map(([x, y]) => `${x * 100},${y * 100}`).join(" ");

const CorPictumFolio = ({ atlasTitle, atlasSubtitle, plates, className }: CorPictumFolioProps) => {
  const [activeId, setActiveId] = useState(plates[0]?.id);
  const active = plates.find((p) => p.id === activeId) ?? plates[0];
  const reactId = useId();

  // Two-way label ↔ polygon highlight (index into active.labels)
  const [activeLabelIdx, setActiveLabelIdx] = useState<number | null>(null);

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
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0015);
      zoomAt(factor, e.clientX, e.clientY);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [zoomAt]);

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
        {/* Folio numeral, oxidized red, top-right */}
        <span
          aria-hidden
          className="absolute top-3 right-4 sm:top-4 sm:right-6 font-serif italic text-[hsl(8_55%_38%)] dark:text-[hsl(8_60%_60%)] text-sm sm:text-base tracking-wider select-none z-10"
        >
          {active.folio}
        </span>

        {/* Plate title, top-left */}
        <div className="absolute top-3 left-4 sm:top-4 sm:left-6 max-w-[70%] z-10">
          <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.22em] text-foreground/80">
            {active.title}
          </p>
          <p className="font-serif italic text-[10px] sm:text-xs text-muted-foreground mt-0.5">
            {active.subtitle}
          </p>
        </div>

        {/* Hairline plate-mark with zoom/pan stage */}
        <div className="px-4 sm:px-8 pt-14 sm:pt-16 pb-6">
          <div className="relative border border-foreground/15 dark:border-foreground/25 p-2 sm:p-3 bg-[hsl(38_42%_96%)] dark:bg-[hsl(38_14%_18%)]">
            <div
              ref={stageRef}
              role="application"
              aria-label="Zoomable painted plate. Use scroll or pinch to zoom, drag to pan."
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="relative overflow-hidden touch-none select-none"
              style={{ cursor: scale > 1 ? (panStart.current ? "grabbing" : "grab") : "default" }}
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

                {/* Polygon hotspot overlay */}
                {hasAnyPolygons ? (
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    {active.labels.map((label, idx) => {
                      if (!label.polygon || label.polygon.length < 3) return null;
                      const isActive = activeLabelIdx === idx;
                      return (
                        <polygon
                          key={`${label.latin}-${idx}`}
                          points={polygonToPoints(label.polygon)}
                          className={cn(
                            "transition-[fill,stroke,stroke-width,opacity] duration-150 cursor-pointer",
                            isActive
                              ? "fill-[hsl(8_70%_50%)]/25 stroke-[hsl(8_55%_38%)]"
                              : activeLabelIdx === null
                                ? "fill-transparent stroke-transparent hover:fill-[hsl(8_70%_50%)]/12 hover:stroke-[hsl(8_55%_38%)]/60"
                                : "fill-transparent stroke-transparent",
                          )}
                          style={{
                            strokeWidth: isActive ? 0.5 : 0.35,
                            vectorEffect: "non-scaling-stroke",
                            pointerEvents: "auto",
                          }}
                          onPointerEnter={() => setActiveLabelIdx(idx)}
                          onPointerLeave={() => setActiveLabelIdx((prev) => (prev === idx ? null : prev))}
                          onClick={() => {
                            const node = document.getElementById(`${reactId}-label-${idx}`);
                            node?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                          }}
                        >
                          <title>{label.english}</title>
                        </polygon>
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

          {/* Italic Latin caption strip beneath the plate-mark */}
          <p className="mt-3 text-center font-serif italic text-xs sm:text-sm text-muted-foreground">
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
                    interactive && "cursor-pointer",
                    isActive && "bg-[hsl(8_55%_38%)]/8 dark:bg-[hsl(8_60%_60%)]/10",
                  )}
                  onPointerEnter={() => interactive && setActiveLabelIdx(idx)}
                  onPointerLeave={() =>
                    interactive && setActiveLabelIdx((prev) => (prev === idx ? null : prev))
                  }
                  onFocus={() => interactive && setActiveLabelIdx(idx)}
                  onBlur={() => interactive && setActiveLabelIdx((prev) => (prev === idx ? null : prev))}
                  tabIndex={interactive ? 0 : -1}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1 h-px flex-none transition-all",
                      isActive ? "w-6 bg-[hsl(8_55%_38%)] dark:bg-[hsl(8_60%_60%)]" : "w-4 bg-[hsl(8_55%_38%)]/70 dark:bg-[hsl(8_60%_60%)]/70",
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug">
                      <span className="font-serif italic text-foreground">{label.latin}</span>
                      <span className="text-muted-foreground"> — {label.english}</span>
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{label.note}</p>
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

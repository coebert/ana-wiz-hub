import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Cor Pictum folio — a unified, in-app anatomical plate viewer rendered in the
 * "painted heart" idiom: cream linen stock, hairline plate-mark, italic Latin
 * labels, oxidized-red Roman folio numerals, and whisper-quiet typography.
 *
 * Each topic supplies an array of `CorPictumPlate` entries. The viewer hosts
 * them in a single card with a quiet plate selector, a painted figure, the
 * italic Latin caption beneath the plate-mark, and the labelled-regions list
 * the rest of the atlas pages already use.
 */

export interface CorPictumLabel {
  /** Italic Latin label as it appears on the plate */
  latin: string;
  /** Plain-English translation / clinical name */
  english: string;
  /** Short anatomical / clinical note */
  note: string;
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

const CorPictumFolio = ({ atlasTitle, atlasSubtitle, plates, className }: CorPictumFolioProps) => {
  const [activeId, setActiveId] = useState(plates[0]?.id);
  const active = plates.find((p) => p.id === activeId) ?? plates[0];
  if (!active) return null;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card overflow-hidden",
        className,
      )}
    >
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
            <div
              role="tablist"
              aria-label={atlasTitle}
              className="inline-flex flex-wrap rounded-md border border-border bg-background p-0.5 gap-0.5"
            >
              {plates.map((p) => (
                <Button
                  key={p.id}
                  role="tab"
                  aria-selected={activeId === p.id}
                  size="sm"
                  variant={activeId === p.id ? "default" : "ghost"}
                  className="h-8 px-3 text-xs flex flex-col items-start leading-tight"
                  onClick={() => setActiveId(p.id)}
                >
                  <span className="font-semibold">{p.tabLabel}</span>
                  <span className="text-[9px] opacity-70 -mt-0.5 italic">Plate {p.folio}</span>
                </Button>
              ))}
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
          className="absolute top-3 right-4 sm:top-4 sm:right-6 font-serif italic text-[hsl(8_55%_38%)] dark:text-[hsl(8_60%_60%)] text-sm sm:text-base tracking-wider select-none"
        >
          {active.folio}
        </span>

        {/* Plate title, top-left */}
        <div className="absolute top-3 left-4 sm:top-4 sm:left-6 max-w-[70%]">
          <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.22em] text-foreground/80">
            {active.title}
          </p>
          <p className="font-serif italic text-[10px] sm:text-xs text-muted-foreground mt-0.5">
            {active.subtitle}
          </p>
        </div>

        {/* Hairline plate-mark */}
        <div className="px-4 sm:px-8 pt-14 sm:pt-16 pb-6">
          <div className="border border-foreground/15 dark:border-foreground/25 p-2 sm:p-3 bg-[hsl(38_42%_96%)] dark:bg-[hsl(38_14%_18%)]">
            <img
              src={active.image}
              alt={active.alt}
              loading="lazy"
              className="w-full h-auto block"
            />
          </div>

          {/* Italic Latin caption strip beneath the plate-mark */}
          <p className="mt-3 text-center font-serif italic text-xs sm:text-sm text-muted-foreground">
            {active.caption}
          </p>
        </div>
      </div>

      {/* Labelled regions list (kept consistent with BrainRegionsList aesthetic) */}
      <div className="border-t border-border bg-card px-4 sm:px-6 py-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3">
          Index nominum — labelled structures
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {active.labels.map((l) => (
            <li key={l.latin} className="flex gap-3">
              <span
                aria-hidden
                className="mt-1 h-px w-4 flex-none bg-[hsl(8_55%_38%)] dark:bg-[hsl(8_60%_60%)]"
              />
              <div className="min-w-0">
                <p className="text-sm leading-snug">
                  <span className="font-serif italic text-foreground">{l.latin}</span>
                  <span className="text-muted-foreground"> — {l.english}</span>
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{l.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CorPictumFolio;

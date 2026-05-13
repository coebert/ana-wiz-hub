import { ReactNode, useState } from "react";
import { Maximize2, X, Activity, Layers, AlertTriangle, Stethoscope } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Reusable wrapper for ECG diagrams.
 *
 * - Renders the diagram larger by default (`big` scale).
 * - Adds a top-right "Expand" button that opens a near-fullscreen modal.
 * - Inside the modal, the diagram is rendered again at maximum size beside a
 *   tabbed detail panel: Annotated features, Side-by-side comparison,
 *   Pitfalls & mimics, Worked vignettes.
 *
 * Diagram-specific content lives in `EcgExpandedContent` (a plain object) so
 * each ECG diagram can declare its own annotations / vignettes / pitfalls
 * without touching the wrapper.
 */

export interface AnnotatedFeature {
  label: string;
  /** Short description, e.g. "Wide P (>120 ms) — left atrial enlargement." */
  description: string;
  /** Optional measured value, e.g. "PR 240 ms". */
  value?: string;
}

export interface ComparisonRow {
  label: string;
  rate?: string;
  rhythm?: string;
  pWave?: string;
  qrs?: string;
  key?: string; // distinguishing feature
  highlight?: boolean;
}

export interface Pitfall {
  mistake: string;
  reality: string;
  tip: string;
}

export interface Vignette {
  scenario: string;
  ecgFinding: string;
  diagnosis: string;
  management: string;
}

export interface EcgExpandedContent {
  title: string;
  /** One-line teaching summary shown at the top of the modal. */
  summary: string;
  annotations?: AnnotatedFeature[];
  comparison?: {
    columns: { key: keyof ComparisonRow; label: string }[];
    rows: ComparisonRow[];
  };
  pitfalls?: Pitfall[];
  vignettes?: Vignette[];
}

interface ExpandableEcgCardProps {
  content: EcgExpandedContent;
  /**
   * Render-prop for the diagram. We call it twice: once in the page (compact)
   * and once inside the modal (large). This keeps state local to each
   * instance — the modal version starts fresh, which matches user expectation.
   */
  children: (variant: "page" | "modal") => ReactNode;
}

const ExpandableEcgCard = ({ content, children }: ExpandableEcgCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DiagramFigure
      id="expandable-ecg-card"
      title="Expandable ECG card"
      description="Auto-generated wrapper for the Expandable ECG card anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="relative group">
        {/* Expand button — floats above the diagram card. Sits OUTSIDE the
            card on desktop (negative offsets) so it never collides with the
            DiagramToggleBar toggles in the top-right of the inner card.
            On small screens it tucks neatly inside the card border. */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute z-20 top-2 right-2 sm:-top-3 sm:-right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-md"
          aria-label={`Expand ${content.title} for full-size view and detailed teaching`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Expand &amp; learn</span>
        </button>
  
        {/* Bigger inline rendering */}
        <div className="ecg-bigger-default">{children("page")}</div>
  
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-[95vw] w-[1280px] max-h-[92vh] overflow-hidden p-0 gap-0">
            <div className="flex items-start justify-between gap-4 px-5 py-3 border-b border-border bg-muted/40">
              <div className="min-w-0">
                <DialogTitle className="text-base font-serif font-bold text-foreground">
                  {content.title}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {content.summary}
                </DialogDescription>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 p-1.5 rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
  
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-0 max-h-[calc(92vh-58px)] overflow-hidden">
              {/* Diagram pane — scrollable */}
              <div className="overflow-auto p-4 bg-background/60 border-r border-border">
                {children("modal")}
              </div>
  
              {/* Tabs pane */}
              <div className="overflow-auto p-4">
                <Tabs defaultValue={content.annotations ? "annotated" : content.comparison ? "compare" : content.pitfalls ? "pitfalls" : "vignettes"}>
                  <TabsList className="grid grid-cols-4 w-full h-auto">
                    <TabsTrigger value="annotated" disabled={!content.annotations} className="text-[11px] gap-1 py-2">
                      <Activity className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Annotated</span>
                    </TabsTrigger>
                    <TabsTrigger value="compare" disabled={!content.comparison} className="text-[11px] gap-1 py-2">
                      <Layers className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Compare</span>
                    </TabsTrigger>
                    <TabsTrigger value="pitfalls" disabled={!content.pitfalls} className="text-[11px] gap-1 py-2">
                      <AlertTriangle className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Pitfalls</span>
                    </TabsTrigger>
                    <TabsTrigger value="vignettes" disabled={!content.vignettes} className="text-[11px] gap-1 py-2">
                      <Stethoscope className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Cases</span>
                    </TabsTrigger>
                  </TabsList>
  
                  {content.annotations && (
                    <TabsContent value="annotated" className="mt-3 space-y-2">
                      <p className="text-xs text-muted-foreground italic">Click-by-click anatomy of the trace.</p>
                      {content.annotations.map((a) => (
                        <div key={a.label} className="p-2.5 rounded-md border border-border bg-card">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="text-sm font-semibold text-foreground">{a.label}</p>
                            {a.value && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-icu/10 text-icu border border-icu/30">
                                {a.value}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{a.description}</p>
                        </div>
                      ))}
                    </TabsContent>
                  )}
  
                  {content.comparison && (
                    <TabsContent value="compare" className="mt-3">
                      <p className="text-xs text-muted-foreground italic mb-2">Side-by-side — spot the distinguishing feature at a glance.</p>
                      <div className="overflow-x-auto rounded-md border border-border">
                        <table className="w-full text-[11px]">
                          <thead className="bg-muted/60">
                            <tr>
                              <th className="text-left p-2 font-semibold text-foreground">Rhythm</th>
                              {content.comparison.columns.map((c) => (
                                <th key={c.key as string} className="text-left p-2 font-semibold text-foreground">{c.label}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {content.comparison.rows.map((r) => (
                              <tr
                                key={r.label}
                                className={`border-t border-border ${r.highlight ? "bg-icu/5" : ""}`}
                              >
                                <td className="p-2 font-semibold text-foreground align-top">{r.label}</td>
                                {content.comparison!.columns.map((c) => (
                                  <td key={c.key as string} className="p-2 text-muted-foreground align-top leading-relaxed">
                                    {(r as any)[c.key] ?? "—"}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  )}
  
                  {content.pitfalls && (
                    <TabsContent value="pitfalls" className="mt-3 space-y-2">
                      <p className="text-xs text-muted-foreground italic">Mimics, look-alikes, and common misreads.</p>
                      {content.pitfalls.map((p) => (
                        <div key={p.mistake} className="p-2.5 rounded-md border border-destructive/30 bg-destructive/5">
                          <p className="text-sm font-semibold text-foreground">⚠️ {p.mistake}</p>
                          <p className="text-xs text-muted-foreground mt-1"><span className="font-medium text-foreground">Reality:</span> {p.reality}</p>
                          <p className="text-xs text-muted-foreground mt-0.5"><span className="font-medium text-foreground">Tip:</span> {p.tip}</p>
                        </div>
                      ))}
                    </TabsContent>
                  )}
  
                  {content.vignettes && (
                    <TabsContent value="vignettes" className="mt-3 space-y-2">
                      <p className="text-xs text-muted-foreground italic">Bedside ICU cases with this rhythm.</p>
                      {content.vignettes.map((v, i) => (
                        <div key={i} className="p-2.5 rounded-md border border-border bg-card">
                          <p className="text-xs text-muted-foreground italic leading-relaxed">{v.scenario}</p>
                          <div className="mt-2 space-y-1 text-xs">
                            <p><span className="font-semibold text-foreground">ECG:</span> <span className="text-muted-foreground">{v.ecgFinding}</span></p>
                            <p><span className="font-semibold text-foreground">Dx:</span> <span className="text-muted-foreground">{v.diagnosis}</span></p>
                            <p><span className="font-semibold text-foreground">Mx:</span> <span className="text-muted-foreground">{v.management}</span></p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DiagramFigure>
  );
};

export default ExpandableEcgCard;

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

export type MapImpact = "avoid" | "caution" | "preferred";

/**
 * Canonical meaning of each badge — used everywhere across the neuro
 * pathophys mappers so the rule is consistent topic-to-topic.
 *
 * AVOID    — Contraindicated or strongly relatively contraindicated.
 *            A safer alternative exists and should be chosen by default.
 * CAUTION  — Can be used, but dose, monitoring, or technique must be
 *            modified; expect altered pharmacodynamics or risk.
 * PREFERRED— First-line choice for this mechanism; either neutralises
 *            the pathophysiology or sidesteps it entirely.
 */
export const IMPACT_DEFINITIONS: Record<MapImpact, string> = {
  avoid:
    "Contraindicated or strongly relatively contraindicated — choose a safer alternative.",
  caution:
    "Use with modified dose, monitoring, or technique — expect altered pharmacodynamics.",
  preferred:
    "First-line choice for this mechanism — either neutralises or sidesteps the pathology.",
};

export interface DrugLink {
  /** Short anaesthetic drug or class label, e.g. "Suxamethonium" */
  drug: string;
  /** One-line consequence linked to the selected mechanism */
  effect: string;
  /** Bottom-line clinical action */
  caution: string;
  impact: MapImpact;
}

export interface MechanismNode {
  id: string;
  /** Pathophysiological mechanism, e.g. "Postsynaptic AChR loss" */
  label: string;
  /** Plain-language one-liner explaining the mechanism */
  detail: string;
  links: DrugLink[];
}

interface PathophysDrugMapperProps {
  title: string;
  /** Optional short tagline under the title */
  tagline?: string;
  mechanisms: MechanismNode[];
}

const impactStyles: Record<MapImpact, { dot: string; chip: string; label: string; Icon: typeof AlertTriangle }> = {
  avoid: {
    dot: "bg-destructive",
    chip: "bg-destructive/10 text-destructive border-destructive/30",
    label: "Avoid",
    Icon: AlertTriangle,
  },
  caution: {
    dot: "bg-amber-500",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
    label: "Caution",
    Icon: Info,
  },
  preferred: {
    dot: "bg-clinical",
    chip: "bg-clinical/10 text-clinical border-clinical/30",
    label: "Preferred",
    Icon: CheckCircle2,
  },
};

/**
 * Compact interactive mapper that links a pathophysiological mechanism
 * to anaesthetic drug effects + key cautions. Designed to sit beside a
 * pathophys diagram inside a topic section.
 */
export const PathophysDrugMapper = ({ title, tagline, mechanisms }: PathophysDrugMapperProps) => {
  const [activeId, setActiveId] = useState<string>(mechanisms[0]?.id ?? "");
  const active = mechanisms.find((m) => m.id === activeId) ?? mechanisms[0];

  return (
    <DiagramFigure
      id="pathophys-drug-mapper"
      title="Pathophys drug mapper"
      description="Auto-generated wrapper for the Pathophys drug mapper anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              {tagline && <p className="text-xs text-muted-foreground mt-1">{tagline}</p>}
            </div>
            {/* Standardised badge legend */}
            <div
              className="flex flex-wrap gap-1.5 items-center text-[10px]"
              aria-label="Badge legend"
            >
              {(Object.keys(impactStyles) as MapImpact[]).map((k) => {
                const s = impactStyles[k];
                const Icon = s.Icon;
                return (
                  <span
                    key={k}
                    title={IMPACT_DEFINITIONS[k]}
                    className={`uppercase tracking-wide px-1.5 py-0.5 rounded border inline-flex items-center gap-1 ${s.chip}`}
                  >
                    <Icon className="h-3 w-3" aria-hidden />
                    {s.label}
                  </span>
                );
              })}
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
            <span className="font-medium text-foreground/80">Avoid</span> = contraindicated;{" "}
            <span className="font-medium text-foreground/80">Caution</span> = use with dose/monitoring change;{" "}
            <span className="font-medium text-foreground/80">Preferred</span> = first-line for this mechanism.
          </p>
  
          {/* Mechanism chips */}
          <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label={`${title} mechanisms`}>
            {mechanisms.map((m) => {
              const isActive = m.id === active?.id;
              return (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(m.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
  
          {/* Active mechanism detail + drug links */}
          {active && (
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
              <div className="bg-card border-l-4 border-primary border border-border rounded-md p-3">
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                  Mechanism
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">{active.label}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{active.detail}</p>
              </div>
  
              <ul className="space-y-2">
                {active.links.map((link, i) => {
                  const s = impactStyles[link.impact];
                  const Icon = s.Icon;
                  return (
                        <li
                      key={`${active.id}-${i}`}
                      className="bg-card border border-border rounded-md p-3 flex gap-3"
                    >
                      <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${s.dot}`} aria-hidden />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center flex-wrap gap-2 mb-1">
                          <span className="text-sm font-semibold text-foreground">{link.drug}</span>
                          <span
                            className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border inline-flex items-center gap-1 ${s.chip}`}
                            title={IMPACT_DEFINITIONS[link.impact]}
                            aria-label={`${s.label}: ${IMPACT_DEFINITIONS[link.impact]}`}
                          >
                            <Icon className="h-3 w-3" aria-hidden />
                            {s.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <span className="text-foreground/80">{link.effect}</span>
                          <span className="block mt-1">→ {link.caution}</span>
                        </p>
                      </div>
                    </li>
    );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PathophysDrugMapper;

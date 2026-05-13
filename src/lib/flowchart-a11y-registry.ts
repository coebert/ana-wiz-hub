/**
 * Registry of SVG flowchart-style diagrams for the in-app a11y audit.
 *
 * Each entry lists:
 *   - the component (lazy-imported)
 *   - the route where it appears (for click-through)
 *   - expectedGroups: minimum number of <g role="group" aria-label="…">
 *     groups the diagram should expose for assistive tech.
 *
 * The audit page (`/dev/a11y-audit`) renders each diagram in a hidden
 * container, counts labelled groups, and flags any shortfall.
 */
import { lazy, type LazyExoticComponent, type ComponentType } from "react";

export interface FlowchartAuditEntry {
  /** Stable id (kebab). */
  id: string;
  /** Display name. */
  name: string;
  /** Route where the diagram is consumed (for "Open in topic"). */
  route?: string;
  /** Minimum count of aria-labelled step / decision / outcome groups. */
  expectedGroups: number;
  /** Lazy component reference. */
  component: LazyExoticComponent<ComponentType<unknown>>;
}

export const FLOWCHART_AUDIT_REGISTRY: FlowchartAuditEntry[] = [
  {
    id: "cam-icu-flowchart",
    name: "CAM-ICU delirium screen",
    route: "/intensive-care/icu-sedation-delirium",
    expectedGroups: 15, // 5 steps + 8 branches + 2 outcomes
    component: lazy(() =>
      import("@/components/diagrams/CAMICUFlowchartDiagram").then((m) => ({
        default: m.CAMICUFlowchartDiagram,
      })),
    ),
  },
  {
    id: "major-incident-triage",
    name: "Major-incident triage flow",
    route: "/perioperative/trauma-emergency",
    expectedGroups: 13, // 4 phases + 4 sieve decisions + 5 stream lanes
    component: lazy(() =>
      import("@/components/diagrams/MajorIncidentTriageDiagram").then((m) => ({
        default: m.MajorIncidentTriageDiagram,
      })),
    ),
  },
  {
    id: "myasthenia-crisis-flowchart",
    name: "Myasthenic crisis flowchart",
    route: "/pharmacology/muscle-relaxants",
    expectedGroups: 8, // 6 steps + 1 decision + steroid follow-on
    component: lazy(() =>
      import("@/components/diagrams/MyastheniaCrisisFlowchart").then((m) => ({
        default: m.MyastheniaCrisisFlowchart,
      })),
    ),
  },
  {
    id: "ans-pathway",
    name: "ANS pathway diagram",
    route: "/physiology/autonomic-nervous",
    expectedGroups: 4, // 4 pathway groups
    component: lazy(() =>
      import("@/components/diagrams/ANSPathwayDiagram").then((m) => ({
        default: m.ANSPathwayDiagram,
      })),
    ),
  },
];

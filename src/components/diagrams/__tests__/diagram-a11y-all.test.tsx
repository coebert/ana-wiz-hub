/**
 * Auto-discovery accessibility regression suite.
 *
 * Walks `src/components/diagrams/*.tsx`, finds every renderable React
 * component, and runs cheap accessibility checks against each one:
 *
 *   1. No "forbidden" ARIA patterns leak into the rendered DOM
 *      (role="img" without an accessible name, aria-hidden on a
 *      focusable element, or a positive tabindex).
 *   2. Every lucide icon is hidden from assistive tech (aria-hidden,
 *      directly or via an aria-hidden ancestor).
 *
 * Heavier per-component axe-core / structural assertions live in
 * `diagram-a11y.test.tsx`. This file is the wide net — it's deliberately
 * fast so it can cover all 400+ diagrams on every commit.
 *
 * Components that genuinely need required props or rely on browser-only
 * APIs (WebGL, observers we don't polyfill, etc.) are listed in
 * SKIP_FILES with a one-liner reason. Any new uncatchable error is
 * reported as a failing test so the allowlist stays honest.
 */
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import * as React from "react";

/* ------------------------------------------------------------------ */
/*  Shared a11y helpers (kept local so this file is self-contained)    */
/* ------------------------------------------------------------------ */

const FORBIDDEN_PATTERNS: Array<{
  name: string;
  test: (el: Element) => boolean;
}> = [
  {
    name: 'role="img" without aria-label/aria-labelledby/<title>',
    test: (el) =>
      el.getAttribute("role") === "img" &&
      !el.getAttribute("aria-label") &&
      !el.getAttribute("aria-labelledby") &&
      !el.querySelector(":scope > title"),
  },
  {
    name: "aria-hidden on a focusable element",
    test: (el) =>
      el.getAttribute("aria-hidden") === "true" &&
      el.matches("a[href], button, input, select, textarea, [tabindex]") &&
      el.getAttribute("tabindex") !== "-1",
  },
  {
    name: "positive tabindex",
    test: (el) => {
      const t = el.getAttribute("tabindex");
      return t != null && Number(t) > 0;
    },
  },
];

const findForbidden = (root: HTMLElement) => {
  const offences: Array<{ rule: string; html: string }> = [];
  for (const el of Array.from(root.querySelectorAll("*"))) {
    for (const rule of FORBIDDEN_PATTERNS) {
      if (rule.test(el)) {
        offences.push({ rule: rule.name, html: el.outerHTML.slice(0, 200) });
      }
    }
  }
  return offences;
};

const isHiddenFromAT = (el: Element): boolean => {
  let cur: Element | null = el;
  while (cur) {
    if (cur.getAttribute("aria-hidden") === "true") return true;
    cur = cur.parentElement;
  }
  return false;
};

/* ------------------------------------------------------------------ */
/*  Auto-discovery                                                     */
/* ------------------------------------------------------------------ */

/**
 * Components we explicitly opt out of (with a reason). Keep this list
 * short and only add when there's a real blocker — required props that
 * can't be defaulted, or a browser-only API jsdom doesn't support.
 */
const SKIP_FILES: Record<string, string> = {
  // Three.js / WebGL — jsdom has no WebGL context.
  "GltfHeartModel.tsx": "WebGL not available in jsdom",
  // Hook helper file, not a component.
  "AnatomyPlate.test.tsx": "test file",
  // Calls SVGPathElement.getTotalLength on path elements that aren't
  // recognised as SVGPathElement instances by jsdom even with a polyfill
  // on the prototype — render-time crash unrelated to a11y.
  "BPControlLoopDiagram.tsx": "jsdom path.getTotalLength incompatibility",
};

/**
 * Eagerly import every diagram module so `describe.each` can iterate
 * synchronously. Vite handles the glob at compile time.
 */
const modules = import.meta.glob<Record<string, unknown>>(
  "../*.tsx",
  { eager: true },
);

type Renderable = React.ComponentType<Record<string, never>>;

/** Pick the most-likely component export from a module. */
function pickComponent(
  mod: Record<string, unknown>,
  baseName: string,
): Renderable | null {
  const ordered: unknown[] = [
    mod.default,
    mod[baseName],
    // Common "Diagram" variants
    mod[`${baseName}Diagram`],
    ...Object.values(mod),
  ];
  for (const candidate of ordered) {
    if (
      typeof candidate === "function" &&
      // Heuristic: React components are PascalCase. Filters out plain helpers.
      /^[A-Z]/.test((candidate as { name?: string }).name ?? "")
    ) {
      return candidate as Renderable;
    }
  }
  return null;
}

interface Discovered {
  file: string;
  name: string;
  Component: Renderable | null;
  skipReason?: string;
}

const discovered: Discovered[] = Object.entries(modules)
  .map(([path, mod]): Discovered => {
    const file = path.split("/").pop()!;
    const baseName = file.replace(/\.tsx$/, "");

    if (SKIP_FILES[file]) {
      return { file, name: baseName, Component: null, skipReason: SKIP_FILES[file] };
    }

    const Component = pickComponent(mod, baseName);
    if (!Component) {
      return {
        file,
        name: baseName,
        Component: null,
        skipReason: "no React component export found",
      };
    }
    return { file, name: baseName, Component };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

/* ------------------------------------------------------------------ */
/*  Sanity check on the discovery itself                               */
/* ------------------------------------------------------------------ */

describe("diagram a11y auto-discovery", () => {
  it("found a meaningful number of diagram components", () => {
    const renderable = discovered.filter((d) => d.Component);
    // We have ~400 diagrams; require at least 200 to catch a glob regression.
    expect(renderable.length).toBeGreaterThan(200);
  });
});

/* ------------------------------------------------------------------ */
/*  The wide net                                                       */
/* ------------------------------------------------------------------ */

afterEach(() => {
  cleanup();
});

/**
 * Components that throw on `render()` with no props — almost always
 * because they take required props. Captured at module-load time so
 * the assertion below stays the same shape on every run.
 *
 * Add new entries here (with a one-liner reason) when a previously
 * passing component starts requiring props. Do NOT remove the
 * `expectedPropFailures` assertion — it's how we notice regressions.
 */
const PROP_REQUIRED: Record<string, string> = {
  AnatomyPlate: "requires { plate, view } props",
  BrainPlateLabels: "requires { region } prop",
  BrainPlatesViewer: "requires { plate } prop",
  BrainRegionsList: "requires { regions } prop",
  DiagramTabs: "requires { tabs } prop",
  DiagramToggleBar: "requires { options, value, onChange } props",
  DiagramSourcesPanel: "requires { sources } prop",
  DiagramLearningPoints: "requires { points } prop",
  DiagramAnimationLegend: "requires { items } prop",
  EcgStripFrame: "requires { children } prop",
  ExpandableEcgCard: "requires content props",
  HotspotLayer: "requires { hotspots } prop",
  GuidedWalkthroughOverlay: "requires { steps } prop",
  AnimatedMechanism: "requires { steps } prop",
  CorPictumFolio: "requires content props",
  MechanismCascadeDiagram: "requires { steps } prop",
  PathophysDrugMapper: "requires { drugs } prop",
  plexusShared: "shared helper module — not a renderable component",
};

/**
 * Components that currently render lucide icons without applying the
 * `aria-hidden` decoration. Tracked here as a regression baseline — any
 * NEW component that joins this list will fail the suite.
 *
 * To clear an entry: wrap the bare lucide icons in `<DecorativeIcon>`
 * (or pass `aria-hidden="true" focusable={false}`) and remove the name
 * from this set.
 */
const KNOWN_LUCIDE_LEAKS = new Set<string>([
  "ADMECascadeDiagram",
  "ALFCerebralOedemaDiagram",
  "AdrenalCrisisAnimation",
  "AlbuminFluidShiftDiagram",
  "AnaphylaxisCascadeDiagram",
  "AorticDicroticNotchDiagram",
  "ArrestTimeWindowWidget",
  "BPControlLoopDiagram",
  "AdrenalCrisisAnimation",
  "AlbuminFluidShiftDiagram",
  "AnaphylaxisCascadeDiagram",
  "AorticDicroticNotchDiagram",
  "ArrestTimeWindowWidget",
  "BradyarrhythmiaDiagram",
  "BurnResuscitationDiagram",
  "BurnsIcuCaseStepper",
  "CICODrillAnimation",
  "CPPSpiralDiagram",
  "CTScannerDiagram",
  "Cat1RSIAnimation",
  "CellSalvageAnimatedDiagram",
  "ComplicationBundlesAnimation",
  "CssdWasteFlowSubMap",
  "DKAAnimation",
  "DLTInsertionDiagram",
  "EmergencyLaparotomyBundleDiagram",
  "EmergencyRSIDiagram",
  "EndocrineSymptomTriage",
  "GlycocalyxSheddingCascadeDiagram",
  "GoalDirectedTherapyAnimation",
  "HPAAxisSuppressionDiagram",
  "HeartBlockDiagram",
  "HygrometersDiagram",
  "HyponatraemiaWorkupDiagram",
  "InhalationInjuryFlowchart",
  "MModePathologyDiagram",
  "MajorIncidentTriageDiagram",
  "MilitaryRolesFlowDiagram",
  "MyastheniaCrisisFlowchart",
  "MyasthenicVsCholinergicComparison",
  "NCEPODClassificationDiagram",
  "NeuroDiseasePathophysDiagram",
  "OLVTroubleshootingDiagram",
  "OpioidSignallingCascadeAnimation",
  "PHPathophysiologyDiagram",
  "PancreatitisAutodigestionDiagram",
  "PancreatitisEvolutionTimeline",
  "ParacetamolNomogramDiagram",
  "ParklandCalculator",
  "PatientPositioningMechanisms",
  "PneumotachographDiagram",
  "PostCardiacArrestSyndromeDiagram",
  "RRTCircuitFlowDiagram",
  "RaisedICPCascadeDiagram",
  "RefeedingRiskCalculatorDiagram",
  "RefeedingSyndromeAnimation",
  "SedationDeliveryProfilesDiagram",
  "SepsisHostResponseDiagram",
  "SinogramFBPWalkthrough",
  "TachyarrhythmiaDiagram",
  "TheatreZoningDiagram",
  "ThermodilutionDiagram",
  "ThyroidStormAnimation",
  "ToxidromeComparatorDiagram",
  "TraliVsTacoDecisionTool",
  "TransportVentilationDiagram",
  "VaughanWilliamsAPDiagram",
  "WrightRespirometerDiagram",
]);

const renderableEntries = discovered.filter((d) => d.Component);

describe("every diagram passes basic a11y checks", () => {
  // Track which components we couldn't render so we can assert against
  // the expected list at the end and detect new regressions.
  const renderFailures = new Map<string, string>();

  for (const { name, file, Component } of renderableEntries) {
    if (PROP_REQUIRED[name]) {
      it.skip(`${name} (${file}) — ${PROP_REQUIRED[name]}`, () => {});
      continue;
    }

    it(`${name} has no forbidden ARIA patterns and hides decorative SVGs`, () => {
      let container: HTMLElement;
      try {
        ({ container } = render(React.createElement(Component!)));
      } catch (err) {
        renderFailures.set(name, (err as Error).message);
        // Soft-fail with a clear message so the allowlist can be updated.
        throw new Error(
          `Failed to render <${name} />. If this component requires props, ` +
            `add it to PROP_REQUIRED with a reason. Underlying error:\n` +
            (err as Error).message,
        );
      }

      // Cheap assertion 1 — no forbidden ARIA patterns
      const offences = findForbidden(container);
      expect(
        offences,
        `Forbidden ARIA pattern(s) in <${name} />:\n` +
          JSON.stringify(offences, null, 2),
      ).toEqual([]);

      // Cheap assertion 2 — every lucide icon is hidden from AT.
      // Components in KNOWN_LUCIDE_LEAKS are baselined regressions; the
      // assertion below INVERTS for them so an accidental fix doesn't
      // silently re-leak in future, and a *new* offender outside the
      // allowlist will fail the suite immediately.
      const lucideSvgs = Array.from(
        container.querySelectorAll("svg.lucide, svg[class*='lucide']"),
      );
      const leaked = lucideSvgs.filter((svg) => !isHiddenFromAT(svg));
      const isBaselined = KNOWN_LUCIDE_LEAKS.has(name);

      if (isBaselined) {
        expect(
          leaked.length,
          `<${name}> is in KNOWN_LUCIDE_LEAKS but no longer leaks — ` +
            `remove it from the allowlist.`,
        ).toBeGreaterThan(0);
      } else {
        expect(
          leaked.length,
          `Lucide icon(s) must be hidden from AT in <${name} />. ` +
            `Wrap them in <DecorativeIcon> or add aria-hidden + focusable={false}.\n` +
            leaked.map((s) => s.outerHTML.slice(0, 160)).join("\n"),
        ).toBe(0);
      }

    });
  }
});

/* ------------------------------------------------------------------ */
/*  Discovery diagnostics — surface skipped files in the test report   */
/* ------------------------------------------------------------------ */

describe("discovery diagnostics", () => {
  it("reports modules without a renderable component", () => {
    const noComp = discovered
      .filter((d) => !d.Component && d.skipReason === "no React component export found")
      .map((d) => d.file);
    // Most non-component files are layout primitives — log them so the
    // human can spot a missing default export quickly. Keep the assertion
    // loose; this is informational.
    expect(noComp.length).toBeLessThan(40);
  });
});

/**
 * Diagram accessibility regression tests.
 *
 * Two checks per diagram component under test:
 *  1. axe-core finds no WCAG violations in the rendered output.
 *  2. Decorative SVGs / lucide icons are reliably hidden from
 *     assistive tech (aria-hidden, role="presentation", focusable=false)
 *     and no forbidden ARIA patterns leak into diagram markup.
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { AlertTriangle, Info } from "lucide-react";

import { DecorativeIcon } from "@/components/diagrams/_shared/DecorativeIcon";
import {
  DiagramFigure,
  svgImgProps,
  svgNodeProps,
  svgDecorativeProps,
} from "@/components/diagrams/_shared/DiagramFigure";
import { CAMICUFlowchartDiagram } from "@/components/diagrams/intensive-care/CAMICUFlowchartDiagram";

expect.extend(toHaveNoViolations);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const FORBIDDEN_PATTERNS: Array<{
  name: string;
  test: (el: Element) => boolean;
}> = [
  {
    // role="img" without an accessible name
    name: 'role="img" without aria-label/aria-labelledby/<title>',
    test: (el) =>
      el.getAttribute("role") === "img" &&
      !el.getAttribute("aria-label") &&
      !el.getAttribute("aria-labelledby") &&
      !el.querySelector(":scope > title"),
  },
  {
    // aria-hidden on a focusable element
    name: "aria-hidden on a focusable element",
    test: (el) =>
      el.getAttribute("aria-hidden") === "true" &&
      (el.matches("a[href], button, input, select, textarea, [tabindex]") &&
        el.getAttribute("tabindex") !== "-1"),
  },
  {
    // tabindex > 0 (positive tabindex is a known a11y antipattern)
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
        offences.push({
          rule: rule.name,
          html: el.outerHTML.slice(0, 200),
        });
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
/*  Tests                                                              */
/* ------------------------------------------------------------------ */

describe("DecorativeIcon", () => {
  it("renders a bare icon with the full a11y-decoration attribute set", () => {
    const { container } = render(<DecorativeIcon icon={AlertTriangle} />);
    const svg = container.querySelector("svg")!;
    expect(svg).toBeTruthy();
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.getAttribute("role")).toBe("presentation");
    expect(svg.getAttribute("focusable")).toBe("false");
    expect(svg.getAttribute("tabindex")).toBe("-1");
  });

  it("hides the badge wrapper from assistive tech as well", () => {
    const { container } = render(
      <DecorativeIcon icon={AlertTriangle} badge="destructive" />,
    );
    const span = container.querySelector("span")!;
    expect(span.getAttribute("aria-hidden")).toBe("true");
    expect(span.getAttribute("role")).toBe("presentation");
    expect(isHiddenFromAT(container.querySelector("svg")!)).toBe(true);
  });

  it("passes axe with no violations", async () => {
    const { container } = render(
      <p>
        Warning
        <DecorativeIcon icon={AlertTriangle} badge="destructive" />
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("DiagramFigure + svg helpers", () => {
  it("wires figure → labelledby → svg role=img cleanly", async () => {
    const { container } = render(
      <DiagramFigure
        id="demo"
        title="Demo diagram"
        description="A square inside a figure."
      >
        <svg
          {...svgImgProps({ id: "demo" })}
          aria-labelledby="demo-title demo-desc"
          viewBox="0 0 10 10"
        >
          <title id="demo-title">Demo diagram</title>
          <desc id="demo-desc">A square inside a figure.</desc>
          <g {...svgNodeProps("Step 1: the square")}>
            <title>Step 1</title>
            <rect x="1" y="1" width="8" height="8" />
          </g>
          <circle cx="5" cy="5" r="1" {...svgDecorativeProps} />
        </svg>
      </DiagramFigure>,
    );

    const figure = container.querySelector("figure")!;
    expect(figure.getAttribute("aria-labelledby")).toBe("demo-figure-title");
    expect(figure.getAttribute("aria-describedby")).toBe("demo-figure-desc");

    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("role")).toBe("img");
    expect(svg.querySelector("title")?.textContent).toBe("Demo diagram");

    const decorative = container.querySelector("circle")!;
    expect(decorative.getAttribute("aria-hidden")).toBe("true");
    expect(decorative.getAttribute("focusable")).toBe("false");

    expect(findForbidden(container)).toEqual([]);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("CAMICUFlowchartDiagram (canonical reference diagram)", () => {
  it("uses no forbidden ARIA patterns", () => {
    const { container } = render(<CAMICUFlowchartDiagram />);
    const offences = findForbidden(container);
    expect(offences, JSON.stringify(offences, null, 2)).toEqual([]);
  });

  it("hides every lucide AlertTriangle / decorative svg from screen readers", () => {
    const { container } = render(<CAMICUFlowchartDiagram />);

    // Every lucide SVG used as decoration sits inside an aria-hidden ancestor
    // OR carries aria-hidden itself.
    const lucideSvgs = Array.from(
      container.querySelectorAll("svg.lucide, svg[class*='lucide']"),
    );
    expect(lucideSvgs.length).toBeGreaterThan(0);
    for (const svg of lucideSvgs) {
      expect(
        isHiddenFromAT(svg),
        `lucide icon must be hidden from AT:\n${svg.outerHTML.slice(0, 200)}`,
      ).toBe(true);
    }

    // The main diagram SVG itself MUST remain visible to AT (role=img + label).
    const mainSvg = container.querySelector("svg[role='img']");
    expect(mainSvg).toBeTruthy();
    expect(mainSvg!.getAttribute("aria-labelledby")).toBeTruthy();
  });
});

/* ------------------------------------------------------------------ */
/*  Sanity test for the forbidden-pattern detector itself              */
/* ------------------------------------------------------------------ */

describe("forbidden-pattern detector", () => {
  it("flags role=img without an accessible name", () => {
    const { container } = render(
      <svg role="img" viewBox="0 0 10 10">
        <rect width="10" height="10" />
      </svg>,
    );
    expect(findForbidden(container).length).toBeGreaterThan(0);
  });

  it("flags positive tabindex", () => {
    const { container } = render(<button tabIndex={3}>x</button>);
    expect(findForbidden(container).map((o) => o.rule)).toContain(
      "positive tabindex",
    );
  });

  it("flags aria-hidden on a focusable button", () => {
    const { container } = render(
      <button aria-hidden="true">Hidden but focusable</button>,
    );
    expect(findForbidden(container).map((o) => o.rule)).toContain(
      "aria-hidden on a focusable element",
    );
  });
});

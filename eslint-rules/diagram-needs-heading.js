/**
 * Custom ESLint rule: diagram-needs-heading
 *
 * Diagrams must always sit beneath an <h2> so that:
 *   - the page outline reads logically
 *   - the auto-generated StickyTOC (see SectionLayout) picks them up
 *
 * A diagram is any JSX element whose tag name ends in `Diagram` (e.g.
 * `<RedoxElectrochemistryDiagram />`, `<OpioidReceptorDiagram />`).
 *
 * The rule is satisfied when the diagram element is rendered inside one of:
 *   1. `<DiagramSection title="...">…</DiagramSection>` (preferred wrapper)
 *   2. any JSX element that *also* contains a sibling <h2> earlier in the
 *      same children list (the legacy pattern used across topic pages)
 *
 * Otherwise the rule reports an error and suggests wrapping the diagram in
 * `<DiagramSection title="…">`.
 *
 * This rule only inspects JSX literally — it cannot follow diagrams that
 * are spread through arbitrary helper components. That is intentional: the
 * point is to keep topic pages explicit and grep-friendly.
 */

const DIAGRAM_TAG_RE = /Diagram$/;
const ALLOWED_WRAPPERS = new Set(["DiagramSection"]);

function getJSXName(node) {
  if (!node) return null;
  if (node.type === "JSXIdentifier") return node.name;
  if (node.type === "JSXMemberExpression") {
    // e.g. <Foo.Bar /> — use the right-most identifier
    return node.property && node.property.name;
  }
  return null;
}

function getOpeningName(jsxElement) {
  if (!jsxElement || jsxElement.type !== "JSXElement") return null;
  return getJSXName(jsxElement.openingElement && jsxElement.openingElement.name);
}

function isDiagramElement(node) {
  if (!node || node.type !== "JSXElement") return false;
  const name = getOpeningName(node);
  return !!name && DIAGRAM_TAG_RE.test(name) && !ALLOWED_WRAPPERS.has(name);
}

/** Find the nearest enclosing JSXElement (skipping JSXFragments and expressions). */
function nearestJSXElementAncestor(node) {
  let cur = node.parent;
  while (cur) {
    if (cur.type === "JSXElement") return cur;
    cur = cur.parent;
  }
  return null;
}

/**
 * Walk up through ancestors. Returns true if any ancestor element is one of
 * the allowed wrappers (currently just <DiagramSection>).
 */
function hasAllowedWrapperAncestor(node) {
  let cur = nearestJSXElementAncestor(node);
  while (cur) {
    const name = getOpeningName(cur);
    if (name && ALLOWED_WRAPPERS.has(name)) return true;
    cur = nearestJSXElementAncestor(cur);
  }
  return false;
}

/**
 * Recursively check whether a JSX subtree contains an <h2> element.
 * Used to detect the legacy `<div><h2/>…<SomeDiagram/></div>` pattern.
 */
function subtreeContainsH2(node) {
  if (!node) return false;
  if (node.type === "JSXElement") {
    const name = getOpeningName(node);
    if (name === "h2") return true;
    return (node.children || []).some(subtreeContainsH2);
  }
  if (node.type === "JSXFragment") {
    return (node.children || []).some(subtreeContainsH2);
  }
  if (node.type === "JSXExpressionContainer") {
    // Don't try to evaluate dynamic expressions — be conservative and say no.
    return false;
  }
  return false;
}

/**
 * Check whether the diagram has a sibling <h2> appearing earlier in the
 * same parent's children list. This permits the existing pattern:
 *   <div>
 *     <h2>…</h2>
 *     <SomeDiagram />
 *   </div>
 */
function hasPrecedingH2InSiblings(diagramNode) {
  const parent = diagramNode.parent;
  if (!parent || !Array.isArray(parent.children)) return false;
  const idx = parent.children.indexOf(diagramNode);
  if (idx <= 0) return false;
  for (let i = 0; i < idx; i++) {
    if (subtreeContainsH2(parent.children[i])) return true;
  }
  return false;
}

const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Diagram components must be wrapped in <DiagramSection> (or a parent block that includes an <h2>) so every diagram has a contextual heading and appears in the page TOC.",
    },
    schema: [],
    messages: {
      missingHeading:
        'Diagram <{{name}} /> must sit under an <h2>. Wrap it in <DiagramSection title="…"> from "@/components/DiagramSection", or add a sibling <h2> in the same parent element.',
    },
  },
  create(context) {
    return {
      JSXElement(node) {
        if (!isDiagramElement(node)) return;

        if (hasAllowedWrapperAncestor(node)) return;
        if (hasPrecedingH2InSiblings(node)) return;

        // Walk up: if any ancestor element has a preceding <h2> sibling
        // *of the diagram's enclosing block*, that also counts. We already
        // checked direct siblings; check the immediate enclosing JSXElement
        // too (covers `<div><h2/><div><Diagram/></div></div>`).
        const enclosing = nearestJSXElementAncestor(node);
        if (enclosing && hasPrecedingH2InSiblings(enclosing)) return;

        context.report({
          node,
          messageId: "missingHeading",
          data: { name: getOpeningName(node) || "Diagram" },
        });
      },
    };
  },
};

export default rule;

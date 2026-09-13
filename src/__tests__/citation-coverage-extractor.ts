/**
 * Static-analysis helper for the citation-coverage test.
 *
 * Parses a topic file with the TS compiler API and pulls out:
 *   - topicId            (required string literal prop on <TopicTemplate>)
 *   - keyPoints          (array passed to <TopicTemplate>; resolved if it's
 *                         a const reference in the same module)
 *   - workedExamples     (same handling)
 *
 * For every entry it returns whether it has a `cites: [...]` field and the
 * literal labels inside that field (string-literals only — non-literal
 * expressions are reported as `unresolved: true`).
 *
 * The walker is intentionally conservative: anything it can't statically
 * resolve is reported as a violation rather than silently skipped, because
 * an unverifiable citation is the same as a missing one for our purposes.
 */
import { readFileSync } from "node:fs";
import ts from "typescript";

export interface ExtractedEntry {
  /** "keyPoint" | "workedExample" — for nicer error messages */
  kind: "keyPoint" | "workedExample";
  /** index in the source array, for error messages */
  index: number;
  /** Best-effort short label for the entry (first text of the keypoint, or the WE title) */
  preview: string;
  /** Source line number of the entry node */
  line: number;
  /** All `cites` labels we could resolve as string literals. */
  cites: string[];
  /** True when the entry has a `cites:` property at all. */
  hasCitesProperty: boolean;
  /** True when the entry node itself was an unresolved expression
   *  (e.g. spread, function call) and we can't validate it. */
  unresolved: boolean;
}

export interface ExtractedTopic {
  filePath: string;
  topicId: string | null;
  keyPoints: ExtractedEntry[];
  workedExamples: ExtractedEntry[];
  /** True if we found a <TopicTemplate /> at all. */
  foundTopicTemplate: boolean;
  /** Static-analysis warnings (e.g. couldn't resolve an array reference). */
  warnings: string[];
}

/** Get the start line (1-indexed) of an AST node within its source file. */
function lineOf(node: ts.Node, sf: ts.SourceFile): number {
  return sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
}

/** Extract a string literal value, or null if expr isn't a literal. */
function asStringLiteral(expr: ts.Expression | undefined): string | null {
  if (!expr) return null;
  if (ts.isStringLiteralLike(expr)) return expr.text;
  if (ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text;
  return null;
}

/** Walk a source file and collect top-level `const NAME = [...]` array initialisers. */
function collectTopLevelArrayConsts(
  sf: ts.SourceFile,
): Map<string, ts.ArrayLiteralExpression> {
  const map = new Map<string, ts.ArrayLiteralExpression>();
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      const init = decl.initializer;
      if (init && ts.isArrayLiteralExpression(init)) {
        map.set(decl.name.text, init);
      }
    }
  }
  return map;
}

/** Pull out `cites: [...]` labels from an object literal element. */
function extractCitesFromObjectLiteral(
  obj: ts.ObjectLiteralExpression,
): { hasCitesProperty: boolean; cites: string[]; previewKey?: string } {
  let hasCitesProperty = false;
  const cites: string[] = [];
  let previewKey: string | undefined;

  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = prop.name;
    const key = ts.isIdentifier(name)
      ? name.text
      : ts.isStringLiteralLike(name)
        ? name.text
        : null;
    if (!key) continue;

    if (key === "cites") {
      hasCitesProperty = true;
      const init = prop.initializer;
      if (ts.isArrayLiteralExpression(init)) {
        for (const el of init.elements) {
          const lit = asStringLiteral(el as ts.Expression);
          if (lit !== null) cites.push(lit);
        }
      }
    }

    // Capture a preview field for error messages.
    if (key === "title" || key === "scenario" || key === "text") {
      const lit = asStringLiteral(prop.initializer);
      if (lit && !previewKey) previewKey = lit.slice(0, 60);
    }
  }

  return { hasCitesProperty, cites, previewKey };
}

/** Walk an array literal and turn each element into an ExtractedEntry. */
function extractEntriesFromArray(
  arr: ts.ArrayLiteralExpression,
  kind: "keyPoint" | "workedExample",
  sf: ts.SourceFile,
): ExtractedEntry[] {
  const out: ExtractedEntry[] = [];
  arr.elements.forEach((el, index) => {
    const line = lineOf(el, sf);

    // String-literal keyPoint, e.g. keyPoints={[ "...", "..." ]}
    const lit = asStringLiteral(el as ts.Expression);
    if (lit !== null) {
      out.push({
        kind,
        index,
        preview: lit.slice(0, 60),
        line,
        cites: [],
        hasCitesProperty: false,
        unresolved: false,
      });
      return;
    }

    if (ts.isObjectLiteralExpression(el)) {
      const { hasCitesProperty, cites, previewKey } =
        extractCitesFromObjectLiteral(el);
      out.push({
        kind,
        index,
        preview: previewKey ?? `(entry ${index})`,
        line,
        cites,
        hasCitesProperty,
        unresolved: false,
      });
      return;
    }

    // Anything else (spread, call expression, conditional) — we can't validate it.
    out.push({
      kind,
      index,
      preview: el.getText(sf).slice(0, 60),
      line,
      cites: [],
      hasCitesProperty: false,
      unresolved: true,
    });
  });
  return out;
}

/** Find the first <TopicTemplate ... /> JSX element in the source file. */
function findTopicTemplate(sf: ts.SourceFile): ts.JsxOpeningLikeElement | null {
  let found: ts.JsxOpeningLikeElement | null = null;
  const visit = (node: ts.Node) => {
    if (found) return;
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      ts.isIdentifier(node.tagName) &&
      node.tagName.text === "TopicTemplate"
    ) {
      found = node;
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return found;
}

/** Read a JSX prop value as an Expression (handles both = "..." and ={ ... }). */
function getJsxPropExpression(
  el: ts.JsxOpeningLikeElement,
  name: string,
): ts.Expression | null {
  for (const attr of el.attributes.properties) {
    if (!ts.isJsxAttribute(attr)) continue;
    if (!ts.isIdentifier(attr.name)) continue;
    if (attr.name.text !== name) continue;
    const init = attr.initializer;
    if (!init) return null;
    if (ts.isStringLiteral(init)) return init;
    if (ts.isJsxExpression(init) && init.expression) return init.expression;
  }
  return null;
}

/** Resolve an array prop: either an inline array literal, or an Identifier
 *  pointing to a top-level `const X = [...]`. Returns null otherwise. */
function resolveArrayProp(
  expr: ts.Expression | null,
  topLevelArrays: Map<string, ts.ArrayLiteralExpression>,
): ts.ArrayLiteralExpression | null {
  if (!expr) return null;
  if (ts.isArrayLiteralExpression(expr)) return expr;
  if (ts.isIdentifier(expr)) {
    return topLevelArrays.get(expr.text) ?? null;
  }
  return null;
}

export function extractTopic(filePath: string): ExtractedTopic {
  const source = readFileSync(filePath, "utf8");
  const sf = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ true,
    ts.ScriptKind.TSX,
  );

  const result: ExtractedTopic = {
    filePath,
    topicId: null,
    keyPoints: [],
    workedExamples: [],
    foundTopicTemplate: false,
    warnings: [],
  };

  const tpl = findTopicTemplate(sf);
  if (!tpl) return result;
  result.foundTopicTemplate = true;

  const topicIdExpr = getJsxPropExpression(tpl, "topicId");
  result.topicId = asStringLiteral(topicIdExpr ?? undefined);
  if (!result.topicId) {
    // Some topics hoist the id into a module constant and pass
    // `topicId={TOPIC_ID}` — resolve that indirection.
    const hoisted = source.match(/(?:const|let)\s+TOPIC_ID\s*(?::\s*string\s*)?=\s*"([^"]+)"/);
    result.topicId = hoisted?.[1] ?? null;
  }
  if (!result.topicId) {
    result.warnings.push("topicId prop missing or not a string literal");
  }

  const topLevelArrays = collectTopLevelArrayConsts(sf);

  const keyPointsExpr = getJsxPropExpression(tpl, "keyPoints");
  const keyPointsArr = resolveArrayProp(keyPointsExpr, topLevelArrays);
  if (keyPointsExpr && !keyPointsArr) {
    result.warnings.push(
      `Could not statically resolve keyPoints prop (got ${ts.SyntaxKind[keyPointsExpr.kind]})`,
    );
  }
  if (keyPointsArr) {
    result.keyPoints = extractEntriesFromArray(keyPointsArr, "keyPoint", sf);
  }

  const wxExpr = getJsxPropExpression(tpl, "workedExamples");
  const wxArr = resolveArrayProp(wxExpr, topLevelArrays);
  if (wxExpr && !wxArr) {
    result.warnings.push(
      `Could not statically resolve workedExamples prop (got ${ts.SyntaxKind[wxExpr.kind]})`,
    );
  }
  if (wxArr) {
    result.workedExamples = extractEntriesFromArray(wxArr, "workedExample", sf);
  }

  return result;
}

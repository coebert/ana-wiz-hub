import ts from "typescript";

export function parseTopic(source: string, filename = "topic.tsx") {
  const sf = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const diagnostics: string[] = [];
  const constants = new Map<string, ts.Expression>();
  for (const statement of sf.statements) {
    if (!ts.isVariableStatement(statement) || !(statement.declarationList.flags & ts.NodeFlags.Const)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) constants.set(declaration.name.text, declaration.initializer);
    }
  }
  function resolve(expression: ts.Expression, seen = new Set<string>()): ts.Expression {
    if (ts.isParenthesizedExpression(expression) || ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression)) return resolve(expression.expression, seen);
    if (ts.isIdentifier(expression) && !seen.has(expression.text)) {
      const value = constants.get(expression.text);
      if (value) return resolve(value, new Set([...seen, expression.text]));
    }
    return expression;
  }
  function labels(expression: ts.Expression, context: string): string[] {
    const value = resolve(expression);
    if (!ts.isArrayLiteralExpression(value)) { diagnostics.push(`unresolved ${context}: ${value.getText(sf)}`); return []; }
    return value.elements.flatMap(element => {
      if (ts.isStringLiteralLike(element)) return [element.text];
      diagnostics.push(`nonliteral ${context}: ${element.getText(sf)}`); return [];
    });
  }
  let topicId: string | null = null;
  let foundTopicTemplate = false;
  const explicitIds = new Set<string>();
  const cites: string[] = [];
  const sections: Record<string, string[]> = {};
  const renderedDiagrams = new Set<string>();
  const importedDiagrams = new Set<string>();
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || !statement.moduleSpecifier.text.startsWith("@/components/diagrams/")) continue;
    const clause = statement.importClause;
    if (clause?.name) importedDiagrams.add(clause.name.text);
    if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) for (const e of clause.namedBindings.elements) importedDiagrams.add(e.name.text);
  }
  function visit(node: ts.Node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(sf).replace(/['"]/g, "") === "cites") cites.push(...labels(node.initializer, "cites"));
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      for (const prop of node.attributes.properties) {
        if (!ts.isJsxAttribute(prop) || prop.name.getText(sf) !== "topicId" || !prop.initializer) continue;
        const expression = ts.isJsxExpression(prop.initializer) ? prop.initializer.expression : prop.initializer;
        if (expression) {
          const value = resolve(expression);
          if (ts.isStringLiteralLike(value)) explicitIds.add(value.text);
        }
      }
      if (importedDiagrams.has(node.tagName.getText(sf))) renderedDiagrams.add(node.tagName.getText(sf));
      if (node.tagName.getText(sf) === "TopicTemplate") {
        foundTopicTemplate = true;
        for (const prop of node.attributes.properties) {
          if (!ts.isJsxAttribute(prop) || !prop.initializer) continue;
          const expression = ts.isJsxExpression(prop.initializer) ? prop.initializer.expression : prop.initializer;
          if (!expression) continue;
          if (prop.name.getText(sf) === "topicId") {
            const value = resolve(expression);
            topicId = ts.isStringLiteralLike(value) ? value.text : null;
            if (topicId === null) diagnostics.push(`unresolved topicId: ${expression.getText(sf)}`);
          }
          if (prop.name.getText(sf) === "sectionSources") {
            const value = resolve(expression);
            if (!ts.isObjectLiteralExpression(value)) diagnostics.push("unresolved sectionSources");
            else for (const field of value.properties) {
              if (ts.isPropertyAssignment(field)) sections[field.name.getText(sf).replace(/['"]/g, "")] = labels(field.initializer, "sectionSources");
              else diagnostics.push(`unresolved sectionSources: ${field.getText(sf)}`);
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  // Legacy hand-composed pages: only actual topicId props can establish identity.
  // Never infer it from unrelated constants, URLs or prose.
  if (!foundTopicTemplate && explicitIds.size === 1) topicId = [...explicitIds][0];
  if (!foundTopicTemplate && explicitIds.size > 1) diagnostics.push("conflicting legacy topicId props");
  if (foundTopicTemplate && !topicId && !diagnostics.some(d => d.includes("topicId"))) diagnostics.push("missing topicId");
  return { topicId, foundTopicTemplate, cites, sections, diagnostics, renderedDiagrams: [...renderedDiagrams] };
}

export function labelIssues(topic: ReturnType<typeof parseTopic>, pool: Map<string, Set<string>>, kind: "cites" | "sections") {
  const labels = kind === "cites" ? topic.cites : Object.values(topic.sections).flat();
  const issues = [...topic.diagnostics];
  if (!topic.topicId) return [...issues, "unknown topicId"];
  const known = pool.get(topic.topicId);
  if (!known) return [...issues, `unknown reference pool: ${topic.topicId}`];
  return [...issues, ...labels.filter(label => !known.has(label)).map(label => `unknown label: ${label}`)];
}
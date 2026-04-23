/**
 * Custom ESLint rule: valid-exam-tag
 *
 * Flags string literals that look like an ExamTag but aren't one of the
 * allowed values: "primary" | "final" | "fficm" | "edic".
 *
 * The ExamTag literal-union type already catches mismatches in typed
 * positions (e.g. `examTags: ExamTag[]`), but raw strings in untyped
 * contexts — `const x = "ficm"`, object literals without an annotation,
 * test fixtures — slip through `tsc`. This rule catches those.
 *
 * Triggers when a string literal:
 *   - Is one character off from a valid tag (Levenshtein ≤ 1), OR
 *   - Lives in a context whose key/identifier hints at exams
 *     (examTags, exam, exams), AND isn't a valid tag.
 *
 * Suggests the closest valid tag as an autofix.
 */
const VALID_TAGS = ["primary", "final", "fficm", "edic"];
const EXAM_HINT_RE = /^(exam|exams|examtag|examtags)$/i;

function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

function closestTag(value) {
  let best = null;
  let bestDist = Infinity;
  for (const tag of VALID_TAGS) {
    const d = levenshtein(value.toLowerCase(), tag);
    if (d < bestDist) {
      bestDist = d;
      best = tag;
    }
  }
  return { tag: best, distance: bestDist };
}

function isStringLiteral(node) {
  return node && node.type === "Literal" && typeof node.value === "string";
}

/** Walk up the AST to find the property/variable name this literal belongs to. */
function contextKey(node) {
  let cur = node.parent;
  while (cur) {
    if (cur.type === "Property" || cur.type === "PropertyDefinition") {
      const key = cur.key;
      if (key) {
        if (key.type === "Identifier") return key.name;
        if (key.type === "Literal" && typeof key.value === "string") return key.value;
      }
      return null;
    }
    if (cur.type === "VariableDeclarator" && cur.id?.type === "Identifier") {
      return cur.id.name;
    }
    if (cur.type === "JSXAttribute" && cur.name?.type === "JSXIdentifier") {
      return cur.name.name;
    }
    // Stop crossing function / statement boundaries
    if (
      cur.type === "FunctionDeclaration" ||
      cur.type === "FunctionExpression" ||
      cur.type === "ArrowFunctionExpression" ||
      cur.type === "BlockStatement"
    ) {
      return null;
    }
    cur = cur.parent;
  }
  return null;
}

const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Flag string literals that look like an ExamTag but aren't 'primary' | 'final' | 'fficm' | 'edic'.",
    },
    fixable: "code",
    schema: [],
    messages: {
      invalidTag:
        "'{{value}}' is not a valid ExamTag. Did you mean '{{suggestion}}'? Valid tags: {{valid}}.",
    },
  },
  create(context) {
    return {
      Literal(node) {
        if (!isStringLiteral(node)) return;
        const value = node.value;
        if (!value || value.length > 12) return;
        if (VALID_TAGS.includes(value)) return;

        const { tag: suggestion, distance } = closestTag(value);
        const key = contextKey(node);
        const inExamContext = key && EXAM_HINT_RE.test(key);

        // Trigger if either: typo-close to a valid tag, OR sitting in an
        // obvious exam context with a non-matching value.
        const looksLikeTypo = distance > 0 && distance <= 1;
        if (!looksLikeTypo && !inExamContext) return;

        // Avoid noise: only flag in exam context, OR when the typo is
        // unambiguous (distance 1 from exactly one tag).
        if (!inExamContext && distance !== 1) return;

        context.report({
          node,
          messageId: "invalidTag",
          data: {
            value,
            suggestion,
            valid: VALID_TAGS.join(", "),
          },
          fix(fixer) {
            const raw = node.raw ?? `"${value}"`;
            const quote = raw[0] === "'" ? "'" : '"';
            return fixer.replaceText(node, `${quote}${suggestion}${quote}`);
          },
        });
      },
    };
  },
};

export default rule;

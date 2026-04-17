/**
 * Custom ESLint rule: no-hex-alpha-concat
 *
 * Flags string concatenation that appends a 2-character hex-alpha suffix
 * (e.g. `color + "18"`, `m.color + "0a"`, `"#3b82f6" + "33"`) onto a value
 * that may be a non-hex color string (`hsl(...)`, `rgb(...)`, named color).
 *
 * Background — see src/lib/color-utils.ts. Appending `"18"` to an `hsl(...)`
 * string produces invalid CSS (`hsl(0,0%,0%)18`); browsers fall back to a
 * previous opaque value and translucent surfaces render as solid blocks
 * that obscure overlaid text.
 *
 * Use `withAlpha(color, 0.09)` from `@/lib/color-utils` instead.
 *
 * Provides an autofix that:
 *   1. Rewrites `<colorExpr> + "18"` → `withAlpha(<colorExpr>, 0.09)`
 *   2. Ensures `import { withAlpha } from "@/lib/color-utils"` is present
 *      (adds the named import, or extends an existing import from that path).
 */
const HEX_ALPHA_RE = /^[0-9a-fA-F]{2}$/;
const COLOR_HINT_RE = /color|colour|tint|fill|stroke|bg|background|border|shade|hue|palette/i;
const HELPER_MODULE = "@/lib/color-utils";
const HELPER_NAME = "withAlpha";

function isHexAlphaLiteral(node) {
  return (
    node &&
    node.type === "Literal" &&
    typeof node.value === "string" &&
    HEX_ALPHA_RE.test(node.value)
  );
}

function isHexAlphaTemplate(node) {
  return (
    node &&
    node.type === "TemplateLiteral" &&
    node.expressions.length === 0 &&
    node.quasis.length === 1 &&
    HEX_ALPHA_RE.test(node.quasis[0].value.cooked)
  );
}

function isHexAlpha(node) {
  return isHexAlphaLiteral(node) || isHexAlphaTemplate(node);
}

function leftLooksLikeColor(node) {
  if (!node) return false;
  if (node.type === "Identifier") return COLOR_HINT_RE.test(node.name);
  if (node.type === "MemberExpression") {
    if (node.property && node.property.type === "Identifier" && COLOR_HINT_RE.test(node.property.name)) {
      return true;
    }
    return leftLooksLikeColor(node.object);
  }
  if (node.type === "Literal" && typeof node.value === "string") {
    return /^(hsl|hsla|rgb|rgba|var)\(/i.test(node.value);
  }
  if (node.type === "CallExpression" && node.callee && node.callee.type === "Identifier") {
    return COLOR_HINT_RE.test(node.callee.name);
  }
  if (node.type === "ConditionalExpression") {
    return leftLooksLikeColor(node.consequent) || leftLooksLikeColor(node.alternate);
  }
  if (node.type === "LogicalExpression") {
    return leftLooksLikeColor(node.left) || leftLooksLikeColor(node.right);
  }
  return false;
}

/**
 * Build the import-fix function. Returns a fixer operation (or null) that
 * either inserts a brand-new `import { withAlpha } from "@/lib/color-utils"`
 * statement, or extends an existing import from that module to include
 * `withAlpha`. Returns null when the helper is already imported.
 */
function buildImportFix(context, fixer) {
  const sourceCode = context.getSourceCode();
  const program = sourceCode.ast;
  const imports = program.body.filter((n) => n.type === "ImportDeclaration");

  const existing = imports.find((n) => n.source && n.source.value === HELPER_MODULE);

  if (existing) {
    const hasHelper = existing.specifiers.some(
      (s) => s.type === "ImportSpecifier" && s.imported && s.imported.name === HELPER_NAME,
    );
    if (hasHelper) return null;

    const namedSpecifiers = existing.specifiers.filter((s) => s.type === "ImportSpecifier");
    if (namedSpecifiers.length > 0) {
      // Insert after the last named specifier, inside the existing braces.
      const last = namedSpecifiers[namedSpecifiers.length - 1];
      return fixer.insertTextAfter(last, `, ${HELPER_NAME}`);
    }
    // Existing import has only default/namespace specifiers — append a named group.
    // e.g. `import x from "@/lib/color-utils"` → `import x, { withAlpha } from "@/lib/color-utils"`
    const defaultSpec = existing.specifiers.find((s) => s.type === "ImportDefaultSpecifier");
    if (defaultSpec) {
      return fixer.insertTextAfter(defaultSpec, `, { ${HELPER_NAME} }`);
    }
    // Fallback: replace the whole declaration.
    return fixer.replaceText(
      existing,
      `import { ${HELPER_NAME} } from "${HELPER_MODULE}";`,
    );
  }

  // No existing import — insert after the last import, or at the top of the file.
  const newImport = `import { ${HELPER_NAME} } from "${HELPER_MODULE}";\n`;
  if (imports.length > 0) {
    const lastImport = imports[imports.length - 1];
    return fixer.insertTextAfter(lastImport, `\n${newImport.trimEnd()}`);
  }
  return fixer.insertTextBeforeRange([0, 0], newImport);
}

function alphaToDecimalLiteral(hex) {
  // 2-char hex → 0.00–1.00 with 2 decimals, trimmed of trailing zero noise.
  const n = parseInt(hex, 16) / 255;
  // Use 2 decimal places to match the pattern used across the codebase
  // (e.g. withAlpha(color, 0.09)).
  return n.toFixed(2);
}

const rule = {
  meta: {
    type: "problem",
    fixable: "code",
    docs: {
      description:
        "Disallow appending a 2-char hex alpha suffix to a color expression. Use withAlpha() from @/lib/color-utils instead.",
    },
    schema: [],
    messages: {
      hexAlphaConcat:
        'Avoid concatenating a hex-alpha suffix ("{{alpha}}") onto a color value — this produces invalid CSS for hsl()/rgb() inputs. Use withAlpha(color, {{decimal}}) from "@/lib/color-utils" instead.',
    },
  },
  create(context) {
    const sourceCode = context.getSourceCode();

    function check(node, colorSide, alphaSide) {
      if (!isHexAlpha(alphaSide)) return;
      if (!leftLooksLikeColor(colorSide)) return;
      const alpha =
        alphaSide.type === "Literal" ? alphaSide.value : alphaSide.quasis[0].value.cooked;
      const decimal = alphaToDecimalLiteral(alpha);

      // Only autofix simple `color + "XX"` BinaryExpressions (not `+=`).
      const canFix = node.type === "BinaryExpression" && node.operator === "+";

      context.report({
        node,
        messageId: "hexAlphaConcat",
        data: { alpha, decimal },
        fix: canFix
          ? (fixer) => {
              const colorText = sourceCode.getText(colorSide);
              const fixes = [
                fixer.replaceText(node, `${HELPER_NAME}(${colorText}, ${decimal})`),
              ];
              const importFix = buildImportFix(context, fixer);
              if (importFix) fixes.push(importFix);
              return fixes;
            }
          : undefined,
      });
    }

    return {
      BinaryExpression(node) {
        if (node.operator !== "+") return;
        check(node, node.left, node.right);
        check(node, node.right, node.left);
      },
      AssignmentExpression(node) {
        if (node.operator !== "+=") return;
        check(node, node.left, node.right);
      },
    };
  },
};

export default rule;

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
 */
"use strict";

const HEX_ALPHA_RE = /^[0-9a-fA-F]{2}$/;
const COLOR_HINT_RE = /color|colour|tint|fill|stroke|bg|background|border|shade|hue|palette/i;

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
    // Literal hex like "#3b82f6" — concat is fine for hex but still discouraged
    // in mixed code paths. Flag only the obvious non-hex cases.
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

module.exports = {
  meta: {
    type: "problem",
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
    function check(node, colorSide, alphaSide) {
      if (!isHexAlpha(alphaSide)) return;
      if (!leftLooksLikeColor(colorSide)) return;
      const alpha =
        alphaSide.type === "Literal" ? alphaSide.value : alphaSide.quasis[0].value.cooked;
      const decimal = (parseInt(alpha, 16) / 255).toFixed(2);
      context.report({
        node,
        messageId: "hexAlphaConcat",
        data: { alpha, decimal },
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

/**
 * Convert an `hsl(H, S%, L%)` string to `hsla(H, S%, L%, A)`.
 *
 * Background — bug history (April 2026):
 * Several diagram components were appending hex alpha (e.g. `color + "18"`)
 * to colour strings to fake translucency. This works for hex colours
 * (`#3b82f618`) but is INVALID CSS when the source is an `hsl(...)` string —
 * `hsl(35, 85%, 50%)18` is not a parseable colour, so browsers fall back to
 * the previous valid value (often opaque) and the surface renders as a
 * fully-saturated, illegible block. Use this helper instead.
 *
 * Falls back gracefully for non-hsl input so it can be used as a drop-in.
 */
export function withAlpha(color: string, alpha: number): string {
  if (!color) return color;
  const trimmed = color.trim();

  // hsl(H, S%, L%) → hsla(H, S%, L%, A)
  const hslMatch = trimmed.match(/^hsl\(\s*([^)]+)\s*\)$/i);
  if (hslMatch) {
    return `hsla(${hslMatch[1]}, ${alpha})`;
  }

  // hsla(...) — replace the existing alpha
  const hslaMatch = trimmed.match(/^hsla\(\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*[^)]+\)$/i);
  if (hslaMatch) {
    return `hsla(${hslaMatch[1]}, ${hslaMatch[2]}, ${hslaMatch[3]}, ${alpha})`;
  }

  // rgb(R, G, B) → rgba(R, G, B, A)
  const rgbMatch = trimmed.match(/^rgb\(\s*([^)]+)\s*\)$/i);
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${alpha})`;
  }

  // #RRGGBB → #RRGGBBAA
  const hex6 = trimmed.match(/^#([0-9a-f]{6})$/i);
  if (hex6) {
    const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${hex6[1]}${a}`;
  }

  // #RGB → #RRGGBBAA
  const hex3 = trimmed.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (hex3) {
    const [, r, g, b] = hex3;
    const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${r}${r}${g}${g}${b}${b}${a}`;
  }

  // Unknown format — return unchanged so caller still sees a colour.
  return color;
}

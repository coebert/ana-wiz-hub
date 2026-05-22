/**
 * Slugify a section heading into a stable URL anchor id.
 * Used by CollapsibleSubsection (anchor target) and the Content Audit
 * dashboard (deep-link to the exact in-page section for a finding).
 */
export function sectionAnchorId(title: string): string {
  return (
    "section-" +
    String(title)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80)
  );
}

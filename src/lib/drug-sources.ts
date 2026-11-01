/** Source JSON is untrusted; a link is provenance, not clinical certification. */
export interface DisplayDrugSource {
  url: string | null;
  search: boolean;
  title: string;
  provenance: Record<string, string>[];
}

export function safeSourceUrl(value: unknown): string | null {
  if (typeof value !== "string" || /[\u0000-\u0020\u007f]/.test(value) || !/^https?:\/\//i.test(value)) return null;
  try {
    const url = new URL(value);
    return url.hostname && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export function isSourceSearch(url: string): boolean {
  const parsed = new URL(url);
  return /^(?:www\.)?medicines\.org\.uk$|^bnfc?\.nice\.org\.uk$/i.test(parsed.hostname)
    && /\/search(?:\/|$)/i.test(parsed.pathname);
}

export function normaliseDrugSources(value: unknown): DisplayDrugSource[] {
  if (!Array.isArray(value)) return [];
  const result: DisplayDrugSource[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const fields: Record<string, string> = {};
    for (const [key, field] of Object.entries(item)) {
      if (typeof field === "string" && field.trim()) fields[key] = field.trim();
      else if (key === "sections" && Array.isArray(field)) fields[key] = field.filter(x => typeof x === "string").join("; ");
    }
    const url = safeSourceUrl(fields.url);
    if (!fields.title && !url) continue;
    const search = url ? isSourceSearch(url) : false;
    const title = search ? `${new URL(url ?? "https://invalid.test").hostname.replace(/^www\./, "")} — search tool` : fields.title || "Source (title not recorded)";
    // URL only grouping never discards distinct metadata, sections, or claim scope.
    const existing = url ? result.find(source => source.url === url) : undefined;
    if (existing) {
      if (!existing.provenance.some(p => JSON.stringify(p) === JSON.stringify(fields))) existing.provenance.push(fields);
    } else result.push({ url, search, title, provenance: [fields] });
  }
  return result.sort((a, b) => Number(a.search) - Number(b.search));
}
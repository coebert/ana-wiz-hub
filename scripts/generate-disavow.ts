/**
 * Regenerate docs/seo/disavow.txt from docs/seo/flagged-domains.txt.
 *
 * Run:   bun run scripts/generate-disavow.ts
 * Then:  re-upload docs/seo/disavow.txt at
 *        https://search.google.com/search-console/disavow-links
 *
 * The input file is the source of truth — edit it to add/remove entries,
 * then re-run this script. The output file is regenerated wholesale and
 * should not be hand-edited.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const SITE = "https://anaesthesiacore.app/";
const INPUT = resolve("docs/seo/flagged-domains.txt");
const OUTPUT = resolve("docs/seo/disavow.txt");

type Entry = { value: string; kind: "domain" | "url"; comment?: string };

function parse(raw: string): { entries: Entry[]; errors: string[] } {
  const entries: Entry[] = [];
  const errors: string[] = [];
  const seen = new Set<string>();

  raw.split(/\r?\n/).forEach((line, i) => {
    const lineNo = i + 1;
    const stripped = line.replace(/^\s+/, "");
    if (!stripped || stripped.startsWith("#")) return;

    // Allow trailing "  # comment" on entry lines.
    const m = stripped.match(/^(\S+)(?:\s+#\s*(.*))?$/);
    if (!m) {
      errors.push(`Line ${lineNo}: cannot parse "${line}"`);
      return;
    }
    const [, token, comment] = m;

    let entry: Entry;
    if (token.startsWith("domain:")) {
      const host = token.slice(7).trim().toLowerCase();
      if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(host)) {
        errors.push(`Line ${lineNo}: invalid domain "${host}"`);
        return;
      }
      entry = { value: `domain:${host}`, kind: "domain", comment };
    } else if (/^https?:\/\//i.test(token)) {
      try {
        new URL(token);
      } catch {
        errors.push(`Line ${lineNo}: invalid URL "${token}"`);
        return;
      }
      entry = { value: token, kind: "url", comment };
    } else {
      errors.push(
        `Line ${lineNo}: expected "domain:host" or "https://…", got "${token}"`,
      );
      return;
    }

    if (seen.has(entry.value)) return; // dedupe silently
    seen.add(entry.value);
    entries.push(entry);
  });

  // Sort: domains before URLs, alphabetical within each group.
  entries.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === "domain" ? -1 : 1;
    return a.value.localeCompare(b.value);
  });

  return { entries, errors };
}

function render(entries: Entry[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const domains = entries.filter((e) => e.kind === "domain");
  const urls = entries.filter((e) => e.kind === "url");

  const lines: string[] = [
    `# Disavow file for ${SITE}`,
    `#`,
    `# Upload at: https://search.google.com/search-console/disavow-links`,
    `# Uploading REPLACES the previous list — always upload the full file.`,
    `#`,
    `# GENERATED FILE — do not hand-edit.`,
    `# Source: docs/seo/flagged-domains.txt`,
    `# Regenerate: bun run scripts/generate-disavow.ts`,
    `#`,
    `# Last generated: ${today}`,
    `# Entries: ${entries.length} (${domains.length} domains, ${urls.length} URLs)`,
    ``,
  ];

  if (domains.length) {
    lines.push(`# --- Disavowed domains (covers all subdomains + paths) ---`);
    for (const e of domains) {
      lines.push(e.comment ? `${e.value}  # ${e.comment}` : e.value);
    }
    lines.push(``);
  }
  if (urls.length) {
    lines.push(`# --- Disavowed individual URLs ---`);
    for (const e of urls) {
      lines.push(e.comment ? `${e.value}  # ${e.comment}` : e.value);
    }
    lines.push(``);
  }

  return lines.join("\n");
}

const raw = readFileSync(INPUT, "utf8");
const { entries, errors } = parse(raw);

if (errors.length) {
  console.error(`Errors in ${INPUT}:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}

mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, render(entries));
console.log(
  `Wrote ${OUTPUT} — ${entries.length} entries (${entries.filter((e) => e.kind === "domain").length} domains, ${entries.filter((e) => e.kind === "url").length} URLs)`,
);

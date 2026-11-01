import fs from "node:fs";
import { pathToFileURL } from "node:url";

/** Inert SQL generator: execution requires the approved database write tool. */
export function buildSourceRepair(records) {
  const quote = value => `'${String(value).replaceAll("'", "''")}'`;
  return records.map(record => {
    if (!record.id || !record.slug || !Array.isArray(record.before) || !Array.isArray(record.append) || !record.append.length) throw new Error("Incomplete exact-source guard");
    const append = record.append.filter(source => !record.before.some(old => JSON.stringify(old) === JSON.stringify(source)));
    if (!append.length) return `-- ${record.slug}: exact metadata already present`;
    return `UPDATE public.drugs SET sources = sources || ${quote(JSON.stringify(append))}::jsonb WHERE id = ${quote(record.id)}::uuid AND slug = ${quote(record.slug)} AND sources = ${quote(JSON.stringify(record.before))}::jsonb RETURNING id, slug, sources;`;
  }).join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2];
  if (!file) throw new Error("Supply a reviewed manifest; no live writes are performed by this script");
  const manifest = JSON.parse(fs.readFileSync(file, "utf8"));
  process.stdout.write(buildSourceRepair(manifest.repairs));
}
/**
 * Cutover inventory for the AnaesthesiaCore → Base44 migration.
 *
 * Derived from the repository itself (SQL migrations, function directories,
 * Capacitor configuration) so the manifest cannot drift from the code while the
 * production runtime stays on Lovable Cloud. It deliberately contains no
 * credentials, e-mail addresses or other personal data: it names what must move
 * and how identity is joined, never the values themselves.
 *
 * Run: `npm run base44:manifest`
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export type PersonalDataCategory =
  | "account"
  | "progress"
  | "private-correspondence"
  | "contributor-contact"
  | "payment"
  | "visitor"
  | "public-user-content";

export type ManifestTable = {
  name: string;
  personal: PersonalDataCategory | null;
};

export type ManifestFunction = {
  name: string;
  ai: boolean;
};

export type MigrationManifest = {
  source: string;
  identity: {
    source: string;
    target: string;
    joinKey: "email";
    requiresExplicitIdMap: true;
    note: string;
  };
  tables: ManifestTable[];
  storageBuckets: { name: string; public: boolean }[];
  scheduledJobs: string[];
  edgeFunctions: ManifestFunction[];
  base44Functions: string[];
  native: { appId: string | null; webDir: string | null };
};

const SQL_DIRS = ["supabase/migrations", "drizzle/migrations"];
const EDGE_DIR = "supabase/functions";
const BASE44_DIR = "base44/functions";
const NON_FUNCTION_EDGE_DIRS = new Set(["_shared"]);

/**
 * Reviewed classification of tables that carry account, visitor or contact
 * data. Every entry must exist in the schema; `null` (in the manifest) means
 * the table holds clinical or operational content only.
 */
const PERSONAL_TABLES: Record<string, PersonalDataCategory> = {
  user_roles: "account",
  user_topic_progress: "progress",
  user_subsection_progress: "progress",
  user_study_time: "progress",
  user_recent_topics: "progress",
  viva_attempts: "progress",
  support_tickets: "private-correspondence",
  support_messages: "private-correspondence",
  inaccuracy_reports: "contributor-contact",
  donations: "payment",
  donation_clicks: "payment",
  app_visits: "visitor",
  visitor_survey_responses: "visitor",
  reviews: "public-user-content",
  topic_discussions: "public-user-content",
  discussion_flags: "public-user-content",
};

const AI_MARKERS = /LOVABLE_API_KEY|base44-ai|ai-gateway|callBase44Relay|kb-chat|generate-podcast/;

function sqlFiles(root: string): string[] {
  const files: string[] = [];
  for (const dir of SQL_DIRS) {
    const absolute = join(root, dir);
    if (!existsSync(absolute)) continue;
    for (const entry of readdirSync(absolute)) {
      const path = join(absolute, entry);
      if (entry.endsWith(".sql") && statSync(path).isFile()) files.push(path);
    }
  }
  return files;
}

function collect(sql: string, pattern: RegExp, group = 1): string[] {
  return [...sql.matchAll(pattern)].map((match) => match[group]);
}

function directories(root: string, dir: string): string[] {
  const absolute = join(root, dir);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute)
    .filter((entry) => statSync(join(absolute, entry)).isDirectory())
    .sort();
}

function usesAi(root: string, name: string): boolean {
  const dir = join(root, EDGE_DIR, name);
  return readdirSync(dir)
    .filter((entry) => entry.endsWith(".ts"))
    .some((entry) => AI_MARKERS.test(readFileSync(join(dir, entry), "utf8")));
}

function readNativeConfig(root: string): MigrationManifest["native"] {
  const path = join(root, "scripts", "native-config.ts");
  if (!existsSync(path)) return { appId: null, webDir: null };
  const source = readFileSync(path, "utf8");
  const appId = /appId:\s*'([^']+)'/.exec(source)?.[1] ?? null;
  const webDir = /webDir:\s*'([^']+)'/.exec(source)?.[1] ?? null;
  return { appId, webDir };
}

export function buildMigrationManifest(root: string = process.cwd()): MigrationManifest {
  const sql = sqlFiles(root)
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");

  const tableNames = [
    ...new Set(collect(sql, /CREATE TABLE (?:IF NOT EXISTS )?public\.([a-z_]+)/g)),
  ].sort();
  const tables = tableNames.map((name) => ({
    name,
    personal: PERSONAL_TABLES[name] ?? null,
  }));

  // Bucket declarations only — a bare VALUES(...) elsewhere (seeds, fixtures)
  // must never be mistaken for storage configuration.
  const storageBuckets = [
    ...new Set([...sql.matchAll(/INSERT INTO storage\.buckets[\s\S]*?;/gi)].map((m) => m[0])),
  ]
    .flatMap((statement) =>
      [
        ...statement.matchAll(/\(\s*'([a-z0-9_-]+)'\s*,\s*'[a-z0-9_-]+'\s*,\s*(true|false)\s*\)/gi),
      ].map((match) => ({ name: match[1], public: match[2].toLowerCase() === "true" }))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const scheduledJobs = [...new Set(collect(sql, /cron\.schedule\(\s*'([a-z0-9_-]+)'/g))].sort();

  const edgeFunctions = directories(root, EDGE_DIR)
    .filter((name) => !NON_FUNCTION_EDGE_DIRS.has(name))
    .filter((name) => existsSync(join(root, EDGE_DIR, name, "index.ts")))
    .map((name) => ({ name, ai: usesAi(root, name) }));

  const base44Functions = directories(root, BASE44_DIR)
    .filter((name) => existsSync(join(root, BASE44_DIR, name, "entry.ts")))
    .sort();

  return {
    source: "coebert/ana-wiz-hub",
    identity: {
      source: "auth.users",
      target: "Base44 user",
      joinKey: "email",
      requiresExplicitIdMap: true,
      note: "Base44 user ids are not Supabase auth UUIDs. Every migrated row must resolve through an explicit, reviewed id map; e-mail is a join hint only and is never proof of identity.",
    },
    tables,
    storageBuckets,
    scheduledJobs,
    edgeFunctions,
    base44Functions,
    native: readNativeConfig(root),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.stdout.write(`${JSON.stringify(buildMigrationManifest(), null, 2)}\n`);
}

/**
 * Build an auditable learner-content coverage ledger from the app's own
 * authoritative runtime sources.
 *
 * This is an inventory, not a clinical sign-off. Every topic starts as
 * "inventoried / not clinically reviewed"; only topics named in
 * REVIEWED_CORRECTIONS carry a source-checked correction record.
 *
 * Run: npx tsx scripts/build-content-coverage-ledger.ts
 * Output:
 *   docs/audit-2026-11-19/coverage-ledger.json
 *   docs/audit-2026-11-19/coverage-ledger.md
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync, existsSync } from "fs";
import { resolve, relative } from "path";
import { allTopics, sectionMeta, type Section } from "../src/data/curriculum";
import { topicReferences } from "../src/data/references";
import { seeAlsoMap } from "../src/data/seeAlso";
import * as quizzes from "../src/data/quizzes";
import { caseBanks } from "../src/data/cases";
import { operations } from "../src/data/operativeSteps";
import { perioperativeCaseIndex } from "../src/data/perioperativeCaseIndex";
import { buildRouteMap, extractFaqsByPath } from "./extract-faqs";

const ROOT = resolve(import.meta.dirname ?? __dirname, "..");
const OUT_DIR = resolve(ROOT, "docs/audit-2026-11-19");

/** Topics with a source-checked correction in this audit (see changes.json). */
const REVIEWED_CORRECTIONS: Record<string, string[]> = {
  capnography: ["CAP-01", "CAP-02"],
  "clinical-incidents": ["LAST-01", "LAST-02", "LAST-03"],
  "local-anaesthetics": ["LAST-01", "LAST-02"],
  "regional-anaesthesia": ["LAST-01", "LAST-02"],
  "day-surgery": ["FAST-01"],
  "paediatric-anaesthesia": ["FAST-01", "NEO-01"],
  "paediatric-icu": ["NEO-01"],
};

const slugToCamel = (id: string) =>
  id
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");

function quizCount(topicId: string): number {
  const bag = quizzes as unknown as Record<string, unknown>;
  const camel = slugToCamel(topicId);
  const candidates = [
    `${camel}Quiz`,
    `${camel.replace(/Anaesthetics$/, "Anaesthetic")}Quiz`,
    `${camel}Questions`,
    `${camel.replace(/Anaesthetics$/, "Anaesthetic")}Questions`,
  ];
  for (const name of candidates) {
    const value = bag[name];
    if (Array.isArray(value)) return value.length;
  }
  return 0;
}

function walk(dir: string, filter: (p: string) => boolean): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

const rel = (p: string) => relative(ROOT, p).replaceAll("\\", "/");

// ------------------------------------------------------------------ topics

const topicFiles = walk(resolve(ROOT, "src/pages/topics"), (p) => p.endsWith(".tsx"));
const routeMap = buildRouteMap().pathToFile;
const topicFileById = new Map<string, string>();
for (const topic of allTopics) {
  const route = `${sectionMeta[topic.section].path}/${topic.id}`;
  const file = routeMap[route];
  if (file) topicFileById.set(topic.id, rel(file));
}

const teachingFiles = walk(
  resolve(ROOT, "src/components/topic"),
  (p) => /Teaching\.tsx$/.test(p),
).map(rel);

function importsFor(file: string): string[] {
  const src = readFileSync(file, "utf8");
  return [...src.matchAll(/from\s+["']@\/components\/topic\/([A-Za-z0-9]+Teaching)["']/g)].map(
    (m) => `src/components/topic/${m[1]}.tsx`,
  );
}

const topicTeaching = new Map<string, string[]>();
for (const [id, file] of topicFileById) {
  const imports = importsFor(resolve(ROOT, file));
  if (imports.length) topicTeaching.set(id, imports);
}

function curriculumCodesFor(file?: string): string[] {
  if (!file) return [];
  const src = readFileSync(resolve(ROOT, file), "utf8");
  return [...src.matchAll(/"((?:[A-Z]{2}_BK_\d{2})|FFICM [0-9.]+|RCoA [A-Za-z ]+)"/g)].map(
    (m) => m[1],
  );
}

const faqsByPath = (() => {
  try {
    return extractFaqsByPath();
  } catch {
    return {} as Record<string, [string, string][]>;
  }
})();

const topics = allTopics.map((topic) => {
  const file = topicFileById.get(topic.id);
  const refs = topicReferences[topic.id] ?? [];
  const refsWithLink = refs.filter((r) => r.url || r.doi || r.pmid);
  const faqs = file
    ? faqsByPath[`${sectionMeta[topic.section].path}/${topic.id}`] ??
      faqsByPath[`/${topic.section}/${topic.id}`] ??
      []
    : [];
  return {
    id: topic.id,
    title: topic.title,
    section: topic.section,
    sectionLabel: sectionMeta[topic.section].label,
    path: `${sectionMeta[topic.section].path}/${topic.id}`,
    examTags: topic.examTags,
    available: topic.available,
    sourceFile: file ?? null,
    references: refs.length,
    referencesWithLink: refsWithLink.length,
    referencesWithoutLink: refs.length - refsWithLink.length,
    referenceLabels: refs.map((r) => r.label),
    quizQuestions: quizCount(topic.id),
    faqPairs: faqs.length,
    seeAlso: (seeAlsoMap[topic.id] ?? []).length,
    teachingModules: topicTeaching.get(topic.id) ?? [],
    curriculumCodes: [...new Set(curriculumCodesFor(file))],
    reviewStatus:
      topic.id in REVIEWED_CORRECTIONS
        ? "source-checked correction applied (not consultant sign-off)"
        : "inventoried, not clinically reviewed",
    correctionIds: REVIEWED_CORRECTIONS[topic.id] ?? [],
    gaps: [
      refs.length === 0 ? "no references" : null,
      refs.length > 0 && refsWithLink.length === 0 ? "no reference has URL/DOI/PMID" : null,
      quizCount(topic.id) === 0 ? "no quiz questions" : null,
      faqs.length === 0 ? "no FAQ pairs" : null,
      !file ? "no topic page file matched" : null,
      (topicTeaching.get(topic.id) ?? []).length === 0 ? "no Teaching module import" : null,
      curriculumCodesFor(file).length === 0 ? "no explicit curriculum code in page" : null,
    ].filter(Boolean) as string[],
  };
});

// ------------------------------------------------------------------ cases

const bankCaseCount = caseBanks.reduce((sum, bank) => sum + bank.cases.length, 0);
const caseTopicMap = new Map<string, number>();
for (const bank of caseBanks) {
  for (const item of bank.cases) {
    for (const id of item.topicIds ?? []) {
      caseTopicMap.set(id, (caseTopicMap.get(id) ?? 0) + 1);
    }
  }
}

// ------------------------------------------------------------------ diagrams

const diagramFiles = walk(resolve(ROOT, "src/components/diagrams"), (p) =>
  p.endsWith(".tsx"),
).map(rel);
const registryFile = resolve(ROOT, "src/components/diagrams/__snapshot-registry.generated.ts");
const diagramRegistryEntries = existsSync(registryFile)
  ? (readFileSync(registryFile, "utf8").match(/lazy\(\(\) => import\(/g) ?? []).length
  : 0;

// ------------------------------------------------------------------ calculators

const calculatorFiles = walk(resolve(ROOT, "src/pages/tools"), (p) => p.endsWith(".tsx")).map(rel);

// ------------------------------------------------------------------ derived indices

const searchIndexPath = resolve(ROOT, "src/data/searchIndex.generated.json");
const searchIndex = existsSync(searchIndexPath)
  ? JSON.parse(readFileSync(searchIndexPath, "utf8"))
  : { topics: [] };
const vivaDeckFiles = existsSync(resolve(ROOT, "public/viva-deck"))
  ? readdirSync(resolve(ROOT, "public/viva-deck")).filter((f) => f.endsWith(".json")).length
  : 0;

// ------------------------------------------------------------------ database-served content

const typesSrc = readFileSync(resolve(ROOT, "src/integrations/supabase/types.ts"), "utf8");
const tableNames = [...typesSrc.matchAll(/^      ([a-z_]+): \{/gm)].map((m) => m[1]);
const CONTENT_TABLES = new Set([
  "content_overrides",
  "topic_references",
  "viva_model_answers",
  "ask_qa_library",
  "podcasts",
  "drugs",
  "home_announcement",
  "public_errata",
  "topic_discussions",
  "inaccuracy_reports",
  "kb_chunks",
]);
const dbServed = tableNames
  .filter((t) => CONTENT_TABLES.has(t))
  .map((table) => ({
    table,
    authoredContent:
      table !== "topic_discussions" && table !== "inaccuracy_reports" && table !== "kb_chunks",
    note:
      table === "content_overrides"
        ? "Admin edits rendered on top of built-in topic content (status=live)."
        : table === "topic_references"
          ? "Cached external reference lists rendered on topic pages."
          : table === "viva_model_answers"
            ? "Cached viva model answers (generated responses)."
            : table === "ask_qa_library"
              ? "Shared Ask AI question/answer library."
              : table === "podcasts"
                ? "Podcast scripts/audio records; scripts and audio must be corrected together."
                : table === "drugs"
                  ? "Drug reference records."
                  : table === "home_announcement"
                    ? "Public home banner."
                    : table === "public_errata"
                      ? "Public errata notices."
                      : table === "kb_chunks"
                        ? "Ask AI retrieval chunks derived from authored content."
                        : table === "topic_discussions"
                          ? "Learner-generated discussion (private learner data; not audited or exported)."
                          : "Learner-reported inaccuracy reports (private learner data; not audited or exported).",
  }));

// ------------------------------------------------------------------ curriculum matrix

const bySection = Object.fromEntries(
  (Object.keys(sectionMeta) as Section[]).map((section) => [
    section,
    {
      label: sectionMeta[section].label,
      topics: topics.filter((t) => t.section === section).length,
      withExplicitCode: topics.filter(
        (t) => t.section === section && t.curriculumCodes.length > 0,
      ).length,
    },
  ]),
);
const byExam = {
  primary: topics.filter((t) => t.examTags.includes("primary")).length,
  final: topics.filter((t) => t.examTags.includes("final")).length,
  fficm: topics.filter((t) => t.examTags.includes("fficm")).length,
  edic: topics.filter((t) => t.examTags.includes("edic")).length,
};

const ledger = {
  generated_at: new Date().toISOString(),
  audit: "learner-facing AnaesthesiaCore content coverage",
  disclaimer:
    "Inventory and source-checked corrections only. Not clinical sign-off, not consultant review, and not a release of held content.",
  counts: {
    topics: topics.length,
    sections: Object.keys(sectionMeta).length,
    topicPageFiles: topicFiles.length,
    teachingModules: teachingFiles.length,
    topicsWithTeachingModule: topicTeaching.size,
    referenceRecords: Object.values(topicReferences).reduce((n, list) => n + list.length, 0),
    quizQuestions: Object.values(quizzes as unknown as Record<string, unknown>).reduce(
      (n, value) => n + (Array.isArray(value) ? value.length : 0),
      0,
    ),
    caseBankCases: bankCaseCount,
    perioperativeCases: perioperativeCaseIndex.length,
    operations: operations.length,
    diagramFiles: diagramFiles.length,
    diagramRegistryEntries,
    calculatorFiles: calculatorFiles.length,
    searchIndexTopics: Array.isArray(searchIndex.topics) ? searchIndex.topics.length : 0,
    vivaDeckFiles,
    databaseContentTables: dbServed.length,
  },
  curriculum: { bySection, byExam },
  topics,
  surfaces: {
    teachingModules: teachingFiles,
    calculators: calculatorFiles,
    operations: {
      total: operations.length,
      bySpecialty: Object.fromEntries(
        [...new Set(operations.map((o) => o.specialty))].map((specialty) => [
          specialty,
          operations.filter((o) => o.specialty === specialty).length,
        ]),
      ),
      withDiagram: operations.filter((o) => o.diagram).length,
    },
    cases: {
      bankCases: bankCaseCount,
      perioperativeCases: perioperativeCaseIndex.length,
      topicsWithBankCase: caseTopicMap.size,
    },
    diagrams: { files: diagramFiles.length, registryEntries: diagramRegistryEntries },
    derivedIndices: {
      searchIndexTopics: Array.isArray(searchIndex.topics) ? searchIndex.topics.length : 0,
      vivaDeckFiles,
    },
    database: dbServed,
  },
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(resolve(OUT_DIR, "coverage-ledger.json"), JSON.stringify(ledger, null, 2) + "\n");

// ------------------------------------------------------------------ markdown

const gapCounts = new Map<string, number>();
for (const t of topics) for (const g of t.gaps) gapCounts.set(g, (gapCounts.get(g) ?? 0) + 1);

const md: string[] = [];
md.push("# AnaesthesiaCore learner-content coverage ledger");
md.push("");
md.push(`Generated: ${ledger.generated_at}`);
md.push("");
md.push(`> ${ledger.disclaimer}`);
md.push("");
md.push("## What this is");
md.push("");
md.push(
  "A deterministic inventory built from the app's own runtime sources: `src/data/curriculum.ts`, " +
    "`references.ts`, `seeAlso.ts`, `quizzes.ts`, the case banks, `operativeSteps.ts`, the diagram tree, " +
    "the calculator pages, the FAQ extractor and the Supabase type surface. It records what exists and " +
    "what is missing. It does not certify accuracy.",
);
md.push("");
md.push("## Counts");
md.push("");
md.push("| Surface | Count |");
md.push("|---|---:|");
for (const [key, value] of Object.entries(ledger.counts)) {
  md.push(`| ${key} | ${value} |`);
}
md.push("");
md.push("## Curriculum coverage");
md.push("");
md.push("| Section | Topics | Topics with an explicit curriculum code in the page |");
md.push("|---|---:|---:|");
for (const s of Object.values(bySection)) {
  md.push(`| ${s.label} | ${s.topics} | ${s.withExplicitCode} |`);
}
md.push("");
md.push(
  `Exam tags: primary ${byExam.primary}, final ${byExam.final}, FFICM ${byExam.fficm}, EDIC ${byExam.edic}.`,
);
md.push("");
md.push("## Explicit gaps");
md.push("");
md.push("| Gap | Topics affected |");
md.push("|---|---:|");
for (const [gap, count] of [...gapCounts.entries()].sort((a, b) => b[1] - a[1])) {
  md.push(`| ${gap} | ${count} |`);
}
md.push("");
md.push("## Database-served content");
md.push("");
md.push("| Table | Authored content | Note |");
md.push("|---|---|---|");
for (const row of dbServed) {
  md.push(`| ${row.table} | ${row.authoredContent ? "yes" : "no (learner-generated)"} | ${row.note} |`);
}
md.push("");
md.push("## Per-topic ledger");
md.push("");
md.push(
  "| Topic | Section | Refs | Refs with link | Quiz | FAQs | Teaching modules | Curriculum codes | Review status | Gaps |",
);
md.push("|---|---|---:|---:|---:|---:|---:|---|---|---|");
for (const t of topics) {
  md.push(
    `| ${t.title} (\`${t.id}\`) | ${t.sectionLabel} | ${t.references} | ${t.referencesWithLink} | ` +
      `${t.quizQuestions} | ${t.faqPairs} | ${t.teachingModules.length} | ${t.curriculumCodes.length} | ` +
      `${t.reviewStatus} | ${t.gaps.length ? t.gaps.join("; ") : "—"} |`,
  );
}
md.push("");
md.push("## Limits");
md.push("");
md.push(
  "- Reference counts are declared records, not verified bibliographic matches. Run `npm run check:references` " +
    "for DOI/PMID resolution and see `source-verification.json` for the records independently checked in this audit.",
);
md.push(
  "- FAQ counts come from the repository's existing extractor; a topic whose FAQ literal does not follow the " +
    "documented convention is reported as zero rather than guessed.",
);
md.push(
  "- Database tables are listed from the generated Supabase types; the sandbox has no service-role access to the " +
    "separate production database, so live row counts and live `content_overrides` are not read here.",
);
md.push(
  "- No learner data, private discussion, viva attempts, study time or support messages are included.",
);
md.push("");

writeFileSync(resolve(OUT_DIR, "coverage-ledger.md"), md.join("\n"));
console.log(
  `Wrote ${rel(resolve(OUT_DIR, "coverage-ledger.json"))} and ${rel(resolve(OUT_DIR, "coverage-ledger.md"))}`,
);
console.log(`Topics: ${topics.length}; teaching modules: ${teachingFiles.length}; gaps recorded: ${topics.reduce((n, t) => n + t.gaps.length, 0)}`);

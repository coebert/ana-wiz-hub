/** Build a data-only inventory; never import the diagram renderers into the directory. */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const read = (p: string) => fs.readFileSync(path.join(root, p), "utf8");
const parse = (p: string) => ts.createSourceFile(p, read(p), ts.ScriptTarget.Latest, true, p.endsWith("tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
type Value = string | number | boolean | null | Value[] | { [key: string]: Value };
type Source = { label: string; detail?: string; url?: string; basis: string };
type Entry = { id: string; title: string; group: string; kind: string; sources: Source[]; credit: string; uncertainty: string[]; topicLinks: { title: string; path: string }[]; sourceFile: string; status: string };
const walk = (n: ts.Node, fn: (n: ts.Node) => void) => { fn(n); ts.forEachChild(n, c => walk(c, fn)); };
function context(file: ts.SourceFile) {
  const vars = new Map<string, ts.Expression>();
  walk(file, n => { if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer) vars.set(n.name.text, n.initializer); });
  function value(n: ts.Node | undefined, seen = new Set<string>()): Value {
    if (!n) return null;
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
    if (ts.isNumericLiteral(n)) return Number(n.text);
    if (ts.isParenthesizedExpression(n) || ts.isAsExpression(n) || ts.isSatisfiesExpression(n)) return value(n.expression, seen);
    if (ts.isIdentifier(n) && !seen.has(n.text)) return value(vars.get(n.text), new Set([...seen, n.text]));
    if (ts.isArrayLiteralExpression(n)) return n.elements.map(e => value(e, seen));
    if (ts.isObjectLiteralExpression(n)) {
      const result: Record<string, Value> = {};
      n.properties.forEach(p => { if (ts.isPropertyAssignment(p)) result[p.name.getText(file).replace(/^['"]|['"]$/g, "")] = value(p.initializer, seen); });
      return result;
    }
    return null;
  }
  return { value, vars };
}
const object = (v: Value): Record<string, Value> => v && !Array.isArray(v) && typeof v === "object" ? v : {};
const text = (v: Value | undefined) => typeof v === "string" ? v : "";
const refsFile = parse("src/data/references.ts");
const refsContext = context(refsFile);
const topicReferences = object(refsContext.value(refsContext.vars.get("topicReferences")));
const routes = [...read("src/routes/topicRoutes.ts").split("export const TOPIC_REDIRECTS")[0].matchAll(/\["([^"]+)",\s*"([^"]+)"\]/g)].filter(m => fs.existsSync(`src/pages/topics/${m[2]}.tsx`)).map(m => ({ path: m[1], module: m[2], code: read(`src/pages/topics/${m[2]}.tsx`) }));
function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(`${dir}/${e.name}`) : [`${dir}/${e.name}`]);
}
const allComponents = files("src/components").filter(p => /\.tsx?$/.test(p) && !/(__|\.test\.)/.test(p));
const componentCode = new Map(allComponents.map(p => [p, read(p)]));
function links(name: string) {
  const names = new Set([name]);
  for (let round = 0; round < 4; round++) {
    for (const [p, code] of componentCode) {
      if ([...names].some(n => code.includes(`/${n}"`) || code.includes(`/${n}'`))) names.add(path.basename(p).replace(/\.tsx?$/, ""));
    }
  }
  return routes.filter(r => [...names].some(n => r.code.includes(`/${n}"`) || r.code.includes(`/${n}'`))).map(r => ({ path: r.path, title: r.path.split("/").pop()?.replace(/-/g, " ") ?? r.module }));
}
const human = (s: string) => s.replace(/Diagram$|Atlas$|Plate$/g, "").replace(/([a-z])([A-Z])/g, "$1 $2");
function cited(topic: string, label: string): Source {
  const refs = topicReferences[topic];
  const ref = Array.isArray(refs) ? refs.map(object).find(r => r.label === label) : undefined;
  return { label, detail: text(ref?.citation) || "Citation label could not be resolved in the topic references.", ...(text(ref?.url) ? { url: text(ref?.url) } : {}), basis: "Landmark citation" };
}
const known: Record<string, string[]> = {
  DiaphragmDiagram: ["Aperture laterality and phrenic courses were corrected; the schematic remains simplified and is not a validated anatomical model."],
  AirwayInnervationDiagram: ["Anterior-tongue and oropharyngeal sensory polygons overlap; a sourced redraw is still needed."],
  CardiacAnatomyDiagram: ["Procedural 3D fallback is simplified and is not a validated anatomical mesh; optional GLB models are absent locally."],
  InteractiveDermatomeMap: ["Dermatome boundaries vary between reference charts; this map is schematic, not a definitive boundary map."],
  DermatomeMapDiagram: ["Dermatome boundaries vary between reference charts."],
  DermatomeMyotomeDiagram: ["Dermatome boundaries vary between reference charts."],
  BronchoscopicViewDiagram: ["Clock-face orientation depends on scope rotation and viewing convention."],
};
const entries: Entry[] = [];
function add(e: Omit<Entry, "status">) {
  const sources = e.sources.filter((s, i, a) => a.findIndex(t => t.label === s.label && t.url === s.url) === i);
  const uncertainty = [...e.uncertainty];
  if (!sources.length) uncertainty.push("No diagram-specific bibliographic source is recorded. Topic reading lists do not establish artwork provenance.");
  if (sources.some(s => s.detail?.includes("could not be resolved"))) uncertainty.push("One or more citation labels require reconciliation with the topic reference list.");
  entries.push({ ...e, sources, uncertainty, status: uncertainty.length ? "needs-review" : "cited" });
}
import { anatomyDiagramCitations } from "../src/data/anatomyDiagramCitations";
const excluded = new Set(["BrainPlatesViewer", "CorPictumFolio"]);
const clinicalNames = new Set(["AirwayInnervationDiagram", "CaudalSurfaceAnatomyDiagram", "CaudalBlockDiagram", "DermatomeMapDiagram", "NerveDermatomeOverlayDiagram", "NephronDiagram", "CorticalJuxtamedullaryDiagram", "LaryngoscopeBladesDiagram", "SpinalCordStimulatorDiagram"]);
const componentFiles = allComponents.filter(p => (p.includes("/diagrams/anatomy/") && !excluded.has(path.basename(p, ".tsx"))) || /\/shared\/Brain(?:Axial|Coronal|Anatomy|Medial)Diagram\.tsx$/.test(p) || clinicalNames.has(path.basename(p, ".tsx")));
for (const p of componentFiles) {
  const file = parse(p), ctx = context(file), name = path.basename(p, ".tsx");
  const sources: Source[] = [], credits: string[] = [];
  let title = human(name);
  walk(file, n => {
    if (ts.isJsxAttribute(n) && n.initializer) {
      const v = ctx.value(ts.isJsxExpression(n.initializer) ? n.initializer.expression : n.initializer);
      if (n.name.getText() === "references" && Array.isArray(v)) v.map(object).forEach(r => { if (text(r.label)) sources.push({ label: text(r.label), detail: text(r.detail), url: text(r.url) || undefined, basis: "Diagram reference" }); });
      if (n.name.getText() === "imageCredit" && text(v)) credits.push(text(v));
      if (n.name.getText() === "title" && /DiagramFigure/.test(n.parent.parent.getText().slice(0, 30)) && text(v)) title = text(v);
    }
  });
  for (const c of anatomyDiagramCitations[name] ?? []) sources.push({ label: c.label, detail: c.detail, url: c.url, basis: /Gray's/.test(c.label) ? "Reference figure used to check the schematic (public domain)" : "Reference paper used to check the schematic" });
  // Comments are labelled as notes, not promoted to bibliographic/image provenance.
  if (!sources.length) {
    const comments = read(p).match(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/g) ?? [];
    const notes = comments.filter(c => /Gray['’]s|Netter|Last['’]s|Radiopaedia|NYSORA|Standring|Moore.*Anatom|source:|sources:/i.test(c)).map(c => c.replace(/^\/\*|\*\/$|^\/\//g, "").replace(/\n\s*\* ?/g, " ").trim());
    notes.forEach(note => sources.push({ label: "Source note in diagram", detail: note, basis: "Source comment — incomplete bibliographic record" }));
  }
  const uncertainty = [...(known[name] ?? [])];
  if (sources.some(s => s.basis.startsWith("Source comment"))) uncertainty.push("Source is recorded only in a comment; an exact edition, passage or figure match is not established.");
  if (credits.some(c => /generated|Gemini/i.test(c))) uncertainty.push("Generated illustration: cited textbooks describe anatomy but do not certify the image pixels or every leader endpoint.");
  add({ id: name, title, group: "Anatomy & applied diagrams", kind: name === "CardiacAnatomyDiagram" ? "3D schematic" : credits.length ? "Illustrated plate" : "Labelled schematic", sources, credit: credits.join(" ") || "Custom teaching schematic; original image/geometry provenance not separately recorded.", uncertainty, topicLinks: links(name), sourceFile: p });
}
for (const p of allComponents.filter(p => p.includes("/topic/") && /Atlas\.tsx$/.test(p) && !p.endsWith("/AnatomyAtlas.tsx"))) {
  const file = parse(p), ctx = context(file), name = path.basename(p, ".tsx");
  let topic = text(ctx.value(ctx.vars.get("T"))) || text(ctx.value(ctx.vars.get("TOPIC")));
  walk(file, n => { if (ts.isJsxAttribute(n) && n.name.getText() === "topicId" && n.initializer) topic = text(ctx.value(ts.isJsxExpression(n.initializer) ? n.initializer.expression : n.initializer)) || topic; });
  walk(file, n => {
    if (!ts.isObjectLiteralExpression(n)) return;
    const plate = object(ctx.value(n));
    if (!text(plate.title) || !Array.isArray(plate.landmarks)) return;
    const uncertainty: string[] = [];
    if (/Femoral|Aortocaval/i.test(text(plate.title)) && !text(plate.orientation)) uncertainty.push("Patient-side/view orientation requires an explicit declaration; page orientation alone is not proof of laterality.");
    if (/Adamkiewicz/i.test(JSON.stringify(plate))) uncertainty.push("Adamkiewicz origin is variable and this depiction is simplified.");
    add({ id: `${name}-${n.pos}`, title: text(plate.title), group: human(name), kind: "Surgical atlas schematic", sources: plate.landmarks.map(object).filter(l => text(l.ref)).map(l => ({ ...cited(topic, text(l.ref)), basis: `Landmark: ${text(l.text)}` })), credit: "Custom labelled line diagram; simplified and not to scale.", uncertainty, topicLinks: links(name).map(l => ({ ...l, path: `${l.path}#anatomy-atlas` })), sourceFile: p });
  });
}
const folioPath = "src/components/diagrams/anatomyFolios.ts", folioFile = parse(folioPath), folioCtx = context(folioFile);
for (const [name, node] of folioCtx.vars) {
  const folio = object(folioCtx.value(node));
  if (!Array.isArray(folio.plates)) continue;
  for (const v of folio.plates) {
    const plate = object(v);
    const credit = text(plate.imageCredit), srcUrl = text(plate.imageSourceUrl);
    add({ id: `${name}-${text(plate.id)}`, title: text(plate.title), group: text(folio.atlasTitle), kind: credit ? "Sourced public-domain plate" : "Painted atlas plate", sources: credit ? [{ label: "Gray's Anatomy (1918)", detail: credit, ...(srcUrl ? { url: srcUrl } : {}), basis: "Image source and licence" }] : [], credit: credit || "Local painted artwork; original image source and licence provenance were not established in the anatomy audit.", uncertainty: credit ? [] : [text(plate.auditWarning), "Printed labels and broad hotspot polygons are not fully verified against an independently sourced atlas."].filter(Boolean), topicLinks: routes.filter(r => r.code.includes(name)).map(r => ({ title: r.path.split("/").pop()?.replace(/-/g, " ") ?? name, path: r.path })), sourceFile: folioPath });
  }
}
entries.sort((a, b) => a.group.localeCompare(b.group) || a.title.localeCompare(b.title));
fs.writeFileSync("src/data/anatomyDiagramSources.generated.json", JSON.stringify({ entries }, null, 2) + "\n");
console.log(`Anatomy source inventory: ${entries.length} entries; ${entries.filter(e => e.status === "needs-review").length} need review.`);
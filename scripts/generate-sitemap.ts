import { readFileSync, writeFileSync, statSync, existsSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

const BASE_URL = "https://anaesthesiacore.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  // Core pages
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/revise", changefreq: "weekly", priority: "0.9" },
  { path: "/map", changefreq: "weekly", priority: "0.8" },
  { path: "/progress", changefreq: "weekly", priority: "0.7" },
  { path: "/podcasts", changefreq: "weekly", priority: "0.6" },
  { path: "/viva", changefreq: "weekly", priority: "0.7" },
  { path: "/viva/library", changefreq: "weekly", priority: "0.6" },
  { path: "/drugs", changefreq: "weekly", priority: "0.7" },
  
  // Sections
  { path: "/physics", changefreq: "weekly", priority: "0.8" },
  { path: "/physiology", changefreq: "weekly", priority: "0.8" },
  { path: "/pharmacology", changefreq: "weekly", priority: "0.8" },
  { path: "/clinical", changefreq: "weekly", priority: "0.8" },
  { path: "/intensive-care", changefreq: "weekly", priority: "0.8" },
  { path: "/perioperative", changefreq: "weekly", priority: "0.8" },
  { path: "/anatomy", changefreq: "weekly", priority: "0.8" },
  { path: "/chemistry", changefreq: "weekly", priority: "0.8" },
  
  // Physics topics
  { path: "/physics/gas-laws", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/pressure-measurement", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/flow-measurement", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/electrical-safety", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/pulse-oximetry", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/abg-analyser", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/temperature-measurement", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/humidity-gas-sampling", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/lasers-fibreoptics", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/ultrasound-physics", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/mri-physics", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/xray-radiation-safety", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/defibrillation-pacing", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/clinical-measurement", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/si-units-thermodynamics", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/optics-light", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/electricity-magnetism", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/statistics-ebm", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/math-concepts", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/depth-of-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/physics/equipment-monitoring", changefreq: "monthly", priority: "0.6" },
  
  // Physiology topics
  { path: "/physiology/oxygen-haemoglobin", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/cardiac-cycle", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/lung-mechanics", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/renal-physiology", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/neuromuscular", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/autonomic-nervous", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/maternal-physiology", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/foetal-circulation", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/hepatic-physiology", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/starling-forces", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/gi-physiology", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/cardiac-electrophysiology", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/ventilation-perfusion", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/endocrine-physiology", changefreq: "monthly", priority: "0.6" },
  { path: "/physiology/haematology-immunity", changefreq: "monthly", priority: "0.6" },
  
  // Pharmacology topics
  { path: "/pharmacology/pharmacokinetics", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/iv-anaesthetics", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/volatile-agents", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/opioids", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/muscle-relaxants", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/local-anaesthetics", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/vasoactive-agents", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/antimicrobials-pharm", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/antiarrhythmics", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/anticoagulants", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/pharmacodynamics", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/nsaids-paracetamol", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/antiemetics", changefreq: "monthly", priority: "0.6" },
  { path: "/pharmacology/corticosteroids", changefreq: "monthly", priority: "0.6" },
  
  // Clinical topics
  { path: "/clinical/airway-management", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/regional-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/obstetric-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/paediatric-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/neuroanaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/cardiothoracic", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/trauma-emergency", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/clinical-incidents", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/resource-poor-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/mass-casualty-military", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/pain-medicine", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/tiva", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/orthopaedic-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/ophthalmic-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/day-surgery", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/operating-theatre-environment", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/procedural-sedation", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/transfer-medicine", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/patient-positioning", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/bariatric-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/vascular-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/ent-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/burns-plastics", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/emergency-surgery", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/urological-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/gynaecological-anaesthesia", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/hepatobiliary-transplant", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/plastic-surgery", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/interventional-radiology", changefreq: "monthly", priority: "0.6" },
  { path: "/clinical/elderly-anaesthesia", changefreq: "monthly", priority: "0.6" },
  
  // Perioperative topics
  { path: "/perioperative/cardiovascular-disease", changefreq: "monthly", priority: "0.6" },
  { path: "/perioperative/respiratory-disease", changefreq: "monthly", priority: "0.6" },
  { path: "/perioperative/endocrine-disease", changefreq: "monthly", priority: "0.6" },
  { path: "/perioperative/neurological-disease", changefreq: "monthly", priority: "0.6" },
  { path: "/perioperative/preoperative-assessment", changefreq: "monthly", priority: "0.6" },
  { path: "/perioperative/enhanced-recovery", changefreq: "monthly", priority: "0.6" },
  { path: "/perioperative/perioperative-fluids", changefreq: "monthly", priority: "0.6" },
  { path: "/perioperative/vascular-access-devices", changefreq: "monthly", priority: "0.6" },
  { path: "/perioperative/genetic-syndromes", changefreq: "monthly", priority: "0.6" },
  
  // ICU topics
  { path: "/intensive-care/sepsis", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/mechanical-ventilation", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/circulatory-failure", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/aki-rrt", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/acute-liver-failure", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/acute-pancreatitis", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/neurointensive-care", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/cardiac-output-monitoring", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/acid-base", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/ards", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/icu-nutrition", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/postop-high-risk-icu", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/icu-endocrine-emergencies", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/transfusion-coagulation", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/icu-sedation-delirium", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/organ-donation", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/antimicrobials-icu", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/paediatric-icu", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/burns-icu", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/haematology-icu", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/toxicology", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/infectious-disease-icu", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/bronchospastic-failure", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/prognostication-ethics-icu", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/pulmonary-hypertension", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/arrhythmias-ecg-icu", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/cardiac-arrest-post-resus", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/end-of-life-communication", changefreq: "monthly", priority: "0.6" },
  { path: "/intensive-care/non-technical-skills", changefreq: "monthly", priority: "0.6" },
  
  // Anatomy topics
  { path: "/anatomy/cardiac-anatomy", changefreq: "monthly", priority: "0.6" },
  { path: "/anatomy/spinal-anatomy", changefreq: "monthly", priority: "0.6" },
  { path: "/anatomy/brachial-plexus", changefreq: "monthly", priority: "0.6" },
  { path: "/anatomy/upper-limb-anatomy", changefreq: "monthly", priority: "0.6" },
  { path: "/anatomy/thoracic-anatomy", changefreq: "monthly", priority: "0.6" },
  { path: "/anatomy/abdominal-anatomy", changefreq: "monthly", priority: "0.6" },
  { path: "/anatomy/head-neck-anatomy", changefreq: "monthly", priority: "0.6" },
  { path: "/anatomy/neuroanatomy", changefreq: "monthly", priority: "0.6" },
  { path: "/anatomy/lower-limb-anatomy", changefreq: "monthly", priority: "0.6" },
  
  // Chemistry topics
  { path: "/chemistry/atomic-structure-bonding", changefreq: "monthly", priority: "0.6" },
  { path: "/chemistry/acids-bases-buffers", changefreq: "monthly", priority: "0.6" },
  { path: "/chemistry/organic-chemistry", changefreq: "monthly", priority: "0.6" },
  { path: "/chemistry/solutions-concentration", changefreq: "monthly", priority: "0.6" },
  { path: "/chemistry/oxidation-reduction", changefreq: "monthly", priority: "0.6" },
];

// Build a path -> source-file map from src/App.tsx routes so we can resolve
// each sitemap entry's last-modified date from the file backing that route.
function buildPathToFileMap(): Record<string, string> {
  const app = readFileSync(resolve("src/App.tsx"), "utf8");
  const componentToFile: Record<string, string> = {};
  const recordImport = (name: string, rel: string) => {
    const base = rel.replace(/^\.\//, "src/");
    for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
      const candidate = resolve(base + ext);
      if (existsSync(candidate)) {
        componentToFile[name] = candidate;
        break;
      }
    }
  };
  // Static imports: `import Name from "./pages/..."`
  for (const m of app.matchAll(
    /import\s+(\w+)\s+from\s+["'](\.\/pages\/[^"']+)["']/g,
  )) {
    recordImport(m[1], m[2]);
  }
  // Lazy imports: `const Name = lazy(() => import("./pages/..."))`
  for (const m of app.matchAll(
    /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(["'](\.\/pages\/[^"']+)["']\)/g,
  )) {
    recordImport(m[1], m[2]);
  }
  const routeRe = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g;
  const map: Record<string, string> = {};
  for (const m of app.matchAll(routeRe)) {
    const file = componentToFile[m[2]];
    if (file) map[m[1]] = file;
  }
  return map;
}

const pathToFile = buildPathToFileMap();

// Prefer git's last-commit timestamp (stable across rebuilds); fall back to
// filesystem mtime when git history isn't available.
function lastModFor(path: string): string | undefined {
  const file = pathToFile[path];
  if (!file) return undefined;
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (iso) return iso.slice(0, 10);
  } catch {
    /* fall through to mtime */
  }
  try {
    return statSync(file).mtime.toISOString().slice(0, 10);
  } catch {
    return undefined;
  }
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) => {
    const lastmod = e.lastmod ?? lastModFor(e.path);
    return [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n");
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
const matched = Object.keys(pathToFile).length;
console.log(`sitemap.xml written (${entries.length} entries, ${matched} routes mapped to files for lastmod)`);

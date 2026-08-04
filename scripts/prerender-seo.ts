/**
 * Post-build prerender: bakes a unique <head> into a static HTML file per
 * route, so crawlers (Googlebot, LinkedIn, Slack, Facebook, Twitter) get a
 * real server-rendered title / description / canonical / og:* without
 * needing to execute JS.
 *
 * Strategy
 * --------
 *   1. Read `dist/index.html` (the SPA shell Vite just emitted).
 *   2. Read every URL out of the per-section sitemaps that prebuild wrote
 *      to `public/sitemaps/*.xml` — that's already the canonical list of
 *      indexable routes (excludes /dev, /admin, <Navigate> redirects).
 *   3. For each route, derive { title, description } from:
 *        a) `topicSeo[<last-segment>]` when present, OR
 *        b) hard-coded entries for sections / core pages, OR
 *        c) a generic "Title Case | Section | FRCA" fallback.
 *   4. Clone the shell, swap title + meta description, inject per-route
 *      canonical + og:url + og:title + og:description + twitter:title +
 *      twitter:description (deduping any sitewide og:title/og:description
 *      already in index.html so we don't ship two of each).
 *   5. Write `dist/<path>/index.html`. Static hosts (Lovable, Vercel,
 *      Netlify) serve the exact-match file before falling back to the SPA
 *      shell, so the right head ships on the initial HTML payload while
 *      React still hydrates on top.
 *
 * Never throws — wrapped in main().catch() so postbuild never breaks deploy.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { resolve, dirname, join } from "path";
import { topicSeo } from "../src/data/topicSeo";
import { extractFaqsByPath, type FaqPair } from "./extract-faqs";

const SITE = "https://anaesthesiacore.app";
const DIST = resolve("dist");
const SITEMAPS_DIR = resolve("public/sitemaps");

// ---------- route collection ----------
function collectRoutes(): string[] {
  const out = new Set<string>(["/"]);
  if (!existsSync(SITEMAPS_DIR)) return [...out];
  for (const f of readdirSync(SITEMAPS_DIR)) {
    if (!f.endsWith(".xml")) continue;
    const xml = readFileSync(join(SITEMAPS_DIR, f), "utf8");
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const url = m[1];
      if (!url.startsWith(SITE)) continue;
      const path = url.slice(SITE.length) || "/";
      out.add(path);
    }
  }
  return [...out];
}

// ---------- title / description derivation ----------
const SECTION_LABELS: Record<string, string> = {
  physics: "Physics",
  physiology: "Physiology",
  pharmacology: "Pharmacology",
  clinical: "Clinical Anaesthesia",
  "intensive-care": "Intensive Care",
  perioperative: "Perioperative Medicine",
  anatomy: "Anatomy",
  chemistry: "Chemistry",
  drugs: "Drugs",
  tools: "Clinical Tools",
  viva: "Viva Practice",
};

// Section landing pages get hand-tuned heads so the top of each silo doesn't
// inherit a generic fallback.
const SECTION_SEO: Record<string, { title: string; description: string }> = {
  "/physics": {
    title: "Physics for Anaesthesia & ICU | FRCA Primary & FFICM",
    description: "Anaesthetic physics for FRCA Primary, Final and FFICM: gas laws, flow, pressure, capnography, ultrasound, MRI safety and electrical safety with diagrams and quizzes.",
  },
  "/physiology": {
    title: "Physiology for Anaesthesia & ICU | FRCA & FFICM Revision",
    description: "Applied physiology for FRCA and FFICM: cardiovascular, respiratory, renal, neuro and endocrine systems with high-yield diagrams, vivas and exam-mapped notes.",
  },
  "/pharmacology": {
    title: "Anaesthetic Pharmacology | FRCA Primary & Final Revision",
    description: "Anaesthetic pharmacology for FRCA: IV and volatile agents, opioids, muscle relaxants, local anaesthetics, vasoactive drugs and pharmacokinetics with structured notes.",
  },
  "/clinical": {
    title: "Clinical Anaesthesia Topics | FRCA Final Revision",
    description: "Clinical anaesthesia for FRCA Final: airway, regional, obstetric, paediatric, neuro, cardiothoracic, trauma, day surgery and pain medicine — exam-mapped notes.",
  },
  "/intensive-care": {
    title: "Intensive Care Medicine | FFICM & EDIC Revision",
    description: "FFICM-mapped ICU revision: ventilation, shock, sepsis, AKI, neuro-ICU, ECMO, post-cardiac-arrest care, end-of-life and organ donation with structured exam notes.",
  },
  "/perioperative": {
    title: "Perioperative Medicine | FRCA Final Revision",
    description: "Perioperative medicine for FRCA Final: preoperative assessment, comorbidity optimisation, ERAS, postoperative care, frailty and shared decision-making.",
  },
  "/anatomy": {
    title: "Anaesthetic Anatomy | FRCA Primary & Final Revision",
    description: "Applied anatomy for FRCA: airway, neuraxial, peripheral nerves, vascular access and regional blocks with labelled diagrams and exam-mapped summaries.",
  },
  "/chemistry": {
    title: "Chemistry for FRCA Primary | Atomic Structure & Solutions",
    description: "Foundation chemistry for FRCA Primary: atomic structure, bonding, solutions, acid–base buffers, organic chemistry, oxidation/reduction with worked examples.",
  },
};

// Core (non-section) pages where we want a deliberate head, not a derived one.
const CORE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "AnaesthesiaCore – FRCA & FFICM Revision",
    description: "Master anaesthesia and intensive care with interactive diagrams, quizzes and exam-focused summaries. Mapped to FRCA Primary, Final and FFICM curricula.",
  },
  "/revise": {
    title: "Revise – FRCA & FFICM Topic Search | AnaesthesiaCore",
    description: "Search the unified FRCA Primary, Final and FFICM curriculum: 300+ topics across physics, physiology, pharmacology, clinical anaesthesia and intensive care.",
  },
  "/map": {
    title: "Topic Map – FRCA & FFICM Curriculum | AnaesthesiaCore",
    description: "Visual map of the FRCA Primary, Final and FFICM curriculum showing how every topic links across physics, physiology, pharmacology, clinical and ICU.",
  },
  "/curriculum": {
    title: "FRCA & FFICM Curriculum Coverage | AnaesthesiaCore",
    description: "Track AnaesthesiaCore's coverage of the RCoA FRCA Primary, Final and FoICM FFICM curricula. Per-section progress and the exam mapping behind every topic.",
  },
  "/progress": {
    title: "My Revision Progress | AnaesthesiaCore",
    description: "Personal FRCA/FFICM revision dashboard: track topic completion, quiz scores and spaced-repetition reviews across the curriculum.",
  },
  "/podcasts": {
    title: "FRCA & FFICM Revision Podcasts | AnaesthesiaCore",
    description: "Audio summaries of FRCA and FFICM topics — drive-time revision across anaesthetic physics, physiology, pharmacology and intensive care.",
  },
  "/viva": {
    title: "FRCA Viva Practice – Structured Oral Exam Prep",
    description: "Structured FRCA viva practice: model stems, marking schemes and worked answers across primary and final viva topics.",
  },
  "/viva/library": {
    title: "FRCA Viva Question Library | AnaesthesiaCore",
    description: "Searchable library of FRCA viva questions with model answers and examiner-style follow-ups across physics, physiology, pharmacology and clinical anaesthesia.",
  },
  "/viva/voice": {
    title: "Voice Viva – Spoken FRCA Practice | AnaesthesiaCore",
    description: "Speak your FRCA viva answers and get structured feedback. Voice-driven exam practice across primary and final viva stems.",
  },
  "/drugs": {
    title: "Anaesthetic Drug Reference | Doses & Pharmacology",
    description: "Searchable anaesthetic and ICU drug reference: doses, indications, pharmacokinetics, side-effects and clinical pearls for FRCA and FFICM.",
  },
  "/tools": {
    title: "Clinical Tools – Dose & Fluid Calculators | AnaesthesiaCore",
    description: "Bedside calculators for anaesthesia and ICU: MAC for age, paediatric emergency doses, maintenance fluids, max local anaesthetic dose, ABG interpreter.",
  },
  "/tools/mac-for-age": {
    title: "MAC for Age Calculator – Volatile Anaesthetic Dosing",
    description: "Calculate age-adjusted minimum alveolar concentration (MAC) for sevoflurane, isoflurane and desflurane in adults and children.",
  },
  "/tools/paediatric-emergency-doses": {
    title: "Paediatric Emergency Drug Dose Calculator",
    description: "Weight-based paediatric emergency drug doses: adrenaline, amiodarone, atropine, intralipid and resuscitation drugs with safe upper limits.",
  },
  "/tools/maintenance-fluid": {
    title: "Maintenance Fluid Calculator – 4/2/1 Rule",
    description: "Calculate maintenance IV fluid rates using the Holliday–Segar 4/2/1 rule for paediatric and adult patients.",
  },
  "/tools/max-local-anaesthetic-dose": {
    title: "Max Local Anaesthetic Dose Calculator",
    description: "Calculate maximum safe local anaesthetic doses (lidocaine, bupivacaine, ropivacaine, prilocaine) by weight, with/without adrenaline.",
  },
  "/tools/abg-interpreter": {
    title: "ABG Interpreter – Acid-Base & Compensation",
    description: "Stepwise arterial blood gas interpretation: acid–base disorder, compensation, anion gap and A–a gradient with worked physiology.",
  },
  "/review": {
    title: "Spaced-Repetition Review | AnaesthesiaCore",
    description: "Daily spaced-repetition review of FRCA and FFICM flashcards to retain high-yield exam material long term.",
  },
  "/login": {
    title: "Sign in | AnaesthesiaCore",
    description: "Sign in to AnaesthesiaCore to track FRCA and FFICM revision progress, save reviews and access voice viva practice.",
  },
  "/errata": {
    title: "Errata & Corrections | AnaesthesiaCore",
    description: "Published errata for AnaesthesiaCore content — corrections to FRCA and FFICM revision notes, diagrams and quiz items.",
  },
};

function titleCase(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bIcu\b/g, "ICU")
    .replace(/\bIv\b/g, "IV")
    .replace(/\bCo2\b/gi, "CO₂")
    .replace(/\bO2\b/gi, "O₂")
    .replace(/\bAbg\b/gi, "ABG")
    .replace(/\bEcg\b/gi, "ECG")
    .replace(/\bMri\b/gi, "MRI")
    .replace(/\bNsaids\b/gi, "NSAIDs")
    .replace(/\bEbm\b/gi, "EBM")
    .replace(/\bGi\b/gi, "GI")
    .replace(/\bSi\b/gi, "SI")
    .replace(/\bTiva\b/gi, "TIVA");
}

interface RouteSeo {
  title: string;
  description: string;
}

/**
 * Enforce the SEO checklist bounds (title ≤ 60, description 50–160). Truncates
 * gracefully at word/sentence boundaries so the baked head always passes the
 * strict CI check regardless of upstream copy drift.
 */
const TITLE_MAX = 60;
const DESC_MIN = 50;
const DESC_MAX = 160;

function clampTitle(raw: string): string {
  const t = raw.trim();
  if (t.length <= TITLE_MAX) return t;
  const cut = t.slice(0, TITLE_MAX).replace(/[\s\-–|:,;]+\S*$/, "").trim();
  return (cut.length >= 20 ? cut : t.slice(0, TITLE_MAX).trim());
}

function clampDescription(raw: string, title: string): string {
  let d = raw.trim();
  if (d.length > DESC_MAX) {
    const cut = d.slice(0, DESC_MAX).replace(/[\s.,;:–—-]+\S*$/, "").trim();
    d = (cut.length >= 80 ? cut : d.slice(0, DESC_MAX).trim());
  }
  if (d.length < DESC_MIN) {
    const pad = ` Exam-focused revision notes for FRCA Primary, Final and FFICM on AnaesthesiaCore.`;
    d = `${title}: ${d}${pad}`.slice(0, DESC_MAX).trim();
  }
  return d;
}

function clampSeo(raw: RouteSeo): RouteSeo {
  const title = clampTitle(raw.title);
  return { title, description: clampDescription(raw.description, title) };
}

function seoForRaw(path: string): RouteSeo {
  if (CORE_SEO[path]) return CORE_SEO[path];
  if (SECTION_SEO[path]) return SECTION_SEO[path];

  const segments = path.split("/").filter(Boolean);
  const sectionKey = segments[0];
  const sectionLabel = SECTION_LABELS[sectionKey] ?? "FRCA";

  // /drugs/<slug>
  if (sectionKey === "drugs" && segments.length === 2) {
    const drug = titleCase(segments[1]);
    return {
      title: `${drug} – Dose, Pharmacology & Uses | AnaesthesiaCore`.slice(0, 70),
      description: `${drug} in anaesthesia and ICU: dosing, pharmacokinetics, mechanism, indications, contraindications and clinical pearls for FRCA and FFICM.`,
    };
  }

  // /<section>/<topic>[/<sub>]
  const topicKey = segments[segments.length - 1];
  const topicEntry = topicSeo[topicKey];
  if (topicEntry?.title && topicEntry.description) {
    return { title: topicEntry.title, description: topicEntry.description };
  }
  const topicLabel = titleCase(topicKey ?? "");
  const fallbackTitle = `${topicLabel} – ${sectionLabel} | FRCA Revision`;
  const fallbackDesc = topicEntry?.description
    ?? `${topicLabel} for FRCA and FFICM: structured exam-mapped notes on ${topicLabel.toLowerCase()} in ${sectionLabel.toLowerCase()}, with diagrams, quizzes and references.`;
  return {
    title: fallbackTitle.length > 70 ? `${topicLabel} | ${sectionLabel} | FRCA` : fallbackTitle,
    description: fallbackDesc,
  };
}

function seoFor(path: string): RouteSeo {
  return clampSeo(seoForRaw(path));
}

// ---------- head patching ----------
function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildBreadcrumb(path: string, seo: RouteSeo): object | null {
  if (path === "/") return null;
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const items: Array<{ "@type": "ListItem"; position: number; name: string; item: string }> = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
  ];

  let acc = "";
  for (let i = 0; i < segments.length; i++) {
    acc += `/${segments[i]}`;
    const isLast = i === segments.length - 1;
    let name: string;
    if (isLast) {
      // Prefer the short human label for the leaf: strip suffixes added by our
      // SEO titles (" – Section | FRCA …", " | AnaesthesiaCore", etc.).
      name = seo.title
        .split(/\s+[–|]\s+/)[0]
        .split(/\s*\|\s*/)[0]
        .trim() || titleCase(segments[i]);
    } else if (SECTION_LABELS[segments[i]]) {
      name = SECTION_LABELS[segments[i]];
    } else {
      name = titleCase(segments[i]);
    }
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name,
      item: `${SITE}${acc}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

// Sections whose deep pages are clinical/medical content — these get a
// MedicalWebPage schema so Google can classify them as medical material
// (eligible for the medical content treatment in SERPs / Knowledge Graph)
// rather than generic articles.
const MEDICAL_SECTIONS = new Set([
  "physics",
  "physiology",
  "pharmacology",
  "clinical",
  "intensive-care",
  "perioperative",
  "anatomy",
  "chemistry",
  "drugs",
]);

function buildMedicalWebPage(path: string, seo: RouteSeo): object | null {
  const segments = path.split("/").filter(Boolean);
  // Topic + subtopic pages only: section landing pages (1 segment) and
  // non-medical app routes (/tools, /viva, /revise, etc.) are excluded.
  if (segments.length < 2) return null;
  if (!MEDICAL_SECTIONS.has(segments[0])) return null;

  const canonical = `${SITE}${path}`;
  const sectionKey = segments[0];
  const sectionLabel = SECTION_LABELS[sectionKey] ?? "FRCA";
  const leafSlug = segments[segments.length - 1];
  // Short human label for `about`/`headline` — strip the SEO suffixes the way
  // buildBreadcrumb does for leaf names.
  const leafName = seo.title
    .split(/\s+[–|]\s+/)[0]
    .split(/\s*\|\s*/)[0]
    .trim() || titleCase(leafSlug);

  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: seo.title,
    headline: leafName,
    description: seo.description,
    url: canonical,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      name: "AnaesthesiaCore",
      url: `${SITE}/`,
    },
    about: {
      "@type": "MedicalEntity",
      name: leafName,
    },
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Clinician",
      healthCondition: { "@type": "MedicalCondition", name: sectionLabel },
    },
    publisher: {
      "@type": "Organization",
      name: "AnaesthesiaCore",
      url: `${SITE}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/brain-logo.png`,
      },
    },
    mainContentOfPage: true,
  };
}

// ---------- Article (guide notes) ----------
// Every /notes/<slug> page is an authored guide rendered by NoteLayout, which
// declares `slug`, `shortTitle` and `datePublished` (+ optional
// `dateModified`) as literal props. Read those straight from the source files
// so the prerendered Article JSON-LD carries real, page-specific dates rather
// than a build-time fallback.
interface NoteMeta {
  shortTitle?: string;
  datePublished?: string;
  dateModified?: string;
}

let noteMetaCache: Record<string, NoteMeta> | null = null;

function readNoteMeta(): Record<string, NoteMeta> {
  if (noteMetaCache) return noteMetaCache;
  const out: Record<string, NoteMeta> = {};
  const dir = resolve("src/pages/notes");
  if (!existsSync(dir)) return (noteMetaCache = out);
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".tsx")) continue;
    const src = readFileSync(join(dir, file), "utf8");
    const slug = src.match(/\bslug=["']([a-z0-9-]+)["']/)?.[1];
    if (!slug) continue;
    out[slug] = {
      shortTitle: src.match(/\bshortTitle=["']([^"']+)["']/)?.[1],
      datePublished: src.match(/\bdatePublished=["'](\d{4}-\d{2}-\d{2})["']/)?.[1],
      dateModified: src.match(/\bdateModified=["'](\d{4}-\d{2}-\d{2})["']/)?.[1],
    };
  }
  return (noteMetaCache = out);
}

function buildArticle(path: string, seo: RouteSeo): object | null {
  const segments = path.split("/").filter(Boolean);
  if (segments.length !== 2 || segments[0] !== "notes") return null;
  const meta = readNoteMeta()[segments[1]];
  if (!meta?.datePublished) return null;

  const canonical = `${SITE}${path}`;
  const headline =
    meta.shortTitle ??
    (seo.title.split(/\s+[–|]\s+/)[0].split(/\s*\|\s*/)[0].trim() ||
      titleCase(segments[1]));

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    name: seo.title,
    description: seo.description,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    inLanguage: "en-GB",
    datePublished: meta.datePublished,
    dateModified: meta.dateModified ?? meta.datePublished,
    author: { "@type": "Person", name: "Dr Rob Coe", jobTitle: "Anaesthetist" },
    publisher: {
      "@type": "Organization",
      name: "AnaesthesiaCore",
      url: `${SITE}/`,
      logo: { "@type": "ImageObject", url: `${SITE}/brain-logo.png` },
    },
    isPartOf: { "@type": "WebSite", name: "AnaesthesiaCore", url: `${SITE}/` },
    about: { "@type": "Thing", name: headline },
  };
}

function patchHead(
  shell: string,
  path: string,
  seo: RouteSeo,
  faqs: FaqPair[] | undefined,
): string {
  const canonical = `${SITE}${path === "/" ? "/" : path}`;
  const titleText = escapeText(seo.title);
  const descAttr = escapeAttr(seo.description);
  const titleAttr = escapeAttr(seo.title);
  const ogType = path === "/" ? "website" : "article";

  let html = shell;

  // 1. <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${titleText}</title>`);

  // 2. <meta name="description">
  if (/<meta\s+name="description"[^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${descAttr}">`,
    );
  } else {
    html = html.replace(
      /<\/title>/i,
      `</title>\n    <meta name="description" content="${descAttr}">`,
    );
  }

  // 3. Strip any existing canonical / og:url / og:title / og:description /
  //    twitter:title / twitter:description so we never ship duplicates.
  html = html.replace(
    /\s*<link\s+rel="canonical"[^>]*>\s*/gi,
    "\n    ",
  );
  html = html.replace(
    /\s*<meta\s+(?:property|name)="(?:og:url|og:title|og:description|twitter:title|twitter:description)"[^>]*>\s*/gi,
    "\n    ",
  );

  // 4. Strip existing WebSite / Organization JSON-LD from the shell so we can
  //    re-inject a clean, controlled version on every route.
  html = html.replace(
    /\s*<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?"@type"\s*:\s*"WebSite"[\s\S]*?<\/script>\s*/gi,
    "\n    ",
  );
  html = html.replace(
    /\s*<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?"@type"\s*:\s*"Organization"[\s\S]*?<\/script>\s*/gi,
    "\n    ",
  );

  // 5. Inject per-route canonical + og + twitter + optional FAQPage JSON-LD,
  //    immediately before </head>.
  const headTags: string[] = [
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:type" content="${ogType}">`,
    `<meta property="og:title" content="${titleAttr}">`,
    `<meta property="og:description" content="${descAttr}">`,
    `<meta name="twitter:title" content="${titleAttr}">`,
    `<meta name="twitter:description" content="${descAttr}">`,
  ];

  // WebSite + SearchAction JSON-LD on every route so Google understands
  // site-level search regardless of which page it crawls first.
  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AnaesthesiaCore",
    url: `${SITE}/`,
    description:
      "Unified FRCA Primary, Final and FFICM revision: structured topics, diagrams, quizzes and viva practice across anaesthesia and intensive care.",
    inLanguage: "en-GB",
    publisher: {
      "@type": "Organization",
      name: "AnaesthesiaCore",
      url: `${SITE}/`,
      logo: `${SITE}/brain-logo.png`,
      description:
        "FRCA Primary, Final and FFICM revision platform for UK anaesthesia and intensive care trainees.",
      founder: { "@type": "Person", name: "Dr Rob Coe", jobTitle: "Anaesthetist" },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/revise?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  const wsJson = JSON.stringify(webSiteJsonLd).replace(/<\/script>/gi, "<\\/script>");
  headTags.push(
    `<script type="application/ld+json" data-prerender="website">${wsJson}</script>`,
  );

  // Standalone Organization JSON-LD on every route for Google's Knowledge Panel
  // and consistent brand entity mapping across the entire site.
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AnaesthesiaCore",
    url: `${SITE}/`,
    logo: `${SITE}/brain-logo.png`,
    description:
      "FRCA Primary, Final and FFICM revision platform for UK anaesthesia and intensive care trainees.",
    founder: { "@type": "Person", name: "Dr Rob Coe", jobTitle: "Anaesthetist" },
    sameAs: [
      "https://anaesthesiacore.app/",
    ],
  };
  const orgJson = JSON.stringify(orgJsonLd).replace(/<\/script>/gi, "<\\/script>");
  headTags.push(
    `<script type="application/ld+json" data-prerender="organization">${orgJson}</script>`,
  );

  // BreadcrumbList JSON-LD on every non-root page so Google can map the
  // section hierarchy (Home › Section › Topic › Subtopic) for rich nav
  // breadcrumbs in SERPs.
  const breadcrumb = buildBreadcrumb(path, seo);
  if (breadcrumb) {
    const bcJson = JSON.stringify(breadcrumb).replace(/<\/script>/gi, "<\\/script>");
    headTags.push(
      `<script type="application/ld+json" data-prerender="breadcrumb">${bcJson}</script>`,
    );
  }

  // MedicalWebPage JSON-LD on every topic / subtopic page so Google can
  // classify clinical content as medical material rather than a generic
  // article (eligible for the medical-content treatment in SERPs).
  const medicalPage = buildMedicalWebPage(path, seo);
  if (medicalPage) {
    const mpJson = JSON.stringify(medicalPage).replace(/<\/script>/gi, "<\\/script>");
    headTags.push(
      `<script type="application/ld+json" data-prerender="medicalwebpage">${mpJson}</script>`,
    );
  }

  // Article JSON-LD on every /notes/<slug> guide so Google can treat them as
  // authored articles (byline, publish/update dates) rather than generic pages.
  const article = buildArticle(path, seo);
  if (article) {
    const artJson = JSON.stringify(article).replace(/<\/script>/gi, "<\\/script>");
    headTags.push(
      `<script type="application/ld+json" data-prerender="article">${artJson}</script>`,
    );
  }

  if (faqs && faqs.length > 0) {
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    };
    // JSON.stringify already escapes " and \. A </script> sequence inside an
    // answer would break the closing tag — defend against it by escaping the
    // forward slash, which JSON parsers and Google's structured-data parser
    // both handle transparently.
    const json = JSON.stringify(faqJsonLd).replace(/<\/script>/gi, "<\\/script>");
    headTags.push(
      `<script type="application/ld+json" data-prerender="faqpage">${json}</script>`,
    );
  }

  const injected = headTags.join("\n    ");

  // Strip the duplicate <meta property="og:type"> the shell ships, since we
  // re-emit our own (website vs article per route).
  html = html.replace(/\s*<meta\s+property="og:type"[^>]*>\s*/gi, "\n    ");

  html = html.replace(/<\/head>/i, `    ${injected}\n  </head>`);

  return html;
}

// ---------- main ----------
async function main() {
  const shellPath = join(DIST, "index.html");
  if (!existsSync(shellPath)) {
    console.warn(`[prerender] ${shellPath} not found — skipping.`);
    return;
  }
  const shell = readFileSync(shellPath, "utf8");
  const routes = collectRoutes();
  const faqsByPath = extractFaqsByPath();

  let written = 0;
  let overwroteRoot = false;
  let withFaq = 0;
  let withBreadcrumb = 0;
  let withWebSite = 0;
  let withOrg = 0;
  let withMedical = 0;

  for (const path of routes) {
    const seo = seoFor(path);
    const faqs = faqsByPath[path];
    const html = patchHead(shell, path, seo, faqs);

    const targetDir = path === "/" ? DIST : join(DIST, path);
    const targetFile = join(targetDir, "index.html");
    if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
    writeFileSync(targetFile, html);
    written++;
    if (path === "/") overwroteRoot = true;
    if (faqs && faqs.length > 0) withFaq++;
    if (path !== "/") withBreadcrumb++;
    withWebSite++;
    withOrg++;
    if (buildMedicalWebPage(path, seo)) withMedical++;
  }

  console.log(
    `[prerender] Wrote ${written} per-route index.html files (${overwroteRoot ? "incl." : "excl."} root); ${withWebSite} include WebSite/SearchAction JSON-LD; ${withOrg} include Organization JSON-LD; ${withFaq} include FAQPage JSON-LD; ${withBreadcrumb} include BreadcrumbList JSON-LD; ${withMedical} include MedicalWebPage JSON-LD.`,
  );
}

main().catch((err) => {
  // Best-effort — never fail the deploy build.
  console.error(`[prerender] crashed but continuing: ${(err as Error).message}`);
});

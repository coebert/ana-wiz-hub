export interface VisitorEvidence {
  visitor_id: string;
  user_agent?: string | null;
  automation_detected?: boolean | null;
  has_interaction?: boolean | null;
}

// Deliberately target automation names, not ordinary browser names (YandexBrowser).
const AUTOMATION = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|pingdom|uptimerobot|headless|phantomjs|puppeteer|playwright|lighthouse|ahrefs|semrush|dataforseo|notebooklm|googleother|google-extended|google-read-aloud|inspectiontool|mediapartners-google|adsbot|apis-google|feedfetcher|facebookcatalog|meta-external|anthropic|claude|perplexity|chatgpt|oai-search|python-requests|python-urllib|curl\/|wget\/|go-http-client|node-fetch|undici|scrapy|httpclient|bytespider|selenium/i;
const BROWSER = /Mozilla\/5\.0.*(?:Chrome\/|Chromium\/|Firefox\/|Safari\/|Edg\/|OPR\/)/i;

export function classifyVisitors(visits: ReadonlyArray<VisitorEvidence>) {
  const state = new Map<string, { automated: boolean; browser: boolean; interacted: boolean }>();
  for (const visit of visits) {
    const entry = state.get(visit.visitor_id) ?? { automated: false, browser: false, interacted: false };
    const ua = visit.user_agent?.trim() ?? "";
    entry.automated ||= visit.automation_detected === true || AUTOMATION.test(ua);
    entry.browser ||= BROWSER.test(ua);
    entry.interacted ||= visit.has_interaction === true;
    state.set(visit.visitor_id, entry);
  }
  const likelyHuman = new Set<string>();
  const automated = new Set<string>();
  const unknown = new Set<string>();
  const interacted = new Set<string>();
  for (const [id, evidence] of state) {
    if (evidence.automated) automated.add(id);
    else if (evidence.browser) {
      likelyHuman.add(id);
      if (evidence.interacted) interacted.add(id);
    } else unknown.add(id);
  }
  return { likelyHuman, automated, unknown, interacted };
}

export function buildNonBotVisitorSet(visits: ReadonlyArray<VisitorEvidence>) {
  return classifyVisitors(visits).likelyHuman;
}
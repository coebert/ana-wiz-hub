/**
 * Cloudflare Worker: true HTTP 404 for unknown page paths on anaesthesiacore.app.
 *
 * Runs on a zone route in front of Lovable hosting. Every request that is not an
 * unknown page navigation is passed straight to the origin with fetch(request)
 * (same-zone subrequests skip this Worker, so there is no recursion). Query
 * strings, headers, cookies and methods are forwarded untouched; this Worker
 * never adds, removes or checks authentication.
 */
import manifestJson from "./route-manifest.generated.json";

export interface RouteManifest {
  static: string[];
  dynamic: { drugs: string[]; referenceTopics: string[]; diagrams: string[] };
}

/** Prefixes always forwarded (OAuth callbacks, auth, APIs, build assets, standalone notice). */
export const PASS_THROUGH_PREFIXES = ["/~oauth", "/auth/", "/api/", "/functions/", "/rest/", "/assets/", "/iphone/privacy", "/.well-known/"];

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function buildMatcher(m: RouteManifest) {
  const statics = new Set(m.static.map((p) => p.toLowerCase()));
  const sets = {
    drugs: new Set(m.dynamic.drugs.map((s) => s.toLowerCase())),
    referenceTopics: new Set(m.dynamic.referenceTopics.map((s) => s.toLowerCase())),
    diagrams: new Set(m.dynamic.diagrams.map((s) => s.toLowerCase())),
  };
  /** True when the React app would render a real page (not NotFound) for this path. */
  return function isKnownPage(rawPath: string): boolean {
    let path: string;
    try { path = decodeURIComponent(rawPath); } catch { return false; }
    // React Router matching is case-insensitive and ignores one trailing slash.
    path = path.toLowerCase();
    if (path.length > 1) path = path.replace(/\/+$/, "");
    if (statics.has(path)) return true;
    const seg = path.split("/").filter(Boolean);
    if (seg.length === 2 && seg[0] === "drugs") return sets.drugs.has(seg[1]);
    if (seg.length === 3 && seg[0] === "reference" && seg[1] === "drugs") return sets.drugs.has(seg[2]);
    if (seg.length === 3 && seg[0] === "reference" && seg[1] === "topics") return sets.referenceTopics.has(seg[2]);
    if (seg.length === 3 && seg[0] === "dev" && seg[1] === "diagram-snapshot") return sets.diagrams.has(seg[2]);
    if (seg.length === 3 && seg[0] === "admin" && seg[1] === "support") return UUID.test(seg[2]);
    if (seg.length === 2 && seg[0] === "my-enquiries") return UUID.test(seg[1]);
    return false;
  };
}

/** "pass" = forward to origin unchanged; "not-found" = answer 404 here. */
export function classify(request: Request, isKnownPage: (p: string) => boolean): "pass" | "not-found" {
  if (request.method !== "GET" && request.method !== "HEAD") return "pass";
  const { pathname } = new URL(request.url);
  if (PASS_THROUGH_PREFIXES.some((p) => pathname === p.replace(/\/$/, "") || pathname.startsWith(p))) return "pass";
  // Anything that looks like a file goes to the origin, which already 404s missing files.
  const last = pathname.split("/").pop() ?? "";
  if (/\.[a-z0-9]{1,8}$/i.test(last)) return "pass";
  return isKnownPage(pathname) ? "pass" : "not-found";
}

export const NOT_FOUND_HTML = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Page not found | AnaesthesiaCore</title>
<style>
:root{color-scheme:light dark}
body{font-family:Georgia,serif;margin:0;min-height:100vh;display:grid;place-items:center;padding:1.5rem;background:Canvas;color:CanvasText}
main{max-width:34rem}
h1{font-size:2rem;margin:0 0 .75rem}
a{display:inline-block;min-height:44px;line-height:44px;margin-right:1.25rem;color:LinkText}
a:focus-visible{outline:3px solid currentColor;outline-offset:2px}
</style>
</head>
<body>
<main>
<h1>Page not found</h1>
<p>This page does not exist on AnaesthesiaCore. It may have moved, or the address may be mistyped.</p>
<nav aria-label="Helpful links">
<a href="/">Home</a><a href="/revise">Revise</a><a href="/curriculum">Curriculum</a><a href="/drugs">Drugs</a>
</nav>
</main>
</body>
</html>
`;

export function notFoundResponse(request: Request): Response {
  return new Response(request.method === "HEAD" ? null : NOT_FOUND_HTML, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
      "cache-control": "public, max-age=300",
    },
  });
}

const isKnownPage = buildMatcher(manifestJson as RouteManifest);

export default {
  async fetch(request: Request): Promise<Response> {
    if (classify(request, isKnownPage) === "not-found") return notFoundResponse(request);
    return fetch(request);
  },
};

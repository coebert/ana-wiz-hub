/**
 * Fixture sample values for parameterized routes.
 *
 * Each parameter name maps to one or more concrete sample values. The
 * route-to-URL JSON-LD validator substitutes these into routes like
 * `/drugs/:slug` or `/:section/:topicSlug` so each parameterised route
 * is exercised against a real-looking URL path.
 *
 * Tests should also be able to attach an optional `expectedTypes`
 * override per concrete route, in case the rendered page deviates from
 * the URL-pattern default (e.g. /drugs/:slug serves a Drug entity, not
 * a topic LearningResource).
 */

export interface ParamFixture {
  /** Sample values to expand `:param` into. */
  samples: string[];
  /**
   * Optional per-route override of expected JSON-LD @types. Keyed by the
   * raw route pattern as it appears in App.tsx.
   *
   * Use `[]` to opt-out (sitewide-only is acceptable).
   */
  expectedTypesByRoute?: Record<string, string[]>;
}

/**
 * Map of route parameter name → fixture.
 *
 * Add a new entry here when introducing a new parameterised segment
 * (e.g. `:topicSlug`, `:sectionSlug`, `:vivaId`).
 */
export const ROUTE_PARAM_FIXTURES: Record<string, ParamFixture> = {
  // /drugs/:slug — a real drug page slug. Validation only requires the
  // page to ship valid sitewide JSON-LD; no specific @type is required
  // until a Drug schema is added.
  slug: {
    samples: ["propofol", "rocuronium", "remifentanil"],
    expectedTypesByRoute: {
      "/drugs/:slug": [],
    },
  },
  // Forward-compatible: if /:section/:topicSlug is ever introduced as
  // a generic dynamic route, expand it against a real topic slug so
  // the URL-pattern rule (BreadcrumbList + LearningResource) applies.
  topicSlug: {
    samples: ["gas-laws", "oxygen-haemoglobin", "cardiac-cycle"],
  },
  section: {
    samples: ["physics", "physiology"],
  },
  // /viva/:questionId etc — accept anything; sitewide-only by default.
  questionId: { samples: ["q-001"] },
  vivaId: { samples: ["v-001"] },
};

/**
 * Substitute `:param` segments in `route` with one of `fixture.samples`.
 * Returns every concrete URL produced by the cartesian product of the
 * available samples for each parameter present in the route.
 */
export function expandRoute(route: string): string[] {
  const segments = route.split("/");
  let urls: string[] = [""];
  for (const seg of segments) {
    if (!seg.startsWith(":")) {
      urls = urls.map((u) => (u === "" ? seg === "" ? "/" : `/${seg}` : `${u}/${seg}`));
      continue;
    }
    const name = seg.slice(1);
    const fx = ROUTE_PARAM_FIXTURES[name];
    if (!fx || fx.samples.length === 0) {
      // No fixture for this param → emit a placeholder so the URL is
      // still well-formed, but mark it unmappable.
      urls = urls.map((u) => `${u}/__missing_${name}__`);
      continue;
    }
    const next: string[] = [];
    for (const u of urls) for (const s of fx.samples) next.push(`${u}/${s}`);
    urls = next;
  }
  // Normalise leading slash artefacts ("//foo" → "/foo")
  return urls.map((u) => u.replace(/\/+/g, "/")).map((u) => (u === "" ? "/" : u));
}

/** Lookup an explicit per-route expected-types override, if any. */
export function expectedTypesOverride(route: string): string[] | undefined {
  for (const fx of Object.values(ROUTE_PARAM_FIXTURES)) {
    const o = fx.expectedTypesByRoute?.[route];
    if (o) return o;
  }
  return undefined;
}

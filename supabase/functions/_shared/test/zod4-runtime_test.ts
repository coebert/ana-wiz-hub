// Offline Deno checks for the backend functions moved from Zod 3 to Zod 4.6.7.
// Every network call is answered by an in-memory stub; anything unexpected throws,
// so these tests can never reach the real database, email or third-party services.
import { assert, assertEquals } from "jsr:@std/assert@1";

const env: Record<string, string> = {
  SUPABASE_URL: "http://backend.stub.invalid",
  SUPABASE_SERVICE_ROLE_KEY: "test-service-role",
  SUPABASE_ANON_KEY: "test-anon",
  LIGHTHOUSE_INGEST_TOKEN: "test-ingest-token",
};
for (const [k, v] of Object.entries(env)) Deno.env.set(k, v);
for (const k of ["LOVABLE_API_KEY", "RESEND_API_KEY", "SUPPORT_FROM_EMAIL", "FIRECRAWL_API_KEY", "PAGESPEED_INSIGHTS_API_KEY"]) Deno.env.delete(k);

const MEMBER = "11111111-1111-4111-8111-111111111111";
const ADMIN = "22222222-2222-4222-8222-222222222222";
const TICKET = "33333333-3333-4333-8333-333333333333";
const b64 = (o: unknown) => btoa(JSON.stringify(o)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
const jwt = (sub: string) => `${b64({ alg: "HS256", typ: "JWT" })}.${b64({ sub, role: "authenticated", exp: Math.floor(Date.now() / 1000) + 3600 })}.sig`;
const TOKENS: Record<string, string> = { [jwt(MEMBER)]: MEMBER, [jwt(ADMIN)]: ADMIN };

const calls: string[] = [];
const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
globalThis.fetch = async (input: string | URL | Request, init?: RequestInit) => {
  const req = new Request(input, init);
  const url = new URL(req.url);
  calls.push(`${req.method} ${url.pathname}`);
  if (url.origin !== env.SUPABASE_URL) throw new Error(`Unexpected external call: ${url.href}`);
  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (url.pathname === "/auth/v1/user") {
    const id = TOKENS[token];
    return id ? reply({ id, aud: "authenticated", email: `${id}@example.test`, email_confirmed_at: null, user_metadata: {} }) : reply({ message: "invalid" }, 401);
  }
  if (url.pathname === "/rest/v1/rpc/has_role") {
    const body = await req.json();
    return reply(body._user_id === ADMIN && body._role === "admin");
  }
  if (url.pathname === "/rest/v1/user_roles") {
    return reply(url.searchParams.get("user_id") === `eq.${ADMIN}` ? [{ role: "admin" }] : []);
  }
  if (url.pathname === "/rest/v1/support_tickets") return reply([{ id: TICKET, owner_id: MEMBER, status: "open" }]);
  if (url.pathname === "/rest/v1/web_vitals" && req.method === "POST") return new Response(null, { status: 201 });
  throw new Error(`Unexpected stubbed call: ${req.method} ${url.pathname}`);
};

type Handler = (req: Request) => Promise<Response> | Response;
const realServe = Deno.serve;
async function loadHandler(path: string): Promise<Handler> {
  let handler: Handler | undefined;
  // deno-lint-ignore no-explicit-any
  (Deno as any).serve = (h: Handler) => { handler = h; return { finished: Promise.resolve(), shutdown() {} }; };
  try { await import(path); } finally { (Deno as any).serve = realServe; }
  if (!handler) throw new Error(`No handler registered by ${path}`);
  return handler;
}
const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request("http://local.test/fn", { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
const opts = { sanitizeOps: false, sanitizeResources: false };

const { handleSupport, feedbackSchema } = await import("../support/service.ts");

Deno.test("support feedback schema keeps its rules under Zod 4", opts, () => {
  const ok = feedbackSchema.safeParse({ requestId: crypto.randomUUID(), type: "support", subject: "  Viva  ", message: "Hello", replyEmail: "" });
  assert(ok.success);
  assertEquals(ok.data.subject, "Viva");
  assert(feedbackSchema.safeParse({ type: "error", subject: "x", message: "y", replyEmail: "person@example.test" }).success);
  assert(!feedbackSchema.safeParse({ type: "support", subject: "x", message: "y", replyEmail: "not-an-email" }).success);
  assert(!feedbackSchema.safeParse({ type: "support", subject: "   ", message: "y" }).success);
  assert(!feedbackSchema.safeParse({ type: "support", subject: "x", message: "y".repeat(2001) }).success);
  assert(!feedbackSchema.safeParse({ type: "other", subject: "x", message: "y" }).success);
});

Deno.test("public requests cannot use support admin actions", opts, async () => {
  calls.length = 0;
  for (const body of [{ action: "capabilities" }, { action: "reply", ticketId: TICKET, requestId: crypto.randomUUID(), message: "hi" }, { action: "status", ticketId: TICKET, requestId: crypto.randomUUID(), status: "resolved" }]) {
    assertEquals((await handleSupport(post(body))).status, 401);
    assertEquals((await handleSupport(post(body, { Authorization: "Bearer forged-token" }))).status, 401);
  }
  assert(!calls.some((c) => c.includes("support_") || c.includes("rpc/append")), calls.join());
});

Deno.test("signed-in non-admins stay blocked from admin support actions", opts, async () => {
  const auth = { Authorization: `Bearer ${jwt(MEMBER)}` };
  assertEquals((await handleSupport(post({ action: "capabilities" }, auth))).status, 403);
  calls.length = 0;
  const status = await handleSupport(post({ action: "status", ticketId: TICKET, requestId: crypto.randomUUID(), status: "resolved" }, auth));
  assertEquals(status.status, 403);
  assert(!calls.some((c) => c.startsWith("PATCH") || c.includes("rpc/append")), calls.join());
});

Deno.test("support validation and email capability work for admins without sending", opts, async () => {
  const auth = { Authorization: `Bearer ${jwt(ADMIN)}` };
  assertEquals((await handleSupport(post({ action: "reply", ticketId: "not-a-uuid", requestId: crypto.randomUUID(), message: "hi" }, auth))).status, 400);
  assertEquals((await handleSupport(post({ action: "reply", ticketId: TICKET, requestId: crypto.randomUUID(), message: "" }, auth))).status, 400);
  const cap = await handleSupport(post({ action: "capabilities" }, auth));
  assertEquals(cap.status, 200);
  assertEquals((await cap.json()).ready, false);
});

Deno.test("public feedback validation and honeypot need no storage call", opts, async () => {
  calls.length = 0;
  assertEquals((await handleSupport(post({ type: "support", subject: "", message: "y" }), true)).status, 400);
  const honeypot = await handleSupport(post({ type: "support", subject: "x", message: "y", website: "spam" }), true);
  assertEquals(honeypot.status, 200);
  assertEquals(calls.length, 0, calls.join());
});

Deno.test("ingest-web-vitals validates single and batched samples", opts, async () => {
  const handler = await loadHandler("../../ingest-web-vitals/index.ts");
  const bad = await handler(post({ metric: "XYZ", value: -1, route: "" }));
  assertEquals(bad.status, 400);
  const { error } = await bad.json();
  assert(error.fieldErrors?.metric || error.formErrors?.length, JSON.stringify(error));
  const sample = { metric: "LCP", value: 1200, route: "/" };
  assertEquals((await handler(post(Array.from({ length: 21 }, () => sample)))).status, 400);
  const ok = await handler(post([sample, { ...sample, metric: "CLS", value: 0.05, device_type: "mobile" }]));
  assertEquals(ok.status, 202);
  assertEquals((await ok.json()).count, 2);
});

Deno.test("ingest-lighthouse-run keeps token guard and score limits", opts, async () => {
  const handler = await loadHandler("../../ingest-lighthouse-run/index.ts");
  const summary = { url: "https://anaesthesiacore.app/", scores: { performance: 101, accessibility: 90, best_practices: 90, seo: 90 } };
  assertEquals((await handler(post(summary))).status, 401);
  const bad = await handler(post(summary, { "x-lighthouse-ingest-token": env.LIGHTHOUSE_INGEST_TOKEN }));
  assertEquals(bad.status, 400);
  assert((await bad.json()).details.fieldErrors.scores);
});

Deno.test("run-seo-scan keeps auth guard and body validation", opts, async () => {
  const handler = await loadHandler("../../run-seo-scan/index.ts");
  assertEquals((await handler(post({ base_url: "https://anaesthesiacore.app" }))).status, 401);
  assertEquals((await handler(post({ base_url: "https://anaesthesiacore.app" }, { Authorization: `Bearer ${jwt(MEMBER)}` }))).status, 401);
  const bad = await handler(post({ base_url: "not a url", max_pages: 500 }, { "x-seo-scan-token": env.LIGHTHOUSE_INGEST_TOKEN }));
  assertEquals(bad.status, 400);
  const details = (await bad.json()).details.fieldErrors;
  assert(details.base_url && details.max_pages, JSON.stringify(details));
});

Deno.test("seed-lighthouse-run is admin-only and validates its URL", opts, async () => {
  const handler = await loadHandler("../../seed-lighthouse-run/index.ts");
  assertEquals((await handler(post({ url: "https://anaesthesiacore.app" }))).status, 401);
  assertEquals((await handler(post({ url: "https://anaesthesiacore.app" }, { Authorization: `Bearer ${jwt(MEMBER)}` }))).status, 401);
  const bad = await handler(post({ url: "nope", strategy: "tablet" }, { Authorization: `Bearer ${jwt(ADMIN)}` }));
  assertEquals(bad.status, 400);
  const details = (await bad.json()).details.fieldErrors;
  assert(details.url && details.strategy, JSON.stringify(details));
});

Deno.test("process-podcast-rerecord stays admin-only and rejects bad jobs before any work", opts, async () => {
  const handler = await loadHandler("../../process-podcast-rerecord/index.ts");
  assertEquals((await handler(post({ action: "watchdog" }))).status, 403);
  calls.length = 0;
  const bad = await handler(post({ action: "process", jobId: "not-a-uuid" }, { "x-internal-token": env.SUPABASE_SERVICE_ROLE_KEY }));
  assertEquals(bad.status, 400);
  assert((await bad.json()).error.jobId);
  assertEquals((await handler(post({ action: "rerun" }, { "x-internal-token": env.SUPABASE_SERVICE_ROLE_KEY }))).status, 400);
  assertEquals(calls.length, 0, calls.join());
});

import { describe, it, expect } from "vitest";
import { buildMatcher, classify, notFoundResponse } from "../../cloudflare/not-found-worker";
import manifest from "../../cloudflare/route-manifest.generated.json";

const isKnown = buildMatcher(manifest);
const req = (path: string, method = "GET") => new Request(`https://anaesthesiacore.app${path}`, { method });
const c = (path: string, method?: string) => classify(req(path, method), isKnown);

describe("edge 404 worker", () => {
  it("passes known static, topic and redirect routes", () => {
    for (const p of ["/", "/errata", "/physics", "/physics/gas-laws", "/clinical/depth-of-anaesthesia", "/admin/login"]) expect(c(p)).toBe("pass");
  });
  it("tolerates trailing slash and case like React Router", () => {
    expect(c("/physics/gas-laws/")).toBe("pass");
    expect(c("/Physics/Gas-Laws")).toBe("pass");
  });
  it("404s unknown static and topic paths", () => {
    expect(c("/no-such-page-xyz")).toBe("not-found");
    expect(c("/physics/not-a-real-topic")).toBe("not-found");
    expect(c("/topics/not-a-real-topic")).toBe("not-found");
  });
  it("matches exact drug, reference-topic and diagram records only", () => {
    const drug = manifest.dynamic.drugs[0];
    expect(c(`/drugs/${drug}`)).toBe("pass");
    expect(c(`/reference/drugs/${drug}`)).toBe("pass");
    expect(c(`/reference/topics/${manifest.dynamic.referenceTopics[0]}`)).toBe("pass");
    expect(c(`/dev/diagram-snapshot/${manifest.dynamic.diagrams[0]}`)).toBe("pass");
    expect(c("/drugs/not-a-drug")).toBe("not-found");
    expect(c("/reference/drugs/not-a-drug")).toBe("not-found");
    expect(c("/reference/topics/not-a-topic")).toBe("not-found");
    expect(c(`/drugs/${drug}/extra`)).toBe("not-found");
  });
  it("matches ticket routes by UUID shape only", () => {
    expect(c("/my-enquiries/123e4567-e89b-12d3-a456-426614174000")).toBe("pass");
    expect(c("/my-enquiries/abc")).toBe("not-found");
  });
  it("forwards assets and files to origin", () => {
    for (const p of ["/assets/index-abc.js", "/assets/missing.js", "/sitemap.xml", "/brain-logo.png", "/nope.css"]) expect(c(p)).toBe("pass");
  });
  it("forwards auth callbacks, APIs and the privacy notice", () => {
    for (const p of ["/~oauth/callback", "/~oauth", "/auth/v1/callback", "/api/x", "/functions/v1/x", "/iphone/privacy"]) expect(c(p)).toBe("pass");
  });
  it("ignores query strings when matching", () => {
    expect(classify(new Request("https://anaesthesiacore.app/physics/gas-laws?tab=quiz#x"), isKnown)).toBe("pass");
    expect(classify(new Request("https://anaesthesiacore.app/nope?code=1"), isKnown)).toBe("not-found");
  });
  it("forwards non-GET/HEAD methods", () => {
    expect(c("/no-such-page", "POST")).toBe("pass");
    expect(c("/no-such-page", "OPTIONS")).toBe("pass");
  });
  it("HEAD 404 has no body; GET 404 is noindex HTML", async () => {
    expect(c("/no-such-page", "HEAD")).toBe("not-found");
    const head = notFoundResponse(req("/x", "HEAD"));
    expect(head.status).toBe(404);
    expect(await head.text()).toBe("");
    const get = notFoundResponse(req("/x"));
    expect(get.status).toBe(404);
    expect(get.headers.get("x-robots-tag")).toContain("noindex");
    expect(await get.text()).toContain('name="robots" content="noindex');
  });
});

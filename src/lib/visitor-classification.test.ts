import { describe, expect, it } from "vitest";
import { classifyVisitors } from "./visitor-classification";

const browser = "Mozilla/5.0 AppleWebKit/537.36 Chrome/130.0 Safari/537.36";
const classify = (ua: string | null, extra = {}) => classifyVisitors([{ visitor_id: "a", user_agent: ua, ...extra }]);
describe("visitor estimates", () => {
  it("excludes NotebookLM even with a browser prefix", () => expect(classify(browser + " Google-NotebookLM").automated.has("a")).toBe(true));
  it("excludes declared webdriver automation", () => expect(classify(browser, { automation_detected: true, has_interaction: true }).automated.has("a")).toBe(true));
  it("keeps missing identification unknown", () => expect(classify(null).unknown.has("a")).toBe(true));
  it("does not count arbitrary identification as a browser", () => expect(classify("custom-client/1").unknown.has("a")).toBe(true));
  it("excludes script clients", () => expect(classify("python-requests/2.32").automated.has("a")).toBe(true));
  it("keeps ordinary browsers as estimates without inventing interaction", () => {
    expect(classify(browser).likelyHuman.has("a")).toBe(true);
    expect(classify(browser).interacted.size).toBe(0);
  });
  it("counts recorded interaction separately", () => expect(classify(browser, { has_interaction: true }).interacted.has("a")).toBe(true));
  it("automation on any visit overrides earlier browser evidence", () => {
    const result = classifyVisitors([{ visitor_id: "a", user_agent: browser }, { visitor_id: "a", user_agent: "GPTBot" }]);
    expect(result.likelyHuman.size).toBe(0);
    expect(result.automated.size).toBe(1);
  });
  it("does not exclude YandexBrowser", () => expect(classify(browser + " YaBrowser/24").likelyHuman.has("a")).toBe(true));
});
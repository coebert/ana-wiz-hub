import { describe, expect, it } from "vitest";
import { summariseSurvey } from "./visitor-survey";
const visits = [{ visitor_id: "a", user_agent: "Mozilla/5.0 Chrome/130" }, { visitor_id: "b", user_agent: "GPTBot" }, { visitor_id: "c" }];
describe("survey evidence", () => {
  it("does not promote self-reported people out of automated traffic", () => {
    const rows = summariseSurvey(visits, [{ visitor_id: "b", answer: "person" }]);
    expect(rows[1].people).toBe(1);
    expect(rows[0].people).toBe(0);
  });
  it("uses invitations, not all historic visitors, as response denominator", () => {
    const row = summariseSurvey([...visits, { visitor_id: "d" }], [{ visitor_id: "c", answer: "prefer_not" }])[2];
    expect(row.visitors).toBe(2);
    expect(row.responseRate).toBe(100);
    expect(row.people).toBe(0);
  });
  it("deduplicates browser IDs and counts unanswered invitations", () => {
    const row = summariseSurvey(visits, [{ visitor_id: "a", answer: null }, { visitor_id: "a", answer: null }])[0];
    expect(row.invited).toBe(1);
    expect(row.responded).toBe(0);
    expect(row.responseRate).toBe(0);
  });
  it("keeps uninvited rates unavailable and ignores unrelated visitors", () => {
    const row = summariseSurvey(visits, [{ visitor_id: "other", answer: "person" }])[0];
    expect(row.responseRate).toBeNull();
    expect(row.people).toBe(0);
  });
});
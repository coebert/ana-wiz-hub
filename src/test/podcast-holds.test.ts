import { describe, expect, it } from "vitest";
import { canRecordDraft, holdKeyTerms } from "@/lib/podcastHolds";

describe("held episode review", () => {
  it("only records an approved, reviewed draft", () => {
    expect(canRecordDraft(null)).toBe(false);
    expect(canRecordDraft({ status: "draft", reviewed_by: "u" })).toBe(false);
    expect(canRecordDraft({ status: "approved", reviewed_by: null })).toBe(false);
    expect(canRecordDraft({ status: "approved", reviewed_by: "u" })).toBe(true);
  });
  it("highlights the dose named in the hold reason", () => {
    expect(holdKeyTerms(["advises 10 mL of 10% calcium gluconate"])).toEqual(expect.arrayContaining(["10 mL", "calcium gluconate"]));
  });
});

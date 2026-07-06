import { describe, it, expect, beforeEach } from "vitest";
import { readLocalProgress } from "@/contexts/ProgressContext";
import {
  readRecentFromStorage,
  mergeRecentEntries,
  type RecentTopicEntry,
} from "@/hooks/useRecentTopics";

/**
 * Corruption-tolerance tests for the two localStorage caches that hydrate
 * the signed-in UI: `anaesthesia-core-progress` and
 * `anaesthesia-core-recent-topics`.
 *
 * A user could arrive at re-sign-in with junk in these keys for many
 * reasons — a stale build wrote a different shape, a browser extension
 * mangled the value, a developer edited by hand, quota errors truncated
 * the JSON, etc.
 *
 * Contract enforced here:
 *   1. Reading MUST NOT throw for any corrupted input.
 *   2. Reading MUST return a safely-typed empty (or filtered) value so
 *      the merge step degrades to "cloud only".
 *   3. Feeding the corrupted-then-recovered local value into the merge
 *      MUST yield exactly the cloud rows — junk never leaks into the UI.
 */

const PROGRESS_KEY = "anaesthesia-core-progress";
const RECENT_KEY = "anaesthesia-core-recent-topics";

beforeEach(() => {
  localStorage.clear();
});

describe("readLocalProgress — corrupted shapes fall back to empty Set", () => {
  const cases: Array<[string, string]> = [
    ["invalid JSON", "{not json"],
    ["empty string", ""],
    ["null literal", "null"],
    ["number literal", "42"],
    ["string literal", '"just a string"'],
    ["object (old broken shape)", '{"completedTopics":["a","b"]}'],
    ["nested array", "[[1,2],[3,4]]"],
    ["array of objects", '[{"id":"a"},{"id":"b"}]'],
    ["array of nulls", "[null,null]"],
    ["mixed types (only strings kept)", '["a",1,null,"b",{"x":1}]'],
  ];

  for (const [label, value] of cases) {
    it(`does not throw for ${label}`, () => {
      localStorage.setItem(PROGRESS_KEY, value);
      expect(() => readLocalProgress()).not.toThrow();
    });
  }

  it("returns empty Set for every non-string-array shape", () => {
    for (const [, value] of cases.slice(0, -1)) {
      localStorage.setItem(PROGRESS_KEY, value);
      expect(readLocalProgress().size).toBe(0);
    }
  });

  it("keeps only the string entries from a mixed-type array", () => {
    localStorage.setItem(PROGRESS_KEY, '["a",1,null,"b",{"x":1}]');
    const result = readLocalProgress();
    expect([...result].sort()).toEqual(["a", "b"]);
  });

  it("returns empty Set when key is absent entirely", () => {
    expect(readLocalProgress().size).toBe(0);
  });
});

describe("readRecentFromStorage — corrupted shapes fall back to empty []", () => {
  const cases: Array<[string, string]> = [
    ["invalid JSON", "]]]}}}"],
    ["empty string", ""],
    ["null literal", "null"],
    ["object root", '{"topicId":"a","visitedAt":1}'],
    ["array of strings", '["a","b"]'],
    ["array with wrong-typed fields", '[{"topicId":123,"visitedAt":"nope"}]'],
    ["array missing visitedAt", '[{"topicId":"a"}]'],
    ["array of nulls", "[null,null]"],
  ];

  for (const [label, value] of cases) {
    it(`does not throw for ${label}`, () => {
      localStorage.setItem(RECENT_KEY, value);
      expect(() => readRecentFromStorage()).not.toThrow();
    });
  }

  it("returns [] for every corrupted shape", () => {
    for (const [, value] of cases) {
      localStorage.setItem(RECENT_KEY, value);
      expect(readRecentFromStorage()).toEqual([]);
    }
  });

  it("keeps only well-typed entries from a mixed-validity array", () => {
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify([
        { topicId: "good-1", visitedAt: 100 },
        { topicId: 123, visitedAt: 200 },
        { topicId: "good-2", visitedAt: 150 },
        null,
        { topicId: "no-visited-at" },
        { topicId: "good-3", visitedAt: "not-a-number" },
      ])
    );
    const result = readRecentFromStorage();
    expect(result.map((e) => e.topicId).sort()).toEqual(["good-1", "good-2"]);
  });
});

describe("UI falls back to merged cloud when local is corrupted", () => {
  const cloud: RecentTopicEntry[] = [
    { topicId: "real-a", visitedAt: 100 },
    { topicId: "real-b", visitedAt: 90 },
  ];

  const corruptedShapes: Array<[string, string]> = [
    ["invalid JSON", "{not json"],
    ["wrong root type", '{"topicId":"junk","visitedAt":999}'],
    ["array of strings", '["junk-1","junk-2"]'],
    ["array of objects with wrong types", '[{"topicId":123,"visitedAt":"x"}]'],
    ["null literal", "null"],
  ];

  for (const [label, value] of corruptedShapes) {
    it(`Recent Topics: ${label} → merged result equals cloud exactly`, () => {
      localStorage.setItem(RECENT_KEY, value);
      const local = readRecentFromStorage();
      const merged = mergeRecentEntries(cloud, local, 12);
      expect(merged).toEqual(cloud);
      // No junk id survived into the render set.
      const mergedIds = merged.map((e) => e.topicId);
      expect(mergedIds).not.toContain("junk");
      expect(mergedIds).not.toContain("junk-1");
    });
  }

  it("Progress: corrupted local → hydrated set equals cloud exactly", () => {
    // Simulate ProgressContext's post-sign-in union: cloud ∪ readLocal().
    // With corrupted local, readLocal() must return empty so the union
    // reduces to cloud alone.
    localStorage.setItem(PROGRESS_KEY, '{"completedTopics":["junk"]}');
    const cloudIds = new Set(["real-a", "real-b"]);
    const localIds = readLocalProgress();
    const merged = new Set([...cloudIds, ...localIds]);
    expect([...merged].sort()).toEqual(["real-a", "real-b"]);
    expect(merged.has("junk")).toBe(false);
  });

  it("Progress: mixed-type array keeps only string ids, junk objects dropped", () => {
    localStorage.setItem(
      PROGRESS_KEY,
      '["real-c",{"maliciousObject":true},null,42]'
    );
    const cloudIds = new Set(["real-a"]);
    const localIds = readLocalProgress();
    const merged = new Set([...cloudIds, ...localIds]);
    // Only the well-typed "real-c" survives from local; junk objects gone.
    expect([...merged].sort()).toEqual(["real-a", "real-c"]);
  });
});

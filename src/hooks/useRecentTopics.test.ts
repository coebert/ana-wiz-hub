import { describe, it, expect } from "vitest";
import {
  mergeRecentEntries,
  computeUploadableRecent,
  type RecentTopicEntry,
} from "./useRecentTopics";

/**
 * Unit tests for the Recent Topics union-merge helpers.
 *
 * The sign-out → clear → re-sign-in flow relies on two invariants:
 *
 *   1. The merge is a pure function of (cloud, local). If `signOut()` wipes
 *      localStorage, then `local` is empty at re-signin and the merge MUST
 *      return exactly cloud (no ghosts, no dedupe surprises, no dropped rows).
 *
 *   2. The uploader NEVER schedules a cloud upsert for an entry that is not
 *      present in `local`. If localStorage was cleared, `local === []` and
 *      the uploader must return no rows — even if we've never sync'd before.
 *
 * These two together guarantee that after a clean sign-out, junk seeded into
 * localStorage by anonymous browsing cannot leak into another user's cloud
 * data on their next sign-in.
 */

const entry = (id: string, visitedAt: number): RecentTopicEntry => ({
  topicId: id,
  visitedAt,
});

describe("mergeRecentEntries", () => {
  it("returns cloud unchanged when local is empty (post-signOut scenario)", () => {
    const cloud = [entry("a", 100), entry("b", 90), entry("c", 80)];
    const merged = mergeRecentEntries(cloud, [], 12);
    expect(merged.map((e) => e.topicId)).toEqual(["a", "b", "c"]);
    expect(merged).toEqual(cloud);
  });

  it("never reintroduces seeded local junk when local is empty", () => {
    // Simulates: user signed out (localStorage wiped) → signs in again.
    // Cloud has real progress. There is no local. The junk seeded during
    // the anonymous session is gone before merge runs.
    const cloud = [entry("real-topic-1", 100), entry("real-topic-2", 90)];
    const merged = mergeRecentEntries(cloud, [], 12);
    expect(merged.some((e) => e.topicId === "junk-topic")).toBe(false);
    expect(merged.length).toBe(2);
  });

  it("unions cloud + local when both are populated (unrelated ids)", () => {
    const cloud = [entry("a", 100)];
    const local = [entry("b", 90)];
    const merged = mergeRecentEntries(cloud, local, 12);
    expect(merged.map((e) => e.topicId).sort()).toEqual(["a", "b"]);
  });

  it("prefers the newer visitedAt when both sides share an id", () => {
    const cloud = [entry("a", 100)];
    const localNewer = [entry("a", 200)];
    expect(mergeRecentEntries(cloud, localNewer, 12)[0].visitedAt).toBe(200);

    const localOlder = [entry("a", 50)];
    expect(mergeRecentEntries(cloud, localOlder, 12)[0].visitedAt).toBe(100);
  });

  it("prefers cloud on identical visitedAt ties", () => {
    // Cloud is passed first, so on exact ties the cloud entry wins — this
    // matters when the cloud row carries authoritative metadata.
    const cloud = [{ topicId: "a", visitedAt: 100 } as RecentTopicEntry];
    const local = [{ topicId: "a", visitedAt: 100 } as RecentTopicEntry];
    const merged = mergeRecentEntries(cloud, local, 12);
    expect(merged.length).toBe(1);
    expect(merged[0]).toBe(cloud[0]);
  });

  it("sorts most-recent-first and caps at the requested max", () => {
    const cloud = Array.from({ length: 10 }, (_, i) => entry(`c${i}`, i));
    const local = Array.from({ length: 10 }, (_, i) => entry(`l${i}`, 100 + i));
    const merged = mergeRecentEntries(cloud, local, 5);
    expect(merged.length).toBe(5);
    // Top 5 must be the 5 highest visitedAt values (all from local).
    expect(merged.map((e) => e.topicId)).toEqual([
      "l9",
      "l8",
      "l7",
      "l6",
      "l5",
    ]);
  });

  it("is deterministic and does not mutate its inputs", () => {
    const cloud = [entry("a", 100), entry("b", 50)];
    const local = [entry("c", 75)];
    const cloudCopy = JSON.parse(JSON.stringify(cloud));
    const localCopy = JSON.parse(JSON.stringify(local));
    const first = mergeRecentEntries(cloud, local, 12);
    const second = mergeRecentEntries(cloud, local, 12);
    expect(first).toEqual(second);
    expect(cloud).toEqual(cloudCopy);
    expect(local).toEqual(localCopy);
  });
});

describe("computeUploadableRecent", () => {
  it("uploads nothing when local is empty — the post-signOut invariant", () => {
    // Guards the "no junk leaks into next user's cloud" contract.
    expect(computeUploadableRecent([entry("a", 1)], [])).toEqual([]);
    expect(computeUploadableRecent([], [])).toEqual([]);
  });

  it("uploads only local-only ids, never ids already in cloud", () => {
    const cloud = [entry("a", 1), entry("b", 2)];
    const local = [entry("b", 999), entry("c", 3)];
    const uploadable = computeUploadableRecent(cloud, local);
    expect(uploadable.map((e) => e.topicId)).toEqual(["c"]);
  });

  it("would leak junk ONLY if signOut fails to clear localStorage", () => {
    // Documents the failure mode: if signOut leaves junk in local, and the
    // migrated flag is also gone, this helper WILL schedule an upsert for
    // the junk id. Protection lives in signOut, not here. This test pins
    // that contract so a future refactor doesn't silently change it.
    const cloud = [entry("real", 1)];
    const junkLocal = [entry("junk", 2)];
    const uploadable = computeUploadableRecent(cloud, junkLocal);
    expect(uploadable.map((e) => e.topicId)).toEqual(["junk"]);
  });
});

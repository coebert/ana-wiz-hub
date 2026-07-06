import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CHUNK_RELOAD_COUNT_KEY,
  CHUNK_RELOAD_KEY,
  CHUNK_RELOAD_MAX_ATTEMPTS,
  CHUNK_RELOAD_MIN_INTERVAL_MS,
  isStaleChunkMessage,
  recoverFromStaleChunk,
} from "./stale-chunk-recovery";

describe("isStaleChunkMessage", () => {
  it("matches known Vite/Rollup stale-chunk signals", () => {
    expect(isStaleChunkMessage("Failed to fetch dynamically imported module: /assets/x.js")).toBe(
      true,
    );
    expect(isStaleChunkMessage("Importing a module script failed.")).toBe(true);
    expect(isStaleChunkMessage("error loading dynamically imported module")).toBe(true);
  });

  it("ignores unrelated errors", () => {
    expect(isStaleChunkMessage("TypeError: undefined is not a function")).toBe(false);
    expect(isStaleChunkMessage("")).toBe(false);
  });
});

describe("recoverFromStaleChunk", () => {
  const replace = vi.fn();
  const originalLocation = window.location;

  beforeEach(() => {
    sessionStorage.clear();
    replace.mockClear();
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        ...originalLocation,
        href: "https://example.com/app",
        replace,
      },
    });
    // Stub away browser-only APIs so the helper resolves without touching them.
    (globalThis as unknown as { caches: unknown }).caches = {
      keys: () => Promise.resolve([]),
      delete: () => Promise.resolve(true),
    };
  });

  afterEach(() => {
    Object.defineProperty(window, "location", { writable: true, value: originalLocation });
    delete (globalThis as unknown as { caches?: unknown }).caches;
  });

  it("triggers a cache-busting reload on first invocation", async () => {
    recoverFromStaleChunk();
    await new Promise((r) => setTimeout(r, 0));
    expect(replace).toHaveBeenCalledOnce();
    expect(replace.mock.calls[0][0]).toMatch(/_v=\d+/);
    expect(sessionStorage.getItem(CHUNK_RELOAD_COUNT_KEY)).toBe("1");
  });

  it("skips when called within the throttle window", async () => {
    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
    sessionStorage.setItem(CHUNK_RELOAD_COUNT_KEY, "1");
    recoverFromStaleChunk();
    await new Promise((r) => setTimeout(r, 0));
    expect(replace).not.toHaveBeenCalled();
  });

  it("caps at MAX_ATTEMPTS to avoid reload loops", async () => {
    sessionStorage.setItem(
      CHUNK_RELOAD_KEY,
      String(Date.now() - CHUNK_RELOAD_MIN_INTERVAL_MS - 1000),
    );
    sessionStorage.setItem(CHUNK_RELOAD_COUNT_KEY, String(CHUNK_RELOAD_MAX_ATTEMPTS));
    recoverFromStaleChunk();
    await new Promise((r) => setTimeout(r, 0));
    expect(replace).not.toHaveBeenCalled();
  });
});

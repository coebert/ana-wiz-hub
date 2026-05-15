/**
 * Build version checker.
 *
 * The current build id is baked into the JS bundle as `__APP_VERSION__`
 * (see vite.config.ts) AND injected into index.html as
 *   <meta name="app-version" content="…">.
 *
 * On a fresh deploy the served index.html carries a new id while any
 * already-loaded tab still runs the old bundle — and that old bundle's
 * lazy chunks (hashed) may have been removed from the CDN. We poll the
 * server's index.html periodically and on visibility/focus, compare the
 * meta value, and reload when they diverge so users aren't stranded on
 * a build whose chunks 404.
 */

declare const __APP_VERSION__: string;

const CURRENT_VERSION =
  typeof __APP_VERSION__ === "string" ? __APP_VERSION__ : "dev";

const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 min
const RELOAD_FLAG = "__version_reload__";

export type UpdateHandler = (() => void) | null;

let globalHandler: UpdateHandler = null;

export function setUpdateHandler(handler: UpdateHandler) {
  globalHandler = handler;
}

async function fetchRemoteVersion(): Promise<string | null> {
  try {
    const res = await fetch(`/index.html?_v=${Date.now()}`, {
      cache: "no-store",
      credentials: "same-origin",
    });
    if (!res.ok) return null;
    const html = await res.text();
    const match = html.match(
      /<meta\s+name=["']app-version["']\s+content=["']([^"']+)["']/i,
    );
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function shouldSkipReload(): boolean {
  // Avoid ping-pong: only one auto-reload per session.
  if (sessionStorage.getItem(RELOAD_FLAG)) return true;
  // Don't yank users out of forms / media playback.
  const active = document.activeElement as HTMLElement | null;
  if (active && /^(input|textarea|select)$/i.test(active.tagName)) return true;
  if (active?.isContentEditable) return true;
  const playing = document.querySelector("audio, video");
  if (playing && !(playing as HTMLMediaElement).paused) return true;
  return false;
}

export async function applyUpdate() {
  // Purge SW caches first so the reload pulls fresh HTML + chunks.
  if ("caches" in window) {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch {
      /* ignore */
    }
  }
  location.reload();
}

async function checkOnce() {
  const remote = await fetchRemoteVersion();
  if (!remote || remote === CURRENT_VERSION) return;

  if (globalHandler) {
    globalHandler();
    return;
  }

  // Fallback auto-reload when no React banner is mounted.
  if (shouldSkipReload()) return;
  sessionStorage.setItem(RELOAD_FLAG, "1");
  await applyUpdate();
}

export function startVersionCheck() {
  if (typeof window === "undefined") return;
  // Don't run in dev — Vite serves a freshly transformed index.html every
  // request, so versions would never match.
  if (import.meta.env.DEV) return;

  // Periodic poll.
  window.setInterval(checkOnce, POLL_INTERVAL_MS);

  // Also poll when the user returns to the tab — most common moment a
  // stale tab needs to refresh.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void checkOnce();
  });
  window.addEventListener("focus", () => void checkOnce());

  // First check shortly after boot so an already-stale tab recovers
  // quickly without waiting for the full interval.
  window.setTimeout(checkOnce, 30 * 1000);
}

export const APP_VERSION = CURRENT_VERSION;

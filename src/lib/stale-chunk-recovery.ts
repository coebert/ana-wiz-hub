/**
 * Stale-chunk recovery.
 *
 * After a new deploy, cached HTML in the browser may reference hashed JS
 * bundles that no longer exist on the server. Dynamic `import()` then throws
 * with one of a handful of well-known messages. We catch those, clear caches
 * + service worker registrations, and reload with a cache-busting query
 * param so the user isn't stranded on a blank screen.
 *
 * The recovery is time-throttled (not one-shot) so a failed first reload
 * won't permanently lock the user out, but capped at MAX_ATTEMPTS to avoid
 * reload loops if the problem is something else entirely.
 */

export const CHUNK_RELOAD_KEY = "__chunk_reload_at__";
export const CHUNK_RELOAD_COUNT_KEY = "__chunk_reload_count__";
export const CHUNK_RELOAD_MIN_INTERVAL_MS = 15000;
export const CHUNK_RELOAD_MAX_ATTEMPTS = 3;

const STALE_CHUNK_SIGNALS = [
  "Importing a module script failed",
  "Failed to fetch dynamically imported module",
  "error loading dynamically imported module",
];

export function isStaleChunkMessage(msg: string): boolean {
  return STALE_CHUNK_SIGNALS.some((s) => msg.includes(s));
}

export function recoverFromStaleChunk(): void {
  const last = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) || "0");
  const attempts = Number(sessionStorage.getItem(CHUNK_RELOAD_COUNT_KEY) || "0");
  if (Date.now() - last < CHUNK_RELOAD_MIN_INTERVAL_MS) return;
  if (attempts >= CHUNK_RELOAD_MAX_ATTEMPTS) return;
  sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
  sessionStorage.setItem(CHUNK_RELOAD_COUNT_KEY, String(attempts + 1));

  const finish = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("_v", String(Date.now()));
    window.location.replace(url.toString());
  };

  const tasks: Promise<unknown>[] = [];
  if ("caches" in window) {
    tasks.push(caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))));
  }
  if (navigator.serviceWorker?.getRegistrations) {
    tasks.push(
      navigator.serviceWorker
        .getRegistrations()
        .then((rs) => Promise.all(rs.map((r) => r.unregister()))),
    );
  }
  Promise.allSettled(tasks).finally(finish);
}

/**
 * Attach global error + unhandledrejection listeners that route stale-chunk
 * signals through {@link recoverFromStaleChunk}. Idempotent-safe to call
 * once at app boot.
 */
export function installStaleChunkRecovery(): void {
  window.addEventListener("error", (event) => {
    if (isStaleChunkMessage(event?.message || "")) recoverFromStaleChunk();
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event?.reason;
    const msg = typeof reason === "string" ? reason : reason?.message || "";
    if (isStaleChunkMessage(msg)) recoverFromStaleChunk();
  });
}

/**
 * Unregister any active service worker and drop the CacheStorage entries
 * inside the Lovable preview iframe (or any embedded iframe context). This
 * prevents a stale SW from serving old bundles while the user is iterating
 * inside the preview.
 */
export function unregisterPreviewServiceWorker(): void {
  const isInIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();

  const isPreviewHost =
    window.location.hostname.includes("id-preview--") ||
    window.location.hostname.includes("lovableproject.com");

  if (!(isPreviewHost || isInIframe)) return;

  navigator.serviceWorker?.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
  if ("caches" in window) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
  }
}

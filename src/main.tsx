import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";
import { startVersionCheck } from "./lib/version-check";
import { startWebVitalsReporting } from "./lib/web-vitals-reporter";

// Prevent service worker from interfering with Lovable preview
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch (_e) {
    return true;
  }
})();

const isPreviewHost =
  window.location.hostname.includes("id-preview--") ||
  window.location.hostname.includes("lovableproject.com");

if (isPreviewHost || isInIframe) {
  navigator.serviceWorker?.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
  if ("caches" in window) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
  }
}

// Recover from stale chunk references (e.g. cached HTML pointing to a
// hashed bundle that no longer exists after a new deploy).
// Uses a time-throttled retry (instead of a one-shot flag) so the user is
// never permanently stranded on a blank screen if the first reload still
// serves a stale HTML. Reload includes a cache-busting query param and
// clears any active service worker registrations as well as caches.
const CHUNK_RELOAD_KEY = "__chunk_reload_at__";
const CHUNK_RELOAD_COUNT_KEY = "__chunk_reload_count__";
const CHUNK_RELOAD_MIN_INTERVAL_MS = 15000;
const CHUNK_RELOAD_MAX_ATTEMPTS = 3;

function recoverFromStaleChunk() {
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
      navigator.serviceWorker.getRegistrations().then((rs) => Promise.all(rs.map((r) => r.unregister()))),
    );
  }
  Promise.allSettled(tasks).finally(finish);
}

function isStaleChunkMessage(msg: string): boolean {
  return (
    msg.includes("Importing a module script failed") ||
    msg.includes("Failed to fetch dynamically imported module") ||
    msg.includes("error loading dynamically imported module")
  );
}

window.addEventListener("error", (event) => {
  if (isStaleChunkMessage(event?.message || "")) recoverFromStaleChunk();
});

window.addEventListener("unhandledrejection", (event) => {
  const reason = event?.reason;
  const msg = typeof reason === "string" ? reason : reason?.message || "";
  if (isStaleChunkMessage(msg)) recoverFromStaleChunk();
});

startVersionCheck();
startWebVitalsReporting();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <App />
    </ThemeProvider>
  </HelmetProvider>,
);

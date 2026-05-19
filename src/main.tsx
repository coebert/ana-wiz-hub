import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";
import { startVersionCheck } from "./lib/version-check";

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
window.addEventListener("error", (event) => {
  const msg = event?.message || "";
  if (
    msg.includes("Importing a module script failed") ||
    msg.includes("Failed to fetch dynamically imported module")
  ) {
    if ("caches" in window) {
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .finally(() => {
          if (!sessionStorage.getItem("__chunk_reload__")) {
            sessionStorage.setItem("__chunk_reload__", "1");
            window.location.reload();
          }
        });
    } else if (!sessionStorage.getItem("__chunk_reload__")) {
      sessionStorage.setItem("__chunk_reload__", "1");
      location.reload();
    }
  }
});

startVersionCheck();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);

// Real-User Monitoring (RUM) reporter for Core Web Vitals.
//
// Fires one sendBeacon per metric as pages become hidden/unloaded. Gated
// to the production hosts so we don't pollute the dataset with preview
// or localhost traffic. Errors are swallowed — monitoring must never
// break the app.

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

const PRODUCTION_HOSTS = new Set<string>([
  "anaesthesiacore.app",
  "www.anaesthesiacore.app",
  "ana-wiz-hub.lovable.app",
]);

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const RELEASE_SHA =
  (import.meta.env.VITE_RELEASE_SHA as string | undefined) ??
  (import.meta.env.VITE_COMMIT_SHA as string | undefined) ??
  null;

const ENDPOINT = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/ingest-web-vitals` : null;

function deviceType(): "mobile" | "tablet" | "desktop" | "unknown" {
  const ua = navigator.userAgent || "";
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  if (ua) return "desktop";
  return "unknown";
}

function connection(): string | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (navigator as any).connection;
  return c?.effectiveType ?? null;
}

function sessionId(): string {
  const key = "__wv_session__";
  let s = sessionStorage.getItem(key);
  if (!s) {
    s = crypto.randomUUID();
    sessionStorage.setItem(key, s);
  }
  return s;
}

function report(metric: Metric) {
  if (!ENDPOINT) return;
  const body = JSON.stringify({
    metric: metric.name,
    value: metric.value,
    rating: metric.rating,
    navigation_type: metric.navigationType,
    route: location.pathname,
    release_sha: RELEASE_SHA,
    device_type: deviceType(),
    connection: connection(),
    session_id: sessionId(),
  });
  try {
    // Prefer sendBeacon so it survives page unload; fall back to fetch.
    const blob = new Blob([body], { type: "application/json" });
    if (!navigator.sendBeacon?.(ENDPOINT, blob)) {
      void fetch(ENDPOINT, {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* monitoring must never throw */
  }
}

/**
 * Start the RUM reporter. Safe to call unconditionally — it opts out of
 * every non-production host (preview, localhost, iframes) internally.
 */
export function startWebVitalsReporting() {
  if (typeof window === "undefined") return;
  const host = window.location.hostname;
  if (!PRODUCTION_HOSTS.has(host)) return;
  // Skip when embedded in the Lovable editor preview iframe.
  try {
    if (window.self !== window.top) return;
  } catch {
    return;
  }
  onLCP(report);
  onCLS(report);
  onINP(report);
  onFCP(report);
  onTTFB(report);
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const getVisitorId = (): string => {
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitor_id", id);
  }
  return id;
};

// Capture the referrer for this browser session only once, on first page load.
// After SPA navigation, document.referrer would point at our own pages, so we
// snapshot the original external referrer (if any) into sessionStorage and
// reuse it for every visit logged in the same tab.
const getSessionReferrer = (): string | null => {
  try {
    const cached = sessionStorage.getItem("visit_referrer");
    if (cached !== null) return cached || null;
    const raw = document.referrer || "";
    let value = "";
    if (raw) {
      try {
        const refHost = new URL(raw).host;
        if (refHost && refHost !== window.location.host) value = raw;
      } catch {
        // ignore malformed referrer
      }
    }
    sessionStorage.setItem("visit_referrer", value);
    return value || null;
  } catch {
    return null;
  }
};

export const useVisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) return;

    const visitorId = getVisitorId();
    const referrer = getSessionReferrer();
    let visitId: string | null = null;
    let interacted = false;
    let cancelled = false;
    const reportInteraction = () => {
      if (!visitId || !interacted || cancelled) return;
      supabase.functions.invoke("log-visit", {
        body: { visitor_id: visitorId, visit_id: visitId, event: "interaction" },
      }).then(({ error }) => {
        if (error) console.warn("[visit-tracker] interaction failed", error.message);
      });
      visitId = null;
    };
    const onInteraction = (event: Event) => {
      if (!event.isTrusted || document.visibilityState !== "visible" || interacted) return;
      interacted = true;
      reportInteraction();
    };
    const events = ["pointerdown", "keydown", "touchstart", "wheel"];
    events.forEach(name => window.addEventListener(name, onInteraction, { passive: true }));
    // Route through the log-visit edge function so the server can stamp the
    // visit with the caller's country (cf-ipcountry / ipapi fallback) and
    // classify the traffic source (search/social/direct/referral).
    supabase.functions
      .invoke("log-visit", {
        body: {
          visitor_id: visitorId,
          page_path: location.pathname,
          referrer,
          automation_detected: navigator.webdriver === true,
        },
      })
      .then(({ data, error }) => {
        if (error) console.warn("[visit-tracker] log-visit failed", error.message);
        if (typeof data?.visit_id === "string") {
          visitId = data.visit_id;
          try { sessionStorage.setItem("survey_visit_id", data.visit_id); } catch { /* optional survey */ }
          reportInteraction();
        }
      });
    return () => {
      cancelled = true;
      events.forEach(name => window.removeEventListener(name, onInteraction));
    };
  }, [location.pathname]);
};

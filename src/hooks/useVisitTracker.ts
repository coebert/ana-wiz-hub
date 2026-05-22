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

export const useVisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin pages
    if (location.pathname.startsWith("/admin")) return;

    const visitorId = getVisitorId();
    // Route through the log-visit edge function so the server can stamp the
    // visit with the caller's country (cf-ipcountry / ipapi fallback).
    supabase.functions
      .invoke("log-visit", {
        body: { visitor_id: visitorId, page_path: location.pathname },
      })
      .then(({ error }) => {
        if (error) console.warn("[visit-tracker] log-visit failed", error.message);
      });
  }, [location.pathname]);
};

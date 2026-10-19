import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { SurveyAnswer } from "@/lib/visitor-survey";

const storageKey = "visitor_survey_v1_done";
export function VisitorSurvey() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [evidence, setEvidence] = useState<{ visitor_id: string; visit_id: string } | null>(null);
  const excluded = pathname.startsWith("/admin") || pathname.startsWith("/auth") || pathname === "/login";
  useEffect(() => {
    if (excluded) return;
    const timer = window.setTimeout(async () => {
      try {
        if (localStorage.getItem(storageKey) || document.visibilityState !== "visible") return;
        const visitor_id = localStorage.getItem("visitor_id");
        const visit_id = sessionStorage.getItem("survey_visit_id");
        if (!visitor_id || !visit_id) return;
        const body = { visitor_id, visit_id };
        setEvidence(body);
        setOpen(true);
        const { error } = await supabase.functions.invoke("visitor-survey", { body: { ...body, event: "shown" } });
        if (error) setError("Survey connection unavailable. You can still try submitting.");
      } catch { /* Browser storage unavailable: do not prompt. */ }
    }, 20000);
    return () => window.clearTimeout(timer);
  }, [excluded, pathname]);
  const close = () => {
    setOpen(false);
    try { localStorage.setItem(storageKey, "dismissed"); } catch { /* optional */ }
  };
  const answer = async (value: SurveyAnswer) => {
    if (!evidence) return;
    setSaving(true);
    setError("");
    const { error } = await supabase.functions.invoke("visitor-survey", { body: { ...evidence, event: "answer", answer: value } });
    setSaving(false);
    if (error) { setError("Your answer wasn’t saved. Please try again."); return; }
    setSaved(true);
    try { localStorage.setItem(storageKey, "answered"); } catch { /* optional */ }
  };
  if (!open || excluded) return null;
  return <aside aria-label="Visitor survey" className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-40 rounded-lg border border-border bg-card text-card-foreground shadow-lg p-4">
    <div className="flex items-start justify-between gap-3">
      <h2 className="font-semibold flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Visitor survey</h2>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" aria-label="Dismiss visitor survey" onClick={close}><X className="h-4 w-4" /></Button>
    </div>
    {saved ? <p role="status" className="mt-3 flex items-center gap-2"><Check className="h-4 w-4" /> Thank you — your answer is saved.</p> : <>
      <p className="mt-2 font-medium">Are you a person using AnaesthesiaCore, or an automated tool?</p>
      <p className="mt-2 text-xs text-muted-foreground">Optional. No name or email requested. Your answer is linked to this browser’s visitor ID to compare with traffic estimates.</p>
      <div className="mt-3 flex flex-col gap-2">
        <Button variant="outline" disabled={saving} onClick={() => answer("person")}>I’m a person</Button>
        <Button variant="outline" disabled={saving} onClick={() => answer("automated")}>Automated tool or test</Button>
        <Button variant="ghost" disabled={saving} onClick={() => answer("prefer_not")}>Prefer not to say</Button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
    </>}
  </aside>;
}
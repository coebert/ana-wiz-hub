import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { summariseSurvey, type SurveyResponse } from "@/lib/visitor-survey";
import type { VisitorEvidence } from "@/lib/visitor-classification";

export function VisitorSurveyPanel({ visits }: { visits: ReadonlyArray<VisitorEvidence> }) {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = async () => {
    setLoading(true);
    setError("");
    const rows: SurveyResponse[] = [];
    let cursor: string | null = null;
    for (;;) {
      let query = supabase.from("visitor_survey_responses").select("visitor_id, answer").order("visitor_id").limit(1000);
      if (cursor) query = query.gt("visitor_id", cursor);
      const { data, error } = await query;
      if (error) { setError("Survey results are unavailable. Please retry."); setLoading(false); return; }
      rows.push(...(data ?? []) as SurveyResponse[]);
      if (!data || data.length < 1000) break;
      cursor = data[data.length - 1].visitor_id;
    }
    setResponses(rows);
    setLoading(false);
  };
  useEffect(() => { void load(); }, []);
  const groups = useMemo(() => summariseSurvey(visits, responses), [visits, responses]);
  const totals = groups.reduce((sum, row) => ({ people: sum.people + row.people, responded: sum.responded + row.responded, invited: sum.invited + row.invited }), { people: 0, responded: 0, invited: 0 });
  return <section aria-label="Visitor survey results" className="my-6 border-y border-border py-5">
    <div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">Visitor survey results</h2><Button variant="ghost" size="icon" onClick={load} disabled={loading} aria-label="Refresh survey results"><RefreshCw className="h-4 w-4" /></Button></div>
    {error ? <p role="alert" className="text-destructive mt-3">{error}</p> : loading ? <p className="mt-3 text-muted-foreground">Loading survey results…</p> : <>
      <p className="my-3"><strong>{totals.people.toLocaleString()} self-reported people</strong> · {totals.responded.toLocaleString()} responses from {totals.invited.toLocaleString()} invited browser IDs.</p>
      <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead><tr className="border-b border-border">{["Classification", "Visitor IDs", "Invited", "Responses", "Said person", "Said automated", "Prefer not", "Response rate"].map(label => <th key={label} className="py-2 pr-4 whitespace-nowrap font-medium">{label}</th>)}</tr></thead>
        <tbody>{groups.map(row => <tr key={row.group} className="border-b border-border"><th className="py-3 pr-4 font-medium whitespace-nowrap">{{ likelyHuman: "Likely human", automated: "Automated", unknown: "Uncertain" }[row.group]}</th>{[row.visitors, row.invited, row.responded, row.people, row.automated, row.preferNot].map((value, i) => <td key={i} className="py-3 pr-4 tabular-nums">{value.toLocaleString()}</td>)}<td className="py-3 tabular-nums">{row.responseRate === null ? "—" : `${row.responseRate.toFixed(1)}%`}</td></tr>)}</tbody></table></div>
      <p className="mt-3 text-xs text-muted-foreground">Survey records since launch, matched to visitor IDs in the selected dashboard period. One first answer per browser ID. Response rate uses recorded invitations, not all historical visitors. Dismissals are not answers.</p>
      <p className="mt-2 text-xs text-muted-foreground">Voluntary answers are self-reports, not verified identity. Bots can answer and people may decline; do not extrapolate this sample to all visitors. Answers do not override the traffic classification.</p>
    </>}
  </section>;
}
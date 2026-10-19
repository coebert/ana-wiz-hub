import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ChevronDown, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { allTopics } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { averageStudySeconds, type LearningProgress } from '@/lib/learning-progress';
function duration(seconds: number) {
  if (seconds < 60) return `${Math.round(seconds)} s`;
  const m = Math.floor(seconds / 60);
  return m < 60 ? `${m} m` : `${Math.floor(m / 60)} h ${m % 60} m`;
}
export default function LearningProgressPanel() {
  const [range, setRange] = useState('all');
  const [revision, setRevision] = useState(0);
  const [data, setData] = useState<LearningProgress | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError('');
    const end = new Date(); const start = new Date(end);
    start.setUTCDate(start.getUTCDate() - (range === '7' ? 6 : 29));
    supabase.rpc('admin_topic_learning_progress', { _from: range === 'all' ? undefined : start.toISOString().slice(0, 10), _to: end.toISOString().slice(0, 10) }).then(({ data: result, error: failure }) => {
      if (cancelled) return;
      setLoading(false);
      if (failure) { setError('Learning progress is unavailable. Please try again.'); setData(null); return; }
      setData(result as unknown as LearningProgress);
    });
    return () => { cancelled = true; };
  }, [range, revision]);
  const title = (id: string) => allTopics.find(t => t.id === id)?.title ?? id;
  const topics = data?.topics.filter(t => title(t.topic_id).toLowerCase().includes(query.toLowerCase())) ?? [];
  return <section className="border-t border-border py-6 space-y-4" aria-labelledby="learning-progress-title">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="learning-progress-title" className="text-xl font-semibold text-foreground">Learning progress by topic</h2><div className="flex gap-1">{['all', '7', '30'].map(value => <Button key={value} size="sm" variant={range === value ? 'default' : 'outline'} onClick={() => setRange(value)}>{value === 'all' ? 'All time' : `${value} days`}</Button>)}<Button size="icon" variant="ghost" aria-label="Refresh learning progress" title="Refresh learning progress" onClick={() => setRevision(v => v + 1)}><RefreshCw className="h-4 w-4" /></Button></div></div>
    <p className="text-sm text-muted-foreground">Signed-in accounts only. Completions are learner-marked, not assessed mastery. Time is estimated on visible topic pages, pausing after 90 seconds without interaction. Anonymous study stays on the learner’s device.</p>
    <p className="text-xs text-muted-foreground">Completion dates use UTC; study time uses the learner’s local day. Totals show currently saved completions, not a permanent history. Older time records may include tracking inaccuracies.</p>
    {error ? <p role="alert" className="text-destructive">{error}</p> : loading ? <p role="status" className="text-muted-foreground">Loading learning progress…</p> : data && <>
      <dl className="grid grid-cols-3 gap-4 border-y border-border py-4">{[['Learning accounts', data.learners.toLocaleString()], ['Marked completions', data.completions.toLocaleString()], ['Active study time', duration(data.seconds)]].map(([label, value]) => <div key={label}><dt className="text-xs text-muted-foreground">{label}</dt><dd className="text-xl font-semibold text-foreground tabular-nums">{value}</dd></div>)}</dl>
      <Input aria-label="Filter learning topics" placeholder="Search topics" value={query} onChange={e => setQuery(e.target.value)} className="max-w-sm" />
      <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="border-b border-border text-muted-foreground"><tr>{['Topic', 'Accounts', 'Completions', 'Active time', 'Average / timed account'].map(label => <th key={label} className="p-2 font-medium">{label}</th>)}</tr></thead><tbody>{topics.map(topic => {
        const t = allTopics.find(t => t.id === topic.topic_id);
        return <Fragment key={topic.topic_id}><tr className="border-b border-border"><td className="p-2 min-w-[240px]"><div className="flex items-center gap-1"><Button size="icon" variant="ghost" aria-label={`Show learner progress for ${title(topic.topic_id)}`} aria-expanded={expanded === topic.topic_id} onClick={() => setExpanded(expanded === topic.topic_id ? null : topic.topic_id)}>{expanded === topic.topic_id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</Button>{t ? <Link className="text-primary underline" to={`/${t.section}/${t.id}`}>{t.title}</Link> : title(topic.topic_id)}</div></td><td className="p-2">{topic.learners}</td><td className="p-2">{topic.completions}</td><td className="p-2 whitespace-nowrap">{duration(topic.seconds)}</td><td className="p-2 whitespace-nowrap">{topic.timed_learners ? duration(averageStudySeconds(topic)) : '—'}</td></tr>{expanded === topic.topic_id && topic.accounts.map(a => <tr key={a.account_id} className="border-b border-border bg-muted/30 text-muted-foreground"><td className="p-2 pl-12">Account {a.account_id.slice(0, 8)}</td><td className="p-2">{a.subsection_ticks} subsections</td><td className="p-2">{a.completed_at ? `Completed ${a.completed_at.slice(0, 10)}` : 'Not marked complete'}</td><td className="p-2 whitespace-nowrap">{duration(a.seconds)}</td><td className="p-2">—</td></tr>)}</Fragment>;
      })}</tbody></table></div>{topics.length === 0 && <p className="text-muted-foreground">No saved learning progress for these topics and dates.</p>}
    </>}
  </section>;
}
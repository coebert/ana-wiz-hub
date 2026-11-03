import { useEffect, useState } from 'react';
import { Megaphone, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { readAnnouncement, saveAnnouncement, validateAnnouncement } from '@/lib/home-announcement';

export default function AnnouncementEditor() {
  const { user } = useAuth();
  const [allowed, setAllowed] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    let active = true;
    setAllowed(false); setReady(false);
    async function load() {
      const { data, error: accessError } = await supabase.rpc('can_edit_home_announcement');
      if (!active || accessError || data !== true) return;
      setAllowed(true);
      try {
        const value = await readAnnouncement();
        if (active) { setMessage(value.message); setEnabled(value.enabled); setReady(true); }
      } catch { if (active) setError('Could not load the announcement. Reload to try again.'); }
    }
    if (user) void load();
    return () => { active = false; };
  }, [user?.id]);
  if (!allowed) return null;
  async function save() {
    const invalid = validateAnnouncement(message, enabled);
    if (invalid) { setError(invalid); return; }
    setBusy(true); setError(''); setSaved(false);
    try { await saveAnnouncement(message, enabled); setSaved(true); }
    catch { setError('Announcement not saved. Check your connection and owner sign-in, then try again.'); }
    finally { setBusy(false); }
  }
  return <section aria-labelledby="announcement-heading" className="space-y-4 border-b border-border pb-6">
    <h2 id="announcement-heading" className="flex items-center gap-2 text-xl font-serif font-bold"><Megaphone className="h-5 w-5" />Home announcement</h2>
    <div className="flex min-h-11 items-center gap-3"><Switch id="announcement-enabled" checked={enabled} disabled={!ready || busy} onCheckedChange={value => { setEnabled(value); setSaved(false); }} /><Label htmlFor="announcement-enabled">Show banner on home screens</Label></div>
    <div className="space-y-2"><Label htmlFor="announcement-message">Message</Label><Textarea id="announcement-message" value={message} disabled={!ready || busy} rows={4} onChange={event => { setMessage(event.target.value); setSaved(false); }} /><p className="text-sm text-muted-foreground">{Array.from(message).length.toLocaleString()} / 5,000 characters</p></div>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    {saved && <p role="status" className="text-sm text-muted-foreground">Saved — banner {enabled ? 'on' : 'off'}.</p>}
    <Button disabled={!ready || busy} onClick={save} className="min-h-11"><Save className="mr-2 h-4 w-4" />{busy ? 'Saving…' : 'Save announcement'}</Button>
  </section>;
}
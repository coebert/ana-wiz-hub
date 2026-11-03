import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Megaphone, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { readAnnouncement, type Announcement } from '@/lib/home-announcement';

export function AnnouncementStrip({ message }: { message: string }) {
  const [paused, setPaused] = useState(false);
  const copy = useRef<HTMLSpanElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = copy.current;
    if (!element) return;
    const measure = () => track.current?.style.setProperty('--announcement-duration', `${Math.max(30, (element.offsetWidth + 64) / 28)}s`);
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, [message]);
  return <aside aria-label="News from AnaesthesiaCore" className="announcement-strip flex w-full items-center gap-3 border-b border-border bg-secondary px-4 text-secondary-foreground">
    <Megaphone className="h-4 w-4 shrink-0" aria-hidden="true" />
    <p className="sr-only">{message}</p>
    <div className="announcement-window min-w-0 flex-1 overflow-hidden" aria-hidden="true">
      <div ref={track} className={`announcement-track ${paused ? 'announcement-paused' : ''}`}>
        <span ref={copy} className="announcement-copy">{message}</span>
        <span className="announcement-copy announcement-duplicate">{message}</span>
      </div>
    </div>
    <Button variant="ghost" size="icon" className="announcement-pause h-11 w-11 shrink-0" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Resume announcement scrolling' : 'Pause announcement scrolling'} title={paused ? 'Resume scrolling' : 'Pause scrolling'}>
      {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
    </Button>
  </aside>;
}

function ActiveHomeAnnouncement() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  useEffect(() => {
    let active = true;
    const refresh = () => { readAnnouncement().then(value => { if (active) setAnnouncement(value); }).catch(() => { if (active) setAnnouncement(null); }); };
    refresh();
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener('focus', refresh);
    window.addEventListener('announcement-updated', refresh);
    return () => { active = false; clearInterval(timer); window.removeEventListener('focus', refresh); window.removeEventListener('announcement-updated', refresh); };
  }, []);
  return announcement?.enabled && announcement.message.trim() ? <AnnouncementStrip message={announcement.message} /> : null;
}
export default function HomeAnnouncement() {
  const { pathname } = useLocation();
  return pathname === '/' || pathname === '/revise' ? <ActiveHomeAnnouncement /> : null;
}
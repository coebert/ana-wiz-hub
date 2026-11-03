import { supabase } from '@/integrations/supabase/client';

export const ANNOUNCEMENT_LIMIT = 5000;
export type Announcement = { message: string; enabled: boolean };
export function validateAnnouncement(message: string, enabled: boolean): string | null {
  if (Array.from(message).length > ANNOUNCEMENT_LIMIT) return 'Keep your message within 5,000 characters.';
  if (enabled && !message.trim()) return 'Enter a message before turning the banner on.';
  return null;
}
export async function readAnnouncement(): Promise<Announcement> {
  const { data, error } = await supabase.from('home_announcement').select('message, enabled').eq('id', true).maybeSingle();
  if (error) throw error;
  return data ?? { message: '', enabled: false };
}
export async function saveAnnouncement(message: string, enabled: boolean): Promise<void> {
  const invalid = validateAnnouncement(message, enabled);
  if (invalid) throw new Error(invalid);
  const { error } = await supabase.rpc('save_home_announcement', { _message: message, _enabled: enabled });
  if (error) throw error;
  window.dispatchEvent(new Event('announcement-updated'));
}
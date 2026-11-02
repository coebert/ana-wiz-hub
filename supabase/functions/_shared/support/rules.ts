export type Actor = { id: string; email?: string; name?: string; admin: boolean };
export const canAccess = (actor: Actor | null, owner: string | null) => !!actor && (actor.admin || actor.id === owner);
export function senderDomain(address: string): string | null {
  const match = /^[^\s<>@]+@([^\s<>@]+\.[^\s<>@]+)$/.exec(address);
  if (!match || match[1].toLowerCase() === 'resend.dev') return null;
  return match[1].toLowerCase();
}
export function verifiedSender(address: string, domains: {name: string; status: string}[]): boolean {
  const domain = senderDomain(address);
  return !!domain && domains.some(d => d.name.toLowerCase() === domain && d.status === 'verified');
}
export function contactIdentity(actor: Actor | null, typed: {name?: string; replyEmail?: string}) {
  return { owner: actor?.id ?? null, name: actor?.name ?? typed.name ?? '', email: actor?.email ?? typed.replyEmail ?? null };
}
export async function persistThenNotify<T extends {duplicate: boolean; message: {id: string}}>(
  persist: () => Promise<T>, notify: (saved: T) => Promise<{status: string; error?: string}>,
  record: (id: string, status: string, error?: string) => Promise<void>,
) {
  const saved = await persist();
  if (saved.duplicate) return saved;
  let delivery: {status: string; error?: string};
  try { delivery = await notify(saved); }
  catch { delivery = {status: 'failed', error: 'Email delivery failed; message remains saved.'}; }
  try { await record(saved.message.id, delivery.status, delivery.error); } catch { /* Saved is authoritative; never retry sending blindly. */ }
  return {...saved, delivery};
}

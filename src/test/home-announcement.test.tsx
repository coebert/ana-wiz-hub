import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ rpc: vi.fn(), read: vi.fn(), save: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { rpc: mocks.rpc } }));
vi.mock('@/hooks/useAuth', () => ({ useAuth: () => ({ user: { id: 'owner' } }) }));
vi.mock('@/lib/home-announcement', async importOriginal => ({ ...await importOriginal<typeof import('@/lib/home-announcement')>(), readAnnouncement: mocks.read, saveAnnouncement: mocks.save }));
import { validateAnnouncement } from '@/lib/home-announcement';
import AnnouncementEditor from '@/components/admin/AnnouncementEditor';

afterEach(cleanup);
beforeEach(() => { vi.clearAllMocks(); mocks.rpc.mockResolvedValue({ data: true, error: null }); mocks.read.mockResolvedValue({ message: 'Existing news', enabled: false }); mocks.save.mockResolvedValue(undefined); });
describe('announcement rules', () => {
  it('rejects enabling an empty message', () => expect(validateAnnouncement('  ', true)).not.toBeNull());
  it('allows clearing a disabled message', () => expect(validateAnnouncement('', false)).toBeNull());
  it('enforces the 5000 character boundary', () => { expect(validateAnnouncement('a'.repeat(5000), true)).toBeNull(); expect(validateAnnouncement('a'.repeat(5001), true)).not.toBeNull(); });
  it('counts Unicode characters rather than UTF16 units', () => expect(validateAnnouncement('😀'.repeat(5000), true)).toBeNull());
  it('does not expose editing to a denied account', async () => { mocks.rpc.mockResolvedValue({ data: false }); render(<AnnouncementEditor />); await waitFor(() => expect(mocks.rpc).toHaveBeenCalled()); expect(screen.queryByLabelText('Message')).toBeNull(); expect(mocks.read).not.toHaveBeenCalled(); });
  it('fails closed when ownership check fails', async () => { mocks.rpc.mockResolvedValue({ data: null, error: {} }); render(<AnnouncementEditor />); await waitFor(() => expect(mocks.rpc).toHaveBeenCalled()); expect(mocks.read).not.toHaveBeenCalled(); });
  it('saves the edited message and enabled switch together', async () => { render(<AnnouncementEditor />); const input = await screen.findByLabelText('Message'); fireEvent.change(input, { target: { value: 'New news' } }); fireEvent.click(screen.getByRole('switch')); fireEvent.click(screen.getByRole('button', { name: 'Save announcement' })); await waitFor(() => expect(mocks.save).toHaveBeenCalledWith('New news', true)); });
  it('reports a failed save without claiming success', async () => { mocks.save.mockRejectedValue(new Error('offline')); render(<AnnouncementEditor />); await screen.findByLabelText('Message'); fireEvent.click(screen.getByRole('button', { name: 'Save announcement' })); expect(await screen.findByRole('alert')).toBeTruthy(); expect(screen.queryByRole('status')).toBeNull(); });
});
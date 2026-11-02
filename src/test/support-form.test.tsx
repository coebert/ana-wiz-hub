import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SupportSection } from '@/components/feedback/SupportSection';
const {invoke}=vi.hoisted(()=>({invoke:vi.fn()}));
vi.mock('@/integrations/supabase/client',()=>({supabase:{functions:{invoke},from:vi.fn()}}));
beforeEach(()=>{invoke.mockReset();});afterEach(cleanup);
function fill() {
 render(<MemoryRouter><SupportSection /></MemoryRouter>);
 fireEvent.click(screen.getByRole('button',{name:'Contact support / send feedback'}));
 fireEvent.change(screen.getByLabelText('Subject'),{target:{value:'Viva offline'}});
 fireEvent.change(screen.getByLabelText('Details'),{target:{value:'Please help with the unavailable viva.'}});
}
describe('enquiry form submission safety',()=>{
 it('locks rapid clicks until the submission completes',async()=>{
  let finish: (value:unknown)=>void=()=>{};
  invoke.mockImplementation(()=>new Promise(resolve=>{finish=resolve;})); fill();
  fireEvent.click(screen.getByRole('button',{name:'Send feedback'}));
  fireEvent.submit(screen.getByLabelText('Subject').closest('form') as HTMLFormElement);
  expect(invoke).toHaveBeenCalledTimes(1);
  finish({data:{success:true,ticketId:'ticket'},error:null});
  await waitFor(()=>expect(screen.queryByLabelText('Details')).not.toBeInTheDocument());
 });
 it('reuses the request id after an uncertain failure',async()=>{
  invoke.mockResolvedValueOnce({error:{message:'network timeout'}}).mockResolvedValueOnce({data:{success:true},error:null});fill();
  fireEvent.click(screen.getByRole('button',{name:'Send feedback'}));
  await waitFor(()=>expect(screen.getByRole('button',{name:'Send feedback'})).not.toBeDisabled());
  fireEvent.click(screen.getByRole('button',{name:'Send feedback'}));
  await waitFor(()=>expect(invoke).toHaveBeenCalledTimes(2));
  expect(invoke.mock.calls[0][1].body.requestId).toBe(invoke.mock.calls[1][1].body.requestId);
 });
});

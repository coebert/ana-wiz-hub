-- Make the "service-role only" intent explicit so the linter stops flagging
-- kb_chunks as RLS-enabled-without-policy. Service role bypasses RLS anyway.
create policy "kb_chunks: no direct access"
  on public.kb_chunks
  for all
  to anon, authenticated
  using (false)
  with check (false);

-- Lock down the SECURITY DEFINER similarity search to service_role only.
revoke execute on function public.match_kb_chunks(vector, int) from public;
revoke execute on function public.match_kb_chunks(vector, int) from anon;
revoke execute on function public.match_kb_chunks(vector, int) from authenticated;
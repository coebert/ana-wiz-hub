comment on table private.ai_relay_smoke_cde444d8_gate is 'TEMPORARY: one-run relay smoke gate, hard sunset 2026-11-19T10:50:00Z; retire after use.';
create function public.consume_ai_relay_smoke_cde444d8(presented_sha256 text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare
  changed integer;
begin
  if pg_catalog.clock_timestamp() >= timestamptz '2026-11-19 10:50:00+00' then return false; end if;
  if presented_sha256 is null or presented_sha256 !~ '^[0-9a-f]{64}$' then return false; end if;
  update private.ai_relay_smoke_cde444d8_gate g
     set consumed_at = pg_catalog.clock_timestamp()
   where g.id = 1
     and g.nonce_sha256 = presented_sha256
     and g.consumed_at is null
     and g.expires_at > pg_catalog.clock_timestamp();
  get diagnostics changed = row_count;
  return changed = 1;
end;
$$;
revoke all on function public.consume_ai_relay_smoke_cde444d8(text) from public, anon, authenticated;
grant execute on function public.consume_ai_relay_smoke_cde444d8(text) to service_role;
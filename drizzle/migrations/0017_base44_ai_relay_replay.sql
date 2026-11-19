create schema if not exists private;
create table private.base44_ai_relay_requests (
  jti uuid primary key,
  operation text not null check (operation in ('chat','speech','embeddings')),
  accepted_at timestamptz not null default clock_timestamp()
);
create index base44_ai_relay_requests_window on private.base44_ai_relay_requests (operation, accepted_at);
revoke all on private.base44_ai_relay_requests from public, anon, authenticated;
alter table private.base44_ai_relay_requests enable row level security;

create function public.reserve_base44_ai_request(request_jti uuid, kind text, expires_at_s bigint)
returns integer language plpgsql security definer set search_path = '' as $$
declare
  stamp timestamptz;
  accepted integer;
begin
  if kind is null or kind not in ('chat','speech','embeddings') then return 401; end if;
  perform pg_catalog.pg_advisory_xact_lock(724913, case kind when 'chat' then 1 when 'speech' then 2 else 3 end);
  stamp := pg_catalog.clock_timestamp();
  if request_jti is null or expires_at_s is null or pg_catalog.to_timestamp(expires_at_s) <= stamp or pg_catalog.to_timestamp(expires_at_s) > stamp + interval '47 seconds' then return 401; end if;
  delete from private.base44_ai_relay_requests where operation = kind and accepted_at < stamp - interval '2 minutes';
  if exists (select 1 from private.base44_ai_relay_requests where jti = request_jti) then return 409; end if;
  if (select count(*) from private.base44_ai_relay_requests where operation = kind and accepted_at > stamp - interval '1 minute') >=
    (case kind when 'chat' then 90 when 'speech' then 180 else 60 end) then return 429; end if;
  insert into private.base44_ai_relay_requests(jti,operation,accepted_at) values(request_jti,kind,stamp) on conflict (jti) do nothing;
  get diagnostics accepted = row_count;
  if accepted = 0 then return 409; end if;
  return 204;
end;
$$;
revoke all on function public.reserve_base44_ai_request(uuid,text,bigint) from public, anon, authenticated;
grant execute on function public.reserve_base44_ai_request(uuid,text,bigint) to service_role;
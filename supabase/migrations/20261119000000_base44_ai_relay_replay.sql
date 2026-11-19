-- Drizzle 0017 owns this deployment on Lovable. Standalone Supabase databases
-- may not have that ledger. Reuse only an exact, access-controlled installation.
begin;
do $compat$
declare
  receipt regclass := pg_catalog.to_regclass('private.base44_ai_relay_requests');
  lookup_index regclass := pg_catalog.to_regclass('private.base44_ai_relay_requests_window');
  reserve_rpc regprocedure := pg_catalog.to_regprocedure('public.reserve_base44_ai_request(uuid,text,bigint)');
  rpc_count integer;
  expected_body constant text := $reserve$
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
$reserve$;
begin
  select count(*) into rpc_count from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'reserve_base44_ai_request';

  if receipt is null and lookup_index is null and reserve_rpc is null and rpc_count = 0 then
    create schema if not exists private;
    create table private.base44_ai_relay_requests (
      jti uuid primary key,
      operation text not null check (operation in ('chat','speech','embeddings')),
      accepted_at timestamptz not null default clock_timestamp()
    );
    create index base44_ai_relay_requests_window on private.base44_ai_relay_requests (operation, accepted_at);
    revoke all on private.base44_ai_relay_requests from public, anon, authenticated;
    alter table private.base44_ai_relay_requests enable row level security;

    execute format($create$create function public.reserve_base44_ai_request(request_jti uuid, kind text, expires_at_s bigint)
      returns integer language plpgsql security definer set search_path = '' as %L$create$, expected_body);
    revoke all on function public.reserve_base44_ai_request(uuid,text,bigint) from public, anon, authenticated;
    grant execute on function public.reserve_base44_ai_request(uuid,text,bigint) to service_role;
    return;
  end if;

  if receipt is null or lookup_index is null or reserve_rpc is null or rpc_count <> 1 then
    raise exception 'Incomplete or ambiguous Base44 replay installation. No existing object was changed.';
  end if;

  -- Check live columns, defaults, constraints and indexes. Extra columns,
  -- defaults, constraints, triggers or row policies may change the RPC's behavior.
  if not exists (
    select 1 from pg_catalog.pg_class r
    where r.oid = receipt and r.relkind = 'r' and r.relpersistence = 'p'
      and r.relrowsecurity and not r.relforcerowsecurity and not r.relispartition
      and not exists (select 1 from pg_catalog.pg_inherits where inhrelid = receipt or inhparent = receipt)
      and not exists (select 1 from pg_catalog.pg_policy where polrelid = receipt)
      and not exists (select 1 from pg_catalog.pg_trigger where tgrelid = receipt and not tgisinternal)
  ) or (select array_agg(array[a.attname::text, pg_catalog.format_type(a.atttypid, a.atttypmod),
                  a.attnotnull::text, coalesce(pg_catalog.pg_get_expr(d.adbin, d.adrelid), '')]
                  order by a.attnum)
        from pg_catalog.pg_attribute a left join pg_catalog.pg_attrdef d
          on d.adrelid = a.attrelid and d.adnum = a.attnum
        where a.attrelid = receipt and a.attnum > 0 and not a.attisdropped)
       is distinct from array[['jti','uuid','true',''],['operation','text','true',''],
                             ['accepted_at','timestamp with time zone','true','clock_timestamp()']]
     or (select count(*) from pg_catalog.pg_constraint where conrelid = receipt and contype in ('p','u','c','f','x')) <> 2
     or not exists (select 1 from pg_catalog.pg_constraint where conrelid = receipt
          and contype = 'p' and conkey = array[1]::smallint[] and convalidated and not condeferrable)
     or not exists (select 1 from pg_catalog.pg_constraint where conrelid = receipt and contype = 'c'
          and convalidated and not connoinherit and
          regexp_replace(pg_catalog.pg_get_expr(conbin, conrelid), '[[:space:]()]', '', 'g') =
            'operation=ANYARRAY[''chat''::text,''speech''::text,''embeddings''::text]')
     or (select count(*) from pg_catalog.pg_index where indrelid = receipt) <> 2
     or not exists (select 1 from pg_catalog.pg_index i where i.indexrelid = lookup_index
          and i.indrelid = receipt and i.indisvalid and i.indisready and i.indislive
          and pg_catalog.pg_get_indexdef(i.indexrelid) =
            'CREATE INDEX base44_ai_relay_requests_window ON private.base44_ai_relay_requests USING btree (operation, accepted_at)')
  then raise exception 'Base44 replay table or index differs from Drizzle 0017. No existing object was changed.';
  end if;

  -- Verify the actual stored function text as well as identity and privileges.
  if not exists (
    select 1 from pg_catalog.pg_proc p join pg_catalog.pg_language l on l.oid = p.prolang
      join pg_catalog.pg_class r on r.oid = receipt
    where p.oid = reserve_rpc and p.prokind = 'f' and l.lanname = 'plpgsql'
      and p.prorettype = 'integer'::regtype and not p.proretset and p.prosecdef
      and p.proargnames = array['request_jti','kind','expires_at_s']::text[]
      and p.provolatile = 'v' and not p.proisstrict and p.proparallel = 'u'
      and p.prosrc = expected_body and p.proowner = r.relowner and p.pronargdefaults = 0
      and not pg_catalog.has_table_privilege('anon', r.oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')
      and not pg_catalog.has_table_privilege('authenticated', r.oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')
      and (p.proconfig = array['search_path=""'] or p.proconfig = array['search_path='])
      and not exists (
        select 1 from pg_catalog.aclexplode(coalesce(p.proacl, pg_catalog.acldefault('f',p.proowner))) a
        where a.grantee not in (p.proowner, 'service_role'::regrole) or
              (a.grantee = 'service_role'::regrole and a.is_grantable))
      and pg_catalog.has_function_privilege('service_role', p.oid,'EXECUTE')
      and not pg_catalog.has_function_privilege('anon', p.oid,'EXECUTE')
      and not pg_catalog.has_function_privilege('authenticated', p.oid,'EXECUTE')
      and not exists (
        select 1 from pg_catalog.aclexplode(coalesce(r.relacl, pg_catalog.acldefault('r',r.relowner))) a
        where a.grantee not in (r.relowner, 'service_role'::regrole))
      and not exists (select 1 from pg_catalog.pg_attribute attr
        cross join lateral pg_catalog.aclexplode(attr.attacl) a
        where attr.attrelid = r.oid and a.grantee not in (r.relowner, 'service_role'::regrole))
  ) then raise exception 'Base44 replay RPC or grants differ from Drizzle 0017. No existing object was changed.';
  end if;
end
$compat$;
commit;

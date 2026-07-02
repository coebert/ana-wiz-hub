create table if not exists public.web_vitals (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  metric        text not null check (metric in ('LCP','CLS','INP','FCP','TTFB')),
  value         double precision not null,
  rating        text check (rating in ('good','needs-improvement','poor')),
  navigation_type text,
  route         text not null,
  release_sha   text,
  user_agent    text,
  device_type   text check (device_type in ('mobile','tablet','desktop','unknown')),
  connection    text,
  session_id    text
);

create index if not exists web_vitals_created_at_idx on public.web_vitals (created_at desc);
create index if not exists web_vitals_metric_route_idx on public.web_vitals (metric, route, created_at desc);

grant select on public.web_vitals to authenticated;
grant all on public.web_vitals to service_role;

alter table public.web_vitals enable row level security;

drop policy if exists "Admins can read web vitals" on public.web_vitals;
create policy "Admins can read web vitals"
  on public.web_vitals for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create or replace view public.web_vitals_p75_daily
with (security_invoker = true) as
select
  date_trunc('day', created_at) as day,
  metric,
  route,
  release_sha,
  device_type,
  count(*) as samples,
  percentile_cont(0.75) within group (order by value) as p75,
  percentile_cont(0.5)  within group (order by value) as p50
from public.web_vitals
group by 1, 2, 3, 4, 5;

grant select on public.web_vitals_p75_daily to authenticated;
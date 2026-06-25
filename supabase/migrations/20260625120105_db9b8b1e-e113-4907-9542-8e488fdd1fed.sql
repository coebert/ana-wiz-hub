create extension if not exists vector;

create table if not exists public.kb_chunks (
  id uuid primary key default gen_random_uuid(),
  topic_id text not null,
  topic_title text not null,
  route text not null,
  section text not null,
  exam_tags text[] not null default '{}',
  chunk_kind text not null,
  content text not null,
  content_hash text not null,
  embedding vector(1536) not null,
  created_at timestamptz not null default now(),
  unique (content_hash)
);

create index if not exists kb_chunks_embedding_idx
  on public.kb_chunks using hnsw (embedding vector_cosine_ops);

create index if not exists kb_chunks_topic_id_idx
  on public.kb_chunks (topic_id);

grant all on public.kb_chunks to service_role;

alter table public.kb_chunks enable row level security;

create or replace function public.match_kb_chunks(
  query_embedding vector(1536),
  match_count int default 8
)
returns table (
  id uuid,
  topic_id text,
  topic_title text,
  route text,
  section text,
  exam_tags text[],
  chunk_kind text,
  content text,
  similarity float
)
language sql
stable
security definer
set search_path = public
as $$
  select
    c.id,
    c.topic_id,
    c.topic_title,
    c.route,
    c.section,
    c.exam_tags,
    c.chunk_kind,
    c.content,
    1 - (c.embedding <=> query_embedding) as similarity
  from public.kb_chunks c
  order by c.embedding <=> query_embedding
  limit match_count;
$$;

revoke all on function public.match_kb_chunks(vector, int) from public;
grant execute on function public.match_kb_chunks(vector, int) to service_role;
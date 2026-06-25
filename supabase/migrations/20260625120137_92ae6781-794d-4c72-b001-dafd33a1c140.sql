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
security invoker
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

revoke execute on function public.match_kb_chunks(vector, int) from public;
revoke execute on function public.match_kb_chunks(vector, int) from anon;
revoke execute on function public.match_kb_chunks(vector, int) from authenticated;
grant execute on function public.match_kb_chunks(vector, int) to service_role;
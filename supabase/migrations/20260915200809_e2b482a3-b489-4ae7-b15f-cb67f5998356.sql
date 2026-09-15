ALTER TABLE public.podcast_rerecord_jobs
  ADD COLUMN IF NOT EXISTS worker_token uuid,
  ADD COLUMN IF NOT EXISTS worker_lease_until timestamp with time zone,
  ADD COLUMN IF NOT EXISTS batch_size integer NOT NULL DEFAULT 8;

CREATE INDEX IF NOT EXISTS podcast_rerecord_jobs_active_idx
  ON public.podcast_rerecord_jobs (status, paused, worker_lease_until)
  WHERE status = 'running' AND paused = false;

CREATE OR REPLACE FUNCTION public.claim_podcast_rerecord_item(
  _job_id uuid,
  _worker_token uuid,
  _lease_seconds integer DEFAULT 90
)
RETURNS SETOF public.podcast_rerecord_items
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _job public.podcast_rerecord_jobs%ROWTYPE;
  _item public.podcast_rerecord_items%ROWTYPE;
BEGIN
  IF current_user NOT IN ('service_role', 'postgres', 'supabase_admin') THEN
    RAISE EXCEPTION 'service role required';
  END IF;

  UPDATE public.podcast_rerecord_jobs
  SET worker_token = _worker_token,
      worker_lease_until = now() + make_interval(secs => greatest(30, least(_lease_seconds, 300)))
  WHERE id = _job_id
    AND status = 'running'
    AND paused = false
    AND (worker_lease_until IS NULL OR worker_lease_until < now() OR worker_token = _worker_token)
  RETURNING * INTO _job;

  IF _job.id IS NULL THEN
    RETURN;
  END IF;

  SELECT * INTO _item
  FROM public.podcast_rerecord_items
  WHERE job_id = _job_id AND status = 'pending'
  ORDER BY attempts ASC, created_at ASC
  FOR UPDATE SKIP LOCKED
  LIMIT 1;

  IF _item.id IS NULL THEN
    RETURN;
  END IF;

  UPDATE public.podcast_rerecord_items
  SET status = 'running',
      attempts = attempts + 1,
      started_at = now(),
      completed_at = NULL,
      error_message = NULL
  WHERE id = _item.id
  RETURNING * INTO _item;

  UPDATE public.podcast_rerecord_jobs
  SET current_topic = _item.topic_title,
      current_voice = _item.voice
  WHERE id = _job_id;

  RETURN NEXT _item;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_podcast_rerecord_item(uuid, uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_podcast_rerecord_item(uuid, uuid, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.refresh_podcast_rerecord_job(_job_id uuid)
RETURNS public.podcast_rerecord_jobs
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _pending integer;
  _running integer;
  _done integer;
  _failed integer;
  _result public.podcast_rerecord_jobs%ROWTYPE;
BEGIN
  IF current_user NOT IN ('service_role', 'postgres', 'supabase_admin') THEN
    RAISE EXCEPTION 'service role required';
  END IF;

  SELECT
    count(*) FILTER (WHERE status = 'pending'),
    count(*) FILTER (WHERE status = 'running'),
    count(*) FILTER (WHERE status = 'done'),
    count(*) FILTER (WHERE status = 'failed')
  INTO _pending, _running, _done, _failed
  FROM public.podcast_rerecord_items
  WHERE job_id = _job_id;

  UPDATE public.podcast_rerecord_jobs
  SET processed = _done + _failed,
      succeeded = _done,
      failed = _failed,
      status = CASE
        WHEN paused THEN 'paused'
        WHEN _pending = 0 AND _running = 0 THEN 'complete'
        ELSE 'running'
      END,
      completed_at = CASE
        WHEN _pending = 0 AND _running = 0 THEN coalesce(completed_at, now())
        ELSE NULL
      END,
      current_topic = CASE WHEN _pending = 0 AND _running = 0 THEN NULL ELSE current_topic END,
      current_voice = CASE WHEN _pending = 0 AND _running = 0 THEN NULL ELSE current_voice END,
      worker_token = NULL,
      worker_lease_until = NULL
  WHERE id = _job_id
  RETURNING * INTO _result;

  RETURN _result;
END;
$$;

REVOKE ALL ON FUNCTION public.refresh_podcast_rerecord_job(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.refresh_podcast_rerecord_job(uuid) TO service_role;
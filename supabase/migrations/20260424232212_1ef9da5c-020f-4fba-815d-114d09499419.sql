-- Drop the previous advisory-lock RPCs — replaced with a row-based approach
-- that works reliably across pgbouncer's transaction pooling.
DROP FUNCTION IF EXISTS public.viva_acquire_model_answer_lock(text, text);
DROP FUNCTION IF EXISTS public.viva_release_model_answer_lock(text, text);

CREATE TABLE IF NOT EXISTS public.viva_model_answer_locks (
  exam text NOT NULL,
  question_hash text NOT NULL,
  claimed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (exam, question_hash)
);

ALTER TABLE public.viva_model_answer_locks ENABLE ROW LEVEL SECURITY;

-- No policies → no access for anon/authenticated. Only service_role bypasses RLS.
COMMENT ON TABLE public.viva_model_answer_locks IS
  'Short-lived rows used by the viva edge function to deduplicate concurrent model-answer generations. Service-role only.';
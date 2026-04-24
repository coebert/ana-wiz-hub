-- Replace the previous transaction-scoped helper with a session-scoped pair.
-- Session-scoped advisory locks let the edge function HOLD the lock across
-- the AI generation call (which spans many statements / awaits), and only
-- release it after the cached row has been written.
CREATE OR REPLACE FUNCTION public.viva_acquire_model_answer_lock(
  p_exam text,
  p_question_hash text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  k bigint;
BEGIN
  k := hashtextextended(p_exam, 0) # hashtextextended(p_question_hash, 0);
  PERFORM pg_advisory_lock(k);
END;
$$;

CREATE OR REPLACE FUNCTION public.viva_release_model_answer_lock(
  p_exam text,
  p_question_hash text
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  k bigint;
BEGIN
  k := hashtextextended(p_exam, 0) # hashtextextended(p_question_hash, 0);
  RETURN pg_advisory_unlock(k);
END;
$$;

REVOKE ALL ON FUNCTION public.viva_acquire_model_answer_lock(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.viva_release_model_answer_lock(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.viva_acquire_model_answer_lock(text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.viva_release_model_answer_lock(text, text) TO service_role;
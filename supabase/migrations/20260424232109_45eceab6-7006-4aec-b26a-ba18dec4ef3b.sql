-- Helper that acquires a transaction-scoped advisory lock keyed by
-- (exam, question_hash). Returns void; the lock is released automatically
-- when the calling transaction ends.
--
-- Used by the `viva` edge function so that if two users hit the same
-- previously-uncached question at the same moment, only one AI generation
-- runs and the second request waits, then reads the cached answer.
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
  -- Derive a stable 64-bit key from the (exam, hash) pair.
  -- hashtextextended returns bigint; XOR keeps both inputs significant.
  k := hashtextextended(p_exam, 0) # hashtextextended(p_question_hash, 0);
  PERFORM pg_advisory_xact_lock(k);
END;
$$;

REVOKE ALL ON FUNCTION public.viva_acquire_model_answer_lock(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.viva_acquire_model_answer_lock(text, text) TO service_role;
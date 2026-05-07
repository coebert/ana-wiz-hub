-- 1. Public bucket should not be listable. Files remain reachable via the
-- public CDN URL (Supabase serves objects in public buckets without a SELECT
-- policy), but `.list()` and listing endpoints will no longer enumerate them.
DROP POLICY IF EXISTS "Anyone can read podcast audio" ON storage.objects;

-- 2. viva_model_answer_locks is an internal table only the edge function
-- (service role) needs to touch. Service role bypasses RLS, so an explicit
-- deny-all policy makes the intent clear and silences the linter.
CREATE POLICY "No public access to viva model answer locks"
ON public.viva_model_answer_locks
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);
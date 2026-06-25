REVOKE SELECT ON public.podcasts FROM anon, authenticated;
GRANT SELECT (id, topic_id, topic_title, status, audio_path, script, duration_seconds, voice, created_at, updated_at) ON public.podcasts TO anon, authenticated;
GRANT ALL ON public.podcasts TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_topic_progress TO authenticated;
GRANT ALL ON public.user_topic_progress TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_subsection_progress TO authenticated;
GRANT ALL ON public.user_subsection_progress TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_recent_topics TO authenticated;
GRANT ALL ON public.user_recent_topics TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.srs_reviews TO authenticated;
GRANT ALL ON public.srs_reviews TO service_role;
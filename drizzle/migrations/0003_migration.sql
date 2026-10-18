CREATE OR REPLACE FUNCTION public.admin_engagement_counts()
RETURNS TABLE (topic_learners bigint, topic_rows bigint, subsection_learners bigint, subsection_rows bigint)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT topics.learners, topics.rows, subsections.learners, subsections.rows
  FROM (SELECT count(DISTINCT user_id) AS learners, count(*) AS rows FROM public.user_topic_progress) topics
  CROSS JOIN (SELECT count(DISTINCT user_id) AS learners, count(*) AS rows FROM public.user_subsection_progress) subsections;
$$;

REVOKE ALL ON FUNCTION public.admin_engagement_counts() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_engagement_counts() TO service_role;
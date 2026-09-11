REVOKE ALL ON FUNCTION public.add_study_time(text, integer, date) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.add_study_time(text, integer, date) FROM anon;
GRANT EXECUTE ON FUNCTION public.add_study_time(text, integer, date) TO authenticated;
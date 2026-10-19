REVOKE ALL ON public.visitor_survey_responses FROM anon, authenticated;
GRANT SELECT ON public.visitor_survey_responses TO authenticated;
GRANT ALL ON public.visitor_survey_responses TO service_role;
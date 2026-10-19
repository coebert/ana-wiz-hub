CREATE TABLE public.visitor_survey_responses (
 visitor_id text PRIMARY KEY,
 shown_at timestamptz NOT NULL DEFAULT now(),
 answer text CHECK (answer IN ('person', 'automated', 'prefer_not')),
 answered_at timestamptz,
 CHECK ((answer IS NULL) = (answered_at IS NULL))
);
GRANT SELECT ON public.visitor_survey_responses TO authenticated;
GRANT ALL ON public.visitor_survey_responses TO service_role;
ALTER TABLE public.visitor_survey_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read visitor survey" ON public.visitor_survey_responses FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
COMMENT ON TABLE public.visitor_survey_responses IS 'Optional self-reported visitor survey; one first response per browser ID, not verified human identity.';
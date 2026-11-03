CREATE TABLE public.home_announcement (
 id boolean PRIMARY KEY DEFAULT true CHECK (id = true),
 message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 5000),
 enabled boolean NOT NULL DEFAULT false CHECK (NOT enabled OR char_length(btrim(message)) > 0),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.home_announcement TO anon, authenticated;
GRANT ALL ON public.home_announcement TO service_role;
ALTER TABLE public.home_announcement ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active announcement public read" ON public.home_announcement FOR SELECT TO anon, authenticated USING (enabled);
CREATE POLICY "Announcement owner read" ON public.home_announcement FOR SELECT TO authenticated USING (auth.uid() = 'f8b96895-7f19-4d34-a788-45d16cfd70a3'::uuid AND public.has_role(auth.uid(), 'admin'));
CREATE FUNCTION public.can_edit_home_announcement() RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT auth.uid() = 'f8b96895-7f19-4d34-a788-45d16cfd70a3'::uuid AND public.has_role(auth.uid(), 'admin'); $$;
REVOKE ALL ON FUNCTION public.can_edit_home_announcement() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_edit_home_announcement() TO authenticated, service_role;
CREATE FUNCTION public.save_home_announcement(_message text, _enabled boolean) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF NOT coalesce(public.can_edit_home_announcement(), false) THEN RAISE EXCEPTION 'Only the announcement owner may edit' USING ERRCODE = '42501'; END IF;
 IF _message IS NULL OR char_length(_message) > 5000 OR _enabled IS NULL OR (_enabled AND char_length(btrim(_message)) = 0) THEN RAISE EXCEPTION 'Enter a message of up to 5000 characters before enabling' USING ERRCODE = '22023'; END IF;
 INSERT INTO public.home_announcement(id, message, enabled) VALUES (true, _message, _enabled) ON CONFLICT (id) DO UPDATE SET message = excluded.message, enabled = excluded.enabled, updated_at = now();
END; $$;
REVOKE ALL ON FUNCTION public.save_home_announcement(text, boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.save_home_announcement(text, boolean) TO authenticated;
COMMENT ON TABLE public.home_announcement IS 'Public active text; Rob-only editing via guarded RPC. No browser direct writes.';
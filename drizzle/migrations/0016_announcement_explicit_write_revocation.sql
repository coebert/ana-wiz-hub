REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.home_announcement FROM anon, authenticated;
GRANT SELECT ON public.home_announcement TO anon, authenticated;
GRANT ALL ON public.home_announcement TO service_role;
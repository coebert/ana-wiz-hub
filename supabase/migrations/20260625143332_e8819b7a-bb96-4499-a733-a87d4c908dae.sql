REVOKE SELECT ON public.reviews FROM anon, authenticated;
GRANT SELECT (id, author_name, rating, comment, status, created_at) ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;
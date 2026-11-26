ALTER VIEW public.public_errata SET (security_invoker = off, security_barrier = on);
REVOKE ALL ON public.public_errata FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.public_errata TO anon, authenticated;
GRANT ALL ON public.public_errata TO service_role;
COMMENT ON VIEW public.public_errata IS 'Intentionally owner-privileged: exposes only editorially published corrections and safe columns; base table stays admin-only for reads.';
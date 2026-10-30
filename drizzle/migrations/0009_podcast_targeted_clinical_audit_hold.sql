ALTER TABLE public.podcasts ADD COLUMN IF NOT EXISTS audit_hold boolean NOT NULL DEFAULT false;
ALTER TABLE public.podcasts ADD COLUMN IF NOT EXISTS audit_hold_reason text;
COMMENT ON COLUMN public.podcasts.audit_hold IS 'Clinical content hold; preserve original script/audio and release only with reviewed matching replacement.';
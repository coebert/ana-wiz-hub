
-- Podcast metadata table
CREATE TABLE public.podcasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id TEXT NOT NULL UNIQUE,
  topic_title TEXT NOT NULL,
  script TEXT,
  audio_path TEXT,
  duration_seconds INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'ready', 'failed')),
  error_message TEXT,
  voice TEXT DEFAULT 'alloy',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;

-- Anyone can read podcast metadata (public learning content)
CREATE POLICY "Anyone can view podcasts"
ON public.podcasts
FOR SELECT
USING (true);

-- Only service role (edge functions) can write — no client policies for insert/update/delete

-- Updated-at trigger
CREATE OR REPLACE FUNCTION public.update_podcasts_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER podcasts_updated_at
BEFORE UPDATE ON public.podcasts
FOR EACH ROW
EXECUTE FUNCTION public.update_podcasts_updated_at();

-- Public storage bucket for audio
INSERT INTO storage.buckets (id, name, public)
VALUES ('podcasts', 'podcasts', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can read podcast audio
CREATE POLICY "Anyone can read podcast audio"
ON storage.objects
FOR SELECT
USING (bucket_id = 'podcasts');

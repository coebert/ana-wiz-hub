
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Only admins can view user_roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create app_visits table to track anonymous page visits
CREATE TABLE public.app_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  page_path TEXT
);

ALTER TABLE public.app_visits ENABLE ROW LEVEL SECURITY;

-- Anyone can insert visits (anonymous tracking)
CREATE POLICY "Anyone can insert visits"
  ON public.app_visits FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can read visits
CREATE POLICY "Admins can read visits"
  ON public.app_visits FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Index for analytics queries
CREATE INDEX idx_app_visits_visited_at ON public.app_visits (visited_at);
CREATE INDEX idx_app_visits_visitor_id ON public.app_visits (visitor_id);

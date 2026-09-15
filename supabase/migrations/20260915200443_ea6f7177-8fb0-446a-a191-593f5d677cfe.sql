-- Make the cross-user misuse case loud instead of silently returning false, so
-- no server-side code can mistakenly treat "not allowed to ask" as "not an admin".
-- Cross-user role checks must run under service_role (auth.uid() is null).
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language plpgsql
stable
security definer
set search_path to 'public'
as $function$
BEGIN
  IF auth.uid() IS NOT NULL AND auth.uid() <> _user_id THEN
    RAISE EXCEPTION 'has_role: cross-user role checks require service_role'
      USING ERRCODE = '42501';
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$function$;
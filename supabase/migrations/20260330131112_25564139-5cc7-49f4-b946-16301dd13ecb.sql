-- Explicitly revoke all access from anon and authenticated roles
REVOKE ALL ON public.submissions FROM anon, authenticated;

-- Re-confirm RLS is enabled (idempotent)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Also force RLS for the table owner
ALTER TABLE public.submissions FORCE ROW LEVEL SECURITY;
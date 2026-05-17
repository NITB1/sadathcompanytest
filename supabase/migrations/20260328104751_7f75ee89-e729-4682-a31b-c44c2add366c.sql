
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  company_name TEXT,
  role TEXT,
  industry TEXT,
  tier TEXT NOT NULL,
  shortlist_count INTEGER NOT NULL DEFAULT 10,
  stripe_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- No public access; only service_role (edge functions) can read/write
CREATE POLICY "Service role full access" ON public.submissions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

ALTER TABLE public.submissions
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS visa_status text,
  ADD COLUMN IF NOT EXISTS openings integer DEFAULT 1,
  ADD COLUMN IF NOT EXISTS posting_length integer DEFAULT 1,
  ADD COLUMN IF NOT EXISTS experience_level text;
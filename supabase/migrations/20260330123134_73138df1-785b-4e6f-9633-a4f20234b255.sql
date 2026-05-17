
-- Drop the overly broad policy
DROP POLICY IF EXISTS "Service role full access" ON public.submissions;

-- Create a properly scoped policy for service_role only
CREATE POLICY "Service role full access"
ON public.submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

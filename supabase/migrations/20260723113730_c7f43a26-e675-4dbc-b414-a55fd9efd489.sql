GRANT INSERT ON public.submissions TO anon;
CREATE POLICY "Anyone can submit an inquiry" ON public.submissions
FOR INSERT TO anon WITH CHECK (
  customer_email IS NOT NULL
  AND char_length(customer_email) <= 255
  AND char_length(coalesce(customer_name, '')) <= 100
  AND char_length(coalesce(description, '')) <= 1000
  AND char_length(coalesce(company_name, '')) <= 200
  AND char_length(tier) <= 100
);
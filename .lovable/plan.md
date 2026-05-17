

## Plan: Submissions Database + Admin Page

### What we'll build

1. **Database table** (`submissions`) to store every form entry with fields: name, email, company, role, industry, tier, shortlist_count, stripe_session_id, status (pending/paid), created_at

2. **Update `create-checkout` edge function** to insert a row into `submissions` when checkout is created (status: "pending")

3. **Payment verification edge function** (`verify-payment`) that checks with Stripe if a session was paid, then updates the submission status to "paid" — called from the payment-success page

4. **Admin page** at `/admin` with:
   - Password gate (simple shared password stored as a secret)
   - Table view of all submissions with search/filter
   - Status badges (pending/paid)
   - Export to CSV option

5. **RLS policies** on the submissions table:
   - Insert: allow from service role only (edge function)
   - Select: allow from service role only (edge function for admin)
   - A separate admin edge function to fetch submissions securely

### Technical flow

```text
User fills form → clicks pay → create-checkout function:
  1. Insert row into submissions (status: pending)
  2. Create Stripe session
  3. Return checkout URL

After payment → payment-success page:
  1. Call verify-payment function
  2. Function checks Stripe session status
  3. Updates submission row to "paid"

Admin visits /admin:
  1. Enters password
  2. Fetches submissions via edge function
  3. Views table with all entries
```

### Files to create/modify
- **New migration**: Create `submissions` table + RLS policies
- **New secret**: `ADMIN_PASSWORD` for the admin gate
- **Modified**: `supabase/functions/create-checkout/index.ts` — add DB insert
- **New**: `supabase/functions/verify-payment/index.ts` — verify and update status
- **New**: `supabase/functions/get-submissions/index.ts` — fetch submissions (password-protected)
- **Modified**: `src/pages/PaymentSuccess.tsx` — call verify-payment
- **New**: `src/pages/Admin.tsx` — admin dashboard
- **Modified**: `src/App.tsx` — add `/admin` route


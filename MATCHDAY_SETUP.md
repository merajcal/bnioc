# BNIOC Match Center

The new `/matches` route supports the full first version of match operations:

- Public, future-dated fixtures with opponent, match type, fee, Google Maps URL, reporting time, ball type, overs (default 15), player capacity (default 22), and shareable URLs.
- Student accounts and admin accounts. Admins can create an inactive match, activate it when registration should open, cancel it, manage its players, and review registrations.
- Inactive matches remain visible on the public fixture board, but students cannot register until an admin makes the match active. Admins can assign one confirmed player as captain and one confirmed player as wicket keeper per match.
- Payment-before-registration flow using UPI instructions and a required transaction ID. Mobile number is required and can only be used once per match; email is optional. Payment status is deliberately separate from registration status so staff can verify it. Admins can also manually add confirmed roster players without a payment record.
- Red-ball matches show **White jersey**; white-ball matches show **Colour jersey**.
- Match registration closes after midnight on match day in both the API and Supabase PostgreSQL RPC.

## Supabase setup

1. Create or open your Supabase project. In **Project Settings → API**, copy the project URL, publishable key, and secret key. The secret key must only be configured on the backend; never put it in React code or commit it to Git.

2. Open **SQL Editor**, paste `database/schema.sql`, and run it. This creates the profile, match, registration, payment, RLS, and atomic-registration RPC objects.

   If the database was already created from an earlier version, run `database/migrations/2026-08-27-add-opponent.sql`, `database/migrations/2026-08-28-admin-roster-actions.sql`, and `database/migrations/2026-08-29-normalize-registration-phone.sql` once before deploying the updated API. The migrations convert old `published` matches to `active` and old `draft` matches to `inactive`, and prevent duplicate mobile-number registrations even when the number is formatted differently.

3. Copy `.env.example` to `.env` and set the Supabase values:

   ```bash
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   SUPABASE_SECRET_KEY=sb_secret_...
   SUPABASE_JWKS_URL=https://your-project-ref.supabase.co/auth/v1/.well-known/jwks.json
   ```

4. Create the first admin through Supabase Auth and the profile table:

   ```bash
   BNIOC_ENV_FILE=src/components/prod.env ADMIN_EMAIL=admin@bnioc.com ADMIN_PASSWORD='use-a-strong-password' yarn create-admin
   ```

   `ADMIN_NAME` is optional. Keep `ADMIN_PASSWORD` out of `prod.env` and do not commit `prod.env`; it contains the server-side Supabase secret key.
   The command reports each stage and stops a Supabase request after 15 seconds. Set `ADMIN_REQUEST_TIMEOUT_MS=30000` if your connection is unusually slow.

5. Start the API:

   ```bash
   yarn server
   ```

6. Point the React app at the API when developing or deploying:

   ```bash
   REACT_APP_API_URL=http://localhost:4000/api yarn start
   ```

`yarn dev:full` starts the React app and API together. Supabase provides the database and authentication; the API can run on Render, Hostinger Node.js hosting, a VPS, or Supabase Edge Functions.

## Student registration

Students open `/matches`, select **View & register** on an active fixture, then sign in or create a student account. Inactive fixtures are visible but clearly marked as not open for registration. Students pay the displayed UPI fee, enter the payment transaction ID, and submit the registration. The registration appears in the academy console as `payment_pending` until an admin verifies it.

In the academy console, an admin can make a newly created match active or inactive, cancel it with confirmation, and manage the roster. Every student-submitted payment appears as **Pending acknowledgement** until the admin acknowledges it. Acknowledging the payment marks it **Payment completed** and confirms the player; rejecting it marks both the payment and registration as rejected. Confirm a player before assigning **Captain** or **Wicket keeper**. Assigning either role automatically moves that role from the previous player, so each match has at most one captain and one wicket keeper.

The match board requires the API and Supabase database for real fixtures, accounts, and registrations. A failed API request is shown as an error and is not saved only in browser storage.

## Payment gateway follow-up

The current `payments` table stores the manually supplied UPI transaction ID and its review status. A gateway can be added by creating an order before registration, redirecting to the provider, and writing the provider’s verified order/payment IDs to the same record. The registration endpoint should remain server-side and should only confirm after a provider webhook or admin review.

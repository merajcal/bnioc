-- Run once in Supabase Dashboard -> SQL Editor for an existing BNIOC database.
-- Allows admins to add roster players who do not have a student account or payment record.
ALTER TABLE public.match_registrations ALTER COLUMN student_id DROP NOT NULL;
ALTER TABLE public.match_registrations ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.match_registrations ALTER COLUMN phone DROP NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS match_registrations_match_phone_unique
  ON public.match_registrations (match_id, btrim(phone))
  WHERE phone IS NOT NULL AND btrim(phone) <> '';

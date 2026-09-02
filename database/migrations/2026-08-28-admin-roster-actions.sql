-- Run once in Supabase Dashboard -> SQL Editor for an existing BNIOC database.
-- Allows admins to add roster players who do not have a student account or payment record.
ALTER TABLE public.match_registrations ALTER COLUMN student_id DROP NOT NULL;
ALTER TABLE public.match_registrations ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.match_registrations ALTER COLUMN phone DROP NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS match_registrations_match_phone_unique
  ON public.match_registrations (match_id, btrim(phone))
  WHERE phone IS NOT NULL AND btrim(phone) <> '';
ALTER TABLE public.match_registrations ADD COLUMN IF NOT EXISTS is_captain BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.match_registrations ADD COLUMN IF NOT EXISTS is_wicket_keeper BOOLEAN NOT NULL DEFAULT false;
CREATE UNIQUE INDEX IF NOT EXISTS match_registrations_one_captain_per_match
  ON public.match_registrations (match_id)
  WHERE is_captain;
CREATE UNIQUE INDEX IF NOT EXISTS match_registrations_one_wicket_keeper_per_match
  ON public.match_registrations (match_id)
  WHERE is_wicket_keeper;

-- Existing matches used published/draft before the active/inactive workflow.
ALTER TABLE public.matches DROP CONSTRAINT IF EXISTS matches_status_check;
UPDATE public.matches SET status = 'active' WHERE status = 'published';
UPDATE public.matches SET status = 'inactive' WHERE status = 'draft';
ALTER TABLE public.matches ALTER COLUMN status SET DEFAULT 'inactive';
ALTER TABLE public.matches ADD CONSTRAINT matches_status_check CHECK (status IN ('inactive', 'active', 'cancelled'));

-- BNIOC Match Center  schema for Supabase PostgreSQL
-- Run this file in Supabase Dashboard -> SQL Editor.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(30),
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(180) NOT NULL UNIQUE,
  title VARCHAR(160) NOT NULL,
  opponent VARCHAR(160) NOT NULL,
  match_type VARCHAR(40) NOT NULL,
  match_date DATE NOT NULL,
  match_fee NUMERIC(10, 2) NOT NULL CHECK (match_fee >= 0),
  location VARCHAR(255) NOT NULL,
  maps_url TEXT NOT NULL CHECK (maps_url ~* '^https?://'),
  reporting_time TIME NOT NULL,
  ball_type TEXT NOT NULL CHECK (ball_type IN ('red', 'white')),
  jersey_label VARCHAR(40) NOT NULL,
  overs INTEGER NOT NULL DEFAULT 15 CHECK (overs > 0),
  capacity INTEGER NOT NULL DEFAULT 22 CHECK (capacity > 0),
  status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('inactive', 'active', 'cancelled')),
  created_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Migration for databases created before opponent was added.
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS opponent VARCHAR(160);
UPDATE public.matches SET opponent = 'To be announced' WHERE opponent IS NULL OR btrim(opponent) = '';
ALTER TABLE public.matches ALTER COLUMN opponent SET NOT NULL;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS overs INTEGER;
UPDATE public.matches SET overs = 15 WHERE overs IS NULL;
ALTER TABLE public.matches ALTER COLUMN overs SET DEFAULT 15;
ALTER TABLE public.matches ALTER COLUMN overs SET NOT NULL;
ALTER TABLE public.matches DROP CONSTRAINT IF EXISTS matches_overs_check;
ALTER TABLE public.matches ADD CONSTRAINT matches_overs_check CHECK (overs > 0);
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS capacity INTEGER;
UPDATE public.matches SET capacity = 22 WHERE capacity IS NULL;
ALTER TABLE public.matches ALTER COLUMN capacity SET DEFAULT 22;
ALTER TABLE public.matches ALTER COLUMN capacity SET NOT NULL;
ALTER TABLE public.matches DROP CONSTRAINT IF EXISTS matches_capacity_check;
ALTER TABLE public.matches ADD CONSTRAINT matches_capacity_check CHECK (capacity > 0);
ALTER TABLE public.matches DROP CONSTRAINT IF EXISTS matches_status_check;
UPDATE public.matches SET status = 'active' WHERE status = 'published';
UPDATE public.matches SET status = 'inactive' WHERE status = 'draft';
ALTER TABLE public.matches ALTER COLUMN status SET DEFAULT 'inactive';
ALTER TABLE public.matches ADD CONSTRAINT matches_status_check CHECK (status IN ('inactive', 'active', 'cancelled'));

CREATE TABLE IF NOT EXISTS public.match_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.users(id) ON DELETE RESTRICT,
  player_name VARCHAR(120) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(30),
  jersey_label VARCHAR(40) NOT NULL,
  status TEXT NOT NULL DEFAULT 'payment_pending' CHECK (status IN ('payment_pending', 'confirmed', 'rejected')),
  is_captain BOOLEAN NOT NULL DEFAULT false,
  is_wicket_keeper BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (match_id, student_id)
);

-- Existing databases may have these columns marked NOT NULL. Manual admin roster
-- entries do not have a student account or payment contact details.
ALTER TABLE public.match_registrations ALTER COLUMN student_id DROP NOT NULL;
ALTER TABLE public.match_registrations ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.match_registrations ALTER COLUMN phone DROP NOT NULL;
ALTER TABLE public.match_registrations ADD COLUMN IF NOT EXISTS is_captain BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.match_registrations ADD COLUMN IF NOT EXISTS is_wicket_keeper BOOLEAN NOT NULL DEFAULT false;
-- Store/compare mobile numbers in a canonical form so punctuation, spaces and
-- the Indian +91 prefix cannot be used to register the same number twice.
CREATE OR REPLACE FUNCTION public.normalize_phone(p_phone TEXT)
RETURNS TEXT
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT CASE
    WHEN digits ~ '^91[6-9][0-9]{9}$' THEN right(digits, 10)
    ELSE digits
  END
  FROM (
    SELECT regexp_replace(COALESCE(p_phone, ''), '[^0-9]', '', 'g') AS digits
  ) normalized;
$$;

DROP INDEX IF EXISTS match_registrations_match_phone_unique;
CREATE UNIQUE INDEX match_registrations_match_phone_unique
  ON public.match_registrations (match_id, public.normalize_phone(phone))
  WHERE phone IS NOT NULL AND public.normalize_phone(phone) <> '';
CREATE UNIQUE INDEX IF NOT EXISTS match_registrations_one_captain_per_match
  ON public.match_registrations (match_id)
  WHERE is_captain;
CREATE UNIQUE INDEX IF NOT EXISTS match_registrations_one_wicket_keeper_per_match
  ON public.match_registrations (match_id)
  WHERE is_wicket_keeper;

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL UNIQUE REFERENCES public.match_registrations(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
  transaction_id VARCHAR(120) NOT NULL,
  provider VARCHAR(40) NOT NULL DEFAULT 'upi_manual',
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'verified', 'rejected')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES public.users(id),
  UNIQUE (provider, transaction_id)
);

CREATE INDEX IF NOT EXISTS matches_public_date_idx ON public.matches (status, match_date);
CREATE INDEX IF NOT EXISTS registrations_match_idx ON public.match_registrations (match_id, status);
CREATE INDEX IF NOT EXISTS payments_review_idx ON public.payments (status, submitted_at);

-- Keep profile timestamps current.
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_set_updated_at ON public.users;
CREATE TRIGGER users_set_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS matches_set_updated_at ON public.matches;
CREATE TRIGGER matches_set_updated_at BEFORE UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS registrations_set_updated_at ON public.match_registrations;
CREATE TRIGGER registrations_set_updated_at BEFORE UPDATE ON public.match_registrations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Atomic payment-proof registration. The API calls this function through the
-- Supabase Data API so the validation and both inserts share one transaction.
CREATE OR REPLACE FUNCTION public.register_for_match(
  p_match_id UUID,
  p_student_id UUID,
  p_player_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_transaction_id TEXT
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_match public.matches%ROWTYPE;
  registration public.match_registrations%ROWTYPE;
  occupied INTEGER;
BEGIN
  SELECT * INTO target_match FROM public.matches WHERE id = p_match_id FOR UPDATE;
  IF target_match.id IS NULL OR target_match.status <> 'active' OR target_match.match_date < CURRENT_DATE THEN
    RAISE EXCEPTION 'Registration is closed for this match';
  END IF;

  SELECT COUNT(*) INTO occupied
    FROM public.match_registrations
    WHERE match_id = p_match_id AND status <> 'rejected';
  IF occupied >= target_match.capacity THEN
    RAISE EXCEPTION 'This match is full';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.match_registrations
    WHERE match_id = p_match_id
      AND public.normalize_phone(phone) = public.normalize_phone(p_phone)
      AND public.normalize_phone(p_phone) <> ''
  ) THEN
    RAISE EXCEPTION 'This mobile number is already registered for this match';
  END IF;

  INSERT INTO public.match_registrations (match_id, student_id, player_name, email, phone, jersey_label)
  VALUES (p_match_id, p_student_id, trim(p_player_name), NULLIF(lower(trim(p_email)), ''), public.normalize_phone(p_phone),
          CASE WHEN target_match.ball_type = 'red' THEN 'White jersey' ELSE 'Colour jersey' END)
  RETURNING * INTO registration;

  INSERT INTO public.payments (registration_id, amount, transaction_id)
  VALUES (registration.id, target_match.match_fee, trim(p_transaction_id));

  RETURN jsonb_build_object(
    'id', registration.id,
    'matchId', registration.match_id,
    'playerName', registration.player_name,
    'email', registration.email,
    'phone', registration.phone,
    'jerseyLabel', registration.jersey_label,
    'paymentTransactionId', trim(p_transaction_id),
    'paymentStatus', 'submitted',
    'status', registration.status
  );
EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'You are already registered or this transaction ID was already used';
END;
$$;

-- This app performs database access through the server-side secret key.
-- RLS remains enabled so a future direct client integration is safe by default.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS users_read_own_profile ON public.users;
CREATE POLICY users_read_own_profile ON public.users FOR SELECT TO authenticated USING (id = auth.uid());
DROP POLICY IF EXISTS matches_public_read ON public.matches;
CREATE POLICY matches_public_read ON public.matches FOR SELECT TO anon, authenticated USING (status IN ('inactive', 'active') AND match_date >= CURRENT_DATE);

REVOKE ALL ON FUNCTION public.register_for_match(UUID, UUID, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_for_match(UUID, UUID, TEXT, TEXT, TEXT, TEXT) TO service_role;

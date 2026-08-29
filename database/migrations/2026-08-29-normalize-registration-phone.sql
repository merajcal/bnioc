-- Prevent duplicate registration by mobile number regardless of formatting.
-- Run this once in Supabase SQL Editor after the existing schema migrations.

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

DROP INDEX IF EXISTS public.match_registrations_match_phone_unique;
CREATE UNIQUE INDEX match_registrations_match_phone_unique
  ON public.match_registrations (match_id, public.normalize_phone(phone))
  WHERE phone IS NOT NULL AND public.normalize_phone(phone) <> '';

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

REVOKE ALL ON FUNCTION public.register_for_match(UUID, UUID, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_for_match(UUID, UUID, TEXT, TEXT, TEXT, TEXT) TO service_role;

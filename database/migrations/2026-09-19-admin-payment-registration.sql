-- Allow an admin-added, payment-pending player to claim the reserved slot.
-- The student must sign in with the same email or phone the admin entered.

CREATE OR REPLACE FUNCTION public.register_razorpay_match(
  p_match_id UUID,
  p_student_id UUID,
  p_player_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_amount NUMERIC,
  p_order_id TEXT,
  p_payment_id TEXT
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
  SELECT * INTO target_match
  FROM public.matches
  WHERE id = p_match_id
  FOR UPDATE;

  IF target_match.id IS NULL OR target_match.status <> 'active' OR target_match.match_date < CURRENT_DATE THEN
    RAISE EXCEPTION 'Registration is closed for this match';
  END IF;

  IF p_amount <> target_match.match_fee THEN
    RAISE EXCEPTION 'Payment amount does not match this match fee';
  END IF;

  SELECT COUNT(*) INTO occupied
  FROM public.match_registrations
  WHERE match_id = p_match_id AND status <> 'rejected';

  IF occupied >= target_match.capacity THEN
    RAISE EXCEPTION 'This match is full';
  END IF;

  SELECT * INTO registration
  FROM public.match_registrations
  WHERE match_id = p_match_id
    AND status = 'payment_pending'
    AND (
      student_id = p_student_id
      OR (NULLIF(lower(trim(p_email)), '') IS NOT NULL AND lower(email) = lower(trim(p_email)))
      OR (public.normalize_phone(p_phone) <> '' AND public.normalize_phone(phone) = public.normalize_phone(p_phone))
    )
  ORDER BY CASE WHEN student_id = p_student_id THEN 0 ELSE 1 END
  LIMIT 1
  FOR UPDATE;

  IF registration.id IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM public.payments WHERE registration_id = registration.id) THEN
      RAISE EXCEPTION 'Payment is already associated with this registration';
    END IF;

    UPDATE public.match_registrations
    SET student_id = p_student_id,
        player_name = trim(p_player_name),
        email = NULLIF(lower(trim(p_email)), ''),
        phone = public.normalize_phone(p_phone),
        status = 'confirmed',
        updated_at = now()
    WHERE id = registration.id
    RETURNING * INTO registration;
  ELSE
    IF EXISTS (
      SELECT 1 FROM public.match_registrations
      WHERE match_id = p_match_id
        AND student_id = p_student_id
        AND status <> 'rejected'
    ) THEN
      RAISE EXCEPTION 'You are already registered for this match';
    END IF;

    IF EXISTS (
      SELECT 1 FROM public.match_registrations
      WHERE match_id = p_match_id
        AND public.normalize_phone(phone) = public.normalize_phone(p_phone)
        AND public.normalize_phone(p_phone) <> ''
    ) THEN
      RAISE EXCEPTION 'This mobile number is already registered for this match';
    END IF;

    INSERT INTO public.match_registrations (
      match_id, student_id, player_name, email, phone, jersey_label, status
    ) VALUES (
      p_match_id, p_student_id, trim(p_player_name), NULLIF(lower(trim(p_email)), ''),
      public.normalize_phone(p_phone),
      CASE WHEN target_match.ball_type = 'red' THEN 'White jersey' ELSE 'Colour jersey' END,
      'confirmed'
    )
    RETURNING * INTO registration;
  END IF;

  INSERT INTO public.payments (
    registration_id, amount, transaction_id, provider, provider_order_id, status, verified_at
  ) VALUES (
    registration.id, target_match.match_fee, trim(p_payment_id), 'razorpay', trim(p_order_id), 'verified', now()
  );

  RETURN jsonb_build_object(
    'id', registration.id,
    'matchId', registration.match_id,
    'playerName', registration.player_name,
    'email', registration.email,
    'phone', registration.phone,
    'jerseyLabel', registration.jersey_label,
    'paymentTransactionId', trim(p_payment_id),
    'paymentStatus', 'verified',
    'status', registration.status
  );
EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'You are already registered or this Razorpay payment was already used';
END;
$$;

REVOKE ALL ON FUNCTION public.register_razorpay_match(UUID, UUID, TEXT, TEXT, TEXT, NUMERIC, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_razorpay_match(UUID, UUID, TEXT, TEXT, TEXT, NUMERIC, TEXT, TEXT) TO service_role;

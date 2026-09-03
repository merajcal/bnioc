require('dotenv').config();
const crypto = require('crypto');
if (!globalThis.WebSocket) globalThis.WebSocket = require('ws');
const express = require('express');
const path = require('path');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.API_PORT || process.env.PORT || 4000;
const supabaseUrl = process.env.SUPABASE_URL;
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
let serverCorePromise;

const supabasePublic = () => createClient(supabaseUrl, publishableKey, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});
const getServerCore = () => { serverCorePromise = serverCorePromise || import('@supabase/server/core'); return serverCorePromise; };
const supabaseAdmin = async () => (await getServerCore()).createAdminClient();
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
const matchFields = 'id,slug,title,opponent,match_type,match_date,match_fee,location,maps_url,match_link,reporting_time,ball_type,jersey_label,overs,capacity,status,created_by,created_at';
const registrationFields = 'id,match_id,student_id,player_name,email,phone,jersey_label,status,is_captain,is_wicket_keeper,created_at';
const toMatch = (row, registrationsCount = 0) => {
  const summary = typeof registrationsCount === 'object' ? registrationsCount : { count: registrationsCount, players: [] };
  return {
  id: row.id, slug: row.slug, title: row.title, opponent: row.opponent, matchType: row.match_type, matchDate: row.match_date,
  matchFee: row.match_fee, location: row.location, mapsUrl: row.maps_url, matchLink: row.match_link, reportingTime: String(row.reporting_time).slice(0, 5),
  ballType: row.ball_type, jerseyLabel: row.jersey_label, overs: row.overs, capacity: row.capacity, status: row.status,
  registrationsCount: Number(summary.count || 0), confirmedPlayers: summary.players || [], publishedAt: row.created_at,
  };
};
const toRegistration = (registration, payment) => ({
  id: registration.id,
  matchId: registration.match_id,
  playerName: registration.player_name,
  email: registration.email,
  phone: registration.phone,
  jerseyLabel: registration.jersey_label,
  status: registration.status,
  isCaptain: Boolean(registration.is_captain),
  isWicketKeeper: Boolean(registration.is_wicket_keeper),
  paymentTransactionId: payment?.transaction_id,
  paymentStatus: payment?.status || null,
  paymentSubmittedAt: payment?.submitted_at || null,
  paymentVerifiedAt: payment?.verified_at || null,
  submittedAt: registration.created_at,
});
const toRequest = (req) => new Request(`http://${req.headers.host || 'localhost'}${req.originalUrl}`, {
  headers: { authorization: req.headers.authorization || '', apikey: req.headers.apikey || '' },
});
const getUserId = (claims) => claims?.id || claims?.sub;
const normalizePhone = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  return /^91[6-9]\d{9}$/.test(digits) ? digits.slice(-10) : digits;
};

const allowedOrigins = (process.env.WEB_ORIGIN || '').split(',').map((origin) => origin.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || !allowedOrigins.length || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
}));
app.use(express.json({ type: ['application/json', 'text/plain'], limit: '1mb' }));

const auth = (roles = []) => async (req, res, next) => {
  try {
    const { verifyAuth } = await getServerCore();
    const { data: verified, error } = await verifyAuth(toRequest(req), { auth: 'user' });
    if (error) return res.status(error.status || 401).json({ message: error.message || 'Invalid or expired session' });
    const userId = getUserId(verified.userClaims);
    const admin = await supabaseAdmin();
    const { data: profile, error: profileError } = await admin.from('users').select('id,name,email,phone,role').eq('id', userId).maybeSingle();
    if (profileError || !profile) return res.status(403).json({ message: 'Complete your BNIOC profile before using this service' });
    if (roles.length && !roles.includes(profile.role)) return res.status(403).json({ message: 'You do not have access to this resource' });
    req.user = profile;
    req.supabaseAuth = verified;
    next();
  } catch (error) { next(error); }
};

const signInResponse = async (email, password, role) => {
  const { data: authData, error: authError } = await supabasePublic().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
  if (authError || !authData.session || !authData.user) throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  const admin = await supabaseAdmin();
  const { data: profile, error: profileError } = await admin.from('users').select('id,name,email,phone,role').eq('id', authData.user.id).single();
  if (profileError || !profile || (role && profile.role !== role)) throw Object.assign(new Error('Invalid email, password or account type'), { status: 401 });
  return { token: authData.session.access_token, user: profile };
};

app.get('/api/health', (req, res) => res.json({ ok: true, provider: 'supabase' }));

app.post('/api/auth/register', asyncRoute(async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password || password.length < 8) return res.status(400).json({ message: 'Name, phone, email and an 8-character password are required' });
  const admin = await supabaseAdmin();
  const { data: created, error: createError } = await admin.auth.admin.createUser({ email: email.trim().toLowerCase(), password, email_confirm: true, user_metadata: { name: name.trim(), phone: phone.trim() } });
  if (createError || !created.user) return res.status(createError?.status === 422 ? 409 : 400).json({ message: createError?.message || 'Could not create account' });
  const profile = { id: created.user.id, name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim(), role: 'student' };
  const { error: profileError } = await admin.from('users').upsert(profile, { onConflict: 'id' });
  if (profileError) return res.status(500).json({ message: profileError.message });
  res.status(201).json(await signInResponse(email, password, 'student'));
}));

app.post('/api/auth/login', asyncRoute(async (req, res) => {
  const { email, password } = req.body;
  res.json(await signInResponse(email || '', password || ''));
}));

app.get('/api/matches', asyncRoute(async (req, res) => {
  const admin = await supabaseAdmin();
  const { data, error } = await admin.from('matches').select(matchFields).in('status', ['inactive', 'active']).gte('match_date', new Date().toISOString().slice(0, 10)).order('match_date', { ascending: true });
  if (error) throw error;
  const ids = (data || []).map((match) => match.id);
  const { data: registrations, error: registrationError } = ids.length ? await admin.from('match_registrations').select('match_id,player_name,status,is_captain,is_wicket_keeper').in('match_id', ids).neq('status', 'rejected') : { data: [], error: null };
  if (registrationError) throw registrationError;
  const counts = (registrations || []).reduce((result, item) => ({ ...result, [item.match_id]: (result[item.match_id] || 0) + 1 }), {});
  const confirmedPlayers = (registrations || []).reduce((result, item) => item.status === 'confirmed' ? ({ ...result, [item.match_id]: [...(result[item.match_id] || []), `${item.player_name}${item.is_captain ? ' (Captain)' : ''}${item.is_wicket_keeper ? ' (Wicket keeper)' : ''}`] }) : result, {});
  res.json((data || []).map((match) => toMatch(match, { count: counts[match.id], players: confirmedPlayers[match.id] || [] })));
}));

app.get('/api/matches/:id/registrations/me', auth(['student']), asyncRoute(async (req, res) => {
  const admin = await supabaseAdmin();
  const { data: registration, error: registrationError } = await admin.from('match_registrations')
    .select(registrationFields)
    .eq('match_id', req.params.id)
    .eq('student_id', req.user.id)
    .maybeSingle();
  if (registrationError) throw registrationError;
  if (!registration) return res.json({ registration: null });

  const { data: payment, error: paymentError } = await admin.from('payments')
    .select('transaction_id,status,submitted_at,verified_at')
    .eq('registration_id', registration.id)
    .maybeSingle();
  if (paymentError) throw paymentError;
  res.json({ registration: toRegistration(registration, payment) });
}));

app.post('/api/matches', auth(['admin']), asyncRoute(async (req, res) => {
  const { title, opponent, matchType, matchDate, matchFee, location, mapsUrl, matchLink, reportingTime, ballType, overs, capacity } = req.body;
  const missingFields = [['title', title], ['opponent', opponent], ['matchType', matchType], ['matchDate', matchDate], ['location', location], ['mapsUrl', mapsUrl], ['reportingTime', reportingTime]]
    .filter(([, value]) => value === undefined || value === null || String(value).trim() === '')
    .map(([field]) => field);
  const invalidFields = [];
  if (matchFee === undefined || matchFee === null || !Number.isFinite(Number(matchFee)) || Number(matchFee) < 0) invalidFields.push('matchFee');
  if (overs === undefined || overs === null || !Number.isInteger(Number(overs)) || Number(overs) < 1) invalidFields.push('overs');
  if (capacity === undefined || capacity === null || !Number.isInteger(Number(capacity)) || Number(capacity) < 1) invalidFields.push('capacity');
  if (!['red', 'white'].includes(ballType)) invalidFields.push('ballType');
  if (missingFields.length || invalidFields.length) return res.status(400).json({ message: `Missing or invalid match fields: ${[...missingFields, ...invalidFields].join(', ')}` });
  if (new Date(`${matchDate}T23:59:59`) < new Date()) return res.status(400).json({ message: 'Match date must be in the future' });
  if (!/^https?:\/\//i.test(mapsUrl)) return res.status(400).json({ message: 'Google Maps link must start with http:// or https://' });
  if (matchLink && !/^https?:\/\//i.test(String(matchLink).trim())) return res.status(400).json({ message: 'Match link must start with http:// or https://' });
  const match = { id: crypto.randomUUID(), slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now()}`, title: title.trim(), opponent: opponent.trim(), match_type: matchType, match_date: matchDate, match_fee: Number(matchFee), location: location.trim(), maps_url: mapsUrl, match_link: matchLink && String(matchLink).trim() ? String(matchLink).trim() : null, reporting_time: reportingTime, ball_type: ballType, jersey_label: ballType === 'red' ? 'White jersey' : 'Colour jersey', overs: Number(overs), capacity: Number(capacity), status: 'inactive', created_by: req.user.id };
  const admin = await supabaseAdmin();
  const { data, error } = await admin.from('matches').insert(match).select(matchFields).single();
  if (error) throw error;
  res.status(201).json(toMatch(data));
}));

app.patch('/api/admin/matches/:id', auth(['admin']), asyncRoute(async (req, res) => {
  const { status, title, opponent, matchType, matchDate, matchFee, location, mapsUrl, matchLink, reportingTime, ballType, overs, capacity } = req.body;
  const updates = {};
  if (status !== undefined) {
    if (!['inactive', 'active', 'cancelled'].includes(status)) return res.status(400).json({ message: 'Match status must be inactive, active or cancelled' });
    updates.status = status;
  }
  const textFields = [['title', title, 'title'], ['opponent', opponent, 'opponent'], ['matchType', matchType, 'match_type'], ['location', location, 'location'], ['reportingTime', reportingTime, 'reporting_time']];
  textFields.forEach(([field, value, column]) => {
    if (value !== undefined) {
      if (!String(value).trim()) throw Object.assign(new Error(`${field} is required`), { status: 400 });
      updates[column] = String(value).trim();
    }
  });
  if (matchDate !== undefined) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(matchDate) || new Date(`${matchDate}T23:59:59`) < new Date()) return res.status(400).json({ message: 'Match date must be in the future' });
    updates.match_date = matchDate;
  }
  if (matchFee !== undefined) {
    if (!Number.isFinite(Number(matchFee)) || Number(matchFee) < 0) return res.status(400).json({ message: 'Match fee must be zero or more' });
    updates.match_fee = Number(matchFee);
  }
  if (mapsUrl !== undefined) {
    if (!/^https?:\/\//i.test(String(mapsUrl).trim())) return res.status(400).json({ message: 'Google Maps link must start with http:// or https://' });
    updates.maps_url = String(mapsUrl).trim();
  }
  if (matchLink !== undefined) {
    if (matchLink && !/^https?:\/\//i.test(String(matchLink).trim())) return res.status(400).json({ message: 'Match link must start with http:// or https://' });
    updates.match_link = matchLink && String(matchLink).trim() ? String(matchLink).trim() : null;
  }
  if (ballType !== undefined) {
    if (!['red', 'white'].includes(ballType)) return res.status(400).json({ message: 'Ball type must be red or white' });
    updates.ball_type = ballType;
    updates.jersey_label = ballType === 'red' ? 'White jersey' : 'Colour jersey';
  }
  if (overs !== undefined) {
    if (!Number.isInteger(Number(overs)) || Number(overs) < 1) return res.status(400).json({ message: 'Overs must be a positive whole number' });
    updates.overs = Number(overs);
  }
  if (capacity !== undefined) {
    if (!Number.isInteger(Number(capacity)) || Number(capacity) < 1) return res.status(400).json({ message: 'Player capacity must be a positive whole number' });
    updates.capacity = Number(capacity);
  }
  if (Object.keys(updates).length === 0) return res.status(400).json({ message: 'Provide match details to update' });
  const admin = await supabaseAdmin();
  const { data, error } = await admin.from('matches').update(updates).eq('id', req.params.id).select(matchFields).single();
  if (error) {
    if (error.code === 'PGRST116') return res.status(404).json({ message: 'Match not found' });
    throw error;
  }
  res.json(toMatch(data));
}));

app.post('/api/matches/:id/registrations', auth(['student']), asyncRoute(async (req, res) => {
  const { playerName, email, phone, paymentTransactionId } = req.body;
  if (!playerName || !String(playerName).trim() || !phone || !String(phone).trim() || !paymentTransactionId || !String(paymentTransactionId).trim()) return res.status(400).json({ message: 'Player name, mobile number and payment transaction ID are required' });
  const normalizedPhone = normalizePhone(phone);
  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) return res.status(400).json({ message: 'Enter a valid 10-digit mobile number' });
  const admin = await supabaseAdmin();
  const { data, error } = await admin.rpc('register_for_match', { p_match_id: req.params.id, p_student_id: req.user.id, p_player_name: playerName, p_email: email && String(email).trim() ? String(email).trim() : null, p_phone: normalizedPhone, p_transaction_id: paymentTransactionId });
  if (error) {
    if (error.code === '23505' || error.message.includes('already registered') || error.message.includes('already used')) return res.status(409).json({ message: error.message });
    if (error.message.includes('closed') || error.message.includes('full')) return res.status(400).json({ message: error.message });
    throw error;
  }
  res.status(201).json(data);
}));

app.get('/api/admin/overview', auth(['admin']), asyncRoute(async (req, res) => {
  const admin = await supabaseAdmin();
  const [{ data: matchRows, error: matchError }, { data: registrations, error: registrationError }, { data: payments, error: paymentError }] = await Promise.all([
    admin.from('matches').select(matchFields).order('match_date', { ascending: false }),
    admin.from('match_registrations').select(registrationFields).order('created_at', { ascending: false }),
    admin.from('payments').select('registration_id,transaction_id,status,submitted_at,verified_at'),
  ]);
  if (matchError || registrationError || paymentError) throw matchError || registrationError || paymentError;
  const counts = (registrations || []).reduce((result, item) => ({ ...result, [item.match_id]: (result[item.match_id] || 0) + (item.status === 'rejected' ? 0 : 1) }), {});
  const paymentMap = (payments || []).reduce((result, payment) => ({ ...result, [payment.registration_id]: payment }), {});
  res.json({ matches: (matchRows || []).map((match) => toMatch(match, counts[match.id])), registrations: (registrations || []).map((registration) => toRegistration(registration, paymentMap[registration.id])) });
}));

app.patch('/api/admin/registrations/:id', auth(['admin']), asyncRoute(async (req, res) => {
  const { status, paymentStatus, isCaptain, isWicketKeeper } = req.body;
  if (status !== undefined && !['confirmed', 'rejected'].includes(status)) return res.status(400).json({ message: 'Invalid registration status' });
  if (paymentStatus !== undefined && !['submitted', 'verified', 'rejected'].includes(paymentStatus)) return res.status(400).json({ message: 'Invalid payment status' });
  if (isCaptain !== undefined && typeof isCaptain !== 'boolean') return res.status(400).json({ message: 'isCaptain must be boolean' });
  if (isWicketKeeper !== undefined && typeof isWicketKeeper !== 'boolean') return res.status(400).json({ message: 'isWicketKeeper must be boolean' });
  if (status === undefined && paymentStatus === undefined && isCaptain === undefined && isWicketKeeper === undefined) return res.status(400).json({ message: 'Provide a registration, payment or player role update' });
  const admin = await supabaseAdmin();
  const { data: current, error: currentError } = await admin.from('match_registrations').select('id,match_id,status').eq('id', req.params.id).maybeSingle();
  if (currentError) throw currentError;
  if (!current) return res.status(404).json({ message: 'Registration not found' });
  const resultingStatus = status || current.status;
  if ((isCaptain === true || isWicketKeeper === true) && resultingStatus !== 'confirmed') return res.status(400).json({ message: 'Only confirmed players can be assigned match roles' });

  if (isCaptain === true) {
    const { error: clearCaptainError } = await admin.from('match_registrations').update({ is_captain: false }).eq('match_id', current.match_id).neq('id', current.id);
    if (clearCaptainError) throw clearCaptainError;
  }
  if (isWicketKeeper === true) {
    const { error: clearWicketKeeperError } = await admin.from('match_registrations').update({ is_wicket_keeper: false }).eq('match_id', current.match_id).neq('id', current.id);
    if (clearWicketKeeperError) throw clearWicketKeeperError;
  }

  const updates = {};
  if (status !== undefined) updates.status = status;
  if (status === 'rejected') {
    updates.is_captain = false;
    updates.is_wicket_keeper = false;
  } else {
    if (isCaptain !== undefined) updates.is_captain = isCaptain;
    if (isWicketKeeper !== undefined) updates.is_wicket_keeper = isWicketKeeper;
  }
  const { data, error } = await admin.from('match_registrations').update(updates).eq('id', req.params.id).select(registrationFields).single();
  if (error) {
    if (error.code === 'PGRST116') return res.status(404).json({ message: 'Registration not found' });
    if (error.code === '23505') return res.status(409).json({ message: 'This match already has a player assigned to that role' });
    throw error;
  }
  if (paymentStatus !== undefined) {
    const { error: paymentError } = await admin.from('payments').update({ status: paymentStatus, verified_at: paymentStatus === 'submitted' ? null : new Date().toISOString(), verified_by: paymentStatus === 'submitted' ? null : req.user.id }).eq('registration_id', req.params.id);
    if (paymentError) throw paymentError;
  }
  const { data: payment, error: paymentLookupError } = await admin.from('payments').select('transaction_id,status,submitted_at,verified_at').eq('registration_id', req.params.id).maybeSingle();
  if (paymentLookupError) throw paymentLookupError;
  res.json(toRegistration(data, payment));
}));

app.post('/api/admin/matches/:id/players', auth(['admin']), asyncRoute(async (req, res) => {
  const { playerName, email, phone } = req.body;
  if (!playerName || !String(playerName).trim()) return res.status(400).json({ message: 'Player name is required' });
  const normalizedPhone = phone && String(phone).trim() ? normalizePhone(phone) : null;
  if (normalizedPhone && !/^[6-9]\d{9}$/.test(normalizedPhone)) return res.status(400).json({ message: 'Enter a valid 10-digit mobile number' });
  const admin = await supabaseAdmin();
  const { data: match, error: matchError } = await admin.from('matches').select('id,jersey_label,status').eq('id', req.params.id).maybeSingle();
  if (matchError) throw matchError;
  if (!match) return res.status(404).json({ message: 'Match not found' });
  if (match.status === 'cancelled') return res.status(400).json({ message: 'Players cannot be added to a cancelled match' });
  const { count, error: countError } = await admin.from('match_registrations').select('id', { count: 'exact', head: true }).eq('match_id', match.id).neq('status', 'rejected');
  if (countError) throw countError;
  const { data: capacity, error: capacityError } = await admin.from('matches').select('capacity').eq('id', match.id).single();
  if (capacityError) throw capacityError;
  if (count >= capacity.capacity) return res.status(400).json({ message: 'This match is full' });

  const { data, error } = await admin.from('match_registrations').insert({
    match_id: match.id,
    player_name: String(playerName).trim(),
    email: email ? String(email).trim().toLowerCase() : null,
    phone: normalizedPhone,
    jersey_label: match.jersey_label,
    status: 'confirmed',
  }).select(registrationFields).single();
  if (error) {
    if (error.code === '23505') return res.status(409).json({ message: 'This player is already on the match roster' });
    if (error.code === '23502' && error.message.includes('student_id')) return res.status(500).json({ message: 'Database setup is incomplete. Run database/migrations/2026-08-28-admin-roster-actions.sql in Supabase SQL Editor.' });
    throw error;
  }
  res.status(201).json(toRegistration(data));
}));

app.delete('/api/admin/registrations/:id', auth(['admin']), asyncRoute(async (req, res) => {
  const admin = await supabaseAdmin();
  const { data, error } = await admin.from('match_registrations').delete().eq('id', req.params.id).select('id').maybeSingle();
  if (error) throw error;
  if (!data) return res.status(404).json({ message: 'Player not found' });
  res.status(204).send();
}));

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res, next) => { if (req.path.startsWith('/api')) return next(); res.sendFile(path.join(__dirname, '../build/index.html'), (error) => error && next(error)); });
app.use((error, req, res, next) => { console.error(error); res.status(error.status || 500).json({ message: error.status ? error.message : 'Something went wrong on the server' }); });
app.listen(port, '0.0.0.0', () => console.log(`BNIOC API listening on port ${port}`));

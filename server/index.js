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
const matchFields = 'id,slug,title,opponent,match_type,match_date,match_fee,location,maps_url,reporting_time,ball_type,jersey_label,overs,capacity,status,created_by,created_at';
const registrationFields = 'id,match_id,student_id,player_name,email,phone,jersey_label,status,created_at';
const toMatch = (row, registrationsCount = 0) => {
  const summary = typeof registrationsCount === 'object' ? registrationsCount : { count: registrationsCount, players: [] };
  return {
  id: row.id, slug: row.slug, title: row.title, opponent: row.opponent, matchType: row.match_type, matchDate: row.match_date,
  matchFee: row.match_fee, location: row.location, mapsUrl: row.maps_url, reportingTime: String(row.reporting_time).slice(0, 5),
  ballType: row.ball_type, jerseyLabel: row.jersey_label, overs: row.overs, capacity: row.capacity, status: row.status,
  registrationsCount: Number(summary.count || 0), confirmedPlayers: summary.players || [], publishedAt: row.created_at,
  };
};
const toRequest = (req) => new Request(`http://${req.headers.host || 'localhost'}${req.originalUrl}`, {
  headers: { authorization: req.headers.authorization || '', apikey: req.headers.apikey || '' },
});
const getUserId = (claims) => claims?.id || claims?.sub;

app.use(cors({ origin: process.env.WEB_ORIGIN || true }));
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
  const { email, password, role } = req.body;
  res.json(await signInResponse(email || '', password || '', role));
}));

app.get('/api/matches', asyncRoute(async (req, res) => {
  const admin = await supabaseAdmin();
  const { data, error } = await admin.from('matches').select(matchFields).eq('status', 'published').gte('match_date', new Date().toISOString().slice(0, 10)).order('match_date', { ascending: true });
  if (error) throw error;
  const ids = (data || []).map((match) => match.id);
  const { data: registrations, error: registrationError } = ids.length ? await admin.from('match_registrations').select('match_id,player_name,status').in('match_id', ids).neq('status', 'rejected') : { data: [], error: null };
  if (registrationError) throw registrationError;
  const counts = (registrations || []).reduce((result, item) => ({ ...result, [item.match_id]: (result[item.match_id] || 0) + 1 }), {});
  const confirmedPlayers = (registrations || []).reduce((result, item) => item.status === 'confirmed' ? ({ ...result, [item.match_id]: [...(result[item.match_id] || []), item.player_name] }) : result, {});
  res.json((data || []).map((match) => toMatch(match, { count: counts[match.id], players: confirmedPlayers[match.id] || [] })));
}));

app.post('/api/matches', auth(['admin']), asyncRoute(async (req, res) => {
  const { title, opponent, matchType, matchDate, matchFee, location, mapsUrl, reportingTime, ballType, overs, capacity } = req.body;
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
  const match = { id: crypto.randomUUID(), slug: `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now()}`, title: title.trim(), opponent: opponent.trim(), match_type: matchType, match_date: matchDate, match_fee: Number(matchFee), location: location.trim(), maps_url: mapsUrl, reporting_time: reportingTime, ball_type: ballType, jersey_label: ballType === 'red' ? 'White jersey' : 'Colour jersey', overs: Number(overs), capacity: Number(capacity), status: 'published', created_by: req.user.id };
  const admin = await supabaseAdmin();
  const { data, error } = await admin.from('matches').insert(match).select(matchFields).single();
  if (error) throw error;
  res.status(201).json(toMatch(data));
}));

app.patch('/api/admin/matches/:id', auth(['admin']), asyncRoute(async (req, res) => {
  if (req.body.status !== 'cancelled') return res.status(400).json({ message: 'Only match cancellation is supported' });
  const admin = await supabaseAdmin();
  const { data, error } = await admin.from('matches').update({ status: 'cancelled' }).eq('id', req.params.id).select(matchFields).single();
  if (error) {
    if (error.code === 'PGRST116') return res.status(404).json({ message: 'Match not found' });
    throw error;
  }
  res.json(toMatch(data));
}));

app.post('/api/matches/:id/registrations', auth(['student']), asyncRoute(async (req, res) => {
  const { playerName, email, phone, paymentTransactionId } = req.body;
  if (!playerName || !String(playerName).trim() || !phone || !String(phone).trim() || !paymentTransactionId || !String(paymentTransactionId).trim()) return res.status(400).json({ message: 'Player name, mobile number and payment transaction ID are required' });
  const admin = await supabaseAdmin();
  const { data, error } = await admin.rpc('register_for_match', { p_match_id: req.params.id, p_student_id: req.user.id, p_player_name: playerName, p_email: email && String(email).trim() ? String(email).trim() : null, p_phone: phone, p_transaction_id: paymentTransactionId });
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
    admin.from('payments').select('registration_id,transaction_id,submitted_at'),
  ]);
  if (matchError || registrationError || paymentError) throw matchError || registrationError || paymentError;
  const counts = (registrations || []).reduce((result, item) => ({ ...result, [item.match_id]: (result[item.match_id] || 0) + (item.status === 'rejected' ? 0 : 1) }), {});
  const paymentMap = (payments || []).reduce((result, payment) => ({ ...result, [payment.registration_id]: payment }), {});
  res.json({ matches: (matchRows || []).map((match) => toMatch(match, counts[match.id])), registrations: (registrations || []).map((registration) => ({ id: registration.id, matchId: registration.match_id, playerName: registration.player_name, email: registration.email, phone: registration.phone, jerseyLabel: registration.jersey_label, status: registration.status, paymentTransactionId: paymentMap[registration.id]?.transaction_id, submittedAt: registration.created_at })) });
}));

app.patch('/api/admin/registrations/:id', auth(['admin']), asyncRoute(async (req, res) => {
  if (!['confirmed', 'rejected'].includes(req.body.status)) return res.status(400).json({ message: 'Invalid registration status' });
  const admin = await supabaseAdmin();
  const { data, error } = await admin.from('match_registrations').update({ status: req.body.status }).eq('id', req.params.id).select('id,status').single();
  if (error) { if (error.code === 'PGRST116') return res.status(404).json({ message: 'Registration not found' }); throw error; }
  const { error: paymentError } = await admin.from('payments').update({ status: req.body.status === 'confirmed' ? 'verified' : 'rejected', verified_at: new Date().toISOString(), verified_by: req.user.id }).eq('registration_id', req.params.id);
  if (paymentError) throw paymentError;
  res.json(data);
}));

app.post('/api/admin/matches/:id/players', auth(['admin']), asyncRoute(async (req, res) => {
  const { playerName, email, phone } = req.body;
  if (!playerName || !String(playerName).trim()) return res.status(400).json({ message: 'Player name is required' });
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
    phone: phone ? String(phone).trim() : null,
    jersey_label: match.jersey_label,
    status: 'confirmed',
  }).select(registrationFields).single();
  if (error) {
    if (error.code === '23505') return res.status(409).json({ message: 'This player is already on the match roster' });
    if (error.code === '23502' && error.message.includes('student_id')) return res.status(500).json({ message: 'Database setup is incomplete. Run database/migrations/2026-08-28-admin-roster-actions.sql in Supabase SQL Editor.' });
    throw error;
  }
  res.status(201).json({ id: data.id, matchId: data.match_id, playerName: data.player_name, email: data.email, phone: data.phone, jerseyLabel: data.jersey_label, status: data.status, submittedAt: data.created_at });
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

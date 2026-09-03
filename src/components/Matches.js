import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getAdminData, getMatches, getMyRegistration, login, registerStudent, createMatch, submitRegistration, updateRegistration, updateMatchStatus, updateMatch, addPlayer, removePlayer } from '../services/matchApi';
import { useAuth } from '../context/AuthContext';

const emptyMatch = { title: '', opponent: '', matchType: 'U14', matchDate: '', matchFee: '', location: '', mapsUrl: '', matchLink: '', reportingTime: '06:30', ballType: 'white', capacity: 22, overs: 15 };
const formatDate = (date) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${date}T00:00:00`));
const formatMoney = (value) => `₹${Number(value).toLocaleString('en-IN')}`;
const matchShareLink = (match) => `${window.location.origin}/matches/${match.slug}`;
const matchShareMessage = (match) => [
  '🏏 BNIOC Match Registration',
  '',
  `${match.title} vs ${match.opponent}`,
  `📅 ${formatDate(match.matchDate)}`,
  `⏰ Report by ${match.reportingTime}`,
  `📍 ${match.location}`,
  ...(match.mapsUrl ? [`🗺️ Ground map: ${match.mapsUrl}`] : []),
  ...(match.matchLink ? [`🔗 Match link: ${match.matchLink}`] : []),
  `🏏 ${match.overs} overs · ${match.ballType === 'red' ? 'White jersey' : 'Colour jersey'}`,
  `💰 Entry fee: ${formatMoney(match.matchFee)}`,
  `👥 ${match.registrationsCount || 0}/${match.capacity} registered`,
  '',
  `Register here: ${matchShareLink(match)}`,
].join('\n');

function MatchShareActions({ match }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const shareOnWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(matchShareMessage(match))}`, '_blank', 'noopener,noreferrer');
  const copyLink = async () => {
    const link = matchShareLink(match);
    setCopyError(false);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = link;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        const copiedWithFallback = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!copiedWithFallback) throw new Error('Copy command was rejected');
      }
      setCopied(true);
    } catch (error) {
      setCopied(false);
      setCopyError(true);
    }
  };
  return <div className="mt-3 flex flex-wrap items-center gap-3"><button onClick={shareOnWhatsApp} className="text-xs font-bold text-emerald-600 transition hover:text-emerald-700">Share on WhatsApp ↗</button><button onClick={copyLink} className={`rounded-lg px-2 py-1 text-xs font-bold transition ${copied ? 'bg-emerald-50 text-emerald-700' : 'text-primary-600 hover:bg-primary-50 hover:text-primary-700'}`} aria-live="polite">{copied ? 'Copied ✓' : 'Copy shareable link ↗'}</button>{copied && <span className="text-xs font-semibold text-emerald-700" role="status">Shareable link copied to clipboard.</span>}{copyError && <span className="text-xs font-semibold text-red-600" role="status">Could not copy. Please copy the link from the browser address bar.</span>}</div>;
}
const getTokenExpiry = (token) => {
  try {
    const encodedPayload = token?.split('.')[1];
    if (!encodedPayload) return null;
    const base64Payload = encodedPayload.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64Payload.padEnd(Math.ceil(base64Payload.length / 4) * 4, '=')));
    return Number(payload.exp) * 1000;
  } catch (error) { return null; }
};

function Field({ label, children, hint }) {
  return <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{label}</span>{children}{hint && <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{hint}</span>}</label>;
}

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white';
const selectClass = `${inputClass} appearance-none pr-11`;

function SelectWithChevron({ children, ...props }) {
  return <div className="relative"><select {...props} className={`${selectClass} ${props.className || ''}`}>{children}</select><i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500" aria-hidden="true" /></div>;
}

export function AuthPanel({ onSuccess, onClose }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setError(''); setBusy(true);
    try { onSuccess(mode === 'login' ? await login(form) : await registerStudent(form)); }
    catch (submitError) { setError(submitError.message); } finally { setBusy(false); }
  };
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={onClose}>
    <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl dark:bg-slate-900" onClick={(event) => event.stopPropagation()}>
      <div className="mb-6 flex items-start justify-between"><div><p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-primary-500">Match Center access</p><h2 className="text-2xl font-black text-slate-900 dark:text-white">{mode === 'login' ? 'Sign in to continue' : 'Create student account'}</h2></div><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div>

      <form onSubmit={submit} className="space-y-4">
        {mode === 'register' && <><Field label="Full name"><input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Player name" /></Field><Field label="Phone"><input required className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" /></Field></>}
        <Field label="Email"><input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></Field>
        <Field label="Password"><input required type="password" minLength="8" className={inputClass} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="8+ characters" /></Field>
        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white transition hover:bg-primary-600 disabled:opacity-60">{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
      </form>
      <button className="mt-5 w-full text-center text-sm font-semibold text-primary-600" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>{mode === 'login' ? 'New student? Create an account' : 'Already have an account? Sign in'}</button>
      {mode === 'register' && <p className="mt-4 text-center text-xs text-slate-400">Only student accounts can be created here. Academy admin accounts are provisioned separately.</p>}
    </div>
  </div>;
}

function LegacyMatchCard({ match, onSelect }) {
  return <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"><div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-primary-500/10 transition group-hover:bg-primary-500/20" /><div className="relative flex items-start justify-between gap-3"><span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">{match.matchType}</span><span className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${match.ballType === 'red' ? 'text-red-600' : 'text-slate-500'}`}><span className={`h-2.5 w-2.5 rounded-full ${match.ballType === 'red' ? 'bg-red-600' : 'bg-slate-100 ring-1 ring-slate-400'}`} />{match.ballType} ball</span></div><h3 className="relative mt-5 text-xl font-black text-slate-900 dark:text-white">{match.title}</h3><p className="relative mt-1 text-sm font-semibold text-primary-600 dark:text-primary-300">vs {match.opponent}</p><div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300"><p className="flex items-center gap-3"><i className="fas fa-calendar-day w-4 text-primary-500" />{formatDate(match.matchDate)}</p><p className="flex items-center gap-3"><i className="fas fa-baseball-ball w-4 text-primary-500" />{match.overs} overs</p><p className="flex items-center gap-3"><i className="fas fa-location-dot w-4 text-primary-500" />{match.location}</p><p className="flex items-center gap-3"><i className="fas fa-clock w-4 text-primary-500" />Report by {match.reportingTime}</p></div><div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-5 dark:border-slate-800"><div><p className="text-xs uppercase tracking-wider text-slate-400">Entry fee</p><p className="text-xl font-black text-slate-900 dark:text-white">{formatMoney(match.matchFee)}</p></div><button onClick={() => onSelect(match)} className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary-500 dark:bg-white dark:text-slate-900">View & register <span aria-hidden="true">→</span></button></div></article>;
}

function PlayerListModal({ match, onClose }) {
  const players = match.confirmedPlayers || [];
  return <div className="fixed inset-0 z-[65] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={onClose}>
    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900" onClick={(event) => event.stopPropagation()}>
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-500">Confirmed players</p><h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{match.title}</h2><p className="mt-1 text-sm text-slate-500">{players.length} confirmed of {match.registrationsCount || 0} registered</p></div><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div>
      {players.length ? <ol className="mt-6 max-h-80 space-y-2 overflow-y-auto">{players.map((player, index) => <li key={`${player}-${index}`} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-black text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">{index + 1}</span>{player}</li>)}</ol> : <p className="mt-6 rounded-xl bg-slate-50 px-4 py-5 text-center text-sm text-slate-500 dark:bg-slate-800">No confirmed players yet.</p>}
      <button onClick={onClose} className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-900">Close</button>
    </div>
  </div>;
}

function MatchCard({ match, onSelect }) {
  const [showPlayers, setShowPlayers] = useState(false);
  const registrationOpen = match.status === 'active';
  return <>
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary-500/10 transition group-hover:bg-primary-500/20" />
      <div className="relative flex items-start justify-between gap-3">
        <span className="rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">{match.matchType}</span>
        <span className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${match.ballType === 'red' ? 'text-red-600' : 'text-slate-500'}`}><span className={`h-2 w-2 rounded-full ${match.ballType === 'red' ? 'bg-red-600' : 'bg-slate-100 ring-1 ring-slate-400'}`} />{match.ballType} ball</span>
      </div>
      <h3 className="relative mt-4 truncate text-lg font-black text-slate-900 dark:text-white">{match.title}</h3>
      <p className="relative mt-1 truncate text-sm font-semibold text-primary-600 dark:text-primary-300">vs {match.opponent}</p>
      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
        <p className="flex items-center gap-2"><i className="fas fa-calendar-day w-3 text-primary-500" />{formatDate(match.matchDate)}</p>
        <p className="flex items-center gap-2"><i className="fas fa-baseball-ball w-3 text-primary-500" />{match.overs} overs</p>
        <p className="col-span-2 flex items-center gap-2 truncate"><i className="fas fa-location-dot w-3 text-primary-500" />{match.location}</p>
        <p className="flex items-center gap-2"><i className="fas fa-clock w-3 text-primary-500" />{match.reportingTime}</p>
        {match.matchLink && <a href={match.matchLink} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()} className="col-span-2 inline-flex items-center gap-2 font-bold text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"><i className="fas fa-arrow-up-right-from-square w-3" />Match link ↗</a>}
      </div>
      {!registrationOpen && <p className="relative mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">Registration not open yet</p>}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
        <button onClick={() => setShowPlayers(true)} className="flex items-center gap-2 text-left text-xs font-bold text-slate-600 transition hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-300" aria-label={`View confirmed players for ${match.title}`}><i className="fas fa-users text-primary-500" /><span><strong className="block text-sm text-slate-900 dark:text-white">{match.registrationsCount || 0}/{match.capacity}</strong><span>registered</span></span></button>
        <div className="text-right"><p className="text-[10px] uppercase tracking-wider text-slate-400">Fee</p><p className="text-lg font-black text-slate-900 dark:text-white">{formatMoney(match.matchFee)}</p></div>
        <button disabled={!registrationOpen} onClick={() => onSelect(match)} className={`rounded-lg px-3 py-2 text-xs font-bold transition ${registrationOpen ? 'bg-slate-900 text-white hover:bg-primary-500 dark:bg-white dark:text-slate-900' : 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}>{registrationOpen ? <>Register <span aria-hidden="true">→</span></> : 'Not open'}</button>
      </div>
    </article>
    {showPlayers && <PlayerListModal match={match} onClose={() => setShowPlayers(false)} />}
  </>;
}

function LegacyRegistrationModal({ match, user, onClose, onLogin, onSubmitted }) {
  const [form, setForm] = useState({ playerName: user?.name || '', email: user?.email || '', phone: '', paymentTransactionId: '' });
  const [error, setError] = useState(''); const [done, setDone] = useState(false); const [busy, setBusy] = useState(false);
  const submit = async (event) => { event.preventDefault(); setError(''); setBusy(true); try { await submitRegistration(match.id, form, user.token); setDone(true); onSubmitted(); } catch (submitError) { setError(submitError.message); } finally { setBusy(false); } };
  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"><div className="mx-auto my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-500">Match registration</p><h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{match.title}</h2><p className="mt-1 text-sm font-semibold text-primary-600 dark:text-primary-300">vs {match.opponent}</p><p className="mt-1 text-sm text-slate-500">{formatDate(match.matchDate)} · {match.location}</p></div><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div>{done ? <div className="my-10 rounded-2xl bg-emerald-50 p-6 text-center dark:bg-emerald-950/30"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white">✓</div><h3 className="text-xl font-black text-emerald-800 dark:text-emerald-300">Registration received</h3><p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">Your payment proof is pending academy verification. We’ll confirm your spot after reviewing the transaction.</p><button onClick={onClose} className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white">Done</button></div> : !user ? <div className="my-12 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-2xl text-primary-500 dark:bg-primary-950/50">🔐</div><h3 className="text-xl font-black text-slate-900 dark:text-white">Sign in to register</h3><p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">Create your student profile first. You’ll add the payment transaction ID on the next step.</p><button onClick={onLogin} className="mt-6 rounded-xl bg-primary-500 px-6 py-3 font-bold text-white">Sign in / create account</button></div> : <form onSubmit={submit} className="mt-7"><div className="mb-6 grid gap-4 rounded-2xl bg-orange-50 p-5 dark:bg-orange-950/20 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">Step 1 · Pay before registering</p><p className="mt-1 text-sm text-orange-800 dark:text-orange-200">Pay <strong>{formatMoney(match.matchFee)}</strong> to BNIOC UPI: <strong>bnioc@upi</strong></p><p className="mt-1 text-xs text-orange-700/80 dark:text-orange-300/80">Payment gateway integration can replace this UPI instruction later.</p></div><p className="text-sm text-orange-800 dark:text-orange-200"><span className="font-bold">Dress code:</span> <span className="font-semibold">{match.ballType === 'red' ? 'White jersey' : 'Colour jersey'}</span></p></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Player name"><input required className={inputClass} value={form.playerName} onChange={(e) => setForm({ ...form, playerName: e.target.value })} /></Field><Field label="Phone"><input required className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" /></Field><Field label="Email"><input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field><Field label="Payment transaction ID" hint="UPI reference / bank transaction number"><input required className={inputClass} value={form.paymentTransactionId} onChange={(e) => setForm({ ...form, paymentTransactionId: e.target.value })} placeholder="e.g. 412398765432" /></Field></div>{error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}<button disabled={busy} className="mt-6 w-full rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white transition hover:bg-primary-600 disabled:opacity-60">{busy ? 'Submitting…' : 'Submit registration for verification'}</button><p className="mt-3 text-center text-xs text-slate-400">Registration closes automatically at midnight on match day.</p></form>}</div></div>;
}

function RegistrationModal({ match, user, onClose, onLogin, onSubmitted }) {
  const [form, setForm] = useState({ playerName: user?.user?.name || '', email: user?.user?.email || '', phone: user?.user?.phone || '', paymentTransactionId: '' });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(Boolean(user));
  const [existingRegistration, setExistingRegistration] = useState(null);

  useEffect(() => {
    setForm({ playerName: user?.user?.name || '', email: user?.user?.email || '', phone: user?.user?.phone || '', paymentTransactionId: '' });
    setExistingRegistration(null);
    setError('');
    if (!user?.token) {
      setCheckingRegistration(false);
      return undefined;
    }
    let cancelled = false;
    setCheckingRegistration(true);
    getMyRegistration(match.id, user.token)
      .then((result) => { if (!cancelled) setExistingRegistration(result.registration); })
      .catch((lookupError) => { if (!cancelled) setError(lookupError.message); })
      .finally(() => { if (!cancelled) setCheckingRegistration(false); });
    return () => { cancelled = true; };
  }, [match.id, user?.token, user?.user?.name, user?.user?.email, user?.user?.phone]);

  const submit = async (event) => {
    event.preventDefault(); setError(''); setBusy(true);
    try { await submitRegistration(match.id, form, user.token); setDone(true); onSubmitted(); }
    catch (submitError) { setError(submitError.message); }
    finally { setBusy(false); }
  };

  const readOnlyProfileClass = `${inputClass} cursor-not-allowed bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300`;
  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"><div className="mx-auto my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-500">Match registration</p><h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{match.title}</h2><p className="mt-1 text-sm font-semibold text-primary-600 dark:text-primary-300">vs {match.opponent}</p><p className="mt-1 text-sm text-slate-500">{formatDate(match.matchDate)} · {match.location}</p></div><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div>{done ? <div className="my-10 rounded-2xl bg-emerald-50 p-6 text-center dark:bg-emerald-950/30"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white">✓</div><h3 className="text-xl font-black text-emerald-800 dark:text-emerald-300">Registration received</h3><p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">Your payment proof is pending academy verification. We’ll confirm your spot after reviewing the transaction.</p><button onClick={onClose} className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white">Done</button></div> : !user ? <div className="my-12 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-2xl text-primary-500 dark:bg-primary-950/50">🔐</div><h3 className="text-xl font-black text-slate-900 dark:text-white">Sign in to register</h3><p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">Create your student profile first. You’ll add the payment transaction ID on the next step.</p><button onClick={onLogin} className="mt-6 rounded-xl bg-primary-500 px-6 py-3 font-bold text-white">Sign in / create account</button></div> : checkingRegistration ? <div className="my-12 text-center text-sm font-semibold text-slate-500">Checking your registration…</div> : existingRegistration ? <div className="my-8 rounded-2xl bg-emerald-50 p-6 dark:bg-emerald-950/30"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xl text-white">✓</span><div><h3 className="text-lg font-black text-emerald-800 dark:text-emerald-300">You are already registered</h3><p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">You can register only once for this match.</p><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">Player status: {existingRegistration.status === 'confirmed' ? 'Accepted' : existingRegistration.status === 'rejected' ? 'Rejected' : 'Awaiting approval'}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">Payment: {paymentStatusLabel(existingRegistration.paymentStatus)}</p></div></div><button onClick={onClose} className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white">Done</button></div> : <form onSubmit={submit} className="mt-7"><div className="mb-6 grid gap-4 rounded-2xl bg-orange-50 p-5 dark:bg-orange-950/20 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">Step 1 · Pay before registering</p><p className="mt-1 text-sm text-orange-800 dark:text-orange-200">Pay <strong>{formatMoney(match.matchFee)}</strong> to BNIOC UPI: <strong>bnioc@upi</strong></p><p className="mt-1 text-xs text-orange-700/80 dark:text-orange-300/80">Payment gateway integration can replace this UPI instruction later.</p></div><p className="text-sm text-orange-800 dark:text-orange-200"><span className="font-bold">Dress code:</span> <span className="font-semibold">{match.ballType === 'red' ? 'White jersey' : 'Colour jersey'}</span></p></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Player name (from profile)"><input required readOnly aria-readonly="true" className={readOnlyProfileClass} value={form.playerName} /></Field><Field label="Mobile number (from profile)" hint="Your profile number is used for this registration"><input required readOnly aria-readonly="true" type="tel" className={readOnlyProfileClass} value={form.phone} /></Field><Field label="Email (from profile, optional)"><input readOnly aria-readonly="true" type="email" className={readOnlyProfileClass} value={form.email} /></Field><Field label="Payment transaction ID" hint="UPI reference / bank transaction number"><input required className={inputClass} value={form.paymentTransactionId} onChange={(e) => setForm({ ...form, paymentTransactionId: e.target.value })} placeholder="e.g. 412398765432" /></Field></div>{error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}<button disabled={busy || !form.playerName || !form.phone} className="mt-6 w-full rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white transition hover:bg-primary-600 disabled:opacity-60">{busy ? 'Submitting…' : 'Submit registration for verification'}</button><p className="mt-3 text-center text-xs text-slate-400">Registration closes automatically at midnight on match day.</p></form>}</div></div>;
}

function LegacyAdminDashboard({ user, matches, onCreated, onLogout }) {
  const [form, setForm] = useState(emptyMatch); const [data, setData] = useState({ matches, registrations: [] }); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  useEffect(() => { getAdminData(user.token).then(setData); }, [user.token]);
  const submit = async (event) => { event.preventDefault(); setError(''); setNotice(''); try { const created = await createMatch({ ...form, matchFee: Number(form.matchFee), capacity: Number(form.capacity), overs: Number(form.overs) }, user.token); setForm(emptyMatch); setNotice('Match published. The shareable registration link is ready.'); onCreated(created); setData((old) => ({ ...old, matches: [created, ...old.matches] })); } catch (submitError) { setError(submitError.message); } };
  const changeStatus = async (id, status) => { await updateRegistration(id, status, user.token); setData((old) => ({ ...old, registrations: old.registrations.map((item) => item.id === id ? { ...item, status } : item) })); };
  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-primary-500">Academy console</p><h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Match operations</h2><p className="mt-1 text-slate-500">Publish fixtures, share the link, and verify player payment proofs.</p></div><button onClick={onLogout} className="self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Sign out</button></div><div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="text-xl font-black text-slate-900 dark:text-white">Publish a match</h3><p className="mb-6 mt-1 text-sm text-slate-500">The form automatically selects the jersey guidance from ball type.</p><form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Match title"><input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. BNIOC U14 Match Day" /></Field><Field label="Opponent"><input required className={inputClass} value={form.opponent} onChange={(e) => setForm({ ...form, opponent: e.target.value })} placeholder="e.g. Whitefield Cricket Club" /></Field></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Match type"><select className={inputClass} value={form.matchType} onChange={(e) => setForm({ ...form, matchType: e.target.value })}><option>U14</option><option>U16</option><option>U19</option><option>Tournament</option><option>Friendly</option><option>Other</option></select></Field><Field label="Match date"><input required type="date" min={new Date().toISOString().slice(0, 10)} className={inputClass} value={form.matchDate} onChange={(e) => setForm({ ...form, matchDate: e.target.value })} /></Field><Field label="Match fee (INR)"><input required min="0" type="number" className={inputClass} value={form.matchFee} onChange={(e) => setForm({ ...form, matchFee: e.target.value })} placeholder="750" /></Field><Field label="Reporting time"><input required type="time" className={inputClass} value={form.reportingTime} onChange={(e) => setForm({ ...form, reportingTime: e.target.value })} /></Field></div><Field label="Location"><input required className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="BNIOC Ittangur Cricket Ground" /></Field><Field label="Google Maps link"><input required type="url" className={inputClass} value={form.mapsUrl} onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })} placeholder="https://maps.google.com/..." /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Ball type"><div className="grid grid-cols-2 gap-2">{['white', 'red'].map((ball) => <button type="button" key={ball} onClick={() => setForm({ ...form, ballType: ball })} className={`rounded-xl border px-3 py-3 text-sm font-bold capitalize ${form.ballType === ball ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300' : 'border-slate-200 text-slate-500 dark:border-slate-700'}`}>{ball} ball</button>)}</div></Field><Field label="Player capacity"><input required min="1" type="number" className={inputClass} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} /></Field><Field label="Overs"><input required min="1" step="1" type="number" className={inputClass} value={form.overs} onChange={(e) => setForm({ ...form, overs: e.target.value })} /></Field></div><div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/70">Dress code: <strong className="text-primary-600">{form.ballType === 'red' ? 'White jersey' : 'Colour jersey'}</strong></div>{error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}{notice && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}<button className="w-full rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white hover:bg-primary-600">Publish match</button></form></section><section className="space-y-6"><div className="grid grid-cols-3 gap-3"><div className="rounded-2xl bg-slate-900 p-4 text-white"><p className="text-xs text-slate-400">Published</p><p className="mt-1 text-2xl font-black">{data.matches.filter((item) => item.status === 'published').length}</p></div><div className="rounded-2xl bg-orange-500 p-4 text-white"><p className="text-xs text-orange-100">Players</p><p className="mt-1 text-2xl font-black">{data.registrations.length}</p></div><div className="rounded-2xl bg-emerald-600 p-4 text-white"><p className="text-xs text-emerald-100">Confirmed</p><p className="mt-1 text-2xl font-black">{data.registrations.filter((item) => item.status === 'confirmed').length}</p></div></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="mb-4 text-xl font-black text-slate-900 dark:text-white">Published matches</h3><div className="space-y-3">{data.matches.map((match) => <div key={match.id} className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800"><div className="flex items-start justify-between gap-3"><div><p className="font-bold text-slate-900 dark:text-white">{match.title}</p><p className="mt-1 text-xs text-slate-500">{formatDate(match.matchDate)} · {match.overs} overs · {match.registrationsCount || 0}/{match.capacity} players</p></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase text-emerald-700">Published</span></div><MatchShareActions match={match} /></div>)}</div></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-900"><h3 className="mb-4 text-xl font-black text-slate-900 dark:text-white">Payment proofs</h3>{data.registrations.length === 0 ? <p className="text-sm text-slate-500">Registrations and transaction IDs will appear here.</p> : <div className="space-y-3">{data.registrations.map((registration) => <div key={registration.id} className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="font-bold text-slate-900 dark:text-white">{registration.playerName}</p><p className="text-xs text-slate-500">{registration.email} · {registration.paymentTransactionId}</p></div><span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-black uppercase text-amber-700">{registration.status.replace('_', ' ')}</span></div><div className="mt-3 flex gap-2"><button onClick={() => changeStatus(registration.id, 'confirmed')} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">Confirm</button><button onClick={() => changeStatus(registration.id, 'rejected')} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600">Reject</button></div></div>)}</div>}</div></section></div></div>;
}

const registrationStatusLabel = (status) => ({ payment_pending: 'Awaiting player approval', confirmed: 'Player accepted', rejected: 'Player rejected' }[status] || status);
const paymentStatusLabel = (status) => ({ submitted: 'Payment proof pending', verified: 'Payment completed', rejected: 'Payment rejected' }[status] || 'No payment');
const paymentStatusClass = (status) => status === 'verified' ? 'bg-emerald-50 text-emerald-700' : status === 'rejected' ? 'bg-red-50 text-red-700' : status === 'submitted' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600';

function CreateMatchForm({ form, setForm, onSubmit, heading = 'Create a match', eyebrow = 'New fixture', description = 'New matches start inactive. Activate the fixture when registration is ready.', submitLabel = 'Create match', onCancel }) {
  return <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="mb-6"><p className="text-xs font-black uppercase tracking-[0.18em] text-primary-500">{eyebrow}</p><h3 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{heading}</h3><p className="mt-1 text-sm text-slate-500">{description}</p></div>
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Match title"><input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. BNIOC U14 Match Day" /></Field><Field label="Opponent"><input required className={inputClass} value={form.opponent} onChange={(e) => setForm({ ...form, opponent: e.target.value })} placeholder="e.g. Whitefield Cricket Club" /></Field></div>
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Match type"><input required className={inputClass} value={form.matchType} onChange={(e) => setForm({ ...form, matchType: e.target.value })} placeholder="e.g. U16, Friendly, League" /></Field><Field label="Match date"><input required type="date" min={new Date().toISOString().slice(0, 10)} className={inputClass} value={form.matchDate} onChange={(e) => setForm({ ...form, matchDate: e.target.value })} /></Field><Field label="Match fee (INR)"><input required min="0" type="number" className={inputClass} value={form.matchFee} onChange={(e) => setForm({ ...form, matchFee: e.target.value })} placeholder="750" /></Field><Field label="Reporting time"><input required type="time" className={inputClass} value={form.reportingTime} onChange={(e) => setForm({ ...form, reportingTime: e.target.value })} /></Field></div>
      <Field label="Location"><input required className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="BNIOC Ittangur Cricket Ground" /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Google Maps link"><input required type="url" className={inputClass} value={form.mapsUrl} onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })} placeholder="https://maps.google.com/..." /></Field><Field label="Match link (optional)"><input type="url" className={inputClass} value={form.matchLink} onChange={(e) => setForm({ ...form, matchLink: e.target.value })} placeholder="https://..." /></Field></div>
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Ball type"><div className="grid grid-cols-2 gap-2">{['white', 'red'].map((ball) => <button type="button" key={ball} onClick={() => setForm({ ...form, ballType: ball })} className={`rounded-xl border px-3 py-3 text-sm font-bold capitalize ${form.ballType === ball ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300' : 'border-slate-200 text-slate-500 dark:border-slate-700'}`}>{ball} ball</button>)}</div></Field><div className="flex items-center gap-2 pt-6"><span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" /><p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{form.ballType === 'red' ? 'White Jersey' : 'Color Jersey'}</p></div></div>
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Player capacity"><input required min="1" type="number" className={inputClass} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} /></Field><Field label="Overs"><input required min="1" step="1" type="number" className={inputClass} value={form.overs} onChange={(e) => setForm({ ...form, overs: e.target.value })} /></Field></div>
      <div className="flex flex-col gap-3 sm:flex-row"><button className="flex-1 rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white hover:bg-primary-600">{submitLabel}</button>{onCancel && <button type="button" onClick={onCancel} className="rounded-xl border border-slate-300 px-4 py-3.5 font-bold text-slate-700 hover:border-primary-500 hover:text-primary-600 dark:border-slate-700 dark:text-slate-300">Cancel</button>}</div>
    </form>
  </section>;
}

function PlayerActionsMenu({ registration, onAcknowledgePayment, onChangeStatus, onPlayerRole, onRemovePlayer }) {
  const [open, setOpen] = useState(false);
  const action = (callback) => { setOpen(false); callback(); };

  return <div className="relative shrink-0">
    <button onClick={() => setOpen((value) => !value)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-lg font-black leading-none text-slate-500 transition hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:text-slate-300" aria-label={`Actions for ${registration.playerName}`} aria-expanded={open}>⋮</button>
    {open && <div className="absolute right-0 top-11 z-20 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
      {registration.paymentStatus === 'submitted' && <><button onClick={() => action(() => onAcknowledgePayment(registration, 'verified'))} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30">Mark payment complete</button><button onClick={() => action(() => onAcknowledgePayment(registration, 'rejected'))} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">Reject payment</button></>}
      {registration.status === 'confirmed' && <><button onClick={() => action(() => onPlayerRole(registration, 'captain'))} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">{registration.isCaptain ? 'Remove captain role' : 'Make captain'}</button><button onClick={() => action(() => onPlayerRole(registration, 'wicket keeper'))} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">{registration.isWicketKeeper ? 'Remove wicket keeper role' : 'Make wicket keeper'}</button></>}
      {registration.status !== 'confirmed' && <button onClick={() => action(() => onChangeStatus(registration.id, 'confirmed'))} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30">Accept player</button>}
      {registration.status !== 'rejected' && <button onClick={() => action(() => onChangeStatus(registration.id, 'rejected'))} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">Reject player</button>}
      <button onClick={() => action(() => onRemovePlayer(registration))} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Remove from roster</button>
    </div>}
  </div>;
}

function RegistrationRow({ registration, onAcknowledgePayment, onChangeStatus, onPlayerRole, onRemovePlayer }) {
  const statusClass = registration.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : registration.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700';
  return <div className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800"><div className="flex items-start gap-3"><div className="min-w-0 flex-1"><p className="font-bold text-slate-900 dark:text-white">{registration.playerName}</p><p className="mt-1 break-words text-xs text-slate-600 dark:text-slate-400">{registration.email || 'No email'}{registration.phone ? ` · ${registration.phone}` : ''}{registration.paymentTransactionId ? ` · Transaction: ${registration.paymentTransactionId}` : ''}</p><div className="mt-2 flex flex-wrap gap-2"><span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase ${statusClass}`}>{registrationStatusLabel(registration.status)}</span>{registration.isCaptain && <span className="rounded-full bg-primary-100 px-2 py-1 text-[10px] font-black uppercase text-primary-800 dark:bg-primary-950/60 dark:text-primary-300">Captain</span>}{registration.isWicketKeeper && <span className="rounded-full bg-sky-100 px-2 py-1 text-[10px] font-black uppercase text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">Wicket keeper</span>}{registration.paymentStatus && <span className={`${paymentStatusClass(registration.paymentStatus)} rounded-full px-2 py-1 text-[10px] font-black uppercase`}>{paymentStatusLabel(registration.paymentStatus)}</span>}</div></div><PlayerActionsMenu registration={registration} onAcknowledgePayment={onAcknowledgePayment} onChangeStatus={onChangeStatus} onPlayerRole={onPlayerRole} onRemovePlayer={onRemovePlayer} /></div></div>;
}

function MatchWorkspace({ match, registrations, activeTab, setActiveTab, playerForm, setPlayerForm, onSubmitPlayer, onToggleMatch, onCancelMatch, onEditMatch, onAcknowledgePayment, onChangeStatus, onPlayerRole, onRemovePlayer }) {
  const payments = registrations.filter((registration) => registration.paymentStatus);
  const pendingPayments = registrations.filter((registration) => registration.paymentStatus === 'submitted');
  const roster = registrations.filter((registration) => registration.status !== 'rejected');
  const rejectedPlayers = registrations.filter((registration) => registration.status === 'rejected');
  const confirmedPlayers = registrations.filter((registration) => registration.status === 'confirmed');
  const canManageRoster = match.status !== 'cancelled';
  const statusClass = match.status === 'active' ? 'bg-emerald-50 text-emerald-700' : match.status === 'inactive' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700';

  return <section className="space-y-5">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${statusClass}`}>{match.status}</span><span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{match.matchType}</span></div><h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{match.title}</h2><p className="mt-1 text-sm font-semibold text-primary-600 dark:text-primary-300">vs {match.opponent}</p><p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{formatDate(match.matchDate)} · {match.reportingTime} · {match.location}</p>{match.matchLink && <a href={match.matchLink} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200">Match link ↗</a>}</div><div className="flex flex-wrap gap-2 sm:justify-end"><button onClick={() => onEditMatch(match)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-primary-400 hover:text-primary-600 dark:border-slate-700 dark:text-slate-300">Edit match</button><MatchShareActions match={{ ...match, registrationsCount: roster.length }} />{match.status !== 'cancelled' && <><button onClick={() => onToggleMatch(match)} className="rounded-xl border border-primary-200 px-3 py-2 text-xs font-bold text-primary-700 dark:border-primary-800 dark:text-primary-300">{match.status === 'active' ? 'Pause registration' : 'Open registration'}</button><button onClick={() => onCancelMatch(match)} className="rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-600">Cancel match</button></>}</div></div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:grid-cols-4"><div><p className="text-xs text-slate-500 dark:text-slate-400">Players</p><p className="mt-1 font-black text-slate-900 dark:text-white">{roster.length}/{match.capacity}</p></div><div><p className="text-xs text-slate-500 dark:text-slate-400">Confirmed</p><p className="mt-1 font-black text-slate-900 dark:text-white">{confirmedPlayers.length}</p></div><div><p className="text-xs text-slate-500 dark:text-slate-400">Payment review</p><p className="mt-1 font-black text-amber-600">{pendingPayments.length}</p></div><div><p className="text-xs text-slate-500 dark:text-slate-400">Dress code</p><p className="mt-1 font-black text-slate-900 dark:text-white">{match.jerseyLabel}</p></div></div>
    </div>

    <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800"><button onClick={() => setActiveTab('players')} className={`rounded-t-xl px-4 py-3 text-sm font-bold ${activeTab === 'players' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>Players <span className="ml-1 text-xs">{roster.length}</span></button><button onClick={() => setActiveTab('payments')} className={`rounded-t-xl px-4 py-3 text-sm font-bold ${activeTab === 'payments' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-slate-600 dark:text-slate-400'}`}>Payments {pendingPayments.length > 0 && <span className="ml-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-700">{pendingPayments.length}</span>}</button></div>

    {activeTab === 'players' ? <>
      {canManageRoster && <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-5 dark:border-slate-700 dark:bg-slate-800"><div className="mb-4"><h3 className="text-lg font-black text-slate-900 dark:text-white">Add player to {match.title}</h3><p className="mt-1 text-sm text-slate-700 dark:text-slate-300">This player will be added as confirmed. Payment details are not required for manual roster entries.</p></div><form onSubmit={onSubmitPlayer} className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"><input required className={inputClass} value={playerForm.playerName} onChange={(e) => setPlayerForm({ ...playerForm, playerName: e.target.value })} placeholder="Full player name" /><input type="email" className={inputClass} value={playerForm.email} onChange={(e) => setPlayerForm({ ...playerForm, email: e.target.value })} placeholder="Email (optional)" /><input type="tel" className={inputClass} value={playerForm.phone} onChange={(e) => setPlayerForm({ ...playerForm, phone: e.target.value })} placeholder="Phone (optional)" /><button className="rounded-xl bg-primary-500 px-4 py-3 text-sm font-bold text-white hover:bg-primary-600">Add player</button></form></div>}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mb-4 flex items-center justify-between gap-3"><div><h3 className="text-xl font-black text-slate-900 dark:text-white">Team</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Confirmed players and players waiting for payment review.</p></div><span className="text-sm font-bold text-slate-600 dark:text-slate-400">{confirmedPlayers.length} confirmed</span></div>{roster.length ? <div className="space-y-3">{roster.map((registration) => <RegistrationRow key={registration.id} registration={registration} onAcknowledgePayment={onAcknowledgePayment} onChangeStatus={onChangeStatus} onPlayerRole={onPlayerRole} onRemovePlayer={onRemovePlayer} />)}</div> : <div className="rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-400">No players in this roster yet.</div>}{rejectedPlayers.length > 0 && <details className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-3 dark:border-red-950/50 dark:bg-red-950/20"><summary className="cursor-pointer text-sm font-bold text-red-800 dark:text-red-300">Rejected players ({rejectedPlayers.length})</summary><p className="mt-1 text-xs text-red-700 dark:text-red-400">You can accept a rejected player again from the ⋮ menu.</p><div className="mt-3 space-y-3">{rejectedPlayers.map((registration) => <RegistrationRow key={registration.id} registration={registration} onAcknowledgePayment={onAcknowledgePayment} onChangeStatus={onChangeStatus} onPlayerRole={onPlayerRole} onRemovePlayer={onRemovePlayer} />)}</div></details>}</div>
    </> : <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mb-5"><h3 className="text-xl font-black text-slate-900 dark:text-white">Payment review · {match.title}</h3><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Review payment proofs for this match. Use the action menu on each player to update the payment.</p></div>{payments.length ? <div className="space-y-3">{payments.map((registration) => <RegistrationRow key={registration.id} registration={registration} onAcknowledgePayment={onAcknowledgePayment} onChangeStatus={onChangeStatus} onPlayerRole={onPlayerRole} onRemovePlayer={onRemovePlayer} />)}</div> : <div className="rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-400">No payment proofs have been submitted for this match.</div>}</div>}
  </section>;
}

function AdminDashboard({ user, matches, onCreated, onMatchUpdated, onRosterChanged = () => {}, onLogout, onBack = () => window.location.assign('/matches') }) {
  const [form, setForm] = useState(emptyMatch);
  const [editForm, setEditForm] = useState(emptyMatch);
  const [playerForm, setPlayerForm] = useState({ playerName: '', email: '', phone: '' });
  const [data, setData] = useState({ matches, registrations: [] });
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0]?.id || '');
  const [activeTab, setActiveTab] = useState('players');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingMatchId, setEditingMatchId] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    getAdminData(user.token).then((result) => {
      setData(result);
      setSelectedMatchId((old) => old || result.matches[0]?.id || '');
    }).catch((loadError) => setError(loadError.message));
  }, [user.token]);

  useEffect(() => {
    if (!data.matches.some((match) => match.id === selectedMatchId)) setSelectedMatchId(data.matches[0]?.id || '');
  }, [data.matches, selectedMatchId]);

  const selectedMatch = data.matches.find((match) => match.id === selectedMatchId) || null;
  const selectedRegistrations = data.registrations.filter((registration) => registration.matchId === selectedMatchId);
  const selectMatch = (matchId) => { setSelectedMatchId(matchId); setActiveTab('players'); setError(''); setNotice(''); };
  const startEditingMatch = (match) => {
    setEditingMatchId(match.id);
    setEditForm({ ...emptyMatch, title: match.title, opponent: match.opponent, matchType: match.matchType, matchDate: match.matchDate, matchFee: match.matchFee, location: match.location, mapsUrl: match.mapsUrl, matchLink: match.matchLink || '', reportingTime: match.reportingTime, ballType: match.ballType, capacity: match.capacity, overs: match.overs });
    setShowCreateForm(false); setError(''); setNotice('');
  };

  const submit = async (event) => {
    event.preventDefault(); setError(''); setNotice('');
    try {
      const created = await createMatch({ ...form, matchFee: Number(form.matchFee), capacity: Number(form.capacity), overs: Number(form.overs) }, user.token);
      setForm(emptyMatch); setShowCreateForm(false); setSelectedMatchId(created.id); setActiveTab('players'); setNotice('Match saved as inactive. Open registration when it is ready.'); onCreated(created); setData((old) => ({ ...old, matches: [created, ...old.matches] }));
    } catch (submitError) { setError(submitError.message); }
  };

  const submitEdit = async (event) => {
    event.preventDefault(); setError(''); setNotice('');
    try {
      const updated = await updateMatch(editingMatchId, { ...editForm, matchFee: Number(editForm.matchFee), capacity: Number(editForm.capacity), overs: Number(editForm.overs) }, user.token);
      setData((old) => ({ ...old, matches: old.matches.map((match) => match.id === updated.id ? { ...match, ...updated } : match) }));
      onMatchUpdated(updated); setEditingMatchId(''); setNotice(`${updated.title} was updated.`);
    } catch (editError) { setError(editError.message); }
  };

  const changeStatus = async (id, status) => {
    setError('');
    try {
      const updated = await updateRegistration(id, status, user.token);
      setData((old) => ({ ...old, registrations: old.registrations.map((item) => item.id === id ? { ...item, ...updated } : item) }));
      onRosterChanged();
    } catch (statusError) { setError(statusError.message); }
  };

  const acknowledgePayment = async (registration, status) => {
    setError(''); setNotice('');
    try {
      const updated = await updateRegistration(registration.id, { paymentStatus: status }, user.token);
      setData((old) => ({ ...old, registrations: old.registrations.map((item) => item.id === updated.id ? { ...item, ...updated } : item) }));
      onRosterChanged();
      setNotice(status === 'verified' ? `${registration.playerName}'s payment was marked completed.` : `${registration.playerName}'s payment was rejected.`);
    } catch (paymentError) { setError(paymentError.message); }
  };

  const handleMatchStatus = async (match, status) => {
    if (status === 'cancelled' && !window.confirm(`Cancel ${match.title}? Students will no longer be able to register.`)) return;
    setError(''); setNotice('');
    try {
      const updated = await updateMatchStatus(match.id, status, user.token);
      setData((old) => ({ ...old, matches: old.matches.map((item) => item.id === updated.id ? updated : item) }));
      onMatchUpdated(updated);
      setNotice(status === 'active' ? `${match.title} is now active and open for registration.` : status === 'inactive' ? `${match.title} is inactive. Registration is paused.` : `${match.title} was cancelled.`);
    } catch (statusError) { setError(statusError.message); }
  };

  const handleCancelMatch = (match) => handleMatchStatus(match, 'cancelled');

  const handleToggleMatch = (match) => handleMatchStatus(match, match.status === 'active' ? 'inactive' : 'active');

  const handlePlayerRole = async (registration, role) => {
    const field = role === 'captain' ? 'isCaptain' : 'isWicketKeeper';
    setError(''); setNotice('');
    try {
      const updated = await updateRegistration(registration.id, { [field]: !registration[field] }, user.token);
      setData((old) => ({ ...old, registrations: old.registrations.map((item) => item.id === updated.id ? { ...item, ...updated } : item) }));
      setNotice(`${updated.playerName} is ${updated[field] ? `now the ${role}` : `no longer the ${role}`}.`);
      onRosterChanged();
    } catch (roleError) { setError(roleError.message); }
  };

  const submitPlayer = async (event) => {
    event.preventDefault(); setError(''); setNotice('');
    try {
      if (!selectedMatchId) return setError('Select a match before adding a player');
      const player = await addPlayer(selectedMatchId, playerForm, user.token);
      setData((old) => ({
        ...old,
        registrations: [player, ...old.registrations],
        matches: old.matches.map((match) => match.id === player.matchId ? { ...match, registrationsCount: (match.registrationsCount || 0) + 1 } : match),
      }));
      onRosterChanged();
      setPlayerForm((old) => ({ ...old, playerName: '', email: '', phone: '' })); setNotice(`${player.playerName} was added to the roster.`);
    } catch (playerError) { setError(playerError.message); }
  };

  const handleRemovePlayer = async (registration) => {
    if (!window.confirm(`Remove ${registration.playerName} from the match roster?`)) return;
    setError(''); setNotice('');
    try {
      await removePlayer(registration.id, user.token);
      setData((old) => ({
        ...old,
        registrations: old.registrations.filter((item) => item.id !== registration.id),
        matches: old.matches.map((match) => match.id === registration.matchId ? { ...match, registrationsCount: Math.max(0, (match.registrationsCount || 0) - 1) } : match),
      }));
      onRosterChanged();
      setNotice(`${registration.playerName} was removed from the roster.`);
    } catch (removeError) { setError(removeError.message); }
  };

  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><button onClick={onBack} className="mb-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-primary-500 hover:text-primary-600 dark:border-slate-700 dark:text-slate-300">← Back to matches</button>
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-primary-500">Academy console</p><h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Match workspace</h2><p className="mt-1 text-slate-500">Choose a match, then manage everything for that fixture in one place.</p></div><div className="flex gap-2"><button onClick={() => setShowCreateForm((value) => !value)} className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-bold text-white hover:bg-primary-600">{showCreateForm ? 'Close form' : '+ New match'}</button><button onClick={onLogout} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Sign out</button></div></div>
    {error && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
    {notice && <p className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{notice}</p>}
    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4"><div className="rounded-2xl bg-slate-900 p-4 text-white"><p className="text-xs text-slate-400">Matches</p><p className="mt-1 text-2xl font-black">{data.matches.length}</p></div><div className="rounded-2xl bg-primary-500 p-4 text-white"><p className="text-xs text-primary-100">Active</p><p className="mt-1 text-2xl font-black">{data.matches.filter((item) => item.status === 'active').length}</p></div><div className="rounded-2xl bg-amber-500 p-4 text-white"><p className="text-xs text-amber-100">Payment review</p><p className="mt-1 text-2xl font-black">{data.registrations.filter((item) => item.paymentStatus === 'submitted').length}</p></div><div className="rounded-2xl bg-emerald-600 p-4 text-white"><p className="text-xs text-emerald-100">Confirmed players</p><p className="mt-1 text-2xl font-black">{data.registrations.filter((item) => item.status === 'confirmed').length}</p></div></div>
    {showCreateForm && <div className="mb-6"><CreateMatchForm form={form} setForm={setForm} onSubmit={submit} /></div>}
    {editingMatchId && <div className="mb-6"><CreateMatchForm form={editForm} setForm={setEditForm} onSubmit={submitEdit} heading="Edit match" eyebrow="Match details" description="Update the fixture details shown to students and on the match card." submitLabel="Save changes" onCancel={() => setEditingMatchId('')} /></div>}
    {data.matches.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><p className="text-lg font-bold text-slate-700 dark:text-slate-200">No matches yet</p><p className="mt-1 text-sm text-slate-500">Create your first fixture to start managing players and payments.</p></div> : <>
      <div className="mb-5 lg:hidden"><label htmlFor="mobile-match-selector" className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">Match workspace</label><SelectWithChevron id="mobile-match-selector" value={selectedMatchId} onChange={(event) => selectMatch(event.target.value)}>{data.matches.map((match) => <option key={match.id} value={match.id}>{match.title} · {formatDate(match.matchDate)} · {match.status}</option>)}</SelectWithChevron></div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:block"><div className="mb-3 flex items-center justify-between"><h3 className="font-black text-slate-900 dark:text-white">Your matches</h3><span className="text-xs font-bold text-slate-400">{data.matches.length}</span></div><div className="space-y-2">{data.matches.map((match) => <button key={match.id} onClick={() => selectMatch(match.id)} className={`w-full rounded-2xl border p-3 text-left transition ${selectedMatchId === match.id ? 'border-primary-500 bg-slate-100 dark:bg-slate-800' : 'border-slate-100 hover:border-primary-200 dark:border-slate-800 dark:hover:border-primary-900'}`}><div className="flex items-start justify-between gap-2"><span className="truncate text-sm font-bold text-slate-900 dark:text-white">{match.title}</span><span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-black uppercase ${match.status === 'cancelled' ? 'bg-red-50 text-red-700' : match.status === 'inactive' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{match.status}</span></div><p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{formatDate(match.matchDate)} · {match.registrationsCount || 0}/{match.capacity}</p></button>)}</div></aside>
      {selectedMatch && <MatchWorkspace match={selectedMatch} registrations={selectedRegistrations} activeTab={activeTab} setActiveTab={setActiveTab} playerForm={playerForm} setPlayerForm={setPlayerForm} onSubmitPlayer={submitPlayer} onToggleMatch={handleToggleMatch} onCancelMatch={handleCancelMatch} onEditMatch={startEditingMatch} onAcknowledgePayment={acknowledgePayment} onChangeStatus={changeStatus} onPlayerRole={handlePlayerRole} onRemovePlayer={handleRemovePlayer} />}
      </div>
    </>}
  </div>;
}

export function MatchExperience() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const { user, logout: signOut } = useAuth();
  const [selectedMatch, setSelectedMatchState] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState('');
  const setSelectedMatch = (match) => {
    if (match?.status === 'inactive') {
      setNotice('Registration is not open for this match yet.');
      return;
    }
    setSelectedMatchState(match);
  };

  const expireSession = () => { setAdminMode(false); setSelectedMatch(null); setLoadError('Your session has expired. Please sign in again.'); };
  useEffect(() => { window.addEventListener('bnioc-auth-expired', expireSession); return () => window.removeEventListener('bnioc-auth-expired', expireSession); }, []);
  useEffect(() => { if (!user) setAdminMode(false); }, [user]);
  useEffect(() => { if (searchParams.get('admin') === '1' && user?.user?.role === 'admin') setAdminMode(true); }, [searchParams, user]);
  useEffect(() => {
    const openAdminConsole = () => { if (user?.user?.role === 'admin') setAdminMode(true); };
    window.addEventListener('bnioc-open-admin-console', openAdminConsole);
    return () => window.removeEventListener('bnioc-open-admin-console', openAdminConsole);
  }, [user?.user?.role]);
  useEffect(() => {
    const expiresAt = getTokenExpiry(user?.token);
    if (!expiresAt) return undefined;
    const expire = () => window.dispatchEvent(new Event('bnioc-auth-expired'));
    if (expiresAt <= Date.now()) { expire(); return undefined; }
    const timer = window.setTimeout(expire, expiresAt - Date.now());
    return () => window.clearTimeout(timer);
  }, [user?.token]);
  useEffect(() => { getMatches().then((result) => { setMatches(result); if (slug) setSelectedMatch(result.find((match) => match.slug === slug) || null); }).catch((error) => setLoadError(error.message)).finally(() => setLoading(false)); }, [slug]);

  const refreshMatches = () => { getMatches().then(setMatches).catch((error) => setLoadError(error.message)); };
  const returnToMatches = () => {
    setAdminMode(false);
    navigate('/matches', { replace: true });
    refreshMatches();
  };
  const openAuth = () => window.dispatchEvent(new Event('bnioc-open-auth'));
  const activeMatches = useMemo(() => matches.filter((match) => match.status !== 'cancelled'), [matches]);

  return (
    <div className="min-h-screen bg-slate-50 pt-8 dark:bg-slate-950">
      {adminMode && user?.user?.role === 'admin' ? <AdminDashboard user={user} matches={matches} onCreated={(created) => setMatches((old) => [created, ...old])} onMatchUpdated={(updated) => setMatches((old) => old.map((match) => match.id === updated.id ? updated : match))} onRosterChanged={refreshMatches} onLogout={signOut} onBack={returnToMatches} /> : (
        <section id="upcoming-fixtures" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary-500">Fixture board</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Upcoming matches</h1>
              <p className="mt-1 text-sm text-slate-500">Tap the player count to see the confirmed squad.</p>
            </div>
            <p className="text-sm font-semibold text-slate-500">{activeMatches.length} match{activeMatches.length === 1 ? '' : 'es'} available</p>
          </div>
          {loadError && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{loadError}</p>}
          {notice && <p className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}
          {loading ? <div className="py-16 text-center text-slate-500">Loading fixtures…</div> : activeMatches.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{activeMatches.map((match) => <MatchCard key={match.id} match={match} onSelect={setSelectedMatch} />)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><p className="text-lg font-bold text-slate-700 dark:text-slate-200">No open matches right now</p><p className="mt-1 text-sm text-slate-500">Check back soon for the next academy fixture.</p><button onClick={openAuth} className="mt-5 rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white">Sign in for updates</button></div>}
        </section>
      )}
      {selectedMatch && <RegistrationModal match={selectedMatch} user={user?.user?.role === 'student' ? user : null} onClose={() => setSelectedMatch(null)} onLogin={() => openAuth('student')} onSubmitted={() => setNotice('Registration submitted. Your payment proof is awaiting verification.')} />}
    </div>
  );
}

export default function Matches() {
  const { slug } = useParams();
  const [matches, setMatches] = useState([]); const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('bnioc_match_user')); } catch (error) { return null; } }); const [selectedMatch, setSelectedMatch] = useState(null); const [authOpen, setAuthOpen] = useState(false); const [adminMode, setAdminMode] = useState(false); const [loading, setLoading] = useState(true); const [loadError, setLoadError] = useState(''); const [notice, setNotice] = useState('');
  const expireSession = () => { localStorage.removeItem('bnioc_match_user'); setUser(null); setAdminMode(false); setAuthOpen(false); setSelectedMatch(null); setLoadError('Your session has expired. Please sign in again.'); };
  useEffect(() => { window.addEventListener('bnioc-auth-expired', expireSession); return () => window.removeEventListener('bnioc-auth-expired', expireSession); }, []);
  useEffect(() => {
    const expiresAt = getTokenExpiry(user?.token);
    if (!expiresAt) return undefined;
    const expire = () => window.dispatchEvent(new Event('bnioc-auth-expired'));
    if (expiresAt <= Date.now()) { expire(); return undefined; }
    const timer = window.setTimeout(expire, expiresAt - Date.now());
    return () => window.clearTimeout(timer);
  }, [user?.token]);
  useEffect(() => { getMatches().then((result) => { setMatches(result); if (slug) setSelectedMatch(result.find((match) => match.slug === slug) || null); }).catch((error) => setLoadError(error.message)).finally(() => setLoading(false)); }, [slug]);
  const activeMatches = useMemo(() => matches.filter((match) => match.status !== 'cancelled'), [matches]);
  const handleLogin = (result) => { localStorage.setItem('bnioc_match_user', JSON.stringify(result)); setUser(result); setLoadError(''); setAuthOpen(false); if (result.user.role === 'admin') setAdminMode(true); };
  const logout = () => { localStorage.removeItem('bnioc_match_user'); setUser(null); setAdminMode(false); };
  return <div className="min-h-screen bg-slate-50 pt-8 dark:bg-slate-950">{authOpen && <AuthPanel onSuccess={handleLogin} onClose={() => setAuthOpen(false)} />}{adminMode && user?.user?.role === 'admin' ? <AdminDashboard user={user} matches={matches} onCreated={(created) => setMatches((old) => [created, ...old])} onMatchUpdated={(updated) => setMatches((old) => old.map((match) => match.id === updated.id ? updated : match))} onLogout={logout} /> : <><section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8"><div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" /><div className="relative mx-auto max-w-7xl"><div className="max-w-3xl"><div className="mb-5 flex flex-wrap items-center gap-3"><span className="whitespace-nowrap rounded-full bg-primary-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary-300">🏏 Match Center</span><span className="text-xs font-semibold text-slate-400">BNIOC academy fixtures</span></div><h1 className="text-4xl font-black leading-tight sm:text-6xl">Every match is a chance to <span className="text-primary-400">step up.</span></h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Find your next fixture, pay the entry fee, and reserve your place with a verified transaction ID. Match links close automatically after match day.</p><div className="mt-8 flex flex-wrap gap-3">{user ? <><span className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white">Signed in as {user.user.name}</span>{user.user.role === 'admin' && <button onClick={() => setAdminMode(true)} className="rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white">Open academy console</button>}<button onClick={logout} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white">Sign out</button></> : <><button onClick={() => setAuthOpen(true)} className="rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white hover:bg-primary-600">Student / admin sign in <span aria-hidden="true">→</span></button><button onClick={() => setAuthOpen(true)} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">Admin: host a match <span aria-hidden="true">→</span></button></>}</div></div></div></section><section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-primary-500">Open registrations</p><h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Upcoming fixtures</h2></div><p className="text-sm text-slate-500">{activeMatches.length} match{activeMatches.length === 1 ? '' : 'es'} available</p></div>{loadError && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">Unable to load fixtures: {loadError}</p>}{notice && <p className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}{loading ? <div className="py-16 text-center text-slate-500">Loading fixtures…</div> : activeMatches.length ? <div className="grid gap-5 md:grid-cols-2">{activeMatches.map((match) => <MatchCard key={match.id} match={match} onSelect={setSelectedMatch} />)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><p className="text-lg font-bold text-slate-700 dark:text-slate-200">No open matches right now</p><p className="mt-1 text-sm text-slate-500">Check back soon for the next academy fixture.</p></div>}</section></>}{selectedMatch && <RegistrationModal match={selectedMatch} user={user?.user?.role === 'student' ? user : null} onClose={() => setSelectedMatch(null)} onLogin={() => { setAuthOpen(true); }} onSubmitted={() => setNotice('Registration submitted. Your payment proof is awaiting verification.')} />}</div>;
}

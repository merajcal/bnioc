import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdminData, getMatches, login, registerStudent, createMatch, submitRegistration, updateRegistration, cancelMatch, addPlayer, removePlayer } from '../services/matchApi';

const emptyMatch = { title: '', opponent: '', matchType: 'U14', matchDate: '', matchFee: '', location: '', mapsUrl: '', reportingTime: '06:30', ballType: 'white', capacity: 22, overs: 15 };
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

function AuthPanel({ onSuccess, onClose, initialRole = 'student' }) {
  const [role, setRole] = useState(initialRole);
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setError(''); setBusy(true);
    try { onSuccess(mode === 'login' ? await login({ ...form, role }) : await registerStudent(form)); }
    catch (submitError) { setError(submitError.message); } finally { setBusy(false); }
  };
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onClick={onClose}>
    <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl dark:bg-slate-900" onClick={(event) => event.stopPropagation()}>
      <div className="mb-6 flex items-start justify-between"><div><p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-primary-500">Match Center access</p><h2 className="text-2xl font-black text-slate-900 dark:text-white">{mode === 'login' ? 'Sign in to continue' : 'Create student account'}</h2></div><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div>
      {mode === 'login' && <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800"><button onClick={() => setRole('student')} className={`rounded-lg py-2 text-sm font-bold ${role === 'student' ? 'bg-white text-primary-600 shadow-sm dark:bg-slate-700' : 'text-slate-500'}`}>Student</button><button onClick={() => setRole('admin')} className={`rounded-lg py-2 text-sm font-bold ${role === 'admin' ? 'bg-white text-primary-600 shadow-sm dark:bg-slate-700' : 'text-slate-500'}`}>Academy admin</button></div>}
      <form onSubmit={submit} className="space-y-4">
        {mode === 'register' && <><Field label="Full name"><input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Player name" /></Field><Field label="Phone"><input required className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" /></Field></>}
        <Field label="Email"><input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></Field>
        <Field label="Password"><input required type="password" minLength="8" className={inputClass} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="8+ characters" /></Field>
        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white transition hover:bg-primary-600 disabled:opacity-60">{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
      </form>
      <button className="mt-5 w-full text-center text-sm font-semibold text-primary-600" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>{mode === 'login' ? 'New student? Create an account' : 'Already have an account? Sign in'}</button>
      {role === 'admin' && mode === 'login' && <p className="mt-4 text-center text-xs text-slate-400">Demo access: admin@bnioc.com / admin123</p>}
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
  return <><article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"><div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-primary-500/10 transition group-hover:bg-primary-500/20" /><div className="relative flex items-start justify-between gap-3"><span className="rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">{match.matchType}</span><span className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider ${match.ballType === 'red' ? 'text-red-600' : 'text-slate-500'}`}><span className={`h-2 w-2 rounded-full ${match.ballType === 'red' ? 'bg-red-600' : 'bg-slate-100 ring-1 ring-slate-400'}`} />{match.ballType} ball</span></div><h3 className="relative mt-4 truncate text-lg font-black text-slate-900 dark:text-white">{match.title}</h3><p className="relative mt-1 truncate text-sm font-semibold text-primary-600 dark:text-primary-300">vs {match.opponent}</p><div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-slate-600 dark:text-slate-300"><p className="flex items-center gap-2"><i className="fas fa-calendar-day w-3 text-primary-500" />{formatDate(match.matchDate)}</p><p className="flex items-center gap-2"><i className="fas fa-baseball-ball w-3 text-primary-500" />{match.overs} overs</p><p className="col-span-2 flex items-center gap-2 truncate"><i className="fas fa-location-dot w-3 text-primary-500" />{match.location}</p><p className="flex items-center gap-2"><i className="fas fa-clock w-3 text-primary-500" />{match.reportingTime}</p></div><div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800"><button onClick={() => setShowPlayers(true)} className="flex items-center gap-2 text-left text-xs font-bold text-slate-600 transition hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-300" aria-label={`View confirmed players for ${match.title}`}><i className="fas fa-users text-primary-500" /><span><strong className="block text-sm text-slate-900 dark:text-white">{match.registrationsCount || 0}/{match.capacity}</strong><span>registered</span></span></button><div className="text-right"><p className="text-[10px] uppercase tracking-wider text-slate-400">Fee</p><p className="text-lg font-black text-slate-900 dark:text-white">{formatMoney(match.matchFee)}</p></div><button onClick={() => onSelect(match)} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-primary-500 dark:bg-white dark:text-slate-900">Register <span aria-hidden="true">→</span></button></div></article>{showPlayers && <PlayerListModal match={match} onClose={() => setShowPlayers(false)} />}</>;
}

function LegacyRegistrationModal({ match, user, onClose, onLogin, onSubmitted }) {
  const [form, setForm] = useState({ playerName: user?.name || '', email: user?.email || '', phone: '', paymentTransactionId: '' });
  const [error, setError] = useState(''); const [done, setDone] = useState(false); const [busy, setBusy] = useState(false);
  const submit = async (event) => { event.preventDefault(); setError(''); setBusy(true); try { await submitRegistration(match.id, form, user.token); setDone(true); onSubmitted(); } catch (submitError) { setError(submitError.message); } finally { setBusy(false); } };
  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"><div className="mx-auto my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-500">Match registration</p><h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{match.title}</h2><p className="mt-1 text-sm font-semibold text-primary-600 dark:text-primary-300">vs {match.opponent}</p><p className="mt-1 text-sm text-slate-500">{formatDate(match.matchDate)} · {match.location}</p></div><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div>{done ? <div className="my-10 rounded-2xl bg-emerald-50 p-6 text-center dark:bg-emerald-950/30"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white">✓</div><h3 className="text-xl font-black text-emerald-800 dark:text-emerald-300">Registration received</h3><p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">Your payment proof is pending academy verification. We’ll confirm your spot after reviewing the transaction.</p><button onClick={onClose} className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white">Done</button></div> : !user ? <div className="my-12 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-2xl text-primary-500 dark:bg-primary-950/50">🔐</div><h3 className="text-xl font-black text-slate-900 dark:text-white">Sign in to register</h3><p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">Create your student profile first. You’ll add the payment transaction ID on the next step.</p><button onClick={onLogin} className="mt-6 rounded-xl bg-primary-500 px-6 py-3 font-bold text-white">Sign in / create account</button></div> : <form onSubmit={submit} className="mt-7"><div className="mb-6 grid gap-4 rounded-2xl bg-orange-50 p-5 dark:bg-orange-950/20 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">Step 1 · Pay before registering</p><p className="mt-1 text-sm text-orange-800 dark:text-orange-200">Pay <strong>{formatMoney(match.matchFee)}</strong> to BNIOC UPI: <strong>bnioc@upi</strong></p><p className="mt-1 text-xs text-orange-700/80 dark:text-orange-300/80">Payment gateway integration can replace this UPI instruction later.</p></div><div className="rounded-xl bg-white px-4 py-3 text-center text-sm font-black text-orange-700 shadow-sm dark:bg-slate-900 dark:text-orange-300">{match.ballType === 'red' ? '⚪ Dress code: White jersey' : '🟠 Dress code: Colour jersey'}</div></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Player name"><input required className={inputClass} value={form.playerName} onChange={(e) => setForm({ ...form, playerName: e.target.value })} /></Field><Field label="Phone"><input required className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" /></Field><Field label="Email"><input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field><Field label="Payment transaction ID" hint="UPI reference / bank transaction number"><input required className={inputClass} value={form.paymentTransactionId} onChange={(e) => setForm({ ...form, paymentTransactionId: e.target.value })} placeholder="e.g. 412398765432" /></Field></div>{error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}<button disabled={busy} className="mt-6 w-full rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white transition hover:bg-primary-600 disabled:opacity-60">{busy ? 'Submitting…' : 'Submit registration for verification'}</button><p className="mt-3 text-center text-xs text-slate-400">Registration closes automatically at midnight on match day.</p></form>}</div></div>;
}

function RegistrationModal({ match, user, onClose, onLogin, onSubmitted }) {
  const [form, setForm] = useState({ playerName: user?.name || '', email: user?.email || '', phone: '', paymentTransactionId: '' });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault(); setError(''); setBusy(true);
    try { await submitRegistration(match.id, form, user.token); setDone(true); onSubmitted(); }
    catch (submitError) { setError(submitError.message); }
    finally { setBusy(false); }
  };

  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"><div className="mx-auto my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-500">Match registration</p><h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{match.title}</h2><p className="mt-1 text-sm font-semibold text-primary-600 dark:text-primary-300">vs {match.opponent}</p><p className="mt-1 text-sm text-slate-500">{formatDate(match.matchDate)} · {match.location}</p></div><button onClick={onClose} className="text-2xl text-slate-400" aria-label="Close">×</button></div>{done ? <div className="my-10 rounded-2xl bg-emerald-50 p-6 text-center dark:bg-emerald-950/30"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white">✓</div><h3 className="text-xl font-black text-emerald-800 dark:text-emerald-300">Registration received</h3><p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400">Your payment proof is pending academy verification. We’ll confirm your spot after reviewing the transaction.</p><button onClick={onClose} className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white">Done</button></div> : !user ? <div className="my-12 text-center"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-2xl text-primary-500 dark:bg-primary-950/50">🔐</div><h3 className="text-xl font-black text-slate-900 dark:text-white">Sign in to register</h3><p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">Create your student profile first. You’ll add the payment transaction ID on the next step.</p><button onClick={onLogin} className="mt-6 rounded-xl bg-primary-500 px-6 py-3 font-bold text-white">Sign in / create account</button></div> : <form onSubmit={submit} className="mt-7"><div className="mb-6 grid gap-4 rounded-2xl bg-orange-50 p-5 dark:bg-orange-950/20 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300">Step 1 · Pay before registering</p><p className="mt-1 text-sm text-orange-800 dark:text-orange-200">Pay <strong>{formatMoney(match.matchFee)}</strong> to BNIOC UPI: <strong>bnioc@upi</strong></p><p className="mt-1 text-xs text-orange-700/80 dark:text-orange-300/80">Payment gateway integration can replace this UPI instruction later.</p></div><div className="rounded-xl bg-white px-4 py-3 text-center text-sm font-black text-orange-700 shadow-sm dark:bg-slate-900 dark:text-orange-300">{match.ballType === 'red' ? '⚪ Dress code: White jersey' : '🟠 Dress code: Colour jersey'}</div></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Player name"><input required className={inputClass} value={form.playerName} onChange={(e) => setForm({ ...form, playerName: e.target.value })} /></Field><Field label="Mobile number" hint="One registration per mobile number for this match"><input required type="tel" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" /></Field><Field label="Email (optional)"><input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></Field><Field label="Payment transaction ID" hint="UPI reference / bank transaction number"><input required className={inputClass} value={form.paymentTransactionId} onChange={(e) => setForm({ ...form, paymentTransactionId: e.target.value })} placeholder="e.g. 412398765432" /></Field></div>{error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}<button disabled={busy} className="mt-6 w-full rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white transition hover:bg-primary-600 disabled:opacity-60">{busy ? 'Submitting…' : 'Submit registration for verification'}</button><p className="mt-3 text-center text-xs text-slate-400">Registration closes automatically at midnight on match day.</p></form>}</div></div>;
}

function LegacyAdminDashboard({ user, matches, onCreated, onLogout }) {
  const [form, setForm] = useState(emptyMatch); const [data, setData] = useState({ matches, registrations: [] }); const [error, setError] = useState(''); const [notice, setNotice] = useState('');
  useEffect(() => { getAdminData(user.token).then(setData); }, [user.token]);
  const submit = async (event) => { event.preventDefault(); setError(''); setNotice(''); try { const created = await createMatch({ ...form, matchFee: Number(form.matchFee), capacity: Number(form.capacity), overs: Number(form.overs) }, user.token); setForm(emptyMatch); setNotice('Match published. The shareable registration link is ready.'); onCreated(created); setData((old) => ({ ...old, matches: [created, ...old.matches] })); } catch (submitError) { setError(submitError.message); } };
  const changeStatus = async (id, status) => { await updateRegistration(id, status, user.token); setData((old) => ({ ...old, registrations: old.registrations.map((item) => item.id === id ? { ...item, status } : item) })); };
  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-primary-500">Academy console</p><h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Match operations</h2><p className="mt-1 text-slate-500">Publish fixtures, share the link, and verify player payment proofs.</p></div><button onClick={onLogout} className="self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Sign out</button></div><div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="text-xl font-black text-slate-900 dark:text-white">Publish a match</h3><p className="mb-6 mt-1 text-sm text-slate-500">The form automatically selects the jersey guidance from ball type.</p><form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Match title"><input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. BNIOC U14 Match Day" /></Field><Field label="Opponent"><input required className={inputClass} value={form.opponent} onChange={(e) => setForm({ ...form, opponent: e.target.value })} placeholder="e.g. Whitefield Cricket Club" /></Field></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Match type"><select className={inputClass} value={form.matchType} onChange={(e) => setForm({ ...form, matchType: e.target.value })}><option>U14</option><option>U16</option><option>U19</option><option>Tournament</option><option>Friendly</option><option>Other</option></select></Field><Field label="Match date"><input required type="date" min={new Date().toISOString().slice(0, 10)} className={inputClass} value={form.matchDate} onChange={(e) => setForm({ ...form, matchDate: e.target.value })} /></Field><Field label="Match fee (INR)"><input required min="0" type="number" className={inputClass} value={form.matchFee} onChange={(e) => setForm({ ...form, matchFee: e.target.value })} placeholder="750" /></Field><Field label="Reporting time"><input required type="time" className={inputClass} value={form.reportingTime} onChange={(e) => setForm({ ...form, reportingTime: e.target.value })} /></Field></div><Field label="Location"><input required className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="BNIOC Ittangur Cricket Ground" /></Field><Field label="Google Maps link"><input required type="url" className={inputClass} value={form.mapsUrl} onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })} placeholder="https://maps.google.com/..." /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Ball type"><div className="grid grid-cols-2 gap-2">{['white', 'red'].map((ball) => <button type="button" key={ball} onClick={() => setForm({ ...form, ballType: ball })} className={`rounded-xl border px-3 py-3 text-sm font-bold capitalize ${form.ballType === ball ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300' : 'border-slate-200 text-slate-500 dark:border-slate-700'}`}>{ball} ball</button>)}</div></Field><Field label="Player capacity"><input required min="1" type="number" className={inputClass} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} /></Field><Field label="Overs"><input required min="1" step="1" type="number" className={inputClass} value={form.overs} onChange={(e) => setForm({ ...form, overs: e.target.value })} /></Field></div><div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/70">Dress code: <strong className="text-primary-600">{form.ballType === 'red' ? 'White jersey' : 'Colour jersey'}</strong></div>{error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}{notice && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}<button className="w-full rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white hover:bg-primary-600">Publish match</button></form></section><section className="space-y-6"><div className="grid grid-cols-3 gap-3"><div className="rounded-2xl bg-slate-900 p-4 text-white"><p className="text-xs text-slate-400">Published</p><p className="mt-1 text-2xl font-black">{data.matches.filter((item) => item.status === 'published').length}</p></div><div className="rounded-2xl bg-orange-500 p-4 text-white"><p className="text-xs text-orange-100">Players</p><p className="mt-1 text-2xl font-black">{data.registrations.length}</p></div><div className="rounded-2xl bg-emerald-600 p-4 text-white"><p className="text-xs text-emerald-100">Confirmed</p><p className="mt-1 text-2xl font-black">{data.registrations.filter((item) => item.status === 'confirmed').length}</p></div></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="mb-4 text-xl font-black text-slate-900 dark:text-white">Published matches</h3><div className="space-y-3">{data.matches.map((match) => <div key={match.id} className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800"><div className="flex items-start justify-between gap-3"><div><p className="font-bold text-slate-900 dark:text-white">{match.title}</p><p className="mt-1 text-xs text-slate-500">{formatDate(match.matchDate)} · {match.overs} overs · {match.registrationsCount || 0}/{match.capacity} players</p></div><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase text-emerald-700">Published</span></div><MatchShareActions match={match} /></div>)}</div></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-900 dark:bg-slate-900"><h3 className="mb-4 text-xl font-black text-slate-900 dark:text-white">Payment proofs</h3>{data.registrations.length === 0 ? <p className="text-sm text-slate-500">Registrations and transaction IDs will appear here.</p> : <div className="space-y-3">{data.registrations.map((registration) => <div key={registration.id} className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="font-bold text-slate-900 dark:text-white">{registration.playerName}</p><p className="text-xs text-slate-500">{registration.email} · {registration.paymentTransactionId}</p></div><span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-black uppercase text-amber-700">{registration.status.replace('_', ' ')}</span></div><div className="mt-3 flex gap-2"><button onClick={() => changeStatus(registration.id, 'confirmed')} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">Confirm</button><button onClick={() => changeStatus(registration.id, 'rejected')} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600">Reject</button></div></div>)}</div>}</div></section></div></div>;
}

function AdminDashboard({ user, matches, onCreated, onMatchUpdated, onRosterChanged = () => {}, onLogout, onBack = () => window.location.assign('/matches') }) {
  const [form, setForm] = useState(emptyMatch);
  const [playerForm, setPlayerForm] = useState({ matchId: '', playerName: '', email: '', phone: '' });
  const [data, setData] = useState({ matches, registrations: [] });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    getAdminData(user.token).then((result) => {
      setData(result);
      setPlayerForm((old) => ({ ...old, matchId: old.matchId || result.matches.find((match) => match.status !== 'cancelled')?.id || '' }));
    }).catch((loadError) => setError(loadError.message));
  }, [user.token]);

  const matchById = useMemo(() => data.matches.reduce((result, match) => ({ ...result, [match.id]: match }), {}), [data.matches]);
  const availableMatches = data.matches.filter((match) => match.status !== 'cancelled');

  const submit = async (event) => {
    event.preventDefault(); setError(''); setNotice('');
    try {
      const created = await createMatch({ ...form, matchFee: Number(form.matchFee), capacity: Number(form.capacity), overs: Number(form.overs) }, user.token);
      setForm(emptyMatch); setNotice('Match published. The shareable registration link is ready.'); onCreated(created); setData((old) => ({ ...old, matches: [created, ...old.matches] }));
      setPlayerForm((old) => ({ ...old, matchId: old.matchId || created.id }));
    } catch (submitError) { setError(submitError.message); }
  };

  const changeStatus = async (id, status) => {
    setError('');
    try {
      await updateRegistration(id, status, user.token);
      setData((old) => ({ ...old, registrations: old.registrations.map((item) => item.id === id ? { ...item, status } : item) }));
      onRosterChanged();
    } catch (statusError) { setError(statusError.message); }
  };

  const handleCancelMatch = async (match) => {
    if (!window.confirm(`Cancel ${match.title}? Students will no longer be able to register.`)) return;
    setError(''); setNotice('');
    try {
      const updated = await cancelMatch(match.id, user.token);
      setData((old) => ({ ...old, matches: old.matches.map((item) => item.id === updated.id ? updated : item) }));
      onMatchUpdated(updated); setNotice(`${match.title} was cancelled.`);
    } catch (cancelError) { setError(cancelError.message); }
  };

  const submitPlayer = async (event) => {
    event.preventDefault(); setError(''); setNotice('');
    try {
      const player = await addPlayer(playerForm.matchId, playerForm, user.token);
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
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-primary-500">Academy console</p><h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Match operations</h2><p className="mt-1 text-slate-500">Publish fixtures, manage players, and verify payment proofs.</p></div><button onClick={onLogout} className="self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Sign out</button></div>
    {error && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">{error}</p>}
    {notice && <p className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">{notice}</p>}
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="text-xl font-black text-slate-900 dark:text-white">Publish a match</h3><p className="mb-6 mt-1 text-sm text-slate-500">The form automatically selects the jersey guidance from ball type.</p><form onSubmit={submit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Match title"><input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. BNIOC U14 Match Day" /></Field><Field label="Opponent"><input required className={inputClass} value={form.opponent} onChange={(e) => setForm({ ...form, opponent: e.target.value })} placeholder="e.g. Whitefield Cricket Club" /></Field></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Match type"><select className={inputClass} value={form.matchType} onChange={(e) => setForm({ ...form, matchType: e.target.value })}><option>U14</option><option>U16</option><option>U19</option><option>Tournament</option><option>Friendly</option><option>Other</option></select></Field><Field label="Match date"><input required type="date" min={new Date().toISOString().slice(0, 10)} className={inputClass} value={form.matchDate} onChange={(e) => setForm({ ...form, matchDate: e.target.value })} /></Field><Field label="Match fee (INR)"><input required min="0" type="number" className={inputClass} value={form.matchFee} onChange={(e) => setForm({ ...form, matchFee: e.target.value })} placeholder="750" /></Field><Field label="Reporting time"><input required type="time" className={inputClass} value={form.reportingTime} onChange={(e) => setForm({ ...form, reportingTime: e.target.value })} /></Field></div><Field label="Location"><input required className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="BNIOC Ittangur Cricket Ground" /></Field><Field label="Google Maps link"><input required type="url" className={inputClass} value={form.mapsUrl} onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })} placeholder="https://maps.google.com/..." /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Ball type"><div className="grid grid-cols-2 gap-2">{['white', 'red'].map((ball) => <button type="button" key={ball} onClick={() => setForm({ ...form, ballType: ball })} className={`rounded-xl border px-3 py-3 text-sm font-bold capitalize ${form.ballType === ball ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300' : 'border-slate-200 text-slate-500 dark:border-slate-700'}`}>{ball} ball</button>)}</div></Field><Field label="Player capacity"><input required min="1" type="number" className={inputClass} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} /></Field><Field label="Overs"><input required min="1" step="1" type="number" className={inputClass} value={form.overs} onChange={(e) => setForm({ ...form, overs: e.target.value })} /></Field></div><div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/70">Dress code: <strong className="text-primary-600">{form.ballType === 'red' ? 'White jersey' : 'Colour jersey'}</strong></div><button className="w-full rounded-xl bg-primary-500 px-4 py-3.5 font-bold text-white hover:bg-primary-600">Publish match</button></form></section>
      <section className="space-y-6">
        <div className="grid grid-cols-3 gap-3"><div className="rounded-2xl bg-slate-900 p-4 text-white"><p className="text-xs text-slate-400">Published</p><p className="mt-1 text-2xl font-black">{data.matches.filter((item) => item.status === 'published').length}</p></div><div className="rounded-2xl bg-orange-500 p-4 text-white"><p className="text-xs text-orange-100">Players</p><p className="mt-1 text-2xl font-black">{data.registrations.length}</p></div><div className="rounded-2xl bg-emerald-600 p-4 text-white"><p className="text-xs text-emerald-100">Confirmed</p><p className="mt-1 text-2xl font-black">{data.registrations.filter((item) => item.status === 'confirmed').length}</p></div></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="mb-4 text-xl font-black text-slate-900 dark:text-white">All matches</h3><div className="space-y-3">{data.matches.map((match) => <div key={match.id} className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800"><div className="flex items-start justify-between gap-3"><div><p className="font-bold text-slate-900 dark:text-white">{match.title}</p><p className="mt-1 text-xs text-slate-500">{formatDate(match.matchDate)} · {match.overs} overs · {match.registrationsCount || 0}/{match.capacity} players</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase ${match.status === 'cancelled' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>{match.status}</span></div>{match.status !== 'cancelled' && <div className="mt-3 flex flex-wrap items-center gap-3"><button onClick={() => navigator.clipboard?.writeText(`${window.location.origin}/matches/${match.slug}`)} className="text-xs font-bold text-primary-600">Copy shareable link ↗</button><button onClick={() => handleCancelMatch(match)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600">Cancel match</button></div>}</div>)}</div></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="text-xl font-black text-slate-900 dark:text-white">Add a player</h3><p className="mb-5 mt-1 text-sm text-slate-500">Add a player directly to a match roster. Manual entries are marked confirmed.</p><form onSubmit={submitPlayer} className="space-y-4"><Field label="Match"><select required className={inputClass} value={playerForm.matchId} onChange={(e) => setPlayerForm({ ...playerForm, matchId: e.target.value })}><option value="">Select a match</option>{availableMatches.map((match) => <option key={match.id} value={match.id}>{match.title} · {formatDate(match.matchDate)}</option>)}</select></Field><Field label="Player name"><input required className={inputClass} value={playerForm.playerName} onChange={(e) => setPlayerForm({ ...playerForm, playerName: e.target.value })} placeholder="Full player name" /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Email (optional)"><input type="email" className={inputClass} value={playerForm.email} onChange={(e) => setPlayerForm({ ...playerForm, email: e.target.value })} placeholder="player@example.com" /></Field><Field label="Phone (optional)"><input className={inputClass} value={playerForm.phone} onChange={(e) => setPlayerForm({ ...playerForm, phone: e.target.value })} placeholder="10-digit mobile number" /></Field></div><button disabled={!availableMatches.length} className="w-full rounded-xl bg-orange-500 px-4 py-3.5 font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">Add player to roster</button></form></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="mb-4 text-xl font-black text-slate-900 dark:text-white">Players & payment proofs</h3>{data.registrations.length === 0 ? <p className="text-sm text-slate-500">Registrations and manually added players will appear here.</p> : <div className="space-y-3">{data.registrations.map((registration) => <div key={registration.id} className="rounded-2xl border border-slate-100 p-4 dark:border-slate-800"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="font-bold text-slate-900 dark:text-white">{registration.playerName}</p><p className="text-xs text-slate-500">{matchById[registration.matchId]?.title || 'Match'} · {registration.email || 'No email'}{registration.paymentTransactionId ? ` · ${registration.paymentTransactionId}` : ''}</p></div><span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase ${registration.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{registration.status.replace('_', ' ')}</span></div><div className="mt-3 flex flex-wrap gap-2">{registration.status !== 'confirmed' && <button onClick={() => changeStatus(registration.id, 'confirmed')} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">Confirm</button>}{registration.status !== 'rejected' && <button onClick={() => changeStatus(registration.id, 'rejected')} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600">Reject</button>}<button onClick={() => handleRemovePlayer(registration)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">Remove</button></div></div>)}</div>}</div>
      </section>
    </div>
  </div>;
}

export function MatchExperience() {
  const { slug } = useParams();
  const [matches, setMatches] = useState([]);
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('bnioc_match_user')); } catch (error) { return null; } });
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState('student');
  const [adminMode, setAdminMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState('');

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

  const handleLogin = (result) => { localStorage.setItem('bnioc_match_user', JSON.stringify(result)); setUser(result); setLoadError(''); setAuthOpen(false); if (result.user.role === 'admin') setAdminMode(true); };
  const logout = (fullLogout = true) => { if (fullLogout) { localStorage.removeItem('bnioc_match_user'); setUser(null); } setAdminMode(false); };
  const refreshMatches = () => { getMatches().then(setMatches).catch((error) => setLoadError(error.message)); };
  const returnToMatches = () => {
    if (!user) {
      try {
        const savedUser = JSON.parse(localStorage.getItem('bnioc_match_user'));
        if (savedUser?.user) setUser(savedUser);
      } catch (error) { /* Ignore malformed stale storage; normal sign-in will restore it. */ }
    }
    setAdminMode(false);
    refreshMatches();
  };
  const openAuth = (role = 'student') => { setAuthRole(role); setAuthOpen(true); };
  const browseFixtures = () => document.getElementById('upcoming-fixtures')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const activeMatches = useMemo(() => matches.filter((match) => match.status === 'published'), [matches]);

  return <div className="min-h-screen bg-slate-50 pt-8 dark:bg-slate-950">
    {authOpen && <AuthPanel initialRole={authRole} onSuccess={handleLogin} onClose={() => setAuthOpen(false)} />}
    {adminMode && user?.user?.role === 'admin' ? <AdminDashboard user={user} matches={matches} onCreated={(created) => setMatches((old) => [created, ...old])} onMatchUpdated={(updated) => setMatches((old) => old.map((match) => match.id === updated.id ? updated : match))} onRosterChanged={refreshMatches} onLogout={logout} onBack={returnToMatches} /> : <>
      <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:px-6 lg:px-8"><div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" /><div className="relative mx-auto max-w-7xl"><div className="max-w-3xl"><div className="mb-5 flex flex-wrap items-center gap-3"><span className="whitespace-nowrap rounded-full bg-primary-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary-300">🏏 BNIOC Match Center</span><span className="text-xs font-semibold text-slate-400">Academy fixtures, all in one place</span></div><h1 className="text-4xl font-black leading-tight sm:text-6xl">Your next match starts <span className="text-primary-400">here.</span></h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Browse upcoming fixtures, check confirmed players, and reserve your place when you’re ready.</p><div className="mt-8 flex flex-wrap items-center gap-3">{user ? <><span className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white">Signed in as {user.user.name}</span>{user.user.role === 'admin' && <button onClick={() => setAdminMode(true)} className="rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-600">Open academy console <span aria-hidden="true">→</span></button>}<button onClick={logout} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Sign out</button></> : <><button onClick={browseFixtures} className="rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-600">Browse upcoming matches <span aria-hidden="true">↓</span></button><button onClick={() => openAuth('admin')} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Admin sign in <span aria-hidden="true">→</span></button></>}</div></div></div></section>
      <section id="upcoming-fixtures" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-primary-500">Fixture board</p><h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Upcoming matches</h2><p className="mt-1 text-sm text-slate-500">Tap the player count to see the confirmed squad.</p></div><p className="text-sm font-semibold text-slate-500">{activeMatches.length} match{activeMatches.length === 1 ? '' : 'es'} available</p></div>{loadError && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{loadError}</p>}{notice && <p className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}{loading ? <div className="py-16 text-center text-slate-500">Loading fixtures…</div> : activeMatches.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{activeMatches.map((match) => <MatchCard key={match.id} match={match} onSelect={setSelectedMatch} />)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><p className="text-lg font-bold text-slate-700 dark:text-slate-200">No open matches right now</p><p className="mt-1 text-sm text-slate-500">Check back soon for the next academy fixture.</p><button onClick={() => openAuth('student')} className="mt-5 rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white">Sign in for updates</button></div>}</section>
    </>}
    {selectedMatch && <RegistrationModal match={selectedMatch} user={user?.user?.role === 'student' ? user : null} onClose={() => setSelectedMatch(null)} onLogin={() => openAuth('student')} onSubmitted={() => setNotice('Registration submitted. Your payment proof is awaiting verification.')} />}
  </div>;
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
  const activeMatches = useMemo(() => matches.filter((match) => match.status === 'published'), [matches]);
  const handleLogin = (result) => { localStorage.setItem('bnioc_match_user', JSON.stringify(result)); setUser(result); setLoadError(''); setAuthOpen(false); if (result.user.role === 'admin') setAdminMode(true); };
  const logout = () => { localStorage.removeItem('bnioc_match_user'); setUser(null); setAdminMode(false); };
  return <div className="min-h-screen bg-slate-50 pt-8 dark:bg-slate-950">{authOpen && <AuthPanel onSuccess={handleLogin} onClose={() => setAuthOpen(false)} />}{adminMode && user?.user?.role === 'admin' ? <AdminDashboard user={user} matches={matches} onCreated={(created) => setMatches((old) => [created, ...old])} onMatchUpdated={(updated) => setMatches((old) => old.map((match) => match.id === updated.id ? updated : match))} onLogout={logout} /> : <><section className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8"><div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" /><div className="relative mx-auto max-w-7xl"><div className="max-w-3xl"><div className="mb-5 flex flex-wrap items-center gap-3"><span className="whitespace-nowrap rounded-full bg-primary-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-primary-300">🏏 Match Center</span><span className="text-xs font-semibold text-slate-400">BNIOC academy fixtures</span></div><h1 className="text-4xl font-black leading-tight sm:text-6xl">Every match is a chance to <span className="text-primary-400">step up.</span></h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Find your next fixture, pay the entry fee, and reserve your place with a verified transaction ID. Match links close automatically after match day.</p><div className="mt-8 flex flex-wrap gap-3">{user ? <><span className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white">Signed in as {user.user.name}</span>{user.user.role === 'admin' && <button onClick={() => setAdminMode(true)} className="rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white">Open academy console</button>}<button onClick={logout} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white">Sign out</button></> : <><button onClick={() => setAuthOpen(true)} className="rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white hover:bg-primary-600">Student / admin sign in <span aria-hidden="true">→</span></button><button onClick={() => setAuthOpen(true)} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">Admin: host a match <span aria-hidden="true">→</span></button></>}</div></div></div></section><section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-primary-500">Open registrations</p><h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Upcoming fixtures</h2></div><p className="text-sm text-slate-500">{activeMatches.length} match{activeMatches.length === 1 ? '' : 'es'} available</p></div>{loadError && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">Unable to load fixtures: {loadError}</p>}{notice && <p className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}{loading ? <div className="py-16 text-center text-slate-500">Loading fixtures…</div> : activeMatches.length ? <div className="grid gap-5 md:grid-cols-2">{activeMatches.map((match) => <MatchCard key={match.id} match={match} onSelect={setSelectedMatch} />)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700"><p className="text-lg font-bold text-slate-700 dark:text-slate-200">No open matches right now</p><p className="mt-1 text-sm text-slate-500">Check back soon for the next academy fixture.</p></div>}</section></>}{selectedMatch && <RegistrationModal match={selectedMatch} user={user?.user?.role === 'student' ? user : null} onClose={() => setSelectedMatch(null)} onLogin={() => { setAuthOpen(true); }} onSubmitted={() => setNotice('Registration submitted. Your payment proof is awaiting verification.')} />}</div>;
}

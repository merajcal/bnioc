const API_BASE = process.env.REACT_APP_API_URL || '/api';

const request = async (path, options = {}) => {
  const hasAuthorization = Object.keys(options.headers || {}).some((header) => header.toLowerCase() === 'authorization');
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  if (response.status === 401 && hasAuthorization && typeof window !== 'undefined') window.dispatchEvent(new Event('bnioc-auth-expired'));
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const error = new Error(payload.message || 'Request failed');
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export const getMatches = () => request('/matches');

export const login = ({ email, password }) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const registerStudent = ({ name, email, phone, password }) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, phone, password }) });

export const createMatch = (match, token) =>
  request('/matches', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(match) });

export const submitRegistration = (matchId, registration, token) =>
  request(`/matches/${matchId}/registrations`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(registration) });

export const getMyRegistration = (matchId, token) =>
  request(`/matches/${matchId}/registrations/me`, { headers: { Authorization: `Bearer ${token}` } });

export const getAdminData = (token) =>
  request('/admin/overview', { headers: { Authorization: `Bearer ${token}` } });

export const updateRegistration = (id, update, token) =>
  request(`/admin/registrations/${id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(typeof update === 'string' ? { status: update } : update) });

export const updateMatchStatus = (id, status, token) =>
  request(`/admin/matches/${id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) });

export const updateMatch = (id, match, token) =>
  request(`/admin/matches/${id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(match) });

export const cancelMatch = (id, token) => updateMatchStatus(id, 'cancelled', token);

export const addPlayer = (matchId, player, token) =>
  request(`/admin/matches/${matchId}/players`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(player) });

export const removePlayer = (id, token) =>
  request(`/admin/registrations/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });

import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'bnioc_match_user';
const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (error) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const saveUser = (nextUser) => {
    if (nextUser) localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(nextUser);
  };

  useEffect(() => {
    const syncFromOtherTab = (event) => {
      if (event.key !== STORAGE_KEY) return;
      try {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      } catch (error) {
        setUser(null);
      }
    };
    const clearExpiredSession = () => saveUser(null);
    window.addEventListener('storage', syncFromOtherTab);
    window.addEventListener('bnioc-auth-expired', clearExpiredSession);
    return () => {
      window.removeEventListener('storage', syncFromOtherTab);
      window.removeEventListener('bnioc-auth-expired', clearExpiredSession);
    };
  }, []);

  useEffect(() => {
    const encodedPayload = user?.token?.split('.')[1];
    if (!encodedPayload) return undefined;
    try {
      const payload = JSON.parse(window.atob(encodedPayload.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(encodedPayload.length / 4) * 4, '=')));
      const expiresAt = Number(payload.exp) * 1000;
      if (!expiresAt) return undefined;
      if (expiresAt <= Date.now()) {
        saveUser(null);
        return undefined;
      }
      const timer = window.setTimeout(() => saveUser(null), expiresAt - Date.now());
      return () => window.clearTimeout(timer);
    } catch (error) {
      return undefined;
    }
  }, [user?.token]);

  return <AuthContext.Provider value={{ user, setUser: saveUser, logout: () => saveUser(null) }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

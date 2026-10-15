import React, { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);
const DEMO_TOKEN = 'aero-demo-token';

function createDemoUser(details) {
  return {
    id: 'demo-reader',
    name: details.name || 'AERO Reader',
    email: details.email || 'demo@aero.local',
    preferences: ['Technology', 'Science']
  };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('aero_token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aero_user')) || null;
    } catch {
      return null;
    }
  });

  const persistSession = (session) => {
    setToken(session.token);
    setUser(session.user);
    localStorage.setItem('aero_token', session.token);
    localStorage.setItem('aero_user', JSON.stringify(session.user));
  };

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/api/auth/login', credentials);
      persistSession(data);
    } catch (error) {
      if (!error.response) {
        persistSession({ token: DEMO_TOKEN, user: createDemoUser(credentials) });
        return;
      }
      throw error;
    }
  };

  const register = async (details) => {
    try {
      const { data } = await api.post('/api/auth/register', details);
      persistSession(data);
    } catch (error) {
      if (!error.response) {
        persistSession({ token: DEMO_TOKEN, user: createDemoUser(details) });
        return;
      }
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('aero_token');
    localStorage.removeItem('aero_user');
  };

  const updateUser = (updates) => {
    setUser((current) => {
      const next = { ...current, ...updates };
      localStorage.setItem('aero_user', JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, register, logout, updateUser }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}

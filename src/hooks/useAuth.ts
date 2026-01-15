import { useState } from 'react';
import { User, AuthResponse } from '../lib/auth';
import * as authApi from '../lib/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => authApi.getAuthToken());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    email: string,
    name: string,
    password: string,
    phone?: string,
    address?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const data: AuthResponse = await authApi.registerUser(email, name, password, phone, address);
      authApi.setAuthToken(data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao registrar';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data: AuthResponse = await authApi.loginUser(email, password);
      authApi.setAuthToken(data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authApi.clearAuthToken();
    setToken(null);
    setUser(null);
  };

  const loadProfile = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const profile = await authApi.getProfile(token);
      setUser(profile);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar perfil';
      setError(message);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
    register,
    login,
    logout,
    loadProfile,
  };
}

import React, { createContext, ReactNode, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../lib/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  register: (email: string, name: string, password: string, phone?: string, address?: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  loadProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();

  useEffect(() => {
    if (auth.token && !auth.user) {
      auth.loadProfile();
    }
  }, [auth.token]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de AuthProvider');
  }
  return context;
}

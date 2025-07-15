import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  role: string;
  fullName?: string;
  email?: string;
  matricNumber?: string;
}


interface AuthContextType {
  user: User | null;
  token: string;
  login: ({ user, token }: { user: User; token: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser || storedUser === 'undefined') return null;
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');

const login = ({ user, token }: { user: User; token: string }) => {
  setUser(user);
  setToken(token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);

  // ✅ Must work based on role
  if (user.role === 'admin') {
    navigate('/admin/dashboard');
  } else {
    navigate('/student/dashboard');
  }
};
  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

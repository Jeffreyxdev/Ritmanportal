import{ createContext, useState } from 'react';
import type {  ReactNode, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
interface User {
  role: string;
  // add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  token: string;
  login: ({ user, token }: { user: User; token: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  // Load user from localStorage on first render
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  // Save user & token to state + localStorage on login
   const login = ({ user, token }: { user: User; token: string }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    // Optional auto-redirect
    navigate(`/${user.role}/dashboard`);
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  // Optional: token expiration handling (JWT expiry check)

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

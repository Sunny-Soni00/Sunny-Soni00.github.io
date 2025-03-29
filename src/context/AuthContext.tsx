
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type UserRole = 'user' | 'admin';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  toggleRole: () => void;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('user');

  // Load auth state from localStorage on initial render
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    
    if (savedAuth) setIsAuthenticated(savedAuth === 'true');
    if (savedRole) setUserRole(savedRole as UserRole);
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('userRole', userRole);
  }, [isAuthenticated, userRole]);

  const toggleRole = () => {
    const newRole = userRole === 'user' ? 'admin' : 'user';
    setUserRole(newRole);
    toast.success(`Switched to ${newRole.toUpperCase()} mode`);
  };

  const login = () => {
    setIsAuthenticated(true);
    toast.success('Successfully logged in');
  };

  const logout = () => {
    setIsAuthenticated(false);
    toast.success('Successfully logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, toggleRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

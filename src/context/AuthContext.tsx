
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AdminCredentials, UserDetails } from '../models/DataModels';

type UserRole = 'user' | 'admin';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  toggleRole: () => void;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails) => void;
  showUserDetailsForm: boolean;
  setShowUserDetailsForm: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_CREDENTIALS: AdminCredentials = {
  userId: "sunnysoni",
  password: "*CosmicGalaxyAdmin"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [showUserDetailsForm, setShowUserDetailsForm] = useState<boolean>(false);

  // Load auth state from localStorage on initial render
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    const savedUserDetails = localStorage.getItem('userDetails');
    
    if (savedAuth) setIsAuthenticated(savedAuth === 'true');
    if (savedRole) setUserRole(savedRole as UserRole);
    
    if (savedUserDetails) {
      setUserDetails(JSON.parse(savedUserDetails));
    } else {
      // If no user details are saved, show the form on first visit
      setShowUserDetailsForm(true);
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('userRole', userRole);
    
    if (userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
  }, [isAuthenticated, userRole, userDetails]);

  const toggleRole = () => {
    const newRole = userRole === 'user' ? 'admin' : 'user';
    setUserRole(newRole);
    toast.success(`Switched to ${newRole.toUpperCase()} mode`);
  };

  const login = (userId: string, password: string) => {
    if (userId === ADMIN_CREDENTIALS.userId && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setUserRole('admin');
      toast.success('Successfully logged in as admin');
      return true;
    } else {
      toast.error('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('user');
    toast.success('Successfully logged out');
  };

  const saveUserDetails = (details: UserDetails) => {
    setUserDetails(details);
    setShowUserDetailsForm(false);
    toast.success('User details saved');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      toggleRole, 
      login, 
      logout,
      userDetails,
      setUserDetails: saveUserDetails,
      showUserDetailsForm,
      setShowUserDetailsForm
    }}>
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


import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { AdminCredentials, UserDetails } from '../models/DataModels';
import { dataService } from '../services/DataService';

type UserRole = 'user' | 'admin';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (userId: string, password: string) => boolean;
  logout: () => void;
  userDetails: UserDetails | null;
  setUserDetails: (details: Omit<UserDetails, 'id'>) => void;
  showUserLogin: boolean;
  setShowUserLogin: (show: boolean) => void;
  showAdminLogin: boolean;
  setShowAdminLogin: (show: boolean) => void;
  toggleRole: () => void; // Added toggleRole function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_CREDENTIALS: AdminCredentials = {
  userId: "sunnysoni",
  password: "*SunnyGalaxyAdmin"
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [userDetails, setUserDetailsState] = useState<UserDetails | null>(null);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);

  // Load auth state from localStorage on initial render
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    const savedUserDetailsId = localStorage.getItem('currentUserDetailsId');
    
    if (savedAuth) setIsAuthenticated(savedAuth === 'true');
    if (savedRole) setUserRole(savedRole as UserRole);
    
    if (savedUserDetailsId) {
      const userDetails = dataService.getUserDetailsById(savedUserDetailsId);
      if (userDetails) {
        setUserDetailsState(userDetails);
      }
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    localStorage.setItem('userRole', userRole);
    
    if (userDetails) {
      localStorage.setItem('currentUserDetailsId', userDetails.id);
    }
  }, [isAuthenticated, userRole, userDetails]);

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

  const saveUserDetails = (details: Omit<UserDetails, 'id'>) => {
    const savedDetails = dataService.addUserDetails(details);
    setUserDetailsState(savedDetails);
    setShowUserLogin(false);
    setIsAuthenticated(true);
    toast.success('User details saved. You are now logged in!');
  };

  // Add toggleRole function implementation
  const toggleRole = () => {
    const newRole = userRole === 'user' ? 'admin' : 'user';
    setUserRole(newRole);
    toast.success(`Switched to ${newRole} mode`);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      login, 
      logout,
      userDetails,
      setUserDetails: saveUserDetails,
      showUserLogin,
      setShowUserLogin,
      showAdminLogin,
      setShowAdminLogin,
      toggleRole // Added toggleRole to the context value
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

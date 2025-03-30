
import React from 'react';
import { User, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GlowingButton from './GlowingButton';

const AuthButtons = () => {
  const { 
    isAuthenticated, 
    userRole, 
    logout, 
    setShowUserLogin, 
    setShowAdminLogin,
    userDetails 
  } = useAuth();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
      {isAuthenticated ? (
        <>
          <div className="bg-black/60 text-white p-3 rounded-md text-sm backdrop-blur-md border border-white/10 mb-2">
            Logged in as: <span className="font-bold">{userRole === 'admin' ? 'Admin' : userDetails?.name}</span>
          </div>
          <GlowingButton 
            onClick={logout} 
            className="flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Logout
          </GlowingButton>
        </>
      ) : (
        <>
          <GlowingButton 
            onClick={() => setShowUserLogin(true)} 
            className="flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            User Sign In
          </GlowingButton>
          <GlowingButton 
            onClick={() => setShowAdminLogin(true)}
            className="flex items-center justify-center gap-2 bg-purple-500/80 hover:bg-purple-600/80"
          >
            <Shield className="w-4 h-4" />
            Admin Sign In
          </GlowingButton>
        </>
      )}
    </div>
  );
};

export default AuthButtons;

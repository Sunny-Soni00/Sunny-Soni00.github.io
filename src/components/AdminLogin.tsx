
import React, { useState } from 'react';
import GlassCard from './GlassCard';
import GlowingButton from './GlowingButton';
import { User, Key, LogIn, UserCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const { login, setShowAdminLogin } = useAuth();
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !userId || !password) {
      setError('Please enter name, user ID and password');
      return;
    }
    
    const success = login(userId, password);
    if (success) {
      setShowAdminLogin(false);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <GlassCard className="w-full max-w-md p-6 relative">
        <button 
          onClick={() => setShowAdminLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-2 text-center">Admin Sign In</h2>
        <p className="text-gray-300 mb-6 text-center">
          Enter your credentials to access the admin dashboard
        </p>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <UserCircle className="w-4 h-4 mr-2 text-neon-blue" />
              Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              required
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <User className="w-4 h-4 mr-2 text-neon-blue" />
              User ID
            </label>
            <input 
              type="text" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              required
              placeholder="Enter your user ID"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <Key className="w-4 h-4 mr-2 text-neon-blue" />
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              required
              placeholder="Enter your password"
            />
          </div>
          
          <div className="pt-4">
            <GlowingButton type="submit" className="w-full flex items-center justify-center">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </GlowingButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default AdminLogin;

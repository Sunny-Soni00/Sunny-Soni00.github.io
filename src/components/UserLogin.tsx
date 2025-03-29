
import React, { useState } from 'react';
import GlassCard from './GlassCard';
import GlowingButton from './GlowingButton';
import { User, Mail, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const UserLogin = () => {
  const { setUserDetails } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name) {
      setError('Please enter your name');
      return;
    }
    
    // The id will be added by the DataService
    setUserDetails({
      name,
      email,
      visitDate: new Date().toISOString()
    });
    
    toast.success('Successfully logged in!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <GlassCard className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-2 text-center">User Login</h2>
        <p className="text-gray-300 mb-6 text-center">
          Welcome to Sunny's Galaxy! Please enter your details to continue
        </p>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <User className="w-4 h-4 mr-2 text-neon-blue" />
              Your Name
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
              <Mail className="w-4 h-4 mr-2 text-neon-blue" />
              Email Address (Optional)
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="pt-4">
            <GlowingButton type="submit" className="w-full flex items-center justify-center">
              <LogIn className="w-4 h-4 mr-2" />
              Continue
            </GlowingButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default UserLogin;

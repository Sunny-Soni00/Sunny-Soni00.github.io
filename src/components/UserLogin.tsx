
import React, { useState } from 'react';
import GlassCard from './GlassCard';
import GlowingButton from './GlowingButton';
import { User, Mail, Phone, Calendar, Briefcase, FileImage, Heart, LogIn, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const UserLogin = () => {
  const { setUserDetails, setShowUserLogin } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');
  const [error, setError] = useState('');

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      visitDate: new Date().toISOString(),
      age: age ? parseInt(age) : undefined,
      gender: gender || undefined,
      phone: phone || undefined,
      occupation: occupation || undefined,
      bio: bio || undefined,
      interests: interests ? interests.split(',').map(i => i.trim()) : undefined,
      profilePicture: profilePicturePreview || undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 overflow-y-auto">
      <GlassCard className="w-full max-w-md p-6 relative">
        <button 
          onClick={() => setShowUserLogin(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold mb-2 text-center">User Sign Up</h2>
        <p className="text-gray-300 mb-6 text-center">
          Welcome to Sunny's Galaxy! Please enter your details to continue
        </p>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center">
                <User className="w-4 h-4 mr-2 text-neon-blue" />
                Your Name*
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
                Email
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-neon-blue" />
                Age
              </label>
              <input 
                type="number" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                placeholder="Enter your age"
                min="1"
                max="120"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center">
                <User className="w-4 h-4 mr-2 text-neon-blue" />
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <Phone className="w-4 h-4 mr-2 text-neon-blue" />
              Phone Number
            </label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-neon-blue" />
              Occupation
            </label>
            <input 
              type="text" 
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              placeholder="Enter your occupation"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <User className="w-4 h-4 mr-2 text-neon-blue" />
              Bio
            </label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              placeholder="Tell us about yourself"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <Heart className="w-4 h-4 mr-2 text-neon-blue" />
              Interests (comma separated)
            </label>
            <input 
              type="text" 
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
              focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
              placeholder="e.g. Coding, Music, Reading"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center">
              <FileImage className="w-4 h-4 mr-2 text-neon-blue" />
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
                id="profile-picture"
              />
              <label 
                htmlFor="profile-picture"
                className="px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                hover:border-neon-blue cursor-pointer transition-all flex items-center"
              >
                <FileImage className="w-4 h-4 mr-2" />
                Choose Image
              </label>
              
              {profilePicturePreview && (
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                  <img 
                    src={profilePicturePreview} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-4">
            <GlowingButton type="submit" className="w-full flex items-center justify-center">
              <LogIn className="w-4 h-4 mr-2" />
              Sign Up
            </GlowingButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default UserLogin;

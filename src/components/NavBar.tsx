
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { Search, User, Menu, X, Shield, LogIn, LogOut, FileDown, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { dataService } from '../services/DataService';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { userRole, isAuthenticated, userDetails, logout, setShowUserLogin, setShowAdminLogin } = useAuth();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'RESOURCES', path: '/resources' },
    { name: 'REVIEWS', path: '/reviews' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast.info(`Searching for: ${searchTerm}`);
      // In a real app, you would implement actual search logic here
      setSearchTerm('');
    }
  };

  const handleDownloadDatabase = () => {
    dataService.downloadDatabase();
    toast.success('Database downloaded successfully');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `px-2 py-1 relative text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-neon-blue after:shadow-neon-glow' 
                    : 'text-gray-300 hover:text-white'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            {userRole === 'admin' && (
              <NavLink
                to="/admin"
                className={({ isActive }) => 
                  `px-2 py-1 relative text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'text-neon-pink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-neon-pink after:shadow-neon-pink' 
                    : 'text-neon-pink/70 hover:text-neon-pink'}`
                }
              >
                ADMIN
              </NavLink>
            )}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 w-40 bg-black/40 border border-white/10 rounded-full text-sm focus:outline-none focus:border-neon-blue focus:shadow-neon-glow text-white"
              />
              <button type="submit" className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-4 w-4">
                <Search className="h-4 w-4" />
              </button>
            </form>
            
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-sm py-1.5 px-3 rounded-full bg-black/40 border border-white/10 hover:border-neon-blue transition-colors"
                >
                  <Avatar className="h-6 w-6">
                    {userDetails?.profilePicture ? (
                      <AvatarImage src={userDetails.profilePicture} />
                    ) : (
                      <AvatarFallback className="bg-neon-blue/30 text-white text-xs">
                        {userDetails?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span>{userDetails?.name || (userRole === 'admin' ? 'Admin' : 'User')}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-md shadow-neon-glow z-50">
                    {userRole === 'admin' && (
                      <button 
                        onClick={handleDownloadDatabase}
                        className="flex w-full items-center px-4 py-2 text-sm text-white hover:bg-neon-blue/20 transition-colors"
                      >
                        <FileDown className="h-4 w-4 mr-2" />
                        Download Database
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-white hover:bg-red-500/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowUserLogin(true)}
                  className="flex items-center space-x-1 text-sm py-1.5 px-3 neon-button"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>SIGN UP</span>
                </button>
                <button 
                  onClick={() => setShowAdminLogin(true)}
                  className="flex items-center space-x-1 text-sm py-1.5 px-3 neon-button border-neon-pink/70 shadow-neon-pink"
                >
                  <Shield className="h-4 w-4" />
                  <span>ADMIN</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded ${
                    isActive ? 'neon-border text-white' : 'text-gray-300'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            {userRole === 'admin' && (
              <NavLink
                to="/admin"
                className={({ isActive }) => 
                  `block px-3 py-2 rounded neon-border-pink ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                ADMIN
              </NavLink>
            )}
            <div className="pt-4 border-t border-white/10">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-2 w-full bg-black/40 border border-white/10 rounded-full text-sm focus:outline-none focus:border-neon-blue focus:shadow-neon-glow text-white"
                />
                <button type="submit" className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-4 w-4">
                  <Search className="h-4 w-4" />
                </button>
              </form>
              
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 bg-black/40 rounded-md">
                    <Avatar className="h-8 w-8">
                      {userDetails?.profilePicture ? (
                        <AvatarImage src={userDetails.profilePicture} />
                      ) : (
                        <AvatarFallback className="bg-neon-blue/30 text-white">
                          {userDetails?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{userDetails?.name || 'User'}</div>
                      <div className="text-xs text-gray-400">{userRole === 'admin' ? 'Administrator' : 'User'}</div>
                    </div>
                  </div>
                  
                  {userRole === 'admin' && (
                    <button 
                      onClick={handleDownloadDatabase}
                      className="w-full flex items-center justify-center neon-button py-2"
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Download Database
                    </button>
                  )}
                  
                  <button 
                    onClick={logout}
                    className="w-full flex items-center justify-center py-2 bg-black/40 border border-red-500/30 rounded-md hover:bg-red-900/30 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      setShowUserLogin(true);
                      setIsOpen(false);
                    }}
                    className="w-full neon-button flex items-center justify-center py-2"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    <span>SIGN UP</span>
                  </button>
                  <button 
                    onClick={() => {
                      setShowAdminLogin(true);
                      setIsOpen(false);
                    }}
                    className="w-full neon-button border-neon-pink/70 shadow-neon-pink flex items-center justify-center py-2"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    <span>ADMIN</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;

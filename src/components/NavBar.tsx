
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { Search, User, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'RESOURCES', path: '/resources' },
    { name: 'REVIEWS', path: '/reviews' },
  ];

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
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-3 py-1.5 w-40 bg-black/40 border border-white/10 rounded-full text-sm focus:outline-none focus:border-neon-blue focus:shadow-neon-glow text-white"
              />
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <button className="neon-button flex items-center space-x-1 text-sm py-1.5">
              <User className="h-4 w-4" />
              <span>USER MODE</span>
            </button>
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
            <div className="pt-4 border-t border-white/10">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-3 py-2 w-full bg-black/40 border border-white/10 rounded-full text-sm focus:outline-none focus:border-neon-blue focus:shadow-neon-glow text-white"
                />
                <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <button className="neon-button w-full flex items-center justify-center space-x-1">
                <User className="h-4 w-4" />
                <span>USER MODE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;

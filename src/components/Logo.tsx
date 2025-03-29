
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple animate-pulse-glow"></div>
        <div className="absolute inset-1 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="absolute w-6 h-6 rounded-full border border-white/20 animate-rotate-slow"></div>
          <div className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-orbit"></div>
        </div>
      </div>
      <span className="ml-2 text-xl font-bold text-white">
        Sunny's <span className="neon-text">Galaxy</span>
      </span>
    </div>
  );
};

export default Logo;

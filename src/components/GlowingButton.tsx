
import React from 'react';

interface GlowingButtonProps {
  children: React.ReactNode;
  color?: 'cyan' | 'pink' | 'purple';
  className?: string;
  onClick?: () => void;
}

const GlowingButton = ({ 
  children, 
  color = 'cyan', 
  className = '',
  onClick
}: GlowingButtonProps) => {
  
  const colorStyles = {
    cyan: 'border-neon-blue/70 shadow-neon-glow hover:shadow-neon-glow-strong hover:border-neon-blue',
    pink: 'border-neon-pink/70 shadow-neon-pink hover:border-neon-pink',
    purple: 'border-neon-purple/70 shadow-neon-purple hover:border-neon-purple'
  };
  
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full bg-black/40 border 
      transition-all duration-300 text-white hover:bg-black/60
      focus:outline-none focus:ring-2 active:scale-95 ${colorStyles[color]} ${className}`}
    >
      {children}
    </button>
  );
};

export default GlowingButton;

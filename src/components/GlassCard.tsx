
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'pink' | 'purple';
  hover?: boolean;
  onClick?: () => void; // Add onClick prop
}

const GlassCard = ({ 
  children, 
  className = '', 
  glowColor = 'cyan',
  hover = true,
  onClick 
}: GlassCardProps) => {
  
  const glowStyles = {
    cyan: 'hover:shadow-neon-glow hover:border-neon-blue/50',
    pink: 'hover:shadow-neon-pink hover:border-neon-pink/50',
    purple: 'hover:shadow-neon-purple hover:border-neon-purple/50'
  };
  
  return (
    <div 
      className={`glass-card ${hover ? glowStyles[glowColor] : ''} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;

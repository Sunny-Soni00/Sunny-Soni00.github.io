
import React from 'react';
import { Link } from 'react-router-dom';

interface GlowingButtonProps {
  children: React.ReactNode;
  color?: 'cyan' | 'pink' | 'purple';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  as?: React.ComponentType<any>;
  to?: string;
  disabled?: boolean;
}

const GlowingButton = ({ 
  children, 
  color = 'cyan', 
  className = '',
  onClick,
  type = 'button',
  as,
  to,
  disabled = false,
  ...rest
}: GlowingButtonProps) => {
  
  const colorStyles = {
    cyan: 'border-neon-blue/70 shadow-neon-glow hover:shadow-neon-glow-strong hover:border-neon-blue',
    pink: 'border-neon-pink/70 shadow-neon-pink hover:border-neon-pink',
    purple: 'border-neon-purple/70 shadow-neon-purple hover:border-neon-purple'
  };
  
  const baseClasses = `px-5 py-2 rounded-full bg-black/40 border 
    transition-all duration-300 text-white hover:bg-black/60
    focus:outline-none focus:ring-2 active:scale-95 ${colorStyles[color]} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={baseClasses} {...rest}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default GlowingButton;

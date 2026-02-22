import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export function GlassButton({ children, onClick, className = '', type = 'button' }: GlassButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`glass-button ${className}`}
    >
      {children}
    </button>
  );
}

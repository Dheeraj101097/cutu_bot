import React from 'react';

export function GlassButton({ children, onClick, className = '', type = 'button' }) {
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
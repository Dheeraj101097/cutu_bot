import React from 'react';

export function GlassCard({ children, className = '', onClick, onDragOver, onDragLeave, onDrop }) {
  return (
    <div 
      className={`bg-[var(--glass-bg)] backdrop-blur-[40px] border border-[var(--glass-border)] rounded-[24px] shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer hover:-translate-y-[2px] hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.15)] ${className}`}
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
}
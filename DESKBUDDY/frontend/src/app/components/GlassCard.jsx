import React from 'react';

export function GlassCard({ children, className = '', onClick, onDragOver, onDragLeave, onDrop }) {
  return (
    <div 
      className={`glass-card ${className}`}
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
}
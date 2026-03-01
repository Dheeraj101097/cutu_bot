import React from 'react';

export function GlassButton({ children, onClick, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-br from-[var(--mint)] to-[var(--gold)] text-[#1A2822] px-8 py-4 rounded-full font-semibold shadow-[0_8px_24px_0_rgba(222,237,207,0.3)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_0_rgba(222,237,207,0.5)] active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}
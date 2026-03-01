import React from 'react';

export function GlassInput({ type = 'text', placeholder, value, onChange, className = '' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-[var(--glass-bg)] backdrop-blur-[20px] border border-[var(--glass-border)] rounded-full px-6 py-[14px] text-inherit outline-none transition-all duration-300 placeholder:opacity-50 focus:border-[var(--mint)] focus:shadow-[0_0_0_4px_rgba(222,237,207,0.1)] ${className}`}
    />
  );
}
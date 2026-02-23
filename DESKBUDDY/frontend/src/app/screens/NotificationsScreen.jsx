import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { ChevronLeft, Bell, BellRing } from 'lucide-react';

export function NotificationsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,var(--bg-glow)_0%,var(--bg-base)_100%)] text-[var(--text-main)] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] overflow-x-hidden">
      <div className="flex flex-col h-full px-6 pt-16 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          {/* <button 
            onClick={() => navigate(-1)}
            className="nav-icon opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button> */}
          <div>
            <h1 className="text-3xl">Notifications</h1>
            <p className="text-[var(--gold)] opacity-80 text-sm">Stay Updated</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center opacity-40 text-center px-12">
          <div className="p-6 rounded-full bg-white/5 mb-6">
            <BellRing className="w-12 h-12" />
          </div>
          <h2 className="text-xl mb-2">No new updates</h2>
          <p className="text-sm">We'll notify you when something important happens.</p>
        </div>
      </div>
    </div>
  );
}

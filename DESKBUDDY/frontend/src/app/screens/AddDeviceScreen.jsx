import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { ChevronLeft, Plus, Monitor, Bot, Layout } from 'lucide-react';

export function AddDeviceScreen() {
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
            <h1 className="text-3xl">Add Device</h1>
            <p className="text-[var(--gold)] opacity-80 text-sm">Monitor or add new bot</p>
          </div>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto scrollbar-hide">
          {/* Table Frame Placeholder */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="icon-wrapper">
                <Layout className="w-5 h-5" />
              </div>
              <h2 className="text-xl">Table Frame</h2>
            </div>
            <div className="aspect-video bg-white/5 rounded-xl border border-dashed border-white/20 flex items-center justify-center">
              <span className="opacity-40">Static Placeholder: Table Layout</span>
            </div>
          </GlassCard>

          {/* Desktop Bot Placeholder */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="icon-wrapper">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-xl">Desktop Bot</h2>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm opacity-60">Status</span>
                <span className="text-sm text-mint">Connected</span>
              </div>
              <div className="h-2 gradient-bar w-full mb-4" />
              <p className="text-sm opacity-50">Current Project: Desk Buddy AI</p>
            </div>
          </GlassCard>

          {/* Simple Placeholder */}
          {/* <GlassCard className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="icon-wrapper">
                <Plus className="w-5 h-5" />
              </div>
              <h2 className="text-xl">Device Details</h2>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-white/5 rounded-lg border border-white/5 animate-pulse" />
              ))}
            </div>
          </GlassCard> */}
        </div>
      </div>
    </div>
  );
}

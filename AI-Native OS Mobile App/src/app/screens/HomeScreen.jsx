import React from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { MessageSquare, Upload, TrendingUp, Music, Home, Plus, Search, Bell, User } from 'lucide-react';

export function HomeScreen() {
  const navigate = useNavigate();

  const features = [
    { icon: MessageSquare, label: 'Bot', route: '/chat' },
    { icon: Upload, label: 'Upload', route: '/upload' },
    { icon: TrendingUp, label: 'Stocks', route: '/stocks' },
    { icon: Music, label: 'Music', route: '/music' },
  ];

  const navItems = [
    { icon: Home, active: true },
    { icon: Plus, active: false },
    { icon: Bell, active: false },
    { icon: User, active: false },
  ];
  

  return (
    <div className="screen-container">
      <div className="flex flex-col h-full px-6 pt-16 pb-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Hi Dheeraj</h1>
          <p className="opacity-60">Welcome to your AI-Native OS</p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <GlassCard
                key={feature.label}
                className="feature-card"
                onClick={() => navigate(feature.route)}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="icon-wrapper">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-lg">{feature.label}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-6 right-6">
        <GlassCard className="px-8 py-4">
          <div className="flex justify-between items-center">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  className={`nav-icon ${item.active ? 'active' : ''}`}
                  onClick={() => {
                    if (idx === 3) navigate('/settings');
                  }}
                >
                  <Icon className="w-6 h-6" />
                </button>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}





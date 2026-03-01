import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { GlassCard } from './GlassCard';
import { Home, Plus, Bell, User } from 'lucide-react';

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/home' },
    { icon: Plus, path: '/add-device' },
    { icon: Bell, path: '/notifications' },
    { icon: User, path: '/settings' },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-main)]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <Outlet />
      </div>

      {/* Persistent Bottom Navigation */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <GlassCard className="px-8 py-4 backdrop-blur-xl">
          <div className="flex justify-between items-center">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={idx}
                  className={`p-2 transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-[var(--gold)] opacity-100' 
                      : 'text-current opacity-60 hover:opacity-100 hover:text-[var(--mint)]'
                  }`}
                  onClick={() => navigate(item.path)}
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

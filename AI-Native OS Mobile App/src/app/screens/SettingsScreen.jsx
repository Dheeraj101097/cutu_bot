import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, User, Lock, Shield, Bell, Moon, Sun } from 'lucide-react';

export function SettingsScreen() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-8 pb-4 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/home')} className="nav-icon">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-24 pb-8 space-y-6">
        {/* Profile */}
        <GlassCard className="p-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mint to-gold flex items-center justify-center">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg">Dheeraj Kumar</h3>
              <p className="text-sm opacity-60">dheeraj@example.com</p>
            </div>
          </div>
        </GlassCard>

        {/* Account Settings */}
        <div>
          <h2 className="text-sm opacity-60 mb-3 px-1">Account</h2>
          <GlassCard className="divide-y divide-white/5">
            <div className="setting-item">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 opacity-60" />
                <span>Profile Settings</span>
              </div>
              <button className="opacity-60">→</button>
            </div>
            
            <div className="setting-item">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 opacity-60" />
                <span>Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`toggle-switch ${notifications ? 'active' : ''}`}
              >
                <div className="toggle-knob"></div>
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Privacy Settings */}
        <div>
          <h2 className="text-sm opacity-60 mb-3 px-1">Privacy</h2>
          <GlassCard className="divide-y divide-white/5">
            <div className="setting-item">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 opacity-60" />
                <span>Change Password</span>
              </div>
              <button className="opacity-60">→</button>
            </div>
            
            <div className="setting-item">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 opacity-60" />
                <span>Two-Factor Auth</span>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`toggle-switch ${twoFactor ? 'active' : ''}`}
              >
                <div className="toggle-knob"></div>
              </button>
            </div>

            <div className="setting-item">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 opacity-60" />
                <span>Biometric Lock</span>
              </div>
              <button
                onClick={() => setBiometric(!biometric)}
                className={`toggle-switch ${biometric ? 'active' : ''}`}
              >
                <div className="toggle-knob"></div>
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Appearance */}
        <div>
          <h2 className="text-sm opacity-60 mb-3 px-1">Appearance</h2>
          <GlassCard className="setting-item">
            <div className="flex items-center space-x-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 opacity-60" />
              ) : (
                <Sun className="w-5 h-5 opacity-60" />
              )}
              <span>Theme</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}
            >
              <div className="toggle-knob"></div>
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}





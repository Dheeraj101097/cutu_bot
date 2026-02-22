import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { GlassInput } from '../components/GlassInput';
import { Sparkles } from 'lucide-react';

export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigate('/home');
  };

  return (
    <div className="screen-container">
      <div className="flex flex-col items-center justify-center h-full px-6">
        {/* Floating AI Logo */}
        <div className="mb-12 animate-float">
          <div className="ai-logo">
            <Sparkles className="w-12 h-12" />
          </div>
        </div>

        {/* Glass Card */}
        <GlassCard className="w-full max-w-sm p-8">
          <h1 className="text-3xl mb-8 text-center">Welcome Back</h1>
          
          <div className="space-y-4">
            <GlassInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <GlassInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <GlassButton onClick={handleLogin} className="w-full mt-8">
            Login
          </GlassButton>

          <p className="text-center mt-6 text-sm opacity-70">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-mint hover:underline"
            >
              Sign up
            </button>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}

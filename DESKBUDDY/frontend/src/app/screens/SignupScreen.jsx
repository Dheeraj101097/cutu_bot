import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { GlassInput } from '../components/GlassInput';
import { Sparkles, Mail, Lock, User, Chrome, Apple } from 'lucide-react';

export function SignupScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    navigate('/home');
  };

  return (
    <div className="screen-container overflow-y-auto pb-12">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-12">
        {/* Glass Card */}
        <GlassCard className="w-full max-w-sm p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-10 text-center tracking-tight text-white/90">Create Account</h1>
          
          <div className="w-full space-y-5">
            <div className="relative">
              <GlassInput
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-5 ring-offset-background"
              />
            </div>
            
            <div className="relative">
              <GlassInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-5"
              />
            </div>
            
            <div className="relative">
              <GlassInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-5"
              />
            </div>
          </div>

          <div className="w-full text-right mt-3">
            <button className="text-xs text-white/60 hover:text-white transition-colors">
              Forgot Password?
            </button>
          </div>

          <GlassButton onClick={handleSignup} className="w-full mt-10 text-lg py-5 shadow-xl shadow-mint/20">
            Sign Up
          </GlassButton>

          <p className="text-center mt-10 text-sm text-white/60">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-white font-semibold hover:underline"
            >
              Login
            </button>
          </p>

          <div className="w-full flex items-center gap-4 my-8">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Or continue with</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Chrome className="w-5 h-5" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Apple className="w-5 h-5" />
              <span className="text-sm font-medium">Apple</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}





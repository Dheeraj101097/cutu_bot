import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';

export function MusicScreen() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(45);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,var(--bg-glow)_0%,var(--bg-base)_100%)] text-[var(--text-main)] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-8 pb-4 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/home')} className="p-2 opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold">Music</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full px-6 pt-16 pb-8">
        {/* Album Art */}
        <div className="relative mb-12">
          <div className="album-glow"></div>
          <GlassCard className="p-2 relative z-10">
            <img
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400"
              alt="Album Art"
              className="w-64 h-64 rounded-3xl object-cover"
            />
          </GlassCard>
        </div>

        {/* Song Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl mb-2">Midnight Dreams</h2>
          <p className="opacity-60">The Synthwave Collective</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-8">
          <GlassCard className="p-1">
            <div className="h-1 rounded-full overflow-hidden bg-white/5">
              <div
                className="h-full gradient-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </GlassCard>
          <div className="flex justify-between text-xs opacity-60 mt-2 px-2">
            <span>2:15</span>
            <span>5:00</span>
          </div>
        </div>

        {/* Controls */}
        <GlassCard className="px-8 py-6">
          <div className="flex items-center justify-between space-x-6">
            <button className="nav-icon">
              <Shuffle className="w-5 h-5" />
            </button>
            
            <button className="nav-icon">
              <SkipBack className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="icon-wrapper p-4"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" />
              ) : (
                <Play className="w-7 h-7" />
              )}
            </button>
            
            <button className="nav-icon">
              <SkipForward className="w-6 h-6" />
            </button>
            
            <button className="nav-icon">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}





import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Menu,
} from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(0.45);

  return (
    <div className="min-h-screen pb-32">
      <header className="px-6 pt-16 pb-12 flex items-center justify-between">
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-[--text-primary] opacity-50">
          <Menu size={18} />
        </button>
        <div className="text-center">
          <p className="text-[10px] font-bold text-[--text-secondary] opacity-50 tracking-widest uppercase">Now Playing</p>
        </div>
        <div className="w-10 h-10" /> {/* Spacer */}
      </header>

      <div className="px-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Album Art Section with Mesh Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full aspect-square max-w-[320px] mb-16"
        >
          {/* Multi-layered Radial Glows */}
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-[80px] -translate-x-4 -translate-y-4" />
          <div className="absolute inset-0 bg-mint-glow/30 rounded-full blur-[100px] translate-x-4 translate-y-4" />
          
          <div className="relative w-full h-full rounded-full p-1 glass border-white/20 shadow-2xl overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
               <div className="w-full h-full rounded-full bg-white/20 blur-[40px] animate-pulse" />
               <img 
                 src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop" 
                 alt="Solar Power" 
                 className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-mint-glow/20 to-transparent" />
            </div>
          </div>
        </motion.div>

        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-bold text-[--text-primary] tracking-tight">Solar Power</h2>
          <p className="text-sm font-semibold text-[--text-secondary] opacity-60">Lorde</p>
        </div>

        <div className="w-full space-y-12">
          {/* Progress Bar Container */}
          <div className="space-y-4">
            <div className="relative h-2 w-full glass rounded-full overflow-hidden border-white/5">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-mint-glow via-emerald-400 to-emerald-500 rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-[--text-secondary] opacity-40 tracking-tighter">
              <span>01:42</span>
              <span>03:52</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between px-4">
            <button className="text-[--text-primary] opacity-30 hover:opacity-100 transition-opacity">
              <SkipBack size={32} fill="currentColor" stroke="none" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full glass border-white/40 flex items-center justify-center text-[--text-primary] shadow-2xl active:scale-90 transition-all"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" stroke="none" /> : <Play size={32} fill="currentColor" stroke="none" className="ml-1" />}
            </button>
            <button className="text-[--text-primary] opacity-30 hover:opacity-100 transition-opacity">
              <SkipForward size={32} fill="currentColor" stroke="none" />
            </button>
          </div>

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between px-6 pt-6 opacity-40">
            <Shuffle size={20} className="text-[--text-primary] cursor-pointer" />
            <div className="flex items-center gap-3 flex-1 px-8">
              <Volume2 size={16} className="text-[--text-primary]" />
              <div className="flex-1 h-1 glass rounded-full" />
            </div>
            <Repeat size={20} className="text-[--text-primary] cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

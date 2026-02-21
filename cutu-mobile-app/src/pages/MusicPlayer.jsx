import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  List,
} from "lucide-react";

const mockPlaylist = [
  { id: 1, title: "Summer Vibes", artist: "Artist One", duration: "3:24" },
  { id: 2, title: "Night Drive", artist: "Artist Two", duration: "4:12" },
  { id: 3, title: "Morning Coffee", artist: "Artist Three", duration: "2:58" },
  { id: 4, title: "Sunset Dreams", artist: "Artist Four", duration: "3:45" },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [currentTrack] = useState(mockPlaylist[0]);

  return (
    <div className="min-h-dvh bg-app pb-24">
      <header className="sticky top-0 z-10 glass border-b border-[var(--glass-border)] safe-top">
        <div className="px-4 py-4">
          <h1 className="text-lg font-semibold font-display text-[var(--text-primary)]">
            Music
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Now playing
          </p>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="glass-card p-6 overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-40"
              style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(222,237,207,0.5) 0%, transparent 70%)" }}
            />
            <div className="relative">
            <div className="w-44 h-44 mx-auto rounded-card overflow-hidden shadow-lg mb-6">
              <div className="w-full h-full bg-gradient-to-br from-secondary/40 to-accent/40 flex items-center justify-center">
                <span className="text-6xl">🎵</span>
              </div>
            </div>
            <h2 className="font-semibold text-[var(--text-primary)] text-lg">
              {currentTrack.title}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mt-1">
              {currentTrack.artist}
            </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="px-2">
            <div className="h-1.5 rounded-full overflow-hidden glass">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-surface-light to-accent"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-2">
              <span>1:12</span>
              <span>3:24</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <button className="min-h-tap min-w-[44px] flex items-center justify-center text-[var(--text-secondary)] active:scale-95">
              <Shuffle size={20} />
            </button>
            <button className="min-h-tap min-w-[44px] flex items-center justify-center text-[var(--text-primary)] active:scale-95">
              <SkipBack size={24} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-surface-light to-accent flex items-center justify-center text-primary active:scale-95 shadow-lg"
            >
              {isPlaying ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" className="ml-1" />
              )}
            </button>
            <button className="min-h-tap min-w-[44px] flex items-center justify-center text-[var(--text-primary)] active:scale-95">
              <SkipForward size={24} />
            </button>
            <button className="min-h-tap min-w-[44px] flex items-center justify-center text-[var(--text-secondary)] active:scale-95">
              <Repeat size={20} />
            </button>
          </div>
        </motion.div>

        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--glass-border)]">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Playlist
            </h3>
            <button className="text-secondary text-xs font-medium flex items-center gap-1 min-h-tap">
              <List size={14} /> All
            </button>
          </div>
          <div className="divide-y divide-[var(--glass-border)]">
            {mockPlaylist.map((track, i) => (
              <div
                key={track.id}
                className={`flex items-center gap-3 px-4 py-3 ${
                  i === 0 ? "bg-surface-light/10" : ""
                }`}
              >
                <span className="text-[var(--text-secondary)] text-xs w-5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {track.title}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {track.artist}
                  </p>
                </div>
                <span className="text-xs text-[var(--text-secondary)]">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

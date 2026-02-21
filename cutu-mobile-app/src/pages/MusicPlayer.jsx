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
import GlassCard from "../components/GlassCard";

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
    <div className="min-h-dvh bg-cutu-bg pb-20">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 safe-top">
        <div className="px-4 py-4">
          <h1 className="text-lg font-semibold font-display text-cutu-text">
            Music
          </h1>
          <p className="text-xs text-cutu-text-secondary mt-0.5">
            Playlists and now playing
          </p>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <GlassCard className="p-6 overflow-hidden">
            <div className="w-40 h-40 mx-auto rounded-2xl bg-gradient-to-br from-cutu-primary/30 to-cutu-accent/30 flex items-center justify-center mb-6">
              <div className="w-32 h-32 rounded-xl bg-white/60 flex items-center justify-center">
                <span className="text-4xl">🎵</span>
              </div>
            </div>
            <h2 className="font-semibold text-cutu-text text-lg">
              {currentTrack.title}
            </h2>
            <p className="text-cutu-text-secondary text-sm mt-1">
              {currentTrack.artist}
            </p>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="px-2">
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cutu-primary rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-cutu-muted mt-1">
              <span>1:12</span>
              <span>3:24</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <button className="p-2 text-cutu-muted active:scale-95">
              <Shuffle size={20} />
            </button>
            <button className="p-2 text-cutu-text active:scale-95">
              <SkipBack size={24} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-cutu-primary text-white flex items-center justify-center shadow-soft active:scale-95"
            >
              {isPlaying ? (
                <Pause size={24} fill="currentColor" />
              ) : (
                <Play size={24} fill="currentColor" className="ml-1" />
              )}
            </button>
            <button className="p-2 text-cutu-text active:scale-95">
              <SkipForward size={24} />
            </button>
            <button className="p-2 text-cutu-muted active:scale-95">
              <Repeat size={20} />
            </button>
          </div>
        </motion.div>

        <GlassCard animate={false} className="overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-cutu-text">
              Playlist
            </h3>
            <button className="text-cutu-primary text-xs font-medium flex items-center gap-1">
              <List size={14} /> All
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {mockPlaylist.map((track, i) => (
              <div
                key={track.id}
                className={`flex items-center gap-3 px-4 py-3 ${
                  i === 0 ? "bg-cutu-primary-soft/40" : ""
                }`}
              >
                <span className="text-cutu-muted text-xs w-5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-cutu-text truncate">
                    {track.title}
                  </p>
                  <p className="text-xs text-cutu-text-secondary">
                    {track.artist}
                  </p>
                </div>
                <span className="text-xs text-cutu-muted">{track.duration}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

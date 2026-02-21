import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bot,
  Image,
  TrendingUp,
  Music,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import GlassCard from "../components/GlassCard";

const features = [
  {
    icon: Bot,
    title: "AI Bot interactions",
    desc: "Chat with your desktop bot and get intelligent responses",
    color: "bg-cutu-primary-soft text-cutu-primary",
  },
  {
    icon: Image,
    title: "Image upload & gen",
    desc: "Upload or capture images and send to AI for analysis",
    color: "bg-cutu-accent-pastel/80 text-cutu-accent",
  },
  {
    icon: TrendingUp,
    title: "Stocks API & realtime data",
    desc: "Live stock quotes and trending insights",
    color: "bg-cutu-mint/80 text-emerald-600",
  },
  {
    icon: Music,
    title: "Music Player",
    desc: "Playlists, now playing, and album art",
    color: "bg-cutu-lavender/80 text-indigo-600",
  },
  {
    icon: Settings,
    title: "Settings & profile",
    desc: "Manage preferences and profile",
    color: "bg-cutu-sky/80 text-cutu-primary",
  },
];

export default function Landing() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-cutu-sky/50 via-white to-cutu-primary-soft/20 pb-24">
      <div className="pt-12 pb-8 px-4 safe-top">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 flex items-center justify-center">
              <Bot className="w-7 h-7 text-cutu-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-cutu-text">
                CUTU Bot
              </h1>
              <p className="text-xs text-cutu-text-secondary">
                Smart desktop companion
              </p>
            </div>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 rounded-full bg-cutu-primary text-white text-sm font-medium shadow-soft active:scale-95 transition-transform"
          >
            Login
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-cutu-text-secondary text-center text-sm mt-8 px-2"
        >
          Your AI-powered assistant for images, stocks, music and more
        </motion.p>

        <div className="mt-8 space-y-4 overflow-x-hidden">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <GlassCard
                onClick={() => setActiveIndex(i)}
                className={`p-4 flex items-center gap-4 ${activeIndex === i ? "ring-2 ring-cutu-primary/30" : ""}`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}
                >
                  <f.icon size={20} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-cutu-text text-sm">
                    {f.title}
                  </h3>
                  <p className="text-xs text-cutu-text-secondary mt-0.5">
                    {f.desc}
                  </p>
                </div>
                <ChevronRight size={18} className="text-cutu-muted shrink-0" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/95 to-transparent safe-bottom">
        <Link
          to="/signup"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-cutu-primary to-cutu-accent text-white font-semibold shadow-glass active:scale-[0.98] transition-transform"
        >
          <Sparkles size={18} />
          Get started
        </Link>
      </div>
    </div>
  );
}

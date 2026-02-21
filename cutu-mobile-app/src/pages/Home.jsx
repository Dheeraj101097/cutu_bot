import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  MessageCircle,
  Image,
  TrendingUp,
  Music,
  Bell,
  History,
  Sparkles,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import GlassCard from "../components/GlassCard";

const features = [
  { icon: MessageCircle, title: "Bot Chat", desc: "AI conversations", to: "/app/bot" },
  { icon: Image, title: "Upload / Gen Image", desc: "Image to AI", to: "/app/images" },
  { icon: TrendingUp, title: "Stocks Dashboard", desc: "Live quotes", to: "/app/stocks" },
  { icon: Music, title: "Music Player", desc: "Playlists", to: "/app/music" },
  { icon: Bell, title: "Notifications", desc: "Alerts", to: "/app/notifications" },
  { icon: History, title: "Saved Outputs", desc: "History", to: "/app/bot" },
  { icon: Sparkles, title: "AI Image Studio", desc: "Generate", to: "/app/images" },
  { icon: Settings, title: "Settings", desc: "Preferences", to: "/app/profile" },
];

export default function Home() {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();

  return (
    <div className="min-h-dvh pb-24 bg-hero-light dark:bg-hero-dark transition-colors duration-300">
      <header className="px-4 pt-12 pb-6 safe-top">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-2xl font-bold font-display text-[var(--text-primary)]">
              Hi Dheeraj,
            </h1>
            <p className="text-[var(--text-secondary)] text-base mt-1">
              What would you like to do today?
            </p>
          </motion.div>
          <button
            onClick={toggleTheme}
            className="min-h-tap min-w-[44px] rounded-input bg-[var(--bg-card)] backdrop-blur-[20px] border border-[var(--bg-card-border)] flex items-center justify-center active:scale-95 transition-transform"
          >
            {dark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
            >
              <GlassCard
                onClick={() => navigate(f.to)}
                className="p-4 flex flex-col items-start gap-3 !min-h-0 active:scale-[0.98]"
              >
                <div className="w-11 h-11 rounded-sm flex items-center justify-center bg-gradient-to-br from-secondary to-primary text-white dark:from-secondary dark:to-accent">
                  <f.icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] text-sm">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {f.desc}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

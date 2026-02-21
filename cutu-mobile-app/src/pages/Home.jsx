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

const features = [
  { icon: MessageCircle, title: "Bot", desc: "AI chat", to: "/app/bot" },
  { icon: Image, title: "Upload Image", desc: "Send to AI", to: "/app/images" },
  { icon: TrendingUp, title: "Stocks", desc: "Live quotes", to: "/app/stocks" },
  { icon: Music, title: "Music", desc: "Playlists", to: "/app/music" },
  { icon: Bell, title: "Notifications", desc: "Alerts", to: "/app/notifications" },
  { icon: Settings, title: "Settings", desc: "Preferences", to: "/app/profile" },
];

export default function Home() {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();

  return (
    <div className="min-h-dvh pb-28 bg-app">
      <header className="px-5 pt-12 pb-6 safe-top max-w-lg mx-auto">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col min-w-0"
          >
            <h1 className="text-xl font-bold font-display text-[var(--text-primary)]">
              Hi Dheeraj,
            </h1>
            <p className="text-[var(--text-secondary)] text-base mt-1">
              What would you like to do?
            </p>
          </motion.div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="shrink-0 min-h-tap min-w-[44px] rounded-input glass flex items-center justify-center text-[var(--text-primary)] active:scale-95 transition-transform"
          >
            {dark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <div className="px-5 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              className="aspect-[1.1]"
            >
              <button
                onClick={() => navigate(f.to)}
                className="w-full h-full p-4 flex flex-col items-start justify-between glass-card active:scale-[0.98] transition-transform duration-200 text-left"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-secondary to-accent text-primary"
                  style={{ color: "var(--text-primary)" }}
                >
                  <f.icon size={22} strokeWidth={2} />
                </div>
                <div className="min-w-0 w-full">
                  <h3 className="font-semibold text-[var(--text-primary)] text-sm truncate">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                    {f.desc}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

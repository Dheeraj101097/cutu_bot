import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  MessageCircle,
  Upload,
  TrendingUp,
  Music,
  Settings,
  Sun,
  Moon,
  Bot,
} from "lucide-react";

const features = [
  { icon: Bot, title: "Bot", to: "/app/bot", glow: "bg-emerald-400" },
  { icon: Upload, title: "Upload Image", to: "/app/images", glow: "bg-orange-400" },
  { icon: TrendingUp, title: "Stocks", to: "/app/stocks", glow: "bg-blue-400" },
  { icon: Music, title: "Music", to: "/app/music", glow: "bg-purple-400" },
  { icon: Settings, title: "Settings", to: "/app/profile", glow: "bg-gray-400" },
];

export default function Home() {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen pb-32">
      <header className="px-6 pt-16 pb-12 max-w-lg mx-auto flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-[--text-primary] tracking-tight leading-none">
            Hi Dheeraj,
          </h1>
          <p className="text-[--text-primary] text-2xl font-bold opacity-40 leading-tight">
            What would you like to <br /> do?
          </p>
        </motion.div>
        
        <button
          onClick={toggleTheme}
          className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-[--text-primary] shadow-inner active:scale-95 transition-all"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <div className="px-6 max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                onClick={() => navigate(f.to)}
                className="w-full aspect-square glass-card p-6 flex flex-col items-center justify-center text-center gap-5 active:scale-95 transition-all group relative overflow-hidden shadow-2xl"
              >
                <div className="relative">
                  <div className={`absolute inset-0 ${f.glow} opacity-20 blur-2xl scale-150 rounded-full group-hover:opacity-40 transition-opacity`} />
                  <div className="w-16 h-16 rounded-2xl glass border-white/20 flex items-center justify-center shadow-inner relative z-10 group-hover:-translate-y-1 transition-transform">
                    <f.icon size={28} className="text-[--text-primary]" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="font-bold text-[--text-primary] text-sm tracking-tight relative z-10">
                  {f.title}
                </h3>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

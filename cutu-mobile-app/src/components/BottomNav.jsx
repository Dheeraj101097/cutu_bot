import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, MessageCircle, TrendingUp, Music, User } from "lucide-react";

const tabs = [
  { to: "/app", icon: Home, label: "Home" },
  { to: "/app/bot", icon: MessageCircle, label: "Bot" },
  { to: "/app/stocks", icon: TrendingUp, label: "Stocks" },
  { to: "/app/music", icon: Music, label: "Music" },
  { to: "/app/profile", icon: User, label: "Settings" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-6 left-6 right-6 z-40 mx-auto max-w-lg safe-bottom">
      <div className="glass-pill px-4 py-3">
        <div className="flex items-center justify-around h-12">
          {tabs.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/app"}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-300 ${
                  isActive ? "text-[--text-primary]" : "text-[--text-secondary] opacity-60 hover:opacity-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative flex items-center justify-center p-1">
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <Icon
                      size={20}
                      className="relative z-10"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  <span className={`text-[10px] font-medium transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

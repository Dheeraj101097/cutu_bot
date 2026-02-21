import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, MessageCircle, TrendingUp, Music, User } from "lucide-react";

const tabs = [
  { to: "/app", icon: Home, label: "Home" },
  { to: "/app/bot", icon: MessageCircle, label: "Bot" },
  { to: "/app/stocks", icon: TrendingUp, label: "Markets" },
  { to: "/app/music", icon: Music, label: "Media" },
  { to: "/app/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-lg safe-bottom">
      <div className="rounded-hero bg-[var(--bg-card)] backdrop-blur-[20px] border border-[var(--bg-card-border)] shadow-glass-lg px-2 py-2">
        <div className="flex items-center justify-around h-14">
          {tabs.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/app"}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors duration-200 min-h-tap ${
                  isActive ? "text-primary" : "text-[var(--text-secondary)] opacity-70"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative p-2 min-h-tap min-w-[44px] flex items-center justify-center">
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 dark:from-secondary/30 dark:to-accent/20"
                        style={{ boxShadow: isActive ? "0 0 16px rgba(74,103,91,0.3)" : "none" }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <Icon
                      size={22}
                      className={`relative z-10 ${isActive ? "text-primary" : ""}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  <span className="text-[10px] font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

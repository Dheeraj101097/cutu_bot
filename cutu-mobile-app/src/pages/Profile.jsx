import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  HelpCircle,
  MessageSquare,
  Info,
  LogOut,
  ChevronRight,
  Bot,
  Shield,
  Globe,
  Lock,
} from "lucide-react";
import Modal from "../components/Modal";
import { useTheme } from "../context/ThemeContext";

export default function Profile() {
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme();
  const [modal, setModal] = useState(null);

  const handleLogout = () => {
    setModal(null);
    navigate("/");
  };

  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Account", to: "#" },
        { icon: Bell, label: "Notifications", to: "/app/notifications" },
        { icon: Globe, label: "Dark Mode", to: "#", toggle: true, action: toggleTheme },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: Globe, label: "Language", to: "#" },
        { icon: Lock, label: "Privacy", to: "#" },
      ],
    },
    {
      title: "Security",
      items: [
        { icon: Lock, label: "Change Password", to: "#" },
        { icon: Shield, label: "Two-Factor Authentication", to: "#" },
      ],
    },
  ];

  return (
    <div className="min-h-dvh bg-app pb-24">
      <header className="sticky top-0 z-10 glass border-b border-[var(--glass-border)] safe-top">
        <div className="px-5 py-4">
          <h1 className="text-lg font-semibold font-display text-[var(--text-primary)]">
            Settings
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Manage your account
          </p>
        </div>
      </header>

      <div className="px-5 py-6 space-y-6 max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass-card p-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-primary shrink-0">
              <User size={28} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text-primary)] text-base">Dheeraj</p>
              <p className="text-xs text-[var(--text-secondary)]">View profile</p>
            </div>
            <ChevronRight size={20} className="text-[var(--text-secondary)] shrink-0" />
          </div>
        </motion.div>

        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="glass-card overflow-hidden">
              {section.items.map((item, i) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={item.action}
                  className={`flex items-center gap-4 px-5 py-4 min-h-tap ${
                    i < section.items.length - 1 ? "border-b border-[var(--glass-border)]" : ""
                  }`}
                >
                  <item.icon size={20} className="text-[var(--text-secondary)] shrink-0" />
                  <span className="flex-1 text-[var(--text-primary)] font-medium">
                    {item.label}
                  </span>
                  {item.toggle ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        item.action?.();
                      }}
                      className={`w-12 h-7 rounded-full relative transition-colors ${
                        dark ? "bg-surface-light/40" : "bg-[var(--glass-bg)]"
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-5 h-5 rounded-full bg-gradient-to-r from-surface-light to-accent"
                        animate={{ x: dark ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  ) : (
                    <ChevronRight size={18} className="text-[var(--text-secondary)]" />
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        ))}

        <button
          onClick={() => setModal("about")}
          className="w-full flex items-center gap-4 px-5 py-4 glass-card min-h-tap text-left"
        >
          <Info size={20} className="text-[var(--text-secondary)] shrink-0" />
          <span className="flex-1 text-[var(--text-primary)] font-medium">About CUTU Bot</span>
          <ChevronRight size={18} className="text-[var(--text-secondary)]" />
        </button>

        <button
          onClick={() => setModal("logout")}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-pill border-2 border-[var(--glass-border)] text-[var(--text-primary)] font-medium active:scale-[0.98]"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <Modal isOpen={modal === "about"} onClose={() => setModal(null)} title="About CUTU Bot">
        <div className="flex flex-col items-center py-6">
          <div className="w-16 h-16 rounded-card bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 text-primary">
            <Bot size={32} strokeWidth={2} />
          </div>
          <p className="text-[var(--text-secondary)] text-sm text-center">
            CUTU Bot is your smart desktop companion. AI, images, stocks, music and more.
          </p>
          <p className="text-[var(--text-secondary)] text-xs mt-4 opacity-70">Version 1.0.0</p>
        </div>
      </Modal>

      <Modal isOpen={modal === "logout"} onClose={() => setModal(null)} title="Log out?">
        <div className="space-y-4 py-4">
          <p className="text-[var(--text-secondary)] text-sm">
            You will need to sign in again.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-3 rounded-input glass text-[var(--text-primary)] font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-3 rounded-input bg-gradient-to-r from-surface-light to-accent text-primary font-medium"
            >
              Log out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

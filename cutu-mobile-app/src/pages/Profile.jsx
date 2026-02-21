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
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import Modal from "../components/Modal";

export default function Profile() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  const handleLogout = () => {
    setModal(null);
    navigate("/");
  };

  return (
    <div className="min-h-dvh bg-[var(--bg-page)] pb-24 transition-colors">
      <header className="sticky top-0 z-10 bg-[var(--bg-card)] backdrop-blur-[20px] border-b border-[var(--bg-card-border)] safe-top">
        <div className="px-4 py-4">
          <h1 className="text-lg font-semibold font-display text-[var(--text-primary)]">
            Profile
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Settings and preferences
          </p>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard animate={false} className="p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white dark:from-secondary dark:to-accent">
              <User size={24} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[var(--text-primary)]">Samuel Jack</p>
              <p className="text-xs text-[var(--text-secondary)]">samuel.jack@org.com</p>
            </div>
            <ChevronRight size={18} className="text-[var(--text-secondary)]" />
          </GlassCard>
        </motion.div>

        <GlassCard animate={false} className="overflow-hidden p-0">
          <Link
            to="/app/notifications"
            className="flex items-center gap-3 p-4 border-b border-[var(--bg-card-border)] min-h-tap"
          >
            <Bell size={20} className="text-[var(--text-secondary)]" />
            <span className="flex-1 text-[var(--text-primary)] font-medium">Notifications</span>
            <ChevronRight size={18} className="text-[var(--text-secondary)]" />
          </Link>
          <Link
            to="/app/help"
            className="flex items-center gap-3 p-4 border-b border-[var(--bg-card-border)] min-h-tap"
          >
            <HelpCircle size={20} className="text-[var(--text-secondary)]" />
            <span className="flex-1 text-[var(--text-primary)] font-medium">Help & Tutorials</span>
            <ChevronRight size={18} className="text-[var(--text-secondary)]" />
          </Link>
          <Link
            to="/app/feedback"
            className="flex items-center gap-3 p-4 border-b border-[var(--bg-card-border)] min-h-tap"
          >
            <MessageSquare size={20} className="text-[var(--text-secondary)]" />
            <span className="flex-1 text-[var(--text-primary)] font-medium">Feedback</span>
            <ChevronRight size={18} className="text-[var(--text-secondary)]" />
          </Link>
          <button
            onClick={() => setModal("about")}
            className="flex items-center gap-3 p-4 w-full text-left min-h-tap"
          >
            <Info size={20} className="text-[var(--text-secondary)]" />
            <span className="flex-1 text-[var(--text-primary)] font-medium">About CUTU Bot</span>
            <ChevronRight size={18} className="text-[var(--text-secondary)]" />
          </button>
        </GlassCard>

        <button
          onClick={() => setModal("logout")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-pill border-2 border-accent/50 text-[var(--text-primary)] font-medium active:scale-[0.98] transition-transform"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>

      <Modal isOpen={modal === "about"} onClose={() => setModal(null)} title="About CUTU Bot">
        <div className="flex flex-col items-center py-4">
          <div className="w-16 h-16 rounded-card bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 text-white">
            <Bot size={32} strokeWidth={2} />
          </div>
          <p className="text-[var(--text-secondary)] text-sm text-center">
            CUTU Bot is your smart desktop companion. AI interactions, image analysis,
            stocks, music and more.
          </p>
          <p className="text-[var(--text-secondary)] text-xs mt-4 opacity-70">Version 1.0.0</p>
        </div>
      </Modal>

      <Modal isOpen={modal === "logout"} onClose={() => setModal(null)} title="Log out?">
        <div className="space-y-4 py-4">
          <p className="text-[var(--text-secondary)] text-sm">
            You will need to sign in again to access your data.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-3 rounded-input border border-[var(--bg-card-border)] text-[var(--text-primary)] font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-3 rounded-input bg-gradient-to-r from-secondary to-primary text-white font-medium"
            >
              Log out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

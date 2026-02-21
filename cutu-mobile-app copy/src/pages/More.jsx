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

export default function More() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  const handleLogout = () => {
    setModal(null);
    navigate("/");
  };

  return (
    <div className="min-h-dvh bg-cutu-bg pb-20">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 safe-top">
        <div className="px-4 py-4">
          <h1 className="text-lg font-semibold font-display text-cutu-text">
            More
          </h1>
          <p className="text-xs text-cutu-text-secondary mt-0.5">
            Settings, profile & support
          </p>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 p-4 bg-white/72 backdrop-blur-xl rounded-2xl border border-white/60 shadow-glass">
            <div className="w-14 h-14 rounded-full bg-cutu-primary-soft flex items-center justify-center">
              <User size={24} className="text-cutu-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-cutu-text">Demo User</p>
              <p className="text-xs text-cutu-text-secondary">demo@cutubot.app</p>
            </div>
            <ChevronRight size={18} className="text-cutu-muted" />
          </div>
        </motion.div>

        <GlassCard animate={false} className="overflow-hidden">
          <Link
            to="/app/notifications"
            className="flex items-center gap-3 p-4 border-b border-slate-100"
          >
            <Bell size={20} className="text-cutu-muted" />
            <span className="flex-1 text-cutu-text font-medium">Notifications</span>
            <ChevronRight size={18} className="text-cutu-muted" />
          </Link>
          <Link
            to="/app/help"
            className="flex items-center gap-3 p-4 border-b border-slate-100"
          >
            <HelpCircle size={20} className="text-cutu-muted" />
            <span className="flex-1 text-cutu-text font-medium">Help & Tutorials</span>
            <ChevronRight size={18} className="text-cutu-muted" />
          </Link>
          <Link
            to="/app/feedback"
            className="flex items-center gap-3 p-4 border-b border-slate-100"
          >
            <MessageSquare size={20} className="text-cutu-muted" />
            <span className="flex-1 text-cutu-text font-medium">Feedback & Support</span>
            <ChevronRight size={18} className="text-cutu-muted" />
          </Link>
          <button
            onClick={() => setModal("about")}
            className="flex items-center gap-3 p-4 w-full text-left"
          >
            <Info size={20} className="text-cutu-muted" />
            <span className="flex-1 text-cutu-text font-medium">About CUTU Bot</span>
            <ChevronRight size={18} className="text-cutu-muted" />
          </button>
        </GlassCard>

        <button
          onClick={() => setModal("logout")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-red-200 text-red-600 font-medium active:scale-[0.98]"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>

      <Modal
        isOpen={modal === "about"}
        onClose={() => setModal(null)}
        title="About CUTU Bot"
      >
        <div className="flex flex-col items-center py-4">
          <div className="w-16 h-16 rounded-2xl bg-cutu-primary-soft flex items-center justify-center mb-4">
            <Bot size={32} className="text-cutu-primary" />
          </div>
          <p className="text-cutu-text-secondary text-sm text-center">
            CUTU Bot is your smart desktop companion. AI interactions, image analysis,
            stocks, music and more. Part of the UrbanNook ecosystem.
          </p>
          <p className="text-cutu-muted text-xs mt-4">Version 1.0.0</p>
        </div>
      </Modal>

      <Modal
        isOpen={modal === "logout"}
        onClose={() => setModal(null)}
        title="Log out?"
      >
        <div className="space-y-4 py-4">
          <p className="text-cutu-text-secondary text-sm">
            You will need to sign in again to access your data.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setModal(null)}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-cutu-text font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium"
            >
              Log out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

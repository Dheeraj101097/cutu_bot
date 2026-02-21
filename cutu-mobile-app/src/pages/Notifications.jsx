import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, ChevronLeft } from "lucide-react";
import GlassCard from "../components/GlassCard";

export default function Notifications() {
  const mock = [
    { id: 1, title: "Bot response ready", body: "Your image analysis is complete.", time: "2m ago" },
    { id: 2, title: "Stock alert", body: "AAPL crossed $190.", time: "1h ago" },
  ];

  return (
    <div className="min-h-dvh bg-cutu-bg">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 safe-top">
        <div className="px-4 py-4 flex items-center gap-3">
          <Link to="/app/more" className="p-2 -m-2">
            <ChevronLeft size={20} className="text-cutu-text" />
          </Link>
          <h1 className="text-lg font-semibold font-display text-cutu-text">
            Notifications
          </h1>
        </div>
      </header>
      <div className="px-4 py-6 space-y-3">
        {mock.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-4 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-cutu-primary-soft flex items-center justify-center shrink-0">
                <Bell size={18} className="text-cutu-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-cutu-text text-sm">{n.title}</p>
                <p className="text-xs text-cutu-text-secondary mt-0.5">{n.body}</p>
                <p className="text-xs text-cutu-muted mt-1">{n.time}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

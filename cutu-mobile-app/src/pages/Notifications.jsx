import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, ChevronLeft } from "lucide-react";
export default function Notifications() {
  const mock = [
    { id: 1, title: "Bot response ready", body: "Your image analysis is complete.", time: "2m ago" },
    { id: 2, title: "Stock alert", body: "AAPL crossed $190.", time: "1h ago" },
  ];

  return (
    <div className="min-h-dvh bg-app">
      <header className="sticky top-0 z-10 glass border-b border-[var(--glass-border)] safe-top">
        <div className="px-5 py-4 flex items-center gap-3">
          <Link to="/app/profile" className="p-2 -m-2 min-h-tap">
            <ChevronLeft size={20} className="text-[var(--text-primary)]" />
          </Link>
          <h1 className="text-lg font-semibold font-display text-[var(--text-primary)]">
            Notifications
          </h1>
        </div>
      </header>
      <div className="px-5 py-6 space-y-3">
        {mock.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="glass-card p-4 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/40 to-accent/40 flex items-center justify-center shrink-0">
                <Bell size={18} className="text-[var(--text-primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[var(--text-primary)] text-sm">{n.title}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{n.body}</p>
                <p className="text-xs text-[var(--text-secondary)] opacity-70 mt-1">{n.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

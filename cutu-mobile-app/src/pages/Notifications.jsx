import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bell, ChevronLeft, Sparkles } from "lucide-react";

export default function Notifications() {
  const navigate = useNavigate();
  const mock = [
    { id: 1, title: "Bot response ready", body: "Your image analysis is complete.", time: "2m ago", icon: Sparkles },
    { id: 2, title: "Stock alert", body: "AAPL crossed $150.20 (+1.5%)", time: "1h ago", icon: Bell },
  ];

  return (
    <div className="min-h-screen pb-32">
       <header className="px-6 pt-16 pb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-[--text-primary] opacity-50 active:scale-95 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-[--text-primary] tracking-tight">Notifications</h1>
      </header>

      <div className="px-6 max-w-lg mx-auto space-y-4">
        {mock.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="glass-card p-5 flex gap-5 items-center group cursor-pointer active:scale-95 transition-all shadow-xl">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[--text-primary] border-white/10 group-hover:bg-emerald-500/10 transition-colors">
                <n.icon size={20} className="opacity-80" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-bold text-[--text-primary] text-sm tracking-tight">{n.title}</h3>
                  <span className="text-[10px] font-bold text-[--text-secondary] opacity-30 uppercase">{n.time}</span>
                </div>
                <p className="text-xs font-semibold text-[--text-secondary] opacity-60 line-clamp-1">{n.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

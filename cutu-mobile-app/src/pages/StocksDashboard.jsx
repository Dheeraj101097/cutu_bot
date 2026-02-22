import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Search, RefreshCw, ArrowUpRight } from "lucide-react";

const mockStocks = [
  { symbol: "AAPL", name: "Apple Inc", price: 150.20, changePercent: 1.5, color: "text-emerald-400" },
  { symbol: "GOOGL", name: "Alphabet Inc", price: 2800.50, changePercent: 0.8, color: "text-emerald-400" },
  { symbol: "TSLA", name: "Tesla Inc", price: 950.10, changePercent: -2.1, color: "text-rose-400" },
];

export default function StocksDashboard() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen pb-32">
      <header className="px-6 pt-16 pb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[--text-primary] tracking-tight">Stocks</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-bold text-[--text-primary] opacity-90">$1,338.16</span>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+12.20 (0.95%)</span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-[--text-primary] shadow-inner">
            <RefreshCw size={18} />
          </button>
        </div>
      </header>

      <div className="px-6 mb-10 max-w-lg mx-auto">
        <div className="relative group">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[--text-secondary]/40 group-focus-within:text-emerald-500 transition-colors" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbols..."
            className="glass-pill w-full py-5 pl-14 pr-6 bg-white/5 dark:bg-white/[0.02] border-white/10 outline-none text-[--text-primary] placeholder:text-[--text-secondary]/30 text-sm font-medium shadow-xl"
          />
        </div>
      </div>

      <div className="px-6 max-w-lg mx-auto space-y-5">
        <p className="text-[10px] font-bold text-[--text-secondary] opacity-50 tracking-widest uppercase pl-2">Dashboard</p>
        <div className="grid grid-cols-2 gap-4">
          {mockStocks.map((s, i) => (
            <motion.div
              key={s.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="glass-card p-5 group cursor-pointer active:scale-95 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl glass border-white/5 flex items-center justify-center text-[--text-primary] font-bold text-xs">
                    {s.symbol[0]}
                  </div>
                  <ArrowUpRight size={14} className="text-[--text-secondary] opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-[--text-secondary] tracking-wider">{s.symbol}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-[--text-primary]">${s.price.toFixed(0)}</span>
                    <span className={`text-[10px] font-bold ${s.color}`}>
                      {s.changePercent > 0 ? "+" : ""}{s.changePercent}%
                    </span>
                  </div>
                </div>
                <div className="mt-4 h-8 overflow-hidden opacity-30 group-hover:opacity-60 transition-opacity">
                   <svg viewBox="0 0 100 40" className="w-full h-full">
                    <path
                      d={s.changePercent >= 0 ? "M0 35 L20 25 L40 30 L60 15 L80 20 L100 5" : "M0 5 L20 15 L40 10 L60 30 L80 25 L100 35"}
                      fill="none"
                      stroke={s.changePercent >= 0 ? "#10B981" : "#EF4444"}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

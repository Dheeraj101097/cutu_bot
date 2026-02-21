import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Search, RefreshCw } from "lucide-react";
import GlassCard from "../components/GlassCard";

const mockStocks = [
  { symbol: "AAPL", name: "Apple Inc", price: 189.42, changePercent: 0.66 },
  { symbol: "GOOGL", name: "Alphabet Inc", price: 142.18, changePercent: -0.57 },
  { symbol: "MSFT", name: "Microsoft", price: 378.91, changePercent: 0.57 },
  { symbol: "AMZN", name: "Amazon", price: 178.25, changePercent: 1.96 },
  { symbol: "NVDA", name: "NVIDIA", price: 875.12, changePercent: -1.39 },
];

export default function StocksDashboard() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-dvh bg-cutu-bg pb-20">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 safe-top">
        <div className="px-4 py-4">
          <h1 className="text-lg font-semibold font-display text-cutu-text">
            Stocks
          </h1>
          <p className="text-xs text-cutu-text-secondary mt-0.5">
            Live quotes and trending insights
          </p>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-cutu-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search symbols..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 border border-slate-200/60 text-sm outline-none focus:border-cutu-primary/50"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-cutu-primary-soft text-cutu-primary active:scale-95">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="p-4">
            <h3 className="text-sm font-semibold text-cutu-text mb-3">
              Trending
            </h3>
            <div className="space-y-2">
              {mockStocks.map((s, i) => (
                <motion.div
                  key={s.symbol}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-cutu-text text-sm">{s.symbol}</p>
                    <p className="text-xs text-cutu-text-secondary">{s.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-cutu-text text-sm">
                      ${s.price.toFixed(2)}
                    </p>
                    <p className={`text-xs flex items-center justify-end gap-0.5 ${s.changePercent >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {s.changePercent >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {s.changePercent >= 0 ? "+" : ""}{s.changePercent}%
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <GlassCard animate={false} className="p-4">
          <h3 className="text-sm font-semibold text-cutu-text mb-2">
            Quick chart placeholder
          </h3>
          <div className="h-24 rounded-xl bg-cutu-sky/40 flex items-center justify-center text-cutu-text-secondary text-sm">
            Connect Stocks API for live charts
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

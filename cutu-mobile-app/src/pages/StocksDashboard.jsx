import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Search, RefreshCw } from "lucide-react";

const mockStocks = [
  { symbol: "AAPL", name: "Apple Inc", price: 189.42, changePercent: 0.66 },
  { symbol: "GOOGL", name: "Alphabet Inc", price: 142.18, changePercent: -0.57 },
  { symbol: "TSLA", name: "Tesla", price: 245.12, changePercent: 1.96 },
  { symbol: "MSFT", name: "Microsoft", price: 378.91, changePercent: 0.57 },
  { symbol: "AMZN", name: "Amazon", price: 178.25, changePercent: -1.39 },
];

export default function StocksDashboard() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-dvh bg-app pb-24">
      <header className="sticky top-0 z-10 glass border-b border-[var(--glass-border)] safe-top">
        <div className="px-5 py-4">
          <h1 className="text-lg font-semibold font-display text-[var(--text-primary)]">
            My Stocks
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Total portfolio value $850.10
          </p>
          <div className="mt-4 flex gap-2">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search symbols..."
                className="w-full pl-11 pr-4 py-3 rounded-input glass outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] placeholder:opacity-70 text-sm"
              />
            </div>
            <button className="min-h-tap min-w-[44px] rounded-input glass flex items-center justify-center text-[var(--text-primary)] active:scale-95">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="px-5 py-6 space-y-4">
        {mockStocks.map((s, i) => (
          <motion.div
            key={s.symbol}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="glass-card p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-[var(--text-primary)] text-lg">
                  ${s.price.toFixed(2)}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">{s.symbol} · {s.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-14 flex items-end gap-0.5">
                  {[2, 4, 3, 5, 4, 6, 5].map((h, j) => (
                    <div
                      key={j}
                      className="w-1.5 rounded-sm flex-1"
                      style={{
                        height: `${h * 4}px`,
                        backgroundColor:
                          s.changePercent >= 0
                            ? "rgba(222, 237, 207, 0.8)"
                            : "rgba(180, 120, 100, 0.6)",
                      }}
                    />
                  ))}
                </div>
                <p
                  className={`text-sm font-semibold flex items-center gap-1 min-w-[52px] justify-end ${
                    s.changePercent >= 0 ? "text-surface-light" : "text-amber-200/90"
                  }`}
                >
                  {s.changePercent >= 0 ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {s.changePercent >= 0 ? "+" : ""}
                  {s.changePercent}%
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

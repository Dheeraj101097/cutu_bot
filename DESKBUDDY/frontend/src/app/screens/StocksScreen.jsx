import React from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';



export function StocksScreen() {
  const navigate = useNavigate();

  const stocks = [
    { ticker: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.45, changePercent: 1.39, trend: 'up' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 142.50, change: -1.20, changePercent: -0.83, trend: 'down' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', price: 412.30, change: 5.60, changePercent: 1.38, trend: 'up' },
    { ticker: 'TSLA', name: 'Tesla Inc.', price: 238.72, change: -3.45, changePercent: -1.42, trend: 'down' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', price: 178.35, change: 1.89, changePercent: 1.07, trend: 'up' },
  ];

  const totalValue = 850.10;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,var(--bg-glow)_0%,var(--bg-base)_100%)] text-[var(--text-main)] font-['Inter',-apple-system,BlinkMacSystemFont,sans-serif] overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-8 pb-4 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/home')} className="p-2 opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold">Stocks</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-24 pb-8 space-y-6">
        {/* Portfolio Value */}
        <GlassCard className="p-6 text-center">
          <p className="text-sm opacity-60 mb-2">Total Portfolio</p>
          <h2 className="text-4xl mb-1">${totalValue.toFixed(2)}</h2>
          <p className="text-sm text-mint">+$12.45 (1.49%) today</p>
        </GlassCard>

        {/* Stocks List */}
        <div className="space-y-3">
          {stocks.map((stock) => (
            <GlassCard key={stock.ticker} className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="text-lg">{stock.ticker}</h3>
                      <p className="text-xs opacity-60">{stock.name}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sparkline */}
                  <div className="w-16 h-8">
                    <svg viewBox="0 0 60 30" className="w-full h-full">
                      <path
                        d={stock.trend === 'up' 
                          ? 'M 0 25 Q 15 20, 30 15 T 60 5'
                          : 'M 0 5 Q 15 10, 30 15 T 60 25'
                        }
                        fill="none"
                        stroke={stock.trend === 'up' ? '#DEEDCF' : '#FF6B6B'}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg">${stock.price}</p>
                    <div className={`flex items-center space-x-1 text-xs ${stock.trend === 'up' ? 'text-mint' : 'text-red-400'}`}>
                      {stock.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{Math.abs(stock.changePercent)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}





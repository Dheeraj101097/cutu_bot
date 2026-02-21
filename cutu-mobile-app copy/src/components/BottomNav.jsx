import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MessageCircle,
  Image,
  TrendingUp,
  Music,
  MoreHorizontal,
} from 'lucide-react'

const tabs = [
  { to: '/app/bot', icon: MessageCircle, label: 'Bot' },
  { to: '/app/images', icon: Image, label: 'Images' },
  { to: '/app/stocks', icon: TrendingUp, label: 'Stocks' },
  { to: '/app/music', icon: Music, label: 'Music' },
  { to: '/app/more', icon: MoreHorizontal, label: 'More' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-t border-slate-200/60 safe-bottom">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors ${
                isActive ? 'text-cutu-primary' : 'text-cutu-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative p-2">
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-cutu-primary-soft/60 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <Icon
                    size={22}
                    className={`relative z-10 ${isActive ? 'text-cutu-primary' : ''}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

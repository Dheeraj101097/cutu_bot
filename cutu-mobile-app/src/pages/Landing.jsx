import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-dvh bg-app pb-24">
      <div className="pt-12 pb-8 px-5 safe-top max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-card glass flex items-center justify-center">
              <Bot className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-[var(--text-primary)]">
                CUTU Bot
              </h1>
              <p className="text-xs text-[var(--text-secondary)]">
                Smart desktop companion
              </p>
            </div>
          </div>
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-pill glass text-[var(--text-primary)] text-sm font-medium active:scale-95 transition-transform"
          >
            Login
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[var(--text-secondary)] text-center text-sm mt-8 px-2"
        >
          Your AI-powered assistant for images, stocks, music and more
        </motion.p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 safe-bottom">
        <Link
          to="/signup"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-pill bg-gradient-to-r from-surface-light to-accent text-primary font-semibold active:scale-[0.98] transition-transform"
        >
          <Sparkles size={18} />
          Get started
        </Link>
      </div>
    </div>
  );
}

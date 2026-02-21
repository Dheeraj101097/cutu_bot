import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    const t = setTimeout(() => setPhase("exit"), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(onComplete, 500);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {phase === "visible" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-cutu-sky via-white to-cutu-primary-soft/30"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            className="w-24 h-24 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-glass flex items-center justify-center mb-6"
          >
            <Bot className="w-12 h-12 text-cutu-primary" strokeWidth={1.5} />
          </motion.div>
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-2xl font-bold font-display text-cutu-text"
          >
            CUTU Bot
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="text-cutu-text-secondary text-sm mt-1"
          >
            Your smart desktop companion
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

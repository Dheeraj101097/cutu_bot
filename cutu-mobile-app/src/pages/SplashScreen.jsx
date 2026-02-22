import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState("visible");

  useEffect(() => {
    const t = setTimeout(() => setPhase("exit"), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(onComplete, 400);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {phase === "visible" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-app overflow-hidden"
        >
          <div className="absolute w-[80vw] aspect-square rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
          
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="text-7xl font-black text-[--text-primary] tracking-lighter mb-4 drop-shadow-2xl">
              AI
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-1 bg-[--text-primary] rounded-full opacity-20"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 text-[10px] font-black tracking-[0.3em] uppercase text-[--text-secondary]"
            >
              Vroom ambient occlusion
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
